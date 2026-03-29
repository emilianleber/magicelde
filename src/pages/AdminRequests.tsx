import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

interface PortalRequest {
  id: string;
  created_at: string;
  status: string | null;
  name: string;
  firma?: string | null;
  email: string;
  phone: string | null;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  gaeste: number | null;
  format: string | null;
  nachricht: string | null;
  event_id?: string | null;
  deleted_at?: string | null;
}

type ViewFilter = "aktiv" | "abgeschlossen" | "geloescht" | "alle";

const ACTIVE_STATUSES = [
  "neu",
  "in_bearbeitung",
  "details_besprechen",
  "angebot_gesendet",
  "warte_auf_kunde",
];

const DONE_STATUSES = ["bestätigt", "abgelehnt", "archiviert"];

const formatStatusLabel = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "Neu";
    case "in_bearbeitung":
      return "In Bearbeitung";
    case "details_besprechen":
      return "Details besprechen";
    case "angebot_gesendet":
      return "Angebot gesendet";
    case "warte_auf_kunde":
      return "Warte auf Kunde";
    case "bestätigt":
      return "Bestätigt";
    case "abgelehnt":
      return "Abgelehnt";
    case "archiviert":
      return "Archiviert";
    default:
      return status || "Offen";
  }
};

const formatStatusClasses = (status?: string | null) => {
  switch (status) {
    case "neu":
      return "text-accent bg-accent/10";
    case "in_bearbeitung":
    case "details_besprechen":
    case "angebot_gesendet":
    case "warte_auf_kunde":
      return "text-foreground bg-muted";
    case "bestätigt":
      return "text-green-700 bg-green-100";
    case "abgelehnt":
      return "text-destructive bg-destructive/10";
    case "archiviert":
      return "text-muted-foreground bg-muted";
    default:
      return "text-muted-foreground bg-muted";
  }
};

const AdminRequests = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<PortalRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [viewFilter, setViewFilter] = useState<ViewFilter>("aktiv");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [selectMode, setSelectMode] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

    const loadData = async () => {
      setLoading(true);

      const { data: adminEntry, error: adminError } = await supabase
        .from("portal_admins")
        .select("*")
        .eq("email", user.email)
        .maybeSingle();

      if (adminError || !adminEntry) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const { data, error } = await supabase
        .from("portal_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fehler beim Laden der Anfragen:", error);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    };

    loadData();
  }, [user, navigate]);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const query = search.toLowerCase();

      const matchesSearch =
        request.name?.toLowerCase().includes(query) ||
        request.firma?.toLowerCase().includes(query) ||
        request.email?.toLowerCase().includes(query) ||
        request.anlass?.toLowerCase().includes(query) ||
        request.ort?.toLowerCase().includes(query) ||
        request.format?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "Alle" || formatStatusLabel(request.status) === statusFilter;

      const isDeleted = !!request.deleted_at;
      const isConverted = !!request.event_id;
      const isActiveStatus = ACTIVE_STATUSES.includes(request.status || "");
      const isDoneStatus = DONE_STATUSES.includes(request.status || "");

      let matchesView = true;

      if (viewFilter === "aktiv") {
        matchesView = !isDeleted && !isConverted && isActiveStatus;
      } else if (viewFilter === "abgeschlossen") {
        matchesView = !isDeleted && (isConverted || isDoneStatus);
      } else if (viewFilter === "geloescht") {
        matchesView = isDeleted;
      } else if (viewFilter === "alle") {
        matchesView = true;
      }

      return matchesSearch && matchesStatus && matchesView;
    });
  }, [requests, search, statusFilter, viewFilter]);

  const allVisibleSelected =
    filteredRequests.length > 0 &&
    filteredRequests.every((request) => selectedIds.includes(request.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]
    );
  };

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      const visibleIds = filteredRequests.map((r) => r.id);
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
      return;
    }

    const visibleIds = filteredRequests.map((r) => r.id);
    setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;

    setDeleting(true);

    const { error } = await supabase
      .from("portal_requests")
      .update({ deleted_at: new Date().toISOString() })
      .in("id", selectedIds);

    if (error) {
      console.error("Fehler beim Löschen:", error);
      setDeleting(false);
      return;
    }

    setRequests((prev) =>
      prev.map((request) =>
        selectedIds.includes(request.id)
          ? { ...request, deleted_at: new Date().toISOString() }
          : request
      )
    );
    setSelectedIds([]);
    setDeleting(false);
  };

  const activeCount = requests.filter(
    (r) =>
      !r.deleted_at &&
      !r.event_id &&
      ACTIVE_STATUSES.includes(r.status || "")
  ).length;

  const doneCount = requests.filter(
    (r) =>
      !r.deleted_at &&
      (!!r.event_id || DONE_STATUSES.includes(r.status || ""))
  ).length;

  const deletedCount = requests.filter((r) => !!r.deleted_at).length;

  if (loading) {
    return <div className="pt-28 text-center">Wird geladen…</div>;
  }

  if (isAdmin === false) {
    return <div className="pt-28 text-center">Kein Zugriff</div>;
  }

  return (
    <AdminLayout
      title="Anfragen"
      subtitle="Alle eingegangenen Buchungsanfragen im Überblick"
      actions={
        <div className="flex items-center gap-3 flex-wrap">
          {selectMode && selectedIds.length > 0 && (
            <button
              onClick={deleteSelected}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Löscht…" : `Löschen (${selectedIds.length})`}
            </button>
          )}

          <button
            onClick={() => { setSelectMode((v) => !v); setSelectedIds([]); }}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${selectMode ? "border-border/60 bg-muted/40 text-foreground" : "border-border/30 text-muted-foreground hover:text-foreground"}`}
          >
            {selectMode ? "Abbrechen" : "Auswählen"}
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" /> Abmelden
          </button>

          <Link
            to="/admin/new-request"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Neue Anfrage
          </Link>
        </div>
      }
    >
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { key: "aktiv", label: `Aktiv (${activeCount})` },
          { key: "abgeschlossen", label: `Abgeschlossen (${doneCount})` },
          { key: "geloescht", label: `Gelöscht (${deletedCount})` },
          { key: "alle", label: "Alle" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setViewFilter(tab.key as ViewFilter);
              setSelectedIds([]);
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              viewFilter === tab.key
                ? "bg-background border border-border/30 text-foreground shadow-sm"
                : "bg-muted/30 text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_220px] gap-4 mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Suche nach Name, Firma, E-Mail, Anlass, Ort, Format …"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-muted/40 border border-border/30 pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-2xl bg-muted/40 border border-border/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option>Alle</option>
          <option>Neu</option>
          <option>In Bearbeitung</option>
          <option>Details besprechen</option>
          <option>Angebot gesendet</option>
          <option>Warte auf Kunde</option>
          <option>Bestätigt</option>
          <option>Abgelehnt</option>
          <option>Archiviert</option>
        </select>
      </div>

      {selectMode && (
        <div className="flex items-center gap-3 mb-6">
          <label className="inline-flex items-center gap-3 rounded-xl bg-muted/30 border border-border/30 px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleSelectAllVisible}
              className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
            />
            <span className="font-sans text-sm text-foreground">
              Alle sichtbaren auswählen
            </span>
          </label>

          {selectedIds.length > 0 && (
            <span className="font-sans text-sm text-muted-foreground">
              {selectedIds.length} ausgewählt
            </span>
          )}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {activeCount}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Aktive Anfragen
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {doneCount}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Abgeschlossen
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-muted/30 border border-border/30">
          <p className="font-display text-2xl font-bold text-foreground">
            {deletedCount}
          </p>
          <p className="font-sans text-xs text-muted-foreground mt-1">
            Gelöscht
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="p-12 rounded-3xl bg-muted/20 border border-border/30 text-center">
            <p className="font-sans text-sm text-muted-foreground">
              Keine passenden Anfragen gefunden.
            </p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors"
            >
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                <div className="flex items-start gap-4 flex-1">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(request.id)}
                      onChange={() => toggleSelect(request.id)}
                      className="mt-1 h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-3">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {request.name}
                      </h3>

                      {request.firma && (
                        <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-muted-foreground bg-background/70 border border-border/20">
                          {request.firma}
                        </span>
                      )}

                      <span
                        className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${formatStatusClasses(
                          request.status
                        )}`}
                      >
                        {formatStatusLabel(request.status)}
                      </span>

                      {request.event_id && (
                        <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-green-700 bg-green-100">
                          Konvertiert
                        </span>
                      )}

                      {request.deleted_at && (
                        <span className="font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full text-destructive bg-destructive/10">
                          Gelöscht
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-base text-foreground mb-3">
                      {request.anlass || "Anfrage"}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-accent" />
                        {request.email}
                      </span>

                      {request.phone && (
                        <span className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-accent" />
                          {request.phone}
                        </span>
                      )}

                      {request.datum && (
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          {new Date(request.datum).toLocaleDateString("de-DE")}
                        </span>
                      )}

                      {request.ort && (
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          {request.ort}
                        </span>
                      )}

                      {request.gaeste && (
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          {request.gaeste} Gäste
                        </span>
                      )}
                    </div>

                    {request.nachricht && (
                      <p className="font-sans text-sm text-muted-foreground mt-4 leading-relaxed">
                        {request.nachricht}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-start xl:items-end gap-3">
                  <p className="font-sans text-sm text-muted-foreground">
                    Eingegangen am{" "}
                    {new Date(request.created_at).toLocaleDateString("de-DE")}
                  </p>

                  <Link
                    to={`/admin/requests/${request.id}`}
                    className="btn-primary inline-flex group"
                  >
                    Details öffnen
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminRequests;