/** /demo/event-agenturen — Anlass-Template (Event-Agenturen). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Steps, GlassFeatures, Statement, PullQuote, Stats, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { FileText, MessageSquare, Layers, Maximize, Award, Briefcase } from "lucide-react";
import teamImg from "@/assets/talents-of-magic-team.jpg";

export default function DemoEventAgenturen() {
  return (
    <VoltageShell
      title="DEMO · Act für Event-Agenturen — verlässlich & white-label | Emilian Leber"
      description="Partner für Event-Agenturen: ein verlässlicher Magie-Act für eure Kunden. Konzept, Pitch, Vertrag und Briefing aus einer Hand, white-label-tauglich, flexibel von Close-Up bis Bühne. Seit Jahren Stamm-Act für Agenturen."
      path="/demo/event-agenturen"
    >
      <SubHero
        eyebrow="Anlass · Event-Agenturen"
        title={<>Verlässlicher Act für <span style={{ color: COBALT }}>eure Kunden</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Ein Partner, der mitdenkt: Konzept, Pitch, Vertrag und Briefing aus einer Hand, sauberes Timing vor Ort und white-label-tauglich. Damit eure Kunden glänzen — und ihr ruhig schlafen könnt."
        image={teamImg}
        imageAlt="Magie-Act für Event-Agenturen auf der Bühne"
        badge="„Emilian hat Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert."
      />

      <Steps
        eyebrow="So läuft die Zusammenarbeit"
        title="Von der Anfrage bis zur Nachbereitung."
        sub="Ihr habt einen Ansprechpartner, der den Ablauf kennt und euch Arbeit abnimmt — nicht macht."
        items={[
          { t: "Briefing & Konzept", d: "Ihr schildert Anlass, Zielgruppe und Rahmen — ich liefere ein passendes Konzept, einen Pitch-tauglichen Vorschlag und alle Unterlagen für eure Kunden." },
          { t: "Saubere Umsetzung vor Ort", d: "Pünktlich, vorbereitet und im Programm eingetaktet. Ich halte mich an Timing und Ablauf und füge mich nahtlos ins Event-Design ein." },
          { t: "Nachbereitung", d: "Kurzes Feedback, klare Abrechnung und Material für eure Doku. Bei wiederkehrenden Kunden wird der Prozess von Mal zu Mal schlanker." },
        ]}
      />

      <GlassFeatures
        eyebrow="Warum Agenturen mich buchen"
        title="Ein Act, auf den ihr euch verlasst."
        sub="Planbar, kommunikativ und flexibel — der Unterschied zwischen einem Künstler und einem echten Partner."
        items={[
          { Icon: FileText, t: "Alles aus einer Hand", d: "Konzept, Pitch, Vertrag und Briefing kommen gebündelt — ihr müsst nichts zusammensuchen oder nachfragen." },
          { Icon: MessageSquare, t: "Verlässliche Kommunikation", d: "Antwort in unter 24 Stunden, klares Timing und keine Überraschungen am Eventtag." },
          { Icon: Layers, t: "White-label-tauglich", d: "Ich füge mich ins Programm und ins Branding eures Kunden ein — der Act ist Teil eures Konzepts, nicht eine Eigenwerbung." },
          { Icon: Award, t: "Tech-Rider & Versicherung", d: "Tech-Rider, Haftpflicht und alle Nachweise auf Anfrage — sauber dokumentiert für eure Unterlagen." },
          { Icon: Maximize, t: "Flexibel im Format", d: "Von Close-Up am Stand bis zur Bühnenshow im Saal — skalierbar je nach Anlass und Gästezahl." },
          { Icon: Briefcase, t: "Seit Jahren Stamm-Act", d: "Mehrere Agenturen buchen mich regelmäßig — weil Verlass auf Qualität und Ablauf einfach Zeit spart." },
        ]}
      />

      <Statement>Euer Kunde glänzt — <span style={{ color: COBALT }}>ihr</span> sieht gut aus.</Statement>

      <PullQuote
        text="Emilian hat Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach mega — alle Gäste begeistert."
        name="Jan von Lehmann"
        role="Eventleitung · Agentur"
      />

      <Stats items={[
        { v: "200+", l: "Events seit 2016" },
        { v: "100+", l: "Firmen-Engagements" },
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "<24 Std", l: "Antwortzeit" },
      ]} />

      <ReviewsBlock />

      <FinalCTA
        title={<>Ein Partner, der eure Kunden begeistert<span style={{ color: MAGENTA }}>.</span></>}
        sub="Schickt mir kurz Anlass, Datum und Rahmen — ich liefere euch ein passendes Konzept und melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
