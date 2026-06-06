/** /demo/moderation — Moderation (kreativ, abwechslungsreich). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, ExampleSets, FlowBand, Bento, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Mic2, Clock, Languages, Sparkles, Users } from "lucide-react";
import heroImg from "@/assets/moderator-hero.jpg";
import splitImg from "@/assets/buehne-zuschauer.jpg";
import bentoImg from "@/assets/audience-reactions.jpg";
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

      <FlowBand
        eyebrow="So läuft der Abend"
        title="Vom ersten Briefing bis zum letzten Applaus."
        sub="Eine Moderation ist Vorbereitung. Wir stimmen den Ablauf vorab ab, ich führe sicher durch den Abend und setze die magischen Akzente an den richtigen Stellen."
        milestones={[
          { t: "Vorab-Abstimmung", d: "Ablaufplan, Namen, Timing — alles vor dem Event geklärt." },
          { t: "Durch den Abend führen", d: "Programmpunkte verbinden, Energie und Tempo halten." },
          { t: "Magische Akzente", d: "Kleine Momente Magie statt Lückenfüller — pointiert gesetzt." },
        ]}
      />

      <Bento
        eyebrow="Warum es funktioniert"
        title="Routine, Energie und ein Faden, der nicht reißt."
        sub="Über 200 Events Bühnenerfahrung — als Moderator weiß ich genau, wie man einen Saal durch einen ganzen Abend trägt."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Roter Faden", title: "Ein Abend, der sich rund und durchdacht anfühlt." },
          { kind: "cobalt", span: "col-span-1", v: "200+", l: "Events seit 2016" },
          { kind: "glass", span: "col-span-1", Icon: Mic2, t: "Roter Faden", d: "Programmpunkte verbunden, Energie gehalten." },
          { kind: "quote", span: "col-span-2", text: "Hat den ganzen Abend zusammengehalten — souverän und mit Charme.", name: "Jan von Lehmann · Eventleitung" },
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
