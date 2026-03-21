import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import closeupImg from "@/assets/closeup-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";

const HeroCloseUp = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Showkonzept</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Magie in deinen{" "}
          <AnimatedWords words={["Händen.", "Augen.", "Momenten."]} />
        </h1>
        <p className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Hautnah, interaktiv, direkt vor deinen Augen — Close-Up Magie.
        </p>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={closeupImg} alt="Close-Up Magie" className="w-full h-[420px] md:h-[560px] object-cover" />
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
          <h2 className="headline-section text-foreground mb-8">Magie zum Anfassen.</h2>
          <p className="text-body max-w-xl mb-8">
            Kein Abstand, keine Bühne — die Magie passiert direkt in deinen Händen. Close-Up ist die intimste und intensivste Form der Zauberkunst.
          </p>
          <div className="grid sm:grid-cols-2 gap-8 mt-16">
            {[
              { title: "Direkt vor deinen Augen", desc: "Keine Entfernung, keine Tricks — pure Magie." },
              { title: "Interaktiv", desc: "Jeder Gast wird Teil des Erlebnisses." },
              { title: "Gesprächsstarter", desc: "Der perfekte Icebreaker für jeden Anlass." },
              { title: "Flexibel", desc: "Funktioniert überall — am Tisch, an der Bar, im Stehen." },
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

const CloseUp = () => (
  <PageLayout>
    <HeroCloseUp />
    <WasIstSection />
    <ProcessSteps />
    <BookingCTA headline={"Hautnah erleben."} subline="Close-Up Magie für dein Event — lass uns sprechen." />
  </PageLayout>
);

export default CloseUp;
