import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export const config = { maxDuration: 60 };

function buildHtml(previewHtml: string, title: string) {
  // Der erste Header-Block (mit Logo, Name, Adresse) und der Footer-Block
  // werden per CSS position:fixed auf jeder Seite wiederholt.
  // Der eigentliche Content bekommt margin-top/bottom damit er nicht überdeckt wird.
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { width: 595px; background: #fff; font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 9pt; line-height: 1.5; color: #111; }
    body * { font-family: 'Inter', system-ui, -apple-system, sans-serif !important; }
    body > div { width: 595px; position: relative; }

    /* Header (erster Block mit border-bottom) auf jeder Seite wiederholen */
    body > div > div:first-child {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 10;
      background: #fff !important;
    }

    /* Footer (absolute bottom Block) auf jeder Seite wiederholen */
    [style*="position: absolute"][style*="bottom"] {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 10;
      background: #fff !important;
    }
  </style>
</head>
<body>${previewHtml}</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    return res.status(200).end();
  }
  if (req.method !== "POST") return res.status(405).end();

  const { preview_html, title } = req.body as { preview_html: string; title: string };
  if (!preview_html) return res.status(400).json({ error: "preview_html fehlt" });

  const docTitle = title || "Dokument";
  const html = buildHtml(preview_html, docTitle);

  const executablePath = await chromium.executablePath(CHROMIUM_URL);
  const browser = await puppeteer.launch({ args: chromium.args, executablePath, headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Header- und Footer-Höhe messen für korrekte Margins
    const { headerHeight, footerHeight } = await page.evaluate(() => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return { headerHeight: 0, footerHeight: 0 };

      const firstChild = container.children[0] as HTMLElement;
      const hH = firstChild ? firstChild.offsetHeight : 0;

      const footerEl = container.querySelector('[style*="position: absolute"][style*="bottom"]') as HTMLElement;
      const fH = footerEl ? footerEl.offsetHeight : 0;

      return { headerHeight: hH, footerHeight: fH };
    });

    // Content-Bereich braucht Padding damit Header/Footer ihn nicht überdecken
    await page.evaluate((hH: number, fH: number) => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return;
      // Padding für den Content (nach dem fixed Header, vor dem fixed Footer)
      container.style.paddingTop = `${hH + 16}px`;
      container.style.paddingBottom = `${fH + 10}px`;
    }, headerHeight, footerHeight);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 96 / 72,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(docTitle)}.pdf"`);
    res.status(200).send(Buffer.from(pdf));
  } finally {
    await browser.close();
  }
}
