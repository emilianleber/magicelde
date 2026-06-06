/** /demo/close-up — Show-Detail-Template (Close-Up / Tischmagie). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, FactsGrid, Statement, GlassFeatures, Steps, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Clock, Users, Zap, Layers, Sparkles, Hand, Mic2, Handshake, UtensilsCrossed, Award } from "lucide-react";
import closeupImg from "@/assets/haende-interaktion.jpg";

export default function DemoCloseUp() {
  return (
    <VoltageShell
      title="DEMO · Close-Up Zauberer — Tischmagie für eure Gäste | Emilian Leber"
      description="Close-Up Zauberer in Bayern & deutschlandweit — Tischmagie direkt in den Händen der Gäste. Walk-Around beim Empfang oder Tisch-zu-Tisch beim Dinner, ohne Bühne und ohne Technik."
      path="/demo/close-up"
    >
      <SubHero
        eyebrow="Konzept · Close-Up"
        title={<>Close-Up Magie in <span style={{ color: COBALT }}>euren Händen</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Magie auf Armlänge — direkt in den Händen der Gäste. Karten, Münzen und geliehene Objekte verwandeln sich Auge in Auge. Keine Bühne, kein Mikro, nur ungläubige Gesichter am Tisch."
        image={closeupImg}
        imageAlt="Emilian Leber bei Close-Up-Magie in den Händen eines Gastes"
        badge="Magie direkt am Tisch — die Gäste reden noch Wochen später davon."
        secondary={{ label: "Show ansehen", href: "/demo#show" }}
      />

      <FactsGrid items={[
        { Icon: Clock, k: "Pro Tisch", v: "5 – 7 Minuten" },
        { Icon: Users, k: "Gäste", v: "50 – 80 in ~90 Min" },
        { Icon: Zap, k: "Technik", v: "Keine nötig" },
        { Icon: Layers, k: "Formate", v: "Walk-Around oder Tisch-zu-Tisch" },
      ]} />

      <Statement>Kein Bühnenabstand — die Magie passiert in den <span style={{ color: COBALT }}>Händen der Gäste</span>.</Statement>

      <GlassFeatures
        eyebrow="Was Close-Up ausmacht"
        title="Sechs Dinge, die hängenbleiben."
        sub="Magie auf Tuchfühlung — flexibel auf euren Empfang, euer Dinner und eure Tischordnung abgestimmt."
        items={[
          { Icon: Sparkles, t: "Karten, Münzen, Mentalmagie", d: "Das klassische Repertoire der Tischmagie — sauber gebaut, direkt vor den Augen." },
          { Icon: Hand, t: "Geliehene Objekte der Gäste", d: "Ring, Geldschein, Uhr — alltägliche Dinge werden Teil des Unmöglichen." },
          { Icon: Mic2, t: "Keine Bühne, kein Mikro", d: "Ich brauche keinen Aufbau und keine Technik — nur einen Tisch und Gäste." },
          { Icon: Handshake, t: "Walk-Around beim Empfang", d: "Ich gehe von Gruppe zu Gruppe und bringe sofort Stimmung in den Sektempfang." },
          { Icon: UtensilsCrossed, t: "Tisch-zu-Tisch beim Dinner", d: "Zwischen den Gängen besuche ich jeden Tisch — niemand wird übergangen." },
          { Icon: Award, t: "100+ Close-Up-Auftritte", d: "Erprobtes Programm, das auch skeptische Gäste am Ende am stärksten flasht." },
        ]}
      />

      <Steps
        eyebrow="Drei Momente"
        title="Wann Close-Up am besten wirkt."
        sub="Je nach Ablauf takte ich die Tischmagie genau dort ein, wo sie die größte Wirkung hat."
        items={[
          { t: "Empfang · Walk-Around", d: "Beim Sektempfang gehe ich frei von Gruppe zu Gruppe — der perfekte Eisbrecher, bevor es losgeht." },
          { t: "Dinner · Tisch-zu-Tisch", d: "Zwischen den Gängen besuche ich jeden Tisch — 5 bis 7 Minuten Magie, dann weiter zum nächsten." },
          { t: "Pausen · Highlights", d: "In den Programmpausen sorge ich für Gesprächsstoff, statt dass Leerlauf entsteht." },
        ]}
      />

      <PullQuote
        text="Die Gäste, die ich am wenigsten für Magie offen hielt, waren am Ende am stärksten geflasht. Sogar meine Mutter — und das soll was heißen."
        name="Martina Senftl"
        role="Eventkundin"
      />

      <ReviewsBlock />

      <FinalCTA
        title={<>Bereit für Magie direkt am Tisch<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
