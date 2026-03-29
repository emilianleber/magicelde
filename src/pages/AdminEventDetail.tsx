import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock3,
  FileText,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  Theater,
  Upload,
  Users,
  X,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalEvent {
  id: string;
  title: string | null;
  event_type?: string | null;
  customer_name?: string | null;
  firma?: string | null;
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
  firma?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
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
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
];

const formatOptions = [
  { value: "", label: "Format wählen" },
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

const formatEventStatusLabel = (status?: string | null) => {
  switch (status) {
    case "in_planung":
      return "In Planung";
    case "details_offen":
      return "Details offen";
    case "vertrag_gesendet":
      return "Vertrag gesendet";
    case "vertrag_bestaetigt":
      return "Vertrag bestätigt";
    case "rechnung_gesendet":
      return "Rechnung gesendet";
    case "rechnung_bezahlt":
      return "Rechnung bezahlt";
    case "event_erfolgt":
      return "Event erfolgt";
    case "storniert":
      return "Storniert";
    default:
      return status || "Offen";
  }
};

const formatEventStatusClasses = (status?: string | null) => {
  switch (status) {
    case "in_planung":
    case "details_offen":
      return "text-accent bg-accent/10";
    case "vertrag_gesendet":
    case "vertrag_bestaetigt":
    case "rechnung_gesendet":
      return "text-foreground bg-muted";
    case "rechnung_bezahlt":
      return "text-green-700 bg-green-100";
    case "event_erfolgt":
      return "text-muted-foreground bg-muted";
    case "storniert":
      return "text-destructive bg-destructive/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const cardCls = "p-6 rounded-2xl bg-muted/20 border border-border/30";
const readOnlyCardCls =
  "rounded-xl bg-background/60 border border-border/20 p-4";

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

  const [eventType, setEventType] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [firma, setFirma] = useState("");

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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/kundenportal/login");
        return;
      }

      setUser(session.user);

      const { data: admin } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      setIsAdmin(!!admin);
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email || !id) return;

    const loadEvent = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("portal_events")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Fehler beim Laden des Events:", error);
        setLoading(false);
        return;
      }

      setEvent(data);

      setEventType(data.event_type || data.title || "Event");
      setCustomerName(data.customer_name || "");
      setFirma(data.firma || "");

      setEventDate(data.event_date || "");
      setStartTime(data.start_time || "");
      setEndTime(data.end_time || "");
      setLocation(data.location || "");
      setFormat(data.format || "");
      setGuests(
        data.guests !== null && data.guests !== undefined
          ? String(data.guests)
          : ""
      );
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
      setDraftGuests(
        data.guests !== null && data.guests !== undefined
          ? String(data.guests)
          : ""
      );
      setDraftNotes(data.notes || "");

      if (data.customer_id) {
        const { data: customerData, error: customerError } = await supabase
          .from("portal_customers")
          .select("*")
          .eq("id", data.customer_id)
          .maybeSingle();

        if (customerError) {
          console.error("Fehler beim Laden des Kunden:", customerError);
        } else {
          setCustomer(customerData || null);
        }
      }

      const { data: docsData, error: docsError } = await supabase
        .from("portal_documents")
        .select("*")
        .eq("event_id", data.id)
        .order("created_at", { ascending: false });

      if (docsError) {
        console.error("Fehler beim Laden der Dokumente:", docsError);
      } else {
        setDocuments(docsData || []);
      }

      setLoading(false);
    };

    loadEvent();
  }, [user, id]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

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

    const { error } = await supabase
      .from("portal_events")
      .update({
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
      })
      .eq("id", event.id);

    if (error) {
      console.error("Fehler beim Speichern:", error);
      setMessage("Fehler beim Speichern.");
      setSaving(false);
      return;
    }

    setEventDate(draftEventDate);
    setStartTime(draftStartTime);
    setEndTime(draftEndTime);
    setLocation(draftLocation);
    setFormat(draftFormat);
    setGuests(draftGuests);
    setNotes(draftNotes);

    setEvent({
      ...event,
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
    });

    setIsEditing(false);
    setMessage("Gespeichert.");
    setSaving(false);
  };

  const handleDocumentUpload = async () => {
    if (!selectedFile || !event) {
      setMessage("Bitte zuerst eine Datei auswählen.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const filePath = `events/${event.id}/${Date.now()}-${selectedFile.name.replace(
        /\s+/g,
        "-"
      )}`;

      const { error: uploadError } = await supabase.storage
        .from("portal-documents")
        .upload(filePath, selectedFile, {
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: signedData, error: signedError } = await supabase.storage
        .from("portal-documents")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365);

      if (signedError) throw signedError;

      const { data: insertedDoc, error: insertError } = await supabase
        .from("portal_documents")
        .insert({
          customer_id: event.customer_id || null,
          event_id: event.id,
          name: selectedFile.name,
          type: documentType,
          file_url: signedData.signedUrl,
        })
        .select("*")
        .single();

      if (insertError) throw insertError;

      setDocuments((prev) => [insertedDoc, ...prev]);
      setSelectedFile(null);
      setDocumentType("Vertrag");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage("Dokument hochgeladen.");
    } catch (err) {
      console.error("Fehler beim Upload:", err);
      setMessage("Fehler beim Upload.");
    }

    setUploading(false);
  };

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  if (!event) {
    return <div className="pt-28 text-center">Event nicht gefunden</div>;
  }

  const displayCustomerName =
    customer?.name || customerName || "Unbekannter Kunde";
  const displayFirma = customer?.firma || firma || "";
  const displayHeaderRight = displayFirma || displayCustomerName;

  return (
    <AdminLayout
      title={`${eventType || "Event"} · ${displayHeaderRight}`}
      subtitle="Event verwalten, Termin pflegen und Dokumente hochladen"
      actions={
        <button
          onClick={logout}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="mb-6">
        <Link
          to="/admin/events"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Eventübersicht
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="space-y-6">
          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Kunde & Verknüpfungen
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Art der Veranstaltung
                </p>
                <div className="flex items-center gap-2">
                  <Theater className="w-4 h-4 text-accent" />
                  <p className="font-sans text-sm text-foreground font-medium">
                    {eventType || "Nicht gesetzt"}
                  </p>
                </div>
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Firma / Name
                </p>
                <p className="font-sans text-sm text-foreground font-medium">
                  {displayFirma ? `${displayFirma} · ${displayCustomerName}` : displayCustomerName}
                </p>
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  E-Mail
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <p className="font-sans text-sm text-foreground">
                    {customer?.email || "Nicht hinterlegt"}
                  </p>
                </div>
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Telefon
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <p className="font-sans text-sm text-foreground">
                    {customer?.phone || "Nicht hinterlegt"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {customer?.id && (
                <Link
                  to={`/admin/customers/${customer.id}`}
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                >
                  Kundenkonto öffnen
                </Link>
              )}

              {event.request_id && (
                <Link
                  to={`/admin/requests/${event.request_id}`}
                  className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                >
                  Verknüpfte Anfrage öffnen
                </Link>
              )}
            </div>
          </div>

          <div className={cardCls}>
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="font-display text-lg font-bold text-foreground">
                Event-Details
              </h2>

              {!isEditing ? (
                <button
                  onClick={startEditing}
                  className="inline-flex items-center gap-2 rounded-xl border border-border/30 bg-background/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Bearbeiten
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/30 bg-background/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Abbrechen
                  </button>
                  <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Speichert…" : "Speichern"}
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Datum
                </p>
                {isEditing ? (
                  <input
                    type="date"
                    value={draftEventDate}
                    onChange={(e) => setDraftEventDate(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {eventDate
                        ? new Date(eventDate).toLocaleDateString("de-DE")
                        : "Nicht angegeben"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Ort
                </p>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      value={draftLocation}
                      onChange={(e) => setDraftLocation(e.target.value)}
                      placeholder="Ort / Adresse"
                      className={inputCls}
                    />
                    <p className="font-sans text-xs text-muted-foreground">
                      Adresssuche können wir hier als Nächstes anbinden.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {location || "Nicht angegeben"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Startzeit
                </p>
                {isEditing ? (
                  <input
                    type="time"
                    value={draftStartTime}
                    onChange={(e) => setDraftStartTime(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {startTime || "Ganztägig"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Endzeit
                </p>
                {isEditing ? (
                  <input
                    type="time"
                    value={draftEndTime}
                    onChange={(e) => setDraftEndTime(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {endTime || "Offen"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Gäste
                </p>
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    value={draftGuests}
                    onChange={(e) => setDraftGuests(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {guests || "Nicht angegeben"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Format
                </p>
                {isEditing ? (
                  <select
                    value={draftFormat}
                    onChange={(e) => setDraftFormat(e.target.value)}
                    className={inputCls}
                  >
                    {formatOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="font-sans text-sm text-foreground font-medium">
                    {format || "Nicht angegeben"}
                  </p>
                )}
              </div>

              <div className={`${readOnlyCardCls} sm:col-span-2`}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Weitere Details / Notizen
                </p>
                {isEditing ? (
                  <textarea
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    rows={6}
                    className={`${inputCls} resize-none`}
                  />
                ) : (
                  <p className="font-sans text-sm text-foreground whitespace-pre-line">
                    {notes || "Keine zusätzlichen Notizen vorhanden."}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Dokumente
            </h2>

            <div className="grid sm:grid-cols-[1fr_220px] gap-3 mb-4">
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground"
              />

              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className={inputCls}
              >
                {eventDocumentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleDocumentUpload}
              disabled={uploading || !selectedFile}
              className="w-full inline-flex items-center justify-center rounded-xl border border-border/30 bg-background/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Lädt hoch…" : "Dokument hochladen"}
            </button>

            <div className="space-y-3 mt-5">
              {documents.length === 0 ? (
                <p className="font-sans text-sm text-muted-foreground">
                  Noch keine Dokumente vorhanden.
                </p>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-background/60 border border-border/20"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-foreground">
                          {doc.name}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-1">
                          {doc.type || "Dokument"} ·{" "}
                          {new Date(doc.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                    </div>

                    {doc.file_url && (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:text-accent/80"
                      >
                        Öffnen
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Status & Organisation
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  Event-Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputCls}
                >
                  {eventStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="mt-3">
                  <span
                    className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatEventStatusClasses(
                      event.status
                    )}`}
                  >
                    Aktuell: {formatEventStatusLabel(event.status)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  Details
                </label>
                <select
                  value={detailsStatus}
                  onChange={(e) => setDetailsStatus(e.target.value)}
                  className={inputCls}
                >
                  {simpleStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  Vertrag
                </label>
                <select
                  value={contractStatus}
                  onChange={(e) => setContractStatus(e.target.value)}
                  className={inputCls}
                >
                  {simpleStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  Rechnung
                </label>
                <select
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value)}
                  className={inputCls}
                >
                  {simpleStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={saveChanges}
                disabled={saving}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Speichert…" : "Status / Organisation speichern"}
              </button>

              {message && (
                <div className="rounded-xl bg-accent/10 text-accent px-4 py-3 text-sm">
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEventDetail;