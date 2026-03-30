import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { customer_name, customer_email } = await req.json();
    if (!customer_email) {
      return new Response(JSON.stringify({ error: "E-Mail fehlt" }), { status: 400, headers: corsHeaders });
    }

    const firstName = customer_name ? customer_name.split(" ")[0] : null;
    const greeting = firstName ? `Hallo ${firstName},` : "Hallo,";

    const portalLink = "https://magicel.de/kundenportal/login";

    const smtpUser = Deno.env.get("SMTP_USER") || "el@magicel.de";
    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
      port: Number(Deno.env.get("SMTP_PORT") || "465"),
      secure: true,
      auth: {
        user: smtpUser,
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Rechnungsadresse hinterlegen</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border:1px solid #e4e4e7;">

      <!-- Header -->
      <div style="background:#0a0a0a;padding:28px 36px 24px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:36px;height:36px;background:#c4a45e;border-radius:10px;display:flex;align-items:center;justify-content:center;">
            <span style="color:#0a0a0a;font-size:18px;font-weight:bold;">⚡</span>
          </div>
          <div>
            <p style="margin:0;color:#ffffff;font-size:15px;font-weight:700;line-height:1.2;">Emilian Leber</p>
            <p style="margin:0;color:#a1a1aa;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Kundenportal</p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div style="padding:36px 36px 28px;">
        <p style="margin:0 0 8px;font-size:13px;color:#c4a45e;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">Rechnungsadresse</p>
        <h1 style="margin:0 0 20px;font-size:24px;font-weight:800;color:#0a0a0a;line-height:1.2;">${greeting}</h1>
        <p style="margin:0 0 28px;font-size:15px;color:#52525b;line-height:1.6;">
          Für die Erstellung Ihrer Rechnung benötige ich noch Ihre Rechnungsadresse.
          Bitte hinterlegen Sie diese schnell und einfach in Ihrem Kundenportal unter <strong>Einstellungen → Rechnungsadresse</strong>.
        </p>

        <!-- CTA Button -->
        <div style="text-align:center;margin:0 0 28px;">
          <a href="${portalLink}"
             style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.01em;">
            Rechnungsadresse hinterlegen →
          </a>
        </div>

        <div style="background:#f4f4f5;border-radius:12px;padding:16px 20px;">
          <p style="margin:0;font-size:12px;color:#71717a;line-height:1.5;">
            <strong style="color:#0a0a0a;">Hinweis:</strong>
            Melden Sie sich mit Ihrer E-Mail-Adresse (${customer_email}) an. Sie erhalten dazu einen sicheren Einmal-Login-Link.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f4f4f5;padding:20px 36px;border-top:1px solid #e4e4e7;">
        <p style="margin:0;font-size:12px;color:#71717a;text-align:center;">
          Emilian Leber · Zauberer &amp; Showkünstler ·
          <a href="mailto:el@magicel.de" style="color:#c4a45e;text-decoration:none;">el@magicel.de</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Emilian Leber" <${smtpUser}>`,
      to: customer_email,
      subject: "Bitte Rechnungsadresse hinterlegen",
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("request-billing-address error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
