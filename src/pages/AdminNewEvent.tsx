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

const AdminNewEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [linkedCustomer, setLinkedCustomer] = useState<LinkedCustomer | null>(null);

  const [form, setForm] = useState({
    title: "",
    event_date: "",
    start_time: "",
    end_time: "",
    location: "",
    format: "",
    guests: "",
    notes: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/kundenportal/login"); return; }
      setUser(session.user);

      const { data: admin } = await supabase
        .from("portal_admins").select("*").eq("email", session.user.email!).maybeSingle();

      setIsAdmin(!!admin);
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!customerId) return;

    const loadCustomer = async () => {
      const { data, error } = await supabase
        .from("portal_customers").select("*").eq("id", customerId).single();

      if (error || !data) return;
      setLinkedCustomer(data);
    };

    loadCustomer();
  }, [customerId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createEvent = async () => {
    if (!form.title.trim()) {
      setMessage("Titel ist ein Pflichtfeld.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("portal_events")
      .insert({
        customer_id: customerId || null,
        customer_name: linkedCustomer?.name || null,
        firma: linkedCustomer?.firma || null,
        title: form.title.trim(),
        event_date: form.event_date || null,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        location: form.location.trim() || null,
        format: form.format || null,
        guests: form.guests ? Number(form.guests) : null,
        notes: form.notes.trim() || null,
        status: "in_planung",
      })
      .select("*")
      .single();

    if (error) {
      console.error("CREATE EVENT ERROR:", error);
      setMessage("Fehler beim Erstellen des Events.");
      setLoading(false);
      return;
    }

    if (customerId) {
      navigate(`/admin/customers/${customerId}`);
    } else {
      navigate(`/admin/events/${data.id}`);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/kundenportal/login");
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
      title="Neues Event"
      subtitle={linkedCustomer ? `Für ${linkedCustomer.name || linkedCustomer.email}` : "Event manuell anlegen"}
      actions={
        <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
          <LogOut className="w-4 h-4" /> Abmelden
        </button>
      }
    >
      <div className="mb-6">
        <Link
          to={customerId ? `/admin/customers/${customerId}` : "/admin/events"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          {customerId ? "Zurück zum Kunden" : "Zurück zu Events"}
        </Link>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Kundenzuordnung */}
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

        {/* Eventdaten */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 space-y-4">
          <h2 className="font-display text-base font-bold text-foreground">Eventdaten</h2>

          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Titel *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="z.B. Firmenfeier Müller GmbH" className={inputCls} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Datum</label>
              <input name="event_date" type="date" value={form.event_date} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ort</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Stadt oder Adresse" className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Beginn</label>
              <input name="start_time" type="time" value={form.start_time} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ende</label>
              <input name="end_time" type="time" value={form.end_time} onChange={handleChange} className={inputCls} />
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
              <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Gäste</label>
              <input name="guests" type="number" value={form.guests} onChange={handleChange} placeholder="Anzahl" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Notizen</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={4} className={inputCls} />
          </div>
        </div>

        {message && (
          <div className="rounded-xl bg-red-500/10 text-red-600 px-4 py-3 text-sm">{message}</div>
        )}

        <button onClick={createEvent} disabled={loading} className="btn-primary disabled:opacity-60">
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Speichert…" : "Event erstellen"}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminNewEvent;
