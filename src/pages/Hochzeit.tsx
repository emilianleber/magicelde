/** /hochzeit — Anlass-Landingpage (groß): Akte + Formate + Gestaltung. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { InteractiveTabs, FormatCards, SplitFeature, PolaroidWall, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Hand, Wand2, UtensilsCrossed, Check, Clock, CalendarCheck } from "lucide-react";
import heroImg from "@/assets/wedding-magic.jpg";
import splitImg from "@/assets/emotionen.jpg";
import bentoImg from "@/assets/audience-reactions.jpg";
import actA from "@/assets/haende-interaktion.jpg";
import actB from "@/assets/emilian-magic-dinner.jpg";
import actC from "@/assets/stage-show.jpg";

export default function Hochzeit() {
  return (
    <VoltageShell
      title="Zauberer für Hochzeit buchen — Drei Akte Magie | Emilian Leber"
      description="Zauberer für Hochzeit in Bayern und deutschlandweit. Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Tisch-zu-Tisch beim Dinner, Bühnenshow vor dem Tanz. 100+ Hochzeiten, 5,0★. Kostenlos & unverbindlich anfragen."
      path="/hochzeit"
      noindex={false}
    >
      <SubHero
        eyebrow="Anlass · Hochzeit"
        title={<>Zauberer für eure <span style={{ color: COBALT }}>Hochzeit</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Dinner und Bühnenshow vor dem Tanz. Mit Briefing vorab, Insider-Momenten und viel Gefühl."
        image={heroImg}
        imageAlt="Zauberer bei einer Hochzeit"
        imgPos="center"
        badge="Brautmutter weint regelmäßig — vor Lachen oder vor Rührung."
      />

      <InteractiveTabs
        eyebrow="Der Aufbau"
        title={<>Magie über den ganzen Tag — <span style={{ color: COBALT }}>eingetaktet</span> in euren Ablauf.</>}
        tabs={[
          { t: "Sektempfang", d: "Close-Up Walk-Around, während ihr Fotos macht — Magie direkt in den Händen eurer Gäste, als Eisbrecher zwischen den Tischkreisen.", img: actA, pos: "center" },
          { t: "Hochzeitsdinner", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, ohne dass der Ablauf gestört wird.", img: actB, pos: "center" },
          { t: "Vor dem Tanz", d: "20–30 Min Bühnenshow als emotionales Finale — Comedy, Mentalmagie und ein Moment, der Gänsehaut macht.", img: actC, pos: "top" },
        ]}
      />

      <FormatCards
        eyebrow="Welche Formate passen"
        title={<>Drei Formate — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="Ihr wählt, was zu eurem Tag passt — einzeln oder als Drei-Akt-Paket über Empfang, Dinner und Tanz."
        note="Frei kombinierbar — einzeln gebucht oder als durchgängiger Hochzeits-Tag."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste — der Eisbrecher beim Sektempfang.", h: "/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "20–30 Min Comedy & Mentalmagie als emotionales Finale vor dem Tanz.", h: "/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Tisch-zu-Tisch zwischen den Gängen, durchkomponiert über den Abend.", h: "/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <SplitFeature
        eyebrow="Vorbereitet auf euch"
        title={<>Mit Briefing, <span style={{ color: COBALT }}>Insidern</span> und eurer Geschichte.</>}
        sub="Ich checke das Brautpaar vorab und baue Namen, Insider und eure Geschichte in die Show ein. Premium-Tonalität, nichts Kitschiges — abgestimmt mit Fotograf und DJ."
        points={["Persönliches Briefing vor der Hochzeit", "Ringtraum — der Gänsehaut-Moment rund um eure Ringe", "Ich halte den Zeitplan und bringe Ruhe in den Ablauf"]}
        image={splitImg}
        imageAlt="Emilian Leber mit Gästen"
        imgPos="center"
        reverse
        stat={{ v: "100+", l: "Hochzeiten" }}
      />

      <PolaroidWall
        eyebrow="Momente, die bleiben"
        title={<>Was an eurem Tag <span style={{ color: COBALT }}>passiert</span>.</>}
        sub="Kleine Augenblicke, über die eure Gäste noch Wochen später reden — verteilt über den ganzen Tag."
        items={[
          { image: actA, caption: "Magie beim Sektempfang", pos: "center" },
          { image: actB, caption: "Tisch-zu-Tisch beim Dinner", pos: "center" },
          { image: actC, caption: "Die Show vor dem Tanz", pos: "top" },
          { image: bentoImg, caption: "Gäste, die mitgehen", pos: "center" },
          { image: splitImg, caption: "Sogar die Skeptiker", pos: "center" },
          { image: heroImg, caption: "Gänsehaut, garantiert", pos: "center" },
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
