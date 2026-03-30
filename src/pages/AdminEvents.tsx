import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  MapPin,
  Plus,
  Search,
  Theater,
  Users,
  ArrowRight,
  Trash2,
  User,
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
  customer_id?: string | null;
  deleted_at?: string | null;
  customer?: { id: string; name: string | null } | null;
}

type ViewFilter = "aktiv" | "abgeschlossen" | "geloescht" | "alle";

const ACTIVE_STATUSES = [
  "in_planung",
  "details_offen",
  "vertrag_gesendet",
  "vertrag_bestaetigt",
  "rechnung_gesendet",
  "rechnung_bezahlt",
  // DB default values
  "planning",
  "confirmed",
];

const DONE_STATUSES = ["event_erfolgt", "storniert", "completed", "cancelled"];

const formatEventStatusLabel = (status?: string | null) => {
  switch (status) {
    case "in_planung": return "In Planung";
    case "details_offen": return "Details offen";
    case "vertrag_gesendet": return "Vertrag gesendet";
    case "vertrag_bestaetigt": return "Vertrag bestätigt";
    case "rechnung_gesendet": return "Rechnung gesendet";
    case "rechnung_bezahlt": return "Rechnung bezahlt";
    case "event_erfolgt": return "Event erfolgt";
    case "storniert": return "Storniert";
    case "planning": return "In Planung";
    case "confirmed": return "Bestätigt";
    case "completed": return "Abgeschlossen";
    case "cancelled": return "Storniert";
    default: return status || "Offen";
  }
};

const formatEventStatusClasses = (status?: string | null) => {
  switch (status) {
    case "in_planung":
    case "planning":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "details_offen":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "vertrag_gesendet":
    case "vertrag_bestaetigt":
      return "text-foreground bg-muted border-border/30";
    case "rechnung_gesendet":
      return "text-purple-600 bg-purple-50 border-purple-200";
    case "rechnung_bezahlt":
    case "confirmed":
      return "text-green-700 bg-green-50 border-green-200";
    case "event_erfolgt":
    case "completed":
      return "text-muted-foreground bg-muted border-border/20";
    case "storniert":
    case "cancelled":
      return "text-destructive bg-destructive/10 border-destructive/20";
    default:
      return "text-muted-foreground bg-muted border-border/20";
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
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    const loadData = async () => {
      setLoading(true);
      const { data: adminEntry } = await supabase
        .from("portal_admins").select("id").eq("email", user.email).maybeSingle();
      if (!adminEntry) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const { data, error } = await supabase
        .from("portal_events")
        .select("*, customer:customer_id(id, name)")
        .order("event_date", { ascending: true });

      if (!error) setEvents(data || []);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();
    return events.filter((event) => {
      const custName = (event.customer as any)?.name || "";
      const matchesSearch =
        !q ||
        event.title?.toLowerCase().includes(q) ||
        event.location?.toLowerCase().includes(q) ||
        event.format?.toLowerCase().includes(q) ||
        custName.toLowerCase().includes(q);

      const isDeleted = !!event.deleted_at;
      const isActive = !event.status || ACTIVE_STATUSES.includes(event.status);
      const isDone = DONE_STATUSES.includes(event.status || "");

      let matchesView = true;
      if (viewFilter === "aktiv") matchesView = !isDeleted && isActive;
      else if (viewFilter === "abgeschlossen") matchesView = !isDeleted && isDone;
      else if (viewFilter === "geloescht") matchesView = isDeleted;

      return matchesSearch && matchesView;
    });
  }, [events, search, viewFilter]);

  const activeCount = events.filter((e) => !e.deleted_at && ACTIVE_STATUSES.includes(e.status || "")).length;
  const doneCount = events.filter((e) => !e.deleted_at && DONE_STATUSES.includes(e.status || "")).length;
  const deletedCount = events.filter((e) => !!e.deleted_at).length;

  const allVisibleSelected = filteredEvents.length > 0 && filteredEvents.every((e) => selectedIds.includes(e.id));

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleSelectAllVisible = () => {
    const ids = filteredEvents.map((e) => e.id);
    if (allVisibleSelected) setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    else setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const deleteSelected = async () => {
    if (!selectedIds.length) return;
    setDeleting(true);
    const deletedAt = new Date().toISOString();
    const { error } = await supabase.from("portal_events").update({ deleted_at: deletedAt }).in("id", selectedIds);
    if (!error) {
      setEvents((prev) => prev.map((e) => selectedIds.includes(e.id) ? { ...e, deleted_at: deletedAt } : e));
      setSelectedIds([]);
    }
    setDeleting(false);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Events"
      subtitle="Alle geplanten und gebuchten Events"
      actions={
        <div className="flex items-center gap-2 flex-wrap">
          {selectMode && selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Löscht…" : `(${selectedIds.length})`}
            </button>
          )}
          <button
            onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); }}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${selectMode ? "border-border/60 bg-muted/40 text-foreground" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
          >
            {selectMode ? "Abbrechen" : "Auswählen"}
          </button>
          <Link
            to="/admin/events/new"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Event erstellen
          </Link>
        </div>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
          <p className="text-xl font-bold text-foreground">{activeCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Aktive Events</p>
        </div>
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
          <p className="text-xl font-bold text-foreground">{doneCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Abgeschlossen</p>
        </div>
        <div className="p-4 rounded-2xl bg-muted/30 border border-border/30">
          <p className="text-xl font-bold text-foreground">{deletedCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Gelöscht</p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-xl p-1 mb-4 w-fit">
        {[
          { key: "aktiv", label: `Aktiv (${activeCount})` },
          { key: "abgeschlossen", label: `Fertig (${doneCount})` },
          { key: "geloescht", label: `Gelöscht (${deletedCount})` },
          { key: "alle", label: "Alle" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setViewFilter(tab.key as ViewFilter); setSelectedIds([]); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              viewFilter === tab.key
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Titel, Ort, Format, Kunde …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-muted/40 border border-border/30 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {selectMode && (
        <div className="flex items-center gap-3 mb-4">
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAllVisible} className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
            Alle sichtbaren auswählen
          </label>
          {selectedIds.length > 0 && <span className="text-sm text-muted-foreground">{selectedIds.length} ausgewählt</span>}
        </div>
      )}

      {/* Event List */}
      <div className="space-y-2">
        {filteredEvents.length === 0 ? (
          <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Keine Events gefunden.</p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const cust = event.customer as any;
            return (
              <div
                key={event.id}
                className="p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(event.id)}
                      onChange={() => toggleSelect(event.id)}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                  )}

                  {/* Date badge */}
                  {event.event_date && (
                    <div className="shrink-0 w-11 text-center">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                        {new Date(event.event_date).toLocaleDateString("de-DE", { month: "short" })}
                      </p>
                      <p className="text-lg font-bold text-foreground leading-none">
                        {new Date(event.event_date).getDate()}
                      </p>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{event.title}</span>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${formatEventStatusClasses(event.status)}`}>
                            {formatEventStatusLabel(event.status)}
                          </span>
                          {event.deleted_at && (
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-destructive bg-destructive/10 border border-destructive/20">
                              Gelöscht
                            </span>
                          )}
                        </div>

                        {/* Customer */}
                        {cust ? (
                          <Link
                            to={`/admin/customers/${cust.id}`}
                            className="inline-flex items-center gap-1 mt-0.5 text-xs text-accent hover:text-accent/80"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <User className="w-3 h-3" />
                            {cust.name || "Kunde"}
                          </Link>
                        ) : null}
                      </div>

                      <Link
                        to={`/admin/events/${event.id}`}
                        className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 shrink-0"
                      >
                        Öffnen <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                      {event.location && (
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                      )}
                      {event.format && (
                        <span className="flex items-center gap-1"><Theater className="w-3 h-3" />{event.format}</span>
                      )}
                      {event.guests && (
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.guests} Gäste</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEvents;
