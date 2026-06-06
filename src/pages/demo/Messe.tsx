/** /demo/messe-magier — Anlass (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, FormatCards, Bento, NotificationFlow } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Target, Megaphone, Clock, CalendarCheck, Hand, Wand2, UtensilsCrossed } from "lucide-react";
import heroImg from "@/assets/audience-reactions.jpg";
import splitImg from "@/assets/haende-interaktion.jpg";
import bentoImg from "@/assets/zuschauer-blau.jpg";

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

      <Bento
        eyebrow="Warum Aussteller mich buchen"
        title="Mehr als ein Showact — ein Werkzeug für den Stand."
        sub="Kein Selbstzweck, sondern messbar mehr Kontakte — abgestimmt auf Ihre Ziele und Ihr Standpersonal."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Voller Stand", title: "Eine Traube bildet sich — auch in den ruhigen Hallen-Phasen." },
          { kind: "cobalt", span: "col-span-1", v: "50–80", l: "Kontakte pro Stunde" },
          { kind: "glass", span: "col-span-1", Icon: Target, t: "Lead-Magnet", d: "Spürbar mehr qualifizierte Standkontakte." },
          { kind: "quote", span: "col-span-2", text: "Der Stand war den ganzen Tag voll — die Effekte mit unserer Botschaft sind bei den Besuchern hängengeblieben.", name: "Jan von Lehmann" },
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

      <FinalCTA
        title={<>Machen Sie Ihren Stand zum Hingucker der Messe<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählen Sie mir kurz von Ihrem Auftritt — Messe, Standgröße, Termin und Ziel. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
