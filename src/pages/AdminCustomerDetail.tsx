import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Mail,
  MapPin,
  Plus,
  Save,
  Send,
  Theater,
  Users,
  Building2,
  X,
  ExternalLink,
  Pencil,
  MessageCircle,
  Check,
  ChevronRight,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalCustomer {
  id: string;
  name: string | null;
  company?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
  created_at?: string | null;
  rechnungs_strasse?: string | null;
  rechnungs_plz?: string | null;
  rechnungs_ort?: string | null;
  rechnungs_land?: string | null;
}

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  email: string;
  name?: string | null;
  deleted_at?: string | null;
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
  deleted_at?: string | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
  created_at: string;
}

type Tab = "anfragen" | "events" | "dokumente" | "mails";

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const smallInputCls =
  "w-full rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const formatEventStatusLabel = (status?: string | null) => {
  switch (status) {
    case "in_planung": case "planning": return "In Planung";
    case "details_offen": return "Details offen";
    case "vertrag_gesendet": return "Vertrag gesendet";
    case "vertrag_bestaetigt": return "Vertrag bestätigt";
    case "rechnung_gesendet": return "Rechnung gesendet";
    case "rechnung_bezahlt": case "confirmed": return "Bestätigt";
    case "event_erfolgt": case "completed": return "Event erfolgt";
    case "storniert": case "cancelled": return "Storniert";
    default: return status || "Offen";
  }
};

const formatRequestStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu": return "Neu";
    case "in_bearbeitung": return "In Bearbeitung";
    case "angebot_gesendet": return "Angebot gesendet";
    case "warte_auf_kunde": return "Warte auf Kunde";
    case "bestätigt": return "Bestätigt";
    case "abgelehnt": return "Abgelehnt";
    case "archiviert": return "Archiviert";
    default: return status || "Offen";
  }
};

const AdminCustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [customerMails, setCustomerMails] = useState<any[]>([]);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [firma, setFirma] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [kundennummer, setKundennummer] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState<Tab>("anfragen");

  // Mail compose
  const [showCompose, setShowCompose] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [sending, setSending] = useState(false);
  const [mailMsg, setMailMsg] = useState("");

  // Expanded mail
  const [expandedMailId, setExpandedMailId] = useState<string | null>(null);
  const [loadingMailBody, setLoadingMailBody] = useState<string | null>(null);

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
    if (!user?.email || !id) return;
    const loadData = async () => {
      setLoading(true);
      const { data: adminEntry } = await supabase
        .from("portal_admins").select("id").eq("email", user.email!).maybeSingle();
      if (!adminEntry) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const { data: cust, error: custErr } = await supabase
        .from("portal_customers").select("*").eq("id", id).single();

      if (custErr || !cust) { setLoading(false); return; }

      setCustomer(cust);
      setName(cust.name || "");
      setFirma(cust.company || "");
      setEmail(cust.email || "");
      setPhone(cust.phone || "");
      setKundennummer(cust.kundennummer || "");

      const [reqRes, evtRes, docRes, imapRes, sentRes] = await Promise.all([
        supabase.from("portal_requests").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
        supabase.from("portal_events").select("*").eq("customer_id", id).order("event_date", { ascending: true }),
        supabase.from("portal_documents").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
        cust.email
          ? supabase.from("portal_inbox_mails").select("*").eq("from_email", cust.email).eq("is_deleted", false).order("received_at", { ascending: false }).limit(50)
          : Promise.resolve({ data: [], error: null }),
        supabase.from("portal_messages").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
      ]);

      if (!reqRes.error) setRequests(reqRes.data || []);
      if (!evtRes.error) setEvents(evtRes.data || []);
      if (!docRes.error) setDocuments(docRes.data || []);

      const received = (imapRes.data || []).map((m: any) => ({ ...m, _type: "received", _date: m.received_at }));
      const sent = (sentRes.data || []).map((m: any) => ({ ...m, _type: "sent", _date: m.created_at }));
      setCustomerMails([...received, ...sent].sort((a, b) => new Date(b._date).getTime() - new Date(a._date).getTime()));

      setLoading(false);
    };
    loadData();
  }, [user, id]);

  const saveCustomer = async () => {
    if (!customer) return;
    setSaving(true);
    setSaveMsg("");
    const { error } = await supabase
      .from("portal_customers")
      .update({ name: name.trim(), company: firma.trim() || null, email: email.trim().toLowerCase(), phone: phone.trim() || null, kundennummer: kundennummer.trim() || null })
      .eq("id", customer.id);
    if (error) { setSaveMsg("Fehler beim Speichern."); setSaving(false); return; }
    setCustomer({ ...customer, name: name.trim(), company: firma.trim() || null, email: email.trim().toLowerCase(), phone: phone.trim() || null, kundennummer: kundennummer.trim() || null });
    setSaveMsg("Gespeichert ✓");
    setSaving(false);
    setTimeout(() => { setSaveMsg(""); setEditMode(false); }, 1500);
  };

  const sendMail = async () => {
    if (!customer || !composeSubject || !composeBody) {
      setMailMsg("Betreff und Nachricht sind Pflichtfelder.");
      return;
    }
    setSending(true);
    setMailMsg("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/send-customer-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            customer_id: customer.id,
            subject: composeSubject,
            body: composeBody,
            to_email: customer.email,
            to_name: customer.name,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler");
      setMailMsg("Mail gesendet ✓");
      setComposeSubject("");
      setComposeBody("");
      setTimeout(() => { setShowCompose(false); setMailMsg(""); }, 1500);
    } catch (err: any) {
      setMailMsg(err.message || "Fehler beim Senden.");
    }
    setSending(false);
  };

  const fetchMailBody = async (mail: any) => {
    if (mail.body_html || mail.body_text || mail._type === "sent") return;
    setLoadingMailBody(mail.id);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/fetch-mail-body",
        { method: "POST", headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` }, body: JSON.stringify({ mail_id: mail.id, uid: mail.uid }) }
      );
      const result = await res.json();
      if (result.body_html || result.body_text) {
        setCustomerMails((prev) => prev.map((m) => m.id === mail.id ? { ...m, ...result } : m));
      }
    } catch (_) {}
    setLoadingMailBody(null);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;
  if (!customer) return <div className="pt-28 text-center">Kunde nicht gefunden</div>;

  const activeRequests = requests.filter((r) => !r.deleted_at);
  const activeEvents = events.filter((e) => !e.deleted_at);
  const mailCount = customerMails.length;

  return (
    <AdminLayout
      title={customer.name || "Kunde"}
      subtitle={customer.company || customer.email || ""}
      actions={
        <div className="flex items-center gap-2">
          <a
            href={`https://magicel.de/kundenportal?preview=${customer.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border/30 rounded-xl px-3 py-2 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Kundenansicht
          </a>
        </div>
      }
    >
      {/* Back */}
      <Link to="/admin/customers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5">
        <ArrowLeft className="w-4 h-4" />
        Alle Kunden
      </Link>

      {/* Customer header card */}
      <div className="p-5 rounded-2xl bg-muted/20 border border-border/30 mb-5">
        {!editMode ? (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center shrink-0 text-lg font-bold text-background">
                {(customer.name || "?")[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-foreground">{customer.name || "Unbekannt"}</h2>
                  {customer.company && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-background/60 border border-border/20 text-muted-foreground">
                      <Building2 className="w-3 h-3" /> {customer.company}
                    </span>
                  )}
                  {customer.kundennummer && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-background/60 border border-border/20 text-muted-foreground">
                      #{customer.kundennummer}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                  {customer.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{customer.email}</span>}
                  {customer.phone && <span>{customer.phone}</span>}
                </div>
                {customer.created_at && (
                  <p className="text-xs text-muted-foreground/60 mt-1.5">Kunde seit {new Date(customer.created_at).toLocaleDateString("de-DE")}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground border border-border/30 rounded-xl px-3 py-2 transition-colors shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" /> Bearbeiten
            </button>
          </div>
        ) : (
          /* Edit form */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Kundendaten bearbeiten</h3>
              <button onClick={() => { setEditMode(false); setSaveMsg(""); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={smallInputCls} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Firma</label>
                <input value={firma} onChange={(e) => setFirma(e.target.value)} className={smallInputCls} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">E-Mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={smallInputCls} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Telefon</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={smallInputCls} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Kundennummer</label>
                <input value={kundennummer} onChange={(e) => setKundennummer(e.target.value)} className={smallInputCls} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={saveCustomer} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity">
                <Save className="w-3.5 h-3.5" /> {saving ? "Speichert…" : "Speichern"}
              </button>
              {saveMsg && <span className="text-sm text-green-600">{saveMsg}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Stats + Actions row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        {/* Stats */}
        <div className="flex gap-3 flex-1 flex-wrap">
          {[
            { label: "Anfragen", value: activeRequests.length, tab: "anfragen" as Tab, icon: MessageCircle },
            { label: "Events", value: activeEvents.length, tab: "events" as Tab, icon: Calendar },
            { label: "Dokumente", value: documents.length, tab: "dokumente" as Tab, icon: FileText },
            { label: "Mails", value: mailCount, tab: "mails" as Tab, icon: Mail },
          ].map((s) => (
            <button
              key={s.tab}
              onClick={() => setActiveTab(s.tab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                activeTab === s.tab
                  ? "bg-foreground text-background border-foreground"
                  : "bg-muted/20 border-border/30 text-muted-foreground hover:text-foreground hover:border-accent/20"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.label}
              <span className={`text-xs font-bold ${activeTab === s.tab ? "text-background/80" : ""}`}>{s.value}</span>
            </button>
          ))}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2">
          <Link
            to={`/admin/requests/new?customerId=${customer.id}`}
            className="inline-flex items-center gap-1.5 text-sm border border-border/30 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:border-accent/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Anfrage
          </Link>
          <Link
            to={`/admin/events/new?customerId=${customer.id}`}
            className="inline-flex items-center gap-1.5 text-sm border border-border/30 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:border-accent/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Event
          </Link>
          <button
            onClick={() => { setShowCompose(true); setActiveTab("mails"); }}
            className="inline-flex items-center gap-1.5 text-sm bg-foreground text-background rounded-xl px-3 py-2 hover:opacity-80 transition-opacity"
          >
            <Send className="w-4 h-4" /> Mail
          </button>
        </div>
      </div>

      {/* Mail compose panel */}
      {showCompose && (
        <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 mb-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">Mail an {customer.name || customer.email}</p>
            <button onClick={() => { setShowCompose(false); setMailMsg(""); }} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>
          <input
            value={composeSubject}
            onChange={(e) => setComposeSubject(e.target.value)}
            placeholder="Betreff"
            className={smallInputCls}
          />
          <textarea
            value={composeBody}
            onChange={(e) => setComposeBody(e.target.value)}
            placeholder="Nachricht…"
            rows={5}
            className={smallInputCls + " resize-none"}
          />
          {mailMsg && <p className={`text-xs ${mailMsg.includes("✓") ? "text-green-600" : "text-red-500"}`}>{mailMsg}</p>}
          <button onClick={sendMail} disabled={sending} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity">
            <Send className="w-3.5 h-3.5" /> {sending ? "Sendet…" : "Senden"}
          </button>
        </div>
      )}

      {/* Tab content */}
      <div>
        {/* ANFRAGEN */}
        {activeTab === "anfragen" && (
          <div>
            {activeRequests.length === 0 ? (
              <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
                <MessageCircle className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">Noch keine Anfragen.</p>
                <Link
                  to={`/admin/requests/new?customerId=${customer.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  <Plus className="w-4 h-4" /> Erste Anfrage erstellen
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {activeRequests.map((req) => (
                  <Link
                    key={req.id}
                    to={`/admin/requests/${req.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 hover:bg-muted/30 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{req.anlass || "Anfrage"}</span>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/20">
                          {formatRequestStatusLabel(req.status)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                        {req.datum && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(req.datum).toLocaleDateString("de-DE")}</span>}
                        {req.ort && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{req.ort}</span>}
                        {req.gaeste && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{req.gaeste} Gäste</span>}
                        <span className="text-muted-foreground/50">{new Date(req.created_at).toLocaleDateString("de-DE")}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EVENTS */}
        {activeTab === "events" && (
          <div>
            {activeEvents.length === 0 ? (
              <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
                <Calendar className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">Noch keine Events.</p>
                <Link
                  to={`/admin/events/new?customerId=${customer.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  <Plus className="w-4 h-4" /> Erstes Event erstellen
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {activeEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    to={`/admin/events/${evt.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 hover:bg-muted/30 transition-all group"
                  >
                    {evt.event_date && (
                      <div className="shrink-0 w-11 text-center">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                          {new Date(evt.event_date).toLocaleDateString("de-DE", { month: "short" })}
                        </p>
                        <p className="text-lg font-bold text-foreground leading-none">{new Date(evt.event_date).getDate()}</p>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">{evt.title}</span>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/20">
                          {formatEventStatusLabel(evt.status)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                        {evt.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.location}</span>}
                        {evt.format && <span className="flex items-center gap-1"><Theater className="w-3 h-3" />{evt.format}</span>}
                        {evt.guests && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{evt.guests} Gäste</span>}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DOKUMENTE */}
        {activeTab === "dokumente" && (
          <div>
            {documents.length === 0 ? (
              <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
                <FileText className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Keine Dokumente vorhanden.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/30">
                    <FileText className="w-5 h-5 text-accent shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type || "Dokument"} · {new Date(doc.created_at).toLocaleDateString("de-DE")}</p>
                    </div>
                    {doc.file_url && (
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:text-accent/80 shrink-0">
                        Öffnen
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MAILS */}
        {activeTab === "mails" && (
          <div>
            {customerMails.length === 0 ? (
              <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
                <Mail className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">Kein Mailverkehr mit diesem Kunden.</p>
                <button
                  onClick={() => setShowCompose(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  <Send className="w-4 h-4" /> Erste Mail senden
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                {customerMails.map((mail) => {
                  const isExpanded = expandedMailId === mail.id;
                  const date = new Date(mail._date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
                  const isSent = mail._type === "sent";
                  return (
                    <div key={mail.id} className="rounded-xl border border-border/30 overflow-hidden">
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 bg-background/40 hover:bg-muted/30 transition-colors text-left"
                        onClick={() => {
                          const newId = isExpanded ? null : mail.id;
                          setExpandedMailId(newId);
                          if (newId) fetchMailBody(mail);
                        }}
                      >
                        <div className={`shrink-0 w-1.5 h-1.5 rounded-full ${isSent ? "bg-accent" : "bg-blue-400"}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] uppercase tracking-widest font-semibold ${isSent ? "text-accent" : "text-blue-500"}`}>
                              {isSent ? "Gesendet" : "Empfangen"}
                            </span>
                            <span className="text-xs text-muted-foreground">{date}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground truncate">{mail.subject || "(Kein Betreff)"}</p>
                        </div>
                        <span className="shrink-0 text-muted-foreground text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </button>
                      {isExpanded && (
                        <div className="px-4 py-4 bg-background/20 border-t border-border/20">
                          {loadingMailBody === mail.id ? (
                            <p className="text-sm text-muted-foreground animate-pulse">Lädt…</p>
                          ) : mail.body_html ? (
                            <div className="prose prose-sm max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: mail.body_html }} />
                          ) : (
                            <pre className="text-sm text-foreground whitespace-pre-wrap">{mail.body_text || mail.body || "Kein Inhalt."}</pre>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerDetail;
