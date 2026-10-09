import { useMemo, useState } from "react";
import VoltageShell from "@/components/voltage/VoltageShell";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Shield,
  Clock,
  Star,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Sparkles,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import { sendInquiry } from "@/lib/sendInquiry";
import BookartistBuchung from "@/components/buchung/BookartistBuchung";

const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";

/* Mapping Show-Planer → Buchung */
const ANLASS_MAP: Record<string, string> = {
  hochzeit: "hochzeit",
  firma: "firmenfeier",
  firmenfeier: "firmenfeier",
  geburtstag: "geburtstag",
  gala: "gala",
  messe: "messe",
  privat: "sonstiges",
  sonstiges: "sonstiges",
  andere: "sonstiges", // /kontakt-Formular
  "magic-dinner": "magic-dinner",
  magicdinner: "magic-dinner",
};
const FORMAT_MAP: Record<string, string> = {
  closeup: "closeup",
  "close-up": "closeup",
  buehne: "buehnenshow",
  buehnenshow: "buehnenshow",
  dinner: "magic_dinner",
  "magic-dinner": "magic_dinner",
  moderation: "moderation",
  kombination: "kombination",
  unsicher: "unsicher",
  "weiss-nicht": "unsicher",
};
const GAESTE_MAP: Record<string, number> = {
  klein: 25,
  mittel: 60,
  gross: 150,
  xl: 300,
};

/** Baut einen vorausgefüllten mailto-Link aus den Formulardaten — Fallback,
 *  falls der API-Versand fehlschlägt, damit kein Lead verloren geht. */
function buildInquiryMailto(p: {
  vorname: string;
  nachname: string;
  email: string;
  phone: string;
  firma: string | null;
  anlass: string;
  datum: string;
  ort: string;
  gaeste: number | null;
  format: string;
  nachricht: string;
}): string {
  const rows = [
    `Name: ${p.vorname} ${p.nachname}`.trim(),
    `E-Mail: ${p.email}`,
    p.phone ? `Telefon: ${p.phone}` : "",
    p.firma ? `Firma: ${p.firma}` : "",
    p.anlass ? `Anlass: ${p.anlass}` : "",
    p.datum ? `Datum: ${p.datum}` : "",
    p.ort ? `Ort: ${p.ort}` : "",
    p.gaeste ? `Gäste: ${p.gaeste}` : "",
    p.format ? `Format: ${p.format}` : "",
  ].filter(Boolean);
  const body = [...rows, "", p.nachricht || "(keine Nachricht)"].join("\n");
  const subject = `Event-Anfrage: ${p.anlass || "Anlass offen"}${p.ort ? ` - ${p.ort}` : ""}`;
  return `mailto:el@magicel.de?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

function buildPrefillNotes(p: URLSearchParams, existing: string): string {
  const parts: string[] = [];
  if (existing) parts.push(existing);
  const ton = p.get("ton");
  const dauer = p.get("dauer");
  const budget = p.get("budget");
  if (ton) parts.push(`Tonalität: ${ton}.`);
  if (dauer) parts.push(`Gewünschte Dauer: ${dauer}.`);
  if (budget) parts.push(`Budget-Range: ${budget}.`);
  return parts.join(" ");
}

const Buchung = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mailtoHref, setMailtoHref] = useState("");

  const prefill = useMemo(() => {
    const fullName = (searchParams.get("name") || "").trim();
    const [vorname, ...rest] = fullName.split(/\s+/);
    const nachname = rest.join(" ");
    const anlassRaw = (searchParams.get("anlass") || "").toLowerCase();
    const formatRaw = (searchParams.get("format") || "").toLowerCase();
    const gaesteRaw = (searchParams.get("gaeste") || "").toLowerCase();
    const gaesteFromBucket = GAESTE_MAP[gaesteRaw];
    const gaesteNum =
      gaesteRaw && !gaesteFromBucket && /^\d+$/.test(gaesteRaw)
        ? Number(gaesteRaw)
        : gaesteFromBucket;
    return {
      vorname: vorname || "",
      nachname: nachname || "",
      email: searchParams.get("email") || "",
      // /kontakt leitet mit "telefon"/"nachricht" weiter, der Show-Planer mit "phone"/"notizen".
      phone: searchParams.get("phone") || searchParams.get("telefon") || "",
      ort: searchParams.get("ort") || "",
      anlass: ANLASS_MAP[anlassRaw] || "",
      format: FORMAT_MAP[formatRaw] || "",
      gaeste: gaesteNum ? String(gaesteNum) : "",
      datum: searchParams.get("datum") || "",
      nachricht: buildPrefillNotes(searchParams, searchParams.get("notizen") || searchParams.get("nachricht") || ""),
    };
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setMailtoHref("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      anrede: String(formData.get("anrede") || "").trim() || null,
      vorname: String(formData.get("vorname") || "").trim(),
      nachname: String(formData.get("nachname") || "").trim(),
      name: `${String(formData.get("vorname") || "").trim()} ${String(formData.get("nachname") || "").trim()}`.trim(),
      firma: String(formData.get("firma") || "").trim() || null,
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      anlass: String(formData.get("anlass") || "").trim(),
      datum: String(formData.get("datum") || "").trim(),
      ort: String(formData.get("ort") || "").trim(),
      gaeste: formData.get("gaeste") ? Number(formData.get("gaeste")) : null,
      format: String(formData.get("format") || "").trim(),
      nachricht: String(formData.get("nachricht") || "").trim(),
    };

    if (!payload.email || !payload.email.includes("@")) {
      setError("Bitte gib eine gültige E-Mail-Adresse an.");
      setSending(false);
      return;
    }
    if (!payload.vorname || !payload.nachname) {
      setError("Bitte gib deinen vollständigen Namen an.");
      setSending(false);
      return;
    }
    if (!payload.anlass) {
      setError("Bitte wähle einen Anlass.");
      setSending(false);
      return;
    }

    captureEmail(payload.email, "buchung", payload);

    try {
      await sendInquiry({
        anrede: payload.anrede ?? undefined,
        vorname: payload.vorname,
        nachname: payload.nachname,
        name: payload.name,
        firma: payload.firma,
        email: payload.email,
        phone: payload.phone,
        anlass: payload.anlass,
        datum: payload.datum,
        ort: payload.ort,
        gaeste: payload.gaeste,
        format: payload.format,
        nachricht: payload.nachricht,
      });
      markEmailSubmitted();
      setSuccess(
        "Anfrage ist angekommen. Ich melde mich innerhalb von 24 Stunden persönlich bei dir — eine automatische Bestätigungsmail gibt es nicht.",
      );
    } catch {
      setError(
        "Der automatische Versand hat gerade nicht geklappt. Kein Problem — schick mir deine Anfrage mit einem Klick direkt per E-Mail, alle Angaben sind schon eingetragen:",
      );
      setMailtoHref(buildInquiryMailto(payload));
    }
    setSending(false);
  };

  const inputCls =
    "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-[color:var(--ac)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ac)]/15 transition-colors";

  return (
    <VoltageShell
      title="Anfrage senden — Zauberer Emilian Leber | Bayern"
      description="Anfrage für Hochzeit, Firmenfeier, Geburtstag oder Magic Dinner — unverbindlich und kostenlos. Antwort innerhalb 24 Stunden. 4,8★ bei Google · 200+ Events."
      path="/buchung"
      noindex={false}
    >
      <div
        className="container px-6 pt-12 md:pt-16 pb-20"
        style={{ ["--ac" as never]: ACCENT }}
      >
          {/* Kopf kurz — die Seite IST die Buchung (Gründer 09.10.: „oben nicht mehr so viel“) */}
          <div className="max-w-6xl mx-auto mb-8 md:mb-10">
            <h1 className="font-display font-black text-3xl md:text-5xl text-foreground leading-[1.05] mb-3">
              Erzähl mir von deinem Event.
            </h1>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-xl">
              Unverbindlich und kostenlos — ich melde mich innerhalb von 24 Stunden.
            </p>
          </div>

          {/* Buchung direkt in bookartist (09.10.2026) — volle Breite, wächst mit (kein Scrollen im Fenster) */}
          <div className="max-w-6xl mx-auto mt-2">
            <BookartistBuchung />
            <p className="mt-10 text-sm text-foreground/60">
              Lieber direkt?{" "}
              <a href="mailto:el@magicel.de" className="text-foreground underline underline-offset-4">el@magicel.de</a>
              {" · "}
              <a href="tel:+4915563744696" className="text-foreground underline underline-offset-4">+49 155 63744696</a>
              {" · "}
              <a href="/#planer" className="text-foreground underline underline-offset-4">Show-Planer</a>
            </p>
          </div>
        </div>
    </VoltageShell>
  );
};

export default Buchung;
