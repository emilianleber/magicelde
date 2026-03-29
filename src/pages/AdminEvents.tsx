import { useEffect, useMemo, useState } from "react";
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
  Trash2,
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
  details_status?: string | null;
  contract_status?: string | null;
  invoice_status?: string | null;
  deleted_at?: string | null;
}

type ViewFilter = "aktiv" | "abgeschlossen" | "geloescht" | "alle";

const ACTIVE_STATUSES = [
  "in_planung",
  "details_offen",
  "vertrag_gesendet",
  "vertrag_bestaetigt",
  "rechnung_gesendet",
  "rechnung_bezahlt",
];

const DONE_STATUSES = ["event_erfolgt", "storniert"];

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

const AdminEvents = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [search, setSearch] = useState("");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("aktiv");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);

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

      const { data } = await supabase
        .from("portal_events")
        .select("*")
        .order("event_date", { ascending: true });

      setEvents(data || []);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();

    return events.filter((event) => {
      const matchesSearch =
        event.title?.toLowerCase().includes(q) ||
        event.location?.toLowerCase().includes(q) ||
        event.format?.toLowerCase().includes(q);

      const isDeleted = !!event.deleted_at;
      const isActive = ACTIVE_STATUSES.includes(event.status || "");
      const isDone = DONE_STATUSES.includes(event.status || "");

      let matchesView = true;

      if (viewFilter === "aktiv") {
        matchesView = !isDeleted && isActive;
      } else if (viewFilter === "abgeschlossen") {
        matchesView = !isDeleted && isDone;
      } else if (viewFilter === "geloescht") {
        matchesView = isDeleted;
      }

      return matchesSearch && matchesView;
    });
  }, [events, search, viewFilter]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    setDeleting(true);

    await supabase
      .from("portal_events")
      .update({ deleted_at: new Date().toISOString() })
      .in("id", selectedIds);

    setEvents((prev) =>
      prev.map((e) =>
        selectedIds.includes(e.id)
          ? { ...e, deleted_at: new Date().toISOString() }
          : e
      )
    );

    setSelectedIds([]);
    setDeleting(false);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Events"
      subtitle="Alle geplanten und gebuchten Events"
      actions={
        <div className="flex gap-3">
          {selectedIds.length > 0 && (
            <button onClick={deleteSelected} className="btn-danger">
              <Trash2 className="w-4 h-4 mr-2" />
              Löschen ({selectedIds.length})
            </button>
          )}

          <button onClick={logout}>
            <LogOut />
          </button>
        </div>
      }
    >
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["aktiv", "abgeschlossen", "geloescht", "alle"].map((tab) => (
          <button
            key={tab}
            onClick={() => setViewFilter(tab as ViewFilter)}
            className={`px-4 py-2 rounded-xl ${
              viewFilter === tab ? "bg-white text-black" : "bg-muted"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Suche */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Suche…"
        className="mb-6 w-full p-3 rounded-xl"
      />

      {/* Liste */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="p-5 border rounded-xl">
            <div className="flex justify-between">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(event.id)}
                  onChange={() => toggleSelect(event.id)}
                />

                <div>
                  <h3>{event.title}</h3>
                  <p>{formatEventStatusLabel(event.status)}</p>
                </div>
              </div>

              <Link to={`/admin/events/${event.id}`}>
                <ArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;