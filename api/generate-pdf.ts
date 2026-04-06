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
    /* Header und Footer aus Content entfernen – werden als Bilder in Puppeteer Templates gerendert */
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

  const executablePath = await chromium.executablePath(CHROMIUM_URL);
  const browser = await puppeteer.launch({ args: chromium.args, executablePath, headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 2 });

    // Schritt 1: Volles HTML laden (mit Header/Footer sichtbar) um Screenshots zu machen
    const fullHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important; }
  html,body { width:595px;background:#fff;font-family:'Inter',system-ui,sans-serif;font-size:9pt;line-height:1.5;color:#111; }
  body * { font-family:'Inter',system-ui,sans-serif!important; }
  body > div { width:595px;position:relative; }
</style></head>
<body>${preview_html}</body></html>`;

    await page.setContent(fullHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Header-Block (erstes Kind des Containers) als Base64 screenshotten
    const headerBase64 = await page.evaluate(() => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return null;
      const header = container.children[0] as HTMLElement;
      if (!header) return null;
      return { height: header.offsetHeight };
    });

    const headerScreenshot = await page.$eval("body > div > div:first-child", (el) => {
      const canvas = document.createElement("canvas");
      // Wir nutzen eine andere Methode - Element Clip
      return null;
    }).catch(() => null);

    // Stattdessen: Header als Element-Screenshot
    const headerEl = await page.$("body > div > div:first-child");
    let headerImgBase64 = "";
    let headerH = 0;
    if (headerEl) {
      const box = await headerEl.boundingBox();
      if (box) {
        headerH = box.height;
        const screenshot = await headerEl.screenshot({ encoding: "base64", type: "png" });
        headerImgBase64 = screenshot as string;
      }
    }

    // Footer-Block screenshotten
    const footerEl = await page.$('[style*="position: absolute"][style*="bottom"]');
    let footerImgBase64 = "";
    let footerH = 0;
    if (footerEl) {
      const box = await footerEl.boundingBox();
      if (box) {
        footerH = box.height;
        const screenshot = await footerEl.screenshot({ encoding: "base64", type: "png" });
        footerImgBase64 = screenshot as string;
      }
    }

    // Schritt 2: Content-HTML laden (Header bleibt im Flow auf Seite 1, Footer versteckt)
    const contentHtml = buildHtml(preview_html, docTitle);
    await page.setContent(contentHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Header/Footer als Puppeteer-Templates (Bilder skaliert auf A4-Breite)
    // Puppeteer Templates rendern bei der VOLLEN Seitenbreite, daher width:100%
    const headerTemplate = headerImgBase64
      ? `<div style="width:100%;text-align:center;padding:0;margin:0;"><img src="data:image/png;base64,${headerImgBase64}" style="width:100%;height:auto;display:block;" /></div>`
      : "<div></div>";

    const footerTemplate = footerImgBase64
      ? `<div style="width:100%;text-align:center;padding:0;margin:0;"><img src="data:image/png;base64,${footerImgBase64}" style="width:100%;height:auto;display:block;" /></div>`
      : "<div></div>";

    // Höhe in mm umrechnen (595px = 210mm bei scale 96/72)
    const pxToMm = (px: number) => Math.ceil((px / 595) * 210);
    const headerMm = headerImgBase64 ? pxToMm(headerH) + 4 : 8;
    const footerMm = footerImgBase64 ? pxToMm(footerH) + 4 : 8;

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 96 / 72,
      displayHeaderFooter: !!(headerImgBase64 || footerImgBase64),
      headerTemplate,
      footerTemplate,
      margin: {
        top: `${headerMm}mm`,
        right: "0mm",
        bottom: `${footerMm}mm`,
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
