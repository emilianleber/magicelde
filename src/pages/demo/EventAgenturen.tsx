/** /demo/event-agenturen — Buyer-Persona Event-Agenturen (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, FlowBand, Bento, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Handshake } from "lucide-react";
import heroImg from "@/assets/talents-of-magic-team.jpg";
import splitImg from "@/assets/magicdinner-buehne.jpg";
import bentoImg from "@/assets/greatest-talent-presse.jpg";
import darkImg from "@/assets/stage-show.jpg";

export default function DemoEventAgenturen() {
  return (
    <VoltageShell
      title="DEMO · Act für Event-Agenturen — verlässlich & white-label | Emilian Leber"
      description="Verlässlicher Act für Event-Agenturen — Konzept, Pitch, Vertrag und Briefing aus einer Hand, white-label-tauglich. Flexibel von Close-Up bis Bühne. Seit Jahren Stamm-Act für Agenturen."
      path="/demo/event-agenturen"
    >
      <SubHero
        eyebrow="Für Event-Agenturen"
        title={<>Ein Partner, auf den ihr euch <span style={{ color: COBALT }}>verlassen</span> könnt<span style={{ color: MAGENTA }}>.</span></>}
        sub="Ich bin der Act, den ihr euren Kunden ohne Risiko empfehlt — verlässliche Kommunikation, sauberes Timing und ein Auftritt, der sich nahtlos in euer Programm fügt."
        image={heroImg}
        imageAlt="Emilian Leber mit Event-Team"
        badge="Seit Jahren Stamm-Act für Agenturen — ohne einen einzigen Ausfall."
      />

      <SplitFeature
        eyebrow="Aus einer Hand"
        title={<>Konzept, Pitch, Vertrag und Briefing — <span style={{ color: COBALT }}>komplett.</span></>}
        sub="Ihr bekommt einen Act, der mitdenkt: Ich liefere euch Konzept und Pitch-Material, kümmere mich um Vertrag und Briefing und füge mich white-label-tauglich in euer Programm ein. Euer Kunde sieht ein rundes Event — nicht zehn Einzelteile."
        points={["Verlässliche Kommunikation und sauberes Timing — ihr müsst nicht nachhaken", "Tech-Rider und Versicherungsnachweis auf Anfrage", "Flexibel skalierbar von Close-Up bis große Bühne"]}
        image={splitImg}
        imageAlt="Emilian Leber auf der Bühne beim Magic Dinner"
        reverse
        stat={{ v: "200+", l: "Events" }}
      />

      <FlowBand
        eyebrow="So läuft die Zusammenarbeit"
        title={<>Drei Etappen — <span style={{ color: COBALT }}>planbar</span> von Anfang bis Ende.</>}
        sub="Klare Abläufe, an jedem Punkt ansprechbar. Ihr behaltet die Kontrolle über euer Event, ich liefere meinen Part verlässlich."
        milestones={[
          { t: "Briefing & Konzept", d: "Wir klären Format, Zielgruppe und Programmpunkt — ich liefere Pitch-Material und Konzeptvorschlag." },
          { t: "Umsetzung vor Ort", d: "Pünktlich, vorbereitet, im Timing — Close-Up oder Bühne, ohne dass ihr nachsteuern müsst." },
          { t: "Nachbereitung", d: "Saubere Abrechnung, ehrliches Feedback und Bilder fürs Portfolio — bereit fürs nächste Mal." },
        ]}
      />

      <Bento
        eyebrow="Warum Agenturen mit mir arbeiten"
        title="Ein Act, viele Formate — ein verlässlicher Ansprechpartner."
        sub="Skalierbar, white-label-tauglich und seit Jahren ohne Reklamation."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Greatest Talent", title: "Bühnenerprobt vor großem Publikum — auch unter Live-Druck." },
          { kind: "cobalt", span: "col-span-1", v: "200+", l: "Events für Agenturen & Direktkunden" },
          { kind: "glass", span: "col-span-1", Icon: Handshake, t: "White-Label", d: "Fügt sich nahtlos in euer Programm ein." },
          { kind: "quote", span: "col-span-2", text: "Wir buchen Emilian seit Jahren — verlässlich, professionell, nie ein Problem. Genau der Act, den man Kunden bedenkenlos empfiehlt.", name: "Jan von Lehmann · Event-Agentur" },
        ]}
      />

      <DarkShowcase
        eyebrow="Ein Act, kein Risiko"
        title={<>Seit Jahren Stamm-Act für <span style={{ color: COBALT }}>Agenturen</span><span style={{ color: MAGENTA }}>.</span></>}
        paras={[
          "Wenn ihr einen Act für den Kunden bucht, hängt euer Name daran. Genau deshalb arbeiten Agenturen seit Jahren mit mir — weil sie wissen, dass geliefert wird: pünktlich, vorbereitet, ohne Drama.",
          "Ich kenne den Unterschied zwischen einem Solo-Gig und einem Programmpunkt in einem größeren Event. Ich halte mein Timing, spreche mich mit Technik und Moderation ab und mache euren Ablauf nicht kaputt — ich mache ihn besser.",
          "Tech-Rider, Versicherung, Vertrag und Briefing kommen sauber und rechtzeitig. Ihr habt eine Sorge weniger und einen Programmpunkt mehr, an den sich der Kunde am Ende des Abends erinnert.",
        ]}
        image={darkImg}
        imageAlt="Emilian Leber bei einer Bühnenshow"
        badge="Kein einziger Ausfall in der Zusammenarbeit."
      />

      <PullQuote
        text="Wir buchen Emilian seit Jahren für unsere Kunden — verlässlich, professionell, immer im Timing. Genau der Act, den man bedenkenlos empfiehlt, ohne nachzuhaken."
        name="Jan von Lehmann"
        role="Event-Agentur · München"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Sucht ihr einen verlässlichen Act für euren Kunden<span style={{ color: MAGENTA }}>?</span></>}
        sub="Schreibt mir kurz Format, Termin und Rahmen. Ihr bekommt Konzept, Pitch-Material und ein verbindliches Angebot — meist innerhalb von 24 Stunden."
      />
    </VoltageShell>
  );
}
