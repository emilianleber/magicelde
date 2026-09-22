/**
 * /zauberer-weihnachtsfeier — Anlass Weihnachtsfeier (Voltage-Layout, live).
 *
 * Warum eine eigene Seite (22.09.2026): Die Weihnachtsfeier-Saison ist die
 * Buchungsspitze, Firmen fragen ab September an. Bisher gab es dafuer keine
 * Seite — nur Erwaehnungen auf /firmenfeiern. Fokus: Regensburg und bis zu
 * zwei Stunden Anfahrt.
 *
 * Nur Fakten, die auch sonst auf der Seite stehen (ab 395 €, 200+ Events,
 * Vorlauf Q4 8–12 Wochen aus staedte.ts) — keine erfundenen Termine/Zahlen.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA, Stats, GlassFeatures, SectionHeader } from "@/components/voltage/sections";
import { InteractiveTabs, FormatCards, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA, INK, L_LINE, L_DIM, CARD_LIGHT, stagger, up, vp } from "@/components/voltage/theme";
import { Check, Clock, CalendarCheck, Hand, Wand2, UtensilsCrossed, Sparkles, MessageSquare, Route, Headphones, ShieldCheck, Languages, Timer, Snowflake } from "lucide-react";
import heroImg from "@/assets/emilian-magic-dinner.jpg";
import tab1 from "@/assets/hero-closeup.jpg";
import tab2 from "@/assets/schneider-weisse-closeup.jpg";
import tab3 from "@/assets/hero-stage.jpg";

/** Regensburg + Staedte bis ca. zwei Stunden Anfahrt — verlinkt auf die Stadtseiten. */
const REGION = [
  ["regensburg", "Regensburg"], ["muenchen", "München"], ["nuernberg", "Nürnberg"],
  ["ingolstadt", "Ingolstadt"], ["landshut", "Landshut"], ["straubing", "Straubing"],
  ["passau", "Passau"], ["deggendorf", "Deggendorf"], ["amberg", "Amberg"],
  ["weiden-in-der-oberpfalz", "Weiden"], ["augsburg", "Augsburg"], ["erlangen", "Erlangen"],
  ["freising", "Freising"], ["bamberg", "Bamberg"],
] as const;

export default function Weihnachtsfeier() {
  return (
    <VoltageShell
      title="Zauberer für die Weihnachtsfeier — Regensburg & Bayern | Emilian Leber"
      description="Zauberer für eure Weihnachtsfeier in Regensburg, München & Nürnberg: Close-Up, Bühnenshow oder Magic Dinner. Ab 395 €. Jetzt Dezember-Termin sichern."
      path="/zauberer-weihnachtsfeier"
      noindex={false}
    >
      <SubHero
        eyebrow="Anlass · Weihnachtsfeier"
        title={<>Zauberer für eure <span style={{ color: COBALT }}>Weihnachtsfeier</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Der Abend, der das Jahr im Team rund ausklingen lässt: Close-Up beim Glühwein-Empfang, Magie zwischen den Gängen und eine Comedy-Show als Höhepunkt. Aus Regensburg — für Firmen in ganz Bayern."
        image={heroImg}
        imageAlt="Zauberer Emilian Leber bei einer Weihnachtsfeier am Tisch"
        badge="Dezember-Termine sind früh vergeben — jetzt anfragen."
      />

      <Stats
        items={[
          { v: "200+", l: "Events seit 2016" },
          { v: "100+", l: "Firmen-Events — vom Team-Abend bis zur Gala" },
          { v: "3x", l: "TV-Finalist (Greatest Talent 2023, Talents of Magic 2024)" },
          { v: "ab 395 €", l: "Transparentes Angebot binnen 24 Stunden" },
        ]}
      />

      <InteractiveTabs
        eyebrow="So läuft der Abend"
        title={<>Vom Empfang bis zum <span style={{ color: COBALT }}>Finale</span> — eingetaktet in eure Feier.</>}
        tabs={[
          { t: "Empfang · Walk-Around", d: "Während Glühwein oder Aperitif gehe ich von Gruppe zu Gruppe. Kollegen aus Abteilungen, die sonst nie zusammenstehen, lachen über denselben Moment — der Abend ist sofort warm.", img: tab1, pos: "top" },
          { t: "Dinner · Tisch-zu-Tisch", d: "Zwischen den Gängen bekommt jeder Tisch seinen eigenen Moment. Magie direkt in den Händen eurer Gäste — ohne dass Service oder Reden ins Stocken geraten.", img: tab2 },
          { t: "Bühnenshow als Höhepunkt", d: "20–30 Minuten Comedy und Mentalmagie für alle gleichzeitig — mit Kollegen auf der Bühne und einem Finale, über das beim nächsten Meeting noch geredet wird.", img: tab3, pos: "top" },
        ]}
      />

      <FormatCards
        eyebrow="Welches Format passt"
        title={<>Drei Formate für jede Weihnachtsfeier — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="Vom 20-köpfigen Team-Essen bis zur Weihnachtsgala mit mehreren hundert Gästen."
        note="Ihr wählt den Mix — ich stimme den Ablauf mit eurer Location ab."
        formats={[
          { t: "Close-Up", d: "Magie am Tisch und beim Empfang.", h: "/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über das ganze Weihnachtsmenü.", h: "/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <NotificationFlow
        eyebrow="In der Saison zählt Tempo"
        title={<>Anfragen, Angebot, <span style={{ color: COBALT }}>Termin fix</span>.</>}
        sub="Für Weihnachtsfeiern plant ihr am besten 8–12 Wochen Vorlauf ein — die Freitage und Samstage im Dezember sind zuerst weg. Kurzfristig geht es trotzdem oft: einfach fragen."
        steps={[
          { Icon: Check, t: "Anfrage mit Datum & Ort", d: "Zwei Minuten, unverbindlich." },
          { Icon: Clock, t: "Antwort & Angebot", d: "In unter 24 Stunden." },
          { Icon: CalendarCheck, t: "Termin reserviert", d: "Eure Weihnachtsfeier steht." },
        ]}
      />

      <GlassFeatures
        eyebrow="Im Preis enthalten"
        title={<>Alles drin — <span style={{ color: COBALT }}>keine versteckten Kosten</span>.</>}
        sub="Was bei einer Weihnachtsfeier-Buchung selbstverständlich dabei ist."
        items={[
          { Icon: MessageSquare, t: "Vorab-Briefing", d: "Firmen-Stories, Namen und Insider-Gags aus eurem Jahr — eingebaut in die Show." },
          { Icon: Route, t: "Anfahrt transparent", d: "Aus Regensburg, im Angebot ausgewiesen." },
          { Icon: Headphones, t: "Headset & Ton inklusive", d: "Für die Bühnenshow — Tech-Rider auf Anfrage." },
          { Icon: ShieldCheck, t: "Rechtssicher für Firmen", d: "Berufshaftpflicht und DSGVO/AVV auf Wunsch." },
          { Icon: Languages, t: "Deutsch & Englisch", d: "Für internationale Teams." },
          { Icon: Timer, t: "Pünktlich vor Ort", d: "Aufbau rund 30 Minuten vor Beginn." },
        ]}
      />

      {/* Region — interne Links auf die Stadtseiten (lokale Relevanz). */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Einsatzgebiet"
            title={<>Weihnachtsfeiern in <span style={{ color: COBALT }}>ganz Bayern</span>.</>}
            sub="Zuhause in Regensburg — für eure Weihnachtsfeier bin ich in der Oberpfalz, in Niederbayern, Oberbayern und Franken unterwegs."
          />
          <motion.div variants={up} className="flex flex-wrap gap-2.5 mt-8">
            {REGION.map(([slug, name]) => (
              <Link
                key={slug}
                to={`/zauberer/${slug}`}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14.5px] font-semibold"
                style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}`, color: INK }}
              >
                <Snowflake className="w-3.5 h-3.5" style={{ color: COBALT }} /> Zauberer {name}
              </Link>
            ))}
          </motion.div>
          <p className="mt-6 text-[15px]" style={{ color: L_DIM }}>
            Mehr zu Firmen-Events allgemein: <Link to="/firmenfeiern" className="underline" style={{ color: COBALT }}>Zauberer für Firmenfeiern</Link>.
          </p>
        </div>
      </motion.section>

      <PullQuote
        text="Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach mega. Alle 200 Gäste begeistert."
        name="Jan von Lehmann"
        role="Eventleitung · Magic Camp, 200 Gäste"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        items={[
          {
            q: "Was kostet ein Zauberer für die Weihnachtsfeier?",
            a: "Pakete starten ab 395 €. Der genaue Preis hängt vom Format (Close-Up, Bühnenshow oder Magic Dinner), der Dauer und der Anfahrt ab. Nach einer kurzen Anfrage bekommt ihr innerhalb von 24 Stunden ein verbindliches Angebot ohne versteckte Kosten.",
          },
          {
            q: "Wie früh sollten wir für die Weihnachtsfeier buchen?",
            a: "Am besten 8–12 Wochen vorher. Die Freitage und Samstage im Dezember sind in der Regel zuerst vergeben. Kurzfristige Anfragen klappen trotzdem oft, wenn der Termin frei ist — fragt einfach an.",
          },
          {
            q: "Welches Format passt zu unserer Weihnachtsfeier?",
            a: "Bei einem Essen mit Kollegen passt Close-Up von Tisch zu Tisch. Ab etwa 50 Gästen lohnt sich die Kombination: Close-Up beim Empfang, Bühnenshow als Höhepunkt. Für Restaurant-Feiern gibt es das Magic Dinner, durchkomponiert über das ganze Menü.",
          },
          {
            q: "Kommt ihr auch zu uns — außerhalb von Regensburg?",
            a: "Ja. Ich bin in ganz Bayern unterwegs, zum Beispiel in München, Nürnberg, Ingolstadt, Landshut, Passau, Straubing, Amberg und Weiden. Die Anfahrt steht transparent im Angebot.",
          },
          {
            q: "Was brauchen wir vor Ort?",
            a: "Für Close-Up nichts — ich komme an die Tische. Für die Bühnenshow reichen eine kleine freie Fläche und Anschluss an eure Tonanlage; ein Headset bringe ich mit. Den Ablauf stimme ich vorab mit euch und der Location ab.",
          },
          {
            q: "Wird die Show auf unsere Firma zugeschnitten?",
            a: "Ja. Im Vorab-Briefing sammle ich Stories, Namen und Running Gags aus eurem Jahr und baue sie in die Show ein. Die Tonalität reicht von festlich bis Comedy — passend zu eurem Team.",
          },
        ]}
      />

      <FinalCTA
        title={<>Sichert euch euren Dezember-Termin<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Weihnachtsfeier — Datum, Ort, Gästezahl. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
