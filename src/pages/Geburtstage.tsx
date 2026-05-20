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
  Cake,
  Music2,
  Gift,
  Flame,
} from "lucide-react";

import heroBirthdayImg from "@/assets/hero-geburtstag-stock.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import staunenImg from "@/assets/staunen.jpg";
import buehneShowImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";

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
      50%      { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.12)); }
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

const HEADLINE_SANS = ["Geburtstag", "mit"];
const HEADLINE_ITALIC = ["Magie", "&", "Pointe."];

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
          src={heroBirthdayImg}
          alt="Zauberkünstler Emilian Leber beim Geburtstag — Magie für runde Geburtstage und Jubiläen"
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
              "radial-gradient(circle, rgba(199,144,66,0.1) 0%, rgba(199,144,66,0) 70%)",
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
      <div className="relative z-10 min-h-screen container px-6 flex flex-col justify-between pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300 hero-star" style={{ animationDelay: `${i * 0.12}s` }} />
                ))}
              </div>
              <span className="text-sm text-white/85">
                <strong className="font-semibold text-white">5,0</strong>
                <span className="text-white/60"> · 30+ Bewertungen</span>
              </span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span className="text-sm text-white/80">
              <strong className="font-semibold text-white">80+ Geburtstage</strong> begleitet
            </span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Anekdoten der Familie. Magie als Geschenk.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (
              <span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                {w}
                {" "}
              </span>
            ))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (
              <span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>
                {w}
                {" "}
              </span>
            ))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Runder Geburtstag, Goldene Hochzeit, Jubiläum — Close-Up am
            Geburtstagstisch, kompakte Bühnenshow zwischen den Reden, oder
            beides. Mit eingebauten Anekdoten aus eurem Leben.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <a
              href="#empfehlung"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Format-Finder
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/buchung?anlass=Geburtstag"
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
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">80+</strong>
              <span className="text-white/65">Geburtstage</span>
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
            <span className="text-white/65">Bayern · deutschlandweit</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · GEBURTSTAGS-GENERATOR — page-eigener Twist
   User wählt Alter, bekommt persönliche Format-Empfehlung
   ═══════════════════════════════════════════════════════════ */
const AGE_PROGRAMS = {
  30: {
    label: "30er & 40er",
    body:
      "Freunde-Fokus, viel Tempo, Comedy-Anteil hoch. Walk-Around beim Empfang, dann eine kompakte Bühnen-Highlight-Show vor dem Tanz. Foto-fähige Momente eingebaut.",
    fokus: "Comedy · Bühnen-Highlight",
    photo: closeupImg,
  },
  50: {
    label: "50er",
    body:
      "Mischung aus Familie und Freunden. Tisch-zu-Tisch zwischen den Gängen ist hier oft optimal — jeder Tisch bekommt seine eigene kleine Mini-Show. Bühne optional zum Geburtstagslied.",
    fokus: "Tisch-zu-Tisch · Bühnen-Slot",
    photo: emotionenImg,
  },
  60: {
    label: "60er & 70er",
    body:
      "Familien-Fokus, mehrere Generationen am Tisch. Persönliche Anekdoten aus dem Leben des Geburtstagskindes eingebaut, Mentaleffekte mit Familien-Bezug, Schul-Erinnerungen als Pointe.",
    fokus: "Anekdoten · Familien-Magie",
    photo: staunenImg,
  },
  70: {
    label: "70er & 80er",
    body:
      "Würdige Tafelmagie zwischen den Gängen, lauter als Vortrag aber leiser als Standing-Ovation-Show. Kinder + Enkelkinder bekommen Mini-Tricks, die sie selbst nachmachen können.",
    fokus: "Würdige Tafelmagie",
    photo: haendeImg,
  },
  80: {
    label: "80er & Goldene Hochzeit",
    body:
      "Ruhige, emotionale Magie. Eine signierte Karte als Erinnerungs-Geschenk, ein Trick mit dem Trauring oder einer alten Familienanekdote. Mehr Wunder als Show.",
    fokus: "Erinnerungs-Magie",
    photo: audienceImg,
  },
} as const;

const AgeGeneratorSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [age, setAge] = useState<keyof typeof AGE_PROGRAMS>(60);
  const program = AGE_PROGRAMS[age];

  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Jedes Jahrzehnt feiert anders.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Wählt das{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Jahrzehnt
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Ein 30er feiert anders als eine Goldene Hochzeit. Klickt euch
              durch die Alters-Gruppen und seht, was dort jeweils funktioniert.
            </p>
          </div>
        </div>

        <div className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-start ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* LEFT — Age Picker */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap gap-2 mb-8">
              {(Object.keys(AGE_PROGRAMS) as unknown as number[]).map((a) => {
                const key = Number(a) as keyof typeof AGE_PROGRAMS;
                const isActive = age === key;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAge(key)}
                    onMouseEnter={() => setAge(key)}
                    className={`group relative font-display font-bold tabular-nums transition-all ${
                      isActive ? "text-white scale-110" : "text-foreground/55 hover:text-foreground"
                    }`}
                    style={
                      isActive
                        ? {
                            padding: "12px 24px",
                            borderRadius: "9999px",
                            background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                            boxShadow: "0 14px 30px -8px rgba(154,38,64,0.5)",
                            fontSize: "1.125rem",
                          }
                        : {
                            padding: "10px 20px",
                            borderRadius: "9999px",
                            background: "rgba(0,0,0,0.04)",
                            border: "1px solid rgba(0,0,0,0.08)",
                            fontSize: "1rem",
                          }
                    }
                  >
                    {AGE_PROGRAMS[key].label}
                  </button>
                );
              })}
            </div>

            <p
              className={`${SERIF_ITALIC} text-[11px] tracking-[0.18em] uppercase font-semibold mb-3`}
              style={{ color: ACCENT }}
            >
              {program.fokus}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-5">
              {program.label}
            </h3>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-xl mb-7">
              {program.body}
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Anekdoten eingebaut",
                "Familien-Routine",
                "Foto-fähige Momente",
                "Service-Takt",
              ].map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/8 text-xs text-foreground/65"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div
              className="relative overflow-hidden h-[420px] md:h-[520px] lg:h-[600px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.5), 0 15px 35px -15px rgba(40,20,10,0.25)",
              }}
            >
              {(Object.keys(AGE_PROGRAMS) as unknown as number[]).map((a) => {
                const key = Number(a) as keyof typeof AGE_PROGRAMS;
                return (
                  <img
                    key={a}
                    src={AGE_PROGRAMS[key].photo}
                    alt={`Geburtstagszauberei für ${AGE_PROGRAMS[key].label}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out"
                    style={{ opacity: age === key ? 1 : 0 }}
                    loading="lazy"
                  />
                );
              })}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,6,12,0.78) 100%)",
                }}
              />
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
                  <p className={`${SERIF_ITALIC} text-white/80 text-sm md:text-base mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}>
                    Alters-Programm
                  </p>
                  <p className="font-display text-base md:text-lg text-white font-bold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {program.label} · {program.fokus}
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
   3 · MEMORY-LANE — Anekdoten-Einbau (page-eigener Twist)
   ═══════════════════════════════════════════════════════════ */
const MemoryLaneSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const examples = [
    {
      input: "Papa hat in der Lehre einen Lottoschein verloren — Gewinn nie eingelöst.",
      output:
        "→ Spätestens zum Hauptgang taucht ein 'verschollener' Lottoschein in seiner Brieftasche auf — mit den richtigen Zahlen vom besagten Jahr.",
    },
    {
      input: "Oma hat als Kind eine bestimmte Kette geerbt — heute nicht mehr da.",
      output:
        "→ Eine signierte Karte mit dem Detail der Kette taucht im Marmeladenglas auf, das den ganzen Abend sichtbar auf dem Tisch stand.",
    },
    {
      input: "Der Trauzeuge hat das Schnapsglas vom Polterabend behalten.",
      output:
        "→ Ich nehme das exakte Glas mit in eine Routine — die ganze Tafel begreift es erst beim dritten Blick.",
    },
  ];

  return (
    <section
      ref={ref}
      className="bg-[hsl(30,8%,98.5%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Anekdoten-Einbau.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Aus eurer Geschichte wird{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                ein Trick
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Ihr schickt mir vor dem Geburtstag drei bis fünf echte Anekdoten
              — daraus baue ich Mini-Routinen. Nur ihr und eure Familie
              versteht den Witz. Beispiele:
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {examples.map((ex, i) => (
            <article
              key={i}
              className="relative bg-white p-7 md:p-8 flex flex-col h-full"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 25px 50px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <span
                className={`${SERIF_ITALIC} text-2xl mb-4`}
                style={{ color: ACCENT }}
              >
                0{i + 1}
              </span>
              <p className="text-sm md:text-base text-foreground/80 leading-[1.6] italic mb-5">
                „{ex.input}"
              </p>
              <div
                className="rounded-xl p-4 mt-auto"
                style={{
                  background: "linear-gradient(135deg, rgba(154,38,64,0.06), rgba(154,38,64,0.02))",
                  border: "1px solid rgba(154,38,64,0.18)",
                }}
              >
                <p
                  className={`${SERIF_ITALIC} text-[11px] tracking-[0.16em] uppercase font-semibold mb-2`}
                  style={{ color: ACCENT }}
                >
                  Mini-Routine
                </p>
                <p className="text-sm text-foreground/80 leading-[1.55]">
                  {ex.output}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className={`${SERIF_ITALIC} text-center text-base md:text-lg text-foreground/55 mt-14 max-w-2xl mx-auto`}>
          Eure Familie versteht den Witz. Alle anderen staunen — und fragen
          sich, woher der Typ das wissen kann.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · PULL-QUOTE — schwarz, Familien-Moment
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-black text-white py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-8"
        style={{
          background: "radial-gradient(circle, rgba(154,38,64,0.13), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-6"
        style={{
          background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div className={`max-w-4xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/55 mb-8">
            Aus einem Briefing-Call.
          </p>
          <p className="font-display font-bold tracking-[-0.01em] leading-[1.15] text-[clamp(1.75rem,4vw,3.5rem)]">
            Mutter hat geweint.{" "}
            <span className={`${SERIF_ITALIC}`} style={{ color: ACCENT_SOFT }}>
              Mehr Erfolg geht nicht.
            </span>
          </p>
          <p className="mt-10 text-sm md:text-base text-white/45">
            Originalzitat einer Tochter nach dem 60. Geburtstag des Papas, Niederbayern.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · QUIZ — Geburtstags-Format-Finder
   ═══════════════════════════════════════════════════════════ */
const geburtstagQuizConfig: CustomQuizConfig = {
  anlass: "Geburtstag",
  sectionEyebrow: "Format-Finder · Geburtstag",
  sectionTitle: (
    <>
      Findet euer{" "}
      <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
        Geburtstags-Format
      </span>
      .
    </>
  ),
  sectionDesc:
    "Vier Fragen, eine konkrete Empfehlung — abgestimmt auf Alter, Gästezahl, Stimmung und Familien-Mix.",
  questions: [
    {
      id: "alter",
      eyebrow: "Frage 01 · Alter",
      title: <>Welcher Geburtstag wird gefeiert?</>,
      hint: "Davon hängt Tonalität und Format ab.",
      feedback: "Glückwunsch im Voraus.",
      cols: 4,
      options: [
        { value: "30-40", label: "30 – 40", sub: "Freunde-Fokus, viel Tempo" },
        { value: "50-60", label: "50 – 60", sub: "Familie + Freunde gemischt" },
        { value: "70-80", label: "70 – 80", sub: "Familien-Fokus, mehrere Generationen" },
        { value: "gold", label: "Goldene Hochzeit", sub: "Jubiläum · 50+ Jahre" },
      ],
    },
    {
      id: "groesse",
      eyebrow: "Frage 02 · Gästezahl",
      title: <>Wie groß wird die Feier?</>,
      hint: "Ab 50 Gästen lohnt sich ein Bühnen-Slot zusätzlich zum Close-Up.",
      feedback: "Passt zur Größe.",
      cols: 3,
      options: [
        { value: "klein", label: "bis 25 Gäste", sub: "Engster Kreis" },
        { value: "mittel", label: "25 – 80 Gäste", sub: "Klassische Feier" },
        { value: "gross", label: "80+ Gäste", sub: "Große Familienfeier" },
      ],
    },
    {
      id: "stil",
      eyebrow: "Frage 03 · Stil",
      title: <>Welcher Stil passt zum Geburtstagskind?</>,
      hint: "Ruhige oder energetische Tonalität — beides funktioniert.",
      feedback: "Klingt nach einem schönen Abend.",
      cols: 3,
      options: [
        { value: "ruhig", label: "Ruhig · emotional", sub: "Stille Wunder, eingebaute Anekdoten" },
        { value: "lustig", label: "Lustig · viel Lachen", sub: "Comedy-Anteil hoch, Pointen" },
        { value: "show", label: "Show · Wow-Moment", sub: "Bühnen-Highlight für alle" },
      ],
    },
    {
      id: "anekdoten",
      eyebrow: "Frage 04 · Anekdoten",
      title: <>Soll ich Familien-Anekdoten einbauen?</>,
      hint: "Memory-Lane-Effekt — ihr schickt mir vorher 3–5 echte Stories, daraus werden Mini-Tricks.",
      feedback: "Wir machen das persönlich.",
      cols: 2,
      options: [
        { value: "ja", label: "Ja, gern persönlich", sub: "Wir liefern Anekdoten vor dem Tag" },
        { value: "nein", label: "Nein, lieber neutral", sub: "Klassische Routinen ohne Insider" },
      ],
    },
  ],
  recommend: (a) => {
    const { alter, groesse, stil, anekdoten } = a;
    if (alter === "gold" || stil === "ruhig") {
      return {
        format: "Erinnerungs-Magie zum Jubiläum",
        sub: "Stille Wunder · eingebaute Familienanekdoten · ohne Bühne",
        why: "Bei Goldenen Hochzeiten oder ruhigen Geburtstagen funktioniert intime Magie am besten — eine signierte Karte als Erinnerungs-Geschenk, ein Trick mit Trauring oder Familienfoto. Mehr Wunder als Show.",
        link: "/buchung",
      };
    }
    if (groesse === "gross" || stil === "show") {
      return {
        format: "Close-Up + Bühnen-Highlight",
        sub: "Tisch-zu-Tisch + 20 Min Show vor dem Geburtstagslied",
        why: "Bei großen Geburtstagsfeiern ist die Combo ideal: Tisch-zu-Tisch zwischen Vorspeise und Hauptgang, dann eine kompakte Bühnenshow als Highlight. Alle Generationen erleben denselben Wow-Moment gemeinsam.",
        link: "/magic-dinner",
      };
    }
    if (anekdoten === "ja") {
      return {
        format: "Memory-Lane-Magie am Geburtstagstisch",
        sub: "Tisch-zu-Tisch · mit Familien-Anekdoten · 60 Min",
        why: "Ich gehe von Tisch zu Tisch und baue eure 3–5 Anekdoten ein. Trauzeugen-Tisch, Eltern-Tisch, Schulfreunde — jeder Tisch erlebt seine eigene Pointe mit Detail-Bezug, der nur die Familie versteht.",
        link: "/close-up",
      };
    }
    return {
      format: "Close-Up am Geburtstagstisch",
      sub: "Tisch-zu-Tisch · 45–90 Min · lockerer Ton",
      why: "Bei mittlerer Gästezahl funktioniert Tisch-zu-Tisch am besten: jeder Tisch bekommt seine eigene Mini-Show. Karten, Münzen, ein Ring der wandert — Magie zum Anfassen.",
      link: "/close-up",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "klein" ? 20 : a.groesse === "mittel" ? 50 : a.groesse === "gross" ? 100 : null,
  typFromAnswers: (a) =>
    a.alter === "gold" ? "Goldene Hochzeit" : `${a.alter}-Geburtstag`,
};

/* ═══════════════════════════════════════════════════════════
   6 · STIMMEN
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Es war genial, perfekt und mega gut. Die Gäste waren begeistert, die Kinder fanden es toll und wir auch.",
      author: "Petra Zeitler",
      role: "Geburtstagsfeier",
      initial: "P",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung sehr professionell. Gerne wieder.",
      author: "Martina Senftl",
      role: "Geburtstags-Kundin",
      initial: "M",
    },
    {
      quote:
        "Mit viel Charme und Witz hat er alle Gäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass.",
      author: "Katrin Raß",
      role: "Familien-Event-Planerin",
      initial: "K",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Was Familien sagen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            5,0 Sterne.
            <br />
            <span className={SERIF_ITALIC}>80+ Geburtstage.</span>
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
                  <p itemProp="author" className="font-display font-bold text-foreground text-sm">{r.author}</p>
                  <p className="text-xs font-medium text-foreground/55 mt-0.5">{r.role}</p>
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
   7 · TRUST + ZAHLEN
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
    <section ref={ref} className="bg-[hsl(30,8%,98.5%)] py-20 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Falls ihr noch Sicherheit braucht.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
            Bekannt aus TV, Wettbewerb und{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              80+ Geburtstagen
            </span>
            .
          </h2>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {TRUST_ITEMS.map((it) => (
            <article
              key={it.name}
              className="group relative bg-white border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
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
              <p className="text-xs font-medium text-foreground/55 leading-snug">{it.sub}</p>
            </article>
          ))}
        </div>

        <div className={`flex flex-wrap items-baseline justify-center gap-x-10 gap-y-5 md:gap-x-16 pt-10 border-t border-foreground/10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { num: "80+", label: "Geburtstage begleitet" },
            { num: "200+", label: "Events gesamt" },
            { num: "5,0 ★", label: "30+ Bewertungen" },
            { num: "24 h", label: "Antwortzeit" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-3">
              <span className="font-display text-2xl md:text-3xl font-black text-foreground tabular-nums">{s.num}</span>
              <span className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · FAQ
   ═══════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "Was kostet ein Auftritt zur Geburtstagsfeier?",
    a: "Der Preis hängt von Format, Dauer und Anreise ab. Nach kurzer Anfrage bekommt ihr ein verbindliches Angebot ohne versteckte Kosten.",
  },
  {
    q: "Wie lange dauert ein Auftritt?",
    a: "Klassisch 45–90 Min Close-Up am Tisch oder 15–30 Min Bühne. Bei größeren Feiern oft die Combo: Walk-Around beim Empfang plus Tisch-zu-Tisch plus 20-Min-Bühnen-Highlight zum Geburtstagslied.",
  },
  {
    q: "Funktioniert das auch bei seriösen Senioren?",
    a: "Genau die haben oft am meisten Spaß. 70er, 80er, Goldene Hochzeit — ich passe Tonalität und Tempo an. Würdige Tafelmagie, eingebaute Anekdoten, keine lauten Pointen.",
  },
  {
    q: "Wie weit im Voraus buchen?",
    a: "Bei runden Geburtstagen ideal drei bis sechs Monate vorher. Wochenenden Mai–September stark gefragt. Kurzfristig immer trotzdem anfragen — manchmal sind noch Slots offen.",
  },
  {
    q: "Klappt das mit Kindern unter den Gästen?",
    a: "Sehr gut sogar. Magie funktioniert altersübergreifend. Bei Bedarf baue ich für Kinder einen extra kurzen Moment ein, der altersgerecht ist — ohne dass die Erwachsenen warten müssen.",
  },
  {
    q: "Können wir Anekdoten aus der Familie einbauen?",
    a: "Sehr gern — das ist sogar einer der stärksten Effekte. Schickt mir vorab 3–5 Anekdoten, daraus baue ich Mini-Routinen. Nur eure Familie versteht den Witz, alle anderen staunen einfach.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Häufige Fragen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was Familien
            <br />
            <span className={SERIF_ITALIC}>vorher fragen.</span>
          </h2>
        </div>

        <div className={`max-w-3xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6 md:py-7 border-b border-foreground/15">
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">{faq.q}</span>
                <span aria-hidden className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
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
   9 · FINAL CTA
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
            background: "linear-gradient(120deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.75) 50%, rgba(8,6,12,0.55) 100%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-8"
        style={{ background: "radial-gradient(circle, rgba(154,38,64,0.13), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-6"
        style={{ background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)" }}
      />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Plant euren Geburtstag.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Magie als{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              Geschenk
            </span>
            .
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort und Geburtstagskind — Antwort innerhalb 24
            Stunden, mit einem persönlichen Konzept-Vorschlag.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung?anlass=Geburtstag"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90"
            >
              Anfrage starten
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+4915563744696" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white">
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

/* ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/geburtstage";

const Geburtstage = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Zauberer für Geburtstag — Runde Geburtstage, Goldene Hochzeit | Emilian Leber</title>
      <meta
        name="description"
        content="Zauberkünstler für Geburtstagsfeier in Bayern und deutschlandweit — runde Geburtstage, Goldene Hochzeit, Jubiläum. Close-Up am Tisch, Bühnen-Show, mit Familien-Anekdoten eingebaut. 80+ Geburtstage, 5,0★."
      />
      <meta
        name="keywords"
        content="Zauberer Geburtstag, Zauberer 50. Geburtstag, Zauberer 60. Geburtstag, Zauberer Goldene Hochzeit, Magier Jubiläum, Tischzauberer Geburtstagsfeier, Close-Up Geburtstag, Emilian Leber"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Zauberer für Geburtstag — Runde Geburtstage, Goldene Hochzeit | Emilian Leber" />
      <meta property="og:description" content="Close-Up und Bühne für Geburtstagsfeiern, mit Familien-Anekdoten. 80+ Geburtstage, 5,0★." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee eyebrow="80+ Geburtstage. Auftritte für." variant="cream" compact />
        <AgeGeneratorSection />
        <MemoryLaneSection />
        <PullQuoteSection />
        <CustomQuizSection config={geburtstagQuizConfig} />
        <StimmenSection />
        <TrustZahlenSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Geburtstage;
