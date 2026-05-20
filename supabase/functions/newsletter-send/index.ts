/**
 * Newsletter-Send — Admin-Only.
 *
 * Body: { campaignId: string }
 *
 * Lädt Campaign, holt alle active Subscribers, schickt batch via Resend.
 * Jede Mail enthält individuellen Unsubscribe-Link.
 *
 * Per Resend best-practice: Batch-Size 100, Pause zwischen Batches.
 */
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend";

const supabase = createClient(
  Deno.env.get("PROJECT_URL")!,
  Deno.env.get("SERVICE_ROLE_KEY")!,
);
const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
const SITE_URL = Deno.env.get("SITE_URL") || "https://www.magicel.de";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Auth-Check: nur authenticated User (Admin im Frontend)
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace(/^Bearer\s+/i, "");
    if (!jwt) {
      return new Response(JSON.stringify({ error: "Auth fehlt." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: { user }, error: authErr } = await supabase.auth.getUser(jwt);
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Auth ungültig." }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { campaignId } = await req.json();
    if (!campaignId || typeof campaignId !== "string") {
      return new Response(JSON.stringify({ error: "campaignId fehlt." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Campaign holen
    const { data: campaign, error: cErr } = await supabase
      .from("newsletter_campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();
    if (cErr || !campaign) {
      return new Response(JSON.stringify({ error: "Campaign nicht gefunden." }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (campaign.status === "sent") {
      return new Response(JSON.stringify({ error: "Campaign bereits versendet." }), {
        status: 409,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Status auf "sending" setzen
    await supabase
      .from("newsletter_campaigns")
      .update({ status: "sending" })
      .eq("id", campaignId);

    // Active Subscribers holen
    const { data: subs, error: sErr } = await supabase
      .from("newsletter_subscribers")
      .select("email, name, unsubscribe_token")
      .eq("status", "active");
    if (sErr) throw sErr;
    if (!subs || subs.length === 0) {
      await supabase
        .from("newsletter_campaigns")
        .update({ status: "sent", sent_at: new Date().toISOString(), recipient_count: 0 })
        .eq("id", campaignId);
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "Keine aktiven Subscriber." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Body-Templates
    const renderHtml = (sub: { email: string; name: string | null; unsubscribe_token: string }) => {
      const unsubUrl = `${SITE_URL}/unsubscribe?token=${sub.unsubscribe_token}`;
      const greeting = sub.name ? `Hallo ${sub.name},` : "Hallo,";
      const content = (campaign.body_html || "").replace(/\{\{name\}\}/g, sub.name ?? "");
      return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${escapeHtml(campaign.subject)}</title></head>
<body style="margin:0;padding:32px 16px;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table align="center" cellpadding="0" cellspacing="0" width="640" style="background:#fff;border-radius:16px;padding:36px;border:1px solid #e4e4e7;">
<tr><td>
<p style="margin:0 0 16px;font-size:22px;font-weight:800;color:#0a0a0a;letter-spacing:-0.5px;">Emilian Leber</p>
<div style="height:2px;width:48px;background:#9a2640;border-radius:2px;margin-bottom:28px;"></div>
<p style="font-size:15px;color:#3f3f46;margin:0 0 20px;">${greeting}</p>
<div style="font-size:15px;line-height:1.7;color:#0a0a0a;">${content}</div>
<hr style="border:none;border-top:1px solid #e4e4e7;margin:32px 0 16px;">
<p style="font-size:12px;color:#a1a1aa;margin:0 0 8px;">Emilian Leber · el@magicel.de · <a href="https://www.magicel.de" style="color:#a1a1aa;">magicel.de</a></p>
<p style="font-size:11px;color:#a1a1aa;margin:0;">
<a href="${unsubUrl}" style="color:#a1a1aa;text-decoration:underline;">Newsletter abbestellen</a>
</p>
</td></tr></table></body></html>`;
    };

    const renderText = (sub: { name: string | null; unsubscribe_token: string }) => {
      const greeting = sub.name ? `Hallo ${sub.name},` : "Hallo,";
      const content = (campaign.body_text || "").replace(/\{\{name\}\}/g, sub.name ?? "");
      const unsubUrl = `${SITE_URL}/unsubscribe?token=${sub.unsubscribe_token}`;
      return `${greeting}\n\n${content}\n\n—\nEmilian Leber · el@magicel.de\nAbmelden: ${unsubUrl}`;
    };

    let sent = 0;
    let failed = 0;
    const errorLog: { email: string; error: string }[] = [];
    const BATCH = 50;

    for (let i = 0; i < subs.length; i += BATCH) {
      const slice = subs.slice(i, i + BATCH);
      const results = await Promise.allSettled(
        slice.map((sub) =>
          resend.emails.send({
            from: "Emilian Leber <el@magicel.de>",
            to: sub.email,
            subject: campaign.subject,
            html: renderHtml(sub),
            text: renderText(sub),
          }),
        ),
      );
      for (let j = 0; j < results.length; j++) {
        const r = results[j];
        if (r.status === "fulfilled") sent++;
        else {
          failed++;
          errorLog.push({
            email: slice[j].email,
            error: r.reason instanceof Error ? r.reason.message : String(r.reason),
          });
        }
      }
      // Rate-Limit-Pause zwischen Batches
      if (i + BATCH < subs.length) await new Promise((r) => setTimeout(r, 1100));
    }

    await supabase
      .from("newsletter_campaigns")
      .update({
        status: failed === subs.length ? "failed" : "sent",
        sent_at: new Date().toISOString(),
        recipient_count: sent,
        failed_count: failed,
        error_log: errorLog,
      })
      .eq("id", campaignId);

    return new Response(
      JSON.stringify({ success: true, sent, failed, total: subs.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("send error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unbekannter Fehler" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
