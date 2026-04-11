import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import type { Show } from "@/types/productions";
import {
  Plus,
  Search,
  X,
  Clock,
  Layers,
  Wand2,
  Video,
  Pencil,
  Trash2,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const FORMAT_OPTIONS = [
  { value: "abendshow", label: "Bühnenshow / Abendshow" },
  { value: "close-up", label: "Close-Up" },
  { value: "magic-dinner", label: "Magic Dinner" },
  { value: "workshop", label: "Workshop" },
] as const;

const FORMAT_LABELS: Record<string, string> = {
  abendshow: "Bühnenshow",
  "close-up": "Close-Up",
  "magic-dinner": "Magic Dinner",
  tourshow: "Tourshow",
  kundenbuchung: "Kundenbuchung",
  workshop: "Workshop",
};

const FORMAT_COLORS: Record<string, string> = {
  abendshow: "bg-purple-50 text-purple-700",
  "close-up": "bg-blue-50 text-blue-700",
  "magic-dinner": "bg-orange-50 text-orange-700",
  tourshow: "bg-cyan-50 text-cyan-700",
  kundenbuchung: "bg-green-50 text-green-700",
  workshop: "bg-amber-50 text-amber-700",
};

const STATUS_LABELS: Record<string, string> = {
  entwurf: "Entwurf",
  aktiv: "Aktiv",
  archiv: "Archiv",
};

const STATUS_COLORS: Record<string, string> = {
  entwurf: "bg-yellow-50 text-yellow-700",
  aktiv: "bg-green-50 text-green-700",
  archiv: "bg-muted/60 text-muted-foreground",
};

const inputCls =
  "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelCls = "block text-xs font-semibold text-foreground mb-1.5";

// ── Badges ────────────────────────────────────────────────────────────────────

const FormatBadge = ({ format }: { format: string }) => (
  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FORMAT_COLORS[format] || "bg-gray-50 text-gray-700"}`}>
    {FORMAT_LABELS[format] || format}
  </span>
);

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[status] || "bg-gray-50 text-gray-600"}`}>
    {STATUS_LABELS[status] || status}
  </span>
);

// ── Form state for new show panel ─────────────────────────────────────────────

interface CreateFormState {
  name: string;
  format: string;
  status: string;
  dauer: number;
  beschreibung: string;
}

const defaultForm: CreateFormState = {
  name: "",
  format: "abendshow",
  status: "entwurf",
  dauer: 45,
  beschreibung: "",
};

// ── Main Component ────────────────────────────────────────────────────────────

const AdminShowsList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState<Show[]>([]);

  const [search, setSearch] = useState("");
  const [filterFormat, setFilterFormat] = useState("alle");

  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState<CreateFormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // ── Auth + Load ──────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
        return;
      }
      loadData();
    });
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("shows_intern")
        .select("*")
        .order("name");
      if (error) throw error;
      setShows((data || []) as unknown as Show[]);
    } catch {
      // silent
    }
    setLoading(false);
  };

  // ── Filtered list ────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return shows.filter((s) => {
      if (filterFormat !== "alle" && s.format !== filterFormat) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [shows, filterFormat, search]);

  // ── Panel helpers ────────────────────────────────────────────────────────

  const openNew = () => {
    setForm(defaultForm);
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  // ── Save new show ────────────────────────────────────────────────────────

  const handleCreate = async () => {
    if (!form.name.trim()) {
      setPanelMsg({ type: "err", text: "Name ist erforderlich." });
      return;
    }
    setSaving(true);
    setPanelMsg(null);
    try {
      const { data, error } = await supabase
        .from("shows_intern")
        .insert({
          name: form.name.trim(),
          format: form.format,
          status: form.status,
          zieldauer: form.dauer,
          konzept_kundentext: form.beschreibung.trim(),
          phasen: [],
        })
        .select()
        .single();
      if (error) throw error;
      // Navigate to editor
      navigate(`/admin/programm/shows/${data.id}/edit`);
    } catch (err: unknown) {
      console.error("Show create error:", err);
      const msg = err instanceof Error ? err.message : (err as any)?.message || JSON.stringify(err);
      setPanelMsg({ type: "err", text: msg || "Fehler beim Anlegen." });
    }
    setSaving(false);
  };

  // ── Early returns ────────────────────────────────────────────────────────

  if (loading) {
    return <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen...</div>;
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Shows"
      subtitle={`${shows.length} Shows`}
      actions={
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Neue Show
        </button>
      }
    >
      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Show suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-muted/40 border border-border/30 pl-10 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Format filter */}
        <select
          value={filterFormat}
          onChange={(e) => setFilterFormat(e.target.value)}
          className="rounded-xl bg-muted/40 border border-border/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="alle">Alle Formate</option>
          {FORMAT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Content ── */}
      {shows.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Video className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Noch keine Shows erstellt</p>
            <p className="text-xs text-muted-foreground">Lege deine erste Show an, um zu starten.</p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Erste Show anlegen
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">Keine Shows gefunden.</p>
        </div>
      ) : (
        /* Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const phasen = (s as any).phasen || [];
            const effektIds = (s as any).effektIds || [];
            const dauer = (s as any).dauer || (s as any).zieldauer || 0;
            const beschreibung = (s as any).beschreibung || (s as any).konzeptKundentext || "";
            const phaseEffektCount = phasen.reduce(
              (sum: number, p: any) => sum + (p.effektIds?.length || 0),
              0
            );
            const totalEffects = effektIds.length || phaseEffektCount;

            return (
              <div
                key={s.id}
                onClick={() => navigate(`/admin/programm/shows/${s.id}`)}
                className="relative p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all flex flex-col gap-3 cursor-pointer group"
              >
                {/* Hover-Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/programm/shows/${s.id}/edit`); }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors" title="Bearbeiten">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={async (e) => { e.stopPropagation(); if (!confirm(`"${s.name}" wirklich löschen?`)) return; await supabase.from("shows_intern").delete().eq("id", s.id); setShows(prev => prev.filter(sh => sh.id !== s.id)); }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors" title="Löschen">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Name */}
                <p className="text-sm font-bold text-foreground leading-tight line-clamp-1 pr-16">
                  {s.name}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5">
                  <FormatBadge format={s.format} />
                  <StatusBadge status={s.status} />
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {dauer} Min.
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    {phasen.length} Phasen
                  </span>
                  {totalEffects > 0 && (
                    <span className="flex items-center gap-1">
                      <Wand2 className="w-3 h-3" />
                      {totalEffects} Effekte
                    </span>
                  )}
                </div>

                {/* Description preview */}
                {beschreibung && (
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {beschreibung}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Popup: Neue Show ── */}
      {panelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closePanel}>
          <div className="bg-background rounded-2xl shadow-2xl border border-border/30 p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Neue Show anlegen</h2>
              <button onClick={closePanel} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelCls}>Name <span className="text-destructive">*</span></label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="z.B. Große Gala-Show" className={inputCls} autoFocus onKeyDown={e => { if (e.key === "Enter" && form.name.trim()) handleCreate(); }} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Format</label>
                  <select value={form.format} onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))} className={inputCls}>
                    {FORMAT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Dauer (Min.)</label>
                  <input type="number" min={0} value={form.dauer} onChange={(e) => setForm((f) => ({ ...f, dauer: Math.max(0, parseInt(e.target.value) || 0) }))} className={inputCls} />
                </div>
              </div>

              {panelMsg && (
                <div className={`px-4 py-3 rounded-xl text-sm font-medium ${panelMsg.type === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-destructive/5 text-destructive border border-destructive/20"}`}>
                  {panelMsg.text}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-5">
              <button onClick={closePanel} className="flex-1 py-2.5 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/40">Abbrechen</button>
              <button onClick={handleCreate} disabled={saving || !form.name.trim()}
                className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:opacity-90 disabled:opacity-50"
          >
              {saving ? "Wird angelegt..." : "Show anlegen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminShowsList;
