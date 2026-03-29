import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Building2,
  LogOut,
  Mail,
  Phone,
  Plus,
  Save,
  User,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const cardCls = "p-6 rounded-2xl bg-muted/20 border border-border/30";

const AdminNewCustomer = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [firma, setFirma] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sendMail, setSendMail] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/kundenportal/login");
        return;
      }

      setUser(session.user);

      const { data: admin } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      setIsAdmin(!!admin);
      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
  };

  const createCustomer = async () => {
    setSaving(true);
    setMessage("");

    const safeName = name.trim();
    const safeEmail = email.trim().toLowerCase();

    if (!safeName || !safeEmail) {
      setMessage("Name und E-Mail sind erforderlich.");
      setSaving(false);
      return;
    }

    try {
      const { data: existingCustomer } = await supabase
        .from("portal_customers")
        .select("id")
        .eq("email", safeEmail)
        .maybeSingle();

      if (existingCustomer) {
        setMessage("Es existiert bereits ein Kunde mit dieser E-Mail.");
        setSaving(false);
        return;
      }

      const { data: newCustomer, error } = await supabase
        .from("portal_customers")
        .insert({
          name: safeName,
          firma: firma.trim() || null,
          email: safeEmail,
          phone: phone.trim() || null,
        })
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      if (sendMail && newCustomer?.email) {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.access_token) {
            await fetch(
              "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-send-status-mail",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                  Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                  type: "customer_created",
                  customerId: newCustomer.id,
                }),
              }
            );
          }
        } catch (mailError) {
          console.error("MAIL ERROR:", mailError);
        }
      }

      navigate(`/admin/customers/${newCustomer.id}`);
    } catch (err) {
      console.error("CREATE CUSTOMER ERROR:", err);
      setMessage("Fehler beim Anlegen des Kunden.");
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  return (
    <AdminLayout
      title="Neuer Kunde"
      subtitle="Kunden manuell im CRM anlegen"
      actions={
        <button
          onClick={logout}
          className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="mb-6">
        <Link
          to="/admin/customers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Kundenübersicht
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className={cardCls}>
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Kundendaten
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Mustermann"
                  className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Firma
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  placeholder="Musterfirma GmbH"
                  className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                E-Mail *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kunde@beispiel.de"
                  className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 ..."
                  className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={cardCls}>
          <h2 className="font-display text-lg font-bold text-foreground mb-5">
            Aktionen
          </h2>

          <div className="space-y-5">
            <label className="flex items-start gap-3 rounded-xl bg-background/60 border border-border/20 px-4 py-4">
              <input
                type="checkbox"
                checked={sendMail}
                onChange={(e) => setSendMail(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
              />
              <div>
                <p className="font-sans text-sm font-medium text-foreground">
                  Kundenmail senden
                </p>
                <p className="font-sans text-xs text-muted-foreground mt-1">
                  Optional eine Info-Mail nach dem Anlegen versenden.
                </p>
              </div>
            </label>

            <button
              onClick={createCustomer}
              disabled={saving}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Speichert…" : "Kunde anlegen"}
            </button>

            <Link
              to="/admin/customers"
              className="w-full inline-flex items-center justify-center rounded-xl border border-border/30 bg-background/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Abbrechen
            </Link>

            {message && (
              <div className="rounded-xl bg-accent/10 text-accent px-4 py-3 text-sm">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNewCustomer;
