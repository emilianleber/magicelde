/**
 * Post-build: schreibt route-spezifische dist/<path>/index.html mit
 *   - korrektem <title>, <meta description>, <link canonical>, og:*, twitter:*
 *   - JSON-LD im <head> (Single Source — react-helmet-async@3 rendert keine
 *     <script>-Tags; siehe scripts/seo-content.mjs)
 *   - statischem Body-Content (H1/H2/H3, Text, interne+externe Links, FAQ)
 *     INNERHALB #root, damit No-JS-/AI-Crawler echten Inhalt sehen.
 *
 * Vercel serviert statische Dateien vor den SPA-Rewrites — funktioniert out-of-the-box.
 *
 * Daten (Single Source of Truth = .ts-Files) werden via esbuild voll geladen
 * (createRenderer().data, siehe seo-content.mjs) — kein fragiles Regex.
 *
 * Output: 23 Hauptseiten + 109 Städte + 545 Service-Stadt-Kombis + 16 Blog
 *   + 6 Wissen = 699 prerendered HTML-Files (deckungsgleich mit sitemap.xml).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { createRenderer } from './seo-content.mjs';

const BASE = 'https://www.magicel.de';
const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

/* ────────────────────────────────────────────────────────────
   Daten kommen aus createRenderer().data (siehe scripts/seo-content.mjs).
   Dort werden die .ts-Datendateien via esbuild voll-fidelity geladen —
   kein fragiles Regex-Parsing über verschachtelte Objekte. Das fixt u.a.
   die fehlerhafte canonicalPrefix-Heuristik der alten Regex-Loader, die
   hochzeit/firmenfeier/close-up faelschlich auf /magic-dinner- bzw.
   /zaubershow- umbog (Kollision → 327 Service-Stadt-Seiten fehlten).
   ──────────────────────────────────────────────────────────── */

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
    title: 'Tickets & Termine — aktuell keine Events | Emilian Leber',
    description: 'Aktuell sind keine öffentlichen Termine geplant — kein Vorverkauf, keine Reservierung. Neue Termine zuerst über den Newsletter. Private Buchungen jederzeit möglich.',
    ogTitle: 'Tickets & Termine — aktuell keine Events',
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

/**
 * Injiziert die zwei statischen SEO-Teile:
 *   - parts.jsonLd → vor </head> (persistent; sichtbar für No-JS-Crawler
 *     UND Googlebot). react-helmet-async@3 rendert <script>-Tags nicht,
 *     deshalb ist dieses Build-time-JSON-LD die Single Source of Truth.
 *     aggregateRating steht nur EINMAL pro Seite (auf LocalBusiness) → kein
 *     GSC-"mehrere Bewertungen"-Fehler.
 *   - parts.body → INNERHALB #root. React (createRoot, kein hydrateRoot)
 *     leert #root beim Mount → kein doppelter sichtbarer Inhalt für JS-User.
 * Replacement-Funktion statt String, damit '$' im Content nicht als
 * Replace-Pattern ($&, $1 …) interpretiert wird.
 */
function injectStatic(html, parts) {
  if (!parts || (!parts.jsonLd && !parts.body)) return html;
  let out = html;
  if (parts.jsonLd) {
    out = out.replace('</head>', () => `    ${parts.jsonLd}\n  </head>`);
  }
  if (parts.body) {
    out = out.replace(
      '<div id="root"></div>',
      () => `<div id="root">${parts.body}</div>`
    );
  }
  return out;
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
const renderer = await createRenderer();
let count = 0;

// 1) Statische Hauptseiten (23)
for (const r of staticRoutes) {
  const canonical = `${BASE}${r.path}`;
  const html = injectMeta(baseHtml, { ...r, canonical });
  const injection =
    r.path === '/'
      ? renderer.render({ kind: 'home' })
      : renderer.render({ kind: 'static', path: r.path, route: r });
  writeRoute(r.path, injectStatic(html, injection));
  count++;
}

// 2) Stadt-Pages /zauberer/:stadt (109)
const cities = renderer.data.cities;
if (cities.length === 0) throw new Error('inject-meta: keine Städte aus staedte.ts geladen');
for (const c of cities) {
  const canonical = `${BASE}/zauberer/${c.slug}`;
  const title = `★ Zauberer ${c.name} · Close-Up + Bühne + Magic Dinner · 5,0/5`;
  const description = `Zauberer in ${c.name}: Close-Up Magie, Comedy-Bühnenshow & Magic Dinner für Hochzeit, Firmenfeier und Geburtstag. 200+ Events seit 2016. 5,0★ bei 30+ Bewertungen. Jetzt anfragen.`;
  const ogTitle = `Zauberer ${c.name} — 5,0★ bei 30+ Bewertungen`;
  const html = injectMeta(baseHtml, { title, description, canonical, ogTitle });
  const injection = renderer.render({ kind: 'city', citySlug: c.slug });
  writeRoute(`/zauberer/${c.slug}`, injectStatic(html, injection));
  count++;
}

// 3) Service-Stadt-Kombis /zauberer-{service}/{stadt} (5 × 109 = 545)
// Ausnahme: Formate mit canonicalPrefix (z.B. magic-dinner) werden unter
// /magic-dinner-{stadt} prerendert statt unter /zauberer-magic-dinner/{stadt}.
// Die Alt-URL wird per Vercel-301 auf die Neu-URL weitergeleitet (vercel.json).
const formats = renderer.data.formats;
if (formats.length === 0) throw new Error('inject-meta: keine Service-Formate aus serviceFormats.ts geladen');
for (const f of formats) {
  for (const c of cities) {
    const urlPath = f.canonicalPrefix
      ? `${f.canonicalPrefix}-${c.slug}`
      : `${f.routePrefix}/${c.slug}`;
    const canonical = `${BASE}${urlPath}`;
    const title = f.hero.metaTitle.replace(/\{stadt\}/g, c.name);
    const description = f.hero.metaDescription.replace(/\{stadt\}/g, c.name);
    const html = injectMeta(baseHtml, { title, description, canonical, ogTitle: title });
    const injection = renderer.render({
      kind: 'serviceCity',
      formatSlug: f.slug,
      citySlug: c.slug,
      urlPath,
    });
    writeRoute(urlPath, injectStatic(html, injection));
    count++;
  }
}

// 4) Blog-Posts /blog/:slug (18)
const posts = renderer.data.blog;
if (posts.length === 0) throw new Error('inject-meta: keine Blog-Posts aus blogPosts.ts geladen');
for (const p of posts) {
  const canonical = `${BASE}/blog/${p.slug}`;
  const title = `${p.title} – Magazin | Emilian Leber`;
  const ogTitle = p.title;
  const html = injectMeta(baseHtml, { title, description: p.excerpt, canonical, ogTitle });
  const injection = renderer.render({ kind: 'blog', slug: p.slug });
  writeRoute(`/blog/${p.slug}`, injectStatic(html, injection));
  count++;
}

// 5) Wissen-Pages /wissen/:slug (8)
const topics = renderer.data.wissen;
if (topics.length === 0) throw new Error('inject-meta: keine Wissen-Topics aus wissenTopics.ts geladen');
for (const w of topics) {
  const canonical = `${BASE}/wissen/${w.slug}`;
  const html = injectMeta(baseHtml, {
    title: w.metaTitle,
    description: w.metaDescription,
    canonical,
    ogTitle: w.metaTitle,
  });
  const injection = renderer.render({ kind: 'wissen', slug: w.slug });
  writeRoute(`/wissen/${w.slug}`, injectStatic(html, injection));
  count++;
}

console.log(`✓ Prerendered ${count} routes (${staticRoutes.length} static + ${cities.length} cities + ${formats.length * cities.length} service-cities + ${posts.length} blog + ${topics.length} wissen)`);
