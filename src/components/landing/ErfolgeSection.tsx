import { Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote: "Emilian hat unsere Firmenfeier zu einem unvergesslichen Abend gemacht. Die Gäste reden heute noch davon!",
    author: "Thomas K.",
    role: "Geschäftsführer, Automobilbranche",
  },
  {
    quote: "So eine intime, verblüffende Magie habe ich noch nie erlebt. Perfekt für unseren Empfang.",
    author: "Sarah M.",
    role: "Eventmanagerin",
  },
  {
    quote: "Cool, modern, witzig — genau unser Ding. Emilian passt sich perfekt an jedes Publikum an.",
    author: "Marc L.",
    role: "Marketing Director",
  },
];

const ErfolgeSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="referenzen" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        {/* Big stat line */}
        <div className={`max-w-4xl mx-auto text-center mb-28 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Referenzen</span>
          <h2 className="headline-section text-foreground mb-12">
            Das sagen Kunden.
          </h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {[
              { value: "500+", label: "Auftritte" },
              { value: "4.9 ★", label: "Bewertung" },
              { value: "10+", label: "Jahre" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl italic text-foreground tabular-nums">{stat.value}</p>
                <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`p-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.25 + i * 0.1}s` }}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary/60 text-primary/60" />
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
