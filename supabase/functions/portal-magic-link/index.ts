import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import nodemailer from "npm:nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "E-Mail fehlt" }), { status: 400, headers: corsHeaders });
    }

    // Admin client — can generate links + create users without sending emails
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // 1. Ensure there is exactly ONE auth user for this email.
    //    If none exists yet, create it (email already confirmed, no invite email sent).
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const found = existingUser?.users?.find((u: any) => u.email === email);

    if (!found) {
      const { error: createErr } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true, // mark as confirmed — no separate confirmation email
      });
      if (createErr) throw createErr;
    }

    // 2. Generate a magic link WITHOUT Supabase sending its own email.
    //    generateLink creates the token but does NOT trigger the email template.
    const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: {
        redirectTo: "https://www.magicel.de/kundenportal",
      },
    });
    if (linkErr || !linkData?.properties?.action_link) {
      throw linkErr || new Error("Link konnte nicht generiert werden");
    }

    const magicLink = linkData.properties.action_link;

    // 3. Fetch customer name from portal_customers for personalised greeting
    const { data: customerData } = await supabase
      .from("portal_customers")
      .select("name")
      .eq("email", email)
      .maybeSingle();
    const customerName = customerData?.name || null;
    const greeting = customerName ? `Hallo ${customerName.split(" ")[0]},` : "Hallo,";

    // 4. Send ONE branded email with the magic link via SMTP
    const smtpUser = Deno.env.get("SMTP_USER") || "el@magicel.de";
    const transporter = nodemailer.createTransport({
      host: Deno.env.get("SMTP_HOST") || "smtp.strato.de",
      port: Number(Deno.env.get("SMTP_PORT") || "465"),
      secure: true,
      auth: {
        user: smtpUser,
        pass: Deno.env.get("SMTP_PASS"),
      },
    });

    const html = `<!DOCTYPE html>
<html lang="de" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Dein Kundenportal-Zugang</title>
  <style>
    :root { color-scheme: light !important; }
    html, body { margin: 0 !important; padding: 0 !important; background-color: #ffffff !important; }
    @media (prefers-color-scheme: dark) {
      .em-bg-white { background-color: #ffffff !important; }
      .em-bg-black { background-color: #0a0a0a !important; }
      .em-bg-gray  { background-color: #f4f4f5 !important; }
      .em-text-white { color: #ffffff !important; }
      .em-text-dark  { color: #0a0a0a !important; }
      .em-text-muted { color: #52525b !important; }
      .em-text-sub   { color: #71717a !important; }
      .em-text-light { color: #a1a1aa !important; }
      .em-text-blue  { color: #2563eb !important; }
      .em-badge-bg   { background-color: #eff6ff !important; }
      .em-btn        { background-color: #0a0a0a !important; color: #ffffff !important; }
      .em-link       { color: #a1a1aa !important; }
    }
  </style>
</head>
<body bgcolor="#ffffff" class="em-bg-white" style="margin:0;padding:0;background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff">
  <tr>
    <td align="center" bgcolor="#ffffff" class="em-bg-white" style="padding:32px 16px;background-color:#ffffff;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">

        <!-- HEADER -->
        <tr>
          <td bgcolor="#0a0a0a" class="em-bg-black" style="background-color:#0a0a0a;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
              <tr>
                <td bgcolor="#0a0a0a" class="em-bg-black" style="background-color:#0a0a0a;">
                  <p class="em-text-white" style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p>
                </td>
                <td bgcolor="#0a0a0a" class="em-bg-black" style="text-align:right;background-color:#0a0a0a;">
                  <span class="em-text-sub" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Kundenportal</span>
                </td>
              </tr>
            </table>
            <div style="margin-top:16px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td bgcolor="#ffffff" class="em-bg-white" style="padding:36px 36px 32px;background-color:#ffffff;">

            <!-- Badge (table-based, not div) -->
            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td bgcolor="#eff6ff" class="em-badge-bg" style="background-color:#eff6ff;border-radius:999px;padding:6px 16px;">
                  <span class="em-text-blue" style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#2563eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Dein Login-Link</span>
                </td>
              </tr>
            </table>

            <h1 class="em-text-dark" style="margin:0 0 16px;font-size:26px;font-weight:800;color:#0a0a0a;line-height:1.2;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${greeting}</h1>
            <p class="em-text-muted" style="margin:0 0 28px;font-size:15px;color:#52525b;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Sie haben einen Zugangslink für Ihr persönliches Kundenportal angefordert. Klicken Sie auf den Button, um sich einzuloggen und Ihre Anfragen, Events und Dokumente einzusehen.</p>

            <!-- Button (table-based) -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td align="center" bgcolor="#ffffff" class="em-bg-white" style="background-color:#ffffff;">
                  <a href="${magicLink}" class="em-btn" style="display:inline-block;background-color:#0a0a0a;color:#ffffff;text-decoration:none;padding:16px 36px;border-radius:14px;font-size:15px;font-weight:700;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Zum Kundenportal &rarr;</a>
                </td>
              </tr>
            </table>

            <!-- Hint box -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:28px;">
              <tr>
                <td bgcolor="#f4f4f5" class="em-bg-gray" style="background-color:#f4f4f5;border-radius:12px;padding:16px 20px;">
                  <p class="em-text-sub" style="margin:0;font-size:12px;color:#71717a;line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                    <strong class="em-text-dark" style="color:#0a0a0a;">Hinweis:</strong> Dieser Link ist 24 Stunden gültig und kann nur einmal verwendet werden. Falls Sie keinen Login-Link angefordert haben, können Sie diese E-Mail ignorieren.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Signature -->
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-top:24px;">
              <tr><td colspan="2" style="padding-bottom:16px;"><div style="height:2px;background:linear-gradient(90deg,#6366f1 0%,#a855f7 40%,#e4e4e7 40%);border-radius:2px;"></div></td></tr>
              <tr>
                <td style="width:64px;vertical-align:top;padding-right:18px;"><img src="https://magicel.de/favicon.ico" alt="EL" width="48" height="48" style="border-radius:12px;display:block;" /></td>
                <td style="vertical-align:top;">
                  <p style="margin:0;font-size:15px;font-weight:700;color:#18181b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p>
                  <p style="margin:2px 0 0;font-size:10px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Zauberer &amp; Entertainer</p>
                  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:8px;">
                    <tr><td style="padding:2px 0;font-size:11px;color:#71717a;width:14px;">T</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="tel:+4915563744696" style="color:#3f3f46;text-decoration:none;">+49 155 637 44 696</a></td></tr>
                    <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">E</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="mailto:el@magicel.de" style="color:#3f3f46;text-decoration:none;">el@magicel.de</a></td></tr>
                    <tr><td style="padding:2px 0;font-size:11px;color:#71717a;">W</td><td style="padding:2px 0 2px 6px;font-size:11px;"><a href="https://magicel.de" style="color:#3f3f46;text-decoration:none;">www.magicel.de</a></td></tr>
                  </table>
                  <p style="margin:6px 0 0;font-size:10px;color:#a1a1aa;">Regensburg · Deutschland · <a href="https://wa.me/4915563744696" style="color:#a1a1aa;text-decoration:none;">WhatsApp</a></p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#f4f4f5" class="em-bg-gray" style="background-color:#f4f4f5;padding:16px 36px;text-align:center;border-top:1px solid #e4e4e7;border-radius:0 0 20px 20px;">
            <p class="em-text-light" style="margin:0;font-size:12px;color:#a1a1aa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" class="em-link" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

    await transporter.sendMail({
      from: `"Emilian Leber" <${smtpUser}>`,
      to: email,
      subject: "Dein Zugangslink für das Kundenportal",
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("portal-magic-link error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
