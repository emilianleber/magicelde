import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { QuizWizardInline, QuizConfig } from "@/components/landing/QuizWizard";
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
  Camera,
  Music2,
  Cake,
  Flame,
  Gem,
  TreePine,
  Sun,
  Smile,
  Mic2,
  Check,
  ShieldCheck,
  Clock,
  MapPin,
  FileText,
} from "lucide-react";

import heroHochzeitImg from "@/assets/hero-hochzeit-stock.jpg";
import weddingMagicImg from "@/assets/wedding-magic.jpg";
import closeupImg from "@/assets/closeup.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import staunenImg from "@/assets/staunen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import buehneShowImg from "@/assets/hero-magic.jpg";

/* ─── CI v3 Design Tokens ───────────────────────────────────
 * Smaragd · Amber · Burgunder · Cream — mono pro Gradient.
 * Burgunder ist die EINE Akzentfarbe.                                */
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";

const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const EMERALD_DEEP = "#0e3d2a";
const AMBER_MID = "#c79042";
const AMBER_SOFT = "#f0d8a8";
const CREAM = "#fafafa";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — identisches Pattern wie Magic Dinner
   Vollbild dark backdrop · word-by-word reveal · warmes Amber-Bokeh
   · Scroll-Parallax · Star-Pulse · KPI-Strip mit Overshoot
   Konsistent über alle Hauptseiten — nur Inhalt page-spezifisch.
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
const HEADLINE_ITALIC = ["eure", "Hochzeit."];

// Bokeh — warme Kerzenlicht-Partikel, identisch zu Magic Dinner
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

      {/* Vollbild Hochzeits-Backdrop mit Zoom-In Entrance */}
      <div
        ref={photoRef}
        className="absolute inset-0 hero-photo-wrap hero-zoom"
        style={{ willChange: "transform" }}
      >
        <img
          src={heroHochzeitImg}
          alt="Hochzeit mit Zauberkünstler Emilian Leber — Magie zwischen Ja-Wort und Mitternacht"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 25%",
            filter: "brightness(0.78)",
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
          className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
          }}
        />
      </div>

      {/* Bokeh — warme Kerzenlicht-Partikel */}
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

      <div className="relative z-10 min-h-[78vh] md:min-h-screen container px-6 flex flex-col justify-center md:justify-between pt-28 md:pt-32 pb-10 md:pb-20">
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
              <strong className="font-semibold text-white">100+ Hochzeiten</strong> begleitet
            </span>
          </div>

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
            Magie zwischen euren Gästen während Sektempfang und Dinner, eine
            moderierte Bühnenshow vor dem Tanz — einzeln buchbar, kombiniert
            oder als roter Faden über den ganzen Tag. Eure Gäste reden noch
            in zehn Jahren davon.
          </p>

          <div
            className="mt-10 inline-flex flex-col sm:flex-row items-center sm:items-center gap-4 hero-fade"
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
              to="/buchung"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Direkt anfragen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hero KPI-Strip — minimal inline */}
        <div className="relative mt-20 md:mt-28">
          <div
            className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]"
            style={{ animationDelay: "2.0s" }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">100+</strong>
              <span className="text-white/65">Hochzeiten</span>
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
   2 · DREI-AKTE-REPORTAGE — die Imagination
   Anders als Magic Dinner Sticky-Sidebar-Timeline:
   – 3 full-bleed Panels, alternierend Foto-links / Foto-rechts
   – jedes Panel hat eigene Stimmung: Tageslicht / Kerzenlicht / Stagelight
   – nicht scroll-aktiv getriggert, sondern als breite Magazin-Reportage
   – jedes Panel hat einen kleinen italic-serif Akt-Marker
   ═══════════════════════════════════════════════════════════ */
const AKTE = [
  {
    nr: "I",
    label: "Erster Akt",
    time: "Sektempfang",
    title: "Während ihr Fotos macht.",
    body:
      "Die Trauung ist vorbei, ihr seid mit dem Fotografen unterwegs — und die 80 Gäste stehen ratlos im Foyer. Genau da übernehme ich. Karten in der Hand der Brautmutter, ein Eisbrecher zwischen den Familien, die sich heute zum ersten Mal sehen.",
    pull: "Die Tante eurer Seite und sein Trauzeuge — fünf Minuten später lachen sie gemeinsam.",
    img: weddingMagicImg,
    imgAlt:
      "Hochzeits-Sektempfang mit Zauberkünstler Emilian Leber — Karten zwischen den Hochzeitsgästen",
    duration: "30 – 60 Min",
    badge: "Walk-Around",
    glow: "rgba(228,184,192,0.4)", // rose
  },
  {
    nr: "II",
    label: "Zweiter Akt",
    time: "Hochzeitsdinner",
    title: "Zwischen den Gängen.",
    body:
      "Zwei Wege: Tisch-zu-Tisch fünf bis sieben Minuten pro Runde, getaktet mit dem Service — Trauzeugen-Tisch, Eltern-Tisch, alte Schulfreunde, jeder bekommt seine eigene kleine Show. Oder eine moderierte Bühnen-Einlage zwischen den Gängen, einmal für alle gleichzeitig. Welcher Weg passt, hängt von Gästezahl und Tischanordnung ab.",
    pull: "Tisch-zu-Tisch oder Bühne — entscheidet ihr nach Gästemix.",
    img: closeupImg,
    imgAlt:
      "Magie beim Hochzeitsdinner — Tisch-zu-Tisch oder Bühnen-Einlage zwischen den Gängen",
    duration: "5 – 25 Min",
    badge: "Tisch oder Bühne",
    glow: "rgba(0,0,0,0.024)", // amber
  },
  {
    nr: "III",
    label: "Dritter Akt",
    time: "Vor dem Hochzeitstanz",
    title: "Der gemeinsame Wow-Moment.",
    body:
      "Alle sind satt, der Eröffnungstanz steht bevor — perfekter Slot für eine kompakte Bühnenshow. Fünfzehn bis dreißig Minuten, abgestimmt auf eure Story, mit eingebauten Anekdoten. Optional ein Trauring-Moment, der alle zum Staunen bringt.",
    pull: "Standing Ovations vor dem ersten Walzer. Mehr Übergabe geht nicht.",
    img: buehneZuschauerImg,
    imgAlt:
      "Hochzeits-Bühnenshow vor dem Eröffnungstanz — Standing Ovations der Gäste",
    duration: "15 – 30 Min",
    badge: "Bühnen-Finale",
    glow: "rgba(0,0,0,0.040)", // burgundy
  },
];

const DreiAkteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-white">
      {/* Section-Header */}
      <div className="container px-6 pt-24 md:pt-36 pb-12 md:pb-16">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Ein Tag, drei Energien.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Drei Akte.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Ein Tag.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Eine Hochzeit hat drei sehr unterschiedliche Stimmungen — vom
              gespannten Sektempfang bis zur ausgelassenen Tanzfläche. Magie
              passt in jeden Akt — als Close-Up zwischen euren Gästen, als
              moderierte Bühnenshow oder als Mix aus beidem.
            </p>
          </div>
        </div>
      </div>

      {/* Drei Panels — alternierend full-bleed */}
      <div className="space-y-0">
        {AKTE.map((a, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={a.nr}
              className={`relative grid lg:grid-cols-2 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.15}s` }}
            >
              {/* Photo Side */}
              <div
                className={`relative overflow-hidden h-[420px] md:h-[560px] lg:h-[720px] ${
                  reverse ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={a.img}
                  alt={a.imgAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-[1600ms] ease-out hover:scale-[1.04]"
                  loading="lazy"
                />
                {/* Soft vignette */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(8,6,12,0.45) 100%)",
                  }}
                />
                {/* Glow tint individuell pro Akt */}
                <div
                  aria-hidden
                  className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-2xl pointer-events-none mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle, ${a.glow} 0%, transparent 70%)`,
                  }}
                />
                {/* Akt-Marker (italic-serif gigantisch über dem Foto) */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 pointer-events-none">
                  <span
                    className={`font-normal text-white leading-none block`}
                    style={{
                      fontSize: "clamp(5rem, 10vw, 10rem)",
                      textShadow: "0 8px 30px rgba(0,0,0,0.45)",
                      opacity: 0.92,
                    }}
                  >
                    {a.nr}
                  </span>
                </div>
                {/* Duration-Badge bottom-right Glass */}
                <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7">
                  <div
                    className="relative rounded-2xl px-4 py-3 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(155deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.14) 60%, rgba(255,255,255,0.06) 100%)",
                      backdropFilter: "blur(28px) saturate(170%)",
                      WebkitBackdropFilter: "blur(28px) saturate(170%)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      boxShadow:
                        "0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.55)",
                    }}
                  >
                    <p
                      className={`text-[11px] text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] mb-0.5`}
                    >
                      {a.badge}
                    </p>
                    <p className="font-display text-sm md:text-base font-bold text-white tabular-nums leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                      {a.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div
                className={`bg-white px-6 md:px-10 lg:px-16 py-14 md:py-20 lg:py-28 flex flex-col justify-center ${
                  reverse ? "lg:order-1" : ""
                }`}
              >
                <div className="max-w-lg">
                  <p
                    className="text-[11px] md:text-xs tracking-[0.18em] uppercase font-semibold mb-5"
                    style={{ color: ACCENT }}
                  >
                    {a.label} · {a.time}
                  </p>
                  <h3 className="font-display font-black tracking-[-0.015em] leading-[1.05] text-[clamp(1.75rem,3.5vw,3rem)] text-foreground mb-7">
                    {a.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/70 leading-[1.7] mb-9">
                    {a.body}
                  </p>
                  {/* Pull-line */}
                  <div
                    className="relative pl-5 md:pl-6"
                    style={{ borderLeft: `2px solid ${ACCENT}` }}
                  >
                    <p
                      className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/85 leading-[1.45]`}
                    >
                      {a.pull}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · POLAROID-WALL — Magic-Highlights als getiltete Polaroids
   Nicht wie Magic Dinner Karten-Fächer (eine Reihe gefächert):
   – 6 Polaroids in pseudo-zufälligem Scatter-Layout
   – jede Polaroid: photo + handgeschriebener-Stil Caption
   – Hover lift + entdreht leicht
   ═══════════════════════════════════════════════════════════ */
const POLAROIDS = [
  {
    img: haendeImg,
    alt: "Trauring-Moment beim Hochzeits-Auftritt",
    title: "Der Trauring auf Reisen.",
    note: "Verschwindet beim Brautvater, taucht beim Trauzeugen auf. Vorher abgestimmt, sicher zurück.",
    tag: "Show-Highlight",
    tilt: -4,
  },
  {
    img: emotionenImg,
    alt: "Insider-Karte mit Anekdote — Hochzeitsmagie",
    title: "Eine Karte mit eurem Geheimnis.",
    note: "Schul-Anekdote, Kosename, alte Wette — taucht auf einer Karte direkt am Tisch oder live auf der Bühne auf. Nur ihr und eure engsten Freunde verstehen den Witz.",
    tag: "Insider-Witz",
    tilt: 5,
  },
  {
    img: weddingMagicImg,
    alt: "Foto-Slot-Magie — Walk-Around während der Brautpaar-Fotos",
    title: "30 Min, in denen niemand wartet.",
    note: "Während ihr Fotos macht, übernehme ich euer Foyer. Alle haben ein Gesprächsthema, wenn ihr zurückkommt.",
    tag: "Foto-Slot",
    tilt: -6,
  },
  {
    img: closeupImg,
    alt: "Tisch-zu-Tisch-Magie beim Hochzeitsdinner",
    title: "Jeder Tisch, eine eigene Show.",
    note: "5 Min pro Tisch zwischen den Gängen. Trauzeugen, Eltern, Schulfreunde — niemand wird übergangen.",
    tag: "Tisch-zu-Tisch",
    tilt: 3,
  },
  {
    img: buehneZuschauerImg,
    alt: "Hochzeits-Bühnenshow vor dem Eröffnungstanz",
    title: "Bühnen-Slot vor dem Walzer.",
    note: "Show als Vorprogramm zum Tanz. 20 Min Magie, eingebaute Brautpaar-Anekdote, Standing Ovation.",
    tag: "Vor dem Tanz",
    tilt: -3,
  },
  {
    img: buehneShowImg,
    alt: "Bühnen-Einlage zwischen den Gängen beim Hochzeitsdinner",
    title: "Eine Bühne zwischen den Gängen.",
    note: "Alternative zur Tisch-zu-Tisch: 10–15 Min moderierte Bühnen-Einlage während der Pause zwischen Vorspeise und Hauptgang. Eine Tafel, eine gemeinsame Pointe.",
    tag: "Dinner-Bühne",
    tilt: 6,
  },
];

const PolaroidWall = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          "radial-gradient(80% 90% at 20% 20%, #fdf6ec 0%, rgba(253,246,236,0) 70%), radial-gradient(70% 80% at 80% 80%, #fbeae2 0%, rgba(251,234,226,0) 70%), #ffffff",
      }}
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Sechs Momente aus echten Hochzeiten.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.02] text-[clamp(2.25rem,5.2vw,5.25rem)] text-foreground">
              Was Magie auf eurer Hochzeit{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                konkret bedeutet
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Damit ihr nicht abstrakt überlegen müsst: sechs Highlights aus
              echten Hochzeiten — als Close-Up unter euren Gästen, als
              Bühnen-Moment für alle, oder kombiniert. Euer Tag bestimmt den Mix.
            </p>
          </div>
        </div>

        {/* Polaroid Grid — 2 / 3 Cols mit Tilts */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 max-w-6xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {POLAROIDS.map((p, i) => (
            <figure
              key={p.title}
              className="group relative bg-white p-3 md:p-4 transition-transform duration-500 hover:-translate-y-2 hover:rotate-0"
              style={{
                transform: `rotate(${p.tilt}deg)`,
                boxShadow:
                  "0 30px 60px -20px rgba(60,30,40,0.22), 0 8px 20px -8px rgba(60,30,40,0.12), inset 0 0 0 1px rgba(0,0,0,0.04)",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4 / 3" }}
              >
                <img
                  src={p.img}
                  alt={p.alt}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                />
                {/* Tag-Pill oben rechts */}
                <span
                  className="absolute top-3 right-3 text-[10px] tracking-[0.14em] uppercase font-bold px-2.5 py-1 rounded text-white"
                  style={{
                    background: "rgba(8,6,12,0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <figcaption className="px-1 pt-5 pb-3 md:pt-6 md:pb-4">
                <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-snug mb-2">
                  {p.title}
                </h3>
                <p
                  className={`text-sm md:text-base text-foreground/65 leading-[1.45]`}
                >
                  {p.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Footnote */}
        <p className={`text-center text-base md:text-lg text-foreground/55 mt-16 max-w-2xl mx-auto`}>
          Ihr habt eine Idee, die hier nicht steht? Schreibt sie mir.
          Ich entwickle gern etwas Eigenes für euren Tag.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · QUIZ — Hochzeits-spezifischer Format-Finder
   ═══════════════════════════════════════════════════════════ */
const hochzeitQuizConfig: QuizConfig = {
  anlass: "Hochzeit",
  sectionEyebrow: "Format-Finder",
  sectionTitle: (
    <>
      Findet euren{" "}
      <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
        Magie-Moment
      </span>
      .
    </>
  ),
  sectionDesc:
    "Fünf Fragen, eine Empfehlung — abgestimmt auf den Tagesablauf, eure Gäste-Mischung und die Stimmung, die ihr euch wünscht. Direkt absenden möglich, ohne Daten doppelt einzutippen.",
  questions: [
    {
      id: "groesse",
      shortLabel: "Hochzeitsgröße",
      title: (
        <>
          Wie{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            groß
          </span>{" "}
          wird eure Hochzeit?
        </>
      ),
      hint: "Bei kleinen Runden funktioniert intime Tisch-Magie, bei größeren Hochzeiten lohnt sich auch eine Show vor allen Gästen.",
      cols: { md: 3 },
      options: [
        { value: "intim", label: "bis 40 Gäste", sub: "Engster Kreis · Familie + Trauzeugen" },
        { value: "mittel", label: "40 – 120 Gäste", sub: "Klassische Hochzeitsfeier" },
        { value: "groß", label: "120+ Gäste", sub: "Große Feier mit beiden Seiten" },
      ],
    },
    {
      id: "schwerpunkt",
      shortLabel: "Magie-Moment",
      title: (
        <>
          Wann soll die{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            Magie
          </span>{" "}
          passieren?
        </>
      ),
      hint: "Jeder Moment der Hochzeit hat eine andere Energie — wo wollt ihr den Magic-Moment platzieren?",
      cols: { md: 2, lg: 4 },
      options: [
        { value: "trauung", label: "Vor / nach der Trauung", sub: "Stille Magie als emotionaler Anker", icon: Flame },
        { value: "empfang", label: "Sektempfang & Fotosession", sub: "Während ihr Fotos macht — Eisbrecher für die Gäste", icon: Camera },
        { value: "dinner", label: "Beim Hochzeitsdinner", sub: "Tisch-zu-Tisch zwischen den Gängen", icon: Cake },
        { value: "abend", label: "Abendprogramm vor dem Tanz", sub: "Show-Highlight nach dem Dinner", icon: Music2 },
      ],
    },
    {
      id: "stil",
      shortLabel: "Hochzeitsstil",
      title: (
        <>
          Wie ist der{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            Stil
          </span>{" "}
          eurer Hochzeit?
        </>
      ),
      hint: "Damit der Auftritt zur Atmosphäre passt — von Scheunenfest bis Schloss.",
      cols: { md: 3 },
      options: [
        { value: "rustikal", label: "Rustikal-locker", sub: "Scheune, Garten, Festzelt — entspannt", icon: TreePine },
        { value: "klassisch", label: "Klassisch-elegant", sub: "Saal, weiße Tischdecken, festlich", icon: Gem },
        { value: "boho", label: "Boho / Sommer", sub: "Outdoor, Sonnenuntergang, locker-warm", icon: Sun },
      ],
    },
    {
      id: "gaeste",
      shortLabel: "Gästemix",
      title: (
        <>
          Wer sind eure{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            Gäste
          </span>
          ?
        </>
      ),
      hint: "Damit ich Magie wähle, die alle einbindet — egal ob Oma oder Trauzeuge.",
      cols: { md: 3 },
      options: [
        { value: "familien", label: "Familien-Fokus", sub: "Verwandte beider Seiten, alle Altersgruppen", icon: Heart },
        { value: "freunde", label: "Freunde-Fokus", sub: "Eure Crew, viele unter 40", icon: Users },
        { value: "mix", label: "Bunt gemischt", sub: "Familie, Freunde, Kollegen — alles dabei", icon: Smile },
      ],
    },
    {
      id: "wunsch",
      shortLabel: "Wunsch",
      title: (
        <>
          Was ist euch{" "}
          <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
            wichtig
          </span>
          ?
        </>
      ),
      hint: "Was zählt für euch als gelungener Hochzeitstag?",
      cols: { md: 2 },
      options: [
        { value: "verbinden", label: "Familienseiten verbinden", sub: "Zwei Familien lernen sich kennen", icon: Users },
        { value: "ruhe", label: "Ruhige, emotionale Momente", sub: "Nichts Lautes — kleine, stille Wunder", icon: Flame },
        { value: "wow", label: "Ein Wow-Moment für alle", sub: "Eine zentrale Show, die alle gemeinsam erleben", icon: Sparkles },
        { value: "rotfaden", label: "Magie über den ganzen Tag", sub: "Vom Sektempfang bis zum Tanz", icon: Music2 },
      ],
    },
  ],
  buildEmpfehlung: (a) => {
    const { schwerpunkt, gaeste, wunsch } = a;
    if (schwerpunkt === "trauung" || wunsch === "ruhe") {
      return {
        format: "Stille Magie zur Trauung",
        sub: "Kleine Wunder ohne Lärm · während Sektempfang oder Anstoßen",
        why: "Ruhige, emotionale Magie passend zum Moment — kein Showrummel, sondern intime Effekte, die zur Stimmung der Trauung passen. Karten, Münzen, ein verschwindender Trauring — kleine Wunder, die in Erinnerung bleiben.",
        link: "/close-up",
      };
    }
    if (schwerpunkt === "empfang" || wunsch === "verbinden" || gaeste === "familien") {
      return {
        format: "Close-Up beim Sektempfang",
        sub: "20–70 Min · während ihr Fotos macht",
        why: "Während Brautpaar und Fotograf unterwegs sind, unterhalte ich eure Gäste. Familie deiner Seite und seine — sofort haben alle ein Gesprächsthema. Magie ist der natürlichste Eisbrecher zwischen Menschen, die sich erst kennenlernen.",
        link: "/close-up",
      };
    }
    if (schwerpunkt === "dinner") {
      return {
        format: "Tisch-zu-Tisch beim Dinner",
        sub: "5–7 Min pro Tisch · zwischen den Gängen",
        why: "Während des Hauptgangs gehe ich von Tisch zu Tisch — jeder Tisch bekommt seine eigene Mini-Show. Trauzeugen, Eltern, alte Schulfreunde — alle haben gleich viel von der Magie, niemand wird übergangen.",
        link: "/close-up",
      };
    }
    if (schwerpunkt === "abend" || wunsch === "wow") {
      return {
        format: "Bühnenshow vor dem Hochzeitstanz",
        sub: "15–60 Min · nach dem Dinner, vor dem Eröffnungstanz",
        why: "Eine durchkomponierte Show, abgestimmt auf eure Story — mit eingebauten Anekdoten, vielleicht einem Trauring-Moment, der alle zum Staunen bringt. Genau dann zünden, wenn alle satt sind und auf den Tanz warten.",
        link: "/buehnenshow",
      };
    }
    return {
      format: "Magie über den ganzen Hochzeitstag",
      sub: "Sektempfang + Dinner + Show vor dem Tanz",
      why: "Ein roter Faden über euren Tag: Close-Up beim Empfang, Tisch-zu-Tisch im Dinner, eine kompakte Bühnenshow vor dem Tanz. Eure Gäste reden noch Wochen später davon.",
      link: "/buchung",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "intim" ? 30 : a.groesse === "mittel" ? 80 : a.groesse === "groß" ? 150 : null,
};

const QuizSection = () => <QuizWizardInline config={hochzeitQuizConfig} />;

/* ═══════════════════════════════════════════════════════════
   5 · VERTRAUENS-VERTRAG — Ringe in Sicherheit, Trauzeugen-Briefing
   DAS Hochzeit-Pain-Point, den keine andere Page adressiert.
   Layout: 2-Spalten — links Versprechen-Liste mit Check-Icons,
           rechts ein „Vertrag/Briefing"-Mockup mit Signature-Glass.
   ═══════════════════════════════════════════════════════════ */
const VERTRAGS_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Trauringe immer kontrolliert.",
    body:
      "Wenn ein Ring Teil der Show ist, läuft die Routine vorher mit Trauzeugen und Brautpaar durch. Versichert, doppelt abgesichert, ohne Risiko.",
  },
  {
    icon: FileText,
    title: "Schriftliches Briefing für Trauzeugen.",
    body:
      "Eine Woche vor dem Tag bekommen Trauzeugen ein Briefing — was sie wissen müssen, was sie zur Show beitragen, was geheim bleibt.",
  },
  {
    icon: Clock,
    title: "Service-Takt mit Küche & DJ.",
    body:
      "Eine Woche vorher Abgleich mit Hochzeitsplanerin, Küche und DJ. Ich brauche keinen extra Slot — ich arbeite in den vorhandenen Übergängen.",
  },
  {
    icon: Sparkles,
    title: "Notfall-Backup für jede Routine.",
    body:
      "Karten, Ringe, Gegenstände — jede Routine hat ein Reserve-Setup. Falls etwas schief geht, sieht es niemand. Heute Standard, früher Mal gelernt.",
  },
  {
    icon: Mic2,
    title: "Kein Mikrofon, kein Soundcheck nötig.",
    body:
      "Close-Up läuft komplett ohne Technik. Für Bühnenshow bringe ich Headset mit, wenn keins vorhanden — kein Stress mit eurem DJ.",
  },
];

const VertrauensSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Was ich euch vorab schriftlich zusichere.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Eure Ringe.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Eure Routine.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Eine Hochzeit ist nicht der Tag für Experimente. Was bei mir
              Standard ist — schriftlich, vorab, ohne Smalltalk-Versprechen.
              Damit ihr genau wisst, was ihr bucht.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Versprechen-Liste */}
          <div
            className={`lg:col-span-7 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <ul className="space-y-8 md:space-y-10">
              {VERTRAGS_ITEMS.map((v, i) => (
                <li
                  key={v.title}
                  className="grid grid-cols-[40px_1fr] md:grid-cols-[52px_1fr] gap-5 md:gap-6 items-start"
                >
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0"
                    style={{
                      background: "transparent",
                    }}
                  >
                    <v.icon
                      className="w-5 h-5 md:w-5.5 md:h-5.5"
                      style={{ color: ACCENT }}
                      strokeWidth={1.75}
                    />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span
                        className={`text-base md:text-lg shrink-0`}
                        style={{ color: ACCENT }}
                      >
                        0{i + 1}
                      </span>
                      <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
                        {v.title}
                      </h3>
                    </div>
                    <p className="text-base text-foreground/65 leading-[1.65] max-w-xl">
                      {v.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Briefing-Mockup als Card */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="relative bg-white p-8 md:p-10 transition-transform duration-500 hover:-translate-y-1"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 50px 100px -30px rgba(0,0,0,0.175), 0 15px 35px -15px rgba(0,0,0,0.090), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Letter-Style Header */}
              <div className="flex items-start justify-between mb-7">
                <div>
                  <p
                    className={`text-sm text-foreground/55 mb-1`}
                  >
                    Briefing — vertraulich
                  </p>
                  <p className="font-display text-xl md:text-2xl font-black text-foreground leading-tight">
                    An die Trauzeugen
                  </p>
                </div>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded"
                  style={{ background: "rgba(0,0,0,0.040)", color: ACCENT }}
                >
                  1 Wo. vorher
                </span>
              </div>

              {/* Briefing-Inhalt */}
              <dl className="space-y-5 border-t border-foreground/10 pt-6 mb-7">
                {[
                  { k: "Ihr Cue", v: "Sobald die Brautmutter die Karte zeigt" },
                  { k: "Was geheim bleibt", v: "Der Trauring-Moment selbst" },
                  { k: "Eure Aufgabe", v: "Brautpaar 2 Schritte nach vorne holen" },
                  { k: "Im Notfall", v: "Hand auf die linke Schulter — Stop" },
                  { k: "Übergabe", v: "Ring zurück vor dem Hochzeitstanz" },
                ].map((m) => (
                  <div
                    key={m.k}
                    className="grid grid-cols-[110px_1fr] gap-4 items-baseline text-sm"
                  >
                    <dt
                      className={`text-foreground/55 leading-snug`}
                    >
                      {m.k}
                    </dt>
                    <dd className="text-foreground/85 font-medium leading-snug">
                      {m.v}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Signature-Block */}
              <div className="pt-6 border-t border-foreground/10">
                <p
                  className={`text-xs text-foreground/50 mb-3`}
                >
                  Unterschrieben
                </p>
                <div className="flex items-end justify-between">
                  <span
                    className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-none`}
                    style={{ color: ACCENT_DEEP }}
                  >
                    Emilian Leber
                  </span>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-foreground/45 font-semibold">
                    Zauberkünstler
                  </span>
                </div>
              </div>

              {/* Stempel-Detail */}
              <span
                aria-hidden
                className="absolute -bottom-5 right-7 w-20 h-20 rounded-full flex items-center justify-center rotate-[-12deg] pointer-events-none"
                style={{
                  border: `2px solid ${ACCENT}`,
                  background: "rgba(255,255,255,0.85)",
                  color: ACCENT,
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  lineHeight: 1.1,
                  textAlign: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.040)",
                }}
              >
                ohne
                <br />
                Risiko
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · LOCATION-SETUP — „Was ich brauche / Was ich mitbringe"
   Side-by-Side für Hochzeitsplanerinnen + Brautpaare, die
   sich fragen ob Magie zur Scheunenhochzeit / Schloss / Garten passt.
   ═══════════════════════════════════════════════════════════ */
const SETUP_LOCATIONS = [
  { icon: TreePine, label: "Scheune", note: "Genug Tische zum Durchkommen" },
  { icon: Gem, label: "Schloss / Saal", note: "Festliches Setting, klassisch" },
  { icon: Sun, label: "Garten / Outdoor", note: "Bei Sonne — robust, schattig wenn möglich" },
  { icon: Cake, label: "Restaurant", note: "Service-Abstimmung 1 Tag vorher" },
];

const SETUP_BRAUCHE = [
  "Eine Steckdose in Bühnen-Nähe — sonst nichts",
  "5 Minuten am Vortag oder morgens für Set-Up",
  "Eine kurze Abstimmung mit eurer Hochzeitsplanerin",
  "Wenn Bühne: ca. 2 × 1,5 m Auftrittsfläche",
];

const SETUP_BRINGE = [
  "Komplettes Karten-, Münzen- und Tischmaterial",
  "Headset-Mikrofon falls keins vor Ort",
  "Backup für jeden Trick, doppelte Routine",
  "Anreise mit Pufferzeit, im Anzug, ready zur Sekunde",
];

const LocationSetupSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Egal wo ihr feiert.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Eure Location,{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                mein Setup
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Scheune, Schloss, Garten, Restaurant — Magie funktioniert
              überall. Hier ist genau, was ich für euren Tag brauche, was ich
              selbst mitbringe und welche Locations bisher schon dran waren.
            </p>
          </div>
        </div>

        {/* Location-Chips */}
        <div
          className={`flex flex-wrap gap-3 mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {SETUP_LOCATIONS.map((l) => (
            <div
              key={l.label}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-foreground/[0.04] border border-foreground/8 transition-all duration-300 hover:bg-foreground/[0.07] hover:border-foreground/15"
            >
              <l.icon
                className="w-4 h-4"
                style={{ color: ACCENT }}
                strokeWidth={1.75}
              />
              <span className="font-display font-bold text-foreground text-sm">
                {l.label}
              </span>
              <span className="text-xs uppercase tracking-wide font-medium text-foreground/55">
                {l.note}
              </span>
            </div>
          ))}
        </div>

        {/* Split: Brauche / Bringe */}
        <div
          className={`grid md:grid-cols-2 gap-6 md:gap-8 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {/* Was ich brauche */}
          <div
            className="relative bg-[hsl(0,0%,98%)] p-8 md:p-10"
            style={{
              borderRadius: "1.25rem",
              boxShadow:
                "0 25px 50px -25px rgba(0,0,0,0.090), inset 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            <p
              className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: ACCENT }}
            >
              Was ich von euch brauche
            </p>
            <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-7">
              Eine Handvoll Sachen.
            </h3>
            <ul className="space-y-4">
              {SETUP_BRAUCHE.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-foreground/75 leading-[1.55]"
                >
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(0,0,0,0.040)",
                      color: ACCENT,
                    }}
                  >
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Was ich mitbringe — dunkle Variante zur Differenzierung */}
          <div
            className="relative text-white p-8 md:p-10 overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              background:
                "linear-gradient(135deg, #0c2218 0%, #133024 35%, #1f4d36 75%, #2a6a48 100%)",
              boxShadow: "0 35px 70px -25px rgba(14,61,42,0.55)",
            }}
          >
            {/* Soft glow */}
            <span
              aria-hidden
              className="absolute -top-16 -right-8 w-[320px] h-[320px] rounded-full blur-2xl opacity-50 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,200,90,0.4), transparent 65%)",
              }}
            />
            <p
              className="relative text-[11px] tracking-[0.18em] uppercase font-semibold mb-5"
              style={{ color: AMBER_SOFT }}
            >
              Was ich selbst mitbringe
            </p>
            <h3 className="relative font-display text-xl md:text-2xl font-black leading-tight mb-7">
              Alles andere.
            </h3>
            <ul className="relative space-y-4">
              {SETUP_BRINGE.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-white/85 leading-[1.55]"
                >
                  <span
                    className="shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(243,217,168,0.18)",
                      color: AMBER_SOFT,
                    }}
                  >
                    <Check className="w-3 h-3" strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <p
              className={`relative text-base md:text-lg mt-8 pt-6 border-t border-white/15 text-white/80`}
            >
              Ihr macht nichts außer ein paar Anekdoten schicken.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · PLANERIN-XL-QUOTE — black full-bleed
   Eine zentrale Profi-Stimme als Trust-Anker
   ═══════════════════════════════════════════════════════════ */
const PlanerQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-28 md:py-40 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 -left-16 w-[560px] h-[560px] rounded-full blur-2xl opacity-8"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[560px] h-[560px] rounded-full blur-2xl opacity-6"
        style={{
          background:
            "radial-gradient(circle, rgba(228,184,192,0.45), transparent 60%)",
        }}
      />

      <div className="relative container px-6">
        <div
          className={`max-w-4xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/55 mb-9 text-center`}>
            Eine Hochzeitsplanerin sagt:
          </p>

          {/* XL Italic Quote Mark */}
          <span
            aria-hidden
            className={`block leading-none mb-[-1.5rem] md:mb-[-3rem] select-none text-center`}
            style={{
              fontSize: "clamp(6rem, 14vw, 13rem)",
              color: ACCENT,
              opacity: 0.55,
            }}
          >
            “
          </span>

          <blockquote className="text-center">
            <p className="font-display font-black tracking-[-0.015em] leading-[1.1] text-[clamp(1.75rem,4.2vw,3.5rem)]">
              Ich durfte eine Hochzeit planen, bei der Emilian als Zauberer
              aufgetreten ist — und es war{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
                wirklich großartig
              </span>
              . Mit viel Charme und Witz hat er alle Gäste begeistert.
            </p>

            <footer className="mt-12 flex items-center justify-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-white text-xl"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                }}
              >
                K
              </div>
              <div className="text-left">
                <p className="font-display font-bold text-white text-base">
                  Katrin Raß
                </p>
                <p className={`text-sm text-white/55`}>
                  Hochzeitsplanerin · Google-Bewertung
                </p>
              </div>
              <div
                aria-hidden
                className="hidden md:block ml-4 h-8 w-px bg-white/20"
              />
              <div className="hidden md:flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#e4b8c0] text-[#e4b8c0]"
                  />
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
   8 · BRAUTPAAR-STIMMEN — 2 weitere Reviews kompakt
   ═══════════════════════════════════════════════════════════ */
const BrautpaareStimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Es war genial, perfekt und mega gut. Die Gäste waren begeistert, die Kinder fanden es toll und wir auch.",
      author: "Petra Zeitler",
      role: "Brautpaar",
      initial: "P",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung sehr professionell. Gerne wieder.",
      author: "Martina Senftl",
      role: "Hochzeitskundin",
      initial: "M",
    },
  ];
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-14">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Stimmen aus der Brautpaar-Perspektive.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4vw,3.5rem)] text-foreground">
              Was andere{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Brautpaare
              </span>{" "}
              sagen.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-6">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Nicht nur Profis — auch die Gastgeber selbst. Zwei Stimmen aus
              kürzlich begleiteten Hochzeiten, beide echt, beide auf Google
              bzw. ProvenExpert.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-5 md:gap-7 ${
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
                className="text-base md:text-[17px] leading-[1.65] text-foreground/85 flex-1"
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
                    itemProp="author"
                    className="font-display font-bold text-foreground text-sm"
                  >
                    {r.author}
                  </p>
                  <p className="text-xs font-medium text-foreground/55 mt-0.5">
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
   9 · BUCHUNGS-FLOW — 4-Step Hochzeits-Pfad mit Sticky-Portrait
   Anders als Magic Dinner (Beispielabend-Reportage):
   – 4 Schritte mit echten Zeitpunkten (Heute / 1 Woche / Tag-vor / Tag-X)
   – Sticky-Portrait rechts auf Desktop
   – Scroll-aktiv mit Burgundy-fill-line
   ═══════════════════════════════════════════════════════════ */
const FLOW_STEPS = [
  {
    num: "01",
    tag: "Heute",
    title: "Eine kurze Anfrage.",
    body:
      "Datum, Ort, ungefähre Gästezahl — mehr braucht es zum Start nicht. Ich melde mich innerhalb 24 Stunden persönlich, kein Formular-Bot, keine Massenmail.",
  },
  {
    num: "02",
    tag: "Innerhalb 1 Woche",
    title: "30-Minuten-Call zum Tagesablauf.",
    body:
      "Wir gehen euren Tag durch — Trauung, Empfang, Dinner, Tanz. Ich höre eure Insider-Anekdoten, ihr bekommt schriftlich Slot, Format und Preis ohne versteckte Kosten.",
  },
  {
    num: "03",
    tag: "Eine Woche vor dem Tag",
    title: "Briefing-Übergabe an Trauzeugen.",
    body:
      "Falls eine personalisierte Routine geplant ist, geht das schriftliche Briefing an Trauzeugen + Hochzeitsplanerin. Service-Abgleich mit Küche / DJ direkt im Anschluss.",
  },
  {
    num: "04",
    tag: "Euer Hochzeitstag",
    title: "Ich bin pünktlich da. Ihr genießt.",
    body:
      "Anreise mit Pufferzeit, Set-up im Anzug, ready zur Sekunde. Während ihr Fotos macht, übernehme ich das Foyer. Ihr müsst nichts vorbereiten — ich kümmere mich um den Rest.",
  },
];

const BuchungsFlowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = stepRefs.current.findIndex((el) => el === entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting) {
            setActiveStep((prev) => Math.max(prev, idx));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fillPct = activeStep < 0 ? 0 : ((activeStep + 1) / FLOW_STEPS.length) * 100;

  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Vom Erstkontakt bis zum Ja-Wort.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Vier Schritte.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Kein Stress.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              So läuft die Zusammenarbeit von der ersten Anfrage bis zum
              Hochzeitstag. Damit ihr genau wisst, was wann passiert — und was
              ihr von mir erwartet.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* LEFT — Steps mit Scroll-Activation */}
          <div className="lg:col-span-7 relative">
            <div
              aria-hidden
              className="absolute left-[14px] md:left-[18px] top-4 bottom-4 w-px bg-foreground/12"
            />
            <div
              aria-hidden
              className="absolute left-[14px] md:left-[18px] top-4 w-[2px] -translate-x-[0.5px] origin-top transition-[height] duration-700 ease-out"
              style={{
                height: `calc(${fillPct}% - 1rem)`,
                background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                boxShadow: "0 0 12px rgba(0,0,0,0.040)",
              }}
            />
            <ol className="space-y-12 md:space-y-16">
              {FLOW_STEPS.map((s, i) => {
                const isActive = activeStep >= i;
                return (
                  <li
                    key={s.num}
                    ref={(el) => {
                      stepRefs.current[i] = el;
                    }}
                    className="relative pl-12 md:pl-16"
                  >
                    <div
                      className="absolute left-0 top-0 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center font-display font-black text-white text-[10px] md:text-xs transition-all duration-500 ease-out"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`
                          : "linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.32))",
                        boxShadow: isActive
                          ? "0 0 0 4px white, 0 0 24px rgba(0,0,0,0.040), 0 8px 22px -4px rgba(0,0,0,0.040)"
                          : "0 0 0 4px white, 0 4px 12px -3px rgba(0,0,0,0.18)",
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      {s.num}
                    </div>
                    <p
                      className={`text-base md:text-lg mb-2 transition-colors duration-500`}
                      style={{
                        color: isActive ? ACCENT : "rgba(0,0,0,0.42)",
                      }}
                    >
                      {s.tag}
                    </p>
                    <h3
                      className="font-display text-xl md:text-2xl font-bold leading-snug mb-4 transition-colors duration-500"
                      style={{
                        color: isActive ? "rgb(15,10,25)" : "rgba(0,0,0,0.45)",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-base md:text-[17px] leading-[1.7] max-w-xl transition-colors duration-500"
                      style={{
                        color: isActive ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {s.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* RIGHT — Sticky Portrait + Glass-Quote */}
          <div className="lg:col-span-5 lg:h-full">
            <div
              className="relative overflow-hidden lg:sticky lg:top-24 w-full"
              style={{
                borderRadius: "1.25rem",
                height: "min(72vh, 640px)",
                boxShadow:
                  "0 50px 100px -30px rgba(0,0,0,0.200), 0 15px 35px -15px rgba(0,0,0,0.100)",
              }}
            >
              <img
                src={portraitImg}
                alt="Zauberkünstler Emilian Leber — persönlicher Ansprechpartner für eure Hochzeit"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(8,6,12,0.78) 100%)",
                }}
              />
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
                    className={`text-white/80 text-sm md:text-base mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Persönlich.
                  </p>
                  <p className="font-display text-base md:text-lg text-white font-bold leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Kein Agent, kein Bot — ich antworte selbst.
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
   10 · TRUST-STRIP kompakt — Awards + TV-Stationen
   Kleiner als Magic Dinner: 5 items, dezenter, am Ende statt am Anfang.
   ═══════════════════════════════════════════════════════════ */
const TRUST_ITEMS = [
  { Icon: Trophy, name: "Greatest Talent", sub: "2023 · Finalist (TV)" },
  { Icon: Award, name: "Talents of Magic", sub: "2024 · Finalist + Kreativpreis" },
  { Icon: Medal, name: "Deutsche Jugendmeisterschaft", sub: "2024 · Top 30 Deutschland" },
  { Icon: Tv, name: "TVA", sub: "2025 · TV-Auftritt" },
  { Icon: Star, name: "ProvenExpert", sub: "5,0 ★ · 30+ Bewertungen" },
];

const TrustStripSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-20 md:py-28 border-b border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Wenn ihr noch Sicherheit braucht.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.5rem,3.5vw,2.75rem)] text-foreground">
            Bekannt aus TV, Wettbewerb und{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              200+ Events
            </span>
            .
          </h2>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {TRUST_ITEMS.map((it) => (
            <article
              key={it.name}
              className="bg-white border border-foreground/10 rounded-2xl px-5 py-6 md:px-6 md:py-7"
            >
              <div
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
                style={{
                  background: "transparent",
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
              <p className="text-xs font-medium text-foreground/55 leading-snug">
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
   11 · ZAHLEN INLINE — sehr kompakt
   ═══════════════════════════════════════════════════════════ */
const ZahlenInlineSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const stats = [
    { num: "100+", label: "Hochzeiten begleitet" },
    { num: "200+", label: "Events gesamt" },
    { num: "5,0 ★", label: "30+ Bewertungen" },
    { num: "24 h", label: "Antwortzeit" },
  ];
  return (
    <section
      ref={ref}
      className="bg-white py-14 md:py-16 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`flex flex-wrap items-baseline justify-center gap-x-10 gap-y-5 md:gap-x-16 ${
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
   12 · FAQ — Hochzeits-spezifisch, accordion
   ═══════════════════════════════════════════════════════════ */
const hochzeitFaqs = [
  {
    q: "Was kostet ein Auftritt zur Hochzeit?",
    a: "Der Preis hängt von Format, Dauer und Anreise ab. Nach kurzer Anfrage bekommt ihr ein verbindliches Angebot ohne versteckte Kosten — alles, was auf der Rechnung steht, war vorher schon im Angebot.",
  },
  {
    q: "Wie weit im Voraus sollten wir buchen?",
    a: "Ideal sind sechs bis zwölf Monate Vorlauf, vor allem bei Hochzeiten an Wochenenden im Sommer und im Dezember. Bei kurzfristigen Anfragen einfach trotzdem fragen — manchmal geht es noch, gerade bei Wochentags-Hochzeiten oder kleineren Runden.",
  },
  {
    q: "Bei welcher Gästezahl funktioniert das?",
    a: "Von zwanzig bis dreihundert plus Gästen alles möglich. Bei kleinen Runden bleibe ich länger pro Tisch und es entsteht eine Tafel-Atmosphäre. Ab sechzig Gästen empfehle ich, das Tisch-Programm mit einer kompakten Bühnenshow zu kombinieren — sonst werden manche Tische zu lange warten.",
  },
  {
    q: "Können wir Insider-Anekdoten einbauen?",
    a: "Sehr gern — das ist sogar einer der stärksten Effekte. Eine Schul-Anekdote, ein Kosename, eine alte Wette: schickt sie mir vorab, und sie tauchen subtil in der Show auf einer unmöglichen Karte auf. Nur ihr und eure engsten Freunde verstehen den Witz — die anderen staunen einfach.",
  },
  {
    q: "Was, wenn unsere Gäste sehr seriös sind?",
    a: "Genau die haben oft am meisten Spaß. Vorstandsvorsitzende, Anwälte, Großeltern — alle staunen, sobald die erste Karte verschwindet. Magie ist eine der wenigen Show-Formen, die alle Altersgruppen und Charaktere abholt.",
  },
  {
    q: "Wie ist es mit Kindern?",
    a: "Funktioniert wunderbar. Magie ist altersübergreifend — vom 6-Jährigen bis zur 90-jährigen Oma. Bei Bedarf baue ich für Kinder einen extra kurzen Moment ein, der altersgerecht ist.",
  },
  {
    q: "Wie sicher ist es mit unseren Trauringen?",
    a: "Wenn ein Trauring-Moment Teil der Show wird, läuft die Routine vorher mit Trauzeugen und Brautpaar durch. Backup-Setup für jeden Trick. Bisher in über hundert Hochzeiten kein verlorener Ring — und ich habe keine Lust, dass eure die ersten sind.",
  },
  {
    q: "Wo bist du buchbar?",
    a: "Mit Sitz in Bayern bin ich deutschlandweit buchbar — von München, Augsburg, Regensburg und Nürnberg bis Berlin, Hamburg, Frankfurt, Köln und Stuttgart. Anfahrt und Übernachtung stimmen wir individuell ab.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Häufige Fragen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was Brautpaare
            <br />
            <span>vor der Buchung fragen.</span>
          </h2>
        </div>

        <div
          className={`max-w-3xl border-t border-foreground/15 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {hochzeitFaqs.map((faq) => (
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
   13 · FINAL CTA — Black full-bleed
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
            "radial-gradient(circle, rgba(228,184,192,0.5), transparent 60%)",
        }}
      />

      <div className="relative container px-6">
        <div
          className={`max-w-3xl mx-auto text-center ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Macht euren Tag zum Tagesgespräch.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Eure Hochzeit.
            <br />
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              Drei Akte Magie.
            </span>
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Schickt mir Datum, Ort und Gästezahl — ich melde mich innerhalb 24
            Stunden persönlich mit einem Konzept-Vorschlag für euren Tag.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung"
              className="hz-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/95"
            >
              Termin sichern
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
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
   PAGE — Verkaufs-Reihenfolge:
   Hero → Imagination (3 Akte) → konkrete Tricks (Polaroids)
   → Quiz → Sicherheit (Vertrag) → Setup (Location)
   → Social Proof (Planerin + Brautpaare)
   → Easy Conversion (Buchungs-Flow) → Trust → Zahlen → FAQ → CTA
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/hochzeit";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Zauberer für Hochzeit — Sektempfang, Dinner, Bühne",
  name: "Zauberer für Hochzeit mit Emilian Leber",
  description:
    "Zauberer für Hochzeit in Bayern und deutschlandweit — drei Akte Magie zwischen Ja-Wort und Mitternacht. Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnenshow vor dem Tanz. 100+ Hochzeiten, 5,0 Sterne.",
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
  mainEntity: hochzeitFaqs.map((f) => ({
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
    { "@type": "ListItem", position: 2, name: "Hochzeit", item: SITE_URL },
  ],
};

const Hochzeit = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Zauberer für Hochzeit buchen — Drei Akte Magie | Emilian Leber
      </title>
      <meta
        name="description"
        content="Zauberer für Hochzeit in Bayern und deutschlandweit. Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnenshow vor dem Tanz. 100+ Hochzeiten, 5,0★. Kostenlos & unverbindlich anfragen."
      />
      <meta
        name="keywords"
        content="Zauberer Hochzeit, Hochzeitszauberer, Zauberer Hochzeit Bayern, Hochzeitszauberer München, Magier Hochzeit, Tischzauberer Hochzeit, Close-Up Hochzeit, Trauring Trick, Hochzeitsfeier Magier, Sektempfang Zauberer, Emilian Leber"
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
        content="Zauberer für Hochzeit buchen — Drei Akte Magie | Emilian Leber"
      />
      <meta
        property="og:description"
        content="Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Dinner, Bühnenshow. 100+ Hochzeiten, 5,0★ bei 30+ Bewertungen. Bayern & deutschlandweit."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:image:alt" content="Zauberer Emilian Leber bei einer Hochzeit" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Zauberer für Hochzeit buchen — Drei Akte Magie | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="Drei Akte Magie zwischen Ja-Wort und Mitternacht. 100+ Hochzeiten, 5,0★. Bayern & deutschlandweit."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee eyebrow="100+ Hochzeiten. Auch für." variant="cream" compact />
        <DreiAkteSection />
        <PolaroidWall />
        <QuizSection />
        <VertrauensSection />
        <LocationSetupSection />
        <PlanerQuoteSection />
        <BrautpaareStimmenSection />
        <BuchungsFlowSection />
        <TrustStripSection />
        <ZahlenInlineSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Hochzeit;
