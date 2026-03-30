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

// ─── Shared Email Shell ───────────────────────────────────────────────────────
const getEmailShell = (
  badge: string,
  title: string,
  intro: string,
  content: string,
  showPortalButton = true
) => `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 16px;">

    <!-- Card -->
    <div style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

      <!-- ── Header ── -->
      <div style="background:#0a0a0a;padding:36px 40px 30px;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#71717a;font-weight:500;">Zauberer &amp; Showkünstler</p>
        <p style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Emilian Leber</p>
        <div style="margin-top:18px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
      </div>

      <!-- ── Content ── -->
      <div style="padding:40px 40px 36px;">

        <!-- Badge -->
        <div style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">${badge}</div>

        <!-- Title -->
        <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;letter-spacing:-0.5px;">${title}</h1>

        <!-- Intro -->
        <p style="margin:0 0 32px;font-size:16px;line-height:1.75;color:#52525b;">${intro}</p>

        <!-- Dynamic content -->
        ${content}

        ${showPortalButton ? `
        <!-- CTA -->
        <div style="text-align:center;margin:32px 0 28px;">
          <a href="https://magicel.de/kundenportal/login"
             style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.3px;">
            Kundenportal öffnen &rarr;
          </a>
        </div>` : ""}

        <!-- Signature -->
        <div style="border-top:1px solid #e4e4e7;padding-top:24px;margin-top:8px;">
          <p style="margin:0 0 2px;font-size:14px;color:#71717a;">Mit freundlichen Grüßen,</p>
          <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;">Emilian Leber</p>
          <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa;">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
        </div>
      </div>

      <!-- ── Footer ── -->
      <div style="background:#f4f4f5;border-top:1px solid #e4e4e7;padding:18px 40px;text-align:center;">
        <p style="margin:0;font-size:12px;color:#a1a1aa;">
          &copy; 2025 Emilian Leber &middot; Regensburg, Deutschland &middot;
          <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;

// ─── Info Table ───────────────────────────────────────────────────────────────
const infoTable = (rows: { icon: string; label: string; value: string }[]) => `
<div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:16px;padding:8px 20px;margin-bottom:28px;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
    ${rows.map((r, i) => `
    <tr>
      <td style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#71717a;width:44%;">
        ${r.icon}&nbsp; ${r.label}
      </td>
      <td style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#0a0a0a;font-weight:600;">
        ${r.value}
      </td>
    </tr>`).join("")}
  </table>
</div>`;

// ─── Status Badge ─────────────────────────────────────────────────────────────
const statusBadge = (text: string, color = "#0a0a0a", bg = "#f4f4f5") => `
<div style="display:inline-block;background:${bg};color:${color};font-size:12px;font-weight:700;padding:6px 14px;border-radius:999px;margin-bottom:20px;">
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
          `Hallo ${request.name}, ich habe alles für deine Anfrage zusammengestellt und mich darum gekümmert. Die nächsten Schritte besprechen wir jetzt gemeinsam.`,
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
          <p style="margin:0 0 0;font-size:15px;line-height:1.7;color:#52525b;">
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
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;">
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

    case "event_erfolgt":
      return {
        to: email,
        subject: "Vielen Dank für ein unvergessliches Event! ✨",
        html: getEmailShell(
          "Danke",
          "Vielen Dank.",
          `Hallo ${customerName}, vielen Dank für das wunderbare Event und dein Vertrauen. Es war mir eine echte Freude!`,
          `${infoTable(rows)}
          <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
            <p style="margin:0;font-size:15px;line-height:1.7;color:#92400e;">
              Falls du einen Moment Zeit hast, würde ich mich sehr über eine kurze Bewertung freuen – das hilft anderen, die richtige Entscheidung zu treffen. 🙏
            </p>
          </div>`,
          false
        ),
      };

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
    <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:16px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:14px;color:#71717a;">Firma</p>
      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0a0a0a;">${customer.firma}</p>
    </div>` : ""}
    <div style="background:#f9fafb;border:1px solid #e4e4e7;border-radius:16px;padding:16px 20px;margin-bottom:28px;">
      <p style="margin:0;font-size:14px;color:#71717a;">Deine Login-E-Mail</p>
      <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0a0a0a;">${customer.email}</p>
    </div>`
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
