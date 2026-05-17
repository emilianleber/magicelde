import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
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
  Sparkles,
  Brain,
  Coins,
  Quote,
  Clock,
  Wine,
  Utensils,
  GlassWater,
  Building2,
  Heart,
  Gift,
  Briefcase,
  Users,
  Smile,
} from "lucide-react";

import heroCloseupImg from "@/assets/hero-closeup.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import haendeInteraktionImg from "@/assets/haende-interaktion.jpg";
import schneiderWeisseImg from "@/assets/schneider-weisse-closeup.jpg";
import staunenImg from "@/assets/staunen.jpg";
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

const HEADLINE_SANS = ["Karten", "in"];
const HEADLINE_ITALIC = ["euren", "Händen."];

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
        if (el && y < window.innerHeight * 1.4) el.style.setProperty("--hero-parallax", `${Math.min(y * 0.18, 80)}px`);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="relative bg-[#08060c] text-white min-h-screen overflow-hidden">
      <HeroKeyframes />
      <div ref={photoRef} className="absolute inset-0 hero-photo-wrap hero-zoom" style={{ willChange: "transform" }}>
        <img src={heroCloseupImg} alt="Close-Up mit Emilian Leber — Karten in euren Händen" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%", filter: "saturate(0.92) contrast(1.08) brightness(0.7)" }} loading="eager" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 30%, rgba(8,6,12,0.5) 60%, rgba(8,6,12,0.25) 100%)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 65%)" }} />
        <div aria-hidden className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.28) 0%, rgba(199,144,66,0) 70%)" }} />
      </div>
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {BOKEH.map((b, i) => (<div key={i} className="absolute rounded-full hero-bokeh" style={{ width: b.size, height: b.size, left: b.left, top: b.top, background: `radial-gradient(circle, rgba(255,210,140,${b.o}) 0%, rgba(255,210,140,${b.o * 0.4}) 40%, rgba(255,210,140,0) 75%)`, filter: "blur(2px)", animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />))}
      </div>
      <div className="relative z-10 min-h-screen container px-6 flex flex-col justify-between pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300 hero-star" style={{ animationDelay: `${i * 0.12}s` }} />))}</div>
              <span className="text-sm text-white/85"><strong className="font-semibold text-white">5,0</strong><span className="text-white/60"> · 30+ Bewertungen</span></span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span className="text-sm text-white/80"><strong className="font-semibold text-white">100+ Close-Up-Auftritte</strong></span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Direkt am Tisch. In euren Händen.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (<span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>{w}{" "}</span>))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (<span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>{w}{" "}</span>))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Close-Up ist Magie zum Anfassen — Karten in eurer Hand, Münzen aus
            dem Nichts, ein Ring der wandert. Walk-Around beim Empfang oder
            Tisch-zu-Tisch beim Dinner. Intim, persönlich, ohne Technik.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <a href="#empfehlung" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95">
              Format-Finder<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/buchung?format=Close-Up" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors">
              Direkt anfragen<ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]" style={{ animationDelay: "2.0s" }}>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">100+</strong><span className="text-white/65">Close-Up-Auftritte</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">5–7</strong><span className="text-white/65">Min pro Tisch</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg">0</strong><span className="text-white/65">Technik nötig</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">Bayern · deutschlandweit</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABLAUF + BEISPIEL — Editorial-Layout statt Bubble-Cards
   Linke Spalte: allgemeiner Close-Up-Ablauf
   Rechte Spalte: ein konkretes Beispiel mit Tisch-Wahl
   ═══════════════════════════════════════════════════════════ */
const ABLAUF_PHASEN = [
  { phase: "Ankommen", body: "Ich setze mich an euren Tisch wie ein zusätzlicher Gast — kein großer Auftritt, kein lautes Achtung-Achtung. Erst sind alle skeptisch. Nach drei Sekunden nicht mehr." },
  { phase: "Eisbrecher", body: "Der erste sichtbare Effekt. Eine Karte verschwindet, eine Münze taucht in einer Hand auf, die ihr selbst geschlossen habt. Reine Aufmerksamkeitsverschiebung." },
  { phase: "Beteiligung", body: "Jetzt seid ihr Teil. Karten in euren Händen, Entscheidungen die ihr trefft, kleine Aufgaben — die Tafel wird gemeinsam zur Bühne." },
  { phase: "Persönlich", body: "Eine Anekdote, ein Detail von euch, ein Element vom Tisch wird Teil der Routine. Magie, die nur an diesem Tisch passieren kann." },
  { phase: "Pointe", body: "Eine Wendung, die niemand kommen sieht. Drei Sekunden Stille — dann fängt die Tafel an zu lachen, zu staunen, sich an die Schultern zu fassen." },
];

const HollywoodSequenzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-white py-24 md:py-36 overflow-hidden">
      {/* Deko: gezeichnete Linien im Hintergrund */}
      <svg aria-hidden className="absolute top-20 right-0 w-[420px] h-[420px] opacity-[0.06] pointer-events-none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke={ACCENT} strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke={ACCENT} strokeWidth="1" />
        <circle cx="100" cy="100" r="40" fill="none" stroke={ACCENT} strokeWidth="1" />
        <circle cx="100" cy="100" r="20" fill="none" stroke={ACCENT} strokeWidth="1" />
      </svg>

      <div className="container px-6 relative">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>So läuft ein Close-Up-Moment ab.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Fünf Schritte zum{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Wow-Moment</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Kein konkreter Trick — sondern der typische Bogen, den ein
              Close-Up-Moment am Tisch zeichnet. Egal ob Karten, Münzen oder
              Mentalmagie — dieser Bogen wiederholt sich.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — Phasen als vertikale Magazin-Liste (kein Card-Grid) */}
          <div className={`lg:col-span-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <ol className="relative">
              {ABLAUF_PHASEN.map((p, i) => (
                <li key={p.phase} className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-5 md:gap-7 pb-10 md:pb-14 relative">
                  {/* Verbindungs-Linie */}
                  {i < ABLAUF_PHASEN.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-12 left-[28px] md:left-[38px] bottom-0 w-px"
                      style={{ background: `linear-gradient(180deg, ${ACCENT}30, ${ACCENT}10)` }}
                    />
                  )}
                  <div className="relative">
                    <span
                      className="relative flex items-center justify-center w-14 h-14 md:w-[76px] md:h-[76px] rounded-full font-display font-black text-white text-lg md:text-xl"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                        boxShadow: `0 10px 25px -8px rgba(154,38,64,0.4), 0 0 0 5px white`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className={`${SERIF_ITALIC} text-2xl md:text-3xl text-foreground mb-3`}>
                      {p.phase}.
                    </h3>
                    <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-xl">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* RIGHT — Beispiel-Trick: Tisch-Wahl-Routine */}
          <div className={`lg:col-span-6 lg:sticky lg:top-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <div
              className="relative bg-[hsl(36,30%,97%)] p-8 md:p-10 overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                boxShadow: "0 50px 100px -30px rgba(40,20,40,0.35), 0 15px 35px -15px rgba(40,20,40,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Spielkarten-Deko oben rechts */}
              <span
                aria-hidden
                className="absolute -top-6 -right-3 select-none"
                style={{ fontSize: "120px", color: ACCENT, opacity: 0.06, transform: "rotate(15deg)" }}
              >
                ♠
              </span>

              <p
                className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-3"
                style={{ color: ACCENT }}
              >
                Beispiel aus dem Repertoire
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-7">
                Eine Routine —{" "}
                <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                  ihr entscheidet
                </span>
                .
              </h3>

              <div className="space-y-5 text-base md:text-lg text-foreground/75 leading-[1.7]">
                <p>
                  Eine Person am Tisch — sagen wir die Trauzeugin — bekommt
                  ein komplettes Kartenspiel in die Hand. Sie hält es fest,
                  ich fasse es nicht mehr an.
                </p>
                <p>
                  Jetzt entscheidet ihr gemeinsam am Tisch:{" "}
                  <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                    rot oder schwarz?
                  </span>{" "}
                  Ihr einigt euch. Dann:{" "}
                  <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                    Bild- oder Zahlenkarte?
                  </span>{" "}
                  Diskussion am Tisch, Entscheidung. Dann:{" "}
                  <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                    Herz oder Karo?
                  </span>{" "}
                  Letzte Wahl. Wert? Ihr sagt eine Zahl.
                </p>
                <p>
                  Ich habe das Kartenspiel die ganze Zeit nicht mehr berührt.
                  Die Trauzeugin breitet jetzt das Spiel auf dem Tisch aus —
                  und genau die eine Karte, die ihr ausgewählt habt, liegt
                  als einzige verkehrt herum im Deck.
                </p>
              </div>

              <div
                className="mt-8 pt-6 border-t flex items-center gap-3"
                style={{ borderColor: `${ACCENT}30` }}
              >
                <span
                  className={`${SERIF_ITALIC} text-base`}
                  style={{ color: ACCENT }}
                >
                  Drei Sekunden Stille —
                </span>
                <span className="font-display text-sm font-bold text-foreground">
                  dann lacht die ganze Tafel.
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
   SETTINGS-VARIANTEN — 3 Settings mit Foto-Mockup, alternierendes Layout
   Layout: Diptychon mit Foto + Beschreibung, jede Variante anders aligned
   ═══════════════════════════════════════════════════════════ */
const SETTINGS = [
  {
    Icon: Wine,
    label: "Sektempfang",
    sub: "Walk-Around · Steh-Cluster · 30–60 Min",
    body: "Während der Sekt ausgeschenkt wird, gehe ich von Cluster zu Cluster. Drei bis vier Leute, ein Karten-Effekt, eine Münze die durch eine Hand wandert — dann weiter zur nächsten Gruppe. Eisbrecher zwischen Gästen, die sich gerade erst kennenlernen.",
    image: haendeInteraktionImg,
    tags: ["Stehend", "Keine Bühne", "3–4er Cluster"],
    direction: "lr",
  },
  {
    Icon: Utensils,
    label: "Tisch-zu-Tisch beim Dinner",
    sub: "Zwischen Gängen · 5–7 Min pro Tisch · 60–120 Min",
    body: "Klassisches Magic-Dinner-Setting. Zwischen den Gängen besuche ich jeden Tisch — fünf bis sieben Minuten Mini-Show, abgestimmt auf die Tafel. Trauzeugen, Familie, Schulfreunde: jeder Tisch bekommt seine eigene Mikro-Erfahrung. Service läuft währenddessen ungestört weiter.",
    image: schneiderWeisseImg,
    tags: ["8–12 Personen", "Service-kompatibel", "5–7 Min/Tisch"],
    direction: "rl",
  },
  {
    Icon: GlassWater,
    label: "Stehtische am Ende des Abends",
    sub: "Nach dem Essen · lose Cluster · 45–90 Min",
    body: "Wenn das Essen vorbei ist und die Stimmung lockerer wird — Stehtische bilden sich neu, Trauzeugen kommen rüber, Vorstand mit Kunden im Mix. Ich gehe zu den Clustern, die gerade die meiste Energie haben. Mentalmagie funktioniert hier besonders, weil die Gäste schon entspannt sind.",
    image: staunenImg,
    tags: ["Späterer Abend", "Mental-Schwerpunkt", "Energie folgen"],
    direction: "lr",
  },
];

const SettingsVariantenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-16 md:mb-24">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Drei Settings, ein Format.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Empfang. Tisch.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Stehtische.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Close-Up funktioniert in jeder Phase eures Abends — und sieht
              jedes Mal anders aus. Wählt eine Phase oder kombiniert alle drei.
            </p>
          </div>
        </div>

        <div className="space-y-20 md:space-y-28">
          {SETTINGS.map((s, i) => (
            <article key={s.label} className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className={`lg:col-span-7 ${s.direction === "rl" ? "lg:order-2" : ""}`}>
                <div className="relative group overflow-hidden" style={{ borderRadius: "1.25rem" }}>
                  <img src={s.image} alt={`Close-Up Setting — ${s.label}`} className="w-full h-[320px] md:h-[460px] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]" loading="lazy" style={{ filter: "saturate(0.95) brightness(0.96)" }} />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.4))" }} />
                  <span className={`absolute top-5 ${s.direction === "rl" ? "right-5" : "left-5"} inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white`} style={{ background: "rgba(8,6,12,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    Setting {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className={`lg:col-span-5 ${s.direction === "rl" ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                    <s.Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
                  </span>
                  <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55`}>{s.sub}</p>
                </div>
                <h3 className="font-display text-2xl md:text-4xl font-black text-foreground leading-[1.05] mb-5">
                  {s.label}.
                </h3>
                <p className="text-base md:text-lg text-foreground/75 leading-[1.7] mb-6">{s.body}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-foreground/70 bg-white border border-foreground/10">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TYPISCHER ABEND — narrative Editorial mit Uhrzeiten links
   Layout: Magazin-Story mit Sticky-Time-Marker
   ═══════════════════════════════════════════════════════════ */
const ABEND_ZEITEN = [
  { t: "18:30", title: "Ankunft mit den ersten Gästen.", body: "Ich bin eine Viertelstunde vor offiziellem Start da — ungesehen, im normalen Anzug, kein Equipment-Koffer auf der Bühne. Kurzer Check mit Gastgeber: Was hat sich geändert? Wer ist gestern abgesprungen? Welcher Insider von gestern Abend funktioniert noch? Mini-Update für mein Briefing." },
  { t: "19:00", title: "Walk-Around beim Sektempfang.", body: "Ich klinke mich als Gast in eine Dreier-Gruppe ein, hole ein Glas Wasser, sage [die Kanapees sind hervorragend]. Drei Sekunden später schwebt mein Sektglas. Erste Reaktion: doppelt prüfen, ob das gerade passiert ist. Dann: [Können Sie das nochmal?]. Nach 45 Minuten kennt jeder im Saal mein Gesicht — ohne dass eine Ansage gemacht wurde." },
  { t: "20:15", title: "Erster Gang. Erste Tisch-Runde.", body: "Während Vorspeise und Hauptgang besuche ich systematisch alle Tische — 5 bis 7 Minuten pro Tafel, abgestimmt auf die Sitzordnung. Brautpaar-Tisch kriegt eine eingebaute Anekdote. Familientisch der Braut bekommt was Persönliches. Trauzeugen-Tisch was Frecheres. Service-Mitarbeiter wissen: kein zusätzlicher Service-Stop, wenn ich da bin." },
  { t: "22:00", title: "Dessert: die Tafel-Routine.", body: "Eine zentrale Routine für die ganze Tafel gleichzeitig — bei größeren Hochzeiten gehe ich auf eine kleine Bühne oder ein offenes Mittel-Karee. Eine Mentalvorhersage, die zwanzig Minuten vorher im Saal hinterlegt wurde, wird live geöffnet. Drei Sekunden Stille. Dann der Saal." },
  { t: "23:30", title: "Stehtische, Bonus-Runden, Bar.", body: "Wer noch da ist, will mehr. Ich gehe zu Clustern, die sich neu gebildet haben — Vorstand mit Kunden, Brautfamilie mit Freunden des Bräutigams. Mentalmagie funktioniert hier besonders, weil alle entspannt sind. Bis irgendwann gegen Mitternacht der DJ den ersten Tanz ankündigt und ich elegant verschwinde." },
];

const TypischerAbendSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Ein Abend, von der Ankunft bis zum Tanz.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Wie sich ein Close-Up-Abend{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>anfühlt</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Kein konkreter Auftrag, sondern ein typischer Hochzeits- oder
              Firmen-Abend mit Close-Up als Roter-Faden-Element. Fünf
              Zeitfenster, fünf Atmosphären.
            </p>
          </div>
        </div>

        <ol className="space-y-14 md:space-y-20 max-w-5xl">
          {ABEND_ZEITEN.map((z, i) => (
            <li key={z.t} className={`grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <header className="md:sticky md:top-24 md:self-start">
                <div className="flex items-baseline gap-2.5 mb-2">
                  <Clock className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={2} />
                  <span className={`${SERIF_ITALIC} text-3xl md:text-5xl tabular-nums leading-none`} style={{ color: ACCENT }}>{z.t}</span>
                </div>
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/45">Phase {String(i + 1).padStart(2, "0")}</span>
              </header>
              <div className="md:pt-3 border-t md:border-t-0 md:border-l md:pl-12 pt-6" style={{ borderColor: `${ACCENT}25` }}>
                <h3 className="font-display text-xl md:text-3xl font-black text-foreground leading-[1.15] mb-5 max-w-2xl">{z.title}</h3>
                <p className="text-base md:text-lg text-foreground/75 leading-[1.75] max-w-2xl">{z.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   EFFEKT-KATALOG
   ═══════════════════════════════════════════════════════════ */
const EFFEKTE = [
  { Icon: Sparkles, title: "Karten-Magie", body: "Klassisch und doch nie alt: Karten, die wandern, verschwinden, sich selbst signieren. Ihr wählt frei, ich liefere die Pointe.", examples: ["Frei gewählte Karte taucht im Marmeladenglas auf", "Signierte Karte wandert in den Geldbeutel", "Ganze Kartenfolgen, die nur ihr versteht"] },
  { Icon: Coins, title: "Münzen & Objekte", body: "Münzen aus dem Nichts, durch den Tisch, im Glas. Auch Ringe, Uhren, Brillen — alles was am Tisch liegt, kann Teil der Routine werden.", examples: ["Trauring wandert vom Brautvater zum Trauzeugen", "Lieblings-Uhr verschwindet, taucht in der Brieftasche auf", "Münze fällt durch den Tisch in eine Tasse"] },
  { Icon: Brain, title: "Mentalmagie", body: "Die stillste Variante: ich lese Gedanken, errate Geburtsdaten, sage Worte vorher. Keine lauten Effekte — dafür drei Sekunden Stille danach.", examples: ["Eure Trauungs-Anekdote auf einem Zettel im Briefumschlag", "Lieblings-PIN ohne zu fragen", "Geburtsjahr auf einer signierten Karte"] },
];

const EffektKatalogSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Drei Effekt-Familien.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Karten. Münzen.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Gedanken.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Bereiche, die ich am Tisch immer dabei habe — kombiniert je
              nach Gäste-Mix. Eingebaut auch persönliche Anekdoten, die nur
              ihr versteht.
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {EFFEKTE.map((e) => (
            <article key={e.title} className="relative bg-white p-7 md:p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.18)]" style={{ borderRadius: "1rem", boxShadow: "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                <e.Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-3">{e.title}</h3>
              <p className="text-sm md:text-base text-foreground/65 leading-[1.6] mb-5">{e.body}</p>
              <ul className="space-y-2 mt-auto">
                {e.examples.map((ex) => (
                  <li key={ex} className={`${SERIF_ITALIC} text-sm text-foreground/55 leading-snug`}>· {ex}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRICK-REPERTOIRE — Bento aus 4 konkreten Routinen
   Layout: asymmetrisches 2×2 mit unterschiedlichen Card-Größen
   ═══════════════════════════════════════════════════════════ */
const REPERTOIRE = [
  { kicker: "Klassiker", title: "Signierte Karte im Geldbeutel.", body: "Ein Gast signiert eine Karte mit Edding. Die Karte verschwindet aus seinem Stapel. Drei Minuten später findet sich derselbe Gast die Karte — in seinem eigenen, die ganze Zeit verschlossenen Geldbeutel. Funktioniert auch mit Handy-Hülle, Brieftasche, Brautstrauß.", size: "lg" },
  { kicker: "Persönlich", title: "Trauring wandert.", body: "Brautvater nimmt seinen Ring ab, hält ihn in der Faust. Plötzlich liegt der Ring beim Bräutigam. Mit Briefing-Anekdote eingebaut.", size: "sm" },
  { kicker: "Mental", title: "Drei Worte vor der Pause.", body: "Drei Gäste denken an je ein Wort. Ich schreibe alle drei auf einen Zettel — vor der Pause, ohne zu fragen. Hängt sichtbar im Saal.", size: "sm" },
  { kicker: "Münze", title: "Münze durch die Faust.", body: "Eine Ein-Euro-Münze in Ihrer geschlossenen Hand. Ich klopfe einmal mit dem Finger gegen Ihre Faust. Sie öffnen — die Münze ist weg. Ich öffne meine eigene Hand. Sie liegt da.", size: "md" },
];

const TrickRepertoireSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Vier Routinen aus meinem Set.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Konkrete{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Beispiele</span>{" "}
              aus dem Repertoire.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Diese vier Routinen kommen in unterschiedlichen Variationen fast
              jeden Abend vor — kombiniert mit eingebauten Anekdoten, abgestimmt
              auf den Tisch oder Cluster, der gerade dran ist.
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* lg: 4 cols */}
          <article className="md:col-span-4 relative bg-[hsl(36,30%,97%)] p-8 md:p-10 flex flex-col" style={{ borderRadius: "1.25rem", boxShadow: "0 20px 45px -25px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)", minHeight: "320px" }}>
            <span aria-hidden className="absolute -top-8 -right-3 select-none" style={{ fontSize: "120px", color: ACCENT, opacity: 0.06, transform: "rotate(15deg)" }}>♣</span>
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-3" style={{ color: ACCENT }}>{REPERTOIRE[0].kicker}</p>
            <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-[1.1] mb-5 max-w-md">{REPERTOIRE[0].title}</h3>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.7] max-w-xl">{REPERTOIRE[0].body}</p>
            <div className="mt-auto pt-7 flex items-center gap-3">
              <span className={`${SERIF_ITALIC} text-base`} style={{ color: ACCENT }}>3 Min</span>
              <span aria-hidden className="text-foreground/25">·</span>
              <span className="text-sm text-foreground/55">2–8 Gäste · Geldbeutel mitbringen lassen</span>
            </div>
          </article>

          {/* sm: 2 cols */}
          <article className="md:col-span-2 relative text-white p-7 md:p-9 flex flex-col overflow-hidden" style={{ borderRadius: "1.25rem", background: `linear-gradient(155deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`, minHeight: "320px" }}>
            <span aria-hidden className="absolute -bottom-4 -right-4 select-none" style={{ fontSize: "110px", color: "white", opacity: 0.07 }}>♥</span>
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/65 mb-3">{REPERTOIRE[1].kicker}</p>
            <h3 className="font-display text-xl md:text-2xl font-black leading-tight mb-4">{REPERTOIRE[1].title}</h3>
            <p className="text-sm md:text-base text-white/80 leading-[1.6]">{REPERTOIRE[1].body}</p>
          </article>

          {/* sm: 2 cols */}
          <article className="md:col-span-2 relative bg-[#08060c] text-white p-7 md:p-9 flex flex-col overflow-hidden" style={{ borderRadius: "1.25rem", minHeight: "300px" }}>
            <div aria-hidden className="absolute -top-20 -right-10 w-[300px] h-[300px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.7), transparent 65%)" }} />
            <p className="relative text-[10px] tracking-[0.18em] uppercase font-bold mb-3" style={{ color: "#f3d9a8" }}>{REPERTOIRE[2].kicker}</p>
            <h3 className="relative font-display text-xl md:text-2xl font-black leading-tight mb-4">{REPERTOIRE[2].title}</h3>
            <p className="relative text-sm md:text-base text-white/75 leading-[1.6]">{REPERTOIRE[2].body}</p>
          </article>

          {/* md: 4 cols */}
          <article className="md:col-span-4 relative bg-white p-8 md:p-10 flex flex-col md:flex-row gap-7 md:items-center" style={{ borderRadius: "1.25rem", boxShadow: "0 25px 50px -30px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(0,0,0,0.05)", minHeight: "300px" }}>
            <div className="shrink-0 inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full" style={{ background: "linear-gradient(135deg, rgba(199,144,66,0.18), rgba(199,144,66,0.04))", border: "1px solid rgba(199,144,66,0.3)" }}>
              <Coins className="w-9 h-9 md:w-10 md:h-10" style={{ color: "#a06820" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-2.5" style={{ color: ACCENT }}>{REPERTOIRE[3].kicker}</p>
              <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-3">{REPERTOIRE[3].title}</h3>
              <p className="text-sm md:text-base text-foreground/70 leading-[1.65] max-w-lg">{REPERTOIRE[3].body}</p>
            </div>
          </article>
        </div>

        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mt-10 max-w-2xl`}>
          Plus rund 40 weitere Routinen aus meinem festen Set — wir wählen
          gemeinsam, was zu euch passt.
        </p>
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
      <div className="absolute inset-0 opacity-30">
        <img src={emotionenImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(8,6,12,0.55) 0%, rgba(8,6,12,0.95) 70%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)" }} />
      <div aria-hidden className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.7), transparent 65%)" }} />
      <div className={`relative container px-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
        <Quote className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto opacity-40" style={{ color: "#f3d9a8" }} strokeWidth={1.25} />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p className="font-display font-black tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.75rem)]">
            Die Karten sind in{" "}
            <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>euren Händen</span>.{" "}
            Nicht in meinen.
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span className={`${SERIF_ITALIC} text-base md:text-lg text-white/65`}>Was Close-Up von Bühne unterscheidet.</span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANLASS-MIX — 5 Anlässe als typografische Liste mit Sticky-Foto
   ═══════════════════════════════════════════════════════════ */
const ANLAESSE = [
  { Icon: Heart, label: "Hochzeit · Empfang & Dinner", note: "100+ Hochzeiten", body: "Walk-Around beim Sektempfang, Tisch-zu-Tisch beim Dinner, eingebaute Anekdoten vom Brautpaar. Roter Faden über den ganzen Tag." },
  { Icon: Building2, label: "Firmenfeier · Networking-Apéro", note: "100+ Firmen-Events", body: "Eisbrecher zwischen Kollegen und externen Gästen. Insider-Pointen aus dem Briefing der Geschäftsleitung. Premium-Tonalität für Vorstandsdinner." },
  { Icon: Gift, label: "Geburtstag · 40–80er-Feiern", note: "80+ Geburtstage", body: "Anekdoten vom Geburtstagskind eingebaut, Memory-Lane-Routinen. Funktioniert von Goldene Hochzeit bis 50er-Party im Wirtshaus." },
  { Icon: Utensils, label: "Magic Dinner · zwischen den Gängen", note: "10+ Magic Dinners", body: "Das Stammformat — Tisch-zu-Tisch über den ganzen Abend, eingebaut in den Dinner-Service. Mit Restaurant-Partnern in Bayern." },
  { Icon: Briefcase, label: "Charity-Gala · Networking-Hour", note: "Premium-Setting", body: "Vorstand mit Spendern im Mix, Black-Tie-Tonalität, leise Mentalmagie statt lauter Effekte. Drei-Sekunden-Stille als Markenzeichen." },
];

const AnlassMixSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12">
          <div className={`lg:col-span-5 lg:sticky lg:top-24 lg:self-start ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Wann Close-Up den Abend prägt.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,4.5vw,4.25rem)] text-foreground mb-8">
              Fünf Anlässe.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Ein Format</span>.
            </h2>
            <div className="relative overflow-hidden" style={{ borderRadius: "1.25rem" }}>
              <img src={schneiderWeisseImg} alt="Close-Up Tischmagie — Emilian Leber" className="w-full h-[340px] md:h-[420px] object-cover" loading="lazy" style={{ filter: "saturate(0.95) brightness(0.94)" }} />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))" }} />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className={`${SERIF_ITALIC} text-base md:text-lg leading-snug`}>„Karten am Tisch funktionieren von Hochzeit bis Vorstandsdinner."</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
              {ANLAESSE.map((a, i) => (
                <li key={a.label} className={`grid grid-cols-[44px_1fr_auto] md:grid-cols-[56px_1fr_auto] items-baseline gap-4 md:gap-6 py-7 md:py-9 group ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
                  <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full self-start" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                    <a.Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">{a.label}</h3>
                      <span className={`${SERIF_ITALIC} text-sm md:text-base text-foreground/55`}>{a.note}</span>
                    </div>
                    <p className="text-base text-foreground/65 leading-[1.65] max-w-2xl">{a.body}</p>
                  </div>
                  <span className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 group-hover:bg-[#9a2640] group-hover:text-white text-foreground/30 self-start mt-1" aria-hidden>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-3">
              <Link to="/buchung?format=Close-Up" className="hero-cta inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white" style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`, boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)" }}>
                Anlass besprechen<ArrowRight className="w-4 h-4" />
              </Link>
              <span className={`${SERIF_ITALIC} text-sm text-foreground/55`}>Antwort innerhalb 24 h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   GRUPPEN-DYNAMIK — wie sich der Auftritt am Tisch anpasst
   Layout: 3 asymmetrische Cards mit Persona-typografie
   ═══════════════════════════════════════════════════════════ */
const GRUPPEN = [
  { Icon: Briefcase, persona: "Vorstand", sub: "Anwälte · CEOs · konservatives Publikum", body: "Premium-Tonalität, weniger Comedy, mehr stille Mentaleffekte. Drei-Sekunden-Stille nach jedem Wow. Keine Anfass-Tricks, keine albernen Pointen — dafür subtile Routinen, die das Briefing-Wissen einbauen.", tag: "leise · präzise" },
  { Icon: Users, persona: "Familie & Brautpaare", sub: "Großeltern · Eltern · Trauzeugen", body: "Warm-verbindend. Karten in Großeltern-Hände, eingebaute Brautpaar-Anekdoten, kleine Aufgaben für die Trauzeugin. Alle bekommen ihren Mini-Moment — auch die schweigsame Tante.", tag: "warm · persönlich" },
  { Icon: Smile, persona: "Junge Teams & Freunde", sub: "Junggesellen-Abend · Studenten · Kollegen", body: "Energetisch, Comedy-Anteil hoch, schnelle Effekte hintereinander. Aufmerksamkeit kurz, dafür viele kleine Wow-Momente. Pointe statt Drama, Tempo statt Pause.", tag: "energetisch · schnell" },
];

const GruppenDynamikSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>An jedem Tisch ein anderer Ton.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Drei Publikum-Typen.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Drei Tonalitäten.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Close-Up ist kein festes Programm, das auf alle losgelassen wird —
              jeder Tisch ist anders. So passe ich mich live an, ohne dass ihr
              etwas tun müsst.
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-3 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {GRUPPEN.map((g, i) => (
            <article key={g.persona} className={`relative p-7 md:p-9 flex flex-col h-full transition-all duration-500 hover:-translate-y-1 ${i === 1 ? "text-white" : ""}`} style={{
              borderRadius: "1.25rem",
              background: i === 1 ? `linear-gradient(160deg, ${ACCENT_DEEP} 0%, #08060c 100%)` : "hsl(36,30%,97%)",
              boxShadow: i === 1 ? "0 35px 70px -30px rgba(40,20,40,0.4)" : "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
              minHeight: "340px",
            }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full" style={{
                  background: i === 1 ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                  border: i === 1 ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(154,38,64,0.22)",
                }}>
                  <g.Icon className="w-5 h-5" style={{ color: i === 1 ? "#f3d9a8" : ACCENT }} strokeWidth={1.75} />
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: i === 1 ? "rgba(255,255,255,0.6)" : ACCENT }}>Typ {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={`font-display text-2xl md:text-3xl font-black leading-tight mb-2 ${i === 1 ? "" : "text-foreground"}`}>{g.persona}</h3>
              <p className={`${SERIF_ITALIC} text-sm md:text-base mb-5`} style={{ color: i === 1 ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}>{g.sub}</p>
              <p className={`text-base leading-[1.7] flex-1 ${i === 1 ? "text-white/80" : "text-foreground/75"}`}>{g.body}</p>
              <div className="mt-7 pt-5 border-t" style={{ borderColor: i === 1 ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }}>
                <span className={`${SERIF_ITALIC} text-base`} style={{ color: i === 1 ? "#f3d9a8" : ACCENT }}>{g.tag}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUIZ
   ═══════════════════════════════════════════════════════════ */
const closeupQuizConfig: CustomQuizConfig = {
  anlass: "Close-Up",
  sectionEyebrow: "Format-Finder · Close-Up",
  sectionTitle: (<>Findet euer{" "}<span className={SERIF_ITALIC} style={{ color: ACCENT }}>Close-Up-Setting</span>.</>),
  sectionDesc: "Drei Fragen, eine konkrete Close-Up-Empfehlung. Walk-Around, Tisch-zu-Tisch oder Stunden-Wedding.",
  questions: [
    { id: "setting", eyebrow: "Frage 01 · Setting", title: <>Welches Setting habt ihr?</>, hint: "Steh-Empfang, sitzendes Dinner oder Mix?", feedback: "Verstanden.", cols: 3, options: [
      { value: "empfang", label: "Steh-Empfang", sub: "Sekt, Mingling, kein Sitzplatz" },
      { value: "dinner", label: "Sitzendes Dinner", sub: "Mehrere Tische, Service mit Gängen" },
      { value: "mix", label: "Mix · roter Faden", sub: "Empfang + Dinner + Abend" },
    ] },
    { id: "dauer", eyebrow: "Frage 02 · Dauer", title: <>Wie lange soll Close-Up laufen?</>, hint: "Kompakter Slot oder mehrere Tischrunden?", feedback: "Passt.", cols: 3, options: [
      { value: "kurz", label: "30–60 Min", sub: "Ein Slot, eine Phase" },
      { value: "mittel", label: "60–120 Min", sub: "Zwei bis drei Tischrunden" },
      { value: "lang", label: "Über den ganzen Abend", sub: "Empfang, Dinner, Stehtische" },
    ] },
    { id: "stil", eyebrow: "Frage 03 · Stil", title: <>Welcher Effekt-Schwerpunkt?</>, hint: "Klassische Karten, persönliche Mentalmagie oder beides?", feedback: "Klingt nach einem starken Programm.", cols: 3, options: [
      { value: "karten", label: "Klassisch · Karten", sub: "Sichtbar, schnell, Comedy-Anteil" },
      { value: "mental", label: "Mentalmagie", sub: "Leise, persönlich, eingebaute Anekdoten" },
      { value: "mix", label: "Mix aus beidem", sub: "Karten + Mental + Münzen" },
    ] },
  ],
  recommend: (a) => {
    const { setting, dauer, stil } = a;
    if (setting === "empfang" || dauer === "kurz") {
      return { format: "Walk-Around beim Empfang", sub: "30–60 Min Steh-Empfang · 3er- und 4er-Gruppen", why: "Beim Steh-Empfang gehe ich von Cluster zu Cluster. Karten im Stehen, ein Effekt für drei Leute, dann der nächste Cluster. Eisbrecher zwischen Menschen, die sich noch nicht kennen.", link: "/buchung" };
    }
    if (setting === "dinner") {
      return { format: "Tisch-zu-Tisch beim Dinner", sub: "5–7 Min pro Tisch · zwei Tischrunden · zwischen den Gängen", why: "Während des Service gehe ich von Tisch zu Tisch. Jeder Tisch bekommt seine eigene Mini-Show — Trauzeugen, Eltern, Schulfreunde, alle haben gleich viel davon.", link: "/magic-dinner" };
    }
    if (stil === "mental") {
      return { format: "Mentalmagie-Programm", sub: "Leise, persönlich, mit eingebauten Anekdoten", why: "Mentalmagie funktioniert besonders, wenn ihr Anekdoten vorab schickt. Geburtsjahre auf signierten Karten, Lieblings-PINs ohne zu fragen, Trauungs-Details im Briefumschlag. Drei Sekunden Stille danach.", link: "/buchung" };
    }
    return { format: "Close-Up über den ganzen Abend", sub: "Empfang + Dinner + Stehtische · 3–4 Stunden", why: "Der bewährte Ablauf für mittlere bis größere Events: Walk-Around beim Empfang, Tisch-zu-Tisch zwischen den Gängen, Bonus-Runden an den Stehtischen am Ende. Roter Faden über den Abend.", link: "/magic-dinner" };
  },
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    { quote: "Wirklich großartig! Mit viel Charme und Witz hat er alle Gäste begeistert.", author: "Katrin Raß", role: "Close-Up Hochzeit", initial: "K" },
    { quote: "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt.", author: "Martina Senftl", role: "Close-Up Eventkundin", initial: "M" },
    { quote: "Es war einfach Mega! Emilian hat alle Gäste begeistert.", author: "Jan von Lehmann", role: "Close-Up Firmenfeier", initial: "J" },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Was Gastgeber sagen.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            5,0 Sterne.<br /><span className={SERIF_ITALIC}>30+ Bewertungen.</span>
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {reviews.map((r) => (
            <article key={r.author} itemScope itemType="https://schema.org/Review" className="relative bg-white p-7 md:p-9 flex flex-col h-full" style={{ borderRadius: "1rem", boxShadow: "0 25px 50px -25px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-1 mb-5">{[...Array(5)].map((_, j) => (<Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />))}<meta itemProp="reviewRating" content="5" /></div>
              <p itemProp="reviewBody" className="text-[15px] md:text-base leading-[1.65] text-foreground/85 flex-1">„{r.quote}"</p>
              <footer className="mt-7 pt-5 border-t border-foreground/10 flex items-center gap-4">
                <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-white text-base" style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}>{r.initial}</div>
                <div>
                  <p itemProp="author" className="font-display font-bold text-foreground text-sm">{r.author}</p>
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
   TRUST + ZAHLEN
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
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-20 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
          <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-5`}>Bekannt aus.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
            TV, Wettbewerb und{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>100+ Close-Up-Auftritte</span>.
          </h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {TRUST_ITEMS.map((it) => (
            <article key={it.name} className="group relative bg-white border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/15 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.16), rgba(154,38,64,0.05))", border: "1px solid rgba(154,38,64,0.22)" }}>
                <it.Icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
              </div>
              <p className="font-display font-bold text-foreground text-sm md:text-base leading-tight mb-1.5">{it.name}</p>
              <p className={`${SERIF_ITALIC} text-[12px] md:text-sm text-foreground/55 leading-snug`}>{it.sub}</p>
            </article>
          ))}
        </div>
        <div className={`flex flex-wrap items-baseline justify-center gap-x-10 gap-y-5 md:gap-x-16 pt-10 border-t border-foreground/10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { num: "100+", label: "Close-Up-Auftritte" },
            { num: "5–7", label: "Min pro Tisch" },
            { num: "5,0 ★", label: "30+ Bewertungen" },
            { num: "0", label: "Technik nötig" },
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
   FAQ
   ═══════════════════════════════════════════════════════════ */
const faqs = [
  { q: "Was kostet Close-Up?", a: "Der Preis hängt von Dauer (30 Min vs 3 Stunden) und Anreise ab. Verbindliches Angebot nach kurzer Anfrage, ohne versteckte Kosten." },
  { q: "Wie viele Gäste sind ideal?", a: "Von 10 bis 200+ Gästen alles möglich. Bei kleinen Runden bleibe ich länger pro Tisch, bei größeren mache ich mehr Tischrunden. Walk-Around funktioniert bis 300+ Gäste." },
  { q: "Welche Tische, welches Setup?", a: "Jede Tischanordnung funktioniert. Ich brauche etwas Platz zum Stehen am Tisch, der Service muss durchkommen. Keine Bühne nötig, keine Technik, keine Anpassung der Location." },
  { q: "Was bei seriösen oder schweigsamen Gästen?", a: "Genau die sind oft die besten — Vorstandsvorsitzende, Anwälte, Großeltern. Nach drei Minuten zieht jeder eigene Karten. Tonalität passe ich ans Publikum an." },
  { q: "Kann ich Themen vorab abstimmen?", a: "Ja, sehr gern. Anekdoten, Insider, No-Gos — alles in einem 15-Min Call vorher klären. Manche Effekte werden persönlich angepasst." },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Häufige Fragen.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was vorher<br /><span className={SERIF_ITALIC}>gefragt wird.</span>
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
   FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.75) 50%, rgba(8,6,12,0.55) 100%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.55), transparent 60%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(255,180,40,0.5), transparent 60%)" }} />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}>Karten in eure Hände.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Close-Up{" "}<span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>buchen</span>.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort und Gästezahl — Antwort innerhalb 24 Stunden mit einem Close-Up-Konzept für euren Abend.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/buchung?format=Close-Up" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90">
              Anfrage starten<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+4915563744696" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white">
              Direkt anrufen<ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/close-up";

const CloseUp = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Close-Up Zauberer — Tischmagie für eure Gäste | Emilian Leber</title>
      <meta name="description" content="Close-Up Zauberer in Bayern und deutschlandweit — Karten, Münzen, Mentalmagie direkt in den Händen eurer Gäste. Walk-Around oder Tisch-zu-Tisch. 100+ Close-Up-Auftritte, 5,0★." />
      <meta name="keywords" content="Close-Up Zauberer, Tischzauberer, Walk-Around Magier, Kartenzauberer, Mentalmagier, Close-Up Hochzeit, Close-Up Firmenfeier, Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Close-Up Zauberer — Tischmagie für eure Gäste | Emilian Leber" />
      <meta property="og:description" content="Karten, Münzen, Mentalmagie direkt in den Händen. 100+ Close-Up-Auftritte, 5,0★." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <HollywoodSequenzSection />
        <SettingsVariantenSection />
        <TypischerAbendSection />
        <EffektKatalogSection />
        <TrickRepertoireSection />
        <PullQuoteSection />
        <AnlassMixSection />
        <GruppenDynamikSection />
        <CustomQuizSection config={closeupQuizConfig} />
        <StimmenSection />
        <TrustZahlenSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default CloseUp;
