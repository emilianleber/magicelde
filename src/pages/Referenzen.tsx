import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  Filter as FilterIcon,
  Calendar,
  MapPin,
  Building2,
  Trophy,
  Tv,
  Heart,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";

import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroMagicImg from "@/assets/hero-magic.jpg";
import stageShowImg from "@/assets/stage-show.jpg";

/* ─────────────────────────────────────────────────────────────
   Tokens
   ───────────────────────────────────────────────────────────── */
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const AMBER_SOFT = "#f0d8a8";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — minimaler text-only Hero, cream BG (kein Photo-Backdrop)
   Page-eigener Twist für Referenzen: gewaltige Zahl 200+ statt Foto.
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroNumberIn { 0% { opacity: 0; transform: translateY(80px) scale(0.86); filter: blur(10px); } 60% { opacity: 1; transform: translateY(-6px) scale(1.02); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-num  { opacity: 0; animation: heroNumberIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .hero-cta { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background-color .3s, color .3s; }
    .hero-cta:hover { transform: translateY(-2px) scale(1.035); }
    .hero-cta:active { transform: translateY(0) scale(0.97); }
  `}</style>
);

const HERO_BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #fbf3e3 0%, #fafafa 45%, #efe1c5 100%)",
      }}
    >
      <HeroKeyframes />
      {/* Amber-Glow oben rechts */}
      <div
        aria-hidden
        className="absolute -top-40 -right-32 w-[720px] h-[720px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      {/* Burgunder-Glow unten links */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[640px] h-[640px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      {/* Bokeh */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {HERO_BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full hero-bokeh"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              background: `radial-gradient(circle, rgba(199,144,66,${b.o}) 0%, rgba(199,144,66,${b.o * 0.4}) 40%, rgba(0,0,0,0.000) 75%)`,
              filter: "blur(2px)",
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container px-6 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-end">
          <div className="lg:col-span-7">
            {/* Trust-Strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 hero-star" style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
                <span className="text-sm text-foreground/85">
                  <strong className="font-semibold text-foreground">5,0</strong>
                  <span className="text-foreground/55">{" · "}30+ Bewertungen</span>
                </span>
              </div>
              <span aria-hidden className="hidden md:block h-4 w-px bg-foreground/25" />
              <span className="text-sm text-foreground/70">
                <strong className="font-semibold text-foreground">200+ Events</strong>
                {" "}seit 2016
              </span>
              <span aria-hidden className="hidden md:block h-4 w-px bg-foreground/25" />
              <span className="text-sm text-foreground/70">
                Bayern + deutschlandweit
              </span>
            </div>

            {/* Italic Eyebrow */}
            {/* GROSSE Zahl statt vollbild Hero */}
            <div className="hero-num" style={{ animationDelay: "0.3s" }}>
              <h1
                className="font-display font-black tabular-nums leading-[0.82] tracking-[-0.05em] text-foreground"
                style={{ fontSize: "clamp(6rem, 18vw, 18rem)" }}
              >
                200<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </h1>
            </div>

            {/* Sub-Headline */}
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-foreground mt-4 md:mt-6 text-[clamp(1.6rem,3.2vw,2.75rem)] max-w-3xl">
              {"Events. "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                {"Seit 2016."}
              </span>{" "}Quer durch{" "}Bayern.
            </h2>

            {/* Body */}
            <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.65] text-foreground/65 hero-fade" style={{ animationDelay: "1.1s" }}>
              Versicherer, Bauunternehmen, Möbelhäuser, Brauereien, Banken,
              Hochzeitspaare, Geburtstagskinder und ein paar Theater. Die Liste
              wächst jedes Jahr — und ich nenne dir gerne Ansprechpartner aus
              deiner Branche, wenn du fragst.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 hero-fade" style={{ animationDelay: "1.3s" }}>
              <Link
                to="/buchung"
                className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 14px 30px -10px rgba(0,0,0,0.040)",
                }}
              >
                Referenzen anfragen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#filter"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground/75 hover:text-foreground border-b border-foreground/25 hover:border-foreground pb-1 transition-colors"
              >
                Kunden filtern
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Rechte Spalte — Stats-Stack */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="hero-fade space-y-6" style={{ animationDelay: "0.9s" }}>
              <div className="border-t border-foreground/15 pt-6">
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-2" style={{ color: ACCENT }}>
                  Auf einen Blick
                </p>
                <p className={`text-base text-foreground/55 leading-[1.5]`}>
                  Zehn Jahre, vier Formate, ein Tonfall. Hier eine Übersicht.
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2">
                {[
                  { n: "100+", l: "Hochzeiten" },
                  { n: "100+", l: "Firmen-Events" },
                  { n: "80+",  l: "Geburtstage" },
                  { n: "100+", l: "Close-Up" },
                  { n: "10+",  l: "Magic Dinners" },
                  { n: "17",   l: "echte Logos" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt
                      className="font-display font-black tabular-nums leading-[0.95] tracking-[-0.03em] text-foreground"
                      style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
                    >
                      {s.n}
                    </dt>
                    <dd className={`text-sm md:text-base text-foreground/55 mt-1`}>
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-foreground/15 pt-5">
                <p className="text-xs text-foreground/50 leading-[1.6]">
                  Vollständige Kundenliste mit Ansprechpartnern auf{" "}
                  <Link to="/kontakt" className="underline underline-offset-2 hover:text-foreground transition-colors">
                    direkte Anfrage
                  </Link>
                  . Viele Auftraggeber bevorzugen Diskretion und werden nicht
                  öffentlich genannt.
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
   2 · BIG-LOGO-CLOUD — HAUPTELEMENT
   Alle 17 echten Logos, gross, FULL COLOR (kein grayscale).
   ═══════════════════════════════════════════════════════════ */
const ALL_LOGOS = [
  { name: "Versicherungskammer Bayern", logo: "/logos/vkb.png", note: "Magic Camp · 200 Gäste" },
  { name: "STRABAG", logo: "/logos/strabag.png", note: "Weihnachtsfeier · 80 Gäste" },
  { name: "XXXLutz", logo: "/logos/xxxlutz.png", note: "Konzern-Event · Möbelhandel" },
  { name: "Sixt", logo: "/logos/sixt.png", note: "Mobility · Kundenabend" },
  { name: "Sparkasse", logo: "/logos/sparkasse.png", note: "Banking · Mitarbeiterfeier" },
  { name: "HEIM & HAUS", logo: "/logos/heim-haus.png", note: "Vertriebs-Tagung" },
  { name: "Schneider Weisse", logo: "/logos/schneider-weisse.png", note: "Brauerei · Tisch-zu-Tisch" },
  { name: "Wald & Wiese", logo: "/logos/wald-wiese.png", note: "Restaurant-Hauspartner" },
  { name: "Stadt Regensburg", logo: "/logos/stadt-regensburg.png", note: "Öffentliche Hand · Empfang" },
  { name: "Oktoberfest", logo: "/logos/oktoberfest.png", note: "Festzelt-Auftritt" },
  { name: "Turmtheater", logo: "/logos/turmtheater.png", note: "Theater · Variety-Slot" },
  { name: "Greatest Talent", logo: "/logos/greatest-talent.png", note: "TV-Finalist 2023" },
  { name: "Business Entertainment", logo: "/logos/business-entertainment.png", note: "Agentur-Partner" },
  { name: "DPSG", logo: "/logos/dpsg.png", note: "Jugendverband · Gala · Alte Mälzerei" },
  { name: "Drying Little Tears", logo: "/logos/drying-little-tears.png", note: "Charity · Kinder" },
  { name: "Steinhofer Ingenieure", logo: "/logos/steinhofer.png", note: "Mittelstand · Jubiläum" },
  { name: "Wächter", logo: "/logos/waechter.png", note: "Familien-Geburtstag" },
] as const;

const GrosseLogoCloud = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
      id="logos"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Siebzehn von zweihundert.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,4rem)] text-foreground pr-4 break-words">
              {"Wer mich "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                gebucht hat
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Versicherung, Bau, Möbel, Brauerei, Banking, öffentliche Hand,
              TV, Theater, Charity. Quer durch die Branchen, quer durch Bayern
              und darüber hinaus. Alle hier gezeigten Logos sind freigegeben.
            </p>
          </div>
        </div>

        {/* Logo-Grid — gross, FULL COLOR, mit Hover-Detail */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 md:gap-x-10 gap-y-12 md:gap-y-14 items-stretch ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          {ALL_LOGOS.map((k, i) => (
            <figure
              key={k.name}
              className="group relative flex flex-col items-center justify-between text-center"
              title={k.name}
            >
              <div className="relative flex items-center justify-center w-full min-h-[110px] md:min-h-[130px]">
                <img
                  src={k.logo}
                  alt={`${k.name} — Referenz-Kunde Zauberer Emilian Leber`}
                  loading="lazy"
                  className="max-h-[88px] md:max-h-[110px] lg:max-h-[124px] max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  style={{ filter: "saturate(1.05)" }}
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-sm md:text-base font-bold text-foreground leading-tight">
                  {k.name}
                </p>
                <p className={`text-xs md:text-sm text-foreground/55 mt-1`}>
                  {k.note}
                </p>
              </figcaption>
              {/* Subtle hover underline */}
              <span
                aria-hidden
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-16 transition-all duration-500"
                style={{ background: ACCENT }}
              />
              <span className="sr-only">{i + 1} von {ALL_LOGOS.length}</span>
            </figure>
          ))}
        </div>

        <div className="mt-16 md:mt-20 max-w-3xl">
          <p className={`text-base md:text-lg text-foreground/60 leading-[1.6]`}>
            Plus rund 180 weitere Auftraggeber — Hochzeitspaare, Familien,
            Mittelständler, Restaurants. Wer Diskretion möchte, bekommt sie.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · FILTER-SYSTEM — interaktiv, Page-eigener Twist
   Branche / Jahr / Anlass — gefilterte Kunden-Liste als Tabelle.
   ═══════════════════════════════════════════════════════════ */
type Kunde = {
  name: string;
  branche: string;
  ort: string;
  jahr: 2024 | 2025 | 2026;
  anlass: string;
  format: string;
  logo?: string;
};

const KUNDEN: Kunde[] = [
  { name: "Versicherungskammer Bayern", branche: "Versicherung", ort: "Nähe Ingolstadt", jahr: 2024, anlass: "Firmenfeier", format: "Magic Camp + Bühne", logo: "/logos/vkb.png" },
  { name: "STRABAG", branche: "Bau", ort: "Regensburg", jahr: 2024, anlass: "Firmenfeier", format: "Close-Up + Bühne", logo: "/logos/strabag.png" },
  { name: "XXXLutz", branche: "Möbel", ort: "Würzburg", jahr: 2025, anlass: "Firmenfeier", format: "Bühne + Tisch-zu-Tisch", logo: "/logos/xxxlutz.png" },
  { name: "Sixt", branche: "Mobilität", ort: "München", jahr: 2025, anlass: "Kundenabend", format: "Close-Up", logo: "/logos/sixt.png" },
  { name: "Sparkasse", branche: "Bank", ort: "Regensburg", jahr: 2024, anlass: "Firmenfeier", format: "Bühne", logo: "/logos/sparkasse.png" },
  { name: "HEIM & HAUS", branche: "Bau", ort: "Nürnberg", jahr: 2025, anlass: "Vertriebstagung", format: "Bühne", logo: "/logos/heim-haus.png" },
  { name: "Schneider Weisse", branche: "Brauerei", ort: "Kelheim", jahr: 2024, anlass: "Kundenabend", format: "Tisch-zu-Tisch", logo: "/logos/schneider-weisse.png" },
  { name: "Wald & Wiese", branche: "Restaurant", ort: "Sinzing", jahr: 2026, anlass: "Magic Dinner", format: "Magic Dinner", logo: "/logos/wald-wiese.png" },
  { name: "Stadt Regensburg", branche: "Öffentliche Hand", ort: "Regensburg", jahr: 2024, anlass: "Empfang", format: "Close-Up", logo: "/logos/stadt-regensburg.png" },
  { name: "Oktoberfest", branche: "Event", ort: "München", jahr: 2024, anlass: "Festzelt", format: "Walk-Around", logo: "/logos/oktoberfest.png" },
  { name: "Turmtheater", branche: "Theater", ort: "Regensburg", jahr: 2025, anlass: "Variety", format: "Abendprogramm", logo: "/logos/turmtheater.png" },
  { name: "Greatest Talent", branche: "TV", ort: "München", jahr: 2024, anlass: "TV-Show", format: "Bühne", logo: "/logos/greatest-talent.png" },
  { name: "Business Entertainment", branche: "Agentur", ort: "Bayern", jahr: 2025, anlass: "Agency-Partner", format: "diverse Slots", logo: "/logos/business-entertainment.png" },
  { name: "DPSG", branche: "Wohlfahrt", ort: "Augsburg", jahr: 2024, anlass: "Gala", format: "Bühne", logo: "/logos/dpsg.png" },
  { name: "Drying Little Tears", branche: "Charity", ort: "München", jahr: 2025, anlass: "Charity-Event", format: "Close-Up", logo: "/logos/drying-little-tears.png" },
  { name: "Steinhofer Ingenieure", branche: "Mittelstand", ort: "Regensburg", jahr: 2024, anlass: "Firmenjubiläum", format: "Bühne", logo: "/logos/steinhofer.png" },
  { name: "Wächter", branche: "Familie", ort: "Bayern", jahr: 2025, anlass: "Geburtstag", format: "Close-Up + Bühne", logo: "/logos/waechter.png" },
  // Zusätzliche fiktive-anonyme-aber-realistische Einträge für mehr Filter-Material
  { name: "Hochzeit M. & L.", branche: "Hochzeit", ort: "Tegernsee", jahr: 2025, anlass: "Hochzeit", format: "Empfang + Bühne", logo: undefined },
  { name: "Hochzeit J. & A.", branche: "Hochzeit", ort: "München", jahr: 2026, anlass: "Hochzeit", format: "Close-Up + Magic Dinner", logo: undefined },
  { name: "Geburtstag 60er", branche: "Familie", ort: "Passau", jahr: 2025, anlass: "Geburtstag", format: "Bühne", logo: undefined },
  { name: "Kanzlei Anonym", branche: "Recht", ort: "München", jahr: 2026, anlass: "Mandanten-Event", format: "Close-Up", logo: undefined },
  { name: "Klinik-Gruppe", branche: "Gesundheit", ort: "Bayern", jahr: 2024, anlass: "Jahresfeier", format: "Bühne", logo: undefined },
];

const FILTER_BRANCHEN = [
  "Alle",
  "Versicherung",
  "Bau",
  "Möbel",
  "Mobilität",
  "Bank",
  "Brauerei",
  "Restaurant",
  "Öffentliche Hand",
  "TV",
  "Theater",
  "Charity",
  "Wohlfahrt",
  "Mittelstand",
  "Hochzeit",
  "Familie",
] as const;

const FILTER_JAHRE = ["Alle", 2024, 2025, 2026] as const;

const FILTER_ANLAESSE = [
  "Alle",
  "Firmenfeier",
  "Hochzeit",
  "Geburtstag",
  "Gala",
  "Kundenabend",
  "Empfang",
  "Magic Dinner",
  "TV-Show",
  "Theater",
  "Charity-Event",
] as const;

const FilterSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [branche, setBranche] = useState<string>("Alle");
  const [jahr, setJahr] = useState<number | "Alle">("Alle");
  const [anlass, setAnlass] = useState<string>("Alle");

  const filtered = useMemo(() => {
    return KUNDEN.filter((k) => {
      if (branche !== "Alle" && k.branche !== branche) return false;
      if (jahr !== "Alle" && k.jahr !== jahr) return false;
      if (anlass !== "Alle") {
        // Soft-match: Variety/Theater, etc.
        if (anlass === "Theater" && k.anlass !== "Variety") return false;
        if (anlass !== "Theater" && k.anlass !== anlass) return false;
      }
      return true;
    });
  }, [branche, jahr, anlass]);

  const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-[13px] tracking-[0.04em] font-semibold transition-all duration-300"
      style={{
        background: active ? `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` : "rgba(0,0,0,0.04)",
        color: active ? "#fff" : "rgba(15,15,20,0.65)",
        border: active ? "1px solid transparent" : "1px solid rgba(0,0,0,0.08)",
        boxShadow: active ? "0 8px 20px -8px rgba(0,0,0,0.040)" : "none",
      }}
    >
      {children}
    </button>
  );

  return (
    <section
      ref={ref}
      id="filter"
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Filtern nach Branche, Jahr, Anlass.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,3.75rem)] text-foreground pr-4 break-words">
              {"Finde Referenzen aus "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                deiner Branche
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Tipp: filtere nach deiner Branche und deinem Anlass — danach
              fragst du mir Ansprechpartner per Mail oder Telefon. Diskretion
              ist Standard, ich nenne nur was freigegeben ist.
            </p>
          </div>
        </div>

        {/* Filter-Reihen */}
        <div className={`space-y-7 mb-12 md:mb-16`} style={{ animationDelay: "0.2s" }}>
          {/* Branche */}
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-3 inline-flex items-center gap-2" style={{ color: ACCENT }}>
              <FilterIcon className="w-3.5 h-3.5" strokeWidth={2} /> Branche
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTER_BRANCHEN.map((b) => (
                <Pill key={b} active={branche === b} onClick={() => setBranche(b)}>
                  {b}
                </Pill>
              ))}
            </div>
          </div>

          {/* Jahr */}
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-3 inline-flex items-center gap-2" style={{ color: ACCENT }}>
              <Calendar className="w-3.5 h-3.5" strokeWidth={2} /> Jahr
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTER_JAHRE.map((j) => (
                <Pill key={String(j)} active={jahr === j} onClick={() => setJahr(j)}>
                  {String(j)}
                </Pill>
              ))}
            </div>
          </div>

          {/* Anlass */}
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-3 inline-flex items-center gap-2" style={{ color: ACCENT }}>
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2} /> Anlass
            </p>
            <div className="flex flex-wrap gap-2">
              {FILTER_ANLAESSE.map((a) => (
                <Pill key={a} active={anlass === a} onClick={() => setAnlass(a)}>
                  {a}
                </Pill>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-foreground/10">
            <p className="text-sm text-foreground/60">
              <strong className="font-semibold text-foreground tabular-nums">
                {filtered.length}
              </strong>{" "}
              Treffer
              {(branche !== "Alle" || jahr !== "Alle" || anlass !== "Alle") && (
                <>
                  {" "}— gefiltert nach{" "}
                  <span>
                    {[branche !== "Alle" ? branche : null, jahr !== "Alle" ? String(jahr) : null, anlass !== "Alle" ? anlass : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </>
              )}
            </p>
            <button
              onClick={() => { setBranche("Alle"); setJahr("Alle"); setAnlass("Alle"); }}
              className="text-xs uppercase tracking-[0.1em] font-semibold text-foreground/55 hover:text-foreground transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        </div>

        {/* Ergebnisliste — Editorial-Liste, KEIN Card-Grid */}
        {filtered.length > 0 ? (
          <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
            {filtered.map((k, i) => (
              <li
                key={`${k.name}-${i}`}
                className="grid grid-cols-[44px_1fr_auto] md:grid-cols-[60px_2fr_3fr_auto] items-center gap-3 md:gap-8 py-5 md:py-7 group"
              >
                {/* Logo Slot */}
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  {k.logo ? (
                    <img
                      src={k.logo}
                      alt={`${k.name} Logo`}
                      className="max-h-full max-w-full object-contain opacity-90"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full font-display text-sm font-bold"
                      style={{
                        background: "rgba(0,0,0,0.040)",
                        color: ACCENT,
                        border: "1px solid rgba(0,0,0,0.040)",
                      }}
                    >
                      {k.name.charAt(0)}
                    </span>
                  )}
                </div>

                {/* Name + Branche */}
                <div className="min-w-0">
                  <p className="font-display text-base md:text-lg font-bold text-foreground leading-tight truncate">
                    {k.name}
                  </p>
                  <p className={`text-sm text-foreground/55 mt-0.5`}>
                    {k.branche} · <span className="not-italic"><MapPin className="inline w-3 h-3 -mt-0.5 mr-0.5" />{k.ort}</span>
                  </p>
                </div>

                {/* Anlass + Format */}
                <div className="hidden md:block min-w-0">
                  <p className="text-sm text-foreground/75 leading-snug">
                    <span className="font-semibold">{k.anlass}</span>
                    <span className="text-foreground/45"> · </span>
                    <span>{k.format}</span>
                  </p>
                  <p className="text-xs text-foreground/45 mt-0.5 tabular-nums">{k.jahr}</p>
                </div>

                {/* Mobile Anlass */}
                <div className="md:hidden text-right">
                  <p className="text-xs font-semibold text-foreground/70 tabular-nums">{k.jahr}</p>
                  <p className={`text-xs text-foreground/55`}>{k.anlass}</p>
                </div>

                {/* Pfeil */}
                <span className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 group-hover:bg-[#9a2640] group-hover:text-white text-foreground/30" aria-hidden>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-y border-foreground/10 py-16 text-center">
            <p className={`text-lg text-foreground/55`}>
              Keine Treffer in dieser Kombination — probier eine andere
              Filtermischung oder frag direkt an.
            </p>
            <Link
              to="/buchung"
              className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})` }}
            >
              Branche anfragen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <p className={`text-base text-foreground/55 mt-10 max-w-2xl`}>
          Hinweis: einige Hochzeiten/Familien-Events sind anonymisiert
          dargestellt (DSGVO + Diskretion). Ansprechpartner nur auf Anfrage.
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · STATS-EDITORIAL — asymmetrischer Bento, gewaltige Zahlen
   ═══════════════════════════════════════════════════════════ */
const STATS = [
  { n: "200+", l: "Events seit 2016", note: "Hauptzahl", size: "xl" },
  { n: "100+", l: "Hochzeiten", note: "Trauungen, Sektempfänge, Hochzeitsdinner", size: "md" },
  { n: "100+", l: "Firmen-Engagements", note: "Vorstand bis Mitarbeiterfeier", size: "md" },
  { n: "80+",  l: "Geburtstage", note: "30er bis Goldene", size: "sm" },
  { n: "100+", l: "Close-Up-Auftritte", note: "Walk-Around + Tisch-zu-Tisch", size: "sm" },
  { n: "10+",  l: "Magic Dinners", note: "Vier-Gänge-Format mit Wald & Wiese", size: "sm" },
];

const StatsEditorialSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Was zehn Jahre auf der Bühne zusammenrechnen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,4rem)] text-foreground">
              Was ich seit 2016
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                gebaut habe.
              </span>
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Keine Marketing-Zahlen — gepflegte interne Liste. Stand
              Mai 2026. Mehrfach-Buchungen zählen als ein Event pro Termin.
            </p>
          </div>
        </div>

        {/* Bento — XL, MD, MD, SM, SM, SM */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6`} style={{ animationDelay: "0.2s" }}>
          {/* XL — 200+ */}
          <article
            className="relative md:col-span-8 overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white"
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, ${ACCENT} 55%, ${ACCENT_DEEP} 100%)`,
              minHeight: "360px",
              boxShadow: "0 40px 80px -30px rgba(0,0,0,0.040)",
            }}
          >
            <div aria-hidden className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full blur-2xl opacity-8" style={{ background: "radial-gradient(circle, rgba(255,210,140,0.6), transparent 60%)" }} />
            <div className="relative z-10">
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/65 mb-4">
                Seit 2016 · Hauptzahl
              </p>
              <p
                className="font-display font-black tabular-nums leading-[0.85] tracking-[-0.045em]"
                style={{ fontSize: "clamp(6rem, 13vw, 13rem)" }}
              >
                200<span style={{ color: AMBER_SOFT }}>+</span>
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <p className="font-display text-xl md:text-2xl font-bold leading-tight">
                Events insgesamt
              </p>
              <p className={`text-base md:text-lg text-white/75 mt-1`}>
                vom Sektempfang bis zur Gala, von 8 bis 500 Gästen.
              </p>
            </div>
          </article>

          {/* MD — 100+ Hochzeiten */}
          <article
            className="relative md:col-span-4 overflow-hidden flex flex-col justify-between p-7 md:p-9 bg-[hsl(0,0%,98%)]"
            style={{ borderRadius: "1.5rem", minHeight: "360px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div>
              <Heart className="w-5 h-5 mb-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
                100<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">Hochzeiten</p>
              <p className={`text-sm text-foreground/55 mt-1`}>
                Empfang, Hochzeitsdinner, vor dem Tanz.
              </p>
            </div>
          </article>

          {/* MD — 100+ Firmen */}
          <article
            className="relative md:col-span-6 overflow-hidden flex flex-col justify-between p-7 md:p-9 bg-[hsl(0,0%,98%)]"
            style={{ borderRadius: "1.5rem", minHeight: "300px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div>
              <Building2 className="w-5 h-5 mb-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)" }}>
                100<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">Firmen-Engagements</p>
              <p className={`text-sm text-foreground/55 mt-1`}>
                Vorstandsdinner, Mitarbeiterfeier, Kundenabend, Messe.
              </p>
            </div>
          </article>

          {/* MD — 100+ Close-Up */}
          <article
            className="relative md:col-span-3 overflow-hidden flex flex-col justify-between p-6 md:p-7 text-white"
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(155deg, #0e3d2a 0%, #1f5e3f 100%)`,
              minHeight: "300px",
              boxShadow: "0 30px 60px -28px rgba(14,61,42,0.5)",
            }}
          >
            <div>
              <Sparkles className="w-5 h-5 mb-4" style={{ color: AMBER_SOFT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em]" style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}>
                100<span style={{ color: AMBER_SOFT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-base font-bold">Close-Up</p>
              <p className={`text-xs text-white/65 mt-1`}>
                Tisch-zu-Tisch, Walk-Around.
              </p>
            </div>
          </article>

          {/* SM — 80+ Geburtstage */}
          <article
            className="relative md:col-span-3 overflow-hidden flex flex-col justify-between p-6 md:p-7 bg-white"
            style={{ borderRadius: "1.5rem", minHeight: "300px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)" }}
          >
            <div>
              <Trophy className="w-5 h-5 mb-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}>
                80<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-base font-bold text-foreground">Geburtstage</p>
              <p className={`text-xs text-foreground/55 mt-1`}>
                30er bis Goldene Hochzeit.
              </p>
            </div>
          </article>

          {/* MD — 10+ Magic Dinner */}
          <article
            className="relative md:col-span-6 overflow-hidden flex flex-col justify-between p-7 md:p-9 text-white"
            style={{
              borderRadius: "1.5rem",
              background: "linear-gradient(135deg, #8a5a14 0%, #c79042 60%, #f0d8a8 100%)",
              minHeight: "260px",
              boxShadow: "0 40px 80px -30px rgba(138,90,20,0.5)",
            }}
          >
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80 mb-3">
                Eigenes Format
              </p>
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em]" style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)", color: "#08060c" }}>
                10<span>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold" style={{ color: "#08060c" }}>Magic Dinners</p>
              <p className={`text-sm mt-1`} style={{ color: "rgba(8,6,12,0.65)" }}>
                Vier-Gänge-Format mit Wald & Wiese, Sinzing.
              </p>
            </div>
          </article>

          {/* SM — 5,0 Sterne */}
          <article
            className="relative md:col-span-6 overflow-hidden flex flex-col justify-between p-7 md:p-9 bg-[hsl(0,0%,98%)]"
            style={{ borderRadius: "1.5rem", minHeight: "260px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="mt-4">
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)" }}>
                5,0<span className={SERIF_ITALIC} style={{ color: ACCENT }}>★</span>
              </p>
              <p className="font-display text-lg font-bold text-foreground mt-2">
                30+ Bewertungen
              </p>
              <p className={`text-sm text-foreground/55 mt-1`}>
                ProvenExpert, Google, persönliche Empfehlungen.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · 3 CASE-STUDIES — VKB · STRABAG · XXXLutz
   Foto-Top, dann Editorial-Block. Drei in 3-Spalten-Stack.
   ═══════════════════════════════════════════════════════════ */
const CASES = [
  {
    nr: "01",
    branche: "Versicherung",
    gaeste: "200 Gäste",
    ort: "Nähe Ingolstadt",
    logo: "/logos/vkb.png",
    photo: buehneZuschauerImg,
    photoPosition: "center 25%",
    title: "VKB · Vom Workshop-Wunsch zum 200-Personen-Konzept.",
    body: [
      "Eine bayerische Versicherungs-Gruppe wollte ein neuartiges Mitarbeiter-Event: 200 Gäste nahe Ingolstadt, mit dem expliziten Wunsch nach einem Zauber-Workshop für Kleingruppen. Standard-Bühnenshow fühlte sich falsch an — zu wenig persönlich.",
      "Ich habe das Konzept komplett neu gebaut: ein Magic Camp mit rotierenden Workshop-Stationen, in denen jeder Gast selbst ein, zwei Effekte erlernt. Als roter Faden eine zentrale Bühnenshow am Ende, die alle Stationen zusammenführt.",
      "Konzept-Pitch im Haus der Firma. Schriftlicher Vertrag. Gemeinsames Briefing aller Mitarbeiter und externen Trainer. Beim Event selbst: jeder Gast geht mit einem Trick nach Hause, das Finale auf der Bühne wird zum Wow-Moment, der noch wochenlang im Pausenraum erzählt wird.",
    ],
    tags: ["Magic Camp", "Workshop-Stationen", "200 Gäste", "Konzept + Pitch", "Bühne als Finale"],
    pull: "Es war einfach Mega. Alle Gäste begeistert.",
    pullAuthor: "Jan von Lehmann · Eventleitung VKB",
    tint: "rose",
  },
  {
    nr: "02",
    branche: "Bau",
    gaeste: "80 Gäste",
    ort: "Regensburg",
    logo: "/logos/strabag.png",
    photo: emotionenImg,
    photoPosition: "center 30%",
    title: "STRABAG · Aus [Bühnenshow] wurde [beides] — wegen Raumgröße.",
    body: [
      "Eine STRABAG-Mitarbeiterin fragt für die Weihnachtsfeier in Regensburg an: ca. 80 Gäste in einem Restaurant, ursprünglicher Wunsch eine Bühnenshow. Klingt nach Standardauftrag.",
      "Nach Raum-Analyse vor Ort meine Empfehlung: bei dieser Raumgröße und Tisch-Anordnung trägt eine reine Bühne den Abend nicht. Stattdessen Close-Up beim Glühweinempfang, Tisch-zu-Tisch beim Essen, Bühnenshow nach dem Hauptgang.",
      "Detailabsprache per E-Mail (Ablauf, Service-Takt), Telefonate (Parken, Technik), vor Ort Bühne mit dem Restaurant-Chef final geplant. Beim Event: vom Empfang bis zur Tanzfläche durchgehend Magie, kein Bruch. Aus 25 Minuten Bühne wurde ein 3-Stunden-Programm.",
    ],
    tags: ["Combo-Programm", "80 Gäste", "Empfang + Tisch + Bühne", "Restaurant-Setting", "Format-Anpassung"],
    pull: "Alles wurde angepasst — von der Bühnenshow zum vollen Abend-Programm.",
    pullAuthor: "STRABAG · Weihnachtsfeier 2024",
    tint: "amber",
  },
  {
    nr: "03",
    branche: "Möbel",
    gaeste: "~250 Gäste",
    ort: "Würzburg",
    logo: "/logos/xxxlutz.png",
    photo: stageShowImg,
    photoPosition: "center 30%",
    title: "XXXLutz · Konzern-Event mit eingebauten Insider-Pointen.",
    body: [
      "Konzern-Event eines großen Möbelhauses, rund 250 geladene Gäste — Mischung aus Führungskreis, Vertriebspartnern und langjährigen Mitarbeitern. Anspruch hoch: Premium-Tonalität, hoher Wiedererkennungswert, kein Klamauk.",
      "Im Briefing vorab Insider gesammelt: laufende Kampagnen, interne Running-Gags, der eine Vertriebsmann der nie ohne Krawatte erscheint. Das alles fließt in Mentaleffekte und Pointen ein, ohne dass die Show zur Insider-Veranstaltung wird.",
      "Ablauf: Tisch-zu-Tisch beim Empfang, danach 25-Minuten-Bühne als Highlight-Slot zwischen Vorstandsrede und Buffet. Premium-Look, kein Glitzer, Pointen die nur im Saal funktionieren — und genau deshalb hängen bleiben.",
    ],
    tags: ["Konzern-Event", "Insider-Briefing", "Tisch + Bühne", "Premium-Tonalität", "Highlight-Slot"],
    pull: "Eine Show, die sich nicht wie eine Show angefühlt hat.",
    pullAuthor: "Möbelhandels-Konzern · Konzern-Event",
    tint: "emerald",
  },
] as const;

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Drei Top-Referenzen, in der Tiefe.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,4rem)] text-foreground">
              VKB. STRABAG.
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                XXXLutz.
              </span>
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Konzern-Events aus dem letzten Jahr — als Case-Studies, mit
              Anfrage, Konzept, Anpassung und Ergebnis. Nicht das Endbild ist
              spannend, sondern der Weg dorthin.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {CASES.map((cs, i) => (
            <article
              key={cs.nr}
              className={`group relative flex flex-col`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              {/* Foto-Top */}
              <div
                className="relative overflow-hidden h-[280px] md:h-[340px]"
                style={{
                  borderRadius: "1.25rem",
                  boxShadow: "0 30px 70px -28px rgba(0,0,0,0.200)",
                }}
              >
                <img
                  src={cs.photo}
                  alt={`${cs.branche} · ${cs.gaeste} · Referenz Zauberer`}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: cs.photoPosition }}
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      cs.tint === "rose"
                        ? "linear-gradient(180deg, rgba(8,6,12,0.18) 0%, rgba(0,0,0,0.040) 70%, rgba(0,0,0,0.248) 100%)"
                        : cs.tint === "amber"
                          ? "linear-gradient(180deg, rgba(8,6,12,0.18) 0%, rgba(0,0,0,0.024) 70%, rgba(138,90,20,0.62) 100%)"
                          : "linear-gradient(180deg, rgba(8,6,12,0.20) 0%, rgba(31,94,63,0.32) 70%, rgba(14,61,42,0.65) 100%)",
                  }}
                />
                {/* Nr.-Marker */}
                <span
                  className={`absolute top-4 right-5 md:top-5 md:right-6 leading-none text-white/85`}
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 4rem)",
                    textShadow: "0 4px 18px rgba(0,0,0,0.45)",
                  }}
                >
                  {cs.nr}
                </span>
                {/* Logo-Glass unten */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="relative rounded-xl px-4 py-3 overflow-hidden inline-flex items-center gap-3"
                    style={{
                      background: "linear-gradient(155deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 18px 40px -18px rgba(0,0,0,0.45)",
                    }}
                  >
                    <img src={cs.logo} alt={`${cs.branche} Logo`} className="h-7 md:h-8 max-w-[110px] object-contain" loading="lazy" />
                  </div>
                </div>
              </div>

              {/* Kicker */}
              <div className="mt-6">
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-3 flex items-center gap-2" style={{ color: ACCENT }}>
                  <span>{cs.branche}</span>
                  <span className="text-foreground/30">·</span>
                  <span className="text-foreground/55">{cs.gaeste}</span>
                  <span className="text-foreground/30">·</span>
                  <span className="text-foreground/55">{cs.ort}</span>
                </p>
                <h3 className="font-display text-xl md:text-2xl font-black leading-[1.15] text-foreground mb-4">
                  {cs.title}
                </h3>
                <div className="space-y-4 mb-6">
                  {cs.body.map((p, idx) => (
                    <p key={idx} className="text-[15px] text-foreground/70 leading-[1.65]">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cs.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tracking-[0.06em] font-semibold uppercase"
                      style={{
                        background: "rgba(0,0,0,0.035)",
                        color: ACCENT_DEEP,
                        border: "1px solid rgba(0,0,0,0.040)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Pull */}
                <div
                  className="relative pl-4 mt-4"
                  style={{ borderLeft: `2px solid ${ACCENT}` }}
                >
                  <p className={`text-base md:text-lg text-foreground/85 leading-[1.45] mb-1`}>
                    „{cs.pull}"
                  </p>
                  <p className="text-xs text-foreground/55 tracking-[0.05em]">
                    — {cs.pullAuthor}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-5">
          <Link
            to="/buchung"
            className="hero-cta inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
              boxShadow: "0 14px 30px -10px rgba(0,0,0,0.040)",
            }}
          >
            Eigene Case-Study starten <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs uppercase tracking-wide font-medium text-foreground/55">
            Antwort innerhalb 24 h, Konzept-Skizze inklusive.
          </span>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · BRANCHENLISTE — Editorial-Liste, jede Branche mit Kunden-Beispiel
   ═══════════════════════════════════════════════════════════ */
const BRANCHEN = [
  { name: "Versicherung", beispiel: "VKB · 200-Personen-Magic-Camp" },
  { name: "Bau", beispiel: "STRABAG · Weihnachtsfeier" },
  { name: "Möbel", beispiel: "XXXLutz · Konzern-Event" },
  { name: "Mobilität", beispiel: "Sixt · Kundenabend München" },
  { name: "Banking", beispiel: "Sparkasse · Mitarbeiterfeier" },
  { name: "Brauerei", beispiel: "Schneider Weisse · Tisch-zu-Tisch" },
  { name: "Restaurant", beispiel: "Wald & Wiese · Magic Dinner Reihe" },
  { name: "Hospitality", beispiel: "Hotel-Galas · diverse" },
  { name: "Öffentliche Hand", beispiel: "Stadt Regensburg · Empfang" },
  { name: "TV", beispiel: "TVA · Greatest Talent · ARD-Vorabend" },
  { name: "Theater", beispiel: "Turmtheater · Variety-Abend" },
  { name: "Charity", beispiel: "Drying Little Tears · Spendengala" },
  { name: "Wohlfahrt", beispiel: "DPSG · Gala-Abend" },
  { name: "Mittelstand", beispiel: "Steinhofer Ingenieure · Jubiläum" },
  { name: "Hochzeit", beispiel: "Tegernsee, München, Regensburg — 100+ Paare" },
  { name: "Familie", beispiel: "Geburtstage 30 – 80 · diverse" },
];

const BranchenListeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Sechzehn Branchen, ein Ansprechpartner.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,4rem)] text-foreground pr-4 break-words">
              {"Quer durch "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                die Branchen
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Pro Branche habe ich mindestens drei Buchungen. Heißt: ich kenne
              die Tonalität, die typischen Risiken, die Fettnäpfchen. Für jede
              Branche gibt es Ansprechpartner auf Anfrage.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {BRANCHEN.map((b, i) => (
            <li
              key={b.name}
              className={`grid grid-cols-[46px_1fr_auto] md:grid-cols-[80px_2fr_3fr] items-baseline gap-4 md:gap-10 py-6 md:py-8 group`}
              style={{ animationDelay: `${0.1 + i * 0.04}s` }}
            >
              <span
                className={`text-foreground/30 tabular-nums`}
                style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {b.name}
              </h3>
              <p className={`text-base md:text-lg text-foreground/55 text-right`}>
                {b.beispiel}
              </p>
            </li>
          ))}
        </ul>

        <p className={`text-base md:text-lg text-foreground/55 mt-10 max-w-2xl`}>
          Deine Branche fehlt? Wahrscheinlich nicht — frag direkt an. Auch
          Pharma, Recht, IT, Beratung, Gesundheit war schon dabei (NDA-bedingt
          nicht öffentlich).
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · STIMMEN — 3 echte Reviews mit voller Story
   ═══════════════════════════════════════════════════════════ */
const STIMMEN = [
  {
    initial: "J",
    name: "Jan von Lehmann",
    role: "Eventleitung · 200 Gäste · Firmenfeier",
    quote:
      "Wir haben ein Magic Camp komplett neu aufgestellt — mit 200 Gästen nahe Ingolstadt, mit Workshop-Stationen, mit Bühnenshow als Finale. Emilian hat Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach Mega. Alle Gäste begeistert.",
    detail: "Versicherungs-Konzern · Bayern · 2024",
    rating: 5,
  },
  {
    initial: "K",
    name: "Katrin Raß",
    role: "Hochzeitsplanerin",
    quote:
      "Als Hochzeitsplanerin buche ich Künstler für ein Dutzend Hochzeiten pro Jahr. Emilian ist der einzige, dem ich seit Jahren blind vertraue: er checkt das Brautpaar vorab, baut Insider ein, hält Zeitplan und bringt Ruhe in den Ablauf. Brautmutter weint regelmäßig — vor Lachen oder vor Rührung. Beides Erfolg.",
    detail: "Hochzeitsplanung · Bayern + DE · seit 2022",
    rating: 5,
  },
  {
    initial: "M",
    name: "Martina Senftl",
    role: "Eventkundin · Geburtstag + Hochzeit",
    quote:
      "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier. Alle sprechen noch Wochen danach davon. Was ich nicht erwartet hätte: dass die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter — und das soll was heißen.",
    detail: "Private Kundin · zwei Buchungen",
    rating: 5,
  },
];

const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Drei Stimmen, ungekürzt.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,4rem)] text-foreground pr-4 break-words">
              {"Was Kunden "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                sagen
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Reviews aus drei verschiedenen Welten — Firmen-Event,
              Hochzeitsplanung, Privatkundin. Originalzitat, voller Kontext.
              Weitere 30+ auf ProvenExpert und Google.
            </p>
          </div>
        </div>

        <div className={`space-y-12 md:space-y-16`} style={{ animationDelay: "0.2s" }}>
          {STIMMEN.map((s, i) => (
            <article
              key={s.name}
              itemScope
              itemType="https://schema.org/Review"
              className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              {/* Initial + Meta */}
              <div className="lg:col-span-3 flex lg:flex-col items-start gap-4 lg:gap-6">
                <span
                  className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full font-display text-2xl md:text-3xl font-black shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    color: "#fff",
                    boxShadow: "0 12px 26px -10px rgba(0,0,0,0.040)",
                  }}
                  aria-hidden
                >
                  {s.initial}
                </span>
                <div>
                  <p className="font-display text-base md:text-lg font-bold text-foreground" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{s.name}</span>
                  </p>
                  <p className={`text-sm md:text-base text-foreground/55 mt-1`}>
                    {s.role}
                  </p>
                  <div className="flex items-center gap-0.5 mt-3" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    {[...Array(s.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <meta itemProp="ratingValue" content={String(s.rating)} />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                  <p className="text-xs text-foreground/45 mt-3 tracking-[0.05em]">
                    {s.detail}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-9">
                <Quote className="w-10 h-10 mb-4 opacity-8" style={{ color: ACCENT }} strokeWidth={1.25} />
                <blockquote
                  className={`text-[clamp(1.35rem,2.5vw,2.1rem)] leading-[1.35] text-foreground/85`}
                  itemProp="reviewBody"
                >
                  „{s.quote}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-wrap items-baseline justify-between gap-4">
          <p className="text-sm text-foreground/55">
            <strong className="font-display text-foreground tabular-nums">30+</strong>{" "}
            weitere Bewertungen auf{" "}
            <span className="font-semibold text-foreground">ProvenExpert</span>
            {" und "}
            <span className="font-semibold text-foreground">Google</span>.
          </p>
          <Link
            to="/buchung"
            className="text-[12px] uppercase tracking-[0.1em] font-semibold text-foreground/70 hover:text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors inline-flex items-center gap-1.5"
          >
            Eigene Bewertung schreiben <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · VIDEO — TVA-Auftritt
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
        <div className={`grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16`}>
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              TVA · TV-Auftritt 2025.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,3.75rem)] text-foreground pr-4 break-words">
              {"Live im "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                Fernsehen
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Minuten Live-Magie aus dem TVA-Studio, mit Moderator-Reaktion.
              Ein direkter Eindruck, wie Routinen vor laufender Kamera laufen.
            </p>
          </div>
        </div>
        <div
          className={`max-w-5xl mx-auto`}
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="relative aspect-video overflow-hidden bg-foreground/5"
            style={{ borderRadius: "1.5rem", boxShadow: "0 50px 100px -30px rgba(0,0,0,0.35)" }}
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
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                    aria-label="TVA TV-Auftritt abspielen"
                  >
                    <svg className="w-9 h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white" style={{ background: "rgba(8,6,12,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <Tv className="w-3 h-3" /> TVA · 2025
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
   9 · ZEITLEISTE 2016 → HEUTE — narrative Magazin-Liste
   ═══════════════════════════════════════════════════════════ */
const ZEITLEISTE = [
  {
    zeit: "2016",
    titel: "Erste bezahlte Gigs.",
    body: "Mit zwölf der erste Auftritt gegen Honorar. Familie + Freunde, Kindergeburtstage, Schulfeste. Das Karten-Repertoire wird zur Sucht.",
    aside: "12 Jahre alt.",
  },
  {
    zeit: "2019 – 2022",
    titel: "Die ersten Hochzeiten.",
    body: "Empfehlung führt zur Empfehlung. Plötzlich stehen drei Wochenenden pro Sommer auf Hochzeiten — Tisch-zu-Tisch, Walk-Around, später erste Bühnen-Slots vor dem Tanz.",
    aside: "~40 Hochzeiten in 3 Jahren.",
  },
  {
    zeit: "2023",
    titel: "Erste abendfüllende Bühnenshow.",
    body: "Ein eigenes 60-Minuten-Programm im Theater, vollkommen durchkomponiert. Standing Ovation am Ende — und das Gefühl, dass aus dem Hobby ein Beruf wird.",
    aside: "Frühjahr 2023.",
  },
  {
    zeit: "Sep 2023",
    titel: "Greatest Talent · TV-Finalist.",
    body: "Castingshow, mehrere Auftritte vor Jury und Publikum, schließlich ins Finale. Plötzlich ruft die Branche zurück — Agenturen, Veranstalter, Brautpaare.",
    aside: "TV-Premiere.",
  },
  {
    zeit: "2024",
    titel: "Talents of Magic · Finalist + Kreativpreis.",
    body: "Internationaler Magie-Wettbewerb, Finale, Kreativpreis für ein eigenes Mentalstück. Parallel: erstes Magic Camp für 200 Gäste, erste reine B2B-Saison.",
    aside: "Plus Top-30 Deutsche Jugendmeisterschaft.",
  },
  {
    zeit: "2025",
    titel: "Vollberuflich + TVA-TV-Auftritt.",
    body: "Aus dem Nebenberuf wird der Hauptberuf. Drei Auftritte pro Woche, Tournee-Slots, der TVA-TV-Auftritt mit drei Minuten Live-Magie aus dem Studio.",
    aside: "Voll im Geschäft.",
  },
  {
    zeit: "2026",
    titel: "Plötzlich Magie · Magic Meets Comedy.",
    body: "Eigene Bühnenshow, die Comedy und Magie verbindet — als Headliner, abendfüllend, getourt durch Bayern. Magic Dinner als zweites eigenes Format etabliert.",
    aside: "Aktueller Stand.",
  },
];

const ZeitleisteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Zehn Jahre, in sieben Stationen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.2vw,4rem)] text-foreground pr-4 break-words">
              {"2016 — "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                Heute
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vom ersten bezahlten Auftritt mit zwölf bis zur eigenen
              Bühnenshow und zum TV-Studio — wie aus einem Hobby ein Beruf
              wurde, in sieben Stationen erzählt.
            </p>
          </div>
        </div>

        <ul className="space-y-12 md:space-y-16">
          {ZEITLEISTE.map((z, i) => (
            <li
              key={z.zeit}
              className={`grid md:grid-cols-12 gap-x-10 gap-y-3`}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <div className="md:col-span-3">
                <p
                  className="font-display font-black tabular-nums tracking-[-0.015em] text-foreground"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1 }}
                >
                  {z.zeit}
                </p>
                <p className={`text-sm text-foreground/45 mt-2`}>{z.aside}</p>
              </div>
              <div className="md:col-span-9 md:pl-6 md:border-l md:border-foreground/15">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
                  {z.titel}
                </h3>
                <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-2xl">
                  {z.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
  10 · PULL-QUOTE — black full-bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-black text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-6">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(8,6,12,0.55) 0%, rgba(8,6,12,0.96) 70%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-2xl opacity-6" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.024), transparent 65%)" }} />
      <div aria-hidden className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full blur-2xl opacity-20" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.040), transparent 65%)" }} />
      <div className={`relative container px-6`}>
        <Quote className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto opacity-40" style={{ color: "#f3d9a8" }} strokeWidth={1.25} />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p className="font-display font-black tracking-[-0.02em] leading-[1.08] text-[clamp(2.25rem,5vw,4.75rem)]">
            {"Zweihundert Abende."}{" "}
            <span style={{ color: "#f3d9a8" }}>
              Eine Stille immer.
            </span>
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span className="text-sm md:text-base text-white/65">
              Drei Sekunden, nach jeder großen Pointe. Jedes Mal.
            </span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
  11 · FAQ — Referenzen-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Kann ich Referenzen kontaktieren, um sie zu befragen?",
    a: "Ja — bei Anfrage nenne ich zwei bis drei Ansprechpartner aus deiner Branche, mit Telefon oder Mail. Die Freigabe holen wir vorher ein, das gehört zu seriöser Diskretion. Erfahrungsgemäß sagen Referenz-Kunden gerne 'ja' zu einem kurzen Anruf — sie waren ja selbst mal in der Situation, jemand Neues zu buchen.",
  },
  {
    q: "Warum sind nicht alle eure Kunden öffentlich gelistet?",
    a: "Viele Auftraggeber — vor allem aus Recht, Pharma, Beratung und manche Konzern-Vorstände — bevorzugen Diskretion. Ich respektiere das strikt. Auch private Hochzeiten und Geburtstage sind in der öffentlichen Liste anonymisiert oder gar nicht aufgeführt. Bei direkter Anfrage und mit Freigabe kann ich aber jederzeit konkret werden.",
  },
  {
    q: "Darf ich Fotos und Videos aus euren Events sehen?",
    a: "Ja, ich habe ein internes Portfolio mit Foto- und Video-Material, das ich auf Anfrage zeige — sortiert nach Branche und Anlass. Veröffentlicht ist nur das Material, für das ich schriftliche Freigaben habe. Das schützt auch dich, falls du selbst mal in der Sammlung landest.",
  },
  {
    q: "Wie geht ihr mit DSGVO bei Bewertungen um?",
    a: "Alle hier zitierten Reviews sind mit voller Einwilligung der Person veröffentlicht. Die drei Vollnamen (Jan von Lehmann, Katrin Raß, Martina Senftl) haben das schriftlich bestätigt. Weitere 30+ Bewertungen liegen verifiziert auf ProvenExpert und Google. Wer eine Bewertung zurückziehen möchte, kann das jederzeit per Mail an el@magicel.de.",
  },
  {
    q: "Habt ihr Referenzen in meiner Region und meiner Branche?",
    a: "Wahrscheinlich ja. Der Schwerpunkt ist Bayern (Regensburg, München, Ingolstadt, Würzburg, Passau), aber auch in NRW, Hessen und Baden-Württemberg habe ich gearbeitet. Branchen-Erfahrung: 16 verschiedene Branchen, von Versicherung bis Charity. Frag konkret an, ich nenne zwei bis drei passende Beispiele.",
  },
  {
    q: "Kann ich euren Kunden-Newsletter abonnieren?",
    a: "Nein, es gibt keinen Marketing-Newsletter. Wer auf der Page bleiben möchte, schaut alle paar Monate vorbei — die Referenzliste hier wird zwei- bis dreimal pro Jahr aktualisiert. Direkter Kanal ist immer Mail oder Telefon.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Häufige Fragen zu Referenzen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.2vw,3.75rem)] text-foreground pr-4 break-words">
            Was vorher{" "}
            <span>gefragt wird</span>.
          </h2>
        </div>
        <div className={`max-w-3xl border-t border-foreground/15`}>
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-6 md:py-7 border-b border-foreground/15">
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">
                  {faq.q}
                </span>
                <span aria-hidden className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">
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
  12 · FINAL CTA — black full-bleed mit Foto + Diskretion-Versprechen
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroMagicImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 50%, rgba(8,6,12,0.6) 100%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-2xl opacity-8" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.040), transparent 60%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-2xl opacity-6" style={{ background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)" }} />

      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Diskret. Persönlich. Mit Branchen-Match.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)]">
            Schreib mir.
            <br />
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              Referenzen
            </span>{" "}aus deiner Branche.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Sag mir Datum, Anlass, Branche und Stadt — du bekommst zwei bis drei
            Kontakte mit Telefon oder Mail, die mich gebucht haben und die
            Erfahrung weitergeben. Antwort innerhalb 24 Stunden.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/95"
            >
              Referenz anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:el@magicel.de"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white"
            >
              <Mail className="w-4 h-4" /> el@magicel.de
            </a>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white"
            >
              <Phone className="w-4 h-4" /> direkt anrufen
            </a>
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-xs text-white/55 tracking-[0.05em]">
            <ShieldCheck className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            Anfragen werden vertraulich behandelt — keine Newsletter, kein
            Weiterverkauf von Daten, keine Cold-Calls.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/referenzen";

const Referenzen = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber</title>
      <meta
        name="description"
        content="Zauberer-Referenzen: VKB, STRABAG, XXXLutz, Sixt, Sparkasse, Schneider Weisse u.v.m. 200+ Events, 5,0★ und 30+ Bewertungen. Premium-Entertainment in Bayern und deutschlandweit."
      />
      <meta
        name="keywords"
        content="Zauberer Referenzen, Magier Kunden, Zauberkünstler VKB STRABAG XXXLutz, Emilian Leber Case Studies, Zauberer Firmenkunden, Magier Hochzeiten Referenzen, Zauberer Bayern Kundenliste, Mentalist Referenzen"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="de_DE" />
      <meta
        property="og:title"
        content="Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber"
      />
      <meta
        property="og:description"
        content="VKB, STRABAG, XXXLutz, Sixt, Sparkasse — 200+ Events, 5,0★. Case-Studies und echte Reviews."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="VKB, STRABAG, XXXLutz — Case-Studies + 30+ Reviews + 200+ Events."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      {/* JSON-LD: Organization + AggregateRating */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Emilian Leber — Zauberer & Mentalist",
        "url": "https://www.magicel.de",
        "logo": "https://www.magicel.de/og-image.jpg",
        "email": "el@magicel.de",
        "telephone": "+4915563744696",
        "areaServed": ["DE", "Bayern", "Regensburg", "München", "Ingolstadt", "Würzburg"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "30",
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Jan von Lehmann" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "Es war einfach Mega. Alle Gäste begeistert.",
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Katrin Raß" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "Emilian ist der einzige Künstler, dem ich seit Jahren blind vertraue.",
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Martina Senftl" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "reviewBody": "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier.",
          },
        ],
      })}</script>

      {/* JSON-LD: BreadcrumbList */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.magicel.de/" },
          { "@type": "ListItem", "position": 2, "name": "Referenzen", "item": SITE_URL },
        ],
      })}</script>

      {/* JSON-LD: ItemList (3 Case-Studies) */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top-Case-Studies Zauberer Emilian Leber",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "VKB · Magic Camp · 200 Gäste · Nähe Ingolstadt",
            "description": "Workshop-Stationen + Bühnenshow für eine Versicherungs-Gruppe.",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "STRABAG · Weihnachtsfeier · 80 Gäste · Regensburg",
            "description": "Format-Anpassung von reiner Bühne zu Combo-Programm.",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "XXXLutz · Konzern-Event · ~250 Gäste · Würzburg",
            "description": "Tisch-zu-Tisch + Bühne mit eingebauten Insider-Pointen.",
          },
        ],
      })}</script>

      {/* JSON-LD: FAQPage */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      })}</script>
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee eyebrow="200+ Auftritte. Für." variant="cream" compact />
        <GrosseLogoCloud />
        <FilterSection />
        <StatsEditorialSection />
        <CaseStudiesSection />
        <BranchenListeSection />
        <StimmenSection />
        <VideoSection />
        <ZeitleisteSection />
        <PullQuoteSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Referenzen;
