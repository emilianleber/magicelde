import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import type {
  Tour,
  TourTermin,
  TourTeamAssignment,
  LocationVenue,
  TeamMember,
  Show,
} from "@/types/productions";
import {
  ArrowLeft,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  MoreVertical,
  Users,
  Ticket,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  BarChart3,
  CheckCircle2,
  XCircle,
  UserPlus,
} from "lucide-react";

// ── Status maps ─────────────────────────────────────────────────────────────

type TourStatus = Tour["status"];
type TerminStatus = TourTermin["status"];

const TOUR_STATUS_LABELS: Record<TourStatus, string> = {
  planung: "Planung",
  aktiv: "Aktiv",
  abgeschlossen: "Abgeschlossen",
  abgesagt: "Abgesagt",
};
const TOUR_STATUS_STYLES: Record<TourStatus, string> = {
  planung: "bg-blue-100 text-blue-700",
  aktiv: "bg-green-100 text-green-700",
  abgeschlossen: "bg-gray-100 text-gray-600",
  abgesagt: "bg-red-100 text-red-700",
};
const ALL_TOUR_STATUSES: TourStatus[] = ["planung", "aktiv", "abgeschlossen", "abgesagt"];

const TERMIN_STATUS_LABELS: Record<TerminStatus, string> = {
  geplant: "Geplant",
  beworben: "Beworben",
  ausverkauft: "Ausverkauft",
  abgeschlossen: "Abgeschlossen",
  abgesagt: "Abgesagt",
};
const TERMIN_STATUS_STYLES: Record<TerminStatus, string> = {
  geplant: "bg-blue-100 text-blue-700",
  beworben: "bg-yellow-100 text-yellow-700",
  ausverkauft: "bg-purple-100 text-purple-700",
  abgeschlossen: "bg-gray-100 text-gray-600",
  abgesagt: "bg-red-100 text-red-700",
};
const ALL_TERMIN_STATUSES: TerminStatus[] = [
  "geplant",
  "beworben",
  "ausverkauft",
  "abgeschlossen",
  "abgesagt",
];

const TICKET_ANBIETER_OPTIONS = [
  { value: "eventim", label: "Eventim" },
  { value: "okticket", label: "OKTicket" },
  { value: "reservix", label: "Reservix" },
  { value: "eigen", label: "Eigen" },
  { value: "sonstiges", label: "Sonstiges" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (d?: string) => {
  if (!d) return "---";
  return new Date(d).toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatDateShort = (d?: string) => {
  if (!d) return "---";
  return new Date(d).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

const eur = (n: number) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const eurFull = (n: number) =>
  n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

// ── DB row mappers ──────────────────────────────────────────────────────────

const toTour = (row: Record<string, unknown>): Tour => ({
  id: row.id as string,
  name: row.name as string,
  beschreibung: (row.beschreibung as string) || "",
  showId: (row.show_id as string) || undefined,
  status: row.status as TourStatus,
  startDatum: (row.start_datum as string) || undefined,
  endDatum: (row.end_datum as string) || undefined,
  budgetGesamt: (row.budget_gesamt as Record<string, unknown>) || {},
  notizen: (row.notizen as string) || "",
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

const toTermin = (row: Record<string, unknown>): TourTermin => ({
  id: row.id as string,
  tourId: row.tour_id as string,
  datum: row.datum as string,
  uhrzeitEinlass: (row.uhrzeit_einlass as string) || undefined,
  uhrzeitShow: (row.uhrzeit_show as string) || undefined,
  uhrzeitAufbau: (row.uhrzeit_aufbau as string) || undefined,
  uhrzeitSoundcheck: (row.uhrzeit_soundcheck as string) || undefined,
  uhrzeitAbbau: (row.uhrzeit_abbau as string) || undefined,
  locationId: (row.location_id as string) || undefined,
  location: row.locations_intern
    ? toLocationBrief(row.locations_intern as Record<string, unknown>)
    : undefined,
  kapazitaet: (row.kapazitaet as number) || 0,
  ticketPreis: (row.ticket_preis as number) || 0,
  ticketsVerkauft: (row.tickets_verkauft as number) || 0,
  ticketLink: (row.ticket_link as string) || undefined,
  ticketAnbieter: (row.ticket_anbieter as TourTermin["ticketAnbieter"]) || undefined,
  umsatzIst: (row.umsatz_ist as number) || 0,
  kosten: (row.kosten as number) || 0,
  status: (row.status as TerminStatus) || "geplant",
  notizen: (row.notizen as string) || "",
  createdAt: row.created_at as string,
});

const toLocationBrief = (row: Record<string, unknown>): LocationVenue =>
  ({
    id: row.id as string,
    name: row.name as string,
    adresse: (row.adresse as string) || "",
  }) as LocationVenue;

const toTeamAssignment = (row: Record<string, unknown>): TourTeamAssignment => ({
  id: row.id as string,
  tourTerminId: row.tour_termin_id as string,
  teamMemberId: row.team_member_id as string,
  teamMember: row.team_members
    ? ({
        id: (row.team_members as Record<string, unknown>).id as string,
        name: (row.team_members as Record<string, unknown>).name as string,
        rolle: (row.team_members as Record<string, unknown>).rolle as string,
      } as unknown as TeamMember)
    : undefined,
  rolle: (row.rolle as string) || undefined,
  honorar: (row.honorar as number) || undefined,
  bestaetigt: (row.bestaetigt as boolean) || false,
});

// ── Empty termin form ───────────────────────────────────────────────────────

interface TerminForm {
  datum: string;
  locationId: string;
  uhrzeitAufbau: string;
  uhrzeitSoundcheck: string;
  uhrzeitEinlass: string;
  uhrzeitShow: string;
  uhrzeitAbbau: string;
  kapazitaet: number;
  ticketPreis: number;
  ticketAnbieter: string;
  ticketLink: string;
  status: TerminStatus;
  notizen: string;
}

const emptyTerminForm = (): TerminForm => ({
  datum: "",
  locationId: "",
  uhrzeitAufbau: "",
  uhrzeitSoundcheck: "",
  uhrzeitEinlass: "",
  uhrzeitShow: "",
  uhrzeitAbbau: "",
  kapazitaet: 0,
  ticketPreis: 0,
  ticketAnbieter: "",
  ticketLink: "",
  status: "geplant",
  notizen: "",
});

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminTourDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState<Tour | null>(null);
  const [showName, setShowName] = useState<string>("");
  const [termine, setTermine] = useState<TourTermin[]>([]);
  const [teamMap, setTeamMap] = useState<Record<string, TourTeamAssignment[]>>({});

  // Lookup data
  const [locations, setLocations] = useState<{ id: string; name: string; adresse: string }[]>([]);
  const [teamMembers, setTeamMembers] = useState<{ id: string; name: string; rolle: string }[]>([]);

  // UI state
  const [activeTab, setActiveTab] = useState<"termine" | "budget">("termine");
  const [expandedTermin, setExpandedTermin] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");

  // Termin panel
  const [terminPanelOpen, setTerminPanelOpen] = useState(false);
  const [editingTerminId, setEditingTerminId] = useState<string | null>(null);
  const [terminForm, setTerminForm] = useState<TerminForm>(emptyTerminForm());
  const [terminSaving, setTerminSaving] = useState(false);
  const [terminError, setTerminError] = useState<string | null>(null);

  // Team assignment
  const [assigningTeamTerminId, setAssigningTeamTerminId] = useState<string | null>(null);
  const [newTeamMemberId, setNewTeamMemberId] = useState("");
  const [newTeamRolle, setNewTeamRolle] = useState("");
  const [newTeamHonorar, setNewTeamHonorar] = useState<number>(0);

  // ── Auth ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  // ── Load data ───────────────────────────────────────────────────────────

  const loadTour = async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from("touren")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error || !data) {
      console.error(error);
      navigate("/admin/programm/touren");
      return;
    }
    const t = toTour(data as unknown as Record<string, unknown>);
    setTour(t);
    setNameValue(t.name);

    // Load show name
    if (t.showId) {
      const { data: showData } = await supabase
        .from("shows_intern")
        .select("name")
        .eq("id", t.showId)
        .maybeSingle();
      if (showData) setShowName((showData as Record<string, unknown>).name as string);
    }
  };

  const loadTermine = async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from("tour_termine")
      .select(
        `*, locations_intern:location_id ( id, name, adresse )`
      )
      .eq("tour_id", id)
      .order("datum", { ascending: true });
    if (error) {
      console.error(error);
      return;
    }
    const mapped = (data || []).map((row: unknown) =>
      toTermin(row as Record<string, unknown>)
    );
    setTermine(mapped);

    // Load team for all termine
    const terminIds = mapped.map((t) => t.id);
    if (terminIds.length > 0) {
      const { data: teamData } = await supabase
        .from("tour_team")
        .select(`*, team_members:team_member_id ( id, name, rolle )`)
        .in("tour_termin_id", terminIds);
      const map: Record<string, TourTeamAssignment[]> = {};
      (teamData || []).forEach((row: unknown) => {
        const a = toTeamAssignment(row as Record<string, unknown>);
        if (!map[a.tourTerminId]) map[a.tourTerminId] = [];
        map[a.tourTerminId].push(a);
      });
      setTeamMap(map);
    }
  };

  const loadLookups = async () => {
    const [locRes, teamRes] = await Promise.all([
      supabase.from("locations_intern").select("id, name, adresse").order("name"),
      supabase.from("team_members").select("id, name, rolle").order("name"),
    ]);
    setLocations(
      (locRes.data || []).map((r: unknown) => {
        const row = r as Record<string, unknown>;
        return { id: row.id as string, name: row.name as string, adresse: (row.adresse as string) || "" };
      })
    );
    setTeamMembers(
      (teamRes.data || []).map((r: unknown) => {
        const row = r as Record<string, unknown>;
        return { id: row.id as string, name: row.name as string, rolle: (row.rolle as string) || "" };
      })
    );
  };

  useEffect(() => {
    if (!authChecked || !id) return;
    setLoading(true);
    Promise.all([loadTour(), loadTermine(), loadLookups()]).finally(() =>
      setLoading(false)
    );
  }, [authChecked, id]);

  // ── Stats ───────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const count = termine.length;
    const kap = termine.reduce((s, t) => s + t.kapazitaet, 0);
    const sold = termine.reduce((s, t) => s + t.ticketsVerkauft, 0);
    const auslastung = kap > 0 ? (sold / kap) * 100 : 0;
    const umsatz = termine.reduce((s, t) => s + t.umsatzIst, 0);
    const kosten = termine.reduce((s, t) => s + t.kosten, 0);
    const profit = umsatz - kosten;
    return { count, kap, sold, auslastung, umsatz, kosten, profit };
  }, [termine]);

  // ── Tour actions ────────────────────────────────────────────────────────

  const updateTourField = async (field: string, value: unknown) => {
    if (!id) return;
    const { error } = await supabase
      .from("touren")
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) console.error(error);
    else await loadTour();
  };

  const handleNameSave = async () => {
    if (nameValue.trim() && nameValue !== tour?.name) {
      await updateTourField("name", nameValue.trim());
    }
    setEditingName(false);
  };

  const handleDeleteTour = async () => {
    if (!window.confirm("Diese Tour wirklich l\u00f6schen? Alle Termine werden ebenfalls gel\u00f6scht."))
      return;
    // Delete team assignments first, then termine, then tour
    const terminIds = termine.map((t) => t.id);
    if (terminIds.length > 0) {
      await supabase.from("tour_team").delete().in("tour_termin_id", terminIds);
      await supabase.from("tour_termine").delete().eq("tour_id", id!);
    }
    await supabase.from("touren").delete().eq("id", id!);
    navigate("/admin/programm/touren");
  };

  const handleCancelTour = async () => {
    if (!window.confirm("Tour wirklich absagen?")) return;
    await updateTourField("status", "abgesagt");
  };

  // ── Termin CRUD ─────────────────────────────────────────────────────────

  const openNewTermin = () => {
    setEditingTerminId(null);
    setTerminForm(emptyTerminForm());
    setTerminError(null);
    setTerminPanelOpen(true);
  };

  const openEditTermin = (t: TourTermin) => {
    setEditingTerminId(t.id);
    setTerminForm({
      datum: t.datum || "",
      locationId: t.locationId || "",
      uhrzeitAufbau: t.uhrzeitAufbau || "",
      uhrzeitSoundcheck: t.uhrzeitSoundcheck || "",
      uhrzeitEinlass: t.uhrzeitEinlass || "",
      uhrzeitShow: t.uhrzeitShow || "",
      uhrzeitAbbau: t.uhrzeitAbbau || "",
      kapazitaet: t.kapazitaet,
      ticketPreis: t.ticketPreis,
      ticketAnbieter: t.ticketAnbieter || "",
      ticketLink: t.ticketLink || "",
      status: t.status,
      notizen: t.notizen,
    });
    setTerminError(null);
    setTerminPanelOpen(true);
  };

  const closeTerminPanel = () => {
    setTerminPanelOpen(false);
    setEditingTerminId(null);
    setTerminError(null);
  };

  const handleTerminSave = async () => {
    if (!terminForm.datum) {
      setTerminError("Datum ist erforderlich.");
      return;
    }
    setTerminSaving(true);
    setTerminError(null);
    try {
      const payload = {
        tour_id: id!,
        datum: terminForm.datum,
        location_id: terminForm.locationId || null,
        uhrzeit_aufbau: terminForm.uhrzeitAufbau || null,
        uhrzeit_soundcheck: terminForm.uhrzeitSoundcheck || null,
        uhrzeit_einlass: terminForm.uhrzeitEinlass || null,
        uhrzeit_show: terminForm.uhrzeitShow || null,
        uhrzeit_abbau: terminForm.uhrzeitAbbau || null,
        kapazitaet: terminForm.kapazitaet,
        ticket_preis: terminForm.ticketPreis,
        ticket_anbieter: terminForm.ticketAnbieter || null,
        ticket_link: terminForm.ticketLink || null,
        status: terminForm.status,
        notizen: terminForm.notizen,
      };

      if (editingTerminId) {
        const { error } = await supabase
          .from("tour_termine")
          .update(payload)
          .eq("id", editingTerminId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("tour_termine").insert(payload);
        if (error) throw error;
      }
      closeTerminPanel();
      await loadTermine();
    } catch (e: unknown) {
      setTerminError(e instanceof Error ? e.message : "Fehler beim Speichern");
    } finally {
      setTerminSaving(false);
    }
  };

  const handleTerminDelete = async (terminId: string) => {
    if (!window.confirm("Diesen Termin l\u00f6schen?")) return;
    await supabase.from("tour_team").delete().eq("tour_termin_id", terminId);
    await supabase.from("tour_termine").delete().eq("id", terminId);
    await loadTermine();
    if (expandedTermin === terminId) setExpandedTermin(null);
  };

  // ── Team CRUD ───────────────────────────────────────────────────────────

  const handleAddTeam = async (terminId: string) => {
    if (!newTeamMemberId) return;
    const { error } = await supabase.from("tour_team").insert({
      tour_termin_id: terminId,
      team_member_id: newTeamMemberId,
      rolle: newTeamRolle || null,
      honorar: newTeamHonorar || null,
      bestaetigt: false,
    });
    if (error) {
      console.error(error);
      return;
    }
    setNewTeamMemberId("");
    setNewTeamRolle("");
    setNewTeamHonorar(0);
    setAssigningTeamTerminId(null);
    await loadTermine();
  };

  const handleToggleBestaetigt = async (assignmentId: string, current: boolean) => {
    await supabase
      .from("tour_team")
      .update({ bestaetigt: !current })
      .eq("id", assignmentId);
    await loadTermine();
  };

  const handleRemoveTeam = async (assignmentId: string) => {
    await supabase.from("tour_team").delete().eq("id", assignmentId);
    await loadTermine();
  };

  // ── Render ──────────────────────────────────────────────────────────────

  if (!authChecked) return null;

  const inputCls =
    "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
  const labelCls = "text-xs text-muted-foreground mb-1 block";

  if (loading || !tour) {
    return (
      <AdminLayout title="Tour-Detail" subtitle="Wird geladen...">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Tour-Detail" subtitle={tour.name}>
      <div className="max-w-6xl mx-auto">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate("/admin/programm/touren")}
              className="mt-1 p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              {editingName ? (
                <input
                  autoFocus
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNameSave();
                    if (e.key === "Escape") {
                      setNameValue(tour.name);
                      setEditingName(false);
                    }
                  }}
                  className="text-xl font-bold bg-transparent border-b-2 border-foreground/30 focus:border-foreground outline-none py-0.5"
                />
              ) : (
                <h1
                  className="text-xl font-bold cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => setEditingName(true)}
                >
                  {tour.name}
                </h1>
              )}
              <div className="flex items-center gap-2 mt-1">
                <select
                  value={tour.status}
                  onChange={(e) =>
                    updateTourField("status", e.target.value)
                  }
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border-0 cursor-pointer ${TOUR_STATUS_STYLES[tour.status]}`}
                >
                  {ALL_TOUR_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {TOUR_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                {showName && (
                  <Link
                    to={`/admin/programm/shows/${tour.showId}`}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Show: {showName}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Three-dot menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl hover:bg-muted/40 text-muted-foreground"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border/30 rounded-xl shadow-lg z-20 py-1">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setEditingName(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted/40 flex items-center gap-2"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleCancelTour();
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted/40 flex items-center gap-2 text-yellow-600"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Tour absagen
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleDeleteTour();
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    L&ouml;schen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Stats bar ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          <StatCard icon={Calendar} label="Termine" value={String(stats.count)} />
          <StatCard icon={Users} label="Kapazit&auml;t" value={stats.kap.toLocaleString("de-DE")} />
          <StatCard icon={Ticket} label="Verkauft" value={stats.sold.toLocaleString("de-DE")} />
          <StatCard
            icon={TrendingUp}
            label="Auslastung"
            value={`${stats.auslastung.toFixed(1)}%`}
          />
          <StatCard icon={DollarSign} label="Umsatz" value={eur(stats.umsatz)} />
          <StatCard icon={DollarSign} label="Kosten" value={eur(stats.kosten)} />
          <StatCard
            icon={BarChart3}
            label="Profit"
            value={eur(stats.profit)}
            className={stats.profit >= 0 ? "text-green-600" : "text-red-600"}
          />
        </div>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 border-b border-border/30 mb-6">
          <button
            onClick={() => setActiveTab("termine")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "termine"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Termine
          </button>
          <button
            onClick={() => setActiveTab("budget")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "budget"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Budget
          </button>
        </div>

        {/* ── Tab: Termine ────────────────────────────────────────────────── */}
        {activeTab === "termine" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground">
                {termine.length} Termine
              </h2>
              <button
                onClick={openNewTermin}
                className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-3 py-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Neuer Termin
              </button>
            </div>

            {termine.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground text-sm">
                Noch keine Termine. Erstelle den ersten Termin.
              </div>
            ) : (
              <div className="space-y-2">
                {termine.map((t) => (
                  <TerminRow
                    key={t.id}
                    termin={t}
                    expanded={expandedTermin === t.id}
                    onToggle={() =>
                      setExpandedTermin(expandedTermin === t.id ? null : t.id)
                    }
                    onEdit={() => openEditTermin(t)}
                    onDelete={() => handleTerminDelete(t.id)}
                    team={teamMap[t.id] || []}
                    teamMembers={teamMembers}
                    assigningTeam={assigningTeamTerminId === t.id}
                    onStartAssignTeam={() => {
                      setAssigningTeamTerminId(t.id);
                      setNewTeamMemberId("");
                      setNewTeamRolle("");
                      setNewTeamHonorar(0);
                    }}
                    onCancelAssignTeam={() => setAssigningTeamTerminId(null)}
                    newTeamMemberId={newTeamMemberId}
                    newTeamRolle={newTeamRolle}
                    newTeamHonorar={newTeamHonorar}
                    onNewTeamMemberIdChange={setNewTeamMemberId}
                    onNewTeamRolleChange={setNewTeamRolle}
                    onNewTeamHonorarChange={setNewTeamHonorar}
                    onAddTeam={() => handleAddTeam(t.id)}
                    onToggleBestaetigt={handleToggleBestaetigt}
                    onRemoveTeam={handleRemoveTeam}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Budget ─────────────────────────────────────────────────── */}
        {activeTab === "budget" && (
          <BudgetTab
            termine={termine}
            stats={stats}
            tour={tour}
            onUpdateNotizen={(val) => updateTourField("notizen", val)}
          />
        )}

        {/* ── Termin Slide-in Panel ───────────────────────────────────────── */}
        {terminPanelOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30"
            onClick={closeTerminPanel}
          />
        )}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-lg bg-background border-l border-border/20 shadow-2xl z-40 flex flex-col transition-transform duration-300 ${
            terminPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
            <h2 className="font-semibold text-sm">
              {editingTerminId ? "Termin bearbeiten" : "Neuer Termin"}
            </h2>
            <button
              onClick={closeTerminPanel}
              className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {terminError && (
              <div className="rounded-xl bg-destructive/5 border border-destructive/20 px-4 py-3 text-sm text-destructive">
                {terminError}
              </div>
            )}

            <div>
              <label className={labelCls}>Datum *</label>
              <input
                type="date"
                value={terminForm.datum}
                onChange={(e) =>
                  setTerminForm((f) => ({ ...f, datum: e.target.value }))
                }
                className={inputCls}
              />
            </div>

            <div>
              <label className={labelCls}>Location</label>
              <select
                value={terminForm.locationId}
                onChange={(e) =>
                  setTerminForm((f) => ({ ...f, locationId: e.target.value }))
                }
                className={inputCls}
              >
                <option value="">-- Keine Location --</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} {l.adresse ? `(${l.adresse})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Uhrzeiten
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Aufbau</label>
                  <input
                    type="time"
                    value={terminForm.uhrzeitAufbau}
                    onChange={(e) =>
                      setTerminForm((f) => ({
                        ...f,
                        uhrzeitAufbau: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Soundcheck</label>
                  <input
                    type="time"
                    value={terminForm.uhrzeitSoundcheck}
                    onChange={(e) =>
                      setTerminForm((f) => ({
                        ...f,
                        uhrzeitSoundcheck: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Einlass</label>
                  <input
                    type="time"
                    value={terminForm.uhrzeitEinlass}
                    onChange={(e) =>
                      setTerminForm((f) => ({
                        ...f,
                        uhrzeitEinlass: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Show</label>
                  <input
                    type="time"
                    value={terminForm.uhrzeitShow}
                    onChange={(e) =>
                      setTerminForm((f) => ({
                        ...f,
                        uhrzeitShow: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Abbau</label>
                  <input
                    type="time"
                    value={terminForm.uhrzeitAbbau}
                    onChange={(e) =>
                      setTerminForm((f) => ({
                        ...f,
                        uhrzeitAbbau: e.target.value,
                      }))
                    }
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Kapazit&auml;t</label>
                <input
                  type="number"
                  min={0}
                  value={terminForm.kapazitaet || ""}
                  onChange={(e) =>
                    setTerminForm((f) => ({
                      ...f,
                      kapazitaet: parseInt(e.target.value) || 0,
                    }))
                  }
                  className={inputCls}
                  placeholder="0"
                />
              </div>
              <div>
                <label className={labelCls}>Ticket-Preis</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={terminForm.ticketPreis || ""}
                  onChange={(e) =>
                    setTerminForm((f) => ({
                      ...f,
                      ticketPreis: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className={inputCls}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Ticket-Anbieter</label>
                <select
                  value={terminForm.ticketAnbieter}
                  onChange={(e) =>
                    setTerminForm((f) => ({
                      ...f,
                      ticketAnbieter: e.target.value,
                    }))
                  }
                  className={inputCls}
                >
                  <option value="">-- Keiner --</option>
                  {TICKET_ANBIETER_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Status</label>
                <select
                  value={terminForm.status}
                  onChange={(e) =>
                    setTerminForm((f) => ({
                      ...f,
                      status: e.target.value as TerminStatus,
                    }))
                  }
                  className={inputCls}
                >
                  {ALL_TERMIN_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {TERMIN_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelCls}>Ticket-Link</label>
              <input
                type="url"
                value={terminForm.ticketLink}
                onChange={(e) =>
                  setTerminForm((f) => ({ ...f, ticketLink: e.target.value }))
                }
                className={inputCls}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className={labelCls}>Notizen</label>
              <textarea
                value={terminForm.notizen}
                onChange={(e) =>
                  setTerminForm((f) => ({ ...f, notizen: e.target.value }))
                }
                rows={3}
                className={`${inputCls} resize-none`}
                placeholder="Interne Notizen..."
              />
            </div>
          </div>

          <div className="px-5 py-4 border-t border-border/20 flex gap-2">
            {editingTerminId && (
              <button
                onClick={() => {
                  handleTerminDelete(editingTerminId);
                  closeTerminPanel();
                }}
                className="px-4 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50"
              >
                L&ouml;schen
              </button>
            )}
            <button
              onClick={closeTerminPanel}
              className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60"
            >
              Abbrechen
            </button>
            <button
              onClick={handleTerminSave}
              disabled={terminSaving || !terminForm.datum}
              className="flex-1 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {terminSaving
                ? "Speichere..."
                : editingTerminId
                ? "Speichern"
                : "Erstellen"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// ── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-xl border border-border/20 bg-muted/5 p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className={`text-sm font-bold ${className}`}>{value}</p>
    </div>
  );
}

// ── Termin Row ──────────────────────────────────────────────────────────────

interface TerminRowProps {
  termin: TourTermin;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  team: TourTeamAssignment[];
  teamMembers: { id: string; name: string; rolle: string }[];
  assigningTeam: boolean;
  onStartAssignTeam: () => void;
  onCancelAssignTeam: () => void;
  newTeamMemberId: string;
  newTeamRolle: string;
  newTeamHonorar: number;
  onNewTeamMemberIdChange: (v: string) => void;
  onNewTeamRolleChange: (v: string) => void;
  onNewTeamHonorarChange: (v: number) => void;
  onAddTeam: () => void;
  onToggleBestaetigt: (id: string, current: boolean) => void;
  onRemoveTeam: (id: string) => void;
}

function TerminRow({
  termin: t,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  team,
  teamMembers,
  assigningTeam,
  onStartAssignTeam,
  onCancelAssignTeam,
  newTeamMemberId,
  newTeamRolle,
  newTeamHonorar,
  onNewTeamMemberIdChange,
  onNewTeamRolleChange,
  onNewTeamHonorarChange,
  onAddTeam,
  onToggleBestaetigt,
  onRemoveTeam,
}: TerminRowProps) {
  const inputCls =
    "w-full rounded-lg bg-background border border-border/30 px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-foreground/20";

  return (
    <div className="rounded-xl border border-border/20 bg-background overflow-hidden">
      {/* Summary row */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/10 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-1 shrink-0">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 items-center text-sm">
          {/* Datum */}
          <span className="font-semibold text-xs">{formatDate(t.datum)}</span>

          {/* Location */}
          <span className="text-xs text-muted-foreground truncate">
            {t.location?.name || "---"}
          </span>

          {/* Einlass / Show times */}
          <span className="text-xs text-muted-foreground hidden sm:block">
            {t.uhrzeitEinlass || "--:--"} / {t.uhrzeitShow || "--:--"}
          </span>

          {/* Kapazitaet */}
          <span className="text-xs text-muted-foreground hidden lg:block">
            {t.kapazitaet > 0 ? `${t.kapazitaet} Pl.` : "---"}
          </span>

          {/* Verkauft */}
          <span className="text-xs text-muted-foreground hidden lg:block">
            {t.ticketsVerkauft}/{t.kapazitaet}
          </span>

          {/* Ticket link */}
          <span className="hidden lg:block">
            {t.ticketLink ? (
              <a
                href={t.ticketLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Tickets
              </a>
            ) : (
              <span className="text-xs text-muted-foreground/40">---</span>
            )}
          </span>

          {/* Status badge */}
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${TERMIN_STATUS_STYLES[t.status]}`}
          >
            {TERMIN_STATUS_LABELS[t.status]}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border/10 space-y-4">
          {/* Timeline visualization */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Tagesablauf
            </h4>
            <div className="flex items-center gap-1 overflow-x-auto">
              {[
                { label: "Aufbau", time: t.uhrzeitAufbau, color: "bg-orange-200 text-orange-800" },
                { label: "Soundcheck", time: t.uhrzeitSoundcheck, color: "bg-yellow-200 text-yellow-800" },
                { label: "Einlass", time: t.uhrzeitEinlass, color: "bg-blue-200 text-blue-800" },
                { label: "Show", time: t.uhrzeitShow, color: "bg-green-200 text-green-800" },
                { label: "Abbau", time: t.uhrzeitAbbau, color: "bg-gray-200 text-gray-700" },
              ].map((phase, i) => (
                <div key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <div className="w-4 h-0.5 bg-border/40 shrink-0" />
                  )}
                  <div
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap ${phase.color}`}
                  >
                    <span className="block font-semibold">{phase.label}</span>
                    <span>{phase.time || "--:--"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-muted/10 p-2.5">
              <p className="text-[10px] text-muted-foreground">Umsatz</p>
              <p className="text-sm font-semibold">{eurFull(t.umsatzIst)}</p>
            </div>
            <div className="rounded-lg bg-muted/10 p-2.5">
              <p className="text-[10px] text-muted-foreground">Kosten</p>
              <p className="text-sm font-semibold">{eurFull(t.kosten)}</p>
            </div>
            <div className="rounded-lg bg-muted/10 p-2.5">
              <p className="text-[10px] text-muted-foreground">Profit</p>
              <p
                className={`text-sm font-semibold ${
                  t.umsatzIst - t.kosten >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {eurFull(t.umsatzIst - t.kosten)}
              </p>
            </div>
          </div>

          {/* Notizen */}
          {t.notizen && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Notizen
              </h4>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                {t.notizen}
              </p>
            </div>
          )}

          {/* Team */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Team ({team.length})
              </h4>
              <button
                onClick={onStartAssignTeam}
                className="inline-flex items-center gap-1 text-xs text-foreground hover:opacity-70"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Team zuweisen
              </button>
            </div>

            {team.length > 0 && (
              <div className="space-y-1.5 mb-2">
                {team.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-muted/10 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleBestaetigt(a.id, a.bestaetigt)}
                        className={`shrink-0 ${
                          a.bestaetigt
                            ? "text-green-600"
                            : "text-muted-foreground/40"
                        }`}
                        title={a.bestaetigt ? "Best\u00e4tigt" : "Nicht best\u00e4tigt"}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-medium">
                        {a.teamMember?.name || "---"}
                      </span>
                      {a.rolle && (
                        <span className="text-[10px] text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">
                          {a.rolle}
                        </span>
                      )}
                      {a.honorar != null && a.honorar > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          {eurFull(a.honorar)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveTeam(a.id)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {assigningTeam && (
              <div className="rounded-xl border border-border/30 p-3 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Mitglied
                    </label>
                    <select
                      value={newTeamMemberId}
                      onChange={(e) => onNewTeamMemberIdChange(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Ausw&auml;hlen...</option>
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.rolle})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Rolle
                    </label>
                    <input
                      value={newTeamRolle}
                      onChange={(e) => onNewTeamRolleChange(e.target.value)}
                      className={inputCls}
                      placeholder="z.B. Lichttechnik"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-0.5">
                      Honorar
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={newTeamHonorar || ""}
                      onChange={(e) =>
                        onNewTeamHonorarChange(parseFloat(e.target.value) || 0)
                      }
                      className={inputCls}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={onCancelAssignTeam}
                    className="px-3 py-1 rounded-lg border border-border/30 text-xs hover:bg-muted/40"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={onAddTeam}
                    disabled={!newTeamMemberId}
                    className="px-3 py-1 rounded-lg bg-foreground text-background text-xs font-medium hover:opacity-80 disabled:opacity-50"
                  >
                    Hinzuf&uuml;gen
                  </button>
                </div>
              </div>
            )}

            {team.length === 0 && !assigningTeam && (
              <p className="text-xs text-muted-foreground/50 italic">
                Noch kein Team zugewiesen
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Budget Tab ──────────────────────────────────────────────────────────────

function BudgetTab({
  termine,
  stats,
  tour,
  onUpdateNotizen,
}: {
  termine: TourTermin[];
  stats: {
    count: number;
    kap: number;
    sold: number;
    auslastung: number;
    umsatz: number;
    kosten: number;
    profit: number;
  };
  tour: Tour;
  onUpdateNotizen: (val: string) => void;
}) {
  const [notizen, setNotizen] = useState(tour.notizen);
  const [saved, setSaved] = useState(false);

  const handleSaveNotizen = async () => {
    onUpdateNotizen(notizen);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const maxRevenue = Math.max(...termine.map((t) => t.umsatzIst), 1);

  return (
    <div className="space-y-6">
      {/* Total profit/loss */}
      <div
        className={`rounded-2xl p-6 text-center ${
          stats.profit >= 0 ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        }`}
      >
        <p className="text-sm text-muted-foreground mb-1">Gesamt-Profit</p>
        <p
          className={`text-3xl font-bold ${
            stats.profit >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          {eur(stats.profit)}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Umsatz: {eur(stats.umsatz)} | Kosten: {eur(stats.kosten)}
        </p>
      </div>

      {/* Revenue bars per date */}
      {termine.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Umsatz pro Termin</h3>
          <div className="space-y-2">
            {termine.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24 shrink-0 text-right">
                  {formatDateShort(t.datum)}
                </span>
                <div className="flex-1 h-6 bg-muted/20 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full bg-green-400 rounded-lg transition-all"
                    style={{
                      width: `${(t.umsatzIst / maxRevenue) * 100}%`,
                    }}
                  />
                  <span className="absolute inset-0 flex items-center px-2 text-[10px] font-medium">
                    {eurFull(t.umsatzIst)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost breakdown table */}
      {termine.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold mb-3">Kosten pro Termin</h3>
          <div className="rounded-xl border border-border/20 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/20 border-b border-border/20">
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">
                    Datum
                  </th>
                  <th className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">
                    Location
                  </th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">
                    Umsatz
                  </th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">
                    Kosten
                  </th>
                  <th className="text-right px-3 py-2 text-xs font-semibold text-muted-foreground">
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody>
                {termine.map((t) => {
                  const profit = t.umsatzIst - t.kosten;
                  return (
                    <tr
                      key={t.id}
                      className="border-b border-border/10 last:border-0"
                    >
                      <td className="px-3 py-2 text-xs">
                        {formatDateShort(t.datum)}
                      </td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">
                        {t.location?.name || "---"}
                      </td>
                      <td className="px-3 py-2 text-xs text-right">
                        {eurFull(t.umsatzIst)}
                      </td>
                      <td className="px-3 py-2 text-xs text-right">
                        {eurFull(t.kosten)}
                      </td>
                      <td
                        className={`px-3 py-2 text-xs text-right font-medium ${
                          profit >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {eurFull(profit)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-muted/10 font-semibold">
                  <td className="px-3 py-2 text-xs" colSpan={2}>
                    Gesamt
                  </td>
                  <td className="px-3 py-2 text-xs text-right">
                    {eurFull(stats.umsatz)}
                  </td>
                  <td className="px-3 py-2 text-xs text-right">
                    {eurFull(stats.kosten)}
                  </td>
                  <td
                    className={`px-3 py-2 text-xs text-right ${
                      stats.profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {eurFull(stats.profit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Budget notizen */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Budget-Notizen</h3>
        <textarea
          value={notizen}
          onChange={(e) => setNotizen(e.target.value)}
          rows={4}
          className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
          placeholder="Notizen zum Budget..."
        />
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleSaveNotizen}
            className="px-4 py-1.5 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-80"
          >
            Speichern
          </button>
          {saved && (
            <span className="text-xs text-green-600">Gespeichert!</span>
          )}
        </div>
      </div>
    </div>
  );
}
