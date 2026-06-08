/** /event-agenturen — Buyer-Persona Event-Agenturen (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, WarumCarousel, DarkShowcase, FormatCards } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Handshake, ShieldCheck, Hand, Wand2, UtensilsCrossed } from "lucide-react";
import heroImg from "@/assets/emilian-portrait-cards.jpg";
import splitImg from "@/assets/magicdinner-buehne.jpg";
import carA from "@/assets/hero-stage.jpg";
import carB from "@/assets/audience-reactions.jpg";
import darkImg from "@/assets/moderator-hero.jpg";

export default function EventAgenturen() {
  return (
    <VoltageShell
      title="Zauberer für Eventagenturen — Schnellangebot, White-Label, AVV | Emilian Leber"
      description="Zauberkünstler-Partner für Eventagenturen und Veranstaltungsplaner. Schnellangebot in 8 Stunden, schriftlicher Vertrag, AVV, DSGVO, Versicherung. White-Label optional. Bühne, Close-Up, Magic Dinner aus einer Hand."
      path="/event-agenturen"
      noindex={false}
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
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/magic-dinner", Icon: UtensilsCrossed },
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

      <FAQ
        items={[
          {
            q: "Wie läuft die Anfrage für einen Kunden-Act ab?",
            a: "Schreibt mir über /kontakt kurz Format, Termin und Rahmen eures Events. Ihr bekommt eine Antwort binnen 24 Stunden, dazu auf Wunsch Pitch-Material, mit dem ihr direkt bei eurem Kunden punkten könnt.",
          },
          {
            q: "Was kostet das ungefähr?",
            a: "Die Gage ist abhängig von Dauer, Anfahrt und Gästezahl, deshalb gibt es keinen festen Listenpreis. Nach einer kurzen Anfrage bekommt ihr ein verbindliches, white-label-taugliches Angebot, das ihr sauber an euren Kunden weitergeben könnt.",
          },
          {
            q: "Was braucht ihr für Vertrag, Tech-Rider und Briefing?",
            a: "Vertrag, Tech-Rider, Versicherungsnachweis und ein White-Label-Briefing kommen aus einer Hand und rechtzeitig vor dem Termin. Ihr müsst nichts nachhalten und gebt eurem Kunden ein rundes, abgesichertes Paket.",
          },
          {
            q: "Für wie viele Gäste und welche Raumgröße eignet sich der Act?",
            a: "Vom intimen Empfang mit 20 Personen bis zur großen Gala mit mehreren hundert Gästen ist alles machbar. Close-Up funktioniert mobil von Tisch zu Tisch, die Bühnenshow füllt den ganzen Saal — ich passe das Format an Raum und Gästezahl an.",
          },
          {
            q: "Auf Deutsch oder Englisch, und wie weit reist du an?",
            a: "Die Show gibt es komplett auf Deutsch und Englisch, ideal für internationale Kunden eurer Agentur. Basis ist Bayern (Regensburg), gebucht und gespielt wird deutschlandweit — Anfahrt klären wir vorab transparent im Angebot.",
          },
          {
            q: "Wie individuell lässt sich der Act an den Kunden anpassen?",
            a: "Inhalte, Länge und Tonalität stimme ich auf Anlass und Marke eures Kunden ab und spreche mich vorab mit Technik und Moderation ab. Aus 200+ Events seit 2016 und drei TV-Finals bringe ich die Routine mit, mich nahtlos in euren Ablauf einzufügen.",
          },
        ]}
      />

      <FinalCTA
        title={<>Sucht ihr einen verlässlichen Act für euren Kunden<span style={{ color: MAGENTA }}>?</span></>}
        sub="Schreibt mir kurz Format, Termin und Rahmen. Ihr bekommt Konzept, Pitch-Material und ein verbindliches Angebot — meist innerhalb von 24 Stunden."
      />
    </VoltageShell>
  );
}
