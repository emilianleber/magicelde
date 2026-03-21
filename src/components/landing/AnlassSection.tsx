import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Heart, PartyPopper, Trophy, Presentation } from "lucide-react";

const anlaesse = [
  { icon: Building2, title: "Firmenfeiern & Corporate Events", desc: "Entertainment, das Ihr Business-Event aufwertet, Networking fördert und einen bleibenden Eindruck hinterlässt. Von der Jahresfeier bis zur Kundenveranstaltung.", link: "/firmenfeiern" },
  { icon: Heart, title: "Hochzeiten", desc: "Der perfekte Eisbrecher für euren großen Tag. Magie, die fremde Gäste verbindet und Momente schafft, über die alle noch lange reden.", link: "/hochzeit" },
  { icon: PartyPopper, title: "Geburtstage & Private Feiern", desc: "Das Highlight, das jeden Geburtstag zum Event macht — persönlich, witzig und absolut unvergesslich.", link: "/geburtstage" },
  { icon: Trophy, title: "Galas & Awards", desc: "Elegantes Entertainment auf höchstem Niveau. Perfekt inszeniert für besondere Anlässe, die beeindrucken sollen.", link: "/buchung" },
  { icon: Presentation, title: "Messen & Promotions", desc: "Magie, die Aufmerksamkeit erzeugt und euren Stand zum Magneten macht. Interaktiv, einprägsam, wirkungsvoll.", link: "/buchung" },
];

const AnlassSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="anlaesse" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground mb-6">
            Für jeden Anlass das richtige Erlebnis.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Ob Firmenfeier, Hochzeit oder Gala — jedes Event bekommt ein individuelles Konzept,
            das perfekt zum Anlass und zum Publikum passt.
          </p>
        </div>

        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {anlaesse.map((item) => (
            <Link key={item.title} to={item.link} className="group">
              <div className="flex items-start gap-5 py-8">
                <item.icon className="w-6 h-6 text-accent shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <h3 className="font-display text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-1">{item.title}</h3>
                  <p className="text-detail">{item.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 shrink-0 mt-1 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnlassSection;
