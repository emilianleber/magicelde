import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { subject, html, text } = await req.json();
    if (!subject) return new Response(JSON.stringify({ error: "subject fehlt" }), { status: 400, headers: corsHeaders });

    const smtpUser = Deno.env.get("SMTP_USER") || "el@magicel.de";
    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
      port: Number(Deno.env.get("SMTP_PORT") || "465"),
      secure: true,
      auth: { user: smtpUser, pass: Deno.env.get("SMTP_PASS") },
    });

    await transporter.sendMail({
      from: `"Kundenportal" <${smtpUser}>`,
      to: smtpUser,
      subject,
      html: html || `<p>${text || subject}</p>`,
      text: text || subject,
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err: any) {
    console.error("notify-admin error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
