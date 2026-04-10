import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import type {
  Show,
  ShowPhase,
  Effekt,
  TeamMember,
  MusikTrack,
  ShowScript,
  GemaDaten,
} from "@/types/productions";
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Trash2,
  MoreVertical,
  Copy,
  Archive,
  ChevronUp,
  ChevronDown,
  Clock,
  Wand2,
  Star,
  Music,
  FileText,
  Users,
  Settings,
  DollarSign,
  ClipboardCopy,
  Pencil,
  Check,
  ListOrdered,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────

const FORMAT_LABELS: Record<string, string> = {
  abendshow: "Bühnenshow / Abendshow",
  "close-up": "Close-Up",
  "magic-dinner": "Magic Dinner",
  tourshow: "Tourshow",
  kundenbuchung: "Kundenbuchung",
  workshop: "Workshop",
  // Legacy keys
  buehnenshow: "Bühnenshow",
  closeup: "Close-Up",
  magic_dinner: "Magic Dinner",
};

const FORMAT_COLORS: Record<string, string> = {
  abendshow: "bg-purple-50 text-purple-700",
  "close-up": "bg-blue-50 text-blue-700",
  "magic-dinner": "bg-orange-50 text-orange-700",
  tourshow: "bg-cyan-50 text-cyan-700",
  kundenbuchung: "bg-green-50 text-green-700",
  workshop: "bg-amber-50 text-amber-700",
  // Legacy
  buehnenshow: "bg-purple-50 text-purple-700",
  closeup: "bg-blue-50 text-blue-700",
  magic_dinner: "bg-orange-50 text-orange-700",
  corporate: "bg-slate-50 text-slate-700",
  gala: "bg-amber-50 text-amber-700",
  hybrid: "bg-pink-50 text-pink-700",
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

const PHASE_TYPES = [
  { value: "einlass", label: "Einlass" },
  { value: "vorprogramm", label: "Vorprogramm" },
  { value: "akt1", label: "Akt 1" },
  { value: "pause", label: "Pause" },
  { value: "akt2", label: "Akt 2" },
  { value: "finale", label: "Finale" },
  { value: "sonstiges", label: "Sonstiges" },
] as const;

const BUDGET_KATEGORIEN = [
  "Material",
  "Transport",
  "Team",
  "Technik",
  "Marketing",
  "Sonstiges",
] as const;

const TEAM_ROLLEN: Record<string, string> = {
  techniker: "Techniker",
  assistent: "Assistent",
  fotograf: "Fotograf",
  videograf: "Videograf",
  moderator: "Moderator",
  musiker: "Musiker",
  servicekraft: "Servicekraft",
  fahrer: "Fahrer",
  sonstiges: "Sonstiges",
};

type TabKey =
  | "ablauf"
  | "effekte"
  | "texte"
  | "musik"
  | "team"
  | "technik"
  | "budget"
  | "gema";

const TABS: { key: TabKey; label: string; icon: typeof ListOrdered }[] = [
  { key: "ablauf", label: "Ablauf", icon: ListOrdered },
  { key: "effekte", label: "Effekte", icon: Wand2 },
  { key: "texte", label: "Texte & Skripte", icon: FileText },
  { key: "musik", label: "Musik", icon: Music },
  { key: "team", label: "Team", icon: Users },
  { key: "technik", label: "Technik", icon: Settings },
  { key: "budget", label: "Budget", icon: DollarSign },
  { key: "gema", label: "GEMA", icon: ClipboardCopy },
];

const inputCls =
  "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelCls = "block text-[10px] uppercase tracking-widest text-muted-foreground mb-1";

// ── Budget row type ───────────────────────────────────────────────────────────

interface BudgetRow {
  _id: string;
  posten: string;
  kategorie: string;
  betrag: number;
}

// ── Technik form ──────────────────────────────────────────────────────────────

interface TechnikForm {
  buehnenBreite: number;
  buehnenTiefe: number;
  buehnenHoehe: number;
  eigenesLicht: boolean;
  eigenerTon: boolean;
  nebelmaschine: boolean;
  pyrotechnik: boolean;
  stromanschluss: string;
  sonstigeAnforderungen: string;
}

const defaultTechnik: TechnikForm = {
  buehnenBreite: 0,
  buehnenTiefe: 0,
  buehnenHoehe: 0,
  eigenesLicht: false,
  eigenerTon: false,
  nebelmaschine: false,
  pyrotechnik: false,
  stromanschluss: "",
  sonstigeAnforderungen: "",
};

// ── ShowTeam assignment type ──────────────────────────────────────────────────

interface ShowTeamRow {
  id: string;
  show_id: string;
  team_member_id: string;
  rolle?: string;
  teamMember?: TeamMember;
}

// ── Main Component ────────────────────────────────────────────────────────────

const AdminShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Show data
  const [showName, setShowName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [format, setFormat] = useState("buehnenshow");
  const [status, setStatus] = useState("entwurf");
  const [dauer, setDauer] = useState(45);
  const [beschreibung, setBeschreibung] = useState("");

  // Phasen
  const [phasen, setPhasen] = useState<(ShowPhase & { _id: string })[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  // Effekte
  const [allEffekte, setAllEffekte] = useState<Effekt[]>([]);

  // Musik
  const [musikTracks, setMusikTracks] = useState<(MusikTrack & { _id: string })[]>([]);

  // Texte/Skripte
  const [texteScripts, setTexteScripts] = useState<(ShowScript & { _id: string })[]>([]);

  // Team
  const [allTeamMembers, setAllTeamMembers] = useState<TeamMember[]>([]);
  const [showTeam, setShowTeam] = useState<ShowTeamRow[]>([]);

  // Technik
  const [technik, setTechnik] = useState<TechnikForm>(defaultTechnik);

  // Budget
  const [budgetRows, setBudgetRows] = useState<BudgetRow[]>([]);
  const [revenue, setRevenue] = useState(0);

  // GEMA
  const [gemaDaten, setGemaDaten] = useState<(GemaDaten & { _id: string })[]>([]);

  // UI
  const [activeTab, setActiveTab] = useState<TabKey>("ablauf");
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Load ────────────────────────────────────────────────────────────────

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }

      if (!id) return;

      try {
        // Load show
        const { data: showData, error: showErr } = await supabase
          .from("shows_intern")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (showErr) throw showErr;
        if (!showData) {
          navigate("/admin/programm/shows");
          return;
        }

        const s = showData as any;
        setShowName(s.name || "");
        setFormat(s.format || "buehnenshow");
        setStatus(s.status || "entwurf");
        setDauer(s.zieldauer ?? s.dauer ?? 45);
        setBeschreibung(s.beschreibung || s.konzept_kundentext || "");

        // Phasen
        const loadedPhasen = (s.phasen || []) as ShowPhase[];
        setPhasen(loadedPhasen.map((p, i) => ({ ...p, _id: `phase-${i}-${Date.now()}` })));

        // Musik
        const loadedMusik = (s.musik_playlist || s.musikPlaylist || []) as MusikTrack[];
        setMusikTracks(loadedMusik.map((t, i) => ({ ...t, _id: `musik-${i}-${Date.now()}` })));

        // Texte
        const loadedTexte = (s.texte_scripts || s.texteScripts || []) as ShowScript[];
        setTexteScripts(loadedTexte.map((t, i) => ({ ...t, _id: `text-${i}-${Date.now()}` })));

        // GEMA
        const loadedGema = (s.gema_daten || s.gemaDaten || []) as GemaDaten[];
        setGemaDaten(loadedGema.map((g, i) => ({ ...g, _id: `gema-${i}-${Date.now()}` })));

        // Budget
        const budgetData = s.budget || {};
        setBudgetRows(
          (budgetData.rows || []).map((r: any, i: number) => ({
            ...r,
            _id: r._id || `budget-${i}-${Date.now()}`,
          }))
        );
        setRevenue(budgetData.revenue || 0);

        // Technik
        const techData = budgetData.technik || {};
        setTechnik({
          buehnenBreite: techData.buehnenBreite || 0,
          buehnenTiefe: techData.buehnenTiefe || 0,
          buehnenHoehe: techData.buehnenHoehe || 0,
          eigenesLicht: techData.eigenesLicht || false,
          eigenerTon: techData.eigenerTon || false,
          nebelmaschine: techData.nebelmaschine || false,
          pyrotechnik: techData.pyrotechnik || false,
          stromanschluss: techData.stromanschluss || "",
          sonstigeAnforderungen: techData.sonstigeAnforderungen || "",
        });

        // Load effects
        const { data: effekteData } = await supabase
          .from("effekte")
          .select("*")
          .order("name");
        setAllEffekte((effekteData || []) as unknown as Effekt[]);

        // Load team members
        const { data: teamData } = await supabase
          .from("team_members")
          .select("*")
          .order("name");
        setAllTeamMembers((teamData || []) as unknown as TeamMember[]);

        // Load show team assignments
        const { data: showTeamData } = await supabase
          .from("show_team")
          .select("*, team_members(*)")
          .eq("show_id", id);
        if (showTeamData) {
          setShowTeam(
            showTeamData.map((row: any) => ({
              id: row.id,
              show_id: row.show_id,
              team_member_id: row.team_member_id,
              rolle: row.rolle,
              teamMember: row.team_members as TeamMember,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load show:", err);
      }
      setLoading(false);
    };
    load();
  }, [id, navigate]);

  // ── Save ────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!showName.trim()) {
      setMessage({ type: "err", text: "Name ist erforderlich." });
      return;
    }
    setSaving(true);
    setMessage(null);
    try {
      const cleanPhasen: ShowPhase[] = phasen.map(({ _id, ...rest }) => rest);
      const cleanMusik: MusikTrack[] = musikTracks.map(({ _id, ...rest }) => rest);
      const cleanTexte: ShowScript[] = texteScripts.map(({ _id, ...rest }) => rest);
      const cleanGema: GemaDaten[] = gemaDaten.map(({ _id, ...rest }) => rest);
      const cleanBudgetRows = budgetRows.map(({ _id, ...rest }) => rest);

      const budgetPayload = {
        rows: cleanBudgetRows,
        revenue,
        technik,
      };

      const { error } = await supabase
        .from("shows_intern")
        .update({
          name: showName.trim(),
          format,
          status,
          zieldauer: dauer,
          konzept_kundentext: beschreibung.trim(),
          phasen: cleanPhasen,
          musik_playlist: cleanMusik,
          texte_scripts: cleanTexte,
          gema_daten: cleanGema,
          budget: budgetPayload,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
      if (error) throw error;
      setMessage({ type: "ok", text: "Gespeichert!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: unknown) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Fehler beim Speichern.",
      });
    }
    setSaving(false);
  };

  // ── Actions menu ────────────────────────────────────────────────────────

  const handleDuplicate = async () => {
    setMenuOpen(false);
    try {
      const cleanPhasen: ShowPhase[] = phasen.map(({ _id, ...rest }) => rest);
      const { data, error } = await supabase
        .from("shows_intern")
        .insert({
          name: `${showName} (Kopie)`,
          format,
          status: "entwurf",
          zieldauer: dauer,
          konzept_kundentext: beschreibung,
          phasen: cleanPhasen,
        })
        .select()
        .single();
      if (error) throw error;
      navigate(`/admin/programm/shows/${data.id}`);
    } catch {
      setMessage({ type: "err", text: "Fehler beim Duplizieren." });
    }
  };

  const handleArchive = () => {
    setMenuOpen(false);
    setStatus("archiv");
    setMessage({ type: "ok", text: "Status auf Archiv gesetzt. Bitte speichern." });
  };

  const handleDelete = async () => {
    setMenuOpen(false);
    if (!window.confirm(`"${showName}" wirklich loschen?`)) return;
    try {
      const { error } = await supabase.from("shows_intern").delete().eq("id", id);
      if (error) throw error;
      navigate("/admin/programm/shows");
    } catch {
      setMessage({ type: "err", text: "Fehler beim Loschen." });
    }
  };

  // ── Phase management ────────────────────────────────────────────────────

  const addPhase = () => {
    const newId = `phase-${Date.now()}`;
    setPhasen((prev) => [
      ...prev,
      { _id: newId, label: `Phase ${prev.length + 1}`, typ: "akt1" as any, effektIds: [] },
    ]);
    setExpandedPhase(newId);
  };

  const removePhase = (phaseId: string) => {
    setPhasen((prev) => prev.filter((p) => p._id !== phaseId));
  };

  const movePhase = (index: number, direction: "up" | "down") => {
    setPhasen((prev) => {
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const updatePhase = (phaseId: string, updates: Partial<ShowPhase>) => {
    setPhasen((prev) => prev.map((p) => (p._id === phaseId ? { ...p, ...updates } : p)));
  };

  const addEffektToPhase = (phaseId: string, effektId: string) => {
    setPhasen((prev) =>
      prev.map((p) =>
        p._id === phaseId ? { ...p, effektIds: [...p.effektIds, effektId] } : p
      )
    );
  };

  const removeEffektFromPhase = (phaseId: string, effektId: string) => {
    setPhasen((prev) =>
      prev.map((p) =>
        p._id === phaseId
          ? { ...p, effektIds: p.effektIds.filter((eid) => eid !== effektId) }
          : p
      )
    );
  };

  // ── Musik management ────────────────────────────────────────────────────

  const addMusikTrack = () => {
    setMusikTracks((prev) => [
      ...prev,
      { _id: `musik-${Date.now()}`, titel: "", kuenstler: "", dauer: 0, gemaNr: "" },
    ]);
  };

  const removeMusikTrack = (trackId: string) => {
    setMusikTracks((prev) => prev.filter((t) => t._id !== trackId));
  };

  const updateMusikTrack = (trackId: string, updates: Partial<MusikTrack>) => {
    setMusikTracks((prev) => prev.map((t) => (t._id === trackId ? { ...t, ...updates } : t)));
  };

  // ── Budget management ───────────────────────────────────────────────────

  const addBudgetRow = () => {
    setBudgetRows((prev) => [
      ...prev,
      { _id: `budget-${Date.now()}`, posten: "", kategorie: "Sonstiges", betrag: 0 },
    ]);
  };

  const removeBudgetRow = (rowId: string) => {
    setBudgetRows((prev) => prev.filter((r) => r._id !== rowId));
  };

  const updateBudgetRow = (rowId: string, updates: Partial<BudgetRow>) => {
    setBudgetRows((prev) => prev.map((r) => (r._id === rowId ? { ...r, ...updates } : r)));
  };

  const totalExpenses = budgetRows.reduce((sum, r) => sum + (r.betrag || 0), 0);
  const profit = revenue - totalExpenses;

  // ── Team management ─────────────────────────────────────────────────────

  const addTeamMember = async (memberId: string) => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from("show_team")
        .insert({ show_id: id, team_member_id: memberId })
        .select("*, team_members(*)")
        .single();
      if (error) throw error;
      setShowTeam((prev) => [
        ...prev,
        {
          id: data.id,
          show_id: data.show_id,
          team_member_id: data.team_member_id,
          rolle: data.rolle,
          teamMember: data.team_members as TeamMember,
        },
      ]);
    } catch {
      setMessage({ type: "err", text: "Fehler beim Zuweisen." });
    }
  };

  const removeTeamMember = async (assignmentId: string) => {
    try {
      const { error } = await supabase.from("show_team").delete().eq("id", assignmentId);
      if (error) throw error;
      setShowTeam((prev) => prev.filter((t) => t.id !== assignmentId));
    } catch {
      setMessage({ type: "err", text: "Fehler beim Entfernen." });
    }
  };

  // ── GEMA export ─────────────────────────────────────────────────────────

  const gemaFromMusik = musikTracks
    .filter((t) => t.gemaNr)
    .map((t) => ({
      werktitel: t.titel,
      urheber: t.kuenstler,
      verlag: "",
      dauer: t.dauer,
    }));

  const allGema = [...gemaFromMusik, ...gemaDaten.map(({ _id, ...rest }) => rest)];

  const exportGema = () => {
    const lines = allGema.map(
      (g) => `${g.werktitel}\t${g.urheber}\t${g.verlag || ""}\t${g.dauer}s`
    );
    const text = "Werktitel\tUrheber\tVerlag\tDauer\n" + lines.join("\n");
    navigator.clipboard.writeText(text);
    setMessage({ type: "ok", text: "GEMA-Daten in Zwischenablage kopiert." });
    setTimeout(() => setMessage(null), 3000);
  };

  // ── Total musik duration ────────────────────────────────────────────────

  const totalMusikDauer = musikTracks.reduce((sum, t) => sum + (t.dauer || 0), 0);

  // ── Render helpers ──────────────────────────────────────────────────────

  const getEffektById = (effektId: string) => allEffekte.find((e) => e.id === effektId);

  // ── Early returns ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen...</div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <AdminLayout title={showName || "Show"} subtitle="Show bearbeiten">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Link
            to="/admin/programm/shows"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Editable name */}
          {editingName ? (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <input
                autoFocus
                value={showName}
                onChange={(e) => setShowName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEditingName(false);
                }}
                className="flex-1 text-lg font-bold text-foreground bg-muted/30 border border-border/30 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button onClick={() => setEditingName(false)} className="text-green-600">
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="flex items-center gap-2 min-w-0 group"
            >
              <h1 className="text-lg font-bold text-foreground truncate">{showName}</h1>
              <Pencil className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-accent shrink-0" />
            </button>
          )}

          {/* Badges */}
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
              FORMAT_COLORS[format] || "bg-gray-50 text-gray-700"
            }`}
          >
            {FORMAT_LABELS[format] || format}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
              STATUS_COLORS[status] || "bg-gray-50 text-gray-600"
            }`}
          >
            {STATUS_LABELS[status] || status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {message && (
            <span
              className={`text-xs px-3 py-1.5 rounded-lg ${
                message.type === "ok"
                  ? "bg-green-50 text-green-700"
                  : "bg-destructive/5 text-destructive"
              }`}
            >
              {message.text}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Speichert..." : "Speichern"}
          </button>

          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border/30 rounded-xl shadow-lg z-50 py-1">
                  <button
                    onClick={handleDuplicate}
                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/40 flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Duplizieren
                  </button>
                  <button
                    onClick={handleArchive}
                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/40 flex items-center gap-2"
                  >
                    <Archive className="w-4 h-4" />
                    Archivieren
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Loschen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab content ── */}
      <div className="min-h-[400px]">
        {/* ═══ TAB: Ablauf ═══ */}
        {activeTab === "ablauf" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                Ablauf / Phasen ({phasen.length})
              </h2>
              <button
                onClick={addPhase}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80"
              >
                <Plus className="w-3.5 h-3.5" /> Phase hinzufugen
              </button>
            </div>

            {phasen.length === 0 ? (
              <button
                onClick={addPhase}
                className="w-full p-8 rounded-xl border-2 border-dashed border-border/30 text-center text-sm text-muted-foreground hover:border-accent/30 hover:text-accent transition-colors"
              >
                + Erste Phase hinzufugen
              </button>
            ) : (
              <div className="space-y-2">
                {phasen.map((phase, idx) => {
                  const isExpanded = expandedPhase === phase._id;
                  const phaseEffekte = phase.effektIds
                    .map((eid) => getEffektById(eid))
                    .filter(Boolean) as Effekt[];
                  const phaseDauer = phaseEffekte.reduce((s, e) => s + (e.dauer || 0), 0);

                  return (
                    <div
                      key={phase._id}
                      className="rounded-xl border border-border/30 bg-white overflow-hidden"
                    >
                      {/* Phase header */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-muted/10">
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => movePhase(idx, "up")}
                            disabled={idx === 0}
                            className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => movePhase(idx, "down")}
                            disabled={idx === phasen.length - 1}
                            className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground w-5">
                          {idx + 1}
                        </span>
                        <input
                          value={phase.label}
                          onChange={(e) => updatePhase(phase._id, { label: e.target.value })}
                          className="flex-1 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground/40"
                          placeholder="Phasenname"
                        />
                        <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {phaseDauer} min
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 shrink-0">
                          {phaseEffekte.length} Effekte
                        </span>
                        <button
                          onClick={() =>
                            setExpandedPhase(isExpanded ? null : phase._id)
                          }
                          className="p-1 text-muted-foreground hover:text-foreground"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => removePhase(phase._id)}
                          className="p-1 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-4 py-3 space-y-2 border-t border-border/10">
                          {/* Phase type */}
                          <select
                            value={phase.typ}
                            onChange={(e) =>
                              updatePhase(phase._id, {
                                typ: e.target.value as ShowPhase["typ"],
                              })
                            }
                            className="w-full rounded-lg bg-muted/30 border border-border/20 px-2.5 py-1.5 text-xs text-muted-foreground"
                          >
                            {PHASE_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>

                          {/* Effect chips */}
                          {phaseEffekte.length === 0 ? (
                            <p className="text-[11px] text-muted-foreground/50 py-1 italic">
                              Keine Effekte zugewiesen
                            </p>
                          ) : (
                            phaseEffekte.map((eff) => (
                              <div
                                key={eff.id}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/5 border border-accent/10"
                              >
                                <Wand2 className="w-3 h-3 text-accent shrink-0" />
                                <span className="text-xs font-medium flex-1 truncate">
                                  {eff.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {eff.dauer} Min.
                                </span>
                                <button
                                  onClick={() =>
                                    removeEffektFromPhase(phase._id, eff.id)
                                  }
                                  className="p-0.5 text-muted-foreground hover:text-destructive"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))
                          )}

                          {/* Quick add */}
                          <select
                            value=""
                            onChange={(e) => {
                              if (e.target.value) addEffektToPhase(phase._id, e.target.value);
                            }}
                            className="w-full rounded-lg bg-muted/20 border border-border/20 px-3 py-1.5 text-xs text-muted-foreground"
                          >
                            <option value="">+ Effekt hinzufugen...</option>
                            {allEffekte
                              .filter(
                                (e) =>
                                  e.status === "aktiv" &&
                                  !phase.effektIds.includes(e.id)
                              )
                              .map((e) => (
                                <option key={e.id} value={e.id}>
                                  {e.name} ({e.dauer} Min.)
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB: Effekte ═══ */}
        {activeTab === "effekte" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-foreground">
              Zugewiesene Effekte
            </h2>

            {(() => {
              const usedEffektIds = new Set(
                phasen.flatMap((p) => p.effektIds)
              );
              const usedEffekte = allEffekte.filter((e) =>
                usedEffektIds.has(e.id)
              );

              if (usedEffekte.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    Noch keine Effekte zugewiesen. Weise Effekte im Ablauf-Tab zu.
                  </p>
                );
              }

              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {usedEffekte.map((eff) => (
                    <div
                      key={eff.id}
                      className="p-4 rounded-xl bg-muted/20 border border-border/30"
                    >
                      <p className="text-sm font-bold text-foreground mb-1 truncate">
                        {eff.name}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            eff.typ === "closeup"
                              ? "bg-blue-50 text-blue-700"
                              : eff.typ === "buehne"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {eff.typ === "closeup"
                            ? "Close-Up"
                            : eff.typ === "buehne"
                            ? "Buhne"
                            : "Beides"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {eff.dauer} Min.
                        </span>
                        {eff.wowRating && (
                          <span className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i <= (eff.wowRating || 0)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-muted-foreground/20"
                                }`}
                              />
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Add effect button */}
            <div>
              <select
                value=""
                onChange={(e) => {
                  if (!e.target.value) return;
                  // Add to last phase, or create one
                  if (phasen.length === 0) {
                    const newId = `phase-${Date.now()}`;
                    setPhasen([
                      {
                        _id: newId,
                        label: "Phase 1",
                        typ: "akt1" as any,
                        effektIds: [e.target.value],
                      },
                    ]);
                  } else {
                    addEffektToPhase(phasen[phasen.length - 1]._id, e.target.value);
                  }
                }}
                className="rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground"
              >
                <option value="">+ Effekt hinzufugen...</option>
                {allEffekte
                  .filter((e) => e.status === "aktiv")
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.dauer} Min.)
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {/* ═══ TAB: Texte & Skripte ═══ */}
        {activeTab === "texte" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-foreground">
              Texte & Skripte pro Phase
            </h2>

            {phasen.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Erstelle zuerst Phasen im Ablauf-Tab.
              </p>
            ) : (
              <div className="space-y-4">
                {phasen.map((phase) => {
                  const existing = texteScripts.find(
                    (t) => t.phasenLabel === phase.label
                  );
                  return (
                    <div key={phase._id} className="space-y-1.5">
                      <label className={labelCls}>{phase.label}</label>
                      <textarea
                        value={existing?.text || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTexteScripts((prev) => {
                            const idx = prev.findIndex(
                              (t) => t.phasenLabel === phase.label
                            );
                            if (idx >= 0) {
                              const next = [...prev];
                              next[idx] = { ...next[idx], text: val };
                              return next;
                            }
                            return [
                              ...prev,
                              {
                                _id: `text-${Date.now()}`,
                                phasenLabel: phase.label,
                                text: val,
                              },
                            ];
                          });
                        }}
                        rows={4}
                        placeholder={`Skript/Text fur ${phase.label}...`}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB: Musik ═══ */}
        {activeTab === "musik" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                Musik-Playlist
              </h2>
              <span className="text-xs text-muted-foreground">
                Gesamt: {Math.floor(totalMusikDauer / 60)}:{String(totalMusikDauer % 60).padStart(2, "0")} Min.
              </span>
            </div>

            {musikTracks.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Noch keine Tracks hinzugefugt.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/20">
                      <th className="text-left py-2 px-2">Titel</th>
                      <th className="text-left py-2 px-2">Kunstler</th>
                      <th className="text-left py-2 px-2 w-24">Dauer (s)</th>
                      <th className="text-left py-2 px-2 w-28">GEMA-Nr</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {musikTracks.map((track) => (
                      <tr key={track._id} className="border-b border-border/10">
                        <td className="py-2 px-2">
                          <input
                            value={track.titel}
                            onChange={(e) =>
                              updateMusikTrack(track._id, { titel: e.target.value })
                            }
                            placeholder="Titel"
                            className="w-full bg-transparent text-sm outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            value={track.kuenstler}
                            onChange={(e) =>
                              updateMusikTrack(track._id, {
                                kuenstler: e.target.value,
                              })
                            }
                            placeholder="Kunstler"
                            className="w-full bg-transparent text-sm outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            min={0}
                            value={track.dauer}
                            onChange={(e) =>
                              updateMusikTrack(track._id, {
                                dauer: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full bg-transparent text-sm outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            value={track.gemaNr || ""}
                            onChange={(e) =>
                              updateMusikTrack(track._id, { gemaNr: e.target.value })
                            }
                            placeholder="GEMA-Nr"
                            className="w-full bg-transparent text-sm outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <button
                            onClick={() => removeMusikTrack(track._id)}
                            className="p-1 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              onClick={addMusikTrack}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80"
            >
              <Plus className="w-3.5 h-3.5" /> Track hinzufugen
            </button>
          </div>
        )}

        {/* ═══ TAB: Team ═══ */}
        {activeTab === "team" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-foreground">
              Team-Zuweisungen
            </h2>

            {showTeam.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Noch keine Teammitglieder zugewiesen.
              </p>
            ) : (
              <div className="space-y-2">
                {showTeam.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 border border-border/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {assignment.teamMember?.name || "Unbekannt"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {assignment.rolle
                          ? TEAM_ROLLEN[assignment.rolle] || assignment.rolle
                          : assignment.teamMember?.rolle
                          ? TEAM_ROLLEN[assignment.teamMember.rolle] ||
                            assignment.teamMember.rolle
                          : "Keine Rolle"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeTeamMember(assignment.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add member dropdown */}
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) addTeamMember(e.target.value);
              }}
              className="rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground"
            >
              <option value="">+ Mitglied zuweisen...</option>
              {allTeamMembers
                .filter(
                  (m) =>
                    !showTeam.some((st) => st.team_member_id === m.id)
                )
                .map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({TEAM_ROLLEN[m.rolle] || m.rolle})
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* ═══ TAB: Technik ═══ */}
        {activeTab === "technik" && (
          <div className="space-y-5 max-w-2xl">
            <h2 className="text-sm font-bold text-foreground">
              Technische Anforderungen
            </h2>

            {/* Dimensions */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Buhnenbreite (m)</label>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={technik.buehnenBreite}
                  onChange={(e) =>
                    setTechnik((t) => ({
                      ...t,
                      buehnenBreite: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Buhnentiefe (m)</label>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={technik.buehnenTiefe}
                  onChange={(e) =>
                    setTechnik((t) => ({
                      ...t,
                      buehnenTiefe: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Buhnenhohe (m)</label>
                <input
                  type="number"
                  step="0.1"
                  min={0}
                  value={technik.buehnenHoehe}
                  onChange={(e) =>
                    setTechnik((t) => ({
                      ...t,
                      buehnenHoehe: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className={inputCls}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "eigenesLicht" as const, label: "Eigenes Licht" },
                { key: "eigenerTon" as const, label: "Eigener Ton" },
                { key: "nebelmaschine" as const, label: "Nebelmaschine" },
                { key: "pyrotechnik" as const, label: "Pyrotechnik" },
              ].map(({ key, label }) => (
                <label
                  key={key}
                  className="flex items-center gap-2 p-3 rounded-xl bg-muted/20 border border-border/30 cursor-pointer hover:bg-muted/40 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={technik[key]}
                    onChange={(e) =>
                      setTechnik((t) => ({ ...t, [key]: e.target.checked }))
                    }
                    className="w-4 h-4 rounded border-border/30 text-accent focus:ring-accent/20"
                  />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>

            {/* Textareas */}
            <div>
              <label className={labelCls}>Stromanschluss-Bedarf</label>
              <textarea
                value={technik.stromanschluss}
                onChange={(e) =>
                  setTechnik((t) => ({ ...t, stromanschluss: e.target.value }))
                }
                rows={2}
                placeholder="z.B. 3x 230V/16A Schuko..."
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <label className={labelCls}>Sonstige Technik-Anforderungen</label>
              <textarea
                value={technik.sonstigeAnforderungen}
                onChange={(e) =>
                  setTechnik((t) => ({
                    ...t,
                    sonstigeAnforderungen: e.target.value,
                  }))
                }
                rows={3}
                placeholder="Weitere technische Anforderungen..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>
        )}

        {/* ═══ TAB: Budget ═══ */}
        {activeTab === "budget" && (
          <div className="space-y-5">
            <h2 className="text-sm font-bold text-foreground">
              Budgetkalkulation
            </h2>

            {/* Revenue */}
            <div className="max-w-xs">
              <label className={labelCls}>Gage / Honorar (EUR)</label>
              <input
                type="number"
                min={0}
                value={revenue}
                onChange={(e) => setRevenue(parseFloat(e.target.value) || 0)}
                className={inputCls}
              />
            </div>

            {/* Expense table */}
            {budgetRows.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/20">
                      <th className="text-left py-2 px-2">Posten</th>
                      <th className="text-left py-2 px-2 w-40">Kategorie</th>
                      <th className="text-right py-2 px-2 w-28">Betrag (EUR)</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetRows.map((row) => (
                      <tr key={row._id} className="border-b border-border/10">
                        <td className="py-2 px-2">
                          <input
                            value={row.posten}
                            onChange={(e) =>
                              updateBudgetRow(row._id, { posten: e.target.value })
                            }
                            placeholder="Bezeichnung"
                            className="w-full bg-transparent text-sm outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <select
                            value={row.kategorie}
                            onChange={(e) =>
                              updateBudgetRow(row._id, {
                                kategorie: e.target.value,
                              })
                            }
                            className="w-full bg-transparent text-sm outline-none"
                          >
                            {BUDGET_KATEGORIEN.map((k) => (
                              <option key={k} value={k}>
                                {k}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <input
                            type="number"
                            min={0}
                            step="0.01"
                            value={row.betrag}
                            onChange={(e) =>
                              updateBudgetRow(row._id, {
                                betrag: parseFloat(e.target.value) || 0,
                              })
                            }
                            className="w-full bg-transparent text-sm outline-none text-right"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <button
                            onClick={() => removeBudgetRow(row._id)}
                            className="p-1 text-muted-foreground hover:text-destructive"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <button
              onClick={addBudgetRow}
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80"
            >
              <Plus className="w-3.5 h-3.5" /> Posten hinzufugen
            </button>

            {/* Summary */}
            <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-muted/20 border border-border/30">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Ausgaben
                </p>
                <p className="text-sm font-bold text-foreground">
                  {totalExpenses.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Gage
                </p>
                <p className="text-sm font-bold text-foreground">
                  {revenue.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Gewinn
                </p>
                <p
                  className={`text-lg font-bold ${
                    profit >= 0 ? "text-green-600" : "text-destructive"
                  }`}
                >
                  {profit.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB: GEMA ═══ */}
        {activeTab === "gema" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                GEMA-Meldung
              </h2>
              <button
                onClick={exportGema}
                disabled={allGema.length === 0}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 disabled:opacity-40"
              >
                <ClipboardCopy className="w-3.5 h-3.5" />
                In Zwischenablage kopieren
              </button>
            </div>

            {allGema.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Keine GEMA-pflichtigen Werke. Trage GEMA-Nummern im Musik-Tab ein.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/20">
                      <th className="text-left py-2 px-2">Werktitel</th>
                      <th className="text-left py-2 px-2">Urheber</th>
                      <th className="text-left py-2 px-2">Verlag</th>
                      <th className="text-right py-2 px-2 w-24">Dauer (s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allGema.map((g, idx) => (
                      <tr key={idx} className="border-b border-border/10">
                        <td className="py-2 px-2 text-foreground">{g.werktitel}</td>
                        <td className="py-2 px-2 text-foreground">{g.urheber}</td>
                        <td className="py-2 px-2 text-muted-foreground">
                          {g.verlag || "-"}
                        </td>
                        <td className="py-2 px-2 text-right text-muted-foreground">
                          {g.dauer}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminShowDetail;
