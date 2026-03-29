import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore
import { ImapFlow } from "npm:imapflow@1.0.162";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FOLDER_TARGETS = [
  { internal: "INBOX", candidates: ["INBOX"] },
  { internal: "Sent",  candidates: ["Sent", "Sent Items", "Gesendete Objekte", "Gesendete Elemente", "INBOX.Sent"] },
  { internal: "Spam",  candidates: ["Spam", "Junk", "Junk E-Mail", "INBOX.Spam", "INBOX.Junk"] },
  { internal: "Trash", candidates: ["Trash", "Deleted", "Gelöscht", "Papierkorb", "INBOX.Trash", "INBOX.Deleted Messages"] },
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
    logs.push(`Folders: ${allFolders.join(", ")}`);

    for (const target of FOLDER_TARGETS) {
      const actualFolder = target.candidates.find((c) =>
        allFolders.some((f) => f.toLowerCase() === c.toLowerCase())
      ) || allFolders.find((f) =>
        target.candidates.some((c) => f.toLowerCase().includes(c.toLowerCase()))
      );

      if (!actualFolder) {
        logs.push(`No folder for ${target.internal}`);
        continue;
      }

      let lock;
      try {
        lock = await client.getMailboxLock(actualFolder);
      } catch (e: any) {
        logs.push(`Lock failed ${actualFolder}: ${e.message}`);
        continue;
      }

      try {
        const mailbox = client.mailbox;
        if (!mailbox || mailbox.exists === 0) {
          logs.push(`${actualFolder} empty`);
          continue;
        }

        // Only fetch last 50, headers only (NO source — much faster)
        const count = mailbox.exists;
        const from = Math.max(1, count - 49);
        const range = `${from}:${count}`;

        const mails: any[] = [];

        for await (const msg of client.fetch(range, {
          uid: true,
          envelope: true,
          flags: true,
          // No source, no bodyStructure — just headers
        })) {
          try {
            const uid = `${target.internal}:${msg.uid}`;
            const env = msg.envelope || {};
            const fromAddr = env.from?.[0];
            const toAddr = env.to?.[0];

            mails.push({
              uid,
              folder: target.internal,
              from_name: fromAddr?.name || null,
              from_email: fromAddr?.address || null,
              to_email: toAddr?.address || null,
              subject: env.subject || "(Kein Betreff)",
              body_html: null,   // loaded on demand
              body_text: null,   // loaded on demand
              received_at: env.date ? new Date(env.date).toISOString() : new Date().toISOString(),
              is_read: msg.flags?.has("\\Seen") ?? false,
              is_starred: msg.flags?.has("\\Flagged") ?? false,
            });
          } catch (_) {}
        }

        if (mails.length > 0) {
          const { error } = await supabase
            .from("portal_inbox_mails")
            .upsert(mails, { onConflict: "uid", ignoreDuplicates: true });

          if (error) logs.push(`DB error: ${error.message}`);
          else { logs.push(`Synced ${mails.length} from ${target.internal}`); totalSynced += mails.length; }
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
    console.error("SYNC ERROR:", err);
    await client.logout().catch(() => {});
    return new Response(
      JSON.stringify({ error: err.message, logs }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
