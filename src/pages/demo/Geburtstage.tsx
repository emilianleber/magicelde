/** /demo/geburtstage — Anlass-Template (Geburtstag & Jubiläum). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Steps, GlassFeatures, Statement, PullQuote, Stats, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Smile, Users, Heart, Clock, MessageSquare, Cake } from "lucide-react";
import birthdayImg from "@/assets/hero-birthday.jpg";

export default function DemoGeburtstage() {
  return (
    <VoltageShell
      title="DEMO · Zauberer für Geburtstag & Jubiläum | Emilian Leber"
      description="Zauberer für Geburtstag & Jubiläum in Bayern & deutschlandweit. Die Show, über die man noch redet — Walk-Around, Tisch-Highlights und kleine Bühnenshow als Finale. 80+ Geburtstage & Jubiläen."
      path="/demo/geburtstage"
    >
      <SubHero
        eyebrow="Anlass · Geburtstag & Jubiläum"
        title={<>Die Show, über die man noch <span style={{ color: COBALT }}>redet</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Zauberer für runden Geburtstag und Jubiläum — comedy-lastig, herzlich und mit persönlichen Insidern zum Jubilar. Vom 50er bis zur großen Familienfeier, in flexiblen Längen."
        image={birthdayImg}
        imageAlt="Zauberer auf einer Geburtstagsfeier"
        badge="„Sogar die, die nie staunen, haben gestaunt — und gelacht."
      />

      <Steps
        eyebrow="Der Ablauf"
        title="Magie über den ganzen Abend verteilt."
        sub="Eingetaktet in eure Feier — locker, ohne den Ablauf zu stören. Ihr wählt, was passt."
        items={[
          { t: "Walk-Around", d: "Close-Up direkt unter den Gästen, während angestoßen und geplaudert wird — der perfekte Eisbrecher, der sofort für Stimmung sorgt." },
          { t: "Tisch-Highlights", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen eigenen Moment, persönlich und nah." },
          { t: "Kleine Bühnenshow", d: "20–30 Min als Finale für die ganze Runde — Comedy, Mentalmagie und ein Moment, der dem Jubilar gewidmet ist." },
        ]}
      />

      <GlassFeatures
        eyebrow="Warum Gastgeber mich buchen"
        title="Mehr als Tricks — ein Abend, der bleibt."
        sub="Herzlich, nahbar und auf den Jubilar zugeschnitten. Abgestimmt auf eure Runde, vom runden Geburtstag bis zur Familienfeier."
        items={[
          { Icon: Smile, t: "Comedy-lastig & herzlich", d: "Gäste staunen und lachen — leichter Humor, der zur Feier passt und nie über jemanden geht." },
          { Icon: Users, t: "Bindet alle ein", d: "Auch die Skeptiker am Tisch — gerade die, die nichts erwarten, sind am Ende am stärksten geflasht." },
          { Icon: MessageSquare, t: "Persönliche Insider", d: "Ich baue Namen, Anekdoten und kleine Insider zum Jubilar ein — abgestimmt vorab mit euch." },
          { Icon: Cake, t: "Vom 50er bis Familienfeier", d: "Ob runder 50er, 60er oder gemütliche Familienrunde — die Show passt sich Anlass und Gruppe an." },
          { Icon: Clock, t: "Flexible Längen", d: "Von einer Stunde Walk-Around bis zum kompletten Abend — so lang, wie es zu eurem Ablauf passt." },
          { Icon: Heart, t: "Staunen und lachen", d: "Der Moment, in dem alle gleichzeitig lachen und im nächsten Augenblick gerührt sind. Beides." },
        ]}
      />

      <Statement>Am Ende reden alle noch <span style={{ color: COBALT }}>Wochen später</span> davon.</Statement>

      <PullQuote
        text="Du warst der absolute Höhepunkt unserer Feier. Was ich nicht erwartet hätte: dass die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter — und das soll was heißen."
        name="Martina Senftl"
        role="Eventkundin · Geburtstag + Hochzeit"
      />

      <Stats items={[
        { v: "80+", l: "Geburtstage & Jubiläen" },
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "200+", l: "Events seit 2016" },
        { v: "20–200", l: "Gäste pro Feier" },
      ]} />

      <ReviewsBlock />

      <FinalCTA
        title={<>Macht dem Jubilar den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Feier — Anlass, Datum, Ort, Gästezahl. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
