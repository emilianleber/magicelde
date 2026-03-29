import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor, { PLACEHOLDERS, replacePlaceholders } from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronDown, ChevronUp, FileText, LogOut, Mail, Paperclip,
  Plus, RefreshCw, Search, Send, User, X, Inbox, SendHorizonal,
  Trash2, AlertOctagon, Star, StarOff,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";

type Folder = "posteingang" | "gesendet" | "spam" | "geloescht";

interface InboxMail {
  id: string;
  uid: string;
  folder: string;
  from_name: string | null;
  from_email: string | null;
  to_email: string | null;
  subject: string | null;
  body_html: string | null;
  body_text: string | null;
  received_at: string | null;
  is_read: boolean;
  is_starred: boolean;
}

interface PortalMessage {
  id: string;
  created_at: string;
  customer_id: string | null;
  subject: string;
  body: string;
  from_email: string;
  to_email: string;
  customer?: { name: string | null } | null;
}

interface PortalCustomer { id: string; name: string | null; email: string | null; firma?: string | null; }
interface MailTemplate { id: string; name: string; subject: string | null; body: string; }
interface CustomerDoc { id: string; name: string; type: string | null; file_url: string | null; }

const inputCls = "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const FOLDERS: { id: Folder; label: string; icon: any; imap?: string }[] = [
  { id: "posteingang", label: "Posteingang", icon: Inbox,         imap: "INBOX" },
  { id: "gesendet",    label: "Gesendet",    icon: SendHorizonal, imap: "Sent" },
  { id: "spam",        label: "Spam",        icon: AlertOctagon,  imap: "Spam" },
  { id: "geloescht",   label: "Gelöscht",    icon: Trash2,        imap: "Trash" },
];

const AdminMails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeFolder, setActiveFolder] = useState<Folder>("posteingang");
  const [inboxMails, setInboxMails] = useState<InboxMail[]>([]);
  const [sentMails, setSentMails] = useState<PortalMessage[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingBody, setLoadingBody] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");

  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [signature, setSignature] = useState("");
  const [customers, setCustomers] = useState<PortalCustomer[]>([]);

  const [showCompose, setShowCompose] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [composeCustomerId, setComposeCustomerId] = useState("");
  const [composeToEmail, setComposeToEmail] = useState("");
  const [composeToName, setComposeToName] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [customerDocs, setCustomerDocs] = useState<CustomerDoc[]>([]);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoading(true);
      const { data: admin } = await supabase.from("portal_admins").select("id").eq("email", user.email!).maybeSingle();
      if (!admin) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const [inboxRes, sentRes, tplRes, sigRes, custRes] = await Promise.all([
        supabase.from("portal_inbox_mails").select("*").order("received_at", { ascending: false }).limit(100),
        supabase.from("portal_messages").select("id,created_at,customer_id,subject,body,from_email,to_email,customer:customer_id(name)").order("created_at", { ascending: false }),
        supabase.from("portal_mail_templates").select("*").order("name"),
        supabase.from("portal_signature").select("*").limit(1).maybeSingle(),
        supabase.from("portal_customers").select("id,name,email,firma").order("name"),
      ]);

      if (!inboxRes.error) setInboxMails(inboxRes.data || []);
      if (!sentRes.error) setSentMails(sentRes.data || []);
      if (!tplRes.error) setTemplates(tplRes.data || []);
      if (!sigRes.error && sigRes.data) setSignature(sigRes.data.body);
      if (!custRes.error) setCustomers(custRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const syncInbox = async () => {
    setSyncing(true);
    setSyncMsg("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/sync-inbox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error + (data.logs ? "\n" + data.logs.join("\n") : ""));
      setSyncMsg(`✓ ${data.synced} Mails synchronisiert.`);
      // Reload inbox
      const { data: fresh } = await supabase.from("portal_inbox_mails").select("*").order("received_at", { ascending: false }).limit(100);
      if (fresh) setInboxMails(fresh);
    } catch (err: any) {
      setSyncMsg("Sync fehlgeschlagen: " + (err.message || "Unbekannter Fehler"));
    }
    setSyncing(false);
    setTimeout(() => setSyncMsg(""), 5000);
  };

  const toggleStar = async (mail: InboxMail) => {
    const { data } = await supabase.from("portal_inbox_mails").update({ is_starred: !mail.is_starred }).eq("id", mail.id).select("*").single();
    if (data) setInboxMails((prev) => prev.map((m) => m.id === mail.id ? data : m));
  };

  const markRead = async (mail: InboxMail) => {
    if (mail.is_read) return;
    await supabase.from("portal_inbox_mails").update({ is_read: true }).eq("id", mail.id);
    setInboxMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, is_read: true } : m));
  };

  const loadBody = async (mail: InboxMail) => {
    if (mail.body_html || mail.body_text) return;
    setLoadingBody(mail.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-mail-body`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ mail_id: mail.id, uid: mail.uid, folder: mail.folder }),
      });
      const data = await res.json();
      if (res.ok) setInboxMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, body_html: data.body_html, body_text: data.body_text } : m));
    } catch (_) {}
    setLoadingBody(null);
  };

  const handleCustomerSelect = async (customerId: string) => {
    setComposeCustomerId(customerId);
    setSelectedDocIds([]);
    setCustomerDocs([]);
    const c = customers.find((c) => c.id === customerId);
    if (c) { setComposeToEmail(c.email || ""); setComposeToName(c.name || ""); }
    if (customerId) {
      const { data } = await supabase.from("portal_documents").select("id,name,type,file_url").eq("customer_id", customerId);
      setCustomerDocs(data || []);
    }
    if (selectedTemplateId && c) {
      const tpl = templates.find((t) => t.id === selectedTemplateId);
      if (tpl) setComposeBody(replacePlaceholders(tpl.body, { name: c.name, firma: c.firma, email: c.email }) + (signature ? `<br><br>---<br>${signature}` : ""));
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (!templateId) return;
    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl) return;
    if (tpl.subject) setComposeSubject(tpl.subject);
    const c = customers.find((c) => c.id === composeCustomerId);
    setComposeBody(replacePlaceholders(tpl.body, { name: c?.name, firma: c?.firma, email: c?.email }) + (signature ? `<br><br>---<br>${signature}` : ""));
  };

  const sendMail = async () => {
    if (!composeToEmail || !composeSubject || !composeBody) { setSendMsg("Empfänger, Betreff und Nachricht sind Pflichtfelder."); return; }
    setSending(true); setSendMsg("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const attachmentUrls = selectedDocIds.map((id) => customerDocs.find((d) => d.id === id)?.file_url).filter(Boolean);
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-customer-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ customer_id: composeCustomerId || null, subject: composeSubject, body: composeBody, to_email: composeToEmail, to_name: composeToName || null, attachment_urls: attachmentUrls }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error + (data.logs ? "\n" + data.logs.join("\n") : ""));
      setSentMails((prev) => [data.message, ...prev]);
      setShowCompose(false);
      setComposeCustomerId(""); setComposeToEmail(""); setComposeToName(""); setComposeSubject(""); setComposeBody("");
      setSelectedTemplateId(""); setSelectedDocIds([]); setCustomerDocs([]);
      setActiveFolder("gesendet");
    } catch (err: any) {
      setSendMsg(err.message || "Fehler beim Senden.");
    }
    setSending(false);
  };

  const logout = async () => { await supabase.auth.signOut(); navigate("/admin/login"); };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  // Get mails for current folder
  const getFolderMails = () => {
    const q = search.toLowerCase();
    if (activeFolder === "gesendet") {
      return sentMails.filter((m) => !q || m.subject?.toLowerCase().includes(q) || m.to_email?.toLowerCase().includes(q) || (m.customer as any)?.name?.toLowerCase().includes(q));
    }
    const folderMap: Record<Folder, string> = { posteingang: "INBOX", gesendet: "Sent", spam: "Spam", geloescht: "Trash" };
    return inboxMails.filter((m) => {
      const inFolder = m.folder === folderMap[activeFolder];
      const matchesSearch = !q || m.subject?.toLowerCase().includes(q) || m.from_email?.toLowerCase().includes(q) || m.body_text?.toLowerCase().includes(q);
      return inFolder && matchesSearch;
    });
  };

  const folderMails = getFolderMails();
  const unreadCount = inboxMails.filter((m) => m.folder === "INBOX" && !m.is_read).length;

  return (
    <AdminLayout
      title="Mails"
      subtitle="Postfach el@magicel.de"
      actions={
        <div className="flex items-center gap-2">
          <button onClick={syncInbox} disabled={syncing} className="inline-flex items-center gap-2 font-sans text-sm border border-border/40 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} /> Sync
          </button>
          <button onClick={() => { setShowCompose(!showCompose); setSendMsg(""); }} className="btn-primary inline-flex items-center gap-2">
            {showCompose ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showCompose ? "Abbrechen" : "Neue Mail"}
          </button>
          <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      }
    >
      {syncMsg && (
        <div className={`mb-4 px-4 py-2.5 rounded-xl font-sans text-sm ${syncMsg.includes("fehlgeschlagen") ? "bg-destructive/10 text-destructive" : "bg-green-100 text-green-800"}`}>
          {syncMsg}
        </div>
      )}

      {/* Compose Panel */}
      {showCompose && (
        <div className="mb-8 p-6 rounded-2xl bg-muted/20 border border-border/30 space-y-4">
          <h2 className="font-display text-base font-bold text-foreground">Neue Mail verfassen</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Vorlage</label>
              <select value={selectedTemplateId} onChange={(e) => handleTemplateSelect(e.target.value)} className={inputCls}>
                <option value="">— Vorlage wählen —</option>
                {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Kunde (optional)</label>
              <select value={composeCustomerId} onChange={(e) => handleCustomerSelect(e.target.value)} className={inputCls}>
                <option value="">— Kunde wählen —</option>
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name}{c.firma ? ` · ${c.firma}` : ""}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">An (E-Mail) *</label>
              <input value={composeToEmail} onChange={(e) => setComposeToEmail(e.target.value)} placeholder="empfaenger@beispiel.de" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Betreff *</label>
            <input value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} placeholder="Betreff" className={inputCls} />
          </div>
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Nachricht *</label>
            <RichTextEditor value={composeBody} onChange={setComposeBody} placeholder="Nachricht schreiben…" minHeight="220px" />
          </div>
          {customerDocs.length > 0 && (
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2"><Paperclip className="w-3.5 h-3.5 inline mr-1" />Anhänge</label>
              <div className="space-y-2">
                {customerDocs.map((doc) => (
                  <label key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/20 cursor-pointer hover:border-accent/30 transition-colors">
                    <input type="checkbox" checked={selectedDocIds.includes(doc.id)} onChange={() => setSelectedDocIds((prev) => prev.includes(doc.id) ? prev.filter((d) => d !== doc.id) : [...prev, doc.id])} className="h-4 w-4 rounded" />
                    <FileText className="w-4 h-4 text-accent shrink-0" />
                    <p className="font-sans text-sm text-foreground">{doc.name}</p>
                  </label>
                ))}
              </div>
            </div>
          )}
          {sendMsg && <p className="font-sans text-sm text-red-500">{sendMsg}</p>}
          <button onClick={sendMail} disabled={sending} className="btn-primary disabled:opacity-60">
            <Send className="w-4 h-4 mr-2" />{sending ? "Wird gesendet…" : "Mail senden"}
          </button>
        </div>
      )}

      {/* Layout: folders sidebar + mail list */}
      <div className="flex gap-6">
        {/* Folder Sidebar */}
        <div className="w-44 shrink-0 space-y-1">
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => { setActiveFolder(f.id); setExpandedId(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left relative ${
                activeFolder === f.id ? "bg-background shadow-sm text-foreground border border-border/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <f.icon className="w-4 h-4 shrink-0" />
              <span>{f.label}</span>
              {f.id === "posteingang" && unreadCount > 0 && (
                <span className="ml-auto font-sans text-[10px] font-bold bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mail List */}
        <div className="flex-1 min-w-0">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Suche…" className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>

          <div className="space-y-2">
            {folderMails.length === 0 ? (
              <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <Mail className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-sans text-sm text-muted-foreground">
                  {activeFolder === "posteingang" ? "Klicke auf Sync um Mails zu laden." : "Keine Mails in diesem Ordner."}
                </p>
              </div>
            ) : (
              folderMails.map((mail: any) => {
                const isSent = activeFolder === "gesendet";
                const id = mail.id;
                const isExpanded = expandedId === id;
                const isRead = isSent ? true : mail.is_read;
                const subject = mail.subject || "(Kein Betreff)";
                const from = isSent ? `An: ${(mail.customer as any)?.name || mail.to_email}` : `Von: ${mail.from_name || mail.from_email || "Unbekannt"}`;
                const date = new Date(isSent ? mail.created_at : mail.received_at).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });

                return (
                  <div key={id} className={`rounded-2xl border overflow-hidden transition-colors ${!isRead ? "bg-accent/5 border-accent/20" : "bg-muted/20 border-border/30"}`}>
                    <button
                      onClick={() => {
                        setExpandedId(isExpanded ? null : id);
                        if (!isSent) { markRead(mail as InboxMail); if (!isExpanded) loadBody(mail as InboxMail); }
                      }}
                      className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-sans text-sm truncate ${!isRead ? "font-bold text-foreground" : "font-semibold text-foreground"}`}>{subject}</p>
                        <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">{from}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {!isSent && (
                          <button onClick={(e) => { e.stopPropagation(); toggleStar(mail as InboxMail); }} className="text-muted-foreground hover:text-accent transition-colors p-1">
                            {mail.is_starred ? <Star className="w-4 h-4 fill-accent text-accent" /> : <StarOff className="w-4 h-4" />}
                          </button>
                        )}
                        <span className="font-sans text-xs text-muted-foreground">{date}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-border/20">
                        <div className="flex gap-4 text-xs text-muted-foreground mb-3 font-sans flex-wrap">
                          {isSent ? (
                            <>
                              <span>Von: {mail.from_email}</span>
                              <span>An: {mail.to_email}</span>
                              {mail.customer_id && <Link to={`/admin/customers/${mail.customer_id}`} className="text-accent hover:text-accent/80">Zum Kunden</Link>}
                            </>
                          ) : (
                            <>
                              <span>Von: {mail.from_email}</span>
                              <span>An: {mail.to_email}</span>
                            </>
                          )}
                        </div>
                        {isSent ? (
                          <div className="font-sans text-sm text-foreground leading-relaxed [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: mail.body }} />
                        ) : (
                          <div className="font-sans text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                            {loadingBody === id
                              ? <div className="flex items-center gap-2 text-muted-foreground font-sans text-sm py-4"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Lade Inhalt…</div>
                              : mail.body_html
                              ? <div dangerouslySetInnerHTML={{ __html: mail.body_html }} />
                              : mail.body_text
                              ? <pre className="whitespace-pre-wrap font-sans text-sm">{mail.body_text}</pre>
                              : <p className="text-muted-foreground font-sans text-sm italic">Kein Inhalt</p>}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMails;
