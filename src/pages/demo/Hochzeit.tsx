/** /demo/hochzeit — Anlass-Template (Hochzeit). Echte Inhalte (Drei Akte). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Steps, GlassFeatures, Statement, PullQuote, Stats, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Sparkles, Heart, Clock, Users, Gem, Smile, MessageSquare } from "lucide-react";
import weddingImg from "@/assets/wedding-magic.jpg";

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
        image={weddingImg}
        imageAlt="Zauberer bei einer Hochzeit"
        badge="„Brautmutter weint regelmäßig — vor Lachen oder vor Rührung."
      />

      <Steps
        eyebrow="Drei Akte"
        title="Magie über den ganzen Tag verteilt."
        sub="Eingetaktet in euren Ablauf — vom Sektempfang bis vor den ersten Tanz. Ihr wählt, was passt."
        items={[
          { t: "Sektempfang", d: "Close-Up Walk-Around, während ihr Fotos macht — Magie direkt in den Händen eurer Gäste, als Eisbrecher zwischen den Tischkreisen." },
          { t: "Hochzeitsdinner", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, ohne dass der Ablauf gestört wird." },
          { t: "Vor dem Tanz", d: "20–30 Min Bühnenshow als emotionales Finale — Comedy, Mentalmagie und ein Moment, der Gänsehaut macht." },
        ]}
      />

      <GlassFeatures
        eyebrow="Warum Brautpaare mich buchen"
        title="Mehr als Tricks — ein roter Faden."
        sub="Premium-Tonalität, nichts Kitschiges. Abgestimmt mit Fotograf und DJ, vorbereitet auf eure Geschichte."
        items={[
          { Icon: MessageSquare, t: "Briefing vorab", d: "Ich checke das Brautpaar vorab und baue Insider, Namen und eure Geschichte ein." },
          { Icon: Gem, t: "Premium, nicht kitschig", d: "Elegante Tonalität, die zu einer Hochzeit passt — fein dosierter Humor." },
          { Icon: Sparkles, t: "Ringtraum-Moment", d: "Auf Wunsch ein Signature-Effekt rund um die Ringe — der Gänsehaut-Augenblick." },
          { Icon: Clock, t: "Zeitplan im Griff", d: "Ich bringe Ruhe in den Ablauf und halte mich exakt an euren Timing-Plan." },
          { Icon: Smile, t: "Comedy + Emotion", d: "Gäste staunen und lachen — und sind im nächsten Moment gerührt. Beides." },
          { Icon: Heart, t: "Auch skeptische Gäste", d: "Gerade die, die Magie am wenigsten erwarten, sind am Ende am stärksten geflasht." },
        ]}
      />

      <Statement>Am Ende reden alle noch <span style={{ color: COBALT }}>Wochen später</span> davon.</Statement>

      <PullQuote
        text="Du warst der absolute Höhepunkt unserer Hochzeitsfeier. Was ich nicht erwartet hätte: dass die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter."
        name="Martina Senftl"
        role="Brautpaar · Bayern"
      />

      <Stats items={[
        { v: "100+", l: "Hochzeiten begleitet" },
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "200+", l: "Events seit 2016" },
        { v: "3", l: "Akte pro Hochzeit" },
      ]} />

      <ReviewsBlock />

      <FinalCTA
        title={<>Macht euren Gästen den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Hochzeit — Datum, Ort, Ablauf. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
