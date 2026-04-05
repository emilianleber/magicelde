import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
// @ts-ignore
import nodemailer from "npm:nodemailer";

const FONT = "'Inter','Segoe UI',Helvetica,Arial,sans-serif";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { customer_name, customer_email, customer_anrede, customer_nachname } = await req.json();
    if (!customer_email) {
      return new Response(JSON.stringify({ error: "E-Mail fehlt" }), { status: 400, headers: corsHeaders });
    }

    // Begrüßung: "Herr Müller" oder "Max Mustermann"
    const gruss = customer_anrede && customer_nachname
      ? `${customer_anrede} ${customer_nachname}`
      : customer_name || "";

    const smtpUser = Deno.env.get("SMTP_USER") || "el@magicel.de";
    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
      port: Number(Deno.env.get("SMTP_PORT") || "465"),
      secure: true,
      auth: { user: smtpUser, pass: Deno.env.get("SMTP_PASS") },
    });

    const html = `<!DOCTYPE html>
<html lang="de" style="color-scheme:light;">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Rechnungsadresse</title>
<style>:root{color-scheme:light!important}html,body{background-color:#fff!important;margin:0!important;padding:0!important}@media(prefers-color-scheme:dark){html,body{background-color:#fff!important}}</style>
</head>
<body style="margin:0;padding:0;background-color:#fff;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;">
<tr><td align="center" style="padding:20px 16px 0;">

  <!-- Header -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:22px 32px 18px;border-radius:14px 14px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td><p style="margin:0;font-size:18px;font-weight:800;color:#fff;letter-spacing:-0.3px;font-family:${FONT};">Emilian Leber</p></td>
        <td style="text-align:right"><span style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:${FONT};">Zauberer &amp; Entertainer</span></td>
      </tr></table>
      <div style="margin-top:12px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
    </td></tr>
  </table>

  <!-- Body -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:28px 32px 16px;background-color:#fff;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#27272a;font-family:${FONT};">Hallo ${gruss},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#27272a;font-family:${FONT};">für die Erstellung Ihres Angebots und Ihrer Rechnung benötige ich noch Ihre <strong>Rechnungsadresse</strong>.</p>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:#27272a;font-family:${FONT};">Bitte hinterlegen Sie diese schnell und einfach in Ihrem Kundenportal unter <strong>Einstellungen → Rechnungsadresse</strong>:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
        <tr><td align="center">
          <a href="https://www.magicel.de/kundenportal/login" style="display:inline-block;background-color:#0a0a0a;color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;font-family:${FONT};">Kundenportal öffnen →</a>
        </td></tr>
      </table>

      <p style="margin:0;font-size:13px;color:#71717a;line-height:1.5;font-family:${FONT};">Melden Sie sich mit Ihrer E-Mail-Adresse (${customer_email}) an. Sie erhalten einen sicheren Einmal-Login-Link.</p>
    </td></tr>
  </table>

  <!-- Signatur -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:0 32px 24px;background-color:#fff;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:24px;">
        <tr><td colspan="2" style="padding-bottom:16px;"><div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div></td></tr>
        <tr>
          <td style="width:64px;vertical-align:top;padding-right:18px;">
            <img src="https://magicel.de/favicon.ico" alt="EL" width="48" height="48" style="border-radius:12px;display:block;" />
          </td>
          <td style="vertical-align:top;">
            <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;font-family:${FONT};">Emilian Leber</p>
            <p style="margin:2px 0 0;font-size:10px;font-weight:600;color:#6366f1;font-family:${FONT};text-transform:uppercase;letter-spacing:1px;">Zauberer &amp; Entertainer</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
              <tr><td style="padding:2px 0;font-size:11px;color:#71717a;font-family:${FONT};width:14px;">T</td><td style="padding:2px 0 2px 6px;font-size:11px;font-family:${FONT};"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
              <tr><td style="padding:2px 0;font-size:11px;color:#71717a;font-family:${FONT};">E</td><td style="padding:2px 0 2px 6px;font-size:11px;font-family:${FONT};"><a href="mailto:el@magicel.de" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td></tr>
              <tr><td style="padding:2px 0;font-size:11px;color:#71717a;font-family:${FONT};">W</td><td style="padding:2px 0 2px 6px;font-size:11px;font-family:${FONT};"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
            </table>
            <p style="margin:6px 0 0;font-size:10px;color:#a1a1aa;font-family:${FONT};">Regensburg · Deutschland · <a href="https://wa.me/4915563744696" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:16px 32px;text-align:center;border-top:1px solid #e4e4e7;">
      <p style="margin:0;font-size:10px;color:#a1a1aa;font-family:${FONT};">
        Emilian Leber · Regensburg ·
        <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:underline;">Datenschutz</a> ·
        <a href="https://magicel.de/impressum" style="color:#a1a1aa;text-decoration:underline;">Impressum</a>
      </p>
    </td></tr>
  </table>

</td></tr></table>
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
