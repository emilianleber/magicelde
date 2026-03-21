import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import { ArrowRight, UtensilsCrossed, Sparkles, Wine, Users, Star } from "lucide-react";

const HeroDinner = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Spezialgebiet</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Das{" "}
          <AnimatedWords words={["Magic Dinner.", "Erlebnis.", "Highlight.", "Gourmet-Event."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Ein Abend, an dem kulinarischer Genuss und verblüffende Zauberkunst verschmelzen.
          Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und exklusiv.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Magic Dinner planen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={heroImg} alt="Magic Dinner Event" className="w-full h-[400px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

const WasIstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-accent mb-8 inline-flex">Das Konzept</span>
            <h2 className="headline-section text-foreground mb-8">Dinner trifft Magie.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ein Magic Dinner ist mehr als ein Abendessen mit Zaubershow —
                es ist ein komplett inszeniertes Erlebnis, bei dem jeder Gang zum Event wird.
              </p>
              <p>
                Zwischen den Gängen komme ich zu jedem Tisch. Die Magie passiert direkt in den Händen
                deiner Gäste — persönlich, witzig, absolut verblüffend. Jeder Tisch bekommt sein eigenes,
                einzigartiges Erlebnis.
              </p>
              <p>
                Das Besondere: Die Wartezeit zwischen den Gängen wird zum Highlight.
                Statt auf das Essen zu warten, erleben deine Gäste Momente, über die sie
                den Rest des Abends — und darüber hinaus — reden werden.
              </p>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={closeupImg} alt="Tischmagie beim Magic Dinner" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
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
          <span className="badge-accent mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So läuft ein Magic Dinner ab.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Wine, num: "01", title: "Empfang", desc: "Walk-Around Magie beim Ankommen — der perfekte Einstieg in einen besonderen Abend." },
            { icon: UtensilsCrossed, num: "02", title: "Erster Gang", desc: "Close-Up Magie direkt am Tisch — intime, persönliche Momente mit jedem Tisch." },
            { icon: Sparkles, num: "03", title: "Hauptgang", desc: "Die große Tischmagie — interaktiv, verblüffend, witzig. Der Höhepunkt des Abends." },
            { icon: Star, num: "04", title: "Finale", desc: "Ein magisches Finale, das den Abend krönt — und allen ein Lächeln ins Gesicht zaubert." },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-3xl bg-background">
              <span className="font-display text-5xl font-bold text-accent/10">{item.num}</span>
              <item.icon className="w-6 h-6 text-accent mt-2 mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
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
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Perfekt für besondere Anlässe.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { title: "Firmendinner", desc: "Beeindrucken Sie Kunden und Partner mit einem Abend, der in Erinnerung bleibt." },
            { title: "Private Feiern", desc: "Geburtstage, Jubiläen, besondere Anlässe — ein Magic Dinner macht jeden Abend einzigartig." },
            { title: "Teamevents", desc: "Gemeinsam staunen und lachen stärkt — die perfekte Alternative zum klassischen Teamevent." },
            { title: "Hochzeiten", desc: "Das Hochzeitsdinner als magisches Erlebnis — für Brautpaar und Gäste gleichermaßen." },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl bg-muted/40">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsDinner = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <blockquote>
            <div className="flex gap-0.5 justify-center mb-6">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-accent/70 text-accent/70" />)}
            </div>
            <p className="font-sans text-xl text-foreground leading-relaxed mb-8">
              „Das Magic Dinner war das Highlight unseres Firmenjubiläums. Jeder Tisch hatte seinen eigenen
              magischen Moment — und am Ende haben alle darüber geredet. Absolut empfehlenswert!"
            </p>
            <footer>
              <p className="font-sans text-base font-semibold text-foreground">Dr. Stefan R.</p>
              <p className="font-sans text-sm text-muted-foreground">Geschäftsführer, Technologie</p>
            </footer>
          </blockquote>
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
    <TestimonialsDinner />
    <ProcessSteps />
    <BookingCTA headline={"Ein Abend zum Staunen."} subline="Plane dein Magic Dinner — ich berate dich persönlich und entwickle ein Konzept, das perfekt zu eurem Anlass passt." />
  </PageLayout>
);

export default MagicDinner;
