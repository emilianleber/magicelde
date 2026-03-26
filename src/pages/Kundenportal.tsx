import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

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
      return "Warte auf Rückmeldung";
    case "gebucht":
      return "Gebucht";
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
    case "gebucht":
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

const buildTimeline = (request: BookingRequest | null, event: PortalEvent | null) => {
  const steps: { label: string; done: boolean }[] = [];

  steps.push({
    label: "Anfrage eingegangen",
    done: !!request,
  });

  steps.push({
    label: "In Bearbeitung",
    done:
      ["in_bearbeitung", "details_besprechen", "angebot_gesendet", "warte_auf_kunde"]
        .includes(request?.status || "") || !!event,
  });

  steps.push({
    label: "Angebot erhalten",
    done:
      ["angebot_gesendet", "warte_auf_kunde"].includes(request?.status || "") || !!event,
  });

  if (event) {
    steps.push({
      label: "Event gebucht",
      done: true,
    });

    steps.push({
      label: "Details klären",
      done: event.details_status === "erledigt",
    });

    steps.push({
      label: "Vertrag",
      done: event.contract_status === "erledigt",
    });

    steps.push({
      label: "Rechnung",
      done: event.invoice_status === "erledigt",
    });

    steps.push({
      label: "Event durchgeführt",
      done: event.status === "event_erfolgt",
    });
  }

  return steps;
};

const Kundenportal = () => {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [kundennummer, setKundennummer] = useState("");
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "events" | "documents" | "requests" | "contact"
  >("dashboard");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
    if (!user || !user.email) return;

    const fetchData = async () => {
      setLoading(true);

      let customer: any = null;

      const { data: existingCustomer } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      customer = existingCustomer;

      if (!customer) {
        const { data: byEmail } = await supabase
          .from("portal_customers")
          .select("*")
          .eq("email", user.email)
          .maybeSingle();

        if (byEmail) {
          const { data: linked } = await supabase
            .from("portal_customers")
            .update({ user_id: user.id })
            .eq("id", byEmail.id)
            .select("*")
            .single();

          customer = linked;
        }
      }

      if (customer) {
        setCustomerName(customer.name || "");
        setKundennummer(customer.kundennummer || "");

        const { data: eventsData } = await supabase
          .from("portal_events")
          .select("*")
          .eq("customer_id", customer.id);

        const { data: docsData } = await supabase
          .from("portal_documents")
          .select("*")
          .eq("customer_id", customer.id);

        if (eventsData) setEvents(eventsData);
        if (docsData) setDocuments(docsData);
      }

      const { data: requestsData } = await supabase
        .from("portal_requests")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      if (requestsData) {
        setRequests(requestsData);
        if (requestsData.length > 0) {
          setExpandedRequestId(requestsData[0].id);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  if (!user || loading) {
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

  const displayName = customerName || user.email?.split("@")[0] || "Kunde";
  const currentRequest = requests[0] || null;
  const currentEvent =
    events.find((e) => e.request_id === currentRequest?.id) || null;
  const timelineSteps = buildTimeline(currentRequest, currentEvent);

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Kundenportal
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Willkommen, {displayName}
              </h1>
              {kundennummer && (
                <p className="font-sans text-sm text-muted-foreground mt-1">
                  Kundennummer: {kundennummer}
                </p>
              )}
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>

          <div className="flex gap-1 bg-muted/50 rounded-2xl p-1 mb-10 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "events", label: "Events", icon: Calendar },
              { id: "documents", label: "Dokumente", icon: FolderOpen },
              { id: "requests", label: "Anfragen", icon: MessageCircle },
              { id: "contact", label: "Kontakt", icon: Phone },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Aktive Events", value: String(events.length), icon: Calendar },
                  { label: "Dokumente", value: String(documents.length), icon: FileText },
                  { label: "Anfragen", value: String(requests.length), icon: MessageCircle },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-2xl bg-muted/30 border border-border/30"
                  >
                    <stat.icon className="w-6 h-6 text-accent mb-3" />
                    <p className="font-display text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {timelineSteps.length > 0 && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-6">
                    Nächste Schritte
                  </h2>

                  <div className="space-y-4">
                    {timelineSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-0.5">
                          {step.done ? (
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground/30" />
                          )}
                        </div>

                        <p
                          className={`font-sans text-sm ${
                            step.done ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentRequest && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">
                    Letzte Anfrage
                  </h2>
                  <div className="rounded-2xl bg-background/60 border border-border/30 p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {currentRequest.anlass || "Anfrage"}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1">
                          Eingegangen am{" "}
                          {new Date(currentRequest.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(
                            currentRequest.status
                          )}`}
                        >
                          {formatStatusLabel(currentRequest.status)}
                        </span>
                        {currentRequest.event_id && (
                          <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-green-700 bg-green-100">
                            Als Event übernommen
                          </span>
                        )}
                      </div>
                    </div>

                    {currentRequest.nachricht && (
                      <p className="font-sans text-sm text-muted-foreground mt-4 leading-relaxed">
                        {currentRequest.nachricht}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {currentEvent && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">
                    Aktuelles Event
                  </h2>

                  <div className="rounded-2xl bg-background/60 border border-border/30 p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {currentEvent.title}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1">
                          {currentEvent.event_date
                            ? new Date(currentEvent.event_date).toLocaleDateString("de-DE")
                            : "Datum folgt"}
                          {currentEvent.location ? ` · ${currentEvent.location}` : ""}
                        </p>
                      </div>

                      <span
                        className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatEventStatusClasses(
                          currentEvent.status
                        )}`}
                      >
                        {formatEventStatusLabel(currentEvent.status)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
                      {currentEvent.format && (
                        <span className="flex items-center gap-2">
                          <Theater className="w-4 h-4 text-accent" />
                          {currentEvent.format}
                        </span>
                      )}
                      {currentEvent.guests && (
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          {currentEvent.guests} Gäste
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {events.length === 0 && requests.length === 0 && (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    Noch keine Inhalte vorhanden
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground mb-6">
                    Nach Ihrer Anfrage oder Buchung erscheinen hier Ihre Anfragen,
                    Events und Dokumente.
                  </p>
                  <Link to="/buchung" className="btn-primary inline-flex group">
                    Jetzt anfragen
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <p className="font-sans text-sm text-muted-foreground">
                    Noch keine Events vorhanden.
                  </p>
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="font-display text-lg font-bold text-foreground">
                            {event.title}
                          </h3>
                          <span
                            className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatEventStatusClasses(
                              event.status
                            )}`}
                          >
                            {formatEventStatusLabel(event.status)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-muted-foreground">
                          {event.event_date && (
                            <span>📅 {new Date(event.event_date).toLocaleDateString("de-DE")}</span>
                          )}
                          {event.location && <span>📍 {event.location}</span>}
                          {event.format && <span>🎭 {event.format}</span>}
                          {event.guests && <span>👥 {event.guests} Gäste</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-3">
              {documents.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <p className="font-sans text-sm text-muted-foreground">
                    Noch keine Dokumente vorhanden.
                  </p>
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-sans text-sm font-medium text-foreground">
                          {doc.name}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground">
                          {doc.type} ·{" "}
                          {new Date(doc.created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                    </div>
                    {doc.file_url && (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-sans text-xs text-accent hover:text-accent/80 transition-colors"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <p className="font-sans text-sm text-muted-foreground">
                    Noch keine Anfragen vorhanden.
                  </p>
                </div>
              ) : (
                requests.map((request) => {
                  const isOpen = expandedRequestId === request.id;

                  return (
                    <div
                      key={request.id}
                      className="rounded-2xl bg-muted/20 border border-border/30 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedRequestId(isOpen ? null : request.id)
                        }
                        className="w-full text-left p-6 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <h3 className="font-display text-lg font-bold text-foreground">
                                {request.anlass || "Anfrage"}
                              </h3>
                              <span
                                className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(
                                  request.status
                                )}`}
                              >
                                {formatStatusLabel(request.status)}
                              </span>
                              {request.event_id && (
                                <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-green-700 bg-green-100">
                                  Als Event übernommen
                                </span>
                              )}
                            </div>

                            <p className="font-sans text-xs text-muted-foreground">
                              Eingegangen am{" "}
                              {new Date(request.created_at).toLocaleDateString("de-DE")}
                            </p>
                          </div>

                          <div className="text-muted-foreground">
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 border-t border-border/20">
                          <div className="grid sm:grid-cols-2 gap-4 mt-5">
                            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                Anfrage von
                              </p>
                              <p className="font-sans text-sm text-foreground font-medium">
                                {request.name}
                              </p>
                            </div>

                            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                E-Mail
                              </p>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-accent" />
                                <p className="font-sans text-sm text-foreground">
                                  {request.email}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                Telefon
                              </p>
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-accent" />
                                <p className="font-sans text-sm text-foreground">
                                  {request.phone || "Nicht angegeben"}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
                              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                Gewünschtes Datum
                              </p>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-accent" />
                                <p className="font-sans text-sm text-foreground">
                                  {request.datum
                                    ? new Date(request.datum).toLocaleDateString("de-DE")
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
                                  {request.ort || "Nicht angegeben"}
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
                                  {request.gaeste ?? "Nicht angegeben"}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-xl bg-background/60 border border-border/20 p-4 sm:col-span-2">
                              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                                Gewünschtes Format
                              </p>
                              <div className="flex items-center gap-2">
                                <Theater className="w-4 h-4 text-accent" />
                                <p className="font-sans text-sm text-foreground">
                                  {request.format || "Nicht angegeben"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 rounded-xl bg-background/60 border border-border/20 p-4">
                            <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                              Nachricht
                            </p>
                            <p className="font-sans text-sm text-foreground leading-relaxed whitespace-pre-line">
                              {request.nachricht || "Keine zusätzliche Nachricht angegeben."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="max-w-lg">
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">
                  Ihr Ansprechpartner
                </h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">
                      Emilian Leber
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      Zauberer & Showkünstler
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="mailto:el@magicel.de"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-foreground">
                      el@magicel.de
                    </span>
                  </a>
                  <a
                    href="tel:+4915563744696"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-foreground">
                      +49 155 63744696
                    </span>
                  </a>
                </div>

                <Link
                  to="/kontakt"
                  className="btn-primary justify-center mt-6 w-full group"
                >
                  Nachricht senden
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Kundenportal;
