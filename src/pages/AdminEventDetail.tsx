import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  LogOut,
  MapPin,
  Save,
  Theater,
  Users,
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

const AdminEventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [event, setEvent] = useState<PortalEvent | null>(null);

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

      if (error) {
        console.error("Fehler beim Laden des Events:", error);
        setLoading(false);
        return;
      }

      if (data) {
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
      }

      setLoading(false);
    };

    loadEvent();
  }, [user, id]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const saveChanges = async () => {
    if (!event) return;

    setSaving(true);
    setMessage("");

    const safeEventType = eventType.trim() || "Event";
    const safeCustomerName = customerName.trim() || null;
    const safeFirma = firma.trim() || null;

    const { error } = await supabase
      .from("portal_events")
      .update({
        title: safeEventType,
        event_type: safeEventType,
        customer_name: safeCustomerName,
        firma: safeFirma,
        event_date: eventDate.trim() || null,
        start_time: startTime.trim() || null,
        end_time: endTime.trim() || null,
        location: location.trim() || null,
        format: format || null,
        guests: guests ? Number(guests) : null,
        status,
        details_status: detailsStatus,
        contract_status: contractStatus,
        invoice_status: invoiceStatus,
        notes: notes.trim() || null,
      })
      .eq("id", event.id);

    if (error) {
      console.error("Fehler beim Speichern:", error);
      setMessage("Fehler beim Speichern.");
      setSaving(false);
      return;
    }

    setEvent({
      ...event,
      title: safeEventType,
      event_type: safeEventType,
      customer_name: safeCustomerName,
      firma: safeFirma,
      event_date: eventDate.trim() || null,
      start_time: startTime.trim() || null,
      end_time: endTime.trim() || null,
      location: location.trim() || null,
      format: format || null,
      guests: guests ? Number(guests) : null,
      status,
      details_status: detailsStatus,
      contract_status: contractStatus,
      invoice_status: invoiceStatus,
      notes: notes.trim() || null,
    });

    setMessage("Event gespeichert.");
    setSaving(false);
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

  const displaySecondary = firma || customerName || "Kein Name hinterlegt";

  return (
    <AdminLayout
      title={`${eventType || "Event"} · ${displaySecondary}`}
      subtitle="Event verwalten, Termin festlegen und Details pflegen"
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
              Feste Eventdaten
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl bg-background/60 border border-border/20 p-4">
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

              <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Firma / Name
                </p>
                <p className="font-sans text-sm text-foreground font-medium">
                  {displaySecondary}
                </p>
              </div>

              <div className="rounded-xl bg-background/60 border border-border/20 p-4 sm:col-span-2">
                <p className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Verknüpfte Anfrage
                </p>
                {event.request_id ? (
                  <Link
                    to={`/admin/requests/${event.request_id}`}
                    className="text-sm text-accent hover:text-accent/80"
                  >
                    Anfrage öffnen
                  </Link>
                ) : (
                  <p className="font-sans text-sm text-muted-foreground">
                    Keine Anfrage verknüpft
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Bearbeitbare Eventdaten
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
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
                  placeholder="Ort / Adresse"
                  className={inputCls}
                />
              </div>

              <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Startzeit
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <Clock3 className="w-4 h-4 text-accent" />
                </div>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                  Endzeit
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <Clock3 className="w-4 h-4 text-accent" />
                </div>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
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
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className={inputCls}
                >
                  {formatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={cardCls}>
            <h2 className="font-display text-lg font-bold text-foreground mb-5">
              Weitere Details
            </h2>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              placeholder="Notizen zum Event, Ablauf, Technik, Ansprechpartner, Besonderheiten …"
              className="w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
            />
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
    </AdminLayout>
  );
};

export default AdminEventDetail;