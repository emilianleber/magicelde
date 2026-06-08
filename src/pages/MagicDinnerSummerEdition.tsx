/** /tickets/magic-dinner-summer-edition — Event-Landingpage (Voltage-Layout). */
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import {
  SubHero,
  Stats,
  FactsGrid,
  Steps,
  FAQ,
  ReviewsBlock,
  LogoMarquee,
  FinalCTA,
  SectionHeader,
} from "@/components/voltage/sections";
import { SplitFeature } from "@/components/voltage/creative";
import {
  COBALT,
  MAGENTA,
  INK,
  WHITE,
  PAPER,
  L_LINE,
  L_DIM,
  up,
  stagger,
  vp,
} from "@/components/voltage/theme";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  Users,
  Sun,
  CheckCircle2,
  Globe,
} from "lucide-react";

import heroDinnerImg from "@/assets/hero-dinner.jpg";
import posterImg from "@/assets/magic-dinner-summer-poster.png";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";
import emilianDinnerImg from "@/assets/emilian-magic-dinner.jpg";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import { sendInquiry } from "@/lib/sendInquiry";

const ACCENT = COBALT;

const EVENT_DATE = "11. Juli 2026";
const EVENT_TIME = "17:00";
const RESERVIERUNG_TEL = "+49 941 9469770";
const RESERVIERUNG_MAIL = "info@restaurant-waldwiese.de";
const RESERVIERUNG_URL = "https://restaurant-waldwiese.de";

/* ═══════════════════════════════════════════════════════════
   POSTER — Original-Plakat als Eye-Catcher
   ═══════════════════════════════════════════════════════════ */
const PosterSection = () => (
  <motion.section
    variants={up}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
    style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
  >
    <div className="max-w-[680px] mx-auto">
      <img
        src={posterImg}
        alt="Magic Dinner Summer Edition — Plakat · Restaurant Wald & Wiese Sinzing · 11. Juli 2026"
        className="w-full h-auto block rounded-[24px]"
        style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}
        loading="lazy"
      />
      <p className="mt-6 text-center text-[14px]" style={{ color: L_DIM }}>
        Originale Veranstaltungs-Ankündigung des Restaurant Wald &amp; Wiese
      </p>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   WANN & WO — Location-Card mit Eckdaten
   ═══════════════════════════════════════════════════════════ */
const WannWoSection = () => (
  <motion.section
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={vp}
    className="px-5 md:px-10 py-16 md:py-24"
  >
    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <motion.div variants={up} className="lg:col-span-5">
        <SectionHeader
          eyebrow="Wann & wo"
          title={<>Sommerabend in <span style={{ color: COBALT }}>Sinzing</span><span style={{ color: MAGENTA }}>.</span></>}
          sub="Das Restaurant Wald & Wiese ist mein Hauspartner für die Magic-Dinner-Reihe. Sommer-Terrasse mit Blick ins Grüne, klassisch gemütlicher Innenbereich, Karte mit regionalen Klassikern und saisonalen Specials."
        />
        <a
          href={RESERVIERUNG_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 mt-7 text-[14px] font-semibold pb-0.5 border-b transition-colors"
          style={{ color: COBALT, borderColor: `${COBALT}55` }}
        >
          <Globe className="w-4 h-4" />
          Restaurant-Website
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.div variants={up} className="lg:col-span-7">
        <div
          className="relative overflow-hidden rounded-[28px]"
          style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}
        >
          <img
            src={schneiderImg}
            alt="Restaurant Wald & Wiese Sinzing — Magic-Dinner-Setting"
            className="w-full h-[360px] md:h-[460px] object-cover"
            loading="lazy"
            style={{ objectPosition: "center 35%" }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(180deg, transparent, rgba(10,11,15,0.78))" }}
          />
          <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 grid grid-cols-3 gap-4 md:gap-6 text-white">
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase font-semibold text-white/65 mb-1">
                Datum
              </p>
              <p className="text-[15px] md:text-lg font-bold tabular-nums leading-tight">
                {EVENT_DATE}
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase font-semibold text-white/65 mb-1">
                Zeit
              </p>
              <p className="text-[15px] md:text-lg font-bold tabular-nums leading-tight">
                ab {EVENT_TIME} Uhr
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.16em] uppercase font-semibold text-white/65 mb-1">
                Ort
              </p>
              <p className="text-[15px] md:text-lg font-bold leading-tight">
                Wald & Wiese · Sinzing
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   RESERVIERUNGS-FORM — Logik unverändert, nur Voltage-Look
   ═══════════════════════════════════════════════════════════ */
const ReservierungsSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    personen: "2",
    uhrzeit: "",
    bereich: "",
    anlass: "",
    wuensche: "",
  });

  useEffect(() => {
    if (form.email && form.email.includes("@")) {
      captureEmail(form.email, "magic-dinner-summer", form);
    }
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.email.includes("@")) return;
    setSubmitted(true);

    const nachricht =
      `Reservierungsanfrage für Magic Dinner Summer Edition am ${EVENT_DATE}\n\n` +
      `Wunsch-Uhrzeit: ${form.uhrzeit || "—"}\n` +
      `Bereich: ${form.bereich || "—"}\n` +
      `Anlass: ${form.anlass || "—"}\n` +
      `Wünsche: ${form.wuensche || "—"}`;

    try {
      await sendInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        anlass: "Magic Dinner — Summer Edition",
        format: form.bereich || "Restaurant",
        datum: EVENT_DATE,
        ort: "Restaurant Wald & Wiese · Sinzing",
        gaeste: form.personen ? Number(form.personen) : null,
        nachricht,
      });
      markEmailSubmitted();
    } catch (err) {
      console.error("MDSE sendInquiry failed", err);
    }

    // Plus mailto ans Restaurant (Reservierung läuft dort)
    const subject = encodeURIComponent(
      `Magic Dinner Summer Edition · ${form.personen} Personen · ${form.name}`,
    );
    const body = encodeURIComponent(nachricht + `\n\nKontakt: ${form.name} · ${form.email} · ${form.phone || "—"}`);
    window.setTimeout(() => {
      window.location.href = `mailto:${RESERVIERUNG_MAIL}?subject=${subject}&body=${body}&cc=el@magicel.de`;
    }, 800);
  };

  const inputCls =
    "w-full px-4 py-3 rounded-xl border outline-none text-base transition-colors bg-white focus:border-[color:var(--ac)] focus:ring-2 focus:ring-[color:var(--ac)]/15";
  const inputStyle = {
    borderColor: L_LINE,
    color: INK,
    ["--ac" as never]: ACCENT,
  } as React.CSSProperties;

  return (
    <motion.section
      id="reservieren"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14">
        <motion.div variants={up} className="lg:col-span-5">
          <SectionHeader
            eyebrow="Tisch reservieren"
            title={<>Platz sichern, <span style={{ color: COBALT }}>Sommerabend buchen</span><span style={{ color: MAGENTA }}>.</span></>}
            sub="Reserviere am schnellsten direkt im Restaurant Wald & Wiese. Telefon, Mail oder über das Formular hier — wir leiten es weiter. 50 Plätze, am besten frühzeitig."
          />

          <div className="space-y-3 mt-8 mb-6">
            <a
              href={`tel:${RESERVIERUNG_TEL.replace(/\s/g, "")}`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white hover:shadow-md transition-all"
              style={{ border: `1px solid ${L_LINE}` }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ background: `${ACCENT}14` }}
              >
                <Phone className="w-4 h-4" style={{ color: ACCENT }} />
              </span>
              <div>
                <p className="text-[11px] tracking-[0.16em] uppercase font-semibold" style={{ color: L_DIM }}>
                  Telefon-Reservierung
                </p>
                <p className="text-[15px] md:text-base font-bold" style={{ color: INK }}>
                  {RESERVIERUNG_TEL}
                </p>
              </div>
            </a>
            <a
              href={`mailto:${RESERVIERUNG_MAIL}?subject=Reservierung%20Magic%20Dinner%20Summer%20Edition`}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white hover:shadow-md transition-all"
              style={{ border: `1px solid ${L_LINE}` }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ background: `${ACCENT}14` }}
              >
                <Mail className="w-4 h-4" style={{ color: ACCENT }} />
              </span>
              <div>
                <p className="text-[11px] tracking-[0.16em] uppercase font-semibold" style={{ color: L_DIM }}>
                  Email-Reservierung
                </p>
                <p className="text-[15px] md:text-base font-bold" style={{ color: INK }}>
                  {RESERVIERUNG_MAIL}
                </p>
              </div>
            </a>
            <a
              href={RESERVIERUNG_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 p-4 rounded-2xl bg-white hover:shadow-md transition-all"
              style={{ border: `1px solid ${L_LINE}` }}
            >
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                style={{ background: `${ACCENT}14` }}
              >
                <Globe className="w-4 h-4" style={{ color: ACCENT }} />
              </span>
              <div>
                <p className="text-[11px] tracking-[0.16em] uppercase font-semibold" style={{ color: L_DIM }}>
                  Online-Reservierung
                </p>
                <p className="text-[15px] md:text-base font-bold" style={{ color: INK }}>
                  restaurant-waldwiese.de
                </p>
              </div>
            </a>
          </div>

          <p className="text-[14px] leading-[1.6]" style={{ color: L_DIM }}>
            Reservierung läuft beim Restaurant. Ich werde automatisch informiert
            und sehe euch am Abend.
          </p>
        </motion.div>

        <motion.div variants={up} className="lg:col-span-7">
          <div
            className="rounded-[28px] p-5 sm:p-7 md:p-10 bg-white"
            style={{ border: `1px solid ${L_LINE}`, boxShadow: "0 24px 60px -24px rgba(10,11,15,0.25)" }}
          >
            {submitted ? (
              <div className="text-center py-8 md:py-12">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                  style={{ background: COBALT }}
                >
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3" style={{ color: INK }}>
                  Anfrage unterwegs.
                </h3>
                <p className="text-base leading-[1.6] max-w-md mx-auto" style={{ color: L_DIM }}>
                  Email-Programm öffnet sich gleich mit der Reservierungs-
                  Anfrage an Wald & Wiese (mit mir in Kopie).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-[11px] tracking-[0.16em] uppercase font-semibold mb-2" style={{ color: COBALT }}>
                  Reservierungs-Formular
                </p>
                <h3 className="text-xl md:text-2xl font-extrabold mb-5" style={{ color: INK }}>
                  Bequemer Weg —{" "}
                  <span style={{ color: COBALT }}>schick uns die Anfrage.</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Dein Name *"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputCls}
                    style={inputStyle}
                  />
                  <input
                    type="number"
                    min="1"
                    max="20"
                    required
                    placeholder="Anzahl Personen *"
                    value={form.personen}
                    onChange={(e) => setForm((f) => ({ ...f, personen: e.target.value }))}
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputCls}
                  style={inputStyle}
                />
                <input
                  type="tel"
                  placeholder="Telefon (optional)"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className={inputCls}
                  style={inputStyle}
                />
                <div className="grid sm:grid-cols-2 gap-3">
                  <select
                    required
                    value={form.uhrzeit}
                    onChange={(e) => setForm((f) => ({ ...f, uhrzeit: e.target.value }))}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="">Wunsch-Uhrzeit *</option>
                    <option value="17:00">17:00 Uhr</option>
                    <option value="17:30">17:30 Uhr</option>
                    <option value="18:00">18:00 Uhr</option>
                    <option value="18:30">18:30 Uhr</option>
                    <option value="19:00">19:00 Uhr</option>
                    <option value="19:30">19:30 Uhr</option>
                  </select>
                  <select
                    required
                    value={form.bereich}
                    onChange={(e) => setForm((f) => ({ ...f, bereich: e.target.value }))}
                    className={inputCls}
                    style={inputStyle}
                  >
                    <option value="">Bereich *</option>
                    <option value="Terrasse">Terrasse</option>
                    <option value="Innenbereich">Innenbereich</option>
                    <option value="Egal">Egal — Restaurant entscheidet</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Anlass (Geburtstag, Geschäftsabend, …)"
                  value={form.anlass}
                  onChange={(e) => setForm((f) => ({ ...f, anlass: e.target.value }))}
                  className={inputCls}
                  style={inputStyle}
                />
                <textarea
                  placeholder="Wünsche / Allergien / besondere Anlässe (optional)"
                  value={form.wuensche}
                  rows={3}
                  onChange={(e) => setForm((f) => ({ ...f, wuensche: e.target.value }))}
                  className={`${inputCls} resize-none`}
                  style={inputStyle}
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]"
                  style={{ background: COBALT, color: WHITE }}
                >
                  <span className="sm:hidden">Anfrage senden</span>
                  <span className="hidden sm:inline">Reservierungs-Anfrage senden</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <p className="text-[13px] leading-[1.55] text-center pt-2" style={{ color: L_DIM }}>
                  Wir geben deine Anfrage ans Restaurant weiter. Email mit
                  Bestätigung kommt innerhalb 24 h.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WEITERE EDITIONEN — Verwandte Termine
   ═══════════════════════════════════════════════════════════ */
const EDITIONEN = [
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

const WeitereEditionenSection = () => (
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
          eyebrow="Weitere Magic-Dinner-Termine"
          title={<>Nach Sommer kommt <span style={{ color: COBALT }}>mehr</span><span style={{ color: MAGENTA }}>.</span></>}
        />
      </motion.div>
      <div className="mt-10 rounded-[24px] overflow-hidden" style={{ border: `1px solid ${L_LINE}` }}>
        {EDITIONEN.map((it, i) => (
          <motion.div
            key={it.date}
            variants={up}
            className="grid grid-cols-[1fr_auto] md:grid-cols-[200px_1fr_auto] gap-4 md:gap-8 px-6 md:px-8 py-6 md:py-7 items-center bg-white"
            style={{ borderTop: i === 0 ? "none" : `1px solid ${L_LINE}` }}
          >
            <div className="font-bold tabular-nums text-[15px] md:text-lg" style={{ color: COBALT }}>
              {it.date}
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold leading-tight" style={{ color: INK }}>
                {it.label}
              </h3>
              <p className="text-[14px] mt-1" style={{ color: L_DIM }}>{it.sub}</p>
            </div>
            <span
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] tracking-[0.12em] uppercase font-bold whitespace-nowrap"
              style={
                it.status === "Vorverkauf"
                  ? { background: COBALT, color: WHITE }
                  : { background: `${INK}0d`, color: L_DIM }
              }
            >
              {it.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   FAQ-DATEN (auch für JSON-LD)
   ═══════════════════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    q: "Wie reserviere ich einen Tisch?",
    a: "Direkt über das Restaurant Wald & Wiese — Telefon, Mail oder Online. Sag dazu, dass es für den Magic-Dinner-Abend am 11. Juli ist. Oder nutze das Formular hier auf der Seite, wir leiten es weiter.",
  },
  {
    q: "Was kostet der Abend?",
    a: "Du zahlst nur dein Essen + Getränke à la carte. Die Magie ist für Tafel-Gäste an dem Abend inklusive — kein separates Eintrittsticket nötig.",
  },
  {
    q: "Muss ich ein bestimmtes Menü essen?",
    a: "Nein. Du bestellst aus der Sommerkarte was du willst — Vorspeise und Hauptgang, nur Hauptgang, Drei-Gänger, vegetarisch, vegan — ganz wie sonst auch im Wald & Wiese.",
  },
  {
    q: "Wie viele Personen passen an einen Tisch?",
    a: "Von 2 bis 12 Personen pro Tafel. Bei größeren Gruppen (über 12) bitte vorher anfragen, dann teilen wir ggf. auf zwei Tafeln auf.",
  },
  {
    q: "Wann komme ich am Tisch dran?",
    a: "Ich gehe von Tafel zu Tafel über den Abend verteilt — der genaue Zeitpunkt ergibt sich aus dem Service-Rhythmus. Ihr esst entspannt, ich passe mich an. Keine starre Reihenfolge, keine Hetze.",
  },
  {
    q: "Kann ich auch jemanden überraschen?",
    a: "Klar. Schreib mir vorher (el@magicel.de), was du an Anekdoten/Insider-Story hast — Geburtstag, Verlobung, Geschäftsabschluss — ich baue das in eine Routine ein, ohne dass jemand merkt woher ich das weiß.",
  },
  {
    q: "Kommt der nächste Magic-Dinner-Abend wann?",
    a: "Aktuell ist die Summer Edition am 11. Juli 2026 der einzige bestätigte Termin. Weitere Editionen werden über den Newsletter angekündigt — Vorverkauf üblicherweise 6–8 Wochen vorab.",
  },
];

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
const SITE_URL =
  "https://www.magicel.de/tickets/magic-dinner-summer-edition";

const MagicDinnerSummerEdition = () => (
  <VoltageShell
    title="Magic Dinner Summer Edition — 11. Juli 2026 · Wald & Wiese Sinzing | Emilian Leber"
    description="Magic Dinner Summer Edition am 11.07.2026 im Restaurant Wald & Wiese Sinzing bei Regensburg. Tisch reservieren, à la carte essen, ich besuche euch mit Close-Up-Magie am Tisch. 5,0★."
    path="/tickets/magic-dinner-summer-edition"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Magic Dinner, Magic Dinner Sinzing, Magic Dinner Regensburg, Magic Dinner Summer Edition, Restaurant Wald Wiese, Magic Dinner Reservierung, Zauberer Dinner Bayern, Magic Dinner buchen, Magic Dinner 2026"
      />
      <meta property="og:type" content="event" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Magic Dinner — Summer Edition",
          startDate: "2026-07-11T17:00:00+02:00",
          endDate: "2026-07-11T23:00:00+02:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",
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
          image: ["https://www.magicel.de/og-image.jpg"],
          description:
            "Magic Dinner — Summer Edition am 11. Juli 2026 ab 17:00 Uhr im Restaurant Wald & Wiese Sinzing. Tisch reservieren, à la carte essen, Close-Up-Magie am Tisch von Emilian Leber.",
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
            url: SITE_URL,
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
            price: "0",
            description:
              "Reservierung kostenlos. Verzehr à la carte aus der Restaurantkarte.",
            validFrom: "2026-04-01T00:00:00+02:00",
          },
          maximumAttendeeCapacity: 50,
        })}
      </script>
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
              name: "Tickets",
              item: "https://www.magicel.de/tickets",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Magic Dinner Summer Edition",
              item: SITE_URL,
            },
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}
      </script>
    </Helmet>

    <SubHero
      eyebrow="Summer Edition · 11. Juli 2026"
      title={<>Magic Dinner <span style={{ color: COBALT }}>Summer Edition</span><span style={{ color: MAGENTA }}>.</span></>}
      sub="Ein Sommerabend im Restaurant Wald & Wiese in Sinzing. Du reservierst deinen Tisch, isst à la carte was du willst — und während des Abends besuche ich euch persönlich am Tisch mit Close-Up-Magie. Drei Sekunden Stille, dann lacht eure Tafel."
      image={heroDinnerImg}
      imageAlt="Magic Dinner Summer Edition — Sommerabend im Restaurant Wald & Wiese Sinzing mit Emilian Leber"
      imgPos="center 35%"
      badge="Sommerabend · Wald & Wiese Sinzing · max. 50 Plätze"
      primary={{ label: "Tisch reservieren", href: "#reservieren" }}
      secondary={{ label: "So funktioniert's", href: "#ablauf" }}
    />

    <Stats
      items={[
        { v: EVENT_DATE, l: "Summer Edition 2026" },
        { v: `ab ${EVENT_TIME}`, l: "Uhr · Sinzing" },
        { v: "50", l: "Plätze maximal" },
        { v: "5,0★", l: "30+ Bewertungen" },
      ]}
    />

    <PosterSection />

    <Steps
      eyebrow="So einfach läuft das"
      title={<>Vom <span style={{ color: COBALT }}>Tisch</span> zur Pointe.</>}
      sub="Kein Pflicht-Menü, keine Bühne, kein Eintrittsticket. Nur dein Tisch, dein Essen und Magie die direkt zu dir kommt — wie bei Freunden, die zufällig zaubern können."
      items={[
        {
          t: "Tisch reservieren.",
          d: "Reservierung läuft direkt über das Restaurant Wald & Wiese — Telefon, Mail oder Online-Formular. Sag dazu: [für den Magic-Dinner-Abend am 11. Juli]. Max. 50 Plätze, am besten früh reservieren.",
        },
        {
          t: "Bestelle wie immer.",
          d: "Am Abend selbst läuft das Wald & Wiese ganz normal: à la carte aus der Sommerkarte, Drei-Gänger optional, Weinbegleitung dazu — du entscheidest. Kein Pflicht-Menü, keine festen Gänge.",
        },
        {
          t: "Ich besuche euren Tisch.",
          d: "Während des Abends gehe ich von Tisch zu Tisch — Karten in eure Hände, eine Münze die durch den Tisch fällt, eine Wahl die niemand erklären kann. Kein Mikrofon, keine Bühne, kein Hetzen.",
        },
      ]}
    />

    <FactsGrid
      items={[
        { Icon: CalendarDays, k: "Datum", v: EVENT_DATE },
        { Icon: Clock, k: "Beginn", v: `ab ${EVENT_TIME} Uhr` },
        { Icon: Users, k: "Plätze", v: "Max. 50 · 2–12 pro Tafel" },
        { Icon: Sun, k: "Edition", v: "Summer · Terrasse & Innen" },
      ]}
    />

    <span id="ablauf" />
    <SplitFeature
      eyebrow="Was dich erwartet"
      title={<>Essen mit Magie, die direkt zu dir <span style={{ color: COBALT }}>kommt</span>.</>}
      sub="Magic Dinner ist nicht Show plus Essen — sondern ein normaler Restaurantabend, bei dem die Magie an deinen Tisch kommt. Das erlebst du an dem Abend:"
      points={[
        "Sommer-Karte à la carte — Klassiker und saisonale Specials, Drei-Gänger optional, vegetarisch/vegan/glutenfrei auf Wunsch",
        "Close-Up direkt am Tisch — Karten in deinen Händen, Münzen aus dem Nichts, Mentaleffekte mit deiner Wahl, abgestimmt auf den Service-Rhythmus",
        "Sommerterrasse oder Innenbereich — bei Sonne mit Blick ins Grüne, hauseigene Weine, Bar bis spät",
        "Familie, Freunde, Fremde — kleine private Runden bis große Tafeln, ideal auch für Geburtstage und Geschäftsessen",
      ]}
      image={emilianDinnerImg}
      imageAlt="Emilian Leber mit Close-Up-Magie am Tisch beim Magic Dinner"
      imgPos="center"
      stat={{ v: "50", l: "Plätze" }}
    />

    <WannWoSection />

    <ReservierungsSection />

    <LogoMarquee label="Restaurant-Partner & Bühnen, die mit mir gearbeitet haben" />

    <ReviewsBlock paper={false} />

    <WeitereEditionenSection />

    <FAQ
      eyebrow="Häufige Fragen"
      title="Was vorher gefragt wird."
      items={FAQ_ITEMS}
    />

    <FinalCTA
      title={<>Tisch sichern, Magie bekommen<span style={{ color: MAGENTA }}>.</span></>}
      sub="Magic Dinner Summer Edition · 11. Juli 2026. Reservierung läuft direkt beim Restaurant. Max. 50 Plätze — wenn der Saal voll ist, ist er voll."
    />
  </VoltageShell>
);

export default MagicDinnerSummerEdition;
