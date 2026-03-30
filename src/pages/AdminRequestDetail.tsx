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
  company?: string | null;
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

const requestDocumentTypes = [
  { value: "Angebot", label: "Angebot" },
  { value: "Info", label: "Info" },
];

const formatStatusClasses = (status?: string | null) => {
  switch (status) {
    case "neu": return "text-blue-600 bg-blue-50 border-blue-200";
    case "in_bearbeitung": case "details_besprechen": case "angebot_gesendet": case "warte_auf_kunde":
      return "text-foreground bg-muted border-border/30";
    case "bestätigt": return "text-green-700 bg-green-50 border-green-200";
    case "abgelehnt": return "text-destructive bg-destructive/10 border-destructive/20";
    case "archiviert": return "text-muted-foreground bg-muted border-border/20";
    default: return "text-muted-foreground bg-muted border-border/20";
  }
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

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
  const [changeRequests, setChangeRequests] = useState<PortalChangeRequest[]>([]);
  const [crResponseText, setCrResponseText] = useState<Record<string, string>>({});
  const [crUpdating, setCrUpdating] = useState<Record<string, boolean>>({});

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

      if (data.customer_id) {
        const { data: cust } = await supabase.from("portal_customers").select("*").eq("id", data.customer_id).maybeSingle();
        setCustomer(cust || null);
      }

      const { data: docs } = await supabase.from("portal_documents").select("*").eq("request_id", data.id).order("created_at", { ascending: false });
      setDocuments(docs || []);
      const { data: crs } = await supabase.from("portal_change_requests").select("*").eq("request_id", data.id).order("created_at", { ascending: false });
      setChangeRequests(crs || []);
      setLoading(false);
    };
    load();
  }, [user, id]);

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
    setIsEditing(false); setMessage("Gespeichert."); setSaving(false);
  };

  const sendStatusMail = async () => {
    if (!request) return;
    setSendingMail(true); setMessage("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-send-status-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ type: "request", recordId: request.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler");
      setMessage(data.skipped ? "Kein Mail für diesen Status vorgesehen." : "✓ Mail gesendet.");
    } catch (err: any) {
      setMessage("Mail-Fehler: " + (err.message || "Unbekannt"));
    }
    setSendingMail(false);
  };

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
        end_time: null,
        location: ort.trim() || null,
        format: format || null,
        guests: gaeste ? Number(gaeste) : null,
        status: "in_planung",
      }).select("*").single();
      if (insertError) throw insertError;

      const { error: updateError } = await supabase.from("portal_requests").update({ event_id: newEvent?.id, status: "bestätigt" }).eq("id", request.id);
      if (updateError) throw updateError;

      setRequest({ ...request, event_id: newEvent?.id, status: "bestätigt" });
      setStatus("bestätigt");
      setMessage("Zu Event konvertiert.");
    } catch (err) {
      setMessage("Fehler beim Konvertieren.");
    }
    setConverting(false);
  };

  const handleDocumentUpload = async () => {
    if (!selectedFile || !request) { setMessage("Bitte zuerst eine Datei auswählen."); return; }
    setUploading(true); setMessage("");
    try {
      const filePath = `requests/${request.id}/${Date.now()}-${selectedFile.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage.from("portal-documents").upload(filePath, selectedFile, { upsert: false });
      if (uploadError) throw uploadError;
      const { data: signedData, error: signedError } = await supabase.storage.from("portal-documents").createSignedUrl(filePath, 60 * 60 * 24 * 365);
      if (signedError) throw signedError;
      const { data: insertedDoc, error: insertError } = await supabase.from("portal_documents").insert({ customer_id: request.customer_id || null, request_id: request.id, name: selectedFile.name, type: documentType, file_url: signedData.signedUrl }).select("*").single();
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
    }
    setCrUpdating((prev) => ({ ...prev, [crId]: false }));
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;
  if (!request) return <div className="pt-28 text-center">Anfrage nicht gefunden</div>;

  const displayCustomerName = customer?.name || request.name || "Unbekannter Kunde";
  const displayFirma = customer?.company || request.firma || "";
  const isError = message.startsWith("Fehler") || message.startsWith("Mail-Fehler");
  const openCrCount = changeRequests.filter((cr) => cr.status === "offen").length;

  return (
    <AdminLayout
      title={anlass || "Anfrage"}
      subtitle={displayFirma ? `${displayCustomerName} · ${displayFirma}` : displayCustomerName}
    >
      {/* Back */}
      <div className="mb-4">
        <Link to="/admin/requests" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Zurück zu Anfragen
        </Link>
      </div>

      {/* Customer banner */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-border/30 mb-5">
        <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
          {(displayCustomerName)[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-foreground">{displayCustomerName}</p>
            {displayFirma && <span className="text-xs text-muted-foreground">{displayFirma}</span>}
            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${formatStatusClasses(request.status)}`}>
              {request.status || "offen"}
            </span>
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
        {customer?.id && (
          <Link to={`/admin/customers/${customer.id}`} className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 shrink-0">
            Kundenkonto <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div className="grid lg:grid-cols-[3fr_2fr] gap-5 items-start">
        {/* LEFT: Details + Documents */}
        <div className="space-y-5">
          {/* Request Details */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-foreground">Anfrage-Details</h2>
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
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Veranstaltung</label>
                {isEditing ? (
                  <select value={draftAnlass} onChange={(e) => setDraftAnlass(e.target.value)} className={inputCls}>
                    {anlassOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <p className="text-sm text-foreground flex items-center gap-1.5 min-h-[2rem]">
                    <Theater className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    {anlass || <span className="text-muted-foreground">–</span>}
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
                  <p className="text-sm text-foreground min-h-[2rem]">
                    {format || <span className="text-muted-foreground">–</span>}
                  </p>
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
                  <textarea value={draftNachricht} onChange={(e) => setDraftNachricht(e.target.value)} rows={4} className={`${inputCls} resize-none`} />
                ) : (
                  <p className="text-sm text-foreground whitespace-pre-line min-h-[2rem]">
                    {nachricht || <span className="text-muted-foreground">–</span>}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
            <h2 className="text-sm font-bold text-foreground mb-4">Dokumente</h2>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="flex-1 min-w-0 rounded-xl bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground"
              />
              <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="rounded-xl bg-background/60 border border-border/30 px-3 py-2 text-sm text-foreground">
                {requestDocumentTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
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
                {changeRequests.filter((cr) => cr.status === "offen").length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent text-[10px] font-bold text-white">
                    {changeRequests.filter((cr) => cr.status === "offen").length}
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
        </div>

        {/* RIGHT: Status + Notes + Actions */}
        <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="text-sm font-bold text-foreground mb-4">Status & Aktionen</h2>

          {/* Status pipeline */}
          <div className="space-y-1 mb-5">
            {statusOptions.map((opt, i) => (
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

          {/* Internal notes */}
          <div className="border-t border-border/20 pt-4 mb-5">
            <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Interne Notizen</label>
            {isEditing ? (
              <textarea value={draftInternalNotes} onChange={(e) => setDraftInternalNotes(e.target.value)} rows={5} className={`${inputCls} resize-none`} />
            ) : (
              <div
                onClick={startEditing}
                className="min-h-[80px] p-3 rounded-xl bg-background/60 border border-border/20 text-sm text-foreground whitespace-pre-line cursor-text hover:border-border/40 transition-colors"
              >
                {internalNotes || <span className="text-muted-foreground/60">Klicken zum Bearbeiten…</span>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button onClick={saveChanges} disabled={saving} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity">
              <Save className="w-4 h-4" /> {saving ? "Speichert…" : "Speichern"}
            </button>
            <button onClick={sendStatusMail} disabled={sendingMail} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border/30 bg-background/60 px-4 py-2.5 text-sm font-medium hover:bg-muted/40 disabled:opacity-50 transition-colors">
              <Mail className="w-4 h-4" /> {sendingMail ? "Sendet…" : "Status-Mail senden"}
            </button>
            {!request.event_id ? (
              <button onClick={convertToEvent} disabled={converting} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/5 px-4 py-2.5 text-sm font-medium text-accent hover:bg-accent/10 disabled:opacity-50 transition-colors">
                <Sparkles className="w-4 h-4" /> {converting ? "Konvertiert…" : "Zu Event konvertieren"}
              </button>
            ) : (
              <Link to={`/admin/events/${request.event_id}`} className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors">
                Verknüpftes Event öffnen <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {message && (
            <div className={`mt-3 rounded-xl px-3 py-2 text-sm ${isError ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-700"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminRequestDetail;
