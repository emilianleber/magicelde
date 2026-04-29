// Regeneriert den Body einer alten portal_messages-Zeile aus dem Template.
// Nützlich für Mails die vor dem body=mail.html-Fix mit body=subject geloggt wurden.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Subject-Pattern → Request-Status (für requestMailTemplate switch)
const SUBJECT_TO_STATUS: { pattern: RegExp; status: string }[] = [
  { pattern: /Anfrage ist eingegangen/i, status: "neu" },
  { pattern: /Anfrage wird bearbeitet/i, status: "in_bearbeitung" },
  { pattern: /Details zu Ihrer Anfrage/i, status: "details_besprechen" },
  { pattern: /Rückfrage zu Ihrer Anfrage/i, status: "warte_auf_kunde" },
  { pattern: /Angebot von Emilian Leber liegt bereit/i, status: "angebot_gesendet" },
  { pattern: /Auftragsbestätigung von Emilian Leber liegt bereit/i, status: "gebucht" },
  { pattern: /Buchung ist bestätigt/i, status: "bestätigt" },
  { pattern: /Update zu Ihrer Anfrage/i, status: "abgelehnt" },
];

// Mini-Versionen der Helpers (Quelle: admin-send-status-mail)
const FONT = "'Inter','Segoe UI',Helvetica,Arial,sans-serif";
const fmtDatum = (d: string | null) =>
  d ? new Date(d + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) : "–";
const formatLabels: Record<string, string> = {
  buehne: "Bühnenshow", buehnenshow: "Bühnenshow", closeup: "Close-Up",
  "close-up": "Close-Up", walking_act: "Walking Act", walking: "Walking Act",
  magic_dinner: "Magic Dinner", "magic-dinner": "Magic Dinner", dinner: "Magic Dinner",
  kombination: "Kombination", kombi: "Kombination", beratung: "Beratung",
  moderation: "Moderation", unsicher: "Noch offen",
};
const fmtFormat = (f: string | null) => f ? (formatLabels[f.toLowerCase()] || f) : "–";
const capitalize = (s: string) =>
  s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
const getBegruessung = (nameRaw: string, anrede?: string | null) => {
  const name = capitalize(nameRaw || "");
  const nn = name.split(" ").slice(1).join(" ") || name.split(" ")[0] || "";
  if (anrede) return `${anrede} ${nn}`;
  return name;
};

const statusBadge = (text: string, color: string, bg: string) =>
  `<div style="display:inline-block;background-color:${bg};color:${color};font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;font-family:${FONT};">${text}</div>`;

const infoTable = (rows: { icon: string; label: string; value: string }[]) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">${
    rows.map(r => `<tr><td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:14px 18px;font-family:${FONT};">
      <span style="font-size:12px;color:#71717a;">${r.icon} ${r.label}</span><br>
      <span style="font-size:15px;font-weight:600;color:#0a0a0a;">${r.value}</span>
    </td></tr>`).join("")
  }</table>`;

const getEmailShell = (badge: string, title: string, intro: string, body: string, _: boolean = true) => `<!DOCTYPE html>
<html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#fafafa;font-family:${FONT};">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fafafa;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
<tr><td style="background:#0a0a0a;padding:40px 32px;">
<img src="https://magicel.de/logo-signatur.png" width="56" height="56" style="border-radius:14px;display:block;margin-bottom:16px;" />
<p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;font-family:${FONT};">Emilian Leber</p>
<p style="margin:4px 0 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:${FONT};">Zauberer & Entertainer</p>
</td></tr>
<tr><td style="padding:40px 32px;">${badge}
<h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;font-family:${FONT};">${title}</h1>
<p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#52525b;font-family:${FONT};">${intro}</p>
${body}
</td></tr></table></td></tr></table></body></html>`;

const requestMailTemplate = (request: any): { subject: string; html: string } | null => {
  const rows = [
    { icon: "🎉", label: "Anlass", value: request.anlass || "–" },
    { icon: "📅", label: "Datum", value: fmtDatum(request.datum) },
    { icon: "📍", label: "Ort", value: request.ort || "–" },
    { icon: "👥", label: "Gäste", value: String(request.gaeste ?? "–") },
    request.format ? { icon: "🎭", label: "Format", value: fmtFormat(request.format) } : null,
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  const gruss = getBegruessung(request.name || "", request.anrede);

  switch (request.status) {
    case "angebot_gesendet":
      return {
        subject: "Ihr Angebot von Emilian Leber liegt bereit ✨",
        html: getEmailShell(
          "✦ Angebot bereit",
          "Ihr individuelles Angebot ist fertig!",
          `Hallo ${gruss}, ich habe mir Ihre Veranstaltung genau angeschaut und ein passendes Angebot für Sie erstellt. Sie finden es ab sofort in Ihrem <strong>Kundenportal</strong> zum Download bereit.`,
          `${statusBadge("✦ Angebot bereit", "#2563eb", "#eff6ff")}${infoTable(rows)}
          <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">Schauen Sie sich das Angebot in Ruhe an. Bei Fragen oder Anpassungswünschen bin ich jederzeit für Sie da – per Telefon, E-Mail oder WhatsApp.</p>
          <div style="text-align:center;margin:8px 0 16px;"><a href="https://www.magicel.de/kundenportal/login" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700;font-family:${FONT};">📄 Angebot im Kundenportal ansehen</a></div>`,
          false
        ),
      };
    case "gebucht":
      return {
        subject: "Ihre Auftragsbestätigung von Emilian Leber liegt bereit 📄",
        html: getEmailShell(
          "✦ Auftragsbestätigung",
          "Ihre Auftragsbestätigung ist fertig!",
          `Hallo ${gruss}, vielen Dank für Ihre Buchung! Ihre <strong>Auftragsbestätigung</strong> mit allen Details liegt jetzt in Ihrem Kundenportal zum Download bereit.`,
          `${statusBadge("✦ Auftragsbestätigung bereit", "#15803d", "#f0fdf4")}${infoTable(rows)}
          <div style="text-align:center;margin:8px 0 16px;"><a href="https://www.magicel.de/kundenportal/login" style="display:inline-block;background-color:#15803d;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700;font-family:${FONT};">📄 Auftragsbestätigung ansehen</a></div>`,
          false
        ),
      };
    case "neu":
      return {
        subject: "Ihre Anfrage ist eingegangen – Emilian Leber",
        html: getEmailShell("✦ Anfrage eingegangen", "Vielen Dank für Ihre Anfrage!",
          `Hallo ${gruss}, vielen Dank für Ihre Anfrage! Ich habe sie erhalten und melde mich in Kürze persönlich bei Ihnen.`,
          `${statusBadge("✦ Anfrage eingegangen", "#2563eb", "#eff6ff")}${infoTable(rows)}`),
      };
    case "bestätigt":
      return {
        subject: "Ihre Buchung ist bestätigt – Emilian Leber ✅",
        html: getEmailShell("✦ Bestätigt", "Buchung bestätigt.",
          `Hallo ${gruss}, Ihre Buchung wurde offiziell bestätigt. Alle Details sind festgehalten und ich freue mich auf Ihr Event!`,
          `${statusBadge("✦ Bestätigt", "#15803d", "#f0fdf4")}${infoTable(rows)}`),
      };
  }
  return null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { message_id } = await req.json();
    if (!message_id) return new Response(JSON.stringify({ error: "message_id fehlt" }), { status: 400, headers: corsHeaders });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: msg, error: msgErr } = await supabase
      .from("portal_messages")
      .select("id, subject, customer_id, request_id, event_id")
      .eq("id", message_id)
      .single();
    if (msgErr || !msg) throw new Error("portal_message nicht gefunden");

    // Status aus Subject ableiten
    const matched = SUBJECT_TO_STATUS.find(s => s.pattern.test(msg.subject || ""));
    if (!matched) throw new Error(`Kein Template für Subject "${msg.subject}"`);

    // Request laden + status überschreiben
    if (!msg.request_id) throw new Error("Mail hat keine request_id, Regenerierung nicht möglich");
    const { data: request, error: reqErr } = await supabase
      .from("portal_requests")
      .select("*")
      .eq("id", msg.request_id)
      .single();
    if (reqErr || !request) throw new Error("Request nicht gefunden");

    // Status aus Subject ableiten (überschreibt aktuellen request.status für Template)
    const tmplRequest = { ...request, status: matched.status };
    const mail = requestMailTemplate(tmplRequest);
    if (!mail) throw new Error(`Kein Template für status="${matched.status}"`);

    // Body in DB updaten
    const { error: updateErr } = await supabase
      .from("portal_messages")
      .update({ body: mail.html })
      .eq("id", message_id);
    if (updateErr) throw new Error("Update fehlgeschlagen: " + updateErr.message);

    return new Response(
      JSON.stringify({ success: true, regenerated_status: matched.status, body_length: mail.html.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
