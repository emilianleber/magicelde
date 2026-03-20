import { Trophy, Star, Tv, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { icon: Users, value: "500+", label: "Auftritte" },
  { icon: Trophy, value: "Finalist", label: "Talents of Magic" },
  { icon: Star, value: "4.9", label: "Kundenbewertung" },
  { icon: Tv, value: "TV & Bühne", label: "Erfahrung" },
];

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
    <section id="referenzen" className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-primary mb-4">Erfolge & Referenzen</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Zahlen, die überzeugen
          </h2>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-card shadow-[0_2px_12px_hsla(0,0%,0%,0.04)]">
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-display text-3xl md:text-4xl font-bold text-foreground tabular-nums">{stat.value}</p>
              <p className="font-sans text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className={`rounded-xl border border-border bg-card p-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.25 + i * 0.1}s` }}
            >
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
