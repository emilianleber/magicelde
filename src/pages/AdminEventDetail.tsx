import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
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
  Theater,
  Upload,
  Users,
  X,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import DocumentCreator, { type DocumentData, type DocumentPosition } from "@/components/admin/DocumentCreator";

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
  request_id?: string | null;
  customer_id?: string | null;
  details_status?: string | null;
  contract_status?: string | null;
  invoice_status?: string | null;
  notes?: string | null;
  created_at?: string | null;
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
  event_id?: string | null;
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
  action?: string | null;
  created_at: string;
}

const eventStatusOptions = [
  { value: "in_planung", label: "In Planung" },
  { value: "details_offen", label: "Details offen" },
  { value: "vertrag_gesendet", label: "Vertrag gesendet" },
  { value: "vertrag_bestaetigt", label: "Vertrag bestätigt" },
  { value: "rechnung_gesendet", label: "Rechnung gesendet" },
  { value: "rechnung_bezahlt", label: "Rechnung bezahlt" },
  { value: "event_erfolgt", label: "Event erfolgt" },
  { value: "storniert", label: "Storniert" },
];

const simpleStatusOptions = [
  { value: "offen", label: "Offen" },
  { value: "in_bearbeitung", label: "In Bearb." },
  { value: "erledigt", label: "Erledigt" },
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

const eventDocumentTypes = [
  { value: "Vertrag", label: "Vertrag" },
  { value: "Rechnung", label: "Rechnung" },
  { value: "Abschlagsrechnung", label: "Abschlagsrechnung" },
  { value: "Info", label: "Info" },
  { value: "Ablaufplan", label: "Ablaufplan" },
];

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const AdminEventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [event, setEvent] = useState<PortalEvent | null>(null);
  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [changeRequests, setChangeRequests] = useState<PortalChangeRequest[]>([]);
  const [crResponseText, setCrResponseText] = useState<Record<string, string>>({});
  const [crUpdating, setCrUpdating] = useState<Record<string, boolean>>({});
  const [mailHistory, setMailHistory] = useState<Array<{ id: string; created_at: string; subject: string; to_email: string; status: string }>>([]);
  const [mailSentAt, setMailSentAt] = useState<string | null>(null);
  const [crNotifyCustomer, setCrNotifyCustomer] = useState<Record<string, boolean>>({});
  const [showDocCreator, setShowDocCreator] = useState(false);
  const [editingDoc, setEditingDoc] = useState<(DocumentData & { positions?: DocumentPosition[] }) | null>(null);

  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("");
  const [guests, setGuests] = useState("");
  const [status, setStatus] = useState("in_planung");
  const [detailsStatus, setDetailsStatus] = useState("offen");
  const [contractStatus, setContractStatus] = useState("offen");
  const [invoiceStatus, setInvoiceStatus] = useState("offen");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [sendingMail, setSendingMail] = useState(false);

  const [draftEventDate, setDraftEventDate] = useState("");
  const [draftStartTime, setDraftStartTime] = useState("");
  const [draftEndTime, setDraftEndTime] = useState("");
  const [draftLocation, setDraftLocation] = useState("");
  const [draftFormat, setDraftFormat] = useState("");
  const [draftGuests, setDraftGuests] = useState("");
  const [draftNotes, setDraftNotes] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("Vertrag");

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

  useEffect(() => {
    if (!user?.email || !id) return;
    const loadEvent = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("portal_events").select("*").eq("id", id).single();
      if (error || !data) { setLoading(false); return; }

      setEvent(data);
      setEventDate(data.event_date || "");
      setStartTime(data.start_time || "");
      setEndTime(data.end_time || "");
      setLocation(data.location || "");
      setFormat(data.format || "");
      setGuests(data.guests != null ? String(data.guests) : "");
      setStatus(data.status || "in_planung");
      setDetailsStatus(data.details_status || "offen");
      setContractStatus(data.contract_status || "offen");
      setInvoiceStatus(data.invoice_status || "offen");
      setNotes(data.notes || "");
      setDraftEventDate(data.event_date || "");
      setDraftStartTime(data.start_time || "");
      setDraftEndTime(data.end_time || "");
      setDraftLocation(data.location || "");
      setDraftFormat(data.format || "");
      setDraftGuests(data.guests != null ? String(data.guests) : "");
      setDraftNotes(data.notes || "");

      if (data.customer_id) {
        const { data: cust } = await supabase.from("portal_customers").select("*").eq("id", data.customer_id).maybeSingle();
        setCustomer(cust || null);
      }

      const { data: docs } = await supabase.from("portal_documents").select("*").eq("event_id", data.id).order("created_at", { ascending: false });
      setDocuments(docs || []);
      const { data: crs } = await supabase.from("portal_change_requests").select("*").eq("event_id", data.id).order("created_at", { ascending: false });
      setChangeRequests(crs || []);
      const { data: msgs } = await supabase
        .from("portal_messages")
        .select("id, created_at, subject, to_email, status")
        .eq("event_id", id)
        .order("created_at", { ascending: false })
        .limit(10);
      setMailHistory(msgs || []);
      setLoading(false);
    };
    loadEvent();
  }, [user, id]);

  const startEditing = () => {
    setDraftEventDate(eventDate);
    setDraftStartTime(startTime);
    setDraftEndTime(endTime);
    setDraftLocation(location);
    setDraftFormat(format);
    setDraftGuests(guests);
    setDraftNotes(notes);
    setIsEditing(true);
    setMessage("");
  };

  const cancelEditing = () => {
    setDraftEventDate(eventDate);
    setDraftStartTime(startTime);
    setDraftEndTime(endTime);
    setDraftLocation(location);
    setDraftFormat(format);
    setDraftGuests(guests);
    setDraftNotes(notes);
    setIsEditing(false);
    setMessage("");
  };

  const saveChanges = async () => {
    if (!event) return;
    setSaving(true);
    setMessage("");
    const { error } = await supabase.from("portal_events").update({
      event_date: draftEventDate || null,
      start_time: draftStartTime || null,
      end_time: draftEndTime || null,
      location: draftLocation || null,
      format: draftFormat || null,
      guests: draftGuests ? Number(draftGuests) : null,
      status,
      details_status: detailsStatus,
      contract_status: contractStatus,
      invoice_status: invoiceStatus,
      notes: draftNotes || null,
    }).eq("id", event.id);

    if (error) { setMessage("Fehler beim Speichern."); setSaving(false); return; }

    setEventDate(draftEventDate);
    setStartTime(draftStartTime);
    setEndTime(draftEndTime);
    setLocation(draftLocation);
    setFormat(draftFormat);
    setGuests(draftGuests);
    setNotes(draftNotes);
    setEvent({ ...event, event_date: draftEventDate || null, start_time: draftStartTime || null, end_time: draftEndTime || null, location: draftLocation || null, format: draftFormat || null, guests: draftGuests ? Number(draftGuests) : null, status, details_status: detailsStatus, contract_status: contractStatus, invoice_status: invoiceStatus, notes: draftNotes || null });
    setIsEditing(false);
    setMessage("Gespeichert.");
    setSaving(false);
  };

  const sendStatusMail = async () => {
    if (!event) return;
    setSendingMail(true);
    setMessage("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-send-status-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ type: "event", recordId: event.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler");
      if (data.skipped) {
        setMessage("Kein Mail für diesen Status vorgesehen.");
      } else {
        setMessage("");
        setMailSentAt(new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }));
        const { data: msgs } = await supabase
          .from("portal_messages")
          .select("id, created_at, subject, to_email, status")
          .eq("event_id", event.id)
          .order("created_at", { ascending: false })
          .limit(10);
        setMailHistory(msgs || []);
      }
    } catch (err: any) {
      setMessage("Mail-Fehler: " + (err.message || "Unbekannt"));
    }
    setSendingMail(false);
  };

  const handleDocumentUpload = async () => {
    if (!selectedFile || !event) { setMessage("Bitte zuerst eine Datei auswählen."); return; }
    setUploading(true);
    setMessage("");
    try {
      const filePath = `events/${event.id}/${Date.now()}-${selectedFile.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from("portal-documents").upload(filePath, selectedFile, { upsert: false });
      if (uploadError) throw uploadError;
      const { data: signedData, error: signedError } = await supabase.storage.from("portal-documents").createSignedUrl(filePath, 60 * 60 * 24 * 365);
      if (signedError) throw signedError;
      const { data: insertedDoc, error: insertError } = await supabase.from("portal_documents").insert({ customer_id: event.customer_id || null, event_id: event.id, name: selectedFile.name, type: documentType, file_url: signedData.signedUrl }).select("*").single();
      if (insertError) throw insertError;
      setDocuments((prev) => [insertedDoc, ...prev]);
      setSelectedFile(null);
      setDocumentType("Vertrag");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage("Dokument hochgeladen.");
    } catch (err) {
      setMessage("Fehler beim Upload.");
    }
    setUploading(false);
  };

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

      // Auto-update event to storniert when a stornierung_event change request is approved
      const linkedEventId = data.event_id || event?.id;
      if (newStatus === "angenommen" && data.action === "stornierung_event") {
        if (linkedEventId) {
          await supabase.from("portal_events").update({ status: "storniert" }).eq("id", linkedEventId);
          setEvent((prev) => prev ? { ...prev, status: "storniert" } : prev);
        }
      }

      // Send email notification to customer (only if checkbox is enabled, default ON)
      const shouldNotify = crNotifyCustomer[crId] !== false;
      if (shouldNotify) try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        const apikey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const headers = { "Content-Type": "application/json", apikey, Authorization: `Bearer ${token}` };
        const baseUrl = "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1";

        if (newStatus === "angenommen" && data.action === "stornierung_event" && linkedEventId) {
          // Send storniert event mail
          await fetch(`${baseUrl}/admin-send-status-mail`, {
            method: "POST", headers,
            body: JSON.stringify({ type: "event", recordId: linkedEventId }),
          });
        } else {
          // Send change_request result mail
          await fetch(`${baseUrl}/admin-send-status-mail`, {
            method: "POST", headers,
            body: JSON.stringify({ type: "change_request", changeRequestId: crId }),
          });
        }
      } catch (_) {}
    }
    setCrUpdating((prev) => ({ ...prev, [crId]: false }));
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;
  if (!event) return <div className="pt-28 text-center">Event nicht gefunden</div>;

  const isError = message.startsWith("Fehler") || message.startsWith("Mail-Fehler");
  const openCrCount = changeRequests.filter((cr) => cr.status === "offen").length;

  return (
    <>
    <AdminLayout
      title={event.title || "Event"}
      subtitle={customer ? `${customer.name || ""}${customer.company ? ` · ${customer.company}` : ""}` : "Event verwalten"}
    >
      {/* Back */}
      <div className="mb-4">
        <Link to="/admin/events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Zurück zu Events
        </Link>
      </div>

      {/* Customer banner */}
      {customer && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-border/30 mb-5">
          <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
            {(customer.name || "?")[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-foreground">{customer.name}</p>
              {customer.company && <span className="text-xs text-muted-foreground">{customer.company}</span>}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5 flex-wrap">
              {customer.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{customer.email}</span>}
              {customer.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{customer.phone}</span>}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link to={`/admin/customers/${customer.id}`} className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80">
              Kundenkonto <ArrowRight className="w-3 h-3" />
            </Link>
            {event.request_id && (
              <Link to={`/admin/requests/${event.request_id}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                Anfrage <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[3fr_2fr] gap-5 items-start">
        {/* LEFT: Details + Documents */}
        <div className="space-y-5">
          {/* Event Details */}
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
                    <Save className="w-3.5 h-3.5" /> {saving ? "…" : "Speichern"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Datum</label>
                {isEditing ? (
                  <input type="date" value={draftEventDate} onChange={(e) => setDraftEventDate(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {eventDate ? new Date(eventDate).toLocaleDateString("de-DE") : <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Ort</label>
                {isEditing ? (
                  <input value={draftLocation} onChange={(e) => setDraftLocation(e.target.value)} placeholder="Stadt oder Adresse" className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {location || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Beginn</label>
                {isEditing ? (
                  <input type="time" value={draftStartTime} onChange={(e) => setDraftStartTime(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Clock3 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {startTime || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Ende</label>
                {isEditing ? (
                  <input type="time" value={draftEndTime} onChange={(e) => setDraftEndTime(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Clock3 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {endTime || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Gäste</label>
                {isEditing ? (
                  <input type="number" min="1" value={draftGuests} onChange={(e) => setDraftGuests(e.target.value)} className={inputCls} />
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {guests || <span className="text-muted-foreground">–</span>}
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
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Theater className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {format || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Notizen</label>
                {isEditing ? (
                  <textarea value={draftNotes} onChange={(e) => setDraftNotes(e.target.value)} rows={4} className={`${inputCls} resize-none`} />
                ) : (
                  <p className="text-sm text-foreground whitespace-pre-line min-h-[2rem]">
                    {notes || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground">Dokumente</h2>
              <button
                onClick={() => { setEditingDoc(null); setShowDocCreator(true); }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-3 py-1.5 text-xs font-bold hover:bg-foreground/90"
              >
                <Plus className="w-3 h-3" /> Erstellen
              </button>
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="flex-1 min-w-0 rounded-xl bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground"
              />
              <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="rounded-xl bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground">
                {eventDocumentTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              <button onClick={handleDocumentUpload} disabled={uploading || !selectedFile} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 bg-background/60 px-3 py-2 text-sm font-medium hover:bg-muted/40 disabled:opacity-50 shrink-0">
                <Upload className="w-3.5 h-3.5" /> {uploading ? "…" : "Hochladen"}
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
                    {doc.file_url && (
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:text-accent/80 shrink-0">Öffnen</a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Change Requests */}
          {changeRequests.length > 0 && (
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-sm font-bold text-foreground">Änderungswünsche</h2>
                {openCrCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-[10px] font-bold text-white">
                    {openCrCount}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                {changeRequests.map((cr) => (
                  <div key={cr.id} className="p-4 rounded-xl bg-background/60 border border-border/20 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <MessageSquare className="w-3.5 h-3.5 text-accent shrink-0" />
                          <p className="text-sm font-semibold text-foreground">{cr.subject}</p>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${
                            cr.status === "angenommen"
                              ? "text-green-700 bg-green-50 border-green-200"
                              : cr.status === "abgelehnt"
                              ? "text-destructive bg-destructive/10 border-destructive/20"
                              : "text-foreground bg-muted border-border/30"
                          }`}>
                            {cr.status === "angenommen" ? "Angenommen" : cr.status === "abgelehnt" ? "Abgelehnt" : "Offen"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{new Date(cr.created_at).toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}</p>
                        <p className="text-sm text-foreground/80 whitespace-pre-line">{cr.message}</p>
                      </div>
                    </div>
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
                          placeholder="Optionale Antwort an den Kunden …"
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
                          <button
                            onClick={() => updateChangeRequestStatus(cr.id, "angenommen")}
                            disabled={crUpdating[cr.id]}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 disabled:opacity-50 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" /> Annehmen
                          </button>
                          <button
                            onClick={() => updateChangeRequestStatus(cr.id, "abgelehnt")}
                            disabled={crUpdating[cr.id]}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
                          >
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
          {mailHistory.length > 0 && (
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
              <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" /> Gesendete Mails
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

        {/* RIGHT: Status & Organisation */}
        <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="text-sm font-bold text-foreground mb-4">Status</h2>

          {/* Status pipeline */}
          <div className="space-y-1 mb-5">
            {eventStatusOptions.map((opt, i) => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                  status === opt.value
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${status === opt.value ? "bg-background/20 text-background" : "bg-muted/60 text-muted-foreground"}`}>
                  {i + 1}
                </span>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Sub-statuses: Details / Vertrag / Rechnung */}
          <div className="border-t border-border/20 pt-4 mb-5 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Organisation</p>
            {[
              { label: "Details", value: detailsStatus, set: setDetailsStatus },
              { label: "Vertrag", value: contractStatus, set: setContractStatus },
              { label: "Rechnung", value: invoiceStatus, set: setInvoiceStatus },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-2">
                <span className="text-sm text-foreground">{item.label}</span>
                <div className="flex gap-1">
                  {simpleStatusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => item.set(opt.value)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                        item.value === opt.value
                          ? opt.value === "erledigt"
                            ? "bg-green-500/20 text-green-700"
                            : opt.value === "in_bearbeitung"
                            ? "bg-accent/20 text-accent"
                            : "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button onClick={saveChanges} disabled={saving} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity">
              <Save className="w-4 h-4" /> {saving ? "Speichert…" : "Speichern"}
            </button>
          </div>

          <div className="border-t border-border/20 pt-4 mt-2">
            <button
              onClick={sendStatusMail}
              disabled={sendingMail}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border/30 bg-background/60 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 disabled:opacity-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {sendingMail ? "Sendet…" : "Status-Mail an Kunden senden"}
            </button>
            {mailSentAt && (
              <p className="text-xs text-green-700 flex items-center gap-1 mt-2">
                <Check className="w-3 h-3" /> Gesendet um {mailSentAt}
              </p>
            )}
            {message && !mailSentAt && (
              <p className={`text-xs mt-2 ${message.startsWith("Mail-Fehler") ? "text-destructive" : "text-muted-foreground"}`}>{message}</p>
            )}
          </div>

          {message && !message.startsWith("Mail-Fehler") && !mailSentAt && (
            <div className={`mt-3 rounded-xl px-3 py-2 text-sm ${isError ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-700"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>

    {showDocCreator && event && (
      <DocumentCreator
        customerId={event.customer_id || null}
        eventId={event.id}
        requestId={null}
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
            return [{ id: doc.id!, name: `${doc.type} ${doc.document_number}`, type: doc.type, file_url: doc.file_url || null, created_at: new Date().toISOString(), customer_id: event.customer_id, event_id: event.id }, ...prev];
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

export default AdminEventDetail;
