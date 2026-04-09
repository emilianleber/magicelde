import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, X, Users2, Mail, Phone, Euro } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

const ROLLEN = [
  "techniker",
  "assistent",
  "fotograf",
  "videograf",
  "moderator",
  "musiker",
  "servicekraft",
  "fahrer",
  "sonstiges",
] as const;
type Rolle = (typeof ROLLEN)[number];

const ROLLE_LABELS: Record<Rolle, string> = {
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

const ROLLE_COLORS: Record<Rolle, string> = {
  techniker: "bg-blue-100 text-blue-700",
  assistent: "bg-teal-100 text-teal-700",
  fotograf: "bg-amber-100 text-amber-700",
  videograf: "bg-orange-100 text-orange-700",
  moderator: "bg-purple-100 text-purple-700",
  musiker: "bg-pink-100 text-pink-700",
  servicekraft: "bg-green-100 text-green-700",
  fahrer: "bg-indigo-100 text-indigo-700",
  sonstiges: "bg-gray-100 text-gray-500",
};

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-green-100 text-green-700",
  "bg-indigo-100 text-indigo-700",
  "bg-red-100 text-red-700",
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const RolleBadge = ({ rolle }: { rolle: Rolle }) => {
  const cls = ROLLE_COLORS[rolle] || ROLLE_COLORS.sonstiges;
  const label = ROLLE_LABELS[rolle] || rolle;
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
};

// ── DB mapping ───────────────────────────────────────────────────────────────

const toTeamMember = (row: Record<string, unknown>) => ({
  id: row.id as string,
  name: (row.name as string) || "",
  rolle: ((row.rolle as string) || "sonstiges") as Rolle,
  kontaktEmail: (row.kontakt_email as string) || undefined,
  kontaktTel: (row.kontakt_tel as string) || undefined,
  stundensatz: (row.stundensatz as number) ?? undefined,
  tagessatz: (row.tagessatz as number) ?? undefined,
  notizen: (row.notizen as string) || "",
  createdAt: row.created_at as string,
  updatedAt: row.updated_at as string,
});

type TeamMemberLocal = ReturnType<typeof toTeamMember>;

// ── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  rolle: Rolle;
  kontaktEmail: string;
  kontaktTel: string;
  stundensatz: string;
  tagessatz: string;
  notizen: string;
}

const defaultForm: FormState = {
  name: "",
  rolle: "sonstiges",
  kontaktEmail: "",
  kontaktTel: "",
  stundensatz: "",
  tagessatz: "",
  notizen: "",
};

// ── Filter tabs (Alle + each role) ──────────────────────────────────────────

const FILTER_TABS: Array<"alle" | Rolle> = ["alle", ...ROLLEN];

// ── Main Component ───────────────────────────────────────────────────────────

const AdminTeam = () => {
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<TeamMemberLocal[]>([]);

  const [search, setSearch] = useState("");
  const [filterRolle, setFilterRolle] = useState<"alle" | Rolle>("alle");

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMemberLocal | null>(null);
  const [isNew, setIsNew] = useState(false);

  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

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
        .from("team_members")
        .select("*")
        .order("name");
      if (error) throw error;
      setMembers(
        (data || []).map((row) =>
          toTeamMember(row as unknown as Record<string, unknown>)
        )
      );
    } catch {
      // silent
    }
    setLoading(false);
  };

  // ── Filtered list ─────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (filterRolle !== "alle" && m.rolle !== filterRolle) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [members, filterRolle, search]);

  // ── Panel helpers ─────────────────────────────────────────────────────────

  const openNew = () => {
    setSelectedMember(null);
    setIsNew(true);
    setForm(defaultForm);
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const openEdit = (m: TeamMemberLocal) => {
    setSelectedMember(m);
    setIsNew(false);
    setForm({
      name: m.name,
      rolle: m.rolle,
      kontaktEmail: m.kontaktEmail || "",
      kontaktTel: m.kontaktTel || "",
      stundensatz: m.stundensatz != null ? String(m.stundensatz) : "",
      tagessatz: m.tagessatz != null ? String(m.tagessatz) : "",
      notizen: m.notizen,
    });
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedMember(null);
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
        rolle: form.rolle,
        kontakt_email: form.kontaktEmail || null,
        kontakt_tel: form.kontaktTel || null,
        stundensatz: form.stundensatz ? parseFloat(form.stundensatz) : null,
        tagessatz: form.tagessatz ? parseFloat(form.tagessatz) : null,
        notizen: form.notizen,
      };

      if (isNew) {
        const { data, error } = await supabase
          .from("team_members")
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        const created = toTeamMember(data as unknown as Record<string, unknown>);
        setMembers((prev) =>
          [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
        );
        setPanelMsg({ type: "ok", text: "Mitglied angelegt." });
        setSelectedMember(created);
        setIsNew(false);
      } else if (selectedMember) {
        const { data, error } = await supabase
          .from("team_members")
          .update({ ...payload, updated_at: new Date().toISOString() })
          .eq("id", selectedMember.id)
          .select()
          .single();
        if (error) throw error;
        const updated = toTeamMember(data as unknown as Record<string, unknown>);
        setMembers((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
        setSelectedMember(updated);
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
    if (!selectedMember) return;
    if (!window.confirm(`"${selectedMember.name}" wirklich loeschen?`)) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", selectedMember.id);
      if (error) throw error;
      setMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
      closePanel();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Loeschen.";
      setPanelMsg({ type: "err", text: msg });
    }
    setSaving(false);
  };

  // ── Reusable classes ──────────────────────────────────────────────────────

  const inputCls =
    "w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20";
  const labelCls = "block text-xs font-semibold text-foreground mb-1.5";

  // ── Early returns ─────────────────────────────────────────────────────────

  if (!authChecked) return null;
  if (loading)
    return (
      <AdminLayout title="Team & Mitarbeiter" subtitle="Wird geladen...">
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
        </div>
      </AdminLayout>
    );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Team & Mitarbeiter"
      subtitle={`${members.length} Mitglieder`}
      actions={
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Neues Mitglied
        </button>
      }
    >
      {/* ── Filter bar ── */}
      <div className="space-y-3 mb-5">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Mitglied suchen..."
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

        {/* Role filter tabs */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1 overflow-x-auto">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterRolle(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filterRolle === tab
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "alle" ? "Alle" : ROLLE_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty state ── */}
      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Users2 className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Noch kein Teammitglied angelegt
            </p>
            <p className="text-xs text-muted-foreground">
              Lege dein erstes Teammitglied an, um zu starten.
            </p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Erstes Mitglied anlegen
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">Keine Mitglieder gefunden.</p>
        </div>
      ) : (
        /* ── Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((m) => (
            <button
              key={m.id}
              onClick={() => openEdit(m)}
              className="text-left p-4 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${getAvatarColor(
                    m.name
                  )}`}
                >
                  {getInitials(m.name)}
                </div>
                <RolleBadge rolle={m.rolle} />
              </div>

              <p className="text-sm font-bold text-foreground mb-2">{m.name}</p>

              <div className="space-y-1 mb-2">
                {m.kontaktEmail && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3 shrink-0" />
                    <a
                      href={`mailto:${m.kontaktEmail}`}
                      onClick={(e) => e.stopPropagation()}
                      className="truncate hover:text-foreground transition-colors"
                    >
                      {m.kontaktEmail}
                    </a>
                  </div>
                )}
                {m.kontaktTel && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3 shrink-0" />
                    <a
                      href={`tel:${m.kontaktTel}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-foreground transition-colors"
                    >
                      {m.kontaktTel}
                    </a>
                  </div>
                )}
              </div>

              {(m.stundensatz != null || m.tagessatz != null) && (
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <Euro className="w-3 h-3 shrink-0" />
                  {m.stundensatz != null && (
                    <span>{m.stundensatz}/h</span>
                  )}
                  {m.tagessatz != null && (
                    <span>{m.tagessatz}/Tag</span>
                  )}
                </div>
              )}

              {m.notizen && (
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {m.notizen}
                </p>
              )}
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background border-l border-border/30 shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {isNew ? "Neues Mitglied" : "Mitglied bearbeiten"}
            </p>
            <h2 className="text-base font-bold text-foreground leading-tight">
              {isNew ? "Mitglied anlegen" : form.name || "..."}
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
              placeholder="z.B. Max Mustermann"
              className={inputCls}
            />
          </div>

          {/* Rolle */}
          <div>
            <label className={labelCls}>Rolle</label>
            <select
              value={form.rolle}
              onChange={(e) =>
                setForm((f) => ({ ...f, rolle: e.target.value as Rolle }))
              }
              className={inputCls}
            >
              {ROLLEN.map((r) => (
                <option key={r} value={r}>
                  {ROLLE_LABELS[r]}
                </option>
              ))}
            </select>
          </div>

          {/* E-Mail */}
          <div>
            <label className={labelCls}>E-Mail</label>
            <input
              type="email"
              value={form.kontaktEmail}
              onChange={(e) =>
                setForm((f) => ({ ...f, kontaktEmail: e.target.value }))
              }
              placeholder="email@beispiel.de"
              className={inputCls}
            />
          </div>

          {/* Telefon */}
          <div>
            <label className={labelCls}>Telefon</label>
            <input
              type="tel"
              value={form.kontaktTel}
              onChange={(e) =>
                setForm((f) => ({ ...f, kontaktTel: e.target.value }))
              }
              placeholder="+49 ..."
              className={inputCls}
            />
          </div>

          {/* Stundensatz + Tagessatz */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Stundensatz (EUR)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.stundensatz}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stundensatz: e.target.value }))
                }
                placeholder="z.B. 35"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Tagessatz (EUR)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.tagessatz}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tagessatz: e.target.value }))
                }
                placeholder="z.B. 250"
                className={inputCls}
              />
            </div>
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
              placeholder="Verfuegbarkeit, Besonderheiten..."
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
          {!isNew && selectedMember && (
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

export default AdminTeam;
