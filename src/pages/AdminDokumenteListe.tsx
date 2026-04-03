import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { Dokument, DokumentTyp, DokumentStatus } from "@/types/dokumente";
import { Plus, FileText, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<DokumentStatus, { label: string; cls: string }> = {
  entwurf:          { label: "Entwurf",         cls: "bg-gray-100 text-gray-600" },
  gesendet:         { label: "Gesendet",         cls: "bg-blue-100 text-blue-700" },
  akzeptiert:       { label: "Akzeptiert",       cls: "bg-green-100 text-green-700" },
  abgelehnt:        { label: "Abgelehnt",        cls: "bg-red-100 text-red-700" },
  offen:            { label: "Offen",            cls: "bg-orange-100 text-orange-700" },
  teilbezahlt:      { label: "Teilbezahlt",      cls: "bg-yellow-100 text-yellow-700" },
  bezahlt:          { label: "Bezahlt",          cls: "bg-green-100 text-green-700" },
  ueberfaellig:     { label: "Überfällig",       cls: "bg-red-100 text-red-700" },
  storniert:        { label: "Storniert",        cls: "bg-gray-100 text-gray-400 line-through" },
};

function StatusBadge({ status }: { status: DokumentStatus }) {
  const cfg = STATUS_CONFIG[status] || { label: status, cls: "bg-gray-100 text-gray-600" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

// ── Typ label ─────────────────────────────────────────────────────────────────

const TYP_LABEL: Record<DokumentTyp, string> = {
  angebot: "Angebot",
  auftragsbestaetigung: "Auftragsb.",
  rechnung: "Rechnung",
  abschlagsrechnung: "Abschlagsrg.",
  mahnung: "Mahnung",
  gutschrift: "Gutschrift",
  stornorechnung: "Storno",
};

// ── Format helpers ─────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function fmtDate(s?: string) {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  } catch {
    return s;
  }
}

// ── Tab configuration ─────────────────────────────────────────────────────────

type Tab = "alle" | "angebote" | "rechnungen" | "auftragsbestaetigung";

const TABS: { id: Tab; label: string; path: string }[] = [
  { id: "alle",                label: "Alle",                  path: "/admin/dokumente" },
  { id: "angebote",            label: "Angebote",              path: "/admin/dokumente/angebote" },
  { id: "rechnungen",          label: "Rechnungen",            path: "/admin/dokumente/rechnungen" },
  { id: "auftragsbestaetigung",label: "Auftragsbestätigungen", path: "/admin/dokumente/auftragsbestaetigung" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminDokumenteListe() {
  const navigate = useNavigate();
  const location = useLocation();

  const [authChecked, setAuthChecked] = useState(false);
  const [dokumente, setDokumente] = useState<Dokument[]>([]);
  const [loading, setLoading] = useState(true);
  const [kennzahlen, setKennzahlen] = useState({
    offenBetrag: 0,
    ueberfaelligBetrag: 0,
    bezahltMonatBetrag: 0,
    offenAnzahl: 0,
  });

  // Determine active tab from URL
  const activeTab: Tab = (() => {
    if (location.pathname.includes("/angebote")) return "angebote";
    if (location.pathname.includes("/rechnungen")) return "rechnungen";
    if (location.pathname.includes("/auftragsbestaetigung")) return "auftragsbestaetigung";
    return "alle";
  })();

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [navigate]);

  // Load documents
  useEffect(() => {
    if (!authChecked) return;

    const typFilter: DokumentTyp | undefined =
      activeTab === "angebote" ? "angebot" :
      activeTab === "rechnungen" ? "rechnung" :
      activeTab === "auftragsbestaetigung" ? "auftragsbestaetigung" :
      undefined;

    setLoading(true);
    Promise.all([
      dokumenteService.getAll(typFilter ? { typ: typFilter } : undefined),
      dokumenteService.getKennzahlen(),
    ]).then(([docs, kz]) => {
      setDokumente(docs);
      setKennzahlen(kz);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [authChecked, activeTab]);

  const actions = (
    <div className="flex items-center gap-2">
      <Link
        to="/admin/dokumente/new?typ=angebot"
        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Neues Angebot
      </Link>
      <Link
        to="/admin/dokumente/new?typ=rechnung"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Plus className="w-4 h-4" />
        Neue Rechnung
      </Link>
    </div>
  );

  return (
    <AdminLayout title="Finanzen" subtitle="Angebote, Rechnungen & Auftragsbestätigungen" actions={actions}>
      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl border border-border/30 bg-muted/20 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Offen</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">{fmt(kennzahlen.offenBetrag)}</p>
          <p className="text-xs text-muted-foreground mt-1">{kennzahlen.offenAnzahl} Rechnung{kennzahlen.offenAnzahl !== 1 ? "en" : ""}</p>
        </div>

        <div className="rounded-2xl border border-border/30 bg-muted/20 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Überfällig</span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-red-600">{fmt(kennzahlen.ueberfaelligBetrag)}</p>
          <p className="text-xs text-muted-foreground mt-1">Fällig überschritten</p>
        </div>

        <div className="rounded-2xl border border-border/30 bg-muted/20 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Bezahlt (Monat)</span>
          </div>
          <p className="text-2xl font-bold tabular-nums text-green-700">{fmt(kennzahlen.bezahltMonatBetrag)}</p>
          <p className="text-xs text-muted-foreground mt-1">Diesen Monat eingegangen</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-border/20 pb-0">
        {TABS.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors ${
              activeTab === tab.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
        </div>
      ) : dokumente.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-medium">Keine Dokumente gefunden</p>
          <p className="text-sm text-muted-foreground mt-1">Erstelle dein erstes Dokument mit den Buttons oben rechts.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/30 overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid text-[10px] text-muted-foreground uppercase font-semibold tracking-wider px-4 py-2 bg-muted/20 border-b border-border/20"
            style={{ gridTemplateColumns: "100px 1fr 1fr 110px 110px 90px 100px" }}>
            <span>Nummer</span>
            <span>Kontakt</span>
            <span>Typ</span>
            <span>Datum</span>
            <span>Fällig</span>
            <span className="text-right">Betrag</span>
            <span className="text-right">Status</span>
          </div>

          {/* Rows */}
          {dokumente.map((doc) => {
            const today = new Date().toISOString().split("T")[0];
            const isOverdue = doc.faelligAm && doc.faelligAm < today && (doc.status === "offen" || doc.status === "gesendet");

            return (
              <button
                key={doc.id}
                onClick={() => navigate(`/admin/dokumente/${doc.id}`)}
                className="w-full text-left hover:bg-muted/20 transition-colors border-b border-border/10 last:border-0"
              >
                {/* Mobile layout */}
                <div className="md:hidden px-4 py-3 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{doc.nummer}</span>
                      <span className="text-xs text-muted-foreground">{TYP_LABEL[doc.typ]}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {doc.empfaenger.firma || doc.empfaenger.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {fmtDate(doc.datum)}
                      {doc.faelligAm && ` · Fällig ${fmtDate(doc.faelligAm)}`}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className={`text-sm font-bold tabular-nums ${isOverdue ? "text-red-600" : ""}`}>
                      {fmt(doc.brutto)}
                    </p>
                    <div className="mt-1">
                      <StatusBadge status={doc.status} />
                    </div>
                  </div>
                </div>

                {/* Desktop layout */}
                <div
                  className="hidden md:grid items-center px-4 py-3 text-sm gap-2"
                  style={{ gridTemplateColumns: "100px 1fr 1fr 110px 110px 90px 100px" }}
                >
                  <span className="font-mono text-xs font-semibold">{doc.nummer}</span>
                  <span className="truncate">{doc.empfaenger.firma || doc.empfaenger.name || "—"}</span>
                  <span className="text-muted-foreground text-xs">{TYP_LABEL[doc.typ]}</span>
                  <span className="text-muted-foreground text-xs">{fmtDate(doc.datum)}</span>
                  <span className={`text-xs ${isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
                    {fmtDate(doc.faelligAm)}
                  </span>
                  <span className={`text-right font-semibold tabular-nums text-sm ${isOverdue ? "text-red-600" : ""}`}>
                    {fmt(doc.brutto)}
                  </span>
                  <div className="flex justify-end">
                    <StatusBadge status={doc.status} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}
