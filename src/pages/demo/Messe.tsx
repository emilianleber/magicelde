/** /demo/messe-magier — Anlass (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FAQ, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, FormatCards, WarumCarousel, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Target, Megaphone, Clock, CalendarCheck, Hand, Wand2, UtensilsCrossed, Languages } from "lucide-react";
import heroImg from "@/assets/audience-reactions.jpg";
import splitImg from "@/assets/haende-interaktion.jpg";
import carA from "@/assets/buehne-zuschauer.jpg";
import carB from "@/assets/stage-show.jpg";

export default function DemoMesse() {
  return (
    <VoltageShell
      title="DEMO · Messe-Zauberer — Magie, die an den Stand zieht | Emilian Leber"
      description="Messe-Zauberer & Roadshow-Magier für Ihren Stand. Close-Up als Magnet zieht Besucher an, senkt die Hemmschwelle für Gespräche und platziert Ihre Botschaft — messbar mehr Standkontakte, DE + EN."
      path="/demo/messe-magier"
    >
      <SubHero
        eyebrow="Anlass · Messe & Roadshow"
        title={<>Magie, die an den <span style={{ color: COBALT }}>Stand zieht</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Close-Up am Stand als Magnet — zieht Besucher an, hält sie im Gespräch und platziert Ihre Botschaft mitten im Effekt. Flexibel über den ganzen Messetag, auf Wunsch in DE und EN."
        image={heroImg}
        imageAlt="Begeisterte Besucher reagieren auf Close-Up-Magie am Messestand"
        badge="50–80 echte Standkontakte pro Stunde — statt leerem Gang."
      />

      <SplitFeature
        eyebrow="Der Magnet am Stand"
        title={<>Close-Up zieht Menschen an — und Ihre <span style={{ color: COBALT }}>Botschaft</span> mit rein.</>}
        sub="Eine Traube am Stand entsteht ganz ohne aufdringliches Ansprechen. Aus dem Staunen wird ein lockerer Moment — die Hemmschwelle fällt, Ihr Standpersonal kommt entspannt ins Gespräch. Und Ihr Claim sitzt mitten im Aha-Moment."
        points={["Mehrsprachig in DE und EN — internationale Besucher voll abgeholt", "Flexible Slots über den ganzen Messetag — gezielt, wenn der Gang sonst leer wäre", "Messbar mehr qualifizierte Standkontakte — ROI direkt am Lead-Zähler"]}
        image={splitImg}
        imageAlt="Close-Up-Magie direkt in den Händen der Standbesucher"
        reverse
        stat={{ v: "DE + EN", l: "mehrsprachig" }}
      />

      <FormatCards
        eyebrow="Welche Formate passen"
        title={<>Drei Formate für Messe & Roadshow — <span style={{ color: COBALT }}>frei kombinierbar</span>.</>}
        sub="Vom Lead-Magnet am Stand bis zum Bühnen-Slot auf der Aktionsfläche."
        note="Flexibel über den Messetag — Close-Up am Stand bis Bühnen-Slot."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste.", h: "/demo/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal.", h: "/demo/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend.", h: "/demo/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <WarumCarousel
        eyebrow="Warum Messe-Magie?"
        title={<>Sechs Gründe, warum der <span style={{ color: COBALT }}>Stand</span> voll wird.</>}
        cards={[
          { kind: "photo", image: carA, chip: "Voller Stand", title: "Die Traube bildet sich", text: "Eine Menschentraube entsteht ganz ohne aufdringliches Ansprechen — auch in den ruhigen Hallen-Phasen.", pos: "center" },
          { kind: "stat", v: "50–80", l: "Kontakte pro Stunde", text: "Echte Standkontakte statt leerem Gang — direkt am Lead-Zähler messbar." },
          { kind: "feature", Icon: Target, title: "Lead-Magnet", text: "Spürbar mehr qualifizierte Standkontakte — die Hemmschwelle für das Gespräch fällt." },
          { kind: "photo", image: carB, chip: "Botschaft", title: "Ihr Claim im Aha-Moment", text: "Die Effekte transportieren Ihre Botschaft mitten ins Staunen — und bleiben hängen.", pos: "top" },
          { kind: "review", text: "Der Stand war den ganzen Tag voll — die Effekte mit unserer Botschaft sind bei den Besuchern hängengeblieben.", name: "Jan von Lehmann · Eventleitung" },
          { kind: "feature", Icon: Languages, title: "Mehrsprachig", text: "DE und EN fließend — internationale Besucher werden voll abgeholt." },
        ]}
      />

      <NotificationFlow
        eyebrow="So unkompliziert"
        title={<>Von der Anfrage bis zum <span style={{ color: COBALT }}>Termin</span>.</>}
        sub="Eine kurze Nachricht zu Messe, Standgröße und Ziel reicht. Ich melde mich in unter 24 Stunden mit Konzept und Angebot — verbindlich und ohne Stress."
        steps={[
          { Icon: Megaphone, t: "Anfrage erhalten", d: "Messe, Standgröße, Ziel — gerade eben." },
          { Icon: Clock, t: "Antwort & Angebot", d: "In unter 24 Stunden, versprochen." },
          { Icon: CalendarCheck, t: "Termin bestätigt", d: "Wir machen Ihren Stand zum Hingucker." },
        ]}
      />

      <PullQuote
        text="Emilian hat Konzept, Pitch und Briefing in einem Stück geliefert. Der Stand war den ganzen Tag voll — die Effekte mit unserer Botschaft sind bei den Besuchern hängengeblieben."
        name="Jan von Lehmann"
        role="Eventleitung · Messeauftritt"
      />

      <ReviewsBlock paper={false} />

      <FAQ
        items={[
          {
            q: "Was kostet ein Messe-Magier ungefaehr?",
            a: "Der Preis haengt von Einsatzdauer, Anfahrt und Umfang ab - ein Stand-Slot fuer ein paar Stunden ist anders kalkuliert als der ganze Messetag. Nach einer kurzen Anfrage ueber /demo/kontakt bekommen Sie ein konkretes Angebot, in der Regel binnen 24 Stunden.",
          },
          {
            q: "Wie laeuft die Anfrage ab und wie schnell kommt eine Antwort?",
            a: "Eine kurze Nachricht zu Messe, Standgroesse, Termin und Ziel reicht voellig. Ich melde mich innerhalb von 24 Stunden persoenlich mit Konzept und Angebot zurueck.",
          },
          {
            q: "Wie viel Platz braucht die Magie am Stand?",
            a: "Close-Up funktioniert direkt in den Haenden der Besucher und braucht praktisch keinen Aufbau - ein paar Quadratmeter freie Standflaeche genuegen. Fuer einen Buehnen-Slot auf der Aktionsflaeche klaeren wir Buehne und Technik vorab im Briefing.",
          },
          {
            q: "Lassen sich Effekte und Botschaft auf unser Produkt anpassen?",
            a: "Ja, das ist der Kern der Sache: Ihr Claim oder Produkt wird in die Effekte eingebaut und sitzt mitten im Aha-Moment. Sie schildern mir kurz Ihre Botschaft, ich entwickle daraus passende Routinen fuer den Stand.",
          },
          {
            q: "Geht das auch auf Englisch fuer internationale Besucher?",
            a: "Ja, ich arbeite fliessend in Deutsch und Englisch und wechsle je nach Besucher direkt. So holen Sie auch internationales Messepublikum voll ab.",
          },
          {
            q: "Reisen Sie auch ueberregional zu unserer Messe an?",
            a: "Ja, ich bin deutschlandweit unterwegs - Basis ist Bayern rund um Regensburg, mit ueber 200 Events seit 2016 und drei TV-Finals. Anfahrt und mehrtaegige Auftritte stimmen wir einfach in der Anfrage ab.",
          },
        ]}
      />

      <FinalCTA
        title={<>Machen Sie Ihren Stand zum Hingucker der Messe<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählen Sie mir kurz von Ihrem Auftritt — Messe, Standgröße, Termin und Ziel. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
