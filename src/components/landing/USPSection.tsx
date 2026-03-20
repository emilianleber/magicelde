import { Sparkles, Users, Lightbulb, Laugh } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const usps = [
  { icon: Sparkles, title: "Interaktiv", desc: "Deine Gäste sind Teil der Show — nicht nur Zuschauer." },
  { icon: Lightbulb, title: "Individuell", desc: "Jede Show wird an dein Event angepasst — kein Programm von der Stange." },
  { icon: Users, title: "Professionell", desc: "Hunderte erfolgreiche Auftritte, von Firmenevents bis private Feiern." },
  { icon: Laugh, title: "Humorvoll", desc: "Entertainment mit Charme und Witz — keine verstaubte Bühnenmagie." },
];

const USPSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-5 inline-flex">Warum MagicEL</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Magie auf einem neuen Level
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className={`group rounded-2xl bg-background border border-border p-8 hover:shadow-[0_8px_40px_hsla(0,0%,0%,0.06)] transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-blue-light flex items-center justify-center mb-5 group-hover:scale-[1.05] transition-transform duration-300">
                <usp.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl italic text-foreground mb-2">{usp.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
