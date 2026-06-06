/** /demo/zauberer-regensburg — Stadt-Landingpage (groß): lokal + Formate + Anlässe. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { SplitFeature, FormatCards, InteractiveTabs, Bento } from "@/components/voltage/creative";
import { COBALT, MAGENTA } from "@/components/voltage/theme";
import { Hand, Wand2, UtensilsCrossed, MapPin, Clock, Sparkles } from "lucide-react";
import heroImg from "@/assets/stage-show.jpg";
import splitImg from "@/assets/moderator-hero.jpg";
import bentoImg from "@/assets/magicdinner-buehne.jpg";
import tabA from "@/assets/wedding-magic.jpg";
import tabB from "@/assets/schneider-weisse-closeup.jpg";
import tabC from "@/assets/audience-reactions.jpg";

export default function DemoStadtRegensburg() {
  return (
    <VoltageShell
      title="DEMO · Zauberer Regensburg — Comedy-Zauberei für eure Feier | Emilian Leber"
      description="Zauberer in Regensburg buchen — Comedy-Zauberei für Hochzeit, Firmenfeier & Event. Aus Regensburg, kurze Wege in der Region, deutschlandweit unterwegs. 200+ Events, 5,0★."
      path="/demo/zauberer-regensburg"
    >
      <SubHero
        eyebrow="Comedy-Zauberer · Regensburg"
        title={<>Zauberer in <span style={{ color: COBALT }}>Regensburg</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Zuhause in Regensburg, unterwegs in ganz Bayern und deutschlandweit. Comedy-Zauberei für Hochzeit, Firmenfeier und Geburtstag — mit kurzen Wegen in der Region."
        image={heroImg}
        imageAlt="Emilian Leber, Zauberer aus Regensburg"
        imgPos="top"
        badge="Aus Regensburg · 200+ Events seit 2016"
      />

      <SplitFeature
        eyebrow="Lokal verwurzelt"
        title={<>Aus Regensburg — und ich kenne die <span style={{ color: COBALT }}>Locations</span>.</>}
        sub="Aufgewachsen am Pass eines bayerischen Gasthauses, zuhause in Regensburg. Ich kenne die Säle, den Ablauf und den Service-Takt der Region — vom Turmtheater bis zur Eventlocation im Umland."
        points={["Kurze Wege in Regensburg & Umgebung — transparente Anfahrt", "Vertraut mit Locations und Caterern der Region", "Deutschlandweit unterwegs, wenn ihr woanders feiert"]}
        image={splitImg}
        imageAlt="Emilian Leber auf der Bühne"
        imgPos="center"
        stat={{ v: "200+", l: "Events seit 2016" }}
      />

      <FormatCards
        eyebrow="Eure Formate"
        title={<>Was ich in Regensburg <span style={{ color: COBALT }}>mitbringe</span>.</>}
        sub="Drei Formate für jeden Rahmen — einzeln oder kombiniert, passend zu eurer Feier."
        note="Frei kombinierbar — von der Tischmagie bis zur großen Bühnenshow."
        formats={[
          { t: "Close-Up", d: "Magie direkt in den Händen eurer Gäste — beim Empfang oder am Tisch.", h: "/demo/close-up", Icon: Hand },
          { t: "Bühnenshow", d: "Comedy & Mentalmagie für den ganzen Saal, mit Standing-Ovation-Finale.", h: "/demo/buehnenshow", Icon: Wand2 },
          { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend — Tisch und Bühne zwischen den Gängen.", h: "/demo/magic-dinner", Icon: UtensilsCrossed },
        ]}
      />

      <InteractiveTabs
        eyebrow="Anlässe in der Region"
        title="Egal, was ihr in Regensburg feiert."
        tabs={[
          { t: "Hochzeit", d: "Drei Akte Magie zwischen Ja-Wort und Mitternacht — Sektempfang, Dinner, Bühne vor dem Tanz.", img: tabA, pos: "center" },
          { t: "Firmenfeier", d: "Eisbrecher für gemischte Teams — vom Vorstands-Dinner bis zur Mitarbeiterfeier.", img: tabB, pos: "top" },
          { t: "Geburtstag", d: "Die Show, über die man noch redet — herzlich, comedy-lastig, alle eingebunden.", img: tabC, pos: "center" },
        ]}
      />

      <Bento
        eyebrow="In Zahlen"
        title="Routine aus der Region."
        sub="Über 200 Events seit 2016 — viele davon in Regensburg und Umgebung."
        items={[
          { kind: "photo", span: "col-span-2 row-span-2", image: bentoImg, chip: "Regensburg & Umland", title: "Vom Vorstands-Dinner bis zur großen Gala.", pos: "center" },
          { kind: "cobalt", span: "col-span-1", v: "5,0★", l: "30+ Bewertungen" },
          { kind: "glass", span: "col-span-1", Icon: MapPin, t: "Regensburg", d: "Heimat & kurze Wege." },
          { kind: "quote", span: "col-span-2", text: "Alle sprechen noch Wochen danach davon. Sogar meine Mutter war geflasht.", name: "Martina Senftl · Regensburg" },
        ]}
      />

      <PullQuote
        text="Emilian ist der einzige, dem ich seit Jahren blind vertraue — er hält Zeitplan und bringt Ruhe in den Ablauf."
        name="Katrin Raß"
        role="Hochzeitsplanerin · Bayern"
      />

      <ReviewsBlock paper={false} />

      <FinalCTA
        title={<>Eure Feier in Regensburg — unvergesslich<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
