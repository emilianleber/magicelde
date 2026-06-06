/** /demo/comedy — Show-Detail-Template (Comedy-Zauberei). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, FactsGrid, Statement, GlassFeatures, Steps, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Clock, Users, Smile, Heart, Sparkles, MessageSquare, Wand2, Hand, Target, Award } from "lucide-react";
import comedyImg from "@/assets/emotionen.jpg";

export default function DemoComedy() {
  return (
    <VoltageShell
      title="DEMO · Comedy-Zauberei — staunen und lachen | Emilian Leber"
      description="Comedy-Zauberei in Bayern & deutschlandweit — Stand-Up trifft Mentalmagie. Staunen und lachen im selben Moment, kein Fremdscham-Humor. 15–45 Min, 30–500 Gäste."
      path="/demo/comedy"
    >
      <SubHero
        eyebrow="Konzept · Comedy-Zauberei"
        title={<>Comedy, die <span style={{ color: COBALT }}>hängenbleibt</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Stand-Up trifft Mentalmagie: staunen UND lachen im selben Moment — nicht nacheinander. Pointen, die sitzen, Magie als Setup für die Lacher. Ohne Fremdscham, immer mit dem Publikum."
        image={comedyImg}
        imageAlt="Emilian Leber bei einer Comedy-Zauberei mit lachendem Publikum"
        badge="Gelacht und gestaunt — der Act, über den man am Tag danach noch redet."
        secondary={{ label: "Show ansehen", href: "/demo#show" }}
      />

      <FactsGrid items={[
        { Icon: Clock, k: "Dauer", v: "15 – 45 Minuten" },
        { Icon: Users, k: "Gäste", v: "30 – 500 Personen" },
        { Icon: Smile, k: "Comedy-Dosis", v: "nach Anlass" },
        { Icon: Heart, k: "Humor", v: "kein Fremdscham" },
      ]} />

      <Statement>Staunen und Lachen im selben Moment — nicht <span style={{ color: COBALT }}>nacheinander</span>.</Statement>

      <GlassFeatures
        eyebrow="Was die Comedy ausmacht"
        title="Sechs Dinge, die hängenbleiben."
        sub="Stand-Up trifft Mentalmagie — modular auf eure Eventlänge und euren Anlass abgestimmt."
        items={[
          { Icon: Target, t: "Pointen, die sitzen", d: "Kein Witz-Gewitter, sondern Timing. Jede Pointe ist gebaut — und landet." },
          { Icon: Heart, t: "Gelacht wird mit", d: "Nie über jemanden, immer miteinander. Humor, der den ganzen Saal mitnimmt." },
          { Icon: Sparkles, t: "Magie als Setup", d: "Das Unmögliche ist die Vorlage für den Lacher — staunen wird zur Pointe." },
          { Icon: Hand, t: "Echte Interaktion", d: "Gäste werden eingebunden — ohne Fremdscham, mit echtem Aha-Moment." },
          { Icon: Wand2, t: "Maßgeschneiderte Tonalität", d: "Von dezent-elegant bis comedy-lastig — die Dosis stimmt sich auf den Anlass ab." },
          { Icon: Award, t: "200+ Events Routine", d: "Über 200 Auftritte — die Pointen sind erprobt, das Timing sitzt im Schlaf." },
        ]}
      />

      <Steps
        eyebrow="Drei Akte"
        title="So entsteht der Lacher."
        sub="Je nach Eventlänge und Programmpunkten — ich takte die Comedy in euren Abend ein."
        items={[
          { t: "Aufwärmen", d: "Erste Pointen brechen das Eis — der Saal merkt: hier wird gelacht, nicht ausgelacht." },
          { t: "Mitnehmen", d: "Magie und Comedy verzahnen sich — staunen wird zur Vorlage für den nächsten Lacher." },
          { t: "Pointen-Finale", d: "Der Höhepunkt, bei dem Verblüffung und Lacher zusammenfallen — der Moment, über den man redet." },
        ]}
      />

      <PullQuote
        text="Alle sprechen noch Wochen danach davon. Selbst die Gäste, die ich am wenigsten für Magie offen hielt, waren am Ende am stärksten geflasht."
        name="Martina Senftl"
        role="Eventkundin"
      />

      <ReviewsBlock />

      <FinalCTA
        title={<>Bereit für den Act, über den alle noch reden<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
