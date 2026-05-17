import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import PageLayout from "@/components/landing/PageLayout";
import {
  CustomQuizSection,
  CustomQuizConfig,
} from "@/components/landing/CustomQuiz";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, ArrowUpRight, Star, Trophy, Award, Medal, Tv } from "lucide-react";

import moderatorImg from "@/assets/moderator-hero.jpg";
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

const HEADLINE_SANS = ["Durch", "den"];
const HEADLINE_ITALIC = ["Abend."];

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
        <img src={moderatorImg} alt="Moderation mit Emilian Leber — durch den Abend führen" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%", filter: "saturate(0.92) contrast(1.08) brightness(0.7)" }} loading="eager" />
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
            <span className="text-sm text-white/80"><strong className="font-semibold text-white">Moderation + Magie</strong> kombiniert</span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Vom Empfang bis zum Walzer.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (<span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>{w}{" "}</span>))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (<span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>{w}{" "}</span>))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Moderation eures Abends — Begrüßung, Programm-Übergaben,
            Award-Vergaben, Verabschiedung. Mit eingebauter Magie statt nur
            Ablesen. Charmant, präzise, mit dem richtigen Ton für jedes Setting.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <a href="#empfehlung" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95">
              Format-Finder<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link to="/buchung?format=Moderation" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors">
              Direkt anfragen<ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]" style={{ animationDelay: "2.0s" }}>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">3 – 4 h</strong><span className="text-white/65">Abend-Programm</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">4</strong><span className="text-white/65">Show-Phasen</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg">Magie</strong><span className="text-white/65">inkl.</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">Headset · TV-erfahren</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   SHOW-PHASEN — Timeline mit Zeitstempeln (creative twist)
   ═══════════════════════════════════════════════════════════ */
const PHASEN = [
  {
    time: "19:00 – 19:30",
    title: "Begrüßung.",
    body: "Empfangsmoderation am Sekt-Tisch oder im Saal: Ich begrüße eure Gäste persönlich, hebe die Stimmung, baue eine erste kleine Karten-Anekdote ein. Spätestens nach drei Minuten lacht der Saal.",
  },
  {
    time: "19:30 – 22:00",
    title: "Programm.",
    body: "Durch den Hauptteil führen: Awards übergeben, Reden anmoderieren, Auf- und Abgänge, Time-Keeping. Zwischen den Programmpunkten kurze Magie-Bridges, damit ihr nie ein Loch im Ablauf habt.",
  },
  {
    time: "22:00 – 22:30",
    title: "Übergänge.",
    body: "Der heikelste Moment: vom seriösen Award-Block zur Tanzfläche, von Vorstand-Reden zur Mitarbeiter-Party. Magie als Brücke zwischen Tonalitäten — und die Stimmung kippt nicht ab.",
  },
  {
    time: "23:30 – Ende",
    title: "Verabschiedung.",
    body: "Schlusswort, letzte Anekdote, Übergabe an DJ oder Band. Gäste verabschieden sich mit dem Gefühl, dass das mehr war als ein Abend mit Programmpunkten — sondern eine eigene kleine Geschichte.",
  },
];

const PhasenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-white py-24 md:py-36 overflow-hidden">
      {/* Hintergrund-Linie */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 h-px opacity-[0.06] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }}
      />
      <div className="container px-6 relative">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Vier Phasen, ein Abend.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Wie ich euch{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>durch den Abend</span>{" "}
              führe.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vier Phasen mit unterschiedlichen Tonalitäten — und Magie als
              Bindeglied zwischen Programmpunkten, das die Stimmung an keiner
              Stelle abreißen lässt.
            </p>
          </div>
        </div>

        {/* Horizontale Timeline mit alternierenden Karten */}
        <div className={`max-w-5xl mx-auto relative ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* Vertikale Verbindungslinie */}
          <div
            aria-hidden
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: `linear-gradient(180deg, ${ACCENT}30, ${ACCENT}10)` }}
          />
          {PHASEN.map((p, i) => {
            const isOdd = i % 2 === 1;
            return (
              <article
                key={p.title}
                className={`grid md:grid-cols-2 gap-6 md:gap-12 items-start pb-12 md:pb-16 relative`}
              >
                {/* Bubble auf der Linie */}
                <span
                  aria-hidden
                  className="absolute left-[14px] md:left-1/2 md:-translate-x-1/2 top-3 w-3 h-3 rounded-full ring-4 ring-white"
                  style={{ background: ACCENT, boxShadow: `0 6px 14px -4px rgba(154,38,64,0.5)` }}
                />
                <div className={`pl-12 md:pl-0 ${isOdd ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right"}`}>
                  <p
                    className={`${SERIF_ITALIC} text-2xl md:text-3xl leading-none mb-3`}
                    style={{ color: ACCENT }}
                  >
                    {p.time}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight">
                    {p.title}
                  </h3>
                </div>
                <div className={`pl-12 md:pl-0 ${isOdd ? "md:order-1 md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <p className={`text-base md:text-lg text-foreground/65 leading-[1.7] ${isOdd ? "md:ml-auto" : ""} max-w-md`}>
                    {p.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUIZ — Moderation-Empfehlung
   ═══════════════════════════════════════════════════════════ */
const modQuizConfig: CustomQuizConfig = {
  anlass: "Moderation",
  sectionEyebrow: "Format-Finder · Moderation",
  sectionTitle: (<>Welcher{" "}<span className={SERIF_ITALIC} style={{ color: ACCENT }}>Moderations-Slot</span>?</>),
  sectionDesc: "Drei Fragen, eine konkrete Empfehlung — von Empfangs-Moderation bis Award-Show.",
  questions: [
    { id: "anlass", eyebrow: "Frage 01 · Anlass", title: <>Was für ein Anlass?</>, hint: "Davon hängt Tonalität und Sprach-Stil ab.", feedback: "Spannend.", cols: 4, options: [
      { value: "gala", label: "Galaabend / Award-Show", sub: "Festlich · TV-Stil" },
      { value: "firma", label: "Firmen-Event", sub: "Vorstand · Sales-Kickoff" },
      { value: "hochzeit", label: "Hochzeit", sub: "Persönlich · charmant" },
      { value: "privat", label: "Privater Anlass", sub: "Geburtstag · Jubiläum" },
    ] },
    { id: "dauer", eyebrow: "Frage 02 · Dauer", title: <>Wie lange moderieren?</>, hint: "Komplettes Abend-Programm oder ein Slot?", feedback: "Passt.", cols: 3, options: [
      { value: "slot", label: "Ein Slot", sub: "15–30 Min Programm-Übergabe" },
      { value: "abend", label: "Ganzer Abend", sub: "3–4 h durchgehend" },
      { value: "block", label: "Mehrere Slots", sub: "Programm-Blocks mit Pausen" },
    ] },
    { id: "magie", eyebrow: "Frage 03 · Magie-Anteil", title: <>Soll Magie eingebaut sein?</>, hint: "Pure Moderation oder mit eingebauten Magie-Bridges?", feedback: "Verstanden.", cols: 2, options: [
      { value: "ja", label: "Ja, eingebaute Magie", sub: "Moderation + Tricks als Bridges" },
      { value: "nein", label: "Pure Moderation", sub: "Klassisch, ohne Magie-Anteil" },
    ] },
  ],
  recommend: (a) => {
    if (a.anlass === "gala") return { format: "Gala-/Award-Moderation", sub: "Festlich · klar · TV-Stil", why: "Galaabende brauchen ruhige Hand und genaues Time-Keeping. Award-Vergaben moderiert, Übergaben sauber, Magie-Bridges als seriöse Akzente.", link: "/buchung" };
    if (a.anlass === "hochzeit") return { format: "Hochzeits-Moderation", sub: "Persönlich · mit Brautpaar-Anekdoten", why: "Hochzeit braucht eine Moderation, die euer Brautpaar im Mittelpunkt hält — Anekdoten aus eurer Geschichte, Anmoderation von Reden, charmante Übergaben.", link: "/hochzeit" };
    if (a.dauer === "slot") return { format: "Slot-Moderation", sub: "15–30 Min Programm-Übergabe", why: "Kompakter Slot für Award-Vergabe oder Programm-Übergabe — schnell, präzise, mit einem eingebauten Mentaleffekt als Akzent.", link: "/buchung" };
    return { format: "Vollständige Abend-Moderation", sub: "3–4 h durchgehend, mit Magie-Bridges", why: "Komplette Moderation eures Abends inklusive aller Übergänge. Magie als Brücke zwischen Programm-Phasen — die Stimmung reißt nie ab.", link: "/buchung" };
  },
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN + TRUST + FAQ + CTA
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    { quote: "Mit viel Charme und Witz hat er alle Gäste begeistert und durch den Abend geführt.", author: "Katrin Raß", role: "Hochzeitsmoderation", initial: "K" },
    { quote: "Sympathischer junger Mann, der sich nicht selbst, sondern den Anlass in den Mittelpunkt stellt.", author: "Martina Senftl", role: "Event-Moderation", initial: "M" },
    { quote: "Es war einfach Mega! Emilian hat alle Gäste eines Versicherungs-Konzerns begeistert.", author: "Jan von Lehmann", role: "Gala-Moderation", initial: "J" },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Was Veranstalter sagen.</p>
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

const TrustSection = () => (
  <section className="bg-[hsl(36,30%,97%)] py-20 md:py-28 border-y border-foreground/10">
    <div className="container px-6">
      <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-5`}>Bekannt aus.</p>
        <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
          TV, Wettbewerb und{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Bühnen-Erfahrung seit 2016</span>.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
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
    </div>
  </section>
);

const faqs = [
  { q: "Wofür wird Moderation gebucht?", a: "Klassisch für Galaabende, Award-Shows, Firmen-Events, Hochzeiten und größere Geburtstagsfeiern. Überall, wo ein Abend einen roten Faden braucht und Übergänge zwischen Programmpunkten sauber moderiert werden sollen." },
  { q: "Was unterscheidet das von einem klassischen Moderator?", a: "Magie als Bridge zwischen Programmpunkten. Wenn der Award nicht pünktlich rüberkommt oder die Rede länger geht: ich überbrücke mit einem 30-Sekunden-Effekt, und keiner merkt das Loch im Ablauf." },
  { q: "Wie ist es mit Sprache und Tonalität?", a: "Auf eure Tonalität abgestimmt — Vorstandsabend anders als Hochzeit, Award-Show anders als Geburtstag. Vorab in einem 30-Min-Call genau klären, was passt und was nicht." },
  { q: "Technik und Equipment?", a: "Headset-Mikrofon bringe ich mit, wenn keins vor Ort. Eure Bühnentechnik nutze ich nach Absprache. Soundcheck 30 Min vor Programmbeginn." },
  { q: "Was kostet eine Moderation?", a: "Hängt von Dauer (Slot vs. ganzer Abend) und Magie-Anteil ab. Verbindliches Angebot nach kurzer Anfrage, ohne versteckte Kosten." },
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
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}>Plant euren Abend.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Moderation{" "}<span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>anfragen</span>.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort und Programm-Übersicht — Antwort innerhalb 24 Stunden mit Konzept-Vorschlag.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/buchung?format=Moderation" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90">
              Moderation anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
const SITE_URL = "https://www.magicel.de/moderation";

const Moderation = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Moderation mit Magie — Durch den Abend führen | Emilian Leber</title>
      <meta name="description" content="Moderation mit eingebauter Magie für Galaabende, Firmen-Events, Hochzeiten und Award-Shows. Charmant, präzise, mit dem richtigen Ton. TV-erfahren, Magie als Bridge zwischen Programmpunkten." />
      <meta name="keywords" content="Moderator mit Magie, Gala-Moderator, Hochzeitsmoderator, Firmen-Moderation, Award-Show Moderator, TV-Moderation, Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Moderation mit Magie — Durch den Abend führen | Emilian Leber" />
      <meta property="og:description" content="Moderation eures Abends mit eingebauter Magie. Charmant, präzise, TV-erfahren." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <PhasenSection />
        <CustomQuizSection config={modQuizConfig} />
        <StimmenSection />
        <TrustSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Moderation;
