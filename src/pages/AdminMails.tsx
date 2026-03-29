import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor, { PLACEHOLDERS, replacePlaceholders } from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  LogOut,
  Mail,
  Paperclip,
  Plus,
  Search,
  Send,
  User,
  X,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalMessage {
  id: string;
  created_at: string;
  customer_id: string | null;
  request_id: string | null;
  event_id: string | null;
  subject: string;
  body: string;
  from_email: string;
  to_email: string;
  status: string;
  read_by_customer: boolean;
  customer?: { name: string | null; email: string | null } | null;
}

interface PortalCustomer {
  id: string;
  name: string | null;
  email: string | null;
  firma?: string | null;
}

interface MailTemplate {
  id: string;
  name: string;
  subject: string | null;
  body: string;
}

interface CustomerDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const SUPABASE_URL = "https://rjhvqctjtgfpxzhnrozt.supabase.co";

const AdminMails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [templates, setTemplates] = useState<MailTemplate[]>([]);
  const [signature, setSignature] = useState("");
  const [customers, setCustomers] = useState<PortalCustomer[]>([]);

  // Compose state
  const [showCompose, setShowCompose] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [composeCustomerId, setComposeCustomerId] = useState("");
  const [composeToEmail, setComposeToEmail] = useState("");
  const [composeToName, setComposeToName] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [customerDocs, setCustomerDocs] = useState<CustomerDocument[]>([]);
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

    const loadData = async () => {
      setLoading(true);
      const { data: admin } = await supabase
        .from("portal_admins").select("*").eq("email", user.email!).maybeSingle();

      if (!admin) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const [messagesRes, templatesRes, signatureRes, customersRes] = await Promise.all([
        supabase.from("portal_messages").select("*, customer:customer_id(name, email)").order("created_at", { ascending: false }),
        supabase.from("portal_mail_templates").select("*").order("name"),
        supabase.from("portal_signature").select("*").limit(1).maybeSingle(),
        supabase.from("portal_customers").select("id, name, email, firma").order("name"),
      ]);

      if (!messagesRes.error) setMessages(messagesRes.data || []);
      if (!templatesRes.error) setTemplates(templatesRes.data || []);
      if (!signatureRes.error && signatureRes.data) setSignature(signatureRes.data.body);
      if (!customersRes.error) setCustomers(customersRes.data || []);

      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleCustomerSelect = async (customerId: string) => {
    setComposeCustomerId(customerId);
    setSelectedDocIds([]);
    setCustomerDocs([]);

    const c = customers.find((c) => c.id === customerId);
    if (c) {
      setComposeToEmail(c.email || "");
      setComposeToName(c.name || "");
    }

    if (customerId) {
      const { data } = await supabase
        .from("portal_documents")
        .select("id, name, type, file_url")
        .eq("customer_id", customerId);
      setCustomerDocs(data || []);
    }

    // Platzhalter in Body ersetzen wenn Template aktiv
    if (selectedTemplateId && c) {
      const tpl = templates.find((t) => t.id === selectedTemplateId);
      if (tpl) {
        const replaced = replacePlaceholders(tpl.body, { name: c.name, firma: c.firma, email: c.email });
        setComposeBody(replaced + (signature ? `<br><br>---<br>${signature}` : ""));
      }
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    if (!templateId) return;

    const tpl = templates.find((t) => t.id === templateId);
    if (!tpl) return;

    if (tpl.subject) setComposeSubject(tpl.subject);

    const customer = customers.find((c) => c.id === composeCustomerId);
    const replaced = replacePlaceholders(tpl.body, {
      name: customer?.name,
      firma: customer?.firma,
      email: customer?.email,
    });

    setComposeBody(replaced + (signature ? `<br><br>---<br>${signature}` : ""));
  };

  const toggleDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const openCompose = () => {
    setShowCompose(true);
    setSendMsg("");
    // Signatur vorladen wenn noch leer
    if (!composeBody && signature) {
      setComposeBody(`<br><br>---<br>${signature}`);
    }
  };

  const sendMail = async () => {
    if (!composeToEmail || !composeSubject || !composeBody) {
      setSendMsg("Empfänger, Betreff und Nachricht sind Pflichtfelder.");
      return;
    }

    setSending(true);
    setSendMsg("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Keine Session.");

      const attachmentUrls = selectedDocIds
        .map((id) => customerDocs.find((d) => d.id === id)?.file_url)
        .filter(Boolean);

      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/send-customer-mail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            customer_id: composeCustomerId || null,
            subject: composeSubject,
            body: composeBody,
            to_email: composeToEmail,
            to_name: composeToName || null,
            attachment_urls: attachmentUrls,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler beim Senden.");

      setMessages((prev) => [data.message, ...prev]);
      setShowCompose(false);
      setComposeCustomerId("");
      setComposeToEmail("");
      setComposeToName("");
      setComposeSubject("");
      setComposeBody("");
      setSelectedTemplateId("");
      setSelectedDocIds([]);
      setCustomerDocs([]);
    } catch (err: unknown) {
      setSendMsg(err instanceof Error ? err.message : "Fehler beim Senden.");
    } finally {
      setSending(false);
    }
  };

  const filtered = messages.filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.subject?.toLowerCase().includes(q) ||
      m.to_email?.toLowerCase().includes(q) ||
      m.customer?.name?.toLowerCase().includes(q) ||
      m.body?.toLowerCase().includes(q)
    );
  });

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Mails"
      subtitle="Alle gesendeten Nachrichten"
      actions={
        <div className="flex items-center gap-3">
          <button
            onClick={() => { if (showCompose) { setShowCompose(false); } else { openCompose(); } }}
            className="btn-primary inline-flex items-center gap-2"
          >
            {showCompose ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showCompose ? "Abbrechen" : "Neue Mail"}
          </button>
          <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      }
    >
      {/* ── Compose ── */}
      {showCompose && (
        <div className="mb-8 p-6 rounded-2xl bg-muted/20 border border-border/30 space-y-5">
          <h2 className="font-display text-base font-bold text-foreground">Neue Mail verfassen</h2>

          {/* Vorlage + Kunde */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Vorlage</label>
              <select value={selectedTemplateId} onChange={(e) => handleTemplateSelect(e.target.value)} className={inputCls}>
                <option value="">— Vorlage wählen —</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Kunde (optional)</label>
              <select value={composeCustomerId} onChange={(e) => handleCustomerSelect(e.target.value)} className={inputCls}>
                <option value="">— Kunde wählen —</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}{c.firma ? ` · ${c.firma}` : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">An (E-Mail) *</label>
              <input value={composeToEmail} onChange={(e) => setComposeToEmail(e.target.value)} placeholder="empfaenger@beispiel.de" className={inputCls} />
            </div>
          </div>

          {/* Betreff */}
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Betreff *</label>
            <input value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} placeholder="Betreff" className={inputCls} />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Nachricht *</label>
            <RichTextEditor
              value={composeBody}
              onChange={setComposeBody}
              placeholder="Nachricht schreiben…"
              minHeight="240px"
            />
          </div>

          {/* Dokument-Anhänge */}
          {customerDocs.length > 0 && (
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                <Paperclip className="w-3.5 h-3.5 inline mr-1" />
                Anhänge aus Kundenkonto
              </label>
              <div className="space-y-2">
                {customerDocs.map((doc) => (
                  <label key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/20 cursor-pointer hover:border-accent/30 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedDocIds.includes(doc.id)}
                      onChange={() => toggleDoc(doc.id)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <FileText className="w-4 h-4 text-accent shrink-0" />
                    <div className="min-w-0">
                      <p className="font-sans text-sm text-foreground truncate">{doc.name}</p>
                      {doc.type && <p className="font-sans text-xs text-muted-foreground">{doc.type}</p>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {sendMsg && <p className="font-sans text-sm text-red-500">{sendMsg}</p>}

          <button onClick={sendMail} disabled={sending} className="btn-primary disabled:opacity-60">
            <Send className="w-4 h-4 mr-2" />
            {sending ? "Wird gesendet…" : "Mail senden"}
          </button>
        </div>
      )}

      {/* ── Suche ── */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Suche nach Betreff, Empfänger, Kunde…"
          className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {/* ── Liste ── */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
            <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-sans text-sm text-muted-foreground">
              {search ? "Keine Treffer." : "Noch keine Mails gesendet."}
            </p>
          </div>
        ) : (
          filtered.map((msg) => (
            <div key={msg.id} className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-foreground truncate">{msg.subject}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      An: {msg.customer?.name || msg.to_email}
                      {msg.customer_id && (
                        <Link
                          to={`/admin/customers/${msg.customer_id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="ml-2 text-accent hover:text-accent/80"
                        >
                          Kundenkonto
                        </Link>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-sans text-xs text-muted-foreground">
                    {new Date(msg.created_at).toLocaleDateString("de-DE", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                  {expandedId === msg.id
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {expandedId === msg.id && (
                <div className="px-4 pb-4 pt-1 border-t border-border/20">
                  <div className="flex gap-6 text-xs text-muted-foreground mb-3 font-sans flex-wrap">
                    <span>Von: {msg.from_email}</span>
                    <span>An: {msg.to_email}</span>
                    {msg.request_id && (
                      <Link to={`/admin/requests/${msg.request_id}`} className="text-accent hover:text-accent/80">Zur Anfrage</Link>
                    )}
                    {msg.event_id && (
                      <Link to={`/admin/events/${msg.event_id}`} className="text-accent hover:text-accent/80">Zum Event</Link>
                    )}
                  </div>
                  <div
                    className="font-sans text-sm text-foreground leading-relaxed [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5"
                    dangerouslySetInnerHTML={{ __html: msg.body }}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMails;
