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
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light only;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>Rechnungsadresse hinterlegen</title>
  <style>
    :root{color-scheme:light only!important;}
    html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}
    @media(prefers-color-scheme:dark){html,body{background-color:#ffffff!important;color:#0a0a0a!important;}}
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;">
  <tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff!important;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
      <tr>
        <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;padding:28px 36px 24px;border-radius:20px 20px 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
            <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;"><p style="margin:0;font-size:22px;font-weight:800;color:#ffffff!important;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p></td>
            <td bgcolor="#0a0a0a" style="text-align:right;background-color:#0a0a0a!important;"><p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Kundenportal</p></td>
          </tr></table>
          <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff!important;">
          <p style="margin:0 0 20px;font-size:24px;font-weight:800;color:#0a0a0a!important;line-height:1.2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${greeting}</p>
          <p style="margin:0 0 20px;font-size:15px;color:#52525b!important;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            für die Erstellung deines Angebots und deiner Rechnung benötige ich noch deine Rechnungsadresse.<br><br>
            Bitte hinterlege sie schnell und einfach in deinem Kundenportal unter <strong style="color:#0a0a0a;">Einstellungen → Rechnungsadresse</strong>.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td align="center" bgcolor="#ffffff" style="background-color:#ffffff!important;">
                <a href="${portalLink}" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:14px;font-size:15px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Rechnungsadresse hinterlegen &rarr;</a>
              </td>
            </tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
            <tr>
              <td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;border-radius:12px;padding:16px 20px;">
                <p style="margin:0;font-size:12px;color:#71717a!important;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                  <strong style="color:#0a0a0a!important;">Hinweis:</strong> Melde dich mit deiner E-Mail-Adresse (${customer_email}) an. Du erhältst dazu einen sicheren Einmal-Login-Link.
                </p>
              </td>
            </tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e4e4e7;">
            <tr><td bgcolor="#ffffff" style="padding-top:24px;background-color:#ffffff!important;">
              <p style="margin:0 0 2px;font-size:14px;color:#71717a!important;">Mit magischen Grüßen,</p>
              <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a!important;">Emilian Leber</p>
              <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa!important;">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
            </td></tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;border-radius:0 0 20px 20px;">
          <p style="margin:0;font-size:12px;color:#a1a1aa!important;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

    await transporter.sendMail({
      from: `"Emilian Leber" <${smtpUser}>`,
      to: customer_email,
      subject: "Kurze Bitte: Rechnungsadresse für Angebot & Rechnung",
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
