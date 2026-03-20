import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import weddingImg from "@/assets/wedding-magic.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Heart, Sparkles, Users, MessageCircle, X, Check, Clock, Star, Mic, HandMetal } from "lucide-react";

/* ─── Hero ─── */
const HeroWedding = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={weddingImg} alt="Zauberer auf einer Hochzeit" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30" />
    </div>
    <div className="relative z-10 container text-center px-6 pt-32 pb-24">
      <p
        className="text-sm font-sans font-medium tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-up"
        style={{ color: "hsl(var(--gold))", animationDelay: "0.2s" }}
      >
        Zauberer für eure Hochzeit
      </p>
      <h1
        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-8 opacity-0 animate-fade-up"
        style={{ color: "hsl(var(--primary-foreground))", animationDelay: "0.4s" }}
      >
        Magie für eure Hochzeit —
        <br />
        Momente, die bleiben.
      </h1>
      <p
        className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up"
        style={{ color: "hsl(var(--section-dark-foreground))", animationDelay: "0.6s" }}
      >
        Unvergessliches Entertainment, das eure Gäste verbindet, zum Staunen bringt
        und euren großen Tag noch besonderer macht.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
        <a
          href="#kontakt"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary font-sans font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_8px_32px_hsla(0,97%,27%,0.4)] active:scale-[0.97]"
        >
          Termin anfragen
        </a>
        <a
          href="#pakete"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg glass font-sans font-semibold transition-all duration-200 hover:bg-[hsla(0,0%,100%,0.15)] active:scale-[0.97]"
          style={{ color: "hsl(var(--section-dark-foreground))" }}
        >
          Pakete ansehen
        </a>
      </div>
    </div>
  </section>
);

/* ─── Warum Zauberei ─── */
const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reasons = [
    { icon: Heart, title: "Verbindet Gäste", desc: "Magie bringt fremde Tischgruppen zusammen — sofort gemeinsame Erlebnisse statt steifem Small Talk." },
    { icon: Sparkles, title: "Unvergessliche Momente", desc: "Eure Gäste reden noch Wochen später über das, was sie erlebt haben — nicht nur gesehen." },
    { icon: Users, title: "Lockert die Stimmung", desc: "Perfekt für Wartezeiten beim Empfang oder Fotoshooting — nie Leerlauf, immer Unterhaltung." },
    { icon: MessageCircle, title: "Gesprächsstoff", desc: "Ein geteiltes Erlebnis schafft Verbindung — Magie ist der beste Icebreaker, den es gibt." },
  ];

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Warum Zauberei?</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Warum Magie perfekt zu eurer Hochzeit passt
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
const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const andere = [
    "Klischeehaft & altmodisch",
    "Wenig Interaktion mit Gästen",
    "Standardprogramm von der Stange",
    "Fokus auf Tricks statt Erlebnis",
    "Unpassender Auftritt & Stil",
  ];
  const magicel = [
    "Modern, stilvoll & nie kitschig",
    "Interaktiv & nah am Publikum",
    "Individuell auf eure Hochzeit abgestimmt",
    "Fokus auf Emotionen & gemeinsame Momente",
    "Eleganter Auftritt, der zur Location passt",
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
          {/* Andere */}
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
          {/* MagicEL */}
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

/* ─── Pakete ─── */
const PaketeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const pakete = [
    {
      name: "Einstieg",
      price: "395",
      duration: "15–20 Min.",
      type: "Bühnenshow",
      desc: "Ein kompaktes Highlight zwischendurch — perfekt als Überraschung zwischen Dinner und Party.",
      features: ["15–20 Minuten Bühnenshow", "Professionelle Performance", "Individuelle Absprache"],
    },
    {
      name: "Klassiker",
      price: "495",
      duration: "30–45 Min.",
      type: "Bühnenshow oder Close-Up",
      desc: "Der ideale Begleiter für den Empfang oder das Abendprogramm — flexibel und mitreißend.",
      features: ["30–45 Minuten Entertainment", "Bühnenshow oder Close-Up Magie", "Individuelle Abstimmung", "Persönliche Vorbesprechung"],
      popular: true,
    },
    {
      name: "Premium Erlebnis",
      price: "749",
      duration: "bis 60 Min.",
      type: "Bühnenshow + Close-Up",
      desc: "Das Rundum-Paket: Empfangsmagie und Bühnen-Highlight — maximales Erlebnis für alle Gäste.",
      features: ["Bis zu 60 Minuten", "Bühnenshow und Close-Up Magie", "Individuelle Konzeption", "Persönliche Vorbesprechung", "Flexibler Einsatz über den Abend"],
    },
  ];

  return (
    <section id="pakete" className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Showkonzepte</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Drei Pakete für eure Hochzeit
          </h2>
          <p className="font-sans text-base text-muted-foreground mt-4 max-w-lg mx-auto">
            Jedes Paket wird individuell auf euren Tag abgestimmt — keine Show gleicht der anderen.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pakete.map((p, i) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border ${p.popular ? "border-primary shadow-[0_8px_40px_hsla(0,97%,27%,0.1)]" : "border-border"} bg-card p-8 flex flex-col ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground font-sans text-xs font-semibold">
                  Am beliebtesten
                </span>
              )}
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">{p.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-sans text-xs text-muted-foreground">ab</span>
                <span className="font-display text-4xl font-bold text-foreground tabular-nums">{p.price}€</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-4">{p.duration} · {p.type}</p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-sans text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                  p.popular
                    ? "bg-primary text-primary-foreground hover:shadow-[0_4px_16px_hsla(0,97%,27%,0.35)]"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Jetzt anfragen
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Ablauf ─── */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { icon: Users, time: "Empfang", title: "Close-Up als Icebreaker", desc: "Während eure Gäste ankommen, sorge ich für Staunen und Gesprächsstoff — der perfekte Start." },
    { icon: Clock, time: "Dinner / Zwischenprogramm", title: "Entertainment ohne Leerlauf", desc: "Ob zwischen den Gängen oder während des Fotoshootings — eure Gäste sind bestens unterhalten." },
    { icon: Mic, time: "Abendprogramm", title: "Show als Highlight", desc: "Eine mitreißende Bühnenshow als Höhepunkt des Abends — Staunen, Lachen, Gänsehaut." },
  ];

  return (
    <section className="py-24 md:py-32 section-dark" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase mb-4" style={{ color: "hsl(var(--gold))" }}>Ablauf</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight" style={{ color: "hsl(var(--section-dark-foreground))" }}>
            So fügt sich Magie in euren Tag
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] mb-2" style={{ color: "hsl(var(--gold))" }}>{s.time}</p>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "hsl(var(--section-dark-foreground))" }}>{s.title}</h3>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "hsla(0,0%,100%,0.6)" }}>{s.desc}</p>
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
            <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Euer Zauberer</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              Hi, ich bin Emilian.
            </h2>
            <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed max-w-lg">
              <p>
                Moderner Zauberkünstler, Finalist bei <span className="font-semibold text-foreground">Talents of Magic</span> und
                leidenschaftlicher Performer. Ich glaube an Magie, die berührt — nicht an Klischees.
              </p>
              <p>
                Für eure Hochzeit entwickle ich ein individuelles Konzept, das zu euch, eurer Location und
                euren Gästen passt. Keine Show von der Stange, sondern ein persönliches Erlebnis.
              </p>
            </div>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center mt-8 px-7 py-3.5 rounded-lg bg-primary font-sans text-sm font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_4px_16px_hsla(0,97%,27%,0.35)] active:scale-[0.97]"
            >
              Kennenlernen
            </a>
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
    { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang. Das war das absolute Highlight!", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
    { quote: "Emilian hat die perfekte Balance zwischen Eleganz und Unterhaltung gefunden. Einfach klasse.", author: "Julia & Thomas", role: "Hochzeit am Bodensee" },
    { quote: "Wir hatten erst überlegt, ob ein Zauberer passt — jetzt können wir es jedem Brautpaar empfehlen!", author: "Anna & Felix", role: "Hochzeit in Stuttgart" },
  ];

  return (
    <section className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Stimmen</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Was Brautpaare sagen
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
const GalerieWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    { src: weddingImg, alt: "Zauberer auf einer Hochzeit", className: "col-span-2 row-span-2" },
    { src: audienceImg, alt: "Staunende Gäste", className: "col-span-1 row-span-1" },
    { src: closeupImg, alt: "Close-Up Magie", className: "col-span-1 row-span-1" },
    { src: stageImg, alt: "Bühnenshow", className: "col-span-1 row-span-1" },
    { src: heroImg, alt: "Live-Performance", className: "col-span-1 row-span-1" },
  ];

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Eindrücke</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Momente von echten Hochzeiten
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
const CTAWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="kontakt" className="relative py-32 md:py-40 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <img src={weddingImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/60" />
      </div>
      <div className="relative z-10 container px-6 text-center">
        <div className={`max-w-2xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--section-dark-foreground))" }}>
            Sichert euch euren Hochzeitstermin.
          </h2>
          <p className="font-sans text-lg md:text-xl mb-4" style={{ color: "hsla(0,0%,100%,0.7)" }}>
            Termine sind begrenzt — frühzeitig anfragen lohnt sich.
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
const Hochzeit = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroWedding />
        <WarumSection />
        <VergleichSection />
        <PaketeSection />
        <AblaufSection />
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
