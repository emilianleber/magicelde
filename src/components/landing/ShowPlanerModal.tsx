import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  Building2,
  Cake,
  PartyPopper,
  Briefcase,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Mic2,
  Wine,
  Utensils,
  Clock,
  Smile,
  Brain,
  Crown,
  Star,
  Send,
  X,
  Sparkle,
  Lightbulb,
  Trophy,
} from "lucide-react";
import {
  ShowPlanerAnswers,
  ShowPlanerDraft,
  loadDraft,
  saveDraft,
  markCompleted,
} from "@/lib/showPlaner";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import { sendInquiry } from "@/lib/sendInquiry";

const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";
const AMBER = "#AFC0FF";

/* ───────────────────────────────────────────────────────────
   STEP-DEFINITIONS
   ─────────────────────────────────────────────────────────── */
type StepOption = {
  value: string;
  label: string;
  sub: string;
  Icon: typeof Heart;
};
type StepDef = {
  id: keyof ShowPlanerAnswers;
  number: string;
  eyebrow: string;
  title: string;
  hint: string;
  tip: string;
  feedback: string;
  type: "options" | "text" | "textarea";
  options?: StepOption[];
  placeholder?: string;
};

const STEPS: StepDef[] = [
  {
    id: "anlass",
    number: "01",
    eyebrow: "Frage 01 · Anlass",
    title: "Was für ein Anlass?",
    hint: "Davon hängt Tonalität und Format ab — Premium-Gala anders als Geburtstag.",
    tip: "Tipp: wenn der Anlass [Hochzeit + Firmenfeier] ist (z.B. Firmen-Hochzeit), wähle den dominanten Charakter.",
    feedback: "Spannend.",
    type: "options",
    options: [
      { value: "hochzeit", label: "Hochzeit", Icon: Heart, sub: "Brautpaar im Mittelpunkt" },
      { value: "firma", label: "Firmenfeier", Icon: Briefcase, sub: "Vorstand / Mitarbeiter / Kunden" },
      { value: "geburtstag", label: "Geburtstag", Icon: Cake, sub: "Privat · 30er bis Goldene Hochzeit" },
      { value: "gala", label: "Gala / Award-Show", Icon: Trophy, sub: "Premium · Black-Tie" },
      { value: "messe", label: "Messe / Stand", Icon: Building2, sub: "Lead-Generator" },
      { value: "privat", label: "Privat / Sonstiges", Icon: PartyPopper, sub: "Jubiläum · Einweihung · etc." },
    ],
  },
  {
    id: "saison",
    number: "02",
    eyebrow: "Frage 02 · Zeitraum",
    title: "Wann findet das Event statt?",
    hint: "Q4 (Weihnachten) bitte früh anfragen — Termine eng.",
    tip: "Tipp: Wenn du ein konkretes Datum hast, schreib es im letzten Schritt in die Notizen.",
    feedback: "Notiert.",
    type: "options",
    options: [
      { value: "q1q2", label: "Q1 – Q2", Icon: Calendar, sub: "Jan – Jun · entspannt" },
      { value: "q3", label: "Q3", Icon: Calendar, sub: "Jul – Sep · mittel" },
      { value: "q4", label: "Q4", Icon: Calendar, sub: "Okt – Dez · eng" },
      { value: "flexibel", label: "Flexibel", Icon: Clock, sub: "Datum noch offen" },
    ],
  },
  {
    id: "ort",
    number: "03",
    eyebrow: "Frage 03 · Ort",
    title: "Wo findet das Event statt?",
    hint: "Stadt reicht — Location-Details später.",
    tip: "Tipp: Schreib einfach die Stadt oder Region. Bei Bayern ist die Anfahrt im Angebot inklusive.",
    feedback: "Verstanden.",
    type: "text",
    placeholder: "z.B. München · Regensburg · Nürnberg · Salzburg",
  },
  {
    id: "gaesteCount",
    number: "04",
    eyebrow: "Frage 04 · Gästezahl",
    title: "Wie viele Gäste?",
    hint: "Bestimmt Format (Close-Up vs Bühne) und Aufwand.",
    tip: "Tipp: bis 30 Gäste ist Close-Up am stärksten, ab 80 lohnt sich eine Bühne.",
    feedback: "Passt.",
    type: "options",
    options: [
      { value: "klein", label: "Bis 30", Icon: Users, sub: "Intim · Tisch / Tafel" },
      { value: "mittel", label: "30 – 80", Icon: Users, sub: "Tisch-zu-Tisch + Mini-Bühne" },
      { value: "gross", label: "80 – 250", Icon: Users, sub: "Bühnenshow mit Headset" },
      { value: "xl", label: "250 +", Icon: Users, sub: "Volle Bühne, großer Saal" },
    ],
  },
  {
    id: "format",
    number: "05",
    eyebrow: "Frage 05 · Format",
    title: "Welches Format schwebt dir vor?",
    hint: "Bauchgefühl ist OK — ich berate danach.",
    tip: "Tipp: viele kombinieren Close-Up beim Empfang + Bühne vor dem Tanz. Wähl [Weiß nicht] wenn du Empfehlung willst.",
    feedback: "Klingt stark.",
    type: "options",
    options: [
      { value: "closeup", label: "Close-Up", Icon: Sparkles, sub: "Tisch-zu-Tisch / Walk-Around" },
      { value: "buehne", label: "Bühnenshow", Icon: Mic2, sub: "15 – 60 Min durchkomponiert" },
      { value: "dinner", label: "Magic Dinner", Icon: Utensils, sub: "Magie zwischen den Gängen" },
      { value: "weiss-nicht", label: "Weiß noch nicht", Icon: Lightbulb, sub: "Empfehlung für mich" },
    ],
  },
  {
    id: "dauer",
    number: "06",
    eyebrow: "Frage 06 · Dauer",
    title: "Wie lange soll die Magie laufen?",
    hint: "Kompakter Slot oder kompletter Abend?",
    tip: "Tipp: bei Hochzeiten ist [3–4 Stunden Walk-Around + 20 Min Bühne] der Klassiker.",
    feedback: "Notiert.",
    type: "options",
    options: [
      { value: "kurz", label: "15 – 30 Min", Icon: Clock, sub: "Ein Highlight-Slot" },
      { value: "mittel", label: "45 – 60 Min", Icon: Clock, sub: "Hauptshow oder Programm-Block" },
      { value: "lang", label: "2 – 4 Stunden", Icon: Clock, sub: "Walk-Around + Bühnen-Highlight" },
      { value: "abend", label: "Kompletter Abend", Icon: Clock, sub: "Magic Dinner Format" },
    ],
  },
  {
    id: "tonalitaet",
    number: "07",
    eyebrow: "Frage 07 · Tonalität",
    title: "Welcher Ton?",
    hint: "Davon hängt der Comedy-Anteil ab.",
    tip: "Tipp: Vorstandsdinner = Premium, Geburtstag = Comedy-heavy, Hochzeit = warm-verbindend.",
    feedback: "Klingt stark.",
    type: "options",
    options: [
      { value: "premium", label: "Premium · zurückhaltend", Icon: Crown, sub: "Mentalmagie · Theater-Ton" },
      { value: "warm", label: "Warm · verbindend", Icon: Heart, sub: "Anekdoten · Mit-Publikum" },
      { value: "comedy", label: "Comedy-heavy", Icon: Smile, sub: "Stand-Up · Pointen-Sets" },
      { value: "mental", label: "Mental-fokussiert", Icon: Brain, sub: "Drei Sekunden Stille" },
    ],
  },
  {
    id: "budget",
    number: "08",
    eyebrow: "Frage 08 · Budget-Range",
    title: "Welche Budget-Range hast du im Kopf?",
    hint: "Hilft mir, das passende Format vorzuschlagen — kein Festpreis.",
    tip: "Tipp: alle Pakete inkl. Anfahrt Bayern, Vorab-Briefing-Call und Versicherung. Honorar je nach Format und Reichweite.",
    feedback: "OK.",
    type: "options",
    options: [
      { value: "kompakt", label: "Kompakt", Icon: Star, sub: "Privat-Feiern, kleinere Settings" },
      { value: "standard", label: "Standard", Icon: Star, sub: "Hochzeiten, mittlere Firmenfeiern" },
      { value: "premium", label: "Premium", Icon: Star, sub: "Galas, Konzern-Events" },
      { value: "auf-anfrage", label: "Auf Anfrage", Icon: Star, sub: "Sag du mir deinen Wert" },
    ],
  },
  {
    id: "notizen",
    number: "09",
    eyebrow: "Frage 09 · Special-Wünsche",
    title: "Anekdoten, Insider, Tabus?",
    hint: "Was soll eingebaut werden? Was lieber nicht?",
    tip: "Tipp: persönliche Anekdoten machen den Effekt 10× stärker — Brautpaar-Story, Vorstand-Insider, Geburtstagskind-Hobby.",
    feedback: "Top.",
    type: "textarea",
    placeholder:
      "z.B. Brautpaar-Story: kennengelernt in einem Café in München · Vorstand-Insider: Q3-Sales-Award · Tabus: keine Religion / Politik",
  },
];

const TOTAL_STEPS = STEPS.length;
const SUMMARY_STEP = TOTAL_STEPS; // step nach allen Fragen
const TOTAL_TABS = TOTAL_STEPS + 1; // +1 für Summary

/* ───────────────────────────────────────────────────────────
   Empfehlung berechnen
   ─────────────────────────────────────────────────────────── */
function buildRecommendation(answers: ShowPlanerAnswers): {
  format: string;
  why: string;
  link: string;
} {
  const { anlass, format, gaesteCount, dauer, tonalitaet } = answers;

  if (anlass === "hochzeit") {
    return {
      format: "Hochzeits-Mix · Close-Up + Bühne",
      why: "Walk-Around beim Empfang als Eisbrecher, Tisch-zu-Tisch beim Dinner mit eingebauten Brautpaar-Anekdoten, Bühnen-Highlight vor dem ersten Tanz.",
      link: "/hochzeit",
    };
  }
  if (anlass === "firma") {
    return {
      format: "Firmen-Event · angepasst",
      why: tonalitaet === "premium"
        ? "Vorstandsdinner-Tonalität, Mentaleffekte mit Insider-Bezug aus Briefing, drei Sekunden Stille als Markenzeichen."
        : "Mix aus Magie-Bridges in der Moderation und Bühnenshow als Programmpunkt — Comedy-Anteil je nach Publikum.",
      link: "/firmenfeiern",
    };
  }
  if (anlass === "geburtstag") {
    return {
      format: "Geburtstags-Mix",
      why: "Memory-Lane mit Anekdoten vom Geburtstagskind eingebaut, Close-Up an den Tafeln, kompakte Bühnenshow als Höhepunkt.",
      link: "/geburtstage",
    };
  }
  if (anlass === "gala") {
    return {
      format: "Premium-Bühnenshow",
      why: "Award-Show-Tonalität mit Mentaleffekten zwischen den Programmpunkten, Standing-Ovation-Finale vor dem Tanz.",
      link: "/buehnenshow",
    };
  }
  if (anlass === "messe") {
    return {
      format: "Messe-Magier · Lead-Generator",
      why: "Stand-Aktivierung, Besucher gezielt anziehen, Leads spielerisch qualifizieren. Halbtag / Vollen Tag / Mehrtages.",
      link: "/messe-magier",
    };
  }
  if (format === "dinner" || dauer === "abend") {
    return {
      format: "Magic Dinner",
      why: "Mehrgänge-Abend mit Magie zwischen den Gängen — Walk-Around, Tisch-zu-Tisch und Bühnen-Routine zum Dessert.",
      link: "/magic-dinner",
    };
  }
  if (format === "closeup" || gaesteCount === "klein") {
    return {
      format: "Close-Up-Format",
      why: "Karten in euren Händen, eingebaute Anekdoten, drei Sekunden Stille nach jeder Pointe.",
      link: "/close-up",
    };
  }
  return {
    format: "Bühnenshow",
    why: "Durchkomponiert mit Drama-Kurve, Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale.",
    link: "/buehnenshow",
  };
}

/* ───────────────────────────────────────────────────────────
   MODAL
   ─────────────────────────────────────────────────────────── */
type ShowPlanerModalProps = {
  open: boolean;
  onClose: () => void;
};

const ShowPlanerModal = ({ open, onClose }: ShowPlanerModalProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ShowPlanerAnswers>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const startedAtRef = useRef<number>(Date.now());

  // On mount: load draft
  useEffect(() => {
    if (!open) return;
    const draft = loadDraft();
    if (draft) {
      setStep(draft.step);
      setAnswers(draft.answers);
      if (draft.email) setEmail(draft.email);
      if (draft.name) setName(draft.name);
      startedAtRef.current = draft.startedAt;
    } else {
      startedAtRef.current = Date.now();
    }
  }, [open]);

  // Persist on every change
  useEffect(() => {
    if (!open) return;
    const draft: ShowPlanerDraft = {
      step,
      answers,
      email,
      name,
      startedAt: startedAtRef.current,
      updatedAt: Date.now(),
    };
    saveDraft(draft);
    if (email) captureEmail(email, "showplaner", { answers, name });
  }, [step, answers, email, name, open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const currentStep = STEPS[step];
  const isSummary = step >= TOTAL_STEPS;
  const progressPct = ((step + (isSummary ? 1 : 0)) / TOTAL_TABS) * 100;
  const recommendation = useMemo(
    () => buildRecommendation(answers),
    [answers],
  );

  const updateAnswer = useCallback(
    (id: keyof ShowPlanerAnswers, value: string) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
      const stepDef = STEPS.find((s) => s.id === id);
      if (stepDef) {
        setFeedback(stepDef.feedback);
        window.setTimeout(() => setFeedback(null), 1100);
      }
      // Auto-advance for option-type
      if (stepDef?.type === "options") {
        window.setTimeout(() => {
          setStep((s) => Math.min(s + 1, TOTAL_STEPS));
        }, 600);
      }
    },
    [],
  );

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canProceed = useMemo(() => {
    if (isSummary) return true;
    const val = answers[currentStep.id];
    if (currentStep.type === "options") return !!val;
    if (currentStep.type === "text") return !!(val && val.trim().length > 1);
    if (currentStep.type === "textarea") return true; // optional
    return false;
  }, [currentStep, answers, isSummary]);

  const submit = async () => {
    if (!email || !email.includes("@")) return;
    markCompleted();
    setSubmitted(true);

    const notizen = [
      answers.dauer ? `Dauer: ${answers.dauer}` : null,
      answers.tonalitaet ? `Tonalität: ${answers.tonalitaet}` : null,
      answers.location ? `Location: ${answers.location}` : null,
      answers.notizen ? `Notizen: ${answers.notizen}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await sendInquiry({
        name: name.trim() || "Show-Planer",
        email,
        phone,
        anlass: answers.anlass || "Show-Planer-Anfrage",
        format: answers.format || "noch offen",
        datum: answers.datum || "",
        ort: answers.ort || "",
        gaeste: answers.gaesteCount ? Number(answers.gaesteCount) : null,
        nachricht:
          `Show-Planer-Anfrage über magicel.de\n\n${notizen || "Keine zusätzlichen Notizen."}`,
      });
      markEmailSubmitted();
    } catch (err) {
      // Soft-fail: trotzdem zur Buchung weiterleiten mit Prefill als Backup
      console.error("ShowPlaner sendInquiry failed", err);
    }

    const params = new URLSearchParams();
    params.set("anlass", answers.anlass || "");
    params.set("format", answers.format || "");
    params.set("gaeste", answers.gaesteCount || "");
    params.set("dauer", answers.dauer || "");
    params.set("ton", answers.tonalitaet || "");
    params.set("ort", answers.ort || "");
    params.set("email", email);
    if (name) params.set("name", name);
    if (phone) params.set("phone", phone);
    if (answers.notizen) params.set("notizen", answers.notizen);
    window.setTimeout(() => {
      onClose();
      window.location.href = `/buchung?${params.toString()}`;
    }, 1800);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Show-Planer"
      className="fixed inset-0 z-[100]"
    >
      <style>{`
        @keyframes spStepIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spFeedbackIn { 0% { opacity: 0; transform: scale(0.9) translateY(8px); } 50% { opacity: 1; } 100% { opacity: 0; transform: scale(1.05) translateY(-8px); } }
        @keyframes spConfetti { 0% { transform: translate(0,0) rotate(0); opacity: 0.95; } 100% { transform: translate(var(--dx),var(--dy)) rotate(720deg); opacity: 0; } }
        .sp-step { animation: spStepIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }
        .sp-feedback { animation: spFeedbackIn 1.1s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .sp-confetti-piece { position: absolute; width: 8px; height: 14px; animation: spConfetti 1.6s cubic-bezier(0.22,1,0.36,1) forwards; will-change: transform, opacity; }
      `}</style>

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#08060c]/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        data-lenis-prevent
        className="absolute inset-0 md:inset-4 lg:inset-8 bg-white text-foreground overflow-y-auto md:rounded-3xl"
        style={{
          boxShadow:
            "0 80px 160px -40px rgba(0,0,0,0.5), 0 30px 60px -20px rgba(0,0,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header — Progress + Close */}
        <header
          className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-foreground/10"
          style={{ paddingTop: "env(safe-area-inset-top, 0)" }}
        >
          <div className="px-5 md:px-10 py-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span
                  className="text-[10px] tracking-[0.18em] uppercase font-bold"
                  style={{ color: ACCENT }}
                >
                  Show-Planer
                </span>
                <span
                  className={`text-sm text-foreground/55 tabular-nums`}
                >
                  {isSummary
                    ? "Übersicht · fast geschafft"
                    : `Schritt ${step + 1} von ${TOTAL_STEPS}`}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-foreground/[0.08] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPct}%`,
                    background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                />
              </div>
              <div className="hidden md:flex gap-1 mt-3">
                {[...STEPS, { number: "✓" } as StepDef].map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => i <= step && setStep(i)}
                    className="flex-1 text-[10px] tracking-[0.14em] uppercase font-bold py-1.5 rounded transition-colors"
                    style={{
                      color:
                        i === step && !isSummary
                          ? ACCENT
                          : i < step ||
                              (isSummary && i === STEPS.length)
                            ? "rgba(0,0,0,0.040)"
                            : "rgba(0,0,0,0.25)",
                      background:
                        i === step && !isSummary
                          ? "rgba(0,0,0,0.040)"
                          : "transparent",
                      cursor: i <= step ? "pointer" : "default",
                    }}
                  >
                    {s.number}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Show-Planer schließen"
              className="shrink-0 w-10 h-10 rounded-full bg-foreground/[0.05] hover:bg-foreground/[0.1] inline-flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Feedback toast */}
        {feedback && (
          <div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] px-5 py-3 rounded-full text-white text-sm font-semibold sp-feedback pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              boxShadow: "0 18px 40px -10px rgba(0,0,0,0.040)",
            }}
          >
            {feedback}
            <Sparkle
              className="inline-block w-4 h-4 ml-1.5"
              style={{ color: AMBER }}
            />
          </div>
        )}

        {/* Body */}
        <div className="px-5 md:px-10 lg:px-16 py-10 md:py-16 max-w-6xl mx-auto">
          {submitted ? (
            <SubmittedState recommendation={recommendation} />
          ) : !isSummary ? (
            <StepView
              key={step}
              step={currentStep}
              value={answers[currentStep.id]}
              onValue={(v) => updateAnswer(currentStep.id, v)}
            />
          ) : (
            <SummaryView
              answers={answers}
              recommendation={recommendation}
              name={name}
              email={email}
              phone={phone}
              onName={setName}
              onEmail={setEmail}
              onPhone={setPhone}
              onSubmit={submit}
              onEditStep={(i) => setStep(i)}
            />
          )}
        </div>

        {/* Sticky Footer — Navigation */}
        {!submitted && (
          <footer className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-foreground/10">
            <div className="px-5 md:px-10 py-4 flex items-center justify-between gap-4 max-w-6xl mx-auto">
              <button
                type="button"
                onClick={prev}
                disabled={step === 0}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/65 hover:text-foreground transition-colors disabled:opacity-6 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Zurück
              </button>
              <span
                className={`text-xs md:text-sm text-foreground/55 text-center`}
              >
                {isSummary
                  ? "Fast geschafft — nur noch Email."
                  : step >= TOTAL_STEPS - 2
                    ? "Bald geschafft ✨"
                    : "Dein Fortschritt wird automatisch gespeichert."}
              </span>
              {!isSummary && (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canProceed}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-all disabled:opacity-8 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                    boxShadow: canProceed
                      ? "0 14px 30px -8px rgba(0,0,0,0.040)"
                      : "none",
                  }}
                >
                  {step === TOTAL_STEPS - 1 ? "Zur Übersicht" : "Weiter"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {isSummary && (
                <button
                  type="button"
                  onClick={submit}
                  disabled={!email || !email.includes("@")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-all disabled:opacity-8 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                    boxShadow:
                      email && email.includes("@")
                        ? "0 14px 30px -8px rgba(0,0,0,0.040)"
                        : "none",
                  }}
                >
                  Jetzt absenden
                  <Send className="w-4 h-4" />
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
   StepView — Question rendering
   ─────────────────────────────────────────────────────────── */
const StepView = ({
  step,
  value,
  onValue,
}: {
  step: StepDef;
  value?: string;
  onValue: (v: string) => void;
}) => {
  return (
    <div className="sp-step">
      <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 mb-12">
        <div className="lg:col-span-7">
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className={`text-4xl md:text-5xl tabular-nums leading-none`}
              style={{ color: ACCENT }}
            >
              {step.number}
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: ACCENT }}
            >
              {step.eyebrow}
            </span>
          </div>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground mb-6">
            {step.title}
          </h2>
          <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-xl">
            {step.hint}
          </p>
        </div>
        <aside
          className="lg:col-span-5 self-start p-6 rounded-2xl"
          style={{
            background: "linear-gradient(155deg, #EEF1F6 0%, #DCE4FF 100%)",
            border: "1px solid rgba(0,0,0,0.024)",
          }}
        >
          <div className="flex items-baseline gap-2 mb-2">
            <Lightbulb
              className="w-4 h-4 shrink-0 mt-0.5"
              style={{ color: "#1233CC" }}
            />
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: "#1233CC" }}
            >
              Tipp
            </span>
          </div>
          <p className="text-sm text-foreground/75 leading-[1.65]">
            {step.tip}
          </p>
        </aside>
      </div>

      {/* Question UI */}
      {step.type === "options" && step.options && (
        <div
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
          role="radiogroup"
          aria-label={step.title}
        >
          {step.options.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onValue(opt.value)}
                aria-pressed={selected}
                className="group relative text-left p-5 md:p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: selected ? "white" : "hsl(0,0%,98%)",
                  border: selected
                    ? `2px solid ${ACCENT}`
                    : "2px solid transparent",
                  boxShadow: selected
                    ? "0 25px 50px -25px rgba(0,0,0,0.040), inset 0 0 0 1px rgba(0,0,0,0.040)"
                    : "0 10px 25px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)",
                  transform: selected ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                      background: selected
                        ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`
                        : "linear-gradient(135deg, rgba(0,0,0,0.040), rgba(0,0,0,0.020))",
                      border: "1px solid rgba(0,0,0,0.040)",
                    }}
                  >
                    <opt.Icon
                      className="w-4 h-4"
                      style={{ color: selected ? "white" : ACCENT }}
                      strokeWidth={1.75}
                    />
                  </span>
                  {selected && (
                    <CheckCircle2
                      className="w-5 h-5 ml-auto"
                      style={{ color: ACCENT }}
                    />
                  )}
                </div>
                <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-tight mb-1.5">
                  {opt.label}
                </h3>
                <p
                  className={`text-xs md:text-sm text-foreground/55 leading-snug`}
                >
                  {opt.sub}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {step.type === "text" && (
        <div className="max-w-xl">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onValue(e.target.value)}
            placeholder={step.placeholder}
            className="w-full px-5 py-4 rounded-2xl border-2 border-foreground/15 focus:border-[color:var(--ac)] outline-none text-base md:text-lg transition-colors bg-white"
            style={{ ["--ac" as any]: ACCENT }}
            autoFocus
          />
        </div>
      )}

      {step.type === "textarea" && (
        <div className="max-w-2xl">
          <textarea
            value={value || ""}
            onChange={(e) => onValue(e.target.value)}
            placeholder={step.placeholder}
            rows={5}
            className="w-full px-5 py-4 rounded-2xl border-2 border-foreground/15 focus:border-[color:var(--ac)] outline-none text-base md:text-lg transition-colors bg-white resize-none"
            style={{ ["--ac" as any]: ACCENT }}
          />
          <p
            className={`text-sm text-foreground/55 mt-3`}
          >
            Optional — du kannst auch leer lassen und im Telefonat erzählen.
          </p>
        </div>
      )}
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   SummaryView
   ─────────────────────────────────────────────────────────── */
const SummaryView = ({
  answers,
  recommendation,
  name,
  email,
  phone,
  onName,
  onEmail,
  onPhone,
  onSubmit,
  onEditStep,
}: {
  answers: ShowPlanerAnswers;
  recommendation: { format: string; why: string; link: string };
  name: string;
  email: string;
  phone: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPhone: (v: string) => void;
  onSubmit: () => void;
  onEditStep: (i: number) => void;
}) => {
  const summary = STEPS.map((s, i) => ({
    i,
    label: s.title,
    answer: answers[s.id] || "—",
    options: s.options,
  }));
  return (
    <div className="sp-step">
      <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 mb-12">
        <div className="lg:col-span-7">
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className={`text-4xl md:text-5xl tabular-nums leading-none`}
              style={{ color: ACCENT }}
            >
              10
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: ACCENT }}
            >
              Letzter Schritt · Übersicht & Absenden
            </span>
          </div>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground mb-6">
            Bald{" "}
            <span style={{ color: ACCENT }}>
              geschafft
            </span>
            .
          </h2>
          <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-xl">
            Hier deine Antworten zusammengefasst — du kannst jeden Schritt
            nochmal antippen und korrigieren. Wenn alles passt, schick mir Name
            und Email — ich melde mich innerhalb 24 Stunden zurück mit konkretem
            Vorschlag.
          </p>
        </div>
        <aside
          className="lg:col-span-5 self-start p-7 rounded-2xl relative overflow-hidden text-white"
          style={{
            background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, #08060c 100%)`,
            boxShadow: "0 30px 60px -25px rgba(0,0,0,0.225)",
          }}
        >
          <div
            aria-hidden
            className="absolute -top-20 -right-10 w-[260px] h-[260px] rounded-full blur-2xl opacity-8"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.024), transparent 65%)",
            }}
          />
          <p
            className="relative text-[10px] tracking-[0.18em] uppercase font-bold mb-3"
            style={{ color: AMBER }}
          >
            Meine Empfehlung
          </p>
          <h3 className="relative font-display text-xl md:text-2xl font-black leading-tight mb-3">
            {recommendation.format}
          </h3>
          <p className="relative text-sm text-white/80 leading-[1.65] mb-5">
            {recommendation.why}
          </p>
          <a
            href={recommendation.link}
            target="_blank"
            rel="noopener"
            className="relative inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase font-bold pb-0.5 border-b transition-colors"
            style={{ color: AMBER, borderColor: "rgba(243,217,168,0.4)" }}
          >
            Mehr Infos zum Format
            <ArrowRight className="w-3 h-3" />
          </a>
        </aside>
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mb-10 max-w-5xl">
        {summary.map((s) => {
          const opt = s.options?.find((o) => o.value === s.answer);
          const display = opt ? opt.label : s.answer;
          return (
            <button
              key={s.i}
              type="button"
              onClick={() => onEditStep(s.i)}
              className="group text-left p-5 rounded-xl bg-[hsl(0,0%,98%)] hover:bg-white hover:shadow-md transition-all"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span
                  className="text-[10px] tracking-[0.18em] uppercase font-bold"
                  style={{ color: ACCENT }}
                >
                  {STEPS[s.i].number} · {s.label}
                </span>
                <span
                  className="text-[10px] tracking-[0.14em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: ACCENT }}
                >
                  Ändern →
                </span>
              </div>
              <p className="text-base text-foreground/80 leading-snug">
                {display}
              </p>
            </button>
          );
        })}
      </div>

      {/* Email-Form */}
      <div
        className="max-w-2xl p-7 md:p-9 rounded-2xl bg-[hsl(0,0%,98%)]"
        style={{ border: "1px solid rgba(0,0,0,0.06)" }}
      >
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">
          Letzter Schritt —{" "}
          <span style={{ color: ACCENT }}>
            wie erreiche ich dich?
          </span>
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Dein Name"
            value={name}
            onChange={(e) => onName(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
            style={{ ["--ac" as any]: ACCENT }}
          />
          <input
            type="email"
            placeholder="Deine Email (Pflicht für Antwort)"
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            required
            className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
            style={{ ["--ac" as any]: ACCENT }}
          />
          <input
            type="tel"
            placeholder="Telefon (optional, schnellere Antwort)"
            value={phone}
            onChange={(e) => onPhone(e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
            style={{ ["--ac" as any]: ACCENT }}
          />
        </div>
        <p
          className={`text-xs md:text-sm text-foreground/55 mt-4 flex items-center gap-2`}
        >
          <Sparkles className="w-3 h-3" style={{ color: ACCENT }} />
          Deine Antwort kommt innerhalb 24 Stunden — meistens schneller.
        </p>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────────────────────
   Submitted State
   ─────────────────────────────────────────────────────────── */
const SubmittedState = ({
  recommendation,
}: {
  recommendation: { format: string; why: string };
}) => {
  return (
    <div className="sp-step text-center py-12 md:py-20">
      <div
        className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full mb-7"
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
          boxShadow: "0 20px 50px -10px rgba(0,0,0,0.040)",
        }}
      >
        <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12 text-white" />
      </div>
      <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.5vw,2.875rem)] text-foreground mb-5">
        Geschafft.{" "}
        <span style={{ color: ACCENT }}>
          Ich bin dran.
        </span>
      </h2>
      <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-xl mx-auto mb-8">
        Deine Anfrage ist bei mir — Antwort innerhalb 24 Stunden mit konkretem
        Vorschlag für <strong>{recommendation.format}</strong>. Du wirst gleich
        zur Buchungs-Seite weitergeleitet.
      </p>

      {/* Konfetti */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[105]"
      >
        {[...Array(36)].map((_, i) => {
          const dx = (Math.random() - 0.5) * 600;
          const dy = Math.random() * 600 + 200;
          const colors = [ACCENT, AMBER, "#86d29a", "#1f5e3f"];
          const c = colors[i % colors.length];
          return (
            <span
              key={i}
              className="sp-confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: "30%",
                background: c,
                borderRadius: i % 2 === 0 ? "2px" : "50%",
                ["--dx" as any]: `${dx}px`,
                ["--dy" as any]: `${dy}px`,
                animationDelay: `${(i % 6) * 0.04}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShowPlanerModal;
