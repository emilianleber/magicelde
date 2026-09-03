// Anfragen von magicel.de als Mail zustellen.
//
// Warum (03.09.2026): Das CRM auf magicel.de wird stillgelegt; Emilian
// arbeitet ab sofort in bookartist. Bisher ging das Formular an die Funktion
// `create-portal-request` im alten Supabase-Projekt (rjhvqctjtgfpxzhnrozt).
//
// Der direkte Weg nach bookartist geht NICHT: Dessen gleichnamige Funktion
// verlangt seit dem 18.07.2026 ein Kunden-Konto — gegen Identitaetsklau und
// Spam beim Marktplatz. Auf einem Buchungsformular waere das das Ende jeder
// Anfrage. Nachgestellt mit einem echten POST: HTTP 401, "account_required".
//
// Deshalb der Weg, fuer den bookartist ohnehin gebaut ist: Die Anfrage geht
// als Mail in Emilians Postfach, und der Posteingangs-Abgleich macht daraus
// eine Anfrage. Kein neuer oeffentlicher Schreibzugang, keine Spam-Flaeche.
//
// Es geht genau EINE Mail raus: die an Emilian. Die frueher automatisch
// versendete Bestaetigung an den Interessenten faellt weg (Entscheidung
// Emilian, 03.09.2026) — er antwortet ohnehin selbst, und eine automatische
// Bestaetigung davor nimmt der eigenen Antwort die Wirkung.
//
// Der Versand laeuft weiter ueber Resend mit dem verifizierten Absender
// el@magicel.de — magicel hat dort ein eigenes Konto.
//
// Braucht RESEND_API_KEY in den Umgebungsvariablen dieses Vercel-Projekts —
// denselben Schluessel, den das alte Supabase-Projekt benutzt. Fehlt er,
// antwortet die Funktion mit 503 und sagt was fehlt, statt still zu scheitern.
import type { VercelRequest, VercelResponse } from "@vercel/node";

const AN = process.env.ANFRAGE_AN || "el@magicel.de";
const VON = process.env.ANFRAGE_VON || "Emilian Leber <el@magicel.de>";

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

/**
 * Ersten Buchstaben gross.
 *
 * NICHT ueber \b\w — das schreibt den Buchstaben NACH einem Umlaut gross
 * ("Bühnenshow" wuerde zu "BüHnenshow"). Deshalb nur das erste Zeichen.
 */
const gross = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/** Format-Werte des Formulars in lesbare Namen — wie in der alten Funktion. */
const FORMATE: Record<string, string> = {
  buehne: "Bühnenshow", buehnenshow: "Bühnenshow", closeup: "Close-Up",
  "close-up": "Close-Up", walking_act: "Walking Act", walking: "Walking Act",
  magic_dinner: "Magic Dinner", "magic-dinner": "Magic Dinner", dinner: "Magic Dinner",
  kombination: "Kombination", kombi: "Kombination", beratung: "Beratung",
  moderation: "Moderation", unsicher: "Noch offen",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  const a = (req.body ?? {}) as Anfrage;

  // Honigtopf: Bots fuellen jedes Feld aus. Still mit 200 antworten, damit
  // sie nicht merken, dass sie erkannt wurden.
  if (a.website && a.website.trim()) return res.status(200).json({ ok: true });

  const email = String(a.email ?? "").trim().toLowerCase();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: "E-Mail-Adresse fehlt oder ist ungültig." });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return res.status(503).json({
      error: "Anfrage kann gerade nicht zugestellt werden (RESEND_API_KEY fehlt).",
    });
  }

  const nachname = String(a.nachname ?? "").trim();
  const name = (a.name || `${a.vorname ?? ""} ${nachname}`.trim()).trim();
  const anrede = String(a.anrede ?? "").trim();
  const firma = a.firma ? String(a.firma).trim() : null;
  const anlass = a.anlass ? gross(String(a.anlass).trim()) : null;
  const ort = a.ort ? String(a.ort).trim() : null;
  const rohFormat = a.format ? String(a.format).trim().toLowerCase() : null;
  const format = rohFormat ? FORMATE[rohFormat] || gross(rohFormat) : null;
  const nachricht = a.nachricht ? String(a.nachricht).trim() : null;

  // "2026-09-26" -> "26. September 2026"
  const rohDatum = a.datum ? String(a.datum).trim() : null;
  const datum = rohDatum
    ? new Date(`${rohDatum}T12:00:00`).toLocaleDateString("de-DE", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  async function senden(body: Record<string, unknown>) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error((await r.text()).slice(0, 200));
  }

  // ── Mail an Emilian ───────────────────────────────────────────────────
  // Reply-To auf den Interessenten: Damit sieht sie im Posteingang aus wie
  // eine normale Anfrage, "Antworten" geht direkt an ihn — und der
  // Posteingangs-Abgleich in bookartist ordnet sie dem richtigen Kunden zu.
  const felder: Array<[string, string | null]> = [
    ["Name", [anrede, name].filter(Boolean).join(" ") || null],
    ["Firma", firma],
    ["E-Mail", email],
    ["Telefon", a.phone ? String(a.phone).trim() : null],
    ["Anlass", anlass],
    ["Datum", datum],
    ["Ort", ort],
    ["Gäste", a.gaeste != null && a.gaeste !== "" ? String(a.gaeste) : null],
    ["Format", format],
  ];
  const gefuellt = felder.filter(([, v]) => v);
  const tabelle = gefuellt
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap">${esc(k)}</td>` +
        `<td style="padding:4px 0"><strong>${esc(v)}</strong></td></tr>`,
    )
    .join("");

  try {
    await senden({
      from: VON,
      to: [AN],
      reply_to: email,
      subject: `Anfrage: ${anlass || "Auftritt"}${datum ? ` am ${datum}` : ""} — ${name || email}`,
      html:
        `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;color:#17181c">` +
        `<p style="margin:0 0 14px 0">Neue Anfrage über magicel.de</p>` +
        `<table style="border-collapse:collapse;margin-bottom:16px">${tabelle}</table>` +
        (nachricht
          ? `<p style="margin:0 0 6px 0;color:#666">Nachricht</p>` +
            `<p style="margin:0;white-space:pre-wrap">${esc(nachricht)}</p>`
          : "") +
        `</div>`,
      text:
        "Neue Anfrage über magicel.de\n\n" +
        gefuellt.map(([k, v]) => `${k}: ${v}`).join("\n") +
        (nachricht ? `\n\nNachricht:\n${nachricht}` : ""),
    });
  } catch (e) {
    // Diese Mail ist die eigentliche Zustellung — schlaegt sie fehl, ist die
    // Anfrage weg. Deshalb Fehler melden statt "ok" zu antworten.
    return res.status(502).json({ error: `Zustellung fehlgeschlagen: ${(e as Error).message}` });
  }

  return res.status(200).json({ ok: true });
}
