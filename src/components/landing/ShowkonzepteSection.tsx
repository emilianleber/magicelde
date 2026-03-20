import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const shows = [
  {
    img: closeupImg,
    title: "Close-Up Magic",
    desc: "Direkt vor deinen Augen, direkt in deinen Händen. Interaktive Magie, die unter die Haut geht — perfekt für Empfänge, Dinner und kleinere Runden.",
    tag: "Am beliebtesten",
  },
  {
    img: stageImg,
    title: "Bühnen-Show",
    desc: "Für den großen Moment: Eine durchkomponierte Show mit Dramaturgie, Humor und Wow-Effekten — ideal für Galas, Firmenfeiern und große Events.",
    tag: "Für große Events",
  },
  {
    img: heroImg,
    title: "Walking Act",
    desc: "Ich bewege mich frei durch dein Event und verzaubere Gäste spontan und persönlich — perfektes Icebreaker-Entertainment.",
    tag: "Flexibel einsetzbar",
  },
];

const ShowkonzepteSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="showkonzepte" className="py-24 md:py-32 section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-5 inline-flex">Showkonzepte</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Drei Formate, ein Versprechen
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {shows.map((show, i) => (
            <div
              key={show.title}
              className={`group bg-background rounded-2xl overflow-hidden border border-border hover:shadow-[0_12px_48px_hsla(0,0%,0%,0.08)] transition-all duration-500 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={show.img}
                  alt={show.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge-primary">
                    {show.tag}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl italic text-foreground mb-3">
                  {show.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {show.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowkonzepteSection;
