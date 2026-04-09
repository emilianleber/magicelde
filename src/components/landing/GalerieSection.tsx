import heroImg from "@/assets/hero-magic.jpg";
import staunenImg from "@/assets/staunen.jpg";
import stageImg from "@/assets/stage-show.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import zuschBlauImg from "@/assets/zuschauer-blau.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = [
  {
    src: heroImg,
    alt: "Zauberer bei einer Close-Up Performance",
    className: "col-span-2 row-span-2",
    imgClassName: "object-center",
  },
  {
    src: staunenImg,
    alt: "Staunende Gäste bei einer Zaubershow",
    className: "",
    imgClassName: "object-center",
  },
  {
    src: stageImg,
    alt: "Zauberer auf der Bühne vor Publikum",
    className: "",
    imgClassName: "object-[center_top]",
  },
  {
    src: buehneZuschauerImg,
    alt: "Publikum und Atmosphäre bei einer Live-Show",
    className: "",
    imgClassName: "object-center",
  },
  {
    src: portraitImg,
    alt: "Emilian Leber als Zauberer bei einem Event",
    className: "",
    imgClassName: "object-[center_top]",
  },
  {
    src: zuschBlauImg,
    alt: "Zuschauer in blauem Bühnenlicht",
    className: "",
    imgClassName: "object-center",
  },
  {
    src: dinnerBuehneImg,
    alt: "Magic Dinner Bühnenperformance",
    className: "",
    imgClassName: "object-center",
  },
];

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <span className="badge-muted mb-8 inline-flex">Impressionen</span>
          <h2 className="headline-section text-foreground mb-6">
            Momente, die bleiben.
          </h2>
          <p className="text-body max-w-lg mx-auto">
            Echte Reaktionen, echte Emotionen — ein Blick hinter die Kulissen
            von Shows, Events und Live-Performances.
          </p>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`${img.className} rounded-2xl overflow-hidden group`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover ${img.imgClassName} group-hover:scale-[1.04] transition-transform duration-700`}
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