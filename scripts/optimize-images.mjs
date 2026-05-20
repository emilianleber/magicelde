/**
 * Hero/Listing-Bilder zu WebP + AVIF konvertieren.
 *
 * Quelle: src/assets/*.jpg
 * Output: src/assets/*.webp + *.avif (gleicher Basename)
 *
 * Wird einmalig (nicht jedem Build) ausgeführt — npm run images.
 */

import sharp from "sharp";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = join(__dirname, "..", "src/assets");

// Größen-Variants pro Bild
const VARIANTS = [
  { suffix: "-1200", width: 1200, quality: { webp: 80, avif: 65 } },
  { suffix: "-800", width: 800, quality: { webp: 78, avif: 62 } },
  { suffix: "-400", width: 400, quality: { webp: 75, avif: 60 } },
];

const SKIP_PATTERNS = [/\.(webp|avif|svg|gif)$/i, /^magic-dinner-summer-poster/];

async function processFile(filePath) {
  const file = basename(filePath);
  if (SKIP_PATTERNS.some((p) => p.test(file))) return null;
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return null;

  const base = basename(file, ext);
  const stats = statSync(filePath);

  const results = [];
  for (const variant of VARIANTS) {
    const webpPath = join(ASSETS_DIR, `${base}${variant.suffix}.webp`);
    const avifPath = join(ASSETS_DIR, `${base}${variant.suffix}.avif`);

    // Skip wenn bereits existiert und Quelle nicht neuer ist
    if (existsSync(webpPath) && statSync(webpPath).mtimeMs >= stats.mtimeMs) {
      continue;
    }

    try {
      await sharp(filePath)
        .resize({ width: variant.width, withoutEnlargement: true })
        .webp({ quality: variant.quality.webp, effort: 4 })
        .toFile(webpPath);

      await sharp(filePath)
        .resize({ width: variant.width, withoutEnlargement: true })
        .avif({ quality: variant.quality.avif, effort: 4 })
        .toFile(avifPath);

      results.push(variant.suffix);
    } catch (err) {
      console.error(`✗ ${file}${variant.suffix}: ${err.message}`);
    }
  }
  return results.length > 0 ? { file, variants: results } : null;
}

async function main() {
  const files = readdirSync(ASSETS_DIR).map((f) => join(ASSETS_DIR, f));
  let count = 0;
  for (const f of files) {
    const result = await processFile(f);
    if (result) {
      console.log(`✓ ${result.file} → ${result.variants.join(", ")}`);
      count++;
    }
  }
  console.log(`\nFertig: ${count} Bilder konvertiert.`);
}

main().catch((err) => {
  console.error("Image-Optimization fehlgeschlagen:", err);
  process.exit(1);
});
