import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { effekteService } from "@/services/effekteService";
import type { Effekt } from "@/types/productions";
import {
  Plus,
  Search,
  X,
  Clock,
  RotateCcw,
  Star,
  Wand2,
  Filter,
  ChevronRight,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";

// ── Helpers ────────────────────────────────────────────────────────────────────

const DifficultyStars = ({ level }: { level: 1 | 2 | 3 }) => (
  <span className="flex gap-0.5">
    {[1, 2, 3].map((i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i <= level ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"
        }`}
      />
    ))}
  </span>
);

const TypBadge = ({ typ }: { typ: Effekt["typ"] }) => {
  const map: Record<Effekt["typ"], [string, string]> = {
    closeup: ["Close-Up", "bg-blue-100 text-blue-700"],
    buehne: ["Bühne", "bg-purple-100 text-purple-700"],
    beides: ["Beides", "bg-indigo-100 text-indigo-700"],
  };
  const [label, cls] = map[typ];
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
};

const StatusBadge = ({ status }: { status: Effekt["status"] }) => {
  const cls: Record<Effekt["status"], string> = {
    aktiv: "bg-green-100 text-green-700",
    entwicklung: "bg-amber-100 text-amber-700",
    pausiert: "bg-gray-100 text-gray-500",
  };
  const labels: Record<Effekt["status"], string> = {
    aktiv: "Aktiv",
    entwicklung: "Entwicklung",
    pausiert: "Pausiert",
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls[status]}`}>
      {labels[status]}
    </span>
  );
};

const ANLASS_OPTIONS = ["hochzeit", "firma", "familie", "geburtstag", "gala"] as const;
type AnlassValue = (typeof ANLASS_OPTIONS)[number];

const ANLASS_LABELS: Record<AnlassValue, string> = {
  hochzeit: "Hochzeit",
  firma: "Firma",
  familie: "Familie",
  geburtstag: "Geburtstag",
  gala: "Gala",
};

const ANLASS_COLORS: Record<AnlassValue, string> = {
  hochzeit: "bg-pink-100 text-pink-700",
  firma: "bg-blue-100 text-blue-700",
  familie: "bg-green-100 text-green-700",
  geburtstag: "bg-orange-100 text-orange-700",
  gala: "bg-violet-100 text-violet-700",
};

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  typ: Effekt["typ"];
  status: Effekt["status"];
  schwierigkeit: 1 | 2 | 3;
  dauer: number;
  resetZeit: number;
  anlaesse: AnlassValue[];
  wiederholbar: boolean;
  props: string[];
  interneNotizen: string;
}

const defaultForm: FormState = {
  name: "",
  typ: "closeup",
  status: "aktiv",
  schwierigkeit: 1,
  dauer: 5,
  resetZeit: 0,
  anlaesse: [],
  wiederholbar: true,
  props: [],
  interneNotizen: "",
};

// ── Main Component ────────────────────────────────────────────────────────────

const AdminEffekte = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [effekte, setEffekte] = useState<Effekt[]>([]);

  const [filterTyp, setFilterTyp] = useState<string>("alle");
  const [filterAnlass, setFilterAnlass] = useState<string>("alle");
  const [filterStatus, setFilterStatus] = useState<string>("alle");
  const [search, setSearch] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedEffekt, setSelectedEffekt] = useState<Effekt | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Prop input
  const [propInput, setPropInput] = useState("");
  const propInputRef = useRef<HTMLInputElement>(null);

  // ── Auth ────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
        return;
      }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    const { data: admin } = await supabase
      .from("portal_admins")
      .select("*")
      .eq("email", user!.email!)
      .maybeSingle();
    if (!admin) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }
    setIsAdmin(true);
    try {
      const data = await effekteService.getAll();
      setEffekte(data);
    } catch {
      // ignore load errors silently
    }
    setLoading(false);
  };

  // ── Filtered list ───────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return effekte.filter((e) => {
      if (filterTyp !== "alle" && e.typ !== filterTyp) return false;
      if (filterAnlass !== "alle" && !e.anlaesse.includes(filterAnlass as AnlassValue))
        return false;
      if (filterStatus !== "alle" && e.status !== filterStatus) return false;
      if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [effekte, filterTyp, filterAnlass, filterStatus, search]);

  // ── Panel helpers ───────────────────────────────────────────────────────────

  const openNew = () => {
    setSelectedEffekt(null);
    setIsNew(true);
    setForm(defaultForm);
    setPanelMsg(null);
    setPropInput("");
    setPanelOpen(true);
  };

  const openEdit = (e: Effekt) => {
    setSelectedEffekt(e);
    setIsNew(false);
    setForm({
      name: e.name,
      typ: e.typ,
      status: e.status,
      schwierigkeit: e.schwierigkeit,
      dauer: e.dauer,
      resetZeit: e.resetZeit,
      anlaesse: [...e.anlaesse] as AnlassValue[],
      wiederholbar: e.wiederholbar,
      props: [...e.props],
      interneNotizen: e.interneNotizen,
    });
    setPanelMsg(null);
    setPropInput("");
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedEffekt(null);
  };

  // ── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.name.trim()) {
      setPanelMsg({ type: "err", text: "Name ist erforderlich." });
      return;
    }
    setSaving(true);
    setPanelMsg(null);
    try {
      if (isNew) {
        const created = await effekteService.create(form);
        setEffekte((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
        setPanelMsg({ type: "ok", text: "Effekt angelegt." });
        setSelectedEffekt(created);
        setIsNew(false);
      } else if (selectedEffekt) {
        const updated = await effekteService.update(selectedEffekt.id, form);
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

  // ── Delete ──────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!selectedEffekt) return;
    if (!window.confirm(`"${selectedEffekt.name}" wirklich löschen?`)) return;
    setSaving(true);
    try {
      await effekteService.delete(selectedEffekt.id);
      setEffekte((prev) => prev.filter((e) => e.id !== selectedEffekt.id));
      closePanel();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Löschen.";
      setPanelMsg({ type: "err", text: msg });
    }
    setSaving(false);
  };

  // ── Prop tag input ──────────────────────────────────────────────────────────

  const addProp = () => {
    const val = propInput.trim();
    if (val && !form.props.includes(val)) {
      setForm((f) => ({ ...f, props: [...f.props, val] }));
    }
    setPropInput("");
    propInputRef.current?.focus();
  };

  const removeProp = (p: string) =>
    setForm((f) => ({ ...f, props: f.props.filter((x) => x !== p) }));

  const toggleAnlass = (a: AnlassValue) => {
    setForm((f) => ({
      ...f,
      anlaesse: f.anlaesse.includes(a)
        ? f.anlaesse.filter((x) => x !== a)
        : [...f.anlaesse, a],
    }));
  };

  // ── Early returns ───────────────────────────────────────────────────────────

  if (loading) return <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center text-sm text-muted-foreground">Kein Zugriff</div>;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Effekte"
      subtitle={`${effekte.length} Effekte`}
      actions={
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Effekt
        </button>
      }
    >
      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Name suchen…"
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

        {/* Typ filter */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1">
          {["alle", "closeup", "buehne", "beides"].map((v) => (
            <button
              key={v}
              onClick={() => setFilterTyp(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterTyp === v
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "alle" ? "Alle Typen" : v === "closeup" ? "Close-Up" : v === "buehne" ? "Bühne" : "Beides"}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1">
          {["alle", "aktiv", "entwicklung", "pausiert"].map((v) => (
            <button
              key={v}
              onClick={() => setFilterStatus(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === v
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "alle" ? "Alle Status" : v === "aktiv" ? "Aktiv" : v === "entwicklung" ? "Entwicklung" : "Pausiert"}
            </button>
          ))}
        </div>

        {/* Anlass filter */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1">
          <button
            onClick={() => setFilterAnlass("alle")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterAnlass === "alle"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="w-3 h-3 inline mr-1" />
            Anlass
          </button>
          {ANLASS_OPTIONS.map((a) => (
            <button
              key={a}
              onClick={() => setFilterAnlass(filterAnlass === a ? "alle" : a)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterAnlass === a
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {ANLASS_LABELS[a]}
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
            <p className="text-sm font-semibold text-foreground mb-1">Noch kein Effekt angelegt</p>
            <p className="text-xs text-muted-foreground">Lege deinen ersten Effekt an, um zu starten.</p>
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
      ) : (
        /* ── Grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((e) => {
            const visibleProps = e.props.slice(0, 3);
            const extraProps = e.props.length - 3;
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
                  <TypBadge typ={e.typ} />
                  <StatusBadge status={e.status} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <DifficultyStars level={e.schwierigkeit} />
                  {e.wiederholbar && (
                    <span className="text-[10px] text-muted-foreground/60 flex items-center gap-0.5">
                      <RotateCcw className="w-3 h-3" /> wiederholbar
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {e.dauer} min
                  </span>
                  {e.resetZeit > 0 && (
                    <span className="flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> {e.resetZeit} min
                    </span>
                  )}
                </div>

                {e.anlaesse.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {e.anlaesse.map((a) => (
                      <span
                        key={a}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${ANLASS_COLORS[a]}`}
                      >
                        {ANLASS_LABELS[a]}
                      </span>
                    ))}
                  </div>
                )}

                {e.props.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {visibleProps.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/30"
                      >
                        {p}
                      </span>
                    ))}
                    {extraProps > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/60">
                        +{extraProps} weitere
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background border-l border-border/30 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
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
              {isNew ? "Effekt anlegen" : (form.name || "…")}
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
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="z.B. Verschwindende Münze"
              className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Typ */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Typ</label>
            <div className="flex gap-2">
              {(["closeup", "buehne", "beides"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, typ: v }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.typ === v
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {v === "closeup" ? "Close-Up" : v === "buehne" ? "Bühne" : "Beides"}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Status</label>
            <div className="flex gap-2">
              {(["aktiv", "entwicklung", "pausiert"] as const).map((v) => (
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
                  {v === "aktiv" ? "Aktiv" : v === "entwicklung" ? "Entwicklung" : "Pausiert"}
                </button>
              ))}
            </div>
          </div>

          {/* Schwierigkeit */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Schwierigkeit</label>
            <div className="flex gap-3">
              {([1, 2, 3] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, schwierigkeit: v }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.schwierigkeit === v
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {[1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i <= v
                          ? form.schwierigkeit === v
                            ? "fill-background text-background"
                            : "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                </button>
              ))}
            </div>
          </div>

          {/* Dauer + Reset */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Dauer (min)
              </label>
              <input
                type="number"
                min={0}
                value={form.dauer}
                onChange={(e) => setForm((f) => ({ ...f, dauer: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Reset-Zeit (min)
              </label>
              <input
                type="number"
                min={0}
                value={form.resetZeit}
                onChange={(e) => setForm((f) => ({ ...f, resetZeit: Math.max(0, parseInt(e.target.value) || 0) }))}
                className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Anlässe */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Anlässe</label>
            <div className="flex flex-wrap gap-2">
              {ANLASS_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAnlass(a)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    form.anlaesse.includes(a)
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {ANLASS_LABELS[a]}
                </button>
              ))}
            </div>
          </div>

          {/* Wiederholbar */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-xs font-semibold text-foreground">Wiederholbar</p>
              <p className="text-[11px] text-muted-foreground">Kann im gleichen Event mehrfach gezeigt werden</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, wiederholbar: !f.wiederholbar }))}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                form.wiederholbar ? "bg-foreground" : "bg-muted border border-border/40"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background shadow transition-transform ${
                  form.wiederholbar ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Props */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Props</label>
            <div className="flex gap-2 mb-2">
              <input
                ref={propInputRef}
                type="text"
                value={propInput}
                onChange={(e) => setPropInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addProp();
                  }
                }}
                placeholder="Prop eingeben, Enter zum Hinzufügen"
                className="flex-1 rounded-xl bg-muted/40 border border-border/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={addProp}
                className="px-3 py-2 rounded-xl bg-muted border border-border/30 text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.props.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.props.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => removeProp(p)}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted border border-border/30 text-foreground hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors"
                  >
                    {p}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interne Notizen */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Interne Notizen
            </label>
            <textarea
              value={form.interneNotizen}
              onChange={(e) => setForm((f) => ({ ...f, interneNotizen: e.target.value }))}
              rows={4}
              placeholder="Anmerkungen, Variationen, Geheimnis…"
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
            {saving ? "Speichert…" : isNew ? "Anlegen" : "Speichern"}
          </button>
          {!isNew && selectedEffekt && (
            <button
              onClick={handleDelete}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              Löschen
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminEffekte;
