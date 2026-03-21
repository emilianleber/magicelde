import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import weddingImg from "@/assets/wedding-magic.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { Check, X, Star } from "lucide-react";

/* ─── Hero ─── */
const HeroWedding = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Zauberer für eure Hochzeit</span>
        </div>
        <h1
          className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground"
          style={{ animationDelay: "0.35s" }}
        >
          Magie für eure<br />
          <AnimatedWords words={["Hochzeit.", "Gäste.", "Liebe."]} />
        </h1>
        <p
          className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          Unvergessliche Momente, die eure Gäste verbinden.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <a href="#pakete" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97]">
            Pakete ansehen ↓
          </a>
          <Link to="/buchung" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-sans text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground active:scale-[0.97]">
            Termin anfragen →
          </Link>
        </div>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={weddingImg} alt="Zauberer auf einer Hochzeit" className="w-full h-[420px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

/* ─── Warum ─── */
const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Warum Zauberei?</span>
          <h2 className="headline-section text-foreground mb-8">
            Der perfekte Eisbrecher.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Magie lockert die Stimmung, verbindet fremde Gäste und schafft gemeinsame
            Erlebnisse — statt steifem Small Talk.
          </p>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-px mt-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {[
            { word: "Verbindet", sub: "Gäste erleben etwas zusammen." },
            { word: "Unvergesslich", sub: "Wochen später noch Gesprächsthema." },
            { word: "Locker", sub: "Kein Leerlauf, immer Unterhaltung." },
            { word: "Persönlich", sub: "Jeder Gast wird einbezogen." },
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

/* ─── Vergleich — Apple-style 2 statements ─── */
const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">
            Nicht irgendein Zauberer.
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-16 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground/50 mb-8">Andere Zauberer</p>
            <ul className="space-y-5">
              {["Klischeehaft & altmodisch", "Wenig Interaktion", "Standardprogramm", "Fokus auf Tricks"].map((item) => (
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
              {["Modern & stilvoll", "Interaktiv & nah am Publikum", "Individuell auf eure Hochzeit abgestimmt", "Fokus auf Emotionen & Momente"].map((item) => (
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

/* ─── Pakete — 3 Erlebnis-Level ─── */
const PaketeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const pakete = [
    {
      name: "Einstieg",
      price: "395",
      duration: "15–20 Min.",
      type: "Bühnenshow",
      desc: "Ein kompaktes Highlight — perfekt als Überraschung.",
      features: ["15–20 Min. Bühnenshow", "Professionelle Performance", "Individuelle Absprache"],
    },
    {
      name: "Klassiker",
      price: "495",
      duration: "30–45 Min.",
      type: "Bühne oder Close-Up",
      desc: "Der ideale Begleiter für Empfang oder Abendprogramm.",
      features: ["30–45 Min. Entertainment", "Bühnenshow oder Close-Up", "Persönliche Vorbesprechung"],
      popular: true,
    },
    {
      name: "Premium",
      price: "749",
      duration: "bis 60 Min.",
      type: "Bühne + Close-Up",
      desc: "Das Rundum-Erlebnis für den gesamten Abend.",
      features: ["Bis zu 60 Minuten", "Bühne und Close-Up kombiniert", "Individuelle Konzeption", "Flexibler Einsatz"],
    },
  ];

  return (
    <section id="pakete" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Erlebnis-Level</span>
          <h2 className="headline-section text-foreground">
            Drei Pakete.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pakete.map((p, i) => (
            <div
              key={p.name}
              className={`relative rounded-[2rem] bg-muted/40 p-8 flex flex-col transition-all duration-500 hover:bg-muted/60 ${
                p.popular ? "ring-1 ring-foreground/10" : ""
              } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-gradient text-[10px]">Beliebteste Wahl</span>
              )}
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{p.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-sans text-xs text-muted-foreground">ab</span>
                <span className="font-display text-4xl italic text-foreground tabular-nums">{p.price}€</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-6">{p.duration} · {p.type}</p>
              <p className="text-detail mb-8">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/buchung"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-sans text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                  p.popular
                    ? "bg-foreground text-background hover:bg-foreground/85"
                    : "text-foreground hover:text-foreground/70"
                }`}
              >
                Jetzt anfragen
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Über mich (kurz) ─── */
const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-[2rem] overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-muted mb-8 inline-flex">Euer Zauberer</span>
            <h2 className="headline-sub text-foreground mb-8">
              Hi, ich bin Emilian.
            </h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p>
                Moderner Zauberkünstler, Finalist bei Talents of Magic und
                leidenschaftlicher Performer. Magie, die berührt — keine Klischees.
              </p>
              <p>
                Für eure Hochzeit entwickle ich ein Konzept, das zu euch und
                euren Gästen passt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Testimonials ─── */
const TestimonialsWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang.", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
    { quote: "Die perfekte Balance zwischen Eleganz und Unterhaltung.", author: "Julia & Thomas", role: "Hochzeit am Bodensee" },
    { quote: "Wir können es jedem Brautpaar empfehlen!", author: "Anna & Felix", role: "Hochzeit in Stuttgart" },
  ];

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">
            Was Brautpaare sagen.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
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
const GalerieWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    { src: weddingImg, alt: "Hochzeitsmagie", className: "col-span-2 row-span-2" },
    { src: audienceImg, alt: "Staunende Gäste", className: "" },
    { src: closeupImg, alt: "Close-Up", className: "" },
    { src: stageImg, alt: "Bühnenshow", className: "" },
    { src: heroImg, alt: "Performance", className: "" },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
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
const CTAWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="kontakt" className="section-full" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-hero text-foreground mb-8">
            Sichert euch euren<br />Termin.
          </h2>
          <p className="text-body max-w-md mx-auto mb-12">
            Termine sind begrenzt — frühzeitig anfragen lohnt sich.
          </p>
          <Link
            to="/buchung"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground font-sans text-base font-medium text-background transition-all duration-300 hover:bg-foreground/85 hover:shadow-[0_12px_40px_hsla(0,0%,0%,0.12)] active:scale-[0.97]"
          >
            Jetzt unverbindlich anfragen
          </Link>
          <p className="font-sans text-xs text-muted-foreground/50 mt-6">
            Kostenlos · Unverbindlich · Antwort innerhalb 24h
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Page ─── */
const Hochzeit = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroWedding />
        <WarumSection />
        <VergleichSection />
        <PaketeSection />
        <UeberMichKurz />
        <TestimonialsWedding />
        <GalerieWedding />
        <CTAWedding />
      </main>
      <Footer />
    </>
  );
};

export default Hochzeit;
