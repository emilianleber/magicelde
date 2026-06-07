/** /magic-dinner — Magic Dinner (kreativ, eigene Komposition). Voltage-Layout, live. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { InteractiveTabs, SplitFeature, WarumCarousel, ExampleSets } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { UtensilsCrossed, Clock, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/magicdinner-buehne.jpg";
import splitImg from "@/assets/hero-dinner.jpg";
import carA from "@/assets/emotionen.jpg";
import carB from "@/assets/audience-reactions.jpg";
import tab1 from "@/assets/emilian-magic-dinner.jpg";
import tab2 from "@/assets/magicdinner-book.jpg";
import tab3 from "@/assets/stage-show.jpg";

export default function MagicDinner() {
  return (
    <VoltageShell
      title="Magic Dinner buchen — Tisch und Bühne zwischen den Gängen | Emilian Leber"
      description="Magic Dinner mit Zauberkünstler Emilian Leber: Tisch-zu-Tisch und Bühnenshow zwischen den Gängen — einzeln oder kombiniert. Bayern & deutschlandweit. 5,0★ bei 30+ Bewertungen. Kostenlos & unverbindlich anfragen."
      path="/magic-dinner"
      noindex={false}
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
          { t: "Zwischen den Gängen · Tisch-zu-Tisch", d: "Während Teller getauscht werden, bekommt jeder Tisch seinen eigenen Moment — ohne dass der Service ins Stocken gerät.", img: tab2, pos: "center 60%" },
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

      <ExampleSets
        eyebrow="Beispiel-Sets"
        title={<>So kann euer Magic Dinner aussehen<span style={{ color: COBALT }}>.</span></>}
        sub="Vom Drei-Gang-Abend bis zum großen Menü."
        sets={[
          { tag: "3 Gänge", t: "Der kompakte Abend", d: "Aperitif-Magie und Tisch-zu-Tisch zwischen den Gängen." },
          { tag: "4 Gänge", t: "Mit Bühnen-Finale", d: "Walk-Around, Tisch-zu-Tisch und eine kurze Bühnenshow zum Schluss." },
          { tag: "5 Gänge", t: "Das große Menü", d: "Durchkomponiert über den ganzen Abend, abgestimmt mit dem Service." },
        ]}
        options={[
          { Icon: UtensilsCrossed, t: "Gänge", d: "3–5" },
          { Icon: Clock, t: "Dauer", d: "2,5–4 Std" },
          { Icon: MapPin, t: "Location", d: "Partner oder eure" },
          { Icon: Sparkles, t: "Bühnen-Finale", d: "optional" },
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Magic Dinner?"
        title={<>Sechs Gründe, warum ein <span style={{ color: COBALT }}>ganzer Abend</span> in Erinnerung bleibt.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Magic Dinner", title: "Magie zwischen jedem Gang", text: "Tisch und Bühne greifen über den ganzen Abend ineinander — abgestimmt auf euer Menü.", pos: "center" },
          { kind: "stat", v: "seit 2023", l: "mein Signature-Format", text: "Durchkomponiert über 2,5–4 Stunden, im Takt mit dem Service." },
          { kind: "feature", Icon: UtensilsCrossed, title: "3–5 Gänge", text: "Walk-Around zum Aperitif, Tisch-zu-Tisch zwischen den Gängen, Bühnen-Finale zum Dessert." },
          { kind: "photo", image: carB, chip: "Echte Reaktionen", title: "Jeder Tisch sein Moment", text: "Während Teller getauscht werden, bekommt jede Gruppe einen eigenen Höhepunkt.", pos: "center" },
          { kind: "review", text: "Magic Dinner war das Highlight — die Gäste reden heute noch davon.", name: "Katrin Raß · Hochzeitsplanerin" },
          { kind: "feature", Icon: Sparkles, title: "Abgestimmt aufs Menü", text: "Ich plane jede Phase vorab mit Küche, Service und Musik — Gänge und Magie im selben Takt." },
        ]}
      />

      <PullQuote
        text="Magic Dinner war das Highlight unserer Feier. Emilian hat sich perfekt in den Ablauf eingefügt — vom Aperitif bis zum Finale. Die Gäste reden heute noch davon."
        name="Katrin Raß"
        role="Hochzeitsplanerin"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        items={[
          {
            q: "Was kostet ein Magic Dinner ungefaehr?",
            a: "Das haengt von Dauer, Gaestezahl und Anfahrt ab — ein Drei-Gang-Abend ist anders kalkuliert als das grosse Fuenf-Gang-Menue mit Buehnen-Finale. Schreibt mir kurz Datum, Location und Menue, dann bekommt ihr ein konkretes Angebot.",
          },
          {
            q: "Wie laeuft die Anfrage ab und wie schnell hoere ich von dir?",
            a: "Ihr schreibt mir ueber das Kontaktformular unter /kontakt mit Datum, Location und ungefaehrer Gaestezahl. Ich melde mich innerhalb von 24 Stunden persoenlich mit Rueckfragen und einem passenden Vorschlag zurueck.",
          },
          {
            q: "Wie lange dauert ein Magic Dinner?",
            a: "Ein Magic Dinner ist ueber 2,5 bis 4 Stunden durchkomponiert — vom Walk-Around beim Aperitif ueber Tisch-zu-Tisch zwischen den Gaengen bis zum Buehnen-Finale zum Dessert. Die genaue Taktung stimme ich vorab mit Kueche und Service ab.",
          },
          {
            q: "Fuer wie viele Gaeste und welche Raumgroesse eignet sich das Format?",
            a: "Magic Dinner funktioniert von der intimen Tafel mit 20 Gaesten bis zum grossen Saal mit mehreren hundert Personen. Das Tisch-zu-Tisch skaliert ueber die Gangpausen, das Buehnen-Finale braucht je nach Gruppe nur einen freien Bereich vorne.",
          },
          {
            q: "Was wird an Platz und Technik gebraucht?",
            a: "Fuers Tisch-zu-Tisch reicht der gedeckte Tisch — da brauche ich nichts ausser etwas Bewegungsraum. Fuer das Buehnen-Finale genuegt eine freie Flaeche vorne sowie ein Mikrofon und etwas Licht; das klaere ich vorab mit eurer Location oder Technik.",
          },
          {
            q: "Auf Deutsch oder Englisch, und wie weit reist du an?",
            a: "Ich moderiere das Magic Dinner auf Deutsch oder Englisch — ideal fuer internationale Tische. Basis ist Regensburg in Bayern, gebucht werde ich aber deutschlandweit; ueber 200 Events seit 2016 und drei TV-Finals stehen hinter dem Format.",
          },
        ]}
      />

      <FinalCTA
        title={<>Macht aus eurem Dinner einen ganzen Abend Magie<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurem Abend — Datum, Location, Menü. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
