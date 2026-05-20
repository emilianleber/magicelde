import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";
import {
  Search,
  Star,
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Sparkles,
  Wrench,
  Coins,
  Info,
  HelpCircle,
} from "lucide-react";

/* ════════════════════════════════════════════════════════
   DESIGN-TOKENS
   ════════════════════════════════════════════════════════ */
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const CREAM = "#fafafa";

/* ════════════════════════════════════════════════════════
   KEYFRAMES
   ════════════════════════════════════════════════════════ */
const PageKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    @keyframes successPop { 0% { opacity: 0; transform: scale(0.85) translateY(20px); } 60% { opacity: 1; transform: scale(1.04) translateY(0); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
    @keyframes faqFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .success-pop { animation: successPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .faq-fade-in { animation: faqFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  `}</style>
);

/* ════════════════════════════════════════════════════════
   FAQ-DATEN — 25+ Fragen über 5 Kategorien
   ════════════════════════════════════════════════════════ */
type TabKey =
  | "allgemein"
  | "buchung"
  | "formate"
  | "technik"
  | "preise";

type FAQItemT = {
  id: string;
  category: TabKey;
  q: string;
  a: string;
};

const FAQ_ITEMS: FAQItemT[] = [
  /* ───────── Allgemein ───────── */
  {
    id: "wer-ist-emilian",
    category: "allgemein",
    q: "Wer ist Emilian Leber?",
    a: "Geboren 2008, Magier seit dem 8. Lebensjahr, erster bezahlter Gig mit 12. Heute hauptberuflich als Bühnen-, Close-Up- und Magic-Dinner-Künstler — Schwerpunkt Bayern, deutschlandweit buchbar. 5,0 Sterne bei 30+ verifizierten Bewertungen, über 200 gespielte Events seit 2015.",
  },
  {
    id: "wo-trete-ich-auf",
    category: "allgemein",
    q: "Wo trete ich auf?",
    a: "Schwerpunkt Bayern — Regensburg, München, Nürnberg, Augsburg, Ingolstadt, Passau, Landshut. Deutschlandweit gerne mit transparent kalkulierter Anfahrt. Österreich und Schweiz auf Anfrage, ggf. mit Übernachtung.",
  },
  {
    id: "sprachen",
    category: "allgemein",
    q: "In welcher Sprache trete ich auf?",
    a: "Standard ist Deutsch. Englische Shows sind auf Anfrage möglich — z. B. internationale Firmen-Events, B2B-Galas mit ausländischen Gästen oder Hochzeiten mit englischsprachigen Partnern.",
  },
  {
    id: "tonalitaet",
    category: "allgemein",
    q: "Wie ist meine Tonalität?",
    a: "Vom feinen Premium-Auftritt für Vorstands-Galas bis zur Comedy-lastigen Show für Geburtstage und Hochzeiten — alles innerhalb derselben Künstlerpersönlichkeit, dosiert nach Anlass. Wir besprechen Erwartung und No-Gos vorab.",
  },
  {
    id: "auszeichnungen",
    category: "allgemein",
    q: "Welche Auszeichnungen habe ich?",
    a: "Greatest Talent 2023 — Finalist (TV-Show, SAT.1). Talents of Magic 2024 — Finalist + Kreativpreis. Deutsche Jugendmeisterschaft der Magie — Top 30. TVA-TV-Interview 2024. 5,0 Sterne auf ProvenExpert und Google. 2026: Eigenes Bühnenprogramm [Plötzlich Magie — Magic Meets Comedy] (Premiere 22.02.2026 Alte Mälzerei Regensburg).",
  },
  {
    id: "seit-wann",
    category: "allgemein",
    q: "Seit wann mache ich Zauberei?",
    a: "Erster Trick mit 8 Jahren — Münzen verschwinden lassen am Esstisch. Mit 12 erster bezahlter Auftritt (Kindergeburtstag), mit 16 das erste TVA-Interview. Heute hauptberuflich, mit eigener abendfüllender Show seit 2023.",
  },

  /* ───────── Buchung & Ablauf ───────── */
  {
    id: "wie-buchen",
    category: "buchung",
    q: "Wie buche ich?",
    a: "Drei Wege: (1) Anfrage über das Buchungsformular auf /buchung, (2) Show-Planer-Modal (am unteren Bildschirmrand, oder mit Anker #planer), (3) direkt per Email an el@magicel.de oder Telefon. Antwort kommt persönlich innerhalb von 24 Stunden.",
  },
  {
    id: "vorlauf",
    category: "buchung",
    q: "Wie lange im Voraus sollte gebucht werden?",
    a: "Wochenenden in der Hochsaison (Mai–September, Dezember) brauchen 8–12 Wochen Vorlauf, normale Termine 4–6 Wochen. Kurzfristige Anfragen prüfe ich gern — manchmal geht auch noch was in 2 Wochen.",
  },
  {
    id: "vertrag",
    category: "buchung",
    q: "Bekomme ich einen schriftlichen Vertrag?",
    a: "Ja — schriftlicher Vertrag (Email oder PDF mit Unterschrift) mit allen relevanten Details: Datum, Uhrzeit, Format, Dauer, Honorar inkl. ausgewiesener Umsatzsteuer, Anfahrt, Übernachtung (falls nötig), Tech-Anforderungen, Tabu-Themen, Stornierungsbedingungen.",
  },
  {
    id: "stornierung",
    category: "buchung",
    q: "Wie ist die Stornierungsregel?",
    a: "Die Staffel ist in den AGB festgehalten: bis 30 Tage vorher 55 % Gage, bis 20 Tage 75 %, bis 14 Tage 100 %. Bei höherer Gewalt (Pandemie, behördliche Anordnung) wird die Anzahlung vollständig erstattet. Details unter /agb § 5.",
  },
  {
    id: "vorgespraech",
    category: "buchung",
    q: "Gibt es ein Vorgespräch?",
    a: "Ja — kostenloses 30-Minuten-Vorgespräch per Telefon oder Video. Wir besprechen Anlass, Gästezahl, Location, gewünschte Tonalität und Tabus. Das Briefing ist Grundlage für ein präzises Angebot.",
  },
  {
    id: "antwortzeit",
    category: "buchung",
    q: "Wie schnell antworte ich auf Anfragen?",
    a: "Innerhalb von 24 Stunden, an Werktagen meist deutlich schneller (oft am selben Vormittag). Persönlich, nicht über ein Office-Team — wer schreibt, bekommt Antwort von mir direkt.",
  },

  /* ───────── Formate & Show ───────── */
  {
    id: "close-up",
    category: "formate",
    q: "Was ist Close-Up-Magie?",
    a: "Magie direkt an den Gästetischen — Karten, Münzen, Mentalmagie und Borrowed-Object-Effekte. Ich gehe von Tisch zu Tisch, 5–7 Minuten pro Tafel, 50–80 Gäste in 90 Minuten. Ideal für Stehempfänge, Hochzeitsempfänge und Dinner-Pausen.",
  },
  {
    id: "buehnenshow-dauer",
    category: "formate",
    q: "Wie lange ist eine Bühnenshow?",
    a: "Klassische Slots: 15 Minuten Show-Act, 30 Minuten Highlight-Show, 45–60 Minuten abendfüllend. Alle Längen sind durchkomponiert mit Drama-Kurve, Comedy-Pointen und Finale. Längere Slots haben dramaturgische Bögen, keine Aneinanderreihung von Tricks.",
  },
  {
    id: "magic-dinner",
    category: "formate",
    q: "Was ist ein Magic Dinner?",
    a: "Mehrgänge-Abend (3–5 Gänge), zwischen den Gängen kommt die Magie zu jedem Tisch. Wir kooperieren mit dem Restaurant Wald & Wiese in Sinzing bei Regensburg, aber auch in Eurer Location umsetzbar. Format zwischen 2,5 und 4 Stunden, mit Bühnen-Finale optional.",
  },
  {
    id: "moderation-magie",
    category: "formate",
    q: "Was ist Moderation mit Magie?",
    a: "Ich moderiere euren Programmablauf und baue zwischen den Punkten kleine Zauber-Bridges ein — als roten Faden für die ganze Show. Comedy-Anteil dosierbar von zurückhaltend-elegant bis stark. Funktioniert für Galas, Award-Shows, Firmen-Events und Hochzeiten gleich gut.",
  },
  {
    id: "mentalmagie",
    category: "formate",
    q: "Was ist Mentalmagie?",
    a: "Vorhersagen, scheinbares Gedankenlesen, Persönlichkeits-Effekte. Mehr Theater als Trick — und genau deshalb so wirksam. Drei Sekunden Stille im Saal, dann Applaus. Mentalmagie passt besonders gut zu B2B-Events und Premium-Hochzeiten.",
  },
  {
    id: "comedy-anteil",
    category: "formate",
    q: "Kann der Comedy-Anteil dosiert werden?",
    a: "Ja, vollständig. Wir stimmen vorab ab: von [elegant-zurückhaltend, ein paar feine Pointen] bis [Comedy-lastig, das Publikum lacht durchgehend]. Beides funktioniert — die Magie bleibt gleich stark, nur das Stilkleid wechselt.",
  },
  {
    id: "tabus",
    category: "formate",
    q: "Welche Themen sind tabu?",
    a: "Standardmäßig tabu: religiöse Witze, Politik, expliziter Sex-Humor, alles auf Kosten einzelner Gäste. Eure individuellen Tabus (z. B. Krankheit eines Anwesenden, Trennung im Familienkreis) sprechen wir im Briefing ab.",
  },
  {
    id: "kombination",
    category: "formate",
    q: "Kann ich Formate kombinieren?",
    a: "Sehr gerne — z. B. Close-Up beim Empfang + Bühnenshow nach dem Hauptgang. Oder Magic Dinner + Moderation des Abendprogramms. Das Honorar verteilt sich dann auf einen längeren Slot, ist aber nicht die Summe zweier Einzel-Honorare.",
  },

  /* ───────── Technik & Logistik ───────── */
  {
    id: "mikrofon",
    category: "technik",
    q: "Brauche ich ein Mikrofon?",
    a: "Ab ca. 80 Gästen ja — sonst gehen Pointen verloren. Ich bringe ein professionelles Sennheiser EW-Headset selbst mit, falls vor Ort nichts passt. Für Close-Up kein Mikro nötig.",
  },
  {
    id: "sound",
    category: "technik",
    q: "Wie ist die Sound-Anforderung?",
    a: "Eure Anlage mit XLR- oder Klinken-Eingang reicht — ich komme mit Backing-Tracks auf USB-Stick. Falls keine Anlage vor Ort: Mini-PA-System (für bis 60 Gäste) bringe ich auf Wunsch mit. Bei größeren Sälen läuft der Sound über euren Tontechniker.",
  },
  {
    id: "licht",
    category: "technik",
    q: "Wie ist die Licht-Anforderung?",
    a: "Frontspot reicht — keine spezielle Programmierung nötig. Für Highlight-Momente ist Black-out + zentraler Spot ideal. Bei TV-Bedingungen oder Gala-Setups planen wir die Lichtfolge gemeinsam mit eurem Lichttechniker durch.",
  },
  {
    id: "buehnenmasse",
    category: "technik",
    q: "Welche Bühnenmaße brauche ich?",
    a: "Minimum 2 × 1,5 Meter mit klarer Sicht aufs Publikum. Mehr Fläche ist immer besser, aber selten nötig. Bei [keine Bühne vorhanden] reicht eine markierte Auftrittsfläche im Saal — Bühne ist kein zwingendes Setting.",
  },
  {
    id: "setup-zeit",
    category: "technik",
    q: "Wie viel Setup- und Soundcheck-Zeit?",
    a: "30 Minuten Setup + 30 Minuten Soundcheck — also ungefähr 1 Stunde vor Showbeginn am Eventort. Bei reiner Close-Up-Buchung ohne Bühne reicht 15 Minuten Aufbauzeit.",
  },
  {
    id: "anfahrt",
    category: "technik",
    q: "Wie wird die Anfahrt berechnet?",
    a: "In Bayern transparent kalkuliert nach Entfernung (km-Pauschale), deutschlandweit inkl. Fahrzeit-Aufschlag falls über 3 Stunden. Bei Übernachtungs-Pflicht (späte Show / weite Anreise) kommt Hotel + Spesen — wird im Angebot ausgewiesen, keine Überraschungen.",
  },
  {
    id: "versicherung",
    category: "technik",
    q: "Bin ich versichert?",
    a: "Berufshaftpflicht-Versicherung mit ausreichender Deckungssumme für gewerbliche Bühnen-Tätigkeit. Versicherungsnachweis liefere ich auf Anfrage gerne mit — wird bei B2B-Events teils vom Veranstalter angefordert.",
  },

  /* ───────── Preise & Honorar ───────── */
  {
    id: "wovon-haengt",
    category: "preise",
    q: "Wovon hängt das Honorar ab?",
    a: "Format (Close-Up / Bühne / Magic Dinner / Moderation), Dauer (15 Min bis 4 Stunden), Anfahrt, ggf. Übernachtung, Saison (Hochsaison Mai–September + Dezember teurer als Nebensaison). Außerdem: Sonderwünsche wie Englisch-Sprache, vorab Konzept-Workshop, eingebaute Firmen-Inhalte.",
  },
  {
    id: "ab-welcher-preisklasse",
    category: "preise",
    q: "Ab welcher Preisklasse bewegt sich eine Buchung?",
    a: "Keine Listenpreise auf der Webseite — jede Anfrage bekommt ein individuelles, transparentes Angebot. Grund: ein 15-Minuten-Close-Up im Nachbarort hat einen anderen Aufwand als eine 60-Minuten-Show mit Anreise und Übernachtung. Eine kurze Anfrage genügt, dann ist Klartext da.",
  },
  {
    id: "anfahrt-inkl",
    category: "preise",
    q: "Ist Anfahrt im Honorar enthalten?",
    a: "In der Region Regensburg / Oberpfalz oft pauschal inklusive. Über Bayern hinaus wird die Anfahrt transparent als separate Position im Angebot kalkuliert — ihr seht genau, was wofür anfällt.",
  },
  {
    id: "reisekosten",
    category: "preise",
    q: "Wie hoch sind Reisekosten bei Übernachtungen?",
    a: "Hotel-Standard 3–4 Sterne (kein Luxus, aber ausgeruht für die Show), Buchung durch euch oder durch mich. Spesen-Pauschale für Verpflegung. Beides wird im Angebot ausgewiesen — nichts läuft versteckt.",
  },
  {
    id: "rechnung-ust",
    category: "preise",
    q: "Bekomme ich eine Rechnung mit ausgewiesener Umsatzsteuer?",
    a: "Ja — GoBD-konforme Geschäftsrechnung mit ausgewiesener gesetzlicher Umsatzsteuer, Zahlungsziel standardmäßig 14 Tage nach Veranstaltung. Anzahlung 30 % zur Terminreservierung üblich, der Rest zur oder nach der Show.",
  },
  {
    id: "anzahlung",
    category: "preise",
    q: "Muss ich eine Anzahlung leisten?",
    a: "Ja — eine Anzahlung sichert den Termin. Höhe meist 30 % der Gesamt-Gage, fällig nach Vertragsschluss. Erst dann blockiere ich das Datum komplett. Restzahlung 14 Tage nach Veranstaltung gegen Rechnung.",
  },
];

const TABS: { key: TabKey; label: string; icon: typeof Info }[] = [
  { key: "allgemein", label: "Allgemein", icon: Info },
  { key: "buchung", label: "Buchung & Ablauf", icon: Calendar },
  { key: "formate", label: "Formate & Show", icon: Sparkles },
  { key: "technik", label: "Technik & Logistik", icon: Wrench },
  { key: "preise", label: "Preise & Honorar", icon: Coins },
];

/* ════════════════════════════════════════════════════════
   1 · HERO — kleiner cream
   ════════════════════════════════════════════════════════ */
const HEADLINE_SANS = ["FAQ", "—", "was"];
const HEADLINE_SANS_2 = ["vorher"];
const HEADLINE_ITALIC = ["gefragt wird."];

const BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

const Hero = () => (
  <section
    className="relative overflow-hidden"
    style={{
      background: `linear-gradient(180deg, ${CREAM} 0%, #fafafa 55%, #ffffff 100%)`,
    }}
  >
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        right: "-10%",
        top: "-20%",
        width: "60%",
        height: "70%",
        background:
          "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
        filter: "blur(20px)",
      }}
    />
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: "-10%",
        bottom: "-20%",
        width: "55%",
        height: "60%",
        background:
          "radial-gradient(closest-side, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
        filter: "blur(20px)",
      }}
    />
    {BOKEH.map((b, i) => (
      <span
        key={i}
        aria-hidden
        className="hero-bokeh absolute rounded-full pointer-events-none"
        style={{
          width: b.size,
          height: b.size,
          left: b.left,
          top: b.top,
          background:
            "radial-gradient(closest-side, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
          animationDuration: `${b.dur}s`,
          animationDelay: `${b.delay}s`,
          opacity: b.o,
        }}
      />
    ))}

    <div className="container relative z-10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-5xl mx-auto">
        <div
          className="hero-fade flex items-center gap-3 mb-7"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="hero-star w-4 h-4"
                style={{
                  color: "#c79042",
                  fill: "#c79042",
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
          <span
            className="text-[11px] tracking-[0.18em] uppercase font-semibold"
            style={{ color: ACCENT_DEEP }}
          >
            5,0 · 30+ Bewertungen · 200+ Events
          </span>
        </div>

        <p
          className={`${SERIF_ITALIC} hero-fade text-lg md:text-xl text-foreground/55 mb-6`}
          style={{ animationDelay: "0.15s" }}
        >
          FAQ · Häufige Fragen.
        </p>

        <h1
          className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(2.75rem,8vw,7.5rem)] text-foreground mb-10"
          aria-label="FAQ — was vorher gefragt wird."
        >
          {HEADLINE_SANS.map((w, i) => (
            <span
              key={`s1-${i}`}
              className="hero-word"
              style={{
                animationDelay: `${0.25 + i * 0.08}s`,
                marginRight: "0.22em",
              }}
            >
              {w}
            </span>
          ))}
          {HEADLINE_SANS_2.map((w, i) => (
            <span
              key={`s2-${i}`}
              className="hero-word"
              style={{
                animationDelay: `${0.49 + i * 0.08}s`,
                marginRight: "0.22em",
              }}
            >
              {w}
            </span>
          ))}
          <br />
          {HEADLINE_ITALIC.map((w, i) => (
            <span
              key={`it-${i}`}
              className={`hero-word ${SERIF_ITALIC}`}
              style={{
                animationDelay: `${0.6 + i * 0.08}s`,
                color: ACCENT,
                paddingRight: "0.18em",
              }}
            >
              {w}
            </span>
          ))}
        </h1>

        <p
          className="hero-fade text-base md:text-lg text-foreground/65 leading-[1.65] max-w-2xl mb-10"
          style={{ animationDelay: "0.7s" }}
        >
          Hier sind die Antworten auf alles, was Brautpaare, Event-Manager und
          Privatkund:innen vorher von mir wissen wollen — Buchung, Formate,
          Technik, Honorar. Falls eine Frage fehlt: Mini-Formular unten, ich
          antworte persönlich innerhalb von 24 Stunden.
        </p>

        <div
          className="hero-fade flex flex-wrap items-center gap-6 text-[13px] tabular-nums text-foreground/65"
          style={{ animationDelay: "0.8s" }}
        >
          <span>
            <span className="font-bold text-foreground">
              {FAQ_ITEMS.length}
            </span>{" "}
            Antworten
          </span>
          <span aria-hidden className="text-foreground/30">
            ·
          </span>
          <span>
            <span className="font-bold text-foreground">5</span> Kategorien
          </span>
          <span aria-hidden className="text-foreground/30">
            ·
          </span>
          <span>
            <span className="font-bold text-foreground">24h</span> persönliche
            Antwort
          </span>
        </div>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   2 · FAQ-CORE — Search + Tabs + Akkordion
   ════════════════════════════════════════════════════════ */
const FAQCore = () => {
  const { ref, isVisible } = useScrollReveal();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("allgemein");

  const normalizedSearch = search.trim().toLowerCase();
  const isSearching = normalizedSearch.length > 1;

  const filteredAll = useMemo(() => {
    if (!isSearching) return FAQ_ITEMS;
    return FAQ_ITEMS.filter(
      (item) =>
        item.q.toLowerCase().includes(normalizedSearch) ||
        item.a.toLowerCase().includes(normalizedSearch),
    );
  }, [isSearching, normalizedSearch]);

  const visibleItems = useMemo(() => {
    if (isSearching) return filteredAll;
    return FAQ_ITEMS.filter((item) => item.category === activeTab);
  }, [isSearching, filteredAll, activeTab]);

  const counts: Record<TabKey, number> = useMemo(() => {
    const map = { allgemein: 0, buchung: 0, formate: 0, technik: 0, preise: 0 } as Record<TabKey, number>;
    const pool = isSearching ? filteredAll : FAQ_ITEMS;
    pool.forEach((item) => {
      map[item.category]++;
    });
    return map;
  }, [isSearching, filteredAll]);

  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-32 border-y border-foreground/10"
    >
      <div className="container px-6">
        {/* Section-Header */}
        <div className={`max-w-3xl mb-12`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Such, klick, finde.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Antworten nach{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              Thema.
            </span>
          </h2>
        </div>

        {/* SEARCH-FIELD */}
        <div className="max-w-3xl mb-10">
          <label htmlFor="faq-search" className="sr-only">
            FAQs durchsuchen
          </label>
          <div
            className="relative group"
            style={{
              boxShadow: "0 2px 12px -2px rgba(0,0,0,0.08)",
            }}
          >
            <Search
              aria-hidden
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 transition-colors group-focus-within:text-[#9a2640]"
            />
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Stichwort eingeben — z. B. Honorar, Anfahrt, Close-Up..."
              className="w-full pl-14 pr-6 py-5 md:py-6 rounded-2xl border-2 border-foreground/10 focus:border-[#9a2640] focus:outline-none bg-white text-base md:text-lg text-foreground placeholder:text-foreground/40 transition-all duration-200"
              autoComplete="off"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/65 transition-colors"
              >
                Zurücksetzen
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-3 text-sm text-foreground/55">
              {filteredAll.length === 0 ? (
                <>Keine Treffer für [{search}]. Frag unten direkt nach.</>
              ) : (
                <>
                  <span className="font-bold text-foreground tabular-nums">
                    {filteredAll.length}
                  </span>{" "}
                  Antwort{filteredAll.length === 1 ? "" : "en"} gefunden.
                </>
              )}
            </p>
          )}
        </div>

        {/* TABS — nur sichtbar wenn nicht gesucht wird */}
        {!isSearching && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.key;
                const count = counts[tab.key];
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    aria-pressed={active}
                    className={`group inline-flex items-center gap-2.5 px-5 py-3 rounded-full border-2 transition-all duration-300 ${
                      active
                        ? "text-white"
                        : "text-foreground/75 hover:text-foreground bg-[#fafafa]/60 hover:bg-[#fafafa]"
                    }`}
                    style={{
                      borderColor: active ? ACCENT : "transparent",
                      background: active
                        ? `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`
                        : undefined,
                      boxShadow: active
                        ? "0 8px 24px -8px rgba(0,0,0,0.040)"
                        : undefined,
                    }}
                  >
                    <Icon
                      className={`w-4 h-4 ${active ? "" : "text-foreground/45"} transition-colors`}
                    />
                    <span className="text-[13px] tracking-[0.04em] font-semibold">
                      {tab.label}
                    </span>
                    <span
                      className={`text-[11px] tabular-nums px-2 py-0.5 rounded-full ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-foreground/10 text-foreground/65"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* AKKORDION */}
        <div className="max-w-3xl">
          {visibleItems.length === 0 && (
            <div className="py-10 text-center text-foreground/55">
              <p className={`${SERIF_ITALIC} text-xl mb-2`}>Nichts gefunden.</p>
              <p className="text-sm">
                Frag unten direkt nach — Antwort innerhalb 24 Stunden.
              </p>
            </div>
          )}
          {visibleItems.map((item) => (
            <details
              key={item.id}
              className="faq-fade-in group py-6 md:py-7 border-b border-foreground/15 first:border-t"
            >
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="shrink-0 mt-1 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none font-light"
                  style={{ color: ACCENT }}
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   3 · PULL-QUOTE BLACK FULL-BLEED
   ════════════════════════════════════════════════════════ */
const PullQuote = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "#08060c" }}
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full blur-2xl opacity-8"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.040), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-2xl opacity-6"
        style={{
          background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div className={`max-w-4xl mx-auto text-center`}>
          <p className={`text-base md:text-lg text-white/55 mb-8 tracking-wide uppercase text-[11px]`}>
            Kurz und ehrlich.
          </p>
          <p className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,5vw,4.5rem)] text-white">
            Über dreißig Fragen.{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              Eine Antwort: ja, das geht.
            </span>
          </p>
          <p className="mt-10 mx-auto max-w-xl text-base md:text-lg text-white/65 leading-[1.6]">
            Hochzeit ohne Bühne? Vorstandsdinner mit Englisch? Magie für
            70-Jahre-Geburtstag der Schwiegermutter? Stand-Up auf dem
            Sommerfest? Ja, ja, ja, ja — alles besprochen, alles im Repertoire.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   4 · FRAGE NICHT BEANTWORTET — Mini-Form
   ════════════════════════════════════════════════════════ */
const FrageNichtBeantwortet = () => {
  const { ref, isVisible } = useScrollReveal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frage, setFrage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (!email || !email.includes("@")) return;
    timerRef.current = window.setTimeout(() => {
      captureEmail(email, "faq-frage", { name, frage });
    }, 600);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [email, name, frage]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !frage.trim()) return;
    markEmailSubmitted();
    setSubmitted(true);
    // Persist a small "ping" so we don't lose the question — uses localStorage
    try {
      const key = "magicel_faq_questions";
      const raw = localStorage.getItem(key);
      const list = raw ? (JSON.parse(raw) as unknown[]) : [];
      list.push({
        name,
        email,
        frage,
        at: Date.now(),
      });
      localStorage.setItem(key, JSON.stringify(list));
    } catch {
      // ignore quota / private mode
    }
  };

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{
        background: `linear-gradient(180deg, ${CREAM} 0%, #faf2e3 100%)`,
      }}
    >
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Deine Frage fehlt?
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground mb-6">
            Stell sie{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              direkt mir.
            </span>
          </h2>
          <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-xl mb-10">
            Drei Felder, 30 Sekunden — und du bekommst eine persönliche Antwort
            per Email innerhalb von 24 Stunden. Kein Office-Team, kein Bot. Ich
            schreibe direkt.
          </p>

          {!submitted ? (
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-3xl p-6 md:p-10 border border-foreground/10"
              style={{
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.15)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    htmlFor="faq-name"
                    className="block text-[11px] tracking-[0.12em] uppercase font-semibold text-foreground/65 mb-2"
                  >
                    Dein Name
                  </label>
                  <input
                    id="faq-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Vor- und Nachname"
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[#9a2640] focus:outline-none bg-white text-base text-foreground placeholder:text-foreground/40 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="faq-email"
                    className="block text-[11px] tracking-[0.12em] uppercase font-semibold text-foreground/65 mb-2"
                  >
                    Deine Email
                  </label>
                  <input
                    id="faq-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@firma.de"
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[#9a2640] focus:outline-none bg-white text-base text-foreground placeholder:text-foreground/40 transition-all"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="faq-frage"
                  className="block text-[11px] tracking-[0.12em] uppercase font-semibold text-foreground/65 mb-2"
                >
                  Deine Frage
                </label>
                <textarea
                  id="faq-frage"
                  value={frage}
                  onChange={(e) => setFrage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Worum geht es? Datum, Anlass, Gästezahl helfen mir, präzise zu antworten."
                  className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[#9a2640] focus:outline-none bg-white text-base text-foreground placeholder:text-foreground/40 transition-all resize-none"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                    boxShadow: "0 12px 28px -8px rgba(0,0,0,0.040)",
                  }}
                >
                  <Send className="w-4 h-4" />
                  Frage absenden
                </button>
                <p className="text-[12px] text-foreground/55 leading-[1.5]">
                  Mit dem Absenden bestätigst du, dass deine Email zur Beantwortung
                  gespeichert wird. Mehr unter{" "}
                  <Link
                    to="/datenschutz"
                    className="underline hover:text-foreground"
                  >
                    Datenschutz
                  </Link>
                  .
                </p>
              </div>
            </form>
          ) : (
            <div
              className="success-pop bg-white rounded-3xl p-10 md:p-14 border border-foreground/10 text-center"
              style={{
                boxShadow: "0 30px 60px -25px rgba(0,0,0,0.15)",
              }}
            >
              <div
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                  boxShadow: "0 12px 28px -8px rgba(0,0,0,0.040)",
                }}
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-foreground/60 mb-3`}>
                Angekommen.
              </p>
              <h3 className="font-display font-black text-2xl md:text-3xl text-foreground mb-4">
                Danke, {name || "du"}.
              </h3>
              <p className="text-base md:text-lg text-foreground/65 leading-[1.6] max-w-md mx-auto">
                Ich antworte innerhalb von 24 Stunden persönlich an{" "}
                <span className="font-bold text-foreground">{email}</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   5 · VERWANDTE RESSOURCEN
   ════════════════════════════════════════════════════════ */
const VerwandteRessourcen = () => {
  const { ref, isVisible } = useScrollReveal();
  const links = [
    {
      title: "Buchung",
      eyebrow: "Direktes Anfrage-Formular",
      desc: "Datum, Format, Gästezahl — Angebot innerhalb 24 Stunden.",
      to: "/buchung",
      icon: Send,
    },
    {
      title: "Show-Planer",
      eyebrow: "Interaktiv in 5 Schritten",
      desc: "Lass dir eine Format-Empfehlung generieren — speicherbar.",
      to: "/#planer",
      icon: Sparkles,
    },
    {
      title: "Kontakt",
      eyebrow: "Email, Telefon, WhatsApp",
      desc: "Alle Wege, mich zu erreichen — auf einer Seite.",
      to: "/kontakt",
      icon: MessageCircle,
    },
    {
      title: "Pressebereich",
      eyebrow: "Pressefotos, Vita, Pitch-Deck",
      desc: "Für Journalist:innen und Event-Manager:innen — Direkt-Download.",
      to: "/presse",
      icon: HelpCircle,
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 border-y border-foreground/10">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Weitere Anlaufstellen.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground">
            Falls du{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              direkt weiter willst.
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.title}
                to={l.to}
                className="group block rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 border border-foreground/10 bg-[#fafafa]/40 hover:bg-[#fafafa]/70"
                style={{
                  boxShadow: "0 4px 16px -4px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className={`text-sm text-foreground/55 mb-2`}>
                  {l.eyebrow}
                </p>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">
                  {l.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-[1.6] mb-5">
                  {l.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase font-semibold transition-colors"
                  style={{ color: ACCENT }}
                >
                  Öffnen
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   6 · FINAL CTA — Black full-bleed
   ════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative text-white py-28 md:py-40 overflow-hidden"
      style={{ background: "#08060c" }}
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-2xl opacity-8"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.040), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-2xl opacity-6"
        style={{
          background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Genug gelesen — jetzt reden.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Lass uns{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              dein Event planen.
            </span>
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Show planen, direkt anrufen, kurze Mail — wähle den Weg, der dir
            am nächsten ist. Antwort innerhalb 24 Stunden persönlich von mir.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90 transition-all"
            >
              Show anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/#planer"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white transition-colors"
            >
              Show-Planer öffnen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white transition-colors"
            >
              Direkt anrufen
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-8 text-[11px] tracking-[0.1em] uppercase text-white/40">
            5,0 · 30+ Bewertungen · 200+ Events · 24h Antwort
          </p>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/faq";

const FAQPage = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>FAQ — Häufige Fragen zum Zauberer | Emilian Leber Bayern</title>
      <meta
        name="description"
        content="Häufige Fragen zur Buchung eines Zauberers in Bayern — Ablauf, Pakete, Technik, Anfahrt, Honorar. 5,0 Sterne, 200+ Events seit 2015, persönliche Antwort innerhalb 24 Stunden."
      />
      <meta
        name="keywords"
        content="Zauberer FAQ, Magier Fragen, Zauberer buchen Bayern, Magier Hochzeit Fragen, Firmenfeier Zauberer Honorar, Magier Tech-Rider, Close-Up Magie FAQ, Magic Dinner FAQ, Zauberer Stornierung, Magier Vorlauf Buchung"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="FAQ — Häufige Fragen zum Zauberer | Emilian Leber"
      />
      <meta
        property="og:description"
        content="30+ Antworten zu Buchung, Formaten, Technik und Honorar. Persönlich. Innerhalb 24 Stunden."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="FAQ — Häufige Fragen zum Zauberer | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="30+ Antworten zu Buchung, Formaten, Technik und Honorar — persönlich beantwortet."
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
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
              name: "Start",
              item: "https://www.magicel.de/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "FAQ",
              item: SITE_URL,
            },
          ],
        })}
      </script>
    </Helmet>
    <PageLayout>
      <PageKeyframes />
      <main>
        <Hero />
        <FAQCore />
        <PullQuote />
        <FrageNichtBeantwortet />
        <VerwandteRessourcen />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default FAQPage;
