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
} from "lucide-react";

import heroCloseupImg from "@/assets/hero-closeup.jpg";
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
            {HEADLINE_SANS.map((w, i) => (<span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>{w}{i < HEADLINE_SANS.length - 1 ? " " : ""}</span>))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (<span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>{w}{i < HEADLINE_ITALIC.length - 1 ? " " : ""}</span>))}
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
   HOLLYWOOD-SEQUENZ — 5-Step Trick als Page-Twist
   ═══════════════════════════════════════════════════════════ */
const SEQUENCE = [
  { step: "01", time: "0:00", title: "Ihr wählt eine Karte.", body: "Frei, ohne Druck. Ich blicke weg, ihr seht sie euch in Ruhe an. Niemand am Tisch sieht eure Wahl." },
  { step: "02", time: "0:15", title: "Karte zurück ins Deck.", body: "Mitten rein, ich mische. Das Deck wandert kurz auf den Tisch — niemand greift hin, niemand hält fest." },
  { step: "03", time: "0:45", title: "Ich frage nach einer Zahl.", body: "Sagt mir eine Zahl zwischen eins und zweiundfünfzig. Ihr sagt sie. Ich notiere sie nicht — ich höre nur." },
  { step: "04", time: "1:30", title: "Wir zählen Karten ab.", body: "Bis zu eurer gewählten Zahl. Die Karte an dieser Stelle wird umgedreht." },
  { step: "05", time: "2:00", title: "Es ist eure Karte.", body: "Die Tafel hält den Atem an. Ihr sucht den Trick, findet ihn nicht. Drei Sekunden Stille — dann brechen alle in Lachen aus." },
];

const HollywoodSequenzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Frame für Frame.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Wie ein Trick{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>am Tisch abläuft</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Damit ihr eine Vorstellung habt, was Close-Up tatsächlich
              bedeutet: ein typischer Trick in fünf Schritten. Zwei Minuten,
              fünf Augen, eine Pointe.
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {SEQUENCE.map((s, i) => (
            <article key={s.step} className="relative bg-[hsl(36,30%,97%)] p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.18)]" style={{ borderRadius: "1rem", boxShadow: "0 15px 30px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.04)", animationDelay: `${0.1 + i * 0.08}s` }}>
              <div className="flex items-baseline gap-3 mb-4">
                <span className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-none`} style={{ color: ACCENT }}>{s.step}</span>
                <span className={`${SERIF_ITALIC} text-sm text-foreground/45 tabular-nums`}>{s.time}</span>
              </div>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-snug mb-3">{s.title}</h3>
              <p className="text-sm text-foreground/65 leading-[1.6]">{s.body}</p>
            </article>
          ))}
        </div>

        <p className={`${SERIF_ITALIC} text-center text-base md:text-lg text-foreground/55 mt-14 max-w-3xl mx-auto`}>
          Das ist die Grundstruktur. Drumherum baue ich Anekdoten, Pointen,
          Ablenkung und Spannung. Aus zwei Minuten werden gefühlt zehn.
        </p>
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
  { q: "Was kostet Close-Up?", a: "Close-Up-Pakete starten ab 395 €. Endgültiger Preis hängt von Dauer (30 Min vs 3 Stunden) und Anreise ab. Verbindliches Angebot nach der Anfrage, ohne versteckte Kosten." },
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
        <EffektKatalogSection />
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
