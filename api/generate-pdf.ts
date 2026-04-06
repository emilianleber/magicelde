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

    // Schritt 1: Original-HTML laden, Header/Footer extrahieren, Content-Kinder messen
    const measureHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  * { margin:0;padding:0;box-sizing:border-box; }
  html,body { width:595px;background:#fff;font-family:'Inter',system-ui,sans-serif;font-size:9pt;line-height:1.5;color:#111; }
  body * { font-family:'Inter',system-ui,sans-serif!important; }
  body > div { width:595px;position:relative; }
</style></head>
<body>${preview_html}</body></html>`;

    await page.setContent(measureHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Messen: Header-HTML, Footer-HTML, und jedes Content-Kind mit seiner Höhe
    const measured = await page.evaluate(() => {
      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return null;

      // Header = erstes Kind
      const headerEl = container.children[0] as HTMLElement;
      const headerHtml = headerEl ? headerEl.outerHTML : "";
      const headerH = headerEl ? headerEl.offsetHeight : 0;

      // Footer = letzter div mit position:absolute + bottom
      let footerHtml = "";
      let footerH = 0;
      const allDivs = container.querySelectorAll("div");
      for (let i = allDivs.length - 1; i >= 0; i--) {
        const s = allDivs[i].getAttribute("style") || "";
        if (s.includes("position") && s.includes("bottom")) {
          footerHtml = allDivs[i].outerHTML;
          footerH = allDivs[i].offsetHeight;
          break;
        }
      }

      // Content-Kinder (nach Header, ohne Footer)
      const children: { html: string; height: number }[] = [];
      for (let i = 1; i < container.children.length; i++) {
        const child = container.children[i] as HTMLElement;
        const s = child.getAttribute("style") || "";
        // Footer überspringen
        if (s.includes("position") && s.includes("bottom")) continue;
        children.push({ html: child.outerHTML, height: child.offsetHeight });
      }

      return { headerHtml, headerH, footerHtml, footerH, children };
    });

    if (!measured) throw new Error("Could not measure content");

    // Schritt 2: Seiten manuell aufbauen
    const PAGE_H = 842;
    const availableH = PAGE_H - measured.headerH - measured.footerH - 16;

    const pages: string[] = [];
    let currentContent = "";
    let usedH = 0;

    const flushPage = () => {
      pages.push(`
        <div style="width:595px;height:842px;position:relative;overflow:hidden;page-break-after:always;break-after:page;">
          ${measured.headerHtml}
          <div style="overflow:hidden;">${currentContent}</div>
          <div style="position:absolute;bottom:0;left:0;right:0;background:#fff;">
            ${measured.footerHtml.replace(/position:\s*absolute/g, "position:relative").replace(/bottom:\s*0/g, "bottom:auto")}
          </div>
        </div>
      `);
      currentContent = "";
      usedH = 0;
    };

    for (const child of measured.children) {
      if (usedH + child.height > availableH && usedH > 0) {
        flushPage();
      }
      currentContent += child.html;
      usedH += child.height;
    }
    // Letzte Seite
    if (currentContent || pages.length === 0) {
      flushPage();
    }

    // Letzte Seite: kein page-break-after
    if (pages.length > 0) {
      pages[pages.length - 1] = pages[pages.length - 1]
        .replace("page-break-after:always;break-after:page;", "");
    }

    // Schritt 3: Finales HTML mit allen Seiten
    const finalHtml = `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4 portrait; margin: 0; }
  * { margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important; }
  html,body { width:595px;background:#fff;font-family:'Inter',system-ui,sans-serif;font-size:9pt;line-height:1.5;color:#111; }
  body * { font-family:'Inter',system-ui,sans-serif!important; }
</style></head>
<body>${pages.join("")}</body></html>`;

    await page.setContent(finalHtml, { waitUntil: "networkidle0", timeout: 30000 });
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
