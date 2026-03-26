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
      email,
      phone,
      anlass,
      datum,
      ort,
      gaeste,
      format,
    });

    if (!name || !email) {
      throw new Error("Name und Email fehlen");
    }

    const { data: insertData, error: insertError } = await supabase
      .from("portal_requests")
      .insert({
        user_id: null,
        customer_id: null,
        name,
        email,
        phone,
        anlass,
        datum,
        ort,
        gaeste,
        format,
        nachricht,
        status: "neu",
      })
      .select();

    if (insertError) {
      console.error("DB INSERT ERROR:", insertError);
      throw insertError;
    }

    console.log("DB INSERT OK:", insertData);

    try {
      const adminMail = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: "el@magicel.de",
        subject: "Neue Anfrage über magicel.de",
        html: `
          <h2>Neue Anfrage</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || "-"}</p>
          <p><strong>Anlass:</strong> ${anlass || "-"}</p>
          <p><strong>Datum:</strong> ${datum || "-"}</p>
          <p><strong>Ort:</strong> ${ort || "-"}</p>
          <p><strong>Gäste:</strong> ${gaeste ?? "-"}</p>
          <p><strong>Format:</strong> ${format || "-"}</p>
          <p><strong>Nachricht:</strong><br>${(nachricht || "-").replace(/\n/g, "<br>")}</p>
        `,
      });

      console.log("ADMIN MAIL OK:", adminMail);
    } catch (err) {
      console.error("ADMIN MAIL ERROR:", err);
    }

    try {
      const customerMail = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: email,
        subject: "Deine Anfrage bei Emilian Leber ist eingegangen",
        html: `
          <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;color:#111827;">
            <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
              <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                <div style="padding:32px 32px 28px;background:#0d6efd;color:#ffffff;">
                  <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.9;">
                    Magicel
                  </p>
                  <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;">
                    Danke für deine Anfrage, ${name}!
                  </h1>
                </div>

                <div style="padding:32px;">
                  <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#374151;">
                    deine Anfrage ist erfolgreich bei mir eingegangen. Ich sehe sie mir persönlich an und melde mich so schnell wie möglich bei dir zurück.
                  </p>

                  <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#374151;">
                    Zusätzlich hast du Zugriff auf dein Kundenportal. Dort kannst du alle wichtigen Informationen rund um deine Anfrage gesammelt an einem Ort einsehen.
                  </p>

                  <div style="margin:0 0 24px;padding:20px;border-radius:14px;background:#f8fbff;border:1px solid #dbeafe;">
                    <p style="margin:0 0 12px;font-size:15px;font-weight:bold;color:#0d6efd;">
                      Deine Anfrage im Überblick
                    </p>
                    <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Anlass:</strong> ${anlass || "-"}</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Datum:</strong> ${datum || "-"}</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#374151;"><strong>Ort:</strong> ${ort || "-"}</p>
                    <p style="margin:0;font-size:14px;color:#374151;"><strong>Format:</strong> ${format || "-"}</p>
                  </div>

                  <div style="margin:0 0 24px;padding:18px;border-radius:14px;background:#f9fafb;border:1px solid #e5e7eb;">
                    <p style="margin:0 0 10px;font-size:14px;font-weight:bold;color:#111827;">
                      Wichtiger Hinweis zum Login
                    </p>
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#4b5563;">
                      Bitte logge dich im Kundenportal mit genau der E-Mail-Adresse ein, mit der du diese Anfrage gestellt hast. Nur so kann deine Anfrage korrekt deinem Zugang zugeordnet werden.
                    </p>
                  </div>

                  <div style="margin:30px 0;text-align:center;">
                    <a href="https://magicel.de/kundenportal"
                      style="display:inline-block;padding:14px 26px;background:#0d6efd;color:#ffffff;text-decoration:none;border-radius:12px;font-size:15px;font-weight:bold;">
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
