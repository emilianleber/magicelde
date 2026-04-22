import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const escapeIcsText = (value?: string | null) => {
  if (!value) return "";
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
};

const formatUtcDateTime = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

const formatAllDayDate = (dateStr: string) => dateStr.replace(/-/g, "");

const addOneDay = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
};

// Zeitformat mit TZID — Zeiten können als UTC (TIMETZ) oder lokal (TEXT) gespeichert sein.
// Falls TIMETZ: Supabase liefert UTC-normalisiert ("12:00:00+00") → muss nach Europe/Berlin konvertiert werden.
// Falls TEXT: einfach "14:00" → direkt nutzen.
const buildLocalDateTime = (dateStr: string, timeStr: string) => {
  const d = dateStr.replace(/-/g, "");

  // Prüfe ob Timezone-Offset vorhanden (z.B. "+00", "+02:00", "+0200")
  const tzMatch = timeStr.match(/([+-])(\d{2}):?(\d{2})$/);
  let hours: number;
  let mins: number;
  if (tzMatch) {
    // TIMETZ: parse UTC time and convert to Europe/Berlin
    const utcDate = new Date(`${dateStr}T${timeStr}`);
    // Nutze Intl um die Europe/Berlin Stunde zu bekommen
    const berlinParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(utcDate);
    hours = Number(berlinParts.find(p => p.type === "hour")?.value || "0");
    mins = Number(berlinParts.find(p => p.type === "minute")?.value || "0");
  } else {
    // TEXT: "14:00" oder "14:00:00" — direkt nutzen
    const parts = timeStr.split(":");
    hours = Number(parts[0]);
    mins = Number(parts[1] || "0");
  }

  const t = String(hours).padStart(2, "0") + String(mins).padStart(2, "0") + "00";
  return `${d}T${t}`;
};

// Status-Emoji für schnelle visuelle Erkennung
const statusEmoji = (status: string | null): string => {
  switch (status) {
    case "neu": return "🔵";
    case "in_bearbeitung":
    case "details_besprechen": return "🟡";
    case "angebot_gesendet":
    case "warte_auf_kunde": return "🟠";
    case "bestätigt": return "🟢";
    case "abgelehnt": return "🔴";
    default: return "⚪";
  }
};

serve(async () => {
  // Events mit Kundennamen laden (ohne stornierte/abgelehnte)
  const { data: events, error: eventsError } = await supabase
    .from("portal_events")
    .select("*, customer:customer_id(name, company, email, phone)")
    .is("deleted_at", null)
    .not("status", "in", "(storniert,abgelehnt)");

  // Nur offene Anfragen (ohne event_id = noch nicht gebucht, ohne stornierte/abgelehnte)
  const { data: requests, error: requestsError } = await supabase
    .from("portal_requests")
    .select("*")
    .is("deleted_at", null)
    .is("event_id", null)
    .not("status", "in", "(storniert,abgelehnt)");

  // ToDos mit Datum
  const { data: todos } = await supabase
    .from("portal_todos")
    .select("id, title, due_date, priority, status")
    .not("due_date", "is", null)
    .neq("status", "erledigt");

  if (eventsError || requestsError) {
    return new Response("Fehler beim Laden der Kalenderdaten", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  let ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Magicel CRM//DE
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Magicel Events
X-WR-TIMEZONE:Europe/Berlin
REFRESH-INTERVAL;VALUE=DURATION:PT15M
X-PUBLISHED-TTL:PT15M
BEGIN:VTIMEZONE
TZID:Europe/Berlin
BEGIN:STANDARD
DTSTART:19701025T030000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10
TZOFFSETFROM:+0200
TZOFFSETTO:+0100
TZNAME:CET
END:STANDARD
BEGIN:DAYLIGHT
DTSTART:19700329T020000
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3
TZOFFSETFROM:+0100
TZOFFSETTO:+0200
TZNAME:CEST
END:DAYLIGHT
END:VTIMEZONE
`;

  // ══════════════════════════════════════════════════════
  // GEBUCHTE EVENTS — grün, fest im Kalender
  // ══════════════════════════════════════════════════════
  for (const e of events || []) {
    if (!e.event_date) continue;

    const customer = e.customer as any;
    const customerName = customer?.name || "";
    const customerCompany = customer?.company || "";
    const displayName = customerCompany ? `${customerName} (${customerCompany})` : customerName;

    // Summary: ✅ Hochzeit Max Mustermann (Firma GmbH) — gebucht
    const eventType = e.title || "Event";
    const summary = `✅ ${eventType}${displayName ? ` – ${displayName}` : ""} — GEBUCHT`;

    // Beschreibung mit allen Details
    const descLines = [
      `Status: GEBUCHT`,
      `Typ: ${eventType}`,
      customerName ? `Kunde: ${customerName}` : null,
      customerCompany ? `Firma: ${customerCompany}` : null,
      customer?.email ? `E-Mail: ${customer.email}` : null,
      customer?.phone ? `Tel: ${customer.phone}` : null,
      e.format ? `Format: ${e.format}` : null,
      e.guests ? `Gäste: ${e.guests}` : null,
      e.notes ? `Notizen: ${e.notes}` : null,
      "",
      `CRM: https://admin.magicel.de/admin/bookings/event/${e.id}`,
    ].filter((l) => l !== null);

    ics += `BEGIN:VEVENT
UID:event-${e.id}@magicel
DTSTAMP:${formatUtcDateTime(new Date())}
`;

    if (e.start_time) {
      const start = buildLocalDateTime(e.event_date, e.start_time);
      // Default-Dauer: 60 Minuten
      const startMatch = start.match(/T(\d{2})(\d{2})/);
      const startHour = Number(startMatch?.[1] || "0");
      const startMin = Number(startMatch?.[2] || "0");
      const endMinTotal = startHour * 60 + startMin + 60;
      const endH = String(Math.floor(endMinTotal / 60) % 24).padStart(2, "0");
      const endM = String(endMinTotal % 60).padStart(2, "0");
      const endTime = e.end_time || `${endH}:${endM}`;
      const end = buildLocalDateTime(e.event_date, endTime);
      ics += `DTSTART;TZID=Europe/Berlin:${start}
DTEND;TZID=Europe/Berlin:${end}
`;
    } else {
      // Ganztägig + Erinnerung dass Uhrzeit fehlt
      ics += `DTSTART;VALUE=DATE:${formatAllDayDate(e.event_date)}
DTEND;VALUE=DATE:${addOneDay(e.event_date)}
`;
    }

    // Erinnerungen: 1 Tag + 2 Stunden vorher
    ics += `SUMMARY:${escapeIcsText(summary)}
LOCATION:${escapeIcsText(e.location || "")}
DESCRIPTION:${escapeIcsText(descLines.join("\n"))}
CATEGORIES:GEBUCHT
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-P1D
ACTION:DISPLAY
DESCRIPTION:Morgen: ${escapeIcsText(eventType)} ${escapeIcsText(displayName)}
END:VALARM
BEGIN:VALARM
TRIGGER:-PT2H
ACTION:DISPLAY
DESCRIPTION:In 2 Stunden: ${escapeIcsText(eventType)} ${escapeIcsText(displayName)}
END:VALARM
`;

    // Extra Erinnerung wenn keine Uhrzeit
    if (!e.start_time) {
      ics += `BEGIN:VALARM
TRIGGER:-P3D
ACTION:DISPLAY
DESCRIPTION:⚠️ UHRZEIT FEHLT: ${escapeIcsText(eventType)} am ${e.event_date} – bitte Uhrzeit mit ${escapeIcsText(customerName)} klären!
END:VALARM
`;
    }

    ics += `END:VEVENT
`;
  }

  // ══════════════════════════════════════════════════════
  // ANFRAGEN — gelb/orange, Termin reserviert
  // ══════════════════════════════════════════════════════
  for (const r of requests || []) {
    if (!r.datum) continue;

    const eventType = r.anlass || "Anfrage";
    const contactName = r.name || "";
    const company = r.firma || "";
    const displayName = company ? `${contactName} (${company})` : contactName;

    // Summary: 🟡 Hochzeit Max Mustermann — ANFRAGE
    const emoji = statusEmoji(r.status);
    const summary = `${emoji} ${eventType}${displayName ? ` – ${displayName}` : ""} — ANFRAGE`;

    const descLines = [
      `Status: ${r.status || "Anfrage"}`,
      `Typ: ${eventType}`,
      contactName ? `Kontakt: ${contactName}` : null,
      company ? `Firma: ${company}` : null,
      r.email ? `E-Mail: ${r.email}` : null,
      r.phone ? `Tel: ${r.phone}` : null,
      r.format ? `Format: ${r.format}` : null,
      r.gaeste ? `Gäste: ${r.gaeste}` : null,
      r.ort ? `Ort: ${r.ort}` : null,
      r.nachricht ? `Nachricht: ${r.nachricht}` : null,
      "",
      `CRM: https://admin.magicel.de/admin/bookings/${r.id}`,
    ].filter((l) => l !== null);

    ics += `BEGIN:VEVENT
UID:req-${r.id}@magicel
DTSTAMP:${formatUtcDateTime(new Date())}
`;

    if (r.uhrzeit) {
      const start = buildLocalDateTime(r.datum, r.uhrzeit);
      ics += `DTSTART;TZID=Europe/Berlin:${start}
DTEND;TZID=Europe/Berlin:${start}
`;
    } else {
      ics += `DTSTART;VALUE=DATE:${formatAllDayDate(r.datum)}
DTEND;VALUE=DATE:${addOneDay(r.datum)}
`;
    }

    ics += `SUMMARY:${escapeIcsText(summary)}
LOCATION:${escapeIcsText(r.ort || "")}
DESCRIPTION:${escapeIcsText(descLines.join("\n"))}
CATEGORIES:ANFRAGE
STATUS:TENTATIVE
TRANSP:TRANSPARENT
`;

    // Erinnerung: Uhrzeit klären wenn keine hinterlegt
    if (!r.uhrzeit) {
      ics += `BEGIN:VALARM
TRIGGER:-P5D
ACTION:DISPLAY
DESCRIPTION:⚠️ UHRZEIT KLÄREN: ${escapeIcsText(eventType)} mit ${escapeIcsText(contactName)} am ${r.datum}
END:VALARM
`;
    }

    ics += `END:VEVENT
`;
  }

  // ══════════════════════════════════════════════════════
  // TODOS — als ganztägige Events im Kalender
  // ══════════════════════════════════════════════════════
  for (const t of todos || []) {
    if (!t.due_date) continue;
    const priorityEmoji = t.priority === "hoch" ? "🔴" : t.priority === "niedrig" ? "🟢" : "🟡";
    const summary = `${priorityEmoji} ToDo: ${escapeIcsText(t.title)}`;
    ics += `BEGIN:VEVENT
UID:todo-${t.id}@magicel
DTSTAMP:${formatUtcDateTime(new Date())}
DTSTART;VALUE=DATE:${formatAllDayDate(t.due_date)}
DTEND;VALUE=DATE:${addOneDay(t.due_date)}
SUMMARY:${summary}
CATEGORIES:TODO
STATUS:TENTATIVE
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:ToDo fällig: ${escapeIcsText(t.title)}
END:VALARM
END:VEVENT
`;
  }

  ics += "END:VCALENDAR";

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=magicel-events.ics",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
});
