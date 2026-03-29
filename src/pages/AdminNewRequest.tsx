import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Building2, LogOut, Save, User } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface LinkedCustomer {
  id: string;
  name: string | null;
  firma?: string | null;
  email: string | null;
  phone?: string | null;
  kundennummer?: string | null;
}

const inputCls =
  "w-full rounded-xl bg-background/60 border border-border/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const AdminNewRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [linkedCustomer, setLinkedCustomer] = useState<LinkedCustomer | null>(null);

  const [form, setForm] = useState({
    name: "",
    firma: "",
    email: "",
    phone: "",
    anlass: "",
    datum: "",
    uhrzeit: "",
    ort: "",
    gaeste: "",
    format: "",
    nachricht: "",
    source: "manuell",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);

      const { data: admin } = await supabase
        .from("portal_admins").select("*").eq("email", session.user.email!).maybeSingle();

      setIsAdmin(!!admin);
    };
    checkUser();
  }, [navigate]);

  // Kunde laden wenn customerId in URL
  useEffect(() => {
    if (!customerId) return;

    const loadCustomer = async () => {
      const { data, error } = await supabase
        .from("portal_customers").select("*").eq("id", customerId).single();

      if (error || !data) return;

      setLinkedCustomer(data);
      setForm((prev) => ({
        ...prev,
        name: data.name || "",
        firma: data.firma || "",
        email: data.email || "",
        phone: data.phone || "",
      }));
    };

    loadCustomer();
  }, [customerId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createRequest = async () => {
    if (!form.email.trim() || !form.name.trim()) {
      setMessage("Name und E-Mail sind Pflichtfelder.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Keine Admin-Session gefunden.");

      const response = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/admin-create-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            customer_id: customerId || null,
            name: form.name.trim(),
            firma: form.firma.trim() || null,
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim() || null,
            anlass: form.anlass || null,
            datum: form.datum || null,
            uhrzeit: form.uhrzeit || null,
            ort: form.ort.trim() || null,
            gaeste: form.gaeste ? Number(form.gaeste) : null,
            format: form.format || null,
            nachricht: form.nachricht.trim() || null,
            source: form.source || "manuell",
          }),
        }
      );

      let data: { error?: string; success?: boolean; request?: { id: string } } | null = null;
      try { data = await response.json(); } catch { throw new Error("Ungültige Server-Antwort."); }
      if (!response.ok) throw new Error(data?.error || "Fehler beim Erstellen der Anfrage.");

      if (customerId) {
        navigate(`/admin/customers/${customerId}`);
      } else {
        navigate("/admin/requests");
      }
    } catch (err: unknown) {
      setMessage(err instanceof Error ? err.message : "Fehler beim Speichern.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (isAdmin === false) {
    return (
      <AdminLayout title="Kein Zugriff" subtitle="">
        <p className="text-sm text-muted-foreground">Dein Account ist nicht als Admin freigegeben.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Neue Anfrage"
      subtitle={linkedCustomer ? `Für ${linkedCustomer.name || linkedCustomer.email}` : "Anfrage manuell erfassen"}
      actions={
        <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="mb-6">
        <Link
          to={customerId ? `/admin/customers/${customerId}` : "/admin/requests"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {customerId ? "Zurück zum Kunden" : "Zurück zu Anfragen"}
        </Link>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Kundenzuordnung anzeigen */}
        {linkedCustomer && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-accent/10 border border-accent/20">
            <User className="w-4 h-4 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="font-sans text-sm font-medium text-foreground">
                {linkedCustomer.name}
                {linkedCustomer.kundennummer && (
                  <span className="ml-2 text-xs text-muted-foreground">{linkedCustomer.kundennummer}</span>
                )}
              </p>
              {linkedCustomer.firma && (
                <p className="font-sans text-xs text-muted-foreground">{linkedCustomer.firma}</p>
              )}
            </div>
            <Link to={`/admin/customers/${linkedCustomer.id}`} className="ml-auto text-xs text-accent hover:text-accent/80 shrink-0">
              Kundenkonto
            </Link>
          </div>
        )}

        {/* Kontaktdaten */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 space-y-4">
          <h2 className="font-display text-base font-bold text-foreground">Kontaktdaten</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Firma</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="firma" value={form.firma} onChange={handleChange} className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">E-Mail *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Telefon</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Eventdetails */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 space-y-4">
          <h2 className="font-display text-base font-bold text-foreground">Eventdetails</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Veranstaltung</label>
              <select name="anlass" value={form.anlass} onChange={handleChange} className={inputCls}>
                <option value="">— wählen —</option>
                <option value="Hochzeit">Hochzeit</option>
                <option value="Firmenfeier">Firmenfeier / Corporate Event</option>
                <option value="Geburtstag">Geburtstag / Private Feier</option>
                <option value="Gala">Gala / Awards</option>
                <option value="Messe">Messe / Promotion</option>
                <option value="Magic Dinner">Magic Dinner</option>
                <option value="Teamevent">Teamevent / Incentive</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Format</label>
              <select name="format" value={form.format} onChange={handleChange} className={inputCls}>
                <option value="">— wählen —</option>
                <option value="closeup">Close-Up</option>
                <option value="buehnenshow">Bühnenshow</option>
                <option value="walking_act">Walking Act</option>
                <option value="magic_dinner">Magic Dinner</option>
                <option value="kombination">Kombination</option>
                <option value="beratung">Noch offen / Beratung</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Datum</label>
              <input name="datum" type="date" value={form.datum} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Uhrzeit</label>
              <input name="uhrzeit" type="time" value={form.uhrzeit} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ort</label>
              <input name="ort" value={form.ort} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Gäste</label>
              <input name="gaeste" type="number" value={form.gaeste} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Nachricht</label>
            <textarea name="nachricht" value={form.nachricht} onChange={handleChange} rows={4} className={inputCls} />
          </div>

          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Quelle</label>
            <select name="source" value={form.source} onChange={handleChange} className={inputCls}>
              <option value="telefon">Telefon</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">E-Mail</option>
              <option value="instagram">Instagram</option>
              <option value="website">Website</option>
              <option value="manuell">Manuell</option>
            </select>
          </div>
        </div>

        {message && (
          <div className="rounded-xl bg-red-500/10 text-red-600 px-4 py-3 text-sm">{message}</div>
        )}

        <button onClick={createRequest} disabled={loading} className="btn-primary disabled:opacity-60">
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Speichert…" : "Anfrage erstellen"}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminNewRequest;
