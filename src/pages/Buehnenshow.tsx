import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import { ArrowRight, Users, Clock, Mic, Palette, Star } from "lucide-react";

const HeroStage = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Showkonzept</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Die{" "}
          <AnimatedWords words={["Bühnenshow.", "Performance.", "Inszenierung.", "Experience."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Eine durchkomponierte Show mit Dramaturgie, Comedy und Momenten, die ein ganzes Publikum gleichzeitig
          zum Staunen und Lachen bringen. Das zentrale Highlight für große Events.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Bühnenshow anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={stageImg} alt="Bühnenshow von MagicEL" className="w-full h-[400px] md:h-[560px] object-cover" />
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
          <span className="badge-accent mb-8 inline-flex">Das Konzept</span>
          <h2 className="headline-section text-foreground mb-8">Mehr als Tricks auf der Bühne.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Meine Bühnenshow ist kein Aneinanderreihen von Zaubertricks — sie ist eine durchkomponierte
              Performance mit Spannungsbogen, Comedy und emotionalen Höhepunkten.
            </p>
            <p>
              Jede Show wird individuell auf euer Event abgestimmt: Firmeninhalte, persönliche Botschaften
              oder thematische Elemente können nahtlos integriert werden. Das Ergebnis ist eine Show,
              die nicht nur unterhält, sondern Ihr Event auf ein neues Level hebt.
            </p>
            <p>
              Von 15 Minuten Highlight bis zur 60-Minuten-Galashow — flexibel skalierbar für jede
              Veranstaltungsgröße, von 30 bis 500+ Gästen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Clock, title: "15–60 Minuten", desc: "Flexibel anpassbar an euren Ablauf und Zeitplan." },
            { icon: Users, title: "Bis 500+ Gäste", desc: "Skalierbar für jede Veranstaltungsgröße." },
            { icon: Mic, title: "Eigene Technik", desc: "Professionelle Ton- und Lichttechnik auf Wunsch." },
            { icon: Palette, title: "Individuell", desc: "Inhalte auf eure Botschaft und euer Event abgestimmt." },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-3xl bg-background group">
              <item.icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-muted mb-8 inline-flex">Einsatz</span>
            <h2 className="headline-section text-foreground mb-6">Wann eine Bühnenshow passt.</h2>
            <div className="space-y-4 mt-8">
              {[
                { title: "Firmenfeiern & Galas", desc: "Als zentrales Highlight des Abendprogramms." },
                { title: "Hochzeiten", desc: "Wenn alle zusammenkommen — der perfekte Showmoment." },
                { title: "Jubiläen & Geburtstage", desc: "Die Überraschung, die alle begeistert." },
                { title: "Messen & Produktpräsentationen", desc: "Aufmerksamkeit und bleibender Eindruck garantiert." },
              ].map((item) => (
                <div key={item.title} className="py-4 border-b border-border last:border-0">
                  <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-detail mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeistertes Publikum bei einer Bühnenshow" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsStage = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Das sagen Veranstalter.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { quote: "Die Bühnenshow war das absolute Highlight unserer Firmenfeier. Standing Ovation von 300 Gästen!", author: "Thomas K.", role: "Geschäftsführer" },
            { quote: "Professionell, witzig, verblüffend — und perfekt auf unseren Anlass abgestimmt.", author: "Katrin W.", role: "Head of Events" },
          ].map((t, i) => (
            <blockquote key={i} className={`p-8 rounded-3xl bg-background ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent/70 text-accent/70" />)}
              </div>
              <p className="font-sans text-base text-foreground leading-relaxed mb-6">„{t.quote}"</p>
              <footer>
                <p className="font-sans text-sm font-semibold text-foreground">{t.author}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
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
    <FeaturesSection />
    <EinsatzSection />
    <TestimonialsStage />
    <ProcessSteps />
    <BookingCTA headline={"Die Bühne gehört dir."} subline="Lass uns über dein Event sprechen — ich entwickle eine Show, die perfekt zu eurem Anlass passt." />
  </PageLayout>
);

export default Buehnenshow;
