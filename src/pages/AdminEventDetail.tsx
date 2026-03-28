import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  LogOut,
  MapPin,
  Save,
  Theater,
  Users,
  Upload,
  FileText,
  Download,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

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
  created_at?: string | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
  created_at: string;
  event_id?: string | null;
  customer_id?: string | null;
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
    case "event_erfolgt":
      return "text-green-700 bg-green-100";
    case "storniert":
      return "text-destructive bg-destructive/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const AdminEventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [event, setEvent] = useState<PortalEvent | null>(null);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("");
  const [guests, setGuests] = useState("");
  const [status, setStatus] = useState("in_planung");
  const [detailsStatus, setDetailsStatus] = useState("offen");
  const [contractStatus, setContractStatus] = useState("offen");
  const [invoiceStatus, setInvoiceStatus] = useState("offen");
  const [notes, setNotes] = useState("");
  const [sendMail, setSendMail] = useState(true);
  const [message, setMessage] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("Dokument");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/kundenportal/login");
        return;
      }
      setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/kundenportal/login");
        return;
      }
      setUser(session.user);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email || !id) return;

    const loadData = async () => {
      setLoading(true);

      const { data: adminEntry } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (!adminEntry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data, error } = await supabase
        .from("portal_events")
        .select("*")
        .eq("id", id)
        .single();

            if (error) {
        console.error("Fehler beim Laden des Events:", error);
      } else if (data) {
        setEvent(data);
        setTitle(data.title || "");
        setEventDate(data.event_date || "");
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
      }

      setLoading(false);
    };

    loadData();
  }, [user, id, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const sendEventStatusMail = async (recordId: string) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      throw new Error("Keine Session für Event-Mail gefunden.");
    }

    const response = await fetch(
      "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-send-status-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          type: "event",
          recordId,
        }),
      }
    );

    const data = await response.json().catch(() => null);

    console.log("EVENT STATUS MAIL RESPONSE:", response.status, data);

    if (!response.ok) {
      throw new Error(data?.error || "Event-Mail konnte nicht gesendet werden.");
    }

    return data;
  };

  const saveChanges = async () => {
    if (!event) return;

    setSaving(true);
    setMessage("");

    const previousStatus = event.status;

    const { error } = await supabase
      .from("portal_events")
      .update({
        title: title.trim() || "Event",
        event_date: eventDate.trim() || null,
        location: location.trim() || null,
        format: format.trim() || null,
        guests: guests ? Number(guests) : null,
        status,
        details_status: detailsStatus,
        contract_status: contractStatus,
        invoice_status: invoiceStatus,
        notes,
      })
      .eq("id", event.id);

    if (error) {
      console.error(error);
      setMessage("Fehler beim Speichern.");
      setSaving(false);
      return;
    }

    const updatedEvent: PortalEvent = {
      ...event,
      title: title.trim() || "Event",
      event_date: eventDate.trim() || null,
      location: location.trim() || null,
      format: format.trim() || null,
      guests: guests ? Number(guests) : null,
      status,
      details_status: detailsStatus,
      contract_status: contractStatus,
      invoice_status: invoiceStatus,
      notes,
    };

    setEvent(updatedEvent);

    if (previousStatus !== status && sendMail) {
      try {
        await sendEventStatusMail(event.id);
        setMessage("Gespeichert und Mail versendet.");
      } catch (mailErr: any) {
        console.error("EVENT STATUS MAIL ERROR:", mailErr);
        setMessage(
          `Gespeichert, aber Mail fehlgeschlagen: ${
            mailErr?.message || "Unbekannter Fehler"
          }`
        );
      }
    } else {
      setMessage("Gespeichert.");
    }

    setSaving(false);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !event) {
      setMessage("Bitte zuerst eine Datei auswählen.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${event.id}/${Date.now()}-${selectedFile.name.replace(
        /\s+/g,
        "-"
      )}`;
      const filePath = fileExt ? fileName : `${fileName}.file`;

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
          type: documentType || "Dokument",
          file_url: signedData.signedUrl,
        })
        .select("*")
        .single();

      if (insertError) throw insertError;

      setDocuments((prev) => [insertedDoc, ...prev]);
      setSelectedFile(null);
      setDocumentType("Dokument");
      setMessage("Dokument erfolgreich hochgeladen.");
    } catch (err: any) {
      console.error("UPLOAD ERROR:", err);
      setMessage(`Fehler beim Upload: ${err?.message || "Unbekannter Fehler"}`);
    }

    setUploading(false);
  };

  if (loading) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground font-sans">
            Wird geladen…
          </div>
        </section>
      </PageLayout>
    );
  }

  if (isAdmin === false) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
              <h1 className="font-display text-2xl font-bold text-foreground mb-3">
                Kein Zugriff
              </h1>
              <p className="font-sans text-sm text-muted-foreground">
                Dein Account ist nicht als Admin freigegeben.
              </p>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  if (!event) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 pb-16">
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="p-10 rounded-3xl bg-muted/20 border border-border/30 text-center">
              <h1 className="font-display text-2xl font-bold text-foreground mb-3">
                Event nicht gefunden
              </h1>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <Link
                to="/admin/events"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück zur Übersicht
              </Link>

              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Admin / CRM
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {title || event.title}
              </h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {eventDate
                  ? new Date(eventDate).toLocaleDateString("de-DE")
                  : "Kein Datum"}
                {location ? ` · ${location}` : ""}
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-5">
                  Event-Details
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background/60 border border-border/20 p-4 sm:col-span-2">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Titel
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Datum
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-accent" />
                    </div>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Ort
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Gäste
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Format
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <Theater className="w-4 h-4 text-accent" />
                    </div>
                    <input
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                {event.request_id && (
                  <div className="mt-4 rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Verknüpfte Anfrage
                    </p>
                    <p className="font-sans text-sm text-foreground">
                      Anfrage-ID: {event.request_id}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-5">
                  Dokumente
                </h2>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-[1fr_180px] gap-3">
                    <input
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground"
                    />

                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
                    >
                      <option value="Dokument">Dokument</option>
                      <option value="Angebot">Angebot</option>
                      <option value="Vertrag">Vertrag</option>
                      <option value="Rechnung">Rechnung</option>
                      <option value="Ablaufplan">Ablaufplan</option>
                      <option value="Info">Info</option>
                    </select>
                  </div>

                  <button
                    onClick={handleFileUpload}
                    disabled={uploading || !selectedFile}
                    className="w-full inline-flex items-center justify-center rounded-xl border border-border/30 bg-background/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Lädt hoch…" : "Dokument hochladen"}
                  </button>

                  <div className="space-y-3 pt-2">
                    {documents.length === 0 ? (
                      <p className="font-sans text-sm text-muted-foreground">
                        Noch keine Dokumente vorhanden.
                      </p>
                    ) : (
                      documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-border/20"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-accent" />
                            <div>
                              <p className="font-sans text-sm font-medium text-foreground">
                                {doc.name}
                              </p>
                              <p className="font-sans text-xs text-muted-foreground">
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
                              className="inline-flex items-center gap-1.5 font-sans text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Öffnen
                            </a>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-5">
                  Bearbeitung
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block font-sans text-sm font-medium text-foreground mb-2">
                      Event-Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
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
                      Interne Notizen
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={8}
                      placeholder="Notizen zum Event, Absprachen, Technik, Ablauf, Besonderheiten …"
                      className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                    />
                  </div>

                  <label className="flex items-center gap-3 rounded-xl bg-background/60 border border-border/20 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={sendMail}
                      onChange={(e) => setSendMail(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="font-sans text-sm text-foreground">
                      Kundenmail bei Statusänderung senden
                    </span>
                  </label>

                  {message && (
                    <div className="rounded-xl bg-accent/10 text-accent px-4 py-3 text-sm">
                      {message}
                    </div>
                  )}

                  <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Speichert…" : "Änderungen speichern"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminEventDetail;