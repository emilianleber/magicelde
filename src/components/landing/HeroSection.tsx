import heroImg from "@/assets/hero-magic.jpg";
import AnimatedWords from "./AnimatedWords";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        {/* Centered text — Apple-style minimal */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <span className="badge-muted mb-8 inline-flex">Emilian Leber — MagicEL</span>
          </div>

          <h1
            className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground"
            style={{ animationDelay: "0.35s" }}
          >
            Magie, die{" "}
            <AnimatedWords
              words={["bleibt.", "verbindet.", "begeistert.", "überrascht."]}
            />
          </h1>

          <p
            className="text-body max-w-lg mx-auto mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.55s" }}
          >
            Erlebnisse, die deine Gäste noch Wochen später besprechen.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              to="/buchung"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 hover:shadow-[0_8px_30px_hsla(0,0%,0%,0.12)] active:scale-[0.97]"
            >
              Kostenlos anfragen
            </Link>
            <a
              href="#showkonzepte"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-sans text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground active:scale-[0.97]"
            >
              Mehr erfahren ↓
            </a>
          </div>
        </div>

        {/* Hero image — large rounded, no dark overlay */}
        <div
          className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          <img
            src={heroImg}
            alt="MagicEL bei einer Live-Performance"
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
        </div>

        {/* Trust — minimal text */}
        <div
          className="flex flex-wrap justify-center gap-8 mt-14 opacity-0 animate-fade-up"
          style={{ animationDelay: "1.1s" }}
        >
          {["500+ Events", "10+ Jahre Erfahrung", "Bekannt aus TV"].map((badge) => (
            <span key={badge} className="font-sans text-xs font-medium text-muted-foreground/60 tracking-wide uppercase">
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
