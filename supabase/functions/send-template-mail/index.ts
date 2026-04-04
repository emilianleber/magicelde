import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import nodemailer from "npm:nodemailer";

/**
 * Sendet eine E-Mail basierend auf einer Vorlage.
 * POST { templateSlug: string, requestId?: string, eventId?: string, customerId?: string }
 * Platzhalter werden automatisch ersetzt.
 */

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const FONT = "'Inter','Segoe UI',Helvetica,Arial,sans-serif";

const createTransporter = () => nodemailer.createTransport({
  host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
  port: Number(Deno.env.get("SMTP_PORT") || "465"),
  secure: true,
  auth: {
    user: Deno.env.get("SMTP_USER") || "el@magicel.de",
    pass: Deno.env.get("SMTP_PASS"),
  },
});

const SMTP_FROM = `"Emilian Leber" <${Deno.env.get("SMTP_USER") || "el@magicel.de"}>`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Importiert die shared email shell
// In Supabase Edge Functions: relative imports aus _shared/
const signature = `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e4e4e7;margin-top:12px;">
  <tr><td style="padding-top:24px;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding-right:16px;vertical-align:top;">
          <img src="https://magicel.de/logo-signatur.png" alt="EL" width="56" height="56" style="border-radius:14px;display:block;" />
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;font-family:${FONT};line-height:1.3;">Emilian Leber</p>
          <p style="margin:2px 0 0;font-size:12px;color:#71717a;font-family:${FONT};">Zauberer &amp; Entertainer</p>
        </td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:14px;background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:12px;">
      <tr><td style="padding:12px 16px;font-size:12px;color:#52525b;font-family:${FONT};">
        📞 <a href="tel:+4915563744696" style="color:#0a0a0a;text-decoration:none;font-weight:500;">+49 155 63744696</a><br/>
        ✉️ <a href="mailto:el@magicel.de" style="color:#0a0a0a;text-decoration:none;font-weight:500;">el@magicel.de</a><br/>
        🌐 <a href="https://magicel.de" style="color:#0a0a0a;text-decoration:none;font-weight:500;">magicel.de</a><br/>
        💬 <a href="https://wa.me/4915563744696" style="color:#25D366;text-decoration:none;font-weight:500;">WhatsApp schreiben</a>
      </td></tr>
    </table>
  </td></tr>
</table>`;

const buildHtml = (subject: string, body: string) => `<!DOCTYPE html>
<html lang="de" style="color-scheme:light;">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${subject}</title>
<style>:root{color-scheme:light!important}html,body{background-color:#fff!important;margin:0!important;padding:0!important}@media(prefers-color-scheme:dark){html,body{background-color:#fff!important}}</style>
</head>
<body style="margin:0;padding:0;background-color:#fff;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fff;">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.1);border-collapse:separate;border:1px solid #e4e4e7;">

  <!-- Header -->
  <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><p style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;font-family:${FONT};">Emilian Leber</p></td>
      <td style="text-align:right"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:${FONT};">Zauberer &amp; Entertainer</span></td>
    </tr></table>
    <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
  </td></tr>

  <!-- Body -->
  <tr><td style="padding:36px 36px 24px;background-color:#fff;">
    <div style="font-size:16px;line-height:1.85;color:#333;font-family:${FONT};white-space:pre-line;">${body}</div>
    ${signature}
  </td></tr>

  <!-- Footer -->
  <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5;padding:20px 36px;text-align:center;border-top:1px solid #e4e4e7;border-radius:0 0 20px 20px;">
    <p style="margin:0 0 6px;font-size:11px;color:#a1a1aa;font-family:${FONT};">Emilian Leber · Regensburg</p>
    <p style="margin:0;font-size:11px;color:#a1a1aa;font-family:${FONT};">
      <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:underline;">Datenschutz</a> ·
      <a href="https://magicel.de/impressum" style="color:#a1a1aa;text-decoration:underline;">Impressum</a> ·
      <a href="https://magicel.de/agb" style="color:#a1a1aa;text-decoration:underline;">AGB</a>
    </p>
  </td></tr>

</table></td></tr></table>
</body></html>`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Nicht autorisiert" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user?.email) return new Response(JSON.stringify({ error: "Session ungültig" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: admin } = await supabase.from("portal_admins").select("*").eq("email", user.email).maybeSingle();
    if (!admin) return new Response(JSON.stringify({ error: "Kein Admin" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { templateSlug, requestId, eventId, customerId } = await req.json();
    if (!templateSlug) return new Response(JSON.stringify({ error: "templateSlug fehlt" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Template laden
    const { data: template } = await supabase
      .from("email_templates")
      .select("*")
      .eq("slug", templateSlug)
      .eq("aktiv", true)
      .single();

    if (!template) return new Response(JSON.stringify({ error: "Vorlage nicht gefunden" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Kontextdaten laden
    let customer: any = null;
    let request: any = null;
    let event: any = null;

    if (customerId) {
      const { data } = await supabase.from("portal_customers").select("*").eq("id", customerId).single();
      customer = data;
    }
    if (requestId) {
      const { data } = await supabase.from("portal_requests").select("*").eq("id", requestId).single();
      request = data;
      if (!customer && request?.customer_id) {
        const { data: c } = await supabase.from("portal_customers").select("*").eq("id", request.customer_id).single();
        customer = c;
      }
    }
    if (eventId) {
      const { data } = await supabase.from("portal_events").select("*").eq("id", eventId).single();
      event = data;
      if (!customer && event?.customer_id) {
        const { data: c } = await supabase.from("portal_customers").select("*").eq("id", event.customer_id).single();
        customer = c;
      }
    }

    // Empfänger ermitteln
    const toEmail = customer?.email || request?.email;
    if (!toEmail) return new Response(JSON.stringify({ error: "Keine E-Mail-Adresse gefunden" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Platzhalter ersetzen
    const name = customer?.name || request?.name || "";
    const nameParts = name.split(" ");
    const vorname = nameParts[0] || "";
    const nachname = nameParts.slice(1).join(" ") || nameParts[0] || "";
    const firma = customer?.company || request?.firma || "";
    const anrede = firma ? "Frau/Herr" : ""; // Kann später pro Kunde gespeichert werden

    const replacePlaceholders = (text: string) => text
      .replace(/\{\{anrede\}\}/gi, anrede)
      .replace(/\{\{vorname\}\}/gi, vorname)
      .replace(/\{\{nachname\}\}/gi, nachname)
      .replace(/\{\{name\}\}/gi, name)
      .replace(/\{\{firma\}\}/gi, firma)
      .replace(/\{\{email\}\}/gi, toEmail)
      .replace(/\{\{anlass\}\}/gi, request?.anlass || event?.title || "")
      .replace(/\{\{datum\}\}/gi, (request?.datum || event?.event_date) ? new Date(request?.datum || event?.event_date).toLocaleDateString("de-DE") : "")
      .replace(/\{\{ort\}\}/gi, request?.ort || event?.location || "")
      .replace(/\{\{gaeste\}\}/gi, String(request?.gaeste || event?.guests || ""))
      .replace(/\{\{format\}\}/gi, request?.format || event?.format || "");

    const subject = replacePlaceholders(template.betreff);
    const body = replacePlaceholders(template.inhalt);

    // HTML-Mail aufbauen
    // Zeilen mit • am Anfang als Liste formatieren
    const formattedBody = body
      .split("\n")
      .map((line: string) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("•")) {
          return `<div style="padding:4px 0 4px 8px;margin-left:12px;border-left:2px solid #e4e4e7;">${trimmed.slice(1).trim()}</div>`;
        }
        if (trimmed.startsWith("🎩") || trimmed.startsWith("✨") || trimmed.startsWith("💫")) {
          return `<div style="padding:8px 0 4px;"><strong>${trimmed}</strong></div>`;
        }
        if (trimmed === "") return "<br/>";
        return trimmed;
      })
      .join("\n");

    const html = buildHtml(subject, formattedBody);

    // Senden
    const transporter = createTransporter();
    await transporter.sendMail({ from: SMTP_FROM, to: toEmail, subject, html });

    // Log
    await supabase.from("portal_messages").insert({
      customer_id: customer?.id || null,
      request_id: requestId || null,
      event_id: eventId || null,
      subject,
      body: body.slice(0, 500),
      from_email: Deno.env.get("SMTP_USER") || "el@magicel.de",
      to_email: toEmail,
      status: "sent",
      read_by_customer: false,
    }).catch(() => {});

    return new Response(JSON.stringify({ success: true, to: toEmail, subject }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
