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
<html lang="de"><head><meta charset="UTF-8"><title>Neue Anfrage</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 16px;">
    <div style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">
      <div style="background:#0a0a0a;padding:32px 40px 28px;">
        <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#71717a;">Kundenportal</p>
        <p style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">Neue Anfrage eingegangen</p>
        <div style="margin-top:16px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
      </div>
      <div style="padding:36px 40px;">
        <div style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Anfrage</div>
        <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:16px;padding:8px 20px;margin-bottom:24px;">
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
        </div>
        ${safeNachricht ? `<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:16px;padding:18px 20px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#92400e;">Nachricht</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#0a0a0a;">${safeNachricht.replace(/\n/g, "<br>")}</p>
        </div>` : ""}
        <div style="text-align:center;margin-top:28px;">
          <a href="https://magicel.de/admin/customers" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:14px;font-weight:700;">Im CRM öffnen &rarr;</a>
        </div>
      </div>
      <div style="background:#f4f4f5;border-top:1px solid #e4e4e7;padding:16px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#a1a1aa;">&copy; 2025 Emilian Leber &middot; magicel.de</p>
      </div>
    </div>
  </div>
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
<html lang="de"><head><meta charset="UTF-8"><title>Anfrage eingegangen</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 16px;">
    <div style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

      <!-- Header -->
      <div style="background:#0a0a0a;padding:36px 40px 30px;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#71717a;font-weight:500;">Zauberer &amp; Showkünstler</p>
        <p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Emilian Leber</p>
        <div style="margin-top:18px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
      </div>

      <!-- Content -->
      <div style="padding:40px 40px 36px;">
        <div style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Anfrage</div>
        <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;letter-spacing:-0.5px;">Danke, ${displayGreeting}! ✨</h1>
        <p style="margin:0 0 32px;font-size:16px;line-height:1.75;color:#52525b;">Deine Anfrage ist erfolgreich bei mir eingegangen. Ich melde mich persönlich – in der Regel innerhalb von 24 Stunden.</p>

        <!-- Info table -->
        <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:16px;padding:8px 20px;margin-bottom:28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
            ${safeFirma ? `<tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;width:40%;">🏢 Firma</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeFirma}</td></tr>` : ""}
            <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;width:40%;">🎉 Anlass</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeAnlass || "–"}</td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📅 Datum</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeDatum || "–"}</td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a;">📍 Ort</td><td style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a;">${safeOrt || "–"}</td></tr>
            <tr><td style="padding:12px 0;font-size:14px;color:#71717a;">🎭 Format</td><td style="padding:12px 0;font-size:14px;font-weight:600;color:#0a0a0a;">${safeFormat || "–"}</td></tr>
          </table>
        </div>

        <!-- Login hint -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:16px;padding:18px 20px;margin-bottom:28px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1d4ed8;">Kundenportal</p>
          <p style="margin:0 0 8px;font-size:14px;line-height:1.7;color:#1e40af;">Verfolge deine Anfrage jederzeit im Kundenportal – melde dich mit dieser E-Mail-Adresse an:</p>
          <p style="margin:0;font-size:15px;font-weight:700;color:#0a0a0a;">${safeEmail}</p>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin:32px 0 28px;">
          <a href="https://magicel.de/kundenportal/login" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.3px;">Kundenportal öffnen &rarr;</a>
        </div>

        <!-- Signature -->
        <div style="border-top:1px solid #e4e4e7;padding-top:24px;margin-top:8px;">
          <p style="margin:0 0 2px;font-size:14px;color:#71717a;">Mit magischen Grüßen,</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;">Emilian Leber</p>
          <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f4f4f5;border-top:1px solid #e4e4e7;padding:18px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#a1a1aa;">&copy; 2025 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
      </div>
    </div>
  </div>
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
