import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  CheckSquare,
  Users,
  ArrowRight,
  LogOut,
  Clock3,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  email: string;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
}

interface PortalEvent {
  id: string;
  title: string;
  event_date: string | null;
  location: string | null;
  status: string | null;
}

interface PortalTodo {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  due_date: string | null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [todos, setTodos] = useState<PortalTodo[]>([]);
  const [customerCount, setCustomerCount] = useState(0);

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

      const [
        requestsResult,
        eventsResult,
        todosResult,
        customersResult,
      ] = await Promise.all([
        supabase
          .from("portal_requests")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("portal_events")
          .select("*")
          .order("event_date", { ascending: true }),
        supabase
          .from("portal_todos")
          .select("*")
          .order("due_date", { ascending: true }),
        supabase.from("portal_customers").select("*", { count: "exact", head: true }),
      ]);

      if (!requestsResult.error) setRequests(requestsResult.data || []);
      else console.error("Requests Fehler:", requestsResult.error);

      if (!eventsResult.error) setEvents(eventsResult.data || []);
      else console.error("Events Fehler:", eventsResult.error);

      if (!todosResult.error) setTodos(todosResult.data || []);
      else console.error("Todos Fehler:", todosResult.error);

      if (!customersResult.error) setCustomerCount(customersResult.count || 0);
      else console.error("Customers Fehler:", customersResult.error);

      setLoading(false);
    };

    loadData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const openTodos = todos.filter((todo) => todo.status !== "erledigt");
  const newRequests = requests.filter((request) => request.status === "neu");
  const upcomingEvents = events.filter((event) => !!event.event_date).slice(0, 5);

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

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Admin / CRM
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Dashboard
              </h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                Überblick über Anfragen, Events, Kunden und offene Aufgaben
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
            {[
              {
                label: "Alle Anfragen",
                value: requests.length,
                icon: MessageCircle,
                href: "/admin/requests",
              },
              {
                label: "Neue Anfragen",
                value: newRequests.length,
                icon: Clock3,
                href: "/admin/requests",
              },
              {
                label: "Events",
                value: events.length,
                icon: Calendar,
                href: "/admin/events",
              },
              {
                label: "Kunden",
                value: customerCount,
                icon: Users,
                href: "/admin/customers",
              },
            ].map((card) => (
              <Link
                key={card.label}
                to={card.href}
                className="p-6 rounded-2xl bg-muted/30 border border-border/30 hover:border-accent/20 transition-colors"
              >
                <card.icon className="w-6 h-6 text-accent mb-3" />
                <p className="font-display text-2xl font-bold text-foreground">
                  {card.value}
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-1">
                  {card.label}
                </p>
              </Link>
            ))}
          </div>

          <div className="grid xl:grid-cols-[1.2fr_1fr] gap-6">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Neue Anfragen
                  </h2>
                  <Link
                    to="/admin/requests"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    Alle ansehen <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {requests.slice(0, 5).map((request) => (
                    <Link
                      key={request.id}
                      to={`/admin/requests/${request.id}`}
                      className="block p-4 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-sans text-sm font-semibold text-foreground">
                            {request.name}
                          </p>
                          <p className="font-sans text-xs text-muted-foreground mt-1">
                            {request.anlass || "Anfrage"} ·{" "}
                            {new Date(request.created_at).toLocaleDateString("de-DE")}
                          </p>
                          {request.ort && (
                            <p className="font-sans text-xs text-muted-foreground mt-1">
                              {request.ort}
                            </p>
                          )}
                        </div>
                        <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-muted-foreground bg-muted">
                          {request.status || "offen"}
                        </span>
                      </div>
                    </Link>
                  ))}

                  {requests.length === 0 && (
                    <p className="font-sans text-sm text-muted-foreground">
                      Noch keine Anfragen vorhanden.
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Nächste Events
                  </h2>
                  <Link
                    to="/admin/events"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    Zu Events <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-xl bg-background/60 border border-border/20"
                    >
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {event.title}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground mt-1">
                        {event.event_date
                          ? new Date(event.event_date).toLocaleDateString("de-DE")
                          : "Kein Datum"}{" "}
                        {event.location ? `· ${event.location}` : ""}
                      </p>
                    </div>
                  ))}

                  {upcomingEvents.length === 0 && (
                    <p className="font-sans text-sm text-muted-foreground">
                      Noch keine Events vorhanden.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    Offene Todos
                  </h2>
                  <Link
                    to="/admin/todos"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80"
                  >
                    Zu Todos <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-3">
                  {openTodos.slice(0, 6).map((todo) => (
                    <div
                      key={todo.id}
                      className="p-4 rounded-xl bg-background/60 border border-border/20"
                    >
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {todo.title}
                      </p>
                      {todo.description && (
                        <p className="font-sans text-xs text-muted-foreground mt-1">
                          {todo.description}
                        </p>
                      )}
                      {todo.due_date && (
                        <p className="font-sans text-xs text-muted-foreground mt-2">
                          Fällig: {new Date(todo.due_date).toLocaleDateString("de-DE")}
                        </p>
                      )}
                    </div>
                  ))}

                  {openTodos.length === 0 && (
                    <p className="font-sans text-sm text-muted-foreground">
                      Keine offenen Todos.
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-5">
                  Schnellzugriffe
                </h2>

                <div className="grid gap-3">
                  <Link
                    to="/admin/requests"
                    className="p-4 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3 text-sm text-foreground">
                      <MessageCircle className="w-4 h-4 text-accent" />
                      Anfragen verwalten
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>

                  <Link
                    to="/admin/events"
                    className="p-4 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-accent" />
                      Events ansehen
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>

                  <Link
                    to="/admin/customers"
                    className="p-4 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3 text-sm text-foreground">
                      <Users className="w-4 h-4 text-accent" />
                      Kunden ansehen
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>

                  <Link
                    to="/admin/todos"
                    className="p-4 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3 text-sm text-foreground">
                      <CheckSquare className="w-4 h-4 text-accent" />
                      Todos
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AdminDashboard;
