import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  X,
  RotateCcw,
} from "lucide-react";

const GRADIENT =
  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)";
const GRADIENT_LIGHT =
  "linear-gradient(100deg, hsl(220 95% 78%) 0%, hsl(255 85% 78%) 50%, hsl(285 90% 78%) 100%)";

export type QuizOption = {
  value: string;
  label: string;
  sub?: string;
  icon?: any;
};

export type QuizQuestion = {
  id: string;
  /** Short label for the answer summary */
  shortLabel?: string;
  title: ReactNode;
  hint?: string;
  options: QuizOption[];
  cols?: { md?: number; lg?: number };
};

export type QuizEmpfehlung = {
  format: string;
  sub: string;
  why: string;
  link: string;
};

export type QuizConfig = {
  anlass: string;
  /** Section heading on the page */
  sectionEyebrow: string;
  sectionTitle: ReactNode;
  sectionDesc: string;
  /** Trigger card (only used by modal-mode) */
  triggerEyebrow?: string;
  triggerTitle?: string;
  triggerDesc?: string;
  triggerCtaLabel?: string;
  questions: QuizQuestion[];
  buildEmpfehlung: (answers: Record<string, string>) => QuizEmpfehlung;
  gaesteFromAnswers?: (answers: Record<string, string>) => number | null;
  /** Compact: smaller fonts, fewer questions intent (for format pages) */
  compact?: boolean;
};

/* ─── Section heading shared by both modes ─── */
const SectionHead = ({ config }: { config: QuizConfig }) => {
  const compact = !!config.compact;
  return (
    <div className={compact ? "max-w-2xl mb-8" : "max-w-3xl mb-10"}>
      <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5 md:mb-6">
        {config.sectionEyebrow}
      </p>
      <h2
        className={`font-display font-black tracking-[-0.01em] leading-[1.05] text-foreground ${
          compact
            ? "text-[clamp(1.6rem,3.6vw,3rem)]"
            : "text-[clamp(2rem,4.8vw,4.5rem)]"
        }`}
      >
        {config.sectionTitle}
      </h2>
      <p
        className={`mt-5 max-w-2xl leading-[1.55] text-foreground/65 font-light ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        {config.sectionDesc}
      </p>
    </div>
  );
};

/* ─── Inline mode: Wizard directly on the page, full-bleed full-screen ─── */
export const QuizWizardInline = ({ config }: { config: QuizConfig }) => {
  if (config.compact) {
    /* Compact variant for format pages: stays inside container */
    return (
      <section id="empfehlung" className="bg-white border-y border-foreground/8 py-16 md:py-20">
        <div className="container px-6">
          <SectionHead config={config} />
          <div className="max-w-2xl">
            <div
              className="bg-white"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "1.25rem",
                boxShadow: "0 30px 70px -25px rgba(40, 20, 60, 0.2)",
              }}
            >
              <WizardBody config={config} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* Full-bleed page-like variant for primary anlass pages.
     No card chrome — Wizard reads as the page itself. */
  return (
    <section
      id="empfehlung"
      className="relative bg-white border-y border-foreground/8 min-h-screen"
    >
      <div className="px-6 md:px-10 lg:px-16 pt-16 md:pt-20 pb-10">
        <div className="max-w-6xl mx-auto">
          <SectionHead config={config} />
        </div>
      </div>
      <div className="pb-32 md:pb-40">
        <WizardBody config={config} fullBleed pageMode />
      </div>
    </section>
  );
};

/* ─── Modal mode: Trigger card + fullscreen modal ─── */
export const QuizWizardModal = ({ config }: { config: QuizConfig }) => {
  const [open, setOpen] = useState(false);
  const compact = !!config.compact;
  return (
    <section
      id="empfehlung"
      className={`bg-white border-y border-foreground/8 ${
        compact ? "py-16 md:py-20" : "section-large"
      }`}
    >
      <div className="container px-6">
        <SectionHead config={config} />
        <div className={compact ? "max-w-2xl" : "max-w-4xl"}>
          <button
            onClick={() => setOpen(true)}
            className={`group w-full text-left transition-all hover:scale-[1.005] ${
              compact ? "p-5 md:p-7" : "p-7 md:p-10"
            }`}
            style={{
              background:
                "linear-gradient(135deg, hsl(220 50% 16%) 0%, hsl(255 45% 22%) 50%, hsl(285 50% 22%) 100%)",
              borderRadius: "1rem",
              boxShadow: "0 30px 70px -25px rgba(60, 30, 80, 0.5)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              <div className="flex-1">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3"
                  style={{
                    background: GRADIENT_LIGHT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {config.triggerEyebrow || "Event-Berater"}
                </p>
                <h3
                  className={`font-display font-black text-white leading-[1.15] mb-3 ${
                    compact ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"
                  }`}
                >
                  {config.triggerTitle || "Welches Format passt zu eurer Feier?"}
                </h3>
                <p
                  className={`text-white/70 leading-[1.55] max-w-xl ${
                    compact ? "text-sm md:text-base" : "text-base md:text-[17px]"
                  }`}
                >
                  {config.triggerDesc ||
                    "Ein paar Fragen, eine konkrete Empfehlung. Eure Antworten gehen automatisch mit der Anfrage mit."}
                </p>
              </div>
              <div
                className={`shrink-0 inline-flex items-center gap-2 rounded-full text-[15px] font-semibold text-[#0f0a19] bg-white group-hover:bg-white transition-all ${
                  compact ? "px-5 py-3" : "px-7 py-4"
                }`}
              >
                {config.triggerCtaLabel || "Berater starten"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {open && (
        <ModalShell onClose={() => setOpen(false)}>
          <WizardBody config={config} onClose={() => setOpen(false)} fullBleed pageMode />
        </ModalShell>
      )}
    </section>
  );
};

/* ─── Modal shell: fullscreen page-like, X to close, locks body scroll ─── */
const ModalShell = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-foreground/8">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center gap-4">
          <p className="font-display font-bold text-foreground text-sm md:text-base">
            Format-Finder
          </p>
          <button
            onClick={onClose}
            className="ml-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground/[0.05] hover:bg-foreground/10 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </header>
      <div className="pb-32 md:pb-40">{children}</div>
    </div>
  );
};

/* ─── Wizard body: progress + question + recommendation + form ─── */
const WizardBody = ({
  config,
  onClose,
  fullBleed = false,
  pageMode = false,
}: {
  config: QuizConfig;
  onClose?: () => void;
  fullBleed?: boolean;
  pageMode?: boolean;
}) => {
  const total = config.questions.length;
  const RECOMMENDATION_STEP = total + 1;
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [firma, setFirma] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [datum, setDatum] = useState("");
  const [ort, setOrt] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setStep(1);
    setAnswers({});
    setFirma("");
    setName("");
    setEmail("");
    setPhone("");
    setDatum("");
    setOrt("");
    setSuccess(false);
    setErrorMsg("");
  };

  const allAnswered = config.questions.every((q) => answers[q.id]);
  const empfehlung = allAnswered ? config.buildEmpfehlung(answers) : null;

  const choose = (qid: string, value: string) => {
    setAnswers((a) => ({ ...a, [qid]: value }));
    if (step < RECOMMENDATION_STEP) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!empfehlung) return;
    setSending(true);
    setErrorMsg("");

    const summary = config.questions
      .map((q) => {
        const opt = q.options.find((o) => o.value === answers[q.id]);
        return `${q.shortLabel || q.id}: ${opt?.label || answers[q.id]}`;
      })
      .join("\n");

    const nachricht = [
      `Anfrage über Event-Berater (${config.anlass})`,
      `Empfehlung: ${empfehlung.format} (${empfehlung.sub})`,
      "",
      summary,
    ].join("\n");

    const gaeste = config.gaesteFromAnswers ? config.gaesteFromAnswers(answers) : null;

    const payload = {
      anrede: null,
      vorname: name.trim().split(" ")[0] || name.trim(),
      nachname: name.trim().split(" ").slice(1).join(" ") || "",
      name: name.trim(),
      firma: firma.trim() || null,
      email: email.trim(),
      phone: phone.trim(),
      anlass: config.anlass,
      datum: datum.trim(),
      ort: ort.trim(),
      gaeste,
      format: empfehlung.format,
      nachricht,
    };

    try {
      const publishableKey = (import.meta as any).env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/create-portal-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Fehler ${res.status}`);
      }
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "Beim Absenden ist ein Fehler aufgetreten.");
    } finally {
      setSending(false);
    }
  };

  const cardOptionCls = (selected: boolean) =>
    `text-left p-5 md:p-6 transition-all border-2 rounded-xl ${
      selected
        ? "border-transparent text-white"
        : "border-foreground/10 hover:border-foreground/30 bg-white text-foreground"
    }`;

  const cardOptionStyle = (selected: boolean) =>
    selected
      ? { background: GRADIENT, boxShadow: "0 12px 30px hsl(255 75% 55% / 0.3)" }
      : {};

  const currentQuestion = step <= total ? config.questions[step - 1] : null;
  const stepLabel =
    step <= total ? `Schritt ${step} von ${total}` : "Empfehlung";

  const colsClass = (q: QuizQuestion) => {
    const md = q.cols?.md ?? 3;
    const lg = q.cols?.lg;
    const parts: string[] = ["grid-cols-1", "sm:grid-cols-2"];
    parts.push(`md:grid-cols-${md}`);
    if (lg) parts.push(`lg:grid-cols-${lg}`);
    return parts.join(" ");
  };

  return (
    <>
      {/* Progress */}
      <div className={`${pageMode ? "px-6 md:px-10 lg:px-16 max-w-6xl mx-auto" : fullBleed ? "px-8 md:px-14 lg:px-20" : "px-6 md:px-9"} pt-5 md:pt-6 pb-2 ${pageMode ? "" : "border-b border-foreground/8"}`}>
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[11px] uppercase tracking-wider text-foreground/45 font-semibold">
            {stepLabel}
          </p>
          {step > 1 && step <= RECOMMENDATION_STEP && !success && (
            <button
              onClick={reset}
              className="ml-auto inline-flex items-center gap-1 text-[11px] text-foreground/45 hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Neu starten
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: total + 1 }, (_, idx) => idx + 1).map((i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all"
              style={{
                background:
                  i <= step
                    ? "linear-gradient(90deg, hsl(220 85% 55%), hsl(255 75% 55%), hsl(285 85% 55%))"
                    : "rgba(0,0,0,0.08)",
                opacity: i <= step ? 1 : 0.6,
              }}
            />
          ))}
        </div>
      </div>

      <div className={pageMode ? "px-6 md:px-10 lg:px-16 py-12 md:py-16 max-w-6xl mx-auto" : fullBleed ? "px-8 md:px-14 lg:px-20 py-12 md:py-16 flex-1" : "px-6 md:px-9 lg:px-12 py-7 md:py-10"}>
        {currentQuestion && (
          <div className="animate-fade-up">
            <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-foreground/45 mb-5 font-semibold">
              Frage {step} von {total}
            </p>
            <h3 className={`font-display font-black text-foreground leading-[1.02] mb-5 ${
              fullBleed
                ? "text-[clamp(2rem,4.5vw,4.5rem)]"
                : "text-2xl md:text-4xl"
            }`}>
              {currentQuestion.title}
            </h3>
            {currentQuestion.hint && (
              <p className={`text-foreground/60 mb-9 max-w-3xl ${
                fullBleed ? "text-lg md:text-xl" : "text-base md:text-lg"
              }`}>
                {currentQuestion.hint}
              </p>
            )}
            <div className={`grid gap-3 ${colsClass(currentQuestion)}`}>
              {currentQuestion.options.map((o) => {
                const selected = answers[currentQuestion.id] === o.value;
                const Icon = o.icon;
                return (
                  <button
                    key={o.value}
                    onClick={() => choose(currentQuestion.id, o.value)}
                    className={cardOptionCls(selected)}
                    style={cardOptionStyle(selected)}
                  >
                    <div className={Icon ? "flex items-start gap-3" : ""}>
                      {Icon && (
                        <span
                          className={`shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg ${
                            selected ? "bg-white/15" : "bg-foreground/[0.05]"
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              selected ? "text-white" : "text-foreground/55"
                            }`}
                          />
                        </span>
                      )}
                      <div>
                        <p className="font-display text-base md:text-lg font-bold leading-tight mb-1">
                          {o.label}
                        </p>
                        {o.sub && (
                          <p
                            className={`text-[12px] leading-snug ${
                              selected ? "text-white/75" : "text-foreground/55"
                            }`}
                          >
                            {o.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === RECOMMENDATION_STEP && empfehlung && !success && (
          <div className="animate-fade-up">
            <p
              className="text-[11px] md:text-xs tracking-[0.2em] uppercase mb-4 font-semibold"
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Eure Empfehlung
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-black text-foreground mb-3 leading-[1.05]">
              {empfehlung.format}
            </h3>
            <p className="text-sm md:text-base text-foreground/55 mb-6">
              {empfehlung.sub}
            </p>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.65] mb-8 max-w-2xl">
              {empfehlung.why}
            </p>

            <div className="rounded-2xl p-5 md:p-6 mb-8 bg-foreground/[0.03] border border-foreground/8">
              <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/45 mb-3 font-semibold">
                Eure Antworten
              </p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {config.questions.map((q) => {
                  const opt = q.options.find((o) => o.value === answers[q.id]);
                  return (
                    <div
                      key={q.id}
                      className="flex justify-between gap-3 py-1 border-b border-foreground/5 last:border-0"
                    >
                      <dt className="text-foreground/55">{q.shortLabel || q.id}</dt>
                      <dd className="text-foreground font-medium text-right">
                        {opt?.label || answers[q.id]}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="border-t border-foreground/10 pt-7">
              <p className="font-display text-xl md:text-2xl font-black text-foreground mb-1">
                Falls du direkt buchen möchtest
              </p>
              <p className="text-sm md:text-base text-foreground/55 mb-6">
                Deine Antworten gehen automatisch mit — du musst nichts wiederholen. Kein Sales-Call, ich melde mich einfach mit einem konkreten Vorschlag.
              </p>

              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Firma (optional)"
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  className="bg-white border border-foreground/15 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border border-foreground/15 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <input
                  type="email"
                  placeholder="E-Mail *"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-foreground/15 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Telefon *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white border border-foreground/15 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Ort / Location (optional)"
                  value={ort}
                  onChange={(e) => setOrt(e.target.value)}
                  className="bg-white border border-foreground/15 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                <input
                  type="date"
                  value={datum}
                  onChange={(e) => setDatum(e.target.value)}
                  className="bg-white border border-foreground/15 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
                />
                {errorMsg && (
                  <p className="text-sm text-red-600 sm:col-span-2">{errorMsg}</p>
                )}
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-2 items-start sm:items-center">
                  <button
                    type="submit"
                    disabled={sending}
                    className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: GRADIENT,
                      boxShadow: "0 10px 30px hsl(255 75% 55% / 0.3)",
                    }}
                  >
                    {sending ? (
                      "Wird gesendet…"
                    ) : (
                      <>
                        Absenden
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <Link
                    to={empfehlung.link}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 font-display font-semibold text-foreground/70 hover:text-foreground border-b-2 border-foreground/20 hover:border-foreground/60 pb-1 transition-colors self-start sm:self-center"
                  >
                    Erst mehr zum Format
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-xs text-foreground/50 sm:col-span-2">
                  Kostenlos · unverbindlich · Antwort innerhalb 24h · DSGVO-konform
                </p>
              </form>
            </div>
          </div>
        )}

        {step === RECOMMENDATION_STEP && success && empfehlung && (
          <div className="animate-fade-up text-center py-6 max-w-xl mx-auto">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ background: GRADIENT }}
            >
              <Check className="w-9 h-9 text-white" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-black text-foreground mb-4 leading-[1.1]">
              Danke — eure Anfrage ist da.
            </h3>
            <p className="text-base md:text-lg text-foreground/65 mb-7 leading-[1.6]">
              Ihr bekommt gleich eine Bestätigungs-E-Mail. Ich melde mich innerhalb
              24h persönlich mit einem konkreten Vorschlag für eure Empfehlung „
              {empfehlung.format}".
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {onClose && (
                <button
                  onClick={onClose}
                  className="rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.01]"
                  style={{ background: GRADIENT }}
                >
                  Schließen
                </button>
              )}
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-1 text-sm text-foreground/55 hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Berater neu starten
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Back / Next */}
      <footer className={`${pageMode ? "fixed bottom-0 left-0 right-0 px-6 md:px-10 lg:px-16 z-20 bg-white/95 backdrop-blur-sm" : fullBleed ? "px-8 md:px-14 lg:px-20" : "px-6 md:px-9"} py-4 border-t border-foreground/8 flex items-center gap-3 ${pageMode ? "" : "bg-white"}`}>
        <div className={pageMode ? "max-w-6xl mx-auto w-full flex items-center gap-3" : "contents"}>
        {step > 1 && step <= RECOMMENDATION_STEP && !success && (
          <button
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
        )}
        {step < RECOMMENDATION_STEP &&
          currentQuestion &&
          answers[currentQuestion.id] && (
            <button
              onClick={() => setStep(step + 1)}
              className="ml-auto inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{ background: GRADIENT }}
            >
              Weiter
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>
    </>
  );
};
