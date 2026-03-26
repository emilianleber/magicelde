import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

// ENV
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
    } catch {
      return new Response(
        JSON.stringify({ error: "Ungültiger Body" }),
        { status: 400 }
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

    if (!name || !email) {
      throw new Error("Name und Email fehlen");
    }

    // 🔥 DB speichern
    const { error: insertError } = await supabase
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
      });

    if (insertError) throw insertError;

    // ======================
    // MAIL AN DICH
    // ======================
    try {
      await resend.emails.send({
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
          <p><strong>Nachricht:</strong><br>${
            (nachricht || "-").replace(/\n/g, "<br>")
          }</p>
        `,
      });
    } catch (err) {
      console.error("ADMIN MAIL ERROR:", err);
    }

    // ======================
    // ✨ SCHÖNE MAIL AN KUNDEN
    // ======================
    try {
      await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: email,
        subject: "Deine Anfrage bei Magicel ist eingegangen",
        html: `
        <div style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
            
            <div style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);">
              
              <div style="padding:32px;background:linear-gradient(135deg,#111827,#1f2937);color:#ffffff;">
                <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:0.7;">
                  Magicel
                </p>
                <h1 style="margin:10px 0 0;font-size:26px;">
                  Danke für deine Anfrage, ${name}!
                </h1>
              </div>

              <div style="padding:32px;">
                <p style="font-size:16px;line-height:1.6;color:#374151;">
                  ich habe deine Anfrage erhalten und melde mich innerhalb von 24 Stunden persönlich bei dir.
                </p>

                <div style="margin:25px 0;padding:20px;border-radius:12px;background:#f9fafb;">
                  <p><strong>Anlass:</strong> ${anlass || "-"}</p>
                  <p><strong>Datum:</strong> ${datum || "-"}</p>
                  <p><strong>Ort:</strong> ${ort || "-"}</p>
                </div>

                <p style="font-size:14px;color:#6b7280;">
                  Du kannst deine Anfrage jederzeit im Kundenportal einsehen:
                </p>

                <div style="margin:25px 0;text-align:center;">
                  <a href="https://magicel.de/kundenportal"
                    style="display:inline-block;padding:14px 24px;background:#111827;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:bold;">
                    Kundenportal öffnen
                  </a>
                </div>

                <p style="font-size:14px;color:#6b7280;">
                  Viele Grüße<br>
                  <strong>Emilian Leber</strong>
                </p>
              </div>

            </div>

          </div>
        </div>
        `,
      });
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
