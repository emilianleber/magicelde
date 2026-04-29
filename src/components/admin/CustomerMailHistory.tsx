import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, ChevronDown, ChevronUp, Loader2, ArrowDownLeft, ArrowUpRight, Cog } from "lucide-react";

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";

type MailSource = "inbox_in" | "inbox_out" | "system";

export type UnifiedMail = {
  id: string;
  source: MailSource;
  ts: string;             // sortbares ISO-Datum
  subject: string;
  from_email: string | null;
  to_email: string | null;
  body_html: string | null;
  body_text: string | null;
  uid?: string | null;    // nur inbox
  status?: string | null; // nur system
};

type Props = {
  customerEmail?: string | null;
  customerId?: string | null;
  /** Optional zusätzliche Filter für portal_messages (z.B. nur diese Anfrage/dieses Event). Wenn leer → alle dem Kunden zugeordneten Nachrichten. */
  messagesOrFilter?: string;
};

// Detection: roher RFC822/MIME-Source statt eigentlichem HTML/Text.
const looksLikeRawMime = (s: string): boolean => {
  const head = s.trim().slice(0, 800);
  if (!head) return false;
  // Typische Mail-Header am Anfang
  if (/^(X-Envelope-From|Return-Path|Received|MIME-Version|Content-Type|Content-Transfer-Encoding|ARC-Seal|Authentication-Results|Message-ID|X-RZG|X-UID):/im.test(head)) return true;
  return false;
};

// Naive HTML-Detection
const looksLikeHtml = (s: string): boolean => {
  return /<\s*(html|body|div|p|br|span|table|h\d|a|img|ul|ol|li|strong|em|b|i)\b/i.test(s);
};

// MIME-Parser (light): extrahiert text/html oder text/plain Part aus Roh-Source.
const decodeBase64Utf8 = (s: string): string => {
  try {
    const cleaned = s.replace(/\s+/g, "");
    const bytes = Uint8Array.from(atob(cleaned), c => c.charCodeAt(0));
    return new TextDecoder("utf-8").decode(bytes);
  } catch { return s; }
};
const decodeQuotedPrintable = (s: string): string => {
  return s
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
};
type ParsedMimePart = { contentType: string; encoding: string; body: string };
const parseMimeRaw = (raw: string): { html?: string; text?: string } => {
  // Boundary aus Content-Type holen (auch verschachtelt — wir suchen alle vorkommenden boundaries)
  const boundaryMatches = [...raw.matchAll(/boundary\s*=\s*"?([^"\s;]+)/gi)].map(m => m[1]);
  if (boundaryMatches.length === 0) {
    // Kein Multipart → versuche den Body als Ganzes zurückzugeben (nach den Headern)
    const sep = raw.indexOf("\n\n");
    const body = sep >= 0 ? raw.slice(sep + 2) : raw;
    return { text: body.trim() };
  }
  // Splitte über jede Boundary, sammle alle Parts
  const parts: ParsedMimePart[] = [];
  for (const b of boundaryMatches) {
    const re = new RegExp(`--${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:--)?`, "g");
    const segments = raw.split(re);
    for (const seg of segments) {
      const trimmed = seg.trim();
      if (!trimmed) continue;
      // Header/Body trennen
      const headerEnd = trimmed.search(/\r?\n\r?\n/);
      if (headerEnd < 0) continue;
      const headerBlock = trimmed.slice(0, headerEnd);
      const body = trimmed.slice(headerEnd).replace(/^\r?\n\r?\n/, "");
      const ctMatch = headerBlock.match(/Content-Type\s*:\s*([^;\r\n]+)/i);
      const encMatch = headerBlock.match(/Content-Transfer-Encoding\s*:\s*([^;\r\n]+)/i);
      const ct = (ctMatch?.[1] || "").trim().toLowerCase();
      const enc = (encMatch?.[1] || "7bit").trim().toLowerCase();
      if (ct.startsWith("text/")) {
        parts.push({ contentType: ct, encoding: enc, body });
      }
    }
  }
  // Decode parts
  const decoded = parts.map(p => {
    let out = p.body;
    if (p.encoding === "base64") out = decodeBase64Utf8(p.body);
    else if (p.encoding === "quoted-printable") out = decodeQuotedPrintable(p.body);
    return { ...p, body: out };
  });
  const html = decoded.find(p => p.contentType === "text/html")?.body;
  const text = decoded.find(p => p.contentType === "text/plain")?.body;
  return { html, text };
};

// Sehr leichter Sanitizer: <script>, <style>, on*-Handler entfernen.
const sanitize = (html: string): string => {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "");
};

export default function CustomerMailHistory({ customerEmail, customerId, messagesOrFilter }: Props) {
  const [mails, setMails] = useState<UnifiedMail[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loadingBody, setLoadingBody] = useState<string | null>(null);
  const reloadKey = useRef(0);

  const lcEmail = customerEmail?.toLowerCase() || null;

  const load = async () => {
    setLoading(true);
    const queries: Promise<{ data: unknown[] | null; error: unknown }>[] = [];

    // 1. portal_inbox_mails (eingehend + ausgehend) — gefiltert über from_email/to_email = customer email
    if (lcEmail) {
      queries.push(
        supabase
          .from("portal_inbox_mails")
          .select("id, uid, subject, received_at, from_email, to_email, body_html, body_text, folder, is_deleted")
          .or(`from_email.ilike.${lcEmail},to_email.ilike.${lcEmail}`)
          .eq("is_deleted", false)
          .order("received_at", { ascending: false })
          .limit(500),
      );
    } else {
      queries.push(Promise.resolve({ data: [], error: null }));
    }

    // 2. portal_messages (System-/CRM-Mails)
    {
      let q = supabase
        .from("portal_messages")
        .select("id, created_at, subject, body, to_email, from_email, status, customer_id")
        .order("created_at", { ascending: false })
        .limit(500);
      if (messagesOrFilter) q = q.or(messagesOrFilter);
      else if (customerId) q = q.eq("customer_id", customerId);
      else if (lcEmail) q = q.or(`to_email.ilike.${lcEmail},from_email.ilike.${lcEmail}`);
      queries.push(q);
    }

    const [inboxRes, msgsRes] = await Promise.all(queries);

    const inbox: UnifiedMail[] = (inboxRes.data || []).map((m: Record<string, unknown> & { id: string; subject?: string; from_email?: string; to_email?: string; body_html?: string; body_text?: string; folder?: string; received_at?: string; created_at?: string; uid?: string; body?: string; status?: string }) => {
      const isOutgoing = (m.folder || "").toLowerCase().includes("sent")
        || (m.from_email && lcEmail && !m.from_email.toLowerCase().includes(lcEmail));
      return {
        id: `inbox:${m.id}`,
        source: isOutgoing ? "inbox_out" : "inbox_in",
        ts: m.received_at,
        subject: m.subject || "(Kein Betreff)",
        from_email: m.from_email,
        to_email: m.to_email,
        body_html: m.body_html,
        body_text: m.body_text,
        uid: m.uid,
      };
    });

    const system: UnifiedMail[] = (msgsRes.data || []).map((m: Record<string, unknown> & { id: string; subject?: string; from_email?: string; to_email?: string; body_html?: string; body_text?: string; folder?: string; received_at?: string; created_at?: string; uid?: string; body?: string; status?: string }) => ({
      id: `sys:${m.id}`,
      source: "system",
      ts: m.created_at,
      subject: m.subject || "(Kein Betreff)",
      from_email: m.from_email || null,
      to_email: m.to_email || null,
      body_html: m.body || null,
      body_text: null,
      status: m.status,
    }));

    // Dedupe: wenn gleiche subject + ähnliche Zeit (60s) zwischen system & inbox_out → nur einmal anzeigen
    const all = [...inbox, ...system].sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());

    setMails(all);
    setLoading(false);
  };

  useEffect(() => {
    reloadKey.current += 1;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lcEmail, customerId, messagesOrFilter]);

  // Realtime: bei jedem Insert/Update auf portal_inbox_mails ODER portal_messages → neu laden (debounced)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const trigger = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => load(), 600);
    };

    const ch = supabase
      .channel(`mail-history-${customerId || lcEmail || "global"}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "portal_inbox_mails" }, trigger)
      .on("postgres_changes", { event: "*", schema: "public", table: "portal_messages" }, trigger)
      .subscribe();

    return () => {
      if (timer) clearTimeout(timer);
      supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lcEmail, customerId, messagesOrFilter]);

  const toggle = async (mail: UnifiedMail) => {
    const willExpand = !expanded[mail.id];
    setExpanded((p) => ({ ...p, [mail.id]: willExpand }));
    // Re-fetch wenn body fehlt ODER body wie roher MIME-Source aussieht (alter Cache)
    const bodyIsBroken = (mail.body_html && looksLikeRawMime(mail.body_html))
      || (mail.body_text && looksLikeRawMime(mail.body_text));
    if (willExpand && mail.source !== "system" && (bodyIsBroken || (!mail.body_html && !mail.body_text)) && mail.uid) {
      // Lazy-load via fetch-mail-body
      setLoadingBody(mail.id);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const realId = mail.id.replace(/^inbox:/, "");
        const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-mail-body`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token || ""}` },
          body: JSON.stringify({ mail_id: realId, uid: mail.uid }),
        });
        if (res.ok) {
          const data = await res.json();
          setMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, body_html: data.body_html, body_text: data.body_text } : m));
        }
      } catch (_e) { /* body fetch failed silently */ }
      setLoadingBody(null);
    }
  };

  const sourceMeta = useMemo(() => ({
    inbox_in:  { icon: ArrowDownLeft, label: "Empfangen", cls: "text-blue-600 bg-blue-50 border-blue-200" },
    inbox_out: { icon: ArrowUpRight, label: "Gesendet",  cls: "text-green-700 bg-green-50 border-green-200" },
    system:    { icon: Cog,           label: "System",    cls: "text-purple-700 bg-purple-50 border-purple-200" },
  } as const), []);

  if (loading) {
    return <div className="flex items-center justify-center py-8 text-sm text-muted-foreground"><Loader2 className="w-4 h-4 animate-spin mr-2" /> Lade Nachrichten…</div>;
  }
  if (!mails.length) {
    return (
      <div className="p-8 rounded-xl bg-muted/10 border border-border/20 text-center">
        <Mail className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Noch keine Nachrichten</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {mails.map((m) => {
        const meta = sourceMeta[m.source];
        const Icon = meta.icon;
        const isOpen = !!expanded[m.id];
        const dateStr = new Date(m.ts).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
        const timeStr = new Date(m.ts).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
        const partner = m.source === "inbox_in" ? `Von ${m.from_email || "?"}` : `An ${m.to_email || "?"}`;

        return (
          <div key={m.id} className="rounded-xl bg-background/60 border border-border/20 overflow-hidden">
            <button onClick={() => toggle(m)} className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/30 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${meta.cls.split(" ").filter(c => c.startsWith("bg-") || c.startsWith("border-")).join(" ")}`}>
                <Icon className={`w-3.5 h-3.5 ${meta.cls.split(" ").find(c => c.startsWith("text-"))}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{m.subject}</p>
                <p className="text-[11px] text-muted-foreground truncate">{partner} · {dateStr} {timeStr}</p>
              </div>
              <span className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full border shrink-0 ${meta.cls}`}>{meta.label}</span>
              {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
            </button>

            {isOpen && (
              <div className="border-t border-border/20 bg-background/30 px-4 py-3">
                {loadingBody === m.id ? (
                  <div className="flex items-center text-sm text-muted-foreground"><Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> Lade Inhalt…</div>
                ) : (() => {
                  const rawHtml = m.body_html || "";
                  const rawText = m.body_text || "";

                  // 1. Prüfen ob body_html ein roher MIME-Source ist → parsen
                  let html = rawHtml;
                  let text = rawText;
                  if (rawHtml && looksLikeRawMime(rawHtml)) {
                    const parsed = parseMimeRaw(rawHtml);
                    html = parsed.html || "";
                    text = parsed.text || text;
                  } else if (rawText && looksLikeRawMime(rawText) && !rawHtml) {
                    const parsed = parseMimeRaw(rawText);
                    html = parsed.html || "";
                    text = parsed.text || "";
                  }

                  // 2. HTML rendern wenn echtes HTML
                  if (html && looksLikeHtml(html)) {
                    return <div className="prose prose-sm max-w-none text-sm text-foreground [&_a]:text-accent [&_a]:underline" dangerouslySetInnerHTML={{ __html: sanitize(html) }} />;
                  }
                  // 3. Plain text fallback
                  if (text) {
                    return <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90 leading-relaxed">{text}</pre>;
                  }
                  // 4. Wenn rawHtml zwar da ist aber ungeparst MIME — als pre rendern statt rohes HTML
                  if (rawHtml) {
                    return <pre className="whitespace-pre-wrap font-mono text-xs text-foreground/70 leading-relaxed">{rawHtml.slice(0, 2000)}</pre>;
                  }
                  return <p className="text-sm text-muted-foreground italic">Kein Inhalt vorhanden.</p>;
                })()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
