import portraitImg from "@/assets/magician-portrait.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const UeberMichSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="ueber-mich" className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img
                src={portraitImg}
                alt="Emilian Leber — MagicEL"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-blue mb-5 inline-flex">Über mich</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl italic text-foreground leading-tight mb-6">
              Hi, ich bin Emilian.
            </h2>
            <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed max-w-lg">
              <p>
                Seit über zehn Jahren stehe ich auf Bühnen, bewege mich durch Events und
                bringe Menschen zum Staunen. Nicht mit dem klassischen Zylinder-und-Kaninchen-Klischee,
                sondern mit moderner, interaktiver Magie, die man so nicht erwartet.
              </p>
              <p>
                Für mich ist Zauberei Kunst — eine Mischung aus Psychologie, Kreativität und
                Performance. Jeder Auftritt ist eine persönliche Erfahrung, kein Programm aus dem Katalog.
              </p>
              <p>
                Als Finalist bei <span className="font-semibold text-foreground">Talents of Magic</span> und
                mit Auftritten vor tausenden Zuschauern verbinde ich Leidenschaft mit Professionalität.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UeberMichSection;
