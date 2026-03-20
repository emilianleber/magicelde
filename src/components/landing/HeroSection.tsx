import heroImg from "@/assets/hero-magic.jpg";
import AnimatedWords from "./AnimatedWords";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container px-6">
        {/* Text content */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="badge-gradient mb-6 inline-flex">Emilian Leber — MagicEL</span>
          </div>
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] italic leading-[1.05] mb-6 opacity-0 animate-fade-up text-foreground"
            style={{ animationDelay: "0.4s" }}
          >
            Magie, die{" "}
            <AnimatedWords
              words={["im Kopf bleibt.", "verbindet.", "begeistert.", "überrascht."]}
            />
          </h1>
          <p
            className="font-sans text-lg md:text-xl max-w-xl mx-auto mb-10 opacity-0 animate-fade-up text-muted-foreground font-light"
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/85 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.15)] active:scale-[0.97]"
            >
              Kostenlos Anfragen →
            </a>
            <a
              href="#showkonzepte"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border font-sans text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.97]"
            >
              Anlässe →
            </a>
          </div>
        </div>

        {/* Hero image in rounded container (Apple-style) */}
        <div
          className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto opacity-0 animate-fade-up shadow-[0_24px_80px_hsla(0,0%,0%,0.1)]"
          style={{ animationDelay: "1s" }}
        >
          <img
            src={heroImg}
            alt="MagicEL bei einer Live-Performance"
            className="w-full h-[400px] md:h-[520px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <p className="font-sans text-xs text-white/70 font-medium">Zauberer für Ihr Event buchen</p>
              <p className="font-sans text-xs text-white/50">Begeisterte Kunden seit über 10 Jahren.</p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 opacity-0 animate-fade-up" style={{ animationDelay: "1.2s" }}>
          {["500+ Events", "10+ Jahre Erfahrung", "Bekannt aus TV"].map((badge) => (
            <span key={badge} className="font-sans text-xs font-medium text-muted-foreground tracking-wide">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
