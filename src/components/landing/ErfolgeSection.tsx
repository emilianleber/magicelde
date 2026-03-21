import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";

const testimonials = [
  {
    quote: "Emilian hat unsere Firmenfeier zu einem unvergesslichen Abend gemacht. Die Gäste reden heute noch davon — und wir buchen ihn jedes Jahr wieder!",
    author: "Thomas K.",
    role: "Geschäftsführer, Automobilbranche",
  },
  {
    quote: "Cool, modern, witzig und absolut verblüffend. Kein verstaubter Zauberer, sondern echtes Premium-Entertainment.",
    author: "Marc L.",
    role: "Marketing Director",
  },
  {
    quote: "Die perfekte Balance zwischen Eleganz, Humor und Staunen. Emilian hat sich nahtlos in unseren Abend eingefügt.",
    author: "Sarah M.",
    role: "Eventmanagerin",
  },
];

const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end, 2000);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">
        {count}{suffix}
      </p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const ErfolgeSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="referenzen" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        {/* Animated counters */}
        <div className={`max-w-4xl mx-auto text-center mb-28 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Erfahrung</span>
          <h2 className="headline-section text-foreground mb-16">
            Zahlen, die sprechen.
          </h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-24">
            <StatItem end={500} suffix="+" label="Auftritte" />
            <StatItem end={10} suffix="+" label="Jahre" />
            <StatItem end={100} suffix="%" label="Weiterempfehlung" />
          </div>
        </div>

        {/* Testimonials */}
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <h3 className="headline-sub text-foreground">Was Kunden sagen.</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`p-8 rounded-3xl bg-background ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-accent/70 text-accent/70" />
                ))}
              </div>
              <p className="font-sans text-base text-foreground leading-relaxed mb-6">„{t.quote}"</p>
              <footer>
                <p className="font-sans text-sm font-semibold text-foreground">{t.author}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ErfolgeSection;
