import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const steps = [
  { num: "01", title: "Anfrage", desc: "Erzähle mir von deinem Event — unverbindlich und kostenlos." },
  { num: "02", title: "Beratung", desc: "Wir besprechen Ablauf, Wünsche und das passende Konzept." },
  { num: "03", title: "Erlebnis", desc: "Am Tag deines Events liefere ich eine unvergessliche Show." },
];

const ProcessSteps = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">So funktioniert's</span>
          <h2 className="headline-section text-foreground">Drei Schritte.</h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-12 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <span className="font-display text-6xl italic text-muted-foreground/20">{s.num}</span>
              <h3 className="font-display text-2xl italic text-foreground mt-2 mb-3">{s.title}</h3>
              <p className="text-detail">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className={`text-center mt-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          <Link
            to="/buchung"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97]"
          >
            Jetzt anfragen
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
