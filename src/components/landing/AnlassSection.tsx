import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const anlaesse = [
  { title: "Firmenfeiern", desc: "Professionelles Entertainment, das Ihr Event aufwertet.", link: "/firmenfeiern" },
  { title: "Hochzeiten", desc: "Staunen statt Small Talk — der perfekte Eisbrecher.", link: "/hochzeit" },
  { title: "Geburtstage", desc: "Ein Highlight, über das alle reden.", link: null },
  { title: "Galas & Events", desc: "Elegante Magie, die zum Anlass passt.", link: null },
  { title: "Messen", desc: "Dein Stand wird zum Magneten.", link: null },
];

const AnlassSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="anlaesse" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground">
            Für jeden Anlass.
          </h2>
        </div>

        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {anlaesse.map((item) => {
            const inner = (
              <div className="flex items-center justify-between py-7 group cursor-pointer">
                <div>
                  <h3 className="font-display text-xl md:text-2xl italic text-foreground group-hover:text-foreground/70 transition-colors">{item.title}</h3>
                  <p className="text-detail mt-1">{item.desc}</p>
                </div>
                <span className="font-sans text-sm text-muted-foreground/50 group-hover:text-foreground transition-colors">→</span>
              </div>
            );

            return item.link ? (
              <Link key={item.title} to={item.link}>{inner}</Link>
            ) : (
              <a key={item.title} href="#kontakt">{inner}</a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnlassSection;
