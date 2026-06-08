/** /hochzeit — Anlass-Landingpage (groß): Akte + Formate + Gestaltung. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA, FactsGrid, Stats, FAQ, SectionHeader } from "@/components/voltage/sections";
import { InteractiveTabs, FormatCards, SplitFeature, PolaroidWall, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Hand, Wand2, UtensilsCrossed, Check, Clock, CalendarCheck, MessageSquare, MapPin, Headphones, ShieldCheck, Timer, Sparkles, Languages } from "lucide-react";
import heroImg from "@/assets/wedding-magic.jpg";
import splitImg from "@/assets/emotionen.jpg";
// InteractiveTabs (breite Container) — alle QUER, kein Kopf-Crop
import tabCloseup from "@/assets/hero-closeup.jpg";
import tabDinner from "@/assets/emilian-magic-dinner.jpg";
import tabStage from "@/assets/hero-stage.jpg";
// PolaroidWall — 6 eigene Bilder, keine Doppelung mit dem Rest der Seite
import polReactions from "@/assets/audience-reactions.jpg";
import polDinner from "@/assets/hero-dinner.jpg";
import polStaunen from "@/assets/staunen.jpg";
import polModerator from "@/assets/moderator-hero.jpg";
import polBuehne from "@/assets/magicdinner-buehne.jpg";
import polFinale from "@/assets/stage-show.jpg";

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

      <Stats
        items={[
          { v: "200+", l: "Events seit 2016" },
          { v: "100+", l: "Hochzeiten begleitet" },
          { v: "3x", l: "TV-Finalist (2023–2025)" },
          { v: "5,0★", l: "30+ Bewertungen" },
        ]}
      />

      <FactsGrid
        items={[
          { Icon: Sparkles, k: "Auszeichnungen", v: "Greatest Talent 2023 · Talents of Magic 2024 + Kreativpreis" },
          { Icon: Wand2, k: "Meisterschaft", v: "Dt. Jugendmeisterschaft 2024 — Top 30" },
          { Icon: Check, k: "TV-Auftritt", v: "TVA Fernsehauftritt 2025" },
          { Icon: CalendarCheck, k: "Erfahrung", v: "200+ Events seit 2016, 100+ davon Hochzeiten" },
        ]}
      />

      <InteractiveTabs
        eyebrow="Der Aufbau"
        title={<>Magie über den ganzen Tag — <span style={{ color: COBALT }}>eingetaktet</span> in euren Ablauf.</>}
        tabs={[
          { t: "Sektempfang", d: "Close-Up Walk-Around, während ihr Fotos macht — Magie direkt in den Händen eurer Gäste, als Eisbrecher zwischen den Tischkreisen.", img: tabCloseup, pos: "center" },
          { t: "Hochzeitsdinner", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, ohne dass der Ablauf gestört wird.", img: tabDinner, pos: "center" },
          { t: "Vor dem Tanz", d: "20–30 Min Bühnenshow als emotionales Finale — Comedy, Mentalmagie und ein Moment, der Gänsehaut macht.", img: tabStage, pos: "center" },
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
          { image: polReactions, caption: "Magie beim Sektempfang", pos: "center" },
          { image: polDinner, caption: "Tisch-zu-Tisch beim Dinner", pos: "center" },
          { image: polStaunen, caption: "Die Show vor dem Tanz", pos: "center" },
          { image: polModerator, caption: "Gäste, die mitgehen", pos: "center" },
          { image: polBuehne, caption: "Sogar die Skeptiker", pos: "center" },
          { image: polFinale, caption: "Gänsehaut, garantiert", pos: "top" },
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

      <section className="px-5 md:px-10 pt-16 md:pt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Im Preis enthalten"
            title={<>Alles dabei — <span style={{ color: COBALT }}>keine</span> versteckten Kosten.</>}
            sub="Transparent kalkuliert und auf euren Tag abgestimmt. Das ist immer Teil des Angebots:"
          />
        </div>
      </section>
      <FactsGrid
        items={[
          { Icon: MessageSquare, k: "Vorab-Briefing", v: "Anlass, Tonalität und Insider-Gags persönlich besprochen" },
          { Icon: MapPin, k: "Anfahrt", v: "Transparent im Angebot — keine versteckten Kosten" },
          { Icon: Headphones, k: "Ton & Headset", v: "Inklusive bei der Bühnenshow, Tech-Rider auf Anfrage" },
          { Icon: ShieldCheck, k: "Rechtssicher", v: "Berufshaftpflicht, DSGVO und AVV für Firmen" },
          { Icon: Clock, k: "Schnelle Antwort", v: "Rückmeldung binnen 24 Stunden, verbindliche Zusage" },
          { Icon: Sparkles, k: "Individuell", v: "Programm auf euren Anlass abgestimmt, nichts von der Stange" },
          { Icon: Languages, k: "Zweisprachig", v: "Auf Deutsch und Englisch buchbar" },
          { Icon: Timer, k: "Pünktlich", v: "Setup rund 30 Minuten vor Showbeginn" },
        ]}
      />

      <PullQuote
        text="Du warst der absolute Höhepunkt unserer Hochzeitsfeier. Was ich nicht erwartet hätte: dass die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter."
        name="Martina Senftl"
        role="Brautpaar · Bayern"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        eyebrow="Häufige Fragen zur Hochzeit"
        title="Gut zu wissen für euren Tag."
        items={[
          { q: "Wann am Hochzeitstag tritt der Zauberer auf?", a: "Klassisch in drei Akten: Close-Up beim Sektempfang, Tisch-zu-Tisch zwischen den Gängen des Hochzeitsdinners und eine 20–30-minütige Bühnenshow als Finale vor dem Tanz. Ihr wählt einzelne Akte oder das durchgängige Paket — eingetaktet in euren Ablauf mit Fotograf und DJ." },
          { q: "Wie viele Gäste sind beim Sektempfang und Dinner möglich?", a: "Close-Up und Tisch-zu-Tisch funktionieren von der kleinen Feier mit 20 Gästen bis zur großen Hochzeit mit 150+ Personen. Beim Dinner bekommt jeder Tisch seinen eigenen Moment; die Bühnenshow erreicht den ganzen Saal." },
          { q: "Was kostet ein Zauberer für die Hochzeit?", a: "Der Preis hängt von Akten, Dauer und Anfahrt ab und wird transparent im Angebot ausgewiesen — keine versteckten Kosten. Eine kurze Anfrage mit Datum, Ort und Ablauf genügt, die verbindliche Rückmeldung kommt binnen 24 Stunden." },
          { q: "Wird die Show an unser Brautpaar angepasst?", a: "Ja. Vor der Hochzeit gibt es ein persönliches Briefing, in dem Namen, eure Geschichte und Insider in die Show einfließen — inklusive dem Ringtraum, einem Gänsehaut-Moment rund um eure Ringe. Buchbar auf Deutsch und Englisch." },
        ]}
      />

      <FinalCTA
        title={<>Macht euren Gästen den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Hochzeit — Datum, Ort, Ablauf. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
