import { Building2, Heart, Cake, Award, PartyPopper } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const anlaesse = [
  { icon: Building2, title: "Firmenfeiern", desc: "Teamevents, Jubiläen, Kundenevents — professionelles Entertainment, das verbindet.", badge: "BUSINESS", link: "/firmenfeiern" },
  { icon: Heart, title: "Hochzeiten", desc: "Der perfekte Eisbrecher für den Empfang — Staunen statt Small Talk.", badge: "HOCHZEIT", link: "/hochzeit" },
  { icon: Cake, title: "Geburtstage", desc: "Vom 30. bis zum 80. — ein Highlight, über das alle reden.", badge: "PRIVAT", link: null },
  { icon: Award, title: "Galas & Bälle", desc: "Elegante Close-Up-Magie, die zum Anlass passt.", badge: "EVENT", link: null },
  { icon: PartyPopper, title: "Messen & Promotions", desc: "Aufmerksamkeit generieren — dein Stand wird zum Magneten.", badge: "BUSINESS", link: null },
];

const AnlassSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="anlaesse" className="py-28 md:py-36" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-6 inline-flex">Einsatzbereiche</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Für jeden Anlass das richtige Konzept
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {anlaesse.map((item, i) => (
            <div
              key={item.title}
              className={`group rounded-3xl bg-muted/50 p-8 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.06)] transition-all duration-500 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <span className="badge-gradient text-[10px] mb-5 inline-flex">{item.badge}</span>
              <h3 className="font-display text-2xl italic text-foreground mb-3">{item.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">{item.desc}</p>
              {item.link ? (
                <Link
                  to={item.link}
                  className="font-sans text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Mehr zu {item.title} →
                </Link>
              ) : (
                <a
                  href="#kontakt"
                  className="font-sans text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  Mehr erfahren →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnlassSection;
