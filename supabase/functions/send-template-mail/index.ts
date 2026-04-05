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
<!-- ═══ SIGNATUR ═══ -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:32px;">

  <!-- Trennlinie mit Akzent -->
  <tr><td colspan="2" style="padding-bottom:20px;">
    <div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div>
  </td></tr>

  <tr>
    <!-- Logo links -->
    <td style="width:64px;vertical-align:top;padding-right:18px;">
      <img src="https://magicel.de/favicon.ico" alt="EL" width="56" height="56" style="border-radius:12px;display:block;" />
    </td>

    <!-- Rechte Seite -->
    <td style="vertical-align:top;">
      <!-- Name -->
      <p style="margin:0;font-size:16px;font-weight:700;color:#18181b;font-family:${FONT};letter-spacing:-0.2px;">Emilian Leber</p>
      <p style="margin:2px 0 0;font-size:11px;font-weight:600;color:#6366f1;font-family:${FONT};text-transform:uppercase;letter-spacing:1px;">Zauberer &amp; Entertainer</p>

      <!-- Kontaktblock -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:10px;">
        <tr>
          <td style="padding:2px 0;font-size:12px;color:#71717a;font-family:${FONT};width:16px;vertical-align:middle;">T</td>
          <td style="padding:2px 0 2px 6px;font-size:12px;font-family:${FONT};"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td>
        </tr>
        <tr>
          <td style="padding:2px 0;font-size:12px;color:#71717a;font-family:${FONT};vertical-align:middle;">E</td>
          <td style="padding:2px 0 2px 6px;font-size:12px;font-family:${FONT};"><a href="mailto:el@magicel.de" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td>
        </tr>
        <tr>
          <td style="padding:2px 0;font-size:12px;color:#71717a;font-family:${FONT};vertical-align:middle;">W</td>
          <td style="padding:2px 0 2px 6px;font-size:12px;font-family:${FONT};"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td>
        </tr>
      </table>

      <!-- Adresse -->
      <p style="margin:8px 0 0;font-size:11px;color:#a1a1aa;font-family:${FONT};">Regensburg · Deutschland</p>

      <!-- Links -->
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:10px;">
        <tr>
          <td style="padding-right:12px;"><a href="https://wa.me/4915563744696" style="font-size:11px;color:#71717a;text-decoration:none;font-family:${FONT};">WhatsApp</a></td>
          <td style="padding-right:12px;border-left:1px solid #e4e4e7;padding-left:12px;"><a href="https://www.instagram.com/emilian.leber/" style="font-size:11px;color:#71717a;text-decoration:none;font-family:${FONT};">Instagram</a></td>
          <td style="padding-right:12px;border-left:1px solid #e4e4e7;padding-left:12px;"><a href="https://g.page/r/CfLlgBMpyJ0vEBM/review" style="font-size:11px;color:#71717a;text-decoration:none;font-family:${FONT};">Google ⭐ 5.0</a></td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<!-- Rechtliches -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:16px;">
  <tr><td style="padding:10px 0 0;font-size:9px;color:#d4d4d8;font-family:${FONT};line-height:1.5;">
    Diese Nachricht ist vertraulich. Sollten Sie nicht der beabsichtigte Empfänger sein, informieren Sie bitte den Absender und löschen Sie diese E-Mail.
  </td></tr>
</table>`;

const buildHtml = (subject: string, body: string) => `<!DOCTYPE html>
<html lang="de" style="color-scheme:light;">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${subject}</title>
<style>:root{color-scheme:light!important}html,body{background-color:#fff!important;margin:0!important;padding:0!important}@media(prefers-color-scheme:dark){html,body{background-color:#fff!important}}</style>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
<tr><td align="center" style="padding:20px 16px 0;">

  <!-- Header Bar -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:22px 32px 18px;border-radius:14px 14px 0 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td><p style="margin:0;font-size:18px;font-weight:800;color:#fff;letter-spacing:-0.3px;font-family:${FONT};">Emilian Leber</p></td>
        <td style="text-align:right"><span style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:${FONT};">Zauberer &amp; Entertainer</span></td>
      </tr></table>
      <div style="margin-top:12px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
    </td></tr>
  </table>

  <!-- Body — kein Card, direkt auf weiß -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:28px 32px 16px;background-color:#ffffff;">
      <div style="font-size:15px;line-height:1.65;color:#27272a;font-family:${FONT};">${body}</div>
    </td></tr>
  </table>

  <!-- Signatur -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:0 32px 24px;background-color:#ffffff;">
      ${signature}
    </td></tr>
  </table>

  <!-- Footer -->
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
    <tr><td style="padding:16px 32px;text-align:center;border-top:1px solid #e4e4e7;">
      <p style="margin:0 0 4px;font-size:10px;color:#a1a1aa;font-family:${FONT};">Emilian Leber · Regensburg · Deutschland</p>
      <p style="margin:0;font-size:10px;color:#a1a1aa;font-family:${FONT};">
        <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:underline;">Datenschutz</a> ·
        <a href="https://magicel.de/impressum" style="color:#a1a1aa;text-decoration:underline;">Impressum</a> ·
        <a href="https://magicel.de/agb" style="color:#a1a1aa;text-decoration:underline;">AGB</a>
      </p>
    </td></tr>
  </table>

</td></tr></table>
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
    // Namen capitalisieren (adam eva → Adam Eva)
    const capitalize = (s: string) => s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const nameCap = capitalize(name);
    const nameParts = nameCap.split(" ");
    const vorname = nameParts[0] || "";
    const nachname = nameParts.slice(1).join(" ") || nameParts[0] || "";
    const firma = customer?.company || request?.firma || "";
    // Anrede: aus Kunde oder Anfrage lesen, Fallback leer (kein "Frau/Herr")
    const anrede = customer?.anrede || request?.anrede || "";

    // Intelligente Begrüßung: "Herr Mustermann" oder "Max Mustermann"
    const begruessung = anrede
      ? `${anrede} ${nachname}`  // "Herr Mustermann" / "Frau Müller"
      : nameCap;                 // "Max Mustermann" (Vor- und Nachname)

    const replacePlaceholders = (text: string) => text
      .replace(/\{\{anrede\}\}/gi, anrede)
      .replace(/\{\{vorname\}\}/gi, vorname)
      .replace(/\{\{nachname\}\}/gi, nachname)
      .replace(/\{\{name\}\}/gi, name)
      .replace(/\{\{begruessung\}\}/gi, begruessung)
      .replace(/\{\{firma\}\}/gi, firma)
      .replace(/\{\{email\}\}/gi, toEmail)
      .replace(/\{\{anlass\}\}/gi, request?.anlass || event?.title || "")
      .replace(/\{\{datum\}\}/gi, (request?.datum || event?.event_date) ? new Date(request?.datum || event?.event_date).toLocaleDateString("de-DE") : "")
      .replace(/\{\{ort\}\}/gi, request?.ort || event?.location || "")
      .replace(/\{\{gaeste\}\}/gi, String(request?.gaeste || event?.guests || ""))
      .replace(/\{\{format\}\}/gi, request?.format || event?.format || "");

    const subject = replacePlaceholders(template.betreff);
    const body = replacePlaceholders(template.inhalt);

    // HTML-Mail aufbauen — saubere Formatierung
    const lines = body.split("\n");
    let formattedBody = "";
    let inList = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("•")) {
        if (!inList) { formattedBody += `<ul style="margin:8px 0 8px 4px;padding-left:20px;color:#27272a;">`; inList = true; }
        formattedBody += `<li style="padding:2px 0;line-height:1.5;">${trimmed.slice(1).trim()}</li>`;
        continue;
      }

      if (inList) { formattedBody += "</ul>"; inList = false; }

      if (trimmed.startsWith("🎩") || trimmed.startsWith("✨") || trimmed.startsWith("💫")) {
        formattedBody += `<p style="margin:16px 0 4px;font-weight:700;font-size:15px;">${trimmed}</p>`;
      } else if (trimmed === "") {
        formattedBody += `<div style="height:10px;"></div>`;
      } else {
        formattedBody += `<p style="margin:0 0 6px;">${trimmed}</p>`;
      }
    }
    if (inList) formattedBody += "</ul>";

    const html = buildHtml(subject, formattedBody);

    // Senden
    try {
      const transporter = createTransporter();
      await transporter.sendMail({ from: SMTP_FROM, to: toEmail, subject, html });
      console.log(`Mail gesendet an ${toEmail}: ${subject}`);
    } catch (smtpErr: any) {
      console.error("SMTP Fehler:", smtpErr.message || smtpErr);
      // Mail-Fehler nicht als 500 zurückgeben wenn es nur SMTP ist
      return new Response(JSON.stringify({ success: false, error: "Mail konnte nicht gesendet werden: " + (smtpErr.message || "SMTP Fehler") }), {
        status: 200, // 200 damit Frontend keinen generic Error zeigt
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log (fire-and-forget)
    try {
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
      });
    } catch (_) {}

    return new Response(JSON.stringify({ success: true, to: toEmail, subject }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
