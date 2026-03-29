import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { Check, X, Star, TrendingUp, Users, Briefcase, Target, ArrowRight, Building2, Shield, Lightbulb, MessageCircle, Award, Zap, Sparkles } from "lucide-react";

/* 1. Hero */
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
          Über 200 Firmenauftritte für DAX-Konzerne, Mittelständler und innovative Startups.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Event anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#showkonzepte" className="btn-secondary btn-large">Konzepte ansehen ↓</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <VideoHero posterSrc={corporateImg} alt="Zauberer auf einer Firmenfeier" />
      </div>
    </div>
  </section>
);

/* 2. Warum Magie für Firmen */
const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Das Problem</span>
          <h2 className="headline-section text-foreground mb-8">Die Wahrheit über Firmenevents.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Hand aufs Herz: Die meisten Firmenevents sind austauschbar. Nettes Essen, ein DJ, vielleicht ein Redner.
              Am nächsten Tag hat es jeder vergessen.
            </p>
            <p>
              Der Grund? Es fehlt ein gemeinsames Erlebnis — etwas, das alle Gäste gleichzeitig berührt,
              zum Lachen bringt und miteinander verbindet. Etwas, das Hierarchien auflöst und echte Gespräche auslöst.
            </p>
            <p>
              Genau das leistet professionelle Comedy-Magie. Sie ist nicht nur Unterhaltung — sie ist ein strategisches Tool
              für bessere Events, stärkere Teams und bleibende Eindrücke bei Kunden und Partnern.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 3. Typische Probleme */
const ProblemeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Kennen Sie das?</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            "Gäste bleiben in ihren Grüppchen — kein echtes Networking",
            "Das Programm wird als ‚ganz nett' empfunden, aber nicht als Highlight",
            "Mitarbeiter aus verschiedenen Abteilungen kommen nicht ins Gespräch",
            "Die Weihnachtsfeier fühlt sich jedes Jahr gleich an",
            "Kunden-Events bleiben ohne bleibenden Eindruck",
            "Es fehlt der ‚Wow-Moment', über den alle reden",
          ].map((problem) => (
            <div key={problem} className="p-6 rounded-3xl bg-background flex items-start gap-3">
              <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-foreground">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 4. Lösung */
const LoesungSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-accent mb-8 inline-flex">Die Lösung</span>
            <h2 className="headline-section text-foreground mb-6">Entertainment mit echtem Mehrwert.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Magie ist der unterschätzte Gamechanger für Business-Events.
              </p>
              <p>
                Stellen Sie sich vor: Ihre Gäste stehen beim Empfang, ein Zauberer kommt an die Gruppe,
                und innerhalb von 30 Sekunden lachen alle zusammen, staunen und reden miteinander.
                Hierarchien verschwinden, Grüppchen lösen sich auf, Gespräche entstehen.
              </p>
              <p>
                Das ist kein Zufall — das ist professionelle Comedy-Magie, strategisch eingesetzt
                für maximale Wirkung. Und genau das ist mein Ansatz bei jedem Business-Event.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { icon: Users, label: "Networking-Booster" },
                { icon: TrendingUp, label: "Event-Aufwertung" },
                { icon: Target, label: "Hohe Erinnerung" },
                { icon: Briefcase, label: "Professionell" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="font-display text-sm font-bold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeisterte Mitarbeiter auf einem Firmenevent" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 5. Einsatzbereiche Slider */
const EinsatzSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  const bereiche = [
    { title: "Firmenfeiern & Jahresabschlüsse", desc: "Das Highlight, auf das sich alle freuen — und über das noch Monate gesprochen wird. Perfekt als zentraler Programmpunkt oder als begleitendes Entertainment.", icon: Building2 },
    { title: "Galas & Awards", desc: "Elegantes Entertainment auf höchstem Niveau. Ich passe mich dem Dresscode und dem Ton Ihrer Veranstaltung perfekt an.", icon: Award },
    { title: "Messen & Promotions", desc: "Magie, die Aufmerksamkeit erzeugt und Ihren Stand zum Magneten macht. Nachweislich höhere Verweildauer bei Besuchern.", icon: Target },
    { title: "Produktpräsentationen", desc: "Ihre Botschaft, inszeniert mit Staunen und bleibendem Eindruck. Magie kann Produkte auf eine Art präsentieren, die im Gedächtnis bleibt.", icon: Lightbulb },
    { title: "Teamevents & Incentives", desc: "Gemeinsam staunen stärkt — der perfekte Teambuilding-Moment, der Abteilungsgrenzen überwindet.", icon: Users },
    { title: "Weihnachtsfeiern", desc: "Die Weihnachtsfeier, die endlich anders ist als alle anderen. Modernes Entertainment statt Standardprogramm.", icon: Sparkles },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground mb-6">Vielseitig einsetzbar.</h2>
        </div>
        <HorizontalSlider
          items={bereiche.map((b) => ({
            content: (
              <div className="p-8 rounded-3xl bg-background h-full">
                <b.icon className="w-8 h-8 text-accent mb-5" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{b.title}</h3>
                <p className="text-detail">{b.desc}</p>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
};

/* 6. Showformate */
const ShowkonzepteCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="showkonzepte" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground mb-6">Drei Formate für Ihr Event.</h2>
          <p className="text-body max-w-xl mx-auto">Jedes Format wird individuell auf Ihren Anlass, Ihr Publikum und Ihre Ziele abgestimmt.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: closeupImg, title: "Close-Up Magie", sub: "Empfang & Networking", desc: "Direkt bei Ihren Gästen — interaktive Magie, die Gespräche entfacht und Menschen verbindet. Der ultimative Networking-Booster für jeden Empfang.", link: "/close-up" },
            { img: stageImg, title: "Bühnenshow", sub: "Zentrales Highlight", desc: "Strukturiert, mitreißend, unterhaltsam — eine durchkomponierte Show für den großen Moment. 15–60 Minuten, skalierbar für jede Eventgröße.", link: "/buehnenshow" },
            { img: heroImg, title: "Individuelles Konzept", sub: "Maßgeschneidert", desc: "Angepasst auf Ihre Marke, Ihre Botschaft, Ihr Event — inklusive Einbindung von Firmeninhalten und Corporate Messages.", link: "/buchung" },
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

/* 7. Ablauf */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So läuft ein Firmenevent ab.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { num: "01", title: "Briefing", desc: "Wir besprechen Ihr Event: Anlass, Ziele, Gästestruktur, Ablauf. Ich höre zu und berate." },
            { num: "02", title: "Konzept", desc: "Sie erhalten ein maßgeschneidertes Angebot mit klarem Konzept — transparent und professionell." },
            { num: "03", title: "Vorbereitung", desc: "Ich stimme mich mit Ihrem Team ab, passe die Show an und kümmere mich um alle Details." },
            { num: "04", title: "Performance", desc: "Am Event-Tag bin ich pünktlich vor Ort und sorge für das Entertainment-Highlight Ihres Events." },
          ].map((s) => (
            <div key={s.num} className="p-6 rounded-3xl bg-background">
              <span className="font-display text-5xl font-bold text-accent/10">{s.num}</span>
              <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-3">{s.title}</h3>
              <p className="text-detail text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 8. Mehrwert für Unternehmen */
const MehrwertSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Mehrwert</span>
          <h2 className="headline-section text-foreground mb-6">Mehr als nur Unterhaltung.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Users, title: "Stärkt Kommunikation", desc: "Magie löst Hierarchien auf und bringt Menschen aus verschiedenen Abteilungen ins Gespräch — besser als jedes Teambuilding-Konzept." },
            { icon: TrendingUp, title: "Wertet Events spürbar auf", desc: "Ihre Veranstaltung wird vom netten Abend zum Premium-Event, über das alle reden." },
            { icon: Target, title: "Hohe Erinnerungswirkung", desc: "Erlebnisse mit Emotionen bleiben 3x länger im Gedächtnis. Ihre Gäste erinnern sich an IHR Event." },
            { icon: MessageCircle, title: "Networking-Effekt", desc: "Magie ist der perfekte Gesprächsstarter — Ihre Gäste kommen sofort ins Gespräch." },
            { icon: Shield, title: "Zuverlässige Planung", desc: "Professionelle Abwicklung, pünktlich, souverän. Kein Stress für Ihr Organisationsteam." },
            { icon: Zap, title: "Emotionale Markenbindung", desc: "Kunden und Partner verbinden positive Emotionen mit Ihrem Unternehmen — unbezahlbar." },
          ].map((item) => (
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

/* 9. Referenzen Slider */
const ReferenzenSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Emilian hat unsere Firmenfeier auf ein neues Level gehoben. Professionell, souverän und absolut unterhaltsam.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologie" },
    { quote: "Die Mitarbeiter fragen Monate vorher, ob er wieder kommt. Das sagt alles.", author: "Michael B.", role: "HR Director, Finance" },
    { quote: "Professionell in der Planung, brillant in der Performance. Genau der richtige Stil für unsere Kunden.", author: "Katrin W.", role: "Head of Events, Automotive" },
    { quote: "Standing Ovation von 300 Gästen bei unserer Gala. Das Entertainment-Highlight des Abends.", author: "Thomas K.", role: "Vorstand, Industrieunternehmen" },
    { quote: "Endlich ein Entertainer, der professionell genug für unsere Kunden-Events ist. Klare Empfehlung.", author: "Sandra M.", role: "Marketing Direktorin, Pharma" },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Was Kunden sagen.</h2>
        </div>
        <HorizontalSlider
          items={testimonials.map((t) => ({
            content: (
              <blockquote className="p-8 rounded-3xl bg-background h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent/70 text-accent/70" />)}
                </div>
                <p className="font-sans text-base text-foreground leading-relaxed mb-6 flex-1">„{t.quote}"</p>
                <footer>
                  <p className="font-sans text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            ),
          }))}
        />
      </div>
    </section>
  );
};

/* 10. Case Studies */
const CaseStudies = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Beispiele</span>
          <h2 className="headline-section text-foreground mb-6">So setze ich Events um.</h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { title: "Weihnachtsfeier — 250 Gäste", industry: "DAX-Konzern, Automotive", format: "Close-Up + Bühnenshow", result: "Standing Ovation, jährliche Wiederbuchung seit 3 Jahren" },
            { title: "Kundenevent — 80 Gäste", industry: "Finanzdienstleister", format: "Close-Up beim Dinner", result: "100% der Kunden erinnern sich an das Event — gemessen durch Follow-Up-Befragung" },
            { title: "Produktlaunch — 150 Gäste", industry: "Tech-Startup", format: "Individuelle Show mit Produktintegration", result: "Produkt-Botschaft wurde Teil der Show — virale Social Media Momente" },
            { title: "Teambuilding — 60 Mitarbeiter", industry: "Mittelstand, Maschinenbau", format: "Interaktive Close-Up Session", result: "Abteilungsübergreifende Gespräche, die vorher nie stattfanden" },
          ].map((c) => (
            <div key={c.title} className="p-8 rounded-3xl bg-muted/40">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{c.title}</h3>
              <p className="font-sans text-xs text-muted-foreground mb-4">{c.industry}</p>
              <div className="space-y-2 text-detail text-sm">
                <p><strong className="text-foreground">Format:</strong> {c.format}</p>
                <p><strong className="text-foreground">Ergebnis:</strong> {c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 11. Vergleich */
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
              {["Klassisch, vorhersehbar, austauschbar", "Wenig Bezug zum Unternehmen", "Reine Unterhaltung ohne Mehrwert", "Kein Networking-Effekt"].map((item) => (
                <li key={item} className="flex items-start gap-3"><X className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-1" /><span className="text-detail">{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-8">MagicEL</p>
            <ul className="space-y-5">
              {["Modern, souverän und perfekt für Business", "Individuell auf Ihr Unternehmen abgestimmt", "Entertainment mit echtem Networking-Effekt", "Professionell auf jedem Level"].map((item) => (
                <li key={item} className="flex items-start gap-3"><Check className="w-4 h-4 text-accent shrink-0 mt-1" /><span className="font-sans text-sm md:text-base text-foreground">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 12. Stats */
const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const StatsCorporate = () => (
  <section className="section-medium">
    <div className="container px-6">
      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        <StatItem end={200} suffix="+" label="Firmenauftritte" />
        <StatItem end={100} suffix="%" label="Weiterempfehlung" />
        <StatItem end={10} suffix="+" label="Jahre Erfahrung" />
        <StatItem end={50} suffix="+" label="Branchen" />
      </div>
    </div>
  </section>
);

/* 13. FAQ für Entscheider */
const FAQEntscheider = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: "Wie viel Budget sollten wir einplanen?", a: "Die Investition hängt von Format, Dauer und Umfang ab. Ich erstelle Ihnen nach einem kurzen Briefing ein transparentes, individuelles Angebot — komplett unverbindlich." },
    { q: "Können Sie sich an unsere Corporate Identity anpassen?", a: "Absolut. Ich stimme mich auf Ihre Marke, Ihre Botschaft und den Ton Ihres Events ab. Auch die Integration von Firmeninhalten in die Show ist möglich." },
    { q: "Wie planen wir das am besten in unseren Ablauf ein?", a: "Ich berate Sie persönlich zum optimalen Timing und Format. Close-Up eignet sich perfekt für Empfang und Networking, die Bühnenshow als zentrales Highlight." },
    { q: "Können wir Sie vorab kennenlernen?", a: "Selbstverständlich — ein persönliches Kennenlerngespräch per Video oder Telefon ist Teil meines Services." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="badge-muted mb-8 inline-flex">FAQ</span>
            <h2 className="headline-section text-foreground mb-6">Fragen von Entscheidern.</h2>
          </div>
          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer font-sans text-base md:text-lg font-medium text-foreground pr-8 hover:text-accent transition-colors list-none">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-300 text-xl">+</span>
                </summary>
                <p className="text-detail max-w-2xl mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 14. Über mich kurz */
const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-accent mb-8 inline-flex">Ihr Entertainer</span>
            <h2 className="headline-sub text-foreground mb-6">Emilian Leber.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Moderner Comedy-Zauberer mit über 500 Events Erfahrung — von der intimen Dinner-Runde
                bis zur Gala mit 500+ Gästen.
              </p>
              <p>
                Mein Stil: souverän, humorvoll, professionell. Ich passe mich an jedes Publikum an
                und sorge dafür, dass Ihr Event das Entertainment-Highlight bekommt, das es verdient.
              </p>
            </div>
            <Link to="/ueber-mich" className="btn-secondary mt-8 group">
              Mehr erfahren <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Firmenfeiern = () => (
  <PageLayout>
    <HeroCorporate />
    <WarumSection />
    <ProblemeSection />
    <LoesungSection />
    <EinsatzSlider />
    <ShowkonzepteCorporate />
    <AblaufSection />
    <MehrwertSection />
    <ReferenzenSlider />
    <CaseStudies />
    <VergleichCorporate />
    <StatsCorporate />
    <FAQEntscheider />
    <UeberMichKurz />
    <BookingCTA headline={"Machen Sie Ihr Event\nunvergesslich."} subline="Individuelle Konzepte, professionelle Umsetzung. Lassen Sie uns über Ihr nächstes Event sprechen." />
  </PageLayout>
);

export default Firmenfeiern;
