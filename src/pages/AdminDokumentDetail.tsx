import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { Dokument, DokumentStatus, DokumentTyp, Zahlung } from "@/types/dokumente";
import {
  ArrowLeft, Pencil, Send, CheckCircle, XCircle, ArrowRight,
  Receipt, AlertTriangle, Plus, X, Clock, Trash2, Ban, MoreHorizontal,
} from "lucide-react";

const STATUS_CFG: Record<DokumentStatus, { label: string; cls: string; dot: string }> = {
  entwurf:     { label: "Entwurf",     cls: "bg-gray-100 text-gray-600",     dot: "bg-gray-400" },
  gesendet:    { label: "Gesendet",    cls: "bg-blue-100 text-blue-700",     dot: "bg-blue-500" },
  akzeptiert:  { label: "Akzeptiert",  cls: "bg-green-100 text-green-700",   dot: "bg-green-500" },
  abgelehnt:   { label: "Abgelehnt",  cls: "bg-red-100 text-red-600",       dot: "bg-red-500" },
  offen:       { label: "Offen",       cls: "bg-amber-100 text-amber-700",   dot: "bg-amber-500" },
  teilbezahlt: { label: "Teilbezahlt", cls: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
  bezahlt:     { label: "Bezahlt",     cls: "bg-green-100 text-green-700",   dot: "bg-green-500" },
  ueberfaellig:{ label: "Überfällig",  cls: "bg-red-100 text-red-600",       dot: "bg-red-500" },
  storniert:   { label: "Storniert",   cls: "bg-muted/40 text-muted-foreground", dot: "bg-gray-300" },
};

const TYP_LABEL: Record<DokumentTyp, string> = {
  angebot:              "Angebot",
  auftragsbestaetigung: "Auftragsbestätigung",
  rechnung:             "Rechnung",
  abschlagsrechnung:    "Abschlagsrechnung",
  mahnung:              "Mahnung",
  gutschrift:           "Gutschrift",
  stornorechnung:       "Stornorechnung",
};

const ZAHLUNGSART_LABEL: Record<Zahlung["zahlungsart"], string> = {
  ueberweisung: "Überweisung",
  bar:          "Bar",
  paypal:       "PayPal",
  karte:        "Kartenzahlung",
  sonstiges:    "Sonstiges",
};

const WORKFLOW_STEPS: DokumentTyp[] = ["angebot", "auftragsbestaetigung", "rechnung", "mahnung"];
const WORKFLOW: Partial<Record<DokumentTyp, DokumentTyp>> = {
  angebot:              "auftragsbestaetigung",
  auftragsbestaetigung: "rechnung",
  rechnung:             "mahnung",
};

function fmt(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function fmtDate(s?: string) {
  if (!s) return "–";
  return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ── Workflow Stepper ──────────────────────────────────────────────────────────
function WorkflowStepper({ currentTyp, folgeTyp }: { currentTyp: DokumentTyp; folgeTyp?: DokumentTyp }) {
  const steps = WORKFLOW_STEPS.filter(s => TYP_LABEL[s]);
  const currentIdx = steps.indexOf(currentTyp);
  if (currentIdx === -1) return null;

  return (
    <div className="flex items-center gap-0 px-6 py-3 bg-muted/5 border-b border-border/10">
      {steps.map((step, i) => {
        const isDone = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture = i > currentIdx;
        return (
          <div key={step} className="flex items-center">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isCurrent ? "bg-foreground text-background" :
              isDone    ? "text-green-700" :
              "text-muted-foreground/50"
            }`}>
              {isDone && <CheckCircle className="w-3 h-3" />}
              {isCurrent && <div className="w-2 h-2 rounded-full bg-current opacity-70" />}
              {TYP_LABEL[step]}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 h-px mx-1 ${isDone || isCurrent ? "bg-foreground/30" : "bg-border/30"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AdminDokumentDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [authChecked, setAuthChecked] = useState(false);
  const [doc, setDoc] = useState<Dokument | null>(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [zahlungPanel, setZahlungPanel] = useState(false);
  const [zahlungForm, setZahlungForm] = useState({
    datum: new Date().toISOString().split("T")[0],
    betrag: 0,
    zahlungsart: "ueberweisung" as Zahlung["zahlungsart"],
    notiz: "",
  });
  const [zahlungSaving, setZahlungSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    const d = await dokumenteService.getById(id);
    setDoc(d);
    setLoading(false);
  };

  useEffect(() => { if (authChecked) load(); }, [authChecked, id]);

  const handleStatusChange = async (status: DokumentStatus) => {
    if (!id) return;
    setStatusChanging(true);
    try { await dokumenteService.setStatus(id, status); await load(); }
    finally { setStatusChanging(false); }
  };

  const handleConvert = async () => {
    if (!doc || !id) return;
    const zielTyp = WORKFLOW[doc.typ];
    if (!zielTyp) return;
    if (!confirm(`${TYP_LABEL[doc.typ]} in ${TYP_LABEL[zielTyp]} umwandeln?`)) return;
    setConverting(true);
    try { const neu = await dokumenteService.umwandeln(id, zielTyp); navigate(`/admin/dokumente/${neu.id}`); }
    finally { setConverting(false); }
  };

  const handleStornieren = async () => {
    if (!id || !doc) return;
    if (!confirm(`${TYP_LABEL[doc.typ]} ${doc.nummer} stornieren?\n\nDas Dokument bleibt gespeichert, wird aber als "Storniert" markiert.`)) return;
    setStatusChanging(true);
    setMoreMenuOpen(false);
    try { await dokumenteService.setStatus(id, "storniert"); await load(); }
    finally { setStatusChanging(false); }
  };

  const handleDelete = async () => {
    if (!id || !doc) return;
    if (!confirm(`${TYP_LABEL[doc.typ]} ${doc.nummer} unwiderruflich löschen?\n\nAlle Positionen und Zahlungen werden ebenfalls gelöscht.`)) return;
    setDeleting(true);
    setMoreMenuOpen(false);
    try {
      await dokumenteService.delete(id);
      navigate("/admin/dokumente");
    } catch (e: unknown) {
      alert("Fehler beim Löschen: " + ((e as any)?.message || String(e)));
      setDeleting(false);
    }
  };

  const handleZahlungSave = async () => {
    if (!id || zahlungForm.betrag <= 0) return;
    setZahlungSaving(true);
    try {
      await dokumenteService.zahlungErfassen(id, zahlungForm);
      setZahlungPanel(false);
      setZahlungForm({ datum: new Date().toISOString().split("T")[0], betrag: 0, zahlungsart: "ueberweisung", notiz: "" });
      await load();
    } finally { setZahlungSaving(false); }
  };

  const inputCls = "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
  const labelCls = "text-xs text-muted-foreground mb-1 block";

  if (!authChecked) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-muted-foreground">
        <p className="mb-4 font-medium">Dokument nicht gefunden.</p>
        <button onClick={() => navigate("/admin/dokumente")} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  const typLabel = TYP_LABEL[doc.typ] ?? doc.typ;
  const statusCfg = STATUS_CFG[doc.status] ?? { label: doc.status, cls: "bg-gray-100 text-gray-500", dot: "bg-gray-400" };
  const nextTyp = WORKFLOW[doc.typ];
  const today = new Date().toISOString().split("T")[0];
  const isOverdue = doc.faelligAm && doc.faelligAm < today && (doc.status === "offen" || doc.status === "gesendet");
  const payPct = doc.brutto > 0 ? Math.min(100, Math.round((doc.bezahltBetrag / doc.brutto) * 100)) : 0;

  return (
    <div className="flex flex-col bg-background min-h-screen">

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/admin/dokumente")} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold leading-tight">{typLabel}</h1>
                <span className="text-sm text-muted-foreground font-mono">{doc.nummer}</span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.cls}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                  {statusCfg.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {doc.empfaenger.firma ? `${doc.empfaenger.firma} · ` : ""}{doc.empfaenger.name}
                {isOverdue && <span className="ml-2 text-red-600 font-medium">· Überfällig seit {fmtDate(doc.faelligAm)}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status actions */}
            {doc.status === "entwurf" && (
              <button onClick={() => handleStatusChange("gesendet")} disabled={statusChanging}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60 transition-colors disabled:opacity-50">
                <Send className="w-3.5 h-3.5" />
                Als gesendet markieren
              </button>
            )}
            {doc.typ === "angebot" && (doc.status === "gesendet" || doc.status === "entwurf") && (
              <>
                <button onClick={() => handleStatusChange("akzeptiert")} disabled={statusChanging}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-green-200 text-green-700 text-sm hover:bg-green-50 disabled:opacity-50">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Akzeptiert
                </button>
                <button onClick={() => handleStatusChange("abgelehnt")} disabled={statusChanging}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 disabled:opacity-50">
                  <XCircle className="w-3.5 h-3.5" />
                  Abgelehnt
                </button>
              </>
            )}
            {nextTyp && !doc.folgedokumentId && (
              <button onClick={handleConvert} disabled={converting}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50">
                <ArrowRight className="w-3.5 h-3.5" />
                {converting ? "Wandle um…" : `→ ${TYP_LABEL[nextTyp]}`}
              </button>
            )}
            <button onClick={() => navigate(`/admin/dokumente/${doc.id}/bearbeiten`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60 transition-colors">
              <Pencil className="w-3.5 h-3.5" />
              Bearbeiten
            </button>

            {/* ── Mehr-Menü ── */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen((v) => !v)}
                disabled={deleting || statusChanging}
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-40"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {moreMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setMoreMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1.5 z-40 w-52 bg-background border border-border/30 rounded-2xl shadow-xl overflow-hidden">
                    {/* Stornieren – nur wenn noch nicht storniert */}
                    {doc.status !== "storniert" && (
                      <button
                        onClick={handleStornieren}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors text-left"
                      >
                        <Ban className="w-4 h-4 shrink-0" />
                        <div>
                          <p className="font-medium">Stornieren</p>
                          <p className="text-[10px] text-amber-600/70 mt-0.5">Status → Storniert</p>
                        </div>
                      </button>
                    )}
                    <div className="border-t border-border/10" />
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" />
                      <div>
                        <p className="font-medium">{deleting ? "Löschen…" : "Endgültig löschen"}</p>
                        <p className="text-[10px] text-red-500/70 mt-0.5">Nicht wiederherstellbar</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Workflow stepper */}
        <WorkflowStepper currentTyp={doc.typ} />

        {/* Workflow chain links */}
        {(doc.quelldokumentId || doc.folgedokumentId) && (
          <div className="px-6 py-1.5 bg-muted/5 border-t border-border/10 flex items-center gap-3 text-xs text-muted-foreground">
            {doc.quelldokumentId && (
              <button onClick={() => navigate(`/admin/dokumente/${doc.quelldokumentId}`)}
                className="hover:text-foreground transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> {doc.quelldokumentNummer}
              </button>
            )}
            {doc.quelldokumentId && doc.folgedokumentId && <span>·</span>}
            {doc.folgedokumentId && (
              <button onClick={() => navigate(`/admin/dokumente/${doc.folgedokumentId}`)}
                className="hover:text-foreground transition-colors flex items-center gap-1">
                {doc.folgedokumentTyp ? TYP_LABEL[doc.folgedokumentTyp] : "Folgedokument"}
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-6 space-y-6">

        {/* Überfällig banner */}
        {isOverdue && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Rechnung ist überfällig</p>
              <p className="text-xs text-red-700">Fällig war: {fmtDate(doc.faelligAm)}</p>
            </div>
            {nextTyp && !doc.folgedokumentId && (
              <button onClick={handleConvert} disabled={converting}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-xs font-medium hover:bg-red-700 disabled:opacity-50">
                Mahnung erstellen
              </button>
            )}
          </div>
        )}

        {/* Key info row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Datum", value: fmtDate(doc.datum), icon: Clock },
            { label: doc.typ === "angebot" ? "Gültig bis" : "Fällig am", value: fmtDate(doc.gueltigBis || doc.faelligAm), icon: Clock },
            { label: "Zahlungsziel", value: doc.zahlungszielTage + " Tage", icon: Clock },
            { label: "Lieferdatum", value: fmtDate(doc.lieferdatum), icon: Clock },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-muted/10 border border-border/10 px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border/20 bg-muted/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empfänger</p>
            {doc.empfaenger.firma && <p className="font-semibold text-sm">{doc.empfaenger.firma}</p>}
            <p className="text-sm">{doc.empfaenger.name}</p>
            <p className="text-sm text-muted-foreground">{doc.empfaenger.adresse}</p>
            <p className="text-sm text-muted-foreground">{doc.empfaenger.plz} {doc.empfaenger.ort}</p>
          </div>
          <div className="rounded-2xl border border-border/20 bg-muted/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Von</p>
            <p className="font-semibold text-sm">{doc.absender.name}</p>
            <p className="text-sm text-muted-foreground">{doc.absender.adresse}</p>
            <p className="text-sm text-muted-foreground">{doc.absender.plz} {doc.absender.ort}</p>
            {doc.absender.email && <p className="text-sm text-muted-foreground">{doc.absender.email}</p>}
            {doc.absender.iban && (
              <p className="text-xs text-muted-foreground mt-2 font-mono">IBAN: {doc.absender.iban}</p>
            )}
            {doc.absender.kleinunternehmer && (
              <p className="text-xs text-muted-foreground mt-1 italic">§ 19 UStG – Kleinunternehmer</p>
            )}
          </div>
        </div>

        {/* Kopftext */}
        {doc.kopftext && (
          <div className="rounded-2xl border border-border/20 bg-muted/5 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Anschreiben</p>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{doc.kopftext}</p>
          </div>
        )}

        {/* Positions table */}
        <div className="rounded-2xl border border-border/20 overflow-hidden">
          <div className="px-5 py-3 bg-muted/10 border-b border-border/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Positionen</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/10">
                <th className="text-left px-5 py-2.5 text-xs text-muted-foreground font-medium">Leistung</th>
                <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">Menge</th>
                <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium hidden sm:table-cell">Einzelpreis</th>
                <th className="text-right px-5 py-2.5 text-xs text-muted-foreground font-medium">Gesamt</th>
              </tr>
            </thead>
            <tbody>
              {doc.positionen.map((pos, i) => (
                <tr key={pos.id} className={`border-b border-border/10 ${i % 2 === 1 ? "bg-muted/5" : ""}`}>
                  <td className="px-5 py-3">
                    <p className="font-medium">{pos.bezeichnung}</p>
                    {pos.beschreibung && <p className="text-xs text-muted-foreground mt-0.5">{pos.beschreibung}</p>}
                    {pos.mwstSatz > 0 && <p className="text-xs text-muted-foreground/60 mt-0.5">{pos.mwstSatz}% MwSt.</p>}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell tabular-nums text-xs">
                    {pos.menge} {pos.einheit}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell tabular-nums">
                    {fmt(pos.einzelpreis)}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold tabular-nums">
                    {fmt(pos.gesamt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summen */}
          <div className="border-t border-border/20 px-5 py-4 flex justify-end bg-muted/5">
            <div className="space-y-1.5 text-sm min-w-56">
              <div className="flex justify-between gap-10">
                <span className="text-muted-foreground">Nettobetrag</span>
                <span className="tabular-nums">{fmt(doc.netto)}</span>
              </div>
              {doc.rabattBetrag && doc.rabattBetrag > 0 && (
                <div className="flex justify-between gap-10">
                  <span className="text-muted-foreground">Rabatt {doc.rabattProzent}%</span>
                  <span className="tabular-nums text-green-600">−{fmt(doc.rabattBetrag)}</span>
                </div>
              )}
              {doc.mwstGruppen.filter(g => g.satz > 0).map((g) => (
                <div key={g.satz} className="flex justify-between gap-10">
                  <span className="text-muted-foreground">MwSt. {g.satz}%</span>
                  <span className="tabular-nums">{fmt(g.steuer)}</span>
                </div>
              ))}
              {doc.mwstBetrag === 0 && doc.netto > 0 && (
                <p className="text-xs text-muted-foreground italic">Gem. § 19 UStG – keine MwSt.</p>
              )}
              <div className="flex justify-between gap-10 font-bold text-base border-t border-border/30 pt-2 mt-2">
                <span>Gesamtbetrag</span>
                <span className="tabular-nums">{fmt(doc.brutto)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fusstext */}
        {doc.fusstext && (
          <div className="rounded-2xl border border-border/20 bg-muted/5 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Fußtext</p>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{doc.fusstext}</p>
          </div>
        )}

        {/* Zahlungen — only for Rechnungen */}
        {(doc.typ === "rechnung" || doc.typ === "abschlagsrechnung" || doc.typ === "mahnung") && (
          <div className="rounded-2xl border border-border/20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-muted/5 border-b border-border/10">
              <div>
                <p className="text-sm font-semibold">Zahlungseingang</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Offen: <span className={doc.offenerBetrag > 0 ? "text-amber-700 font-semibold" : "text-green-700 font-semibold"}>{fmt(doc.offenerBetrag)}</span>
                  {" · "}Bezahlt: <span className="font-semibold">{fmt(doc.bezahltBetrag)}</span>
                </p>
              </div>
              <button
                onClick={() => { setZahlungForm(f => ({ ...f, betrag: doc.offenerBetrag })); setZahlungPanel(true); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90"
              >
                <Plus className="w-3.5 h-3.5" />
                Zahlung erfassen
              </button>
            </div>

            {/* Progress bar */}
            {doc.brutto > 0 && (
              <div className="px-5 pt-3 pb-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{payPct}% bezahlt</span>
                  <span className="font-medium">{fmt(doc.bezahltBetrag)} von {fmt(doc.brutto)}</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${payPct >= 100 ? "bg-green-500" : "bg-amber-500"}`}
                    style={{ width: `${payPct}%` }}
                  />
                </div>
              </div>
            )}

            {doc.zahlungen.length === 0 ? (
              <div className="px-5 py-6 text-center">
                <Receipt className="w-8 h-8 mx-auto mb-2 text-muted-foreground/20" />
                <p className="text-sm text-muted-foreground">Noch keine Zahlungen erfasst</p>
              </div>
            ) : (
              <table className="w-full text-sm mt-2">
                <tbody>
                  {doc.zahlungen.map((z) => (
                    <tr key={z.id} className="border-t border-border/10">
                      <td className="px-5 py-3 text-muted-foreground text-xs">{fmtDate(z.datum)}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{ZAHLUNGSART_LABEL[z.zahlungsart]}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs truncate max-w-32">{z.notiz || ""}</td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums text-green-700">+{fmt(z.betrag)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Internal notes */}
        {doc.notizen && (
          <div className="rounded-2xl border border-border/20 bg-muted/5 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Interne Notizen</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{doc.notizen}</p>
          </div>
        )}

        <div className="h-10" />
      </div>

      {/* ── ZAHLUNG PANEL ── */}
      {zahlungPanel && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={() => setZahlungPanel(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 bg-background rounded-2xl border border-border/20 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
              <h2 className="font-semibold text-sm">Zahlung erfassen</h2>
              <button onClick={() => setZahlungPanel(false)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Datum</label>
                  <input type="date" value={zahlungForm.datum} onChange={(e) => setZahlungForm(f => ({ ...f, datum: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Betrag (€)</label>
                  <input type="number" step="0.01" value={zahlungForm.betrag || ""} onChange={(e) => setZahlungForm(f => ({ ...f, betrag: parseFloat(e.target.value) || 0 }))} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Zahlungsart</label>
                <select value={zahlungForm.zahlungsart} onChange={(e) => setZahlungForm(f => ({ ...f, zahlungsart: e.target.value as Zahlung["zahlungsart"] }))} className={inputCls}>
                  {Object.entries(ZAHLUNGSART_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Notiz (optional)</label>
                <input value={zahlungForm.notiz} onChange={(e) => setZahlungForm(f => ({ ...f, notiz: e.target.value }))} className={inputCls} placeholder="Referenz, Buchungsnummer…" />
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-2">
              <button onClick={() => setZahlungPanel(false)} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">Abbrechen</button>
              <button onClick={handleZahlungSave} disabled={zahlungSaving || zahlungForm.betrag <= 0}
                className="flex-1 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50">
                {zahlungSaving ? "Speichere…" : `${fmt(zahlungForm.betrag)} erfassen`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
