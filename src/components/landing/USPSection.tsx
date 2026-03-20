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
    <section className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Warum MagicEL</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Magie auf einem neuen Level
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className={`group rounded-xl bg-card p-8 shadow-[0_2px_12px_hsla(0,0%,0%,0.04)] hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.08)] transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <usp.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{usp.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{usp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
