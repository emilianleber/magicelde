import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { showService } from "@/services/showService";
import { effekteService } from "@/services/effekteService";
import type { Show, ShowPhase, Effekt } from "@/types/productions";
import {
  ArrowLeft, Plus, X, GripVertical, Clock, Wand2, Play, Save, Trash2,
  ChevronDown, ChevronUp, AlertTriangle, Music, Wrench, Copy, Search,
  UtensilsCrossed, Sparkles, Users, BookOpen, MapPin,
} from "lucide-react";
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors,
  useDroppable, useDraggable, DragOverlay, type DragEndEvent, type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Constants ────────────────────────────────────────────────────────────────

const EFFEKT_TYP_LABELS: Record<string, string> = { closeup: "Close-Up", buehne: "Bühne", beides: "Beides" };
const EFFEKT_TYP_COLORS: Record<string, string> = {
  closeup: "bg-blue-50 text-blue-600 border-blue-200",
  buehne: "bg-purple-50 text-purple-600 border-purple-200",
  beides: "bg-gray-50 text-gray-600 border-gray-200",
};

const FORMAT_OPTIONS = [
  { value: "abendshow", label: "Bühnenshow / Abendshow" },
  { value: "close-up", label: "Close-Up" },
  { value: "magic-dinner", label: "Magic Dinner" },
  { value: "tourshow", label: "Tourshow" },
  { value: "kundenbuchung", label: "Kundenbuchung" },
  { value: "workshop", label: "Workshop" },
];

const DINNER_PHASE_PRESETS = [
  { label: "Empfang / Sektempfang", typ: "empfang" as const },
  { label: "1. Gang", typ: "gang1" as const },
  { label: "2. Gang", typ: "gang2" as const },
  { label: "3. Gang", typ: "gang3" as const },
  { label: "4. Gang", typ: "gang4" as const },
  { label: "Finale / Dessert", typ: "finale" as const },
];

const BUEHNE_PHASE_PRESETS = [
  { label: "Empfang", typ: "empfang" as const },
  { label: "Akt 1", typ: "akt1" as const },
  { label: "Pause", typ: "pause" as const },
  { label: "Akt 2", typ: "akt2" as const },
  { label: "Finale", typ: "finale" as const },
];

// ── Sortable Effect Item ─────────────────────────────────────────────────────

function SortableEffektItem({ effekt, onRemove, phaseId }: { effekt: Effekt; onRemove: () => void; phaseId: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `${phaseId}__${effekt.id}` });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-border/20 group">
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground">
        <GripVertical className="w-3.5 h-3.5" />
      </button>
      <Wand2 className="w-3.5 h-3.5 text-accent shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{effekt.name}</p>
        <p className="text-[10px] text-muted-foreground">{effekt.dauer} Min.</p>
      </div>
      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${EFFEKT_TYP_COLORS[effekt.typ] || ""}`}>
        {EFFEKT_TYP_LABELS[effekt.typ] || effekt.typ}
      </span>
      <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 p-0.5 text-muted-foreground hover:text-destructive transition-opacity">
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

// ── Draggable Sidebar Effect ─────────────────────────────────────────────────

function DraggableSidebarEffekt({ effekt, onClick }: { effekt: Effekt; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `sidebar-${effekt.id}` });

  return (
    <div
      ref={setNodeRef}
      className={`w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted/40 transition-colors group cursor-grab active:cursor-grabbing ${isDragging ? "opacity-30" : ""}`}
      {...attributes}
      {...listeners}
      onClick={(e) => { e.preventDefault(); onClick(); }}
    >
      <GripVertical className="w-3 h-3 text-muted-foreground/20 group-hover:text-muted-foreground/50 shrink-0" />
      <Wand2 className="w-3 h-3 text-muted-foreground/40 group-hover:text-accent shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{effekt.name}</p>
        <p className="text-[9px] text-muted-foreground">{effekt.dauer} Min.</p>
      </div>
      <Plus className="w-3 h-3 text-muted-foreground/30 group-hover:text-accent" />
    </div>
  );
}

// ── Visual Timeline Bar ──────────────────────────────────────────────────────

function TimelineBar({ items, zieldauer }: { items: { label: string; startTime: string; dauer: number }[]; zieldauer: number }) {
  const total = Math.max(items.reduce((s, i) => s + i.dauer, 0), zieldauer, 1);
  const colors = ["bg-purple-400", "bg-blue-400", "bg-emerald-400", "bg-amber-400", "bg-pink-400", "bg-cyan-400", "bg-orange-400", "bg-indigo-400"];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <span>{items[0]?.startTime || "--:--"}</span>
        <div className="flex-1 h-8 bg-muted/20 rounded-lg overflow-hidden flex">
          {items.map((item, i) => {
            const pct = (item.dauer / total) * 100;
            if (pct <= 0) return null;
            return (
              <div
                key={i}
                className={`${colors[i % colors.length]} h-full relative group flex items-center justify-center`}
                style={{ width: `${pct}%`, minWidth: pct > 3 ? undefined : 4 }}
                title={`${item.label}: ${item.dauer} Min.`}
              >
                {pct > 8 && <span className="text-[8px] text-white font-bold truncate px-1">{item.label}</span>}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-foreground text-background text-[9px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                  {item.label} · {item.startTime} · {item.dauer} Min.
                </div>
              </div>
            );
          })}
          {/* Remaining time */}
          {(() => {
            const used = items.reduce((s, i) => s + i.dauer, 0);
            const remaining = zieldauer - used;
            if (remaining <= 0) return null;
            const pct = (remaining / total) * 100;
            return <div className="h-full bg-muted/30" style={{ width: `${pct}%` }} />;
          })()}
        </div>
        <span className="tabular-nums">{items.reduce((s, i) => s + i.dauer, 0)} Min.</span>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${colors[i % colors.length]}`} />
            <span className="text-[10px] text-muted-foreground">{item.label} ({item.dauer} Min.)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Phase Component ──────────────────────────────────────────────────────────

interface PhaseProps {
  phase: ShowPhase & { _id: string };
  idx: number;
  startTime: string;
  allEffekte: Effekt[];
  isExpanded: boolean;
  isDraggingFromSidebar: boolean;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (patch: Partial<ShowPhase>) => void;
  onAddEffekt: (effektId: string) => void;
  onRemoveEffekt: (effektId: string) => void;
  onReorderEffekte: (oldIdx: number, newIdx: number) => void;
  sensors: ReturnType<typeof useSensors>;
}

function PhaseCard({ phase, idx, startTime, allEffekte, isExpanded, isDraggingFromSidebar, onToggle, onRemove, onUpdate, onAddEffekt, onRemoveEffekt, onReorderEffekte, sensors }: PhaseProps) {
  const phaseEffekte = phase.effektIds.map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean) as Effekt[];
  const phaseDauer = phaseEffekte.reduce((s, e) => s + e.dauer, 0);
  const [musikNotiz, setMusikNotiz] = useState("");
  const [technikNotiz, setTechnikNotiz] = useState("");

  // Make phase a drop target for sidebar effects
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: `drop-phase-${phase._id}` });

  const handleEffektDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeId = String(active.id).split("__")[1];
    const overId = String(over.id).split("__")[1];
    const oldIdx = phase.effektIds.indexOf(activeId);
    const newIdx = phase.effektIds.indexOf(overId);
    if (oldIdx >= 0 && newIdx >= 0) onReorderEffekte(oldIdx, newIdx);
  }, [phase.effektIds, onReorderEffekte]);

  return (
    <div ref={setDropRef} className={`rounded-xl border-2 transition-all duration-200 bg-white overflow-hidden ${
      isOver ? "border-accent shadow-lg shadow-accent/20 scale-[1.01]" :
      isDraggingFromSidebar ? "border-accent/30 border-dashed" :
      "border-border/30"
    }`}>
      {/* Drop zone indicator */}
      {isDraggingFromSidebar && (
        <div className={`flex items-center justify-center gap-2 py-2 text-xs font-medium transition-colors ${
          isOver ? "bg-accent/15 text-accent" : "bg-accent/5 text-accent/50"
        }`}>
          <Plus className="w-3.5 h-3.5" />
          {isOver ? "Loslassen zum Hinzufügen" : "Hier ablegen"}
        </div>
      )}
      {/* Phase header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/10">
        <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab" />
        <span className="text-xs font-mono text-accent font-bold w-12">{startTime}</span>
        <input
          value={phase.label}
          onChange={e => onUpdate({ label: e.target.value })}
          className="flex-1 bg-transparent text-sm font-semibold text-foreground outline-none"
          placeholder="Phasenname"
        />
        <span className="text-[10px] text-muted-foreground">{phaseDauer} Min. · {phaseEffekte.length} Effekte</span>
        <button onClick={onToggle} className="p-1 text-muted-foreground hover:text-foreground">
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
        <button onClick={onRemove} className="p-1 text-muted-foreground hover:text-destructive">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border/10">
          {/* Effekte mit Drag&Drop Sortierung */}
          <div className="px-4 py-3 space-y-2">
            {phaseEffekte.length === 0 ? (
              <p className="text-xs text-muted-foreground/50 italic py-2">Effekte aus der Sidebar hinzufügen oder unten auswählen</p>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleEffektDragEnd}>
                <SortableContext items={phase.effektIds.map(eid => `${phase._id}__${eid}`)} strategy={verticalListSortingStrategy}>
                  {phaseEffekte.map(eff => (
                    <SortableEffektItem key={eff.id} effekt={eff} phaseId={phase._id} onRemove={() => onRemoveEffekt(eff.id)} />
                  ))}
                </SortableContext>
              </DndContext>
            )}

            {/* Quick-Add Dropdown */}
            <select
              value=""
              onChange={e => { if (e.target.value) onAddEffekt(e.target.value); }}
              className="w-full rounded-lg bg-muted/20 border border-border/20 px-3 py-1.5 text-xs text-muted-foreground"
            >
              <option value="">+ Effekt hinzufügen…</option>
              {allEffekte.filter(e => e.status === "aktiv").map(e => (
                <option key={e.id} value={e.id}>{e.name} ({e.dauer} Min. · {EFFEKT_TYP_LABELS[e.typ]})</option>
              ))}
            </select>
          </div>

          {/* Musik & Technik Notizen */}
          <div className="px-4 pb-3 grid grid-cols-2 gap-3 border-t border-border/10 pt-3">
            <div>
              <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                <Music className="w-3 h-3" /> Musik
              </label>
              <input
                placeholder="Song / Playlist…"
                value={musikNotiz}
                onChange={e => setMusikNotiz(e.target.value)}
                className="w-full rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                <Wrench className="w-3 h-3" /> Technik
              </label>
              <input
                placeholder="Licht, Ton, Requisiten…"
                value={technikNotiz}
                onChange={e => setTechnikNotiz(e.target.value)}
                className="w-full rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5 text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Main Component ───────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

const AdminShowEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allEffekte, setAllEffekte] = useState<Effekt[]>([]);
  const [message, setMessage] = useState("");
  const [draggingSidebarEffekt, setDraggingSidebarEffekt] = useState<Effekt | null>(null);

  // Show fields
  const [name, setName] = useState("");
  const [format, setFormat] = useState("abendshow");
  const [status, setStatus] = useState("entwurf");
  const [anlass, setAnlass] = useState("");
  const [zieldauer, setZieldauer] = useState(60);
  const [konzeptKundentext, setKonzeptKundentext] = useState("");
  const [technischeAnforderungen, setTechnischeAnforderungen] = useState("");
  const [startzeit, setStartzeit] = useState("19:00");
  const [phasen, setPhasen] = useState<(ShowPhase & { _id: string })[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  // Magic Dinner mode toggle
  const [dinnerMode, setDinnerMode] = useState<"gang" | "closeup">("gang");

  // Workshop fields
  const [workshopTeilnehmer, setWorkshopTeilnehmer] = useState(10);
  const [workshopMaterial, setWorkshopMaterial] = useState("");
  const [workshopLernziele, setWorkshopLernziele] = useState("");

  // Sidebar filter
  const [effektSearch, setEffektSearch] = useState("");
  const [effektTypFilter, setEffektTypFilter] = useState<string>("alle");

  // DnD
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ── Load ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }

      const effekte = await effekteService.getAll();
      setAllEffekte(effekte);

      if (!isNew && id) {
        const show = await showService.getById(id);
        if (show) {
          setName(show.name);
          setFormat(show.format);
          setStatus(show.status);
          setAnlass(show.anlass);
          setZieldauer(show.zieldauer);
          setKonzeptKundentext(show.konzeptKundentext);
          setTechnischeAnforderungen(show.technischeAnforderungen);
          setPhasen((show.phasen || []).map((p, i) => ({ ...p, _id: `phase-${i}-${Date.now()}` })));
          if (show.phasen?.length) setExpandedPhase(`phase-0-${Date.now()}`);
        }
      }
      setLoading(false);
    };
    load();
  }, [id, isNew, navigate]);

  // ── Phase management ──────────────────────────────────────────────────────

  const addPhase = (label?: string, typ?: ShowPhase["typ"]) => {
    const newId = `phase-${Date.now()}`;
    setPhasen(prev => [...prev, { _id: newId, label: label || `Phase ${prev.length + 1}`, typ: typ || "akt1", effektIds: [] }]);
    setExpandedPhase(newId);
  };

  const removePhase = (phaseId: string) => setPhasen(prev => prev.filter(p => p._id !== phaseId));

  const updatePhase = (phaseId: string, patch: Partial<ShowPhase>) => {
    setPhasen(prev => prev.map(p => p._id === phaseId ? { ...p, ...patch } : p));
  };

  const addEffektToPhase = (phaseId: string, effektId: string) => {
    setPhasen(prev => prev.map(p => p._id === phaseId ? { ...p, effektIds: [...p.effektIds, effektId] } : p));
  };

  const removeEffektFromPhase = (phaseId: string, effektId: string) => {
    setPhasen(prev => prev.map(p => p._id === phaseId ? { ...p, effektIds: p.effektIds.filter(id => id !== effektId) } : p));
  };

  const reorderEffekteInPhase = (phaseId: string, oldIdx: number, newIdx: number) => {
    setPhasen(prev => prev.map(p => {
      if (p._id !== phaseId) return p;
      return { ...p, effektIds: arrayMove(p.effektIds, oldIdx, newIdx) };
    }));
  };

  const handlePhaseDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPhasen(prev => arrayMove(prev, prev.findIndex(p => p._id === active.id), prev.findIndex(p => p._id === over.id)));
    }
  }, []);

  // Top-level drag handler for sidebar → phase drops
  const handleTopLevelDragStart = useCallback((event: DragStartEvent) => {
    const id = String(event.active.id);
    if (id.startsWith("sidebar-")) {
      const effektId = id.replace("sidebar-", "");
      setDraggingSidebarEffekt(allEffekte.find(e => e.id === effektId) || null);
    }
  }, [allEffekte]);

  const handleTopLevelDragEnd = useCallback((event: DragEndEvent) => {
    setDraggingSidebarEffekt(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    // Sidebar effect → Phase drop
    if (activeId.startsWith("sidebar-") && overId.startsWith("drop-phase-")) {
      const effektId = activeId.replace("sidebar-", "");
      const phaseId = overId.replace("drop-phase-", "");
      addEffektToPhase(phaseId, effektId);
    }
  }, []);

  const loadPhasePresets = (presets: { label: string; typ: ShowPhase["typ"] }[]) => {
    const now = Date.now();
    setPhasen(presets.map((p, i) => ({ _id: `phase-${i}-${now}`, label: p.label, typ: p.typ, effektIds: [] })));
    setExpandedPhase(`phase-0-${now}`);
  };

  // ── Computed ───────────────────────────────────────────────────────────────

  const totalEffektDauer = phasen.reduce((sum, p) =>
    sum + p.effektIds.reduce((s, eid) => s + (allEffekte.find(e => e.id === eid)?.dauer || 0), 0), 0);

  const overZieldauer = totalEffektDauer > zieldauer;

  const timelineItems = useMemo(() => {
    const items: { label: string; startTime: string; dauer: number; effekte: Effekt[] }[] = [];
    let mins = parseInt(startzeit.split(":")[0]) * 60 + parseInt(startzeit.split(":")[1] || "0");
    for (const phase of phasen) {
      const effs = phase.effektIds.map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean) as Effekt[];
      const d = effs.reduce((s, e) => s + e.dauer, 0);
      items.push({ label: phase.label, startTime: `${String(Math.floor(mins / 60) % 24).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`, dauer: d, effekte: effs });
      mins += d;
    }
    return items;
  }, [phasen, allEffekte, startzeit]);

  // Smart filter: Show-Format bestimmt welche Effekt-Typen sichtbar sind
  const allowedTypsForFormat: Record<string, string[]> = {
    "abendshow": ["buehne", "beides"],
    "close-up": ["closeup", "beides"],
    "magic-dinner": dinnerMode === "closeup" ? ["closeup", "beides"] : ["buehne", "beides"],
    "tourshow": ["buehne", "beides"],
    "kundenbuchung": ["closeup", "buehne", "beides"],
    "workshop": ["closeup", "buehne", "beides"],
  };
  const allowedTyps = allowedTypsForFormat[format] || ["closeup", "buehne", "beides"];

  // Typ-Filter Tabs: nur relevante anzeigen
  const availableTypFilters = ["alle", ...allowedTyps.filter(t => allEffekte.some(e => e.status === "aktiv" && e.typ === t))];

  const filteredEffekte = allEffekte.filter(e => {
    if (e.status !== "aktiv") return false;
    // Format-basierter Filter
    if (!allowedTyps.includes(e.typ)) return false;
    // Manueller Typ-Filter innerhalb der erlaubten Typen
    if (effektTypFilter !== "alle" && e.typ !== effektTypFilter) return false;
    if (effektSearch && !e.name.toLowerCase().includes(effektSearch.toLowerCase())) return false;
    return true;
  });

  // ── Kundentext Generator ────────────────────────────────────────────────────

  const generateKundentext = () => {
    const formatLabel = FORMAT_OPTIONS.find(f => f.value === format)?.label || format;
    const effekte = phasen.flatMap(p => p.effektIds.map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean)) as Effekt[];
    const uniqueEffekte = [...new Map(effekte.map(e => [e.id, e])).values()];
    const closeupEffekte = uniqueEffekte.filter(e => e.typ === "closeup" || e.typ === "beides");
    const buehneEffekte = uniqueEffekte.filter(e => e.typ === "buehne" || e.typ === "beides");

    const intros: Record<string, string> = {
      "abendshow": `Erleben Sie eine ${zieldauer}-minütige Comedy-Zaubershow, die Ihr Publikum von der ersten bis zur letzten Minute in den Bann zieht.`,
      "close-up": `Hautnah und direkt an Ihren Gästen — ${zieldauer} Minuten Close-Up-Zauberkunst, die für Staunen und beste Unterhaltung sorgt.`,
      "magic-dinner": dinnerMode === "gang"
        ? `Zwischen den Gängen Ihres Dinners erleben Ihre Gäste faszinierende Zaubermomente, die den Abend unvergesslich machen.`
        : `Während Ihres Dinners bewegt sich der Zauberer zwischen den Tischen und sorgt für magische Momente direkt an jedem Tisch.`,
      "tourshow": `Eine professionelle ${zieldauer}-minütige Bühnenshow mit durchkomponiertem Ablauf, perfekt für Ihre Veranstaltung.`,
      "kundenbuchung": `${zieldauer} Minuten professionelle Zauberunterhaltung, individuell auf Ihre Veranstaltung abgestimmt.`,
      "workshop": `In diesem ${zieldauer}-minütigen Workshop lernen die Teilnehmer selbst verblüffende Zaubertricks — Spaß und Teambuilding garantiert.`,
    };

    const highlights: string[] = [];

    if (buehneEffekte.length > 0 && (format === "abendshow" || format === "tourshow")) {
      const mentalCount = buehneEffekte.filter(e => e.name.toLowerCase().includes("mental") || e.name.toLowerCase().includes("buchtest") || e.name.toLowerCase().includes("letters") || e.name.toLowerCase().includes("acronym")).length;
      const comedyCount = buehneEffekte.filter(e => e.name.toLowerCase().includes("comedy") || e.name.toLowerCase().includes("entfess") || e.name.toLowerCase().includes("hände")).length;
      if (mentalCount > 0) highlights.push("faszinierende Mentalmagie und Gedankenlesen");
      if (comedyCount > 0) highlights.push("Comedy-Einlagen mit Publikumsinteraktion");
      if (buehneEffekte.some(e => e.name.toLowerCase().includes("entfess"))) highlights.push("eine spektakuläre Entfesslungsnummer");
    }

    if (closeupEffekte.length > 0 && (format === "close-up" || format === "magic-dinner")) {
      const kartenCount = closeupEffekte.filter(e => e.name.toLowerCase().includes("kart") || e.name.toLowerCase().includes("deck") || e.name.toLowerCase().includes("queen")).length;
      if (kartenCount > 0) highlights.push("verblüffende Kartenkunststücke direkt in den Händen Ihrer Gäste");
      if (closeupEffekte.some(e => e.name.toLowerCase().includes("draht"))) highlights.push("eine berührende Mentalismus-Vorführung");
      if (closeupEffekte.some(e => e.name.toLowerCase().includes("gummi"))) highlights.push("visuelle Magie zum Anfassen");
    }

    const phasenInfo = phasen.length > 1
      ? `\n\nDer Ablauf ist in ${phasen.length} ${format === "magic-dinner" ? "Gänge" : "Phasen"} gegliedert` +
        (phasen.some(p => p.label) ? `: ${phasen.map(p => p.label).join(", ")}` : "") + "."
      : "";

    const intro = intros[format] || intros["kundenbuchung"];
    const highlightText = highlights.length > 0
      ? `\n\nFreuen Sie sich auf ${highlights.join(", ")}.`
      : "";
    const closing = "\n\nJeder Auftritt wird individuell auf Ihre Veranstaltung abgestimmt — für ein Erlebnis, das Ihre Gäste noch lange begeistert.";

    return intro + highlightText + phasenInfo + closing;
  };

  // ── Save ───────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!name.trim()) { setMessage("Name ist erforderlich."); return; }
    setSaving(true);
    setMessage("");
    try {
      const cleanPhasen: ShowPhase[] = phasen.map(({ _id, ...rest }) => rest);
      const payload = {
        name: name.trim(), format, status, anlass: anlass.trim(), zieldauer,
        konzeptKundentext: konzeptKundentext.trim(),
        technischeAnforderungen: technischeAnforderungen.trim(),
        phasen: cleanPhasen,
      };

      if (isNew) {
        const created = await showService.create(payload);
        setMessage("Konzept erstellt!");
        navigate(`/admin/programm/shows/${created.id}/edit`, { replace: true });
      } else if (id) {
        await showService.update(id, payload);
        setMessage("Gespeichert!");
      }
    } catch (err: any) {
      setMessage("Fehler: " + (err.message || "Unbekannt"));
    }
    setSaving(false);
  };

  // ── Duplicate ──────────────────────────────────────────────────────────────

  const handleDuplicate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const cleanPhasen: ShowPhase[] = phasen.map(({ _id, ...rest }) => rest);
      const created = await showService.create({
        name: `${name.trim()} (Kopie)`, format, status: "entwurf", anlass, zieldauer,
        konzeptKundentext, technischeAnforderungen, phasen: cleanPhasen,
      });
      navigate(`/admin/programm/shows/${created.id}/edit`);
    } catch (err: any) {
      setMessage("Fehler: " + (err.message || "Unbekannt"));
    }
    setSaving(false);
  };

  // ── Add effekt from sidebar ────────────────────────────────────────────────

  const addEffektFromSidebar = (effektId: string) => {
    if (phasen.length === 0) {
      const newId = `phase-${Date.now()}`;
      const isPool = format === "close-up" || (format === "magic-dinner" && dinnerMode === "closeup");
      setPhasen([{ _id: newId, label: isPool ? "Meine Effekte" : "Phase 1", typ: "akt1", effektIds: [effektId] }]);
      setExpandedPhase(newId);
    } else {
      const targetPhase = expandedPhase ? phasen.find(p => p._id === expandedPhase) : phasen[phasen.length - 1];
      if (targetPhase) addEffektToPhase(targetPhase._id, effektId);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) return <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen…</div>;

  const isCloseUp = format === "close-up" || (format === "magic-dinner" && dinnerMode === "closeup");
  const isBuehne = format === "abendshow" || format === "kundenbuchung" || (format === "magic-dinner" && dinnerMode === "gang");
  const isTourshow = format === "tourshow";
  const isWorkshop = format === "workshop";
  const isHybrid = false; // future: format === "hybrid"
  const isDinner = format === "magic-dinner";

  return (
    <AdminLayout title={isNew ? "Neues Konzept" : name || "Konzept"} subtitle={FORMAT_OPTIONS.find(f => f.value === format)?.label || "Show-Ablauf planen"}>
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-5">
        <Link to="/admin/programm/shows" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Zurück
        </Link>
        <div className="flex items-center gap-2">
          {message && <span className={`text-xs ${message.startsWith("Fehler") ? "text-destructive" : "text-green-600"}`}>{message}</span>}
          {!isNew && (
            <button onClick={handleDuplicate} disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-2 text-xs font-medium hover:bg-muted/40 disabled:opacity-50">
              <Copy className="w-3.5 h-3.5" /> Duplizieren
            </button>
          )}
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Speichert…" : "Speichern"}
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <DndContext sensors={sensors} onDragStart={handleTopLevelDragStart} onDragEnd={handleTopLevelDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* ═══ LEFT: Editor ═══ */}
        <div className="space-y-5">

          {/* Meta-Felder */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="z.B. Große Gala-Show" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Format</label>
              <select value={format} onChange={e => { setFormat(e.target.value); setEffektTypFilter("alle"); }} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm">
                {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Zieldauer (Min.)</label>
              <input type="number" value={zieldauer} onChange={e => setZieldauer(Math.max(0, parseInt(e.target.value) || 0))} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Startzeit</label>
              <input type="time" value={startzeit} onChange={e => setStartzeit(e.target.value)} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
            </div>
          </div>

          {/* Dauer-Anzeige */}
          {!isWorkshop && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${overZieldauer ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
              <Clock className={`w-4 h-4 ${overZieldauer ? "text-red-600" : "text-green-600"}`} />
              <span className={`text-sm font-semibold ${overZieldauer ? "text-red-700" : "text-green-700"}`}>
                {totalEffektDauer} / {zieldauer} Min.
              </span>
              {overZieldauer && (
                <span className="text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {totalEffektDauer - zieldauer} Min. über Ziel
                </span>
              )}
            </div>
          )}

          {/* Visuelle Zeitleiste */}
          {isBuehne && timelineItems.length > 0 && (
            <TimelineBar items={timelineItems} zieldauer={zieldauer} />
          )}

          {/* ── Magic Dinner: Mode Toggle ── */}
          {isDinner && (
            <div className="flex gap-2">
              <button onClick={() => setDinnerMode("gang")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${dinnerMode === "gang" ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground"}`}>
                <UtensilsCrossed className="w-4 h-4" /> Gänge-Ablauf
              </button>
              <button onClick={() => setDinnerMode("closeup")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${dinnerMode === "closeup" ? "bg-foreground text-background" : "bg-muted/30 text-muted-foreground"}`}>
                <Wand2 className="w-4 h-4" /> Close-Up Pool
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════ */}
          {/* ── FORMAT-SPECIFIC EDITORS ── */}
          {/* ══════════════════════════════════════════════════════════════════ */}

          {isCloseUp ? (
            /* ── CLOSE-UP: Effekt-Pool ── */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-foreground">Effekt-Pool</h2>
                  <p className="text-xs text-muted-foreground">Effekte die du bei dieser Show dabei hast. Reihenfolge spontan.</p>
                </div>
              </div>

              {phasen.length === 0 && (
                <button onClick={() => {
                  const newId = `phase-${Date.now()}`;
                  setPhasen([{ _id: newId, label: "Meine Effekte", typ: "akt1", effektIds: [] }]);
                  setExpandedPhase(newId);
                }} className="w-full p-6 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                  + Effekt-Pool erstellen
                </button>
              )}

              {phasen.map(phase => {
                const phaseEffekte = phase.effektIds.map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean) as Effekt[];
                const grouped = {
                  closeup: phaseEffekte.filter(e => e.typ === "closeup"),
                  buehne: phaseEffekte.filter(e => e.typ === "buehne"),
                  beides: phaseEffekte.filter(e => e.typ === "beides"),
                };
                return (
                  <div key={phase._id} className="space-y-3">
                    {Object.entries(grouped).filter(([, effs]) => effs.length > 0).map(([typ, effs]) => (
                      <div key={typ}>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{EFFEKT_TYP_LABELS[typ] || typ} ({effs.length})</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {effs.map(eff => (
                            <div key={eff.id} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-border/20 group">
                              <Wand2 className="w-3.5 h-3.5 text-accent shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{eff.name}</p>
                                <p className="text-[10px] text-muted-foreground">{eff.dauer} Min.</p>
                              </div>
                              <button onClick={() => removeEffektFromPhase(phase._id, eff.id)} className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-opacity">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {phaseEffekte.length === 0 && (
                      <p className="text-xs text-muted-foreground/50 italic py-4 text-center">Klicke auf Effekte in der Sidebar um sie hinzuzufügen</p>
                    )}
                  </div>
                );
              })}
            </div>

          ) : isWorkshop ? (
            /* ── WORKSHOP: Eigenständiger Editor ── */
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Workshop-Planung
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Teilnehmeranzahl</label>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <input type="number" min={1} value={workshopTeilnehmer} onChange={e => setWorkshopTeilnehmer(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Dauer (Min.)</label>
                  <input type="number" value={zieldauer} onChange={e => setZieldauer(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Lernziele / Themen</label>
                <textarea value={workshopLernziele} onChange={e => setWorkshopLernziele(e.target.value)} rows={3}
                  placeholder="Was sollen die Teilnehmer lernen? Welche Tricks werden beigebracht?"
                  className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none" />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Material / Requisiten</label>
                <textarea value={workshopMaterial} onChange={e => setWorkshopMaterial(e.target.value)} rows={3}
                  placeholder="Welches Material wird benötigt? Kartenspiele, Münzen, etc."
                  className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none" />
              </div>

              {/* Workshop-Ablauf als Phasen */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Ablauf / Übungen</h3>
                  <button onClick={() => addPhase("Übung " + (phasen.length + 1))} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80">
                    <Plus className="w-3.5 h-3.5" /> Übung hinzufügen
                  </button>
                </div>
                {phasen.length === 0 ? (
                  <button onClick={() => addPhase("Begrüßung & Einführung")} className="w-full p-6 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                    + Ersten Ablaufpunkt hinzufügen
                  </button>
                ) : (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handlePhaseDragEnd}>
                    <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                      {phasen.map((phase, idx) => (
                        <PhaseCard
                          key={phase._id} phase={phase} idx={idx}
                          startTime={timelineItems[idx]?.startTime || "--:--"}
                          allEffekte={allEffekte} isExpanded={expandedPhase === phase._id}
                          isDraggingFromSidebar={!!draggingSidebarEffekt}
                          onToggle={() => setExpandedPhase(expandedPhase === phase._id ? null : phase._id)}
                          onRemove={() => removePhase(phase._id)}
                          onUpdate={patch => updatePhase(phase._id, patch)}
                          onAddEffekt={eid => addEffektToPhase(phase._id, eid)}
                          onRemoveEffekt={eid => removeEffektFromPhase(phase._id, eid)}
                          onReorderEffekte={(o, n) => reorderEffekteInPhase(phase._id, o, n)}
                          sensors={sensors}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>

          ) : isTourshow ? (
            /* ── TOURSHOW: Tour-fokussierter Editor ── */
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Tourshow-Planung
              </h2>
              <p className="text-xs text-muted-foreground">Plane den Ablauf deiner Tourshow. Die Tour-Termine und Locations werden über die Tour-Verwaltung zugewiesen.</p>

              {/* Ablauf */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Show-Ablauf</h3>
                  <div className="flex items-center gap-2">
                    {phasen.length === 0 && (
                      <button onClick={() => loadPhasePresets(BUEHNE_PHASE_PRESETS)}
                        className="text-[10px] text-accent hover:text-accent/80 font-medium">
                        Standard-Vorlage laden
                      </button>
                    )}
                    <button onClick={() => addPhase()} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80">
                      <Plus className="w-3.5 h-3.5" /> Phase
                    </button>
                  </div>
                </div>

                {phasen.length === 0 ? (
                  <button onClick={() => loadPhasePresets(BUEHNE_PHASE_PRESETS)} className="w-full p-6 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                    + Standard-Ablauf laden oder Phase hinzufügen
                  </button>
                ) : (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handlePhaseDragEnd}>
                    <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                      {phasen.map((phase, idx) => (
                        <PhaseCard
                          key={phase._id} phase={phase} idx={idx}
                          startTime={timelineItems[idx]?.startTime || "--:--"}
                          allEffekte={allEffekte} isExpanded={expandedPhase === phase._id}
                          isDraggingFromSidebar={!!draggingSidebarEffekt}
                          onToggle={() => setExpandedPhase(expandedPhase === phase._id ? null : phase._id)}
                          onRemove={() => removePhase(phase._id)}
                          onUpdate={patch => updatePhase(phase._id, patch)}
                          onAddEffekt={eid => addEffektToPhase(phase._id, eid)}
                          onRemoveEffekt={eid => removeEffektFromPhase(phase._id, eid)}
                          onReorderEffekte={(o, n) => reorderEffekteInPhase(phase._id, o, n)}
                          sensors={sensors}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                )}
              </div>
            </div>

          ) : (
            /* ── BÜHNENSHOW / KUNDENBUCHUNG / MAGIC DINNER (Gänge): Linearer Ablauf ── */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground">
                  {isDinner ? "Gänge-Ablauf" : "Ablauf / Timeline"}
                </h2>
                <div className="flex items-center gap-2">
                  {phasen.length === 0 && (
                    <button onClick={() => loadPhasePresets(isDinner ? DINNER_PHASE_PRESETS : BUEHNE_PHASE_PRESETS)}
                      className="text-[10px] text-accent hover:text-accent/80 font-medium">
                      {isDinner ? "Gänge-Vorlage laden" : "Standard-Vorlage laden"}
                    </button>
                  )}
                  <button onClick={() => addPhase(isDinner ? `Gang ${phasen.length + 1}` : undefined)} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80">
                    <Plus className="w-3.5 h-3.5" /> {isDinner ? "Gang hinzufügen" : "Phase hinzufügen"}
                  </button>
                </div>
              </div>

              {phasen.length === 0 ? (
                <button onClick={() => loadPhasePresets(isDinner ? DINNER_PHASE_PRESETS : BUEHNE_PHASE_PRESETS)}
                  className="w-full p-8 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                  + {isDinner ? "Gänge-Vorlage laden" : "Erste Phase hinzufügen"}
                </button>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handlePhaseDragEnd}>
                  <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                      {phasen.map((phase, idx) => (
                        <PhaseCard
                          key={phase._id} phase={phase} idx={idx}
                          startTime={timelineItems[idx]?.startTime || "--:--"}
                          allEffekte={allEffekte} isExpanded={expandedPhase === phase._id}
                          isDraggingFromSidebar={!!draggingSidebarEffekt}
                          onToggle={() => setExpandedPhase(expandedPhase === phase._id ? null : phase._id)}
                          onRemove={() => removePhase(phase._id)}
                          onUpdate={patch => updatePhase(phase._id, patch)}
                          onAddEffekt={eid => addEffektToPhase(phase._id, eid)}
                          onRemoveEffekt={eid => removeEffektFromPhase(phase._id, eid)}
                          onReorderEffekte={(o, n) => reorderEffekteInPhase(phase._id, o, n)}
                          sensors={sensors}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}

          {/* Beschreibungstexte */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground">Kundentext</label>
                <button
                  type="button"
                  onClick={() => setKonzeptKundentext(generateKundentext())}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-accent hover:text-accent/80 transition-colors"
                >
                  <Sparkles className="w-3 h-3" /> Text generieren
                </button>
              </div>
              <textarea value={konzeptKundentext} onChange={e => setKonzeptKundentext(e.target.value)} rows={6} placeholder="Beschreibung für den Kunden…" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Technische Anforderungen</label>
              <textarea value={technischeAnforderungen} onChange={e => setTechnischeAnforderungen(e.target.value)} rows={4} placeholder="Bühne, Licht, Ton…" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none" />
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: Effekte-Sidebar ═══ */}
        {!isWorkshop && (
          <div className="lg:sticky lg:top-20 space-y-3">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/30">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-1">Effekte</h3>
              <p className="text-[10px] text-muted-foreground mb-3">
                {format === "abendshow" || format === "tourshow" ? "Nur Bühnen-Effekte" :
                 format === "close-up" ? "Nur Close-Up-Effekte" :
                 format === "magic-dinner" && dinnerMode === "closeup" ? "Nur Close-Up-Effekte" :
                 "Alle Effekte"}
              </p>

              {/* Search */}
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
                <input
                  value={effektSearch}
                  onChange={e => setEffektSearch(e.target.value)}
                  placeholder="Effekt suchen…"
                  className="w-full rounded-lg bg-background border border-border/20 pl-8 pr-3 py-1.5 text-xs"
                />
              </div>

              {/* Type filter — only show when multiple types available */}
              {availableTypFilters.length > 2 && (
                <div className="flex gap-1 mb-3">
                  {availableTypFilters.map(t => (
                    <button key={t} onClick={() => setEffektTypFilter(t)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-medium ${effektTypFilter === t ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"}`}
                    >
                      {t === "alle" ? "Alle" : EFFEKT_TYP_LABELS[t] || t}
                    </button>
                  ))}
                </div>
              )}

              {/* Effekte List — draggable to phases */}
              <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                {filteredEffekte.length === 0 ? (
                  <p className="text-xs text-muted-foreground/50 italic py-4 text-center">Keine Effekte gefunden</p>
                ) : filteredEffekte.map(eff => (
                  <DraggableSidebarEffekt key={eff.id} effekt={eff} onClick={() => addEffektFromSidebar(eff.id)} />
                ))}
              </div>
              <p className="text-[9px] text-muted-foreground/40 mt-2 text-center">Klicken oder in Phase ziehen</p>
            </div>
          </div>
        )}
      </div>

      {/* Drag Overlay — follows cursor during sidebar drag */}
      <DragOverlay dropAnimation={null}>
        {draggingSidebarEffekt && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/30 shadow-lg">
            <Wand2 className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="text-xs font-medium">{draggingSidebarEffekt.name}</span>
            <span className="text-[9px] text-muted-foreground">{draggingSidebarEffekt.dauer} Min.</span>
          </div>
        )}
      </DragOverlay>
      </DndContext>
    </AdminLayout>
  );
};

export default AdminShowEditor;
