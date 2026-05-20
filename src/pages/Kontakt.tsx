import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import {
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Star,
  Trophy,
  Award,
  Medal,
  Tv,
  Sparkles,
  CheckCircle2,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Wand2,
  Calendar,
  Users,
  Clock,
  Send,
} from "lucide-react";

/* ════════════════════════════════════════════════════════
   DESIGN-TOKENS
   ════════════════════════════════════════════════════════ */
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const CREAM = "#fafafa";

/* ════════════════════════════════════════════════════════
   KEYFRAMES
   ════════════════════════════════════════════════════════ */
const PageKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    @keyframes successPop { 0% { opacity: 0; transform: scale(0.85) translateY(20px); } 60% { opacity: 1; transform: scale(1.04) translateY(0); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .success-pop { animation: successPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
  `}</style>
);

/* ════════════════════════════════════════════════════════
   1 · HERO — kleiner, cream, italic-serif
   ════════════════════════════════════════════════════════ */
const HEADLINE_SANS = ["Schreibe"];
const HEADLINE_ITALIC = ["mir."];

const BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

const Hero = () => (
  <section
    className="relative overflow-hidden"
    style={{
      background: `linear-gradient(180deg, ${CREAM} 0%, #fafafa 55%, #ffffff 100%)`,
    }}
  >
    {/* Amber-Glow oben rechts */}
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        right: "-10%",
        top: "-20%",
        width: "60%",
        height: "70%",
        background:
          "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
        filter: "blur(20px)",
      }}
    />
    {/* Burgunder-Glow unten links */}
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: "-10%",
        bottom: "-20%",
        width: "55%",
        height: "60%",
        background:
          "radial-gradient(closest-side, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
        filter: "blur(20px)",
      }}
    />
    {/* Bokeh */}
    {BOKEH.map((b, i) => (
      <span
        key={i}
        aria-hidden
        className="hero-bokeh absolute rounded-full pointer-events-none"
        style={{
          width: b.size,
          height: b.size,
          left: b.left,
          top: b.top,
          background:
            "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
          animationDuration: `${b.dur}s`,
          animationDelay: `${b.delay}s`,
          opacity: b.o,
        }}
      />
    ))}

    <div className="container relative z-10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-5xl mx-auto">
        {/* Stars + Rating */}
        <div
          className="hero-fade flex items-center gap-3 mb-7"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="hero-star w-4 h-4"
                style={{
                  color: "#c79042",
                  fill: "#c79042",
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
          <span
            className="text-[11px] tracking-[0.18em] uppercase font-semibold"
            style={{ color: ACCENT_DEEP }}
          >
            5,0 · 30+ Bewertungen · 200+ Events
          </span>
        </div>

        {/* Eyebrow */}
        <p
          className={`${SERIF_ITALIC} hero-fade text-lg md:text-xl text-foreground/55 mb-6`}
          style={{ animationDelay: "0.15s" }}
        >
          Direkt-Kontakt.
        </p>

        {/* Headline */}
        <h1
          className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,8.5rem)] text-foreground mb-10"
          aria-label="Schreibe mir."
        >
          {HEADLINE_SANS.map((w, i) => (
            <span
              key={i}
              className="hero-word"
              style={{
                animationDelay: `${0.25 + i * 0.08}s`,
                marginRight: "0.22em",
              }}
            >
              {w}
            </span>
          ))}
          <br />
          {HEADLINE_ITALIC.map((w, i) => (
            <span
              key={i}
              className={`hero-word ${SERIF_ITALIC}`}
              style={{
                animationDelay: `${0.4 + i * 0.08}s`,
                color: ACCENT,
                paddingRight: "0.18em",
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        {/* Body */}
        <p
          className="hero-fade text-base md:text-xl text-foreground/70 leading-[1.65] max-w-2xl mb-10"
          style={{ animationDelay: "0.55s" }}
        >
          Eine kurze Nachricht reicht. Datum, Anlass, Ort — und ich melde
          mich persönlich. Antwortzeit unter 24 Stunden, sieben Tage die
          Woche. Bayern primär, deutschlandweit unterwegs.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade flex flex-wrap items-center gap-4 mb-12"
          style={{ animationDelay: "0.7s" }}
        >
          <a
            href="#kontaktformular"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-white text-[12px] tracking-[0.1em] uppercase font-semibold transition-transform hover:scale-[1.035] active:scale-[0.97]"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              boxShadow:
                "0 18px 40px -10px rgba(0,0,0,0.040), 0 8px 16px -6px rgba(0,0,0,0.040)",
            }}
          >
            Formular ausfüllen
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:el@magicel.de"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold text-foreground/75 hover:text-foreground transition-colors"
          >
            el@magicel.de
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Inline-Stats */}
        <div
          className="hero-fade flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] tracking-[0.1em] uppercase font-semibold text-foreground/60"
          style={{ animationDelay: "0.85s" }}
        >
          <span className="inline-flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" style={{ color: ACCENT }} />
            <span className="tabular-nums">24 h</span> Antwort
          </span>
          <span className="text-foreground/25">·</span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" style={{ color: ACCENT }} />
            Bayern primär, deutschlandweit
          </span>
          <span className="text-foreground/25">·</span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT }} />
            Persönliche Antwort
          </span>
        </div>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   3 · DREI KONTAKTWEGE — Editorial Cards (Email · Telefon · WhatsApp)
   ════════════════════════════════════════════════════════ */
const KONTAKTWEGE = [
  {
    icon: Mail,
    eyebrow: "Erster Weg.",
    name: "Email schreiben.",
    value: "el@magicel.de",
    href: "mailto:el@magicel.de",
    body: "Wenn du ausführlich beschreiben magst. Ich antworte typischerweise binnen Stunden, spätestens am Folgetag.",
    cta: "Mail öffnen",
    primary: true,
  },
  {
    icon: Phone,
    eyebrow: "Zweiter Weg.",
    name: "Anrufen.",
    value: "+49 155 63744696",
    href: "tel:+4915563744696",
    body: "Wenn du kurz besprechen magst. Werktags bin ich meist erreichbar, sonst Sprachnachricht — Rückruf garantiert.",
    cta: "Jetzt anrufen",
    primary: false,
  },
  {
    icon: MessageCircle,
    eyebrow: "Dritter Weg.",
    name: "WhatsApp.",
    value: "+49 155 63744696",
    href: "https://wa.me/4915563744696",
    body: "Wenn es schnell gehen soll. Voicenote, Foto vom Saal, Kurzfrage — alles geht. Sprachnachrichten höre ich gerne.",
    cta: "WhatsApp öffnen",
    primary: false,
  },
];

const DreiKontaktwege = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-24 md:py-36 relative"
      style={{ background: "#fcfaf6" }}
    >
      <div className="container px-6">
        {/* Header */}
        <div
          className={`grid md:grid-cols-12 gap-10 mb-16 md:mb-20 max-w-6xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5"
            >
              Drei Wege. Einer reicht.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
              Such dir aus,
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                wie du magst.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-10">
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-md">
              Manche schreiben gerne, manche reden lieber. Ein Weg landet bei
              mir — alle drei führen zur selben Person. Versprochen.
            </p>
          </div>
        </div>

        {/* Drei Cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-7 max-w-6xl mx-auto">
          {KONTAKTWEGE.map((w, i) => {
            const Icon = w.icon;
            return (
              <a
                key={w.name}
                href={w.href}
                target={w.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  w.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className={`group block relative rounded-3xl p-8 md:p-10 h-[340px] md:h-[400px] overflow-hidden transition-transform duration-500 hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${0.15 + i * 0.1}s`,
                  background: w.primary
                    ? `linear-gradient(155deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`
                    : "linear-gradient(155deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)",
                  border: w.primary
                    ? "1px solid rgba(255,255,255,0.25)"
                    : "1px solid rgba(0,0,0,0.040)",
                  backdropFilter: w.primary ? undefined : "blur(20px)",
                  boxShadow: w.primary
                    ? "0 30px 60px -20px rgba(0,0,0,0.040)"
                    : "0 25px 50px -20px rgba(0,0,0,0.090)",
                }}
              >
                {/* Glass-Glare oben links */}
                {!w.primary && (
                  <div
                    aria-hidden
                    className="absolute pointer-events-none"
                    style={{
                      top: 0,
                      left: 0,
                      width: "60%",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0))",
                    }}
                  />
                )}

                <div className="flex flex-col h-full">
                  {/* Icon top */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-7"
                    style={{
                      background: w.primary
                        ? "rgba(255,255,255,0.18)"
                        : `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                      border: w.primary
                        ? "1px solid rgba(255,255,255,0.3)"
                        : "none",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: w.primary ? "#fff" : "#fff" }}
                    />
                  </div>

                  {/* Eyebrow */}
                  <p
                    className={`text-base mb-3 ${
                      w.primary ? "text-white/70" : "text-foreground/50"
                    }`}
                  >
                    {w.eyebrow}
                  </p>

                  {/* Name */}
                  <h3
                    className={`${SERIF_ITALIC} font-display text-2xl md:text-3xl font-bold leading-tight mb-3 ${
                      w.primary ? "text-white" : "text-foreground"
                    }`}
                  >
                    {w.name}
                  </h3>

                  {/* Body */}
                  <p
                    className={`text-sm md:text-base leading-[1.65] mb-5 ${
                      w.primary ? "text-white/80" : "text-foreground/65"
                    }`}
                  >
                    {w.body}
                  </p>

                  {/* Bottom: Value + CTA */}
                  <div className="mt-auto">
                    <p
                      className={`font-display text-base font-bold tracking-tight mb-2 tabular-nums ${
                        w.primary ? "text-white" : "text-foreground"
                      }`}
                    >
                      {w.value}
                    </p>
                    <p
                      className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase font-bold ${
                        w.primary
                          ? "text-white"
                          : ""
                      }`}
                      style={!w.primary ? { color: ACCENT } : undefined}
                    >
                      {w.cta}
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   4 · KONTAKTFORMULAR — Editorial Inline-Form
   ════════════════════════════════════════════════════════ */

type FormState = {
  name: string;
  email: string;
  telefon: string;
  anlass: string;
  datum: string;
  gaeste: string;
  ort: string;
  nachricht: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  telefon: "",
  anlass: "",
  datum: "",
  gaeste: "",
  ort: "",
  nachricht: "",
};

const ANLASS_OPTIONEN = [
  { value: "hochzeit", label: "Hochzeit" },
  { value: "firmenfeier", label: "Firmenfeier" },
  { value: "geburtstag", label: "Geburtstag / privat" },
  { value: "magic-dinner", label: "Magic Dinner" },
  { value: "messe", label: "Messe / Aussteller" },
  { value: "moderation", label: "Moderation" },
  { value: "andere", label: "Etwas anderes" },
];

const KontaktformularSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Email-Capture während User tippt
  useEffect(() => {
    if (form.email && form.email.includes("@")) {
      captureEmail(form.email, "kontakt-page", {
        name: form.name,
        anlass: form.anlass,
        datum: form.datum,
      });
    }
  }, [form.email, form.name, form.anlass, form.datum]);

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.nachricht) return;
    setSubmitting(true);
    // Echte Anfrage geht über /buchung — wir leiten weiter mit Prefill
    markEmailSubmitted();
    const params = new URLSearchParams({
      name: form.name,
      email: form.email,
      telefon: form.telefon,
      anlass: form.anlass,
      datum: form.datum,
      gaeste: form.gaeste,
      ort: form.ort,
      nachricht: form.nachricht,
      source: "kontakt-page",
    });
    // Kurzer Success-State, dann Redirect
    setTimeout(() => {
      setSubmitted(true);
      window.setTimeout(() => {
        window.location.href = `/buchung?${params.toString()}`;
      }, 1800);
    }, 350);
  };

  return (
    <section
      id="kontaktformular"
      ref={ref}
      className="py-24 md:py-36 relative bg-white"
    >
      <div className="container px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-16">
          {/* LEFT — Headline + Story */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-28 lg:self-start ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Das Formular.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2rem,5vw,4.5rem)] text-foreground mb-8">
              Erzähl mir
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                vom Abend.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8 max-w-md">
              Je mehr ich weiß, desto besser passt das Angebot. Pflicht
              sind nur drei Felder. Den Rest kann ich auch im Telefonat
              klären — du entscheidest.
            </p>

            {/* Sub-Trust */}
            <div className="space-y-4">
              {[
                {
                  icon: Clock,
                  label: "Antwort in unter 24 Stunden",
                  sub: "meist binnen Stunden",
                },
                {
                  icon: CheckCircle2,
                  label: "Kostenlos & unverbindlich",
                  sub: "kein Verkaufsdruck",
                },
                {
                  icon: Sparkles,
                  label: "Persönliche Mail von mir",
                  sub: "kein Bot, kein Verteiler",
                },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.label} className="flex items-start gap-3">
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT_SOFT}, rgba(228,184,192,0.4))`,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: ACCENT_DEEP }} />
                    </span>
                    <div>
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {t.label}
                      </p>
                      <p className="text-xs text-foreground/55">{t.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div
            className={`lg:col-span-7 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-8 md:p-12"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.85) 0%, rgba(245,236,220,0.5) 100%)",
                  border: "1px solid rgba(0,0,0,0.040)",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.075)",
                }}
              >
                {/* Eyebrow */}
                <p
                  className={`text-base text-foreground/55 mb-2`}
                >
                  Deine Anfrage.
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-8">
                  Felder ausfüllen.
                </h3>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="kontakt-name"
                      className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      id="kontakt-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Vor- und Nachname"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground placeholder:text-foreground/35"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kontakt-email"
                      className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="kontakt-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="dein@email.de"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground placeholder:text-foreground/35"
                    />
                  </div>
                </div>

                {/* Telefon + Anlass */}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="kontakt-telefon"
                      className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                    >
                      Telefon
                    </label>
                    <input
                      id="kontakt-telefon"
                      type="tel"
                      value={form.telefon}
                      onChange={(e) => update("telefon", e.target.value)}
                      placeholder="optional"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground placeholder:text-foreground/35"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kontakt-anlass"
                      className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                    >
                      Anlass
                    </label>
                    <select
                      id="kontakt-anlass"
                      value={form.anlass}
                      onChange={(e) => update("anlass", e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground"
                    >
                      <option value="">Bitte wählen</option>
                      {ANLASS_OPTIONEN.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Datum + Gäste */}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label
                      htmlFor="kontakt-datum"
                      className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                    >
                      Datum
                    </label>
                    <input
                      id="kontakt-datum"
                      type="date"
                      value={form.datum}
                      onChange={(e) => update("datum", e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kontakt-gaeste"
                      className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                    >
                      Gästezahl
                    </label>
                    <input
                      id="kontakt-gaeste"
                      type="text"
                      value={form.gaeste}
                      onChange={(e) => update("gaeste", e.target.value)}
                      placeholder="z.B. 80 Gäste"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground placeholder:text-foreground/35"
                    />
                  </div>
                </div>

                {/* Ort */}
                <div className="mb-5">
                  <label
                    htmlFor="kontakt-ort"
                    className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                  >
                    Ort / Location
                  </label>
                  <input
                    id="kontakt-ort"
                    type="text"
                    value={form.ort}
                    onChange={(e) => update("ort", e.target.value)}
                    placeholder="Stadt oder Locationname"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground placeholder:text-foreground/35"
                  />
                </div>

                {/* Nachricht */}
                <div className="mb-7">
                  <label
                    htmlFor="kontakt-nachricht"
                    className="block text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/55 mb-2"
                  >
                    Nachricht *
                  </label>
                  <textarea
                    id="kontakt-nachricht"
                    required
                    rows={5}
                    value={form.nachricht}
                    onChange={(e) => update("nachricht", e.target.value)}
                    placeholder="Erzähl mir kurz vom Abend — Format, Stimmung, was dir wichtig ist."
                    className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-foreground/15 focus:border-[#9a2640] focus:outline-none focus:ring-2 focus:ring-[#9a2640]/15 transition-all text-base text-foreground placeholder:text-foreground/35 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white text-[12px] tracking-[0.1em] uppercase font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    boxShadow:
                      "0 18px 40px -10px rgba(0,0,0,0.040), 0 8px 16px -6px rgba(0,0,0,0.040)",
                  }}
                >
                  <Send className="w-4 h-4" />
                  {submitting ? "Wird gesendet..." : "Anfrage absenden"}
                </button>

                {/* Disclaimer */}
                <p className="text-[11px] tracking-[0.04em] text-foreground/45 text-center mt-5 leading-[1.6]">
                  Mit dem Absenden erkennst du die{" "}
                  <Link
                    to="/datenschutz"
                    className="underline hover:text-foreground/70"
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  an. Keine Newsletter, keine Weitergabe.
                </p>
              </form>
            ) : (
              <div
                className="success-pop rounded-3xl p-12 md:p-16 text-center"
                style={{
                  background: `linear-gradient(155deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.040)",
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-7"
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <p
                  className={`text-lg text-white/75 mb-3`}
                >
                  Angekommen.
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">
                  Danke {form.name || "dir"}.
                </h3>
                <p className="text-white/85 text-base md:text-lg leading-[1.7] max-w-md mx-auto">
                  Du wirst gerade zum Buchungsformular weitergeleitet, damit
                  wir alle Details abschließen können. Ich melde mich dann
                  binnen 24 Stunden persönlich.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   5 · ANTWORTZEITEN-HEATMAP — page-eigener Twist
   ════════════════════════════════════════════════════════ */
const TAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const ZEITEN = [
  { label: "Früh", sub: "06–10 Uhr" },
  { label: "Mittag", sub: "10–14 Uhr" },
  { label: "Nachmittag", sub: "14–18 Uhr" },
  { label: "Abend", sub: "18–22 Uhr" },
];

// 7 Tage × 4 Slots = Heat-Werte (0-4) basierend auf Erfahrung
const HEATMAP: number[][] = [
  // Mo-Fr: Werktags am schnellsten morgens/mittags, abends ruhig
  [3, 4, 3, 2], // Mo
  [4, 4, 3, 2], // Di
  [4, 4, 3, 3], // Mi
  [3, 4, 3, 2], // Do
  [3, 4, 3, 1], // Fr (abends oft auf Veranstaltung)
  [1, 2, 1, 0], // Sa (auf der Bühne)
  [2, 3, 2, 1], // So
];

const heatColor = (v: number): string => {
  if (v === 0) return "rgba(0,0,0,0.030)";
  if (v === 1) return "rgba(0,0,0,0.040)";
  if (v === 2) return "rgba(0,0,0,0.040)";
  if (v === 3) return "rgba(0,0,0,0.040)";
  return "rgba(0,0,0,0.040)";
};

const heatLabel = (v: number): string => {
  if (v === 0) return "selten";
  if (v === 1) return "spät";
  if (v === 2) return "okay";
  if (v === 3) return "schnell";
  return "sofort";
};

const AntwortzeitenHeatmap = () => {
  const { ref, isVisible } = useScrollReveal();
  const [hovered, setHovered] = useState<{
    day: number;
    slot: number;
  } | null>(null);

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 relative"
      style={{ background: CREAM }}
    >
      <div className="container px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12">
          {/* LEFT — Story */}
          <div
            className={`md:col-span-5 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Wann ich schnell bin.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2rem,4.5vw,4rem)] text-foreground mb-7">
              Werktags am
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                schnellsten.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-7 max-w-md">
              Eine kleine Karte aus 200+ Antwortzeiten: dunkles Burgunder
              heißt ich antworte fast sofort, blass heißt eher abends. Am
              Samstagabend stehe ich meist auf der Bühne — dann wird es
              Sonntag.
            </p>
            <div
              className="inline-flex items-center gap-3 rounded-full px-5 py-3 text-[12px] tracking-[0.08em] uppercase font-semibold"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.040)",
                color: ACCENT_DEEP,
              }}
            >
              <Clock className="w-3.5 h-3.5" />
              Durchschnitt 9 Stunden
            </div>
          </div>

          {/* RIGHT — Heatmap */}
          <div
            className={`md:col-span-7 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="rounded-3xl p-7 md:p-9"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 100%)",
                border: "1px solid rgba(0,0,0,0.040)",
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.075)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1"
                    style={{ color: ACCENT }}
                  >
                    Antwortzeiten-Karte
                  </p>
                  <p className="font-display text-lg font-bold text-foreground">
                    Hover für Details
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.16em] uppercase font-bold text-foreground/50">
                  <span>selten</span>
                  <div className="flex items-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((v) => (
                      <span
                        key={v}
                        className="w-3 h-3 rounded-sm"
                        style={{ background: heatColor(v) }}
                      />
                    ))}
                  </div>
                  <span>sofort</span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-[auto_repeat(4,1fr)] gap-x-3 gap-y-2 mb-4">
                <div />
                {ZEITEN.map((z) => (
                  <div key={z.label} className="text-center">
                    <p className="text-[10px] tracking-[0.12em] uppercase font-bold text-foreground/55">
                      {z.label}
                    </p>
                    <p className="text-[10px] text-foreground/35 tabular-nums">
                      {z.sub}
                    </p>
                  </div>
                ))}

                {TAGE.map((tag, di) => (
                  <div key={tag} className="contents">
                    <div className="flex items-center justify-end pr-2">
                      <span className="text-[11px] tracking-[0.12em] uppercase font-bold text-foreground/55">
                        {tag}
                      </span>
                    </div>
                    {ZEITEN.map((_, zi) => {
                      const v = HEATMAP[di][zi];
                      const isHovered =
                        hovered?.day === di && hovered?.slot === zi;
                      return (
                        <button
                          key={`${di}-${zi}`}
                          type="button"
                          onMouseEnter={() =>
                            setHovered({ day: di, slot: zi })
                          }
                          onMouseLeave={() => setHovered(null)}
                          className="relative rounded-md transition-all"
                          style={{
                            background: heatColor(v),
                            aspectRatio: "1.2",
                            transform: isHovered ? "scale(1.08)" : "scale(1)",
                            boxShadow: isHovered
                              ? "0 8px 20px -4px rgba(0,0,0,0.040)"
                              : "none",
                          }}
                          aria-label={`${TAGE[di]} ${ZEITEN[zi].label}: ${heatLabel(v)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Hover-Detail */}
              <div
                className="mt-5 rounded-2xl px-5 py-4 text-center transition-all min-h-[60px]"
                style={{
                  background: hovered
                    ? "rgba(0,0,0,0.040)"
                    : "rgba(0,0,0,0.04)",
                  border: hovered
                    ? "1px solid rgba(0,0,0,0.040)"
                    : "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {hovered ? (
                  <p className="text-sm text-foreground">
                    <span
                      className="font-bold"
                      style={{ color: ACCENT_DEEP }}
                    >
                      {TAGE[hovered.day]} · {ZEITEN[hovered.slot].label}
                    </span>{" "}
                    <span className="text-foreground/60">
                      ({ZEITEN[hovered.slot].sub}) —
                    </span>{" "}
                    <span>
                      {heatLabel(HEATMAP[hovered.day][hovered.slot])}
                    </span>
                  </p>
                ) : (
                  <p className="text-xs uppercase tracking-wide font-medium text-foreground/55">
                    Bewege die Maus über ein Feld.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   6 · SHOW-PLANER VORSCHLAG
   ════════════════════════════════════════════════════════ */
const ShowPlanerVorschlag = () => {
  const { ref, isVisible } = useScrollReveal();
  const openPlaner = () => {
    window.location.hash = "#planer";
  };
  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative"
      style={{ background: "#fcfaf6" }}
    >
      <div className="container px-6">
        <div
          className={`max-w-5xl mx-auto rounded-3xl overflow-hidden relative ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{
            background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, #08060c 100%)`,
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.225)",
          }}
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              right: "-10%",
              top: "-30%",
              width: "60%",
              height: "120%",
              background:
                "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
              filter: "blur(20px)",
            }}
          />

          <div className="relative grid md:grid-cols-12 gap-8 p-10 md:p-16">
            <div className="md:col-span-7">
              <p
                className={`text-lg text-white/65 mb-5`}
              >
                Lieber strukturiert?
              </p>
              <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4.5vw,3.5rem)] text-white mb-6">
                Plane in 90 Sekunden
                <br />
                <span style={{ color: "#f3d9a8" }}>
                  deine Show.
                </span>
              </h2>
              <p className="text-base md:text-lg text-white/75 leading-[1.7] max-w-xl mb-8">
                Statt Formular: 9 Schritte, knappe Fragen, klare Empfehlung.
                Format, Dauer, Ablauf — am Ende landet alles in einer Anfrage,
                die ich persönlich beantworte.
              </p>
              <button
                type="button"
                onClick={openPlaner}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-foreground text-[12px] tracking-[0.1em] uppercase font-semibold transition-transform hover:scale-[1.035] active:scale-[0.97]"
                style={{
                  background: "#f3d9a8",
                  boxShadow:
                    "0 18px 40px -10px rgba(243,217,168,0.45), 0 8px 16px -6px rgba(0,0,0,0.25)",
                }}
              >
                <Wand2 className="w-4 h-4" />
                Show-Planer öffnen
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="md:col-span-5 flex items-center justify-center">
              <div
                className="rounded-2xl p-6 w-full max-w-sm"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase font-bold"
                    style={{ color: "#f3d9a8" }}
                  >
                    Planer · Schritt 4 / 9
                  </p>
                  <Sparkles
                    className="w-4 h-4"
                    style={{ color: "#f3d9a8" }}
                  />
                </div>
                <div className="space-y-2 mb-5">
                  {[
                    { label: "Anlass", value: "Firmenfeier", done: true },
                    { label: "Saison", value: "Winter", done: true },
                    { label: "Gäste", value: "120", done: true },
                    { label: "Format", value: "Bühne + Close-Up", done: true },
                    { label: "Dauer", value: "—", done: false },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-white/55">{row.label}</span>
                      <span
                        className={
                          row.done
                            ? "text-white font-semibold tabular-nums"
                            : "text-white/30"
                        }
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "44%",
                      background: `linear-gradient(90deg, #f3d9a8, ${ACCENT})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   7 · PULL QUOTE — schwarz full-bleed
   ════════════════════════════════════════════════════════ */
const PullQuote = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: "#08060c" }}
    >
      {/* Glow blobs */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "-10%",
          top: "20%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(closest-side, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "-10%",
          bottom: "10%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10 px-6">
        <div
          className={`max-w-5xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p
            className={`text-base md:text-lg text-white/55 mb-8 tracking-wide`}
          >
            Versprechen.
          </p>
          <p className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2.25rem,6.5vw,6rem)] text-white">
            24 Stunden.
            <br />
            <span style={{ color: "#f3d9a8" }}>
              Mehr brauchst du nicht zu warten.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   8 · HÄUFIGE ANLIEGEN — Magazin-Liste
   ════════════════════════════════════════════════════════ */
const ANLIEGEN = [
  {
    nr: "01",
    titel: "Hochzeit anfragen",
    body: "Sektempfang, Dinner, Hochzeitstanz — drei Phasen, drei Magie-Formate. Persönlich auf euch zugeschnitten.",
    link: "/hochzeit",
    cta: "Zu Hochzeit",
  },
  {
    nr: "02",
    titel: "Firmenfeier-Konzept",
    body: "Vorstandsdinner bis Mitarbeiter-Weihnachtsfeier. Auf eure Branche zugeschnitten, mit Glasur an Sales und HR.",
    link: "/firmenfeiern",
    cta: "Zu Firmenfeier",
  },
  {
    nr: "03",
    titel: "Magic Dinner Tickets",
    body: "Wald und Wiese in Sinzing. Vier Termine pro Saison. Vorspeise bis Dessert, fünf Magie-Inseln dazwischen.",
    link: "/tickets",
    cta: "Tickets ansehen",
  },
  {
    nr: "04",
    titel: "Pressemitteilung & Bilder",
    body: "Pressetexte, hochauflösende Fotos, Vita. Alles vorbereitet für Redaktionen und Veranstalter.",
    link: "/presse",
    cta: "Zur Presse",
  },
  {
    nr: "05",
    titel: "Moderation buchen",
    body: "Galas, Award-Shows, Firmenpräsentationen. Durch den Abend, mit Magie als Bonus.",
    link: "/moderation",
    cta: "Zur Moderation",
  },
];

const HäufigeAnliegen = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-24 md:py-36 bg-white">
      <div className="container px-6">
        <div
          className={`max-w-6xl mx-auto grid md:grid-cols-12 gap-10 mb-14 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5"
            >
              Häufige Anliegen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
              Vielleicht
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                ist es eines davon.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-10">
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7]">
              Wenn dein Thema gleich klar ist, geht es direkt weiter — sonst
              nimm das Formular oben. Beides okay.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {ANLIEGEN.map((a, i) => (
            <Link
              key={a.nr}
              to={a.link}
              className={`group block border-t border-foreground/10 py-8 md:py-10 transition-colors hover:bg-foreground/[0.02] ${
                isVisible ? "animate-fade-up" : "opacity-0"
              } ${i === ANLIEGEN.length - 1 ? "border-b" : ""}`}
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-1">
                  <span
                    className={`${SERIF_ITALIC} text-2xl md:text-3xl`}
                    style={{ color: ACCENT }}
                  >
                    {a.nr}
                  </span>
                </div>
                <div className="md:col-span-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight mb-2 group-hover:text-[#9a2640] transition-colors">
                    {a.titel}
                  </h3>
                  <p className="text-base text-foreground/65 leading-[1.65] max-w-2xl">
                    {a.body}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase font-bold"
                    style={{ color: ACCENT }}
                  >
                    {a.cta}
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   9 · STANDORT MAP — Bayern SVG
   ════════════════════════════════════════════════════════ */
const StandortMap = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-24 md:py-36 relative"
      style={{ background: CREAM }}
    >
      <div className="container px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          {/* LEFT */}
          <div
            className={`md:col-span-5 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Mein Revier.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2rem,4.5vw,4rem)] text-foreground mb-7">
              Bayern primär,
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                deutschlandweit.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-7 max-w-md">
              Regensburg ist Heimat. Von dort fahre ich nach München,
              Nürnberg, Augsburg — und alles dazwischen. Auch Berlin,
              Hamburg, Köln, Wien, Zürich auf Anfrage.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {[
                { label: "Hauptregion", value: "Bayern" },
                { label: "Reiseradius", value: "DE-weit" },
                { label: "Anfahrt ab Regensburg", value: "ab 0 km" },
                { label: "Übersee", value: "auf Anfrage" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/45 mb-1">
                    {s.label}
                  </p>
                  <p
                    className="font-display text-base font-bold"
                    style={{ color: ACCENT_DEEP }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Bayern SVG */}
          <div
            className={`md:col-span-7 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.85) 0%, rgba(245,236,220,0.5) 100%)",
                border: "1px solid rgba(0,0,0,0.040)",
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.075)",
              }}
            >
              <svg
                viewBox="0 0 400 460"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Karte: Bayern mit Regensburg als Heimatort"
              >
                <defs>
                  <linearGradient id="bayern-fill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e4b8c0" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#9a2640" stopOpacity="0.18" />
                  </linearGradient>
                  <radialGradient id="pin-glow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#9a2640" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#9a2640" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Bayern stilisiert (Vereinfachung — Hauptkonturen) */}
                <path
                  d="M 120 50 L 180 40 L 240 50 L 290 70 L 320 100 L 340 140 L 350 180 L 360 220 L 350 260 L 340 290 L 350 320 L 340 360 L 310 390 L 270 410 L 230 420 L 190 415 L 150 405 L 110 390 L 80 360 L 60 320 L 50 280 L 60 240 L 50 200 L 60 160 L 80 120 L 100 80 Z"
                  fill="url(#bayern-fill)"
                  stroke="#9a2640"
                  strokeWidth="2"
                  strokeOpacity="0.4"
                />
                {/* Städte (klein, grey) */}
                {[
                  { x: 150, y: 350, label: "München" },
                  { x: 200, y: 220, label: "Nürnberg" },
                  { x: 100, y: 320, label: "Augsburg" },
                  { x: 290, y: 110, label: "Hof" },
                  { x: 90, y: 240, label: "Würzburg" },
                ].map((c) => (
                  <g key={c.label}>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="3"
                      fill="#5c1622"
                      opacity="0.45"
                    />
                    <text
                      x={c.x + 7}
                      y={c.y + 4}
                      fontSize="11"
                      fill="#5c1622"
                      opacity="0.55"
                      fontFamily="Inter, sans-serif"
                    >
                      {c.label}
                    </text>
                  </g>
                ))}
                {/* Regensburg-Pin (groß, Burgunder) */}
                <circle cx="225" cy="265" r="42" fill="url(#pin-glow)" />
                <circle
                  cx="225"
                  cy="265"
                  r="10"
                  fill={ACCENT}
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx="225" cy="265" r="4" fill="white" />
                <text
                  x="245"
                  y="262"
                  fontSize="15"
                  fontWeight="700"
                  fill="#5c1622"
                  fontFamily="Inter, sans-serif"
                >
                  Regensburg
                </text>
                <text
                  x="245"
                  y="280"
                  fontSize="11"
                  fill="#5c1622"
                  opacity="0.65"
                  fontFamily="Instrument Serif, Georgia, serif"
                  fontStyle="italic"
                >
                  Heimat.
                </text>
              </svg>

              <p
                className={`text-sm text-foreground/55 text-center mt-5`}
              >
                Stilisiert. Anfahrtswege kläre ich pro Anfrage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   10 · VERTRAUEN-STRIP
   ════════════════════════════════════════════════════════ */
const VERTRAUEN = [
  { icon: Tv, label: "TVA TV", sub: "Auftritt 2024" },
  { icon: Trophy, label: "Greatest Talent", sub: "Finalist 2023" },
  { icon: Award, label: "Talents of Magic", sub: "Kreativpreis 2024" },
  { icon: Medal, label: "Dt. Jugendmeisterschaft", sub: "Top 30 · 2024" },
  { icon: Star, label: "5,0 Sterne", sub: "30+ Bewertungen" },
];

const VertrauenStrip = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      style={{ background: "#fcfaf6" }}
    >
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-12 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p
            className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-3"
          >
            Bekannt aus.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
            Auszeichnungen.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl">
          {VERTRAUEN.map((t, i) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className={`rounded-2xl p-5 transition-transform hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.040)",
                  animationDelay: `${0.15 + i * 0.08}s`,
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </span>
                <p className="font-display text-base font-bold text-foreground tracking-tight">
                  {t.label}
                </p>
                <p
                  className={`text-sm text-foreground/55 mt-1`}
                >
                  {t.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   11 · SOCIAL STRIP
   ════════════════════════════════════════════════════════ */
const SOCIAL = [
  {
    href: "https://www.instagram.com/_magicel/",
    icon: Instagram,
    label: "Instagram",
    handle: "@_magicel",
  },
  {
    href: "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA",
    icon: Youtube,
    label: "YouTube",
    handle: "Emilian Leber",
  },
  {
    href: "https://de.linkedin.com/in/emilian-leber-3b3414369",
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Emilian Leber",
  },
  {
    href: "https://www.facebook.com/people/Emilian-Leber-Zauberer-Mentalist/61582946450467/",
    icon: Facebook,
    label: "Facebook",
    handle: "Emilian Leber Zauberer",
  },
];

const SocialStrip = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      style={{ background: CREAM }}
    >
      <div className="container px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 mb-10">
          <div
            className={`md:col-span-6 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-3"
            >
              Auf Social.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
              Sieh selbst.
            </h2>
          </div>
          <div
            className={`md:col-span-6 md:pt-3 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-base text-foreground/65 leading-[1.7] max-w-md">
              Reels von echten Abenden, Backstage, Trick-Snippets — auf
              allen Kanälen aktiv. Folge mit, wenn du magst.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {SOCIAL.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group rounded-2xl p-5 flex items-center gap-4 transition-all hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.040)",
                  animationDelay: `${0.15 + i * 0.08}s`,
                }}
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base font-bold text-foreground tracking-tight group-hover:text-[#9a2640] transition-colors">
                    {s.label}
                  </p>
                  <p className="text-xs text-foreground/55 truncate">
                    {s.handle}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-foreground/35 group-hover:text-[#9a2640] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   12 · FINAL CTA — schwarz
   ════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48"
      style={{ background: "#08060c" }}
    >
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "-15%",
          top: "10%",
          width: "60%",
          height: "70%",
          background:
            "radial-gradient(closest-side, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          right: "-10%",
          bottom: "5%",
          width: "55%",
          height: "60%",
          background:
            "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10 px-6">
        <div
          className={`max-w-5xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p
            className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/55 mb-6"
          >
            Eine Mail.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2.5rem,7vw,6.5rem)] text-white mb-10">
            Lass uns loslegen
            <br />
            <span style={{ color: "#f3d9a8" }}>
              — schreib mir.
            </span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-7">
            <a
              href="#kontaktformular"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-foreground text-[12px] tracking-[0.1em] uppercase font-semibold transition-transform hover:scale-[1.035] active:scale-[0.97]"
              style={{
                background: "#f3d9a8",
                boxShadow:
                  "0 18px 40px -10px rgba(243,217,168,0.55), 0 8px 16px -6px rgba(0,0,0,0.35)",
              }}
            >
              <Send className="w-4 h-4" />
              Formular ausfüllen
            </a>
            <a
              href="mailto:el@magicel.de"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold text-white/80 hover:text-white transition-colors"
            >
              el@magicel.de
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-white/55 text-xs tracking-[0.04em]">
            Antwort binnen 24 Stunden · Persönlich von mir · Kein Verteiler
          </p>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const Kontakt = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Kontakt — Schreibe mir | Emilian Leber Zauberer Bayern
      </title>
      <meta
        name="description"
        content="Direkt-Kontakt zum Zauberer Emilian Leber. Email, Telefon, WhatsApp. Antwort in unter 24 Stunden. Bayern primär, deutschlandweit buchbar. 5,0★ — 30+ Bewertungen, 200+ Events."
      />
      <meta
        name="keywords"
        content="Zauberer Kontakt, Emilian Leber Anfrage, Zauberer buchen Bayern, Magier kontaktieren, Hochzeit Zauberer Anfrage, Firmenfeier Zauberkünstler, Magic Dinner Anfrage, magicel.de Kontakt"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href="https://www.magicel.de/kontakt" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <meta
        property="og:title"
        content="Kontakt — Schreibe mir | Emilian Leber Zauberer"
      />
      <meta
        property="og:description"
        content="Direkt-Kontakt zum Zauberer Emilian Leber. Email, Telefon, WhatsApp. Antwort in unter 24 Stunden."
      />
      <meta property="og:url" content="https://www.magicel.de/kontakt" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Kontakt — Schreibe mir | Emilian Leber Zauberer"
      />
      <meta
        name="twitter:description"
        content="Direkt-Kontakt zum Zauberer Emilian Leber. Antwort binnen 24 Stunden. Bayern primär, deutschlandweit."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Kontakt — Emilian Leber Zauberer",
          url: "https://www.magicel.de/kontakt",
          mainEntity: {
            "@type": "Person",
            name: "Emilian Leber",
            jobTitle: "Zauberer und Mentalist",
            email: "el@magicel.de",
            telephone: "+4915563744696",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Regensburg",
              addressRegion: "Bayern",
              addressCountry: "DE",
            },
            sameAs: [
              "https://www.instagram.com/_magicel/",
              "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA",
              "https://de.linkedin.com/in/emilian-leber-3b3414369",
            ],
          },
        })}
      </script>
    </Helmet>
    <PageLayout>
      <PageKeyframes />
      <main>
        <Hero />
        <DreiKontaktwege />
        <KontaktformularSection />
        <AntwortzeitenHeatmap />
        <ShowPlanerVorschlag />
        <PullQuote />
        <HäufigeAnliegen />
        <StandortMap />
        <VertrauenStrip />
        <SocialStrip />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Kontakt;
