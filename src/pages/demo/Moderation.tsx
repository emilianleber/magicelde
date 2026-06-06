/** /demo/moderation — Moderation (kreativ, abwechslungsreich). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, ExampleSets, WarumCarousel, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Mic2, Clock, Languages, Sparkles, Users, Award } from "lucide-react";
import heroImg from "@/assets/moderator-hero.jpg";
import splitImg from "@/assets/buehne-zuschauer.jpg";
import carA from "@/assets/haende-interaktion.jpg";
import carB from "@/assets/buehne-dpsg.jpg";
import darkImg from "@/assets/stage-show.jpg";

export default function DemoModeration() {
  return (
    <VoltageShell
      title="DEMO · Moderation — Roter Faden für Gala & Event | Emilian Leber"
      description="Moderation mit rotem Faden für Gala & Event — verbindet Programmpunkte, hält Energie und Timing, setzt magische Akzente statt Lückenfüller. Flexible Länge, Headset & Ton inklusive, auf Wunsch DE/EN."
      path="/demo/moderation"
    >
      <SubHero
        eyebrow="Konzept · Moderation"
        title={<>Moderation mit <span style={{ color: COBALT }}>rotem Faden</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Ein Moderator, der den Abend zusammenhält: verbindet Programmpunkte, hält Energie und Timing — und setzt magische Akzente, wo andere nur Lückenfüller liefern."
        image={heroImg}
        imageAlt="Emilian Leber als Moderator auf der Bühne"
        badge="Roter Faden — ein Abend, der sich rund anfühlt."
        secondary={{ label: "Mehr ansehen", href: "/demo#show" }}
      />

      <SplitFeature
        eyebrow="Mehr als Ansagen"
        title={<>Der <span style={{ color: COBALT }}>rote Faden</span>, der euren Abend trägt.</>}
        sub="Eine gute Moderation verbindet die Programmpunkte, hält die Energie im Saal und das Timing im Griff. Statt Lückenfüller gibt es magische Akzente, die in Erinnerung bleiben."
        points={["Flexible Länge — vom kurzen Übergang bis zur ganzen Gala", "Headset und Ton inklusive — ihr müsst nichts stellen", "Auf Wunsch zweisprachig — Deutsch oder Englisch"]}
        image={splitImg}
        imageAlt="Emilian Leber mit dem Publikum"
        stat={{ v: "DE / EN", l: "Zweisprachig auf Wunsch" }}
      />

      <ExampleSets
        eyebrow="Beispiel-Sets"
        title={<>So kann eure Moderation aussehen<span style={{ color: COBALT }}>.</span></>}
        sub="Vom roten Faden bis zur Gala-Moderation."
        sets={[
          { tag: "Gala", t: "Abend-Moderation", d: "Roter Faden durch den ganzen Abend, mit Magie-Akzenten an den Übergängen." },
          { tag: "Award", t: "Show-Moderation", d: "Anmoderationen, Timing und Energie für Preisverleihungen." },
          { tag: "Firmenevent", t: "Programm-Führung", d: "Verbindet Reden, Pausen und Programmpunkte zu einem Fluss." },
        ]}
        options={[
          { Icon: Clock, t: "Länge", d: "flexibel" },
          { Icon: Languages, t: "Sprache", d: "DE / EN" },
          { Icon: Sparkles, t: "Magie-Akzente", d: "dosierbar" },
          { Icon: Users, t: "Saalgröße", d: "bis 500" },
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Moderation?"
        title={<>Sechs Gründe, warum der <span style={{ color: COBALT }}>Faden</span> hält.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Roter Faden", title: "Ein Abend, der sich rund anfühlt", text: "Programmpunkte verbunden, Energie und Tempo gehalten — kein Bruch zwischen den Punkten.", pos: "center" },
          { kind: "stat", v: "200+", l: "Events seit 2016", text: "Routine auf jeder Bühne — vom kurzen Übergang bis zur ganzen Gala." },
          { kind: "feature", Icon: Mic2, title: "Magische Akzente", text: "Kleine Momente Magie statt Lückenfüller — pointiert an den Übergängen gesetzt." },
          { kind: "photo", image: carB, chip: "Souverän", title: "Sicher durch den ganzen Abend", text: "Auch wenn der Ablauf einmal kippt: ruhig, schlagfertig, mit Charme.", pos: "top" },
          { kind: "review", text: "Hat den ganzen Abend zusammengehalten — souverän und mit Charme.", name: "Jan von Lehmann · Eventleitung" },
          { kind: "feature", Icon: Award, title: "Vorab abgestimmt", text: "Ablaufplan, Namen und Timing klären wir vor dem Event — am Abend läuft alles." },
        ]}
      />

      <DarkShowcase
        eyebrow="Souveränität"
        title={<>Energie im Saal <span style={{ color: COBALT }}>halten</span>.</>}
        paras={[
          "Übergänge, die sitzen, ein Timing, das die Spannung trägt — und die Ruhe, auch dann souverän zu bleiben, wenn der Ablauf einmal kippt. Genau das macht den Unterschied zwischen Ansagen und echter Moderation.",
          "Headset und Ton sind inklusive, der Ablauf vorab abgestimmt. Ihr kümmert euch um euer Event — ich kümmere mich darum, dass der Faden hält.",
        ]}
        image={darkImg}
        imageAlt="Emilian Leber auf der Bühne im Scheinwerferlicht"
        badge="200+ Events"
        reverse
      />

      <PullQuote
        text="Hat unsere Gala souverän durch den Abend geführt, jeden Programmpunkt verbunden und mit den magischen Akzenten richtig Energie reingebracht."
        name="Jan von Lehmann"
        role="Eventleitung"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Bereit für einen Abend mit rotem Faden<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
