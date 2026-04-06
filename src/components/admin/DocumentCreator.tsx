import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, FileText, X, Download, Send, ChevronDown, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface DocumentPosition {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total: number;
}

export interface DocumentData {
  id?: string;
  type: "Angebot" | "Rechnung" | "Auftragsbestätigung" | "Abschlagsrechnung";
  document_number: string;
  document_date: string;
  due_date?: string;
  intro_text: string;
  closing_text: string;
  tax_rate: number;
  subtotal: number;
  tax_amount: number;
  total: number;
  file_url?: string;
  created_at?: string;
}

interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  rechnungs_strasse?: string;
  rechnungs_ort?: string;
  rechnungs_plz?: string;
  rechnungs_land?: string;
}

interface DocumentCreatorProps {
  customerId: string | null;
  eventId?: string | null;
  requestId?: string | null;
  customer: Customer | null;
  onDocumentSaved: (doc: DocumentData & { positions?: DocumentPosition[] }) => void;
  onClose: () => void;
  existingDoc?: (DocumentData & { positions?: DocumentPosition[] }) | null;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const UNITS = ["Pauschal", "Stk.", "Std.", "Tag", "m²", "m"];

const TYPE_PREFIXES: Record<string, string> = {
  Angebot: "AN",
  Rechnung: "RE",
  Auftragsbestätigung: "AB",
  Abschlagsrechnung: "AR",
};

const DEFAULT_INTROS: Record<string, string> = {
  Angebot:
    "vielen Dank für dein Interesse! Hiermit unterbreite ich dir folgendes unverbindliches Angebot:",
  Rechnung:
    "vielen Dank für deinen Auftrag! Ich berechne dir folgende Leistungen:",
  Auftragsbestätigung:
    "vielen Dank für deine Buchung! Ich bestätige hiermit folgende vereinbarte Leistungen:",
  Abschlagsrechnung:
    "ich berechne dir folgende Abschlagsrechnung für die vereinbarten Leistungen:",
};

const DEFAULT_CLOSINGS: Record<string, string> = {
  Angebot:
    "Dieses Angebot ist 30 Tage gültig. Bei Fragen stehe ich gerne zur Verfügung.",
  Rechnung:
    "Bitte überweise den Betrag innerhalb von 14 Tagen auf mein Konto. Vielen Dank!",
  Auftragsbestätigung:
    "Ich freue mich auf unser gemeinsames Event! Bei Rückfragen melde dich jederzeit.",
  Abschlagsrechnung:
    "Bitte überweise den Teilbetrag innerhalb von 14 Tagen. Vielen Dank!",
};

const formatCurrency = (v: number) =>
  v.toLocaleString("de-DE", { style: "currency", currency: "EUR" });

const today = () => new Date().toISOString().split("T")[0];

const addDays = (dateStr: string, days: number) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const newPosition = (): DocumentPosition => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  unit: "Pauschal",
  unit_price: 0,
  total: 0,
});

// ─────────────────────────────────────────────
// PDF Generation
// ─────────────────────────────────────────────

function generatePDF(
  doc: DocumentData,
  positions: DocumentPosition[],
  customer: Customer | null
): jsPDF {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const marginL = 20;
  const marginR = 20;
  const contentW = W - marginL - marginR;

  // ── Colors ──
  const black = "#0a0a0a";
  const gray = "#71717a";
  const lightGray = "#f4f4f5";
  const borderGray = "#e4e4e7";
  const white = "#ffffff";

  const rgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  let y = 0;

  // ── Header bar ──
  pdf.setFillColor(...rgb(black));
  pdf.rect(0, 0, W, 28, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(...rgb(white));
  pdf.text("Emilian Leber", marginL, 12);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(...rgb(gray));
  pdf.text("Zauberer & Showkünstler", marginL, 18);
  pdf.text("el@magicel.de · magicel.de", marginL, 23);

  // gradient accent bar simulation (solid purple line)
  pdf.setFillColor(99, 102, 241); // indigo
  pdf.rect(marginL, 26, 20, 1.5, "F");

  y = 40;

  // ── Document title ──
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(...rgb(black));
  pdf.text(doc.type, marginL, y);

  // ── Document number + date block (right side) ──
  const rightX = W - marginR;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...rgb(gray));

  const metaLines: [string, string][] = [
    ["Nr.:", doc.document_number],
    ["Datum:", new Date(doc.document_date).toLocaleDateString("de-DE")],
  ];
  if (doc.due_date) {
    metaLines.push(["Fällig:", new Date(doc.due_date).toLocaleDateString("de-DE")]);
  }

  metaLines.forEach(([label, value], i) => {
    pdf.setTextColor(...rgb(gray));
    pdf.text(label, rightX - 50, y - 4 + i * 5);
    pdf.setTextColor(...rgb(black));
    pdf.setFont("helvetica", "bold");
    pdf.text(value, rightX, y - 4 + i * 5, { align: "right" });
    pdf.setFont("helvetica", "normal");
  });

  y += 10;

  // ── Divider ──
  pdf.setDrawColor(...rgb(borderGray));
  pdf.setLineWidth(0.3);
  pdf.line(marginL, y, W - marginR, y);
  y += 8;

  // ── Customer address ──
  if (customer) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.setTextColor(...rgb(black));
    pdf.text("An:", marginL, y);
    y += 5;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    const addrLines = [
      customer.company || customer.name,
      ...(customer.company ? [customer.name] : []),
      customer.rechnungs_strasse || "",
      [customer.rechnungs_plz, customer.rechnungs_ort].filter(Boolean).join(" "),
      customer.rechnungs_land || "",
    ].filter(Boolean);

    addrLines.forEach((line) => {
      pdf.text(line, marginL + 10, y);
      y += 5;
    });
    y += 4;
  }

  // ── Intro text ──
  if (doc.intro_text) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(...rgb(gray));
    const introLines = pdf.splitTextToSize(
      `Hallo ${customer?.name?.split(" ")[0] || ""},\n\n${doc.intro_text}`,
      contentW
    );
    introLines.forEach((line: string) => {
      pdf.text(line, marginL, y);
      y += 5;
    });
    y += 4;
  }

  // ── Table header ──
  const colWidths = [8, contentW - 8 - 18 - 22 - 18 - 24, 18, 22, 18, 24];
  // Pos | Beschreibung | Menge | Einheit | EP | Gesamt
  const colX = [marginL];
  colWidths.forEach((w, i) => {
    if (i > 0) colX.push(colX[i - 1] + colWidths[i - 1]);
  });

  pdf.setFillColor(...rgb(black));
  pdf.rect(marginL, y, contentW, 7, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(...rgb(white));
  const headers = ["Pos", "Beschreibung", "Menge", "Einheit", "EP", "Gesamt"];
  headers.forEach((h, i) => {
    const isRight = i >= 2;
    if (isRight) {
      pdf.text(h, colX[i] + colWidths[i] - 2, y + 4.8, { align: "right" });
    } else {
      pdf.text(h, colX[i] + 2, y + 4.8);
    }
  });
  y += 7;

  // ── Table rows ──
  positions.forEach((pos, idx) => {
    const isEven = idx % 2 === 0;
    if (isEven) {
      pdf.setFillColor(...rgb(lightGray));
      pdf.rect(marginL, y, contentW, 7, "F");
    }

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(...rgb(black));

    // Pos
    pdf.text(String(idx + 1), colX[0] + 2, y + 4.8);
    // Description (truncate if needed)
    const descLines = pdf.splitTextToSize(pos.description, colWidths[1] - 3);
    const rowH = Math.max(7, descLines.length * 4.5 + 2.5);
    if (descLines.length > 1 && isEven) {
      pdf.setFillColor(...rgb(lightGray));
      pdf.rect(marginL, y, contentW, rowH, "F");
    }
    descLines.forEach((line: string, li: number) => {
      pdf.text(line, colX[1] + 2, y + 4.8 + li * 4.5);
    });
    // Menge
    pdf.text(
      pos.quantity.toLocaleString("de-DE", { maximumFractionDigits: 3 }),
      colX[2] + colWidths[2] - 2,
      y + 4.8,
      { align: "right" }
    );
    // Einheit
    pdf.text(pos.unit, colX[3] + colWidths[3] - 2, y + 4.8, { align: "right" });
    // Einzelpreis
    pdf.text(formatCurrency(pos.unit_price), colX[4] + colWidths[4] - 2, y + 4.8, {
      align: "right",
    });
    // Gesamt
    pdf.setFont("helvetica", "bold");
    pdf.text(formatCurrency(pos.total), colX[5] + colWidths[5] - 2, y + 4.8, {
      align: "right",
    });

    y += rowH;
  });

  // ── Bottom line ──
  pdf.setDrawColor(...rgb(borderGray));
  pdf.setLineWidth(0.3);
  pdf.line(marginL, y, W - marginR, y);
  y += 6;

  // ── Totals block ──
  const totalsX = W - marginR - 70;
  const totalsLabelX = totalsX + 2;
  const totalsValueX = W - marginR - 2;

  const addTotalRow = (label: string, value: string, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...rgb(gray));
    pdf.text(label, totalsLabelX, y);
    pdf.setTextColor(...rgb(black));
    pdf.text(value, totalsValueX, y, { align: "right" });
    y += 5.5;
  };

  addTotalRow("Nettobetrag:", formatCurrency(doc.subtotal));
  if (doc.tax_rate > 0) {
    addTotalRow(`MwSt. (${doc.tax_rate}%):`, formatCurrency(doc.tax_amount));
  }

  // Total row with background
  pdf.setFillColor(...rgb(black));
  pdf.rect(totalsX - 2, y - 1, 70 + 2, 9, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...rgb(white));
  pdf.text("Gesamtbetrag:", totalsLabelX, y + 5.5);
  pdf.text(formatCurrency(doc.total), totalsValueX, y + 5.5, { align: "right" });
  y += 14;

  // ── Closing text ──
  if (doc.closing_text) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.setTextColor(...rgb(gray));
    const closingLines = pdf.splitTextToSize(doc.closing_text, contentW);
    closingLines.forEach((line: string) => {
      pdf.text(line, marginL, y);
      y += 5;
    });
    y += 4;
  }

  // ── Signature ──
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(...rgb(gray));
  pdf.text("Mit magischen Grüßen,", marginL, y);
  y += 5;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(...rgb(black));
  pdf.text("Emilian Leber", marginL, y);
  y += 4;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.5);
  pdf.setTextColor(...rgb(gray));
  pdf.text("Zauberer & Showkünstler · el@magicel.de · magicel.de", marginL, y);

  // ── Footer ──
  const pageH = 297;
  pdf.setFillColor(...rgb(lightGray));
  pdf.rect(0, pageH - 14, W, 14, "F");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(...rgb(gray));
  pdf.text(
    "© 2026 Emilian Leber · Regensburg · magicel.de · el@magicel.de",
    W / 2,
    pageH - 6,
    { align: "center" }
  );

  return pdf;
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

const DocumentCreator: React.FC<DocumentCreatorProps> = ({
  customerId,
  eventId,
  requestId,
  customer,
  onDocumentSaved,
  onClose,
  existingDoc,
}) => {
  const isEdit = !!existingDoc?.id;

  // ── State ──
  const [type, setType] = useState<DocumentData["type"]>(
    (existingDoc?.type as DocumentData["type"]) || "Angebot"
  );
  const [docNumber, setDocNumber] = useState(existingDoc?.document_number || "");
  const [docDate, setDocDate] = useState(existingDoc?.document_date || today());
  const [dueDate, setDueDate] = useState(existingDoc?.due_date || "");
  const [introText, setIntroText] = useState(existingDoc?.intro_text || "");
  const [closingText, setClosingText] = useState(existingDoc?.closing_text || "");
  const [taxRate, setTaxRate] = useState(existingDoc?.tax_rate ?? 19);
  const [positions, setPositions] = useState<DocumentPosition[]>(
    existingDoc?.positions ?? [newPosition()]
  );
  const [saving, setSaving] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [message, setMessage] = useState("");

  // Abschlagsrechnung
  const [abschlagsModus, setAbschlagsModus] = useState<"manuell" | "prozent" | "festbetrag">("manuell");
  const [abschlagsProzent, setAbschlagsProzent] = useState(50);
  const [abschlagsBetrag, setAbschlagsBetrag] = useState(0);
  const [quellDokTotal, setQuellDokTotal] = useState(0); // Gesamtbetrag des Quelldokuments

  // ── Abschlagsrechnung: Quelldokument laden und Positionen automatisch setzen ──
  useEffect(() => {
    if (type === "Abschlagsrechnung" && abschlagsModus !== "manuell") {
      // Lade Gesamtbetrag des letzten Angebots für diesen Kunden/Event
      const loadQuellTotal = async () => {
        const query = supabase
          .from("portal_documents")
          .select("total, document_number")
          .eq("type", "Angebot")
          .order("created_at", { ascending: false })
          .limit(1);
        if (eventId) query.eq("event_id", eventId);
        else if (requestId) query.eq("request_id", requestId);
        else if (customerId) query.eq("customer_id", customerId);

        const { data } = await query;
        if (data && data.length > 0) {
          const t = data[0].total || 0;
          setQuellDokTotal(t);
          const betrag = abschlagsModus === "prozent"
            ? Math.round((t * abschlagsProzent / 100) * 100) / 100
            : abschlagsBetrag;
          setPositions([{
            id: crypto.randomUUID(),
            description: abschlagsModus === "prozent"
              ? `Abschlagszahlung (${abschlagsProzent}% von ${data[0].document_number || "Angebot"})`
              : `Abschlagszahlung`,
            quantity: 1,
            unit: "Pauschal",
            unit_price: betrag,
            total: betrag,
          }]);
        }
      };
      loadQuellTotal();
    }
  }, [type, abschlagsModus, abschlagsProzent, abschlagsBetrag]);

  // Festbetrag-Modus: Position aktualisieren
  useEffect(() => {
    if (type === "Abschlagsrechnung" && abschlagsModus === "festbetrag" && abschlagsBetrag > 0) {
      setPositions([{
        id: crypto.randomUUID(),
        description: "Abschlagszahlung",
        quantity: 1,
        unit: "Pauschal",
        unit_price: abschlagsBetrag,
        total: abschlagsBetrag,
      }]);
    }
  }, [abschlagsBetrag, abschlagsModus]);

  // ── Auto-fill number + texts on type change ──
  useEffect(() => {
    if (!isEdit) {
      const prefix = TYPE_PREFIXES[type];
      const year = new Date().getFullYear();
      supabase
        .from("portal_documents")
        .select("document_number")
        .like("document_number", `${prefix}-${year}-%`)
        .order("document_number", { ascending: false })
        .limit(1)
        .then(({ data }) => {
          let seq = 1;
          if (data && data.length > 0 && data[0].document_number) {
            const parts = data[0].document_number.split("-");
            seq = parseInt(parts[parts.length - 1] || "0") + 1;
          }
          setDocNumber(`${prefix}-${year}-${String(seq).padStart(3, "0")}`);
        });

      setIntroText(DEFAULT_INTROS[type]);
      setClosingText(DEFAULT_CLOSINGS[type]);

      if (type === "Rechnung" || type === "Abschlagsrechnung") {
        setDueDate(addDays(docDate, 14));
      } else {
        setDueDate("");
      }
    }
  }, [type]);

  // ── Calculations ──
  const subtotal = positions.reduce((s, p) => s + p.total, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  // ── Position helpers ──
  const updatePosition = (id: string, field: keyof DocumentPosition, value: string | number) => {
    setPositions((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = { ...p, [field]: value };
        if (field === "quantity" || field === "unit_price") {
          updated.total = Number(updated.quantity) * Number(updated.unit_price);
        }
        return updated;
      })
    );
  };

  const addPosition = () => setPositions((prev) => [...prev, newPosition()]);
  const removePosition = (id: string) =>
    setPositions((prev) => prev.filter((p) => p.id !== id));

  // ── Save to DB ──
  const saveToDb = useCallback(async (): Promise<string | null> => {
    const docPayload = {
      customer_id: customerId,
      event_id: eventId || null,
      request_id: requestId || null,
      name: `${type} ${docNumber}`,
      type,
      document_number: docNumber,
      document_date: docDate,
      due_date: dueDate || null,
      intro_text: introText,
      closing_text: closingText,
      tax_rate: taxRate,
      subtotal,
      tax_amount: taxAmount,
      total,
      amount: total,
    };

    if (isEdit && existingDoc?.id) {
      const { error } = await supabase
        .from("portal_documents")
        .update(docPayload)
        .eq("id", existingDoc.id);
      if (error) throw error;

      // Replace positions
      await supabase.from("document_positions").delete().eq("document_id", existingDoc.id);
      const posPayload = positions.map((p, i) => ({
        document_id: existingDoc.id!,
        position: i + 1,
        description: p.description,
        quantity: p.quantity,
        unit: p.unit,
        unit_price: p.unit_price,
        total: p.total,
      }));
      const { error: posErr } = await supabase.from("document_positions").insert(posPayload);
      if (posErr) throw posErr;

      return existingDoc.id;
    } else {
      const { data: inserted, error } = await supabase
        .from("portal_documents")
        .insert(docPayload)
        .select("id")
        .single();
      if (error) throw error;

      const posPayload = positions.map((p, i) => ({
        document_id: inserted.id,
        position: i + 1,
        description: p.description,
        quantity: p.quantity,
        unit: p.unit,
        unit_price: p.unit_price,
        total: p.total,
      }));
      const { error: posErr } = await supabase.from("document_positions").insert(posPayload);
      if (posErr) throw posErr;

      return inserted.id;
    }
  }, [
    customerId, eventId, requestId, type, docNumber, docDate, dueDate,
    introText, closingText, taxRate, subtotal, taxAmount, total, positions,
    isEdit, existingDoc,
  ]);

  // ── Generate + Upload PDF ──
  const handleGeneratePdf = async () => {
    setGeneratingPdf(true);
    setMessage("");
    try {
      const docId = await saveToDb();
      if (!docId) throw new Error("Dokument konnte nicht gespeichert werden");

      const docMeta: DocumentData = {
        type, document_number: docNumber, document_date: docDate,
        due_date: dueDate, intro_text: introText, closing_text: closingText,
        tax_rate: taxRate, subtotal, tax_amount: taxAmount, total,
      };

      const pdf = generatePDF(docMeta, positions, customer);
      const pdfBlob = pdf.output("blob");

      const fileName = `${docNumber.replace(/\//g, "-")}.pdf`;
      const filePath = eventId
        ? `events/${eventId}/${fileName}`
        : `requests/${requestId}/${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from("portal-documents")
        .upload(filePath, pdfBlob, { contentType: "application/pdf", upsert: true });
      if (uploadErr) throw uploadErr;

      const { data: signed } = await supabase.storage
        .from("portal-documents")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365);

      if (signed?.signedUrl) {
        await supabase
          .from("portal_documents")
          .update({ file_url: signed.signedUrl })
          .eq("id", docId);
      }

      // Also trigger local download
      pdf.save(fileName);

      setMessage("✓ PDF erstellt & gespeichert");
      onDocumentSaved({
        ...docMeta,
        id: docId,
        file_url: signed?.signedUrl,
        positions,
      });
    } catch (e: unknown) {
      setMessage("Fehler: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setGeneratingPdf(false);
    }
  };

  // ── Save without PDF ──
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docId = await saveToDb();
      setMessage("✓ Gespeichert");
      onDocumentSaved({
        type, document_number: docNumber, document_date: docDate,
        due_date: dueDate, intro_text: introText, closing_text: closingText,
        tax_rate: taxRate, subtotal, tax_amount: taxAmount, total,
        id: docId ?? undefined, positions,
      });
    } catch (e: unknown) {
      setMessage("Fehler: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  };

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative z-10 h-full w-full max-w-2xl bg-background border-l border-border/40 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">
                {isEdit ? "Dokument bearbeiten" : "Dokument erstellen"}
              </h2>
              <p className="text-xs text-muted-foreground">{docNumber || "Nummer wird vergeben"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ── Type + Number + Dates ── */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dokumenttyp</h3>
            <div className="grid grid-cols-2 gap-2">
              {(["Angebot", "Rechnung", "Auftragsbestätigung", "Abschlagsrechnung"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    type === t
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background/60 text-foreground border-border/30 hover:border-border"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Nummer</label>
                <input
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Datum</label>
                <input
                  type="date"
                  value={docDate}
                  onChange={(e) => setDocDate(e.target.value)}
                  className="w-full rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm"
                />
              </div>
              {(type === "Rechnung" || type === "Abschlagsrechnung") && (
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Fällig am</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── Abschlagsrechnung Modus ── */}
          {type === "Abschlagsrechnung" && (
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/50 space-y-3">
              <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Abschlagsrechnung</h3>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { key: "prozent" as const, label: "Prozentual" },
                  { key: "festbetrag" as const, label: "Fester Betrag" },
                  { key: "manuell" as const, label: "Manuell" },
                ]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setAbschlagsModus(key)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      abschlagsModus === key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-foreground border-border/30 hover:border-blue-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {abschlagsModus === "prozent" && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={abschlagsProzent}
                    onChange={(e) => setAbschlagsProzent(Number(e.target.value) || 0)}
                    className="w-24 rounded-lg bg-white border border-border/30 px-3 py-2 text-sm text-right"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                  {quellDokTotal > 0 && (
                    <span className="text-xs text-muted-foreground">
                      = {formatCurrency(Math.round(quellDokTotal * abschlagsProzent / 100 * 100) / 100)} von {formatCurrency(quellDokTotal)}
                    </span>
                  )}
                </div>
              )}
              {abschlagsModus === "festbetrag" && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={abschlagsBetrag}
                    onChange={(e) => setAbschlagsBetrag(parseFloat(e.target.value) || 0)}
                    placeholder="Betrag in EUR"
                    className="w-40 rounded-lg bg-white border border-border/30 px-3 py-2 text-sm text-right"
                  />
                  <span className="text-sm text-muted-foreground">EUR</span>
                </div>
              )}
              {abschlagsModus === "manuell" && (
                <p className="text-xs text-muted-foreground">Positionen manuell eingeben.</p>
              )}
            </div>
          )}

          {/* ── Customer display ── */}
          {customer && (
            <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Empfänger</h3>
              <p className="text-sm font-medium text-foreground">{customer.name}</p>
              {customer.company && <p className="text-xs text-muted-foreground">{customer.company}</p>}
              <p className="text-xs text-muted-foreground">{customer.email}</p>
              {customer.rechnungs_strasse ? (
                <p className="text-xs text-muted-foreground mt-1">
                  {customer.rechnungs_strasse}, {customer.rechnungs_plz} {customer.rechnungs_ort}
                </p>
              ) : (
                <p className="text-xs text-amber-500 mt-1">⚠ Keine Rechnungsadresse hinterlegt</p>
              )}
            </div>
          )}

          {/* ── Intro text ── */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Einleitungstext</h3>
            <textarea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              rows={2}
              className="w-full rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm resize-none"
            />
          </div>

          {/* ── Line items ── */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Positionen</h3>
              <button
                onClick={addPosition}
                className="flex items-center gap-1.5 text-xs font-medium text-foreground bg-background/60 border border-border/30 rounded-lg px-2.5 py-1.5 hover:border-border"
              >
                <Plus className="w-3 h-3" /> Position hinzufügen
              </button>
            </div>

            {/* Column headers */}
            <div className="grid text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1"
              style={{ gridTemplateColumns: "1fr 80px 90px 70px 80px 28px" }}>
              <span>Beschreibung</span>
              <span className="text-right">Menge</span>
              <span className="text-right">Einheit</span>
              <span className="text-right">Preis</span>
              <span className="text-right">Gesamt</span>
              <span />
            </div>

            <div className="space-y-2">
              {positions.map((pos, idx) => (
                <div key={pos.id} className="grid gap-2 items-start"
                  style={{ gridTemplateColumns: "1fr 80px 90px 70px 80px 28px" }}>

                  {/* Description */}
                  <input
                    value={pos.description}
                    onChange={(e) => updatePosition(pos.id, "description", e.target.value)}
                    placeholder={`Position ${idx + 1}`}
                    className="rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm"
                  />

                  {/* Quantity */}
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={pos.quantity}
                    onChange={(e) => updatePosition(pos.id, "quantity", parseFloat(e.target.value) || 0)}
                    className="rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm text-right"
                  />

                  {/* Unit */}
                  <select
                    value={pos.unit}
                    onChange={(e) => updatePosition(pos.id, "unit", e.target.value)}
                    className="rounded-lg bg-background/60 border border-border/30 px-2 py-2 text-sm"
                  >
                    {UNITS.map((u) => <option key={u}>{u}</option>)}
                  </select>

                  {/* Unit price */}
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={pos.unit_price}
                    onChange={(e) => updatePosition(pos.id, "unit_price", parseFloat(e.target.value) || 0)}
                    className="rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm text-right"
                  />

                  {/* Total (read-only) */}
                  <div className="rounded-lg bg-muted/40 border border-border/20 px-3 py-2 text-sm text-right font-medium text-foreground">
                    {formatCurrency(pos.total)}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removePosition(pos.id)}
                    disabled={positions.length === 1}
                    className="flex items-center justify-center h-[38px] rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 disabled:opacity-30 border border-transparent hover:border-red-500/20 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tax + Totals ── */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Steuer & Summe</h3>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">MwSt.:</span>
              {([0, 7, 19] as const).map((rate) => (
                <button
                  key={rate}
                  onClick={() => setTaxRate(rate)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    taxRate === rate
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background/60 text-foreground border-border/30 hover:border-border"
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Netto</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">MwSt. ({taxRate}%)</span>
                  <span className="font-medium">{formatCurrency(taxAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold pt-1 border-t border-border/30">
                <span>Gesamt</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* ── Closing text ── */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border/30 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Abschlusstext</h3>
            <textarea
              value={closingText}
              onChange={(e) => setClosingText(e.target.value)}
              rows={2}
              className="w-full rounded-lg bg-background/60 border border-border/30 px-3 py-2 text-sm resize-none"
            />
          </div>

        </div>

        {/* Footer actions */}
        <div className="shrink-0 px-6 py-4 border-t border-border/30 bg-background">
          {message && (
            <p className={`text-xs mb-3 ${message.startsWith("✓") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || generatingPdf}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border/40 bg-muted/30 px-4 py-2.5 text-sm font-medium hover:bg-muted/60 disabled:opacity-50"
            >
              {saving ? "Speichern…" : "Speichern"}
            </button>
            <button
              onClick={handleGeneratePdf}
              disabled={saving || generatingPdf || !positions.some(p => p.description)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-sm font-bold hover:bg-foreground/90 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {generatingPdf ? "PDF wird erstellt…" : "PDF erstellen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCreator;
