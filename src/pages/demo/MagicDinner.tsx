/** /demo/magic-dinner — Magic Dinner (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { InteractiveTabs, SplitFeature, Bento, FlowBand } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { UtensilsCrossed } from "lucide-react";
import heroImg from "@/assets/magicdinner-buehne.jpg";
import splitImg from "@/assets/hero-dinner.jpg";
import bentoImg from "@/assets/magicdinner-book.jpg";
import tab1 from "@/assets/emilian-magic-dinner.jpg";
import tab2 from "@/assets/magicdinner-book.jpg";
import tab3 from "@/assets/stage-show.jpg";

export default function DemoMagicDinner() {
  return (
    <VoltageShell
      title="DEMO · Magic Dinner — Tisch & Bühne zwischen den Gängen | Emilian Leber"
      description="Magic Dinner mit Emilian Leber — Tisch und Bühne zwischen den Gängen. Aperitif-Walk-Around, Tisch-zu-Tisch zwischen den Gängen, Bühnen-Finale. Durchkomponiert über 2,5–4 Stunden, 3–5 Gänge."
      path="/demo/magic-dinner"
    >
      <SubHero
        eyebrow="Signature · Magic Dinner"
        title={<>Tisch und Bühne <span style={{ color: COBALT }}>zwischen den Gängen</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Ein ganzer Abend, durchkomponiert mit dem Service-Rhythmus: Walk-Around zum Aperitif, Tisch-zu-Tisch zwischen den Gängen und ein Bühnen-Finale zum Dessert. Magie und Menü greifen ineinander."
        image={heroImg}
        imageAlt="Magic Dinner mit Emilian Leber"
        badge="Seit 2023 mein Signature-Format — Gänge und Magie im selben Takt."
      />

      <InteractiveTabs
        eyebrow="Drei Phasen"
        title={<>Magie, eingetaktet in die <span style={{ color: COBALT }}>Menüfolge</span>.</>}
        tabs={[
          { t: "Aperitif · Walk-Around", d: "Beim Sektempfang gehe ich von Gruppe zu Gruppe — Close-Up direkt in den Händen, als Eisbrecher, bevor sich alle setzen.", img: tab1 },
          { t: "Zwischen den Gängen · Tisch-zu-Tisch", d: "Während Teller getauscht werden, bekommt jeder Tisch seinen eigenen Moment — ohne dass der Service ins Stocken gerät.", img: tab2 },
          { t: "Dessert · Bühnen-Finale", d: "Zum Abschluss die durchkomponierte Bühnenshow vor dem ganzen Saal — Mentalmagie, Comedy und ein großer Schluss.", img: tab3 },
        ]}
      />

      <SplitFeature
        eyebrow="Durchkomponiert über den Abend"
        title={<>Abgestimmt mit <span style={{ color: COBALT }}>Service-Rhythmus</span>, Musik und Atmosphäre.</>}
        sub="Magic Dinner ist kein Programmpunkt, sondern der rote Faden des Abends. Ich stimme jede Phase vorab mit Küche, Service und Musik ab — damit Gänge und Magie im selben Takt laufen."
        points={["2,5–4 Stunden über den ganzen Abend getaktet", "3–5 Gänge, Magie zwischen jedem Gang", "Partner-Location Wald & Wiese Sinzing oder eure Location"]}
        image={splitImg}
        imageAlt="Gedeckter Tisch beim Magic Dinner"
        reverse
        stat={{ v: "2,5–4 h", l: "durchkomponiert" }}
      />

      <Bento
        eyebrow="Warum Magic Dinner"
        title="Ein Format, das den ganzen Abend trägt."
        sub="Walk-Around, Tisch-zu-Tisch und Bühne in einem Stück — abgestimmt auf euer Menü."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Magic Dinner", title: "Tisch und Bühne greifen über den ganzen Abend ineinander." },
          { kind: "cobalt", span: "col-span-1", v: "seit 2023", l: "mein Signature-Format" },
          { kind: "glass", span: "col-span-1", Icon: UtensilsCrossed, t: "3–5 Gänge", d: "Magie zwischen jedem Gang." },
          { kind: "quote", span: "col-span-2", text: "Magic Dinner war das Highlight — die Gäste reden heute noch davon.", name: "Katrin Raß · Hochzeitsplanerin" },
        ]}
      />

      <FlowBand
        eyebrow="Der Abend in drei Phasen"
        title="Vom Aperitif bis zum Bühnen-Finale."
        sub="Jede Phase ist auf den Service-Rhythmus abgestimmt — der Abend baut sich auf wie ein gutes Menü."
        milestones={[
          { t: "Aperitif", d: "Walk-Around beim Sektempfang als Eisbrecher." },
          { t: "Zwischengänge", d: "Tisch-zu-Tisch zwischen den Gängen." },
          { t: "Finale", d: "Bühnenshow zum Dessert vor dem ganzen Saal." },
        ]}
      />

      <PullQuote
        text="Magic Dinner war das Highlight unserer Feier. Emilian hat sich perfekt in den Ablauf eingefügt — vom Aperitif bis zum Finale. Die Gäste reden heute noch davon."
        name="Katrin Raß"
        role="Hochzeitsplanerin"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Macht aus eurem Dinner einen ganzen Abend Magie<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurem Abend — Datum, Location, Menü. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
