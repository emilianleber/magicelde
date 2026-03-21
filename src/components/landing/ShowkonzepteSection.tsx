import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const shows = [
  {
    img: closeupImg,
    title: "Close-Up",
    sub: "Direkt vor deinen Augen",
    desc: "Interaktive Magie in deinen Händen — perfekt für Empfänge und kleinere Runden.",
  },
  {
    img: stageImg,
    title: "Bühnen-Show",
    sub: "Für den großen Moment",
    desc: "Durchkomponierte Show mit Dramaturgie, Humor und Wow-Effekten.",
  },
  {
    img: heroImg,
    title: "Walking Act",
    sub: "Spontan und persönlich",
    desc: "Frei durch dein Event — der perfekte Icebreaker.",
  },
];

const ShowkonzepteSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="showkonzepte" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground">
            Drei Erlebnisse.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {shows.map((show, i) => (
            <div
              key={show.title}
              className={`group relative rounded-[2rem] overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <img
                src={show.img}
                alt={show.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Light gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-2">{show.sub}</p>
                <h3 className="font-display text-3xl md:text-4xl italic text-white mb-3">{show.title}</h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed max-w-xs">{show.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowkonzepteSection;
