import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple IMAP client using raw TCP (no npm dependency)
class SimpleImap {
  private conn!: Deno.TlsConn;
  private buf = "";
  private tag = 0;

  async connect(host: string, port: number) {
    this.conn = await Deno.connectTls({ hostname: host, port });
    await this.readLine(); // greeting
  }

  async login(user: string, pass: string) {
    const res = await this.cmd(`LOGIN "${user}" "${pass}"`);
    const last = res[res.length - 1] || "";
    if (!last.includes(" OK")) throw new Error(`LOGIN failed: ${last}`);
  }

  async list(): Promise<string[]> {
    const res = await this.cmd('LIST "" "*"');
    const folders: string[] = [];
    for (const line of res) {
      const m = line.match(/\) "?" "?([^"]+)"?$/);
      if (m) folders.push(m[1].trim());
    }
    return folders;
  }

  async select(folder: string): Promise<number> {
    const res = await this.cmd(`SELECT "${folder}"`);
    for (const line of res) {
      const m = line.match(/\* (\d+) EXISTS/);
      if (m) return parseInt(m[1]);
    }
    return 0;
  }

  async fetchHeaders(from: number, to: number): Promise<{ uid: number; headers: Record<string, string> }[]> {
    const res = await this.cmd(`FETCH ${from}:${to} (UID RFC822.HEADER)`);
    const mails: { uid: number; headers: Record<string, string> }[] = [];

    let uid = 0;
    let headerLines: string[] = [];
    let inHeaders = false;

    for (const line of res) {
      const uidMatch = line.match(/\* \d+ FETCH \(UID (\d+)/);
      if (uidMatch) { uid = parseInt(uidMatch[1]); headerLines = []; inHeaders = true; continue; }
      if (line === ")") {
        if (uid > 0) mails.push({ uid, headers: parseHeaders(headerLines) });
        inHeaders = false; uid = 0; headerLines = [];
        continue;
      }
      if (inHeaders && !line.startsWith("* ")) headerLines.push(line);
    }
    return mails;
  }

  async fetchBody(uid: number): Promise<string> {
    const res = await this.cmd(`UID FETCH ${uid} BODY.PEEK[]`);
    const lines: string[] = [];
    let inBody = false;
    for (const line of res) {
      if (line.match(/\* \d+ FETCH/)) { inBody = true; continue; }
      if (inBody && line === ")") break;
      if (inBody) lines.push(line);
    }
    return lines.join("\r\n");
  }

  async logout() {
    try { await this.cmd("LOGOUT"); } catch (_) {}
    try { this.conn.close(); } catch (_) {}
  }

  private async cmd(command: string): Promise<string[]> {
    const t = `A${++this.tag}`;
    const enc = new TextEncoder();
    await this.conn.write(enc.encode(`${t} ${command}\r\n`));
    const lines: string[] = [];
    while (true) {
      const line = await this.readLine();
      lines.push(line);
      if (line.startsWith(`${t} OK`) || line.startsWith(`${t} NO`) || line.startsWith(`${t} BAD`)) break;
    }
    return lines;
  }

  private async readLine(): Promise<string> {
    const dec = new TextDecoder();
    while (true) {
      const idx = this.buf.indexOf("\r\n");
      if (idx >= 0) {
        const line = this.buf.slice(0, idx);
        this.buf = this.buf.slice(idx + 2);
        return line;
      }
      const chunk = new Uint8Array(4096);
      const n = await this.conn.read(chunk);
      if (n === null) return this.buf;
      this.buf += dec.decode(chunk.slice(0, n));
    }
  }
}

function parseHeaders(lines: string[]): Record<string, string> {
  const h: Record<string, string> = {};
  let key = "";
  for (const line of lines) {
    if (line.startsWith(" ") || line.startsWith("\t")) {
      if (key) h[key] = (h[key] || "") + " " + line.trim();
    } else {
      const colon = line.indexOf(":");
      if (colon > 0) {
        key = line.slice(0, colon).toLowerCase();
        h[key] = line.slice(colon + 1).trim();
      }
    }
  }
  return h;
}

function decodeRFC2047(str: string): string {
  return str.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, _charset, enc, text) => {
    try {
      if (enc.toUpperCase() === "B") return atob(text);
      if (enc.toUpperCase() === "Q") return text.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    } catch (_) {}
    return text;
  });
}

function parseFrom(from: string): { name: string | null; address: string | null } {
  if (!from) return { name: null, address: null };
  const m = from.match(/^"?([^<"]*)"?\s*<?([^>]+@[^>]+)>?/);
  if (m) return { name: decodeRFC2047(m[1].trim()) || null, address: m[2].trim() };
  if (from.includes("@")) return { name: null, address: from.trim() };
  return { name: null, address: null };
}

const FOLDER_TARGETS = [
  { internal: "INBOX", candidates: ["INBOX"] },
  { internal: "Sent",  candidates: ["Sent", "Sent Items", "Gesendete Objekte", "Gesendete Elemente", "INBOX.Sent"] },
  { internal: "Spam",  candidates: ["Spam", "Junk", "Junk E-Mail", "INBOX.Spam", "INBOX.Junk"] },
  { internal: "Trash", candidates: ["Trash", "Deleted", "Gelöscht", "Papierkorb", "INBOX.Trash"] },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const host = Deno.env.get("IMAP_HOST") || Deno.env.get("SMTP_HOST") || "imap.strato.de";
  const user = Deno.env.get("SMTP_USER")!;
  const pass = Deno.env.get("SMTP_PASS")!;

  const logs: string[] = [];
  let totalSynced = 0;
  const imap = new SimpleImap();

  try {
    console.log("sync-inbox: connecting to", host);
    await imap.connect(host, 993);
    logs.push(`Connected to ${host}`);
    console.log("sync-inbox: connected, logging in as", user);

    await imap.login(user, pass);
    logs.push("Logged in");
    console.log("sync-inbox: logged in");

    const allFolders = await imap.list();
    logs.push(`Folders: ${allFolders.join(", ")}`);

    for (const target of FOLDER_TARGETS) {
      const actualFolder = target.candidates.find((c) =>
        allFolders.some((f) => f.toLowerCase() === c.toLowerCase())
      ) || allFolders.find((f) =>
        target.candidates.some((c) => f.toLowerCase().includes(c.toLowerCase()))
      );

      if (!actualFolder) { logs.push(`No folder for ${target.internal}`); continue; }

      const count = await imap.select(actualFolder);
      logs.push(`${actualFolder}: ${count} messages`);
      if (count === 0) continue;

      const from = Math.max(1, count - 49);
      const headers = await imap.fetchHeaders(from, count);
      logs.push(`Fetched ${headers.length} headers from ${actualFolder}`);

      const mails = headers.map(({ uid, headers: h }) => ({
        uid: `${target.internal}:${uid}`,
        folder: target.internal,
        from_name: parseFrom(h.from || "").name,
        from_email: parseFrom(h.from || "").address,
        to_email: parseFrom(h.to || "").address,
        subject: decodeRFC2047(h.subject || "(Kein Betreff)"),
        body_html: null,
        body_text: null,
        received_at: h.date ? new Date(h.date).toISOString() : new Date().toISOString(),
        is_read: false,
        is_starred: false,
      }));

      const { error } = await supabase
        .from("portal_inbox_mails")
        .upsert(mails, { onConflict: "uid", ignoreDuplicates: true });

      if (error) {
        console.error("sync-inbox: DB error", error.message);
        logs.push(`DB error: ${error.message}`);
      } else {
        totalSynced += mails.length;
        logs.push(`Saved ${mails.length}`);
        console.log(`sync-inbox: saved ${mails.length} from ${actualFolder}`);
      }
    }

    await imap.logout();
    console.log("sync-inbox: done, total synced:", totalSynced);

    return new Response(
      JSON.stringify({ success: true, synced: totalSynced, logs }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("sync-inbox: ERROR", err.message);
    logs.push(`ERROR: ${err.message}`);
    await imap.logout().catch(() => {});
    return new Response(
      JSON.stringify({ error: err.message, logs }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
