/** /buehnenshow — Format-Landingpage: editorial, Karussell statt Kachel-Grids, jedes Bild max. 1×. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, ExampleSets, WarumCarousel, InteractiveTabs, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Sparkles, Award, Clock, Gauge, Users, Languages } from "lucide-react";
import heroImg from "@/assets/buehne-dpsg.jpg";
import splitImg from "@/assets/stage-show.jpg";
import carA from "@/assets/buehne-zuschauer.jpg";
import carB from "@/assets/audience-reactions.jpg";
import darkImg from "@/assets/moderator-hero.jpg";
import tab1 from "@/assets/magicdinner-buehne.jpg";
import tab2 from "@/assets/emilian-magic-dinner.jpg";
import tab3 from "@/assets/haende-interaktion.jpg";

export default function Buehnenshow() {
  return (
    <VoltageShell
      title="Bühnenshow Zauberer — 15–60 Min Show für eure Gäste | Emilian Leber"
      description="Bühnenshow-Zauberer in Bayern und deutschlandweit — durchkomponierte Show mit Mentaleffekten, Comedy-Pointen und Standing-Ovation-Finale. 15–60 Min, 50–500 Gäste, Tech-Rider auf Anfrage."
      path="/buehnenshow"
      noindex={false}
    >
      <SubHero
        eyebrow="Konzept · Bühnenshow"
        title={<>Bühnenshow mit <span style={{ color: COBALT }}>Drama-Kurve</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Eine durchkomponierte Show für den ganzen Saal: Mentalmagie, Comedy-Pointen und ein Finale, bei dem alle aufstehen. Kein Trick-Marathon — ein Abend mit Spannungsbogen."
        image={heroImg}
        imageAlt="Emilian Leber bei einer Bühnenshow"
        imgPos="top"
        badge="Standing Ovations — Show, bei der der ganze Saal mitgeht."
        secondary={{ label: "Show ansehen", href: "/#show" }}
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
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Bühnenshow?"
        title="Sechs Gründe, warum der Saal aufsteht."
        cards={[
          { kind: "photo", image: carA, chip: "Mentalmagie", title: "Hautnah am Gast", text: "Auch ein einzelner Zuschauer wird Teil eines unmöglichen Moments.", pos: "center" },
          { kind: "stat", v: "200+", l: "Events seit 2016", text: "Routine auf jeder Bühne — von der Hochzeit bis zur TV-Show." },
          { kind: "feature", Icon: Sparkles, title: "Mentalmagie", text: "Gedanken, Vorhersagen, Unmögliches — sauber gebaut, live gespielt." },
          { kind: "photo", image: carB, chip: "Echte Reaktionen", title: "Der ganze Saal geht mit", text: "Comedy, über die mitgelacht wird — nie über jemanden.", pos: "center" },
          { kind: "review", text: "Bühnenshow als Finale — alle Gäste begeistert.", name: "Jan von Lehmann · Eventleitung" },
          { kind: "feature", Icon: Award, title: "Standing-Ovation-Finale", text: "Jeder Slot endet auf einem Höhepunkt — der Moment, über den man redet." },
        ]}
      />

      <InteractiveTabs
        eyebrow="Im Einsatz"
        title="Vom intimen Rahmen bis zur großen Bühne."
        tabs={[
          { t: "Saal · bis 300", d: "Hochzeit, Firmenfeier, Gala — die runde Show mit großem Finale.", img: tab1, pos: "center" },
          { t: "Magic Dinner", d: "Eingebettet in den Abend, zwischen den Gängen und als Bühnen-Finale.", img: tab2, pos: "center" },
          { t: "Close-Up-Akzente", d: "Mentalmagie hautnah als Ergänzung — direkt in den Händen der Gäste.", img: tab3, pos: "center" },
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

      <FAQ
        items={[
          {
            q: "Was kostet eine Bühnenshow?",
            a: "Das haengt von Dauer, Anfahrt und Gaestezahl ab - eine 15-Minuten-Gala kostet weniger als ein 60-Minuten-Headliner-Slot. Schick mir kurz Datum, Ort und gewuenschte Laenge ueber das Kontaktformular, dann bekommst du ein konkretes Angebot.",
          },
          {
            q: "Wie laeuft die Anfrage ab und wie schnell kommt eine Antwort?",
            a: "Du schreibst mir ueber /kontakt ein paar Eckdaten zu eurem Event, und ich melde mich innerhalb von 24 Stunden persoenlich zurueck. Danach klaeren wir Ablauf, Laenge und Buehne in einem kurzen Gespraech.",
          },
          {
            q: "Wie lange dauert die Show und wie viele Gaeste passen?",
            a: "Die Show laesst sich von 15 bis 60 Minuten takten - vom pointierten Gala-Slot bis zum Headliner-Act. Sie funktioniert fuer 50 bis 500 Gaeste, weil Headset, Ton und Buehnen-Aufbau auf die Saalgroesse abgestimmt werden.",
          },
          {
            q: "Was braucht ihr an Platz und Technik?",
            a: "Die Buehne braucht nur etwa 2 x 1,5 m, Headset und Ton bringe ich selbst mit. Einen Tech-Rider gibt es auf Anfrage - ihr muesst euch um nichts kuemmern.",
          },
          {
            q: "Geht die Show auch auf Englisch und wie weit reist du an?",
            a: "Die komplette Show gibt es auf Deutsch und Englisch, ideal fuer internationale Gaeste oder gemischtes Publikum. Basis ist Bayern rund um Regensburg, gespielt wird aber deutschlandweit.",
          },
          {
            q: "Wie individuell laesst sich die Show anpassen?",
            a: "Jeder Auftritt wird auf euren Anlass abgestimmt - Laenge, Tonalitaet von Premium bis Comedy und der Einbau ins Programm. Mit ueber 200 Events seit 2016 und 3x TV-Finalist-Erfahrung passt die Drama-Kurve auf Hochzeit, Firmenfeier oder Gala.",
          },
        ]}
      />

      <FinalCTA
        title={<>Bereit für die Show, bei der alle aufstehen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
