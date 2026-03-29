import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const body = await req.json();

    const {
      customer_id,
      name,
      firma,
      email,
      phone,
      anlass,
      datum,
      uhrzeit,
      ort,
      gaeste,
      format,
      nachricht,
      source,
    } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "E-Mail fehlt" }), { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let resolvedCustomerId = customer_id || null;

    // Wenn kein customer_id übergeben: Kunde per E-Mail suchen oder neu anlegen
    if (!resolvedCustomerId) {
      let { data: customer } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (!customer) {
        const { data: newCustomer, error } = await supabase
          .from("portal_customers")
          .insert({ name: name || "", firma: firma || null, email, phone: phone || null })
          .select("*")
          .single();

        if (error) throw error;
        customer = newCustomer;
      } else {
        const updateData: any = {};
        if (!customer.name && name) updateData.name = name;
        if (!customer.firma && firma) updateData.firma = firma;
        if (!customer.phone && phone) updateData.phone = phone;
        if (Object.keys(updateData).length > 0) {
          await supabase.from("portal_customers").update(updateData).eq("id", customer.id);
        }
      }

      resolvedCustomerId = customer.id;
    }

    // Anfrage speichern mit customer_id
    const { data: request, error: requestError } = await supabase
      .from("portal_requests")
      .insert({
        customer_id: resolvedCustomerId,
        name,
        firma: firma || null,
        email,
        phone: phone || null,
        anlass: anlass || null,
        datum: datum || null,
        uhrzeit: uhrzeit || null,
        ort: ort || null,
        gaeste: gaeste || null,
        format: format || null,
        nachricht: nachricht || null,
        status: "neu",
        source: source || "manuell",
      })
      .select("*")
      .single();

    if (requestError) throw requestError;

    console.log("Request erstellt:", request.id, "customer_id:", resolvedCustomerId);

    return new Response(JSON.stringify({ success: true, request }), { status: 200 });
  } catch (err) {
    console.error("ERROR:", err);
    return new Response(JSON.stringify({ error: err.message || "Unbekannter Fehler" }), { status: 500 });
  }
});
