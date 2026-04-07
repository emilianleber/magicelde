import React, { useEffect, useState } from "react";
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
  RotateCcw,
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
  Send,
  Upload,
  Building2,
  AlertTriangle,
  X,
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
  avatar_url?: string | null;
}

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  uhrzeit?: string | null;

  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  status: string | null;
  created_at: string;
  event_id?: string | null;
  firma?: string | null;
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  start_time?: string | null;

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
  typ?: string | null;
  status?: string | null;
  nummer?: string | null;
  file_url: string | null;
  created_at: string;
  due_date?: string | null;
  amount?: number | null;
  brutto?: number | null;
  request_id?: string | null;
  event_id?: string | null;
  preview_html?: string | null;
}

interface PortalMessage {
  id: string;
  created_at: string;
  subject: string;
  body: string;
  read_by_customer: boolean;
}

interface PortalChangeRequest {
  id: string;
  subject: string;
  message: string;
  status: string;
  admin_response: string | null;
  created_at: string;
  request_id: string | null;
  event_id: string | null;
}

type Tab = "dashboard" | "events" | "documents" | "requests" | "nachrichten" | "einstellungen" | "kontakt" | "feedback";

const inputCls =
  "w-full rounded-xl bg-black/[0.02] border border-black/[0.1] px-4 py-3 text-sm text-foreground placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all";

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
    case "bestätigt": return "text-green-400 bg-green-400/10 border border-green-400/20";
    case "abgelehnt": return "text-red-400 bg-red-400/10 border border-red-400/20";
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
    case "event_erfolgt": return "text-green-400 bg-green-400/10 border border-green-400/20";
    case "storniert": return "text-red-400 bg-red-400/10 border border-red-400/20";
    default: return "text-muted-foreground bg-muted border border-border/30";
  }
};

const buildTimeline = (request: BookingRequest | null, event: PortalEvent | null) => {
  const steps: { label: string; done: boolean; hint?: string; action?: string }[] = [];
  const st = request?.status || "";
  const evSt = event?.status || "";

  // Anfrage-Phase
  steps.push({ label: "Anfrage eingegangen", done: !!request, hint: request?.created_at ? new Date(request.created_at).toLocaleDateString("de-DE") : undefined });
  steps.push({ label: "In Bearbeitung", done: ["in_bearbeitung", "details_besprechen", "angebot_gesendet", "warte_auf_kunde"].includes(st) || !!event });
  if (st === "details_besprechen") {
    steps.push({ label: "📩 Details klären", done: false, hint: "Wir benötigen noch Informationen von Ihnen", action: "details_antworten" });
  }
  steps.push({ label: "Angebot erhalten", done: ["angebot_gesendet", "warte_auf_kunde"].includes(st) || !!event });

  if (event) {
    steps.push({ label: "Event gebucht", done: true, hint: event.event_date ? new Date(event.event_date).toLocaleDateString("de-DE") : undefined });

    // Details: nur anzeigen wenn offen (verschwindet wenn erledigt)
    // Details: nur anzeigen wenn explizit auf "offen" gesetzt (null/erledigt = nicht anzeigen)
    if (event.details_status === "offen") {
      steps.push({ label: "📩 Details klären", done: false, hint: "Wir benötigen noch Informationen von Ihnen", action: "details_antworten" });
    }

    // Vertrag: nur anzeigen wenn gesendet oder bestätigt
    if (event.contract_status === "gesendet") {
      steps.push({ label: "Vertrag gesendet", done: false });
    } else if (event.contract_status === "erledigt") {
      steps.push({ label: "Vertrag bestätigt", done: true });
    }

    // Vor Event: Abschlagsrechnung (nur in Phase in_planung)
    if (evSt === "in_planung" && event.invoice_status === "gesendet") {
      steps.push({ label: "Abschlagsrechnung offen", done: false });
    } else if (evSt === "in_planung" && event.invoice_status === "erledigt") {
      steps.push({ label: "Abschlagsrechnung bezahlt", done: true });
    }

    // Event durchgeführt
    const eventDone = evSt === "event_erfolgt" || evSt === "abgeschlossen";
    steps.push({ label: "Event durchgeführt", done: eventDone });

    // Nach Event: Schlussrechnung
    if (eventDone) {
      if (event.invoice_status === "gesendet") {
        steps.push({ label: "Schlussrechnung offen", done: false });
      } else if (event.invoice_status === "erledigt") {
        steps.push({ label: "Schlussrechnung bezahlt", done: true });
      }
      steps.push({ label: "Abgeschlossen", done: evSt === "abgeschlossen" });
    }
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

const AvatarDisplay = ({ name, avatarUrl, size = "md" }: { name: string; avatarUrl?: string | null; size?: "sm" | "md" | "lg" }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "K";
  const sizeClasses = { sm: "w-7 h-7 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl" };
  if (avatarUrl) return <img src={avatarUrl} alt={name} className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-accent/20`} />;
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center shrink-0 ring-2 ring-accent/20`}>
      <span className="font-bold text-accent">{initials}</span>
    </div>
  );
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
  const [loading, setLoading] = useState(true);

  const [settingsDraft, setSettingsDraft] = useState({
    anrede: "", vorname: "", nachname: "", name: "", company: "", phone: "",
    rechnungs_strasse: "", rechnungs_plz: "", rechnungs_ort: "", rechnungs_land: "Deutschland",
  });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState("");

  const [changeRequests, setChangeRequests] = useState<PortalChangeRequest[]>([]);
  const [crFormOpen, setCrFormOpen] = useState<Record<string, boolean>>({});
  const [crSubject, setCrSubject] = useState<Record<string, string>>({});
  const [crMessage, setCrMessage] = useState<Record<string, string>>({});
  const [crSubmitting, setCrSubmitting] = useState<Record<string, boolean>>({});
  const [crSuccess, setCrSuccess] = useState<Record<string, boolean>>({});

  const [expandedMailId, setExpandedMailId] = useState<string | null>(null);
  const [detailsReplyOpen, setDetailsReplyOpen] = useState(false);
  const [detailsReplyMsg, setDetailsReplyMsg] = useState("");
  const [detailsReplySending, setDetailsReplySending] = useState(false);
  const [detailsReplySuccess, setDetailsReplySuccess] = useState(false);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const [withdrawConfirm, setWithdrawConfirm] = useState<Record<string, boolean>>({});
  const [offerActionLoading, setOfferActionLoading] = useState<Record<string, boolean>>({});
  const [offerActionError, setOfferActionError] = useState<Record<string, string>>({});

  const [eventCancelId, setEventCancelId] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  const [replySent, setReplySent] = useState(false);
  const [paketInfo, setPaketInfo] = useState<{ name: string; beschreibung: string; zieldauer: number; preis: number } | null>(null);


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewCustomerId = searchParams.get("preview");
  const urlTab = searchParams.get("tab") as Tab | null;
  const urlEventId = searchParams.get("eventId");
  const [activeTab, setActiveTab] = useState<Tab>(urlTab || "dashboard");
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const [feedbackEventId, setFeedbackEventId] = useState<string | null>(urlEventId);
  const [fbRating, setFbRating] = useState(0);
  const [fbHighlights, setFbHighlights] = useState("");
  const [fbVerbesserungen, setFbVerbesserungen] = useState("");
  const [fbWeiterempfehlung, setFbWeiterempfehlung] = useState(true);
  const [fbKommentar, setFbKommentar] = useState("");
  const [fbSending, setFbSending] = useState(false);
  const [fbSent, setFbSent] = useState(false);
  const [fbError, setFbError] = useState("");

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

  // Refresh-Funktion (auch für manuellen Refresh-Button)
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(k => k + 1);

  // Daten neu laden wenn Tab wieder aktiv wird (z.B. nach Admin-Publish in anderem Tab)
  useEffect(() => {
    const onFocus = () => { if (user) triggerRefresh(); };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [user]);

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
            if (cust?.id) {
              const { data: crData } = await supabase
                .from("portal_change_requests")
                .select("*")
                .eq("customer_id", cust.id)
                .order("created_at", { ascending: false });
              if (crData) setChangeRequests(crData);
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
        // Case-insensitive E-Mail-Suche — verhindert Duplikate durch Groß-/Kleinschreibung
        const { data: byEmailArr } = await supabase.from("portal_customers").select("*").ilike("email", user.email!).limit(1);
        const byEmail = byEmailArr?.[0] || null;
        if (byEmail) {
          // user_id verknüpfen + E-Mail normalisieren
          const { data: linked } = await supabase.from("portal_customers")
            .update({ user_id: user.id, email: user.email!.toLowerCase() })
            .eq("id", byEmail.id).select("*").single();
          cust = linked ?? byEmail;
        }
      }

      // Anfragen laden (wird auch als Fallback für Profilname genutzt)
      const { data: requestsData } = await supabase
        .from("portal_requests").select("*").eq("email", user.email).order("created_at", { ascending: false });
      if (requestsData) {
        setRequests(requestsData);
        if (requestsData.length > 0) setExpandedRequestId(requestsData[0].id);
      }

      const capW = (s?: string | null) => s ? s.replace(/(^|\s)\S/g, (c: string) => c.toUpperCase()) : null;

      // Nur wenn wirklich KEIN Eintrag existiert — letzte Prüfung per customer_id der Anfrage
      if (!cust && requestsData && requestsData.length > 0) {
        const req = requestsData[0] as any;
        // Prüfe ob die Anfrage schon einen Kunden hat
        if (req.customer_id) {
          const { data: reqCust } = await supabase.from("portal_customers").select("*").eq("id", req.customer_id).single();
          if (reqCust) {
            // user_id verknüpfen
            await supabase.from("portal_customers").update({ user_id: user.id }).eq("id", reqCust.id);
            cust = { ...reqCust, user_id: user.id };
          }
        }
        // Wirklich kein Kunde gefunden — erst dann erstellen
        if (!cust) {
          const { data: created } = await supabase.from("portal_customers").insert({
            name: capW(req.name) || user.email!.split("@")[0],
            email: user.email!.toLowerCase(),
            user_id: user.id,
            ...(req.firma ? { company: req.firma } : {}),
            ...(req.phone ? { phone: req.phone } : {}),
          }).select("*").maybeSingle();
          if (created) cust = created;
        }
      }

      // Eintrag vorhanden aber Name leer → aus Anfrage befüllen
      if (cust && !cust.name && requestsData && requestsData.length > 0) {
        const req = requestsData[0] as any;
        const newName = capW(req.name);
        if (newName) {
          const { data: updated } = await supabase.from("portal_customers")
            .update({ name: newName, ...(req.firma && !cust.company ? { company: req.firma } : {}), ...(req.phone && !cust.phone ? { phone: req.phone } : {}) })
            .eq("id", cust.id).select("*").single();
          if (updated) cust = updated;
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
        if (cust?.id) {
          const { data: crData } = await supabase
            .from("portal_change_requests")
            .select("*")
            .eq("customer_id", cust.id)
            .order("created_at", { ascending: false });
          if (crData) setChangeRequests(crData);
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [user, previewCustomerId, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (customer) {
      // Wenn Profilfelder leer sind, aus der neuesten Anfrage auffüllen
      const latestReq = requests[0] as any;
      const cap = (s?: string | null) =>
        s ? s.replace(/\b\w/g, (c) => c.toUpperCase()) : "";
      setSettingsDraft({
        name:              cap(customer.name)    || cap(latestReq?.name)  || "",
        company:           customer.company      || latestReq?.firma        || "",
        phone:             customer.phone        || latestReq?.phone        || "",
        rechnungs_strasse: (customer as any).rechnungs_strasse || "",
        rechnungs_plz:     (customer as any).rechnungs_plz     || "",
        rechnungs_ort:     (customer as any).rechnungs_ort     || "",
        rechnungs_land:    (customer as any).rechnungs_land    || "Deutschland",
      });
    }
  }, [customer, requests]);

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

  const notifyAdmin = async (subject: string, body: string) => {
    try {
      await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/send-customer-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ to_email: "el@magicel.de", to_name: "Emilian Leber", subject, body }),
      });
    } catch (_) {}
  };

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
      })
      .eq("id", customer.id)
      .select("*")
      .single();
    if (error) {
      setSettingsMsg(`Fehler beim Speichern: ${error.message}`);
    } else {
      setCustomer(data);
      setSettingsMsg("Gespeichert!");
      setTimeout(() => setSettingsMsg(""), 3000);
    }
    setSettingsSaving(false);
  };

  const uploadAvatar = async (file: File) => {
    if (!customer?.id) return;
    setAvatarUploading(true);
    setAvatarError("");
    const ext = file.name.split(".").pop();
    const path = `${customer.id}/avatar.${ext}`;
    const { error: upErr } = await supabase.storage.from("customer-avatars").upload(path, file, { upsert: true });
    if (upErr) { setAvatarError(`Upload fehlgeschlagen: ${upErr.message}`); setAvatarUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("customer-avatars").getPublicUrl(path);
    const { data: updatedCust } = await supabase.from("portal_customers").update({ avatar_url: publicUrl + `?t=${Date.now()}` }).eq("id", customer.id).select("*").single();
    if (updatedCust) setCustomer(updatedCust);
    setAvatarUploading(false);
  };

  const submitChangeRequest = async (linkedId: string, type: "request" | "event") => {
    if (!customer || !crSubject[linkedId]?.trim() || !crMessage[linkedId]?.trim()) return;
    setCrSubmitting((p) => ({ ...p, [linkedId]: true }));
    const payload: any = {
      customer_id: customer.id,
      subject: crSubject[linkedId].trim(),
      message: crMessage[linkedId].trim(),
      status: "offen",
    };
    if (type === "request") payload.request_id = linkedId;
    else payload.event_id = linkedId;

    const { data, error } = await supabase.from("portal_change_requests").insert(payload).select("*").single();
    if (!error && data) {
      setChangeRequests((prev) => [data, ...prev]);
      setCrSuccess((p) => ({ ...p, [linkedId]: true }));
      setCrSubject((p) => ({ ...p, [linkedId]: "" }));
      setCrMessage((p) => ({ ...p, [linkedId]: "" }));
      setCrFormOpen((p) => ({ ...p, [linkedId]: false }));
      setTimeout(() => setCrSuccess((p) => ({ ...p, [linkedId]: false })), 4000);
      notifyAdmin(
        `📋 Änderungswunsch von ${customer.name || customer.email}: ${payload.subject}`,
        `<p><strong>${customer.name || customer.email}</strong> hat eine Änderungsanfrage eingereicht:</p>
        <p><strong>Betreff:</strong> ${payload.subject}</p>
        <p><strong>Nachricht:</strong> ${payload.message}</p>
        <p><a href="https://magicel.de/admin/${type === "event" ? "events" : "requests"}/${linkedId}" style="display:inline-block;background:#0a0a0a;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;font-weight:bold;">Im CRM öffnen →</a></p>`
      );
    }
    setCrSubmitting((p) => ({ ...p, [linkedId]: false }));
  };

  const submitDetailsReply = async () => {
    if (!customer || !detailsReplyMsg.trim() || !currentRequest) return;
    setDetailsReplySending(true);
    const payload = {
      customer_id: customer.id,
      request_id: currentRequest.id,
      subject: "Antwort: Details zu meiner Anfrage",
      message: detailsReplyMsg.trim(),
      status: "offen",
      action: "details_antwort",
    };
    const { data, error } = await supabase.from("portal_change_requests").insert(payload).select("*").single();
    if (!error && data) {
      setChangeRequests((prev) => [data, ...prev]);
      setDetailsReplySuccess(true);
      setDetailsReplyMsg("");
      setDetailsReplyOpen(false);
      setTimeout(() => setDetailsReplySuccess(false), 4000);
      notifyAdmin(
        `📩 Antwort auf Detail-Anfrage von ${customer.name || customer.email}`,
        `<p><strong>${customer.name || customer.email}</strong> hat auf Ihre Detail-Anfrage geantwortet:</p>
        <p>${payload.message.replace(/\n/g, "<br>")}</p>
        <p><a href="https://magicel.de/admin/requests/${currentRequest.id}" style="display:inline-block;background:#0a0a0a;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;font-weight:bold;">Anfrage öffnen →</a></p>`
      );
    }
    setDetailsReplySending(false);
  };

  const crStatusBadge = (status: string) => {
    if (status === "angenommen") return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">Angenommen</span>;
    if (status === "abgelehnt") return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-400/10 text-red-400 border border-red-400/20">Abgelehnt</span>;
    return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">Offen</span>;
  };

  // Paket laden wenn Request eins hat (MUSS vor early return stehen!)
  const paketId = requests[0] ? (requests[0] as any).paket_id || null : null;
  useEffect(() => {
    if (!paketId) return;
    supabase.from("pakete").select("name, beschreibung_kunde, zieldauer, preis").eq("id", paketId).maybeSingle().then(({ data }) => {
      if (data) setPaketInfo({ name: data.name, beschreibung: data.beschreibung_kunde || "", zieldauer: data.zieldauer, preis: data.preis });
    });
  }, [paketId]);

  if (!user || loading) {
    return (
      <PageLayout>
        <section className="min-h-screen flex items-center justify-center pt-28">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
            <p className="font-sans text-sm text-muted-foreground">Wird geladen…</p>
          </div>
        </section>
      </PageLayout>
    );
  }

  const capWords = (s?: string | null) =>
    s ? s.replace(/_/g, " ").replace(/(^|\s)\S/g, (c) => c.toUpperCase()) : "";
  // Fallback: Name aus neuester Anfrage wenn Profil noch leer
  const latestReqName = (requests[0] as any)?.name;
  const displayName = capWords(customer?.name) || capWords(latestReqName) || "Kunde";
  const firstName = displayName.split(" ")[0];
  const kundennummer = customer?.kundennummer || "";
  const currentRequest = requests[0] || null;
  const currentEvent = events.find((e) => e.request_id === currentRequest?.id) || events[0] || null;

  const paketIdDummy = (currentRequest as any)?.paket_id; // paketId wird oben geladen
  const nextEvent = events.find((e) => {
    const d = getCountdownDays(e.event_date);
    return d !== null && d >= 0;
  }) || null;
  const countdown = nextEvent ? getCountdownDays(nextEvent.event_date) : null;
  const timelineSteps = buildTimeline(currentRequest, currentEvent);
  const currentStepIndex = timelineSteps.findIndex((s) => !s.done);
  const progress = timelineSteps.length > 0 ? Math.round((timelineSteps.filter((s) => s.done).length / timelineSteps.length) * 100) : 0;
  const unreadCount = messages.filter((m) => !m.read_by_customer).length;

  // Offene Angebote die im Portal veröffentlicht wurden
  // DB column "type" hat Werte wie "Angebot" (Großschreibung)
  const offeneAngebote = documents.filter(
    (d) => d.type === "Angebot" && d.status === "gesendet"
  );

  const downloadPdf = async (doc: PortalDocument) => {
    const docTitle = doc.nummer || doc.name || "Dokument";
    setPdfLoading(doc.id);
    try {
      // 1. Bevorzugt: Vorab-generiertes PDF aus Storage
      if (doc.file_url) {
        const a = document.createElement("a");
        a.href = doc.file_url;
        a.download = `${docTitle}.pdf`;
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
      // 2. Fallback: PDF live über API generieren
      let html = doc.preview_html;
      // Falls preview_html fehlt, nochmal aus DB laden
      if (!html) {
        const { data: fresh } = await supabase
          .from("portal_documents")
          .select("preview_html")
          .eq("id", doc.id)
          .maybeSingle();
        html = fresh?.preview_html || null;
      }
      if (!html) {
        alert("Dieses Dokument ist noch nicht als PDF verfügbar.");
        return;
      }
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preview_html: html, title: docTitle }),
      });
      if (!res.ok) throw new Error(`PDF-Fehler (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${docTitle}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF error:", e);
      alert("PDF-Download fehlgeschlagen. Bitte versuche es erneut.");
    } finally {
      setPdfLoading(null);
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "dashboard", label: "Übersicht", icon: LayoutDashboard },
    { id: "documents", label: "Dokumente", icon: FolderOpen },
    { id: "kontakt", label: "Kontakt & Daten", icon: Phone },
  ];

  return (
    <PageLayout>
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

      {/* Portal tab bar — sticky below main site navigation */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-sm">
        <div className="container px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 h-14">
            {/* Customer info */}
            <div className="flex items-center gap-2 shrink-0">
              <AvatarDisplay name={displayName} avatarUrl={customer?.avatar_url} size="sm" />
              <div className="hidden sm:block">
                <p className="font-sans text-xs font-semibold text-foreground leading-none">{displayName}</p>
                {kundennummer && <p className="font-sans text-[10px] text-foreground/40">#{kundennummer}</p>}
              </div>
            </div>

            {/* Tab navigation — horizontal scroll on mobile */}
            <nav className="flex items-center gap-1 overflow-x-auto flex-1 mx-2" style={{ scrollbarWidth: "none" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                    activeTab === tab.id
                      ? "bg-accent text-white"
                      : "text-foreground/60 hover:text-foreground hover:bg-black/[0.04]"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="min-w-[16px] h-4 rounded-full bg-accent text-[9px] font-bold text-white flex items-center justify-center px-1">
                      {tab.badge > 9 ? "9+" : tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Refresh */}
            <button
              onClick={triggerRefresh}
              title="Inhalte aktualisieren"
              className="shrink-0 flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Aktualisieren</span>
            </button>

            {/* Logout */}
            {!isAdminPreview && (
              <button
                onClick={logout}
                className="shrink-0 flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="relative min-h-screen pt-28 pb-20">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-blue-500/[0.04] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-500/[0.04] blur-3xl" />
        </div>
        <div className="container px-4 sm:px-6 max-w-4xl mx-auto relative">

        {/* ── DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-5">

            {/* ── EVENT HERO ── */}
            {currentEvent ? (
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white">
                <div className="relative z-10">
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2">Ihr Event</p>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold">{currentEvent.title}</h1>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-sm text-white/70">
                    {currentEvent.event_date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(currentEvent.event_date).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    )}
                    {currentEvent.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{currentEvent.location}</span>}
                    {currentEvent.guests && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{currentEvent.guests} Gäste</span>}
                    {currentEvent.format && <span className="flex items-center gap-1.5"><Theater className="w-3.5 h-3.5" />{capWords(currentEvent.format)}</span>}
                  </div>
                  {countdown !== null && countdown >= 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-4 py-2.5">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm font-semibold text-white">
                        {countdown === 0 ? "🎉 Heute!" : countdown === 1 ? "Morgen" : `Noch ${countdown} Tage`}
                      </span>
                    </div>
                  )}
                  {currentEvent.event_date && (
                    <button onClick={() => downloadICS(currentEvent)} className="mt-3 ml-2 inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors">
                      <CalendarPlus className="w-3 h-3" /> Zum Kalender hinzufügen
                    </button>
                  )}
                </div>
                <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
              </div>
            ) : (
              /* Kein Event → Willkommen */
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white border border-blue-100/60 p-6 sm:p-8">
                <div className="relative z-10 flex items-center gap-4">
                  <AvatarDisplay name={displayName} avatarUrl={customer?.avatar_url} size="lg" />
                  <div>
                    <p className="font-sans text-xs text-accent/80 uppercase tracking-widest mb-1">Willkommen</p>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Guten Tag, {firstName}</h1>
                  </div>
                </div>
              </div>
            )}

            {/* ── SHOW/KONZEPT KARTE ── */}
            {paketInfo && (
              <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-purple-100 flex items-center justify-center shrink-0">
                      <Sparkles className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[10px] text-accent uppercase tracking-[0.2em] font-semibold mb-1">Ihre Show</p>
                      <h2 className="font-display text-xl font-bold text-foreground">{paketInfo.name}</h2>
                      <p className="font-sans text-sm text-muted-foreground mt-1">Bis zu {paketInfo.zieldauer} Minuten Showprogramm</p>
                    </div>
                  </div>
                  {paketInfo.beschreibung && (
                    <p className="font-sans text-sm text-foreground/70 mt-4 leading-relaxed border-t border-black/[0.05] pt-4">{paketInfo.beschreibung}</p>
                  )}
                  {/* Links zur Showformat-Unterseite */}
                  {(() => {
                    const n = paketInfo.name.toLowerCase();
                    const linkCls = "mt-4 mr-3 inline-flex items-center gap-2 font-sans text-sm text-accent hover:text-accent/80 font-semibold transition-colors";
                    // Kombination: Zwei Links (Close-Up + Bühnenshow)
                    if (n.includes("kombi")) {
                      return (
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          <a href="https://www.magicel.de/close-up" target="_blank" rel="noopener noreferrer" className={linkCls}>
                            Close-Up entdecken <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          <a href="https://www.magicel.de/buehnenshow" target="_blank" rel="noopener noreferrer" className={linkCls}>
                            Bühnenshow entdecken <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      );
                    }
                    const link = n.includes("close") || n.includes("hochzeit") ? "/close-up"
                      : n.includes("bühne") ? "/buehnenshow"
                      : n.includes("dinner") ? "/magic-dinner"
                      : n.includes("moderation") ? "/moderation"
                      : null;
                    if (!link) return null;
                    return (
                      <a href={`https://www.magicel.de${link}`} target="_blank" rel="noopener noreferrer" className={linkCls}>
                        Mehr über dieses Showformat erfahren <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* ── Angebote + Rechnungen gleichgroß nebeneinander ── */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Dokumente-Karte */}
              <button
                onClick={() => setActiveTab("documents")}
                className="group p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md hover:border-accent/20 transition-all text-left"
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                  <FolderOpen className="w-4 h-4 text-accent" />
                </div>
                <p className="font-display text-2xl font-bold text-foreground">{documents.length}</p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">Dokumente</p>
                <ArrowRight className="mt-2 w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-accent/40 transition-all" />
              </button>

              {/* Rechnungen-Karte */}
              {(() => {
                const rechnungen = documents.filter(d => ["Rechnung", "Abschlagsrechnung", "Schlussrechnung"].includes(d.type || ""));
                const offene = rechnungen.filter(d => d.status !== "bezahlt");
                return (
                  <button
                    onClick={() => setActiveTab("documents")}
                    className="group p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:shadow-md hover:border-accent/20 transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                      <FileText className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground">{rechnungen.length}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-0.5">
                      {offene.length > 0 ? `${offene.length} offen` : "Alle bezahlt ✓"}
                    </p>
                    <ArrowRight className="mt-2 w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-accent/40 transition-all" />
                  </button>
                );
              })()}
            </div>

            {/* Stats-Grid entfernt – Dokumente/Rechnungen sind jetzt oben als Cards */}

            {/* ── OFFENE ANGEBOTE WIDGET ── */}
            {offeneAngebote.length > 0 && offeneAngebote.map((angebot) => {
              const reqId = angebot.request_id;
              const isLoading = reqId ? !!offerActionLoading[reqId] : false;
              const errMsg = reqId ? offerActionError[reqId] : null;
              const betrag = angebot.amount ?? angebot.brutto;

              const doAction = async (action: "accept" | "reject") => {
                if (!reqId) return;
                setOfferActionLoading(p => ({ ...p, [reqId]: true }));
                setOfferActionError(p => ({ ...p, [reqId]: "" }));
                const { data, error } = await supabase.functions.invoke("portal-offer-action", {
                  body: { action, request_id: reqId },
                });
                if (error) {
                  console.error("portal-offer-action error:", error, data);
                  const msg = (typeof data === "object" && data?.error) ? data.error : (error.message || "Unbekannter Fehler");
                  setOfferActionError(p => ({ ...p, [reqId]: `${action === "accept" ? "Fehler beim Annehmen" : "Fehler beim Ablehnen"}: ${msg}` }));
                } else {
                  // Optimistic: mark as handled locally
                  setDocuments(prev => prev.map(d => d.id === angebot.id ? { ...d, status: action === "accept" ? "akzeptiert" : "abgelehnt" } : d));
                  setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: action === "accept" ? "gebucht" : "abgelehnt" } : r));
                }
                setOfferActionLoading(p => ({ ...p, [reqId]: false }));
              };

              return (
                <div key={angebot.id} className="rounded-3xl overflow-hidden border border-blue-200/60 shadow-sm bg-white">
                  {/* Festive top accent */}
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

                  <div className="px-6 pt-5 pb-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1">
                          🎉 Dein Angebot ist fertig
                        </p>
                        <h2 className="font-display text-lg font-bold text-foreground leading-tight">
                          {angebot.nummer || angebot.name || "Angebot"}
                        </h2>
                        <p className="font-sans text-xs text-muted-foreground mt-0.5">
                          {new Date(angebot.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {betrag != null && (
                          <p className="font-display text-2xl font-bold text-foreground">
                            {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(betrag)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-black/[0.05] mb-4" />

                    {/* Action prompt */}
                    <p className="font-sans text-sm text-muted-foreground mb-4">
                      Bitte entscheide dich: Möchtest du das Angebot annehmen oder hast du noch Fragen?
                    </p>

                    {/* Angebot öffnen */}
                    {angebot.preview_html && (
                      <button
                        onClick={() => downloadPdf(angebot)}
                        disabled={pdfLoading === angebot.id}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold transition-all active:scale-[0.98] mb-3 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {pdfLoading === angebot.id
                          ? <><span className="w-4 h-4 rounded-full border-2 border-indigo-300 border-t-indigo-700 animate-spin" /> PDF wird erstellt…</>
                          : <><Download className="w-4 h-4" /> Angebot als PDF herunterladen</>
                        }
                      </button>
                    )}

                    {/* ANNEHMEN – big green */}
                    <button
                      disabled={isLoading || !reqId}
                      onClick={() => doAction("accept")}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-bold shadow-sm shadow-emerald-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                    >
                      {isLoading
                        ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        : <CheckCircle2 className="w-4 h-4" />
                      }
                      Angebot annehmen
                    </button>

                    {/* Secondary row: Fragen + Ablehnen */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => reqId && setCrFormOpen(p => ({ ...p, [reqId]: true }))}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-black/[0.1] text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-black/[0.03] transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Frage / Änderung
                      </button>
                      <button
                        disabled={isLoading || !reqId}
                        onClick={() => doAction("reject")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-black/[0.08] text-xs font-medium text-muted-foreground/70 hover:text-muted-foreground hover:bg-black/[0.03] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-3.5 h-3.5" /> Ablehnen
                      </button>
                    </div>

                    {errMsg && (
                      <p className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mt-3">
                        {errMsg}
                      </p>
                    )}

                    {/* Inline Frage-Formular (wenn geöffnet) */}
                    {reqId && crFormOpen[reqId] && (
                      <div className="mt-4 pt-4 border-t border-black/[0.05] space-y-2">
                        <p className="font-sans text-xs font-semibold text-foreground mb-2">Deine Frage oder gewünschte Änderung:</p>
                        <input
                          className={inputCls}
                          placeholder="Betreff"
                          value={crSubject[reqId] || ""}
                          onChange={e => setCrSubject(p => ({ ...p, [reqId]: e.target.value }))}
                        />
                        <textarea
                          className={inputCls + " resize-none"}
                          rows={3}
                          placeholder="Nachricht…"
                          value={crMessage[reqId] || ""}
                          onChange={e => setCrMessage(p => ({ ...p, [reqId]: e.target.value }))}
                        />
                        <div className="flex gap-2">
                          <button
                            disabled={crSubmitting[reqId]}
                            onClick={async () => {
                              if (!customer || !reqId) return;
                              setCrSubmitting(p => ({ ...p, [reqId]: true }));
                              await supabase.from("portal_change_requests").insert({
                                customer_id: customer.id,
                                request_id: reqId,
                                subject: crSubject[reqId] || "Rückfrage zum Angebot",
                                message: crMessage[reqId] || "",
                              });
                              setCrSuccess(p => ({ ...p, [reqId]: true }));
                              setCrFormOpen(p => ({ ...p, [reqId]: false }));
                              setCrSubmitting(p => ({ ...p, [reqId]: false }));
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-all disabled:opacity-50"
                          >
                            <Send className="w-3.5 h-3.5" /> Senden
                          </button>
                          <button
                            onClick={() => setCrFormOpen(p => ({ ...p, [reqId]: false }))}
                            className="px-4 py-2.5 rounded-xl border border-black/[0.1] text-xs text-muted-foreground hover:bg-black/[0.03] transition-all"
                          >
                            Abbrechen
                          </button>
                        </div>
                        {crSuccess[reqId] && (
                          <p className="text-xs text-emerald-600 font-medium">✓ Nachricht gesendet – wir melden uns bald!</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Invoice widget */}
            {documents.filter(d => d.type === "Rechnung" || d.type === "Abschlagsrechnung" || d.type === "Schlussrechnung" || d.type === "Mahnung").length > 0 && (
              <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-black/[0.05] flex items-center justify-between">
                  <h2 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" /> Rechnungen
                  </h2>
                  <button onClick={() => setActiveTab("documents")} className="font-sans text-xs text-accent hover:text-accent/70 flex items-center gap-1">
                    Alle <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="divide-y divide-black/[0.04]">
                  {documents.filter(d => d.type === "Rechnung" || d.type === "Abschlagsrechnung" || d.type === "Schlussrechnung" || d.type === "Mahnung").map(doc => {
                    const days = doc.due_date ? Math.round((new Date(doc.due_date).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000) : null;
                    return (
                      <div key={doc.id} className="flex items-center gap-3 px-5 py-3.5">
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-foreground truncate">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            {doc.amount != null && (
                              <span className="font-sans text-xs text-muted-foreground">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(doc.amount)}</span>
                            )}
                            {doc.status === "bezahlt" ? (
                              <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Bezahlt ✓</span>
                            ) : days !== null ? (
                              <span className={`font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full ${days < 0 ? "bg-red-100 text-red-700" : days <= 7 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                                {days < 0 ? `${Math.abs(days)} Tage überfällig` : days === 0 ? "Heute fällig" : `fällig in ${days} Tagen`}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        {doc.file_url && (
                          <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-all">
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Auftragsbestätigung Widget */}
            {documents.filter(d => d.type === "Auftragsbestätigung").length > 0 && (
              <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-black/[0.05] flex items-center justify-between">
                  <h2 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" /> Auftragsbestätigung
                  </h2>
                  <button onClick={() => setActiveTab("documents")} className="font-sans text-xs text-accent hover:text-accent/70 flex items-center gap-1">
                    Dokumente <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {documents.filter(d => d.type === "Auftragsbestätigung").map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5">
                        {new Date(doc.created_at).toLocaleDateString("de-DE")}
                        {doc.amount != null && ` · ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(doc.amount)}`}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadPdf(doc)}
                      disabled={pdfLoading === doc.id}
                      className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
                        doc.file_url || doc.preview_html
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      {pdfLoading === doc.id
                        ? <span className="w-4 h-4 rounded-full border-2 border-green-300 border-t-green-600 animate-spin" />
                        : <Download className="w-4 h-4" />
                      }
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state CTA */}
            {requests.length === 0 && (
              <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm text-center">
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
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base sm:text-lg font-bold text-foreground">Status Ihrer Anfrage</h2>
                  <span className="font-sans text-sm text-accent font-semibold">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/[0.06] rounded-full mb-7 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent/70 to-accent rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-[15px] top-4 bottom-4 w-px bg-black/[0.08]" />
                  <div className="space-y-1">
                    {timelineSteps.map((step, i) => {
                      const isCurrent = i === currentStepIndex;
                      return (
                        <div key={i} className="relative flex items-start gap-4 py-2">
                          <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 transition-all ${
                            step.done
                              ? "bg-accent border-accent"
                              : isCurrent
                              ? "bg-white border-accent shadow-[0_0_0_4px_hsl(var(--accent)/0.12)]"
                              : "bg-white border-black/[0.1]"
                          }`}>
                            {step.done ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            ) : isCurrent ? (
                              <Circle className="w-3 h-3 text-accent fill-accent/30" />
                            ) : (
                              <Circle className="w-3 h-3 text-black/20" />
                            )}
                          </div>
                          <div className="pt-1 flex-1 min-w-0">
                            <p className={`font-sans text-sm ${
                              step.done ? "text-foreground font-medium" : isCurrent ? "text-foreground font-semibold" : "text-foreground/40"
                            }`}>
                              {step.label}
                              {isCurrent && !step.action && (
                                <span className="ml-2 font-sans text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-accent/10 text-accent">Aktuell</span>
                              )}
                              {isCurrent && step.action === "details_antworten" && (
                                <span className="ml-2 font-sans text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-600 border border-violet-500/20">Ihre Antwort benötigt</span>
                              )}
                            </p>
                            {step.hint && <p className="font-sans text-xs text-muted-foreground mt-0.5">{step.hint}</p>}
                            {step.action === "details_antworten" && isCurrent && (
                              <div className="mt-3">
                                {detailsReplySuccess ? (
                                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                    <CheckCircle2 className="w-4 h-4" /> Antwort gesendet!
                                  </div>
                                ) : !detailsReplyOpen ? (
                                  <button
                                    onClick={() => setDetailsReplyOpen(true)}
                                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-xl px-4 py-2.5 transition-all active:scale-95"
                                  >
                                    <Send className="w-3.5 h-3.5" /> Jetzt antworten
                                  </button>
                                ) : (
                                  <div className="space-y-3 mt-1">
                                    <p className="font-sans text-xs text-muted-foreground">Bitte teilen Sie uns die gewünschten Details mit:</p>
                                    <textarea
                                      value={detailsReplyMsg}
                                      onChange={(e) => setDetailsReplyMsg(e.target.value)}
                                      placeholder="Ihre Antwort schreiben…"
                                      rows={4}
                                      className="w-full rounded-xl bg-black/[0.02] border border-black/[0.1] px-4 py-3 text-sm text-foreground placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500/30 transition-all resize-none"
                                    />
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={submitDetailsReply}
                                        disabled={detailsReplySending || !detailsReplyMsg.trim()}
                                        className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 rounded-xl px-4 py-2.5 transition-all active:scale-95"
                                      >
                                        <Send className="w-3.5 h-3.5" /> {detailsReplySending ? "Senden…" : "Absenden"}
                                      </button>
                                      <button
                                        onClick={() => { setDetailsReplyOpen(false); setDetailsReplyMsg(""); }}
                                        className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2.5"
                                      >
                                        Abbrechen
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Current request card – nur wenn NICHT gebucht (sonst zeigt Event-Card) */}
            {currentRequest && !currentRequest.event_id && (
              <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-black/[0.05] flex items-center justify-between">
                  <h2 className="font-display text-sm font-bold text-foreground">Aktuelle Anfrage</h2>
                  <button onClick={() => setActiveTab("requests")} className="font-sans text-xs text-accent hover:text-accent/70 transition-colors flex items-center gap-1">
                    Alle <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{capWords(currentRequest.anlass) || "Anfrage"}</h3>
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
              <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-black/[0.05] flex items-center justify-between">
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
            <div className="rounded-2xl border border-black/[0.06] bg-white/80 shadow-sm p-5 flex items-center gap-4">
              <img
                src="https://www.magicel.de/assets/hero-magic-D6fUzBvI.jpg"
                alt="Emilian Leber"
                className="w-11 h-11 rounded-full object-cover object-top shrink-0 ring-2 ring-accent/20"
              />
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-semibold text-foreground">Emilian Leber</p>
                <p className="font-sans text-xs text-muted-foreground">Ihr persönlicher Ansprechpartner</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a href="mailto:el@magicel.de" className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all active:scale-95">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="tel:+4915563744696" className="w-10 h-10 rounded-xl bg-black/[0.03] flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-accent/10 transition-all active:scale-95">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── EVENTS ── */}
        {activeTab === "__disabled_events__" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-xl font-bold text-foreground border-l-[3px] border-accent pl-3">Events</h1>
              {events.length > 0 && (
                <span className="font-sans text-xs text-muted-foreground border border-black/[0.07] rounded-full px-2.5 py-1">
                  {events.length} {events.length === 1 ? "Event" : "Events"}
                </span>
              )}
            </div>

            {events.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-black/[0.06] shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-7 h-7 text-muted-foreground/30" />
                </div>
                <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Events</p>
                <p className="font-sans text-sm text-muted-foreground">Ihre gebuchten Events erscheinen hier.</p>
              </div>
            ) : (
              events.map((e) => {
                const days = getCountdownDays(e.event_date);
                return (
                  <div key={e.id} className="rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-accent/20 hover:shadow-md transition-all overflow-hidden">
                    <div className="p-5 pb-4">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <h3 className="font-display text-base font-bold text-foreground">{e.title}</h3>
                        <span className={`font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${formatEventStatusClasses(e.status)}`}>
                          {formatEventStatusLabel(e.status)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm text-muted-foreground">
                        {e.event_date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {new Date(e.event_date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                          </span>
                        )}
                        {e.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accent" />{e.location}</span>}
                        {e.format && <span className="flex items-center gap-1.5"><Theater className="w-3.5 h-3.5 text-accent" />{e.format}</span>}
                        {e.guests && <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-accent" />{e.guests} Gäste</span>}
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

                    {e.event_date && (
                      <div className="px-5 pb-5 pt-1">
                        <button
                          onClick={() => downloadICS(e)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans text-sm text-accent border border-accent/20 rounded-xl px-4 py-2.5 transition-all hover:bg-accent/5 active:scale-95 min-h-[44px]"
                        >
                          <CalendarPlus className="w-4 h-4" />
                          Zum Kalender hinzufügen (.ics)
                        </button>
                      </div>
                    )}

                    {/* Change request section */}
                    <div className="px-5 pb-5 border-t border-black/[0.05] mt-1 pt-4">
                      {changeRequests.filter((cr) => cr.event_id === e.id).map((cr) => (
                        <div key={cr.id} className="mb-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.06] space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-sans text-xs font-semibold text-foreground">{cr.subject}</p>
                            {crStatusBadge(cr.status)}
                          </div>
                          <p className="font-sans text-xs text-muted-foreground">{cr.message}</p>
                          {cr.admin_response && (
                            <p className="font-sans text-xs text-foreground bg-black/[0.02] rounded-lg px-3 py-2 mt-1">💬 {cr.admin_response}</p>
                          )}
                        </div>
                      ))}

                      {crSuccess[e.id] && (
                        <p className="font-sans text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-3">✓ Änderungswunsch wurde übermittelt.</p>
                      )}

                      {!["event_erfolgt", "storniert"].includes(e.status || "") && (
                        <>
                          {crFormOpen[e.id] ? (
                            <div className="space-y-3 mt-2">
                              <input
                                value={crSubject[e.id] || ""}
                                onChange={(ev) => setCrSubject((p) => ({ ...p, [e.id]: ev.target.value }))}
                                placeholder="Kurzbeschreibung (z.B. Datum ändern)"
                                className="w-full rounded-xl bg-black/[0.02] border border-black/[0.1] px-4 py-2.5 text-sm text-foreground placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                              />
                              <textarea
                                value={crMessage[e.id] || ""}
                                onChange={(ev) => setCrMessage((p) => ({ ...p, [e.id]: ev.target.value }))}
                                placeholder="Details zu Ihrem Änderungswunsch..."
                                rows={3}
                                className="w-full rounded-xl bg-black/[0.02] border border-black/[0.1] px-4 py-2.5 text-sm text-foreground placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 resize-none transition-all"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => submitChangeRequest(e.id, "event")}
                                  disabled={crSubmitting[e.id] || !crSubject[e.id]?.trim() || !crMessage[e.id]?.trim()}
                                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-all"
                                >
                                  <Send className="w-3.5 h-3.5" /> {crSubmitting[e.id] ? "Sendet…" : "Absenden"}
                                </button>
                                <button
                                  onClick={() => setCrFormOpen((p) => ({ ...p, [e.id]: false }))}
                                  className="px-4 py-2 rounded-xl border border-black/[0.1] text-sm text-muted-foreground hover:text-foreground"
                                >
                                  Abbrechen
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2 mt-1">
                              <button
                                onClick={() => setCrFormOpen((p) => ({ ...p, [e.id]: true }))}
                                className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 font-medium"
                              >
                                <MessageCircle className="w-4 h-4" /> Änderung vorschlagen
                              </button>
                              <button
                                onClick={() => setEventCancelId(e.id)}
                                className="flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 font-medium"
                              >
                                <X className="w-4 h-4" /> Event stornieren
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── DOKUMENTE ── */}
        {activeTab === "documents" && (() => {
          const rechnungsTypen = ["Rechnung", "Abschlagsrechnung", "Schlussrechnung", "Mahnung"];
          const rechnungen = documents.filter(d => rechnungsTypen.includes(d.type || ""));
          const angebote = documents.filter(d => d.type === "Angebot");
          const vertraege = documents.filter(d => d.type === "Vertrag" || d.type === "Auftragsbestätigung");
          const sonstiges = documents.filter(d => !rechnungsTypen.includes(d.type || "") && d.type !== "Angebot" && d.type !== "Vertrag" && d.type !== "Auftragsbestätigung");

          const getDue = (doc: PortalDocument): number | null => {
            if (!doc.due_date) return null;
            const today = new Date(); today.setHours(0,0,0,0);
            const due = new Date(doc.due_date); due.setHours(0,0,0,0);
            return Math.round((due.getTime() - today.getTime()) / (1000*60*60*24));
          };

          const renderDocRow = (doc: PortalDocument, showDue = false) => {
            const days = showDue ? getDue(doc) : null;
            return (
              <div key={doc.id} className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-sm hover:border-accent/20 hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-black/[0.03] border border-black/[0.05] flex items-center justify-center text-xl shrink-0">
                  {getDocTypeIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold text-foreground truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <p className="font-sans text-xs text-muted-foreground">
                      {doc.type} · {new Date(doc.created_at).toLocaleDateString("de-DE")}
                    </p>
                    {doc.amount != null && (
                      <span className="font-sans text-xs text-muted-foreground">{new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(doc.amount)}</span>
                    )}
                    {doc.status === "bezahlt" ? (
                      <span className="font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">Bezahlt ✓</span>
                    ) : days !== null ? (
                      <span className={`font-sans text-[10px] font-semibold px-2 py-0.5 rounded-full ${days < 0 ? "bg-red-100 text-red-700" : days <= 7 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {days < 0 ? `${Math.abs(days)} Tage überfällig` : days === 0 ? "Heute fällig" : `fällig in ${days} Tagen`}
                      </span>
                    ) : null}
                  </div>
                </div>
                <button
                  onClick={() => downloadPdf(doc)}
                  disabled={pdfLoading === doc.id}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-all active:scale-95 shrink-0 gap-2 px-3"
                >
                  {pdfLoading === doc.id
                    ? <span className="w-4 h-4 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                    : <Download className="w-4 h-4" />
                  }
                  <span className="font-sans text-xs font-medium hidden sm:inline">Download</span>
                </button>
              </div>
            );
          };

          const SectionHeader = ({ title, count }: { title: string; count: number }) => (
            <div className="flex items-center gap-2 mb-3 mt-5 first:mt-0">
              <div className="w-1 h-4 rounded-full bg-accent" />
              <h2 className="font-display text-sm font-bold text-foreground uppercase tracking-wide">{title}</h2>
              <span className="font-sans text-[10px] text-muted-foreground border border-black/[0.07] rounded-full px-2 py-0.5 ml-auto">{count}</span>
            </div>
          );

          return (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-display text-xl font-bold text-foreground border-l-[3px] border-accent pl-3">Dokumente</h1>
                {documents.length > 0 && (
                  <span className="font-sans text-xs text-muted-foreground border border-black/[0.07] rounded-full px-2.5 py-1">
                    {documents.length} {documents.length === 1 ? "Datei" : "Dateien"}
                  </span>
                )}
              </div>

              {documents.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white border border-black/[0.06] shadow-sm text-center">
                  <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center mx-auto mb-4">
                    <FolderOpen className="w-7 h-7 text-muted-foreground/30" />
                  </div>
                  <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Dokumente</p>
                  <p className="font-sans text-sm text-muted-foreground">Verträge, Rechnungen und Angebote erscheinen hier.</p>
                </div>
              ) : (
                <>
                  {rechnungen.length > 0 && (
                    <div>
                      <SectionHeader title="Rechnungen" count={rechnungen.length} />
                      <div className="space-y-3">{rechnungen.map(doc => renderDocRow(doc, true))}</div>
                    </div>
                  )}
                  {angebote.length > 0 && (
                    <div>
                      <SectionHeader title="Angebote" count={angebote.length} />
                      <div className="space-y-3">
                        {angebote.map(doc => {
                          const isOffen = doc.status === "gesendet";
                          const reqId = doc.request_id;
                          const isLoading = reqId ? !!offerActionLoading[reqId] : false;
                          const errMsg = reqId ? offerActionError[reqId] : null;

                          if (!isOffen) return renderDocRow(doc, false);

                          const doAction = async (action: "accept" | "reject") => {
                            if (!reqId) return;
                            setOfferActionLoading(p => ({ ...p, [reqId]: true }));
                            setOfferActionError(p => ({ ...p, [reqId]: "" }));
                            const { error } = await supabase.functions.invoke("portal-offer-action", {
                              body: { action, request_id: reqId },
                            });
                            if (error) {
                              setOfferActionError(p => ({ ...p, [reqId]: "Fehler – bitte versuche es erneut." }));
                            } else {
                              setDocuments(prev => prev.map(d => d.id === doc.id ? { ...d, status: action === "accept" ? "akzeptiert" : "abgelehnt" } : d));
                              setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: action === "accept" ? "gebucht" : "abgelehnt" } : r));
                            }
                            setOfferActionLoading(p => ({ ...p, [reqId]: false }));
                          };

                          const betrag = doc.amount ?? doc.brutto;

                          return (
                            <div key={doc.id} className="rounded-2xl overflow-hidden border border-blue-200/60 bg-white shadow-sm">
                              <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
                              <div className="p-5">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <div>
                                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1">🎉 Dein Angebot ist fertig</span>
                                    <p className="font-sans text-sm font-semibold text-foreground">{doc.name}</p>
                                    <p className="font-sans text-xs text-muted-foreground">{new Date(doc.created_at).toLocaleDateString("de-DE")}</p>
                                  </div>
                                  <div className="text-right shrink-0">
                                    {betrag != null && (
                                      <p className="font-display text-lg font-bold text-foreground">
                                        {new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(betrag)}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Angebot öffnen */}
                                {doc.preview_html && (
                                  <button
                                    onClick={() => downloadPdf(doc)}
                                    disabled={pdfLoading === doc.id}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold transition-all active:scale-[0.98] mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                  >
                                    {pdfLoading === doc.id
                                      ? <><span className="w-4 h-4 rounded-full border-2 border-indigo-300 border-t-indigo-700 animate-spin" /> PDF wird erstellt…</>
                                      : <><Download className="w-4 h-4" /> Angebot als PDF herunterladen</>
                                    }
                                  </button>
                                )}

                                {/* Annehmen */}
                                <button
                                  disabled={isLoading || !reqId}
                                  onClick={() => doAction("accept")}
                                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-sm shadow-emerald-300 transition-all active:scale-[0.98] disabled:opacity-50 mb-2"
                                >
                                  {isLoading ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                  Angebot annehmen
                                </button>

                                {/* Fragen + Ablehnen */}
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => reqId && setCrFormOpen(p => ({ ...p, [reqId]: true }))}
                                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-black/[0.1] text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-black/[0.03] transition-all"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" /> Frage stellen
                                  </button>
                                  <button
                                    disabled={isLoading || !reqId}
                                    onClick={() => doAction("reject")}
                                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl border border-black/[0.08] text-xs font-medium text-muted-foreground/70 hover:text-muted-foreground hover:bg-black/[0.03] transition-all disabled:opacity-50"
                                  >
                                    <X className="w-3.5 h-3.5" /> Ablehnen
                                  </button>
                                </div>

                                {errMsg && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mt-2">{errMsg}</p>}

                                {reqId && crFormOpen[reqId] && (
                                  <div className="mt-3 pt-3 border-t border-black/[0.05] space-y-2">
                                    <input className={inputCls} placeholder="Betreff" value={crSubject[reqId] || ""} onChange={e => setCrSubject(p => ({ ...p, [reqId]: e.target.value }))} />
                                    <textarea className={inputCls + " resize-none"} rows={3} placeholder="Nachricht…" value={crMessage[reqId] || ""} onChange={e => setCrMessage(p => ({ ...p, [reqId]: e.target.value }))} />
                                    <div className="flex gap-2">
                                      <button disabled={crSubmitting[reqId]} onClick={async () => {
                                        if (!customer || !reqId) return;
                                        setCrSubmitting(p => ({ ...p, [reqId]: true }));
                                        await supabase.from("portal_change_requests").insert({ customer_id: customer.id, request_id: reqId, subject: crSubject[reqId] || "Rückfrage zum Angebot", message: crMessage[reqId] || "" });
                                        setCrSuccess(p => ({ ...p, [reqId]: true }));
                                        setCrFormOpen(p => ({ ...p, [reqId]: false }));
                                        setCrSubmitting(p => ({ ...p, [reqId]: false }));
                                      }} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-80 transition-all disabled:opacity-50">
                                        <Send className="w-3.5 h-3.5" /> Senden
                                      </button>
                                      <button onClick={() => setCrFormOpen(p => ({ ...p, [reqId]: false }))} className="px-4 py-2.5 rounded-xl border border-black/[0.1] text-xs text-muted-foreground hover:bg-black/[0.03] transition-all">Abbrechen</button>
                                    </div>
                                    {crSuccess[reqId] && <p className="text-xs text-emerald-600 font-medium">✓ Nachricht gesendet!</p>}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {vertraege.length > 0 && (
                    <div>
                      <SectionHeader title="Verträge" count={vertraege.length} />
                      <div className="space-y-3">{vertraege.map(doc => renderDocRow(doc, false))}</div>
                    </div>
                  )}
                  {sonstiges.length > 0 && (
                    <div>
                      <SectionHeader title="Sonstige Dokumente" count={sonstiges.length} />
                      <div className="space-y-3">{sonstiges.map(doc => renderDocRow(doc, false))}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })()}

        {/* ── ANFRAGEN ── */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-display text-xl font-bold text-foreground border-l-[3px] border-accent pl-3">Anfragen & Events</h1>
            </div>

            {requests.length === 0 ? (
              <div className="p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center mx-auto mb-4">
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
              requests.map((r) => {
                const isOpen = expandedRequestId === r.id;
                const linkedEvent = events.find(e => e.request_id === r.id);
                const days = linkedEvent ? getCountdownDays(linkedEvent.event_date) : null;
                return (
                  <div key={r.id} className={`rounded-2xl bg-white shadow-sm overflow-hidden ${linkedEvent ? "border border-green-200/60" : "border border-black/[0.06]"}`}>
                    <button
                      type="button"
                      onClick={() => setExpandedRequestId(isOpen ? null : r.id)}
                      className="w-full text-left p-5 hover:bg-black/[0.03] transition-colors min-h-[72px] active:bg-black/[0.04]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                            <h3 className="font-display text-base font-bold text-foreground">{capWords(r.anlass) || "Anfrage"}</h3>
                            <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${linkedEvent ? "text-green-600 bg-green-50 border border-green-200" : formatStatusClasses(r.status)}`}>
                              {linkedEvent ? "Gebucht" : formatStatusLabel(r.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
                            {linkedEvent ? (
                              <>
                                {linkedEvent.event_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(linkedEvent.event_date).toLocaleDateString("de-DE")}</span>}
                                {linkedEvent.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{linkedEvent.location}</span>}
                                {linkedEvent.guests && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{linkedEvent.guests} Gäste</span>}
                              </>
                            ) : (
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(r.created_at).toLocaleDateString("de-DE")}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {days !== null && days >= 0 && (
                            <div className="text-right">
                              <p className="font-display text-xl font-bold text-accent">{days}</p>
                              <p className="text-[10px] text-muted-foreground">Tage</p>
                            </div>
                          )}
                          <div className="text-muted-foreground mt-0.5">
                            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 border-t border-black/[0.05]">
                        <div className="grid sm:grid-cols-2 gap-3 mt-4">
                          {[
                            { label: "Datum", icon: Calendar, value: r.datum ? new Date(r.datum).toLocaleDateString("de-DE") : "Nicht angegeben" },
                            { label: "Ort", icon: MapPin, value: capWords(r.ort) || "Nicht angegeben" },
                            { label: "Gäste", icon: Users, value: r.gaeste != null ? String(r.gaeste) : "Nicht angegeben" },
                            { label: "Format", icon: Theater, value: capWords(r.format) || "Nicht angegeben" },
                            { label: "Telefon", icon: Phone, value: r.phone || "Nicht angegeben" },
                            { label: "E-Mail", icon: Mail, value: r.email },
                            ...(r.firma ? [{ label: "Firma", icon: Building2, value: r.firma }] : []),
                          ].map((field) => (
                            <div key={field.label} className="rounded-xl bg-black/[0.015] border border-black/[0.05] p-3.5">
                              <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{field.label}</p>
                              <p className="font-sans text-sm text-foreground flex items-center gap-2">
                                <field.icon className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span className="truncate">{field.value}</span>
                              </p>
                            </div>
                          ))}
                        </div>
                        {r.nachricht && (
                          <div className="mt-3 rounded-xl bg-black/[0.015] border border-black/[0.05] p-3.5">
                            <p className="font-sans text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Nachricht</p>
                            <p className="font-sans text-sm text-foreground leading-relaxed whitespace-pre-line">{r.nachricht}</p>
                          </div>
                        )}

                        {/* Offer section */}
                        {r.status === "angebot_gesendet" && (
                          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className="w-4 h-4 text-accent" />
                              <p className="font-sans text-sm font-bold text-foreground">Ein Angebot liegt vor</p>
                            </div>
                            <p className="font-sans text-xs text-muted-foreground mb-4">Emilian hat Ihnen ein Angebot unterbreitet. Bitte wählen Sie eine Aktion:</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                                disabled={offerActionLoading[r.id]}
                                onClick={async () => {
                                  if (!customer) return;
                                  setOfferActionLoading(p => ({ ...p, [r.id]: true }));
                                  setOfferActionError(p => ({ ...p, [r.id]: "" }));
                                  const { error } = await supabase.functions.invoke("portal-offer-action", {
                                    body: { action: "accept", request_id: r.id },
                                  });
                                  if (error) {
                                    setOfferActionError(p => ({ ...p, [r.id]: "Fehler beim Annehmen. Bitte versuche es erneut." }));
                                  } else {
                                    setCrSuccess(p => ({ ...p, [r.id]: true }));
                                    setRequests(prev => prev.map(req => req.id === r.id ? { ...req, status: "gebucht" } : req));
                                  }
                                  setOfferActionLoading(p => ({ ...p, [r.id]: false }));
                                }}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {offerActionLoading[r.id] ? <span className="w-4 h-4 rounded-full border-2 border-background/30 border-t-background animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Angebot annehmen
                              </button>
                              <button
                                onClick={() => setCrFormOpen(p => ({ ...p, [r.id]: true }))}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black/[0.1] text-sm font-medium text-foreground hover:bg-black/[0.04] transition-all"
                              >
                                <MessageCircle className="w-4 h-4" /> Rückfrage / Änderung
                              </button>
                              <button
                                disabled={offerActionLoading[r.id]}
                                onClick={async () => {
                                  if (!customer) return;
                                  setOfferActionLoading(p => ({ ...p, [r.id]: true }));
                                  setOfferActionError(p => ({ ...p, [r.id]: "" }));
                                  const { error } = await supabase.functions.invoke("portal-offer-action", {
                                    body: { action: "reject", request_id: r.id },
                                  });
                                  if (error) {
                                    setOfferActionError(p => ({ ...p, [r.id]: "Fehler beim Ablehnen. Bitte versuche es erneut." }));
                                  } else {
                                    setCrSuccess(p => ({ ...p, [r.id]: true }));
                                    setRequests(prev => prev.map(req => req.id === r.id ? { ...req, status: "abgelehnt" } : req));
                                  }
                                  setOfferActionLoading(p => ({ ...p, [r.id]: false }));
                                }}
                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-destructive/30 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <X className="w-4 h-4" /> Ablehnen
                              </button>
                            </div>
                            {offerActionError[r.id] && (
                              <p className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 mt-3">{offerActionError[r.id]}</p>
                            )}
                          </div>
                        )}

                        {/* Change request section */}
                        <div className="mt-4 pt-4 border-t border-black/[0.05]">
                          {changeRequests.filter((cr) => cr.request_id === r.id).map((cr) => (
                            <div key={cr.id} className="mb-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.06] space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-sans text-xs font-semibold text-foreground">{cr.subject}</p>
                                {crStatusBadge(cr.status)}
                              </div>
                              <p className="font-sans text-xs text-muted-foreground">{cr.message}</p>
                              {cr.admin_response && (
                                <p className="font-sans text-xs text-foreground bg-black/[0.02] rounded-lg px-3 py-2 mt-1">💬 {cr.admin_response}</p>
                              )}
                            </div>
                          ))}

                          {crSuccess[r.id] && (
                            <p className="font-sans text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-3">✓ Änderungswunsch wurde übermittelt.</p>
                          )}

                          {!["gebucht", "bestätigt", "abgelehnt", "archiviert", "storniert"].includes(r.status || "") && (
                            <>
                              {crFormOpen[r.id] ? (
                                <div className="space-y-3 mt-2">
                                  <input
                                    value={crSubject[r.id] || ""}
                                    onChange={(ev) => setCrSubject((p) => ({ ...p, [r.id]: ev.target.value }))}
                                    placeholder="Kurzbeschreibung (z.B. Datum ändern)"
                                    className="w-full rounded-xl bg-black/[0.02] border border-black/[0.1] px-4 py-2.5 text-sm text-foreground placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 transition-all"
                                  />
                                  <textarea
                                    value={crMessage[r.id] || ""}
                                    onChange={(ev) => setCrMessage((p) => ({ ...p, [r.id]: ev.target.value }))}
                                    placeholder="Details zu Ihrem Änderungswunsch..."
                                    rows={3}
                                    className="w-full rounded-xl bg-black/[0.02] border border-black/[0.1] px-4 py-2.5 text-sm text-foreground placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/30 resize-none transition-all"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => submitChangeRequest(r.id, "request")}
                                      disabled={crSubmitting[r.id] || !crSubject[r.id]?.trim() || !crMessage[r.id]?.trim()}
                                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-all"
                                    >
                                      <Send className="w-3.5 h-3.5" /> {crSubmitting[r.id] ? "Sendet…" : "Absenden"}
                                    </button>
                                    <button
                                      onClick={() => setCrFormOpen((p) => ({ ...p, [r.id]: false }))}
                                      className="px-4 py-2 rounded-xl border border-black/[0.1] text-sm text-muted-foreground hover:text-foreground"
                                    >
                                      Abbrechen
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-2 mt-1">
                                  <button
                                    onClick={() => setCrFormOpen((p) => ({ ...p, [r.id]: true }))}
                                    className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 font-medium"
                                  >
                                    <MessageCircle className="w-4 h-4" /> Änderung vorschlagen
                                  </button>

                                  {/* Withdraw request */}
                                  {withdrawConfirm[r.id] ? (
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                      <p className="font-sans text-xs text-muted-foreground">Wirklich zurückziehen?</p>
                                      <button
                                        onClick={async () => {
                                          if (!customer) return;
                                          await supabase.from("portal_change_requests").insert({ customer_id: customer.id, request_id: r.id, subject: "Anfrage zurückziehen", message: "Kunde möchte die Anfrage zurückziehen.", status: "offen", action: "stornierung_anfrage" });
                                          setWithdrawConfirm(p => ({ ...p, [r.id]: false }));
                                          setCrSuccess(p => ({ ...p, [r.id + "_withdraw"]: true }));
                                          notifyAdmin(`🔙 Anfrage zurückgezogen – ${customer.name || customer.email}`, `<p><strong>${customer.name || customer.email}</strong> möchte die Anfrage <strong>${r.anlass || ""}</strong> zurückziehen.</p><p><a href="https://magicel.de/admin/requests/${r.id}" style="background:#0a0a0a;color:#fff;padding:10px 20px;border-radius:10px;text-decoration:none;">Anfrage öffnen →</a></p>`);
                                          setTimeout(() => setCrSuccess(p => ({ ...p, [r.id + "_withdraw"]: false })), 4000);
                                        }}
                                        className="font-sans text-xs font-semibold text-destructive border border-destructive/20 rounded-lg px-3 py-1.5 hover:bg-destructive/5 transition-all"
                                      >
                                        Ja
                                      </button>
                                      <button
                                        onClick={() => setWithdrawConfirm(p => ({ ...p, [r.id]: false }))}
                                        className="font-sans text-xs text-muted-foreground border border-black/[0.1] rounded-lg px-3 py-1.5 hover:text-foreground transition-all"
                                      >
                                        Abbrechen
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setWithdrawConfirm(p => ({ ...p, [r.id]: true }))}
                                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive font-medium transition-colors"
                                    >
                                      <X className="w-4 h-4" /> Anfrage zurückziehen
                                    </button>
                                  )}
                                  {crSuccess[r.id + "_withdraw"] && (
                                    <p className="font-sans text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">✓ Ihre Stornierungsanfrage wurde übermittelt.</p>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </div>
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
                <h1 className="font-display text-xl font-bold text-foreground border-l-[3px] border-accent pl-3">Nachrichten</h1>
                {unreadCount > 0 && (
                  <span className="font-sans text-xs text-accent border border-accent/30 bg-accent/10 rounded-full px-2.5 py-1">
                    {unreadCount} ungelesen
                  </span>
                )}
              </div>

              {allMails.length === 0 ? (
                <div className="p-12 rounded-3xl bg-white border border-black/[0.06] shadow-sm text-center">
                  <div className="w-14 h-14 rounded-full bg-black/[0.03] flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-muted-foreground/30" />
                  </div>
                  <p className="font-display text-base font-bold text-foreground mb-1">Noch keine Nachrichten</p>
                  <p className="font-sans text-sm text-muted-foreground">Kommunikation mit Emilian Leber erscheint hier.</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden divide-y divide-black/[0.05]">
                  {allMails.map((msg) => {
                    const isFromAdmin = msg._dir === "from_admin";
                    const isUnread = isFromAdmin && !msg.read_by_customer;
                    const isExpanded = expandedMailId === msg.id;
                    const dateStr = new Date(msg._date).toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
                    const fullDate = new Date(msg._date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
                    // Extract preview text from body
                    const rawBody = isFromAdmin ? (msg as any).body : ((msg as any).body_text || "");
                    const previewText = rawBody?.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().slice(0, 120) || "";

                    return (
                      <div
                        key={msg.id}
                        className={`transition-colors ${isUnread ? "bg-accent/[0.03]" : ""} ${isExpanded ? "" : "cursor-pointer hover:bg-black/[0.015]"}`}
                        onClick={() => !isExpanded && setExpandedMailId(msg.id)}
                      >
                        {/* Header row - always visible */}
                        <div className="px-5 py-3.5 flex items-center gap-3">
                          {isFromAdmin ? (
                            <img src="https://www.magicel.de/assets/hero-magic-D6fUzBvI.jpg" alt="EL" className="w-9 h-9 rounded-full object-cover object-top shrink-0" />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-black/[0.04] text-muted-foreground flex items-center justify-center shrink-0 text-xs font-bold">
                              {customer?.name?.[0]?.toUpperCase() || "K"}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={`font-sans text-xs font-semibold ${isFromAdmin ? "text-accent" : "text-muted-foreground"}`}>
                                {isFromAdmin ? "Emilian Leber" : "Sie"}
                              </p>
                              <span className="font-sans text-[11px] text-muted-foreground/50">{dateStr}</span>
                              {isUnread && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                            </div>
                            <p className="font-sans text-sm font-semibold text-foreground truncate">{msg.subject || "(Kein Betreff)"}</p>
                            {!isExpanded && previewText && (
                              <p className="font-sans text-xs text-muted-foreground/60 truncate mt-0.5">{previewText}…</p>
                            )}
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setExpandedMailId(isExpanded ? null : msg.id); }}
                            className="shrink-0 p-1.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                          </button>
                        </div>

                        {/* Expanded body */}
                        {isExpanded && (
                          <div className="px-5 pb-4 border-t border-black/[0.04]">
                            <div className="pt-4 pl-12">
                              {(() => {
                                const bodyContent = isFromAdmin
                                  ? (msg as any).body || ""
                                  : (msg as any).body_html || (msg as any).body_text || "";
                                const isHtml = /<[a-z][\s\S]*>/i.test(bodyContent);
                                if (!bodyContent) return <p className="font-sans text-sm text-muted-foreground italic">Kein Inhalt.</p>;
                                if (isHtml) {
                                  return <div className="font-sans text-sm text-foreground/80 leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:mb-2 [&_li]:mb-1 [&_br]:block [&_a]:text-accent [&_a]:underline [&_strong]:font-semibold [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mb-1" dangerouslySetInnerHTML={{ __html: bodyContent }} />;
                                }
                                // Plain text: Zeilenumbrüche als <br>, Bullet Points als Liste
                                const formatted = bodyContent
                                  .replace(/•\s*/g, "• ")
                                  .split("\n")
                                  .map((line: string, i: number) => {
                                    const trimmed = line.trim();
                                    if (trimmed.startsWith("•")) {
                                      return <li key={i} className="font-sans text-sm text-foreground/80 ml-4 mb-1">{trimmed.slice(1).trim()}</li>;
                                    }
                                    return trimmed ? <p key={i} className="font-sans text-sm text-foreground/80 mb-1.5">{trimmed}</p> : <br key={i} />;
                                  });
                                return <div className="leading-relaxed">{formatted}</div>;
                              })()}
                              <p className="font-sans text-[11px] text-muted-foreground/40 mt-4">{fullDate}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Inline Antwort-Formular */}
              <div className="rounded-2xl border border-black/[0.06] bg-white shadow-sm p-5">
                <p className="font-sans text-sm font-semibold text-foreground mb-3">Nachricht an Emilian</p>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Ihre Nachricht…"
                  rows={3}
                  className="w-full rounded-xl bg-black/[0.02] border border-black/[0.08] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none mb-3"
                />
                <div className="flex items-center justify-between">
                  <p className="font-sans text-[11px] text-muted-foreground">Wird direkt per E-Mail zugestellt</p>
                  <button
                    onClick={async () => {
                      if (!replyText.trim() || !customer?.email) return;
                      setReplySending(true);
                      try {
                        await supabase.functions.invoke("send-customer-mail", {
                          body: {
                            to: "el@magicel.de",
                            subject: `Nachricht von ${customer.name || customer.email}`,
                            body: replyText.trim(),
                            customer_id: customer.id,
                            from_name: customer.name || "Kunde",
                            reply_to: customer.email,
                          },
                        });
                        setReplyText("");
                        setReplySent(true);
                        setTimeout(() => setReplySent(false), 4000);
                      } catch { /* ignore */ }
                      setReplySending(false);
                    }}
                    disabled={!replyText.trim() || replySending}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-all active:scale-95"
                  >
                    {replySending ? (
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                    ) : replySent ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    {replySent ? "Gesendet!" : "Senden"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ── EINSTELLUNGEN ── */}
        {activeTab === "einstellungen" && (
          <div className="space-y-5 max-w-2xl">
            <h1 className="font-display text-xl font-bold text-foreground border-l-[3px] border-accent pl-3 mb-2">Einstellungen</h1>

            {/* Avatar upload */}
            <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm p-5">
              <h2 className="font-display text-sm font-bold text-foreground flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-accent" />
                Profilbild
              </h2>
              <div className="flex items-center gap-5">
                <AvatarDisplay name={displayName} avatarUrl={customer?.avatar_url} size="lg" />
                <div className="flex-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 font-sans text-sm border border-black/[0.1] rounded-xl px-4 py-2.5 hover:border-accent/30 hover:bg-black/[0.03] transition-all">
                    <Upload className="w-4 h-4 text-accent" />
                    {avatarUploading ? "Wird hochgeladen…" : "Bild hochladen"}
                    <input type="file" accept="image/*" className="hidden" disabled={avatarUploading} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAvatar(f); }} />
                  </label>
                  <p className="font-sans text-xs text-muted-foreground mt-2">JPG, PNG oder WebP · Max. 5 MB</p>
                  {avatarError && <p className="font-sans text-xs text-red-600 mt-1">{avatarError}</p>}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.05]">
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

            <div className="rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-black/[0.05]">
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
              <div className={`rounded-xl px-4 py-3 font-sans text-sm border ${settingsMsg.includes("Fehler") ? "text-red-600 bg-red-50 border-red-200" : "text-emerald-700 bg-emerald-50 border-emerald-200"}`}>
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
              <div className="rounded-2xl border border-black/[0.06] bg-white shadow-sm p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">Abmelden</p>
                  <p className="font-sans text-xs text-muted-foreground">Von Ihrem Kundenportal abmelden</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 font-sans text-sm text-red-600 border border-destructive/30 rounded-xl px-4 py-2.5 hover:bg-red-50 transition-all active:scale-95 min-h-[44px]"
                >
                  <LogOut className="w-4 h-4" />
                  Abmelden
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── FEEDBACK ── */}
        {activeTab === "feedback" && (() => {
          const targetEventId = feedbackEventId || events[0]?.id;
          const targetEvent = events.find(e => e.id === targetEventId);

          const submitFeedback = async () => {
            if (!customer || !targetEventId || fbRating === 0) return;
            setFbSending(true); setFbError("");
            try {
              const { error } = await supabase.from("customer_feedback").insert({
                customer_id: customer.id,
                event_id: targetEventId,
                rating: fbRating,
                highlights: fbHighlights,
                verbesserungen: fbVerbesserungen,
                weiterempfehlung: fbWeiterempfehlung,
                kommentar: fbKommentar,
              });
              if (error) throw error;
              setFbSent(true);
            } catch (err: any) {
              setFbError(err.message || "Fehler beim Senden");
            }
            setFbSending(false);
          };

          if (fbSent) return (
            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Vielen Dank!</h2>
              <p className="font-sans text-sm text-muted-foreground">Dein Feedback hilft mir, mein Programm noch besser zu machen. Ich freue mich auf das nächste Event mit dir!</p>
            </div>
          );

          return (
            <div className="space-y-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm">
                <h1 className="font-display text-xl font-bold text-foreground mb-1 border-l-[3px] border-accent pl-3">Feedback</h1>
                <p className="font-sans text-sm text-muted-foreground mb-6 pl-4">
                  {targetEvent ? `Zu deinem Event „${targetEvent.title}"` : "Wie war dein Event?"}
                </p>

                {/* Sterne-Bewertung */}
                <div className="mb-6">
                  <label className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-3 block">Gesamtbewertung</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setFbRating(star)}
                        className={`w-12 h-12 rounded-xl text-2xl transition-all ${fbRating >= star ? "bg-amber-100 border-2 border-amber-400 scale-110" : "bg-black/[0.02] border border-black/[0.08] hover:bg-amber-50"}`}
                      >
                        {fbRating >= star ? "⭐" : "☆"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-5">
                  <label className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-2 block">Was hat dir am besten gefallen?</label>
                  <textarea
                    value={fbHighlights}
                    onChange={e => setFbHighlights(e.target.value)}
                    rows={3}
                    placeholder="Die besten Momente des Abends..."
                    className={inputCls + " resize-none"}
                  />
                </div>

                {/* Verbesserungen */}
                <div className="mb-5">
                  <label className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-2 block">Was könnte besser sein?</label>
                  <textarea
                    value={fbVerbesserungen}
                    onChange={e => setFbVerbesserungen(e.target.value)}
                    rows={3}
                    placeholder="Ehrliches Feedback hilft mir, mich zu verbessern..."
                    className={inputCls + " resize-none"}
                  />
                </div>

                {/* Weiterempfehlung */}
                <div className="mb-5">
                  <label className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-3 block">Würdest du mich weiterempfehlen?</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFbWeiterempfehlung(true)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${fbWeiterempfehlung ? "bg-green-100 border-2 border-green-400 text-green-700" : "bg-black/[0.02] border border-black/[0.08] text-muted-foreground hover:bg-green-50"}`}
                    >
                      👍 Ja, auf jeden Fall!
                    </button>
                    <button
                      onClick={() => setFbWeiterempfehlung(false)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${!fbWeiterempfehlung ? "bg-amber-100 border-2 border-amber-400 text-amber-700" : "bg-black/[0.02] border border-black/[0.08] text-muted-foreground hover:bg-amber-50"}`}
                    >
                      🤔 Eher nicht
                    </button>
                  </div>
                </div>

                {/* Freitext */}
                <div className="mb-6">
                  <label className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-2 block">Noch etwas auf dem Herzen?</label>
                  <textarea
                    value={fbKommentar}
                    onChange={e => setFbKommentar(e.target.value)}
                    rows={2}
                    placeholder="Optional..."
                    className={inputCls + " resize-none"}
                  />
                </div>

                {fbError && <p className="font-sans text-sm text-red-600 mb-3">{fbError}</p>}

                <button
                  onClick={submitFeedback}
                  disabled={fbSending || fbRating === 0}
                  className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background py-3 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-40 transition-all"
                >
                  {fbSending ? "Wird gesendet..." : "Feedback absenden"}
                </button>
              </div>
            </div>
          );
        })()}

        {/* ── KONTAKT ── */}
        {activeTab === "kontakt" && (
          <div className="space-y-5">
            <h1 className="font-display text-xl font-bold text-foreground border-l-[3px] border-accent pl-3">Kontakt & Daten</h1>

            {/* Kontaktdaten */}
            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
              <h2 className="font-sans text-sm font-bold text-foreground mb-4">Kontakt</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                <a href="tel:+4915563744696" className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-accent/20 transition-all">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">Telefon</p>
                    <p className="font-sans text-sm font-medium text-foreground">+49 155 63744696</p>
                  </div>
                </a>
                <a href="mailto:el@magicel.de" className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-accent/20 transition-all">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">E-Mail</p>
                    <p className="font-sans text-sm font-medium text-foreground">el@magicel.de</p>
                  </div>
                </a>
                <a href="https://wa.me/4915563744696" target="_blank" rel="noopener" className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/[0.04] hover:border-accent/20 transition-all">
                  <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">WhatsApp</p>
                    <p className="font-sans text-sm font-medium text-foreground">Nachricht senden</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Rechnungsadresse */}
            <div className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm">
              <h2 className="font-sans text-sm font-bold text-foreground mb-4">Ihre Rechnungsadresse</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Straße & Hausnummer</label>
                  <input value={settingsDraft.rechnungs_strasse} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_strasse: e.target.value }))} placeholder="Musterstraße 1" className="w-full rounded-xl bg-black/[0.02] border border-black/[0.06] px-3 py-2.5 text-sm" />
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">PLZ</label>
                    <input value={settingsDraft.rechnungs_plz} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_plz: e.target.value }))} placeholder="12345" className="w-full rounded-xl bg-black/[0.02] border border-black/[0.06] px-3 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Ort</label>
                    <input value={settingsDraft.rechnungs_ort} onChange={(e) => setSettingsDraft((d) => ({ ...d, rechnungs_ort: e.target.value }))} placeholder="Musterstadt" className="w-full rounded-xl bg-black/[0.02] border border-black/[0.06] px-3 py-2.5 text-sm" />
                  </div>
                </div>
              </div>
              <button
                onClick={async () => {
                  if (!customer?.id) return;
                  await supabase.from("portal_customers").update({
                    rechnungs_strasse: settingsDraft.rechnungs_strasse.trim() || null,
                    rechnungs_plz: settingsDraft.rechnungs_plz.trim() || null,
                    rechnungs_ort: settingsDraft.rechnungs_ort.trim() || null,
                    rechnungs_land: settingsDraft.rechnungs_land.trim() || "Deutschland",
                  }).eq("id", customer.id);
                  setMessage("Rechnungsadresse gespeichert ✓");
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              >
                <Save className="w-3.5 h-3.5" /> Speichern
              </button>
            </div>
          </div>
        )}

        </div>
      </section>

      {/* Event cancel modal */}
      {eventCancelId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl border border-black/[0.1] p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">Event stornieren</h3>
                <p className="font-sans text-xs text-muted-foreground">Bitte lesen Sie die Stornierungsbedingungen:</p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 mb-5 font-sans text-xs text-foreground leading-relaxed">
              <strong className="text-foreground block mb-2">Stornierungsbedingungen gemäß AGB:</strong>
              Bei Stornierung bis 30 Tage vor dem Event entstehen keine Kosten. Bei Stornierung 15–29 Tage vorher werden 50% der vereinbarten Vergütung fällig. Bei Stornierung weniger als 15 Tage vorher werden 100% der Vergütung fällig. Mit der Bestätigung akzeptieren Sie diese Bedingungen.
            </div>
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  if (!customer) return;
                  const targetEventId = eventCancelId;
                  const targetEvent = events.find(ev => ev.id === targetEventId);
                  await supabase.from("portal_change_requests").insert({ customer_id: customer.id, event_id: targetEventId, subject: "Event stornieren", message: "Kunde möchte das Event stornieren. Stornierungsbedingungen wurden akzeptiert.", status: "offen", action: "stornierung_event" });
                  const cr = { id: crypto.randomUUID(), customer_id: customer.id, event_id: targetEventId, request_id: null, subject: "Event stornieren", message: "Kunde möchte das Event stornieren.", status: "offen", admin_response: null, created_at: new Date().toISOString() } as PortalChangeRequest;
                  setChangeRequests(prev => [cr, ...prev]);
                  setEventCancelId(null);
                  await notifyAdmin(
                    `🚫 Stornierungsanfrage: ${targetEvent?.title || "Event"} – ${customer.name || customer.email}`,
                    `<p><b>${customer.name || customer.email}</b> möchte das Event <b>${targetEvent?.title || targetEventId}</b> stornieren.</p><p>Die Stornierungsbedingungen wurden vom Kunden akzeptiert.</p>`
                  );
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-destructive text-white text-sm font-semibold hover:opacity-80 transition-all"
              >
                <X className="w-4 h-4" /> Stornierung bestätigen
              </button>
              <button onClick={() => setEventCancelId(null)} className="flex-1 py-3 rounded-xl border border-black/[0.1] text-sm font-medium text-foreground hover:bg-black/[0.03] transition-all">
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Kundenportal;
