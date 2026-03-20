import heroImg from "@/assets/hero-magic.jpg";
import AnimatedWords from "./AnimatedWords";

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-6 pt-32 pb-24">
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="badge-blue mb-8 inline-flex">Emilian Leber — MagicEL</span>
        </div>
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] italic leading-[1.05] mb-8 opacity-0 animate-fade-up text-white"
          style={{ animationDelay: "0.4s" }}
        >
          Magie, die{" "}
          <AnimatedWords
            words={["im Kopf bleibt.", "verbindet.", "begeistert.", "überrascht."]}
          />
        </h1>
        <p
          className="font-sans text-lg md:text-xl max-w-xl mx-auto mb-12 opacity-0 animate-fade-up text-white/75 font-light"
          style={{ animationDelay: "0.6s" }}
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
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white font-sans text-sm font-medium text-foreground transition-all duration-200 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.15)] active:scale-[0.97]"
          >
            Jetzt anfragen
          </a>
          <a
            href="#showkonzepte"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/30 font-sans text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
          >
            Mehr erfahren
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-fade-in" style={{ animationDelay: "1.4s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
