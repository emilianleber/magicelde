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
  Mic2,
  Lightbulb,
  Music,
  Cable,
} from "lucide-react";

import heroStageImg from "@/assets/hero-stage.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";

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

const HEADLINE_SANS = ["Fünfzig", "Augen."];
const HEADLINE_ITALIC = ["Ein", "Moment."];

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
        <img src={heroStageImg} alt="Bühnenshow mit Emilian Leber — Magie für die ganze Mannschaft" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%", filter: "saturate(0.92) contrast(1.08) brightness(0.7)" }} loading="eager" />
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
            <span className="text-sm text-white/80"><strong className="font-semibold text-white">Bühnen-Erfahrung seit 2016</strong></span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Durchkomponierte Show. Für alle gleichzeitig.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (<span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>{w}{" "}</span>))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (<span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>{w}{" "}</span>))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Fünfzehn bis sechzig Minuten Bühne — Mentaleffekte, Comedy-Pointen,
            Standing-Ovation-Finale. Für Galas, Firmen-Events, Theater-Slots,
            Hochzeiten vor dem Tanz. Eingebaute Story, abgestimmt auf euren Anlass.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <a href="#empfehlung" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95">
              Format-Finder<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/buchung?format=Bühnenshow" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors">
              Direkt anfragen<ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]" style={{ animationDelay: "2.0s" }}>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">15 – 60</strong><span className="text-white/65">Min Show</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">50 – 500</strong><span className="text-white/65">Gäste</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg">2×1,5</strong><span className="text-white/65">m Bühne</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">Headset+Sound mitgebracht</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   DRAMA-KURVE — page-eigener Twist: SVG-Diagramm Spannungsverlauf
   ═══════════════════════════════════════════════════════════ */
const DRAMA_POINTS = [
  { time: "0:00", phase: "Hook", body: "Sofort ein Karten-Effekt mit dem ersten Gast — alle merken: jetzt wird's spannend." },
  { time: "3:00", phase: "Aufbau", body: "Persönliche Anekdote aus dem Briefing, ein Mentaleffekt mit Publikumsbeteiligung, erste Lacher." },
  { time: "8:00", phase: "Peak 1", body: "Erste große Pointe — ein wandernder Gegenstand oder eine unmögliche Vorhersage. Drei Sekunden Stille." },
  { time: "12:00", phase: "Auflockerung", body: "Comedy-Block, mehrere kurze Pointen hintereinander. Spannung lockert sich, alle atmen." },
  { time: "16:00", phase: "Climax", body: "Großer Mentaleffekt mit Firmen-Anekdote / Brautpaar-Story / Geburtstagskind-Bezug. Standing Ovation." },
  { time: "20:00", phase: "Übergabe", body: "Verabschiedung, Übergabe an Tanz/DJ/Geschäftsleitung. Alle wissen: das war der Höhepunkt des Abends." },
];

const DramaKurveSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Eine Show. Ein Spannungsbogen.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Die{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Drama-Kurve</span>{" "}
              einer 20-Min-Show.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Bühnenshow ist nicht einfach „Tricks hintereinander". Eine
              durchkomponierte Show hat einen Spannungsverlauf — Aufbau,
              Peaks, Auflockerung, Climax, Übergabe. So sieht der Bogen
              einer typischen 20-Min-Bühnenshow aus.
            </p>
          </div>
        </div>

        {/* SVG-Diagramm Drama-Kurve */}
        <div className={`relative bg-[hsl(36,30%,97%)] rounded-2xl p-7 md:p-10 mb-10 overflow-hidden ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ boxShadow: "0 25px 50px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
          <svg viewBox="0 0 700 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <defs>
              <linearGradient id="dramaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.32" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[40, 80, 120, 160, 200].map((y) => (
              <line key={y} x1="50" x2="680" y1={y} y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            ))}
            {/* Curve area */}
            <path d="M 50 180 Q 150 150 220 100 Q 280 70 340 90 Q 400 110 460 60 Q 540 40 600 150 L 680 200 L 50 200 Z" fill="url(#dramaGrad)" />
            {/* Curve line */}
            <path d="M 50 180 Q 150 150 220 100 Q 280 70 340 90 Q 400 110 460 60 Q 540 40 600 150 L 680 200" fill="none" stroke={ACCENT_DEEP} strokeWidth="2.5" />
            {/* Peak markers */}
            {[
              { x: 50, y: 180, label: "0" },
              { x: 220, y: 100, label: "8" },
              { x: 340, y: 90, label: "12" },
              { x: 460, y: 60, label: "16" },
              { x: 600, y: 150, label: "20" },
            ].map((p) => (
              <g key={p.label}>
                <circle cx={p.x} cy={p.y} r="6" fill={ACCENT} />
                <circle cx={p.x} cy={p.y} r="11" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.3" />
                <text x={p.x} y={p.y - 18} fill="rgba(0,0,0,0.55)" fontSize="11" textAnchor="middle" fontFamily="'Instrument Serif', serif" fontStyle="italic">
                  {p.label} min
                </text>
              </g>
            ))}
            {/* Y-axis label */}
            <text x="20" y="35" fill="rgba(0,0,0,0.45)" fontSize="11" fontFamily="'Instrument Serif', serif" fontStyle="italic">Spannung</text>
            <text x="20" y="50" fill="rgba(0,0,0,0.45)" fontSize="11" fontFamily="'Instrument Serif', serif" fontStyle="italic">hoch</text>
            <text x="20" y="200" fill="rgba(0,0,0,0.45)" fontSize="11" fontFamily="'Instrument Serif', serif" fontStyle="italic">niedrig</text>
          </svg>
        </div>

        {/* Phasen-Karten */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {DRAMA_POINTS.map((d, i) => (
            <article key={d.phase} className="relative bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.18)]" style={{ borderRadius: "1rem", boxShadow: "0 15px 30px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)", animationDelay: `${0.1 + i * 0.06}s` }}>
              <div className="flex items-baseline gap-3 mb-3">
                <span className={`${SERIF_ITALIC} text-2xl leading-none`} style={{ color: ACCENT }}>{d.time}</span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: ACCENT }}>{d.phase}</span>
              </div>
              <p className="text-sm text-foreground/65 leading-[1.6]">{d.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TECH-RIDER — page-eigener Twist
   ═══════════════════════════════════════════════════════════ */
const TechRiderSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className={`lg:col-span-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Für eure Eventplanung.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground mb-7">
              Tech-Rider.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Eine Seite. Alle Infos.</span>
            </h2>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8">
              Damit Eventagentur, Technik und Location-Manager genau wissen,
              was sie brauchen — und was ich selbst mitbringe. PDF auf
              Anfrage, hier die Kurzfassung:
            </p>
            <a href="mailto:el@magicel.de?subject=Tech-Rider%20Bühnenshow"
              className="hero-cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`, boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)" }}>
              Tech-Rider als PDF<ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className={`lg:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <div className="bg-white p-7 md:p-9" style={{ borderRadius: "1.25rem", boxShadow: "0 30px 60px -25px rgba(40,20,40,0.25), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              {[
                { Icon: Mic2, label: "Mikrofon", brauche: "Auf großer Bühne: Headset-Mikrofon (mein eigenes, falls nicht vorhanden)", bringe: "Headset Sennheiser EW-Serie, Reserve-Mikro" },
                { Icon: Music, label: "Sound", brauche: "Soundsystem mit XLR-Eingang, oder 3,5mm-Klinke. Bei kleinen Räumen: nichts.", bringe: "Eigenes Mini-PA-System (bis 60 Gäste), Backing-Track auf USB" },
                { Icon: Lightbulb, label: "Licht", brauche: "Frontspot oder normales Saal-Licht ausreichend. Spezielle Lichtprogrammierung nicht nötig.", bringe: "Bei Bedarf: Akku-LED-Spot für intime Settings" },
                { Icon: Cable, label: "Strom", brauche: "Eine Steckdose in Bühnen-Nähe. Mehr nicht.", bringe: "Verlängerungskabel, Mehrfachsteckdose" },
              ].map((row, i) => (
                <div key={row.label} className={`grid grid-cols-[44px_1fr] md:grid-cols-[52px_1fr_1fr] gap-4 ${i > 0 ? "border-t border-foreground/10 pt-5 mt-5" : ""}`}>
                  <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                    <row.Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
                  </span>
                  <div className="col-span-1 md:col-span-1">
                    <p className="text-[10px] tracking-[0.16em] uppercase font-bold mb-1.5" style={{ color: ACCENT }}>{row.label} — brauche</p>
                    <p className="text-sm text-foreground/75 leading-[1.55]">{row.brauche}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 md:border-l md:border-foreground/10 md:pl-4">
                    <p className={`${SERIF_ITALIC} text-[10px] tracking-[0.16em] uppercase font-semibold mb-1.5 text-foreground/55`}>bringe selbst</p>
                    <p className="text-sm text-foreground/70 leading-[1.55]">{row.bringe}</p>
                  </div>
                </div>
              ))}
              <div className="mt-7 pt-5 border-t border-foreground/10 flex flex-wrap gap-2">
                {["2 × 1,5 m Bühne", "30 Min Setup", "30 Min Soundcheck", "Versichert (5 Mio)", "DSGVO + AVV"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-foreground/65 bg-foreground/[0.04] border border-foreground/8">
                    {t}
                  </span>
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
   QUIZ
   ═══════════════════════════════════════════════════════════ */
const buehneQuizConfig: CustomQuizConfig = {
  anlass: "Bühnenshow",
  sectionEyebrow: "Format-Finder · Bühnenshow",
  sectionTitle: (<>Welche{" "}<span className={SERIF_ITALIC} style={{ color: ACCENT }}>Bühnen-Variante</span>{" "}passt?</>),
  sectionDesc: "Drei Fragen, eine konkrete Empfehlung — Highlight-Slot, Hauptshow oder Abendprogramm.",
  questions: [
    { id: "slot", eyebrow: "Frage 01 · Slot", title: <>Wie viel Bühnen-Zeit habt ihr?</>, hint: "Kompakter Highlight-Slot oder Hauptshow als Programmpunkt?", feedback: "Verstanden.", cols: 3, options: [
      { value: "kurz", label: "10–20 Min", sub: "Highlight zwischen Programmpunkten" },
      { value: "mittel", label: "25–40 Min", sub: "Hauptshow als Abendpunkt" },
      { value: "lang", label: "45–60 Min", sub: "Abendprogramm mit Pause" },
    ] },
    { id: "groesse", eyebrow: "Frage 02 · Saal", title: <>Wie groß ist der Saal?</>, hint: "Bei größeren Sälen Headset Pflicht, kleine Räume können ohne Mikro.", feedback: "Passt.", cols: 3, options: [
      { value: "klein", label: "bis 80 Gäste", sub: "Intimer Saal" },
      { value: "mittel", label: "80–250 Gäste", sub: "Hotel-Saal, Saal-Restaurant" },
      { value: "gross", label: "250+ Gäste", sub: "Großer Festsaal" },
    ] },
    { id: "ton", eyebrow: "Frage 03 · Tonalität", title: <>Welcher Ton?</>, hint: "Premium-zurückhaltend, warm-verbindend oder energetisch?", feedback: "Klingt stark.", cols: 3, options: [
      { value: "premium", label: "Premium · zurückhaltend", sub: "Mentaleffekte, Theater-Ton" },
      { value: "warm", label: "Warm · verbindend", sub: "Anekdoten, Mit-Publikum" },
      { value: "energetisch", label: "Energetisch · Show", sub: "Comedy, Standing Ovation" },
    ] },
  ],
  recommend: (a) => {
    const { slot, groesse, ton } = a;
    if (slot === "kurz") {
      return { format: "Bühnen-Highlight (10–20 Min)", sub: "Hook, zwei Effekte, Pointe-Finale", why: "Für Programmübergänge oder Award-Verleihungen. Sehr verdichtetes Format — ein Hook, ein Mentaleffekt mit Publikumsbeteiligung, eine starke Pointe als Übergabe.", link: "/buchung" };
    }
    if (slot === "lang" || groesse === "gross") {
      return { format: "Abendprogramm 45–60 Min", sub: "Mit Pause, dramaturgisch durchkomponiert", why: "Volle Bühnenshow mit Drama-Kurve — Hook, Aufbau, mehrere Peaks, Climax, Übergabe. Pause optional. Für Galas, Theater-Slots, Hochzeitsprogramm.", link: "/buchung" };
    }
    if (ton === "premium") {
      return { format: "Mentalmagie-Show (Premium-Ton)", sub: "Theater-Tonalität, weniger Comedy, mehr Wunder", why: "Bei Vorstandsdinner, Premium-Hochzeit oder Gala mit konservativem Publikum. Mentaleffekte, leise Pointen, drei Sekunden Stille nach dem Wow.", link: "/firmenfeiern" };
    }
    return { format: "Hauptshow 25–40 Min (Mix)", sub: "Comedy + Mental + Karten", why: "Das Standard-Format für mittlere Settings — abwechslungsreich, mit Comedy-Anteil, eingebauter Anekdote vom Auftraggeber, Standing-Ovation-Finale. Funktioniert vom Saal-Restaurant bis zur Galaabend-Halle.", link: "/buchung" };
  },
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN + TRUST + FAQ + CTA
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    { quote: "Es war einfach Mega! 200 Gäste — Emilian hat mit seiner Bühnenshow alle begeistert.", author: "Jan von Lehmann", role: "Bühnenshow · 200 Gäste", initial: "J" },
    { quote: "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt.", author: "Martina Senftl", role: "Bühnen-Event", initial: "M" },
    { quote: "Mit viel Charme und Witz hat er alle Gäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass.", author: "Katrin Raß", role: "Hochzeitsbühne", initial: "K" },
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
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>200+ Bühnen-Auftritten</span>.
          </h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {TRUST_ITEMS.map((it) => (
            <article key={it.name} className="group relative bg-white border border-foreground/8 rounded-2xl px-5 py-6 md:px-6 md:py-7 transition-all duration-500 hover:-translate-y-1">
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
            { num: "200+", label: "Events gesamt" },
            { num: "15–60", label: "Min Bühnen-Slot" },
            { num: "500+", label: "Gäste-Range" },
            { num: "Versichert", label: "Berufshaftpflicht inkl." },
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

const faqs = [
  { q: "Was kostet eine Bühnenshow?", a: "Der Preis hängt von Slot-Länge, Anreise und ggf. Übernachtung ab. Verbindliches Angebot nach kurzer Anfrage, ohne versteckte Kosten." },
  { q: "Was, wenn keine Bühne im Saal ist?", a: "Ich brauche keine Bühne im klassischen Sinn — eine freie Fläche von 2 × 1,5 m mit Sicht aufs Publikum reicht. Bei kleineren Räumen genügt eine markierte Auftrittsfläche." },
  { q: "Ist Headset / Mikrofon dabei?", a: "Auf Wunsch bringe ich Headset-Mikrofon und Mini-PA-System mit (für bis zu 60 Gäste). Bei größeren Sälen nutze ich euer Soundsystem mit XLR-Eingang." },
  { q: "Wie lang ist die Aufbauzeit?", a: "Setup 30 Minuten, Soundcheck 30 Minuten — also etwa 1 Stunde vor Showbeginn am Eventort. Bei einfachen Settings (kein Mikro) reicht oft 30 Min Gesamt." },
  { q: "Können wir vorab eine Probe machen?", a: "Pre-Show-Test mit Sound vor Ort ist Standard. Bei großen Events / TV-Aufzeichnungen auch Vorab-Probe mit der Bühnentechnik einen Tag früher möglich." },
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
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}>Macht eure Bühne zum Höhepunkt.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Bühnenshow{" "}<span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>buchen</span>.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort, Bühnen-Slot und Gästezahl — Antwort innerhalb 24 Stunden mit Konzept-Vorschlag und Tech-Rider.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/buchung?format=Bühnenshow" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90">
              Bühne anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
const SITE_URL = "https://www.magicel.de/buehnenshow";

const Buehnenshow = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Bühnenshow Zauberer — 15–60 Min Show für eure Gäste | Emilian Leber</title>
      <meta name="description" content="Bühnenshow-Zauberer in Bayern und deutschlandweit — durchkomponierte Show mit Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale. 15–60 Min, 50–500 Gäste, Tech-Rider auf Anfrage." />
      <meta name="keywords" content="Bühnenshow Zauberer, Magier Bühne, Stage Magic, Mentalist, Bühnenshow Hochzeit, Bühnenshow Firmenfeier, Gala-Magier, Theater-Magier, Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Bühnenshow Zauberer — 15–60 Min Show für eure Gäste | Emilian Leber" />
      <meta property="og:description" content="Durchkomponierte Bühnenshow mit Drama-Kurve. Tech-Rider auf Anfrage. 5,0★." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <DramaKurveSection />
        <TechRiderSection />
        <CustomQuizSection config={buehneQuizConfig} />
        <StimmenSection />
        <TrustZahlenSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Buehnenshow;
