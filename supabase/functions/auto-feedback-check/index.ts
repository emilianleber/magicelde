import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Auto-Feedback: Prüft täglich ob Events vor 30 Tagen stattfanden
 * und sendet automatisch eine Feedback-Anfrage.
 *
 * Aufruf: Per Cron-Job (z.B. täglich um 10:00) oder manuell.
 * Konfiguration: In admin_settings kann auto_feedback_days gesetzt werden.
 */

const supabase = createClient(
  Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Einstellung laden: Nach wie vielen Tagen Feedback senden (default: 30)
    const { data: settings } = await supabase
      .from("admin_settings")
      .select("auto_feedback_days")
      .limit(1)
      .maybeSingle();

    const feedbackDays = (settings as any)?.auto_feedback_days ?? 30;

    // Zieldatum: Events die vor genau feedbackDays Tagen stattfanden
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - feedbackDays);
    const targetDateStr = targetDate.toISOString().split("T")[0];

    // Events finden die an diesem Tag stattfanden und noch kein Feedback haben
    const { data: events, error } = await supabase
      .from("portal_events")
      .select("id, title, customer_id, event_date, status")
      .eq("event_date", targetDateStr)
      .in("status", ["event_erfolgt", "abgeschlossen"]);

    if (error) throw error;
    if (!events || events.length === 0) {
      return new Response(JSON.stringify({ sent: 0, message: "Keine Events zum Feedback gefunden" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let sentCount = 0;

    for (const event of events) {
      if (!event.customer_id) continue;

      // Prüfen ob schon Feedback existiert
      const { data: existingFeedback } = await supabase
        .from("customer_feedback")
        .select("id")
        .eq("event_id", event.id)
        .limit(1);

      if (existingFeedback && existingFeedback.length > 0) continue;

      // Prüfen ob schon eine Feedback-Mail gesendet wurde
      const { data: existingMsg } = await supabase
        .from("portal_messages")
        .select("id")
        .eq("event_id", event.id)
        .ilike("subject", "%feedback%")
        .limit(1);

      if (existingMsg && existingMsg.length > 0) continue;

      // Feedback-Request senden (nutzt die bestehende Edge Function)
      try {
        const { error: invokeError } = await supabase.functions.invoke("send-feedback-request", {
          body: { eventId: event.id },
        });
        if (!invokeError) sentCount++;
      } catch {
        // Einzelne Fehler ignorieren, weiter mit nächstem Event
      }
    }

    return new Response(JSON.stringify({ sent: sentCount, checked: events.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("auto-feedback-check error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
