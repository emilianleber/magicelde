import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Sync-Calendar: Lädt Termine von einer iCal-URL und speichert sie in der DB.
 *
 * Funktioniert mit:
 * - Apple iCloud (private iCal-URL aus Kalender-Einstellungen)
 * - Google Calendar (iCal-URL)
 * - Jeder .ics URL
 *
 * POST { } (liest URL aus admin_settings)
 * oder GET (für Cron-Aufruf)
 */

const supabase = createClient(
  Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Einfacher iCal Parser
function parseIcal(icsText: string): Array<{
  uid: string;
  summary: string;
  startDate: string;
  startTime: string | null;
  endDate: string | null;
  endTime: string | null;
  location: string | null;
  description: string | null;
  allDay: boolean;
}> {
  const events: any[] = [];
  const blocks = icsText.split("BEGIN:VEVENT");

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split("END:VEVENT")[0];
    const get = (key: string): string | null => {
      const match = block.match(new RegExp(`${key}[^:]*:(.+)`, "m"));
      return match ? match[1].trim() : null;
    };

    const uid = get("UID") || `event-${i}`;
    const summary = get("SUMMARY") || "Termin";
    const dtstart = get("DTSTART") || "";
    const dtend = get("DTEND") || "";
    const location = get("LOCATION");
    const description = get("DESCRIPTION")?.replace(/\\n/g, "\n").replace(/\\,/g, ",");

    // Datum parsen: 20260418T190000Z oder 20260418 (ganztägig)
    const parseDate = (dt: string) => {
      const clean = dt.replace(/[^0-9T]/g, "");
      if (clean.length >= 8) {
        const d = `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
        const t = clean.length >= 13 ? `${clean.slice(9, 11)}:${clean.slice(11, 13)}:00` : null;
        return { date: d, time: t };
      }
      return { date: null, time: null };
    };

    const start = parseDate(dtstart);
    const end = parseDate(dtend);
    const allDay = !dtstart.includes("T");

    if (start.date) {
      events.push({
        uid,
        summary,
        startDate: start.date,
        startTime: start.time,
        endDate: end.date,
        endTime: end.time,
        location: location || null,
        description: description || null,
        allDay,
      });
    }
  }

  return events;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Einstellungen laden
    const { data: settings } = await supabase
      .from("admin_settings")
      .select("calendar_url, calendar_enabled")
      .limit(1)
      .maybeSingle();

    const calUrl = (settings as any)?.calendar_url;
    const enabled = (settings as any)?.calendar_enabled;

    if (!enabled || !calUrl) {
      return new Response(JSON.stringify({ error: "Kalender nicht konfiguriert", synced: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // iCal-Datei herunterladen
    const icsRes = await fetch(calUrl);
    if (!icsRes.ok) throw new Error(`iCal-Abruf fehlgeschlagen: ${icsRes.status}`);
    const icsText = await icsRes.text();

    // Parsen
    const events = parseIcal(icsText);

    // Nur zukünftige + letzte 30 Tage
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    const relevant = events.filter(e => e.startDate >= cutoffStr);

    // In DB schreiben (upsert)
    if (relevant.length > 0) {
      const rows = relevant.map(e => ({
        uid: e.uid,
        summary: e.summary,
        start_date: e.startDate,
        start_time: e.startTime,
        end_date: e.endDate,
        end_time: e.endTime,
        location: e.location,
        description: e.description,
        all_day: e.allDay,
        source: "ical",
        synced_at: new Date().toISOString(),
      }));

      const { error: upsertError } = await supabase
        .from("calendar_events_cache")
        .upsert(rows, { onConflict: "uid" });

      if (upsertError) throw upsertError;
    }

    return new Response(JSON.stringify({ synced: relevant.length, total: events.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("sync-calendar error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
