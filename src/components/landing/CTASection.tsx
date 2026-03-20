import stageImg from "@/assets/stage-show.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="kontakt" className="relative py-32 md:py-40 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <img src={stageImg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/60" />
      </div>
      <div className="relative z-10 container px-6 text-center">
        <div className={`max-w-2xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: "hsl(var(--section-dark-foreground))" }}>
            Mach dein Event unvergesslich.
          </h2>
          <p className="font-sans text-lg md:text-xl mb-10" style={{ color: "hsla(0,0%,100%,0.7)" }}>
            Erzähl mir von deinem Event — ich entwickle ein maßgeschneidertes Konzept für dich.
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

export default CTASection;
