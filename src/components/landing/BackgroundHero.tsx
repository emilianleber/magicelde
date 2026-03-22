import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedWords from "./AnimatedWords";

interface BackgroundHeroProps {
  imageSrc: string;
  badge?: string;
  headline: string;
  animatedWords?: string[];
  subline: string;
  ctaPrimary?: { text: string; to: string };
  ctaSecondary?: { text: string; href: string };
  overlay?: "light" | "medium" | "dark";
}

const BackgroundHero = ({
  imageSrc,
  badge,
  headline,
  animatedWords,
  subline,
  ctaPrimary = { text: "Jetzt anfragen", to: "/buchung" },
  ctaSecondary,
  overlay = "medium",
}: BackgroundHeroProps) => {
  const overlayClass = {
    light: "bg-black/20",
    medium: "bg-black/40",
    dark: "bg-black/60",
  }[overlay];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover scale-105"
          style={{ animation: "slowZoom 20s ease-in-out infinite alternate" }}
        />
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {badge && (
            <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-widest uppercase text-white/90 bg-white/15 backdrop-blur-sm border border-white/20 mb-8">
                {badge}
              </span>
            </div>
          )}

          <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-white" style={{ animationDelay: "0.3s" }}>
            {headline}{" "}
            {animatedWords && <AnimatedWords words={animatedWords} />}
          </h1>

          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-white/80 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {subline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <Link to={ctaPrimary.to} className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white font-sans text-base font-medium text-foreground transition-all duration-300 hover:bg-white/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:scale-[0.97] group">
              {ctaPrimary.text}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            {ctaSecondary && (
              <a href={ctaSecondary.href} className="inline-flex items-center justify-center px-10 py-5 rounded-full font-sans text-base font-medium text-white/80 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-[0.97]">
                {ctaSecondary.text}
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
};

export default BackgroundHero;
