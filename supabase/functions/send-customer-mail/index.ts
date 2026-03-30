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
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${subject}</title>
  <style>
    :root { color-scheme: light only; }
    body { background-color: #ffffff !important; }
    @media (prefers-color-scheme: dark) {
      body { background-color: #ffffff !important; }
      .email-wrapper { background-color: #ffffff !important; }
      .email-card { background-color: #ffffff !important; }
      .email-content { background-color: #ffffff !important; color: #0a0a0a !important; }
      .email-footer { background-color: #f4f4f5 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;" class="email-wrapper">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;background-color:#ffffff;" class="email-wrapper">
    <div style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border:1px solid #e4e4e7;" class="email-card">
      <div style="background:#0a0a0a;padding:28px 36px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr>
            <td style="vertical-align:middle;">
              <img src="https://www.magicel.de/logo-clean.webp" alt="Emilian Leber" width="120" height="auto" style="display:block;height:auto;max-height:48px;object-fit:contain;" />
            </td>
            <td style="vertical-align:middle;text-align:right;">
              <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Zauberer &amp; Showkünstler</p>
            </td>
          </tr>
        </table>
        <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
      </div>
      <div style="padding:36px 36px 32px;background:#ffffff;" class="email-content">
        <div style="font-size:15px;line-height:1.8;color:#52525b;">${mailBody.replace(/\n/g, "<br>")}</div>
        <div style="border-top:1px solid #e4e4e7;padding-top:24px;margin-top:32px;">
          <p style="margin:0 0 2px;font-size:14px;color:#71717a;">Mit magischen Grüßen,</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;">Emilian Leber</p>
          <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
        </div>
      </div>
      <div style="background:#f4f4f5;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;" class="email-footer">
        <p style="margin:0;font-size:12px;color:#a1a1aa;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
      </div>
    </div>
  </div>
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
