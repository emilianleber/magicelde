import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, X, Music, Clock, Trash2, Pencil, Save } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface MusikEntry {
  id: string;
  titel: string;
  kuenstler: string;
  dauer: number; // seconds
  kategorie: string;
  gemaNr: string;
  link: string;
  notizen: string;
  createdAt: string;
}

const KATEGORIEN = ["Einspieler", "Hintergrundmusik", "Showmusik", "Soundeffekt", "Sonstiges"];

const formatDauer = (sec: number) => {
  if (!sec) return "–";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

// ── Main Component ───────────────────────────────────────────────────────────

const AdminMusik = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<MusikEntry[]>([]);
  const [search, setSearch] = useState("");
  const [katFilter, setKatFilter] = useState("Alle");

  // Panel
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ titel: "", kuenstler: "", dauer: 0, kategorie: "Einspieler", gemaNr: "", link: "", notizen: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else loadData();
    });
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    const { data } = await supabase.from("musik_bibliothek").select("*").order("titel");
    setTracks((data || []).map((r: any) => ({
      id: r.id, titel: r.titel || "", kuenstler: r.kuenstler || "", dauer: r.dauer || 0,
      kategorie: r.kategorie || "Sonstiges", gemaNr: r.gema_nr || "", link: r.link || "",
      notizen: r.notizen || "", createdAt: r.created_at,
    })));
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.titel.trim()) return;
    setSaving(true);
    const payload = {
      titel: form.titel.trim(), kuenstler: form.kuenstler.trim(), dauer: form.dauer,
      kategorie: form.kategorie, gema_nr: form.gemaNr.trim(), link: form.link.trim(),
      notizen: form.notizen.trim(),
    };
    if (editingId) {
      await supabase.from("musik_bibliothek").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", editingId);
    } else {
      await supabase.from("musik_bibliothek").insert(payload);
    }
    setPanelOpen(false);
    setEditingId(null);
    await loadData();
    setSaving(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" wirklich löschen?`)) return;
    await supabase.from("musik_bibliothek").delete().eq("id", id);
    await loadData();
  };

  const openNew = () => {
    setEditingId(null);
    setForm({ titel: "", kuenstler: "", dauer: 0, kategorie: "Einspieler", gemaNr: "", link: "", notizen: "" });
    setPanelOpen(true);
  };

  const openEdit = (t: MusikEntry) => {
    setEditingId(t.id);
    setForm({ titel: t.titel, kuenstler: t.kuenstler, dauer: t.dauer, kategorie: t.kategorie, gemaNr: t.gemaNr, link: t.link, notizen: t.notizen });
    setPanelOpen(true);
  };

  const filtered = tracks.filter(t => {
    if (katFilter !== "Alle" && t.kategorie !== katFilter) return false;
    if (search && !t.titel.toLowerCase().includes(search.toLowerCase()) && !t.kuenstler.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const inputCls = "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelCls = "block text-[10px] uppercase tracking-widest text-muted-foreground mb-1";

  if (loading) return <AdminLayout title="Musik & Einspieler" subtitle=""><div className="text-center py-20 text-muted-foreground text-sm">Wird geladen…</div></AdminLayout>;

  return (
    <AdminLayout
      title="Musik & Einspieler"
      subtitle={`${tracks.length} Tracks`}
      actions={
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80">
          <Plus className="w-4 h-4" /> Neuer Track
        </button>
      }
    >
      {/* Filter */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Suchen…"
            className="w-full rounded-xl bg-muted/30 border border-border/20 pl-9 pr-3 py-2 text-sm" />
        </div>
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1">
          {["Alle", ...KATEGORIEN].map(k => (
            <button key={k} onClick={() => setKatFilter(k)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${katFilter === k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Music className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Keine Tracks gefunden</p>
          <button onClick={openNew} className="mt-3 text-xs text-accent font-medium hover:text-accent/80">+ Track hinzufügen</button>
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map(t => (
            <div key={t.id} onClick={() => openEdit(t)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/20 cursor-pointer group transition-colors">
              <Music className="w-4 h-4 text-accent shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{t.titel}</p>
                <p className="text-xs text-muted-foreground truncate">{t.kuenstler || "Unbekannt"}{t.gemaNr ? ` · GEMA: ${t.gemaNr}` : ""}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground shrink-0">{t.kategorie}</span>
              <span className="text-xs text-muted-foreground tabular-nums shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {formatDauer(t.dauer)}
              </span>
              <button onClick={e => { e.stopPropagation(); handleDelete(t.id, t.titel); }}
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
          <h2 className="text-base font-bold">{editingId ? "Track bearbeiten" : "Neuer Track"}</h2>
          <button onClick={() => setPanelOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div><label className={labelCls}>Titel *</label><input value={form.titel} onChange={e => setForm(f => ({ ...f, titel: e.target.value }))} className={inputCls} placeholder="z.B. Show-Intro" /></div>
          <div><label className={labelCls}>Künstler</label><input value={form.kuenstler} onChange={e => setForm(f => ({ ...f, kuenstler: e.target.value }))} className={inputCls} placeholder="z.B. Hans Zimmer" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Dauer (Sek.)</label><input type="number" value={form.dauer || ""} onChange={e => setForm(f => ({ ...f, dauer: parseInt(e.target.value) || 0 }))} className={inputCls} min={0} /></div>
            <div><label className={labelCls}>Kategorie</label><select value={form.kategorie} onChange={e => setForm(f => ({ ...f, kategorie: e.target.value }))} className={inputCls}>
              {KATEGORIEN.map(k => <option key={k}>{k}</option>)}
            </select></div>
          </div>
          <div><label className={labelCls}>GEMA-Nr.</label><input value={form.gemaNr} onChange={e => setForm(f => ({ ...f, gemaNr: e.target.value }))} className={inputCls} placeholder="Optional" /></div>
          <div><label className={labelCls}>Link / URL</label><input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className={inputCls} placeholder="z.B. Spotify, YouTube…" /></div>
          <div><label className={labelCls}>Notizen</label><textarea value={form.notizen} onChange={e => setForm(f => ({ ...f, notizen: e.target.value }))} className={`${inputCls} resize-none`} rows={3} /></div>
        </div>
        <div className="px-5 py-4 border-t border-border/20">
          <button onClick={handleSave} disabled={saving || !form.titel.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-80 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Speichert…" : editingId ? "Speichern" : "Anlegen"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMusik;
