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
      phone: searchParams.get("phone") || "",
      ort: searchParams.get("ort") || "",
      anlass: ANLASS_MAP[anlassRaw] || "",
      format: FORMAT_MAP[formatRaw] || "",
      gaeste: gaesteNum ? String(gaesteNum) : "",
      datum: searchParams.get("datum") || "",
      nachricht: buildPrefillNotes(searchParams, searchParams.get("notizen") || ""),
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
        "Anfrage ist raus. Eine Bestätigung kommt gleich per Email, ich melde mich innerhalb 24 Stunden persönlich zurück.",
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
      description="Anfrage für Hochzeit, Firmenfeier, Geburtstag oder Magic Dinner — unverbindlich und kostenlos. Antwort innerhalb 24 Stunden. 5,0★ · 200+ Events."
      path="/buchung"
      noindex={false}
    >
      <div
        className="container px-6 pt-12 md:pt-16 pb-20"
        style={{ ["--ac" as never]: ACCENT }}
      >
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-10 md:mb-12">
              <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-4">
                Anfrage
              </p>
              <h1 className="font-display font-black text-3xl md:text-5xl text-foreground leading-[1.05] mb-5">
                Erzähl mir von deinem Event.
              </h1>
              <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-xl">
                Unverbindlich, kostenlos, persönlich. Ich melde mich
                innerhalb von 24 Stunden zurück — meistens schneller.
              </p>

              <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-1.5 mt-6 text-sm text-foreground/65">
                <li className="inline-flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 shrink-0" style={{ color: ACCENT }} />
                  100 % unverbindlich
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 shrink-0" style={{ color: ACCENT }} />
                  Antwort in 24h
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 shrink-0" style={{ color: ACCENT }} />
                  Kostenlose Beratung
                </li>
              </ul>
            </div>

            {/* Prefill-Banner */}
            {(prefill.email || prefill.anlass || prefill.format) && (
              <div
                className="mb-8 px-5 py-3.5 rounded-xl text-sm text-foreground/80 flex items-start gap-3"
                style={{
                  background: `${ACCENT}10`,
                  border: `1px solid ${ACCENT}30`,
                }}
              >
                <Sparkles
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: ACCENT }}
                />
                <span>
                  Deine Show-Planer-Antworten sind unten schon vorbefüllt —
                  schau kurz drüber, ergänze fehlende Felder und schick los.
                </span>
              </div>
            )}

            {/* Alternative Kontaktwege */}
            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              <a
                href="mailto:el@magicel.de"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-foreground/15 bg-white hover:border-[color:var(--ac)] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" style={{ color: ACCENT }} />
                <span className="text-foreground">el@magicel.de</span>
              </a>
              <a
                href="tel:+4915563744696"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-foreground/15 bg-white hover:border-[color:var(--ac)] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" style={{ color: ACCENT }} />
                <span className="text-foreground">+49 15563744696</span>
              </a>
              <a
                href="/#planer"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-foreground/15 bg-white hover:border-[color:var(--ac)] transition-colors text-sm"
              >
                <Wand2 className="w-4 h-4" style={{ color: ACCENT }} />
                <span className="text-foreground">Show-Planer</span>
              </a>
            </div>

            {/* Formular */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[120px_1fr_1fr] gap-3">
                <select
                  name="anrede"
                  className={inputCls}
                  defaultValue=""
                >
                  <option value="">Anrede</option>
                  <option value="Herr">Herr</option>
                  <option value="Frau">Frau</option>
                  <option value="Divers">Divers</option>
                </select>
                <input
                  type="text"
                  name="vorname"
                  placeholder="Vorname *"
                  required
                  defaultValue={prefill.vorname}
                  className={inputCls}
                />
                <input
                  type="text"
                  name="nachname"
                  placeholder="Nachname *"
                  required
                  defaultValue={prefill.nachname}
                  className="col-span-2 sm:col-span-1 w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-[color:var(--ac)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ac)]/15 transition-colors"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="E-Mail *"
                required
                defaultValue={prefill.email}
                className={inputCls}
              />

              {/* Firma + Telefon */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 pointer-events-none" />
                  <input
                    type="text"
                    name="firma"
                    placeholder="Firma (optional)"
                    className={`${inputCls} pl-10`}
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon (optional)"
                  defaultValue={prefill.phone}
                  className={inputCls}
                />
              </div>

              {/* Anlass + Datum */}
              <div className="grid sm:grid-cols-2 gap-3">
                <select
                  name="anlass"
                  required
                  defaultValue={prefill.anlass}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Anlass wählen *
                  </option>
                  <option value="hochzeit">Hochzeit</option>
                  <option value="firmenfeier">Firmenfeier</option>
                  <option value="geburtstag">Geburtstag / Privatfeier</option>
                  <option value="gala">Gala / Award-Show</option>
                  <option value="messe">Messe / Promotion</option>
                  <option value="magic-dinner">Magic Dinner</option>
                  <option value="teamevent">Teamevent / Incentive</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
                <input
                  type="date"
                  name="datum"
                  defaultValue={prefill.datum}
                  className={inputCls}
                  onFocus={(e) => {
                    try {
                      (e.target as HTMLInputElement).showPicker?.();
                    } catch {
                      /* noop */
                    }
                  }}
                />
              </div>

              {/* Ort + Gäste */}
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="ort"
                  placeholder="Ort / Location"
                  defaultValue={prefill.ort}
                  className={inputCls}
                />
                <input
                  type="number"
                  name="gaeste"
                  placeholder="Anzahl Gäste (ca.)"
                  min="1"
                  defaultValue={prefill.gaeste}
                  className={inputCls}
                />
              </div>

              {/* Format */}
              <select
                name="format"
                defaultValue={prefill.format}
                className={inputCls}
              >
                <option value="" disabled>
                  Gewünschtes Format (optional)
                </option>
                <option value="closeup">Close-Up Magie</option>
                <option value="buehnenshow">Bühnenshow</option>
                <option value="magic_dinner">Magic Dinner</option>
                <option value="kombination">Kombination</option>
                <option value="moderation">Moderation</option>
                <option value="unsicher">Noch unsicher — berate mich</option>
              </select>

              {/* Nachricht */}
              <textarea
                name="nachricht"
                rows={5}
                placeholder="Erzähl mir von deinem Event — Anlass, Vorstellungen, Anekdoten, besondere Wünsche…"
                defaultValue={prefill.nachricht}
                className={`${inputCls} resize-none`}
              />

              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-lg space-y-3">
                  <p>{error}</p>
                  {mailtoHref && (
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-transform hover:scale-[1.02]"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      Anfrage per E-Mail senden
                    </a>
                  )}
                </div>
              )}
              {success && (
                <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-2.5 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {success}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-transform hover:scale-[1.02] disabled:opacity-50"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  }}
                >
                  {sending ? "Wird gesendet…" : "Anfrage senden"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-foreground/55">
                  Antwort innerhalb 24 Stunden · keine Werbung, kein Spam.
                </span>
              </div>

              <p className="text-xs text-foreground/45 pt-2">
                Mit dem Absenden bestätigst du, dass du die{" "}
                <a
                  href="/datenschutz"
                  className="underline decoration-foreground/30 hover:decoration-foreground"
                >
                  Datenschutzerklärung
                </a>{" "}
                gelesen hast.
              </p>
            </form>
          </div>
        </div>
    </VoltageShell>
  );
};

export default Buchung;
