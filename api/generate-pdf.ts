import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const CHROMIUM_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar";

export const config = { maxDuration: 60 };

/**
 * Strategie: Manuelle Pagination im Browser.
 *
 * 1. HTML laden, Header- und Footer-HTML extrahieren
 * 2. Alle Kinder des Content-Bereichs durchgehen
 * 3. Wenn ein Kind die Seitengrenze überschreitet → neue Seite
 * 4. Jede Seite bekommt Header + Footer als echtes HTML
 * 5. Puppeteer generiert PDF ohne eigene Header/Footer
 */
function buildPaginatedHtml(
  previewHtml: string,
  title: string,
) {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 0; }
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    html, body { width: 595px; background: #fff; font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 9pt; line-height: 1.5; color: #111; }
    body * { font-family: 'Inter', system-ui, -apple-system, sans-serif !important; }

    .pdf-page {
      width: 595px;
      height: 842px;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    .pdf-page:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    .pdf-page-header {
      position: absolute;
      top: 0; left: 0; right: 0;
      z-index: 10;
    }
    .pdf-page-footer {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      z-index: 10;
      background: #fff;
    }
    .pdf-page-content {
      overflow: hidden;
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
  const html = buildPaginatedHtml(preview_html, docTitle);

  const executablePath = await chromium.executablePath(CHROMIUM_URL);
  const browser = await puppeteer.launch({ args: chromium.args, executablePath, headless: true });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    // Manuelle Pagination: Content in Seiten aufteilen
    await page.evaluate(() => {
      const PAGE_W = 595;
      const PAGE_H = 842;

      const container = document.querySelector("body > div") as HTMLElement;
      if (!container) return;

      // Header = erstes Kind (mit Logo, Name, Adresse, Trennlinie)
      const headerEl = container.children[0] as HTMLElement;
      const headerHtml = headerEl ? headerEl.outerHTML : "";
      const headerH = headerEl ? headerEl.offsetHeight : 0;

      // Footer = Block mit position:absolute + bottom
      let footerHtml = "";
      let footerH = 0;
      const allEls = container.querySelectorAll("div");
      for (let i = allEls.length - 1; i >= 0; i--) {
        const s = allEls[i].getAttribute("style") || "";
        if (s.includes("position") && s.includes("absolute") && s.includes("bottom")) {
          footerHtml = allEls[i].outerHTML;
          footerH = allEls[i].offsetHeight;
          allEls[i].remove();
          break;
        }
      }

      // Content-Kinder sammeln (ohne Header und Footer)
      const contentChildren: HTMLElement[] = [];
      for (let i = 1; i < container.children.length; i++) {
        contentChildren.push(container.children[i] as HTMLElement);
      }

      // Verfügbare Höhe pro Seite
      const availableH = PAGE_H - headerH - footerH - 20; // 20px Sicherheitspuffer

      // Seiten bauen
      const pages: HTMLElement[] = [];
      let currentPage = document.createElement("div");
      currentPage.className = "pdf-page";
      let currentContentDiv = document.createElement("div");
      currentContentDiv.className = "pdf-page-content";
      currentContentDiv.style.position = "absolute";
      currentContentDiv.style.top = `${headerH}px`;
      currentContentDiv.style.left = "0";
      currentContentDiv.style.right = "0";
      let usedH = 0;

      const finishPage = () => {
        // Header einfügen
        const hDiv = document.createElement("div");
        hDiv.className = "pdf-page-header";
        hDiv.innerHTML = headerHtml;
        currentPage.appendChild(hDiv);

        // Content einfügen
        currentPage.appendChild(currentContentDiv);

        // Footer einfügen
        if (footerHtml) {
          const fDiv = document.createElement("div");
          fDiv.className = "pdf-page-footer";
          fDiv.innerHTML = footerHtml;
          // position:absolute im Footer-HTML überschreiben
          const innerDiv = fDiv.querySelector("div") as HTMLElement;
          if (innerDiv) {
            innerDiv.style.position = "relative";
            innerDiv.style.bottom = "auto";
          }
          currentPage.appendChild(fDiv);
        }

        pages.push(currentPage);
      };

      const startNewPage = () => {
        finishPage();
        currentPage = document.createElement("div");
        currentPage.className = "pdf-page";
        currentContentDiv = document.createElement("div");
        currentContentDiv.className = "pdf-page-content";
        currentContentDiv.style.position = "absolute";
        currentContentDiv.style.top = `${headerH}px`;
        currentContentDiv.style.left = "0";
        currentContentDiv.style.right = "0";
        usedH = 0;
      };

      for (const child of contentChildren) {
        const childH = child.offsetHeight;
        if (usedH + childH > availableH && usedH > 0) {
          startNewPage();
        }
        const clone = child.cloneNode(true) as HTMLElement;
        currentContentDiv.appendChild(clone);
        usedH += childH;
      }

      // Letzte Seite abschließen
      finishPage();

      // DOM ersetzen
      document.body.innerHTML = "";
      for (const p of pages) {
        document.body.appendChild(p);
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
