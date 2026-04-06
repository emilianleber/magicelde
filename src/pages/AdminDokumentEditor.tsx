import { useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService, reserviereNummer } from "@/services/dokumenteService";
import type { DokumentTyp } from "@/types/dokumente";
import type { Artikel } from "@/types/dokumente";
import { ArrowLeft, ChevronDown, ChevronUp, Download, Eye, Save, Send, Trash2, X } from "lucide-react";
import RichTextEditor, { textToHtml, htmlToText } from "@/components/admin/RichTextEditor";

// ── Types ─────────────────────────────────────────────────────────────────────

interface LocalPosition {
  id: string;
  typ: "leistung" | "text" | "zwischensumme";
  bezeichnung: string;
  beschreibung: string;
  menge: number;
  einheit: string;
  einzelpreis: number;
  mwstSatz: number;
  rabattProzent: number | null;
  gesamt: number;
  optional?: boolean;
}

const newPosition = (): LocalPosition => ({
  id: crypto.randomUUID(),
  typ: "leistung",
  bezeichnung: "",
  beschreibung: "",
  menge: 1,
  einheit: "pauschal",
  einzelpreis: 0,
  mwstSatz: 0,
  rabattProzent: null,
  gesamt: 0,
  optional: false,
});

// ── Constants ─────────────────────────────────────────────────────────────────

const FARBEN = [
  { id: 1, name: "Regenbogen", value: "linear-gradient(135deg, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)", hex: "#6366f1" },
  { id: 2, name: "Schwarz", value: "#0a0a0a", hex: "#0a0a0a" },
  { id: 3, name: "Grau", value: "#6b7280", hex: "#6b7280" },
  { id: 4, name: "Petrol", value: "#0d9488", hex: "#0d9488" },
  { id: 5, name: "Blau", value: "#2563eb", hex: "#2563eb" },
  { id: 6, name: "Violett", value: "#7c3aed", hex: "#7c3aed" },
  { id: 7, name: "Rot", value: "#dc2626", hex: "#dc2626" },
  { id: 8, name: "Orange", value: "#ea580c", hex: "#ea580c" },
  { id: 9, name: "Gelb", value: "#ca8a04", hex: "#ca8a04" },
  { id: 10, name: "Pink", value: "#ec4899", hex: "#ec4899" },
  { id: 11, name: "Khaki", value: "#78716c", hex: "#78716c" },
  { id: 12, name: "Braun", value: "#78350f", hex: "#78350f" },
];

const LAYOUTS = [
  { id: 1,  name: "Klassisch",      desc: "Logo oben rechts, klare Linie" },
  { id: 2,  name: "Farbstreifen",   desc: "Dünner Akzentstreifen oben" },
  { id: 3,  name: "Farbkopf",       desc: "Voller farbiger Kopfbereich" },
  { id: 6,  name: "Dark Premium",   desc: "Eleganter dunkler Kopf" },
  { id: 9,  name: "Minimal",        desc: "Ultra-minimal, viel Weißraum" },
];

const TYP_LABEL: Record<string, string> = {
  angebot: "Angebot",
  rechnung: "Rechnung",
  abschlagsrechnung: "Abschlagsrechnung",
  schlussrechnung: "Schlussrechnung",
  auftragsbestaetigung: "Auftragsbestätigung",
  mahnung: "Mahnung",
  gutschrift: "Gutschrift",
  stornorechnung: "Stornorechnung",
};

function today() {
  return new Date().toISOString().split("T")[0];
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

// ── LayoutThumbnail ───────────────────────────────────────────────────────────

function LayoutThumbnail({ layoutId, color }: { layoutId: number; color: string }) {
  const lines = (n: number, w = "full", opacity = 1) =>
    Array.from({ length: n }).map((_, i) => (
      <div key={i} className={`h-0.5 bg-gray-${opacity < 1 ? "100" : "200"} rounded w-${w}`} />
    ));

  switch (layoutId) {
    /* 1 – Klassisch */
    case 1:
      return (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="w-full h-3.5" style={{ backgroundColor: color }} />
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="space-y-0.5">{lines(3)}</div>
              <div className="space-y-0.5 text-right">{lines(3)}</div>
            </div>
            <div className="h-1.5 rounded mt-0.5" style={{ backgroundColor: "#111" }} />
            <div className="space-y-0.5">{lines(3, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 2 – Wave Dark */
    case 2:
      return (
        <div className="w-full h-full bg-white flex flex-col overflow-hidden">
          <div className="relative h-5" style={{ backgroundColor: "#111" }}>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white" style={{ borderRadius: "60% 60% 0 0" }} />
            <div className="absolute right-1 top-1 w-2 h-2 rounded bg-white/20" />
            <div className="w-1 h-1 rounded-full absolute left-1 top-1" style={{ backgroundColor: color }} />
          </div>
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="flex justify-between">{lines(2)}{lines(2)}</div>
            <div className="h-1 rounded mt-0.5" style={{ backgroundColor: color }} />
            <div className="space-y-0.5">{lines(3, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 3 – Split */
    case 3:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex justify-between items-end">
            <div className="font-bold text-[6px]" style={{ color }}>EM</div>
            <div className="space-y-0.5">{lines(2)}</div>
          </div>
          <div className="h-px w-full" style={{ backgroundColor: color }} />
          <div className="flex justify-between">
            <div className="space-y-0.5">{lines(3)}</div>
            <div className="space-y-0.5">{lines(3)}</div>
          </div>
          <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
        </div>
      );
    /* 4 – Retro */
    case 4:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="space-y-0.5">
            <div className="h-0.5 bg-gray-800 rounded w-full" />
            <div className="h-0.5 bg-gray-200 rounded w-3/4" />
            <div className="h-0.5 bg-gray-800 rounded w-full" />
          </div>
          <div className="flex justify-between mt-0.5">
            <div className="space-y-0.5">{lines(2)}</div>
            <div className="space-y-0.5">{lines(2)}</div>
          </div>
          <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
        </div>
      );
    /* 5 – Seitenstreifen */
    case 5:
      return (
        <div className="w-full h-full bg-white flex">
          <div className="w-2 h-full" style={{ backgroundColor: color }} />
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="space-y-0.5">{lines(3)}</div>
              <div className="space-y-0.5">{lines(2)}</div>
            </div>
            <div className="space-y-0.5 mt-1">{lines(3, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 6 – Dark Premium */
    case 6:
      return (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="p-1 flex justify-between items-center" style={{ backgroundColor: "#111" }}>
            <div className="space-y-0.5">
              <div className="h-0.5 bg-white/70 rounded w-8" />
              <div className="h-0.5 bg-white/30 rounded w-5" />
            </div>
            <div className="w-3 h-2 rounded bg-white/20" />
          </div>
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="space-y-0.5">{lines(3)}</div>
              <div className="space-y-0.5">{lines(3)}</div>
            </div>
            <div className="h-1 rounded mt-0.5" style={{ backgroundColor: color }} />
            <div className="space-y-0.5">{lines(2, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 7 – Corporate */
    case 7:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex flex-col items-center gap-0.5 pb-1 border-b" style={{ borderColor: color }}>
            <div className="w-4 h-2 rounded bg-gray-200" />
            <div className="h-0.5 bg-gray-300 rounded w-10" />
          </div>
          <div className="flex justify-between mt-0.5">
            <div className="space-y-0.5">{lines(3)}</div>
            <div className="space-y-0.5">{lines(3)}</div>
          </div>
          <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
        </div>
      );
    /* 8 – Kreativ */
    case 8:
      return (
        <div className="w-full h-full bg-white flex flex-col overflow-hidden">
          <div className="relative h-4 overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundColor: "#f5f5f5" }} />
            <div className="absolute top-0 left-0 w-2/3 h-full" style={{ backgroundColor: color, clipPath: "polygon(0 0, 80% 0, 60% 100%, 0 100%)" }} />
            <div className="absolute inset-0 flex items-center px-1">
              <div className="h-0.5 bg-white rounded w-5" />
            </div>
          </div>
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="space-y-0.5">{lines(3)}</div>
              <div className="space-y-0.5">{lines(2)}</div>
            </div>
            <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 9 – Skandinavisch */
    case 9:
      return (
        <div className="w-full h-full bg-white p-1.5 flex flex-col gap-1.5">
          <div className="flex justify-between items-start">
            <div className="h-0.5 w-5 rounded" style={{ backgroundColor: color }} />
            <div className="h-0.5 bg-gray-300 rounded w-3" />
          </div>
          <div className="flex justify-between">
            <div className="space-y-1">{lines(2)}</div>
            <div className="space-y-1">{lines(2)}</div>
          </div>
          <div className="space-y-1 mt-auto">{lines(2, "full", 0.5)}</div>
        </div>
      );
    /* 10 – Luxus */
    case 10:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="h-px w-full" style={{ backgroundColor: color }} />
          <div className="flex justify-between py-0.5">
            <div className="space-y-0.5">{lines(2)}</div>
            <div className="space-y-0.5">{lines(2)}</div>
          </div>
          <div className="h-px w-full" style={{ backgroundColor: color }} />
          <div className="flex justify-between mt-0.5">
            <div className="space-y-0.5">{lines(3)}</div>
            <div className="space-y-0.5">{lines(3)}</div>
          </div>
          <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
        </div>
      );
    /* 11 – Rahmen */
    case 11:
      return (
        <div className="w-full h-full bg-white p-0.5">
          <div className="w-full h-full border-2 p-1 flex flex-col gap-1" style={{ borderColor: color }}>
            <div className="flex justify-between">
              <div className="space-y-0.5">{lines(2)}</div>
              <div className="space-y-0.5">{lines(2)}</div>
            </div>
            <div className="h-px w-full" style={{ backgroundColor: color }} />
            <div className="space-y-0.5">{lines(3, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 12 – Technik */
    case 12:
      return (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="flex" style={{ borderBottom: `2px solid ${color}` }}>
            <div className="flex-1 p-1" style={{ backgroundColor: color + "15" }}>
              <div className="h-0.5 bg-gray-400 rounded w-8 mb-0.5" />
              <div className="h-0.5 bg-gray-300 rounded w-5" />
            </div>
            <div className="p-1 space-y-0.5">
              <div className="h-0.5 bg-gray-200 rounded w-7" />
              <div className="h-0.5 bg-gray-200 rounded w-5" />
            </div>
          </div>
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="space-y-0.5">{lines(3, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 13 – Pfeile */
    case 13:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex items-center gap-0.5 text-[5px]">
            <span className="font-bold" style={{ color }}>E</span>
            <span className="text-gray-300">→</span>
            <span className="text-gray-400">Str.</span>
            <span className="text-gray-300">→</span>
            <span className="text-gray-400">Stadt</span>
          </div>
          <div className="flex justify-between mt-0.5">
            <div className="space-y-0.5">{lines(3)}</div>
            <div className="space-y-0.5">{lines(3)}</div>
          </div>
          <div className="h-px mt-0.5" style={{ backgroundColor: color }} />
          <div className="space-y-0.5">{lines(2, "full", 0.5)}</div>
        </div>
      );
    /* 14 – Panorama */
    case 14:
      return (
        <div className="w-full h-full bg-white flex flex-col">
          <div className="h-5 flex items-center justify-between px-1" style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}>
            <div className="space-y-0.5">
              <div className="h-0.5 bg-white/80 rounded w-6" />
              <div className="h-0.5 bg-white/40 rounded w-4" />
            </div>
            <div className="space-y-0.5 text-right">
              <div className="h-0.5 bg-white/60 rounded w-5" />
              <div className="h-0.5 bg-white/30 rounded w-4" />
            </div>
          </div>
          <div className="flex-1 p-1 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="space-y-0.5">{lines(3)}</div>
              <div className="space-y-0.5">{lines(2)}</div>
            </div>
            <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
          </div>
        </div>
      );
    /* 15 – Initialen */
    case 15:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[7px] font-black shrink-0" style={{ backgroundColor: color }}>E</div>
            <div className="flex-1">
              <div className="h-0.5 bg-gray-300 rounded w-full mb-0.5" />
              <div className="h-0.5 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          <div className="flex justify-between mt-0.5">
            <div className="space-y-0.5">{lines(3)}</div>
            <div className="space-y-0.5">{lines(3)}</div>
          </div>
          <div className="space-y-0.5 mt-1">{lines(2, "full", 0.5)}</div>
        </div>
      );
    default:
      return <div className="w-full h-full bg-gray-100" />;
  }
}

// ── DocumentPreview ───────────────────────────────────────────────────────────

interface PreviewProps {
  layoutId: number;
  color: string;
  colorGradient: string;
  typ: string;
  nummer: string;
  datum: string;
  faelligAm: string;
  gueltigBis: string;
  lieferdatum: string;
  empfaengerName: string;
  empfaengerFirma: string;
  empfaengerKundennummer: string;
  empfaengerAnrede: string;
  empfaengerAdresse: string;
  empfaengerPlz: string;
  empfaengerOrt: string;
  empfaengerLand: string;
  kopftext: string;
  fusstext: string;
  positionen: LocalPosition[];
  mwstSatz: number;
  kleinunternehmer: boolean;
  rabattProzent: number | null;
  absenderName: string;
  absenderUntertitel: string;
  absenderAdresse: string;
  absenderPlz: string;
  absenderOrt: string;
  absenderEmail: string;
  absenderTel: string;
  absenderWebsite: string;
  absenderIban: string;
  absenderBic: string;
  absenderSteuernummer: string;
  absenderInhaber: string;
  absenderLand: string;
  logoUrl: string;
}

interface SummenResult {
  netto: number;
  gesamtRabatt: number;
  mwstBetrag: number;
  brutto: number;
}

function calcSummen(positionen: LocalPosition[], mwstSatz: number, kleinunternehmer: boolean, rabattProzent: number | null): SummenResult {
  let netto = 0;
  for (const p of positionen) {
    if (p.typ !== "leistung") continue;
    const base = p.menge * p.einzelpreis;
    const rabatt = p.rabattProzent ? base * (p.rabattProzent / 100) : 0;
    netto += base - rabatt;
  }
  const gesamtRabatt = rabattProzent ? netto * (rabattProzent / 100) : 0;
  const nettoNachRabatt = netto - gesamtRabatt;
  const mwstBetrag = kleinunternehmer ? 0 : nettoNachRabatt * (mwstSatz / 100);
  const brutto = nettoNachRabatt + mwstBetrag;
  return { netto: nettoNachRabatt, gesamtRabatt, mwstBetrag, brutto };
}

function fmt(n: number) {
  return n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

function DocumentPreview(props: PreviewProps) {
  const {
    layoutId, color, typ, nummer, datum, faelligAm, gueltigBis, lieferdatum,
    empfaengerName, empfaengerFirma, empfaengerKundennummer, empfaengerAnrede, empfaengerAdresse, empfaengerPlz, empfaengerOrt, empfaengerLand,
    kopftext, fusstext, positionen, mwstSatz, kleinunternehmer, rabattProzent,
    absenderName, absenderUntertitel, absenderAdresse, absenderPlz, absenderOrt,
    absenderEmail, absenderTel, absenderWebsite, absenderIban, absenderBic, absenderSteuernummer,
    absenderInhaber, absenderLand, logoUrl,
  } = props;

  const summen = calcSummen(positionen, mwstSatz, kleinunternehmer, rabattProzent);
  const typLabel = TYP_LABEL[typ] || typ;
  const initials = (absenderName || "E").charAt(0).toUpperCase();

  const font = "Inter, system-ui, -apple-system, sans-serif";

  // A4 proportions for 595px wide container
  const M = 40;   // horizontal margin ≈ 14mm (breiter Content)
  const LS = 68;  // logo square size

  const isAngebot = typ === "angebot";
  const isRechnung = ["rechnung", "abschlagsrechnung", "schlussrechnung", "mahnung", "gutschrift", "stornorechnung"].includes(typ);
  const metaRows = [
    { label: `${typLabel}-Nr.`,    val: nummer     || "—" },
    { label: "Datum",              val: datum       || "—" },
    ...(gueltigBis && isAngebot  ? [{ label: "Gültig bis",     val: gueltigBis }]  : []),
    ...(lieferdatum && isRechnung ? [{ label: "Lieferdatum",    val: lieferdatum }] : []),
    ...(faelligAm && isRechnung   ? [{ label: "Zahlungsziel",   val: faelligAm }]   : []),
    ...(gueltigBis && !isAngebot  ? [{ label: "Gültig bis",     val: gueltigBis }]  : []),
    { label: "Ihre Kundennummer",  val: empfaengerKundennummer || "—" },
    { label: "Ihr Ansprechpartner",val: absenderName },
  ];

  const leistungPos = positionen.filter(p => p.typ === "leistung");

  // Keine manuelle Pagination — Content fließt natürlich, Seitenumbruch via CSS beim Drucken

  // ── Logo helper (inline – kein eigenes absolute positioning) ─────────────
  const LogoImg = ({ dark = false, size = LS }: { dark?: boolean; size?: number }) => {
    if (logoUrl) {
      return <img src={logoUrl} style={{ width: size, height: size, objectFit: "contain", borderRadius: 4, display: "block" }} alt="Logo" />;
    }
    return (
      <div style={{ width: size, height: size, borderRadius: 6, backgroundColor: dark ? "rgba(255,255,255,0.14)" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 8, color: dark ? "rgba(255,255,255,0.45)" : "#ccc", fontWeight: 600 }}>LOGO</span>
      </div>
    );
  };

  // Rechte Kopfspalte: Logo oben, Kontaktinfo darunter (kein Overlap)
  const RightCol = ({ dark = false, kontC = "#999", top = 22, right = M }: { dark?: boolean; kontC?: string; top?: number; right?: number }) => (
    <div style={{ position: "absolute", top, right, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
      <LogoImg dark={dark} />
      <KontBlock c={kontC} />
    </div>
  );

  // ── Sender text blocks ────────────────────────────────────────────────────
  const AbsBlock = ({ nameC = "#111", subC = "#666", addrC = "#888" }: { nameC?: string; subC?: string; addrC?: string }) => (
    <div>
      <div style={{ fontSize: 15, fontWeight: 700, color: nameC, lineHeight: 1.25 }}>{absenderName}</div>
      {absenderUntertitel && <div style={{ fontSize: 10, color: subC, marginTop: 2 }}>{absenderUntertitel}</div>}
      <div style={{ fontSize: 9.5, color: addrC, marginTop: 4, lineHeight: 1.5 }}>
        {absenderAdresse && <div>{absenderAdresse}</div>}
        {(absenderPlz || absenderOrt) && <div>{absenderPlz} {absenderOrt}</div>}
      </div>
    </div>
  );

  const KontBlock = ({ c = "#888" }: { c?: string }) => (
    <div style={{ fontSize: 9, color: c, lineHeight: 1.65, textAlign: "right" }}>
      {absenderTel     && <div>{absenderTel}</div>}
      {absenderEmail   && <div>{absenderEmail}</div>}
      {absenderWebsite && <div>{absenderWebsite}</div>}
    </div>
  );

  // ── DIN body helpers ─────────────────────────────────────────────────────
  const renderDINTop = () => (
    <>
      {/* Zone B: Anschriftfeld + Informationsblock */}
      <div style={{ padding: `36px ${M}px 16px`, display: "flex", gap: 40, alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 46%", fontSize: 10, lineHeight: 1.55, color: "#222", minHeight: 127 }}>
          <div style={{ fontSize: 8, color: "#aaa", borderBottom: "0.5px solid #e0e0e0", paddingBottom: 3, marginBottom: 9, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {[absenderName, absenderAdresse, `${absenderPlz} ${absenderOrt}`.trim()].filter(Boolean).join(" – ")}
          </div>
          {empfaengerFirma && <div style={{ fontWeight: 600, color: "#111" }}>{empfaengerFirma}</div>}
          <div style={{ color: "#111" }}>{empfaengerAnrede ? `${empfaengerAnrede === "Herr" ? "Herrn" : empfaengerAnrede} ` : ""}{empfaengerName || <span style={{ color: "#ccc" }}>Empfänger Name</span>}</div>
          {empfaengerAdresse && <div>{empfaengerAdresse}</div>}
          {(empfaengerPlz || empfaengerOrt) && <div>{empfaengerPlz} {empfaengerOrt}</div>}
          {empfaengerLand && empfaengerLand !== "Deutschland" && <div>{empfaengerLand}</div>}
        </div>
        <div style={{ flex: 1, fontSize: 9.5, lineHeight: 1.7 }}>
          {metaRows.map(r => (
            <div key={r.label} style={{ display: "flex", gap: 6 }}>
              <div style={{ color: "#999", minWidth: 120, flexShrink: 0 }}>{r.label}</div>
              <div style={{ fontWeight: 600, color: "#111" }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 22 }} />
      {/* Zone C: Betreff */}
      <div style={{ padding: `0 ${M}px 6px` }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{typLabel}{nummer ? ` ${nummer}` : ""}</div>
      </div>
      {kopftext && (
        <div style={{ padding: `0 ${M}px 8px`, fontSize: 10, color: "#333", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: textToHtml(kopftext) }} />
      )}
    </>
  );

  const renderPositionsBlock = (chunk: LocalPosition[], thBg: string, thColor: string, globalOffset = 0) => (
    <div style={{ padding: `0 ${M}px` }}>
      <div style={{ display: "flex", backgroundColor: thBg, color: thColor, padding: "5px 8px", fontSize: 9, fontWeight: 700 }}>
        <span style={{ width: 30 }}>Pos.</span>
        <span style={{ flex: 4 }}>Beschreibung</span>
        <span style={{ width: 72, textAlign: "right" }}>Menge</span>
        <span style={{ width: 72, textAlign: "right" }}>Einzelpreis</span>
        <span style={{ width: 78, textAlign: "right" }}>Gesamtpreis</span>
      </div>
      {chunk.length === 0 ? (
        <div style={{ padding: "6px 8px", fontSize: 9, color: "#ccc", borderBottom: "0.5px solid #eee" }}>Noch keine Positionen</div>
      ) : chunk.map((pos, i) => (
        <div key={pos.id}>
          <div style={{ display: "flex", padding: "5px 8px", backgroundColor: i % 2 === 0 ? "#f8f8f8" : "#fff", fontSize: 9.5 }}>
            <span style={{ width: 30, color: pos.optional ? "#6b9bd2" : "#999" }}>{pos.optional ? "Opt." : `${globalOffset + i + 1}.`}</span>
            <div style={{ flex: 4 }}>
              <div style={{ fontWeight: pos.bezeichnung ? 600 : 400, color: pos.bezeichnung ? "#111" : "#ccc" }}>{pos.bezeichnung || "(keine Bezeichnung)"}</div>
              {pos.beschreibung && <div style={{ fontSize: 8.5, color: "#777", lineHeight: 1.45, whiteSpace: "pre-wrap" }}>{pos.beschreibung}</div>}
            </div>
            <span style={{ width: 72, textAlign: "right", color: "#555" }}>{pos.menge % 1 === 0 ? pos.menge : pos.menge.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 2 })} {pos.einheit}</span>
            <span style={{ width: 72, textAlign: "right", color: "#555" }}>{fmt(pos.einzelpreis)}</span>
            <span style={{ width: 78, textAlign: "right", fontWeight: 600, color: "#111" }}>{fmt(pos.gesamt)}</span>
          </div>
          {i < chunk.length - 1 && <div style={{ height: "0.5px", backgroundColor: "#ebebeb", margin: "0 6px" }} />}
        </div>
      ))}
      <div style={{ height: "0.75px", backgroundColor: "#ccc", marginTop: 1 }} />
    </div>
  );

  const totalPages = 1; // CSS-basiert, nur 1 Container

  // DIN 5008 Fußzeile – fix am Seitenende (842px)
  const renderDINFooter = (_pageNum: number) => (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff" }}>
      <div style={{ margin: `0 ${M}px`, borderTop: "0.5px solid #d4d4d8", paddingTop: 8, paddingBottom: 10 }}>
        {totalPages > 1 && (
          <div style={{ textAlign: "right", fontSize: 6.5, color: "#a1a1aa", marginBottom: 5 }}>
            Seite {pageNum} von {totalPages}
          </div>
        )}
        <div style={{ display: "flex", gap: 20, fontSize: 7.5, color: "#a1a1aa", lineHeight: 1.65 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#71717a" }}>{absenderName}</div>
            {absenderUntertitel && <div>{absenderUntertitel}</div>}
            {absenderAdresse && <div>{absenderAdresse}</div>}
            {(absenderPlz || absenderOrt) && <div>{absenderPlz} {absenderOrt}</div>}
          </div>
          <div style={{ flex: 1 }}>
            {absenderTel     && <div>Tel.: {absenderTel}</div>}
            {absenderEmail   && <div>E-Mail: {absenderEmail}</div>}
            {absenderWebsite && <div>Web: {absenderWebsite}</div>}
          </div>
          <div style={{ flex: 1 }}>
            {absenderSteuernummer && <div>Steuer-Nr.: {absenderSteuernummer}</div>}
            {absenderInhaber      && <div>Inhaber: {absenderInhaber}</div>}
          </div>
          <div style={{ flex: 1 }}>
            {absenderIban && <div style={{ whiteSpace: "nowrap" }}>IBAN: {absenderIban}</div>}
            {absenderBic  && <div>BIC: {absenderBic}</div>}
          </div>
        </div>
      </div>
    </div>
  );

  // Hilfsfunktion: Betrag als "1.041,75 EUR"
  const fmtEur = (n: number) =>
    n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " EUR";

  // Summen – erscheint auf JEDER Seite, kumulativ bis inkl. dieser Seite
  const renderSummen = (chunk: LocalPosition[]) => {
    const s = calcSummen(chunk, mwstSatz, kleinunternehmer, rabattProzent);
    const rowBase: React.CSSProperties = {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "7px 10px", fontSize: 10,
    };
    return (
      <div style={{ margin: `4px ${M}px 0` }}>
        {/* Netto */}
        <div style={{ ...rowBase, backgroundColor: "#f0f0f0" }}>
          <span style={{ color: "#333" }}>Gesamtbetrag netto</span>
          <span style={{ color: "#111" }}>{fmtEur(s.netto)}</span>
        </div>
        {/* MwSt */}
        {!kleinunternehmer && mwstSatz > 0 && (
          <div style={{ ...rowBase, backgroundColor: "#fff" }}>
            <span style={{ color: "#555" }}>zzgl. {mwstSatz}% MwSt.</span>
            <span style={{ color: "#111" }}>{fmtEur(s.mwstBetrag)}</span>
          </div>
        )}
        {/* §19 */}
        {kleinunternehmer && (
          <div style={{ padding: "6px 10px", fontSize: 10, color: "#555" }}>
            Umsatzsteuer nicht erhoben gemäß §19UStG.
          </div>
        )}
        {/* Brutto */}
        <div style={{ ...rowBase, backgroundColor: "#f0f0f0", fontWeight: 700, fontSize: 11 }}>
          <span>Gesamtbetrag brutto</span>
          <span>{fmtEur(s.brutto)}</span>
        </div>
      </div>
    );
  };

  // Fußtext + Signatur – nur auf der letzten Seite
  const renderDINBottom = (pageNum: number) => (
    <>
      {fusstext && (
        <div style={{ padding: `8px ${M}px 4px`, fontSize: 10, color: "#333", lineHeight: 1.65 }}
          dangerouslySetInnerHTML={{ __html: textToHtml(fusstext) }} />
      )}
      {renderDINFooter(pageNum)}
    </>
  );

  // Body: DIN top + alle Positionen + Summen + Fußtext + Footer
  const renderBody = (thBg: string, thColor: string) => (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      {renderDINTop()}
      {renderPositionsBlock(leistungPos, thBg, thColor, 0)}
      {renderSummen(leistungPos)}
      {renderDINBottom(1)}
    </div>
  );

  // ── Page wrapper + multi-page renderer ───────────────────────────────────
  const PAGE_STYLE: React.CSSProperties = {
    width: "100%", minHeight: 842, position: "relative" as const,
    fontFamily: font, color: "#1a1a1a", display: "flex", flexDirection: "column",
    paddingBottom: 100, // Platz für den fix positionierten DIN-Footer
  };

  const page = (bg: string, header: React.ReactNode, thBg: string, thColor: string) => (
    <div style={{ ...PAGE_STYLE, backgroundColor: bg }}>
      {header}
      {renderBody(thBg, thColor)}
    </div>
  );

  // ── 15 Layout-Köpfe ───────────────────────────────────────────────────────
  switch (layoutId) {

    // 1 – Klassisch: Weißes Blatt, Logo oben rechts (wie Emilians echte Angebote – kein Kontakt im Kopf)
    case 1: return page("#fff",
      <div style={{ position: "relative", padding: `38px ${M}px 16px`, minHeight: 110, borderBottom: "0.5px solid #e8e8e8" }}>
        <AbsBlock />
        <div style={{ position: "absolute", top: 38, right: M }}>
          <LogoImg />
        </div>
      </div>,
      "#111", "#fff"
    );

    // 2 – Farbstreifen: Dünner Akzentstreifen oben
    case 2: return page("#fff",
      <div style={{ position: "relative" }}>
        <div style={{ height: 4, backgroundColor: color }} />
        <div style={{ padding: `14px ${M}px 14px`, position: "relative", minHeight: 96 }}>
          <AbsBlock />
          <RightCol />
        </div>
        <div style={{ height: "0.5px", backgroundColor: "#e8e8e8" }} />
      </div>,
      color, "#fff"
    );

    // 3 – Voller Farbkopf
    case 3: return page("#fff",
      <div style={{ backgroundColor: color, padding: `36px ${M}px 18px`, position: "relative", minHeight: 110 }}>
        <AbsBlock nameC="#fff" subC="rgba(255,255,255,0.75)" addrC="rgba(255,255,255,0.55)" />
        <RightCol dark kontC="rgba(255,255,255,0.65)" />
      </div>,
      "#111", "#fff"
    );

    // 6 – Dark Premium: Dunkler Kopf mit Akzent
    case 6: return page("#fff",
      <div style={{ backgroundColor: "#111", padding: `36px ${M}px 18px`, position: "relative", minHeight: 110 }}>
        <div style={{ width: 24, height: 3, backgroundColor: color, borderRadius: 2, marginBottom: 8 }} />
        <AbsBlock nameC="#fff" subC="rgba(255,255,255,0.55)" addrC="rgba(255,255,255,0.35)" />
        <RightCol dark kontC="rgba(255,255,255,0.4)" />
      </div>,
      "#222", "#fff"
    );

    // 9 – Skandinavisch: Minimal
    case 9: return page("#fff",
      <div style={{ position: "relative", padding: `36px ${M}px 16px`, minHeight: 105 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 18, height: 2, backgroundColor: color }} />
          <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: -0.3 }}>{absenderName}</div>
        </div>
        {absenderUntertitel && <div style={{ fontSize: 8.5, color: "#bbb", marginLeft: 26 }}>{absenderUntertitel}</div>}
        <div style={{ fontSize: 8, color: "#ddd", marginLeft: 26, marginTop: 2 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
        <RightCol kontC="#ccc" />
        <div style={{ marginTop: 14, borderBottom: "0.75px solid #ebebeb" }} />
      </div>,
      "#f2f2f2", "#333"
    );

    default: return null;
  }
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AdminDokumentEditor() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isNew = !id;

  // Auth check
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [navigate]);

  // Document meta
  const [typ, setTyp] = useState<string>(searchParams.get("typ") || "angebot");
  const [nummer, setNummer] = useState("");
  const [datum, setDatum] = useState(today());
  const [gueltigBis, setGueltigBis] = useState(addDays(14));
  const [gueltigBisTage, setGueltigBisTage] = useState(14);
  const [faelligAm, setFaelligAm] = useState(addDays(14));
  const [zahlungszielTage, setZahlungszielTage] = useState(14);
  const [lieferdatum, setLieferdatum] = useState("");

  // Contact
  const [kontaktSuche, setKontaktSuche] = useState("");
  const [kontaktSuggestions, setKontaktSuggestions] = useState<Record<string, string>[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [requestSuche, setRequestSuche] = useState("");
  const [requestSuggestions, setRequestSuggestions] = useState<Record<string, string>[]>([]);
  const [requestLabel, setRequestLabel] = useState("");
  const [eventSuche, setEventSuche] = useState("");
  const [eventSuggestions, setEventSuggestions] = useState<Record<string, string>[]>([]);
  const [eventLabel, setEventLabel] = useState("");
  const [empfaengerKundennummer, setEmpfaengerKundennummer] = useState("");
  const [empfaengerAnrede, setEmpfaengerAnrede] = useState("");
  const [empfaengerName, setEmpfaengerName] = useState("");
  const [empfaengerFirma, setEmpfaengerFirma] = useState("");
  const [empfaengerAdresse, setEmpfaengerAdresse] = useState("");
  const [empfaengerPlz, setEmpfaengerPlz] = useState("");
  const [empfaengerOrt, setEmpfaengerOrt] = useState("");
  const [empfaengerLand, setEmpfaengerLand] = useState("Deutschland");

  // Text
  const [kopftext, setKopftext] = useState("");
  const [fusstext, setFusstext] = useState("");

  // Positions
  const [positionen, setPositionen] = useState<LocalPosition[]>([newPosition()]);
  const [activePositionId, setActivePositionId] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // Tax
  const [mwstSatz, setMwstSatz] = useState(0);
  const [kleinunternehmer, setKleinunternehmer] = useState(false);
  const [rabattProzent, setRabattProzent] = useState<number | null>(null);

  // Design
  const [selectedColor, setSelectedColor] = useState(5);
  const [selectedLayout, setSelectedLayout] = useState(1);

  // Artikel autocomplete
  const [artikelSuche, setArtikelSuche] = useState<Record<string, string>>({});
  const [artikelSuggestions, setArtikelSuggestions] = useState<Record<string, Artikel[]>>({});

  // Absender (loaded from settings)
  const [absenderName, setAbsenderName] = useState("Emilian Leber");
  const [absenderUntertitel, setAbsenderUntertitel] = useState("Zauberer und Mentalist");
  const [absenderAdresse, setAbsenderAdresse] = useState("");
  const [absenderPlz, setAbsenderPlz] = useState("");
  const [absenderOrt, setAbsenderOrt] = useState("");
  const [absenderEmail, setAbsenderEmail] = useState("");
  const [absenderTel, setAbsenderTel] = useState("");
  const [absenderWebsite, setAbsenderWebsite] = useState("");
  const [absenderIban, setAbsenderIban] = useState("");
  const [absenderBic, setAbsenderBic] = useState("");
  const [absenderSteuernummer, setAbsenderSteuernummer] = useState("");
  const [absenderInhaber, setAbsenderInhaber] = useState("");
  const [absenderLand, setAbsenderLand] = useState("Deutschland");
  const [logoUrl, setLogoUrl] = useState("");

  // Textvorlagen
  const [textvorlagen, setTextvorlagen] = useState<Array<{
    id: string; name: string; typ: string; bereich: string; inhalt: string; is_default: boolean;
  }>>([]);

  // UI
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [showVorschau, setShowVorschau] = useState(false);
  const [showMehrOptionen, setShowMehrOptionen] = useState(false);
  const [bruttoEingabe, setBruttoEingabe] = useState(false); // false=Netto, true=Brutto

  const currentColor = FARBEN[selectedColor - 1];

  // Load textvorlagen
  useEffect(() => {
    if (!authChecked) return;
    supabase.from("dokument_textvorlagen").select("*").order("typ").order("bereich").order("sort_order").then(({ data }) => {
      if (data) setTextvorlagen(data as typeof textvorlagen);
    });
  }, [authChecked]);

  // Load admin settings
  useEffect(() => {
    if (!authChecked) return;
    supabase.from("admin_settings").select("*").limit(1).maybeSingle().then(({ data }) => {
      if (data) {
        setAbsenderName((data.company_name as string) || "Emilian Leber");
        setAbsenderUntertitel((data.company_subtitle as string) || "");
        setAbsenderAdresse((data.company_address as string) || "");
        setAbsenderPlz((data.company_zip as string) || "");
        setAbsenderOrt((data.company_city as string) || "");
        setAbsenderEmail((data.company_email as string) || "");
        setAbsenderTel((data.company_phone as string) || "");
        setAbsenderWebsite((data.company_website as string) || "");
        setAbsenderIban((data.bank_iban as string) || "");
        setAbsenderBic((data.bank_bic as string) || "");
        setAbsenderSteuernummer((data.tax_number as string) || "");
        setAbsenderInhaber((data.company_owner as string) || (data.company_name as string) || "");
        setAbsenderLand((data.company_country as string) || "Deutschland");
        setLogoUrl((data.company_logo_url as string) || "");
        // Apply saved defaults only for new documents
        // Kleinunternehmerregelung immer aus Settings laden (gilt für alle Dokumente)
        setKleinunternehmer(Boolean((data as any).kleinunternehmer));
        if (isNew) {
          if (data.document_template) setSelectedLayout(data.document_template as number);
          if (data.default_tax_rate !== undefined) setMwstSatz(Number(data.default_tax_rate) || 0);
          if (data.default_payment_days) {
            const days = Number(data.default_payment_days) || 14;
            setZahlungszielTage(days);
            setFaelligAm(addDays(days));
          }
          const offerDays = Number((data as any).default_offer_days) || 14;
          setGueltigBisTage(offerDays);
          setGueltigBis(addDays(offerDays));
        }
      }
    });
  }, [authChecked, isNew]);

  // Pre-fill request/event from URL params
  useEffect(() => {
    if (!authChecked || !isNew) return;
    const reqId = searchParams.get("requestId");
    const evId = searchParams.get("eventId");
    if (reqId) {
      setSelectedRequestId(reqId);
      supabase.from("portal_requests").select("id, name, anlass, datum").eq("id", reqId).maybeSingle().then(({ data: r }) => {
        if (r) {
          const lbl = [r.anlass, r.datum ? new Date(r.datum as string).toLocaleDateString("de-DE") : "", r.name].filter(Boolean).join(" · ");
          setRequestLabel(lbl);
          setRequestSuche(lbl);
        }
      });
    }
    if (evId) {
      setSelectedEventId(evId);
      supabase.from("portal_events").select("id, title, event_date, location").eq("id", evId).maybeSingle().then(({ data: ev }) => {
        if (ev) {
          const lbl = [ev.title, ev.event_date ? new Date(ev.event_date as string).toLocaleDateString("de-DE") : "", ev.location].filter(Boolean).join(" · ");
          setEventLabel(lbl);
          setEventSuche(lbl);
        }
      });
    }
  }, [authChecked, isNew, searchParams]);

  // Pre-fill customer from URL param ?customerId=... when creating a new document
  useEffect(() => {
    if (!authChecked || !isNew) return;
    const customerId = searchParams.get("customerId");
    if (!customerId) return;
    supabase.from("portal_customers").select("*").eq("id", customerId).maybeSingle().then(({ data }) => {
      if (!data) return;
      setSelectedCustomerId(customerId);
      setKontaktSuche(data.name || "");
      setEmpfaengerName(data.name || "");
      setEmpfaengerFirma(data.company || "");
      setEmpfaengerKundennummer(data.kundennummer || "");
      setEmpfaengerAnrede(data.anrede || "");
      if (data.rechnungs_strasse) setEmpfaengerAdresse(data.rechnungs_strasse);
      if (data.rechnungs_plz) setEmpfaengerPlz(data.rechnungs_plz);
      if (data.rechnungs_ort) setEmpfaengerOrt(data.rechnungs_ort);
      if (data.rechnungs_land) setEmpfaengerLand(data.rechnungs_land);
    });
  }, [authChecked, isNew, searchParams]);

  // Load existing document for edit
  useEffect(() => {
    if (!authChecked || isNew || !id) return;
    dokumenteService.getById(id).then((doc) => {
      if (!doc) { navigate("/admin/dokumente"); return; }
      setTyp(doc.typ);
      setNummer(doc.nummer);
      setDatum(doc.datum);
      const gb = doc.gueltigBis || "";
      setGueltigBis(gb);
      if (gb) {
        const diff = Math.round((new Date(gb).getTime() - new Date(doc.datum).getTime()) / 86400000);
        if (diff > 0) setGueltigBisTage(diff);
      }
      setFaelligAm(doc.faelligAm || "");
      setZahlungszielTage(doc.zahlungszielTage);
      setLieferdatum(doc.lieferdatum || "");
      setEmpfaengerName(doc.empfaenger.name);
      setEmpfaengerFirma(doc.empfaenger.firma || "");
      setEmpfaengerAdresse(doc.empfaenger.adresse);
      setEmpfaengerPlz(doc.empfaenger.plz);
      setEmpfaengerOrt(doc.empfaenger.ort);
      setEmpfaengerLand(doc.empfaenger.land);
      setKopftext(doc.kopftext);
      setFusstext(doc.fusstext);
      setPositionen(doc.positionen.map((p) => ({
        id: p.id,
        typ: (p.typ === "produkt" ? "leistung" : p.typ) as LocalPosition["typ"],
        bezeichnung: p.bezeichnung,
        beschreibung: p.beschreibung || "",
        menge: p.menge,
        einheit: p.einheit,
        einzelpreis: p.einzelpreis,
        mwstSatz: p.mwstSatz,
        rabattProzent: p.rabattProzent ?? null,
        gesamt: p.gesamt,
      })));
      setSelectedCustomerId(doc.customerId || null);
      // Load kundennummer + anrede from customer
      if (doc.customerId) {
        supabase.from("portal_customers").select("kundennummer, anrede").eq("id", doc.customerId).maybeSingle().then(({ data: c }) => {
          if (c?.kundennummer) setEmpfaengerKundennummer(c.kundennummer);
          if (c?.anrede) setEmpfaengerAnrede(c.anrede);
        });
      }
      setSelectedRequestId(doc.requestId || null);
      setSelectedEventId(doc.eventId || null);
      // Prefill labels for linked request/event
      if (doc.requestId) {
        supabase.from("portal_requests").select("id, name, anlass, datum").eq("id", doc.requestId).maybeSingle().then(({ data: r }) => {
          if (r) {
            const lbl = [r.anlass, r.datum ? new Date(r.datum as string).toLocaleDateString("de-DE") : "", r.name].filter(Boolean).join(" · ");
            setRequestLabel(lbl);
            setRequestSuche(lbl);
          }
        });
      }
      if (doc.eventId) {
        supabase.from("portal_events").select("id, title, event_date, location").eq("id", doc.eventId).maybeSingle().then(({ data: ev }) => {
          if (ev) {
            const lbl = [ev.title, ev.event_date ? new Date(ev.event_date as string).toLocaleDateString("de-DE") : "", ev.location].filter(Boolean).join(" · ");
            setEventLabel(lbl);
            setEventSuche(lbl);
          }
        });
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [authChecked, isNew, id, navigate]);

  // Summen
  const summen = useMemo(() => {
    let netto = 0;
    for (const p of positionen) {
      if (p.typ !== "leistung") continue;
      const base = p.menge * p.einzelpreis;
      const rabatt = p.rabattProzent ? base * (p.rabattProzent / 100) : 0;
      netto += base - rabatt;
    }
    const gesamtRabatt = rabattProzent ? netto * (rabattProzent / 100) : 0;
    const nettoNachRabatt = netto - gesamtRabatt;
    const mwstBetrag = kleinunternehmer ? 0 : nettoNachRabatt * (mwstSatz / 100);
    const brutto = nettoNachRabatt + mwstBetrag;
    return { netto: nettoNachRabatt, gesamtRabatt, mwstBetrag, brutto };
  }, [positionen, mwstSatz, rabattProzent, kleinunternehmer]);

  // Contact search
  const searchKontakte = async (q: string) => {
    setKontaktSuche(q);
    if (q.length < 2) { setKontaktSuggestions([]); return; }
    const { data } = await supabase
      .from("portal_customers")
      .select("id, name, company, email, kundennummer, anrede, rechnungs_strasse, rechnungs_plz, rechnungs_ort, rechnungs_land")
      .or(`name.ilike.%${q}%,company.ilike.%${q}%,email.ilike.%${q}%`)
      .limit(5);
    setKontaktSuggestions((data || []) as Record<string, string>[]);
  };

  const selectKontakt = (k: Record<string, string>) => {
    setEmpfaengerName(k.name || "");
    setEmpfaengerFirma(k.company || "");
    setEmpfaengerKundennummer(k.kundennummer || "");
    setEmpfaengerAnrede(k.anrede || "");
    setEmpfaengerAdresse(k.rechnungs_strasse || "");
    setEmpfaengerPlz(k.rechnungs_plz || "");
    setEmpfaengerOrt(k.rechnungs_ort || "");
    setEmpfaengerLand(k.rechnungs_land || "Deutschland");
    setKontaktSuche(k.name || "");
    setKontaktSuggestions([]);
    setSelectedCustomerId(k.id || null);
  };

  // Anfrage search
  const searchRequests = async (q: string) => {
    setRequestSuche(q);
    if (q.length < 1) { setRequestSuggestions([]); return; }
    let query = supabase
      .from("portal_requests")
      .select("id, name, firma, anlass, datum")
      .or(`name.ilike.%${q}%,anlass.ilike.%${q}%,firma.ilike.%${q}%`);
    if (selectedCustomerId) query = query.eq("customer_id", selectedCustomerId);
    const { data } = await query.limit(6);
    setRequestSuggestions((data || []) as Record<string, string>[]);
  };

  const selectRequest = (r: Record<string, string>) => {
    setSelectedRequestId(r.id);
    const label = [r.anlass, r.datum ? new Date(r.datum).toLocaleDateString("de-DE") : "", r.name].filter(Boolean).join(" · ");
    setRequestLabel(label);
    setRequestSuche(label);
    setRequestSuggestions([]);
  };

  const clearRequest = () => {
    setSelectedRequestId(null);
    setRequestLabel("");
    setRequestSuche("");
  };

  // Event search
  const searchEvents = async (q: string) => {
    setEventSuche(q);
    if (q.length < 1) { setEventSuggestions([]); return; }
    let query = supabase
      .from("portal_events")
      .select("id, title, event_date, location");
    if (selectedCustomerId) {
      query = query.eq("customer_id", selectedCustomerId);
    }
    query = query.or(`title.ilike.%${q}%,location.ilike.%${q}%`);
    const { data } = await query.limit(6);
    setEventSuggestions((data || []) as Record<string, string>[]);
  };

  const selectEvent = (e: Record<string, string>) => {
    setSelectedEventId(e.id);
    const label = [e.title, e.event_date ? new Date(e.event_date).toLocaleDateString("de-DE") : "", e.location].filter(Boolean).join(" · ");
    setEventLabel(label);
    setEventSuche(label);
    setEventSuggestions([]);
  };

  const clearEvent = () => {
    setSelectedEventId(null);
    setEventLabel("");
    setEventSuche("");
  };

  // Artikel search
  const searchArtikel = async (posId: string, q: string) => {
    setArtikelSuche(prev => ({ ...prev, [posId]: q }));
    if (q.length < 1) { setArtikelSuggestions(prev => ({ ...prev, [posId]: [] })); return; }
    const { data } = await supabase
      .from("artikel_stamm")
      .select("*")
      .eq("aktiv", true)
      .ilike("bezeichnung", `%${q}%`)
      .limit(6);
    setArtikelSuggestions(prev => ({ ...prev, [posId]: (data || []) as Artikel[] }));
  };

  const selectArtikel = (posId: string, artikel: Artikel) => {
    updatePosition(posId, {
      bezeichnung: artikel.bezeichnung,
      beschreibung: artikel.beschreibung || "",
      einheit: artikel.einheit,
      einzelpreis: artikel.preis,
      mwstSatz: artikel.mwstSatz,
    });
    setArtikelSuche(prev => ({ ...prev, [posId]: artikel.bezeichnung }));
    setArtikelSuggestions(prev => ({ ...prev, [posId]: [] }));
  };

  // Position helpers
  const updatePosition = (id: string, patch: Partial<LocalPosition>) => {
    setPositionen(prev => prev.map(p => {
      if (p.id !== id) return p;
      const updated = { ...p, ...patch };
      if (updated.typ === "leistung") {
        const base = updated.menge * updated.einzelpreis;
        const rabatt = updated.rabattProzent ? base * (updated.rabattProzent / 100) : 0;
        updated.gesamt = base - rabatt;
      }
      return updated;
    }));
  };

  const addPosition = () => setPositionen(prev => [...prev, newPosition()]);
  const removePosition = (id: string) => setPositionen(prev => prev.filter(p => p.id !== id));

  // Save
  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const { data: settings } = await supabase.from("admin_settings").select("*").limit(1).maybeSingle();

      const absender = {
        name: (settings?.company_name as string) || "Emilian Leber",
        adresse: (settings?.company_address as string) || "",
        plz: (settings?.company_zip as string) || "",
        ort: (settings?.company_city as string) || "",
        land: (settings?.company_country as string) || "Deutschland",
        email: (settings?.company_email as string) || "el@magicel.de",
        telefon: (settings?.company_phone as string) || "",
        website: (settings?.company_website as string) || "",
        steuernummer: (settings?.tax_number as string) || "",
        iban: (settings?.bank_iban as string) || "",
        bic: (settings?.bank_bic as string) || "",
        bank: (settings?.bank_name as string) || "",
        kleinunternehmer,
      };

      const empfaenger = {
        name: empfaengerName,
        firma: empfaengerFirma || undefined,
        adresse: empfaengerAdresse,
        plz: empfaengerPlz,
        ort: empfaengerOrt,
        land: empfaengerLand,
      };

      const posForService = positionen.map((p, i) => ({
        id: p.id,
        position: i + 1,
        typ: p.typ as "leistung" | "text" | "zwischensumme",
        bezeichnung: p.bezeichnung,
        beschreibung: p.beschreibung || undefined,
        menge: p.menge,
        einheit: p.einheit,
        einzelpreis: p.einzelpreis,
        gesamt: p.gesamt,
        mwstSatz: p.mwstSatz || mwstSatz,
        rabattProzent: p.rabattProzent ?? undefined,
      }));

      const dokumentTyp = (typ as DokumentTyp) || "angebot";

      // For new documents: pre-generate the number so the preview HTML already contains it
      let vorgeneriertNummer: string | undefined;
      if (isNew) {
        vorgeneriertNummer = await reserviereNummer(dokumentTyp);
        // Synchronously update state so the DOM re-renders with the number before we capture it
        flushSync(() => setNummer(vorgeneriertNummer!));
      }

      const previewHtml = document.getElementById("doc-preview-capture")?.innerHTML || "";

      if (isNew) {
        const saved = await dokumenteService.create(
          dokumentTyp,
          {
            datum,
            faelligAm: faelligAm || undefined,
            gueltigBis: gueltigBis || undefined,
            lieferdatum: lieferdatum || undefined,
            zahlungszielTage,
            empfaenger,
            absender,
            kopftext,
            fusstext,
            status: "entwurf",
            customerId: selectedCustomerId || undefined,
            requestId: selectedRequestId || undefined,
            eventId: selectedEventId || undefined,
            rabattProzent: rabattProzent ?? undefined,
            previewHtml,
          },
          posForService,
          vorgeneriertNummer,
        );
        setMessage("Gespeichert");
        navigate(`/admin/dokumente/${saved.id}`);
      } else if (id) {
        await dokumenteService.update(
          id,
          {
            datum,
            faelligAm: faelligAm || undefined,
            gueltigBis: gueltigBis || undefined,
            lieferdatum: lieferdatum || undefined,
            zahlungszielTage,
            empfaenger,
            absender,
            kopftext,
            fusstext,
            customerId: selectedCustomerId || undefined,
            requestId: selectedRequestId || undefined,
            eventId: selectedEventId || undefined,
            rabattProzent: rabattProzent ?? undefined,
            previewHtml,
          },
          posForService,
        );
        setMessage("Gespeichert");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error
        ? e.message
        : (e as any)?.message || (e as any)?.details || JSON.stringify(e);
      setMessage("Fehler: " + msg);
      console.error("Dokument speichern Fehler:", e);
    } finally {
      setSaving(false);
    }
  };

  // Speichern + zur Detail-Seite navigieren mit offenem Send-Panel
  const handleSaveAndNavigate = async () => {
    setSaving(true);
    setMessage("");
    try {
      const { data: settings } = await supabase.from("admin_settings").select("*").limit(1).maybeSingle();
      const absender = {
        name: (settings?.company_name as string) || "Emilian Leber",
        adresse: (settings?.company_address as string) || "",
        plz: (settings?.company_zip as string) || "",
        ort: (settings?.company_city as string) || "",
        land: (settings?.company_country as string) || "Deutschland",
        email: (settings?.company_email as string) || "el@magicel.de",
        telefon: (settings?.company_phone as string) || "",
        website: (settings?.company_website as string) || "",
        steuernummer: (settings?.tax_number as string) || "",
        iban: (settings?.bank_iban as string) || "",
        bic: (settings?.bank_bic as string) || "",
        bank: (settings?.bank_name as string) || "",
        kleinunternehmer,
      };
      const empfaenger = { name: empfaengerName, firma: empfaengerFirma || undefined, adresse: empfaengerAdresse, plz: empfaengerPlz, ort: empfaengerOrt, land: empfaengerLand };
      const posForService = positionen.map((p, i) => ({
        id: p.id, position: i + 1, typ: p.typ as "leistung" | "text" | "zwischensumme",
        bezeichnung: p.bezeichnung, beschreibung: p.beschreibung || undefined,
        menge: p.menge, einheit: p.einheit, einzelpreis: p.einzelpreis, gesamt: p.gesamt,
        mwstSatz: p.mwstSatz || mwstSatz, rabattProzent: p.rabattProzent ?? undefined,
      }));
      const typMap: Record<string, DokumentTyp> = { angebot: "angebot", rechnung: "rechnung", abschlagsrechnung: "abschlagsrechnung", auftragsbestaetigung: "auftragsbestaetigung", mahnung: "mahnung", gutschrift: "gutschrift", stornorechnung: "stornorechnung" };
      const dokumentTyp = typMap[typ] || "angebot";

      const previewHtml = document.getElementById("doc-preview-capture")?.innerHTML || "";

      if (isNew) {
        const saved = await dokumenteService.create(dokumentTyp, {
          datum, faelligAm: faelligAm || undefined, gueltigBis: gueltigBis || undefined,
          lieferdatum: lieferdatum || undefined, zahlungszielTage, empfaenger, absender,
          kopftext, fusstext, status: "entwurf", customerId: selectedCustomerId || undefined,
          requestId: selectedRequestId || undefined, eventId: selectedEventId || undefined,
          rabattProzent: rabattProzent ?? undefined, previewHtml,
        }, posForService);
        navigate(`/admin/dokumente/${saved.id}?send=1`);
      } else if (id) {
        await dokumenteService.update(id, {
          datum, faelligAm: faelligAm || undefined, gueltigBis: gueltigBis || undefined,
          lieferdatum: lieferdatum || undefined, zahlungszielTage, empfaenger, absender,
          kopftext, fusstext, customerId: selectedCustomerId || undefined,
          requestId: selectedRequestId || undefined, eventId: selectedEventId || undefined,
          rabattProzent: rabattProzent ?? undefined, previewHtml,
        }, posForService);
        navigate(`/admin/dokumente/${id}?send=1`);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : (e as any)?.message || JSON.stringify(e);
      setMessage("Fehler: " + msg);
    } finally { setSaving(false); }
  };

  // PDF: Neues Fenster öffnen → User wählt "Als PDF sichern" im Druckdialog
  const handleDownloadPdf = () => {
    const el = document.getElementById("doc-preview-print");
    if (!el) return;

    const html = el.innerHTML;
    const win = window.open("", "_blank");
    if (!win) {
      alert("Bitte erlauben Sie Popups für diese Seite, um das PDF zu öffnen.");
      return;
    }

    const scale = ((210 / 25.4) * 96) / 595;

    win.document.write(`<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${nummer || "Dokument"}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*, *::before, *::after {
  box-sizing: border-box;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
@page { size: A4 portrait; margin: 10mm 0 0 0; }
html, body { margin: 0; padding: 0; width: 595px; }
body > div {
  width: 595px !important;
  min-height: auto !important;
  aspect-ratio: auto !important;
}
@media screen {
  body {
    background: #444;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  body > div {
    box-shadow: 0 6px 32px rgba(0,0,0,0.35);
    background: #fff;
    min-height: 842px !important;
  }
}
</style>
</head>
<body>${html}</body>
</html>`);

    win.document.close();
    setTimeout(() => {
      win.focus();
      win.print();
    }, 900);
  };

  const typLabel = TYP_LABEL[typ] || typ;
  const inputCls = "w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20";
  const labelCls = "text-xs text-muted-foreground mb-1 block";

  if (!authChecked) return null;
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-foreground border-t-transparent" />
      </div>
    );
  }

  // Preview props helper
  const previewProps = {
    layoutId: selectedLayout,
    color: currentColor.hex,
    colorGradient: currentColor.value,
    typ,
    nummer,
    datum,
    faelligAm,
    gueltigBis,
    lieferdatum,
    empfaengerName,
    empfaengerFirma,
    empfaengerKundennummer,
    empfaengerAnrede,
    empfaengerAdresse,
    empfaengerPlz,
    empfaengerOrt,
    empfaengerLand,
    kopftext,
    fusstext,
    positionen,
    mwstSatz,
    kleinunternehmer,
    rabattProzent,
    absenderName,
    absenderUntertitel,
    absenderAdresse,
    absenderPlz,
    absenderOrt,
    absenderEmail,
    absenderTel,
    absenderWebsite,
    absenderIban,
    absenderBic,
    absenderSteuernummer,
    absenderInhaber,
    absenderLand,
    logoUrl,
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: "100dvh" }}>

      {/* Versteckter Preview-Container für PDF-Capture beim Speichern */}
      <div
        id="doc-preview-capture"
        aria-hidden="true"
        style={{ position: "fixed", left: -99999, top: 0, width: 595, visibility: "hidden", pointerEvents: "none" }}
      >
        <DocumentPreview {...previewProps} />
      </div>

      {/* ── VORSCHAU OVERLAY ─────────────────────────────────────────────── */}
      {showVorschau && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Overlay top bar */}
          <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-border/20 bg-background">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowVorschau(false)}
                className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-sm font-semibold">Vorschau – {typLabel}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Speichere…" : "Speichern"}
              </button>
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors"
              >
                <Download className="w-4 h-4" />
                PDF / Drucken
              </button>
              <button
                onClick={handleSaveAndNavigate}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                Versenden
              </button>
            </div>
          </div>

          {/* Overlay content */}
          <div className="flex-1 overflow-hidden flex min-h-0">
            {/* Document preview (large) */}
            <div className="flex-1 overflow-y-auto flex items-start justify-center p-8 bg-muted/10">
              <div
                id="doc-preview-print"
                style={{ width: "min(595px, 100%)", display: "flex", flexDirection: "column", gap: 24 }}
              >
                <DocumentPreview {...previewProps} />
              </div>
            </div>

            {/* Right: layout + color pickers */}
            <div className="w-72 shrink-0 border-l border-border/20 bg-background overflow-y-auto p-5 space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Layout</h3>
                <div className="grid grid-cols-3 gap-2">
                  {LAYOUTS.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout.id)}
                      title={layout.name}
                      className={`aspect-[210/297] rounded-lg border-2 overflow-hidden relative transition-all ${
                        selectedLayout === layout.id
                          ? "border-foreground"
                          : "border-border/20 hover:border-border/50"
                      }`}
                    >
                      <LayoutThumbnail layoutId={layout.id} color={currentColor.hex} />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[7px] text-center py-0.5">
                        {layout.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Farbe</h3>
                <div className="grid grid-cols-6 gap-2">
                  {FARBEN.map((farbe) => (
                    <button
                      key={farbe.id}
                      onClick={() => setSelectedColor(farbe.id)}
                      title={farbe.name}
                      className={`w-9 h-9 rounded-full border-2 transition-all ${
                        selectedColor === farbe.id
                          ? "border-foreground scale-110 shadow-md"
                          : "border-transparent hover:scale-105 hover:border-border/40"
                      }`}
                      style={{ background: farbe.value }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {currentColor.name} · {LAYOUTS.find(l => l.id === selectedLayout)?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-border/10 bg-background z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-bold leading-tight">{isNew ? `Neues ${typLabel}` : `${typLabel} bearbeiten`}</h1>
            <p className="text-xs text-muted-foreground">{nummer || "Nummer wird beim Speichern vergeben"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {message && (
            <span className={`text-xs px-3 py-1.5 rounded-lg ${message.startsWith("Fehler") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>{message}</span>
          )}
          <button onClick={() => setShowVorschau(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors">
            <Eye className="w-4 h-4" />Vorschau
          </button>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" />{saving ? "Speichere…" : "Als Entwurf speichern"}
          </button>
          <button onClick={handleSaveAndNavigate} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
            <Send className="w-4 h-4" />Versenden / Drucken / Herunterladen
          </button>
        </div>
      </div>

      {/* FULL-WIDTH FORM */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-6xl mx-auto px-10 pb-20 pt-8">

          {/* ══ shared helpers ══ */}
          {/* section title */}

          {/* ════ KONTAKT & DOKUMENT ════ */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-4">Empfänger &amp; {typLabel}sdaten</p>

          <div className="grid grid-cols-2 gap-10">
            {/* LEFT: Kunde + Anschrift */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Kunde</label>
              <div className="relative mb-4">
                <input
                  placeholder="Person oder Organisation suchen…"
                  value={kontaktSuche}
                  onChange={(e) => searchKontakte(e.target.value)}
                  className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
                {kontaktSuggestions.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden">
                    {kontaktSuggestions.map((k) => (
                      <button key={k.id} onClick={() => selectKontakt(k)} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm flex items-center justify-between border-b border-slate-50 last:border-0">
                        <div>
                          <p className="font-semibold text-slate-800">{k.name}</p>
                          {k.company && <p className="text-xs text-slate-500">{k.company}</p>}
                        </div>
                        <span className="text-xs text-slate-400">{k.email}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Anfrage verknüpfen – nur bei Angebot / Auftragsbestätigung */}
              {(typ === "angebot" || typ === "auftragsbestaetigung") && (
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Anfrage verknüpfen</label>
                  <div className="relative">
                    <input
                      placeholder="Anfrage suchen (Anlass, Name…)"
                      value={requestSuche}
                      onChange={(e) => searchRequests(e.target.value)}
                      className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 pr-8"
                    />
                    {selectedRequestId && (
                      <button type="button" onClick={clearRequest} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
                    )}
                    {requestSuggestions.length > 0 && (
                      <div className="absolute z-20 top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden">
                        {requestSuggestions.map((r) => (
                          <button key={r.id} type="button" onMouseDown={() => selectRequest(r)} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm flex items-center justify-between border-b border-slate-50 last:border-0">
                            <div>
                              <p className="font-semibold text-slate-800">{r.anlass || "Anfrage"}</p>
                              <p className="text-xs text-slate-500">{r.name}{r.datum ? ` · ${new Date(r.datum).toLocaleDateString("de-DE")}` : ""}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedRequestId && (
                    <p className="mt-1 text-[11px] text-emerald-600 font-medium">✓ Verknüpft</p>
                  )}
                </div>
              )}

              {/* Event verknüpfen – nur bei Rechnung / Mahnung */}
              {(typ === "rechnung" || typ === "mahnung") && (
                <div className="mb-4">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Event verknüpfen</label>
                  <div className="relative">
                    <input
                      placeholder="Event suchen (Titel, Ort…)"
                      value={eventSuche}
                      onChange={(e) => searchEvents(e.target.value)}
                      className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 pr-8"
                    />
                    {selectedEventId && (
                      <button type="button" onClick={clearEvent} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg leading-none">×</button>
                    )}
                    {eventSuggestions.length > 0 && (
                      <div className="absolute z-20 top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden">
                        {eventSuggestions.map((ev) => (
                          <button key={ev.id} type="button" onMouseDown={() => selectEvent(ev)} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm flex items-center justify-between border-b border-slate-50 last:border-0">
                            <div>
                              <p className="font-semibold text-slate-800">{ev.title}</p>
                              <p className="text-xs text-slate-500">{ev.event_date ? new Date(ev.event_date).toLocaleDateString("de-DE") : ""}{ev.location ? ` · ${ev.location}` : ""}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedEventId && (
                    <p className="mt-1 text-[11px] text-emerald-600 font-medium">✓ Verknüpft</p>
                  )}
                </div>
              )}

              <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Anschrift</label>
              {/* Stacked address inputs – look like an address block */}
              <div className="rounded-xl border border-border/30 overflow-hidden divide-y divide-border/20">
                <input placeholder="Firma (optional)" value={empfaengerFirma} onChange={(e) => setEmpfaengerFirma(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background focus:outline-none focus:bg-muted/20 placeholder:text-muted-foreground/50" />
                <input placeholder="Name *" value={empfaengerName} onChange={(e) => setEmpfaengerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background focus:outline-none focus:bg-muted/20 placeholder:text-muted-foreground/50" />
                <input placeholder="Straße und Hausnummer" value={empfaengerAdresse} onChange={(e) => setEmpfaengerAdresse(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background focus:outline-none focus:bg-muted/20 placeholder:text-muted-foreground/50" />
                <div className="flex divide-x divide-border/20">
                  <input placeholder="PLZ" value={empfaengerPlz} onChange={(e) => setEmpfaengerPlz(e.target.value)}
                    className="w-24 px-3 py-2 text-sm bg-background focus:outline-none focus:bg-muted/20 placeholder:text-muted-foreground/50" />
                  <input placeholder="Ort" value={empfaengerOrt} onChange={(e) => setEmpfaengerOrt(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-background focus:outline-none focus:bg-muted/20 placeholder:text-muted-foreground/50" />
                </div>
              </div>
              <input placeholder="Land" value={empfaengerLand} onChange={(e) => setEmpfaengerLand(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border/30 px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20" />
            </div>

            {/* RIGHT: Dokument-Meta */}
            <div className="space-y-3">
              {isNew && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Dokumenttyp</label>
                  <select value={typ} onChange={(e) => setTyp(e.target.value)}
                    className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300">
                    <option value="angebot">Angebot</option>
                    <option value="rechnung">Rechnung</option>
                    <option value="auftragsbestaetigung">Auftragsbestätigung</option>
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{typLabel}nummer</label>
                  <input value={nummer} onChange={(e) => setNummer(e.target.value)} placeholder="Wird vergeben…"
                    className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{typLabel}datum</label>
                  <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)}
                    className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300" />
                </div>
              </div>

              {typ === "angebot" && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Gültig bis</label>
                  <div className="flex items-center gap-2">
                    <input type="date" value={gueltigBis} onChange={(e) => setGueltigBis(e.target.value)}
                      className="flex-1 rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
                    <span className="text-xs text-muted-foreground shrink-0">in</span>
                    <input type="number" value={gueltigBisTage} onChange={(e) => { const d = parseInt(e.target.value)||0; setGueltigBisTage(d); setGueltigBis(addDays(d)); }}
                      className="w-14 rounded-xl bg-background border border-border/30 px-2 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-foreground/20" />
                    <span className="text-xs text-muted-foreground shrink-0">Tagen</span>
                  </div>
                </div>
              )}
              {(typ === "rechnung" || typ === "auftragsbestaetigung" || typ === "mahnung") && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Zahlungsziel</label>
                  <div className="flex items-center gap-2">
                    <input type="date" value={faelligAm} onChange={(e) => setFaelligAm(e.target.value)}
                      className="flex-1 rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20" />
                    <span className="text-xs text-muted-foreground shrink-0">in</span>
                    <input type="number" value={zahlungszielTage} onChange={(e) => { const d = parseInt(e.target.value)||0; setZahlungszielTage(d); setFaelligAm(addDays(d)); }}
                      className="w-14 rounded-xl bg-background border border-border/30 px-2 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-foreground/20" />
                    <span className="text-xs text-muted-foreground shrink-0">Tagen</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <hr className="border-slate-100 my-8" />

          {/* ════ KOPF-TEXT ════ */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-4">Kopf-Text</p>
          <RichTextEditor
            key={`kopf-${id ?? "new"}`}
            value={kopftext}
            onChange={setKopftext}
            placeholder="Anschreiben an den Kunden…"
            minHeight="120px"
            showPlaceholders={false}
            templates={textvorlagen.filter((v) => v.bereich === "kopf" && (v.typ === typ || v.typ === "alle"))}
          />

          <hr className="border-slate-100 my-8" />

          {/* ════ PRODUKTE ════ */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600">Produkte &amp; Leistungen</p>
            {/* Brutto / Netto toggle */}
            <div className="flex rounded-lg border border-slate-200 overflow-hidden shrink-0 text-xs font-semibold">
              <button onClick={() => setBruttoEingabe(true)} className={`px-4 py-1.5 transition-colors ${bruttoEingabe ? "bg-slate-800 text-white" : "bg-white text-slate-500 hover:text-slate-700"}`}>Brutto</button>
              <button onClick={() => setBruttoEingabe(false)} className={`px-4 py-1.5 transition-colors ${!bruttoEingabe ? "bg-slate-800 text-white" : "bg-white text-slate-500 hover:text-slate-700"}`}>Netto</button>
            </div>
          </div>
          <div>

          {/* Table header */}
          <div className="grid items-center text-sm font-medium text-slate-500 px-2 pb-2 pt-1"
            style={{ gridTemplateColumns: "32px 1fr 80px 95px 185px 88px 120px 120px 40px" }}>
            <span />
            <span>Produkt oder Service</span>
            <span className="col-span-2">Menge</span>
            <span>Preis <span className="font-normal text-slate-400">({bruttoEingabe ? "brutto" : "netto"})</span></span>
            <span>USt.</span>
            <span>Rabatt</span>
            <span className="text-right">Betrag</span>
            <span />
          </div>

          {/* Position rows */}
          {positionen.map((pos, idx) => {
            const isActive = activePositionId === pos.id;
            const showExtra = isActive || !!pos.beschreibung;
            const showOptional = isActive || !!pos.optional;

            const inp = "rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
            const chevron = { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundPosition: "right 10px center" };

            return (
              <div
                key={pos.id}
                className="border-t border-slate-100 first:border-t-0"
                onFocus={() => setActivePositionId(pos.id)}
                onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setActivePositionId(null); }}
              >
                {/* Main grid row */}
                <div className="grid items-center gap-x-2 py-2 px-2"
                  style={{ gridTemplateColumns: "32px 1fr 80px 95px 185px 88px 120px 120px 40px" }}>

                  {/* Nr / Opt. */}
                  <span className="text-sm text-center select-none text-slate-400">
                    {pos.optional ? <span className="text-blue-400 text-xs font-semibold">Opt.</span> : `${idx + 1}.`}
                  </span>

                  {/* Bezeichnung */}
                  <div className="relative">
                    <input
                      placeholder="Bezeichnung oder Artikel suchen…"
                      value={artikelSuche[pos.id] ?? pos.bezeichnung}
                      onChange={(e) => searchArtikel(pos.id, e.target.value)}
                      onBlur={() => { const q = artikelSuche[pos.id]; if (q !== undefined && q !== pos.bezeichnung) updatePosition(pos.id, { bezeichnung: q }); }}
                      className={`w-full px-3.5 py-2 ${inp}`}
                    />
                    {(artikelSuggestions[pos.id] || []).length > 0 && (
                      <div className="absolute z-50 top-full left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 overflow-hidden">
                        {artikelSuggestions[pos.id].map((a) => (
                          <button key={a.id} onMouseDown={() => selectArtikel(pos.id, a)}
                            className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 text-sm flex items-start justify-between gap-4 border-b border-slate-100 last:border-0">
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800">{a.bezeichnung}</p>
                              {a.beschreibung && <p className="text-xs text-slate-400 truncate mt-0.5">{a.beschreibung.slice(0, 60)}…</p>}
                            </div>
                            <span className="text-sm font-bold text-slate-800 shrink-0">{a.preis.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Qty */}
                  <div className={`flex items-center overflow-hidden focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${inp}`}>
                    <input
                      type="number" value={pos.menge} min={0} step="any"
                      onChange={(e) => updatePosition(pos.id, { menge: parseFloat(e.target.value.replace(",", ".")) || 0 })}
                      className="flex-1 text-right px-2 py-2 text-sm bg-transparent focus:outline-none min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex flex-col border-l border-slate-200 shrink-0">
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => updatePosition(pos.id, { menge: Math.round((pos.menge + 0.5) * 100) / 100 })}
                        className="px-1 h-[18px] flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <ChevronUp className="w-2.5 h-2.5" />
                      </button>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => updatePosition(pos.id, { menge: Math.max(0, Math.round((pos.menge - 0.5) * 100) / 100) })}
                        className="px-1 h-[18px] flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors border-t border-slate-200"
                      >
                        <ChevronDown className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Einheit */}
                  <select
                    value={pos.einheit}
                    onChange={(e) => updatePosition(pos.id, { einheit: e.target.value })}
                    className={`w-full pl-3 pr-8 py-2 appearance-none bg-no-repeat ${inp}`}
                    style={chevron}
                  >
                    {["pauschal","Std.","Stk.","km","m²","Tag","Nacht"].map((u) => <option key={u}>{u}</option>)}
                  </select>

                  {/* Preis mit EUR */}
                  <div className={`flex items-center overflow-hidden focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 ${inp}`}>
                    <input
                      type="number" value={pos.einzelpreis} step="0.01" min={0}
                      onChange={(e) => updatePosition(pos.id, { einzelpreis: parseFloat(e.target.value) || 0 })}
                      className="flex-1 text-right px-3 py-2 text-sm bg-transparent focus:outline-none min-w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="pr-3.5 text-sm text-slate-400 shrink-0">EUR</span>
                  </div>

                  {/* USt. */}
                  <select
                    value={pos.mwstSatz}
                    onChange={(e) => updatePosition(pos.id, { mwstSatz: parseFloat(e.target.value) })}
                    disabled={kleinunternehmer}
                    className={`w-full pl-3 pr-8 py-2 appearance-none bg-no-repeat ${inp} ${kleinunternehmer ? "!border-slate-100 !bg-slate-50 !text-slate-300 cursor-not-allowed" : ""}`}
                    style={kleinunternehmer ? {} : chevron}
                  >
                    {[0, 7, 19].map((r) => <option key={r} value={r}>{r}%</option>)}
                  </select>

                  {/* Rabatt: Zahl + % getrennt */}
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number" value={pos.rabattProzent ?? ""} placeholder="0" min={0} max={100}
                      onChange={(e) => updatePosition(pos.id, { rabattProzent: e.target.value ? parseFloat(e.target.value) : null })}
                      className={`flex-1 text-right px-2.5 py-2 ${inp}`}
                    />
                    <span className="text-sm text-slate-400 shrink-0">%</span>
                  </div>

                  {/* Betrag */}
                  <div className="text-right text-sm tabular-nums font-semibold text-slate-800">
                    {pos.gesamt.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
                  </div>

                  {/* Delete */}
                  <button onClick={() => removePosition(pos.id)}
                    className="flex items-center justify-center text-slate-300 hover:text-red-400 transition-colors w-8 h-8 rounded-lg hover:bg-red-50 mx-auto">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Beschreibung + Optional – unterhalb, volle Breite */}
                {(showExtra || showOptional) && (
                  <div className="px-2 pb-3" style={{ paddingLeft: "calc(32px + 0.5rem + 0.5rem)" }}>
                    {showExtra && (
                      <textarea
                        placeholder="Beschreibung (optional)…"
                        value={pos.beschreibung}
                        onChange={(e) => updatePosition(pos.id, { beschreibung: e.target.value })}
                        rows={3}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-600 bg-white focus:outline-none focus:border-blue-200 resize-y"
                      />
                    )}
                    {showOptional && (
                      <label
                        className="mt-2 flex items-center gap-2 cursor-pointer select-none w-fit"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => updatePosition(pos.id, { optional: !pos.optional })}
                      >
                        <div className={`relative w-8 h-4 rounded-full transition-colors shrink-0 ${pos.optional ? "bg-blue-500" : "bg-slate-200"}`}>
                          <span className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${pos.optional ? "translate-x-4" : ""}`} />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Optional</span>
                      </label>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Bottom links */}
          <div className="flex items-center gap-5 pt-4 pb-2 px-3">
            <button onClick={addPosition} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Position hinzufügen</button>
            <button onClick={() => {}} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Produkt auswählen</button>
          </div>
          </div>{/* /produkte wrapper */}

          <hr className="border-slate-100 my-8" />

          {/* ════ FUSS-TEXT ════ */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-4">Fuss-Text</p>
          <RichTextEditor
            key={`fuss-${id ?? "new"}`}
            value={fusstext}
            onChange={setFusstext}
            placeholder="Bankdaten, Zahlungshinweise, Grüße…"
            minHeight="120px"
            showPlaceholders={false}
            templates={textvorlagen.filter((v) => v.bereich === "fuss" && (v.typ === typ || v.typ === "alle"))}
          />

          <hr className="border-slate-100 my-8" />

          {/* ════ MEHR OPTIONEN ════ */}
          <button
            onClick={() => setShowMehrOptionen((v) => !v)}
            className="flex items-center justify-between w-full mb-4 group"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">Mehr Optionen</p>
            <span className="text-xs text-blue-600 font-medium">{showMehrOptionen ? "Ausblenden" : "Einblenden"}</span>
          </button>
          {showMehrOptionen && (
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Mehrwertsteuersatz</label>
                <div className="flex items-center gap-2 flex-wrap">
                  {[0, 7, 19].map((r) => (
                    <button key={r} onClick={() => setMwstSatz(r)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${mwstSatz === r ? "bg-slate-800 text-white border-slate-800" : "border-slate-200 text-slate-500 hover:text-slate-800"}`}>
                      {r}%
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 mt-3 text-sm cursor-pointer text-slate-500 hover:text-slate-700">
                  <input type="checkbox" checked={kleinunternehmer} onChange={(e) => setKleinunternehmer(e.target.checked)} className="rounded" />
                  § 19 UStG – keine Umsatzsteuer ausweisen
                </label>
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Lieferdatum</label>
                <input type="date" value={lieferdatum} onChange={(e) => setLieferdatum(e.target.value)}
                  className="w-full rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 mb-4" />
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Gesamtrabatt</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={rabattProzent ?? ""} placeholder="0"
                    onChange={(e) => setRabattProzent(e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm text-right bg-white focus:outline-none focus:ring-2 focus:ring-blue-100" />
                  <span className="text-sm text-slate-500">%</span>
                </div>
              </div>
            </div>
          )}

          {/* ════ SUMMEN ════ */}
          <hr className="border-slate-100 mb-8" />
          <div className="flex justify-end">
            <div className="w-96 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Netto</span>
                <span className="tabular-nums font-medium text-slate-700">{summen.netto.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
              </div>
              {summen.gesamtRabatt > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Rabatt {rabattProzent}%</span>
                  <span className="tabular-nums text-green-600 font-medium">−{summen.gesamtRabatt.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                </div>
              )}
              {kleinunternehmer ? (
                <div className="flex justify-between text-slate-400 text-xs italic">
                  <span>Gem. § 19 UStG keine Umsatzsteuer</span><span>0,00 EUR</span>
                </div>
              ) : summen.mwstGruppen?.length > 0 ? (
                summen.mwstGruppen.map((g) => (
                  <div key={g.satz} className="flex justify-between text-slate-500">
                    <span>Umsatzsteuer {g.satz}%</span>
                    <span className="tabular-nums font-medium text-slate-700">{g.steuer.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between text-slate-500">
                  <span>Umsatzsteuer {mwstSatz}%</span>
                  <span className="tabular-nums font-medium text-slate-700">{summen.mwstBetrag.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl border-t-2 border-slate-200 pt-3 mt-1 text-slate-900">
                <span>Gesamt</span>
                <span className="tabular-nums">{summen.brutto.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
