import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Users,
  TrendingUp,
  MessageCircle,
  Magnet,
  Target,
  Mic2,
  Sparkles,
} from "lucide-react";

import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import closeupImg from "@/assets/closeup.jpg";

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
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.12)); } }
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

const HEADLINE_SANS = ["Messezauberer.", "3×"];
const HEADLINE_ITALIC = ["Stand-Traffic."];

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
        <img src={haendeImg} alt="Messemagier am Stand — Lead-Generator mit Magie" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%", filter: "saturate(0.92) contrast(1.08) brightness(0.7)" }} loading="eager" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 30%, rgba(8,6,12,0.5) 60%, rgba(8,6,12,0.25) 100%)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 65%)" }} />
        <div aria-hidden className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.1) 0%, rgba(199,144,66,0) 70%)" }} />
      </div>
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {BOKEH.map((b, i) => (
          <div key={i} className="absolute rounded-full hero-bokeh" style={{ width: b.size, height: b.size, left: b.left, top: b.top, background: `radial-gradient(circle, rgba(255,210,140,${b.o * 0.5}) 0%, rgba(255,210,140,${b.o * 0.4}) 40%, rgba(255,210,140,0) 75%)`, filter: "blur(2px)", animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
        ))}
      </div>
      <div className="relative z-10 min-h-screen container px-6 flex flex-col justify-between pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300 hero-star" style={{ animationDelay: `${i * 0.12}s` }} />))}</div>
              <span className="text-sm text-white/85"><strong className="font-semibold text-white">5,0</strong><span className="text-white/60"> · 30+ Bewertungen</span></span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span className="text-sm text-white/80"><strong className="font-semibold text-white">200+ Events</strong> · davon zahlreiche Messe-Engagements</span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Lead-Generator. Stand-Magnet. Conversion-Booster.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (<span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>{w}{" "}</span>))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (<span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>{w}{" "}</span>))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Ich spreche eure Messe-Besucher aktiv an, ziehe sie an euren
            Stand und übergebe sie warm an euer Sales-Team. Aus jedem
            Vorbeigehen wird ein Gespräch. Aus jedem Gespräch ein potenzieller
            Lead.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <Link to="/buchung?format=Messe-Magie" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95">
              Stand-Magier anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="mailto:el@magicel.de?subject=Messe-Anfrage" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors">
              Per Mail anfragen<ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]" style={{ animationDelay: "2.0s" }}>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">3–5×</strong><span className="text-white/65">mehr Stand-Traffic</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">15–60</strong><span className="text-white/65">Sek pro Lead</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg">2–8 h</strong><span className="text-white/65">Standzeit pro Tag</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">B2B + B2C Messen</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · WAS DAS BRINGT — KPI/ROI für Messen
   ═══════════════════════════════════════════════════════════ */
const KPIS = [
  {
    icon: Magnet,
    title: "3–5× mehr Stand-Traffic.",
    body: "Während alle anderen Stände mit Flyern winken, halte ich vorbeigehende Besucher mit einem Karten-Trick in 5 Sekunden auf. Ihr seid plötzlich der Stand, an dem alle stehen bleiben.",
  },
  {
    icon: Target,
    title: "Gezielte Übergabe an Sales.",
    body: "Ich qualifiziere im Smalltalk — wer interessiert ist, übergebe ich namentlich an euer Sales-Team. Wer nur staunt, geht weiter. Keine Energie auf falsche Leute verschwendet.",
  },
  {
    icon: MessageCircle,
    title: "Eisbrecher-Faktor.",
    body: "Vor allem auf B2B-Messen: viele Besucher trauen sich nicht, einfach den Stand zu betreten. Mit einer kleinen Magie-Aktion auf der Standkante ist die Schwelle in 30 Sekunden runter.",
  },
  {
    icon: TrendingUp,
    title: "Markenbotschaft eingebaut.",
    body: "Auf Wunsch baue ich eure Produkt-Story in eine Routine ein. Karten mit eurem Logo, ein Mentaleffekt mit eurer USP, ein Trick mit eurem Slogan als Pointe. Die Botschaft bleibt hängen.",
  },
];

const KpisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">Vier Hebel für Messe-ROI.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Was Magie am Messestand{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>tatsächlich bewirkt</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Messen sind teuer pro Quadratmeter — und der Erfolg hängt
              davon ab, wie viele Besucher tatsächlich auf eurem Stand landen.
              Genau da setze ich an.
            </p>
          </div>
        </div>

        {/* XL-Hero-Stat + Editorial-Text-Block (kein Card-Grid) */}
        <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* XL Stat Cluster */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Riesige Hintergrund-Zahl */}
              <p
                className="font-display font-black tabular-nums leading-[0.85] tracking-[-0.04em]"
                style={{
                  fontSize: "clamp(8rem, 22vw, 22rem)",
                  background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, ${ACCENT} 50%, #c79042 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                3×
              </p>
              <p
                className={`${SERIF_ITALIC} text-2xl md:text-3xl text-foreground/85 leading-snug max-w-sm mt-4`}
              >
                bis fünffacher Stand-Traffic, gemessen über zwölf Messen.
              </p>
              {/* Annotations / Stat-Hints */}
              <div className="mt-10 grid grid-cols-2 gap-5">
                {[
                  { num: "5 Sek.", label: "bis zum ersten Effekt" },
                  { num: "1–3 Min.", label: "qualifizierendes Gespräch" },
                  { num: "40 %", label: "fragen nach Folge-Events" },
                  { num: "Marken-Trick", label: "im Programm eingebaut" },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 pl-4 py-1" style={{ borderColor: ACCENT }}>
                    <p className="font-display text-xl md:text-2xl font-black text-foreground tabular-nums leading-none">{s.num}</p>
                    <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-1.5`}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Editorial-Text-Block mit 4 inline Paragraphen */}
          <div className="lg:col-span-7 space-y-8">
            {[
              { eyebrow: "Magnet", title: "Mehr Stand-Traffic.", body: "Während alle anderen Stände mit Flyern winken, halte ich vorbeigehende Besucher mit einem Karten-Trick in 5 Sekunden auf. Ihr seid plötzlich der Stand, an dem alle stehen bleiben." },
              { eyebrow: "Filter", title: "Gezielte Sales-Übergabe.", body: "Ich qualifiziere im Smalltalk — wer interessiert ist, übergebe ich namentlich an euer Sales-Team. Wer nur staunt, geht weiter. Keine Energie auf falsche Leute verschwendet." },
              { eyebrow: "Brücke", title: "Eisbrecher-Faktor.", body: "Vor allem auf B2B-Messen trauen sich viele nicht, einfach den Stand zu betreten. Mit einer kleinen Magie-Aktion auf der Standkante ist die Schwelle in 30 Sekunden runter." },
              { eyebrow: "Marke", title: "Botschaft eingebaut.", body: "Auf Wunsch baue ich eure Produkt-Story in eine Routine ein. Karten mit eurem Logo, ein Mentaleffekt mit eurer USP, ein Trick mit eurem Slogan als Pointe — die Botschaft bleibt hängen." },
            ].map((k, i) => (
              <div
                key={k.title}
                className={`relative pl-7 pb-7 ${i < 3 ? "border-b border-foreground/10" : ""}`}
                style={{ borderLeft: `3px solid ${ACCENT}` , marginLeft: 0 }}
              >
                <p className="text-[11px] tracking-[0.16em] uppercase font-bold mb-1.5" style={{ color: ACCENT }}>
                  {k.eyebrow}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                  {k.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-2xl">
                  {k.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · WIE DAS ABLÄUFT — Stand-Routine als Process
   ═══════════════════════════════════════════════════════════ */
const ABLAUF = [
  {
    num: "01",
    title: "Briefing zum Produkt.",
    body: "Vor der Messe ein 30-Min-Call mit eurem Marketing oder Sales: was ist eure USP, welches Argument soll im Trick eingebaut werden, welche Personas sind eure Hauptzielgruppe.",
  },
  {
    num: "02",
    title: "Anspruchsvolle Vorab-Routine.",
    body: "Ich baue ein bis zwei Routinen, die euer Marken-Argument zum Pointe-Moment machen. Pre-Show-Tests, damit am Messe-Tag nichts wackelt.",
  },
  {
    num: "03",
    title: "Stand-Walk-Around am Tag.",
    body: "Auf der Standkante stehen, vorbeigehende Besucher freundlich ansprechen, mit einem 30-Sekunden-Effekt aufhalten. Mehr-Schicht-Logik: leichte Tricks für Walk-by, tiefere Routinen wenn Interesse da ist.",
  },
  {
    num: "04",
    title: "Warm-Hand-Übergabe.",
    body: "Sobald jemand qualifiziert wirkt, übergebe ich namentlich an euer Sales-Team. Beispiel: [Frau Schmidt, das ist Herr Müller von der Firma X, er interessiert sich für…] — und Sales kann sofort einsteigen.",
  },
  {
    num: "05",
    title: "Recap am Abend.",
    body: "Tagesabschluss mit dem Marketing-Lead: was hat funktioniert, welche Fragen kamen häufig, welche Argumente haben gezogen. Anpassung für Tag 2.",
  },
];

const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(30,8%,98.5%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">So läuft das ab.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Fünf Schritte zum{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Stand-Lead-Magneten</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Nicht einfach Magier hinstellen und Karten zeigen — sondern ein
              durchdachter Prozess, der euer Sales-Team aktiv unterstützt.
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {ABLAUF.map((a, i) => (
            <article key={a.num} className="relative bg-white p-6 md:p-7 flex flex-col h-full transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.18)]" style={{ borderRadius: "1rem", boxShadow: "0 15px 30px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)", animationDelay: `${0.1 + i * 0.06}s` }}>
              <span className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-none mb-5 block`} style={{ color: ACCENT }}>{a.num}</span>
              <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-tight mb-3">{a.title}</h3>
              <p className="text-sm text-foreground/65 leading-[1.6]">{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · WO DAS FUNKTIONIERT — Messetypen
   ═══════════════════════════════════════════════════════════ */
const MESSETYPEN = [
  { Icon: Users, title: "Fach-Messen B2B", body: "IT, Industrie, Bau, Handwerk, Healthcare — überall wo es um qualifizierte Leads geht, nicht um Massenpublikum." },
  { Icon: Target, title: "Consumer-Messen B2C", body: "Möbel, Autos, Reise, Hochzeit, Garten — Besucher mit Kaufabsicht, die zwischen vielen Anbietern wählen müssen." },
  { Icon: Sparkles, title: "Außenstände & Roadshow", body: "Pop-Up auf Stadtplätzen, Mall-Promotions, Roadshow-Tour mit eurem Branding — Magie als Eyecatcher in lauten Umgebungen." },
  { Icon: Mic2, title: "Kongresse & Tagungen", body: "Als Energizer zwischen Vorträgen, am Stand des Hauptsponsors oder als Aktivierung beim Networking-Dinner." },
];

const MesseTypenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">Wo das funktioniert.</p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Vier{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Setting-Typen</span>.
          </h2>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {MESSETYPEN.map((m) => (
            <article key={m.title} className="relative bg-[hsl(30,8%,98.5%)] p-6 md:p-7 transition-all duration-500 hover:-translate-y-1" style={{ borderRadius: "1rem", boxShadow: "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                <m.Icon className="w-4 h-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground leading-tight mb-3">{m.title}</h3>
              <p className="text-sm text-foreground/65 leading-[1.6]">{m.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · MESSE-WOCHE — Editorial-Timeline (kreativer als Pricing-Cards)
   Eine typische Messe-Woche von Montag bis Sonntag
   ═══════════════════════════════════════════════════════════ */
const MESSEWOCHE = [
  { day: "Montag", time: "vorab", phase: "Briefing-Call", body: "30-Min-Call mit Marketing und Sales. Wir gehen die wichtigsten Produkt-Argumente durch, klären Zielgruppe, definieren die Routine, in die euer Argument gebaut wird." },
  { day: "Dienstag", time: "Anreise", phase: "Vor-Ort-Check", body: "Vor-Ort am Vortag. Stand inspizieren, Lichtsituation prüfen, mit eurem Standpersonal kurz alles abstimmen. Eine letzte Routine-Probe." },
  { day: "Mittwoch", time: "Tag 1", phase: "Erste Schicht", body: "8 Stunden auf dem Stand mit Pausen. Vormittags Walk-by-Tricks zum Anlocken, mittags die tiefere Routine für ernsthafte Interessenten. Abends 30-Min Recap mit eurem Sales-Lead." },
  { day: "Donnerstag", time: "Tag 2", phase: "Justierung", body: "Auf Basis von Tag 1 angepasst — was hat funktioniert, was nicht. Vielleicht andere Routine, andere Standposition, andere Tageszeit-Aufteilung. Mehr Conversions." },
  { day: "Freitag", time: "Tag 3", phase: "Closing-Day", body: "Letzter Messetag — viele Besucher kommen heute mit Kauf-Absicht. Magie als Closing-Tool: nach dem Effekt sind alle entspannt, Sales kann das Gespräch zum Abschluss bringen." },
  { day: "Wochenende", time: "Nachbereitung", phase: "Final-Recap", body: "Schriftlicher Report — was funktioniert hat, wie viele Leads qualifiziert wurden, welche Argumente am stärksten gezogen haben. Basis für die nächste Messe." },
];

const MesseWocheSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-white py-24 md:py-36 overflow-hidden">
      {/* Diagonaler Akzent-Streifen im Hintergrund */}
      <div
        aria-hidden
        className="absolute -left-20 top-1/4 w-[600px] h-[60px] -rotate-3 opacity-[0.04] pointer-events-none"
        style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
      />
      <div className="container px-6 relative">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">Eine Messe-Woche.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Sechs Tage. Sechs{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Akte</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Damit ihr seht, wie eine Zusammenarbeit über eine ganze
              Messewoche aussieht — vom ersten Briefing-Call bis zum
              schriftlichen Final-Recap.
            </p>
          </div>
        </div>

        {/* Vertikale Magazine-Liste mit gestaffeltem Layout */}
        <div className={`max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {MESSEWOCHE.map((m, i) => {
            const isOdd = i % 2 === 1;
            return (
              <article
                key={m.day}
                className={`grid md:grid-cols-12 gap-x-10 gap-y-4 py-10 md:py-14 ${
                  i < MESSEWOCHE.length - 1 ? "border-b border-foreground/10" : ""
                }`}
              >
                <div className={`md:col-span-3 ${isOdd ? "md:order-2" : ""}`}>
                  <p
                    className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-none mb-3`}
                    style={{ color: ACCENT }}
                  >
                    {m.day}
                  </p>
                  <p className="text-[11px] tracking-[0.18em] uppercase font-semibold text-foreground/45">
                    {m.time}
                  </p>
                </div>
                <div className={`md:col-span-9 ${isOdd ? "md:order-1 md:text-right" : ""}`}>
                  <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-3">
                    {m.phase}
                  </h3>
                  <p className={`text-base md:text-lg text-foreground/65 leading-[1.7] ${isOdd ? "md:ml-auto" : ""} max-w-2xl`}>
                    {m.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 text-center mt-14 max-w-2xl mx-auto`}>
          Halbtag, Tag, Mehrtages-Engagement, Roadshow — Festpreis pro
          Variante. Angebot nach Briefing-Call, GoBD-Rechnung, AVV verfügbar.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · FAQ
   ═══════════════════════════════════════════════════════════ */
const faqs = [
  { q: "Wie lange spreche ich pro Lead?", a: "Walk-by-Effekte: 15–30 Sekunden. Interesse erkannt: 1–3 Minuten qualifizierendes Gespräch. Wer dann noch will, geht zum Sales-Team. Wer nicht, weiß zumindest, dass es euch gibt." },
  { q: "Klappt das in lauten Messehallen?", a: "Ja — meine Tricks sind sichtbar statt akustisch. Ein verschwindender Würfel, eine wandernde Karte, ein Münzen-Vanish brauchen kein Mikrofon. Auf großen Bühnen-Slots im Messe-Forum nutze ich Headset." },
  { q: "Kann ich euer Logo / Produkt einbauen?", a: "Ja, sehr gern. Karten mit eurem Logo, ein Mentaleffekt mit eurer Produkt-USP, ein Trick mit eurem Slogan als Pointe. Vorab-Briefing und Test, damit es professionell wirkt." },
  { q: "Was wenn der Stand leer ist?", a: "Dann wechsele ich in den \"Pull\"-Modus: stelle mich an die Standkante, fange Passanten ab. Erfahrungsgemäß ist die erste Mittagsstunde am leersten — dafür haben wir eine Routine, um Traffic zu ziehen." },
  { q: "Wie ist das mit Versicherung und Rechnung?", a: "Standard-Berufshaftpflicht für Künstler, GoBD-konforme Geschäftsrechnung mit ausgewiesener USt, Zahlungsziel 14 Tage. AVV und Versicherungsnachweis auf Anfrage sofort verfügbar." },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">Häufige Fragen.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was Messeplaner<br /><span className={SERIF_ITALIC}>vorher fragen.</span>
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
   7 · FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.75) 50%, rgba(8,6,12,0.55) 100%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-8" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.13), transparent 60%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-6" style={{ background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)" }} />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">Für Messen und Roadshows.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Macht euren Stand zum{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>Gesprächsthema</span>.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Messe, Datum, Standgröße und Produkt-Argument —
            innerhalb 24 Stunden Konzept-Vorschlag inklusive Marken-Routine-Idee.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/buchung?format=Messe-Magie" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90">
              Stand-Magier anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="mailto:el@magicel.de?subject=Messe-Anfrage" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white">
              Per Mail<ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/messe-magier";

const MesseMagier = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Messe-Magier — Lead-Generator für euren Stand | Emilian Leber</title>
      <meta name="description" content="Zauberer als Lead-Generator und Stand-Magnet für Messen, Roadshows und Pop-Up-Aktionen. Spricht Besucher aktiv an, qualifiziert im Smalltalk, übergibt warm an euer Sales-Team. 3–5× mehr Stand-Traffic." />
      <meta name="keywords" content="Messe-Magier, Stand-Magier, Zauberer Messe, Lead-Generator Messe, Pop-Up Magier, Roadshow Künstler, Trade Fair Magician, Emilian Leber" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Messe-Magier — Lead-Generator für euren Stand | Emilian Leber" />
      <meta property="og:description" content="Zauberer der Besucher zum Stand zieht. 3–5× mehr Traffic, warme Lead-Übergabe an Sales." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <KpisSection />
        <AblaufSection />
        <MesseTypenSection />
        <MesseWocheSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default MesseMagier;
