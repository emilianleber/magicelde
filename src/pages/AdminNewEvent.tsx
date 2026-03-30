import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, Save, Search, X } from "lucide-react";
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

const AdminNewEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("customerId");

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [allCustomers, setAllCustomers] = useState<LinkedCustomer[]>([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [linkedCustomer, setLinkedCustomer] = useState<LinkedCustomer | null>(null);
  const [showPicker, setShowPicker] = useState(!preselectedId);

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
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
      const { data: admin } = await supabase.from("portal_admins").select("*").eq("email", session.user.email!).maybeSingle();
      setIsAdmin(!!admin);
    };
    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    supabase.from("portal_customers").select("id,name,company,email,phone,kundennummer").is("deleted_at", null).order("name").then(({ data }) => {
      setAllCustomers(data || []);
    });
  }, [user]);

  useEffect(() => {
    if (!preselectedId || allCustomers.length === 0) return;
    const found = allCustomers.find((c) => c.id === preselectedId);
    if (found) { setLinkedCustomer(found); setShowPicker(false); }
    else {
      supabase.from("portal_customers").select("*").eq("id", preselectedId).single().then(({ data }) => {
        if (data) { setLinkedCustomer(data); setShowPicker(false); }
      });
    }
  }, [preselectedId, allCustomers]);

  const filteredCustomers = allCustomers.filter((c) => {
    const q = customerSearch.toLowerCase();
    return !q || c.name?.toLowerCase().includes(q) || c.company?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
  }).slice(0, 8);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectCustomer = (c: LinkedCustomer) => {
    setLinkedCustomer(c);
    setShowPicker(false);
    setCustomerSearch("");
  };

  const createEvent = async () => {
    if (!form.title.trim()) { setMessage("Titel ist ein Pflichtfeld."); return; }
    if (!linkedCustomer) { setMessage("Bitte zuerst einen Kunden auswählen."); return; }
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.from("portal_events").insert({
      customer_id: linkedCustomer.id,
      title: form.title.trim(),
      event_date: form.event_date || null,
      start_time: form.start_time || null,
      end_time: form.end_time || null,
      location: form.location.trim() || null,
      format: form.format || null,
      guests: form.guests ? Number(form.guests) : null,
      notes: form.notes.trim() || null,
      status: "in_planung",
    }).select("*").single();

    if (error) { setMessage("Fehler beim Erstellen des Events."); setLoading(false); return; }
    navigate(`/admin/customers/${linkedCustomer.id}`);
  };

  if (isAdmin === false) {
    return <AdminLayout title="Kein Zugriff" subtitle=""><p className="text-sm text-muted-foreground">Kein Admin-Zugriff.</p></AdminLayout>;
  }

  return (
    <AdminLayout
      title="Neues Event"
      subtitle={linkedCustomer ? `Für ${linkedCustomer.name || linkedCustomer.email}` : "Kunden wählen & Event anlegen"}
    >
      <div className="mb-5">
        <Link to="/admin/events" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Zurück zu Events
        </Link>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Customer picker */}
        <div className="p-5 rounded-2xl bg-muted/20 border border-border/30">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">Kunde</h2>
            {linkedCustomer && !showPicker && (
              <button onClick={() => setShowPicker(true)} className="text-xs text-muted-foreground hover:text-foreground">
                Ändern
              </button>
            )}
          </div>

          {linkedCustomer && !showPicker ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 text-sm font-bold text-background">
                {(linkedCustomer.name || "?")[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {linkedCustomer.name}
                  {linkedCustomer.kundennummer && (
                    <span className="ml-2 text-xs text-muted-foreground font-normal">#{linkedCustomer.kundennummer}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{linkedCustomer.email}{linkedCustomer.company ? ` · ${linkedCustomer.company}` : ""}</p>
              </div>
              <button onClick={() => { setLinkedCustomer(null); setShowPicker(true); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Name, E-Mail oder Firma suchen…"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full rounded-xl bg-background/60 border border-border/30 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {filteredCustomers.length > 0 && (
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {filteredCustomers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => selectCustomer(c)}
                      className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-background/60 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 text-xs font-bold text-foreground">
                        {(c.name || "?")[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.email}{c.company ? ` · ${c.company}` : ""}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {customerSearch && filteredCustomers.length === 0 && (
                <p className="text-sm text-muted-foreground px-1">Kein Kunde gefunden.</p>
              )}

              <div className="pt-1 border-t border-border/20">
                <Link
                  to="/admin/customers/new"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80"
                >
                  <Plus className="w-4 h-4" /> Neuen Kunden anlegen
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Form fields – only shown when customer is selected */}
        {linkedCustomer && (
          <>
            <div className="p-5 rounded-2xl bg-muted/20 border border-border/30 space-y-4">
              <h2 className="text-sm font-bold text-foreground">Eventdaten</h2>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Titel *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="z.B. Firmenfeier Müller GmbH" className={inputCls} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Datum</label>
                  <input name="event_date" type="date" value={form.event_date} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ort</label>
                  <input name="location" value={form.location} onChange={handleChange} placeholder="Stadt oder Adresse" className={inputCls} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Beginn</label>
                  <input name="start_time" type="time" value={form.start_time} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Ende</label>
                  <input name="end_time" type="time" value={form.end_time} onChange={handleChange} className={inputCls} />
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
                  <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Gäste</label>
                  <input name="guests" type="number" value={form.guests} onChange={handleChange} placeholder="Anzahl" className={inputCls} />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-muted-foreground mb-2">Notizen</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className={inputCls} />
              </div>
            </div>

            {message && (
              <div className="rounded-xl bg-red-500/10 text-red-600 px-4 py-3 text-sm">{message}</div>
            )}

            <button
              onClick={createEvent}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-sm font-semibold hover:opacity-80 disabled:opacity-40 transition-opacity"
            >
              <Save className="w-4 h-4" />
              {loading ? "Speichert…" : "Event erstellen"}
            </button>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNewEvent;
