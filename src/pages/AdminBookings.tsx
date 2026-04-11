import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  Mail,
  Calendar,
  MapPin,
  Users,
  Plus,
  Trash2,
  User,
  AlertTriangle,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

/* ── Types ──────────────────────────────────────────────────────────────────── */

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  firma?: string | null;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  event_id?: string | null;
  deleted_at?: string | null;
  customer_id?: string | null;
}

interface PortalEvent {
  id: string;
  created_at: string;
  event_date: string | null;
  title: string | null;
  location: string | null;
  format: string | null;
  guests: number | null;
  status: string | null;
  customer_id: string | null;
  deleted_at?: string | null;
}

interface CustomerMini {
  id: string;
  name: string | null;
  company: string | null;
}

/* ── Pipeline stages ────────────────────────────────────────────────────────── */

type PipelineStage = "neu" | "in_bearbeitung" | "angebot" | "gebucht" | "durchgefuehrt" | "abgeschlossen" | "abgelehnt" | "storniert" | "alle";

const PIPELINE_TABS: { key: PipelineStage; label: string }[] = [
  { key: "alle", label: "Aktive" },
  { key: "neu", label: "Neu" },
  { key: "in_bearbeitung", label: "In Bearbeitung" },
  { key: "angebot", label: "Angebot" },
  { key: "gebucht", label: "Gebucht" },
  { key: "durchgefuehrt", label: "Durchgeführt" },
  { key: "abgeschlossen", label: "Abgeschlossen" },
  { key: "abgelehnt", label: "Abgelehnt" },
  { key: "storniert", label: "Storniert" },
];

/** Map raw request status to pipeline stage */
const requestToPipeline = (status: string | null, eventId: string | null, eventStatus: string | null): PipelineStage => {
  // Event-Status hat Vorrang wenn Event existiert
  if (eventId && eventStatus) {
    return eventToPipeline(eventStatus);
  }
  if (eventId) return "gebucht";
  switch (status) {
    case "neu": return "neu";
    case "in_bearbeitung":
    case "details_besprechen": return "in_bearbeitung";
    case "angebot_gesendet":
    case "warte_auf_kunde": return "angebot";
    case "bestätigt": return "gebucht";
    case "abgelehnt": return "abgelehnt";
    case "storniert": return "storniert";
    case "archiviert": return "abgeschlossen";
    default: return "neu";
  }
};

/** Map raw event status to pipeline stage */
const eventToPipeline = (status: string | null): PipelineStage => {
  switch (status) {
    case "in_planung":
    case "details_offen": return "gebucht";
    case "vertrag_gesendet":
    case "vertrag_bestaetigt": return "gebucht";
    case "rechnung_gesendet":
    case "rechnung_bezahlt": return "gebucht";
    case "event_erfolgt": return "durchgefuehrt";
    case "abgeschlossen": return "abgeschlossen";
    case "storniert": return "storniert";
    default: return "gebucht";
  }
};

/* ── Unified row ────────────────────────────────────────────────────────────── */

interface BookingRow {
  id: string;
  type: "request" | "event";
  requestId?: string;
  eventId?: string;
  title: string;
  customerName: string | null;
  customerId: string | null;
  date: string | null;
  location: string | null;
  guests: number | null;
  format: string | null;
  email: string | null;
  pipeline: PipelineStage;
  rawStatus: string | null;
  createdAt: string;
  deletedAt: string | null;
}

/* ── Helpers ─────────────────────────────────────────────────────────────────── */

const capWords = (s?: string | null) =>
  s ? s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/_/g, " ") : "";

const pipelineLabel = (stage: PipelineStage): string => {
  switch (stage) {
    case "neu": return "Neu";
    case "in_bearbeitung": return "In Bearbeitung";
    case "angebot": return "Angebot";
    case "gebucht": return "Gebucht";
    case "durchgefuehrt": return "Durchgeführt";
    case "abgeschlossen": return "Abgeschlossen";
    case "abgelehnt": return "Abgelehnt";
    default: return "Alle";
  }
};

const pipelineClasses = (stage: PipelineStage): string => {
  switch (stage) {
    case "neu": return "text-blue-600 bg-blue-50 border-blue-200";
    case "in_bearbeitung": return "text-amber-700 bg-amber-50 border-amber-200";
    case "angebot": return "text-purple-700 bg-purple-50 border-purple-200";
    case "gebucht": return "text-green-700 bg-green-50 border-green-200";
    case "durchgefuehrt": return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "abgeschlossen": return "text-muted-foreground bg-muted border-border/20";
    case "abgelehnt": return "text-destructive bg-destructive/10 border-destructive/20";
    default: return "text-muted-foreground bg-muted border-border/20";
  }
};

/* ── Component ──────────────────────────────────────────────────────────────── */

const AdminBookings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [customerMap, setCustomerMap] = useState<Record<string, CustomerMini>>({});
  const [search, setSearch] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState<PipelineStage>("alle");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* ── Auth ── */
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

  /* ── Data ── */
  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoading(true);
      const { data: adminEntry } = await supabase
        .from("portal_admins").select("id").eq("email", user.email).maybeSingle();
      if (!adminEntry) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const [reqRes, evtRes, custRes] = await Promise.all([
        supabase.from("portal_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("portal_events").select("*").order("event_date", { ascending: true }),
        supabase.from("portal_customers").select("id, name, company"),
      ]);

      if (!reqRes.error) setRequests(reqRes.data || []);
      if (!evtRes.error) setEvents(evtRes.data || []);

      const cMap: Record<string, CustomerMini> = {};
      (custRes.data || []).forEach((c) => { cMap[c.id] = c; });
      setCustomerMap(cMap);
      setLoading(false);
    };
    load();
  }, [user]);

  /* ── Build unified rows ── */
  const rows: BookingRow[] = useMemo(() => {
    const requestEventIds = new Set(requests.filter((r) => r.event_id).map((r) => r.event_id));
    const result: BookingRow[] = [];

    // Build event status map
    const eventStatusMap: Record<string, string> = {};
    for (const ev of events) { eventStatusMap[ev.id] = ev.status || ""; }

    // Add all requests
    for (const req of requests) {
      const cust = req.customer_id ? customerMap[req.customer_id] : null;
      const evStatus = req.event_id ? (eventStatusMap[req.event_id] || null) : null;
      result.push({
        id: `req-${req.id}`,
        type: "request",
        requestId: req.id,
        eventId: req.event_id || undefined,
        title: capWords(req.anlass) || "Anfrage",
        customerName: cust ? (capWords(cust.name) || cust.company) : (capWords(req.name) || req.firma || null),
        customerId: req.customer_id || null,
        date: req.datum,
        location: req.ort,
        guests: req.gaeste,
        format: req.format,
        email: req.email,
        pipeline: requestToPipeline(req.status, req.event_id || null, evStatus),
        rawStatus: req.status,
        createdAt: req.created_at,
        deletedAt: req.deleted_at || null,
      });
    }

    // Add events that are NOT linked to a request (manual events)
    for (const evt of events) {
      if (requestEventIds.has(evt.id)) continue; // already represented via request
      const cust = evt.customer_id ? customerMap[evt.customer_id] : null;
      result.push({
        id: `evt-${evt.id}`,
        type: "event",
        eventId: evt.id,
        title: evt.title || "Event",
        customerName: cust ? (capWords(cust.name) || cust.company) : null,
        customerId: evt.customer_id,
        date: evt.event_date,
        location: evt.location,
        guests: evt.guests,
        format: evt.format,
        email: null,
        pipeline: eventToPipeline(evt.status),
        rawStatus: evt.status,
        createdAt: evt.created_at,
        deletedAt: evt.deleted_at || null,
      });
    }

    // Sort: by date (nearest first), then by created_at
    result.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : Infinity;
      const db = b.date ? new Date(b.date).getTime() : Infinity;
      if (da !== db) return da - db;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [requests, events, customerMap]);

  /* ── Filter ── */
  const filtered = useMemo(() => {
    return rows.filter((row) => {
      if (row.deletedAt) return false;
      // "Aktive" Tab: Abgeschlossen, Abgelehnt, Storniert ausblenden
      if (pipelineFilter === "alle" && ["abgeschlossen", "abgelehnt", "storniert"].includes(row.pipeline)) return false;
      if (pipelineFilter !== "alle" && row.pipeline !== pipelineFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const match =
          row.title.toLowerCase().includes(q) ||
          row.customerName?.toLowerCase().includes(q) ||
          row.location?.toLowerCase().includes(q) ||
          row.email?.toLowerCase().includes(q) ||
          row.format?.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [rows, pipelineFilter, search]);

  /* ── Pipeline counts ── */
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const row of rows) {
      if (row.deletedAt) continue;
      c[row.pipeline] = (c[row.pipeline] || 0) + 1;
    }
    c.alle = rows.filter((r) => !r.deletedAt).length;
    return c;
  }, [rows]);

  /* ── Actions ── */
  const deleteSelected = async () => {
    if (!selectedIds.length) return;
    if (!confirm(`${selectedIds.length} Eintrag/Einträge endgültig löschen? Dies kann nicht rückgängig gemacht werden.`)) return;
    setDeleting(true);
    const reqIds = selectedIds.filter((id) => id.startsWith("req-")).map((id) => id.slice(4));
    const evtIds = selectedIds.filter((id) => id.startsWith("evt-")).map((id) => id.slice(4));

    await Promise.all([
      reqIds.length ? supabase.from("portal_requests").delete().in("id", reqIds) : Promise.resolve(),
      evtIds.length ? supabase.from("portal_events").delete().in("id", evtIds) : Promise.resolve(),
    ]);

    setRequests((prev) => prev.filter((r) => !reqIds.includes(r.id)));
    setEvents((prev) => prev.filter((e) => !evtIds.includes(e.id)));
    setSelectedIds([]);
    setDeleting(false);
  };

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  /* ── Render ── */
  if (loading) return <div className="pt-28 text-center">Wird geladen...</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Anfragen & Buchungen"
      subtitle={`${counts.alle || 0} gesamt`}
      actions={
        <div className="flex items-center gap-2">
          {selectMode && selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "..." : `(${selectedIds.length})`}
            </button>
          )}
          <button
            onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); }}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${selectMode ? "border-border/60 bg-muted/40 text-foreground" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
          >
            {selectMode ? "Abbrechen" : "Auswählen"}
          </button>
          <Link
            to="/admin/bookings/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Neue Anfrage
          </Link>
        </div>
      }
    >
      {/* Pipeline Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-xl p-1 mb-4 overflow-x-auto">
        {PIPELINE_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setPipelineFilter(tab.key); setSelectedIds([]); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              pipelineFilter === tab.key
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}{counts[tab.key] ? ` (${counts[tab.key]})` : ""}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Name, Anlass, Ort, Kunde ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-muted/40 border border-border/30 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      {/* Select all */}
      {selectMode && (
        <div className="flex items-center gap-3 mb-3">
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={filtered.length > 0 && filtered.every((r) => selectedIds.includes(r.id))}
              onChange={() => {
                const ids = filtered.map((r) => r.id);
                if (filtered.every((r) => selectedIds.includes(r.id))) {
                  setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
                } else {
                  setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
                }
              }}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            Alle auswählen
          </label>
          {selectedIds.length > 0 && <span className="text-sm text-muted-foreground">{selectedIds.length} ausgewählt</span>}
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <p className="text-sm text-muted-foreground">Keine Anfragen oder Buchungen gefunden.</p>
          </div>
        ) : (
          filtered.map((row) => {
            const detailUrl = `/admin/bookings/${row.requestId}`;

            return (
              <div
                key={row.id}
                onClick={() => !selectMode && navigate(detailUrl)}
                className={`p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors ${!selectMode ? "cursor-pointer" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelect(row.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{row.title}</span>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${pipelineClasses(row.pipeline)}`}>
                            {pipelineLabel(row.pipeline)}
                          </span>
                          {row.type === "event" && (
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-cyan-700 bg-cyan-50 border border-cyan-200">
                              Manuell
                            </span>
                          )}
                        </div>
                        {row.customerId ? (
                          <Link
                            to={`/admin/customers/${row.customerId}`}
                            className="inline-flex items-center gap-1 mt-0.5 text-xs text-accent hover:text-accent/80"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <User className="w-3 h-3" />
                            {row.customerName || "Kunde"}
                          </Link>
                        ) : row.customerName ? (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <User className="w-3 h-3" />{row.customerName}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-xs text-muted-foreground">
                      {row.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{row.email}</span>}
                      {row.date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(row.date).toLocaleDateString("de-DE")}</span>}
                      {row.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{row.location}</span>}
                      {row.guests && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{row.guests} Gäste</span>}
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

export default AdminBookings;
