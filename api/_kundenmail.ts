// Bestaetigungsmail an den Interessenten — WORTGLEICH aus der alten
// Funktion create-portal-request uebernommen (03.09.2026).
//
// Nicht nachgebaut, sondern herausgeloest: Die Vorlage ist ueber Monate
// gewachsen (Hell-Modus erzwungen, damit sie in dunklen Mailprogrammen nicht
// unleserlich wird), und ein Nachbau haette genau diese Feinheiten verloren.
//
// NICHT von Hand aendern, ohne in einem dunklen Postfach gegenzupruefen.

export interface KundenmailDaten {
  displayGreeting: string;
  safeEmail: string;
  safeFirma: string | null;
  safeAnlass: string | null;
  fmtDatum: string | null;
  safeOrt: string | null;
  safeFormat: string | null;
}

export const KUNDENMAIL_BETREFF = "Ihre Anfrage ist eingegangen – Emilian Leber \u2728";

export function kundenmailHtml(d: KundenmailDaten): string {
  const { displayGreeting, safeEmail, safeFirma, safeAnlass, fmtDatum, safeOrt, safeFormat } = d;
  return `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light only;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
  <title>Anfrage eingegangen</title>
  <style>
    :root{color-scheme:light only!important;}
    html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}
    @media(prefers-color-scheme:dark){html,body{background-color:#ffffff!important;color:#0a0a0a!important;}}
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;"><tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff!important;">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
  <tr><td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
      <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;"><p style="margin:0;font-size:22px;font-weight:800;color:#ffffff!important;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p></td>
      <td bgcolor="#0a0a0a" style="text-align:right;background-color:#0a0a0a!important;"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Zauberer &amp; Showkünstler</span></td>
    </tr></table>
    <div style="margin-top:16px;height:2px;width:56px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
  </td></tr>
  <tr><td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff!important;">
    <div style="display:inline-block;background-color:#eff6ff!important;color:#2563eb!important;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Anfrage</div>
    <h1 style="margin:0 0 14px;font-size:26px;font-weight:800;color:#0a0a0a!important;line-height:1.2;letter-spacing:-0.5px;">Danke, ${displayGreeting}! ✨</h1>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:#52525b!important;">Ihre Anfrage ist erfolgreich bei mir eingegangen. Ich melde mich persönlich – in der Regel innerhalb von 24 Stunden.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:4px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          ${safeFirma ? `<tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;width:40%;background-color:#f9fafb!important;">🏢 Firma</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeFirma}</td></tr>` : ""}
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;width:40%;background-color:#f9fafb!important;">🎉 Anlass</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeAnlass || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📅 Datum</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${fmtDatum || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">📍 Ort</td><td bgcolor="#f9fafb" style="padding:12px 0;border-bottom:1px solid #e4e4e7;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeOrt || "–"}</td></tr>
          <tr><td bgcolor="#f9fafb" style="padding:12px 0;font-size:14px;color:#71717a!important;background-color:#f9fafb!important;">🎭 Format</td><td bgcolor="#f9fafb" style="padding:12px 0;font-size:14px;font-weight:600;color:#0a0a0a!important;background-color:#f9fafb!important;">${safeFormat || "–"}</td></tr>
        </table>
      </td>
    </tr></table>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;"><tr>
      <td bgcolor="#f9fafb" style="background-color:#f9fafb!important;border:1px solid #e4e4e7;border-radius:14px;padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#71717a!important;">Kundenportal</p>
        <p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#52525b!important;">Verfolgen Sie Ihre Anfrage jederzeit im Kundenportal – melden Sie sich mit dieser E-Mail-Adresse an:</p>
        <p style="margin:0;font-size:15px;font-weight:700;color:#0a0a0a!important;">${safeEmail}</p>
      </td>
    </tr></table>
    <div style="text-align:center;margin:24px 0 20px;">
      <a href="https://www.magicel.de/kundenportal/login" style="display:inline-block;background-color:#0a0a0a!important;color:#ffffff!important;text-decoration:none;padding:15px 34px;border-radius:14px;font-size:15px;font-weight:700;">Kundenportal öffnen &rarr;</a>
    </div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:24px;">
      <tr><td colspan="2" style="padding-bottom:16px;"><div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div></td></tr>
      <tr>
        <td style="width:64px;vertical-align:top;padding-right:18px;">
          <img src="https://magicel.de/favicon.ico" alt="EL" width="48" height="48" style="border-radius:12px;display:block;" />
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0;font-size:15px;font-weight:700;color:#18181b!important;">Emilian Leber</p>
          <p style="margin:2px 0 0;font-size:10px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:1px;">Zauberer &amp; Entertainer</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
            <tr><td style="padding:2px 0;font-size:11px;color:#71717a;width:14px;">T</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
            <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">E</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="mailto:el@magicel.de" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td></tr>
            <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">W</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
          </table>
          <p style="margin:6px 0 0;font-size:10px;color:#a1a1aa;">Regensburg · Deutschland · <a href="https://wa.me/4915563744696" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;border-top:1px solid #e4e4e7;padding:16px 36px;text-align:center;border-radius:0 0 20px 20px;">
    <p style="margin:0;font-size:12px;color:#a1a1aa!important;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}
