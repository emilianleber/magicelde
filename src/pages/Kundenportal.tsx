import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  FileText,
  MessageCircle,
  CheckCircle2,
  Circle,
  ArrowRight,
  Download,
  LogOut,
  User,
  LayoutDashboard,
  FolderOpen,
  Phone,
  ChevronDown,
  ChevronUp,
  Mail,
  MapPin,
  Users,
  Theater,
  Settings,
  Save,
  CalendarPlus,
  ArrowLeft,
  Eye,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalCustomer {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
  kundennummer: string | null;
  rechnungs_strasse: string | null;
  rechnungs_plz: string | null;
  rechnungs_ort: string | null;
  rechnungs_land: string | null;
}

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  status: string | null;
  created_at: string;
  event_id?: string | null;
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
  request_id?: string | null;
  customer_id?: string | null;
  details_status?: string | null;
  contract_status?: string | null;
  invoice_status?: string | null;
  notes?: string | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string;
  file_url: string | null;
  created_at: string;
}

interface PortalMessage {
  id: string;
  created_at: string;
  subject: string;
  body: string;
  read_by_customer: boolean;
}

type Tab = "dashboard" | "events" | "documents" | "requests" | "nachrichten" | "einstellungen" | "contact";

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu": return "Neu";
    case "in_bearbeitung": return "In Bearbeitung";
    case "details_besprechen": return "Details besprechen";
    case "angebot_gesendet": return "Angebot gesendet";
    case "warte_auf_kunde": return "Warte auf Rückmeldung";
    case "gebucht": return "Gebucht";
    case "bestätigt": return "Bestätigt";
    case "abgelehnt": return "Abgelehnt";
    case "archiviert": return "Archiviert";
    default: return status || "Offen";
  }
};

const formatStatusClasses = (status?: string | null) => {
  switch (status) {
    case "neu": return "text-accent bg-accent/10";
    case "in_bearbeitung":
    case "details_besprechen":
    case "angebot_gesendet":
    case "warte_auf_kunde": return "text-foreground bg-muted";
    case "gebucht":
    case "bestätigt": return "text-green-700 bg-green-100";
    case "abgelehnt": return "text-destructive bg-destructive/10";
    default: return "text-muted-foreground bg-muted";
  }
};

const formatEventStatusLabel = (status?: string | null) => {
  switch (status) {
    case "in_planung": return "In Planung";
    case "details_offen": return "Details offen";
    case "vertrag_gesendet": return "Vertrag gesendet";
    case "vertrag_bestaetigt": return "Vertrag bestätigt";
    case "rechnung_gesendet": return "Rechnung gesendet";
    case "rechnung_bezahlt": return "Rechnung bezahlt";
    case "event_erfolgt": return "Event erfolgt";
    case "storniert": return "Storniert";
    default: return status || "Offen";
  }
};

const formatEventStatusClasses = (status?: string | null) => {
  switch (status) {
    case "in_planung":
    case "details_offen": return "text-accent bg-accent/10";
    case "vertrag_gesendet":
    case "vertrag_bestaetigt":
    case "rechnung_gesendet": return "text-foreground bg-muted";
    case "rechnung_bezahlt":
    case "event_erfolgt": return "text-green-700 bg-green-100";
    case "storniert": return "text-destructive bg-destructive/10";
    default: return "text-muted-foreground bg-muted";
  }
};

const buildTimeline = (request: BookingRequest | null, event: PortalEvent | null) => {
  const steps: { label: string; done: boolean; hint?: string }[] = [];

  steps.push({ label: "Anfrage eingegangen", done: !!request, hint: request?.created_at ? new Date(request.created_at).toLocaleDateString("de-DE") : undefined });
  steps.push({ label: "In Bearbeitung", done: ["in_bearbeitung", "details_besprechen", "angebot_gesendet", "warte_auf_kunde"].includes(request?.status || "") || !!event });
  steps.push({ label: "Angebot erhalten", done: ["angebot_gesendet", "warte_auf_kunde"].includes(request?.status || "") || !!event });

  if (event) {
    steps.push({ label: "Event gebucht", done: true, hint: event.event_date ? new Date(event.event_date).toLocaleDateString("de-DE") : undefined });
    steps.push({ label: "Details geklärt", done: event.details_status === "erledigt" });
    steps.push({ label: "Vertrag", done: event.contract_status === "erledigt" });
    steps.push({ label: "Rechnung", done: event.invoice_status === "erledigt" });
    steps.push({ label: "Event durchgeführt", done: event.status === "event_erfolgt" });
  } else {
    steps.push({ label: "Buchung", done: false });
  }

  return steps;
};

const downloadICS = (event: PortalEvent) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  };

  const dateStart = event.event_date ? formatDate(event.event_date) : formatDate(new Date().toISOString());
  const dateEnd = dateStart;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Magicel//Kundenportal//DE",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@magicel.de`,
    `DTSTART;VALUE=DATE:${dateStart}`,
    `DTEND;VALUE=DATE:${dateEnd}`,
    `SUMMARY:${event.title} – Emilian Leber, Zauberer`,
    event.location ? `LOCATION:${event.location}` : "",
    `DESCRIPTION:Zauberer & Showkünstler Emilian Leber\\nwww.magicel.de`,
    `URL:https://www.magicel.de`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

const Kundenportal = () => {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [messages, setMessages] = useState<PortalMessage[]>([]);
  const [imapMails, setImapMails] = useState<any[]>([]);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(true);

  // Settings form state
  const [settingsDraft, setSettingsDraft] = useState({
    name: "", company: "", phone: "",
    rechnungs_strasse: "", rechnungs_plz: "", rechnungs_ort: "", rechnungs_land: "Deutschland",
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewCustomerId = searchParams.get("preview");
  const [isAdminPreview, setIsAdminPreview] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        if (!previewCustomerId) navigate("/kundenportal/login");
        return;
      }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        if (!previewCustomerId) navigate("/kundenportal/login");
        return;
      }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate, previewCustomerId]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      setLoading(true);

      // Admin preview mode: load customer by ID directly
      if (previewCustomerId) {
        const { data: adminEntry } = await supabase.from("portal_admins").select("id").eq("email", user.email).maybeSingle();
        if (adminEntry) {
          setIsAdminPreview(true);
          const { data: cust } = await supabase.from("portal_customers").select("*").eq("id", previewCustomerId).maybeSingle();
          if (cust) {
            setCustomer(cust);
            const [eventsRes, docsRes, msgsRes, imapRes] = await Promise.all([
              supabase.from("portal_events").select("*").eq("customer_id", cust.id),
              supabase.from("portal_documents").select("*").eq("customer_id", cust.id),
              supabase.from("portal_messages").select("id, created_at, subject, body, read_by_customer").eq("customer_id", cust.id).order("created_at", { ascending: false }),
              cust.email ? supabase.from("portal_inbox_mails").select("id, uid, subject, received_at, body_text, body_html").eq("from_email", cust.email).eq("is_deleted", false).order("received_at", { ascending: false }).limit(100) : Promise.resolve({ data: [] }),
            ]);
            if (eventsRes.data) setEvents(eventsRes.data);
            if (docsRes.data) setDocuments(docsRes.data);
            if (msgsRes.data) setMessages(msgsRes.data);
            if (imapRes.data) setImapMails(imapRes.data);
            const { data: requestsData } = await supabase.from("portal_requests").select("*").eq("email", cust.email).order("created_at", { ascending: false });
            if (requestsData) { setRequests(requestsData); if (requestsData.length > 0) setExpandedRequestId(requestsData[0].id); }
          }
          setLoading(false);
          return;
        }
      }

      if (!user.email) { setLoading(false); return; }

      let cust: any = null;
      const { data: byUserId } = await supabase.from("portal_customers").select("*").eq("user_id", user.id).maybeSingle();
      cust = byUserId;

      if (!cust) {
        const { data: byEmail } = await supabase.from("portal_customers").select("*").eq("email", user.email).maybeSingle();
        if (byEmail) {
          const { data: linked } = await supabase.from("portal_customers").update({ user_id: user.id }).eq("id", byEmail.id).select("*").single();
          cust = linked;
        }
      }

      if (cust) {
        setCustomer(cust);
        const [eventsRes, docsRes, msgsRes, imapRes] = await Promise.all([
          supabase.from("portal_events").select("*").eq("customer_id", cust.id),
          supabase.from("portal_documents").select("*").eq("customer_id", cust.id),
          supabase.from("portal_messages").select("id, created_at, subject, body, read_by_customer").eq("customer_id", cust.id).order("created_at", { ascending: false }),
          cust.email ? supabase.from("portal_inbox_mails").select("id, uid, subject, received_at, body_text, body_html").eq("from_email", cust.email).eq("is_deleted", false).order("received_at", { ascending: false }).limit(100) : Promise.resolve({ data: [] }),
        ]);
        if (eventsRes.data) setEvents(eventsRes.data);
        if (docsRes.data) setDocuments(docsRes.data);
        if (msgsRes.data) setMessages(msgsRes.data);
        if (imapRes.data) setImapMails(imapRes.data);
      }

      const { data: requestsData } = await supabase
        .from("portal_requests").select("*").eq("email", user.email).order("created_at", { ascending: false });
      if (requestsData) {
        setRequests(requestsData);
        if (requestsData.length > 0) setExpandedRequestId(requestsData[0].id);
      }

      setLoading(false);
    };
    fetchData();
  }, [user, previewCustomerId]);

  // Sync settings draft when customer loads
  useEffect(() => {
    if (customer) {
      setSettingsDraft({
        name: customer.name || "",
        company: customer.company || "",
        phone: customer.phone || "",
        rechnungs_strasse: customer.rechnungs_strasse || "",
        rechnungs_plz: customer.rechnungs_plz || "",
        rechnungs_ort: customer.rechnungs_ort || "",
        rechnungs_land: customer.rechnungs_land || "Deutschland",
      });
    }
  }, [customer]);

  // Mark messages as read when nachrichten tab opened
  useEffect(() => {
    if (activeTab === "nachrichten" && customer?.id) {
      const unread = messages.filter((m) => !m.read_by_customer).map((m) => m.id);
      if (unread.length > 0) {
        supabase.from("portal_messages").update({ read_by_customer: true }).in("id", unread).then(() => {
          setMessages((prev) => prev.map((m) => ({ ...m, read_by_customer: true })));
        });
      }
    }
  }, [activeTab]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const saveSettings = async () => {
    if (!customer?.id) return;
    if (!settingsDraft.name.trim()) {
      setSettingsMsg("Name ist Pflichtfeld.");
      return;
    }
    setSettingsSaving(true);
    setSettingsMsg("");
    const { data, error } = await supabase
      .from("portal_customers")
      .update({
        name: settingsDraft.name.trim(),
        company: settingsDraft.company.trim() || null,
        phone: settingsDraft.phone.trim() || null,
        rechnungs_strasse: settingsDraft.rechnungs_strasse.trim() || null,
        rechnungs_plz: settingsDraft.rechnungs_plz.trim() || null,
        rechnungs_ort: settingsDraft.rechnungs_ort.trim() || null,
        rechnungs_land: settingsDraft.rechnungs_land.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", customer.id)
      .select("*")
      .single();
    if (error) {
      setSettingsMsg("Fehler beim Speichern.");
    } else {
      setCustomer(data);
      setSettingsMsg("Gespeichert!");
      setTimeout(() => setSettingsMsg(""), 3000);
    }
    setSettingsSaving(false);
  };

  if (!user || loading) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground font-sans">Wird geladen…</div>
        </section>
      </PageLayout>
    );
  }

  const displayName = customer?.name || user.email?.split("@")[0] || "Kunde";
  const kundennummer = customer?.kundennummer || "";
  const currentRequest = requests[0] || null;
  const currentEvent = events.find((e) => e.request_id === currentRequest?.id) || events[0] || null;
  const timelineSteps = buildTimeline(currentRequest, currentEvent);
  const currentStepIndex = timelineSteps.findIndex((s) => !s.done);
  const progress = timelineSteps.length > 0 ? Math.round((timelineSteps.filter((s) => s.done).length / timelineSteps.length) * 100) : 0;
  const unreadCount = messages.filter((m) => !m.read_by_customer).length;

  const tabs: { id: Tab; label: string; icon: any; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar, badge: events.length || undefined },
    { id: "documents", label: "Dokumente", icon: FolderOpen, badge: documents.length || undefined },
    { id: "requests", label: "Anfragen", icon: MessageCircle },
    { id: "nachrichten", label: "Nachrichten", icon: Mail, badge: unreadCount || undefined },
    { id: "einstellungen", label: "Einstellungen", icon: Settings },
    { id: "contact", label: "Kontakt", icon: Phone },
  ];

  return (
    <PageLayout>
      {/* Admin preview banner */}
      {isAdminPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 px-4 py-2 flex items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-2 font-sans text-sm font-medium">
            <Eye className="w-4 h-4 shrink-0" />
            Admin-Vorschau: Kundensicht von <strong>{customer?.name || customer?.email || "Kunde"}</strong>
          </div>
          <button
            onClick={() => navigate(`/admin/customers/${previewCustomerId}`)}
            className="flex items-center gap-1.5 font-sans text-sm font-semibold hover:opacity-80 transition-opacity shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zur Adminansicht
          </button>
        </div>
      )}
      <section className={`min-h-screen pb-16 ${isAdminPreview ? "pt-36" : "pt-28"}`}>
        <div className="container px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">Kundenportal</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Willkommen, {displayName}
              </h1>
              {kundennummer && (
                <p className="font-sans text-sm text-muted-foreground mt-1">Kundennummer: {kundennummer}</p>
              )}
            </div>
            {!isAdminPreview && (
              <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="w-4 h-4" /> Abmelden
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-muted/50 rounded-2xl p-1 mb-10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] font-bold text-white flex items-center justify-center">
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Events", value: events.length, icon: Calendar, onClick: () => setActiveTab("events") },
                  { label: "Dokumente", value: documents.length, icon: FileText, onClick: () => setActiveTab("documents") },
                  { label: "Anfragen", value: requests.length, icon: MessageCircle, onClick: () => setActiveTab("requests") },
                  { label: "Nachrichten", value: messages.length, icon: Mail, badge: unreadCount, onClick: () => setActiveTab("nachrichten") },
                ].map((stat) => (
                  <button
                    key={stat.label}
                    onClick={stat.onClick}
                    className="p-5 rounded-2xl bg-muted/30 border border-border/30 hover:border-accent/20 transition-colors text-left relative"
                  >
                    <stat.icon className="w-5 h-5 text-accent mb-3" />
                    <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-1">{stat.label}</p>
                    {stat.badge !== undefined && stat.badge > 0 && (
                      <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent text-[10px] font-bold text-white flex items-center justify-center">
                        {stat.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* No request CTA */}
              {requests.length === 0 && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <Theater className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                  <h2 className="font-display text-lg font-bold text-foreground mb-2">Noch keine Anfrage</h2>
                  <p className="font-sans text-sm text-muted-foreground mb-6">
                    Stellen Sie jetzt Ihre erste Anfrage für eine unvergessliche Zaubershow.
                  </p>
                  <button
                    onClick={() => setActiveTab("requests")}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Jetzt anfragen
                  </button>
                </div>
              )}

              {/* Timeline */}
              {requests.length > 0 && timelineSteps.length > 0 && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-lg font-bold text-foreground">Status Ihrer Anfrage</h2>
                    <span className="font-sans text-sm text-accent font-semibold">{progress}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-border/30 rounded-full mb-8 overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border/30" />

                    <div className="space-y-1">
                      {timelineSteps.map((step, i) => {
                        const isCurrent = i === currentStepIndex;
                        return (
                          <div key={i} className="relative flex items-start gap-4 py-2">
                            <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 transition-all ${
                              step.done
                                ? "bg-accent border-accent"
                                : isCurrent
                                ? "bg-background border-accent shadow-[0_0_0_4px_rgba(196,164,94,0.15)]"
                                : "bg-background border-border/30"
                            }`}>
                              {step.done ? (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              ) : isCurrent ? (
                                <Circle className="w-3.5 h-3.5 text-accent fill-accent/30" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-border/40" />
                              )}
                            </div>

                            <div className="pt-1 flex-1">
                              <p className={`font-sans text-sm ${
                                step.done ? "text-foreground font-medium" : isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"
                              }`}>
                                {step.label}
                                {isCurrent && (
                                  <span className="ml-2 font-sans text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                                    Aktuell
                                  </span>
                                )}
                              </p>
                              {step.hint && (
                                <p className="font-sans text-xs text-muted-foreground mt-0.5">{step.hint}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Current Request Preview */}
              {currentRequest && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Aktuelle Anfrage</h2>
                  <div className="rounded-2xl bg-background/60 border border-border/30 p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">{currentRequest.anlass || "Anfrage"}</h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1">
                          Eingegangen am {new Date(currentRequest.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                      <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(currentRequest.status)}`}>
                        {formatStatusLabel(currentRequest.status)}
                      </span>
                    </div>
                    {currentRequest.datum && (
                      <p className="font-sans text-sm text-muted-foreground mt-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        Gewünschtes Datum: {new Date(currentRequest.datum).toLocaleDateString("de-DE")}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Current Event Preview */}
              {currentEvent && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">Aktuelles Event</h2>
                  <div className="rounded-2xl bg-background/60 border border-border/30 p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">{currentEvent.title}</h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1">
                          {currentEvent.event_date ? new Date(currentEvent.event_date).toLocaleDateString("de-DE") : "Datum folgt"}
                          {currentEvent.location ? ` · ${currentEvent.location}` : ""}
                        </p>
                      </div>
                      <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatEventStatusClasses(currentEvent.status)}`}>
                        {formatEventStatusLabel(currentEvent.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
                      {currentEvent.format && <span className="flex items-center gap-2"><Theater className="w-4 h-4 text-accent" />{currentEvent.format}</span>}
                      {currentEvent.guests && <span className="flex items-center gap-2"><Users className="w-4 h-4 text-accent" />{currentEvent.guests} Gäste</span>}
                    </div>
                    {currentEvent.event_date && (
                      <button
                        onClick={() => downloadICS(currentEvent)}
                        className="mt-4 inline-flex items-center gap-2 font-sans text-xs text-accent hover:text-accent/80 border border-accent/20 rounded-xl px-3 py-2 transition-colors hover:bg-accent/5"
                      >
                        <CalendarPlus className="w-4 h-4" /> Zum Kalender hinzufügen
                      </button>
                    )}
                  </div>
                </div>
              )}

              {events.length === 0 && requests.length === 0 && (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Noch keine Inhalte vorhanden</h3>
                  <p className="font-sans text-sm text-muted-foreground mb-6">
                    Nach Ihrer Anfrage erscheinen hier Anfragen, Events und Dokumente.
                  </p>
                  <Link to="/buchung" className="btn-primary inline-flex group">
                    Jetzt anfragen
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ── EVENTS ── */}
          {activeTab === "events" && (
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <p className="font-sans text-sm text-muted-foreground">Noch keine Events vorhanden.</p>
                </div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
                          <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatEventStatusClasses(event.status)}`}>
                            {formatEventStatusLabel(event.status)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-muted-foreground">
                          {event.event_date && <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(event.event_date).toLocaleDateString("de-DE")}</span>}
                          {event.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</span>}
                          {event.format && <span className="flex items-center gap-1.5"><Theater className="w-3.5 h-3.5" />{event.format}</span>}
                          {event.guests && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.guests} Gäste</span>}
                        </div>
                      </div>
                      {event.event_date && (
                        <button
                          onClick={() => downloadICS(event)}
                          className="shrink-0 self-start inline-flex items-center gap-2 font-sans text-xs text-accent hover:text-accent/80 border border-accent/20 rounded-xl px-3 py-2 transition-colors hover:bg-accent/5"
                        >
                          <CalendarPlus className="w-4 h-4" /> .ics
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── DOKUMENTE ── */}
          {activeTab === "documents" && (
            <div className="space-y-3">
              {documents.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <p className="font-sans text-sm text-muted-foreground">Noch keine Dokumente vorhanden.</p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-medium text-foreground">{doc.name}</p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {doc.type} · {new Date(doc.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                    </div>
                    {doc.file_url && (
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-sans text-xs text-accent hover:text-accent/80 transition-colors">
                        <Download className="w-4 h-4" /> Download
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── ANFRAGEN ── */}
          {activeTab === "requests" && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <p className="font-sans text-sm text-muted-foreground">Noch keine Anfragen vorhanden.</p>
                </div>
              ) : (
                requests.map((request) => {
                  const isOpen = expandedRequestId === request.id;
                  return (
                    <div key={request.id} className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedRequestId(isOpen ? null : request.id)}
                        className="w-full text-left p-6 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <h3 className="font-display text-lg font-bold text-foreground">{request.anlass || "Anfrage"}</h3>
                              <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(request.status)}`}>
                                {formatStatusLabel(request.status)}
                              </span>
                              {request.event_id && (
                                <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-green-700 bg-green-100">Als Event übernommen</span>
                              )}
                            </div>
                            <p className="font-sans text-xs text-muted-foreground">
                              Eingegangen am {new Date(request.created_at).toLocaleDateString("de-DE")}
                            </p>
                          </div>
                          <div className="text-muted-foreground">
                            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 border-t border-border/20">
                          <div className="grid sm:grid-cols-2 gap-4 mt-5">
                            {[
                              { label: "Datum", icon: Calendar, value: request.datum ? new Date(request.datum).toLocaleDateString("de-DE") : "Nicht angegeben" },
                              { label: "Ort", icon: MapPin, value: request.ort || "Nicht angegeben" },
                              { label: "Gäste", icon: Users, value: request.gaeste != null ? String(request.gaeste) : "Nicht angegeben" },
                              { label: "Format", icon: Theater, value: request.format || "Nicht angegeben" },
                              { label: "Telefon", icon: Phone, value: request.phone || "Nicht angegeben" },
                              { label: "E-Mail", icon: Mail, value: request.email },
                            ].map((field) => (
                              <div key={field.label} className="rounded-xl bg-background/60 border border-border/20 p-4">
                                <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">{field.label}</p>
                                <p className="font-sans text-sm text-foreground flex items-center gap-2">
                                  <field.icon className="w-4 h-4 text-accent shrink-0" />{field.value}
                                </p>
                              </div>
                            ))}
                          </div>
                          {request.nachricht && (
                            <div className="mt-4 rounded-xl bg-background/60 border border-border/20 p-4">
                              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Nachricht</p>
                              <p className="font-sans text-sm text-foreground leading-relaxed whitespace-pre-line">{request.nachricht}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ── NACHRICHTEN ── */}
          {activeTab === "nachrichten" && (() => {
            const adminMsgs = messages.map((m) => ({ ...m, _dir: "from_admin" as const, _date: m.created_at }));
            const sentByCustomer = imapMails.map((m) => ({ ...m, _dir: "from_customer" as const, _date: m.received_at, read_by_customer: true }));
            const allMails = [...adminMsgs, ...sentByCustomer].sort((a, b) => new Date(b._date).getTime() - new Date(a._date).getTime());
            return (
              <div className="space-y-4">
                {allMails.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
                    <Mail className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="font-sans text-sm text-muted-foreground">Noch keine Nachrichten vorhanden.</p>
                  </div>
                ) : (
                  allMails.map((msg) => {
                    const isFromAdmin = msg._dir === "from_admin";
                    return (
                      <div key={msg.id} className={`rounded-2xl border transition-colors ${!isFromAdmin ? "bg-muted/20 border-border/30" : msg.read_by_customer ? "bg-muted/20 border-border/30" : "bg-accent/5 border-accent/20"}`}>
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`font-sans text-[10px] uppercase tracking-widest font-semibold ${isFromAdmin ? "text-accent" : "text-blue-400"}`}>
                                  {isFromAdmin ? "Von Emilian Leber" : "Von Ihnen"}
                                </span>
                              </div>
                              <p className="font-sans text-sm font-semibold text-foreground">{msg.subject || "(Kein Betreff)"}</p>
                              <p className="font-sans text-xs text-muted-foreground mt-0.5">
                                {new Date(msg._date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                            {isFromAdmin && !msg.read_by_customer && (
                              <span className="shrink-0 font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-accent/10 text-accent">Neu</span>
                            )}
                          </div>
                          {isFromAdmin ? (
                            <div className="font-sans text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.body }} />
                          ) : (
                            msg.body_html ? (
                              <div className="font-sans text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.body_html }} />
                            ) : msg.body_text ? (
                              <pre className="font-sans text-sm text-foreground/80 whitespace-pre-wrap">{msg.body_text}</pre>
                            ) : (
                              <p className="font-sans text-sm text-muted-foreground italic">Inhalt wird beim nächsten Öffnen geladen.</p>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            );
          })()}

          {/* ── EINSTELLUNGEN ── */}
          {activeTab === "einstellungen" && (
            <div className="max-w-2xl space-y-8">
              {/* Kontaktdaten */}
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30 space-y-5">
                <h2 className="font-display text-lg font-bold text-foreground">Meine Daten</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                    <input
                      value={settingsDraft.name}
                      onChange={(e) => setSettingsDraft((d) => ({ ...d, name: e.target.value }))}
                      placeholder="Ihr Name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Firma</label>
                    <input
                      value={settingsDraft.company}
                      onChange={(e) => setSettingsDraft((d) => ({ ...d, company: e.target.value }))}
                      placeholder="Firmenname (optional)"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Telefon</label>
                    <input
                      value={settingsDraft.phone}
                      onChange={(e) => setSettingsDraft((d) => ({ ...d, phone: e.target.value }))}
                      placeholder="+49 ..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">E-Mail</label>
                    <input
                      value={customer?.email ?? (isAdminPreview ? "" : (user.email || ""))}
                      readOnly
                      className={inputCls + " opacity-50 cursor-not-allowed"}
                    />
                    <p className="font-sans text-[11px] text-muted-foreground mt-1">Kann nicht geändert werden.</p>
                  </div>
                </div>
              </div>

              {/* Rechnungsadresse */}
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30 space-y-5">
                <h2 className="font-display text-lg font-bold text-foreground">Rechnungsadresse</h2>

                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Straße & Hausnummer</label>
                  <input
                    value={settingsDraft.rechnungs_strasse}
                    onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_strasse: e.target.value }))}
                    placeholder="Musterstraße 1"
                    className={inputCls}
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">PLZ</label>
                    <input
                      value={settingsDraft.rechnungs_plz}
                      onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_plz: e.target.value }))}
                      placeholder="12345"
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ort</label>
                    <input
                      value={settingsDraft.rechnungs_ort}
                      onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_ort: e.target.value }))}
                      placeholder="Musterstadt"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Land</label>
                  <input
                    value={settingsDraft.rechnungs_land}
                    onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_land: e.target.value }))}
                    placeholder="Deutschland"
                    className={inputCls}
                  />
                </div>
              </div>

              {settingsMsg && (
                <p className={`font-sans text-sm ${settingsMsg.includes("Fehler") ? "text-destructive" : "text-green-600"}`}>
                  {settingsMsg}
                </p>
              )}

              <button
                onClick={saveSettings}
                disabled={settingsSaving}
                className="btn-primary disabled:opacity-60"
              >
                <Save className="w-4 h-4 mr-2" />
                {settingsSaving ? "Speichert…" : "Änderungen speichern"}
              </button>
            </div>
          )}

          {/* ── KONTAKT ── */}
          {activeTab === "contact" && (
            <div className="max-w-lg">
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Ihr Ansprechpartner</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">Emilian Leber</p>
                    <p className="font-sans text-xs text-muted-foreground">Zauberer & Showkünstler</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href="mailto:el@magicel.de" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-foreground">el@magicel.de</span>
                  </a>
                  <a href="tel:+4915563744696" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-foreground">+49 155 63744696</span>
                  </a>
                </div>
                <Link to="/kontakt" className="btn-primary justify-center mt-6 w-full group">
                  Nachricht senden
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Kundenportal;
