import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { staedte, type KollegenEmpfehlung, type Stadt } from "@/data/staedte";
import {
  ArrowUpRight,
  Hand,
  Wand2,
  UtensilsCrossed,
  Heart,
  Briefcase,
  Cake,
  Building2,
  GraduationCap,
  PartyPopper,
  MapPin,
  Route,
  ChevronDown,
  ClipboardList,
  ShieldCheck,
  Clock,
  Sparkles,
  Languages,
  Timer,
  Headphones,
  CircleDollarSign,
} from "lucide-react";

import VoltageShell from "@/components/voltage/VoltageShell";
import {
  SubHero,
  Stats,
  Steps,
  ReviewsBlock,
  FAQ,
  FinalCTA,
  LogoMarquee,
} from "@/components/voltage/sections";
import { FormatCards, WarumCarousel } from "@/components/voltage/creative";
import { COBALT, MAGENTA, INK, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";
import { CustomQuizSection, CustomQuizConfig } from "@/components/landing/CustomQuiz";
import { TVA_VIDEO_ID } from "@/lib/videos";

import heroStartImg from "@/assets/hero-start.jpg";
import stageImg from "@/assets/buehne-zuschauer.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";

/* Voltage: Cobalt-Akzent inline, kein Serif/Italic, kein Gold/Burgunder. */
const ACCENT = "#1D3FFF";

/* ═══════════════════════════════════════════════════════════
   SEO Keywords — pro Stadt durchsubstituiert
   ═══════════════════════════════════════════════════════════ */
const keywordList = (name: string): string =>
  [
    `Zauberer ${name}`,
    `Zauberkünstler ${name}`,
    `Magier ${name}`,
    `Hochzeitszauberer ${name}`,
    `Zauberer Hochzeit ${name}`,
    `Zauberer Firmenfeier ${name}`,
    `Firmenzauberer ${name}`,
    `Zauberer Geburtstag ${name}`,
    `Tischzauberer ${name}`,
    `Close-Up Zauberer ${name}`,
    `Walk-Around Zauberer ${name}`,
    `Bühnenshow ${name}`,
    `Magic Dinner ${name}`,
    `Mentalist ${name}`,
    `Mentalmagier ${name}`,
    `Comedy-Zauberer ${name}`,
    `Zaubershow ${name}`,
    `Zauberer buchen ${name}`,
    `Zauberer mieten ${name}`,
    `Eventzauberer ${name}`,
    `Tischmagie ${name}`,
    `Hochzeit Zauberer ${name}`,
    `Firmenfeier Magier ${name}`,
    `Moderator mit Magie ${name}`,
    `Zauberer in der Nähe`,
  ].join(", ");

/* ═══════════════════════════════════════════════════════════
   FORMATE — 3 Showformate (Close-Up / Bühnenshow / Magic Dinner)
   Visuelle Bild-Karten mit kurzem Stadt-Text + Links.
   ═══════════════════════════════════════════════════════════ */
const FormateSection = ({ data }: { data: Stadt }) => (
  <FormatCards
    eyebrow={`Drei Formate für Events in ${data.name}`}
    title={
      <>
        Close-Up. Bühne. <span style={{ color: COBALT }}>Magic Dinner.</span>
      </>
    }
    sub={`Drei bewährte Showformate — einzeln oder kombiniert. Ich passe das Programm individuell an deinen Anlass in ${data.name} an, mit Briefing-Call vorab.`}
    note="Frei kombinierbar — von der Tischmagie bis zur großen Bühnenshow."
    formats={[
      {
        t: `Close-Up Zauberer ${data.name}`,
        d: `Interaktive Tischzauberei und Walk-Around-Magie direkt bei euren Gästen in ${data.name}. Karten, Münzen, Mentalmagie — der Eisbrecher bei Sektempfang, Dinner und Networking-Events.`,
        h: "/close-up",
        Icon: Hand,
      },
      {
        t: `Bühnenshow ${data.name}`,
        d: `Durchkomponierte Comedy-Zaubershow mit Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale. Für Galas, Firmenfeiern und Hochzeiten in ${data.name} — 15 bis 60 Min, ab 50 Gästen.`,
        h: "/buehnenshow",
        Icon: Wand2,
      },
      {
        t: `Magic Dinner ${data.name}`,
        d: `Dinner und Magie kombiniert — Close-Up und Bühnenshow eingebettet in einen Mehrgänge-Abend. Exklusives Erlebnis-Format für besondere Anlässe in ${data.name} und Umgebung.`,
        h: "/magic-dinner",
        Icon: UtensilsCrossed,
      },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   WARUM-STADT-KARUSSELL — die geliebte Sechs-Gründe-Section
   ═══════════════════════════════════════════════════════════ */
const WarumStadtCarousel = ({ data }: { data: Stadt }) => (
  <WarumCarousel
    eyebrow={`Warum aus ${data.region}?`}
    title={
      <>
        Sechs Gründe, warum ein Zauberer in <span style={{ color: COBALT }}>{data.name}</span> mehr bringt
        <span style={{ color: MAGENTA }}>.</span>
      </>
    }
    cards={[
      {
        kind: "photo",
        image: dinnerBuehneImg,
        chip: `${data.name} & Umland`,
        title: "Vom Vorstands-Dinner bis zur Gala",
        text: `Vertraut mit Sälen, Caterern und dem Ablauf vor Ort — von der intimen Feier bis zur großen Bühne in ${data.name}.`,
        pos: "center",
      },
      { kind: "stat", v: "200+", l: "Events seit 2016", text: `Routine in ganz Bayern — viele davon in ${data.region}.` },
      {
        kind: "feature",
        Icon: MapPin,
        title: `Schnell in ${data.name}`,
        text: `Anfahrt nach ${data.name} im Angebot transparent kalkuliert — keine versteckten Kosten, kurze Reaktionszeit.`,
      },
      {
        kind: "photo",
        image: stageImg,
        chip: "Voller Saal",
        title: `Der ganze Saal in ${data.name} geht mit`,
        text: "Comedy & Mentalmagie für jeden Rahmen — Close-Up am Tisch oder große Bühnenshow.",
        pos: "top",
      },
      { kind: "review", text: "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt.", name: "Martina Senftl · Eventkundin" },
      {
        kind: "feature",
        Icon: Route,
        title: "Deutschlandweit dabei",
        text: `Regensburg ist die Basis — für Events in ${data.name} und ${data.region} bin ich zur Stelle, deutschlandweit unterwegs.`,
      },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   TRUST — TV, Wettbewerb, 200+ Events (Stats)
   ═══════════════════════════════════════════════════════════ */
const TrustStripSection = ({ data }: { data: Stadt }) => (
  <Stats
    items={[
      { v: "200+", l: `Events seit 2016 — auch in ${data.name}` },
      { v: "5,0★", l: "30+ Bewertungen · ProvenExpert" },
      { v: "TV", l: "TVA-Auftritt 2025 · Greatest Talent 2023" },
      { v: "24 h", l: "Antwort auf jede Anfrage" },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   AUSZEICHNUNGEN & ERFAHRUNG — E-E-A-T-Credentials front-loaden.
   Echte Fakten, scannbar (Icon + Titel + kurze Zeile). Cobalt/Ink.
   ═══════════════════════════════════════════════════════════ */
const AuszeichnungenSection = ({ data }: { data: Stadt }) => {
  const CREDS = [
    { Icon: Sparkles, title: "200+ Events seit 2016", body: `Routine in ganz Bayern — auch in ${data.name} und ${data.region}.` },
    { Icon: Wand2, title: "3x TV-Finalist", body: "Greatest Talent 2023, Talents of Magic 2024 + Kreativpreis." },
    { Icon: GraduationCap, title: "Dt. Jugendmeisterschaft 2024", body: "Top 30 bundesweit — Auszeichnung im Wettbewerb." },
    { Icon: Building2, title: "TVA TV-Auftritt 2025", body: "Im Fernsehen zu sehen — als Zauberer und Mentalist." },
    { Icon: Heart, title: "5,0 Sterne · 30+ Bewertungen", body: "Google & ProvenExpert — durchweg Bestnoten." },
    { Icon: PartyPopper, title: "100+ Hochzeiten begleitet", body: `Empfang, Dinner, vor dem Tanz — bayernweit, auch in ${data.name}.` },
  ];
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <Eyebrow>Auszeichnungen & Erfahrung</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}>
            Preisgekrönt. TV-erprobt. <span style={{ color: COBALT }}>Über 200 Mal live.</span>
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Wer einen Zauberer in {data.name} bucht, will Verlässlichkeit — hier sind die Fakten
            hinter der Show, kurz und überprüfbar.
          </p>
        </motion.div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CREDS.map((c) => (
            <motion.li
              key={c.title}
              variants={up}
              className="flex items-start gap-4 rounded-[18px] p-6"
              style={{ background: "#fff", border: `1px solid ${L_LINE}` }}
            >
              <span className="w-11 h-11 shrink-0 rounded-[13px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}>
                <c.Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-bold leading-tight" style={{ color: INK }}>{c.title}</h3>
                <p className="text-[13.5px] leading-snug mt-1" style={{ color: L_DIM }}>{c.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ANLÄSSE — kompakte Liste mit den Anlass-Keywords + Links
   ═══════════════════════════════════════════════════════════ */
const AnlaesseSection = ({ data }: { data: Stadt }) => {
  const ANLAESSE = [
    {
      Icon: Heart,
      keyword: `Hochzeitszauberer ${data.name}`,
      label: "Hochzeit",
      body: "Empfang, Dinner, vor dem Tanz.",
      link: "/hochzeit",
    },
    {
      Icon: Briefcase,
      keyword: `Firmenzauberer ${data.name}`,
      label: "Firmenfeier",
      body: "Weihnachtsfeier, Jubiläum, Kick-off.",
      link: "/firmenfeiern",
    },
    {
      Icon: Cake,
      keyword: `Geburtstagszauberer ${data.name}`,
      label: "Geburtstag",
      body: "Vom 30er bis zur Goldenen Hochzeit.",
      link: "/geburtstage",
    },
    {
      Icon: Building2,
      keyword: `Galazauberer ${data.name}`,
      label: "Gala & Bühne",
      body: "Award-Show, Charity-Gala, Black-Tie.",
      link: "/buehnenshow",
    },
    {
      Icon: GraduationCap,
      keyword: `Messezauberer ${data.name}`,
      label: "Messe & Stand",
      body: "Stand-Aktivierung, Leads spielerisch.",
      link: "/messe-magier",
    },
    {
      Icon: PartyPopper,
      keyword: `Zauberer buchen ${data.name}`,
      label: "Private Feier",
      body: "Jubiläum, Einweihung, Sommerfest.",
      link: "/buchung",
    },
  ];
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <Eyebrow>Anlässe in {data.name}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}>
            Hochzeit. Firma. <span style={{ color: COBALT }}>Geburtstag.</span>
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Für jeden Anlass in {data.name} der passende Zauberer — Hochzeit, Firmenfeier, Gala,
            Messe oder private Feier.
          </p>
        </motion.div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ANLAESSE.map((a) => (
            <motion.li key={a.keyword} variants={up}>
              <a
                href={a.link}
                aria-label={`Mehr zu ${a.keyword}`}
                title={a.keyword}
                className="group flex items-center gap-4 h-full rounded-[18px] p-5 transition-transform hover:scale-[1.02]"
                style={{ background: "#fff", border: `1px solid ${L_LINE}` }}
              >
                <span className="w-12 h-12 shrink-0 rounded-[13px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}>
                  <a.Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[17px] font-bold leading-tight transition-colors group-hover:text-[#1D3FFF]" style={{ color: INK }}>
                    {a.label}
                  </h3>
                  <p className="text-[13.5px] leading-snug mt-0.5" style={{ color: L_DIM }}>{a.body}</p>
                  <span className="block text-[10px] tracking-[0.14em] uppercase font-bold mt-1.5" style={{ color: COBALT }}>
                    {a.keyword}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 shrink-0 self-start transition-colors" style={{ color: "rgba(10,11,15,0.3)" }} />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABLAUF-BUCHUNG — 4-Step-Prozess "Zauberer buchen [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const AblaufBuchungSection = ({ data }: { data: Stadt }) => (
  <Steps
    eyebrow={`Zauberer buchen ${data.name} — so läuft es`}
    title={
      <>
        Vier Schritte. <span style={{ color: COBALT }}>Kein Stress.</span>
      </>
    }
    sub={`Den Zauberer für dein Event in ${data.name} zu buchen, ist nicht kompliziert — vier transparente Schritte vom ersten Kontakt bis zur Show.`}
    items={[
      {
        t: "Anfrage",
        d: `Du schickst mir Datum, Anlass, Gästezahl und Wunsch-Location in ${data.name}. Über das Formular, per Email oder telefonisch. Antwort innerhalb 24 Stunden.`,
      },
      {
        t: "Briefing-Call",
        d: `30-Min-Telefonat zu deinem Event in ${data.name}: Anlass im Detail, Publikum, Tonalität, gewünschtes Format, Insider-Anekdoten für eingebaute Mentaleffekte.`,
      },
      {
        t: `Show in ${data.name}`,
        d: `Setup 30 Min vor Showbeginn, Soundcheck (falls Bühne), dann die Show. Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühne vor dem Tanz.`,
      },
      {
        t: "Nachbereitung",
        d: `Innerhalb 48 Stunden nach dem Event kurze Nachfrage zu deinem Erlebnis in ${data.name}. Optionale ProvenExpert-Bewertung — sonst kein Druck.`,
      },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   IM PREIS ENTHALTEN — 8 Inklusive-/Transparenz-Punkte.
   Scannbar (Icon + Titel + 1 Zeile), kein Textwall. Cobalt/Ink.
   ═══════════════════════════════════════════════════════════ */
const InklusiveSection = ({ data }: { data: Stadt }) => {
  const INKLUSIVE = [
    { Icon: ClipboardList, title: "Persönliches Vorab-Briefing", body: "Anlass, Tonalität und Insider-Gags klären wir gemeinsam." },
    { Icon: CircleDollarSign, title: "Anfahrt transparent im Angebot", body: `Anfahrt nach ${data.name} fix kalkuliert — keine versteckten Kosten.` },
    { Icon: Headphones, title: "Headset & Ton inklusive (Bühne)", body: "Eigene Technik dabei, Tech-Rider auf Anfrage." },
    { Icon: ShieldCheck, title: "Berufshaftpflicht & rechtssicher", body: "DSGVO und AVV für Firmenkunden — sauber abgesichert." },
    { Icon: Clock, title: "Antwort binnen 24 Stunden", body: "Verbindliche Zusage statt langem Warten." },
    { Icon: Sparkles, title: "Programm individuell abgestimmt", body: `Auf euren Anlass in ${data.name} zugeschnitten — kein Standardprogramm.` },
    { Icon: Languages, title: "Auf Deutsch & Englisch", body: "Internationale Gäste? Kein Problem." },
    { Icon: Timer, title: "Pünktlich vor Ort", body: "Setup ca. 30 Min vor Showbeginn, Soundcheck inklusive." },
  ];
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <Eyebrow>Im Preis enthalten · {data.name}</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}>
            Alles dabei. <span style={{ color: COBALT }}>Keine Überraschungen.</span>
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Was im Angebot für dein Event in {data.name} schon drin ist — transparent, fair
            und ohne Kleingedrucktes.
          </p>
        </motion.div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INKLUSIVE.map((item) => (
            <motion.li
              key={item.title}
              variants={up}
              className="rounded-[18px] p-6 h-full"
              style={{ background: "#fff", border: `1px solid ${L_LINE}` }}
            >
              <span className="w-11 h-11 rounded-[13px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}>
                <item.Icon className="w-5 h-5" />
              </span>
              <h3 className="text-[15.5px] font-bold leading-tight mt-4" style={{ color: INK }}>{item.title}</h3>
              <p className="text-[13.5px] leading-snug mt-1.5" style={{ color: L_DIM }}>{item.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   MEHR ÜBER ZAUBERER IN [STADT] — EIN einziger Lesen-Toggle.
   Der gesamte schwere SEO-Prosa-Text — wortwörtlich übernommen,
   als zusammenhängender Langform-Artikel in EINEM <details> (default zu,
   bleibt im DOM). Bewusst KEIN zweites FAQ-Accordion.
   ═══════════════════════════════════════════════════════════ */
const MehrUeberStadtSection = ({ data }: { data: Stadt }) => {
  const year = new Date().getFullYear();
  const langParagraphs = (data.langText || "").split("\n\n").filter(Boolean);
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div variants={up} className="mb-10">
          <Eyebrow>Alles, was du wissen musst</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3.2rem)", lineHeight: 1.05, color: INK }}>
            Mehr über Zauberer in <span style={{ color: COBALT }}>{data.name}</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Alle Details zu Hochzeit, Firmenfeier, Magic Dinner, Anreise, Garantien und den Locations
            in {data.name} — aufklappbar, falls du tiefer einsteigen willst.
          </p>
        </motion.div>

        {/* EIN einziger Lesen-Toggle — kein zweites FAQ-Accordion.
            Aufgeklappt: zusammenhängender Langform-Artikel mit h3-Zwischen-
            überschriften. Jeder Prosa-Text wortwörtlich übernommen. */}
        <motion.div variants={up}>
          <details className="group rounded-[18px] overflow-hidden" style={{ background: "#fff", border: `1px solid ${L_LINE}` }}>
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 md:px-8 md:py-6">
              <span className="text-[16px] md:text-[18px] font-semibold" style={{ color: INK }}>
                Ausführliche Infos zu Zauberer in {data.name} anzeigen
              </span>
              <ChevronDown className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" style={{ color: COBALT }} />
            </summary>

            <article
              className="px-6 pb-8 md:px-8 md:pb-10 text-[15px] md:text-[15.5px] leading-[1.75]"
              style={{ color: L_DIM, borderTop: `1px solid ${L_LINE}` }}
            >
              {/* WARUM-STADT — highlight + seoText */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-7 mb-3" style={{ color: INK }}>
                Warum einen Zauberer in {data.name} buchen?
              </h3>
              <p className="mb-4">{data.highlight}</p>
              {data.seoText && <p className="mb-4">{data.seoText}</p>}
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li>Close-Up Magie &amp; Tischzauberei</li>
                <li>Bühnenshow mit Comedy &amp; Mentalmagie</li>
                <li>Magic Dinner — Magie zwischen den Gängen</li>
                <li>Moderation mit eingebauter Magie</li>
              </ul>
              <p className="mb-4">200+ Events seit 2016 — auch in {data.region}.</p>

              {/* HOCHZEITSMAGIER-STADT */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Hochzeitszauberer {data.name} — Magie beim Sektempfang, beim Dinner, vor dem Tanz
              </h3>
              <p className="mb-4">
                Ein Hochzeitszauberer in {data.name} bringt drei Phasen zum Glänzen: Walk-Around beim
                Sektempfang als Eisbrecher zwischen Familien, Tisch-zu-Tisch beim Hochzeitsdinner mit
                eingebauten Brautpaar-Anekdoten und eine kompakte Bühnen-Highlightshow vor dem
                Eröffnungstanz. 100+ Hochzeiten bayernweit — das Setup steht.
              </p>
              <p className="mb-4">
                Egal ob klassische kirchliche Hochzeit, freie Trauung oder standesamtliche Feier in{" "}
                {data.name} — eingebaute Magie ist die Pointe, die deine Gäste noch Jahre später erzählen
                werden. Mit Brautpaar-Briefing vorab, damit eure Geschichte Teil der Show wird.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li>Empfang — Walk-Around · 30–60 Min · Eisbrecher zwischen Gästen in {data.name}.</li>
                <li>Dinner — Tisch-zu-Tisch · 5–7 Min pro Tafel · eingebaute Brautpaar-Anekdoten.</li>
                <li>Vor dem Tanz — Bühnen-Highlight · 15–20 Min · Standing-Ovation-Finale vor der Tanzeröffnung.</li>
                <li>100+ Hochzeiten · auch in {data.name} und {data.region}</li>
              </ul>
              <div className="flex flex-wrap gap-3 mb-2">
                <a href="/hochzeit" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
                  Hochzeitszauberer-Konzept <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href={`/buchung?ort=${encodeURIComponent(data.name)}&format=Hochzeit`} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase transition-colors hover:border-[#1D3FFF]" style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}>
                  Hochzeit in {data.name} anfragen <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* FIRMENZAUBERER-STADT */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Firmenzauberer {data.name} — Corporate-Entertainment, das der Vorstand zückt
              </h3>
              <p className="mb-4">
                Ein Firmenzauberer in {data.name} braucht mehr als Tricks — er braucht Tonalitätsgefühl.
                Vorstandsabend anders als Mitarbeiter-Weihnachtsfeier, Sales-Kickoff anders als Jubiläum.
                Mit Briefing-Call der Geschäftsleitung baue ich Insider-Pointen ein, die nur in eurem Saal
                funktionieren.
              </p>
              <p className="mb-4">
                Premium-Beispiel: 200 Gäste, Versicherungs-Konzern in {data.region}, Vorstandsvorsitzender
                zückte selbst drei Minuten nach Übergabe die Karten. Berufshaftpflicht, DSGVO + AVV
                abgesichert, Tech-Rider auf Anfrage.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li>Weihnachtsfeier — Klassiker im Q4 · Mitarbeiter und Partner in {data.name}.</li>
                <li>Vorstandsdinner — Premium-Tonalität, leise Mentaleffekte, drei Sekunden Stille.</li>
                <li>Sales-Kickoff — energetisch, eingebaute Pointen aus dem Briefing der Geschäftsleitung.</li>
                <li>Jubiläum / Firmenfest — Sommerfeste, Geburtstage des Unternehmens, Mitarbeiter-Events.</li>
              </ul>
              <div className="flex flex-wrap gap-3 mb-2">
                <a href="/firmenfeiern" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
                  Firmenfeier-Konzept <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href={`/buchung?ort=${encodeURIComponent(data.name)}&format=Firma`} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase transition-colors hover:border-[#1D3FFF]" style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}>
                  Firmenfeier {data.name} anfragen <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* MAGIC-DINNER-STADT */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Magic Dinner {data.name} — drei Gänge, drei Magie-Routinen
              </h3>
              <p className="mb-4">
                Magic Dinner ist mein Spezialgebiet — Mehrgänge-Abend mit Close-Up zwischen den Gängen und
                Bühnen-Höhepunkt zum Dessert. Funktioniert in Restaurants in {data.name} oder als
                geschlossener Privatabend.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li><strong style={{ color: INK }}>Vorspeise · 20 Min pro Tisch — Eisbrecher:</strong> Walk-Around zwischen den Plätzen, Karten in die Hände der Gäste, kleine Wow-Effekte direkt am Tisch in {data.name}.</li>
                <li><strong style={{ color: INK }}>Hauptgang · 5–7 Min pro Tisch — Tafel-Magie:</strong> Tisch-zu-Tisch-Routinen mit eingebauten Anekdoten der Gastgeber. Jeder Tisch bekommt seine eigene Mini-Show.</li>
                <li><strong style={{ color: INK }}>Dessert · 15–20 Min zentral — Bühnen-Pointe:</strong> Eine zentrale Bühnen-Routine für die ganze Tafel gleichzeitig — Mentaleffekt mit drei Sekunden Stille danach.</li>
              </ul>
              <p className="mb-4">10+ Magic Dinners — auch in {data.name}.</p>
              <div className="mb-2">
                <a href="/magic-dinner" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
                  Magic-Dinner-Konzept im Detail <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* IN DER NÄHE */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Zauberer in der Nähe von {data.name} gesucht?
              </h3>
              <p className="mb-4">
                Wer "Zauberer in der Nähe" oder "Magier in der Umgebung" sucht und in {data.name} oder dem
                Umkreis sitzt: Ich komme zu jedem Veranstaltungsort in {data.name} und {data.region}.
                Anfahrt im Angebot kalkuliert, keine versteckten Kosten, kurze Reaktionszeit auf Anfragen.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li>Anfrage starten für {data.name}</li>
                <li>Direkt anrufen — +49 155 63744696</li>
                <li>Ich komme zu jedem Veranstaltungsort in {data.name} und {data.region}</li>
              </ul>

              {/* ANREISE / VERFÜGBARKEIT */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Anfahrt nach {data.name} &amp; Verfügbarkeit
              </h3>
              <p className="mb-4">
                Mein Standort ist Regensburg — von dort aus betreue ich Events in ganz Bayern und
                deutschlandweit. Die Anfahrt nach {data.name} ist im Angebot transparent kalkuliert, keine
                versteckten Kosten. Pünktliches Erscheinen vor Showbeginn garantiert.
              </p>
              <p className="mb-4">
                Verfügbarkeit {year}–{year + 1}: Termine in {data.name} aktuell verfügbar. Q1 und Q2 sind
                aktuell entspannt — Q4 (Weihnachtsfeier-Saison) füllt sich erfahrungsgemäß ab Juli.
                Hochzeitstermine Mai–September am besten frühzeitig anfragen, gerade in {data.name}.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li>Anfahrt im Angebot</li>
                <li>Kein Stau-Risiko (eigene Reserve)</li>
                <li>Pünktlich vor Setup</li>
                <li>Bayern flächendeckend</li>
              </ul>
              <p className="mb-4">≤ 24 h — Termin in {data.name} sichern.</p>

              {/* GARANTIEN */}
              <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                Sechs Garantien für dein Event in {data.name}
              </h3>
              <p className="mb-4">
                Einen Zauberer in {data.name} zu buchen ist Vertrauenssache. Sechs Versprechen, die das
                Risiko für dich auf Null bringen — schriftlich im Angebot fixiert.
              </p>
              <ul className="space-y-1.5 list-disc pl-5 mb-4">
                <li><strong style={{ color: INK }}>Berufshaftpflicht:</strong> Standard-Berufshaftpflicht für Künstler greift bei jedem Auftritt in {data.name} — Sach- und Personenschäden abgesichert. Versicherungs-Nachweis auf Anfrage.</li>
                <li><strong style={{ color: INK }}>30 Min Briefing-Call:</strong> Vorab-Call zur Klärung von Anlass, Tonalität, Tabus und Insider-Anekdoten — kostenlos, ohne Verpflichtung.</li>
                <li><strong style={{ color: INK }}>24h-Antwort-Garantie:</strong> Anfragen aus {data.name} beantworte ich innerhalb 24 Stunden — meistens schneller, oft am selben Tag.</li>
                <li><strong style={{ color: INK }}>DSGVO + AVV:</strong> Datenschutz, Auftragsverarbeitungsvertrag und alle rechtlichen Grundlagen — gerade für Firmenkunden in {data.name} wichtig.</li>
                <li><strong style={{ color: INK }}>Pünktlichkeits-Versprechen:</strong> Setup 30 Min vor Showbeginn, Soundcheck inkludiert. Kein Stress vor eurer Veranstaltung in {data.name}.</li>
                <li><strong style={{ color: INK }}>Krankheits-Ersatz:</strong> Im (sehr unwahrscheinlichen) Krankheitsfall bekomme ich einen geprüften Kollegen organisiert — kein Loch im Programm.</li>
              </ul>

              {/* LOCATIONS */}
              {data.bekannteLocations && data.bekannteLocations.length > 0 && (
                <>
                  <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                    Event-Locations in {data.name}
                  </h3>
                  <p className="mb-4">
                    Ich trete regelmäßig in Locations und Venues in {data.name} auf — und komme zu jeder
                    Wunsch-Location. Schlosssäle, Hotels, Restaurants, Eventhallen.
                  </p>
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {data.bekannteLocations.map((loc) => (
                      <span
                        key={loc}
                        className="inline-flex items-center gap-2 text-[13px] px-4 py-2 rounded-full"
                        style={{ background: "#F4F6F9", border: `1px solid ${L_LINE}`, color: INK }}
                      >
                        <MapPin className="w-3.5 h-3.5" style={{ color: COBALT }} />
                        {loc}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4">
                    Deine Location ist nicht dabei? Kein Problem — ich komme zu jedem Veranstaltungsort in{" "}
                    {data.name} und Umgebung.{" "}
                    <a href={`/buchung?ort=${encodeURIComponent(data.name)}`} style={{ color: COBALT }} className="hover:underline font-semibold">
                      Jetzt anfragen →
                    </a>
                  </p>
                </>
              )}

              {/* LANG-TEXT */}
              {langParagraphs.length > 0 && (
                <>
                  <h3 className="text-[20px] md:text-[22px] font-bold mt-9 mb-3" style={{ color: INK }}>
                    Zauberer {data.name} — ausführlich erklärt
                  </h3>
                  {langParagraphs.map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))}
                </>
              )}
            </article>
          </details>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   KOLLEGEN-EMPFEHLUNG — sichtbarer externer Netzwerk-Link.
   Bewusst als eigene Section (nicht im Accordion versteckt).
   ═══════════════════════════════════════════════════════════ */
const KollegenEmpfehlungSection = ({ data }: { data: Stadt }) => {
  if (!data.kollegenEmpfehlung) return null;
  const { prefix, linkText, linkHref, suffix } = data.kollegenEmpfehlung;
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-14 md:py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={up} className="rounded-[18px] p-7 md:p-9" style={{ background: "#fff", border: `1px solid ${L_LINE}` }}>
          <Eyebrow>Empfehlung aus dem Kollegen-Netzwerk</Eyebrow>
          <p className="text-[16px] md:text-[17px] leading-[1.7]" style={{ color: L_DIM }}>
            {prefix}
            <a href={linkHref} target="_blank" rel="noopener" className="font-semibold underline underline-offset-4 transition-colors hover:decoration-[#1D3FFF]" style={{ color: INK }}>
              {linkText}
            </a>
            {suffix}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN — Reviews (Voltage ReviewsBlock, echte Bewertungen)
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => <ReviewsBlock paper />;

/* ═══════════════════════════════════════════════════════════
   FAQ — Stadt-spezifisch + Allgemein
   ═══════════════════════════════════════════════════════════ */
const FAQSection = ({ data }: { data: Stadt }) => {
  const allgemein = [
    {
      q: `Wie weit im Voraus muss ich den Zauberer in ${data.name} buchen?`,
      a: `Wochenend-Termine in ${data.name} sind 4–8 Wochen vorher meist noch frei. Kurzfristige Anfragen (1–2 Wochen) gehen je nach Auslastung — am besten direkt anfragen, ich antworte innerhalb 24 Stunden.`,
    },
    {
      q: `Welche Formate kann ich für mein Event in ${data.name} buchen?`,
      a: `Close-Up Zauberei (Tisch-zu-Tisch + Walk-Around), Bühnenshow (15–60 Min, durchkomponiert mit Comedy + Mental), Magic Dinner (Mehrgänge-Abend mit Magie zwischen den Gängen) und Moderation mit eingebauter Magie. Auch kombinierbar.`,
    },
    {
      q: `Komme ich mit dem Zauberer auch in kleinere Orte um ${data.name}?`,
      a: `Ja — ich komme zu jedem Veranstaltungsort in ${data.name} und ${data.region}. Hochzeits-Locations am Land, Restaurants im Umkreis, Firmen-Standorte außerhalb der Stadt — die Anfahrt ist im Angebot kalkuliert.`,
    },
  ];
  const items = [...(data.faq || []), ...allgemein];
  return (
    <FAQ
      eyebrow={`Zauberer ${data.name} · Häufige Fragen`}
      title={`Zauberer ${data.name} — was vorher gefragt wird.`}
      items={items}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   WEITERE STÄDTE — Internal Linking (SEO-wichtig)
   ═══════════════════════════════════════════════════════════ */
const WeitereStaedteSection = ({ current }: { current: string }) => {
  const currentData = staedte.find((s) => s.slug === current);
  const sameRegion = staedte.filter((s) => s.slug !== current && s.region === currentData?.region).slice(0, 12);
  const others = staedte.filter((s) => s.slug !== current && s.region !== currentData?.region).slice(0, 6);
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10">
          <Eyebrow>Zauberer auch in deiner Stadt</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem,4vw,3.25rem)", lineHeight: 1.05, color: INK }}>
            Über {staedte.length}+ Städte in <span style={{ color: COBALT }}>Deutschland und Österreich</span>.
          </h2>
        </motion.div>
        {sameRegion.length > 0 && (
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5" style={{ color: COBALT }}>
              Zauberer in {currentData?.region}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {sameRegion.map((s) => (
                <motion.a
                  key={s.slug}
                  variants={up}
                  href={`/zauberer/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors hover:border-[#1D3FFF]"
                  style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}
                >
                  Zauberer {s.name}
                </motion.a>
              ))}
            </div>
          </div>
        )}
        {others.length > 0 && (
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-5" style={{ color: COBALT }}>
              Deutschlandweit
            </p>
            <div className="flex flex-wrap gap-2.5">
              {others.map((s) => (
                <motion.a
                  key={s.slug}
                  variants={up}
                  href={`/zauberer/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full transition-colors hover:border-[#1D3FFF]"
                  style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}
                >
                  Zauberer {s.name}
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUIZ — Stadt-spezifischer Format-Finder (1:1 erhalten)
   ═══════════════════════════════════════════════════════════ */
const buildStadtQuizConfig = (data: Stadt): CustomQuizConfig => ({
  anlass: `Event in ${data.name}`,
  sectionEyebrow: `Format-Finder · ${data.name}`,
  sectionTitle: (
    <>
      Welcher Zauberer passt zu deinem{" "}
      <span style={{ color: ACCENT }}>Event in {data.name}</span>?
    </>
  ),
  sectionDesc: `Vier Fragen — du bekommst eine konkrete Empfehlung für dein Event in ${data.name}: Format, Dauer, ungefährer Rahmen.`,
  questions: [
    {
      id: "anlass",
      eyebrow: "Frage 01 · Anlass",
      title: <>Welcher Anlass?</>,
      hint: "Davon hängt Tonalität und Format ab.",
      feedback: "Spannend.",
      cols: 3,
      options: [
        { value: "hochzeit", label: "Hochzeit", sub: "Brautpaar im Mittelpunkt" },
        { value: "firma", label: "Firmenfeier", sub: "Vorstand, Mitarbeiter, Kunden" },
        { value: "geburtstag", label: "Geburtstag", sub: "Privat · 30er bis Goldene Hochzeit" },
        { value: "gala", label: "Gala / Award-Show", sub: "Premium-Setting, Black-Tie" },
        { value: "messe", label: "Messe / Stand", sub: "Lead-Generator-Konzept" },
        { value: "privat", label: "Privater Anlass", sub: "Jubiläum, Einweihung, sonstiges" },
      ],
    },
    {
      id: "groesse",
      eyebrow: "Frage 02 · Gästezahl",
      title: <>Wie viele Gäste?</>,
      hint: "Bestimmt Format (Close-Up vs Bühne) und Aufwand.",
      feedback: "Passt.",
      cols: 4,
      options: [
        { value: "klein", label: "Bis 30 Gäste", sub: "Intime Tafel, Close-Up ideal" },
        { value: "mittel", label: "30–80 Gäste", sub: "Tisch-zu-Tisch + Mini-Bühne" },
        { value: "gross", label: "80–250 Gäste", sub: "Bühnenshow, Headset" },
        { value: "xl", label: "250+ Gäste", sub: "Volle Bühne, größerer Saal" },
      ],
    },
    {
      id: "format",
      eyebrow: "Frage 03 · Format-Wunsch",
      title: <>Was schwebt dir vor?</>,
      hint: "Bauchgefühl ist ok — ich berate dich danach.",
      feedback: "Verstanden.",
      cols: 4,
      options: [
        { value: "closeup", label: "Close-Up Magie", sub: "Tisch-zu-Tisch / Walk-Around" },
        { value: "buehne", label: "Bühnenshow", sub: "15–60 Min durchkomponiert" },
        { value: "dinner", label: "Magic Dinner", sub: "Magie zwischen den Gängen" },
        { value: "weiss-nicht", label: "Weiß noch nicht", sub: "Empfehlung für mich" },
      ],
    },
    {
      id: "termin",
      eyebrow: "Frage 04 · Termin",
      title: <>Wann findet das Event statt?</>,
      hint: "Q4 (Weihnachtsfeiern) bitte früh anfragen.",
      feedback: "Notiert.",
      cols: 4,
      options: [
        { value: "q1q2", label: "Q1–Q2", sub: "Januar bis Juni" },
        { value: "q3", label: "Q3", sub: "Juli bis September" },
        { value: "q4", label: "Q4", sub: "Oktober bis Dezember" },
        { value: "flexibel", label: "Flexibel", sub: "Datum noch offen" },
      ],
    },
  ],
  gaesteFromAnswers: (a) => {
    const groesse = a.groesse;
    if (groesse === "klein") return 30;
    if (groesse === "mittel") return 60;
    if (groesse === "gross") return 150;
    if (groesse === "xl") return 300;
    return undefined;
  },
  recommend: (a) => {
    const { anlass, groesse, format, termin } = a;
    const stadtPart = ` in ${data.name}`;
    if (anlass === "hochzeit") {
      return {
        format: `Hochzeitszauberer${stadtPart}`,
        sub: "Close-Up beim Empfang + Bühne vor dem Tanz",
        why: `Klassischer Hochzeits-Mix: Walk-Around während des Sektempfangs als Eisbrecher zwischen den Familien, Tisch-zu-Tisch beim Dinner mit eingebauten Brautpaar-Anekdoten, kompakte Bühnen-Highlightshow direkt vor dem Eröffnungstanz. 100+ Hochzeiten Erfahrung.${termin === "q4" ? " Q4-Hochzeiten füllen sich erfahrungsgemäß schnell — gleich Anfrage stellen." : ""}`,
        link: `/hochzeit`,
      };
    }
    if (anlass === "firma") {
      return {
        format: `Firmenzauberer${stadtPart}`,
        sub:
          format === "buehne"
            ? "Bühnen-Highlight + Magie-Bridges in der Moderation"
            : "Close-Up zwischen Gängen + Bühne als Programmpunkt",
        why: `Tonalität an Unternehmenskultur angepasst, Insider-Anekdoten aus 30-Min-Briefing der Geschäftsleitung. Mentaleffekte für Vorstandsdinner, Comedy-Anteil für Weihnachtsfeier. 100+ Firmen-Engagements.${termin === "q4" ? " Weihnachtsfeier-Saison: bitte früh anfragen — Termine ab Juli oft eng." : ""}`,
        link: `/firmenfeiern`,
      };
    }
    if (anlass === "geburtstag") {
      return {
        format: `Geburtstagszauberer${stadtPart}`,
        sub: "Memory-Lane + Close-Up + Highlight-Bühne",
        why: `Anekdoten vom Geburtstagskind in Mentaleffekte eingebaut. Close-Up an den Tafeln, kompakte Bühnenshow als Höhepunkt mit personalisierter Pointe. Funktioniert von 30er bis Goldene Hochzeit.`,
        link: `/geburtstage`,
      };
    }
    if (anlass === "gala") {
      return {
        format: `Bühnenshow / Galazauberer${stadtPart}`,
        sub: "Premium-Tonalität · Mentaleffekte · Standing-Ovation",
        why: `Klassische Gala-Show — Premium-Tonalität, Mentaleffekte mit Veranstalter-Bezug, Standing-Ovation-Finale vor dem Tanz. Ideal als Programmpunkt zwischen Award-Block und Tanz.`,
        link: `/buehnenshow`,
      };
    }
    if (anlass === "messe") {
      return {
        format: `Messezauberer${stadtPart}`,
        sub: "Lead-Generator-Konzept · Stand-Aktivierung",
        why: `Ich ziehe Besucher an euren Stand, qualifiziere Leads spielerisch und mache eure Marke unvergesslich. 3× Stand-Traffic als KPI, Halbtag / Vollen Tag / Mehrtages.`,
        link: `/messe-magier`,
      };
    }
    if (format === "dinner") {
      return {
        format: `Magic Dinner${stadtPart}`,
        sub: "Mehrgänge-Abend mit Magie zwischen den Gängen",
        why: `Mein Spezialgebiet — Vorspeise/Hauptgang/Dessert plus Walk-Around, Tisch-zu-Tisch und Bühnen-Routine zum Dessert. Funktioniert in Restaurants in ${data.name} oder als geschlossener Privatabend.`,
        link: `/magic-dinner`,
      };
    }
    if (format === "closeup" || groesse === "klein") {
      return {
        format: `Close-Up Zauberer${stadtPart}`,
        sub: "Tisch-zu-Tisch · 5–7 Min pro Tafel",
        why: `Direkt an euren Tafeln in ${data.name} — Karten in Händen der Gäste, eingebaute Anekdoten, drei Sekunden Stille nach der Pointe. Ideal für ${groesse === "klein" ? "intime Tafeln bis 30 Gäste" : "Walk-Around und Sitz-Settings"}.`,
        link: `/close-up`,
      };
    }
    return {
      format: `Bühnenshow${stadtPart}`,
      sub: "15–60 Min · durchkomponierte Comedy-Zaubershow",
      why: `Durchkomponierte Bühnenshow mit Drama-Kurve, Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale. Für Galas, Firmenfeiern und größere Hochzeiten in ${data.name}.`,
      link: `/buehnenshow`,
    };
  },
});

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
const StadtSeite = () => {
  const { stadt } = useParams<{ stadt: string }>();
  const data = staedte.find((s) => s.slug === stadt);
  if (!data) return <NotFound />;

  const siteUrl = `https://www.magicel.de/zauberer/${data.slug}`;
  const title = `Zauberer ${data.name} — Hochzeit, Firmenfeier, Magic Dinner | Emilian Leber`;
  const description = `Zauberer in ${data.name} buchen: Close-Up Magie, Bühnenshow, Magic Dinner für Hochzeit, Firmenfeier, Geburtstag und Galas. 5,0★ · 30+ Bewertungen · 200+ Events · 24 h Antwort.`;
  const keywords = keywordList(data.name);

  const faqSchema =
    (data.faq?.length ?? 0) > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (data.faq ?? []).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <VoltageShell title={title} description={description} path={`/zauberer/${data.slug}`} noindex={false}>
      <Helmet>
        <meta name="keywords" content={keywords} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "EntertainmentBusiness"],
            name: `Emilian Leber — Zauberer ${data.name}`,
            url: siteUrl,
            description: `Zauberer in ${data.name}: Close-Up Magie, Bühnenshow und Magic Dinner für Hochzeit, Firmenfeier und Geburtstag.`,
            address: {
              "@type": "PostalAddress",
              addressLocality: data.name,
              addressRegion: data.region,
              addressCountry: data.region === "Österreich" ? "AT" : "DE",
            },
            telephone: "+4915563744696",
            email: "el@magicel.de",
            image: "https://www.magicel.de/og-image.jpg",
            sameAs: ["https://www.instagram.com/emilian.leber"],
            areaServed: { "@type": "City", name: data.name },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              bestRating: "5",
              worstRating: "1",
              reviewCount: "34",
            },
            serviceType: [
              `Zauberer ${data.name}`,
              `Hochzeitszauberer ${data.name}`,
              `Firmenzauberer ${data.name}`,
              `Close-Up Zauberer ${data.name}`,
              `Bühnenshow ${data.name}`,
              `Magic Dinner ${data.name}`,
              `Mentalist ${data.name}`,
              `Moderator mit Magie ${data.name}`,
            ],
            priceRange: "€€€",
            dateModified: new Date().toISOString().split("T")[0],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.magicel.de/" },
              { "@type": "ListItem", position: 2, name: "Städte", item: "https://www.magicel.de/staedte" },
              { "@type": "ListItem", position: 3, name: `Zauberer ${data.name}`, item: siteUrl },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `Zauberer ${data.name} – Emilian Leber Showreel`,
            description: `Emilian Leber als Zauberer in ${data.name} — Close-Up Magie, Bühnenshow und Magic Dinner.`,
            thumbnailUrl: `https://img.youtube.com/vi/${TVA_VIDEO_ID}/maxresdefault.jpg`,
            uploadDate: "2024-06-01",
            embedUrl: `https://www.youtube.com/embed/${TVA_VIDEO_ID}`,
            contentUrl: `https://www.youtube.com/watch?v=${TVA_VIDEO_ID}`,
          })}
        </script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <SubHero
        eyebrow={`Zauberer · ${data.name} · ${data.region}`}
        title={
          <>
            Zauberer in <span style={{ color: COBALT }}>{data.name}</span>
            <span style={{ color: MAGENTA }}>.</span>
          </>
        }
        sub={data.intro}
        image={heroStartImg}
        imageAlt={`Zauberer ${data.name} — Emilian Leber auf Events in ${data.name}`}
        imgPos="top"
        badge={`${data.name} · 200+ Events · Termine 2026 frei`}
        primary={{ label: `Zauberer ${data.name} anfragen`, href: `/buchung?ort=${encodeURIComponent(data.name)}` }}
        secondary={{ label: "Showkonzepte ansehen", href: "/close-up" }}
      />

      <LogoMarquee label={`Auftritte für Konzerne und Marken — auch in ${data.name}.`} />

      <FormateSection data={data} />
      <WarumStadtCarousel data={data} />
      <TrustStripSection data={data} />
      <AuszeichnungenSection data={data} />
      <AnlaesseSection data={data} />
      <StimmenSection />
      <AblaufBuchungSection data={data} />
      <InklusiveSection data={data} />
      <CustomQuizSection config={buildStadtQuizConfig(data)} />
      <MehrUeberStadtSection data={data} />
      <FAQSection data={data} />
      <KollegenEmpfehlungSection data={data} />
      <WeitereStaedteSection current={data.slug} />

      <FinalCTA
        title={
          <>
            Dein Event in {data.name}. <span style={{ color: MAGENTA }}>Magisch.</span>
          </>
        }
        sub={`Schick mir Datum, Anlass, Gästezahl und Location in ${data.name} — Antwort innerhalb 24 Stunden mit Konzept-Vorschlag und Angebot.`}
      />
    </VoltageShell>
  );
};

export default StadtSeite;
