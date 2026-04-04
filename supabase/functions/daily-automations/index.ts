import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import nodemailer from "npm:nodemailer";

/**
 * Daily Automations Cron
 * Läuft täglich und prüft:
 * 1. Danke-Mail: Tag nach dem Event (event_erfolgt)
 * 2. Event-Erinnerung: 7 Tage vor Event
 * 3. Angebot läuft ab: 3 Tage vor Ablauf
 * 4. Zahlungserinnerung: Am Fälligkeitstag
 *
 * Aufruf: Supabase pg_cron oder externer Cron via POST
 * POST /daily-automations mit Header: Authorization: Bearer <service_role_key>
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

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = createTransporter();
  await transporter.sendMail({ from: SMTP_FROM, to, subject, html });
};

// ── Branded email shell (gleich wie admin-send-status-mail) ──
const getEmailShell = (title: string, headline: string, intro: string, content: string, showPortalButton = true) => `<!DOCTYPE html>
<html lang="de" style="color-scheme:light;">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${title}</title></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:${FONT};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<!-- Header -->
<tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;border-radius:18px 18px 0 0;padding:28px 32px;">
<table role="presentation" width="100%"><tr>
<td><p style="margin:0;font-size:17px;font-weight:700;color:#ffffff;font-family:${FONT};">Emilian Leber</p><p style="margin:3px 0 0;font-size:11px;color:#a1a1aa;font-family:${FONT};letter-spacing:0.08em;text-transform:uppercase;">Zauberer & Entertainer</p></td>
<td align="right"><p style="margin:0;font-size:28px;">✨</p></td>
</tr></table></td></tr>
<!-- Divider -->
<tr><td style="height:3px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);" /></tr>
<!-- Body -->
<tr><td style="padding:36px 32px;">
<h1 style="margin:0 0 18px;font-size:22px;font-weight:700;color:#0a0a0a;font-family:${FONT};line-height:1.3;">${headline}</h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">${intro}</p>
${content}
${showPortalButton ? `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;"><tr><td align="center">
<a href="https://magicel.de/kundenportal" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:14px;font-weight:700;font-family:${FONT};">Kundenportal öffnen →</a>
</td></tr></table>` : ""}
</td></tr>
<!-- Signature -->
<tr><td style="padding:0 32px 28px;border-top:1px solid #f4f4f5;">
<p style="margin:20px 0 0;font-size:14px;color:#71717a;font-family:${FONT};">Mit magischen Grüßen,<br><strong style="color:#0a0a0a;">Emilian Leber</strong></p>
</td></tr>
</table></td></tr></table></body></html>`;

const statusBadge = (text: string, color: string, bg: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td style="background-color:${bg};border:1px solid ${color}20;border-radius:10px;padding:8px 16px;font-size:13px;font-weight:700;color:${color};font-family:${FONT};">${text}</td></tr></table>`;

const infoTable = (rows: { icon: string; label: string; value: string }[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
<tr><td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
${rows.map((r, i) => `<tr><td bgcolor="#f9fafb" style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#71717a;width:44%;font-family:${FONT};background-color:#f9fafb;">${r.icon}&nbsp;${r.label}</td><td bgcolor="#f9fafb" style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#0a0a0a;font-weight:600;font-family:${FONT};background-color:#f9fafb;">${r.value}</td></tr>`).join("")}
</table></td></tr></table>`;

// ── Date helpers ──
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const addDays = (dateStr: string, days: number) => {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const fmtDate = (s: string) => new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

// ── Tracking: verhindert doppelte Mails ──
const alreadySent = async (key: string): Promise<boolean> => {
  const { data } = await supabase
    .from("portal_messages")
    .select("id")
    .eq("subject", key)
    .limit(1);
  return (data || []).length > 0;
};

const logMail = async (customerId: string | null, eventId: string | null, requestId: string | null, subject: string, toEmail: string) => {
  await supabase.from("portal_messages").insert({
    customer_id: customerId,
    event_id: eventId,
    request_id: requestId,
    subject,
    body: subject,
    from_email: Deno.env.get("SMTP_USER") || "el@magicel.de",
    to_email: toEmail,
    status: "sent",
    read_by_customer: false,
  }).catch(() => {});
};

// ── CORS ──
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const results: string[] = [];

  try {
    const todayStr = today();
    const yesterdayStr = addDays(todayStr, -1);
    const in7days = addDays(todayStr, 7);
    const in3days = addDays(todayStr, 3);

    // ─────────────────────────────────────────────────────────
    // 1. DANKE-MAIL: Events die gestern stattgefunden haben
    // ─────────────────────────────────────────────────────────
    const { data: completedEvents } = await supabase
      .from("portal_events")
      .select("*, customer:customer_id(id, name, email)")
      .eq("event_date", yesterdayStr)
      .is("deleted_at", null)
      .neq("status", "storniert");

    for (const evt of completedEvents || []) {
      const customer = evt.customer as any;
      if (!customer?.email) continue;

      const mailKey = `[AUTO] Danke-Mail Event ${evt.id}`;
      if (await alreadySent(mailKey)) continue;

      const name = customer.name?.split(" ")[0] || customer.name || "Kunde";
      const isWedding = (evt.format || "").toLowerCase().includes("hochzeit") ||
        (evt.title || "").toLowerCase().includes("hochzeit");

      const rows = [
        { icon: "🎉", label: "Event", value: evt.title || "Veranstaltung" },
        { icon: "📅", label: "Datum", value: fmtDate(evt.event_date) },
        evt.location ? { icon: "📍", label: "Ort", value: evt.location } : null,
      ].filter(Boolean) as { icon: string; label: string; value: string }[];

      const reviewSection = `
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
      <tr><td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:22px 24px;">
        <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
          Falls du einen Moment hast, würde ich mich sehr über eine Bewertung freuen – das hilft anderen bei ihrer Entscheidung. 🙏
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding:0 5px 0 0;" width="50%"><a href="https://g.page/r/CfLlgBMpyJ0vEBM/review" style="display:block;text-align:center;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:${FONT};">⭐ Google Bewertung</a></td>
          <td style="padding:0 0 0 5px;" width="50%"><a href="https://www.provenexpert.com/emilian-leber/?modal=feedback&style=white" style="display:block;text-align:center;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:${FONT};">⭐ ProvenExpert</a></td>
        </tr>
        ${isWedding ? `<tr><td colspan="2" style="padding:10px 0 0;"><a href="https://www.weddyplace.com/de/zauberer/emilian-leber#bewertungen" style="display:block;text-align:center;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:${FONT};">💍 Weddyplace Bewertung</a></td></tr>` : ""}
        </table>
      </td></tr></table>`;

      await sendMail(
        customer.email,
        "Vielen Dank für ein unvergessliches Event! ✨",
        getEmailShell(
          "Danke",
          "Vielen Dank.",
          `Hallo ${name}, vielen Dank für das wunderbare Event und dein Vertrauen. Es war mir eine echte Freude!`,
          `${infoTable(rows)}${reviewSection}`,
          false
        )
      );

      // Event-Status auf event_erfolgt setzen
      await supabase.from("portal_events").update({ status: "event_erfolgt" }).eq("id", evt.id);

      await logMail(customer.id, evt.id, null, mailKey, customer.email);
      results.push(`Danke-Mail: ${customer.email} (Event ${evt.id})`);
    }

    // ─────────────────────────────────────────────────────────
    // 2. EVENT-ERINNERUNG: 7 Tage vor Event
    // ─────────────────────────────────────────────────────────
    const { data: upcomingEvents } = await supabase
      .from("portal_events")
      .select("*, customer:customer_id(id, name, email)")
      .eq("event_date", in7days)
      .is("deleted_at", null)
      .neq("status", "storniert");

    for (const evt of upcomingEvents || []) {
      const customer = evt.customer as any;
      if (!customer?.email) continue;

      const mailKey = `[AUTO] Erinnerung 7d Event ${evt.id}`;
      if (await alreadySent(mailKey)) continue;

      const name = customer.name?.split(" ")[0] || customer.name || "Kunde";
      const rows = [
        { icon: "🎉", label: "Event", value: evt.title || "Veranstaltung" },
        { icon: "📅", label: "Datum", value: fmtDate(evt.event_date) },
        evt.start_time ? { icon: "🕐", label: "Uhrzeit", value: evt.start_time } : null,
        evt.location ? { icon: "📍", label: "Ort", value: evt.location } : null,
        evt.guests ? { icon: "👥", label: "Gäste", value: String(evt.guests) } : null,
      ].filter(Boolean) as { icon: string; label: string; value: string }[];

      await sendMail(
        customer.email,
        "In einer Woche ist es soweit! 🎩",
        getEmailShell(
          "Erinnerung",
          "Dein Event in 7 Tagen.",
          `Hallo ${name}, nur noch eine Woche bis zu deinem Event! Ich freue mich schon sehr. Falls du noch Fragen oder Änderungswünsche hast, melde dich gerne.`,
          `${statusBadge("📅 In 7 Tagen", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        )
      );

      await logMail(customer.id, evt.id, null, mailKey, customer.email);
      results.push(`Erinnerung 7d: ${customer.email} (Event ${evt.id})`);
    }

    // ─────────────────────────────────────────────────────────
    // 3. ANGEBOT LÄUFT AB: 3 Tage vor gueltig_bis
    // ─────────────────────────────────────────────────────────
    const { data: expiringOffers } = await supabase
      .from("portal_documents")
      .select("*, customer:customer_id(id, name, email)")
      .eq("type", "Angebot")
      .eq("status", "gesendet")
      .eq("gueltig_bis", in3days);

    for (const doc of expiringOffers || []) {
      const customer = doc.customer as any;
      if (!customer?.email) continue;

      const mailKey = `[AUTO] Angebot ablauf ${doc.id}`;
      if (await alreadySent(mailKey)) continue;

      const name = customer.name?.split(" ")[0] || customer.name || "Kunde";

      await sendMail(
        customer.email,
        "Dein Angebot läuft bald ab – Emilian Leber",
        getEmailShell(
          "Angebot",
          "Dein Angebot läuft in 3 Tagen ab.",
          `Hallo ${name}, kurze Erinnerung: dein Angebot ${doc.document_number || ""} ist noch bis zum ${fmtDate(in3days)} gültig. Falls du noch Fragen hast, melde dich gerne – ich helfe dir bei der Entscheidung.`,
          `${statusBadge("⏳ Läuft bald ab", "#b45309", "#fffbeb")}`
        )
      );

      await logMail(customer.id, null, doc.request_id, mailKey, customer.email);
      results.push(`Angebot-Ablauf: ${customer.email} (Doc ${doc.id})`);
    }

    // ─────────────────────────────────────────────────────────
    // 4. ZAHLUNGSERINNERUNG: Am Fälligkeitstag
    // ─────────────────────────────────────────────────────────
    const { data: dueInvoices } = await supabase
      .from("portal_documents")
      .select("*, customer:customer_id(id, name, email)")
      .in("type", ["Rechnung", "Abschlagsrechnung"])
      .in("status", ["gesendet", "offen"])
      .eq("faellig_am", todayStr);

    for (const doc of dueInvoices || []) {
      const customer = doc.customer as any;
      if (!customer?.email) continue;

      const mailKey = `[AUTO] Zahlungserinnerung ${doc.id}`;
      if (await alreadySent(mailKey)) continue;

      const name = customer.name?.split(" ")[0] || customer.name || "Kunde";
      const isAR = doc.type === "Abschlagsrechnung";
      const typLabel = isAR ? "Abschlagsrechnung" : "Rechnung";

      await sendMail(
        customer.email,
        `Freundliche Erinnerung: ${typLabel} heute fällig – Emilian Leber`,
        getEmailShell(
          "Zahlung",
          `Deine ${typLabel} ist heute fällig.`,
          `Hallo ${name}, kurze freundliche Erinnerung: deine ${typLabel} ${doc.document_number || ""} ist heute fällig. Du findest sie jederzeit in deinem Kundenportal zum Download.`,
          `${statusBadge("✦ Zahlung fällig", "#b45309", "#fffbeb")}
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">Bei Fragen zur Rechnung melde dich gerne direkt bei mir.</p>`
        )
      );

      await logMail(customer.id, doc.event_id, doc.request_id, mailKey, customer.email);
      results.push(`Zahlungserinnerung: ${customer.email} (Doc ${doc.id})`);
    }

    // ─────────────────────────────────────────────────────────
    // 5. FEEDBACK-ABFRAGE: 30 Tage nach Event
    //    Erstellt Admin-Todo: "Hat Kunde X bewertet?"
    //    Admin entscheidet → wenn nein, Feedback-Mail wird gesendet
    // ─────────────────────────────────────────────────────────
    const thirtyDaysAgo = addDays(todayStr, -30);
    const { data: feedbackEvents } = await supabase
      .from("portal_events")
      .select("*, customer:customer_id(id, name, email)")
      .eq("event_date", thirtyDaysAgo)
      .is("deleted_at", null)
      .eq("status", "event_erfolgt");

    for (const evt of feedbackEvents || []) {
      const customer = evt.customer as any;
      if (!customer?.email || !customer?.name) continue;

      const todoKey = `[AUTO] Feedback-Check: ${customer.name} (Event ${evt.id})`;

      // Prüfen ob Todo schon existiert
      const { data: existingTodo } = await supabase
        .from("portal_todos")
        .select("id")
        .eq("title", todoKey)
        .limit(1);
      if ((existingTodo || []).length > 0) continue;

      // Admin-Todo erstellen
      await supabase.from("portal_todos").insert({
        title: todoKey,
        status: "offen",
        priority: "medium",
        due_date: todayStr,
        customer_id: customer.id,
        event_id: evt.id,
      });

      // Admin-Mail mit Entscheidungs-Link
      const adminEmail = Deno.env.get("SMTP_USER") || "el@magicel.de";
      const feedbackUrl = `https://admin.magicel.de/admin/bookings/event/${evt.id}`;
      await sendMail(
        adminEmail,
        `Feedback-Check: Hat ${customer.name} bewertet?`,
        `<div style="font-family:${FONT};font-size:14px;color:#333;padding:20px;max-width:500px;">
          <h2 style="margin:0 0 16px;">Feedback-Erinnerung</h2>
          <p>Das Event <strong>${evt.title || "Veranstaltung"}</strong> mit <strong>${customer.name}</strong> war vor 30 Tagen.</p>
          <p style="margin:16px 0;">Hat der Kunde bereits eine Bewertung abgegeben?</p>
          <p style="margin:8px 0;"><strong>Wenn nein</strong> → Sende die interne Feedback-Mail über das CRM:</p>
          <p><a href="${feedbackUrl}" style="display:inline-block;background:#0a0a0a;color:#fff;padding:12px 24px;border-radius:12px;text-decoration:none;font-weight:700;font-size:14px;">Event im CRM öffnen</a></p>
          <p style="margin-top:16px;font-size:12px;color:#888;">Im CRM findest du einen "Feedback anfragen" Button beim Event. Dieser sendet dem Kunden eine freundliche Mail mit einem Link zum internen Feedback-Formular im Kundenportal.</p>
        </div>`
      );

      results.push(`Feedback-Check Todo: ${customer.name} (Event ${evt.id})`);
    }

    // ── Admin-Benachrichtigung ──
    if (results.length > 0) {
      const adminEmail = Deno.env.get("SMTP_USER") || "el@magicel.de";
      await sendMail(
        adminEmail,
        `[CRM] ${results.length} automatische Mail(s) gesendet`,
        `<div style="font-family:${FONT};font-size:14px;color:#333;padding:20px;">
          <h2>Tägliche Automationen – ${todayStr}</h2>
          <ul>${results.map(r => `<li>${r}</li>`).join("")}</ul>
        </div>`
      );
    }

    return new Response(JSON.stringify({ success: true, sent: results.length, details: results }), {
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
