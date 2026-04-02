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

const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;
const LOGO = `https://www.magicel.de/logo-clean.webp`;

// ─── Shared Email Shell (table-based, bgcolor for dark-mode immunity) ─────────
const getEmailShell = (
  badge: string,
  title: string,
  intro: string,
  content: string,
  showPortalButton = true
) => `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${title}</title>
  <style>
    :root { color-scheme: light !important; supported-color-schemes: light !important; }
    html, body { background-color: #ffffff !important; margin: 0 !important; padding: 0 !important; }
    @media (prefers-color-scheme: dark) {
      html, body { background-color: #ffffff !important; }
      .ew { background-color: #ffffff !important; }
      .ec { background-color: #ffffff !important; color: #0a0a0a !important; }
      .ef { background-color: #f4f4f5 !important; }
      h1 { color: #0a0a0a !important; }
    }
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff;font-family:${FONT};">

  <!-- outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff;" class="ew">
    <tr>
      <td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff;">

        <!-- card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">

          <!-- HEADER -->
          <tr>
            <td bgcolor="#0a0a0a" style="background-color:#0a0a0a;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="vertical-align:middle;">
                    <p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;font-family:${FONT};">Emilian Leber</p>
                  </td>
                  <td style="vertical-align:middle;text-align:right;">
                    <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:${FONT};">Zauberer &amp; Showkünstler</span>
                  </td>
                </tr>
              </table>
              <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff;" class="ec">

              <!-- badge -->
              <div style="display:inline-block;background-color:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;font-family:${FONT};">${badge}</div>

              <!-- title -->
              <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;letter-spacing:-0.5px;font-family:${FONT};">${title}</h1>

              <!-- intro -->
              <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#52525b;font-family:${FONT};">${intro}</p>

              <!-- dynamic -->
              ${content}

              ${showPortalButton ? `
              <div style="text-align:center;margin:28px 0 24px;">
                <a href="https://magicel.de/kundenportal/login"
                   style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:15px 34px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.3px;font-family:${FONT};">
                  Kundenportal öffnen &rarr;
                </a>
              </div>` : ""}

              <!-- signature -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e4e4e7;margin-top:8px;">
                <tr><td style="padding-top:22px;">
                  <p style="margin:0 0 2px;font-size:14px;color:#71717a;font-family:${FONT};">Mit magischen Grüßen,</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;font-family:${FONT};">Emilian Leber</p>
                  <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;font-family:${FONT};">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="#f4f4f5" style="background-color:#f4f4f5;padding:16px 36px;text-align:center;border-top:1px solid #e4e4e7;border-radius:0 0 20px 20px;" class="ef">
              <p style="margin:0;font-size:12px;color:#a1a1aa;font-family:${FONT};">
                &copy; 2026 Emilian Leber &middot; Regensburg &middot;
                <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

// ─── Info Table ───────────────────────────────────────────────────────────────
const infoTable = (rows: { icon: string; label: string; value: string }[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
  <tr>
    <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        ${rows.map((r, i) => `
        <tr>
          <td bgcolor="#f9fafb" style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#71717a!important;width:44%;font-family:${FONT};background-color:#f9fafb!important;">
            ${r.icon}&nbsp;${r.label}
          </td>
          <td bgcolor="#f9fafb" style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#0a0a0a!important;font-weight:600;font-family:${FONT};background-color:#f9fafb!important;">
            ${r.value}
          </td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>
</table>`;

// ─── Status Badge ─────────────────────────────────────────────────────────────
const statusBadge = (text: string, color = "#0a0a0a", bg = "#f4f4f5") => `
<div style="display:inline-block;background-color:${bg};color:${color};font-size:12px;font-weight:700;padding:6px 14px;border-radius:999px;margin-bottom:20px;font-family:${FONT};">
  ${text}
</div>`;

// ─── Request Mail Templates ───────────────────────────────────────────────────
const requestMailTemplate = (request: any) => {
  const rows = [
    { icon: "🎉", label: "Anlass", value: request.anlass || "–" },
    { icon: "📅", label: "Datum", value: request.datum || "–" },
    { icon: "📍", label: "Ort", value: request.ort || "–" },
    { icon: "👥", label: "Gäste", value: String(request.gaeste ?? "–") },
  ];

  switch (request.status) {
    case "angebot_gesendet":
      return {
        subject: "Dein Angebot von Emilian Leber ist fertig",
        html: getEmailShell(
          "Anfrage",
          "Dein Angebot ist unterwegs.",
          `Hallo ${request.name}, ich habe alles für deine Anfrage zusammengestellt. Die nächsten Schritte besprechen wir jetzt gemeinsam.`,
          `${statusBadge("✦ Angebot vorbereitet", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        ),
      };

    case "gebucht":
    case "bestätigt":
      return {
        subject: "Dein Event mit Emilian Leber ist gebucht! 🎉",
        html: getEmailShell(
          "Buchung",
          "Dein Event ist gebucht.",
          `Hallo ${request.name}, großartige Neuigkeit – dein Termin ist jetzt offiziell eingeplant. Ich freue mich sehr darauf!`,
          `${statusBadge("✦ Buchung bestätigt", "#15803d", "#f0fdf4")}${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
            Den aktuellen Stand findest du jederzeit im Bereich <strong style="color:#0a0a0a;">Events</strong> in deinem Kundenportal.
          </p>`
        ),
      };

    case "abgelehnt":
      return {
        subject: "Update zu deiner Anfrage – Emilian Leber",
        html: getEmailShell(
          "Anfrage",
          "Update zu deiner Anfrage.",
          `Hallo ${request.name}, ich wollte dir kurz persönlich Rückmeldung zu deiner Anfrage geben.`,
          `${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Leider kann ich deine Anfrage zum aktuellen Zeitpunkt nicht wie gewünscht umsetzen. Vielen Dank für dein Interesse und dein Vertrauen – ich hoffe, wir finden in Zukunft einen passenden Rahmen.
          </p>`,
          false
        ),
      };

    default:
      return null;
  }
};

// ─── Event Mail Templates ─────────────────────────────────────────────────────
const eventMailTemplate = (event: any, customerName: string, email: string) => {
  const rows = [
    { icon: "✨", label: "Event", value: event.title || "–" },
    { icon: "📅", label: "Datum", value: event.event_date ? new Date(event.event_date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }) : "–" },
    { icon: "📍", label: "Ort", value: event.location || "–" },
    { icon: "👥", label: "Gäste", value: String(event.guests ?? "–") },
    { icon: "🎭", label: "Format", value: event.format || "–" },
  ];

  switch (event.status) {
    case "vertrag_gesendet":
      return {
        to: email,
        subject: "Dein Vertrag steht bereit – Emilian Leber",
        html: getEmailShell(
          "Vertrag",
          "Dein Vertrag ist bereit.",
          `Hallo ${customerName}, der nächste Schritt für dein Event ist vorbereitet. Der Vertrag liegt jetzt in deinem Kundenportal bereit.`,
          `${statusBadge("✦ Vertrag bereitgestellt", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        ),
      };

    case "vertrag_bestaetigt":
      return {
        to: email,
        subject: "Vertrag bestätigt – wir sind startklar!",
        html: getEmailShell(
          "Vertrag",
          "Vertrag bestätigt.",
          `Hallo ${customerName}, der Vertrag wurde bestätigt – wir sind startklar! Ich freue mich schon sehr auf dein Event.`,
          `${statusBadge("✦ Vertrag bestätigt", "#15803d", "#f0fdf4")}${infoTable(rows)}`
        ),
      };

    case "rechnung_gesendet":
      return {
        to: email,
        subject: "Deine Rechnung ist bereit – Emilian Leber",
        html: getEmailShell(
          "Rechnung",
          "Deine Rechnung ist bereit.",
          `Hallo ${customerName}, die Rechnung für dein Event wurde erstellt und steht in deinem Kundenportal zum Download bereit.`,
          `${statusBadge("✦ Rechnung erstellt", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        ),
      };

    case "rechnung_bezahlt":
      return {
        to: email,
        subject: "Zahlung eingegangen – vielen Dank!",
        html: getEmailShell(
          "Zahlung",
          "Zahlung verbucht.",
          `Hallo ${customerName}, vielen Dank – die Zahlung wurde verbucht. Alles ist auf Kurs für dein Event!`,
          `${statusBadge("✦ Zahlung erhalten", "#15803d", "#f0fdf4")}${infoTable(rows)}`
        ),
      };

    case "event_erfolgt": {
      const isWedding = (event.format || "").toLowerCase().includes("hochzeit") ||
        (event.title || "").toLowerCase().includes("hochzeit");
      return {
        to: email,
        subject: "Vielen Dank für ein unvergessliches Event! ✨",
        html: getEmailShell(
          "Danke",
          "Vielen Dank.",
          `Hallo ${customerName}, vielen Dank für das wunderbare Event und dein Vertrauen. Es war mir eine echte Freude!`,
          `${infoTable(rows)}
          <!-- review section -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:22px 24px;">
                <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
                  Falls du einen Moment hast, würde ich mich sehr über eine Bewertung freuen – das hilft anderen bei ihrer Entscheidung. 🙏
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:0 5px 0 0;" width="50%">
                      <a href="https://g.page/r/CfLlgBMpyJ0vEBM/review"
                         style="display:block;text-align:center;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:${FONT};">
                        ⭐ Google Bewertung
                      </a>
                    </td>
                    <td style="padding:0 0 0 5px;" width="50%">
                      <a href="https://www.provenexpert.com/emilian-leber/ep8k/"
                         style="display:block;text-align:center;background-color:#1d4ed8;color:#ffffff;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:${FONT};">
                        ✦ ProvenExpert
                      </a>
                    </td>
                  </tr>
                  ${isWedding ? `<tr>
                    <td colspan="2" style="padding-top:8px;">
                      <a href="https://www.weddyplace.com/rate/69b909ceb84deb835fe797f2"
                         style="display:block;text-align:center;background-color:#be185d;color:#ffffff;text-decoration:none;padding:13px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:${FONT};">
                        💍 Weddyplace Bewertung
                      </a>
                    </td>
                  </tr>` : ""}
                </table>
              </td>
            </tr>
          </table>`,
          false
        ),
      };
    }

    default:
      return null;
  }
};

// ─── New Customer Welcome Mail ────────────────────────────────────────────────
const newCustomerMail = (customer: any) =>
  getEmailShell(
    "Willkommen",
    `Schön, dass du da bist, ${customer.name?.split(" ")[0] || ""}!`,
    "Du wurdest in meinem Kundenportal angelegt. Dort findest du alle Infos zu deinen Anfragen, Events und Dokumenten – jederzeit und überall.",
    `${customer.firma ? `
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:16px;">
      <tr><td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0;font-size:13px;color:#71717a;font-family:${FONT};">Firma</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0a0a0a;font-family:${FONT};">${customer.firma}</p>
      </td></tr>
    </table>` : ""}
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
      <tr><td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0;font-size:13px;color:#71717a;font-family:${FONT};">Deine Login-E-Mail</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0a0a0a;font-family:${FONT};">${customer.email}</p>
      </td></tr>
    </table>`
  );

// ─── Serve ────────────────────────────────────────────────────────────────────
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
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

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

    const body = await req.json();
    const { type, recordId, customerId } = body;

    if (!type) {
      return new Response(JSON.stringify({ error: "type fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type !== "new_customer" && !recordId) {
      return new Response(JSON.stringify({ error: "recordId fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type === "new_customer" && !customerId) {
      return new Response(JSON.stringify({ error: "customerId fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── new_customer ──
    if (type === "new_customer") {
      const { data: customer, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("id", customerId)
        .single();

      if (customerError || !customer) {
        return new Response(JSON.stringify({ error: "Kunde nicht gefunden" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!customer.email) {
        return new Response(JSON.stringify({ error: "Kunde hat keine E-Mail" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await resend.emails.send({
        from: "Emilian Leber <el@magicel.de>",
        to: customer.email,
        subject: `Willkommen im Kundenportal, ${customer.name?.split(" ")[0] || customer.name || ""}!`,
        html: newCustomerMail(customer),
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── request ──
    if (type === "request") {
      const { data: request, error } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("id", recordId)
        .single();

      if (error || !request) throw new Error("Anfrage nicht gefunden.");

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

    // ── event ──
    if (type === "event") {
      const { data: event, error } = await supabase
        .from("portal_events")
        .select("*")
        .eq("id", recordId)
        .single();

      if (error || !event) throw new Error("Event nicht gefunden.");
      if (!event.customer_id) throw new Error("Event hat keinen Kunden.");

      const { data: customer, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("id", event.customer_id)
        .single();

      if (customerError || !customer?.email) throw new Error("Kunde oder Kundenmail nicht gefunden.");

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
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
