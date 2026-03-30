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
  AlertTriangle,
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
  customer_id?: string | null;
  deleted_at?: string | null;
}

interface CustomerMini {
  id: string;
  name: string | null;
}

type ViewFilter = "aktiv" | "abgeschlossen" | "geloescht" | "alle";

const ACTIVE_STATUSES = [
  "in_planung", "details_offen", "vertrag_gesendet", "vertrag_bestaetigt",
  "rechnung_gesendet", "rechnung_bezahlt", "planning", "confirmed",
];
const DONE_STATUSES = ["event_erfolgt", "storniert", "completed", "cancelled"];

const formatEventStatusLabel = (status?: string | null) => {
  switch (status) {
    case "in_planung": case "planning": return "In Planung";
    case "details_offen": return "Details offen";
    case "vertrag_gesendet": return "Vertrag gesendet";
    case "vertrag_bestaetigt": return "Vertrag bestätigt";
    case "rechnung_gesendet": return "Rechnung gesendet";
    case "rechnung_bezahlt": case "confirmed": return "Bestätigt";
    case "event_erfolgt": case "completed": return "Abgeschlossen";
    case "storniert": case "cancelled": return "Storniert";
    default: return status || "Offen";
  }
};

const formatEventStatusClasses = (status?: string | null) => {
  switch (status) {
    case "in_planung": case "planning": return "text-blue-600 bg-blue-50 border-blue-200";
    case "details_offen": return "text-orange-600 bg-orange-50 border-orange-200";
    case "vertrag_gesendet": case "vertrag_bestaetigt": return "text-foreground bg-muted border-border/30";
    case "rechnung_gesendet": return "text-purple-600 bg-purple-50 border-purple-200";
    case "rechnung_bezahlt": case "confirmed": return "text-green-700 bg-green-50 border-green-200";
    case "event_erfolgt": case "completed": return "text-muted-foreground bg-muted border-border/20";
    case "storniert": case "cancelled": return "text-destructive bg-destructive/10 border-destructive/20";
    default: return "text-muted-foreground bg-muted border-border/20";
  }
};

const AdminEvents = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [customerMap, setCustomerMap] = useState<Record<string, CustomerMini>>({});
  const [search, setSearch] = useState("");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("aktiv");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [hardDeleting, setHardDeleting] = useState(false);
  const [confirmHardDelete, setConfirmHardDelete] = useState(false);
  const [hardDeleteError, setHardDeleteError] = useState<string | null>(null);
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
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

      const [evtRes, custRes] = await Promise.all([
        supabase.from("portal_events").select("*").order("event_date", { ascending: true }),
        supabase.from("portal_customers").select("id, name"),
      ]);

      if (!evtRes.error) setEvents(evtRes.data || []);

      const cMap: Record<string, CustomerMini> = {};
      (custRes.data || []).forEach((c) => { cMap[c.id] = c; });
      setCustomerMap(cMap);

      setLoading(false);
    };
    loadData();
  }, [user]);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();
    return events.filter((evt) => {
      const cust = evt.customer_id ? customerMap[evt.customer_id] : null;
      const matchesSearch =
        !q ||
        evt.title?.toLowerCase().includes(q) ||
        evt.location?.toLowerCase().includes(q) ||
        evt.format?.toLowerCase().includes(q) ||
        cust?.name?.toLowerCase().includes(q);

      const isDeleted = !!evt.deleted_at;
      const isActive = !evt.status || ACTIVE_STATUSES.includes(evt.status);
      const isDone = DONE_STATUSES.includes(evt.status || "");

      let matchesView = true;
      if (viewFilter === "aktiv") matchesView = !isDeleted && isActive;
      else if (viewFilter === "abgeschlossen") matchesView = !isDeleted && isDone;
      else if (viewFilter === "geloescht") matchesView = isDeleted;

      return matchesSearch && matchesView;
    });
  }, [events, search, viewFilter, customerMap]);

  const hardDeleteSelected = async () => {
    if (!selectedIds.length) return;
    setHardDeleting(true);
    setHardDeleteError(null);
    const { error } = await supabase.from("portal_events").delete().in("id", selectedIds);
    if (error) {
      setHardDeleteError(error.message || "Fehler beim Löschen.");
    } else {
      setEvents((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
      setSelectedIds([]);
      setConfirmHardDelete(false);
    }
    setHardDeleting(false);
  };

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
      subtitle={`${activeCount} aktive Events`}
      actions={
        <div className="flex items-center gap-2">
          {selectMode && selectedIds.length > 0 && viewFilter === "geloescht" && (
            <button
              onClick={() => setConfirmHardDelete(true)}
              disabled={hardDeleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              <AlertTriangle className="w-4 h-4" />
              Endgültig ({selectedIds.length})
            </button>
          )}
          {selectMode && selectedIds.length > 0 && viewFilter !== "geloescht" && (
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "…" : `(${selectedIds.length})`}
            </button>
          )}
          <button
            onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); setConfirmHardDelete(false); }}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${selectMode ? "border-border/60 bg-muted/40 text-foreground" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
          >
            {selectMode ? "Abbrechen" : "Auswählen"}
          </button>
          <Link
            to="/admin/events/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Neues Event
          </Link>
        </div>
      }
    >
      {/* Hard delete confirmation */}
      {confirmHardDelete && (
        <div className="mb-5 p-4 rounded-2xl bg-destructive/5 border border-destructive/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-destructive">Endgültig löschen?</p>
              <p className="text-xs text-muted-foreground mt-1">{selectedIds.length} Event(s) werden permanent gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.</p>
              {hardDeleteError && <p className="text-xs text-destructive font-medium mt-2">{hardDeleteError}</p>}
              <div className="flex items-center gap-2 mt-3">
                <button onClick={hardDeleteSelected} disabled={hardDeleting} className="inline-flex items-center gap-1.5 rounded-xl bg-destructive text-white px-4 py-2 text-sm font-semibold hover:opacity-80 disabled:opacity-50">
                  {hardDeleting ? "Lösche…" : "Ja, endgültig löschen"}
                </button>
                <button onClick={() => { setConfirmHardDelete(false); setHardDeleteError(null); }} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-4 py-2 text-sm text-foreground hover:bg-muted/40">
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-xl font-bold text-foreground">{activeCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Aktiv</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
          <p className="text-xl font-bold text-foreground">{doneCount}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Abgeschlossen</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
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
        <div className="flex items-center gap-3 mb-3">
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAllVisible} className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
            Alle auswählen
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
          filteredEvents.map((evt) => {
            const cust = evt.customer_id ? customerMap[evt.customer_id] : null;
            return (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(evt.id)}
                      onChange={() => toggleSelect(evt.id)}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                  )}

                  {/* Date badge */}
                  {evt.event_date && (
                    <div className="shrink-0 w-10 text-center">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                        {new Date(evt.event_date).toLocaleDateString("de-DE", { month: "short" })}
                      </p>
                      <p className="text-lg font-bold text-foreground leading-none">{new Date(evt.event_date).getDate()}</p>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{evt.title}</span>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${formatEventStatusClasses(evt.status)}`}>
                            {formatEventStatusLabel(evt.status)}
                          </span>
                          {evt.deleted_at && (
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-destructive bg-destructive/10 border border-destructive/20">
                              Gelöscht
                            </span>
                          )}
                        </div>
                        {cust ? (
                          <Link
                            to={`/admin/customers/${cust.id}`}
                            className="inline-flex items-center gap-1 mt-0.5 text-xs text-accent hover:text-accent/80"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <User className="w-3 h-3" />{cust.name || "Kunde"}
                          </Link>
                        ) : null}
                      </div>
                      <Link
                        to={`/admin/events/${evt.id}`}
                        className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 shrink-0"
                      >
                        Öffnen <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                      {evt.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.location}</span>}
                      {evt.format && <span className="flex items-center gap-1"><Theater className="w-3 h-3" />{evt.format}</span>}
                      {evt.guests && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{evt.guests} Gäste</span>}
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
