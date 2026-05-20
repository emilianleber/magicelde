import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
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
  Quote,
  Heart,
  Mail,
  Phone,
} from "lucide-react";
import { TVA_VIDEO_ID } from "@/lib/videos";

import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import portraitCardsImg from "@/assets/emilian-portrait-cards.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import magicianPortraitImg from "@/assets/magician-portrait.jpg";
import greatestTalentImg from "@/assets/greatest-talent-presse.jpg";
import talentsOfMagicImg from "@/assets/talents-of-magic-team.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import staunenImg from "@/assets/staunen.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import emilianMagicDinnerImg from "@/assets/emilian-magic-dinner.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";

/* ═══════════════════════════════════════════════════════════
   HERO — Studio-Portrait, dark, persönlich
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroZoomIn { from { transform: scale(1.18); opacity: 0.35; filter: blur(8px); } to { transform: scale(1.02); opacity: 1; filter: blur(0); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    @keyframes heroOvershoot { 0% { opacity: 0; transform: translateY(60px) scale(0.88); } 55% { opacity: 1; transform: translateY(-10px) scale(1.04); } 80% { transform: translateY(2px) scale(0.99); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); } }
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

const HEADLINE_SANS = ["Emilian", "Leber."];
const HEADLINE_ITALIC = ["Zauberkünstler."];

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
          src={portraitBuchImg}
          alt="Emilian Leber — Zauberer aus Bayern, Studio-Portrait mit Buch"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 28%",
            filter: "saturate(0.88) contrast(1.1) brightness(0.62)",
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
                Magie seit 2016
              </strong>{" "}
              · zehn Jahre Bühne
            </span>
          </div>
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
            Ich bin Emilian Leber — Zauberer aus Bayern, mit Acht angefangen,
            mit Zwölf den ersten bezahlten Gig. Seit 2016 auf der Bühne. Heute:
            TV-Finalist, Magic Meets Comedy, deutschlandweit gebucht. Hier
            erzähle ich dir, wie das passiert ist.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#werdegang"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
            >
              Mein Werdegang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/buchung"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              Schreibe mir direkt
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
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                200+
              </strong>
              <span className="text-white/65">Events</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                10
              </strong>
              <span className="text-white/65">Jahre Bühne</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                3
              </strong>
              <span className="text-white/65">TV-Finalist-Platzierungen</span>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">Bayern + deutschlandweit</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · DREI TOOLS AUF DER BÜHNE — page-eigener Twist
   Karte / Münze / Buch als 3 Hero-Cards in Triptychon-Layout
   ═══════════════════════════════════════════════════════════ */
const TOOLS = [
  {
    name: "Die Karte.",
    eyebrow: "Werkzeug Eins",
    body:
      "Mit acht Jahren der erste Trick. Mit zwölf der erste bezahlte Gig. Ein klassisches Pokerdeck, 52 Möglichkeiten, eine Geschichte pro Karte. Die Karte ist mein Anker — was an einem Tisch funktioniert, funktioniert auf der Bühne mit drei Kameras genauso. Sie ist klein genug für Close-Up, groß genug für Mentaleffekte.",
    detail: "52 Karten · 8 Jahre · seit dem ersten Trick dabei",
    img: portraitCardsImg,
    accent: ACCENT,
  },
  {
    name: "Die Münze.",
    eyebrow: "Werkzeug Zwei",
    body:
      "Eine 2-Euro-Münze. Mehr braucht es nicht. Münzmagie ist die strengste Disziplin in unserem Handwerk — keine Verstecke, keine Ablenkung durch Bilder, nur Hand und Aufmerksamkeit. Drei Jahre täglich vor dem Spiegel, bis eine Münze unsichtbar zwischen den Fingern wandert. Wer Münzen kann, kann alles.",
    detail: "2 Euro · 3 Jahre tägliches Training · reines Handwerk",
    img: haendeImg,
    accent: ACCENT_DEEP,
  },
  {
    name: "Das Buch.",
    eyebrow: "Werkzeug Drei",
    body:
      "Mentalmagie braucht keine Karten und keine Münzen — sie braucht Sprache. Ein Buch wird zur Bühne im Kopf. Ein zufälliges Wort, gewählt auf Seite hundertdreiundzwanzig, landet drei Minuten später als handschriftliche Vorhersage in einem versiegelten Umschlag. Hier kommt mein Hintergrund in Psychologie zum Tragen.",
    detail: "300+ Seiten · 1 Wort · 3 Minuten zur Vorhersage",
    img: portraitBuchImg,
    accent: "#1f5e3f",
  },
];

const DreiToolsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
      id="werkzeuge"
    >
      <div className="container px-6">
        {/* Frameblox-Header */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Drei Werkzeuge. Eine Bühne.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Karte. Münze.{" "}
              <span style={{ color: ACCENT }}>
                Buch.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Ich brauche keinen Zylinder, kein Kaninchen, keine Klappboxen.
              Drei Gegenstände, die jeder Gast aus der eigenen Tasche kennt —
              und genau das macht sie verstörend. Wenn etwas Unmögliches mit
              einer 2-Euro-Münze passiert, gibt es keine Ausreden.
            </p>
          </div>
        </div>

        {/* Triptychon — gleichwertige Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 lg:gap-8`}
        >
          {TOOLS.map((t, i) => (
            <article
              key={t.name}
              className="group relative overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 30px 70px -25px rgba(40,20,10,0.32), 0 12px 28px -10px rgba(40,20,10,0.16)",
              }}
            >
              {/* Photo-Backdrop */}
              <div className="relative h-[420px] md:h-[560px] overflow-hidden">
                <img
                  src={t.img}
                  alt={`${t.name} — Werkzeug auf der Magier-Bühne`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, ${t.accent}DD 100%)`,
                  }}
                />
                {/* Eyebrow oben links */}
                <span
                  className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(8,6,12,0.55)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {t.eyebrow}
                </span>
                {/* Text unten */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3
                    className={`${SERIF_ITALIC} text-3xl md:text-4xl leading-[1.05] mb-3`}
                    style={{ color: "#f3d9a8" }}
                  >
                    {t.name}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-[1.55] text-white/85 mb-4">
                    {t.body}
                  </p>
                  <p
                    className="text-[11px] tracking-[0.12em] uppercase font-semibold text-white/70"
                  >
                    {t.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer-Zeile */}
        <div className="max-w-3xl mx-auto text-center mt-16 md:mt-20">
          <p
            className={`${SERIF_ITALIC} text-xl md:text-2xl text-foreground/70 leading-[1.4]`}
          >
            Drei Gegenstände aus deiner Hosentasche.{" "}
            <span style={{ color: ACCENT }}>Sechs Stunden tägliches Üben.</span>{" "}
            Zehn Jahre.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · WERDEGANG-TIMELINE — page-eigener Twist
   Links: Timeline mit echten Stationen
   Rechts: Sticky Pull-Quote die mit der aktiven Phase wechselt
   ═══════════════════════════════════════════════════════════ */
const STATIONEN = [
  {
    year: "2008",
    age: "8 Jahre alt",
    title: "Der erste Trick.",
    body:
      "Zauberkasten zum Geburtstag, die seidene Karte verschwindet zwischen den Fingern. Eine Stunde später sitzt die ganze Familie im Wohnzimmer, ich stehe auf dem Couchtisch. Diesen Moment habe ich nicht losgelassen.",
    quote: "Acht Jahre alt. [Ein Trick im Kinderzimmer.] Eine Stunde später spielt die ganze Familie mit.",
  },
  {
    year: "2012",
    age: "12 Jahre alt",
    title: "Erster bezahlter Gig.",
    body:
      "Eine Tante einer Freundin sucht Unterhaltung für ihren Kindergeburtstag. Drei Karten-Tricks, fünfzehn Minuten, dreißig Euro im Umschlag. Aus dem Hobby wird ein Handwerk. Ich kaufe vom Geld das nächste Trick-Buch.",
    quote: "Zwölf Jahre. [Dreißig Euro im Umschlag.] Aus Hobby wird Handwerk.",
  },
  {
    year: "2016",
    age: "Anfang Karriere",
    title: "Vom Hobby zum Beruf.",
    body:
      "Erste Firmenfeiern, erste Hochzeiten, erste eigene Website. Vom Wohnzimmer in die echten Säle Bayerns. Ich nenne 2016 meinen offiziellen Bühnenstart — alles davor war Training, alles danach Beruf. Seitdem habe ich nie aufgehört zu lernen.",
    quote: "Zweitausendsechzehn. [Der Bühnenstart.] Zehn Jahre habe ich nicht mehr aufgehört.",
  },
  {
    year: "Sep 2023",
    age: "TV-Premiere",
    title: "Greatest Talent · Finalist.",
    body:
      "Casting in München, drei Vorrunden, schließlich Live-Finale im Fernsehen. Vor laufender Kamera mit einem fremden Mentaleffekt. Wer einmal vor TV-Kameras stand, hat keine Bühnenangst mehr — nirgends. Diese Sendung hat alles verändert.",
    quote: "September Zweitausenddreiundzwanzig. [Finalist bei Greatest Talent.] Live im Fernsehen.",
  },
  {
    year: "2023",
    age: "Erste abendfüllende Show",
    title: "Sechzig Minuten Solo.",
    body:
      "Eigene Show, kein Co-Künstler, kein Sicherheitsnetz. Vom Hook bis zur Zugabe alles selbst geschrieben, dramaturgisch aufgebaut. Die erste Vorstellung war voll. Die zweite auch. Die Bühne wurde mein Zuhause.",
    quote: "Zweitausenddreiundzwanzig. [Die erste eigene Show.] Sechzig Minuten Solo, ohne Netz.",
  },
  {
    year: "2024",
    age: "Doppel-Auszeichnung",
    title: "Talents of Magic · Finalist + Kreativpreis.",
    body:
      "Einer der härtesten Magie-Wettbewerbe in Deutschland. Drei Vorrunden, Jury aus internationalen Magiern, Finale in München. Ich gewinne zusätzlich den Kreativpreis für eine selbst entwickelte Mentalmagic-Routine. Die Auszeichnung bestätigt: das hier ist nicht nur Zauberei, das ist Kunst.",
    quote: "Zweitausendvierundzwanzig. [Kreativpreis bei Talents of Magic.] Anerkennung von der Zunft.",
  },
  {
    year: "2024",
    age: "Junge Elite",
    title: "Deutsche Jugendmeisterschaft · Top 30.",
    body:
      "Bei der DJM unter den dreißig Besten von über hundertfünfzig Nachwuchsmagiern Deutschlands. Drei Tage Workshops, Vorführungen, Critique-Sessions mit Profis. Ich nehme so viel mit wie nirgends sonst. Ein Wendepunkt — ab da gehe ich Magie als Beruf an.",
    quote: "Top Dreißig. [Bei der Deutschen Jugendmeisterschaft.] Drei Tage Wendepunkt.",
  },
  {
    year: "2025",
    age: "Vollberuflich + TV",
    title: "Vollberuflich. TVA-Auftritt.",
    body:
      "Magie ist offiziell mein Beruf — kein Nebenher mehr. Im Herbst lädt der TVA (TV Aktuell) zum Live-Studio-Auftritt ein. Drei Minuten Mentalmagie vor laufender Kamera mit dem Moderator. Das Video läuft heute auf der Startseite — siehe Video-Section weiter unten.",
    quote: "Zweitausendfünfundzwanzig. [Vollberuflich.] Magie ist nicht mehr ein Teil von mir — sie ist es ganz.",
  },
  {
    year: "2026",
    age: "Aktuelle Show",
    title: "[Plötzlich Magie] — Magic Meets Comedy.",
    body:
      "Die neue abendfüllende Show, mit der ich gerade auf Tour gehe. Magie trifft Comedy, Mentalmagie trifft Stand-Up, Tisch-Magic trifft Bühnen-Wunder. Premiere im Sommer in Bayern, danach deutschlandweit. Wenn du eine Karte willst — schreib mir.",
    quote: "Zweitausendsechsundzwanzig. [Plötzlich Magie.] Magic meets Comedy. Die Tour beginnt.",
  },
];

const WerdegangTimelineSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const phaseRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activePhase, setActivePhase] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = phaseRefs.current.findIndex(
            (el) => el === entry.target,
          );
          if (idx === -1) return;
          if (entry.isIntersecting) {
            setActivePhase((prev) => Math.max(prev, idx));
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    phaseRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const fillPct =
    activePhase < 0 ? 0 : ((activePhase + 1) / STATIONEN.length) * 100;

  const activeQuote =
    activePhase >= 0 ? STATIONEN[activePhase].quote : STATIONEN[0].quote;

  return (
    <section
      ref={ref}
      id="werdegang"
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Werdegang. Echte Stationen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Von Acht{" "}
              <span style={{ color: ACCENT }}>
                bis Heute.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md mb-6">
              Neun Stationen in achtzehn Jahren. Vom ersten Zauberkasten zum
              TV-Studio. Hier sind die Momente, die mich geprägt haben — keine
              Marketing-Floskeln, sondern echte Wendepunkte.
            </p>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-foreground/55">
              <span className="text-sm">
                <strong className="text-foreground font-bold">2016</strong>{" "}
                Bühnenstart
              </span>
              <span aria-hidden className="text-foreground/20">·</span>
              <span className="text-sm">
                <strong className="text-foreground font-bold">10</strong> Jahre
                Profi
              </span>
              <span aria-hidden className="text-foreground/20">·</span>
              <span className="text-sm">
                <strong className="text-foreground font-bold">3</strong>{" "}
                TV-Finals
              </span>
            </div>
          </div>
        </div>

        {/* Timeline + Sticky Pull-Quote */}
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 lg:items-stretch ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {/* LEFT — Timeline */}
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
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.040) 100%)",
                boxShadow: "0 0 12px rgba(0,0,0,0.040)",
              }}
            />
            <ol className="space-y-12 md:space-y-14">
              {STATIONEN.map((s, i) => {
                const isActive = activePhase >= i;
                return (
                  <li
                    key={s.year + s.title}
                    ref={(el) => {
                      phaseRefs.current[i] = el;
                    }}
                    className="relative pl-12 md:pl-16"
                  >
                    {/* Year-Bubble */}
                    <div
                      className="absolute left-0 top-0 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-500 ease-out"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`
                          : "linear-gradient(135deg, rgba(0,0,0,0.45), rgba(0,0,0,0.32))",
                        boxShadow: isActive
                          ? "0 0 0 4px hsl(0,0%,98%), 0 0 24px rgba(0,0,0,0.040), 0 8px 22px -4px rgba(0,0,0,0.040)"
                          : "0 0 0 4px hsl(0,0%,98%), 0 4px 12px -3px rgba(0,0,0,0.18)",
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    {/* Year + Age inline */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                      <p
                        className={`text-base md:text-lg transition-colors duration-500`}
                        style={{
                          color: isActive ? ACCENT : "rgba(0,0,0,0.42)",
                        }}
                      >
                        {s.year}
                      </p>
                      <span
                        aria-hidden
                        className="text-foreground/20 text-xs"
                      >
                        ·
                      </span>
                      <p
                        className="text-xs tracking-[0.08em] uppercase font-semibold transition-colors duration-500"
                        style={{
                          color: isActive
                            ? "rgba(0,0,0,0.55)"
                            : "rgba(0,0,0,0.32)",
                        }}
                      >
                        {s.age}
                      </p>
                    </div>
                    <h3
                      className="font-display text-xl md:text-2xl font-bold leading-snug mb-3 transition-colors duration-500"
                      style={{
                        color: isActive
                          ? "rgb(15, 10, 25)"
                          : "rgba(0,0,0,0.45)",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-base md:text-[17px] leading-[1.7] max-w-xl transition-colors duration-500"
                      style={{
                        color: isActive
                          ? "rgba(0,0,0,0.78)"
                          : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {s.body}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* RIGHT — Sticky Pull-Quote (page-eigener Twist statt Sticky-Photo) */}
          <div className="lg:col-span-5 lg:h-full">
            <div
              className="relative overflow-hidden lg:sticky lg:top-24 w-full p-8 md:p-12 flex flex-col justify-center"
              style={{
                borderRadius: "1.25rem",
                height: "min(72vh, 640px)",
                background:
                  "linear-gradient(155deg, #0e0a14 0%, #1a1322 60%, #0e0a14 100%)",
                boxShadow:
                  "0 50px 100px -30px rgba(0,0,0,0.200), 0 15px 35px -15px rgba(0,0,0,0.090)",
              }}
            >
              {/* Burgunder-Glow oben rechts */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
                }}
              />
              {/* Amber-Glow unten links */}
              <div
                aria-hidden
                className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
                }}
              />

              <div className="relative">
                <Quote
                  className="w-10 h-10 md:w-12 md:h-12 mb-6 md:mb-8 opacity-60"
                  style={{ color: ACCENT_SOFT }}
                />
                <p
                  key={activeQuote}
                  className={`${SERIF_ITALIC} text-2xl md:text-[34px] lg:text-[40px] leading-[1.15] text-white/95 transition-opacity duration-500`}
                  style={{
                    animation: "heroFadeUp 0.6s ease-out",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: activeQuote.replace(
                      /\[(.*?)\]/g,
                      `<span style="color: ${ACCENT_SOFT}; font-style: italic;">$1</span>`,
                    ),
                  }}
                />
                <div className="mt-8 md:mt-10 flex items-center gap-3">
                  <span
                    className={`${SERIF_ITALIC} text-2xl md:text-3xl`}
                    style={{ color: ACCENT_SOFT }}
                  >
                    Emilian Leber
                  </span>
                  <span
                    aria-hidden
                    className="text-white/30 text-xs"
                  >
                    ·
                  </span>
                  <span className="text-[11px] tracking-[0.16em] uppercase text-white/55 font-semibold">
                    Werdegang-Notiz
                  </span>
                </div>
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-4">
                  <span className="text-[10px] tracking-[0.16em] uppercase text-white/45 font-semibold">
                    Phase
                  </span>
                  <span
                    className={`text-base md:text-lg`}
                    style={{ color: ACCENT_SOFT }}
                  >
                    {activePhase < 0 ? "—" : `0${activePhase + 1}`.slice(-2)}
                    <span className="text-white/40"> / 09</span>
                  </span>
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
   4 · MEIN STIL — Editorial-Split 60/40
   ═══════════════════════════════════════════════════════════ */
const MeinStilSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT — Headline + Body + Bullet-List */}
          <div
            className={`lg:col-span-7`}
          >
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Mein Stil.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground mb-8 md:mb-10">
              Kein Zylinder.{" "}
              <span style={{ color: ACCENT }}>
                Kein Kaninchen.
              </span>
            </h2>
            <div className="space-y-5 text-base md:text-lg leading-[1.65] text-foreground/70 max-w-2xl">
              <p>
                Ich bin Comedy-Zauberer. Das heißt: Mentalmagie trifft auf
                trockenen Humor. Karten-Effekte landen in einer Anekdote, die
                ich morgens beim Briefing-Call mit dem Gastgeber gesammelt
                habe. Drei Sekunden Stille nach dem Effekt — dann eine Pointe,
                die niemand kommen sieht.
              </p>
              <p>
                Mein Ton ist locker, aber präzise. Premium ohne Schlips.
                Persönlich ohne Vereinnahmung. Ich nehme das Publikum mit,
                aber ich treibe es nie vor mir her. Wer im Publikum nicht
                mitmachen will, muss nicht — und merkt am Ende, dass es ihm
                trotzdem gefallen hat.
              </p>
              <p>
                Vor jedem Event ein Briefing-Call. Vor jeder Show eine
                schriftliche Routine. Vor jedem Auftritt drei Stunden Probe im
                Spiegel. Was lässig wirkt, ist tausend Mal geübt.
              </p>
            </div>

            {/* Editorial-Liste: vier Säulen */}
            <ul className="mt-10 md:mt-12 space-y-6 max-w-2xl">
              {[
                {
                  num: "01",
                  k: "Mentalmagie",
                  v: "Mein Schwerpunkt. Vorhersagen, Gedankenlesen, scheinbare Telepathie — alles ohne technische Hilfsmittel, nur mit Psychologie und Sprache.",
                },
                {
                  num: "02",
                  k: "Comedy-Pointen",
                  v: "Keine Witze über das Publikum. Keine Schenkelklopfer. Trockener Humor zwischen den Effekten, oft gegen mich selbst.",
                },
                {
                  num: "03",
                  k: "Premium-Tonalität",
                  v: "Studio-Setup, schwarze Bühnen-Kleidung, präzise Sprache. Ich passe mich an, ob es ein Vorstands-Empfang ist oder eine Geburtstagstafel.",
                },
                {
                  num: "04",
                  k: "Anpassung",
                  v: "Jede Show wird auf Anlass, Publikum und Tonalität gebrieft. Eine 30er-Geburtstagsfeier klingt anders als ein Versicherungs-Vorstand.",
                },
              ].map((p) => (
                <li
                  key={p.num}
                  className="grid grid-cols-[44px_1fr] md:grid-cols-[58px_1fr] gap-4 md:gap-6 items-baseline"
                >
                  <span
                    className={`${SERIF_ITALIC} text-2xl md:text-3xl tabular-nums`}
                    style={{ color: ACCENT }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h4 className="font-display text-lg md:text-xl font-bold text-foreground mb-1.5 leading-tight">
                      {p.k}
                    </h4>
                    <p className="text-sm md:text-base text-foreground/65 leading-[1.6]">
                      {p.v}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Photo mit Glass-Caption */}
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24`}
            style={{ animationDelay: "0.15s" }}
          >
            <div
              className="relative overflow-hidden w-full"
              style={{
                borderRadius: "1.25rem",
                height: "min(72vh, 640px)",
                boxShadow:
                  "0 50px 100px -30px rgba(40,20,10,0.4), 0 15px 35px -15px rgba(40,20,10,0.2)",
              }}
            >
              <img
                src={magicianPortraitImg}
                alt="Emilian Leber Studio-Portrait — Comedy-Zauberer aus Bayern"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(8,6,12,0.78) 100%)",
                }}
              />
              {/* Glass-Caption */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <div
                  className="relative rounded-2xl px-5 py-4 overflow-hidden"
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
                    className={`text-white/85 text-xs md:text-sm mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Studio-Setup, Probe-Tag.
                  </p>
                  <p className="font-display text-sm md:text-base text-white font-bold leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Drei Stunden vor jeder Show. Ohne Ausnahme.
                  </p>
                </div>
              </div>
              {/* Stat-Glass oben rechts */}
              <div className="absolute top-5 right-5 md:top-7 md:right-7">
                <div
                  className="rounded-2xl px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(155deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.14) 60%, rgba(255,255,255,0.06) 100%)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxShadow:
                      "0 15px 35px -10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.55)",
                  }}
                >
                  <p
                    className={`text-[10px] md:text-xs text-white/80 mb-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Tägliches Training
                  </p>
                  <p className="font-display text-lg md:text-xl font-black text-white tabular-nums drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    6 h
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
   5 · AUSZEICHNUNGEN AUSGEBAUT — Awards mit Geschichte
   ═══════════════════════════════════════════════════════════ */
const AWARDS = [
  {
    icon: Tv,
    year: "Sep 2023",
    title: "Greatest Talent",
    subtitle: "Finalist · Live im Fernsehen",
    body:
      "Drei Vorrunden, dann das Live-Finale vor laufender Kamera. Erste TV-Erfahrung mit einem Mentaleffekt unter Studio-Beleuchtung. Wer einmal vor Kameras stand, hat keine Bühnenangst mehr.",
    detail: "Casting München · 3 Runden · Live-Sendung",
  },
  {
    icon: Trophy,
    year: "2024",
    title: "Talents of Magic",
    subtitle: "Finalist + Kreativpreis",
    body:
      "Einer der härtesten Magie-Wettbewerbe in Deutschland. Jury aus internationalen Magiern. Zusätzlich der Kreativpreis für eine selbst entwickelte Mentalmagic-Routine — Anerkennung von der Zunft.",
    detail: "München · Jury intl. · 2 Auszeichnungen",
  },
  {
    icon: Medal,
    year: "2024",
    title: "Deutsche Jugendmeisterschaft",
    subtitle: "Top 30 von 150+",
    body:
      "Drei Tage Workshops, Vorführungen, Critique-Sessions mit Profis. Unter den dreißig Besten von über hundertfünfzig Nachwuchsmagiern. Ab da habe ich Magie als Beruf angegangen.",
    detail: "DJM · 3 Tage · Wendepunkt-Wettbewerb",
  },
  {
    icon: Tv,
    year: "2025",
    title: "TVA TV-Auftritt",
    subtitle: "Live-Studio-Auftritt",
    body:
      "Im Herbst lädt der TVA (TV Aktuell) zum Live-Studio-Auftritt ein. Drei Minuten Mentalmagie vor laufender Kamera mit dem Moderator. Das Video läuft heute noch auf der Startseite.",
    detail: "TVA · Live-Studio · 3 Min",
  },
  {
    icon: Star,
    year: "Aktuell",
    title: "ProvenExpert · 5,0★",
    subtitle: "30+ verifizierte Bewertungen",
    body:
      "Über dreißig verifizierte Kundenbewertungen, alle fünf Sterne. Keine gekauften Reviews, keine inszenierten Empfehlungen — echte Kunden, echte Texte, alle auf ProvenExpert öffentlich einsehbar.",
    detail: "ProvenExpert · 5,0/5,0 · 30+ Reviews",
  },
  {
    icon: Award,
    year: "2026",
    title: "Plötzlich Magie · Tour",
    subtitle: "[Magic Meets Comedy]",
    body:
      "Die neue abendfüllende Show, mit der ich gerade auf Tour gehe. Magie trifft Comedy, Mentalmagie trifft Stand-Up. Premiere im Sommer in Bayern, danach deutschlandweit. Tickets bei mir direkt.",
    detail: "Premiere 2026 · Bayern → DE · 90 Min Show",
  },
];

const AuszeichnungenSection = () => {
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
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Auszeichnungen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Sechs Stationen.{" "}
              <span style={{ color: ACCENT }}>
                Eine Karriere.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              TV-Finals, Wettbewerbs-Auszeichnungen, Tour-Premieren — die
              Karriere-Highlights mit echter Geschichte hinter jedem Award.
              Keine Schaufenster-Trophäen, sondern Wendepunkte.
            </p>
          </div>
        </div>

        {/* Awards-Grid — 2x3 Editorial-Cards mit Story */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`}
        >
          {AWARDS.map((a) => (
            <article
              key={a.title}
              className="group bg-white rounded-2xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 20px 50px -20px rgba(40,20,10,0.18), 0 6px 16px -6px rgba(40,20,10,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {/* Icon-Bubble + Year inline */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    boxShadow: "0 8px 22px -4px rgba(0,0,0,0.040)",
                  }}
                >
                  <a.icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`text-base md:text-lg`}
                  style={{ color: ACCENT }}
                >
                  {a.year}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight mb-1.5">
                {a.title}
              </h3>
              <p
                className={`text-sm md:text-base text-foreground/55 mb-4`}
              >
                {a.subtitle}
              </p>
              <p className="text-sm md:text-[15px] text-foreground/70 leading-[1.65] mb-5">
                {a.body}
              </p>
              <p className="text-[10px] tracking-[0.14em] uppercase font-semibold text-foreground/45 pt-4 border-t border-foreground/10">
                {a.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · PULL-QUOTE — Black full-bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-32 md:py-44 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[640px] h-[640px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      <div className="container px-6 relative">
        <div
          className={`max-w-4xl mx-auto text-center`}
        >
          <Quote
            className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-8 md:mb-10 opacity-50"
            style={{ color: ACCENT_SOFT }}
          />
          <p
            className={`text-[clamp(2rem,5vw,4.5rem)] leading-[1.12] text-white/95 mb-10 md:mb-12`}
          >
            Zehn Jahre.{" "}
            <span style={{ color: "#f3d9a8" }}>
              Dreitausend Stunden im Spiegel.
            </span>{" "}
            Für sechs Minuten Magie, in denen niemand atmet.
          </p>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/55 font-semibold">
            — Notiz aus dem Probenraum, Oktober 2025
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · HINTER DEN KULISSEN — Editorial-Triptychon mit Foto-Story
   ═══════════════════════════════════════════════════════════ */
const KULISSEN_STORY = [
  {
    num: "01",
    eyebrow: "Üben.",
    title: "Sechs Stunden täglich.",
    body:
      "Mein Probenraum: ein Klapptisch, ein Spiegel, eine Studio-Lampe. Jede Routine wird hundertfach durchgespielt, bis die Hände sie blind beherrschen. Was im Saal lässig aussieht, ist tausend Mal geübt.",
    img: haendeImg,
    caption: "Probenraum · 06:30",
  },
  {
    num: "02",
    eyebrow: "Vorbereiten.",
    title: "Briefing-Call. Drei Tage vorher.",
    body:
      "Vor jedem Event ein halbstündiger Telefon-Call mit der Gastgeberin. Wer feiert, was ist die Vorgeschichte, welche Anekdote darf rein, welche bleibt geheim. Daraus baue ich eine personalisierte Routine, die nur an diesem Abend funktioniert.",
    img: emilianMagicDinnerImg,
    caption: "Telefon-Call · 30 Min",
  },
  {
    num: "03",
    eyebrow: "Auftreten.",
    title: "Drei Sekunden Stille.",
    body:
      "Der Effekt ist zu Ende. Drei Sekunden Stille, in denen niemand atmet. Dann der Lacher, dann die Standing Ovation. Diese drei Sekunden sind das, weswegen ich seit zehn Jahren morgens um halb sieben aufstehe.",
    img: staunenImg,
    caption: "Bühne · Standing Ovation",
  },
];

const HinterDenKulissenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Hinter den Kulissen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
              Üben. Vorbereiten.{" "}
              <span style={{ color: ACCENT }}>
                Auftreten.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Wie ein Event aussieht, bevor das Publikum den Saal betritt:
              drei Phasen, drei Räume, drei Tage Vorlauf. So passiert sechs
              Minuten reine Magie.
            </p>
          </div>
        </div>

        {/* Triptychon — 3 Editorial-Cards */}
        <div
          className={`grid md:grid-cols-3 gap-6 lg:gap-8`}
        >
          {KULISSEN_STORY.map((s) => (
            <article
              key={s.num}
              className="group relative overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 30px 70px -25px rgba(40,20,10,0.28), 0 12px 28px -10px rgba(40,20,10,0.14)",
              }}
            >
              <div className="relative h-[480px] overflow-hidden">
                <img
                  src={s.img}
                  alt={`${s.eyebrow} ${s.title} — Hinter den Kulissen`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,6,12,0.25) 0%, rgba(8,6,12,0.4) 50%, rgba(8,6,12,0.92) 100%)",
                  }}
                />
                {/* Num oben links */}
                <span
                  className={`${SERIF_ITALIC} absolute top-5 left-6 md:top-7 md:left-7 text-5xl md:text-6xl tabular-nums leading-none`}
                  style={{
                    color: "rgba(243,217,168,0.85)",
                    textShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  {s.num}
                </span>
                {/* Caption oben rechts */}
                <span
                  className="absolute top-7 right-6 md:top-8 md:right-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(8,6,12,0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  {s.caption}
                </span>
                {/* Bottom-Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
                  <p
                    className={`text-base md:text-lg mb-2 text-white/70`}
                  >
                    {s.eyebrow}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-black leading-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-white/80 leading-[1.6]">
                    {s.body}
                  </p>
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
   8 · WARUM PERSÖNLICH — Editorial-Liste (kein Bubble-Grid)
   ═══════════════════════════════════════════════════════════ */
const PERSOENLICH = [
  {
    num: "01",
    title: "Briefing-Call vorab.",
    body:
      "Dreißig Minuten am Telefon, drei Tage vor dem Event. Wer feiert, wie ist die Stimmung, welche Anekdoten dürfen rein. Daraus baue ich die persönliche Tonalität — kein Standardprogramm, kein Copy-Paste.",
    detail: "30 Min · Telefon · 3 Tage vorher",
  },
  {
    num: "02",
    title: "Eingebaute Anekdoten.",
    body:
      "Mindestens drei Geschichten aus dem Vorabgespräch landen in der Show — als Karten-Wahl, als Mentaleffekt, als versteckte Pointe. Wer im Briefing erzählt, dass Opa Karl jeden Sonntag um halb zwölf einen Doppelten trinkt, sieht Opa Karls Doppelten als magische Vorhersage.",
    detail: "3+ Anekdoten · personalisiert pro Show",
  },
  {
    num: "03",
    title: "Tonalität ans Publikum.",
    body:
      "Eine 30er-Geburtstagsfeier klingt anders als ein Versicherungs-Vorstand. Ich rede mit dem Geburtstagskind wie mit einem alten Freund, mit dem Vorstand wie mit einem Geschäftspartner. Premium ohne Schlips, persönlich ohne Vereinnahmung.",
    detail: "Studio-Setup · schwarze Bühne · präzise",
  },
  {
    num: "04",
    title: "Drei Sekunden Stille.",
    body:
      "Mein Markenzeichen: nach jedem großen Effekt drei Sekunden Stille. Keine Erklärung, kein Beep, kein Move. Das Publikum verarbeitet — und reagiert dann mit dem ehrlichsten Lachen oder dem lautesten Applaus, den ein Saal hergeben kann.",
    detail: "3 Sek · keine Erklärung · der Markenmoment",
  },
];

const WarumPersoenlichSection = () => {
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
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Warum persönlich funktioniert.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
              Vier Säulen.{" "}
              <span style={{ color: ACCENT }}>
                Kein Programm von der Stange.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Was unterscheidet einen geübten Magier von einem persönlichen
              Entertainer? Vier konkrete Dinge, die ich vor, während und nach
              jeder Show mache.
            </p>
          </div>
        </div>

        {/* Editorial-Liste — keine Bubble-Cards, sondern typografische Liste */}
        <ol
          className={`max-w-4xl mx-auto space-y-12 md:space-y-16`}
        >
          {PERSOENLICH.map((p, i) => (
            <li
              key={p.num}
              className="grid md:grid-cols-[120px_1fr] gap-4 md:gap-12 items-start border-b border-foreground/10 pb-12 md:pb-16 last:border-0 last:pb-0"
            >
              <span
                className={`${SERIF_ITALIC} text-5xl md:text-7xl tabular-nums leading-none`}
                style={{ color: ACCENT }}
              >
                {p.num}
              </span>
              <div>
                <h3 className="font-display text-2xl md:text-4xl font-black text-foreground leading-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/70 leading-[1.65] mb-5 max-w-2xl">
                  {p.body}
                </p>
                <p className="text-[11px] tracking-[0.14em] uppercase font-semibold text-foreground/45">
                  {p.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   9 · STIMMEN ÜBER MICH — 3 echte Reviews persönlich getextet
   ═══════════════════════════════════════════════════════════ */
const STIMMEN = [
  {
    name: "Jan von Lehmann",
    context: "Firmenfeier · 200 Gäste · Bayern",
    body:
      "Was uns bei Emilian aufgefallen ist: das Briefing war besser als bei manchen Top-Speakern. Er hat unsere Firmen-Anekdoten so eingebaut, dass selbst der Vorstand nicht wusste, wo Show endet und Wirklichkeit anfängt. Premium-Tonalität, persönlich, professionell — wir buchen ihn 2026 wieder.",
    initial: "J",
    color: ACCENT,
  },
  {
    name: "Katrin Raß",
    context: "Hochzeitsplanerin · 12+ Hochzeiten zusammen",
    body:
      "Ich vermittle Emilian seit Jahren an meine Brautpaare. Er trifft den Ton — egal ob 40 Gäste in der Scheune oder 250 im Schloss. Was ihn besonders macht: er denkt mit. Sektempfang, Tisch-zu-Tisch, Bühne vor dem Tanz — er weiß genau, wo welche Routine hingehört.",
    initial: "K",
    color: ACCENT_DEEP,
  },
  {
    name: "Martina Senftl",
    context: "Eventkundin · 50er Geburtstag · München",
    body:
      "Als Geschenk für meinen Mann gebucht. Drei Sekunden nachdem Emilian die erste Karte gezogen hat, war ich Tränen-erfüllt. Nicht vor Rührung — vor Lachen und Staunen. Er hat fünf Anekdoten aus dem Briefing-Call eingebaut, die nur unsere Familie kennen kann. Mehr Erfolg geht nicht.",
    initial: "M",
    color: "#1f5e3f",
  },
];

const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              Stimmen über mich persönlich.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Drei Reviews.{" "}
              <span style={{ color: ACCENT }}>
                Drei echte Menschen.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Keine inszenierten Aussagen, keine gekauften Reviews. Drei Stimmen
              aus den letzten zwei Jahren — Firmenfeier, Hochzeitsplanerin,
              Geburtstag. Alle auf ProvenExpert verifiziert.
            </p>
          </div>
        </div>

        {/* 3-Spalten-Reviews */}
        <div
          className={`grid md:grid-cols-3 gap-6 lg:gap-8`}
        >
          {STIMMEN.map((s) => (
            <article
              key={s.name}
              itemScope
              itemType="https://schema.org/Review"
              className="group relative bg-[hsl(0,0%,98%)] rounded-2xl p-7 md:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{
                boxShadow:
                  "0 20px 50px -20px rgba(40,20,10,0.14), 0 6px 16px -6px rgba(40,20,10,0.06)",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              {/* Body */}
              <p
                itemProp="reviewBody"
                className={`text-base md:text-lg leading-[1.55] text-foreground/85 mb-7 md:mb-8`}
              >
                „{s.body}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-foreground/10">
                {/* Letter-Avatar 11px */}
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display font-bold text-xs"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                  }}
                >
                  {s.initial}
                </span>
                <div>
                  <p
                    itemProp="author"
                    className="font-display font-bold text-sm md:text-[15px] text-foreground leading-tight"
                  >
                    {s.name}
                  </p>
                  <p className="text-[11px] tracking-[0.08em] uppercase text-foreground/45 font-semibold mt-0.5">
                    {s.context}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer-Stat-Zeile */}
        <div className="max-w-3xl mx-auto text-center mt-16 md:mt-20 pt-10 border-t border-foreground/10">
          <div className="inline-flex flex-wrap items-baseline gap-x-5 gap-y-2 text-foreground/55">
            <span className="text-sm">
              <strong className="text-foreground font-bold">5,0★</strong> auf
              ProvenExpert
            </span>
            <span aria-hidden className="text-foreground/20">·</span>
            <span className="text-sm">
              <strong className="text-foreground font-bold">30+</strong>{" "}
              verifizierte Reviews
            </span>
            <span aria-hidden className="text-foreground/20">·</span>
            <span className="text-sm">
              <strong className="text-foreground font-bold">200+</strong>{" "}
              Events
            </span>
            <span aria-hidden className="text-foreground/20">·</span>
            <span className="text-sm">
              <strong className="text-foreground font-bold">10</strong> Jahre
              Bühne
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   10 · VIDEO — TVA TV-Auftritt
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [playing, setPlaying] = useState(false);
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16`}
        >
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6"
            >
              TVA · Herbst 2025.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5rem)] text-foreground">
              Drei Minuten{" "}
              <span style={{ color: ACCENT }}>
                im Fernsehen.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Live-Studio-Auftritt beim TVA (TV Aktuell). Drei Minuten
              Mentalmagie vor laufender Kamera, mit dem Moderator als
              Versuchsperson. Ein direkter Eindruck, wie sich eine Show vor
              Studio-Licht spielt.
            </p>
          </div>
        </div>
        <div
          className={`max-w-5xl mx-auto`}
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="relative aspect-video overflow-hidden bg-foreground/5"
            style={{
              borderRadius: "1.5rem",
              boxShadow: "0 50px 100px -30px rgba(0,0,0,0.35)",
            }}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=1`}
                title="TVA TV-Auftritt — Emilian Leber"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${TVA_VIDEO_ID}/maxresdefault.jpg`}
                  alt="TVA TV-Auftritt — Emilian Leber Showreel"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    }}
                    aria-label="TVA TV-Auftritt abspielen"
                  >
                    <svg
                      className="w-9 h-9 text-white ml-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <span
                  className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(8,6,12,0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  TVA · 2025
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   11 · AKTUELLE SHOW — Plötzlich Magie 2026
   ═══════════════════════════════════════════════════════════ */
const AktuelleShowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-24 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src={buehneZuschauerImg}
          alt="Bühnenshow Plötzlich Magie — Magic Meets Comedy 2026"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 30%",
            filter: "saturate(0.88) contrast(1.08) brightness(0.4)",
          }}
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.85) 40%, rgba(8,6,12,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
          }}
        />
      </div>
      <div className="container px-6 relative">
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center`}
        >
          <div className="lg:col-span-7">
            <p
              className={`${SERIF_ITALIC} text-lg md:text-xl text-white/65 mb-5`}
            >
              Premiere 2026. Bayern + deutschlandweit.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,6vw,5.5rem)] text-white mb-8">
              Plötzlich{" "}
              <span style={{ color: "#f3d9a8" }}>
                Magie.
              </span>
              <br />
              <span className="text-white/75">Magic Meets Comedy.</span>
            </h2>
            <p className="text-base md:text-lg leading-[1.65] text-white/75 max-w-xl mb-10">
              Die neue abendfüllende Show, mit der ich gerade auf Tour gehe.
              Magie trifft Comedy. Mentalmagie trifft Stand-Up. Tisch-Magic
              trifft Bühnen-Wunder. Neunzig Minuten Solo, kein Co-Künstler,
              kein Sicherheitsnetz. Premiere im Sommer in Bayern, danach
              deutschlandweit.
            </p>
            {/* Show-Facts */}
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 mb-10 text-white/85">
              <span className="inline-flex items-baseline gap-1.5">
                <strong className="font-display font-bold text-white text-lg md:text-xl tabular-nums">
                  90
                </strong>
                <span className="text-white/65 text-sm">Min Show</span>
              </span>
              <span aria-hidden className="text-white/30">·</span>
              <span className="inline-flex items-baseline gap-1.5">
                <strong className="font-display font-bold text-white text-lg md:text-xl tabular-nums">
                  3
                </strong>
                <span className="text-white/65 text-sm">Akte</span>
              </span>
              <span aria-hidden className="text-white/30">·</span>
              <span className="inline-flex items-baseline gap-1.5">
                <strong className="font-display font-bold text-white text-lg md:text-xl tabular-nums">
                  100 – 500
                </strong>
                <span className="text-white/65 text-sm">Gäste</span>
              </span>
              <span aria-hidden className="text-white/30">·</span>
              <span className="inline-flex items-baseline gap-1.5">
                <span className="text-white/65 text-sm">Solo · Tour 2026</span>
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/buchung?show=Plötzlich+Magie"
                className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95"
              >
                Tour-Termin anfragen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/buehnenshow"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
              >
                Bühnenshow-Details
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Show-Mockup-Card rechts */}
          <div className="lg:col-span-5">
            <div
              className="relative bg-white p-8 md:p-10 rounded-2xl"
              style={{
                boxShadow:
                  "0 60px 120px -30px rgba(0,0,0,0.040), 0 25px 50px -20px rgba(0,0,0,0.4)",
              }}
            >
              {/* Letter-Style Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p
                    className={`text-sm text-foreground/55 mb-1`}
                  >
                    Show-Programm
                  </p>
                  <p className="font-display text-xl md:text-2xl font-black text-foreground leading-tight">
                    Plötzlich Magie
                  </p>
                </div>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded"
                  style={{
                    background: "rgba(0,0,0,0.040)",
                    color: ACCENT,
                  }}
                >
                  Premiere 2026
                </span>
              </div>

              {/* Show-Akte */}
              <dl className="space-y-5 border-t border-foreground/10 pt-6">
                {[
                  {
                    k: "Akt I · 0–30 Min",
                    v: "Mentalmagie-Block mit Publikums-Interaktion",
                  },
                  {
                    k: "Pause · 15 Min",
                    v: "Foyer-Drinks · Karten-Selfies möglich",
                  },
                  {
                    k: "Akt II · 45–70 Min",
                    v: "Comedy-Block mit Stand-Up-Anteilen",
                  },
                  {
                    k: "Akt III · 70–90 Min",
                    v: "Großes Finale · Standing-Ovation-Effekt",
                  },
                ].map((m) => (
                  <div
                    key={m.k}
                    className="grid grid-cols-[120px_1fr] gap-4 items-baseline text-sm"
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

              {/* Signature */}
              <div className="pt-6 mt-6 border-t border-foreground/10">
                <p
                  className={`text-xs text-foreground/50 mb-2`}
                >
                  Künstlerische Leitung
                </p>
                <div className="flex items-end justify-between">
                  <span
                    className={`${SERIF_ITALIC} text-3xl leading-none`}
                    style={{ color: ACCENT_DEEP }}
                  >
                    Emilian Leber
                  </span>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-foreground/45 font-semibold">
                    Solo-Show
                  </span>
                </div>
              </div>

              {/* Stempel */}
              <span
                aria-hidden
                className="absolute -bottom-5 right-7 w-20 h-20 rounded-full flex items-center justify-center rotate-[-12deg] pointer-events-none"
                style={{
                  border: `2px solid ${ACCENT}`,
                  background: "rgba(255,255,255,0.9)",
                  color: ACCENT,
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "10px",
                  lineHeight: 1.1,
                  textAlign: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.040)",
                }}
              >
                Tour
                <br />
                2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   12 · ZAHLEN-STRIP — Inline-Stats kompakt
   ═══════════════════════════════════════════════════════════ */
const ZahlenStripSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="container px-6">
        <div
          className={`max-w-5xl mx-auto`}
        >
          <p
            className={`text-sm md:text-base text-foreground/45 text-center mb-8 md:mb-10 tracking-[0.04em]`}
          >
            Zehn Jahre in Zahlen.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 md:gap-y-0">
            {[
              { v: "200+", k: "Events" },
              { v: "100+", k: "Hochzeiten" },
              { v: "100+", k: "Firmen" },
              { v: "80+", k: "Geburtstage" },
              { v: "10+", k: "Magic Dinners" },
            ].map((s) => (
              <div
                key={s.k}
                className="text-center border-l border-foreground/10 first:border-l-0 md:first:border-l-0 px-2"
              >
                <p
                  className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-foreground tabular-nums leading-none mb-2"
                  style={{ color: ACCENT_DEEP }}
                >
                  {s.v}
                </p>
                <p className="text-[10px] md:text-xs tracking-[0.14em] uppercase font-semibold text-foreground/50">
                  {s.k}
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
   13 · PERSÖNLICHER BRIEF im FINAL-CTA
   Foto Emilian links + Brief rechts (handgeschrieben-styled)
   ═══════════════════════════════════════════════════════════ */
const PersoenlicherBriefSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative bg-[#08060c] text-white py-24 md:py-36 overflow-hidden"
    >
      {/* Glows */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[680px] h-[680px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[680px] h-[680px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />

      <div className="container px-6 relative">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p
              className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/55 mb-6"
            >
              Persönlich, direkt, ohne Agentur.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,6vw,5.5rem)] text-white">
              Schreibe mir{" "}
              <span style={{ color: "#f3d9a8" }}>
                direkt.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-white/65 leading-[1.65] max-w-md">
              Keine Booking-Agentur, keine Manager-Schleife, keine Hotline.
              Wenn du mich anschreibst, schreibe ich dir zurück. Persönlich,
              meistens innerhalb von 24 Stunden.
            </p>
          </div>
        </div>

        {/* Brief-Layout: Foto links, Brief rechts */}
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-stretch`}
        >
          {/* LEFT — Foto Emilian */}
          <div className="lg:col-span-5">
            <div
              className="relative overflow-hidden w-full h-full min-h-[480px]"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 60px 120px -30px rgba(0,0,0,0.6), 0 25px 50px -20px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={portraitKartenImg}
                alt="Emilian Leber Studio-Portrait — Zauberer aus Bayern, persönlicher Brief"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(8,6,12,0.85) 100%)",
                }}
              />
              {/* Glass-Label unten */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <div
                  className="rounded-2xl px-5 py-4"
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
                    className={`text-white/80 text-xs md:text-sm mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}
                  >
                    Emilian Leber
                  </p>
                  <p className="font-display text-sm md:text-base text-white font-bold leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    Zauberkünstler aus Bayern
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Brief */}
          <div className="lg:col-span-7">
            <div
              className="relative bg-white p-8 md:p-12 lg:p-14 h-full"
              style={{
                borderRadius: "1.25rem",
                boxShadow:
                  "0 60px 120px -30px rgba(40,20,10,0.5), 0 25px 50px -20px rgba(40,20,10,0.25)",
              }}
            >
              {/* Brief-Header */}
              <div className="flex items-start justify-between mb-8 md:mb-10">
                <div>
                  <p
                    className={`text-sm text-foreground/55 mb-1`}
                  >
                    Persönlich. Vertraulich.
                  </p>
                  <p className="font-display text-lg md:text-xl font-black text-foreground leading-tight">
                    An dich, falls du es bis hierher geschafft hast.
                  </p>
                </div>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1 rounded shrink-0 ml-3"
                  style={{
                    background: "rgba(0,0,0,0.040)",
                    color: ACCENT,
                  }}
                >
                  Brief
                </span>
              </div>

              {/* Brief-Body */}
              <div
                className={`${SERIF_ITALIC} text-lg md:text-xl lg:text-[22px] leading-[1.55] text-foreground/85 space-y-5 mb-10`}
              >
                <p>Hallo,</p>
                <p>
                  wenn du es bis hierher geschafft hast, hast du dir neun
                  Stationen, drei Werkzeuge, ein Werdegang-Panorama und drei
                  echte Reviews durchgelesen. Danke dafür. Das ist mehr als die
                  meisten tun.
                </p>
                <p>
                  Ich verspreche dir Folgendes: Wenn du auf{" "}
                  <span style={{ color: ACCENT, fontStyle: "italic" }}>
                    „Schreibe mir direkt"
                  </span>{" "}
                  klickst, landest du nicht bei einer Agentur. Du landest in
                  meinem Postfach. Und meistens schreibe ich dir innerhalb von
                  vierundzwanzig Stunden zurück — persönlich, mit konkreter
                  Antwort auf deine konkrete Frage.
                </p>
                <p>
                  Wenn dein Event passt, baue ich dir aus drei Telefonanrufen
                  und einer Anekdote die persönlichste Show, die dein Anlass
                  je gesehen hat. Wenn es nicht passt, sage ich dir das ehrlich
                  — und schicke dir vielleicht eine Kollegin, die besser zu
                  euch passt.
                </p>
                <p>
                  Drei Sekunden Stille. Dann schreibst du mir.
                </p>
              </div>

              {/* Signature-Block */}
              <div className="pt-7 border-t border-foreground/10 mb-10">
                <p
                  className={`text-xs text-foreground/50 mb-3`}
                >
                  Persönlich unterschrieben
                </p>
                <div className="flex items-end justify-between flex-wrap gap-4">
                  <span
                    className={`${SERIF_ITALIC} text-4xl md:text-5xl leading-none`}
                    style={{ color: ACCENT_DEEP }}
                  >
                    Emilian Leber
                  </span>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-foreground/45 font-semibold">
                    Magicel · Bayern
                  </span>
                </div>
              </div>

              {/* CTA-Reihe */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/buchung"
                  className="hero-cta group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    boxShadow:
                      "0 14px 32px -10px rgba(0,0,0,0.040)",
                  }}
                >
                  Schreibe mir direkt
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="mailto:el@magicel.de"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground/75 hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  el@magicel.de
                </a>
              </div>

              {/* Wachs-Stempel */}
              <span
                aria-hidden
                className="absolute -bottom-6 right-8 w-24 h-24 rounded-full flex items-center justify-center rotate-[-14deg] pointer-events-none"
                style={{
                  border: `2px solid ${ACCENT}`,
                  background: "rgba(255,255,255,0.9)",
                  color: ACCENT,
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "11px",
                  lineHeight: 1.1,
                  textAlign: "center",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.040)",
                }}
              >
                seit
                <br />
                2016
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-14 md:mt-20">
          <p className="text-xs md:text-sm text-white/55">
            Antwortzeit Ø unter 24 Stunden · Werktags meistens unter 4 Stunden
            · Bayern + deutschlandweit
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE-EXPORT — UeberMich
   ═══════════════════════════════════════════════════════════ */
const UeberMich = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Über mich — Zauberer Emilian Leber aus Bayern | Werdegang & Stil
      </title>
      <meta
        name="description"
        content="Junger Zauberer aus Bayern: Emilian Leber, seit 2016 auf der Bühne, Finalist bei Greatest Talent und Talents of Magic, TVA TV-Auftritt 2025. Comedy + Mentalmagie + Premium-Stil."
      />
      <meta
        name="keywords"
        content="Emilian Leber, Zauberer Bayern, junger Magier, Mentalist, Greatest Talent Finalist, Talents of Magic, Comedy Zauberer Bayern, Zauberkünstler Werdegang, Magier Studio, Plötzlich Magie"
      />
      <meta
        name="robots"
        content="index,follow,max-image-preview:large"
      />
      <link
        rel="canonical"
        href="https://www.magicel.de/ueber-mich"
      />
      {/* OG */}
      <meta
        property="og:title"
        content="Über Emilian Leber — Zauberer aus Bayern, seit 2016 auf der Bühne"
      />
      <meta
        property="og:description"
        content="Junger Zauberer aus Bayern: Finalist bei Greatest Talent und Talents of Magic, TVA TV-Auftritt 2025. Comedy + Mentalmagie + Premium-Stil."
      />
      <meta
        property="og:url"
        content="https://www.magicel.de/ueber-mich"
      />
      <meta property="og:type" content="profile" />
      <meta
        property="og:image"
        content="https://www.magicel.de/og-image.jpg"
      />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Über Emilian Leber — Zauberer aus Bayern"
      />
      <meta
        name="twitter:description"
        content="Junger Zauberer aus Bayern: Finalist bei Greatest Talent und Talents of Magic, TVA 2025. Comedy + Mentalmagie."
      />
      <meta
        name="twitter:image"
        content="https://www.magicel.de/og-image.jpg"
      />

      {/* Preconnect Google Fonts */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />

      {/* JSON-LD: Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Emilian Leber",
          alternateName: "Magicel",
          jobTitle: "Zauberkünstler & Comedy-Magier",
          description:
            "Junger Zauberer aus Bayern, seit 2016 auf der Bühne. Finalist bei Greatest Talent (2023) und Talents of Magic (2024, Kreativpreis). TVA TV-Auftritt 2025.",
          url: "https://www.magicel.de/ueber-mich",
          image: "https://www.magicel.de/og-image.jpg",
          sameAs: [
            "https://www.instagram.com/magicel.de",
            "https://www.magicel.de",
          ],
          knowsAbout: [
            "Zauberkunst",
            "Mentalmagie",
            "Comedy-Zauberei",
            "Close-Up Magic",
            "Bühnenshow",
            "Magic Dinner",
            "Moderation",
          ],
          award: [
            "Greatest Talent · Finalist · 2023",
            "Talents of Magic · Finalist + Kreativpreis · 2024",
            "Deutsche Jugendmeisterschaft · Top 30 · 2024",
            "TVA TV-Auftritt · 2025",
          ],
          address: {
            "@type": "PostalAddress",
            addressRegion: "Bayern",
            addressCountry: "DE",
          },
        })}
      </script>

      {/* JSON-LD: EntertainmentBusiness mit AggregateRating */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EntertainmentBusiness",
          name: "Magicel · Emilian Leber",
          description:
            "Zauberer und Comedy-Magier aus Bayern. Mentalmagie, Close-Up, Bühnenshow, Magic Dinner.",
          url: "https://www.magicel.de/ueber-mich",
          telephone: "+49",
          areaServed: { "@type": "Country", name: "Deutschland" },
          address: {
            "@type": "PostalAddress",
            addressRegion: "Bayern",
            addressCountry: "DE",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "30",
            bestRating: "5",
            worstRating: "1",
          },
          founder: {
            "@type": "Person",
            name: "Emilian Leber",
          },
        })}
      </script>

      {/* JSON-LD: BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
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
              name: "Über mich",
              item: "https://www.magicel.de/ueber-mich",
            },
          ],
        })}
      </script>
    </Helmet>

    <PageLayout>
      <Hero />
      <LogoMarquee
        eyebrow="Auftritte bei"
        variant="cream"
        compact
      />
      <DreiToolsSection />
      <WerdegangTimelineSection />
      <MeinStilSection />
      <AuszeichnungenSection />
      <PullQuoteSection />
      <HinterDenKulissenSection />
      <WarumPersoenlichSection />
      <StimmenSection />
      <VideoSection />
      <AktuelleShowSection />
      <ZahlenStripSection />
      <PersoenlicherBriefSection />
    </PageLayout>
  </>
);

export default UeberMich;
