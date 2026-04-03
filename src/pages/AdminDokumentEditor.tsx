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
  { id: 1, name: "Klassisch", desc: "Farbiger Kopfbalken, Logo links" },
  { id: 2, name: "Zentriert", desc: "Logo oben Mitte, kein Balken" },
  { id: 3, name: "Geteilt", desc: "Zweispaltig, Firmenname groß" },
  { id: 4, name: "Minimal", desc: "Dezente Linie, kleines Logo" },
  { id: 5, name: "Modern", desc: "Großer Anfangsbuchstabe" },
  { id: 6, name: "Dark Band", desc: "Dunkle Kopfkarte mit Logo" },
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
  switch (layoutId) {
    case 1:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="w-full h-4 rounded" style={{ backgroundColor: color }} />
          <div className="flex gap-1 px-0.5">
            <div className="flex-1 space-y-0.5">
              <div className="h-0.5 bg-gray-200 rounded w-3/4" />
              <div className="h-0.5 bg-gray-200 rounded w-1/2" />
              <div className="h-0.5 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          <div className="px-0.5 space-y-0.5 mt-1">
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-4/5" />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="h-0.5 w-full rounded" style={{ backgroundColor: color }} />
          <div className="flex justify-center py-1">
            <div className="w-4 h-3 rounded bg-gray-200" />
          </div>
          <div className="px-0.5 space-y-0.5">
            <div className="h-0.5 bg-gray-200 rounded w-full mx-auto" />
            <div className="h-0.5 bg-gray-200 rounded w-3/4 mx-auto" />
          </div>
          <div className="px-0.5 space-y-0.5 mt-1">
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-full" />
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="flex-1 space-y-0.5">
              <div className="h-1 rounded w-full" style={{ backgroundColor: color, opacity: 0.7 }} />
              <div className="h-0.5 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="flex-1 space-y-0.5 text-right">
              <div className="h-0.5 bg-gray-200 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-2/3 ml-auto" />
            </div>
          </div>
          <div className="h-px bg-gray-200 w-full" />
          <div className="px-0.5 space-y-0.5">
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-full" />
          </div>
        </div>
      );
    case 4:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded bg-gray-300" />
            <div className="space-y-0.5 flex-1">
              <div className="h-0.5 bg-gray-300 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          <div className="h-px w-full rounded" style={{ backgroundColor: color }} />
          <div className="px-0.5 space-y-0.5">
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-4/5" />
          </div>
        </div>
      );
    case 5:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-bold"
              style={{ backgroundColor: color }}>
              E
            </div>
            <div className="space-y-0.5 flex-1">
              <div className="h-0.5 bg-gray-200 rounded w-full" />
              <div className="h-0.5 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
          <div className="px-0.5 space-y-0.5 mt-1">
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-4/5" />
          </div>
        </div>
      );
    case 6:
      return (
        <div className="w-full h-full bg-white p-1 flex flex-col gap-1">
          <div className="w-full rounded p-1 flex items-center gap-1" style={{ backgroundColor: "#1a1a1a" }}>
            <div className="w-3 h-2 rounded bg-white/30" />
            <div className="flex-1 space-y-0.5">
              <div className="h-0.5 bg-white/60 rounded w-3/4" />
              <div className="h-0.5 bg-white/30 rounded w-1/2" />
            </div>
          </div>
          <div className="px-0.5 space-y-0.5">
            <div className="h-0.5 bg-gray-100 rounded w-full" />
            <div className="h-0.5 bg-gray-100 rounded w-4/5" />
          </div>
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
  empfaengerName: string;
  empfaengerFirma: string;
  empfaengerAdresse: string;
  empfaengerPlz: string;
  empfaengerOrt: string;
  kopftext: string;
  fusstext: string;
  positionen: LocalPosition[];
  mwstSatz: number;
  kleinunternehmer: boolean;
  rabattProzent: number | null;
  absenderName: string;
  absenderAdresse: string;
  absenderPlz: string;
  absenderOrt: string;
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
    layoutId, color, typ, nummer, datum, faelligAm, gueltigBis,
    empfaengerName, empfaengerFirma, empfaengerAdresse, empfaengerPlz, empfaengerOrt,
    kopftext, fusstext, positionen, mwstSatz, kleinunternehmer, rabattProzent,
    absenderName, absenderAdresse, absenderPlz, absenderOrt,
  } = props;

  const summen = calcSummen(positionen, mwstSatz, kleinunternehmer, rabattProzent);
  const typLabel = TYP_LABEL[typ] || typ;
  const initials = (absenderName || "E").charAt(0).toUpperCase();

  // Build header depending on layout
  const renderHeader = () => {
    switch (layoutId) {
      case 1:
        return (
          <div style={{ backgroundColor: color, padding: "10px 12px", marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: "9px" }}>{absenderName}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "7px" }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
              </div>
              <div style={{ color: "#fff", fontSize: "8px", fontWeight: "bold", textAlign: "right" }}>
                <div>{typLabel}</div>
                <div style={{ fontSize: "7px", opacity: 0.8 }}>{nummer}</div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: "center", padding: "8px 12px", borderTop: `3px solid ${color}`, marginBottom: "8px" }}>
            <div style={{ fontWeight: "bold", fontSize: "9px", marginTop: "4px" }}>{absenderName}</div>
            <div style={{ fontSize: "7px", color: "#999" }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
            <div style={{ fontSize: "8px", fontWeight: "bold", color, marginTop: "4px" }}>{typLabel}</div>
          </div>
        );
      case 3:
        return (
          <div style={{ padding: "8px 12px", marginBottom: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: "900", color, lineHeight: 1 }}>{absenderName}</div>
                <div style={{ fontSize: "6px", color: "#999", marginTop: "2px" }}>{absenderAdresse} · {absenderPlz} {absenderOrt}</div>
              </div>
              <div style={{ textAlign: "right", fontSize: "7px" }}>
                <div style={{ fontWeight: "bold", fontSize: "8px" }}>{typLabel}</div>
                <div style={{ color: "#999" }}>{nummer}</div>
                <div style={{ color: "#999" }}>{datum}</div>
              </div>
            </div>
            <div style={{ borderTop: `1.5px solid ${color}`, marginTop: "6px" }} />
          </div>
        );
      case 4:
        return (
          <div style={{ padding: "8px 12px", marginBottom: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "3px", backgroundColor: "#eee", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "7px", fontWeight: "bold" }}>{absenderName}</div>
                <div style={{ fontSize: "6px", color: "#999" }}>{absenderAdresse}, {absenderPlz} {absenderOrt}</div>
              </div>
            </div>
            <div style={{ borderBottom: `1px solid ${color}`, marginTop: "5px" }} />
          </div>
        );
      case 5:
        return (
          <div style={{ padding: "8px 12px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "6px", backgroundColor: color,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: "900", fontSize: "14px", flexShrink: 0,
            }}>
              {initials}
            </div>
            <div>
              <div style={{ fontSize: "8px", fontWeight: "bold" }}>{absenderName}</div>
              <div style={{ fontSize: "6px", color: "#999" }}>{absenderAdresse}, {absenderPlz} {absenderOrt}</div>
            </div>
          </div>
        );
      case 6:
        return (
          <div style={{ backgroundColor: "#1a1a1a", padding: "8px 12px", marginBottom: "8px", borderRadius: "4px 4px 0 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "14px", height: "10px", borderRadius: "2px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <div>
                  <div style={{ color: "#fff", fontSize: "8px", fontWeight: "bold" }}>{absenderName}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "6px" }}>{absenderAdresse}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#fff", fontSize: "7px", fontWeight: "bold" }}>{typLabel}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "6px" }}>{nummer}</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#fff", fontFamily: "sans-serif", color: "#1a1a1a", overflow: "hidden" }}>
      {renderHeader()}

      {/* Recipient + Meta */}
      <div style={{ padding: "0 12px 6px", display: "flex", justifyContent: "space-between" }}>
        <div>
          {empfaengerFirma && <div style={{ fontSize: "7px", fontWeight: "bold" }}>{empfaengerFirma}</div>}
          <div style={{ fontSize: "7px" }}>{empfaengerName}</div>
          <div style={{ fontSize: "6.5px", color: "#555" }}>{empfaengerAdresse}</div>
          <div style={{ fontSize: "6.5px", color: "#555" }}>{empfaengerPlz} {empfaengerOrt}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: "6.5px", color: "#555" }}>
          <div>Datum: {datum}</div>
          {faelligAm && <div>Fällig: {faelligAm}</div>}
          {gueltigBis && <div>Gültig bis: {gueltigBis}</div>}
          {nummer && <div style={{ fontWeight: "bold", color: "#1a1a1a" }}>{typLabel} {nummer}</div>}
        </div>
      </div>

      {/* Kopftext */}
      {kopftext && (
        <div style={{ padding: "4px 12px", fontSize: "6.5px", color: "#444", lineHeight: 1.4 }}>
          {kopftext.substring(0, 120)}{kopftext.length > 120 ? "…" : ""}
        </div>
      )}

      {/* Positions table */}
      <div style={{ padding: "4px 12px" }}>
        <div style={{ borderBottom: `1px solid ${color}`, display: "flex", fontSize: "6px", fontWeight: "bold", paddingBottom: "2px", marginBottom: "2px" }}>
          <span style={{ flex: 3 }}>Beschreibung</span>
          <span style={{ width: "24px", textAlign: "right" }}>Mge.</span>
          <span style={{ width: "40px", textAlign: "right" }}>Einzelpr.</span>
          <span style={{ width: "40px", textAlign: "right" }}>Gesamt</span>
        </div>
        {positionen.filter(p => p.typ === "leistung").slice(0, 8).map((pos) => (
          <div key={pos.id} style={{ display: "flex", fontSize: "6px", paddingBottom: "1.5px", borderBottom: "0.5px solid #f0f0f0" }}>
            <span style={{ flex: 3 }}>{pos.bezeichnung || "(leer)"}</span>
            <span style={{ width: "24px", textAlign: "right" }}>{pos.menge}</span>
            <span style={{ width: "40px", textAlign: "right" }}>{fmt(pos.einzelpreis)}</span>
            <span style={{ width: "40px", textAlign: "right", fontWeight: "bold" }}>{fmt(pos.gesamt)}</span>
          </div>
        ))}
      </div>

      {/* Summen */}
      <div style={{ padding: "4px 12px", marginTop: "4px" }}>
        <div style={{ borderTop: `1px solid ${color}`, paddingTop: "3px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", fontSize: "6px" }}>
            <div style={{ textAlign: "right" }}>
              <div>Netto:</div>
              {!kleinunternehmer && mwstSatz > 0 && <div>MwSt. {mwstSatz}%:</div>}
              <div style={{ fontWeight: "bold", borderTop: "0.5px solid #ddd", paddingTop: "1px", marginTop: "1px" }}>Gesamt:</div>
            </div>
            <div style={{ textAlign: "right", minWidth: "40px" }}>
              <div>{fmt(summen.netto)}</div>
              {!kleinunternehmer && mwstSatz > 0 && <div>{fmt(summen.mwstBetrag)}</div>}
              <div style={{ fontWeight: "bold", borderTop: "0.5px solid #ddd", paddingTop: "1px", marginTop: "1px" }}>{fmt(summen.brutto)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fusstext */}
      {fusstext && (
        <div style={{ padding: "3px 12px", fontSize: "5.5px", color: "#888", lineHeight: 1.3, borderTop: "0.5px solid #eee", marginTop: "4px" }}>
          {fusstext.substring(0, 100)}{fusstext.length > 100 ? "…" : ""}
        </div>
      )}
    </div>
  );
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
  const [absenderAdresse, setAbsenderAdresse] = useState("");
  const [absenderPlz, setAbsenderPlz] = useState("");
  const [absenderOrt, setAbsenderOrt] = useState("");

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
        setAbsenderAdresse((data.company_address as string) || "");
        setAbsenderPlz((data.company_zip as string) || "");
        setAbsenderOrt((data.company_city as string) || "");
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
    empfaengerName,
    empfaengerFirma,
    empfaengerAdresse,
    empfaengerPlz,
    empfaengerOrt,
    kopftext,
    fusstext,
    positionen,
    mwstSatz,
    kleinunternehmer,
    rabattProzent,
    absenderName,
    absenderAdresse,
    absenderPlz,
    absenderOrt,
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
