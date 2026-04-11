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

      // Header = erstes Kind (Logo + Name + Adresse + Trennlinie)
      const headerEl = container.children[0] as HTMLElement;
      const headerHtml = headerEl ? headerEl.outerHTML : "";
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;

      // Logo-Bild aus dem Header extrahieren
      const logoImg = headerEl?.querySelector("img") as HTMLImageElement | null;
      let logoSrc = "";
      let logoW = 68;
      let logoH = 68;
      if (logoImg) {
        logoSrc = logoImg.src;
        logoW = logoImg.offsetWidth || 68;
        logoH = logoImg.offsetHeight || 68;
      }

      // Footer = IRGENDWO verschachtelter div mit position:absolute + bottom
      // (ist innerhalb des Body-Divs, nicht direkt ein Kind von container)
      let footerEl: HTMLElement | null = null;
      const allDivs = container.querySelectorAll("div");
      for (let i = allDivs.length - 1; i >= 0; i--) {
        const s = allDivs[i].getAttribute("style") || "";
        if (s.includes("position") && s.includes("absolute") && s.includes("bottom")) {
          footerEl = allDivs[i] as HTMLElement;
          break;
        }
      }

      // Footer aus dem DOM entfernen und HTML extrahieren
      let footerHtml = "";
      if (footerEl) {
        footerEl.style.position = "relative";
        footerEl.style.bottom = "auto";
        footerEl.style.left = "auto";
        footerEl.style.right = "auto";
        footerHtml = footerEl.outerHTML;
        footerEl.remove(); // Entfernen damit er nicht im Content erscheint
      }

      // Content = alles nach dem Header (Footer wurde schon entfernt)
      const contentParts: string[] = [];
      for (let i = 1; i < container.children.length; i++) {
        contentParts.push((container.children[i] as HTMLElement).outerHTML);
      }

      return { headerHtml, headerHeight, logoSrc, logoW, logoH, footerHtml, contentHtml: contentParts.join("") };
    });

    if (!parts) throw new Error("Could not extract document parts");

    // Schritt 2: Table-basiertes HTML bauen
    // <thead> = Mini-Header nur Logo (wird auf jeder Seite wiederholt)
    // <tbody> = Voller Header (nur Seite 1) + Content (fließt natürlich über Seiten)
    // Footer per position:fixed auf jeder Seite

    // Mini-Header: nur Logo rechts oben, kein Name/Adresse/Linie
    const miniHeaderHeight = 56;
    const miniHeaderHtml = parts.logoSrc
      ? `<div id="mini-header" style="position:relative;height:${miniHeaderHeight}px;padding:14px 40px 0;">
           <img src="${parts.logoSrc}" style="position:absolute;top:14px;right:40px;width:${parts.logoW}px;height:${parts.logoH}px;object-fit:contain;border-radius:4px;display:block;" alt="Logo" />
         </div>`
      : `<div id="mini-header" style="height:${miniHeaderHeight}px;"></div>`;

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
    thead td, tbody td { padding: 0; vertical-align: top; }
    thead { display: table-header-group; }
    tbody { display: table-row-group; }
    /* Footer per position:fixed → immer am Seitenende auf jeder Seite */
    #pdf-footer { position: fixed; bottom: 0; left: 0; right: 0; width: 595px; background: #fff; z-index: 10; }
  </style>
</head>
<body>
  <!-- Footer: fixed am Seitenende jeder Seite -->
  <div id="pdf-footer">${parts.footerHtml}</div>
  <!-- Table: thead wiederholt Mini-Header (nur Logo) auf jeder Seite -->
  <table>
    <thead><tr><td>${miniHeaderHtml}</td></tr></thead>
    <tbody><tr><td>
      <!-- Voller Header nur auf Seite 1, per negativem Margin über Mini-Header gezogen -->
      <div id="full-header" style="margin-top:-${miniHeaderHeight}px;position:relative;z-index:2;background:#fff;">${parts.headerHtml}</div>
      ${parts.contentHtml}
    </td></tr></tbody>
  </table>
</body>
</html>`;

    await page.setContent(tableHtml, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Footer-Höhe messen und als padding-bottom auf tbody td setzen
    await page.evaluate(() => {
      const footer = document.getElementById("pdf-footer") as HTMLElement;
      const tbodyTd = document.querySelector("tbody td") as HTMLElement;
      if (footer && tbodyTd) {
        tbodyTd.style.paddingBottom = (footer.offsetHeight + 14) + "px";
      }
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      scale: 96 / 72, // 595px Content → volle A4-Breite
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
