import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  LogOut,
  MapPin,
  Search,
  Theater,
  Users,
  ArrowRight,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
  format: string | null;
  guests: number | null;
  created_at?: string;
  request_id?: string | null;
  customer_id?: string | null;
  details_status?: string | null;
  contract_status?: string | null;
  invoice_status?: string | null;
}

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

const AdminEvents = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [search, setSearch] = useState("");

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

    const loadData = async () => {
      setLoading(true);

      const { data: adminEntry, error: adminError } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (adminError || !adminEntry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data, error } = await supabase
        .from("portal_events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Fehler beim Laden der Events:", error);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const filteredEvents = events.filter((event) => {
    const q = search.toLowerCase();
    return (
      event.title?.toLowerCase().includes(q) ||
      event.location?.toLowerCase().includes(q) ||
      event.format?.toLowerCase().includes(q) ||
      event.status?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  return (
    <AdminLayout
      title="Events"
      subtitle="Alle geplanten und gebuchten Events"
      actions={
        <button
          onClick={logout}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="relative mb-8">
        <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Suche nach Titel, Ort, Format oder Status …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {events.length}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Alle Events
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {events.filter((e) => e.status === "in_planung").length}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            In Planung
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {events.filter((e) => e.status === "rechnung_bezahlt").length}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Bezahlt
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Keine Events gefunden
            </h3>
            <p className="font-sans text-sm text-muted-foreground">
              Passe deine Suche an oder konvertiere eine Anfrage zu einem Event.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
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

                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
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

                    {event.guests && (
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        {event.guests} Gäste
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.details_status && (
                      <span className="text-xs px-2 py-1 rounded-full bg-background/60 border border-border/20 text-muted-foreground">
                        Details: {event.details_status}
                      </span>
                    )}
                    {event.contract_status && (
                      <span className="text-xs px-2 py-1 rounded-full bg-background/60 border border-border/20 text-muted-foreground">
                        Vertrag: {event.contract_status}
                      </span>
                    )}
                    {event.invoice_status && (
                      <span className="text-xs px-2 py-1 rounded-full bg-background/60 border border-border/20 text-muted-foreground">
                        Rechnung: {event.invoice_status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start xl:items-end gap-3">
                  <Link
                    to={`/admin/events/${event.id}`}
                    className="btn-primary inline-flex group"
                  >
                    Details öffnen
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;