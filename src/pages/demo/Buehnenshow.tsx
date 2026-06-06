/** /demo/buehnenshow — Show-Detail (kreativ, abwechslungsreich). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, FlowBand, Bento, InteractiveTabs, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Sparkles, Smile, Award } from "lucide-react";
import heroImg from "@/assets/buehne-dpsg.jpg";
import splitImg from "@/assets/stage-show.jpg";
import bentoImg from "@/assets/buehne-zuschauer.jpg";
import darkImg from "@/assets/greatest-talent-presse.jpg";
import tab1 from "@/assets/buehne-zuschauer.jpg";
import tab2 from "@/assets/magicdinner-buehne.jpg";
import tab3 from "@/assets/greatest-talent-presse.jpg";

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
        stat={{ v: "10 J.", l: "Bühnen-Erfahrung" }}
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
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Standing Ovations", title: "Der Moment, in dem alle gleichzeitig aufstehen." },
          { kind: "cobalt", span: "col-span-1", v: "200+", l: "Events seit 2016" },
          { kind: "glass", span: "col-span-1", Icon: Sparkles, t: "Mentalmagie", d: "Sauber gebaut, live am Publikum." },
          { kind: "quote", span: "col-span-2", text: "Bühnenshow als Finale — alle Gäste begeistert.", name: "Jan von Lehmann · Eventleitung" },
        ]}
      />

      <InteractiveTabs
        eyebrow="Drei Slots"
        title="Einzeln oder kombiniert — eingetaktet in euren Abend."
        tabs={[
          { t: "Kurz · 15 Min", d: "Der pointierte Auftritt zwischen zwei Programmpunkten — Gala, Award, Empfang.", img: tab1 },
          { t: "Standard · 30 Min", d: "Die runde Show mit Aufbau, Mittelteil und Finale — der Klassiker für Feiern.", img: tab2 },
          { t: "Headliner · 45–60 Min", d: "Der Hauptact des Abends mit voller Drama-Kurve und großem Schluss.", img: tab3 },
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
        imageAlt="Emilian Leber auf einer großen Bühne"
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
