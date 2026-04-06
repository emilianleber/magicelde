import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export const config = { maxDuration: 60 };

function buildHtml(previewHtml: string, title: string, headerPad: number, footerPad: number) {
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
    body > div { width: 595px; position: relative; padding-top: ${headerPad}px; padding-bottom: ${footerPad}px; }

    /* Header auf jeder Seite wiederholen */
    body > div > div:first-child {
      position: fixed !important;
      top: 0 !important; left: 0 !important; right: 0 !important;
      z-index: 10; background: #fff !important;
    }

    /* Footer auf jeder Seite wiederholen */
    [style*="position: absolute"][style*="bottom"] {
      position: fixed !important;
      bottom: 0 !important; left: 0 !important; right: 0 !important;
      z-index: 10; background: #fff !important;
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
  const executablePath = await chromium.executablePath(CHROMIUM_URL);
  const browser = await puppeteer.launch({ args: chromium.args, executablePath, headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 2 });

    // Schritt 1: HTML ohne Padding laden um Header/Footer-Höhe zu messen
    const measureHtml = buildHtml(preview_html, docTitle, 0, 0);
    await page.setContent(measureHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    const { headerHeight, footerHeight } = await page.evaluate(() => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return { headerHeight: 0, footerHeight: 0 };
      const firstChild = container.children[0] as HTMLElement;
      const hH = firstChild ? firstChild.offsetHeight : 0;
      const footerEl = container.querySelector('[style*="position: absolute"][style*="bottom"]') as HTMLElement;
      const fH = footerEl ? footerEl.offsetHeight : 0;
      return { headerHeight: hH, footerHeight: fH };
    });

    // Schritt 2: HTML NEU laden MIT den korrekten Paddings im CSS
    const finalHtml = buildHtml(preview_html, docTitle, headerHeight + 16, footerHeight + 12);
    await page.setContent(finalHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Schritt 3: PDF generieren
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
