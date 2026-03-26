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
       case "rechnung_bezahlt":
    case "event_erfolgt":
      return "text-green-700 bg-green-100";
    case "storniert":
      return "text-destructive bg-destructive/10";
    default:
      return "text-muted-foreground bg-muted";
  }
};

// 🚀 TIMELINE LOGIK
const buildTimeline = (request: any, event: any) => {
  const steps = [];

  steps.push({
    label: "Anfrage eingegangen",
    done: !!request,
  });

  steps.push({
    label: "In Bearbeitung",
    done:
      ["in_bearbeitung", "details_besprechen", "angebot_gesendet", "warte_auf_kunde", "gebucht"].includes(
        request?.status
      ) || !!event,
  });

  steps.push({
    label: "Angebot erhalten",
    done:
      ["angebot_gesendet", "warte_auf_kunde", "gebucht"].includes(request?.status) ||
      !!event,
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
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);

      const { data: customer } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

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

      if (requestsData) setRequests(requestsData);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  if (loading) {
    return (
      <PageLayout>
        <section className="min-h-screen pt-28 flex items-center justify-center">
          Wird geladen…
        </section>
      </PageLayout>
    );
  }

  const displayName = customerName || user?.email?.split("@")[0] || "Kunde";

  const currentRequest = requests[0] || null;
  const currentEvent = events.find(
    (e) => e.request_id === currentRequest?.id
  ) || null;

  const timelineSteps = buildTimeline(currentRequest, currentEvent);

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6">

          {/* HEADER */}
          <div className="flex justify-between mb-10">
            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Kundenportal
              </p>
              <h1 className="text-2xl font-bold">
                Willkommen, {displayName}
              </h1>
            </div>

            <button onClick={logout}>
              <LogOut />
            </button>
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-10">
            {["dashboard","events","documents","requests"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as any)}>
                {tab}
              </button>
            ))}
          </div>

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">

              {/* TIMELINE */}
              {timelineSteps.length > 0 && (
                <div className="p-6 rounded-xl border">
                  <h2 className="font-bold mb-4">Nächste Schritte</h2>

                  {timelineSteps.map((step, i) => (
                    <div key={i} className="flex gap-3 mb-2">
                      {step.done ? (
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      ) : (
                        <Circle className="w-5 h-5 opacity-30" />
                      )}
                      <span>{step.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* LETZTE ANFRAGE */}
              {currentRequest && (
                <div className="p-6 border rounded-xl">
                  <h3 className="font-bold">
                    {currentRequest.anlass || "Anfrage"}
                  </h3>
                  <p>
                    Status: {formatStatusLabel(currentRequest.status)}
                  </p>
                </div>
              )}

              {/* EVENT */}
              {currentEvent && (
                <div className="p-6 border rounded-xl">
                  <h3 className="font-bold">{currentEvent.title}</h3>
                  <p>
                    Status: {formatEventStatusLabel(currentEvent.status)}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      </section>
    </PageLayout>
  );
};

export default Kundenportal;
