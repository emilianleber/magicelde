import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";

const HeroDinner = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Spezialgebiet</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Das{" "}
          <AnimatedWords words={["Magic Dinner.", "Erlebnis.", "Highlight."]} />
        </h1>
        <p className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Ein Abend, an dem Genuss und Staunen verschmelzen.
        </p>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={heroImg} alt="Magic Dinner Event" className="w-full h-[420px] md:h-[560px] object-cover" />
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
          <h2 className="headline-section text-foreground mb-8">Dinner trifft Magie.</h2>
          <p className="text-body max-w-xl mb-8">
            Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und interaktiv. Ein Magic Dinner verbindet kulinarischen Genuss mit unvergesslichem Entertainment.
          </p>
          <p className="text-body max-w-xl">
            Jeder Gang wird zum Erlebnis, jeder Moment zum Gesprächsthema. Das perfekte Format für besondere Anlässe, bei denen Nähe und Exklusivität zählen.
          </p>
        </div>
      </div>
    </section>
  );
};

const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground">So läuft ein Magic Dinner ab.</h2>
        </div>
        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { title: "Empfang", desc: "Walk-Around Magie beim Ankommen — der perfekte Einstieg." },
            { title: "Erster Gang", desc: "Close-Up Magie direkt am Tisch — intime Momente." },
            { title: "Hauptgang", desc: "Die große Tischmagie — interaktiv, verblüffend, persönlich." },
            { title: "Dessert & Finale", desc: "Ein magisches Finale, das den Abend krönt." },
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

const ForWenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-8">Perfekt für.</h2>
          <div className="grid sm:grid-cols-2 gap-8 mt-16 text-left max-w-2xl mx-auto">
            {[
              { title: "Firmendinner", desc: "Beeindrucken Sie Kunden und Partner." },
              { title: "Private Feiern", desc: "Geburtstage, Jubiläen, besondere Anlässe." },
              { title: "Teamevents", desc: "Gemeinsam staunen verbindet." },
              { title: "Hochzeiten", desc: "Das Dinner als magisches Erlebnis." },
            ].map((item) => (
              <div key={item.title} className="py-4">
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

const MagicDinner = () => (
  <PageLayout>
    <HeroDinner />
    <WasIstSection />
    <AblaufSection />
    <ForWenSection />
    <ProcessSteps />
    <BookingCTA headline={"Ein Abend zum Staunen."} subline="Plane dein Magic Dinner — ich berate dich persönlich." />
  </PageLayout>
);

export default MagicDinner;
