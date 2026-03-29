import { serve } from "https://deno.land/std/http/server.ts";
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

const formatUtcDateTime = (date: Date) => {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const formatAllDayDate = (dateStr: string) => {
  return dateStr.replace(/-/g, "");
};

const addOneDay = (dateStr: string) => {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
};

const buildDateTimeFromDateAndTime = (dateStr: string, timeStr: string) => {
  const date = new Date(`${dateStr}T${timeStr}:00`);
  return formatUtcDateTime(date);
};

serve(async () => {
  const { data: events, error: eventsError } = await supabase
    .from("portal_events")
    .select("*")
    .is("deleted_at", null);

  const { data: requests, error: requestsError } = await supabase
    .from("portal_requests")
    .select("*")
    .is("deleted_at", null)
    .is("event_id", null);

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
X-WR-CALNAME:Magicel CRM
X-WR-TIMEZONE:Europe/Berlin
`;

  // EVENTS = fest gebucht
  for (const e of events || []) {
    if (!e.event_date) continue;

    const eventName = e.title || "Veranstaltung";
    const companyOrName = e.company || e.firma || e.customer_name || "";
    const summary = companyOrName
      ? `${eventName} ${companyOrName} – gebucht`
      : `${eventName} – gebucht`;

    const noteLines = [
      `Status: ${e.status || "gebucht"}`,
      e.format ? `Format: ${e.format}` : null,
      e.guests ? `Gäste: ${e.guests}` : null,
      e.location ? `Ort: ${e.location}` : null,
      e.notes ? `Details: ${e.notes}` : null,
      e.request_id
        ? `Anfrage: https://magicel.de/admin/requests/${e.request_id}`
        : null,
      `Event: https://magicel.de/admin/events/${e.id}`,
    ].filter(Boolean);

    const description = noteLines.join("\n");

    ics += `
BEGIN:VEVENT
UID:event-${e.id}@magicel
DTSTAMP:${formatUtcDateTime(new Date())}
`;

    if (e.start_time) {
      const start = buildDateTimeFromDateAndTime(e.event_date, e.start_time);
      const end = e.end_time
        ? buildDateTimeFromDateAndTime(e.event_date, e.end_time)
        : start;

      ics += `DTSTART:${start}
DTEND:${end}
`;
    } else {
      ics += `DTSTART;VALUE=DATE:${formatAllDayDate(e.event_date)}
DTEND;VALUE=DATE:${addOneDay(e.event_date)}
`;
    }

    ics += `SUMMARY:${escapeIcsText(summary)}
LOCATION:${escapeIcsText(e.location || "")}
DESCRIPTION:${escapeIcsText(description)}
END:VEVENT
`;
  }

  // REQUESTS = reserviert / Option
  for (const r of requests || []) {
    if (!r.datum) continue;

    const eventType = r.anlass || "Veranstaltung";
    const companyOrName = r.firma || r.name || "";
    const summary = companyOrName
      ? `Termin reserviert: ${eventType} ${companyOrName}`
      : `Termin reserviert: ${eventType}`;

    const noteLines = [
      `Status: ${r.status || "Anfrage"}`,
      r.format ? `Format: ${r.format}` : null,
      r.gaeste ? `Gäste: ${r.gaeste}` : null,
      r.ort ? `Ort: ${r.ort}` : null,
      r.nachricht ? `Details: ${r.nachricht}` : null,
      `Anfrage: https://magicel.de/admin/requests/${r.id}`,
    ].filter(Boolean);

    const description = noteLines.join("\n");

    ics += `
BEGIN:VEVENT
UID:req-${r.id}@magicel
DTSTAMP:${formatUtcDateTime(new Date())}
`;

    if (r.uhrzeit) {
      const start = buildDateTimeFromDateAndTime(r.datum, r.uhrzeit);

      ics += `DTSTART:${start}
`;
    } else {
      ics += `DTSTART;VALUE=DATE:${formatAllDayDate(r.datum)}
DTEND;VALUE=DATE:${addOneDay(r.datum)}
`;
    }

    ics += `SUMMARY:${escapeIcsText(summary)}
LOCATION:${escapeIcsText(r.ort || "")}
DESCRIPTION:${escapeIcsText(description)}
END:VEVENT
`;
  }

  ics += "END:VCALENDAR";

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
    },
  });
});
