import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, User } from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

interface LinkedCustomer {
  id: string;
  name: string | null;
  company?: string | null;
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
        .from("portal_admins").select("id").eq("email", session.user.email!).maybeSingle();
      setIsAdmin(!!admin);
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!customerId) return;
    const loadCustomer = async () => {
      const { data } = await supabase
        .from("portal_customers").select("*").eq("id", customerId).single();
      if (data) setLinkedCustomer(data);
    };
    loadCustomer();
  }, [customerId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createRequest = async () => {
    if (!customerId || !linkedCustomer) {
      setMessage("Bitte zuerst einen Kunden auswählen.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data: reqData, error } = await supabase
        .from("portal_requests")
        .insert({
          customer_id: customerId,
          name: linkedCustomer.name || "",
          firma: linkedCustomer.company || null,
          email: linkedCustomer.email || "",
          phone: linkedCustomer.phone || null,
          anlass: form.anlass || null,
          datum: form.datum || null,
          uhrzeit: form.uhrzeit || null,
          ort: form.ort.trim() || null,
          gaeste: form.gaeste ? Number(form.gaeste) : null,
          format: form.format || null,
          nachricht: form.nachricht.trim() || null,
          source: form.source || "manuell",
          status: "neu",
        })
        .select("id")
        .single();

      if (error) throw error;

      navigate(`/admin/customers/${customerId}`);
    } catch (err: any) {
      setMessage(err.message || "Fehler beim Speichern.");
    } finally {
      setLoading(false);
    }
  };

  if (isAdmin === false) {
    return (
      <AdminLayout title="Kein Zugriff" subtitle="">
        <p className="text-sm text-muted-foreground">Kein Admin-Zugriff.</p>
      </AdminLayout>
    );
  }

  // If no customer selected, redirect to customers to pick one first
  if (!customerId) {
    return (
      <AdminLayout title="Neue Anfrage" subtitle="Zuerst einen Kunden auswählen">
        <div className="max-w-lg">
          <div className="p-8 rounded-2xl bg-muted/20 border border-border/30 text-center">
            <User className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-foreground mb-2">Kunde wählen</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Jede Anfrage muss einem Kunden zugeordnet sein.<br />
              Wähle zuerst einen Kunden aus der Kundenliste aus.
            </p>
            <Link
              to="/admin/customers"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              Zur Kundenliste
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Neue Anfrage"
      subtitle={linkedCustomer ? `Für ${linkedCustomer.name || linkedCustomer.email}` : "Lädt…"}
    >
      <div className="mb-5">
        <Link
          to={`/admin/customers/${customerId}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Kunden
        </Link>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Customer banner */}
        {linkedCustomer && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-foreground/5 border border-border/30">
            <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
              {(linkedCustomer.name || "?")[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {linkedCustomer.name}
                {linkedCustomer.kundennummer && (
                  <span className="ml-2 text-xs text-muted-foreground font-normal">#{linkedCustomer.kundennummer}</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{linkedCustomer.email}{linkedCustomer.company ? ` · ${linkedCustomer.company}` : ""}</p>
            </div>
          </div>
        )}

        {/* Event details */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 space-y-4">
          <h2 className="text-base font-bold text-foreground">Anfragedetails</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Veranstaltung</label>
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
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Format</label>
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
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Datum</label>
              <input name="datum" type="date" value={form.datum} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Uhrzeit</label>
              <input name="uhrzeit" type="time" value={form.uhrzeit} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ort</label>
              <input name="ort" value={form.ort} onChange={handleChange} placeholder="Stadt oder Adresse" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Gäste</label>
              <input name="gaeste" type="number" value={form.gaeste} onChange={handleChange} placeholder="Anzahl" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Notizen / Nachricht</label>
            <textarea name="nachricht" value={form.nachricht} onChange={handleChange} rows={3} className={inputCls} />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Quelle</label>
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

        <button
          onClick={createRequest}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity"
        >
          <Save className="w-4 h-4" />
          {loading ? "Speichert…" : "Anfrage erstellen"}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminNewRequest;
