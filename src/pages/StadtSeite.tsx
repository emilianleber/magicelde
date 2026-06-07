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
  Sparkles,
  ShieldCheck,
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
import {
  SplitFeature,
  FormatCards,
  InteractiveTabs,
  WarumCarousel,
  ExampleSets,
  DarkShowcase,
} from "@/components/voltage/creative";
import { COBALT, MAGENTA, INK, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";
import { CustomQuizSection, CustomQuizConfig } from "@/components/landing/CustomQuiz";
import { TVA_VIDEO_ID } from "@/lib/videos";

import heroStartImg from "@/assets/hero-start.jpg";
import stageImg from "@/assets/buehne-zuschauer.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import staunenImg from "@/assets/staunen.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";
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
   WARUM-STADT — Editorial Split (highlight + seoText)
   ═══════════════════════════════════════════════════════════ */
const WarumStadtSection = ({ data }: { data: Stadt }) => (
  <SplitFeature
    eyebrow="Zauberer · Zauberkünstler · Magier · Mentalist"
    title={
      <>
        Warum einen Zauberer in <span style={{ color: COBALT }}>{data.name}</span> buchen?
      </>
    }
    sub={
      <>
        {data.highlight}
        {data.seoText && (
          <>
            <br />
            <br />
            {data.seoText}
          </>
        )}
      </>
    }
    points={[
      "Close-Up Magie & Tischzauberei",
      "Bühnenshow mit Comedy & Mentalmagie",
      "Magic Dinner — Magie zwischen den Gängen",
      "Moderation mit eingebauter Magie",
    ]}
    image={audienceImg}
    imageAlt={`Publikum reagiert auf den Zauberer in ${data.name}`}
    imgPos="top"
    stat={{ v: "200+", l: `Events seit 2016 — auch in ${data.region}` }}
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
   FORMATE — 3 Showformate (Close-Up / Bühnenshow / Magic Dinner)
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
   HOCHZEITSMAGIER-STADT — Vertiefung Keyword "Hochzeitszauberer [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const HochzeitsmagierStadtSection = ({ data }: { data: Stadt }) => (
  <>
  <SplitFeature
    eyebrow={`Hochzeitszauberer ${data.name}`}
    title={
      <>
        Magie beim Sektempfang. <span style={{ color: COBALT }}>Beim Dinner. Vor dem Tanz.</span>
      </>
    }
    sub={
      <>
        Ein Hochzeitszauberer in {data.name} bringt drei Phasen zum Glänzen: Walk-Around beim
        Sektempfang als Eisbrecher zwischen Familien, Tisch-zu-Tisch beim Hochzeitsdinner mit
        eingebauten Brautpaar-Anekdoten und eine kompakte Bühnen-Highlightshow vor dem
        Eröffnungstanz. 100+ Hochzeiten bayernweit — das Setup steht.
        <br />
        <br />
        Egal ob klassische kirchliche Hochzeit, freie Trauung oder standesamtliche Feier in{" "}
        {data.name} — eingebaute Magie ist die Pointe, die deine Gäste noch Jahre später erzählen
        werden. Mit Brautpaar-Briefing vorab, damit eure Geschichte Teil der Show wird.
      </>
    }
    points={[
      `Empfang — Walk-Around · 30–60 Min · Eisbrecher zwischen Gästen in ${data.name}.`,
      "Dinner — Tisch-zu-Tisch · 5–7 Min pro Tafel · eingebaute Brautpaar-Anekdoten.",
      "Vor dem Tanz — Bühnen-Highlight · 15–20 Min · Standing-Ovation-Finale vor der Tanzeröffnung.",
      `100+ Hochzeiten · auch in ${data.name} und ${data.region}`,
    ]}
    image={weddingImg}
    imageAlt={`Hochzeitszauberer in ${data.name} beim Brautpaar`}
    imgPos="center"
  />
  <div className="px-5 md:px-10 -mt-8 md:-mt-12 pb-4">
    <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
      <a href="/hochzeit" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
        Hochzeitszauberer-Konzept ansehen <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
      <a href={`/buchung?ort=${encodeURIComponent(data.name)}&format=Hochzeit`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase transition-colors hover:border-[#1D3FFF]" style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}>
        Hochzeit in {data.name} anfragen <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
  </>
);

/* ═══════════════════════════════════════════════════════════
   ANLÄSSE — Keyword-Coverage Hochzeit/Firmenfeier/Geburtstag etc.
   ═══════════════════════════════════════════════════════════ */
const AnlaesseSection = ({ data }: { data: Stadt }) => {
  const ANLAESSE = [
    {
      Icon: Heart,
      keyword: `Hochzeitszauberer ${data.name}`,
      label: `Zauberer für Hochzeit in ${data.name}`,
      body: `Sektempfang, Dinner, Party — auf eurer Hochzeit in ${data.name} sorgt der Hochzeitszauberer für magische Momente. Tisch-zu-Tisch beim Dinner, Bühnenshow vor dem Tanz, eingebaute Brautpaar-Anekdoten.`,
      link: "/hochzeit",
    },
    {
      Icon: Briefcase,
      keyword: `Firmenzauberer ${data.name}`,
      label: `Zauberer für Firmenfeier in ${data.name}`,
      body: `Weihnachtsfeier, Sommerfest, Jubiläum, Kick-off — moderner Firmenzauberer für Corporate Events in ${data.name}. Insider-Pointen aus dem Briefing, Magie-Bridges, Vorstand-tauglich.`,
      link: "/firmenfeiern",
    },
    {
      Icon: Cake,
      keyword: `Geburtstagszauberer ${data.name}`,
      label: `Zauberer für Geburtstag in ${data.name}`,
      body: `Runder Geburtstag, Überraschungsparty, Familienfeier in ${data.name} — Comedy-Zauberer mit Memory-Lane-Routinen, eingebauten Anekdoten und Pull-Quote-Momenten. Funktioniert von 30er bis Goldene Hochzeit.`,
      link: "/geburtstage",
    },
    {
      Icon: Building2,
      keyword: `Galazauberer ${data.name}`,
      label: `Zauberer für Galas in ${data.name}`,
      body: `Award-Show, Charity-Gala, Black-Tie-Event in ${data.name} — Premium-Tonalität, Mentaleffekte mit Veranstalter-Bezug, Standing-Ovation-Finale vor dem Tanz.`,
      link: "/buehnenshow",
    },
    {
      Icon: GraduationCap,
      keyword: `Messezauberer ${data.name}`,
      label: `Zauberer für Messe in ${data.name}`,
      body: `Messeauftritt, Stand-Aktivierung, Kongress-Entertainment in ${data.name} — ich ziehe Besucher zum Stand, qualifiziere Leads spielerisch und mache eure Marke unvergesslich.`,
      link: "/messe-magier",
    },
    {
      Icon: PartyPopper,
      keyword: `Zauberer buchen ${data.name}`,
      label: `Private Feiern & Jubiläen in ${data.name}`,
      body: `Jubiläum, Einweihung, Sommerfest oder einfach besonderer Anlass in ${data.name} — Zauberer buchen mit persönlicher Beratung, individuellem Konzept und 24-Stunden-Antwort.`,
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
            Für jeden Anlass in {data.name} der passende Zauberer. Hochzeit, Firmenfeier, Geburtstag,
            Gala, Messe oder private Feier — alle Formate, alle Tonalitäten.
          </p>
        </motion.div>
        <ul className="divide-y" style={{ borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}`, borderColor: L_LINE }}>
          {ANLAESSE.map((a, i) => (
            <motion.li
              key={a.keyword}
              variants={up}
              className="group grid grid-cols-[56px_1fr_auto] md:grid-cols-[88px_1fr_auto] items-baseline gap-5 md:gap-10 py-7 md:py-10"
              style={{ borderColor: L_LINE }}
            >
              <span className="text-3xl md:text-5xl font-extrabold tabular-nums leading-none" style={{ color: COBALT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                  <a href={a.link} className="text-xl md:text-2xl font-bold leading-tight transition-colors hover:text-[#1D3FFF]" style={{ color: INK }}>
                    {a.label}
                  </a>
                  <span className="text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: COBALT }}>
                    {a.keyword}
                  </span>
                </div>
                <p className="text-[15.5px] leading-[1.65] max-w-3xl mb-3" style={{ color: L_DIM }}>
                  {a.body}
                </p>
                <span className="inline-flex items-center gap-1.5">
                  <a.Icon className="w-3.5 h-3.5" style={{ color: COBALT }} />
                  <a href={a.link} className="text-[12px] tracking-[0.08em] uppercase font-semibold" style={{ color: COBALT }}>
                    Mehr erfahren →
                  </a>
                </span>
              </div>
              <a
                href={a.link}
                aria-label={`Mehr zu ${a.label}`}
                className="hidden md:inline-flex items-center justify-center w-11 h-11 rounded-full transition-all group-hover:bg-[#1D3FFF] group-hover:text-white self-start mt-2"
                style={{ color: "rgba(10,11,15,0.3)", border: `1px solid ${L_LINE}` }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FIRMENZAUBERER-STADT — Vertiefung Keyword "Firmenzauberer [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const FirmenzaubererStadtSection = ({ data }: { data: Stadt }) => (
  <>
  <SplitFeature
    reverse
    eyebrow={`Firmenzauberer ${data.name}`}
    title={
      <>
        Corporate-Entertainment, das <span style={{ color: COBALT }}>der Vorstand zückt</span>.
      </>
    }
    sub={
      <>
        Ein Firmenzauberer in {data.name} braucht mehr als Tricks — er braucht Tonalitätsgefühl.
        Vorstandsabend anders als Mitarbeiter-Weihnachtsfeier, Sales-Kickoff anders als Jubiläum.
        Mit Briefing-Call der Geschäftsleitung baue ich Insider-Pointen ein, die nur in eurem Saal
        funktionieren.
        <br />
        <br />
        Premium-Beispiel: 200 Gäste, Versicherungs-Konzern in {data.region}, Vorstandsvorsitzender
        zückte selbst drei Minuten nach Übergabe die Karten. Berufshaftpflicht, DSGVO + AVV
        abgesichert, Tech-Rider auf Anfrage.
      </>
    }
    points={[
      `Weihnachtsfeier — Klassiker im Q4 · Mitarbeiter und Partner in ${data.name}.`,
      "Vorstandsdinner — Premium-Tonalität, leise Mentaleffekte, drei Sekunden Stille.",
      "Sales-Kickoff — energetisch, eingebaute Pointen aus dem Briefing der Geschäftsleitung.",
      "Jubiläum / Firmenfest — Sommerfeste, Geburtstage des Unternehmens, Mitarbeiter-Events.",
    ]}
    image={stageImg}
    imageAlt={`Firmenzauberer auf der Bühne in ${data.name}`}
    imgPos="top"
    stat={{ v: "100+", l: "Firmen-Engagements · Bayern + DE" }}
  />
  <div className="px-5 md:px-10 -mt-8 md:-mt-12 pb-4">
    <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
      <a href="/firmenfeiern" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase" style={{ background: COBALT, color: "#fff" }}>
        Firmenfeier-Konzept ansehen <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
      <a href={`/buchung?ort=${encodeURIComponent(data.name)}&format=Firma`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase transition-colors hover:border-[#1D3FFF]" style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}>
        Firmenfeier {data.name} anfragen <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  </div>
  </>
);

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
    sub={`Den Zauberer für dein Event in ${data.name} zu buchen, ist nicht kompliziert — kein PDF-Fragebogen, keine Vertragsklauseln vorab. Vier transparente Schritte vom ersten Kontakt bis zur Show.`}
    items={[
      {
        t: "Anfrage",
        d: `Du schickst mir Datum, Anlass, Gästezahl und Wunsch-Location in ${data.name}. Über das Formular, per Email an el@magicel.de oder telefonisch. Antwort innerhalb 24 Stunden — meistens schneller.`,
      },
      {
        t: "Briefing-Call",
        d: `30-Min-Telefonat zu deinem Event in ${data.name}: Anlass im Detail, Publikum, Tonalität (festlich, casual, Premium), gewünschtes Format, Insider-Anekdoten für eingebaute Mentaleffekte.`,
      },
      {
        t: `Show in ${data.name}`,
        d: `Setup 30 Min vor Showbeginn, Soundcheck (falls Bühne), dann die Show. Close-Up beim Sektempfang, Tisch-zu-Tisch beim Dinner, Bühne vor dem Tanz — je nach gebuchtem Format.`,
      },
      {
        t: "Nachbereitung",
        d: `Innerhalb 48 Stunden nach dem Event kurze Nachfrage zu deinem Erlebnis in ${data.name}. Optionale ProvenExpert-Bewertung, falls du wirklich zufrieden warst — sonst kein Druck.`,
      },
    ]}
  />
);

/* ═══════════════════════════════════════════════════════════
   MAGIC-DINNER-STADT — Vertiefung Keyword "Magic Dinner [Stadt]"
   ═══════════════════════════════════════════════════════════ */
const MagicDinnerStadtSection = ({ data }: { data: Stadt }) => (
  <ExampleSets
    eyebrow={`Magic Dinner ${data.name}`}
    title={
      <>
        Drei Gänge. Drei <span style={{ color: COBALT }}>Magie-Routinen.</span>
      </>
    }
    sub={`Magic Dinner ist mein Spezialgebiet — Mehrgänge-Abend mit Close-Up zwischen den Gängen und Bühnen-Höhepunkt zum Dessert. Funktioniert in Restaurants in ${data.name} oder als geschlossener Privatabend.`}
    sets={[
      {
        tag: "Vorspeise · 20 Min pro Tisch",
        t: "Eisbrecher",
        d: `Walk-Around zwischen den Plätzen, Karten in die Hände der Gäste, kleine Wow-Effekte direkt am Tisch in ${data.name}.`,
      },
      {
        tag: "Hauptgang · 5–7 Min pro Tisch",
        t: "Tafel-Magie",
        d: `Tisch-zu-Tisch-Routinen mit eingebauten Anekdoten der Gastgeber. Jeder Tisch bekommt seine eigene Mini-Show.`,
      },
      {
        tag: "Dessert · 15–20 Min zentral",
        t: "Bühnen-Pointe",
        d: `Eine zentrale Bühnen-Routine für die ganze Tafel gleichzeitig — Mentaleffekt mit drei Sekunden Stille danach.`,
      },
    ]}
    options={[
      { Icon: UtensilsCrossed, t: "Magic Dinner-Konzept im Detail", d: "ganzer Abend" },
      { Icon: Sparkles, t: `10+ Magic Dinners`, d: `auch in ${data.name}` },
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
   IN DER NÄHE — geo-search keyword coverage
   ═══════════════════════════════════════════════════════════ */
const InDerNaeheSection = ({ data }: { data: Stadt }) => (
  <SplitFeature
    eyebrow="Zauberer in der Nähe gesucht?"
    title={
      <>
        Du bist in {data.name} oder Umgebung — <span style={{ color: COBALT }}>ich bin hier</span>.
      </>
    }
    sub={`Wer "Zauberer in der Nähe" oder "Magier in der Umgebung" sucht und in ${data.name} oder dem Umkreis sitzt: Ich komme zu jedem Veranstaltungsort in ${data.name} und ${data.region}. Anfahrt im Angebot kalkuliert, keine versteckten Kosten, kurze Reaktionszeit auf Anfragen.`}
    points={[
      `Anfrage starten für ${data.name}`,
      "Direkt anrufen — +49 155 63744696",
      `Ich komme zu jedem Veranstaltungsort in ${data.name} und ${data.region}`,
    ]}
    image={schneiderImg}
    imageAlt={`Zauberer in der Nähe von ${data.name}`}
    imgPos="top"
  />
);

/* ═══════════════════════════════════════════════════════════
   LOCATIONS — bekannte Venues der Stadt
   ═══════════════════════════════════════════════════════════ */
const LocationsSection = ({ data }: { data: Stadt & { bekannteLocations: string[] } }) => (
  <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
    <div className="max-w-7xl mx-auto">
      <motion.div variants={up} className="max-w-3xl mb-10">
        <Eyebrow>Event-Locations in {data.name}</Eyebrow>
        <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3.4rem)", lineHeight: 1.04, color: INK }}>
          In den <span style={{ color: COBALT }}>bekanntesten Locations</span> der Stadt.
        </h2>
        <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
          Ich trete regelmäßig in Locations und Venues in {data.name} auf — und komme zu jeder
          Wunsch-Location. Schlosssäle, Hotels, Restaurants, Eventhallen.
        </p>
      </motion.div>
      <motion.div variants={up} className="flex flex-wrap gap-3">
        {data.bekannteLocations.map((loc) => (
          <span
            key={loc}
            className="inline-flex items-center gap-2 text-sm px-5 py-3 rounded-full transition-colors"
            style={{ background: "#fff", border: `1px solid ${L_LINE}`, color: INK }}
          >
            <MapPin className="w-3.5 h-3.5" style={{ color: COBALT }} />
            {loc}
          </span>
        ))}
      </motion.div>
      <motion.p variants={up} className="mt-10 text-[15px] md:text-base leading-relaxed max-w-2xl" style={{ color: L_DIM }}>
        Deine Location ist nicht dabei? Kein Problem — ich komme zu jedem Veranstaltungsort in{" "}
        {data.name} und Umgebung.{" "}
        <a href={`/buchung?ort=${encodeURIComponent(data.name)}`} style={{ color: COBALT }} className="hover:underline font-semibold">
          Jetzt anfragen →
        </a>
      </motion.p>
    </div>
  </motion.section>
);

/* ═══════════════════════════════════════════════════════════
   GARANTIEN — Trust Signals
   ═══════════════════════════════════════════════════════════ */
const GarantienSection = ({ data }: { data: Stadt }) => {
  const GARANTIEN = [
    { tag: "Versicherung", t: "Berufshaftpflicht", d: `Standard-Berufshaftpflicht für Künstler greift bei jedem Auftritt in ${data.name} — Sach- und Personenschäden abgesichert. Versicherungs-Nachweis auf Anfrage.` },
    { tag: "Vorbereitung", t: "30 Min Briefing-Call", d: `Vorab-Call zur Klärung von Anlass, Tonalität, Tabus und Insider-Anekdoten — kostenlos, ohne Verpflichtung.` },
    { tag: "Reaktion", t: "24h-Antwort-Garantie", d: `Anfragen aus ${data.name} beantworte ich innerhalb 24 Stunden — meistens schneller, oft am selben Tag.` },
    { tag: "Recht", t: "DSGVO + AVV", d: `Datenschutz, Auftragsverarbeitungsvertrag und alle rechtlichen Grundlagen — gerade für Firmenkunden in ${data.name} wichtig.` },
    { tag: "Verlässlichkeit", t: "Pünktlichkeits-Versprechen", d: `Setup 30 Min vor Showbeginn, Soundcheck inkludiert. Kein Stress vor eurer Veranstaltung in ${data.name}.` },
    { tag: "Ausfallschutz", t: "Krankheits-Ersatz", d: `Im (sehr unwahrscheinlichen) Krankheitsfall bekomme ich einen geprüften Kollegen organisiert — kein Loch im Programm.` },
  ];
  return (
    <ExampleSets
      eyebrow="Was ich garantiere"
      title={
        <>
          Sechs <span style={{ color: COBALT }}>Garantien</span> für dein Event in {data.name}.
        </>
      }
      sub={`Einen Zauberer in ${data.name} zu buchen ist Vertrauenssache. Sechs Versprechen, die das Risiko für dich auf Null bringen — schriftlich im Angebot fixiert.`}
      sets={GARANTIEN}
      options={[{ Icon: ShieldCheck, t: "Risk auf Null", d: "im Angebot schriftlich fixiert" }]}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   ANREISE / VERFÜGBARKEIT — geo + freshness signal
   ═══════════════════════════════════════════════════════════ */
const AnreiseVerfuegbarkeitSection = ({ data }: { data: Stadt }) => {
  const year = new Date().getFullYear();
  return (
    <SplitFeature
      reverse
      eyebrow={`Anfahrt nach ${data.name}`}
      title={
        <>
          Schnell zu dir nach <span style={{ color: COBALT }}>{data.name}</span>.
        </>
      }
      sub={
        <>
          Mein Standort ist Regensburg — von dort aus betreue ich Events in ganz Bayern und
          deutschlandweit. Die Anfahrt nach {data.name} ist im Angebot transparent kalkuliert, keine
          versteckten Kosten. Pünktliches Erscheinen vor Showbeginn garantiert.
          <br />
          <br />
          Verfügbarkeit {year}–{year + 1}: Termine in {data.name} aktuell verfügbar. Q1 und Q2 sind
          aktuell entspannt — Q4 (Weihnachtsfeier-Saison) füllt sich erfahrungsgemäß ab Juli.
          Hochzeitstermine Mai–September am besten frühzeitig anfragen, gerade in {data.name}.
        </>
      }
      points={[
        "Anfahrt im Angebot",
        "Kein Stau-Risiko (eigene Reserve)",
        "Pünktlich vor Setup",
        "Bayern flächendeckend",
      ]}
      image={staunenImg}
      imageAlt={`Anfahrt und Verfügbarkeit für ${data.name}`}
      imgPos="top"
      stat={{ v: "≤ 24 h", l: `Termin in ${data.name} sichern` }}
    />
  );
};

/* ═══════════════════════════════════════════════════════════
   STIMMEN — Reviews (Voltage ReviewsBlock, echte Bewertungen)
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => <ReviewsBlock paper={false} />;

/* ═══════════════════════════════════════════════════════════
   VIDEO — Showreel (TVA)
   ═══════════════════════════════════════════════════════════ */
const VideoSection = ({ data }: { data: Stadt }) => {
  const videoId = TVA_VIDEO_ID;
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-4xl mx-auto">
        <motion.div variants={up} className="max-w-2xl mx-auto text-center mb-10">
          <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: L_DIM }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
            Showreel
          </p>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3rem)", lineHeight: 1.04, color: INK }}>
            Sieh dir den <span style={{ color: COBALT }}>Zauberer</span> an.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Erster Eindruck vom Zauberer für {data.name} — Auszug aus Auftritten auf Firmenfeiern,
            Hochzeiten und Galas in Bayern.
          </p>
        </motion.div>
        <motion.div variants={up} className="relative aspect-video overflow-hidden rounded-[24px]" style={{ border: `1px solid ${L_LINE}` }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1`}
            title={`Zauberer ${data.name} – Emilian Leber Showreel`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL-QUOTE — dark full-bleed mit Stadt-Bezug
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = ({ data }: { data: Stadt }) => (
  <DarkShowcase
    eyebrow="Was nach jedem Auftritt passiert"
    title={
      <>
        Drei Sekunden Stille. <span style={{ color: "#9db0ff" }}>Dann lacht ein Saal in {data.name}.</span>
      </>
    }
    paras={[
      `Karten in den Händen der Gäste, ein Mentaleffekt mit Veranstalter-Bezug, eine Pointe, die nur in eurem Saal in ${data.name} funktioniert.`,
      `Drei Sekunden Stille — dann lacht der ganze Saal. Das ist der Moment, über den deine Gäste in ${data.name} noch Jahre später reden.`,
    ]}
    image={staunenImg}
    imageAlt={`Staunen beim Zauberer in ${data.name}`}
    imgPos="top"
    badge="200+ Events"
  />
);

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
   LANG-TEXT — SEO-Text unten
   ═══════════════════════════════════════════════════════════ */
const LangTextSection = ({ data }: { data: Stadt }) => {
  if (!data.langText) return null;
  const paragraphs = data.langText.split("\n\n").filter(Boolean);
  return (
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: "#F4F6F9", borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-3xl mx-auto">
        <motion.div variants={up} className="text-center mb-10">
          <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: L_DIM }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />
            Alles, was du wissen musst
          </p>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.4vw,3rem)", lineHeight: 1.05, color: INK }}>
            Zauberer {data.name} — <span style={{ color: COBALT }}>ausführlich erklärt.</span>
          </h2>
        </motion.div>
        <div className="space-y-6 md:space-y-7">
          {paragraphs.map((p, i) => (
            <motion.p key={i} variants={up} className="text-[16px] md:text-lg leading-[1.8]" style={{ color: "#3a3833" }}>
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   KOLLEGEN-EMPFEHLUNG
   ═══════════════════════════════════════════════════════════ */
const KollegenEmpfehlungSection = ({ empfehlung }: { empfehlung: KollegenEmpfehlung }) => (
  <section className="px-5 md:px-10 py-10 md:py-14">
    <div className="max-w-2xl mx-auto">
      <p className="text-[14px] md:text-[15px] leading-relaxed text-center" style={{ color: L_DIM }}>
        {empfehlung.prefix}
        <a href={empfehlung.linkHref} target="_blank" rel="noopener" className="underline underline-offset-4 transition-colors hover:decoration-[#1D3FFF]" style={{ color: INK }}>
          {empfehlung.linkText}
        </a>
        {empfehlung.suffix}
      </p>
    </div>
  </section>
);

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

      <WarumStadtSection data={data} />
      <TrustStripSection data={data} />
      <FormateSection data={data} />
      <HochzeitsmagierStadtSection data={data} />
      <AnlaesseSection data={data} />
      <FirmenzaubererStadtSection data={data} />
      <AblaufBuchungSection data={data} />
      <MagicDinnerStadtSection data={data} />
      <WarumStadtCarousel data={data} />
      <PullQuoteSection data={data} />
      <InDerNaeheSection data={data} />
      {data.bekannteLocations && data.bekannteLocations.length > 0 && (
        <LocationsSection data={data as Stadt & { bekannteLocations: string[] }} />
      )}
      <GarantienSection data={data} />
      <AnreiseVerfuegbarkeitSection data={data} />
      <CustomQuizSection config={buildStadtQuizConfig(data)} />
      <StimmenSection />
      <VideoSection data={data} />
      <FAQSection data={data} />
      <LangTextSection data={data} />
      {data.kollegenEmpfehlung && <KollegenEmpfehlungSection empfehlung={data.kollegenEmpfehlung} />}
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
