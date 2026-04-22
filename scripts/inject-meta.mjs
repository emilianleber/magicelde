/**
 * Post-build script: generates route-specific HTML files with correct
 * title/description/canonical so Googlebot sees them without JS rendering.
 * Vercel serves static files before rewrites, so this works automatically.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'https://www.magicel.de';

const cities = [
  { slug: 'regensburg', name: 'Regensburg' },
  { slug: 'muenchen', name: 'München' },
  { slug: 'nuernberg', name: 'Nürnberg' },
  { slug: 'augsburg', name: 'Augsburg' },
  { slug: 'wuerzburg', name: 'Würzburg' },
  { slug: 'ingolstadt', name: 'Ingolstadt' },
  { slug: 'passau', name: 'Passau' },
  { slug: 'landshut', name: 'Landshut' },
  { slug: 'bamberg', name: 'Bamberg' },
  { slug: 'bayreuth', name: 'Bayreuth' },
  { slug: 'erlangen', name: 'Erlangen' },
  { slug: 'fuerth', name: 'Fürth' },
  { slug: 'rosenheim', name: 'Rosenheim' },
  { slug: 'kempten', name: 'Kempten' },
  { slug: 'aschaffenburg', name: 'Aschaffenburg' },
  { slug: 'straubing', name: 'Straubing' },
  { slug: 'freising', name: 'Freising' },
  { slug: 'berlin', name: 'Berlin' },
  { slug: 'hamburg', name: 'Hamburg' },
  { slug: 'frankfurt', name: 'Frankfurt' },
  { slug: 'stuttgart', name: 'Stuttgart' },
  { slug: 'koeln', name: 'Köln' },
  { slug: 'duesseldorf', name: 'Düsseldorf' },
  { slug: 'dresden', name: 'Dresden' },
  { slug: 'leipzig', name: 'Leipzig' },
  { slug: 'hannover', name: 'Hannover' },
  { slug: 'dortmund', name: 'Dortmund' },
  { slug: 'bremen', name: 'Bremen' },
  { slug: 'salzburg', name: 'Salzburg' },
  { slug: 'wien', name: 'Wien' },
  { slug: 'muenster', name: 'Münster' },
  { slug: 'bochum', name: 'Bochum' },
  { slug: 'bielefeld', name: 'Bielefeld' },
  { slug: 'bonn', name: 'Bonn' },
  { slug: 'wuppertal', name: 'Wuppertal' },
  { slug: 'mannheim', name: 'Mannheim' },
  { slug: 'karlsruhe', name: 'Karlsruhe' },
  { slug: 'wiesbaden', name: 'Wiesbaden' },
  { slug: 'mainz', name: 'Mainz' },
  { slug: 'magdeburg', name: 'Magdeburg' },
  { slug: 'erfurt', name: 'Erfurt' },
  { slug: 'freiburg', name: 'Freiburg' },
  { slug: 'luebeck', name: 'Lübeck' },
  { slug: 'kiel', name: 'Kiel' },
  { slug: 'braunschweig', name: 'Braunschweig' },
];

const staticRoutes = [
  {
    path: '/',
    title: 'Emilian Leber – Zauberer für Events, Firmenfeiern & Hochzeiten',
    description: 'Emilian Leber begeistert als moderner Zauberer auf Hochzeiten, Firmenfeiern und Events. Einzigartige Shows voller Humor und Staunen. Jetzt anfragen!',
    ogTitle: 'Emilian Leber – Zauberer für Events, Firmenfeiern & Hochzeiten',
  },
  {
    path: '/hochzeit',
    title: 'Hochzeitszauberer – Emilian Leber | Zauberer für Hochzeiten',
    description: 'Emilian Leber ist Hochzeitszauberer und sorgt deutschlandweit mit moderner Zauberkunst für unvergessliche Momente auf Ihrer Hochzeit. Jetzt anfragen!',
    ogTitle: 'Hochzeitszauberer – Emilian Leber | Zauberer für Hochzeiten',
  },
  {
    path: '/firmenfeiern',
    title: 'Zauberer für Firmenfeiern – Emilian Leber | Corporate Entertainment',
    description: 'Zauberer für Firmenfeiern: Emilian Leber begeistert mit interaktiver Magie und Comedy-Show auf Firmenfeiern, Weihnachtsfeiern und Corporate Events. Deutschlandweit buchbar.',
    ogTitle: 'Zauberer für Firmenfeiern – Emilian Leber',
  },
  {
    path: '/geburtstage',
    title: 'Zauberer für Geburtstage – Emilian Leber | Geburtstagsshow',
    description: 'Zauberer für Geburtstage: Emilian Leber macht Ihren runden Geburtstag unvergesslich – mit interaktiver Close-Up Magie und Comedy-Show für Erwachsene.',
    ogTitle: 'Zauberer für Geburtstage – Emilian Leber',
  },
  {
    path: '/buehnenshow',
    title: 'Zaubershow – Emilian Leber | Comedy Bühnenshow',
    description: 'Die Bühnenshow von Emilian Leber: 30–60 Minuten Comedy-Zaubershow mit Publikumsinteraktion. Für Firmenfeiern, Galas und Events – deutschlandweit buchbar.',
    ogTitle: 'Bühnenshow – Emilian Leber | Comedy Zaubershow',
  },
  {
    path: '/close-up',
    title: 'Close-Up Magie – Emilian Leber | Tischzauberei',
    description: 'Close-Up Magie von Emilian Leber: Interaktive Tischzauberei direkt bei Ihren Gästen – perfekt für Empfänge, Dinner und Networking-Events. Jetzt anfragen!',
    ogTitle: 'Close-Up Magie – Emilian Leber | Tischzauberei',
  },
  {
    path: '/magic-dinner',
    title: 'Magic Dinner – Emilian Leber | Dinner und Zaubershow',
    description: 'Magic Dinner mit Emilian Leber: Ein unvergesslicher Abend aus Dinner und Magie – exklusiv, interaktiv und einzigartig. Für besondere Anlässe und Events.',
    ogTitle: 'Magic Dinner – Emilian Leber | Dinner & Zaubershow',
  },
  {
    path: '/moderation',
    title: 'Moderator & Zauberer – Emilian Leber | Event-Moderation',
    description: 'Emilian Leber als Moderator und Zauberer: Professionelle Event-Moderation mit magischen Elementen für Firmenfeiern, Galas und Preisverleihungen.',
    ogTitle: 'Moderator & Zauberer – Emilian Leber',
  },
  {
    path: '/ueber-mich',
    title: 'Über Emilian Leber – Zauberer & Showkünstler aus Regensburg',
    description: 'Emilian Leber – professioneller Zauberer und Showkünstler aus Regensburg. Modernes Entertainment für Firmenfeiern, Hochzeiten und Events deutschlandweit.',
    ogTitle: 'Über Emilian Leber – Zauberer & Showkünstler',
  },
  {
    path: '/referenzen',
    title: 'Referenzen & Bewertungen – Emilian Leber | Zauberer',
    description: 'Bewertungen und Referenzen von Emilian Leber: Über 34 begeisterte Kunden, 4.9 Sterne auf ProvenExpert. Lesen Sie echte Erfahrungsberichte.',
    ogTitle: 'Referenzen – Emilian Leber | 4.9 Sterne',
  },
  {
    path: '/faq',
    title: 'FAQ – Häufige Fragen zum Zauberer buchen | Emilian Leber',
    description: 'Häufige Fragen zum Zauberer buchen: Kosten, Ablauf, Formate und mehr. Emilian Leber beantwortet alle Fragen rund um Close-Up Magie, Bühnenshow und Magic Dinner.',
    ogTitle: 'FAQ – Zauberer buchen | Emilian Leber',
  },
  {
    path: '/presse',
    title: 'Presse – Emilian Leber | Pressematerial & Downloads',
    description: 'Pressematerial von Emilian Leber: Fotos, Texte und Informationen für Medien und Veranstalter. Professioneller Zauberer aus Regensburg.',
    ogTitle: 'Presse – Emilian Leber',
  },
  {
    path: '/kontakt',
    title: 'Kontakt – Emilian Leber | Zauberer anfragen',
    description: 'Kontaktieren Sie Emilian Leber für eine unverbindliche Anfrage. Zauberer für Firmenfeiern, Hochzeiten und Events – deutschlandweit buchbar.',
    ogTitle: 'Kontakt – Emilian Leber | Zauberer anfragen',
  },
  {
    path: '/buchung',
    title: 'Zauberer buchen – Emilian Leber | Unverbindlich anfragen',
    description: 'Zauberer buchen: Emilian Leber kostenlos und unverbindlich anfragen. Für Firmenfeiern, Hochzeiten, Geburtstage und Events deutschlandweit.',
    ogTitle: 'Zauberer buchen – Emilian Leber',
  },
  {
    path: '/tickets',
    title: 'Tickets – Emilian Leber | Zaubershow Tickets',
    description: 'Tickets für die Zaubershow von Emilian Leber. Jetzt Plätze sichern für unvergessliche Abende voller Magie, Comedy und Staunen.',
    ogTitle: 'Tickets – Emilian Leber | Zaubershow',
  },
];

function esc(str) {
  return str
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

const baseHtml = readFileSync('dist/index.html', 'utf-8');
let count = 0;

// Static routes
for (const route of staticRoutes) {
  const canonical = `${BASE}${route.path}`;
  const html = injectMeta(baseHtml, { ...route, canonical });
  if (route.path === '/') {
    writeFileSync('dist/index.html', html);
  } else {
    const dir = join('dist', route.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }
  count++;
}

// City routes
for (const city of cities) {
  const canonical = `${BASE}/zauberer/${city.slug}`;
  const title = `Zauberer ${city.name} – Emilian Leber | Zaubershow, Close-Up & Magic Dinner`;
  const description = `Zauberer in ${city.name}: Emilian Leber begeistert mit interaktiver Close-Up Magie, Comedy-Zaubershow & Magic Dinner auf Hochzeiten, Firmenfeiern und Events in ${city.name}. Preise ab 800 € – jetzt unverbindlich anfragen!`;
  const html = injectMeta(baseHtml, { title, description, canonical, ogTitle: `Zauberer ${city.name} – Emilian Leber` });
  const dir = join('dist', 'zauberer', city.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
  count++;
}

console.log(`✓ Prerendered ${count} routes`);
