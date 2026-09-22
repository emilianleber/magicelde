/**
 * /referenzen — Beweis-Seite (Voltage-Layout): Kunden-Logos mit Case-Studies,
 * Kundenstimmen, FAQ. 22.09.2026 entschlackt: Werdegang/Zeitleiste und
 * TV-Video gehoeren auf /ueber-mich bzw. /presse; doppelte Logo-Marquee,
 * Branchenliste und doppelte Stimmen (= ReviewsBlock) entfernt.
 */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Stats, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { INK, WHITE, PAPER, COBALT, MAGENTA, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";

import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import stageShowImg from "@/assets/stage-show.jpg";

/* ═══════════════════════════════════════════════════════════
   Case-Study-Daten — Single Source of Truth (auch vom Modal genutzt).
   Alle 18 echten Logos, klickbar mit Case-Study-Modal.
   ═══════════════════════════════════════════════════════════ */
type CaseStudy = {
  name: string;
  logo: string;
  eyebrow: string; // 1-Zeilen-Tag unter Logo
  branche: string;
  ort: string;
  jahr: number;
  anlass: string;
  format: string;
  intro: string; // 1-2 Saetze: was war der Auftrag
  body?: string[]; // optionale Tiefen-Erzaehlung (Konzept, Umsetzung, Ergebnis)
  tags?: string[];
  pull?: string;
  pullAuthor?: string;
  photo?: string;
  photoPosition?: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Versicherungskammer Bayern",
    logo: "/logos/vkb.png",
    eyebrow: "Magic Camp · 200 Gäste",
    branche: "Versicherung",
    ort: "Nähe Ingolstadt",
    jahr: 2024,
    anlass: "Mitarbeiter-Event mit Workshop-Wunsch",
    format: "Magic Camp + Bühne",
    intro:
      "200 Gäste, expliziter Wunsch nach einem Zauber-Workshop für Kleingruppen. Standard-Bühnenshow hätte sich falsch angefühlt — zu wenig persönlich.",
    body: [
      "Ich habe das Konzept komplett neu gebaut: ein Magic Camp mit rotierenden Workshop-Stationen, in denen jeder Gast selbst ein, zwei Effekte erlernt. Als roter Faden eine zentrale Bühnenshow am Ende, die alle Stationen zusammenführt.",
      "Konzept-Pitch im Haus der Firma. Schriftlicher Vertrag. Gemeinsames Briefing aller Mitarbeiter und externen Trainer. Beim Event selbst: jeder Gast geht mit einem Trick nach Hause, das Finale auf der Bühne wird zum Wow-Moment, der noch wochenlang im Pausenraum erzählt wird.",
    ],
    tags: ["Magic Camp", "Workshop-Stationen", "Konzept + Pitch", "Bühne als Finale"],
    // Wörtlicher Auszug aus der Google-Rezension der beauftragenden Agentur.
    pull: "… rund 200 geladene Gäste eines Bayerischen Versicherungsunternehmens mit einer eigens entwickelten Zaubertrickshow in einem inszenierten Magic Camp begeistert hat - es war einfach Mega!",
    pullAuthor: "Jan von Lehmann · Agenturgruppe Wächter, München · Google-Rezension",
    photo: buehneZuschauerImg,
    photoPosition: "center 25%",
  },
  {
    name: "STRABAG",
    logo: "/logos/strabag.png",
    eyebrow: "Weihnachtsfeier · 80 Gäste",
    branche: "Bau",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Weihnachtsfeier im Restaurant",
    format: "Close-Up + Tisch-zu-Tisch + Bühne",
    intro:
      "STRABAG-Mitarbeiterin fragt für 80 Gäste in einem Restaurant an, ursprünglicher Wunsch eine reine Bühnenshow. Klang nach Standardauftrag.",
    body: [
      "Nach Raum-Analyse vor Ort meine Empfehlung: bei dieser Raumgröße und Tisch-Anordnung trägt eine reine Bühne den Abend nicht. Stattdessen Close-Up beim Glühweinempfang, Tisch-zu-Tisch beim Essen, Bühnenshow nach dem Hauptgang.",
      "Detailabsprache per E-Mail (Ablauf, Service-Takt), Telefonate (Parken, Technik), vor Ort Bühne mit dem Restaurant-Chef final geplant. Beim Event: vom Empfang bis zur Tanzfläche durchgehend Magie, kein Bruch. Aus 25 Minuten Bühne wurde ein 3-Stunden-Programm.",
    ],
    tags: ["Combo-Programm", "Empfang + Tisch + Bühne", "Format-Anpassung", "Restaurant-Setting"],
    photo: emotionenImg,
    photoPosition: "center 30%",
  },
  {
    name: "XXXLutz",
    logo: "/logos/xxxlutz.png",
    eyebrow: "Konzern-Event · ~250 Gäste",
    branche: "Möbel",
    ort: "Würzburg",
    jahr: 2025,
    anlass: "Konzern-Event mit Premium-Anspruch",
    format: "Tisch-zu-Tisch + Bühne",
    intro:
      "Konzern-Event eines großen Möbelhauses, rund 250 geladene Gäste — Mischung aus Führungskreis, Vertriebspartnern und langjährigen Mitarbeitern. Anspruch hoch: Premium-Tonalität, kein Klamauk.",
    body: [
      "Im Briefing vorab Insider gesammelt: laufende Kampagnen, interne Running-Gags, der eine Vertriebsmann der nie ohne Krawatte erscheint. Das alles fließt in Mentaleffekte und Pointen ein, ohne dass die Show zur Insider-Veranstaltung wird.",
      "Ablauf: Tisch-zu-Tisch beim Empfang, danach 25-Minuten-Bühne als Highlight-Slot zwischen Vorstandsrede und Buffet. Premium-Look, kein Glitzer, Pointen die nur im Saal funktionieren — und genau deshalb hängen bleiben.",
    ],
    tags: ["Konzern-Event", "Insider-Briefing", "Tisch + Bühne", "Premium-Tonalität"],
    photo: stageShowImg,
    photoPosition: "center 30%",
  },
  {
    name: "Sixt",
    logo: "/logos/sixt.png",
    eyebrow: "Mobility · Kundenabend",
    branche: "Mobilität",
    ort: "München",
    jahr: 2025,
    anlass: "Kundenabend für VIP-Klientel",
    format: "Close-Up · Walk-Around",
    intro:
      "Exklusiver Kundenabend mit Stehtischen, freier Bewegung der Gäste, dezenter Atmosphäre. Klassisches Setting für Walk-Around-Magie als Gesprächs-Eröffner zwischen Vertriebsleuten und Bestandskunden.",
  },
  {
    name: "Sparkasse",
    logo: "/logos/sparkasse.png",
    eyebrow: "Banking · Mitarbeiterfeier",
    branche: "Bank",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Mitarbeiterfeier",
    format: "Bühne",
    intro:
      "Klassische Mitarbeiterfeier nach Geschäftsschluss. 30-Minuten-Bühnenshow als Highlight zwischen Vorstandsrede und Buffet — bewusst keine Insider-Pointen, breite Zugänglichkeit für alle Hierarchie-Ebenen.",
  },
  {
    name: "HEIM & HAUS",
    logo: "/logos/heim-haus.png",
    eyebrow: "Vertriebs-Tagung",
    branche: "Bau",
    ort: "Nürnberg",
    jahr: 2025,
    anlass: "Jahres-Vertriebstagung",
    format: "Bühne",
    intro:
      "Vertriebs-Mannschaft trifft sich zum Jahres-Recap. Show als Energizer am Ende eines langen Vortrags-Tages — Mentalmagie als perfekter Ausstieg, weil sie den Kopf zwingt umzuschalten.",
  },
  {
    name: "Schneider Weisse",
    logo: "/logos/schneider-weisse.png",
    eyebrow: "Brauerei · Tisch-zu-Tisch",
    branche: "Brauerei",
    ort: "Kelheim",
    jahr: 2024,
    anlass: "Kundenabend mit Bier-Verkostung",
    format: "Tisch-zu-Tisch",
    intro:
      "Bier-Verkostung in der historischen Brauerei. Tisch-zu-Tisch-Magie zwischen den Verkostungs-Gängen — funktioniert weil Bier und Karten-Effekte denselben Pace haben: langsam, präzise, geteilt.",
  },
  {
    name: "Wald & Wiese",
    logo: "/logos/wald-wiese.png",
    eyebrow: "Restaurant-Hauspartner",
    branche: "Restaurant",
    ort: "Sinzing bei Regensburg",
    jahr: 2026,
    anlass: "Wiederkehrendes Magic Dinner Format",
    format: "Magic Dinner (4-Gang)",
    intro:
      "Hauspartner-Restaurant für das Magic-Dinner-Format. Vier Gänge à la carte aus der Restaurantkarte, Close-Up-Magie an jedem Tisch zwischen den Gängen — der Restaurant-Rhythmus trägt die Show.",
    tags: ["Hauspartner", "Wiederkehrendes Format", "Vier-Gänge", "Close-Up am Tisch"],
  },
  {
    name: "Stadt Regensburg",
    logo: "/logos/stadt-regensburg.png",
    eyebrow: "Öffentliche Hand · Empfang",
    branche: "Öffentliche Hand",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Offizieller Empfang",
    format: "Close-Up",
    intro:
      "Offizieller Empfang der Stadt mit geladenen Gästen aus Wirtschaft und Politik. Walk-Around-Magie als Eis-Brecher in den ersten 90 Minuten — bevor die Reden anfangen ist niemand mehr fremd.",
  },
  {
    name: "Stadt Deggendorf",
    logo: "/logos/stadt-deggendorf.svg",
    eyebrow: "Tourist-Info · 50 Jahre Jubiläum",
    branche: "Öffentliche Hand",
    ort: "Deggendorf",
    jahr: 2026,
    anlass: "50-jähriges Jubiläum der Tourist-Information",
    format: "Stand-Magie · Walk-Around · Lead-Funnel",
    intro:
      "Die Tourist-Information feiert 50 Jahre — und steht vor dem klassischen Messe-Problem: Wie macht man die eigenen Stände im eigenen Haus sichtbar, wenn Besucher das Gebäude eh nur als Durchgang wahrnehmen?",
    body: [
      "Die Lösung war keine Bühne. Sondern Close-Up-Magie an zwei Punkten im Haus — Eingang Nord und Eingang Süd. Jeder, der reinkam, lief in einen kurzen, irritierend guten Effekt. Karten in der Hand, Sekundenmoment Staunen — und direkt danach der weiche Verweis: [Übrigens, ein paar Meter weiter findest du den Stand für…].",
      "Der Trick (im wörtlichen Sinn) ist die Aufmerksamkeits-Ökonomie: Magie kauft drei bis fünf Sekunden ungeteilte Konzentration. In diesen Sekunden landet die Info, die sonst am Plakat vorbeigerauscht wäre. Aus dem Durchläufer wird ein Standbesucher.",
    ],
    tags: ["Stand-Magie", "Lead-Funnel", "Zwei-Punkte-Setup", "Aufmerksamkeits-Hook"],
  },
  {
    name: "Oktoberfest",
    logo: "/logos/oktoberfest.png",
    eyebrow: "Festzelt-Auftritt",
    branche: "Event",
    ort: "München",
    jahr: 2024,
    anlass: "Privater Festzelt-Auftritt",
    format: "Walk-Around",
    intro:
      "Private Buchung in einem Festzelt — lauter Hintergrund, dichte Tischbelegung, alle leicht angeheitert. Walk-Around-Magie funktioniert genau da: kleine Effekte, große Reaktionen, kein Mikrofon nötig.",
  },
  {
    name: "Turmtheater",
    logo: "/logos/turmtheater.png",
    eyebrow: "Theater · Variety-Slot",
    branche: "Theater",
    ort: "Regensburg",
    jahr: 2025,
    anlass: "Variety-Abend mit Gast-Slot",
    format: "Abendprogramm (Bühne)",
    intro:
      "Variety-Abend im Turmtheater mit wechselnden Künstler-Slots. Mein 20-Minuten-Slot als Headliner-Akt vor dem Finale — ausverkaufter Saal, theatrales Setting, scharfes Licht.",
  },
  {
    name: "Greatest Talent",
    logo: "/logos/greatest-talent.png",
    eyebrow: "TV-Finalist 2023",
    branche: "TV",
    ort: "München",
    jahr: 2024,
    anlass: "TV-Show-Teilnahme",
    format: "Bühne (Live + TV)",
    intro:
      "Teilnahme an der TV-Talent-Show [Greatest Talent]. Bühne fürs Studiopublikum, parallel Live-Aufzeichnung. Einzug ins Finale.",
  },
  {
    name: "Business Entertainment",
    logo: "/logos/business-entertainment.png",
    eyebrow: "Agentur-Partner",
    branche: "Agentur",
    ort: "Bayern",
    jahr: 2025,
    anlass: "Wiederkehrende Agency-Buchungen",
    format: "Diverse Slots (Close-Up, Bühne, Moderation)",
    intro:
      "Stamm-Buchungs-Agentur für Firmen-Events in Bayern. Mehrere Engagements pro Jahr in verschiedenen Formaten — von Tisch-zu-Tisch bis Bühnen-Headliner, je nach Endkunden-Wunsch.",
  },
  {
    name: "Alte Mälzerei",
    logo: "/logos/dpsg.png",
    eyebrow: "Event-Location · Regensburg",
    branche: "Event-Location",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Gala-Abend",
    format: "Bühne",
    intro:
      "Bühnen-Show in der Alten Mälzerei — Regensburgs renommierte Event-Location für Galas und Kulturveranstaltungen. Steile Tribüne, scharfes Licht, anspruchsvolles Publikum.",
  },
  {
    name: "Drying Little Tears",
    logo: "/logos/drying-little-tears.png",
    eyebrow: "Charity · Kinder",
    branche: "Charity",
    ort: "München",
    jahr: 2025,
    anlass: "Charity-Gala",
    format: "Close-Up",
    intro:
      "Charity-Gala zugunsten der Stiftung [Drying Little Tears] (Hilfe für krebskranke Kinder). Close-Up als Walk-Around zwischen Tischen — bewusst kein bezahltes Engagement, sondern Sponsoring durch Auftritt.",
  },
  {
    name: "Steinhofer Ingenieure",
    logo: "/logos/steinhofer.png",
    eyebrow: "Mittelstand · Jubiläum",
    branche: "Mittelstand",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Firmenjubiläum",
    format: "Bühne",
    intro:
      "Firmenjubiläum eines mittelständischen Ingenieurbüros — Mitarbeiter, Familien, langjährige Geschäftspartner. Bühnen-Show mit eingebauter Firmen-Geschichte (Insider-Briefing vorab).",
  },
  {
    name: "Wächter",
    logo: "/logos/waechter.png",
    eyebrow: "Event-Agentur",
    branche: "Event-Agentur",
    ort: "Bayern",
    jahr: 2025,
    anlass: "Wiederkehrende Agency-Partnerschaft",
    format: "Diverse Slots",
    intro:
      "Event-Agentur Wächter ist Stamm-Vermittlung für Firmenevents in Ostbayern. Mehrere Engagements pro Jahr — Close-Up, Bühne, Moderation, je nach Endkunden-Brief.",
  },
];

/* ── Case-Study-Modal (Logik: state-gesteuerter Dialog) ── */
const Fact = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-1.5" style={{ color: L_DIM }}>
      {label}
    </dt>
    <dd className="text-sm font-medium" style={{ color: INK }}>{value}</dd>
  </div>
);

const CaseStudyDialog = ({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}) => (
  <Dialog open={!!caseStudy} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0" style={{ border: `1px solid ${L_LINE}` }}>
      {caseStudy && (
        <>
          {caseStudy.photo && (
            <div className="aspect-[16/9] w-full overflow-hidden" style={{ background: PAPER }}>
              <img
                src={caseStudy.photo}
                alt={`${caseStudy.name} — Eindruck vom Event`}
                className="w-full h-full object-cover"
                style={{ objectPosition: caseStudy.photoPosition ?? "center" }}
                loading="eager"
              />
            </div>
          )}
          <div className="p-6 md:p-10">
            <div className="flex items-start gap-5 mb-6">
              <img
                src={caseStudy.logo}
                alt=""
                aria-hidden
                className="h-10 md:h-12 w-auto max-w-[140px] object-contain shrink-0"
              />
              <div className="min-w-0">
                <DialogTitle asChild>
                  <h3 className="text-xl md:text-2xl font-extrabold leading-tight" style={{ color: INK }}>
                    {caseStudy.name}
                  </h3>
                </DialogTitle>
                <p className="mt-1 text-[11px] md:text-xs tracking-[0.16em] uppercase font-semibold" style={{ color: L_DIM }}>
                  {caseStudy.eyebrow}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 mb-7 pb-6" style={{ borderBottom: `1px solid ${L_LINE}` }}>
              <Fact label="Branche" value={caseStudy.branche} />
              <Fact label="Ort" value={caseStudy.ort} />
              <Fact label="Jahr" value={String(caseStudy.jahr)} />
              <Fact label="Format" value={caseStudy.format} />
            </dl>

            <DialogDescription asChild>
              <div className="space-y-4 text-[15px] md:text-base leading-[1.65]" style={{ color: "#3a3833" }}>
                <p style={{ color: INK }}>
                  <strong className="font-semibold" style={{ color: INK }}>Anlass: </strong>
                  {caseStudy.anlass}
                </p>
                <p>{caseStudy.intro}</p>
                {caseStudy.body?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </DialogDescription>

            {caseStudy.pull && (
              <blockquote className="mt-8 pl-5" style={{ borderLeft: `2px solid ${COBALT}` }}>
                <p className="text-lg md:text-xl leading-[1.45] font-semibold" style={{ color: INK }}>
                  „{caseStudy.pull}"
                </p>
                {caseStudy.pullAuthor && (
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: L_DIM }}>
                    {caseStudy.pullAuthor}
                  </p>
                )}
              </blockquote>
            )}

            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {caseStudy.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] tracking-[0.08em] uppercase font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${COBALT}14`, color: COBALT }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 pt-6 flex flex-wrap items-center gap-4" style={{ borderTop: `1px solid ${L_LINE}` }}>
              <Link
                to="/buchung"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase transition-colors"
                style={{ background: INK, color: WHITE }}
              >
                Ähnliches anfragen
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="mailto:el@magicel.de"
                className="text-[12px] tracking-[0.08em] font-semibold uppercase pb-1 transition-colors"
                style={{ color: L_DIM, borderBottom: `1px solid ${L_LINE}` }}
              >
                Direkt schreiben
              </a>
            </div>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

/* ── Logo-Cloud: klickbare Case-Studies (state-Logik bleibt) ── */
const CaseStudyCloud = () => {
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      id="logos"
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-12 md:mb-16">
          <Eyebrow>Achtzehn von zweihundert · jedes Logo klickbar</Eyebrow>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}>
            Wer mich <span style={{ color: COBALT }}>gebucht hat</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Versicherung, Bau, Möbel, Brauerei, Banking, öffentliche Hand, TV,
            Theater, Charity. Auf jedes Logo klicken — Anlass, Setting und
            Konzept im Detail. Alle hier gezeigten Logos sind freigegeben.
          </p>
        </motion.div>

        {/* Logo-Grid — klickbar, jedes Logo öffnet Case-Study-Dialog */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CASE_STUDIES.map((k) => (
            <motion.button
              key={k.name}
              variants={up}
              type="button"
              onClick={() => setOpenCase(k)}
              className="group rounded-[18px] p-6 flex flex-col items-center justify-between text-center gap-4 transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: WHITE, border: `1px solid ${L_LINE}`, ["--tw-ring-color" as string]: COBALT }}
              aria-label={`${k.name} — Case Study öffnen`}
            >
              <div className="relative flex items-center justify-center w-full min-h-[72px]">
                <img
                  src={k.logo}
                  alt={`${k.name} — Referenz-Kunde Zauberer Emilian Leber`}
                  loading="lazy"
                  className="max-h-[64px] max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <figcaption>
                <p className="text-[14px] font-semibold leading-tight" style={{ color: INK }}>
                  {k.name}
                </p>
                <p className="text-[12px] mt-1" style={{ color: L_DIM }}>
                  {k.eyebrow}
                </p>
                <p className="mt-2 text-[10px] tracking-[0.16em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: COBALT }}>
                  Case ansehen →
                </p>
              </figcaption>
            </motion.button>
          ))}
        </div>

        <motion.p variants={up} className="mt-12 md:mt-16 max-w-3xl text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
          Plus rund 180 weitere Auftraggeber — Hochzeitspaare, Familien,
          Mittelständler, Restaurants. Wer Diskretion möchte, bekommt sie.
        </motion.p>
      </div>

      <CaseStudyDialog caseStudy={openCase} onClose={() => setOpenCase(null)} />
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FAQ — Referenzen-spezifisch (Daten auch für JSON-LD)
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
    a: "Zitiert werden ausschließlich öffentlich einsehbare Google-Rezensionen — wörtlich und unter dem Namen, unter dem sie auf Google veröffentlicht wurden; Kürzungen sind mit „…“ markiert. Insgesamt stehen auf Google 16 Rezensionen (4,8 Sterne) und auf ProvenExpert 7 Bewertungen (4,97 von 5). Wer nicht mehr zitiert werden möchte, schreibt einfach eine Mail an el@magicel.de.",
  },
  {
    q: "Habt ihr Referenzen in meiner Region und meiner Branche?",
    a: "Wahrscheinlich ja. Der Schwerpunkt ist Bayern (Regensburg, München, Ingolstadt, Würzburg, Passau). Branchen-Erfahrung: 16 verschiedene Branchen, von Versicherung bis Charity. Frag konkret an, ich nenne zwei bis drei passende Beispiele.",
  },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/referenzen";

const Referenzen = () => (
  <VoltageShell
    title="Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber"
    description="Zauberer-Referenzen: VKB, STRABAG, XXXLutz, Sixt, Sparkasse, Schneider Weisse u.v.m. 200+ Events, 4,8★ bei Google. Aus Regensburg für ganz Bayern."
    path="/referenzen"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Zauberer Referenzen, Magier Kunden, Zauberkünstler VKB STRABAG XXXLutz, Emilian Leber Case Studies, Zauberer Firmenkunden, Magier Hochzeiten Referenzen, Zauberer Bayern Kundenliste, Mentalist Referenzen"
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="de_DE" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="VKB, STRABAG, XXXLutz — Case-Studies, 4,8★ bei Google, 200+ Events."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />

      {/* JSON-LD: LocalBusiness — bewusst ohne Rating-/Review-Markup (self-serving reviews). */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.magicel.de/#business",
        "name": "Emilian Leber — Zauberer & Mentalist",
        "url": "https://www.magicel.de",
        "image": "https://www.magicel.de/og-image.jpg",
        "logo": "https://www.magicel.de/og-image.jpg",
        "email": "el@magicel.de",
        "telephone": "+4915563744696",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Regensburg",
          "addressRegion": "Bayern",
          "addressCountry": "DE",
        },
        "areaServed": ["DE", "Bayern", "Regensburg", "München", "Ingolstadt", "Würzburg"],
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

    <SubHero
      eyebrow="Referenzen · seit 2016"
      title={<>200<span style={{ color: COBALT }}>+</span> Events. Quer durch <span style={{ color: COBALT }}>Bayern</span><span style={{ color: MAGENTA }}>.</span></>}
      sub="Versicherer, Bauunternehmen, Möbelhäuser, Brauereien, Banken, Hochzeitspaare, Geburtstagskinder und ein paar Theater. Die Liste wächst jedes Jahr — und ich nenne dir gerne Ansprechpartner aus deiner Branche, wenn du fragst."
      image={buehneZuschauerImg}
      imageAlt="Emilian Leber auf der Bühne vor Publikum"
      imgPos="center 25%"
      badge="200+ Events · 4,8★ bei Google"
      primary={{ label: "Referenzen anfragen", href: "/buchung" }}
      secondary={{ label: "Kunden ansehen", href: "/referenzen#logos" }}
    />

    <Stats
      items={[
        { v: "200+", l: "Events seit 2016" },
        { v: "100+", l: "Hochzeiten" },
        { v: "100+", l: "Firmen-Engagements" },
        { v: "4,8★", l: "16 Google-Rezensionen" },
      ]}
    />

    <CaseStudyCloud />

    {/* Kundenstimmen — wörtliche Google-Rezensionen (REAL_REVIEWS in voltage/theme). */}
    <ReviewsBlock />

    <FAQ
      eyebrow="Häufige Fragen zu Referenzen"
      title="Was vorher gefragt wird."
      items={FAQS}
    />

    <FinalCTA
      title={<>Referenzen aus deiner Branche<span style={{ color: MAGENTA }}>.</span></>}
      sub="Sag mir Datum, Anlass, Branche und Stadt — du bekommst zwei bis drei Kontakte mit Telefon oder Mail, die mich gebucht haben und die Erfahrung weitergeben. Antwort innerhalb 24 Stunden. Vertraulich, kein Weiterverkauf von Daten."
    />
  </VoltageShell>
);

export default Referenzen;
