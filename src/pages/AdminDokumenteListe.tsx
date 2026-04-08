import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { Dokument, DokumentTyp, DokumentStatus } from "@/types/dokumente";
import {
  Plus, FileText, TrendingUp, AlertTriangle, CheckCircle,
  Search, Trash2, Ban, ThumbsUp, ThumbsDown, MoreVertical, Eye, Mail, BellRing, CircleCheck, ArrowRight,
} from "lucide-react";

const STATUS_CONFIG: Record<DokumentStatus, { label: string; dot: string }> = {
  entwurf:      { label: "Entwurf",     dot: "bg-gray-300 border-2 border-gray-300" },
  gesendet:     { label: "Gesendet",    dot: "bg-blue-500" },
  akzeptiert:   { label: "Akzeptiert",  dot: "bg-green-500" },
  abgelehnt:    { label: "Abgelehnt",   dot: "bg-red-500" },
  offen:        { label: "Offen",       dot: "bg-amber-400" },
  teilbezahlt:  { label: "Teilbezahlt", dot: "bg-indigo-400" },
  bezahlt:      { label: "Bezahlt",     dot: "bg-green-500" },
  ueberfaellig: { label: "Überfällig",  dot: "bg-red-500" },
  storniert:    { label: "Storniert",   dot: "bg-gray-300" },
};

function StatusCell({ status }: { status: DokumentStatus }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, dot: "bg-gray-300" };
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full shrink-0 ${cfg.dot}`} />
      <span className="text-sm font-medium text-foreground">{cfg.label}</span>
    </div>
  );
}

const TYP_LABEL: Record<DokumentTyp, string> = {
  angebot: "Angebot",
  auftragsbestaetigung: "Auftragsb.",
  rechnung: "Rechnung",
  abschlagsrechnung: "Abschlagsrg.",
  schlussrechnung: "Schlussrg.",
  mahnung: "Mahnung",
  gutschrift: "Gutschrift",
  stornorechnung: "Storno",
};

const TYP_COLOR: Partial<Record<DokumentTyp, string>> = {
  angebot: "text-blue-600",
  auftragsbestaetigung: "text-purple-600",
  rechnung: "text-foreground",
  mahnung: "text-red-600",
};

function fmt(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function fmtDate(s?: string) {
  if (!s) return "—";
  try { return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" }); }
  catch { return s; }
}

// ── Status-Filter pro Typ ────────────────────────────────────────────────────

const STATUS_TABS: Record<string, { status: DokumentStatus | null; label: string }[]> = {
  angebot: [
    { status: null,          label: "Alle" },
    { status: "entwurf",     label: "Entwurf" },
    { status: "gesendet",    label: "Gesendet" },
    { status: "akzeptiert",  label: "Angenommen" },
    { status: "abgelehnt",   label: "Abgelehnt" },
    { status: "storniert",   label: "Storniert" },
  ],
  rechnung: [
    { status: null,           label: "Alle" },
    { status: "entwurf",      label: "Entwurf" },
    { status: "offen",        label: "Offen" },
    { status: "teilbezahlt",  label: "Teilbezahlt" },
    { status: "bezahlt",      label: "Bezahlt" },
    { status: "ueberfaellig", label: "Überfällig" },
    { status: "storniert",    label: "Storniert" },
  ],
  auftragsbestaetigung: [
    { status: null,        label: "Alle" },
    { status: "entwurf",   label: "Entwurf" },
    { status: "gesendet",  label: "Gesendet" },
    { status: "akzeptiert",label: "Angenommen" },
  ],
  mahnung: [
    { status: null,       label: "Alle" },
    { status: "entwurf",  label: "Entwurf" },
    { status: "gesendet", label: "Gesendet" },
  ],
};

// ── Seiten-Info pro Typ ──────────────────────────────────────────────────────

const PAGE_INFO: Record<string, { title: string; subtitle: string; newHref: string; newLabel: string }> = {
  angebot: {
    title: "Angebote",
    subtitle: "Alle Angebote im Überblick",
    newHref: "/admin/dokumente/new?typ=angebot",
    newLabel: "Neues Angebot",
  },
  rechnung: {
    title: "Rechnungen",
    subtitle: "Alle Rechnungen im Überblick",
    newHref: "/admin/dokumente/new?typ=rechnung",
    newLabel: "Neue Rechnung",
  },
  auftragsbestaetigung: {
    title: "Auftragsbestätigungen",
    subtitle: "Alle AB im Überblick",
    newHref: "/admin/dokumente/new?typ=auftragsbestaetigung",
    newLabel: "Neue AB",
  },
  mahnung: {
    title: "Mahnungen",
    subtitle: "Alle Mahnungen im Überblick",
    newHref: "/admin/dokumente/new?typ=mahnung",
    newLabel: "Neue Mahnung",
  },
};

const TYP_PATH: Record<DokumentTyp, string> = {
  angebot: "/admin/dokumente/angebote",
  rechnung: "/admin/dokumente/rechnungen",
  auftragsbestaetigung: "/admin/dokumente/auftragsbestaetigung",
  mahnung: "/admin/dokumente/mahnungen",
  abschlagsrechnung: "/admin/dokumente",
  schlussrechnung: "/admin/dokumente/rechnungen",
  gutschrift: "/admin/dokumente",
  stornorechnung: "/admin/dokumente",
};

// ── Nächster Schritt pro Dokumenttyp ─────────────────────────────────────────
function getNextStep(doc: Dokument): { label: string; href: string } | null {
  if (doc.status === "storniert") return null;
  switch (doc.typ) {
    case "angebot":
      if (doc.status === "akzeptiert")
        return { label: "Auftragsbestätigung erstellen", href: `/admin/dokumente/new?typ=auftragsbestaetigung&quelldokumentId=${doc.id}&quelldokumentNummer=${encodeURIComponent(doc.nummer)}` };
      return null;
    case "auftragsbestaetigung":
      if (doc.status === "gesendet" || doc.status === "akzeptiert")
        return { label: "Abschlagsrechnung erstellen", href: `/admin/dokumente/new?typ=abschlagsrechnung&quelldokumentId=${doc.id}&quelldokumentNummer=${encodeURIComponent(doc.nummer)}` };
      return null;
    case "abschlagsrechnung":
      if (doc.status === "bezahlt" || doc.status === "offen")
        return { label: "Schlussrechnung erstellen", href: `/admin/dokumente/new?typ=schlussrechnung&quelldokumentId=${doc.id}&quelldokumentNummer=${encodeURIComponent(doc.nummer)}` };
      return null;
    default:
      return null;
  }
}

export default function AdminDokumenteListe() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [authChecked, setAuthChecked] = useState(false);
  const [dokumente, setDokumente] = useState<Dokument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{ id: string; html: string; titel: string } | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);
  const [kennzahlen, setKennzahlen] = useState({ offenBetrag: 0, ueberfaelligBetrag: 0, bezahltMonatBetrag: 0, offenAnzahl: 0 });

  // Typ aus URL-Pfad
  const activeTyp: DokumentTyp | undefined = (() => {
    if (location.pathname.includes("/angebote")) return "angebot";
    if (location.pathname.includes("/rechnungen")) return "rechnung";
    if (location.pathname.includes("/auftragsbestaetigung")) return "auftragsbestaetigung";
    if (location.pathname.includes("/mahnungen")) return "mahnung";
    return undefined;
  })();

  // Status-Filter aus Query-Param
  const activeStatus = (searchParams.get("status") as DokumentStatus) || null;

  // Basis-Pfad für Status-Tab-Links
  const basePath = activeTyp ? TYP_PATH[activeTyp] : "/admin/dokumente";

  const pageInfo = activeTyp ? PAGE_INFO[activeTyp] : null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;
    setLoading(true);
    Promise.all([
      dokumenteService.getAll(activeTyp ? { typ: activeTyp } : undefined),
      dokumenteService.getKennzahlen(),
    ]).then(([docs, kz]) => {
      setDokumente(docs);
      setKennzahlen(kz);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [authChecked, activeTyp]);

  const filtered = dokumente.filter(d => {
    if (activeStatus && d.status !== activeStatus) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.nummer.toLowerCase().includes(q) ||
      d.empfaenger.name.toLowerCase().includes(q) ||
      (d.empfaenger.firma || "").toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (e: React.MouseEvent, doc: Dokument, status: DokumentStatus) => {
    e.stopPropagation();
    try {
      await dokumenteService.setStatus(doc.id, status);
      setDokumente(prev => prev.map(d => d.id === doc.id ? { ...d, status } : d));
    } catch (err: unknown) {
      alert("Fehler beim Statuswechsel: " + ((err as any)?.message || String(err)));
    }
    setActionId(null);
  };

  const handleStornieren = async (e: React.MouseEvent, doc: Dokument) => {
    e.stopPropagation();
    if (!confirm(`${TYP_LABEL[doc.typ]} ${doc.nummer} stornieren?`)) return;
    try {
      await dokumenteService.setStatus(doc.id, "storniert");
      setDokumente(prev => prev.map(d => d.id === doc.id ? { ...d, status: "storniert" as DokumentStatus } : d));
    } catch (err: unknown) {
      alert("Fehler beim Stornieren: " + ((err as any)?.message || String(err)));
    }
    setActionId(null);
  };

  const handleDelete = async (e: React.MouseEvent, doc: Dokument) => {
    e.stopPropagation();
    if (!confirm(`${TYP_LABEL[doc.typ]} ${doc.nummer} unwiderruflich löschen?`)) return;
    try {
      await dokumenteService.delete(doc.id);
      setDokumente(prev => prev.filter(d => d.id !== doc.id));
    } catch (err: unknown) {
      alert("Fehler beim Löschen: " + ((err as any)?.message || String(err)));
    }
    setActionId(null);
  };

  const handleMahnungErstellen = (e: React.MouseEvent, doc: Dokument) => {
    e.stopPropagation();
    setActionId(null);
    navigate(`/admin/dokumente/new?typ=mahnung&quelldokumentId=${doc.id}&quelldokumentNummer=${encodeURIComponent(doc.nummer)}`);
  };

  const handlePreview = async (e: React.MouseEvent, doc: Dokument) => {
    e.stopPropagation();
    setPreviewLoading(doc.id);
    try {
      const full = await dokumenteService.getById(doc.id);
      if (full?.previewHtml) {
        setPreviewDoc({ id: doc.id, html: full.previewHtml, titel: doc.nummer || doc.typ });
      } else {
        // Kein preview_html → in den Editor, damit man speichern und Vorschau erzeugen kann
        navigate(`/admin/dokumente/${doc.id}/bearbeiten`);
      }
    } catch (err) {
      navigate(`/admin/dokumente/${doc.id}/bearbeiten`);
    } finally {
      setPreviewLoading(null);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // Action-Button oben rechts
  const actions = pageInfo ? (
    <Link
      to={pageInfo.newHref}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
    >
      <Plus className="w-3.5 h-3.5" />
      {pageInfo.newLabel}
    </Link>
  ) : (
    <div className="flex items-center gap-2">
      <Link to="/admin/dokumente/new?typ=angebot" className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors">
        <Plus className="w-3.5 h-3.5" /> Angebot
      </Link>
      <Link to="/admin/dokumente/new?typ=auftragsbestaetigung" className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors">
        <Plus className="w-3.5 h-3.5" /> Auftragsbestät.
      </Link>
      <Link to="/admin/dokumente/new?typ=rechnung" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
        <Plus className="w-3.5 h-3.5" /> Rechnung
      </Link>
    </div>
  );

  const statusTabs = activeTyp ? STATUS_TABS[activeTyp] : null;
  const canAcceptRejectCheck = (doc: Dokument) =>
    doc.typ === "angebot" && (doc.status === "entwurf" || doc.status === "gesendet");

  if (!authChecked) return null;

  return (
    <>
    {/* ── Vorschau-Modal ── */}
    {previewDoc && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm" onClick={() => setPreviewDoc(null)}>
        <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col" style={{ width: 660, height: "90vh" }} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl shrink-0">
            <span className="text-sm font-semibold text-gray-800">{previewDoc.titel}</span>
            <button onClick={() => setPreviewDoc(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors text-base">✕</button>
          </div>
          {/* iFrame mit vollständigem HTML */}
          {previewDoc.html ? (
            <iframe
              srcDoc={`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box;}html,body{width:595px;background:#fff;}body>div{width:595px;height:842px;overflow:hidden;}</style></head><body>${previewDoc.html}</body></html>`}
              style={{ width: "100%", flex: 1, border: "none", borderRadius: "0 0 1rem 1rem", transform: "scale(1)", transformOrigin: "top left" }}
              title="Vorschau"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
              <FileText className="w-10 h-10 opacity-30" />
              <p className="text-sm">Keine Vorschau verfügbar</p>
              <p className="text-xs text-gray-400">Öffne das Dokument und speichere es erneut</p>
              <button onClick={() => { setPreviewDoc(null); navigate(`/admin/dokumente/${previewDoc.id}`); }} className="mt-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity">
                Dokument öffnen
              </button>
            </div>
          )}
        </div>
      </div>
    )}
    <AdminLayout
      title={pageInfo?.title ?? "Dokumente"}
      subtitle={pageInfo?.subtitle ?? "Angebote · Rechnungen · Auftragsbestätigungen · Mahnungen"}
      actions={actions}
    >

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Offene Rechnungen",
            value: fmt(kennzahlen.offenBetrag),
            sub: `${kennzahlen.offenAnzahl} Dokument${kennzahlen.offenAnzahl !== 1 ? "e" : ""}`,
            icon: TrendingUp,
            iconCls: "bg-amber-100 text-amber-600",
          },
          {
            label: "Überfällig",
            value: fmt(kennzahlen.ueberfaelligBetrag),
            sub: kennzahlen.ueberfaelligBetrag > 0 ? "Sofort handeln" : "Alles im grünen Bereich",
            icon: AlertTriangle,
            iconCls: kennzahlen.ueberfaelligBetrag > 0 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-400",
            valueCls: kennzahlen.ueberfaelligBetrag > 0 ? "text-red-600" : "",
          },
          {
            label: "Bezahlt (Monat)",
            value: fmt(kennzahlen.bezahltMonatBetrag),
            sub: "Diesen Monat eingegangen",
            icon: CheckCircle,
            iconCls: "bg-green-100 text-green-600",
            valueCls: "text-green-700",
          },
          {
            label: activeTyp ? `${pageInfo?.title ?? "Dokumente"} gesamt` : "Dokumente gesamt",
            value: String(dokumente.length),
            sub: `${filtered.length} angezeigt`,
            icon: FileText,
            iconCls: "bg-blue-100 text-blue-600",
          },
        ].map(({ label, value, sub, icon: Icon, iconCls, valueCls = "" }) => (
          <div key={label} className="rounded-2xl border border-border/20 bg-muted/10 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${iconCls}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{label}</span>
            </div>
            <p className={`text-xl font-bold tabular-nums leading-tight ${valueCls}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Status-Filter + Search ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        {/* Status-Tabs (nur bei Typ-Seiten) */}
        {statusTabs && (
          <div className="flex gap-0.5 bg-muted/20 rounded-xl p-1 border border-border/20 overflow-x-auto flex-shrink-0">
            {statusTabs.map((tab) => {
              const isActive = activeStatus === tab.status;
              const href = tab.status ? `${basePath}?status=${tab.status}` : basePath;
              return (
                <Link
                  key={tab.label}
                  to={href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            placeholder="Nummer, Name oder Firma suchen…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-border/30 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-7 w-7 border-2 border-foreground border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-border/20 bg-muted/5">
          <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center mb-4">
            <FileText className="w-7 h-7 text-muted-foreground/40" />
          </div>
          <p className="font-medium text-muted-foreground mb-1">Keine Dokumente</p>
          <p className="text-sm text-muted-foreground/60">
            {search ? `Keine Treffer für „${search}"` : activeStatus ? `Keine Dokumente mit Status „${STATUS_CONFIG[activeStatus]?.label}"` : "Erstelle dein erstes Dokument"}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/20 bg-background">
          {actionId && <div className="fixed inset-0 z-10" onClick={() => setActionId(null)} />}

          {/* ── Mobile Liste ── */}
          <div className="md:hidden divide-y divide-border/10">
            {filtered.map((doc) => {
              const contact = doc.empfaenger.firma || doc.empfaenger.name || "—";
              const isOverdue = doc.faelligAm && doc.faelligAm < today && (doc.status === "offen" || doc.status === "gesendet" || doc.status === "ueberfaellig");
              return (
                <div key={doc.id} className="px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:bg-muted/20" onClick={() => navigate(`/admin/dokumente/${doc.id}`)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold font-mono">{doc.nummer}</span>
                      <span className={`text-[10px] font-medium ${TYP_COLOR[doc.typ] ?? "text-muted-foreground"}`}>{TYP_LABEL[doc.typ]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-bold tabular-nums ${isOverdue ? "text-red-600" : ""}`}>{fmt(doc.brutto)}</p>
                    <div className="mt-1"><StatusCell status={doc.status} /></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Desktop Tabelle ── */}
          {activeTyp === "rechnung" ? (
            /* ── Rechnungen-Layout ── */
            <table className="hidden md:table w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "11%" }} /> {/* Status */}
                <col style={{ width: "10%" }} /> {/* Fälligkeit */}
                <col style={{ width: "11%" }} /> {/* Rechnungsnr. */}
                <col style={{ width: "22%" }} /> {/* Kunde */}
                <col style={{ width: "9%" }} />  {/* Datum */}
                <col style={{ width: "11%" }} /> {/* Betrag */}
                <col style={{ width: "11%" }} /> {/* Offen */}
                <col style={{ width: "15%" }} /> {/* Aktionen */}
              </colgroup>
              <thead>
                <tr className="bg-muted/10 border-b border-border/10">
                  {[
                    { h: "Status", align: "left", first: true },
                    { h: "Fälligkeit", align: "left" },
                    { h: "Rechnungsnr.", align: "left" },
                    { h: "Kunde", align: "left" },
                    { h: "Datum", align: "left" },
                    { h: "Betrag (Brutto)", align: "right" },
                    { h: "Offen (Brutto)", align: "right" },
                    { h: "", align: "right", last: true },
                  ].map(({ h, align, first, last }, i) => (
                    <th key={i} className={`text-[10px] font-semibold uppercase tracking-wider text-muted-foreground py-2.5 text-${align} ${first ? "px-4" : last ? "px-4" : "px-3"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => {
                  const isOverdue = doc.faelligAm && doc.faelligAm < today && (doc.status === "offen" || doc.status === "ueberfaellig");
                  const contact = doc.empfaenger.firma || doc.empfaenger.name || "—";
                  const showMenu = actionId === doc.id;
                  const isStorniert = doc.status === "storniert";
                  const isBezahlt = doc.status === "bezahlt";
                  return (
                    <tr key={doc.id} onClick={() => navigate(`/admin/dokumente/${doc.id}`)}
                      className={`group border-b border-border/10 last:border-0 transition-colors hover:bg-muted/20 cursor-pointer ${isOverdue ? "bg-red-50/30" : ""} ${isStorniert ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3"><StatusCell status={doc.status} /></td>
                      <td className={`px-3 py-3 text-sm ${isOverdue ? "text-red-600 font-semibold" : "text-muted-foreground"}`}>{fmtDate(doc.faelligAm) || "–"}</td>
                      <td className="px-3 py-3 font-mono text-sm text-muted-foreground">{doc.nummer || "–"}</td>
                      <td className="px-3 py-3"><p className="truncate font-semibold text-sm">{contact}</p></td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{fmtDate(doc.datum)}</td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-sm">{fmt(doc.brutto)}</td>
                      <td className={`px-3 py-3 text-right font-semibold tabular-nums text-sm ${isOverdue ? "text-red-600" : isBezahlt ? "text-green-600" : ""}`}>{fmt(doc.offenerBetrag)}</td>
                      <td className="px-4 py-2 relative" onClick={(e) => e.stopPropagation()}>
                        <div className={`flex items-center justify-end gap-1 transition-opacity ${showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          <button onClick={(e) => previewLoading === doc.id ? undefined : handlePreview(e, doc)} title="Vorschau" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                            {previewLoading === doc.id ? <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin block" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/dokumente/${doc.id}?send=1`); }} title="Versenden" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActionId(showMenu ? null : doc.id); }} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {showMenu && (
                              <div className="absolute right-0 top-full mt-1 z-50 bg-background border border-border/30 rounded-xl shadow-xl overflow-hidden w-48 py-1">
                                {(() => { const ns = getNextStep(doc); return ns ? (
                                  <button onClick={(e) => { e.stopPropagation(); setActionId(null); navigate(ns.href); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-indigo-700 hover:bg-indigo-50 transition-colors text-left font-medium border-b border-border/10">
                                    <ArrowRight className="w-3.5 h-3.5 shrink-0" /> {ns.label}
                                  </button>
                                ) : null; })()}
                                {!isBezahlt && !isStorniert && (
                                  <button onClick={(e) => handleStatusChange(e, doc, "bezahlt")} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-green-700 hover:bg-green-50 transition-colors text-left">
                                    <CircleCheck className="w-3.5 h-3.5 shrink-0" /> Als bezahlt markieren
                                  </button>
                                )}
                                {!isStorniert && (
                                  <button onClick={(e) => handleMahnungErstellen(e, doc)} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-amber-700 hover:bg-amber-50 transition-colors text-left">
                                    <BellRing className="w-3.5 h-3.5 shrink-0" /> Mahnung erstellen
                                  </button>
                                )}
                                {!isStorniert && (
                                  <button onClick={(e) => handleStornieren(e, doc)} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-orange-700 hover:bg-orange-50 transition-colors text-left">
                                    <Ban className="w-3.5 h-3.5 shrink-0" /> Stornieren
                                  </button>
                                )}
                                <button onClick={(e) => handleDelete(e, doc)} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left">
                                  <Trash2 className="w-3.5 h-3.5 shrink-0" /> Löschen
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            /* ── Standard-Layout (Angebote, AB, Mahnungen, Übersicht) ── */
            <table className="hidden md:table w-full table-fixed border-collapse">
              <colgroup>
                <col style={{ width: "14%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "38%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "12%" }} />
              </colgroup>
              <thead>
                <tr className="bg-muted/10 border-b border-border/10">
                  {["Status", "Nr.", "Kunde / Betreff", "Datum", "Betrag (Brutto)", ""].map((h, i) => (
                    <th key={i} className={`text-[10px] font-semibold uppercase tracking-wider text-muted-foreground py-2.5 ${i === 0 ? "px-4 text-left" : i >= 4 ? "px-4 text-right" : "px-3 text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => {
                  const isOverdue = doc.faelligAm && doc.faelligAm < today && (doc.status === "offen" || doc.status === "gesendet" || doc.status === "ueberfaellig");
                  const contact = doc.empfaenger.firma || doc.empfaenger.name || "—";
                  const betreff = `${TYP_LABEL[doc.typ]} ${doc.nummer}`;
                  const showMenu = actionId === doc.id;
                  const isStorniert = doc.status === "storniert";
                  const canAcceptReject = canAcceptRejectCheck(doc);
                  return (
                    <tr key={doc.id} onClick={() => navigate(`/admin/dokumente/${doc.id}`)}
                      className={`group border-b border-border/10 last:border-0 transition-colors hover:bg-muted/20 cursor-pointer ${isOverdue ? "bg-red-50/30" : ""} ${isStorniert ? "opacity-50" : ""}`}>
                      <td className="px-4 py-3"><StatusCell status={doc.status} /></td>
                      <td className="px-3 py-3 font-mono text-sm text-muted-foreground">{doc.nummer || "– – –"}</td>
                      <td className="px-3 py-3 min-w-0">
                        <p className="truncate font-semibold text-sm">{contact}</p>
                        <p className="truncate text-xs text-muted-foreground">{betreff}</p>
                      </td>
                      <td className="px-3 py-3 text-sm text-muted-foreground">{fmtDate(doc.datum)}</td>
                      <td className={`px-4 py-3 text-right font-semibold tabular-nums text-sm ${isOverdue ? "text-red-600" : ""}`}>{fmt(doc.brutto)}</td>
                      <td className="px-4 py-2 relative" onClick={(e) => e.stopPropagation()}>
                        <div className={`flex items-center justify-end gap-1 transition-opacity ${showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          <button onClick={(e) => previewLoading === doc.id ? undefined : handlePreview(e, doc)} title="Vorschau" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                            {previewLoading === doc.id ? <span className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin block" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/dokumente/${doc.id}?send=1`); }} title="Versenden" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button onClick={(e) => { e.stopPropagation(); setActionId(showMenu ? null : doc.id); }} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {showMenu && (
                              <div className="absolute right-0 top-full mt-1 z-50 bg-background border border-border/30 rounded-xl shadow-xl overflow-hidden w-44 py-1">
                                {(() => { const ns = getNextStep(doc); return ns ? (
                                  <button onClick={(e) => { e.stopPropagation(); setActionId(null); navigate(ns.href); }} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-indigo-700 hover:bg-indigo-50 transition-colors text-left font-medium border-b border-border/10">
                                    <ArrowRight className="w-3.5 h-3.5 shrink-0" /> {ns.label}
                                  </button>
                                ) : null; })()}
                                {canAcceptReject && (
                                  <button onClick={(e) => handleStatusChange(e, doc, "akzeptiert")} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-green-700 hover:bg-green-50 transition-colors text-left">
                                    <ThumbsUp className="w-3.5 h-3.5 shrink-0" /> Annehmen
                                  </button>
                                )}
                                {canAcceptReject && (
                                  <button onClick={(e) => handleStatusChange(e, doc, "abgelehnt")} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors text-left">
                                    <ThumbsDown className="w-3.5 h-3.5 shrink-0" /> Ablehnen
                                  </button>
                                )}
                                {!isStorniert && (
                                  <button onClick={(e) => handleStornieren(e, doc)} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-amber-700 hover:bg-amber-50 transition-colors text-left">
                                    <Ban className="w-3.5 h-3.5 shrink-0" /> Stornieren
                                  </button>
                                )}
                                <button onClick={(e) => handleDelete(e, doc)} className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left">
                                  <Trash2 className="w-3.5 h-3.5 shrink-0" /> Löschen
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </AdminLayout>
    </>
  );
}
