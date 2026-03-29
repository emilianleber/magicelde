import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  LogOut,
  MapPin,
  Plus,
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
  request_id?: string | null;
  customer_id?: string | null;
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
  }, [user, navigate]);

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
        event.format?.toLowerCase().includes(q) ||
        event.status?.toLowerCase().includes(q);

      const isDeleted = !!event.deleted_at;
      const isActive =
        !event.status || ACTIVE_STATUSES.includes(event.status || "");
      const isDone = DONE_STATUSES.includes(event.status || "");

      let matchesView = true;

      if (viewFilter === "aktiv") {
        matchesView = !isDeleted && isActive;
      } else if (viewFilter === "abgeschlossen") {
        matchesView = !isDeleted && isDone;
      } else if (viewFilter === "geloescht") {
        matchesView = isDeleted;
      } else if (viewFilter === "alle") {
        matchesView = true;
      }

      return matchesSearch && matchesView;
    });
  }, [events, search, viewFilter]);

  const activeCount = events.filter((event) => {
    const isDeleted = !!event.deleted_at;
    const isActive = !event.status || ACTIVE_STATUSES.includes(event.status || "");
    return !isDeleted && isActive;
  }).length;

  const doneCount = events.filter((event) => {
    const isDeleted = !!event.deleted_at;
    const isDone = DONE_STATUSES.includes(event.status || "");
    return !isDeleted && isDone;
  }).length;

  const deletedCount = events.filter((event) => !!event.deleted_at).length;

  const allVisibleSelected =
    filteredEvents.length > 0 &&
    filteredEvents.every((event) => selectedIds.includes(event.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]
    );
  };

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      const visibleIds = filteredEvents.map((e) => e.id);
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }

    const visibleIds = filteredEvents.map((e) => e.id);
    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;

    setDeleting(true);

    const deletedAt = new Date().toISOString();

    const { error } = await supabase
      .from("portal_events")
      .update({ deleted_at: deletedAt })
      .in("id", selectedIds);

    if (error) {
      console.error("Fehler beim Löschen der Events:", error);
      setDeleting(false);
      return;
    }

    setEvents((prev) =>
      prev.map((event) =>
        selectedIds.includes(event.id)
          ? { ...event, deleted_at: deletedAt }
          : event
      )
    );

    setSelectedIds([]);
    setDeleting(false);
  };

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
        <div className="flex items-center gap-3 flex-wrap">
          {selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting
                ? "Löscht…"
                : `Ausgewählte löschen (${selectedIds.length})`}
            </button>
          )}

          <Link
            to="/admin/events/new"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Event erstellen
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      }
    >
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: "aktiv", label: `Aktiv (${activeCount})` },
          { key: "abgeschlossen", label: `Abgeschlossen (${doneCount})` },
          { key: "geloescht", label: `Gelöscht (${deletedCount})` },
          { key: "alle", label: "Alle" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setViewFilter(tab.key as ViewFilter);
              setSelectedIds([]);
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              viewFilter === tab.key
                ? "bg-background border border-border/30 text-foreground shadow-sm"
                : "bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Suche nach Titel, Ort, Format oder Status …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <label className="inline-flex items-center gap-3 rounded-xl bg-muted/30 border border-border/30 px-4 py-3">
          <input
            type="checkbox"
            checked={allVisibleSelected}
            onChange={toggleSelectAllVisible}
            className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
          />
          <span className="font-sans text-sm text-foreground">
            Alle sichtbaren auswählen
          </span>
        </label>

        {selectedIds.length > 0 && (
          <span className="font-sans text-sm text-muted-foreground">
            {selectedIds.length} ausgewählt
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {activeCount}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Aktive Events
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {doneCount}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Abgeschlossen
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {deletedCount}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Gelöscht
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
              Passe deine Suche oder den Filter an.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div className="flex items-start gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(event.id)}
                    onChange={() => toggleSelect(event.id)}
                    className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                  />

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

                      {event.deleted_at && (
                        <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-destructive bg-destructive/10">
                          Gelöscht
                        </span>
                      )}
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