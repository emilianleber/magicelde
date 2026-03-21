import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const shows = [
  {
    img: closeupImg,
    title: "Close-Up Magie",
    sub: "Hautnah · Interaktiv · Verblüffend",
    desc: "Magie direkt in den Händen deiner Gäste. Perfekt für Empfänge, Dinner und Networking — der ultimative Gesprächsstarter.",
    link: "/close-up",
  },
  {
    img: stageImg,
    title: "Bühnenshow",
    sub: "Durchkomponiert · Mitreißend · Unvergesslich",
    desc: "Eine inszenierte Show mit Dramaturgie, Comedy und Wow-Momenten. Das zentrale Highlight für große Events und Galas.",
    link: "/buehnenshow",
  },
  {
    img: heroImg,
    title: "Magic Dinner",
    sub: "Exklusiv · Persönlich · Genussvoll",
    desc: "Magie zwischen den Gängen — interaktive Tischmagie, die ein Dinner zum unvergesslichen Erlebnis macht.",
    link: "/magic-dinner",
  },
];

const ShowkonzepteSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="showkonzepte" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground mb-6">
            Drei Erlebnisse. Ein Versprechen.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Jedes Format ist einzigartig — und wird individuell auf dein Event abgestimmt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {shows.map((show, i) => (
            <Link
              key={show.title}
              to={show.link}
              className={`group relative rounded-3xl overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <img
                src={show.img}
                alt={show.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-background" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-background/50 mb-3">{show.sub}</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-3">{show.title}</h3>
                <p className="font-sans text-sm text-background/70 leading-relaxed max-w-xs">{show.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowkonzepteSection;
