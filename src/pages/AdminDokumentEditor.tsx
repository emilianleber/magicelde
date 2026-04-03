import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { dokumenteService } from "@/services/dokumenteService";
import type { DokumentTyp } from "@/types/dokumente";
import type { Artikel } from "@/types/dokumente";
import { ArrowLeft, Eye, Save, Send, X } from "lucide-react";

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
  { id: 1,  name: "Klassisch",     desc: "Farbbalken oben, schwarzer Tabellenkopf" },
  { id: 2,  name: "Wave Dark",     desc: "Dunkler Kopf mit Wellen-Akzent" },
  { id: 3,  name: "Split",         desc: "Firmenname groß links, Meta rechts" },
  { id: 4,  name: "Retro",         desc: "Schreibmaschinen-Stil, Unterstrich" },
  { id: 5,  name: "Seitenstreifen",desc: "Vertikaler Farbstreifen links" },
  { id: 6,  name: "Dark Premium",  desc: "Volle dunkle Kopfkarte" },
  { id: 7,  name: "Corporate",     desc: "Zentrierter Logo-Bereich, Trennlinie" },
  { id: 8,  name: "Kreativ",       desc: "Diagonale Farbfläche im Kopf" },
  { id: 9,  name: "Skandinavisch", desc: "Ultra-minimal, viel Weißraum" },
  { id: 10, name: "Luxus",         desc: "Doppelte Linien, edle Typografie" },
  { id: 11, name: "Rahmen",        desc: "Vollständige Dokumentrahmung" },
  { id: 12, name: "Technik",       desc: "Geometrisch, Großbuchstaben" },
  { id: 13, name: "Pfeile",        desc: "Pfeil-Trenner, moderner Stil" },
  { id: 14, name: "Panorama",      desc: "Voller Farbverlauf oben" },
  { id: 15, name: "Initialen",     desc: "Großes Monogramm-Badge" },
];

const TYP_LABEL: Record<string, string> = {
  angebot: "Angebot",
  rechnung: "Rechnung",
  auftragsbestaetigung: "Auftragsbestätigung",
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
    empfaengerName, empfaengerFirma, empfaengerAdresse, empfaengerPlz, empfaengerOrt, empfaengerLand,
    kopftext, fusstext, positionen, mwstSatz, kleinunternehmer, rabattProzent,
    absenderName, absenderUntertitel, absenderAdresse, absenderPlz, absenderOrt,
    absenderEmail, absenderTel, absenderWebsite, absenderIban, absenderBic, absenderSteuernummer,
    absenderInhaber, absenderLand,
  } = props;

  const summen = calcSummen(positionen, mwstSatz, kleinunternehmer, rabattProzent);
  const typLabel = TYP_LABEL[typ] || typ;
  const initials = (absenderName || "E").charAt(0).toUpperCase();

  // A4 preview: 595px wide × 842px tall → use real document proportions
  // Fonts match ~10pt body text at 72dpi
  const font = layoutId === 4 ? "'Courier New', Courier, monospace"
    : layoutId === 10 ? "Georgia, 'Times New Roman', serif"
    : "Inter, system-ui, -apple-system, sans-serif";

  const PX = {
    marginH: 52,        // 18mm horizontal margin
    logoSize: 68,       // logo placeholder
    logoTop: 22,
    logoRight: 52,
    headerH: 115,       // Briefkopf zone height
    absenderzeileY: 120,
    anschriftY: 138,
    betreffY: 295,
    bodyTextY: 318,
    tableY: 345,
    footerH: 82,        // footer zone height at bottom
    body: 9.5,          // base body font size
    title: 12,
    small: 8,
    caption: 7.5,
  };

  const metaRows = [
    { label: `${typLabel}-Nr.`, val: nummer || "—" },
    { label: "Datum", val: datum || "—" },
    ...(lieferdatum ? [{ label: "Lieferdatum", val: lieferdatum }] : []),
    ...(faelligAm   ? [{ label: "Zahlungsziel", val: faelligAm }]   : []),
    ...(gueltigBis  ? [{ label: "Gültig bis",   val: gueltigBis }]  : []),
    { label: "Ihre Kundennummer", val: "—" },
    { label: "Ihr Ansprechpartner", val: absenderName },
  ];

  const leistungPos = positionen.filter(p => p.typ === "leistung").slice(0, 8);

  // ── Shared DIN 5008 body (below Briefkopf) ────────────────────────────────
  const renderBody = (tableHBg: string, tableHColor: string) => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Zone B: Absenderzeile + Anschrift + Bezugszeichen */}
      <div style={{ padding: `8px ${PX.marginH}px 0`, display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Empfängerblock */}
        <div style={{ flex: "0 0 46%", fontSize: PX.body, lineHeight: 1.6, color: "#222" }}>
          {/* DIN 5008 Absenderzeile */}
          <div style={{ fontSize: PX.caption, color: "#999", borderBottom: "0.5px solid #ddd", paddingBottom: 2, marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {absenderName} – {absenderAdresse} – {absenderPlz} {absenderOrt}
          </div>
          {empfaengerFirma && <div style={{ fontWeight: 600 }}>{empfaengerFirma}</div>}
          <div>{empfaengerName || <span style={{ color: "#ccc" }}>Empfänger</span>}</div>
          {empfaengerAdresse && <div>{empfaengerAdresse}</div>}
          {(empfaengerPlz || empfaengerOrt) && <div>{empfaengerPlz} {empfaengerOrt}</div>}
          {empfaengerLand && empfaengerLand !== "Deutschland" && <div>{empfaengerLand}</div>}
        </div>
        {/* Informationsblock (Bezugszeichen) */}
        <div style={{ flex: 1, fontSize: PX.small + 0.5, lineHeight: 1.75 }}>
          {metaRows.map(r => (
            <div key={r.label} style={{ display: "flex" }}>
              <div style={{ color: "#888", minWidth: 100, flexShrink: 0 }}>{r.label}</div>
              <div style={{ fontWeight: 600, color: "#111" }}>{r.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Blank / Bezugszeile space */}
      <div style={{ height: 22 }} />

      {/* Zone C: Betreff */}
      <div style={{ padding: `0 ${PX.marginH}px 4px` }}>
        <div style={{ fontSize: PX.title, fontWeight: 700, color: "#111" }}>
          {typLabel}{nummer ? ` ${nummer}` : ""}
        </div>
      </div>

      {/* Anrede + Kopftext */}
      <div style={{ padding: `0 ${PX.marginH}px 6px`, fontSize: PX.body, color: "#333", lineHeight: 1.55 }}>
        {kopftext
          ? <>{kopftext.substring(0, 200)}{kopftext.length > 200 ? "…" : ""}</>
          : <>Sehr geehrte Damen und Herren,<br />vielen Dank für Ihre Anfrage. Gerne unterbreite ich Ihnen das gewünschte Angebot:</>
        }
      </div>

      {/* Positionen-Tabelle */}
      <div style={{ padding: `0 ${PX.marginH}px`, flex: 1 }}>
        {/* Tabellenkopf */}
        <div style={{ display: "flex", backgroundColor: tableHBg, color: tableHColor, padding: "4px 6px", fontSize: PX.small, fontWeight: 700 }}>
          <span style={{ width: 28 }}>Pos.</span>
          <span style={{ flex: 4 }}>Beschreibung</span>
          <span style={{ width: 52, textAlign: "right" }}>Menge</span>
          <span style={{ width: 62, textAlign: "right" }}>Einzelpreis</span>
          <span style={{ width: 68, textAlign: "right" }}>Gesamtpreis</span>
        </div>
        {leistungPos.length === 0 ? (
          <div style={{ padding: "6px 6px", fontSize: PX.small, color: "#ccc", borderBottom: "0.5px solid #eee" }}>
            Noch keine Positionen
          </div>
        ) : leistungPos.map((pos, i) => (
          <div key={pos.id} style={{ display: "flex", padding: "3.5px 6px", backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff", borderBottom: "0.5px solid #ebebeb", fontSize: PX.small + 0.5 }}>
            <span style={{ width: 28, color: "#999" }}>{i + 1}.</span>
            <span style={{ flex: 4, color: pos.bezeichnung ? "#111" : "#bbb" }}>{pos.bezeichnung || "(keine Bezeichnung)"}</span>
            <span style={{ width: 52, textAlign: "right", color: "#555" }}>{pos.menge} {pos.einheit?.substring(0, 4)}</span>
            <span style={{ width: 62, textAlign: "right", color: "#555" }}>{fmt(pos.einzelpreis)}</span>
            <span style={{ width: 68, textAlign: "right", fontWeight: 600, color: "#111" }}>{fmt(pos.gesamt)}</span>
          </div>
        ))}
        <div style={{ borderTop: "0.5px solid #ccc", marginTop: 1 }} />
      </div>

      {/* Summen */}
      <div style={{ padding: `4px ${PX.marginH}px`, display: "flex", justifyContent: "flex-end" }}>
        <div style={{ minWidth: 210, fontSize: PX.body }}>
          <div style={{ display: "flex", justifyContent: "space-between", lineHeight: 1.9, color: "#555" }}>
            <span>Gesamtbetrag netto</span>
            <span style={{ color: "#111" }}>{fmt(summen.netto)}</span>
          </div>
          {!kleinunternehmer && mwstSatz > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", lineHeight: 1.9, color: "#555" }}>
              <span>zzgl. MwSt. {mwstSatz}%</span>
              <span style={{ color: "#111" }}>{fmt(summen.mwstBetrag)}</span>
            </div>
          )}
          {kleinunternehmer && (
            <div style={{ fontSize: PX.small, color: "#999", lineHeight: 1.4, marginBottom: 3 }}>
              Umsatzsteuer nicht erhoben gemäß §19 UStG.
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #111", paddingTop: 3, marginTop: 2, fontWeight: 700, fontSize: PX.body + 1 }}>
            <span>Gesamtbetrag brutto</span>
            <span style={{ color }}>{fmt(summen.brutto)}</span>
          </div>
        </div>
      </div>

      {/* Fußtext / Zahlungsbedingungen */}
      {fusstext && (
        <div style={{ padding: `3px ${PX.marginH}px`, fontSize: PX.small + 0.5, color: "#444", lineHeight: 1.55 }}>
          {fusstext.substring(0, 200)}{fusstext.length > 200 ? "…" : ""}
        </div>
      )}

      {/* Grußformel */}
      <div style={{ padding: `6px ${PX.marginH}px 4px`, fontSize: PX.body, color: "#333", lineHeight: 1.6 }}>
        Mit magischen Grüßen
        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 600 }}>{absenderName}</div>
          {absenderUntertitel && <div style={{ color: "#666" }}>{absenderUntertitel}</div>}
        </div>
      </div>

      {/* ── DIN 5008 Fußzeile: 4 Spalten ────────────────────────────────── */}
      <div style={{ borderTop: "0.75px solid #bbb", margin: `4px ${PX.marginH}px 0`, paddingTop: 6, paddingBottom: 8, display: "flex", gap: 0, fontSize: PX.caption + 0.5, color: "#555", lineHeight: 1.65 }}>
        {/* Spalte 1: Adresse */}
        <div style={{ flex: 1 }}>
          <div>{absenderName} {absenderUntertitel}</div>
          {absenderAdresse && <div>{absenderAdresse}</div>}
          {(absenderPlz || absenderOrt) && <div>{absenderPlz} {absenderOrt}</div>}
          {absenderLand && <div>{absenderLand}</div>}
        </div>
        {/* Spalte 2: Kontakt */}
        <div style={{ flex: 1 }}>
          {absenderTel     && <div>Tel. {absenderTel}</div>}
          {absenderEmail   && <div>E-Mail {absenderEmail}</div>}
          {absenderWebsite && <div>Web {absenderWebsite}</div>}
        </div>
        {/* Spalte 3: Steuer */}
        <div style={{ flex: 1 }}>
          {absenderSteuernummer && <div>Steuer-Nr. {absenderSteuernummer}</div>}
          {absenderInhaber      && <div>Inhaber/-in {absenderInhaber}</div>}
        </div>
        {/* Spalte 4: Bank */}
        <div style={{ flex: 1 }}>
          {absenderIban && <div>IBAN {absenderIban}</div>}
          {absenderBic  && <div>BIC {absenderBic}</div>}
        </div>
      </div>
    </div>
  );

  // ── DIN 5008 Body (shared across all layouts) ────────────────────────────────
  const renderDIN5008Body = (tableHeaderBg = "#111", tableHeaderColor = "#fff", dark = false) => {
    const metaRows = [
      { label: `${typLabel}-Nr.`, val: nummer || "—" },
      { label: "Datum", val: datum || "—" },
      ...(lieferdatum ? [{ label: "Lieferdatum", val: lieferdatum }] : []),
      ...(faelligAm ? [{ label: "Zahlungsziel", val: faelligAm }] : []),
      ...(gueltigBis ? [{ label: "Gültig bis", val: gueltigBis }] : []),
      { label: "Ansprechpartner", val: absenderName },
    ];
    const leistungPos = positionen.filter(p => p.typ === "leistung").slice(0, 7);

    return (
      <>
        {/* ── DIN 5008 Zone B: Anschriftfeld links + Informationsblock rechts ── */}
        <div style={{ display: "flex", padding: "4px 14px 0", gap: "8px", alignItems: "flex-start" }}>
          {/* Empfängerfeld (DIN 5008: 40mm hoch, 85mm breit) */}
          <div style={{ flex: "0 0 50%", fontSize: "6px", lineHeight: 1.65 }}>
            {/* Absenderzeile */}
            <div style={{ fontSize: "5px", color: "#888", borderBottom: "0.5px solid #ddd", paddingBottom: "1.5px", marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {absenderName} – {absenderAdresse} – {absenderPlz} {absenderOrt}
            </div>
            {empfaengerFirma && <div style={{ fontWeight: "bold", color: "#111" }}>{empfaengerFirma}</div>}
            <div style={{ color: "#111" }}>{empfaengerName || "–"}</div>
            {empfaengerAdresse && <div style={{ color: "#444" }}>{empfaengerAdresse}</div>}
            {(empfaengerPlz || empfaengerOrt) && <div style={{ color: "#444" }}>{empfaengerPlz} {empfaengerOrt}</div>}
            {empfaengerLand && empfaengerLand !== "Deutschland" && <div style={{ color: "#666" }}>{empfaengerLand}</div>}
          </div>
          {/* Informationsblock (Bezugszeichen) */}
          <div style={{ flex: 1, fontSize: "6px" }}>
            {metaRows.map(r => (
              <div key={r.label} style={{ display: "flex", lineHeight: 1.65 }}>
                <div style={{ color: "#888", width: "56px", flexShrink: 0 }}>{r.label}</div>
                <div style={{ fontWeight: "600", color: "#111", flex: 1 }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIN 5008 Leerraum ── */}
        <div style={{ height: "6px" }} />

        {/* ── DIN 5008 Zone C: Betreff ── */}
        <div style={{ padding: "0 14px 3px" }}>
          <div style={{ fontSize: "7.5px", fontWeight: "700", color: "#111" }}>
            {typLabel}{nummer ? ` ${nummer}` : ""}
          </div>
        </div>

        {/* ── Anrede + Kopftext ── */}
        {kopftext ? (
          <div style={{ padding: "1px 14px 3px", fontSize: "6px", color: "#333", lineHeight: 1.5 }}>
            {kopftext.substring(0, 120)}{kopftext.length > 120 ? "…" : ""}
          </div>
        ) : (
          <div style={{ padding: "1px 14px 3px", fontSize: "6px", color: "#333" }}>
            Sehr geehrte Damen und Herren,
          </div>
        )}

        {/* ── Positionen-Tabelle ── */}
        <div style={{ padding: "3px 14px 0" }}>
          {/* Tabellenkopf */}
          <div style={{ display: "flex", backgroundColor: tableHeaderBg, color: tableHeaderColor, padding: "2px 3px", fontSize: "5.5px", fontWeight: "bold" }}>
            <span style={{ width: "16px" }}>Pos.</span>
            <span style={{ flex: 4 }}>Beschreibung</span>
            <span style={{ width: "32px", textAlign: "right" }}>Menge</span>
            <span style={{ width: "38px", textAlign: "right" }}>Einzelpr.</span>
            <span style={{ width: "40px", textAlign: "right" }}>Gesamtpr.</span>
          </div>
          {/* Zeilen */}
          {leistungPos.map((pos, i) => (
            <div key={pos.id} style={{ display: "flex", padding: "1.5px 3px", backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff", borderBottom: "0.5px solid #ececec", fontSize: "5.5px" }}>
              <span style={{ width: "16px", color: "#888" }}>{i + 1}.</span>
              <span style={{ flex: 4, color: pos.bezeichnung ? "#111" : "#ccc" }}>{pos.bezeichnung || "(keine Bezeichnung)"}</span>
              <span style={{ width: "32px", textAlign: "right", color: "#555" }}>{pos.menge} {pos.einheit?.substring(0, 4)}</span>
              <span style={{ width: "38px", textAlign: "right", color: "#555" }}>{fmt(pos.einzelpreis)}</span>
              <span style={{ width: "40px", textAlign: "right", fontWeight: "600", color: "#111" }}>{fmt(pos.gesamt)}</span>
            </div>
          ))}
          {/* Trennlinie */}
          <div style={{ borderTop: "0.5px solid #ddd", marginTop: "1px" }} />
        </div>

        {/* ── Summen (rechts ausgerichtet, DIN 5008) ── */}
        <div style={{ padding: "3px 14px", display: "flex", justifyContent: "flex-end" }}>
          <div style={{ minWidth: "140px", fontSize: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", lineHeight: 1.8, color: "#555" }}>
              <span>Gesamtbetrag netto</span>
              <span style={{ color: "#111" }}>{fmt(summen.netto)}</span>
            </div>
            {!kleinunternehmer && mwstSatz > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", lineHeight: 1.8, color: "#555" }}>
                <span>zzgl. MwSt. {mwstSatz}%</span>
                <span style={{ color: "#111" }}>{fmt(summen.mwstBetrag)}</span>
              </div>
            )}
            {kleinunternehmer && (
              <div style={{ fontSize: "5px", color: "#999", lineHeight: 1.4, marginBottom: "2px" }}>
                Umsatzsteuer nicht erhoben gemäß §19 UStG.
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #111", paddingTop: "2px", marginTop: "1px", fontWeight: "bold", fontSize: "7px" }}>
              <span>Gesamtbetrag brutto</span>
              <span style={{ color }}>{fmt(summen.brutto)}</span>
            </div>
          </div>
        </div>

        {/* ── Fußtext / Zahlungsbedingungen ── */}
        {fusstext && (
          <div style={{ padding: "2px 14px", fontSize: "5.5px", color: "#555", lineHeight: 1.4 }}>
            {fusstext.substring(0, 120)}{fusstext.length > 120 ? "…" : ""}
          </div>
        )}

        {/* ── Grußformel ── */}
        <div style={{ padding: "3px 14px 2px", fontSize: "6px", color: "#333" }}>
          Mit magischen Grüßen
          <div style={{ marginTop: "4px" }}>
            <div style={{ fontWeight: "600" }}>{absenderName}</div>
            {absenderUntertitel && <div style={{ color: "#777" }}>{absenderUntertitel}</div>}
          </div>
        </div>

        {/* ── DIN 5008 Fußzeile ── */}
        <div style={{ borderTop: "0.5px solid #ccc", margin: "2px 14px 0", paddingTop: "2px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "5px", color: "#999" }}>
            <span>{absenderName} – {absenderAdresse} – {absenderPlz} {absenderOrt}</span>
            {absenderIban && <span>IBAN: {absenderIban.replace(/(.{4})/g, "$1 ").trim()}</span>}
            {absenderSteuernummer && <span>St.-Nr.: {absenderSteuernummer}</span>}
          </div>
          {(absenderTel || absenderEmail || absenderWebsite) && (
            <div style={{ display: "flex", gap: "8px", fontSize: "5px", color: "#bbb", marginTop: "1px" }}>
              {absenderTel && <span>Tel.: {absenderTel}</span>}
              {absenderEmail && <span>{absenderEmail}</span>}
              {absenderWebsite && <span>{absenderWebsite}</span>}
            </div>
          )}
        </div>
      </>
    );
  };

  // ── Briefkopf-Bausteine ──────────────────────────────────────────────────────
  const M = PX.marginH;
  const LS = PX.logoSize;

  // Logo-Platzhalter (oben rechts, wie im DIN 5008 Beispiel)
  const LogoBox = ({ dark = false }: { dark?: boolean }) => (
    <div style={{ position: "absolute", top: PX.logoTop, right: M, width: LS, height: LS, borderRadius: 6, backgroundColor: dark ? "rgba(255,255,255,0.12)" : "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2 }}>
      <div style={{ fontSize: 9, color: dark ? "rgba(255,255,255,0.35)" : "#ccc", fontWeight: 600, letterSpacing: 0.5 }}>LOGO</div>
    </div>
  );

  // Absender-Textblock (oben links)
  const AbsenderBlock = ({ color: c = "#111", sub = "#666", addr = "#888" }: { color?: string; sub?: string; addr?: string }) => (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: c, lineHeight: 1.25 }}>{absenderName}</div>
      {absenderUntertitel && <div style={{ fontSize: 9.5, color: sub, marginTop: 1 }}>{absenderUntertitel}</div>}
      <div style={{ fontSize: 8.5, color: addr, marginTop: 3, lineHeight: 1.55 }}>
        {absenderAdresse && <div>{absenderAdresse}</div>}
        {(absenderPlz || absenderOrt) && <div>{absenderPlz} {absenderOrt}</div>}
      </div>
    </div>
  );

  // Kontakt-Textblock (oben rechts, neben/unter Logo)
  const KontaktBlock = ({ c = "#666" }: { c?: string }) => (
    <div style={{ fontSize: 8.5, color: c, lineHeight: 1.65, textAlign: "right" }}>
      {absenderTel     && <div>{absenderTel}</div>}
      {absenderEmail   && <div>{absenderEmail}</div>}
      {absenderWebsite && <div>{absenderWebsite}</div>}
    </div>
  );

  // Wrapper
  const wrap = (bg: string, header: React.ReactNode, thBg: string, thColor: string) => (
    <div style={{ width: "100%", height: "100%", backgroundColor: bg, fontFamily: font, color: "#1a1a1a", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {header}
      {renderBody(thBg, thColor)}
    </div>
  );

  // ── 15 Layouts ────────────────────────────────────────────────────────────────
  switch (layoutId) {

    // 1 – Klassisch: Voller Farbbalken, Logo rechts weiß
    case 1: return wrap("#fff",
      <div style={{ backgroundColor: color, padding: `${PX.logoTop}px ${M}px 18px`, position: "relative", minHeight: PX.headerH }}>
        <AbsenderBlock color="#fff" sub="rgba(255,255,255,0.8)" addr="rgba(255,255,255,0.65)" />
        <div style={{ position: "absolute", top: PX.logoTop, right: M, width: LS, height: LS, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>LOGO</div>
        </div>
        <div style={{ position: "absolute", bottom: 18, right: M }}>
          <KontaktBlock c="rgba(255,255,255,0.7)" />
        </div>
      </div>,
      "#111", "#fff"
    );

    // 2 – Wave Dark
    case 2: return wrap("#fff",
      <div style={{ backgroundColor: "#111", padding: `${PX.logoTop}px ${M}px 28px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ position: "absolute", top: 8, left: M }}>
          <div style={{ fontSize: 8, color: color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{absenderUntertitel}</div>
        </div>
        <div style={{ marginTop: 20 }}>
          <AbsenderBlock color="#fff" sub="rgba(255,255,255,0.6)" addr="rgba(255,255,255,0.4)" />
        </div>
        <LogoBox dark />
        <div style={{ position: "absolute", bottom: 22, right: M }}><KontaktBlock c="rgba(255,255,255,0.45)" /></div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 10, backgroundColor: "#fff", borderRadius: "60% 60% 0 0" }} />
      </div>,
      "#111", "#fff"
    );

    // 3 – Split: Firmenname riesig + Farbverlauf-Linie
    case 3: return wrap("#fff",
      <div style={{ padding: `${PX.logoTop}px ${M}px 12px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1, letterSpacing: -1 }}>{absenderName}</div>
            {absenderUntertitel && <div style={{ fontSize: 9.5, color: "#aaa", marginTop: 2 }}>{absenderUntertitel}</div>}
            <div style={{ fontSize: 8.5, color: "#bbb", marginTop: 3 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <LogoBox />
            <div style={{ marginTop: 6 }}><KontaktBlock c="#888" /></div>
          </div>
        </div>
        <div style={{ marginTop: 14, height: 2, background: `linear-gradient(to right, ${color}, transparent)`, borderRadius: 1 }} />
      </div>,
      color, "#fff"
    );

    // 4 – Retro: Typewriter, doppelte Linie
    case 4: return wrap("#fffef8",
      <div style={{ padding: `${PX.logoTop}px ${M}px 12px` }}>
        <div style={{ borderTop: "2px solid #111", borderBottom: "2px solid #111", padding: "8px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{absenderName}</div>
            {absenderUntertitel && <div style={{ fontSize: 8.5, letterSpacing: 1, color: "#555", marginTop: 1 }}>{absenderUntertitel.toUpperCase()}</div>}
            <div style={{ fontSize: 8, color: "#666", marginTop: 3 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <KontaktBlock c="#555" />
          </div>
        </div>
      </div>,
      "#111", "#fffef8"
    );

    // 5 – Seitenstreifen
    case 5: return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "#fff", fontFamily: font, color: "#1a1a1a", overflow: "hidden", display: "flex" }}>
        <div style={{ width: 14, backgroundColor: color, flexShrink: 0 }} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: `${PX.logoTop}px ${M - 14}px 12px`, position: "relative", minHeight: PX.headerH, borderBottom: "0.5px solid #e5e5e5" }}>
            <AbsenderBlock />
            <LogoBox />
            <div style={{ position: "absolute", bottom: 12, right: M - 14 }}><KontaktBlock c="#888" /></div>
          </div>
          {renderBody(color, "#fff")}
        </div>
      </div>
    );

    // 6 – Dark Premium
    case 6: return wrap("#fff",
      <div style={{ backgroundColor: "#111", padding: `${PX.logoTop}px ${M}px 18px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ width: 28, height: 3, backgroundColor: color, borderRadius: 2, marginBottom: 8 }} />
        <AbsenderBlock color="#fff" sub="rgba(255,255,255,0.55)" addr="rgba(255,255,255,0.35)" />
        <LogoBox dark />
        <div style={{ position: "absolute", bottom: 18, right: M }}><KontaktBlock c="rgba(255,255,255,0.4)" /></div>
      </div>,
      "#222", "#fff"
    );

    // 7 – Corporate: zentriert
    case 7: return wrap("#fff",
      <div style={{ padding: `${PX.logoTop}px ${M}px 12px`, textAlign: "center", position: "relative", minHeight: PX.headerH }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: LS * 0.8, height: LS * 0.55, borderRadius: 5, backgroundColor: "#eee" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{absenderName}</div>
            {absenderUntertitel && <div style={{ fontSize: 9, color: "#999" }}>{absenderUntertitel}</div>}
          </div>
        </div>
        <div style={{ fontSize: 8, color: "#bbb" }}>{absenderAdresse} · {absenderPlz} {absenderOrt}{absenderTel ? ` · ${absenderTel}` : ""}{absenderEmail ? ` · ${absenderEmail}` : ""}</div>
        <div style={{ height: 1.5, background: `linear-gradient(to right, transparent, ${color}, transparent)`, marginTop: 10 }} />
      </div>,
      color, "#fff"
    );

    // 8 – Kreativ: Diagonal
    case 8: return wrap("#fff",
      <div style={{ position: "relative", height: PX.headerH, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#f5f5f5" }} />
        <div style={{ position: "absolute", top: 0, left: 0, width: "62%", height: "100%", backgroundColor: color, clipPath: "polygon(0 0, 90% 0, 72% 100%, 0 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: `0 ${M}px` }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{absenderName}</div>
            {absenderUntertitel && <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)" }}>{absenderUntertitel}</div>}
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ width: LS * 0.75, height: LS * 0.55, borderRadius: 4, backgroundColor: "rgba(0,0,0,0.08)", marginBottom: 4, marginLeft: "auto" }} />
            <KontaktBlock c="#777" />
          </div>
        </div>
      </div>,
      "#111", "#fff"
    );

    // 9 – Skandinavisch
    case 9: return wrap("#fff",
      <div style={{ padding: `${PX.logoTop}px ${M}px 14px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ width: 20, height: 2, backgroundColor: color }} />
          <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: -0.3 }}>{absenderName}</div>
        </div>
        {absenderUntertitel && <div style={{ fontSize: 8.5, color: "#bbb", marginLeft: 28 }}>{absenderUntertitel}</div>}
        <div style={{ fontSize: 8, color: "#ccc", marginLeft: 28, marginTop: 2 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
        <LogoBox />
        <div style={{ position: "absolute", bottom: 14, right: M }}><KontaktBlock c="#ccc" /></div>
        <div style={{ marginTop: 16, borderBottom: "0.75px solid #e0e0e0" }} />
      </div>,
      "#f2f2f2", "#333"
    );

    // 10 – Luxus: Serif, doppelte Linien
    case 10: return wrap("#fffdf8",
      <div style={{ padding: `${PX.logoTop}px ${M}px 14px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ height: 0.75, backgroundColor: color, marginBottom: 10 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, fontStyle: "italic" }}>{absenderName}</div>
            {absenderUntertitel && <div style={{ fontSize: 9, color: "#aaa", fontStyle: "italic" }}>{absenderUntertitel}</div>}
            <div style={{ fontSize: 8, color: "#bbb", marginTop: 3 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
          </div>
          <div>
            <div style={{ width: LS * 0.75, height: LS * 0.55, borderRadius: 4, backgroundColor: "#f0ebe0", marginBottom: 4 }} />
            <KontaktBlock c="#aaa" />
          </div>
        </div>
        <div style={{ height: 0.75, backgroundColor: color, marginTop: 10 }} />
      </div>,
      "#f0e8d8", "#5a4030"
    );

    // 11 – Rahmen
    case 11: return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "#fff", fontFamily: font, color: "#1a1a1a", overflow: "hidden", padding: 6, display: "flex", flexDirection: "column" }}>
        <div style={{ border: `2px solid ${color}`, flex: 1, borderRadius: 3, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ backgroundColor: color, padding: `${PX.logoTop * 0.6}px ${M - 6}px 14px`, position: "relative", minHeight: PX.headerH * 0.85 }}>
            <AbsenderBlock color="#fff" sub="rgba(255,255,255,0.8)" addr="rgba(255,255,255,0.6)" />
            <div style={{ position: "absolute", top: 12, right: M - 6, width: LS * 0.75, height: LS * 0.55, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div style={{ position: "absolute", bottom: 14, right: M - 6 }}><KontaktBlock c="rgba(255,255,255,0.7)" /></div>
          </div>
          {renderBody("#111", "#fff")}
        </div>
      </div>
    );

    // 12 – Technik: Zweispaltig Header
    case 12: return wrap("#f8f9fb",
      <div style={{ display: "flex", borderBottom: `2.5px solid ${color}`, minHeight: PX.headerH }}>
        <div style={{ flex: "0 0 58%", backgroundColor: color + "13", padding: `${PX.logoTop}px ${M}px 14px`, borderRight: `1px solid ${color}20` }}>
          <div style={{ fontSize: 8.5, color: color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Absender</div>
          <AbsenderBlock color="#111" sub="#666" addr="#888" />
        </div>
        <div style={{ flex: 1, padding: `${PX.logoTop}px 20px 14px`, position: "relative" }}>
          <div style={{ fontSize: 8.5, color: color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Kontakt</div>
          <div style={{ fontSize: 8.5, color: "#555", lineHeight: 1.65 }}>
            {absenderTel     && <div>{absenderTel}</div>}
            {absenderEmail   && <div>{absenderEmail}</div>}
            {absenderWebsite && <div>{absenderWebsite}</div>}
            {absenderSteuernummer && <div style={{ marginTop: 4, color: "#888" }}>St.-Nr.: {absenderSteuernummer}</div>}
          </div>
          <div style={{ position: "absolute", top: PX.logoTop, right: 20, width: LS * 0.7, height: LS * 0.5, borderRadius: 4, backgroundColor: "#e8eaed" }} />
        </div>
      </div>,
      color, "#fff"
    );

    // 13 – Pfeile
    case 13: return wrap("#fff",
      <div style={{ padding: `${PX.logoTop}px ${M}px 12px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>{absenderName}</span>
          {absenderUntertitel && <>
            <span style={{ color: color, fontWeight: 700, fontSize: 14 }}>›</span>
            <span style={{ color: "#888", fontSize: 9.5 }}>{absenderUntertitel}</span>
          </>}
          <span style={{ color: color, fontWeight: 700, fontSize: 14 }}>›</span>
          <span style={{ color: "#aaa", fontSize: 8.5 }}>{absenderAdresse}</span>
          <span style={{ color: color, fontWeight: 700, fontSize: 14 }}>›</span>
          <span style={{ color: "#aaa", fontSize: 8.5 }}>{absenderPlz} {absenderOrt}</span>
        </div>
        <div style={{ fontSize: 8, color: "#bbb", display: "flex", gap: 12 }}>
          {absenderTel && <span>{absenderTel}</span>}
          {absenderEmail && <span>{absenderEmail}</span>}
        </div>
        <LogoBox />
        <div style={{ marginTop: 14, height: 1, backgroundColor: color }} />
      </div>,
      "#111", "#fff"
    );

    // 14 – Panorama: Farbverlauf
    case 14: return wrap("#fff",
      <div style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, padding: `${PX.logoTop}px ${M}px 18px`, position: "relative", minHeight: PX.headerH }}>
        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{absenderUntertitel}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{absenderName}</div>
        <div style={{ fontSize: 8.5, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
        <div style={{ position: "absolute", top: PX.logoTop, right: M, width: LS, height: LS, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>LOGO</div>
        </div>
        <div style={{ position: "absolute", bottom: 18, right: M }}><KontaktBlock c="rgba(255,255,255,0.65)" /></div>
      </div>,
      "#111", "#fff"
    );

    // 15 – Initialen: Monogramm
    case 15: return wrap("#fff",
      <div style={{ padding: `${PX.logoTop}px ${M}px 14px`, display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid #eee", minHeight: PX.headerH }}>
        <div style={{ width: LS, height: LS, borderRadius: 14, backgroundColor: color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 26 }}>
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{absenderName}</div>
          {absenderUntertitel && <div style={{ fontSize: 9.5, color: "#aaa" }}>{absenderUntertitel}</div>}
          <div style={{ fontSize: 8.5, color: "#bbb", marginTop: 3 }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <KontaktBlock c="#999" />
        </div>
      </div>,
      color, "#fff"
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
  const [gueltigBis, setGueltigBis] = useState("");
  const [faelligAm, setFaelligAm] = useState(addDays(14));
  const [zahlungszielTage, setZahlungszielTage] = useState(14);
  const [lieferdatum, setLieferdatum] = useState("");

  // Contact
  const [kontaktSuche, setKontaktSuche] = useState("");
  const [kontaktSuggestions, setKontaktSuggestions] = useState<Record<string, string>[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
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

  // UI
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [showVorschau, setShowVorschau] = useState(false);

  const currentColor = FARBEN[selectedColor - 1];

  // Load admin settings
  useEffect(() => {
    if (!authChecked) return;
    supabase.from("admin_settings").select("*").limit(1).maybeSingle().then(({ data }) => {
      if (data) {
        setAbsenderName((data.company_name as string) || "Emilian Leber");
        setAbsenderUntertitel((data.company_subtitle as string) || "Zauberer und Mentalist");
        setAbsenderAdresse((data.company_address as string) || "");
        setAbsenderPlz((data.company_zip as string) || "");
        setAbsenderOrt((data.company_city as string) || "");
        setAbsenderEmail((data.company_email as string) || "");
        setAbsenderTel((data.company_phone as string) || "");
        setAbsenderWebsite((data.company_website as string) || "");
        setAbsenderIban((data.bank_iban as string) || "");
        setAbsenderBic((data.bank_bic as string) || "");
        setAbsenderSteuernummer((data.tax_id as string) || "");
        setAbsenderInhaber((data.company_owner as string) || (data.company_name as string) || "");
        setAbsenderLand((data.company_country as string) || "Deutschland");
      }
    });
  }, [authChecked]);

  // Load existing document for edit
  useEffect(() => {
    if (!authChecked || isNew || !id) return;
    dokumenteService.getById(id).then((doc) => {
      if (!doc) { navigate("/admin/dokumente"); return; }
      setTyp(doc.typ);
      setNummer(doc.nummer);
      setDatum(doc.datum);
      setGueltigBis(doc.gueltigBis || "");
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
      .select("id, name, company, email, rechnungs_strasse, rechnungs_plz, rechnungs_ort, rechnungs_land")
      .or(`name.ilike.%${q}%,company.ilike.%${q}%,email.ilike.%${q}%`)
      .limit(5);
    setKontaktSuggestions((data || []) as Record<string, string>[]);
  };

  const selectKontakt = (k: Record<string, string>) => {
    setEmpfaengerName(k.name || "");
    setEmpfaengerFirma(k.company || "");
    setEmpfaengerAdresse(k.rechnungs_strasse || "");
    setEmpfaengerPlz(k.rechnungs_plz || "");
    setEmpfaengerOrt(k.rechnungs_ort || "");
    setEmpfaengerLand(k.rechnungs_land || "Deutschland");
    setKontaktSuche(k.name || "");
    setKontaktSuggestions([]);
    setSelectedCustomerId(k.id || null);
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

      const typMap: Record<string, DokumentTyp> = {
        angebot: "angebot",
        rechnung: "rechnung",
        auftragsbestaetigung: "auftragsbestaetigung",
      };
      const dokumentTyp = typMap[typ] || "angebot";

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
            rabattProzent: rabattProzent ?? undefined,
          },
          posForService,
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
            rabattProzent: rabattProzent ?? undefined,
          },
          posForService,
        );
        setMessage("Gespeichert");
      }
    } catch (e: unknown) {
      setMessage("Fehler: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
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
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: "100dvh" }}>

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
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
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
                className="bg-white rounded-xl shadow-2xl overflow-hidden"
                style={{ width: "min(595px, 100%)", aspectRatio: "210/297" }}
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
      <div className="shrink-0 flex items-center justify-between px-6 py-3 border-b border-border/20 bg-background z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-base font-bold leading-tight">
              {isNew ? `Neues ${typLabel}` : `${typLabel} bearbeiten`}
            </h1>
            <p className="text-xs text-muted-foreground">{nummer || "Nummer wird beim Speichern vergeben"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {message && (
            <span className={`text-xs px-3 py-1.5 rounded-lg ${message.startsWith("Fehler") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
              {message}
            </span>
          )}
          <button
            onClick={() => setShowVorschau(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Vorschau
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border/30 text-sm font-medium hover:bg-muted/60 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Speichere…" : "Speichern"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
            <Send className="w-4 h-4" />
            Versenden
          </button>
        </div>
      </div>

      {/* FULL-WIDTH FORM */}
      <div className="flex-1 overflow-hidden flex min-h-0 relative">
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 max-w-3xl mx-auto w-full pb-24">

          {/* EMPFÄNGER */}
          <section>
            <h2 className="text-sm font-semibold mb-3">Empfänger</h2>
            {/* Contact autocomplete */}
            <div className="relative mb-3">
              <input
                placeholder="Person oder Organisation suchen…"
                value={kontaktSuche}
                onChange={(e) => searchKontakte(e.target.value)}
                className={inputCls}
              />
              {kontaktSuggestions.length > 0 && (
                <div className="absolute z-20 top-full left-0 right-0 bg-background border border-border/30 rounded-xl shadow-lg mt-1 overflow-hidden">
                  {kontaktSuggestions.map((k) => (
                    <button
                      key={k.id}
                      onClick={() => selectKontakt(k)}
                      className="w-full text-left px-4 py-2.5 hover:bg-muted/60 text-sm flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{k.name}</p>
                        {k.company && <p className="text-xs text-muted-foreground">{k.company}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground">{k.email}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Editable address fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Name</label>
                <input placeholder="Name" value={empfaengerName} onChange={(e) => setEmpfaengerName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Firma (optional)</label>
                <input placeholder="Firma" value={empfaengerFirma} onChange={(e) => setEmpfaengerFirma(e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Straße und Hausnummer</label>
                <input placeholder="Straße und Hausnummer" value={empfaengerAdresse} onChange={(e) => setEmpfaengerAdresse(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>PLZ</label>
                <input placeholder="PLZ" value={empfaengerPlz} onChange={(e) => setEmpfaengerPlz(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Ort</label>
                <input placeholder="Ort" value={empfaengerOrt} onChange={(e) => setEmpfaengerOrt(e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Land</label>
                <input placeholder="Land" value={empfaengerLand} onChange={(e) => setEmpfaengerLand(e.target.value)} className={inputCls} />
              </div>
            </div>
          </section>

          {/* DOKUMENT-INFO */}
          <section>
            <h2 className="text-sm font-semibold mb-3">{typLabel}sinformationen</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>{typLabel}sdatum</label>
                <input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Lieferdatum</label>
                <input type="date" value={lieferdatum} onChange={(e) => setLieferdatum(e.target.value)} className={inputCls} />
              </div>
              {isNew && (
                <div>
                  <label className={labelCls}>Dokumenttyp</label>
                  <select value={typ} onChange={(e) => setTyp(e.target.value)} className={inputCls}>
                    <option value="angebot">Angebot</option>
                    <option value="rechnung">Rechnung</option>
                    <option value="auftragsbestaetigung">Auftragsbestätigung</option>
                  </select>
                </div>
              )}
              {!isNew && (
                <div>
                  <label className={labelCls}>{typLabel}snummer</label>
                  <input value={nummer} onChange={(e) => setNummer(e.target.value)} className={inputCls} />
                </div>
              )}
              {typ === "angebot" && (
                <div>
                  <label className={labelCls}>Gültig bis</label>
                  <input type="date" value={gueltigBis} onChange={(e) => setGueltigBis(e.target.value)} className={inputCls} />
                </div>
              )}
              {(typ === "rechnung" || typ === "auftragsbestaetigung") && (
                <div>
                  <label className={labelCls}>Zahlungsziel</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={faelligAm}
                      onChange={(e) => setFaelligAm(e.target.value)}
                      className="flex-1 rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    />
                    <span className="text-xs text-muted-foreground shrink-0">in</span>
                    <input
                      type="number"
                      value={zahlungszielTage}
                      onChange={(e) => {
                        const days = parseInt(e.target.value) || 0;
                        setZahlungszielTage(days);
                        setFaelligAm(addDays(days));
                      }}
                      className="w-16 rounded-xl bg-background border border-border/30 px-2 py-2 text-sm text-right focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    />
                    <span className="text-xs text-muted-foreground shrink-0">Tagen</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* KOPFTEXT */}
          <section>
            <h2 className="text-sm font-semibold mb-3">Kopftext</h2>
            <input
              readOnly
              value={nummer ? `${typLabel} Nr. ${nummer}` : typLabel}
              className={`${inputCls} mb-2 bg-muted/20 cursor-default`}
            />
            <textarea
              placeholder="Anschreiben…"
              value={kopftext}
              onChange={(e) => setKopftext(e.target.value)}
              rows={4}
              className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
            />
          </section>

          {/* POSITIONS */}
          <section>
            <h2 className="text-sm font-semibold mb-3">Positionen</h2>

            {/* Column headers */}
            <div
              className="hidden sm:grid text-[10px] text-muted-foreground uppercase font-semibold px-2 pb-1"
              style={{ gridTemplateColumns: "2fr 60px 80px 90px 60px 90px 28px" }}
            >
              <span>Bezeichnung</span>
              <span className="text-right">Menge</span>
              <span className="text-right">Einheit</span>
              <span className="text-right">Einzelpr.</span>
              <span className="text-right">Rabatt</span>
              <span className="text-right">Gesamt</span>
              <span />
            </div>

            {positionen.map((pos) => (
              <div key={pos.id} className="mb-2 rounded-xl bg-muted/10 border border-border/20 p-3">
                {/* Bezeichnung with autocomplete */}
                <div className="relative mb-2">
                  <input
                    placeholder="Bezeichnung oder Artikel suchen…"
                    value={artikelSuche[pos.id] ?? pos.bezeichnung}
                    onChange={(e) => searchArtikel(pos.id, e.target.value)}
                    onBlur={() => {
                      const q = artikelSuche[pos.id];
                      if (q !== undefined && q !== pos.bezeichnung) {
                        updatePosition(pos.id, { bezeichnung: q });
                      }
                    }}
                    className="w-full rounded-lg bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                  {(artikelSuggestions[pos.id] || []).length > 0 && (
                    <div className="absolute z-20 top-full left-0 right-0 bg-background border border-border/30 rounded-xl shadow-lg mt-1 overflow-hidden">
                      {artikelSuggestions[pos.id].map((a) => (
                        <button
                          key={a.id}
                          onMouseDown={() => selectArtikel(pos.id, a)}
                          className="w-full text-left px-3 py-2 hover:bg-muted/60 text-sm flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{a.bezeichnung}</p>
                            {a.beschreibung && <p className="text-xs text-muted-foreground">{a.beschreibung}</p>}
                          </div>
                          <span className="text-sm font-semibold shrink-0 ml-2">
                            {a.preis.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Beschreibung */}
                <input
                  placeholder="Beschreibung (optional)…"
                  value={pos.beschreibung}
                  onChange={(e) => updatePosition(pos.id, { beschreibung: e.target.value })}
                  className="w-full mb-2 rounded-lg bg-background/40 border border-border/20 px-3 py-1.5 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                />

                {/* Numbers row */}
                <div className="grid items-center gap-2" style={{ gridTemplateColumns: "60px 80px 90px 60px 90px 28px" }}>
                  <input
                    type="number"
                    value={pos.menge}
                    onChange={(e) => updatePosition(pos.id, { menge: parseFloat(e.target.value) || 0 })}
                    className="text-right rounded-lg border border-border/30 px-2 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  <select
                    value={pos.einheit}
                    onChange={(e) => updatePosition(pos.id, { einheit: e.target.value })}
                    className="rounded-lg border border-border/30 px-2 py-1.5 text-sm bg-background focus:outline-none"
                  >
                    {["pauschal", "Std.", "Stk.", "km", "m²", "Tag", "Nacht"].map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={pos.einzelpreis}
                    step="0.01"
                    onChange={(e) => updatePosition(pos.id, { einzelpreis: parseFloat(e.target.value) || 0 })}
                    className="text-right rounded-lg border border-border/30 px-2 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  <input
                    type="number"
                    value={pos.rabattProzent ?? ""}
                    placeholder="0%"
                    onChange={(e) => updatePosition(pos.id, { rabattProzent: e.target.value ? parseFloat(e.target.value) : null })}
                    className="text-right rounded-lg border border-border/30 px-2 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />
                  <div className="text-right font-semibold text-sm tabular-nums">
                    {pos.gesamt.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
                  </div>
                  <button
                    onClick={() => removePosition(pos.id)}
                    className="flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors w-7 h-7 rounded-lg hover:bg-red-50"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addPosition}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-2 px-2 py-1.5 rounded-xl hover:bg-muted/40 transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Position hinzufügen
            </button>
          </section>

          {/* MWST + SUMMEN */}
          <section className="bg-muted/10 rounded-xl p-4 border border-border/20">
            {/* MwSt toggle */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm font-medium">MwSt.:</span>
              {[0, 7, 19].map((r) => (
                <button
                  key={r}
                  onClick={() => setMwstSatz(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                    mwstSatz === r
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/30 hover:border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}%
                </button>
              ))}
              <label className="flex items-center gap-1.5 text-sm ml-4 cursor-pointer text-muted-foreground hover:text-foreground">
                <input
                  type="checkbox"
                  checked={kleinunternehmer}
                  onChange={(e) => setKleinunternehmer(e.target.checked)}
                  className="rounded"
                />
                § 19 UStG
              </label>
            </div>

            {/* Gesamtrabatt */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-muted-foreground">Gesamtrabatt:</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={rabattProzent ?? ""}
                  placeholder="0"
                  onChange={(e) => setRabattProzent(e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-16 rounded-lg border border-border/30 px-2 py-1 text-sm text-right bg-background focus:outline-none focus:ring-1 focus:ring-foreground/20"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>

            {/* Summen */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nettobetrag</span>
                <span className="tabular-nums">{summen.netto.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
              </div>
              {summen.gesamtRabatt > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rabatt {rabattProzent}%</span>
                  <span className="tabular-nums text-green-600">-{summen.gesamtRabatt.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
                </div>
              )}
              {!kleinunternehmer && mwstSatz > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MwSt. {mwstSatz}%</span>
                  <span className="tabular-nums">{summen.mwstBetrag.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
                </div>
              )}
              {kleinunternehmer && (
                <div className="text-xs text-muted-foreground italic">
                  Gem. § 19 UStG wird keine Umsatzsteuer ausgewiesen.
                </div>
              )}
              <div className="flex justify-between font-bold text-base border-t border-border/30 pt-2 mt-2">
                <span>Gesamtbetrag</span>
                <span className="tabular-nums">{summen.brutto.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</span>
              </div>
            </div>
          </section>

          {/* FUSSTEXT */}
          <section>
            <h2 className="text-sm font-semibold mb-3">Fußtext</h2>
            <textarea
              value={fusstext}
              onChange={(e) => setFusstext(e.target.value)}
              rows={3}
              placeholder="Bankdaten, Hinweise, Danksagung…"
              className="w-full rounded-xl bg-background border border-border/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
            />
          </section>

          <div className="h-8" />
        </div>

        {/* ── FLOATING SUMMEN BAR ── */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border/20 px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-xs text-muted-foreground">Netto</span>
                <p className="font-semibold tabular-nums">{summen.netto.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
              </div>
              {!kleinunternehmer && mwstSatz > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground">MwSt. {mwstSatz}%</span>
                  <p className="font-semibold tabular-nums">{summen.mwstBetrag.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
                </div>
              )}
              {kleinunternehmer && (
                <span className="text-xs text-muted-foreground">§ 19 UStG – keine MwSt.</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Gesamtbetrag</span>
              <p className="text-xl font-bold tabular-nums">{summen.brutto.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
