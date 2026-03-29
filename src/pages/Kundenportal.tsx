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
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

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

const Kundenportal = () => {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [kundennummer, setKundennummer] = useState("");
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);
  const [timeline, setTimeline] = useState<TimelineStep[]>([]);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "events" | "documents" | "contact"
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

      let { data: customer, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      // Falls nach Registrierung noch kein Kundenprofil existiert, automatisch anlegen
      if (!customer && !customerError) {
        const { data: createdCustomer } = await supabase
          .from("portal_customers")
          .insert({
            user_id: user.id,
            name: "",
            kundennummer: "",
          })
          .select("*")
          .single();

        customer = createdCustomer ?? null;
      }

      if (customer) {
        setCustomerName(customer.name || "");
        setKundennummer(customer.kundennummer || "");

        const { data: eventsData } = await supabase
          .from("portal_events")
          .select("*")
          .eq("customer_id", customer.id)
          .order("event_date", { ascending: true });

        const { data: docsData } = await supabase
          .from("portal_documents")
          .select("*")
          .eq("customer_id", customer.id)
          .order("created_at", { ascending: false });

        if (eventsData) setEvents(eventsData);
        if (docsData) setDocuments(docsData);

        if (eventsData && eventsData.length > 0) {
          const { data: timelineData } = await supabase
            .from("portal_timeline")
            .select("*")
            .eq("event_id", eventsData[0].id)
            .order("sort_order", { ascending: true });

          if (timelineData) setTimeline(timelineData);
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
                    label: "Nächstes Event",
                    value: events[0]?.event_date
                      ? new Date(events[0].event_date).toLocaleDateString("de-DE")
                      : "–",
                    icon: Clock,
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

              {events.length === 0 && timeline.length === 0 && (
                <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    Noch keine Events
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground mb-6">
                    Nach Ihrer Anfrage oder Buchung werden hier Ihre Events und
                    der aktuelle Status angezeigt.
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
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-lg font-bold text-foreground">
                            {event.title}
                          </h3>
                          <span
                            className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                              event.status === "confirmed"
                                ? "text-accent bg-accent/10"
                                : "text-muted-foreground bg-muted"
                            }`}
                          >
                            {event.status === "confirmed"
                              ? "Bestätigt"
                              : event.status === "completed"
                              ? "Abgeschlossen"
                              : "In Planung"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-muted-foreground">
                          {event.event_date && (
                            <span>
                              📅 {new Date(event.event_date).toLocaleDateString("de-DE")}
                            </span>
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

                <Link to="/kontakt" className="btn-primary justify-center mt-6 w-full group">
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
