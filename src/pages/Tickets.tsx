/** /tickets — Tickets & Termine (Voltage-Layout): anstehende Events aus src/data/events.ts, Formate, Showreel. */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import {
  SubHero,
  Stats,
  ReviewsBlock,
  FAQ,
  FinalCTA,
  SectionHeader,
} from "@/components/voltage/sections";
import { InteractiveTabs } from "@/components/voltage/creative";
import {
  COBALT,
  MAGENTA,
  INK,
  PAPER,
  L_LINE,
  L_DIM,
  CARD_LIGHT,
  up,
  stagger,
  vp,
} from "@/components/voltage/theme";
import { TVA_VIDEO_ID } from "@/lib/videos";
import { ArrowRight, Tv } from "lucide-react";
import { EventCard, EventVideo } from "@/components/events/EventBits";
import { upcomingEvents } from "@/data/events";

import plakatImg from "@/assets/magic-dinner-2027-plakat.webp";
import plakatHochImg from "@/assets/magic-dinner-2027-plakat-hoch.webp";
import heroStageImg from "@/assets/audience-reactions-1200.webp";
import tabCloseup from "@/assets/hero-closeup-1200.webp";
import tabDinner from "@/assets/hero-dinner-1200.webp";
import tabStage from "@/assets/hero-stage-1200.webp";

/* ═══════════════════════════════════════════════════════════
   ANSTEHENDE EVENTS — aus src/data/events.ts; leer → Leer-Zustand
   ═══════════════════════════════════════════════════════════ */
const EventsSection = () => {
  const events = upcomingEvents();
  return (
    <motion.section
      id="events"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{
        background: PAPER,
        borderTop: `1px solid ${L_LINE}`,
        borderBottom: `1px solid ${L_LINE}`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <SectionHeader
            eyebrow="Anstehende Events"
            title={
              events.length ? (
                <>
                  Nächster <span style={{ color: COBALT }}>Termin</span>
                  <span style={{ color: MAGENTA }}>.</span>
                </>
              ) : (
                <>
                  Aktuell <span style={{ color: COBALT }}>keine Termine</span>
                  <span style={{ color: MAGENTA }}>.</span>
                </>
              )
            }
            sub={
              events.length
                ? "Öffentliche Abende mit Emilian Leber — Tickets direkt online."
                : "Es stehen derzeit keine öffentlichen Veranstaltungen an. Sobald wieder ein Abend feststeht, steht er hier."
            }
          />
        </motion.div>

        {events.length ? (
          <div className="space-y-8">
            {events.map((e) => (
              <EventCard key={e.slug} event={e} image={plakatImg} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={up}
            className="rounded-[28px] p-8 md:p-12 lg:p-14 max-w-4xl"
            style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
          >
            <h3
              className="font-extrabold tracking-[-0.02em] leading-tight mb-5"
              style={{ fontSize: "clamp(1.6rem,2.4vw,2.2rem)", color: INK }}
            >
              Gerade gibt es nichts zu buchen.
            </h3>
            <p
              className="text-[16px] md:text-lg leading-[1.7] max-w-2xl mb-8"
              style={{ color: L_DIM }}
            >
              Für eine eigene Show zu deinem Anlass kannst du mich jederzeit
              direkt anfragen.
            </p>
            <Link
              to="/buchung"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold border-b pb-1 transition-colors"
              style={{ color: INK, borderColor: L_LINE }}
            >
              Private Show anfragen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

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
   FAQ — Ticket-spezifisch. Event-Fakten kommen aus events.ts.
   JSON-LD (Event, FAQPage) schreibt der Prerender (seo-content.mjs).
   ═══════════════════════════════════════════════════════════ */
const baseFaqs = [
  {
    q: "Kann ich Emilian trotzdem privat buchen?",
    a: "Ja. Private und geschäftliche Buchungen sind unabhängig von öffentlichen Terminen jederzeit möglich — Hochzeit, Firmenfeier, Geburtstag oder eigener Show-Abend. Anfrage über das Buchungsformular oder direkt an el@magicel.de.",
  },
  {
    q: "Wie schnell kommt eine Antwort auf eine Anfrage?",
    a: "In der Regel innerhalb von 24 Stunden — mit Rückfragen zum Anlass, zur Location und zum Ablauf, danach ein konkretes Angebot.",
  },
];

const ticketFaqs = () => {
  const next = upcomingEvents()[0];
  if (!next) {
    return [
      {
        q: "Wann gibt es wieder Termine?",
        a: "Aktuell sind keine öffentlichen Veranstaltungen geplant. Neue Termine werden hier auf dieser Seite veröffentlicht.",
      },
      ...baseFaqs,
    ];
  }
  return [
    {
      q: "Wann ist der nächste öffentliche Termin?",
      a: `${next.name}: ${next.dateLabel} im ${next.venue.name}, ${next.venue.street}, ${next.venue.postalCode} ${next.venue.city}. Einlass ${next.doorLabel}, Beginn ${next.startLabel}.`,
    },
    {
      q: "Was kostet ein Ticket?",
      a: `${next.priceLabel} pro Person — ${next.priceIncludes}.`,
    },
    {
      q: "Wo und ab wann gibt es Tickets?",
      a: `Online bei ${next.ticketProvider}. Der Vorverkauf startet am ${next.salesStartLabel}.`,
    },
    ...baseFaqs,
  ];
};

/* ═══════════════════════════════════════════════════════════ */
const Tickets = () => {
  const next = upcomingEvents()[0];
  return (
    <VoltageShell
      title="Tickets & Termine | Emilian Leber"
      description="Öffentliche Termine von Zauberkünstler Emilian Leber — Tickets direkt online."
      path="/tickets"
      image={next ? next.images.wide : undefined}
      noindex={false}
    >
      <SubHero
        eyebrow="Tickets & Termine"
        title={
          <>
            Tickets <span style={{ color: COBALT }}>& Termine</span>
            <span style={{ color: MAGENTA }}>.</span>
          </>
        }
        sub={
          next
            ? `Nächster Abend: Magic Dinner am ${next.dateLabel} im ${next.venue.name}, ${next.venue.regionHint} — ${next.priceIncludes} für ${next.priceLabel} pro Person.`
            : "Aktuell stehen keine öffentlichen Veranstaltungen an. Neue Termine erscheinen zuerst hier."
        }
        image={next ? plakatHochImg : heroStageImg}
        imageAlt={next ? `Plakat Magic Dinner ${next.weekdayShort}, Wald & Wiese Sinzing` : "Tickets & Termine — Shows mit Emilian Leber"}
        imgPos={next ? "center" : "top"}
        badge={next ? `${next.weekdayShort} · Einlass ${next.doorLabel}` : "Aktuell keine Termine · neue Daten folgen"}
        primary={next ? { label: "Zum Magic Dinner", href: next.path } : { label: "Private Buchung", href: "/buchung" }}
        secondary={next ? { label: "Private Buchung", href: "/buchung" } : undefined}
      />

      <Stats
        items={[
          { v: "4,8★", l: "16 Google-Rezensionen" },
          next ? { v: next.weekdayShort.replace(/^Sa (\d\d\.\d\d\.)\d{4}$/, "$1"), l: `Magic Dinner ${new Date(next.startDate).getFullYear()}` } : { v: "0", l: "Termine im Vorverkauf" },
          { v: "200+", l: "Events seit 2016" },
          { v: "24 h", l: "Antwort auf Anfragen" },
        ]}
      />

      <EventsSection />

      {next && (
        <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={up} className="max-w-3xl">
              <SectionHeader
                eyebrow="Trailer · Magic Dinner"
                title={<>42 Sekunden <span style={{ color: COBALT }}>Vorgeschmack</span>.</>}
                sub="Live. Hautnah. Unvergesslich. — so fühlt sich ein Abend im Wald & Wiese an."
              />
            </motion.div>
            <motion.div variants={up} className="mt-10 max-w-6xl mx-auto">
              <EventVideo event={next} />
            </motion.div>
          </div>
        </motion.section>
      )}

      <InteractiveTabs
        eyebrow="Formate"
        title={
          <>
            Diese <span style={{ color: COBALT }}>Formate</span> gibt es.
          </>
        }
        tabs={[
          {
            t: "Close-Up am Tisch",
            d: "Magie direkt in euren Händen — Karten und kleine Wunder am Tisch, mitten in der Runde.",
            img: tabCloseup,
            pos: "center",
          },
          {
            t: "Dinner-Format",
            d: next
              ? `Ein Restaurant-Abend mit Close-Up-Magie zwischen den Gängen — öffentlich am ${next.weekdayShort} im Wald & Wiese, privat jederzeit buchbar.`
              : "Ein Restaurant-Abend mit Close-Up-Magie an jeder Tafel — als Format buchbar, derzeit ohne öffentlichen Termin.",
            img: tabDinner,
            pos: "center",
          },
          {
            t: "Show auf der Bühne",
            d: "90 Minuten Mentalmagie und Comedy als abendfüllende Bühnenshow für Theater- und Saalbühnen.",
            img: tabStage,
            pos: "center",
          },
        ]}
      />

      <VideoSection />

      <ReviewsBlock paper />

      <FAQ eyebrow="Bevor du fragst" title="Häufige Ticket-Fragen." items={ticketFaqs()} />

      <FinalCTA
        title={
          <>
            Lieber eine eigene Show<span style={{ color: MAGENTA }}>?</span>
          </>
        }
        sub="Private und geschäftliche Buchungen sind jederzeit möglich. Schreib mir direkt — Antwort innerhalb von 24 Stunden, deutschlandweit verfügbar."
      />
    </VoltageShell>
  );
};

export default Tickets;
