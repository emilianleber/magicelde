import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { Users, MessageCircle, TrendingUp, X, Check, Star, Building2, Award, Presentation, Handshake, Target, Mic, Sparkles, ShieldCheck } from "lucide-react";

/* ─── Hero ─── */
const HeroCorporate = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
    <div className="container px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <span className="badge-gradient mb-6 inline-flex">Entertainment für Unternehmen</span>
        </div>
        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic leading-[1.05] mb-6 opacity-0 animate-fade-up text-foreground"
          style={{ animationDelay: "0.4s" }}
        >
          Magie für Firmenfeiern,
          <br />
          <AnimatedWords words={["die im Kopf bleiben.", "die verbinden.", "die beeindrucken.", "die wirken."]} />
        </h1>
        <p
          className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up text-muted-foreground font-light"
          style={{ animationDelay: "0.6s" }}
        >
          Professionelles Entertainment, das Ihre Gäste verbindet, Gespräche entfacht
          und Ihr Event auf ein neues Level hebt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          <a href="#kontakt" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/85 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.15)] active:scale-[0.97]">
            Event anfragen →
          </a>
          <a href="#showkonzepte" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border font-sans text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.97]">
            Konzepte ansehen →
          </a>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto opacity-0 animate-fade-up shadow-[0_24px_80px_hsla(0,0%,0%,0.1)]" style={{ animationDelay: "1s" }}>
        <img src={corporateImg} alt="Zauberer auf einer Firmenfeier" className="w-full h-[400px] md:h-[520px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
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
    <section className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Warum Magie?</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Warum Zauberei Ihr Firmenevent aufwertet
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`flex items-start gap-5 rounded-3xl bg-muted/50 p-8 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.06)] transition-all duration-500 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-white flex items-center justify-center shadow-[0_2px_8px_hsla(0,0%,0%,0.06)]">
                <r.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg italic text-foreground mb-1">{r.title}</h3>
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
    <section className="py-28 md:py-36 section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Der Unterschied</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Nicht irgendein Zauberer
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-6 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div className="rounded-3xl bg-white p-8 shadow-[0_2px_12px_hsla(0,0%,0%,0.04)]">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-6">Andere Zauberer</p>
            <ul className="space-y-4">
              {andere.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground/40 shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-[0_2px_12px_hsla(0,0%,0%,0.04)] ring-2 ring-primary/10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-6">MagicEL</p>
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
    { icon: Building2, title: "Firmenfeiern & Jahresabschlüsse", desc: "Verwandeln Sie Ihre Feier in ein Event, über das alle sprechen." },
    { icon: Award, title: "Galas & Business Events", desc: "Elegante Close-Up-Magie oder eine mitreißende Bühnenshow." },
    { icon: Presentation, title: "Messen & Promotions", desc: "Ziehen Sie Besucher an Ihren Stand — Magie als Aufmerksamkeits-Magnet." },
    { icon: Target, title: "Produktpräsentationen", desc: "Einbindung Ihrer Botschaft in die Performance." },
    { icon: Handshake, title: "Teamevents & Incentives", desc: "Gemeinsam staunen, lachen, erleben — Magie stärkt den Teamgeist." },
  ];

  return (
    <section className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Einsatzbereiche</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Vielseitig einsetzbar, immer wirkungsvoll
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {einsaetze.map((item, i) => (
            <div
              key={item.title}
              className={`group rounded-3xl bg-muted/50 p-8 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.06)] transition-all duration-500 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-white flex items-center justify-center shadow-[0_2px_8px_hsla(0,0%,0%,0.06)] mb-5 group-hover:scale-[1.05] transition-transform">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-lg italic text-foreground mb-2">{item.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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
      desc: "Direkt bei Ihren Gästen, an Tischen oder beim Stehempfang. Interaktive Magie, die Gespräche entfacht.",
      highlights: ["Perfekt für Empfänge & Networking", "Interaktiv & persönlich", "Lockert die Atmosphäre sofort"],
    },
    {
      icon: Mic,
      title: "Bühnenshow",
      subtitle: "Zentraler Programmpunkt",
      desc: "Eine strukturierte, mitreißende Show für größere Gruppen — als Highlight des Abends.",
      highlights: ["Für Gruppen jeder Größe", "Professionell moderiert", "Beeindruckend & unterhaltsam"],
    },
    {
      icon: Target,
      title: "Individuelle Konzepte",
      subtitle: "Maßgeschneidert für Ihr Event",
      desc: "Angepasst auf Ihre Marke, Ihre Botschaft oder Ihr Produkt.",
      highlights: ["Einbindung von Firmeninhalten", "Anpassung an Marke & Botschaft", "Einzigartige Erlebnisse"],
    },
  ];

  return (
    <section id="showkonzepte" className="py-28 md:py-36 section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Showkonzepte</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Das richtige Format für Ihr Event
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {konzepte.map((k, i) => (
            <div
              key={k.title}
              className={`rounded-3xl bg-white p-8 flex flex-col shadow-[0_2px_12px_hsla(0,0%,0%,0.04)] hover:shadow-[0_12px_48px_hsla(0,0%,0%,0.08)] transition-all duration-500 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center mb-5">
                <k.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl italic text-foreground mb-1">{k.title}</h3>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-accent mb-4">{k.subtitle}</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{k.desc}</p>
              <ul className="space-y-3 mt-auto">
                {k.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-foreground">{h}</span>
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

/* ─── Mehrwert ─── */
const MehrwertSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const benefits = [
    { icon: MessageCircle, title: "Stärkt Kommunikation", desc: "Magie öffnet Gespräche zwischen Menschen, die sich sonst nie unterhalten würden." },
    { icon: Sparkles, title: "Emotionale Markenbindung", desc: "Ihr Event wird zum emotionalen Erlebnis — positive Assoziationen mit Ihrer Marke inklusive." },
    { icon: TrendingUp, title: "Hohe Erinnerungswirkung", desc: "Ihre Gäste erinnern sich an das, was sie erlebt haben — nicht an das, was sie gesehen haben." },
    { icon: ShieldCheck, title: "Professionelle Planung", desc: "Zuverlässige Abstimmung, pünktlicher Auftritt, reibungsloser Ablauf." },
  ];

  return (
    <section className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Ihr Vorteil</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Mehr als Unterhaltung
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`rounded-3xl bg-muted/50 p-8 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.06)] transition-all duration-500 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-[0_2px_8px_hsla(0,0%,0%,0.06)]">
                <b.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-lg italic text-foreground mb-2">{b.title}</h3>
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
    <section className="py-28 md:py-36 section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`relative ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden shadow-[0_16px_64px_hsla(0,0%,0%,0.08)]">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-gradient mb-6 inline-flex">Ihr Performer</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight mb-8">
              Professionell, modern, souverän.
            </h2>
            <div className="space-y-5 font-sans text-base text-muted-foreground leading-relaxed max-w-lg">
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
              className="inline-flex items-center justify-center mt-8 px-7 py-3.5 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/85 active:scale-[0.97]"
            >
              Gespräch vereinbaren
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Referenzen ─── */
const ReferenzenCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Emilian hat unsere Firmenfeier auf ein neues Level gehoben. Die Gäste waren begeistert — und das Networking lief wie von selbst.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologiebranche" },
    { quote: "Professionell, zuverlässig und unglaublich unterhaltsam. Die perfekte Wahl für unser Kundenevent.", author: "Katrin W.", role: "Head of Events, Automobilbranche" },
    { quote: "Wir buchen Emilian regelmäßig für unsere Jahresabschlussfeier. Die Mitarbeiter fragen schon Monate vorher, ob er wieder kommt.", author: "Michael B.", role: "HR Director, Finanzdienstleistung" },
  ];

  return (
    <section className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Referenzen</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Was Firmenkunden sagen
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`rounded-3xl bg-white p-8 shadow-[0_2px_12px_hsla(0,0%,0%,0.04)] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary/70 text-primary/70" />
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
    <section className="py-28 md:py-36 section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Eindrücke</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Business-Events mit Wow-Effekt
          </h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {images.map((img, i) => (
            <div key={i} className={`${img.className} rounded-3xl overflow-hidden`}>
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
    <section id="kontakt" className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center rounded-[2rem] bg-muted/60 px-8 py-20 md:px-16 md:py-28 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Jetzt starten</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-tight mb-6 text-foreground">
            Machen Sie Ihr Event unvergesslich.
          </h2>
          <p className="font-sans text-lg md:text-xl mb-4 text-muted-foreground font-light">
            Individuelle Konzepte, professionelle Umsetzung — lassen Sie uns über Ihr Event sprechen.
          </p>
          <p className="font-sans text-sm mb-10 text-muted-foreground/60">
            Unverbindlich & kostenlos. Ich melde mich innerhalb von 24 Stunden.
          </p>
          <a
            href="mailto:kontakt@magicel.de"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground font-sans text-base font-medium text-background transition-all duration-200 hover:bg-foreground/85 hover:shadow-[0_12px_48px_hsla(0,0%,0%,0.15)] active:scale-[0.97]"
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
