import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      className="section-dark section-full overflow-hidden"
      ref={ref}
      style={{
        background: "radial-gradient(ellipse at 50% 0%, hsl(225 80% 20% / 0.5) 0%, #08080d 70%)",
      }}
    >
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.92] tracking-[-0.03em] mb-8">
            Mach dein Event<br />
            <span className="text-gradient">unvergesslich</span>.
          </h2>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-lg mx-auto mb-12 leading-relaxed">
            Erzähl mir von deinem Event — ich entwickle ein maßgeschneidertes Konzept
            aus Comedy, Magie und Interaktion, das deine Gäste begeistert.
          </p>
          <Link to="/buchung" className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-base font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group">
            Jetzt unverbindlich anfragen
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="font-sans text-xs text-white/20 mt-6 tracking-wide">
            Kostenlos · Unverbindlich · Antwort innerhalb 24h
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
