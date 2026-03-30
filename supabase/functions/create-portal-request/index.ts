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

    const safeName = String(name).trim();
    const safeFirma = firma ? String(firma).trim() : null;
    const safeEmail = String(email).trim().toLowerCase();
    const safePhone = phone ? String(phone).trim() : null;
    const safeAnlass = anlass ? String(anlass).trim() : null;
    const safeDatum = datum ? String(datum).trim() : null;
    const safeOrt = ort ? String(ort).trim() : null;
    const safeFormat = format ? String(format).trim() : null;
    const safeNachricht = nachricht ? String(nachricht).trim() : null;
    const safeGaeste =
      gaeste !== null && gaeste !== undefined && gaeste !== ""
        ? Number(gaeste)
        : null;

    // 1) Kunde suchen
    let customerId: string | null = null;

    const { data: existingCustomer, error: existingCustomerError } = await supabase
      .from("portal_customers")
      .select("*")
      .eq("email", safeEmail)
      .maybeSingle();

    if (existingCustomerError) {
      console.error("CUSTOMER LOOKUP ERROR:", existingCustomerError);
      throw existingCustomerError;
    }

    if (existingCustomer) {
      customerId = existingCustomer.id;

      const updateData: Record<string, any> = {};

      if ((!existingCustomer.name || existingCustomer.name.trim() === "") && safeName) {
        updateData.name = safeName;
      }

      if (
        (!existingCustomer.firma || existingCustomer.firma.trim() === "") &&
        safeFirma
      ) {
        updateData.firma = safeFirma;
      }

      if (
        (!existingCustomer.phone || String(existingCustomer.phone).trim() === "") &&
        safePhone
      ) {
        updateData.phone = safePhone;
      }

      if (Object.keys(updateData).length > 0) {
        const { error: updateCustomerError } = await supabase
          .from("portal_customers")
          .update(updateData)
          .eq("id", existingCustomer.id);

        if (updateCustomerError) {
          console.error("CUSTOMER UPDATE ERROR:", updateCustomerError);
          throw updateCustomerError;
        }
      }
    } else {
      const { data: createdCustomer, error: createCustomerError } = await supabase
        .from("portal_customers")
        .insert({
          name: safeName,
          firma: safeFirma,
          email: safeEmail,
          phone: safePhone,
        })
        .select("*")
        .single();

      if (createCustomerError) {
        console.error("CUSTOMER CREATE ERROR:", createCustomerError);
        throw createCustomerError;
      }

      customerId = createdCustomer.id;
    }

    // 2) Anfrage speichern
    const { data: insertData, error: insertError } = await supabase
      .from("portal_requests")
      .insert({
        user_id: null,
        customer_id: customerId,
        name: safeName,
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

    const displayGreeting = safeName || "Hallo";
    const displayFirmaBlock = safeFirma
      ? `<p><strong>Firma:</strong> ${safeFirma}</p>`
      : "";

    // 3) Admin-Mail
    try {
      const adminMail = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: "el@magicel.de",
        subject: `🎯 Neue Anfrage von ${safeName}`,
        html: `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
  <title>Neue Anfrage</title>
  <style>:root{color-scheme:light!important;}html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}</style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff;"><tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
  <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
      <td><img src="https://www.magicel.de/logo-clean.webp" alt="Emilian Leber" width="110" height="40" style="display:block;height:40px;width:auto;max-width:110px;object-fit:contain;" /></td>
      <td style="text-align:right;"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Kundenportal</span></td>
    </tr></table>
    <div style="margin-top:16px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff;">
    <div style="display:inline-block;background-color:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Neue Anfrage</div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;width:40%;">👤 Name</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeName}</td></tr>
          ${safeFirma ? `<tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">🏢 Firma</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeFirma}</td></tr>` : ""}
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">✉️ E-Mail</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeEmail}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📞 Telefon</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safePhone || "–"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">🎉 Anlass</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeAnlass || "–"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📅 Datum</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeDatum || "–"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📍 Ort</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeOrt || "–"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">👥 Gäste</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeGaeste ?? "–"}</td></tr>
          <tr><td style="padding:12px 0;font-size:14px;color:#71717a;">🎭 Format</td><td style="padding:12px 0;font-size:14px;font-weight:600;color:#0a0a0a;">${safeFormat || "–"}</td></tr>
        </table>
      </td>
    </tr></table>
    ${safeNachricht ? `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#71717a;">Nachricht</p>
        <p style="margin:0;font-size:14px;line-height:1.7;color:#0a0a0a;">${safeNachricht.replace(/\n/g, "<br>")}</p>
      </td>
    </tr></table>` : ""}
    <div style="text-align:center;margin-top:24px;">
      <a href="https://magicel.de/admin/customers" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:14px;font-weight:700;">Im CRM öffnen &rarr;</a>
    </div>
  </td></tr>
  <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;border-radius:0 0 20px 20px;">
    <p style="margin:0;font-size:12px;color:#a1a1aa;">&copy; 2026 Emilian Leber &middot; magicel.de</p>
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
        subject: "Deine Anfrage ist eingegangen – ich melde mich bald! ✨",
        html: `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
  <title>Anfrage eingegangen</title>
  <style>:root{color-scheme:light!important;}html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}</style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff;"><tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
  <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
      <td><img src="https://www.magicel.de/logo-clean.webp" alt="Emilian Leber" width="110" height="40" style="display:block;height:40px;width:auto;max-width:110px;object-fit:contain;" /></td>
      <td style="text-align:right;"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Zauberer &amp; Showkünstler</span></td>
    </tr></table>
    <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff;">
    <div style="display:inline-block;background-color:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Anfrage</div>
    <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;letter-spacing:-0.5px;">Danke, ${displayGreeting}! ✨</h1>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#52525b;">Deine Anfrage ist erfolgreich bei mir eingegangen. Ich melde mich persönlich – in der Regel innerhalb von 24 Stunden.</p>
    <!-- info table -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          ${safeFirma ? `<tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;width:40%;">🏢 Firma</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeFirma}</td></tr>` : ""}
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;width:40%;">🎉 Anlass</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeAnlass || "–"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📅 Datum</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeDatum || "–"}</td></tr>
          <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📍 Ort</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeOrt || "–"}</td></tr>
          <tr><td style="padding:12px 0;font-size:14px;color:#71717a;">🎭 Format</td><td style="padding:12px 0;font-size:14px;font-weight:600;color:#0a0a0a;">${safeFormat || "–"}</td></tr>
        </table>
      </td>
    </tr></table>
    <!-- portal hint -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#71717a;">Kundenportal</p>
        <p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#52525b;">Verfolge deine Anfrage jederzeit im Kundenportal – melde dich mit dieser E-Mail-Adresse an:</p>
        <p style="margin:0;font-size:15px;font-weight:700;color:#0a0a0a;">${safeEmail}</p>
      </td>
    </tr></table>
    <div style="text-align:center;margin:24px 0 20px;">
      <a href="https://magicel.de/kundenportal/login" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:15px 34px;border-radius:14px;font-size:15px;font-weight:700;">Kundenportal öffnen &rarr;</a>
    </div>
    <!-- signature -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e4e4e7;"><tr><td style="padding-top:22px;">
      <p style="margin:0 0 2px;font-size:14px;color:#71717a;">Mit magischen Grüßen,</p>
      <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;">Emilian Leber</p>
      <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
    </td></tr></table>
  </td></tr>
  <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;border-radius:0 0 20px 20px;">
    <p style="margin:0;font-size:12px;color:#a1a1aa;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
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
