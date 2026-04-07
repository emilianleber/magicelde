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

const FORMAT_OPTIONS = [
  { value: "", label: "– Kein Format –" },
  { value: "closeup", label: "Close-Up" },
  { value: "buehnenshow", label: "Bühnenshow" },
  { value: "kombination", label: "Kombination" },
  { value: "magic_dinner", label: "Magic Dinner" },
  { value: "moderation", label: "Moderation" },
];

interface FormState {
  name: string;
  format: string;
  beschreibungIntern: string;
  beschreibungKunde: string;
  zieldauer: number;
  preis: number;
  anlaesse: string[];
}

const defaultForm: FormState = {
  name: "",
  format: "",
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
      format: (p as any).format || "",
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
        // Format separat speichern (nicht im Service-Typ)
        if (form.format) await supabase.from("pakete").update({ format: form.format }).eq("id", created.id);
        setPakete((prev) =>
          [...prev, { ...created, format: form.format } as any].sort((a, b) => a.name.localeCompare(b.name))
        );
        setPanelMsg({ type: "ok", text: "Paket angelegt." });
        setSelectedPaket(created);
        setIsNew(false);
      } else if (selectedPaket) {
        const updated = await paketeService.update(selectedPaket.id, payload);
        await supabase.from("pakete").update({ format: form.format || null }).eq("id", selectedPaket.id);
        const withFormat = { ...updated, format: form.format } as any;
        setPakete((prev) => prev.map((p) => (p.id === updated.id ? withFormat : p)));
        setSelectedPaket(withFormat);
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
        /* ── Grouped by category ── */
        <div className="space-y-4">
          {(() => {
            // Auto-group by name prefix
            const groups: { label: string; icon: string; color: string; items: typeof filtered }[] = [
              { label: "Close-Up", icon: "🃏", color: "bg-blue-50 border-blue-200", items: filtered.filter(p => p.name.startsWith("Close-Up")) },
              { label: "Hochzeit", icon: "💍", color: "bg-pink-50 border-pink-200", items: filtered.filter(p => p.name.startsWith("Hochzeit")) },
              { label: "Bühnenshow", icon: "🎭", color: "bg-purple-50 border-purple-200", items: filtered.filter(p => p.name.startsWith("Bühnenshow")) },
              { label: "Kombination", icon: "✨", color: "bg-amber-50 border-amber-200", items: filtered.filter(p => p.name.startsWith("Kombination")) },
            ];
            // Catch-all for ungrouped
            const grouped = new Set(groups.flatMap(g => g.items.map(i => i.id)));
            const rest = filtered.filter(p => !grouped.has(p.id));
            if (rest.length) groups.push({ label: "Sonstige", icon: "📦", color: "bg-muted/40 border-border/30", items: rest });

            return groups.filter(g => g.items.length > 0).map((group) => (
              <div key={group.label} className={`rounded-2xl border overflow-hidden ${group.color}`}>
                <div className="px-5 py-3 flex items-center gap-2">
                  <span className="text-base">{group.icon}</span>
                  <h3 className="text-sm font-bold text-foreground">{group.label}</h3>
                  <span className="text-xs text-muted-foreground ml-1">{group.items.length} Pakete</span>
                </div>
                <div className="bg-white divide-y divide-border/20">
                  {group.items
                    .sort((a, b) => a.preis - b.preis)
                    .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => openEdit(p)}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 cursor-pointer transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{p.beschreibungIntern || p.beschreibungKunde}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{p.zieldauer} min</span>
                      <span className="text-sm font-bold text-foreground shrink-0 w-20 text-right">{formatCurrency(p.preis)}</span>
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-foreground shrink-0 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            ));
          })()}
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

          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Showformat</label>
            <select
              value={form.format}
              onChange={(e) => setForm((f) => ({ ...f, format: e.target.value }))}
              className="w-full rounded-xl bg-muted/40 border border-border/30 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {FORMAT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
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
