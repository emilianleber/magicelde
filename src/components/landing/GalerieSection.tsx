import heroImg from "@/assets/hero-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = [
  { src: heroImg, alt: "Close-Up Performance bei einem Event", className: "col-span-2 row-span-2" },
  { src: audienceImg, alt: "Begeistertes Publikum", className: "col-span-1 row-span-1" },
  { src: stageImg, alt: "Bühnenshow mit dramatischer Beleuchtung", className: "col-span-1 row-span-1" },
  { src: closeupImg, alt: "Kartenmagie hautnah", className: "col-span-1 row-span-1" },
  { src: portraitImg, alt: "Emilian Leber Portrait", className: "col-span-1 row-span-1" },
];

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-5 inline-flex">Eindrücke</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Momente, die bleiben
          </h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
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
