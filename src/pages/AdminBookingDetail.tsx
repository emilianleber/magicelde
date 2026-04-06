import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock3,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Plus,
  Save,
  Sparkles,
  Theater,
  Upload,
  Users,
  X,
  Building2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";
import DocumentCreator, { type DocumentData, type DocumentPosition } from "@/components/admin/DocumentCreator";
import { paketeService } from "@/services/paketeService";
import type { Paket } from "@/types/productions";

/* ── Types ──────────────────────────────────────────────────────────────────── */

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  firma?: string | null;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  uhrzeit?: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  notizen_intern: string | null;
  event_id?: string | null;
  customer_id?: string | null;
}

interface PortalEvent {
  id: string;
  title: string | null;
  event_date: string | null;
  start_time?: string | null;
  end_time?: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
  customer_id?: string | null;
  notes?: string | null;
  details_status?: string | null;
  contract_status?: string | null;
  invoice_status?: string | null;
}

interface PortalCustomer {
  id: string;
  name: string | null;
  company?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
  rechnungs_strasse?: string | null;
  rechnungs_ort?: string | null;
  rechnungs_plz?: string | null;
  rechnungs_land?: string | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
  created_at: string;
  customer_id?: string | null;
  request_id?: string | null;
  event_id?: string | null;
  document_number?: string | null;
  status?: string | null;
}

interface PortalChangeRequest {
  id: string;
  customer_id: string;
  request_id: string | null;
  event_id: string | null;
  subject: string;
  message: string;
  status: string;
  admin_response: string | null;
  created_at: string;
  action?: string | null;
}

/* ── Pipeline ───────────────────────────────────────────────────────────────── */

type PipelineStep = "neu" | "in_bearbeitung" | "angebot_gesendet" | "gebucht" | "durchgefuehrt" | "abgeschlossen";

const PIPELINE_STEPS: { key: PipelineStep; label: string; requestStatus: string[] }[] = [
  { key: "neu", label: "Neu", requestStatus: ["neu"] },
  { key: "in_bearbeitung", label: "In Bearbeitung", requestStatus: ["in_bearbeitung", "details_besprechen"] },
  { key: "angebot_gesendet", label: "Angebot", requestStatus: ["angebot_gesendet", "warte_auf_kunde"] },
  { key: "gebucht", label: "Gebucht", requestStatus: ["bestätigt"] },
  { key: "durchgefuehrt", label: "Durchgeführt", requestStatus: [] },
  { key: "abgeschlossen", label: "Abgeschlossen", requestStatus: ["archiviert"] },
];

const OFF_RAMP_STATUSES = ["abgelehnt", "storniert"];

const getCurrentPipelineStep = (status: string | null, eventId: string | null, eventStatus: string | null): PipelineStep => {
  if (OFF_RAMP_STATUSES.includes(status || "")) return "neu"; // handled separately
  if (eventStatus === "event_erfolgt") return "durchgefuehrt";
  if (eventId || status === "bestätigt") return "gebucht";
  if (status === "archiviert") return "abgeschlossen";
  for (const step of PIPELINE_STEPS) {
    if (step.requestStatus.includes(status || "")) return step.key;
  }
  return "neu";
};

const getPipelineIndex = (step: PipelineStep): number =>
  PIPELINE_STEPS.findIndex((s) => s.key === step);

/* ── Options ────────────────────────────────────────────────────────────────── */

const anlassOptions = [
  { value: "", label: "— wählen —" },
  { value: "Hochzeit", label: "Hochzeit" },
  { value: "Firmenfeier", label: "Firmenfeier / Corporate Event" },
  { value: "Geburtstag", label: "Geburtstag / Private Feier" },
  { value: "Gala", label: "Gala / Awards" },
  { value: "Messe", label: "Messe / Promotion" },
  { value: "Magic Dinner", label: "Magic Dinner" },
  { value: "Teamevent", label: "Teamevent / Incentive" },
  { value: "Sonstiges", label: "Sonstiges" },
];

const formatOptions = [
  { value: "", label: "— wählen —" },
  { value: "closeup", label: "Close-Up" },
  { value: "buehnenshow", label: "Bühnenshow" },
  { value: "walking_act", label: "Walking Act" },
  { value: "magic_dinner", label: "Magic Dinner" },
  { value: "kombination", label: "Kombination" },
  { value: "beratung", label: "Noch offen / Beratung" },
];

const documentTypes = [
  { value: "Angebot", label: "Angebot" },
  { value: "Vertrag", label: "Vertrag" },
  { value: "Rechnung", label: "Rechnung" },
  { value: "Abschlagsrechnung", label: "Abschlagsrechnung" },
  { value: "Info", label: "Info" },
  { value: "Ablaufplan", label: "Ablaufplan" },
];

// Status-Optionen die manuell gesetzt werden können.
// "bestätigt" wird nur über den "Als gebucht markieren" Button gesetzt (erstellt auch Event).
// Anfrage-Phasen
const requestPhases = [
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "angebot_gesendet", label: "Angebot gesendet" },
  { value: "abgelehnt", label: "Abgelehnt" },
  { value: "archiviert", label: "Archiviert" },
];

<<<<<<< Updated upstream
// Anfrage-Aufgaben
const requestTaskDefs: TaskDef[] = [
  { key: "_details", label: "Details", states: [null, "details_besprechen", "erledigt"], stateLabels: ["—", "Offen", "Geklärt ✓"], mailOn: "details_besprechen" },
  { key: "_warte", label: "Rückmeldung", states: [null, "warte_auf_kunde", "erledigt"], stateLabels: ["—", "Warte", "Erhalten ✓"], mailOn: "warte_auf_kunde" },
];
=======
// Checkliste pro Status (rein visuell, ändert NICHT den Status)
const checklistByStatus: Record<string, { key: string; label: string }[]> = {
  neu: [
    { key: "chk_anfrage_gelesen", label: "Anfrage gelesen" },
    { key: "chk_kunde_kontaktiert", label: "Kunde kontaktiert" },
  ],
  in_bearbeitung: [
    { key: "chk_details_geklaert", label: "Details geklärt (Anlass, Datum, Ort, Gäste)" },
    { key: "chk_format_gewaehlt", label: "Format / Paket gewählt" },
    { key: "chk_angebot_erstellt", label: "Angebot erstellt" },
  ],
  angebot_gesendet: [
    { key: "chk_angebot_versendet", label: "Angebot an Kunde versendet" },
    { key: "chk_rueckmeldung", label: "Rückmeldung vom Kunden erhalten" },
    { key: "chk_fragen_geklaert", label: "Offene Fragen geklärt" },
  ],
};
>>>>>>> Stashed changes

// Hauptphasen
const eventPhases = [
  { value: "in_planung", label: "In Planung" },
  { value: "event_erfolgt", label: "Event durchgeführt" },
  { value: "abgeschlossen", label: "Abgeschlossen" },
  { value: "storniert", label: "Storniert" },
];

// Event-Checklisten pro Phase (rein visuell)
const eventChecklistByPhase: Record<string, { key: string; label: string }[]> = {
  in_planung: [
    { key: "echk_details", label: "Event-Details mit Kunde geklärt" },
    { key: "echk_auftragsbestaetigung", label: "Auftragsbestätigung erstellt" },
    { key: "echk_abschlag", label: "Abschlagsrechnung erstellt" },
    { key: "echk_technik", label: "Technik / Aufbau geklärt" },
    { key: "echk_ansprechpartner", label: "Ansprechpartner vor Ort bekannt" },
  ],
  event_erfolgt: [
    { key: "echk_schlussrechnung", label: "Schlussrechnung erstellt" },
    { key: "echk_bezahlt", label: "Zahlung erhalten" },
    { key: "echk_feedback", label: "Feedback angefragt" },
  ],
  abgeschlossen: [],
  storniert: [],
};

const getLabelOrCapitalize = (options: { value: string; label: string }[], val?: string | null): string => {
  if (!val) return "";
  const match = options.find((o) => o.value.toLowerCase() === val.toLowerCase());
  return match ? match.label : val.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, " ");
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

/* ── Component ──────────────────────────────────────────────────────────────── */

const AdminBookingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Abschlagsrechnung Dialog
  const [showAbschlagDialog, setShowAbschlagDialog] = useState(false);
  const [abschlagMode, setAbschlagMode] = useState<"prozent" | "fix">("prozent");
  const [abschlagWert, setAbschlagWert] = useState("50");
  const [abschlagCreating, setAbschlagCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [request, setRequest] = useState<PortalRequest | null>(null);
  const [event, setEvent] = useState<PortalEvent | null>(null);
  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [changeRequests, setChangeRequests] = useState<PortalChangeRequest[]>([]);
  const [crResponseText, setCrResponseText] = useState<Record<string, string>>({});
  const [crUpdating, setCrUpdating] = useState<Record<string, boolean>>({});
  const [crNotifyCustomer, setCrNotifyCustomer] = useState<Record<string, boolean>>({});
  const [mailHistory, setMailHistory] = useState<Array<{ id: string; created_at: string; subject: string; to_email: string; status: string }>>([]);
  const [mailSentAt, setMailSentAt] = useState<string | null>(null);
  const [showDocCreator, setShowDocCreator] = useState(false);
  const [allPakete, setAllPakete] = useState<Paket[]>([]);
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  const [emailTemplates, setEmailTemplates] = useState<{ slug: string; name: string; kategorie: string }[]>([]);
  const [sendingTemplate, setSendingTemplate] = useState(false);
  const [editingDoc, setEditingDoc] = useState<(DocumentData & { positions?: DocumentPosition[] }) | null>(null);

  // Draft fields
  const [status, setStatus] = useState("neu");
  const [anlass, setAnlass] = useState("");
  const [datum, setDatum] = useState("");
  const [uhrzeit, setUhrzeit] = useState("");
  const [ort, setOrt] = useState("");
  const [gaeste, setGaeste] = useState("");
  const [format, setFormat] = useState("");
  const [nachricht, setNachricht] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [message, setMessage] = useState("");
  const [sendingMail, setSendingMail] = useState(false);
  const [billingReqStatus, setBillingReqStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const [draftAnlass, setDraftAnlass] = useState("");
  const [draftDatum, setDraftDatum] = useState("");
  const [draftUhrzeit, setDraftUhrzeit] = useState("");
  const [draftOrt, setDraftOrt] = useState("");
  const [draftGaeste, setDraftGaeste] = useState("");
  const [draftFormat, setDraftFormat] = useState("");
  const [draftNachricht, setDraftNachricht] = useState("");
  const [draftInternalNotes, setDraftInternalNotes] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("Angebot");

  /* ── Auth ── */
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
      const { data: admin } = await supabase.from("portal_admins").select("*").eq("email", session.user.email).maybeSingle();
      setIsAdmin(!!admin);
    };
    checkUser();
  }, [navigate]);

  /* ── Load data ── */
  useEffect(() => {
    if (!user?.email || !id) return;
    const load = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("portal_requests").select("*").eq("id", id).single();
      if (error || !data) { setLoading(false); return; }

      setRequest(data);
      setStatus(data.status || "neu");
      setAnlass(data.anlass || "");
      setDatum(data.datum || "");
      setUhrzeit(data.uhrzeit || "");
      setOrt(data.ort || "");
      setGaeste(data.gaeste?.toString() || "");
      setFormat(data.format || "");
      setNachricht(data.nachricht || "");
      setInternalNotes(data.notizen_intern || "");
      setDraftAnlass(data.anlass || "");
      setDraftDatum(data.datum || "");
      setDraftUhrzeit(data.uhrzeit || "");
      setDraftOrt(data.ort || "");
      setDraftGaeste(data.gaeste?.toString() || "");
      setDraftFormat(data.format || "");
      setDraftNachricht(data.nachricht || "");
      setDraftInternalNotes(data.notizen_intern || "");

      // Load linked event if exists
      if (data.event_id) {
        const { data: evt } = await supabase.from("portal_events").select("*").eq("id", data.event_id).maybeSingle();
        setEvent(evt || null);
      }

      // Load customer
      if (data.customer_id) {
        const { data: cust } = await supabase.from("portal_customers").select("*").eq("id", data.customer_id).maybeSingle();
        setCustomer(cust || null);
      }

      // Load documents (from both request and event)
      const docQueries = [
        supabase.from("portal_documents").select("*").eq("request_id", data.id).order("created_at", { ascending: false }),
      ];
      if (data.event_id) {
        docQueries.push(
          supabase.from("portal_documents").select("*").eq("event_id", data.event_id).order("created_at", { ascending: false })
        );
      }
      const docResults = await Promise.all(docQueries);
      const allDocs: PortalDocument[] = [];
      const seenIds = new Set<string>();
      for (const res of docResults) {
        for (const doc of res.data || []) {
          if (!seenIds.has(doc.id)) { allDocs.push(doc); seenIds.add(doc.id); }
        }
      }
      allDocs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setDocuments(allDocs);

      // Load change requests
      const { data: crs } = await supabase.from("portal_change_requests").select("*")
        .or(`request_id.eq.${data.id}${data.event_id ? `,event_id.eq.${data.event_id}` : ""}`)
        .order("created_at", { ascending: false });
      setChangeRequests(crs || []);

      // Load mail history
      const { data: msgs } = await supabase
        .from("portal_messages")
        .select("id, created_at, subject, to_email, status")
        .or(`request_id.eq.${id}${data.event_id ? `,event_id.eq.${data.event_id}` : ""}`)
        .order("created_at", { ascending: false })
        .limit(10);
      setMailHistory(msgs || []);

      // E-Mail-Vorlagen laden
      const { data: tpls } = await supabase
        .from("email_templates")
        .select("slug, name, kategorie")
        .eq("aktiv", true)
        .order("sortierung", { ascending: true });
      setEmailTemplates(tpls || []);

      // Pakete laden
      try { setAllPakete(await paketeService.getAll()); } catch {}

      setLoading(false);
    };
    load();
  }, [user, id]);

  /* ── Edit handlers ── */
  const startEditing = () => {
    setDraftAnlass(anlass); setDraftDatum(datum); setDraftUhrzeit(uhrzeit);
    setDraftOrt(ort); setDraftGaeste(gaeste); setDraftFormat(format);
    setDraftNachricht(nachricht); setDraftInternalNotes(internalNotes);
    setIsEditing(true); setMessage("");
  };

  const cancelEditing = () => {
    setDraftAnlass(anlass); setDraftDatum(datum); setDraftUhrzeit(uhrzeit);
    setDraftOrt(ort); setDraftGaeste(gaeste); setDraftFormat(format);
    setDraftNachricht(nachricht); setDraftInternalNotes(internalNotes);
    setIsEditing(false); setMessage("");
  };

  const saveChanges = async () => {
    if (!request) return;
    setSaving(true); setMessage("");
    const { error } = await supabase.from("portal_requests").update({
      status,
      anlass: draftAnlass || null,
      datum: draftDatum || null,
      uhrzeit: draftUhrzeit || null,
      ort: draftOrt || null,
      gaeste: draftGaeste ? Number(draftGaeste) : null,
      format: draftFormat || null,
      nachricht: draftNachricht || null,
      notizen_intern: draftInternalNotes || null,
    }).eq("id", request.id);

    if (error) { setMessage("Fehler beim Speichern."); setSaving(false); return; }

    setAnlass(draftAnlass); setDatum(draftDatum); setUhrzeit(draftUhrzeit);
    setOrt(draftOrt); setGaeste(draftGaeste); setFormat(draftFormat);
    setNachricht(draftNachricht); setInternalNotes(draftInternalNotes);
    setRequest({ ...request, status, anlass: draftAnlass || null, datum: draftDatum || null, uhrzeit: draftUhrzeit || null, ort: draftOrt || null, gaeste: draftGaeste ? Number(draftGaeste) : null, format: draftFormat || null, nachricht: draftNachricht || null, notizen_intern: draftInternalNotes || null });

    // Also sync event if linked
    if (event) {
      await supabase.from("portal_events").update({
        title: draftAnlass || event.title,
        event_date: draftDatum || null,
        start_time: draftUhrzeit || null,
        location: draftOrt || null,
        format: draftFormat || null,
        guests: draftGaeste ? Number(draftGaeste) : null,
        status: event.status,
        details_status: event.details_status || null,
        contract_status: event.contract_status || null,
        invoice_status: event.invoice_status || null,
      }).eq("id", event.id);
    }

    setIsEditing(false); setMessage("Gespeichert."); setSaving(false);
  };

  /* ── Convert to event (inline, no redirect) ── */
  const convertToEvent = async () => {
    if (!request) return;
    setConverting(true); setMessage("");
    try {
      const { data: newEvent, error: insertError } = await supabase.from("portal_events").insert({
        request_id: request.id,
        customer_id: request.customer_id || null,
        title: anlass.trim() || "Event",
        event_date: datum.trim() || null,
        start_time: uhrzeit.trim() || null,
        location: ort.trim() || null,
        format: format || null,
        guests: gaeste ? Number(gaeste) : null,
        status: "in_planung",
      }).select("*").single();
      if (insertError) throw insertError;

      await supabase.from("portal_requests").update({ event_id: newEvent?.id, status: "bestätigt" }).eq("id", request.id);

      setRequest({ ...request, event_id: newEvent?.id, status: "bestätigt" });
      setEvent(newEvent || null);
      setStatus("bestätigt");
      setMessage("Gebucht! Event wurde erstellt.");
    } catch (err) {
      setMessage("Fehler beim Konvertieren.");
    }
    setConverting(false);
  };

  /* ── Abschlagsrechnung erstellen ── */
  const createAbschlagsrechnung = async () => {
    if (!request || !customer) return;
    setAbschlagCreating(true);
    try {
      // Angebot finden für Referenz und Betrag
      const angebot = documents.find(d => (d as any).type === "Angebot" || d.name?.toLowerCase().includes("angebot"));
      const angebotNr = angebot ? ((angebot as any).document_number || angebot.name) : "";
      const angebotTotal = angebot ? ((angebot as any).total || (angebot as any).amount || 0) : 0;

      // Betrag berechnen
      let betrag = 0;
      if (abschlagMode === "prozent") {
        const pct = parseFloat(abschlagWert) || 0;
        betrag = Math.round(angebotTotal * pct / 100 * 100) / 100;
      } else {
        betrag = parseFloat(abschlagWert) || 0;
      }

      if (betrag <= 0) {
        setMessage("Bitte gültigen Betrag eingeben.");
        setAbschlagCreating(false);
        return;
      }

      // Textvorlagen laden
      const { data: vorlagen } = await supabase
        .from("dokument_textvorlagen")
        .select("bereich, inhalt")
        .or("typ.eq.abschlagsrechnung,typ.eq.alle")
        .eq("is_default", true);
      const kopftext = vorlagen?.find(v => v.bereich === "kopf")?.inhalt || "";
      const fusstext = vorlagen?.find(v => v.bereich === "fuss")?.inhalt || "";

      // Absender laden
      const { data: settings } = await supabase.from("admin_settings").select("*").limit(1).maybeSingle();

      // Nächste Nummer
      const prefix = (settings?.nk_rechnung_prefix as string) || "RE";
      const naechste = (settings?.nk_rechnung_naechste as number) ?? 1;
      const year = new Date().getFullYear();
      const nummer = `${prefix}-${year}-${String(naechste).padStart(3, "0")}`;

      // Nummer hochzählen
      await supabase.from("admin_settings").update({ nk_rechnung_naechste: naechste + 1 }).eq("id", settings?.id);

      const today = new Date().toISOString().split("T")[0];
      const zahlungszielTage = (settings?.default_payment_days as number) || 14;
      const faelligDate = new Date();
      faelligDate.setDate(faelligDate.getDate() + zahlungszielTage);
      const faelligAm = faelligDate.toISOString().split("T")[0];

      const bezeichnung = angebotNr
        ? `Teilrechnung aus Angebot ${angebotNr}`
        : "Abschlagszahlung";
      const beschreibung = abschlagMode === "prozent"
        ? `${abschlagWert}% des Gesamtbetrags${angebotNr ? ` (${angebotNr})` : ""}`
        : `Teilbetrag${angebotNr ? ` aus ${angebotNr}` : ""}`;

      const { data: newDoc, error: docError } = await supabase
        .from("portal_documents")
        .insert({
          type: "Abschlagsrechnung",
          document_number: nummer,
          document_date: today,
          status: "entwurf",
          customer_id: customer.id,
          event_id: event?.id || null,
          request_id: request.id,
          quelldokument_id: angebot?.id || null,
          quelldokument_nummer: angebotNr || null,
          empfaenger: {
            name: customer.name || "",
            firma: customer.company || undefined,
            adresse: customer.rechnungs_strasse || "",
            plz: customer.rechnungs_plz || "",
            ort: customer.rechnungs_ort || "",
            land: customer.rechnungs_land || "Deutschland",
          },
          absender: {
            name: (settings?.company_name as string) || "Emilian Leber",
            adresse: (settings?.company_address as string) || "",
            plz: (settings?.company_zip as string) || "",
            ort: (settings?.company_city as string) || "",
            land: "Deutschland",
            email: (settings?.company_email as string) || "",
            telefon: (settings?.company_phone as string) || "",
            website: (settings?.company_website as string) || "",
            steuernummer: (settings?.tax_number as string) || "",
            iban: (settings?.bank_iban as string) || "",
            bic: (settings?.bank_bic as string) || "",
            kleinunternehmer: Boolean((settings as any)?.kleinunternehmer),
          },
          kopftext,
          fusstext,
          zahlungsziel_tage: zahlungszielTage,
          faellig_am: faelligAm,
          subtotal: betrag,
          total: betrag,
          amount: betrag,
          brutto: betrag,
          offener_betrag: betrag,
          bezahlt_betrag: 0,
          name: `Abschlagsrechnung ${nummer}`,
        })
        .select("*")
        .single();

      if (docError || !newDoc) throw new Error("Fehler beim Erstellen");

      // Position einfügen
      await supabase.from("document_positions").insert({
        document_id: newDoc.id,
        position: 1,
        type: "leistung",
        bezeichnung,
        beschreibung,
        quantity: 1,
        unit: "pauschal",
        unit_price: betrag,
        total: betrag,
        mwst_satz: 0,
      });

      setShowAbschlagDialog(false);
      setMessage(`Abschlagsrechnung ${nummer} erstellt (${betrag.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €)`);

      // Dokumente neu laden
      const { data: docs } = await supabase
        .from("portal_documents")
        .select("*")
        .or(`request_id.eq.${request.id}${event?.id ? `,event_id.eq.${event.id}` : ""},customer_id.eq.${customer.id}`)
        .order("created_at", { ascending: false });
      if (docs) setDocuments(docs);

      // Direkt zum Dokument navigieren
      navigate(`/admin/dokumente/${newDoc.id}`);
    } catch (err: any) {
      setMessage("Fehler: " + (err.message || "Unbekannt"));
    }
    setAbschlagCreating(false);
  };

  /* ── Send status mail ── */
  const sendStatusMail = async (statusOverride?: string, dokumentTyp?: string) => {
    if (!request) return;
    setSendingMail(true); setMessage("");
    try {
      await supabase.auth.refreshSession();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Nicht eingeloggt – bitte neu anmelden.");
      const res = await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-send-status-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ type: event ? "event" : "request", recordId: event?.id || request.id, statusOverride, dokumentTyp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || data.message || `Server-Fehler (${res.status})`);
      if (data.skipped) {
        setMessage("Kein Mail für diesen Status vorgesehen.");
      } else {
        setMailSentAt(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
        const { data: msgs } = await supabase
          .from("portal_messages")
          .select("id, created_at, subject, to_email, status")
          .or(`request_id.eq.${request.id}${event?.id ? `,event_id.eq.${event.id}` : ""}`)
          .order("created_at", { ascending: false })
          .limit(10);
        setMailHistory(msgs || []);
      }
    } catch (err: any) {
      setMessage("Mail-Fehler: " + (err.message || "Unbekannt"));
    }
    setSendingMail(false);
  };

  /* ── Document upload ── */
  const handleDocumentUpload = async () => {
    if (!selectedFile || !request) { setMessage("Bitte zuerst eine Datei auswählen."); return; }
    setUploading(true); setMessage("");
    try {
      const filePath = `requests/${request.id}/${Date.now()}-${selectedFile.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from("portal-documents").upload(filePath, selectedFile, { upsert: false });
      if (uploadError) throw uploadError;
      const { data: signedData, error: signedError } = await supabase.storage.from("portal-documents").createSignedUrl(filePath, 60 * 60 * 24 * 365);
      if (signedError) throw signedError;
      const { data: insertedDoc, error: insertError } = await supabase.from("portal_documents").insert({
        customer_id: request.customer_id || null,
        request_id: request.id,
        event_id: event?.id || null,
        name: selectedFile.name,
        type: documentType,
        file_url: signedData.signedUrl,
      }).select("*").single();
      if (insertError) throw insertError;
      setDocuments((prev) => [insertedDoc, ...prev]);
      setSelectedFile(null);
      setDocumentType("Angebot");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage("Dokument hochgeladen.");
    } catch (err) {
      setMessage("Fehler beim Upload.");
    }
    setUploading(false);
  };

  /* ── Change request handling ── */
  const updateChangeRequestStatus = async (crId: string, newStatus: string) => {
    setCrUpdating((prev) => ({ ...prev, [crId]: true }));
    const response = crResponseText[crId]?.trim() || null;
    const { data, error } = await supabase
      .from("portal_change_requests")
      .update({ status: newStatus, admin_response: response, updated_at: new Date().toISOString() })
      .eq("id", crId)
      .select("*")
      .single();
    if (!error && data) {
      setChangeRequests((prev) => prev.map((cr) => cr.id === crId ? data : cr));
      setCrResponseText((prev) => ({ ...prev, [crId]: "" }));

      if (newStatus === "angenommen") {
        const action = data.action;
        if (action === "stornierung_anfrage" && request?.id) {
          await supabase.from("portal_requests").update({ status: "archiviert" }).eq("id", request.id);
          setStatus("archiviert");
        } else if (action === "angebot_annehmen" && request?.id) {
          await supabase.from("portal_requests").update({ status: "bestätigt" }).eq("id", request.id);
          setStatus("bestätigt");
        } else if (action === "angebot_ablehnen" && request?.id) {
          await supabase.from("portal_requests").update({ status: "abgelehnt" }).eq("id", request.id);
          setStatus("abgelehnt");
        } else if (action === "stornierung_event" && event?.id) {
          await supabase.from("portal_events").update({ status: "storniert" }).eq("id", event.id);
          setEvent((prev) => prev ? { ...prev, status: "storniert" } : prev);
        }
      }

      const shouldNotify = crNotifyCustomer[crId] !== false;
      if (shouldNotify) try {
        const { data: { session } } = await supabase.auth.getSession();
        const headers = { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` };
        const baseUrl = "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1";
        await fetch(`${baseUrl}/admin-send-status-mail`, {
          method: "POST", headers,
          body: JSON.stringify(
            newStatus === "angenommen" && data.action?.startsWith("stornierung")
              ? { type: event ? "event" : "request", recordId: event?.id || request?.id }
              : { type: "change_request", changeRequestId: crId }
          ),
        });
      } catch (_) {}
    }
    setCrUpdating((prev) => ({ ...prev, [crId]: false }));
  };

  /* ── Render ── */
  if (loading) return <div className="pt-28 text-center">Wird geladen...</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;
  if (!request) return <div className="pt-28 text-center">Anfrage nicht gefunden</div>;

  const capName = (s?: string | null) => s ? s.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ") : "";
  const displayCustomerName = capName(customer?.name || request.name) || "Unbekannter Kunde";
  const displayFirma = customer?.company || request.firma || "";
  const isError = message.startsWith("Fehler") || message.startsWith("Mail-Fehler");
  const isRejected = status === "abgelehnt" || event?.status === "storniert";
  const pipelineStep = getCurrentPipelineStep(status, request.event_id || null, event?.status || null);
  const pipelineIdx = getPipelineIndex(pipelineStep);

  return (
    <>
    <AdminLayout
      title={anlass || "Anfrage"}
      subtitle={displayFirma ? `${displayCustomerName} · ${displayFirma}` : displayCustomerName}
    >
      {/* Back */}
      <div className="mb-4">
        <Link to="/admin/bookings" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Zurück zu Anfragen & Buchungen
        </Link>
      </div>

      {/* ── Pipeline Bar ── */}
      {!isRejected ? (
        <div className="flex items-center gap-0 mb-6 p-1 bg-muted/30 rounded-2xl border border-border/20 overflow-x-auto">
          {PIPELINE_STEPS.map((step, i) => {
            const isCurrent = i === pipelineIdx;
            const isPast = i < pipelineIdx;
            return (
              <div key={step.key} className="flex items-center flex-1 min-w-0">
                <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl flex-1 min-w-0 transition-all ${
                  isCurrent ? "bg-foreground text-background" : isPast ? "text-foreground" : "text-muted-foreground/50"
                }`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                    isCurrent ? "bg-background/20 text-background" : isPast ? "bg-green-500 text-white" : "bg-muted/60"
                  }`}>
                    {isPast ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </span>
                  <span className="text-xs font-medium truncate">{step.label}</span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className={`w-4 h-px shrink-0 ${isPast ? "bg-green-500" : "bg-border/30"}`} />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-6 p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-sm text-destructive font-medium text-center">
          {event?.status === "storniert" ? "Storniert" : "Abgelehnt"}
        </div>
      )}

      {/* ── Customer Banner ── */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-border/30 mb-5">
        <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
          {displayCustomerName[0]?.toUpperCase() || "?"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">{displayCustomerName}</p>
            {displayFirma && <span className="text-xs text-muted-foreground">{displayFirma}</span>}
            {event && (
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-green-700 bg-green-50 border border-green-200 font-medium">
                Gebucht
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5 flex-wrap">
            {(customer?.email || request.email) && (
              <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{customer?.email || request.email}</span>
            )}
            {(customer?.phone || request.phone) && (
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{customer?.phone || request.phone}</span>
            )}
            <span className="text-muted-foreground/60">Eingegangen: {new Date(request.created_at).toLocaleDateString("de-DE")}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          {customer?.id && (
            <Link to={`/admin/customers/${customer.id}`} className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80">
              Kundenkonto <ArrowRight className="w-3 h-3" />
            </Link>
          )}
          {customer?.id && !customer.rechnungs_strasse && (
            <button
              onClick={async () => {
                setBillingReqStatus("loading");
                try {
                  const { data: { session } } = await supabase.auth.getSession();
                  const res = await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/request-billing-address", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` },
                    body: JSON.stringify({
                      customer_name: customer.name || request?.name || "",
                      customer_email: customer.email || request?.email || "",
                      customer_anrede: (customer as any).anrede || null,
                      customer_nachname: (customer as any).nachname || null,
                    }),
                  });
                  if (!res.ok) throw new Error("Fehler");
                  setBillingReqStatus("sent");
                } catch {
                  setBillingReqStatus("error");
                }
              }}
              disabled={billingReqStatus === "loading" || billingReqStatus === "sent"}
              className={`inline-flex items-center gap-1 text-xs font-medium transition-colors ${
                billingReqStatus === "sent" ? "text-green-600" :
                billingReqStatus === "error" ? "text-red-600" :
                billingReqStatus === "loading" ? "text-muted-foreground" :
                "text-amber-600 hover:text-amber-700"
              }`}
            >
              {billingReqStatus === "loading" ? (
                <><span className="w-3 h-3 rounded-full border-2 border-amber-300 border-t-amber-700 animate-spin" /> Sende…</>
              ) : billingReqStatus === "sent" ? (
                <><Check className="w-3 h-3" /> E-Mail gesendet ✓</>
              ) : billingReqStatus === "error" ? (
                <><Building2 className="w-3 h-3" /> Fehler – erneut versuchen</>
              ) : (
                <><Building2 className="w-3 h-3" /> Rechnungsadresse anfordern</>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-5 items-start">
        {/* ═══ LEFT COLUMN ═══ */}
        <div className="space-y-5">

          {/* ── Event Details ── */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground">Event-Details</h2>
              {!isEditing ? (
                <button onClick={startEditing} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/40 transition-colors">
                  <Pencil className="w-3.5 h-3.5" /> Bearbeiten
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={cancelEditing} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/40">
                    <X className="w-3.5 h-3.5" /> Abbrechen
                  </button>
                  <button onClick={saveChanges} disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-3 py-1.5 text-xs font-semibold hover:opacity-80 disabled:opacity-50">
                    <Save className="w-3.5 h-3.5" /> {saving ? "..." : "Speichern"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Anlass</label>
                {isEditing ? (
                  <select value={draftAnlass} onChange={(e) => setDraftAnlass(e.target.value)} className={inputCls}>
                    {anlassOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Theater className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {getLabelOrCapitalize(anlassOptions, anlass) || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Format</label>
                {isEditing ? (
                  <select value={draftFormat} onChange={(e) => setDraftFormat(e.target.value)} className={inputCls}>
                    {formatOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <p className="text-sm text-foreground min-h-[2rem]">{getLabelOrCapitalize(formatOptions, format) || <span className="text-muted-foreground">–</span>}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Datum</label>
                {isEditing ? (
                  <input type="date" value={draftDatum} onChange={(e) => setDraftDatum(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {datum ? new Date(datum).toLocaleDateString("de-DE") : <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Uhrzeit</label>
                {isEditing ? (
                  <input type="time" value={draftUhrzeit} onChange={(e) => setDraftUhrzeit(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Clock3 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {uhrzeit || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Ort</label>
                {isEditing ? (
                  <input value={draftOrt} onChange={(e) => setDraftOrt(e.target.value)} placeholder="Stadt oder Adresse" className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {ort || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Gäste</label>
                {isEditing ? (
                  <input type="number" min="1" value={draftGaeste} onChange={(e) => setDraftGaeste(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {gaeste || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Nachricht des Kunden</label>
                {isEditing ? (
                  <textarea value={draftNachricht} onChange={(e) => setDraftNachricht(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
                ) : (
                  <p className="text-sm text-foreground whitespace-pre-line min-h-[2rem]">
                    {nachricht || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Uhrzeit-Warnung ── */}
          {!uhrzeit && datum && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">Uhrzeit fehlt noch</p>
                <p className="text-xs text-amber-600 mt-0.5">Bitte klären Sie die Uhrzeit mit dem Kunden. Ohne Uhrzeit wird der Termin als ganztägig im Kalender angezeigt.</p>
              </div>
            </div>
          )}

          {/* ── Event-Planung (nur bei gebuchten Events) ── */}
          {event && (
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
              <h2 className="text-sm font-bold text-foreground mb-4">Event-Planung</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: "ansprechpartner_name", label: "Ansprechpartner vor Ort", placeholder: "Name des Kontakts", icon: "👤" },
                  { key: "ansprechpartner_tel", label: "Telefon Ansprechpartner", placeholder: "+49...", icon: "📞" },
                  { key: "parkmoeglichkeit", label: "Parkmöglichkeit", placeholder: "Wo parken? Equipment abladen?", icon: "🅿️" },
                  { key: "aufbau_zeit", label: "Aufbauzeit / Ankunft", placeholder: "z.B. 17:00, 30 Min vorher", icon: "🕐" },
                  { key: "technik_vorhanden", label: "Vorhandene Technik", placeholder: "Mikrofon, Licht, Musik...", icon: "🎤" },
                  { key: "ankuendigung", label: "Ankündigung", placeholder: "Selbst starten oder vorgestellt werden?", icon: "📢" },
                  { key: "besonderheiten", label: "Besonderheiten", placeholder: "Überraschung, Allergien, Sprache...", icon: "⭐" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">{field.icon} {field.label}</label>
                    <input
                      value={(event as any)[field.key] || ""}
                      onChange={async (e) => {
                        const val = e.target.value;
                        setEvent((prev: any) => prev ? { ...prev, [field.key]: val } : prev);
                        // Auto-save nach 500ms Debounce (vereinfacht: sofort)
                        await supabase.from("portal_events").update({ [field.key]: val }).eq("id", event.id);
                      }}
                      placeholder={field.placeholder}
                      className={inputCls}
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">📋 Ablauf-Notizen</label>
                  <textarea
                    value={(event as any).ablauf_notizen || ""}
                    onChange={async (e) => {
                      const val = e.target.value;
                      setEvent((prev: any) => prev ? { ...prev, ablauf_notizen: val } : prev);
                      await supabase.from("portal_events").update({ ablauf_notizen: val }).eq("id", event.id);
                    }}
                    rows={3}
                    placeholder="Ablauf des Abends, Timing, besondere Wünsche..."
                    className={`${inputCls} resize-none`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Paket zuordnen ── */}
          <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Paket / Konzept zuordnen
              </h2>
            </div>
            {selectedPaket ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-accent/10">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{selectedPaket.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedPaket.zieldauer} Min. · {selectedPaket.preis.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
                    {selectedPaket.beschreibungKunde && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{selectedPaket.beschreibungKunde}</p>}
                  </div>
                  <button onClick={() => setSelectedPaket(null)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"><X className="w-3.5 h-3.5" /></button>
                </div>
                <button
                  onClick={() => {
                    // Angebot mit Paket-Positionen erstellen
                    const positions: DocumentPosition[] = [{
                      id: crypto.randomUUID(),
                      typ: "leistung",
                      bezeichnung: selectedPaket.name,
                      beschreibung: selectedPaket.beschreibungKunde || "",
                      menge: 1,
                      einheit: "Std.",
                      einzelpreis: selectedPaket.preis,
                      gesamt: selectedPaket.preis,
                      optional: false,
                    }];
                    setEditingDoc({
                      type: "Angebot",
                      positionen: positions,
                    } as any);
                    setShowDocCreator(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-80 transition-opacity"
                >
                  <FileText className="w-4 h-4" /> Angebot aus Paket erstellen
                </button>
              </div>
            ) : (
              <select
                value=""
                onChange={(e) => {
                  const p = allPakete.find(pk => pk.id === e.target.value);
                  if (p) setSelectedPaket(p);
                }}
                className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-muted-foreground"
              >
                <option value="">Paket auswählen…</option>
                {allPakete.map(p => (
                  <option key={p.id} value={p.id}>{p.name} – {p.preis.toLocaleString("de-DE", { style: "currency", currency: "EUR" })} ({p.zieldauer} Min.)</option>
                ))}
              </select>
            )}
          </div>

          {/* ── Documents ── */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground">Dokumente</h2>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(() => {
                  const params = `${customer?.id ? `&customerId=${customer.id}` : ""}${request.id ? `&requestId=${request.id}` : ""}${event?.id ? `&eventId=${event.id}` : ""}`;
                  const phase = event?.status || "";
                  const btnCls = "inline-flex items-center gap-1 rounded-lg border border-border/30 px-2.5 py-1.5 text-[11px] font-medium hover:bg-muted/40 transition-colors";
                  const primaryCls = "inline-flex items-center gap-1 rounded-lg bg-foreground text-background px-2.5 py-1.5 text-[11px] font-bold hover:bg-foreground/90";
                  return (
                    <>
                      {!event && <Link to={`/admin/dokumente/new?typ=angebot${params}`} className={primaryCls}><FileText className="w-3 h-3" />Angebot</Link>}
                      {event && phase === "in_planung" && <button onClick={() => setShowAbschlagDialog(true)} className={primaryCls}><FileText className="w-3 h-3" />Abschlagsrechnung</button>}
                      {event && (phase === "event_erfolgt" || phase === "abgeschlossen") && <Link to={`/admin/dokumente/new?typ=rechnung${params}`} className={primaryCls}><FileText className="w-3 h-3" />Schlussrechnung</Link>}
                      <Link to={`/admin/dokumente/new?typ=angebot${params}`} className={btnCls}>Angebot</Link>
                      <Link to={`/admin/dokumente/new?typ=rechnung${params}`} className={btnCls}>Rechnung</Link>
                      <button onClick={() => setShowAbschlagDialog(true)} className={btnCls}>Abschlag</button>
                    </>
                  );
                })()}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="flex-1 min-w-0 rounded-xl bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground"
              />
              <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="rounded-xl bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground">
                {documentTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={handleDocumentUpload} disabled={uploading || !selectedFile} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 bg-background/60 px-3 py-2 text-sm font-medium hover:bg-muted/40 disabled:opacity-50 shrink-0">
                <Upload className="w-3.5 h-3.5" /> {uploading ? "..." : "Hochladen"}
              </button>
            </div>
            <div className="space-y-2">
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">Noch keine Dokumente.</p>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/60 border border-border/20">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-accent shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.type} · {new Date(doc.created_at).toLocaleDateString("de-DE")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {doc.document_number && (
                        <Link to={`/admin/dokumente/${doc.id}`} className="text-xs text-accent hover:text-accent/80">
                          {doc.document_number}
                        </Link>
                      )}
                      {doc.file_url && (
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent/80">Öffnen</a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Change Requests ── */}
          {changeRequests.length > 0 && (
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-sm font-bold text-foreground">Änderungswünsche</h2>
                {changeRequests.filter((cr) => cr.status === "offen").length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-[10px] font-bold text-white">
                    {changeRequests.filter((cr) => cr.status === "offen").length}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {changeRequests.map((cr) => (
                  <div key={cr.id} className="p-4 rounded-xl bg-background/60 border border-border/20 space-y-3">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <MessageSquare className="w-3.5 h-3.5 text-accent shrink-0" />
                      <p className="text-sm font-semibold text-foreground">{cr.subject}</p>
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${
                        cr.status === "angenommen" ? "text-green-700 bg-green-50 border-green-200"
                        : cr.status === "abgelehnt" ? "text-destructive bg-destructive/10 border-destructive/20"
                        : "text-foreground bg-muted border-border/30"
                      }`}>
                        {cr.status === "angenommen" ? "Angenommen" : cr.status === "abgelehnt" ? "Abgelehnt" : "Offen"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(cr.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}</p>
                    <p className="text-sm text-foreground/80 whitespace-pre-line">{cr.message}</p>
                    {cr.admin_response && (
                      <div className="rounded-xl bg-muted/30 border border-border/20 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Ihre Antwort</p>
                        <p className="text-sm text-foreground">{cr.admin_response}</p>
                      </div>
                    )}
                    {cr.status === "offen" && (
                      <div className="space-y-2 pt-1">
                        <textarea
                          value={crResponseText[cr.id] || ""}
                          onChange={(e) => setCrResponseText((prev) => ({ ...prev, [cr.id]: e.target.value }))}
                          placeholder="Optionale Antwort an den Kunden ..."
                          rows={2}
                          className={`${inputCls} resize-none text-xs`}
                        />
                        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={crNotifyCustomer[cr.id] !== false}
                            onChange={(e) => setCrNotifyCustomer((prev) => ({ ...prev, [cr.id]: e.target.checked }))}
                            className="rounded border-border/40 accent-foreground"
                          />
                          Kunden per Mail benachrichtigen
                        </label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateChangeRequestStatus(cr.id, "angenommen")} disabled={crUpdating[cr.id]}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50 transition-colors">
                            <Check className="w-3.5 h-3.5" /> Annehmen
                          </button>
                          <button onClick={() => updateChangeRequestStatus(cr.id, "abgelehnt")} disabled={crUpdating[cr.id]}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors">
                            <X className="w-3.5 h-3.5" /> Ablehnen
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Mail History ── */}
          {mailHistory.length > 0 && (
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
              <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" /> Kommunikation
              </h2>
              <div className="space-y-2">
                {mailHistory.map((msg) => (
                  <div key={msg.id} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-background/60 border border-border/20">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground truncate">{msg.subject}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {msg.to_email} · {new Date(msg.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "short" })} {new Date(msg.created_at).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-green-200 bg-green-50 text-green-700 shrink-0">✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT COLUMN ═══ */}
        <div className="space-y-5">
          {/* ── Status & Actions ── */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <h2 className="text-sm font-bold text-foreground mb-4">Status & Aktionen</h2>

            {/* Status selector */}
            {request.event_id && event ? (
              <>
                <div className="mb-3 p-2.5 rounded-xl bg-green-50 border border-green-200 text-center">
                  <p className="text-xs font-semibold text-green-700 flex items-center justify-center gap-1.5">
                    <Check className="w-3.5 h-3.5" /> Gebucht
                  </p>
                </div>
                {/* Hauptphase */}
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Phase</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {eventPhases.map((phase) => {
                    const isActive = event.status === phase.value;
                    return (
                      <button
                        key={phase.value}
                        onClick={async () => {
                          if (isActive) return;
                          setEvent((prev: any) => prev ? { ...prev, status: phase.value } : prev);
                          await supabase.from("portal_events").update({ status: phase.value }).eq("id", event.id);
                          setMessage(`Phase → ${phase.label}`);
                          if (phase.value !== "abgeschlossen" && phase.value !== "in_planung" && confirm(`Phase auf "${phase.label}" gesetzt.\n\nStatus-Mail an den Kunden senden?`)) {
                            sendStatusMail();
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isActive ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                        }`}
                      >
                        {phase.label}
                      </button>
                    );
                  })}
                </div>

                {/* Checkliste pro Event-Phase */}
                {(eventChecklistByPhase[event.status || "in_planung"] || []).length > 0 && (
                  <>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Checkliste</p>
                    <div className="space-y-1.5 mb-5">
                      {(eventChecklistByPhase[event.status || "in_planung"] || []).map((item) => {
                        const checked = checklist[item.key] || false;
                        return (
                          <button
                            key={item.key}
                            onClick={() => setChecklist(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm transition-colors border ${
                              checked ? "bg-green-50 border-green-200" : "bg-muted/10 border-border/20 hover:bg-muted/30"
                            }`}
                          >
                            <span className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                              checked ? "bg-green-500 text-white" : "border border-border/40"
                            }`}>
                              {checked && <Check className="w-3 h-3" />}
                            </span>
                            <span className={`font-medium text-left ${checked ? "text-green-700 line-through" : "text-foreground"}`}>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Phase */}
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Phase</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {requestPhases.map((phase) => {
                    const isActive = status === phase.value;
                    return (
                      <button
                        key={phase.value}
                        onClick={async () => {
                          if (isActive) return;
                          setStatus(phase.value);
                          await supabase.from("portal_requests").update({ status: phase.value }).eq("id", request.id);
                          setRequest({ ...request, status: phase.value });
                          setMessage(`Phase → ${phase.label}`);
                          if (!["archiviert", "neu"].includes(phase.value) && confirm(`Phase auf "${phase.label}" gesetzt.\n\nStatus-Mail an den Kunden senden?`)) {
                            sendStatusMail();
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isActive ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground hover:bg-muted/60"
                        }`}
                      >
                        {phase.label}
                      </button>
                    );
                  })}
                </div>

<<<<<<< Updated upstream
                {/* Aufgaben */}
                {!["abgelehnt", "archiviert"].includes(status) && (
                  <>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Aufgaben</p>
                    <div className="space-y-2 mb-5">
                      {requestTaskDefs.map((task) => {
                        const isTaskActive = status === task.states[1];
                        const isTaskDone = task.states[2] === "erledigt" && (
                          (task.key === "_details" && ["angebot_gesendet", "warte_auf_kunde", "bestätigt", "gebucht"].includes(status)) ||
                          (task.key === "_warte" && ["bestätigt", "gebucht"].includes(status))
                        );
                        const stateIdx = isTaskDone ? 2 : isTaskActive ? 1 : 0;
                        const stateLabel = task.stateLabels[stateIdx];
=======
                {/* Checkliste pro Status (ändert NICHT den Status) */}
                {(checklistByStatus[status] || []).length > 0 && (
                  <>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Checkliste</p>
                    <div className="space-y-1.5 mb-5">
                      {(checklistByStatus[status] || []).map((item) => {
                        const checked = checklist[item.key] || false;
>>>>>>> Stashed changes
                        return (
                          <button
                            key={task.key}
                            onClick={async () => {
                              if (isTaskDone) return;
                              const newStatus = isTaskActive ? "in_bearbeitung" : (task.states[1] as string);
                              setStatus(newStatus);
                              await supabase.from("portal_requests").update({ status: newStatus }).eq("id", request.id);
                              setRequest({ ...request, status: newStatus });
                              setMessage(`${task.label} → ${isTaskActive ? "Zurückgesetzt" : task.stateLabels[1]}`);
                              if (!isTaskActive && confirm(`${task.label} auf "${task.stateLabels[1]}" gesetzt.\n\nStatus-Mail an den Kunden senden?`)) {
                                sendStatusMail();
                              }
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors border ${
                              isTaskDone ? "bg-green-50 border-green-200 text-green-700"
                              : isTaskActive ? "bg-blue-50 border-blue-200 text-blue-700"
                              : "bg-muted/20 border-border/20 text-muted-foreground hover:bg-muted/40"
                            }`}
                          >
                            <span className="font-medium">{task.label}</span>
                            <span className={`text-xs font-semibold ${isTaskDone ? "text-green-600" : isTaskActive ? "text-blue-600" : "text-muted-foreground/50"}`}>{stateLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button onClick={saveChanges} disabled={saving} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity">
                <Save className="w-4 h-4" /> {saving ? "Speichert..." : "Speichern"}
              </button>
              {!request.event_id && status !== "abgelehnt" && (
                <button onClick={convertToEvent} disabled={converting} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-green-100 disabled:opacity-50 transition-colors">
                  <Sparkles className="w-4 h-4" /> {converting ? "Wird gebucht..." : "Als gebucht markieren"}
                </button>
              )}
            </div>

            {/* E-Mail-Vorlagen */}
            {emailTemplates.length > 0 && (
              <div className="border-t border-border/20 pt-4 mt-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Vorlage senden</p>
                <div className="space-y-1.5">
                  {emailTemplates.map((tpl) => (
                    <button
                      key={tpl.slug}
                      disabled={sendingTemplate}
                      onClick={async () => {
                        if (!confirm(`"${tpl.name}" an den Kunden senden?`)) return;
                        setSendingTemplate(true); setMessage("");
                        try {
                          const { data: { session } } = await supabase.auth.getSession();
                          const res = await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/send-template-mail", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                              ...(session?.access_token ? { "Authorization": `Bearer ${session.access_token}` } : {}),
                            },
                            body: JSON.stringify({ templateSlug: tpl.slug, requestId: request?.id, eventId: event?.id, customerId: request?.customer_id }),
                          });
                          const result = await res.json();
                          if (!res.ok || result.error) throw new Error(result.error || "Fehler beim Senden");
                          setMessage(`"${tpl.name}" gesendet!`);
                          setMailSentAt(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
                        } catch (err: any) {
                          setMessage("Fehler: " + (err.message || "Unbekannt"));
                        }
                        setSendingTemplate(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl border border-border/20 bg-background/60 text-sm hover:bg-muted/40 disabled:opacity-50 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="flex-1 truncate">{tpl.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-border/20 pt-4 mt-4 space-y-2">
              <button onClick={sendStatusMail} disabled={sendingMail}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border/30 bg-background/60 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 disabled:opacity-50 transition-colors">
                <Mail className="w-4 h-4" />
                {sendingMail ? "Sendet..." : "Status-Mail senden"}
              </button>
              {event && (
                <button
                  onClick={async () => {
                    if (!confirm("Feedback-Anfrage an den Kunden senden?")) return;
                    setMessage("");
                    try {
                      const { data: { session } } = await supabase.auth.getSession();
                      const { data, error } = await supabase.functions.invoke("send-feedback-request", {
                        headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : undefined,
                        body: { eventId: event.id },
                      });
                      if (error) throw error;
                      if (data?.alreadyExists) setMessage("Feedback wurde bereits abgegeben.");
                      else setMessage("Feedback-Anfrage gesendet!");
                    } catch (err: any) {
                      setMessage("Fehler: " + (err.message || "Unbekannt"));
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Feedback anfragen
                </button>
              )}
              {mailSentAt && (
                <p className="text-xs text-green-700 flex items-center gap-1 mt-2">
                  <Check className="w-3 h-3" /> Gesendet um {mailSentAt}
                </p>
              )}
            </div>

            {message && (
              <div className={`mt-3 rounded-xl px-3 py-2 text-sm ${isError ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-700"}`}>
                {message}
              </div>
            )}
          </div>

          {/* ── Internal Notes ── */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Interne Notizen</label>
            {isEditing ? (
              <textarea value={draftInternalNotes} onChange={(e) => setDraftInternalNotes(e.target.value)} rows={5} className={`${inputCls} resize-none`} />
            ) : (
              <div
                onClick={startEditing}
                className="min-h-[80px] p-3 rounded-xl bg-background/60 border border-border/20 text-sm text-foreground whitespace-pre-line cursor-text hover:border-border/40 transition-colors"
              >
                {internalNotes || <span className="text-muted-foreground/60">Klicken zum Bearbeiten...</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>

    {/* Abschlagsrechnung Dialog */}
    {showAbschlagDialog && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAbschlagDialog(false)}>
        <div className="bg-background rounded-2xl shadow-2xl border border-border/30 p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
          <h3 className="text-lg font-bold mb-1">Abschlagsrechnung erstellen</h3>
          {(() => {
            const angebot = documents.find(d => (d as any).type === "Angebot");
            const angebotTotal = angebot ? ((angebot as any).total || (angebot as any).amount || 0) : 0;
            const angebotNr = angebot ? ((angebot as any).document_number || angebot.name) : "";
            const betrag = abschlagMode === "prozent"
              ? Math.round(angebotTotal * (parseFloat(abschlagWert) || 0) / 100 * 100) / 100
              : parseFloat(abschlagWert) || 0;
            return (
              <>
                {angebotNr && <p className="text-xs text-muted-foreground mb-4">Basierend auf {angebotNr} · {angebotTotal.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</p>}

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setAbschlagMode("prozent")}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${abschlagMode === "prozent" ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"}`}
                  >
                    Prozentual
                  </button>
                  <button
                    onClick={() => setAbschlagMode("fix")}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${abschlagMode === "fix" ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"}`}
                  >
                    Fixer Betrag
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                    {abschlagMode === "prozent" ? "Prozentsatz" : "Betrag (€)"}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={abschlagWert}
                      onChange={e => setAbschlagWert(e.target.value)}
                      className="flex-1 rounded-xl bg-muted/20 border border-border/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                      min="0"
                      step={abschlagMode === "prozent" ? "5" : "0.01"}
                    />
                    <span className="text-sm text-muted-foreground font-medium">{abschlagMode === "prozent" ? "%" : "€"}</span>
                  </div>
                </div>

                {betrag > 0 && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-3 mb-4 text-center">
                    <p className="text-xs text-green-600 mb-0.5">Abschlagsbetrag</p>
                    <p className="text-xl font-bold text-green-700">{betrag.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAbschlagDialog(false)}
                    className="flex-1 py-2.5 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/40"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={createAbschlagsrechnung}
                    disabled={abschlagCreating || betrag <= 0}
                    className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:opacity-90 disabled:opacity-50"
                  >
                    {abschlagCreating ? "Erstelle…" : "Erstellen"}
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    )}

    {showDocCreator && request && (
      <DocumentCreator
        customerId={request.customer_id || null}
        eventId={event?.id || null}
        requestId={request.id}
        customer={customer ? {
          id: customer.id,
          name: customer.name || "",
          company: customer.company || undefined,
          email: customer.email || "",
          phone: customer.phone || undefined,
          rechnungs_strasse: customer.rechnungs_strasse || undefined,
          rechnungs_ort: customer.rechnungs_ort || undefined,
          rechnungs_plz: customer.rechnungs_plz || undefined,
          rechnungs_land: customer.rechnungs_land || undefined,
        } : null}
        onDocumentSaved={(doc) => {
          setDocuments((prev) => {
            const exists = prev.find((d) => d.id === doc.id);
            if (exists) return prev.map((d) => d.id === doc.id ? { ...d, name: doc.document_number ? `${doc.type} ${doc.document_number}` : d.name, type: doc.type, file_url: doc.file_url || d.file_url } : d);
            return [{ id: doc.id!, name: `${doc.type} ${doc.document_number}`, type: doc.type, file_url: doc.file_url || null, created_at: new Date().toISOString(), customer_id: request.customer_id, request_id: request.id, event_id: event?.id } as PortalDocument, ...prev];
          });
          setShowDocCreator(false);
        }}
        onClose={() => setShowDocCreator(false)}
        existingDoc={editingDoc}
      />
    )}
    </>
  );
};

export default AdminBookingDetail;
