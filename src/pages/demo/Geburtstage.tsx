/** /demo/geburtstage — Anlass (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, Bento, InteractiveTabs } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Cake } from "lucide-react";
import heroImg from "@/assets/hero-birthday.jpg";
import splitImg from "@/assets/emotionen.jpg";
import bentoImg from "@/assets/audience-reactions.jpg";
import tabA from "@/assets/hero-birthday.jpg";
import tabB from "@/assets/audience-reactions.jpg";
import tabC from "@/assets/stage-show.jpg";

export default function DemoGeburtstage() {
  return (
    <VoltageShell
      title="DEMO · Zauberer für Geburtstag & Jubiläum | Emilian Leber"
      description="Zauberer für Geburtstag und Jubiläum in Bayern & deutschlandweit. Comedy-lastig und herzlich, mit persönlichen Insidern zum Jubilar — vom runden 60er bis zur großen Familienfeier. 80+ Feiern."
      path="/demo/geburtstage"
    >
      <SubHero
        eyebrow="Anlass · Geburtstag & Jubiläum"
        title={<>Zauberer für Geburtstag & <span style={{ color: COBALT }}>Jubiläum</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Die Show, über die man noch redet — comedy-lastig, herzlich und mit persönlichen Insidern zum Jubilar. Vom runden 50er bis zur großen Familienfeier."
        image={heroImg}
        imageAlt="Zauberer bei einer Geburtstagsfeier"
        badge="Selbst die Skeptiker am Tisch sind am Ende am stärksten geflasht."
      />

      <SplitFeature
        eyebrow="So fühlt sich der Abend an"
        title={<>Staunen und lachen — und <span style={{ color: COBALT }}>jeder</span> ist dabei.</>}
        sub="Comedy-lastig und herzlich: Ich binde alle ein, auch die Skeptiker, und arbeite persönliche Insider zum Jubilar in die Show ein. Magie, die berührt statt nur verblüfft."
        points={["Vom runden 50er und 60er bis zur großen Familienfeier", "Flexible Längen — vom Walk-Around bis zur kleinen Bühnenshow", "Staunen und lachen im Wechsel, der ganze Tisch geht mit"]}
        image={splitImg}
        imageAlt="Emilian Leber mit Gästen"
        reverse
        stat={{ v: "80+", l: "Geburtstage & Jubiläen" }}
      />

      <Bento
        eyebrow="Warum man mich für die Feier bucht"
        title="Mehr als Tricks — ein Abend mit Herz."
        sub="Comedy und Emotion im Wechsel, jeder Gast wird Teil der Show."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Echte Reaktionen", title: "Auch die skeptischen Gäste sind am Ende am stärksten geflasht." },
          { kind: "cobalt", span: "col-span-1", v: "80+", l: "Geburtstage & Jubiläen" },
          { kind: "glass", span: "col-span-1", Icon: Cake, t: "Auch für Skeptiker", d: "Wer nichts erwartet, staunt am meisten." },
          { kind: "quote", span: "col-span-2", text: "Du warst der absolute Höhepunkt unserer Feier — sogar meine Mutter war komplett geflasht.", name: "Martina Senftl" },
        ]}
      />

      <InteractiveTabs
        eyebrow="Drei Formate, ein Abend"
        title={<>Genau so viel Magie, wie eure Feier <span style={{ color: COBALT }}>braucht</span>.</>}
        tabs={[
          { t: "Walk-Around", d: "Close-Up direkt unter den Gästen — Magie in den Händen, von Grüppchen zu Grüppchen. Perfekt als Eisbrecher beim Sektempfang.", img: tabA },
          { t: "Tisch-Highlights", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, mit Insidern zum Jubilar und viel Lachen.", img: tabB },
          { t: "Kleine Bühnenshow", d: "15–25 Minuten als Höhepunkt des Abends — Comedy, Mentalmagie und ein Gänsehaut-Finale. Für 20 bis 200 Gäste.", img: tabC },
        ]}
      />

      <PullQuote
        text="Du warst der absolute Höhepunkt unserer Feier. Was ich nicht erwartet hätte: dass ausgerechnet die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter."
        name="Martina Senftl"
        role="Geburtstagsfeier · Bayern"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Macht dem Jubilar einen Abend, über den man noch redet<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Feier — Anlass, Datum, Ort und Gästezahl. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
