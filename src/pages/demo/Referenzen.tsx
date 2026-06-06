/** /demo/referenzen — Referenzen (kreativ, eigene Komposition). */
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, LogoMarquee, ReviewsBlock, PullQuote, FinalCTA } from "@/components/voltage/sections";
import { WarumCarousel, SplitFeature } from "@/components/voltage/creative";
import { motion } from "framer-motion";
import { Building2, Star } from "lucide-react";
import { INK, WHITE, COBALT, MAGENTA, L_LINE, L_DIM, up, stagger, vp, Eyebrow } from "@/components/voltage/theme";
import refImg from "@/assets/magicdinner-buehne.jpg";
import carA from "@/assets/audience-reactions.jpg";
import carB from "@/assets/buehne-zuschauer.jpg";
import splitImg from "@/assets/schneider-weisse-closeup.jpg";

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

      <WarumCarousel
        eyebrow="Warum Referenzen?"
        title={<>Sechs Gründe, warum man auf <span style={{ color: COBALT }}>Erfahrung</span> setzt<span style={{ color: MAGENTA }}>.</span></>}
        cards={[
          { kind: "photo", image: carA, chip: "Echte Reaktionen", title: "Publikum, das mitgeht", text: "Begeisterte Gäste auf jeder Feier — vom Vorstands-Dinner bis zur Messe.", pos: "center" },
          { kind: "stat", v: "200+", l: "Events seit 2016", text: "Routine quer durch Bayern und deutschlandweit." },
          { kind: "feature", Icon: Building2, title: "16+ Branchen", text: "Versicherung bis Theater — die Tonalität passt sich an, die Verlässlichkeit bleibt gleich." },
          { kind: "photo", image: carB, chip: "Bühne & Saal", title: "Vom Gala-Slot bis zum Headliner", text: "Jeder Auftritt vorbereitet und exakt auf den Anlass abgestimmt.", pos: "center" },
          { kind: "review", text: "Zuverlässig, flexibel — das Publikum ist jedes Mal begeistert.", name: "Eventagentur · Bayern" },
          { kind: "feature", Icon: Star, title: "5,0★ verifiziert", text: "30+ echte Bewertungen auf Google und ProvenExpert — mit benannten Auftraggebern." },
        ]}
      />

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

      <SplitFeature
        eyebrow="Aus 16+ Branchen"
        title={<>Premium-Gala oder Comedy-Abend — <span style={{ color: COBALT }}>eine</span> Künstlerpersönlichkeit.</>}
        sub="Versicherung, Bau, Banking, Brauerei, Theater, öffentliche Hand — die Tonalität passt sich an, die Verlässlichkeit bleibt gleich."
        points={["Konzept, Vertrag und Briefing aus einer Hand", "Tonalität fein justiert nach Anlass", "Antwort in unter 24 Stunden"]}
        image={splitImg}
        imageAlt="Emilian Leber bei einem Firmenevent"
        stat={{ v: "16+", l: "Branchen" }}
      />

      <ReviewsBlock paper={false} />

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
