import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staedte, type KollegenEmpfehlung, type Stadt } from "@/data/staedte";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  MapPin,
  Trophy,
  Award,
  Medal,
  Tv,
  Sparkles,
  Heart,
  Building2,
  Cake,
  Briefcase,
  PartyPopper,
  Users,
  GraduationCap,
  Quote,
  ChevronDown,
  ChevronUp,
  Wine,
  Utensils,
  CheckCircle2,
} from "lucide-react";

import heroStartImg from "@/assets/hero-start.jpg";
import closeupImg from "@/assets/closeup.jpg";
import stageImg from "@/assets/buehne-zuschauer.jpg";
import dinnerImg from "@/assets/emilian-magic-dinner.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import staunenImg from "@/assets/staunen.jpg";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { CustomQuizSection, CustomQuizConfig } from "@/components/landing/CustomQuiz";
import { TVA_VIDEO_ID } from "@/lib/videos";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";

/* ═══════════════════════════════════════════════════════════
   SEO Keywords — pro Stadt durchsubstituiert
   ═══════════════════════════════════════════════════════════ */
const keywordList = (name: string): string =>
  [
    `Zauberer ${name}`,
    `Zauberkünstler ${name}`,
    `Magier ${name}`,
    `Hochzeitszauberer ${name}`,
    `Zauberer Hochzeit ${name}`,
    `Zauberer Firmenfeier ${name}`,
    `Firmenzauberer ${name}`,
    `Zauberer Geburtstag ${name}`,
    `Tischzauberer ${name}`,
    `Close-Up Zauberer ${name}`,
    `Walk-Around Zauberer ${name}`,
    `Bühnenshow ${name}`,
    `Magic Dinner ${name}`,
    `Mentalist ${name}`,
    `Mentalmagier ${name}`,
    `Comedy-Zauberer ${name}`,
    `Zaubershow ${name}`,
    `Zauberer buchen ${name}`,
    `Zauberer mieten ${name}`,
    `Eventzauberer ${name}`,
    `Tischmagie ${name}`,
    `Hochzeit Zauberer ${name}`,
    `Firmenfeier Magier ${name}`,
    `Moderator mit Magie ${name}`,
    `Zauberer in der Nähe`,
  ].join(", ");

/* ═══════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroZoomIn { from { transform: scale(1.18); opacity: 0.35; filter: blur(8px); } to { transform: scale(1.02); opacity: 1; filter: blur(0); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    @keyframes heroOvershoot { 0% { opacity: 0; transform: translateY(60px) scale(0.88); } 55% { opacity: 1; transform: translateY(-10px) scale(1.04); } 80% { transform: translateY(2px) scale(0.99); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-zoom { animation: heroZoomIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform-origin: center center; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .hero-overshoot { opacity: 0; animation: heroOvershoot 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-cta { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background-color .3s, color .3s; }
    .hero-cta:hover { transform: translateY(-2px) scale(1.035); }
    .hero-cta:active { transform: translateY(0) scale(0.97); }
    .hero-photo-wrap { transform: translateY(var(--hero-parallax, 0px)); transition: transform 0.05s linear; }
  `}</style>
);

const BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

const Hero = ({ data }: { data: Stadt }) => {
  const photoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 1) return;
      lastY = y;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = photoRef.current;
        if (el && y < window.innerHeight * 1.4)
          el.style.setProperty("--hero-parallax", `${Math.min(y * 0.18, 80)}px`);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const HEADLINE_SANS = ["Zauberer", "in"];
  return (
    <section className="relative bg-[#08060c] text-white min-h-screen overflow-hidden">
      <HeroKeyframes />
      <div
        ref={photoRef}
        className="absolute inset-0 hero-photo-wrap hero-zoom"
        style={{ willChange: "transform" }}
      >
        <img
          src={heroStartImg}
          alt={`Zauberer ${data.name} — Emilian Leber auf Events in ${data.name}`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 30%",
            filter: "brightness(0.78)",
          }}
          loading="eager"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 30%, rgba(8,6,12,0.5) 60%, rgba(8,6,12,0.25) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full hero-bokeh"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              background: `radial-gradient(circle, rgba(255,210,140,${b.o * 0.5}) 0%, rgba(255,210,140,${b.o * 0.4}) 40%, rgba(255,210,140,0) 75%)`,
              filter: "blur(2px)",
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 min-h-screen container px-6 flex flex-col pt-28 md:pt-32 pb-10 md:pb-20">
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <div
            className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-2 mb-8 hero-fade"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-300 text-amber-300 hero-star"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-white/85">
                <strong className="font-semibold text-white">5,0</strong>
                <span className="text-white/60"> · 30+ Bewertungen</span>
              </span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span className="text-sm text-white/80 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <strong className="font-semibold text-white">{data.name}</strong>
              <span className="text-white/55">· {data.region}</span>
            </span>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-300">
              <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              Termine 2026 frei
            </span>
          </div>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (
              <span
                key={`s-${i}`}
                className="hero-word"
                style={{
                  animationDelay: `${0.3 + i * 0.08}s`,
                  marginRight: "0.22em",
                }}
              >
                {w}
              </span>
            ))}
            <br className="hidden sm:block" />
            <span
              className={`hero-word ${SERIF_ITALIC}`}
              style={{
                animationDelay: `${0.3 + HEADLINE_SANS.length * 0.08}s`,
                paddingRight: "0.15em",
                color: "#f3d9a8",
              }}
            >
              {data.name}.
            </span>
          </h1>
          <p
            className="mt-8 md:mt-10 max-w-2xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade"
            style={{ animationDelay: "1.05s" }}
          >
            {data.intro}
          </p>
          <div
            className="mt-10 inline-flex flex-col sm:flex-row items-start gap-4 hero-fade"
            style={{ animationDelay: "1.2s" }}
          >
            <Link
              to={`/buchung?ort=${encodeURIComponent(data.name)}`}
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Zauberer {data.name} anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#showkonzepte"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Showkonzepte ansehen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div
            className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]"
            style={{ animationDelay: "2.0s" }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                200+
              </strong>
              <span className="text-white/65">Events</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                5,0★
              </strong>
              <span className="text-white/65">30+ Bewertungen</span>
            </span>
            {data.einwohner && (
              <>
                <span aria-hidden className="text-white/30">·</span>
                <span className="inline-flex items-baseline gap-1.5">
                  <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                    {data.einwohner}
                  </strong>
                  <span className="text-white/65">{data.name}er</span>
                </span>
              </>
            )}
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">24h Antwort</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WARUM-STADT — Editorial Split
   ═══════════════════════════════════════════════════════════ */
const WarumStadtSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
          <div
            className={`lg:col-span-6`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Zauberer · Zauberkünstler · Magier · Mentalist.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground mb-8">
              Warum einen Zauberer in{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                {data.name}
              </span>{" "}
              buchen?
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.7] mb-6">
              {data.highlight}
            </p>
            {data.seoText && (
              <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8">
                {data.seoText}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Close-Up Magie",
                "Bühnenshow",
                "Magic Dinner",
                "Mentalmagie",
                "Comedy-Zauberei",
                "Moderation mit Magie",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold text-foreground/70 bg-[hsl(0,0%,98%)] border border-foreground/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div
            className={`lg:col-span-6`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "1.5rem" }}
            >
              <img
                src={audienceImg}
                alt={`Publikum reagiert auf den Zauberer in ${data.name}`}
                className="w-full h-[420px] md:h-[540px] object-cover"
                loading="lazy"
                style={{
                  filter: "saturate(0.95) brightness(0.94)",
                  objectPosition: "center 30%",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-40"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.65))",
                }}
              />
              <div
                className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white inline-flex flex-wrap items-end justify-between gap-4"
              >
                <p
                  className={`${SERIF_ITALIC} text-base md:text-xl leading-snug max-w-xs`}
                >
                  Drei Sekunden Stille — dann lacht der Saal in {data.name}.
                </p>
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(8,6,12,0.5)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  Live in {data.region}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRUST-STRIP
   ═══════════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  { Icon: Trophy, name: "Greatest Talent", sub: "2023 · Finalist (TV)" },
  { Icon: Award, name: "Talents of Magic", sub: "2024 · Finalist + Kreativpreis" },
  { Icon: Medal, name: "Deutsche Jugendmeisterschaft", sub: "2024 · Top 30" },
  { Icon: Tv, name: "TVA", sub: "2025 · TV-Auftritt" },
  { Icon: Star, name: "ProvenExpert", sub: "5,0 ★ · 30+ Bewertungen" },
];

const TrustStripSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Bekannt aus.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
            TV, Wettbewerb und{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              200+ Events
            </span>{" "}
            seit 2016 — auch in {data.name}.
          </h2>
        </div>
        <div
          className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4`}
        >
          {TRUST_ITEMS.map((it) => (
            <article
              key={it.name}
              className="group relative bg-white border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                style={{
                  background: "transparent",
                }}
              >
                <it.Icon
                  className="w-5 h-5"
                  style={{ color: ACCENT }}
                  strokeWidth={1.75}
                />
              </div>
              <p className="font-display font-bold text-foreground text-sm md:text-base leading-tight mb-1.5">
                {it.name}
              </p>
              <p
                className="text-xs font-medium text-foreground/55 leading-snug"
              >
                {it.sub}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FORMATE — 3 Showformate (Close-Up / Bühnenshow / Magic Dinner)
   ═══════════════════════════════════════════════════════════ */
const FormateSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const FORMATE = [
    {
      img: closeupImg,
      kicker: "Format 01",
      title: `Close-Up Zauberer ${data.name}`,
      seoTitle: `Tischzauberer & Walk-Around in ${data.name}`,
      body: `Interaktive Tischzauberei und Walk-Around-Magie direkt bei euren Gästen in ${data.name}. Karten, Münzen, Mentalmagie — der Eisbrecher bei Sektempfang, Dinner und Networking-Events.`,
      tags: ["5–7 Min pro Tisch", "Walk-Around", "Keine Bühne nötig"],
      link: "/close-up",
    },
    {
      img: stageImg,
      kicker: "Format 02",
      title: `Bühnenshow ${data.name}`,
      seoTitle: `Zaubershow für Galas und Firmenfeiern`,
      body: `Durchkomponierte Comedy-Zaubershow mit Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale. Für Galas, Firmenfeiern und Hochzeiten in ${data.name} — 15 bis 60 Min, ab 50 Gästen.`,
      tags: ["15–60 Min", "50–500 Gäste", "Headset + Sound"],
      link: "/buehnenshow",
    },
    {
      img: dinnerImg,
      kicker: "Format 03",
      title: `Magic Dinner ${data.name}`,
      seoTitle: `Magie zwischen den Gängen`,
      body: `Dinner und Magie kombiniert — Close-Up und Bühnenshow eingebettet in einen Mehrgänge-Abend. Exklusives Erlebnis-Format für besondere Anlässe in ${data.name} und Umgebung.`,
      tags: ["Ganzer Abend", "Dinner + Show", "Mit Restaurant-Partnern"],
      link: "/magic-dinner",
    },
  ];
  return (
    <section
      ref={ref}
      id="showkonzepte"
      className="bg-white py-24 md:py-36"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Drei Formate für Events in {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Close-Up. Bühne.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Magic Dinner.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei bewährte Showformate — einzeln oder kombiniert. Ich passe das
              Programm individuell an deinen Anlass in {data.name} an, mit
              Briefing-Call vorab.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-6 md:gap-8`}
        >
          {FORMATE.map((f, i) => (
            <Link
              key={f.title}
              to={f.link}
              className="group flex flex-col h-full transition-transform duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div
                className="relative overflow-hidden mb-6"
                style={{ borderRadius: "1.25rem" }}
              >
                <img
                  src={f.img}
                  alt={`${f.title} — ${f.seoTitle}`}
                  className="w-full h-[300px] md:h-[360px] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                  style={{
                    filter: "saturate(0.95) brightness(0.92)",
                    objectPosition: "center 25%",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-32"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))",
                  }}
                />
                <span
                  className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(8,6,12,0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {f.kicker}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-2">
                {f.title}
              </h3>
              <p className={`text-sm md:text-base text-foreground/55 mb-4`}>
                {f.seoTitle}
              </p>
              <p className="text-base text-foreground/70 leading-[1.7] mb-5 flex-1">
                {f.body}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {f.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-foreground/70 bg-[hsl(0,0%,98%)] border border-foreground/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase font-semibold mt-auto"
                style={{ color: ACCENT }}
              >
                Format ansehen
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANLÄSSE — Keyword-Coverage für Hochzeit/Firmenfeier/Geburtstag etc.
   ═══════════════════════════════════════════════════════════ */
const AnlaesseSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const ANLAESSE = [
    {
      Icon: Heart,
      keyword: `Hochzeitszauberer ${data.name}`,
      label: `Zauberer für Hochzeit in ${data.name}`,
      body: `Sektempfang, Dinner, Party — auf eurer Hochzeit in ${data.name} sorgt der Hochzeitszauberer für magische Momente. Tisch-zu-Tisch beim Dinner, Bühnenshow vor dem Tanz, eingebaute Brautpaar-Anekdoten.`,
      link: "/hochzeit",
    },
    {
      Icon: Briefcase,
      keyword: `Firmenzauberer ${data.name}`,
      label: `Zauberer für Firmenfeier in ${data.name}`,
      body: `Weihnachtsfeier, Sommerfest, Jubiläum, Kick-off — moderner Firmenzauberer für Corporate Events in ${data.name}. Insider-Pointen aus dem Briefing, Magie-Bridges, Vorstand-tauglich.`,
      link: "/firmenfeiern",
    },
    {
      Icon: Cake,
      keyword: `Geburtstagszauberer ${data.name}`,
      label: `Zauberer für Geburtstag in ${data.name}`,
      body: `Runder Geburtstag, Überraschungsparty, Familienfeier in ${data.name} — Comedy-Zauberer mit Memory-Lane-Routinen, eingebauten Anekdoten und Pull-Quote-Momenten. Funktioniert von 30er bis Goldene Hochzeit.`,
      link: "/geburtstage",
    },
    {
      Icon: Building2,
      keyword: `Galazauberer ${data.name}`,
      label: `Zauberer für Galas in ${data.name}`,
      body: `Award-Show, Charity-Gala, Black-Tie-Event in ${data.name} — Premium-Tonalität, Mentaleffekte mit Veranstalter-Bezug, Standing-Ovation-Finale vor dem Tanz.`,
      link: "/buehnenshow",
    },
    {
      Icon: GraduationCap,
      keyword: `Messezauberer ${data.name}`,
      label: `Zauberer für Messe in ${data.name}`,
      body: `Messeauftritt, Stand-Aktivierung, Kongress-Entertainment in ${data.name} — ich ziehe Besucher zum Stand, qualifiziere Leads spielerisch und mache eure Marke unvergesslich.`,
      link: "/messe-magier",
    },
    {
      Icon: PartyPopper,
      keyword: `Zauberer buchen ${data.name}`,
      label: `Private Feiern & Jubiläen in ${data.name}`,
      body: `Jubiläum, Einweihung, Sommerfest oder einfach besonderer Anlass in ${data.name} — Zauberer buchen mit persönlicher Beratung, individuellem Konzept und 24-Stunden-Antwort.`,
      link: "/buchung",
    },
  ];
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Anlässe in {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Hochzeit. Firma.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Geburtstag.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Für jeden Anlass in {data.name} der passende Zauberer. Hochzeit,
              Firmenfeier, Geburtstag, Gala, Messe oder private Feier — alle
              Formate, alle Tonalitäten.
            </p>
          </div>
        </div>

        {/* Editorial Magazin-Liste statt Card-Grid */}
        <ul
          className={`divide-y divide-foreground/10 border-y border-foreground/10`}
        >
          {ANLAESSE.map((a, i) => (
            <li
              key={a.keyword}
              className="group grid grid-cols-[64px_1fr_auto] md:grid-cols-[88px_1fr_auto] items-baseline gap-5 md:gap-10 py-7 md:py-10"
            >
              <div className="flex items-baseline gap-3 self-start">
                <span
                  className={`${SERIF_ITALIC} text-3xl md:text-5xl tabular-nums leading-none`}
                  style={{ color: ACCENT }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                  <Link
                    to={a.link}
                    className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight hover:text-[#9a2640] transition-colors"
                  >
                    {a.label}
                  </Link>
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase font-bold"
                    style={{ color: ACCENT }}
                  >
                    {a.keyword}
                  </span>
                </div>
                <p className="text-base text-foreground/65 leading-[1.65] max-w-3xl mb-3">
                  {a.body}
                </p>
                <span className="inline-flex items-center gap-1.5">
                  <a.Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} strokeWidth={2} />
                  <Link
                    to={a.link}
                    className="text-[12px] tracking-[0.08em] uppercase font-semibold"
                    style={{ color: ACCENT }}
                  >
                    Mehr erfahren →
                  </Link>
                </span>
              </div>
              <Link
                to={a.link}
                aria-label={`Mehr zu ${a.label}`}
                className="hidden md:inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-500 group-hover:bg-[#9a2640] group-hover:text-white text-foreground/30 self-start mt-2"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   IN DER NÄHE — geo-search keyword coverage
   ═══════════════════════════════════════════════════════════ */
const InDerNaeheSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28"
    >
      <div className="container px-6">
        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-8 items-center`}
        >
          <div className="lg:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-4">
              [Zauberer in der Nähe] gesucht?
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground mb-5">
              Du bist in {data.name} oder Umgebung — ich bin hier.
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.7] max-w-2xl">
              Wer „Zauberer in der Nähe" oder „Magier in der Umgebung" sucht und
              in {data.name} oder dem Umkreis sitzt: Ich komme zu jedem
              Veranstaltungsort in {data.name} und {data.region}. Anfahrt im
              Angebot kalkuliert, keine versteckten Kosten, kurze Reaktionszeit
              auf Anfragen.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Link
              to={`/buchung?ort=${encodeURIComponent(data.name)}`}
              className="hero-cta group inline-flex items-center gap-2 rounded-full px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                boxShadow: "0 14px 30px -10px rgba(0,0,0,0.040)",
              }}
            >
              Anfrage starten ({data.name})
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground/[0.04] px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground hover:bg-foreground/[0.07] transition-colors"
            >
              Direkt anrufen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABLAUF-BUCHUNG — 4-Step-Prozess für Keyword "Zauberer buchen [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const AblaufBuchungSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const SCHRITTE = [
    {
      kicker: "Schritt 01",
      title: "Anfrage",
      body: `Du schickst mir Datum, Anlass, Gästezahl und Wunsch-Location in ${data.name}. Über das Formular, per Email an el@magicel.de oder telefonisch. Antwort innerhalb 24 Stunden — meistens schneller.`,
      meta: "≤ 24 h Antwort",
    },
    {
      kicker: "Schritt 02",
      title: "Briefing-Call",
      body: `30-Min-Telefonat zu deinem Event in ${data.name}: Anlass im Detail, Publikum, Tonalität (festlich, casual, Premium), gewünschtes Format, Insider-Anekdoten für eingebaute Mentaleffekte.`,
      meta: "30 Min · kostenlos",
    },
    {
      kicker: "Schritt 03",
      title: "Show in {name}".replace("{name}", data.name),
      body: `Setup 30 Min vor Showbeginn, Soundcheck (falls Bühne), dann die Show. Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühne vor dem Tanz — je nach gebuchtem Format.`,
      meta: "Pünktlich · versichert",
    },
    {
      kicker: "Schritt 04",
      title: "Nachbereitung",
      body: `Innerhalb 48 Stunden nach dem Event kurze Nachfrage zu deinem Erlebnis in ${data.name}. Optionale ProvenExpert-Bewertung, falls du wirklich zufrieden warst — sonst kein Druck.`,
      meta: "48 h Nachsorge",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Zauberer buchen {data.name} — so läuft's.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Vier Schritte.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Kein Stress.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Den Zauberer für dein Event in {data.name} zu buchen, ist nicht
              kompliziert — kein PDF-Fragebogen, keine Vertragsklauseln vorab.
              Vier transparente Schritte vom ersten Kontakt bis zur Show.
            </p>
          </div>
        </div>

        <ol
          className={`relative grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7`}
        >
          {SCHRITTE.map((s, i) => (
            <li
              key={s.title}
              className="relative bg-[hsl(0,0%,98%)] p-7 md:p-8 flex flex-col"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 18px 35px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-full font-display font-black text-white text-lg mb-5"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  boxShadow: "0 10px 25px -8px rgba(0,0,0,0.040)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-bold mb-2"
                style={{ color: ACCENT }}
              >
                {s.kicker}
              </p>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-foreground/65 leading-[1.65] mb-5 flex-1">
                {s.body}
              </p>
              <span
                className={`text-sm`}
                style={{ color: ACCENT }}
              >
                {s.meta}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   HOCHZEITSMAGIER-STADT — Vertiefung Keyword "Hochzeitszauberer [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const HochzeitsmagierStadtSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
          <div
            className={`lg:col-span-7`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Hochzeitszauberer {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground mb-8">
              Magie beim Sektempfang.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Beim Dinner. Vor dem Tanz.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.7] mb-6">
              Ein Hochzeitszauberer in {data.name} bringt drei Phasen zum
              Glänzen: Walk-Around beim Sektempfang als Eisbrecher zwischen
              Familien, Tisch-zu-Tisch beim Hochzeitsdinner mit eingebauten
              Brautpaar-Anekdoten und eine kompakte Bühnen-Highlightshow vor dem
              Eröffnungstanz. 100+ Hochzeiten bayernweit — das Setup steht.
            </p>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8">
              Egal ob klassische kirchliche Hochzeit, freie Trauung oder
              standesamtliche Feier in {data.name} — eingebaute Magie ist die
              Pointe, die deine Gäste noch Jahre später erzählen werden. Mit
              Brautpaar-Briefing vorab, damit eure Geschichte Teil der Show
              wird.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/hochzeit"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                }}
              >
                Hochzeitszauberer-Konzept ansehen
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/buchung?ort=${encodeURIComponent(data.name)}&format=Hochzeit`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground bg-white border border-foreground/15 hover:border-[#9a2640]/40 transition-colors"
              >
                Hochzeit in {data.name} anfragen
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div
            className={`lg:col-span-5`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="bg-white p-7 md:p-9"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 30px 60px -25px rgba(0,0,0,0.100), inset 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-bold mb-4"
                style={{ color: ACCENT }}
              >
                Drei Hochzeits-Slots
              </p>
              <ul className="divide-y divide-foreground/10">
                {[
                  { time: "Empfang", body: `Walk-Around · 30–60 Min · Eisbrecher zwischen Gästen in ${data.name}.` },
                  { time: "Dinner", body: "Tisch-zu-Tisch · 5–7 Min pro Tafel · eingebaute Brautpaar-Anekdoten." },
                  { time: "Vor dem Tanz", body: "Bühnen-Highlight · 15–20 Min · Standing-Ovation-Finale vor der Tanzeröffnung." },
                ].map((s, i) => (
                  <li key={i} className="py-4 first:pt-0 last:pb-0">
                    <span
                      className={`text-base block mb-1`}
                      style={{ color: ACCENT }}
                    >
                      {s.time}
                    </span>
                    <p className="text-sm text-foreground/75 leading-[1.6]">{s.body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-foreground/10 flex items-center gap-3">
                <Heart className="w-5 h-5" style={{ color: ACCENT }} />
                <span className="text-sm text-foreground/65">
                  100+ Hochzeiten · auch in {data.name} und {data.region}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FIRMENZAUBERER-STADT — Vertiefung Keyword "Firmenzauberer [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const FirmenzaubererStadtSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start">
          <div
            className={`lg:col-span-5 lg:order-2`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="bg-[hsl(0,0%,98%)] p-7 md:p-9"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 30px 60px -25px rgba(0,0,0,0.090), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-bold mb-4"
                style={{ color: ACCENT }}
              >
                Firmen-Anlässe in {data.name}
              </p>
              <ul className="divide-y divide-foreground/10">
                {[
                  { label: "Weihnachtsfeier", body: `Klassiker im Q4 — Mitarbeiter und Partner in ${data.name}.` },
                  { label: "Vorstandsdinner", body: "Premium-Tonalität, leise Mentaleffekte, drei Sekunden Stille." },
                  { label: "Sales-Kickoff", body: "Energetisch, eingebaute Pointen aus dem Briefing der Geschäftsleitung." },
                  { label: "Jubiläum / Firmenfest", body: "Sommerfeste, Geburtstage des Unternehmens, Mitarbeiter-Events." },
                ].map((a, i) => (
                  <li key={i} className="py-4 first:pt-0 last:pb-0">
                    <span
                      className={`font-display text-base font-bold text-foreground block mb-1`}
                    >
                      {a.label}
                    </span>
                    <p className="text-sm text-foreground/65 leading-[1.6]">{a.body}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-foreground/10 flex items-center gap-3">
                <Briefcase className="w-5 h-5" style={{ color: ACCENT }} />
                <span className="text-sm text-foreground/65">
                  100+ Firmen-Engagements · Bayern + deutschlandweit
                </span>
              </div>
            </div>
          </div>
          <div
            className={`lg:col-span-7 lg:order-1`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Firmenzauberer {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground mb-8">
              Corporate-Entertainment, das{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                der Vorstand zückt
              </span>
              .
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.7] mb-6">
              Ein Firmenzauberer in {data.name} braucht mehr als Tricks — er
              braucht Tonalitätsgefühl. Vorstandsabend anders als
              Mitarbeiter-Weihnachtsfeier, Sales-Kickoff anders als Jubiläum.
              Mit Briefing-Call der Geschäftsleitung baue ich Insider-Pointen
              ein, die nur in eurem Saal funktionieren.
            </p>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8">
              Premium-Beispiel: 200 Gäste, Versicherungs-Konzern in {data.region},
              Vorstandsvorsitzender zückte selbst drei Minuten nach Übergabe die
              Karten. Berufshaftpflicht, DSGVO + AVV abgesichert, Tech-Rider
              auf Anfrage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/firmenfeiern"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                }}
              >
                Firmenfeier-Konzept ansehen
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/buchung?ort=${encodeURIComponent(data.name)}&format=Firma`}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground bg-[hsl(0,0%,98%)] border border-foreground/15 hover:border-[#9a2640]/40 transition-colors"
              >
                Firmenfeier {data.name} anfragen
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   GARANTIEN — Trust Signals für SEO + Conversion
   ═══════════════════════════════════════════════════════════ */
const GarantienSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const GARANTIEN = [
    {
      Icon: CheckCircle2,
      title: "Berufshaftpflicht",
      body: `Standard-Berufshaftpflicht für Künstler greift bei jedem Auftritt in ${data.name} — Sach- und Personenschäden abgesichert. Versicherungs-Nachweis auf Anfrage.`,
    },
    {
      Icon: CheckCircle2,
      title: "30 Min Briefing-Call",
      body: `Vorab-Call zur Klärung von Anlass, Tonalität, Tabus und Insider-Anekdoten — kostenlos, ohne Verpflichtung.`,
    },
    {
      Icon: CheckCircle2,
      title: "24h-Antwort-Garantie",
      body: `Anfragen aus ${data.name} beantworte ich innerhalb 24 Stunden — meistens schneller, oft am selben Tag.`,
    },
    {
      Icon: CheckCircle2,
      title: "DSGVO + AVV",
      body: `Datenschutz, Auftragsverarbeitungsvertrag und alle rechtlichen Grundlagen — gerade für Firmenkunden in ${data.name} wichtig.`,
    },
    {
      Icon: CheckCircle2,
      title: "Pünktlichkeits-Versprechen",
      body: `Setup 30 Min vor Showbeginn, Soundcheck inkludiert. Kein Stress vor eurer Veranstaltung in ${data.name}.`,
    },
    {
      Icon: CheckCircle2,
      title: "Krankheits-Ersatz",
      body: `Im (sehr unwahrscheinlichen) Krankheitsfall bekomme ich einen geprüften Kollegen organisiert — kein Loch im Programm.`,
    },
  ];
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Was ich garantiere.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Sechs{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Garantien
              </span>{" "}
              für dein Event in {data.name}.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Einen Zauberer in {data.name} zu buchen ist Vertrauenssache. Sechs
              Versprechen, die das Risiko für dich auf Null bringen — schriftlich
              im Angebot fixiert.
            </p>
          </div>
        </div>

        {/* Asymmetrisches 2-Spalten-Listing mit Sticky-Sidebar */}
        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-10`}
        >
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative p-7 md:p-9 text-white overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, #08060c 100%)`,
                boxShadow: "0 35px 70px -30px rgba(0,0,0,0.200)",
              }}
            >
              <div
                aria-hidden
                className="absolute -top-32 -right-20 w-[380px] h-[380px] rounded-full blur-2xl opacity-6"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,0,0,0.024), transparent 70%)",
                }}
              />
              <p
                className="relative text-[10px] tracking-[0.18em] uppercase font-bold mb-3"
                style={{ color: "#f3d9a8" }}
              >
                Risk auf Null
              </p>
              <h3 className="relative font-display text-2xl md:text-3xl font-black leading-[1.1] mb-5">
                Im Angebot{" "}
                <span style={{ color: "#f3d9a8" }}>
                  schriftlich fixiert
                </span>
                .
              </h3>
              <p className="relative text-sm md:text-base text-white/75 leading-[1.65]">
                Sechs Garantien — direkt im Angebot dokumentiert, nicht im
                Kleingedruckten. So weißt du, dass die Show in {data.name}
                {" "}läuft, egal was passiert.
              </p>
            </div>
          </aside>

          <ol className="lg:col-span-8 space-y-0 divide-y divide-foreground/10 border-y border-foreground/10">
            {GARANTIEN.map((g, i) => (
              <li
                key={g.title}
                className="grid grid-cols-[44px_1fr] md:grid-cols-[64px_1fr] gap-5 md:gap-7 py-7 md:py-8"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${SERIF_ITALIC} text-2xl md:text-3xl tabular-nums leading-none`}
                    style={{ color: ACCENT }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <g.Icon
                      className="w-4 h-4 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2}
                    />
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
                      {g.title}
                    </h3>
                  </div>
                  <p className="text-base text-foreground/65 leading-[1.7] max-w-2xl">
                    {g.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAGIC-DINNER-STADT — Vertiefung Keyword "Magic Dinner [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const MagicDinnerStadtSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Magic Dinner {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Drei Gänge. Drei{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Magie-Routinen.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Magic Dinner ist mein Spezialgebiet — Mehrgänge-Abend mit Close-Up
              zwischen den Gängen und Bühnen-Höhepunkt zum Dessert. Funktioniert
              in Restaurants in {data.name} oder als geschlossener Privatabend.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-5 md:gap-7`}
        >
          {[
            {
              gang: "Vorspeise",
              title: "Eisbrecher",
              body: `Walk-Around zwischen den Plätzen, Karten in die Hände der Gäste, kleine Wow-Effekte direkt am Tisch in ${data.name}.`,
              kicker: "20 Min · pro Tisch",
            },
            {
              gang: "Hauptgang",
              title: "Tafel-Magie",
              body: `Tisch-zu-Tisch-Routinen mit eingebauten Anekdoten der Gastgeber. Jeder Tisch bekommt seine eigene Mini-Show.`,
              kicker: "5–7 Min · pro Tisch",
            },
            {
              gang: "Dessert",
              title: "Bühnen-Pointe",
              body: `Eine zentrale Bühnen-Routine für die ganze Tafel gleichzeitig — Mentaleffekt mit drei Sekunden Stille danach.`,
              kicker: "15–20 Min · zentral",
            },
          ].map((g, i) => (
            <article
              key={g.gang}
              className="relative p-7 md:p-9 flex flex-col h-full text-white"
              style={{
                borderRadius: "1.25rem",
                background:
                  i === 1
                    ? `linear-gradient(160deg, ${ACCENT_DEEP} 0%, #08060c 100%)`
                    : "linear-gradient(160deg, #08060c 0%, #1a0e16 100%)",
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.175)",
                minHeight: "320px",
              }}
            >
              <p
                className="text-[10px] tracking-[0.18em] uppercase font-bold mb-2"
                style={{ color: "#f3d9a8" }}
              >
                {g.kicker}
              </p>
              <p
                className={`${SERIF_ITALIC} text-2xl md:text-3xl mb-4`}
                style={{ color: "#f3d9a8" }}
              >
                {g.gang}.
              </p>
              <h3 className="font-display text-xl md:text-2xl font-black leading-tight mb-4">
                {g.title}
              </h3>
              <p className="text-sm md:text-base text-white/75 leading-[1.65] flex-1">
                {g.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/magic-dinner"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
            }}
          >
            Magic Dinner-Konzept im Detail
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs uppercase tracking-wide font-medium text-foreground/55">
            10+ Magic Dinners · auch in {data.name}
          </span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANREISE / VERFÜGBARKEIT — geo + freshness signal
   ═══════════════════════════════════════════════════════════ */
const AnreiseVerfuegbarkeitSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const year = new Date().getFullYear();
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start`}
        >
          <div className="lg:col-span-6">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
              Anfahrt nach {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground mb-6">
              Schnell zu dir nach{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                {data.name}
              </span>
              .
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.7] mb-5 max-w-xl">
              Mein Standort ist Regensburg — von dort aus betreue ich Events in
              ganz Bayern und deutschlandweit. Die Anfahrt nach {data.name} ist
              im Angebot transparent kalkuliert, keine versteckten Kosten.
              Pünktliches Erscheinen vor Showbeginn garantiert.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Anfahrt im Angebot",
                "Kein Stau-Risiko (eigene Reserve)",
                "Pünktlich vor Setup",
                "Bayern flächendeckend",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-foreground/70 bg-white border border-foreground/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <div
              className="relative p-8 md:p-10 text-white overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, #08060c 100%)`,
                boxShadow: "0 40px 80px -30px rgba(0,0,0,0.200)",
              }}
            >
              <div
                aria-hidden
                className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full blur-2xl opacity-6"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,0,0,0.024), transparent 70%)",
                }}
              />
              <div className="relative">
                <p
                  className="text-[10px] tracking-[0.18em] uppercase font-bold mb-3"
                  style={{ color: "#f3d9a8" }}
                >
                  Verfügbarkeit {year}–{year + 1}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-black leading-[1.1] mb-5">
                  Termine in {data.name} aktuell{" "}
                  <span style={{ color: "#f3d9a8" }}>
                    verfügbar
                  </span>
                  .
                </h3>
                <p className="text-base text-white/80 leading-[1.7] mb-7">
                  Q1 und Q2 sind aktuell entspannt — Q4 (Weihnachtsfeier-Saison)
                  füllt sich erfahrungsgemäß ab Juli. Hochzeitstermine
                  Mai–September am besten frühzeitig anfragen, gerade in {data.name}.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-7">
                  {[
                    { label: "Q1–Q2", color: "#86d29a" },
                    { label: "Q3", color: "#e3c87a" },
                    { label: "Q4", color: "#e09a6e" },
                  ].map((q) => (
                    <div
                      key={q.label}
                      className="rounded-xl px-3 py-3 text-center"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <span
                        className="font-display font-black text-base block"
                        style={{ color: q.color }}
                      >
                        {q.label}
                      </span>
                      <span className="text-[10px] tracking-[0.16em] uppercase font-bold text-white/55">
                        {q.color === "#86d29a"
                          ? "Entspannt"
                          : q.color === "#e3c87a"
                            ? "Mittel"
                            : "Eng"}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/buchung?ort=${encodeURIComponent(data.name)}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/95 transition-colors"
                >
                  Termin in {data.name} sichern
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   LOCATIONS — bekannte Venues der Stadt
   ═══════════════════════════════════════════════════════════ */
const LocationsSection = ({
  data,
}: {
  data: Stadt & { bekannteLocations: string[] };
}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Event-Locations in {data.name}.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              In den{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                bekanntesten Locations
              </span>{" "}
              der Stadt.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Ich trete regelmäßig in Locations und Venues in {data.name} auf —
              und komme zu jeder Wunsch-Location. Schlosssäle, Hotels,
              Restaurants, Eventhallen.
            </p>
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-3`}
        >
          {data.bekannteLocations.map((loc) => (
            <span
              key={loc}
              className="inline-flex items-center gap-2 font-sans text-sm text-foreground/80 px-5 py-3 rounded-full bg-white border border-foreground/10 hover:border-[color:var(--accent-color,#9a2640)]/40 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: ACCENT }} />
              {loc}
            </span>
          ))}
        </div>
        <p className="mt-10 text-sm md:text-base text-foreground/60 leading-relaxed max-w-2xl">
          Deine Location ist nicht dabei? Kein Problem — ich komme zu jedem
          Veranstaltungsort in {data.name} und Umgebung.{" "}
          <Link
            to={`/buchung?ort=${encodeURIComponent(data.name)}`}
            style={{ color: ACCENT }}
            className="hover:underline font-semibold"
          >
            Jetzt anfragen →
          </Link>
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Es war einfach Mega! 200 Gäste — Emilian hat mit seiner Bühnenshow und Close-Up alle begeistert.",
      author: "Jan von Lehmann",
      role: "Firmenfeier · 200 Gäste",
      initial: "J",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt.",
      author: "Martina Senftl",
      role: "Eventkundin",
      initial: "M",
    },
    {
      quote:
        "Mit viel Charme und Witz hat er alle Gäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass.",
      author: "Katrin Raß",
      role: "Hochzeitsplanerin",
      initial: "K",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Was Gastgeber sagen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            5,0 Sterne.
            <br />
            <span>30+ Bewertungen.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-foreground/60 leading-[1.6] max-w-xl">
            Verifizierte ProvenExpert-Bewertungen aus Bayern — auch von Events in
            {" "}
            {data.name} und Umgebung.
          </p>
        </div>
        <div
          className={`grid md:grid-cols-3 gap-6 md:gap-8`}
        >
          {reviews.map((r) => (
            <article
              key={r.author}
              className="relative bg-white p-7 md:p-9 flex flex-col h-full"
              style={{
                borderRadius: "1rem",
                boxShadow:
                  "0 25px 50px -25px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
                <meta content="5" />
              </div>
              <p
                className="text-[15px] md:text-base leading-[1.65] text-foreground/85 flex-1"
              >
                „{r.quote}"
              </p>
              <footer className="mt-7 pt-5 border-t border-foreground/10 flex items-center gap-4">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-white text-base"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                >
                  {r.initial}
                </div>
                <div>
                  <p
                    className="font-display font-bold text-foreground text-sm"
                  >
                    {r.author}
                  </p>
                  <p
                    className="text-xs font-medium text-foreground/55 mt-0.5"
                  >
                    {r.role}
                  </p>
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
   VIDEO
   ═══════════════════════════════════════════════════════════ */
const VideoSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const [playing, setPlaying] = useState(false);
  const videoId = TVA_VIDEO_ID;
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`max-w-3xl mx-auto text-center mb-14 md:mb-16`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Showreel.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
            Sieh dir den{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              Zauberer
            </span>{" "}
            an.
          </h2>
          <p className="mt-6 text-base md:text-lg text-foreground/60 leading-[1.6] max-w-xl mx-auto">
            Erster Eindruck vom Zauberer für {data.name} — Auszug aus Auftritten
            auf Firmenfeiern, Hochzeiten und Galas in Bayern.
          </p>
        </div>
        <div
          className={`max-w-4xl mx-auto`}
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="relative aspect-video overflow-hidden bg-foreground/5"
            style={{ borderRadius: "1.5rem" }}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=1`}
                title={`Zauberer ${data.name} – Emilian Leber Showreel`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt={`Zauberer ${data.name} — Emilian Leber Showreel Vorschau`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-20 h-20 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    }}
                    aria-label={`Showreel Zauberer ${data.name} abspielen`}
                  >
                    <svg
                      className="w-8 h-8 text-white ml-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL-QUOTE — black full-bleed mit Stadt-Bezug
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-6">
        <img
          src={staunenImg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(8,6,12,0.55) 0%, rgba(8,6,12,0.95) 70%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-2xl opacity-6"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.024), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full blur-2xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040), transparent 65%)",
        }}
      />
      <div
        className={`relative container px-6`}
      >
        <Quote
          className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto opacity-40"
          style={{ color: "#f3d9a8" }}
          strokeWidth={1.25}
        />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p className="font-display font-black tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.75rem)]">
            Drei Sekunden Stille.{" "}
            <span style={{ color: "#f3d9a8" }}>
              Dann lacht ein Saal in {data.name}.
            </span>
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span
              className="text-sm md:text-base text-white/65"
            >
              Was nach jedem Auftritt passiert.
            </span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FAQ — Stadt-spezifisch + Allgemein
   ═══════════════════════════════════════════════════════════ */
const FAQSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const allgemein = [
    {
      q: `Wie weit im Voraus muss ich den Zauberer in ${data.name} buchen?`,
      a: `Wochenend-Termine in ${data.name} sind 4–8 Wochen vorher meist noch frei. Kurzfristige Anfragen (1–2 Wochen) gehen je nach Auslastung — am besten direkt anfragen, ich antworte innerhalb 24 Stunden.`,
    },
    {
      q: `Welche Formate kann ich für mein Event in ${data.name} buchen?`,
      a: `Close-Up Zauberei (Tisch-zu-Tisch + Walk-Around), Bühnenshow (15–60 Min, durchkomponiert mit Comedy + Mental), Magic Dinner (Mehrgänge-Abend mit Magie zwischen den Gängen) und Moderation mit eingebauter Magie. Auch kombinierbar.`,
    },
    {
      q: `Komme ich mit dem Zauberer auch in kleinere Orte um ${data.name}?`,
      a: `Ja — ich komme zu jedem Veranstaltungsort in ${data.name} und ${data.region}. Hochzeits-Locations am Land, Restaurants im Umkreis, Firmen-Standorte außerhalb der Stadt — die Anfahrt ist im Angebot kalkuliert.`,
    },
  ];
  const faqs = [...(data.faq || []), ...allgemein];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Häufige Fragen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Zauberer {data.name}.<br />
            <span>Was vorher gefragt wird.</span>
          </h2>
        </div>
        <div
          className={`max-w-3xl`}
        >
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div
                key={i}
                className="border-b border-foreground/15"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex items-center justify-between w-full py-6 md:py-7 text-left gap-6 group"
                >
                  <h3
                    className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4"
                  >
                    {faq.q}
                  </h3>
                  {open ? (
                    <ChevronUp className="w-5 h-5 text-foreground/50 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-foreground/50 shrink-0 transition-transform group-hover:translate-y-0.5" />
                  )}
                </button>
                {open && (
                  <div
                    className="pb-6 md:pb-7"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      className="text-base text-foreground/70 leading-[1.7] max-w-2xl"
                      itemProp="text"
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   LANG-TEXT — SEO-Text unten
   ═══════════════════════════════════════════════════════════ */
const LangTextSection = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  if (!data.langText) return null;
  const paragraphs = data.langText.split("\n\n").filter(Boolean);
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`max-w-3xl mx-auto`}
        >
          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6 text-center`}
          >
            Alles, was du wissen musst.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] text-foreground mb-12 text-center">
            Zauberer {data.name} —{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              ausführlich erklärt.
            </span>
          </h2>
          <div className="space-y-6 md:space-y-7">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base md:text-lg text-foreground/75 leading-[1.8]"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   KOLLEGEN-EMPFEHLUNG
   ═══════════════════════════════════════════════════════════ */
const KollegenEmpfehlungSection = ({
  empfehlung,
}: {
  empfehlung: KollegenEmpfehlung;
}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-12 md:py-16">
      <div className="container px-6">
        <div
          className={`max-w-2xl mx-auto`}
        >
          <p className="text-sm md:text-base text-foreground/55 leading-relaxed text-center">
            {empfehlung.prefix}
            <a
              href={empfehlung.linkHref}
              target="_blank"
              rel="noopener"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-[#9a2640] transition-colors"
            >
              {empfehlung.linkText}
            </a>
            {empfehlung.suffix}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WEITERE STÄDTE — Internal Linking
   ═══════════════════════════════════════════════════════════ */
const WeitereStaedteSection = ({ current }: { current: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const currentData = staedte.find((s) => s.slug === current);
  const sameRegion = staedte
    .filter((s) => s.slug !== current && s.region === currentData?.region)
    .slice(0, 12);
  const others = staedte
    .filter((s) => s.slug !== current && s.region !== currentData?.region)
    .slice(0, 6);
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-10`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Zauberer auch in deiner Stadt.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground">
            Über {staedte.length}+ Städte in{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              Deutschland und Österreich
            </span>
            .
          </h2>
        </div>
        {sameRegion.length > 0 && (
          <div className="mb-10">
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5"
              style={{ color: ACCENT }}
            >
              Zauberer in {currentData?.region}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {sameRegion.map((s) => (
                <Link
                  key={s.slug}
                  to={`/zauberer/${s.slug}`}
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-foreground/70 hover:text-foreground transition-colors px-4 py-2 rounded-full bg-white border border-foreground/10 hover:border-[#9a2640]/30"
                >
                  Zauberer {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}
        {others.length > 0 && (
          <div>
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5"
              style={{ color: ACCENT }}
            >
              Deutschlandweit
            </p>
            <div className="flex flex-wrap gap-2.5">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  to={`/zauberer/${s.slug}`}
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-foreground/70 hover:text-foreground transition-colors px-4 py-2 rounded-full bg-white border border-foreground/10 hover:border-[#9a2640]/30"
                >
                  Zauberer {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = ({ data }: { data: Stadt }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={audienceImg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.75) 50%, rgba(8,6,12,0.55) 100%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-2xl opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-2xl opacity-6"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div
          className={`max-w-3xl mx-auto text-center`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Zauberer für {data.name} buchen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Dein Event in{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              {data.name}
            </span>
            . Magisch.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schick mir Datum, Anlass, Gästezahl und Location in {data.name} —
            Antwort innerhalb 24 Stunden mit Konzept-Vorschlag und Angebot.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/buchung?ort=${encodeURIComponent(data.name)}`}
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90"
            >
              Anfrage starten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white"
            >
              Direkt anrufen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUIZ — Stadt-spezifischer Format-Finder
   ═══════════════════════════════════════════════════════════ */
const buildStadtQuizConfig = (data: Stadt): CustomQuizConfig => ({
  anlass: `Event in ${data.name}`,
  sectionEyebrow: `Format-Finder · ${data.name}`,
  sectionTitle: (
    <>
      Welcher Zauberer passt zu deinem{" "}
      <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
        Event in {data.name}
      </span>
      ?
    </>
  ),
  sectionDesc: `Vier Fragen — du bekommst eine konkrete Empfehlung für dein Event in ${data.name}: Format, Dauer, ungefährer Rahmen.`,
  questions: [
    {
      id: "anlass",
      eyebrow: "Frage 01 · Anlass",
      title: <>Welcher Anlass?</>,
      hint: "Davon hängt Tonalität und Format ab.",
      feedback: "Spannend.",
      cols: 3,
      options: [
        { value: "hochzeit", label: "Hochzeit", sub: "Brautpaar im Mittelpunkt" },
        { value: "firma", label: "Firmenfeier", sub: "Vorstand, Mitarbeiter, Kunden" },
        { value: "geburtstag", label: "Geburtstag", sub: "Privat · 30er bis Goldene Hochzeit" },
        { value: "gala", label: "Gala / Award-Show", sub: "Premium-Setting, Black-Tie" },
        { value: "messe", label: "Messe / Stand", sub: "Lead-Generator-Konzept" },
        { value: "privat", label: "Privater Anlass", sub: "Jubiläum, Einweihung, sonstiges" },
      ],
    },
    {
      id: "groesse",
      eyebrow: "Frage 02 · Gästezahl",
      title: <>Wie viele Gäste?</>,
      hint: "Bestimmt Format (Close-Up vs Bühne) und Aufwand.",
      feedback: "Passt.",
      cols: 4,
      options: [
        { value: "klein", label: "Bis 30 Gäste", sub: "Intime Tafel, Close-Up ideal" },
        { value: "mittel", label: "30–80 Gäste", sub: "Tisch-zu-Tisch + Mini-Bühne" },
        { value: "gross", label: "80–250 Gäste", sub: "Bühnenshow, Headset" },
        { value: "xl", label: "250+ Gäste", sub: "Volle Bühne, größerer Saal" },
      ],
    },
    {
      id: "format",
      eyebrow: "Frage 03 · Format-Wunsch",
      title: <>Was schwebt dir vor?</>,
      hint: "Bauchgefühl ist ok — ich berate dich danach.",
      feedback: "Verstanden.",
      cols: 4,
      options: [
        { value: "closeup", label: "Close-Up Magie", sub: "Tisch-zu-Tisch / Walk-Around" },
        { value: "buehne", label: "Bühnenshow", sub: "15–60 Min durchkomponiert" },
        { value: "dinner", label: "Magic Dinner", sub: "Magie zwischen den Gängen" },
        { value: "weiss-nicht", label: "Weiß noch nicht", sub: "Empfehlung für mich" },
      ],
    },
    {
      id: "termin",
      eyebrow: "Frage 04 · Termin",
      title: <>Wann findet das Event statt?</>,
      hint: "Q4 (Weihnachtsfeiern) bitte früh anfragen.",
      feedback: "Notiert.",
      cols: 4,
      options: [
        { value: "q1q2", label: "Q1–Q2", sub: "Januar bis Juni" },
        { value: "q3", label: "Q3", sub: "Juli bis September" },
        { value: "q4", label: "Q4", sub: "Oktober bis Dezember" },
        { value: "flexibel", label: "Flexibel", sub: "Datum noch offen" },
      ],
    },
  ],
  gaesteFromAnswers: (a) => {
    const groesse = a.groesse;
    if (groesse === "klein") return 30;
    if (groesse === "mittel") return 60;
    if (groesse === "gross") return 150;
    if (groesse === "xl") return 300;
    return undefined;
  },
  recommend: (a) => {
    const { anlass, groesse, format, termin } = a;
    const stadtPart = ` in ${data.name}`;
    if (anlass === "hochzeit") {
      return {
        format: `Hochzeitszauberer${stadtPart}`,
        sub: "Close-Up beim Empfang + Bühne vor dem Tanz",
        why: `Klassischer Hochzeits-Mix: Walk-Around während des Sektempfangs als Eisbrecher zwischen den Familien, Tisch-zu-Tisch beim Dinner mit eingebauten Brautpaar-Anekdoten, kompakte Bühnen-Highlightshow direkt vor dem Eröffnungstanz. 100+ Hochzeiten Erfahrung.${termin === "q4" ? " Q4-Hochzeiten füllen sich erfahrungsgemäß schnell — gleich Anfrage stellen." : ""}`,
        link: `/hochzeit`,
      };
    }
    if (anlass === "firma") {
      return {
        format: `Firmenzauberer${stadtPart}`,
        sub:
          format === "buehne"
            ? "Bühnen-Highlight + Magie-Bridges in der Moderation"
            : "Close-Up zwischen Gängen + Bühne als Programmpunkt",
        why: `Tonalität an Unternehmenskultur angepasst, Insider-Anekdoten aus 30-Min-Briefing der Geschäftsleitung. Mentaleffekte für Vorstandsdinner, Comedy-Anteil für Weihnachtsfeier. 100+ Firmen-Engagements.${termin === "q4" ? " Weihnachtsfeier-Saison: bitte früh anfragen — Termine ab Juli oft eng." : ""}`,
        link: `/firmenfeiern`,
      };
    }
    if (anlass === "geburtstag") {
      return {
        format: `Geburtstagszauberer${stadtPart}`,
        sub: "Memory-Lane + Close-Up + Highlight-Bühne",
        why: `Anekdoten vom Geburtstagskind in Mentaleffekte eingebaut. Close-Up an den Tafeln, kompakte Bühnenshow als Höhepunkt mit personalisierter Pointe. Funktioniert von 30er bis Goldene Hochzeit.`,
        link: `/geburtstage`,
      };
    }
    if (anlass === "gala") {
      return {
        format: `Bühnenshow / Galazauberer${stadtPart}`,
        sub: "Premium-Tonalität · Mentaleffekte · Standing-Ovation",
        why: `Klassische Gala-Show — Premium-Tonalität, Mentaleffekte mit Veranstalter-Bezug, Standing-Ovation-Finale vor dem Tanz. Ideal als Programmpunkt zwischen Award-Block und Tanz.`,
        link: `/buehnenshow`,
      };
    }
    if (anlass === "messe") {
      return {
        format: `Messezauberer${stadtPart}`,
        sub: "Lead-Generator-Konzept · Stand-Aktivierung",
        why: `Ich ziehe Besucher an euren Stand, qualifiziere Leads spielerisch und mache eure Marke unvergesslich. 3× Stand-Traffic als KPI, Halbtag / Vollen Tag / Mehrtages.`,
        link: `/messe-magier`,
      };
    }
    if (format === "dinner") {
      return {
        format: `Magic Dinner${stadtPart}`,
        sub: "Mehrgänge-Abend mit Magie zwischen den Gängen",
        why: `Mein Spezialgebiet — Vorspeise/Hauptgang/Dessert plus Walk-Around, Tisch-zu-Tisch und Bühnen-Routine zum Dessert. Funktioniert in Restaurants in ${data.name} oder als geschlossener Privatabend.`,
        link: `/magic-dinner`,
      };
    }
    if (format === "closeup" || groesse === "klein") {
      return {
        format: `Close-Up Zauberer${stadtPart}`,
        sub: "Tisch-zu-Tisch · 5–7 Min pro Tafel",
        why: `Direkt an euren Tafeln in ${data.name} — Karten in Händen der Gäste, eingebaute Anekdoten, drei Sekunden Stille nach der Pointe. Ideal für ${groesse === "klein" ? "intime Tafeln bis 30 Gäste" : "Walk-Around und Sitz-Settings"}.`,
        link: `/close-up`,
      };
    }
    return {
      format: `Bühnenshow${stadtPart}`,
      sub: "15–60 Min · durchkomponierte Comedy-Zaubershow",
      why: `Durchkomponierte Bühnenshow mit Drama-Kurve, Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale. Für Galas, Firmenfeiern und größere Hochzeiten in ${data.name}.`,
      link: `/buehnenshow`,
    };
  },
});

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
const StadtSeite = () => {
  const { stadt } = useParams<{ stadt: string }>();
  const data = staedte.find((s) => s.slug === stadt);
  if (!data) return <Navigate to="/404" replace />;

  const siteUrl = `https://www.magicel.de/zauberer/${data.slug}`;
  const title = `Zauberer ${data.name} — Hochzeit, Firmenfeier, Magic Dinner | Emilian Leber`;
  const description = `Zauberer in ${data.name} buchen: Close-Up Magie, Bühnenshow, Magic Dinner für Hochzeit, Firmenfeier, Geburtstag und Galas. 5,0★ · 30+ Bewertungen · 200+ Events · 24 h Antwort.`;
  const keywords = keywordList(data.name);

  const faqSchema = (data.faq?.length ?? 0) > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (data.faq ?? []).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <PageLayout>
      <Helmet>
        <html lang="de" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "EntertainmentBusiness"],
            name: `Emilian Leber — Zauberer ${data.name}`,
            url: siteUrl,
            description: `Zauberer in ${data.name}: Close-Up Magie, Bühnenshow und Magic Dinner für Hochzeit, Firmenfeier und Geburtstag.`,
            address: {
              "@type": "PostalAddress",
              addressLocality: data.name,
              addressRegion: data.region,
              addressCountry: data.region === "Österreich" ? "AT" : "DE",
            },
            telephone: "+4915563744696",
            email: "el@magicel.de",
            image: "https://www.magicel.de/og-image.jpg",
            sameAs: ["https://www.instagram.com/emilian.leber"],
            areaServed: { "@type": "City", name: data.name },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              bestRating: "5",
              worstRating: "1",
              reviewCount: "34",
            },
            serviceType: [
              `Zauberer ${data.name}`,
              `Hochzeitszauberer ${data.name}`,
              `Firmenzauberer ${data.name}`,
              `Close-Up Zauberer ${data.name}`,
              `Bühnenshow ${data.name}`,
              `Magic Dinner ${data.name}`,
              `Mentalist ${data.name}`,
              `Moderator mit Magie ${data.name}`,
            ],
            priceRange: "€€€",
            dateModified: new Date().toISOString().split("T")[0],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.magicel.de/" },
              { "@type": "ListItem", position: 2, name: "Städte", item: "https://www.magicel.de/staedte" },
              { "@type": "ListItem", position: 3, name: `Zauberer ${data.name}`, item: siteUrl },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `Zauberer ${data.name} – Emilian Leber Showreel`,
            description: `Emilian Leber als Zauberer in ${data.name} — Close-Up Magie, Bühnenshow und Magic Dinner.`,
            thumbnailUrl: `https://img.youtube.com/vi/${TVA_VIDEO_ID}/maxresdefault.jpg`,
            uploadDate: "2024-06-01",
            embedUrl: `https://www.youtube.com/embed/${TVA_VIDEO_ID}`,
            contentUrl: `https://www.youtube.com/watch?v=${TVA_VIDEO_ID}`,
          })}
        </script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>
      <main>
        <Hero data={data} />
        <LogoMarquee
          eyebrow={`Auftritte für Konzerne und Marken — auch in ${data.name}.`}
          headline=""
          variant="cream"
          compact
        />
        <WarumStadtSection data={data} />
        <TrustStripSection data={data} />
        <FormateSection data={data} />
        <HochzeitsmagierStadtSection data={data} />
        <AnlaesseSection data={data} />
        <FirmenzaubererStadtSection data={data} />
        <AblaufBuchungSection data={data} />
        <MagicDinnerStadtSection data={data} />
        <PullQuoteSection data={data} />
        <InDerNaeheSection data={data} />
        {data.bekannteLocations && data.bekannteLocations.length > 0 && (
          <LocationsSection data={data as Stadt & { bekannteLocations: string[] }} />
        )}
        <GarantienSection data={data} />
        <AnreiseVerfuegbarkeitSection data={data} />
        <CustomQuizSection config={buildStadtQuizConfig(data)} />
        <StimmenSection data={data} />
        <VideoSection data={data} />
        <FAQSection data={data} />
        <LangTextSection data={data} />
        {data.kollegenEmpfehlung && (
          <KollegenEmpfehlungSection empfehlung={data.kollegenEmpfehlung} />
        )}
        <WeitereStaedteSection current={data.slug} />
        <FinalCTA data={data} />
      </main>
    </PageLayout>
  );
};

export default StadtSeite;
