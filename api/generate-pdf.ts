import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export const config = { maxDuration: 60 };

function buildHtml(previewHtml: string, title: string) {
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
    /* Footer aus dem Flow nehmen – wird von Puppeteer als footerTemplate gerendert */
    [style*="position: absolute"][style*="bottom"] { display: none !important; }
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

    // Footer-HTML extrahieren
    const footerHtml = await page.evaluate(() => {
      const el = document.querySelector('[style*="position: absolute"][style*="bottom"]') as HTMLElement;
      return el ? el.outerHTML : "";
    });

    // Logo-URL extrahieren (aus dem <img> im Header)
    const logoUrl = await page.evaluate(() => {
      const img = document.querySelector('img[src*="logo"], img[src*="favicon"]') as HTMLImageElement;
      return img ? img.src : "";
    });

    // Header-Template: Logo oben rechts + Firmenname links (auf jeder Seite)
    const headerTemplate = `
      <div style="width:100%;padding:12px 40px 0;display:flex;justify-content:space-between;align-items:flex-start;font-family:Inter,system-ui,sans-serif;">
        <div>
          <div style="font-size:11px;font-weight:700;color:#111;">Emilian Leber</div>
          <div style="font-size:7px;color:#666;">Zauberer &amp; Mentalist</div>
        </div>
        ${logoUrl ? `<img src="${logoUrl}" style="width:48px;height:48px;object-fit:contain;" />` : ""}
      </div>
    `;

    // Footer-Template: Unternehmensdaten + Seitenzahl
    const footerTemplate = footerHtml
      ? `<div style="width:100%;font-size:7px;font-family:Inter,system-ui,sans-serif;">
          ${footerHtml.replace(/display:\s*none\s*!important/g, "display:block")}
        </div>`
      : `<div></div>`;

    const hasHeaderFooter = !!footerHtml;

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 96 / 72,
      displayHeaderFooter: hasHeaderFooter,
      headerTemplate: hasHeaderFooter ? headerTemplate : `<div></div>`,
      footerTemplate,
      margin: {
        top: hasHeaderFooter ? "28mm" : "10mm",
        right: "0mm",
        bottom: hasHeaderFooter ? "24mm" : "10mm",
        left: "0mm",
      },
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(docTitle)}.pdf"`);
    res.status(200).send(Buffer.from(pdf));
  } finally {
    await browser.close();
  }
}
