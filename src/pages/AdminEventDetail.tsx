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

const AdminEventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [event, setEvent] = useState<PortalEvent | null>(null);
  const [status, setStatus] = useState("in_planung");
  const [detailsStatus, setDetailsStatus] = useState("offen");
  const [contractStatus, setContractStatus] = useState("offen");
  const [invoiceStatus, setInvoiceStatus] = useState("offen");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

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
        setStatus(data.status || "in_planung");
        setDetailsStatus(data.details_status || "offen");
        setContractStatus(data.contract_status || "offen");
        setInvoiceStatus(data.invoice_status || "offen");
        setNotes(data.notes || "");
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

    const updatedEvent = {
      ...event,
      status,
      details_status: detailsStatus,
      contract_status: contractStatus,
      invoice_status: invoiceStatus,
      notes,
    };

    setEvent(updatedEvent);

    if (previousStatus !== status) {
      try {
        await sendEventStatusMail(event.id);
        setMessage("Gespeichert und Mail versendet.");
      } catch (mailErr: any) {
        console.error("EVENT STATUS MAIL ERROR:", mailErr);
        setMessage(
          `Gespeichert, aber Mail fehlgeschlagen: ${mailErr?.message || "Unbekannter Fehler"}`
        );
      }
    } else {
      setMessage("Gespeichert.");
    }

    setSaving(false);
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
                {event.title}
              </h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {event.event_date
                  ? new Date(event.event_date).toLocaleDateString("de-DE")
                  : "Kein Datum"}
                {event.location ? ` · ${event.location}` : ""}
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
                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Titel
                    </p>
                    <p className="font-sans text-sm text-foreground font-medium">
                      {event.title}
                    </p>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Status
                    </p>
                    <span
                      className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatEventStatusClasses(
                        event.status
                      )}`}
                    >
                      {formatEventStatusLabel(event.status)}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Datum
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {event.event_date
                          ? new Date(event.event_date).toLocaleDateString("de-DE")
                          : "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Ort
                    </p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {event.location || "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Gäste
                    </p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {event.guests ?? "Nicht angegeben"}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                    <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                      Format
                    </p>
                    <div className="flex items-center gap-2">
                      <Theater className="w-4 h-4 text-accent" />
                      <p className="font-sans text-sm text-foreground">
                        {event.format || "Nicht angegeben"}
                      </p>
                    </div>
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
