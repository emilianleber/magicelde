import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const body = await req.json();

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
      source,
    } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "E-Mail fehlt" }), {
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1️⃣ Kunde suchen
    let { data: customer } = await supabase
      .from("portal_customers")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    // 2️⃣ Kunde erstellen oder updaten
    if (!customer) {
      const { data: newCustomer, error } = await supabase
        .from("portal_customers")
        .insert({
          name: name || "",
          firma: firma || "",
          email,
          phone: phone || null,
        })
        .select("*")
        .single();

      if (error) throw error;
      customer = newCustomer;
    } else {
      // Update nur wenn Felder fehlen
      const updateData: any = {};

      if (!customer.name && name) updateData.name = name;
      if (!customer.firma && firma) updateData.firma = firma;
      if (!customer.phone && phone) updateData.phone = phone;

      if (Object.keys(updateData).length > 0) {
        await supabase
          .from("portal_customers")
          .update(updateData)
          .eq("id", customer.id);
      }
    }

    // 3️⃣ Anfrage speichern
    const { data: request, error: requestError } = await supabase
      .from("portal_requests")
      .insert({
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
        status: "neu",
      })
      .select("*")
      .single();

    if (requestError) throw requestError;

    // 🔥 DEBUG LOG (wichtig!)
    console.log("Request erstellt:", request.id);

    return new Response(
      JSON.stringify({
        success: true,
        request,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("ERROR:", err);

    return new Response(
      JSON.stringify({
        error: err.message || "Unbekannter Fehler",
      }),
      { status: 500 }
    );
  }
});
