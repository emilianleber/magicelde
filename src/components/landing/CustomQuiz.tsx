import { useState, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/* ─── Shared Custom Quiz Component ─────────────────────────
 * Page-optimierter Quiz mit Step-by-step Feedback-Toasts,
 * Konfetti am Ende und Inline-Anfrage-Formular.
 *
 * Pro Page eigene `CustomQuizConfig` mit page-spezifischen
 * Fragen, Empfehlungen, Tonalität.
 * ────────────────────────────────────────────────────────── */

const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

export type CustomQuizOption = {
  value: string;
  label: string;
  sub: string;
};

export type CustomQuizQuestion = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  hint: string;
  feedback: string;
  options: CustomQuizOption[];
  /** 2, 3 oder 4 — bestimmt das Grid */
  cols: 2 | 3 | 4;
};

export type CustomQuizRecommendation = {
  format: string;
  sub: string;
  why: string;
  link: string;
};

export type CustomQuizConfig = {
  /** Anlass-Label (geht in URL-Params zum Buchungs-Formular) */
  anlass: string;
  /** Section-Header über dem Quiz */
  sectionEyebrow: string;
  sectionTitle: ReactNode;
  sectionDesc?: string;
  questions: CustomQuizQuestion[];
  /** Empfehlung aus Antworten ableiten */
  recommend: (answers: Record<string, string>) => CustomQuizRecommendation;
  /** Optional: Gästezahl aus Antworten ableiten (geht in Form-Params) */
  gaesteFromAnswers?: (answers: Record<string, string>) => number | null;
  /** Optional: Typ aus Antworten ableiten */
  typFromAnswers?: (answers: Record<string, string>) => string;
  /** Konfetti-Farben (default: CI v3) */
  confettiColors?: string[];
  /** Final-Emoji (default: 🎉) */
  finalEmoji?: string;
  /** Step-Emoji zwischendurch (default: ✨) */
  stepEmoji?: string;
  /** Falls auf dunkler Section verwendet */
  onDark?: boolean;
};

const DEFAULT_CONFETTI = [
  "#f3d9a8",
  "#c79042",
  "#9a2640",
  "#5c1622",
  "#1f5e3f",
  "#ffffff",
];

/* ═══════════════════════════════════════════════════════════
   ConfettiBurst — CSS-only Konfetti-Explosion
   ═══════════════════════════════════════════════════════════ */
const CONFETTI_COUNT = 36;

const ConfettiBurst = ({ colors }: { colors: string[] }) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible z-20">
    <style>{`
      @keyframes cqConfettiDrop {
        0% { transform: translate(0,0) rotate(0); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translate(var(--cx,0), var(--cy,500px)) rotate(720deg); opacity: 0; }
      }
      .cq-confetti-particle {
        position: absolute;
        top: 0%;
        left: 50%;
        will-change: transform, opacity;
        animation: cqConfettiDrop 2.2s cubic-bezier(0.2, 0.6, 0.3, 1) forwards;
      }
    `}</style>
    {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
      const angle = (Math.random() * 2 - 1) * Math.PI * 0.45;
      const dist = 250 + Math.random() * 450;
      const cx = Math.sin(angle) * dist;
      const cy = 220 + Math.random() * 480;
      const size = 6 + Math.random() * 8;
      const color = colors[i % colors.length];
      const delay = Math.random() * 0.25;
      const rounded = Math.random() > 0.5;
      return (
        <span
          key={i}
          className="cq-confetti-particle"
          style={{
            ["--cx" as never]: `${cx}px`,
            ["--cy" as never]: `${cy}px`,
            width: `${size}px`,
            height: `${size * (rounded ? 1 : 1.6)}px`,
            background: color,
            borderRadius: rounded ? "50%" : "2px",
            animationDelay: `${delay}s`,
          }}
        />
      );
    })}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   ResultWithForm — Empfehlung + Inline-Anfrage-Formular
   ═══════════════════════════════════════════════════════════ */
type ResultProps = {
  rec: CustomQuizRecommendation;
  answers: Record<string, string>;
  config: CustomQuizConfig;
  showConfetti: boolean;
  onReset: () => void;
};

const ResultWithForm = ({
  rec,
  answers,
  config,
  showConfetti,
  onReset,
}: ResultProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    datum: "",
    nachricht: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const confettiColors = config.confettiColors || DEFAULT_CONFETTI;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const params = new URLSearchParams({
      anlass: config.anlass,
      format: rec.format,
      ...(config.gaesteFromAnswers
        ? { gaeste: String(config.gaesteFromAnswers(answers) ?? "") }
        : {}),
      ...(config.typFromAnswers
        ? { typ: config.typFromAnswers(answers) }
        : {}),
      name: form.name,
      email: form.email,
      datum: form.datum,
      nachricht:
        form.nachricht ||
        `Empfehlung aus Format-Finder: ${rec.format} — ${rec.sub}`,
    });
    setTimeout(() => {
      window.location.href = `/buchung?${params.toString()}`;
    }, 700);
  }

  return (
    <div className="relative animate-fade-up">
      {showConfetti && <ConfettiBurst colors={confettiColors} />}

      <div className="mb-7 md:mb-8">
        <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-3">
          Eure Empfehlung.
        </p>
        <h3 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.6vw,2.75rem)] text-foreground mb-3">
          {rec.format}
        </h3>
        <p
          className={`text-base md:text-lg mb-5`}
          style={{ color: ACCENT }}
        >
          {rec.sub}
        </p>
        <p className="text-base text-foreground/70 leading-[1.65] max-w-2xl">
          {rec.why}
        </p>
        {rec.link && rec.link !== "/buchung" && (
          <a
            href={rec.link}
            className="inline-flex items-center gap-1.5 mt-5 text-[12px] tracking-[0.08em] uppercase font-semibold border-b-2 pb-0.5 transition-colors"
            style={{ color: ACCENT, borderColor: ACCENT }}
          >
            Mehr zu dieser Empfehlung
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {config.questions.map((qq) => {
          const opt = qq.options.find((o) => o.value === answers[qq.id]);
          if (!opt) return null;
          const tag = qq.eyebrow.split(" · ")[1] || qq.eyebrow;
          return (
            <span
              key={qq.id}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-foreground/[0.04] border border-foreground/10"
            >
              <span className="text-foreground/45">{tag}:</span>
              <span className="font-display font-bold text-foreground">
                {opt.label}
              </span>
            </span>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-foreground/[0.03] border border-foreground/10 p-5 md:p-7"
      >
        <div className="flex items-baseline justify-between mb-5">
          <p className={`text-lg text-foreground/70`}>
            Jetzt kurz anfragen.
          </p>
          <p className="text-[11px] tracking-[0.12em] uppercase text-foreground/45 font-semibold">
            Antwort innerhalb 24 h
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Dein Name"
            className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="deine@email.de"
            className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            type="date"
            value={form.datum}
            onChange={(e) => setForm({ ...form, datum: e.target.value })}
            className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors text-foreground/70"
          />
          <div className="rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm text-foreground/55 flex items-center">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: ACCENT }}
            >
              ★ {rec.format}
            </span>
          </div>
        </div>
        <textarea
          value={form.nachricht}
          onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
          placeholder="Optional: Anlass-Details, besondere Wünsche…"
          rows={2}
          className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <button
            type="submit"
            disabled={submitted}
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-70"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              boxShadow: "0 14px 30px -10px rgba(0,0,0,0.040)",
            }}
          >
            {submitted ? "Wird gesendet…" : "Anfrage senden"}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/55 hover:text-foreground transition-colors"
          >
            ← Andere Antworten
          </button>
        </div>

        <p className="mt-4 text-[11px] text-foreground/45">
          Kostenlos · unverbindlich · keine versteckten Kosten · DSGVO-konform
        </p>
      </form>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CustomQuiz — Hauptkomponente
   ═══════════════════════════════════════════════════════════ */
export const CustomQuiz = ({ config }: { config: CustomQuizConfig }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [done, setDone] = useState(false);

  const onDark = !!config.onDark;
  const confettiColors = config.confettiColors || DEFAULT_CONFETTI;
  const finalEmoji = config.finalEmoji || "🎉";
  const stepEmoji = config.stepEmoji || "✨";
  const q = config.questions[step];

  function handleSelect(value: string) {
    if (selected) return;
    setSelected(value);
    setFeedback(q.feedback);
    const isLast = step + 1 >= config.questions.length;
    if (isLast) setConfetti(true);

    setTimeout(() => {
      const newAnswers = { ...answers, [q.id]: value };
      setAnswers(newAnswers);
      if (isLast) {
        setDone(true);
      } else {
        setStep(step + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, 1100);
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setSelected(null);
    setFeedback(null);
    setConfetti(false);
    setDone(false);
  }

  if (done) {
    const rec = config.recommend(answers);
    return (
      <ResultWithForm
        rec={rec}
        answers={answers}
        config={config}
        showConfetti={confetti}
        onReset={reset}
      />
    );
  }

  const txt = onDark ? "text-white" : "text-foreground";
  const txtMute = onDark ? "text-white/60" : "text-foreground/55";
  const txtSub = onDark ? "text-white/70" : "text-foreground/60";
  const barBase = onDark ? "bg-white/10" : "bg-foreground/8";

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <p
          className={`text-[11px] md:text-xs tracking-[0.14em] uppercase font-semibold ${txtMute}`}
        >
          {q.eyebrow}
        </p>
        <p className={`text-sm ${txtMute}`}>
          {step + 1} / {config.questions.length}
        </p>
      </div>
      <div className="flex gap-1.5 mb-10 md:mb-14">
        {config.questions.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full overflow-hidden ${barBase}`}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width:
                  i < step ? "100%" : i === step ? (selected ? "100%" : "30%") : "0%",
                background:
                  i <= step
                    ? `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DEEP})`
                    : "transparent",
              }}
            />
          </div>
        ))}
      </div>

      <h3
        className={`font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2rem,4.5vw,3.5rem)] mb-4 ${txt}`}
      >
        {q.title}
      </h3>
      <p className={`text-sm md:text-base leading-[1.55] mb-10 max-w-xl ${txtSub}`}>
        {q.hint}
      </p>

      <div
        className={`grid gap-3 md:gap-4 ${
          q.cols === 4
            ? "grid-cols-1 sm:grid-cols-2"
            : q.cols === 3
            ? "grid-cols-1 sm:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {q.options.map((opt) => {
          const isSel = selected === opt.value;
          const dimmed = selected && !isSel;
          const cardBg = onDark
            ? isSel
              ? "rgba(255,255,255,0.18)"
              : "rgba(255,255,255,0.06)"
            : isSel
            ? "white"
            : "rgba(255,255,255,0.7)";
          const cardBorder = isSel
            ? ACCENT
            : onDark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.08)";
          const cardShadow = isSel
            ? onDark
              ? `0 30px 60px -20px rgba(0,0,0,0.040), inset 0 0 0 1px ${ACCENT}`
              : `0 25px 50px -20px rgba(0,0,0,0.040), inset 0 0 0 1px ${ACCENT}`
            : onDark
            ? "0 20px 40px -20px rgba(0,0,0,0.5)"
            : "0 8px 20px -10px rgba(0,0,0,0.08)";
          return (
            <button
              key={opt.value}
              type="button"
              disabled={!!selected}
              onClick={() => handleSelect(opt.value)}
              className={`group relative text-left rounded-2xl px-5 py-5 md:px-6 md:py-6 transition-all duration-500 overflow-hidden ${
                isSel
                  ? "scale-[1.02]"
                  : dimmed
                  ? "opacity-40"
                  : `hover:-translate-y-1 ${
                      onDark
                        ? "hover:bg-white/10 hover:border-white/30"
                        : "hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.18)]"
                    }`
              }`}
              style={{
                background: cardBg,
                border: `2px solid ${cardBorder}`,
                boxShadow: cardShadow,
                backdropFilter: onDark ? "blur(24px) saturate(160%)" : undefined,
                WebkitBackdropFilter: onDark ? "blur(24px) saturate(160%)" : undefined,
              }}
            >
              <div>
                <p
                  className={`font-display font-bold text-sm md:text-base leading-tight mb-1.5 pr-7 ${
                    onDark ? "text-white" : "text-foreground"
                  }`}
                >
                  {opt.label}
                </p>
                <p
                  className={`text-xs md:text-sm leading-snug ${
                    onDark ? "text-white/65" : "text-foreground/55"
                  }`}
                >
                  {opt.sub}
                </p>
              </div>
              {isSel && (
                <span
                  aria-hidden
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold animate-fade-up"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-14 md:-bottom-16 z-10">
          <div
            className="rounded-full px-5 py-2.5 text-sm font-display font-bold text-white shadow-2xl animate-fade-up flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.040)",
            }}
          >
            <span>{feedback}</span>
            <span className="text-base">
              {step + 1 === config.questions.length ? finalEmoji : stepEmoji}
            </span>
          </div>
        </div>
      )}

      {confetti && <ConfettiBurst colors={confettiColors} />}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CustomQuizSection — Section-Wrapper mit Header
   ═══════════════════════════════════════════════════════════ */
export const CustomQuizSection = ({ config }: { config: CustomQuizConfig }) => (
  <section id="empfehlung" className="bg-white py-20 md:py-28">
    <div className="container px-6">
      <div className="max-w-5xl mx-auto mb-12 md:mb-16">
        <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5 md:mb-6">
          {config.sectionEyebrow}
        </p>
        <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
          {config.sectionTitle}
        </h2>
        {config.sectionDesc && (
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.55] text-foreground/65 font-light">
            {config.sectionDesc}
          </p>
        )}
      </div>
      <div className="relative max-w-5xl mx-auto">
        <CustomQuiz config={config} />
      </div>
    </div>
  </section>
);
