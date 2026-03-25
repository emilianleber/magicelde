import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

// 🔥 ENV
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // 🔥 CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 🔥 BODY SAFE PARSE
    let body: any = {};

    try {
      body = await req.json();
    } catch (err) {
      console.log("BODY ERROR:", err);
    }

    console.log("BODY:", body);

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

    // 🔥 DB INSERT
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

    if (insertError) {
      console.log("DB ERROR:", insertError);
      throw insertError;
    }

    // 🔥 MAIL SENDEN
    const mail = await resend.emails.send({
      from: "Emilian Leber <el@magicel.de>",
      to: "el@magicel.de",
      subject: "Neue Anfrage",
      html: `
        <h2>Neue Anfrage</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong> ${nachricht}</p>
      `,
    });

    console.log("MAIL RESULT:", mail);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.log("ERROR:", err);

    return new Response(
      JSON.stringify({
        error: err.message || "Unbekannter Fehler",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
