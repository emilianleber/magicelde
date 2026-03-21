import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";

const HeroStage = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Showkonzept</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Die{" "}
          <AnimatedWords words={["Bühnenshow.", "Performance.", "Inszenierung."]} />
        </h1>
        <p className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Durchkomponiert, mitreißend, unvergesslich — Magie als Bühnenerlebnis.
        </p>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={stageImg} alt="Bühnenshow von MagicEL" className="w-full h-[420px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

const WasIstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-8">Mehr als Tricks auf der Bühne.</h2>
          <p className="text-body max-w-xl mb-8">
            Eine durchkomponierte Show mit Dramaturgie, Humor und Momenten, die das Publikum nicht vergisst. Jede Show wird individuell auf euer Event abgestimmt.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 mt-16">
            {[
              { title: "15–60 Minuten", desc: "Flexibel anpassbar an euren Ablauf." },
              { title: "Bis 500+ Gäste", desc: "Skalierbar für jede Veranstaltungsgröße." },
              { title: "Eigene Technik", desc: "Professionelle Ton- und Lichttechnik möglich." },
              { title: "Individuell", desc: "Inhalte auf eure Botschaft abgestimmt." },
            ].map((item) => (
              <div key={item.title} className="py-6">
                <h3 className="font-display text-xl italic text-foreground mb-2">{item.title}</h3>
                <p className="text-detail">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Einsatz</span>
          <h2 className="headline-section text-foreground">Wann eine Bühnenshow passt.</h2>
        </div>
        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { title: "Firmenfeiern & Galas", desc: "Als Highlight des Abendprogramms." },
            { title: "Hochzeiten", desc: "Wenn alle zusammenkommen — der perfekte Moment." },
            { title: "Geburtstage & Jubiläen", desc: "Die Überraschung, die alle begeistert." },
            { title: "Messen & Produktpräsentationen", desc: "Aufmerksamkeit garantiert." },
          ].map((item) => (
            <div key={item.title} className="py-7">
              <h3 className="font-display text-xl md:text-2xl italic text-foreground">{item.title}</h3>
              <p className="text-detail mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Buehnenshow = () => (
  <PageLayout>
    <HeroStage />
    <WasIstSection />
    <EinsatzSection />
    <ProcessSteps />
    <BookingCTA headline={"Die Bühne gehört dir."} subline="Lass uns über dein Event sprechen." />
  </PageLayout>
);

export default Buehnenshow;
