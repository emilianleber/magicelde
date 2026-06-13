/** /geburtstage — Anlass (kreativ, eigene Komposition). Live-Voltage. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Stats, FactsGrid, PullQuote, ReviewsBlock, FAQ, FinalCTA, SectionHeader } from "@/components/voltage/sections";
import { SplitFeature, WarumCarousel, InteractiveTabs, FormatCards } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import {
  Hand, Wand2, UtensilsCrossed, Heart, Smile,
  MessageSquare, Car, Mic, ShieldCheck, Clock, Sparkles, Languages, Timer,
} from "lucide-react";
import heroImg from "@/assets/hero-birthday.jpg";
import splitImg from "@/assets/emotionen.jpg";
import carA from "@/assets/audience-reactions.jpg";
import carB from "@/assets/emilian-magic-dinner.jpg";
import tabA from "@/assets/hero-closeup.jpg";
import tabB from "@/assets/zuschauer-blau.jpg";
import tabC from "@/assets/hero-stage.jpg";

export default function Geburtstage() {
  return (
    <VoltageShell
      title="Zauberer für Geburtstag — Runde Geburtstage, Goldene Hochzeit | Emilian Leber"
      description="Zauberkünstler für Geburtstagsfeier in Bayern und deutschlandweit — runde Geburtstage, Goldene Hochzeit, Jubiläum. Close-Up am Tisch, Bühnen-Show, mit Familien-Anekdoten eingebaut. 80+ Geburtstage, 5,0★."
      path="/geburtstage"
      noindex={false}
    >
      <SubHero
        eyebrow="Anlass · Geburtstag & Jubiläum"
        title={<>Zauberer für Geburtstag & <span style={{ color: COBALT }}>Jubiläum</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Die Show, über die man noch redet — comedy-lastig, herzlich und mit persönlichen Insidern zum Jubilar. Vom runden 50er bis zur großen Familienfeier."
        image={heroImg}
        imageAlt="Zauberer bei einer Geburtstagsfeier"
        badge="Selbst die Skeptiker am Tisch sind am Ende am stärksten geflasht."
      />

      <section className="px-5 md:px-10 pt-2">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Auszeichnungen & Erfahrung"
            title={<>Ein Profi, dem ihr den <span style={{ color: COBALT }}>besonderen</span> Tag anvertraut.</>}
            sub="TV-Finalist, Wettbewerbs-Erfahrung und über 200 Events seit 2016 — Routine für jeden Anlass, vom runden 50er bis zum großen Jubiläum."
            center
          />
        </div>
      </section>
      <Stats
        items={[
          { v: "200+", l: "Events seit 2016" },
          { v: "3x", l: "TV-Finalist (Greatest Talent 2023, Talents of Magic 2024 + Kreativpreis)" },
          { v: "Top 30", l: "Dt. Jugendmeisterschaft der Zauberkunst 2024" },
          { v: "TVA 2025", l: "TV-Auftritt im regionalen Fernsehen" },
          { v: "5,0★", l: "30+ Bewertungen, Google & ProvenExpert" },
          { v: "100+", l: "Hochzeiten & Feiern begleitet" },
        ]}
      />

      <SplitFeature
        eyebrow="So fühlt sich der Abend an"
        title={<>Staunen und lachen — und <span style={{ color: COBALT }}>jeder</span> ist dabei.</>}
        sub="Comedy-lastig und herzlich: Ich binde alle ein, auch die Skeptiker, und arbeite persönliche Insider zum Jubilar in die Show ein. Magie, die berührt statt nur verblüfft."
        points={["Vom runden 50er und 60er bis zur großen Familienfeier", "Flexible Längen — vom Walk-Around bis zur kleinen Bühnenshow", "Staunen und lachen im Wechsel, der ganze Tisch geht mit"]}
        image={splitImg}
        imageAlt="Emilian Leber mit Gästen"
        imgPos="top"
        reverse
        stat={{ v: "80+", l: "Geburtstage & Jubiläen" }}
      />

      <WarumCarousel
        eyebrow="Warum zum Geburtstag?"
        title={<>Sechs Gründe, warum der ganze <span style={{ color: COBALT }}>Tisch</span> mitgeht.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Echte Reaktionen", title: "Auch die Skeptiker", text: "Wer nichts erwartet, staunt am meisten — und ist am Ende am stärksten geflasht.", pos: "center" },
          { kind: "stat", v: "80+", l: "Geburtstage & Jubiläen", text: "Vom runden 50er bis zur großen Familienfeier — Routine für jeden Anlass." },
          { kind: "feature", Icon: Heart, title: "Persönliche Insider", text: "Ich arbeite kleine Geschichten zum Jubilar in die Show ein — Magie, die berührt." },
          { kind: "photo", image: carB, chip: "Comedy & Herz", title: "Staunen und lachen", text: "Comedy-lastig und herzlich — der ganze Tisch geht mit, im Wechsel aus Lachen und Gänsehaut.", pos: "center" },
          { kind: "review", text: "Du warst der absolute Höhepunkt unserer Feier — sogar meine Mutter war komplett geflasht.", name: "Martina Senftl · Geburtstagsfeier" },
          { kind: "feature", Icon: Smile, title: "Jeder ist dabei", text: "Ich binde alle ein, auch die Schüchternen — niemand wird vorgeführt, alle haben Spaß." },
        ]}
      />

      <InteractiveTabs
        eyebrow="Drei Formate, ein Abend"
        title={<>Genau so viel Magie, wie eure Feier <span style={{ color: COBALT }}>braucht</span>.</>}
        tabs={[
          { t: "Walk-Around", d: "Close-Up direkt unter den Gästen — Magie in den Händen, von Grüppchen zu Grüppchen. Perfekt als Eisbrecher beim Sektempfang.", img: tabA, pos: "center" },
          { t: "Tisch-Highlights", d: "Tisch-zu-Tisch zwischen den Gängen — jeder Tisch bekommt seinen Moment, mit Insidern zum Jubilar und viel Lachen.", img: tabB, pos: "center" },
          { t: "Kleine Bühnenshow", d: "15–25 Minuten als Höhepunkt des Abends — Comedy, Mentalmagie und ein Gänsehaut-Finale. Für 20 bis 200 Gäste.", img: tabC, pos: "center" },
        ]}
      />

      <FormatCards
        eyebrow="Welche Formate passen"
        title={<>Drei Formate für euren Geburtstag — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="Von der Tischmagie unter Gästen bis zur kleinen Bühnenshow als Finale."
        note="Frei kombinierbar — Tischmagie, Bühne oder beides."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <PullQuote
        text="Du warst der absolute Höhepunkt unserer Feier. Was ich nicht erwartet hätte: dass ausgerechnet die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter."
        name="Martina Senftl"
        role="Geburtstagsfeier · Bayern"
      />

      <ReviewsBlock paper={false} />

      <section className="px-5 md:px-10 pt-10 md:pt-14">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Im Angebot enthalten · So unkompliziert"
            title={<>Ein Preis, <span style={{ color: COBALT }}>keine</span> Überraschungen.</>}
            sub="Was bei jeder Buchung dabei ist — transparent, planbar und ohne versteckte Posten."
          />
        </div>
      </section>
      <FactsGrid
        items={[
          { Icon: MessageSquare, k: "Vorab-Briefing", v: "Anlass, Tonalität & Insider-Gags zum Jubilar" },
          { Icon: Car, k: "Anfahrt", v: "Transparent im Angebot, keine versteckten Kosten" },
          { Icon: Mic, k: "Ton & Headset", v: "Bei Bühne inklusive, Tech-Rider auf Anfrage" },
          { Icon: ShieldCheck, k: "Rechtssicher", v: "Berufshaftpflicht, DSGVO/AVV für Firmen" },
          { Icon: Clock, k: "Schnelle Antwort", v: "Rückmeldung binnen 24 Stunden, verbindliche Zusage" },
          { Icon: Sparkles, k: "Individuell", v: "Programm auf euren Anlass abgestimmt" },
          { Icon: Languages, k: "Zweisprachig", v: "Show auf Deutsch & Englisch" },
          { Icon: Timer, k: "Pünktlich", v: "Setup rund 30 Min vor Showbeginn" },
        ]}
      />

      <FAQ
        items={[
          { q: "Was kostet ein Zauberer für einen Geburtstag?", a: "Das hängt von Dauer, Anfahrt und Gästezahl ab — ein Walk-Around-Auftritt ist günstiger als eine kombinierte Bühnenshow über den ganzen Abend. Erzählt mir kurz von eurer Feier über /kontakt, dann bekommt ihr ein passendes Angebot." },
          { q: "Wie läuft die Anfrage ab?", a: "Schreibt mir über /kontakt kurz Anlass, Datum, Ort und ungefähre Gästezahl. Ich melde mich innerhalb von 24 Stunden persönlich mit Verfügbarkeit und einem konkreten Vorschlag." },
          { q: "Für wie viele Gäste und welche Raumgröße passt das?", a: "Vom intimen Geburtstag im Wohnzimmer mit einer Handvoll Leuten bis zum runden Jubiläum im Saal mit 200 Gästen. Beim Close-Up gehe ich von Grüppchen zu Grüppchen, die kleine Bühnenshow passt für etwa 20 bis 200 Gäste." },
          { q: "Was braucht ihr an Platz und Technik?", a: "Für Tischmagie und Walk-Around reicht der vorhandene Raum, technisch brauche ich nichts. Für die Bühnenshow genügt eine kleine freie Fläche; bei größeren Sälen klären wir Mikrofon und Musik vorab kurz ab." },
          { q: "Geht die Show auch auf Englisch?", a: "Ja, ich spiele auf Deutsch und Englisch. Bei internationalen Gästen oder gemischten Familien passe ich die Show entsprechend an, ohne dass der Humor verloren geht." },
          { q: "Wie weit reist du an und wie individuell ist die Show?", a: "Basis ist Bayern rund um Regensburg, ich bin aber deutschlandweit unterwegs — seit 2016 mit über 200 Events. Ich arbeite persönliche Insider zum Jubilar ein, sodass die Show genau auf eure Feier zugeschnitten ist." },
          { q: "Eignet sich die Show auch für runde Geburtstage und eine Goldene Hochzeit?", a: "Ja, genau dafür ist sie gemacht. Vom runden 50er und 60er bis zur Goldenen Hochzeit und zum großen Familienjubiläum binde ich Anekdoten zum Jubelpaar oder Jubilar ein. Über 100 Hochzeiten und Feiern habe ich seit 2016 begleitet, mit 5,0 Sternen aus über 30 Bewertungen." },
          { q: "Was unterscheidet dich von anderen Geburtstags-Zauberern?", a: "Ich bin dreifacher TV-Finalist (Greatest Talent 2023, Talents of Magic 2024 inklusive Kreativpreis), stand 2024 bei der Deutschen Jugendmeisterschaft der Zauberkunst unter den Top 30 und war 2025 im TVA-Fernsehen zu sehen. Diese Bühnen-Routine fließt direkt in eure Feier ein — comedy-lastig, herzlich und mit echten Insidern." },
        ]}
      />

      <FinalCTA
        title={<>Macht dem Jubilar einen Abend, über den man noch redet<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Feier — Anlass, Datum, Ort und Gästezahl. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
