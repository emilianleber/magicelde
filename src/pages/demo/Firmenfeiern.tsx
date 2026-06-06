/** /demo/firmenfeiern — Anlass Firmenfeier (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { InteractiveTabs, FormatCards, SplitFeature, Bento, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Briefcase, Check, Clock, CalendarCheck, Hand, Wand2, UtensilsCrossed } from "lucide-react";
import heroImg from "@/assets/schneider-weisse-closeup.jpg";
import splitImg from "@/assets/magicdinner-buehne.jpg";
import bentoImg from "@/assets/buehne-zuschauer.jpg";
import tab1 from "@/assets/closeup.jpg";
import tab2 from "@/assets/emilian-magic-dinner.jpg";
import tab3 from "@/assets/stage-show.jpg";

export default function DemoFirmenfeiern() {
  return (
    <VoltageShell
      title="DEMO · Zauberer für Firmenfeier | Emilian Leber"
      description="Zauberer für die Firmenfeier in Bayern & deutschlandweit — Empfang, Dinner und Bühne als Finale. Premium bis Comedy, mit Insider-Briefing und 100+ Firmen-Events."
      path="/demo/firmenfeiern"
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
          { t: "Empfang · Walk-Around", d: "Close-Up von Gruppe zu Gruppe während Sektempfang und Networking — der Eisbrecher, der Abteilungen ins Gespräch bringt, bevor das Programm überhaupt startet.", img: tab1 },
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
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/demo/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/demo/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/demo/magic-dinner", Icon: UtensilsCrossed },
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

      <Bento
        eyebrow="Warum Firmen mich buchen"
        title="Premium oder Comedy — passend zu eurem Anlass."
        sub="Vom seriösen Kundenabend bis zur lockeren Mitarbeiterfeier — gleiche Qualität, anderer Ton."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Echte Reaktionen", title: "Auch das skeptische Management ist am Ende am stärksten geflasht." },
          { kind: "cobalt", span: "col-span-1", v: "100+", l: "Firmen-Engagements" },
          { kind: "glass", span: "col-span-1", Icon: Briefcase, t: "Premium bis Comedy", d: "Der Ton, der zu eurer Marke passt." },
          { kind: "quote", span: "col-span-2", text: "Bühnenshow als Finale — alle 200 Gäste begeistert.", name: "Jan von Lehmann · Eventleitung" },
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

      <FinalCTA
        title={<>Macht eurem Team den Abend unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurer Firmenfeier — Datum, Ort, Anlass. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
