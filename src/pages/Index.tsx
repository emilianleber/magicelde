import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import USPSection from "@/components/landing/USPSection";
import ShowkonzepteSection from "@/components/landing/ShowkonzepteSection";
import AnlassSection from "@/components/landing/AnlassSection";
import UeberMichSection from "@/components/landing/UeberMichSection";
import ErfolgeSection from "@/components/landing/ErfolgeSection";
import GalerieSection from "@/components/landing/GalerieSection";
import CTASection from "@/components/landing/CTASection";
import ProcessSteps from "@/components/landing/ProcessSteps";
import Footer from "@/components/landing/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import audienceImg from "@/assets/audience-reactions.jpg";
import { Laugh, Wand2, Zap } from "lucide-react";

/* ─── Comedy Differentiator Section ─── */
const ComedySection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-primary mb-8 inline-flex">Comedy + Magie</span>
            <h2 className="headline-section text-foreground mb-6">
              Warum Comedy-Magie so gut funktioniert.
            </h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Die Kombination aus moderner Zauberkunst und cleverem Humor erzeugt
                eine einzigartige Dynamik: Deine Gäste staunen UND lachen.
              </p>
              <p>
                Das ist der Unterschied zu klassischen Zauberern — bei mir geht es nicht
                um den Trick, sondern um das Erlebnis. Um die Reaktion. Um den Moment,
                in dem ein ganzer Raum gleichzeitig lacht und staunt.
              </p>
              <p>
                Comedy-Magie funktioniert bei jedem Publikum, in jeder Situation —
                weil Humor und Staunen universelle Sprachen sind. Vom CEO bis zum
                Hochzeitsgast: Alle werden Teil der Show.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              {[
                { icon: Laugh, label: "Humor" },
                { icon: Wand2, label: "Magie" },
                { icon: Zap, label: "Wow-Effekt" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="font-display text-sm font-bold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img
                src={audienceImg}
                alt="Begeistertes Publikum bei Comedy-Zaubershow"
                className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Was Gäste erleben Section ─── */
const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const moments = [
    { title: "Der erste Staunen-Moment", desc: "Wenn eine Karte, die gerade noch in deiner Hand war, plötzlich in der Tasche deines Nachbarn auftaucht — und alle gleichzeitig lachen." },
    { title: "Das gemeinsame Erleben", desc: "Fremde Gäste, die sich gerade erst vorgestellt haben, erleben zusammen etwas Unmögliches — und reden den Rest des Abends darüber." },
    { title: "Der Gesprächsstarter", desc: "‚Hast du das gesehen?!' — Magie bricht das Eis schneller als jeder Small Talk und schafft sofort eine Verbindung." },
    { title: "Die Erinnerung", desc: "Wochen später erzählen deine Gäste noch davon. Nicht vom Essen, nicht von der Deko — sondern vom Moment, der sie sprachlos gemacht hat." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Das Erlebnis</span>
          <h2 className="headline-section text-foreground mb-6">
            Was deine Gäste erleben.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Es geht nicht um Tricks. Es geht um die Momente dazwischen —
            um Staunen, Lachen und das Gefühl, etwas Besonderes erlebt zu haben.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {moments.map((m, i) => (
            <div key={m.title} className="p-8 rounded-3xl bg-background" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{m.title}</h3>
              <p className="text-detail">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <USPSection />
        <ComedySection />
        <ShowkonzepteSection />
        <AnlassSection />
        <ErlebnisSection />
        <UeberMichSection />
        <ErfolgeSection />
        <GalerieSection />
        <ProcessSteps />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
