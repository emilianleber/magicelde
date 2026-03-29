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

// Strato folder name mapping — try multiple variants
const FOLDER_TARGETS = [
  { internal: "INBOX",    candidates: ["INBOX"] },
  { internal: "Sent",     candidates: ["Sent", "Sent Items", "Gesendete Objekte", "Gesendete Elemente", "INBOX.Sent"] },
  { internal: "Spam",     candidates: ["Spam", "Junk", "Junk E-Mail", "INBOX.Spam", "INBOX.Junk"] },
  { internal: "Trash",    candidates: ["Trash", "Deleted", "Gelöscht", "Papierkorb", "INBOX.Trash", "INBOX.Deleted Messages"] },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const imapHost = Deno.env.get("IMAP_HOST") || "imap.strato.de";
  const imapUser = Deno.env.get("SMTP_USER")!;
  const imapPass = Deno.env.get("SMTP_PASS")!;

  const client = new ImapFlow({
    host: imapHost,
    port: 993,
    secure: true,
    auth: { user: imapUser, pass: imapPass },
    logger: false,
    tls: { rejectUnauthorized: false },
  });

  const logs: string[] = [];
  let totalSynced = 0;

  try {
    await client.connect();
    logs.push(`Connected to ${imapHost}`);

    // List all available folders
    const allFolders: string[] = [];
    for await (const folder of client.list()) {
      allFolders.push(folder.path);
    }
    logs.push(`Available folders: ${allFolders.join(", ")}`);

    for (const target of FOLDER_TARGETS) {
      // Find which folder name actually exists
      const actualFolder = target.candidates.find((c) =>
        allFolders.some((f) => f.toLowerCase() === c.toLowerCase())
      ) || allFolders.find((f) =>
        target.candidates.some((c) => f.toLowerCase().includes(c.toLowerCase()))
      );

      if (!actualFolder) {
        logs.push(`No folder found for ${target.internal}, skipping`);
        continue;
      }

      logs.push(`Syncing ${target.internal} (actual: ${actualFolder})`);

      let lock;
      try {
        lock = await client.getMailboxLock(actualFolder);
      } catch (e: any) {
        logs.push(`Could not lock ${actualFolder}: ${e.message}`);
        continue;
      }

      try {
        const mailbox = client.mailbox;
        if (!mailbox || mailbox.exists === 0) {
          logs.push(`${actualFolder} is empty`);
          continue;
        }

        // Fetch last 30 messages
        const count = mailbox.exists;
        const from = Math.max(1, count - 29);
        const range = `${from}:${count}`;

        const mails: any[] = [];

        for await (const msg of client.fetch(range, {
          uid: true,
          envelope: true,
          bodyStructure: true,
          source: true,
        })) {
          try {
            const uid = `${target.internal}:${msg.uid}`;
            const parsed = await simpleParser(msg.source);

            const fromAddr = parsed.from?.value?.[0];
            const toAddr = parsed.to
              ? Array.isArray(parsed.to)
                ? parsed.to[0]?.value?.[0]
                : (parsed.to as any).value?.[0]
              : null;

            mails.push({
              uid,
              folder: target.internal,
              from_name: fromAddr?.name || null,
              from_email: fromAddr?.address || null,
              to_email: toAddr?.address || null,
              subject: parsed.subject || "(Kein Betreff)",
              body_html: parsed.html || null,
              body_text: parsed.text?.substring(0, 20000) || null,
              received_at: parsed.date ? parsed.date.toISOString() : new Date().toISOString(),
              is_read: false,
              is_starred: false,
            });
          } catch (parseErr: any) {
            logs.push(`Parse error on msg: ${parseErr.message}`);
          }
        }

        if (mails.length > 0) {
          const { error } = await supabase
            .from("portal_inbox_mails")
            .upsert(mails, { onConflict: "uid", ignoreDuplicates: true });

          if (error) {
            logs.push(`DB error for ${target.internal}: ${error.message}`);
          } else {
            logs.push(`Synced ${mails.length} mails from ${target.internal}`);
            totalSynced += mails.length;
          }
        } else {
          logs.push(`No messages fetched from ${actualFolder}`);
        }
      } finally {
        lock.release();
      }
    }

    await client.logout();

    return new Response(
      JSON.stringify({ success: true, synced: totalSynced, logs }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("SYNC INBOX ERROR:", err);
    await client.logout().catch(() => {});
    return new Response(
      JSON.stringify({ error: err.message || "Sync fehlgeschlagen", logs }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
