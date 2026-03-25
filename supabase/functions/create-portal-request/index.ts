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
    // BODY
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

    // DB SPEICHERN (WICHTIGSTER TEIL)
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
    // MAIL AN DICH (SAFE)
    // ======================
    try {
      const adminResult = await resend.emails.send({
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

      console.log("ADMIN MAIL RESULT:", adminResult);
    } catch (mailErr) {
      console.error("ADMIN MAIL ERROR:", mailErr);
    }

    // ======================
    // MAIL AN KUNDEN (SAFE)
    // ======================
    try {
      const customerResult = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: email,
        subject: "Deine Anfrage bei Magicel",
        html: `
          <h2>Danke für deine Anfrage, ${name}!</h2>
          <p>Ich habe deine Anfrage erhalten und melde mich zeitnah bei dir.</p>

          <p><strong>Anlass:</strong> ${anlass || "-"}</p>
          <p><strong>Datum:</strong> ${datum || "-"}</p>
          <p><strong>Ort:</strong> ${ort || "-"}</p>

          <p>
            👉 <a href="https://magicel.de/kundenportal">
            Kundenportal öffnen
            </a>
          </p>

          <p>Viele Grüße<br>Emilian Leber</p>
        `,
      });

      console.log("CUSTOMER MAIL RESULT:", customerResult);
    } catch (mailErr) {
      console.error("CUSTOMER MAIL ERROR:", mailErr);
    }

    // IMMER SUCCESS ZURÜCK
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
