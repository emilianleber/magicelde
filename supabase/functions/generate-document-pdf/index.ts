import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function buildFullPage(previewHtml: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 595px; background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    body > div {
      width: 595px;
      aspect-ratio: 210/297;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
    }
    body > div:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    @media print {
      @page { size: A4 portrait; margin: 0; }
    }
  </style>
</head>
<body>${previewHtml}</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { preview_html, title } = await req.json();

    if (!preview_html) {
      return new Response(JSON.stringify({ error: "preview_html fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const docTitle = title || "Dokument";
    const html = buildFullPage(preview_html, docTitle);

    // Puppeteer — rendert exakt wie der Browser, gibt echtes Vektor-PDF zurück
    const puppeteer = (await import("npm:puppeteer@21.6.1")).default;

    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
      ],
      headless: true,
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 595, height: 842, deviceScaleFactor: 2 });
      await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "0mm", right: "0mm", bottom: "0mm", left: "0mm" },
        scale: 1,
      });

      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${docTitle}.pdf"`,
        },
      });
    } finally {
      await browser.close();
    }

  } catch (err: unknown) {
    console.error("generate-document-pdf error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Server Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
