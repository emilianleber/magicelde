/** /demo/buehnenshow — Format-Landingpage (groß): Beispiele + Gestaltung + Drama-Kurve. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, ExampleSets, FlowBand, Bento, InteractiveTabs, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Sparkles, Smile, Award, Clock, Gauge, Users, Languages } from "lucide-react";
import heroImg from "@/assets/buehne-dpsg.jpg";
import splitImg from "@/assets/stage-show.jpg";
import bentoImg from "@/assets/buehne-zuschauer.jpg";
import darkImg from "@/assets/moderator-hero.jpg";
import tab1 from "@/assets/audience-reactions.jpg";
import tab2 from "@/assets/magicdinner-buehne.jpg";
import tab3 from "@/assets/buehne-zuschauer.jpg";

export default function DemoBuehnenshow() {
  return (
    <VoltageShell
      title="DEMO · Bühnenshow Zauberer — 15–60 Min Show | Emilian Leber"
      description="Bühnenshow-Zauberer in Bayern & deutschlandweit — durchkomponierte Show mit Mentalmagie, Comedy-Pointen und Standing-Ovation-Finale. 15–60 Min, 50–500 Gäste, frei gestaltbar."
      path="/demo/buehnenshow"
    >
      <SubHero
        eyebrow="Konzept · Bühnenshow"
        title={<>Bühnenshow mit <span style={{ color: COBALT }}>Drama-Kurve</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Eine durchkomponierte Show für den ganzen Saal: Mentalmagie, Comedy-Pointen und ein Finale, bei dem alle aufstehen. Kein Trick-Marathon — ein Abend mit Spannungsbogen."
        image={heroImg}
        imageAlt="Emilian Leber bei einer Bühnenshow"
        badge="Standing Ovations — Show, bei der der ganze Saal mitgeht."
        secondary={{ label: "Show ansehen", href: "/demo#show" }}
      />

      <SplitFeature
        eyebrow="Mentalmagie trifft Comedy"
        title={<>Zwei Dinge gleichzeitig: <span style={{ color: COBALT }}>staunen</span> und lachen.</>}
        sub="Die Show ist nicht Trick an Trick gereiht, sondern erzählt. Mentaleffekte bauen Spannung auf, Comedy löst sie — bis zum großen Schluss."
        points={["Gedanken lesen, Vorhersagen, Unmögliches — live am Publikum", "Comedy, über die mitgelacht wird — nie über jemanden", "Echte Interaktion ohne Fremdscham"]}
        image={splitImg}
        imageAlt="Emilian Leber auf der Bühne mit Gast"
        imgPos="top"
        stat={{ v: "10 J.", l: "Bühnen-Erfahrung" }}
      />

      <ExampleSets
        eyebrow="Beispiel-Sets"
        title={<>So kann eure Show <span style={{ color: COBALT }}>aussehen</span>.</>}
        sub="Drei typische Zuschnitte — und alles dazwischen. Ich takte die Show exakt in euren Ablauf ein."
        sets={[
          { tag: "15 Min", t: "Der Gala-Slot", d: "Ein pointierter Auftritt zwischen zwei Programmpunkten — perfekt für Award-Shows und Empfänge." },
          { tag: "30 Min", t: "Die runde Show", d: "Aufbau, Mittelteil und Finale — der Klassiker für Firmenfeiern und runde Geburtstage." },
          { tag: "45–60 Min", t: "Der Headliner", d: "Hauptact des Abends: volle Drama-Kurve, Publikums-Einbindung und ein großer Schluss." },
        ]}
        options={[
          { Icon: Clock, t: "Länge", d: "15–60 Min" },
          { Icon: Gauge, t: "Tonalität", d: "Premium bis Comedy" },
          { Icon: Users, t: "Saalgröße", d: "50–500 Gäste" },
          { Icon: Languages, t: "Sprache", d: "DE / EN" },
          { Icon: Sparkles, t: "Themen", d: "auf euer Event" },
        ]}
      />

      <FlowBand
        eyebrow="Die Drama-Kurve"
        title="Jede Minute hat einen Bogen."
        sub="Aufbau, Mittelteil, Finale — die Show ist getaktet wie ein guter Film. Am Ende steht der Saal."
        milestones={[
          { t: "Aufbau", d: "Der Einstieg, der sofort alle mitnimmt." },
          { t: "Mittelteil", d: "Mentalmagie und Comedy im Wechsel." },
          { t: "Finale", d: "Der Höhepunkt mit Standing Ovation." },
        ]}
      />

      <Bento
        eyebrow="Was hängenbleibt"
        title="Sechs Dinge, die eure Gäste mitnehmen."
        sub="Mentalmagie, Comedy und große Momente — modular auf eure Eventlänge abgestimmt."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Standing Ovations", title: "Der Moment, in dem alle gleichzeitig mitgehen." },
          { kind: "cobalt", span: "col-span-1", v: "200+", l: "Events seit 2016" },
          { kind: "glass", span: "col-span-1", Icon: Sparkles, t: "Mentalmagie", d: "Sauber gebaut, live am Publikum." },
          { kind: "quote", span: "col-span-2", text: "Bühnenshow als Finale — alle Gäste begeistert.", name: "Jan von Lehmann · Eventleitung" },
        ]}
      />

      <InteractiveTabs
        eyebrow="Im Einsatz"
        title="Vom Wohnzimmer-Format bis zur großen Bühne."
        tabs={[
          { t: "Intim · 30–80 Gäste", d: "Geburtstag, private Feier, Kundenabend — nah dran, mit viel Interaktion.", img: tab1, pos: "center" },
          { t: "Saal · bis 300", d: "Hochzeit, Firmenfeier, Gala — die runde Show mit großem Finale.", img: tab2, pos: "center" },
          { t: "Mentalmagie hautnah", d: "Auch ein einzelner Gast wird Teil eines unmöglichen Moments.", img: tab3, pos: "center" },
        ]}
      />

      <DarkShowcase
        eyebrow="Kein Risiko"
        title={<>Routine, die euch <span style={{ color: COBALT }}>Sicherheit</span> gibt.</>}
        paras={[
          "Über 200 Events seit 2016 — von der Hochzeit bis zur TV-Bühne. 3× TV-Finalist, dabei jeder Auftritt vorbereitet und auf euren Anlass abgestimmt.",
          "Headset und Ton sind inklusive, die Bühne braucht nur 2 × 1,5 m. Tech-Rider auf Anfrage. Ihr müsst euch um nichts kümmern.",
        ]}
        image={darkImg}
        imageAlt="Emilian Leber auf der Bühne mit Mikrofon"
        imgPos="center"
        badge="3× TV-Finalist"
      />

      <PullQuote
        text="Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach mega. Alle Gäste begeistert."
        name="Jan von Lehmann"
        role="Eventleitung · 200 Gäste"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Bereit für die Show, bei der alle aufstehen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
