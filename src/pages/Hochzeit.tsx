import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import weddingImg from "@/assets/wedding-magic.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { Check, X, Star, Heart, Users, Music, Sparkles, ArrowRight } from "lucide-react";

const HeroWedding = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Zauberer für eure Hochzeit</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Magie für eure{" "}
          <AnimatedWords words={["Hochzeit.", "Gäste.", "Liebe.", "Feier."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Stellt euch vor, eure Gäste lachen, staunen und reden noch Wochen nach eurer Hochzeit
          über den einen Moment, der alle sprachlos gemacht hat. Genau das ist mein Job.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary btn-large group">
            Termin sichern <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#pakete" className="btn-secondary btn-large">Pakete ansehen ↓</a>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={weddingImg} alt="Zauberer auf einer Hochzeit — staunende Gäste" className="w-full h-[400px] md:h-[560px] object-cover" />
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
          <span className="badge-accent mb-8 inline-flex">Warum Zauberei?</span>
          <h2 className="headline-section text-foreground mb-6">Der perfekte Eisbrecher für eure Hochzeit.</h2>
          <p className="text-body max-w-xl mx-auto">
            Auf jeder Hochzeit gibt es diesen Moment: Gäste, die sich nicht kennen, stehen beisammen
            und wissen nicht, worüber sie reden sollen. Magie löst genau dieses Problem — elegant, witzig und verbindend.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Users, title: "Verbindet Gäste", desc: "Fremde werden Freunde — durch gemeinsames Staunen und Lachen." },
            { icon: Heart, title: "Schafft Erinnerungen", desc: "Momente, über die eure Gäste noch Wochen später sprechen." },
            { icon: Music, title: "Füllt jede Lücke", desc: "Kein Leerlauf beim Empfang, beim Dinner oder zwischen den Programmpunkten." },
            { icon: Sparkles, title: "Individuell für euch", desc: "Jede Show wird auf euch, eure Gäste und euren Ablauf abgestimmt." },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-3xl bg-muted/40 hover:bg-muted/60 transition-all duration-300 group" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
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

const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Nicht irgendein Zauberer.</h2>
          <p className="text-body max-w-xl mx-auto">
            Es gibt viele Zauberer da draußen. Aber nur wenige, die wirklich zu einer modernen Hochzeit passen.
          </p>
        </div>
        <div className={`grid md:grid-cols-2 gap-12 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <div className="p-8 rounded-3xl bg-background border border-border/50">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/40 mb-8">Andere Zauberer</p>
            <ul className="space-y-5">
              {["Klischeehaft & altmodisch — Zylinder, Tauben, Standardtricks", "Wenig Interaktion mit dem Publikum", "Gleiches Programm bei jeder Hochzeit", "Fokus auf Tricks statt auf Emotionen und Momente"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-1" />
                  <span className="text-detail">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-8">MagicEL</p>
            <ul className="space-y-5">
              {["Modern, stilvoll und perfekt passend zu einer eleganten Hochzeit", "Interaktiv — jeder Gast wird Teil des Erlebnisses", "Individuell auf eure Hochzeit, euren Stil und eure Gäste abgestimmt", "Fokus auf Emotionen, gemeinsame Momente und echte Verbindung"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-1" />
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

const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatz</span>
          <h2 className="headline-section text-foreground mb-6">Wann passt Magie in euren Ablauf?</h2>
          <p className="text-body max-w-xl mx-auto">
            Es gibt drei perfekte Zeitfenster, in denen Magie euren Hochzeitstag auf ein neues Level hebt.
          </p>
        </div>
        <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { title: "Sektempfang", time: "15–45 Min.", desc: "Close-Up Magie als Icebreaker — eure Gäste kommen an, staunen und sind sofort im besten Gesprächsmodus." },
            { title: "Dinner-Begleitung", time: "30–60 Min.", desc: "Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und interaktiv. Jeder Tisch bekommt sein eigenes Erlebnis." },
            { title: "Abendprogramm", time: "15–30 Min.", desc: "Eine Bühnenshow als Highlight des Abends — unterhaltsam, witzig und für alle Gäste gleichzeitig." },
          ].map((item, i) => (
            <div key={item.title} className="p-8 rounded-3xl bg-muted/40" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <span className="badge-accent mb-4 inline-flex">{item.time}</span>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PaketeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const pakete = [
    { name: "Einstieg", price: "395", duration: "15–20 Min.", type: "Bühnenshow", desc: "Ein kompaktes Highlight — perfekt als Überraschung oder Zwischenprogramm. Ideal für kleinere Feiern oder als ergänzendes Element.", features: ["15–20 Min. Bühnenshow", "Professionelle Performance", "Individuelle Absprache", "Auf eure Hochzeit abgestimmt"] },
    { name: "Klassiker", price: "495", duration: "30–45 Min.", type: "Bühne oder Close-Up", desc: "Der ideale Begleiter für Empfang oder Abendprogramm. Flexibel einsetzbar, perfekt für mittelgroße Hochzeiten.", features: ["30–45 Min. Entertainment", "Bühnenshow oder Close-Up", "Persönliche Vorbesprechung", "Flexibler Einsatz im Ablauf"], popular: true },
    { name: "Premium", price: "749", duration: "bis 60 Min.", type: "Bühne + Close-Up", desc: "Das Rundum-Erlebnis — Magie vom Empfang bis zum Abendprogramm. Maximaler Wow-Effekt für alle Gäste.", features: ["Bis zu 60 Minuten", "Bühne und Close-Up kombiniert", "Individuelle Konzeption", "Flexibler Einsatz", "Premium-Betreuung"] },
  ];

  return (
    <section id="pakete" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Pakete</span>
          <h2 className="headline-section text-foreground mb-6">Drei Erlebnis-Level.</h2>
          <p className="text-body max-w-xl mx-auto">
            Jedes Paket wird individuell auf eure Hochzeit abgestimmt. Ihr wählt das Level — ich sorge für den Wow-Effekt.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pakete.map((p, i) => (
            <div key={p.name} className={`relative rounded-3xl bg-background p-8 flex flex-col transition-all duration-500 hover:shadow-lg ${p.popular ? "ring-2 ring-accent/20" : ""} ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-gradient text-[10px]">Beliebteste Wahl</span>}
              <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">{p.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-sans text-xs text-muted-foreground">ab</span>
                <span className="font-display text-4xl font-bold text-foreground tabular-nums">{p.price}€</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-6">{p.duration} · {p.type}</p>
              <p className="text-detail mb-8">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/buchung" className={p.popular ? "btn-primary justify-center" : "btn-secondary justify-center border border-border hover:border-foreground/20"}>
                Jetzt anfragen
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
            <span className="badge-accent mb-8 inline-flex">Euer Zauberer</span>
            <h2 className="headline-sub text-foreground mb-6">Hi, ich bin Emilian.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Moderner Comedy-Zauberer, Finalist bei Talents of Magic und leidenschaftlicher Performer mit über 500 Events Erfahrung.
              </p>
              <p>
                Für eure Hochzeit entwickle ich ein Konzept, das zu euch und euren Gästen passt — keine Standardshow, sondern ein persönliches Erlebnis, das eure Feier einzigartig macht.
              </p>
              <p>
                Mein Stil: modern, humorvoll, interaktiv. Keine Klischees, keine verstaubten Tricks — sondern echtes Entertainment, das Herzen öffnet und Gesichter zum Strahlen bringt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang. Es war der perfekte Eisbrecher — alle waren sofort in bester Stimmung!", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
    { quote: "Die perfekte Balance zwischen Eleganz, Humor und absolutem Staunen. Emilian hat sich nahtlos in unseren Abend eingefügt.", author: "Julia & Thomas", role: "Hochzeit am Bodensee" },
    { quote: "Wir können es jedem Brautpaar empfehlen! Modern, stilvoll und unglaublich unterhaltsam.", author: "Anna & Felix", role: "Hochzeit in Stuttgart" },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Brautpaare</span>
          <h2 className="headline-section text-foreground mb-6">Was Brautpaare sagen.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
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

const GalerieWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Momente von echten Hochzeiten.</h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[
            { src: weddingImg, alt: "Hochzeitsmagie", className: "col-span-2 row-span-2" },
            { src: audienceImg, alt: "Staunende Gäste" },
            { src: closeupImg, alt: "Close-Up Magie" },
            { src: stageImg, alt: "Bühnenshow" },
            { src: heroImg, alt: "Performance" },
          ].map((img, i) => (
            <div key={i} className={`${img.className || ""} rounded-2xl overflow-hidden group`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hochzeit = () => (
  <PageLayout>
    <HeroWedding />
    <WarumSection />
    <VergleichSection />
    <EinsatzSection />
    <PaketeSection />
    <UeberMichKurz />
    <TestimonialsWedding />
    <GalerieWedding />
    <ProcessSteps />
    <BookingCTA headline={"Sichert euch euren\nHochzeitstermin."} subline="Termine sind begrenzt — frühzeitig anfragen lohnt sich. Ich berate euch persönlich und unverbindlich." />
  </PageLayout>
);

export default Hochzeit;
