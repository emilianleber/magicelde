/** /comedy-zauberei — Comedy-Zauberei (kreativ, abwechslungsreich). LIVE (Voltage). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, ExampleSets, WarumCarousel, InteractiveTabs, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Mail, Clock, CalendarCheck, Gauge, Users, Sparkles, Mic } from "lucide-react";
import heroImg from "@/assets/emotionen.jpg";
import splitImg from "@/assets/audience-reactions.jpg";
import carA from "@/assets/zuschauer-blau.jpg";
import carB from "@/assets/staunen.jpg";
import tab1 from "@/assets/moderator-hero.jpg";
import tab2 from "@/assets/emilian-magic-dinner.jpg";
import tab3 from "@/assets/hero-stage.jpg";

export default function ComedyZauberei() {
  return (
    <VoltageShell
      title="Comedy-Zauberer — Magie mit Pointe & Lacher | Emilian Leber"
      description="Comedy-Zauberer in Bayern und deutschlandweit — Mentalmagie mit Comedy-Anteil, Pointen-Sets, Comedy-Magic-Routinen. Für Comedy-Shows, Variety, Firmenfeiern. 5,0 Sterne."
      path="/comedy-zauberei"
      noindex={false}
    >
      <SubHero
        eyebrow="Konzept · Comedy-Zauberei"
        title={<>Staunen <span style={{ color: COBALT }}>und</span> lachen<span style={{ color: MAGENTA }}>.</span></>}
        sub="Comedy-Zauberei, die hängenbleibt: Stand-Up trifft Mentalmagie. Die Magie ist das Setup für die Lacher — euer Saal staunt und lacht im selben Moment. 15–45 Min, 30–500 Gäste."
        image={heroImg}
        imageAlt="Lachendes Publikum bei einer Comedy-Zaubershow"
        badge="Stand-Up trifft Mentalmagie — staunen UND lachen gleichzeitig."
        secondary={{ label: "Show ansehen", href: "/#show" }}
      />

      <SplitFeature
        eyebrow="Pointen die sitzen"
        title={<>Comedy, über die <span style={{ color: COBALT }}>mitgelacht</span> wird.</>}
        sub="Kein Trick-Marathon und kein Brüllen ins Mikro. Die Mentalmagie baut den Moment auf, die Pointe löst ihn — und gelacht wird mit den Gästen, nie über jemanden."
        points={["Pointen die sitzen — getaktet wie ein guter Stand-Up-Set", "Gelacht wird mit, nie über jemanden — kein Fremdscham-Humor", "Magie als Setup für die Lacher: erst der Wow-Moment, dann die Pointe"]}
        image={splitImg}
        imageAlt="Begeisterte Reaktionen im Publikum"
        stat={{ v: "200+", l: "Events seit 2016" }}
      />

      <ExampleSets
        eyebrow="Beispiel-Sets"
        title={<>So kann euer Comedy-Set aussehen<span style={{ color: COBALT }}>.</span></>}
        sub="Von der Pointe zwischendurch bis zum Headliner."
        sets={[
          { tag: "15 Min", t: "Der Slot", d: "Pointierter Comedy-Magie-Auftritt zwischen zwei Programmpunkten." },
          { tag: "30 Min", t: "Die Show", d: "Comedy und Mentalmagie im Wechsel, mit Pointen-Finale." },
          { tag: "45+ Min", t: "Der Headliner", d: "Der Hauptact des Abends — Lacher und Staunen im Sekundentakt." },
        ]}
        options={[
          { Icon: Clock, t: "Länge", d: "15–45 Min" },
          { Icon: Gauge, t: "Comedy-Dosis", d: "nach Anlass" },
          { Icon: Users, t: "Gäste", d: "30–500" },
          { Icon: Sparkles, t: "Themen", d: "auf euer Event" },
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Comedy-Zauberei?"
        title={<>Sechs Gründe, warum der ganze Saal <span style={{ color: COBALT }}>mitlacht</span>.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Echte Reaktionen", title: "Der Moment, in dem alle gleichzeitig lachen", text: "Comedy, über die mitgelacht wird — nie über jemanden, kein Fremdscham.", pos: "center" },
          { kind: "stat", v: "200+", l: "Events seit 2016", text: "Routine, die Pointen sitzen lässt — von der Firmenfeier bis zur Gala." },
          { kind: "feature", Icon: Sparkles, title: "Magie als Setup", text: "Erst der Wow-Moment, dann die Pointe — Mentalmagie baut den Lacher auf." },
          { kind: "photo", image: carB, chip: "Comedy-Dosis nach Anlass", title: "Von pointiert bis durchgängig lustig", text: "Passend zu euren Gästen getaktet — wie ein guter Stand-Up-Set.", pos: "center" },
          { kind: "review", text: "Alle haben gestaunt und Tränen gelacht — genau die Mischung, die wir wollten.", name: "Martina Senftl · Eventkundin" },
          { kind: "feature", Icon: Mic, title: "Pointen die sitzen", text: "Kein Brüllen ins Mikro, kein Trick-Marathon — getaktet wie ein guter Set." },
        ]}
      />

      <InteractiveTabs
        eyebrow="Der Bogen"
        title="Aufwärmen, mitnehmen, Pointen-Finale."
        tabs={[
          { t: "Aufwärmen", d: "Der lockere Einstieg, der sofort Lacher holt und alle aus der Reserve lockt — ohne jemanden vorzuführen.", img: tab1 },
          { t: "Mitnehmen", d: "Mentalmagie und Comedy im Wechsel: erst der Wow-Moment, dann die Pointe, die ihn aufs Korn nimmt.", img: tab2 },
          { t: "Pointen-Finale", d: "Der Höhepunkt, bei dem Staunen und Lachen zusammenfallen — der Moment, über den danach noch geredet wird.", img: tab3 },
        ]}
      />

      <NotificationFlow
        eyebrow="So einfach geht's"
        title={<>In drei Schritten zur <span style={{ color: COBALT }}>Show</span>.</>}
        sub="Kurz das Event schildern, schnelle Antwort, Termin bestätigt — den Rest übernehme ich. Kein Fremdscham, keine Überraschungen."
        steps={[
          { Icon: Mail, t: "Anfrage", d: "Erzähl mir kurz von Anlass, Datum und Gästezahl." },
          { Icon: Clock, t: "Antwort < 24h", d: "Ich melde mich innerhalb von 24 Stunden persönlich zurück." },
          { Icon: CalendarCheck, t: "Termin bestätigt", d: "Briefing, Vertrag, Tech — alles aus einer Hand geliefert." },
        ]}
      />

      <PullQuote
        text="Alle haben gestaunt und Tränen gelacht. Comedy ohne Fremdscham — genau die Mischung, die wir uns gewünscht haben."
        name="Martina Senftl"
        role="Eventkundin"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        items={[
          {
            q: "Was kostet eine Comedy-Zaubershow?",
            a: "Preislich abhaengig von Dauer, Anfahrt und Gaestezahl - vom 15-Minuten-Slot bis zum 45-Minuten-Headliner. Schildert mir kurz euer Event ueber /kontakt, dann bekommt ihr ein passendes Angebot.",
          },
          {
            q: "Wie laeuft die Anfrage ab und wie schnell kommt eine Antwort?",
            a: "Erzaehlt mir kurz von Anlass, Datum und Gaestezahl ueber /kontakt. Ich melde mich innerhalb von 24 Stunden persoenlich zurueck - danach folgen Briefing, Vertrag und Technik aus einer Hand.",
          },
          {
            q: "Wie lange dauert das Comedy-Set?",
            a: "Zwischen 15 und 45 Minuten - vom pointierten Slot zwischen zwei Programmpunkten bis zum Hauptact des Abends. Die Laenge richtet sich nach eurem Ablauf, die Comedy-Dosis nach dem Anlass.",
          },
          {
            q: "Fuer wie viele Gaeste und welche Raumgroesse eignet sich das?",
            a: "Von der intimen Runde bis zum vollen Saal: 30 bis 500 Gaeste funktionieren bestens. Wichtiger als die Raumgroesse ist gute Sicht auf die Buehne - bei groesseren Gruppen sorgt eine Mikrofonanlage dafuer, dass jede Pointe ankommt.",
          },
          {
            q: "Was wird an Platz und Technik gebraucht?",
            a: "Ein freier Buehnen- oder Auftrittsbereich und bei groesseren Gruppen ein Mikrofon plus Saallicht reichen meist aus. Ich klaere die Technik vorab mit eurem Location-Team, sodass am Eventtag nichts dem Zufall ueberlassen bleibt.",
          },
          {
            q: "Geht die Show auch auf Englisch und wie weit reist Emilian?",
            a: "Die Show gibt es auf Deutsch und Englisch - ideal fuer internationale Gaeste und Firmen-Events. Basis ist Bayern/Regensburg, gebucht und gespielt wird deutschlandweit; die Anfahrt fliesst einfach ins Angebot ein.",
          },
        ]}
      />

      <FinalCTA
        title={<>Bereit für staunen und lachen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
