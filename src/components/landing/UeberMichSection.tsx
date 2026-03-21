import portraitImg from "@/assets/magician-portrait.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const UeberMichSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="ueber-mich" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img
                src={portraitImg}
                alt="Emilian Leber — MagicEL, Comedy-Zauberer"
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-accent mb-8 inline-flex">Über mich</span>
            <h2 className="headline-section text-foreground mb-6">
              Hi, ich bin Emilian.
            </h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Moderner Comedy-Zauberer, Showkünstler und kreativer Kopf hinter MagicEL.
              </p>
              <p>
                Seit über zehn Jahren bringe ich Menschen zum Staunen — und zum Lachen.
                Nicht mit Zylinder und Kaninchen, sondern mit einer einzigartigen Mischung
                aus moderner Zauberkunst, Psychologie und cleverem Humor.
              </p>
              <p>
                Für mich ist jeder Auftritt eine Geschichte, die ich gemeinsam mit dem Publikum
                erzähle. Interaktiv, persönlich und immer mit dem Ziel, Momente zu schaffen,
                die Menschen verbinden.
              </p>
              <p className="text-foreground font-medium">
                Finalist bei Talents of Magic · 500+ Events · 10+ Jahre Bühnenerfahrung
              </p>
            </div>
            <Link to="/ueber-mich" className="btn-secondary mt-8 !px-0 text-accent hover:!text-accent/70">
              Mehr erfahren →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UeberMichSection;
