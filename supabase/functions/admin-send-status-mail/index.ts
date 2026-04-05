import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import nodemailer from "npm:nodemailer";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!
);

const createTransporter = () => nodemailer.createTransport({
  host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
  port: Number(Deno.env.get("SMTP_PORT") || "465"),
  secure: true,
  auth: {
    user: Deno.env.get("SMTP_USER") || "el@magicel.de",
    pass: Deno.env.get("SMTP_PASS"),
  },
});

const SMTP_FROM = `"Emilian Leber" <${Deno.env.get("SMTP_USER") || "el@magicel.de"}>`;

const sendMail = async (to: string, subject: string, html: string) => {
  const transporter = createTransporter();
  await transporter.sendMail({ from: SMTP_FROM, to, subject, html });
};

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
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:24px;">
                <tr><td colspan="2" style="padding-bottom:16px;"><div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div></td></tr>
                <tr>
                  <td style="width:64px;vertical-align:top;padding-right:18px;">
                    <img src="https://magicel.de/favicon.ico" alt="EL" width="48" height="48" style="border-radius:12px;display:block;" />
                  </td>
                  <td style="vertical-align:top;">
                    <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;font-family:${FONT};">Emilian Leber</p>
                    <p style="margin:2px 0 0;font-size:10px;font-weight:600;color:#6366f1;font-family:${FONT};text-transform:uppercase;letter-spacing:1px;">Zauberer &amp; Entertainer</p>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                      <tr><td style="padding:2px 0;font-size:11px;color:#71717a;font-family:${FONT};width:14px;">T</td><td style="padding:2px 0 2px 6px;font-size:11px;font-family:${FONT};"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
                      <tr><td style="padding:2px 0;font-size:11px;color:#71717a;font-family:${FONT};">E</td><td style="padding:2px 0 2px 6px;font-size:11px;font-family:${FONT};"><a href="mailto:el@magicel.de" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td></tr>
                      <tr><td style="padding:2px 0;font-size:11px;color:#71717a;font-family:${FONT};">W</td><td style="padding:2px 0 2px 6px;font-size:11px;font-family:${FONT};"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
                    </table>
                    <p style="margin:6px 0 0;font-size:10px;color:#a1a1aa;font-family:${FONT};">Regensburg · Deutschland · <a href="https://wa.me/4915563744696" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a></p>
                  </td>
                </tr>
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
const fmtDatum = (d: string | null) => d ? new Date(d + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) : "–";

const formatLabels: Record<string, string> = {
  buehne: "Bühnenshow", buehnenshow: "Bühnenshow", closeup: "Close-Up",
  "close-up": "Close-Up", walking_act: "Walking Act", magic_dinner: "Magic Dinner",
  kombination: "Kombination", beratung: "Beratung",
};
const fmtFormat = (f: string | null) => f ? (formatLabels[f.toLowerCase()] || f) : "–";

const capitalize = (s: string) => s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

// Begrüßung: "Herr Müller" oder "Max Mustermann"
const getBegruessung = (nameRaw: string, anrede?: string | null, vornameField?: string | null, nachnameField?: string | null) => {
  const name = capitalize(nameRaw);
  const vn = vornameField ? capitalize(vornameField) : name.split(" ")[0];
  const nn = nachnameField ? capitalize(nachnameField) : name.split(" ").slice(1).join(" ") || vn;
  if (anrede) return `${anrede} ${nn}`;
  return `${vn} ${nn}`.trim();
};

// ─── Request Mail Templates ───────────────────────────────────────────────────
const requestMailTemplate = (request: any) => {
  const rows = [
    { icon: "🎉", label: "Anlass", value: request.anlass || "–" },
    { icon: "📅", label: "Datum", value: fmtDatum(request.datum) },
    { icon: "📍", label: "Ort", value: request.ort || "–" },
    { icon: "👥", label: "Gäste", value: String(request.gaeste ?? "–") },
    request.format ? { icon: "🎭", label: "Format", value: fmtFormat(request.format) } : null,
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  const anrede = request.anrede || "";
  const gruss = getBegruessung(request.name, anrede, request.vorname, request.nachname);

  switch (request.status) {
    case "neu":
      return {
        subject: "Ihre Anfrage ist eingegangen – Emilian Leber",
        html: getEmailShell(
          "Anfrage",
          "Vielen Dank für Ihre Anfrage!",
          `Hallo ${gruss}, vielen Dank für Ihre Anfrage! Ich habe sie erhalten und melde mich in Kürze persönlich bei Ihnen.`,
          `${statusBadge("✦ Anfrage eingegangen", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        ),
      };

    case "in_bearbeitung":
      return {
        subject: "Ihre Anfrage wird bearbeitet – Emilian Leber",
        html: getEmailShell(
          "Anfrage",
          "Ich arbeite an Ihrer Anfrage.",
          `Hallo ${gruss}, ich habe mir Ihre Anfrage angeschaut und arbeite gerade an einem passenden Konzept für Sie. Ich melde mich in Kürze mit weiteren Details.`,
          `${statusBadge("✦ In Bearbeitung", "#b45309", "#fffbeb")}${infoTable(rows)}`
        ),
      };

    case "details_besprechen":
      return {
        subject: "Noch ein paar Details zu Ihrer Anfrage – Emilian Leber",
        html: getEmailShell(
          "📩 Details klären",
          "Ich benötige noch ein paar Informationen.",
          `Hallo ${gruss}, vielen Dank für Ihre Anfrage! Um Ihnen ein passendes Angebot erstellen zu können, benötige ich noch einige Details von Ihnen.`,
          `${statusBadge("✦ Details erforderlich", "#7c3aed", "#f5f3ff")}${infoTable(rows)}
          <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Bitte antworten Sie einfach auf diese E-Mail oder schreiben Sie mir über Ihr Kundenportal – ich melde mich dann schnellstmöglich bei Ihnen.
          </p>`
        ),
      };

    case "warte_auf_kunde":
      return {
        subject: "Kurze Rückfrage zu Ihrer Anfrage – Emilian Leber",
        html: getEmailShell(
          "Anfrage",
          "Ich warte auf Ihre Rückmeldung.",
          `Hallo ${gruss}, ich habe Ihnen Informationen zu Ihrer Anfrage geschickt und warte auf Ihre Rückmeldung. Falls Sie Fragen haben, melden Sie sich jederzeit!`,
          `${statusBadge("✦ Rückmeldung ausstehend", "#b45309", "#fffbeb")}${infoTable(rows)}`
        ),
      };

    case "angebot_gesendet":
      return {
        subject: "Ihr Angebot von Emilian Leber liegt bereit ✨",
        html: getEmailShell(
          "Angebot",
          "Ihr individuelles Angebot ist fertig!",
          `Hallo ${gruss}, ich habe mir Ihre Veranstaltung genau angeschaut und ein passendes Angebot für Sie erstellt. Sie finden es ab sofort in Ihrem <strong>Kundenportal</strong> zum Download bereit.`,
          `${statusBadge("✦ Angebot bereit", "#2563eb", "#eff6ff")}${infoTable(rows)}
          <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Schauen Sie sich das Angebot in Ruhe an. Bei Fragen oder Anpassungswünschen bin ich jederzeit für Sie da – per Telefon, E-Mail oder WhatsApp.
          </p>
          <div style="text-align:center;margin:8px 0 16px;">
            <a href="https://magicel.de/kundenportal/login"
               style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.3px;font-family:${FONT};">
              📄 Angebot im Kundenportal ansehen
            </a>
          </div>`,
          false
        ),
      };

    case "gebucht":
      return {
        subject: "Ihre Auftragsbestätigung von Emilian Leber liegt bereit 📄",
        html: getEmailShell(
          "Auftragsbestätigung",
          "Ihre Auftragsbestätigung ist fertig!",
          `Hallo ${gruss}, vielen Dank für Ihre Buchung! Ihre <strong>Auftragsbestätigung</strong> mit allen Details zu Ihrem Event liegt jetzt in Ihrem Kundenportal zum Download bereit.`,
          `${statusBadge("✦ Auftragsbestätigung bereit", "#15803d", "#f0fdf4")}${infoTable(rows)}
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
            Bitte prüfen Sie die Auftragsbestätigung und melden Sie sich bei mir, falls Änderungen gewünscht sind. Im Bereich <strong style="color:#0a0a0a;">Dokumente</strong> in Ihrem Kundenportal finden Sie alle Unterlagen.
          </p>
          <div style="text-align:center;margin:8px 0 16px;">
            <a href="https://magicel.de/kundenportal/login"
               style="display:inline-block;background-color:#15803d;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.3px;font-family:${FONT};">
              📄 Auftragsbestätigung ansehen
            </a>
          </div>`,
          false
        ),
      };

    case "bestätigt":
      return {
        subject: "Ihre Buchung ist bestätigt – Emilian Leber ✅",
        html: getEmailShell(
          "Bestätigung",
          "Buchung bestätigt.",
          `Hallo ${gruss}, Ihre Buchung wurde offiziell bestätigt. Alle Details sind festgehalten und ich freue mich auf Ihr Event!`,
          `${statusBadge("✦ Bestätigt", "#15803d", "#f0fdf4")}${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
            Den aktuellen Stand finden Sie jederzeit in Ihrem Kundenportal.
          </p>`
        ),
      };

    case "abgelehnt":
      return {
        subject: "Update zu Ihrer Anfrage – Emilian Leber",
        html: getEmailShell(
          "Anfrage",
          "Update zu Ihrer Anfrage.",
          `Hallo ${gruss}, ich wollte Ihnen kurz persönlich Rückmeldung zu Ihrer Anfrage geben.`,
          `${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Leider kann ich Ihre Anfrage zum aktuellen Zeitpunkt nicht wie gewünscht umsetzen. Vielen Dank für Ihr Interesse und Ihr Vertrauen – ich hoffe, wir finden in Zukunft einen passenden Rahmen.
          </p>`,
          false
        ),
      };

    case "archiviert":
      return {
        subject: "Ihre Anfrage wurde archiviert – Emilian Leber",
        html: getEmailShell(
          "Archiviert",
          "Anfrage archiviert.",
          `Hallo ${gruss}, Ihre Anfrage wurde archiviert. Falls Sie in Zukunft eine neue Veranstaltung planen, freue ich mich jederzeit von Ihnen zu hören!`,
          `${statusBadge("✦ Archiviert", "#71717a", "#f4f4f5")}${infoTable(rows)}`,
          false
        ),
      };

    case "storniert":
      return {
        subject: "Ihre Stornierung ist bestätigt – Emilian Leber",
        html: getEmailShell(
          "Stornierung",
          "Stornierung bestätigt.",
          `Hallo ${gruss}, Ihre Stornierung wurde bearbeitet und ist jetzt abgeschlossen.`,
          `${statusBadge("✦ Stornierung bestätigt", "#b45309", "#fffbeb")}${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Falls Sie in Zukunft eine neue Anfrage stellen möchten, freue ich mich jederzeit von Ihnen zu hören.
          </p>`,
          false
        ),
      };

    case "zurückgezogen":
      return {
        subject: "Ihre Anfrage wurde zurückgezogen – Emilian Leber",
        html: getEmailShell(
          "Zurückgezogen",
          "Anfrage zurückgezogen.",
          `Hallo ${gruss}, Ihre Anfrage wurde wie gewünscht zurückgezogen. Falls Sie es sich anders überlegen oder eine neue Anfrage stellen möchten, bin ich jederzeit für Sie da.`,
          `${statusBadge("✦ Zurückgezogen", "#71717a", "#f4f4f5")}${infoTable(rows)}`,
          false
        ),
      };

    default:
      return null;
  }
};

// ─── Event Mail Templates ─────────────────────────────────────────────────────
const eventMailTemplate = (event: any, customerName: string, email: string, days?: number, dokumentTyp?: string, customerAnrede?: string, customerVorname?: string, customerNachname?: string) => {
  const gruss = getBegruessung(customerName, customerAnrede, customerVorname, customerNachname);
  const rows = [
    { icon: "✨", label: "Event", value: event.title || "–" },
    { icon: "📅", label: "Datum", value: fmtDatum(event.event_date) },
    { icon: "📍", label: "Ort", value: event.location || "–" },
    { icon: "👥", label: "Gäste", value: String(event.guests ?? "–") },
    { icon: "🎭", label: "Format", value: fmtFormat(event.format) },
  ];

  switch (event.status) {
    case "in_planung":
      return {
        to: email,
        subject: "Ihr Event wird geplant – Emilian Leber",
        html: getEmailShell(
          "Event",
          "Die Planung läuft.",
          `Hallo ${gruss}, Ihr Event ist in Planung! Ich kümmere mich um die Details und melde mich in Kürze bei Ihnen.`,
          `${statusBadge("✦ In Planung", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        ),
      };

    case "details_offen":
      return {
        to: email,
        subject: "Details zu Ihrem Event – Emilian Leber",
        html: getEmailShell(
          "Event",
          "Noch ein paar Details.",
          `Hallo ${gruss}, für Ihr Event müssen noch einige Details geklärt werden. Ich melde mich dazu bei Ihnen – oder Sie können mir jederzeit über das Kundenportal schreiben.`,
          `${statusBadge("✦ Details offen", "#b45309", "#fffbeb")}${infoTable(rows)}`
        ),
      };

    case "vertrag_gesendet":
      return {
        to: email,
        subject: "Ihr Vertrag steht bereit – Emilian Leber",
        html: getEmailShell(
          "Vertrag",
          "Ihr Vertrag ist bereit.",
          `Hallo ${gruss}, der nächste Schritt für Ihr Event ist vorbereitet. Der Vertrag liegt jetzt in Ihrem Kundenportal bereit.`,
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
          `Hallo ${gruss}, der Vertrag wurde bestätigt – wir sind startklar! Ich freue mich schon sehr auf Ihr Event.`,
          `${statusBadge("✦ Vertrag bestätigt", "#15803d", "#f0fdf4")}${infoTable(rows)}`
        ),
      };

    case "rechnung_gesendet":
      if (dokumentTyp === "abschlagsrechnung") {
        return {
          to: email,
          subject: "Ihre Abschlagsrechnung ist bereit – Emilian Leber",
          html: getEmailShell(
            "Abschlagsrechnung",
            "Ihre Abschlagsrechnung ist bereit.",
            `Hallo ${gruss}, ich habe eine Abschlagsrechnung für Ihr Event erstellt. Diese steht in Ihrem Kundenportal zum Download bereit. Bitte überweisen Sie den Teilbetrag innerhalb der angegebenen Frist.`,
            `${statusBadge("✦ Abschlagsrechnung", "#2563eb", "#eff6ff")}${infoTable(rows)}
            <p style="margin:0;font-size:14px;line-height:1.75;color:#71717a;font-family:${FONT};">
              Die Schlussrechnung erhalten Sie nach dem Event.
            </p>`
          ),
        };
      }
      return {
        to: email,
        subject: "Ihre Schlussrechnung ist bereit – Emilian Leber",
        html: getEmailShell(
          "Schlussrechnung",
          "Ihre Schlussrechnung ist bereit.",
          `Hallo ${gruss}, die Schlussrechnung für Ihr Event wurde erstellt und steht in Ihrem Kundenportal zum Download bereit. Bereits gezahlte Abschlagsbeträge wurden verrechnet.`,
          `${statusBadge("✦ Schlussrechnung erstellt", "#2563eb", "#eff6ff")}${infoTable(rows)}`
        ),
      };

    case "rechnung_bezahlt":
      return {
        to: email,
        subject: "Zahlung eingegangen – vielen Dank!",
        html: getEmailShell(
          "Zahlung",
          "Zahlung verbucht.",
          `Hallo ${gruss}, vielen Dank – die Zahlung wurde verbucht. Alles ist auf Kurs für Ihr Event!`,
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
          `Hallo ${gruss}, vielen Dank für das wunderbare Event und Ihr Vertrauen. Es war mir eine echte Freude!`,
          `${infoTable(rows)}
          <!-- review section -->
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:22px 24px;">
                <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#52525b;font-family:${FONT};">
                  Falls Sie einen Moment haben, würde ich mich sehr über eine Bewertung freuen – das hilft anderen bei ihrer Entscheidung. 🙏
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

    case "storniert":
      return {
        to: email,
        subject: "Stornierung Ihres Events bestätigt – Emilian Leber",
        html: getEmailShell(
          "Stornierung",
          "Ihr Event wurde storniert.",
          `Hallo ${gruss}, die Stornierung Ihres Events wurde bestätigt und ist jetzt abgeschlossen.`,
          `${statusBadge("✦ Event storniert", "#b45309", "#fffbeb")}${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Falls Sie in Zukunft wieder eine Veranstaltung planen möchtest, freue ich mich jederzeit von Ihnen zu hören.
          </p>`,
          false
        ),
      };

    case "rechnung_faellig": {
      const daysText = days === 1 ? "morgen" : `in ${days ?? "wenigen"} Tagen`;
      return {
        to: email,
        subject: `Ihre Rechnung ist ${daysText} fällig – Emilian Leber`,
        html: getEmailShell(
          "Zahlungserinnerung",
          "Ihre Rechnung ist bald fällig.",
          `Hallo ${gruss}, kurze freundliche Erinnerung: Ihre Rechnung ist ${daysText} fällig. Sie finden sie jederzeit in Ihrem Kundenportal zum Download.`,
          `${statusBadge("✦ Zahlung ausstehend", "#b45309", "#fffbeb")}${infoTable(rows)}
          <p style="margin:0;font-size:15px;line-height:1.75;color:#52525b;font-family:${FONT};">
            Bei Fragen zur Rechnung melden Sie sich gerne direkt bei mir.
          </p>`
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
    `Schön, dass Sie da sind, ${customer.name?.split(" ")[0] || ""}!`,
    "Sie wurden in meinem Kundenportal angelegt. Dort finden Sie alle Infos zu Ihren Anfragen, Events und Dokumenten – jederzeit und überall.",
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
    const { type, recordId, customerId, changeRequestId, days, dokumentTyp, statusOverride } = body;

    if (!type) {
      return new Response(JSON.stringify({ error: "type fehlt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (type !== "new_customer" && type !== "change_request" && !recordId) {
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

      await sendMail(
        customer.email,
        `Willkommen im Kundenportal, ${customer.name?.split(" ")[0] || customer.name || ""}!`,
        newCustomerMail(customer)
      );

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

      await sendMail(request.email, mail.subject, mail.html);

      supabase.from("portal_messages").insert({
        customer_id: request.customer_id || null,
        request_id: request.id,
        subject: mail.subject,
        body: mail.subject,
        from_email: Deno.env.get("SMTP_USER") || "el@magicel.de",
        to_email: request.email,
        status: "sent",
        read_by_customer: false,
      }).then(() => {}).catch(() => {});

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

      // statusOverride erlaubt es, die Mail für einen anderen Status zu senden
      const effectiveEvent = statusOverride ? { ...event, status: statusOverride } : event;
      const mail = eventMailTemplate(
        effectiveEvent,
        customer.name || customer.email.split("@")[0] || "Kunde",
        customer.email,
        days,
        dokumentTyp,
        customer.anrede || "",
        customer.vorname || "",
        customer.nachname || ""
      );

      if (!mail) {
        return new Response(JSON.stringify({ success: true, skipped: true }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await sendMail(mail.to, mail.subject, mail.html);

      supabase.from("portal_messages").insert({
        customer_id: event.customer_id || null,
        event_id: event.id,
        subject: mail.subject,
        body: mail.subject,
        from_email: Deno.env.get("SMTP_USER") || "el@magicel.de",
        to_email: mail.to,
        status: "sent",
        read_by_customer: false,
      }).then(() => {}).catch(() => {});

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── change_request ──
    if (type === "change_request") {
      if (!changeRequestId) {
        return new Response(JSON.stringify({ error: "changeRequestId fehlt" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: cr, error: crError } = await supabase
        .from("portal_change_requests")
        .select("*")
        .eq("id", changeRequestId)
        .single();

      if (crError || !cr) throw new Error("Änderungsanfrage nicht gefunden.");

      const { data: customer, error: custError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("id", cr.customer_id)
        .single();

      if (custError || !customer?.email) throw new Error("Kunde nicht gefunden.");

      const firstName = customer.name?.split(" ")[0] || customer.name || "Hallo";
      const isApproved = cr.status === "angenommen";

      const html = getEmailShell(
        isApproved ? "Angenommen" : "Abgelehnt",
        isApproved ? "Ihre Anfrage wurde angenommen." : "Ihre Anfrage wurde abgelehnt.",
        `Hallo ${firstName}, hier ist meine Rückmeldung zu Ihrer Anfrage.`,
        `${statusBadge(isApproved ? "✦ Angenommen" : "✦ Abgelehnt",
          isApproved ? "#15803d" : "#b91c1c",
          isApproved ? "#f0fdf4" : "#fef2f2")}
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
          <tr><td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
            <p style="margin:0 0 4px;font-size:13px;color:#71717a!important;font-family:${FONT};">Ihre Anfrage</p>
            <p style="margin:0;font-size:15px;font-weight:600;color:#0a0a0a!important;font-family:${FONT};">${cr.subject}</p>
          </td></tr>
        </table>
        ${cr.admin_response ? `
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
          <tr><td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
            <p style="margin:0 0 4px;font-size:13px;color:#71717a!important;font-family:${FONT};">Rückmeldung</p>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#0a0a0a!important;font-family:${FONT};">${cr.admin_response}</p>
          </td></tr>
        </table>` : ""}`,
        isApproved
      );

      await sendMail(
        customer.email,
        isApproved ? `Rückmeldung zu Ihrer Anfrage: angenommen` : `Rückmeldung zu Ihrer Anfrage: abgelehnt`,
        html
      );

      supabase.from("portal_messages").insert({
        customer_id: customer.id,
        request_id: cr.request_id || null,
        event_id: cr.event_id || null,
        subject: isApproved ? `Rückmeldung zu Ihrer Anfrage: angenommen` : `Rückmeldung zu Ihrer Anfrage: abgelehnt`,
        body: cr.subject,
        from_email: Deno.env.get("SMTP_USER") || "el@magicel.de",
        to_email: customer.email,
        status: "sent",
        read_by_customer: false,
      }).then(() => {}).catch(() => {});

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
