/** /demo/event-agenturen — Buyer-Persona Event-Agenturen (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, WarumCarousel, DarkShowcase, FormatCards } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Handshake, ShieldCheck, Hand, Wand2, UtensilsCrossed } from "lucide-react";
import heroImg from "@/assets/emilian-portrait-cards.jpg";
import splitImg from "@/assets/magicdinner-buehne.jpg";
import carA from "@/assets/buehne-zuschauer.jpg";
import carB from "@/assets/audience-reactions.jpg";
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

      <FormatCards
        eyebrow="Welche Formate passen"
        title={<>Drei Formate für euer Programm — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="White-label kombinierbar — was immer eure Kunden brauchen."
        note="Modular buchbar — passend zum Programm eurer Kunden."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/demo/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/demo/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/demo/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Agenturen mit mir arbeiten?"
        title={<>Sechs Gründe, warum Agenturen mich <span style={{ color: COBALT }}>weiterbuchen</span><span style={{ color: MAGENTA }}>.</span></>}
        cards={[
          { kind: "photo", image: carA, chip: "Bühnenerprobt", title: "Auch unter Live-Druck sicher", text: "Vor großem Publikum erprobt — der Act sitzt, auch wenn euer Kunde zuschaut.", pos: "center" },
          { kind: "feature", Icon: Handshake, title: "White-Label", text: "Fügt sich nahtlos in euer Programm ein — euer Kunde sieht ein rundes Event, nicht zehn Einzelteile." },
          { kind: "stat", v: "200+", l: "Events für Agenturen & Direktkunden", text: "Routine in jedem Rahmen — vom Empfang bis zur großen Gala." },
          { kind: "review", text: "Wir buchen Emilian seit Jahren — verlässlich, professionell, nie ein Problem. Genau der Act, den man Kunden bedenkenlos empfiehlt.", name: "Jan von Lehmann · Event-Agentur" },
          { kind: "photo", image: carB, chip: "Echte Reaktionen", title: "Der Saal geht mit", text: "Comedy, über die mitgelacht wird — eine Show, die euren Programmpunkt zum Highlight macht.", pos: "center" },
          { kind: "feature", Icon: ShieldCheck, title: "Kein Risiko", text: "Tech-Rider, Versicherung, Vertrag und Briefing kommen sauber und rechtzeitig — kein einziger Ausfall." },
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
