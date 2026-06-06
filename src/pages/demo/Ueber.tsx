/** /demo/ueber — Über (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { DarkShowcase, SplitFeature, Bento, FlowBand } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Tv, Trophy, Award } from "lucide-react";
import heroImg from "@/assets/magician-portrait.jpg";
import storyImg from "@/assets/emilian-portrait-cards.jpg";
import splitImg from "@/assets/emotionen.jpg";
import bentoImg from "@/assets/greatest-talent-presse.jpg";

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

      <Bento
        eyebrow="Bühnen & Auszeichnungen"
        title="Wo ich schon stand."
        sub="TV-Finals, Wettbewerbe und über 200 Live-Events — Routine, die euch Sicherheit gibt."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Greatest Talent 2023", title: "Finalist vor TV-Publikum und Kameras." },
          { kind: "cobalt", span: "col-span-1", v: "3×", l: "TV-Finalist" },
          { kind: "glass", span: "col-span-1", Icon: Trophy, t: "Talents of Magic", d: "Finalist + Kreativpreis 2024." },
          { kind: "quote", span: "col-span-2", text: "Emilian ist der einzige, dem ich seit Jahren blind vertraue.", name: "Katrin Raß · Hochzeitsplanerin" },
        ]}
      />

      <FlowBand
        eyebrow="Mein Weg"
        title="Drei Jahre, drei Bühnen."
        sub="Von der TV-Show bis zum eigenen Format — kontinuierlich auf großen Bühnen."
        milestones={[
          { t: "Greatest Talent 2023", d: "Finalist der TV-Show (SAT.1)." },
          { t: "Talents of Magic 2024", d: "Finalist und Kreativpreis." },
          { t: "TVA-TV 2025", d: "Porträt im regionalen Fernsehen." },
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
