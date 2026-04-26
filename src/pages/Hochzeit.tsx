import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Heart,
  Users,
  Sparkles,
  Wine,
  Mic2,
  Check,
  Phone,
  ClipboardList,
  PartyPopper,
  RotateCcw,
} from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import weddingHeroImg from "@/assets/hero-hochzeit-stock.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import weddingMagicImg from "@/assets/wedding-magic.jpg";
import staunenImg from "@/assets/staunen.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import haendeInteraktionImg from "@/assets/haende-interaktion.jpg";
import closeupImg from "@/assets/closeup.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import heroMagicImg from "@/assets/hero-magic.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import { useCounter } from "@/hooks/useCounter";

const GRADIENT =
  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)";
const GRADIENT_LIGHT =
  "linear-gradient(100deg, hsl(220 95% 78%) 0%, hsl(255 85% 78%) 50%, hsl(285 90% 78%) 100%)";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — direkter Brautpaar-Hook
   ═══════════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen overflow-hidden text-white flex flex-col">
    <div className="absolute inset-0">
      <img src={weddingHeroImg} alt="" className="h-full w-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,10,25,0.82) 0%, rgba(15,10,25,0.6) 40%, rgba(15,10,25,0.2) 80%, rgba(15,10,25,0.05) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(15,10,25,0.55))",
        }}
      />
    </div>

    <div className="relative z-10 container px-6 flex-1 flex items-center pt-32 md:pt-36 pb-20 md:pb-24">
      <div className="w-full max-w-3xl">
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span className="text-sm text-white/90">
              <strong className="font-semibold text-white">5,0</strong>
              <span className="text-white/60"> · 30+ Bewertungen</span>
            </span>
          </div>
          <span aria-hidden className="hidden md:block h-4 w-px bg-white/20" />
          <span className="text-sm text-white/85">
            <strong className="font-semibold text-white">100+ Hochzeiten</strong>
          </span>
        </div>

        <h1
          className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5.6vw,5.25rem)] opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Macht eure Hochzeit zum{" "}
          <span
            style={{
              background: GRADIENT_LIGHT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tagesgespräch
          </span>
          .
        </h1>

        <p
          className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/85 font-light opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Ihr plant eure Hochzeit und sucht das eine Highlight, das eure Gäste
          vereint und sprachlos macht? Sag mir kurz, wie eure Hochzeit
          aussieht — ich finde mit dir das passende Format.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#empfehlung"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
          >
            <span>30 Sekunden: Was passt zu uns?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/buchung"
            className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors"
          >
            Direkt anfragen
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <p
          className="mt-4 text-xs md:text-sm text-white/55 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          Kostenlos · Unverbindlich · Antwort innerhalb 24h
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   2 · INTERAKTIVES QUIZ — "Was passt zu eurer Hochzeit?"
   ═══════════════════════════════════════════════════════════ */
type Antwort = "klein" | "mittel" | "groß" | "ruhig" | "lustig" | "spektakulaer" | "eisbrecher" | "highlight" | "abend";

const QuizSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [step, setStep] = useState(0);
  const [groesse, setGroesse] = useState<Antwort | null>(null);
  const [stil, setStil] = useState<Antwort | null>(null);
  const [ziel, setZiel] = useState<Antwort | null>(null);

  const reset = () => {
    setStep(0);
    setGroesse(null);
    setStil(null);
    setZiel(null);
  };

  // Empfehlung berechnen
  const empfehlung = (() => {
    if (!groesse || !stil || !ziel) return null;
    if (ziel === "eisbrecher") {
      return {
        format: "Close-Up beim Sektempfang",
        sub: "60–90 Min · während Sektempfang & Fotosession",
        why: "Während ihr Fotos macht, unterhalte ich eure Gäste mit Magie zum Anfassen — Karten, Münzen, kleine Wunder direkt vor ihren Augen. Familien, die sich noch nicht kennen, haben sofort ein Gesprächsthema.",
        link: "/close-up",
      };
    }
    if (ziel === "highlight") {
      return {
        format: stil === "spektakulaer" ? "Bühnenshow als Tanz-Vorprogramm" : "Bühnenshow nach dem Dinner",
        sub: "20–30 Min · ein zentraler Show-Moment",
        why: "Eine durchkomponierte Show — abgestimmt auf eure Story, mit eingebauten persönlichen Anekdoten. Genau dann zünden, wenn alle satt sind und auf den Hochzeitstanz warten.",
        link: "/buehnenshow",
      };
    }
    if (ziel === "abend") {
      return {
        format: "Komplett-Begleitung",
        sub: "Empfang + Dinner + Show-Slot",
        why: "Ein roter Faden über den ganzen Abend: Close-Up beim Empfang, Tisch-zu-Tisch im Dinner, große Show vor dem Tanz. Maximaler Wow-Effekt.",
        link: "/buchung",
      };
    }
    return null;
  })();

  const Step = ({
    title,
    options,
    onChoice,
    selected,
  }: {
    title: string;
    options: { value: Antwort; label: string; sub?: string }[];
    onChoice: (v: Antwort) => void;
    selected: Antwort | null;
  }) => (
    <div>
      <p className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 leading-tight">
        {title}
      </p>
      <div className="grid sm:grid-cols-3 gap-3">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChoice(o.value)}
            className={`text-left p-5 transition-all ${
              selected === o.value
                ? "bg-foreground text-white"
                : "bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground"
            }`}
            style={{ borderRadius: "0.6rem" }}
          >
            <p className="font-display text-base md:text-lg font-bold leading-tight mb-1">
              {o.label}
            </p>
            {o.sub && (
              <p
                className="text-[12px] leading-snug"
                style={{ color: selected === o.value ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}
              >
                {o.sub}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="empfehlung" ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            In 30 Sekunden zur Empfehlung
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was passt zu{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              eurer Hochzeit
            </span>
            ?
          </h2>
          <p className="mt-5 max-w-xl text-base md:text-lg leading-[1.55] text-foreground/65 font-light">
            Drei Fragen, eine konkrete Empfehlung — damit ihr genau wisst, was
            ihr braucht.
          </p>
        </div>

        <div
          className={`max-w-4xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{
            animationDelay: "0.1s",
            background: "rgba(0,0,0,0.02)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "1rem",
          }}
        >
          {/* Progress */}
          <div className="px-7 md:px-9 pt-7 pb-3 flex items-center gap-3 border-b border-foreground/8">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: step >= i ? "32px" : "8px",
                    background:
                      step >= i
                        ? "linear-gradient(90deg, hsl(220 85% 55%), hsl(255 75% 55%), hsl(285 85% 55%))"
                        : "rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-wider text-foreground/45 ml-2">
              {step < 3 ? `Frage ${step + 1} von 3` : "Eure Empfehlung"}
            </span>
            {step > 0 && (
              <button
                onClick={reset}
                className="ml-auto inline-flex items-center gap-1 text-xs text-foreground/55 hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Neu starten
              </button>
            )}
          </div>

          <div className="p-7 md:p-9">
            {step === 0 && (
              <Step
                title="Wie viele Gäste habt ihr?"
                selected={groesse}
                onChoice={(v) => {
                  setGroesse(v);
                  setStep(1);
                }}
                options={[
                  { value: "klein", label: "Bis 50", sub: "Kleine Runde" },
                  { value: "mittel", label: "50 – 150", sub: "Mittelgroße Hochzeit" },
                  { value: "groß", label: "Über 150", sub: "Große Feier" },
                ]}
              />
            )}
            {step === 1 && (
              <Step
                title="Wie wollt ihr eure Hochzeit?"
                selected={stil}
                onChoice={(v) => {
                  setStil(v);
                  setStep(2);
                }}
                options={[
                  { value: "ruhig", label: "Elegant & ruhig", sub: "Persönlich, wenig Spektakel" },
                  { value: "lustig", label: "Locker & lustig", sub: "Comedy-Anteil hoch" },
                  { value: "spektakulaer", label: "Spektakulär", sub: "Show-Highlight für alle" },
                ]}
              />
            )}
            {step === 2 && (
              <Step
                title="Was ist euch wichtig?"
                selected={ziel}
                onChoice={(v) => {
                  setZiel(v);
                  setStep(3);
                }}
                options={[
                  { value: "eisbrecher", label: "Eisbrecher", sub: "Gäste verbinden, Smalltalk lockern" },
                  { value: "highlight", label: "Highlight-Moment", sub: "Eine zentrale Show, die alle zusammenbringt" },
                  { value: "abend", label: "Roter Faden", sub: "Magie über den ganzen Abend verteilt" },
                ]}
              />
            )}
            {step === 3 && empfehlung && (
              <div className="animate-fade-up">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold"
                  style={{
                    background: GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Eure Empfehlung
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-black text-foreground mb-3 leading-[1.1]">
                  {empfehlung.format}
                </h3>
                <p className="text-sm text-foreground/55 mb-6">{empfehlung.sub}</p>
                <p className="text-base md:text-[17px] text-foreground/75 leading-[1.6] mb-8 max-w-2xl">
                  {empfehlung.why}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/buchung"
                    className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.01]"
                    style={{ background: GRADIENT, boxShadow: "0 10px 30px hsl(255 75% 55% / 0.3)" }}
                  >
                    Jetzt anfragen
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={empfehlung.link}
                    className="inline-flex items-center gap-2 font-display font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors self-start py-3.5"
                  >
                    Mehr zum Format
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · DREI OPTIONEN — kompakte Übersicht
   ═══════════════════════════════════════════════════════════ */
const OptionenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const optionen = [
    {
      icon: Wine,
      time: "Sektempfang",
      title: "Close-Up Magie",
      desc: "Während ihr Fotos macht, mische ich mich unter eure Gäste. Der perfekte Eisbrecher zwischen Familien.",
      duration: "60–90 Min",
      passt: "Wenn ihr viele Gäste habt, die sich nicht kennen",
    },
    {
      icon: Sparkles,
      time: "Show-Slot",
      title: "Bühnenshow",
      desc: "Eine durchkomponierte Show als zentrales Highlight — meist vor dem Hochzeitstanz.",
      duration: "20–30 Min",
      passt: "Wenn ihr einen klaren Wow-Moment für alle wollt",
      featured: true,
    },
    {
      icon: Mic2,
      time: "Komplett",
      title: "Voll-Begleitung",
      desc: "Empfang + Tisch-zu-Tisch + Bühnenshow. Ein roter Faden über den ganzen Abend.",
      duration: "ganzer Abend",
      passt: "Wenn Magie das Leitthema eurer Hochzeit sein soll",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Eure 3 Optionen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            So{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              entscheidet ihr
            </span>
            .
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {optionen.map((o) => (
            <div
              key={o.title}
              className={`relative p-7 md:p-8 flex flex-col ${o.featured ? "text-white" : "text-foreground"}`}
              style={{
                background: o.featured
                  ? "linear-gradient(135deg, hsl(220 50% 18%) 0%, hsl(255 45% 22%) 50%, hsl(285 50% 22%) 100%)"
                  : "rgba(0,0,0,0.02)",
                border: o.featured
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.75rem",
                boxShadow: o.featured ? "0 30px 70px -20px rgba(60, 30, 80, 0.4)" : "none",
              }}
            >
              {o.featured && (
                <span
                  className="absolute -top-3 left-7 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: GRADIENT_LIGHT, color: "#0f0a19" }}
                >
                  Beliebt
                </span>
              )}
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-5"
                style={{
                  background: o.featured
                    ? "rgba(255,255,255,0.12)"
                    : "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))",
                }}
              >
                <o.icon className="w-5 h-5" style={{ color: o.featured ? "white" : "hsl(255 60% 40%)" }} />
              </div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2"
                style={
                  o.featured
                    ? { background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }
                    : { background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }
                }
              >
                {o.time} · {o.duration}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-black mb-3 leading-[1.1]">
                {o.title}
              </h3>
              <p className={`text-sm md:text-[15px] leading-[1.55] mb-5 ${o.featured ? "text-white/85" : "text-foreground/70"}`}>
                {o.desc}
              </p>
              <p className={`text-xs leading-[1.5] mt-auto pt-4 border-t ${o.featured ? "text-white/70 border-white/15" : "text-foreground/55 border-foreground/10"}`}>
                <strong className={o.featured ? "text-white" : "text-foreground"}>Passt</strong>, wenn: {o.passt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · ECHTES BEISPIEL — eine Hochzeit erzählt
   ═══════════════════════════════════════════════════════════ */
const BeispielSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className={`lg:col-span-5 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Echte Hochzeit
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
              Wie eine echte Hochzeit{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ablaufen kann
              </span>
              .
            </h2>
            <p className="mt-6 text-base md:text-lg leading-[1.55] text-foreground/65 font-light">
              Damit ihr ein konkretes Bild habt, wie es bei euch aussehen
              könnte — hier ein echtes Beispiel.
            </p>
            <div
              className="relative overflow-hidden mt-8"
              style={{
                borderRadius: "0.5rem",
                aspectRatio: "4 / 5",
                boxShadow: "0 30px 60px -20px rgba(40, 20, 60, 0.25)",
              }}
            >
              <img src={emotionenImg} alt="Hochzeitsszene" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`lg:col-span-7 lg:pl-6 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="space-y-5">
              {[
                { time: "16:30", text: "Ankunft. Ich baue auf, während ihr noch fotografiert. Kurzes Briefing mit der Hochzeitsplanerin." },
                { time: "17:00", text: "Sektempfang. 80 Gäste, viele kennen sich nicht. Ich bin mittendrin — Karten, Münzen, kleine Wow-Momente. Familien lachen zusammen." },
                { time: "18:00", text: "Dinner. Während des Apéros besuche ich jeden Tisch. 5–7 Min pro Tisch. Jeder hat seine eigene Geschichte zu erzählen." },
                { time: "21:30", text: "Show-Slot vor dem Hochzeitstanz. 22 Min Bühnenshow mit eingebauter Anekdote über das Brautpaar. Standing Ovations." },
                { time: "22:30", text: "Tanzfläche brennt. Ich verabschiede mich, viele Gäste fragen nach Visitenkarten." },
              ].map((e) => (
                <div key={e.time} className="flex items-start gap-5">
                  <span
                    className="font-display text-base md:text-lg font-black tabular-nums shrink-0 leading-none mt-1 px-3 py-1.5 rounded-md"
                    style={{
                      background: "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))",
                      color: "hsl(255 60% 40%)",
                    }}
                  >
                    {e.time}
                  </span>
                  <p className="text-base md:text-[17px] text-foreground/75 leading-[1.6] flex-1 pt-1">
                    {e.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-foreground/10">
              <p className="text-sm text-foreground/55 italic">
                Hochzeit Müller-Schmidt · 80 Gäste · München · 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · BRAUTPAAR-STIMMEN — kompakt
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote: "Absolutes Highlight unserer Hochzeit. Alle Gäste sprechen noch Wochen danach davon!",
      author: "Katrin & Markus",
      anlass: "Hochzeit · München · 2024",
      initial: "K",
      tint: "hsl(340 75% 55%)",
    },
    {
      quote: "Charmant, persönlich, jeder Gast hat es geliebt. Beste Buchung für unseren Tag.",
      author: "Lisa & Tobias",
      anlass: "Hochzeit · Regensburg · 2023",
      initial: "L",
      tint: "hsl(255 70% 55%)",
    },
    {
      quote: "Wir hatten Sorge, dass es zu viel sein könnte — war es absolut nicht. Subtil und unvergesslich.",
      author: "Anna & Felix",
      anlass: "Hochzeit · Augsburg · 2024",
      initial: "A",
      tint: "hsl(220 70% 55%)",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Brautpaar-Stimmen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Was{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              andere Brautpaare
            </span>{" "}
            sagen.
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {reviews.map((r) => (
            <article
              key={r.author}
              className="relative bg-white p-7 md:p-8 flex flex-col h-full"
              style={{
                borderRadius: "0.75rem",
                boxShadow: "0 20px 50px -25px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <div
                aria-hidden
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(220 85% 65%), hsl(255 75% 65%), hsl(285 80% 65%))" }}
              />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[15px] leading-[1.6] text-foreground/85 flex-1">„{r.quote}"</p>
              <footer className="mt-6 pt-6 border-t border-foreground/8 flex items-center gap-3">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-white text-lg"
                  style={{ background: `linear-gradient(135deg, ${r.tint}, hsl(255 70% 55%))` }}
                >
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-foreground text-sm">{r.author}</p>
                  <p className="text-[12px] text-foreground/55 truncate">{r.anlass}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · BUCHUNGS-FLOW — 3 Schritte visualisiert
   ═══════════════════════════════════════════════════════════ */
const BuchungsFlowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    {
      icon: Phone,
      num: "01",
      title: "Anfragen",
      desc: "Schickt mir Datum, Ort und ungefähre Gästezahl. Ich melde mich innerhalb 24h persönlich bei euch.",
      time: "2 Min",
    },
    {
      icon: ClipboardList,
      num: "02",
      title: "Konzept",
      desc: "Wir besprechen euren Tag in 30 Min am Telefon. Ihr bekommt einen schriftlichen Vorschlag mit Slot, Format und Preis.",
      time: "30 Min Call",
    },
    {
      icon: PartyPopper,
      num: "03",
      title: "Hochzeit",
      desc: "Am Tag bin ich pünktlich da, baue alles in Ruhe auf. Ihr genießt euren Tag — ich kümmere mich um den Rest.",
      time: "Euer großer Tag",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            So einfach
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Drei Schritte zur{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              perfekten Hochzeit
            </span>
            .
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {/* Connector line desktop */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:block absolute top-8 left-full w-full h-px -translate-x-3 z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(220 85% 65% / 0.4), hsl(255 75% 65% / 0.6), hsl(285 80% 65% / 0.4))",
                  }}
                />
              )}
              <div className="relative z-10 flex flex-col">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ background: GRADIENT, boxShadow: "0 10px 30px hsl(255 75% 55% / 0.25)" }}
                >
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/45 mb-2 font-semibold">
                  Schritt {s.num} · {s.time}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-black text-foreground mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-[15px] text-foreground/65 leading-[1.55]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · DREI-SEKUNDEN-SECTION — Photo-Split, emotional pull
   ═══════════════════════════════════════════════════════════ */
const DreiSekundenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`lg:col-span-6 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "0.75rem",
                aspectRatio: "4 / 5",
                boxShadow: "0 40px 80px -25px rgba(40, 20, 60, 0.3), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <img src={staunenImg} alt="Staunende Hochzeitsgäste" className="w-full h-full object-cover" loading="lazy" />
              {/* Sticker bottom-right: gradient quote */}
              <div
                className="absolute bottom-5 right-5 px-4 py-2.5 rounded-full backdrop-blur-md text-white text-sm font-semibold flex items-center gap-2"
                style={{ background: "rgba(15,10,25,0.55)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: GRADIENT_LIGHT }} />
                Hochzeit · München · 2024
              </div>
            </div>
          </div>
          <div className={`lg:col-span-6 lg:pl-6 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Der Moment
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
              Drei Sekunden — und es ist{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                still
              </span>
              .
            </h2>
            <p className="mt-7 text-lg md:text-xl leading-[1.55] text-foreground/75 font-light">
              Eine Karte, die vor Sekunden noch in der Hand der Trauzeugin lag,
              taucht plötzlich in der Geldbörse des Brautvaters auf.
            </p>
            <p className="mt-5 text-base md:text-[17px] leading-[1.65] text-foreground/65">
              Der ganze Tisch hält den Atem an. Eine halbe Sekunde später lacht
              die ganze Tafel. Das ist der Moment, an den sich eure Gäste in
              zehn Jahren noch erinnern.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "hsl(340 75% 55%)",
                  "hsl(255 70% 55%)",
                  "hsl(220 70% 55%)",
                ].map((tint, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white"
                    style={{ background: `linear-gradient(135deg, ${tint}, hsl(255 70% 55%))` }}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/60">
                <strong className="text-foreground">100+ Brautpaare</strong> haben diesen Moment schon erlebt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · MEGA-QUOTE — gradient washed bg + huge quote marks
   ═══════════════════════════════════════════════════════════ */
const MegaQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      {/* Soft gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(285 80% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220 95% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div className="container px-6 relative z-10">
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* XXL gradient quote mark decoration */}
          <span
            aria-hidden
            className="block font-display font-black leading-none mb-[-2.5rem] md:mb-[-4rem] select-none"
            style={{
              fontSize: "clamp(8rem, 16vw, 16rem)",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.7,
            }}
          >
            "
          </span>
          <blockquote>
            <p className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground">
              Wir hatten Sorge, dass es zu viel sein könnte. Es war absolut
              nicht zu viel — es war{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                der schönste Moment
              </span>{" "}
              unserer Hochzeit.
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-black text-white text-xl"
                style={{ background: "linear-gradient(135deg, hsl(340 75% 55%), hsl(255 70% 55%))" }}
              >
                A
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base">Anna & Felix</p>
                <p className="text-sm text-foreground/55">Hochzeit · Augsburg · 2024 · 120 Gäste</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · GALERIE — masonry photo wall
   ═══════════════════════════════════════════════════════════ */
const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const photos = [
    { img: weddingMagicImg, span: "lg:col-span-2 lg:row-span-2", pos: "object-center" },
    { img: closeupImg, span: "", pos: "object-center" },
    { img: haendeInteraktionImg, span: "", pos: "object-center" },
    { img: heroMagicImg, span: "", pos: "object-center" },
    { img: portraitImg, span: "", pos: "object-top" },
    { img: dinnerBuehneImg, span: "lg:col-span-2", pos: "object-center" },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Impressionen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Echte{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Hochzeitsmomente
            </span>
            .
          </h2>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {photos.map((p, i) => (
            <div key={i} className={`${p.span} overflow-hidden group relative`} style={{ borderRadius: "0.5rem" }}>
              <img
                src={p.img}
                alt=""
                className={`w-full h-full object-cover ${p.pos} group-hover:scale-[1.04] transition-transform duration-700`}
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(220 85% 50% / 0.2), hsl(285 80% 50% / 0.2))",
                  mixBlendMode: "overlay",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · ZAHLEN-SECTION dunkel mit Bild
   ═══════════════════════════════════════════════════════════ */
const StatBlock = ({ end, suffix, label, desc }: { end: number; suffix: string; label: string; desc: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref}>
      <p
        className="font-display font-black leading-none tabular-nums tracking-[-0.02em] text-[clamp(3rem,6vw,5.5rem)]"
        style={{
          background: GRADIENT_LIGHT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}{suffix}
      </p>
      <p className="text-[11px] tracking-[0.18em] uppercase text-white/55 mt-4">{label}</p>
      <p className="mt-3 text-sm text-white/65 max-w-[220px] leading-relaxed">{desc}</p>
    </div>
  );
};

const ZahlenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0">
        <img src={buehneZuschauerImg} alt="" className="w-full h-full object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(15,10,25,0.92) 0%, rgba(30,15,45,0.85) 50%, rgba(15,10,25,0.7) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/55 mb-6">
            Erfahrung in Zahlen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,5vw,4.75rem)]">
            Was{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              100+ Hochzeiten
            </span>{" "}
            ausmachen.
          </h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <StatBlock end={100} suffix="+" label="Hochzeiten" desc="Vom Standesamt bis zur 300-Gäste-Trauung." />
          <StatBlock end={10} suffix="+" label="Jahre Routine" desc="Auch wenn der Zeitplan kippt — ich liefere." />
          <StatBlock end={5} suffix=",0" label="Sterne Bewertung" desc="Top-Bewertungen auf Google & ProvenExpert." />
          <StatBlock end={24} suffix="h" label="Antwortzeit" desc="Persönliche Rückmeldung garantiert." />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · FAQ — Hochzeit-spezifisch, kompakt
   ═══════════════════════════════════════════════════════════ */
const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: "Was kostet ein Auftritt?", a: "Hochzeitspakete starten ab 395€. Endgültiger Preis hängt von Format, Dauer und Anreise ab. Ihr bekommt nach der Anfrage ein verbindliches Angebot ohne versteckte Kosten." },
    { q: "Wie weit im Voraus sollten wir buchen?", a: "Ideal sind 6–12 Monate Vorlauf. Bei kurzfristigen Anfragen einfach trotzdem fragen — manchmal geht's noch." },
    { q: "Bei welcher Gästezahl funktioniert es?", a: "Von 20 bis 300+ Gästen alles möglich. Bei Close-Up erreiche ich auch große Gruppen durch Tisch-zu-Tisch-Magie." },
    { q: "Was, wenn unsere Gäste sehr seriös sind?", a: "Genau die haben oft am meisten Spaß. Vorstandsvorsitzende, Anwälte, Großeltern — alle staunen, sobald die erste Karte verschwindet." },
    { q: "Wie ist es mit Kindern?", a: "Funktioniert wunderbar. Magie ist altersübergreifend — vom 6-Jährigen bis zur 90-jährigen Oma." },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className={`lg:col-span-4 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              FAQ
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4vw,3.5rem)] text-foreground">
              Häufige{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Fragen
              </span>
              .
            </h2>
          </div>
          <div className={`lg:col-span-8 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-6">
                  <summary className="flex items-center justify-between cursor-pointer font-display text-lg md:text-xl font-bold text-foreground pr-8 list-none hover:text-foreground/70 transition-colors">
                    {faq.q}
                    <span className="text-foreground/30 group-open:rotate-45 transition-transform duration-300 text-2xl shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-[1.65] text-foreground/65 max-w-2xl">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white py-28 md:py-36">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(15,10,25,0.86) 0%, rgba(15,10,25,0.7) 50%, rgba(15,10,25,0.55) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 container px-6">
        <div className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/60 mb-8">
            Euer großer Tag
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.25rem,5vw,4.75rem)] text-white">
            Macht eure Hochzeit{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              unvergesslich
            </span>
            .
          </h2>
          <p className="mt-6 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Schickt mir Datum, Ort und Gästezahl — Antwort innerhalb 24h.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <span>Termin sichern</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors"
            >
              Direkt anrufen
            </a>
          </div>
          <p className="mt-4 text-sm text-white/55">
            Kostenlos · Unverbindlich · Antwort innerhalb 24h
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const Hochzeit = () => (
  <>
    <Helmet>
      <title>Zauberer für Hochzeit — Macht euren Tag zum Tagesgespräch | Emilian Leber</title>
      <meta
        name="description"
        content="Zauberer für Hochzeiten in Bayern und deutschlandweit. 30-Sekunden-Empfehlung, klare Optionen, echtes Beispiel — damit ihr genau wisst was ihr bucht."
      />
      <link rel="canonical" href="https://www.magicel.de/hochzeit" />
    </Helmet>
    <Navigation />
    <main>
      <Hero />
      <QuizSection />
      <OptionenSection />
      <DreiSekundenSection />
      <BeispielSection />
      <MegaQuoteSection />
      <StimmenSection />
      <GalerieSection />
      <ZahlenSection />
      <BuchungsFlowSection />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default Hochzeit;
