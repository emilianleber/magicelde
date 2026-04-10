import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Search,
  X,
  Clock,
  Star,
  Wand2,
  Video,
  LayoutGrid,
  List,
  ChevronRight,
  Timer,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

// Hauptfilter: Typ
const TYP_TABS = ["Alle", "closeup", "buehne", "beides"] as const;
type TypTab = (typeof TYP_TABS)[number];
const TYP_TAB_LABELS: Record<string, string> = { Alle: "Alle", closeup: "Close-Up", buehne: "Bühne", beides: "Beides" };

// Unterkategorien je nach Typ
const KATEGORIE_BY_TYP: Record<string, string[]> = {
  closeup: ["Karten", "Münzen", "Mental", "Visual", "Tool", "Sonstiges"],
  buehne: ["Comedy", "Mental", "Escape", "Manipulation", "Sonstiges"],
  beides: ["Karten", "Münzen", "Mental", "Visual", "Tool", "Comedy", "Escape", "Manipulation", "Sonstiges"],
};
const ALL_KATEGORIEN = ["Karten", "Münzen", "Mental", "Visual", "Tool", "Comedy", "Escape", "Manipulation", "Sonstiges"];

const TYP_OPTIONS = ["closeup", "buehne", "beides"] as const;
const TYP_LABELS: Record<string, string> = { closeup: "Close-Up", buehne: "Bühne", beides: "Beides" };

const STATUS_OPTIONS = ["aktiv", "entwicklung", "pausiert"] as const;
const STATUS_LABELS: Record<string, string> = { aktiv: "Aktiv", entwicklung: "Entwurf", pausiert: "Pausiert" };

const TYP_COLORS: Record<string, string> = {
  closeup: "bg-blue-100 text-blue-700",
  buehne: "bg-purple-100 text-purple-700",
  beides: "bg-teal-100 text-teal-700",
};

const KATEGORIE_COLORS: Record<string, string> = {
  Karten: "bg-blue-50 text-blue-600",
  "Münzen": "bg-amber-50 text-amber-600",
  Mental: "bg-purple-50 text-purple-600",
  Visual: "bg-green-50 text-green-600",
  Tool: "bg-cyan-50 text-cyan-600",
  Comedy: "bg-pink-50 text-pink-600",
  Escape: "bg-red-50 text-red-600",
  Manipulation: "bg-indigo-50 text-indigo-600",
  Sonstiges: "bg-gray-50 text-gray-500",
};

const STATUS_COLORS: Record<string, string> = {
  aktiv: "bg-green-100 text-green-700",
  entwicklung: "bg-yellow-100 text-yellow-700",
  pausiert: "bg-gray-100 text-gray-500",
};

const WowStars = ({ rating, onClick }: { rating: number; onClick?: (v: number) => void }) => (
  <span className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        onClick={onClick ? (e) => { e.stopPropagation(); onClick(i); } : undefined}
        className={`w-3.5 h-3.5 ${
          i <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"
        } ${onClick ? "cursor-pointer hover:text-amber-400" : ""}`}
      />
    ))}
  </span>
);

// ── DB mapping ───────────────────────────────────────────────────────────────

const toEffektBib = (row: Record<string, unknown>) => ({
  id: row.id as string,
  name: (row.name as string) || "",
  typ: (row.typ as string) || "Sonstiges",
  status: (row.status as string) || "Entwurf",
  dauer: (row.dauer as number) ?? 0,
  requisiten: (row.requisiten as string[]) ?? [],
  notizen: (row.notizen as string) || "",
  kategorie: (row.kategorie as string) || "Sonstiges",
  wowRating: (row.wow_rating as number) ?? 0,
  setupZeit: (row.setup_zeit as number) ?? 0,
  videoUrl: (row.video_url as string) || undefined,
  fotoUrls: (row.foto_urls as string[]) ?? [],
  beschreibung: (row.beschreibung as string) || "",
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

type EffektBib = ReturnType<typeof toEffektBib>;

// ── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  typ: string;
  kategorie: string;
  status: string;
  wowRating: number;
  dauer: number;
  setupZeit: number;
  requisiten: string[];
  beschreibung: string;
  videoUrl: string;
  notizen: string;
}

const defaultForm: FormState = {
  name: "",
  typ: "closeup",
  kategorie: "Karten",
  status: "aktiv",
  wowRating: 0,
  dauer: 5,
  setupZeit: 0,
  requisiten: [],
  beschreibung: "",
  videoUrl: "",
  notizen: "",
};

// ── Main Component ───────────────────────────────────────────────────────────

const AdminEffekteBibliothek = () => {
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [effekte, setEffekte] = useState<EffektBib[]>([]);

  const [search, setSearch] = useState("");
  const [typTab, setTypTab] = useState<TypTab>("Alle");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedEffekt, setSelectedEffekt] = useState<EffektBib | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [reqInput, setReqInput] = useState("");
  const reqInputRef = useRef<HTMLInputElement>(null);

  // ── Auth ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  useEffect(() => {
    if (authChecked) loadData();
  }, [authChecked]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("effekte")
        .select("*")
        .order("name");
      if (error) throw error;
      setEffekte(
        (data || []).map((row) =>
          toEffektBib(row as unknown as Record<string, unknown>)
        )
      );
    } catch {
      // silent
    }
    setLoading(false);
  };

  // ── Filtered list ─────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return effekte.filter((e) => {
      if (typTab !== "Alle" && e.typ !== typTab) return false;
      if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [effekte, typTab, search]);

  // ── Panel helpers ─────────────────────────────────────────────────────────

  // ── Seed: Import all effects ──
  const [seeding, setSeeding] = useState(false);
  const seedEffekte = async () => {
    setSeeding(true);
    const seed = [
      // Close-Up
      { name: "Holy Wood", typ: "closeup", kategorie: "Karten", wow_rating: 5, dauer: 5, setup_zeit: 1, requisiten: ["Spezial-Schachtel (mit Schlitz)", "Holzblock", "2 vorbereitete Karten", "normales Deck (farbgleich)", "Stift"], beschreibung: "Karte durchdringt Schachtel, am Ende Holzblock", notizen: "Aufwendig, sehr stark", status: "aktiv" },
      { name: "Finding the Queen", typ: "closeup", kategorie: "Karten", wow_rating: 4, dauer: 5, setup_zeit: 0, requisiten: ["Kartendeck", "2 vorbereitete Karten (schwarze Asse / rote Damen)"], beschreibung: "Asse verwandeln sich visuell in rote Damen", notizen: "Immer einsetzbar", status: "aktiv" },
      { name: "Gegenseitiges Kartenfinden", typ: "closeup", kategorie: "Karten", wow_rating: 3, dauer: 5, setup_zeit: 0, requisiten: ["Kartendeck"], beschreibung: "Zuschauer und Magier finden gegenseitig Karten", notizen: "Fehleranfällig", status: "aktiv" },
      { name: "Out of this World", typ: "closeup", kategorie: "Karten", wow_rating: 5, dauer: 7, setup_zeit: 0, requisiten: ["Kartendeck"], beschreibung: "Zuschauer trennt Karten perfekt nach Farben", notizen: "Sehr stark", status: "aktiv" },
      { name: "Draht verbiegen", typ: "closeup", kategorie: "Mental", wow_rating: 4, dauer: 4, setup_zeit: 0, requisiten: ["Draht", "Feuerzeug", "Kartendeck"], beschreibung: "Draht wird zur gewählten Karte", notizen: "Perfekt für Hochzeit", status: "aktiv" },
      { name: "Gummiband Durchdringen", typ: "closeup", kategorie: "Close-Up", wow_rating: 4, dauer: 4, setup_zeit: 0, requisiten: ["Gummibänder"], beschreibung: "Gummis lösen sich visuell", notizen: "Kombinierbar", status: "aktiv" },
      { name: "Gummiband Verschwinden", typ: "closeup", kategorie: "Close-Up", wow_rating: 4, dauer: 4, setup_zeit: 0, requisiten: ["Gummibänder"], beschreibung: "Zwei werden zu einem / erscheinen wieder", notizen: "Teil Routine", status: "aktiv" },
      { name: "Invisible Deck", typ: "closeup", kategorie: "Karten", wow_rating: 4.5, dauer: 6, setup_zeit: 0, requisiten: ["Invisible Deck (Gimmick)"], beschreibung: "Gedachte Karte liegt umgedreht im Deck", notizen: "Closer", status: "aktiv" },
      { name: "Peek Pad (Close-Up)", typ: "beides", kategorie: "Mental", wow_rating: 0, dauer: 5, setup_zeit: 0, requisiten: [], beschreibung: "", notizen: "Entwurf", status: "entwicklung" },
      { name: "Color Match (Stifte)", typ: "closeup", kategorie: "Mental", wow_rating: 4, dauer: 10, setup_zeit: 0, requisiten: ["Gimmick-Stifte", "identische normale Stifte", "Auslese-Gerät"], beschreibung: "Gleiche Farbentscheidungen", notizen: "Selten genutzt", status: "aktiv" },
      { name: "Sonore", typ: "closeup", kategorie: "Mental", wow_rating: 4, dauer: 2, setup_zeit: 0, requisiten: ["Sonore Gimmick", "Handy", "Requisit je nach Effekt"], beschreibung: "Geräusche ohne Berührung", notizen: "Flexibel einsetzbar", status: "aktiv" },
      { name: "Phantom Deck", typ: "closeup", kategorie: "Karten", wow_rating: 5, dauer: 6, setup_zeit: 2, requisiten: ["Normales Deck", "Phantom Deck Gimmick"], beschreibung: "Ambitious Card Finale, alle Karten verschwinden außer eine", notizen: "Starker Closer", status: "aktiv" },
      { name: "Flite", typ: "closeup", kategorie: "Close-Up", wow_rating: 4, dauer: 3, setup_zeit: 0, requisiten: ["Flite Gimmick", "Schlüsselbund"], beschreibung: "Ring erscheint am Schlüsselbund", notizen: "Walkaround", status: "aktiv" },
      // Bühne
      { name: "Hände (Opener)", typ: "buehne", kategorie: "Comedy", wow_rating: 4, dauer: 5, setup_zeit: 0, requisiten: [], beschreibung: "Publikum scheitert an Handübung", notizen: "Fester Opener", status: "aktiv" },
      { name: "Acronym", typ: "buehne", kategorie: "Mental", wow_rating: 3, dauer: 7, setup_zeit: 3, requisiten: ["Handy (Wikipedia)", "Tafel", "Kreide"], beschreibung: "Wörter ergeben Namen", notizen: "Mittelteil", status: "aktiv" },
      { name: "Entfesslung", typ: "buehne", kategorie: "Comedy", wow_rating: 4, dauer: 7, setup_zeit: 0, requisiten: ["Seil", "Jacke oder Sakko"], beschreibung: "Befreiung mit Comedy Twist", notizen: "", status: "aktiv" },
      { name: "Buchtest", typ: "buehne", kategorie: "Mental", wow_rating: 5, dauer: 7, setup_zeit: 3, requisiten: ["Gimmick-Buch", "Umschlag mit Seite", "Gimmick-Karte", "Tafel", "Kreide"], beschreibung: "Gedanke erscheint im Umschlag", notizen: "Sehr stark", status: "aktiv" },
      { name: "Letters", typ: "buehne", kategorie: "Mental", wow_rating: 3, dauer: 5, setup_zeit: 2, requisiten: ["Letters-Setup (Stand, Buchstaben-Beutel)", "Vorhersage"], beschreibung: "Wort wird vorhergesagt", notizen: "Story wichtig", status: "aktiv" },
      { name: "Peek Pad (Bühne)", typ: "buehne", kategorie: "Mental", wow_rating: 0, dauer: 5, setup_zeit: 0, requisiten: [], beschreibung: "", notizen: "Entwurf", status: "entwicklung" },
    ];
    try {
      const { data, error } = await supabase.from("effekte").insert(seed).select("id, name");
      if (error) throw error;
      alert(`${data.length} Effekte importiert!`);
      loadData();
    } catch (err: any) {
      alert("Fehler: " + (err.message || "Unbekannt"));
    }
    setSeeding(false);
  };

  const openNew = () => {
    setSelectedEffekt(null);
    setIsNew(true);
    setForm(defaultForm);
    setPanelMsg(null);
    setReqInput("");
    setPanelOpen(true);
  };

  const openEdit = (e: EffektBib) => {
    setSelectedEffekt(e);
    setIsNew(false);
    setForm({
      name: e.name,
      typ: e.typ,
      kategorie: e.kategorie,
      status: e.status,
      wowRating: e.wowRating,
      dauer: e.dauer,
      setupZeit: e.setupZeit,
      requisiten: [...e.requisiten],
      beschreibung: e.beschreibung,
      videoUrl: e.videoUrl || "",
      notizen: e.notizen,
    });
    setPanelMsg(null);
    setReqInput("");
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedEffekt(null);
  };

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name.trim()) {
      setPanelMsg({ type: "err", text: "Name ist erforderlich." });
      return;
    }
    setSaving(true);
    setPanelMsg(null);
    try {
      const payload = {
        name: form.name,
        typ: form.typ,
        kategorie: form.kategorie,
        status: form.status,
        wow_rating: form.wowRating,
        dauer: form.dauer,
        setup_zeit: form.setupZeit,
        requisiten: form.requisiten,
        beschreibung: form.beschreibung,
        video_url: form.videoUrl || null,
        notizen: form.notizen,
      };

      if (isNew) {
        const { data, error } = await supabase
          .from("effekte")
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        const created = toEffektBib(data as unknown as Record<string, unknown>);
        setEffekte((prev) =>
          [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
        );
        setPanelMsg({ type: "ok", text: "Effekt angelegt." });
        setSelectedEffekt(created);
        setIsNew(false);
      } else if (selectedEffekt) {
        const { data, error } = await supabase
          .from("effekte")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", selectedEffekt.id)
          .select()
          .single();
        if (error) throw error;
        const updated = toEffektBib(data as unknown as Record<string, unknown>);
        setEffekte((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
        setSelectedEffekt(updated);
        setPanelMsg({ type: "ok", text: "Gespeichert." });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Speichern.";
      setPanelMsg({ type: "err", text: msg });
    }
    setSaving(false);
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!selectedEffekt) return;
    if (!window.confirm(`"${selectedEffekt.name}" wirklich loeschen?`)) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("effekte")
        .delete()
        .eq("id", selectedEffekt.id);
      if (error) throw error;
      setEffekte((prev) => prev.filter((e) => e.id !== selectedEffekt.id));
      closePanel();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Loeschen.";
      setPanelMsg({ type: "err", text: msg });
    }
    setSaving(false);
  };

  // ── Requisiten tag input ──────────────────────────────────────────────────

  const addReq = () => {
    const val = reqInput.trim();
    if (val && !form.requisiten.includes(val)) {
      setForm((f) => ({ ...f, requisiten: [...f.requisiten, val] }));
    }
    setReqInput("");
    reqInputRef.current?.focus();
  };

  const removeReq = (p: string) =>
    setForm((f) => ({ ...f, requisiten: f.requisiten.filter((x) => x !== p) }));

  // ── Reusable classes ──────────────────────────────────────────────────────

  const inputCls =
    "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelCls = "block text-xs font-semibold text-foreground mb-1.5";

  // ── Early returns ─────────────────────────────────────────────────────────

  if (!authChecked) return null;
  if (loading)
    return (
      <AdminLayout title="Effekte-Bibliothek" subtitle="Wird geladen...">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
        </div>
      </AdminLayout>
    );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Effekte-Bibliothek"
      subtitle={`${effekte.length} Effekte`}
      actions={
        <div className="flex items-center gap-2">
          {effekte.length === 0 && (
            <button
              onClick={seedEffekte}
              disabled={seeding}
              className="inline-flex items-center gap-2 rounded-xl border border-border/30 px-3 py-2 text-xs font-medium hover:bg-muted/40 disabled:opacity-50"
            >
              {seeding ? "Importiert…" : "19 Effekte importieren"}
            </button>
          )}
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Neuer Effekt
          </button>
        </div>
      }
    >
      {/* ── Filter bar ── */}
      <div className="space-y-3 mb-5">
        {/* Search + View toggle */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Effekt suchen..."
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
          <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto">
          {TYP_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setTypTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                typTab === tab
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {TYP_TAB_LABELS[tab] || tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty state ── */}
      {effekte.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Wand2 className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Noch kein Effekt angelegt
            </p>
            <p className="text-xs text-muted-foreground">
              Lege deinen ersten Effekt an, um zu starten.
            </p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Ersten Effekt anlegen
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">Keine Effekte gefunden.</p>
        </div>
      ) : viewMode === "grid" ? (
        /* ── Grid view ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((e) => {
            const visibleReqs = e.requisiten.slice(0, 3);
            const extraReqs = e.requisiten.length - 3;
            return (
              <button
                key={e.id}
                onClick={() => openEdit(e)}
                className="text-left p-4 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-bold text-foreground leading-tight line-clamp-2 flex-1">
                    {e.name}
                  </p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent shrink-0 mt-0.5 transition-colors" />
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TYP_COLORS[e.typ] || "bg-gray-100 text-gray-500"}`}>
                    {TYP_LABELS[e.typ] || e.typ}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${KATEGORIE_COLORS[e.kategorie] || "bg-muted text-muted-foreground"}`}>
                    {e.kategorie}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[e.status] || "bg-gray-100 text-gray-500"}`}>
                    {STATUS_LABELS[e.status] || e.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <WowStars rating={e.wowRating} />
                  {e.videoUrl && (
                    <Video className="w-3.5 h-3.5 text-muted-foreground/60" />
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {e.dauer} min
                  </span>
                  {e.setupZeit > 0 && (
                    <span className="flex items-center gap-1">
                      <Timer className="w-3 h-3" /> {e.setupZeit} min Setup
                    </span>
                  )}
                </div>

                {e.beschreibung && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {e.beschreibung}
                  </p>
                )}

                {e.requisiten.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {visibleReqs.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/30"
                      >
                        {p}
                      </span>
                    ))}
                    {extraReqs > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/60">
                        +{extraReqs} weitere
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* ── List view ── */
        <div className="space-y-2">
          {filtered.map((e) => (
            <button
              key={e.id}
              onClick={() => openEdit(e)}
              className="w-full text-left p-4 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all flex items-center gap-4 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-foreground truncate">
                    {e.name}
                  </p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${TYP_COLORS[e.typ] || "bg-gray-100 text-gray-500"}`}>
                    {TYP_LABELS[e.typ] || e.typ}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[e.status] || "bg-gray-100 text-gray-500"}`}>
                    {STATUS_LABELS[e.status] || e.status}
                  </span>
                </div>
                {e.beschreibung && (
                  <p className="text-xs text-muted-foreground truncate">
                    {e.beschreibung}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <WowStars rating={e.wowRating} />
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {e.dauer}m
                </span>
                {e.setupZeit > 0 && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Timer className="w-3 h-3" /> {e.setupZeit}m
                  </span>
                )}
                {e.videoUrl && (
                  <Video className="w-3.5 h-3.5 text-muted-foreground/60" />
                )}
                <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Panel overlay ── */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={closePanel}
        />
      )}

      {/* ── Slide-in panel ── */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-background border-l border-border/30 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {isNew ? "Neuer Effekt" : "Effekt bearbeiten"}
            </p>
            <h2 className="text-base font-bold text-foreground leading-tight">
              {isNew ? "Effekt anlegen" : form.name || "..."}
            </h2>
          </div>
          <button
            onClick={closePanel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {/* Name */}
          <div>
            <label className={labelCls}>
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="z.B. Verschwindende Muenze"
              className={inputCls}
            />
          </div>

          {/* Typ (Close-Up / Bühne / Beides) */}
          <div>
            <label className={labelCls}>Typ</label>
            <div className="flex gap-2">
              {TYP_OPTIONS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    const newKategorien = KATEGORIE_BY_TYP[v] || ALL_KATEGORIEN;
                    setForm((f) => ({
                      ...f,
                      typ: v,
                      kategorie: newKategorien.includes(f.kategorie) ? f.kategorie : newKategorien[0],
                    }));
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.typ === v
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {TYP_LABELS[v]}
                </button>
              ))}
            </div>
          </div>

          {/* Kategorie (abhängig vom Typ) */}
          <div>
            <label className={labelCls}>Kategorie</label>
            <select
              value={form.kategorie}
              onChange={(e) =>
                setForm((f) => ({ ...f, kategorie: e.target.value }))
              }
              className={inputCls}
            >
              {(KATEGORIE_BY_TYP[form.typ] || ALL_KATEGORIEN).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <div className="flex gap-2">
              {STATUS_OPTIONS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, status: v }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.status === v
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {STATUS_LABELS[v] || v}
                </button>
              ))}
            </div>
          </div>

          {/* Wow-Rating */}
          <div>
            <label className={labelCls}>Wow-Rating</label>
            <div className="flex items-center gap-1">
              <WowStars
                rating={form.wowRating}
                onClick={(v) => setForm((f) => ({ ...f, wowRating: v }))}
              />
              <span className="text-xs text-muted-foreground ml-2">
                {form.wowRating}/5
              </span>
            </div>
          </div>

          {/* Dauer + Setup-Zeit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Dauer (min)</label>
              <input
                type="number"
                min={0}
                value={form.dauer}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    dauer: Math.max(0, parseInt(e.target.value) || 0),
                  }))
                }
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Setup-Zeit (min)</label>
              <input
                type="number"
                min={0}
                value={form.setupZeit}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    setupZeit: Math.max(0, parseInt(e.target.value) || 0),
                  }))
                }
                className={inputCls}
              />
            </div>
          </div>

          {/* Requisiten */}
          <div>
            <label className={labelCls}>Requisiten</label>
            <div className="flex gap-2 mb-2">
              <input
                ref={reqInputRef}
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addReq();
                  }
                }}
                placeholder="Eingeben, Enter zum Hinzufuegen"
                className="flex-1 rounded-xl bg-muted/40 border border-border/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={addReq}
                className="px-3 py-2 rounded-xl bg-muted border border-border/30 text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.requisiten.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.requisiten.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => removeReq(p)}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted border border-border/30 text-foreground hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors"
                  >
                    {p}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Beschreibung */}
          <div>
            <label className={labelCls}>Beschreibung</label>
            <textarea
              value={form.beschreibung}
              onChange={(e) =>
                setForm((f) => ({ ...f, beschreibung: e.target.value }))
              }
              rows={3}
              placeholder="Kurze Beschreibung des Effekts..."
              className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
            />
          </div>

          {/* Video-URL */}
          <div>
            <label className={labelCls}>Video-URL</label>
            <input
              type="url"
              value={form.videoUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, videoUrl: e.target.value }))
              }
              placeholder="https://..."
              className={inputCls}
            />
          </div>

          {/* Notizen */}
          <div>
            <label className={labelCls}>Notizen</label>
            <textarea
              value={form.notizen}
              onChange={(e) =>
                setForm((f) => ({ ...f, notizen: e.target.value }))
              }
              rows={4}
              placeholder="Interne Anmerkungen, Variationen..."
              className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
            />
          </div>

          {/* Message */}
          {panelMsg && (
            <div
              className={`px-4 py-3 rounded-xl text-sm font-medium ${
                panelMsg.type === "ok"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-destructive/5 text-destructive border border-destructive/20"
              }`}
            >
              {panelMsg.text}
            </div>
          )}
        </div>

        {/* Panel footer (sticky) */}
        <div className="shrink-0 px-5 py-4 border-t border-border/20 flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Speichert..." : isNew ? "Anlegen" : "Speichern"}
          </button>
          {!isNew && selectedEffekt && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              Loeschen
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEffekteBibliothek;
