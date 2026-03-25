import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

// 🔥 ENV korrekt verwenden
const supabase = createClient(
  Deno.env.get("PROJECT_URL")!, // bleibt so!
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
    const body = await req.json();

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

    // 🔥 1. Anfrage speichern
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

    // 🔥 2. MAIL SENDEN (DEBUG!)
    const result = await resend.emails.send({
      from: "Emilian Leber <el@magicel.de>",
      to: "leberemilian@gmail.com", // 🔥 erstmal TEST auf deine Mail
      subject: "TEST – Anfrage Magicel",
      html: `
        <h2>Test erfolgreich 🎉</h2>
        <p>Wenn du das siehst, funktioniert dein Mail-System.</p>
      `,
    });

    console.log("MAIL RESULT:", result);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (err: any) {
    console.log("ERROR:", err);

    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
