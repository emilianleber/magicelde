import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── iCal Datum Parser ─────────────────────────────────────────────────────────

function parseDt(dt: string): { date: string; time: string | null; jsDate: Date } | null {
  const clean = dt.replace(/[^0-9T]/g, "");
  if (clean.length < 8) return null;
  const y = parseInt(clean.slice(0, 4));
  const mo = parseInt(clean.slice(4, 6)) - 1;
  const d = parseInt(clean.slice(6, 8));
  const h = clean.length >= 11 ? parseInt(clean.slice(9, 11)) : 0;
  const mi = clean.length >= 13 ? parseInt(clean.slice(11, 13)) : 0;
  const dateStr = `${clean.slice(0, 4)}-${clean.slice(4, 6)}-${clean.slice(6, 8)}`;
  const timeStr = clean.length >= 13 ? `${clean.slice(9, 11)}:${clean.slice(11, 13)}:00` : null;
  return { date: dateStr, time: timeStr, jsDate: new Date(y, mo, d, h, mi) };
}

function fmtDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function fmtTime(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:00`;
}

// ── RRULE Expander (einfach – DAILY, WEEKLY, MONTHLY, YEARLY) ─────────────────

function expandRRule(
  rruleLine: string,
  dtstart: Date,
  windowStart: Date,
  windowEnd: Date,
  exdates: Set<string>,
): Date[] {
  const params: Record<string, string> = {};
  rruleLine.split(";").forEach(p => {
    const [k, v] = p.split("=");
    if (k && v) params[k.toUpperCase()] = v;
  });

  const freq = params.FREQ;
  const interval = parseInt(params.INTERVAL || "1");
  const count = params.COUNT ? parseInt(params.COUNT) : undefined;
  const until = params.UNTIL ? parseDt(params.UNTIL)?.jsDate : undefined;
  const byDay = params.BYDAY?.split(",") || [];

  const dates: Date[] = [];
  const maxOccurrences = count || 500; // Safety limit
  const effectiveEnd = until && until < windowEnd ? until : windowEnd;

  let current = new Date(dtstart);
  let occurrences = 0;

  while (current <= effectiveEnd && occurrences < maxOccurrences) {
    if (current >= windowStart) {
      const dateKey = fmtDate(current);
      if (!exdates.has(dateKey)) {
        dates.push(new Date(current));
      }
    }
    occurrences++;

    // Next occurrence
    switch (freq) {
      case "DAILY":
        current.setDate(current.getDate() + interval);
        break;
      case "WEEKLY":
        if (byDay.length > 0) {
          // BYDAY: Find next matching day
          const dayMap: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
          let found = false;
          for (let tries = 0; tries < 7 * interval + 1; tries++) {
            current.setDate(current.getDate() + 1);
            const dayName = Object.entries(dayMap).find(([, v]) => v === current.getDay())?.[0];
            if (dayName && byDay.includes(dayName)) { found = true; break; }
          }
          if (!found) current.setDate(current.getDate() + 7 * interval);
        } else {
          current.setDate(current.getDate() + 7 * interval);
        }
        break;
      case "MONTHLY":
        current.setMonth(current.getMonth() + interval);
        break;
      case "YEARLY":
        current.setFullYear(current.getFullYear() + interval);
        break;
      default:
        return dates; // Unknown freq, return what we have
    }
  }
  return dates;
}

// ── iCal Parser mit RRULE Support ─────────────────────────────────────────────

interface ParsedEvent {
  uid: string; summary: string; startDate: string; startTime: string | null;
  endDate: string | null; endTime: string | null; location: string | null;
  description: string | null; allDay: boolean;
}

function parseIcal(icsText: string, windowStart: Date, windowEnd: Date): ParsedEvent[] {
  const events: ParsedEvent[] = [];
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
    const rrule = get("RRULE");
    const allDay = !dtstart.includes("T");

    const start = parseDt(dtstart);
    const end = parseDt(dtend);
    if (!start) continue;

    // EXDATE: Ausnahmen bei wiederkehrenden Terminen
    const exdates = new Set<string>();
    const exdateMatches = block.matchAll(/EXDATE[^:]*:(.+)/gm);
    for (const m of exdateMatches) {
      const parsed = parseDt(m[1]);
      if (parsed) exdates.add(parsed.date);
    }

    // Dauer berechnen (für wiederkehrende Termine)
    const durationMs = end ? end.jsDate.getTime() - start.jsDate.getTime() : 3600000;

    if (rrule) {
      // Wiederkehrend: Alle Instanzen im Zeitfenster generieren
      const occurrences = expandRRule(rrule, start.jsDate, windowStart, windowEnd, exdates);
      for (const occ of occurrences) {
        const occEnd = new Date(occ.getTime() + durationMs);
        events.push({
          uid: `${uid}_${fmtDate(occ)}`,
          summary,
          startDate: fmtDate(occ),
          startTime: allDay ? null : fmtTime(occ),
          endDate: fmtDate(occEnd),
          endTime: allDay ? null : fmtTime(occEnd),
          location: location || null,
          description: description || null,
          allDay,
        });
      }
    } else {
      // Einzeltermin
      if (start.date >= fmtDate(windowStart)) {
        events.push({
          uid, summary, startDate: start.date, startTime: start.time,
          endDate: end?.date || null, endTime: end?.time || null,
          location: location || null, description: description || null, allDay,
        });
      }
    }
  }
  return events;
}

// ── Main Handler ──────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { data: sources, error: srcErr } = await supabase
      .from("calendar_sources").select("*").eq("enabled", true);
    if (srcErr) throw srcErr;

    if (!sources || sources.length === 0) {
      const { data: settings } = await supabase.from("admin_settings").select("calendar_url, calendar_enabled").limit(1).maybeSingle();
      if (!(settings as any)?.calendar_enabled || !(settings as any)?.calendar_url) {
        return new Response(JSON.stringify({ error: "Keine Kalender konfiguriert", synced: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      sources.push({ id: "legacy", name: "Kalender", url: (settings as any).calendar_url, enabled: true });
    }

    // Zeitfenster: 30 Tage zurück bis 365 Tage voraus
    const windowStart = new Date();
    windowStart.setDate(windowStart.getDate() - 30);
    const windowEnd = new Date();
    windowEnd.setDate(windowEnd.getDate() + 365);

    let totalSynced = 0;
    const results: { name: string; synced: number; error?: string }[] = [];

    for (const source of sources) {
      try {
        const url = source.url.replace(/^webcal:\/\//i, "https://");
        const icsRes = await fetch(url);
        if (!icsRes.ok) { results.push({ name: source.name, synced: 0, error: `HTTP ${icsRes.status}` }); continue; }
        const icsText = await icsRes.text();

        const events = parseIcal(icsText, windowStart, windowEnd);

        if (events.length > 0) {
          if (source.id !== "legacy") {
            await supabase.from("calendar_events_cache").delete().eq("source_id", source.id);
          }
          // Batch insert in chunks of 100
          for (let c = 0; c < events.length; c += 100) {
            const chunk = events.slice(c, c + 100).map(e => ({
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
            await supabase.from("calendar_events_cache").upsert(chunk, { onConflict: "uid" });
          }
        }

        totalSynced += events.length;
        results.push({ name: source.name, synced: events.length });
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
