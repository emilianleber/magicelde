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

    // Wrap plain body in branded HTML shell
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
            <td bgcolor="#0a0a0a" style="text-align:right;background-color:#0a0a0a!important;"><p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Zauberer &amp; Showkünstler</p></td>
          </tr></table>
          <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff!important;">
          <div style="font-size:15px;line-height:1.8;color:#52525b!important;">${mailBody.replace(/\n/g, "<br>")}</div>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:24px;">
            <tr><td colspan="2" style="padding-bottom:16px;"><div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div></td></tr>
            <tr>
              <td style="width:64px;vertical-align:top;padding-right:18px;">
                <img src="https://magicel.de/favicon.ico" alt="EL" width="48" height="48" style="border-radius:12px;display:block;" />
              </td>
              <td style="vertical-align:top;">
                <p style="margin:0;font-size:15px;font-weight:700;color:#18181b!important;">Emilian Leber</p>
                <p style="margin:2px 0 0;font-size:10px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">Zauberer &amp; Entertainer</p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                  <tr><td style="padding:2px 0;font-size:11px;color:#71717a;width:14px;">T</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
                  <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">E</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="mailto:el@magicel.de" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td></tr>
                  <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">W</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
                </table>
                <p style="margin:6px 0 0;font-size:10px;color:#a1a1aa;">Regensburg · Deutschland · <a href="https://wa.me/4915563744696" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a></p>
              </td>
            </tr>
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
