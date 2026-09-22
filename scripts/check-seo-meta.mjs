/**
 * Prueft Titel- und Beschreibungslaengen aus src/data/seoMeta.json und den
 * Stadt-Vorlagen in src/data/serviceFormats.ts — mit dem laengsten Stadtnamen.
 *
 *   node scripts/check-seo-meta.mjs
 *
 * Grenzen: Titel <= 60 Zeichen (Seiten) bzw. <= 65 (Stadt-Vorlagen mit
 * langem Namen), Beschreibung 110–160. Laenger schneidet Google ab.
 */
import { readFileSync } from "node:fs";

const meta = JSON.parse(readFileSync("src/data/seoMeta.json", "utf8"));
const staedte = readFileSync("src/data/staedte.ts", "utf8");
const formats = readFileSync("src/data/serviceFormats.ts", "utf8");

const namen = [...staedte.matchAll(/^\s{4}name:\s*"([^"]+)"/gm)].map((m) => m[1]);
const laengste = namen.reduce((a, b) => (b.length > a.length ? b : a), "");

let fehler = 0;
const pruefe = (wo, title, description, maxTitle) => {
  const t = title.length;
  const d = description.length;
  const ok = t <= maxTitle && d >= 110 && d <= 160;
  if (!ok) fehler++;
  console.log(`${ok ? "✓" : "✗"} ${wo.padEnd(34)} Titel ${String(t).padStart(3)}  Beschr. ${String(d).padStart(3)}`);
};

for (const [pfad, m] of Object.entries(meta.pages)) pruefe(pfad, m.title, m.description, 65);

const fuer = (s) => s.replace(/\{stadt\}/g, laengste);
pruefe(`/zauberer/{${laengste}}`, fuer(meta.city.title), fuer(meta.city.description), 70);

for (const m of formats.matchAll(/metaTitle:\s*"([^"]+)",\s*metaDescription:\s*"([^"]+)"/g)) {
  pruefe(`${m[1].slice(0, 22)}… {${laengste}}`, fuer(m[1]), fuer(m[2]), 70);
}

console.log(`\nLaengster Stadtname: ${laengste} (${laengste.length}) · ${namen.length} Staedte`);
if (fehler) {
  console.log(`${fehler} Eintraege ausserhalb der Grenzen.`);
  process.exit(1);
}
