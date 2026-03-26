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
    // 🔐 Auth prüfen
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Nicht autorisiert" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user?.email) {
      return new Response(JSON.stringify({ error: "Ungültige Session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 👑 Admin prüfen
    const { data: adminEntry } = await supabase
      .from("portal_admins")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    if (!adminEntry) {
      return new Response(JSON.stringify({ error: "Kein Admin-Zugriff" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 📥 Body holen
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
      source,
    } = body;

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name und E-Mail fehlen" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 💾 Anfrage speichern
    const { error: insertError } = await supabase
      .from("portal_requests")
      .insert({
        name,
        email,
        phone: phone || null,
        anlass: anlass || null,
        datum: datum || null,
        ort: ort || null,
        gaeste: gaeste ?? null,
        format: format || null,
        nachricht: nachricht || null,
        source: source || "manuell",
        status: "neu",
      });

    if (insertError) {
      console.error("INSERT ERROR:", insertError);
      throw insertError;
    }

    // ✉️ Kundenmail senden
    try {
      const mailResult = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: email,
        subject: "Deine Anfrage bei Magicel ist eingegangen",
        html: `
        <div style="margin:0;padding:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#111827;">
          <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
            <div style="background:#ffffff;border:1px solid #e7ebf3;border-radius:28px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.05);">
              
              <div style="padding:34px 32px 18px 32px;background:linear-gradient(180deg,#ffffff 0%,#f7f9fd 100%);border-bottom:1px solid #edf1f7;">
                <div style="display:inline-block;padding:10px 18px;border-radius:999px;background:#eef2ff;color:#4563d8;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                  Anfrage
                </div>

                <h1 style="margin:22px 0 14px 0;font-size:36px;font-weight:800;color:#121826;">
                  Danke für deine Anfrage.
                </h1>

                <p style="font-size:16px;color:#667085;">
                  Hallo ${name}, deine Anfrage ist erfolgreich eingegangen.
                </p>
              </div>

              <div style="padding:24px 32px;">
                <table width="100%">
                  <tr><td>Anlass</td><td>${anlass || "-"}</td></tr>
                  <tr><td>Datum</td><td>${datum || "-"}</td></tr>
                  <tr><td>Ort</td><td>${ort || "-"}</td></tr>
                  <tr><td>Gäste</td><td>${gaeste ?? "-"}</td></tr>
                </table>

                <div style="margin-top:24px;text-align:center;">
                  <a href="https://magicel.de/kundenportal/login"
                    style="background:#111827;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;">
                    Kundenportal öffnen
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
        `,
      });

      console.log("MAIL RESULT:", mailResult);
    } catch (mailErr: any) {
      console.error("MAIL ERROR:", mailErr);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("FUNCTION ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message || "Server Fehler" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

