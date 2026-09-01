/** /tickets — Tickets & Termine (Voltage-Layout): aktuell keine Termine, Show-Formate, Abendablauf, Newsletter. */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
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
  WHITE,
  PAPER,
  L_LINE,
  L_DIM,
  CARD_LIGHT,
  up,
  stagger,
  vp,
} from "@/components/voltage/theme";
import { captureEmail } from "@/lib/emailCapture";
import { subscribeNewsletter } from "@/lib/sendInquiry";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  Tv,
  CheckCircle2,
  AlertCircle,
  Mail,
  Send,
} from "lucide-react";

import heroStageImg from "@/assets/audience-reactions.jpg";
import tabCloseup from "@/assets/hero-closeup.jpg";
import tabDinner from "@/assets/hero-dinner.jpg";
import tabStage from "@/assets/hero-stage.jpg";

/* ═══════════════════════════════════════════════════════════
   AKTUELLE TERMINE — Leer-Zustand (aktuell keine Events)
   ═══════════════════════════════════════════════════════════ */
const KeineTermineSection = () => (
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
            <>
              Aktuell <span style={{ color: COBALT }}>keine Termine</span>
              <span style={{ color: MAGENTA }}>.</span>
            </>
          }
          sub="Es stehen derzeit keine öffentlichen Veranstaltungen an — keine Shows, kein Magic Dinner, kein Vorverkauf."
        />
      </motion.div>

      <motion.div
        variants={up}
        className="rounded-[28px] p-8 md:p-12 lg:p-14 max-w-4xl"
        style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
      >
        <span
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold mb-6"
          style={{ background: `${COBALT}14`, color: COBALT }}
        >
          <AlertCircle className="w-4 h-4" />
          Keine Events im Vorverkauf
        </span>
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
          Es sind aktuell keine öffentlichen Termine geplant. Sobald wieder ein
          Abend feststeht, steht er hier zuerst — und geht davor an den
          Newsletter. Für eine eigene Show zu deinem Anlass kannst du mich
          jederzeit direkt anfragen.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#newsletter"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]"
            style={{ background: COBALT, color: WHITE }}
          >
            <Mail className="w-4 h-4" />
            Bei neuen Terminen benachrichtigen
          </a>
          <Link
            to="/buchung"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold border-b pb-1 transition-colors"
            style={{ color: INK, borderColor: L_LINE }}
          >
            Private Show anfragen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
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
    q: "Wann gibt es wieder Termine?",
    a: "Aktuell sind keine öffentlichen Veranstaltungen geplant. Neue Termine werden hier auf dieser Seite veröffentlicht — und vorab über den Newsletter angekündigt.",
  },
  {
    q: "Kann ich schon Tickets kaufen oder reservieren?",
    a: "Nein. Es läuft kein Vorverkauf und es gibt keine Reservierungsliste, weil derzeit kein Termin feststeht.",
  },
  {
    q: "Wie erfahre ich von neuen Terminen?",
    a: "Am schnellsten über den Newsletter auf dieser Seite. Die Mails kommen nur, wenn es tatsächlich etwas Neues gibt — meistens mit einigen Wochen Vorlauf vor der öffentlichen Ankündigung.",
  },
  {
    q: "Kann ich Emilian trotzdem buchen?",
    a: "Ja. Private und geschäftliche Buchungen sind unabhängig von öffentlichen Terminen jederzeit möglich — Hochzeit, Firmenfeier, Geburtstag oder eigener Show-Abend. Anfrage über das Buchungsformular oder direkt an el@magicel.de.",
  },
  {
    q: "Wie schnell kommt eine Antwort auf eine Anfrage?",
    a: "In der Regel innerhalb von 24 Stunden — mit Rückfragen zum Anlass, zur Location und zum Ablauf, danach ein konkretes Angebot.",
  },
  {
    q: "Wie lange dauert eine Show?",
    a: "Je nach Format: Close-Up-Magie läuft über den Abend verteilt, eine abendfüllende Bühnenshow dauert rund 90 Minuten. Der genaue Ablauf wird bei der Buchung gemeinsam festgelegt.",
  },
];

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER-CTA — Email-Capture für neue Termine (Logik unverändert)
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
              Aktuell steht kein Termin an — sobald sich das ändert, geht die
              Info zuerst hier raus, bevor sie öffentlich angekündigt wird.
              Kurze Mails, kein Spam, jederzeit abbestellbar.
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
                    Du bekommst die nächste Mail, sobald es wieder einen
                    Termin gibt — meistens 4–8 Wochen Vorlauf.
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
   JSON-LD — BreadcrumbList + Person (aktuell keine Events)
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
  ],
};

/* ═══════════════════════════════════════════════════════════ */
const Tickets = () => (
  <VoltageShell
    title="Tickets & Termine — aktuell keine Events | Emilian Leber"
    description="Aktuell sind keine öffentlichen Termine geplant — kein Vorverkauf, kein Magic Dinner. Neue Termine zuerst über den Newsletter. Private Buchungen jederzeit möglich."
    path="/tickets"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Tickets Emilian Leber, Termine Emilian Leber, Zaubershow Karten Bayern, Magier Tickets Regensburg, Zauberer buchen"
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Tickets & Termine — aktuell keine Events | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="Derzeit keine öffentlichen Termine. Neue Termine zuerst über den Newsletter — private Buchungen jederzeit möglich."
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
      sub="Aktuell stehen keine öffentlichen Veranstaltungen an — kein Vorverkauf, keine Reservierung. Neue Termine erscheinen hier und zuerst im Newsletter."
      image={heroStageImg}
      imageAlt="Tickets & Termine — Shows mit Emilian Leber"
      imgPos="top"
      badge="Aktuell keine Termine · neue Daten folgen"
      primary={{ label: "Newsletter abonnieren", href: "#newsletter" }}
      secondary={{ label: "Private Buchung", href: "/buchung" }}
    />

    <Stats
      items={[
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "0", l: "Termine im Vorverkauf" },
        { v: "200+", l: "Events seit 2016" },
        { v: "24 h", l: "Antwort auf Anfragen" },
      ]}
    />

    <KeineTermineSection />

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
          d: "Ein Restaurant-Abend mit Close-Up-Magie an jeder Tafel — als Format buchbar, derzeit ohne öffentlichen Termin.",
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

    <NewsletterCTASection />

    <FAQ
      eyebrow="Bevor du fragst"
      title="Häufige Ticket-Fragen."
      items={FAQS.map((f) => ({ q: f.q, a: f.a }))}
    />

    <FinalCTA
      title={
        <>
          Kein Termin dabei? Dann eigene Show
          <span style={{ color: MAGENTA }}>.</span>
        </>
      }
      sub="Solange keine öffentlichen Termine anstehen: private und geschäftliche Buchungen sind jederzeit möglich. Schreib mir direkt — Antwort innerhalb von 24 Stunden, deutschlandweit verfügbar."
    />
  </VoltageShell>
);

export default Tickets;
