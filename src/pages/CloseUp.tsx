import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import closeupImg from "@/assets/closeup-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import { ArrowRight, Hand, Eye, MessageCircle, Zap, Star } from "lucide-react";

const HeroCloseUp = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Showkonzept</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Magie in deinen{" "}
          <AnimatedWords words={["Händen.", "Augen.", "Momenten.", "Erlebnissen."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Keine Bühne, keine Distanz — Close-Up Magie passiert direkt vor deinen Augen,
          in deinen Händen und mitten unter deinen Gästen. Die intimste und intensivste Form der Zauberkunst.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Close-Up anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={closeupImg} alt="Close-Up Magie hautnah" className="w-full h-[400px] md:h-[560px] object-cover" />
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
          <h2 className="headline-section text-foreground mb-8">Magie zum Anfassen.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Close-Up Magie ist die älteste und zugleich modernste Form der Zauberkunst:
              direkt, persönlich und unmöglich nah.
            </p>
            <p>
              Ich komme zu deinen Gästen — an den Tisch, an die Bar, in die Runde.
              Was dann passiert, können sie nicht erklären: Karten wandern, Münzen verschwinden,
              Gedanken werden gelesen. Alles direkt vor ihren Augen, in ihren eigenen Händen.
            </p>
            <p>
              Kein Abstand, keine Technik, keine Ablenkung — nur pure Magie und die echte Reaktion,
              wenn das Unmögliche plötzlich vor einem passiert.
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
            { icon: Eye, title: "Direkt vor deinen Augen", desc: "Keine Entfernung, keine Tricks mit Spiegel — pure, echte Magie." },
            { icon: Hand, title: "Interaktiv", desc: "Jeder Gast wird Teil des Erlebnisses und hält die Magie in seinen Händen." },
            { icon: MessageCircle, title: "Gesprächsstarter", desc: "Der ultimative Icebreaker — perfekt für Empfänge und Networking." },
            { icon: Zap, title: "Überall einsetzbar", desc: "Am Tisch, an der Bar, im Stehen — Close-Up funktioniert in jeder Situation." },
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

const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`order-2 md:order-1 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Staunende Gäste bei Close-Up Magie" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`order-1 md:order-2 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <h2 className="headline-section text-foreground mb-6">Was deine Gäste erleben.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Stell dir vor: Du hältst eine Karte in der Hand. Du bist dir sicher, welche es ist.
                Und dann — ist es eine andere. Unmöglich. Aber es ist gerade passiert. In deiner Hand.
              </p>
              <p>
                Das ist der Moment, der Close-Up Magie so besonders macht: Du erlebst es nicht auf einer Bühne,
                sondern direkt, persönlich, hautnah. Und genau deshalb ist die Wirkung so stark.
              </p>
              <p>
                Deine Gäste werden den Rest des Abends darüber reden. „Hast du das gesehen?!"
                wird zum meistgesagten Satz deiner Veranstaltung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsCloseUp = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Stimmen von Gästen.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { quote: "So eine intime, verblüffende Magie habe ich noch nie erlebt. Emilian war der Gesprächsstarter des Abends!", author: "Sarah M.", role: "Eventmanagerin" },
            { quote: "Die Close-Up Magie war perfekt für unseren Empfang. Jeder Gast war sofort in bester Stimmung.", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
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

const CloseUp = () => (
  <PageLayout>
    <HeroCloseUp />
    <WasIstSection />
    <FeaturesSection />
    <ErlebnisSection />
    <TestimonialsCloseUp />
    <ProcessSteps />
    <BookingCTA headline={"Hautnah erleben."} subline="Close-Up Magie für dein Event — lass uns sprechen und das perfekte Konzept entwickeln." />
  </PageLayout>
);

export default CloseUp;
