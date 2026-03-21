import heroImg from "@/assets/hero-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = [
  { src: heroImg, alt: "Close-Up Performance", className: "col-span-2 row-span-2" },
  { src: audienceImg, alt: "Begeistertes Publikum", className: "" },
  { src: stageImg, alt: "Bühnenshow", className: "" },
  { src: closeupImg, alt: "Kartenmagie hautnah", className: "" },
  { src: portraitImg, alt: "Emilian Leber", className: "" },
];

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">
            Eindrücke.
          </h2>
        </div>
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          style={{ animationDelay: "0.15s" }}
        >
          {images.map((img, i) => (
            <div key={i} className={`${img.className} rounded-2xl overflow-hidden`}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalerieSection;
