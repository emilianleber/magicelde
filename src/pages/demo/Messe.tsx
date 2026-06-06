/** /demo/messe-magier — Anlass-Template (Messe & Roadshow). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Steps, GlassFeatures, Statement, PullQuote, Stats, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Users, MessageSquare, Megaphone, Target, Clock, MessageCircle } from "lucide-react";
import audienceImg from "@/assets/audience-reactions.jpg";

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
        image={audienceImg}
        imageAlt="Begeisterte Besucher reagieren auf Close-Up-Magie am Messestand"
        badge="50–80 echte Standkontakte pro Stunde — statt leerem Gang."
      />

      <Steps
        eyebrow="So funktioniert es am Stand"
        title="Aus Laufkundschaft werden Gespräche."
        sub="Drei Phasen, die ineinandergreifen — vom ersten Blickkontakt bis zur platzierten Botschaft. Eingetaktet in Ihren Messetag."
        items={[
          { t: "Menschen anziehen", d: "Close-Up direkt am Stand erzeugt eine Traube — Besucher bleiben stehen, schauen zu und kommen näher, ganz ohne aufdringliches Ansprechen." },
          { t: "Im Gespräch halten", d: "Aus dem Staunen entsteht ein lockerer Moment. Die Hemmschwelle fällt, Ihr Standpersonal kommt entspannt ins Gespräch — Magie als Eisbrecher." },
          { t: "Botschaft platzieren", d: "Ihre Kernbotschaft, Ihr Produkt oder Ihr Claim wird in die Effekte eingebaut — sie bleibt hängen, weil sie an einen Aha-Moment gekoppelt ist." },
        ]}
      />

      <GlassFeatures
        eyebrow="Warum Aussteller mich buchen"
        title="Mehr als ein Showact — ein Werkzeug für den Stand."
        sub="Abgestimmt auf Ihre Ziele, Ihre Botschaft und Ihr Standpersonal. Kein Selbstzweck, sondern messbar mehr Kontakte."
        items={[
          { Icon: Users, t: "Magnet am Stand", d: "Close-Up zieht Besucher aktiv an — Ihr Stand füllt sich auch in ruhigen Hallen-Phasen." },
          { Icon: Megaphone, t: "Botschaft im Effekt", d: "Ich binde Ihren Claim, Ihr Produkt oder Ihre Kernbotschaft direkt in die Effekte ein." },
          { Icon: MessageSquare, t: "Senkt die Hemmschwelle", d: "Aus Zuschauern werden Gesprächspartner — Ihr Standpersonal kommt leichter ins Gespräch." },
          { Icon: MessageCircle, t: "DE & EN möglich", d: "Auf Wunsch mehrsprachig — internationale Besucher werden genauso abgeholt wie deutsche." },
          { Icon: Clock, t: "Flexible Slots", d: "Verteilt über den Messetag — zu Stoßzeiten oder gezielt, wenn der Gang sonst leer wäre." },
          { Icon: Target, t: "Messbar mehr Kontakte", d: "Spürbar mehr qualifizierte Standkontakte — der ROI zeigt sich direkt am Lead-Zähler." },
        ]}
      />

      <Statement>Ein voller Stand verkauft sich <span style={{ color: COBALT }}>von selbst</span>.</Statement>

      <PullQuote
        text="Emilian hat Konzept, Pitch und Briefing in einem Stück geliefert. Der Stand war den ganzen Tag voll — die Effekte mit unserer Botschaft sind bei den Besuchern hängengeblieben."
        name="Jan von Lehmann"
        role="Eventleitung · Messeauftritt"
      />

      <Stats items={[
        { v: "200+", l: "Events seit 2016" },
        { v: "50–80", l: "Kontakte pro Stunde" },
        { v: "5,0★", l: "30+ Bewertungen" },
        { v: "DE + EN", l: "mehrsprachig möglich" },
      ]} />

      <ReviewsBlock />

      <FinalCTA
        title={<>Machen Sie Ihren Stand zum Hingucker der Messe<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählen Sie mir kurz von Ihrem Auftritt — Messe, Standgröße, Termin und Ziel. Ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
