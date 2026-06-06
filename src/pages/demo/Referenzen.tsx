/** /demo/referenzen — Referenzen-Template. Echte Kunden + echte Bewertungen. */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Stats, LogoMarquee, ReviewsBlock, PullQuote, FinalCTA } from "@/components/voltage/sections";
import { motion } from "framer-motion";
import { INK, WHITE, COBALT, MAGENTA, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";
import refImg from "@/assets/greatest-talent-presse.jpg";

const CLIENTS = [
  { logo: "vkb.png", name: "Versicherungskammer Bayern", branch: "Versicherung" },
  { logo: "strabag.png", name: "STRABAG", branch: "Bau" },
  { logo: "xxxlutz.png", name: "XXXLutz", branch: "Möbel" },
  { logo: "sixt.png", name: "Sixt", branch: "Mobilität" },
  { logo: "sparkasse.png", name: "Sparkasse", branch: "Banking" },
  { logo: "heim-haus.png", name: "HEIM & HAUS", branch: "Bau" },
  { logo: "schneider-weisse.png", name: "Schneider Weisse", branch: "Brauerei" },
  { logo: "wald-wiese.png", name: "Wald & Wiese", branch: "Restaurant" },
  { logo: "stadt-regensburg.png", name: "Stadt Regensburg", branch: "Öffentlich" },
  { logo: "oktoberfest.png", name: "Oktoberfest", branch: "Event" },
  { logo: "turmtheater.png", name: "Turmtheater", branch: "Theater" },
  { logo: "steinhofer.png", name: "Steinhofer", branch: "Mittelstand" },
];

export default function DemoReferenzen() {
  return (
    <VoltageShell
      title="DEMO · Referenzen — 200+ Events seit 2016 | Emilian Leber"
      description="200+ Events seit 2016, quer durch Bayern: Hochzeiten, Firmenfeiern, Galas und Messen. Echte Kunden, echte 5,0★-Bewertungen von Google & ProvenExpert."
      path="/demo/referenzen"
    >
      <SubHero
        eyebrow="Referenzen"
        title={<>200+ Events. Seit 2016. Quer durch <span style={{ color: COBALT }}>Bayern</span><span style={{ color: MAGENTA }}>.</span></>}
        sub="Von der Hochzeit über das Vorstands-Dinner bis zur Messe — dokumentiert, mit echten Stimmen und benannten Auftraggebern."
        image={refImg}
        imageAlt="Emilian Leber auf der Bühne"
        badge="5,0★ · 30+ verifizierte Bewertungen"
        primary={{ label: "Selbst anfragen", href: "/demo/kontakt" }}
      />

      <Stats items={[
        { v: "200+", l: "Events seit 2016" },
        { v: "100+", l: "Hochzeiten" },
        { v: "100+", l: "Firmen-Engagements" },
        { v: "80+", l: "Geburtstage & Jubiläen" },
      ]} />

      <LogoMarquee label="Auftraggeber aus 16+ Branchen" />

      {/* Kunden-Grid */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={up}><Eyebrow>Eine Auswahl</Eyebrow><h2 className="font-extrabold tracking-[-0.02em] max-w-3xl" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}>Marken, die schon gebucht haben.</h2></motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {CLIENTS.map((c) => (
              <motion.div key={c.name} variants={up} className="rounded-[18px] p-6 flex flex-col items-center justify-center text-center gap-3" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
                <img src={`/logos/${c.logo}`} alt={c.name} className="h-10 w-auto object-contain" loading="lazy" />
                <div>
                  <p className="text-[13.5px] font-semibold leading-tight" style={{ color: INK }}>{c.name}</p>
                  <p className="text-[11.5px] mt-0.5" style={{ color: L_DIM }}>{c.branch}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <ReviewsBlock />

      <PullQuote
        text="Wir haben ein Magic Camp komplett neu aufgestellt — 200 Gäste, Workshop-Stationen, Bühnenshow als Finale. Emilian hat Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach mega."
        name="Jan von Lehmann"
        role="Eventleitung · Versicherungs-Konzern"
      />

      <FinalCTA
        title={<>Werdet die nächste Referenz<span style={{ color: MAGENTA }}>.</span></>}
        sub="Erzählt mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück."
      />
    </VoltageShell>
  );
}
