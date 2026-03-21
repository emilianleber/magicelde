import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { Check, X, Star, TrendingUp, Users, Briefcase, Target, ArrowRight, Building2 } from "lucide-react";

const HeroCorporate = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Business Entertainment</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Events, die{" "}
          <AnimatedWords words={["wirken.", "verbinden.", "beeindrucken.", "bleiben."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Professionelles Entertainment, das Ihr Firmenevent auf ein neues Level hebt —
          modern, interaktiv und mit einem Comedy-Faktor, der Menschen wirklich zusammenbringt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Event anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#showkonzepte" className="btn-secondary btn-large">Konzepte ansehen ↓</a>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={corporateImg} alt="Zauberer auf einer Firmenfeier" className="w-full h-[400px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

const MehrwertSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Mehrwert</span>
          <h2 className="headline-section text-foreground mb-6">Mehr als nur Unterhaltung.</h2>
          <p className="text-body max-w-xl mx-auto">
            Magie ist der unterschätzte Gamechanger für Business-Events. Sie löst die Atmosphäre,
            bringt Menschen ins Gespräch und schafft gemeinsame Erlebnisse — das kann kein DJ und kein Keynote-Speaker.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Users, title: "Networking-Booster", desc: "Magie bricht das Eis und bringt Menschen ins Gespräch — besser als jede Teambuilding-Übung." },
            { icon: TrendingUp, title: "Event-Aufwertung", desc: "Von der Firmenfeier zum Premium-Event. Entertainment, über das alle reden." },
            { icon: Target, title: "Hohe Erinnerungswirkung", desc: "Wochen später erinnern sich Ihre Gäste — nicht ans Catering, sondern an die Show." },
            { icon: Briefcase, title: "Professionell & zuverlässig", desc: "Souveräner Auftritt, pünktliche Planung, individuelle Abstimmung auf Ihr Unternehmen." },
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

const VergleichCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Nicht irgendein Programmpunkt.</h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-12 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div className="p-8 rounded-3xl bg-background border border-border/50">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/40 mb-8">Standard-Entertainment</p>
            <ul className="space-y-5">
              {["Klassisch, vorhersehbar, austauschbar", "Wenig Bezug zum Unternehmen oder Anlass", "Reine Unterhaltung ohne echten Mehrwert", "Kein Networking-Effekt für die Gäste"].map((item) => (
                <li key={item} className="flex items-start gap-3"><X className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-1" /><span className="text-detail">{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-8">MagicEL</p>
            <ul className="space-y-5">
              {["Modern, souverän und perfekt für Business-Kontexte", "Individuell auf Ihr Unternehmen und Ihre Botschaft abgestimmt", "Verbindet Entertainment mit echtem Networking-Effekt", "Professioneller Auftritt auf jedem Level — vom Teamdinner bis zur Gala"].map((item) => (
                <li key={item} className="flex items-start gap-3"><Check className="w-4 h-4 text-accent shrink-0 mt-1" /><span className="font-sans text-sm md:text-base text-foreground">{item}</span></li>
              ))}
            </ul>
          </div>
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
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground mb-6">Vielseitig einsetzbar.</h2>
        </div>
        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Building2, title: "Firmenfeiern & Jahresabschlüsse", desc: "Das Highlight, auf das sich alle freuen — und über das noch Monate gesprochen wird." },
            { icon: Target, title: "Galas & Business Events", desc: "Elegantes, modernes Entertainment auf höchstem Niveau." },
            { icon: TrendingUp, title: "Messen & Promotions", desc: "Magie, die Aufmerksamkeit erzeugt und Ihren Stand zum Magneten macht." },
            { icon: Briefcase, title: "Produktpräsentationen", desc: "Ihre Botschaft, inszeniert mit Staunen und bleibendem Eindruck." },
            { icon: Users, title: "Teamevents & Incentives", desc: "Gemeinsam staunen stärkt — der perfekte Teambuilding-Moment." },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-5 py-8">
              <item.icon className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-detail">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ShowkonzepteCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="showkonzepte" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground mb-6">Drei Formate für Ihr Event.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: closeupImg, title: "Close-Up Magie", sub: "Empfang & Networking", desc: "Direkt bei Ihren Gästen — interaktive Magie, die Gespräche entfacht und Menschen verbindet.", link: "/close-up" },
            { img: stageImg, title: "Bühnenshow", sub: "Zentrales Highlight", desc: "Strukturiert, mitreißend, unterhaltsam — eine durchkomponierte Show für den großen Moment.", link: "/buehnenshow" },
            { img: heroImg, title: "Individuelles Konzept", sub: "Maßgeschneidert", desc: "Angepasst auf Ihre Marke, Ihre Botschaft, Ihr Event — inklusive Einbindung von Firmeninhalten.", link: "/buchung" },
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

const StatsCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-medium" ref={ref}>
      <div className="container px-6">
        <div className={`flex flex-wrap justify-center gap-16 md:gap-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { value: "500+", label: "Business-Events" },
            { value: "100%", label: "Weiterempfehlung" },
            { value: "10+", label: "Jahre Erfahrung" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{stat.value}</p>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReferenzenCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Was Kunden sagen.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { quote: "Emilian hat unsere Firmenfeier auf ein neues Level gehoben. Professionell, souverän und absolut unterhaltsam.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologie" },
            { quote: "Die Mitarbeiter fragen Monate vorher, ob er wieder kommt. Das sagt alles.", author: "Michael B.", role: "HR Director, Finance" },
            { quote: "Professionell in der Planung, brillant in der Performance. Genau der richtige Stil für unsere Kunden.", author: "Katrin W.", role: "Head of Events, Automotive" },
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

const Firmenfeiern = () => (
  <PageLayout>
    <HeroCorporate />
    <MehrwertSection />
    <VergleichCorporate />
    <EinsatzSection />
    <ShowkonzepteCorporate />
    <StatsCorporate />
    <ReferenzenCorporate />
    <ProcessSteps />
    <BookingCTA headline={"Machen Sie Ihr Event\nunvergesslich."} subline="Individuelle Konzepte, professionelle Umsetzung. Lassen Sie uns über Ihr nächstes Event sprechen." />
  </PageLayout>
);

export default Firmenfeiern;
