/** /firmenfeiern — Anlass Firmenfeier (Voltage-Layout, live). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { InteractiveTabs, FormatCards, SplitFeature, WarumCarousel, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Briefcase, Check, Clock, CalendarCheck, Hand, Wand2, UtensilsCrossed, Sparkles } from "lucide-react";
import heroImg from "@/assets/schneider-weisse-closeup.jpg";
import splitImg from "@/assets/magicdinner-buehne.jpg";
import carA from "@/assets/buehne-zuschauer.jpg";
import carB from "@/assets/audience-reactions.jpg";
import tab1 from "@/assets/closeup.jpg";
import tab2 from "@/assets/emilian-magic-dinner.jpg";
import tab3 from "@/assets/stage-show.jpg";

export default function Firmenfeiern() {
  return (
    <VoltageShell
      title="Zauberer für Firmenfeier — Vorstand, Kunden, Team | Emilian Leber"
      description="Zauberkünstler für Firmenfeiern in Bayern und deutschlandweit — Vorstandsdinner, Kundenabend, Galaabend, Mitarbeiterfeier. Bühnenshow und Close-Up, einzeln oder kombiniert. 100+ Firmen-Engagements, 5,0★."
      path="/firmenfeiern"
      noindex={false}
    >
      <SubHero
        eyebrow="Anlass · Firmenfeier"
        title={<>Zauberer für die <span style={{ color: COBALT }}>Firmenfeier</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Empfang, Dinner und Bühne als Finale — Magie, die gemischte Teams zusammenbringt. Mit Insider-Briefing vorab und verlässlicher Organisation für euer Event."
        image={heroImg}
        imageAlt="Zauberer Close-Up bei einer Firmenfeier"
        badge="Der Eisbrecher, an dem auch der Vorstand stehen bleibt."
      />

      <InteractiveTabs
        eyebrow="Drei Formate"
        title={<>Vom Empfang bis zur <span style={{ color: COBALT }}>Bühne</span> — eingetaktet in euer Programm.</>}
        tabs={[
          { t: "Empfang · Walk-Around", d: "Close-Up von Gruppe zu Gruppe während Sektempfang und Networking — der Eisbrecher, der Abteilungen ins Gespräch bringt, bevor das Programm überhaupt startet.", img: tab1, pos: "center 78%" },
          { t: "Dinner · Tisch-zu-Tisch", d: "Zwischen den Gängen bekommt jeder Tisch seinen eigenen Moment — Magie direkt in den Händen, ohne dass der Ablauf des Abends ins Stocken gerät.", img: tab2 },
          { t: "Bühne als Finale", d: "20–30 Min Bühnenshow als Höhepunkt — Mentalmagie, Comedy und ein Finale, das den Abend für den ganzen Saal zusammenfasst.", img: tab3 },
        ]}
      />

      <FormatCards
        eyebrow="Welche Formate passen"
        title={<>Drei Formate für jede Firmenfeier — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="Vom Vorstands-Dinner bis zur Mitarbeiterfeier — ihr wählt den Mix."
        note="Vom Empfang bis zum Bühnen-Finale — einzeln oder kombiniert."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <SplitFeature
        eyebrow="Vorbereitet auf euch"
        title={<>Mit <span style={{ color: COBALT }}>Insider-Briefing</span> auf euer Unternehmen.</>}
        sub="Ich hole mir vorab die Firmen-Stories und baue Running Gags und Namen aus dem Team in die Show ein. Die Tonalität reicht von Premium bis Comedy — und funktioniert als Eisbrecher für gemischte Teams aus allen Abteilungen."
        points={["Vorstandsdinner, Kundenabend, Galaabend oder Mitarbeiterfeier", "Verlässliche Organisation und Abstimmung mit eurem Eventteam", "100+ Firmen-Events — Routine, die euch Sicherheit gibt"]}
        image={splitImg}
        imageAlt="Emilian Leber auf der Bühne bei einem Firmen-Event"
        reverse
        stat={{ v: "100+", l: "Firmen-Events" }}
      />

      <WarumCarousel
        eyebrow="Warum Firmenfeier?"
        title={<>Sechs Gründe, warum Firmen mich <span style={{ color: COBALT }}>buchen</span>.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Echte Reaktionen", title: "Auch das Management ist geflasht", text: "Selbst die skeptischsten Gäste stehen am Ende am stärksten unter Strom.", pos: "center" },
          { kind: "stat", v: "100+", l: "Firmen-Events", text: "Routine vom Vorstandsdinner bis zur großen Mitarbeiterfeier." },
          { kind: "feature", Icon: Briefcase, title: "Premium bis Comedy", text: "Der Ton, der zu eurer Marke passt — seriöser Kundenabend oder lockere Feier." },
          { kind: "photo", image: carB, chip: "Eisbrecher", title: "Abteilungen kommen ins Gespräch", text: "Magie, die gemischte Teams aus allen Bereichen zusammenbringt.", pos: "center" },
          { kind: "review", text: "Bühnenshow als Finale — alle 200 Gäste begeistert.", name: "Jan von Lehmann · Eventleitung" },
          { kind: "feature", Icon: Sparkles, title: "Insider-Briefing vorab", text: "Firmen-Stories, Namen und Running Gags aus dem Team — eingebaut in die Show." },
        ]}
      />

      <NotificationFlow
        eyebrow="So unkompliziert"
        title={<>Von der Anfrage bis zum <span style={{ color: COBALT }}>Termin</span>.</>}
        sub="Eine kurze Nachricht reicht. Ich melde mich in unter 24 Stunden mit Vorschlag und Angebot — verbindlich, ohne Stress und ohne langes Hin und Her."
        steps={[
          { Icon: Check, t: "Anfrage erhalten", d: "Datum, Ort, Anlass — gerade eben." },
          { Icon: Clock, t: "Antwort & Angebot", d: "In unter 24 Stunden, versprochen." },
          { Icon: CalendarCheck, t: "Termin bestätigt", d: "Wir freuen uns auf euer Event!" },
        ]}
      />

      <PullQuote
        text="Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach mega. Alle 200 Gäste begeistert."
        name="Jan von Lehmann"
        role="Eventleitung · Magic Camp, 200 Gäste"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        items={[
          {
            q: "Wie läuft die Anfrage ab und wie schnell bekomme ich eine Antwort?",
            a: "Schreibt mir kurz über /kontakt mit Datum, Ort und Anlass der Firmenfeier. Ich melde mich innerhalb von 24 Stunden persönlich mit einem konkreten Vorschlag und Angebot zurück.",
          },
          {
            q: "Was kostet ein Auftritt für unsere Firmenfeier?",
            a: "Der Preis hängt von Dauer, Anfahrt und Gästezahl ab — vom Walk-Around beim Empfang bis zur Bühnenshow als Finale. Nach einer kurzen Anfrage über /kontakt bekommt ihr ein verbindliches Angebot, das genau auf euren Abend passt.",
          },
          {
            q: "Für wie viele Gäste und welche Raumgröße eignet sich das?",
            a: "Close-Up beim Empfang und Tisch-zu-Tisch beim Dinner funktionieren von kleinen Runden bis zu mehreren hundert Gästen, weil ich von Gruppe zu Gruppe gehe. Für die Bühnenshow als Finale reicht eine kleine freie Fläche und eine einfache Tonanlage — von der intimen Mitarbeiterfeier bis zum Saal mit 200 Personen.",
          },
          {
            q: "Was braucht ihr vor Ort an Platz und Technik?",
            a: "Für Walk-Around und Tisch-zu-Tisch genügt das, was ohnehin da ist — keine Bühne nötig. Für die Bühnenshow reichen eine kleine freie Fläche, ein Mikrofon und Anschluss an eure Tonanlage; den Rest stimme ich vorab mit eurem Eventteam ab.",
          },
          {
            q: "Geht das auch auf Englisch und reist Emilian deutschlandweit an?",
            a: "Ja, ich spiele auf Deutsch und Englisch — ideal für internationale Teams und Kundenabende. Basis ist Bayern bzw. Regensburg, gebucht werde ich deutschlandweit; die Anfahrt fließt transparent ins Angebot ein.",
          },
          {
            q: "Wie individuell wird die Show auf unser Unternehmen angepasst?",
            a: "Vorab hole ich mir per Insider-Briefing eure Firmen-Stories, Namen und Running Gags aus dem Team und baue sie in die Show ein. Die Tonalität reicht von Premium bis Comedy — über 200 Events seit 2016 und drei TV-Finals geben euch die Sicherheit, dass es zu eurem Anlass passt.",
          },
        ]}
      />

      <FinalCTA
        title={<>Macht eurem Team den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Firmenfeier — Datum, Ort, Anlass. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
