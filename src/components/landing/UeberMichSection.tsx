import portraitImg from "@/assets/magician-portrait.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const UeberMichSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="ueber-mich" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-[2rem] overflow-hidden">
              <img
                src={portraitImg}
                alt="Emilian Leber — MagicEL"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-muted mb-8 inline-flex">Über mich</span>
            <h2 className="headline-section text-foreground mb-8">
              Hi, ich bin Emilian.
            </h2>
            <div className="space-y-6 text-detail max-w-lg">
              <p>
                Seit über zehn Jahren stehe ich auf Bühnen und bringe Menschen zum Staunen.
                Nicht mit Zylinder und Kaninchen — sondern mit moderner, interaktiver Magie.
              </p>
              <p>
                Für mich ist Zauberei Kunst — eine Mischung aus Psychologie, Kreativität
                und Performance. Jeder Auftritt ist persönlich.
              </p>
              <p className="text-foreground font-medium">
                Finalist bei Talents of Magic. Hunderte Auftritte. Über 10 Jahre Erfahrung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UeberMichSection;
