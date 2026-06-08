/** /close-up — Close-Up Zauberer / Tischmagie (kreativ, abwechslungsreich). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, ExampleSets, WarumCarousel, NotificationFlow, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Check, Clock, CalendarCheck, Users, Sparkles, Languages, Award } from "lucide-react";
import heroImg from "@/assets/closeup.jpg";
import splitImg from "@/assets/haende-interaktion.jpg";
import carA from "@/assets/staunen.jpg";
import carB from "@/assets/audience-reactions.jpg";
import darkImg from "@/assets/hero-closeup.jpg";

export default function CloseUp() {
  return (
    <VoltageShell
      title="Close-Up Zauberer — Tischmagie für eure Gäste | Emilian Leber"
      description="Close-Up Zauberer in Bayern und deutschlandweit — Karten, Münzen, Mentalmagie direkt in den Händen eurer Gäste. Walk-Around oder Tisch-zu-Tisch. 100+ Close-Up-Auftritte, 5,0★."
      path="/close-up"
      noindex={false}
    >
      <SubHero
        eyebrow="Konzept · Close-Up"
        title={<>Close-Up Magie in euren <span style={{ color: COBALT }}>Händen</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Tischmagie auf Augenhöhe: Ich gehe von Gruppe zu Gruppe, Karten und Münzen passieren direkt in den Händen eurer Gäste. Keine Bühne, kein Aufbau — nur das Unmögliche aus nächster Nähe."
        image={heroImg}
        imageAlt="Emilian Leber bei der Tischmagie"
        imgPos="center 78%"
        badge="Pro Tisch 5–7 Minuten — 50–80 Gäste in rund 90 Minuten."
        secondary={{ label: "Mehr ansehen", href: "/#show" }}
      />

      <SplitFeature
        eyebrow="Hautnah am Gast"
        title={<>Das Wunder passiert in <span style={{ color: COBALT }}>ihrer eigenen</span> Hand.</>}
        sub="Kein Abstand, keine Distanz. Die Effekte spielen sich auf Handfläche und Tisch ab — so nah, dass die Gäste glauben, sie hätten den Moment selbst gemacht."
        points={[
          "Karten, Münzen und Mentalmagie direkt in den Händen der Gäste",
          "Geliehene Objekte der Gäste — Ring, Geldschein, Uhr",
          "Keine Bühne, kein Mikro, kein technischer Aufbau",
        ]}
        image={splitImg}
        imageAlt="Tischmagie in den Händen eines Gastes"
        reverse
        stat={{ v: "5–7 Min", l: "pro Tisch" }}
      />

      <ExampleSets
        eyebrow="Beispiel-Sets"
        title={<>So kann euer Close-Up aussehen<span style={{ color: COBALT }}>.</span></>}
        sub="Drei typische Zuschnitte — und alles dazwischen."
        sets={[
          { tag: "Empfang", t: "Walk-Around", d: "~60 Min beim Sektempfang oder Aperitif — Magie zwischen den Gruppen." },
          { tag: "Dinner", t: "Tisch-zu-Tisch", d: "Zwischen den Gängen, jeder Tisch bekommt 5–7 Min seinen Moment." },
          { tag: "Pause", t: "Highlights", d: "Gezielte Sets in den Programmpausen — als Überraschung eingestreut." },
        ]}
        options={[
          { Icon: Clock, t: "Dauer", d: "flexibel" },
          { Icon: Users, t: "Gäste", d: "50–80 in 90 Min" },
          { Icon: Sparkles, t: "Effekte", d: "Karten, Münzen, Mental" },
          { Icon: Languages, t: "Sprache", d: "DE / EN" },
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Close-Up?"
        title={<>Sechs Gründe, warum Magie <span style={{ color: COBALT }}>hautnah</span> am stärksten wirkt.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Walk-Around", title: "Mitten unter den Gästen", text: "Von Tisch zu Tisch — die Effekte spielen sich auf Tuchfühlung ab, nicht auf einer fernen Bühne.", pos: "center" },
          { kind: "stat", v: "100+", l: "Close-Up-Auftritte", text: "Routine an jedem Tisch — vom Sektempfang bis ins volle Restaurant." },
          { kind: "feature", Icon: Sparkles, title: "In ihrer eigenen Hand", text: "Karten und Münzen passieren direkt auf der Handfläche der Gäste — so nah, dass sie es selbst gemacht zu haben glauben." },
          { kind: "photo", image: carB, chip: "Echte Reaktionen", title: "Selbst die Skeptiker staunen", text: "Nichts ist versteckt, alles direkt vor den Augen — genau das macht es unwiderstehlich.", pos: "center" },
          { kind: "review", text: "Selbst die skeptischen Gäste haben am Ende nur noch gestaunt.", name: "Martina Senftl · Gastgeberin" },
          { kind: "feature", Icon: Award, title: "Keine Technik nötig", text: "Kein Aufbau, kein Strom, kein Mikro — ein paar Karten genügen, und ich passe mich an euren Ablauf an." },
        ]}
      />

      <NotificationFlow
        eyebrow="So läuft die Buchung"
        title={<>In drei Schritten <span style={{ color: COBALT }}>gebucht</span>.</>}
        sub="Kein Hin und Her, keine Wartezeit. Ihr schreibt mir kurz, ich melde mich verbindlich — und der Termin steht."
        steps={[
          { Icon: Check, t: "Anfrage erhalten", d: "Ihr schickt mir Datum, Ort und ungefähre Gästezahl." },
          { Icon: Clock, t: "Antwort < 24h", d: "Ihr bekommt Verfügbarkeit und Angebot binnen eines Tages." },
          { Icon: CalendarCheck, t: "Termin bestätigt", d: "Datum fixiert — der Rest läuft entspannt im Vorfeld." },
        ]}
      />

      <DarkShowcase
        eyebrow="Funktioniert ohne alles"
        title={<>Keine Technik. Nur <span style={{ color: COBALT }}>Hände</span>.</>}
        paras={[
          "Close-Up braucht keine Bühne, keinen Strom, kein Mikro und keinen Aufbau. Ein paar Karten, ein paar Münzen — der Rest sind die Hände und die Gäste selbst.",
          "Genau das macht es überall einsetzbar: beim Sektempfang, zwischen den Gängen, im Foyer oder mitten im Restaurant. Ich passe mich an euren Ablauf an, nicht umgekehrt.",
        ]}
        image={darkImg}
        imageAlt="Close-Up Zauberer mit Karten aus nächster Nähe"
        badge="Keine Technik nötig"
      />

      <PullQuote
        text="Er ging von Tisch zu Tisch, und nach jedem Trick wurde es lauter im Raum. Selbst die skeptischen Gäste haben am Ende nur noch gestaunt."
        name="Martina Senftl"
        role="Gastgeberin · 70 Gäste"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        items={[
          {
            q: "Was kostet Close-Up Tischmagie ungefaehr?",
            a: "Der Preis haengt von Dauer, Anfahrt und Gaestezahl ab, daher gibt es kein Pauschalpaket von der Stange. Schreib mir kurz Datum, Ort und die ungefaehre Gaestezahl ueber /kontakt, dann bekommst du binnen 24 Stunden ein konkretes Angebot.",
          },
          {
            q: "Wie laeuft die Anfrage ab und wie schnell bekomme ich Antwort?",
            a: "Du schickst mir ueber /kontakt Datum, Ort und die ungefaehre Gaestezahl. Ich melde mich innerhalb von 24 Stunden persoenlich mit Verfuegbarkeit und Angebot zurueck.",
          },
          {
            q: "Wie lange dauert Close-Up und fuer wie viele Gaeste lohnt es sich?",
            a: "Pro Tisch oder Gruppe sind es etwa 5 bis 7 Minuten, in rund 90 Minuten erreiche ich so 50 bis 80 Gaeste. Die Gesamtdauer ist flexibel und richtet sich nach eurem Ablauf, etwa beim Sektempfang, zwischen den Gaengen oder in den Pausen.",
          },
          {
            q: "Was wird vor Ort gebraucht, also Platz und Technik?",
            a: "Im Grunde nichts: keine Buehne, kein Strom, kein Mikro und kein Aufbau. Ein paar Karten und Muenzen genuegen, und ich gehe direkt zu den Gaesten an Tisch oder Stehtisch.",
          },
          {
            q: "Geht das auch auf Englisch?",
            a: "Ja, ich spiele Close-Up auf Deutsch und auf Englisch. Bei internationalen Gaesten oder gemischten Gruppen wechsle ich problemlos die Sprache.",
          },
          {
            q: "Wie weit reist du und wie individuell ist das Programm?",
            a: "Ich bin in Bayern rund um Regensburg zuhause und deutschlandweit unterwegs, mit ueber 200 Events seit 2016 und drei TV-Finalteilnahmen im Gepaeck. Die Effekte und der Ablauf werden auf euren Anlass abgestimmt, von der Hochzeit bis zur Firmenfeier.",
          },
        ]}
      />

      <FinalCTA
        title={<>Bereit für Magie direkt in euren Händen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Anlass — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
