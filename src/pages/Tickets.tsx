/** /tickets — Tickets & Termine (Voltage-Layout): aktuelle Events, Tour-Daten, Kategorien, Abendablauf, Venues, Newsletter. */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import {
  SubHero,
  Stats,
  FactsGrid,
  Steps,
  ReviewsBlock,
  FAQ,
  FinalCTA,
  SectionHeader,
  PullQuote,
} from "@/components/voltage/sections";
import { SplitFeature, InteractiveTabs } from "@/components/voltage/creative";
import {
  COBALT,
  MAGENTA,
  INK,
  WHITE,
  PAPER,
  L_LINE,
  L_DIM,
  CARD_LIGHT,
  up,
  stagger,
  vp,
} from "@/components/voltage/theme";
import {
  CustomQuizSection,
  CustomQuizConfig,
} from "@/components/landing/CustomQuiz";
import { captureEmail } from "@/lib/emailCapture";
import { subscribeNewsletter } from "@/lib/sendInquiry";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  Ticket,
  Clock,
  MapPin,
  Tv,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Mail,
  Send,
  Theater,
  Utensils,
  Users,
  Wine,
  Armchair,
} from "lucide-react";

import heroStageImg from "@/assets/audience-reactions.jpg";
import dinnerImg from "@/assets/magic-dinner-summer-poster.png";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import tabCloseup from "@/assets/hero-closeup.jpg";
import tabDinner from "@/assets/hero-dinner.jpg";
import tabStage from "@/assets/hero-stage.jpg";

const PREMIERE_LOCATION = "Alte Mälzerei Regensburg";
const PREMIERE_DATE = "22. Februar 2026";

/* ═══════════════════════════════════════════════════════════
   AKTUELLE EVENTS — Magic Dinner Summer Edition (Featured)
   ═══════════════════════════════════════════════════════════ */
const SUMMER_EDITION = {
  date: "11. Juli 2026",
  label: "Magic Dinner — Summer Edition",
  sub: "Terrasse + Innenbereich · Drei-Gänge optional",
  status: "Vorverkauf",
};

const MagicDinnerAbendeSection = () => {
  const SUMMER = SUMMER_EDITION;
  return (
    <motion.section
      id="events"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <SectionHeader
            eyebrow="Anstehende Events"
            title={
              <>
                Aktuelle <span style={{ color: COBALT }}>Termine</span>
                <span style={{ color: MAGENTA }}>.</span>
              </>
            }
            sub="Anstehende Veranstaltungen mit Reservierung oder Vorverkauf — Magic Dinner, Theater-Shows und Specials."
          />
        </motion.div>

        {/* XL Featured Card — Summer Edition */}
        <motion.div variants={up}>
          <Link
            to="/tickets/magic-dinner-summer-edition"
            className="group grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch rounded-[28px] p-5 md:p-7 transition-transform hover:scale-[1.005]"
            style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
          >
            <div className="lg:col-span-7">
              <div
                className="relative overflow-hidden rounded-[22px]"
                style={{
                  aspectRatio: "1/1",
                  background: "#2e5f6e",
                  maxHeight: "560px",
                }}
              >
                <img
                  src={dinnerImg}
                  alt="Magic Dinner Summer Edition · 11. Juli 2026 · Restaurant Wald & Wiese Sinzing — Poster"
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <span
                  className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold text-white"
                  style={{ background: COBALT }}
                >
                  {SUMMER.status}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col py-2">
              <p
                className="text-[12px] tracking-[0.16em] uppercase font-semibold mb-3"
                style={{ color: COBALT }}
              >
                11. Juli 2026 · ab 17:00 Uhr
              </p>
              <h3
                className="font-extrabold tracking-[-0.02em] leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem,2.4vw,2.2rem)", color: INK }}
              >
                Tisch reservieren.
                <br />
                <span style={{ color: COBALT }}>Magic Dinner erleben.</span>
              </h3>
              <p
                className="text-[15px] md:text-base leading-[1.65] mb-5"
                style={{ color: L_DIM }}
              >
                Sommerabend im Restaurant Wald & Wiese. Du reservierst deinen
                Tisch wie sonst auch, isst à la carte aus der Sommerkarte — und
                während des Abends besuche ich euch persönlich mit Close-Up-
                Magie. Drei Sekunden Stille, dann lacht eure Tafel.
              </p>
              <ul className="space-y-2.5 mb-7 text-[15px]" style={{ color: L_DIM }}>
                <li className="flex items-start gap-2.5">
                  <Utensils
                    className="w-4 h-4 mt-1 shrink-0"
                    style={{ color: COBALT }}
                  />
                  À la carte aus der Sommerkarte
                </li>
                <li className="flex items-start gap-2.5">
                  <Armchair
                    className="w-4 h-4 mt-1 shrink-0"
                    style={{ color: COBALT }}
                  />
                  Max. 50 Plätze · 2–12 pro Tafel
                </li>
                <li className="flex items-start gap-2.5">
                  <Wine
                    className="w-4 h-4 mt-1 shrink-0"
                    style={{ color: COBALT }}
                  />
                  Weinbegleitung optional
                </li>
              </ul>
              <span
                className="inline-flex items-center gap-2 self-start rounded-full px-7 py-3.5 text-[14px] font-semibold text-white mt-auto"
                style={{ background: COBALT }}
              >
                <Ticket className="w-4 h-4" />
                Details + Reservierung
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   AKTUELLE TOUR-SHOW — Premiere-Hinweis (Cobalt-Statement)
   ═══════════════════════════════════════════════════════════ */
const AktuelleTourShowSection = () => (
  <motion.section
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
    style={{ background: INK, color: WHITE }}
  >
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-x-14 gap-y-10 items-center">
      <motion.div variants={up} className="lg:col-span-7">
        <p
          className="text-[12px] tracking-[0.16em] uppercase font-semibold mb-5"
          style={{ color: "#9db0ff" }}
        >
          Tour 2026 · Premiere
        </p>
        <h2
          className="font-extrabold tracking-[-0.02em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)", color: WHITE }}
        >
          Plötzlich Magie —{" "}
          <span style={{ color: "#9db0ff" }}>Magic Meets Comedy.</span>
        </h2>
        <p
          className="mt-6 text-[16px] md:text-lg leading-[1.7] max-w-xl"
          style={{ color: "#d9d6e0" }}
        >
          Die erste abendfüllende Bühnenshow von Emilian Leber. 90 Minuten
          Mentalmagie, Karten-Routinen, Comedy-Pointen. Geschrieben für Theater-
          und Saalbühnen. Premiere am{" "}
          <strong style={{ color: WHITE }}>{PREMIERE_DATE}</strong> in der{" "}
          <strong style={{ color: WHITE }}>{PREMIERE_LOCATION}</strong> —
          anschließend Tour durch bayerische Theater bis 2027.
        </p>
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7 text-[15px]"
          style={{ color: "#d9d6e0" }}
        >
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: "#9db0ff" }} />
            90 Min · 1 Pause
          </span>
          <span aria-hidden style={{ color: "rgba(255,255,255,0.25)" }}>
            ·
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="w-4 h-4" style={{ color: "#9db0ff" }} />
            ab 12 Jahren
          </span>
          <span aria-hidden style={{ color: "rgba(255,255,255,0.25)" }}>
            ·
          </span>
          <span className="inline-flex items-center gap-2">
            <Theater className="w-4 h-4" style={{ color: "#9db0ff" }} />
            Theater- und Saalbühnen
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-9">
          <a
            href="#tour-daten"
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]"
            style={{ background: COBALT, color: WHITE }}
          >
            <Ticket className="w-4 h-4" />
            Tour-Termine
          </a>
          <Link
            to="/buchung?format=Tour-Show&anlass=Premiere"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold border-b pb-1 transition-colors"
            style={{ color: WHITE, borderColor: "rgba(255,255,255,0.3)" }}
          >
            Theater-Buchung anfragen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-[14px] mt-7 max-w-md" style={{ color: "#a7a2b0" }}>
          Tour-Premiere — Theater-Veranstalter und Pressevertreter bitte über{" "}
          <a
            href="mailto:el@magicel.de"
            className="underline"
            style={{ color: "#d9d6e0" }}
          >
            el@magicel.de
          </a>{" "}
          direkt anfragen.
        </p>
      </motion.div>

      {/* Premiere-Ticket-Mockup */}
      <motion.div variants={up} className="lg:col-span-5">
        <div
          className="group relative block aspect-[3/4] max-w-sm mx-auto overflow-hidden transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]"
          style={{
            borderRadius: "1.25rem",
            background: COBALT,
            boxShadow:
              "0 60px 120px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.12)",
          }}
        >
          <div className="absolute inset-x-0 top-0 p-6 flex items-center justify-between text-white/85">
            <span className="text-[10px] tracking-[0.22em] uppercase font-bold">
              MagicEL · Premiere
            </span>
            <span className="text-[15px] font-bold" style={{ color: "#cdd6ff" }}>
              N° 001
            </span>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <p
              className="text-[10px] tracking-[0.22em] uppercase font-bold mb-4"
              style={{ color: "#cdd6ff" }}
            >
              Plötzlich Magie · Magic Meets Comedy
            </p>
            <h3 className="font-extrabold text-3xl md:text-4xl text-white leading-[1.05] mb-3">
              22.02
              <br />
              <span style={{ color: "#cdd6ff" }}>2026.</span>
            </h3>
            <p className="text-[14px] text-white/80 max-w-[18ch] leading-snug mb-5">
              Alte Mälzerei Regensburg · Einlass 19:00
            </p>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: WHITE,
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <Sparkles className="w-3 h-3" />
              Vorverkauf läuft
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white/75">
            <span className="text-[10px] tracking-[0.18em] uppercase font-bold">
              Premiere · Tour 2026
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-bold text-white">
              <Ticket className="w-3.5 h-3.5" />
              N° 001
            </span>
          </div>

          {/* Perforations-Linie als Ticket-Detail */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 6px, transparent 6px 12px)",
            }}
          />
        </div>
      </motion.div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   TOUR-DATEN — Magazin-Liste mit Status-Badges
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
    bg: COBALT,
    color: "#ffffff",
  },
  Restkarten: {
    bg: COBALT,
    color: "#ffffff",
  },
  Ausverkauft: {
    bg: "transparent",
    color: "rgba(10,11,15,0.55)",
    border: "1px solid rgba(10,11,15,0.18)",
  },
  Demnächst: {
    bg: "transparent",
    color: COBALT,
    border: `1px solid ${COBALT}40`,
  },
};

const TourDatenSection = () => (
  <motion.section
    id="tour-daten"
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
    style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
  >
    <div className="max-w-7xl mx-auto">
      <motion.div variants={up}>
        <SectionHeader
          eyebrow="Tour-Plan · 2026/2027"
          title={
            <>
              Bayern, <span style={{ color: COBALT }}>Stadt für Stadt</span>.
            </>
          }
          sub="Acht bestätigte Termine ab Februar 2026 — von der Premiere in der Alten Mälzerei bis zum Jubiläum 2027. Frühbucher bekommen die besten Plätze. Tickets pro Stadt direkt über die jeweilige Spielstätte."
        />
      </motion.div>

      <div className="mt-12 max-w-5xl border-t" style={{ borderColor: L_LINE }}>
        {TOUR_DATES.map((t) => {
          const style = STATUS_STYLES[t.status];
          const disabled =
            t.status === "Ausverkauft" || t.status === "Demnächst";
          return (
            <motion.article
              variants={up}
              key={`${t.city}-${t.date}`}
              className="group grid md:grid-cols-[200px_1fr_auto] gap-x-8 gap-y-3 py-8 md:py-10 border-b items-baseline"
              style={{ borderColor: L_LINE }}
            >
              <div>
                <span
                  className="text-lg md:text-xl font-bold block leading-tight"
                  style={{ color: COBALT }}
                >
                  {t.date}
                </span>
                <span
                  className="text-[10px] tracking-[0.18em] uppercase font-bold mt-1.5 inline-block"
                  style={{ color: L_DIM }}
                >
                  {t.kicker}
                </span>
              </div>
              <div>
                <h3
                  className="text-xl md:text-2xl font-bold leading-snug mb-2"
                  style={{ color: INK }}
                >
                  {t.city}
                  <span style={{ color: L_DIM }}> · </span>
                  <span style={{ color: "#3a3833" }}>{t.venue}</span>
                </h3>
                <p
                  className="text-[15px] leading-[1.65] max-w-2xl mb-4"
                  style={{ color: L_DIM }}
                >
                  {t.body}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {!disabled ? (
                    <Link
                      to={`/buchung?format=Ticket&anlass=${encodeURIComponent(t.city)}&datum=${encodeURIComponent(t.date)}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold border-b pb-0.5 transition-colors"
                      style={{ color: COBALT, borderColor: `${COBALT}40` }}
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      Ticket sichern
                    </Link>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold border-b pb-0.5"
                      style={{ color: L_DIM, borderColor: L_LINE }}
                    >
                      {t.status === "Demnächst"
                        ? "Vorverkauf folgt"
                        : "Ausverkauft"}
                    </span>
                  )}
                  <span aria-hidden style={{ color: "rgba(10,11,15,0.25)" }}>
                    ·
                  </span>
                  <a
                    href="#newsletter"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold border-b pb-0.5 transition-colors"
                    style={{ color: L_DIM, borderColor: L_LINE }}
                  >
                    Termin merken
                    <ArrowRight className="w-3.5 h-3.5" />
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
            </motion.article>
          );
        })}
      </div>

      <p className="text-[14px] mt-10 max-w-2xl" style={{ color: L_DIM }}>
        Stand {PREMIERE_DATE.split(".")[0]}. Mai 2026 · Termine ohne Gewähr ·
        Vorverkaufs-Tickets über die jeweilige Spielstätte oder direkt über{" "}
        <a
          href="mailto:el@magicel.de"
          className="underline"
          style={{ color: INK }}
        >
          el@magicel.de
        </a>
        .
      </p>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   TICKET-KATEGORIEN — drei Sitzplatz-Zonen
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

const TicketKategorienSection = () => (
  <motion.section
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
  >
    <div className="max-w-7xl mx-auto">
      <motion.div variants={up}>
        <SectionHeader
          eyebrow="Sitzplatz-Kategorien"
          title={
            <>
              Drei Zonen. <span style={{ color: COBALT }}>Eine Show.</span>
            </>
          }
          sub="Jeder Tour-Stopp arbeitet mit eigenem Saal-Plan und eigener Preisstruktur — die Kategorien selbst bleiben gleich. Konkrete Preise pro Spielstätte direkt im Vorverkauf der jeweiligen Bühne."
        />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5 mt-10">
        {/* Card 01 — Frühbucher */}
        <motion.article
          variants={up}
          className="relative p-7 md:p-8 flex flex-col rounded-[24px]"
          style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-3xl font-extrabold leading-none"
              style={{ color: COBALT }}
            >
              {CATEGORIES[0].no}
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: L_DIM }}
            >
              Last-Minute-Zone
            </span>
          </div>
          <h3
            className="text-2xl font-bold leading-snug mb-3"
            style={{ color: INK }}
          >
            {CATEGORIES[0].label}
          </h3>
          <p
            className="text-[12px] uppercase tracking-[0.14em] font-semibold mb-5"
            style={{ color: L_DIM }}
          >
            {CATEGORIES[0].sub}
          </p>
          <p
            className="text-[15px] leading-[1.65] mb-auto"
            style={{ color: L_DIM }}
          >
            {CATEGORIES[0].body}
          </p>
          <p
            className="text-[11px] tracking-[0.14em] uppercase font-bold mt-6 pt-5 border-t"
            style={{ color: L_DIM, borderColor: L_LINE }}
          >
            {CATEGORIES[0].note}
          </p>
        </motion.article>

        {/* Card 02 — Standard (Cobalt-Highlight) */}
        <motion.article
          variants={up}
          className="relative p-7 md:p-8 flex flex-col rounded-[24px] overflow-hidden"
          style={{ background: COBALT, color: WHITE }}
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-3xl font-extrabold leading-none"
              style={{ color: "#cdd6ff" }}
            >
              {CATEGORIES[1].no}
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: "#cdd6ff" }}
            >
              Hauptkontingent
            </span>
          </div>
          <h3 className="text-2xl font-bold leading-snug mb-3">
            {CATEGORIES[1].label}
          </h3>
          <p className="text-[15px] mb-5" style={{ color: "rgba(255,255,255,0.78)" }}>
            {CATEGORIES[1].sub}
          </p>
          <p
            className="text-[15px] leading-[1.65] mb-auto"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            {CATEGORIES[1].body}
          </p>
          <p
            className="text-[11px] tracking-[0.14em] uppercase font-bold mt-6 pt-5 border-t"
            style={{ color: "#cdd6ff", borderColor: "rgba(255,255,255,0.2)" }}
          >
            {CATEGORIES[1].note}
          </p>
        </motion.article>

        {/* Card 03 — Premium */}
        <motion.article
          variants={up}
          className="relative p-7 md:p-8 flex flex-col rounded-[24px]"
          style={{ background: INK, color: WHITE }}
        >
          <div className="flex items-baseline gap-3 mb-6">
            <span
              className="text-3xl font-extrabold leading-none"
              style={{ color: "#9db0ff" }}
            >
              {CATEGORIES[2].no}
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-bold"
              style={{ color: "#9db0ff" }}
            >
              Front-Reihe
            </span>
          </div>
          <h3 className="text-2xl font-bold leading-snug mb-3">
            {CATEGORIES[2].label}
          </h3>
          <p className="text-[15px] mb-4" style={{ color: "#d9d6e0" }}>
            {CATEGORIES[2].sub}
          </p>
          <p
            className="text-[15px] leading-[1.6] mb-auto"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {CATEGORIES[2].body}
          </p>
          <p
            className="text-[11px] tracking-[0.14em] uppercase font-bold mt-6 pt-5 border-t"
            style={{ color: "#9db0ff", borderColor: "rgba(255,255,255,0.18)" }}
          >
            {CATEGORIES[2].note}
          </p>
        </motion.article>
      </div>

      <p className="text-[14px] mt-10 max-w-2xl" style={{ color: L_DIM }}>
        Preis je Tour-Stopp · jeweilige Spielstätte legt Kontingent und Endpreis
        fest · Sammelbuchungen ab 8 Personen direkt anfragen.
      </p>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   WAS ERWARTET DICH — 4 Akte über Steps + Sticky-Foto via SplitFeature
   ═══════════════════════════════════════════════════════════ */
const ABENDABLAUF = [
  {
    t: "19:00 · Einlass und Aperitif.",
    d: "Türen auf, freie Platzwahl in der gebuchten Kategorie. Ein Getränk an der Foyer-Bar, kurze Programm-Karte in der Hand. Im Saal läuft leise warmes Klavier — keine Lobby-Musik, sondern Vorbereitung.",
  },
  {
    t: "19:45 · Block I — Hook und Mentalmagie.",
    d: "Lichter runter, Spotlight auf. Erste 45 Minuten: drei Mentaleffekte mit Publikumsbeteiligung, eine längere Karten-Routine, mehrere Comedy-Pointen aus dem Stand. Pause mit drei Sekunden Stille nach dem ersten Wow.",
  },
  {
    t: "20:35 · Pause · 20 Minuten.",
    d: "Foyer öffnet wieder, Getränke nachfüllen. Im Saal bleibt eine Karte auf der Bühne liegen — manche merken erst nach der Pause, dass das schon Teil des nächsten Tricks war.",
  },
];

const WasErwartetDichSection = () => (
  <>
    <SplitFeature
      eyebrow="Der Abend · 90 Min in vier Akten"
      title={
        <>
          Was dich <span style={{ color: COBALT }}>erwartet</span>.
        </>
      }
      sub="Eine durchkomponierte Show — keine zusammengewürfelten Tricks, sondern dramaturgisch verbundene Akte mit Aufbau, Pause und Climax. Standing Ovation bei 90 % der Shows."
      points={[
        "Block I — Hook, Mentalmagie und Karten-Routine (45 Min)",
        "Pause mit drei Sekunden Stille nach dem ersten Wow",
        "Block II — Climax, Encore-Routine und Standing-Ovation-Finale",
      ]}
      image={buehneZuschauerImg}
      imageAlt="Standing Ovation am Ende einer Bühnenshow von Emilian Leber"
      imgPos="top"
      stat={{ v: "90 %", l: "Standing Ovation" }}
    />
    <Steps
      eyebrow="So läuft der Abend"
      title={
        <>
          90 Minuten in <span style={{ color: COBALT }}>vier Akten</span>.
        </>
      }
      sub="Aufbau, Pause und Climax — durchkomponiert vom Einlass bis zur Verbeugung. So sieht ein Abend ungefähr aus."
      items={ABENDABLAUF}
    />
  </>
);

/* ═══════════════════════════════════════════════════════════
   LOCATIONS — Spielstätten der Tour
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

const LocationsSection = () => (
  <motion.section
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
    style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
  >
    <div className="max-w-7xl mx-auto">
      <motion.div variants={up}>
        <SectionHeader
          eyebrow="Spielstätten · Tour 2026"
          title={
            <>
              Sechs Bühnen, <span style={{ color: COBALT }}>eine Show</span>.
            </>
          }
          sub="Jede Spielstätte mit eigener Atmosphäre — Industriekulisse, Wirtshaus, Theater, Kabarett-Bühne. Die Show passt sich an, der Spannungsbogen bleibt."
        />
      </motion.div>

      <div className="grid md:grid-cols-12 gap-5 mt-10">
        {VENUES.map((v, i) => {
          const isHero = v.accent;
          return (
            <motion.article
              variants={up}
              key={v.name}
              className={`${isHero ? "md:col-span-8 lg:col-span-7" : "md:col-span-4"} ${i === 1 ? "lg:col-span-5" : ""} relative p-7 md:p-8 rounded-[24px]`}
              style={{
                background: isHero ? INK : WHITE,
                color: isHero ? WHITE : undefined,
                border: `1px solid ${isHero ? "rgba(255,255,255,0.1)" : L_LINE}`,
                minHeight: isHero ? 280 : 220,
              }}
            >
              <div className="flex items-baseline gap-3 mb-5">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: isHero ? "#9db0ff" : COBALT }}
                />
                <span
                  className="text-[10px] tracking-[0.18em] uppercase font-bold"
                  style={{ color: isHero ? "#9db0ff" : COBALT }}
                >
                  {v.city}
                </span>
              </div>
              <h3
                className={`${isHero ? "text-2xl md:text-3xl" : "text-xl"} font-bold leading-snug mb-2`}
                style={{ color: isHero ? WHITE : INK }}
              >
                {v.name}
              </h3>
              <p
                className="text-[14px] mb-4"
                style={{ color: isHero ? "rgba(255,255,255,0.65)" : L_DIM }}
              >
                {v.type}
              </p>
              <p
                className="text-[14px] leading-[1.65]"
                style={{ color: isHero ? "rgba(255,255,255,0.82)" : L_DIM }}
              >
                {v.body}
              </p>
            </motion.article>
          );
        })}
      </div>

      <p className="text-[14px] mt-10 max-w-2xl" style={{ color: L_DIM }}>
        Weitere Spielstätten für Herbst 2026 und 2027 in Planung — neue
        Tour-Daten zuerst über den Newsletter.
      </p>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   VIDEO-SECTION TVA
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => (
  <motion.section
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
  >
    <div className="max-w-7xl mx-auto">
      <motion.div variants={up}>
        <SectionHeader
          eyebrow="Showreel · TVA-Mitschnitt 2025"
          title={
            <>
              Sieh dir an,{" "}
              <span style={{ color: COBALT }}>worauf du dich freust</span>.
            </>
          }
          sub="TVA Bayern hat 2025 eine komplette Show-Routine im Studio aufgenommen — Live-Karten-Test mit dem Moderator, Mentaleffekt mit Studio-Publikum. Der Mitschnitt zeigt, was bei einer Bühnenshow auf dich zukommt."
        />
      </motion.div>

      <motion.div
        variants={up}
        className="relative max-w-6xl mx-auto mt-10"
        style={{
          borderRadius: "1.5rem",
          overflow: "hidden",
          boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)",
        }}
      >
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1`}
            title="TVA TV-Interview 2025 — Emilian Leber, Showreel-Einblick"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        </div>
      </motion.div>

      <div
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-[14px]"
        style={{ color: L_DIM }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Tv className="w-3.5 h-3.5" style={{ color: COBALT }} />
          TVA Bayern
        </span>
        <span aria-hidden style={{ color: "rgba(10,11,15,0.25)" }}>
          ·
        </span>
        <span>2025 · mit 16 Jahren</span>
        <span aria-hidden style={{ color: "rgba(10,11,15,0.25)" }}>
          ·
        </span>
        <span>Komplett-Mitschnitt</span>
      </div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   FAQ — Ticket-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Wie funktioniert die Magic-Dinner-Reservierung?",
    a: "Du reservierst direkt beim Restaurant Wald & Wiese — per Telefon, E-Mail oder Online-Formular auf der Detail-Seite. Das Restaurant gibt mir die Tisch-Liste am Abend, ich besuche euch dann persönlich am Tisch zwischen den Gängen.",
  },
  {
    q: "Was kostet das Magic Dinner?",
    a: "Du isst à la carte aus der regulären Karte des Restaurants — keine festen Menüpreise. Die Magic-Performance am Tisch ist im Restaurant-Erlebnis enthalten, kein zusätzlicher Eintritt.",
  },
  {
    q: "Wie viele Plätze gibt es?",
    a: "Max. 50 Plätze pro Magic-Dinner-Abend, 2–12 Personen pro Tafel. Da das ein gemütlicher Restaurant-Abend ist, lohnt sich frühe Reservierung — die Termine sind schnell ausgebucht.",
  },
  {
    q: "Kann ich Allergien oder Diät-Wünsche angeben?",
    a: "Klar. Bei der Reservierung beim Restaurant angeben — Wald & Wiese hat vegetarische und vegane Alternativen, fragt aktiv nach Allergien. Bei der Magic-Performance werden keine Lebensmittel verwendet.",
  },
  {
    q: "Wie lange dauert der Abend?",
    a: "Ankunft ab 17:00 Uhr. Du isst in eurem Tempo aus der Karte, während des Abends besuche ich jede Tafel mit Close-Up-Magie. Üblicherweise endet das Ganze gegen 22:00–23:00 Uhr — kein festes Programm, kein Hetzen.",
  },
  {
    q: "Geburtstag oder Anlass im Tisch — was kann ich vorab sagen?",
    a: "Bei der Reservierung mit Anlass und Namen melden — eine kleine personalisierte Routine während des Abends ist möglich, bleibt aber Überraschung. Bei Wünschen einfach el@magicel.de.",
  },
  {
    q: "Was wenn ich nicht kommen kann?",
    a: "Stornierung läuft über das Restaurant nach deren AGB. Bei kurzfristigem Ausfall einfach melden — wir finden eine Lösung. Tisch übertragen geht problemlos.",
  },
];

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER-CTA — Email-Capture für neue Tour-Daten (Logik unverändert)
   ═══════════════════════════════════════════════════════════ */
const NewsletterCTASection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes("@") || email.length < 5) {
      setError("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    captureEmail(email, "tickets-newsletter");
    try {
      await subscribeNewsletter({
        email,
        source: "tickets-newsletter",
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Anmeldung fehlgeschlagen: ${err.message}`
          : "Anmeldung fehlgeschlagen. Bitte später erneut versuchen.",
      );
    }
  };

  return (
    <motion.section
      id="newsletter"
      variants={up}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="relative grid md:grid-cols-[1.4fr_1fr] gap-x-12 gap-y-10 p-8 md:p-12 lg:p-14 overflow-hidden rounded-[28px]"
          style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}`, boxShadow: "0 40px 80px -34px rgba(10,11,15,0.25)" }}
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-16 w-[360px] h-[360px] rounded-full"
            style={{ background: `radial-gradient(circle, ${COBALT}1f, transparent 62%)` }}
          />

          <div className="relative">
            <p
              className="flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-4"
              style={{ color: L_DIM }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
              Event-Newsletter · alle 4–8 Wochen
            </p>
            <h2
              className="font-extrabold tracking-[-0.02em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(1.75rem,3.8vw,3rem)", color: INK }}
            >
              Sei der erste bei{" "}
              <span style={{ color: COBALT }}>neuen Terminen.</span>
            </h2>
            <p
              className="text-[16px] md:text-lg leading-[1.7] max-w-md"
              style={{ color: L_DIM }}
            >
              Neue Magic-Dinner-Abende und Specials — bevor sie öffentlich
              angekündigt werden. Kurze Mails, kein Spam, jederzeit
              abbestellbar.
            </p>
          </div>

          <div className="relative">
            {!submitted ? (
              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                  <span
                    className="text-[11px] tracking-[0.18em] uppercase font-bold mb-2 block"
                    style={{ color: L_DIM }}
                  >
                    Deine E-Mail-Adresse
                  </span>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: L_DIM }}
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
                      className="w-full pl-11 pr-4 py-4 text-base bg-white rounded-full border focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        color: INK,
                        borderColor: L_LINE,
                        ["--tw-ring-color" as never]: `${COBALT}26`,
                      }}
                    />
                  </div>
                </label>
                {error && (
                  <p
                    className="text-sm flex items-center gap-2"
                    style={{ color: COBALT }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ background: COBALT }}
                >
                  <Send className="w-4 h-4" />
                  Anmelden
                </button>
                <p className="text-[12px] leading-relaxed" style={{ color: L_DIM }}>
                  Mit dem Anmelden bestätigst du, die Datenschutz-Hinweise
                  gelesen zu haben. Abmeldung in jeder E-Mail per einem Klick.
                </p>
              </form>
            ) : (
              <div
                className="p-6 rounded-2xl flex items-start gap-4"
                style={{
                  background: `${COBALT}0f`,
                  border: `1px solid ${COBALT}30`,
                }}
              >
                <CheckCircle2
                  className="w-6 h-6 shrink-0 mt-0.5"
                  style={{ color: COBALT }}
                />
                <div>
                  <p
                    className="font-bold text-base mb-1.5"
                    style={{ color: INK }}
                  >
                    Eingetragen. Danke.
                  </p>
                  <p className="text-sm leading-snug" style={{ color: L_DIM }}>
                    Du bekommst die nächste Mail mit neuen Magic-Dinner-Terminen
                    — meistens 4–8 Wochen Vorlauf.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   CUSTOM QUIZ — Ticket-Format-Finder (Config unverändert)
   ═══════════════════════════════════════════════════════════ */
const ticketsQuizConfig: CustomQuizConfig = {
  anlass: "Ticket",
  sectionEyebrow: "Format-Finder · Tickets",
  sectionTitle: (
    <>
      Tour-Show oder{" "}
      <span style={{ color: COBALT }}>Magic Dinner?</span>
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
   JSON-LD — BreadcrumbList + Person + Event (Magic Dinner Summer Edition)
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/tickets";

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
    {
      "@type": "Event",
      name: "Magic Dinner — Summer Edition",
      description:
        "Magic Dinner Summer Edition am 11. Juli 2026 ab 17:00 Uhr im Restaurant Wald & Wiese Sinzing. Tisch reservieren, à la carte essen, Close-Up-Magie am Tisch von Emilian Leber.",
      startDate: "2026-07-11T17:00:00+02:00",
      endDate: "2026-07-11T23:00:00+02:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: ["https://www.magicel.de/og-image.jpg"],
      url: "https://www.magicel.de/tickets/magic-dinner-summer-edition",
      location: {
        "@type": "Place",
        name: "Restaurant Wald & Wiese",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bruckdorfer Straße 42",
          postalCode: "93161",
          addressLocality: "Sinzing",
          addressRegion: "Bayern",
          addressCountry: "DE",
        },
        url: "https://restaurant-waldwiese.de",
      },
      performer: {
        "@type": "Person",
        name: "Emilian Leber",
        url: "https://www.magicel.de",
      },
      organizer: [
        {
          "@type": "Organization",
          name: "Restaurant Wald & Wiese",
          url: "https://restaurant-waldwiese.de",
        },
        {
          "@type": "Person",
          name: "Emilian Leber",
          url: "https://www.magicel.de",
        },
      ],
      offers: {
        "@type": "Offer",
        url: "https://www.magicel.de/tickets/magic-dinner-summer-edition",
        availability: "https://schema.org/InStock",
        priceCurrency: "EUR",
        price: "0",
        description:
          "Reservierung kostenlos. Verzehr à la carte aus der Restaurantkarte.",
        validFrom: "2026-04-01T00:00:00+02:00",
      },
    },
  ],
};

/* ═══════════════════════════════════════════════════════════ */
const Tickets = () => (
  <VoltageShell
    title="Tickets & Termine — Magic Dinner Summer Edition | Emilian Leber"
    description="Aktuelle Tickets & Termine — Magic Dinner Summer Edition am 11.07.2026 im Restaurant Wald & Wiese in Sinzing bei Regensburg. Reservierung beim Restaurant."
    path="/tickets"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Tickets Emilian Leber, Magic Dinner Tickets, Magic Dinner Summer Edition, Wald und Wiese Sinzing, Zaubershow Karten Bayern, Magier Tickets Regensburg"
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Tickets & Termine — Magic Dinner Summer Edition | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="Magic Dinner Summer Edition 11.07.2026 · Wald & Wiese Sinzing. À la carte + Close-Up-Magie am Tisch."
      />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>

    <SubHero
      eyebrow="Tickets & Termine"
      title={
        <>
          Tickets <span style={{ color: COBALT }}>& Termine</span>
          <span style={{ color: MAGENTA }}>.</span>
        </>
      }
      sub="Anstehende Veranstaltungen mit Reservierung oder Vorverkauf — Magic Dinner, Theater-Shows und Specials. Aktuelle Liste unten."
      image={heroStageImg}
      imageAlt="Tickets & Termine — anstehende Shows mit Emilian Leber"
      imgPos="top"
      badge="Summer Edition · 11.07.2026 · Vorverkauf läuft"
      primary={{ label: "Aktuelle Events", href: "#events" }}
      secondary={{ label: "Private Buchung", href: "/buchung" }}
    />

    <Stats
      items={[
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "8", l: "bestätigte Tour-Termine" },
        { v: "90 Min", l: "abendfüllende Show" },
        { v: "200+", l: "Events seit 2016" },
      ]}
    />

    <MagicDinnerAbendeSection />

    <AktuelleTourShowSection />

    <TourDatenSection />

    <TicketKategorienSection />

    <FactsGrid
      items={[
        { Icon: Clock, k: "Dauer", v: "90 Min · 1 Pause" },
        { Icon: Users, k: "Ab", v: "12 Jahren" },
        { Icon: Theater, k: "Bühne", v: "Theater- und Saalbühnen" },
        { Icon: Ticket, k: "Vorverkauf", v: "über die Spielstätte" },
      ]}
    />

    <WasErwartetDichSection />

    <InteractiveTabs
      eyebrow="Drei Formate"
      title={
        <>
          Worauf du dich <span style={{ color: COBALT }}>freuen</span> kannst.
        </>
      }
      tabs={[
        {
          t: "Close-Up am Tisch",
          d: "Beim Magic Dinner besuche ich euch persönlich am Tisch — Karten und kleine Wunder direkt in euren Händen, zwischen den Gängen.",
          img: tabCloseup,
          pos: "center",
        },
        {
          t: "Magic Dinner",
          d: "À la carte aus der Sommerkarte im Restaurant Wald & Wiese, dazu Close-Up-Magie an jeder Tafel. Max. 50 Plätze pro Abend.",
          img: tabDinner,
          pos: "center",
        },
        {
          t: "Tour-Show auf der Bühne",
          d: "90 Minuten Mentalmagie und Comedy als abendfüllende Bühnenshow — Premiere in der Alten Mälzerei, dann Tour durch bayerische Theater.",
          img: tabStage,
          pos: "center",
        },
      ]}
    />

    <PullQuote
      text="Drei Sekunden Stille. Dann lacht der ganze Saal."
      name="Tour-Premiere"
      role="Plötzlich Magie · Magic Meets Comedy"
    />

    <LocationsSection />

    <VideoSection />

    <ReviewsBlock paper />

    <NewsletterCTASection />

    <CustomQuizSection config={ticketsQuizConfig} />

    <FAQ
      eyebrow="Bevor du buchst"
      title="Häufige Ticket-Fragen."
      items={FAQS.map((f) => ({ q: f.q, a: f.a }))}
    />

    <FinalCTA
      title={
        <>
          Tour-Ticket oder eigene Show
          <span style={{ color: MAGENTA }}>.</span>
        </>
      }
      sub="Wenn keine Tour-Stadt in deiner Nähe ist oder du eine private Show planst — schreib mir direkt. Antwort innerhalb von 24 Stunden, deutschlandweit verfügbar."
    />
  </VoltageShell>
);

export default Tickets;
