import { Building2, Heart, Cake, Award, PartyPopper } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const anlaesse = [
  { icon: Building2, title: "Firmenfeiern", desc: "Teamevents, Jubiläen, Kundenevents — professionelles Entertainment, das verbindet." },
  { icon: Heart, title: "Hochzeiten", desc: "Der perfekte Eisbrecher für den Empfang — Staunen statt Small Talk." },
  { icon: Cake, title: "Geburtstage", desc: "Vom 30. bis zum 80. — ein Highlight, über das alle reden." },
  { icon: Award, title: "Galas & Bälle", desc: "Elegante Close-Up-Magie, die zum Anlass passt." },
  { icon: PartyPopper, title: "Messen & Promotions", desc: "Aufmerksamkeit generieren — dein Stand wird zum Magneten." },
];

const AnlassSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="anlaesse" className="py-24 md:py-32" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-5 inline-flex">Einsatzbereiche</span>
          <h2 className="font-display text-3xl md:text-5xl italic text-foreground leading-tight">
            Für jeden Anlass das richtige Konzept
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {anlaesse.map((item, i) => (
            <div
              key={item.title}
              className={`group flex items-start gap-5 rounded-2xl border border-border p-6 hover:shadow-[0_8px_32px_hsla(0,0%,0%,0.05)] transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-light flex items-center justify-center group-hover:scale-[1.05] transition-transform">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg italic text-foreground mb-1">{item.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnlassSection;
