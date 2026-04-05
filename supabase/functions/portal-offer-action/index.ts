import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// ─── Supabase clients ────────────────────────────────────────────────────────
// Admin client (service role) for all DB operations
const adminSupabase = createClient(
  Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Anon client for verifying customer JWTs
const anonSupabase = createClient(
  Deno.env.get("PROJECT_URL") || Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("ANON_KEY") || Deno.env.get("SUPABASE_ANON_KEY")!
);

// ─── SMTP ─────────────────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
    port: Number(Deno.env.get("SMTP_PORT") || "465"),
    secure: true,
    auth: {
      user: Deno.env.get("SMTP_USER") || "el@magicel.de",
      pass: Deno.env.get("SMTP_PASS"),
    },
  });

const SMTP_FROM = `"Emilian Leber" <${Deno.env.get("SMTP_USER") || "el@magicel.de"}>`;
const ADMIN_EMAIL = Deno.env.get("SMTP_USER") || "el@magicel.de";
const PORTAL_URL = Deno.env.get("PORTAL_URL") || "https://www.magicel.de/portal";

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = createTransporter();
  await transporter.sendMail({ from: SMTP_FROM, to, subject, html });
};

// ─── Email Shell (mirrors admin-send-status-mail pattern) ────────────────────
const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif`;

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
                <a href="${PORTAL_URL}"
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

const statusBadge = (text: string, color = "#0a0a0a", bg = "#f4f4f5") => `
<div style="display:inline-block;background-color:${bg};color:${color};font-size:12px;font-weight:700;padding:6px 14px;border-radius:999px;margin-bottom:20px;font-family:${FONT};">
  ${text}
</div>`;

// ─── Helper: format date for German locale ────────────────────────────────────
const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }) : "–";

// ─── Main handler ─────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    // ── Auth: verify customer JWT ──────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Nicht autorisiert" }, 401);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await anonSupabase.auth.getUser(token);
    if (authError || !user?.id) return json({ error: "Ungültige Session" }, 401);

    // Look up portal_customer by user_id
    const { data: customer, error: custError } = await adminSupabase
      .from("portal_customers")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (custError || !customer) return json({ error: "Kunde nicht gefunden" }, 403);

    // ── Parse body ─────────────────────────────────────────────────────────────
    const body = await req.json();
    const { action, request_id } = body;

    if (!action || !["accept", "reject"].includes(action)) {
      return json({ error: "action muss 'accept' oder 'reject' sein" }, 400);
    }
    if (!request_id) return json({ error: "request_id fehlt" }, 400);

    // ── Find the Angebot ───────────────────────────────────────────────────────
    const { data: angebot, error: angebotError } = await adminSupabase
      .from("portal_documents")
      .select("*")
      .eq("request_id", request_id)
      .eq("type", "Angebot")
      .in("status", ["entwurf", "gesendet"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (angebotError || !angebot) {
      return json({ error: "Kein offenes Angebot gefunden" }, 404);
    }

    // ── Find the request (verify ownership) ───────────────────────────────────
    const { data: request, error: requestError } = await adminSupabase
      .from("portal_requests")
      .select("*")
      .eq("id", request_id)
      .eq("customer_id", customer.id)
      .maybeSingle();

    if (requestError || !request) {
      return json({ error: "Anfrage nicht gefunden" }, 404);
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  ACCEPT
    // ══════════════════════════════════════════════════════════════════════════
    if (action === "accept") {
      // 3. Mark Angebot as akzeptiert
      await adminSupabase
        .from("portal_documents")
        .update({ status: "akzeptiert" })
        .eq("id", angebot.id);

      // 4. Generate Auftragsbestätigung number
      const { data: settings } = await adminSupabase
        .from("admin_settings")
        .select("nk_ab_prefix, nk_ab_naechste")
        .maybeSingle();

      const prefix = settings?.nk_ab_prefix || "AB";
      const naechste = settings?.nk_ab_naechste ?? 1;
      const year = new Date().getFullYear();
      const padded = String(naechste).padStart(3, "0");
      const nummer = `${prefix}-${year}-${padded}`;

      // Increment the counter
      await adminSupabase
        .from("admin_settings")
        .update({ nk_ab_naechste: naechste + 1 });

      // 5. Create portal_event
      const { data: newEvent, error: eventError } = await adminSupabase
        .from("portal_events")
        .insert({
          customer_id: customer.id,
          request_id: request_id,
          title: request.anlass || "Event",
          event_date: request.datum,
          location: request.ort,
          format: request.format,
          guests: request.gaeste,
          status: "in_planung",
        })
        .select("*")
        .single();

      if (eventError || !newEvent) {
        console.error("Event creation error:", eventError);
        return json({ error: "Event konnte nicht erstellt werden" }, 500);
      }

      // 6. Update portal_requests
      await adminSupabase
        .from("portal_requests")
        .update({ status: "gebucht", event_id: newEvent.id })
        .eq("id", request_id);

      // 7. Create Auftragsbestätigung document — mit passenden Textvorlagen
      const { data: vorlagen } = await adminSupabase
        .from("dokument_textvorlagen")
        .select("bereich, inhalt")
        .or("typ.eq.auftragsbestaetigung,typ.eq.alle")
        .eq("is_default", true);
      const abKopftext = vorlagen?.find((v: any) => v.bereich === "kopf")?.inhalt || angebot.kopftext;
      const abFusstext = vorlagen?.find((v: any) => v.bereich === "fuss")?.inhalt || angebot.fusstext;

      const today = new Date().toISOString().split("T")[0];
      const { data: newAB, error: abError } = await adminSupabase
        .from("portal_documents")
        .insert({
          type: "Auftragsbestätigung",
          document_number: nummer,
          document_date: today,
          status: "entwurf",
          customer_id: customer.id,
          event_id: newEvent.id,
          request_id: request_id,
          quelldokument_id: angebot.id,
          quelldokument_nummer: angebot.document_number,
          empfaenger: angebot.empfaenger,
          absender: angebot.absender,
          kopftext: abKopftext,
          fusstext: abFusstext,
          zahlungsziel_tage: angebot.zahlungsziel_tage,
          rabatt_prozent: angebot.rabatt_prozent,
          subtotal: angebot.subtotal,
          total: angebot.total,
          amount: angebot.amount,
          mwst_gruppen: angebot.mwst_gruppen,
          mwst_betrag: angebot.mwst_betrag,
          tax_amount: angebot.mwst_betrag,
          rabatt_betrag: angebot.rabatt_betrag,
          offener_betrag: angebot.total,
          bezahlt_betrag: 0,
          name: "Auftragsbestätigung " + nummer,
        })
        .select("*")
        .single();

      if (abError || !newAB) {
        console.error("AB creation error:", abError);
        return json({ error: "Auftragsbestätigung konnte nicht erstellt werden" }, 500);
      }

      // 8. Copy positions from Angebot to AB
      const { data: positions } = await adminSupabase
        .from("document_positions")
        .select("*")
        .eq("document_id", angebot.id);

      if (positions && positions.length > 0) {
        const newPositions = positions.map(({ id: _id, ...pos }: any) => ({
          ...pos,
          document_id: newAB.id,
        }));
        await adminSupabase.from("document_positions").insert(newPositions);
      }

      // 9. Update Angebot with follow-up reference
      await adminSupabase
        .from("portal_documents")
        .update({
          folgedokument_id: newAB.id,
          folgedokument_typ: "Auftragsbestätigung",
          event_id: newEvent.id,
        })
        .eq("id", angebot.id);

      // 10. Send customer confirmation email
      const anrede = customer.anrede || "";
      const nachname = customer.name?.split(" ").slice(1).join(" ") || customer.name || "";
      const gruss = anrede ? `${anrede} ${nachname}` : customer.name || "";
      const eventRows = [
        { icon: "🎉", label: "Anlass", value: request.anlass || "–" },
        { icon: "📅", label: "Datum", value: fmtDate(request.datum) },
        { icon: "📍", label: "Ort", value: request.ort || "–" },
        { icon: "🎭", label: "Format", value: request.format || "–" },
        { icon: "👥", label: "Gäste", value: String(request.gaeste ?? "–") },
      ];

      const customerHtml = getEmailShell(
        "Buchung",
        "Ihr Event ist gebucht! 🎉",
        `Hallo ${gruss}, herzlichen Glückwunsch – Ihre Buchung ist jetzt offiziell bestätigt! Ich freue mich sehr darauf, Ihr Event unvergesslich zu machen.`,
        `${statusBadge("✦ Buchung bestätigt", "#15803d", "#f0fdf4")}${infoTable(eventRows)}
        <p style="margin:0;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
          Alle weiteren Details und Ihre Auftragsbestätigung finden Sie in Ihrem <strong style="color:#0a0a0a;">Kundenportal</strong>. Bei Fragen stehe ich Ihnen jederzeit gerne zur Verfügung.
        </p>`,
        true
      );

      await sendMail(
        customer.email,
        "Ihr Event ist gebucht – Emilian Leber",
        customerHtml
      );

      // 11. Send admin notification
      const adminHtml = `<p><strong>${customer.name || customer.email}</strong> hat das Angebot für <strong>${request.anlass || "Anfrage"}</strong> angenommen.</p>
      <p>Auftragsbestätigung <strong>${nummer}</strong> wurde automatisch erstellt.</p>
      <p><a href="https://magicel.de/admin/requests/${request_id}" style="display:inline-block;background:#0a0a0a;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;font-weight:bold;">Anfrage im CRM öffnen →</a></p>`;

      await sendMail(
        ADMIN_EMAIL,
        `✅ Angebot angenommen – ${customer.name || customer.email}`,
        adminHtml
      );

      return json({ success: true, event_id: newEvent.id, ab_number: nummer });
    }

    // ══════════════════════════════════════════════════════════════════════════
    //  REJECT
    // ══════════════════════════════════════════════════════════════════════════
    if (action === "reject") {
      // 3. Mark Angebot as abgelehnt
      await adminSupabase
        .from("portal_documents")
        .update({ status: "abgelehnt" })
        .eq("id", angebot.id);

      // 4. Update request status
      await adminSupabase
        .from("portal_requests")
        .update({ status: "abgelehnt" })
        .eq("id", request_id);

      // 5. Send customer email
      const anrede2 = customer.anrede || "";
      const nachname2 = customer.name?.split(" ").slice(1).join(" ") || customer.name || "";
      const gruss2 = anrede2 ? `${anrede2} ${nachname2}` : customer.name || "";
      const requestRows = [
        { icon: "🎉", label: "Anlass", value: request.anlass || "–" },
        { icon: "📅", label: "Datum", value: fmtDate(request.datum) },
        { icon: "📍", label: "Ort", value: request.ort || "–" },
      ];

      const customerHtml = getEmailShell(
        "Anfrage",
        "Update zu Ihrer Anfrage.",
        `Hallo ${gruss2}, ich habe Ihre Rückmeldung zu meinem Angebot erhalten. Schade, dass es diesmal nicht geklappt hat – aber ich hoffe, wir finden in Zukunft den richtigen Rahmen für Ihre Veranstaltung.`,
        `${infoTable(requestRows)}
        <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
          Falls Sie neue Pläne haben oder sich etwas geändert hat, können Sie jederzeit eine neue Anfrage stellen. Ich freue mich, von Ihnen zu hören.
        </p>`,
        false
      );

      await sendMail(
        customer.email,
        "Update zu Ihrer Anfrage – Emilian Leber",
        customerHtml
      );

      // 6. Send admin notification
      const adminHtml = `<p><strong>${customer.name || customer.email}</strong> hat das Angebot für <strong>${request.anlass || "Anfrage"}</strong> abgelehnt.</p>
      <p><a href="https://magicel.de/admin/requests/${request_id}" style="display:inline-block;background:#0a0a0a;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;font-weight:bold;">Anfrage im CRM öffnen →</a></p>`;

      await sendMail(
        ADMIN_EMAIL,
        `❌ Angebot abgelehnt – ${customer.name || customer.email}`,
        adminHtml
      );

      return json({ success: true });
    }

    return json({ error: "Ungültige Aktion" }, 400);

  } catch (err: any) {
    console.error("PORTAL OFFER ACTION ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Server Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
