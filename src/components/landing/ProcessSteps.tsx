import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  { num: "01", title: "Anfrage senden", desc: "Erzähl mir kurz von deinem Event — Datum, Anlass, Wünsche. Komplett unverbindlich und kostenlos." },
  { num: "02", title: "Persönliche Beratung", desc: "Wir sprechen telefonisch oder per Video über den Ablauf, das passende Format und deine Vorstellungen." },
  { num: "03", title: "Konzept & Angebot", desc: "Du erhältst ein individuelles Angebot mit einem maßgeschneiderten Showkonzept für dein Event." },
  { num: "04", title: "Showtime", desc: "Am Tag deines Events sorge ich für Staunen, Lachen und Momente, über die alle noch lange reden." },
];

const ProcessSteps = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground">So einfach geht's.</h2>
          <p className="text-body mt-6 max-w-lg mx-auto">
            Von der ersten Idee bis zum Standing Ovation — in vier klaren Schritten.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {steps.map((s, i) => (
            <div key={s.num} className="relative p-6 rounded-2xl bg-background hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <span className="font-display text-5xl font-bold text-accent/15">{s.num}</span>
              <h3 className="font-display text-lg font-bold text-foreground mt-3 mb-3">{s.title}</h3>
              <p className="text-detail text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className={`text-center mt-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <Link to="/buchung" className="btn-primary group">
            Jetzt anfragen
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
