import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function decodeModifiedUTF7(str: string): string {
  return str.replace(/&([^-]*)-/g, (_, encoded) => {
    if (encoded === "") return "&";
    try {
      const binary = atob(encoded.replace(/,/g, "/"));
      let result = "";
      for (let i = 0; i + 1 < binary.length; i += 2) {
        result += String.fromCharCode((binary.charCodeAt(i) << 8) | binary.charCodeAt(i + 1));
      }
      return result;
    } catch (_) { return encoded; }
  });
}

class SimpleImap {
  private conn!: Deno.TlsConn;
  private buf = "";
  private tag = 0;

  async connect(host: string, port: number) {
    this.conn = await Deno.connectTls({ hostname: host, port });
    await this.readLine();
  }

  async login(user: string, pass: string) {
    const res = await this.cmd(`LOGIN "${user}" "${pass}"`);
    const last = res[res.length - 1] || "";
    if (!last.includes(" OK")) throw new Error(`LOGIN failed: ${last}`);
  }

  async select(folder: string): Promise<number> {
    const res = await this.cmd(`SELECT "${folder}"`);
    for (const line of res) {
      const m = line.match(/\* (\d+) EXISTS/);
      if (m) return parseInt(m[1]);
    }
    return 0;
  }

  async list(): Promise<string[]> {
    const res = await this.cmd('LIST "" "*"');
    const folders: string[] = [];
    for (const line of res) {
      const m = line.match(/^\* LIST [^)]*\) (?:"[^"]*"|NIL) "?([^"]+?)"?\s*$/);
      if (m) folders.push(decodeModifiedUTF7(m[1].trim()));
    }
    return folders;
  }

  async fetchBodyByUID(uid: number): Promise<string> {
    const res = await this.cmd(`UID FETCH ${uid} BODY.PEEK[]`);
    const lines: string[] = [];
    let inBody = false;
    let sizeLine = false;
    for (const line of res) {
      if (line.includes("BODY[]")) { sizeLine = true; continue; }
      if (sizeLine) { inBody = true; sizeLine = false; }
      if (inBody) {
        if (line === ")") break;
        lines.push(line);
      }
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
    const dec = new TextDecoder("utf-8", { fatal: false });
    while (true) {
      const idx = this.buf.indexOf("\r\n");
      if (idx >= 0) {
        const line = this.buf.slice(0, idx);
        this.buf = this.buf.slice(idx + 2);
        return line;
      }
      const chunk = new Uint8Array(32768);
      const n = await this.conn.read(chunk);
      if (n === null) return this.buf;
      this.buf += dec.decode(chunk.slice(0, n));
    }
  }
}

function decodeBytes(bytes: Uint8Array, charset: string): string {
  const cs = charset.toLowerCase().trim();
  for (const enc of [cs, "utf-8", "iso-8859-1"]) {
    try { return new TextDecoder(enc, { fatal: true }).decode(bytes); } catch (_) {}
  }
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

function decodeTransferEncoding(headers: string, body: string): string {
  const enc = (headers.match(/content-transfer-encoding:\s*(\S+)/i)?.[1] || "").toLowerCase().trim();
  const charset = (headers.match(/charset=["']?([^"'\s;]+)/i)?.[1] || "utf-8");

  if (enc === "base64") {
    try {
      const binary = atob(body.replace(/\s+/g, ""));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return decodeBytes(bytes, charset);
    } catch (_) { return body; }
  }
  if (enc === "quoted-printable") {
    const raw = body
      .replace(/=\r?\n/g, "")
      .replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
    if (charset.toLowerCase().includes("utf")) {
      try {
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
        return decodeBytes(bytes, charset);
      } catch (_) {}
    }
    return raw;
  }
  // 8bit or 7bit – body might already be UTF-8 bytes misinterpreted as latin1
  if (charset.toLowerCase().includes("utf")) {
    try {
      const bytes = new Uint8Array(body.length);
      for (let i = 0; i < body.length; i++) bytes[i] = body.charCodeAt(i);
      return decodeBytes(bytes, charset);
    } catch (_) {}
  }
  return body;
}

function extractTextFromRaw(raw: string): { text: string; html: string | null } {
  const boundaryMatch = raw.match(/boundary="?([^"\r\n;]+)"?/i);
  if (boundaryMatch) {
    const boundary = boundaryMatch[1].trim();
    const parts = raw.split(new RegExp(`--${boundary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    let text = "";
    let html = "";
    for (const part of parts) {
      const lower = part.toLowerCase();
      if (lower.includes("content-type: text/html")) {
        const idx = part.indexOf("\r\n\r\n");
        if (idx >= 0) html = decodeTransferEncoding(part.slice(0, idx), part.slice(idx + 4));
      } else if (lower.includes("content-type: text/plain")) {
        const idx = part.indexOf("\r\n\r\n");
        if (idx >= 0) text = decodeTransferEncoding(part.slice(0, idx), part.slice(idx + 4));
      }
    }
    return { text: text.trim(), html: html.trim() || null };
  }

  const bodyStart = raw.indexOf("\r\n\r\n");
  if (bodyStart >= 0) {
    const headers = raw.slice(0, bodyStart);
    const body = raw.slice(bodyStart + 4);
    const decoded = decodeTransferEncoding(headers, body);
    // Check if it looks like HTML
    if (decoded.trimStart().startsWith("<")) return { text: "", html: decoded.trim() };
    return { text: decoded.trim(), html: null };
  }
  return { text: raw.trim(), html: null };
}

const FOLDER_MAP: Record<string, string[]> = {
  INBOX: ["INBOX"],
  Sent:  ["Sent", "Sent Items", "Gesendet", "Gesendete Objekte", "INBOX.Sent"],
  Spam:  ["Spam", "Junk", "INBOX.Spam", "INBOX.Junk"],
  Trash: ["Trash", "Deleted", "Papierkorb", "Gelöscht", "INBOX.Trash"],
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { mail_id, uid } = await req.json();
    const colonIdx = uid.lastIndexOf(":");
    const folderInternal = uid.slice(0, colonIdx);
    const uidNum = parseInt(uid.slice(colonIdx + 1));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const imap = new SimpleImap();
    await imap.connect(Deno.env.get("IMAP_HOST") || "imap.strato.de", 993);
    await imap.login(Deno.env.get("SMTP_USER")!, Deno.env.get("SMTP_PASS")!);

    const allFolders = await imap.list();
    const candidates = FOLDER_MAP[folderInternal] || [folderInternal];
    const actualFolder = candidates.find((c) =>
      allFolders.some((f) => f.toLowerCase() === c.toLowerCase())
    ) || allFolders.find((f) =>
      candidates.some((c) => f.toLowerCase().includes(c.toLowerCase()))
    ) || "INBOX";

    await imap.select(actualFolder);
    const raw = await imap.fetchBodyByUID(uidNum);
    await imap.logout();

    const { text, html } = extractTextFromRaw(raw);
    const bodyText = text || raw.slice(0, 20000);

    await supabase
      .from("portal_inbox_mails")
      .update({ body_html: html, body_text: bodyText })
      .eq("id", mail_id);

    return new Response(
      JSON.stringify({ body_html: html, body_text: bodyText }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
