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

    // Einfaches HTML: Content wie er ist, CSS kümmert sich um alles
    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
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
    body * {
      font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
    }
    body > div {
      width: 595px;
      min-height: 842px;
      position: relative;
    }
    /* Footer: position fixed = auf jeder gedruckten Seite wiederholt */
    [style*="position: absolute"][style*="bottom"] {
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      background: #fff !important;
    }
  </style>
</head>
<body>${preview_html}</body>
</html>`;

    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Footer-Höhe messen und als padding-bottom auf den Container setzen
    // Damit der Content NICHT unter den fixed Footer rutscht
    await page.evaluate(() => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return;

      // Footer finden und Höhe messen
      const allDivs = container.querySelectorAll("div");
      let footerH = 0;
      for (let i = allDivs.length - 1; i >= 0; i--) {
        const s = allDivs[i].getAttribute("style") || "";
        if (s.includes("position") && s.includes("bottom")) {
          footerH = allDivs[i].offsetHeight;
          break;
        }
      }

      // Padding-bottom = Footer-Höhe + Sicherheit
      // Das verhindert dass Content unter den Footer rutscht
      if (footerH > 0) {
        container.style.paddingBottom = (footerH + 16) + "px";
      }
    });

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
