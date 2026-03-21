import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import portraitImg from "@/assets/magician-portrait.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";

const HeroUeber = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Über mich</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Hi, ich bin{" "}
          <AnimatedWords words={["Emilian.", "MagicEL.", "dein Zauberer."]} />
        </h1>
        <p className="text-body max-w-lg mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Moderner Zauberkünstler. Performer. Erlebnis-Architekt.
        </p>
      </div>
    </div>
  </section>
);

const StorySection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-[2rem] overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <h2 className="headline-section text-foreground mb-8">Meine Geschichte.</h2>
            <div className="space-y-6 text-detail max-w-lg">
              <p>
                Mit 12 Jahren habe ich meinen ersten Zaubertrick gelernt. Was als Hobby begann, wurde schnell zur Leidenschaft — und dann zum Beruf.
              </p>
              <p>
                Heute stehe ich auf den größten Bühnen, performe bei Firmenfeiern, Hochzeiten und exklusiven Events. Nicht mit Zylinder und Kaninchen, sondern mit einer Mischung aus Psychologie, Kreativität und moderner Performance-Kunst.
              </p>
              <p>
                Für mich ist Magie kein Trick — es ist ein Erlebnis, das Menschen verbindet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhilosophieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-12">Meine Philosophie.</h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-12 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { title: "Keine Klischees", desc: "Kein Zylinder, kein Kaninchen. Moderne Magie, die überrascht und berührt." },
            { title: "Erlebnis vor Trick", desc: "Mir geht es nicht um den Effekt — sondern um das, was er bei Menschen auslöst." },
            { title: "Individuell immer", desc: "Jedes Event ist anders. Jede Show wird auf euch und eure Gäste abgestimmt." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h3 className="font-display text-2xl italic text-foreground mb-4">{item.title}</h3>
              <p className="text-detail">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AuszeichnungenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Auszeichnungen</span>
          <h2 className="headline-section text-foreground mb-12">Highlights.</h2>
          <div className="grid sm:grid-cols-3 gap-12 mt-16">
            {[
              { value: "500+", label: "Auftritte" },
              { value: "10+", label: "Jahre Erfahrung" },
              { value: "Finalist", label: "Talents of Magic" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl italic text-foreground tabular-nums">{stat.value}</p>
                <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`grid md:grid-cols-2 gap-4 max-w-4xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="rounded-[2rem] overflow-hidden aspect-[4/5]">
            <img src={stageImg} alt="Bühnenperformance" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="rounded-[2rem] overflow-hidden aspect-[4/5]">
            <img src={heroImg} alt="Live Performance" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

const UeberMich = () => (
  <PageLayout>
    <HeroUeber />
    <StorySection />
    <PhilosophieSection />
    <AuszeichnungenSection />
    <GalerieSection />
    <BookingCTA headline={"Lass uns sprechen."} subline="Ich freue mich, von deinem Event zu hören." />
  </PageLayout>
);

export default UeberMich;
