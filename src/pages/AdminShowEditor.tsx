import { useEffect, useState, useCallback, useMemo, type ReactNode } from "react";
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

// ── Drop Zone (for Close-Up pool etc.) ───────────────────────────────────────

function PoolDropZone({ phaseId, isDraggingFromSidebar, children }: { phaseId: string; isDraggingFromSidebar: boolean; children: ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: `drop-phase-${phaseId}` });
  return (
    <div ref={setNodeRef} className={`rounded-xl transition-all ${isDraggingFromSidebar ? (isOver ? "ring-2 ring-accent bg-accent/5" : "ring-1 ring-dashed ring-accent/30") : ""}`}>
      {isDraggingFromSidebar && (
        <div className={`flex items-center justify-center gap-2 py-2 text-xs font-medium transition-colors rounded-t-xl ${isOver ? "bg-accent/15 text-accent" : "bg-accent/5 text-accent/50"}`}>
          <Plus className="w-3.5 h-3.5" />
          {isOver ? "Loslassen zum Hinzufügen" : "Hier ablegen"}
        </div>
      )}
      {children}
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
  musikItems: { id: string; titel: string; kuenstler: string; kategorie: string }[];
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
              {musikItems.length > 0 ? (
                <select value="" onChange={e => { if (e.target.value) setMusikNotiz(prev => prev ? `${prev}, ${e.target.value}` : e.target.value); }}
                  className="w-full rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5 text-xs mb-1">
                  <option value="">Track hinzufügen…</option>
                  {musikItems.map(m => <option key={m.id} value={m.titel}>{m.titel}{m.kuenstler ? ` – ${m.kuenstler}` : ""}</option>)}
                </select>
              ) : null}
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

  // Technik-Inventar
  const [technikItems, setTechnikItems] = useState<{ id: string; name: string; kategorie: string; menge: number }[]>([]);
  const [selectedTechnik, setSelectedTechnik] = useState<Record<string, number>>({}); // id → menge

  // Musik-Bibliothek (für Phase-Level Auswahl)
  const [musikItems, setMusikItems] = useState<{ id: string; titel: string; kuenstler: string; kategorie: string }[]>([]);

  // Event/Request Verknüpfung
  const [eventId, setEventId] = useState<string | null>(null);
  const [linkedBookingId, setLinkedBookingId] = useState<string | null>(null);
  const [availableEvents, setAvailableEvents] = useState<{ id: string; title: string; date: string; guests: number | null; type: string }[]>([]);

  // Quick-add effect popup
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddName, setQuickAddName] = useState("");
  const [quickAddDauer, setQuickAddDauer] = useState(5);
  const [quickAddKonzeptOnly, setQuickAddKonzeptOnly] = useState(false);
  const [quickAddSaving, setQuickAddSaving] = useState(false);

  // Show fields
  const [name, setName] = useState("");
  const [format, setFormat] = useState("abendshow");
  const [showTyp, setShowTyp] = useState<"vorlage" | "individuell" | "eigenes-programm">("individuell");
  const [status, setStatus] = useState("entwurf");
  const [anlass, setAnlass] = useState("");
  const [zieldauerMin, setZieldauerMin] = useState(30);
  const [zieldauerMax, setZieldauerMax] = useState(45);
  const [preis, setPreis] = useState<number | null>(null);
  // beschreibungKunde wird automatisch aus konzeptKundentext befüllt
  const [konzeptKundentext, setKonzeptKundentext] = useState("");
  const [technischeAnforderungen, setTechnischeAnforderungen] = useState("");
  const [startzeit, setStartzeit] = useState("19:00");
  const [phasen, setPhasen] = useState<(ShowPhase & { _id: string })[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  // Close-Up specifics
  const [closeupGaeste, setCloseupGaeste] = useState(0);
  const [closeupPersonenProGruppe, setCloseupPersonenProGruppe] = useState(10);
  const [closeupGruppen, setCloseupGruppen] = useState(8);
  const [closeupDauerProGruppe, setCloseupDauerProGruppe] = useState(5);

  // Magic Dinner mode toggle
  const [dinnerMode, setDinnerMode] = useState<"gang" | "closeup">("gang");

  // Workshop fields
  const [workshopTeilnehmer, setWorkshopTeilnehmer] = useState(10);
  const [workshopMaterial, setWorkshopMaterial] = useState("");
  const [workshopLernziele, setWorkshopLernziele] = useState("");

  // Wizard
  const [wizardStep, setWizardStep] = useState(1);
  const WIZARD_STEPS = [
    { num: 1, label: "Basis" },
    { num: 2, label: format === "close-up" ? "Einsatz" : format === "workshop" ? "Workshop" : "Planung" },
    { num: 3, label: format === "close-up" ? "Effekt-Pool" : format === "workshop" ? "Übungen" : "Ablauf" },
    { num: 4, label: "Texte & Technik" },
  ];

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

      // Technik + Musik laden
      const { data: techData } = await supabase.from("technik_inventar").select("id, name, kategorie, menge").order("kategorie, name");
      const { data: musikData } = await supabase.from("musik_bibliothek").select("id, titel, kuenstler, kategorie").order("kategorie, titel");
      setMusikItems((musikData || []).map((m: any) => ({ id: m.id, titel: m.titel, kuenstler: m.kuenstler || "", kategorie: m.kategorie || "Sonstiges" })));
      setTechnikItems((techData || []).map((t: any) => ({ id: t.id, name: t.name, kategorie: t.kategorie || "Sonstiges", menge: t.menge || 1 })));

      // Buchungen laden für Verknüpfung (Events + Requests)
      const [evtRes, reqRes] = await Promise.all([
        supabase.from("portal_events").select("id, title, event_date, guests, status").is("deleted_at", null).neq("status", "storniert").order("event_date", { ascending: false }),
        supabase.from("portal_requests").select("id, anlass, datum, gaeste, status, name, event_id").is("deleted_at", null).not("status", "in", '("abgelehnt","storniert","archiviert")').order("created_at", { ascending: false }),
      ]);
      const items: { id: string; title: string; date: string; guests: number | null; type: string }[] = [];
      // Requests als Buchungen (primär)
      for (const r of reqRes.data || []) {
        items.push({ id: r.id, title: (r as any).anlass || (r as any).name || "Anfrage", date: (r as any).datum || "", guests: (r as any).gaeste, type: "request" });
      }
      // Events ohne Request (selten, aber möglich)
      const reqEventIds = new Set((reqRes.data || []).map((r: any) => r.event_id).filter(Boolean));
      for (const e of evtRes.data || []) {
        if (!reqEventIds.has(e.id)) {
          items.push({ id: e.id, title: e.title || "Event", date: e.event_date || "", guests: e.guests, type: "event" });
        }
      }
      setAvailableEvents(items);

      const effekte = await effekteService.getAll();
      // Also load konzept-only effects (not in normal library)
      const { data: konzeptEffekte } = await supabase.from("effekte").select("*").eq("status", "konzept");
      const merged = [...effekte];
      if (konzeptEffekte) {
        for (const ke of konzeptEffekte) {
          if (!merged.find(e => e.id === ke.id)) {
            merged.push({ id: ke.id, name: ke.name as string, typ: ke.typ as any, dauer: (ke.dauer as number) || 0, resetZeit: 0, schwierigkeit: 1, anlaesse: [], status: "aktiv" as any, props: [], interneNotizen: "", wiederholbar: true, kategorie: "", createdAt: "", updatedAt: "" });
          }
        }
      }
      setAllEffekte(merged);

      if (!isNew && id) {
        const show = await showService.getById(id);
        if (show) {
          setName(show.name);
          setFormat(show.format);
          setShowTyp(show.showTyp || "individuell");
          setEventId(show.eventId || null);
          // Linked booking: suche Request der diese Show referenziert
          const { data: linkedReq } = await supabase.from("portal_requests").select("id").eq("show_id", id).limit(1).maybeSingle();
          if (linkedReq) setLinkedBookingId(linkedReq.id);
          else if (show.eventId) {
            const { data: linkedEvtReq } = await supabase.from("portal_requests").select("id").eq("event_id", show.eventId).limit(1).maybeSingle();
            if (linkedEvtReq) setLinkedBookingId(linkedEvtReq.id);
          }
          setStatus(show.status);
          setAnlass(show.anlass);
          setPreis(show.preis ?? null);
          // beschreibungKunde = konzeptKundentext (wird beim Save gesetzt)
          // zieldauer kann als einzelner Wert oder als "min-max" gespeichert sein
          const zd = show.zieldauer || 45;
          setZieldauerMin(zd);
          setZieldauerMax(zd);
          setKonzeptKundentext(show.konzeptKundentext);
          setTechnischeAnforderungen(show.technischeAnforderungen);
          setPhasen((show.phasen || []).map((p, i) => ({ ...p, _id: `phase-${i}-${Date.now()}` })));
          if (show.phasen?.length) setExpandedPhase(`phase-0-${Date.now()}`);

          // Close-Up Daten aus budget laden
          const meta = show.budget as any;
          if (meta?.selectedTechnik) setSelectedTechnik(meta.selectedTechnik);
          // Musik wird pro Phase in PhaseCard verwaltet
          if (meta?.closeupGaeste) setCloseupGaeste(meta.closeupGaeste);
          if (meta?.closeupPersonenProGruppe) setCloseupPersonenProGruppe(meta.closeupPersonenProGruppe);
          if (meta?.closeupGruppen) setCloseupGruppen(meta.closeupGruppen);
          if (meta?.closeupDauerProGruppe) setCloseupDauerProGruppe(meta.closeupDauerProGruppe);

          // Gästeanzahl aus Event laden (überschreibt gespeicherte wenn vorhanden)
          if (show.eventId) {
            const { data: evt } = await supabase.from("portal_events").select("guests").eq("id", show.eventId).maybeSingle();
            if (evt?.guests) {
              setCloseupGaeste(evt.guests);
              setCloseupGruppen(Math.ceil(evt.guests / closeupPersonenProGruppe));
            }
          }
          // Oder aus Request laden
          const { data: reqs } = await supabase.from("portal_requests").select("gaeste").eq("show_id", id).limit(1);
          if (!closeupGaeste && reqs?.[0]?.gaeste) {
            setCloseupGaeste(reqs[0].gaeste);
            setCloseupGruppen(Math.ceil(reqs[0].gaeste / closeupPersonenProGruppe));
          }
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

  const handleTopLevelDragEnd = (event: DragEndEvent) => {
    setDraggingSidebarEffekt(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeId = String(active.id);
    const overId = String(over.id);

    // Sidebar effect → Phase drop
    if (activeId.startsWith("sidebar-") && overId.startsWith("drop-phase-")) {
      const effektId = activeId.replace("sidebar-", "");
      const phaseId = overId.replace("drop-phase-", "");
      addEffektToPhase(phaseId, effektId);
      return;
    }

    // Phase reordering (sortable)
    const oldIdx = phasen.findIndex(p => p._id === activeId);
    const newIdx = phasen.findIndex(p => p._id === overId);
    if (oldIdx >= 0 && newIdx >= 0) {
      setPhasen(prev => arrayMove(prev, oldIdx, newIdx));
    }
  };

  const loadPhasePresets = (presets: { label: string; typ: ShowPhase["typ"] }[]) => {
    const now = Date.now();
    setPhasen(presets.map((p, i) => ({ _id: `phase-${i}-${now}`, label: p.label, typ: p.typ, effektIds: [] })));
    setExpandedPhase(`phase-0-${now}`);
  };

  // ── Computed ───────────────────────────────────────────────────────────────

  const totalEffektDauer = phasen.reduce((sum, p) =>
    sum + p.effektIds.reduce((s, eid) => s + (allEffekte.find(e => e.id === eid)?.dauer || 0), 0), 0);

  const overZieldauer = totalEffektDauer > zieldauerMax;
  const underZieldauer = totalEffektDauer < zieldauerMin && totalEffektDauer > 0;

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

  // Already assigned effect IDs
  const assignedEffektIds = new Set(phasen.flatMap(p => p.effektIds));

  const filteredEffekte = allEffekte.filter(e => {
    if (e.status !== "aktiv" && e.status !== ("konzept" as any)) return false;
    // Hide already assigned effects
    if (assignedEffektIds.has(e.id)) return false;
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
    const dauerText = zieldauerMin === zieldauerMax ? `${zieldauerMax}-minütige` : `${zieldauerMin}–${zieldauerMax} Minuten`;

    const intros: Record<string, string> = {
      "abendshow": `Erleben Sie eine ${dauerText} Comedy-Zaubershow, die Ihr Publikum von der ersten bis zur letzten Minute in den Bann zieht.`,
      "close-up": `Hautnah und direkt an Ihren Gästen — ${dauerText} Close-Up-Zauberkunst, die für Staunen und beste Unterhaltung sorgt.`,
      "magic-dinner": dinnerMode === "gang"
        ? `Zwischen den Gängen Ihres Dinners erleben Ihre Gäste faszinierende Zaubermomente, die den Abend unvergesslich machen.`
        : `Während Ihres Dinners bewegt sich der Zauberer zwischen den Tischen und sorgt für magische Momente direkt an jedem Tisch.`,
      "tourshow": `Eine professionelle ${dauerText} Bühnenshow mit durchkomponiertem Ablauf, perfekt für Ihre Veranstaltung.`,
      "kundenbuchung": `${dauerText} professionelle Zauberunterhaltung, individuell auf Ihre Veranstaltung abgestimmt.`,
      "workshop": `In diesem ${dauerText} Workshop lernen die Teilnehmer selbst verblüffende Zaubertricks — Spaß und Teambuilding garantiert.`,
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
      // Close-Up Meta-Daten als budget JSON speichern
      const closeupMeta = isCloseUp
        ? { closeupGaeste, closeupPersonenProGruppe, closeupGruppen, closeupDauerProGruppe, selectedTechnik }
        : { selectedTechnik };
      const payload = {
        name: name.trim(), format, showTyp, status, anlass: anlass.trim(), zieldauer: zieldauerMax,
        preis: preis ?? undefined, beschreibungKunde: konzeptKundentext.trim() || undefined,
        konzeptKundentext: konzeptKundentext.trim(),
        technischeAnforderungen: technischeAnforderungen.trim(),
        phasen: cleanPhasen,
        eventId: eventId || undefined,
        budget: closeupMeta as any,
      };

      if (isNew) {
        const created = await showService.create(payload);
        // Buchung verknüpfen
        if (linkedBookingId) {
          await supabase.from("portal_requests").update({ show_id: created.id }).eq("id", linkedBookingId);
        }
        setMessage("Konzept erstellt!");
        navigate(`/admin/programm/shows/${created.id}/edit`, { replace: true });
      } else if (id) {
        await showService.update(id, payload);
        // Buchung verknüpfen
        if (linkedBookingId) {
          await supabase.from("portal_requests").update({ show_id: id }).eq("id", linkedBookingId);
        }
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
        name: `${name.trim()} (Kopie)`, format, showTyp, status: "entwurf", anlass, zieldauer: zieldauerMax,
        preis: preis ?? undefined, beschreibungKunde: beschreibungKunde || undefined,
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

  // Quick-add effect
  const handleQuickAddEffekt = async () => {
    if (!quickAddName.trim()) return;
    setQuickAddSaving(true);
    try {
      const defaultTyp = isCloseUp ? "closeup" : isBuehne ? "buehne" : "beides";
      const { data, error } = await supabase.from("effekte").insert({
        name: quickAddName.trim(),
        typ: defaultTyp,
        dauer: quickAddDauer,
        status: quickAddKonzeptOnly ? "konzept" : "aktiv",
      }).select().single();
      if (error) throw error;
      // Reload all effects including konzept ones
      const all = await effekteService.getAll();
      // Also include konzept effects (they're normally filtered out)
      const { data: konzeptEffekte } = await supabase.from("effekte").select("*").eq("status", "konzept");
      const merged = [...all];
      if (konzeptEffekte) {
        for (const ke of konzeptEffekte) {
          if (!merged.find(e => e.id === ke.id)) {
            merged.push({ id: ke.id, name: ke.name as string, typ: ke.typ as any, dauer: (ke.dauer as number) || 0, resetZeit: 0, schwierigkeit: 1, anlaesse: [], status: "aktiv" as any, props: [], interneNotizen: "", wiederholbar: true, kategorie: "", createdAt: "", updatedAt: "" });
          }
        }
      }
      setAllEffekte(merged);
      setShowQuickAdd(false);
      setQuickAddName("");
      setQuickAddDauer(5);
      setQuickAddKonzeptOnly(false);
    } catch (err: any) {
      alert("Fehler: " + (err.message || "Unbekannt"));
    }
    setQuickAddSaving(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) return <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen…</div>;

  const isCloseUp = format === "close-up" || (format === "magic-dinner" && dinnerMode === "closeup");
  const isBuehne = format === "abendshow" || format === "kundenbuchung" || (format === "magic-dinner" && dinnerMode === "gang");
  const isTourshow = format === "tourshow";
  const isWorkshop = format === "workshop";
  const isDinner = format === "magic-dinner";

  // Ensure there's at least one phase for Close-Up pool mode
  const safePoolPhase = phasen[0] || { _id: "empty", label: "Pool", typ: "akt1" as const, effektIds: [] };

  return (
    <AdminLayout title={isNew ? "Neues Konzept" : name || "Konzept"} subtitle={FORMAT_OPTIONS.find(f => f.value === format)?.label || "Show-Ablauf planen"}>
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-4">
        <Link to={isNew ? "/admin/programm/shows" : `/admin/programm/shows/${id}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {isNew ? "Zurück" : "Zur Übersicht"}
        </Link>
        <div className="flex items-center gap-2">
          {message && <span className={`text-xs ${message.startsWith("Fehler") ? "text-destructive" : "text-green-600"}`}>{message}</span>}
          {!isNew && (
            <button onClick={handleDuplicate} disabled={saving} className="inline-flex items-center gap-1.5 rounded-xl border border-border/30 px-3 py-2 text-xs font-medium hover:bg-muted/40 disabled:opacity-50">
              <Copy className="w-3.5 h-3.5" /> Duplizieren
            </button>
          )}
        </div>
      </div>

      {/* ── WIZARD STEPPER ── */}
      <div className="flex items-center gap-1 bg-muted/40 rounded-2xl p-1.5 mb-5">
        {WIZARD_STEPS.map((step) => (
          <button key={step.num} onClick={() => setWizardStep(step.num)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              wizardStep === step.num ? "bg-foreground text-background shadow-sm" : wizardStep > step.num ? "text-green-600" : "text-muted-foreground"
            }`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              wizardStep === step.num ? "bg-background text-foreground" : wizardStep > step.num ? "bg-green-100 text-green-600" : "bg-muted/60"
            }`}>{wizardStep > step.num ? "✓" : step.num}</span>
            {step.label}
          </button>
        ))}
      </div>

      {/* ── Wizard Navigation (unten) ── */}
      {/* wird am Ende des Contents gerendert */}

      {/* ── MAIN LAYOUT ── */}
      <DndContext sensors={sensors} onDragStart={handleTopLevelDragStart} onDragEnd={handleTopLevelDragEnd}>
      <div className={`grid grid-cols-1 ${wizardStep === 3 && !isWorkshop ? "lg:grid-cols-[1fr_300px]" : ""} gap-5`}>

        {/* ═══ LEFT: Editor ═══ */}
        <div className="space-y-5">

          {/* ══ STEP 1: Basis-Infos ══ */}
          {wizardStep === 1 && (
          <div className="space-y-5">
          <h2 className="text-lg font-bold">Basis-Informationen</h2>

          {/* Meta-Felder */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Dauer (Min.)</label>
              <div className="flex items-center gap-1.5">
                <input type="number" value={zieldauerMin} onChange={e => { const v = Math.max(0, parseInt(e.target.value) || 0); setZieldauerMin(v); if (v > zieldauerMax) setZieldauerMax(v); }}
                  className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" placeholder="Min" />
                <span className="text-muted-foreground text-xs shrink-0">–</span>
                <input type="number" value={zieldauerMax} onChange={e => { const v = Math.max(0, parseInt(e.target.value) || 0); setZieldauerMax(v); if (v < zieldauerMin) setZieldauerMin(v); }}
                  className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" placeholder="Max" />
              </div>
            </div>
          </div>

          {/* Show-Typ + Preis + Event */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Art</label>
              <select value={showTyp} onChange={e => setShowTyp(e.target.value as any)} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm">
                <option value="individuell">Individuelles Konzept</option>
                <option value="vorlage">Vorlage (wiederverwendbar)</option>
                <option value="eigenes-programm">Eigenes Programm</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Preis (€)</label>
              <input type="number" value={preis ?? ""} onChange={e => setPreis(e.target.value ? parseFloat(e.target.value) : null)} placeholder="z.B. 950"
                className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" step="0.01" min="0" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Buchung (optional)</label>
              {linkedBookingId && availableEvents.find(ev => ev.id === linkedBookingId) ? (
                <div className="flex items-center gap-2 rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm">
                  <span className="flex-1 truncate">{(() => { const ev = availableEvents.find(e => e.id === linkedBookingId)!; return `${ev.title}${ev.date ? ` (${new Date(ev.date + "T00:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "short" })})` : ""}${ev.guests ? ` · ${ev.guests} Gäste` : ""}`; })()}</span>
                  <button type="button" onClick={() => setLinkedBookingId(null)} className="text-muted-foreground hover:text-destructive shrink-0"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <select value="none" onChange={e => {
                  const bid = e.target.value === "none" ? null : e.target.value;
                  setLinkedBookingId(bid);
                  if (bid) {
                    const booking = availableEvents.find(ev => ev.id === bid);
                    if (booking?.guests) { setCloseupGaeste(booking.guests); setCloseupGruppen(Math.ceil(booking.guests / closeupPersonenProGruppe)); }
                  }
                }} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm">
                  <option value="none">Buchung auswählen…</option>
                  {availableEvents.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.title}{ev.date ? ` (${new Date(ev.date + "T00:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "short" })})` : ""}{ev.guests ? ` · ${ev.guests} Gäste` : ""}</option>
                  ))}
              </select>
              )}
            </div>
          </div>

          </div>
          )}

          {/* ══ STEP 2: Format-spezifische Planung ══ */}
          {wizardStep === 2 && (
          <div className="space-y-5">
          <h2 className="text-lg font-bold">{isCloseUp ? "Einsatz-Planung" : isWorkshop ? "Workshop-Planung" : isDinner ? "Dinner-Planung" : "Show-Planung"}</h2>

          {/* Dauer-Anzeige — nicht bei Close-Up (hat eigene Gruppen-Planung) und Workshop */}
          {!isWorkshop && !isCloseUp && (
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${overZieldauer ? "bg-red-50 border-red-200" : underZieldauer ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200"}`}>
              <Clock className={`w-4 h-4 ${overZieldauer ? "text-red-600" : underZieldauer ? "text-amber-600" : "text-green-600"}`} />
              <span className={`text-sm font-semibold ${overZieldauer ? "text-red-700" : underZieldauer ? "text-amber-700" : "text-green-700"}`}>
                {totalEffektDauer} / {zieldauerMin === zieldauerMax ? `${zieldauerMax}` : `${zieldauerMin}–${zieldauerMax}`} Min.
              </span>
              {overZieldauer && (
                <span className="text-xs text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {totalEffektDauer - zieldauerMax} Min. über Maximum
                </span>
              )}
              {underZieldauer && (
                <span className="text-xs text-amber-600 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {zieldauerMin - totalEffektDauer} Min. unter Minimum
                </span>
              )}
            </div>
          )}

          {/* Visuelle Zeitleiste */}
          {isBuehne && timelineItems.length > 0 && (
            <TimelineBar items={timelineItems} zieldauer={zieldauerMax} />
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
          </div>
          )}

          {/* ══ STEP 3: Effekte / Ablauf ══ */}
          {wizardStep === 3 && (
          <div className="space-y-5">
          <h2 className="text-lg font-bold">{isCloseUp ? "Effekt-Pool" : isWorkshop ? "Übungen" : "Ablauf & Effekte"}</h2>

          {/* ── FORMAT-SPECIFIC EDITORS ── */}
          {/* ══════════════════════════════════════════════════════════════════ */}

          {isCloseUp ? (
            /* ── CLOSE-UP: Gruppen + Effekt-Pool ── */
            (() => {
              const poolPhase = phasen[0];
              const allPoolEffekte = phasen.flatMap(p => p.effektIds).map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean) as Effekt[];
              const grouped = {
                closeup: allPoolEffekte.filter(e => e.typ === "closeup"),
                buehne: allPoolEffekte.filter(e => e.typ === "buehne"),
                beides: allPoolEffekte.filter(e => e.typ === "beides"),
              };
              const gesamtDauer = closeupGruppen * closeupDauerProGruppe;

              // Auto-create pool phase if empty
              if (phasen.length === 0) {
                const newId = `phase-${Date.now()}`;
                setTimeout(() => { setPhasen([{ _id: newId, label: "Meine Effekte", typ: "akt1", effektIds: [] }]); setExpandedPhase(newId); }, 0);
              }

              return (
                <div className="space-y-5">
                  {/* Einsatz-Planung */}
                  <div className="rounded-xl border border-border/20 p-4">
                    <h2 className="text-sm font-bold text-foreground mb-3">Einsatz-Planung</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Gäste</label>
                        <input type="number" value={closeupGaeste || ""} onChange={e => {
                          const g = Math.max(0, parseInt(e.target.value) || 0);
                          setCloseupGaeste(g);
                          if (g > 0 && closeupPersonenProGruppe > 0) setCloseupGruppen(Math.ceil(g / closeupPersonenProGruppe));
                        }} min={0} placeholder="z.B. 120" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Pers. / Gruppe</label>
                        <input type="number" value={closeupPersonenProGruppe} onChange={e => {
                          const p = Math.max(1, parseInt(e.target.value) || 1);
                          setCloseupPersonenProGruppe(p);
                          if (closeupGaeste > 0) setCloseupGruppen(Math.ceil(closeupGaeste / p));
                        }} min={1} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Gruppen</label>
                        <input type="number" value={closeupGruppen} onChange={e => setCloseupGruppen(Math.max(1, parseInt(e.target.value) || 1))}
                          min={1} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Min. / Gruppe</label>
                        <input type="number" value={closeupDauerProGruppe} onChange={e => setCloseupDauerProGruppe(Math.max(1, parseInt(e.target.value) || 1))}
                          min={1} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
                      </div>
                    </div>
                    <div className="mt-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-green-800 font-medium">
                          {closeupGaeste > 0 ? `${closeupGaeste} Gäste ÷ ${closeupPersonenProGruppe} = ` : ""}{closeupGruppen} Gruppen × {closeupDauerProGruppe} Min.
                        </p>
                        <p className="text-lg font-bold text-green-700">~{gesamtDauer} Min.</p>
                      </div>
                    </div>
                  </div>

                  {/* Effekt-Pool mit Drop-Zone */}
                  <PoolDropZone phaseId={poolPhase?._id || "pool"} isDraggingFromSidebar={!!draggingSidebarEffekt}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h2 className="text-sm font-bold text-foreground">Effekt-Pool ({allPoolEffekte.length} Effekte)</h2>
                        <p className="text-xs text-muted-foreground">Effekte die du dabei hast — Reihenfolge spontan je nach Situation.</p>
                      </div>
                    </div>

                    {allPoolEffekte.length === 0 ? (
                      <p className="text-xs text-muted-foreground/50 italic py-6 text-center rounded-xl border border-dashed border-border/30">Klicke in der Sidebar auf Effekte oder ziehe sie hierher</p>
                    ) : Object.entries(grouped).filter(([, effs]) => effs.length > 0).map(([typ, effs]) => (
                      <div key={typ} className="mb-3">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{EFFEKT_TYP_LABELS[typ] || typ} ({effs.length})</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {effs.map(eff => (
                            <div key={eff.id} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-border/20 group">
                              <Wand2 className="w-3.5 h-3.5 text-accent shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{eff.name}</p>
                              </div>
                              <button onClick={() => poolPhase && removeEffektFromPhase(poolPhase._id, eff.id)} className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-opacity">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  </PoolDropZone>
                </div>
              );
            })()

          ) : isWorkshop ? (
            /* ── WORKSHOP: Eigenständiger Editor mit Übungen ── */
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

              {/* Workshop-Ablauf: eigene Übungen */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Ablauf / Übungen</h3>
                  <button onClick={() => {
                    const newId = `phase-${Date.now()}`;
                    setPhasen(prev => [...prev, { _id: newId, label: `Übung ${prev.length + 1}`, typ: "akt1", effektIds: [] }]);
                    setExpandedPhase(newId);
                  }} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80">
                    <Plus className="w-3.5 h-3.5" /> Übung hinzufügen
                  </button>
                </div>

                {/* Vorlagen-Buttons */}
                {phasen.length === 0 && (
                  <div className="space-y-2">
                    <button onClick={() => {
                      const now = Date.now();
                      setPhasen([
                        { _id: `p-${now}-0`, label: "Begrüßung & Einführung", typ: "akt1", effektIds: [] },
                        { _id: `p-${now}-1`, label: "Trick 1: Einfacher Kartentrick", typ: "akt1", effektIds: [] },
                        { _id: `p-${now}-2`, label: "Trick 2: Münze verschwinden", typ: "akt1", effektIds: [] },
                        { _id: `p-${now}-3`, label: "Übungszeit & Fragen", typ: "akt1", effektIds: [] },
                        { _id: `p-${now}-4`, label: "Abschluss & Vorführung", typ: "akt1", effektIds: [] },
                      ]);
                      setExpandedPhase(`p-${now}-0`);
                    }} className="w-full p-4 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                      📋 Standard-Workshop-Vorlage laden
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "Kartentrick-Workshop", uebungen: ["Begrüßung", "Grundgriffe lernen", "Trick: Ambitious Card", "Trick: Zuschauer findet Karte", "Üben & Vorführen"] },
                        { label: "Mental-Workshop", uebungen: ["Begrüßung & Was ist Mentalismus?", "Übung: Zahlen vorhersagen", "Übung: Gedanken lesen", "Geheimnis der Körpersprache", "Vorführung"] },
                        { label: "Close-Up-Workshop", uebungen: ["Begrüßung", "Münztrick lernen", "Gummiband-Magie", "Alltagsmagie", "Mini-Show der Teilnehmer"] },
                        { label: "Teambuilding-Workshop", uebungen: ["Warm-Up & Kennenlernen", "Partner-Trick lernen", "Gruppen-Challenge", "Kreativ-Phase", "Finale Gruppenshow"] },
                      ].map(vorlage => (
                        <button key={vorlage.label} onClick={() => {
                          const now = Date.now();
                          setPhasen(vorlage.uebungen.map((u, i) => ({ _id: `p-${now}-${i}`, label: u, typ: "akt1" as const, effektIds: [] })));
                          setExpandedPhase(`p-${now}-0`);
                        }} className="p-3 rounded-xl border border-border/20 text-left hover:bg-muted/20 transition-colors">
                          <p className="text-xs font-semibold">{vorlage.label}</p>
                          <p className="text-[10px] text-muted-foreground">{vorlage.uebungen.length} Übungen</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Übungen-Liste */}
                {phasen.length > 0 && (
                  <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                    {phasen.map((phase, idx) => (
                      <div key={phase._id} className="rounded-xl border border-border/30 bg-white overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-3 bg-muted/10">
                          <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab" />
                          <span className="text-xs font-mono text-accent font-bold w-6">{idx + 1}.</span>
                          <input
                            value={phase.label}
                            onChange={e => updatePhase(phase._id, { label: e.target.value })}
                            className="flex-1 bg-transparent text-sm font-semibold text-foreground outline-none"
                            placeholder="Übungsname"
                          />
                          <button onClick={() => setExpandedPhase(expandedPhase === phase._id ? null : phase._id)} className="p-1 text-muted-foreground hover:text-foreground">
                            {expandedPhase === phase._id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => removePhase(phase._id)} className="p-1 text-muted-foreground hover:text-destructive">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {expandedPhase === phase._id && (
                          <div className="px-4 py-3 border-t border-border/10 space-y-2">
                            <textarea
                              placeholder="Beschreibung, Anleitung, Tipps für diese Übung…"
                              rows={3}
                              className="w-full rounded-lg bg-muted/20 border border-border/20 px-3 py-2 text-xs resize-none"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                                  <Clock className="w-3 h-3" /> Dauer (Min.)
                                </label>
                                <input type="number" placeholder="10" className="w-full rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5 text-xs" />
                              </div>
                              <div>
                                <label className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                                  <Wrench className="w-3 h-3" /> Material
                                </label>
                                <input placeholder="z.B. Kartendeck" className="w-full rounded-lg bg-muted/20 border border-border/20 px-2.5 py-1.5 text-xs" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    </SortableContext>
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
                    <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                      {phasen.map((phase, idx) => (
                        <PhaseCard
                          key={phase._id} phase={phase} idx={idx}
                          startTime={timelineItems[idx]?.startTime || "--:--"}
                          allEffekte={allEffekte} isExpanded={expandedPhase === phase._id}
                          isDraggingFromSidebar={!!draggingSidebarEffekt}
                          musikItems={musikItems}
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
                  <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                      {phasen.map((phase, idx) => (
                        <PhaseCard
                          key={phase._id} phase={phase} idx={idx}
                          startTime={timelineItems[idx]?.startTime || "--:--"}
                          allEffekte={allEffekte} isExpanded={expandedPhase === phase._id}
                          isDraggingFromSidebar={!!draggingSidebarEffekt}
                          musikItems={musikItems}
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
              )}
            </div>
          )}

          </div>
          )}

          {/* ══ STEP 4: Texte & Technik ══ */}
          {wizardStep === 4 && (
          <div className="space-y-5">
          <h2 className="text-lg font-bold">Texte & Technik</h2>

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
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Technik für diese Show</label>
              {technikItems.length === 0 ? (
                <p className="text-xs text-muted-foreground/50 italic">Noch kein Equipment im <a href="/admin/programm/technik" className="text-accent hover:text-accent/80">Technik-Inventar</a> angelegt.</p>
              ) : (
                <div className="space-y-1 max-h-48 overflow-y-auto rounded-xl bg-muted/10 border border-border/20 p-2">
                  {Object.entries(
                    technikItems.reduce((acc, t) => { (acc[t.kategorie] = acc[t.kategorie] || []).push(t); return acc; }, {} as Record<string, typeof technikItems>)
                  ).map(([kat, items]) => (
                    <div key={kat}>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground px-2 pt-1">{kat}</p>
                      {items.map(t => {
                        const isSelected = (selectedTechnik[t.id] || 0) > 0;
                        return (
                          <label key={t.id} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-accent/10" : "hover:bg-muted/20"}`}>
                            <input type="checkbox" checked={isSelected} onChange={e => {
                              setSelectedTechnik(prev => ({ ...prev, [t.id]: e.target.checked ? 1 : 0 }));
                            }} className="rounded" />
                            <span className="text-xs font-medium flex-1">{t.name}</span>
                            {isSelected && (
                              <input type="number" value={selectedTechnik[t.id] || 1} min={1} max={t.menge}
                                onChange={e => setSelectedTechnik(prev => ({ ...prev, [t.id]: Math.max(1, parseInt(e.target.value) || 1) }))}
                                onClick={e => e.stopPropagation()}
                                className="w-12 rounded-lg bg-white border border-border/30 px-1.5 py-0.5 text-xs text-center" />
                            )}
                            <span className="text-[9px] text-muted-foreground">{t.menge}×</span>
                          </label>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
              {/* Freitext für Sonderbedarf */}
              <textarea value={technischeAnforderungen} onChange={e => setTechnischeAnforderungen(e.target.value)} rows={2} placeholder="Sonstiger Bedarf (Bühne, Strom…)" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none mt-2" />
            </div>
          </div>

          </div>
          )}

          {/* ── Wizard Navigation ── */}
          <div className="flex items-center justify-between pt-4 border-t border-border/10">
            <button
              onClick={() => { if (wizardStep > 1) setWizardStep(wizardStep - 1); }}
              disabled={wizardStep === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border border-border/30 hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Zurück
            </button>
            <span className="text-xs text-muted-foreground">Schritt {wizardStep} von 4</span>
            {wizardStep < 4 ? (
              <button
                onClick={async () => { await handleSave(); setWizardStep(wizardStep + 1); }}
                disabled={saving || (wizardStep === 1 && !name.trim())}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:opacity-80 disabled:opacity-50"
              >
                {saving ? "Speichert…" : "Weiter"} <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            ) : (
              <button
                onClick={async () => { await handleSave(); setMessage("Konzept gespeichert!"); }}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" /> {saving ? "Speichert…" : "Fertig & Speichern"}
              </button>
            )}
          </div>
        </div>

        {/* ═══ RIGHT: Effekte-Sidebar (nur in Step 3) ═══ */}
        {wizardStep === 3 && !isWorkshop && (
          <div className="lg:sticky lg:top-20 space-y-3">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/30">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Effekte</h3>
                <button onClick={() => setShowQuickAdd(true)} className="p-1 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors" title="Neuen Effekt anlegen">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
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

      {/* Quick-Add Effect Popup */}
      {showQuickAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowQuickAdd(false)}>
          <div className="bg-background rounded-2xl shadow-2xl border border-border/30 p-5 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold mb-3">Neuen Effekt anlegen</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Name</label>
                <input value={quickAddName} onChange={e => setQuickAddName(e.target.value)} placeholder="z.B. Kartentrick"
                  className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" autoFocus
                  onKeyDown={e => { if (e.key === "Enter") handleQuickAddEffekt(); }} />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Dauer (Min.)</label>
                <input type="number" value={quickAddDauer} onChange={e => setQuickAddDauer(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={quickAddKonzeptOnly} onChange={e => setQuickAddKonzeptOnly(e.target.checked)} className="rounded" />
                <span className="text-xs text-muted-foreground">Nur für dieses Konzept</span>
              </label>
              <p className="text-[10px] text-muted-foreground">
                Typ: {isCloseUp ? "Close-Up" : isBuehne ? "Bühne" : "Beides"}{quickAddKonzeptOnly ? " · Erscheint nicht in der Effekte-Bibliothek" : ""}
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowQuickAdd(false)} className="flex-1 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/40">Abbrechen</button>
              <button onClick={handleQuickAddEffekt} disabled={quickAddSaving || !quickAddName.trim()} className="flex-1 py-2 rounded-xl bg-foreground text-background text-sm font-bold hover:opacity-90 disabled:opacity-50">
                {quickAddSaving ? "Erstelle…" : "Anlegen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminShowEditor;
