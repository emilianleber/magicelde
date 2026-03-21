import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import { Star } from "lucide-react";

const HeroBirthday = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Zauberer für deinen Geburtstag</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Ein Geburtstag, der{" "}
          <AnimatedWords words={["bleibt.", "überrascht.", "begeistert."]} />
        </h1>
        <p className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Das Highlight, über das deine Gäste noch Wochen reden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <a href="#kontakt" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97]">
            Jetzt anfragen
          </a>
        </div>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={heroImg} alt="Zauberer auf einem Geburtstag" className="w-full h-[420px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Warum Magie?</span>
          <h2 className="headline-section text-foreground mb-8">Mehr als ein Geschenk.</h2>
          <p className="text-body max-w-xl mx-auto">
            Statt Deko und Playlist — ein Erlebnis, das alle verbindet und das Geburtstagskind zum Star macht.
          </p>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-px mt-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {[
            { word: "Überraschung", sub: "Der perfekte Wow-Moment." },
            { word: "Gesellig", sub: "Bringt jede Runde zusammen." },
            { word: "Persönlich", sub: "Magie mit dem Geburtstagskind." },
          ].map((item) => (
            <div key={item.word} className="text-center py-12 px-6">
              <h3 className="font-display text-2xl md:text-3xl italic text-foreground mb-3">{item.word}</h3>
              <p className="text-detail max-w-[200px] mx-auto">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KonzepteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const konzepte = [
    { img: closeupImg, title: "Close-Up", sub: "Direkt bei euren Gästen", desc: "Interaktive Magie für kleine bis große Runden — perfekt für den Empfang." },
    { img: stageImg, title: "Show", sub: "Das Highlight des Abends", desc: "Eine durchkomponierte Bühnenshow als krönender Moment." },
    { img: heroImg, title: "Walking Act", sub: "Frei & spontan", desc: "Magie zwischen den Gästen — der perfekte Gesprächsstarter." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Formate</span>
          <h2 className="headline-section text-foreground">Drei Erlebnisse.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {konzepte.map((k, i) => (
            <div key={k.title} className={`group relative rounded-[2rem] overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <img src={k.img} alt={k.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-2">{k.sub}</p>
                <h3 className="font-display text-3xl md:text-4xl italic text-white mb-3">{k.title}</h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed max-w-xs">{k.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Mein 30. war dank Emilian ein Abend, den keiner vergisst.", author: "Lisa R.", role: "Geburtstag in München" },
    { quote: "Die Überraschung hat perfekt funktioniert — alle waren sprachlos!", author: "Stefan K.", role: "50. Geburtstag" },
  ];
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Was Gäste sagen.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={`${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-primary/60 text-primary/60" />)}
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

const Geburtstage = () => (
  <PageLayout>
    <HeroBirthday />
    <WarumSection />
    <KonzepteSection />
    <TestimonialsSection />
    <ProcessSteps />
    <BookingCTA headline={"Mach deinen Geburtstag\nunvergesslich."} subline="Erzähl mir von deiner Feier — ich entwickle das passende Konzept." />
  </PageLayout>
);

export default Geburtstage;
