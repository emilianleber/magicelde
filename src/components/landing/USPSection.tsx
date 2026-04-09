import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Users, Laugh, Target } from "lucide-react";

const usps = [
  {
    icon: Laugh,
    title: "Comedy trifft Magie",
    desc: "Meine Shows sind kein verstaubter Zaubertrick-Marathon. Sie verbinden moderne Zauberkunst mit cleverem Humor — unterhaltsam, überraschend und immer auf Augenhöhe mit dem Publikum.",
  },
  {
    icon: Users,
    title: "Interaktiv & persönlich",
    desc: "Deine Gäste sind nicht nur Zuschauer — sie werden Teil der Show. Jeder Moment ist interaktiv, jede Performance persönlich. Das schafft Verbindung und macht den Abend einzigartig.",
  },
  {
    icon: Target,
    title: "Individuell konzipiert",
    desc: "Kein Auftritt gleicht dem anderen. Jede Show wird individuell auf deinen Anlass, dein Publikum und deine Vorstellungen abgestimmt — vom ersten Kontakt bis zum letzten Applaus.",
  },
  {
    icon: Sparkles,
    title: "Premium-Qualität",
    desc: "Über 200 erfolgreiche Auftritte, Finalist bei Talents of Magic und Erfahrung auf Bühnen jeder Größe. Professionell in der Planung, brillant in der Performance.",
  },
];

const USPSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Warum MagicEL</span>
          <h2 className="headline-section text-foreground mb-6">
            Nicht irgendein Zauberer.
          </h2>
          <p className="text-body max-w-xl mx-auto">
            Ich stehe für moderne Zauberkunst mit Comedy-Faktor — Entertainment,
            das Menschen nicht nur unterhält, sondern wirklich verbindet.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto`}>
          {usps.map((item, i) => (
            <div
              key={item.title}
              className={`group p-8 rounded-3xl bg-muted/40 hover:bg-muted/70 transition-all duration-500 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              <item.icon className="w-8 h-8 text-accent mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
