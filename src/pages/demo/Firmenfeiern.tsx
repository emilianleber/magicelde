/** /demo/firmenfeiern — Anlass-Template (Firmenfeier). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Steps, GlassFeatures, Statement, PullQuote, Stats, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Building2, MessageSquare, Layers, Smile, FileText, Trophy } from "lucide-react";
import heroImg from "@/assets/schneider-weisse-closeup.jpg";

export default function DemoFirmenfeiern() {
  return (
    <VoltageShell
      title="DEMO · Zauberer für Firmenfeier & Firmenevent | Emilian Leber"
      description="Zauberer für die Firmenfeier in Bayern & deutschlandweit. Vom Empfang über das Dinner bis zur Bühne — Eisbrecher für gemischte Teams, Insider-Briefing und verlässliche Organisation. 100+ Firmen-Events."
      path="/demo/firmenfeiern"
    >
      <SubHero
        eyebrow="Anlass · Firmenfeier"
        title={<>Zauberer für die <span style={{ color: COBALT }}>Firmenfeier</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Vom Vorstandsdinner bis zur Mitarbeiterfeier: Empfang, Tisch-zu-Tisch und Bühne als Finale. Mit Insider-Briefing, dem richtigen Ton für euren Anlass und einer Organisation, auf die ihr euch verlassen könnt."
        image={heroImg}
        imageAlt="Zauberer bei einer Firmenfeier"
        badge="„Konzept, Pitch, Vertrag und Briefing in einem Stück — alle Gäste begeistert."
      />

      <Steps
        eyebrow="Drei Bausteine"
        title="Magie über den ganzen Abend verteilt."
        sub="Eingetaktet in euren Ablauf — vom Empfang bis zur Bühne. Ihr wählt, was zu Vorstandsdinner, Kundenabend, Galaabend oder Mitarbeiterfeier passt."
        items={[
          { t: "Empfang", d: "Close-Up Walk-Around beim Sektempfang — Magie direkt in den Händen eurer Gäste. Eisbrecher zwischen Abteilungen, Kunden und Vorstand, ganz ohne Fremdscham." },
          { t: "Dinner", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, ohne dass Reden, Service oder Zeitplan gestört werden." },
          { t: "Bühne oder Moderation", d: "20–30 Min Bühnenshow als Finale — oder ich übernehme als Moderator den roten Faden durch euren Galaabend." },
        ]}
      />

      <GlassFeatures
        eyebrow="Warum Firmen mich buchen"
        title="Mehr als Tricks — ein Act, der zum Anlass passt."
        sub="Abgestimmt auf eure Branche, euer Team und eure Tonalität. Vorbereitet, verlässlich, ohne Risiko für den Abend."
        items={[
          { Icon: MessageSquare, t: "Insider-Briefing", d: "Ich frage vorab Firmen-Stories und Running Gags ab und baue sie ein — der Moment, in dem das ganze Team aufschreit." },
          { Icon: Building2, t: "Premium bis Comedy", d: "Vom feinen Ton fürs Vorstandsdinner bis zur lauten Pointe für die Mitarbeiterfeier — die Tonalität richtet sich nach dem Anlass." },
          { Icon: Smile, t: "Eisbrecher ohne Fremdscham", d: "Gerade gemischte Teams aus Abteilungen, Kunden und Gästen kommen ins Reden — niemand wird vorgeführt." },
          { Icon: Layers, t: "Frei kombinierbar", d: "Bühne, Close-Up und Moderation lassen sich zu einem Abend zusammenstellen — genau so, wie euer Programm es braucht." },
          { Icon: FileText, t: "Verlässliche Organisation", d: "Konzept, Vertrag und Briefing aus einer Hand. Ihr bekommt einen festen Ansprechpartner und einen klaren Ablauf." },
          { Icon: Trophy, t: "100+ Firmen-Events", d: "Von der Sparkasse bis zur Roadshow — über hundert Firmen-Engagements seit 2016, gewohnt im Umgang mit Eventleitung und Agentur." },
        ]}
      />

      <Statement>Am Ende reden alle noch <span style={{ color: COBALT }}>Wochen später</span> davon.</Statement>

      <PullQuote
        text="Wir haben ein Magic Camp komplett neu aufgestellt — 200 Gäste, Workshop-Stationen, Bühnenshow als Finale. Emilian hat Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach mega. Alle Gäste begeistert."
        name="Jan von Lehmann"
        role="Eventleitung · 200 Gäste"
      />

      <Stats items={[
        { v: "100+", l: "Firmen-Engagements" },
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "200+", l: "Events seit 2016" },
        { v: "30–800", l: "Gäste pro Event" },
      ]} />

      <ReviewsBlock />

      <FinalCTA
        title={<>Macht eurem Team den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurem Event — Anlass, Datum, Ort, Gästezahl. Ich melde mich innerhalb von 24 Stunden persönlich mit einem Konzept zurück."
      />
    </VoltageShell>
  );
}
