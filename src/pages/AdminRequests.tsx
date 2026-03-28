import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight,
  Calendar,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Users,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
}

const statusOptions = [
  { value: "alle", label: "Alle" },
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "angebot_gesendet", label: "Angebot gesendet" },
  { value: "warte_auf_kunde", label: "Warte auf Kunde" },
  { value: "bestätigt", label: "Bestätigt" },
  { value: "abgelehnt", label: "Abgelehnt" },
  { value: "archiviert", label: "Archiviert" },
];

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "Neu";
    case "in_bearbeitung":
      return "In Bearbeitung";
    case "angebot_gesendet":
      return "Angebot gesendet";
    case "warte_auf_kunde":
      return "Warte auf Kunde";
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

const AdminRequests = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("alle");

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

    const loadAdminData = async () => {
      setLoading(true);

      const { data: adminEntry, error: adminError } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (adminError) {
        console.error("Admin Check Fehler:", adminError);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      if (!adminEntry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data: requestData, error: requestError } = await supabase
        .from("portal_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (requestError) {
        console.error("Anfragen Fehler:", requestError);
      } else {
        setRequests(requestData || []);
      }

      setLoading(false);
    };

    loadAdminData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      statusFilter === "alle" || request.status === statusFilter;

    const searchValue = search.toLowerCase();
    const matchesSearch =
      request.name?.toLowerCase().includes(searchValue) ||
      request.email?.toLowerCase().includes(searchValue) ||
      request.anlass?.toLowerCase().includes(searchValue) ||
      request.ort?.toLowerCase().includes(searchValue) ||
      request.format?.toLowerCase().includes(searchValue);

    return matchesStatus && matchesSearch;
  });

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
  <AdminLayout
    title="Anfragen"
    subtitle="Alle eingegangenen Buchungsanfragen im Überblick"
  >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">
                Admin / CRM
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Anfragen
              </h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                Alle eingegangenen Buchungsanfragen im Überblick
              </p>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-4 mb-8">
            <div className="relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Suche nach Name, E-Mail, Anlass, Ort, Format …"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl bg-muted/40 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
              <p className="font-display text-2xl font-bold text-foreground">
                {requests.length}
              </p>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                Alle Anfragen
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
              <p className="font-display text-2xl font-bold text-foreground">
                {requests.filter((r) => r.status === "neu").length}
              </p>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                Neue Anfragen
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
              <p className="font-display text-2xl font-bold text-foreground">
                {requests.filter((r) => r.status === "bestätigt").length}
              </p>
              <p className="font-sans text-xs text-muted-foreground mt-1">
                Bestätigt
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  Keine Anfragen gefunden
                </h3>
                <p className="font-sans text-sm text-muted-foreground">
                  Passe Suche oder Filter an.
                </p>
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
                >
                  <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {request.name}
                        </h3>
                        <span
                          className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(
                            request.status
                          )}`}
                        >
                          {formatStatusLabel(request.status)}
                        </span>
                      </div>

                      <p className="font-sans text-sm text-foreground mb-3">
                        {request.anlass || "Anfrage"}
                      </p>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-accent" />
                          {request.email}
                        </span>

                        {request.phone && (
                          <span className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-accent" />
                            {request.phone}
                          </span>
                        )}

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

                      {request.nachricht && (
                        <p className="font-sans text-sm text-muted-foreground mt-4 leading-relaxed line-clamp-2">
                          {request.nachricht}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-start xl:items-end gap-3">
                      <p className="font-sans text-xs text-muted-foreground">
                        Eingegangen am{" "}
                        {new Date(request.created_at).toLocaleDateString("de-DE")}
                      </p>

                      <Link
                        to={`/admin/requests/${request.id}`}
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

export default AdminRequests;
