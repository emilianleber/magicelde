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

const getEmailShell = (title: string, intro: string, content: string) => `
  <div style="margin:0;padding:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#111827;">
    <div style="max-width:640px;margin:0 auto;padding:32px 18px;">
      <div style="background:#ffffff;border:1px solid #e7ebf3;border-radius:28px;overflow:hidden;box-shadow:0 12px 30px rgba(15,23,42,0.05);">
        <div style="padding:34px 32px 18px 32px;background:linear-gradient(180deg,#ffffff 0%,#f7f9fd 100%);border-bottom:1px solid #edf1f7;">
          <div style="display:inline-block;padding:10px 18px;border-radius:999px;background:#eef2ff;color:#4563d8;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
            Kundenportal
          </div>

          <h1 style="margin:22px 0 14px 0;font-size:34px;line-height:1.1;font-weight:800;color:#121826;letter-spacing:-1px;">
            ${title}
          </h1>

          <p style="margin:0;font-size:16px;line-height:1.75;color:#667085;max-width:520px;">
            ${intro}
          </p>
        </div>

        <div style="padding:28px 32px 32px 32px;">
          ${content}

          <div style="margin-top:28px;background:linear-gradient(180deg,#f8fbff 0%,#f2f6fc 100%);border:1px solid #dfe8f4;border-radius:22px;padding:20px;">
            <p style="margin:0 0 14px 0;font-size:15px;line-height:1.75;color:#475467;">
              Alle aktuellen Informationen findest du auch in deinem Kundenportal.
            </p>

            <div style="text-align:center;margin-top:6px;">
              <a
                href="https://magicel.de/kundenportal/login"
                style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:14px;font-size:15px;font-weight:700;"
              >
                Kundenportal öffnen
              </a>
            </div>
          </div>

          <div style="padding-top:18px;border-top:1px solid #edf1f7;margin-top:24px;">
            <p style="margin:0 0 10px 0;font-size:15px;line-height:1.7;color:#475467;">Viele Grüße</p>
            <p style="margin:0;font-size:16px;font-weight:700;color:#121826;">Emilian Leber</p>
            <p style="margin:8px 0 0 0;font-size:13px;line-height:1.6;color:#98a2b3;">
              Magicel · Zauberkunst für besondere Events
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

const requestMailTemplate = (request: any) => {
  const commonInfo = `
    <div style="margin-bottom:24px;">
      <div style="background:#f8fafd;border:1px solid #e8edf5;border-radius:20px;padding:18px 18px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;width:38%;">🎉 Anlass</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${request.anlass || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">📅 Datum</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${request.datum || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">📍 Ort</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${request.ort || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">👥 Gäste</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${request.gaeste ?? "-"}</td></tr>
        </table>
      </div>
    </div>
  `;

  switch (request.status) {
    case "angebot_gesendet":
      return {
        subject: "Dein Angebot von Magicel wurde vorbereitet",
        html: getEmailShell(
          "Dein Angebot ist unterwegs.",
          `Hallo ${request.name}, ich habe dein Angebot vorbereitet bzw. für deine Anfrage alles zusammengestellt.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Ich habe deine Anfrage weiter bearbeitet. Die nächsten Schritte besprechen wir jetzt gemeinsam.
            </p>
            ${commonInfo}
          `
        ),
      };

    case "gebucht":
    case "bestätigt":
      return {
        subject: "Dein Event mit Magicel ist gebucht",
        html: getEmailShell(
          "Dein Event ist gebucht.",
          `Hallo ${request.name}, dein Termin wurde jetzt als Event übernommen und eingeplant.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Ab sofort findest du den aktuellen Stand zusätzlich im Bereich <strong style="color:#121826;">Events</strong> in deinem Kundenportal.
            </p>
            ${commonInfo}
          `
        ),
      };

    case "abgelehnt":
      return {
        subject: "Update zu deiner Anfrage bei Magicel",
        html: getEmailShell(
          "Update zu deiner Anfrage.",
          `Hallo ${request.name}, ich wollte dir kurz Rückmeldung zu deiner Anfrage geben.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Leider kann ich deine Anfrage aktuell nicht wie gewünscht umsetzen. Vielen Dank aber für dein Interesse und deine Anfrage.
            </p>
            ${commonInfo}
          `
        ),
      };

    default:
      return null;
  }
};

const eventMailTemplate = (event: any, customerName: string, email: string) => {
  const commonInfo = `
    <div style="margin-bottom:24px;">
      <div style="background:#f8fafd;border:1px solid #e8edf5;border-radius:20px;padding:18px 18px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;width:38%;">✨ Event</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${event.title || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">📅 Datum</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${event.event_date || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">📍 Ort</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${event.location || "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">👥 Gäste</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${event.guests ?? "-"}</td></tr>
          <tr><td style="padding:8px 0;font-size:15px;color:#667085;">🎭 Format</td><td style="padding:8px 0;font-size:15px;color:#121826;font-weight:600;">${event.format || "-"}</td></tr>
        </table>
      </div>
    </div>
  `;

  switch (event.status) {
    case "vertrag_gesendet":
      return {
        to: email,
        subject: "Dein Vertrag wurde bereitgestellt",
        html: getEmailShell(
          "Dein Vertrag ist bereit.",
          `Hallo ${customerName}, der nächste Schritt für dein Event wurde vorbereitet.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Der Vertrag wurde für dein Event vorbereitet bzw. bereitgestellt.
            </p>
            ${commonInfo}
          `
        ),
      };

    case "vertrag_bestaetigt":
      return {
        to: email,
        subject: "Dein Vertrag wurde bestätigt",
        html: getEmailShell(
          "Vertrag bestätigt.",
          `Hallo ${customerName}, dein Event entwickelt sich planmäßig weiter.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Der Vertragsstatus wurde bestätigt.
            </p>
            ${commonInfo}
          `
        ),
      };

    case "rechnung_gesendet":
      return {
        to: email,
        subject: "Deine Rechnung wurde vorbereitet",
        html: getEmailShell(
          "Deine Rechnung ist bereit.",
          `Hallo ${customerName}, es gibt ein neues Update zu deinem Event.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Die Rechnung für dein Event wurde erstellt bzw. bereitgestellt.
            </p>
            ${commonInfo}
          `
        ),
      };

    case "rechnung_bezahlt":
      return {
        to: email,
        subject: "Zahlung zu deinem Event wurde verbucht",
        html: getEmailShell(
          "Zahlung verbucht.",
          `Hallo ${customerName}, vielen Dank – die Zahlung wurde bei deinem Event vermerkt.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Der Rechnungsstatus wurde als bezahlt markiert.
            </p>
            ${commonInfo}
          `
        ),
      };

    case "event_erfolgt":
      return {
        to: email,
        subject: "Vielen Dank für dein Event mit Magicel",
        html: getEmailShell(
          "Vielen Dank.",
          `Hallo ${customerName}, vielen Dank für das Event und das Vertrauen.`,
          `
            <p style="margin:0 0 16px 0;font-size:15px;line-height:1.75;color:#475467;">
              Dein Event wurde erfolgreich als durchgeführt markiert.
            </p>
            ${commonInfo}
          `
        ),
      };

    default:
      return null;
  }
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
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

    const { type, recordId } = await req.json();

    if (!type || !recordId) {
      return new Response(JSON.stringify({ error: "type und recordId fehlen" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "request") {
      const { data: request, error } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("id", recordId)
        .single();

      if (error || !request) {
        throw new Error("Anfrage nicht gefunden.");
      }

      const mail = requestMailTemplate(request);

      if (!mail) {
        return new Response(JSON.stringify({ success: true, skipped: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const result = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: request.email,
        subject: mail.subject,
        html: mail.html,
      });

      console.log("REQUEST STATUS MAIL RESULT:", result);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "event") {
      const { data: event, error } = await supabase
        .from("portal_events")
        .select("*")
        .eq("id", recordId)
        .single();

      if (error || !event) {
        throw new Error("Event nicht gefunden.");
      }

      if (!event.customer_id) {
        throw new Error("Event hat keinen Kunden.");
      }

      const { data: customer, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("id", event.customer_id)
        .single();

      if (customerError || !customer?.email) {
        throw new Error("Kunde oder Kundenmail nicht gefunden.");
      }

      const mail = eventMailTemplate(
        event,
        customer.name || customer.email.split("@")[0] || "Kunde",
        customer.email
      );

      if (!mail) {
        return new Response(JSON.stringify({ success: true, skipped: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const result = await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: mail.to,
        subject: mail.subject,
        html: mail.html,
      });

      console.log("EVENT STATUS MAIL RESULT:", result);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Ungültiger type" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("ADMIN SEND STATUS MAIL ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message || "Server Fehler" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
