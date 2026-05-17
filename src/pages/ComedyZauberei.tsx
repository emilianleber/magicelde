import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
import {
  CustomQuizSection,
  CustomQuizConfig,
} from "@/components/landing/CustomQuiz";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Trophy,
  Award,
  Medal,
  Tv,
  Sparkles,
  Brain,
  Quote,
  Heart,
  PartyPopper,
  Building2,
  Mic2,
  Laugh,
  Wand2,
  MessageCircle,
  Drama,
  Clock,
  Flame,
} from "lucide-react";

import heroMagicImg from "@/assets/hero-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import emotionenImg from "@/assets/emotionen.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";

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
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.55)); } }
    @keyframes lachCountPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
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
    .lach-counter-pulse { animation: lachCountPulse 2.6s ease-in-out infinite; }
  `}</style>
);

const HEADLINE_SANS = ["Magie", "mit"];
const HEADLINE_ITALIC = ["Pointe."];

const BOKEH = [
  { size: 22, left: "12%", top: "28%", dur: 14, delay: 0, o: 0.45 },
  { size: 14, left: "8%", top: "62%", dur: 18, delay: 2.5, o: 0.55 },
  { size: 28, left: "78%", top: "18%", dur: 16, delay: 1, o: 0.40 },
  { size: 18, left: "88%", top: "48%", dur: 20, delay: 3.5, o: 0.55 },
  { size: 12, left: "62%", top: "72%", dur: 13, delay: 4.5, o: 0.60 },
  { size: 24, left: "92%", top: "78%", dur: 17, delay: 1.8, o: 0.35 },
  { size: 10, left: "32%", top: "82%", dur: 19, delay: 6, o: 0.50 },
  { size: 16, left: "48%", top: "12%", dur: 22, delay: 5, o: 0.30 },
  { size: 20, left: "70%", top: "38%", dur: 15, delay: 7.5, o: 0.45 },
  { size: 14, left: "20%", top: "44%", dur: 21, delay: 8.5, o: 0.40 },
];

const Hero = () => {
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
  return (
    <section className="relative bg-[#08060c] text-white min-h-screen overflow-hidden">
      <HeroKeyframes />
      <div ref={photoRef} className="absolute inset-0 hero-photo-wrap hero-zoom" style={{ willChange: "transform" }}>
        <img
          src={heroMagicImg}
          alt="Comedy-Zauberei mit Emilian Leber — Magie mit Pointe, lachendes Publikum"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%", filter: "saturate(0.92) contrast(1.08) brightness(0.7)" }}
          loading="eager"
        />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 30%, rgba(8,6,12,0.5) 60%, rgba(8,6,12,0.25) 100%)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 65%)" }} />
        <div aria-hidden className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.28) 0%, rgba(199,144,66,0) 70%)" }} />
      </div>
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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
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
              <strong className="font-semibold text-white">Comedy-Magier</strong> · Bayern + DE
            </span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Drei Sekunden Stille. Dann lacht der Saal.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (
              <span
                key={`s-${i}`}
                className="hero-word"
                style={{ animationDelay: `${0.3 + i * 0.08}s`, marginRight: "0.22em" }}
              >
                {w}
              </span>
            ))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (
              <span
                key={`i-${i}`}
                className={`hero-word ${SERIF_ITALIC}`}
                style={{
                  animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`,
                  marginRight: "0.22em",
                  color: "#f3d9a8",
                }}
              >
                {w}
              </span>
            ))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Comedy-Zauberei für Bühne, Variety, Firmenfeier oder Hochzeit. Mentaleffekte mit Pointen-Set, Karten-Comedy, Audience-Roast — dosierbar von dezentem Witz bis pure Stand-Up. Lachen UND Staunen, in derselben Sekunde.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <a href="#empfehlung" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95">
              Comedy-Finder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/buchung?format=Comedy-Zauberei"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Direkt anfragen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]" style={{ animationDelay: "2.0s" }}>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">17</strong>
              <span className="text-white/65">Lacher / 20 Min</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">200+</strong>
              <span className="text-white/65">Events</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg">3 Modi</strong>
              <span className="text-white/65">Comedy-Anteil</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">TV-Auftritt 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   KONZEPT-INTRO — Editorial-Split mit Glass-Caption
   ═══════════════════════════════════════════════════════════ */
const KonzeptIntroSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12 items-start">
          {/* LEFT — text */}
          <div className={`lg:col-span-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Was Comedy-Zauberei wirklich ist.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground mb-8">
              Nicht Trick.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Dann Witz.</span>
              <br />
              Sondern beides{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>gleichzeitig</span>.
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.7] mb-5 max-w-xl">
              Klassische Zauberer brauchen Stille, damit ein Effekt wirkt.
              Stand-Up braucht eine Pointe, damit gelacht wird. Comedy-Zauberei
              packt beides in dieselbe Sekunde: der Trick ist die Pointe, die
              Pointe ist der Trick.
            </p>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8 max-w-xl">
              Das Publikum lacht über die Situation — nicht über einen Gast.
              Mentaleffekte mit Pointen-Set, Karten-Comedy auf Augenhöhe,
              dosierbar von dezent bis Stand-Up. Je nach Anlass.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-foreground/10">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-black text-foreground tabular-nums">200+</span>
                <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>Comedy-Slots</span>
              </div>
              <span aria-hidden className="text-foreground/20">·</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-black text-foreground tabular-nums">3</span>
                <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>Comedy-Modi wählbar</span>
              </div>
              <span aria-hidden className="text-foreground/20">·</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-black text-foreground tabular-nums">5,0</span>
                <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>★ ProvenExpert</span>
              </div>
            </div>
          </div>
          {/* RIGHT — photo */}
          <div className={`lg:col-span-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="relative overflow-hidden group" style={{ borderRadius: "1.5rem", aspectRatio: "4 / 5" }}>
              <img
                src={audienceImg}
                alt="Lachendes Publikum bei Comedy-Zauberei mit Emilian Leber"
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
                style={{ filter: "saturate(0.95) brightness(0.92)" }}
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))" }} />
              {/* Top-right glass stat */}
              <div
                className="absolute top-5 right-5 px-4 py-3 text-white"
                style={{
                  borderRadius: "0.85rem",
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0.08) 100%)",
                  backdropFilter: "blur(40px) saturate(200%)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  boxShadow: "0 24px 50px -20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <p className="text-[10px] tracking-[0.16em] uppercase font-bold opacity-80">Erste Pointe</p>
                <p className="font-display text-2xl md:text-3xl font-black tabular-nums leading-none mt-0.5">18 Sek</p>
              </div>
              {/* Bottom caption */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className={`${SERIF_ITALIC} text-base md:text-lg leading-snug`}>
                  „Drei Sekunden Stille — dann lacht der Saal."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   LACHZÄHLER — page-eigener Twist: animierter Counter
   ═══════════════════════════════════════════════════════════ */
type LachStat = {
  end: number;
  label: string;
  sub: string;
  suffix?: string;
};

const LACH_HERO = { end: 17, label: "Lacher", sub: "in einer 20-Min-Show" };
const LACH_SIDE: LachStat[] = [
  { end: 12, label: "Pointen-Sets", sub: "pro Show, eingebaut", suffix: "" },
  { end: 4, label: "Stehende Ovationen", sub: "letzte Saison", suffix: "" },
  { end: 1, label: "Sek Stille", sub: "vor dem ersten Lacher", suffix: "" },
];

const useCountUp = (end: number, duration = 1400, start = false) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return value;
};

const LachzaehlerSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const hero = useCountUp(LACH_HERO.end, 1800, isVisible);
  const s1 = useCountUp(LACH_SIDE[0].end, 1600, isVisible);
  const s2 = useCountUp(LACH_SIDE[1].end, 1200, isVisible);
  const s3 = useCountUp(LACH_SIDE[2].end, 900, isVisible);
  return (
    <section ref={ref} className="relative bg-[#08060c] text-white py-24 md:py-36 overflow-hidden">
      <div aria-hidden className="absolute -top-40 -left-32 w-[620px] h-[620px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.55), transparent 65%)" }} />
      <div className="container px-6 relative">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-8 mb-14 md:mb-20">
          <div className={`md:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/65 mb-6`}>
              Der Lachzähler.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-white">
              Siebzehn Lacher.{" "}
              <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                Zwanzig Minuten.
              </span>
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-white/65 leading-[1.7] max-w-md">
              Mit-getrackt über die letzten Comedy-Slots. Lacher gezählt vom
              Veranstalter, nicht von mir. Was eine Comedy-Zauber-Show im
              Schnitt liefert — und woher diese Pointen kommen.
            </p>
          </div>
        </div>

        <div className={`grid lg:grid-cols-12 gap-6 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* HERO COUNTER — 7 cols */}
          <div
            className="lg:col-span-7 relative p-10 md:p-14 flex flex-col items-start justify-center overflow-hidden"
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, #08060c 100%)`,
              minHeight: "440px",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 50px 100px -30px rgba(40,20,40,0.55)",
            }}
          >
            <div aria-hidden className="absolute -top-32 -right-10 w-[420px] h-[420px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.6), transparent 65%)" }} />
            <p className="relative text-[10px] tracking-[0.18em] uppercase font-bold mb-4" style={{ color: "#f3d9a8" }}>
              Durchschnitt · letzte Saison
            </p>
            <div className="relative flex items-baseline gap-4 mb-6 lach-counter-pulse">
              <span
                className="font-display font-black tabular-nums leading-[0.9]"
                style={{
                  fontSize: "clamp(7rem, 18vw, 16rem)",
                  background: "linear-gradient(180deg, #ffffff 0%, #f3d9a8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.05em",
                }}
              >
                {hero}
              </span>
              <Laugh className="w-12 h-12 md:w-16 md:h-16 self-end mb-6" style={{ color: "#f3d9a8" }} strokeWidth={1.5} />
            </div>
            <p className={`${SERIF_ITALIC} relative text-2xl md:text-4xl text-white/85 leading-tight mb-3`}>
              {LACH_HERO.label} {LACH_HERO.sub}.
            </p>
            <p className="relative text-base text-white/55 leading-[1.6] max-w-md">
              Gezählt vom Veranstalter, im Briefing-Call nachbesprochen.
              Nicht jede Pointe landet — manche werden zu Story-Anker für die
              ganze Show.
            </p>
            {/* Decorative dots */}
            <div aria-hidden className="absolute bottom-8 right-8 flex gap-1.5">
              {[...Array(17)].map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i < hero ? "#f3d9a8" : "rgba(255,255,255,0.12)",
                    transition: "background 200ms ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* SIDE COUNTERS — 5 cols, 3 mini */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-5">
            {[
              { val: s1, ...LACH_SIDE[0], Icon: MessageCircle },
              { val: s2, ...LACH_SIDE[1], Icon: Trophy },
              { val: s3, ...LACH_SIDE[2], Icon: Clock },
            ].map((row, i) => (
              <div
                key={row.label}
                className="relative p-6 md:p-7 flex items-center gap-5"
                style={{
                  borderRadius: "1.25rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <row.Icon className="w-5 h-5" style={{ color: i === 1 ? "#f3d9a8" : "rgba(255,255,255,0.85)" }} strokeWidth={1.75} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="font-display font-black tabular-nums leading-none"
                      style={{
                        fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)",
                        color: i === 1 ? "#f3d9a8" : "white",
                      }}
                    >
                      {row.val}
                    </span>
                    <span className={`${SERIF_ITALIC} text-base md:text-lg text-white/65`}>
                      {row.label}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-white/55 leading-snug">{row.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <p className={`${SERIF_ITALIC} text-base md:text-lg text-white/45 mt-12 max-w-3xl`}>
          Lacher sind kein KPI — aber sie zeigen Tempo und Rhythmus. Eine
          Comedy-Zauber-Show, die nach Minute 4 lacht, hat den Saal verloren.
          Tempo ist der ganze Trick.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   SPLIT-DIPTYCHON — Magie | Comedy
   Layout: asymmetrisch 5fr/7fr, links cream, rechts dark
   ═══════════════════════════════════════════════════════════ */
const MAGIE_BEISPIELE = [
  {
    Icon: Brain,
    title: "Mental-Treffer.",
    body: "Vorhersage wird live aufgemacht, drei Sekunden Stille — der Saal atmet aus, dann der erste Lacher.",
  },
  {
    Icon: Sparkles,
    title: "Karten-Wandlung.",
    body: "Eine Karte wandert sichtbar in die Tasche eines Gastes, der die ganze Zeit auf der Bühne stand.",
  },
  {
    Icon: Wand2,
    title: "Visueller Trick.",
    body: "Etwas in eurer Hand verändert sich — kein Cut, keine Geschwindigkeit. Ihr seht zu, ich auch.",
  },
];

const COMEDY_BEISPIELE = [
  {
    Icon: Laugh,
    title: "Reaktions-Pointe.",
    body: "Pointe entsteht aus der Reaktion vom Gast — nicht aus einer einstudierten Zeile. Nie auf Kosten von jemandem.",
  },
  {
    Icon: MessageCircle,
    title: "Insider-Pointe.",
    body: "Eine Anekdote aus dem Briefing der Geschäftsleitung wird zur Pointe — nur dieser Saal kennt sie wirklich.",
  },
  {
    Icon: Drama,
    title: "Selbstironie.",
    body: "Witze über mich selbst, nicht über euch. Der Magier blamiert sich — der Trick funktioniert trotzdem.",
  },
];

const SplitDiptychonSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Zwei Disziplinen, ein Auftritt.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Magie{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>und</span>{" "}
              Comedy.
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Beispiele pro Seite — wie eine Pointe aussieht (rechts) und
              wie ein Trick davor wirkt (links). Im Live-Set verschmelzen
              beide, hier zur Klarheit getrennt.
            </p>
          </div>
        </div>

        <div className={`grid lg:grid-cols-12 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {/* LEFT — Magie · cream */}
          <article
            className="lg:col-span-5 relative bg-white p-8 md:p-10 flex flex-col"
            style={{
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -25px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
              minHeight: "560px",
            }}
          >
            <span aria-hidden className="absolute -top-8 -right-4 select-none" style={{ fontSize: "120px", color: ACCENT, opacity: 0.05, transform: "rotate(15deg)" }}>♦</span>
            <div className="flex items-baseline gap-3 mb-8">
              <span className={`${SERIF_ITALIC} text-3xl md:text-4xl tabular-nums`} style={{ color: ACCENT }}>01</span>
              <span className="text-[11px] tracking-[0.18em] uppercase font-bold" style={{ color: ACCENT }}>Magie · der Trick</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-black text-foreground leading-[1.05] mb-5">
              Etwas, das{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>nicht stimmen kann.</span>
            </h3>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.7] mb-8 max-w-md">
              Die magische Sekunde: drei Sekunden Stille, dann atmet der Saal
              aus. Ohne diese Stille gibt es keine Pointe danach.
            </p>
            <ul className="space-y-5 mt-auto">
              {MAGIE_BEISPIELE.map((m, i) => (
                <li key={m.title} className="flex gap-4">
                  <span
                    className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                      border: "1px solid rgba(154,38,64,0.22)",
                    }}
                  >
                    <m.Icon className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className={`${SERIF_ITALIC} text-sm tabular-nums`} style={{ color: ACCENT }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-base md:text-lg font-bold text-foreground leading-tight">{m.title}</p>
                    </div>
                    <p className="text-sm text-foreground/65 leading-[1.6]">{m.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>

          {/* RIGHT — Comedy · dark */}
          <article
            className="lg:col-span-7 relative text-white p-8 md:p-12 flex flex-col overflow-hidden"
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(150deg, ${ACCENT_DEEP} 0%, #08060c 65%, #08060c 100%)`,
              boxShadow: "0 40px 80px -30px rgba(40,20,40,0.55)",
              minHeight: "560px",
            }}
          >
            <div aria-hidden className="absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)" }} />
            <div aria-hidden className="absolute -bottom-32 -left-10 w-[380px] h-[380px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.6), transparent 65%)" }} />

            <div className="relative flex items-baseline gap-3 mb-8">
              <span className={`${SERIF_ITALIC} text-3xl md:text-4xl tabular-nums`} style={{ color: "#f3d9a8" }}>02</span>
              <span className="text-[11px] tracking-[0.18em] uppercase font-bold" style={{ color: "#f3d9a8" }}>Comedy · die Pointe</span>
            </div>
            <h3 className="relative font-display text-3xl md:text-5xl font-black text-white leading-[1.0] mb-5">
              Und der Saal{" "}
              <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>lacht.</span>
            </h3>
            <p className="relative text-base md:text-lg text-white/70 leading-[1.7] mb-8 max-w-lg">
              Pointe direkt nach dem Trick. Nicht parallel — sondern an genau
              der Sekunde, in der das Wow ausgesprochen wird. Aus der
              Reaktion, nie auf Kosten eines Gastes.
            </p>
            <ul className="relative space-y-6 mt-auto">
              {COMEDY_BEISPIELE.map((c, i) => (
                <li
                  key={c.title}
                  className="grid grid-cols-[44px_1fr] gap-4 pb-6 border-b last:border-b-0 last:pb-0"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }}
                  >
                    <c.Icon className="w-4 h-4" style={{ color: "#f3d9a8" }} strokeWidth={1.75} />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3 mb-1.5">
                      <span className={`${SERIF_ITALIC} text-sm tabular-nums`} style={{ color: "#f3d9a8" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-base md:text-xl font-bold leading-tight">{c.title}</p>
                    </div>
                    <p className="text-sm md:text-base text-white/70 leading-[1.65]">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className={`${SERIF_ITALIC} text-lg md:text-2xl text-foreground/70 leading-snug mt-14 max-w-3xl`}>
          Klassische Zauberer wollen, dass ihr staunt.{" "}
          <span style={{ color: ACCENT }}>Ich will, dass ihr lacht — direkt danach.</span>
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   KOMIK-DNA — 4 Akte als narrative Editorial-Liste
   ═══════════════════════════════════════════════════════════ */
const KOMIK_DNA = [
  {
    t: "Sek 0",
    akt: "Akt I — Setup",
    title: "Der Saal weiß noch nicht, dass das eine Comedy-Show ist.",
    body: "Ich starte ganz klassisch. Karten, ruhiger Ton, ein Gast aus dem Publikum. Niemand erwartet, dass in vier Sekunden gelacht wird. Genau das macht die erste Pointe so hart — weil keiner sie hat kommen sehen.",
    aside: "Comedy lebt davon, was vor der Pointe passiert. Drei Sekunden Aufbau für eine halbe Sekunde Lachen.",
  },
  {
    t: "Sek 18",
    akt: "Akt II — Erster Lacher",
    title: "Aus dem Trick kommt der Witz — nicht andersrum.",
    body: "Erste Pointe nach durchschnittlich 18 Sekunden. Sie kommt nicht aus einer Zeile, die ich aufgesagt habe — sondern aus dem Moment, in dem der Trick gerade passiert. Der Saal lacht über die Situation, nicht über mich oder den Gast.",
    aside: "Reaktion ist die Pointe. Skript ist nur der Boden, auf dem sie steht.",
  },
  {
    t: "Min 8",
    akt: "Akt III — Roast",
    title: "Audience-Roast, aber freundlich.",
    body: "Mittlere Phase: leichter Roast vom Gast auf der Bühne — nie verletzend, nie persönlich, immer mit Augenzwinkern. Funktioniert weil ich vorher schon zwei Tricks für ihn gemacht habe. Er ist auf meiner Seite — der Saal lacht über die Situation, nicht über ihn.",
    aside: "Wer auf der Bühne war, geht als Held vom Tisch zurück. Nie als Witz.",
  },
  {
    t: "Min 18",
    akt: "Akt IV — Pointe + Wow",
    title: "Eine Pointe und ein magischer Moment in derselben Sekunde.",
    body: "Letzter Akt: die Pointe und der Wow-Effekt landen gleichzeitig. Saal lacht, klatscht, atmet aus. Drei Sekunden später Standing Ovation. Das ist der Moment, von dem Gastgeber Wochen später noch reden — nicht der Trick, nicht die Pointe, sondern dass beides gleichzeitig kam.",
    aside: "Beides zusammen ist nicht die Summe der Teile. Es ist die magische Sekunde.",
  },
];

const KomikDNASection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Vier Akte, eine Pointe.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Die DNA{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>eines Lachers</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Comedy in einer Zauber-Show entsteht nicht zufällig. Vier
              Aufbau-Phasen, jede mit eigener Funktion. So liest sich eine
              typische 20-Min-Comedy-Routine aus dem Publikum.
            </p>
          </div>
        </div>

        <div className="space-y-16 md:space-y-20">
          {KOMIK_DNA.map((b, i) => (
            <article
              key={b.akt}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <header className="lg:col-span-3">
                <div className="flex items-baseline gap-3 mb-3">
                  <Flame className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={2} />
                  <span className={`${SERIF_ITALIC} text-3xl md:text-4xl tabular-nums`} style={{ color: ACCENT }}>
                    {b.t}
                  </span>
                </div>
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-2" style={{ color: ACCENT }}>
                  {b.akt}
                </p>
              </header>
              <div className="lg:col-span-6">
                <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-5">
                  {b.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/75 leading-[1.7]">{b.body}</p>
              </div>
              <aside className="lg:col-span-3 lg:pl-7 lg:border-l" style={{ borderColor: `${ACCENT}30` }}>
                <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/65 leading-[1.5]`}>
                  {b.aside}
                </p>
              </aside>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   COMEDY-ANTEIL-SLIDER — interaktiver 3-Modus-Switcher
   ═══════════════════════════════════════════════════════════ */
const COMEDY_MODI = [
  {
    key: "dezent" as const,
    label: "Dezenter Witz",
    sub: "Premium-Ton · Vorstandsdinner-tauglich",
    desc: "Comedy als unterschwelliger Akzent. Mentaleffekte mit leichtem Augenzwinkern, sehr wenige Pointen, dafür drei Sekunden Stille nach jedem Effekt. Für konservative Settings — Galaabend, Award-Show, Vorstandsfeier.",
    stats: { magie: 75, comedy: 15, roast: 10 },
    tag: "Conservative-Setting",
  },
  {
    key: "mix" as const,
    label: "Comedy-Heavy",
    sub: "Empfohlen · der Standard",
    desc: "Klassischer Comedy-Zauber-Mix. Etwa jede Minute eine Pointe, eingebauter Audience-Roast (freundlich), drei bis vier Stand-Up-Beats pro 20-Min-Slot. Funktioniert von Hochzeit bis Firmenfeier — universell einsetzbar.",
    stats: { magie: 50, comedy: 35, roast: 15 },
    tag: "70% aller Buchungen",
  },
  {
    key: "standup" as const,
    label: "Pure Stand-Up",
    sub: "Comedy-Show · Variety · späte Slots",
    desc: "Hauptsächlich Stand-Up mit Magie als visuelles Highlight für jede dritte Pointe. Eigene Pointen-Sets, längere Anekdoten-Routinen, Audience-Roast mit längeren Bögen. Für Comedy-Shows, Variety-Abende, späte Slots.",
    stats: { magie: 30, comedy: 55, roast: 15 },
    tag: "Für Comedy-Shows",
  },
];

const ComedyAnteilSliderSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState<"dezent" | "mix" | "standup">("mix");
  const current = COMEDY_MODI.find((m) => m.key === active)!;
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Wie viel Comedy ist drin?
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Drei{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Comedy-Modi</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Comedy-Anteil ist nicht eingebaut — sondern wählbar. Vorab im
              Briefing-Call abgestimmt, je nach Publikum, Tonalität und Anlass
              dosiert.
            </p>
          </div>
        </div>

        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* LEFT — Mode-Switcher */}
          <div className="lg:col-span-5 space-y-3">
            {COMEDY_MODI.map((m, i) => {
              const isActive = m.key === active;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setActive(m.key)}
                  onMouseEnter={() => setActive(m.key)}
                  className="block w-full text-left rounded-2xl transition-all duration-500"
                  style={{
                    background: isActive ? "white" : "rgba(255,255,255,0.55)",
                    border: isActive ? `1px solid ${ACCENT}40` : "1px solid rgba(0,0,0,0.08)",
                    borderLeftWidth: isActive ? "4px" : "1px",
                    borderLeftColor: isActive ? ACCENT : "rgba(0,0,0,0.08)",
                    boxShadow: isActive ? "0 30px 60px -30px rgba(154,38,64,0.25)" : "none",
                    padding: "1.5rem 1.75rem",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span
                      className={`${SERIF_ITALIC} text-2xl md:text-3xl tabular-nums`}
                      style={{ color: isActive ? ACCENT : "rgba(0,0,0,0.3)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-xl font-bold text-foreground leading-snug">
                      {m.label}
                    </span>
                  </div>
                  <p className={`${SERIF_ITALIC} text-sm md:text-base text-foreground/55 mb-2`}>{m.sub}</p>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold"
                    style={{
                      background: isActive ? `${ACCENT}14` : "rgba(0,0,0,0.04)",
                      color: isActive ? ACCENT : "rgba(0,0,0,0.55)",
                    }}
                  >
                    {m.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT — sticky Mode-Detail */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative p-8 md:p-10 text-white overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, #08060c 100%)`,
                boxShadow: "0 50px 100px -30px rgba(40,20,40,0.4)",
              }}
            >
              <div aria-hidden className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.6), transparent 70%)" }} />

              <p className="relative text-[10px] tracking-[0.18em] uppercase font-bold mb-3" style={{ color: "#f3d9a8" }}>
                Aktiver Modus
              </p>
              <h3 className="relative font-display text-2xl md:text-4xl font-black leading-[1.1] mb-5">
                {current.label}.
              </h3>
              <p className="relative text-base md:text-lg text-white/80 leading-[1.7] mb-8 max-w-lg">
                {current.desc}
              </p>

              <div className="relative space-y-4">
                {[
                  { label: "Magie-Anteil", val: current.stats.magie, color: "#f3d9a8" },
                  { label: "Comedy-Anteil", val: current.stats.comedy, color: "#c79042" },
                  { label: "Roast-Anteil", val: current.stats.roast, color: "#86d29a" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-[11px] tracking-[0.16em] uppercase font-bold text-white/70">{s.label}</span>
                      <span className="font-display text-lg font-black tabular-nums" style={{ color: s.color }}>
                        {s.val}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${s.val}%`, background: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL-QUOTE — black full-bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-[#08060c] text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src={emotionenImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(8,6,12,0.55) 0%, rgba(8,6,12,0.95) 70%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)" }} />
      <div aria-hidden className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.7), transparent 65%)" }} />
      <div className={`relative container px-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <Quote className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto opacity-40" style={{ color: "#f3d9a8" }} strokeWidth={1.25} />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p className="font-display font-black tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.75rem)]">
            Erste Pointe nach 18 Sekunden.{" "}
            <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
              Letzte vor dem Applaus.
            </span>
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span className={`${SERIF_ITALIC} text-base md:text-lg text-white/65`}>
              Was Veranstalter im Briefing-Call zurückspielen.
            </span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANLASS-MATRIX — wann passt Comedy-Zauberei, mit Foto-Banner
   ═══════════════════════════════════════════════════════════ */
const ANLAESSE_COMEDY = [
  {
    Icon: PartyPopper,
    label: "Comedy-Show",
    note: "Variety · Stand-Up-Slots",
    body: "Pure Stand-Up-Modus, eigene Pointen-Sets zwischen Stand-Up-Acts. Magie als visuelles Highlight für jede dritte Pointe. Comedy-Slot 15–25 Min, Variety-Slot 20–35 Min.",
  },
  {
    Icon: Mic2,
    label: "Stand-Up-Slot",
    note: "Open-Mic · Comedy-Abend",
    body: "Comedy-Anteil maximal, Karten-Comedy als roter Faden zwischen Pointen-Sets. Funktioniert auf Open-Mics, Mixed-Bills und Comedy-Festivals — 10–20 Min, hohe Pointen-Dichte.",
  },
  {
    Icon: Heart,
    label: "Hochzeit · Comedy-Block",
    note: "Vor dem Tanz · 15–25 Min",
    body: "Brautpaar-Anekdoten als Pointen-Quelle, Audience-Roast mit den Trauzeugen (freundlich), Magie-Heavy mit Comedy-Akzenten. Tonalität warm-frech, nie verletzend.",
  },
  {
    Icon: Building2,
    label: "Firmenfeier · Mix",
    note: "Mitarbeiterabend · Sales-Kickoff",
    body: "Insider-Pointen aus Briefing der Geschäftsleitung, Comedy-Heavy-Modus, Karten-Comedy mit dem Vorstand auf der Bühne (er ist der Held, nicht der Witz). Tonalität an Unternehmenskultur angepasst.",
  },
  {
    Icon: Trophy,
    label: "Variety-Abend",
    note: "Theater · 25–45 Min Slot",
    body: "Längerer Slot mit eigenen Pointen-Sets, drei Mental-Routinen mit Pointen-Anker, Audience-Roast als Mittel-Akt. Funktioniert in Variety-Theatern, Kleinkunst-Bühnen, Theater-Slots.",
  },
];

const AnlassMatrixSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        {/* Foto-Banner oben */}
        <div className={`relative overflow-hidden mb-14 md:mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ borderRadius: "1.5rem" }}>
          <img
            src={buehneZuschauerImg}
            alt="Comedy-Zauberei vor lachendem Publikum — Emilian Leber"
            className="w-full h-[280px] md:h-[420px] object-cover"
            loading="lazy"
            style={{ filter: "saturate(0.95) brightness(0.92)", objectPosition: "center 25%" }}
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.65))" }} />
          <div aria-hidden className="absolute -top-32 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)" }} />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-10 md:right-10 text-white flex flex-wrap items-end justify-between gap-4">
            <p className={`${SERIF_ITALIC} text-lg md:text-2xl leading-snug max-w-xl`}>
              „Lacher gezählt vom Auftraggeber — kein Marketing-KPI."
            </p>
            <span
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
              style={{ background: "rgba(8,6,12,0.5)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              200+ Comedy-Slots
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className={`md:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Wann Comedy-Zauberei trägt.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Fünf Anlässe.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Eine Pointe-DNA</span>.
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Pure Comedy-Show, Stand-Up-Slot, Hochzeits-Comedy-Block,
              Firmen-Mix oder Variety-Abend. Fünf Settings, in denen
              Comedy-Zauberei den Abend trägt — mit unterschiedlichem
              Comedy-Anteil und Tonalität.
            </p>
          </div>
        </div>

        {/* Liste — full-width */}
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {ANLAESSE_COMEDY.map((a, i) => (
            <li
              key={a.label}
              className={`grid grid-cols-[44px_1fr_auto] md:grid-cols-[68px_1fr_auto] items-baseline gap-4 md:gap-8 py-7 md:py-10 group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full self-start"
                style={{
                  background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                  border: "1px solid rgba(154,38,64,0.22)",
                }}
              >
                <a.Icon className="w-4 h-4 md:w-6 md:h-6" style={{ color: ACCENT }} strokeWidth={1.75} />
              </span>
              <div className="grid md:grid-cols-[1fr_2fr] gap-x-8 gap-y-2 items-baseline">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-1">{a.label}</h3>
                  <span className={`${SERIF_ITALIC} text-sm md:text-base text-foreground/55`}>{a.note}</span>
                </div>
                <p className="text-base text-foreground/65 leading-[1.65]">{a.body}</p>
              </div>
              <span
                className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 group-hover:bg-[#9a2640] group-hover:text-white text-foreground/30 self-start mt-1"
                aria-hidden
              >
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            to="/buchung?format=Comedy-Zauberei"
            className="hero-cta inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)",
            }}
          >
            Anlass besprechen
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>Antwort innerhalb 24 h</span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   REPERTOIRE-BENTO — 4 Comedy-Zauber-Routinen, asymmetric
   ═══════════════════════════════════════════════════════════ */
const COMEDY_REPERTOIRE = [
  {
    kicker: "Mental-Comedy · Headliner",
    title: "Die Zeugen-Befragung.",
    body: "Drei Gäste werden Zeugen einer Vorhersage, die ich morgens auf eine Bierdeckel-Rückseite gekritzelt habe. Klingt langweilig. Wird komisch, weil ich die Befragung wie ein Tatort-Kommissar führe — mit Notizblock, Stirnrunzeln, Standardfragen. Die Pointe ist nicht die Vorhersage. Es ist der Moment, in dem der dritte Gast realisiert, dass auf dem Bierdeckel sein voller Name steht — handgeschrieben, aus dem Jahr 1987.",
    size: "lg",
  },
  {
    kicker: "Karten-Comedy",
    title: "Der lügende Kartendieb.",
    body: "Ein Gast wird auf die Bühne geholt — als angeblicher Kartenprofi. Er soll eine Karte ziehen und nicht verraten welche. Im Lauf der Routine erwische ich ihn beim [Schummeln] — natürlich gestellt. Punchline kommt, wenn die echte Karte aus seiner eigenen Brieftasche fällt.",
    size: "md",
  },
  {
    kicker: "Anekdoten-Roast",
    title: "Wie ich angefangen habe.",
    body: "Stand-Up-artige Anekdote über meinen ersten bezahlten Gig — Kindergeburtstag, 12 Jahre alt, ein Kind hat geweint, der Vater wollte sein Geld zurück. Pointen-Set mit echtem Stoff, eingebauter Mental-Effekt in der Mitte.",
    size: "sm",
  },
  {
    kicker: "Audience-Roast",
    title: "Die Wahrheits-Karte.",
    body: "Gast aus dem Publikum auf die Bühne. Karten-Routine mit Pointen, eingebauter Mini-Roast — nie verletzend. Endet mit einer signierten Karte aus seiner verschlossenen Tasche, die er die ganze Zeit selbst hielt. Er ist der Held, nicht der Witz.",
    size: "sm",
  },
];

const RepertoireBentoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Vier Routinen aus dem Comedy-Set.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Pointe, Trick,{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Pointe wieder</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vier Comedy-Zauber-Routinen, die in unterschiedlicher
              Kombination fast jeden Abend vorkommen — abgestimmt auf Anlass,
              gewünschtem Comedy-Anteil und Publikumsstruktur.
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* lg: 4 cols — light cream */}
          <article
            className="md:col-span-4 relative bg-white p-8 md:p-10 flex flex-col"
            style={{
              borderRadius: "1.25rem",
              boxShadow: "0 25px 50px -25px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
              minHeight: "360px",
            }}
          >
            <span aria-hidden className="absolute -top-8 -right-3 select-none" style={{ fontSize: "120px", color: ACCENT, opacity: 0.06, transform: "rotate(15deg)" }}>♠</span>
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-3" style={{ color: ACCENT }}>{COMEDY_REPERTOIRE[0].kicker}</p>
            <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-[1.1] mb-5 max-w-md">
              {COMEDY_REPERTOIRE[0].title}
            </h3>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.7] max-w-xl">{COMEDY_REPERTOIRE[0].body}</p>
            <div className="mt-auto pt-7 flex items-center gap-3 flex-wrap">
              <span className={`${SERIF_ITALIC} text-base`} style={{ color: ACCENT }}>6–8 Min</span>
              <span aria-hidden className="text-foreground/25">·</span>
              <span className="text-sm text-foreground/55">Mental + Comedy-Setup · 12 Pointen-Set</span>
            </div>
          </article>

          {/* md: 2 cols — burgundy */}
          <article
            className="md:col-span-2 relative text-white p-7 md:p-9 flex flex-col overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              background: `linear-gradient(155deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
              minHeight: "360px",
            }}
          >
            <span aria-hidden className="absolute -bottom-4 -right-4 select-none" style={{ fontSize: "110px", color: "white", opacity: 0.07 }}>♥</span>
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/65 mb-3">{COMEDY_REPERTOIRE[1].kicker}</p>
            <h3 className="font-display text-xl md:text-2xl font-black leading-tight mb-4">{COMEDY_REPERTOIRE[1].title}</h3>
            <p className="text-sm md:text-base text-white/80 leading-[1.6]">{COMEDY_REPERTOIRE[1].body}</p>
            <div className="mt-auto pt-5 flex items-center gap-2 text-[12px] text-white/65">
              <span className={`${SERIF_ITALIC} text-sm`} style={{ color: "#f3d9a8" }}>4 Min</span>
              <span aria-hidden className="text-white/30">·</span>
              <span>Bühne · Gast-Routine</span>
            </div>
          </article>

          {/* sm: 2 cols — burgunder pastel cream */}
          <article
            className="md:col-span-2 relative p-7 md:p-9 flex flex-col"
            style={{
              borderRadius: "1.25rem",
              background: `linear-gradient(150deg, ${ACCENT_SOFT}40 0%, ${ACCENT_SOFT}20 100%)`,
              minHeight: "320px",
              border: `1px solid ${ACCENT}25`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Drama className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: ACCENT }}>{COMEDY_REPERTOIRE[2].kicker}</p>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-4">{COMEDY_REPERTOIRE[2].title}</h3>
            <p className="text-sm md:text-base text-foreground/75 leading-[1.6]">{COMEDY_REPERTOIRE[2].body}</p>
            <div className="mt-auto pt-4 flex items-center gap-2 text-[12px] text-foreground/55">
              <span className={`${SERIF_ITALIC} text-sm`} style={{ color: ACCENT }}>3 Min</span>
              <span aria-hidden className="text-foreground/25">·</span>
              <span>Stand-Up + Mental</span>
            </div>
          </article>

          {/* md: 4 cols — dark */}
          <article
            className="md:col-span-4 relative bg-[#08060c] text-white p-8 md:p-10 flex flex-col md:flex-row gap-7 md:items-center overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              minHeight: "320px",
            }}
          >
            <div aria-hidden className="absolute -top-20 -right-10 w-[360px] h-[360px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.7), transparent 65%)" }} />
            <div
              className="shrink-0 inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <Laugh className="w-9 h-9 md:w-10 md:h-10" style={{ color: "#f3d9a8" }} strokeWidth={1.5} />
            </div>
            <div className="relative">
              <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-2.5" style={{ color: "#f3d9a8" }}>{COMEDY_REPERTOIRE[3].kicker}</p>
              <h3 className="font-display text-xl md:text-2xl font-black leading-tight mb-3">{COMEDY_REPERTOIRE[3].title}</h3>
              <p className="text-sm md:text-base text-white/75 leading-[1.65] max-w-lg">{COMEDY_REPERTOIRE[3].body}</p>
            </div>
          </article>
        </div>

        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mt-10 max-w-2xl`}>
          Plus rund 30 weitere Comedy-Zauber-Routinen — kombiniert je nach
          Anlass, Comedy-Modus und Publikum.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUIZ
   ═══════════════════════════════════════════════════════════ */
const comedyQuizConfig: CustomQuizConfig = {
  anlass: "Comedy-Zauberei",
  sectionEyebrow: "Comedy-Finder · Magie mit Pointe",
  sectionTitle: (
    <>
      Welcher{" "}
      <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
        Comedy-Stil
      </span>{" "}
      passt zu euch?
    </>
  ),
  sectionDesc:
    "Vier Fragen, eine konkrete Empfehlung — von dezentem Witz bis pure Stand-Up.",
  questions: [
    {
      id: "publikum",
      eyebrow: "Frage 01 · Publikum",
      title: <>Wer sitzt im Saal?</>,
      hint: "Davon hängt der Comedy-Stil ab.",
      feedback: "Spannend.",
      cols: 4,
      options: [
        { value: "vorstand", label: "Vorstand · konservativ", sub: "Premium-Ton, dezenter Witz" },
        { value: "mitarbeiter", label: "Mitarbeiter · Mix", sub: "Hierarchie-übergreifend" },
        { value: "hochzeit", label: "Hochzeitsgäste", sub: "Familie · Freunde · Trauzeugen" },
        { value: "comedy", label: "Comedy-Publikum", sub: "Erwartet Stand-Up-Tempo" },
      ],
    },
    {
      id: "stil",
      eyebrow: "Frage 02 · Tonalität",
      title: <>Welcher Humor-Stil?</>,
      hint: "Trocken, freundlich-frech oder Stand-Up?",
      feedback: "Passt.",
      cols: 3,
      options: [
        { value: "trocken", label: "Trocken · clever", sub: "Mental-Pointen, drei Sekunden Stille" },
        { value: "warm", label: "Freundlich-frech", sub: "Karten-Comedy, Audience-Roast leicht" },
        { value: "standup", label: "Stand-Up-frech", sub: "Pointen-Sets, längere Anekdoten" },
      ],
    },
    {
      id: "anteil",
      eyebrow: "Frage 03 · Comedy-Anteil",
      title: <>Wie viel Comedy ist drin?</>,
      hint: "Magie mit Akzent, ausgewogen oder Comedy-Heavy?",
      feedback: "Verstanden.",
      cols: 3,
      options: [
        { value: "wenig", label: "Wenig · dezent", sub: "Magie mit Augenzwinkern" },
        { value: "mittel", label: "Ausgewogen", sub: "Magie-Comedy 50/50" },
        { value: "viel", label: "Comedy-Heavy", sub: "Pure Stand-Up mit Magie-Akzenten" },
      ],
    },
    {
      id: "slot",
      eyebrow: "Frage 04 · Slot",
      title: <>Wie lang soll der Slot sein?</>,
      hint: "Highlight-Slot oder eigene Comedy-Show?",
      feedback: "Klingt stark.",
      cols: 3,
      options: [
        { value: "kurz", label: "10–15 Min", sub: "Highlight zwischen Programmpunkten" },
        { value: "mittel", label: "20–30 Min", sub: "Hauptslot mit Comedy-Block" },
        { value: "lang", label: "35–60 Min", sub: "Eigene Comedy-Show / Variety-Slot" },
      ],
    },
  ],
  recommend: (a) => {
    const { publikum, stil, anteil, slot } = a;
    if (publikum === "vorstand" || stil === "trocken" || anteil === "wenig") {
      return {
        format: "Dezenter-Witz-Modus",
        sub: "Premium-Ton, Mental-Pointen, drei Sekunden Stille",
        why:
          "Comedy als Akzent in einer Mental-Zauber-Show. Keine lauten Pointen, keine offensichtlichen Witze — dafür subtile Punchlines, die nach drei Sekunden Stille kommen. Funktioniert auf Vorstandsdinner, Galas und konservativen Settings.",
        link: "/buchung",
      };
    }
    if (publikum === "comedy" || stil === "standup" || anteil === "viel" || slot === "lang") {
      return {
        format: "Pure-Stand-Up-Modus",
        sub: "Stand-Up mit Magie als visuellem Highlight",
        why:
          "Eigene Pointen-Sets, längere Anekdoten-Routinen, Magie als Pointe-Anker. Für Comedy-Shows, Variety-Abende, Stand-Up-Open-Mics und späte Slots in Mixed-Bills.",
        link: "/buchung",
      };
    }
    if (publikum === "hochzeit") {
      return {
        format: "Hochzeits-Comedy-Block",
        sub: "Brautpaar-Anekdoten · freundlicher Roast · Magie-Heavy",
        why:
          "Brautpaar-Anekdoten als Pointen-Quelle, Trauzeugen als freundliche Roast-Ziele, Karten-Comedy als roter Faden. Tonalität warm-frech, nie verletzend. Slot 15–25 Min vor dem Tanz.",
        link: "/hochzeit",
      };
    }
    return {
      format: "Comedy-Heavy-Modus (Standard)",
      sub: "70% aller Buchungen · 50/35/15 Mix",
      why:
        "Etwa jede Minute eine Pointe, eingebauter Audience-Roast (freundlich), drei bis vier Stand-Up-Beats pro 20-Min-Slot. Universell einsetzbar — von Hochzeit bis Firmenfeier.",
      link: "/buchung",
    };
  },
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Es war einfach Mega! 200 Gäste — Emilian hat mit seiner Comedy-Zauberei alle begeistert. Der Saal hat gelacht und gestaunt — manchmal in derselben Sekunde.",
      author: "Jan von Lehmann",
      role: "Firmenfeier · 200 Gäste",
      initial: "J",
    },
    {
      quote:
        "Mit viel Charme und Witz hat er alle Gäste begeistert. Comedy-Zauberei, die nie auf Kosten der Gäste geht — und trotzdem den ganzen Saal zum Lachen bringt.",
      author: "Katrin Raß",
      role: "Hochzeitsplanerin",
      initial: "K",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst und seinen Humor in den Mittelpunkt stellt. Eine echte Ergänzung für jeden Anlass.",
      author: "Martina Senftl",
      role: "Eventkundin",
      initial: "M",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Was Gastgeber sagen.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            5,0 Sterne.
            <br />
            <span className={SERIF_ITALIC}>30+ Bewertungen.</span>
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {reviews.map((r) => (
            <article
              key={r.author}
              itemScope
              itemType="https://schema.org/Review"
              className="relative bg-white p-7 md:p-9 flex flex-col h-full"
              style={{
                borderRadius: "1rem",
                boxShadow: "0 25px 50px -25px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <meta itemProp="reviewRating" content="5" />
              </div>
              <p itemProp="reviewBody" className="text-[15px] md:text-base leading-[1.65] text-foreground/85 flex-1">
                „{r.quote}"
              </p>
              <footer className="mt-7 pt-5 border-t border-foreground/10 flex items-center gap-4">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-white text-base"
                  style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                >
                  {r.initial}
                </div>
                <div>
                  <p itemProp="author" className="font-display font-bold text-foreground text-sm">
                    {r.author}
                  </p>
                  <p className={`${SERIF_ITALIC} text-[13px] text-foreground/55 mt-0.5`}>{r.role}</p>
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
   VIDEO — TVA-Auftritt
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [playing, setPlaying] = useState(false);
  const videoId = TVA_VIDEO_ID;
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-14 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>TV-Auftritt.</p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
            Comedy-Zauberei im{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              TV
            </span>
            .
          </h2>
          <p className="mt-6 text-base md:text-lg text-foreground/60 leading-[1.6] max-w-xl mx-auto">
            Auszug aus dem TVA-Auftritt 2025 — Comedy-Zauberei live vor TV-Publikum, mit Mentaleffekten und Pointen-Set.
          </p>
        </div>
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div className="relative aspect-video overflow-hidden bg-foreground/5" style={{ borderRadius: "1.5rem" }}>
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=1`}
                title="Comedy-Zauberer Emilian Leber — TVA-Auftritt 2025"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Comedy-Zauberer Emilian Leber — TVA-Auftritt Vorschau"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-20 h-20 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                    aria-label="TVA-Comedy-Zauberei-Auftritt abspielen"
                  >
                    <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
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
   TRUST-STRIP
   ═══════════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  { Icon: Trophy, name: "Greatest Talent", sub: "2023 · Finalist (TV)" },
  { Icon: Award, name: "Talents of Magic", sub: "2024 · Finalist + Kreativpreis" },
  { Icon: Medal, name: "Deutsche Jugendmeisterschaft", sub: "2024 · Top 30" },
  { Icon: Tv, name: "TVA", sub: "2025 · TV-Auftritt" },
  { Icon: Star, name: "ProvenExpert", sub: "5,0 ★ · 30+ Bewertungen" },
];

const TrustSection = () => (
  <section className="bg-white py-20 md:py-28 border-y border-foreground/10">
    <div className="container px-6">
      <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-5`}>Bekannt aus.</p>
        <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
          TV, Wettbewerb und{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            200+ Comedy-Slots
          </span>
          .
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {TRUST_ITEMS.map((it) => (
          <article
            key={it.name}
            className="group relative bg-[hsl(36,30%,97%)] border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:-translate-y-1"
          >
            <div
              className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, rgba(154,38,64,0.16), rgba(154,38,64,0.05))",
                border: "1px solid rgba(154,38,64,0.22)",
              }}
            >
              <it.Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
            </div>
            <p className="font-display font-bold text-foreground text-sm md:text-base leading-tight mb-1.5">{it.name}</p>
            <p className={`${SERIF_ITALIC} text-[12px] md:text-sm text-foreground/55 leading-snug`}>{it.sub}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "Funktioniert Comedy auch beim Vorstandsdinner?",
    a: "Ja — im Dezenter-Witz-Modus. Comedy als unterschwelliger Akzent, Mental-Pointen mit Augenzwinkern, drei Sekunden Stille nach jedem Effekt. Funktioniert auf Galaabenden, Award-Shows und konservativen Vorstandsdinners — vorab im Briefing-Call dosiert.",
  },
  {
    q: "Was, wenn jemand keinen Humor versteht?",
    a: "Comedy ist nie auf Kosten von Gästen. Wer auf der Bühne ist, geht als Held vom Tisch zurück — nie als Witz. Pointen entstehen aus der Situation, nicht aus dem Vorführen. Selbst Skeptiker lachen, weil sie nicht selbst Ziel sind.",
  },
  {
    q: "Wie viel Comedy ist drin?",
    a: "Wählbar in drei Modi — von dezentem Witz (Comedy 15%) über Comedy-Heavy (Comedy 35%) bis Pure Stand-Up (Comedy 55%). Vorab im 30-Min-Briefing abgestimmt, je nach Publikum, Anlass und Tonalität.",
  },
  {
    q: "Funktioniert Comedy-Zauberei auch bei Hochzeiten?",
    a: "Sehr gut — als Comedy-Block vor dem Tanz. Brautpaar-Anekdoten werden zu Pointen-Quellen, Trauzeugen sind freundliche Roast-Ziele, Karten-Comedy als roter Faden. Tonalität warm-frech, nie verletzend — Brautpaar bleibt im Mittelpunkt.",
  },
  {
    q: "Ist Comedy-Zauberei auch für reine Stand-Up-Shows geeignet?",
    a: "Ja — im Pure-Stand-Up-Modus. Eigene Pointen-Sets zwischen Stand-Up-Acts, Magie als visuelles Highlight. Funktioniert auf Open-Mics, Mixed-Bills, Comedy-Festivals und Variety-Abenden. Slot 10–25 Min, hohe Pointen-Dichte.",
  },
  {
    q: "Was kostet Comedy-Zauberei?",
    a: "Hängt von Slot-Länge, Anreise und Comedy-Modus ab. Verbindliches Angebot nach kurzer Anfrage über /buchung — innerhalb von 24 h Antwort mit Konzept-Vorschlag.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Häufige Fragen.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was vorher
            <br />
            <span className={SERIF_ITALIC}>gefragt wird.</span>
          </h2>
        </div>
        <div className={`max-w-3xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6 md:py-7 border-b border-foreground/15">
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">{faq.q}</span>
                <span aria-hidden className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FINAL-CTA — black full-bleed
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={stageShowImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.75) 50%, rgba(8,6,12,0.55) 100%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.55), transparent 60%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(255,180,40,0.5), transparent 60%)" }} />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}>Erste Pointe nach 18 Sekunden.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Comedy-Zauberei{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              buchen
            </span>
            .
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Anlass und gewünschten Comedy-Modus — Antwort innerhalb 24 Stunden mit Konzept-Vorschlag und Pointen-Set-Skizze.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung?format=Comedy-Zauberei"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90"
            >
              Comedy-Slot anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+4915563744696" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white">
              Direkt anrufen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/comedy-zauberei";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Comedy-Zauberei",
  name: "Comedy-Zauberer Emilian Leber",
  description:
    "Comedy-Zauberei mit Mentaleffekten, Pointen-Sets und Audience-Roast. Drei Comedy-Modi: dezent, Comedy-Heavy, Pure Stand-Up. Für Bühne, Variety, Firmenfeier, Hochzeit.",
  provider: {
    "@type": "Person",
    name: "Emilian Leber",
    url: "https://www.magicel.de",
  },
  areaServed: ["Bayern", "Deutschland"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "30",
  },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: "https://www.magicel.de" },
    { "@type": "ListItem", position: 2, name: "Comedy-Zauberei", item: SITE_URL },
  ],
};

const ComedyZauberei = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Comedy-Zauberer — Magie mit Pointe & Lacher | Emilian Leber</title>
      <meta
        name="description"
        content="Comedy-Zauberer in Bayern und deutschlandweit — Mentalmagie mit Comedy-Anteil, Pointen-Sets, Comedy-Magic-Routinen. Für Comedy-Shows, Variety, Firmenfeiern. 5,0 Sterne."
      />
      <meta
        name="keywords"
        content="Comedy-Zauberer, Comedy Zauberei, Comedy Magier, Comedy-Show Magier, Stand-Up Magier, Magie mit Comedy, Comedy Mental Magic, Zauberer Comedy, Variety-Show, Magier Pointen, Comedy-Magier Bayern, Emilian Leber"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Comedy-Zauberer — Magie mit Pointe & Lacher | Emilian Leber" />
      <meta property="og:description" content="Comedy-Zauberei mit Mentaleffekten und Pointen-Set. 5,0 Sterne, 200+ Events, TV-erfahren." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Comedy-Zauberer — Magie mit Pointe | Emilian Leber" />
      <meta name="twitter:description" content="Comedy-Zauberei mit Mentaleffekten und Pointen-Set. 5,0 Sterne." />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      <script type="application/ld+json">{JSON.stringify(SERVICE_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee eyebrow="Auch komisch — bei." variant="cream" compact />
        <KonzeptIntroSection />
        <LachzaehlerSection />
        <SplitDiptychonSection />
        <KomikDNASection />
        <ComedyAnteilSliderSection />
        <PullQuoteSection />
        <AnlassMatrixSection />
        <RepertoireBentoSection />
        <CustomQuizSection config={comedyQuizConfig} />
        <StimmenSection />
        <VideoSection />
        <TrustSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default ComedyZauberei;
