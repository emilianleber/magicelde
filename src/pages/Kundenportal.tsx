import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  FileText,
  MessageCircle,
  Clock,
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
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string;
  format: string | null;
  guests: number | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string;
  file_url: string | null;
  created_at: string;
}

interface TimelineStep {
  id: string;
  step: string;
  done: boolean;
  step_date: string | null;
  sort_order: number;
}

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "Neu";
    case "in_bearbeitung":
      return "In Bearbeitung";
    case "angebot_gesendet":
      return "Angebot gesendet";
    case "warte_auf_kunde":
      return "Warte auf Rückmeldung";
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

const Kundenportal = () => {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [kundennummer, setKundennummer] = useState("");
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [timeline, setTimeline] = useState<TimelineStep[]>([]);
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
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);

      let customer: any = null;

      const { data: existingCustomer, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (customerError) {
        console.error("Fehler beim Laden des Kunden:", customerError);
      }

      customer = existingCustomer;

      if (!customer) {
        const { data: createdCustomer, error: createCustomerError } = await supabase
          .from("portal_customers")
          .insert({
            user_id: user.id,
            name: "",
            kundennummer: "",
          })
          .select("*")
          .single();

        if (createCustomerError) {
          console.error("Fehler beim Erstellen des Kunden:", createCustomerError);
        } else {
          customer = createdCustomer;
        }
      }

      if (customer) {
        setCustomerName(customer.name || "");
        setKundennummer(customer.kundennummer || "");

        const { data: eventsData, error: eventsError } = await supabase
          .from("portal_events")
          .select("*")
          .eq("customer_id", customer.id)
          .order("event_date", { ascending: true });

        if (eventsError) {
          console.error("Fehler beim Laden der Events:", eventsError);
        }

        const { data: docsData, error: docsError } = await supabase
          .from("portal_documents")
          .select("*")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false });

        if (docsError) {
          console.error("Fehler beim Laden der Dokumente:", docsError);
        }

        if (eventsData) setEvents(eventsData);
        if (docsData) setDocuments(docsData);

        if (eventsData && eventsData.length > 0) {
          const { data: timelineData, error: timelineError } = await supabase
            .from("portal_timeline")
            .select("*")
            .eq("event_id", eventsData[0].id)
            .order("sort_order", { ascending: true });

          if (timelineError) {
            console.error("Fehler beim Laden der Timeline:", timelineError);
          }

          if (timelineData) setTimeline(timelineData);
        }
      }

      if (user.email) {
        const { data: requestsData, error: requestsError } = await supabase
          .from("portal_requests")
          .select("*")
          .eq("email", user.email)
          .order("created_at", { ascending: false });

        if (requestsError) {
          console.error("Fehler beim Laden der Anfragen:", requestsError);
        }

        if (requestsData) {
          setRequests(requestsData);
          if (requestsData.length > 0) {
            setExpandedRequestId(requestsData[0].id);
          }
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

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "events" as const, label: "Events", icon: Calendar },
    { id: "documents" as const, label: "Dokumente", icon: FolderOpen },
    { id: "requests" as const, label: "Anfragen", icon: MessageCircle },
    { id: "contact" as const, label: "Kontakt", icon: Phone },
  ];

  const displayName = customerName || user.email?.split("@")[0] || "Kunde";

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
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
                  {
                    label: "Aktive Events",
                    value: String(events.length),
                    icon: Calendar,
                  },
                  {
                    label: "Dokumente",
                    value: String(documents.length),
                    icon: FileText,
                  },
                  {
                    label: "Anfragen",
                    value: String(requests.length),
                    icon: MessageCircle,
                  },
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

              {requests.length > 0 && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-4">
                    Letzte Anfrage
                  </h2>
                  <div className="rounded-2xl bg-background/60 border border-border/30 p-5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {requests[0].anlass || "Anfrage"}
                        </h3>
                        <p className="font-sans text-sm text-muted-foreground mt-1">
                          Eingegangen am{" "}
                          {new Date(requests[0].created_at).toLocaleDateString("de-DE")}
                        </p>
                      </div>
                      <span
                        className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(
                          requests[0].status
                        )}`}
                      >
                        {formatStatusLabel(requests[0].status)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {timeline.length > 0 && (
                <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                  <h2 className="font-display text-lg font-bold text-foreground mb-6">
                    Event-Timeline{events[0] ? `: ${events[0].title}` : ""}
                  </h2>
                  <div className="space-y-4">
                    {timeline.map((t) => (
                      <div key={t.id} className="flex items-start gap-4">
                        <div className="mt-0.5">
                          {t.done ? (
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground/30" />
                          )}
                        </div>
                        <div className="flex-1">
                                                    <p
                            className={`font-sans text-sm font-medium ${
                              t.done ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {t.step}
                          </p>
                          {t.step_date && (
                            <p className="font-sans text-xs text-muted-foreground">
                              {new Date(t.step_date).toLocaleDateString("de-DE")}
                            </p>
                          )}
                        </div>
                        {t.done && (
                          <span className="font-sans text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">
                            Erledigt
                          </span>
                        )}
                      </div>
                    ))}
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

          {/* EVENTS */}
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
                    className="p-6 rounded-2xl bg-muted/20 border border-border/30"
                  >
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {event.event_date &&
                        new Date(event.event_date).toLocaleDateString("de-DE")}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* DOCUMENTS */}
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
                    className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/30"
                  >
                    <div>
                      <p className="font-sans text-sm text-foreground">
                        {doc.name}
                      </p>
                    </div>
                    {doc.file_url && (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        className="text-accent text-sm"
                      >
                        Download
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* REQUESTS (DETAILED) */}
          {activeTab === "requests" && (
            <div className="space-y-4">
              {requests.map((request) => {
                const isOpen = expandedRequestId === request.id;

                return (
                  <div key={request.id} className="border rounded-xl">
                    <button
                      onClick={() =>
                        setExpandedRequestId(isOpen ? null : request.id)
                      }
                      className="w-full text-left p-4 flex justify-between"
                    >
                      <span>{request.anlass}</span>
                      {isOpen ? "▲" : "▼"}
                    </button>

                    {isOpen && (
                      <div className="p-4 space-y-2 text-sm">
                        <p><strong>Name:</strong> {request.name}</p>
                        <p><strong>Email:</strong> {request.email}</p>
                        <p><strong>Telefon:</strong> {request.phone}</p>
                        <p><strong>Datum:</strong> {request.datum}</p>
                        <p><strong>Ort:</strong> {request.ort}</p>
                        <p><strong>Gäste:</strong> {request.gaeste}</p>
                        <p><strong>Format:</strong> {request.format}</p>
                        <p><strong>Nachricht:</strong> {request.nachricht}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* CONTACT */}
          {activeTab === "contact" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Kontakt: el@magicel.de
              </p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Kundenportal;
