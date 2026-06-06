/** /demo/magic-dinner — Show-Detail-Template (Magic Dinner). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, FactsGrid, Statement, GlassFeatures, Steps, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Clock, UtensilsCrossed, Layers, MapPin, Sparkles, Hand, Award, Mic2, Users, Gem } from "lucide-react";
import dinnerImg from "@/assets/magicdinner-buehne.jpg";

export default function DemoMagicDinner() {
  return (
    <VoltageShell
      title="DEMO · Magic Dinner — Tisch & Bühne zwischen den Gängen | Emilian Leber"
      description="Magic Dinner mit Emilian Leber — Magie durchkomponiert über den ganzen Abend: Aperitif-Walk-Around, Tisch-zu-Tisch zwischen den Gängen und ein Bühnen-Finale. Für 20–120 Gäste, abgestimmt auf den Service-Rhythmus."
      path="/demo/magic-dinner"
    >
      <SubHero
        eyebrow="Konzept · Magic Dinner"
        title={<>Tisch und Bühne <span style={{ color: COBALT }}>zwischen den Gängen</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Magie, die sich durch den ganzen Abend zieht — vom Aperitif über jeden Gang bis zum großen Finale. Kein Programmpunkt, sondern ein roter Faden, abgestimmt auf euren Service-Rhythmus."
        image={dinnerImg}
        imageAlt="Emilian Leber beim Magic Dinner"
        badge="Signature-Format — Magie durchkomponiert über den ganzen Abend."
        secondary={{ label: "Abend ansehen", href: "/demo#show" }}
      />

      <FactsGrid items={[
        { Icon: Clock, k: "Dauer", v: "2,5 – 4 Stunden" },
        { Icon: UtensilsCrossed, k: "Menü", v: "3 – 5 Gänge" },
        { Icon: Layers, k: "Aufbau", v: "Aperitif · Tisch · Finale" },
        { Icon: MapPin, k: "Location", v: "Wald & Wiese, Sinzing" },
      ]} />

      <Statement>Kein Programmpunkt — ein <span style={{ color: COBALT }}>roter Faden</span> über den ganzen Abend.</Statement>

      <GlassFeatures
        eyebrow="Was den Abend ausmacht"
        title="Sechs Dinge, die hängenbleiben."
        sub="Magie und Menü greifen ineinander — durchkomponiert, getaktet und auf eure Gästezahl abgestimmt."
        items={[
          { Icon: Sparkles, t: "Durchkomponiert", d: "Magie zieht sich vom Aperitif bis zum Finale — als roter Faden, nicht als Einzeltrick." },
          { Icon: Clock, t: "Im Service-Rhythmus", d: "Abgestimmt mit Küche und Service — die Magie passt sich an, nicht der Abend an mich." },
          { Icon: Mic2, t: "Musik & Atmosphäre", d: "Licht, Ton und Stimmung greifen ineinander — der Abend hat eine Dramaturgie." },
          { Icon: Gem, t: "Signature-Format", d: "Seit 2023 erprobt und verfeinert — das Format, für das man mich bucht." },
          { Icon: Users, t: "Für 20 – 120 Gäste", d: "Skaliert vom intimen Dinner bis zur großen Tafel — ohne dass Nähe verloren geht." },
          { Icon: Award, t: "Premium-Tonalität", d: "Ruhig, hochwertig, mit Pointen dosiert — passend zum gehobenen Abend." },
        ]}
      />

      <Steps
        eyebrow="Drei Phasen"
        title="Wie sich der Abend aufbaut."
        sub="Ich takte die Magie in euren Ablauf ein — vom Empfang bis zum letzten Gang."
        items={[
          { t: "Aperitif · Walk-Around", d: "Beim Empfang gehe ich von Gruppe zu Gruppe — als Eisbrecher, bevor sich alle setzen." },
          { t: "Zwischen den Gängen · Tisch-zu-Tisch", d: "In den Service-Pausen komme ich an jeden Tisch — Magie direkt in den Händen der Gäste." },
          { t: "Bühnen-Finale", d: "Zum Abschluss der große Moment für den ganzen Saal — der Höhepunkt, über den man redet." },
        ]}
      />

      <PullQuote
        text="Ein Abend wie aus einem Guss — Magie, Menü und Timing greifen perfekt ineinander. Genau das Format, das ich meinen Brautpaaren ans Herz lege."
        name="Katrin Raß"
        role="Hochzeitsplanerin · Bayern + DE"
      />

      <ReviewsBlock />

      <FinalCTA
        title={<>Bereit für einen Abend, der durchkomponiert ist<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Abend und eurer Location — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
