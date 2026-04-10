import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { showService } from "@/services/showService";
import { effekteService } from "@/services/effekteService";
import type { Show, ShowPhase, Effekt } from "@/types/productions";
import { ArrowLeft, Plus, X, GripVertical, Clock, Wand2, Play, Save, Trash2, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import {
  DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Sortable Phase Item ───────────────────────────────────────────────────────

function SortablePhaseEffekt({ effekt, onRemove }: { effekt: Effekt; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: effekt.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

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

// ── Main Component ────────────────────────────────────────────────────────────

const AdminShowEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [allEffekte, setAllEffekte] = useState<Effekt[]>([]);
  const [message, setMessage] = useState("");

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

  // Sidebar filter
  const [effektSearch, setEffektSearch] = useState("");
  const [effektTypFilter, setEffektTypFilter] = useState<string>("alle");

  // DnD
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // ── Load ────────────────────────────────────────────────────────────────────

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

  // ── Phase management ───────────────────────────────────────────────────────

  const addPhase = () => {
    const newId = `phase-${Date.now()}`;
    setPhasen(prev => [...prev, { _id: newId, label: `Phase ${prev.length + 1}`, typ: "akt1", effektIds: [] }]);
    setExpandedPhase(newId);
  };

  const removePhase = (phaseId: string) => {
    setPhasen(prev => prev.filter(p => p._id !== phaseId));
  };

  const addEffektToPhase = (phaseId: string, effektId: string) => {
    setPhasen(prev => prev.map(p => p._id === phaseId ? { ...p, effektIds: [...p.effektIds, effektId] } : p));
  };

  const removeEffektFromPhase = (phaseId: string, effektId: string) => {
    setPhasen(prev => prev.map(p => p._id === phaseId ? { ...p, effektIds: p.effektIds.filter(id => id !== effektId) } : p));
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPhasen(prev => {
        const oldIdx = prev.findIndex(p => p._id === active.id);
        const newIdx = prev.findIndex(p => p._id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  }, []);

  // ── Computed ────────────────────────────────────────────────────────────────

  const totalEffektDauer = phasen.reduce((sum, p) => {
    return sum + p.effektIds.reduce((s, eid) => {
      const e = allEffekte.find(ef => ef.id === eid);
      return s + (e?.dauer || 0);
    }, 0);
  }, 0);

  const overZieldauer = totalEffektDauer > zieldauer;

  // Timeline-Berechnung mit Uhrzeiten
  const timelineItems = (() => {
    const items: { label: string; startTime: string; dauer: number; effekte: Effekt[] }[] = [];
    let currentMinutes = parseInt(startzeit.split(":")[0]) * 60 + parseInt(startzeit.split(":")[1] || "0");

    for (const phase of phasen) {
      const phaseEffekte = phase.effektIds.map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean) as Effekt[];
      const phaseDauer = phaseEffekte.reduce((s, e) => s + e.dauer, 0);
      const h = String(Math.floor(currentMinutes / 60) % 24).padStart(2, "0");
      const m = String(currentMinutes % 60).padStart(2, "0");
      items.push({ label: phase.label, startTime: `${h}:${m}`, dauer: phaseDauer, effekte: phaseEffekte });
      currentMinutes += phaseDauer;
    }
    return items;
  })();

  // Filtered effekte for sidebar
  const filteredEffekte = allEffekte.filter(e => {
    if (e.status !== "aktiv") return false;
    if (effektTypFilter !== "alle" && e.typ !== effektTypFilter) return false;
    if (effektSearch && !e.name.toLowerCase().includes(effektSearch.toLowerCase())) return false;
    return true;
  });

  // Group by typ for Close-Up view
  const effekteByTyp = {
    closeup: filteredEffekte.filter(e => e.typ === "closeup"),
    buehne: filteredEffekte.filter(e => e.typ === "buehne"),
    beides: filteredEffekte.filter(e => e.typ === "beides"),
  };

  // ── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!name.trim()) { setMessage("Name ist erforderlich."); return; }
    setSaving(true);
    setMessage("");
    try {
      const cleanPhasen: ShowPhase[] = phasen.map(({ _id, ...rest }) => rest);
      const payload = { name: name.trim(), format, status, anlass: anlass.trim(), zieldauer, konzeptKundentext: konzeptKundentext.trim(), technischeAnforderungen: technischeAnforderungen.trim(), phasen: cleanPhasen };

      if (isNew) {
        const created = await showService.create(payload);
        setMessage("Konzept erstellt!");
        navigate(`/admin/shows/${created.id}`, { replace: true });
      } else if (id) {
        await showService.update(id, payload);
        setMessage("Gespeichert!");
      }
    } catch (err: any) {
      setMessage("Fehler: " + (err.message || "Unbekannt"));
    }
    setSaving(false);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  if (loading) return <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen…</div>;

  const isCloseUp = format === "close-up";

  return (
    <AdminLayout title={isNew ? "Neues Konzept" : name || "Konzept"} subtitle="Show-Ablauf planen">
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-5">
        <Link to="/admin/shows" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> Zurück zu Konzepte
        </Link>
        <div className="flex items-center gap-2">
          {message && <span className={`text-xs ${message.startsWith("Fehler") ? "text-destructive" : "text-green-600"}`}>{message}</span>}
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? "Speichert…" : "Speichern"}
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT: Editor + Sidebar ── */}
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
              <select value={format} onChange={e => setFormat(e.target.value)} className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm">
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

          {/* ── TIMELINE / ABLAUF ── */}
          {isCloseUp ? (
            /* ── CLOSE-UP: Effekt-Pool kategorisiert ── */
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-foreground">Effekt-Pool</h2>
              <p className="text-xs text-muted-foreground">Effekte die du bei dieser Show dabei hast. Reihenfolge spontan.</p>

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
                // Gruppiert nach Typ
                const grouped = {
                  closeup: phaseEffekte.filter(e => e.typ === "closeup"),
                  buehne: phaseEffekte.filter(e => e.typ === "buehne"),
                  beides: phaseEffekte.filter(e => e.typ === "beides"),
                };
                return (
                  <div key={phase._id} className="space-y-3">
                    {Object.entries(grouped).filter(([, effs]) => effs.length > 0).map(([typ, effs]) => (
                      <div key={typ}>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{EFFEKT_TYP_LABELS[typ] || typ}</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {effs.map(eff => (
                            <div key={eff.id} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-border/20">
                              <Wand2 className="w-3.5 h-3.5 text-accent shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{eff.name}</p>
                                <p className="text-[10px] text-muted-foreground">{eff.dauer} Min.</p>
                              </div>
                              <button onClick={() => removeEffektFromPhase(phase._id, eff.id)} className="p-1 text-muted-foreground hover:text-destructive">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {phaseEffekte.length === 0 && (
                      <p className="text-xs text-muted-foreground/50 italic py-2">Ziehe Effekte aus der Sidebar hierher</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── BÜHNENSHOW / KOMBINATION: Linearer Ablauf ── */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground">Ablauf / Timeline</h2>
                <button onClick={addPhase} className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80">
                  <Plus className="w-3.5 h-3.5" /> Phase hinzufügen
                </button>
              </div>

              {phasen.length === 0 ? (
                <button onClick={addPhase} className="w-full p-8 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors">
                  + Erste Phase hinzufügen
                </button>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={phasen.map(p => p._id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                      {phasen.map((phase, idx) => {
                        const phaseEffekte = phase.effektIds.map(eid => allEffekte.find(e => e.id === eid)).filter(Boolean) as Effekt[];
                        const phaseDauer = phaseEffekte.reduce((s, e) => s + e.dauer, 0);
                        const ti = timelineItems[idx];
                        const isExpanded = expandedPhase === phase._id;

                        return (
                          <div key={phase._id} className="rounded-xl border border-border/30 bg-white overflow-hidden">
                            {/* Phase header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-muted/10">
                              <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab" />
                              <span className="text-xs font-mono text-accent font-bold w-12">{ti?.startTime || "--:--"}</span>
                              <input
                                value={phase.label}
                                onChange={e => setPhasen(prev => prev.map(p => p._id === phase._id ? { ...p, label: e.target.value } : p))}
                                className="flex-1 bg-transparent text-sm font-semibold text-foreground outline-none"
                                placeholder="Phasenname"
                              />
                              <span className="text-[10px] text-muted-foreground">{phaseDauer} Min. · {phaseEffekte.length} Effekte</span>
                              <button onClick={() => setExpandedPhase(isExpanded ? null : phase._id)} className="p-1 text-muted-foreground hover:text-foreground">
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                              <button onClick={() => removePhase(phase._id)} className="p-1 text-muted-foreground hover:text-destructive">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Expanded: Effekte */}
                            {isExpanded && (
                              <div className="px-4 py-3 space-y-2 border-t border-border/10">
                                {phaseEffekte.length === 0 ? (
                                  <p className="text-xs text-muted-foreground/50 italic py-2">Effekte aus der Sidebar hierher ziehen oder unten auswählen</p>
                                ) : phaseEffekte.map(eff => (
                                  <div key={eff.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/5 border border-accent/10">
                                    <Play className="w-3 h-3 text-accent shrink-0" />
                                    <span className="text-sm font-medium flex-1 truncate">{eff.name}</span>
                                    <span className="text-[10px] text-muted-foreground">{eff.dauer} Min.</span>
                                    <button onClick={() => removeEffektFromPhase(phase._id, eff.id)} className="p-0.5 text-muted-foreground hover:text-destructive">
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}

                                {/* Quick-Add Dropdown */}
                                <select
                                  value=""
                                  onChange={e => { if (e.target.value) addEffektToPhase(phase._id, e.target.value); }}
                                  className="w-full rounded-lg bg-muted/20 border border-border/20 px-3 py-1.5 text-xs text-muted-foreground"
                                >
                                  <option value="">+ Effekt hinzufügen…</option>
                                  {allEffekte.filter(e => e.status === "aktiv").map(e => (
                                    <option key={e.id} value={e.id}>{e.name} ({e.dauer} Min. · {EFFEKT_TYP_LABELS[e.typ]})</option>
                                  ))}
                                </select>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          )}

          {/* Beschreibungstexte */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Kundentext</label>
              <textarea value={konzeptKundentext} onChange={e => setKonzeptKundentext(e.target.value)} rows={4} placeholder="Beschreibung für den Kunden…" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Technische Anforderungen</label>
              <textarea value={technischeAnforderungen} onChange={e => setTechnischeAnforderungen(e.target.value)} rows={4} placeholder="Bühne, Licht, Ton…" className="w-full rounded-xl bg-muted/30 border border-border/20 px-3 py-2 text-sm resize-none" />
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: Effekte-Sidebar ═══ */}
        <div className="lg:sticky lg:top-20 space-y-3">
          <div className="p-4 rounded-2xl bg-muted/20 border border-border/30">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Effekte</h3>

            {/* Search */}
            <input
              value={effektSearch}
              onChange={e => setEffektSearch(e.target.value)}
              placeholder="Effekt suchen…"
              className="w-full rounded-lg bg-background border border-border/20 px-3 py-1.5 text-xs mb-2"
            />

            {/* Type filter */}
            <div className="flex gap-1 mb-3">
              {["alle", "closeup", "buehne", "beides"].map(t => (
                <button key={t} onClick={() => setEffektTypFilter(t)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-medium ${effektTypFilter === t ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"}`}
                >
                  {t === "alle" ? "Alle" : EFFEKT_TYP_LABELS[t] || t}
                </button>
              ))}
            </div>

            {/* Effekte List */}
            <div className="space-y-1 max-h-[60vh] overflow-y-auto">
              {filteredEffekte.length === 0 ? (
                <p className="text-xs text-muted-foreground/50 italic py-4 text-center">Keine Effekte gefunden</p>
              ) : filteredEffekte.map(eff => (
                <button
                  key={eff.id}
                  onClick={() => {
                    // Zum ersten offenen/expanded Phase hinzufügen, oder neue erstellen
                    if (phasen.length === 0) {
                      const newId = `phase-${Date.now()}`;
                      setPhasen([{ _id: newId, label: isCloseUp ? "Meine Effekte" : "Phase 1", typ: "akt1", effektIds: [eff.id] }]);
                      setExpandedPhase(newId);
                    } else {
                      const targetPhase = expandedPhase ? phasen.find(p => p._id === expandedPhase) : phasen[phasen.length - 1];
                      if (targetPhase) addEffektToPhase(targetPhase._id, eff.id);
                    }
                  }}
                  className="w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-muted/40 transition-colors group"
                >
                  <Wand2 className="w-3 h-3 text-muted-foreground/40 group-hover:text-accent shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{eff.name}</p>
                    <p className="text-[9px] text-muted-foreground">{eff.dauer} Min.</p>
                  </div>
                  <Plus className="w-3 h-3 text-muted-foreground/30 group-hover:text-accent" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminShowEditor;
