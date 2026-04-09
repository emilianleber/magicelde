import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
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
    const body = await req.json();
    const { customer_id, request_id, event_id, subject, body: mailBody, to_email, to_name, attachment_urls } = body;

    if (!to_email || !subject || !mailBody) {
      return new Response(
        JSON.stringify({ error: "to_email, subject und body sind Pflichtfelder" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const smtpUser = Deno.env.get("SMTP_USER") || "el@magicel.de";

    // Mail senden via Strato SMTP
    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
      port: Number(Deno.env.get("SMTP_PORT") || "465"),
      secure: true,
      auth: {
        user: smtpUser,
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    const toAddress = to_name ? `"${to_name}" <${to_email}>` : to_email;

    // Attachments: fetch each URL and encode as base64
    const attachments: { filename: string; content: string; encoding: string }[] = [];
    if (Array.isArray(attachment_urls) && attachment_urls.length > 0) {
      for (const url of attachment_urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const buf = await res.arrayBuffer();
            const base64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
            const filename = url.split("/").pop()?.split("?")[0] || "Anhang";
            attachments.push({ filename, content: base64, encoding: "base64" });
          }
        } catch (_) {
          // skip failed attachment
        }
      }
    }

    // Wrap plain body in clean professional HTML email
    const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
    const wrappedHtml = `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light only;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
  <style>
    :root{color-scheme:light only!important;}
    html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}
    @media(prefers-color-scheme:dark){html,body{background-color:#ffffff!important;color:#1a1a1a!important;}}
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;font-family:${FONT};">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;">
  <tr><td style="padding:24px 16px;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;">

      <!-- Email body -->
      <tr>
        <td style="padding:0 0 28px;font-size:15px;line-height:1.8;color:#3f3f46;font-family:${FONT};">
          ${mailBody.replace(/\n/g, "<br>")}
        </td>
      </tr>

      <!-- Signature -->
      <tr>
        <td style="padding:24px 0 0;border-top:1px solid #e4e4e7;">
          <p style="margin:0 0 4px;font-size:14px;color:#3f3f46;font-family:${FONT};">Mit freundlichen Gr&uuml;&szlig;en</p>
          <p style="margin:0 0 16px;font-size:15px;font-weight:700;color:#0a0a0a;font-family:${FONT};">Emilian Leber</p>

          <p style="margin:0 0 2px;font-size:13px;font-weight:600;color:#0a0a0a;font-family:${FONT};">MagicEL &ndash; Entertainment &amp; Zauberkunst</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:6px 0 12px;">
            <tr><td style="padding:2px 0;font-size:12px;color:#71717a;font-family:${FONT};">Telefon:&nbsp;</td><td style="padding:2px 0;font-size:12px;font-family:${FONT};"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
            <tr><td style="padding:2px 0;font-size:12px;color:#71717a;font-family:${FONT};">WhatsApp:&nbsp;</td><td style="padding:2px 0;font-size:12px;font-family:${FONT};"><a href="https://wa.me/4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
            <tr><td style="padding:2px 0;font-size:12px;color:#71717a;font-family:${FONT};">Web:&nbsp;</td><td style="padding:2px 0;font-size:12px;font-family:${FONT};"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
          </table>

          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0 14px;">
            <tr>
              <td style="padding-right:16px;vertical-align:middle;">
                <img src="https://magicel.de/favicon.ico" alt="MagicEL" width="40" height="40" style="border-radius:8px;display:block;" />
              </td>
              <td style="vertical-align:middle;">
                <p style="margin:0;font-size:12px;color:#71717a;font-family:${FONT};">
                  &#9733; Google 5.0 &nbsp;|&nbsp; &#9733; ProvenExpert 4.9<br>
                  Kreativpreistr&auml;ger &nbsp;|&nbsp; Greatest Talent Finalist
                </p>
              </td>
            </tr>
          </table>

          <!-- Datenschutz & Steuer -->
          <div style="margin-top:16px;padding-top:12px;border-top:1px solid #e4e4e7;">
            <p style="margin:0;font-size:10px;line-height:1.6;color:#a1a1aa;font-family:${FONT};">
              <strong>Datenschutzhinweis:</strong> Diese E-Mail und ihre Anh&auml;nge sind vertraulich und ausschlie&szlig;lich f&uuml;r den/die genannten Empf&auml;nger bestimmt. Sollten Sie diese E-Mail irrt&uuml;mlich erhalten haben, informieren Sie bitte umgehend den Absender und l&ouml;schen Sie die E-Mail.<br>
              Steuernummer: 244/229/80957
            </p>
          </div>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body></html>`;

    await transporter.sendMail({
      from: `"Emilian Leber" <${smtpUser}>`,
      replyTo: `"Emilian Leber" <${smtpUser}>`,
      to: toAddress,
      subject,
      html: wrappedHtml,
      ...(attachments.length > 0 ? { attachments } : {}),
    });

    // Nachricht in DB speichern
    const { data: message, error: dbError } = await supabase
      .from("portal_messages")
      .insert({
        customer_id: customer_id || null,
        request_id: request_id || null,
        event_id: event_id || null,
        subject,
        body: mailBody,
        from_email: smtpUser,
        to_email,
        status: "sent",
        read_by_customer: false,
      })
      .select("*")
      .single();

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ success: true, message }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("SEND MAIL ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Unbekannter Fehler" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
