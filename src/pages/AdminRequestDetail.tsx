import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Sparkles,
  Theater,
  Upload,
  Users,
  X,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

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
  request_id?: string | null;
}

const statusOptions = [
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "details_besprechen", label: "Details besprechen" },
  { value: "angebot_gesendet", label: "Angebot gesendet" },
  { value: "warte_auf_kunde", label: "Warte auf Kunde" },
  { value: "bestätigt", label: "Bestätigt" },
  { value: "abgelehnt", label: "Abgelehnt" },
  { value: "archiviert", label: "Archiviert" },
];

const anlassOptions = [
  { value: "", label: "Anlass wählen" },
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
  { value: "", label: "Format wählen" },
  { value: "closeup", label: "Close-Up" },
  { value: "buehnenshow", label: "Bühnenshow" },
  { value: "walking_act", label: "Walking Act" },
  { value: "magic_dinner", label: "Magic Dinner" },
  { value: "kombination", label: "Kombination" },
  { value: "beratung", label: "Noch offen / Beratung" },
];

const requestDocumentTypes = [
  { value: "Angebot", label: "Angebot" },
  { value: "Info", label: "Info" },
];

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "Neu";
    case "in_bearbeitung":
      return "In Bearbeitung";
    case "details_besprechen":
      return "Details besprechen";
    case "angebot_gesendet":
      return "Angebot gesendet";
    case "warte_auf_kunde":
      return "Warte auf Kunde";
    case "bestätigt":
      return "Bestätigt";
    case "abgelehnt":
      return "Abgelehnt";
    case "archiviert":
      return "Archiviert";
    default:
      return status || "Offen";
  }
};

const formatStatusClasses = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "text-accent bg-accent/10";
    case "in_bearbeitung":
    case "details_besprechen":
    case "angebot_gesendet":
    case "warte_auf_kunde":
      return "text-foreground bg-muted";
    case "bestätigt":
      return "text-green-700 bg-green-100";
    case "abgelehnt":
      return "text-destructive bg-destructive/10";
    case "archiviert":
      return "text-muted-foreground bg-muted";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const cardCls = "p-6 rounded-2xl bg-muted/20 border border-border/30";
const readOnlyCardCls =
  "rounded-xl bg-background/60 border border-border/20 p-4";

const AdminRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [request, setRequest] = useState<PortalRequest | null>(null);
  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);

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

    const load = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Fehler beim Laden der Anfrage:", error);
        setLoading(false);
        return;
      }

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
        .eq("request_id", data.id)
        .order("created_at", { ascending: false });

      if (docsError) {
        console.error("Fehler beim Laden der Dokumente:", docsError);
      } else {
        setDocuments(docsData || []);
      }

      setLoading(false);
    };

    load();
  }, [user, id]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const startEditing = () => {
    setDraftAnlass(anlass);
    setDraftDatum(datum);
    setDraftUhrzeit(uhrzeit);
    setDraftOrt(ort);
    setDraftGaeste(gaeste);
    setDraftFormat(format);
    setDraftNachricht(nachricht);
    setDraftInternalNotes(internalNotes);
    setIsEditing(true);
    setMessage("");
  };

  const cancelEditing = () => {
    setDraftAnlass(anlass);
    setDraftDatum(datum);
    setDraftUhrzeit(uhrzeit);
    setDraftOrt(ort);
    setDraftGaeste(gaeste);
    setDraftFormat(format);
    setDraftNachricht(nachricht);
    setDraftInternalNotes(internalNotes);
    setIsEditing(false);
    setMessage("");
  };

  const saveChanges = async () => {
    if (!request) return;

    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("portal_requests")
      .update({
        status,
        anlass: draftAnlass || null,
        datum: draftDatum || null,
        uhrzeit: draftUhrzeit || null,
        ort: draftOrt || null,
        gaeste: draftGaeste ? Number(draftGaeste) : null,
        format: draftFormat || null,
        nachricht: draftNachricht || null,
        notizen_intern: draftInternalNotes || null,
      })
      .eq("id", request.id);

    if (error) {
      console.error("Fehler beim Speichern:", error);
      setMessage("Fehler beim Speichern.");
      setSaving(false);
      return;
    }

    setAnlass(draftAnlass);
    setDatum(draftDatum);
    setUhrzeit(draftUhrzeit);
    setOrt(draftOrt);
    setGaeste(draftGaeste);
    setFormat(draftFormat);
    setNachricht(draftNachricht);
    setInternalNotes(draftInternalNotes);

    setRequest({
      ...request,
      status,
      anlass: draftAnlass || null,
      datum: draftDatum || null,
      uhrzeit: draftUhrzeit || null,
      ort: draftOrt || null,
      gaeste: draftGaeste ? Number(draftGaeste) : null,
      format: draftFormat || null,
      nachricht: draftNachricht || null,
      notizen_intern: draftInternalNotes || null,
    });

    setIsEditing(false);
    setMessage("Gespeichert.");
    setSaving(false);
  };

  const convertToEvent = async () => {
    if (!request) return;

    setConverting(true);
    setMessage("");

    try {
      const safeCustomerName =
        customer?.name?.trim() || request.name?.trim() || "Unbekannt";
      const safeFirma = customer?.firma?.trim() || request.firma?.trim() || null;
      const safeEventType = anlass.trim() || "Event";

      const { data: newEvent, error: insertError } = await supabase
        .from("portal_events")
        .insert({
          request_id: request.id,
          customer_id: request.customer_id || null,
          event_type: safeEventType,
          customer_name: safeCustomerName,
          firma: safeFirma,
          title: safeEventType,
          event_date: datum.trim() || null,
          start_time: uhrzeit.trim() || null,
          end_time: null,
          location: ort.trim() || null,
          format: format || null,
          guests: gaeste ? Number(gaeste) : null,
          status: "in_planung",
        })
        .select("*")
        .single();

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from("portal_requests")
        .update({
          event_id: newEvent?.id,
          status: "bestätigt",
        })
        .eq("id", request.id);

      if (updateError) throw updateError;

      setRequest({
        ...request,
        event_id: newEvent?.id,
        status: "bestätigt",
      });
      setStatus("bestätigt");
      setMessage("Zu Event konvertiert.");
    } catch (err) {
      console.error("Fehler beim Konvertieren:", err);
      setMessage("Fehler beim Konvertieren.");
    }

    setConverting(false);
  };

  const handleDocumentUpload = async () => {
    if (!selectedFile || !request) {
      setMessage("Bitte zuerst eine Datei auswählen.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const filePath = `requests/${request.id}/${Date.now()}-${selectedFile.name.replace(
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
          customer_id: request.customer_id || null,
          request_id: request.id,
          name: selectedFile.name,
          type: documentType,
          file_url: signedData.signedUrl,
        })
        .select("*")
        .single();

      if (insertError) throw insertError;

      setDocuments((prev) => [insertedDoc, ...prev]);
      setSelectedFile(null);
      setDocumentType("Angebot");
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

  if (!request) {
    return <div className="pt-28 text-center">Anfrage nicht gefunden</div>;
  }

  const displayCustomerName =
    customer?.name || request.name || "Unbekannter Kunde";
  const displayFirma = customer?.firma || request.firma || "";
  const displayHeaderRight = displayFirma || displayCustomerName;

  return (
    <AdminLayout
      title={`${anlass || "Anfrage"} · ${displayHeaderRight}`}
      subtitle="Anfrage verwalten"
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
          to="/admin/requests"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Anfragenübersicht
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="space-y-6">
          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Kunde
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Name
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <p className="font-sans text-sm text-foreground font-medium">
                    {displayCustomerName}
                  </p>
                </div>
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Firma
                </p>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-accent" />
                  <p className="font-sans text-sm text-foreground font-medium">
                    {displayFirma || "Keine Firma"}
                  </p>
                </div>
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  E-Mail
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <p className="font-sans text-sm text-foreground">
                    {customer?.email || request.email}
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
                    {customer?.phone || request.phone || "Nicht hinterlegt"}
                  </p>
                </div>
              </div>
            </div>

            {customer?.id && (
              <Link
                to={`/admin/customers/${customer.id}`}
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 mt-4"
              >
                Kundenkonto öffnen
              </Link>
            )}
          </div>

          <div className={cardCls}>
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="font-display text-lg font-bold text-foreground">
                Anfrage-Details
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
                  Art der Veranstaltung
                </p>
                {isEditing ? (
                  <select
                    value={draftAnlass}
                    onChange={(e) => setDraftAnlass(e.target.value)}
                    className={inputCls}
                  >
                    {anlassOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="flex items-center gap-2">
                    <Theater className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {anlass || "Nicht angegeben"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Erstellt am
                </p>
                <p className="font-sans text-sm text-foreground font-medium">
                  {new Date(request.created_at).toLocaleDateString("de-DE")}
                </p>
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Datum
                </p>
                {isEditing ? (
                  <input
                    type="date"
                    value={draftDatum}
                    onChange={(e) => setDraftDatum(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {datum
                        ? new Date(datum).toLocaleDateString("de-DE")
                        : "Nicht angegeben"}
                    </p>
                  </div>
                )}
              </div>

              <div className={readOnlyCardCls}>
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Uhrzeit
                </p>
                {isEditing ? (
                  <input
                    type="time"
                    value={draftUhrzeit}
                    onChange={(e) => setDraftUhrzeit(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {uhrzeit || "Ganztägig"}
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
                      value={draftOrt}
                      onChange={(e) => setDraftOrt(e.target.value)}
                      placeholder="Ort / Adresse"
                      className={inputCls}
                    />
                    <p className="font-sans text-xs text-muted-foreground">
                      Google-Adresssuche binden wir als Nächstes hier ein.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {ort || "Nicht angegeben"}
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
                    value={draftGaeste}
                    onChange={(e) => setDraftGaeste(e.target.value)}
                    className={inputCls}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <p className="font-sans text-sm text-foreground font-medium">
                      {gaeste || "Nicht angegeben"}
                    </p>
                  </div>
                )}
              </div>

              <div className={`${readOnlyCardCls} sm:col-span-2`}>
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
                  Nachricht
                </p>
                {isEditing ? (
                  <textarea
                    value={draftNachricht}
                    onChange={(e) => setDraftNachricht(e.target.value)}
                    rows={5}
                    className={`${inputCls} resize-none`}
                  />
                ) : (
                  <p className="font-sans text-sm text-foreground whitespace-pre-line">
                    {nachricht || "Keine Nachricht vorhanden"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Dokumente
            </h2>

            <div className="grid sm:grid-cols-[1fr_180px] gap-3 mb-4">
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
                {requestDocumentTypes.map((type) => (
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
              {uploading ? "Lädt hoch…" : "Angebot / Info hochladen"}
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
              Status & Aktionen
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputCls}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="mt-3">
                  <span
                    className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(
                      request.status
                    )}`}
                  >
                    Aktuell: {formatStatusLabel(request.status)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm font-medium text-foreground mb-2">
                  Interne Notizen
                </label>
                {isEditing ? (
                  <textarea
                    value={draftInternalNotes}
                    onChange={(e) => setDraftInternalNotes(e.target.value)}
                    rows={6}
                    className={`${inputCls} resize-none`}
                  />
                ) : (
                  <div className={`${readOnlyCardCls} min-h-[120px]`}>
                    <p className="font-sans text-sm text-foreground whitespace-pre-line">
                      {internalNotes || "Keine internen Notizen vorhanden."}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={saveChanges}
                disabled={saving}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Speichert…" : "Status / Notizen speichern"}
              </button>

              {!request?.event_id && (
                <button
                  onClick={convertToEvent}
                  disabled={converting}
                  className="w-full inline-flex items-center justify-center rounded-xl border border-border/30 bg-background/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {converting ? "Konvertiert…" : "Zu Event konvertieren"}
                </button>
              )}

              {request?.event_id && (
                <Link
                  to={`/admin/events/${request.event_id}`}
                  className="inline-flex items-center justify-center rounded-xl border border-border/30 bg-background/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
                >
                  Verknüpftes Event öffnen
                </Link>
              )}

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

export default AdminRequestDetail;