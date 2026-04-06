import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

// Chromium binary URL (public, hosted by Sparticuz)
const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export const config = {
  maxDuration: 60, // 60s timeout
};

function buildHtml(previewHtml: string, title: string) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 0 0 80px 0; }
    * {
      margin: 0; padding: 0; box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    html, body {
      width: 595px;
      background: #fff;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 9pt;
      line-height: 1.5;
      color: #111;
    }
    body > div {
      width: 595px;
      min-height: auto !important;
      height: auto !important;
      position: relative;
      padding-bottom: 80px !important;
    }
    /* Footer fix am Seitenende auf jeder Seite */
    [style*="position: absolute"][style*="bottom"] {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      background: #fff !important;
    }
    /* Konsistente Schriftgroessen */
    body * {
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
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

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

    // Warten bis Inter-Font geladen ist
    await page.evaluate(() => document.fonts.ready);

    // 595 CSS-px bei 96dpi = 15.75cm, A4 = 21cm → scale 96/72 = 1.333
    // Damit füllt der 595px Content exakt die A4-Breite
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
      scale: 96 / 72,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(docTitle)}.pdf"`);
    res.status(200).send(Buffer.from(pdf));
  } finally {
    await browser.close();
  }
}
