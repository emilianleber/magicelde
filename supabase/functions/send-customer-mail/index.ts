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

    await transporter.sendMail({
      from: `"Magicel – Emilian Leber" <${smtpUser}>`,
      to: toAddress,
      subject,
      html: mailBody,
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
