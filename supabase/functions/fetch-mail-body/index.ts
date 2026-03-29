import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import { ImapFlow } from "npm:imapflow@1.0.162";
// @ts-ignore
import { simpleParser } from "npm:mailparser@3.6.5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { mail_id, uid, folder } = await req.json();
    // uid format: "INBOX:12345"
    const [folderInternal, uidNum] = (uid as string).split(":");

    const folderMap: Record<string, string[]> = {
      INBOX: ["INBOX"],
      Sent:  ["Sent", "Sent Items", "Gesendete Objekte", "INBOX.Sent"],
      Spam:  ["Spam", "Junk", "INBOX.Spam", "INBOX.Junk"],
      Trash: ["Trash", "Deleted", "Gelöscht", "INBOX.Trash"],
    };

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const client = new ImapFlow({
      host: Deno.env.get("IMAP_HOST") || "imap.strato.de",
      port: 993,
      secure: true,
      auth: { user: Deno.env.get("SMTP_USER")!, pass: Deno.env.get("SMTP_PASS")! },
      logger: false,
      tls: { rejectUnauthorized: false },
    });

    await client.connect();

    // Find actual folder name
    const allFolders: string[] = [];
    for await (const f of client.list()) allFolders.push(f.path);

    const candidates = folderMap[folderInternal] || [folderInternal];
    const actualFolder = candidates.find((c) =>
      allFolders.some((f) => f.toLowerCase() === c.toLowerCase())
    ) || allFolders.find((f) =>
      candidates.some((c) => f.toLowerCase().includes(c.toLowerCase()))
    ) || "INBOX";

    const lock = await client.getMailboxLock(actualFolder);
    let bodyHtml: string | null = null;
    let bodyText: string | null = null;

    try {
      for await (const msg of client.fetch({ uid: Number(uidNum) }, { uid: true, source: true }, { uid: true })) {
        const parsed = await simpleParser(msg.source);
        bodyHtml = parsed.html || null;
        bodyText = parsed.text?.substring(0, 50000) || null;
        break;
      }
    } finally {
      lock.release();
    }

    await client.logout();

    // Save to DB so next open is instant
    await supabase
      .from("portal_inbox_mails")
      .update({ body_html: bodyHtml, body_text: bodyText })
      .eq("id", mail_id);

    return new Response(
      JSON.stringify({ body_html: bodyHtml, body_text: bodyText }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
