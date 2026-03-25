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
    let body: any = {};

    try {
      body = await req.json();
    } catch (err) {
      console.log("NO BODY RECEIVED", err);
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

    // Anfrage speichern
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

    // Mail senden
    const mailResult = await resend.emails.send({
      from: "Emilian Leber <el@magicel.de>",
      to: email,
      subject: "Deine Anfrage bei Magicel",
      html: `
        <h2>Danke für deine Anfrage!</h2>
        <p>Wir haben deine Anfrage erhalten.</p>
        <p>👉 Kundenportal:</p>
        <a href="https://magicel.de/kundenportal">Zum Portal</a>
      `,
    });

    console.log("MAIL RESULT:", mailResult);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err: any) {
    console.error("FUNCTION ERROR:", err);

    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
