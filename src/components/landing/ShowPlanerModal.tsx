import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Briefcase,
  Cake,
  Trophy,
  Building2,
  PartyPopper,
  Users,
  Calendar,
  Clock,
  Wine,
  Utensils,
  Mic2,
  Brain,
  Sparkles,
  Hand,
  UtensilsCrossed,
  Wand2,
  Lightbulb,
  Info,
  GripVertical,
  Plus,
  Send,
  X,
} from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ShowPlanerAnswers,
  ShowPlanerDraft,
  loadDraft,
  saveDraft,
  markCompleted,
} from "@/lib/showPlaner";
import {
  estimatePrice,
  formatEuro,
  CLOSEUP_TIERS,
  BUEHNE_TIERS,
  type FormatKey,
} from "@/lib/showPlanerPricing";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import { sendInquiry } from "@/lib/sendInquiry";
import staunenImg from "@/assets/staunen.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import magicdinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import heroBirthdayImg from "@/assets/hero-birthday.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroDinnerImg from "@/assets/hero-dinner.jpg";
import heroCloseupImg from "@/assets/hero-closeup.jpg";

const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";
const AMBER = "#AFC0FF";

/* ───────────────────────────────────────────────────────────
   Anlässe
   ─────────────────────────────────────────────────────────── */
const ANLAESSE = [
  { value: "hochzeit", label: "Hochzeit", sub: "Brautpaar im Mittelpunkt", Icon: Heart },
  { value: "firma", label: "Firmenfeier", sub: "Vorstand · Team · Kunden", Icon: Briefcase },
  { value: "geburtstag", label: "Geburtstag", sub: "30er bis Goldene Hochzeit", Icon: Cake },
  { value: "magic-dinner", label: "Magic Dinner", sub: "Dinner-Abend mit Magie", Icon: UtensilsCrossed },
  { value: "gala", label: "Gala / Award", sub: "Premium · Black-Tie", Icon: Trophy },
  { value: "messe", label: "Messe / Stand", sub: "Besucher anziehen", Icon: Building2 },
  { value: "privat", label: "Privat / Sonstiges", sub: "Jubiläum · Einweihung", Icon: PartyPopper },
];

/* ───────────────────────────────────────────────────────────
   Format-Erklärung (Aufklärung für Laien)
   ─────────────────────────────────────────────────────────── */
type FmtCard = {
  key: "closeup" | "buehne" | "dinner" | "beratung";
  label: string;
  Icon: typeof Hand;
  was: string; // was ist das (einfach erklärt)
  passt: string; // wann passt es
  combinable: boolean; // mit anderen kombinierbar (Close-Up + Bühne = Kombi)
};
const FORMAT_CARDS: FmtCard[] = [
  {
    key: "closeup",
    label: "Close-Up",
    Icon: Hand,
    was: "Zauberei direkt in den Händen deiner Gäste — Karten, Münzen, kleine Wunder am Tisch. Keine Bühne, kein Ton nötig.",
    passt: "Ideal für Sektempfang & Dinner. Funktioniert ab 2 Gästen, am stärksten bis ~100.",
    combinable: true,
  },
  {
    key: "buehne",
    label: "Bühnenshow",
    Icon: Mic2,
    was: "Eine durchkomponierte Show für den ganzen Saal — Comedy, Mentalmagie und ein großes Finale, alle schauen gemeinsam zu.",
    passt: "Lohnt sich ab ~50 Gästen. Braucht etwas Fläche; Headset & Ton bring ich mit.",
    combinable: true,
  },
  {
    key: "dinner",
    label: "Magic Dinner",
    Icon: UtensilsCrossed,
    was: "Magie über den ganzen Abend, eingetaktet zwischen die Gänge. Ob durchgehend Close-Up, mehrere Bühnen-Sets oder ein Mix — völlig individuell.",
    passt: "Den Ablauf stellst du dir gleich selbst zusammen. Preis individuell je nach Abend.",
    combinable: false,
  },
  {
    key: "beratung",
    label: "Berate mich",
    Icon: Lightbulb,
    was: "Unsicher, was passt? Kein Problem — sag mir nur Anlass und Gästezahl, ich empfehle dir das Richtige.",
    passt: "Du bekommst einen konkreten Vorschlag, ganz unverbindlich.",
    combinable: false,
  },
];

/* ───────────────────────────────────────────────────────────
   Abend-Baukasten — Programm-Bausteine zum Schieben
   ─────────────────────────────────────────────────────────── */
type Baustein = {
  id: string;
  t: string;
  d: string;
  Icon: typeof Hand;
  /** zu welchem Format gehört der Baustein (für Vorauswahl) */
  fmt: "closeup" | "buehne" | "dinner" | "moderation";
};
const BAUSTEINE: Baustein[] = [
  { id: "empfang", t: "Empfang · Close-Up Walk-Around", d: "Von Gruppe zu Gruppe — der Eisbrecher.", Icon: Wine, fmt: "closeup" },
  { id: "dinner-tisch", t: "Tisch-zu-Tisch (zwischen den Gängen)", d: "Jeder Tisch bekommt seinen Moment.", Icon: Utensils, fmt: "closeup" },
  { id: "buehne", t: "Bühnen-Set", d: "Show für den Saal — beliebig oft einsetzbar.", Icon: Mic2, fmt: "buehne" },
  { id: "mental", t: "Mentalmagie-Highlight", d: "Gedankenlesen mit drei Sekunden Stille.", Icon: Brain, fmt: "buehne" },
  { id: "moderation", t: "Moderation mit Magie", d: "Roter Faden, der euer Programm zusammenhält.", Icon: Mic2, fmt: "moderation" },
];
const BAUSTEIN_MAP: Record<string, Baustein> = Object.fromEntries(BAUSTEINE.map((b) => [b.id, b]));
/** Baustein-Instanz-ID → Basis-ID (Instanzen sehen aus wie "buehne__2", Mehrfach-Einsatz erlaubt). */
const baseOf = (uid: string): string => uid.split("__")[0];

/** Vorauswahl für den Baukasten je nach gewähltem Format. */
function seedAblauf(format?: string): string[] {
  switch (format) {
    case "closeup": return ["empfang", "dinner-tisch"];
    case "buehne": return ["buehne"];
    case "kombi": return ["empfang", "buehne"];
    case "dinner": return ["empfang", "dinner-tisch", "buehne"]; // klassisch, frei editierbar
    default: return [];
  }
}

/* ───────────────────────────────────────────────────────────
   Empfehlungs-Extras (Bild + Highlights je Ziel-Route)
   ─────────────────────────────────────────────────────────── */
const RECO_EXTRA: Record<string, { img: string; highlights: string[] }> = {
  "/buehnenshow": { img: staunenImg, highlights: ["Comedy + Mentalmagie + großes Finale", "Headset & Ton inklusive", "ab ~50 Gästen"] },
  "/hochzeit": { img: weddingImg, highlights: ["Empfang · Dinner · vor dem Tanz", "Brautpaar-Anekdoten eingebaut", "100+ Hochzeiten begleitet"] },
  "/firmenfeiern": { img: magicdinnerBuehneImg, highlights: ["Premium bis Comedy — eure Tonalität", "Insider-Briefing vorab", "100+ Firmen-Events"] },
  "/geburtstage": { img: heroBirthdayImg, highlights: ["Anekdoten vom Geburtstagskind", "Close-Up + Bühnen-Highlight", "Von 30er bis Goldene Hochzeit"] },
  "/messe-magier": { img: audienceImg, highlights: ["Besucher gezielt an den Stand ziehen", "Leads spielerisch qualifizieren", "Halbtag / Tag / Mehrtages"] },
  "/magic-dinner": { img: heroDinnerImg, highlights: ["Über den ganzen Abend, 2,5–4 Std", "Frei kombinierbar: Close-Up & Bühne", "Ablauf individuell auf euren Abend"] },
  "/close-up": { img: heroCloseupImg, highlights: ["Tischmagie auf Augenhöhe", "Karten & Münzen in den Händen der Gäste", "Keine Bühne / Technik nötig"] },
};
const RECO_FALLBACK = { img: staunenImg, highlights: ["Auf euren Anlass zugeschnitten", "200+ Events Routine seit 2016", "Konzept + Antwort in 24 Stunden"] };

/* ───────────────────────────────────────────────────────────
   Empfehlungs-Route + Titel ableiten
   ─────────────────────────────────────────────────────────── */
function recommend(a: ShowPlanerAnswers): { format: string; why: string; link: string } {
  const { anlass, format } = a;
  if (anlass === "magic-dinner" || format === "dinner") return { format: "Magic Dinner · individuell gestaltet", why: "Magie über den ganzen Abend, eingetaktet zwischen die Gänge — ob durchgehend Close-Up, mehrere Bühnen-Sets oder ein Mix: den Ablauf gestalten wir ganz nach deinem Abend.", link: "/magic-dinner" };
  if (anlass === "hochzeit") return { format: "Hochzeits-Mix · Close-Up + Bühne", why: "Walk-Around beim Empfang, Tisch-zu-Tisch beim Dinner mit Brautpaar-Anekdoten, Bühnen-Highlight vor dem ersten Tanz.", link: "/hochzeit" };
  if (anlass === "firma") return { format: "Firmen-Event · angepasst", why: "Tonalität auf euer Publikum abgestimmt, Insider-Anekdoten aus dem Briefing eingebaut.", link: "/firmenfeiern" };
  if (anlass === "geburtstag") return { format: "Geburtstags-Mix", why: "Anekdoten vom Geburtstagskind eingebaut, Close-Up an den Tafeln, kompakte Bühnenshow als Höhepunkt.", link: "/geburtstage" };
  if (anlass === "gala") return { format: "Premium-Bühnenshow", why: "Award-Show-Tonalität mit Mentaleffekten zwischen den Programmpunkten, Standing-Ovation-Finale.", link: "/buehnenshow" };
  if (anlass === "messe") return { format: "Messe-Magier · Lead-Generator", why: "Besucher gezielt an den Stand ziehen, Leads spielerisch qualifizieren.", link: "/messe-magier" };
  if (format === "kombi") return { format: "Kombi · Close-Up + Bühne", why: "Close-Up beim Empfang als Eisbrecher, Bühnenshow als Höhepunkt — das Beste aus beiden Welten.", link: "/buehnenshow" };
  if (format === "buehne") return { format: "Bühnenshow", why: "Durchkomponiert mit Drama-Kurve, Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale.", link: "/buehnenshow" };
  return { format: "Close-Up-Format", why: "Karten in euren Händen, eingebaute Anekdoten, drei Sekunden Stille nach jeder Pointe.", link: "/close-up" };
}

/* Format-Key → Buchungs-Formular-Wert (FORMAT_MAP in Buchung.tsx). */
function formatForBuchung(format?: string): string {
  switch (format) {
    case "closeup": return "closeup";
    case "buehne": return "buehne";
    case "kombi": return "kombination";
    case "dinner": return "dinner";
    case "beratung": return "weiss-nicht";
    default: return "weiss-nicht";
  }
}

const STEP_LABELS = ["Anlass", "Rahmen", "Format", "Ablauf"];
const TOTAL_STEPS = STEP_LABELS.length; // 4 Fragen
const SUMMARY_STEP = TOTAL_STEPS;
const TOTAL_TABS = TOTAL_STEPS + 1;

/* ───────────────────────────────────────────────────────────
   MODAL
   ─────────────────────────────────────────────────────────── */
type ShowPlanerModalProps = { open: boolean; onClose: () => void };

const ShowPlanerModal = ({ open, onClose }: ShowPlanerModalProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ShowPlanerAnswers>({ gaeste: 60 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const startedAtRef = useRef<number>(Date.now());

  const setA = useCallback((patch: Partial<ShowPlanerAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
  }, []);

  // On open: load draft
  useEffect(() => {
    if (!open) return;
    const draft = loadDraft();
    if (draft) {
      setStep(draft.step);
      setAnswers({ gaeste: 60, ...draft.answers });
      if (draft.email) setEmail(draft.email);
      if (draft.name) setName(draft.name);
      startedAtRef.current = draft.startedAt;
    } else {
      startedAtRef.current = Date.now();
    }
  }, [open]);

  // Persist on change
  useEffect(() => {
    if (!open) return;
    const draft: ShowPlanerDraft = { step, answers, email, name, startedAt: startedAtRef.current, updatedAt: Date.now() };
    saveDraft(draft);
    if (email) captureEmail(email, "showplaner", { answers, name });
  }, [step, answers, email, name, open]);

  // ESC + scroll lock
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  const isSummary = step >= TOTAL_STEPS;
  const progressPct = ((step + (isSummary ? 1 : 0)) / TOTAL_TABS) * 100;
  const price = useMemo(
    (): ReturnType<typeof estimatePrice> =>
      answers.anlass === "magic-dinner"
        ? { kind: "anfrage" } // Magic Dinner = individuell zusammengestellt → kein Fixpreis
        : estimatePrice({ format: answers.format as FormatKey | undefined, cuMin: answers.cuMin, buehneMin: answers.buehneMin, gaeste: answers.gaeste }),
    [answers.anlass, answers.format, answers.cuMin, answers.buehneMin, answers.gaeste],
  );
  const reco = useMemo(() => recommend(answers), [answers]);
  const showPrice = answers.anlass === "magic-dinner" || (!!answers.format && answers.format !== "beratung");

  const canProceed = useMemo(() => {
    if (step === 0) return !!answers.anlass;
    if (step === 1) return !!answers.gaeste;
    if (step === 2) return !!answers.format;
    return true; // Ablauf optional
  }, [step, answers]);

  const next = () => {
    // Beim Wechsel auf den Baukasten ggf. vorbefüllen
    setStep((s) => {
      const ns = Math.min(s + 1, TOTAL_STEPS);
      if (ns === 3 && (!answers.ablauf || answers.ablauf.length === 0)) {
        const seed = seedAblauf(answers.format);
        if (seed.length) setA({ ablauf: seed });
      }
      return ns;
    });
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!email || !email.includes("@")) return;
    markCompleted();
    setSubmitted(true);

    const ablaufNamen = (answers.ablauf || []).map((id) => BAUSTEIN_MAP[baseOf(id)]?.t).filter(Boolean).join(" → ");
    const dauerText = [
      answers.cuMin ? `Close-Up ~${answers.cuMin <= 30 ? "20–30" : answers.cuMin <= 45 ? "30–45" : answers.cuMin <= 60 ? "45–60" : "60+"} Min` : null,
      answers.buehneMin ? `Bühne ~${answers.buehneMin <= 30 ? "20–30" : answers.buehneMin <= 45 ? "30–45" : "45+"} Min` : null,
    ].filter(Boolean).join(", ");
    const richtwert = price.kind === "ab" ? `Richtwert: ab ${formatEuro(price.amount)}` : "Richtwert: individuelles Angebot";

    const notizenBlock = [
      answers.zeitraum ? `Zeitraum: ${answers.zeitraum}` : null,
      dauerText ? `Dauer: ${dauerText}` : null,
      ablaufNamen ? `Wunsch-Ablauf: ${ablaufNamen}` : null,
      richtwert,
      answers.notizen ? `Notizen: ${answers.notizen}` : null,
    ].filter(Boolean).join("\n");

    try {
      await sendInquiry({
        name: name.trim() || "Show-Planer",
        email,
        phone,
        anlass: answers.anlass || "Show-Planer-Anfrage",
        format: formatForBuchung(answers.format),
        ort: answers.ort || "",
        gaeste: answers.gaeste ?? null,
        nachricht: `Show-Planer-Anfrage über magicel.de\n\n${notizenBlock || "Keine zusätzlichen Notizen."}`,
      });
      markEmailSubmitted();
    } catch (err) {
      console.error("ShowPlaner sendInquiry failed", err);
    }

    const params = new URLSearchParams();
    params.set("anlass", answers.anlass || "");
    params.set("format", formatForBuchung(answers.format));
    if (answers.gaeste) params.set("gaeste", String(answers.gaeste));
    if (dauerText) params.set("dauer", dauerText);
    if (answers.ort) params.set("ort", answers.ort);
    params.set("email", email);
    if (name) params.set("name", name);
    if (phone) params.set("phone", phone);
    const notizenParam = [ablaufNamen ? `Ablauf: ${ablaufNamen}` : "", richtwert, answers.notizen || ""].filter(Boolean).join(" · ");
    if (notizenParam) params.set("notizen", notizenParam);
    window.setTimeout(() => {
      onClose();
      window.location.href = `/buchung?${params.toString()}`;
    }, 1900);
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Show-Planer" className="fixed inset-0 z-[100]">
      <style>{`
        @keyframes spStepIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spConfetti { 0% { transform: translate(0,0) rotate(0); opacity: 0.95; } 100% { transform: translate(var(--dx),var(--dy)) rotate(720deg); opacity: 0; } }
        .sp-step { animation: spStepIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }
        .sp-confetti-piece { position: absolute; width: 8px; height: 14px; animation: spConfetti 1.6s cubic-bezier(0.22,1,0.36,1) forwards; will-change: transform, opacity; }
      `}</style>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#08060c]/85 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        data-lenis-prevent
        className="absolute inset-0 md:inset-4 lg:inset-8 bg-white text-foreground overflow-y-auto overscroll-contain md:rounded-3xl"
        style={{ boxShadow: "0 80px 160px -40px rgba(0,0,0,0.5), 0 30px 60px -20px rgba(0,0,0,0.35)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header — Progress */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-foreground/10" style={{ paddingTop: "env(safe-area-inset-top, 0)" }}>
          <div className="px-5 md:px-10 py-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: ACCENT }}>Show-Planer</span>
                <span className="text-sm text-foreground/55 tabular-nums">
                  {isSummary ? "Übersicht · fast geschafft" : `Schritt ${step + 1} von ${TOTAL_STEPS}`}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-foreground/[0.08] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})` }} />
              </div>
              <div className="hidden md:flex gap-1 mt-3">
                {[...STEP_LABELS, "✓"].map((label, i) => {
                  const active = i === step && !isSummary;
                  const done = i < step || (isSummary && i === TOTAL_STEPS);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => i <= step && setStep(i)}
                      className="flex-1 text-[10px] tracking-[0.12em] uppercase font-bold py-1.5 rounded transition-colors"
                      style={{
                        color: active ? ACCENT : done ? "rgba(29,63,255,0.55)" : "rgba(0,0,0,0.30)",
                        background: active ? "rgba(29,63,255,0.07)" : "transparent",
                        cursor: i <= step ? "pointer" : "default",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label="Show-Planer schließen" className="shrink-0 w-10 h-10 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] inline-flex items-center justify-center transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="px-5 md:px-10 lg:px-16 py-9 md:py-14 max-w-6xl mx-auto">
          {submitted ? (
            <SubmittedState reco={reco} />
          ) : step === 0 ? (
            <AnlassStep value={answers.anlass} onPick={(v) => { setA({ anlass: v }); window.setTimeout(next, 280); }} />
          ) : step === 1 ? (
            <RahmenStep answers={answers} setA={setA} />
          ) : step === 2 ? (
            <FormatStep answers={answers} setA={setA} price={price} />
          ) : step === 3 ? (
            <AblaufStep answers={answers} setA={setA} />
          ) : (
            <SummaryView
              answers={answers}
              reco={reco}
              price={price}
              showPrice={showPrice}
              name={name}
              email={email}
              phone={phone}
              onName={setName}
              onEmail={setEmail}
              onPhone={setPhone}
              onEditStep={setStep}
            />
          )}
        </div>

        {/* Sticky Footer — Navigation + Live-Richtpreis */}
        {!submitted && (
          <footer className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-foreground/10">
            <div className="px-5 md:px-10 py-4 flex items-center justify-between gap-3 max-w-6xl mx-auto">
              <button type="button" onClick={prev} disabled={step === 0} className="inline-flex items-center gap-2 px-4 md:px-5 py-3 rounded-full text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/65 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Zurück</span>
              </button>

              {/* Live-Richtpreis-Chip */}
              {showPrice ? (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-center" style={{ background: "rgba(29,63,255,0.07)", border: "1px solid rgba(29,63,255,0.18)" }}>
                  <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: ACCENT }} />
                  <span className="text-[11px] md:text-[13px] font-semibold leading-tight" style={{ color: ACCENT_DEEP }}>
                    {price.kind === "ab" ? <>Richtwert: <span className="font-extrabold">ab {formatEuro(price.amount)}</span></> : "Individuelles Angebot"}
                  </span>
                </div>
              ) : (
                <span className="hidden sm:block text-xs md:text-sm text-foreground/45 text-center">Fortschritt wird gespeichert.</span>
              )}

              {!isSummary ? (
                <button type="button" onClick={next} disabled={!canProceed} className="inline-flex items-center gap-2 px-5 md:px-6 py-3 rounded-full text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}>
                  {step === TOTAL_STEPS - 1 ? "Übersicht" : "Weiter"} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="button" onClick={submit} disabled={!email || !email.includes("@")} className="inline-flex items-center gap-2 px-5 md:px-6 py-3 rounded-full text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}>
                  Absenden <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   Step-Kopf
   ─────────────────────────────────────────────────────────── */
const StepHead = ({ n, eyebrow, title, sub }: { n: string; eyebrow: string; title: string; sub?: string }) => (
  <div className="mb-8">
    <div className="flex items-baseline gap-3 mb-4">
      <span className="text-4xl md:text-5xl tabular-nums leading-none" style={{ color: ACCENT }}>{n}</span>
      <span className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: ACCENT }}>{eyebrow}</span>
    </div>
    <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.6rem,3.2vw,2.6rem)] text-foreground mb-4">{title}</h2>
    {sub && <p className="text-base md:text-lg text-foreground/65 leading-[1.6] max-w-2xl">{sub}</p>}
  </div>
);

/* ───────────────────────────────────────────────────────────
   STEP 0 — Anlass
   ─────────────────────────────────────────────────────────── */
const AnlassStep = ({ value, onPick }: { value?: string; onPick: (v: string) => void }) => (
  <div className="sp-step">
    <StepHead n="01" eyebrow="Frage 01 · Anlass" title="Was feiert ihr?" sub="Davon hängt ab, welche Magie am besten passt — eine Premium-Gala läuft anders als ein Geburtstag." />
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" role="radiogroup" aria-label="Anlass">
      {ANLAESSE.map((o) => {
        const selected = value === o.value;
        return (
          <button key={o.value} type="button" onClick={() => onPick(o.value)} aria-pressed={selected}
            className="group text-left p-5 md:p-6 rounded-2xl transition-all duration-300"
            style={{ background: selected ? "white" : "hsl(0,0%,98%)", border: selected ? `2px solid ${ACCENT}` : "2px solid transparent", boxShadow: selected ? "0 25px 50px -25px rgba(29,63,255,0.4), inset 0 0 0 1px rgba(29,63,255,0.2)" : "0 10px 25px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)", transform: selected ? "scale(1.02)" : "scale(1)" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ background: selected ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` : "rgba(0,0,0,0.04)" }}>
                <o.Icon className="w-4 h-4" style={{ color: selected ? "white" : ACCENT }} strokeWidth={1.75} />
              </span>
              {selected && <CheckCircle2 className="w-5 h-5 ml-auto" style={{ color: ACCENT }} />}
            </div>
            <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-tight mb-1">{o.label}</h3>
            <p className="text-xs md:text-sm text-foreground/55 leading-snug">{o.sub}</p>
          </button>
        );
      })}
    </div>
  </div>
);

/* ───────────────────────────────────────────────────────────
   STEP 1 — Rahmen (Gäste-Slider + Ort + Zeitraum)
   ─────────────────────────────────────────────────────────── */
const ZEITRAEUME = [
  { value: "q1q2", label: "Jan – Jun", sub: "entspannt" },
  { value: "q3", label: "Jul – Sep", sub: "mittel" },
  { value: "q4", label: "Okt – Dez", sub: "Weihnachtssaison · eng" },
  { value: "flexibel", label: "Flexibel", sub: "Datum noch offen" },
];
const RahmenStep = ({ answers, setA }: { answers: ShowPlanerAnswers; setA: (p: Partial<ShowPlanerAnswers>) => void }) => {
  const gaeste = answers.gaeste ?? 60;
  const gaesteHint = gaeste <= 30 ? "Intime Runde — Close-Up ist hier am stärksten." : gaeste <= 100 ? "Klassische Größe — Close-Up und/oder Bühne funktionieren beide." : gaeste <= 250 ? "Großer Saal — eine Bühnenshow mit Headset erreicht alle." : "Sehr groß — Bühne mit Technik, Close-Up nur als Akzent.";
  return (
    <div className="sp-step">
      <StepHead n="02" eyebrow="Frage 02 · Rahmen" title="Wie groß wird's?" sub="Die Gästezahl bestimmt mit, welches Format am besten wirkt — schieb den Regler einfach hin." />
      <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10">
        {/* Gäste-Slider */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-sm tracking-[0.1em] uppercase font-bold text-foreground/60 inline-flex items-center gap-2"><Users className="w-4 h-4" style={{ color: ACCENT }} /> Gäste</span>
            <span className="text-3xl md:text-4xl font-black tabular-nums" style={{ color: ACCENT }}>{gaeste}{gaeste >= 400 ? "+" : ""}</span>
          </div>
          <Slider.Root value={[gaeste]} min={10} max={400} step={5} onValueChange={([v]) => setA({ gaeste: v })} className="relative flex items-center w-full h-6 select-none touch-none" aria-label="Gästezahl">
            <Slider.Track className="relative h-2 grow rounded-full bg-foreground/10">
              <Slider.Range className="absolute h-full rounded-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})` }} />
            </Slider.Track>
            <Slider.Thumb className="block w-7 h-7 rounded-full bg-white shadow-lg border-2 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4" style={{ borderColor: ACCENT, ["--tw-ring-color" as never]: "rgba(29,63,255,0.25)" }} />
          </Slider.Root>
          <div className="flex justify-between mt-2 text-[11px] text-foreground/40 tabular-nums"><span>10</span><span>100</span><span>250</span><span>400+</span></div>
          <div className="mt-5 flex items-start gap-2.5 p-4 rounded-xl" style={{ background: "rgba(29,63,255,0.05)" }}>
            <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: ACCENT }} />
            <p className="text-sm text-foreground/75 leading-snug">{gaesteHint}</p>
          </div>
        </div>
        {/* Ort + Zeitraum */}
        <div className="space-y-7">
          <div>
            <label className="text-sm tracking-[0.1em] uppercase font-bold text-foreground/60 mb-3 inline-block">Wo? <span className="font-medium normal-case tracking-normal text-foreground/40">(optional)</span></label>
            <input type="text" value={answers.ort || ""} onChange={(e) => setA({ ort: e.target.value })} placeholder="z.B. München · Regensburg · Salzburg"
              className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white" style={{ ["--ac" as never]: ACCENT }} />
            <p className="text-xs text-foreground/45 mt-2">In Bayern ist die Anfahrt im Angebot inklusive.</p>
          </div>
          <div>
            <label className="text-sm tracking-[0.1em] uppercase font-bold text-foreground/60 mb-3 inline-flex items-center gap-2"><Calendar className="w-4 h-4" style={{ color: ACCENT }} /> Wann?</label>
            <div className="grid grid-cols-2 gap-2.5">
              {ZEITRAEUME.map((z) => {
                const sel = answers.zeitraum === z.value;
                return (
                  <button key={z.value} type="button" onClick={() => setA({ zeitraum: z.value })}
                    className="text-left px-4 py-3 rounded-xl transition-all" style={{ background: sel ? "white" : "hsl(0,0%,98%)", border: sel ? `2px solid ${ACCENT}` : "2px solid transparent", boxShadow: sel ? "0 14px 30px -18px rgba(29,63,255,0.4)" : "inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
                    <span className="block text-sm font-bold text-foreground leading-tight">{z.label}</span>
                    <span className="block text-[11px] text-foreground/50 mt-0.5">{z.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   STEP 2 — Format wählen (Aufklärung) + Dauer-Slider
   ─────────────────────────────────────────────────────────── */
function deriveFormat(cu: boolean, bu: boolean): string | undefined {
  if (cu && bu) return "kombi";
  if (cu) return "closeup";
  if (bu) return "buehne";
  return undefined;
}
const TierSlider = ({ label, tiers, value, onChange }: { label: string; tiers: readonly { label: string; min: number }[]; value: number; onChange: (min: number) => void }) => {
  const idx = Math.max(0, tiers.findIndex((t) => t.min === value));
  const safeIdx = idx === -1 ? 0 : idx;
  return (
    <div className="p-4 rounded-xl" style={{ background: "rgba(29,63,255,0.05)" }}>
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[11px] tracking-[0.12em] uppercase font-bold text-foreground/60 inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" style={{ color: ACCENT }} /> {label}</span>
        <span className="text-base font-extrabold" style={{ color: ACCENT }}>{tiers[safeIdx].label}</span>
      </div>
      <Slider.Root value={[safeIdx]} min={0} max={tiers.length - 1} step={1} onValueChange={([v]) => onChange(tiers[v].min)} className="relative flex items-center w-full h-5 select-none touch-none" aria-label={label}>
        <Slider.Track className="relative h-1.5 grow rounded-full bg-foreground/10">
          <Slider.Range className="absolute h-full rounded-full" style={{ background: ACCENT }} />
        </Slider.Track>
        <Slider.Thumb className="block w-6 h-6 rounded-full bg-white shadow-lg border-2 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-4" style={{ borderColor: ACCENT, ["--tw-ring-color" as never]: "rgba(29,63,255,0.25)" }} />
      </Slider.Root>
    </div>
  );
};
const FormatStep = ({ answers, setA, price }: { answers: ShowPlanerAnswers; setA: (p: Partial<ShowPlanerAnswers>) => void; price: ReturnType<typeof estimatePrice> }) => {
  const fmt = answers.format;
  const cuActive = fmt === "closeup" || fmt === "kombi";
  const buActive = fmt === "buehne" || fmt === "kombi";

  const pick = (card: FmtCard) => {
    if (card.key === "dinner") { setA({ format: "dinner" }); return; }
    if (card.key === "beratung") { setA({ format: "beratung" }); return; }
    if (card.key === "closeup") {
      const nf = deriveFormat(!cuActive, buActive);
      setA({ format: nf, cuMin: !cuActive ? (answers.cuMin ?? 30) : answers.cuMin });
      return;
    }
    if (card.key === "buehne") {
      const nf = deriveFormat(cuActive, !buActive);
      setA({ format: nf, buehneMin: !buActive ? (answers.buehneMin ?? 30) : answers.buehneMin });
    }
  };

  return (
    <div className="sp-step">
      <StepHead n="03" eyebrow="Frage 03 · Format" title="Welche Art Magie?" sub="Kurz erklärt — wähl, was dich anspricht. Close-Up & Bühne kannst du kombinieren." />
      <div className="grid md:grid-cols-2 gap-4">
        {FORMAT_CARDS.map((c) => {
          const active = c.key === "dinner" ? fmt === "dinner" : c.key === "beratung" ? fmt === "beratung" : c.key === "closeup" ? cuActive : buActive;
          return (
            <button key={c.key} type="button" onClick={() => pick(c)} aria-pressed={active}
              className="text-left p-6 rounded-2xl transition-all duration-300 relative"
              style={{ background: active ? "white" : "hsl(0,0%,98%)", border: active ? `2px solid ${ACCENT}` : "2px solid transparent", boxShadow: active ? "0 25px 50px -25px rgba(29,63,255,0.4), inset 0 0 0 1px rgba(29,63,255,0.18)" : "0 10px 25px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full" style={{ background: active ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` : "rgba(0,0,0,0.04)" }}>
                  <c.Icon className="w-5 h-5" style={{ color: active ? "white" : ACCENT }} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground">{c.label}</h3>
                {c.combinable && <span className="text-[10px] tracking-[0.12em] uppercase font-bold px-2 py-1 rounded-full ml-auto" style={{ background: "rgba(29,63,255,0.08)", color: ACCENT }}>kombinierbar</span>}
                {active && !c.combinable && <CheckCircle2 className="w-5 h-5 ml-auto" style={{ color: ACCENT }} />}
              </div>
              <p className="text-sm text-foreground/75 leading-[1.6] mb-2">{c.was}</p>
              <p className="text-[13px] text-foreground/55 leading-[1.5] flex items-start gap-1.5"><Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: ACCENT }} />{c.passt}</p>
            </button>
          );
        })}
      </div>

      {/* Dauer-Slider erscheinen je nach Auswahl */}
      {(cuActive || buActive) && (
        <div className="mt-7 grid md:grid-cols-2 gap-4">
          {cuActive && <TierSlider label="Dauer Close-Up" tiers={CLOSEUP_TIERS} value={answers.cuMin ?? 30} onChange={(min) => setA({ cuMin: min })} />}
          {buActive && <TierSlider label="Dauer Bühne" tiers={BUEHNE_TIERS} value={answers.buehneMin ?? 30} onChange={(min) => setA({ buehneMin: min })} />}
        </div>
      )}

      {/* Richtpreis-Hinweis */}
      {fmt && fmt !== "beratung" && (
        <div className="mt-6 flex items-center gap-3 p-4 rounded-xl" style={{ background: `linear-gradient(135deg, rgba(29,63,255,0.07), rgba(18,51,204,0.05))` }}>
          <Sparkles className="w-5 h-5 shrink-0" style={{ color: ACCENT }} />
          <p className="text-sm text-foreground/80 leading-snug">
            {price.kind === "ab"
              ? <>Unverbindlicher Richtwert: <strong style={{ color: ACCENT_DEEP }}>ab {formatEuro(price.amount)}</strong> — inkl. Anfahrt (Bayern), Briefing-Call & Versicherung. Finales Angebot nach kurzem Gespräch.</>
              : <>Für diesen Umfang mache ich dir ein <strong style={{ color: ACCENT_DEEP }}>individuelles Angebot</strong> — sag mir am Ende kurz Bescheid.</>}
          </p>
        </div>
      )}
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   STEP 3 — Abend-Baukasten (Drag & Drop)
   ─────────────────────────────────────────────────────────── */
const SortableBaustein = ({ id, pos, onRemove }: { id: string; pos: number; onRemove: (id: string) => void }) => {
  const b = BAUSTEIN_MAP[baseOf(id)];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.55 : 1, zIndex: isDragging ? 50 : undefined };
  if (!b) return null;
  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white" {...attributes}>
      <button type="button" className="shrink-0 touch-none cursor-grab active:cursor-grabbing text-foreground/35 hover:text-foreground/70 transition-colors" aria-label="Baustein verschieben" {...listeners}>
        <GripVertical className="w-5 h-5" />
      </button>
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-[12px] font-bold tabular-nums" style={{ background: ACCENT, color: "white" }}>{pos}</span>
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ background: "rgba(29,63,255,0.1)" }}><b.Icon className="w-4 h-4" style={{ color: ACCENT }} /></span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground leading-tight truncate">{b.t}</p>
        <p className="text-[12px] text-foreground/55 leading-snug truncate">{b.d}</p>
      </div>
      <button type="button" onClick={() => onRemove(id)} aria-label="Entfernen" className="shrink-0 w-7 h-7 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.12] inline-flex items-center justify-center transition-colors"><X className="w-3.5 h-3.5 text-foreground/55" /></button>
    </div>
  );
};
const AblaufStep = ({ answers, setA }: { answers: ShowPlanerAnswers; setA: (p: Partial<ShowPlanerAnswers>) => void }) => {
  const ablauf = answers.ablauf || [];
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldI = ablauf.indexOf(String(active.id));
    const newI = ablauf.indexOf(String(over.id));
    if (oldI < 0 || newI < 0) return;
    setA({ ablauf: arrayMove(ablauf, oldI, newI) });
  };
  const add = (baseId: string) => {
    let n = 0;
    ablauf.forEach((u) => {
      if (baseOf(u) !== baseId) return;
      const k = u.includes("__") ? Number(u.split("__")[1]) : 0;
      if (k >= n) n = k + 1;
    });
    setA({ ablauf: [...ablauf, `${baseId}__${n}`] });
  };
  const remove = (uid: string) => setA({ ablauf: ablauf.filter((x) => x !== uid) });

  return (
    <div className="sp-step">
      <StepHead n="04" eyebrow="Frage 04 · Dein Ablauf" title="Bau dir deinen Abend." sub="Füg Bausteine hinzu — auch mehrfach — und zieh sie in deine Wunsch-Reihenfolge. Beim Magic Dinner gestaltest du so den ganzen Abend. Überspringen geht auch." />
      <div className="grid lg:grid-cols-2 gap-x-10 gap-y-8">
        {/* Mein Ablauf */}
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-3" style={{ color: ACCENT }}>Dein Ablauf · ziehen zum Sortieren</p>
          {ablauf.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-foreground/15 p-8 text-center text-foreground/45 text-sm">Noch leer — füg rechts Bausteine hinzu.</div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={ablauf} strategy={verticalListSortingStrategy}>
                <div className="space-y-2.5 p-3 rounded-2xl" style={{ background: "hsl(0,0%,97.5%)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  {ablauf.map((uid, i) => <SortableBaustein key={uid} id={uid} pos={i + 1} onRemove={remove} />)}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
        {/* Palette */}
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-3 text-foreground/50">Bausteine · antippen zum Hinzufügen (mehrfach möglich)</p>
          <div className="space-y-2.5">
            {BAUSTEINE.map((b) => (
              <button key={b.id} type="button" onClick={() => add(b.id)} className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white hover:shadow-md transition-all text-left" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ background: "rgba(0,0,0,0.04)" }}><b.Icon className="w-4 h-4" style={{ color: ACCENT }} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-foreground leading-tight">{b.t}</p>
                  <p className="text-[12px] text-foreground/55 leading-snug">{b.d}</p>
                </div>
                <span className="shrink-0 w-7 h-7 rounded-full inline-flex items-center justify-center" style={{ background: "rgba(29,63,255,0.1)" }}><Plus className="w-4 h-4" style={{ color: ACCENT }} /></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   SUMMARY — Richtpreis + Empfehlung + Lead-Form
   ─────────────────────────────────────────────────────────── */
const FORMAT_LABEL: Record<string, string> = { closeup: "Close-Up", buehne: "Bühnenshow", kombi: "Kombi · Close-Up + Bühne", dinner: "Magic Dinner", beratung: "Beratung gewünscht" };
const ANLASS_LABEL: Record<string, string> = Object.fromEntries(ANLAESSE.map((a) => [a.value, a.label]));
const SummaryView = ({ answers, reco, price, showPrice, name, email, phone, onName, onEmail, onPhone, onEditStep }: {
  answers: ShowPlanerAnswers; reco: { format: string; why: string; link: string }; price: ReturnType<typeof estimatePrice>; showPrice: boolean;
  name: string; email: string; phone: string; onName: (v: string) => void; onEmail: (v: string) => void; onPhone: (v: string) => void; onEditStep: (i: number) => void;
}) => {
  const extra = RECO_EXTRA[reco.link] || RECO_FALLBACK;
  const rows = [
    { i: 0, label: "Anlass", value: ANLASS_LABEL[answers.anlass || ""] || "—" },
    { i: 1, label: "Rahmen", value: [answers.gaeste ? `${answers.gaeste} Gäste` : null, answers.ort || null, answers.zeitraum ? ZEITRAEUME.find((z) => z.value === answers.zeitraum)?.label : null].filter(Boolean).join(" · ") || "—" },
    { i: 2, label: "Format", value: FORMAT_LABEL[answers.format || ""] || "—" },
    { i: 3, label: "Ablauf", value: (answers.ablauf || []).map((id) => BAUSTEIN_MAP[baseOf(id)]?.t).filter(Boolean).join(" → ") || "—" },
  ];
  return (
    <div className="sp-step">
      {/* Richtpreis-Banner */}
      {showPrice && (
        <div className="mb-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-5 md:p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, rgba(29,63,255,0.08), rgba(18,51,204,0.04))`, border: "1px solid rgba(29,63,255,0.16)" }}>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full shrink-0" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}><Sparkles className="w-6 h-6 text-white" /></div>
          <div className="flex-1">
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1" style={{ color: ACCENT }}>Unverbindliche Ersteinschätzung</p>
            {price.kind === "ab"
              ? <p className="text-foreground/80 leading-snug"><span className="text-2xl md:text-3xl font-black" style={{ color: ACCENT_DEEP }}>ab {formatEuro(price.amount)}</span> <span className="text-sm"> · inkl. Anfahrt Bayern, Briefing-Call & Versicherung</span></p>
              : <p className="text-foreground/80 leading-snug"><span className="text-xl md:text-2xl font-black" style={{ color: ACCENT_DEEP }}>Individuelles Angebot</span> <span className="text-sm"> · für diesen Umfang rechne ich dir ein faires Paket</span></p>}
            <p className="text-xs text-foreground/50 mt-1">Richtwert — das finale Angebot stimmen wir kurz persönlich ab.</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10 items-stretch mb-10">
        {/* Lead-Form */}
        <div>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl md:text-5xl tabular-nums leading-none" style={{ color: ACCENT }}>05</span>
            <span className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: ACCENT }}>Letzter Schritt · Absenden</span>
          </div>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.6rem,3vw,2.5rem)] text-foreground mb-4">Fast <span style={{ color: ACCENT }}>geschafft</span>.</h2>
          <p className="text-base md:text-lg text-foreground/65 leading-[1.65] mb-6">Name und Email genügen — ich melde mich innerhalb 24 Stunden mit einem konkreten Vorschlag.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Dein Name" value={name} onChange={(e) => onName(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white" style={{ ["--ac" as never]: ACCENT }} />
            <input type="email" placeholder="Deine Email (Pflicht für Antwort)" value={email} onChange={(e) => onEmail(e.target.value)} required className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white" style={{ ["--ac" as never]: ACCENT }} />
            <input type="tel" placeholder="Telefon (optional, schnellere Antwort)" value={phone} onChange={(e) => onPhone(e.target.value)} className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white" style={{ ["--ac" as never]: ACCENT }} />
          </div>
          <p className="text-xs md:text-sm text-foreground/55 mt-4 flex items-center gap-2"><Sparkles className="w-3 h-3" style={{ color: ACCENT }} /> Antwort innerhalb 24 Stunden — meistens schneller.</p>
        </div>

        {/* Empfehlungs-Karte */}
        <aside className="self-stretch h-full flex flex-col rounded-2xl relative overflow-hidden text-white" style={{ background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, #08060c 100%)`, boxShadow: "0 30px 60px -25px rgba(0,0,0,0.4)" }}>
          <div className="relative w-full h-40 md:h-48 shrink-0 overflow-hidden">
            <img src={extra.img} alt={reco.format} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} loading="lazy" />
            <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(8,6,12,0.05) 0%, rgba(18,51,204,0.25) 55%, ${ACCENT_DEEP} 100%)` }} />
          </div>
          <div className="relative flex-1 flex flex-col p-7">
            <p className="relative text-[10px] tracking-[0.18em] uppercase font-bold mb-3" style={{ color: AMBER }}>Meine Empfehlung für dich</p>
            <h3 className="relative font-display text-2xl md:text-3xl font-black leading-tight mb-3">{reco.format}</h3>
            <p className="relative text-sm md:text-[15px] text-white/80 leading-[1.6] mb-6">{reco.why}</p>
            <ul className="relative space-y-3 mb-7">
              {extra.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: AMBER }} /><span className="text-sm text-white/90 leading-[1.5]">{h}</span></li>
              ))}
            </ul>
            <a href={reco.link} target="_blank" rel="noopener" className="relative mt-auto inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase font-bold pb-0.5 border-b transition-colors self-start" style={{ color: "#FFFFFF", borderColor: "rgba(175,192,255,0.45)" }}>
              Mehr Infos zum Format <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </aside>
      </div>

      {/* Angaben-Übersicht */}
      <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-4" style={{ color: ACCENT }}>Deine Angaben · zum Ändern antippen</p>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl">
        {rows.map((r) => (
          <button key={r.i} type="button" onClick={() => onEditStep(r.i)} className="group text-left p-4 rounded-xl bg-[hsl(0,0%,98%)] hover:bg-white hover:shadow-md transition-all" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-[10px] tracking-[0.16em] uppercase font-bold" style={{ color: ACCENT }}>{r.label}</span>
              <span className="text-[10px] tracking-[0.12em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: ACCENT }}>Ändern →</span>
            </div>
            <p className="text-[15px] text-foreground/80 leading-snug">{r.value}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   Submitted
   ─────────────────────────────────────────────────────────── */
const SubmittedState = ({ reco }: { reco: { format: string } }) => (
  <div className="sp-step text-center py-12 md:py-20">
    <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full mb-7" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`, boxShadow: "0 20px 50px -10px rgba(29,63,255,0.5)" }}>
      <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
    </div>
    <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.875rem)] text-foreground mb-5">Geschafft. <span style={{ color: ACCENT }}>Ich bin dran.</span></h2>
    <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-xl mx-auto mb-8">Deine Anfrage ist bei mir — Antwort innerhalb 24 Stunden mit konkretem Vorschlag für <strong>{reco.format}</strong>. Du wirst gleich zur Buchungs-Seite weitergeleitet.</p>
    <div aria-hidden className="fixed inset-0 pointer-events-none z-[105]">
      {[...Array(36)].map((_, i) => {
        const dx = ((i * 37) % 100 - 50) / 50 * 600;
        const dy = ((i * 53) % 100) / 100 * 600 + 200;
        const colors = [ACCENT, AMBER, "#86d29a", "#1f5e3f"];
        const c = colors[i % colors.length];
        return <span key={i} className="sp-confetti-piece" style={{ left: `${(i * 53) % 100}%`, top: "30%", background: c, borderRadius: i % 2 === 0 ? "2px" : "50%", ["--dx" as never]: `${dx}px`, ["--dy" as never]: `${dy}px`, animationDelay: `${(i % 6) * 0.04}s` }} />;
      })}
    </div>
  </div>
);

export default ShowPlanerModal;
