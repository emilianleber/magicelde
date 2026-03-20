import { useScrollReveal } from "@/hooks/useScrollReveal";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="kontakt" className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center rounded-[2rem] bg-muted/60 px-8 py-20 md:px-16 md:py-28 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Jetzt starten</span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic leading-tight mb-6 text-foreground">
            Mach dein Event unvergesslich.
          </h2>
          <p className="font-sans text-lg md:text-xl mb-10 text-muted-foreground font-light max-w-lg mx-auto">
            Erzähl mir von deinem Event — ich entwickle ein maßgeschneidertes Konzept für dich.
          </p>
          <a
            href="mailto:kontakt@magicel.de"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground font-sans text-base font-medium text-background transition-all duration-200 hover:bg-foreground/85 hover:shadow-[0_12px_48px_hsla(0,0%,0%,0.15)] active:scale-[0.97]"
          >
            Jetzt unverbindlich anfragen
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
