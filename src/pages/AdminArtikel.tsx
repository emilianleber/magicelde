import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { artikelService } from "@/services/artikelService";
import type { Artikel } from "@/types/dokumente";
import { supabase } from "@/integrations/supabase/client";
import { Plus, X, Pencil, Trash2, Search } from "lucide-react";

// ── Style constants ───────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
const labelCls = "text-xs text-muted-foreground mb-1 block";

// ── Constants ─────────────────────────────────────────────────────────────────

const EINHEIT_OPTIONS = ["pauschal", "Std.", "Stk.", "km", "m²", "Tag", "Nacht"] as const;
type EinheitValue = (typeof EINHEIT_OPTIONS)[number];

const MWST_OPTIONS = [0, 7, 19] as const;
type MwstValue = (typeof MWST_OPTIONS)[number];

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtPreis(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  nummer: string;
  bezeichnung: string;
  beschreibung: string;
  einheit: EinheitValue;
  preis: number;
  mwstSatz: MwstValue;
  kategorie: string;
  aktiv: boolean;
}

const defaultForm: FormState = {
  nummer: "",
  bezeichnung: "",
  beschreibung: "",
  einheit: "pauschal",
  preis: 0,
  mwstSatz: 19,
  kategorie: "",
  aktiv: true,
};

function artikelToForm(a: Artikel): FormState {
  return {
    nummer: a.nummer || "",
    bezeichnung: a.bezeichnung,
    beschreibung: a.beschreibung || "",
    einheit: (EINHEIT_OPTIONS.includes(a.einheit as EinheitValue)
      ? a.einheit
      : "pauschal") as EinheitValue,
    preis: a.preis,
    mwstSatz: (MWST_OPTIONS.includes(a.mwstSatz as MwstValue)
      ? a.mwstSatz
      : 19) as MwstValue,
    kategorie: a.kategorie || "",
    aktiv: a.aktiv,
  };
}

// ── AktivToggle ───────────────────────────────────────────────────────────────

function AktivToggle({
  aktiv,
  onChange,
}: {
  aktiv: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!aktiv)}
      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
        aktiv ? "bg-foreground" : "bg-muted border border-border/40"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background shadow transition-transform ${
          aktiv ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const AdminArtikel = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [artikel, setArtikel] = useState<Artikel[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"alle" | "aktiv" | "inaktiv">("alle");
  const [filterKategorie, setFilterKategorie] = useState("alle");

  // Panel
  const [panelOpen, setPanelOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [selectedArtikel, setSelectedArtikel] = useState<Artikel | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [panelMsg, setPanelMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // ── Auth + load ─────────────────────────────────────────────────────────────

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
      // nurAktiv=false → fetch all including inactive for admin view
      const data = await artikelService.getAll(false);
      setArtikel(data);
    } catch {
      // silently ignore
    }
    setLoading(false);
  };

  // ── Derived data ────────────────────────────────────────────────────────────

  const kategorien = useMemo(() => {
    const set = new Set<string>();
    artikel.forEach((a) => {
      if (a.kategorie) set.add(a.kategorie);
    });
    return Array.from(set).sort();
  }, [artikel]);

  const filtered = useMemo(() => {
    return artikel.filter((a) => {
      if (filterStatus === "aktiv" && !a.aktiv) return false;
      if (filterStatus === "inaktiv" && a.aktiv) return false;
      if (filterKategorie !== "alle" && (a.kategorie || "") !== filterKategorie) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.bezeichnung.toLowerCase().includes(q) &&
          !(a.nummer || "").toLowerCase().includes(q) &&
          !(a.beschreibung || "").toLowerCase().includes(q) &&
          !(a.kategorie || "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [artikel, filterStatus, filterKategorie, search]);

  // ── Panel helpers ───────────────────────────────────────────────────────────

  const openNew = () => {
    setIsNew(true);
    setSelectedArtikel(null);
    setForm(defaultForm);
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const openEdit = (a: Artikel) => {
    setIsNew(false);
    setSelectedArtikel(a);
    setForm(artikelToForm(a));
    setPanelMsg(null);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedArtikel(null);
  };

  // ── Toggle aktiv inline ─────────────────────────────────────────────────────

  const toggleAktivInline = async (a: Artikel) => {
    try {
      const updated = await artikelService.update(a.id, { aktiv: !a.aktiv });
      setArtikel((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
    } catch {
      // ignore
    }
  };

  // ── Save ────────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    if (!form.bezeichnung.trim()) {
      setPanelMsg({ type: "err", text: "Bezeichnung ist erforderlich." });
      return;
    }

    setSaving(true);
    setPanelMsg(null);

    const payload = {
      nummer: form.nummer.trim() || undefined,
      bezeichnung: form.bezeichnung.trim(),
      beschreibung: form.beschreibung.trim() || undefined,
      einheit: form.einheit,
      preis: form.preis,
      mwstSatz: form.mwstSatz,
      kategorie: form.kategorie.trim() || undefined,
      aktiv: form.aktiv,
    };

    try {
      if (isNew) {
        const created = await artikelService.create(payload);
        setArtikel((prev) =>
          [...prev, created].sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung))
        );
        setSelectedArtikel(created);
        setIsNew(false);
        setPanelMsg({ type: "ok", text: "Artikel angelegt." });
      } else if (selectedArtikel) {
        const updated = await artikelService.update(selectedArtikel.id, payload);
        setArtikel((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
        setSelectedArtikel(updated);
        setPanelMsg({ type: "ok", text: "Gespeichert." });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Speichern.";
      setPanelMsg({ type: "err", text: msg });
    }

    setSaving(false);
  };

  // ── Delete ──────────────────────────────────────────────────────────────────

  const handleDelete = async (a: Artikel) => {
    if (!window.confirm(`"${a.bezeichnung}" wirklich löschen?`)) return;
    try {
      await artikelService.delete(a.id);
      setArtikel((prev) => prev.filter((x) => x.id !== a.id));
      if (selectedArtikel?.id === a.id) closePanel();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Fehler beim Löschen.";
      alert(msg);
    }
  };

  // ── Early returns ───────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="pt-28 text-center text-sm text-muted-foreground">Wird geladen…</div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <AdminLayout
      title="Artikel"
      subtitle="Leistungen und Produkte verwalten"
      actions={
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Suchen…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl bg-muted/40 border border-border/30 pl-9 pr-8 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 w-52"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* New article button */}
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Neuer Artikel
          </button>
        </div>
      }
    >
      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {/* Status tabs */}
        <div className="flex items-center gap-1 bg-muted/40 rounded-xl p-1">
          {(["alle", "aktiv", "inaktiv"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setFilterStatus(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === v
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "alle" ? "Alle" : v === "aktiv" ? "Aktiv" : "Inaktiv"}
            </button>
          ))}
        </div>

        {/* Kategorie dropdown */}
        <select
          value={filterKategorie}
          onChange={(e) => setFilterKategorie(e.target.value)}
          className="rounded-xl bg-muted/40 border border-border/30 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
        >
          <option value="alle">Alle Kategorien</option>
          {kategorien.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} von {artikel.length}
        </span>
      </div>

      {/* ── Table / empty states ── */}
      {artikel.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center">
            <Plus className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">
              Noch kein Artikel angelegt
            </p>
            <p className="text-xs text-muted-foreground">
              Lege deinen ersten Artikel an, um zu starten.
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Ersten Artikel anlegen
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-10 rounded-2xl bg-muted/20 border border-border/30 text-center">
          <p className="text-sm text-muted-foreground">Keine Artikel gefunden.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-muted/20">
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Nummer
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground">
                    Bezeichnung
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden md:table-cell">
                    Beschreibung
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Einheit
                  </th>
                  <th className="text-right px-3 py-2.5 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    Preis (€)
                  </th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">
                    MwSt
                  </th>
                  <th className="text-left px-3 py-2.5 text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                    Kategorie
                  </th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">
                    Aktiv
                  </th>
                  <th className="text-center px-3 py-2.5 text-xs font-semibold text-muted-foreground">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, idx) => (
                  <tr
                    key={a.id}
                    className={`border-b border-border/20 last:border-0 transition-colors hover:bg-muted/20 ${
                      !a.aktiv ? "opacity-50" : ""
                    } ${idx % 2 !== 0 ? "bg-muted/10" : ""}`}
                  >
                    {/* Nummer */}
                    <td className="px-3 py-2.5 text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {a.nummer || "—"}
                    </td>

                    {/* Bezeichnung */}
                    <td className="px-3 py-2.5 font-medium text-foreground whitespace-nowrap">
                      {a.bezeichnung}
                    </td>

                    {/* Beschreibung */}
                    <td className="px-3 py-2.5 text-xs text-muted-foreground max-w-[200px] truncate hidden md:table-cell">
                      {a.beschreibung || "—"}
                    </td>

                    {/* Einheit */}
                    <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                      {a.einheit}
                    </td>

                    {/* Preis */}
                    <td className="px-3 py-2.5 text-right tabular-nums whitespace-nowrap font-medium text-foreground">
                      {fmtPreis(a.preis)}
                    </td>

                    {/* MwSt */}
                    <td className="px-3 py-2.5 text-center">
                      <span className="text-xs text-muted-foreground">{a.mwstSatz} %</span>
                    </td>

                    {/* Kategorie */}
                    <td className="px-3 py-2.5 hidden lg:table-cell">
                      {a.kategorie ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border/30 text-muted-foreground">
                          {a.kategorie}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground/40">—</span>
                      )}
                    </td>

                    {/* Aktiv toggle */}
                    <td className="px-3 py-2.5">
                      <div className="flex justify-center">
                        <AktivToggle
                          aktiv={a.aktiv}
                          onChange={() => toggleAktivInline(a)}
                        />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                          title="Bearbeiten"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(a)}
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Panel overlay ── */}
      {panelOpen && (
        <div className="fixed inset-0 bg-black/20 z-30" onClick={closePanel} />
      )}

      {/* ── Slide-in panel ── */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[420px] bg-background border-l border-border/20 shadow-2xl z-40 flex flex-col transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {isNew ? "Neuer Artikel" : "Artikel bearbeiten"}
            </p>
            <h2 className="text-base font-bold text-foreground leading-tight">
              {isNew ? "Artikel anlegen" : form.bezeichnung || "…"}
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
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {/* Nummer */}
          <div>
            <label className={labelCls}>Nummer (optional)</label>
            <input
              type="text"
              value={form.nummer}
              onChange={(e) => setForm((f) => ({ ...f, nummer: e.target.value }))}
              placeholder="z.B. ART-001"
              className={inputCls}
            />
          </div>

          {/* Bezeichnung */}
          <div>
            <label className={labelCls}>
              Bezeichnung <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={form.bezeichnung}
              onChange={(e) => setForm((f) => ({ ...f, bezeichnung: e.target.value }))}
              placeholder="z.B. Zaubershow Classic"
              className={inputCls}
            />
          </div>

          {/* Beschreibung */}
          <div>
            <label className={labelCls}>Beschreibung (optional)</label>
            <textarea
              value={form.beschreibung}
              onChange={(e) => setForm((f) => ({ ...f, beschreibung: e.target.value }))}
              rows={3}
              placeholder="Kurze Leistungsbeschreibung…"
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Einheit */}
          <div>
            <label className={labelCls}>Einheit</label>
            <select
              value={form.einheit}
              onChange={(e) =>
                setForm((f) => ({ ...f, einheit: e.target.value as EinheitValue }))
              }
              className={inputCls}
            >
              {EINHEIT_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Preis */}
          <div>
            <label className={labelCls}>Preis (€)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              value={form.preis}
              onChange={(e) =>
                setForm((f) => ({ ...f, preis: parseFloat(e.target.value) || 0 }))
              }
              className={inputCls}
            />
          </div>

          {/* MwSt */}
          <div>
            <label className={labelCls}>MwSt %</label>
            <div className="flex gap-2">
              {MWST_OPTIONS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, mwstSatz: v }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    form.mwstSatz === v
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {v} %
                </button>
              ))}
            </div>
          </div>

          {/* Kategorie */}
          <div>
            <label className={labelCls}>Kategorie (optional)</label>
            <input
              type="text"
              value={form.kategorie}
              onChange={(e) => setForm((f) => ({ ...f, kategorie: e.target.value }))}
              placeholder="z.B. Show, Reise, Technik"
              list="artikel-kategorie-list"
              className={inputCls}
            />
            <datalist id="artikel-kategorie-list">
              {kategorien.map((k) => (
                <option key={k} value={k} />
              ))}
            </datalist>
          </div>

          {/* Aktiv */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-semibold text-foreground">Aktiv</p>
              <p className="text-xs text-muted-foreground">
                Inaktive Artikel erscheinen nicht in der Auswahl
              </p>
            </div>
            <AktivToggle
              aktiv={form.aktiv}
              onChange={(v) => setForm((f) => ({ ...f, aktiv: v }))}
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
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:opacity-80 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Speichert…" : isNew ? "Anlegen" : "Speichern"}
          </button>
          {!isNew && selectedArtikel && (
            <button
              onClick={() => handleDelete(selectedArtikel)}
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

export default AdminArtikel;
