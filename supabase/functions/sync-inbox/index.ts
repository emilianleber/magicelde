import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import { ImapFlow } from "npm:imapflow";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FOLDERS: { name: string; label: string }[] = [
  { name: "INBOX", label: "INBOX" },
  { name: "Sent", label: "Sent" },
  { name: "Junk", label: "Spam" },
  { name: "Trash", label: "Trash" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const host = Deno.env.get("SMTP_HOST") || "smtp.strato.de";
    const imapHost = host.replace("smtp.", "imap.");
    const user = Deno.env.get("SMTP_USER")!;
    const pass = Deno.env.get("SMTP_PASS")!;

    const client = new ImapFlow({
      host: imapHost,
      port: 993,
      secure: true,
      auth: { user, pass },
      logger: false,
    });

    await client.connect();

    let totalSynced = 0;

    for (const folder of FOLDERS) {
      try {
        const mailbox = await client.getMailboxLock(folder.name);
        try {
          const mails: any[] = [];
          // fetch last 50 messages per folder
          for await (const msg of client.fetch("1:50", {
            uid: true,
            envelope: true,
            bodyStructure: true,
            source: true,
          })) {
            try {
              const uid = `${folder.name}:${msg.uid}`;
              const env = msg.envelope || {};
              const fromAddr = env.from?.[0];
              const toAddr = env.to?.[0];

              let bodyHtml = "";
              let bodyText = "";

              // Try to extract text from source
              if (msg.source) {
                const raw = msg.source.toString();
                // Very basic extraction - get content after headers
                const parts = raw.split("\r\n\r\n");
                if (parts.length > 1) {
                  bodyText = parts.slice(1).join("\r\n\r\n").substring(0, 10000);
                }
              }

              mails.push({
                uid,
                folder: folder.label,
                from_name: fromAddr?.name || null,
                from_email: fromAddr?.address || null,
                to_email: toAddr?.address || null,
                subject: env.subject || "(Kein Betreff)",
                body_html: bodyHtml || null,
                body_text: bodyText || null,
                received_at: env.date ? new Date(env.date).toISOString() : new Date().toISOString(),
              });
            } catch (_) {
              // skip malformed message
            }
          }

          if (mails.length > 0) {
            const { error } = await supabase
              .from("portal_inbox_mails")
              .upsert(mails, { onConflict: "uid", ignoreDuplicates: true });
            if (!error) totalSynced += mails.length;
          }
        } finally {
          mailbox.release();
        }
      } catch (_folderErr) {
        // folder may not exist, skip
      }
    }

    await client.logout();

    return new Response(
      JSON.stringify({ success: true, synced: totalSynced }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("SYNC INBOX ERROR:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Sync fehlgeschlagen" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
