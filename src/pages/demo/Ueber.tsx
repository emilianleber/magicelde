/** /demo/ueber — Über-Template. Echte Bio + Auszeichnungen. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, GlassFeatures, Statement, Stats, PullQuote, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import { INK, WHITE, COBALT, MAGENTA, D_DIM, Eyebrow } from "@/components/voltage/theme";
import { Award, Tv, Trophy, Star, Sparkles, Mic2 } from "lucide-react";
import portraitImg from "@/assets/magician-portrait.jpg";
import storyImg from "@/assets/emilian-portrait-cards.jpg";

export default function DemoUeber() {
  return (
    <VoltageShell
      title="DEMO · Über Emilian Leber — Comedy-Zauberer aus Regensburg"
      description="Comedy-Zauberer aus Regensburg, aufgewachsen am Pass eines bayerischen Gasthauses. Stand-Up trifft Mentalmagie. 3× TV-Finalist, 200+ Events seit 2016, 5,0★."
      path="/demo/ueber"
    >
      <SubHero
        eyebrow="Über mich"
        title={<>Der Zauberer, bei dem auch <span style={{ color: COBALT }}>gelacht</span> wird<span style={{ color: MAGENTA }}>.</span></>}
        sub="Aufgewachsen am Pass eines bayerischen Gasthauses — Service-Takt und Abendregie aus erster Hand. Magie genau dort, wo sie wirkt: zwischen Menschen."
        image={portraitImg}
        imageAlt="Emilian Leber, Comedy-Zauberer"
        badge="3× TV-Finalist · 200+ Events seit 2016"
        primary={{ label: "Kennenlernen", href: "/demo/kontakt" }}
      />

      {/* Story (dunkel) */}
      <section className="px-5 md:px-10 py-20 md:py-28" style={{ background: INK, color: WHITE }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-[24px] overflow-hidden order-2 lg:order-1" style={{ boxShadow: "0 40px 90px -34px rgba(0,0,0,0.6)" }}>
            <img src={storyImg} alt="Emilian Leber mit Karten" className="w-full h-[420px] md:h-[520px] object-cover object-top" loading="lazy" />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow dark>Meine Geschichte</Eyebrow>
            <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.04, color: WHITE }}>Staunen und Lachen — im selben Moment.</h2>
            <div className="mt-6 space-y-5 text-[15.5px] md:text-base leading-[1.75]" style={{ color: D_DIM }}>
              <p>Schon als Kind habe ich gezaubert — der erste bezahlte Auftritt kam früh. Heute mache ich es hauptberuflich: über 200 gespielte Events seit 2016, von der intimen Hochzeit bis zum Vorstands-Dinner.</p>
              <p>Comedy gehört bei mir nicht als Beilage dazu, sondern ist Teil der Magie. Eure Gäste sollen staunen — und im selben Atemzug lachen. Das bleibt hängen, länger als jeder Sektempfang.</p>
              <p>Vom feinen Premium-Auftritt für die Gala bis zur Comedy-lastigen Show für Geburtstag und Hochzeit — alles innerhalb derselben Künstlerpersönlichkeit, dosiert nach Anlass.</p>
            </div>
          </div>
        </div>
      </section>

      <GlassFeatures
        eyebrow="Bühnen & Auszeichnungen"
        title="Wo ich schon stand."
        sub="TV-Finals, Wettbewerbe und über 200 Live-Events — Routine, die euch Sicherheit gibt."
        items={[
          { Icon: Tv, t: "Greatest Talent 2023", d: "Finalist der TV-Show (SAT.1) — Bühne vor großem Publikum und Kameras." },
          { Icon: Trophy, t: "Talents of Magic 2024", d: "Finalist und Kreativpreis — für eigenständige, neue Effekte." },
          { Icon: Mic2, t: "TVA-TV-Interview 2025", d: "Porträt im regionalen Fernsehen — der Comedy-Zauberer aus Regensburg." },
          { Icon: Award, t: "Dt. Jugendmeisterschaft", d: "Top-30-Platzierung im nationalen Wettbewerb der Zauberkunst." },
          { Icon: Star, t: "5,0★ verifiziert", d: "30+ Bewertungen auf Google und ProvenExpert — ohne Ausreißer." },
          { Icon: Sparkles, t: "200+ Events", d: "Hochzeiten, Firmenfeiern, Galas und Messen — quer durch Bayern und DE." },
        ]}
      />

      <Statement>Magie genau dort, wo sie wirkt — <span style={{ color: COBALT }}>zwischen Menschen</span>.</Statement>

      <Stats items={[
        { v: "200+", l: "Events seit 2016" },
        { v: "3×", l: "TV-Finalist" },
        { v: "100+", l: "Hochzeiten" },
        { v: "5,0★", l: "30+ Bewertungen" },
      ]} />

      <PullQuote
        text="Emilian ist der einzige, dem ich seit Jahren blind vertraue: er checkt das Brautpaar vorab, baut Insider ein, hält Zeitplan und bringt Ruhe in den Ablauf."
        name="Katrin Raß"
        role="Hochzeitsplanerin"
      />

      <ReviewsBlock />

      <FinalCTA
        title={<>Lernen wir uns kennen<span style={{ color: MAGENTA }}>?</span></>}
        sub="Erzähl mir kurz von deinem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
