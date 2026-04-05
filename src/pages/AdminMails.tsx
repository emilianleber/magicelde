import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor, { PLACEHOLDERS, replacePlaceholders } from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  FileText, LogOut, Mail, MailOpen, Paperclip,
  Plus, RefreshCw, Search, Send, User, X, Inbox, SendHorizonal,
  Trash2, AlertOctagon, Star, StarOff, CheckCheck, CheckSquare, Square,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";
const PAGE_SIZE = 50;

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
  is_deleted: boolean;
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

interface PortalCustomer { id: string; name: string | null; email: string | null; company?: string | null; }
interface MailTemplate { id: string; name: string; subject: string | null; body: string; }
interface CustomerDoc { id: string; name: string; type: string | null; file_url: string | null; }

const inputCls = "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const FOLDERS: { id: Folder; label: string; icon: any; imap: string }[] = [
  { id: "posteingang", label: "Posteingang", icon: Inbox,         imap: "INBOX" },
  { id: "gesendet",    label: "Gesendet",    icon: SendHorizonal, imap: "Sent"  },
  { id: "spam",        label: "Spam",        icon: AlertOctagon,  imap: "Spam"  },
  { id: "geloescht",   label: "Gelöscht",    icon: Trash2,        imap: "Trash" },
];

const AdminMails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeFolder, setActiveFolder] = useState<Folder>("posteingang");
  const [mails, setMails] = useState<InboxMail[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const [page, setPage] = useState(0);
  const [sentMails, setSentMails] = useState<PortalMessage[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loadingBody, setLoadingBody] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<InboxMail[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const [syncLogs, setSyncLogs] = useState<string[]>([]);

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

  // Multi-select
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  // Unread filter
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

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
      const [tplRes, sigRes, custRes, sentRes] = await Promise.all([
        supabase.from("portal_mail_templates").select("*").order("name"),
        supabase.from("portal_signature").select("*").limit(1).maybeSingle(),
        supabase.from("portal_customers").select("id,name,email,company").is("deleted_at", null).order("name"),
        supabase.from("portal_messages").select("id,created_at,customer_id,subject,body,from_email,to_email,customer:customer_id(name)").order("created_at", { ascending: false }),
      ]);
      if (!tplRes.error) setTemplates(tplRes.data || []);
      // email_templates als Vorlagen hinzufügen (ohne Duplikate)
      const { data: etData } = await supabase.from("email_templates").select("slug,name,betreff,inhalt").eq("aktiv", true).order("sortierung");
      if (etData) {
        const existingNames = new Set((tplRes.data || []).map((t: any) => t.name));
        const newTpls = etData.filter((t: any) => !existingNames.has(t.name));
        setTemplates((prev) => [...prev, ...newTpls.map((t: any) => ({ id: t.slug, name: t.name, subject: t.betreff, body: t.inhalt.replace(/\n/g, "<br>") }))]);
      }
      if (!sigRes.error && sigRes.data) setSignature(sigRes.data.body);
      if (!custRes.error) setCustomers(custRes.data || []);
      if (!sentRes.error) setSentMails(sentRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const loadUnreadCount = async () => {
    const { count } = await supabase
      .from("portal_inbox_mails")
      .select("*", { count: "exact", head: true })
      .eq("folder", "INBOX")
      .eq("is_read", false)
      .eq("is_deleted", false);
    setTotalUnreadCount(count || 0);
  };

  const loadMails = async (folder: Folder = activeFolder, p: number = page, unreadOnly: boolean = showUnreadOnly) => {
    const imapFolder = FOLDERS.find((f) => f.id === folder)?.imap || "INBOX";
    const from = p * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    let query = supabase
      .from("portal_inbox_mails")
      .select("*", { count: "exact" })
      .eq("folder", imapFolder)
      .eq("is_deleted", false);
    if (unreadOnly) query = query.eq("is_read", false);
    const { data, count } = await query
      .order("received_at", { ascending: false })
      .range(from, to);
    setMails((data as InboxMail[]) || []);
    if (count !== null) setTotalCount(count);
    await loadUnreadCount();
  };

  useEffect(() => {
    if (!isAdmin) return;
    setExpandedId(null);
    setPage(0);
    setSearch("");
    setSearchResults([]);
    setSelectedIds([]);
    setShowUnreadOnly(false);
    loadMails(activeFolder, 0, false);
  }, [activeFolder, isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    loadMails(activeFolder, page);
  }, [page]);

  useEffect(() => {
    if (!isAdmin) return;
    setPage(0);
    loadMails(activeFolder, 0, showUnreadOnly);
  }, [showUnreadOnly]);

  // DB search across all pages
  useEffect(() => {
    if (!isAdmin) return;
    const q = search.trim();
    if (!q) { setSearchResults([]); return; }

    const doSearch = async () => {
      setIsSearching(true);
      const imapFolder = FOLDERS.find((f) => f.id === activeFolder)?.imap || "INBOX";

      // Search by multiple fields — build OR filter
      const { data } = await supabase
        .from("portal_inbox_mails")
        .select("*")
        .eq("is_deleted", false)
        .or(`subject.ilike.%${q}%,from_email.ilike.%${q}%,from_name.ilike.%${q}%,to_email.ilike.%${q}%`)
        .order("received_at", { ascending: false })
        .limit(200);

      setSearchResults((data as InboxMail[]) || []);
      setIsSearching(false);
    };

    const timer = setTimeout(doSearch, 350);
    return () => clearTimeout(timer);
  }, [search, activeFolder, isAdmin]);

  const syncInbox = async () => {
    setSyncing(true); setSyncMsg(""); setSyncLogs([]);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/sync-inbox`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      const raw = await res.text();
      let data: any = {};
      try { data = JSON.parse(raw); } catch (_) {}
      if (data.logs) setSyncLogs(data.logs);
      if (!res.ok || !data.success) throw new Error(data.error || `HTTP ${res.status}`);
      setSyncMsg(`✓ ${data.synced} Mails synchronisiert`);
      await loadMails(activeFolder, page);
    } catch (err: any) {
      setSyncMsg("Fehler: " + (err.message || "Unbekannt"));
    }
    setSyncing(false);
  };

  const toggleStar = async (mail: InboxMail, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !mail.is_starred;
    await supabase.from("portal_inbox_mails").update({ is_starred: next }).eq("id", mail.id);
    const update = (prev: InboxMail[]) => prev.map((m) => m.id === mail.id ? { ...m, is_starred: next } : m);
    setMails(update); setSearchResults(update);
  };

  const toggleRead = async (mail: InboxMail, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !mail.is_read;
    await supabase.from("portal_inbox_mails").update({ is_read: next }).eq("id", mail.id);
    const update = (prev: InboxMail[]) => prev.map((m) => m.id === mail.id ? { ...m, is_read: next } : m);
    setMails(update); setSearchResults(update);
    await loadUnreadCount();
  };

  const deleteMail = async (mail: InboxMail, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from("portal_inbox_mails").update({ is_deleted: true }).eq("id", mail.id);
    setMails((prev) => prev.filter((m) => m.id !== mail.id));
    setSearchResults((prev) => prev.filter((m) => m.id !== mail.id));
    setTotalCount((n) => n - 1);
    if (expandedId === mail.id) setExpandedId(null);
    await loadUnreadCount();
  };

  const markAllRead = async () => {
    const imapFolder = FOLDERS.find((f) => f.id === activeFolder)?.imap || "INBOX";
    await supabase.from("portal_inbox_mails").update({ is_read: true }).eq("folder", imapFolder).eq("is_deleted", false);
    setMails((prev) => prev.map((m) => ({ ...m, is_read: true })));
    setSearchResults((prev) => prev.map((m) => ({ ...m, is_read: true })));
    setTotalUnreadCount(0);
  };

  const markRead = async (mail: InboxMail) => {
    if (mail.is_read) return;
    await supabase.from("portal_inbox_mails").update({ is_read: true }).eq("id", mail.id);
    const update = (prev: InboxMail[]) => prev.map((m) => m.id === mail.id ? { ...m, is_read: true } : m);
    setMails(update); setSearchResults(update);
    setTotalUnreadCount((n) => Math.max(0, n - 1));
  };

  const loadBody = async (mail: InboxMail) => {
    if (mail.body_html || mail.body_text) return;
    setLoadingBody(mail.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/fetch-mail-body`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ mail_id: mail.id, uid: mail.uid }),
      });
      const data = await res.json();
      if (res.ok) {
        const update = (prev: InboxMail[]) => prev.map((m) => m.id === mail.id ? { ...m, body_html: data.body_html, body_text: data.body_text } : m);
        setMails(update); setSearchResults(update);
      }
    } catch (_) {}
    setLoadingBody(null);
  };

  // Bulk actions
  const bulkMarkRead = async (read: boolean) => {
    if (!selectedIds.length) return;
    setBulkLoading(true);
    await supabase.from("portal_inbox_mails").update({ is_read: read }).in("id", selectedIds);
    const update = (prev: InboxMail[]) => prev.map((m) => selectedIds.includes(m.id) ? { ...m, is_read: read } : m);
    setMails(update); setSearchResults(update);
    setSelectedIds([]);
    await loadUnreadCount();
    setBulkLoading(false);
  };

  const bulkDelete = async () => {
    if (!selectedIds.length) return;
    setBulkLoading(true);
    await supabase.from("portal_inbox_mails").update({ is_deleted: true }).in("id", selectedIds);
    setMails((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
    setSearchResults((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
    setTotalCount((n) => n - selectedIds.length);
    setSelectedIds([]);
    await loadUnreadCount();
    setBulkLoading(false);
  };

  const handleCustomerSelect = async (customerId: string) => {
    setComposeCustomerId(customerId);
    setSelectedDocIds([]); setCustomerDocs([]);
    const c = customers.find((c) => c.id === customerId);
    if (c) { setComposeToEmail(c.email || ""); setComposeToName(c.name || ""); }
    if (customerId) {
      const { data } = await supabase.from("portal_documents").select("id,name,type,file_url").eq("customer_id", customerId);
      setCustomerDocs(data || []);
    }
    if (selectedTemplateId && c) {
      const tpl = templates.find((t) => t.id === selectedTemplateId);
      if (tpl) {
        setComposeSubject(replaceAllPlaceholders(tpl.subject || "", c));
        setComposeBody(replaceAllPlaceholders(tpl.body, c));
      }
    }
  };

  const replaceAllPlaceholders = (text: string, c?: PortalCustomer | null) => {
    const name = c?.name || "";
    const parts = name.split(" ");
    const vorname = parts[0] || "";
    const nachname = parts.slice(1).join(" ") || parts[0] || "";
    const anrede = (c as any)?.anrede || "";
    const begruessung = anrede ? `${anrede} ${nachname}` : name;
    return text
      .replace(/\{\{begruessung\}\}/gi, begruessung)
      .replace(/\{\{anrede\}\}/gi, anrede)
      .replace(/\{\{vorname\}\}/gi, vorname)
      .replace(/\{\{nachname\}\}/gi, nachname)
      .replace(/\{\{name\}\}/gi, name)
      .replace(/\{\{firma\}\}/gi, c?.company || "")
      .replace(/\{\{email\}\}/gi, c?.email || "")
      .replace(/\{name\}/gi, name)
      .replace(/\{firma\}/gi, c?.company || "")
      .replace(/\{email\}/gi, c?.email || "");
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (!templateId) return;
    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl) return;
    const c = customers.find((c) => c.id === composeCustomerId);
    if (tpl.subject) setComposeSubject(replaceAllPlaceholders(tpl.subject, c));
    setComposeBody(replaceAllPlaceholders(tpl.body, c));
  };

  const sendMail = async () => {
    if (!composeToEmail || !composeSubject || !composeBody) { setSendMsg("Empfänger, Betreff und Nachricht sind Pflichtfelder."); return; }
    setSending(true); setSendMsg("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const attachmentUrls = selectedDocIds.map((id) => customerDocs.find((d) => d.id === id)?.file_url).filter(Boolean);
      const res = await fetch(`${SUPABASE_URL}/functions/v1/send-customer-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ customer_id: composeCustomerId || null, subject: composeSubject, body: composeBody, to_email: composeToEmail, to_name: composeToName || null, attachment_urls: attachmentUrls }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sendefehler");
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

  const isSentFolder = activeFolder === "gesendet";
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const isSearchActive = !!search.trim();

  // Build display list
  const sentCombined: any[] = isSentFolder
    ? [
        ...mails.map((m) => ({ ...m, _type: "imap" })),
        ...sentMails.map((m) => ({ ...m, _type: "sent" })),
      ].sort((a, b) => {
        const da = new Date(a._type === "imap" ? a.received_at : a.created_at).getTime();
        const db = new Date(b._type === "imap" ? b.received_at : b.created_at).getTime();
        return db - da;
      })
    : [];

  let displayMails: any[];
  if (isSearchActive) {
    if (isSentFolder) {
      const q = search.toLowerCase();
      displayMails = sentCombined.filter((m: any) =>
        m.subject?.toLowerCase().includes(q) || m.to_email?.toLowerCase().includes(q) || (m.customer as any)?.name?.toLowerCase().includes(q)
      );
    } else {
      displayMails = showUnreadOnly ? searchResults.filter((m) => !m.is_read) : searchResults;
    }
  } else {
    displayMails = isSentFolder ? sentCombined : mails;
  }

  // For checkboxes – only IMAP mails support selection
  const selectableMails = displayMails.filter((m: any) => !m._type || m._type === "imap");
  const allVisible = selectableMails.length > 0 && selectableMails.every((m: any) => selectedIds.includes(m.id));

  const toggleSelectAll = () => {
    const ids = selectableMails.map((m: any) => m.id);
    if (allVisible) setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    else setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

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
        <div className={`mb-2 px-4 py-2.5 rounded-xl font-sans text-sm ${syncMsg.startsWith("Fehler") ? "bg-destructive/10 text-destructive" : "bg-green-100 text-green-800"}`}>
          {syncMsg}
        </div>
      )}
      {syncLogs.length > 0 && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-muted/30 border border-border/20 space-y-0.5">
          {syncLogs.map((l, i) => (
            <p key={i} className={`font-mono text-xs ${l.startsWith("ERROR") || l.startsWith("DB error") ? "text-destructive" : "text-muted-foreground"}`}>{l}</p>
          ))}
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
                {customers.map((c) => <option key={c.id} value={c.id}>{c.name}{(c as any).company ? ` · ${(c as any).company}` : ""}</option>)}
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

      {/* Mobile folder tabs (horizontal scroll) */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-2 mb-3 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {FOLDERS.map((f) => (
          <button
            key={f.id}
            onClick={() => { setActiveFolder(f.id); setExpandedId(null); setSelectMode(false); setSelectedIds([]); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
              activeFolder === f.id ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"
            }`}
          >
            <f.icon className="w-3.5 h-3.5 shrink-0" />
            <span>{f.label}</span>
            {f.id === "posteingang" && totalUnreadCount > 0 && (
              <span className="font-sans text-[10px] font-bold bg-accent text-white rounded-full min-w-[18px] h-4 px-1 flex items-center justify-center">
                {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Layout: folders sidebar + mail list */}
      <div className="flex gap-6">
        {/* Folder Sidebar — desktop only */}
        <div className="hidden md:block w-44 shrink-0 space-y-1">
          {FOLDERS.map((f) => (
            <button
              key={f.id}
              onClick={() => { setActiveFolder(f.id); setExpandedId(null); setSelectMode(false); setSelectedIds([]); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left relative ${
                activeFolder === f.id ? "bg-background shadow-sm text-foreground border border-border/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <f.icon className="w-4 h-4 shrink-0" />
              <span>{f.label}</span>
              {f.id === "posteingang" && totalUnreadCount > 0 && (
                <span className="ml-auto font-sans text-[10px] font-bold bg-accent text-white rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center shrink-0">
                  {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Mail List */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Alle Mails durchsuchen…"
                className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              {isSearching && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-accent border-t-transparent animate-spin" />}
            </div>

            {/* Unread filter toggle */}
            {!isSentFolder && (
              <button
                onClick={() => setShowUnreadOnly((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-colors ${showUnreadOnly ? "border-accent/40 bg-accent/10 text-accent font-semibold" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
              >
                <Mail className="w-4 h-4" />
                Ungelesen
                {showUnreadOnly && totalUnreadCount > 0 && (
                  <span className="ml-0.5 text-xs font-bold">{totalUnreadCount}</span>
                )}
              </button>
            )}

            {/* Select mode toggle */}
            {!isSentFolder && (
              <button
                onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); }}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-sm transition-colors ${selectMode ? "border-border/60 bg-muted/40 text-foreground" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
              >
                <CheckSquare className="w-4 h-4" />
                {selectMode ? "Abbrechen" : "Auswählen"}
              </button>
            )}

            {/* Bulk actions (visible in select mode with items selected) */}
            {selectMode && selectedIds.length > 0 && (
              <>
                <button onClick={() => bulkMarkRead(true)} disabled={bulkLoading} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-2 text-sm text-foreground hover:bg-muted/40 disabled:opacity-50">
                  <MailOpen className="w-4 h-4" /> Gelesen
                </button>
                <button onClick={() => bulkMarkRead(false)} disabled={bulkLoading} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-2 text-sm text-foreground hover:bg-muted/40 disabled:opacity-50">
                  <Mail className="w-4 h-4" /> Ungelesen
                </button>
                <button onClick={bulkDelete} disabled={bulkLoading} className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50">
                  <Trash2 className="w-4 h-4" /> Löschen ({selectedIds.length})
                </button>
              </>
            )}

            {/* Mark all read + pagination (only when not searching or in select mode) */}
            {!isSearchActive && totalUnreadCount > 0 && !isSentFolder && (
              <button onClick={markAllRead} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                <CheckCheck className="w-3.5 h-3.5" /> Alle gelesen
              </button>
            )}
            {!isSearchActive && totalCount > PAGE_SIZE && (
              <div className="flex items-center gap-1 ml-auto">
                <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{page + 1} / {totalPages}</span>
                <button onClick={() => setPage((p) => p + 1)} disabled={(page + 1) >= totalPages} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-30">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            {isSearchActive && (
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-auto">{displayMails.length} Treffer</span>
            )}
            {!isSearchActive && totalCount > 0 && !isSentFolder && (
              <span className="text-xs text-muted-foreground whitespace-nowrap">{totalCount} Mails</span>
            )}
          </div>

          {/* Select all row */}
          {selectMode && !isSentFolder && selectableMails.length > 0 && (
            <div className="flex items-center gap-3 mb-3 px-1">
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" checked={allVisible} onChange={toggleSelectAll} className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
                Alle auf dieser Seite auswählen
              </label>
              {selectedIds.length > 0 && <span className="text-sm text-muted-foreground">{selectedIds.length} ausgewählt</span>}
            </div>
          )}

          <div className="space-y-2">
            {displayMails.length === 0 ? (
              <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <Mail className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-sans text-sm text-muted-foreground">
                  {isSearchActive ? "Keine Mails gefunden." : activeFolder === "posteingang" ? "Klicke auf Sync um Mails zu laden." : "Keine Mails in diesem Ordner."}
                </p>
              </div>
            ) : (
              displayMails.map((mail: any) => {
                const isSent = mail._type === "sent";
                const isImapMail = !isSent;
                const id = mail.id;
                const isExpanded = expandedId === id;
                const isRead = isSent ? true : mail.is_read;
                const isSelected = selectedIds.includes(id);
                const subject = mail.subject || "(Kein Betreff)";
                const from = isSent
                  ? `An: ${(mail.customer as any)?.name || mail.to_email}`
                  : `Von: ${mail.from_name || mail.from_email || "Unbekannt"}`;
                const date = new Date(isSent ? mail.created_at : mail.received_at)
                  .toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });

                return (
                  <div key={id} className={`rounded-2xl border overflow-hidden transition-colors ${!isRead ? "bg-accent/5 border-accent/20" : "bg-muted/20 border-border/30"} ${isSelected ? "ring-2 ring-accent/40" : ""}`}>
                    <div
                      onClick={() => {
                        if (selectMode && isImapMail) {
                          setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
                          return;
                        }
                        setExpandedId(isExpanded ? null : id);
                        if (isImapMail) { markRead(mail); if (!isExpanded) loadBody(mail); }
                      }}
                      className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      {selectMode && isImapMail ? (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-accent" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`font-sans text-sm truncate ${!isRead ? "font-bold text-foreground" : "font-semibold text-foreground"}`}>{subject}</p>
                        <p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">{from}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isImapMail && !selectMode && (
                          <>
                            <button onClick={(e) => toggleRead(mail, e)} title={mail.is_read ? "Als ungelesen markieren" : "Als gelesen markieren"} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all">
                              {mail.is_read ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={(e) => toggleStar(mail, e)} title="Stern" className="p-1.5 rounded-lg text-muted-foreground hover:text-yellow-500 opacity-0 group-hover:opacity-100 transition-all">
                              {mail.is_starred ? <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> : <StarOff className="w-3.5 h-3.5" />}
                            </button>
                            <button onClick={(e) => deleteMail(mail, e)} title="Löschen" className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <span className="font-sans text-xs text-muted-foreground ml-1">{date}</span>
                        {!selectMode && (isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />)}
                      </div>
                    </div>

                    {isExpanded && !selectMode && (
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
                              <span>Von: {mail.from_name ? `${mail.from_name} <${mail.from_email}>` : mail.from_email}</span>
                              {mail.to_email && <span>An: {mail.to_email}</span>}
                            </>
                          )}
                        </div>
                        {isSent ? (
                          <div className="font-sans text-sm text-foreground leading-relaxed [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: mail.body }} />
                        ) : (
                          <div className="font-sans text-sm text-foreground leading-relaxed">
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
