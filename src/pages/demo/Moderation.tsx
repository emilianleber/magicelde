/** /demo/moderation — Show-Detail-Template (Moderation). Echte Inhalte. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, FactsGrid, Statement, GlassFeatures, Steps, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Clock, Trophy, Mic2, MessageSquare, Sparkles, Layers, Zap, FileText, Award, Megaphone } from "lucide-react";
import moderatorImg from "@/assets/moderator-hero.jpg";

export default function DemoModeration() {
  return (
    <VoltageShell
      title="DEMO · Moderation — Roter Faden für Gala & Event | Emilian Leber"
      description="Moderation mit rotem Faden für Gala, Award & Firmenevent — verbindet Programmpunkte, hält Energie und Timing, mit Mentalmagie-Einsprengseln. Headset & Ton inkl., auf Wunsch zweisprachig DE/EN."
      path="/demo/moderation"
    >
      <SubHero
        eyebrow="Konzept · Moderation"
        title={<>Moderation mit <span style={{ color: COBALT }}>rotem Faden</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Ich verbinde eure Programmpunkte, halte Energie und Timing im Saal — mit Mentalmagie-Einsprengseln statt Lückenfüller. Ein Abend, der sich rund anfühlt, von der Begrüßung bis zum Schluss."
        image={moderatorImg}
        imageAlt="Emilian Leber als Moderator auf der Bühne"
        badge="Roter Faden — der Abend läuft, das Timing sitzt."
        secondary={{ label: "Mehr sehen", href: "/demo#show" }}
      />

      <FactsGrid items={[
        { Icon: Clock, k: "Länge", v: "flexibel · ganzer Abend" },
        { Icon: Trophy, k: "Anlass", v: "Gala · Award · Firmenevent" },
        { Icon: Mic2, k: "Technik", v: "Headset & Ton inkl." },
        { Icon: MessageSquare, k: "Sprache", v: "auf Wunsch DE / EN" },
      ]} />

      <Statement>Kein Ansager am Pult — ein <span style={{ color: COBALT }}>roter Faden</span>, der den Abend trägt.</Statement>

      <GlassFeatures
        eyebrow="Was die Moderation ausmacht"
        title="Sechs Dinge, die den Abend tragen."
        sub="Souveräne Führung trifft Mentalmagie — abgestimmt auf euer Programm und euren Anlass."
        items={[
          { Icon: Layers, t: "Roter Faden", d: "Eine Klammer über den ganzen Abend — Themen und Auftritte greifen ineinander statt nebeneinander." },
          { Icon: Zap, t: "Übergänge & Timing", d: "Saubere Anmoderationen, gehaltene Pausen, Programmpunkte sitzen auf die Minute." },
          { Icon: Megaphone, t: "Energie im Saal", d: "Ich lese den Raum und halte die Stimmung oben — auch in Hängern und Umbaupausen." },
          { Icon: Sparkles, t: "Magie-Akzente", d: "Mentalmagie-Einsprengsel statt Lückenfüller — kleine Momente, die wach machen." },
          { Icon: FileText, t: "Briefing vorab", d: "Ablauf, Namen, Anekdoten, Sponsoren — alles geprüft, bevor das Licht angeht." },
          { Icon: Award, t: "Profi seit 2016", d: "Galas, Awards und Firmenevents moderiert — ich kenne den Druck einer Live-Bühne." },
        ]}
      />

      <Steps
        eyebrow="Drei Schritte"
        title="So führe ich durch euren Abend."
        sub="Von der Vorab-Abstimmung bis zu den magischen Akzenten — ich takte mich in euren Ablauf ein."
        items={[
          { t: "Vorab-Abstimmung", d: "Wir gehen den Ablauf durch: Programmpunkte, Namen, Timing, Tonalität — ich baue das Briefing." },
          { t: "Durch den Abend führen", d: "Ich verbinde die Punkte, halte Energie und Zeitplan und nehme den Saal souverän mit." },
          { t: "Magische Akzente", d: "An den richtigen Stellen kurze Mentalmagie — Momente, die den Abend würzen statt füllen." },
        ]}
      />

      <PullQuote
        text="Emilian hat den ganzen Abend zusammengehalten — Timing perfekt, Energie da, und die kleinen Magie-Momente haben den Saal jedes Mal wach gemacht."
        name="Jan von Lehmann"
        role="Eventleitung"
      />

      <ReviewsBlock />

      <FinalCTA
        title={<>Bereit für einen Abend mit rotem Faden<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
