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
}

type SortOption =
  | "newest"
  | "oldest"
  | "name_asc"
  | "name_desc"
  | "company_asc"
  | "company_desc";

const AdminCustomers = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<PortalCustomer[]>([]);
  const [reqCountMap, setReqCountMap] = useState<Record<string, number>>({});
  const [evtCountMap, setEvtCountMap] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

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

      const [custRes, reqRes, evtRes] = await Promise.all([
        supabase.from("portal_customers").select("*"),
        supabase.from("portal_requests").select("customer_id").is("deleted_at", null),
        supabase.from("portal_events").select("customer_id").is("deleted_at", null),
      ]);

      if (!custRes.error) setCustomers(custRes.data || []);

      const rMap: Record<string, number> = {};
      (reqRes.data || []).forEach((r) => {
        if (r.customer_id) rMap[r.customer_id] = (rMap[r.customer_id] || 0) + 1;
      });
      setReqCountMap(rMap);

      const eMap: Record<string, number> = {};
      (evtRes.data || []).forEach((e) => {
        if (e.customer_id) eMap[e.customer_id] = (eMap[e.customer_id] || 0) + 1;
      });
      setEvtCountMap(eMap);

      setLoading(false);
    };
    loadData();
  }, [user]);

  const filteredAndSortedCustomers = useMemo(() => {
    const q = search.toLowerCase().trim();
    const filtered = customers.filter((c) =>
      !q ||
      c.name?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.kundennummer?.toLowerCase().includes(q) ||
      c.phone?.toLowerCase().includes(q)
    );
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
  }, [customers, search, sortBy]);

  const customersWithCompany = customers.filter((c) => !!c.company).length;
  const recentCustomers = customers.filter(
    (c) => c.created_at && new Date(c.created_at) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
  ).length;
  const totalRequests = Object.values(reqCountMap).reduce((s, v) => s + v, 0);

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Kunden"
      subtitle={`${customers.length} Kunden gesamt`}
      actions={
        <Link
          to="/admin/customers/new"
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-semibold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Neuer Kunde
        </Link>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Kunden", value: customers.length },
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

      {/* Search + Sort */}
      <div className="grid lg:grid-cols-[1fr_200px] gap-3 mb-6">
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

      {/* Customer List */}
      <div className="space-y-2">
        {filteredAndSortedCustomers.length === 0 ? (
          <div className="p-12 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {search ? "Keine Kunden gefunden." : "Noch keine Kunden angelegt."}
            </p>
          </div>
        ) : (
          filteredAndSortedCustomers.map((customer) => (
            <Link
              key={customer.id}
              to={`/admin/customers/${customer.id}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/30 transition-all group"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
                {(customer.name || "?")[0].toUpperCase()}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">
                    {customer.name || "Unbekannt"}
                  </span>
                  {customer.company && (
                    <span className="inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded-md bg-background/60 border border-border/20 text-muted-foreground">
                      <Building2 className="w-3 h-3" />
                      {customer.company}
                    </span>
                  )}
                  {customer.kundennummer && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-background/60 border border-border/20 text-muted-foreground">
                      #{customer.kundennummer}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-0.5 text-xs text-muted-foreground flex-wrap">
                  {customer.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {customer.email}
                    </span>
                  )}
                  {customer.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {customer.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Counts */}
              <div className="hidden sm:flex items-center gap-4 shrink-0">
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{reqCountMap[customer.id] || 0}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> Anfragen
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{evtCountMap[customer.id] || 0}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Events
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
