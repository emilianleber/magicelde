import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  FileText,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Theater,
  Users,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalCustomer {
  id: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
  created_at?: string | null;
}

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  email: string;
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
}

interface PortalDocument {
  id: string;
  name: string;
  type: string | null;
  file_url: string | null;
  created_at: string;
}

const AdminCustomerDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState<PortalCustomer | null>(null);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [documents, setDocuments] = useState<PortalDocument[]>([]);

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

      const { data: customerData, error: customerError } = await supabase
        .from("portal_customers")
        .select("*")
        .eq("id", id)
        .single();

      if (customerError || !customerData) {
        console.error("Fehler beim Laden des Kunden:", customerError);
        setLoading(false);
        return;
      }

      setCustomer(customerData);

      const [requestsResult, eventsResult, docsResult] = await Promise.all([
        supabase
          .from("portal_requests")
          .select("*")
          .eq("email", customerData.email)
          .order("created_at", { ascending: false }),
        supabase
          .from("portal_events")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("event_date", { ascending: true }),
        supabase
          .from("portal_documents")
          .select("*")
          .eq("customer_id", customerData.id)
          .order("created_at", { ascending: false }),
      ]);

      if (!requestsResult.error) setRequests(requestsResult.data || []);
      else console.error(requestsResult.error);

      if (!eventsResult.error) setEvents(eventsResult.data || []);
      else console.error(eventsResult.error);

      if (!docsResult.error) setDocuments(docsResult.data || []);
      else console.error(docsResult.error);

      setLoading(false);
    };

    loadData();
  }, [user, id, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  if (!customer) {
    return <div className="pt-28 text-center">Kunde nicht gefunden</div>;
  }

  return (
    <AdminLayout
      title={customer.name || "Kunde"}
      subtitle="Alle zugehörigen Daten dieses Kunden im Überblick"
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
          to="/admin/customers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Kundenübersicht
        </Link>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Kundendaten
          </h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Name
              </p>
              <p className="font-sans text-sm text-foreground">
                {customer.name || "Nicht angegeben"}
              </p>
            </div>

            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                E-Mail
              </p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <p className="font-sans text-sm text-foreground">
                  {customer.email || "Nicht angegeben"}
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
                  {customer.phone || "Nicht angegeben"}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-background/60 border border-border/20 p-4">
              <p className="font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Kundennummer
              </p>
              <p className="font-sans text-sm text-foreground">
                {customer.kundennummer || "Nicht vergeben"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
            <p className="font-display text-2xl font-bold text-foreground">
              {requests.length}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Anfragen
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
            <p className="font-display text-2xl font-bold text-foreground">
              {events.length}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Events
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
            <p className="font-display text-2xl font-bold text-foreground">
              {documents.length}
            </p>
            <p className="font-sans text-xs text-muted-foreground mt-1">
              Dokumente
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Anfragen
          </h2>

          <div className="space-y-3">
            {requests.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                Keine Anfragen vorhanden.
              </p>
            ) : (
              requests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 rounded-xl bg-background/60 border border-border/20"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {request.anlass || "Anfrage"}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground mt-1">
                        {new Date(request.created_at).toLocaleDateString("de-DE")}
                      </p>
                    </div>

                    <Link
                      to={`/admin/requests/${request.id}`}
                      className="text-sm text-accent hover:text-accent/80"
                    >
                      Öffnen
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground mt-3">
                    {request.datum && (
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        {new Date(request.datum).toLocaleDateString("de-DE")}
                      </span>
                    )}
                    {request.ort && (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        {request.ort}
                      </span>
                    )}
                    {request.gaeste && (
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        {request.gaeste} Gäste
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Events
          </h2>

          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                Keine Events vorhanden.
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-xl bg-background/60 border border-border/20"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {event.title}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground mt-1">
                        {event.status || "Offen"}
                      </p>
                    </div>

                    <Link
                      to={`/admin/events/${event.id}`}
                      className="text-sm text-accent hover:text-accent/80"
                    >
                      Öffnen
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground mt-3">
                    {event.event_date && (
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        {new Date(event.event_date).toLocaleDateString("de-DE")}
                      </span>
                    )}
                    {event.location && (
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        {event.location}
                      </span>
                    )}
                    {event.format && (
                      <span className="flex items-center gap-2">
                        <Theater className="w-4 h-4 text-accent" />
                        {event.format}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Dokumente
          </h2>

          <div className="space-y-3">
            {documents.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground">
                Keine Dokumente vorhanden.
              </p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl bg-background/60 border border-border/20"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerDetail;
