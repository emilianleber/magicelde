/**
 * Post-build: schreibt route-spezifische dist/<path>/index.html mit
 * korrektem <title>, <meta description>, <link canonical>, og:* und
 * twitter:* damit Googlebot pro Route unique Signale sieht (ohne JS-Render).
 *
 * Vercel serviert statische Dateien vor den SPA-Rewrites — funktioniert out-of-the-box.
 *
 * Datenquellen (Single Source of Truth = .ts-Files, via Regex extrahiert):
 *   - src/data/staedte.ts        → 109 Städte ({slug, name})
 *   - src/data/serviceFormats.ts → 5 Service-Formate ({slug, routePrefix, metaTitle, metaDescription})
 *   - src/data/blogPosts.ts      → 18 Blog-Posts ({slug, title, excerpt})
 *   - src/data/wissenTopics.ts   → 8 Wissen-Pages ({slug, metaTitle, metaDescription})
 *
 * Output:
 *   - 23 Hauptseiten + 109 Städte + 545 Service-Stadt-Kombis + 18 Blog + 8 Wissen
 *   = ~703 prerendered HTML-Files (matched sitemap.xml).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'https://www.magicel.de';
const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

/* ────────────────────────────────────────────────────────────
   Data loaders — Regex über .ts-Files (kein TS-Compile nötig)
   ──────────────────────────────────────────────────────────── */

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf-8');
}

function loadCities() {
  const content = read('src/data/staedte.ts');
  const start = content.indexOf('export const staedte');
  const body = start === -1 ? content : content.slice(start);
  const out = [];
  const re = /\{\s*slug:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    out.push({ slug: m[1], name: m[2] });
  }
  return out;
}

function loadServiceFormats() {
  const content = read('src/data/serviceFormats.ts');
  const start = content.indexOf('export const SERVICE_FORMATS');
  const body = start === -1 ? content : content.slice(start);
  const out = [];
  // Order in serviceFormats.ts: slug → ... → routePrefix → ... → metaTitle → metaDescription
  // canonicalPrefix ist optional → separater Lookup pro Format.
  const re = /slug:\s*"([^"]+)"[\s\S]*?routePrefix:\s*"([^"]+)"[\s\S]*?metaTitle:\s*"([^"]+)",\s*metaDescription:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    out.push({
      slug: m[1],
      routePrefix: m[2],
      metaTitleTpl: m[3],
      metaDescriptionTpl: m[4],
    });
  }
  // canonicalPrefix per slug aufspüren
  for (const f of out) {
    const re2 = new RegExp(`slug:\\s*"${f.slug.replace(/-/g, '\\-')}"[\\s\\S]*?canonicalPrefix:\\s*"([^"]+)"`);
    const mm = body.match(re2);
    // matched-block muss INNERHALB des aktuellen Format-Objekts liegen — heuristic:
    // wenn das nächste "slug:" nach dem aktuellen vor canonicalPrefix kommt, ist's ein anderes Format.
    if (mm) {
      const idxSlug = body.indexOf(`slug: "${f.slug}"`);
      const idxNextSlug = body.indexOf('slug: "', idxSlug + 1);
      const idxCanonical = body.indexOf(mm[0]);
      if (idxNextSlug === -1 || idxCanonical < idxNextSlug) {
        f.canonicalPrefix = mm[1];
      }
    }
  }
  return out;
}

function loadBlogPosts() {
  const content = read('src/data/blogPosts.ts');
  const start = content.indexOf('export const blogPosts');
  const body = start === -1 ? content : content.slice(start);
  const out = [];
  const re = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)"[\s\S]*?excerpt:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    out.push({ slug: m[1], title: m[2], excerpt: m[3] });
  }
  return out;
}

function loadWissenTopics() {
  const content = read('src/data/wissenTopics.ts');
  const start = content.indexOf('export const wissenTopics');
  const body = start === -1 ? content : content.slice(start);
  const out = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?metaTitle:\s*"([^"]+)",\s*metaDescription:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    out.push({ slug: m[1], metaTitle: m[2], metaDescription: m[3] });
  }
  return out;
}

/* ────────────────────────────────────────────────────────────
   Statische Routen (Single Source of Truth — synchronisiert
   mit scripts/generate-sitemap.mjs)
   ──────────────────────────────────────────────────────────── */

const staticRoutes = [
  {
    path: '/',
    title: '★ Emilian Leber · Zauberer für Hochzeit + Firmenfeier · 5,0/5',
    description: 'Emilian Leber — Zauberer für Hochzeiten, Firmenfeiern und Events. Comedy, Mentalmagie, Magic Dinner. 200+ Events seit 2016. 5,0★ bei 30+ Bewertungen. Jetzt unverbindlich anfragen.',
    ogTitle: 'Emilian Leber — Zauberer · 5,0★ bei 30+ Bewertungen',
  },
  {
    path: '/hochzeit',
    title: '★ Hochzeitszauberer — Emilian Leber · Sektempfang + Show · 5,0/5',
    description: 'Hochzeitszauberer Emilian Leber: Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnen-Highlight vor dem Tanz. 100+ Hochzeiten begleitet. 5,0★ bei 30+ Bewertungen.',
    ogTitle: 'Hochzeitszauberer — 100+ Hochzeiten · 5,0★',
  },
  {
    path: '/firmenfeiern',
    title: '★ Zauberer Firmenfeier — Emilian Leber · Premium-Entertainment · 5,0/5',
    description: 'Zauberer für Firmenfeiern: Vorstandsdinner, Weihnachtsfeier, Gala. DAX-Konzerne bis Mittelstand. Insider-Pointen aus dem Briefing. 200+ Events. 5,0★ bei 30+ Bewertungen.',
    ogTitle: 'Zauberer Firmenfeier — 200+ Events · 5,0★',
  },
  {
    path: '/magic-dinner',
    title: '★ Magic Dinner — Emilian Leber · Close-Up am Tisch · 5,0/5',
    description: 'Magic Dinner mit Emilian Leber: Mehrgänge-Abend mit Close-Up-Magie direkt am Tisch. Spezialgebiet seit 2023. Hauspartner Wald & Wiese in Sinzing. 5,0★ bei 30+ Bewertungen.',
    ogTitle: 'Magic Dinner — Spezialgebiet seit 2023 · 5,0★',
  },
  {
    path: '/tickets',
    title: '★ Tickets — Magic Dinner Summer Edition · 11.07.2026 · Wald & Wiese',
    description: 'Tickets Magic Dinner Summer Edition am 11.07.2026 im Restaurant Wald & Wiese in Sinzing bei Regensburg. À la carte essen + Close-Up-Magie am Tisch. Reservierung beim Restaurant.',
    ogTitle: 'Tickets — Magic Dinner Summer Edition 11.07.2026',
  },
  {
    path: '/tickets/magic-dinner-summer-edition',
    title: 'Magic Dinner Summer Edition — 11. Juli 2026 | Wald & Wiese Sinzing',
    description: 'Magic Dinner Summer Edition am 11. Juli 2026 ab 17:00 Uhr im Restaurant Wald & Wiese Sinzing bei Regensburg. Tisch reservieren, à la carte essen, Close-Up-Magie am Tisch von Emilian Leber.',
    ogTitle: 'Magic Dinner Summer Edition — 11. Juli 2026',
  },
  {
    path: '/buchung',
    title: 'Zauberer buchen – Emilian Leber | Unverbindlich anfragen',
    description: 'Zauberer buchen: Emilian Leber kostenlos und unverbindlich anfragen. Für Firmenfeiern, Hochzeiten, Geburtstage und Events deutschlandweit.',
    ogTitle: 'Zauberer buchen – Emilian Leber',
  },
  {
    path: '/event-agenturen',
    title: 'Zauberer für Event-Agenturen – Emilian Leber | White-Label & Premium-Acts',
    description: 'Event-Agenturen: Verlässlicher Showact mit Pressekit, Tech-Rider und kurzen Reaktionszeiten. Über 100 Firmenevents, deutschlandweit buchbar — Emilian Leber.',
    ogTitle: 'Zauberer für Event-Agenturen – Emilian Leber',
  },
  {
    path: '/messe-magier',
    title: 'Messe-Magier – Emilian Leber | Standmagie & Lead-Magnet',
    description: 'Messe-Magier Emilian Leber: Standmagie, die Besucher anzieht und Gespräche eröffnet. Branded Routinen, professioneller Auftritt, messbarer Lead-Effekt.',
    ogTitle: 'Messe-Magier – Emilian Leber | Standmagie',
  },
  {
    path: '/buehnenshow',
    title: '★ Zaubershow — Emilian Leber · Comedy + Mental · 5,0/5',
    description: 'Bühnenshow von Emilian Leber: 30-60 Min Comedy-Zaubershow mit Mentalmagie und Standing-Ovation-Finale. Greatest-Talent-Finalist. 5,0★ bei 30+ Bewertungen.',
    ogTitle: 'Bühnenshow — Greatest-Talent-Finalist · 5,0★',
  },
  {
    path: '/close-up',
    title: '★ Close-Up Magie — Emilian Leber · Tischzauberei · 5,0/5',
    description: 'Close-Up Magie von Emilian Leber: Karten in eurer Hand, Münzen, Mentaleffekte. Walk-Around beim Empfang, Tisch-zu-Tisch beim Dinner. 100+ Close-Up-Auftritte. 5,0★.',
    ogTitle: 'Close-Up Magie — 100+ Auftritte · 5,0★',
  },
  {
    path: '/geburtstage',
    title: '★ Zauberer Geburtstag — Emilian Leber · Runder Tag · 5,0/5',
    description: 'Zauberer für runde Geburtstage: Close-Up am Tisch + Comedy-Bühnenshow für Erwachsene. 80+ Geburtstage von 30er bis Goldene. 5,0★ bei 30+ Bewertungen.',
    ogTitle: 'Zauberer für Geburtstage — 80+ Feiern · 5,0★',
  },
  {
    path: '/comedy-zauberei',
    title: 'Comedy-Zauberei – Emilian Leber | Wenn Magie auf Pointe trifft',
    description: 'Comedy-Zauberei von Emilian Leber: Magie und Humor verschmelzen — Routinen, die nicht nur staunen lassen, sondern lachen. Für Firmenfeiern, Galas und Events.',
    ogTitle: 'Comedy-Zauberei – Emilian Leber',
  },
  {
    path: '/moderation',
    title: 'Moderator & Zauberer – Emilian Leber | Event-Moderation',
    description: 'Emilian Leber als Moderator und Zauberer: Professionelle Event-Moderation mit magischen Elementen für Firmenfeiern, Galas und Preisverleihungen.',
    ogTitle: 'Moderator & Zauberer – Emilian Leber',
  },
  {
    path: '/referenzen',
    title: '★ Referenzen — Emilian Leber · 18 Kunden-Cases · 5,0/5',
    description: 'Referenzen Emilian Leber: VKB, STRABAG, XXXLutz, Sparkasse, Stadt Regensburg, Stadt Deggendorf u.v.m. Jeder Case mit Anlass, Konzept und Story. 5,0★ bei 30+ Bewertungen.',
    ogTitle: 'Referenzen — 18 Kunden-Cases · 5,0★',
  },
  {
    path: '/ueber-mich',
    title: 'Über Emilian Leber – Zauberer & Showkünstler aus Regensburg',
    description: 'Emilian Leber – professioneller Zauberer und Showkünstler aus Regensburg. Modernes Entertainment für Firmenfeiern, Hochzeiten und Events deutschlandweit.',
    ogTitle: 'Über Emilian Leber – Zauberer & Showkünstler',
  },
  {
    path: '/kontakt',
    title: 'Kontakt – Emilian Leber | Zauberer anfragen',
    description: 'Kontaktieren Sie Emilian Leber für eine unverbindliche Anfrage. Zauberer für Firmenfeiern, Hochzeiten und Events – deutschlandweit buchbar.',
    ogTitle: 'Kontakt – Emilian Leber | Zauberer anfragen',
  },
  {
    path: '/presse',
    title: 'Presse – Emilian Leber | Pressematerial & Downloads',
    description: 'Pressematerial von Emilian Leber: Fotos, Texte und Informationen für Medien und Veranstalter. Professioneller Zauberer aus Regensburg.',
    ogTitle: 'Presse – Emilian Leber',
  },
  {
    path: '/blog',
    title: 'Magazin – Emilian Leber | Wissen rund um Zauberkunst & Events',
    description: 'Das Magazin von Emilian Leber: Artikel zu Hochzeitszauberer, Firmenfeier-Magie, Magic Dinner und Bühnenshow — aus 10+ Jahren Erfahrung.',
    ogTitle: 'Magazin – Emilian Leber',
  },
  {
    path: '/faq',
    title: 'FAQ – Häufige Fragen zum Zauberer buchen | Emilian Leber',
    description: 'Häufige Fragen zum Zauberer buchen: Kosten, Ablauf, Formate und mehr. Emilian Leber beantwortet alle Fragen rund um Close-Up Magie, Bühnenshow und Magic Dinner.',
    ogTitle: 'FAQ – Zauberer buchen | Emilian Leber',
  },
  {
    path: '/datenschutz',
    title: 'Datenschutz – Emilian Leber',
    description: 'Datenschutzerklärung von Emilian Leber — Zauberer & Showkünstler.',
    ogTitle: 'Datenschutz – Emilian Leber',
  },
  {
    path: '/impressum',
    title: 'Impressum – Emilian Leber',
    description: 'Impressum & rechtliche Angaben von Emilian Leber — Zauberer & Showkünstler aus Regensburg.',
    ogTitle: 'Impressum – Emilian Leber',
  },
  {
    path: '/agb',
    title: 'AGB – Emilian Leber',
    description: 'Allgemeine Geschäftsbedingungen von Emilian Leber — Zauberer & Showkünstler.',
    ogTitle: 'AGB – Emilian Leber',
  },
];

/* ────────────────────────────────────────────────────────────
   Meta-Injection in dist/index.html-Shell
   ──────────────────────────────────────────────────────────── */

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function injectMeta(html, { title, description, canonical, ogTitle }) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${esc(description)}$2`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${esc(canonical)}$2`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${esc(canonical)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${esc(ogTitle || title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${esc(description.substring(0, 200))}$2`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${esc(ogTitle || title)}$2`);
}

function writeRoute(routePath, html) {
  if (routePath === '/') {
    writeFileSync(join(DIST, 'index.html'), html);
  } else {
    const dir = join(DIST, routePath.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
}

/* ────────────────────────────────────────────────────────────
   Main
   ──────────────────────────────────────────────────────────── */

const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8');
let count = 0;

// 1) Statische Hauptseiten (23)
for (const r of staticRoutes) {
  const canonical = `${BASE}${r.path}`;
  writeRoute(r.path, injectMeta(baseHtml, { ...r, canonical }));
  count++;
}

// 2) Stadt-Pages /zauberer/:stadt (109)
const cities = loadCities();
if (cities.length === 0) throw new Error('inject-meta: keine Städte aus staedte.ts geladen');
for (const c of cities) {
  const canonical = `${BASE}/zauberer/${c.slug}`;
  const title = `★ Zauberer ${c.name} · Close-Up + Bühne + Magic Dinner · 5,0/5`;
  const description = `Zauberer in ${c.name}: Close-Up Magie, Comedy-Bühnenshow & Magic Dinner für Hochzeit, Firmenfeier und Geburtstag. 200+ Events seit 2016. 5,0★ bei 30+ Bewertungen. Jetzt anfragen.`;
  const ogTitle = `Zauberer ${c.name} — 5,0★ bei 30+ Bewertungen`;
  writeRoute(`/zauberer/${c.slug}`, injectMeta(baseHtml, { title, description, canonical, ogTitle }));
  count++;
}

// 3) Service-Stadt-Kombis /zauberer-{service}/{stadt} (5 × 109 = 545)
// Ausnahme: Formate mit canonicalPrefix (z.B. magic-dinner) werden unter
// /magic-dinner-{stadt} prerendert statt unter /zauberer-magic-dinner/{stadt}.
// Die Alt-URL wird per Vercel-301 auf die Neu-URL weitergeleitet (vercel.json).
const formats = loadServiceFormats();
if (formats.length === 0) throw new Error('inject-meta: keine Service-Formate aus serviceFormats.ts geladen');
for (const f of formats) {
  for (const c of cities) {
    const urlPath = f.canonicalPrefix
      ? `${f.canonicalPrefix}-${c.slug}`
      : `${f.routePrefix}/${c.slug}`;
    const canonical = `${BASE}${urlPath}`;
    const title = f.metaTitleTpl.replace(/\{stadt\}/g, c.name);
    const description = f.metaDescriptionTpl.replace(/\{stadt\}/g, c.name);
    writeRoute(urlPath, injectMeta(baseHtml, { title, description, canonical, ogTitle: title }));
    count++;
  }
}

// 4) Blog-Posts /blog/:slug (18)
const posts = loadBlogPosts();
if (posts.length === 0) throw new Error('inject-meta: keine Blog-Posts aus blogPosts.ts geladen');
for (const p of posts) {
  const canonical = `${BASE}/blog/${p.slug}`;
  const title = `${p.title} – Magazin | Emilian Leber`;
  const ogTitle = p.title;
  writeRoute(`/blog/${p.slug}`, injectMeta(baseHtml, { title, description: p.excerpt, canonical, ogTitle }));
  count++;
}

// 5) Wissen-Pages /wissen/:slug (8)
const topics = loadWissenTopics();
if (topics.length === 0) throw new Error('inject-meta: keine Wissen-Topics aus wissenTopics.ts geladen');
for (const w of topics) {
  const canonical = `${BASE}/wissen/${w.slug}`;
  writeRoute(`/wissen/${w.slug}`, injectMeta(baseHtml, {
    title: w.metaTitle,
    description: w.metaDescription,
    canonical,
    ogTitle: w.metaTitle,
  }));
  count++;
}

console.log(`✓ Prerendered ${count} routes (${staticRoutes.length} static + ${cities.length} cities + ${formats.length * cities.length} service-cities + ${posts.length} blog + ${topics.length} wissen)`);
