// Umzug: altes CRM (magicel.de) -> bookartist, Mandant "internal".
//
// Aufruf:
//   node scripts/umzug.mjs            nur zaehlen, nichts schreiben
//   node scripts/umzug.mjs --schreiben
//
// Warum das direkt geht (03.09.2026 geprueft): bookartist ist aus diesem CRM
// entstanden. Die Tabellen heissen gleich, und das Schema von bookartist ist
// eine OBERMENGE — von 12 verglichenen Tabellen passen 11 ohne Zutun. Ein
// Umweg ueber CSV wuerde nur Dokumente, Shows und Effekte verlieren.
//
// Zwei Ausnahmen, gegen die nichts zu machen ist:
//   pakete                    gibt es in bookartist nicht (12 Zeilen bleiben)
//   portal_requests.paket_id  gibt es dort nicht (Spalte wird weggelassen)
//
// Bewusst NICHT mitgenommen:
//   portal_inbox_mails  4.553 Mails — bookartist liest DASSELBE Postfach
//                       bereits per IMAP und hat 8.883 davon. Ein zweiter
//                       Satz waere ein Duplikat, kein Umzug.
//   admin_settings      in bookartist bereits eingerichtet; ueberschreiben
//                       wuerde Firmendaten, Nummernkreise und Bankverbindung
//                       kaputtmachen.
//
// Die ids werden BEHALTEN. Nur so bleiben die Verknuepfungen heil
// (Dokument -> Kunde, Position -> Dokument, Anfrage -> Kunde). Geschrieben
// wird per upsert, der Lauf ist also wiederholbar.

import { readFileSync } from "node:fs";

const REPO = new URL("..", import.meta.url).pathname.replace(/^\/@fs/, "");
const env = Object.fromEntries(
  readFileSync(`${REPO}/.env.alt`, "utf8")
    .split("\n")
    .filter((z) => z.includes("=") && !z.startsWith("#"))
    .map((z) => [z.slice(0, z.indexOf("=")).trim(), z.slice(z.indexOf("=") + 1).trim()]),
);

const ALT = { url: env.ALT_URL, key: env.ALT_SERVICE_KEY };
const NEU = {
  url: "https://fgesrvkkvqngrbvdwzdh.supabase.co",
  key: readFileSync(`${process.env.HOME}/ba-wt/deploy-clean/.env`, "utf8")
    .split("\n").find((z) => z.startsWith("SUPABASE_SERVICE_ROLE_KEY="))?.split("=").slice(1).join("="),
};
const TENANT = "9d441e2f-da91-4d38-b918-fd24c5ecb0e4";
const SCHREIBEN = process.argv.includes("--schreiben");

/**
 * Reihenfolge ist Pflicht: Ein Dokument ohne seinen Kunden laesst sich nicht
 * einfuegen. Deshalb erst die Bezugsziele, dann die Verweise.
 */
const TABELLEN = [
  "portal_customers",
  // Auftraege VOR Anfragen: portal_requests.event_id zeigt auf
  // portal_events. Andersherum bricht es ab ("Key (event_id)=… is not
  // present in table portal_events").
  "portal_events",
  // Shows VOR den Anfragen: Der Trigger sync_request_to_booking spiegelt jede
  // Anfrage nach portal_bookings und uebernimmt dabei show_id — zeigt die auf
  // eine Show, die es noch nicht gibt, bricht der Fremdschluessel ab. Der
  // Fehler erscheint dann auf portal_bookings, nicht auf portal_requests.
  "shows_intern",
  "portal_requests",
  "portal_documents",
  "document_positions",
  "portal_todos",
  "effekte",
  "artikel_stamm",
  "dokument_textvorlagen",
  "portal_messages",
];

/** Spalten, die es in bookartist nicht gibt. */
const WEGLASSEN = { portal_requests: ["paket_id"] };

/**
 * Spalten, die auf ANMELDE-Konten zeigen und deshalb geleert werden.
 *
 * portal_customers.user_id verweist auf einen Auth-Benutzer. Die Konten des
 * alten Projekts gibt es hier nicht — der Fremdschluessel schlaegt fehl
 * ("Key (user_id)=… is not present in table users"). Und selbst wenn: Es
 * waeren fremde Konten in einem fremden Mandanten.
 *
 * Kein Verlust: bookartist verknuepft ein Kundenkonto beim naechsten Login
 * ueber die MAILADRESSE wieder (link-customer-identity).
 */
const LEEREN = ["user_id", "created_by", "updated_by", "owner_id"];

const MONATE = {
  januar: "01", februar: "02", "märz": "03", maerz: "03", april: "04", mai: "05",
  juni: "06", juli: "07", august: "08", september: "09", oktober: "10",
  november: "11", dezember: "12",
};

/**
 * Datumswerte in ein Format bringen, das Postgres annimmt.
 *
 * Im alten System ist `portal_requests.datum` Text — die meisten Werte sind
 * ISO, einer war "11. Juli 2026". Ein Spaltenvergleich sieht das nicht: Die
 * Spalte heisst gleich und ist laut Schema in BEIDEN Projekten ein Datum.
 * Aufgefallen ist es erst beim Schreiben ("invalid input syntax for type
 * date").
 *
 * Nicht Umrechenbares wird geleert und gemeldet — ein falsches Datum waere
 * schlimmer als keines.
 */
/**
 * Textspalten, die insgeheim ein Datum sein MUESSEN.
 *
 * portal_requests.datum ist laut Schema `text` — trotzdem scheiterte das
 * Schreiben mit "invalid input syntax for type date". Der Grund steht nicht
 * in der Spalte, sondern im Trigger: trg_sync_request_to_booking spiegelt
 * jede Anfrage nach portal_bookings und castet dabei
 * `NULLIF(NEW.datum,'')::date`. Ein unparsbarer Text kippt damit das INSERT,
 * obwohl die Zielspalte ihn annehmen wuerde.
 */
const ALS_DATUM = { portal_requests: ["datum"], portal_events: ["datum"] };

/**
 * Werte, die in beiden Systemen dasselbe meinen, aber anders heissen.
 *
 * portal_documents.status: Das alte CRM schreibt "gesendet", bookartist
 * kennt nur "versendet" — die Pruefregel portal_documents_status_check laesst
 * nichts anderes zu. Neun Dokumente haengen daran. Dieselbe Fehlerklasse wie
 * schon zweimal zuvor: ein Wort, das an einer Stelle geaendert wurde und an
 * der anderen stehen blieb.
 *
 * "versendet" ist zudem GoBD-festschreibend — richtig so, die Dokumente sind
 * ja raus.
 */
const WERTE_UMSCHREIBEN = {
  portal_documents: { status: { gesendet: "versendet" } },
  // shows_intern.status: Das alte CRM kennt "aktiv", bookartist nicht
  // (erlaubt sind entwurf/gesendet/akzeptiert/proben/fertig/archiviert).
  // "fertig" ist die naechstliegende Lesart einer aktiven Show — falls es
  // anders gemeint war, sind es zwei Zeilen zum Nachziehen.
  shows_intern: { status: { aktiv: "fertig" } },
};

function alsDatum(wert) {
  if (wert == null || wert === "") return { wert: null, unklar: false };
  const s = String(wert).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return { wert: s, unklar: false };
  const m = s.match(/^(\d{1,2})\.\s*([A-Za-zÄÖÜäöü]+)\.?\s+(\d{4})$/);
  if (m) {
    const mon = MONATE[m[2].toLowerCase()];
    if (mon) return { wert: `${m[3]}-${mon}-${m[1].padStart(2, "0")}`, unklar: false };
  }
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return { wert: d.toISOString().slice(0, 10), unklar: false };
  return { wert: null, unklar: true };
}

const kopf = (s) => ({ apikey: s.key, Authorization: `Bearer ${s.key}`, "Content-Type": "application/json" });

async function schema(s) {
  const r = await fetch(`${s.url}/rest/v1/`, { headers: { ...kopf(s), Accept: "application/openapi+json" } });
  const d = await r.json();
  return Object.fromEntries(
    Object.entries(d.definitions ?? {}).map(([t, v]) => [
      t,
      { spalten: new Set(Object.keys(v.properties ?? {})), formate: Object.fromEntries(Object.entries(v.properties ?? {}).map(([k, p]) => [k, p.format])) },
    ]),
  );
}

async function lies(tab) {
  const alle = [];
  for (let von = 0; ; von += 1000) {
    const r = await fetch(`${ALT.url}/rest/v1/${tab}?select=*&order=created_at.asc`, {
      headers: { ...kopf(ALT), Range: `${von}-${von + 999}` },
    });
    if (!r.ok) throw new Error(`${tab}: lesen fehlgeschlagen (${r.status}) ${await r.text()}`);
    const teil = await r.json();
    alle.push(...teil);
    if (teil.length < 1000) break;
  }
  return alle;
}

async function schreibe(tab, zeilen) {
  // In Haeppchen: Ein einzelner riesiger Rumpf laeuft in Zeitgrenzen.
  for (let i = 0; i < zeilen.length; i += 200) {
    const teil = zeilen.slice(i, i + 200);
    const r = await fetch(`${NEU.url}/rest/v1/${tab}?on_conflict=id`, {
      method: "POST",
      headers: { ...kopf(NEU), Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(teil),
    });
    if (!r.ok) throw new Error(`${tab}: schreiben fehlgeschlagen (${r.status}) ${(await r.text()).slice(0, 300)}`);
  }
}

const neuesSchema = await schema(NEU);

/**
 * Kunden ueber die Mailadresse zusammenfuehren.
 *
 * Zwei Quellen von Doppeln, und beide sind echt:
 *
 *  1. Innerhalb des alten Bestands. Das alte CRM liess dieselbe Adresse
 *     mehrfach zu, bookartist nicht — dort liegt ein eindeutiger Index auf
 *     (tenant_id, email).
 *  2. Gegen den BESTEHENDEN Bestand in bookartist. Dort liegen bereits die
 *     Kunden aus dem Kreativ.Management-Import. Wer in beiden Systemen stand,
 *     kaeme sonst zweimal an. Genau daran brach der erste Lauf ab
 *     (info@restaurant-waldwiese.de).
 *
 * Zusammenfuehren heisst NICHT wegwerfen: Die bestehende bzw. aeltere Zeile
 * bleibt, und alle Verweise auf die verworfene werden auf sie umgebogen —
 * sonst zeigten Dokumente und Anfragen ins Leere.
 */
async function bestehendeKunden() {
  const r = await fetch(`${NEU.url}/rest/v1/portal_customers?select=id,email&tenant_id=eq.${TENANT}`, {
    headers: kopf(NEU),
  });
  if (!r.ok) throw new Error(`bestehende Kunden lesen fehlgeschlagen (${r.status})`);
  const map = new Map();
  for (const k of await r.json()) {
    const mail = String(k.email ?? "").trim().toLowerCase();
    if (mail) map.set(mail, k.id);
  }
  return map;
}

function kundenZusammenfassen(kunden, bestehend) {
  const nachMail = new Map(bestehend); // Mail -> id (bestehende zaehlen mit)
  const behalten = [];
  const umbiegen = new Map(); // alte id -> Ziel-id
  let aufBestehende = 0;
  for (const k of [...kunden].sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))) {
    const mail = String(k.email ?? "").trim().toLowerCase();
    if (!mail) { behalten.push(k); continue; }
    const ziel = nachMail.get(mail);
    if (ziel) {
      umbiegen.set(k.id, ziel);
      if (bestehend.has(mail)) aufBestehende++;
      continue;
    }
    nachMail.set(mail, k.id);
    behalten.push(k);
  }
  return { behalten, umbiegen, aufBestehende };
}

let kundenUmbiegen = new Map();
const unklareDaten = [];
const gerundet = [];

console.log(SCHREIBEN ? "SCHREIBEN\n" : "Nur zaehlen — nichts wird geschrieben (--schreiben zum Ausfuehren)\n");
let gesamt = 0;

for (const tab of TABELLEN) {
  const ziel = neuesSchema[tab];
  const erlaubt = ziel?.spalten;
  if (!erlaubt) {
    console.log(`  ${tab.padEnd(24)} in bookartist nicht vorhanden — uebersprungen`);
    continue;
  }
  let zeilen;
  try {
    zeilen = await lies(tab);
  } catch (e) {
    console.log(`  ${tab.padEnd(24)} ! ${e.message}`);
    continue;
  }

  if (tab === "portal_customers") {
    const bestehend = await bestehendeKunden();
    const { behalten, umbiegen, aufBestehende } = kundenZusammenfassen(zeilen, bestehend);
    kundenUmbiegen = umbiegen;
    if (umbiegen.size) {
      console.log(
        `  ${"".padEnd(24)} ${umbiegen.size} Kunde(n) zusammengefuehrt ` +
          `(${aufBestehende} auf bereits vorhandene, ${umbiegen.size - aufBestehende} innerhalb des Alt-Bestands)`,
      );
    }
    zeilen = behalten;
  }

  const weg = new Set(WEGLASSEN[tab] ?? []);
  const bereinigt = zeilen.map((z) => {
    const raus = {};
    for (const [k, v] of Object.entries(z)) {
      if (weg.has(k) || !erlaubt.has(k)) continue;
      raus[k] = v;
    }
    // tenant_id setzen — im alten System gab es nur einen Mandanten, deshalb
    // stand die Spalte dort leer oder gar nicht.
    if (erlaubt.has("tenant_id")) raus.tenant_id = TENANT;
    // Ganzzahl-Spalten: gerundet statt abgewiesen.
    //
    // effekte.wow_rating ist im alten CRM `numeric` (ein Effekt hat 4.5), in
    // bookartist `integer`. Postgres nimmt das nicht an ("invalid input
    // syntax for type integer"). Gerundet wird kaufmaennisch und gemeldet —
    // eine halbe Bewertung ist kein Grund, den Effekt zu verlieren.
    for (const [k, v] of Object.entries(raus)) {
      const f = ziel.formate[k];
      if (!["integer", "smallint", "bigint"].includes(f)) continue;
      if (typeof v === "number" && v % 1 !== 0) {
        gerundet.push(`${tab}.${k}: ${v} -> ${Math.round(v)}`);
        raus[k] = Math.round(v);
      }
    }
    // Werte umschreiben, die anders heissen (siehe WERTE_UMSCHREIBEN).
    for (const [spalte, karte] of Object.entries(WERTE_UMSCHREIBEN[tab] ?? {})) {
      const v = raus[spalte];
      if (typeof v === "string" && v in karte) raus[spalte] = karte[v];
    }
    // Datumswerte umrechnen (siehe alsDatum).
    const datumsSpalten = new Set([
      ...Object.keys(raus).filter((k) => ziel.formate[k] === "date"),
      ...(ALS_DATUM[tab] ?? []),
    ]);
    for (const [k, v] of Object.entries(raus)) {
      if (!datumsSpalten.has(k)) continue;
      const { wert, unklar } = alsDatum(v);
      if (unklar) unklareDaten.push(`${tab}.${k} = ${JSON.stringify(v)}`);
      raus[k] = wert;
    }
    // Verweise auf Anmelde-Konten leeren (siehe LEEREN).
    for (const spalte of LEEREN) if (spalte in raus) raus[spalte] = null;
    // Verweise auf zusammengefasste Kunden umbiegen.
    if (raus.customer_id && kundenUmbiegen.has(raus.customer_id)) {
      raus.customer_id = kundenUmbiegen.get(raus.customer_id);
    }
    return raus;
  });

  const verworfen = zeilen.length
    ? [...new Set(Object.keys(zeilen[0]).filter((k) => !erlaubt.has(k) || weg.has(k)))]
    : [];

  if (SCHREIBEN && bereinigt.length) await schreibe(tab, bereinigt);
  gesamt += bereinigt.length;
  console.log(
    `  ${tab.padEnd(24)} ${String(bereinigt.length).padStart(5)} Zeilen` +
      (verworfen.length ? `   (ohne: ${verworfen.join(", ")})` : ""),
  );
}

console.log(`\n  ${gesamt} Zeilen ${SCHREIBEN ? "uebertragen" : "waeren zu uebertragen"}.`);
if (gerundet.length) {
  console.log(`\n  ${gerundet.length} Zahl(en) gerundet:`);
  for (const g of gerundet.slice(0, 10)) console.log(`    ${g}`);
}
if (unklareDaten.length) {
  console.log(`\n  ${unklareDaten.length} Datumswert(e) nicht umrechenbar — geleert statt geraten:`);
  for (const u of unklareDaten.slice(0, 10)) console.log(`    ${u}`);
}
