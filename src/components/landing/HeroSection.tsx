import heroImg from "@/assets/hero-magic.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="MagicEL bei einer Live-Performance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-6 pt-32 pb-24">
        <p
          className="text-sm font-sans font-medium tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-up"
          style={{ color: "hsl(var(--gold))", animationDelay: "0.2s" }}
        >
          Emilian Leber — MagicEL
        </p>
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8 opacity-0 animate-fade-up"
          style={{ color: "hsl(var(--primary-foreground))", animationDelay: "0.4s" }}
        >
          Magie, die im
          <br />
          Kopf bleibt.
        </h1>
        <p
          className="font-sans text-lg md:text-xl max-w-xl mx-auto mb-12 opacity-0 animate-fade-up"
          style={{ color: "hsl(var(--section-dark-foreground))", animationDelay: "0.6s" }}
        >
          Modern, interaktiv, unvergesslich — Entertainment, das deine Gäste noch
          Wochen später besprechen.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary font-sans font-semibold text-primary-foreground transition-all duration-200 hover:shadow-[0_8px_32px_hsla(0,97%,27%,0.4)] active:scale-[0.97]"
          >
            Jetzt anfragen
          </a>
          <a
            href="#showkonzepte"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg glass font-sans font-semibold transition-all duration-200 hover:bg-[hsla(0,0%,100%,0.15)] active:scale-[0.97]"
            style={{ color: "hsl(var(--section-dark-foreground))" }}
          >
            Mehr erfahren
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-fade-in" style={{ animationDelay: "1.4s" }}>
        <div className="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style={{ borderColor: "hsla(0,0%,100%,0.3)" }}>
          <div className="w-1 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
