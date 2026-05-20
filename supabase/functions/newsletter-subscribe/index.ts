/**
 * Newsletter-Subscribe — idempotent.
 *
 * Body: { email: string, name?: string, source?: string, metadata?: object }
 *
 * - Wenn Email schon existiert: nicht überschreiben, ggf. Status 'active' setzen
 *   (Re-Subscribe nach Unsubscribe).
 * - Wenn neu: anlegen + Bestätigungs-Mail via Resend.
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!,
);
const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = Deno.env.get("SITE_URL") || "https://www.magicel.de";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { email, name, source, metadata } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Ungültige Email." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Existiert schon?
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, status, unsubscribe_token")
      .eq("email", cleanEmail)
      .maybeSingle();

    let row;
    if (existing) {
      // Re-aktivieren falls unsubscribed
      const { data: updated, error } = await supabase
        .from("newsletter_subscribers")
        .update({
          status: "active",
          unsubscribed_at: null,
          name: name ?? null,
          source: source ?? "manual",
          metadata: metadata ?? {},
        })
        .eq("id", existing.id)
        .select("id, email, unsubscribe_token")
        .single();
      if (error) throw error;
      row = updated;
    } else {
      const { data: inserted, error } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email: cleanEmail,
          name: name ?? null,
          source: source ?? "manual",
          metadata: metadata ?? {},
        })
        .select("id, email, unsubscribe_token")
        .single();
      if (error) throw error;
      row = inserted;
    }

    // Bestätigungs-Mail (nur bei neu oder nach Re-Subscribe)
    const unsubUrl = `${SITE_URL}/unsubscribe?token=${row.unsubscribe_token}`;
    try {
      await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: cleanEmail,
        subject: "Newsletter-Anmeldung bestätigt ✨",
        html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Newsletter bestätigt</title></head>
<body style="margin:0;padding:32px 16px;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table align="center" cellpadding="0" cellspacing="0" width="560" style="background:#fff;border-radius:16px;padding:36px;border:1px solid #e4e4e7;">
<tr><td>
<p style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0a0a0a;letter-spacing:-0.5px;">Emilian Leber</p>
<div style="height:2px;width:48px;background:#9a2640;border-radius:2px;margin-bottom:24px;"></div>
<p style="font-size:14px;color:#71717a;text-transform:uppercase;letter-spacing:2px;font-weight:700;margin:0 0 16px;">Newsletter bestätigt</p>
<h2 style="font-size:24px;color:#0a0a0a;margin:0 0 16px;">Du bist dabei.</h2>
<p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">
Danke fürs Eintragen. Du bekommst von mir gelegentlich kurze Mails: neue Magic-Dinner-Termine, Tour-Updates und Backstage-Notizen. Vier bis acht Mails im Jahr — kein Spam.
</p>
<p style="font-size:13px;color:#71717a;margin:0 0 16px;">
Du kannst dich jederzeit per Klick abmelden:<br>
<a href="${unsubUrl}" style="color:#9a2640;">Newsletter abbestellen</a>
</p>
<hr style="border:none;border-top:1px solid #e4e4e7;margin:24px 0;">
<p style="font-size:12px;color:#a1a1aa;margin:0;">Emilian Leber · el@magicel.de · magicel.de</p>
</td></tr></table></body></html>`,
        text: `Newsletter-Anmeldung bestätigt.\n\nDu bekommst von mir gelegentlich kurze Mails. Abmelden jederzeit: ${unsubUrl}\n\nEmilian Leber · el@magicel.de`,
      });
    } catch (mailErr) {
      console.error("subscribe confirmation mail failed:", mailErr);
      // Nicht abbrechen — DB-Eintrag ist trotzdem da
    }

    return new Response(
      JSON.stringify({ success: true, id: row.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("subscribe error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
