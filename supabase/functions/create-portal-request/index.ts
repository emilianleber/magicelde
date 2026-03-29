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
        subject: "Neue Anfrage über magicel.de",
        html: `
          <h2>Neue Anfrage</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          ${displayFirmaBlock}
          <p><strong>E-Mail:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone || "-"}</p>
          <p><strong>Anlass:</strong> ${safeAnlass || "-"}</p>
          <p><strong>Datum:</strong> ${safeDatum || "-"}</p>
          <p><strong>Ort:</strong> ${safeOrt || "-"}</p>
          <p><strong>Gäste:</strong> ${safeGaeste ?? "-"}</p>
          <p><strong>Format:</strong> ${safeFormat || "-"}</p>
          <p><strong>Nachricht:</strong><br>${(safeNachricht || "-").replace(/\n/g, "<br>")}</p>
        `,
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
        subject: "Deine Anfrage bei Emilian Leber ist eingegangen",
        html: `
          <div style="margin:0;padding:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#111827;">
            <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
              <div style="background:#ffffff;border:1px solid #e7ebf3;border-radius:28px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.05);">
                <div style="padding:34px 32px 18px 32px;background:linear-gradient(180deg,#ffffff 0%,#f7f9fd 100%);border-bottom:1px solid #edf1f7;">
                  <div style="display:inline-block;padding:10px 18px;border-radius:999px;background:#eef2ff;color:#4563d8;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                    Anfrage
                  </div>

                  <h1 style="margin:22px 0 14px 0;font-size:34px;line-height:1.1;font-weight:800;color:#121826;letter-spacing:-1px;">
                    Danke für deine Anfrage, ${displayGreeting}.
                  </h1>

                  <p style="margin:0;font-size:16px;line-height:1.75;color:#667085;max-width:520px;">
                    Deine Anfrage ist erfolgreich bei mir eingegangen. Ich melde mich in der Regel innerhalb von 24 Stunden persönlich bei dir.
                  </p>
                </div>

                <div style="padding:28px 32px 32px 32px;">
                  <div style="margin-bottom:24px;">
                    <div style="background:#f8fafd;border:1px solid #e8edf5;border-radius:20px;padding:18px 18px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                        <tr><td style="padding:8px 0;font-size:15px;color:#667085;width:38%;">Name</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${safeName}</td></tr>
                        ${
                          safeFirma
                            ? `<tr><td style="padding:8px 0;font-size:15px;color:#667085;">Firma</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${safeFirma}</td></tr>`
                            : ""
                        }
                        <tr><td style="padding:8px 0;font-size:15px;color:#667085;">Anlass</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${safeAnlass || "-"}</td></tr>
                        <tr><td style="padding:8px 0;font-size:15px;color:#667085;">Datum</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${safeDatum || "-"}</td></tr>
                        <tr><td style="padding:8px 0;font-size:15px;color:#667085;">Ort</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${safeOrt || "-"}</td></tr>
                        <tr><td style="padding:8px 0;font-size:15px;color:#667085;">Format</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${safeFormat || "-"}</td></tr>
                      </table>
                    </div>
                  </div>

                  <div style="margin:0 0 24px;padding:18px;border-radius:14px;background:#f8fbff;border:1px solid #dfe8f4;">
                    <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#111827;">
                      Wichtiger Hinweis zum Login
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#4b5563;">
                      Bitte logge dich im Kundenportal mit genau der E-Mail-Adresse ein, mit der du die Anfrage gestellt hast:
                      <br>
                      <strong style="color:#111827;">${safeEmail}</strong>
                    </p>
                  </div>

                  <div style="margin:30px 0;text-align:center;">
                    <a
                      href="https://magicel.de/kundenportal/login"
                      style="display:inline-block;padding:14px 26px;background:#111827;color:#ffffff;text-decoration:none;border-radius:14px;font-size:15px;font-weight:700;"
                    >
                      Kundenportal öffnen
                    </a>
                  </div>

                  <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#6b7280;">
                    Viele Grüße<br>
                    <strong style="color:#111827;">Emilian Leber</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        `,
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
