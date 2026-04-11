import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { Dokument, DokumentStatus, DokumentTyp, Zahlung } from "@/types/dokumente";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  ArrowLeft, Pencil, Send, CheckCircle, XCircle, ArrowRight,
  Receipt, AlertTriangle, Plus, X, Clock, Trash2, Ban, MoreHorizontal,
  Download, Globe, Mail, Loader2, Search, FileText, Calculator, ChevronUp, ChevronDown,
} from "lucide-react";

interface EmailSearchCustomer { id: string; name: string | null; email: string | null; company?: string | null; }

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
  schlussrechnung:      "Schlussrechnung",
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

const WORKFLOW_STEPS: DokumentTyp[] = ["angebot", "auftragsbestaetigung", "abschlagsrechnung", "rechnung", "mahnung"];

// Mögliche Folgedokument-Typen pro Dokumenttyp
const WORKFLOW_OPTIONS: Partial<Record<DokumentTyp, { typ: DokumentTyp; label: string }[]>> = {
  angebot:              [{ typ: "auftragsbestaetigung", label: "Auftragsbestätigung" }],
  auftragsbestaetigung: [
    { typ: "abschlagsrechnung", label: "Abschlagsrechnung" },
    { typ: "rechnung", label: "Schlussrechnung" },
  ],
  abschlagsrechnung:    [
    { typ: "abschlagsrechnung", label: "Weitere Abschlagsrechnung" },
    { typ: "rechnung", label: "Schlussrechnung" },
  ],
  rechnung:             [{ typ: "mahnung", label: "Mahnung" }],
};

// Legacy: erster Eintrag als Standard-Workflow
const WORKFLOW: Partial<Record<DokumentTyp, DokumentTyp>> = {
  angebot:              "auftragsbestaetigung",
  auftragsbestaetigung: "rechnung",
  abschlagsrechnung:    "rechnung",
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
  const [searchParams] = useSearchParams();

  const [authChecked, setAuthChecked] = useState(false);
  const [doc, setDoc] = useState<Dokument | null>(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [statusChanging, setStatusChanging] = useState(false);

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const [deleting, setDeleting] = useState(false);

  // Abschlagsrechnung modal
  const [showAbschlagDialog, setShowAbschlagDialog] = useState(false);
  const [abschlagMode, setAbschlagMode] = useState<"prozent" | "fix">("prozent");
  const [abschlagWert, setAbschlagWert] = useState("50");
  const [abschlagCreating, setAbschlagCreating] = useState(false);
  const [abschlagShowCalc, setAbschlagShowCalc] = useState(false);
  const [abschlagCalcExpr, setAbschlagCalcExpr] = useState("");
  const [angebotPositionen, setAngebotPositionen] = useState<{ bezeichnung: string; gesamt: number }[]>([]);

  const [sendPanel, setSendPanel] = useState(false);
  const sendPanelAutoOpened = useRef(false); // verhindert Re-Open nach load()
  const [sendLoading, setSendLoading] = useState<"download" | "portal" | "email" | null>(null);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendMsg, setSendMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Customer email search for send panel
  const [emailSearchQuery, setEmailSearchQuery] = useState("");
  const [emailSearchResults, setEmailSearchResults] = useState<EmailSearchCustomer[]>([]);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const emailDropdownRef = useRef<HTMLDivElement>(null);

  const [zahlungPanel, setZahlungPanel] = useState(false);
  const [zahlungForm, setZahlungForm] = useState({
    datum: new Date().toISOString().split("T")[0],
    betrag: 0,
    zahlungsart: "ueberweisung" as Zahlung["zahlungsart"],
    notiz: "",
  });
  const [zahlungSaving, setZahlungSaving] = useState(false);

  // Close more-menu on click outside
  useEffect(() => {
    if (!moreMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreMenuOpen]);

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

  // Load positions when Abschlag dialog opens
  useEffect(() => {
    if (!showAbschlagDialog || !doc) return;
    const loadPositions = async () => {
      const { data: pos } = await supabase
        .from("document_positions")
        .select("*")
        .eq("document_id", doc.id)
        .order("position");
      if (pos && pos.length > 0) {
        setAngebotPositionen(pos.map(p => ({
          bezeichnung: p.bezeichnung || p.description || "",
          gesamt: p.total || p.gesamt || 0,
        })));
      } else {
        setAngebotPositionen([]);
      }
    };
    loadPositions();
    setAbschlagShowCalc(false);
    setAbschlagCalcExpr("");
  }, [showAbschlagDialog]);

  // Safe math expression evaluator (supports + - * / and parentheses)
  const safeCalc = (expr: string): number | null => {
    const cleaned = expr.replace(/,/g, ".").replace(/[^0-9+\-*/.() ]/g, "");
    if (!cleaned.trim()) return null;
    try {
      // tokenize and evaluate safely
      const result = Function(`"use strict"; return (${cleaned})`)();
      return typeof result === "number" && isFinite(result) ? Math.round(result * 100) / 100 : null;
    } catch { return null; }
  };

  const createAbschlagsrechnung = async (overrideBetrag?: number) => {
    if (!doc || !id) return;
    setAbschlagCreating(true);
    try {
      const angebotTotal = doc.brutto || 0;
      let betrag = overrideBetrag ?? (
        abschlagMode === "prozent"
          ? Math.round(angebotTotal * (parseFloat(abschlagWert) || 0) / 100 * 100) / 100
          : parseFloat(abschlagWert) || 0
      );

      if (betrag <= 0) {
        setAbschlagCreating(false);
        return;
      }

      const bezeichnung = doc.nummer
        ? `Teilrechnung aus ${TYP_LABEL[doc.typ]} ${doc.nummer}`
        : "Abschlagszahlung";
      const beschreibung = abschlagMode === "prozent"
        ? `${abschlagWert}% des Gesamtbetrags${doc.nummer ? ` (${doc.nummer})` : ""}`
        : `Teilbetrag${doc.nummer ? ` aus ${doc.nummer}` : ""}`;

      const positions = [{
        id: crypto.randomUUID(),
        typ: "leistung",
        bezeichnung,
        beschreibung,
        menge: 1,
        einheit: "pauschal",
        einzelpreis: betrag,
        gesamt: betrag,
        optional: false,
      }];

      sessionStorage.setItem("prefill_positionen", JSON.stringify(positions));
      const params = [
        doc.customerId ? `&customerId=${doc.customerId}` : "",
        doc.requestId ? `&requestId=${doc.requestId}` : "",
        doc.eventId ? `&eventId=${doc.eventId}` : "",
        `&quelldokumentId=${doc.id}`,
        doc.nummer ? `&quelldokumentNummer=${encodeURIComponent(doc.nummer)}` : "",
      ].join("");
      setShowAbschlagDialog(false);
      navigate(`/admin/dokumente/new?typ=abschlagsrechnung${params}`);
    } catch (e: any) {
      console.error("Abschlag error:", e);
    }
    setAbschlagCreating(false);
  };

  // Send-Panel direkt öffnen wenn ?send=1 in der URL (kommt vom Editor-Versenden-Button)
  // useRef verhindert, dass das Panel nach load() erneut öffnet
  useEffect(() => {
    if (!doc || !searchParams.get("send") || sendPanelAutoOpened.current) return;
    sendPanelAutoOpened.current = true;
    openSendPanel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, searchParams]);

  // Auto-open Zahlung panel wenn ?zahlung=1
  useEffect(() => {
    if (!doc || !searchParams.get("zahlung")) return;
    setZahlungForm(f => ({ ...f, betrag: doc.offenerBetrag || doc.brutto }));
    setZahlungPanel(true);
  }, [doc, searchParams]);

  // Customer email search for the send panel
  useEffect(() => {
    const q = emailSearchQuery.trim().toLowerCase();
    if (!q || q.length < 1) { setEmailSearchResults([]); setShowEmailDropdown(false); return; }
    const doSearch = async () => {
      const { data } = await supabase
        .from("portal_customers")
        .select("id,name,email,company")
        .is("deleted_at", null)
        .or(`email.ilike.%${q}%,name.ilike.%${q}%,company.ilike.%${q}%`)
        .limit(8);
      setEmailSearchResults((data as EmailSearchCustomer[]) || []);
      setShowEmailDropdown(true);
    };
    const timer = setTimeout(doSearch, 250);
    return () => clearTimeout(timer);
  }, [emailSearchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        emailDropdownRef.current && !emailDropdownRef.current.contains(e.target as Node) &&
        emailInputRef.current && !emailInputRef.current.contains(e.target as Node)
      ) {
        setShowEmailDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Erfolgs-Toast nach Portal-Veröffentlichung (direkt gesetzt, kein URL-param nötig)
  const [publishedToast, setPublishedToast] = useState<false | "with_mail" | "no_mail">(false);

  const handleStatusChange = async (status: DokumentStatus) => {
    if (!id || !doc) return;
    setStatusChanging(true);
    try {
      await dokumenteService.setStatus(id, status);

      // Sync: Wenn Rechnung auf "bezahlt" → Event-Status aktualisieren
      if (status === "bezahlt" && doc.eventId) {
        // Schlussrechnung bezahlt → Event abgeschlossen
        const newEventStatus = doc.typ === "schlussrechnung" ? "abgeschlossen" : "rechnung_bezahlt";
        await supabase.from("portal_events")
          .update({ status: newEventStatus, invoice_status: "erledigt" })
          .eq("id", doc.eventId);
      }

      // Sync: Angebot akzeptiert → Request-Status aktualisieren
      if (status === "akzeptiert" && doc.typ === "angebot" && doc.requestId) {
        await supabase.from("portal_requests")
          .update({ status: "bestätigt" })
          .eq("id", doc.requestId);
      }

      // Sync: Angebot abgelehnt → Request-Status aktualisieren
      if (status === "abgelehnt" && doc.typ === "angebot" && doc.requestId) {
        await supabase.from("portal_requests")
          .update({ status: "abgelehnt" })
          .eq("id", doc.requestId);
      }

      await load();
    } finally { setStatusChanging(false); }
  };

  const handleConvert = async (zielTypOverride?: DokumentTyp) => {
    if (!doc || !id) return;
    const zielTyp = zielTypOverride || WORKFLOW[doc.typ];
    if (!zielTyp) return;
    // Abschlagsrechnung → eigenes Modal
    if (zielTyp === "abschlagsrechnung") {
      setMoreMenuOpen(false);
      setShowAbschlagDialog(true);
      return;
    }
    if (!confirm(`${TYP_LABEL[doc.typ]} in ${TYP_LABEL[zielTyp]} umwandeln?`)) return;
    setConverting(true);
    try { const neu = await dokumenteService.umwandeln(id, zielTyp); navigate(`/admin/dokumente/${neu.id}`); }
    finally { setConverting(false); }
  };

  const handleStornieren = async () => {
    if (!id || !doc) return;
    const isRechnung = ["rechnung", "abschlagsrechnung", "schlussrechnung"].includes(doc.typ);
    const msg = isRechnung
      ? `${TYP_LABEL[doc.typ]} ${doc.nummer} stornieren?\n\nEs wird automatisch eine Stornorechnung mit negativen Beträgen erstellt.`
      : `${TYP_LABEL[doc.typ]} ${doc.nummer} stornieren?\n\nDas Dokument bleibt gespeichert, wird aber als "Storniert" markiert.`;
    if (!confirm(msg)) return;
    setStatusChanging(true);
    setMoreMenuOpen(false);
    try {
      const storno = await dokumenteService.stornieren(id);
      if (storno) {
        navigate(`/admin/dokumente/${storno.id}`);
        return;
      }
      await load();
    } finally { setStatusChanging(false); }
  };

  const handleDelete = async () => {
    if (!id || !doc) return;
    if (!confirm(`${TYP_LABEL[doc.typ]} ${doc.nummer} unwiderruflich löschen?\n\nAlle Positionen und Zahlungen werden ebenfalls gelöscht.`)) return;
    setDeleting(true);
    setMoreMenuOpen(false);
    try {
      await dokumenteService.delete(id);
      navigate(-1);
    } catch (e: unknown) {
      alert("Fehler beim Löschen: " + ((e as any)?.message || String(e)));
      setDeleting(false);
    }
  };

  // ── PDF-Blob aus gespeichertem preview_html (html2canvas) ────────────────────
  const generatePreviewPdfBlob = async (html: string): Promise<Blob> => {
    const container = document.createElement("div");
    container.style.cssText = "position:fixed;left:-9999px;top:0;width:595px;pointer-events:none;background:white;";
    container.innerHTML = html;
    document.body.appendChild(container);
    try {
      // Bilder abwarten
      const imgs = Array.from(container.querySelectorAll("img"));
      await Promise.all(imgs.map(img =>
        img.complete ? Promise.resolve() : new Promise<void>(res => { img.onload = () => res(); img.onerror = () => res(); })
      ));
      // Ganzen Container als ein Bild rendern, dann auf A4-Seiten aufteilen
      const el = (container.children[0] as HTMLElement) || container;
      el.style.width = "595px";
      el.style.overflow = "visible";
      el.style.height = "auto";
      el.style.minHeight = "auto";
      el.style.position = "relative";
      const canvas = await html2canvas(el, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: "#ffffff", width: 595, logging: false,
      });
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageHeightPx = 842 * 2; // scale=2
      const totalHeight = canvas.height;
      const totalPages = Math.ceil(totalHeight / pageHeightPx);
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();
        const srcY = i * pageHeightPx;
        const srcH = Math.min(pageHeightPx, totalHeight - srcY);
        // Crop canvas to this page
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = 595 * 2;
        pageCanvas.height = pageHeightPx;
        const ctx = pageCanvas.getContext("2d")!;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, srcY, 595 * 2, srcH, 0, 0, 595 * 2, srcH);
        pdf.addImage(pageCanvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 210, 297);
      }
      return pdf.output("blob");
    } finally {
      document.body.removeChild(container);
    }
  };

  // ── Legacy-PDF (nur noch intern, falls preview_html fehlt) ───────────────────
  const generatePdf = (d: Dokument): jsPDF => {
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
    const ML = 20, MR = 20, W = 210;
    const CW = W - ML - MR;
    const RIGHT = W - MR;
    let y = 22;
    const tl = TYP_LABEL[d.typ] ?? d.typ;
    const fmtDE = (n: number) => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
    const fmtD  = (s?: string) => {
      if (!s) return "–";
      try { return new Date(s).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }); }
      catch { return s; }
    };

    // Header
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(15); pdf.setTextColor(17, 17, 17);
    pdf.text(d.absender.name, ML, y); y += 5;
    if (d.absender.firma) {
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(9); pdf.setTextColor(100, 100, 100);
      pdf.text(d.absender.firma, ML, y); y += 4;
    }
    pdf.setFontSize(8.5); pdf.setTextColor(130, 130, 130);
    if (d.absender.adresse) { pdf.text(d.absender.adresse, ML, y); y += 3.5; }
    const absCity = `${d.absender.plz} ${d.absender.ort}`.trim();
    if (absCity) { pdf.text(absCity, ML, y); y += 5; }
    // Trennlinie
    pdf.setDrawColor(220, 220, 220); pdf.setLineWidth(0.3); pdf.line(ML, y, RIGHT, y); y += 8;

    // Zone B: Rücksendeangabe
    const rueck = [d.absender.name, d.absender.adresse, absCity].filter(Boolean).join(" – ");
    pdf.setFontSize(6.5); pdf.setTextColor(180, 180, 180);
    pdf.text(rueck, ML, y, { maxWidth: CW * 0.48 });
    pdf.setDrawColor(230, 230, 230); pdf.setLineWidth(0.2); pdf.line(ML, y + 1.5, ML + CW * 0.48, y + 1.5);
    y += 5;

    // Empfänger (links)
    let addrY = y;
    pdf.setFontSize(9.5);
    if (d.empfaenger.firma) {
      pdf.setFont("helvetica", "bold"); pdf.setTextColor(17, 17, 17);
      pdf.text(d.empfaenger.firma, ML, addrY); addrY += 4.5;
    }
    pdf.setFont("helvetica", "normal"); pdf.setTextColor(30, 30, 30);
    pdf.text(d.empfaenger.name, ML, addrY); addrY += 4.5;
    if (d.empfaenger.adresse) { pdf.text(d.empfaenger.adresse, ML, addrY); addrY += 4.5; }
    const empfCity = `${d.empfaenger.plz} ${d.empfaenger.ort}`.trim();
    if (empfCity) { pdf.text(empfCity, ML, addrY); addrY += 4.5; }
    if (d.empfaenger.land && d.empfaenger.land !== "Deutschland") { pdf.text(d.empfaenger.land, ML, addrY); addrY += 4.5; }

    // Informationsblock (rechts)
    const infoX = ML + CW * 0.55;
    let infoY = y;
    const isAngebot = d.typ === "angebot";
    const metaR = [
      { label: `${tl}-Nr.`, val: d.nummer },
      { label: "Datum", val: fmtD(d.datum) },
      ...(d.gueltigBis && isAngebot ? [{ label: "Gültig bis", val: fmtD(d.gueltigBis) }] : []),
      ...(d.faelligAm && !isAngebot ? [{ label: "Zahlungsziel", val: fmtD(d.faelligAm) }] : []),
      ...(d.gueltigBis && !isAngebot ? [{ label: "Gültig bis", val: fmtD(d.gueltigBis) }] : []),
      { label: "Ansprechpartner", val: d.absender.name },
    ];
    pdf.setFontSize(8);
    metaR.forEach(r => {
      pdf.setFont("helvetica", "normal"); pdf.setTextColor(160, 160, 160); pdf.text(r.label, infoX, infoY);
      pdf.setFont("helvetica", "bold");  pdf.setTextColor(17, 17, 17);  pdf.text(r.val, RIGHT, infoY, { align: "right" });
      infoY += 4.2;
    });
    y = Math.max(addrY, infoY) + 10;

    // Betreff
    pdf.setFontSize(12); pdf.setFont("helvetica", "bold"); pdf.setTextColor(17, 17, 17);
    pdf.text(`${tl} ${d.nummer}`, ML, y); y += 7;

    // Kopftext
    pdf.setFontSize(9.5); pdf.setFont("helvetica", "normal"); pdf.setTextColor(50, 50, 50);
    const kopf = d.kopftext || "Sehr geehrte Damen und Herren,\nvielen Dank für Ihre Anfrage. Gerne unterbreite ich Ihnen das gewünschte freibleibende Angebot:";
    const kopfL = pdf.splitTextToSize(kopf, CW);
    pdf.text(kopfL, ML, y); y += kopfL.length * 4.5 + 6;

    // Positionen-Tabelle
    const pos = (d.positionen ?? []).filter(p => p.typ === "leistung" || p.typ === "produkt");
    pdf.setFillColor(17, 17, 17); pdf.rect(ML, y, CW, 6, "F");
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(7.5); pdf.setFont("helvetica", "bold");
    pdf.text("Pos.", ML + 2, y + 4);
    pdf.text("Beschreibung", ML + 10, y + 4);
    pdf.text("Menge", RIGHT - 52, y + 4, { align: "right" });
    pdf.text("Einzelpreis", RIGHT - 26, y + 4, { align: "right" });
    pdf.text("Gesamt", RIGHT, y + 4, { align: "right" });
    y += 6;
    pos.forEach((p, i) => {
      const rh = p.beschreibung ? 9 : 6;
      if (i % 2 === 0) { pdf.setFillColor(248, 248, 248); pdf.rect(ML, y, CW, rh, "F"); }
      pdf.setTextColor(80, 80, 80); pdf.setFontSize(7.5); pdf.setFont("helvetica", "normal");
      pdf.text(`${i + 1}.`, ML + 2, y + 4);
      pdf.setFont("helvetica", p.bezeichnung ? "bold" : "normal");
      pdf.setTextColor(p.bezeichnung ? 17 : 150, p.bezeichnung ? 17 : 150, p.bezeichnung ? 17 : 150);
      pdf.text(p.bezeichnung || "(keine Bezeichnung)", ML + 10, y + 4, { maxWidth: CW * 0.53 });
      if (p.beschreibung) {
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(6.5); pdf.setTextColor(120, 120, 120);
        pdf.text(pdf.splitTextToSize(p.beschreibung, CW * 0.53), ML + 10, y + 7.5);
      }
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(7.5); pdf.setTextColor(80, 80, 80);
      pdf.text(`${p.menge} ${p.einheit}`, RIGHT - 52, y + 4, { align: "right" });
      pdf.text(fmtDE(p.einzelpreis), RIGHT - 26, y + 4, { align: "right" });
      pdf.setFont("helvetica", "bold"); pdf.setTextColor(17, 17, 17);
      pdf.text(fmtDE(p.gesamt), RIGHT, y + 4, { align: "right" });
      pdf.setDrawColor(235, 235, 235); pdf.setLineWidth(0.2); pdf.line(ML, y + rh, RIGHT, y + rh);
      y += rh;
    });
    pdf.setDrawColor(180, 180, 180); pdf.setLineWidth(0.5); pdf.line(ML, y, RIGHT, y); y += 6;

    // Summen
    const sumX = RIGHT - 70;
    pdf.setFontSize(8.5);
    pdf.setFont("helvetica", "normal"); pdf.setTextColor(100, 100, 100);
    pdf.text("Gesamtbetrag netto", sumX, y); pdf.setTextColor(17, 17, 17); pdf.text(fmtDE(d.netto), RIGHT, y, { align: "right" }); y += 4.5;
    (d.mwstGruppen ?? []).filter(g => g.satz > 0).forEach(g => {
      pdf.setTextColor(100, 100, 100); pdf.text(`zzgl. ${g.satz}% MwSt.`, sumX, y);
      pdf.setTextColor(17, 17, 17); pdf.text(fmtDE(g.steuer), RIGHT, y, { align: "right" }); y += 4.5;
    });
    if (d.absender.kleinunternehmer && d.mwstBetrag === 0) {
      pdf.setFontSize(7); pdf.setTextColor(130, 130, 130);
      pdf.text("Umsatzsteuer nicht erhoben gem. §19 UStG.", sumX, y); y += 4;
    }
    pdf.setDrawColor(17, 17, 17); pdf.setLineWidth(0.5); pdf.line(sumX, y, RIGHT, y); y += 4;
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(10); pdf.setTextColor(17, 17, 17);
    pdf.text("Gesamtbetrag brutto", sumX, y); pdf.text(fmtDE(d.brutto), RIGHT, y, { align: "right" }); y += 10;

    // Fußtext
    if (d.fusstext) {
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(8.5); pdf.setTextColor(70, 70, 70);
      const fl = pdf.splitTextToSize(d.fusstext, CW); pdf.text(fl, ML, y); y += fl.length * 4 + 6;
    }

    // Grußformel
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(9.5); pdf.setTextColor(50, 50, 50);
    pdf.text("Mit magischen Grüßen", ML, y); y += 10;
    pdf.setFont("helvetica", "bold"); pdf.text(d.absender.name, ML, y); y += 4;
    if (d.absender.firma) { pdf.setFont("helvetica", "normal"); pdf.setFontSize(8.5); pdf.setTextColor(100, 100, 100); pdf.text(d.absender.firma, ML, y); }

    // Footer
    const fy0 = 280;
    pdf.setDrawColor(190, 190, 190); pdf.setLineWidth(0.3); pdf.line(ML, fy0, RIGHT, fy0);
    const cW4 = CW / 4;
    pdf.setFontSize(6.5); pdf.setFont("helvetica", "normal"); pdf.setTextColor(100, 100, 100);
    let fy = fy0 + 4;
    pdf.setFont("helvetica", "bold"); pdf.text(d.absender.name, ML, fy); fy += 3;
    pdf.setFont("helvetica", "normal");
    if (d.absender.adresse) { pdf.text(d.absender.adresse, ML, fy); fy += 3; }
    if (absCity) pdf.text(absCity, ML, fy);
    fy = fy0 + 4;
    if (d.absender.email) { pdf.text(`E-Mail: ${d.absender.email}`, ML + cW4, fy); fy += 3; }
    if (d.absender.telefon) { pdf.text(`Tel.: ${d.absender.telefon}`, ML + cW4, fy); fy += 3; }
    if (d.absender.website) pdf.text(`Web: ${d.absender.website}`, ML + cW4, fy);
    fy = fy0 + 4;
    if (d.absender.steuernummer) { pdf.text(`Steuer-Nr.: ${d.absender.steuernummer}`, ML + cW4 * 2, fy); }
    fy = fy0 + 4;
    if (d.absender.iban) { pdf.text(`IBAN: ${d.absender.iban}`, ML + cW4 * 3, fy); fy += 3; }
    if (d.absender.bic) pdf.text(`BIC: ${d.absender.bic}`, ML + cW4 * 3, fy);

    return pdf;
  };

  // Upload PDF to storage, get signed URL, update file_url on document
  const uploadPdfBlob = async (blob: Blob, docId: string): Promise<string> => {
    const path = `dokumente/${docId}.pdf`;
    const { error: upErr } = await supabase.storage
      .from("portal-documents")
      .upload(path, blob, { contentType: "application/pdf", upsert: true });
    if (upErr) throw new Error("Storage-Upload fehlgeschlagen: " + upErr.message);

    const { data: urlData, error: urlErr } = await supabase.storage
      .from("portal-documents")
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    if (urlErr || !urlData?.signedUrl) throw new Error("Signed-URL Fehler: " + (urlErr?.message ?? "leer"));

    const { error: dbErr } = await supabase
      .from("portal_documents")
      .update({ file_url: urlData.signedUrl })
      .eq("id", docId);
    if (dbErr) throw new Error("DB-Update fehlgeschlagen: " + dbErr.message);

    return urlData.signedUrl;
  };

  const handleDownload = async () => {
    if (!doc) return;

    const html = doc.previewHtml;
    if (!html) {
      setSendMsg({ type: "err", text: "Kein Preview vorhanden. Bitte Dokument zuerst im Editor speichern." });
      return;
    }

    setSendLoading("download"); setSendMsg(null);
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preview_html: html, title: doc.nummer || "Dokument" }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`PDF-Fehler (${res.status}): ${err}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${doc.nummer || "Dokument"}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Status auf "gesendet" setzen wenn noch Entwurf
      if (doc.status === "entwurf") {
        await dokumenteService.setStatus(id!, "gesendet");
        setDoc({ ...doc, status: "gesendet" });
      }

      setSendMsg({ type: "ok", text: "PDF heruntergeladen" });
    } catch (e) {
      console.error("PDF error:", e);
      setSendMsg({ type: "err", text: "PDF-Fehler: " + (e instanceof Error ? e.message : String(e)) });
    } finally {
      setSendLoading(null);
    }
  };

  const handlePublishPortal = async () => {
    if (!doc || !id) return;

    // Nur mit Event- oder Anfragen-Verknüpfung
    if (!doc.eventId && !doc.requestId) {
      setSendMsg({ type: "err", text: "Dieses Dokument ist keinem Event oder keiner Anfrage zugeordnet." });
      return;
    }

    setSendLoading("portal"); setSendMsg(null);
    try {
      // 0. PDF generieren und hochladen (damit Portal echtes PDF hat)
      if (doc.previewHtml) {
        try {
          const pdfBlob = await generatePdfViaApi(doc.previewHtml, doc.nummer || "Dokument");
          await uploadPdfBlob(pdfBlob, id);
        } catch (pdfErr) {
          console.warn("PDF-Upload fehlgeschlagen (Portal funktioniert trotzdem):", pdfErr);
        }
      }

      // 1. Dokument-Status → gesendet
      await dokumenteService.setStatus(id, "gesendet");

      // 2. Request/Event-Status aktualisieren (Kern-Operation, muss klappen)
      let mailType: string | null = null;
      let mailRecordId: string | null = null;

      // Auto-Mail bei: Angebot, Abschlagsrechnung, Schlussrechnung, Mahnung
      // KEINE Auto-Mail bei: Auftragsbestätigung (wird manuell gesendet)
      const autoMailTypen = ["angebot", "abschlagsrechnung", "schlussrechnung", "rechnung", "mahnung"];
      const skipStatusMail = !autoMailTypen.includes(doc.typ);

      // Request-Status aktualisieren (nur bei Angebot/AB)
      if (doc.requestId) {
        let reqStatus: string | null = null;
        if (doc.typ === "angebot") reqStatus = "angebot_gesendet";
        else if (doc.typ === "auftragsbestaetigung") reqStatus = "gebucht";

        if (reqStatus) {
          await supabase.from("portal_requests").update({ status: reqStatus }).eq("id", doc.requestId);
          if (!skipStatusMail) {
            mailType = "request";
            mailRecordId = doc.requestId;
          }
        }
      }

      // Event-Status aktualisieren (bei Rechnungen, Mahnungen — auch wenn requestId existiert)
      if (doc.eventId) {
        let eventStatus: string | null = null;
        if (doc.typ === "auftragsbestaetigung" && !doc.requestId) eventStatus = "vertrag_gesendet";
        else if (doc.typ === "rechnung" || doc.typ === "abschlagsrechnung" || doc.typ === "schlussrechnung") eventStatus = "rechnung_gesendet";
        else if (doc.typ === "mahnung") eventStatus = "rechnung_faellig";

        if (eventStatus) {
          await supabase.from("portal_events").update({ status: eventStatus }).eq("id", doc.eventId);
          if (!skipStatusMail && !mailType) {
            mailType = "event";
            mailRecordId = doc.eventId;
          }
        }
      }

      // 3. Statusmail senden (nicht für Auftragsbestätigung – AB-Mail wird separat gesendet)
      if (mailType && mailRecordId) {
        try {
          await supabase.auth.refreshSession();
          const { data: { session } } = await supabase.auth.getSession();
          const token = session?.access_token;
          if (token) {
            const mailRes = await supabase.functions.invoke("admin-send-status-mail", {
              headers: { Authorization: `Bearer ${token}` },
              body: { type: mailType, recordId: mailRecordId, dokumentTyp: doc.typ, faelligAm: doc.faelligAm, dokumentNummer: doc.nummer },
            });
            if (mailRes.error) console.warn("Status-Mail Fehler:", mailRes.error);
          }
        } catch (mailErr) {
          console.warn("Status-Mail konnte nicht gesendet werden:", mailErr);
        }
      }

      // 4. Panel schließen + URL bereinigen + Toast
      sendPanelAutoOpened.current = false; // Reset: falls User erneut per ?send=1 kommt
      setSendPanel(false);
      navigate(`/admin/dokumente/${id}`, { replace: true }); // entfernt ?send=1
      setPublishedToast(skipStatusMail ? "no_mail" : "with_mail");
      setTimeout(() => setPublishedToast(false), 6000);
      await load();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : (typeof e === "object" ? JSON.stringify(e) : String(e));
      setSendMsg({ type: "err", text: "Fehler: " + msg });
      console.error("handlePublishPortal error:", e);
    } finally { setSendLoading(null); }
  };

  // Generiert echtes PDF über Vercel-API aus preview_html
  const generatePdfViaApi = async (html: string, title: string): Promise<Blob> => {
    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preview_html: html, title }),
    });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`PDF-Generierung fehlgeschlagen (${res.status}): ${err}`);
    }
    return res.blob();
  };

  const handleSendEmail = async () => {
    if (!doc || !id || !emailTo) return;
    if (!doc.previewHtml) {
      setSendMsg({ type: "err", text: "Kein Preview vorhanden – bitte Dokument im Editor öffnen und einmal speichern." });
      return;
    }
    setSendLoading("email"); setSendMsg(null);
    try {
      const blob = await generatePdfViaApi(doc.previewHtml, doc.nummer || "Dokument");
      const signedUrl = await uploadPdfBlob(blob, id);
      const { error } = await supabase.functions.invoke("send-customer-mail", {
        body: {
          to_email: emailTo,
          to_name: doc.empfaenger.firma || doc.empfaenger.name,
          subject: emailSubject,
          body: emailBody.replace(/\n/g, "<br>"),
          attachment_urls: [signedUrl],
          customer_id: doc.customerId ?? null,
        },
      });
      if (error) throw error;
      await dokumenteService.setStatus(id, "gesendet");
      await load();
      setSendMsg({ type: "ok", text: `E-Mail an ${emailTo} gesendet ✓` });
    } catch (e: unknown) {
      setSendMsg({ type: "err", text: "Fehler: " + ((e as any)?.message || String(e)) });
    } finally { setSendLoading(null); }
  };

  const openSendPanel = async () => {
    if (!doc) return;
    const tl = TYP_LABEL[doc.typ] ?? doc.typ;

    // Auto-fill email from linked customer
    let customerEmail = doc.empfaenger.email ?? "";
    if (!customerEmail && doc.customerId) {
      const { data: cust } = await supabase
        .from("portal_customers")
        .select("email")
        .eq("id", doc.customerId)
        .maybeSingle();
      if (cust?.email) customerEmail = cust.email;
    }

    setEmailTo(customerEmail);
    setEmailSearchQuery("");
    setEmailSearchResults([]);
    setShowEmailDropdown(false);
    setEmailSubject(`${tl} ${doc.nummer}`);
    setEmailBody(`Sehr geehrte Damen und Herren,\n\nanbei erhalten Sie ${tl} ${doc.nummer} im Anhang.\n\nBei Fragen stehe ich gerne zur Verfügung.\n\nMit freundlichen Grüßen\nEmilian Leber\nMagicEL – Entertainment & Zauberkunst`);
    setSendMsg(null);
    setSendPanel(true);
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
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-muted-foreground">
        <p className="mb-4 font-medium">Dokument nicht gefunden.</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60">
          Zurück
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

      {/* ── PORTAL-ERFOLG TOAST ── */}
      {publishedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="w-4 h-4 shrink-0" />
          {publishedToast === "with_mail"
            ? 'Im Kundenportal veröffentlicht · Status auf \u201EGesendet\u201C gesetzt · Statusmail verschickt'
            : 'Im Kundenportal veröffentlicht · Status auf \u201EGesendet\u201C gesetzt'}
          <button onClick={() => setPublishedToast(false)} className="ml-2 opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
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
            {/* Versenden Button */}
            <button
              onClick={openSendPanel}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              Versenden
            </button>
            {/* Angebot: Akzeptiert/Abgelehnt nur wenn gesendet */}
            {doc.typ === "angebot" && doc.status === "gesendet" && (
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
            {/* Rechnung: Als bezahlt markieren */}
            {["rechnung", "abschlagsrechnung", "schlussrechnung"].includes(doc.typ) && doc.status !== "bezahlt" && doc.status !== "storniert" && (
              <button onClick={() => handleStatusChange("bezahlt")} disabled={statusChanging}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-green-200 text-green-700 text-sm hover:bg-green-50 disabled:opacity-50">
                <CheckCircle className="w-3.5 h-3.5" />
                Bezahlt
              </button>
            )}
            {/* Folgedokument-Link */}
            {doc.folgedokumentId && (
              <button onClick={() => navigate(`/admin/dokumente/${doc.folgedokumentId}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
                Zur {doc.folgedokumentTyp ? TYP_LABEL[doc.folgedokumentTyp] : "Folgedokument"}
              </button>
            )}
            {/* Workflow: Nächste Schritte nur wenn sinnvoll (gesendet/akzeptiert) */}
            {!doc.folgedokumentId && ["gesendet", "akzeptiert", "offen"].includes(doc.status || "") && (() => {
              const options = WORKFLOW_OPTIONS[doc.typ];
              if (!options || options.length === 0) return null;
              return options.map((opt) => (
                <button key={opt.typ} onClick={() => handleConvert(opt.typ)} disabled={converting}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 disabled:opacity-50 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                  {converting ? "…" : opt.label}
                </button>
              ));
            })()}
            <button onClick={() => navigate(`/admin/dokumente/${doc.id}/bearbeiten`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/30 text-sm hover:bg-muted/60 transition-colors">
              <Pencil className="w-3.5 h-3.5" />
              Bearbeiten
            </button>

            {/* ── Mehr-Menü ── */}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen((v) => !v)}
                disabled={deleting || statusChanging}
                className="flex items-center justify-center w-9 h-9 rounded-xl border border-border/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-40"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {moreMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-40 w-56 bg-background border border-border/30 rounded-2xl shadow-xl overflow-hidden">
                    {/* Schnellzugriffe */}
                    {["angebot", "auftragsbestaetigung", "abschlagsrechnung"].includes(doc.typ) && (
                      <button
                        onClick={() => { setMoreMenuOpen(false); handleConvert("abschlagsrechnung" as any); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted/40 transition-colors text-left"
                      >
                        <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <p className="font-medium">Abschlagsrechnung erstellen</p>
                      </button>
                    )}
                    {["auftragsbestaetigung", "abschlagsrechnung"].includes(doc.typ) && (
                      <button
                        onClick={() => { setMoreMenuOpen(false); handleConvert("schlussrechnung" as any); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted/40 transition-colors text-left"
                      >
                        <FileText className="w-4 h-4 shrink-0 text-muted-foreground" />
                        <p className="font-medium">Schlussrechnung erstellen</p>
                      </button>
                    )}
                    <div className="border-t border-border/10" />
                    {/* Stornieren */}
                    {doc.status !== "storniert" && (
                      <button
                        onClick={handleStornieren}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors text-left"
                      >
                        <Ban className="w-4 h-4 shrink-0" />
                        <p className="font-medium">Stornieren</p>
                      </button>
                    )}
                    <div className="border-t border-border/10" />
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" />
                      <p className="font-medium">{deleting ? "Löschen…" : "Endgültig löschen"}</p>
                    </button>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Workflow stepper */}
        <WorkflowStepper currentTyp={doc.typ} />

        {/* Quelldokument-Link (von welchem Dokument wurde dieses erstellt) */}
        {doc.quelldokumentId && (
          <div className="px-6 py-1.5 bg-muted/5 border-t border-border/10 flex items-center gap-2 text-xs text-muted-foreground">
            <span>Erstellt aus</span>
            <button onClick={() => navigate(`/admin/dokumente/${doc.quelldokumentId}`)}
              className="hover:text-foreground transition-colors flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3 h-3" /> {doc.quelldokumentNummer}
            </button>
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
            ...(doc.typ !== "angebot" ? [{ label: "Zahlungsziel", value: doc.zahlungszielTage + " Tage", icon: Clock }] : []),
            ...(doc.typ !== "angebot" ? [{ label: "Lieferdatum", value: fmtDate(doc.lieferdatum), icon: Clock }] : []),
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
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{doc.kopftext.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")}</p>
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
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{doc.fusstext.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")}</p>
          </div>
        )}

        {/* Unternehmensdaten */}
        {doc.absender && (
          <div className="rounded-2xl border border-border/20 bg-muted/5 overflow-hidden">
            <div className="px-5 py-3 border-b border-border/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Unternehmensdaten</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/10">
              <div className="bg-background px-4 py-3">
                <p className="font-semibold text-sm">{doc.absender?.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{doc.absender?.adresse}</p>
                <p className="text-xs text-muted-foreground">{doc.absender?.plz} {doc.absender?.ort}</p>
              </div>
              <div className="bg-background px-4 py-3">
                {(doc.absender as any)?.telefon && <p className="text-xs text-muted-foreground">Tel: {(doc.absender as any).telefon}</p>}
                {doc.absender?.email && <p className="text-xs text-muted-foreground">E-Mail: {doc.absender.email}</p>}
                {(doc.absender as any)?.website && <p className="text-xs text-muted-foreground">Web: {(doc.absender as any).website}</p>}
              </div>
              <div className="bg-background px-4 py-3">
                {(doc.absender as any)?.steuernummer && <p className="text-xs text-muted-foreground">Steuer-Nr: {(doc.absender as any).steuernummer}</p>}
                {doc.absender?.kleinunternehmer && <p className="text-xs text-muted-foreground italic">§ 19 UStG – Kleinunternehmer</p>}
              </div>
              <div className="bg-background px-4 py-3">
                {doc.absender?.iban && <p className="text-xs text-muted-foreground font-mono">IBAN: {doc.absender.iban}</p>}
                {doc.absender?.bic && <p className="text-xs text-muted-foreground font-mono">BIC: {doc.absender.bic}</p>}
                {(doc.absender as any)?.bank && <p className="text-xs text-muted-foreground">{(doc.absender as any).bank}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Zahlungen — only for Rechnungen */}
        {(doc.typ === "rechnung" || doc.typ === "abschlagsrechnung" || doc.typ === "schlussrechnung" || doc.typ === "mahnung") && (
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

      {/* ── VERSENDEN PANEL ── */}
      {sendPanel && doc && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setSendPanel(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background border-l border-border/20 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/20 shrink-0">
              <div>
                <h2 className="font-semibold text-sm">Versenden</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{TYP_LABEL[doc.typ]} {doc.nummer}</p>
              </div>
              <button onClick={() => setSendPanel(false)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3">

              {/* Feedback */}
              {sendMsg && (
                <div className={`rounded-xl px-4 py-3 text-sm font-medium ${sendMsg.type === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                  {sendMsg.text}
                </div>
              )}

              {/* Option 1: Download */}
              <div className="rounded-2xl border border-border/20 bg-muted/5 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">PDF herunterladen</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Direkt auf deinem Gerät speichern</p>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={sendLoading !== null}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors disabled:opacity-50"
                >
                  {sendLoading === "download" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  {sendLoading === "download" ? "Generiere PDF…" : "PDF herunterladen"}
                </button>
              </div>

              {/* Option 2: Kundenportal */}
              {(() => {
                const canPublish = !!(doc.eventId || doc.requestId);
                return (
                  <div className={`rounded-2xl border p-4 ${canPublish ? "border-blue-200 bg-blue-50/30" : "border-border/20 bg-muted/5 opacity-60"}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${canPublish ? "bg-blue-100" : "bg-muted/40"}`}>
                        <Globe className={`w-4 h-4 ${canPublish ? "text-blue-600" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Im Kundenportal veröffentlichen</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {canPublish
                            ? "Status setzen · Anfrage/Event aktualisieren · Statusmail an Kunden"
                            : "Nur für Dokumente mit Event- oder Anfragen-Verknüpfung"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handlePublishPortal}
                      disabled={sendLoading !== null || !canPublish}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 ${canPublish ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-muted text-muted-foreground cursor-not-allowed"}`}
                    >
                      {sendLoading === "portal" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
                      {sendLoading === "portal" ? "Wird veröffentlicht…" : "Im Portal veröffentlichen"}
                    </button>
                  </div>
                );
              })()}

              {/* Option 3: E-Mail */}
              <div className="rounded-2xl border border-border/20 bg-muted/5 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Per E-Mail senden</p>
                    <p className="text-xs text-muted-foreground mt-0.5">PDF als Anhang · Status → Gesendet</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <label className="text-xs text-muted-foreground mb-1 block">An</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50 pointer-events-none" />
                      <input
                        ref={emailInputRef}
                        type="text"
                        value={emailTo}
                        onChange={(e) => {
                          setEmailTo(e.target.value);
                          setEmailSearchQuery(e.target.value);
                        }}
                        onFocus={() => { if (emailSearchResults.length > 0) setShowEmailDropdown(true); }}
                        placeholder="E-Mail eingeben oder Kunde suchen..."
                        className="w-full rounded-xl bg-background border border-border/30 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                      />
                    </div>
                    {showEmailDropdown && emailSearchResults.length > 0 && (
                      <div
                        ref={emailDropdownRef}
                        className="absolute z-50 left-0 right-0 mt-1 bg-background border border-border/40 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto"
                      >
                        {emailSearchResults.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setEmailTo(c.email || "");
                              setEmailSearchQuery("");
                              setShowEmailDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-muted/40 transition-colors border-b border-border/10 last:border-0"
                          >
                            <p className="text-sm font-medium text-foreground">{c.name || "Unbenannt"}{c.company ? ` · ${c.company}` : ""}</p>
                            <p className="text-xs text-muted-foreground">{c.email || "Keine E-Mail"}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Betreff</label>
                    <input
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Nachricht</label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={6}
                      className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSendEmail}
                  disabled={sendLoading !== null || !emailTo}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {sendLoading === "email" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                  {sendLoading === "email" ? "Sende E-Mail…" : "E-Mail mit PDF senden"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

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

      {/* ── Abschlagsrechnung Modal ── */}
      {showAbschlagDialog && doc && (() => {
        const angebotTotal = doc.brutto || 0;
        const betrag = abschlagMode === "prozent"
          ? Math.round(angebotTotal * (parseFloat(abschlagWert) || 0) / 100 * 100) / 100
          : parseFloat(abschlagWert) || 0;
        const calcResult = safeCalc(abschlagCalcExpr);
        const finalBetrag = calcResult != null && calcResult > 0 ? calcResult : betrag;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAbschlagDialog(false)}>
            <div className="bg-background rounded-2xl shadow-2xl border border-border/30 p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold">Abschlagsrechnung erstellen</h3>
              </div>
              {doc.nummer && (
                <p className="text-xs text-muted-foreground mb-4">
                  Basierend auf {doc.nummer} · {angebotTotal.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €
                </p>
              )}

              {/* Positionen */}
              {angebotPositionen.length > 0 && (
                <div className="mb-4 rounded-xl border border-border/20 overflow-hidden">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-3 pt-2.5 pb-1.5">Positionen aus {TYP_LABEL[doc.typ]}</p>
                  <div className="divide-y divide-border/10">
                    {angebotPositionen.map((pos, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 text-sm">
                        <span className="text-foreground truncate mr-3">{pos.bezeichnung}</span>
                        <span className="text-muted-foreground font-medium shrink-0">{pos.gesamt.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 bg-muted/20 text-sm font-bold border-t border-border/20">
                    <span>Gesamt</span>
                    <span>{angebotTotal.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</span>
                  </div>
                </div>
              )}

              {/* Mode toggle */}
              <div className="flex gap-2 mb-4">
                <button onClick={() => setAbschlagMode("prozent")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${abschlagMode === "prozent" ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"}`}>
                  Prozentual
                </button>
                <button onClick={() => setAbschlagMode("fix")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${abschlagMode === "fix" ? "bg-foreground text-background" : "bg-muted/40 text-muted-foreground"}`}>
                  Fixer Betrag
                </button>
              </div>

              {/* Input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
                  {abschlagMode === "prozent" ? "Prozentsatz" : "Betrag (€)"}
                </label>
                <div className="flex items-center gap-2">
                  <input type="number" value={abschlagWert} onChange={e => setAbschlagWert(e.target.value)}
                    className="flex-1 rounded-xl bg-muted/20 border border-border/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                    min="0" step={abschlagMode === "prozent" ? "5" : "0.01"} />
                  <span className="text-sm text-muted-foreground font-medium">{abschlagMode === "prozent" ? "%" : "€"}</span>
                </div>
              </div>

              {/* Taschenrechner */}
              <div className="mb-4 rounded-xl border border-border/20 overflow-hidden">
                <button onClick={() => setAbschlagShowCalc(!abschlagShowCalc)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted/20 transition-colors">
                  <span className="flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5" /> Taschenrechner</span>
                  {abschlagShowCalc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                {abschlagShowCalc && (
                  <div className="px-3 pb-3 space-y-2 border-t border-border/10">
                    <p className="text-[10px] text-muted-foreground pt-1">Berechnung eingeben, z.B. <code className="bg-muted/30 px-1 rounded">945 * 0.5 + 13</code></p>
                    <input
                      type="text"
                      placeholder="z.B. 958 * 0.5"
                      value={abschlagCalcExpr}
                      onChange={e => setAbschlagCalcExpr(e.target.value)}
                      className="w-full rounded-lg bg-muted/20 border border-border/30 px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    {abschlagCalcExpr && (
                      <div className="flex items-center justify-between text-sm font-bold pt-1 border-t border-border/10">
                        <span>Ergebnis</span>
                        <span className={calcResult != null && calcResult > 0 ? "text-green-600" : "text-red-500"}>
                          {calcResult != null ? `${calcResult.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €` : "Ungültig"}
                        </span>
                      </div>
                    )}
                    {calcResult != null && calcResult > 0 && (
                      <button
                        onClick={() => { setAbschlagMode("fix"); setAbschlagWert(String(calcResult)); setAbschlagShowCalc(false); }}
                        className="w-full py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors"
                      >
                        {calcResult.toLocaleString("de-DE", { minimumFractionDigits: 2 })} € übernehmen
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Summary */}
              {finalBetrag > 0 && (
                <div className="rounded-xl bg-green-50 border border-green-200 p-3 mb-4 text-center">
                  <p className="text-xs text-green-600 mb-0.5">Abschlagsrechnung</p>
                  <p className="text-xl font-bold text-green-700">{finalBetrag.toLocaleString("de-DE", { minimumFractionDigits: 2 })} €</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2">
                <button onClick={() => setShowAbschlagDialog(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/40">
                  Abbrechen
                </button>
                <button
                  onClick={() => createAbschlagsrechnung(calcResult != null && calcResult > 0 ? calcResult : undefined)}
                  disabled={abschlagCreating || finalBetrag <= 0}
                  className="flex-1 py-2.5 rounded-xl bg-foreground text-background text-sm font-bold hover:opacity-90 disabled:opacity-50">
                  {abschlagCreating ? "Erstelle..." : "Weiter"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
