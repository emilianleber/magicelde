import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { showService } from "@/services/showService";
import { effekteService } from "@/services/effekteService";
import type { Show, ShowFormat, ShowStatus, ShowPhase, Effekt } from "@/types/productions";
import { Plus, X, Pencil, Trash2, Video, GripVertical, Clock, Wand2, ChevronDown, ChevronUp } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Helpers ────────────────────────────────────────────────────────────────────

const FORMAT_LABELS: Record<ShowFormat, string> = {
  buehnenshow: "Bühnenshow",
  closeup: "Close-Up",
  magic_dinner: "Magic Dinner",
  walking_act: "Walking Act",
  hybrid: "Hybrid",
};

const FORMAT_COLORS: Record<ShowFormat, string> = {
  buehnenshow: "bg-purple-50 text-purple-700",
  closeup: "bg-blue-50 text-blue-700",
  magic_dinner: "bg-orange-50 text-orange-700",
  walking_act: "bg-green-50 text-green-700",
  hybrid: "bg-pink-50 text-pink-700",
};

const STATUS_LABELS: Record<ShowStatus, string> = {
  entwurf: "Entwurf",
  aktiv: "Aktiv",
  archiv: "Archiv",
};

const STATUS_COLORS: Record<ShowStatus, string> = {
  entwurf: "bg-yellow-50 text-yellow-700",
  aktiv: "bg-green-50 text-green-700",
  archiv: "bg-muted/60 text-muted-foreground",
};

const PHASE_TYPES = [
  { value: "empfang", label: "Empfang" },
  { value: "akt1", label: "Akt 1" },
  { value: "pause", label: "Pause" },
  { value: "akt2", label: "Akt 2" },
  { value: "finale", label: "Finale" },
  { value: "gang1", label: "Gang 1" },
  { value: "gang2", label: "Gang 2" },
  { value: "gang3", label: "Gang 3" },
  { value: "gang4", label: "Gang 4" },
] as const;

const EFFEKT_TYP_LABELS: Record<string, string> = {
  closeup: "Close-Up",
  buehne: "Bühne",
  beides: "Beides",
};

const FormatBadge = ({ format }: { format: ShowFormat }) => (
  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FORMAT_COLORS[format]}`}>
    {FORMAT_LABELS[format]}
  </span>
);

const StatusBadge = ({ status }: { status: ShowStatus }) => (
  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[status]}`}>
    {STATUS_LABELS[status]}
  </span>
);

const inputCls =
  "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelCls = "block text-xs font-semibold text-foreground mb-1.5";

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  format: ShowFormat;
  status: ShowStatus;
  anlass: string;
  zieldauer: number;
  konzeptKundentext: string;
  technischeAnforderungen: string;
}

const defaultForm: FormState = {
  name: "",
  format: "buehnenshow",
  status: "entwurf",
  anlass: "",
  zieldauer: 60,
  konzeptKundentext: "",
  technischeAnforderungen: "",
};

type FilterTab = "alle" | ShowStatus;

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "entwurf", label: "Entwurf" },
  { value: "aktiv", label: "Aktiv" },
  { value: "archiv", label: "Archiv" },
];

// ── Sortable Phase Item ───────────────────────────────────────────────────────

function SortablePhaseItem({
  phase,
  index,
  effekte,
  onRemove,
  onUpdate,
  onRemoveEffekt,
  onAddEffekt,
  expanded,
  onToggle,
}: {
  phase: ShowPhase & { _id: string };
  index: number;
  effekte: Effekt[];
  onRemove: () => void;
  onUpdate: (p: Partial<ShowPhase>) => void;
  onRemoveEffekt: (effektId: string) => void;
  onAddEffekt: (effektId: string) => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: phase._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const phaseEffekte = phase.effektIds
    .map((id) => effekte.find((e) => e.id === id))
    .filter(Boolean) as Effekt[];

  const totalDauer = phaseEffekte.reduce((s, e) => s + e.dauer, 0);

  return (
    <div ref={setNodeRef} style={style} className="rounded-xl border border-border/30 bg-white overflow-hidden">
      {/* Phase header */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/20">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-0.5">
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-bold text-muted-foreground w-5">{index + 1}</span>
        <input
          value={phase.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          placeholder="Phasenname"
          className="flex-1 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/40"
        />
        <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
          <Clock className="w-3 h-3" />{totalDauer} min
        </span>
        <span className="text-[10px] text-muted-foreground/60 shrink-0">{phaseEffekte.length} Effekte</span>
        <button onClick={onToggle} className="p-1 rounded hover:bg-muted/60 text-muted-foreground">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        <button onClick={onRemove} className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded: Effekte list + add */}
      {expanded && (
        <div className="px-3 py-2 space-y-1.5 border-t border-border/20">
          {/* Phase type selector */}
          <select
            value={phase.typ}
            onChange={(e) => onUpdate({ typ: e.target.value as ShowPhase["typ"] })}
            className="w-full rounded-lg bg-muted/30 border border-border/20 px-2.5 py-1.5 text-xs text-muted-foreground"
          >
            {PHASE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>

          {/* Effekte in this phase */}
          {phaseEffekte.length === 0 ? (
            <p className="text-[11px] text-muted-foreground/50 py-1 italic">Keine Effekte – ziehe oder wähle Effekte aus der Liste</p>
          ) : (
            phaseEffekte.map((eff) => (
              <div key={eff.id} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-accent/5 border border-accent/10">
                <Wand2 className="w-3 h-3 text-accent shrink-0" />
                <span className="text-xs font-medium text-foreground flex-1 truncate">{eff.name}</span>
                <span className="text-[10px] text-muted-foreground shrink-0">{eff.dauer} min</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 ${
                  eff.typ === "closeup" ? "bg-blue-50 text-blue-600" :
                  eff.typ === "buehne" ? "bg-purple-50 text-purple-600" :
                  "bg-gray-50 text-gray-600"
                }`}>{EFFEKT_TYP_LABELS[eff.typ]}</span>
                <button onClick={() => onRemoveEffekt(eff.id)} className="p-0.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))
          )}

          {/* Quick add effekt dropdown */}
          <select
            value=""
            onChange={(e) => {
              if (e.target.value) onAddEffekt(e.target.value);
            }}
            className="w-full rounded-lg bg-muted/30 border border-border/20 px-2.5 py-1.5 text-xs text-muted-foreground"
          >
            <option value="">+ Effekt hinzufügen…</option>
            {effekte
              .filter((e) => e.status === "aktiv" && !phase.effektIds.includes(e.id))
              .map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.dauer} min · {EFFEKT_TYP_LABELS[e.typ]})
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const AdminShows = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState<Show[]>([]);
  const [effekte, setEffekte] = useState<Effekt[]>([]);

  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("alle");

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState<FormState>(defaultForm);
  const [phasen, setPhasen] = useState<(ShowPhase & { _id: string })[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ── Auth + Load ────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
      loadData();
    });
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [showsData, effekteData] = await Promise.all([
        showService.getAll(),
        effekteService.getAll(),
      ]);
      setShows(showsData);
      setEffekte(effekteData);
    } catch {}
    setLoading(false);
  };

  // ── Filtered list ──────────────────────────────────────────────────────────

  const filtered = shows.filter((s) => {
    if (filterTab !== "alle" && s.status !== filterTab) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // ── Panel helpers ──────────────────────────────────────────────────────────

  const openNew = () => {
    setSelectedShow(null);
    setIsNew(true);
    setForm(defaultForm);
    setPhasen([]);
    setExpandedPhase(null);
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const openEdit = (s: Show) => {
    setSelectedShow(s);
    setIsNew(false);
    setForm({
      name: s.name,
      format: s.format,
      status: s.status,
      anlass: s.anlass,
      zieldauer: s.zieldauer,
      konzeptKundentext: s.konzeptKundentext,
      technischeAnforderungen: s.technischeAnforderungen,
    });
    setPhasen((s.phasen || []).map((p, i) => ({ ...p, _id: `phase-${i}-${Date.now()}` })));
    setExpandedPhase(null);
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const closePanel = () => { setPanelOpen(false); setSelectedShow(null); };

  // ── Phase management ───────────────────────────────────────────────────────

  const addPhase = () => {
    const newPhase: ShowPhase & { _id: string } = {
      _id: `phase-${Date.now()}`,
      label: `Phase ${phasen.length + 1}`,
      typ: "akt1",
      effektIds: [],
    };
    setPhasen((prev) => [...prev, newPhase]);
    setExpandedPhase(newPhase._id);
  };

  const removePhase = (id: string) => {
    setPhasen((prev) => prev.filter((p) => p._id !== id));
    if (expandedPhase === id) setExpandedPhase(null);
  };

  const updatePhase = (id: string, updates: Partial<ShowPhase>) => {
    setPhasen((prev) => prev.map((p) => p._id === id ? { ...p, ...updates } : p));
  };

  const addEffektToPhase = (phaseId: string, effektId: string) => {
    setPhasen((prev) => prev.map((p) =>
      p._id === phaseId ? { ...p, effektIds: [...p.effektIds, effektId] } : p
    ));
  };

  const removeEffektFromPhase = (phaseId: string, effektId: string) => {
    setPhasen((prev) => prev.map((p) =>
      p._id === phaseId ? { ...p, effektIds: p.effektIds.filter((id) => id !== effektId) } : p
    ));
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPhasen((prev) => {
        const oldIndex = prev.findIndex((p) => p._id === active.id);
        const newIndex = prev.findIndex((p) => p._id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  // ── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name.trim()) {
      setPanelMsg({ type: "err", text: "Name ist erforderlich." });
      return;
    }
    setSaving(true);
    setPanelMsg(null);
    try {
      // Strip _id from phasen for storage
      const cleanPhasen: ShowPhase[] = phasen.map(({ _id, ...rest }) => rest);

      const payload = {
        name: form.name.trim(),
        format: form.format,
        status: form.status,
        anlass: form.anlass.trim(),
        zieldauer: form.zieldauer,
        konzeptKundentext: form.konzeptKundentext.trim(),
        technischeAnforderungen: form.technischeAnforderungen.trim(),
        phasen: cleanPhasen,
      };

      if (isNew) {
        const created = await showService.create(payload);
        setShows((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
        setPanelMsg({ type: "ok", text: "Konzept angelegt." });
        setSelectedShow(created);
        setIsNew(false);
      } else if (selectedShow) {
        const updated = await showService.update(selectedShow.id, payload);
        setShows((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        setSelectedShow(updated);
        setPanelMsg({ type: "ok", text: "Gespeichert." });
      }
    } catch (err: unknown) {
      setPanelMsg({ type: "err", text: err instanceof Error ? err.message : "Fehler beim Speichern." });
    }
    setSaving(false);
  };

  // ── Delete ──────────────────────────────────────────────────────────────────

  const handleDelete = async (show: Show) => {
    if (!window.confirm(`"${show.name}" wirklich löschen?`)) return;
    setSaving(true);
    try {
      await showService.delete(show.id);
      setShows((prev) => prev.filter((s) => s.id !== show.id));
      closePanel();
    } catch (err: unknown) {
      setPanelMsg({ type: "err", text: err instanceof Error ? err.message : "Fehler beim Löschen." });
    }
    setSaving(false);
  };

  // ── Computed ────────────────────────────────────────────────────────────────

  const totalEffektDauer = phasen.reduce((sum, p) => {
    return sum + p.effektIds.reduce((s, id) => {
      const e = effekte.find((ef) => ef.id === id);
      return s + (e?.dauer || 0);
    }, 0);
  }, 0);

  // ── Early returns ──────────────────────────────────────────────────────────

  if (loading) {
    return <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen…</div>;
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Konzepte"
      subtitle="Show-Konzepte und Abläufe"
      actions={
        <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity">
          <Plus className="w-4 h-4" /> Neues Konzept
        </button>
      }
    >
      {/* Search */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Konzept suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-muted/40 border border-border/30 pl-4 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 mb-5 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === tab.value ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty / List */}
      {shows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Video className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Noch kein Konzept angelegt</p>
          <button onClick={openNew} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity">
            <Plus className="w-4 h-4" /> Erstes Konzept anlegen
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">Keine Konzepte gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              onClick={() => openEdit(s)}
              className="relative p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all flex flex-col gap-3 cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-foreground leading-tight line-clamp-2 flex-1">{s.name}</p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(s); }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <FormatBadge format={s.format} />
                <StatusBadge status={s.status} />
                {s.phasen?.length > 0 && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    {s.phasen.length} Phasen
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {s.anlass && <span><span className="font-medium text-foreground/70">Anlass:</span> {s.anlass}</span>}
                <span><span className="font-medium text-foreground/70">Dauer:</span> {s.zieldauer} min</span>
              </div>
              {s.konzeptKundentext && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{s.konzeptKundentext}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Panel overlay */}
      {panelOpen && <div className="fixed inset-0 bg-black/20 z-40" onClick={closePanel} />}

      {/* ── WIDE SLIDE-IN PANEL ── */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[720px] bg-background border-l border-border/30 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
        panelOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {isNew ? "Neues Konzept" : "Konzept bearbeiten"}
            </p>
            <h2 className="text-base font-bold text-foreground leading-tight">{isNew ? "Konzept anlegen" : form.name || "…"}</h2>
          </div>
          <button onClick={closePanel} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row min-h-full">

            {/* LEFT: Form fields */}
            <div className="flex-1 px-5 py-5 space-y-4 border-b lg:border-b-0 lg:border-r border-border/20">
              <div>
                <label className={labelCls}>Name <span className="text-destructive">*</span></label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="z.B. Große Bühnenshow Gala" className={inputCls} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Format</label>
                  <select value={form.format} onChange={(e) => setForm((f) => ({ ...f, format: e.target.value as ShowFormat }))} className={inputCls}>
                    {(Object.keys(FORMAT_LABELS) as ShowFormat[]).map((v) => <option key={v} value={v}>{FORMAT_LABELS[v]}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Status</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ShowStatus }))} className={inputCls}>
                    <option value="entwurf">Entwurf</option>
                    <option value="aktiv">Aktiv</option>
                    <option value="archiv">Archiv</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Anlass</label>
                  <input type="text" value={form.anlass} onChange={(e) => setForm((f) => ({ ...f, anlass: e.target.value }))} placeholder="Hochzeit, Firmenfeier" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Zieldauer (Min.)</label>
                  <input type="number" min={0} value={form.zieldauer} onChange={(e) => setForm((f) => ({ ...f, zieldauer: Math.max(0, parseInt(e.target.value) || 0) }))} className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Konzept Kundentext</label>
                <textarea value={form.konzeptKundentext} onChange={(e) => setForm((f) => ({ ...f, konzeptKundentext: e.target.value }))} rows={3} placeholder="Beschreibung für den Kunden…" className={`${inputCls} resize-none`} />
              </div>

              <div>
                <label className={labelCls}>Technische Anforderungen</label>
                <textarea value={form.technischeAnforderungen} onChange={(e) => setForm((f) => ({ ...f, technischeAnforderungen: e.target.value }))} rows={2} placeholder="Bühne, Licht, Ton…" className={`${inputCls} resize-none`} />
              </div>
            </div>

            {/* RIGHT: Phase Editor (Drag & Drop) */}
            <div className="w-full lg:w-[320px] shrink-0 px-5 py-5 space-y-3 bg-muted/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Ablauf</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {phasen.length} Phasen · {totalEffektDauer} min Effekte
                  </p>
                </div>
                <button
                  onClick={addPhase}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80"
                >
                  <Plus className="w-3.5 h-3.5" /> Phase
                </button>
              </div>

              {phasen.length === 0 ? (
                <div className="p-6 rounded-xl border-2 border-dashed border-border/30 text-center">
                  <p className="text-xs text-muted-foreground mb-2">Noch keine Phasen</p>
                  <button
                    onClick={addPhase}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Erste Phase hinzufügen
                  </button>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={phasen.map((p) => p._id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {phasen.map((phase, idx) => (
                        <SortablePhaseItem
                          key={phase._id}
                          phase={phase}
                          index={idx}
                          effekte={effekte}
                          expanded={expandedPhase === phase._id}
                          onToggle={() => setExpandedPhase(expandedPhase === phase._id ? null : phase._id)}
                          onRemove={() => removePhase(phase._id)}
                          onUpdate={(updates) => updatePhase(phase._id, updates)}
                          onAddEffekt={(effektId) => addEffektToPhase(phase._id, effektId)}
                          onRemoveEffekt={(effektId) => removeEffektFromPhase(phase._id, effektId)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>
        </div>

        {/* Panel footer */}
        <div className="shrink-0 px-5 py-4 border-t border-border/20 flex items-center gap-2">
          {panelMsg && (
            <div className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium ${
              panelMsg.type === "ok" ? "bg-green-50 text-green-700" : "bg-destructive/5 text-destructive"
            }`}>
              {panelMsg.text}
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-2.5 text-sm font-bold hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Speichert…" : isNew ? "Anlegen" : "Speichern"}
          </button>
          {!isNew && selectedShow && (
            <button
              onClick={() => handleDelete(selectedShow)}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminShows;
