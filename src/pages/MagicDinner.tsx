import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { QuizWizardInline, QuizConfig } from "@/components/landing/QuizWizard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, ArrowUpRight, Star, Trophy, Award, Medal, Tv, Sparkles } from "lucide-react";

import heroDinnerImg from "@/assets/hero-dinner.jpg";
import tischmagieImg from "@/assets/emilian-magic-dinner.jpg";
import buehneImg from "@/assets/magicdinner-buehne.jpg";
import bookImg from "@/assets/magicdinner-book.jpg";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import emilianCardsImg from "@/assets/emilian-portrait-cards.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import staunenImg from "@/assets/staunen.jpg";
import buehneShowImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup.jpg";
import birthdayImg from "@/assets/hero-birthday.jpg";
import firmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import zuschauerBlauImg from "@/assets/zuschauer-blau.jpg";

/* ─── Design Tokens ─────────────────────────────────────────
 * Frameblox-LAYOUT, aber Farben aus unserer eigenen Bildwelt:
 *   – Magic-Dinner-Sakko (tiefes Smaragd)
 *   – Restaurant-Bernstein / Brass (warmes Licht, Kerzen)
 *   – Burgunder / Weinrot (Stage-Light, Logo, Kartenrücken)
 *   – Cream-Off-White (Tischwäsche)                                */
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";

// Akzent für aktive Listenpunkte (statt Frameblox-Pink): Burgunder
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";

// Smaragd (Emilians Sakko)
const EMERALD_DEEP = "#0e3d2a";
const EMERALD_MID = "#1f5e3f";

// Bernstein / Brass (Restaurant-Atmosphäre)
const AMBER_DEEP = "#8a5a14";
const AMBER_MID = "#c79042";
const AMBER_SOFT = "#f0d8a8";
const CREAM = "#f5ecdc";

// Warmer Dinner-Gradient (statt Neon-Pink-Purple-Yellow)
const GRADIENT_WARM =
  `linear-gradient(95deg, ${CREAM} 0%, ${AMBER_SOFT} 28%, ${AMBER_MID} 55%, ${ACCENT} 82%, ${ACCENT_DEEP} 100%)`;

/* ═══════════════════════════════════════════════════════════
   1 · HERO — Imposant, mit krasser Eingangsanimation:
   word-by-word reveal · photo mask-reveal · KPI cascade-overshoot
   · floating KPI-loop · scroll-parallax · star-pulse
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn {
      from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); }
      to   { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); }
    }
    @keyframes heroFadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroMaskReveal {
      from { clip-path: inset(100% 0 0 0); transform: scale(1.08); }
      to   { clip-path: inset(0 0 0 0);     transform: scale(1); }
    }
    @keyframes heroZoomIn {
      from { transform: scale(1.18); opacity: 0.35; filter: blur(8px); }
      to   { transform: scale(1.02); opacity: 1;    filter: blur(0); }
    }
    @keyframes heroBokehDrift {
      0%   { transform: translateY(0)    translateX(0)    scale(1);   opacity: 0.2; }
      30%  { opacity: 1; }
      70%  { opacity: 1; }
      100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; }
    }
    @keyframes heroDetailDrop {
      0%   { opacity: 0; transform: translateY(-80px) rotate(var(--detail-rotate, 0deg)) scale(0.92); }
      70%  { opacity: 1; transform: translateY(8px)   rotate(var(--detail-rotate, 0deg)) scale(1.02); }
      100% { opacity: 1; transform: translateY(0)     rotate(var(--detail-rotate, 0deg)) scale(1); }
    }
    @keyframes heroDetailFloat {
      0%, 100% { transform: translateY(0)   rotate(var(--detail-rotate, 0deg)); }
      50%      { transform: translateY(-8px) rotate(calc(var(--detail-rotate, 0deg) + 0.8deg)); }
    }
    @keyframes heroOvershoot {
      0%   { opacity: 0; transform: translateY(60px) scale(0.88); }
      55%  { opacity: 1; transform: translateY(-10px) scale(1.04); }
      80%  { transform: translateY(2px) scale(0.99); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-6px); }
    }
    @keyframes heroStarPulse {
      0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 0 rgba(199,144,66,0)); }
      50%      { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.55)); }
    }
    .hero-word {
      display: inline-block;
      opacity: 0;
      animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      will-change: transform, opacity, filter;
    }
    .hero-fade {
      opacity: 0;
      animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .hero-mask {
      animation: heroMaskReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .hero-zoom {
      animation: heroZoomIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      transform-origin: center center;
    }
    .hero-bokeh {
      opacity: 0;
      animation-name: heroBokehDrift;
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      animation-iteration-count: infinite;
      will-change: transform, opacity;
    }
    .hero-detail-drop {
      opacity: 0;
      animation: heroDetailDrop 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      will-change: transform, opacity;
    }
    .hero-detail-float {
      animation: heroDetailFloat 6s ease-in-out infinite;
      animation-delay: 1.8s;
    }
    .hero-overshoot {
      opacity: 0;
      animation: heroOvershoot 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .hero-float {
      animation: heroFloat 4.5s ease-in-out infinite;
    }
    .hero-star {
      animation: heroStarPulse 2.4s ease-in-out infinite;
    }
    .hero-cta { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background-color .3s, color .3s; }
    .hero-cta:hover { transform: translateY(-2px) scale(1.035); }
    .hero-cta:active { transform: translateY(0) scale(0.97); }
    .hero-photo-wrap { transform: translateY(var(--hero-parallax, 0px)); transition: transform 0.05s linear; }
  `}</style>
);

const HEADLINE_SANS = ["Zwischen", "Vorspeise", "und", "Dessert"];
const HEADLINE_ITALIC = ["verschwindet", "die", "Zeit."];

// Bokeh — warme Kerzenlicht-Partikel, langsam driftend
const BOKEH = [
  { size: 22, left: "12%", top: "28%", dur: 14, delay: 0,   o: 0.45 },
  { size: 14, left: "8%",  top: "62%", dur: 18, delay: 2.5, o: 0.55 },
  { size: 28, left: "78%", top: "18%", dur: 16, delay: 1,   o: 0.40 },
  { size: 18, left: "88%", top: "48%", dur: 20, delay: 3.5, o: 0.55 },
  { size: 12, left: "62%", top: "72%", dur: 13, delay: 4.5, o: 0.60 },
  { size: 24, left: "92%", top: "78%", dur: 17, delay: 1.8, o: 0.35 },
  { size: 10, left: "32%", top: "82%", dur: 19, delay: 6,   o: 0.50 },
  { size: 16, left: "48%", top: "12%", dur: 22, delay: 5,   o: 0.30 },
  { size: 20, left: "70%", top: "38%", dur: 15, delay: 7.5, o: 0.45 },
  { size: 14, left: "20%", top: "44%", dur: 21, delay: 8.5, o: 0.40 },
];

const Hero = () => {
  const photoRef = useRef<HTMLDivElement>(null);

  // Sanfter Scroll-Parallax aufs Hero-Foto
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
        if (el && y < window.innerHeight * 1.4) {
          el.style.setProperty("--hero-parallax", `${Math.min(y * 0.18, 80)}px`);
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative bg-[#08060c] text-white min-h-screen overflow-hidden">
      <HeroKeyframes />

      {/* Vollbild Magic-Dinner-Backdrop mit Zoom-In Entrance */}
      <div
        ref={photoRef}
        className="absolute inset-0 hero-photo-wrap hero-zoom"
        style={{ willChange: "transform" }}
      >
        <img
          src={tischmagieImg}
          alt="Magic Dinner mit Zauberkünstler Emilian Leber — Tischmagie am Restauranttisch"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 25%",
            filter: "saturate(0.92) contrast(1.08) brightness(0.72)",
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
          className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(199,144,66,0.28) 0%, rgba(199,144,66,0) 70%)",
          }}
        />
      </div>

      {/* Bokeh — warme Lichtpunkte (Kerzenlicht-Atmosphäre) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full hero-bokeh"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              background: `radial-gradient(circle, rgba(255,210,140,${b.o}) 0%, rgba(255,210,140,${b.o * 0.4}) 40%, rgba(255,210,140,0) 75%)`,
              filter: "blur(2px)",
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>


      <div className="relative z-10 min-h-screen container px-6 flex flex-col justify-between pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-5xl">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade"
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
            <span className="text-sm text-white/80">
              <strong className="font-semibold text-white">Spezialgebiet</strong> seit 2023
            </span>
          </div>

          <p
            className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`}
            style={{ animationDelay: "0.18s" }}
          >
            Tisch und Bühne zwischen den Gängen.
          </p>

          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (
              <span
                key={`s-${i}`}
                className="hero-word"
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              >
                {w}
                {" "}
              </span>
            ))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (
              <span
                key={`i-${i}`}
                className={`hero-word ${SERIF_ITALIC}`}
                style={{
                  animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`,
                  paddingRight: "0.15em",
                  color: "#f3d9a8",
                }}
              >
                {w}
                {" "}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade"
            style={{ animationDelay: "1.05s" }}
          >
            Zwei Formate, ein Abend: Tisch-zu-Tisch zwischen den Gängen und
            eine kompakte Bühnenshow zum Dessert — einzeln oder kombiniert.
            Karten in eurer Hand am Tisch, eine gemeinsame Pointe für alle.
            Eure Gäste reden noch beim Espresso davon.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#format-finder"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Format-Finder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/buchung"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Direkt anfragen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero KPI-Strip — minimal inline (statt großer Glass-Cards) */}
        <div className="relative mt-20 md:mt-28">
          <div
            className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]"
            style={{ animationDelay: "2.0s" }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">200+</strong>
              <span className="text-white/65">Events</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">10+</strong>
              <span className="text-white/65">Magic Dinners</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg">24 h</strong>
              <span className="text-white/65">Antwort</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <span className="text-white/65">Bayern · deutschlandweit</span>
            </span>
          </div>
        </div>
      </div>

    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   1b · TRUST STRIP — „Bekannt aus" als Press-Kit-Strip mit
   Icon-Emblem + Bold-Name + italic-serif Jahr/Sub
   ═══════════════════════════════════════════════════════════ */
const TrustStrip = () => {
  const items = [
    { Icon: Trophy, name: "Greatest Talent",            sub: "2023 · Finalist (TV)" },
    { Icon: Award,  name: "Talents of Magic",           sub: "2024 · Finalist + Kreativpreis" },
    { Icon: Medal,  name: "Deutsche Jugendmeisterschaft", sub: "2024 · Top 30 Deutschland" },
    { Icon: Tv,     name: "TVA",                         sub: "2025 · TV-Auftritt" },
    { Icon: Star,   name: "ProvenExpert",                sub: "5,0 ★ · 30+ Bewertungen" },
  ];
  return (
    <section className="bg-white py-20 md:py-28 border-b border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-14">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-5`}>
              Bühne. TV. Wettbewerb.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3.5rem)] text-foreground">
              Bekannt aus.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-6">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Greatest Talent, Talents of Magic, TVA. Drei TV-Stationen,
              zwei Finalrunden, ein Kreativpreis und die Deutsche
              Jugendmeisterschaft — alles in zweieinhalb Jahren.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {items.map((it) => (
            <article
              key={it.name}
              className="group relative bg-foreground/[0.025] border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:bg-foreground/[0.04] hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
            >
              <div
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(154,38,64,0.16), rgba(154,38,64,0.05))",
                  border: "1px solid rgba(154,38,64,0.22)",
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
              <p className={`${SERIF_ITALIC} text-[12px] md:text-sm text-foreground/55 leading-snug`}>
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
   1c · KUNDEN-REFERENZEN — echte Logo-Cloud (B2B-Kunden)
   ═══════════════════════════════════════════════════════════ */
const KUNDEN_LOGOS = [
  { name: "HEIM & HAUS",                 logo: "/logos/heim-haus.png" },
  { name: "STRABAG",                     logo: "/logos/strabag.png" },
  { name: "Versicherungskammer Bayern",  logo: "/logos/vkb.png" },
  { name: "XXXLutz",                     logo: "/logos/xxxlutz.png" },
  { name: "Sixt",                        logo: "/logos/sixt.png" },
  { name: "Sparkasse",                   logo: "/logos/sparkasse.png" },
  { name: "Schneider Weisse",            logo: "/logos/schneider-weisse.png" },
  { name: "Wald & Wiese",                logo: "/logos/wald-wiese.png" },
  { name: "Stadt Regensburg",            logo: "/logos/stadt-regensburg.png" },
  { name: "Oktoberfest München",         logo: "/logos/oktoberfest.png" },
  { name: "Turmtheater Regensburg",      logo: "/logos/turmtheater.png" },
  { name: "Steinhofer Ingenieure",       logo: "/logos/steinhofer.png" },
];

const KundenReferenzenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-20 md:py-28 border-b border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-5`}>
              Wer mich gebucht hat.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3.5rem)] text-foreground">
              Kunden &{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Referenzen
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-6">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vom Vorstandsdinner über Galaabend bis zur 200-Personen-
              Firmenfeier — eine Auswahl der Unternehmen, Veranstalter und
              Locations, die mich gebucht haben.
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 md:gap-x-14 gap-y-12 md:gap-y-16 items-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {KUNDEN_LOGOS.map((k) => (
            <div
              key={k.name}
              className="group relative flex items-center justify-center min-h-[60px] md:min-h-[80px]"
              title={k.name}
            >
              <img
                src={k.logo}
                alt={`${k.name} — Referenzkunde von Emilian Leber`}
                loading="lazy"
                className="max-h-[56px] md:max-h-[72px] lg:max-h-[80px] max-w-full object-contain opacity-65 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-foreground/55 max-w-2xl">
          Auswahl aus über 200 Engagements. Vollständige Referenzliste mit
          Ansprechpartnern auf Anfrage — viele weitere Kunden bevorzugen es,
          nicht öffentlich genannt zu werden.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · PULL-QUOTE — Black full-bleed transition section
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-28 md:py-40 mt-20 md:mt-28 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.55), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,40,0.5), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div
          className={`max-w-4xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/55 mb-8`}>
            Drei Sekunden später.
          </p>
          <p className="font-display font-bold tracking-[-0.01em] leading-[1.15] text-[clamp(1.75rem,4vw,3.5rem)]">
            Die Karte, die vor Sekunden noch in der Hand der Schwiegermutter
            lag, taucht beim Brautvater im Weinglas auf. Niemand am Tisch
            atmet. Eine halbe Sekunde später{" "}
            <span className={`${SERIF_ITALIC}`}>lacht die ganze Tafel</span>.
          </p>
          <p className="mt-10 text-sm md:text-base text-white/45">
            Genau dieser Moment ist das Produkt — nicht der Trick davor.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · KONZEPT — Editorial Split (text + photo)
   ═══════════════════════════════════════════════════════════ */
const KonzeptSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Foto LEFT — 6 cols, kompakter mit Glass-Stat oben + Glass-Caption unten */}
          <div
            className={`lg:col-span-6 relative ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <div
              className="group relative overflow-hidden h-[360px] md:h-[460px] lg:h-full lg:min-h-[480px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.45), 0 15px 35px -15px rgba(40,20,10,0.25)",
              }}
            >
              <img
                src={emotionenImg}
                alt="Magic Dinner Atmosphäre — Emilian Leber im Restaurant zwischen den Gängen"
                className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />

              {/* Sanfter Bottom-Fade für die Caption */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(8,6,12,0.75) 100%)",
                }}
              />

              {/* Floating Glass-Stat OBEN RECHTS — „5–7 Min pro Tisch" */}
              <div className="absolute top-5 right-5 md:top-7 md:right-7">
                <div
                  className="relative rounded-2xl px-4 py-3 md:px-5 md:py-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.16) 55%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(36px) saturate(180%) brightness(112%)",
                    WebkitBackdropFilter: "blur(36px) saturate(180%) brightness(112%)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                      "0 24px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                    }}
                  />
                  <p
                    className={`${SERIF_ITALIC} text-[11px] md:text-xs text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Wahlweise.
                  </p>
                  <p className="font-display text-base md:text-lg font-black text-white leading-tight mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Tisch · Bühne · <span style={{ color: "#f3d9a8" }}>Combo</span>
                  </p>
                </div>
              </div>

              {/* Glass-Caption UNTEN */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <div
                  className="relative rounded-2xl px-5 py-4 md:px-6 md:py-5 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.04) 100%)",
                    backdropFilter: "blur(34px) saturate(170%)",
                    WebkitBackdropFilter: "blur(34px) saturate(170%)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow:
                      "0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.45)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    }}
                  />
                  <p
                    className={`${SERIF_ITALIC} text-white/80 text-sm md:text-base mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Zwei Formate, ein Abend.
                  </p>
                  <p className="font-display text-base md:text-xl text-white font-bold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Tisch-zu-Tisch oder Bühne für alle. Auch kombiniert.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text RIGHT — 5 cols, mittig zentriert mit Inline-Stat-Row unten */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Das Konzept.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Tisch oder Bühne.
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Oder beides.
              </span>
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-[1.7] text-foreground/65">
              <p>
                Klassisch heißt Magic Dinner: Ich gehe zwischen den Gängen
                von Tisch zu Tisch. Karten, Münzen, ein Ring direkt in euren
                Händen — fünf bis sieben Minuten pro Runde, getaktet mit der
                Küche, eingebettet in den Service.
              </p>
              <p>
                Auf Wunsch kombiniert mit einer kompakten Bühnenshow zum
                Dessert: zehn bis fünfzehn Minuten für alle Gäste
                gleichzeitig — ein gemeinsamer Wow-Moment als Schlusspunkt.
                Tisch, Bühne oder beides — euer Abend bestimmt das Format.
              </p>
            </div>

            {/* Inline Stat-Row */}
            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-foreground/12">
              {[
                { num: "5–7", sub: "Min pro Tisch", accent: false },
                { num: "10–15", sub: "Min Bühnen-Finale", accent: true },
                { num: "25–120", sub: "Gäste-Range", accent: false },
              ].map((s) => (
                <div key={s.sub}>
                  <p
                    className="font-display font-black text-foreground text-2xl md:text-[2rem] tabular-nums leading-none"
                    style={s.accent ? { color: ACCENT } : undefined}
                  >
                    {s.num}
                  </p>
                  <p
                    className={`${SERIF_ITALIC} text-foreground/55 text-xs md:text-sm mt-2 leading-tight`}
                  >
                    {s.sub}
                  </p>
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
   4 · FORMAT-SELECTOR — Tisch · Bühne · Combo
   Interaktiv: Hover/Click wechselt Auswahl + Foto + Body
   ═══════════════════════════════════════════════════════════ */
type FormatOption = {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  photo: string;
  photoAlt: string;
  caption: string;
  stat: { num: string; sub: string };
};

const FORMAT_OPTIONS: FormatOption[] = [
  {
    num: "01",
    eyebrow: "Klassisch · Intim",
    title: "Tisch-zu-Tisch.",
    body: "Ich bewege mich wie ein zusätzlicher Gast zwischen euren Tischen. Karten, Münzen, ein Ring — Magie direkt in euren Händen. Fünf bis sieben Minuten pro Tisch, eingebettet zwischen die Gänge. Jeder Tisch bekommt sein eigenes Programm.",
    photo: haendeImg,
    photoAlt:
      "Magic Dinner Tisch-zu-Tisch — Emilian Leber zaubert direkt am Tisch im Restaurant",
    caption: "Karten in eurer Hand.",
    stat: { num: "5–7", sub: "Min pro Tisch" },
  },
  {
    num: "02",
    eyebrow: "Gemeinsam · Wow-Moment",
    title: "Bühne für alle.",
    body: "Zehn bis zwanzig Minuten Bühnenshow für alle Gäste gleichzeitig. Ein, zwei große Effekte, eine Pointe, die jeder am Tisch zusammen erlebt. Krönender Schlusspunkt zum Dessert — Standing Ovation inklusive.",
    photo: buehneZuschauerImg,
    photoAlt:
      "Magic Dinner Bühnenshow — Emilian Leber auf der Bühne mit Publikum",
    caption: "Alle hören dieselbe Pointe.",
    stat: { num: "10–20", sub: "Min Bühnen-Slot" },
  },
  {
    num: "03",
    eyebrow: "Combo · Empfehlung ab 60 Gäste",
    title: "Tisch + Bühne.",
    body: "Der ganze Abend: Während Vorspeise und Hauptgang persönlich von Tisch zu Tisch. Zum Dessert dann der gemeinsame Bühnen-Moment für alle. Idealer Erzählbogen — niemand wird übergangen, und am Ende erlebt jeder denselben Wow-Moment.",
    photo: staunenImg,
    photoAlt:
      "Magic Dinner Combo — Tisch-zu-Tisch plus Bühnen-Finale, Reaktionen der Gäste",
    caption: "Beides — wenn der Abend Substanz braucht.",
    stat: { num: "60+", sub: "Gäste optimal" },
  },
];

const DreiSaeulenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState(0);
  const current = FORMAT_OPTIONS[active];

  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        {/* Header — 2 Spalten wie Frameblox */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Drei Formate.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Wählt euer{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Format
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Magic Dinner lässt sich auf drei Arten erleben. Intim am Tisch,
              gemeinsam auf der Bühne — oder beides kombiniert. Tippt euch
              durch die Optionen und seht den passenden Moment.
            </p>
          </div>
        </div>

        {/* Format-Selector Grid */}
        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* LEFT — Clickable Format-List */}
          <div className="lg:col-span-5 space-y-3">
            {FORMAT_OPTIONS.map((opt, i) => {
              const isActive = active === i;
              return (
                <button
                  key={opt.num}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`group relative block w-full text-left rounded-2xl px-6 py-6 md:px-7 md:py-7 transition-all duration-500 overflow-hidden ${
                    isActive
                      ? "bg-foreground/[0.04] shadow-[0_20px_50px_-25px_rgba(0,0,0,0.18)]"
                      : "hover:bg-foreground/[0.025]"
                  }`}
                  style={{
                    borderLeft: `3px solid ${
                      isActive ? ACCENT : "rgba(0,0,0,0.08)"
                    }`,
                  }}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-none shrink-0 transition-colors duration-500`}
                      style={{
                        color: isActive ? ACCENT : "rgba(0,0,0,0.28)",
                      }}
                    >
                      {opt.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-[11px] tracking-[0.14em] uppercase font-semibold mb-1.5 transition-colors duration-500 ${
                          isActive
                            ? "text-foreground/70"
                            : "text-foreground/40"
                        }`}
                      >
                        {opt.eyebrow}
                      </p>
                      <h3
                        className={`font-display text-xl md:text-2xl font-bold leading-tight transition-colors duration-500 ${
                          isActive ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        {opt.title}
                      </h3>
                      {/* Body nur bei active sichtbar — Accordion-Style */}
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: isActive ? "300px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p className="mt-4 text-base text-foreground/65 leading-[1.65]">
                          {opt.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT — Cross-fade Foto mit Glass-Caption + Stat */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div
              className="relative overflow-hidden h-[420px] md:h-[520px] lg:h-[600px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.5), 0 15px 35px -15px rgba(40,20,10,0.25)",
              }}
            >
              {FORMAT_OPTIONS.map((opt, i) => (
                <img
                  key={opt.num}
                  src={opt.photo}
                  alt={opt.photoAlt}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                  loading="lazy"
                />
              ))}

              {/* Bottom-fade for legibility */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,6,12,0.78) 100%)",
                }}
              />

              {/* Glass Stat — top right (wechselt mit Selection) */}
              <div className="absolute top-5 right-5 md:top-7 md:right-7">
                <div
                  className="relative rounded-2xl px-4 py-3 md:px-5 md:py-4 overflow-hidden transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.16) 55%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(36px) saturate(180%) brightness(112%)",
                    WebkitBackdropFilter:
                      "blur(36px) saturate(180%) brightness(112%)",
                    border: "1px solid rgba(255,255,255,0.35)",
                    boxShadow:
                      "0 24px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                    }}
                  />
                  <p
                    className={`${SERIF_ITALIC} text-[11px] md:text-xs text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    {current.eyebrow.split(" · ")[0]}.
                  </p>
                  <p className="font-display text-xl md:text-2xl font-black text-white tabular-nums leading-none mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {current.stat.num}{" "}
                    <span className="text-white/65 text-sm font-bold">
                      {current.stat.sub}
                    </span>
                  </p>
                </div>
              </div>

              {/* Glass Caption — bottom (wechselt mit Selection) */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <div
                  className="relative rounded-2xl px-5 py-4 md:px-6 md:py-5 overflow-hidden max-w-md transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.04) 100%)",
                    backdropFilter: "blur(34px) saturate(170%)",
                    WebkitBackdropFilter: "blur(34px) saturate(170%)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow:
                      "0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.45)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    }}
                  />
                  <p
                    className={`${SERIF_ITALIC} text-white/80 text-sm md:text-base mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    {current.title}
                  </p>
                  <p className="font-display text-base md:text-lg text-white font-bold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {current.caption}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · ABLAUF — typografische Zeit-Liste
   ═══════════════════════════════════════════════════════════ */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const phasen = [
    {
      time: "19:00",
      label: "Empfang",
      title: "Walk-Around beim Aperitif.",
      text: "Während die Gäste eintreffen und beim Sekt stehen, mische ich mich unter sie. Karten im Stehen, ein Effekt für drei Leute, dann der nächste Cluster. Eisbrecher zwischen Menschen, die sich noch nicht kennen.",
    },
    {
      time: "19:45",
      label: "Erster Gang",
      title: "Erste Tischrunde.",
      text: "Vorspeise ist serviert, die Tische sind aufgewärmt. Ich beginne an Tisch eins mit einer Mini-Sequenz von fünf bis sieben Minuten. Karten, eine signierte Karte, ein Moment mit einem Ring oder einer Uhr.",
    },
    {
      time: "20:30",
      label: "Hauptgang",
      title: "Zweite Runde — die Tische sind warm.",
      text: "Jetzt zieht die Dynamik an. Tische, die mich schon kennen, erwarten mich. Tische, die ich noch nicht hatte, hören das Lachen vom Nachbartisch. Die Tafel wird zur Bühne — ohne Bühne.",
    },
    {
      time: "21:45",
      label: "Bühnen-Finale",
      title: "Wow-Moment für alle.",
      text: "Zum Dessert der Bühnenmoment für alle Gäste gleichzeitig: zehn bis zwanzig Minuten mit ein, zwei großen Effekten. Alle Tische hören dieselbe Pointe — Standing Ovation als Schlusspunkt. Wahlweise zubuchbar, ab 60 Gästen empfehle ich es klar.",
    },
  ];
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
            Wie ein Abend abläuft.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            Vier Phasen.
            <br />
            <span className={SERIF_ITALIC}>Tisch und Bühne.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-foreground/60 leading-[1.6]">
            Zeitliche Orientierung für einen Abend mit etwa achtzig Gästen,
            Drei-Gänge-Menü und gebuchtem Bühnen-Finale. Bei reiner
            Tischmagie fällt Phase 4 weg, bei kleineren Runden wird alles
            kompakter.
          </p>
        </div>

        <ol
          className={`max-w-5xl border-t border-foreground/15 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {phasen.map((p, i) => (
            <li
              key={p.label}
              className="grid grid-cols-[90px_1fr] md:grid-cols-[140px_200px_1fr] gap-x-6 gap-y-3 py-10 md:py-12 border-b border-foreground/15"
            >
              <div className="font-display text-2xl md:text-3xl font-black text-foreground/85 tabular-nums">
                {p.time}
              </div>
              <div className="hidden md:flex items-baseline gap-3">
                <span
                  className={`${SERIF_ITALIC} text-xl`}
                  style={{ color: i === 0 ? ACCENT : "rgba(0,0,0,0.35)" }}
                >
                  0{i + 1}
                </span>
                <p className="text-[12px] tracking-[0.12em] uppercase text-foreground/55 font-semibold">
                  {p.label}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="md:hidden text-[12px] tracking-[0.12em] uppercase text-foreground/55 font-semibold mb-2">
                  {p.label}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">
                  {p.title}
                </h3>
                <p className="text-base text-foreground/65 leading-[1.7] max-w-2xl">
                  {p.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · BEISPIEL-ABEND — Magazine-Reportage als vertical Timeline
   mit Sticky-Foto und Pull-Quote
   ═══════════════════════════════════════════════════════════ */
const REPORTAGE_PHASES = [
  {
    num: "01",
    time: "18:45",
    title: "Verkleidet als Gast.",
    body: "Die Anfrage kam von der Tochter — Überraschung für den Papa zum Sechzigsten. Wichtigste Vorgabe: er darf bis Sekunde eins nicht wissen, dass jemand gebucht ist. Ich kam im Stehkragen wie ein Restaurant-Gast an, eine Viertelstunde vor Aperitif.",
  },
  {
    num: "02",
    time: "19:00",
    title: "Erste Karte am Sektstand.",
    body: "Beim Empfang habe ich mich als entfernter Bekannter angemeldet. Dem Geburtstagskind die erste Karte hingehalten — sechs Sekunden später war die ganze Tafel verwirrt, woher der Typ kommt und warum er gerade eine Karte aus der Brusttasche zieht.",
  },
  {
    num: "03",
    time: "19:45 – 21:30",
    title: "Tischrunden mit Insider-Anekdoten.",
    body: "Während Vorspeise und Hauptgang ging ich von Tisch zu Tisch. Die Tochter hatte mir vorher fünf Anekdoten geschickt — eine Uhr, ein bestimmtes Bier, der Schwiegersohn als Skeptiker. Daraus baue ich Mini-Routinen, die nur dieser Tisch versteht.",
  },
  {
    num: "04",
    time: "22:15",
    title: "Finale im Marmeladenglas.",
    body: "Zum Espresso die letzte Pointe: eine signierte Karte taucht in einem versiegelten Marmeladenglas auf — das vier Stunden lang sichtbar auf dem Sideboard stand. Mutter hat geweint. Mehr Erfolg geht nicht.",
  },
];

const BeispielAbendSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const phaseRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activePhase, setActivePhase] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = phaseRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting) {
            setActivePhase((prev) => Math.max(prev, idx));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    phaseRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fillPct =
    activePhase < 0
      ? 0
      : ((activePhase + 1) / REPORTAGE_PHASES.length) * 100;

  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        {/* Header — 2 Spalten */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Eine reale Reportage.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Sechzigster.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Mit Marmeladenglas.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md mb-6">
              Was eine Überraschung für den Papa zum Sechzigsten in einen
              Magic-Dinner-Abend verwandelt hat — Schritt für Schritt,
              eingebettet in den Service-Takt eines Restaurants in
              Niederbayern.
            </p>
            {/* Meta-Stats inline */}
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-foreground/55">
              <span className="text-sm">
                <strong className="text-foreground font-bold">45</strong> Gäste
              </span>
              <span aria-hidden className="text-foreground/20">·</span>
              <span className="text-sm">
                <strong className="text-foreground font-bold">3</strong> Gänge
              </span>
              <span aria-hidden className="text-foreground/20">·</span>
              <span className="text-sm">
                <strong className="text-foreground font-bold">8</strong> Tische
              </span>
              <span aria-hidden className="text-foreground/20">·</span>
              <span className="text-sm">
                <strong className="text-foreground font-bold">2,5</strong> h
              </span>
            </div>
          </div>
        </div>

        {/* Timeline + Sticky Photo */}
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* LEFT — Vertical Timeline mit Scroll-Activation */}
          <div className="lg:col-span-7 relative">
            {/* Background-Line — durchgehende graue Spur */}
            <div
              aria-hidden
              className="absolute left-[14px] md:left-[18px] top-4 bottom-4 w-px bg-foreground/12"
            />
            {/* Fill-Line — wächst je nach Scroll-Position bis zur aktiven Phase */}
            <div
              aria-hidden
              className="absolute left-[14px] md:left-[18px] top-4 w-[2px] -translate-x-[0.5px] origin-top transition-[height] duration-700 ease-out"
              style={{
                height: `calc(${fillPct}% - 1rem)`,
                background:
                  "linear-gradient(180deg, rgba(154,38,64,0.85) 0%, rgba(154,38,64,0.55) 100%)",
                boxShadow: "0 0 12px rgba(154,38,64,0.35)",
              }}
            />
            <ol className="space-y-12 md:space-y-14">
              {REPORTAGE_PHASES.map((p, i) => {
                const isActive = activePhase >= i;
                return (
                  <li
                    key={p.num}
                    ref={(el) => { phaseRefs.current[i] = el; }}
                    className="relative pl-12 md:pl-16"
                  >
                    {/* Number bubble — wechselt Farbe wenn aktiv */}
                    <div
                      className="absolute left-0 top-0 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center font-display font-black text-white text-[10px] md:text-xs transition-all duration-500 ease-out"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`
                          : "linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.32))",
                        boxShadow: isActive
                          ? `0 0 0 4px hsl(36,30%,97%), 0 0 24px rgba(154,38,64,0.4), 0 8px 22px -4px rgba(154,38,64,0.5)`
                          : "0 0 0 4px hsl(36,30%,97%), 0 4px 12px -3px rgba(0,0,0,0.18)",
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {p.num}
                    </div>
                    <p
                      className={`${SERIF_ITALIC} text-base md:text-lg mb-1.5 transition-colors duration-500`}
                      style={{
                        color: isActive
                          ? ACCENT
                          : "rgba(0,0,0,0.42)",
                      }}
                    >
                      {p.time}
                    </p>
                    <h3
                      className="font-display text-xl md:text-2xl font-bold leading-snug mb-3 transition-colors duration-500"
                      style={{
                        color: isActive
                          ? "rgb(15, 10, 25)"
                          : "rgba(0,0,0,0.45)",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-base md:text-[17px] leading-[1.7] max-w-xl transition-colors duration-500"
                      style={{
                        color: isActive
                          ? "rgba(0,0,0,0.78)"
                          : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {p.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* RIGHT — Sticky Photo mit Glass-Caption */}
          <div className="lg:col-span-5 lg:h-full">
            <div
              className="relative overflow-hidden lg:sticky lg:top-24 w-full"
              style={{
                borderRadius: "1.25rem",
                height: "min(72vh, 640px)",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.4), 0 15px 35px -15px rgba(40,20,10,0.2)",
              }}
            >
              <img
                src={bookImg}
                alt="Magic Dinner Reportage — Tischrunde mit Karteneffekt während des Hauptgangs in einem Restaurant in Niederbayern"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,6,12,0.75) 100%)",
                }}
              />
              {/* Photo-Label (Glass) */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <div
                  className="relative rounded-2xl px-5 py-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.04) 100%)",
                    backdropFilter: "blur(34px) saturate(170%)",
                    WebkitBackdropFilter: "blur(34px) saturate(170%)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow:
                      "0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.45)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                    }}
                  />
                  <p
                    className={`${SERIF_ITALIC} text-white/80 text-xs md:text-sm mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Tischrunde, Hauptgang.
                  </p>
                  <p className="font-display text-sm md:text-base text-white font-bold leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Mini-Sequenz mit der Tochter und dem Schwiegersohn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pull-Quote am Ende */}
        <div className="max-w-3xl mx-auto text-center mt-20 md:mt-28 pt-14 md:pt-16 border-t border-foreground/12">
          <p
            className={`${SERIF_ITALIC} text-2xl md:text-[34px] leading-[1.3] text-foreground/85`}
          >
            „Mutter hat geweint.
            <br />
            <span style={{ color: ACCENT }}>Mehr Erfolg geht nicht."</span>
          </p>
          <p className="mt-5 text-sm tracking-[0.12em] uppercase text-foreground/45 font-semibold">
            — Notiz aus dem Briefing-Call
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · QUIZ — Format-Finder
   ═══════════════════════════════════════════════════════════ */
const magicDinnerQuizConfig: QuizConfig = {
  anlass: "Magic Dinner",
  sectionEyebrow: "Format-Finder",
  sectionTitle: <>Was passt zu eurem Abend?</>,
  sectionDesc:
    "Vier kurze Fragen, eine Empfehlung. Abgestimmt auf eure Gästezahl, den Anlass und ob ihr eher in Richtung intim oder gemeinsamer Wow-Moment unterwegs seid.",
  compact: true,
  questions: [
    {
      id: "groesse",
      shortLabel: "Gästezahl",
      title: <>Wie groß ist die Runde?</>,
      hint: "Bei kleinen Runden funktioniert reines Tisch-zu-Tisch. Bei größeren lohnt sich ein Bühnen-Finale zum Dessert.",
      cols: { md: 3 },
      options: [
        { value: "klein", label: "bis 25 Gäste", sub: "Eine Tafel oder zwei Tische" },
        { value: "mittel", label: "25 – 60 Gäste", sub: "Vier bis sechs Tische" },
        { value: "gross", label: "60 – 120 Gäste", sub: "Acht Tische und mehr" },
      ],
    },
    {
      id: "anlass",
      shortLabel: "Anlass",
      title: <>Was ist der Anlass?</>,
      hint: "Davon hängt die Tonalität ab — privat ist persönlicher, geschäftlich einen Tick eleganter.",
      cols: { md: 2, lg: 4 },
      options: [
        { value: "geburtstag", label: "Geburtstag · Jubiläum", sub: "Privat, persönliche Anekdoten" },
        { value: "hochzeit", label: "Hochzeitsdinner", sub: "Brautpaar im Fokus" },
        { value: "firma", label: "Firmen-Dinner", sub: "Kunden, Vorstand, VIP" },
        { value: "weihnachten", label: "Weihnachtsfeier", sub: "Team, lockerer Ton" },
      ],
    },
    {
      id: "ton",
      shortLabel: "Stimmung",
      title: <>Welche Stimmung schwebt euch vor?</>,
      hint: "Davon hängt ab, ob ich eher eskaliere oder Ruhe halte.",
      cols: { md: 3 },
      options: [
        { value: "intim", label: "Intim & elegant", sub: "Kleine, stille Wunder" },
        { value: "warm", label: "Warm & familiär", sub: "Lachen, Persönliches" },
        { value: "wow", label: "Wow-Moment am Ende", sub: "Bühnen-Finale für alle" },
      ],
    },
    {
      id: "kombi",
      shortLabel: "Format",
      title: <>Reines Tisch-Magic oder mit Show-Slot?</>,
      hint: "Zum Dessert ein gemeinsamer Bühnen-Moment ist optional — bei größeren Runden empfehle ich es.",
      cols: { md: 2 },
      options: [
        { value: "tisch", label: "Nur Tisch-zu-Tisch", sub: "Persönlich, ohne Bühne" },
        { value: "mix", label: "Tisch + Show-Finale", sub: "Bühnen-Moment zum Dessert" },
      ],
    },
  ],
  buildEmpfehlung: (a) => {
    const { groesse, anlass, ton, kombi } = a;
    if (groesse === "klein" || ton === "intim") {
      return {
        format: "Intime Tafel-Magie",
        sub: "Fünf bis sieben Minuten pro Tisch · zwei Tischrunden · ohne Bühne",
        why: "Bei einer kleinen Runde wirkt jede Bühne fehl am Platz. Statt dessen bewege ich mich wie ein zusätzlicher Gast — zwischen den Gängen entstehen kleine, stille Wunder direkt in euren Händen. Karten, ein Ring, eine signierte Geschichte, die am Tisch bleibt.",
        link: "/buchung",
      };
    }
    if (kombi === "mix" || ton === "wow" || groesse === "gross") {
      return {
        format: "Magic Dinner mit Show-Finale",
        sub: "Tischrunden plus Bühnenmoment zum Dessert",
        why: "Während der Gänge gehe ich von Tisch zu Tisch — jeder Tisch bekommt sein eigenes Programm. Zum Dessert dann ein kompaktes Bühnen-Finale, in dem alle Tische denselben Wow-Moment teilen. Idealer Erzählbogen ab sechzig Gästen.",
        link: "/buehnenshow",
      };
    }
    if (anlass === "hochzeit") {
      return {
        format: "Tisch-zu-Tisch beim Hochzeitsdinner",
        sub: "Fünf bis sieben Minuten pro Tisch · zwischen Vorspeise und Hauptgang",
        why: "Während ihr als Brautpaar mit dem Fotografen unterwegs seid oder die Reden hört, halte ich die Tische warm. Trauzeugen, Großeltern, Kollegen — alle bekommen ihre eigene Mini-Show, niemand wird übergangen.",
        link: "/hochzeit",
      };
    }
    return {
      format: "Klassisches Magic Dinner",
      sub: "Walk-Around-Empfang plus zwei Tischrunden zwischen den Gängen",
      why: "Der bewährte Ablauf für fünfundzwanzig bis sechzig Gäste: ich bin schon beim Aperitif unter den Gästen, gehe während Vorspeise und Hauptgang von Tisch zu Tisch. Eingebettet in den Service-Takt — ihr müsst nichts vorbereiten.",
      link: "/buchung",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "klein" ? 20 : a.groesse === "mittel" ? 45 : a.groesse === "gross" ? 90 : null,
};

/* ─── Magic-Dinner Custom Quiz ────────────────────────────── */
type QuizOpt = { value: string; label: string; sub: string };
type QuizQ = {
  id: string;
  eyebrow: string;
  title: string;
  hint: string;
  feedback: string;
  options: QuizOpt[];
  cols: number;
};
const MD_QUIZ: QuizQ[] = [
  {
    id: "groesse",
    eyebrow: "Frage 01 · Gästezahl",
    title: "Wie groß wird eure Runde?",
    hint: "Bei kleinen Runden funktioniert reines Tisch-zu-Tisch. Bei größeren lohnt sich ein Bühnen-Finale.",
    feedback: "Gute Wahl.",
    cols: 4,
    options: [
      { value: "klein",  label: "bis 25 Gäste",     sub: "Eine Tafel oder zwei Tische" },
      { value: "mittel", label: "25 – 60 Gäste",    sub: "Vier bis sechs Tische" },
      { value: "gross",  label: "60 – 120 Gäste",   sub: "Acht Tische und mehr" },
      { value: "sonst",  label: "Andere Größe",     sub: "Sag mir deine Zahl" },
    ],
  },
  {
    id: "anlass",
    eyebrow: "Frage 02 · Anlass",
    title: "Was ist der Anlass?",
    hint: "Davon hängt die Tonalität ab — privat ist persönlicher, geschäftlich einen Tick eleganter.",
    feedback: "Spannender Anlass.",
    cols: 3,
    options: [
      { value: "geburtstag",  label: "Geburtstag · Jubiläum", sub: "Privat & persönlich" },
      { value: "hochzeit",    label: "Hochzeitsdinner",       sub: "Brautpaar im Fokus" },
      { value: "firma",       label: "Firmen-Dinner",         sub: "Kunden · Vorstand · VIP" },
      { value: "weihnachten", label: "Weihnachtsfeier",       sub: "Team · lockerer Ton" },
      { value: "vereinsfeier",label: "Vereins- · Jubiläumsfeier", sub: "Verein, Stiftung, Verband" },
      { value: "sonst",       label: "Anderer Anlass",        sub: "Sag mir, worum es geht" },
    ],
  },
  {
    id: "ton",
    eyebrow: "Frage 03 · Stimmung",
    title: "Welche Stimmung schwebt euch vor?",
    hint: "Davon hängt ab, ob ich eher eskaliere oder Ruhe halte.",
    feedback: "Klingt nach einem besonderen Abend.",
    cols: 4,
    options: [
      { value: "intim", label: "Intim & elegant",       sub: "Kleine, stille Wunder" },
      { value: "warm",  label: "Warm & familiär",       sub: "Lachen, Persönliches" },
      { value: "wow",   label: "Wow-Moment am Ende",    sub: "Bühnen-Finale für alle" },
      { value: "sonst", label: "Weiß ich noch nicht",   sub: "Wir besprechen das" },
    ],
  },
  {
    id: "kombi",
    eyebrow: "Frage 04 · Format",
    title: "Reines Tisch-Magic oder mit Show-Slot?",
    hint: "Zum Dessert ein gemeinsamer Bühnen-Moment ist optional — bei größeren Runden empfehle ich es.",
    feedback: "Perfekt — euer Format steht.",
    cols: 3,
    options: [
      { value: "tisch", label: "Nur Tisch-zu-Tisch",   sub: "Persönlich, ohne Bühne" },
      { value: "mix",   label: "Tisch + Bühnen-Finale", sub: "Krönung zum Dessert" },
      { value: "sonst", label: "Empfiehl mir was",      sub: "Ich vertraue deinem Vorschlag" },
    ],
  },
];

type Recommendation = { format: string; sub: string; why: string; link: string };
function recommend(a: Record<string, string>): Recommendation {
  const { groesse, anlass, ton, kombi } = a;
  if (groesse === "klein" || ton === "intim") {
    return {
      format: "Intime Tafel-Magie",
      sub: "5–7 Min pro Tisch · zwei Tischrunden · ohne Bühne",
      why: "Bei einer kleinen Runde wirkt jede Bühne fehl am Platz. Statt dessen bewege ich mich wie ein zusätzlicher Gast — zwischen den Gängen entstehen kleine, stille Wunder direkt in euren Händen. Karten, ein Ring, eine signierte Geschichte, die am Tisch bleibt.",
      link: "/buchung",
    };
  }
  if (kombi === "mix" || ton === "wow" || groesse === "gross") {
    return {
      format: "Magic Dinner mit Bühnen-Finale",
      sub: "Tischrunden + Bühnenmoment zum Dessert",
      why: "Während der Gänge gehe ich von Tisch zu Tisch — jeder Tisch bekommt sein eigenes Programm. Zum Dessert dann ein kompaktes Bühnen-Finale, in dem alle denselben Wow-Moment teilen. Idealer Erzählbogen ab sechzig Gästen.",
      link: "/buehnenshow",
    };
  }
  if (anlass === "hochzeit") {
    return {
      format: "Tisch-zu-Tisch beim Hochzeitsdinner",
      sub: "5–7 Min pro Tisch · zwischen Vorspeise und Hauptgang",
      why: "Während ihr als Brautpaar mit dem Fotografen unterwegs seid oder die Reden hört, halte ich die Tische warm. Trauzeugen, Großeltern, Kollegen — alle bekommen ihre eigene Mini-Show, niemand wird übergangen.",
      link: "/hochzeit",
    };
  }
  return {
    format: "Klassisches Magic Dinner",
    sub: "Walk-Around-Empfang + zwei Tischrunden zwischen den Gängen",
    why: "Der bewährte Ablauf für 25–60 Gäste: ich bin schon beim Aperitif unter den Gästen, gehe während Vorspeise und Hauptgang von Tisch zu Tisch. Eingebettet in den Service-Takt — ihr müsst nichts vorbereiten.",
    link: "/buchung",
  };
}

const CONFETTI_COUNT = 36;
const CONFETTI_COLORS = ["#f3d9a8", "#c79042", "#9a2640", "#5c1622", "#1f5e3f", "#ffffff"];

const MagicDinnerQuiz = ({ onDark = false }: { onDark?: boolean }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [done, setDone] = useState(false);

  const q = MD_QUIZ[step];

  function handleSelect(value: string) {
    if (selected) return;
    setSelected(value);
    setFeedback(q.feedback);
    const isLast = step + 1 >= MD_QUIZ.length;
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
    const rec = recommend(answers);
    return (
      <ResultWithForm
        rec={rec}
        answers={answers}
        showConfetti={confetti}
        onReset={reset}
        onDark={onDark}
      />
    );
  }

  // Theme-Helpers (light = weiß-Hintergrund, dark = auf Section-Backdrop)
  const txt = onDark ? "text-white" : "text-foreground";
  const txtMute = onDark ? "text-white/60" : "text-foreground/55";
  const txtSub = onDark ? "text-white/70" : "text-foreground/60";
  const barBase = onDark ? "bg-white/10" : "bg-foreground/8";

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <p className={`text-[11px] md:text-xs tracking-[0.14em] uppercase font-semibold ${txtMute}`}>
          {q.eyebrow}
        </p>
        <p className={`${SERIF_ITALIC} text-sm ${txtMute}`}>
          {step + 1} / {MD_QUIZ.length}
        </p>
      </div>
      <div className="flex gap-1.5 mb-10 md:mb-14">
        {MD_QUIZ.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full overflow-hidden ${barBase}`}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: i < step ? "100%" : i === step ? (selected ? "100%" : "30%") : "0%",
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
          // Dark-Theme: glass cards, white text. Light-Theme: white cards, dark text.
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
              ? `0 30px 60px -20px rgba(154,38,64,0.45), inset 0 0 0 1px ${ACCENT}`
              : `0 25px 50px -20px rgba(154,38,64,0.35), inset 0 0 0 1px ${ACCENT}`
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
                  className={`${SERIF_ITALIC} text-xs md:text-sm leading-snug ${
                    onDark ? "text-white/65" : "text-foreground/55"
                  }`}
                >
                  {opt.sub}
                </p>
              </div>
              {/* Checkmark wenn ausgewählt */}
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

      {/* Feedback-Toast */}
      {feedback && (
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-14 md:-bottom-16 z-10"
        >
          <div
            className="rounded-full px-5 py-2.5 text-sm font-display font-bold text-white shadow-2xl animate-fade-up flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              boxShadow: "0 20px 40px -10px rgba(154,38,64,0.5)",
            }}
          >
            <span>{feedback}</span>
            <span className="text-base">{step + 1 === MD_QUIZ.length ? "🎉" : "✨"}</span>
          </div>
        </div>
      )}

      {/* Konfetti — nur bei letzter Frage nach Selection */}
      {confetti && <ConfettiBurst />}
    </div>
  );
};

/* ─── Result + Inline-Anfrage-Formular ────────────────────── */
type ResultProps = {
  rec: Recommendation;
  answers: Record<string, string>;
  showConfetti: boolean;
  onReset: () => void;
  onDark?: boolean;
};

const ResultWithForm = ({ rec, answers, showConfetti, onReset, onDark = false }: ResultProps) => {
  const [form, setForm] = useState({ name: "", email: "", datum: "", nachricht: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Mit allen Quiz-Antworten + Form-Daten zur Buchungs-Seite
    const params = new URLSearchParams({
      anlass: "Magic Dinner",
      format: rec.format,
      gaeste:
        answers.groesse === "klein"
          ? "20"
          : answers.groesse === "mittel"
          ? "45"
          : answers.groesse === "gross"
          ? "90"
          : "",
      typ:
        answers.anlass === "hochzeit"
          ? "Hochzeitsdinner"
          : answers.anlass === "firma"
          ? "Firmen-Dinner"
          : answers.anlass === "weihnachten"
          ? "Weihnachtsfeier"
          : answers.anlass === "vereinsfeier"
          ? "Vereinsfeier"
          : answers.anlass === "geburtstag"
          ? "Geburtstag"
          : "",
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
      {showConfetti && <ConfettiBurst />}

      {/* Header — Empfehlung */}
      <div className="mb-7 md:mb-8">
        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-3`}>
          Eure Empfehlung.
        </p>
        <h3 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.6vw,2.75rem)] text-foreground mb-3">
          {rec.format}
        </h3>
        <p
          className={`${SERIF_ITALIC} text-base md:text-lg mb-5`}
          style={{ color: ACCENT }}
        >
          {rec.sub}
        </p>
        <p className="text-base text-foreground/70 leading-[1.65] max-w-2xl">
          {rec.why}
        </p>
      </div>

      {/* Antworten-Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {MD_QUIZ.map((qq) => {
          const opt = qq.options.find((o) => o.value === answers[qq.id]);
          if (!opt) return null;
          return (
            <span
              key={qq.id}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-foreground/[0.04] border border-foreground/10"
            >
              <span className="text-foreground/45">
                {qq.eyebrow.split(" · ")[1]}:
              </span>
              <span className="font-display font-bold text-foreground">
                {opt.label}
              </span>
            </span>
          );
        })}
      </div>

      {/* Inline-Formular */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-foreground/[0.03] border border-foreground/10 p-5 md:p-7"
      >
        <div className="flex items-baseline justify-between mb-5">
          <p
            className={`${SERIF_ITALIC} text-lg text-foreground/70`}
          >
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
            className="hero-cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white transition-all disabled:opacity-70"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
              boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)",
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

const ConfettiBurst = () => (
  <div className="pointer-events-none absolute inset-0 overflow-visible z-20">
    <style>{`
      @keyframes confettiDrop {
        0% { transform: translate(0,0) rotate(0); opacity: 0; }
        10% { opacity: 1; }
        100% { transform: translate(var(--cx,0), var(--cy,500px)) rotate(720deg); opacity: 0; }
      }
      .confetti-particle {
        position: absolute;
        top: 0%;
        left: 50%;
        will-change: transform, opacity;
        animation: confettiDrop 2.2s cubic-bezier(0.2, 0.6, 0.3, 1) forwards;
      }
    `}</style>
    {Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
      const angle = (Math.random() * 2 - 1) * Math.PI * 0.45;
      const dist = 250 + Math.random() * 450;
      const cx = Math.sin(angle) * dist;
      const cy = 220 + Math.random() * 480;
      const size = 6 + Math.random() * 8;
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const delay = Math.random() * 0.25;
      const rounded = Math.random() > 0.5;
      return (
        <span
          key={i}
          className="confetti-particle"
          style={{
            ["--cx" as any]: `${cx}px`,
            ["--cy" as any]: `${cy}px`,
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

const QuizSection = () => (
  <section
    id="format-finder"
    className="bg-white py-20 md:py-28"
  >
    <div className="container px-6">
      <div className="relative max-w-5xl mx-auto">
        <MagicDinnerQuiz />
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   8 · ANLÄSSE — 2x2 mixed-treatment Format-Karten
   (Frameblox „Plan smarter. Focus better."-Stil)
   ═══════════════════════════════════════════════════════════ */
const AnlaesseSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Wann ein Magic Dinner passt.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
              Vier Anlässe.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Ein Format.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Das Magic Dinner passt zu vielen Anlässen — immer dann, wenn aus
              einem Abendessen ein Abend werden soll, an den sich die Gäste
              noch lange erinnern. Tonfall und Programm passen sich an.
            </p>
          </div>
        </div>

        <div
          className={`space-y-4 md:space-y-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* Row 1: 60% colored + 40% clean */}
          <div className="grid md:grid-cols-[3fr_2fr] gap-4 md:gap-5">
          {/* Card 1 — WARM GRADIENT only, breiter, Title bottom-left */}
          <article
            className="group relative overflow-hidden text-white transition-transform duration-500 hover:-translate-y-1 h-[320px] md:h-[380px]"
            style={{
              borderRadius: "1.5rem",
              background:
                "linear-gradient(135deg, #f8d76b 0%, #f0a35a 30%, #d76a55 65%, #9a2640 100%)",
              boxShadow: "0 35px 70px -25px rgba(154,38,64,0.45)",
            }}
          >
            {/* Innerer Soft-Glare */}
            <span
              aria-hidden
              className="absolute -top-20 -left-20 w-[320px] h-[320px] rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,230,180,0.7), transparent 70%)",
              }}
            />
            {/* Warmer akzent-glow rechts oben */}
            <span
              aria-hidden
              className="absolute -top-10 right-0 w-[280px] h-[280px] rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,200,140,0.6), transparent 70%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 lg:p-12 max-w-xl">
              <p
                className={`${SERIF_ITALIC} text-base md:text-lg text-white/85 mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]`}
              >
                Für Geburtstage.
              </p>
              <h3 className="font-display text-2xl md:text-[2rem] lg:text-4xl font-bold leading-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                Geburtstag · Jubiläum
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-[1.55] max-w-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                Persönlich. Anekdoten der Tochter, eine Lieblings-Uhr, eine
                alte Geschichte — daraus wird eine Mini-Sequenz nur für diesen
                Tisch.
              </p>
            </div>
          </article>

          {/* Card 2 — CLEAN, schmaler, exakt gleich hoch wie Card 1, Booking-Widget */}
          <article
            className="group relative overflow-hidden bg-[hsl(36,30%,97%)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.18)] flex flex-col h-[320px] md:h-[380px]"
            style={{
              borderRadius: "1.5rem",
              boxShadow:
                "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Booking-Confirmation Mock-Widget */}
            <div className="relative flex-[1.5] p-4 md:p-5 flex items-center justify-center bg-foreground/[0.03] overflow-hidden">
              <div
                className="w-full max-w-[340px] rounded-2xl bg-white p-4 md:p-5 transition-transform duration-500 group-hover:-translate-y-1"
                style={{
                  boxShadow:
                    "0 24px 50px -20px rgba(0,0,0,0.25), 0 4px 12px -4px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.04)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "#1f8f5f",
                        boxShadow: "0 0 0 4px rgba(31,143,95,0.15)",
                      }}
                    />
                    <span className="text-[10px] tracking-[0.14em] uppercase font-bold text-foreground/65">
                      Bestätigt
                    </span>
                  </div>
                  <span className={`${SERIF_ITALIC} text-[11px] text-foreground/45`}>
                    #2024-118
                  </span>
                </div>
                <p className="font-display text-base font-bold text-foreground leading-tight mb-0.5">
                  Vorstandsdinner
                </p>
                <p className={`${SERIF_ITALIC} text-xs text-foreground/55 mb-3`}>
                  Fr · 14. März · 19:00
                </p>
                {/* Mini-Stepper */}
                <div className="flex items-center gap-1 mb-3">
                  {["Empfang", "Vorspeise", "Hauptgang", "Finale"].map(
                    (s, i) => (
                      <div key={s} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full h-1 rounded-full"
                          style={{
                            background:
                              i < 2 ? ACCENT : "rgba(0,0,0,0.08)",
                          }}
                        />
                        <span className="text-[8px] tracking-[0.06em] uppercase text-foreground/45 font-semibold">
                          {s}
                        </span>
                      </div>
                    )
                  )}
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-foreground/8">
                  <span className="text-xs text-foreground/55">
                    <strong className="font-display font-bold text-foreground">60</strong> Gäste
                  </span>
                  <span
                    className="text-[10px] tracking-[0.1em] uppercase font-bold px-2 py-1 rounded"
                    style={{
                      color: ACCENT,
                      background: "rgba(154,38,64,0.08)",
                    }}
                  >
                    Tisch + Bühne
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6 flex-1 flex flex-col justify-end">
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-1.5">
                Firmen-Dinner · Incentives
              </h3>
              <p className="text-sm text-foreground/65 leading-[1.55] max-w-md">
                Vorstandsdinner, Kundenabend, Incentive. Auch der schweigsamste
                Vorstand zückt nach drei Minuten Karten.
              </p>
            </div>
          </article>
          </div>

          {/* Row 2: 40% clean + 60% colored */}
          <div className="grid md:grid-cols-[2fr_3fr] gap-4 md:gap-5">
          {/* Card 3 — CLEAN, schmaler, exakt gleich hoch wie Card 4, Avatar-Cluster */}
          <article
            className="group relative overflow-hidden bg-[hsl(36,30%,97%)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.18)] flex flex-col h-[320px] md:h-[380px]"
            style={{
              borderRadius: "1.5rem",
              boxShadow:
                "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            <div className="relative flex-[1.5] p-4 md:p-5 flex items-center justify-center bg-foreground/[0.03] overflow-hidden">
              <div className="flex flex-col items-center gap-4 transition-transform duration-500 group-hover:-translate-y-1">
                {/* Avatar-Cluster (überlappend) */}
                <div className="flex -space-x-3">
                  {[
                    { letter: "B", color: "linear-gradient(135deg, #9a2640, #5c1622)" },
                    { letter: "T", color: "linear-gradient(135deg, #c79042, #8a5a14)" },
                    { letter: "M", color: "linear-gradient(135deg, #1f5e3f, #0e3d2a)" },
                    { letter: "F", color: "linear-gradient(135deg, #d76a55, #9a2640)" },
                    { letter: "K", color: "linear-gradient(135deg, #c79042, #b07b2c)" },
                  ].map((a) => (
                    <div
                      key={a.letter}
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-display font-black text-white text-sm md:text-base"
                      style={{
                        background: a.color,
                        boxShadow:
                          "0 0 0 3px white, 0 6px 14px -4px rgba(0,0,0,0.2)",
                      }}
                    >
                      {a.letter}
                    </div>
                  ))}
                </div>
                {/* Bewertung */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 md:w-3.5 md:h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-foreground/60">
                    <strong className="font-display font-bold text-foreground">100+</strong>{" "}
                    Hochzeitsgäste begeistert
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 md:p-6 flex-1 flex flex-col justify-end">
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-1.5">
                Hochzeitsdinner
              </h3>
              <p className="text-sm text-foreground/65 leading-[1.55] max-w-md">
                Während ihr mit dem Fotografen unterwegs seid, halte ich die
                Tische warm. Niemand wird übergangen.
              </p>
            </div>
          </article>

          {/* Card 4 — DARK GRADIENT only, breiter, Title bottom-left */}
          <article
            className="group relative overflow-hidden text-white transition-transform duration-500 hover:-translate-y-1 h-[320px] md:h-[380px]"
            style={{
              borderRadius: "1.5rem",
              background:
                "linear-gradient(135deg, #0c1f18 0%, #122e22 30%, #1f4a35 65%, #2a6e4a 100%)",
              boxShadow: "0 35px 70px -25px rgba(14,61,42,0.55)",
            }}
          >
            <span
              aria-hidden
              className="absolute -top-16 -right-8 w-[320px] h-[320px] rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,200,90,0.5), transparent 65%)",
              }}
            />
            <span
              aria-hidden
              className="absolute -bottom-20 -left-10 w-[280px] h-[280px] rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(31,143,95,0.55), transparent 65%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9 lg:p-12 max-w-xl">
              <p
                className={`${SERIF_ITALIC} text-base md:text-lg text-white/85 mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]`}
              >
                Für Teams.
              </p>
              <h3 className="font-display text-2xl md:text-[2rem] lg:text-4xl font-bold leading-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                Weihnachtsfeier · Teamevent
              </h3>
              <p className="text-sm md:text-base text-white/90 leading-[1.55] max-w-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                Lockerer Ton, persönliche Tischrunden, optional ein
                Bühnen-Finale zum Dessert. Verbindet stärker als jedes
                Teambuilding.
              </p>
            </div>
          </article>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8b · WAS DU BEKOMMST — 3-Spalten-Features unter
   Sans+Italic-Headline (Frameblox „Designed to Help You Do
   More With Less Stress"-Stil)
   ═══════════════════════════════════════════════════════════ */
const WasDuBekommstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    {
      title: "Service-Takt",
      text: "Ich kenne ihn, weil ich am Pass aufgewachsen bin. Kein extra Slot im Ablauf nötig — ich arbeite mit der Küche, nicht gegen sie.",
    },
    {
      title: "Persönliche Anekdoten",
      text: "Eine Lieblings-Uhr, ein bestimmtes Bier, der Schwiegersohn als Skeptiker. Daraus baue ich Mini-Routinen, die nur dieser Tisch versteht.",
    },
    {
      title: "Kein Mehr-Aufwand",
      text: "Keine Mikrofone, kein Soundcheck, kein Bühnenaufbau. Anreise mit Pufferzeit, ich kümmere mich um den Rest. Ihr genießt euren Abend.",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Was du als Gastgeber bekommst.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.25rem,5vw,4.5rem)] text-foreground">
              Ein Abend, der einfach läuft.{" "}
              <span className={SERIF_ITALIC}>Ohne Aufwand für euch.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-10">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vom Briefing über den Service-Abgleich bis zur Verabschiedung —
              ich übernehme die Koordination. Ihr macht nichts außer ein paar
              Anekdoten zu schicken und den Tisch zu reservieren.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-10 md:gap-12 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {features.map((f) => (
            <article key={f.title}>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-3">
                {f.title}
              </h3>
              <p className="text-base text-foreground/65 leading-[1.7] max-w-sm">
                {f.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   9 · KARTEN-FÄCHER — wie Frameblox Avatar-Fan: mehrere
   Karten/Bilder gefächert auf softem Pastell-Gradient
   ═══════════════════════════════════════════════════════════ */
const KartenFaecherSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const cards = [
    { src: buehneShowImg, alt: "Emilian Leber Bühnenshow mit Stage-Truss und Headset",   tilt: -14 },
    { src: closeupImg,    alt: "Tisch-zu-Tisch-Magie im Restaurant",                     tilt: -7  },
    { src: buehneImg,     alt: "Emilian Leber Bühnen-Moment beim Magic Dinner",          tilt: 0   },
    { src: haendeImg,     alt: "Magic Dinner — Walk-Around beim Empfang",                tilt: 7   },
    { src: staunenImg,    alt: "Gäste reagieren auf Magic-Dinner-Moment",                tilt: 14  },
  ];
  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(70% 80% at 30% 30%, #f5ecdc 0%, rgba(245,236,220,0) 75%), radial-gradient(60% 70% at 75% 70%, #f0d8a8 0%, rgba(240,216,168,0) 75%), #ffffff",
      }}
    >
      <div className="container px-6 py-20 md:py-28">
        <div
          className={`max-w-2xl mx-auto text-center mb-12 md:mb-14 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/65 mb-6`}>
            Aus über zweihundert Abenden.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            Jeder Abend{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              ein eigener Moment
            </span>
            .
          </h2>
        </div>

        <div
          className={`relative mx-auto flex justify-center items-end gap-2 md:gap-3 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s", maxWidth: "1100px" }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              className="relative shrink-0"
              style={{
                width: "min(28vw, 220px)",
                aspectRatio: "3 / 4",
                transform: `rotate(${c.tilt}deg) translateY(${Math.abs(c.tilt) * 1.2}px)`,
                transformOrigin: "bottom center",
                zIndex: 10 - Math.abs(i - 2),
              }}
            >
              <img
                src={c.src}
                alt={c.alt}
                className="w-full h-full object-cover object-top"
                style={{
                  borderRadius: "0.75rem",
                  boxShadow: "0 20px 50px -20px rgba(60,30,80,0.35), 0 0 0 4px white",
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   10 · WALD & WIESE — Photo-BG dark mit floating glass card
   ═══════════════════════════════════════════════════════════ */
const WaldUndWieseSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white">
      {/* Backdrop Photo + Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={schneiderImg}
          alt=""
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(12,10,16,0.92) 0%, rgba(12,10,16,0.75) 45%, rgba(12,10,16,0.35) 100%)",
          }}
        />
        {/* Warmer Amber-Glow rechts oben für Restaurant-Stimmung */}
        <div
          aria-hidden
          className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(199,144,66,0.32) 0%, rgba(199,144,66,0) 70%)",
          }}
        />
      </div>

      <div className="relative container px-6 py-24 md:py-36">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Headline + Info */}
          <div
            className={`lg:col-span-7 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/65 mb-6`}>
              Lieblings-Location.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] mb-8">
              Wald & Wiese.{" "}
              <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                Mein Haus.
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg leading-[1.7] text-white/80 max-w-xl">
              <p>
                Es gibt ein Restaurant, mit dem ich besonders gerne arbeite —
                das „Wald & Wiese" in Sinzing bei Regensburg. Klein,
                persönlich, regional, mit einer Küche, die den Service-Takt
                versteht und mit Magie zwischen den Gängen umgehen kann.
              </p>
              <p>
                Wenn ihr noch keine Location habt, könnt ihr beides aus einer
                Hand abstimmen: Reservierung, Menü und Magic Dinner als
                Combo-Paket. Ihr habt einen Ansprechpartner statt drei.
              </p>
              <p>
                Funktioniert genauso gut in eurem Wunsch-Restaurant, eurem
                Vereinsheim oder einer angemieteten Event-Location — sprecht
                mich an, ich gebe euch ehrlich Tipps zur Eignung.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/buchung"
                className="hero-cta inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#0c0a10] hover:bg-white/95"
              >
                Combo besprechen
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://restaurant-waldwiese.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
              >
                Restaurant ansehen
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT — Restaurant-Card (Glass) mit Link */}
          <div
            className={`lg:col-span-5 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <a
              href="https://restaurant-waldwiese.de"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.08) 100%)",
                backdropFilter: "blur(40px) saturate(200%) brightness(115%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(115%)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow:
                  "0 50px 100px -25px rgba(0,0,0,0.65), 0 15px 35px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Top-Edge highlight */}
              <span
                aria-hidden
                className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
                }}
              />
              {/* Chrome glare oben links */}
              <span
                aria-hidden
                className="absolute -top-16 -left-16 w-40 h-40 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.32), transparent 70%)",
                  filter: "blur(10px)",
                }}
              />
              {/* Warmer Refraction-Hint unten rechts */}
              <span
                aria-hidden
                className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(243,217,168,0.22), transparent 70%)",
                  filter: "blur(12px)",
                }}
              />

              <div className="relative p-7 md:p-9">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p
                      className={`${SERIF_ITALIC} text-sm text-white/65 mb-1.5`}
                    >
                      Restaurant.
                    </p>
                    <p className="font-display text-2xl md:text-3xl font-black text-white leading-tight">
                      Wald & Wiese
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/55 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500 shrink-0" />
                </div>

                {/* Meta-Liste */}
                <dl className="space-y-3 mb-6 border-t border-white/15 pt-5">
                  {[
                    { k: "Ort", v: "Sinzing · bei Regensburg" },
                    { k: "Küche", v: "Regional · saisonal" },
                    { k: "Gäste", v: "25 – 80 Personen" },
                    { k: "Paket", v: "Menü + Magic Dinner" },
                  ].map((m) => (
                    <div
                      key={m.k}
                      className="grid grid-cols-[80px_1fr] gap-3 text-sm"
                    >
                      <dt
                        className={`${SERIF_ITALIC} text-white/55`}
                      >
                        {m.k}
                      </dt>
                      <dd className="text-white/90 font-medium">{m.v}</dd>
                    </div>
                  ))}
                </dl>

                {/* URL */}
                <div className="flex items-center justify-between pt-5 border-t border-white/15">
                  <span className="text-xs tracking-[0.12em] uppercase text-white/55 font-semibold">
                    restaurant-waldwiese.de
                  </span>
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase text-white/45 font-semibold"
                    style={{ color: "#f3d9a8" }}
                  >
                    Hauspartner
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   11 · STIMMEN — 3 echte Reviews
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Es war einfach Mega! 200 Gäste eines bayerischen Versicherungsunternehmens — Emilian hat mit seiner eigens entwickelten Zaubertrickshow alle begeistert.",
      author: "Jan von Lehmann",
      role: "Firmenfeier · 200 Gäste",
      initial: "J",
    },
    {
      quote:
        "Wirklich großartig! Mit viel Charme und Witz hat er alle Hochzeitsgäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass.",
      author: "Katrin Raß",
      role: "Hochzeitsplanerin",
      initial: "K",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung sehr professionell. Gerne wieder!",
      author: "Martina Senftl",
      role: "Eventkundin",
      initial: "M",
    },
  ];
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
            Was Gastgeber sagen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            5,0 Sterne.
            <br />
            <span className={SERIF_ITALIC}>30+ Bewertungen.</span>
          </h2>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-6 md:gap-8 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {reviews.map((r) => (
            <article
              key={r.author}
              itemScope
              itemType="https://schema.org/Review"
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
                <meta itemProp="reviewRating" content="5" />
              </div>
              <p
                itemProp="reviewBody"
                className="text-[15px] md:text-base leading-[1.65] text-foreground/85 flex-1"
              >
                „{r.quote}"
              </p>
              <footer className="mt-7 pt-5 border-t border-foreground/10 flex items-center gap-4">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-white text-base"
                  style={{ background: "linear-gradient(135deg, #9a2640, #5c1622)" }}
                >
                  {r.initial}
                </div>
                <div>
                  <p
                    itemProp="author"
                    className="font-display font-bold text-foreground text-sm"
                  >
                    {r.author}
                  </p>
                  <p className="text-[12px] text-foreground/55 mt-0.5">
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
   12 · ZAHLEN — kompakt inline, keine Preise
   ═══════════════════════════════════════════════════════════ */
const ZahlenInlineSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { num: "10+", label: "Magic Dinners" },
    { num: "200+", label: "Events gesamt" },
    { num: "5,0 ★", label: "30+ Bewertungen" },
    { num: "24 h", label: "Antwortzeit" },
  ];
  return (
    <section ref={ref} className="bg-white py-16 md:py-20 border-y border-foreground/10">
      <div className="container px-6">
        <div
          className={`flex flex-wrap items-baseline justify-center gap-x-12 gap-y-6 md:gap-x-20 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="font-display text-2xl md:text-3xl font-black text-foreground tabular-nums">
                {s.num}
              </span>
              <span className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   13 · FAQ — accordion
   ═══════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "Was ist ein Magic Dinner überhaupt?",
    a: "Ein Magic Dinner ist ein mehrgängiges Abendessen mit Magie als zusätzlichem Gang. In zwei Formaten möglich: klassisch als Tisch-zu-Tisch zwischen den Gängen (fünf bis sieben Minuten pro Tisch, persönliches Programm pro Runde) — oder als Bühnenshow für alle Gäste gleichzeitig zum Dessert (zehn bis zwanzig Minuten Wow-Moment). Beides lässt sich auch kombinieren: Tisch während Vorspeise und Hauptgang plus Bühnen-Finale zum Dessert. Ab sechzig Gästen empfehle ich die Combo.",
  },
  {
    q: "Für welche Anlässe eignet sich ein Magic Dinner?",
    a: "Klassisch für runde Geburtstage, Goldene Hochzeiten, Firmenjubiläen, Vorstands-Dinner, Hochzeitsdinners, Weihnachtsfeiern und exklusive Galas. Immer dann, wenn aus einem Abendessen ein Erlebnis werden soll, an das sich die Gäste noch Monate später erinnern.",
  },
  {
    q: "Brauche ich ein bestimmtes Restaurant oder eine Location?",
    a: "Nein. Das Magic Dinner funktioniert in jeder Location mit Tischbestuhlung — Restaurant, Hotel, Event-Location, Vereinsheim, Privathaus. Wichtig ist nur, dass die Tische so stehen, dass ich gut zu jedem komme. Ich spreche mich vorab kurz mit dem Service ab.",
  },
  {
    q: "Wie viele Gäste sind ideal?",
    a: "Etwa fünfundzwanzig bis achtzig Gäste sind ideal. Bei kleineren Runden bleibe ich länger pro Tisch und es entsteht eher eine Tafel-Atmosphäre. Bei mehr als achtzig Gästen empfehle ich, das Tisch-Programm mit einem Bühnenfinale zum Dessert zu kombinieren.",
  },
  {
    q: "Wie viel Vorbereitungsaufwand habt ihr als Gastgeber?",
    a: "Nahezu keinen. Ich brauche nur eine kurze Info über Ablauf und Art der Gäste — Anekdoten zum Geburtstagskind oder zum Brautpaar machen das Programm persönlicher. Am Abend selbst spreche ich mich mit dem Service ab. Keine Mikrofone, kein Bühnenaufbau, kein Soundcheck.",
  },
  {
    q: "Kann das eine Überraschung sein?",
    a: "Ja — sehr gerne. Ich komme dann unauffällig als normaler Gast und beginne, sobald der richtige Moment da ist. Die Reaktion, wenn der Erste am Tisch begreift, dass das nicht zufällig passiert, ist regelmäßig der Höhepunkt des Abends.",
  },
  {
    q: "Was, wenn ein Tisch lieber nicht mitmachen möchte?",
    a: "Passiert quasi nie — aber falls ein Tisch lieber in Ruhe essen möchte, gehe ich weiter und komme später nochmal vorbei. Niemand wird je zu etwas gedrängt. Bei Vorstands-Dinnern frage ich kurz vorher beim Gastgeber, ob es Personen gibt, die ich eher ansprechen oder eher in Ruhe lassen soll.",
  },
  {
    q: "Wo bist du buchbar?",
    a: "Mit Sitz in Bayern bin ich deutschlandweit buchbar — von München, Augsburg, Regensburg und Nürnberg bis Berlin, Hamburg, Frankfurt, Köln und Stuttgart. Anfahrt und Übernachtung stimmen wir individuell ab.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
            Häufige Fragen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            Was Gastgeber meistens
            <br />
            <span className={SERIF_ITALIC}>fragen.</span>
          </h2>
        </div>

        <div
          className={`max-w-3xl border-t border-foreground/15 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group py-6 md:py-7 border-b border-foreground/15"
            >
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">
                  {faq.q}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   14 · FINAL CTA — black full-bleed
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-28 md:py-40 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.5), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,40,0.5), transparent 60%)",
        }}
      />

      <div className="relative container px-6">
        <div
          className={`max-w-3xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}>
            Plant euren Abend.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Magic Dinner buchen
            <br />
            <span className={SERIF_ITALIC}>für euren Anlass.</span>
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/65 leading-[1.6]">
            Kurze Anfrage mit Datum, Ort und Gästezahl reicht. Ich melde mich
            innerhalb 24 Stunden persönlich und entwickle ein Konzept, das
            sich nahtlos in euren Abend einfügt.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90 transition-colors"
            >
              Jetzt anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/ueber-mich"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/65 hover:text-white"
            >
              Mehr über Emilian
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-6 text-xs md:text-sm text-white/45">
            Kostenlos · Unverbindlich · Antwort innerhalb 24 Stunden
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/magic-dinner";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Magic Dinner — Tisch und Bühne zwischen den Gängen",
  name: "Magic Dinner mit Zauberkünstler Emilian Leber",
  description:
    "Magic Dinner mit Zauberkünstler Emilian Leber: Tisch-zu-Tisch und Bühnenshow zwischen den Gängen — einzeln oder kombiniert. Aus einer Gastronomiefamilie. Bayern & deutschlandweit.",
  provider: {
    "@type": "Person",
    name: "Emilian Leber",
    jobTitle: "Zauberkünstler",
    url: "https://www.magicel.de",
    image: "https://www.magicel.de/og-image.jpg",
    address: { "@type": "PostalAddress", addressCountry: "DE", addressRegion: "Bayern" },
    sameAs: [
      "https://www.instagram.com/emilian.leber",
      "https://www.provenexpert.com/emilian-leber",
    ],
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  url: SITE_URL,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    reviewCount: "30",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.magicel.de/" },
    { "@type": "ListItem", position: 2, name: "Magic Dinner", item: SITE_URL },
  ],
};

/* ═══════════════════════════════════════════════════════════
   AUDIENCE-SECTION — Für wen ist Magic Dinner?
   Klärt direkt: 5 Buyer-Personas mit Links zu passenden Pages
   ═══════════════════════════════════════════════════════════ */
const AUDIENCES = [
  {
    role: "Privat-Anfrage",
    eyebrow: "Geburtstag · Hochzeit · Familienfest",
    body: "Ihr feiert eine private Anlass und wollt das Magic Dinner als Highlight des Abends. Direkt anfragen oder per Quiz das passende Format finden.",
    cta: "Privat anfragen",
    href: "/buchung?anlass=Magic+Dinner",
    color: ACCENT,
  },
  {
    role: "Firmen-Anfrage",
    eyebrow: "Vorstand · Kunden · Team-Event",
    body: "Ihr plant ein Vorstandsdinner, Kundenabend, Mitarbeiterfeier oder Galaabend. Geschäftsrechnung, Versicherung, AVV — alles dabei.",
    cta: "Firmen-Seite ansehen",
    href: "/firmenfeiern",
    color: ACCENT,
  },
  {
    role: "Restaurant-Partner",
    eyebrow: "Magic Dinner als eigene Veranstaltung",
    body: "Ihr seid Restaurant und wollt Magic Dinner als eigene Veranstaltungsreihe etablieren. Konzept, Ticket-Verkauf, Kooperationsmodell.",
    cta: "Restaurant-Modell unten",
    href: "#restaurant-partner",
    color: "#1f5e3f",
  },
  {
    role: "Eventagentur",
    eyebrow: "Schnellangebot · White-Label",
    body: "Ihr bucht im Auftrag eures Kunden. Schnellangebot in 8 Stunden, AVV, Versicherung, optional White-Label im Auftritt.",
    cta: "Agency-Seite",
    href: "/event-agenturen",
    color: ACCENT_DEEP,
  },
  {
    role: "Ticket-Käufer",
    eyebrow: "Öffentliche Magic-Dinner-Shows",
    body: "Ihr wollt selbst Tickets für eine öffentliche Magic-Dinner-Show kaufen. Termine in Wald & Wiese und weiteren Locations.",
    cta: "Tickets ansehen",
    href: "/tickets",
    color: AMBER_MID,
  },
];

const AudienceSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-b border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Fünf Zielgruppen. Eine Seite.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Magic Dinner — für{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                wen?
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Diese Seite richtet sich an verschiedene Zielgruppen — von der
              Privat-Anfrage über Restaurant-Partner bis zur Eventagentur.
              Wählt euren Pfad:
            </p>
          </div>
        </div>

        {/* Editorial-Liste: jede Audience als breite Zeile mit großem Index, Eyebrow-Tag und Pfeil */}
        <div className={`max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {AUDIENCES.map((a, i) => (
            <a
              key={a.role}
              href={a.href}
              className="group relative grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_180px_1fr_auto] gap-4 md:gap-7 items-center py-6 md:py-7 border-b border-foreground/10 last:border-b-0 transition-all hover:bg-foreground/[0.02] -mx-3 md:-mx-6 px-3 md:px-6 rounded-2xl"
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              {/* Index mit kleinem Farbpunkt */}
              <div className="flex items-center gap-2">
                <span
                  className={`${SERIF_ITALIC} text-4xl md:text-5xl leading-none transition-colors`}
                  style={{ color: a.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Audience-Tag */}
              <div className="hidden md:block">
                <span
                  className="inline-block text-[10px] tracking-[0.16em] uppercase font-bold py-1.5 px-3 rounded-full"
                  style={{
                    color: a.color,
                    background: `${a.color}12`,
                    border: `1px solid ${a.color}40`,
                  }}
                >
                  {a.role}
                </span>
              </div>

              {/* Body */}
              <div>
                <p
                  className="text-[10px] tracking-[0.16em] uppercase font-bold mb-1 md:hidden"
                  style={{ color: a.color }}
                >
                  {a.role}
                </p>
                <h3 className={`${SERIF_ITALIC} text-xl md:text-2xl text-foreground/90 leading-tight mb-1.5`}>
                  {a.eyebrow}
                </h3>
                <p className="text-sm md:text-[15px] text-foreground/65 leading-[1.6]">
                  {a.body}
                </p>
                <span
                  className="inline-flex md:hidden items-center gap-1.5 mt-3 text-[11px] tracking-[0.08em] uppercase font-bold"
                  style={{ color: a.color }}
                >
                  {a.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Pfeil rechts */}
              <ArrowRight
                className="hidden md:block w-5 h-5 transition-all duration-300 group-hover:translate-x-2"
                style={{ color: a.color }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   RESTAURANT-PARTNER-SECTION
   Für Restaurants die Magic Dinner als eigene Veranstaltung etablieren
   ═══════════════════════════════════════════════════════════ */
const RestaurantPartnerSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      id="restaurant-partner"
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Für Restaurants.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Magic Dinner als{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                eure Veranstaltungsreihe
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Restaurants buchen mich nicht nur für einzelne Privat-Events —
              sondern etablieren Magic Dinner als wiederkehrende Veranstaltung
              im eigenen Programm. Ein neues Marketing-Standbein für euer Haus.
            </p>
          </div>
        </div>

        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* LEFT — Vorteile */}
          <div className="lg:col-span-7">
            <ul className="space-y-7">
              {[
                {
                  title: "Ausverkaufte Abende statt halb leerer Restaurants.",
                  body:
                    "Magic-Dinner-Abende sind ein anderes Produkt als ein gewöhnliches Abendessen — ihr verkauft Tickets statt einzelner Tische. Eure leeren Tuesday- oder Wednesday-Slots werden zum Premium-Event.",
                },
                {
                  title: "Höhere Marge pro Gast.",
                  body:
                    "Ein Magic-Dinner-Ticket (inkl. Drei-Gang-Menü und Show) bewegt sich auf Premium-Niveau. Eure Marge pro Gast liegt deutlich über der eines normalen À-la-carte-Abends — Trinkgeld und Folge-Reservierungen kommen on top.",
                },
                {
                  title: "Marketing-Hook, der euch hervorhebt.",
                  body:
                    "[Magic-Dinner-Abend im Restaurant XY] ist eine Geschichte, die durch lokale Presse, Instagram und Empfehlung läuft. Ihr werdet zur Adresse, an die Menschen denken, wenn jemand sagt: [Lasst uns mal was Besonderes machen].",
                },
                {
                  title: "Wiederkehrendes Format ohne Aufwand.",
                  body:
                    "Wir entwickeln gemeinsam einen monatlichen oder zweimonatlichen Rhythmus. Ich bringe die Show, ihr bringt Küche und Service. Eure Stammgäste bekommen ein neues Wiederkehr-Erlebnis.",
                },
              ].map((it) => (
                <li key={it.title} className="grid grid-cols-[36px_1fr] md:grid-cols-[44px_1fr] gap-4 items-start">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                      border: "1px solid rgba(154,38,64,0.22)",
                    }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-2">
                      {it.title}
                    </h3>
                    <p className="text-base text-foreground/65 leading-[1.65] max-w-xl">
                      {it.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Kooperations-Modell */}
          <div className="lg:col-span-5">
            <div
              className="relative bg-white p-7 md:p-9"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,40,0.35), 0 15px 35px -15px rgba(40,20,40,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <p className={`${SERIF_ITALIC} text-base text-foreground/55 mb-2`}>
                Kooperations-Modell.
              </p>
              <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-6">
                Drei Wege, wie wir zusammenarbeiten.
              </h3>

              <ol className="space-y-5 mb-7">
                {[
                  {
                    label: "Modell A · Festpreis",
                    body: "Ihr zahlt mir einen festen Tagessatz, ihr verkauft Tickets und behaltet komplette Marge.",
                  },
                  {
                    label: "Modell B · Profit-Sharing",
                    body: "Reduzierter Tagessatz plus Anteil am Ticket-Erlös. Geringeres Risiko für euch, ihr testet das Format.",
                  },
                  {
                    label: "Modell C · Vollständige Show",
                    body: "Ich vermarkte selbst, ihr stellt Location plus Catering. Ihr seid Sub-Auftragnehmer.",
                  },
                ].map((m, i) => (
                  <li key={m.label} className="flex items-start gap-3">
                    <span
                      className={`${SERIF_ITALIC} text-2xl leading-none shrink-0`}
                      style={{ color: ACCENT }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <p
                        className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-1"
                        style={{ color: ACCENT }}
                      >
                        {m.label}
                      </p>
                      <p className="text-sm text-foreground/70 leading-[1.6]">
                        {m.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="pt-6 border-t border-foreground/10 mb-6">
                <p className={`${SERIF_ITALIC} text-xs text-foreground/55 mb-3`}>
                  Beispiel-Hauspartner.
                </p>
                <p className="font-display text-base font-bold text-foreground leading-tight mb-1.5">
                  Restaurant Wald & Wiese · Sinzing bei Regensburg
                </p>
                <p className="text-sm text-foreground/65 leading-[1.55]">
                  Drei Magic-Dinner-Termine pro Jahr seit 2024 — beide Seiten
                  ausgebucht, Stammgäste-Slot in der eigenen Veranstaltungs-Reihe.
                </p>
              </div>

              <a
                href="mailto:el@magicel.de?subject=Restaurant-Partnerschaft%20Magic%20Dinner"
                className="hero-cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white w-full justify-center"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)",
                }}
              >
                Restaurant-Anfrage starten
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-4 text-[11px] text-foreground/45 text-center">
                Persönliche Antwort innerhalb 24 h · NDA möglich · Konzept-Pitch vor Ort
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TICKET-EVENT-SECTION — öffentliche Magic-Dinner-Shows
   ═══════════════════════════════════════════════════════════ */
const TicketEventSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="tickets" className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
            Für Ticket-Käufer.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground mb-8">
            Öffentliche{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              Magic-Dinner-Termine
            </span>
            .
          </h2>
          <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-2xl mx-auto mb-10">
            Wer Magic Dinner einmal selbst erleben möchte, ohne ein eigenes
            Event zu planen: in Wald & Wiese und weiteren Restaurants gibt es
            mehrmals jährlich öffentliche Magic-Dinner-Abende mit
            Drei-Gang-Menü und kompletter Show — Tickets buchbar im
            Ticket-Shop.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 max-w-3xl mx-auto mb-10">
            {[
              { num: "3 Gänge", label: "Menü inklusive" },
              { num: "25 – 60", label: "Gäste pro Abend" },
              { num: "3 – 5×", label: "öffentliche Termine pro Jahr" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[hsl(36,30%,97%)] rounded-2xl px-5 py-6 border border-foreground/8"
              >
                <p
                  className="font-display text-2xl md:text-3xl font-black tabular-nums leading-none"
                  style={{ color: ACCENT }}
                >
                  {s.num}
                </p>
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-2`}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/tickets"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)",
              }}
            >
              Aktuelle Termine ansehen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://restaurant-waldwiese.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground/65 hover:text-foreground"
            >
              Wald &amp; Wiese ansehen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const MagicDinner = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Magic Dinner buchen — Tisch und Bühne zwischen den Gängen | Emilian Leber
      </title>
      <meta
        name="description"
        content="Magic Dinner mit Zauberkünstler Emilian Leber: Tisch-zu-Tisch und Bühnenshow zwischen den Gängen — einzeln oder kombiniert. Bayern & deutschlandweit. 5,0★ bei 30+ Bewertungen. Kostenlos & unverbindlich anfragen."
      />
      <meta
        name="keywords"
        content="Magic Dinner, Magic Dinner buchen, Tischmagie, Zauberer Dinner, Zauberkünstler Bayern, Dinnershow Magier, Magic Dinner München, Magic Dinner Hochzeit, Magic Dinner Firmenfeier, Tischzauberer, Close-Up Dinner, Emilian Leber"
      />
      <meta name="author" content="Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="MagicEL — Emilian Leber" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="Magic Dinner buchen — Tisch und Bühne zwischen den Gängen | Emilian Leber"
      />
      <meta
        property="og:description"
        content="Magic Dinner mit Zauberkünstler Emilian Leber: Tisch-zu-Tisch und Bühnenshow zwischen den Gängen — einzeln oder kombiniert. Bayern & deutschlandweit. 5,0★ bei 30+ Bewertungen."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:image:alt" content="Magic Dinner mit Emilian Leber — Tischmagie beim Abendessen" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Magic Dinner buchen — Tisch und Bühne zwischen den Gängen | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="Magic Dinner mit Zauberkünstler Emilian Leber: Tisch und Bühne zwischen den Gängen — einzeln oder kombiniert. Bayern & deutschlandweit. 5,0★."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />

      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee eyebrow="10+ Magic Dinners · Restaurant-Partner & Hosts." variant="cream" compact />
        <AudienceSection />
        <TrustStrip />
        <KundenReferenzenSection />
        <PullQuoteSection />
        <KonzeptSection />
        <WasDuBekommstSection />
        <DreiSaeulenSection />
        <AblaufSection />
        <BeispielAbendSection />
        <KartenFaecherSection />
        <QuizSection />
        <AnlaesseSection />
        <WaldUndWieseSection />
        <RestaurantPartnerSection />
        <TicketEventSection />
        <StimmenSection />
        <ZahlenInlineSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default MagicDinner;
