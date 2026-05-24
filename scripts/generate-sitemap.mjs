/**
 * Dynamische Sitemap-Generierung — schreibt public/sitemap.xml
 *
 * Quellen:
 *   - Statische Routen (Hauptseiten, Legal, Format-Pages)
 *   - Stadt-Pages aus src/data/staedte.ts (109)
 *   - Service-Stadt-Kombis: 5 Formate × 109 Städte = 545 (Phase 2)
 *   - Blog-Posts aus src/data/blogPosts.ts
 *
 * Wird via "npm run build" vor Vite ausgeführt.
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SITE = "https://www.magicel.de";
const TODAY = new Date().toISOString().split("T")[0];

// Hauptseiten — handgepflegte Priorität
const HAUPTSEITEN = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/hochzeit", changefreq: "monthly", priority: 0.95 },
  { path: "/firmenfeiern", changefreq: "monthly", priority: 0.95 },
  { path: "/magic-dinner", changefreq: "monthly", priority: 0.95 },
  { path: "/tickets", changefreq: "weekly", priority: 0.9 },
  { path: "/tickets/magic-dinner-summer-edition", changefreq: "weekly", priority: 0.9 },
  { path: "/buchung", changefreq: "monthly", priority: 0.9 },
  { path: "/event-agenturen", changefreq: "monthly", priority: 0.85 },
  { path: "/messe-magier", changefreq: "monthly", priority: 0.85 },
  { path: "/buehnenshow", changefreq: "monthly", priority: 0.8 },
  { path: "/close-up", changefreq: "monthly", priority: 0.8 },
  { path: "/geburtstage", changefreq: "monthly", priority: 0.8 },
  { path: "/comedy-zauberei", changefreq: "monthly", priority: 0.8 },
  { path: "/moderation", changefreq: "monthly", priority: 0.75 },
  { path: "/referenzen", changefreq: "monthly", priority: 0.8 },
  { path: "/ueber-mich", changefreq: "monthly", priority: 0.75 },
  { path: "/kontakt", changefreq: "monthly", priority: 0.7 },
  { path: "/presse", changefreq: "monthly", priority: 0.5 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  { path: "/faq", changefreq: "monthly", priority: 0.6 },
  { path: "/datenschutz", changefreq: "yearly", priority: 0.2 },
  { path: "/impressum", changefreq: "yearly", priority: 0.2 },
  { path: "/agb", changefreq: "yearly", priority: 0.2 },
];

// Service-Slugs für Stadt-Kombis (Phase 2 — eigener URL-Schema)
// /zauberer-[format]/[stadt]
const SERVICE_SLUGS = [
  { slug: "hochzeit", label: "Hochzeit", priority: 0.7 },
  { slug: "firmenfeier", label: "Firmenfeier", priority: 0.7 },
  { slug: "magic-dinner", label: "Magic Dinner", priority: 0.7 },
  { slug: "close-up", label: "Close-Up", priority: 0.65 },
  { slug: "buehnenshow", label: "Bühnenshow", priority: 0.65 },
];

// Cities laden (via dynamic import, weil .ts → .mjs nicht direkt geht)
async function loadCities() {
  const { staedte } = await import(join(ROOT, "src/data/staedte.ts").replace(/\\/g, "/"))
    .catch(async () => {
      // Fallback: file lesen + regex slugs extrahieren
      const fs = await import("node:fs");
      const content = fs.readFileSync(join(ROOT, "src/data/staedte.ts"), "utf-8");
      const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
      return { staedte: slugs.map((slug) => ({ slug })) };
    });
  return staedte;
}

// Wissen-Topics laden
async function loadWissenTopics() {
  const fs = await import("node:fs");
  const content = fs.readFileSync(join(ROOT, "src/data/wissenTopics.ts"), "utf-8");
  return [...content.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
}

// Blog-Posts laden
async function loadBlogPosts() {
  const fs = await import("node:fs");
  const content = fs.readFileSync(join(ROOT, "src/data/blogPosts.ts"), "utf-8");
  const slugs = [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  // Erster slug ist im Typ-Definition — ignorieren falls vor `blogPosts =`
  const startIdx = content.indexOf("export const blogPosts");
  if (startIdx === -1) return slugs;
  const afterStart = content.slice(startIdx);
  return [...afterStart.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function urlEntry({ path, lastmod = TODAY, changefreq = "monthly", priority = 0.5 }) {
  return `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

async function main() {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <!-- Hauptseiten -->",
  ];

  // Hauptseiten
  for (const page of HAUPTSEITEN) {
    lines.push(urlEntry({ path: page.path, changefreq: page.changefreq, priority: page.priority }));
  }

  // Stadt-Seiten /zauberer/:stadt
  lines.push("  <!-- Stadt-Seiten -->");
  const cities = await loadCities();
  for (const c of cities) {
    const slug = c.slug || c;
    lines.push(urlEntry({ path: `/zauberer/${slug}`, changefreq: "monthly", priority: 0.6 }));
  }

  // Service-Stadt-Kombi-Pages /zauberer-[format]/[stadt]
  // Ausnahme: magic-dinner nutzt die neue keyword-tighter URL /magic-dinner-[stadt].
  lines.push("  <!-- Service-Stadt-Kombinationen (Long-Tail) -->");
  for (const service of SERVICE_SLUGS) {
    for (const c of cities) {
      const slug = c.slug || c;
      const path =
        service.slug === "magic-dinner"
          ? `/magic-dinner-${slug}`
          : `/zauberer-${service.slug}/${slug}`;
      lines.push(
        urlEntry({
          path,
          changefreq: "monthly",
          priority: service.priority,
        }),
      );
    }
  }

  // Wissen / Glossar
  lines.push("  <!-- Wissen / Glossar — Definition-Pages für AEO -->");
  const wissen = await loadWissenTopics();
  for (const slug of wissen) {
    lines.push(urlEntry({ path: `/wissen/${slug}`, changefreq: "monthly", priority: 0.65 }));
  }

  // Blog-Posts
  lines.push("  <!-- Magazin-Beiträge -->");
  const posts = await loadBlogPosts();
  for (const slug of posts) {
    lines.push(urlEntry({ path: `/blog/${slug}`, changefreq: "monthly", priority: 0.55 }));
  }

  lines.push("</urlset>", "");

  writeFileSync(join(ROOT, "public/sitemap.xml"), lines.join("\n"), "utf-8");
  console.log(`✓ sitemap.xml generiert: ${lines.length - 4} URLs · lastmod ${TODAY}`);
}

main().catch((err) => {
  console.error("Sitemap-Generierung fehlgeschlagen:", err);
  process.exit(1);
});
