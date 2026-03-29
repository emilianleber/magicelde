import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Search,
  Mail,
  Phone,
  ArrowRight,
  LogOut,
  Building2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalCustomer {
  id: string;
  name: string | null;
  firma?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
  created_at?: string | null;
}

const AdminCustomers = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<PortalCustomer[]>([]);
  const [search, setSearch] = useState("");

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
        .from("portal_customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fehler beim Laden der Kunden:", error);
      } else {
        setCustomers(data || []);
      }

      setLoading(false);
    };

    loadData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const filteredCustomers = useMemo(() => {
    const q = search.toLowerCase();

    return customers.filter((customer) => {
      return (
        customer.name?.toLowerCase().includes(q) ||
        customer.firma?.toLowerCase().includes(q) ||
        customer.email?.toLowerCase().includes(q) ||
        customer.kundennummer?.toLowerCase().includes(q) ||
        customer.phone?.toLowerCase().includes(q)
      );
    });
  }, [customers, search]);

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  return (
    <AdminLayout
      title="Kunden"
      subtitle="Alle Kunden mit zugehörigen Daten im Überblick"
      actions={
        <button
          onClick={logout}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="relative mb-8">
        <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Suche nach Name, Firma, E-Mail, Telefon oder Kundennummer …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {customers.length}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Alle Kunden
          </p>
        </div>

                <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {customers.filter((c) => c.firma).length}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Mit Firma
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {
              customers.filter(
                (c) =>
                  c.created_at &&
                  new Date(c.created_at) >
                    new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
              ).length
            }
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Neue (30 Tage)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCustomers.length === 0 ? (
          <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
            <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Keine Kunden gefunden
            </h3>
            <p className="font-sans text-sm text-muted-foreground">
              Passe deine Suche an.
            </p>
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {customer.name || "Unbekannt"}
                    </h3>

                    {customer.firma && (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-background/60 border border-border/20 text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {customer.firma}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
                    {customer.email && (
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        {customer.email}
                      </span>
                    )}

                    {customer.phone && (
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-accent" />
                        {customer.phone}
                      </span>
                    )}

                    {customer.kundennummer && (
                      <span className="text-xs px-2 py-1 rounded-full bg-background/60 border border-border/20">
                        #{customer.kundennummer}
                      </span>
                    )}
                  </div>

                  {customer.created_at && (
                    <p className="font-sans text-xs text-muted-foreground mt-3">
                      Kunde seit{" "}
                      {new Date(customer.created_at).toLocaleDateString("de-DE")}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start xl:items-end gap-3">
                  <Link
                    to={`/admin/customers/${customer.id}`}
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

export default AdminCustomers;