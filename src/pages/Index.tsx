import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Heart,
  PartyPopper,
  Trophy,
  Presentation,
  Star,
  Clock,
  Users,
  Sparkles,
  MessageCircle,
  Check,
  X as XIcon,
  Award,
} from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import LandingHero from "@/components/landing/LandingHero";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { ClientLogos } from "@/components/landing/TrustElements";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";

import heroStageImg from "@/assets/hero-stage.jpg";
import heroCloseupImg from "@/assets/hero-closeup.jpg";
import heroDinnerImg from "@/assets/hero-dinner.jpg";
import moderatorImg from "@/assets/moderator-hero.jpg";
import magicDinnerBookImg from "@/assets/magicdinner-book.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import firmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import geburtstagImg from "@/assets/hero-birthday.jpg";
import hochzeitStockImg from "@/assets/hero-hochzeit-stock.jpg";
import staunenImg from "@/assets/staunen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";

/* ═══════════════════════════════════════════════════════════
   Utility: Section divider matching hero style
   ═══════════════════════════════════════════════════════════ */
const SectionDivider = () => (
  <div
    aria-hidden
    className="h-px w-full"
    style={{
      background:
        "linear-gradient(90deg, transparent 0%, hsl(280 30% 70% / 0.3) 50%, transparent 100%)",
    }}
  />
);

/* ═══════════════════════════════════════════════════════════
   Inline mid-scroll CTA — small, between major sections
   ═══════════════════════════════════════════════════════════ */
const InlineCTA = ({
  headline,
  label = "Jetzt anfragen",
  to = "/buchung",
}: {
  headline: string;
  label?: string;
  to?: string;
}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white">
      <div className="container px-6 py-14 md:py-16">
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="font-display text-xl md:text-2xl lg:text-[1.75rem] font-bold leading-[1.25] tracking-[-0.01em] text-foreground max-w-2xl">
            {headline}
          </p>
          <Link
            to={to}
            className="group shrink-0 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, hsl(225 85% 55%) 0%, hsl(275 75% 55%) 50%, hsl(345 85% 55%) 100%)",
              boxShadow: "0 10px 30px hsl(275 75% 55% / 0.3)",
            }}
          >
            {label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   1 · SHOWFORMATE — Editorial magazine layout
   ═══════════════════════════════════════════════════════════ */
/* Story: Du weißt was dich erwartet. Jetzt wird's konkret —
   welches Format passt zu deinem Event?
   Übergang zu Comedy: "Alle vier haben eines gemeinsam: Es ist anders als du denkst" */
const ShowformateSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const formate = [
    {
      img: heroStageImg,
      title: "Bühnenshow",
      sub: "Das zentrale Highlight",
      desc: "Eine durchkomponierte Performance mit Comedy, Staunen und Momenten für das gesamte Publikum.",
      link: "/buehnenshow",
      objectPos: "object-[center_25%]",
      duration: "15–60 Min",
    },
    {
      img: heroCloseupImg,
      title: "Close-Up",
      sub: "Direkt bei deinen Gästen",
      desc: "Zauberkunst zum Anfassen — bei Empfängen, Dinner oder zwischendurch.",
      link: "/close-up",
      objectPos: "object-[center_30%]",
      duration: "30–90 Min",
    },
    {
      img: heroDinnerImg,
      title: "Magic Dinner",
      sub: "Kulinarik trifft Magie",
      desc: "Zwischen den Gängen wird gezaubert — direkt am Tisch. Jeder Gang wird zum Event.",
      link: "/magic-dinner",
      objectPos: "object-[center_40%]",
      duration: "2–3 Stunden",
    },
    {
      img: moderatorImg,
      title: "Moderation",
      sub: "Durch den Abend",
      desc: "Ich führe deine Gäste charmant durch Programm, Reden und Show-Highlights.",
      link: "/moderation",
      objectPos: "object-[center_15%]",
      duration: "nach Absprache",
    },
  ];

  return (
    <section id="showkonzepte" ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-20 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Dein Format
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            So können wir's{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              umsetzen
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Je nach Anlass und Ablauf passt ein anderes Format. Keine Sorge —
            wenn du unsicher bist, besprechen wir das gemeinsam. Hier ein
            Überblick:
          </p>
        </div>

        <ShowformateTabs formate={formate} isVisible={isVisible} />
      </div>
    </section>
  );
};

/* Interactive format switcher — tabs on top, ONE big visual below that swaps */
const ShowformateTabs = ({
  formate,
  isVisible,
}: {
  formate: {
    img: string;
    title: string;
    sub: string;
    desc: string;
    link: string;
    objectPos: string;
    duration: string;
  }[];
  isVisible: boolean;
}) => {
  const [active, setActive] = useState(0);
  const f = formate[active];
  return (
    <div
      className={`${
        isVisible ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: "0.1s" }}
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {formate.map((fmt, i) => (
          <button
            key={fmt.title}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              active === i
                ? "text-white"
                : "text-foreground/70 hover:text-foreground bg-foreground/[0.04] hover:bg-foreground/[0.08]"
            }`}
            style={
              active === i
                ? {
                    background:
                      "linear-gradient(135deg, hsl(225 85% 55%) 0%, hsl(275 75% 55%) 50%, hsl(345 85% 55%) 100%)",
                    boxShadow: "0 8px 24px hsl(275 75% 55% / 0.3)",
                  }
                : undefined
            }
          >
            {fmt.title}
          </button>
        ))}
      </div>

      {/* Showcase panel — big photo left, rich text right */}
      <div
        className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch overflow-hidden"
        style={{ borderRadius: "0.75rem" }}
      >
        {/* Image */}
        <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
          <img
            key={f.img}
            src={f.img}
            alt={f.title}
            className={`absolute inset-0 w-full h-full object-cover ${f.objectPos} animate-fade-in`}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, hsl(340 85% 55% / 0.3) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, hsl(225 85% 50% / 0.25) 0%, transparent 55%)",
              mixBlendMode: "screen",
            }}
          />
          {/* Duration badge */}
          <div
            className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 text-[11px] tracking-[0.1em] uppercase text-white font-semibold"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            {f.duration}
          </div>
        </div>

        {/* Text content */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-foreground/[0.02] p-8 md:p-10">
          <div>
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold"
              style={{
                background:
                  "linear-gradient(100deg, hsl(225 78% 45%), hsl(275 65% 45%), hsl(345 75% 45%))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {f.sub}
            </p>
            <h3
              key={f.title}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-[1.05] text-foreground mb-5 animate-fade-in"
            >
              {f.title}
            </h3>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.6]">
              {f.desc}
            </p>
          </div>

          <Link
            to={f.link}
            className="group mt-8 inline-flex items-center gap-2 font-display font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors self-start"
          >
            Details zu {f.title}
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · ANLASS — Photo grid: "Dein Event"
   Story: Von Hero kommend — "Welcher Anlass ist deiner?"
   Übergang zu Moment: "Und so fühlt es sich an, egal welchen du wählst"
   ═══════════════════════════════════════════════════════════ */
const AnlassSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const anlaesse = [
    {
      img: hochzeitStockImg,
      icon: Heart,
      title: "Hochzeiten",
      desc: "Der Moment, der eure Feier zum Tagesgespräch macht.",
      link: "/hochzeit",
      pos: "object-[center_30%]",
    },
    {
      img: firmenfeierImg,
      icon: Building2,
      title: "Firmenfeiern",
      desc: "Entertainment, das Gäste verbindet — nicht langweilt.",
      link: "/firmenfeiern",
      pos: "object-[center_40%]",
    },
    {
      img: geburtstagImg,
      icon: PartyPopper,
      title: "Geburtstage",
      desc: "Das Highlight, das deine Feier von allen anderen unterscheidet.",
      link: "/geburtstage",
      pos: "object-[center_40%]",
    },
    {
      img: heroStageImg,
      icon: Trophy,
      title: "Galas & Awards",
      desc: "Elegantes Entertainment auf höchstem Niveau.",
      link: "/buchung",
      pos: "object-[center_35%]",
    },
    {
      img: audienceImg,
      icon: Presentation,
      title: "Messen & Promotions",
      desc: "Magie, die Aufmerksamkeit erzeugt — euer Stand zum Magneten.",
      link: "/buchung",
      pos: "object-[center_40%]",
    },
    {
      img: weddingImg,
      icon: Heart,
      title: "Private Feiern",
      desc: "Vom Jubiläum bis zum Abschied — persönlich und unvergesslich.",
      link: "/buchung",
      pos: "object-[center_35%]",
    },
  ];

  return (
    <section id="anlaesse" ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Dein Event
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Fangen wir mit{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              dir an
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Welchen Anlass planst du? Such dir deinen raus — die Liste links
            zeigt rechts, wie's bei dir aussehen könnte.
          </p>
        </div>

        <AnlassInteractive items={anlaesse} isVisible={isVisible} />
      </div>
    </section>
  );
};

/* Interactive list: hover changes the single big image on the right */
const AnlassInteractive = ({
  items,
  isVisible,
}: {
  items: {
    img: string;
    icon: any;
    title: string;
    desc: string;
    link: string;
    pos: string;
  }[];
  isVisible: boolean;
}) => {
  const [active, setActive] = useState(0);
  const a = items[active];
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Left: editorial list */}
      <div
        className={`lg:col-span-7 ${
          isVisible ? "animate-slide-left" : "opacity-0"
        }`}
      >
        {items.map((item, i) => (
          <Link
            key={item.title}
            to={item.link}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`group block border-t border-foreground/10 last:border-b py-6 md:py-7 -mx-4 px-4 transition-all duration-300 ${
              active === i
                ? "bg-foreground/[0.03]"
                : "hover:bg-foreground/[0.02]"
            }`}
          >
            <div className="flex items-start gap-5">
              <span
                className={`font-mono text-[11px] pt-2 w-8 tabular-nums transition-colors ${
                  active === i ? "text-foreground" : "text-foreground/40"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <item.icon
                className={`w-6 h-6 shrink-0 mt-0.5 transition-colors ${
                  active === i ? "text-foreground" : "text-foreground/60"
                }`}
              />
              <div className="flex-1">
                <h3
                  className={`font-display text-xl md:text-2xl font-bold mb-1 transition-colors ${
                    active === i ? "text-foreground" : "text-foreground/85"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-sm md:text-[15px] text-foreground/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <ArrowUpRight
                className={`w-5 h-5 shrink-0 mt-1 transition-all ${
                  active === i
                    ? "text-foreground translate-x-0.5 -translate-y-0.5"
                    : "text-foreground/25 group-hover:text-foreground/70"
                }`}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Right: single big image that swaps based on active */}
      <div
        className={`lg:col-span-5 lg:sticky lg:top-24 ${
          isVisible ? "animate-slide-right" : "opacity-0"
        }`}
        style={{ animationDelay: "0.15s" }}
      >
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={{ borderRadius: "0.5rem" }}
        >
          <img
            key={a.img}
            src={a.img}
            alt={a.title}
            className={`absolute inset-0 w-full h-full object-cover ${a.pos} animate-fade-in`}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,10,25,0.7) 0%, rgba(15,10,25,0.1) 50%, transparent 80%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at 85% 15%, hsl(340 85% 55% / 0.4) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, hsl(225 85% 50% / 0.3) 0%, transparent 55%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-2 font-semibold">
              {String(active + 1).padStart(2, "0")} · Dein Anlass
            </p>
            <h4 className="font-display text-2xl md:text-3xl font-black leading-[1.1]">
              {a.title}
            </h4>
          </div>
          <div
            aria-hidden
            className="absolute left-6 right-6 bottom-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, hsl(225 85% 65%), hsl(280 75% 65%), hsl(340 90% 65%))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · MOMENT — Quiet editorial statement
   ═══════════════════════════════════════════════════════════ */
/* Full-bleed, cinematic. Story: Nach Selbst-Selektion zeigt diese Section
   was bei ALLEN Anlässen das Gemeinsame ist — der Moment.
   Übergang zum Video: "Glaubst du nicht? Sieh selbst." */
const MomentSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-44 lg:py-52 text-white"
    >
      {/* Full-bleed bg — staunende Gäste */}
      <div className="absolute inset-0">
        <img
          src={staunenImg}
          alt=""
          className="w-full h-full object-cover object-center scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(15,10,25,0.86) 0%, rgba(30,15,45,0.7) 50%, rgba(15,10,25,0.4) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container px-6">
        <div
          className={`max-w-3xl ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-white/60 mb-8">
            Was dann passiert
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.25rem,6vw,5.5rem)]">
            Ein Moment — und alle{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(225 95% 78%) 0%, hsl(285 85% 78%) 50%, hsl(340 95% 78%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              reden darüber
            </span>
            .
          </h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Etwas passiert direkt vor ihren Augen, das sie sich nicht erklären
            können. Alle schauen sich an, lachen, schütteln den Kopf. Und ab
            diesem Moment ist klar: Diesen Abend vergessen sie nicht.
          </p>
          <p className="mt-5 text-base md:text-lg text-white/65 max-w-xl">
            Nicht vergleichbar mit einer Show aus dem Fernsehen. Das passiert
            live. Mit ihnen. Mit ihren Händen.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · VIDEO — Restrained frame, no glow
   ═══════════════════════════════════════════════════════════ */
/* Story: Du kannst dir das vorstellen — aber sehen ist besser. Hier zwei Minuten.
   Übergang zu Formate: "Das war ein Format. Welches passt zu dir?" */
const VideoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-24 md:py-32 lg:py-40"
    >
      {/* Soft pastel washes for hint of colour */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(340 85% 88%) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-45 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(225 85% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative z-10 container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: text + stat cards */}
          <div
            className={`lg:col-span-4 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-foreground/45 mb-6">
              Im TV
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,3.75rem)] text-foreground">
              Wer steht{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                hier vor dir?
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-[1.6] text-foreground/65 font-light">
              Ein TV-Interview, das einen ehrlichen Blick hinter die Kulissen
              gibt — über Magie, Comedy und warum diese Kombination so gut
              funktioniert.
            </p>

            {/* Context tags */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: "TV", l: "Format" },
                { v: "2024", l: "Jahr" },
                { v: "Live", l: "Aufnahme" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(0,0,0,0.025)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <p className="font-display text-lg font-black tabular-nums text-foreground">
                    {s.v}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-foreground/50 mt-0.5">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: video with gradient frame */}
          <div
            className={`lg:col-span-8 ${
              isVisible ? "animate-scale-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative">
              {/* Subtle gradient glow behind video */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[1rem] opacity-30 blur-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(225 85% 65% / 0.5), hsl(275 75% 65% / 0.5), hsl(345 85% 65% / 0.5))",
                }}
              />
              <div
                className="relative video-container overflow-hidden"
                style={{
                  borderRadius: "0.75rem",
                  boxShadow:
                    "0 40px 80px -20px rgba(40,20,60,0.25), 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/R0_mXGxzC9E"
                  title="Emilian Leber — TV-Interview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {/* Caption strip */}
              <div className="mt-4 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-foreground/50">
                <span>TV-Interview</span>
                <span
                  aria-hidden
                  className="flex-1 mx-4 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(225 78% 60% / 0.4), hsl(275 65% 60% / 0.6), hsl(345 75% 60% / 0.4))",
                  }}
                />
                <span>Talents of Magic · 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · ZAHLEN — editorial, not dashboard
   ═══════════════════════════════════════════════════════════ */
const StatBlock = ({
  end,
  suffix,
  label,
  desc,
}: {
  end: number;
  suffix: string;
  label: string;
  desc: string;
}) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref}>
      <p className="font-display font-black leading-none tabular-nums text-foreground text-[clamp(3rem,6vw,5.5rem)] tracking-[-0.02em]">
        {count}
        {suffix}
      </p>
      <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/50 mt-4">
        {label}
      </p>
      <p className="mt-3 text-sm text-foreground/60 max-w-[220px] leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

const ZahlenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div
          className={`max-w-2xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Fakten
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Zahlen, die{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              sprechen
            </span>
            .
          </h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          <StatBlock
            end={200}
            suffix="+"
            label="Events"
            desc="Auftritte auf Bühnen jeder Größe, seit 2014."
          />
          <StatBlock
            end={10}
            suffix="+"
            label="Jahre Erfahrung"
            desc="Über zehn Jahre Routine — auch unter Druck."
          />
          <StatBlock
            end={100}
            suffix="%"
            label="Weiterempfehlung"
            desc="Fast jeder Kunde empfiehlt mich direkt weiter."
          />
          <StatBlock
            end={30}
            suffix="+"
            label="5★ Bewertungen"
            desc="Durchgehend Top-Bewertungen auf Google & ProvenExpert."
          />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · COMEDY + MAGIE — editorial split, no drop-cap
   ═══════════════════════════════════════════════════════════ */
const ComedySection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-5 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "0.5rem",
                aspectRatio: "4 / 5",
                boxShadow:
                  "0 40px 80px -30px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <img
                src={magicDinnerBookImg}
                alt="Zaubershow beim Magic Dinner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div
            className={`lg:col-span-7 lg:pl-6 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Der Unterschied
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4.2vw,3.75rem)] text-foreground">
              Moderne Zauberkunst.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Mit Humor.
              </span>
            </h2>
            <p className="mt-7 text-lg md:text-xl leading-[1.55] text-foreground/80 font-light max-w-2xl">
              Interaktiv, persönlich und auf Augenhöhe mit den Gästen.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65 max-w-2xl">
              Deine Gäste sind nicht Zuschauer, sondern Teil der Show.
              Sie mischen Karten, halten Objekte in der Hand, wählen frei
              aus — und erleben genau dabei den Moment, den sie sich nicht
              erklären können.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65 max-w-2xl">
              Dazu kommt Comedy. Nicht als Gag zwischendurch, sondern als Teil
              der Performance. Gelacht wird über die Situation, nicht über
              einzelne Gäste — niemand wird vorgeführt.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65 max-w-2xl">
              Das funktioniert bei jedem Publikum, in jeder Altersgruppe.
              Staunen ist eine universelle Sprache.
            </p>
            <Link
              to="/comedy-zauberei"
              className="group mt-8 inline-flex items-center gap-2 font-display font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors"
            >
              Mehr über Comedy-Zauberei
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · STIMMEN — Pull quote hero + logo wall
   ═══════════════════════════════════════════════════════════ */
/* Story: Genug von mir geredet. Was sagen die, die schon dabei waren?
   Übergang zu Über mich: "Und der Mensch dahinter — wer ist das?" */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();

  const reviews = [
    {
      quote:
        "Es war einfach Mega! 200 Gäste eines bayerischen Versicherungsunternehmens — Emilian hat mit seiner eigens entwickelten Zaubertrickshow alle begeistert.",
      author: "Jan von Lehmann",
      role: "Wächter Agentur",
      anlass: "Firmenfeier · 200 Gäste",
      initial: "J",
      tint: "hsl(225 70% 55%)",
    },
    {
      quote:
        "Wirklich großartig! Mit viel Charme und Witz hat er alle Hochzeitsgäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass.",
      author: "Katrin Raß",
      role: "Hochzeitsplanerin",
      anlass: "Hochzeit · München",
      initial: "K",
      tint: "hsl(340 75% 55%)",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung sehr professionell. Gerne wieder!",
      author: "Martina Senftl",
      role: "Eventkundin",
      anlass: "Privatfeier",
      initial: "M",
      tint: "hsl(280 70% 55%)",
    },
  ];

  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        {/* Hero rating block */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="max-w-3xl">
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Bewertungen
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
              Stimmen aus dem{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Publikum
              </span>
              .
            </h2>
          </div>

          {/* Big rating block */}
          <div className="flex items-center gap-5 shrink-0">
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/65">
                <strong className="font-display text-2xl text-foreground tracking-[-0.02em] tabular-nums">
                  5,0
                </strong>{" "}
                · 30+ Bewertungen
              </p>
            </div>
            <div className="h-12 w-px bg-foreground/10" />
            <div className="text-sm text-foreground/65">
              <p className="font-semibold text-foreground">Google</p>
              <p>ProvenExpert</p>
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((r, i) => (
            <article
              key={r.author}
              className={`relative bg-white p-7 md:p-8 flex flex-col h-full ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{
                animationDelay: `${0.15 + i * 0.1}s`,
                borderRadius: "0.75rem",
                boxShadow:
                  "0 20px 50px -25px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Top accent gradient line */}
              <div
                aria-hidden
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(225 85% 65%), hsl(280 75% 65%), hsl(340 90% 65%))",
                }}
              />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[15px] md:text-base leading-[1.6] text-foreground/85 flex-1">
                „{r.quote}"
              </p>

              {/* Footer with avatar */}
              <footer className="mt-6 pt-6 border-t border-foreground/8 flex items-center gap-3">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-white text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${r.tint}, hsl(280 70% 55%))`,
                  }}
                >
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-foreground text-sm">
                    {r.author}
                  </p>
                  <p className="text-[12px] text-foreground/55 truncate">
                    {r.anlass}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        {/* CTA to all reviews */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/referenzen"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors"
          >
            Alle 30+ Bewertungen ansehen
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Logo wall as footer of trust */}
        <div className="mt-20 pt-10 border-t border-foreground/8">
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/40 mb-6 text-center">
            Vertrauen namhafter Kunden
          </p>
        </div>
      </div>
      <ClientLogos title="" className="!py-0 -mt-2" />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · ABLAUF — Editorial numbered steps
   ═══════════════════════════════════════════════════════════ */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    {
      num: "01",
      title: "Anfrage",
      desc: "Du schickst mir eine unverbindliche Anfrage — per Formular, E-Mail oder Telefon. Ich melde mich innerhalb von 24 Stunden.",
    },
    {
      num: "02",
      title: "Beratung",
      desc: "Wir besprechen dein Event persönlich: Anlass, Ablauf, Wünsche. Ich berate dich, welches Format am besten passt.",
    },
    {
      num: "03",
      title: "Konzept",
      desc: "Du erhältst ein maßgeschneidertes Angebot mit klarem Konzept — transparent, ohne versteckte Kosten.",
    },
    {
      num: "04",
      title: "Show",
      desc: "Am Tag deines Events bin ich pünktlich vor Ort, kümmere mich um alles und sorge für unvergessliche Momente.",
    },
  ];

  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-2xl mb-14 md:mb-20 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Ablauf
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            So{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              einfach
            </span>{" "}
            ist das.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-[1.55] text-foreground/65 font-light">
            Kein Aufwand für dich. Ich bringe Technik, Requisiten und
            Erfahrung mit. Du schickst eine Anfrage und genießt den Abend.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              <p className="font-display text-5xl font-black text-foreground/15 tabular-nums mb-4">
                {s.num}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                {s.title}
              </h3>
              <p className="text-sm md:text-base text-foreground/65 leading-relaxed max-w-[280px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className={`mt-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <Link
            to="/buchung"
            className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-white bg-foreground hover:bg-foreground/90 transition-transform hover:scale-[1.01]"
          >
            Jetzt Anfrage starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   9 · ÜBER MICH — editorial split
   ═══════════════════════════════════════════════════════════ */
const UeberMichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="ueber-mich" ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-5 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "0.5rem",
                aspectRatio: "4 / 5",
                boxShadow:
                  "0 40px 80px -30px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <img
                src={portraitImg}
                alt="Emilian Leber — Zauberer & Showkünstler"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div
            className={`lg:col-span-7 lg:pl-6 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Über mich
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4.2vw,3.75rem)] text-foreground">
              Hi, ich bin{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Emilian
              </span>
              .
            </h2>
            <p className="mt-7 text-lg md:text-xl leading-[1.55] text-foreground/80 font-light max-w-2xl">
              Moderner Zauberer, Showkünstler und kreativer Kopf hinter MagicEL.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65 max-w-2xl">
              Seit über zehn Jahren bringe ich Menschen zum Staunen — und zum
              Lachen. Nicht mit Zylinder und Kaninchen, sondern mit einer
              einzigartigen Mischung aus moderner Zauberkunst, Psychologie und
              Comedy.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65 max-w-2xl">
              Für mich ist jeder Auftritt eine Geschichte, die ich gemeinsam mit
              dem Publikum erzähle. Interaktiv, persönlich und immer mit dem
              Ziel, Momente zu schaffen, die Menschen verbinden.
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {[
                "Finalist Talents of Magic",
                "200+ Events",
                "10+ Jahre Bühne",
                "TV & Medien",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-foreground/15 text-foreground/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to="/ueber-mich"
              className="mt-8 inline-flex items-center gap-2 font-display font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors group"
            >
              Mehr über mich
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   10 · FAQ — clean accordion
   ═══════════════════════════════════════════════════════════ */
const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    {
      q: "Was kostet ein Auftritt?",
      a: "Die Kosten hängen vom Format, der Dauer und dem Anlass ab. Für Hochzeiten beginnen meine Pakete ab 395€. Nach deiner Anfrage erstelle ich dir ein transparentes Angebot.",
    },
    {
      q: "Wie weit im Voraus sollte ich buchen?",
      a: "So früh wie möglich — beliebte Termine sind schnell vergeben. Ideal sind 3–6 Monate Vorlauf, aber auch kurzfristige Anfragen sind möglich.",
    },
    {
      q: "Wie lange dauert ein Auftritt?",
      a: "Das hängt vom Format ab: Close-Up typischerweise 30–90 Min., Bühnenshows 15–60 Min. Wir finden die perfekte Länge für deinen Ablauf.",
    },
    {
      q: "Wo trittst du auf?",
      a: "Überall! Mein Schwerpunkt liegt in Bayern und Süddeutschland, aber ich bin deutschlandweit und auf Wunsch auch international buchbar.",
    },
  ];

  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div
            className={`lg:col-span-4 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              FAQ
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4vw,3.5rem)] text-foreground">
              Häufige{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fragen
              </span>
              .
            </h2>
            <p className="mt-6 text-base leading-[1.6] text-foreground/65 max-w-sm">
              Du hast eine andere Frage? Schreib mir — ich antworte persönlich
              innerhalb von 24h.
            </p>
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-2 font-display font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors group"
            >
              Alle Fragen
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div
            className={`lg:col-span-8 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
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
   11 · FINAL CTA — full-bleed image + dark overlay (matches hero)
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-white py-28 md:py-36 lg:py-44"
    >
      <div className="absolute inset-0">
        <img
          src={buehneZuschauerImg}
          alt=""
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(15,10,25,0.88) 0%, rgba(15,10,25,0.7) 50%, rgba(15,10,25,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container px-6">
        <div
          className={`max-w-3xl ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/60 mb-8">
            Bereit?
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.5rem,6vw,5.5rem)] text-white">
            Mach dein Event{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              unvergesslich
            </span>
            .
          </h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Erzähl mir in 2 Minuten von deinem Event. Ich melde mich innerhalb
            24h mit einem konkreten Vorschlag — kostenlos, unverbindlich. Kein
            Vertrag, kein Druck. Nur Magie, wenn es passt.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <span>Jetzt anfragen</span>
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
            Kostenlos · Unverbindlich · Antwort innerhalb von 24h
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · So läuft es ab — Edukation für Laien
   Story: User hat den Moment gesehen — wie genau passiert das jetzt bei seinem Event?
   Übergang zu Video: "...und so sieht das in Echt aus"
   ═══════════════════════════════════════════════════════════ */
const SoLaeuftEsAbSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    {
      icon: Clock,
      time: "Vor dem Event",
      title: "Ankunft & Setup",
      desc: "Ich komme rechtzeitig, oft schon 1–2 Stunden vor Showbeginn. Du musst nichts vorbereiten — Technik, Requisiten, alles ist dabei.",
    },
    {
      icon: Users,
      time: "Empfang",
      title: "Mingle & Close-Up",
      desc: "Während Sekt fließt und Gäste ankommen, mische ich mich unters Publikum. Kleine Wunder direkt vor ihren Augen — der perfekte Eisbrecher.",
    },
    {
      icon: Sparkles,
      time: "Höhepunkt",
      title: "Showtime",
      desc: "Bühnenshow, Tisch-Magie zwischen den Gängen oder Walking-Act — je nach Format. Hier passieren die Momente, von denen alle reden werden.",
    },
    {
      icon: MessageCircle,
      time: "Nach der Show",
      title: "Der Nachklang",
      desc: "Ich bleibe noch da. Gäste haben Fragen, wollen Fotos, erzählen sich gegenseitig was passiert ist. Der Abend bekommt seinen Soundtrack.",
    },
  ];

  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            So läuft es ab
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was bei deinem Event{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              wirklich passiert
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Damit du genau weißt, was dich erwartet — hier der typische Ablauf
            eines Auftritts. Keine Überraschungen, keine versteckten
            Anforderungen.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative p-7 md:p-8"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: "0.75rem",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(225 78% 92%), hsl(280 70% 92%), hsl(340 80% 92%))",
                }}
              >
                <s.icon
                  className="w-5 h-5"
                  style={{ color: "hsl(280 60% 40%)" }}
                />
              </div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2"
                style={{
                  background:
                    "linear-gradient(100deg, hsl(225 78% 50%), hsl(275 65% 50%), hsl(345 75% 50%))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.time}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-black mb-3 text-foreground leading-[1.15]">
                {s.title}
              </h3>
              <p className="text-sm leading-[1.6] text-foreground/65">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · Bekannt aus — Authority via Presse/TV/Awards
   Story: Andere haben mich schon gesehen, das gibt dir Sicherheit.
   ═══════════════════════════════════════════════════════════ */
const BekanntAusSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { label: "The Greatest Talent", sub: "Kabel Eins · Finalist" },
    { label: "Talents of Magic", sub: "Finalist · Wettbewerb" },
    { label: "Kreativpreis", sub: "Preisträger" },
    { label: "idowa", sub: "Feature · 2024" },
    { label: "Bayerisches Fernsehen", sub: "TV-Auftritt" },
    { label: "Oktoberfest München", sub: "Auftritt · 2023" },
  ];

  return (
    <section ref={ref} className="bg-white section-medium border-y border-foreground/8">
      <div className="container px-6">
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-4">
              Bekannt aus
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(1.75rem,3.5vw,2.5rem)] text-foreground max-w-2xl">
              In{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TV, Presse & Wettbewerben
              </span>
              .
            </h2>
          </div>
          <Link
            to="/presse"
            className="group shrink-0 inline-flex items-center gap-2 font-display text-sm font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors self-start md:self-end"
          >
            Pressebereich
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {items.map((item) => (
            <div
              key={item.label}
              className="p-5 flex flex-col justify-center transition-all hover:bg-foreground/[0.02]"
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.5rem",
                minHeight: "100px",
              }}
            >
              <Award className="w-4 h-4 text-foreground/40 mb-3" />
              <p className="font-display text-sm font-bold text-foreground leading-tight">
                {item.label}
              </p>
              <p className="text-[11px] text-foreground/55 mt-1 leading-tight">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · Sorgen — und Antworten · Einwand-Behandlung
   Story: Ich kenne deine Bedenken. Hier ist was wirklich passiert.
   ═══════════════════════════════════════════════════════════ */
const SorgenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    {
      sorge: "Unsere Gäste sind zu seriös für sowas.",
      antwort:
        "Erfahrungsgemäß sind das die, die am meisten Spaß haben. Vorstandsvorsitzende, Anwälte, Ärzte — alle staunen, sobald die erste Karte verschwindet.",
    },
    {
      sorge: "Wir haben keine Bühne.",
      antwort:
        "Brauchst du nicht. Close-Up funktioniert direkt am Tisch, am Empfang, in der Lobby. Ich passe mich jeder Location an.",
    },
    {
      sorge: "Bei uns ist es eher ruhig & elegant.",
      antwort:
        "Perfekt. Genau dafür ist Close-Up Magie gemacht. Subtil, persönlich, ohne dass die ganze Stimmung gestört wird.",
    },
    {
      sorge: "Wir haben gemischtes Publikum.",
      antwort:
        "Genau dann funktioniert Magie am besten. Vom 8-jährigen Enkel bis zum 80-jährigen Großvater — alle reagieren gleichermaßen begeistert.",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Häufige Sorgen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was viele denken —{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              und was wirklich passiert
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Du bist nicht allein mit deinen Bedenken. Hier die häufigsten —
            und meine ehrliche Antwort darauf.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {items.map((it) => (
            <div
              key={it.sorge}
              className="p-7 md:p-8"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.75rem",
              }}
            >
              {/* Sorge */}
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <XIcon className="w-3.5 h-3.5 text-foreground/55" />
                </div>
                <p className="font-display text-lg md:text-xl font-bold text-foreground/55 line-through-subtle leading-snug">
                  „{it.sorge}"
                </p>
              </div>
              {/* Antwort */}
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(225 85% 55%), hsl(275 75% 55%), hsl(345 85% 55%))",
                  }}
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="font-display text-base md:text-lg font-medium text-foreground leading-[1.5]">
                  {it.antwort}
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
   NEU · Preise — transparent statt fixe Pakete
   Story: Du hast Format und Ablauf gesehen. Frage offen: Was kostet das?
   Antwort: keine Festpreise, aber klar welche Faktoren reinspielen.
   ═══════════════════════════════════════════════════════════ */
const PreisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const faktoren = [
    {
      label: "Anlass & Format",
      desc: "Close-Up, Bühnenshow, Magic Dinner oder Moderation — jedes Format hat seinen eigenen Aufwand.",
    },
    {
      label: "Dauer",
      desc: "30 Minuten Walking-Act oder kompletter Show-Abend? Der Umfang bestimmt mit.",
    },
    {
      label: "Gäste & Location",
      desc: "Intime Runde am Tisch oder 500 Leute auf der Bühne — die Setup-Anforderungen ändern sich.",
    },
    {
      label: "Anreise",
      desc: "Bayern und Süddeutschland sind mein Schwerpunkt. Bundesweit und international auf Anfrage.",
    },
  ];
  const garantien = [
    "Kostenfreies & unverbindliches Angebot",
    "Transparent — keine versteckten Kosten",
    "Antwort innerhalb 24 Stunden",
    "Eigene Technik & Requisiten inklusive",
  ];

  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left intro */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Was kostet das?
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
              Faire Preise.{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Keine Tricks.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-[1.55] text-foreground/65 font-light">
              Jedes Event ist anders, deshalb gibt's keinen Festpreis — sondern
              ein faires Angebot, das exakt zu dir passt. Im Schnitt starten
              kleine Auftritte ab ca. 395 €, größere Show-Abende deutlich
              höher.
            </p>

            <div className="mt-8 space-y-3">
              {garantien.map((g) => (
                <div key={g} className="flex items-center gap-3">
                  <div
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(225 85% 55%), hsl(275 75% 55%), hsl(345 85% 55%))",
                    }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm md:text-[15px] text-foreground/80">
                    {g}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/buchung"
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, hsl(225 85% 55%) 0%, hsl(275 75% 55%) 50%, hsl(345 85% 55%) 100%)",
                boxShadow: "0 10px 30px hsl(275 75% 55% / 0.3)",
              }}
            >
              Kostenloses Angebot anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: factors */}
          <div
            className={`lg:col-span-7 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Wovon der Preis abhängt
            </p>
            <div className="space-y-3">
              {faktoren.map((f, i) => (
                <div
                  key={f.label}
                  className="flex items-start gap-5 p-6 md:p-7"
                  style={{
                    background: "rgba(0,0,0,0.02)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "0.75rem",
                  }}
                >
                  <span
                    className="font-display text-2xl font-black shrink-0 tabular-nums leading-none mt-0.5"
                    style={{
                      background:
                        "linear-gradient(100deg, hsl(225 88% 60%), hsl(285 78% 60%), hsl(340 90% 60%))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1.5">
                      {f.label}
                    </h3>
                    <p className="text-sm md:text-[15px] text-foreground/65 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   INDEX
   ═══════════════════════════════════════════════════════════ */
const Index = () => {
  return (
    <>
      <Helmet>
        <title>Zauberer für Hochzeiten &amp; Events – Emilian Leber</title>
        <meta
          name="description"
          content="Emilian Leber ist Ihr Zauberer für Hochzeiten, Firmenfeiern und Events. Interaktive Magie & Comedy – unvergesslich, professionell, deutschlandweit buchbar."
        />
        <link rel="canonical" href="https://www.magicel.de/" />
        <meta property="og:title" content="Zauberer für Hochzeiten & Events – Emilian Leber" />
        <meta property="og:description" content="Emilian Leber ist Ihr Zauberer für Hochzeiten, Firmenfeiern und Events. Interaktive Magie & Comedy – unvergesslich, professionell, deutschlandweit buchbar." />
        <meta property="og:url" content="https://www.magicel.de/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zauberer für Hochzeiten & Events – Emilian Leber" />
        <meta name="twitter:description" content="Emilian Leber ist Ihr Zauberer für Hochzeiten, Firmenfeiern und Events. Interaktive Magie & Comedy – unvergesslich, professionell, deutschlandweit buchbar." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Emilian Leber – Zauberer & Showkünstler",
          "url": "https://www.magicel.de",
          "description": "Zauberer für Hochzeiten, Firmenfeiern und Events. Interaktive Magie & Comedy – deutschlandweit buchbar.",
          "telephone": "+4915563744696",
          "email": "el@magicel.de",
          "address": { "@type": "PostalAddress", "addressCountry": "DE" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "bestRating": "5", "worstRating": "1", "reviewCount": "34" },
        })}</script>
      </Helmet>

      <Navigation />

      <main>
        <LandingHero />

        {/* 2. Relevanz — Anlass-Selbst-Selektion */}
        <SectionDivider />
        <AnlassSection />

        {/* 3. Emotionaler Hook */}
        <SectionDivider />
        <MomentSection />

        {/* 4. NEU: Edukation — was passiert konkret */}
        <SectionDivider />
        <SoLaeuftEsAbSection />

        {/* 5. Beweis durch sehen — TV-Interview */}
        <SectionDivider />
        <VideoSection />

        {/* 6. Auswahl — Formate */}
        <SectionDivider />
        <ShowformateSection />

        {/* 7. Differenzierung */}
        <SectionDivider />
        <ComedySection />

        {/* 8. NEU: Authority — TV/Presse/Awards */}
        <BekanntAusSection />

        {/* 9. Hard Proof — Zahlen */}
        <SectionDivider />
        <ZahlenSection />

        {/* 10. Soft Proof — Stimmen + Logos */}
        <SectionDivider />
        <StimmenSection />

        {/* 11. NEU: Einwand-Behandlung — Sorgen + Antworten */}
        <SectionDivider />
        <SorgenSection />

        {/* 12. Person hinter der Show */}
        <SectionDivider />
        <UeberMichSection />

        {/* 13. Prozess */}
        <SectionDivider />
        <AblaufSection />

        {/* 14. NEU: Preise — transparent, keine Festpakete */}
        <SectionDivider />
        <PreisSection />

        {/* 15. FAQ */}
        <SectionDivider />
        <FAQSection />

        {/* 16. Final */}
        <FinalCTA />
      </main>

      <Footer />
      <Chatbot />
      <WhatsAppButton />
    </>
  );
};

export default Index;
