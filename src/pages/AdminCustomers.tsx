import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Search,
  Mail,
  Phone,
  ArrowRight,
  Building2,
  Plus,
  ArrowUpDown,
  MessageCircle,
  Calendar,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalCustomer {
  id: string;
  name: string | null;
  company?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
  created_at?: string | null;
  deleted_at?: string | null;
}

type SortOption = "newest" | "oldest" | "name_asc" | "name_desc" | "company_asc" | "company_desc";
type ViewFilter = "aktiv" | "inaktiv" | "alle";

const AdminCustomers = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<PortalCustomer[]>([]);
  const [reqCountMap, setReqCountMap] = useState<Record<string, number>>({});
  const [evtCountMap, setEvtCountMap] = useState<Record<string, number>>({});
  const [activeCustomerIds, setActiveCustomerIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("aktiv");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [hardDeleting, setHardDeleting] = useState(false);
  const [confirmHardDelete, setConfirmHardDelete] = useState(false);
  const [hardDeleteError, setHardDeleteError] = useState<string | null>(null);

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
      const { data: adminEntry } = await supabase.from("portal_admins").select("id").eq("email", user.email).maybeSingle();
      if (!adminEntry) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);

      const [custRes, reqRes, evtRes] = await Promise.all([
        supabase.from("portal_customers").select("*"),
        supabase.from("portal_requests").select("customer_id, status").is("deleted_at", null),
        supabase.from("portal_events").select("customer_id, event_date, status").is("deleted_at", null),
      ]);

      if (!custRes.error) setCustomers(custRes.data || []);

      const rMap: Record<string, number> = {};
      (reqRes.data || []).forEach((r) => { if (r.customer_id) rMap[r.customer_id] = (rMap[r.customer_id] || 0) + 1; });
      setReqCountMap(rMap);

      const eMap: Record<string, number> = {};
      (evtRes.data || []).forEach((e) => { if (e.customer_id) eMap[e.customer_id] = (eMap[e.customer_id] || 0) + 1; });
      setEvtCountMap(eMap);

      // Aktive Kunden: haben offene Anfrage ODER zukünftiges Event
      const activeStatuses = ["neu", "in_bearbeitung", "details_besprechen", "angebot_gesendet", "warte_auf_kunde", "bestätigt"];
      const today = new Date().toISOString().split("T")[0];
      const activeCustomerIds = new Set<string>();
      (reqRes.data || []).forEach((r: any) => {
        if (r.customer_id && activeStatuses.includes(r.status)) activeCustomerIds.add(r.customer_id);
      });
      (evtRes.data || []).forEach((e: any) => {
        if (e.customer_id && e.event_date && e.event_date >= today && e.status !== "storniert") activeCustomerIds.add(e.customer_id);
      });
      setActiveCustomerIds(activeCustomerIds);

      setLoading(false);
    };
    loadData();
  }, [user]);

  const filteredAndSortedCustomers = useMemo(() => {
    const q = search.toLowerCase().trim();
    const filtered = customers.filter((c) => {
      const matchesSearch = !q || c.name?.toLowerCase().includes(q) || c.company?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q) || c.kundennummer?.toLowerCase().includes(q) || c.phone?.toLowerCase().includes(q);
      const isDeleted = !!c.deleted_at;
      if (viewFilter === "aktiv") return matchesSearch && !isDeleted && activeCustomerIds.has(c.id);
      if (viewFilter === "inaktiv") return matchesSearch && !isDeleted && !activeCustomerIds.has(c.id);
      return matchesSearch && !isDeleted;
    });
    return [...filtered].sort((a, b) => {
      const aDate = a.created_at ? new Date(a.created_at).getTime() : 0;
      const bDate = b.created_at ? new Date(b.created_at).getTime() : 0;
      switch (sortBy) {
        case "newest": return bDate - aDate;
        case "oldest": return aDate - bDate;
        case "name_asc": return (a.name || "").localeCompare(b.name || "", "de");
        case "name_desc": return (b.name || "").localeCompare(a.name || "", "de");
        case "company_asc": return (a.company || "").localeCompare(b.company || "", "de");
        case "company_desc": return (b.company || "").localeCompare(a.company || "", "de");
        default: return bDate - aDate;
      }
    });
  }, [customers, search, sortBy, viewFilter]);

  const allCount = customers.filter((c) => !c.deleted_at).length;
  const activeCount = customers.filter((c) => !c.deleted_at && activeCustomerIds.has(c.id)).length;
  const inactiveCount = allCount - activeCount;
  const customersWithCompany = customers.filter((c) => !c.deleted_at && !!c.company).length;
  const totalRequests = Object.values(reqCountMap).reduce((s, v) => s + v, 0);
  const recentCustomers = customers.filter((c) => !c.deleted_at && c.created_at && new Date(c.created_at) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)).length;

  const allVisibleSelected = filteredAndSortedCustomers.length > 0 && filteredAndSortedCustomers.every((c) => selectedIds.includes(c.id));

  const toggleSelect = (id: string) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleSelectAll = () => {
    const ids = filteredAndSortedCustomers.map((c) => c.id);
    if (allVisibleSelected) setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    else setSelectedIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const softDeleteSelected = async () => {
    if (!selectedIds.length) return;
    if (!confirm(`${selectedIds.length} Kunde(n) endgültig löschen? Alle zugehörigen Daten werden ebenfalls gelöscht.`)) return;
    setDeleting(true);
    try {
      // Delete related data first to avoid FK constraint errors
      for (const cid of selectedIds) {
        // Delete events first (timeline has FK to events)
        const { data: events } = await supabase.from("portal_events").select("id").eq("customer_id", cid);
        if (events?.length) {
          const eventIds = events.map(e => e.id);
          await supabase.from("portal_timeline").delete().in("event_id", eventIds);
          await supabase.from("portal_events").delete().eq("customer_id", cid);
        }
        await supabase.from("portal_documents").delete().eq("customer_id", cid);
        await supabase.from("portal_requests").delete().eq("customer_id", cid);
        await supabase.from("portal_messages").delete().eq("customer_id", cid);
        await supabase.from("change_requests").delete().eq("customer_id", cid);
        await supabase.from("customer_feedback").delete().eq("customer_id", cid);
        await supabase.from("portal_todos").update({ customer_id: null }).eq("customer_id", cid);
      }
      const { error } = await supabase.from("portal_customers").delete().in("id", selectedIds);
      if (error) {
        alert("Fehler beim Löschen: " + error.message);
      } else {
        setCustomers((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
        setSelectedIds([]);
      }
    } catch (e) {
      alert("Fehler: " + (e instanceof Error ? e.message : String(e)));
    }
    setDeleting(false);
  };

  const hardDeleteSelected = async () => {
    if (!selectedIds.length) return;
    setHardDeleting(true);
    setHardDeleteError(null);
    // Delete related data first to avoid FK constraint errors
    for (const cid of selectedIds) {
      await supabase.from("portal_documents").delete().eq("customer_id", cid);
      await supabase.from("portal_events").delete().eq("customer_id", cid);
      await supabase.from("portal_requests").delete().eq("customer_id", cid);
      await supabase.from("portal_messages").delete().eq("customer_id", cid);
      await supabase.from("change_requests").delete().eq("customer_id", cid);
      await supabase.from("customer_feedback").delete().eq("customer_id", cid);
    }
    const { error } = await supabase.from("portal_customers").delete().in("id", selectedIds);
    if (error) {
      setHardDeleteError(error.message || "Fehler beim Löschen.");
    } else {
      setCustomers((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      setConfirmHardDelete(false);
    }
    setHardDeleting(false);
  };

  const restoreSelected = async () => {
    if (!selectedIds.length) return;
    setDeleting(true);
    const { error } = await supabase.from("portal_customers").update({ deleted_at: null }).in("id", selectedIds);
    if (!error) {
      setCustomers((prev) => prev.map((c) => selectedIds.includes(c.id) ? { ...c, deleted_at: null } : c));
      setSelectedIds([]);
    }
    setDeleting(false);
  };

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Kunden"
      subtitle={`${activeCount} aktive Kunden`}
      actions={
        <div className="flex items-center gap-2">
          {selectMode && selectedIds.length > 0 && viewFilter === "geloescht" && (
            <>
              <button
                onClick={() => setConfirmHardDelete(true)}
                disabled={hardDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Endgültig löschen ({selectedIds.length})
              </button>
              <button
                onClick={restoreSelected}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-2 text-sm text-foreground hover:bg-muted/40 disabled:opacity-50 transition-colors"
              >
                Wiederherstellen
              </button>
            </>
          )}
          {selectMode && selectedIds.length > 0 && viewFilter !== "geloescht" && (
            <button
              onClick={softDeleteSelected}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "…" : `Löschen (${selectedIds.length})`}
            </button>
          )}
          <button
            onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); setConfirmHardDelete(false); }}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${selectMode ? "border-border/60 bg-muted/40 text-foreground" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
          >
            {selectMode ? "Abbrechen" : "Auswählen"}
          </button>
          <Link
            to="/admin/customers/new"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Neuer Kunde
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
              <p className="text-xs text-muted-foreground mt-1">
                {selectedIds.length} Kunde(n) werden permanent gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Kunden", value: activeCount },
          { label: "Mit Firma", value: customersWithCompany },
          { label: "Anfragen gesamt", value: totalRequests },
          { label: "Neu (30 Tage)", value: recentCustomers },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-muted/30 border border-border/30">
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* View Tabs */}
      <div className="flex gap-1 bg-muted/40 rounded-xl p-1 mb-4 w-fit">
        {[
          { key: "aktiv", label: `Aktiv (${activeCount})` },
          { key: "inaktiv", label: `Inaktiv (${inactiveCount})` },
          { key: "alle", label: `Alle (${allCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setViewFilter(tab.key as ViewFilter); setSelectedIds([]); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${viewFilter === tab.key ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search + Sort */}
      <div className="grid lg:grid-cols-[1fr_200px] gap-3 mb-5">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Name, Firma, E-Mail, Telefon, Kundennummer …"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-muted/40 border border-border/30 pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div className="relative">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full appearance-none rounded-xl bg-muted/40 border border-border/30 pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="newest">Neueste</option>
            <option value="oldest">Älteste</option>
            <option value="name_asc">Name A–Z</option>
            <option value="name_desc">Name Z–A</option>
            <option value="company_asc">Firma A–Z</option>
            <option value="company_desc">Firma Z–A</option>
          </select>
        </div>
      </div>

      {selectMode && (
        <div className="flex items-center gap-3 mb-3">
          <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleSelectAll} className="h-4 w-4 rounded border-border text-accent focus:ring-accent" />
            Alle auswählen
          </label>
          {selectedIds.length > 0 && <span className="text-sm text-muted-foreground">{selectedIds.length} ausgewählt</span>}
        </div>
      )}

      {/* Customer List */}
      <div className="space-y-2">
        {filteredAndSortedCustomers.length === 0 ? (
          <div className="p-12 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {search ? "Keine Kunden gefunden." : viewFilter === "geloescht" ? "Keine gelöschten Kunden." : "Noch keine Kunden angelegt."}
            </p>
          </div>
        ) : (
          filteredAndSortedCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${selectMode ? "bg-muted/20 border-border/30" : "bg-muted/20 border-border/30 hover:border-accent/30 hover:bg-muted/30"} ${customer.deleted_at ? "opacity-60" : ""}`}
            >
              {selectMode && (
                <input
                  type="checkbox"
                  checked={selectedIds.includes(customer.id)}
                  onChange={() => toggleSelect(customer.id)}
                  className="h-4 w-4 rounded border-border text-accent focus:ring-accent shrink-0"
                />
              )}

              <Link
                to={`/admin/customers/${customer.id}`}
                className="flex items-center gap-4 flex-1 min-w-0 group"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
                  {(customer.name || "?")[0].toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-foreground">{customer.name || "Unbekannt"}</span>
                    {customer.company && (
                      <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md bg-background/60 border border-border/20 text-muted-foreground">
                        <Building2 className="w-3 h-3" />{customer.company}
                      </span>
                    )}
                    {customer.kundennummer && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-background/60 border border-border/20 text-muted-foreground">
                        #{customer.kundennummer}
                      </span>
                    )}
                    {customer.deleted_at && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full text-destructive bg-destructive/10 border border-destructive/20">
                        Gelöscht
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-0.5 text-xs text-muted-foreground flex-wrap">
                    {customer.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{customer.email}</span>}
                    {customer.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{customer.phone}</span>}
                  </div>
                </div>

                {/* Counts */}
                <div className="hidden sm:flex items-center gap-4 shrink-0">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{reqCountMap[customer.id] || 0}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1"><MessageCircle className="w-3 h-3" /> Anfragen</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{evtCountMap[customer.id] || 0}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> Events</p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
