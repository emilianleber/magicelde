import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import {
  CustomQuizSection,
  CustomQuizConfig,
} from "@/components/landing/CustomQuiz";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { captureEmail } from "@/lib/emailCapture";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Tv,
  Mic2,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertCircle,
  Mail,
  Send,
  Theater,
  Utensils,
  Users,
  Music,
  Wine,
  Armchair,
} from "lucide-react";

import heroStageImg from "@/assets/hero-stage.jpg";
import dinnerImg from "@/assets/hero-dinner.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import portraitCardsImg from "@/assets/emilian-portrait-cards.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";

const PREMIERE_LOCATION = "Alte Mälzerei Regensburg";
const PREMIERE_DATE = "22. Februar 2026";
const WALDWIESE_URL =
  "https://services.gastronovi.com/restaurants/108071/reservation/widget?event=135047";
const WALDWIESE_IMG =
  "https://restaurant-waldwiese.de/wp-content/uploads/2026/03/WIESE.png";

/* ═══════════════════════════════════════════════════════════
   HERO — dark + photo-backdrop + bokeh + word-by-word
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroZoomIn { from { transform: scale(1.18); opacity: 0.35; filter: blur(8px); } to { transform: scale(1.02); opacity: 1; filter: blur(0); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    @keyframes heroOvershoot { 0% { opacity: 0; transform: translateY(60px) scale(0.88); } 55% { opacity: 1; transform: translateY(-10px) scale(1.04); } 80% { transform: translateY(2px) scale(0.99); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.3)); } }
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

const HEADLINE_SANS = ["Magic", "Dinner"];
const HEADLINE_ITALIC = ["Tickets."];

const BOKEH = [
  { size: 22, left: "12%", top: "28%", dur: 14, delay: 0, o: 0.45 },
  { size: 14, left: "8%", top: "62%", dur: 18, delay: 2.5, o: 0.55 },
  { size: 28, left: "78%", top: "18%", dur: 16, delay: 1, o: 0.4 },
  { size: 18, left: "88%", top: "48%", dur: 20, delay: 3.5, o: 0.55 },
  { size: 12, left: "62%", top: "72%", dur: 13, delay: 4.5, o: 0.6 },
  { size: 24, left: "92%", top: "78%", dur: 17, delay: 1.8, o: 0.35 },
  { size: 10, left: "32%", top: "82%", dur: 19, delay: 6, o: 0.5 },
  { size: 16, left: "48%", top: "12%", dur: 22, delay: 5, o: 0.3 },
  { size: 20, left: "70%", top: "38%", dur: 15, delay: 7.5, o: 0.45 },
  { size: 14, left: "20%", top: "44%", dur: 21, delay: 8.5, o: 0.4 },
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
          el.style.setProperty(
            "--hero-parallax",
            `${Math.min(y * 0.18, 80)}px`,
          );
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
          src={heroStageImg}
          alt="Plötzlich Magie — Tour-Show 2026 mit Emilian Leber, Bühne mit warmem Spotlicht"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 28%",
            filter: "saturate(0.92) contrast(1.1) brightness(0.68)",
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
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
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
            <span
              aria-hidden
              className="hidden md:block h-4 w-px bg-white/25"
            />
            <span className="text-sm text-white/80">
              <strong className="font-semibold text-white">
                Premiere · 22. Februar 2026
              </strong>
              <span className="text-white/55"> · Alte Mälzerei Regensburg</span>
            </span>
          </div>
          <p
            className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`}
            style={{ animationDelay: "0.18s" }}
          >
            Plötzlich Magie — Magic Meets Comedy.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (
              <span
                key={`s-${i}`}
                className="hero-word"
                style={{
                  animationDelay: `${0.3 + i * 0.08}s`,
                  marginRight: "0.22em",
                }}
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
          <p
            className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade"
            style={{ animationDelay: "1.05s" }}
          >
            90 Minuten Show — Mentalmagie, Karten-Routinen und Comedy-Pointen.
            Premiere am 22.02.2026 in der Alten Mälzerei Regensburg, danach
            Tour durch bayerische Theater. Plus regelmäßige Magic-Dinner-Abende
            im Restaurant Wald &amp; Wiese in Sinzing.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#tour-daten"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Tour-Daten ansehen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#magic-dinner"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Magic-Dinner-Abende
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div
            className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]"
            style={{ animationDelay: "2.0s" }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                90
              </strong>
              <span className="text-white/65">Min Show</span>
            </span>
            <span aria-hidden className="text-white/30">
              ·
            </span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                22.02.2026
              </strong>
              <span className="text-white/65">Premiere</span>
            </span>
            <span aria-hidden className="text-white/30">
              ·
            </span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg">
                Alte Mälzerei
              </strong>
              <span className="text-white/65">Regensburg</span>
            </span>
            <span aria-hidden className="text-white/30">
              ·
            </span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                50+
              </strong>
              <span className="text-white/65">Plätze pro Termin</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   AKTUELLE TOUR-SHOW — dark Editorial-Split Hero-Card
   ═══════════════════════════════════════════════════════════ */
const AktuelleTourShowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-24 md:py-36 border-y border-foreground/10 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full blur-3xl opacity-12"
        style={{
          background:
            "radial-gradient(circle, rgba(199,144,66,0.3), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.4), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-10 items-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="lg:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-white/55 mb-6`}
            >
              Tour 2026 · Premiere.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] mb-7">
              Plötzlich Magie —{" "}
              <br />
              <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                Magic Meets Comedy.
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/75 leading-[1.7] mb-8 max-w-xl">
              Die erste abendfüllende Bühnenshow von Emilian Leber. 90 Minuten
              Mentalmagie, Karten-Routinen, Comedy-Pointen. Geschrieben für
              Theater- und Saalbühnen. Premiere am{" "}
              <strong className="text-white">{PREMIERE_DATE}</strong> in der{" "}
              <strong className="text-white">{PREMIERE_LOCATION}</strong> —
              anschließend Tour durch bayerische Theater bis 2027.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-9 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: "#f3d9a8" }} />
                90 Min · 1 Pause
              </span>
              <span aria-hidden className="text-white/25">
                ·
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: "#f3d9a8" }} />
                ab 12 Jahren
              </span>
              <span aria-hidden className="text-white/25">
                ·
              </span>
              <span className="inline-flex items-center gap-2">
                <Theater className="w-4 h-4" style={{ color: "#f3d9a8" }} />
                Theater- und Saalbühnen
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tour-daten"
                className="hero-cta inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c]"
                style={{
                  background: "#f3d9a8",
                  boxShadow: "0 18px 40px -14px rgba(199,144,66,0.3)",
                }}
              >
                <Ticket className="w-4 h-4" />
                Tour-Termine
              </a>
              <Link
                to="/buchung?format=Tour-Show&anlass=Premiere"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
              >
                Theater-Buchung anfragen
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <p
              className={`${SERIF_ITALIC} text-sm text-white/55 mt-7 max-w-md`}
            >
              Tour-Premiere — Theater-Veranstalter und Pressevertreter bitte über{" "}
              <a
                href="mailto:el@magicel.de"
                className="underline decoration-white/30 hover:decoration-white"
              >
                el@magicel.de
              </a>{" "}
              direkt anfragen.
            </p>
          </div>

          {/* Premiere-Ticket-Mockup */}
          <div className="lg:col-span-5">
            <div
              className="group relative block aspect-[3/4] max-w-sm mx-auto overflow-hidden transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]"
              style={{
                borderRadius: "1.25rem",
                background:
                  "linear-gradient(160deg, #1a0e16 0%, #08060c 60%, #2a0d18 100%)",
                boxShadow:
                  "0 60px 120px -30px rgba(0,0,0,0.6), 0 25px 50px -20px rgba(154,38,64,0.35), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <div className="absolute inset-x-0 top-0 p-6 flex items-center justify-between text-white/80">
                <span className="text-[10px] tracking-[0.22em] uppercase font-bold">
                  MagicEL · Premiere
                </span>
                <span
                  className={`${SERIF_ITALIC} text-sm`}
                  style={{ color: "#f3d9a8" }}
                >
                  N° 001
                </span>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <p
                  className="text-[10px] tracking-[0.22em] uppercase font-bold mb-4"
                  style={{ color: "#f3d9a8" }}
                >
                  Plötzlich Magie · Magic Meets Comedy
                </p>
                <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-[1.05] mb-3">
                  22.02
                  <br />
                  <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                    2026.
                  </span>
                </h3>
                <p className="text-sm text-white/65 max-w-[18ch] leading-snug mb-5">
                  Alte Mälzerei Regensburg · Einlass 19:00
                </p>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-bold"
                  style={{
                    background: "rgba(199,144,66,0.18)",
                    color: "#f3d9a8",
                    border: "1px solid rgba(199,144,66,0.4)",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Vorverkauf läuft
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white/55">
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold">
                  Premiere · Tour 2026
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-bold text-white/80 group-hover:text-[#f3d9a8] transition-colors">
                  <Ticket className="w-3.5 h-3.5" />
                  N° 001
                </span>
              </div>

              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-32 opacity-15"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
                }}
              />

              {/* Perforations-Linie als Ticket-Detail */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, rgba(255,255,255,0.25) 0 6px, transparent 6px 12px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TOUR-DATEN — Magazin-Liste mit Trennlinien (analog Pressemitteilungen)
   ═══════════════════════════════════════════════════════════ */
type TourDate = {
  date: string;
  city: string;
  venue: string;
  status: "Vorverkauf" | "Restkarten" | "Ausverkauft" | "Demnächst";
  kicker: string;
  body: string;
  ticketUrl?: string;
};

const TOUR_DATES: TourDate[] = [
  {
    date: "22. Februar 2026",
    city: "Regensburg",
    venue: "Alte Mälzerei · Galerie",
    status: "Vorverkauf",
    kicker: "Premiere · Tour 2026",
    body: "Tour-Premiere der abendfüllenden Show. 90 Minuten Mentalmagie und Comedy in einer der schönsten Veranstaltungs-Locations Regensburgs. Begrenzte Platzzahl, freie Sitzplatzwahl.",
  },
  {
    date: "14. März 2026",
    city: "München",
    venue: "Hofbräuhaus · Festsaal",
    status: "Vorverkauf",
    kicker: "Tour-Stop · 02",
    body: "Eine Stunde von Regensburg entfernt, im legendären Festsaal des Hofbräuhauses. Saal-Bestuhlung mit Tisch-Reihen, Getränke vom Wirtshaus, anschließender Ausklang an der Bar.",
  },
  {
    date: "11. April 2026",
    city: "Nürnberg",
    venue: "Tafelhalle · Bühnensaal",
    status: "Vorverkauf",
    kicker: "Tour-Stop · 03",
    body: "Die Tafelhalle ist Nürnbergs Bühne für Kleinkunst und Magie. Steile Tribüne, Sichtgarantie auf jedem Platz. Anschließendes Meet-and-Greet im Foyer mit Karten-Signatur.",
  },
  {
    date: "16. Mai 2026",
    city: "Augsburg",
    venue: "Parktheater · Großer Saal",
    status: "Restkarten",
    kicker: "Tour-Stop · 04",
    body: "Klassisches Theater-Setting mit Logen und Parkett. Wenige Restkarten in der hinteren Reihe — Frühbucher bekommen meist Front-Plätze. Idealer Termin für eine Anreise mit Übernachtung.",
  },
  {
    date: "27. Juni 2026",
    city: "Würzburg",
    venue: "Posthalle · Saal Süd",
    status: "Vorverkauf",
    kicker: "Tour-Stop · 05",
    body: "Tour-Sommer-Stopp in Würzburg. Die Posthalle bietet flexible Bestuhlung — Tisch-Reihen vorn, klassisches Parkett hinten. Familienfreundlich ab 12 Jahren.",
  },
  {
    date: "19. September 2026",
    city: "Passau",
    venue: "Scharfrichterhaus · Theatersaal",
    status: "Demnächst",
    kicker: "Tour-Stop · 06",
    body: "Herbst-Tour-Auftakt im Scharfrichterhaus Passau — eine der traditionsreichsten Kleinkunst-Bühnen Niederbayerns. Vorverkauf startet voraussichtlich Anfang Juli 2026.",
  },
  {
    date: "07. November 2026",
    city: "Ingolstadt",
    venue: "Stadttheater · Kleine Bühne",
    status: "Demnächst",
    kicker: "Tour-Stop · 07",
    body: "Bayerische Donau-Tour-Etappe mit einer Show in der Kleinen Bühne des Stadttheaters. Intimes Setting für maximal 220 Gäste — Vorverkauf nach Sommerpause.",
  },
  {
    date: "14. Februar 2027",
    city: "Regensburg",
    venue: "Alte Mälzerei · Galerie",
    status: "Demnächst",
    kicker: "Jubiläum · 1 Jahr Tour",
    body: "Ein-Jahres-Jubiläum der Premiere — zurück in die Alte Mälzerei mit neuen Routinen, erweitertem Programm und Gast-Auftritten. Vorverkauf startet Herbst 2026.",
  },
];

const STATUS_STYLES: Record<
  TourDate["status"],
  { bg: string; color: string; border?: string }
> = {
  Vorverkauf: {
    bg: "linear-gradient(135deg, #5c1622, #9a2640)",
    color: "#ffffff",
  },
  Restkarten: {
    bg: "linear-gradient(135deg, #8a5a14, #c79042)",
    color: "#ffffff",
  },
  Ausverkauft: {
    bg: "transparent",
    color: "rgba(0,0,0,0.55)",
    border: "1px solid rgba(0,0,0,0.18)",
  },
  Demnächst: {
    bg: "transparent",
    color: "#5c1622",
    border: "1px solid rgba(154,38,64,0.4)",
  },
};

const TourDatenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      id="tour-daten"
      ref={ref}
      className="bg-[hsl(40,25%,98.5%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Tour-Plan · 2026/2027.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Bayern,{" "}
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Stadt für Stadt.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Acht bestätigte Termine ab Februar 2026 — von der Premiere in
              der Alten Mälzerei bis zum Jubiläum 2027. Frühbucher bekommen
              die besten Plätze. Tickets pro Stadt direkt über die jeweilige
              Spielstätte.
            </p>
          </div>
        </div>

        <div
          className={`max-w-5xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {TOUR_DATES.map((t) => {
            const style = STATUS_STYLES[t.status];
            const disabled =
              t.status === "Ausverkauft" || t.status === "Demnächst";
            return (
              <article
                key={`${t.city}-${t.date}`}
                className="group grid md:grid-cols-[200px_1fr_auto] gap-x-8 gap-y-3 py-8 md:py-10 border-b border-foreground/15 items-baseline"
              >
                <div>
                  <span
                    className={`${SERIF_ITALIC} text-lg md:text-xl block leading-tight`}
                    style={{ color: ACCENT }}
                  >
                    {t.date}
                  </span>
                  <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/45 mt-1.5 inline-block">
                    {t.kicker}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-2">
                    {t.city}
                    <span className="text-foreground/40"> · </span>
                    <span className={`${SERIF_ITALIC} text-foreground/85`}>
                      {t.venue}
                    </span>
                  </h3>
                  <p className="text-base text-foreground/65 leading-[1.65] max-w-2xl mb-4">
                    {t.body}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {!disabled ? (
                      <Link
                        to={`/buchung?format=Ticket&anlass=${encodeURIComponent(t.city)}&datum=${encodeURIComponent(t.date)}`}
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase border-b pb-0.5 transition-colors"
                        style={{
                          color: ACCENT,
                          borderColor: "rgba(154,38,64,0.35)",
                        }}
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        Ticket sichern
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/45 border-b border-foreground/15 pb-0.5">
                        {t.status === "Demnächst"
                          ? "Vorverkauf folgt"
                          : "Ausverkauft"}
                      </span>
                    )}
                    <span aria-hidden className="text-foreground/25">
                      ·
                    </span>
                    <a
                      href="#newsletter"
                      className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/55 hover:text-foreground border-b border-foreground/20 hover:border-foreground/45 pb-0.5 transition-colors"
                    >
                      Termin merken
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="md:pl-4 md:text-right">
                  <span
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold whitespace-nowrap"
                    style={{
                      background: style.bg,
                      color: style.color,
                      border: style.border,
                    }}
                  >
                    {t.status}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-10 max-w-2xl`}
        >
          Stand {PREMIERE_DATE.split(".")[0]}. Mai 2026 · Termine ohne Gewähr ·
          Vorverkaufs-Tickets über die jeweilige Spielstätte oder direkt über{" "}
          <a
            href="mailto:el@magicel.de"
            className="underline decoration-foreground/30 hover:decoration-foreground"
          >
            el@magicel.de
          </a>
          .
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAGIC-DINNER-ABENDE — Editorial-Split mit Wald & Wiese
   ═══════════════════════════════════════════════════════════ */
const DINNER_TERMINE = [
  {
    date: "11. Juli 2026",
    label: "Summer Edition",
    sub: "Terrasse + Innenbereich · Drei-Gänge optional",
    status: "Vorverkauf",
  },
  {
    date: "19. September 2026",
    label: "Herbst Edition",
    sub: "Wild-Menü auf Wunsch · Innenraum",
    status: "Vorverkauf",
  },
  {
    date: "14. November 2026",
    label: "Winter Edition",
    sub: "Glühwein-Aperitif · Kerzenschein",
    status: "Demnächst",
  },
  {
    date: "16. Januar 2027",
    label: "Neujahrs Edition",
    sub: "Drei-Gänge inklusive · After-Show-Bar",
    status: "Demnächst",
  },
];

const MagicDinnerAbendeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const SUMMER = DINNER_TERMINE[0];
  const REST = DINNER_TERMINE.slice(1);
  return (
    <section
      id="magic-dinner"
      ref={ref}
      className="bg-white py-20 md:py-28"
    >
      <div className="container px-6">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p
            className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-4`}
          >
            Aktueller Magic-Dinner-Abend.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,3.75rem)] text-foreground">
            Summer Edition.
          </h2>
        </div>

        {/* XL Featured Card — Summer Edition */}
        <Link
          to="/tickets/magic-dinner-summer-edition"
          className={`group grid lg:grid-cols-12 gap-x-10 gap-y-8 items-stretch ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio: "16/10",
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src={dinnerImg}
                alt="Magic Dinner Summer Edition im Restaurant Wald & Wiese Sinzing — Sommerabend mit Close-Up am Tisch"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                loading="lazy"
                style={{ objectPosition: "center 35%" }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.55))",
                }}
              />
              <span
                className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                }}
              >
                {SUMMER.status}
              </span>
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 text-white">
                <p
                  className={`${SERIF_ITALIC} text-base md:text-lg mb-1`}
                  style={{ color: "#f3d9a8" }}
                >
                  Wald & Wiese · Sinzing
                </p>
                <p className="font-display text-lg md:text-2xl font-bold leading-tight">
                  {SUMMER.label} · {SUMMER.date}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-bold mb-3"
              style={{ color: ACCENT }}
            >
              11. Juli 2026 · ab 19:00 Uhr
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-4">
              Tisch reservieren.
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Magic Dinner erleben.
              </span>
            </h3>
            <p className="text-base text-foreground/70 leading-[1.7] mb-5">
              Sommerabend im Restaurant Wald & Wiese. Du reservierst deinen
              Tisch wie sonst auch, isst à la carte aus der Sommerkarte — und
              während des Abends besuche ich euch persönlich mit Close-Up-
              Magie. Drei Sekunden Stille, dann lacht eure Tafel.
            </p>
            <ul className="space-y-2 mb-7 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <Utensils
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: ACCENT }}
                />
                À la carte aus der Sommerkarte
              </li>
              <li className="flex items-start gap-2">
                <Armchair
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: ACCENT }}
                />
                Max. 50 Plätze · 2–12 pro Tafel
              </li>
              <li className="flex items-start gap-2">
                <Wine
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: ACCENT }}
                />
                Weinbegleitung optional
              </li>
            </ul>
            <span
              className="inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white mt-auto"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              <Ticket className="w-4 h-4" />
              Details + Reservierung
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>

        {/* Sub-Liste der weiteren Editionen */}
        {REST.length > 0 && (
          <div className="mt-14 md:mt-20">
            <p
              className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5"
              style={{ color: ACCENT }}
            >
              Weitere Termine 2026 / 2027
            </p>
            <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
              {REST.map((d) => (
                <li
                  key={d.date}
                  className="grid grid-cols-[1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-8 py-5 md:py-6 items-baseline"
                >
                  <span
                    className="font-display text-base md:text-lg font-bold tabular-nums block"
                    style={{ color: ACCENT }}
                  >
                    {d.date}
                  </span>
                  <div>
                    <span className="font-display text-base md:text-lg font-bold text-foreground block">
                      {d.label}
                    </span>
                    <p className="text-sm text-foreground/55 mt-0.5">
                      {d.sub}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold whitespace-nowrap"
                    style={{
                      background:
                        d.status === "Vorverkauf"
                          ? `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`
                          : "transparent",
                      color:
                        d.status === "Vorverkauf"
                          ? "#ffffff"
                          : ACCENT_DEEP,
                      border:
                        d.status === "Vorverkauf"
                          ? "none"
                          : `1px solid ${ACCENT}55`,
                    }}
                  >
                    {d.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   TICKET-KATEGORIEN — asymmetrisches Bento, KEIN Bubble-Grid
   ═══════════════════════════════════════════════════════════ */
const CATEGORIES = [
  {
    no: "01",
    label: "Frühbucher",
    sub: "Last-Minute-Zone hinten · ab 8 Wochen vor Show",
    body: "Wer früh bucht, wählt frei. Kein Aufpreis, aber begrenztes Kontingent — Erfahrungswert: nach drei Wochen Vorverkauf weg.",
    note: "Verfügbar bei jedem Tour-Stopp.",
  },
  {
    no: "02",
    label: "Standard · Saal-Mitte",
    sub: "Beste Sicht auf Bühne und Karten-Details",
    body: "Das Standardticket — Mitte des Saals, leicht erhöhte Sicht-Position, Mikrofon-optimaler Klang. Etwa 60 % der Plätze pro Spielstätte fallen in diese Kategorie.",
    note: "Hauptkontingent · Sitzplatz frei wählbar.",
  },
  {
    no: "03",
    label: "Premium · Front-Reihe",
    sub: "Erste drei Reihen · direkter Karten-Blick",
    body: "Front-Reihen mit direkter Sicht auf die Karten-Routinen. Wer in der Premium-Zone sitzt, wird mit hoher Wahrscheinlichkeit Teil eines Effekts — namentlich begrüßt, in eine Routine eingebunden.",
    note: "Pro Tour-Stopp 30–60 Plätze.",
  },
];

const TicketKategorienSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(40,25%,98.5%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Sitzplatz-Kategorien.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Drei Zonen.{" "}
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Eine Show.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Jeder Tour-Stopp arbeitet mit eigenem Saal-Plan und eigener
              Preisstruktur — die Kategorien selbst bleiben gleich. Konkrete
              Preise pro Spielstätte direkt im Vorverkauf der jeweiligen
              Bühne.
            </p>
          </div>
        </div>

        {/* Bento-Layout: Card 02 ist breit (Mitte), 01 und 03 schmaler */}
        <div
          className={`grid lg:grid-cols-12 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {/* Card 01 — Frühbucher (links, schmal) */}
          <article
            className="lg:col-span-4 relative bg-white p-7 md:p-9 flex flex-col h-[400px] md:h-[460px] transition-all duration-500 hover:-translate-y-1"
            style={{
              borderRadius: "1.25rem",
              boxShadow:
                "0 25px 50px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
            }}
          >
            <div className="flex items-baseline gap-3 mb-7">
              <span
                className={`${SERIF_ITALIC} text-3xl leading-none`}
                style={{ color: ACCENT }}
              >
                {CATEGORIES[0].no}
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/45">
                Last-Minute-Zone
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug mb-3">
              {CATEGORIES[0].label}
            </h3>
            <p className={`${SERIF_ITALIC} text-base text-foreground/55 mb-5`}>
              {CATEGORIES[0].sub}
            </p>
            <p className="text-[15px] text-foreground/65 leading-[1.65] mb-auto">
              {CATEGORIES[0].body}
            </p>
            <p className="text-[11px] tracking-[0.14em] uppercase font-bold text-foreground/40 mt-5 pt-5 border-t border-foreground/10">
              {CATEGORIES[0].note}
            </p>
          </article>

          {/* Card 02 — Standard (breit, dark) */}
          <article
            className="lg:col-span-5 relative p-7 md:p-9 flex flex-col h-[400px] md:h-[460px] text-white transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              background:
                "linear-gradient(155deg, #1a0e16 0%, #08060c 60%, #2a0d18 100%)",
              boxShadow:
                "0 30px 60px -25px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-3xl opacity-12"
              style={{
                background:
                  "radial-gradient(circle, rgba(199,144,66,0.3), transparent 60%)",
              }}
            />
            <div className="relative flex items-baseline gap-3 mb-7">
              <span
                className={`${SERIF_ITALIC} text-3xl leading-none`}
                style={{ color: "#f3d9a8" }}
              >
                {CATEGORIES[1].no}
              </span>
              <span
                className="text-[10px] tracking-[0.18em] uppercase font-bold"
                style={{ color: "#f3d9a8" }}
              >
                Hauptkontingent
              </span>
            </div>
            <h3 className="relative font-display text-2xl md:text-3xl font-bold leading-snug mb-3">
              {CATEGORIES[1].label}
            </h3>
            <p
              className={`relative ${SERIF_ITALIC} text-base text-white/65 mb-5`}
            >
              {CATEGORIES[1].sub}
            </p>
            <p className="relative text-[15px] text-white/80 leading-[1.65] mb-auto">
              {CATEGORIES[1].body}
            </p>
            <p
              className="relative text-[11px] tracking-[0.14em] uppercase font-bold mt-5 pt-5 border-t border-white/15"
              style={{ color: "#f3d9a8" }}
            >
              {CATEGORIES[1].note}
            </p>
          </article>

          {/* Card 03 — Premium (rechts, schmal) */}
          <article
            className="lg:col-span-3 relative p-7 md:p-8 flex flex-col h-[400px] md:h-[460px] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            style={{
              borderRadius: "1.25rem",
              background:
                "linear-gradient(155deg, #5c1622 0%, #9a2640 100%)",
              boxShadow:
                "0 25px 50px -25px rgba(154,38,64,0.5), inset 0 0 0 1px rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          >
            <div className="flex items-baseline gap-3 mb-7">
              <span
                className={`${SERIF_ITALIC} text-3xl leading-none`}
                style={{ color: "#f3d9a8" }}
              >
                {CATEGORIES[2].no}
              </span>
              <span
                className="text-[10px] tracking-[0.18em] uppercase font-bold"
                style={{ color: "#f3d9a8" }}
              >
                Front-Reihe
              </span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold leading-snug mb-3">
              {CATEGORIES[2].label}
            </h3>
            <p className={`${SERIF_ITALIC} text-sm text-white/75 mb-4`}>
              {CATEGORIES[2].sub}
            </p>
            <p className="text-[14px] text-white/85 leading-[1.6] mb-auto">
              {CATEGORIES[2].body}
            </p>
            <p
              className="text-[10px] tracking-[0.14em] uppercase font-bold mt-5 pt-5 border-t border-white/20"
              style={{ color: "#f3d9a8" }}
            >
              {CATEGORIES[2].note}
            </p>
          </article>
        </div>

        <p
          className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-10 max-w-2xl`}
        >
          Preis je Tour-Stopp · jeweilige Spielstätte legt Kontingent und
          Endpreis fest · Sammelbuchungen ab 8 Personen direkt anfragen.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WAS ERWARTET DICH — Editorial Magazin-Story, 4 narrative Akte
   ═══════════════════════════════════════════════════════════ */
const ABENDABLAUF = [
  {
    time: "19:00",
    no: "01",
    title: "Einlass und Aperitif.",
    body: "Türen auf, freie Platzwahl in der gebuchten Kategorie. Ein Getränk an der Foyer-Bar, kurze Programm-Karte in der Hand. Im Saal läuft leise warmes Klavier — keine Lobby-Musik, sondern Vorbereitung.",
  },
  {
    time: "19:45",
    no: "02",
    title: "Block I — Hook und Mentalmagie.",
    body: "Lichter runter, Spotlight auf. Erste 45 Minuten: drei Mentaleffekte mit Publikumsbeteiligung, eine längere Karten-Routine, mehrere Comedy-Pointen aus dem Stand. Pause mit drei Sekunden Stille nach dem ersten Wow.",
  },
  {
    time: "20:35",
    no: "03",
    title: "Pause · 20 Minuten.",
    body: "Foyer öffnet wieder, Getränke nachfüllen. Im Saal bleibt eine Karte auf der Bühne liegen — manche merken erst nach der Pause, dass das schon Teil des nächsten Tricks war.",
  },
  {
    time: "20:55",
    no: "04",
    title: "Block II — Climax und Standing Ovation.",
    body: "Zweite Hälfte ist die längste verknüpfte Routine des Abends — ein Mentaleffekt mit eingebauter Anekdote, gefolgt von einem Karten-Set das im Publikum endet. Standing-Ovation-Finale, Encore-Routine, Verbeugung.",
  },
];

const WasErwartetDichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Der Abend · 90 Min in vier Akten.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Was dich{" "}
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                erwartet.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Eine durchkomponierte Show — keine zusammengewürfelten Tricks,
              sondern dramaturgisch verbundene Akte mit Aufbau, Pause und
              Climax. So sieht ein Abend ungefähr aus.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {/* Linke Sticky-Photo */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: "1.25rem",
                  aspectRatio: "4/5",
                  boxShadow:
                    "0 50px 100px -30px rgba(0,0,0,0.35), 0 18px 40px -15px rgba(0,0,0,0.18)",
                }}
              >
                <img
                  src={buehneZuschauerImg}
                  alt="Standing Ovation am Ende einer Bühnenshow von Emilian Leber"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(8,6,12,0.55) 100%)",
                  }}
                />
                <div className="absolute inset-x-6 bottom-6">
                  <div
                    className="rounded-2xl p-5 text-white"
                    style={{
                      background:
                        "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)",
                      backdropFilter:
                        "blur(40px) saturate(200%) brightness(115%)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      boxShadow:
                        "0 20px 40px -15px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.5)",
                    }}
                  >
                    <p
                      className={`${SERIF_ITALIC} text-base mb-1`}
                      style={{ color: "#f3d9a8" }}
                    >
                      Block II · Climax.
                    </p>
                    <p className="font-display font-bold text-base leading-snug">
                      Standing Ovation bei 90 % der Shows
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rechte Akt-Liste */}
          <div className="lg:col-span-7">
            <ol className="space-y-10 md:space-y-12">
              {ABENDABLAUF.map((a) => (
                <li
                  key={a.no}
                  className="grid grid-cols-[80px_1fr] gap-6 md:gap-8 items-start"
                >
                  <div>
                    <span
                      className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-none block`}
                      style={{ color: ACCENT }}
                    >
                      {a.no}
                    </span>
                    <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/45 mt-2 inline-block tabular-nums">
                      {a.time}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-3">
                      {a.title}
                    </h3>
                    <p className="text-base text-foreground/65 leading-[1.7]">
                      {a.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULLQUOTE schwarz full-bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-28 md:py-44 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.3), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-12"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,40,0.25), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div
          className={`max-w-4xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <Quote
            className="w-10 h-10 mx-auto mb-8 opacity-50"
            style={{ color: "#f3d9a8" }}
          />
          <p className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,5vw,4.5rem)]">
            Drei Sekunden Stille.
            <br />
            <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
              Dann lacht der ganze Saal.
            </span>
          </p>
          <p
            className={`${SERIF_ITALIC} text-base md:text-lg text-white/55 mt-8`}
          >
            — Was nach dem Climax-Effekt passiert · Tour-Premiere Plötzlich Magie
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   LOCATIONS — asymmetrisches Bento mit Venue-Beschreibungen
   ═══════════════════════════════════════════════════════════ */
const VENUES = [
  {
    name: "Alte Mälzerei",
    city: "Regensburg",
    type: "Galerie + Saal · Tour-Premiere",
    body: "Eine der schönsten Industriekulissen Regensburgs — ehemalige Mälzerei, heute Veranstaltungsort mit Galerie-Charme. Klassische Saal-Bestuhlung, exzellente Akustik, eingespielte Bühnentechnik. 22.02.2026 als Tour-Premiere.",
    accent: true,
  },
  {
    name: "Hofbräuhaus Festsaal",
    city: "München",
    type: "Festsaal · Tisch-Bestuhlung",
    body: "Bayerisches Wirtshaus-Original mit großem Festsaal im ersten Stock. Holz-vertäfelte Wände, Tisch-Bestuhlung, Wirtshaus-Service während der Show. Spielstätte für den März-Termin.",
  },
  {
    name: "Tafelhalle",
    city: "Nürnberg",
    type: "Bühnenhalle · Steile Tribüne",
    body: "Nürnberger Kleinkunst-Bühne mit steiler Tribüne — Sicht-Garantie von jedem Platz. Pegnitz-Lage, gute Bahn-Anbindung, gastronomische Versorgung im Haus.",
  },
  {
    name: "Parktheater",
    city: "Augsburg",
    type: "Klassisches Theater · Logen",
    body: "Traditions-Theater mit Logen, Parkett und Rang. Klassisches Show-Setting mit ausgeprägter Theater-Tradition. Mai-Termin im Großen Saal.",
  },
  {
    name: "Posthalle",
    city: "Würzburg",
    type: "Multi-Funktional · Flexibel",
    body: "Ehemalige Post, heute flexibler Veranstaltungsort. Wahlweise Tisch-Bestuhlung oder klassisches Parkett. Familienfreundliches Setting mit Foyer-Gastronomie.",
  },
  {
    name: "Scharfrichterhaus",
    city: "Passau",
    type: "Kleinkunst-Bühne · Intim",
    body: "Eine der traditionsreichsten Kabarett- und Magie-Bühnen Niederbayerns. Sehr intimes Setting, max. 180 Gäste. Hier endet der Sommer, hier beginnt die Herbst-Tour.",
  },
];

const LocationsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(40,25%,98.5%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Spielstätten · Tour 2026.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Sechs Bühnen,{" "}
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                eine Show.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Jede Spielstätte mit eigener Atmosphäre — Industriekulisse,
              Wirtshaus, Theater, Kabarett-Bühne. Die Show passt sich an, der
              Spannungsbogen bleibt.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-12 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {VENUES.map((v, i) => {
            // Bento: Card 0 (Premiere) doppelt breit, alle anderen 4-cols
            const isHero = v.accent;
            return (
              <article
                key={v.name}
                className={`${isHero ? "md:col-span-8 lg:col-span-7" : "md:col-span-4"} ${i === 1 ? "lg:col-span-5" : ""} relative p-7 md:p-8 transition-all duration-500 hover:-translate-y-1`}
                style={{
                  borderRadius: "1rem",
                  background: isHero
                    ? "linear-gradient(155deg, #1a0e16 0%, #08060c 60%, #2a0d18 100%)"
                    : "#ffffff",
                  color: isHero ? "#ffffff" : undefined,
                  boxShadow: isHero
                    ? "0 30px 60px -25px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.08)"
                    : "0 15px 30px -20px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.05)",
                  minHeight: isHero ? 280 : 220,
                }}
              >
                {isHero && (
                  <div
                    aria-hidden
                    className="absolute -top-16 -right-16 w-[240px] h-[240px] rounded-full blur-3xl opacity-12"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(199,144,66,0.3), transparent 60%)",
                    }}
                  />
                )}
                <div className="relative">
                  <div className="flex items-baseline gap-3 mb-5">
                    <MapPin
                      className="w-4 h-4"
                      style={{ color: isHero ? "#f3d9a8" : ACCENT }}
                    />
                    <span
                      className="text-[10px] tracking-[0.18em] uppercase font-bold"
                      style={{ color: isHero ? "#f3d9a8" : ACCENT }}
                    >
                      {v.city}
                    </span>
                  </div>
                  <h3
                    className={`font-display ${isHero ? "text-2xl md:text-3xl" : "text-xl"} font-bold leading-snug mb-2`}
                  >
                    {v.name}
                  </h3>
                  <p
                    className={`${SERIF_ITALIC} text-sm ${isHero ? "text-white/65" : "text-foreground/55"} mb-4`}
                  >
                    {v.type}
                  </p>
                  <p
                    className={`text-[14px] leading-[1.65] ${isHero ? "text-white/80" : "text-foreground/65"}`}
                  >
                    {v.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <p
          className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-10 max-w-2xl`}
        >
          Weitere Spielstätten für Herbst 2026 und 2027 in Planung — neue
          Tour-Daten zuerst über den Newsletter.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   VIDEO-SECTION TVA
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Showreel · TVA-Mitschnitt 2024.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Sieh dir an,{" "}
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                worauf du dich freust.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              TVA Bayern hat 2024 eine komplette Show-Routine im Studio
              aufgenommen — Live-Karten-Test mit dem Moderator, Mentaleffekt
              mit Studio-Publikum. Der Mitschnitt zeigt, was bei einer
              Bühnenshow auf dich zukommt.
            </p>
          </div>
        </div>

        <div
          className={`relative max-w-6xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{
            borderRadius: "1.5rem",
            overflow: "hidden",
            boxShadow:
              "0 50px 100px -30px rgba(40,20,40,0.45), 0 18px 40px -15px rgba(40,20,40,0.22)",
          }}
        >
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1`}
              title="TVA TV-Interview 2024 — Emilian Leber, Showreel-Einblick"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-sm text-foreground/55">
          <span className="inline-flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5" style={{ color: ACCENT }} />
            TVA Bayern
          </span>
          <span aria-hidden className="text-foreground/25">
            ·
          </span>
          <span className={SERIF_ITALIC}>2024 · mit 16 Jahren</span>
          <span aria-hidden className="text-foreground/25">
            ·
          </span>
          <span>Komplett-Mitschnitt</span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN — Ticket-Käufer-Perspektive
   ═══════════════════════════════════════════════════════════ */
const REVIEWS = [
  {
    quote:
      "Es war einfach Mega! 200 Gäste — Emilian hat mit seiner Bühnenshow alle begeistert. Eine Bühnenshow wie diese hätte ich gerne nochmal gesehen.",
    author: "Jan von Lehmann",
    role: "Bühnenshow-Gast · 200 Gäste",
    initial: "J",
  },
  {
    quote:
      "Mit viel Charme und Witz hat er alle Gäste begeistert. Wer Tickets bekommt, soll sie nicht weggeben.",
    author: "Katrin Raß",
    role: "Hochzeitsplanerin · Saal-Besucherin",
    initial: "K",
  },
  {
    quote:
      "Sympathischer junger Mann, der nicht sich, sondern seine Zauberkunst in den Mittelpunkt stellt. Ich hatte das Glück live dabei zu sein — geht hin.",
    author: "Martina Senftl",
    role: "Eventkundin · Show-Gast",
    initial: "M",
  },
];

const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(40,25%,98.5%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
          >
            Was Saal-Gäste sagen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,6.5vw,6.5rem)] text-foreground">
            5,0 Sterne.
            <br />
            <span className={SERIF_ITALIC}>30+ Bewertungen.</span>
          </h2>
        </div>
        <div
          className={`grid md:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {REVIEWS.map((r) => (
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
                className="text-[15px] md:text-base leading-[1.65] text-foreground/85 flex-1"
              >
                [{r.quote}]
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
                  <p
                    className={`${SERIF_ITALIC} text-[13px] text-foreground/55 mt-0.5`}
                  >
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
   FAQ — Ticket-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Wie kommen die Tickets zu mir?",
    a: "Nach abgeschlossener Bestellung kommt das Ticket innerhalb von 15 Minuten als PDF per E-Mail. Du druckst es aus oder zeigst es am Einlass auf dem Smartphone vor. Bei Wald-&-Wiese-Magic-Dinner-Abenden reicht die Reservierungsbestätigung — Namen-Check an der Tür.",
  },
  {
    q: "Was passiert bei Krankheit oder Verhinderung?",
    a: "Ticket auf andere Person übertragbar — einfach am Einlass den neuen Namen nennen. Bei plötzlicher Erkrankung mit Attest: Umbuchung auf einen anderen Tour-Termin in derselben Saison möglich, unbürokratisch. Erstattung über die jeweilige Spielstätte nach deren AGB.",
  },
  {
    q: "Kann ich einen Sitzplatz reservieren?",
    a: "In der Premium-Front-Reihe ja — feste Platzwahl beim Vorverkauf. Standard- und Frühbucher-Tickets sind freie Platzwahl innerhalb der Zone. Wer früh kommt, sitzt vorn. Saalöffnung ist immer 30 Minuten vor Show-Beginn.",
  },
  {
    q: "Kann ich Tickets verschenken?",
    a: "Sehr gerne. Geschenk-Tickets können auf jeden Namen ausgestellt werden — Bestellname und Show-Datum reichen, der Name kann bis 24 h vor Show geändert werden. Auf Wunsch personalisiertes Geschenk-PDF mit Widmung. Schreib mir einfach kurz.",
  },
  {
    q: "Was soll ich anziehen?",
    a: "Smart Casual reicht überall — gepflegtes Hemd, dunkle Hose, oder eleganteres Kleid. Bei der Tour-Premiere in der Alten Mälzerei tendiert die Stimmung etwas dressierter. Bei Magic-Dinner-Abenden im Wald &-Wiese ist Restaurant-Smart-Casual angemessen.",
  },
  {
    q: "Magic-Dinner: Welches Menü gibt es?",
    a: "Das Restaurant Wald &-Wiese erstellt für jeden Magic-Dinner-Abend ein abgestimmtes Drei-Gänge-Menü mit saisonalen Zutaten — bayerisch-modern interpretiert. Vegetarische und vegane Alternativen vorhanden, gerne bei der Reservierung mitteilen. Allergien per Mail vorab klären.",
  },
  {
    q: "Special-Wünsche — Allergien, Geburtstag im Publikum?",
    a: "Allergien und Unverträglichkeiten bitte 48 h vor dem Termin per E-Mail an el@magicel.de — bei Magic-Dinner-Abenden direkt mit der Reservierung. Wenn du jemanden im Publikum hast der Geburtstag hat, schreib mir vorab — eine personalisierte Routine während der Show ist möglich, bleibt aber Überraschung.",
  },
  {
    q: "Sind die Spielstätten behinderten-gerecht?",
    a: "Alle bestätigten Tour-Spielstätten sind ebenerdig erreichbar oder per Aufzug zugänglich. Rollstuhl-Plätze in der vorderen Reihe per direkter Anfrage vorab buchbar. Bei der Alten Mälzerei und der Tafelhalle: barrierefreie Toiletten vorhanden. Schreib mir kurz, ich kläre individuell mit der Spielstätte.",
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
          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
          >
            Bevor du buchst.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Häufige Ticket-
            <br />
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              Fragen.
            </span>
          </h2>
        </div>
        <div
          className={`max-w-3xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {FAQS.map((faq) => (
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
   NEWSLETTER-CTA — Email-Capture für neue Tour-Daten
   ═══════════════════════════════════════════════════════════ */
const NewsletterCTASection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes("@") || email.length < 5) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    captureEmail(email, "tickets-newsletter");
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      ref={ref}
      className="bg-[hsl(40,25%,98.5%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <div
            className="relative grid md:grid-cols-[1.4fr_1fr] gap-x-12 gap-y-10 p-8 md:p-12 lg:p-14 overflow-hidden"
            style={{
              borderRadius: "1.5rem",
              background:
                "linear-gradient(155deg, #ffffff 0%, #faf3e6 60%, #f0d8a8 100%)",
              boxShadow:
                "0 50px 100px -30px rgba(120,80,30,0.25), 0 18px 40px -15px rgba(120,80,30,0.15), inset 0 0 0 1px rgba(255,255,255,0.5)",
            }}
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-20 w-[280px] h-[280px] rounded-full blur-3xl opacity-15"
              style={{
                background:
                  "radial-gradient(circle, rgba(199,144,66,0.3), transparent 65%)",
              }}
            />

            <div className="relative">
              <p
                className={`${SERIF_ITALIC} text-base md:text-lg text-foreground/55 mb-4`}
              >
                Tour-Newsletter · alle 4–8 Wochen.
              </p>
              <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.8vw,3rem)] text-foreground mb-5">
                Sei der erste bei{" "}
                <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                  neuen Tour-Daten.
                </span>
              </h2>
              <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-md">
                Neue Tour-Stopps, Vorverkaufs-Starts und Magic-Dinner-Abende —
                bevor sie öffentlich angekündigt werden. Kurze Mails, kein
                Spam, jederzeit abbestellbar.
              </p>
            </div>

            <div className="relative">
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-foreground/45 mb-2 block">
                      Deine E-Mail-Adresse
                    </span>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40"
                        aria-hidden
                      />
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError(null);
                        }}
                        placeholder="vorname@beispiel.de"
                        className="w-full pl-11 pr-4 py-4 text-base text-foreground bg-white rounded-full border border-foreground/15 focus:outline-none focus:border-[color:var(--accent)] transition-colors"
                        style={{
                          ["--accent" as never]: ACCENT,
                        }}
                      />
                    </div>
                  </label>
                  {error && (
                    <p className="text-sm text-[color:var(--accent)] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="hero-cta w-full inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                      boxShadow: "0 18px 40px -14px rgba(154,38,64,0.3)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Anmelden
                  </button>
                  <p className="text-[11px] text-foreground/45 leading-relaxed">
                    Mit dem Anmelden bestätigst du, die Datenschutz-Hinweise
                    gelesen zu haben. Abmeldung in jeder E-Mail per einem
                    Klick.
                  </p>
                </form>
              ) : (
                <div
                  className="p-6 rounded-2xl flex items-start gap-4"
                  style={{
                    background: "rgba(154,38,64,0.08)",
                    border: "1px solid rgba(154,38,64,0.2)",
                  }}
                >
                  <CheckCircle2
                    className="w-6 h-6 shrink-0 mt-0.5"
                    style={{ color: ACCENT }}
                  />
                  <div>
                    <p className="font-display font-bold text-foreground text-base mb-1.5">
                      Eingetragen. Danke.
                    </p>
                    <p className="text-sm text-foreground/65 leading-snug">
                      Du bekommst die nächste Tour-Mail mit neuen Stopps und
                      Vorverkaufs-Daten — meistens 4–8 Wochen Vorlauf.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CUSTOM QUIZ — Ticket-Format-Finder
   ═══════════════════════════════════════════════════════════ */
const ticketsQuizConfig: CustomQuizConfig = {
  anlass: "Ticket",
  sectionEyebrow: "Format-Finder · Tickets",
  sectionTitle: (
    <>
      Tour-Show oder{" "}
      <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
        Magic Dinner?
      </span>
    </>
  ),
  sectionDesc:
    "Drei kurze Fragen — wir finden gemeinsam heraus, welches Ticket-Format zu deiner Stimmung passt.",
  questions: [
    {
      id: "abend",
      eyebrow: "Frage 01 · Abend",
      title: <>Was für ein Abend soll es werden?</>,
      hint: "Theater-Abend mit Show oder Dinner mit Magie am Tisch?",
      feedback: "Verstanden.",
      cols: 3,
      options: [
        {
          value: "show",
          label: "Theater-Show",
          sub: "Bühne · 90 Min · große Pointen",
        },
        {
          value: "dinner",
          label: "Magic Dinner",
          sub: "Restaurant · Drei-Gänge · Tisch-Magie",
        },
        {
          value: "egal",
          label: "Bin offen",
          sub: "Empfehl mir das Passendere",
        },
      ],
    },
    {
      id: "begleitung",
      eyebrow: "Frage 02 · Begleitung",
      title: <>Mit wem kommst du?</>,
      hint: "Allein, mit Partner, oder kleine Runde?",
      feedback: "Passt.",
      cols: 3,
      options: [
        { value: "solo", label: "Allein", sub: "Eine Pflicht-Karte" },
        {
          value: "paar",
          label: "Mit Partner",
          sub: "Date-Night · zwei Plätze",
        },
        {
          value: "gruppe",
          label: "Mit Freunden",
          sub: "4–8 Personen · Gemeinschafts-Abend",
        },
      ],
    },
    {
      id: "naehe",
      eyebrow: "Frage 03 · Distanz zur Magie",
      title: <>Wie nah willst du dran sein?</>,
      hint: "Erste Reihe mit Karten-Sicht oder klassischer Saal-Blick?",
      feedback: "Klingt stark.",
      cols: 3,
      options: [
        {
          value: "vorn",
          label: "Direkt davor",
          sub: "Premium-Front · Karten-Detail",
        },
        {
          value: "mitte",
          label: "Saal-Mitte",
          sub: "Gute Übersicht · entspannt",
        },
        {
          value: "tisch",
          label: "Am Tisch",
          sub: "Magie direkt am Sitz",
        },
      ],
    },
  ],
  recommend: (a) => {
    const { abend, begleitung, naehe } = a;
    if (abend === "dinner" || naehe === "tisch") {
      return {
        format: "Magic-Dinner-Abend · Wald & Wiese",
        sub: "Restaurant in Sinzing · Drei-Gänge mit Tisch-Magie",
        why: "Eine kleine Runde, Magie direkt am Tisch zwischen den Gängen — das ist das Magic-Dinner-Format. Vier bis sechs Termine pro Jahr im Restaurant Wald & Wiese in Sinzing bei Regensburg.",
        link: "/magic-dinner",
      };
    }
    if (naehe === "vorn" || begleitung === "paar") {
      return {
        format: "Tour-Show · Premium-Front",
        sub: "Erste drei Reihen · direkter Karten-Blick",
        why: "Premium-Front-Tickets bekommen direkten Karten-Blick und werden mit hoher Wahrscheinlichkeit Teil eines Effekts. Für ein intensives Erlebnis zu zweit der richtige Platz.",
        link: "#tour-daten",
      };
    }
    if (begleitung === "gruppe") {
      return {
        format: "Tour-Show · Standard-Block",
        sub: "Saal-Mitte · Gemeinschafts-Erlebnis",
        why: "Standard-Tickets im Saal-Mitte-Block sind das passende Format für Freundeskreise — gute Sicht für alle, Hauptkontingent verfügbar. Bei 6+ Personen schreib mir wegen Gruppen-Konditionen.",
        link: "#tour-daten",
      };
    }
    return {
      format: "Tour-Show · Empfehlung Standard",
      sub: "Saal-Mitte · klassischer Theater-Abend",
      why: "Für die meisten Gäste ist das Standard-Ticket im Saal-Mitte-Block der richtige Einstieg — beste Akustik, gute Sicht, Hauptkontingent verfügbar. Wenn du es mochtest, beim nächsten Mal Premium probieren.",
      link: "#tour-daten",
    };
  },
};

/* ═══════════════════════════════════════════════════════════
   FINAL-CTA — Buchen oder Privat-Show
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
              "linear-gradient(120deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.78) 50%, rgba(8,6,12,0.58) 100%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.3), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-12"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,40,0.25), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div
          className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}
          >
            Buchen oder selber planen?
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Tour-Ticket{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              oder eigene Show.
            </span>
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Wenn keine Tour-Stadt in deiner Nähe ist oder du eine private
            Show planst — schreib mir direkt. Antwort innerhalb von 24
            Stunden, deutschlandweit verfügbar.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tour-daten"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90"
            >
              <Ticket className="w-4 h-4" />
              Ticket sichern
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/buchung?format=Privat-Show"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              <Mic2 className="w-4 h-4" />
              Show-Planer öffnen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p
            className={`${SERIF_ITALIC} text-sm text-white/55 mt-9 max-w-md mx-auto`}
          >
            el@magicel.de · +49 15563744696 · Bayern und deutschlandweit.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   JSON-LD — EntertainmentEvent + BreadcrumbList + AggregateRating
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/tickets";

const buildEventLd = (t: TourDate) => ({
  "@type": "TheaterEvent",
  name: "Plötzlich Magie — Magic Meets Comedy",
  description:
    "Abendfüllende Bühnenshow mit Mentalmagie, Karten-Routinen und Comedy-Pointen. 90 Minuten Tour-Show von Emilian Leber.",
  startDate: t.date,
  eventStatus:
    t.status === "Ausverkauft"
      ? "https://schema.org/EventScheduled"
      : "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: t.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: t.city,
      addressCountry: "DE",
    },
  },
  performer: {
    "@type": "Person",
    name: "Emilian Leber",
    url: "https://www.magicel.de",
  },
  offers: {
    "@type": "Offer",
    availability:
      t.status === "Ausverkauft"
        ? "https://schema.org/SoldOut"
        : t.status === "Demnächst"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
    url: SITE_URL,
  },
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Start",
          item: "https://www.magicel.de",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tickets",
          item: SITE_URL,
        },
      ],
    },
    {
      "@type": "Person",
      name: "Emilian Leber",
      url: "https://www.magicel.de",
      jobTitle: "Zauberkünstler · Mentalmagier · Comedy-Magier",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "30",
        bestRating: "5",
        worstRating: "1",
      },
    },
    ...TOUR_DATES.map(buildEventLd),
  ],
};

/* ═══════════════════════════════════════════════════════════ */
const Tickets = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Tickets — Plötzlich Magie 2026 Tour | Emilian Leber
      </title>
      <meta
        name="description"
        content="Tickets für die Tour-Show Plötzlich Magie — Magic Meets Comedy. Premiere 22.02.2026 in der Alten Mälzerei Regensburg, anschließend Bayern-Tour. Plus Magic-Dinner-Abende im Wald & Wiese."
      />
      <meta
        name="keywords"
        content="Tickets Emilian Leber, Plötzlich Magie Tickets, Magier Tickets Bayern, Magic Dinner Tickets, Zaubershow Karten, Comedy-Magie Tour, Tour-Show Regensburg, Alte Mälzerei, Wald und Wiese Sinzing, Magier Tour 2026"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="Tickets — Plötzlich Magie 2026 Tour | Emilian Leber"
      />
      <meta
        property="og:description"
        content="Premiere 22.02.2026 in der Alten Mälzerei Regensburg. 90 Min Mentalmagie + Comedy. Anschließend Bayern-Tour + Magic-Dinner-Abende im Wald & Wiese Sinzing. 5,0 Sterne."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Tickets — Plötzlich Magie 2026 Tour | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="Premiere 22.02.2026 Alte Mälzerei Regensburg. 90 Min Magic Meets Comedy. Bayern-Tour + Magic-Dinner-Abende."
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <MagicDinnerAbendeSection />
        <WasErwartetDichSection />
        <TicketKategorienSection />
        <PullQuoteSection />
        <LocationsSection />
        <AktuelleTourShowSection />
        <TourDatenSection />
        <VideoSection />
        <StimmenSection />
        <FAQSection />
        <CustomQuizSection config={ticketsQuizConfig} />
        <NewsletterCTASection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Tickets;
