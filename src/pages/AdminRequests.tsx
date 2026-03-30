import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Plus,
  Trash2,
  User,
  AlertTriangle,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

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

interface CustomerMini {
  id: string;
  name: string | null;
  company: string | null;
}

type ViewFilter = "aktiv" | "abgeschlossen" | "geloescht" | "alle";

const ACTIVE_STATUSES = ["neu", "in_bearbeitung", "details_besprechen", "angebot_gesendet", "warte_auf_kunde"];
const DONE_STATUSES = ["bestätigt", "abgelehnt", "archiviert"];

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu": return "Neu";
    case "in_bearbeitung": return "In Bearbeitung";
    case "details_besprechen": return "Details besprechen";
    case "angebot_gesendet": return "Angebot gesendet";
    case "warte_auf_kunde": return "Warte auf Kunde";
    case "bestätigt": return "Bestätigt";
    case "abgelehnt": return "Abgelehnt";
    case "archiviert": return "Archiviert";
    default: return status || "Offen";
  }
};

const formatStatusClasses = (status?: string | null) => {
  switch (status) {
    case "neu": return "text-blue-600 bg-blue-50 border-blue-200";
    case "in_bearbeitung": case "details_besprechen": case "angebot_gesendet": case "warte_auf_kunde":
      return "text-foreground bg-muted border-border/30";
    case "bestätigt": return "text-green-700 bg-green-50 border-green-200";
    case "abgelehnt": return "text-destructive bg-destructive/10 border-destructive/20";
    case "archiviert": return "text-muted-foreground bg-muted border-border/20";
    default: return "text-muted-foreground bg-muted border-border/20";
  }
};

const AdminRequests = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [customerMap, setCustomerMap] = useState<Record<string, CustomerMini>>({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
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

      const [reqRes, custRes] = await Promise.all([
        supabase.from("portal_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("portal_customers").select("id, name, company"),
      ]);

      if (!reqRes.error) setRequests(reqRes.data || []);

      const cMap: Record<string, CustomerMini> = {};
      (custRes.data || []).forEach((c) => { cMap[c.id] = c; });
      setCustomerMap(cMap);

      setLoading(false);
    };
    loadData();
  }, [user]);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const q = search.toLowerCase();
      const cust = req.customer_id ? customerMap[req.customer_id] : null;
      const matchesSearch =
        !q ||
        req.name?.toLowerCase().includes(q) ||
        req.firma?.toLowerCase().includes(q) ||
        req.email?.toLowerCase().includes(q) ||
        req.anlass?.toLowerCase().includes(q) ||
        req.ort?.toLowerCase().includes(q) ||
        cust?.name?.toLowerCase().includes(q) ||
        cust?.company?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "Alle" || formatStatusLabel(req.status) === statusFilter;

      const isDeleted = !!req.deleted_at;
      const isConverted = !!req.event_id;
      const isActive = ACTIVE_STATUSES.includes(req.status || "");
      const isDone = DONE_STATUSES.includes(req.status || "");

      let matchesView = true;
      if (viewFilter === "aktiv") matchesView = !isDeleted && !isConverted && isActive;
      else if (viewFilter === "abgeschlossen") matchesView = !isDeleted && (isConverted || isDone);
      else if (viewFilter === "geloescht") matchesView = isDeleted;

      return matchesSearch && matchesStatus && matchesView;
    });
  }, [requests, search, statusFilter, viewFilter, customerMap]);

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const allVisibleSelected = filteredRequests.length > 0 && filteredRequests.every((r) => selectedIds.includes(r.id));

  const toggleSelectAllVisible = () => {
    const ids = filteredRequests.map((r) => r.id);
    if (allVisibleSelected) setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    else setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const deleteSelected = async () => {
    if (!selectedIds.length) return;
    setDeleting(true);
    const { error } = await supabase
      .from("portal_requests").update({ deleted_at: new Date().toISOString() }).in("id", selectedIds);
    if (!error) {
      setRequests((prev) => prev.map((r) => selectedIds.includes(r.id) ? { ...r, deleted_at: new Date().toISOString() } : r));
      setSelectedIds([]);
    }
    setDeleting(false);
  };

  const hardDeleteSelected = async () => {
    if (!selectedIds.length) return;
    setHardDeleting(true);
    setHardDeleteError(null);
    const { error } = await supabase.from("portal_requests").delete().in("id", selectedIds);
    if (error) {
      setHardDeleteError(error.message || "Fehler beim Löschen.");
    } else {
      setRequests((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
      setSelectedIds([]);
      setConfirmHardDelete(false);
    }
    setHardDeleting(false);
  };

  const activeCount = requests.filter((r) => !r.deleted_at && !r.event_id && ACTIVE_STATUSES.includes(r.status || "")).length;
  const doneCount = requests.filter((r) => !r.deleted_at && (!!r.event_id || DONE_STATUSES.includes(r.status || ""))).length;
  const deletedCount = requests.filter((r) => !!r.deleted_at).length;

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Anfragen"
      subtitle={`${activeCount} aktiv`}
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
            to="/admin/requests/new"
            className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Neue Anfrage
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
              <p className="text-xs text-muted-foreground mt-1">{selectedIds.length} Anfrage(n) werden permanent gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.</p>
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

      {/* Search + Status */}
      <div className="grid lg:grid-cols-[1fr_180px] gap-3 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Name, Anlass, Ort, Kunde …"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-muted/40 border border-border/30 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl bg-muted/40 border border-border/30 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option>Alle</option>
          <option>Neu</option>
          <option>In Bearbeitung</option>
          <option>Details besprechen</option>
          <option>Angebot gesendet</option>
          <option>Warte auf Kunde</option>
          <option>Bestätigt</option>
          <option>Abgelehnt</option>
          <option>Archiviert</option>
        </select>
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

      {/* List */}
      <div className="space-y-2">
        {filteredRequests.length === 0 ? (
          <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <p className="text-sm text-muted-foreground">Keine Anfragen gefunden.</p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const cust = req.customer_id ? customerMap[req.customer_id] : null;
            return (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(req.id)}
                      onChange={() => toggleSelect(req.id)}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-foreground">{req.anlass || "Anfrage"}</span>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border font-medium ${formatStatusClasses(req.status)}`}>
                            {formatStatusLabel(req.status)}
                          </span>
                          {req.event_id && (
                            <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-green-700 bg-green-50 border border-green-200">
                              Event
                            </span>
                          )}
                          {req.deleted_at && (
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
                            {cust.name || "Kunde"}{cust.company ? ` · ${cust.company}` : ""}
                          </Link>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <User className="w-3 h-3" />{req.name}{req.firma ? ` · ${req.firma}` : ""}
                          </p>
                        )}
                      </div>
                      <Link to={`/admin/requests/${req.id}`} className="flex items-center gap-1 text-sm text-accent hover:text-accent/80 shrink-0">
                        Öffnen <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1.5 text-xs text-muted-foreground">
                      {req.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{req.email}</span>}
                      {req.datum && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(req.datum).toLocaleDateString("de-DE")}</span>}
                      {req.ort && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{req.ort}</span>}
                      {req.gaeste && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{req.gaeste} Gäste</span>}
                      <span className="text-muted-foreground/50">{new Date(req.created_at).toLocaleDateString("de-DE")}</span>
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

export default AdminRequests;
