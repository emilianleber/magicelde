import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import { Star, PartyPopper, Gift, Users, Music, ArrowRight } from "lucide-react";

const HeroBirthday = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Zauberer für deinen Geburtstag</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Ein Geburtstag, der{" "}
          <AnimatedWords words={["bleibt.", "überrascht.", "begeistert.", "verbindet."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Stell dir vor, das Geburtstagskind steht im Mittelpunkt einer verblüffenden Show —
          und alle Gäste reden noch Wochen später darüber. Das ist mein Versprechen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Jetzt anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={heroImg} alt="Zauberer auf einer Geburtstagsfeier" className="w-full h-[400px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Warum Magie?</span>
          <h2 className="headline-section text-foreground mb-6">Mehr als ein Geschenk.</h2>
          <p className="text-body max-w-xl mx-auto">
            Ein Zauberer auf dem Geburtstag ist nicht einfach nur Unterhaltung — es ist DAS Erlebnis,
            das die Feier von einem netten Abend zu einem unvergesslichen Event macht.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Gift, title: "Die beste Überraschung", desc: "Der Wow-Moment, den niemand erwartet hat — aber alle für immer in Erinnerung behalten." },
            { icon: Users, title: "Bringt alle zusammen", desc: "Jung und Alt, beste Freunde und Bekannte — Magie verbindet jeden am Tisch." },
            { icon: PartyPopper, title: "Star des Abends", desc: "Das Geburtstagskind steht im Mittelpunkt — als Teil einer persönlichen Show." },
            { icon: Music, title: "Kein Leerlauf", desc: "Perfekt für die Momente zwischen Essen, Reden und Tanzen — immer Unterhaltung." },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-3xl bg-muted/40 hover:bg-muted/60 transition-all duration-300 group">
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

const KonzepteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Formate</span>
          <h2 className="headline-section text-foreground mb-6">Drei Erlebnisse für deine Feier.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: closeupImg, title: "Close-Up Magie", sub: "Direkt bei deinen Gästen", desc: "Interaktive Magie für kleine und große Runden — perfekt als Eisbrecher und Unterhaltung zwischen den Programmpunkten.", link: "/close-up" },
            { img: stageImg, title: "Bühnenshow", sub: "Das Highlight des Abends", desc: "Eine durchkomponierte Show mit Comedy und Staunen — der krönende Moment deiner Feier.", link: "/buehnenshow" },
            { img: heroImg, title: "Walking Act", sub: "Frei & spontan", desc: "Magie zwischen den Gästen — locker, witzig und der perfekte Gesprächsstarter für jede Party.", link: "/buchung" },
          ].map((k, i) => (
            <Link to={k.link} key={k.title} className={`group relative rounded-3xl overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <img src={k.img} alt={k.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-background/50 mb-3">{k.sub}</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-3">{k.title}</h3>
                <p className="font-sans text-sm text-background/70 leading-relaxed max-w-xs">{k.desc}</p>
              </div>
            </Link>
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
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-primary mb-8 inline-flex">Das Erlebnis</span>
            <h2 className="headline-section text-foreground mb-6">Was deine Gäste erleben.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Es geht nicht um Tricks. Es geht um den Moment, in dem alle gleichzeitig lachen und staunen.
              </p>
              <p>
                Stell dir vor: Deine beste Freundin hält eine Karte in der Hand — und plötzlich ist sie in der Tasche
                deines Onkels. Der ganze Tisch lacht. Fremde Gäste kommen ins Gespräch. Das Geburtstagskind strahlt.
              </p>
              <p>
                Das ist Comedy-Magie: nicht mysteriös und dunkel, sondern witzig, warm und verbindend.
                Genau das, was eine richtig gute Feier braucht.
              </p>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeisterte Gäste auf einer Geburtstagsfeier" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Was Gäste sagen.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { quote: "Mein 30. war dank Emilian ein Abend, den keiner vergisst. Alle reden heute noch davon — und fragen, ob er zum nächsten Geburtstag auch kommt!", author: "Lisa R.", role: "30. Geburtstag in München" },
            { quote: "Die Überraschung hat perfekt funktioniert — alle waren komplett sprachlos! Modern, witzig, absolut verblüffend.", author: "Stefan K.", role: "50. Geburtstag" },
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

const Geburtstage = () => (
  <PageLayout>
    <HeroBirthday />
    <WarumSection />
    <KonzepteSection />
    <ErlebnisSection />
    <TestimonialsSection />
    <ProcessSteps />
    <BookingCTA headline={"Mach deinen Geburtstag\nunvergesslich."} subline="Erzähl mir von deiner Feier — ich entwickle das passende Konzept aus Comedy, Magie und Interaktion." />
  </PageLayout>
);

export default Geburtstage;
