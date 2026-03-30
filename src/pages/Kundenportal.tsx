import React, { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
// PageLayout intentionally NOT imported — portal has its own standalone layout
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
  Sparkles,
  Clock,
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

type Tab = "dashboard" | "events" | "documents" | "requests" | "nachrichten" | "einstellungen";

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all";

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
    case "neu": return "text-accent bg-accent/10 border border-accent/20";
    case "in_bearbeitung":
    case "details_besprechen":
    case "angebot_gesendet":
    case "warte_auf_kunde": return "text-foreground bg-muted border border-border/30";
    case "gebucht":
    case "bestätigt": return "text-green-700 bg-green-100 border border-green-200";
    case "abgelehnt": return "text-destructive bg-destructive/10 border border-destructive/20";
    default: return "text-muted-foreground bg-muted border border-border/30";
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
    case "details_offen": return "text-accent bg-accent/10 border border-accent/20";
    case "vertrag_gesendet":
    case "vertrag_bestaetigt":
    case "rechnung_gesendet": return "text-foreground bg-muted border border-border/30";
    case "rechnung_bezahlt":
    case "event_erfolgt": return "text-green-700 bg-green-100 border border-green-200";
    case "storniert": return "text-destructive bg-destructive/10 border border-destructive/20";
    default: return "text-muted-foreground bg-muted border border-border/30";
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
  ].filter(Boolean).join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.title.replace(/\s+/g, "_")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

const getCountdownDays = (dateStr: string | null): number | null => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getDocTypeIcon = (type: string) => {
  const t = type?.toLowerCase() || "";
  if (t.includes("pdf") || t.includes("vertrag") || t.includes("rechnung") || t.includes("angebot")) return "📄";
  if (t.includes("bild") || t.includes("foto") || t.includes("image")) return "🖼️";
  if (t.includes("video")) return "🎬";
  return "📎";
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
            if (requestsData) {
              setRequests(requestsData);
              if (requestsData.length > 0) setExpandedRequestId(requestsData[0].id);
            }
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          <p className="font-sans text-sm text-muted-foreground">Wird geladen…</p>
        </div>
      </div>
    );
  }

  const displayName = customer?.name || "Kunde";
  const firstName = displayName.split(" ")[0];
  const kundennummer = customer?.kundennummer || "";
  const currentRequest = requests[0] || null;
  const currentEvent = events.find((e) => e.request_id === currentRequest?.id) || events[0] || null;
  const nextEvent = events.find((e) => {
    const d = getCountdownDays(e.event_date);
    return d !== null && d >= 0;
  }) || null;
  const countdown = nextEvent ? getCountdownDays(nextEvent.event_date) : null;
  const timelineSteps = buildTimeline(currentRequest, currentEvent);
  const currentStepIndex = timelineSteps.findIndex((s) => !s.done);
  const progress = timelineSteps.length > 0 ? Math.round((timelineSteps.filter((s) => s.done).length / timelineSteps.length) * 100) : 0;
  const unreadCount = messages.filter((m) => !m.read_by_customer).length;

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "dashboard", label: "Start", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: Calendar },
    { id: "documents", label: "Dokumente", icon: FolderOpen },
    { id: "requests", label: "Anfragen", icon: Theater },
    { id: "nachrichten", label: "Nachrichten", icon: Mail, badge: unreadCount || undefined },
    { id: "einstellungen", label: "Einstellungen", icon: Settings },
  ];

  const adminBannerHeight = isAdminPreview ? 40 : 0;
  const mobileTopBarHeight = 56;
  const desktopTopBarHeight = 64;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin preview banner */}
      {isAdminPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-amber-950 px-4 py-2.5 flex items-center justify-between gap-4 shadow-md" style={{ height: 40 }}>
          <div className="flex items-center gap-2 font-sans text-sm font-medium">
            <Eye className="w-4 h-4 shrink-0" />
            Admin-Vorschau: <strong>{customer?.name || customer?.email || "Kunde"}</strong>
          </div>
          <button
            onClick={() => navigate(`/admin/customers/${previewCustomerId}`)}
            className="flex items-center gap-1.5 font-sans text-sm font-semibold hover:opacity-80 transition-opacity shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück
          </button>
        </div>
      )}

      {/* ── Desktop top navigation ── */}
      <div
        className="hidden md:flex fixed left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/20"
        style={{ top: adminBannerHeight }}
      >
        <div className="container flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Kundenportal</p>
              <p className="font-display text-sm font-bold text-foreground leading-tight">{displayName}</p>
            </div>
            {kundennummer && (
              <span className="font-sans text-xs text-muted-foreground border border-border/30 rounded-full px-2.5 py-0.5 ml-1">#{kundennummer}</span>
            )}
          </div>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-accent text-[9px] font-bold text-white flex items-center justify-center px-1">
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {!isAdminPreview && (
            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile top bar ── */}
      <div
        className="md:hidden fixed left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/20"
        style={{ top: adminBannerHeight, paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-5 h-14">
          <div>
            <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Kundenportal</p>
            <p className="font-display text-base font-bold text-foreground leading-tight">{firstName}</p>
          </div>
          <div className="flex items-center gap-2">
            {kundennummer && (
              <span className="font-sans text-[10px] text-muted-foreground border border-border/30 rounded-full px-2 py-0.5">#{kundennummer}</span>
            )}
            {!isAdminPreview && (
              <button
                onClick={logout}
                className="w-9 h-9 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div
        className="container px-4 sm:px-6 max-w-4xl mx-auto"
        style={{
          paddingTop: `calc(${adminBannerHeight}px + ${mobileTopBarHeight}px + 1.25rem)`,
          paddingBottom: "calc(72px + env(safe-area-inset-bottom) + 1rem)",
        }}
      >
        {/* Desktop override via inline style override is handled server-side; use a wrapper */}
        <style>{`
          @media (min-width: 768px) {
            .portal-inner {
              padding-top: calc(${adminBannerHeight}px + ${desktopTopBarHeight}px + 2rem) !important;
              padding-bottom: 3rem !important;
            }
          }
        `}</style>
        <div className="portal-inner">

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">
            {/* Welcome hero */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/15 via-accent/8 to-transparent border border-accent/20 p-6 sm:p-8">
              <div className="relative z-10">
                <p className="font-sans text-xs text-accent/80 uppercase tracking-widest mb-2">Willkommen zurück</p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  Guten Tag, {firstName}
                </h1>
                {customer?.company && (
                  <p className="font-sans text-sm text-muted-foreground">{customer.company}</p>
                )}

                {nextEvent && countdown !== null && countdown >= 0 && (
                  <div className="mt-5 inline-flex items-center gap-3 bg-background/60 backdrop-blur border border-border/30 rounded-2xl px-4 py-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-sans text-[11px] text-muted-foreground uppercase tracking-widest">Nächstes Event</p>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {countdown === 0 ? "Heute!" : countdown === 1 ? "Morgen" : `In ${countdown} Tagen`}
                        {" · "}{nextEvent.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-accent/6 blur-3xl pointer-events-none" />
              <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-accent/4 blur-2xl pointer-events-none" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Events", value: events.length, icon: Calendar, tab: "events" as Tab },
                { label: "Dokumente", value: documents.length, icon: FileText, tab: "documents" as Tab },
                { label: "Anfragen", value: requests.length, icon: Theater, tab: "requests" as Tab },
                { label: "Nachrichten", value: messages.length, icon: Mail, tab: "nachrichten" as Tab, badge: unreadCount },
              ].map((stat) => (
                <button
                  key={stat.label}
                  onClick={() => setActiveTab(stat.tab)}
                  className="group relative p-4 sm:p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/25 hover:bg-muted/35 transition-all text-left active:scale-95 min-h-[100px]"
                >
                  <stat.icon className="w-5 h-5 text-accent mb-3" />
                  <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                  {"badge" in stat && stat.badge !== undefined && stat.badge > 0 && (
                    <span className="absolute top-3 right-3 min-w-[20px] h-5 rounded-full bg-accent text-[9px] font-bold text-white flex items-center justify-center px-1">
                      {stat.badge}
                    </span>
                  )}
                  <ArrowRight className="absolute bottom-4 right-4 w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-accent/40 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>

            {/* Empty state CTA */}
            {requests.length === 0 && (
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground mb-2">Starten Sie jetzt</h2>
                <p className="font-sans text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                  Stellen Sie Ihre erste Anfrage für eine unvergessliche Zaubershow.
                </p>
                <Link to="/buchung" className="btn-primary inline-flex items-center gap-2 group">
                  <CalendarPlus className="w-4 h-4" />
                  Jetzt anfragen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}

            {/* Status timeline */}
            {requests.length > 0 && timelineSteps.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base sm:text-lg font-bold text-foreground">Status Ihrer Anfrage</h2>
                  <span className="font-sans text-sm text-accent font-semibold">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-border/20 rounded-full mb-7 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent/70 to-accent rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border/20" />
                  <div className="space-y-1">
                    {timelineSteps.map((step, i) => {
                      const isCurrent = i === currentStepIndex;
                      return (
                        <div key={i} className="relative flex items-start gap-4 py-2">
                          <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 transition-all ${
                            step.done
                              ? "bg-accent border-accent"
                              : isCurrent
                              ? "bg-background border-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.12)]"
                              : "bg-background border-border/30"
                          }`}>
                            {step.done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            ) : isCurrent ? (
                              <Circle className="w-3 h-3 text-accent fill-accent/30" />
                            ) : (
                              <Circle className="w-3 h-3 text-border/40" />
                            )}
                          </div>
                          <div className="pt-1 flex-1 min-w-0">
                            <p className={`font-sans text-sm ${
                              step.done ? "text-foreground font-medium" : isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"
                            }`}>
                              {step.label}
                              {isCurrent && (
                                <span className="ml-2 font-sans text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-accent/10 text-accent">Aktuell</span>
                              )}
                            </p>
                            {step.hint && <p className="font-sans text-xs text-muted-foreground mt-0.5">{step.hint}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Current request card */}
            {currentRequest && (
              <div className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between">
                  <h2 className="font-display text-sm font-bold text-foreground">Aktuelle Anfrage</h2>
                  <button onClick={() => setActiveTab("requests")} className="font-sans text-xs text-accent hover:text-accent/70 transition-colors flex items-center gap-1">
                    Alle <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{currentRequest.anlass || "Anfrage"}</h3>
                      <p className="font-sans text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />{new Date(currentRequest.created_at).toLocaleDateString("de-DE")}
                      </p>
                    </div>
                    <span className={`font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${formatStatusClasses(currentRequest.status)}`}>
                      {formatStatusLabel(currentRequest.status)}
                    </span>
                  </div>
                  {currentRequest.datum && (
                    <p className="font-sans text-sm text-muted-foreground mt-3 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      Gewünschtes Datum: {new Date(currentRequest.datum).toLocaleDateString("de-DE")}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Current event card */}
            {currentEvent && (
              <div className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
                <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between">
                  <h2 className="font-display text-sm font-bold text-foreground">Aktuelles Event</h2>
                  <button onClick={() => setActiveTab("events")} className="font-sans text-xs text-accent hover:text-accent/70 transition-colors flex items-center gap-1">
                    Alle <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{currentEvent.title}</h3>
                      <p className="font-sans text-xs text-muted-foreground mt-1">
                        {currentEvent.event_date ? new Date(currentEvent.event_date).toLocaleDateString("de-DE") : "Datum folgt"}
                        {currentEvent.location ? ` · ${currentEvent.location}` : ""}
                      </p>
                    </div>
                    <span className={`font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${formatEventStatusClasses(currentEvent.status)}`}>
                      {formatEventStatusLabel(currentEvent.status)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-muted-foreground mb-4">
                    {currentEvent.format && <span className="flex items-center gap-1.5"><Theater className="w-3.5 h-3.5 text-accent" />{currentEvent.format}</span>}
                    {currentEvent.guests && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-accent" />{currentEvent.guests} Gäste</span>}
                  </div>
                  {currentEvent.event_date && (
                    <button
                      onClick={() => downloadICS(currentEvent)}
                      className="inline-flex items-center gap-2 font-sans text-xs text-accent border border-accent/20 rounded-xl px-3 py-2 transition-all hover:bg-accent/5 active:scale-95"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" /> Zum Kalender hinzufügen
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Contact strip */}
            <div className="rounded-2xl border border-border/30 bg-muted/10 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-semibold text-foreground">Emilian Leber</p>
                <p className="font-sans text-xs text-muted-foreground">Ihr persönlicher Ansprechpartner</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href="mailto:el@magicel.de" className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all active:scale-95">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="tel:+4915563744696" className="w-10 h-10 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all active:scale-95">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-xl font-bold text-foreground">Events</h1>
              {events.length > 0 && (
                <span className="font-sans text-xs text-muted-foreground border border-border/30 rounded-full px-2.5 py-1">
                  {events.length} {events.length === 1 ? "Event" : "Events"}
                </span>
              )}
            </div>

            {events.length === 0 ? (
              <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <div className="w-14 h-14 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-muted-foreground/30" />
                </div>
                <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Events</p>
                <p className="font-sans text-sm text-muted-foreground">Ihre gebuchten Events erscheinen hier.</p>
              </div>
            ) : (
              events.map((event) => {
                const days = getCountdownDays(event.event_date);
                return (
                  <div key={event.id} className="rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-all overflow-hidden">
                    <div className="p-5 pb-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <h3 className="font-display text-base font-bold text-foreground">{event.title}</h3>
                        <span className={`font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${formatEventStatusClasses(event.status)}`}>
                          {formatEventStatusLabel(event.status)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-muted-foreground">
                        {event.event_date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {new Date(event.event_date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                          </span>
                        )}
                        {event.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" />{event.location}</span>}
                        {event.format && <span className="flex items-center gap-1.5"><Theater className="w-3.5 h-3.5 text-accent" />{event.format}</span>}
                        {event.guests && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-accent" />{event.guests} Gäste</span>}
                      </div>

                      {days !== null && days >= 0 && (
                        <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mt-3">
                          <Clock className="w-3 h-3 text-accent" />
                          <span className="font-sans text-xs text-accent font-semibold">
                            {days === 0 ? "Heute!" : days === 1 ? "Morgen" : `In ${days} Tagen`}
                          </span>
                        </div>
                      )}
                    </div>

                    {event.event_date && (
                      <div className="px-5 pb-5 pt-1">
                        <button
                          onClick={() => downloadICS(event)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans text-sm text-accent border border-accent/20 rounded-xl px-4 py-2.5 transition-all hover:bg-accent/5 active:scale-95 min-h-[44px]"
                        >
                          <CalendarPlus className="w-4 h-4" />
                          Zum Kalender hinzufügen (.ics)
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── DOKUMENTE ── */}
        {activeTab === "documents" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-xl font-bold text-foreground">Dokumente</h1>
              {documents.length > 0 && (
                <span className="font-sans text-xs text-muted-foreground border border-border/30 rounded-full px-2.5 py-1">
                  {documents.length} {documents.length === 1 ? "Datei" : "Dateien"}
                </span>
              )}
            </div>

            {documents.length === 0 ? (
              <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <div className="w-14 h-14 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-7 h-7 text-muted-foreground/30" />
                </div>
                <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Dokumente</p>
                <p className="font-sans text-sm text-muted-foreground">Verträge, Rechnungen und Angebote erscheinen hier.</p>
              </div>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-all">
                  <div className="w-11 h-11 rounded-xl bg-background/60 border border-border/20 flex items-center justify-center text-xl shrink-0">
                    {getDocTypeIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-semibold text-foreground truncate">{doc.name}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      {doc.type} · {new Date(doc.created_at).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                  {doc.file_url && (
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all active:scale-95 shrink-0 gap-2 px-3"
                    >
                      <Download className="w-4 h-4" />
                      <span className="font-sans text-xs font-medium hidden sm:inline">Download</span>
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
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-xl font-bold text-foreground">Anfragen</h1>
              {requests.length > 0 && (
                <span className="font-sans text-xs text-muted-foreground border border-border/30 rounded-full px-2.5 py-1">
                  {requests.length} {requests.length === 1 ? "Anfrage" : "Anfragen"}
                </span>
              )}
            </div>

            {requests.length === 0 ? (
              <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <div className="w-14 h-14 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-4">
                  <Theater className="w-7 h-7 text-muted-foreground/30" />
                </div>
                <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Anfragen</p>
                <p className="font-sans text-sm text-muted-foreground mb-6">Starten Sie jetzt Ihre erste Buchungsanfrage.</p>
                <Link to="/buchung" className="btn-primary inline-flex items-center gap-2 group">
                  <CalendarPlus className="w-4 h-4" />
                  Jetzt anfragen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              requests.map((request) => {
                const isOpen = expandedRequestId === request.id;
                return (
                  <div key={request.id} className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setExpandedRequestId(isOpen ? null : request.id)}
                      className="w-full text-left p-5 hover:bg-muted/30 transition-colors min-h-[72px] active:bg-muted/40"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                            <h3 className="font-display text-base font-bold text-foreground">{request.anlass || "Anfrage"}</h3>
                            <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${formatStatusClasses(request.status)}`}>
                              {formatStatusLabel(request.status)}
                            </span>
                            {request.event_id && (
                              <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-green-700 bg-green-100 border border-green-200">Gebucht</span>
                            )}
                          </div>
                          <p className="font-sans text-xs text-muted-foreground flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />{new Date(request.created_at).toLocaleDateString("de-DE")}
                          </p>
                        </div>
                        <div className="text-muted-foreground shrink-0 mt-0.5">
                          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-border/20">
                        <div className="grid sm:grid-cols-2 gap-3 mt-4">
                          {[
                            { label: "Datum", icon: Calendar, value: request.datum ? new Date(request.datum).toLocaleDateString("de-DE") : "Nicht angegeben" },
                            { label: "Ort", icon: MapPin, value: request.ort || "Nicht angegeben" },
                            { label: "Gäste", icon: Users, value: request.gaeste != null ? String(request.gaeste) : "Nicht angegeben" },
                            { label: "Format", icon: Theater, value: request.format || "Nicht angegeben" },
                            { label: "Telefon", icon: Phone, value: request.phone || "Nicht angegeben" },
                            { label: "E-Mail", icon: Mail, value: request.email },
                          ].map((field) => (
                            <div key={field.label} className="rounded-xl bg-background/50 border border-border/20 p-3.5">
                              <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{field.label}</p>
                              <p className="font-sans text-sm text-foreground flex items-center gap-2">
                                <field.icon className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span className="truncate">{field.value}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                        {request.nachricht && (
                          <div className="mt-3 rounded-xl bg-background/50 border border-border/20 p-3.5">
                            <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Nachricht</p>
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
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-display text-xl font-bold text-foreground">Nachrichten</h1>
                {unreadCount > 0 && (
                  <span className="font-sans text-xs text-accent border border-accent/30 bg-accent/10 rounded-full px-2.5 py-1">
                    {unreadCount} ungelesen
                  </span>
                )}
              </div>

              {allMails.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <div className="w-14 h-14 rounded-full bg-muted/40 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-muted-foreground/30" />
                  </div>
                  <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Nachrichten</p>
                  <p className="font-sans text-sm text-muted-foreground">Kommunikation mit Emilian Leber erscheint hier.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allMails.map((msg) => {
                    const isFromAdmin = msg._dir === "from_admin";
                    const isUnread = isFromAdmin && !msg.read_by_customer;
                    return (
                      <div
                        key={msg.id}
                        className={`rounded-2xl border overflow-hidden transition-all ${isUnread ? "bg-accent/5 border-accent/20" : "bg-muted/20 border-border/30"}`}
                      >
                        <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-3 ${isUnread ? "border-accent/10" : "border-border/10"}`}>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${isFromAdmin ? "bg-accent/15 text-accent" : "bg-muted/60 text-muted-foreground"}`}>
                              {isFromAdmin ? "EL" : (customer?.name?.[0]?.toUpperCase() || "K")}
                            </div>
                            <div className="min-w-0">
                              <p className={`font-sans text-[10px] font-semibold uppercase tracking-widest ${isFromAdmin ? "text-accent" : "text-muted-foreground"}`}>
                                {isFromAdmin ? "Emilian Leber" : "Sie"}
                              </p>
                              <p className="font-sans text-sm font-semibold text-foreground truncate">{msg.subject || "(Kein Betreff)"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {isUnread && <span className="w-2 h-2 rounded-full bg-accent" />}
                            <p className="font-sans text-[11px] text-muted-foreground">
                              {new Date(msg._date).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })}
                            </p>
                          </div>
                        </div>
                        <div className="px-5 py-4">
                          {isFromAdmin ? (
                            <div className="font-sans text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.body }} />
                          ) : (
                            msg.body_html ? (
                              <div className="font-sans text-sm text-foreground/80 leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.body_html }} />
                            ) : msg.body_text ? (
                              <pre className="font-sans text-sm text-foreground/80 whitespace-pre-wrap">{msg.body_text}</pre>
                            ) : (
                              <p className="font-sans text-sm text-muted-foreground italic">Kein Inhalt.</p>
                            )
                          )}
                        </div>
                        <div className="px-5 pb-3 font-sans text-[11px] text-muted-foreground/50">
                          {new Date(msg._date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="rounded-2xl border border-border/30 bg-muted/10 p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold text-foreground">Neue Nachricht senden</p>
                  <p className="font-sans text-xs text-muted-foreground">Kontaktieren Sie Emilian direkt</p>
                </div>
                <a
                  href="mailto:el@magicel.de"
                  className="shrink-0 inline-flex items-center gap-1.5 font-sans text-sm text-accent border border-accent/20 rounded-xl px-3.5 py-2.5 hover:bg-accent/5 transition-all active:scale-95 min-h-[44px]"
                >
                  <Mail className="w-4 h-4" />
                  E-Mail
                </a>
              </div>
            </div>
          );
        })()}

        {/* ── EINSTELLUNGEN ── */}
        {activeTab === "einstellungen" && (
          <div className="space-y-5 max-w-2xl">
            <h1 className="font-display text-xl font-bold text-foreground mb-2">Einstellungen</h1>

            <div className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
              <div className="px-5 py-4 border-b border-border/20">
                <h2 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  Meine Daten
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
                    <input value={settingsDraft.name} onChange={(e) => setSettingsDraft((d) => ({ ...d, name: e.target.value }))} placeholder="Ihr Name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Firma</label>
                    <input value={settingsDraft.company} onChange={(e) => setSettingsDraft((d) => ({ ...d, company: e.target.value }))} placeholder="Firmenname (optional)" className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Telefon</label>
                    <input value={settingsDraft.phone} onChange={(e) => setSettingsDraft((d) => ({ ...d, phone: e.target.value }))} placeholder="+49 ..." className={inputCls} />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">E-Mail</label>
                    <input value={customer?.email ?? (isAdminPreview ? "" : (user.email || ""))} readOnly className={inputCls + " opacity-50 cursor-not-allowed"} />
                    <p className="font-sans text-[11px] text-muted-foreground mt-1">Kann nicht geändert werden.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden">
              <div className="px-5 py-4 border-b border-border/20">
                <h2 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Rechnungsadresse
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Straße & Hausnummer</label>
                  <input value={settingsDraft.rechnungs_strasse} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_strasse: e.target.value }))} placeholder="Musterstraße 1" className={inputCls} />
                </div>
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-2">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">PLZ</label>
                    <input value={settingsDraft.rechnungs_plz} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_plz: e.target.value }))} placeholder="12345" className={inputCls} />
                  </div>
                  <div className="col-span-3">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ort</label>
                    <input value={settingsDraft.rechnungs_ort} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_ort: e.target.value }))} placeholder="Musterstadt" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Land</label>
                  <input value={settingsDraft.rechnungs_land} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_land: e.target.value }))} placeholder="Deutschland" className={inputCls} />
                </div>
              </div>
            </div>

            {settingsMsg && (
              <div className={`rounded-xl px-4 py-3 font-sans text-sm border ${settingsMsg.includes("Fehler") ? "text-destructive bg-destructive/10 border-destructive/20" : "text-green-700 bg-green-50 border-green-200"}`}>
                {settingsMsg}
              </div>
            )}

            <button
              onClick={saveSettings}
              disabled={settingsSaving}
              className="btn-primary w-full sm:w-auto disabled:opacity-60 flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Save className="w-4 h-4" />
              {settingsSaving ? "Speichert…" : "Änderungen speichern"}
            </button>

            {!isAdminPreview && (
              <div className="rounded-2xl border border-border/30 p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">Abmelden</p>
                  <p className="font-sans text-xs text-muted-foreground">Von Ihrem Kundenportal abmelden</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 font-sans text-sm text-destructive border border-destructive/20 rounded-xl px-4 py-2.5 hover:bg-destructive/5 transition-all active:scale-95 min-h-[44px]"
                >
                  <LogOut className="w-4 h-4" />
                  Abmelden
                </button>
              </div>
            )}
          </div>
        )}

        </div>
      </div>

      {/* ── Mobile bottom navigation ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/92 backdrop-blur-xl border-t border-border/20"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-stretch">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 flex flex-col items-center justify-center gap-1 pt-3 pb-2.5 min-h-[56px] transition-all active:scale-95 ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-accent" />
                )}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute top-1.5 right-[calc(50%-14px)] min-w-[16px] h-4 rounded-full bg-accent text-[9px] font-bold text-white flex items-center justify-center px-1 z-10">
                    {tab.badge > 9 ? "9+" : tab.badge}
                  </span>
                )}
                <tab.icon className={`w-5 h-5 transition-all ${isActive ? "text-foreground" : "text-muted-foreground/50"}`} />
                <span className={`font-sans text-[10px] font-medium leading-none ${isActive ? "text-foreground" : "text-muted-foreground/50"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Kundenportal;
