/**
 * Shared branded email shell used by all Edge Functions.
 * Professionelle HTML-Mail mit Signatur, Logo, Kontakt, Datenschutz.
 */

export const FONT = "'Inter','Segoe UI',Helvetica,Arial,sans-serif";

// ── Professionelle Signatur ──────────────────────────────────────────────────

const signature = `
<!-- ═══ SIGNATUR ═══ -->
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e4e4e7;margin-top:12px;">
  <tr><td style="padding-top:24px;">

    <!-- Name + Titel -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="padding-right:16px;vertical-align:top;">
          <img src="https://magicel.de/logo-signatur.png" alt="Emilian Leber" width="56" height="56" style="border-radius:14px;display:block;" />
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a;font-family:${FONT};line-height:1.3;">Emilian Leber</p>
          <p style="margin:2px 0 0;font-size:12px;color:#71717a;font-family:${FONT};">Zauberer &amp; Entertainer</p>
          <p style="margin:2px 0 0;font-size:11px;color:#a1a1aa;font-family:${FONT};">Ausgezeichnet mit dem Deutschen Zauberpreis</p>
        </td>
      </tr>
    </table>

    <!-- Kontakt-Leiste -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:16px;background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:12px;">
      <tr>
        <td style="padding:12px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
            <tr>
              <td style="font-size:12px;color:#52525b;font-family:${FONT};padding:3px 0;">
                📞 <a href="tel:+4915563744696" style="color:#0a0a0a;text-decoration:none;font-weight:500;">+49 155 63744696</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#52525b;font-family:${FONT};padding:3px 0;">
                ✉️ <a href="mailto:el@magicel.de" style="color:#0a0a0a;text-decoration:none;font-weight:500;">el@magicel.de</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#52525b;font-family:${FONT};padding:3px 0;">
                🌐 <a href="https://magicel.de" style="color:#0a0a0a;text-decoration:none;font-weight:500;">magicel.de</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#52525b;font-family:${FONT};padding:3px 0;">
                💬 <a href="https://wa.me/4915563744696" style="color:#25D366;text-decoration:none;font-weight:500;">WhatsApp schreiben</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- Social / Bewertungen -->
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:12px;">
      <tr>
        <td style="font-size:11px;color:#a1a1aa;font-family:${FONT};">
          ⭐ <a href="https://g.page/r/CfLlgBMpyJ0vEBM/review" style="color:#a1a1aa;text-decoration:none;">Google</a>
          &nbsp;·&nbsp;
          ⭐ <a href="https://www.provenexpert.com/emilian-leber/" style="color:#a1a1aa;text-decoration:none;">ProvenExpert</a>
          &nbsp;·&nbsp;
          📸 <a href="https://www.instagram.com/emilian.leber/" style="color:#a1a1aa;text-decoration:none;">Instagram</a>
        </td>
      </tr>
    </table>

  </td></tr>
</table>`;

// ── Haupt-Shell ──────────────────────────────────────────────────────────────

export const getEmailShell = (
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
    :root { color-scheme: light !important; }
    html, body { background-color: #ffffff !important; margin: 0 !important; padding: 0 !important; }
    @media (prefers-color-scheme: dark) {
      html, body { background-color: #ffffff !important; }
      .ew { background-color: #ffffff !important; }
      .ec { background-color: #ffffff !important; color: #0a0a0a !important; }
      h1 { color: #0a0a0a !important; }
    }
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff;font-family:${FONT};">

<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff;" class="ew">
<tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff;">

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
            <span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:${FONT};">Zauberer &amp; Entertainer</span>
          </td>
        </tr>
      </table>
      <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
    </td>
  </tr>

  <!-- CONTENT -->
  <tr>
    <td bgcolor="#ffffff" style="padding:36px 36px 24px;background-color:#ffffff;" class="ec">

      <div style="display:inline-block;background-color:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;font-family:${FONT};">${badge}</div>

      <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;letter-spacing:-0.5px;font-family:${FONT};">${title}</h1>

      <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#52525b;font-family:${FONT};">${intro}</p>

      ${content}

      ${showPortalButton ? `
      <div style="text-align:center;margin:28px 0 16px;">
        <a href="https://www.magicel.de/kundenportal/login"
           style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:15px 34px;border-radius:14px;font-size:15px;font-weight:700;letter-spacing:0.3px;font-family:${FONT};">
          Kundenportal öffnen &rarr;
        </a>
      </div>` : ""}

      ${signature}

    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td bgcolor="#f4f4f5" style="background-color:#f4f4f5;padding:20px 36px;text-align:center;border-top:1px solid #e4e4e7;border-radius:0 0 20px 20px;">
      <p style="margin:0 0 6px;font-size:11px;color:#a1a1aa;font-family:${FONT};">
        Emilian Leber &middot; Regensburg &middot; USt-IdNr: folgt
      </p>
      <p style="margin:0;font-size:11px;color:#a1a1aa;font-family:${FONT};">
        <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:underline;">Datenschutz</a>
        &nbsp;&middot;&nbsp;
        <a href="https://magicel.de/impressum" style="color:#a1a1aa;text-decoration:underline;">Impressum</a>
        &nbsp;&middot;&nbsp;
        <a href="https://magicel.de/agb" style="color:#a1a1aa;text-decoration:underline;">AGB</a>
      </p>
      <p style="margin:8px 0 0;font-size:10px;color:#d4d4d8;font-family:${FONT};">
        &copy; ${new Date().getFullYear()} Emilian Leber. Diese E-Mail wurde automatisch generiert.
      </p>
    </td>
  </tr>

</table>
</td></tr></table>

</body></html>`;

// ── Hilfs-Elemente ───────────────────────────────────────────────────────────

export const statusBadge = (text: string, color: string, bg: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td style="background-color:${bg};border:1px solid ${color}20;border-radius:10px;padding:8px 16px;font-size:13px;font-weight:700;color:${color};font-family:${FONT};">${text}</td></tr></table>`;

export const infoTable = (rows: { icon: string; label: string; value: string }[]) => `
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
  <tr>
    <td bgcolor="#f9fafb" style="background-color:#f9fafb;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        ${rows.map((r, i) => `
        <tr>
          <td bgcolor="#f9fafb" style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#71717a;width:44%;font-family:${FONT};background-color:#f9fafb;">
            ${r.icon}&nbsp;${r.label}
          </td>
          <td bgcolor="#f9fafb" style="padding:12px 0;${i < rows.length - 1 ? "border-bottom:1px solid #e4e4e7;" : ""}font-size:14px;color:#0a0a0a;font-weight:600;font-family:${FONT};background-color:#f9fafb;">
            ${r.value}
          </td>
        </tr>`).join("")}
      </table>
    </td>
  </tr>
</table>`;
