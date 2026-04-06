import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export const config = { maxDuration: 60 };

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

    // Schritt 1: Original laden um Header/Footer/Content zu extrahieren
    const rawHtml = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:595px;background:#fff;font-family:'Inter',system-ui,sans-serif;font-size:9pt;line-height:1.5;color:#111}body *{font-family:'Inter',system-ui,sans-serif!important}body>div{width:595px;position:relative}</style>
</head><body>${preview_html}</body></html>`;

    await page.setContent(rawHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Header, Footer und Content-Blöcke extrahieren
    const parts = await page.evaluate(() => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return null;

      // Header = erstes Kind
      const headerEl = container.children[0] as HTMLElement;
      const headerHtml = headerEl ? headerEl.outerHTML : "";

      // Footer = div mit position:absolute + bottom
      let footerHtml = "";
      let footerIdx = -1;
      for (let i = container.children.length - 1; i >= 0; i--) {
        const s = (container.children[i] as HTMLElement).getAttribute("style") || "";
        if (s.includes("position") && s.includes("bottom")) {
          const el = container.children[i] as HTMLElement;
          // Footer-Styles normalisieren für Table-Context
          el.style.position = "relative";
          el.style.bottom = "auto";
          el.style.left = "auto";
          el.style.right = "auto";
          footerHtml = el.outerHTML;
          footerIdx = i;
          break;
        }
      }

      // Content = alles zwischen Header und Footer
      const contentParts: string[] = [];
      for (let i = 1; i < container.children.length; i++) {
        if (i === footerIdx) continue;
        contentParts.push((container.children[i] as HTMLElement).outerHTML);
      }

      return { headerHtml, footerHtml, contentHtml: contentParts.join("") };
    });

    if (!parts) throw new Error("Could not extract document parts");

    // Schritt 2: Table-basiertes HTML bauen
    // <thead> = Header (wird auf jeder Seite wiederholt)
    // <tfoot> = Footer (wird auf jeder Seite wiederholt)
    // <tbody> = Content (fließt natürlich über Seiten)
    const tableHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { width: 595px; background: #fff; font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 9pt; line-height: 1.5; color: #111; }
    body * { font-family: 'Inter', system-ui, -apple-system, sans-serif !important; }
    table { width: 595px; border-collapse: collapse; }
    thead td, tfoot td, tbody td { padding: 0; vertical-align: top; }
    thead { display: table-header-group; }
    tfoot { display: table-footer-group; }
    tbody { display: table-row-group; }
  </style>
</head>
<body>
  <table>
    <thead><tr><td>${parts.headerHtml}</td></tr></thead>
    <tfoot><tr><td>${parts.footerHtml}</td></tr></tfoot>
    <tbody><tr><td>${parts.contentHtml}</td></tr></tbody>
  </table>
</body>
</html>`;

    await page.setContent(tableHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
      preferCSSPageSize: true,
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(docTitle)}.pdf"`);
    res.status(200).send(Buffer.from(pdf));
  } finally {
    await browser.close();
  }
}
