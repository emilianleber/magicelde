import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { Dokument, DokumentTyp, DokumentStatus } from "@/types/dokumente";
import {
  Plus, FileText, TrendingUp, AlertTriangle, CheckCircle,
  Search, Filter, ChevronRight, Euro,
} from "lucide-react";

const STATUS_CONFIG: Record<DokumentStatus, { label: string; cls: string }> = {
  entwurf:      { label: "Entwurf",     cls: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
  gesendet:     { label: "Gesendet",    cls: "bg-blue-100 text-blue-700" },
  akzeptiert:   { label: "Akzeptiert",  cls: "bg-green-100 text-green-700" },
  abgelehnt:    { label: "Abgelehnt",   cls: "bg-red-100 text-red-700" },
  offen:        { label: "Offen",       cls: "bg-amber-100 text-amber-700" },
  teilbezahlt:  { label: "Teilbezahlt", cls: "bg-indigo-100 text-indigo-700" },
  bezahlt:      { label: "Bezahlt",     cls: "bg-green-100 text-green-700" },
  ueberfaellig: { label: "Überfällig",  cls: "bg-red-100 text-red-700" },
  storniert:    { label: "Storniert",   cls: "bg-gray-100 text-gray-400" },
};

function StatusBadge({ status }: { status: DokumentStatus }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, cls: "bg-gray-100 text-gray-600" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-semibold ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

const TYP_LABEL: Record<DokumentTyp, string> = {
  angebot: "Angebot",
  auftragsbestaetigung: "Auftragsb.",
  rechnung: "Rechnung",
  abschlagsrechnung: "Abschlagsrg.",
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

type Tab = "alle" | "angebote" | "rechnungen" | "auftragsbestaetigung" | "mahnungen";

const TABS: { id: Tab; label: string; path: string; typ?: DokumentTyp }[] = [
  { id: "alle",                 label: "Alle",                  path: "/admin/dokumente" },
  { id: "angebote",             label: "Angebote",              path: "/admin/dokumente/angebote",             typ: "angebot" },
  { id: "rechnungen",           label: "Rechnungen",            path: "/admin/dokumente/rechnungen",           typ: "rechnung" },
  { id: "auftragsbestaetigung", label: "Auftragsbestätig.",      path: "/admin/dokumente/auftragsbestaetigung", typ: "auftragsbestaetigung" },
  { id: "mahnungen",            label: "Mahnungen",             path: "/admin/dokumente/mahnungen",            typ: "mahnung" },
];

export default function AdminDokumenteListe() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [dokumente, setDokumente] = useState<Dokument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [kennzahlen, setKennzahlen] = useState({ offenBetrag: 0, ueberfaelligBetrag: 0, bezahltMonatBetrag: 0, offenAnzahl: 0 });

  const activeTab: Tab = (() => {
    if (location.pathname.includes("/mahnungen")) return "mahnungen";
    if (location.pathname.includes("/angebote")) return "angebote";
    if (location.pathname.includes("/rechnungen")) return "rechnungen";
    if (location.pathname.includes("/auftragsbestaetigung")) return "auftragsbestaetigung";
    return "alle";
  })();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;
    const tabInfo = TABS.find(t => t.id === activeTab);
    setLoading(true);
    Promise.all([
      dokumenteService.getAll(tabInfo?.typ ? { typ: tabInfo.typ } : undefined),
      dokumenteService.getKennzahlen(),
    ]).then(([docs, kz]) => {
      setDokumente(docs);
      setKennzahlen(kz);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [authChecked, activeTab]);

  const filtered = dokumente.filter(d => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.nummer.toLowerCase().includes(q) ||
      d.empfaenger.name.toLowerCase().includes(q) ||
      (d.empfaenger.firma || "").toLowerCase().includes(q)
    );
  });

  const today = new Date().toISOString().split("T")[0];

  const actions = (
    <div className="flex items-center gap-2">
      <Link to="/admin/dokumente/new?typ=angebot" className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors">
        <Plus className="w-3.5 h-3.5" />
        Angebot
      </Link>
      <Link to="/admin/dokumente/new?typ=auftragsbestaetigung" className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors">
        <Plus className="w-3.5 h-3.5" />
        Auftragsbestät.
      </Link>
      <Link to="/admin/dokumente/new?typ=rechnung" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
        <Plus className="w-3.5 h-3.5" />
        Rechnung
      </Link>
    </div>
  );

  if (!authChecked) return null;

  return (
    <AdminLayout title="Finanzen" subtitle="Angebote · Rechnungen · Auftragsbestätigungen" actions={actions}>

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
            label: "Dokumente gesamt",
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

      {/* ── Tabs + Search ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        {/* Tabs */}
        <div className="flex gap-0.5 bg-muted/20 rounded-xl p-1 border border-border/20 overflow-x-auto flex-shrink-0">
          {TABS.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

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
            {search ? `Keine Treffer für „${search}"` : "Erstelle dein erstes Dokument"}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/20 overflow-hidden bg-background">
          {/* Header */}
          <div className="hidden md:grid text-[10px] text-muted-foreground uppercase font-semibold tracking-wider px-4 py-2.5 bg-muted/10 border-b border-border/10"
            style={{ gridTemplateColumns: "120px 1fr 120px 100px 100px 110px 110px 32px" }}>
            <span>Nummer</span>
            <span>Kontakt</span>
            <span>Typ</span>
            <span>Datum</span>
            <span>Fällig</span>
            <span className="text-right">Betrag</span>
            <span className="text-right">Status</span>
            <span />
          </div>

          {filtered.map((doc, i) => {
            const isOverdue = doc.faelligAm && doc.faelligAm < today && (doc.status === "offen" || doc.status === "gesendet" || doc.status === "ueberfaellig");
            const contact = doc.empfaenger.firma || doc.empfaenger.name || "—";

            return (
              <button
                key={doc.id}
                onClick={() => navigate(`/admin/dokumente/${doc.id}`)}
                className={`w-full text-left hover:bg-muted/20 transition-colors border-b border-border/10 last:border-0 ${isOverdue ? "bg-red-50/30" : ""}`}
              >
                {/* Mobile */}
                <div className="md:hidden px-4 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold font-mono">{doc.nummer}</span>
                      <span className={`text-[10px] font-medium ${TYP_COLOR[doc.typ] ?? "text-muted-foreground"}`}>{TYP_LABEL[doc.typ]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{contact}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{fmtDate(doc.datum)}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-bold tabular-nums ${isOverdue ? "text-red-600" : ""}`}>{fmt(doc.brutto)}</p>
                    <div className="mt-1"><StatusBadge status={doc.status} /></div>
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:grid items-center px-4 py-3 text-sm gap-2"
                  style={{ gridTemplateColumns: "120px 1fr 120px 100px 100px 110px 110px 32px" }}>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">{doc.nummer}</span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-sm">{contact}</p>
                    {doc.empfaenger.firma && doc.empfaenger.name && (
                      <p className="truncate text-xs text-muted-foreground">{doc.empfaenger.name}</p>
                    )}
                  </div>
                  <span className={`text-xs font-medium ${TYP_COLOR[doc.typ] ?? "text-muted-foreground"}`}>{TYP_LABEL[doc.typ]}</span>
                  <span className="text-xs text-muted-foreground">{fmtDate(doc.datum)}</span>
                  <span className={`text-xs ${isOverdue ? "text-red-600 font-semibold" : "text-muted-foreground"}`}>
                    {fmtDate(doc.faelligAm)}
                  </span>
                  <span className={`text-right font-semibold tabular-nums text-sm ${isOverdue ? "text-red-600" : ""}`}>
                    {fmt(doc.brutto)}
                  </span>
                  <div className="flex justify-end"><StatusBadge status={doc.status} /></div>
                  <div className="flex justify-end text-muted-foreground/40 hover:text-muted-foreground">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Summary footer */}
      {filtered.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>{filtered.length} Dokument{filtered.length !== 1 ? "e" : ""}</span>
          <span className="font-semibold tabular-nums">
            Gesamt: {fmt(filtered.reduce((s, d) => s + d.brutto, 0))}
          </span>
        </div>
      )}
    </AdminLayout>
  );
}
