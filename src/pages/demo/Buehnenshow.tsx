/** /demo/buehnenshow — Show-Detail-Template (Bühnenshow). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, FactsGrid, Statement, GlassFeatures, Steps, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Clock, Users, Maximize, Mic2, Sparkles, Smile, Award, Layers, Wand2, Hand } from "lucide-react";
import stageImg from "@/assets/buehne-dpsg.jpg";

export default function DemoBuehnenshow() {
  return (
    <VoltageShell
      title="DEMO · Bühnenshow Zauberer — 15–60 Min Show | Emilian Leber"
      description="Bühnenshow-Zauberer in Bayern & deutschlandweit — durchkomponierte Show mit Mentalmagie, Comedy-Pointen und Standing-Ovation-Finale. 15–60 Min, 50–500 Gäste."
      path="/demo/buehnenshow"
    >
      <SubHero
        eyebrow="Konzept · Bühnenshow"
        title={<>Bühnenshow mit <span style={{ color: COBALT }}>Drama-Kurve</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Eine durchkomponierte Show für den ganzen Saal: Mentalmagie, Comedy-Pointen und ein Finale, bei dem alle aufstehen. Kein Trick-Marathon — ein Abend mit Spannungsbogen."
        image={stageImg}
        imageAlt="Emilian Leber bei einer Bühnenshow"
        badge="Standing Ovations — Show, bei der der ganze Saal mitgeht."
        secondary={{ label: "Show ansehen", href: "/demo#show" }}
      />

      <FactsGrid items={[
        { Icon: Clock, k: "Dauer", v: "15 – 60 Minuten" },
        { Icon: Users, k: "Gäste", v: "50 – 500 Personen" },
        { Icon: Maximize, k: "Bühne", v: "ab 2 × 1,5 m" },
        { Icon: Mic2, k: "Technik", v: "Headset & Ton inkl." },
      ]} />

      <Statement>Keine Trick-Parade — jede Minute hat einen <span style={{ color: COBALT }}>Spannungsbogen</span>.</Statement>

      <GlassFeatures
        eyebrow="Was die Show ausmacht"
        title="Sechs Dinge, die hängenbleiben."
        sub="Mentalmagie trifft Comedy — modular auf eure Eventlänge und euren Anlass abgestimmt."
        items={[
          { Icon: Sparkles, t: "Mentalmagie", d: "Gedanken, Vorhersagen, Unmögliches — sauber gebaut, live am Publikum." },
          { Icon: Smile, t: "Comedy-Pointen", d: "Gelacht wird mit, nie über jemanden. Humor, der den Saal mitnimmt." },
          { Icon: Award, t: "Standing-Ovation-Finale", d: "Jeder Slot endet auf einem Höhepunkt — der Moment, über den man redet." },
          { Icon: Layers, t: "Drei Längen", d: "15, 30 oder 45–60 Minuten — passend in euren Ablauf eingetaktet." },
          { Icon: Wand2, t: "Maßgeschneidert", d: "Tonalität von Premium-Gala bis Comedy-lastig — dosiert nach Anlass." },
          { Icon: Hand, t: "Echte Interaktion", d: "Gäste werden eingebunden — ohne Fremdscham, mit echtem Aha." },
        ]}
      />

      <Steps
        eyebrow="Drei Slots"
        title="Einzeln oder kombiniert."
        sub="Je nach Eventlänge und Programmpunkten — ich takte die Show in euren Abend ein."
        items={[
          { t: "Kurz · 15 Min", d: "Der pointierte Auftritt zwischen zwei Programmpunkten — Gala, Award, Empfang." },
          { t: "Standard · 30 Min", d: "Die runde Show mit Aufbau, Mittelteil und Finale — der Klassiker für Feiern." },
          { t: "Headliner · 45–60 Min", d: "Der Hauptact des Abends mit voller Drama-Kurve und großem Schluss." },
        ]}
      />

      <PullQuote
        text="Bühnenshow als Finale — alle Gäste begeistert. Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert."
        name="Jan von Lehmann"
        role="Eventleitung · 200 Gäste"
      />

      <ReviewsBlock />

      <FinalCTA
        title={<>Bereit für die Show, bei der alle aufstehen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
