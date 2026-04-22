import heroImg from "@/assets/hero-magic.jpg";
import AnimatedWords from "./AnimatedWords";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="badge-accent mb-8 inline-flex">Comedy-Zauberer · Showkünstler · Performer</span>
          </div>

          <h1
            className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground"
            style={{ animationDelay: "0.3s" }}
          >
            Staunen. Lachen.{" "}
            <AnimatedWords words={["Erinnern.", "Verbinden.", "Begeistern.", "Erleben."]} />
          </h1>

          <p
            className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            Ich bin Emilian Leber — moderner Comedy-Zauberer und Showkünstler.
            Meine Shows verbinden Staunen mit Humor und schaffen Erlebnisse,
            über die deine Gäste noch Wochen später sprechen.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
            style={{ animationDelay: "0.65s" }}
          >
            <Link to="/buchung" className="btn-primary btn-large group">
              Kostenlos anfragen
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#showkonzepte" className="btn-secondary btn-large group">
              <Play className="w-4 h-4 mr-2" />
              Entdecken
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div
          className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up"
          style={{ animationDelay: "0.85s" }}
        >
          <img
            src={heroImg}
            alt="MagicEL — Comedy-Zauberer Emilian Leber bei einer Live-Performance"
            className="w-full h-[400px] md:h-[560px] object-cover"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-16 opacity-0 animate-fade-up"
          style={{ animationDelay: "1.1s" }}
        >
          {[
            { value: "200+", label: "Events" },
            { value: "10+", label: "Jahre Erfahrung" },
            { value: "Bekannt aus", label: "TV & Medien" },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <p className="font-display text-lg font-bold text-foreground">{badge.value}</p>
              <p className="font-sans text-[11px] font-medium text-muted-foreground/50 uppercase tracking-wider">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
