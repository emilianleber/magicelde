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
    /* Footer aus Content-Flow entfernen – wird per Puppeteer footerTemplate gerendert */
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

    // Footer-HTML aus dem Content extrahieren (wird per CSS display:none versteckt)
    const footerInnerHtml = await page.evaluate(() => {
      // Vor dem display:none greifen wir den Footer-Content
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return "";
      // Der Footer ist der letzte Block mit position:absolute + bottom
      const allDivs = container.querySelectorAll("div");
      for (let i = allDivs.length - 1; i >= 0; i--) {
        const s = allDivs[i].getAttribute("style") || "";
        if (s.includes("position") && s.includes("absolute") && s.includes("bottom")) {
          return allDivs[i].innerHTML;
        }
      }
      return "";
    });

    // Puppeteer footerTemplate – wird auf JEDER Seite gerendert, außerhalb des Content-Flow
    const footerTemplate = footerInnerHtml
      ? `<style>
          #footer-wrap { width: 595px; margin: 0 auto; padding: 0; font-family: Inter, system-ui, sans-serif; }
          #footer-wrap * { font-family: Inter, system-ui, sans-serif !important; }
        </style>
        <div id="footer-wrap" style="width:595px;font-size:10px;">${footerInnerHtml}</div>`
      : "<div></div>";

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 96 / 72,
      displayHeaderFooter: true,
      // Leerer Header – der echte Header bleibt im Content (damit Logo korrekt dargestellt wird)
      headerTemplate: "<div></div>",
      footerTemplate,
      margin: {
        top: "8mm",    // Kleiner oberer Rand – Header ist im Content
        right: "0mm",
        bottom: "25mm", // Platz für den Puppeteer-Footer
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
