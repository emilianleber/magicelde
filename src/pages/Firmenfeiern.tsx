import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Briefcase, Users, MessageCircle, TrendingUp, X, Check, Star, Building2, Award, Presentation, Handshake, Target, Mic, Sparkles, ShieldCheck, Clock } from "lucide-react";

/* ─── Hero ─── */
const HeroCorporate = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={corporateImg} alt="Zauberer auf einer Firmenfeier" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30" />
    </div>
    <div className="relative z-10 container text-center px-6 pt-32 pb-24">
      <p
        className="text-sm font-sans font-medium tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-up"
        style={{ color: "hsl(var(--gold))", animationDelay: "0.2s" }}
      >
        Entertainment für Unternehmen
      </p>
      <h1
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8 opacity-0 animate-fade-up"
        style={{ color: "hsl(var(--primary-foreground))", animationDelay: "0.4s" }}
      >
        Magie für Firmenfeiern,
        <br />
        die im Kopf bleiben.
      </h1>
      <p
        className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up"
        style={{ color: "hsl(var(--section-dark-foreground))", animationDelay: "0.6s" }}
      >
        Professionelles Entertainment, das Ihre Gäste verbindet, Gespräche entfacht
        und Ihr Event auf ein neues Level hebt.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary font-sans font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_8px_32px_hsla(0,97%,27%,0.4)] active:scale-[0.97]"
        >
          Event anfragen
        </a>
        <a
          href="#showkonzepte"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg glass font-sans font-semibold transition-all duration-200 hover:bg-[hsla(0,0%,100%,0.15)] active:scale-[0.97]"
          style={{ color: "hsl(var(--section-dark-foreground))" }}
        >
          Konzepte ansehen
        </a>
      </div>
    </div>
  </section>
);

/* ─── Warum Zauberei für Firmenfeiern ─── */
const WarumCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  const reasons = [
    { icon: Users, title: "Networking-Booster", desc: "Magie bringt Menschen ins Gespräch — der perfekte Eisbrecher zwischen Kollegen, Kunden und Geschäftspartnern." },
    { icon: TrendingUp, title: "Hebt Ihr Event ab", desc: "Kein Standard-Programm, sondern ein Erlebnis, das Ihr Event von gewöhnlichen Veranstaltungen unterscheidet." },
    { icon: MessageCircle, title: "Gemeinsame Erlebnisse", desc: "Geteiltes Staunen verbindet — Ihre Gäste erleben etwas zusammen, worüber sie noch lange sprechen." },
    { icon: Sparkles, title: "Atmosphäre auflockern", desc: "Magie löst die steife Business-Atmosphäre und schafft eine entspannte, positive Stimmung." },
  ];

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Warum Magie?</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Warum Zauberei Ihr Firmenevent aufwertet
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`flex items-start gap-5 rounded-xl border border-border p-7 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.06)] transition-all duration-300 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Vergleich ─── */
const VergleichCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  const andere = [
    "Klassisch & vorhersehbar",
    "Wenig Bezug zum Unternehmen",
    "Standardprogramm von der Stange",
    "Reine Unterhaltung ohne Mehrwert",
    "Unpassender Auftritt im Business-Kontext",
  ];
  const magicel = [
    "Modern, stilvoll & souverän",
    "Individuell auf Ihr Unternehmen abgestimmt",
    "Interaktiv & kommunikativ",
    "Verbindet Entertainment mit echtem Networking",
    "Professioneller Auftritt auf jedem Level",
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Der Unterschied</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Nicht irgendein Zauberer
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-6 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-6">Andere Zauberer</p>
            <ul className="space-y-4">
              {andere.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-[0_8px_32px_hsla(0,97%,27%,0.08)]">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-primary mb-6">MagicEL</p>
            <ul className="space-y-4">
              {magicel.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Einsatzmöglichkeiten ─── */
const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const einsaetze = [
    { icon: Building2, title: "Firmenfeiern & Jahresabschlüsse", desc: "Verwandeln Sie Ihre Feier in ein Event, über das alle sprechen — professionelles Entertainment, das verbindet." },
    { icon: Award, title: "Galas & Business Events", desc: "Elegante Close-Up-Magie oder eine mitreißende Bühnenshow — passend zum Anlass und Ihrem Anspruch." },
    { icon: Presentation, title: "Messen & Promotions", desc: "Ziehen Sie Besucher an Ihren Stand — Magie als Aufmerksamkeits-Magnet, der Gespräche eröffnet." },
    { icon: Target, title: "Produktpräsentationen", desc: "Einbindung Ihrer Botschaft in die Performance — Ihr Produkt wird Teil des Erlebnisses." },
    { icon: Handshake, title: "Teamevents & Incentives", desc: "Gemeinsam staunen, lachen, erleben — Magie stärkt den Teamgeist auf ungewöhnliche Art." },
  ];

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Einsatzbereiche</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Vielseitig einsetzbar, immer wirkungsvoll
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {einsaetze.map((item, i) => (
            <div
              key={item.title}
              className={`group flex items-start gap-5 rounded-xl border border-border p-6 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.06)] transition-all duration-300 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Showkonzepte ─── */
const ShowkonzepteCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  const konzepte = [
    {
      icon: Handshake,
      title: "Close-Up Magic",
      subtitle: "Empfang & Networking",
      desc: "Direkt bei Ihren Gästen, an Tischen oder beim Stehempfang. Interaktive Magie, die Gespräche entfacht und Menschen verbindet.",
      highlights: ["Perfekt für Empfänge & Networking", "Interaktiv & persönlich", "Lockert die Atmosphäre sofort"],
    },
    {
      icon: Mic,
      title: "Bühnenshow",
      subtitle: "Zentraler Programmpunkt",
      desc: "Eine strukturierte, mitreißende Show für größere Gruppen — als Highlight des Abends, das alle gemeinsam erleben.",
      highlights: ["Für Gruppen jeder Größe", "Professionell moderiert", "Beeindruckend & unterhaltsam"],
    },
    {
      icon: Target,
      title: "Individuelle Konzepte",
      subtitle: "Maßgeschneidert für Ihr Event",
      desc: "Angepasst auf Ihre Marke, Ihre Botschaft oder Ihr Produkt — Magie wird zum Teil Ihrer Unternehmenskommunikation.",
      highlights: ["Einbindung von Firmeninhalten", "Anpassung an Marke & Botschaft", "Einzigartige Erlebnisse"],
    },
  ];

  return (
    <section id="showkonzepte" className="py-24 md:py-32 section-dark" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>Showkonzepte</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight" style={{ color: "hsl(var(--section-dark-foreground))" }}>
            Das richtige Format für Ihr Event
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {konzepte.map((k, i) => (
            <div
              key={k.title}
              className={`rounded-2xl glass p-8 flex flex-col ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5">
                <k.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-1" style={{ color: "hsl(var(--section-dark-foreground))" }}>{k.title}</h3>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] mb-4" style={{ color: "hsl(var(--gold))" }}>{k.subtitle}</p>
              <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: "hsla(0,0%,100%,0.6)" }}>{k.desc}</p>
              <ul className="space-y-3 mt-auto">
                {k.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm" style={{ color: "hsla(0,0%,100%,0.75)" }}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Mehrwert für Unternehmen ─── */
const MehrwertSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const benefits = [
    { icon: MessageCircle, title: "Stärkt Kommunikation", desc: "Magie öffnet Gespräche zwischen Menschen, die sich sonst nie unterhalten würden." },
    { icon: Sparkles, title: "Emotionale Markenbindung", desc: "Ihr Event wird zum emotionalen Erlebnis — positive Assoziationen mit Ihrer Marke inklusive." },
    { icon: TrendingUp, title: "Hohe Erinnerungswirkung", desc: "Ihre Gäste erinnern sich an das, was sie erlebt haben — nicht an das, was sie gesehen haben." },
    { icon: ShieldCheck, title: "Professionelle Planung", desc: "Zuverlässige Abstimmung, pünktlicher Auftritt, reibungsloser Ablauf — Sie können sich auf Ihr Event konzentrieren." },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Ihr Vorteil</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Mehr als Unterhaltung
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`rounded-xl bg-card border border-border p-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Über mich (Business) ─── */
const UeberMichBusiness = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-2xl overflow-hidden shadow-[0_16px_64px_hsla(0,0%,0%,0.12)]">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-auto object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-primary/10 -z-10" />
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Ihr Performer</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Professionell, modern, souverän.
            </h2>
            <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed max-w-lg">
              <p>
                Als Finalist bei <span className="font-semibold text-foreground">Talents of Magic</span> und
                mit Erfahrung auf hunderten Business-Events weiß ich, worauf es ankommt:
                souveräner Auftritt, individuelle Abstimmung und ein Erlebnis, das Ihre Gäste begeistert.
              </p>
              <p>
                Kein Klischee-Zauberer, sondern ein moderner Performer, der sich in jedem
                Unternehmenskontext sicher bewegt — vom intimen Dinner bis zur großen Gala.
              </p>
            </div>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center mt-8 px-7 py-3.5 rounded-lg bg-primary font-sans text-sm font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_4px_16px_hsla(0,97%,27%,0.35)] active:scale-[0.97]"
            >
              Gespräch vereinbaren
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Referenzen / Testimonials ─── */
const ReferenzenCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Emilian hat unsere Firmenfeier auf ein neues Level gehoben. Die Gäste waren begeistert — und das Networking lief wie von selbst.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologiebranche" },
    { quote: "Professionell, zuverlässig und unglaublich unterhaltsam. Die perfekte Wahl für unser Kundenevent.", author: "Katrin W.", role: "Head of Events, Automobilbranche" },
    { quote: "Wir buchen Emilian regelmäßig für unsere Jahresabschlussfeier. Die Mitarbeiter fragen schon Monate vorher, ob er wieder kommt.", author: "Michael B.", role: "HR Director, Finanzdienstleistung" },
  ];

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Referenzen</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Was Firmenkunden sagen
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`rounded-xl border border-border bg-card p-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
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

/* ─── Galerie ─── */
const GalerieCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    { src: corporateImg, alt: "Zauberer auf einem Corporate Event", className: "col-span-2 row-span-2" },
    { src: audienceImg, alt: "Begeistertes Business-Publikum", className: "col-span-1 row-span-1" },
    { src: closeupImg, alt: "Close-Up Magie beim Empfang", className: "col-span-1 row-span-1" },
    { src: stageImg, alt: "Bühnenshow bei einer Gala", className: "col-span-1 row-span-1" },
    { src: heroImg, alt: "Live-Performance", className: "col-span-1 row-span-1" },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Eindrücke</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Business-Events mit Wow-Effekt
          </h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {images.map((img, i) => (
            <div key={i} className={`${img.className} rounded-xl overflow-hidden`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA ─── */
const CTACorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="kontakt" className="relative py-32 md:py-40 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <img src={corporateImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/60" />
      </div>
      <div className="relative z-10 container px-6 text-center">
        <div className={`max-w-2xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--section-dark-foreground))" }}>
            Machen Sie Ihr Event unvergesslich.
          </h2>
          <p className="font-sans text-lg md:text-xl mb-4" style={{ color: "hsla(0,0%,100%,0.7)" }}>
            Individuelle Konzepte, professionelle Umsetzung — lassen Sie uns über Ihr Event sprechen.
          </p>
          <p className="font-sans text-sm mb-10" style={{ color: "hsla(0,0%,100%,0.5)" }}>
            Unverbindlich & kostenlos. Ich melde mich innerhalb von 24 Stunden.
          </p>
          <a
            href="mailto:kontakt@magicel.de"
            className="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-primary font-sans text-lg font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_12px_48px_hsla(0,97%,27%,0.5)] active:scale-[0.97]"
          >
            Jetzt unverbindlich anfragen
          </a>
        </div>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const Firmenfeiern = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroCorporate />
        <WarumCorporate />
        <VergleichCorporate />
        <EinsatzSection />
        <ShowkonzepteCorporate />
        <MehrwertSection />
        <UeberMichBusiness />
        <ReferenzenCorporate />
        <GalerieCorporate />
        <CTACorporate />
      </main>
      <Footer />
    </>
  );
};

export default Firmenfeiern;
