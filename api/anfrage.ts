// Anfragen von magicel.de per Mail zustellen.
//
// Warum (03.09.2026): Das CRM auf magicel.de wird stillgelegt; Emilian
// arbeitet ab sofort in bookartist. Das Formular schickte seine Anfragen an
// die Funktion `create-portal-request` im alten Supabase-Projekt.
//
// Der direkte Weg nach bookartist geht nicht: Dessen gleichnamige Funktion
// verlangt seit dem 18.07.2026 ein Kunden-Konto (gegen Identitaetsklau und
// Spam beim Marktplatz). Fuer ein Buchungsformular auf der eigenen Website
// waere das das Ende jeder Anfrage — niemand legt vorher ein Konto an.
//
// Deshalb der Weg, fuer den bookartist ohnehin gebaut ist: Die Anfrage kommt
// als MAIL in Emilians Postfach, und der Posteingangs-Abgleich macht daraus
// eine Anfrage. Kein neuer oeffentlicher Schreibzugang, keine Spam-Flaeche.
//
// Reply-To steht auf der Adresse des Interessenten. Damit sieht die Mail im
// Posteingang aus wie eine normale Anfrage, und "Antworten" geht direkt an
// ihn — nicht an die Website.
//
// Braucht RESEND_API_KEY in den Umgebungsvariablen dieses Vercel-Projekts.
// Fehlt er, antwortet die Funktion mit 503 und einem Satz, der sagt was
// fehlt — nicht mit einem stillen Fehlschlag.
import type { VercelRequest, VercelResponse } from "@vercel/node";

const AN = process.env.ANFRAGE_AN || "el@magicel.de";

// Absender: muss eine bei Resend FREIGEGEBENE Domain sein, sonst lehnt Resend
// ab. bookartist.de ist dort verifiziert (alle Plattform-Mails gehen von dort
// raus); magicel.de nur, wenn es dort eingetragen wurde. Deshalb per
// Umgebungsvariable einstellbar, mit der sicheren Voreinstellung.
const VON = process.env.ANFRAGE_VON || "Website magicel.de <noreply@bookartist.de>";

type Anfrage = {
  anrede?: string;
  vorname?: string;
  nachname?: string;
  name?: string;
  firma?: string;
  email?: string;
  phone?: string;
  anlass?: string;
  datum?: string;
  ort?: string;
  gaeste?: number | string;
  format?: string;
  nachricht?: string;
  /** Honigtopf — wenn ausgefuellt: Bot. Still mit 200 antworten. */
  website?: string;
};

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function zeilen(a: Anfrage): Array<[string, string]> {
  const name = a.name || `${a.vorname ?? ""} ${a.nachname ?? ""}`.trim();
  const paare: Array<[string, unknown]> = [
    ["Name", [a.anrede, name].filter(Boolean).join(" ")],
    ["Firma", a.firma],
    ["E-Mail", a.email],
    ["Telefon", a.phone],
    ["Anlass", a.anlass],
    ["Datum", a.datum],
    ["Ort", a.ort],
    ["Gäste", a.gaeste],
    ["Format", a.format],
  ];
  return paare
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => [k, String(v)]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const a = (req.body ?? {}) as Anfrage;

  // Honigtopf: Bots fuellen jedes Feld aus. Still mit 200 antworten, damit
  // sie nicht merken, dass sie erkannt wurden.
  if (a.website && a.website.trim()) return res.status(200).json({ ok: true });

  if (!a.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(a.email)) {
    return res.status(400).json({ error: "E-Mail-Adresse fehlt oder ist ungültig." });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(503).json({
      error:
        "Anfrage kann gerade nicht zugestellt werden (RESEND_API_KEY fehlt in den Umgebungsvariablen).",
    });
  }

  const felder = zeilen(a);
  const name = a.name || `${a.vorname ?? ""} ${a.nachname ?? ""}`.trim() || a.email;

  const tabelle = felder
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap">${esc(k)}</td>` +
        `<td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("");

  const html =
    `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;color:#17181c">` +
    `<p style="margin:0 0 14px 0">Neue Anfrage über magicel.de</p>` +
    `<table style="border-collapse:collapse;margin-bottom:16px">${tabelle}</table>` +
    (a.nachricht
      ? `<p style="margin:0 0 6px 0;color:#666">Nachricht</p>` +
        `<p style="margin:0;white-space:pre-wrap">${esc(a.nachricht)}</p>`
      : "") +
    `</div>`;

  const text =
    "Neue Anfrage über magicel.de\n\n" +
    felder.map(([k, v]) => `${k}: ${v}`).join("\n") +
    (a.nachricht ? `\n\nNachricht:\n${a.nachricht}` : "");

  const antwort = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: VON,
      to: [AN],
      reply_to: a.email,
      subject: `Anfrage: ${a.anlass || "Auftritt"}${a.datum ? ` am ${a.datum}` : ""} — ${name}`,
      html,
      text,
    }),
  });

  if (!antwort.ok) {
    // Den Grund durchreichen: Ein "fehlgeschlagen" ohne Grund hat noch
    // niemandem geholfen.
    const grund = await antwort.text();
    return res.status(502).json({ error: `Zustellung fehlgeschlagen: ${grund.slice(0, 200)}` });
  }

  return res.status(200).json({ ok: true });
}
