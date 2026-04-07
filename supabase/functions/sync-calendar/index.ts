import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Sync-Calendar: Lädt Termine von allen aktiven iCal-Quellen.
 * Unterstützt mehrere Kalender (Apple, Google, Outlook – jede iCal URL).
 */

const supabase = createClient(
  Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function parseIcal(icsText: string): Array<{
  uid: string; summary: string; startDate: string; startTime: string | null;
  endDate: string | null; endTime: string | null; location: string | null;
  description: string | null; allDay: boolean;
}> {
  const events: any[] = [];
  const blocks = icsText.split("BEGIN:VEVENT");
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i].split("END:VEVENT")[0];
    const get = (key: string): string | null => {
      const match = block.match(new RegExp(`${key}[^:]*:(.+)`, "m"));
      return match ? match[1].trim() : null;
    };
    const uid = get("UID") || `event-${i}-${Date.now()}`;
    const summary = get("SUMMARY") || "Termin";
    const dtstart = get("DTSTART") || "";
    const dtend = get("DTEND") || "";
    const location = get("LOCATION");
    const description = get("DESCRIPTION")?.replace(/\\n/g, "\n").replace(/\\,/g, ",");
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
    if (start.date) {
      events.push({ uid, summary, startDate: start.date, startTime: start.time, endDate: end.date, endTime: end.time, location: location || null, description: description || null, allDay: !dtstart.includes("T") });
    }
  }
  return events;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Alle aktiven Kalender-Quellen laden
    const { data: sources, error: srcErr } = await supabase
      .from("calendar_sources")
      .select("*")
      .eq("enabled", true);

    if (srcErr) throw srcErr;
    if (!sources || sources.length === 0) {
      // Fallback: Alte single-URL aus admin_settings
      const { data: settings } = await supabase.from("admin_settings").select("calendar_url, calendar_enabled").limit(1).maybeSingle();
      if (!(settings as any)?.calendar_enabled || !(settings as any)?.calendar_url) {
        return new Response(JSON.stringify({ error: "Keine Kalender konfiguriert", synced: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Single-URL als Quelle behandeln
      sources.push({ id: "legacy", name: "Kalender", url: (settings as any).calendar_url, enabled: true });
    }

    let totalSynced = 0;
    const results: { name: string; synced: number; error?: string }[] = [];

    for (const source of sources) {
      try {
        const icsRes = await fetch(source.url);
        if (!icsRes.ok) { results.push({ name: source.name, synced: 0, error: `HTTP ${icsRes.status}` }); continue; }
        const icsText = await icsRes.text();
        const events = parseIcal(icsText);

        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 30);
        const cutoffStr = cutoff.toISOString().split("T")[0];
        const relevant = events.filter(e => e.startDate >= cutoffStr);

        if (relevant.length > 0) {
          // Alte Events dieser Quelle löschen und neu einfügen
          if (source.id !== "legacy") {
            await supabase.from("calendar_events_cache").delete().eq("source_id", source.id);
          }

          const rows = relevant.map(e => ({
            uid: `${source.id}-${e.uid}`,
            summary: e.summary,
            start_date: e.startDate,
            start_time: e.startTime,
            end_date: e.endDate,
            end_time: e.endTime,
            location: e.location,
            description: e.description,
            all_day: e.allDay,
            source: "ical",
            source_id: source.id !== "legacy" ? source.id : null,
            synced_at: new Date().toISOString(),
          }));

          await supabase.from("calendar_events_cache").upsert(rows, { onConflict: "uid" });
        }

        totalSynced += relevant.length;
        results.push({ name: source.name, synced: relevant.length });
      } catch (err: any) {
        results.push({ name: source.name, synced: 0, error: err.message });
      }
    }

    return new Response(JSON.stringify({ synced: totalSynced, sources: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("sync-calendar error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
