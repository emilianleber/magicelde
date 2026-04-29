import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

class SimpleImap {
  private conn!: Deno.TlsConn;
  private buf = "";
  private tag = 0;

  async connect(host: string, port: number) {
    this.conn = await Deno.connectTls({ hostname: host, port });
    await this.readLine();
  }

  async login(user: string, pass: string) {
    await this.cmd(`LOGIN "${user}" "${pass}"`);
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
      if (!line.startsWith("* LIST")) continue;
      const quoted = line.match(/\)\s+(?:"[^"]*"|NIL|\S+)\s+"([^"]+)"\s*$/);
      const unquoted = !quoted ? line.match(/\)\s+(?:"[^"]*"|NIL|\S+)\s+(\S+)\s*$/) : null;
      const name = (quoted?.[1] || unquoted?.[1] || "").trim();
      if (name && name !== "NIL") folders.push(name);
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
    const dec = new TextDecoder();
    while (true) {
      const idx = this.buf.indexOf("\r\n");
      if (idx >= 0) {
        const line = this.buf.slice(0, idx);
        this.buf = this.buf.slice(idx + 2);
        return line;
      }
      const chunk = new Uint8Array(8192);
      const n = await this.conn.read(chunk);
      if (n === null) return this.buf;
      this.buf += dec.decode(chunk.slice(0, n));
    }
  }
}

// Robuster MIME-Parser: behandelt verschachteltes Multipart + UTF-8
function decodeBase64Utf8(s: string): string {
  try {
    const cleaned = s.replace(/\s+/g, "");
    const bytes = Uint8Array.from(atob(cleaned), c => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  } catch { return s; }
}
function decodeQP(s: string): string {
  // First decode UTF-8 byte sequences from =XX encoded text
  const collapsed = s.replace(/=\r?\n/g, "");
  // Convert =XX hex sequences to bytes, then decode whole as UTF-8
  const bytes: number[] = [];
  let i = 0;
  while (i < collapsed.length) {
    if (collapsed[i] === "=" && i + 2 < collapsed.length && /[0-9A-Fa-f]{2}/.test(collapsed.slice(i + 1, i + 3))) {
      bytes.push(parseInt(collapsed.slice(i + 1, i + 3), 16));
      i += 3;
    } else {
      bytes.push(collapsed.charCodeAt(i));
      i += 1;
    }
  }
  try {
    return new TextDecoder("utf-8").decode(Uint8Array.from(bytes));
  } catch { return collapsed; }
}
function decodeTransferEncoding(headers: string, body: string): string {
  const enc = (headers.match(/content-transfer-encoding:\s*(\S+)/i)?.[1] || "").toLowerCase().trim();
  if (enc === "base64") return decodeBase64Utf8(body);
  if (enc === "quoted-printable") return decodeQP(body);
  return body;
}

function extractTextFromRaw(raw: string): { text: string; html: string | null } {
  // ALLE Boundaries finden (auch bei verschachteltem multipart)
  const boundaries = [...raw.matchAll(/boundary\s*=\s*"?([^"\s;\r\n]+)/gi)].map(m => m[1]);

  let html = "";
  let text = "";

  if (boundaries.length > 0) {
    // Über jede Boundary splitten und Parts sammeln
    const seenParts = new Set<string>();
    for (const b of boundaries) {
      const re = new RegExp(`--${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:--)?`, "g");
      const segments = raw.split(re);
      for (const seg of segments) {
        const trimmed = seg.replace(/^\r?\n/, "").replace(/\r?\n$/, "");
        if (!trimmed || seenParts.has(trimmed.slice(0, 200))) continue;
        seenParts.add(trimmed.slice(0, 200));
        // Header/Body separator
        const sep = trimmed.search(/\r?\n\r?\n/);
        if (sep < 0) continue;
        const headerBlock = trimmed.slice(0, sep);
        const body = trimmed.slice(sep).replace(/^\r?\n\r?\n/, "");
        const ctMatch = headerBlock.match(/Content-Type\s*:\s*([^;\r\n]+)/i);
        const ct = (ctMatch?.[1] || "").trim().toLowerCase();
        if (ct === "text/html" && !html) {
          html = decodeTransferEncoding(headerBlock, body);
        } else if (ct === "text/plain" && !text) {
          text = decodeTransferEncoding(headerBlock, body);
        }
      }
    }
    return { text: text.trim(), html: html.trim() || null };
  }

  // Single-Part: alles nach Headern
  const bodyStart = raw.search(/\r?\n\r?\n/);
  if (bodyStart >= 0) {
    const body = raw.slice(bodyStart).replace(/^\r?\n\r?\n/, "");
    const decoded = decodeTransferEncoding(raw.slice(0, bodyStart), body);
    return { text: decoded.trim(), html: null };
  }
  return { text: raw.trim(), html: null };
}

const FOLDER_MAP: Record<string, string[]> = {
  INBOX: ["INBOX"],
  Sent:  ["Sent Items", "Sent", "Gesendet", "Gesendete Objekte", "Gesendete Elemente", "INBOX.Sent"],
  Spam:  ["Spam", "Junk", "INBOX.Spam", "INBOX.Junk"],
  Trash: ["Trash", "Gelöscht", "Gel&APY-scht", "Papierkorb", "INBOX.Trash"],
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { mail_id, uid } = await req.json();
    // uid format: "INBOX:12345"
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

    // Find actual folder
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

    // Cache in DB
    await supabase
      .from("portal_inbox_mails")
      .update({ body_html: html, body_text: text || raw.slice(0, 10000) })
      .eq("id", mail_id);

    return new Response(
      JSON.stringify({ body_html: html, body_text: text || raw.slice(0, 10000) }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
