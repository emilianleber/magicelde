/** /demo/ueber — Über (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { DarkShowcase, SplitFeature, WarumCarousel } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Tv, Award } from "lucide-react";
import heroImg from "@/assets/magician-portrait.jpg";
import storyImg from "@/assets/emilian-portrait-cards.jpg";
import splitImg from "@/assets/emotionen.jpg";
import carA from "@/assets/buehne-dpsg.jpg";
import carB from "@/assets/audience-reactions.jpg";

export default function DemoUeber() {
  return (
    <VoltageShell
      title="DEMO · Über Emilian Leber — Comedy-Zauberer aus Regensburg"
      description="Comedy-Zauberer aus Regensburg, aufgewachsen am Pass eines bayerischen Gasthauses. Stand-Up trifft Mentalmagie. 3× TV-Finalist, 200+ Events seit 2016, 5,0★."
      path="/demo/ueber"
    >
      <SubHero
        eyebrow="Über mich"
        title={<>Der Zauberer, bei dem auch <span style={{ color: COBALT }}>gelacht</span> wird<span style={{ color: MAGENTA }}>.</span></>}
        sub="Aufgewachsen am Pass eines bayerischen Gasthauses — Service-Takt und Abendregie aus erster Hand. Magie genau dort, wo sie wirkt: zwischen Menschen."
        image={heroImg}
        imageAlt="Emilian Leber, Comedy-Zauberer"
        badge="3× TV-Finalist · 200+ Events seit 2016"
        primary={{ label: "Kennenlernen", href: "/demo/kontakt" }}
      />

      <DarkShowcase
        eyebrow="Meine Geschichte"
        title={<>Staunen und Lachen — im <span style={{ color: COBALT }}>selben</span> Moment.</>}
        paras={[
          "Schon als Kind habe ich gezaubert, der erste bezahlte Auftritt kam früh. Heute mache ich es hauptberuflich: über 200 gespielte Events seit 2016, von der intimen Hochzeit bis zum Vorstands-Dinner.",
          "Comedy gehört bei mir nicht als Beilage dazu, sondern ist Teil der Magie. Eure Gäste sollen staunen — und im selben Atemzug lachen. Das bleibt hängen, länger als jeder Sektempfang.",
          "Vom feinen Premium-Auftritt für die Gala bis zur Comedy-lastigen Show für Geburtstag und Hochzeit — alles innerhalb derselben Künstlerpersönlichkeit, dosiert nach Anlass.",
        ]}
        image={storyImg}
        imageAlt="Emilian Leber mit Spielkarten"
      />

      <SplitFeature
        eyebrow="Stand-Up trifft Magie"
        title={<>Kein Trick-Automat — eine <span style={{ color: COBALT }}>Künstlerpersönlichkeit</span>.</>}
        sub="Ich verbinde Mentalmagie mit echtem Stand-Up-Handwerk. Deshalb funktioniert die Show im Vorstands-Dinner genauso wie auf der Geburtstagsfeier — nur anders dosiert."
        points={["Gewachsen aus dem Service-Takt eines bayerischen Gasthauses", "Humor, der mitnimmt — nie auf Kosten der Gäste", "Tonalität fein justiert nach Anlass und Publikum"]}
        image={splitImg}
        imageAlt="Emilian Leber mit Publikum"
        reverse
      />

      <WarumCarousel
        eyebrow="Warum Emilian?"
        title={<>Sechs Gründe, warum man mich <span style={{ color: COBALT }}>wieder</span> bucht.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Greatest Talent 2023", title: "Finalist vor TV-Publikum", text: "Auf der großen Bühne wie im kleinen Rahmen — vor Kameras genauso ruhig.", pos: "top" },
          { kind: "stat", v: "3×", l: "TV-Finalist", text: "Greatest Talent 2023, Talents of Magic 2024, TVA-Porträt 2025." },
          { kind: "feature", Icon: Tv, title: "Im Fernsehen erprobt", text: "Was vor Kameras und Live-Publikum funktioniert, funktioniert auch bei euch." },
          { kind: "photo", image: carB, chip: "Echte Reaktionen", title: "Staunen und Lachen", text: "Comedy gehört zur Magie — die Gäste lachen mit, nie über jemanden.", pos: "center" },
          { kind: "review", text: "Emilian ist der einzige, dem ich seit Jahren blind vertraue.", name: "Katrin Raß · Hochzeitsplanerin" },
          { kind: "feature", Icon: Award, title: "200+ Events seit 2016", text: "Routine aus über 200 gespielten Abenden — von der Hochzeit bis zum Vorstands-Dinner." },
        ]}
      />

      <PullQuote
        text="Er checkt das Brautpaar vorab, baut Insider ein, hält Zeitplan und bringt Ruhe in den Ablauf. Brautmutter weint regelmäßig — vor Lachen oder vor Rührung."
        name="Katrin Raß"
        role="Hochzeitsplanerin"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Lernen wir uns kennen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von deinem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
