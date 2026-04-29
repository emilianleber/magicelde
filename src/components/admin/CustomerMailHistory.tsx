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

// Naive HTML-Detection: wenn der String wie Roh-MIME oder reiner Code aussieht, lieber als Text rendern.
const looksLikeRawCode = (html: string): boolean => {
  const s = html.trim();
  if (!s) return false;
  // Wenn keine bekannten HTML-Tags vorkommen → kein echtes HTML
  if (!/<\s*(html|body|div|p|br|span|table|h\d|a|img|ul|ol|li|strong|em|b|i)\b/i.test(s)) return true;
  // MIME-Header (Content-Type, Content-Transfer-Encoding) am Anfang → roh
  if (/^(Content-Type|Content-Transfer-Encoding|MIME-Version):/im.test(s.slice(0, 200))) return true;
  return false;
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
    if (willExpand && mail.source !== "system" && !mail.body_html && !mail.body_text && mail.uid) {
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
                  const html = m.body_html || "";
                  if (html && !looksLikeRawCode(html)) {
                    return <div className="prose prose-sm max-w-none text-sm text-foreground [&_a]:text-accent [&_a]:underline" dangerouslySetInnerHTML={{ __html: sanitize(html) }} />;
                  }
                  const text = m.body_text || (html && looksLikeRawCode(html) ? html : "");
                  if (text) {
                    return <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90 leading-relaxed">{text}</pre>;
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
