import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin } from "lucide-react";

const staedte = [
  { slug: "muenchen", name: "München" },
  { slug: "berlin", name: "Berlin" },
  { slug: "hamburg", name: "Hamburg" },
  { slug: "frankfurt", name: "Frankfurt" },
  { slug: "koeln", name: "Köln" },
  { slug: "stuttgart", name: "Stuttgart" },
  { slug: "nuernberg", name: "Nürnberg" },
  { slug: "duesseldorf", name: "Düsseldorf" },
  { slug: "hannover", name: "Hannover" },
  { slug: "regensburg", name: "Regensburg" },
  { slug: "augsburg", name: "Augsburg" },
  { slug: "dortmund", name: "Dortmund" },
  { slug: "dresden", name: "Dresden" },
  { slug: "leipzig", name: "Leipzig" },
  { slug: "bremen", name: "Bremen" },
  { slug: "wuerzburg", name: "Würzburg" },
];

const StadtLinks = ({ headline = "Zauberer in deiner Stadt." }: { headline?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-medium" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-6 inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Bundesweit
          </span>
          <h2 className="headline-sub text-foreground">{headline}</h2>
          <p className="text-detail max-w-xl mx-auto mt-3">Ich trete in ganz Deutschland und Österreich auf — hier findest du stadtspezifische Infos für dein Event.</p>
        </div>
        <div className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {staedte.map((s) => (
            <Link
              key={s.slug}
              to={`/zauberer/${s.slug}`}
              className="font-sans text-sm text-muted-foreground hover:text-accent transition-colors px-4 py-2 rounded-full bg-muted/40 hover:bg-accent/5 border border-border/30"
            >
              Zauberer {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StadtLinks;
