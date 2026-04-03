import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { Dokument, DokumentStatus, DokumentTyp, Zahlung } from "@/types/dokumente";
import {
  ArrowLeft, Pencil, Send, CheckCircle, XCircle, ArrowRight,
  Receipt, AlertTriangle, Plus, X,
} from "lucide-react";

// ── Status badge ──────────────────────────────────────────────────────────────

const STATUS_CFG: Record<DokumentStatus, { label: string; cls: string }> = {
  entwurf:     { label: "Entwurf",      cls: "bg-gray-100 text-gray-500" },
  gesendet:    { label: "Gesendet",     cls: "bg-blue-100 text-blue-700" },
  akzeptiert:  { label: "Akzeptiert",   cls: "bg-green-100 text-green-700" },
  abgelehnt:   { label: "Abgelehnt",    cls: "bg-red-100 text-red-600" },
  offen:       { label: "Offen",        cls: "bg-amber-100 text-amber-700" },
  teilbezahlt: { label: "Teilbezahlt",  cls: "bg-indigo-100 text-indigo-700" },
  bezahlt:     { label: "Bezahlt",      cls: "bg-green-100 text-green-700" },
  ueberfaellig:{ label: "Überfällig",   cls: "bg-red-100 text-red-600" },
  storniert:   { label: "Storniert",    cls: "bg-muted/40 text-muted-foreground" },
};

const TYP_LABEL: Record<DokumentTyp, string> = {
  angebot:             "Angebot",
  auftragsbestaetigung: "Auftragsbestätigung",
  rechnung:            "Rechnung",
  abschlagsrechnung:   "Abschlagsrechnung",
  mahnung:             "Mahnung",
  gutschrift:          "Gutschrift",
  stornorechnung:      "Stornorechnung",
};

const ZAHLUNGSART_LABEL: Record<Zahlung["zahlungsart"], string> = {
  ueberweisung: "Überweisung",
  bar:          "Bar",
  paypal:       "PayPal",
  karte:        "Karte",
  sonstiges:    "Sonstiges",
};

function fmt(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function fmtDate(s?: string) {
  if (!s) return "–";
  return new Date(s).toLocaleDateString("de-DE");
}

// ── Workflow transitions ──────────────────────────────────────────────────────

const WORKFLOW: Partial<Record<DokumentTyp, DokumentTyp>> = {
  angebot:             "auftragsbestaetigung",
  auftragsbestaetigung: "rechnung",
  rechnung:            "mahnung",
};

// ── Main ──────────────────────────────────────────────────────────────────────

export default function AdminDokumentDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [authChecked, setAuthChecked] = useState(false);
  const [doc, setDoc] = useState<Dokument | null>(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);

  // Zahlung panel
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
    try {
      await dokumenteService.setStatus(id, status);
      await load();
    } finally { setStatusChanging(false); }
  };

  const handleConvert = async () => {
    if (!doc || !id) return;
    const zielTyp = WORKFLOW[doc.typ];
    if (!zielTyp) return;
    if (!confirm(`${TYP_LABEL[doc.typ]} in ${TYP_LABEL[zielTyp]} umwandeln?`)) return;
    setConverting(true);
    try {
      const neu = await dokumenteService.umwandeln(id, zielTyp);
      navigate(`/admin/dokumente/${neu.id}`);
    } finally { setConverting(false); }
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
        <p className="mb-4">Dokument nicht gefunden.</p>
        <button onClick={() => navigate("/admin/dokumente")} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  const typLabel = TYP_LABEL[doc.typ] ?? doc.typ;
  const statusCfg = STATUS_CFG[doc.status] ?? { label: doc.status, cls: "bg-gray-100 text-gray-500" };
  const nextTyp = WORKFLOW[doc.typ];

  return (
    <div className="flex flex-col bg-background min-h-screen">

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 border-b border-border/20 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin/dokumente")} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold">{typLabel} {doc.nummer}</h1>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.cls}`}>{statusCfg.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{doc.empfaenger.name}{doc.empfaenger.firma ? ` · ${doc.empfaenger.firma}` : ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Status quick-actions */}
          {doc.status === "entwurf" && (
            <button onClick={() => handleStatusChange("gesendet")} disabled={statusChanging} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60 transition-colors disabled:opacity-50">
              <Send className="w-3.5 h-3.5" />
              Als gesendet markieren
            </button>
          )}
          {(doc.typ === "angebot" && doc.status === "gesendet") && (
            <>
              <button onClick={() => handleStatusChange("akzeptiert")} disabled={statusChanging} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-green-200 text-green-700 text-sm hover:bg-green-50 disabled:opacity-50">
                <CheckCircle className="w-3.5 h-3.5" />
                Akzeptiert
              </button>
              <button onClick={() => handleStatusChange("abgelehnt")} disabled={statusChanging} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-red-200 text-red-600 text-sm hover:bg-red-50 disabled:opacity-50">
                <XCircle className="w-3.5 h-3.5" />
                Abgelehnt
              </button>
            </>
          )}
          {/* Workflow conversion button */}
          {nextTyp && !doc.folgedokumentId && (
            <button onClick={handleConvert} disabled={converting} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50">
              <ArrowRight className="w-4 h-4" />
              {converting ? "Wandle um…" : `→ ${TYP_LABEL[nextTyp]}`}
            </button>
          )}
          {/* Edit button */}
          <button onClick={() => navigate(`/admin/dokumente/${doc.id}/bearbeiten`)} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
            Bearbeiten
          </button>
        </div>
      </div>

      {/* ── WORKFLOW CHAIN ── */}
      {(doc.quelldokumentId || doc.folgedokumentId) && (
        <div className="px-6 py-2 bg-muted/10 border-b border-border/10 flex items-center gap-3 text-xs text-muted-foreground">
          {doc.quelldokumentId && (
            <button onClick={() => navigate(`/admin/dokumente/${doc.quelldokumentId}`)} className="hover:text-foreground transition-colors">
              ← {doc.quelldokumentNummer}
            </button>
          )}
          {doc.quelldokumentId && doc.folgedokumentId && <span className="text-border">·</span>}
          {doc.folgedokumentId && (
            <button onClick={() => navigate(`/admin/dokumente/${doc.folgedokumentId}`)} className="hover:text-foreground transition-colors">
              {doc.folgedokumentTyp ? TYP_LABEL[doc.folgedokumentTyp] : "Folgedokument"} →
            </button>
          )}
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 space-y-8">

        {/* Header info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Datum", value: fmtDate(doc.datum) },
            { label: doc.typ === "angebot" ? "Gültig bis" : "Fällig am", value: fmtDate(doc.gueltigBis || doc.faelligAm) },
            { label: "Zahlungsziel", value: doc.zahlungszielTage + " Tage" },
            { label: "Lieferdatum", value: fmtDate(doc.lieferdatum) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-muted/10 border border-border/10 px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>

        {/* Empfänger + Absender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/20 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empfänger</h3>
            {doc.empfaenger.firma && <p className="font-semibold text-sm">{doc.empfaenger.firma}</p>}
            <p className="text-sm">{doc.empfaenger.name}</p>
            <p className="text-sm text-muted-foreground">{doc.empfaenger.adresse}</p>
            <p className="text-sm text-muted-foreground">{doc.empfaenger.plz} {doc.empfaenger.ort}</p>
            <p className="text-sm text-muted-foreground">{doc.empfaenger.land}</p>
          </div>
          <div className="rounded-2xl border border-border/20 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Absender</h3>
            {doc.absender.firma && <p className="font-semibold text-sm">{doc.absender.firma}</p>}
            <p className="text-sm">{doc.absender.name}</p>
            <p className="text-sm text-muted-foreground">{doc.absender.adresse}</p>
            <p className="text-sm text-muted-foreground">{doc.absender.plz} {doc.absender.ort}</p>
            {doc.absender.email && <p className="text-sm text-muted-foreground">{doc.absender.email}</p>}
            {doc.absender.kleinunternehmer && <p className="text-xs text-muted-foreground mt-1">§ 19 UStG – Kleinunternehmer</p>}
          </div>
        </div>

        {/* Kopftext */}
        {doc.kopftext && (
          <div className="rounded-2xl border border-border/20 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Anschreiben</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{doc.kopftext}</p>
          </div>
        )}

        {/* Positionen */}
        <div className="rounded-2xl border border-border/20 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/10 border-b border-border/20">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Leistung</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Menge</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Einzelpreis</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Gesamt</th>
              </tr>
            </thead>
            <tbody>
              {doc.positionen.map((pos) => (
                <tr key={pos.id} className="border-b border-border/10">
                  <td className="px-5 py-3">
                    <p className="font-medium">{pos.bezeichnung}</p>
                    {pos.beschreibung && <p className="text-xs text-muted-foreground mt-0.5">{pos.beschreibung}</p>}
                    {pos.mwstSatz > 0 && <p className="text-xs text-muted-foreground mt-0.5">{pos.mwstSatz}% MwSt.</p>}
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground hidden sm:table-cell tabular-nums">
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
          <div className="border-t border-border/20 px-5 py-4 flex justify-end">
            <div className="space-y-1.5 text-sm min-w-52">
              <div className="flex justify-between gap-8">
                <span className="text-muted-foreground">Nettobetrag</span>
                <span className="tabular-nums">{fmt(doc.netto)}</span>
              </div>
              {doc.rabattBetrag && doc.rabattBetrag > 0 && (
                <div className="flex justify-between gap-8">
                  <span className="text-muted-foreground">Rabatt {doc.rabattProzent}%</span>
                  <span className="tabular-nums text-green-600">−{fmt(doc.rabattBetrag)}</span>
                </div>
              )}
              {doc.mwstGruppen.filter(g => g.satz > 0).map((g) => (
                <div key={g.satz} className="flex justify-between gap-8">
                  <span className="text-muted-foreground">MwSt. {g.satz}%</span>
                  <span className="tabular-nums">{fmt(g.steuer)}</span>
                </div>
              ))}
              {doc.mwstBetrag === 0 && (
                <p className="text-xs text-muted-foreground italic">Gem. § 19 UStG keine MwSt.</p>
              )}
              <div className="flex justify-between gap-8 font-bold text-base border-t border-border/30 pt-2 mt-2">
                <span>Gesamtbetrag</span>
                <span className="tabular-nums">{fmt(doc.brutto)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fusstext */}
        {doc.fusstext && (
          <div className="rounded-2xl border border-border/20 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Fußtext</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{doc.fusstext}</p>
          </div>
        )}

        {/* Zahlungen (only for Rechnung / Abschlagsrechnung) */}
        {(doc.typ === "rechnung" || doc.typ === "abschlagsrechnung") && (
          <div className="rounded-2xl border border-border/20 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
              <div>
                <h3 className="text-sm font-semibold">Zahlungen</h3>
                <p className="text-xs text-muted-foreground">
                  Bezahlt: {fmt(doc.bezahltBetrag)} · Offen: {fmt(doc.offenerBetrag)}
                </p>
              </div>
              <button
                onClick={() => { setZahlungForm(f => ({ ...f, betrag: doc.offenerBetrag })); setZahlungPanel(true); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-foreground text-background text-xs font-medium hover:opacity-90"
              >
                <Plus className="w-3.5 h-3.5" />
                Zahlung erfassen
              </button>
            </div>

            {doc.zahlungen.length === 0 ? (
              <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                <Receipt className="w-8 h-8 mx-auto mb-2 opacity-30" />
                Noch keine Zahlungen erfasst
              </div>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {doc.zahlungen.map((z) => (
                    <tr key={z.id} className="border-b border-border/10">
                      <td className="px-5 py-3 text-muted-foreground">{fmtDate(z.datum)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ZAHLUNGSART_LABEL[z.zahlungsart]}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{z.notiz || ""}</td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums text-green-700">{fmt(z.betrag)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Progress bar */}
            {doc.brutto > 0 && (
              <div className="px-5 py-3 border-t border-border/10">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Bezahlt</span>
                  <span>{Math.round((doc.bezahltBetrag / doc.brutto) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{ width: `${Math.min(100, (doc.bezahltBetrag / doc.brutto) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mahnung warning */}
        {doc.typ === "rechnung" && doc.status === "ueberfaellig" && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Rechnung überfällig</p>
              <p className="text-xs text-amber-700">Du kannst direkt eine Mahnung erstellen.</p>
            </div>
            <button
              onClick={handleConvert}
              disabled={converting || !!doc.folgedokumentId}
              className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 disabled:opacity-50"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Mahnung erstellen
            </button>
          </div>
        )}

        {/* Notizen */}
        {doc.notizen && (
          <div className="rounded-2xl border border-border/20 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Interne Notizen</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{doc.notizen}</p>
          </div>
        )}

        <div className="h-8" />
      </div>

      {/* ── ZAHLUNG PANEL ── */}
      {zahlungPanel && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setZahlungPanel(false)} />
          <div className="fixed bottom-0 left-0 right-0 md:right-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50 bg-background rounded-t-2xl md:rounded-2xl md:bottom-auto md:top-1/2 md:-translate-y-1/2 border border-border/20 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20">
              <h2 className="font-semibold text-sm">Zahlung erfassen</h2>
              <button onClick={() => setZahlungPanel(false)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground"><X className="w-4 h-4" /></button>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Datum</label>
                  <input type="date" value={zahlungForm.datum} onChange={(e) => setZahlungForm(f => ({ ...f, datum: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Betrag (€)</label>
                  <input type="number" step="0.01" value={zahlungForm.betrag} onChange={(e) => setZahlungForm(f => ({ ...f, betrag: parseFloat(e.target.value) || 0 }))} className={inputCls} />
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
                <input value={zahlungForm.notiz} onChange={(e) => setZahlungForm(f => ({ ...f, notiz: e.target.value }))} className={inputCls} placeholder="z.B. Referenz, Buchungsnummer…" />
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-2">
              <button onClick={() => setZahlungPanel(false)} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">Abbrechen</button>
              <button onClick={handleZahlungSave} disabled={zahlungSaving || zahlungForm.betrag <= 0} className="flex-1 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 disabled:opacity-50">
                {zahlungSaving ? "Speichere…" : `${fmt(zahlungForm.betrag)} erfassen`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
