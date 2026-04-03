import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { paketeService } from "@/services/paketeService";
import type { Paket } from "@/types/productions";
import { Plus, Search, X, Pencil, Package } from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────────────

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);

const ANLASS_COLORS: Record<string, string> = {
  hochzeit: "bg-pink-100 text-pink-700",
  firmenevent: "bg-blue-100 text-blue-700",
  firma: "bg-blue-100 text-blue-700",
  geburtstag: "bg-orange-100 text-orange-700",
  gala: "bg-violet-100 text-violet-700",
  familie: "bg-green-100 text-green-700",
};

const anlassColor = (anlass: string) =>
  ANLASS_COLORS[anlass.toLowerCase()] ?? "bg-muted text-muted-foreground";

// ── Form state ─────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  beschreibungIntern: string;
  beschreibungKunde: string;
  zieldauer: number;
  preis: number;
  anlaesse: string[];
}

const defaultForm: FormState = {
  name: "",
  beschreibungIntern: "",
  beschreibungKunde: "",
  zieldauer: 60,
  preis: 0,
  anlaesse: [],
};

// ── Main Component ────────────────────────────────────────────────────────────

const AdminPakete = () => {
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pakete, setPakete] = useState<Paket[]>([]);
  const [search, setSearch] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState<Paket | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [anlassInput, setAnlassInput] = useState("");
  const anlassInputRef = useRef<HTMLInputElement>(null);

  // ── Auth ────────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
      setAuthChecked(true);
    });
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await paketeService.getAll();
      setPakete(data);
    } catch {
      // ignore
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authChecked) loadData();
  }, [authChecked]);

  // ── Filtered list ───────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    if (!search) return pakete;
    return pakete.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pakete, search]);

  // ── Panel helpers ───────────────────────────────────────────────────────────

  const openNew = () => {
    setSelectedPaket(null);
    setIsNew(true);
    setForm(defaultForm);
    setPanelMsg(null);
    setAnlassInput("");
    setPanelOpen(true);
  };

  const openEdit = (p: Paket) => {
    setSelectedPaket(p);
    setIsNew(false);
    setForm({
      name: p.name,
      beschreibungIntern: p.beschreibungIntern,
      beschreibungKunde: p.beschreibungKunde,
      zieldauer: p.zieldauer,
      preis: p.preis,
      anlaesse: [...p.anlaesse],
    });
    setPanelMsg(null);
    setAnlassInput("");
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedPaket(null);
  };

  // ── Anlass tag helpers ──────────────────────────────────────────────────────

  const addAnlass = () => {
    const val = anlassInput.trim().toLowerCase();
    if (val && !form.anlaesse.includes(val)) {
      setForm((f) => ({ ...f, anlaesse: [...f.anlaesse, val] }));
    }
    setAnlassInput("");
    anlassInputRef.current?.focus();
  };

  const removeAnlass = (a: string) =>
    setForm((f) => ({ ...f, anlaesse: f.anlaesse.filter((x) => x !== a) }));

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
        beschreibungIntern: form.beschreibungIntern.trim(),
        beschreibungKunde: form.beschreibungKunde.trim(),
        zieldauer: form.zieldauer,
        preis: form.preis,
        anlaesse: form.anlaesse,
        effektIds: selectedPaket?.effektIds ?? [],
      };
      if (isNew) {
        const created = await paketeService.create(payload);
        setPakete((prev) =>
          [...prev, created].sort((a, b) => a.name.localeCompare(b.name))
        );
        setPanelMsg({ type: "ok", text: "Paket angelegt." });
        setSelectedPaket(created);
        setIsNew(false);
      } else if (selectedPaket) {
        const updated = await paketeService.update(selectedPaket.id, payload);
        setPakete((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setSelectedPaket(updated);
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
    if (!selectedPaket) return;
    if (!window.confirm(`"${selectedPaket.name}" wirklich löschen?`)) return;
    setSaving(true);
    try {
      await paketeService.delete(selectedPaket.id);
      setPakete((prev) => prev.filter((p) => p.id !== selectedPaket.id));
      closePanel();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Löschen.";
      setPanelMsg({ type: "err", text: msg });
    }
    setSaving(false);
  };

  // ── Early returns ───────────────────────────────────────────────────────────

  if (!authChecked) return null;
  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
      </div>
    );

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Pakete"
      subtitle="Show-Pakete und Leistungsbündel"
      actions={
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Neues Paket
        </button>
      }
    >
      {/* ── Search bar ── */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Paket suchen…"
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
      </div>

      {/* ── Empty state ── */}
      {pakete.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Package className="w-8 h-8 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Noch kein Paket angelegt</p>
            <p className="text-xs text-muted-foreground">Lege dein erstes Paket an, um zu starten.</p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Erstes Paket anlegen
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">Keine Pakete gefunden.</p>
        </div>
      ) : (
        /* ── Card grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="relative p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/30 hover:bg-muted/40 transition-all group"
            >
              {/* Edit button */}
              <button
                onClick={() => openEdit(p)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-muted/60 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>

              {/* Heading */}
              <h3 className="text-sm font-bold text-foreground mb-1 pr-8 leading-tight">
                {p.name}
              </h3>

              {/* Price + duration */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-base font-bold text-foreground">
                  {formatCurrency(p.preis)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {p.zieldauer} min
                </span>
              </div>

              {/* Anlässe badges */}
              {p.anlaesse.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.anlaesse.map((a) => (
                    <span
                      key={a}
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${anlassColor(a)}`}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}

              {/* Description preview */}
              {p.beschreibungKunde && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {p.beschreibungKunde.length > 80
                    ? p.beschreibungKunde.slice(0, 80) + "…"
                    : p.beschreibungKunde}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Panel overlay ── */}
      {panelOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closePanel} />
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
              {isNew ? "Neues Paket" : "Paket bearbeiten"}
            </p>
            <h2 className="text-base font-bold text-foreground leading-tight">
              {isNew ? "Paket anlegen" : form.name || "…"}
            </h2>
          </div>
          <button
            onClick={closePanel}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Panel body */}
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
              placeholder="z.B. Premium Hochzeitspaket"
              className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Zieldauer + Preis */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Zieldauer (min)
              </label>
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
                className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Preis (€)
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.preis}
                onChange={(e) =>
                  setForm((f) => ({ ...f, preis: parseFloat(e.target.value) || 0 }))
                }
                className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>
          </div>

          {/* Anlässe */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Anlässe</label>
            <div className="flex gap-2 mb-2">
              <input
                ref={anlassInputRef}
                type="text"
                value={anlassInput}
                onChange={(e) => setAnlassInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAnlass();
                  }
                }}
                placeholder="z.B. hochzeit, firmenevent"
                className="flex-1 rounded-xl bg-muted/40 border border-border/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={addAnlass}
                className="px-3 py-2 rounded-xl bg-muted border border-border/30 text-sm font-semibold text-foreground hover:bg-muted/60 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {form.anlaesse.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.anlaesse.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => removeAnlass(a)}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted border border-border/30 text-foreground hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors"
                  >
                    {a}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Beschreibung Kunde */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Beschreibung (Kunde)
            </label>
            <textarea
              value={form.beschreibungKunde}
              onChange={(e) => setForm((f) => ({ ...f, beschreibungKunde: e.target.value }))}
              rows={4}
              placeholder="Beschreibung für Angebote und Kundenkommunikation"
              className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
            />
          </div>

          {/* Beschreibung Intern */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Interne Notizen
            </label>
            <textarea
              value={form.beschreibungIntern}
              onChange={(e) => setForm((f) => ({ ...f, beschreibungIntern: e.target.value }))}
              rows={3}
              placeholder="Interne Hinweise, Checklisten, Anforderungen"
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

        {/* Panel footer */}
        <div className="shrink-0 px-5 py-4 border-t border-border/20 flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Speichert…" : isNew ? "Anlegen" : "Speichern"}
          </button>
          <button
            onClick={closePanel}
            className="px-4 py-2.5 rounded-xl border border-border/30 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
          >
            Abbrechen
          </button>
          {!isNew && selectedPaket && (
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

export default AdminPakete;
