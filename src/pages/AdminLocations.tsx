import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { locationService } from "@/services/locationService";
import type { LocationVenue } from "@/types/productions";
import { Plus, Search, X, MapPin, Users, ChevronRight } from "lucide-react";

const TYP_MAP: Record<LocationVenue["typ"], [string, string]> = {
  theater:    ["Theater",    "bg-amber-100 text-amber-700"],
  hotel:      ["Hotel",      "bg-blue-100 text-blue-700"],
  restaurant: ["Restaurant", "bg-green-100 text-green-700"],
  eventlocation: ["Eventlocation", "bg-purple-100 text-purple-700"],
  outdoor:    ["Outdoor",    "bg-teal-100 text-teal-700"],
  sonstiges:  ["Sonstiges",  "bg-gray-100 text-gray-500"],
};

const TypBadge = ({ typ }: { typ: LocationVenue["typ"] }) => {
  const [label, cls] = TYP_MAP[typ] ?? ["–", "bg-gray-100 text-gray-400"];
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>;
};

const blankForm = (): Omit<LocationVenue, "id" | "createdAt" | "updatedAt"> => ({
  name: "",
  typ: "eventlocation",
  kapazitaet: 0,
  buehnenBreite: undefined,
  buehnenTiefe: undefined,
  vorhandeneTechnik: "",
  kontaktName: undefined,
  kontaktEmail: undefined,
  kontaktTel: undefined,
  notizen: "",
  adresse: "",
});

export default function AdminLocations() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [locations, setLocations] = useState<LocationVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTyp, setFilterTyp] = useState<LocationVenue["typ"] | "alle">("alle");

  const [panel, setPanel] = useState<LocationVenue | null | "new">(null);
  const [form, setForm] = useState(blankForm());
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    const all = await locationService.getAll();
    setLocations(all);
    setLoading(false);
  };

  useEffect(() => { if (authChecked) load(); }, [authChecked]);

  const filtered = locations.filter((l) => {
    if (filterTyp !== "alle" && l.typ !== filterTyp) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openNew = () => { setForm(blankForm()); setPanel("new"); };
  const openEdit = (l: LocationVenue) => {
    setForm({ name: l.name, typ: l.typ, kapazitaet: l.kapazitaet, buehnenBreite: l.buehnenBreite, buehnenTiefe: l.buehnenTiefe, vorhandeneTechnik: l.vorhandeneTechnik, kontaktName: l.kontaktName, kontaktEmail: l.kontaktEmail, kontaktTel: l.kontaktTel, notizen: l.notizen, adresse: l.adresse });
    setPanel(l);
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    try {
      if (panel === "new") await locationService.create(form);
      else if (panel) await locationService.update((panel as LocationVenue).id, form);
      await load();
      setPanel(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (panel === "new" || !panel) return;
    if (!confirm("Location löschen?")) return;
    setDeleting(true);
    try {
      await locationService.delete((panel as LocationVenue).id);
      await load();
      setPanel(null);
    } finally { setDeleting(false); }
  };

  const inputCls = "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
  const labelCls = "text-xs text-muted-foreground mb-1 block";

  if (!authChecked) return null;

  return (
    <AdminLayout title="Locations" subtitle="Veranstaltungsorte und Venues">
      <div className="flex h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-6 py-6">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">Locations</h1>
              <p className="text-sm text-muted-foreground">{filtered.length} Venues</p>
            </div>
            <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90">
              <Plus className="w-4 h-4" />
              Neue Location
            </button>
          </div>

          <div className="flex gap-3 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Suchen…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-xl border border-border/30 bg-background text-sm focus:outline-none" />
            </div>
            <select value={filterTyp} onChange={(e) => setFilterTyp(e.target.value as LocationVenue["typ"] | "alle")} className="px-3 py-2 rounded-xl border border-border/30 bg-background text-sm focus:outline-none">
              <option value="alle">Alle Typen</option>
              {Object.entries(TYP_MAP).map(([v, [l]]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <MapPin className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">Noch keine Locations angelegt</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((l) => (
                <button key={l.id} onClick={() => openEdit(l)} className="text-left rounded-2xl border border-border/20 bg-muted/5 p-5 hover:bg-muted/20 hover:border-border/40 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-teal-600" />
                    </div>
                    <TypBadge typ={l.typ} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{l.name}</h3>
                  {l.adresse && <p className="text-xs text-muted-foreground mb-3 truncate">{l.adresse}</p>}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {l.kapazitaet > 0 && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{l.kapazitaet} Pers.</span>}
                    {l.buehnenBreite && <span>{l.buehnenBreite}×{l.buehnenTiefe}m Bühne</span>}
                  </div>
                  {l.kontaktName && <p className="text-xs text-muted-foreground mt-2">Kontakt: {l.kontaktName}</p>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Panel ── */}
        {panel && (
          <>
            <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setPanel(null)} />
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border/20 shadow-2xl z-40 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
                <h2 className="font-semibold text-sm">{panel === "new" ? "Neue Location" : "Location bearbeiten"}</h2>
                <button onClick={() => setPanel(null)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground"><X className="w-4 h-4" /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="z.B. Schloss Heidelberg" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Typ</label>
                    <select value={form.typ} onChange={(e) => setForm(f => ({ ...f, typ: e.target.value as LocationVenue["typ"] }))} className={inputCls}>
                      {Object.entries(TYP_MAP).map(([v, [l]]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Kapazität (Personen)</label>
                    <input type="number" value={form.kapazitaet} onChange={(e) => setForm(f => ({ ...f, kapazitaet: parseInt(e.target.value) || 0 }))} className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Adresse</label>
                  <input value={form.adresse} onChange={(e) => setForm(f => ({ ...f, adresse: e.target.value }))} className={inputCls} placeholder="Straße, PLZ Ort" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Bühnenbreite (m)</label>
                    <input type="number" step="0.1" value={form.buehnenBreite ?? ""} onChange={(e) => setForm(f => ({ ...f, buehnenBreite: e.target.value ? parseFloat(e.target.value) : undefined }))} className={inputCls} placeholder="z.B. 6" />
                  </div>
                  <div>
                    <label className={labelCls}>Bühnentiefe (m)</label>
                    <input type="number" step="0.1" value={form.buehnenTiefe ?? ""} onChange={(e) => setForm(f => ({ ...f, buehnenTiefe: e.target.value ? parseFloat(e.target.value) : undefined }))} className={inputCls} placeholder="z.B. 4" />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Vorhandene Technik</label>
                  <textarea value={form.vorhandeneTechnik} onChange={(e) => setForm(f => ({ ...f, vorhandeneTechnik: e.target.value }))} rows={2} className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none resize-none" placeholder="Licht, Ton, Beamer…" />
                </div>
                <div className="border-t border-border/20 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Kontakt</p>
                  <div className="space-y-3">
                    <div>
                      <label className={labelCls}>Name</label>
                      <input value={form.kontaktName ?? ""} onChange={(e) => setForm(f => ({ ...f, kontaktName: e.target.value || undefined }))} className={inputCls} placeholder="Ansprechpartner" />
                    </div>
                    <div>
                      <label className={labelCls}>E-Mail</label>
                      <input type="email" value={form.kontaktEmail ?? ""} onChange={(e) => setForm(f => ({ ...f, kontaktEmail: e.target.value || undefined }))} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Telefon</label>
                      <input value={form.kontaktTel ?? ""} onChange={(e) => setForm(f => ({ ...f, kontaktTel: e.target.value || undefined }))} className={inputCls} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Notizen</label>
                  <textarea value={form.notizen} onChange={(e) => setForm(f => ({ ...f, notizen: e.target.value }))} rows={3} className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none resize-none" placeholder="Besonderheiten, Parkplatz, Zugang…" />
                </div>
              </div>

              <div className="px-5 py-4 border-t border-border/20 flex gap-2">
                {panel !== "new" && (
                  <button onClick={handleDelete} disabled={deleting} className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 disabled:opacity-50">
                    {deleting ? "…" : "Löschen"}
                  </button>
                )}
                <button onClick={() => setPanel(null)} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">Abbrechen</button>
                <button onClick={handleSave} disabled={saving || !form.name} className="flex-1 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50">
                  {saving ? "Speichere…" : "Speichern"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
