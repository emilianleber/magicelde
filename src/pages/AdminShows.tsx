import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { showService } from "@/services/showService";
import type { Show, ShowFormat, ShowStatus } from "@/types/productions";
import { Plus, X, Pencil, Trash2, Video } from "lucide-react";

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

const FormatBadge = ({ format }: { format: ShowFormat }) => (
  <span
    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FORMAT_COLORS[format]}`}
  >
    {FORMAT_LABELS[format]}
  </span>
);

const StatusBadge = ({ status }: { status: ShowStatus }) => (
  <span
    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[status]}`}
  >
    {STATUS_LABELS[status]}
  </span>
);

// ── Style constants ────────────────────────────────────────────────────────────

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

// ── Filter tabs ───────────────────────────────────────────────────────────────

type FilterTab = "alle" | ShowStatus;

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "alle", label: "Alle" },
  { value: "entwurf", label: "Entwurf" },
  { value: "aktiv", label: "Aktiv" },
  { value: "archiv", label: "Archiv" },
];

// ── Main Component ────────────────────────────────────────────────────────────

const AdminShows = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [shows, setShows] = useState<Show[]>([]);

  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("alle");

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // ── Auth ────────────────────────────────────────────────────────────────────

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
      const data = await showService.getAll();
      setShows(data);
    } catch {
      // ignore load errors silently
    }
    setLoading(false);
  };

  // ── Filtered list ───────────────────────────────────────────────────────────

  const filtered = shows.filter((s) => {
    if (filterTab !== "alle" && s.status !== filterTab) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // ── Panel helpers ───────────────────────────────────────────────────────────

  const openNew = () => {
    setSelectedShow(null);
    setIsNew(true);
    setForm(defaultForm);
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
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedShow(null);
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
      const payload = {
        name: form.name.trim(),
        format: form.format,
        status: form.status,
        anlass: form.anlass.trim(),
        zieldauer: form.zieldauer,
        konzeptKundentext: form.konzeptKundentext.trim(),
        technischeAnforderungen: form.technischeAnforderungen.trim(),
        phasen: isNew ? [] : (selectedShow?.phasen ?? []),
      };

      if (isNew) {
        const created = await showService.create(payload);
        setShows((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
        setPanelMsg({ type: "ok", text: "Show angelegt." });
        setSelectedShow(created);
        setIsNew(false);
      } else if (selectedShow) {
        const updated = await showService.update(selectedShow.id, payload);
        setShows((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
        setSelectedShow(updated);
        setPanelMsg({ type: "ok", text: "Gespeichert." });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Speichern.";
      setPanelMsg({ type: "err", text: msg });
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
      const msg = err instanceof Error ? err.message : "Fehler beim Löschen.";
      setPanelMsg({ type: "err", text: msg });
    }
    setSaving(false);
  };

  // ── Early returns ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="pt-28 text-center text-sm text-muted-foreground">
        Wird geladen…
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Shows"
      subtitle="Show-Konzepte und Abläufe"
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
      {/* ── Header actions: search ── */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <input
            type="text"
            placeholder="Show suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-muted/40 border border-border/30 pl-4 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
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
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 mb-5 w-fit">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterTab(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterTab === tab.value
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Empty state ── */}
      {shows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Video className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Noch keine Show angelegt
            </p>
            <p className="text-xs text-muted-foreground">
              Lege dein erstes Show-Konzept an, um zu starten.
            </p>
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
        /* ── Card grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="relative p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all flex flex-col gap-3"
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold text-foreground leading-tight line-clamp-2 flex-1">
                  {s.name}
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(s)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    title="Bearbeiten"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    title="Löschen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                <FormatBadge format={s.format} />
                <StatusBadge status={s.status} />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                {s.anlass && (
                  <span>
                    <span className="font-medium text-foreground/70">Anlass:</span>{" "}
                    {s.anlass}
                  </span>
                )}
                <span>
                  <span className="font-medium text-foreground/70">Dauer:</span>{" "}
                  {s.zieldauer} min
                </span>
              </div>

              {/* Konzept text (2 lines) */}
              {s.konzeptKundentext && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {s.konzeptKundentext}
                </p>
              )}
            </div>
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-background border-l border-border/30 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {isNew ? "Neue Show" : "Show bearbeiten"}
            </p>
            <h2 className="text-base font-bold text-foreground leading-tight">
              {isNew ? "Show anlegen" : form.name || "…"}
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
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="z.B. Große Bühnenshow Gala"
              className={inputCls}
            />
          </div>

          {/* Format */}
          <div>
            <label className={labelCls}>Format</label>
            <select
              value={form.format}
              onChange={(e) =>
                setForm((f) => ({ ...f, format: e.target.value as ShowFormat }))
              }
              className={inputCls}
            >
              {(Object.keys(FORMAT_LABELS) as ShowFormat[]).map((v) => (
                <option key={v} value={v}>
                  {FORMAT_LABELS[v]}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className={labelCls}>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as ShowStatus }))
              }
              className={inputCls}
            >
              <option value="entwurf">Entwurf</option>
              <option value="aktiv">Aktiv</option>
              <option value="archiv">Archiv</option>
            </select>
          </div>

          {/* Anlass */}
          <div>
            <label className={labelCls}>Anlass</label>
            <input
              type="text"
              value={form.anlass}
              onChange={(e) => setForm((f) => ({ ...f, anlass: e.target.value }))}
              placeholder="z.B. Hochzeit, Firmenfeier"
              className={inputCls}
            />
          </div>

          {/* Zieldauer */}
          <div>
            <label className={labelCls}>Zieldauer (Minuten)</label>
            <input
              type="number"
              min={0}
              value={form.zieldauer}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  zieldauer: Math.max(0, parseInt(e.target.value) || 0),
                }))
              }
              className={inputCls}
            />
          </div>

          {/* Konzept Kundentext */}
          <div>
            <label className={labelCls}>Konzept Kundentext</label>
            <textarea
              value={form.konzeptKundentext}
              onChange={(e) =>
                setForm((f) => ({ ...f, konzeptKundentext: e.target.value }))
              }
              rows={5}
              placeholder="Beschreibung für den Kunden…"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Technische Anforderungen */}
          <div>
            <label className={labelCls}>Technische Anforderungen</label>
            <textarea
              value={form.technischeAnforderungen}
              onChange={(e) =>
                setForm((f) => ({ ...f, technischeAnforderungen: e.target.value }))
              }
              rows={4}
              placeholder="Bühne, Licht, Ton, Requisiten…"
              className={`${inputCls} resize-none`}
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

        {/* Panel footer */}
        <div className="shrink-0 px-5 py-4 border-t border-border/20 flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-80 disabled:opacity-50 transition-opacity"
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
              Löschen
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminShows;
