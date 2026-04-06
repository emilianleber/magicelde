import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let body: any;

    try {
      body = await req.json();
      console.log("REQUEST BODY:", JSON.stringify(body));
    } catch (e) {
      console.error("JSON PARSE ERROR:", e);
      return new Response(
        JSON.stringify({ error: "Ungültiger Body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const {
      anrede,
      vorname,
      nachname,
      name,
      firma,
      email,
      phone,
      anlass,
      datum,
      ort,
      gaeste,
      format,
      nachricht,
    } = body;

    console.log("PARSED VALUES:", {
      name,
      firma,
      email,
      phone,
      anlass,
      datum,
      ort,
      gaeste,
      format,
    });

    if (!name || !email) {
      throw new Error("Name und E-Mail fehlen");
    }

    // Hilfsfunktion: ersten Buchstaben jedes Worts großschreiben, Rest lowercase
    const capitalize = (s: string) =>
      s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

    const safeVorname = vorname ? capitalize(String(vorname).trim()) : "";
    const safeNachname = nachname ? capitalize(String(nachname).trim()) : "";
    const safeName = name ? capitalize(String(name).trim()) : `${safeVorname} ${safeNachname}`.trim();
    const safeAnrede = anrede ? String(anrede).trim() : null;
    const safeFirma  = firma  ? String(firma).trim()  : null;   // Firmenname unverändert
    const safeEmail  = String(email).trim().toLowerCase();
    const safePhone  = phone  ? String(phone).trim()  : null;
    const safeAnlass = anlass ? capitalize(String(anlass).trim()) : null;
    const safeDatum  = datum  ? String(datum).trim()  : null;
    // Datum formatieren: "2026-09-26" → "26. September 2026"
    const fmtDatum = safeDatum ? new Date(safeDatum + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) : null;
    const safeOrt    = ort    ? String(ort).trim()    : null;
    // Format-Werte übersetzen
    const formatLabels: Record<string, string> = {
      buehne: "Bühnenshow", buehnenshow: "Bühnenshow", closeup: "Close-Up",
      "close-up": "Close-Up", walking_act: "Walking Act", magic_dinner: "Magic Dinner",
      kombination: "Kombination", beratung: "Beratung",
    };
    const rawFormat = format ? String(format).trim().toLowerCase() : null;
    const safeFormat = rawFormat ? (formatLabels[rawFormat] || capitalize(rawFormat)) : null;
    const safeNachricht = nachricht ? String(nachricht).trim() : null;
    const safeGaeste =
      gaeste !== null && gaeste !== undefined && gaeste !== ""
        ? Number(gaeste)
        : null;

    // 1) Kunde per UPSERT anlegen/aktualisieren (verhindert Duplikate)
    let customerId: string | null = null;

    // Email immer lowercase für konsistente Suche
    const normalizedEmail = safeEmail.toLowerCase();

    const customerPayload: Record<string, any> = {
      name: safeName,
      vorname: safeVorname,
      nachname: safeNachname,
      email: normalizedEmail,
    };
    if (safeAnrede) customerPayload.anrede  = safeAnrede;
    if (safeFirma)  customerPayload.company = safeFirma;
    if (safePhone)  customerPayload.phone   = safePhone;

    // UPSERT: Insert or update on email conflict → atomare Operation, keine Race Condition
    const { data: upsertedCustomer, error: upsertError } = await supabase
      .from("portal_customers")
      .upsert(customerPayload, { onConflict: "email", ignoreDuplicates: false })
      .select("*")
      .maybeSingle();

    if (upsertError) {
      console.error("CUSTOMER UPSERT ERROR:", upsertError);
      // Fallback: Nochmals per Email suchen (z.B. wenn unique index noch fehlt)
      const { data: fallbackCustomers } = await supabase
        .from("portal_customers")
        .select("id")
        .ilike("email", normalizedEmail)
        .limit(1);
      customerId = fallbackCustomers?.[0]?.id || null;
    } else if (upsertedCustomer) {
      customerId = upsertedCustomer.id;
    }

    // 2) Anfrage speichern
    const { data: insertData, error: insertError } = await supabase
      .from("portal_requests")
      .insert({
        user_id: null,
        customer_id: customerId,
        name: safeName,
        vorname: safeVorname,
        nachname: safeNachname,
        anrede: safeAnrede,
        firma: safeFirma,
        email: safeEmail,
        phone: safePhone,
        anlass: safeAnlass,
        datum: safeDatum,
        ort: safeOrt,
        gaeste: safeGaeste,
        format: safeFormat,
        nachricht: safeNachricht,
        status: "neu",
      })
      .select()
      .single();

    if (insertError) {
      console.error("DB INSERT ERROR:", insertError);
      throw insertError;
    }

    console.log("DB INSERT OK:", insertData);

    // Begrüßung: "Herr Mustermann" oder "Max Mustermann"
    const displayGreeting = safeAnrede
      ? `${safeAnrede} ${safeNachname}`
      : safeName || "Hallo";
    const displayFirmaBlock = safeFirma
      ? `<p><strong>Firma:</strong> ${safeFirma}</p>`
      : "";

    // Wiederkehrenden Kunden erkennen
    let returningCustomerHtml = "";
    if (existingCustomer && customerId) {
      const { data: prevEvents } = await supabase
        .from("portal_events")
        .select("id, title, event_date, status")
        .eq("customer_id", customerId)
        .is("deleted_at", null)
        .order("event_date", { ascending: false })
        .limit(5);

      const { data: prevRequests } = await supabase
        .from("portal_requests")
        .select("id")
        .eq("customer_id", customerId)
        .is("deleted_at", null);

      const eventCount = (prevEvents || []).length;
      const requestCount = (prevRequests || []).length;

      if (eventCount > 0 || requestCount > 1) {
        const eventList = (prevEvents || []).map(e =>
          `<li style="padding:4px 0;font-size:13px;color:#0a0a0a;">${e.title || "Event"} – ${e.event_date ? new Date(e.event_date).toLocaleDateString("de-DE") : "–"} (${e.status || "–"})</li>`
        ).join("");

        returningCustomerHtml = `
        <div style="margin-bottom:24px;padding:16px 20px;background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#15803d;">🔄 Wiederkehrender Kunde! (${requestCount} Anfragen, ${eventCount} Events)</p>
          ${eventList ? `<ul style="margin:0;padding:0 0 0 18px;">${eventList}</ul>` : ""}
          <p style="margin:8px 0 0;font-size:12px;color:#16a34a;">
            <a href="https://admin.magicel.de/admin/customers/${customerId}" style="color:#16a34a;text-decoration:underline;">Kundenprofil öffnen</a>
          </p>
        </div>`;
      }
    }

    // 3) Admin-Mail
    try {
      const adminMail = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: "el@magicel.de",
        subject: `🎯 Neue Anfrage von ${safeName}`,
        html: `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light only;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
  <title>Neue Anfrage</title>
  <style>
    :root{color-scheme:light only!important;}
    html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}
    @media(prefers-color-scheme:dark){html,body,.bg-white{background-color:#ffffff!important;color:#0a0a0a!important;}}
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;"><tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff!important;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
  <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
      <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;"><p style="margin:0;font-size:22px;font-weight:800;color:#ffffff!important;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p></td>
      <td bgcolor="#0a0a0a" style="text-align:right;background-color:#0a0a0a!important;"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Kundenportal</span></td>
    </tr></table>
    <div style="margin-top:16px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff!important;">
    ${returningCustomerHtml}
    <div style="display:inline-block;background-color:#eff6ff!important;color:#2563eb!important;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Neue Anfrage</div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;width:40%;background-color:#f9fafb!important;">👤 Name</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeName}</td></tr>
          ${safeFirma ? `<tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">🏢 Firma</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeFirma}</td></tr>` : ""}
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">✉️ E-Mail</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeEmail}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📞 Telefon</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safePhone || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">🎉 Anlass</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeAnlass || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📅 Datum</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${fmtDatum || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📍 Ort</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeOrt || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">👥 Gäste</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeGaeste ?? "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">🎭 Format</td><td bgcolor="#f9fafb" style="padding:12px 0;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeFormat || "–"}</td></tr>
        </table>
      </td>
    </tr></table>
    ${safeNachricht ? `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#71717a!important;">Nachricht</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#0a0a0a!important;">${safeNachricht.replace(/\n/g, "<br>")}</p>
      </td>
    </tr></table>` : ""}
    <div style="text-align:center;margin-top:24px;">
      <a href="https://magicel.de/admin/requests/${insertData.id}" style="display:inline-block;background-color:#0a0a0a!important;color:#ffffff!important;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:14px;font-weight:700;">Anfrage im CRM öffnen &rarr;</a>
    </div>
  </td></tr>
  <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;border-radius:0 0 20px 20px;">
    <p style="margin:0;font-size:12px;color:#a1a1aa!important;">&copy; 2026 Emilian Leber &middot; magicel.de</p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`,
      });

      console.log("ADMIN MAIL OK:", adminMail);
    } catch (err) {
      console.error("ADMIN MAIL ERROR:", err);
    }

    // 4) Kundenmail
    try {
      const customerMail = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: safeEmail,
        subject: "Ihre Anfrage ist eingegangen – Emilian Leber ✨",
        html: `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light only;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
  <title>Anfrage eingegangen</title>
  <style>
    :root{color-scheme:light only!important;}
    html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}
    @media(prefers-color-scheme:dark){html,body{background-color:#ffffff!important;color:#0a0a0a!important;}}
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;"><tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff!important;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
  <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
      <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;"><p style="margin:0;font-size:22px;font-weight:800;color:#ffffff!important;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p></td>
      <td bgcolor="#0a0a0a" style="text-align:right;background-color:#0a0a0a!important;"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Zauberer &amp; Showkünstler</span></td>
    </tr></table>
    <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff!important;">
    <div style="display:inline-block;background-color:#eff6ff!important;color:#2563eb!important;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Anfrage</div>
    <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a!important;line-height:1.2;letter-spacing:-0.5px;">Danke, ${displayGreeting}! ✨</h1>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#52525b!important;">Ihre Anfrage ist erfolgreich bei mir eingegangen. Ich melde mich persönlich – in der Regel innerhalb von 24 Stunden.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          ${safeFirma ? `<tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;width:40%;background-color:#f9fafb!important;">🏢 Firma</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeFirma}</td></tr>` : ""}
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;width:40%;background-color:#f9fafb!important;">🎉 Anlass</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeAnlass || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📅 Datum</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${fmtDatum || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📍 Ort</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeOrt || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">🎭 Format</td><td bgcolor="#f9fafb" style="padding:12px 0;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeFormat || "–"}</td></tr>
        </table>
      </td>
    </tr></table>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#71717a!important;">Kundenportal</p>
        <p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#52525b!important;">Verfolgen Sie Ihre Anfrage jederzeit im Kundenportal – melden Sie sich mit dieser E-Mail-Adresse an:</p>
        <p style="margin:0;font-size:15px;font-weight:700;color:#0a0a0a!important;">${safeEmail}</p>
      </td>
    </tr></table>
    <div style="text-align:center;margin:24px 0 20px;">
      <a href="https://www.magicel.de/kundenportal/login" style="display:inline-block;background-color:#0a0a0a!important;color:#ffffff!important;text-decoration:none;padding:15px 34px;border-radius:14px;font-size:15px;font-weight:700;">Kundenportal öffnen &rarr;</a>
    </div>
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
  </td></tr>
  <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;border-radius:0 0 20px 20px;">
    <p style="margin:0;font-size:12px;color:#a1a1aa!important;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`,
      });

      console.log("CUSTOMER MAIL OK:", customerMail);
    } catch (err) {
      console.error("CUSTOMER MAIL ERROR:", err);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.error("FUNCTION ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message || "Server Fehler" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
