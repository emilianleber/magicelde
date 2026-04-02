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
        redirectTo: "https://magicel.de/kundenportal",
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
<html lang="de" xmlns="http://www.w3.org/1999/xhtml" style="color-scheme:light only;supported-color-schemes:light;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <title>Dein Kundenportal-Zugang</title>
  <style>
    :root{color-scheme:light only!important;}
    html,body{background-color:#ffffff!important;margin:0!important;padding:0!important;}
    @media(prefers-color-scheme:dark){html,body{background-color:#ffffff!important;color:#0a0a0a!important;}}
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background-color:#ffffff!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff" style="background-color:#ffffff!important;">
  <tr><td align="center" bgcolor="#ffffff" style="padding:32px 16px;background-color:#ffffff!important;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);border-collapse:separate;border:1px solid #e4e4e7;">
      <!-- HEADER -->
      <tr>
        <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;padding:28px 36px 22px;border-radius:20px 20px 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;"><tr>
            <td bgcolor="#0a0a0a" style="background-color:#0a0a0a!important;"><p style="margin:0;font-size:22px;font-weight:800;color:#ffffff!important;letter-spacing:-0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">Emilian Leber</p></td>
            <td bgcolor="#0a0a0a" style="text-align:right;background-color:#0a0a0a!important;"><span style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#71717a;">Kundenportal</span></td>
          </tr></table>
          <div style="margin-top:16px;height:2px;width:48px;background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7);border-radius:2px;"></div>
        </td>
      </tr>
      <!-- CONTENT -->
      <tr>
        <td bgcolor="#ffffff" style="padding:36px 36px 32px;background-color:#ffffff!important;">
          <div style="display:inline-block;background-color:#eff6ff!important;color:#2563eb!important;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px;">Dein Login-Link</div>
          <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;color:#0a0a0a!important;line-height:1.2;letter-spacing:-0.5px;">${greeting}</h1>
          <p style="margin:0 0 28px;font-size:15px;color:#52525b!important;line-height:1.7;">Du hast einen Zugangslink für dein persönliches Kundenportal angefordert. Klicke auf den Button, um dich einzuloggen und deine Anfragen, Events und Dokumente einzusehen.</p>
          <div style="text-align:center;margin:0 0 28px;">
            <a href="${magicLink}" style="display:inline-block;background-color:#0a0a0a!important;color:#ffffff!important;text-decoration:none;padding:16px 36px;border-radius:14px;font-size:15px;font-weight:700;">Zum Kundenportal &rarr;</a>
          </div>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
            <tr><td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;border-radius:12px;padding:16px 20px;">
              <p style="margin:0;font-size:12px;color:#71717a!important;line-height:1.5;"><strong style="color:#0a0a0a!important;">Hinweis:</strong> Dieser Link ist 24 Stunden gültig und kann nur einmal verwendet werden. Falls du keinen Login-Link angefordert hast, kannst du diese E-Mail ignorieren.</p>
            </td></tr>
          </table>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-top:1px solid #e4e4e7;margin-top:28px;">
            <tr><td bgcolor="#ffffff" style="padding-top:22px;background-color:#ffffff!important;">
              <p style="margin:0 0 2px;font-size:14px;color:#71717a!important;">Mit magischen Grüßen,</p>
              <p style="margin:0;font-size:16px;font-weight:700;color:#0a0a0a!important;">Emilian Leber</p>
              <p style="margin:4px 0 0;font-size:12px;color:#a1a1aa!important;">Zauberer &amp; Showkünstler &middot; <a href="https://magicel.de" style="color:#a1a1aa;text-decoration:none;">magicel.de</a></p>
            </td></tr>
          </table>
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td bgcolor="#f4f4f5" style="background-color:#f4f4f5!important;padding:16px 36px;text-align:center;border-top:1px solid #e4e4e7;border-radius:0 0 20px 20px;">
          <p style="margin:0;font-size:12px;color:#a1a1aa!important;">&copy; 2026 Emilian Leber &middot; Regensburg &middot; <a href="https://magicel.de/datenschutz" style="color:#a1a1aa;text-decoration:none;">Datenschutz</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
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
