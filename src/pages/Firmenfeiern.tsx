import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import {
  CustomQuizSection,
  CustomQuizConfig,
} from "@/components/landing/CustomQuiz";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Trophy,
  Award,
  Medal,
  Tv,
  Briefcase,
  Wine,
  Users,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Handshake,
} from "lucide-react";

import heroFirmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import buehneShowImg from "@/assets/hero-magic.jpg";
import emotionenImg from "@/assets/emotionen.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const AMBER_MID = "#c79042";
const AMBER_SOFT = "#f0d8a8";

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
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); }
      50%      { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.55)); }
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

const HEADLINE_SANS = ["Wenn", "der", "Vorstand"];
const HEADLINE_ITALIC = ["Karten", "zückt."];

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
        <img
          src={heroFirmenfeierImg}
          alt="Firmenfeier mit Zauberkünstler Emilian Leber — Bühne und Close-Up für Vorstand, Kunden, Team"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 30%",
            filter: "saturate(0.92) contrast(1.08) brightness(0.7)",
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
              <strong className="font-semibold text-white">100+ Firmen-Engagements</strong>
            </span>
          </div>
          <p
            className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`}
            style={{ animationDelay: "0.18s" }}
          >
            Vorstand. Kunden. Team. Eines bleibt gleich.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (
              <span
                key={`s-${i}`}
                className="hero-word"
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              >
                {w}
                {i < HEADLINE_SANS.length - 1 ? " " : ""}
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
                {i < HEADLINE_ITALIC.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p
            className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade"
            style={{ animationDelay: "1.05s" }}
          >
            Bühnenshow vor der versammelten Mannschaft, Close-Up am Tisch beim
            Vorstandsdinner oder beides kombiniert — Magie, die zur Corporate
            Identity passt und in Erinnerung bleibt.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#empfehlung"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Format-Finder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/buchung?anlass=Firmenfeier"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Direkt anfragen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div
            className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]"
            style={{ animationDelay: "2.0s" }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">100+</strong>
              <span className="text-white/65">Firmen-Events</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">200+</strong>
              <span className="text-white/65">Events gesamt</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg">24 h</strong>
              <span className="text-white/65">Antwort</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">DSGVO · Versichert · Rechnung</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · VIER B2B-ANLÄSSE — Format-Selector
   ═══════════════════════════════════════════════════════════ */
const ANLAESSE = [
  {
    num: "01",
    name: "Vorstandsdinner",
    eyebrow: "Klein · Exklusiv",
    body:
      "Acht bis fünfundzwanzig Gäste, intime Tafel, persönliche Anekdoten. Ich gehe zwischen den Gängen von Person zu Person, jeder bekommt seinen eigenen Moment. Eingebettet in den Service, kein Showrummel.",
    photo: emotionenImg,
    stat: { num: "8 – 25", sub: "Gäste optimal" },
  },
  {
    num: "02",
    name: "Kundenabend · Galaabend",
    eyebrow: "Repräsentativ · Premium",
    body:
      "Sechzig bis dreihundert Gäste, festlicher Rahmen. Close-Up beim Sektempfang als Eisbrecher, dann eine kompakte Bühnenshow als Highlight des Abends. Standing Ovations als Übergabe an den Tanz.",
    photo: buehneShowImg,
    stat: { num: "60 – 300", sub: "Gäste" },
  },
  {
    num: "03",
    name: "Mitarbeiter-Weihnachtsfeier",
    eyebrow: "Locker · Verbindend",
    body:
      "Vierzig bis zweihundert Mitarbeiter, lockerer Ton. Walk-Around während der Vorspeise, Tisch-zu-Tisch zwischen den Gängen, kompakte Bühnenshow zum Dessert. Teambuilding-Effekt nebenbei.",
    photo: audienceImg,
    stat: { num: "40 – 200", sub: "Mitarbeiter" },
  },
  {
    num: "04",
    name: "Messe · Incentive · Tagung",
    eyebrow: "Aktivierung · Show",
    body:
      "Walk-Around am Messestand, Aktivierungs-Bühne im Plenum, abendliche Incentive-Show. Auch geeignet als Conference-Energizer zwischen den Vorträgen — schaltet selbst die müdeste Tagung wieder ein.",
    photo: buehneZuschauerImg,
    stat: { num: "5 – 45", sub: "Min Slot" },
  },
];

const AnlaesseSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Vier B2B-Settings.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Vorstand. Kunden.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Team.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Jeder Anlass hat eine eigene Dramaturgie und Tonalität. Klickt
              euch durch die vier Settings, danach geht es weiter mit
              passender Format-Empfehlung im Quiz unten.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="lg:col-span-5 space-y-3">
            {ANLAESSE.map((a, i) => {
              const isActive = active === i;
              return (
                <button
                  key={a.name}
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
                      {a.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-[11px] tracking-[0.14em] uppercase font-semibold mb-1.5 transition-colors duration-500 ${
                          isActive ? "text-foreground/70" : "text-foreground/40"
                        }`}
                      >
                        {a.eyebrow}
                      </p>
                      <h3
                        className={`font-display text-xl md:text-2xl font-bold leading-tight transition-colors duration-500 ${
                          isActive ? "text-foreground" : "text-foreground/55"
                        }`}
                      >
                        {a.name}
                      </h3>
                      <div
                        className="overflow-hidden transition-all duration-500 ease-out"
                        style={{
                          maxHeight: isActive ? "300px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p className="mt-4 text-base text-foreground/65 leading-[1.65]">
                          {a.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div
              className="relative overflow-hidden h-[420px] md:h-[520px] lg:h-[600px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.5), 0 15px 35px -15px rgba(40,20,10,0.25)",
              }}
            >
              {ANLAESSE.map((a, i) => (
                <img
                  key={a.name}
                  src={a.photo}
                  alt={`${a.name} mit Emilian Leber`}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                  loading="lazy"
                />
              ))}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,6,12,0.78) 100%)",
                }}
              />
              <div className="absolute top-5 right-5 md:top-7 md:right-7">
                <div
                  className="relative rounded-2xl px-4 py-3 md:px-5 md:py-4 overflow-hidden transition-all duration-500"
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
                  <p
                    className={`${SERIF_ITALIC} text-[11px] md:text-xs text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    {ANLAESSE[active].eyebrow.split(" · ")[0]}.
                  </p>
                  <p className="font-display text-xl md:text-2xl font-black text-white tabular-nums leading-none mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {ANLAESSE[active].stat.num}{" "}
                    <span className="text-white/65 text-sm font-bold">
                      {ANLAESSE[active].stat.sub}
                    </span>
                  </p>
                </div>
              </div>
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
                  <p
                    className={`${SERIF_ITALIC} text-white/80 text-sm md:text-base mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Setting {String(active + 1).padStart(2, "0")}
                  </p>
                  <p className="font-display text-base md:text-lg text-white font-bold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {ANLAESSE[active].name}
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
   3 · ROI-ARGUMENT mit Mitarbeiter-Slider — eigener B2B-Twist
   ═══════════════════════════════════════════════════════════ */
const RoiSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [employees, setEmployees] = useState(120);
  const engagementBoost = Math.round(employees * 0.85);
  const referralRate = Math.round(employees * 0.42);

  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Was Magie auf einem Firmen-Event tatsächlich bewegt.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Aus Budget wird{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Erinnerung
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Standard-Entertainment ist austauschbar — der DJ war vor euch
              schon woanders. Magie am Tisch ist die einzige Show, die jeder
              Gast aus erster Hand erlebt und sich Wochen später noch merkt.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-start ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="lg:col-span-7">
            <ul className="space-y-7">
              {[
                {
                  icon: TrendingUp,
                  title: "Conversation-Starter beim Empfang.",
                  body:
                    "Die ersten zwanzig Minuten entscheiden, ob euer Event als steif oder energetisch wahrgenommen wird. Magie zwischen den Gästen löst die Spannung, bevor der erste Vortrag beginnt.",
                },
                {
                  icon: Sparkles,
                  title: "Vorstand entspannt sich messbar.",
                  body:
                    "Drei Minuten nach der ersten Karte zückt der Vorstand selbst Karten. Das ist Wahrnehmungs-Reset im Quadrat — und zahlt direkt auf Vertrauen ein.",
                },
                {
                  icon: Handshake,
                  title: "Kunden-Akquise nebenbei.",
                  body:
                    "Etwa vierzig Prozent der Gäste sprechen mich auf weitere Events an. Eure Kunden bringen euch Folge-Geschäft, weil sie sich aktiv erinnern.",
                },
                {
                  icon: ShieldCheck,
                  title: "Risikoarme Buchung.",
                  body:
                    "Versichert, DSGVO-konform, rechnungsfähig. Vorab-Abstimmung mit Eventagentur und Service, schriftliches Briefing. Keine Überraschungen am Tag X.",
                },
              ].map((it) => (
                <li key={it.title} className="grid grid-cols-[44px_1fr] md:grid-cols-[52px_1fr] gap-5 items-start">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                      border: "1px solid rgba(154,38,64,0.22)",
                    }}
                  >
                    <it.icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
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

          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div
              className="relative bg-white p-7 md:p-9 overflow-hidden"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,40,0.35), 0 15px 35px -15px rgba(40,20,40,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mb-1.5`}>
                Mini-Rechner.
              </p>
              <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-6">
                Wie viele Gäste habt ihr?
              </h3>

              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    className="font-display text-3xl md:text-4xl font-black tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    {employees}
                  </span>
                  <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>
                    Mitarbeiter / Gäste
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={10}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: ACCENT }}
                />
                <div className="flex justify-between text-[11px] text-foreground/45 mt-1">
                  <span>20</span>
                  <span>500+</span>
                </div>
              </div>

              <div className="space-y-4 pt-5 border-t border-foreground/10">
                <div className="flex items-baseline justify-between">
                  <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>
                    Aktiv beteiligte Gäste
                  </span>
                  <span className="font-display text-lg font-black text-foreground tabular-nums">
                    {engagementBoost}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>
                    Erzählen davon (∅)
                  </span>
                  <span
                    className="font-display text-lg font-black tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    {referralRate} Personen
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>
                    Empfehlung
                  </span>
                  <span className="font-display text-sm font-bold text-foreground text-right max-w-[200px]">
                    {employees < 50
                      ? "Close-Up · 45–90 Min"
                      : employees < 150
                      ? "Close-Up + Bühnen-Finale"
                      : "Bühnenshow + Walk-Around"}
                  </span>
                </div>
              </div>

              <p className={`${SERIF_ITALIC} mt-6 text-xs text-foreground/45 leading-relaxed`}>
                Schätzwerte aus über hundert Firmen-Events. Eure Zahlen
                gehen ins schriftliche Angebot ein.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · INDUSTRIES — Logo-Cloud GROSS als Hauptelement
   ═══════════════════════════════════════════════════════════ */
const INDUSTRIES_LOGOS = [
  { name: "HEIM & HAUS", logo: "/logos/heim-haus.png" },
  { name: "STRABAG", logo: "/logos/strabag.png" },
  { name: "Versicherungskammer Bayern", logo: "/logos/vkb.png" },
  { name: "XXXLutz", logo: "/logos/xxxlutz.png" },
  { name: "Sixt", logo: "/logos/sixt.png" },
  { name: "Sparkasse", logo: "/logos/sparkasse.png" },
  { name: "Schneider Weisse", logo: "/logos/schneider-weisse.png" },
  { name: "Wächter", logo: "/logos/waechter.png" },
  { name: "Stadt Regensburg", logo: "/logos/stadt-regensburg.png" },
  { name: "Steinhofer Ingenieure", logo: "/logos/steinhofer.png" },
  { name: "Business Entertainment", logo: "/logos/business-entertainment.png" },
  { name: "DPSG", logo: "/logos/dpsg.png" },
];

const IndustriesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
              Industries we serve.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Wer mich{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                gebucht hat
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Versicherung, Bau, Möbel, Banking, Brauerei, öffentliche Hand —
              Querschnitt der Branchen, die Magie auf ihren Events haben. Eine
              Auswahl aus über hundert Firmen-Engagements.
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 md:gap-x-14 gap-y-12 md:gap-y-16 items-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {INDUSTRIES_LOGOS.map((k) => (
            <div
              key={k.name}
              className="group relative flex items-center justify-center min-h-[60px] md:min-h-[80px]"
              title={k.name}
            >
              <img
                src={k.logo}
                alt={`${k.name} — Referenz-Firmenkunde`}
                loading="lazy"
                className="max-h-[56px] md:max-h-[72px] lg:max-h-[80px] max-w-full object-contain opacity-65 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 text-center mt-14 max-w-2xl mx-auto`}>
          Vollständige Referenzliste mit Ansprechpartnern auf Anfrage.
          Viele weitere Kunden bevorzugen es, nicht öffentlich genannt zu werden.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · VORSTAND-COUNTER — XL-Stat als Page-Twist
   ═══════════════════════════════════════════════════════════ */
const VorstandCounterSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-28 md:py-40 overflow-hidden"
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
          className={`max-w-5xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/55 mb-6`}>
            Eine Beobachtung aus über hundert Firmen-Events.
          </p>
          <p
            className="font-display font-black tabular-nums leading-[0.85] tracking-[-0.04em]"
            style={{
              fontSize: "clamp(5rem, 14vw, 14rem)",
              background: `linear-gradient(135deg, ${AMBER_SOFT} 0%, ${ACCENT_SOFT} 60%, ${AMBER_MID} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            3 Min.
          </p>
          <p className="font-display font-bold tracking-[-0.01em] leading-[1.15] text-[clamp(1.5rem,3.5vw,2.75rem)] mt-8 max-w-3xl mx-auto">
            Vorstand zückt nach{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              drei Minuten
            </span>{" "}
            selbst Karten.
          </p>
          <p className="mt-8 mx-auto max-w-2xl text-base md:text-lg text-white/65 leading-[1.6]">
            Das ist der typische Moment, an dem ein Firmen-Event kippt: weg
            vom steifen Smalltalk, hin zum echten Erlebnis. Wir messen das
            mittlerweile, weil es zu konstant ist, um Zufall zu sein.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · CASE-STUDY — Jan von Lehmann XL-Quote
   ═══════════════════════════════════════════════════════════ */
const CaseStudyQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-28 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`max-w-4xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-6 items-start mb-10">
            <div className="md:col-span-7">
              <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-4`}>
                Case-Study · 200 Gäste, Versicherungs-Konzern.
              </p>
              <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground">
                Eine Firmenfeier,{" "}
                <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                  ein Maßstab
                </span>
                .
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-4">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-foreground/55">
                <span className="text-sm">
                  <strong className="text-foreground font-bold">200</strong> Gäste
                </span>
                <span aria-hidden className="text-foreground/20">·</span>
                <span className="text-sm">
                  <strong className="text-foreground font-bold">3</strong> h Programm
                </span>
                <span aria-hidden className="text-foreground/20">·</span>
                <span className="text-sm">
                  <strong className="text-foreground font-bold">VKB</strong>
                </span>
              </div>
            </div>
          </div>

          <span
            aria-hidden
            className={`${SERIF_ITALIC} block leading-none mb-[-1.5rem] md:mb-[-3rem] select-none`}
            style={{
              fontSize: "clamp(6rem, 14vw, 13rem)",
              color: ACCENT,
              opacity: 0.55,
            }}
          >
            “
          </span>

          <blockquote>
            <p className="font-display font-black tracking-[-0.015em] leading-[1.1] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
              Es war einfach{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Mega
              </span>
              ! 200 Gäste eines bayerischen Versicherungsunternehmens — Emilian
              hat mit seiner eigens entwickelten Zaubertrickshow alle begeistert.
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-white text-xl"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                }}
              >
                J
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base">
                  Jan von Lehmann
                </p>
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55`}>
                  Firmenfeier · 200 Gäste · Versicherungskammer Bayern
                </p>
              </div>
              <div aria-hidden className="hidden md:block ml-4 h-8 w-px bg-foreground/15" />
              <div className="hidden md:flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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
   7 · QUIZ — B2B-spezifischer Format-Finder mit CustomQuiz
   ═══════════════════════════════════════════════════════════ */
const firmenfeiernQuizConfig: CustomQuizConfig = {
  anlass: "Firmenfeier",
  sectionEyebrow: "Format-Finder · Firmenfeier",
  sectionTitle: (
    <>
      Was passt zu eurem{" "}
      <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
        Firmenabend
      </span>
      ?
    </>
  ),
  sectionDesc:
    "Vier Fragen, ein konkretes Format. Abgestimmt auf Anlass-Typ, Gästezahl, Tonalität und Show-Slot. Eure Antworten kommen direkt mit, falls ihr danach anfragt.",
  questions: [
    {
      id: "typ",
      eyebrow: "Frage 01 · Anlass",
      title: <>Was für ein Firmen-Anlass ist es?</>,
      hint: "Davon hängt Tonalität und Format ab.",
      feedback: "Spannender Anlass.",
      cols: 4,
      options: [
        { value: "vorstand", label: "Vorstandsdinner", sub: "Klein · exklusiv · 8–25 Gäste" },
        { value: "kunde", label: "Kundenabend · Gala", sub: "Repräsentativ · 60–300 Gäste" },
        { value: "team", label: "Mitarbeiterfeier", sub: "Locker · 40–200 Gäste" },
        { value: "messe", label: "Messe · Tagung", sub: "Aktivierung · Walk-Around" },
      ],
    },
    {
      id: "groesse",
      eyebrow: "Frage 02 · Gästezahl",
      title: <>Wie viele Gäste werden es?</>,
      hint: "Ab 60 Gästen lohnt sich ein Bühnen-Finale zusätzlich zum Close-Up.",
      feedback: "Passt zur Größe.",
      cols: 4,
      options: [
        { value: "klein", label: "bis 30 Gäste", sub: "Intim · eine Tafel" },
        { value: "mittel", label: "30 – 80 Gäste", sub: "Klassischer Rahmen" },
        { value: "gross", label: "80 – 200 Gäste", sub: "Galaabend-Größe" },
        { value: "mega", label: "200+ Gäste", sub: "Großveranstaltung" },
      ],
    },
    {
      id: "ton",
      eyebrow: "Frage 03 · Tonalität",
      title: <>Welche Tonalität soll der Abend haben?</>,
      hint: "Davon hängt ab, ob ich eher zurückhaltend bleibe oder das Tempo anziehe.",
      feedback: "Verstanden.",
      cols: 3,
      options: [
        { value: "premium", label: "Premium · zurückhaltend", sub: "Repräsentativ, keine lauten Pointen" },
        { value: "warm", label: "Warm · verbindend", sub: "Persönlich, mit Anekdoten" },
        { value: "energetisch", label: "Energetisch · Show", sub: "Bühne, Lacher, Standing Ovation" },
      ],
    },
    {
      id: "format",
      eyebrow: "Frage 04 · Format",
      title: <>Bühne, Tisch oder beides?</>,
      hint: "Bei größeren Gruppen empfehle ich die Combo — das ergibt Erzählbogen über den Abend.",
      feedback: "Euer Format steht.",
      cols: 3,
      options: [
        { value: "tisch", label: "Nur Close-Up am Tisch", sub: "Walk-Around oder Tisch-zu-Tisch" },
        { value: "buehne", label: "Nur Bühnenshow", sub: "15–60 Min Show" },
        { value: "kombi", label: "Beides kombiniert", sub: "Empfehlung ab 60 Gäste" },
      ],
    },
  ],
  recommend: (a) => {
    const { typ, groesse, ton, format } = a;
    if (typ === "vorstand" || (groesse === "klein" && ton === "premium")) {
      return {
        format: "Tafel-Magie beim Vorstandsdinner",
        sub: "Tisch-zu-Tisch zwischen den Gängen · Premium-Tonalität · 90 Min",
        why: "Bei einer kleinen, exklusiven Runde wirkt jede Bühne fehl am Platz. Ich bewege mich wie ein zusätzlicher Gast zwischen den Gängen — Karten, ein Ring, eine signierte Geschichte. Persönlich, repräsentativ, ohne Show-Rummel.",
        link: "/buchung",
      };
    }
    if (format === "buehne" || (groesse === "mega" && ton === "energetisch")) {
      return {
        format: "Bühnenshow für die ganze Belegschaft",
        sub: "15–60 Min durchkomponierte Show · Mentaleffekte · Standing Ovation",
        why: "Bei großen Versammlungen ist eine Bühnenshow die Form, die alle gleichzeitig erleben. Eingebaut: ein Effekt mit Firmenbezug, ein Mentaleffekt zum Aufwachen, ein Pointe-Finale. Standing Ovation als Übergabe an Geschäftsleitung oder DJ.",
        link: "/buehnenshow",
      };
    }
    if (format === "kombi" || groesse === "gross") {
      return {
        format: "Close-Up + Bühnen-Finale",
        sub: "Walk-Around beim Empfang · Tisch-zu-Tisch · Bühnen-Show zum Abschluss",
        why: "Der Klassiker für Gala-Größe: Eisbrecher beim Empfang, intimes Programm während des Essens, Bühne als gemeinsamer Wow-Moment am Ende. Erzählbogen über den ganzen Abend — niemand wird übergangen.",
        link: "/magic-dinner",
      };
    }
    if (typ === "messe") {
      return {
        format: "Aktivierung am Messestand · Energizer",
        sub: "5–45 Min Walk-Around oder Bühnen-Energizer zwischen Vorträgen",
        why: "Auf Messen und Tagungen ist Magie das einzige Format, das müde Köpfe sofort einschaltet. Walk-Around am Stand zieht Traffic, Bühnen-Energizer reanimiert das Plenum, abendliche Incentive-Show belohnt das Team.",
        link: "/buchung",
      };
    }
    return {
      format: "Close-Up auf eurer Mitarbeiterfeier",
      sub: "Walk-Around + Tisch-zu-Tisch · 45–90 Min · lockerer Ton",
      why: "Für Team-Events ist Close-Up das passende Format: Magie an jedem Tisch, jeder Mitarbeiter erlebt seine eigene Pointe. Teambuilding nebenbei — Kollegen, die sich sonst nie sehen, haben über die Show ein Gesprächsthema.",
      link: "/close-up",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "klein" ? 20 :
    a.groesse === "mittel" ? 60 :
    a.groesse === "gross" ? 130 :
    a.groesse === "mega" ? 250 :
    null,
  typFromAnswers: (a) =>
    a.typ === "vorstand" ? "Vorstandsdinner" :
    a.typ === "kunde" ? "Kundenabend" :
    a.typ === "team" ? "Mitarbeiterfeier" :
    a.typ === "messe" ? "Messe / Tagung" :
    "Firmenfeier",
};

/* ═══════════════════════════════════════════════════════════
   8 · STIMMEN — 3 B2B-Reviews
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
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung sehr professionell. Gerne wieder!",
      author: "Martina Senftl",
      role: "B2B-Kundin",
      initial: "M",
    },
    {
      quote:
        "Mit viel Charme und Witz hat er alle Gäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass.",
      author: "Katrin Raß",
      role: "Event-Planerin",
      initial: "K",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
            Was Veranstalter sagen.
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
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
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
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                  }}
                >
                  {r.initial}
                </div>
                <div>
                  <p itemProp="author" className="font-display font-bold text-foreground text-sm">
                    {r.author}
                  </p>
                  <p className={`${SERIF_ITALIC} text-[13px] text-foreground/55 mt-0.5`}>
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
   9 · TRUST + ZAHLEN
   ═══════════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  { Icon: Trophy, name: "Greatest Talent", sub: "2023 · Finalist (TV)" },
  { Icon: Award, name: "Talents of Magic", sub: "2024 · Finalist + Kreativpreis" },
  { Icon: Medal, name: "Deutsche Jugendmeisterschaft", sub: "2024 · Top 30" },
  { Icon: Tv, name: "TVA", sub: "2025 · TV-Auftritt" },
  { Icon: Star, name: "ProvenExpert", sub: "5,0 ★ · 30+ Bewertungen" },
];

const TrustZahlenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-20 md:py-28 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
          <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-5`}>
            Falls ihr noch Sicherheit braucht.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
            Bekannt aus TV, Wettbewerb und{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              100+ Firmen-Events
            </span>
            .
          </h2>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-14 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {TRUST_ITEMS.map((it) => (
            <article
              key={it.name}
              className="group relative bg-white border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
            >
              <div
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(154,38,64,0.16), rgba(154,38,64,0.05))",
                  border: "1px solid rgba(154,38,64,0.22)",
                }}
              >
                <it.Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
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

        <div
          className={`flex flex-wrap items-baseline justify-center gap-x-10 gap-y-5 md:gap-x-16 pt-10 border-t border-foreground/10 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {[
            { num: "100+", label: "Firmen-Engagements" },
            { num: "200+", label: "Events gesamt" },
            { num: "5,0 ★", label: "30+ Bewertungen" },
            { num: "24 h", label: "Antwortzeit" },
            { num: "DSGVO", label: "+ Versicherung + Rechnung" },
          ].map((s) => (
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
   10 · FAQ
   ═══════════════════════════════════════════════════════════ */
const firmenFaqs = [
  {
    q: "Was kostet ein Firmen-Engagement?",
    a: "B2B-Pakete starten ab 495 €. Endgültiger Preis hängt von Format, Dauer, Anreise und ggf. Übernachtung ab. Nach der Anfrage bekommt ihr ein verbindliches Angebot mit Mehrwertsteuer und allen Positionen offen.",
  },
  {
    q: "Wie ist es mit Rechnungsstellung und Steuer?",
    a: "Reguläre Geschäftsrechnung mit ausgewiesener Umsatzsteuer (7 % auf Kunst-Leistungen), Zahlungsziel 14 Tage. Auf Wunsch Vorab-Rechnung möglich. Versicherungsschutz inklusive.",
  },
  {
    q: "Vorstand und Aufsichtsrat — wie ist es mit Pannensicherheit?",
    a: "Für jede Routine gibt es ein Backup-Setup. Vorab schriftliche Absprache mit Eventagentur über No-Gos (Personen, die nicht angesprochen werden sollen, Themen, die nicht aufkommen sollen). Nach 100+ Firmen-Events bisher null Pannen.",
  },
  {
    q: "Passt das zur Corporate Identity unseres Hauses?",
    a: "Programm wird auf eure Tonalität abgestimmt. Premium-Versicherung läuft anders als Tech-Startup-Weihnachtsfeier. Ich höre vorab in einem 30-Min-Call, was zu euch passt — und was definitiv nicht.",
  },
  {
    q: "Wie groß ist das Setup?",
    a: "Close-Up: nichts. Bühnenshow: ca. 2 × 1,5 m Bühnenfläche, ein Tisch hinter mir, eine Steckdose. Headset-Mikro bringe ich mit, wenn ihr keins habt. 30 Min Auf- und Abbau.",
  },
  {
    q: "Ab wann sollten wir buchen?",
    a: "Idealerweise drei bis sechs Monate vorher, vor allem Q4 (Weihnachtsfeiern) ist sehr gefragt. Kurzfristig immer trotzdem anfragen — manchmal sind noch Slots offen.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>
            Häufige Fragen aus dem B2B-Bereich.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was Event-Planerinnen
            <br />
            <span className={SERIF_ITALIC}>vorher fragen.</span>
          </h2>
        </div>

        <div
          className={`max-w-3xl border-t border-foreground/15 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {firmenFaqs.map((faq) => (
            <details key={faq.q} className="group py-6 md:py-7 border-b border-foreground/15">
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
   11 · FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" loading="lazy" />
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
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.55), transparent 60%)",
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
            Magie für{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              eure Firma
            </span>
            .
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort und Gästezahl — Antwort innerhalb 24
            Stunden mit einem Konzept-Vorschlag für euren Firmen-Abend.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung?anlass=Firmenfeier"
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
          <p className="mt-6 text-xs md:text-sm text-white/45">
            Geschäftsrechnung · Versichert · DSGVO-konform
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/firmenfeiern";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Zauberer für Firmenfeier — Vorstand, Kunden, Team",
  name: "Zauberer für Firmenfeiern mit Emilian Leber",
  description:
    "Zauberer für Firmenfeiern in Bayern und deutschlandweit — Vorstandsdinner, Kundenabend, Galaabend, Mitarbeiterfeier. Bühnenshow und Close-Up. 100+ Firmen-Engagements, 5,0 Sterne.",
  provider: {
    "@type": "Person",
    name: "Emilian Leber",
    jobTitle: "Zauberkünstler",
    url: "https://www.magicel.de",
    image: "https://www.magicel.de/og-image.jpg",
    address: { "@type": "PostalAddress", addressCountry: "DE", addressRegion: "Bayern" },
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
  mainEntity: firmenFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const Firmenfeiern = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Zauberer für Firmenfeier — Vorstand, Kunden, Team | Emilian Leber
      </title>
      <meta
        name="description"
        content="Zauberkünstler für Firmenfeiern in Bayern und deutschlandweit — Vorstandsdinner, Kundenabend, Galaabend, Mitarbeiterfeier. Bühnenshow und Close-Up, einzeln oder kombiniert. 100+ Firmen-Engagements, 5,0★."
      />
      <meta
        name="keywords"
        content="Zauberer Firmenfeier, Zauberkünstler Firmenevent, Magier Vorstandsdinner, Close-Up Kundenabend, Bühnenshow Firmenfeier, Weihnachtsfeier Magier, Galaabend Zauberer, Messe Zauberer, Emilian Leber"
      />
      <meta name="author" content="Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:site_name" content="MagicEL — Emilian Leber" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Zauberer für Firmenfeier — Vorstand, Kunden, Team | Emilian Leber" />
      <meta
        property="og:description"
        content="Bühnenshow und Close-Up für Firmenfeiern, einzeln oder kombiniert. 100+ Firmen-Engagements, 5,0★."
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

      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <AnlaesseSection />
        <RoiSection />
        <IndustriesSection />
        <VorstandCounterSection />
        <CaseStudyQuoteSection />
        <CustomQuizSection config={firmenfeiernQuizConfig} />
        <StimmenSection />
        <TrustZahlenSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Firmenfeiern;
