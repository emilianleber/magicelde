/** /demo/geburtstage — Anlass (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, WarumCarousel, InteractiveTabs, FormatCards } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Hand, Wand2, UtensilsCrossed, Heart, Smile } from "lucide-react";
import heroImg from "@/assets/hero-birthday.jpg";
import splitImg from "@/assets/emotionen.jpg";
import carA from "@/assets/audience-reactions.jpg";
import carB from "@/assets/emilian-magic-dinner.jpg";
import tabA from "@/assets/haende-interaktion.jpg";
import tabB from "@/assets/zuschauer-blau.jpg";
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

      <WarumCarousel
        eyebrow="Warum zum Geburtstag?"
        title={<>Sechs Gründe, warum der ganze <span style={{ color: COBALT }}>Tisch</span> mitgeht.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Echte Reaktionen", title: "Auch die Skeptiker", text: "Wer nichts erwartet, staunt am meisten — und ist am Ende am stärksten geflasht.", pos: "center" },
          { kind: "stat", v: "80+", l: "Geburtstage & Jubiläen", text: "Vom runden 50er bis zur großen Familienfeier — Routine für jeden Anlass." },
          { kind: "feature", Icon: Heart, title: "Persönliche Insider", text: "Ich arbeite kleine Geschichten zum Jubilar in die Show ein — Magie, die berührt." },
          { kind: "photo", image: carB, chip: "Comedy & Herz", title: "Staunen und lachen", text: "Comedy-lastig und herzlich — der ganze Tisch geht mit, im Wechsel aus Lachen und Gänsehaut.", pos: "center" },
          { kind: "review", text: "Du warst der absolute Höhepunkt unserer Feier — sogar meine Mutter war komplett geflasht.", name: "Martina Senftl · Geburtstagsfeier" },
          { kind: "feature", Icon: Smile, title: "Jeder ist dabei", text: "Ich binde alle ein, auch die Schüchternen — niemand wird vorgeführt, alle haben Spaß." },
        ]}
      />

      <InteractiveTabs
        eyebrow="Drei Formate, ein Abend"
        title={<>Genau so viel Magie, wie eure Feier <span style={{ color: COBALT }}>braucht</span>.</>}
        tabs={[
          { t: "Walk-Around", d: "Close-Up direkt unter den Gästen — Magie in den Händen, von Grüppchen zu Grüppchen. Perfekt als Eisbrecher beim Sektempfang.", img: tabA, pos: "center" },
          { t: "Tisch-Highlights", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, mit Insidern zum Jubilar und viel Lachen.", img: tabB, pos: "center" },
          { t: "Kleine Bühnenshow", d: "15–25 Minuten als Höhepunkt des Abends — Comedy, Mentalmagie und ein Gänsehaut-Finale. Für 20 bis 200 Gäste.", img: tabC, pos: "top" },
        ]}
      />

      <FormatCards
        eyebrow="Welche Formate passen"
        title={<>Drei Formate für euren Geburtstag — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="Von der Tischmagie unter Gästen bis zur kleinen Bühnenshow als Finale."
        note="Frei kombinierbar — Tischmagie, Bühne oder beides."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/demo/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/demo/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/demo/magic-dinner", Icon: UtensilsCrossed },
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
