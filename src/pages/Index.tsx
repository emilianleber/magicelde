import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import {
  CustomQuizSection,
  CustomQuizConfig,
} from "@/components/landing/CustomQuiz";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TVA_VIDEO_ID } from "@/lib/videos";
import { personSchema, localBusinessSchema, webSiteSchema } from "@/lib/schemaHelpers";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Trophy,
  Award,
  Medal,
  Tv,
  Heart,
  Users,
  Sparkles,
  Building2,
  Cake,
  Mic2,
  Wine,
  PartyPopper,
  Smile,
  Laugh,
  Music2,
  Camera,
} from "lucide-react";

import heroStartImg from "@/assets/hero-start.jpg";
import heroStartAvif1200 from "@/assets/hero-start-1200.avif";
import heroStartAvif800 from "@/assets/hero-start-800.avif";
import heroStartAvif400 from "@/assets/hero-start-400.avif";
import heroStartWebp1200 from "@/assets/hero-start-1200.webp";
import heroStartWebp800 from "@/assets/hero-start-800.webp";
import heroStartWebp400 from "@/assets/hero-start-400.webp";
import heroStageImg from "@/assets/hero-stage.jpg";
import heroDinnerImg from "@/assets/hero-dinner.jpg";
import heroCloseupImg from "@/assets/hero-closeup.jpg";
import heroHochzeitImg from "@/assets/hero-hochzeit-stock.jpg";
import heroFirmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import heroBirthdayImg from "@/assets/hero-birthday.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import emotionenImg from "@/assets/emotionen.jpg";

/* ─── CI v3 Tokens ─────────────────────────────────────── */
const SERIF_ITALIC =
  "not-italic";
const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";
const ACCENT_SOFT = "#C7D2FF";
const AMBER_MID = "#1D3FFF";
const AMBER_SOFT = "#C7D2FF";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — MagicDinner-Pattern
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
    @keyframes heroZoomIn {
      from { transform: scale(1.18); opacity: 0.35; filter: blur(8px); }
      to   { transform: scale(1.02); opacity: 1; filter: blur(0); }
    }
    @keyframes heroBokehDrift {
      0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
      30%  { opacity: 1; }
      70%  { opacity: 1; }
      100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; }
    }
    @keyframes heroOvershoot {
      0%   { opacity: 0; transform: translateY(60px) scale(0.88); }
      55%  { opacity: 1; transform: translateY(-10px) scale(1.04); }
      80%  { transform: translateY(2px) scale(0.99); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes heroStarPulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); }
      50%      { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); }
    }
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

const HEADLINE_SANS = ["Zauberer", "für"];
const HEADLINE_ITALIC = ["euren", "Abend."];

const BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

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

      <div
        ref={photoRef}
        className="absolute inset-0 hero-photo-wrap hero-zoom"
        style={{ willChange: "transform" }}
      >
        <picture>
          <source
            type="image/avif"
            srcSet={`${heroStartAvif400} 400w, ${heroStartAvif800} 800w, ${heroStartAvif1200} 1200w`}
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet={`${heroStartWebp400} 400w, ${heroStartWebp800} 800w, ${heroStartWebp1200} 1200w`}
            sizes="100vw"
          />
          <img
            src={heroStartImg}
            alt="Zauberkünstler Emilian Leber — Bühne, Close-Up und Magic Dinner aus Bayern"
            className="absolute inset-0 w-full h-full object-cover"
            width="1200"
            height="800"
            style={{
              objectPosition: "center 30%",
              filter: "brightness(0.75)",
            }}
            loading="eager"
            fetchPriority="high"
          />
        </picture>
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
                  color: "#AFC0FF",
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
            Bühnenshow, Close-Up zwischen euren Gästen, Magic Dinner zwischen
            den Gängen — einzeln oder kombiniert. Aus Bayern, deutschlandweit,
            mit über zweihundert Events Erfahrung.
          </p>

          <div
            className="mt-10 inline-flex flex-col sm:flex-row items-start gap-4 hero-fade"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#konzept"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Worum es geht
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

        <div className="relative mt-16 md:mt-24">
          <div
            className="hero-overshoot flex items-center gap-x-4 text-white/80 text-xs md:text-sm tracking-[0.04em]"
            style={{ animationDelay: "1.6s" }}
          >
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              ))}
              <span className="ml-1 text-white/85"><strong className="font-semibold text-white">5,0</strong> · 30+ Bewertungen</span>
            </span>
            <span aria-hidden className="text-white/25">·</span>
            <span className="text-white/85"><strong className="font-semibold text-white">200+ Events</strong> · Bayern + deutschlandweit</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · KONZEPT-INTRO — Editorial Split nach Hero
   Warm-up zwischen Hero und Format-Hub, damit der Format-Selector
   nicht direkt als zweite Section kommt (User-Feedback).
   ═══════════════════════════════════════════════════════════ */
const KonzeptIntroSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="konzept" className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Photo LEFT */}
          <div
            className={`lg:col-span-6 relative ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <div
              className="group relative overflow-hidden h-[420px] md:h-[520px] lg:h-full lg:min-h-[520px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.45), 0 15px 35px -15px rgba(40,20,10,0.25)",
              }}
            >
              <img
                src={emotionenImg}
                alt="Zauberkünstler Emilian Leber bei der Arbeit — Magie im Restaurant"
                className="w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(8,6,12,0.75) 100%)",
                }}
              />
              {/* Glass-Stat — entfernt, da Info schon im Hero-KPI-Strip + Caption unten.
                   Vermied Bug "Card vor Gesicht" auf bestimmten Foto-Crops. */}
              {/* Glass-Caption unten */}
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
                  <p
                    className={`text-white/80 text-sm md:text-base mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Live aus dem Restaurant.
                  </p>
                  <p className="font-display text-base md:text-xl text-white font-bold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Tisch. Bühne. Pointe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text RIGHT */}
          <div
            className={`lg:col-span-6 flex flex-col justify-center ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Was ich mache.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(1.875rem,3.75vw,3.25rem)] text-foreground">
              Magie, die sich in euren Abend{" "}
              <span style={{ color: ACCENT }}>
                einfügt
              </span>
              .
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-[1.7] text-foreground/65">
              <p>
                Ich bin Zauberkünstler aus Bayern und arbeite seit 2016
                bundesweit — also zehn Jahre. Aufgewachsen am Pass eines
                bayerischen Gasthauses, kenne ich Service-Takt und
                Abendregie aus erster Hand — und baue Magie dort ein, wo
                sie wirklich Wirkung hat.
              </p>
              <p>
                Drei Formate, drei Wege: eine <strong>Bühnenshow</strong> für
                alle gleichzeitig, <strong>Close-Up</strong> direkt am Tisch
                und in den Händen eurer Gäste, oder das <strong>Magic
                Dinner</strong> als durchkomponierter Abend mit Walk-Around,
                Tisch-zu-Tisch und Bühnen-Finale.
              </p>
              <p>
                Comedy gehört für mich dazu, nicht als Beilage — Lacher und
                Staunen passieren am selben Tisch, manchmal in derselben Sekunde.
                Drei TV-Finalrunden, ein Kreativpreis und über zweihundert
                Events bestätigen: das funktioniert.
              </p>
            </div>

            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-foreground/12">
              {[
                { num: "10 J.", sub: "Bühnen-Erfahrung", accent: false },
                { num: "3", sub: "TV-Stationen", accent: true },
                { num: "5,0 ★", sub: "30+ Bewertungen", accent: false },
              ].map((s) => (
                <div key={s.sub}>
                  <p
                    className="font-display font-black text-foreground text-2xl md:text-[2rem] tabular-nums leading-none"
                    style={s.accent ? { color: ACCENT } : undefined}
                  >
                    {s.num}
                  </p>
                  <p
                    className={`text-foreground/55 text-xs md:text-sm mt-2 leading-tight`}
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
   3 · FORMAT-HUB — Drei Hauptformate als Tab-Selector
   ═══════════════════════════════════════════════════════════ */
const FORMATE = [
  {
    name: "Bühnenshow",
    eyebrow: "Für alle gleichzeitig",
    href: "/buehnenshow",
    img: buehneZuschauerImg,
    body: "15 bis 60 Minuten durchkomponierte Show — Anekdoten, Mentaleffekte, ein Moment auf der Bühne, der den Saal füllt. Für Galas, Firmenabende, Theater-Slots, Hochzeiten vor dem Tanz.",
    bullets: ["Theaterhafte Dramaturgie", "Auch ohne Mikro spielbar", "15–60 Min Slot"],
    accent: ACCENT,
  },
  {
    name: "Close-Up",
    eyebrow: "Direkt am Tisch und in den Händen",
    href: "/close-up",
    img: heroCloseupImg,
    body: "Karten in eurer Hand, Münzen aus dem Nichts, ein Ring der wandert. Walk-Around beim Empfang, Tisch-zu-Tisch beim Dinner — intim, persönlich, getaktet mit dem Service.",
    bullets: ["Tisch-zu-Tisch oder Walk-Around", "Ohne Technik", "Jeder Tisch eigene Routine"],
    accent: AMBER_MID,
  },
  {
    name: "Magic Dinner",
    eyebrow: "Tisch und Bühne zwischen den Gängen",
    href: "/magic-dinner",
    img: heroDinnerImg,
    body: "Mein Spezialformat: ein dramaturgisch geplanter Abend — Walk-Around beim Aperitif, Tisch-zu-Tisch zwischen den Gängen, Bühnenfinale zum Dessert. Eingebettet in den Service-Takt.",
    bullets: ["Aus einer Gastronomiefamilie", "Drei Phasen über den Abend", "Tisch + Bühne kombiniert"],
    accent: "#1f5e3f",
  },
];

const FormateSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      id="formate"
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Drei Formate, ein Künstler.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(1.875rem,3.75vw,3.25rem)] text-foreground">
              Wählt euer{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Hauptformat
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Bühne, Close-Up oder Magic Dinner — jedes Format hat seine
              eigene Dramaturgie.
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {FORMATE.map((f, i) => (
            <Link
              key={f.name}
              to={f.href}
              className="group relative overflow-hidden block h-[300px] md:h-[460px] text-white transition-transform duration-500 hover:-translate-y-1"
              style={{ borderRadius: "1.25rem" }}
            >
              <img
                src={f.img}
                alt={`${f.name} mit Emilian Leber`}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,6,12,0.18) 0%, rgba(8,6,12,0.40) 55%, rgba(8,6,12,0.82) 100%)",
                }}
              />
              <div className="absolute top-5 left-5 md:top-7 md:left-7">
                <span
                  className={`${SERIF_ITALIC} text-2xl md:text-3xl leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]`}
                  style={{ color: f.accent }}
                >
                  0{i + 1}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs md:text-sm text-white/85 mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                  {f.eyebrow}
                </p>
                <h3 className="font-display text-2xl md:text-[1.85rem] font-bold leading-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                  {f.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-bold text-white/90 group-hover:text-white">
                  Entdecken
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · TRUST STRIP — Awards
   ═══════════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  { Icon: Trophy, name: "Greatest Talent", sub: "2023 · Finalist (TV)" },
  { Icon: Award, name: "Talents of Magic", sub: "2024 · Finalist + Kreativpreis" },
  { Icon: Medal, name: "Deutsche Jugendmeisterschaft", sub: "2024 · Top 30" },
  { Icon: Tv, name: "TVA", sub: "2025 · TV-Auftritt" },
  { Icon: Star, name: "ProvenExpert", sub: "5,0 ★ · 30+ Bewertungen" },
];

const TrustStrip = () => (
  <section className="bg-white py-20 md:py-28 border-b border-foreground/10">
    <div className="container px-6">
      <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-14">
        <div className="md:col-span-7">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Bühne. TV. Wettbewerb.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3.5rem)] text-foreground">
            Bekannt aus.
          </h2>
        </div>
        <div className="md:col-span-5 md:pt-6">
          <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
            Greatest Talent, Talents of Magic, TVA. Drei TV-Stationen, zwei
            Finalrunden, ein Kreativpreis und die Deutsche Jugendmeisterschaft
            — alles in zweieinhalb Jahren.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-3 md:gap-y-0 md:gap-x-0 divide-y md:divide-y-0 md:divide-x divide-foreground/10 border-y border-foreground/10">
        {TRUST_ITEMS.map((it) => (
          <article
            key={it.name}
            className="flex items-center gap-4 md:flex-col md:items-start md:gap-0 px-1 py-5 md:px-6 md:py-7"
          >
            <it.Icon
              className="w-5 h-5 md:w-6 md:h-6 shrink-0 md:mb-4"
              style={{ color: ACCENT }}
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <p className="font-display font-bold text-foreground text-sm md:text-base leading-tight mb-0.5 md:mb-1.5">
                {it.name}
              </p>
              <p className="text-xs font-medium text-foreground/55 leading-snug">
                {it.sub}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   5 · KUNDEN-LOGOS
   ═══════════════════════════════════════════════════════════ */
const KUNDEN_LOGOS = [
  { name: "HEIM & HAUS", logo: "/logos/heim-haus.png" },
  { name: "STRABAG", logo: "/logos/strabag.png" },
  { name: "Versicherungskammer Bayern", logo: "/logos/vkb.png" },
  { name: "XXXLutz", logo: "/logos/xxxlutz.png" },
  { name: "Sixt", logo: "/logos/sixt.png" },
  { name: "Sparkasse", logo: "/logos/sparkasse.png" },
  { name: "Schneider Weisse", logo: "/logos/schneider-weisse.png" },
  { name: "Wald & Wiese", logo: "/logos/wald-wiese.png" },
  { name: "Stadt Regensburg", logo: "/logos/stadt-regensburg.png" },
  { name: "Stadt Deggendorf", logo: "/logos/stadt-deggendorf.svg" },
  { name: "Oktoberfest München", logo: "/logos/oktoberfest.png" },
  { name: "Turmtheater Regensburg", logo: "/logos/turmtheater.png" },
  { name: "Steinhofer Ingenieure", logo: "/logos/steinhofer.png" },
];

const KundenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28 border-b border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
              Wer mich gebucht hat.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3.5rem)] text-foreground">
              Kunden &{" "}
              <span style={{ color: ACCENT }}>
                Referenzen
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-6">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vom Vorstandsdinner über Galaabend bis zur Hochzeit — eine
              Auswahl der Unternehmen, Veranstalter und Locations aus über
              zweihundert Engagements.
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
                alt={`${k.name} — Referenzkunde`}
                loading="lazy"
                className="max-h-[56px] md:max-h-[72px] lg:max-h-[80px] max-w-full object-contain opacity-65 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5b · VIDEO — TVA-Auftritt
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [playing, setPlaying] = useState(false);
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className={`grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16`}>
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              TV-Auftritt · TVA 2025.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(1.875rem,3.75vw,3rem)] text-foreground">
              Sieh dir die{" "}
              <span style={{ color: ACCENT }}>
                Show im Fernsehen
              </span>{" "}
              an.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Auftritt im TVA (TV Aktuell) — drei Minuten Live-Magie aus dem
              Studio, mit Moderator-Reaktion. Ein direkter Eindruck, wie sich
              eine Show vor laufender Kamera spielt.
            </p>
          </div>
        </div>
        <div
          className={`max-w-5xl mx-auto`}
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="relative aspect-video overflow-hidden bg-foreground/5"
            style={{ borderRadius: "1.5rem", boxShadow: "0 50px 100px -30px rgba(0,0,0,0.35)" }}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=1`}
                title="TVA TV-Auftritt — Emilian Leber"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${TVA_VIDEO_ID}/maxresdefault.jpg`}
                  alt="TVA TV-Auftritt — Emilian Leber Showreel"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                    aria-label="TVA TV-Auftritt abspielen"
                  >
                    <svg className="w-9 h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white" style={{ background: "rgba(8,6,12,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  TVA · 2025
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · PULL-QUOTE — black full-bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-24 md:py-36 overflow-hidden"
    >
      <div className="relative container px-6">
        <div
          className={`max-w-3xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/45 mb-8">
            Was Magie wirklich bedeutet.
          </p>
          <p className="font-display font-bold tracking-[-0.01em] leading-[1.18] text-[clamp(1.5rem,3.2vw,2.6rem)]">
            Drei Sekunden Stille —{" "}
            <span className={SERIF_ITALIC} style={{ color: AMBER_SOFT }}>
              bevor jemand laut wird.
            </span>
          </p>
          <p className="mt-8 max-w-xl mx-auto text-sm md:text-base text-white/55 leading-[1.65]">
            Eine Karte, die euer Vorstand selbst gewählt hat. Im versiegelten
            Glas auf dem Sideboard. Diese drei Sekunden sind das Produkt —
            nicht der Trick davor.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · ANLÄSSE — 4 Anlass-Cards mit Widgets (Foto NUR auf dark cards)
   ═══════════════════════════════════════════════════════════ */
const AnlaesseSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Für jeden Anlass die passende Magie.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.25vw,3.75rem)] text-foreground">
              Vier Anlässe.{" "}
              <span style={{ color: ACCENT }}>
                Vier Pfade.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Jeder Anlass hat eine eigene Dramaturgie. Klickt euch durch zur
              jeweiligen Detail-Page — dort wartet das passende Konzept, der
              passende Quiz und die jeweiligen Reviews.
            </p>
          </div>
        </div>

        <div
          className={`space-y-4 md:space-y-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* Row 1: Hochzeit dark wide + Firmenfeier Booking-Widget */}
          <div className="grid md:grid-cols-[3fr_2fr] gap-4 md:gap-5">
            <AnlassCardDark
              name="Hochzeit"
              eyebrow="Eure Trauung."
              href="/hochzeit"
              img={heroHochzeitImg}
              body="Drei Akte über euren Tag: Sektempfang, Dinner, Show vor dem Tanz. Close-Up und Bühne — einzeln oder als roter Faden."
              tint="rose"
            />
            <FirmenfeierBookingCard />
          </div>
          {/* Row 2: Geburtstag Alter-Widget + Privat dark wide */}
          <div className="grid md:grid-cols-[2fr_3fr] gap-4 md:gap-5">
            <GeburtstagAlterCard />
            <AnlassCardDark
              name="Private Feier"
              eyebrow="Wenn's einfach besonders sein soll."
              href="/buchung"
              img={heroStageImg}
              body="Taufe, Firmung, Geschäftseröffnung, Empfang — überall wo aus einem Abend ein Moment werden soll. Format wählt ihr."
              tint="amber"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

type DarkCardProps = {
  name: string;
  eyebrow: string;
  href: string;
  img: string;
  body: string;
  tint: "rose" | "amber";
};

const AnlassCardDark = ({ name, eyebrow, href, img, body, tint }: DarkCardProps) => (
  <Link
    to={href}
    className="group relative overflow-hidden text-white transition-transform duration-500 hover:-translate-y-1 h-[220px] md:h-[380px] block"
    style={{
      borderRadius: "1.5rem",
      boxShadow:
        tint === "rose"
          ? "0 35px 70px -25px rgba(0,0,0,0.040)"
          : "0 35px 70px -25px rgba(0,0,0,0.024)",
    }}
  >
    <img
      src={img}
      alt={name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
      loading="lazy"
    />
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          tint === "rose"
            ? "linear-gradient(135deg, rgba(8,6,12,0.55) 0%, rgba(0,0,0,0.040) 70%, rgba(0,0,0,0.340) 100%)"
            : "linear-gradient(135deg, rgba(8,6,12,0.55) 0%, rgba(0,0,0,0.024) 70%, rgba(138,90,20,0.85) 100%)",
      }}
    />
    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-9 lg:p-12 max-w-xl">
      <p
        className={`hidden md:block text-base md:text-lg text-white/85 mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]`}
      >
        {eyebrow}
      </p>
      <h3 className="font-display text-[1.75rem] md:text-[2rem] lg:text-4xl font-bold leading-tight mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        {name}
      </h3>
      <p className="hidden md:block text-sm md:text-base text-white/90 leading-[1.55] max-w-md drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
        {body}
      </p>
      <span className="inline-flex items-center gap-1.5 mt-2 md:mt-5 text-[12px] tracking-[0.08em] uppercase font-bold text-white/85 group-hover:text-white">
        Mehr ansehen
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </span>
    </div>
  </Link>
);

/* ─── Firmenfeier Booking-Confirmation-Widget ─────────── */
const FirmenfeierBookingCard = () => (
  <Link
    to="/firmenfeiern"
    className="group relative overflow-hidden bg-[hsl(0,0%,98%)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.18)] flex flex-col md:h-[380px] block"
    style={{
      borderRadius: "1.5rem",
      boxShadow:
        "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
    }}
  >
    {/* Animiertes Booking-Confirmation-Mockup */}
    <div className="relative flex-[1.5] px-5 py-6 md:px-7 md:py-10 flex items-center justify-center bg-foreground/[0.03] overflow-hidden">
      <div
        className="w-full max-w-[260px] rounded-xl bg-white px-3.5 py-3 md:px-4 md:py-3.5 transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          boxShadow:
            "0 24px 50px -20px rgba(0,0,0,0.25), 0 4px 12px -4px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span
              className="relative w-1.5 h-1.5 rounded-full"
              style={{
                background: "#1f8f5f",
                boxShadow: "0 0 0 3px rgba(31,143,95,0.15)",
                animation: "fbBookingPulse 2s ease-in-out infinite",
              }}
            />
            <span className="text-[9px] tracking-[0.14em] uppercase font-bold text-foreground/65">
              Bestätigt
            </span>
          </div>
          <span className={`text-[10px] text-foreground/45`}>
            #2024-118
          </span>
        </div>
        <p className="font-display text-sm font-bold text-foreground leading-tight mb-0.5">
          Vorstandsdinner
        </p>
        <p className={`text-[11px] text-foreground/55 mb-2.5`}>
          Fr · 14. März · 19:00
        </p>
        <div className="flex items-center gap-0.5 mb-2.5">
          {["Empfang", "Vorspeise", "Hauptgang", "Finale"].map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className="w-full h-[3px] rounded-full transition-colors"
                style={{
                  background: i < 2 ? ACCENT : "rgba(0,0,0,0.08)",
                }}
              />
              <span className="text-[7px] tracking-[0.06em] uppercase text-foreground/45 font-semibold">
                {s}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-foreground/8">
          <span className="text-[10px] text-foreground/55">
            <strong className="font-display font-bold text-foreground">60</strong> Gäste
          </span>
          <span
            className="text-[9px] tracking-[0.1em] uppercase font-bold px-1.5 py-0.5 rounded"
            style={{
              color: ACCENT,
              background: "rgba(0,0,0,0.040)",
            }}
          >
            Tisch + Bühne
          </span>
        </div>
      </div>
      <style>{`
        @keyframes fbBookingPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 3px rgba(31,143,95,0.15); }
          50% { transform: scale(1.25); box-shadow: 0 0 0 6px rgba(31,143,95,0.08); }
        }
      `}</style>
    </div>
    <div className="p-5 md:p-6 flex-1 flex flex-col justify-end">
      <p className={`text-sm text-foreground/55 mb-1.5`}>
        Vorstand, Kunden, Team.
      </p>
      <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-2">
        Firmenfeier
      </h3>
      <p className="text-sm text-foreground/65 leading-[1.55] max-w-md">
        Vorstandsdinner, Kundenabend, Galaabend, Mitarbeiterfeier. Auch der
        schweigsamste Vorstand zückt nach drei Minuten Karten.
      </p>
      <span
        className="inline-flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.08em] uppercase font-bold"
        style={{ color: ACCENT }}
      >
        Mehr ansehen
        <ArrowRight className="w-3.5 h-3.5" />
      </span>
    </div>
  </Link>
);

/* ─── Geburtstag Alter-Picker-Widget ─────────────────── */
const GeburtstagAlterCard = () => {
  const [age, setAge] = useState(60);
  return (
    <Link
      to="/geburtstage"
      className="group relative overflow-hidden bg-[hsl(0,0%,98%)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_70px_-20px_rgba(0,0,0,0.18)] flex flex-col md:h-[380px] block"
      style={{
        borderRadius: "1.5rem",
        boxShadow:
          "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
      }}
    >
      <div className="relative flex-[1.5] p-4 md:p-5 flex flex-col items-center justify-center bg-foreground/[0.03] overflow-hidden gap-4 md:gap-5">
        {/* Kuchen mit Kerzen */}
        <div className="relative">
          <div
            className="relative w-28 h-16 rounded-t-lg rounded-b-md"
            style={{
              background:
                "linear-gradient(180deg, #C7D2FF 0%, #6E86FF 70%, #4D6BFF 100%)",
              boxShadow:
                "0 12px 24px -8px rgba(0,0,0,0.040), inset 0 -3px 0 rgba(0,0,0,0.040)",
            }}
          >
            <div
              aria-hidden
              className="absolute -top-1.5 left-0 right-0 h-3 rounded-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #fff 0 4px, transparent 4px 8px), #C7D2FF",
              }}
            />
            {/* Kerzen */}
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="absolute bottom-[60%]"
                style={{
                  left: `${15 + i * 22}%`,
                  width: "3px",
                  height: "14px",
                  background:
                    "linear-gradient(180deg, #C7D2FF 0%, #1D3FFF 100%)",
                  borderRadius: "1px",
                }}
              >
                <span
                  aria-hidden
                  className="absolute -top-2 left-1/2 -translate-x-1/2"
                  style={{
                    width: "5px",
                    height: "7px",
                    background:
                      "radial-gradient(circle at 50% 70%, #EEF1F6 0%, #AFC0FF 35%, transparent 75%)",
                    borderRadius: "50%",
                    animation: `fbCandleFlicker ${1.4 + i * 0.18}s ease-in-out infinite`,
                  }}
                />
              </span>
            ))}
          </div>
          <style>{`
            @keyframes fbCandleFlicker {
              0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.92; }
              50%      { transform: translateX(-50%) scale(0.9, 1.1); opacity: 1; }
            }
          `}</style>
        </div>

        {/* Alter-Picker Pills */}
        <div className="w-full max-w-[280px]">
          <p className={`text-xs text-foreground/55 mb-2 text-center`}>
            Welcher Geburtstag?
          </p>
          <div className="flex gap-1.5 justify-center">
            {[30, 40, 50, 60, 70, 80].map((a) => {
              const isActive = age === a;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setAge(a);
                  }}
                  className={`text-xs font-display font-bold px-2 py-1 rounded-full transition-all ${
                    isActive
                      ? "text-white scale-110"
                      : "text-foreground/55 hover:text-foreground"
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                          boxShadow: "0 6px 14px -4px rgba(0,0,0,0.040)",
                        }
                      : undefined
                  }
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col justify-end">
        <p className={`text-sm text-foreground/55 mb-1.5`}>
          Runde Geburtstage, Goldene Hochzeiten.
        </p>
        <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-2">
          Geburtstag · Jubiläum
        </h3>
        <p className="text-sm text-foreground/65 leading-[1.55] max-w-md">
          Anekdoten der Familie eingebaut, Tisch-zu-Tisch oder eine kleine
          Bühnenshow zwischen den Reden. Ab fünfzig Gäste sehr stark.
        </p>
        <span
          className="inline-flex items-center gap-1.5 mt-3 text-[11px] tracking-[0.08em] uppercase font-bold"
          style={{ color: ACCENT }}
        >
          Mehr ansehen
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · COMEDY-ZAUBEREI — eigene Section
   Page-eigener Twist: Comedy ist nicht 'Beilage' sondern eigenständig
   ═══════════════════════════════════════════════════════════ */
const ComedyZaubereiSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36"
      style={{
        background:
          "radial-gradient(80% 90% at 20% 20%, #fdf6ec 0%, rgba(253,246,236,0) 70%), radial-gradient(70% 80% at 80% 80%, #fbeae2 0%, rgba(251,234,226,0) 70%), #ffffff",
      }}
    >
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div
            className={`lg:col-span-6 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Comedy gehört dazu — nicht als Beilage.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(1.875rem,3.75vw,3.25rem)] text-foreground">
              Lachen und{" "}
              <span style={{ color: ACCENT }}>
                Staunen
              </span>{" "}
              am selben Tisch.
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-[1.7] text-foreground/65">
              <p>
                Ich bin Zauberkünstler mit Stand-Up-Hintergrund — Comedy ist
                nicht die Sahne obendrauf, sondern Bestandteil jeder Routine.
                Spannung, Pause, Pointe, Verblüffung — alle vier in 90 Sekunden.
              </p>
              <p>
                Ob Bühne, Tisch oder Magic Dinner: ich messe Erfolg in Lachern
                pro Minute genauso wie in Atemzügen, die aussetzen. Beides
                gleichzeitig — das ist das Format.
              </p>
            </div>

            {/* Lachzähler-Stat */}
            <div className="mt-10 inline-flex items-baseline gap-4 px-6 py-5 rounded-2xl bg-white border border-foreground/8 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.18)]">
              <span
                className="font-display font-black text-[2.5rem] md:text-[3.25rem] leading-none tabular-nums"
                style={{ color: ACCENT }}
              >
                17
              </span>
              <div>
                <p className="font-display font-bold text-foreground text-sm md:text-base leading-tight">
                  Lacher in 20 Minuten
                </p>
                <p className={`text-xs md:text-sm text-foreground/55 mt-0.5`}>
                  Durchschnitt aus 30 Bühnenshows. Eigene Notizen.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/comedy-zauberei"
                className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 15px 35px -10px rgba(0,0,0,0.040)",
                }}
              >
                Comedy-Zauberei entdecken
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT — Foto-Diptychon */}
          <div
            className={`lg:col-span-6 grid grid-cols-2 gap-3 md:gap-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="relative overflow-hidden h-[280px] md:h-[420px]"
              style={{
                borderRadius: "1rem",
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.150)",
              }}
            >
              <img
                src={heroCloseupImg}
                alt="Comedy + Zauberei — interaktiver Moment am Tisch"
                className="w-full h-full object-cover"
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
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/75 mb-1 font-semibold">
                  Tisch
                </p>
                <p className="font-display text-sm md:text-base font-bold leading-tight">
                  <Laugh className="w-4 h-4 inline mr-1" />
                  Pointe nach 3 Sekunden
                </p>
              </div>
            </div>
            <div
              className="relative overflow-hidden h-[280px] md:h-[420px] mt-8"
              style={{
                borderRadius: "1rem",
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.150)",
              }}
            >
              <img
                src={buehneZuschauerImg}
                alt="Comedy + Zauberei — Bühnenshow vor lachendem Publikum"
                className="w-full h-full object-cover"
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
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/75 mb-1 font-semibold">
                  Bühne
                </p>
                <p className="font-display text-sm md:text-base font-bold leading-tight">
                  <Smile className="w-4 h-4 inline mr-1" />
                  Lacher pro Minute
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
   9 · QUIZ — Page-optimized Custom Quiz mit Confetti
   ═══════════════════════════════════════════════════════════ */
const indexQuizConfig: CustomQuizConfig = {
  anlass: "Allgemein",
  sectionEyebrow: "Format-Finder",
  sectionTitle: (
    <>
      Welches Format passt zu{" "}
      <span style={{ color: ACCENT }}>
        eurem Event
      </span>
      ?
    </>
  ),
  sectionDesc:
    "Drei Fragen, eine konkrete Empfehlung — Bühne, Close-Up, Magic Dinner oder Comedy-Combo. Eure Antworten kommen direkt mit, falls ihr danach anfragt.",
  questions: [
    {
      id: "anlass",
      eyebrow: "Frage 01 · Anlass",
      title: <>Was ist der Anlass?</>,
      hint: "Jeder Anlass hat eine andere Stimmung und andere Formate.",
      feedback: "Klingt nach einem besonderen Abend.",
      cols: 4,
      options: [
        { value: "hochzeit", label: "Hochzeit", sub: "Trauung · Dinner · Tanz" },
        { value: "firmenfeier", label: "Firmenfeier", sub: "Vorstand · Kunden · Team" },
        { value: "geburtstag", label: "Geburtstag · Jubiläum", sub: "Runder Geburtstag, Goldene Hochzeit" },
        { value: "privat", label: "Privater Anlass", sub: "Taufe · Empfang · kleine Feier" },
      ],
    },
    {
      id: "format",
      eyebrow: "Frage 02 · Format",
      title: <>Welches Format stellt ihr euch vor?</>,
      hint: "Bühne für alle gleichzeitig oder intim am Tisch — beides geht.",
      feedback: "Gute Wahl.",
      cols: 3,
      options: [
        { value: "buehne", label: "Bühnenshow", sub: "15–60 Min Show für alle Gäste" },
        { value: "closeup", label: "Close-Up am Tisch", sub: "Tisch-zu-Tisch oder Walk-Around" },
        { value: "kombi", label: "Beides kombiniert", sub: "Magic Dinner — Tisch + Bühne" },
      ],
    },
    {
      id: "groesse",
      eyebrow: "Frage 03 · Größe",
      title: <>Wie groß wird euer Event?</>,
      hint: "Damit ich Format und Dauer passend empfehlen kann.",
      feedback: "Passt zur Größe.",
      cols: 3,
      options: [
        { value: "klein", label: "bis 40 Gäste", sub: "Intime Runde" },
        { value: "mittel", label: "40 – 120 Gäste", sub: "Klassische Feier" },
        { value: "gross", label: "120+ Gäste", sub: "Große Veranstaltung" },
      ],
    },
  ],
  recommend: (a) => {
    const { anlass, format } = a;
    if (anlass === "hochzeit") {
      return {
        format: "Hochzeit — Drei Akte Magie",
        sub: "Sektempfang · Dinner · Bühne vor dem Tanz",
        why: "Auf der Hochzeit-Page findet ihr den vollständigen Drei-Akte-Plan, einen Hochzeits-spezifischen Quiz und den Vertrauens-Vertrag rund um Trauringe und Briefings.",
        link: "/hochzeit",
      };
    }
    if (anlass === "firmenfeier") {
      return {
        format: "Firmenfeier — Vorstand bis Team",
        sub: "Vorstandsdinner · Kundenabend · Mitarbeiterfeier",
        why: "Die Firmenfeiern-Page zeigt B2B-Fälle, Industries-Logos und ROI-Argumente. Beide Formate (Tisch + Bühne) inklusive.",
        link: "/firmenfeiern",
      };
    }
    if (anlass === "geburtstag") {
      return {
        format: "Geburtstag — persönliche Magie",
        sub: "Anekdoten der Familie eingebaut",
        why: "Auf der Geburtstage-Page wartet ein Generator nach Alter und ein Memory-Lane-Element für eingebaute Geschichten.",
        link: "/geburtstage",
      };
    }
    if (format === "buehne") {
      return {
        format: "Bühnenshow",
        sub: "15–60 Min Show für alle Gäste",
        why: "Durchkomponierte Bühnenshow mit Drama-Kurve. Auf der Bühnenshow-Page findet ihr alle Details und einen Tech-Rider.",
        link: "/buehnenshow",
      };
    }
    if (format === "closeup") {
      return {
        format: "Close-Up am Tisch",
        sub: "Tisch-zu-Tisch oder Walk-Around",
        why: "Karten in der Hand, Münzen, Mentalmagie. Auf der Close-Up-Page findet ihr die Hollywood-Sequenz eines Tricks Frame für Frame.",
        link: "/close-up",
      };
    }
    return {
      format: "Magic Dinner — Tisch + Bühne",
      sub: "Walk-Around · Tisch-zu-Tisch · Bühnen-Finale",
      why: "Das Spezialformat: ein dramaturgisch geplanter Abend von Aperitif bis Dessert. Aus einer Gastronomiefamilie, eingebettet in den Service.",
      link: "/magic-dinner",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "klein" ? 30 : a.groesse === "mittel" ? 80 : a.groesse === "gross" ? 150 : null,
};

/* ═══════════════════════════════════════════════════════════
   10 · STIMMEN
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
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Was Gastgeber sagen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.25vw,3.75rem)] text-foreground">
            5,0 Sterne.
            <br />
            <span>30+ Bewertungen.</span>
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
   11 · ÜBER MICH kompakt
   ═══════════════════════════════════════════════════════════ */
const UeberMichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div
            className={`lg:col-span-5 relative ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <div
              className="relative overflow-hidden h-[420px] md:h-[520px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(0,0,0,0.200), 0 15px 35px -15px rgba(0,0,0,0.100)",
              }}
            >
              <img
                src={portraitImg}
                alt="Zauberkünstler Emilian Leber — Portrait"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(8,6,12,0.7) 100%)",
                }}
              />
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
                  <p
                    className={`text-white/80 text-sm mb-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Emilian Leber
                  </p>
                  <p className="font-display text-base font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Zauberkünstler · Bayern
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`lg:col-span-7 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Wer das macht.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(1.875rem,3.75vw,3rem)] text-foreground">
              Magie seit{" "}
              <span style={{ color: ACCENT }}>
                zehn Jahren
              </span>
              .
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-[1.7] text-foreground/65">
              <p>
                Aufgewachsen am Pass eines bayerischen Gasthauses, mit acht
                ersten Tricks aus dem Bücherregal, mit zwölf erste bezahlte
                Auftritte. Heute hauptberuflich Zauberkünstler — mit zwei
                TV-Finalrunden, einem Kreativpreis und über zweihundert Events.
              </p>
              <p>
                Bühne und Close-Up gleichermaßen — meine Spezialität ist es,
                Magie nahtlos in den Abend einzubetten, statt sie aufzusetzen.
                Aus der Gastronomie weiß ich, wie Service tickt und wann der
                richtige Moment für die nächste Pointe ist.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "10 Jahre Zauberei",
                "200+ Events",
                "Bayern · DE",
                "TV: TVA, Greatest Talent",
                "Talents of Magic Finalist 2024",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.04] border border-foreground/8 text-sm text-foreground/75"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/ueber-mich"
                className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 15px 35px -10px rgba(0,0,0,0.040)",
                }}
              >
                Mehr über Emilian
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   12 · ZAHLEN INLINE
   ═══════════════════════════════════════════════════════════ */
const ZahlenInlineSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { num: "200+", label: "Events gesamt" },
    { num: "100+", label: "Hochzeiten" },
    { num: "5,0 ★", label: "30+ Bewertungen" },
    { num: "24 h", label: "Antwortzeit" },
    { num: "10 J.", label: "Erfahrung" },
  ];
  return (
    <section
      ref={ref}
      className="bg-white py-14 md:py-16 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`flex flex-wrap items-baseline justify-center gap-x-10 gap-y-5 md:gap-x-14 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="font-display text-2xl md:text-3xl font-black text-foreground tabular-nums">
                {s.num}
              </span>
              <span className={`text-base md:text-lg text-foreground/55`}>
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
   13 · FAQ — Top-5 kompakt
   ═══════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "Was kostet ein Auftritt?",
    a: "Pakete starten ab 395 €. Endgültiger Preis hängt von Format, Dauer und Anreise ab. Nach der Anfrage bekommt ihr ein verbindliches Angebot ohne versteckte Kosten.",
  },
  {
    q: "Wie weit im Voraus buchen?",
    a: "Ideal sechs bis zwölf Monate. Wochenenden Mai–September und Dezember sind am gefragtesten. Kurzfristig immer trotzdem fragen — manchmal geht's noch.",
  },
  {
    q: "Bühne oder Close-Up — was passt zu uns?",
    a: "Beides ist möglich, beides funktioniert. Bei 25–80 Gästen oft Tisch-zu-Tisch besser, ab 60 Gästen lohnt sich ein Bühnen-Finale zusätzlich. Der Quiz auf dieser Seite empfiehlt euch das passende.",
  },
  {
    q: "Wo bist du buchbar?",
    a: "Bayern primär, deutschlandweit. Von München, Augsburg, Regensburg und Nürnberg bis Berlin, Hamburg, Frankfurt, Köln und Stuttgart. Anreise nach Aufwand.",
  },
  {
    q: "Was, wenn unsere Gäste sehr seriös sind?",
    a: "Genau die haben oft am meisten Spaß. Vorstandsvorsitzende, Anwälte, Großeltern — alle staunen, sobald die erste Karte verschwindet.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-16">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Häufige Fragen.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.25vw,3.75rem)] text-foreground">
              Was meistens
              <br />
              <span>gefragt wird.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8 self-end">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md mb-5">
              Fünf Fragen reichen meistens. Die vollständige FAQ-Sammlung mit
              Sortierung nach Thema findet ihr auf der FAQ-Page.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase border-b-2 pb-1 transition-colors"
              style={{ color: ACCENT, borderColor: ACCENT }}
            >
              Alle FAQs ansehen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
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
   14 · FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
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
          className={`max-w-3xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Plant euren Abend.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(1.75rem,3.25vw,2.625rem)]">
            Magie für{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              euren Anlass
            </span>
            .
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort und Gästezahl — Antwort innerhalb 24
            Stunden, persönlich, mit einem Konzept-Vorschlag für euren Abend.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90"
            >
              Jetzt anfragen
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
const SITE_URL = "https://www.magicel.de/";

const Index = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Zauberer Regensburg — Emilian Leber · Bühne, Close-Up & Magic Dinner
      </title>
      <meta
        name="description"
        content="Zauberer aus Regensburg, deutschlandweit buchbar — Bühnenshow, Close-Up am Tisch und Magic Dinner zwischen den Gängen. Über 200 Events, 5,0★ bei 30+ Bewertungen. Hochzeit, Firmenfeier, Geburtstag, Gala."
      />
      <meta
        name="keywords"
        content="Zauberer Bayern, Zauberkünstler München, Bühnenshow Magier, Close-Up Magier, Magic Dinner, Hochzeitszauberer, Firmenfeier Zauberer, Geburtstag Magier, Comedy Zauberer, Emilian Leber"
      />
      <meta name="author" content="Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="MagicEL — Emilian Leber" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="Zauberer Regensburg — Emilian Leber · Bühne, Close-Up & Magic Dinner"
      />
      <meta
        property="og:description"
        content="Bühnenshow, Close-Up und Magic Dinner — Zauberer aus Regensburg, deutschlandweit. 200+ Events, 5,0★."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(webSiteSchema())}</script>
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee
          eyebrow="200+ Events. Auftritte für."
          variant="cream"
          compact
        />
        <KonzeptIntroSection />
        <FormateSection />
        <TrustStrip />
        <KundenSection />
        <VideoSection />
        <PullQuoteSection />
        <AnlaesseSection />
        <ComedyZaubereiSection />
        <CustomQuizSection config={indexQuizConfig} />
        <StimmenSection />
        <UeberMichSection />
        <ZahlenInlineSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Index;
