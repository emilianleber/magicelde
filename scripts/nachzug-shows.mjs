// Nachzug: shows_intern + pakete aus dem alten CRM (03.09.2026).
//
// Beim Umzug am 03.09. blieben zwei Dinge liegen:
//
//   shows_intern  3 Zeilen — sollten mitkommen, kamen aber nicht an
//   pakete       12 Zeilen — in bookartist gibt es die Tabelle nicht
//
// Warum die Shows fehlten, steht in den Daten: Eine trägt status "aktiv".
// bookartist erlaubt nur entwurf|gesendet|akzeptiert|proben|fertig|archiviert
// — der Insert wäre an der CHECK-Regel gescheitert. Wieder derselbe Fall:
// ein Wort, das auf der einen Seite gilt und auf der anderen nicht.
//
// Die 12 Pakete sind seine Preisliste (Close-Up S/M/L, Bühnenshow, …). In
// bookartist gibt es dafür keine eigene Tabelle, aber shows_intern trägt
// dieselben Felder (name, preis, format, anlass, zieldauer, Beschreibungen)
// UND ist beim Anlegen einer Buchung auswählbar — genau die Rolle, die
// pakete im alten System über portal_requests.paket_id hatte. Sie kommen
// deshalb als Shows mit show_typ "paket" herüber, sauber unterscheidbar.
//
// Aufruf:  node scripts/nachzug-shows.mjs           nur zählen
//          node scripts/nachzug-shows.mjs --schreiben

import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL(".env.alt", new URL("../", import.meta.url)), "utf8")
    .split("\n").filter((z) => z.includes("=") && !z.startsWith("#"))
    .map((z) => { const i = z.indexOf("="); return [z.slice(0, i).trim(), z.slice(i + 1).trim()]; }),
);
const ALT_URL = env.ALT_URL, ALT_KEY = env.ALT_SERVICE_KEY;
const NEU_URL = process.env.NEU_URL, NEU_KEY = process.env.NEU_SERVICE_KEY;
const TENANT = process.env.TENANT_ID;
const SCHREIBEN = process.argv.includes("--schreiben");

if (!ALT_URL || !ALT_KEY) { console.error("ALT_URL/ALT_SERVICE_KEY fehlen (.env.alt)"); process.exit(1); }
if (SCHREIBEN && (!NEU_URL || !NEU_KEY || !TENANT)) {
  console.error("Zum Schreiben: NEU_URL, NEU_SERVICE_KEY, TENANT_ID setzen"); process.exit(1);
}

const holen = async (url, key, pfad) => {
  const r = await fetch(`${url}/rest/v1/${pfad}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
  if (!r.ok) throw new Error(`${pfad}: ${r.status} ${await r.text()}`);
  return r.json();
};

/**
 * Status übersetzen.
 *
 * "aktiv" kennt bookartist nicht. Nächstliegend ist "fertig": Die Show ist
 * fertig konzipiert und im Einsatz — nicht mehr Entwurf, aber auch nicht
 * archiviert. Bewusst NICHT stillschweigend: Der Lauf sagt, was er umbiegt.
 */
const ERLAUBT = new Set(["entwurf", "gesendet", "akzeptiert", "proben", "fertig", "archiviert"]);
function status(alt) {
  if (ERLAUBT.has(alt)) return alt;
  return { aktiv: "fertig", inaktiv: "archiviert" }[alt] ?? "entwurf";
}

const shows = await holen(ALT_URL, ALT_KEY, "shows_intern?select=*");
const pakete = await holen(ALT_URL, ALT_KEY, "pakete?select=*");
const paketName = new Map(pakete.map((p) => [p.id, p.name]));

const zeilen = [];

for (const s of shows) {
  const umgebogen = status(s.status) !== s.status;
  if (umgebogen) console.log(`  Status "${s.status}" → "${status(s.status)}"  (${s.name})`);
  zeilen.push({
    id: s.id, tenant_id: TENANT, name: s.name,
    anlass: s.anlass ?? null, format: s.format ?? null,
    zieldauer: s.zieldauer ?? null, preis: s.preis ?? null,
    show_typ: s.show_typ ?? "individuell",
    status: status(s.status),
    // basis_paket_id zeigt auf eine Tabelle, die es hier nicht gibt. Statt
    // eine tote Kennung mitzuschleppen, wandert der NAME in die Beschreibung —
    // die Information bleibt lesbar erhalten.
    beschreibung: [s.beschreibung, s.basis_paket_id && paketName.get(s.basis_paket_id)
      ? `Basis-Paket: ${paketName.get(s.basis_paket_id)}` : null].filter(Boolean).join("\n\n") || null,
    beschreibung_kunde: s.beschreibung_kunde ?? null,
    konzept_kundentext: s.konzept_kundentext ?? null,
    technische_anforderungen: s.technische_anforderungen ?? null,
    phasen: s.phasen ?? null,
  });
}

for (const p of pakete) {
  zeilen.push({
    id: p.id, tenant_id: TENANT, name: p.name,
    anlass: Array.isArray(p.anlaesse) ? (p.anlaesse[0] ?? null) : (p.anlaesse ?? null),
    format: p.format ?? null, zieldauer: p.zieldauer ?? null, preis: p.preis ?? null,
    show_typ: "paket",
    status: "fertig",
    beschreibung: p.beschreibung_intern ?? null,
    beschreibung_kunde: p.beschreibung_kunde ?? null,
  });
}

console.log(`\n${shows.length} Shows + ${pakete.length} Pakete = ${zeilen.length} Zeilen`);
if (!SCHREIBEN) { console.log("(Probelauf — nichts geschrieben. Mit --schreiben ausführen.)"); process.exit(0); }

const r = await fetch(`${NEU_URL}/rest/v1/shows_intern?on_conflict=id`, {
  method: "POST",
  headers: {
    apikey: NEU_KEY, Authorization: `Bearer ${NEU_KEY}`,
    "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=representation",
  },
  body: JSON.stringify(zeilen),
});
if (!r.ok) { console.error("FEHLER:", r.status, await r.text()); process.exit(1); }
console.log(`geschrieben: ${(await r.json()).length} Zeilen`);
