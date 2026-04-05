import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import nodemailer from "npm:nodemailer";

/**
 * Sendet eine Feedback-Anfrage an den Kunden.
 * POST { eventId: string }
 * Nur von Admin aufrufbar.
 */

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

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
const FONT = "'Inter','Segoe UI',Helvetica,Arial,sans-serif";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Auth check
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Nicht autorisiert" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user?.email) return new Response(JSON.stringify({ error: "Ungültige Session" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: admin } = await supabase.from("portal_admins").select("*").eq("email", user.email).maybeSingle();
    if (!admin) return new Response(JSON.stringify({ error: "Kein Admin" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { eventId } = await req.json();
    if (!eventId) return new Response(JSON.stringify({ error: "eventId fehlt" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Event + Kunde laden
    const { data: event } = await supabase.from("portal_events").select("*").eq("id", eventId).single();
    if (!event) return new Response(JSON.stringify({ error: "Event nicht gefunden" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: customer } = await supabase.from("portal_customers").select("*").eq("id", event.customer_id).single();
    if (!customer?.email) return new Response(JSON.stringify({ error: "Kunde hat keine E-Mail" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    // Prüfen ob Feedback schon existiert
    const { data: existing } = await supabase.from("customer_feedback").select("id").eq("event_id", eventId).limit(1);
    if ((existing || []).length > 0) {
      return new Response(JSON.stringify({ error: "Feedback wurde bereits abgegeben", alreadyExists: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const name = customer.name?.split(" ")[0] || customer.name || "Kunde";
    const eventTitle = event.title || "Veranstaltung";

    // Feedback-Mail senden
    const transporter = createTransporter();
    await transporter.sendMail({
      from: SMTP_FROM,
      to: customer.email,
      subject: `Kurze Frage zu deinem Event – Emilian Leber`,
      html: `<!DOCTYPE html>
<html lang="de" style="color-scheme:light;">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Feedback</title></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;border-radius:18px 18px 0 0;padding:28px 32px;">
<table role="presentation" width="100%"><tr>
<td><p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;font-family:${FONT};">Emilian Leber</p><p style="margin:3px 0 0;font-size:11px;color:#a1a1aa;font-family:${FONT};letter-spacing:0.08em;text-transform:uppercase;">Zauberer & Entertainer</p></td>
<td align="right"><p style="margin:0;font-size:28px;">💬</p></td>
</tr></table></td></tr>
<tr><td style="height:3px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);" /></tr>
<tr><td style="padding:36px 32px;">
<h1 style="margin:0 0 18px;font-size:22px;font-weight:700;color:#0a0a0a;font-family:${FONT};line-height:1.3;">Wie war's?</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
Hallo ${name}, Ihr Event „${eventTitle}" liegt nun etwas zurück und ich würde mich sehr über Ihr ehrliches Feedback freuen. Das hilft mir, mich weiterzuentwickeln und mein Programm noch besser zu machen.
</p>
<p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
Es dauert nur 2 Minuten – versprochen! 🙏
</p>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;"><tr><td align="center">
<a href="https://www.magicel.de/kundenportal?tab=feedback&eventId=${eventId}" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:14px;font-weight:700;font-family:${FONT};">Feedback geben →</a>
</td></tr></table>
</td></tr>
<tr><td style="padding:0 32px 28px;border-top:1px solid #f4f4f5;">
<p style="margin:20px 0 0;font-size:14px;color:#71717a;font-family:${FONT};">Mit magischen Grüßen,<br><strong style="color:#0a0a0a;">Emilian Leber</strong></p>
</td></tr>
</table></td></tr></table></body></html>`,
    });

    // Log in portal_messages
    try {
      await supabase.from("portal_messages").insert({
        customer_id: customer.id,
        event_id: eventId,
        subject: `[AUTO] Feedback-Anfrage Event ${eventId}`,
        body: "Feedback-Anfrage gesendet",
        from_email: Deno.env.get("SMTP_USER") || "el@magicel.de",
        to_email: customer.email,
        status: "sent",
        read_by_customer: false,
      });
    } catch (_) {}

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
