import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Trophy,
  Award,
  Medal,
  Tv,
  FileText,
  Download,
  Mail,
  Phone,
  MessageCircle,
  Image as ImageIcon,
  Copy,
  Check,
  Newspaper,
  Calendar,
  Quote,
  X,
  Paperclip,
  MapPin,
  Clock,
} from "lucide-react";

import portraitImg from "@/assets/magician-portrait.jpg";
import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import portraitCardsImg from "@/assets/emilian-portrait-cards.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import magicDinnerImg from "@/assets/emilian-magic-dinner.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import staunenImg from "@/assets/staunen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import greatestTalentImg from "@/assets/greatest-talent-presse.jpg";
import talentsTeamImg from "@/assets/talents-of-magic-team.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const CREAM = "#f5ecdc";
const EPK_MAIL =
  "mailto:el@magicel.de?subject=EPK%20Anfrage%20Emilian%20Leber&body=Hallo%20Emilian%2C%20bitte%20schicken%20Sie%20mir%20das%20vollst%C3%A4ndige%20EPK%20%28Bio%2C%20Fotos%2C%20Logo%2C%20Tour-Daten%29.%20Danke%21";

/* ═══════════════════════════════════════════════════════════
   HERO — kleinerer Pressebereich-Hero, cream-Hintergrund,
   text-driven, mit Hero-Animationen
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(40px) scale(0.96) rotate(-1deg); filter: blur(6px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.18; } 30% { opacity: 0.9; } 70% { opacity: 0.9; } 100% { transform: translateY(-90px) translateX(14px) scale(1.15); opacity: 0; } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 6px rgba(199,144,66,0.45)); } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-cta { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background-color .3s, color .3s; }
    .hero-cta:hover { transform: translateY(-2px) scale(1.035); }
    .hero-cta:active { transform: translateY(0) scale(0.97); }
  `}</style>
);

const HEAD_SANS = ["Pressebereich."];
const HEAD_ITALIC = ["Material", "fertig", "geliefert."];

const BOKEH = [
  { size: 18, left: "10%", top: "32%", dur: 16, delay: 0, o: 0.4 },
  { size: 12, left: "6%", top: "68%", dur: 19, delay: 2, o: 0.5 },
  { size: 22, left: "82%", top: "22%", dur: 17, delay: 1, o: 0.35 },
  { size: 14, left: "88%", top: "55%", dur: 21, delay: 3, o: 0.5 },
  { size: 10, left: "60%", top: "78%", dur: 14, delay: 4, o: 0.55 },
  { size: 16, left: "92%", top: "80%", dur: 18, delay: 1.6, o: 0.32 },
  { size: 12, left: "35%", top: "85%", dur: 20, delay: 5.5, o: 0.45 },
  { size: 14, left: "48%", top: "14%", dur: 22, delay: 4.5, o: 0.3 },
];

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(170deg, ${CREAM} 0%, #fbf6ec 60%, #ffffff 100%)`,
      }}
    >
      <HeroKeyframes />
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(199,144,66,0.22) 0%, rgba(199,144,66,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.10) 0%, rgba(154,38,64,0) 70%)",
        }}
      />
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
              background: `radial-gradient(circle, rgba(199,144,66,${b.o}) 0%, rgba(199,144,66,${b.o * 0.4}) 40%, rgba(199,144,66,0) 75%)`,
              filter: "blur(2px)",
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container px-6 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-6xl">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 hero-fade"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400 hero-star"
                    style={{ animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
              <span className="text-sm text-foreground/70">
                <strong className="font-semibold text-foreground">5,0</strong>
                <span className="text-foreground/55"> · 30+ Bewertungen</span>
              </span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-foreground/20" />
            <span className="text-sm text-foreground/65">
              <strong className="font-semibold text-foreground">200+ Events</strong> seit 2016
            </span>
            <span aria-hidden className="hidden md:block h-4 w-px bg-foreground/20" />
            <span className="text-sm text-foreground/65">Bayern · deutschlandweit</span>
          </div>

          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-5 md:mb-7 hero-fade`}
            style={{ animationDelay: "0.15s" }}
          >
            Für Journalist:innen, Redakteur:innen und Event-Press-Teams.
          </p>

          <h1 className="font-display font-black tracking-[-0.03em] leading-[0.98] text-[clamp(2.75rem,8vw,7.5rem)] text-foreground max-w-5xl">
            {HEAD_SANS.map((w, i) => (
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
            {HEAD_ITALIC.map((w, i) => (
              <span
                key={`i-${i}`}
                className={`hero-word ${SERIF_ITALIC}`}
                style={{
                  animationDelay: `${0.3 + (HEAD_SANS.length + i) * 0.08}s`,
                  paddingRight: "0.12em",
                  color: ACCENT,
                }}
              >
                {w}
                {" "}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 md:mt-10 max-w-2xl text-base md:text-lg leading-[1.65] text-foreground/65 hero-fade"
            style={{ animationDelay: "1.1s" }}
          >
            Pressekit als ein PDF. Hi-Res-Pressefotos zum direkten Download.
            Boilerplate in drei Längen — 50, 100, 250 Wörter, copy-paste-fertig.
            Plus: aktuelle Pressemitteilungen, Tour-Daten zur Show 2026,
            persönlicher Direkt-Kontakt mit 24-Stunden-Antwort.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade"
            style={{ animationDelay: "1.25s" }}
          >
            <a
              href={EPK_MAIL}
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                boxShadow: "0 18px 36px -10px rgba(154,38,64,0.45)",
              }}
            >
              <Download className="w-4 h-4" />
              Pressekit anfordern
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#pressefotos"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground/65 hover:text-foreground border-b border-foreground/25 hover:border-foreground pb-1 transition-colors"
            >
              Direkt zu den Fotos
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div
            className="mt-14 md:mt-20 hero-fade flex flex-wrap items-baseline gap-x-6 md:gap-x-9 gap-y-3 text-xs md:text-sm tracking-[0.04em] text-foreground/65"
            style={{ animationDelay: "1.4s" }}
          >
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-foreground text-base md:text-lg tabular-nums">
                5
              </strong>
              <span>TV- und Award-Stationen</span>
            </span>
            <span aria-hidden className="text-foreground/25">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-foreground text-base md:text-lg tabular-nums">
                3
              </strong>
              <span>Boilerplate-Längen</span>
            </span>
            <span aria-hidden className="text-foreground/25">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-foreground text-base md:text-lg tabular-nums">
                8+
              </strong>
              <span>Hi-Res-Pressefotos</span>
            </span>
            <span aria-hidden className="text-foreground/25">·</span>
            <span>24h Antwort</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   BEKANNT-AUS — TV / Awards / Bühnen-Wettbewerbe XL
   asymmetrische Editorial-Cards (5 Stationen)
   ═══════════════════════════════════════════════════════════ */
const STATIONS = [
  {
    year: "2025",
    Icon: Tv,
    name: "TVA Fernsehen",
    sub: "TV-Auftritt · Bayerisches Regional-TV",
    body: "TV-Interview mit 16 Jahren — zehn Jahre nach dem ersten Trick. Studio-Aufzeichnung, Live-Routine vor laufender Kamera, eingebauter Karten-Test mit dem Moderator. Vollständiger Mitschnitt auf YouTube und in der TVA-Mediathek.",
    accent: "spotlight",
  },
  {
    year: "2024",
    Icon: Award,
    name: "Talents of Magic",
    sub: "Finalist + Kreativpreis · Bundesweiter Wettbewerb",
    body: "Finalist beim renommierten Wettbewerb für junge Magier in Deutschland. Zusätzlich Kreativpreis für eine eigens konzipierte Routine mit Mentaleffekt und Comedy-Pointe — ausgezeichnet von einer Fach-Jury aus etablierten Bühnen-Magiern.",
  },
  {
    year: "2023",
    Icon: Trophy,
    name: "Greatest Talent",
    sub: "Finalist · TV-Wettbewerb",
    body: "Finalist beim TV-Wettbewerb Greatest Talent — Vor-Jury-Auswahl aus über 400 Bewerbungen, Live-Auftritt vor TV-Publikum. Anschluss-Buchungen bei Award-Shows und Galaabenden in den Folgemonaten.",
  },
  {
    year: "2024",
    Icon: Medal,
    name: "Deutsche Jugendmeisterschaft",
    sub: "Top 30 · Magischer Zirkel Deutschland",
    body: "Top-30-Platzierung bei der Deutschen Jugendmeisterschaft der Zauberkunst. Disziplin Mentalmagie — vorbereitete Routine vor Fach-Jury und Publikum aus etablierten Zauberkünstlern.",
  },
  {
    year: "Laufend",
    Icon: Star,
    name: "ProvenExpert · Google",
    sub: "5,0 ★ · 30+ Bewertungen",
    body: "Durchgehend 5,0 Sterne auf ProvenExpert und Google — über 30 verifizierte Bewertungen aus den letzten Jahren. Kunden-Spannbreite von privaten Hochzeiten bis zu DAX-Konzernen wie Versicherungskammer Bayern, STRABAG und Sixt.",
  },
];

const BekanntAusSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const spotlight = STATIONS[0];
  const rest = STATIONS.slice(1);
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Bekannt aus.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Fernsehen, Wettbewerbe{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                und 200+ Live-Bühnen
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Fünf Stationen, die euer Press-Briefing tragen: TV-Interview 2023,
              Talents of Magic Finalist plus Kreativpreis, Greatest-Talent-Finale,
              Deutsche Jugendmeisterschaft Top 30 — und 5,0 Sterne auf
              ProvenExpert über mehrere Jahre.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-5 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {/* SPOTLIGHT — TVA 2025 */}
          <article
            className="lg:col-span-7 relative overflow-hidden p-7 md:p-10 flex flex-col justify-between min-h-[420px] md:min-h-[460px] text-white"
            style={{
              borderRadius: "1.25rem",
              background: `linear-gradient(135deg, ${ACCENT_DEEP} 0%, ${ACCENT} 100%)`,
              boxShadow:
                "0 35px 70px -25px rgba(92,22,34,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <div
              aria-hidden
              className="absolute -top-24 -right-16 w-[360px] h-[360px] rounded-full blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,210,140,0.55), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-7">
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.14)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  <spotlight.Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </span>
                <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80">
                  Aktuelle Station · {spotlight.year}
                </span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl font-black tracking-[-0.02em] leading-[1.0] mb-4">
                {spotlight.name}.
              </h3>
              <p
                className={`${SERIF_ITALIC} text-base md:text-lg text-white/75 mb-7`}
              >
                {spotlight.sub}
              </p>
              <p className="text-sm md:text-base text-white/80 leading-[1.7] max-w-xl">
                {spotlight.body}
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-2">
              {["YouTube-Embed", "TVA-Mediathek", "Studio-Mitschnitt"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] tracking-[0.06em] uppercase font-semibold text-white/85"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </article>

          {/* RIGHT-COLUMN-Stack: 2 Stations */}
          <div className="lg:col-span-5 grid gap-5 md:gap-7">
            {rest.slice(0, 2).map((s) => (
              <article
                key={s.name}
                className="relative bg-white p-7 md:p-8 transition-all duration-500 hover:-translate-y-1"
                style={{
                  borderRadius: "1.25rem",
                  boxShadow:
                    "0 25px 50px -25px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-start justify-between gap-5 mb-5">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                      border: "1px solid rgba(154,38,64,0.22)",
                    }}
                  >
                    <s.Icon
                      className="w-5 h-5"
                      style={{ color: ACCENT }}
                      strokeWidth={1.75}
                    />
                  </span>
                  <span
                    className={`${SERIF_ITALIC} text-2xl leading-none mt-1`}
                    style={{ color: ACCENT }}
                  >
                    {s.year}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
                  {s.name}.
                </h3>
                <p
                  className={`${SERIF_ITALIC} text-[13px] text-foreground/55 mb-4`}
                >
                  {s.sub}
                </p>
                <p className="text-sm text-foreground/65 leading-[1.6]">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* BOTTOM-Row: 2 weitere Stationen */}
        <div
          className={`grid md:grid-cols-2 gap-5 md:gap-7 mt-5 md:mt-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {rest.slice(2).map((s) => (
            <article
              key={s.name}
              className="relative bg-[hsl(36,30%,97%)] p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 grid grid-cols-[auto_1fr] gap-6 items-start"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-14 h-14 rounded-full shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))",
                  border: "1px solid rgba(154,38,64,0.22)",
                }}
              >
                <s.Icon
                  className="w-6 h-6"
                  style={{ color: ACCENT }}
                  strokeWidth={1.75}
                />
              </span>
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight">
                    {s.name}.
                  </h3>
                  <span
                    className={`${SERIF_ITALIC} text-lg leading-none`}
                    style={{ color: ACCENT }}
                  >
                    {s.year}
                  </span>
                </div>
                <p
                  className={`${SERIF_ITALIC} text-[13px] text-foreground/55 mb-4`}
                >
                  {s.sub}
                </p>
                <p className="text-sm text-foreground/65 leading-[1.6]">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO-DOWNLOAD — direkter PDF-Download, prominent
   ═══════════════════════════════════════════════════════════ */
const PortfolioDownloadSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[#08060c] text-white py-24 md:py-36 border-y border-foreground/10 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.7), transparent 60%)",
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
              Portfolio · PDF.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] mb-7">
              Komplettes Künstler-Portfolio.{" "}
              <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                Direkt-Download.
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/75 leading-[1.7] mb-8 max-w-xl">
              Das vollständige Portfolio als PDF — Bühnenfotos, Show-Beschreibungen,
              Werdegang, Auszeichnungen, Referenzen und Tech-Rider in einem
              Dokument. 800 KB, druckfähig, freigegeben für Press- und
              Briefing-Nutzung. Kein Email-Versand nötig.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/portfolio/Emilian_Leber_Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c]"
                style={{
                  background: "#f3d9a8",
                  boxShadow: "0 18px 40px -14px rgba(199,144,66,0.55)",
                }}
              >
                <Download className="w-4 h-4" />
                Portfolio öffnen (PDF)
              </a>
              <a
                href="/portfolio/Emilian_Leber_Portfolio.pdf"
                download="Emilian_Leber_Portfolio.pdf"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
              >
                Direkt herunterladen
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <p
              className={`${SERIF_ITALIC} text-sm text-white/55 mt-7 max-w-md`}
            >
              Stand März 2026 · 802 KB · keine Anmeldung, keine Email-Schranke.
              Englische Version auf Anfrage.
            </p>
          </div>

          {/* Mockup PDF-Cover */}
          <div className="lg:col-span-5">
            <a
              href="/portfolio/Emilian_Leber_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[3/4] max-w-sm mx-auto overflow-hidden transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]"
              style={{
                borderRadius: "1.25rem",
                background:
                  "linear-gradient(155deg, #1a0e16 0%, #08060c 100%)",
                boxShadow:
                  "0 60px 120px -30px rgba(0,0,0,0.6), 0 25px 50px -20px rgba(199,144,66,0.25), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              {/* Brand-Header */}
              <div className="absolute inset-x-0 top-0 p-6 flex items-center justify-between text-white/80">
                <span className="text-[10px] tracking-[0.22em] uppercase font-bold">
                  MagicEL
                </span>
                <span
                  className={`${SERIF_ITALIC} text-sm`}
                  style={{ color: "#f3d9a8" }}
                >
                  Portfolio 2026
                </span>
              </div>

              {/* Center title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <p
                  className="text-[10px] tracking-[0.22em] uppercase font-bold mb-4"
                  style={{ color: "#f3d9a8" }}
                >
                  Zauberer · Mentalmagier · Comedy
                </p>
                <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-[1.05] mb-3">
                  Emilian
                  <br />
                  <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
                    Leber.
                  </span>
                </h3>
                <p className="text-sm text-white/65 max-w-[16ch] leading-snug">
                  Künstler-Portfolio · Bayern und deutschlandweit
                </p>
              </div>

              {/* Footer */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white/55">
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold">
                  PDF · 802 KB
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-bold text-white/80 group-hover:text-[#f3d9a8] transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Open
                </span>
              </div>

              {/* Glanz-Reflex */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-32 opacity-30"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.18), transparent)",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRESSEMITTEILUNGEN — Magazin-Liste, vertikal mit Trennlinien
   ═══════════════════════════════════════════════════════════ */
type PressItem = {
  date: string;
  kicker: string;
  title: string;
  excerpt: string;
  tag: string;
  url?: string;
  pdf?: string;
};

const PMS: PressItem[] = [
  {
    date: "12. Februar 2026",
    kicker: "Premiere · Tour 2026",
    title: "Plötzlich Magie — Magic Meets Comedy.",
    excerpt:
      "Emilian Leber präsentiert ab Frühjahr 2026 seine erste abendfüllende Tour-Show: 90 Minuten Mentalmagie, Karten-Routinen und Comedy-Pointen. Premiere am 22.02.2026 in der Alten Mälzerei Regensburg, anschließend Tour durch bayerische Theater und Saalbühnen.",
    tag: "Show-Premiere",
  },
  {
    date: "28. November 2024",
    kicker: "Fernsehen · TVA Bayern",
    title: "TV-Interview mit 16 Jahren auf TVA.",
    excerpt:
      "Studioaufzeichnung mit Live-Routine vor TV-Kamera, eingebauter Karten-Test mit dem Moderator, Mentaleffekt mit Studio-Publikum. Komplett-Mitschnitt in der TVA-Mediathek und auf YouTube. Zehn Jahre nach dem ersten Trick.",
    tag: "TV-Auftritt",
  },
  {
    date: "14. September 2024",
    kicker: "Wettbewerb · Kreativpreis",
    title: "Talents of Magic 2024 — Finalist und Kreativpreis.",
    excerpt:
      "Finalist beim renommierten Wettbewerb für junge Magier in Deutschland. Zusätzlich ausgezeichnet mit dem Kreativpreis für eine eigens konzipierte Routine — eine Verschmelzung aus Mentalmagie und Comedy-Storytelling, ausgezeichnet von einer Fach-Jury.",
    tag: "Auszeichnung",
  },
  {
    date: "03. Juni 2024",
    kicker: "Wettbewerb · Deutsche Jugendmeisterschaft",
    title: "Top 30 bei der Deutschen Jugendmeisterschaft der Zauberkunst.",
    excerpt:
      "Top-30-Platzierung beim wichtigsten Nachwuchs-Wettbewerb des Magischen Zirkels Deutschland. Disziplin Mentalmagie. Wertung vor Fach-Jury aus etablierten Bühnen-Magiern und Live-Publikum.",
    tag: "Wettbewerb",
  },
  {
    date: "21. September 2023",
    kicker: "Fernsehen · Greatest Talent",
    title: "Finalist bei Greatest Talent — aus 400+ Bewerbungen.",
    excerpt:
      "Auswahl-Vorrunde mit über 400 Bewerbungen, Aufnahme ins TV-Finale. Live-Auftritt vor TV-Studio-Publikum mit anschließenden Buchungen bei Award-Galas und Firmenfeiern in den Folgemonaten.",
    tag: "TV-Finalist",
  },
  {
    date: "Idowa Magazin",
    kicker: "Print + Online · Idowa Regensburg",
    title: "Aus Kindertraum wird Bühnenzauber.",
    excerpt:
      "Portrait-Artikel im Idowa-Magazin (Mittelbayerische / Regensburg): vom Kinderzimmer-Trick bis zur abendfüllenden Bühnenshow — ein Werdegang-Porträt mit Interview-Auszügen, Bühnenfotos und persönlicher Geschichte. Online weiterhin abrufbar.",
    tag: "Print-Portrait",
    url: "https://www.idowa.de/regionen/woerth-und-regensburg/regensburg/aus-kindertraum-wird-buehnenzauber-der-17-jaehrige-magier-emilian-leber-art-349796",
  },
];

const PressemitteilungenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Aktuelle Pressemitteilungen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Was zuletzt{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                lief
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Fünf Pressemitteilungen aus den letzten drei Jahren — Tour-Premieren,
              TV-Auftritte, Wettbewerbsergebnisse. Volltexte und Hi-Res-Begleitmaterial
              jeweils auf Anfrage als PDF.
            </p>
          </div>
        </div>

        <div
          className={`max-w-5xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {PMS.map((pm) => (
            <article
              key={pm.title}
              className="group grid md:grid-cols-[180px_1fr_auto] gap-x-8 gap-y-3 py-8 md:py-10 border-b border-foreground/15 items-baseline"
            >
              <div>
                <span
                  className={`${SERIF_ITALIC} text-lg md:text-xl block leading-tight`}
                  style={{ color: ACCENT }}
                >
                  {pm.date}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/45 mt-1.5 inline-block">
                  {pm.kicker}
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-3 group-hover:text-[color:var(--accent)] transition-colors" style={{ ["--accent" as any]: ACCENT }}>
                  {pm.title}
                </h3>
                <p className="text-base text-foreground/65 leading-[1.65] max-w-2xl mb-4">
                  {pm.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {pm.url ? (
                    <a
                      href={pm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase border-b pb-0.5 transition-colors"
                      style={{
                        color: ACCENT,
                        borderColor: "rgba(154,38,64,0.35)",
                      }}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Artikel lesen (extern)
                    </a>
                  ) : (
                    <>
                      <a
                        href={EPK_MAIL}
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase border-b pb-0.5 transition-colors"
                        style={{
                          color: ACCENT,
                          borderColor: "rgba(154,38,64,0.35)",
                        }}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        PDF anfordern
                      </a>
                      <span aria-hidden className="text-foreground/25">·</span>
                      <a
                        href={EPK_MAIL}
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/55 hover:text-foreground border-b border-foreground/20 hover:border-foreground/45 pb-0.5 transition-colors"
                      >
                        Volltext lesen
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div className="md:pl-4 md:text-right">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold text-white whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  }}
                >
                  {pm.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   EPK-DOWNLOAD — Mockup-Card mit Anhang-Liste (analog EventAgenturen)
   ═══════════════════════════════════════════════════════════ */
const EPK_ATTACHMENTS = [
  { name: "Bio_kurz_50_woerter.txt", size: "0,4 KB" },
  { name: "Bio_mittel_100_woerter.txt", size: "0,9 KB" },
  { name: "Bio_lang_250_woerter.pdf", size: "62 KB" },
  { name: "Pressefotos_HighRes_300dpi.zip", size: "48 MB" },
  { name: "Logo_SVG_und_PNG.zip", size: "1,2 MB" },
  { name: "QA_Sheet_Interview_Standardfragen.pdf", size: "112 KB" },
  { name: "Tour_2026_Tourdaten_Plötzlich_Magie.pdf", size: "78 KB" },
  { name: "Tech-Rider_Bühne_und_TV.pdf", size: "94 KB" },
];

const EPKDownloadSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Pressekit · Electronic Press Kit.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Ein EPK.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Alles drin
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Acht Assets in einem ZIP — Bio in drei Längen, Hi-Res-Fotos
              freigegeben für Print und Online, Logo als SVG plus PNG, Q&A-Sheet
              mit Standardfragen, aktuelle Tour-Daten und Tech-Rider.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-12 gap-8 lg:gap-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {/* LEFT — Mockup-Card */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
            <div
              className="relative bg-white p-7 md:p-9 overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,40,0.4), 0 15px 35px -15px rgba(40,20,40,0.2), inset 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Header — Datei-Vorschau-Style */}
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-foreground/10">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                      boxShadow: "0 10px 24px -8px rgba(154,38,64,0.45)",
                    }}
                  >
                    <Paperclip
                      className="w-5 h-5 text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-foreground leading-tight">
                      Emilian_Leber_EPK_2026.zip
                    </p>
                    <p
                      className={`${SERIF_ITALIC} text-[12px] text-foreground/55 mt-0.5`}
                    >
                      8 Dateien · 52 MB · Stand März 2026
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold whitespace-nowrap text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  }}
                >
                  v3 · aktuell
                </span>
              </div>

              {/* Anhang-Liste */}
              <ul className="space-y-2 mb-7">
                {EPK_ATTACHMENTS.map((a) => (
                  <li
                    key={a.name}
                    className="flex items-center justify-between gap-4 py-2.5 px-3 rounded-lg hover:bg-foreground/[0.03] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText
                        className="w-4 h-4 shrink-0"
                        style={{ color: ACCENT }}
                        strokeWidth={1.75}
                      />
                      <span className="text-sm text-foreground/80 truncate font-mono">
                        {a.name}
                      </span>
                    </div>
                    <span className="text-[11px] tabular-nums text-foreground/45 shrink-0">
                      {a.size}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer — Download-Status */}
              <div className="pt-5 border-t border-foreground/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="relative w-2 h-2 rounded-full"
                    style={{
                      background: "#1f8f5f",
                      boxShadow: "0 0 0 4px rgba(31,143,95,0.15)",
                    }}
                  />
                  <span className="text-[11px] tracking-[0.14em] uppercase font-bold text-foreground/55">
                    Freigegeben für redaktionelle Nutzung
                  </span>
                </div>
                <a
                  href={EPK_MAIL}
                  className="hero-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                    boxShadow: "0 10px 24px -8px rgba(154,38,64,0.45)",
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  ZIP anfordern
                </a>
              </div>

              <p
                className={`${SERIF_ITALIC} text-xs text-foreground/45 mt-5 text-center`}
              >
                Bildnachweis: MagicEL / Emilian Leber. Keine Bearbeitung der
                Logo-Datei ohne Rücksprache.
              </p>
            </div>
          </div>

          {/* RIGHT — Was im EPK ist */}
          <div className="lg:col-span-5">
            <ol className="space-y-7">
              {[
                {
                  num: "01",
                  Icon: FileText,
                  label: "Boilerplate-Bio in 3 Längen",
                  body: "Copy-paste-fertige Kurz- (50 W.), Mittel- (100 W.) und Lang-Version (250 W.) — angepasst auf typische Press-Briefing-Anforderungen.",
                },
                {
                  num: "02",
                  Icon: ImageIcon,
                  label: "Hi-Res-Pressefotos 300 dpi",
                  body: "Acht freigegebene Fotos — Studio-Portraits, Bühne, Magic-Dinner, Karten-Routine, Publikum. Print-tauglich, mit Bildnachweis-Pflicht.",
                },
                {
                  num: "03",
                  Icon: Trophy,
                  label: "Logo als SVG und PNG",
                  body: "Vektor-Logo plus PNG in 3 Größen. Schwarz und Weiß-Version. Keine Modifikation ohne Rücksprache.",
                },
                {
                  num: "04",
                  Icon: Quote,
                  label: "Q&A-Sheet mit Standardfragen",
                  body: "12 vorbereitete Antworten auf typische Interview-Fragen — von Werdegang bis Lieblings-Routine. Spart Recherche-Zeit.",
                },
                {
                  num: "05",
                  Icon: Calendar,
                  label: "Tour-Daten Plötzlich Magie 2026",
                  body: "Aktuelle Termine, Locations, Ticket-Links. Komplett-Liste plus Einzelansichten pro Tour-Stopp.",
                },
                {
                  num: "06",
                  Icon: Tv,
                  label: "Tech-Rider Bühne und TV",
                  body: "Was es vor Ort braucht — Mikrofon, Sound, Licht, Bühnenmaße. Plus TV-spezifischer Rider mit Kamera-Setup.",
                },
              ].map((v) => (
                <li
                  key={v.num}
                  className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr] gap-5 md:gap-6 items-start pb-6 border-b border-foreground/10 last:border-b-0"
                >
                  <div className="flex flex-col items-start gap-2">
                    <span
                      className={`${SERIF_ITALIC} text-3xl leading-none`}
                      style={{ color: ACCENT }}
                    >
                      {v.num}
                    </span>
                    <v.Icon
                      className="w-4 h-4"
                      style={{ color: ACCENT, opacity: 0.5 }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-base md:text-lg font-bold text-foreground leading-tight mb-2">
                      {v.label}.
                    </h3>
                    <p className="text-sm text-foreground/65 leading-[1.65]">
                      {v.body}
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
   PRESSEFOTOS — asymmetrisches Bento mit Modal
   ═══════════════════════════════════════════════════════════ */
const PHOTOS = [
  {
    src: portraitBuchImg,
    label: "Studio-Portrait mit Buch",
    caption: "Studio · 2025 · vertikal",
    span: "md:col-span-4 md:row-span-2",
    h: "h-[420px] md:h-[640px]",
  },
  {
    src: magicDinnerImg,
    label: "Magic Dinner",
    caption: "Alte Mälzerei Regensburg · 22.02.2026",
    span: "md:col-span-4",
    h: "h-[300px] md:h-[310px]",
  },
  {
    src: portraitCardsImg,
    label: "Karten-Routine Close-Up",
    caption: "Studio · 2024",
    span: "md:col-span-4",
    h: "h-[300px] md:h-[310px]",
  },
  {
    src: buehneZuschauerImg,
    label: "Bühne mit Publikum",
    caption: "Alte Mälzerei · DPSG · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: staunenImg,
    label: "Staunen im Publikum",
    caption: "Live · Firmenfeier · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: greatestTalentImg,
    label: "Greatest Talent · TV-Studio",
    caption: "TV · 2023",
    span: "md:col-span-6",
    h: "h-[280px] md:h-[360px]",
  },
  {
    src: talentsTeamImg,
    label: "Talents of Magic 2024",
    caption: "Wettbewerb · Backstage",
    span: "md:col-span-6",
    h: "h-[280px] md:h-[360px]",
  },
  {
    src: portraitKartenImg,
    label: "Portrait mit Karten",
    caption: "Studio · 2025 · quer",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: audienceImg,
    label: "Audience Reactions",
    caption: "Live · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: portraitImg,
    label: "Studio-Portrait klassisch",
    caption: "Studio · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
];

const PressefotosSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  const active = activeIdx !== null ? PHOTOS[activeIdx] : null;

  return (
    <section
      ref={ref}
      id="pressefotos"
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Pressefotos · Hi-Res 300 dpi.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Zehn Fotos.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Print-ready
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Studio, Bühne, Magic Dinner, TV-Studio — alle Motive freigegeben
              für redaktionelle Nutzung. Bildnachweis-Pflicht: MagicEL / Emilian
              Leber. Klick auf ein Foto öffnet die Hi-Res-Vorschau.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-12 gap-3 md:gap-4 max-w-7xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`group relative overflow-hidden text-left ${p.span} ${p.h}`}
              style={{
                borderRadius: "1rem",
                boxShadow: "0 18px 36px -20px rgba(0,0,0,0.18)",
              }}
            >
              <img
                src={p.src}
                alt={`Pressefoto Emilian Leber — ${p.label}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="font-display text-white font-bold text-base md:text-lg leading-tight mb-1">
                  {p.label}
                </p>
                <p className={`${SERIF_ITALIC} text-white/70 text-[12px]`}>
                  {p.caption}
                </p>
              </div>
              <span
                className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] tracking-[0.12em] uppercase font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "rgba(154,38,64,0.92)",
                }}
              >
                <Download className="w-3 h-3" />
                Hi-Res
              </span>
            </button>
          ))}
        </div>

        <p
          className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-10 text-center max-w-2xl mx-auto`}
        >
          Für Print-Auflösung 300 dpi bitte direkt anfragen — Hi-Res-Versionen
          liegen separat als ZIP bereit (siehe EPK oben).
        </p>
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(8,6,12,0.92)" }}
          onClick={() => setActiveIdx(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIdx(null)}
            aria-label="Schließen"
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full text-white hover:bg-white/10 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.22)" }}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={`Pressefoto Emilian Leber — ${active.label}`}
              className="w-full max-h-[78vh] object-contain rounded-2xl"
            />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-white">
              <div>
                <p className="font-display text-lg md:text-xl font-bold">
                  {active.label}
                </p>
                <p className={`${SERIF_ITALIC} text-sm text-white/65 mt-1`}>
                  {active.caption} · Bildnachweis: MagicEL / Emilian Leber
                </p>
              </div>
              <a
                href={EPK_MAIL}
                className="hero-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)",
                }}
              >
                <Download className="w-4 h-4" />
                Hi-Res anfragen
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   BOILERPLATE — 3 Längen mit Copy-Button
   ═══════════════════════════════════════════════════════════ */
const BIO_KURZ =
  "Emilian Leber ist Zauberkünstler und Comedy-Magier aus Bayern. Mit über 200 Live-Auftritten seit 2016, TV-Interview bei TVA und Greatest Talent sowie dem Kreativpreis bei Talents of Magic 2024 zählt er zu den profiliertesten jungen Magiern Deutschlands. 5,0 Sterne bei ProvenExpert.";

const BIO_MITTEL =
  "Emilian Leber (geb. 2008) ist Zauberkünstler, Mentalmagier und Comedy-Entertainer aus Bayern. Über 200 Live-Auftritte seit 2016 — vom privaten Magic Dinner über Galaabende bis zu Versicherungs-Konzern-Events mit 200 Gästen. 2023 Finalist bei Greatest Talent, 2024 Finalist und Kreativpreisträger bei Talents of Magic, 2024 Top 30 bei der Deutschen Jugendmeisterschaft, 2024 TV-Interview im Bayerischen Regional-TV (TVA). Hauspartner-Restaurant für die Magic-Dinner-Reihe: Wald & Wiese in Sinzing bei Regensburg. 2026 Tour-Premiere der abendfüllenden Show Plötzlich Magie — Magic Meets Comedy.";

const BIO_LANG =
  "Emilian Leber (geb. 2008) ist Zauberkünstler, Mentalmagier und Comedy-Entertainer aus Bayern. Erste Tricks mit acht Jahren am heimischen Wohnzimmertisch, erster bezahlter Auftritt mit zwölf, erste abendfüllende Show 2023 — kurz darauf das Finale bei Greatest Talent (TV-Wettbewerb mit über 400 Bewerbungen). 2024 folgte das Finale bei Talents of Magic mit zusätzlichem Kreativpreis für eine eigens konzipierte Routine aus Mentalmagie und Comedy-Storytelling. Im selben Jahr Top 30 bei der Deutschen Jugendmeisterschaft der Zauberkunst des Magischen Zirkels Deutschland. 2024 TV-Interview im Bayerischen Regional-TV (TVA) als 16-Jähriger, Karten-Test mit dem Moderator und Mentaleffekt mit dem Studio-Publikum. Seit 2016 über 200 Live-Auftritte — Spannbreite von privaten Hochzeiten und Magic-Dinner-Abenden im Hauspartner-Restaurant Wald & Wiese (Sinzing bei Regensburg) bis zu DAX-Konzern-Galas für Versicherungskammer Bayern, STRABAG, Sixt und Sparkasse. 5,0 Sterne auf ProvenExpert und Google über mehr als dreißig verifizierte Bewertungen. Im Frühjahr 2026 Premiere der abendfüllenden Tour-Show Plötzlich Magie — Magic Meets Comedy mit anschließender Tour durch bayerische Theater. Bayern primär, deutschlandweit buchbar.";

const BIOS = [
  {
    laenge: "Kurz",
    woerter: "50 Wörter",
    desc: "Für Programmhefte, Anmoderationen, Social-Media-Captions.",
    text: BIO_KURZ,
  },
  {
    laenge: "Mittel",
    woerter: "100 Wörter",
    desc: "Für Tageszeitungs-Vorberichte, Event-Ankündigungen, Branchen-Newsletter.",
    text: BIO_MITTEL,
  },
  {
    laenge: "Lang",
    woerter: "250 Wörter",
    desc: "Für Feature-Artikel, Magazin-Portraits, ausführliche Press-Kits.",
    text: BIO_LANG,
  },
];

const BoilerplateSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = async (text: string, idx: number) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx(null), 2200);
    } catch {
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx(null), 2200);
    }
  };

  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Boilerplate · drei Längen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              50, 100,{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                250 Wörter
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Drei Bio-Versionen für drei Use-Cases — Programmheft,
              Vorbericht, Feature-Artikel. Copy-paste-fertig, keine Anpassungen
              nötig. Bildnachweis bitte: MagicEL / Emilian Leber.
            </p>
          </div>
        </div>

        <div
          className={`grid lg:grid-cols-3 gap-6 md:gap-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {BIOS.map((b, i) => (
            <article
              key={b.laenge}
              className="relative flex flex-col bg-[hsl(36,30%,97%)] p-7 md:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 25px 50px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span
                  className={`${SERIF_ITALIC} text-2xl md:text-3xl leading-none`}
                  style={{ color: ACCENT }}
                >
                  {b.laenge}
                </span>
                <span className="text-[10px] tracking-[0.16em] uppercase font-bold text-foreground/45">
                  {b.woerter}
                </span>
              </div>
              <p
                className={`${SERIF_ITALIC} text-[13px] text-foreground/55 mb-5`}
              >
                {b.desc}
              </p>

              <div
                className="relative bg-white p-5 mb-5 flex-1 overflow-hidden"
                style={{
                  borderRadius: "0.9rem",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85)",
                }}
              >
                <p className="text-[13px] md:text-sm leading-[1.7] text-foreground/80 font-mono">
                  {b.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copy(b.text, i)}
                className="hero-cta inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white w-full"
                style={{
                  background:
                    copiedIdx === i
                      ? "linear-gradient(135deg, #1f8f5f, #3ab27c)"
                      : `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow:
                    copiedIdx === i
                      ? "0 10px 24px -8px rgba(31,143,95,0.45)"
                      : "0 10px 24px -8px rgba(154,38,64,0.45)",
                }}
                aria-label={
                  copiedIdx === i
                    ? "In Zwischenablage kopiert"
                    : `${b.laenge}-Boilerplate kopieren`
                }
              >
                {copiedIdx === i ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Kopiert
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    In Zwischenablage
                  </>
                )}
              </button>
            </article>
          ))}
        </div>

        <p
          className={`${SERIF_ITALIC} text-sm text-foreground/55 mt-12 text-center max-w-2xl mx-auto`}
        >
          Alle Boilerplates auf Stand März 2026. Anpassungen oder
          Sonderversionen (englisch, fachspezifisch, mit Tour-Daten)
          gerne auf Anfrage.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   AKTUELLE SHOW 2026 — Plötzlich Magie Editorial-Split
   ═══════════════════════════════════════════════════════════ */
const PloetzlichMagieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="lg:col-span-6">
            <span
              className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white mb-6"
              style={{
                background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              }}
            >
              Aktuelle Show · 2026
            </span>
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-5`}
            >
              Erste abendfüllende Tour-Show.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground mb-7">
              Plötzlich{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Magie
              </span>
              .
              <br />
              Magic Meets Comedy.
            </h2>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-5 max-w-xl">
              Neunzig Minuten Bühne — Mentalmagie, Karten-Routinen, Comedy-Storytelling.
              Premiere am 22.02.2026 in der Alten Mälzerei Regensburg
              in Sinzing bei Regensburg, anschließend Tour durch bayerische
              Theater und Saal-Bühnen.
            </p>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-8 max-w-xl">
              Press-Anfragen für Premieren-Akkreditierung, Foto-Termine während
              der Generalprobe und Interview-Slots vor und nach der Show:
              gerne direkt — Slots sind begrenzt, frühe Anfragen bevorzugt.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "90 Minuten",
                "Mentalmagie · Comedy",
                "Premiere Frühjahr 2026",
                "Bayerische Tour",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-foreground/70 bg-white border border-foreground/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:el@magicel.de?subject=Tour-Anfrage%20Plötzlich%20Magie%202026"
                className="hero-cta inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)",
                }}
              >
                Tour-Anfrage senden
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/tickets"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground/65 hover:text-foreground border-b border-foreground/25 hover:border-foreground pb-1 transition-colors"
              >
                Tour-Daten ansehen
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "1.5rem",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,40,0.45), 0 18px 40px -15px rgba(40,20,40,0.25)",
              }}
            >
              <img
                src={magicDinnerImg}
                alt="Plötzlich Magie 2026 — Emilian Leber Tour-Show Premiere in der Alten Mälzerei Regensburg"
                className="w-full h-[480px] md:h-[600px] object-cover"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,6,12,0) 50%, rgba(8,6,12,0.7) 100%)",
                }}
              />
              <div
                className="absolute bottom-5 left-5 right-5 p-5 text-white"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255,255,255,0.22)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.6), 0 20px 40px -20px rgba(0,0,0,0.45)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin
                    className="w-3.5 h-3.5"
                    style={{ color: "#f3d9a8" }}
                  />
                  <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/85">
                    Premiere-Location
                  </span>
                </div>
                <p className="font-display text-base md:text-lg font-bold leading-tight mb-1">
                  Alte Mälzerei Regensburg
                </p>
                <p className={`${SERIF_ITALIC} text-sm text-white/70`}>
                  22.02.2026 · Tour-Premiere
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
   INTERVIEW-ZITATE — Magazin-Liste mit großen Quotes
   ═══════════════════════════════════════════════════════════ */
const QUOTES = [
  {
    quote:
      "Die schönste Reaktion ist nicht der Applaus. Es sind die drei Sekunden Stille davor, in denen alle gleichzeitig die Luft anhalten.",
    context: "Über den Moment vor dem Applaus",
    source: "Interview · TVA · 2024",
  },
  {
    quote:
      "Comedy ist die Tür, durch die Magie ins Herz kommt. Wer lacht, lässt los — und wer loslässt, ist plötzlich offen für das Unmögliche.",
    context: "Über das Verhältnis von Comedy und Magie",
    source: "idowa-Portrait · August 2025",
  },
  {
    quote:
      "Ein guter Trick hat ein Geheimnis. Eine gute Routine hat eine Geschichte. Das eine kann man lernen — das andere muss man auf der Bühne entdecken.",
    context: "Über den Unterschied zwischen Trick und Routine",
    source: "Talents-of-Magic Pressetext 2024",
  },
  {
    quote:
      "Ich frage immer nach einer Anekdote vom Auftraggeber, bevor ich auf die Bühne gehe. Diese eine Geschichte ist der Unterschied zwischen Show und Erinnerung.",
    context: "Über die Vorbereitung auf einen Auftritt",
    source: "Greatest-Talent Backstage 2023",
  },
  {
    quote:
      "Magie funktioniert dann, wenn das Publikum spürt: hier steht jemand, der seine Arbeit ernst nimmt — aber sich selbst nicht zu ernst.",
    context: "Über professionelle Bühnenhaltung",
    source: "Eigenes Press-Statement 2026",
  },
];

const InterviewZitateSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
            >
              Interview-Zitate · zum Weiterverwenden.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              In{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                eigenen Worten
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Fünf O-Töne aus Interviews und Press-Statements — frei verwendbar
              mit Quellenangabe. Für Headline-Pull-Quotes, Bildunterzeilen,
              Vorbericht-Einleitungen.
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-14 max-w-6xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className={`relative ${i === 4 ? "md:col-span-2 max-w-3xl mx-auto" : ""}`}
            >
              <Quote
                className="w-9 h-9 md:w-10 md:h-10 mb-5 opacity-30"
                style={{ color: ACCENT }}
                strokeWidth={1.25}
              />
              <blockquote
                className={`${SERIF_ITALIC} text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.25] text-foreground mb-6`}
              >
                {q.quote}
              </blockquote>
              <figcaption>
                <p className="text-[11px] tracking-[0.16em] uppercase font-bold mb-1.5" style={{ color: ACCENT }}>
                  {q.context}
                </p>
                <p className="text-sm text-foreground/55">{q.source}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL-QUOTE — Black Full-Bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25">
        <img
          src={stageShowImg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(8,6,12,0.6) 0%, rgba(8,6,12,0.95) 70%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(199,144,66,0.55), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.7), transparent 65%)",
        }}
      />
      <div
        className={`relative container px-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      >
        <Quote
          className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto opacity-40"
          style={{ color: "#f3d9a8" }}
          strokeWidth={1.25}
        />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p className="font-display font-black tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.75rem)]">
            Erstes TV-Interview{" "}
            <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
              mit 16
            </span>
            .<br />
            Acht Jahre nach dem{" "}
            <span className={SERIF_ITALIC} style={{ color: "#f3d9a8" }}>
              ersten Trick
            </span>
            .
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span className={`${SERIF_ITALIC} text-base md:text-lg text-white/65`}>
              TVA Bayern · 2024
            </span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   VIDEO-SECTION — TVA-Auftritt
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
              Video-Mitschnitt · TVA 2024.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              TV-Auftritt{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                im Mitschnitt
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.65] max-w-md">
              Studio-Aufzeichnung bei TVA Bayern — Live-Routine vor der Kamera,
              eingebauter Karten-Test mit dem Moderator, Mentaleffekt mit
              Studio-Publikum. Voller Mitschnitt zum Einbetten freigegeben.
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
              title="TVA TV-Interview 2023 — Emilian Leber"
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
          <span aria-hidden className="text-foreground/25">·</span>
          <span className={SERIF_ITALIC}>November 2025</span>
          <span aria-hidden className="text-foreground/25">·</span>
          <span>Embed-Code auf Anfrage</span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRESS-FAQ — presse-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Wie komme ich an die Hi-Res-Pressefotos?",
    a: "Pressefotos in 300 dpi liegen als ZIP bereit — direkt per Mail anfordern oder das vollständige EPK abrufen. Acht Motive freigegeben für redaktionelle Nutzung (Print und Online). Bildnachweis-Pflicht: MagicEL / Emilian Leber. Eilfälle bitte mit Hinweis im Betreff, Antwort innerhalb von vier Stunden werktags.",
  },
  {
    q: "Darf ich die Interview-Zitate frei zitieren?",
    a: "Alle Zitate aus dem Bereich Interview-Zitate sind frei zur Verwendung — bitte mit Quellenangabe (Medium/Anlass aus der jeweiligen Caption). Für individuelle O-Töne, abweichende Zuspitzungen oder Themen-spezifische Statements bin ich kurzfristig per Telefon oder Mail ansprechbar. Originalton-Audios auf Anfrage.",
  },
  {
    q: "Wie sind die Honorar-Bedingungen für TV- und Medienauftritte?",
    a: "Honorare für TV-Auftritte werden individuell verhandelt — abhängig von Format-Länge, Sendezeit-Slot, Verwertungsrechten und Vor-Ort-Anforderungen. Für redaktionelle Presse-Berichterstattung in Print/Online fallen keine Honorare an. Verbindliches Angebot binnen 24 Stunden nach Erstanfrage.",
  },
  {
    q: "Was sind die Bühnen-Anforderungen für TV-Aufzeichnungen?",
    a: "Mindestbühnenfläche zwei mal eineinhalb Meter, Headset-Mikrofon (XLR oder Funk), Frontspot oder ausgeleuchtete Bühne. Eigenes Headset-Mic Sennheiser EW-Serie und Mini-PA bis 80 Gäste bringe ich mit. TV-spezifischer Tech-Rider mit Kamera-Setup separat im EPK. Soundcheck und Vor-Probe 30 bis 60 Minuten vor Aufzeichnung.",
  },
  {
    q: "Gibt es eine englische Bio für internationale Press?",
    a: "Die deutschen Boilerplate-Versionen liegen in 50/100/250-Wörter-Längen vor. Englische und französische Übersetzungen auf Anfrage — Lieferzeit zwei Werktage, kostenfrei für redaktionelle Presse-Anwendungen.",
  },
  {
    q: "Wie schnell kommt eine Antwort?",
    a: "Werktags binnen 24 Stunden, Eilfälle (Redaktionsschluss heute, Live-Schalte morgen) deutlich schneller — bitte im Betreff markieren oder direkt anrufen. Wochenende und Feiertage ebenfalls per WhatsApp erreichbar bei dringenden Themen.",
  },
];

const PressFAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="max-w-3xl mb-14 md:mb-16">
          <p
            className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
          >
            Häufige Press-Fragen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was Redaktionen
            <br />
            <span className={SERIF_ITALIC}>vorab fragen.</span>
          </h2>
        </div>
        <div
          className={`max-w-3xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group py-6 md:py-7 border-b border-foreground/15"
            >
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRESS-KONTAKT-DIREKT — eigene Sektion mit Foto + Kontaktkanäle
   ═══════════════════════════════════════════════════════════ */
const PressKontaktDirektSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative text-white py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={portraitBuchImg}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 25%" }}
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 45%, rgba(8,6,12,0.55) 100%)",
          }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(154,38,64,0.55), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,40,0.5), transparent 60%)",
        }}
      />

      <div className="relative container px-6">
        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-12 items-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <div className="lg:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-white/55 mb-6`}
            >
              Direkter Press-Kontakt.
            </p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.0] text-[clamp(2.5rem,6vw,5.5rem)] mb-8">
              Schreib mir{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
                direkt
              </span>
              .
            </h2>
            <p className="text-base md:text-lg text-white/75 leading-[1.7] mb-10 max-w-xl">
              Kein Agent, kein Booker, keine Press-Office-Hürde dazwischen.
              Werktags binnen 24 Stunden zurück — bei Eilfällen schneller.
              Standort Bayern, deutschlandweit buchbar, TV-erfahren.
            </p>

            <div className="space-y-4 max-w-xl">
              {[
                {
                  Icon: Mail,
                  label: "Email",
                  value: "el@magicel.de",
                  href: "mailto:el@magicel.de",
                  hint: "Standardweg · Antwort werktags binnen 24 h",
                },
                {
                  Icon: Phone,
                  label: "Telefon",
                  value: "+49 1556 3744696",
                  href: "tel:+4915563744696",
                  hint: "Mo–Fr 9–18 Uhr · Eilfälle direkt durchklingeln",
                },
                {
                  Icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+49 1556 3744696",
                  href: "https://wa.me/4915563744696",
                  hint: "Auch Wochenende für dringende Press-Themen",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)",
                    backdropFilter: "blur(24px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.4), 0 18px 36px -18px rgba(0,0,0,0.45)",
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                      border: "1px solid rgba(255,255,255,0.22)",
                    }}
                  >
                    <c.Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/55 mb-0.5">
                      {c.label}
                    </p>
                    <p className="font-display text-lg md:text-xl font-bold text-white leading-tight">
                      {c.value}
                    </p>
                    <p className={`${SERIF_ITALIC} text-sm text-white/55 mt-0.5`}>
                      {c.hint}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 text-white/55 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                  />
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
                24h Antwort werktags
              </span>
              <span aria-hidden className="text-white/25">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: ACCENT_SOFT }} />
                Standort Bayern
              </span>
              <span aria-hidden className="text-white/25">·</span>
              <span>Deutschlandweit buchbar</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="p-7 md:p-9"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
                backdropFilter: "blur(32px) saturate(190%)",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: "1.5rem",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.5), 0 40px 80px -25px rgba(0,0,0,0.55)",
              }}
            >
              <p
                className={`${SERIF_ITALIC} text-base md:text-lg text-white/55 mb-3`}
              >
                Eine kurze Selbst-Vorstellung —
              </p>
              <p className="font-display text-xl md:text-2xl font-bold text-white leading-snug mb-5">
                Mit acht Jahren der erste Trick. Mit zwölf der erste bezahlte
                Gig. Mit einundzwanzig der erste TV-Auftritt.
              </p>
              <p className="text-sm md:text-base text-white/70 leading-[1.7] mb-6">
                Über zweihundert Live-Auftritte, fünf TV-Stationen und
                Wettbewerbe, Hauspartner-Restaurant für die Magic-Dinner-Reihe
                in Sinzing. Im Frühjahr 2026 die erste eigene Tour-Show.
              </p>
              <div className="pt-5 border-t border-white/15 grid grid-cols-3 gap-3">
                {[
                  { v: "200+", l: "Events" },
                  { v: "5,0", l: "Sterne" },
                  { v: "24h", l: "Antwort" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="font-display text-2xl font-black text-white tabular-nums leading-none">
                      {s.v}
                    </p>
                    <p
                      className={`${SERIF_ITALIC} text-xs text-white/55 mt-1.5`}
                    >
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href={EPK_MAIL}
                className="hero-cta mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white w-full"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 14px 30px -10px rgba(154,38,64,0.55)",
                }}
              >
                <Download className="w-3.5 h-3.5" />
                Komplettes EPK anfordern
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/presse";

const Presse = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Pressebereich — Pressekit, Fotos, Boilerplate | Emilian Leber Zauberer</title>
      <meta
        name="description"
        content="Pressebereich Emilian Leber Zauberer: Pressekit-Download, Hi-Res-Pressefotos, Boilerplate in 3 Längen, aktuelle Pressemitteilungen. Bekannt aus TVA, Greatest Talent, Talents of Magic."
      />
      <meta
        name="keywords"
        content="Emilian Leber Presse, Zauberer Pressekit, EPK Magier, Pressefotos Zauberkünstler, Pressekontakt Magier Bayern, Pressemitteilung Magier, Boilerplate Zauberkünstler"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="Pressebereich — Pressekit, Fotos, Boilerplate | Emilian Leber Zauberer"
      />
      <meta
        property="og:description"
        content="Pressekit-Download, Hi-Res-Pressefotos, Boilerplate in 3 Längen, aktuelle Pressemitteilungen. Bekannt aus TVA, Greatest Talent, Talents of Magic. 5,0 ★."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Pressebereich — Pressekit, Fotos, Boilerplate | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="EPK, Hi-Res-Fotos, Boilerplate in 3 Längen. Direkt-Kontakt mit 24h-Antwort."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
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
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Emilian Leber",
        alternateName: "Magic EL",
        jobTitle: "Zauberkünstler · Mentalmagier · Comedy-Entertainer",
        url: SITE_URL,
        sameAs: [
          "https://www.magicel.de",
          "https://www.instagram.com/magicel.de",
        ],
        image: "https://www.magicel.de/og-image.jpg",
        email: "mailto:el@magicel.de",
        telephone: "+49 1556 3744696",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Bayern",
          addressCountry: "DE",
        },
        award: [
          "Kreativpreis Talents of Magic 2024",
          "Finalist Talents of Magic 2024",
          "Finalist Greatest Talent 2023",
          "Top 30 Deutsche Jugendmeisterschaft 2024",
        ],
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MagicEL · Emilian Leber",
        url: "https://www.magicel.de",
        logo: "https://www.magicel.de/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "press",
          email: "el@magicel.de",
          telephone: "+49 1556 3744696",
          areaServed: "DE",
          availableLanguage: ["de", "en"],
        },
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: "https://www.magicel.de/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Pressebereich",
            item: SITE_URL,
          },
        ],
      })}</script>
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee
          eyebrow="TV-Stationen und Bühnen-Wettbewerbe."
          variant="cream"
          compact
        />
        <BekanntAusSection />
        <PortfolioDownloadSection />
        <PressemitteilungenSection />
        <EPKDownloadSection />
        <PressefotosSection />
        <BoilerplateSection />
        <PloetzlichMagieSection />
        <InterviewZitateSection />
        <PullQuoteSection />
        <VideoSection />
        <PressFAQSection />
        <PressKontaktDirektSection />
      </main>
    </PageLayout>
  </>
);

export default Presse;
