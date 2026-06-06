/** /demo/close-up — Close-Up Zauberer / Tischmagie (kreativ, abwechslungsreich). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, Bento, NotificationFlow, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Eye, Check, Clock, CalendarCheck } from "lucide-react";
import heroImg from "@/assets/closeup.jpg";
import splitImg from "@/assets/haende-interaktion.jpg";
import bentoImg from "@/assets/zuschauer-blau.jpg";
import darkImg from "@/assets/hero-closeup.jpg";

export default function DemoCloseUp() {
  return (
    <VoltageShell
      title="DEMO · Close-Up Zauberer — Tischmagie | Emilian Leber"
      description="Close-Up Zauberer für Tischmagie in Bayern & deutschlandweit — Karten, Münzen und Mentalmagie direkt in den Händen der Gäste. Pro Tisch 5–7 Min, 50–80 Gäste in ~90 Min, keine Technik nötig."
      path="/demo/close-up"
    >
      <SubHero
        eyebrow="Konzept · Close-Up"
        title={<>Close-Up Magie in euren <span style={{ color: COBALT }}>Händen</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Tischmagie auf Augenhöhe: Ich gehe von Gruppe zu Gruppe, Karten und Münzen passieren direkt in den Händen eurer Gäste. Keine Bühne, kein Aufbau — nur das Unmögliche aus nächster Nähe."
        image={heroImg}
        imageAlt="Emilian Leber bei der Tischmagie"
        badge="Pro Tisch 5–7 Minuten — 50–80 Gäste in rund 90 Minuten."
        secondary={{ label: "Mehr ansehen", href: "/demo#show" }}
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

      <Bento
        eyebrow="Was Close-Up ausmacht"
        title="Magie ohne Distanz."
        sub="Von Tisch zu Tisch oder im Walk-Around — die Effekte spielen sich auf Tuchfühlung ab, mitten unter euren Gästen."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Walk-Around", title: "Mitten unter den Gästen — Tisch für Tisch." },
          { kind: "cobalt", span: "col-span-1", v: "100+", l: "Close-Up-Auftritte" },
          { kind: "glass", span: "col-span-1", Icon: Eye, t: "Hautnah", d: "Direkt vor den Augen, nichts versteckt." },
          { kind: "quote", span: "col-span-2", text: "Selbst die skeptischen Gäste haben am Ende nur noch gestaunt.", name: "Martina Senftl · Gastgeberin" },
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

      <FinalCTA
        title={<>Bereit für Magie direkt in euren Händen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Anlass — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
