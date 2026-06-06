/** /demo/hochzeit — Anlass (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { InteractiveTabs, SplitFeature, Bento, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Sparkles, Heart, Gem, Check, Clock, CalendarCheck } from "lucide-react";
import heroImg from "@/assets/wedding-magic.jpg";
import splitImg from "@/assets/emotionen.jpg";
import bentoImg from "@/assets/audience-reactions.jpg";
import actA from "@/assets/haende-interaktion.jpg";
import actB from "@/assets/emilian-magic-dinner.jpg";
import actC from "@/assets/stage-show.jpg";

export default function DemoHochzeit() {
  return (
    <VoltageShell
      title="DEMO · Zauberer für die Hochzeit buchen — Drei Akte Magie | Emilian Leber"
      description="Zauberer für Hochzeit in Bayern & deutschlandweit. Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnenshow vor dem Tanz. 100+ Hochzeiten."
      path="/demo/hochzeit"
    >
      <SubHero
        eyebrow="Anlass · Hochzeit"
        title={<>Zauberer für eure <span style={{ color: COBALT }}>Hochzeit</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Dinner und Bühnenshow vor dem Tanz. Mit Briefing vorab, Insider-Momenten und viel Gefühl."
        image={heroImg}
        imageAlt="Zauberer bei einer Hochzeit"
        badge="Brautmutter weint regelmäßig — vor Lachen oder vor Rührung."
      />

      <InteractiveTabs
        eyebrow="Drei Akte"
        title={<>Magie über den ganzen Tag — <span style={{ color: COBALT }}>eingetaktet</span> in euren Ablauf.</>}
        tabs={[
          { t: "Sektempfang", d: "Close-Up Walk-Around, während ihr Fotos macht — Magie direkt in den Händen eurer Gäste, als Eisbrecher zwischen den Tischkreisen.", img: actA },
          { t: "Hochzeitsdinner", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, ohne dass der Ablauf gestört wird.", img: actB },
          { t: "Vor dem Tanz", d: "20–30 Min Bühnenshow als emotionales Finale — Comedy, Mentalmagie und ein Moment, der Gänsehaut macht.", img: actC },
        ]}
      />

      <SplitFeature
        eyebrow="Vorbereitet auf euch"
        title={<>Mit Briefing, <span style={{ color: COBALT }}>Insidern</span> und eurer Geschichte.</>}
        sub="Ich checke das Brautpaar vorab und baue Namen, Insider und eure Geschichte in die Show ein. Premium-Tonalität, nichts Kitschiges — abgestimmt mit Fotograf und DJ."
        points={["Persönliches Briefing vor der Hochzeit", "Ringtraum — der Gänsehaut-Moment rund um eure Ringe", "Ich halte den Zeitplan und bringe Ruhe in den Ablauf"]}
        image={splitImg}
        imageAlt="Emilian Leber mit Gästen"
        reverse
        stat={{ v: "100+", l: "Hochzeiten" }}
      />

      <Bento
        eyebrow="Warum Brautpaare mich buchen"
        title="Mehr als Tricks — ein roter Faden."
        sub="Comedy und Emotion im Wechsel, der Abend rund durchgeplant."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Echte Reaktionen", title: "Auch die skeptischen Gäste sind am Ende am stärksten geflasht." },
          { kind: "cobalt", span: "col-span-2", v: "5,0★", l: "30+ Bewertungen — ohne Ausreißer" },
          { kind: "glass", span: "col-span-1", Icon: Gem, t: "Premium", d: "Elegant, nicht kitschig." },
          { kind: "glass", span: "col-span-1", Icon: Heart, t: "Mit Gefühl", d: "Staunen, lachen, gerührt sein." },
        ]}
      />

      <NotificationFlow
        eyebrow="So unkompliziert"
        title={<>Von der Anfrage bis zum <span style={{ color: COBALT }}>Termin</span>.</>}
        sub="Eine kurze Nachricht reicht. Ich melde mich in unter 24 Stunden mit Vorschlag und Angebot — verbindlich und ohne Stress."
        steps={[
          { Icon: Check, t: "Anfrage erhalten", d: "Datum, Ort, Ablauf — gerade eben." },
          { Icon: Clock, t: "Antwort & Angebot", d: "In unter 24 Stunden, versprochen." },
          { Icon: CalendarCheck, t: "Termin bestätigt", d: "Wir freuen uns auf euren Tag!" },
        ]}
      />

      <PullQuote
        text="Du warst der absolute Höhepunkt unserer Hochzeitsfeier. Was ich nicht erwartet hätte: dass die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter."
        name="Martina Senftl"
        role="Brautpaar · Bayern"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Macht euren Gästen den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Hochzeit — Datum, Ort, Ablauf. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
