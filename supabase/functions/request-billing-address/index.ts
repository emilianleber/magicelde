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
<html lang="de" style="color-scheme:light only;supported-color-schemes:light;">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<style>:root{color-scheme:light only!important}html,body{background-color:#ffffff!important;margin:0!important;padding:0!important}@media(prefers-color-scheme:dark){html,body,.body-wrap{background-color:#ffffff!important;color:#1a1a1a!important}}</style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;">
<tr><td bgcolor="#ffffff" style="padding:24px;background-color:#ffffff!important;font-family:${FONT};font-size:15px;line-height:1.7;color:#1a1a1a!important;">

Hallo ${gruss},<br><br>

für die Erstellung Ihres Angebots und Ihrer Rechnung benötige ich noch Ihre <strong>Rechnungsadresse</strong>.<br><br>

Bitte hinterlegen Sie diese schnell und einfach in Ihrem Kundenportal unter <strong>Kontakt &amp; Daten</strong>:<br><br>

<a href="https://www.magicel.de/kundenportal/login" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;font-family:${FONT};">Rechnungsadresse hinterlegen &rarr;</a><br><br>

<span style="font-size:13px;color:#71717a;">Melden Sie sich mit Ihrer E-Mail-Adresse (${customer_email}) an. Sie erhalten einen sicheren Einmal-Login-Link. Navigieren Sie dann zu &bdquo;Kontakt &amp; Daten&ldquo; und tragen Sie Ihre Rechnungsadresse ein.</span><br><br>

Vielen Dank!

<br><br>
<div style="border-top:1px solid #e4e4e7;padding-top:16px;margin-top:8px;">
<span style="font-size:14px;color:#3f3f46!important;">Mit freundlichen Gr&uuml;&szlig;en</span><br>
<strong style="font-size:15px;color:#0a0a0a!important;">Emilian Leber</strong><br>
<span style="font-size:13px;color:#71717a!important;">MagicEL &ndash; Entertainment &amp; Zauberkunst</span><br><br>
<span style="font-size:12px;color:#71717a!important;">T: <a href="tel:+4915563744696" style="color:#3f3f46!important;text-decoration:none;">+49 155 637 44 696</a> &nbsp;|&nbsp; W: <a href="https://wa.me/4915563744696" style="color:#3f3f46!important;text-decoration:none;">WhatsApp</a> &nbsp;|&nbsp; <a href="https://magicel.de" style="color:#3f3f46!important;text-decoration:none;">www.magicel.de</a></span>
</div>
</td></tr></table>
</body></html>`;

    await transporter.sendMail({
      from: `"Emilian Leber" <${smtpUser}>`,
      to: customer_email,
      subject: "Kurze Bitte: Rechnungsadresse hinterlegen",
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
