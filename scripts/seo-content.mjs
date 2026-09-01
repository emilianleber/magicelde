/**
 * SEO-Content-Generator für den Prerender-Build.
 *
 * Hintergrund: magicel.de ist eine Vite-SPA. Ohne JS sieht ein Crawler nur
 * <div id="root"></div> — kein Text, keine Headings, kein JSON-LD, keine Links.
 * Das kostet bei AEO-/AI-Crawlern (ChatGPT, Claude, Perplexity) fast alle
 * Body-Punkte (substantial text, headings, structured data, internal/external
 * links, FAQ).
 *
 * Lösung: Wir rendern pro Route einen statischen, semantischen <main>-Block
 * PLUS JSON-LD und stecken beides INNERHALB von <div id="root">. Weil
 * main.tsx mit createRoot().render() (kein hydrateRoot) mountet, leert React
 * #root beim Mount restlos:
 *   - No-JS-Crawler (AEO-Scanner) lesen den vollen statischen Inhalt.
 *   - Googlebot (führt JS aus) verwirft ihn und nutzt die per react-helmet
 *     injizierte Version → kein doppeltes aggregateRating (vgl. index.html).
 *
 * Single Source of Truth = die .ts-Datendateien. Sie werden hier via esbuild
 * transpiliert und per data:-URL importiert (kein TS-Compile-Step, keine
 * fragilen Regex über verschachtelte Objekte). esbuild ist als Vite-Dep immer
 * vorhanden.
 */

import { readFileSync } from "fs";
import { join } from "path";
import { transform } from "esbuild";

const ROOT = process.cwd();
export const SITE_URL = "https://www.magicel.de";
const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const PROVENEXPERT = "https://www.provenexpert.com/emilian-leber";
const INSTAGRAM = "https://www.instagram.com/emilian.leber";
// Echte, verifizierte externe Zitations-Quellen (AEO: external citation links).
const YOUTUBE_TVA = "https://youtu.be/R0_mXGxzC9E"; // TV-Auftritt TVA 2025
const WIKI_ZAUBERKUNST = "https://de.wikipedia.org/wiki/Zauberkunst";
const RESTAURANT_WALDWIESE = "https://restaurant-waldwiese.de"; // Magic-Dinner-Hauspartner

/* ─────────────────────────────────────────────────────────────
   Daten laden (esbuild transform → data:-URL import)
   ───────────────────────────────────────────────────────────── */

async function loadTs(rel) {
  const src = readFileSync(join(ROOT, rel), "utf-8");
  const { code } = await transform(src, { loader: "ts", format: "esm" });
  const url =
    "data:text/javascript;base64," + Buffer.from(code).toString("base64");
  return import(url);
}

export async function loadSeoData() {
  const [st, sf, w, b] = await Promise.all([
    loadTs("src/data/staedte.ts"),
    loadTs("src/data/serviceFormats.ts"),
    loadTs("src/data/wissenTopics.ts"),
    loadTs("src/data/blogPosts.ts"),
  ]);
  const cities = st.staedte;
  const formats = sf.SERVICE_FORMATS;
  const wissen = w.wissenTopics;
  const blog = b.blogPosts;
  return {
    cities,
    citiesBySlug: Object.fromEntries(cities.map((c) => [c.slug, c])),
    formats,
    formatsBySlug: Object.fromEntries(formats.map((f) => [f.slug, f])),
    wissen,
    wissenBySlug: Object.fromEntries(wissen.map((t) => [t.slug, t])),
    blog,
    blogBySlug: Object.fromEntries(blog.map((p) => [p.slug, p])),
  };
}

/* ─────────────────────────────────────────────────────────────
   HTML-Helpers (inline-styles, da Tailwind-Klassen im Build
   gepurged werden — der Block wird ohnehin von React entfernt)
   ───────────────────────────────────────────────────────────── */

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const S = {
  main: "min-height:100vh;background:#08060c;color:rgba(255,255,255,0.82);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:7vh 24px 12vh;line-height:1.65;",
  article: "max-width:780px;margin:0 auto;",
  h1: "font-size:clamp(1.9rem,5vw,2.8rem);line-height:1.12;margin:0 0 1.1rem;color:#fff;font-weight:800;letter-spacing:-0.02em;",
  lead: "font-size:1.15rem;color:rgba(255,255,255,0.9);margin:0 0 1.6rem;",
  h2: "font-size:1.45rem;margin:2.2rem 0 .7rem;color:#fff;font-weight:700;",
  h3: "font-size:1.12rem;margin:1.3rem 0 .35rem;color:#fff;font-weight:600;",
  p: "margin:0 0 1rem;",
  ul: "margin:0 0 1.1rem;padding-left:1.25rem;",
  li: "margin:0 0 .4rem;",
  quote: "margin:0 0 1.2rem;padding-left:1rem;border-left:3px solid #9a2640;font-style:italic;color:rgba(255,255,255,0.9);",
  links: "margin:1.8rem 0 .6rem;font-size:.95rem;",
  a: 'style="color:#f3d9a8;text-decoration:underline;"',
};

const p = (t) => `<p style="${S.p}">${esc(t)}</p>`;
const h2 = (t) => `<h2 style="${S.h2}">${esc(t)}</h2>`;
const h3 = (t) => `<h3 style="${S.h3}">${esc(t)}</h3>`;
const ul = (items) =>
  `<ul style="${S.ul}">${items
    .map((i) => `<li style="${S.li}">${esc(i)}</li>`)
    .join("")}</ul>`;
const ilink = (href, label) => `<a href="${esc(href)}" ${S.a}>${esc(label)}</a>`;
const xlink = (href, label) =>
  `<a href="${esc(href)}" rel="noopener" ${S.a}>${esc(label)}</a>`;

/** Interner Link-Block (zählt als contextual body links — kein <nav>). */
function internalLinksBlock(pairs) {
  return `<p style="${S.links}"><strong>Weitere Seiten:</strong> ${pairs
    .map(([href, label]) => ilink(href, label))
    .join(" &middot; ")}</p>`;
}

/** Externe Zitations-Links (review-Plattform, Social, TV/Presse, Referenz). */
function externalLinksBlock(extra = []) {
  const items = [
    xlink(PROVENEXPERT, "Bewertungen auf ProvenExpert"),
    xlink(INSTAGRAM, "Emilian Leber auf Instagram"),
    xlink(YOUTUBE_TVA, "TV-Auftritt im TVA (YouTube)"),
    xlink(WIKI_ZAUBERKUNST, "Zauberkunst (Wikipedia)"),
    ...extra.map(([href, label]) => xlink(href, label)),
  ];
  return `<p style="${S.links}"><strong>Mehr &amp; externe Quellen:</strong> ${items.join(
    " &middot; "
  )}</p>`;
}

function wikipediaCity(city) {
  const slug = encodeURIComponent(city.name.replace(/ /g, "_"));
  return [`https://de.wikipedia.org/wiki/${slug}`, `${city.name} bei Wikipedia`];
}

/** FAQ-Section: rendert H2 + (H3-Frage / Antwort) und liefert das Schema. */
function faqSection(faqs) {
  if (!faqs || !faqs.length) return { html: "", schema: null };
  const html = `<section><h2 style="${S.h2}">Häufige Fragen</h2>${faqs
    .map((f) => `${h3(f.q)}${p(f.a)}`)
    .join("")}</section>`;
  return { html, schema: faqPageSchema(faqs) };
}

/* ─────────────────────────────────────────────────────────────
   JSON-LD-Builder (spiegelt src/lib/schemaHelpers.ts)
   ───────────────────────────────────────────────────────────── */

const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  bestRating: "5",
  worstRating: "1",
  reviewCount: "30",
};

function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Emilian Leber",
    jobTitle: "Zauberkünstler · Mentalmagier · Magic-Dinner-Spezialist",
    description:
      "Zauberer und Mentalist aus Regensburg — über 200 Events seit 2016, Greatest-Talent-Finalist, TV-Auftritt im TVA.",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    worksFor: { "@id": BUSINESS_ID },
    award: [
      "Greatest Talent Finalist 2023",
      "Talents of Magic Finalist + Kreativpreis 2024",
      "Deutsche Jugendmeisterschaft Magie Top 30 (2024)",
    ],
    knowsAbout: [
      "Zauberkunst",
      "Mentalmagie",
      "Close-Up-Zauberei",
      "Tischzauberei",
      "Bühnenzauberei",
      "Magic Dinner",
      "Comedy-Zauberei",
      "Event-Entertainment",
      "Moderation",
    ],
    sameAs: [
      INSTAGRAM,
      PROVENEXPERT,
      "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA",
      "https://www.facebook.com/people/Emilian-Leber-Zauberer-Mentalist/61582946450467/",
      "https://de.linkedin.com/in/emilian-leber-3b3414369",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Regensburg",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
  };
}

function localBusinessSchema(areaServed) {
  const areas = areaServed || [
    "Deutschland",
    "Bayern",
    "Regensburg",
    "München",
    "Nürnberg",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: "Emilian Leber — Zauberer & Mentalist",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/og-image.jpg`,
    email: "el@magicel.de",
    telephone: "+4915563744696",
    founder: { "@id": PERSON_ID },
    priceRange: "€€-€€€",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Regensburg",
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    areaServed: areas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    aggregateRating: AGGREGATE_RATING,
  };
}

function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Emilian Leber — Zauberer & Mentalist",
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "de-DE",
  };
}

function serviceSchema({ name, description, url, serviceType, areaServed }) {
  // KEIN aggregateRating hier! Es lebt ausschließlich auf LocalBusiness.
  // Damit hat jede Seite genau EINE AggregateRating-Node — sonst meldet GSC
  // "Review hat mehrere zusammengefasste Bewertungen" (das JSON-LD steht jetzt
  // persistent im <head> und wird auch von Googlebot gesehen).
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: (areaServed || ["Deutschland", "Bayern"]).map((a) => ({
      "@type": "AdministrativeArea",
      name: a,
    })),
  };
}

function faqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function articleSchema({ headline, description, url, datePublished, wordCount }) {
  const obj = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    author: { "@id": PERSON_ID },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: url,
  };
  if (datePublished) obj.datePublished = datePublished;
  if (wordCount) obj.wordCount = wordCount;
  return obj;
}

/** Serialisiert Schema-Objekte zu sicheren <script>-Tags (< → <). */
function schemasToHtml(schemas) {
  return schemas
    .filter(Boolean)
    .map(
      (s) =>
        `<script type="application/ld+json">${JSON.stringify(s).replace(
          /</g,
          "\\u003c"
        )}</script>`
    )
    .join("");
}

/* ─────────────────────────────────────────────────────────────
   Gemeinsame Link-Sets
   ───────────────────────────────────────────────────────────── */

const FORMAT_LINKS = [
  ["/buehnenshow", "Bühnenshow"],
  ["/close-up", "Close-Up Magie"],
  ["/magic-dinner", "Magic Dinner"],
];
const OCCASION_LINKS = [
  ["/hochzeit", "Hochzeit"],
  ["/firmenfeiern", "Firmenfeier"],
  ["/geburtstage", "Geburtstag & Jubiläum"],
];
const TRUST_LINKS = [
  ["/referenzen", "Referenzen"],
  ["/ueber-mich", "Über mich"],
  ["/faq", "FAQ"],
  ["/kontakt", "Kontakt & Anfrage"],
];

const BIO_TEXT =
  "Emilian Leber ist seit 2016 als Zauberkünstler und Mentalist aus Regensburg deutschlandweit im Einsatz — über zweihundert Events, Finalist bei Greatest Talent und Talents of Magic, 5,0 Sterne bei mehr als 30 Bewertungen auf ProvenExpert. Ob Bühnenshow, Close-Up am Tisch oder Magic Dinner im Restaurant: jedes Format wird auf den Anlass und die Gäste abgestimmt.";
const bioSection = () => h2("Über Emilian Leber") + p(BIO_TEXT);

const GENERIC_FAQ = [
  {
    q: "Was kostet es, einen Zauberer zu buchen?",
    a: "Der Preis hängt vom Format (Close-Up, Bühnenshow oder Magic Dinner), der Dauer und der Anfahrt ab. Close-Up beim Empfang startet im mittleren dreistelligen Bereich, ein abendfüllendes Programm liegt darüber. Du bekommst nach einem kurzen Briefing ein konkretes, unverbindliches Angebot.",
  },
  {
    q: "Für welche Anlässe eignet sich ein Zauberer?",
    a: "Hochzeiten, Firmenfeiern, runde Geburtstage, Jubiläen, Galas, Messen und private Feiern. Für jeden Anlass gibt es das passende Format — Close-Up am Tisch, eine Bühnenshow für alle gleichzeitig oder ein Magic Dinner über den ganzen Abend.",
  },
  {
    q: "In welchem Umkreis bist du buchbar?",
    a: "Ich komme aus Regensburg in Bayern und bin deutschlandweit buchbar — von München und Nürnberg bis Berlin, Hamburg, Köln und Frankfurt. Anfahrt und Übernachtung werden im Angebot transparent ausgewiesen.",
  },
];

/* ─────────────────────────────────────────────────────────────
   Statische Seiten (außer Format-Detail & Home)
   ───────────────────────────────────────────────────────────── */

const STATIC_CONTENT = {
  "/geburtstage": {
    h1: "Zauberer für Geburtstag & Jubiläum",
    lead: "Ein runder Geburtstag oder ein Jubiläum lebt von Momenten, über die am nächsten Tag noch geredet wird. Als Zauberkünstler aus Bayern bringe ich Close-Up-Magie an die Tische und eine Comedy-Bühnenshow zwischen die Reden — abgestimmt auf eure Familie und euren Anlass.",
    sections: [
      {
        h2: "Vom 30er bis zur Goldenen Hochzeit",
        body: "Über 80 Geburtstage und Jubiläen habe ich begleitet — vom ausgelassenen 30er bis zur Goldenen Hochzeit. Anekdoten aus der Familie fließen in die Routinen ein, Tisch-zu-Tisch beim Essen oder eine kleine Bühnenshow zwischen den Reden. Ab etwa fünfzig Gästen entfaltet die Kombination aus Tisch und Bühne ihre volle Wirkung.",
      },
      {
        h2: "Drei Formate, ein Abend",
        bullets: [
          "Close-Up direkt am Tisch — Karten, Münzen, Mentaleffekte in den Händen der Gäste",
          "Comedy-Bühnenshow als Höhepunkt zwischen den Programmpunkten",
          "Magic Dinner für ausgewählte Restaurant-Feiern",
        ],
      },
    ],
    faqs: GENERIC_FAQ,
    schema: {
      service: {
        name: "Zauberer für Geburtstage & Jubiläen",
        serviceType: "Event-Entertainment",
      },
    },
  },
  "/comedy-zauberei": {
    h1: "Comedy-Zauberei — wenn Magie auf Pointe trifft",
    lead: "Comedy ist für mich keine Beilage zur Zauberei, sondern Bestandteil jeder Routine. Spannung, Pause, Pointe, Verblüffung — alle vier in 90 Sekunden, am selben Tisch.",
    sections: [
      {
        h2: "Lachen und Staunen gleichzeitig",
        body: "Ich bin Zauberkünstler mit Stand-Up-Hintergrund. Erfolg messe ich in Lachern pro Minute genauso wie in Atemzügen, die kurz aussetzen — im Schnitt 17 Lacher in 20 Minuten Bühnenshow. Ob Bühne, Tisch oder Magic Dinner: Beides gleichzeitig zu erzeugen, das ist das Format.",
      },
      {
        h2: "Wo Comedy-Zauberei passt",
        body: "Auf Firmenfeiern und Galas lockert Comedy-Magie auch steife Runden auf, bei Hochzeiten verbindet sie Gäste, die sich noch nicht kennen. Die Tonalität stimme ich vorher ab — vom feinen Vorstandsdinner bis zur ausgelassenen Sommerfeier.",
      },
    ],
    faqs: GENERIC_FAQ,
    schema: {
      service: { name: "Comedy-Zauberei", serviceType: "Comedy-Magic-Show" },
    },
  },
  "/moderation": {
    h1: "Moderator & Zauberer für euer Event",
    lead: "Als Moderator mit magischen Inserts halte ich euren Abend zusammen — Übergänge zwischen Reden, Awards und Pausen werden zu kleinen Momenten statt zu Leerlauf.",
    sections: [
      {
        h2: "Moderation mit Magie als Klammer",
        body: "Statt trockener Ansagen verbinde ich Programmpunkte mit kurzen Magie-Bridges: ein Mentaleffekt vor der Preisverleihung, eine Karten-Pointe nach der Rede. Das hält die Aufmerksamkeit hoch und gibt dem Abend einen roten Faden.",
      },
      {
        h2: "Für Galas, Preisverleihungen und Firmenabende",
        body: "Ich übernehme die Anmoderation, halte den Zeitplan und sorge für Energie zwischen den Höhepunkten. Auf Wunsch kombiniert mit einer abschließenden Bühnenshow als Finale.",
      },
    ],
    faqs: GENERIC_FAQ,
    schema: {
      service: { name: "Event-Moderation mit Zauberei", serviceType: "Moderation" },
    },
  },
  "/event-agenturen": {
    h1: "Zauberer für Event-Agenturen",
    lead: "Verlässlicher Premium-Act für eure Kundenevents: Pressekit, Tech-Rider und kurze Reaktionszeiten inklusive. Über 100 Firmenevents, deutschlandweit buchbar.",
    sections: [
      {
        h2: "White-Label und planbar",
        body: "Ihr bekommt einen Showact, der sich nahtlos in eure Regie einfügt — mit fertigem Tech-Rider, klaren Slot-Zeiten und professionellem Auftreten vor euren Kunden. Bei Bedarf trete ich neutral unter eurem Branding auf.",
      },
      {
        h2: "Formate für jeden Programmpunkt",
        bullets: [
          "Walk-Around / Close-Up als Eisbrecher beim Empfang",
          "Bühnenshow von 15 bis 60 Minuten als Höhepunkt",
          "Magic Dinner und Moderation für mehrteilige Abende",
        ],
      },
    ],
    faqs: GENERIC_FAQ,
    schema: {
      service: {
        name: "Zauberer für Event-Agenturen",
        serviceType: "Künstlervermittlung / Showact",
      },
    },
  },
  "/messe-magier": {
    h1: "Messe-Magier — Standmagie & Lead-Magnet",
    lead: "Standmagie, die Besucher anzieht und Gespräche eröffnet: branded Routinen, professioneller Auftritt und ein messbarer Lead-Effekt direkt an eurem Messestand.",
    sections: [
      {
        h2: "Mehr Standbesucher, bessere Gespräche",
        body: "Am Messestand sorge ich für den entscheidenden Moment des Anhaltens. Eine kurze Close-Up-Routine zieht eine Traube an, danach übergebe ich elegant ins Verkaufsgespräch. Eure Produktbotschaft baue ich auf Wunsch in die Effekte ein.",
      },
      {
        h2: "Branded und vorbereitet",
        body: "Routinen mit eurem Produkt oder Claim, abgestimmt aufs Briefing. So bleibt nicht nur der Trick in Erinnerung, sondern eure Marke.",
      },
    ],
    faqs: GENERIC_FAQ,
    schema: {
      service: { name: "Messe-Magier / Standmagie", serviceType: "Messe-Entertainment" },
    },
  },
  "/referenzen": {
    h1: "Referenzen & Kundenstimmen",
    lead: "Vom Vorstandsdinner über den Galaabend bis zur Hochzeit: eine Auswahl der Unternehmen, Veranstalter und Locations aus über zweihundert Engagements — mit 5,0 Sternen bei mehr als 30 Bewertungen.",
    sections: [
      {
        h2: "Wer mich gebucht hat",
        body: "Zu meinen Kunden zählen unter anderem die Versicherungskammer Bayern, STRABAG, XXXLutz, Sixt, Sparkasse, Schneider Weisse, HEIM & HAUS, die Stadt Regensburg und die Stadt Deggendorf sowie das Turmtheater Regensburg. Jede Referenz steht für einen anderen Anlass — Firmenfeier, Gala, Stadtfest oder Hochzeit.",
      },
      {
        h2: "Echte Bewertungen",
        body: "Auf ProvenExpert sammeln sich über 30 verifizierte Bewertungen mit einem Schnitt von 5,0 Sternen. Die Reviews stammen von Brautpaaren, Eventverantwortlichen und Gastgebern privater Feiern.",
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/ueber-mich": {
    h1: "Über Emilian Leber — Zauberer aus Regensburg",
    lead: "Ich bin Emilian Leber, Zauberkünstler und Mentalist aus Regensburg. Aufgewachsen am Pass eines bayerischen Gasthauses, kenne ich Service-Takt und Abendregie aus erster Hand — und baue Magie genau dort ein, wo sie wirklich wirkt.",
    sections: [
      {
        h2: "Werdegang",
        body: "Seit 2016 stehe ich bundesweit auf der Bühne, am Tisch und im Restaurant — über zweihundert Events in zehn Jahren. Mein Spezialgebiet ist seit 2023 das Magic Dinner: ein durchkomponierter Restaurant-Abend mit Close-Up-Magie zwischen den Gängen.",
      },
      {
        h2: "Auszeichnungen & TV",
        bullets: [
          "Greatest Talent 2023 — Finalist (TV)",
          "Talents of Magic 2024 — Finalist + Kreativpreis",
          "Deutsche Jugendmeisterschaft Magie 2024 — Top 30",
          "TV-Auftritt im TVA, 2025",
        ],
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/kontakt": {
    h1: "Kontakt & unverbindliche Anfrage",
    lead: "Du planst ein Event und überlegst, ob ein Zauberer dazupasst? Schreib mir kurz Anlass, Datum und ungefähre Gästezahl — ich melde mich in der Regel innerhalb von 24 Stunden mit einem konkreten Vorschlag.",
    sections: [
      {
        h2: "So erreichst du mich",
        body: "Am schnellsten per E-Mail an el@magicel.de oder über das Anfrageformular auf der Buchungsseite. Die Erstberatung ist kostenlos und unverbindlich — wir klären gemeinsam, welches Format zu deinem Abend passt.",
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/buchung": {
    h1: "Zauberer buchen — Emilian Leber anfragen",
    lead: "Zauberer buchen leicht gemacht: Anlass, Datum und Gästezahl angeben, Format wählen — den Rest klären wir gemeinsam. Die Anfrage ist kostenlos und unverbindlich, die Antwort kommt meist innerhalb von 24 Stunden.",
    sections: [
      {
        h2: "Was du für die Anfrage brauchst",
        bullets: [
          "Anlass (Hochzeit, Firmenfeier, Geburtstag, Messe …)",
          "Datum und ungefähre Uhrzeit",
          "Ungefähre Gästezahl und Ort",
          "Wunschformat: Close-Up, Bühnenshow oder Magic Dinner",
        ],
      },
      {
        h2: "Wie es weitergeht",
        body: "Nach deiner Anfrage stimmen wir das Format ab, ich erstelle ein transparentes Angebot inklusive Anfahrt. Erst danach entscheidest du — ohne Verpflichtung.",
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/faq": {
    h1: "Häufige Fragen zum Zauberer buchen",
    lead: "Die wichtigsten Antworten rund um Buchung, Preise, Ablauf und Formate — von Close-Up über Bühnenshow bis Magic Dinner.",
    sections: [],
    faqs: [
      ...GENERIC_FAQ,
      {
        q: "Wie früh sollte ich buchen?",
        a: "Für Wochenend- und Q4-Termine (Weihnachtsfeiern) empfehle ich 6 bis 12 Wochen Vorlauf. Kurzfristige Anfragen sind bei freiem Slot aber jederzeit möglich.",
      },
      {
        q: "Welche Technik wird benötigt?",
        a: "Close-Up braucht gar keine Technik. Für die Bühnenshow genügen ein Mikrofon (Headset oder Handsender) und ein Bühnenlicht; Soundeinspieler sind optional.",
      },
      {
        q: "Bietest du die Show auch auf Englisch an?",
        a: "Ja, auf Anfrage komplett auf Englisch oder zweisprachig — empfohlen bei internationalen Gästen.",
      },
    ],
  },
  "/presse": {
    h1: "Presse & Downloads",
    lead: "Pressematerial von Emilian Leber: Fotos, Texte und Eckdaten für Medien und Veranstalter. Professioneller Zauberkünstler aus Regensburg, bekannt aus Greatest Talent, Talents of Magic und dem TVA.",
    sections: [
      {
        h2: "Für Redaktionen und Veranstalter",
        body: "Auf Anfrage stelle ich hochauflösende Pressefotos, eine Kurzvita und ein Showreel bereit. Für Ankündigungen findest du Eckdaten zu Auszeichnungen, Formaten und Referenzkunden gebündelt.",
      },
      {
        h2: "Eckdaten auf einen Blick",
        bullets: [
          "Name: Emilian Leber — Zauberkünstler & Mentalist aus Regensburg",
          "Aktiv seit 2016, über zweihundert Events deutschlandweit",
          "Auszeichnungen: Greatest Talent (Finalist), Talents of Magic (Finalist + Kreativpreis), TV-Auftritt im TVA",
          "Formate: Bühnenshow, Close-Up, Magic Dinner, Comedy-Zauberei, Moderation",
          "Bewertung: 5,0 Sterne bei mehr als 30 Bewertungen auf ProvenExpert",
        ],
      },
      {
        h2: "Kontakt für Medienanfragen",
        body: "Medienvertreter und Veranstalter erreichen mich direkt per E-Mail an el@magicel.de. Interview-Anfragen, Foto-Freigaben und Auftritts-Termine beantworte ich in der Regel innerhalb eines Werktags.",
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/blog": {
    h1: "Magazin — Wissen rund um Zauberkunst & Events",
    lead: "Artikel aus über zehn Jahren Erfahrung: wie man einen Hochzeitszauberer auswählt, was ein Magic Dinner ausmacht, wie Firmenfeier-Magie funktioniert und worauf es bei der Bühnenshow ankommt.",
    sections: [
      {
        h2: "Worüber ich schreibe",
        body: "Das Magazin bündelt praktische Leitfäden und Hintergründe zu allen Formaten — Close-Up, Bühnenshow und Magic Dinner — sowie zu Anlässen wie Hochzeit, Firmenfeier und Geburtstag. Jeder Artikel basiert auf echten Engagements.",
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/tickets": {
    h1: "Tickets & Termine — aktuell keine Events",
    lead: "Aktuell sind keine öffentlichen Veranstaltungen geplant — kein Vorverkauf, keine Reservierung. Neue Termine von Emilian Leber erscheinen zuerst hier und im Newsletter.",
    sections: [
      {
        h2: "Aktuelle Termine",
        body: "Derzeit steht kein öffentlicher Termin an. Sobald wieder ein Abend feststeht, wird er auf dieser Seite veröffentlicht und vorab über den Newsletter angekündigt. Private und geschäftliche Buchungen sind davon unabhängig jederzeit möglich.",
      },
    ],
    faqs: GENERIC_FAQ,
  },
  "/datenschutz": {
    h1: "Datenschutzerklärung",
    lead: "Datenschutzerklärung von Emilian Leber — Zauberer & Showkünstler aus Regensburg. Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.",
    sections: [
      {
        h2: "Verantwortlicher",
        body: "Verantwortlich für die Datenverarbeitung auf dieser Website ist Emilian Leber, Regensburg. Bei Fragen zum Datenschutz erreichst du mich unter el@magicel.de.",
      },
    ],
  },
  "/impressum": {
    h1: "Impressum",
    lead: "Impressum und rechtliche Angaben von Emilian Leber — Zauberer & Showkünstler aus Regensburg, Bayern.",
    sections: [
      {
        h2: "Angaben gemäß § 5 TMG",
        body: "Emilian Leber, Zauberkünstler, Regensburg. Kontakt: el@magicel.de. Vollständige Angaben findest du auf der gerenderten Impressums-Seite.",
      },
    ],
  },
  "/agb": {
    h1: "Allgemeine Geschäftsbedingungen",
    lead: "Allgemeine Geschäftsbedingungen von Emilian Leber — Zauberer & Showkünstler. Regelungen zu Buchung, Leistungen, Stornierung und Zahlung.",
    sections: [
      {
        h2: "Geltungsbereich",
        body: "Diese AGB gelten für alle Buchungen von Showleistungen bei Emilian Leber. Details zu Ablauf, Stornofristen und Zahlungsbedingungen findest du auf der gerenderten Seite.",
      },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   Render-Bausteine
   ───────────────────────────────────────────────────────────── */

function renderSections(sections) {
  return (sections || [])
    .map((s) => {
      let out = "";
      if (s.h2) out += h2(s.h2);
      if (s.body) out += p(s.body);
      if (s.bullets) out += ul(s.bullets);
      return out;
    })
    .join("");
}

function wrap(inner) {
  return `<main style="${S.main}"><article style="${S.article}">${inner}</article></main>`;
}

const EMPTY = { jsonLd: "", body: "" };

/**
 * Liefert die zwei Injektions-Teile getrennt:
 *   - jsonLd: <script type="application/ld+json"> → kommt in den <head>
 *     (persistent, sichtbar für No-JS-Crawler UND Googlebot).
 *   - body:   <main>…</main> → kommt in #root (von React beim Mount geleert).
 */
function assemble({ inner, schemas }) {
  return { jsonLd: schemasToHtml(schemas), body: wrap(inner) };
}

/* ─────────────────────────────────────────────────────────────
   Per-Kind-Renderer
   ───────────────────────────────────────────────────────────── */

function renderHome() {
  const faqs = [
    GENERIC_FAQ[0],
    {
      q: "Welche Formate bietet Emilian Leber an?",
      a: "Drei Hauptformate: eine Bühnenshow für alle gleichzeitig, Close-Up-Magie direkt am Tisch und in den Händen der Gäste, sowie das Magic Dinner als durchkomponierter Restaurant-Abend. Einzeln oder kombiniert.",
    },
    GENERIC_FAQ[2],
  ];
  const { html: faqHtml, schema: faqSchema } = faqSection(faqs);
  const inner = [
    `<h1 style="${S.h1}">Zauberer für Hochzeit, Firmenfeier & Magic Dinner — Emilian Leber</h1>`,
    `<p style="${S.lead}">Emilian Leber ist Zauberkünstler und Mentalist aus Regensburg. Seit 2016 bundesweit auf der Bühne, am Tisch und im Restaurant — über zweihundert Events, 5,0 Sterne bei mehr als 30 Bewertungen.</p>`,
    h2("Drei Formate, ein Künstler"),
    `<p style="${S.p}">Magie, die sich in euren Abend einfügt: eine ${ilink(
      "/buehnenshow",
      "Bühnenshow"
    )} für alle gleichzeitig, ${ilink(
      "/close-up",
      "Close-Up"
    )} direkt am Tisch und in den Händen eurer Gäste, oder das ${ilink(
      "/magic-dinner",
      "Magic Dinner"
    )} als durchkomponierter Abend mit Walk-Around, Tisch-zu-Tisch und Bühnenfinale. Comedy gehört dazu — Lacher und Staunen passieren am selben Tisch.</p>`,
    h2("Für jeden Anlass das passende Format"),
    `<p style="${S.p}">Ob ${ilink("/hochzeit", "Hochzeit")}, ${ilink(
      "/firmenfeiern",
      "Firmenfeier"
    )}, ${ilink(
      "/geburtstage",
      "runder Geburtstag"
    )} oder Messe: Jeder Anlass hat seine eigene Dramaturgie. Aufgewachsen am Pass eines bayerischen Gasthauses, kenne ich Service-Takt und Abendregie aus erster Hand.</p>`,
    h2("Bekannt aus TV & Wettbewerb"),
    `<p style="${S.p}">Greatest-Talent-Finalist 2023, Talents-of-Magic-Finalist mit Kreativpreis 2024, Top 30 der Deutschen Jugendmeisterschaft Magie und ein TV-Auftritt im TVA 2025. Zu den Kunden zählen Versicherungskammer Bayern, STRABAG, XXXLutz, Sixt und die Stadt Regensburg — mehr unter ${ilink(
      "/referenzen",
      "Referenzen"
    )}.</p>`,
    bioSection(),
    faqHtml,
    internalLinksBlock([
      ...FORMAT_LINKS,
      ...OCCASION_LINKS,
      ...TRUST_LINKS,
    ]),
    externalLinksBlock(),
  ].join("");
  return assemble({
    inner,
    schemas: [
      personSchema(),
      localBusinessSchema(),
      webSiteSchema(),
      faqSchema,
    ],
  });
}

const DETAIL_H1 = {
  hochzeit: "Hochzeitszauberer — Emilian Leber",
  firmenfeier: "Zauberer für Firmenfeiern — Emilian Leber",
  "magic-dinner": "Magic Dinner — Close-Up am Tisch",
  buehnenshow: "Bühnenshow & Zaubershow — Emilian Leber",
  "close-up": "Close-Up Magie — Tischzauberei",
};

function renderServiceDetail(format, path) {
  const url = `${SITE_URL}${path}`;
  const { html: faqHtml, schema: faqSchema } = faqSection(format.faqGlobal);
  const ablaufHtml = (format.ablauf || [])
    .map((s) => `${h3(s.title)}${p(s.body)}`)
    .join("");
  const otherFormats = FORMAT_LINKS.filter(([href]) => href !== format.detailHref);
  const inner = [
    `<h1 style="${S.h1}">${esc(DETAIL_H1[format.slug] || format.name)}</h1>`,
    `<p style="${S.lead}">${esc(format.intro)}</p>`,
    h2("Ablauf"),
    ablaufHtml,
    h2("Das macht das Format aus"),
    ul(format.highlights || []),
    bioSection(),
    faqHtml,
    internalLinksBlock([
      ...otherFormats,
      ...OCCASION_LINKS,
      ["/referenzen", "Referenzen"],
      ["/kontakt", "Kontakt & Anfrage"],
    ]),
    externalLinksBlock(
      format.slug === "magic-dinner"
        ? [[RESTAURANT_WALDWIESE, "Restaurant Wald & Wiese"]]
        : []
    ),
  ].join("");
  return assemble({
    inner,
    schemas: [
      serviceSchema({
        name: format.name,
        description: format.intro,
        url,
        serviceType: format.name,
      }),
      localBusinessSchema(),
      faqSchema,
      breadcrumbSchema([
        { name: "Start", url: SITE_URL + "/" },
        { name: format.name, url },
      ]),
    ],
  });
}

function renderServiceCity(format, city, urlPath) {
  const url = `${SITE_URL}${urlPath}`;
  const h1 = `${format.hero.titlePrefix} ${city.name}`;
  const faqs = [...(format.faqGlobal || [])];
  if (city.faq && city.faq.length) faqs.push(city.faq[0]);
  const { html: faqHtml, schema: faqSchema } = faqSection(faqs);
  const ablaufHtml = (format.ablauf || [])
    .map((s) => `${h3(s.title)}${p(s.body)}`)
    .join("");
  const inner = [
    `<h1 style="${S.h1}">${esc(h1)}</h1>`,
    `<p style="${S.lead}">${esc(format.intro)}</p>`,
    `<p style="${S.p}">Als ${esc(format.name)}-Künstler bin ich in ${esc(
      city.name
    )} (${esc(
      city.region
    )}) und Umgebung buchbar — für Hochzeiten, Firmenfeiern, Geburtstage und private Anlässe.</p>`,
    h2("Ablauf"),
    ablaufHtml,
    h2("Das macht das Format aus"),
    ul(format.highlights || []),
    faqHtml,
    internalLinksBlock([
      [format.detailHref, `${format.name} im Detail`],
      [`/zauberer/${city.slug}`, `Zauberer in ${city.name}`],
      ...FORMAT_LINKS.filter(([href]) => href !== format.detailHref),
      ["/referenzen", "Referenzen"],
    ]),
    externalLinksBlock(
      format.slug === "magic-dinner"
        ? [wikipediaCity(city), [RESTAURANT_WALDWIESE, "Restaurant Wald & Wiese"]]
        : [wikipediaCity(city)]
    ),
  ].join("");
  return assemble({
    inner,
    schemas: [
      serviceSchema({
        name: `${format.name} in ${city.name}`,
        description: format.intro,
        url,
        serviceType: format.name,
        areaServed: [city.name, city.region],
      }),
      localBusinessSchema([city.name, city.region, "Bayern", "Deutschland"]),
      faqSchema,
      breadcrumbSchema([
        { name: "Start", url: SITE_URL + "/" },
        { name: format.name, url: SITE_URL + format.detailHref },
        { name: city.name, url },
      ]),
    ],
  });
}

function renderCity(city) {
  const url = `${SITE_URL}/zauberer/${city.slug}`;
  const faqs = city.faq && city.faq.length ? city.faq : GENERIC_FAQ;
  const { html: faqHtml, schema: faqSchema } = faqSection(faqs);

  const parts = [
    `<h1 style="${S.h1}">Zauberer in ${esc(city.name)}</h1>`,
    `<p style="${S.lead}">${esc(city.intro)}</p>`,
  ];
  if (city.highlight) parts.push(p(city.highlight));
  parts.push(h2(`Formate für dein Event in ${city.name}`));
  parts.push(
    `<p style="${S.p}">Drei Wege, deinen Abend in ${esc(
      city.name
    )} unvergesslich zu machen: ${ilink(
      `/magic-dinner-${city.slug}`,
      `Magic Dinner in ${city.name}`
    )}, eine ${ilink(
      `/zaubershow-${city.slug}`,
      `Zaubershow in ${city.name}`
    )} oder ${ilink(
      `/zauberer-close-up/${city.slug}`,
      "Close-Up am Tisch"
    )}. Für Anlässe: ${ilink(
      `/zauberer-hochzeit/${city.slug}`,
      "Hochzeitszauberer"
    )} und ${ilink(
      `/zauberer-firmenfeier/${city.slug}`,
      "Firmenfeier-Zauberer"
    )}.</p>`
  );
  if (city.seoText) parts.push(p(city.seoText));
  if (city.langText) parts.push(p(city.langText));
  if (city.bekannteLocations && city.bekannteLocations.length) {
    parts.push(h3(`Beliebte Event-Locations in ${city.name}`));
    parts.push(ul(city.bekannteLocations));
  }
  parts.push(faqHtml);
  parts.push(
    internalLinksBlock([...FORMAT_LINKS, ...OCCASION_LINKS, ["/referenzen", "Referenzen"]])
  );
  parts.push(externalLinksBlock([wikipediaCity(city)]));

  return assemble({
    inner: parts.join(""),
    schemas: [
      localBusinessSchema([city.name, city.region, "Bayern", "Deutschland"]),
      serviceSchema({
        name: `Zauberer in ${city.name}`,
        description: city.intro,
        url,
        serviceType: "Zauberkünstler",
        areaServed: [city.name, city.region],
      }),
      faqSchema,
      breadcrumbSchema([
        { name: "Start", url: SITE_URL + "/" },
        { name: `Zauberer ${city.name}`, url },
      ]),
    ],
  });
}

function renderWissenSections(sections) {
  return (sections || [])
    .map((s) => {
      if (s.type === "heading") return h2(s.text);
      if (s.type === "paragraph") return p(s.text);
      if (s.type === "list") return ul(s.items || []);
      return "";
    })
    .join("");
}

function renderWissen(topic) {
  const url = `${SITE_URL}/wissen/${topic.slug}`;
  const related = (topic.relatedPages || []).map((r) => [r.href, r.title]);
  const relatedTopics = (topic.relatedTopics || []).map((slug) => [
    `/wissen/${slug}`,
    slug.replace(/-/g, " "),
  ]);
  const inner = [
    `<h1 style="${S.h1}">${esc(topic.title)}</h1>`,
    `<p style="${S.lead}">${esc(topic.shortDefinition)}</p>`,
    renderWissenSections(topic.sections),
    internalLinksBlock([
      ...related,
      ...relatedTopics,
      ...FORMAT_LINKS,
      ["/faq", "FAQ"],
    ]),
    externalLinksBlock(),
  ].join("");
  return assemble({
    inner,
    schemas: [
      faqPageSchema([{ q: topic.title, a: topic.shortDefinition }]),
      breadcrumbSchema([
        { name: "Start", url: SITE_URL + "/" },
        { name: "Wissen", url: SITE_URL + "/wissen" },
        { name: topic.title, url },
      ]),
    ],
  });
}

function renderBlogSections(sections) {
  return (sections || [])
    .map((s) => {
      if (s.type === "heading") return h2(s.text);
      if (s.type === "paragraph") return p(s.text);
      if (s.type === "list") return ul(s.items || []);
      if (s.type === "quote")
        return `<blockquote style="${S.quote}">${esc(s.text)}${
          s.attribution ? ` — ${esc(s.attribution)}` : ""
        }</blockquote>`;
      if (s.type === "callout") return `${h3(s.eyebrow)}${p(s.text)}`;
      return "";
    })
    .join("");
}

function renderBlog(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const inner = [
    `<h1 style="${S.h1}">${esc(post.title)}${
      post.titleAccent ? " " + esc(post.titleAccent) : ""
    }</h1>`,
    `<p style="${S.lead}">${esc(post.excerpt)}</p>`,
    renderBlogSections(post.sections),
    internalLinksBlock([
      ["/blog", "Mehr im Magazin"],
      ...FORMAT_LINKS,
      ...OCCASION_LINKS,
      ["/kontakt", "Kontakt & Anfrage"],
    ]),
    externalLinksBlock(),
  ].join("");
  return assemble({
    inner,
    schemas: [
      articleSchema({
        headline: post.title,
        description: post.excerpt,
        url,
        datePublished: post.date,
        wordCount: post.words,
      }),
      breadcrumbSchema([
        { name: "Start", url: SITE_URL + "/" },
        { name: "Magazin", url: SITE_URL + "/blog" },
        { name: post.title, url },
      ]),
    ],
  });
}

function renderStatic(path, route) {
  const c = STATIC_CONTENT[path];
  // Fallback für nicht gepflegte statische Routen: Titel/Description nutzen.
  if (!c) {
    const cleanTitle = (route.ogTitle || route.title || "Emilian Leber")
      .replace(/^★\s*/, "")
      .replace(/\s*·\s*5,0\/5$/, "");
    const inner = [
      `<h1 style="${S.h1}">${esc(cleanTitle)}</h1>`,
      `<p style="${S.lead}">${esc(route.description || "")}</p>`,
      h2("Mehr von Emilian Leber"),
      `<p style="${S.p}">Zauberkünstler und Mentalist aus Regensburg — Bühnenshow, Close-Up und Magic Dinner für Hochzeiten, Firmenfeiern und Events. Über 200 Events seit 2016, 5,0 Sterne bei mehr als 30 Bewertungen.</p>`,
      internalLinksBlock([...FORMAT_LINKS, ...OCCASION_LINKS, ...TRUST_LINKS]),
      externalLinksBlock(),
    ].join("");
    return assemble({ inner, schemas: [localBusinessSchema()] });
  }

  const { html: faqHtml, schema: faqSchema } = faqSection(c.faqs);
  const inner = [
    `<h1 style="${S.h1}">${esc(c.h1)}</h1>`,
    `<p style="${S.lead}">${esc(c.lead)}</p>`,
    renderSections(c.sections),
    bioSection(),
    faqHtml,
    internalLinksBlock([...FORMAT_LINKS, ...OCCASION_LINKS, ...TRUST_LINKS]),
    externalLinksBlock(),
  ].join("");

  const schemas = [localBusinessSchema()];
  if (c.schema && c.schema.service) {
    schemas.push(
      serviceSchema({
        name: c.schema.service.name,
        description: c.lead,
        url: `${SITE_URL}${path}`,
        serviceType: c.schema.service.serviceType,
      })
    );
  }
  if (faqSchema) schemas.push(faqSchema);
  return assemble({ inner, schemas });
}

/* ─────────────────────────────────────────────────────────────
   Öffentliche API: createRenderer()
   ───────────────────────────────────────────────────────────── */

const SERVICE_DETAIL_PATHS = {
  "/hochzeit": "hochzeit",
  "/firmenfeiern": "firmenfeier",
  "/magic-dinner": "magic-dinner",
  "/buehnenshow": "buehnenshow",
  "/close-up": "close-up",
};

export async function createRenderer() {
  const data = await loadSeoData();

  return {
    data,
    /**
     * descriptor:
     *   { kind:'home' }
     *   { kind:'static', path, route }
     *   { kind:'city', citySlug }
     *   { kind:'serviceCity', formatSlug, citySlug, urlPath }
     *   { kind:'wissen', slug }
     *   { kind:'blog', slug }
     * Liefert { jsonLd, body } — jsonLd kommt in den <head>, body in #root.
     * Bei fehlenden Daten EMPTY ({jsonLd:"",body:""}) → Injektion no-op.
     */
    render(descriptor) {
      try {
        switch (descriptor.kind) {
          case "home":
            return renderHome();
          case "static": {
            const fmtSlug = SERVICE_DETAIL_PATHS[descriptor.path];
            if (fmtSlug && data.formatsBySlug[fmtSlug]) {
              return renderServiceDetail(
                data.formatsBySlug[fmtSlug],
                descriptor.path
              );
            }
            return renderStatic(descriptor.path, descriptor.route || {});
          }
          case "city": {
            const city = data.citiesBySlug[descriptor.citySlug];
            return city ? renderCity(city) : EMPTY;
          }
          case "serviceCity": {
            const format = data.formatsBySlug[descriptor.formatSlug];
            const city = data.citiesBySlug[descriptor.citySlug];
            return format && city
              ? renderServiceCity(format, city, descriptor.urlPath)
              : EMPTY;
          }
          case "wissen": {
            const topic = data.wissenBySlug[descriptor.slug];
            return topic ? renderWissen(topic) : EMPTY;
          }
          case "blog": {
            const post = data.blogBySlug[descriptor.slug];
            return post ? renderBlog(post) : EMPTY;
          }
          default:
            return EMPTY;
        }
      } catch (err) {
        // Niemals den Build wegen Content-Rendering brechen — Meta-Tags
        // (der bestehende Nutzen) bleiben in jedem Fall erhalten.
        console.warn(
          `⚠ seo-content: render(${descriptor.kind}) fehlgeschlagen:`,
          err.message
        );
        return EMPTY;
      }
    },
  };
}
