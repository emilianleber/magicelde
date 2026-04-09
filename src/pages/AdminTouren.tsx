import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import type { Tour, Show } from "@/types/productions";
import {
  Plus,
  X,
  MapPin,
  Calendar,
  Ticket,
  TrendingUp,
} from "lucide-react";

// ── Status helpers ──────────────────────────────────────────────────────────

type TourStatus = Tour["status"];

const STATUS_LABELS: Record<TourStatus, string> = {
  planung: "Planung",
  aktiv: "Aktiv",
  abgeschlossen: "Abgeschlossen",
  abgesagt: "Abgesagt",
};

const STATUS_STYLES: Record<TourStatus, string> = {
  planung: "bg-blue-100 text-blue-700",
  aktiv: "bg-green-100 text-green-700",
  abgeschlossen: "bg-gray-100 text-gray-600",
  abgesagt: "bg-red-100 text-red-700",
};

const ALL_STATUSES: TourStatus[] = ["planung", "aktiv", "abgeschlossen", "abgesagt"];

// ── DB row types ────────────────────────────────────────────────────────────

interface TourRow {
  id: string;
  name: string;
  beschreibung: string;
  show_id: string | null;
  status: string;
  start_datum: string | null;
  end_datum: string | null;
  budget_gesamt: Record<string, unknown> | null;
  notizen: string;
  created_at: string;
  updated_at: string;
  shows_intern?: { id: string; name: string } | null;
  termine_details?: TerminStatsRow[];
}

interface TerminStatsRow {
  kapazitaet: number;
  tickets_verkauft: number;
  umsatz_ist: number;
  kosten: number;
}

interface TourWithStats extends Tour {
  termineCount: number;
  totalKapazitaet: number;
  totalTicketsVerkauft: number;
  totalUmsatz: number;
  totalKosten: number;
}

const toTourWithStats = (row: TourRow): TourWithStats => {
  const termineDetails = (row.termine_details || []) as TerminStatsRow[];
  return {
    id: row.id,
    name: row.name,
    beschreibung: row.beschreibung || "",
    showId: row.show_id || undefined,
    show: row.shows_intern
      ? ({ id: row.shows_intern.id, name: row.shows_intern.name } as unknown as Show)
      : undefined,
    status: row.status as TourStatus,
    startDatum: row.start_datum || undefined,
    endDatum: row.end_datum || undefined,
    budgetGesamt: (row.budget_gesamt as Record<string, unknown>) || {},
    notizen: row.notizen || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    termineCount: termineDetails.length,
    totalKapazitaet: termineDetails.reduce((s, t) => s + (t.kapazitaet || 0), 0),
    totalTicketsVerkauft: termineDetails.reduce((s, t) => s + (t.tickets_verkauft || 0), 0),
    totalUmsatz: termineDetails.reduce((s, t) => s + (t.umsatz_ist || 0), 0),
    totalKosten: termineDetails.reduce((s, t) => s + (t.kosten || 0), 0),
  };
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (d?: string) => {
  if (!d) return null;
  return new Date(d).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const eur = (n: number) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminTouren() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [touren, setTouren] = useState<TourWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<TourStatus | "alle">("alle");

  // Shows for dropdown
  const [shows, setShows] = useState<{ id: string; name: string }[]>([]);

  // Panel state
  const [panelOpen, setPanelOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    showId: "",
    beschreibung: "",
    status: "planung" as TourStatus,
  });

  // ── Auth ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  // ── Load tours ──────────────────────────────────────────────────────────

  const loadTouren = async () => {
    setLoading(true);
    try {
      const { data, error: err } = await supabase
        .from("touren")
        .select(
          `
          *,
          shows_intern:show_id ( id, name ),
          termine_details:tour_termine ( kapazitaet, tickets_verkauft, umsatz_ist, kosten )
        `
        )
        .order("created_at", { ascending: false });
      if (err) throw err;
      setTouren((data || []).map((row: unknown) => toTourWithStats(row as TourRow)));
    } catch (e) {
      console.error("Error loading touren:", e);
    } finally {
      setLoading(false);
    }
  };

  // ── Load shows for dropdown ─────────────────────────────────────────────

  const loadShows = async () => {
    const { data } = await supabase.from("shows_intern").select("id, name").order("name");
    setShows(data || []);
  };

  useEffect(() => {
    if (authChecked) {
      loadTouren();
      loadShows();
    }
  }, [authChecked]);

  // ── Filter ──────────────────────────────────────────────────────────────

  const filtered =
    filterStatus === "alle" ? touren : touren.filter((t) => t.status === filterStatus);

  // ── Panel helpers ───────────────────────────────────────────────────────

  const openNew = () => {
    setForm({ name: "", showId: "", beschreibung: "", status: "planung" });
    setError(null);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setError(null);
  };

  const handleCreate = async () => {
    if (!form.name.trim()) {
      setError("Name ist erforderlich.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("touren")
        .insert({
          name: form.name.trim(),
          show_id: form.showId || null,
          beschreibung: form.beschreibung.trim(),
          status: form.status,
          budget_gesamt: {},
          notizen: "",
        })
        .select("id")
        .single();
      if (err) throw err;
      closePanel();
      navigate(`/admin/programm/touren/${data.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Fehler beim Erstellen");
    } finally {
      setSaving(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────

  if (!authChecked) return null;

  const inputCls =
    "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
  const labelCls = "text-xs text-muted-foreground mb-1 block";

  const headerActions = (
    <button
      onClick={openNew}
      className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
    >
      <Plus className="w-4 h-4" />
      Neue Tour
    </button>
  );

  if (loading) {
    return (
      <AdminLayout title="Tour-Planung" subtitle="Touren und Termine verwalten">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Tour-Planung"
      subtitle="Touren und Termine verwalten"
      actions={headerActions}
    >
      {/* ── Filter bar ────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterStatus("alle")}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
            filterStatus === "alle"
              ? "bg-foreground text-background"
              : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Alle
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              filterStatus === s
                ? "bg-foreground text-background"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          {filtered.length} Touren
        </span>
      </div>

      {/* ── Tour cards ────────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <MapPin className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">Noch keine Touren angelegt</p>
          <button
            onClick={openNew}
            className="mt-4 text-sm text-foreground underline underline-offset-2 hover:opacity-70"
          >
            Erste Tour erstellen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onClick={() => navigate(`/admin/programm/touren/${tour.id}`)}
            />
          ))}
        </div>
      )}

      {/* ── Slide-in Panel ────────────────────────────────────────────────── */}
      {panelOpen && (
        <div className="fixed inset-0 bg-black/20 z-30" onClick={closePanel} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background border-l border-border/20 shadow-2xl z-40 flex flex-col transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
          <h2 className="font-semibold text-sm">Neue Tour</h2>
          <button
            onClick={closePanel}
            className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {error && (
            <div className="rounded-xl bg-destructive/5 border border-destructive/20 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div>
            <label className={labelCls}>Name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputCls}
              placeholder="z.B. Herbsttour 2026"
            />
          </div>

          <div>
            <label className={labelCls}>Show (optional)</label>
            <select
              value={form.showId}
              onChange={(e) => setForm((f) => ({ ...f, showId: e.target.value }))}
              className={inputCls}
            >
              <option value="">-- Keine Show --</option>
              {shows.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Beschreibung</label>
            <textarea
              value={form.beschreibung}
              onChange={(e) =>
                setForm((f) => ({ ...f, beschreibung: e.target.value }))
              }
              rows={3}
              className={`${inputCls} resize-none`}
              placeholder="Kurze Beschreibung der Tour..."
            />
          </div>

          <div>
            <label className={labelCls}>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({ ...f, status: e.target.value as TourStatus }))
              }
              className={inputCls}
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-border/20 flex gap-2">
          <button
            onClick={closePanel}
            className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60"
          >
            Abbrechen
          </button>
          <button
            onClick={handleCreate}
            disabled={saving || !form.name.trim()}
            className="flex-1 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Erstelle..." : "Erstellen"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Tour Card ───────────────────────────────────────────────────────────────

interface TourCardProps {
  tour: TourWithStats;
  onClick: () => void;
}

function TourCard({ tour, onClick }: TourCardProps) {
  const hasTermine = tour.termineCount > 0;
  const auslastung =
    tour.totalKapazitaet > 0
      ? (tour.totalTicketsVerkauft / tour.totalKapazitaet) * 100
      : 0;
  const profit = tour.totalUmsatz - tour.totalKosten;
  const revenueRatio =
    tour.totalUmsatz + tour.totalKosten > 0
      ? (tour.totalUmsatz / (tour.totalUmsatz + tour.totalKosten)) * 100
      : 50;

  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border border-border/20 bg-muted/5 p-5 hover:bg-muted/20 hover:border-border/40 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm leading-snug flex-1">{tour.name}</h3>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[tour.status]}`}
        >
          {STATUS_LABELS[tour.status]}
        </span>
      </div>

      {/* Show link */}
      {tour.show && (
        <p className="text-xs text-muted-foreground mb-2">
          Show: <span className="text-foreground/70">{tour.show.name}</span>
        </p>
      )}

      {/* Date range */}
      {(tour.startDatum || tour.endDatum) && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3" />
          <span>
            {formatDate(tour.startDatum) || "?"} &ndash;{" "}
            {formatDate(tour.endDatum) || "?"}
          </span>
        </div>
      )}

      {/* Stats */}
      {hasTermine && (
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {tour.termineCount} Termine
          </span>
          <span className="flex items-center gap-1">
            <Ticket className="w-3 h-3" />
            {tour.totalTicketsVerkauft}/{tour.totalKapazitaet} Tickets
          </span>
          {auslastung > 0 && (
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {auslastung.toFixed(0)}%
            </span>
          )}
        </div>
      )}

      {/* Budget bar */}
      {hasTermine && (tour.totalUmsatz > 0 || tour.totalKosten > 0) && (
        <div>
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>Umsatz: {eur(tour.totalUmsatz)}</span>
            <span>Kosten: {eur(tour.totalKosten)}</span>
          </div>
          <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                profit >= 0 ? "bg-green-400" : "bg-red-400"
              }`}
              style={{ width: `${Math.min(100, Math.max(5, revenueRatio))}%` }}
            />
          </div>
          <p
            className={`text-[10px] font-semibold mt-1 ${
              profit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {profit >= 0 ? "+" : ""}
            {eur(profit)}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!hasTermine && (
        <p className="text-xs text-muted-foreground/50 italic">Noch keine Termine</p>
      )}
    </button>
  );
}
