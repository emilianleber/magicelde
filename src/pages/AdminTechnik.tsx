import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, X, Wrench, Trash2, Save, Package } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface TechnikItem {
  id: string;
  name: string;
  kategorie: string;
  menge: number;
  status: string;
  notizen: string;
  createdAt: string;
}

const KATEGORIEN = ["Licht", "Ton", "Requisiten", "Bühne", "Transport", "Kabel/Adapter", "Sonstiges"];
const STATUS_OPTIONS = ["verfügbar", "in_reparatur", "verliehen", "bestellt"];
const STATUS_LABELS: Record<string, string> = { "verfügbar": "Verfügbar", "in_reparatur": "In Reparatur", "verliehen": "Verliehen", "bestellt": "Bestellt" };
const STATUS_COLORS: Record<string, string> = { "verfügbar": "bg-green-100 text-green-700", "in_reparatur": "bg-amber-100 text-amber-700", "verliehen": "bg-blue-100 text-blue-700", "bestellt": "bg-purple-100 text-purple-700" };

// ── Main Component ───────────────────────────────────────────────────────────

const AdminTechnik = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<TechnikItem[]>([]);
  const [search, setSearch] = useState("");
  const [katFilter, setKatFilter] = useState("Alle");

  // Panel
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", kategorie: "Requisiten", menge: 1, status: "verfügbar", notizen: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else loadData();
    });
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    const { data } = await supabase.from("technik_inventar").select("*").order("name");
    setItems((data || []).map((r: any) => ({
      id: r.id, name: r.name || "", kategorie: r.kategorie || "Sonstiges",
      menge: r.menge ?? 1, status: r.status || "verfügbar", notizen: r.notizen || "",
      createdAt: r.created_at,
    })));
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    const payload = { name: form.name.trim(), kategorie: form.kategorie, menge: form.menge, status: form.status, notizen: form.notizen.trim() };
    if (editingId) {
      await supabase.from("technik_inventar").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editingId);
    } else {
      await supabase.from("technik_inventar").insert(payload);
    }
    setPanelOpen(false);
    setEditingId(null);
    await loadData();
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" wirklich löschen?`)) return;
    await supabase.from("technik_inventar").delete().eq("id", id);
    await loadData();
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ name: "", kategorie: "Requisiten", menge: 1, status: "verfügbar", notizen: "" });
    setPanelOpen(true);
  };

  const openEdit = (t: TechnikItem) => {
    setEditingId(t.id);
    setForm({ name: t.name, kategorie: t.kategorie, menge: t.menge, status: t.status, notizen: t.notizen });
    setPanelOpen(true);
  };

  const filtered = items.filter(t => {
    if (katFilter !== "Alle" && t.kategorie !== katFilter) return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const inputCls = "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelCls = "block text-[10px] uppercase tracking-widest text-muted-foreground mb-1";

  if (loading) return <AdminLayout title="Technik-Inventar" subtitle=""><div className="text-center py-20 text-muted-foreground text-sm">Wird geladen…</div></AdminLayout>;

  return (
    <AdminLayout
      title="Technik-Inventar"
      subtitle={`${items.length} Gegenstände`}
      actions={
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80">
          <Plus className="w-4 h-4" /> Neues Equipment
        </button>
      }
    >
      {/* Filter */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Suchen…"
            className="w-full rounded-xl bg-muted/30 border border-border/20 pl-9 pr-3 py-2 text-sm" />
        </div>
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto">
          {["Alle", ...KATEGORIEN].map(k => (
            <button key={k} onClick={() => setKatFilter(k)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${katFilter === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Package className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Kein Equipment gefunden</p>
          <button onClick={openNew} className="mt-3 text-xs text-accent font-medium hover:text-accent/80">+ Equipment hinzufügen</button>
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map(t => (
            <div key={t.id} onClick={() => openEdit(t)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/20 cursor-pointer group transition-colors">
              <Wrench className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{t.name}</p>
                {t.notizen && <p className="text-xs text-muted-foreground truncate">{t.notizen}</p>}
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground shrink-0">{t.kategorie}</span>
              <span className="text-xs text-muted-foreground shrink-0">{t.menge}×</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[t.status] || "bg-gray-100 text-gray-500"}`}>
                {STATUS_LABELS[t.status] || t.status}
              </span>
              <button onClick={e => { e.stopPropagation(); handleDelete(t.id, t.name); }}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted-foreground hover:text-destructive transition-opacity">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Slide-in Panel */}
      {panelOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setPanelOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background border-l border-border/30 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${panelOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
          <h2 className="text-base font-bold">{editingId ? "Equipment bearbeiten" : "Neues Equipment"}</h2>
          <button onClick={() => setPanelOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div><label className={labelCls}>Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="z.B. LED-Spot" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Kategorie</label><select value={form.kategorie} onChange={e => setForm(f => ({ ...f, kategorie: e.target.value }))} className={inputCls}>
              {KATEGORIEN.map(k => <option key={k}>{k}</option>)}
            </select></div>
            <div><label className={labelCls}>Menge</label><input type="number" min={0} value={form.menge} onChange={e => setForm(f => ({ ...f, menge: parseInt(e.target.value) || 0 }))} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Status</label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map(s => (
                <button key={s} type="button" onClick={() => setForm(f => ({ ...f, status: s }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${form.status === s ? "bg-foreground text-background border-foreground" : "border-border/30 text-muted-foreground"}`}>
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div><label className={labelCls}>Notizen</label><textarea value={form.notizen} onChange={e => setForm(f => ({ ...f, notizen: e.target.value }))} className={`${inputCls} resize-none`} rows={3} /></div>
        </div>
        <div className="px-5 py-4 border-t border-border/20">
          <button onClick={handleSave} disabled={saving || !form.name.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-80 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Speichert…" : editingId ? "Speichern" : "Anlegen"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTechnik;
