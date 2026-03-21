import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { Check, X, Star } from "lucide-react";

/* ─── Hero ─── */
const HeroCorporate = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Entertainment für Unternehmen</span>
        </div>
        <h1
          className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground"
          style={{ animationDelay: "0.35s" }}
        >
          Events, die{" "}
          <AnimatedWords words={["wirken.", "verbinden.", "beeindrucken."]} />
        </h1>
        <p
          className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          Professionelles Entertainment, das Ihr Event auf ein neues Level hebt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <Link to="/buchung" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97]">
            Event anfragen
          </Link>
          <a href="#showkonzepte" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-sans text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground active:scale-[0.97]">
            Konzepte ansehen ↓
          </a>
        </div>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={corporateImg} alt="Zauberer auf einer Firmenfeier" className="w-full h-[420px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

/* ─── Warum ─── */
const WarumCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Warum Magie?</span>
          <h2 className="headline-section text-foreground mb-8">
            Mehr als Unterhaltung.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Magie löst die Business-Atmosphäre, bringt Menschen ins Gespräch
            und macht Ihr Event unvergesslich.
          </p>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {[
            { word: "Networking", sub: "Bringt Menschen ins Gespräch." },
            { word: "Wirkung", sub: "Hebt Ihr Event spürbar ab." },
            { word: "Erlebnis", sub: "Gemeinsam staunen verbindet." },
            { word: "Atmosphäre", sub: "Locker, positiv, entspannt." },
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

/* ─── Vergleich ─── */
const VergleichCorporate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">
            Nicht irgendein Programm.
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-16 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-8">Standard</p>
            <ul className="space-y-5">
              {["Klassisch & vorhersehbar", "Wenig Bezug zum Unternehmen", "Reine Unterhaltung", "Kein Mehrwert fürs Networking"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-1" />
                  <span className="text-detail">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-primary/70 mb-8">MagicEL</p>
            <ul className="space-y-5">
              {["Modern & souverän", "Individuell auf Ihr Unternehmen abgestimmt", "Verbindet Entertainment mit Networking", "Professioneller Auftritt auf jedem Level"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span className="font-sans text-sm md:text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Einsatzbereiche ─── */
const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { title: "Firmenfeiern & Jahresabschlüsse", desc: "Events, über die alle sprechen." },
    { title: "Galas & Business Events", desc: "Elegante Magie auf höchstem Niveau." },
    { title: "Messen & Promotions", desc: "Ihr Stand wird zum Magneten." },
    { title: "Produktpräsentationen", desc: "Ihre Botschaft, inszeniert." },
    { title: "Teamevents & Incentives", desc: "Gemeinsam staunen stärkt." },
  ];

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground">Vielseitig einsetzbar.</h2>
        </div>
        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {items.map((item) => (
            <div key={item.title} className="flex items-center justify-between py-7 group">
              <div>
                <h3 className="font-display text-xl md:text-2xl italic text-foreground">{item.title}</h3>
                <p className="text-detail mt-1">{item.desc}</p>
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
      img: closeupImg,
      title: "Close-Up",
      sub: "Empfang & Networking",
      desc: "Direkt bei Ihren Gästen — interaktive Magie, die Gespräche entfacht.",
    },
    {
      img: stageImg,
      title: "Bühnenshow",
      sub: "Zentraler Programmpunkt",
      desc: "Strukturiert, mitreißend, beeindruckend — das Highlight des Abends.",
    },
    {
      img: heroImg,
      title: "Individuell",
      sub: "Maßgeschneidert",
      desc: "Angepasst auf Ihre Marke, Ihre Botschaft, Ihr Event.",
    },
  ];

  return (
    <section id="showkonzepte" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground">Drei Formate.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {konzepte.map((k, i) => (
            <div
              key={k.title}
              className={`group relative rounded-[2rem] overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
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

/* ─── Über mich ─── */
const UeberMichBusiness = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-[2rem] overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-muted mb-8 inline-flex">Ihr Performer</span>
            <h2 className="headline-sub text-foreground mb-8">
              Professionell. Modern. Souverän.
            </h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p>
                Finalist bei Talents of Magic, hunderte Business-Events.
                Souveräner Auftritt, individuelle Abstimmung, zuverlässige Planung.
              </p>
              <p>
                Kein Klischee — ein moderner Performer, der sich in jedem
                Unternehmenskontext sicher bewegt.
              </p>
            </div>
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
    { quote: "Emilian hat unsere Firmenfeier auf ein neues Level gehoben.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologie" },
    { quote: "Professionell, zuverlässig, unglaublich unterhaltsam.", author: "Katrin W.", role: "Head of Events, Automotive" },
    { quote: "Die Mitarbeiter fragen Monate vorher, ob er wieder kommt.", author: "Michael B.", role: "HR Director, Finance" },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Was Kunden sagen.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={`${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary/60 text-primary/60" />
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
    { src: corporateImg, alt: "Corporate Event", className: "col-span-2 row-span-2" },
    { src: audienceImg, alt: "Publikum", className: "" },
    { src: closeupImg, alt: "Close-Up", className: "" },
    { src: stageImg, alt: "Bühne", className: "" },
    { src: heroImg, alt: "Performance", className: "" },
  ];

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {images.map((img, i) => (
            <div key={i} className={`${img.className} rounded-2xl overflow-hidden`}>
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
    <section id="kontakt" className="section-full section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-hero text-foreground mb-8">
            Machen Sie Ihr Event<br />unvergesslich.
          </h2>
          <p className="text-body max-w-md mx-auto mb-12">
            Individuelle Konzepte, professionelle Umsetzung.
          </p>
          <a
            href="mailto:kontakt@magicel.de"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground font-sans text-base font-medium text-background transition-all duration-300 hover:bg-foreground/85 hover:shadow-[0_12px_40px_hsla(0,0%,0%,0.12)] active:scale-[0.97]"
          >
            Jetzt unverbindlich anfragen
          </a>
          <p className="font-sans text-xs text-muted-foreground/50 mt-6">
            Kostenlos · Unverbindlich · Antwort innerhalb 24h
          </p>
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
