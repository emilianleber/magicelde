import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { produktionService } from "@/services/produktionService";
import type { Produktion } from "@/types/productions";
import {
  Plus,
  X,
  Pencil,
  Trash2,
  Sparkles,
  LayoutGrid,
  List,
} from "lucide-react";

// ── Labels & helpers ────────────────────────────────────────────────────────

const FORMAT_LABELS: Record<Produktion["format"], string> = {
  abendshow: "Abendshow",
  "magic-dinner": "Magic Dinner",
  tourshow: "Tourshow",
};

const STATUS_LABELS: Record<Produktion["status"], string> = {
  idee: "Idee",
  konzept: "Konzept",
  produktion: "Produktion",
  bewerbung: "Bewerbung",
  aktiv: "Aktiv",
  abgeschlossen: "Abgeschlossen",
};

const STATUS_ORDER: Produktion["status"][] = [
  "idee",
  "konzept",
  "produktion",
  "bewerbung",
  "aktiv",
  "abgeschlossen",
];

interface ColumnStyle {
  bg: string;
  header: string;
  badge: string;
  accent: string;
}

const COLUMN_STYLES: Record<Produktion["status"], ColumnStyle> = {
  idee: {
    bg: "bg-purple-50/60",
    header: "text-purple-700",
    badge: "bg-purple-100 text-purple-700",
    accent: "border-purple-200",
  },
  konzept: {
    bg: "bg-blue-50/60",
    header: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    accent: "border-blue-200",
  },
  produktion: {
    bg: "bg-yellow-50/60",
    header: "text-yellow-700",
    badge: "bg-yellow-100 text-yellow-700",
    accent: "border-yellow-200",
  },
  bewerbung: {
    bg: "bg-orange-50/60",
    header: "text-orange-700",
    badge: "bg-orange-100 text-orange-700",
    accent: "border-orange-200",
  },
  aktiv: {
    bg: "bg-green-50/60",
    header: "text-green-700",
    badge: "bg-green-100 text-green-700",
    accent: "border-green-200",
  },
  abgeschlossen: {
    bg: "bg-teal-50/60",
    header: "text-teal-700",
    badge: "bg-teal-100 text-teal-700",
    accent: "border-teal-200",
  },
};

// ── Empty form factory ───────────────────────────────────────────────────────

const emptyForm = (): Omit<Produktion, "id" | "createdAt" | "updatedAt"> => ({
  format: "abendshow",
  titel: "",
  untertitel: "",
  status: "idee",
  showId: undefined,
  locationId: undefined,
  kalkulation: { ticketpreis: 0, kapazitaet: 0 },
  marketingKanaele: [],
  notizen: "",
  ideenSammlung: [],
  pressetext: "",
  kurzbeschreibung: "",
});

type ViewMode = "kanban" | "liste";

// ── Component ────────────────────────────────────────────────────────────────

const AdminProduktionen = () => {
  const navigate = useNavigate();

  const [produktionen, setProduktionen] = useState<Produktion[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");

  // Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState<Omit<Produktion, "id" | "createdAt" | "updatedAt">>(emptyForm());
  const [error, setError] = useState<string | null>(null);

  // ── Auth + load ────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
    });
  }, [navigate]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await produktionService.getAll();
        setProduktionen(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Panel helpers ──────────────────────────────────────────────────────────

  const openNew = () => {
    setEditingId(null);
    setFormData(emptyForm());
    setError(null);
    setPanelOpen(true);
  };

  const openEdit = (p: Produktion) => {
    setEditingId(p.id);
    setFormData({
      format: p.format,
      titel: p.titel,
      untertitel: p.untertitel ?? "",
      status: p.status,
      showId: p.showId,
      locationId: p.locationId,
      kalkulation: { ...p.kalkulation },
      marketingKanaele: p.marketingKanaele,
      notizen: p.notizen,
      ideenSammlung: p.ideenSammlung,
      pressetext: p.pressetext,
      kurzbeschreibung: p.kurzbeschreibung,
    });
    setError(null);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingId(null);
    setError(null);
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!formData.titel.trim()) {
      setError("Titel ist erforderlich.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        untertitel: formData.untertitel?.trim() || undefined,
      };
      if (editingId) {
        const updated = await produktionService.update(editingId, payload);
        setProduktionen((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        const created = await produktionService.create(payload);
        setProduktionen((prev) => [...prev, created]);
      }
      closePanel();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editingId) return;
    if (!window.confirm("Diese Produktion wirklich löschen?")) return;
    setDeleting(true);
    try {
      await produktionService.delete(editingId);
      setProduktionen((prev) => prev.filter((p) => p.id !== editingId));
      closePanel();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fehler beim Löschen");
    } finally {
      setDeleting(false);
    }
  };

  // ── Field helper ───────────────────────────────────────────────────────────

  const setField = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  // ── Grouped for Kanban ─────────────────────────────────────────────────────

  const grouped = STATUS_ORDER.reduce<Record<Produktion["status"], Produktion[]>>(
    (acc, s) => {
      acc[s] = produktionen.filter((p) => p.status === s);
      return acc;
    },
    {} as Record<Produktion["status"], Produktion[]>
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  const headerActions = (
    <div className="flex items-center gap-2">
      {/* View toggle */}
      <div className="flex items-center bg-muted/40 rounded-xl p-1 border border-border/30">
        <button
          onClick={() => setViewMode("kanban")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            viewMode === "kanban"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Kanban
        </button>
        <button
          onClick={() => setViewMode("liste")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            viewMode === "liste"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <List className="w-4 h-4" />
          Liste
        </button>
      </div>

      <button
        onClick={openNew}
        className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
      >
        <Plus className="w-4 h-4" />
        Neue Produktion
      </button>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout title="Produktionen" subtitle="Eigene Veranstaltungen und Shows">
        <div className="pt-20 text-center text-muted-foreground text-sm">Wird geladen…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Produktionen"
      subtitle="Eigene Veranstaltungen und Shows"
      actions={headerActions}
    >
      {/* ── Kanban Board ──────────────────────────────────────────────────── */}
      {viewMode === "kanban" && (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
          {STATUS_ORDER.map((status) => {
            const style = COLUMN_STYLES[status];
            const cards = grouped[status];
            return (
              <div
                key={status}
                className={`flex-shrink-0 w-64 rounded-2xl border ${style.accent} ${style.bg} flex flex-col`}
              >
                {/* Column header */}
                <div className={`flex items-center justify-between px-3 py-2.5 border-b ${style.accent}`}>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${style.header}`}>
                    {STATUS_LABELS[status]}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                    {cards.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[calc(100vh-260px)]">
                  {cards.length === 0 && (
                    <div className="text-center py-6 text-xs text-muted-foreground/50">
                      Keine Einträge
                    </div>
                  )}
                  {cards.map((p) => (
                    <KanbanCard key={p.id} produktion={p} onEdit={openEdit} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── List View ─────────────────────────────────────────────────────── */}
      {viewMode === "liste" && (
        <div className="rounded-2xl border border-border/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Titel</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kapazität</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ticketpreis</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {produktionen.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground text-sm">
                    Noch keine Produktionen vorhanden.
                  </td>
                </tr>
              )}
              {produktionen.map((p, i) => {
                const style = COLUMN_STYLES[p.status];
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-border/20 hover:bg-muted/20 transition-colors cursor-pointer ${
                      i % 2 === 0 ? "bg-background" : "bg-muted/5"
                    }`}
                    onClick={() => openEdit(p)}
                  >
                    <td className="px-4 py-3">
                      <span className="font-semibold text-foreground">{p.titel}</span>
                      {p.untertitel && (
                        <span className="block text-xs text-muted-foreground">{p.untertitel}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-muted-foreground bg-muted/40 px-2 py-1 rounded-full">
                        {FORMAT_LABELS[p.format]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>
                        {STATUS_LABELS[p.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {p.kalkulation.kapazitaet > 0 ? `${p.kalkulation.kapazitaet} Pers.` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {p.kalkulation.ticketpreis > 0
                        ? `${p.kalkulation.ticketpreis.toFixed(2)} €`
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEdit(p); }}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Slide-in Panel ────────────────────────────────────────────────── */}
      {/* Overlay */}
      {panelOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={closePanel}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[520px] bg-background border-l border-border/40 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <h2 className="text-base font-semibold text-foreground">
              {editingId ? "Produktion bearbeiten" : "Neue Produktion"}
            </h2>
          </div>
          <button
            onClick={closePanel}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Panel body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {error && (
            <div className="rounded-xl bg-destructive/5 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Titel */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Titel <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.titel}
              onChange={(e) => setField("titel", e.target.value)}
              placeholder="z. B. Zauberhafte Dinner-Nacht"
              className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50"
            />
          </div>

          {/* Untertitel */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Untertitel
            </label>
            <input
              type="text"
              value={formData.untertitel ?? ""}
              onChange={(e) => setField("untertitel", e.target.value)}
              placeholder="Optionaler Zusatztitel"
              className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50"
            />
          </div>

          {/* Format + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Format
              </label>
              <select
                value={formData.format}
                onChange={(e) => setField("format", e.target.value as Produktion["format"])}
                className="w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-300/50"
              >
                <option value="abendshow">Abendshow</option>
                <option value="magic-dinner">Magic Dinner</option>
                <option value="tourshow">Tourshow</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setField("status", e.target.value as Produktion["status"])}
                className="w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-purple-300/50"
              >
                <option value="idee">Idee</option>
                <option value="konzept">Konzept</option>
                <option value="produktion">Produktion</option>
                <option value="bewerbung">Bewerbung</option>
                <option value="aktiv">Aktiv</option>
                <option value="abgeschlossen">Abgeschlossen</option>
              </select>
            </div>
          </div>

          {/* Kurzbeschreibung */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Kurzbeschreibung
            </label>
            <textarea
              value={formData.kurzbeschreibung}
              onChange={(e) => setField("kurzbeschreibung", e.target.value)}
              rows={3}
              placeholder="Kurze Beschreibung der Produktion…"
              className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50 resize-none"
            />
          </div>

          {/* Pressetext */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Pressetext
            </label>
            <textarea
              value={formData.pressetext}
              onChange={(e) => setField("pressetext", e.target.value)}
              rows={4}
              placeholder="Pressetext für Medien und PR…"
              className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50 resize-none"
            />
          </div>

          {/* Notizen */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Notizen
            </label>
            <textarea
              value={formData.notizen}
              onChange={(e) => setField("notizen", e.target.value)}
              rows={3}
              placeholder="Interne Notizen…"
              className="w-full rounded-xl border border-border/40 bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50 resize-none"
            />
          </div>

          {/* Kalkulation */}
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Kalkulation
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Ticketpreis (€)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.kalkulation.ticketpreis || ""}
                  onChange={(e) =>
                    setField("kalkulation", {
                      ...formData.kalkulation,
                      ticketpreis: parseFloat(e.target.value) || 0,
                    })
                  }
                  placeholder="0.00"
                  className="w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Kapazität (Personen)</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={formData.kalkulation.kapazitaet || ""}
                  onChange={(e) =>
                    setField("kalkulation", {
                      ...formData.kalkulation,
                      kapazitaet: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="w-full rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-300/50"
                />
              </div>
            </div>
            {formData.kalkulation.kapazitaet > 0 && formData.kalkulation.ticketpreis > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Umsatzpotenzial:{" "}
                <span className="font-semibold text-foreground">
                  {(formData.kalkulation.kapazitaet * formData.kalkulation.ticketpreis).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Panel footer */}
        <div className="px-6 py-4 border-t border-border/30 shrink-0 flex items-center justify-between gap-3">
          {editingId ? (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Lösche…" : "Löschen"}
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={closePanel}
              className="px-4 py-2 rounded-xl border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-80 disabled:opacity-50 transition-opacity"
            >
              {saving ? "Speichert…" : editingId ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// ── Kanban Card ──────────────────────────────────────────────────────────────

interface KanbanCardProps {
  produktion: Produktion;
  onEdit: (p: Produktion) => void;
}

const KanbanCard = ({ produktion: p, onEdit }: KanbanCardProps) => {
  const revenue =
    p.kalkulation.kapazitaet > 0 && p.kalkulation.ticketpreis > 0
      ? p.kalkulation.kapazitaet * p.kalkulation.ticketpreis
      : null;

  return (
    <div
      className="bg-background rounded-xl border border-border/30 p-3 shadow-sm hover:border-purple-300/60 hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onEdit(p)}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-sm font-semibold text-foreground leading-snug flex-1">
          {p.titel}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(p); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Format badge */}
      <span className="inline-block text-[10px] font-medium bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-full border border-border/30 mb-1.5">
        {FORMAT_LABELS[p.format]}
      </span>

      {/* Untertitel */}
      {p.untertitel && (
        <p className="text-xs text-muted-foreground leading-snug mb-1.5 line-clamp-2">
          {p.untertitel}
        </p>
      )}

      {/* Kalkulation */}
      {revenue !== null ? (
        <p className="text-xs text-muted-foreground mt-1">
          {p.kalkulation.kapazitaet} Pers. × {p.kalkulation.ticketpreis.toFixed(0)} € ={" "}
          <span className="font-semibold text-foreground">
            {revenue.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })}
          </span>
        </p>
      ) : (
        p.kalkulation.kapazitaet > 0 && (
          <p className="text-xs text-muted-foreground mt-1">{p.kalkulation.kapazitaet} Personen</p>
        )
      )}
    </div>
  );
};

export default AdminProduktionen;
