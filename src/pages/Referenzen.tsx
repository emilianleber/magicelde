import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Star } from "lucide-react";
import heroImg from "@/assets/hero-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import corporateImg from "@/assets/corporate-event.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";

const HeroRef = () => (
  <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Referenzen</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Das sagen Kunden.
        </h1>
        <p className="text-body max-w-lg mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Über 500 Events. 4.9 Sterne. Echte Stimmen.
        </p>
      </div>
    </div>
  </section>
);

const StatsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="pb-24" ref={ref}>
      <div className="container px-6">
        <div className={`flex flex-wrap justify-center gap-12 md:gap-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { value: "500+", label: "Auftritte" },
            { value: "4.9 ★", label: "Durchschnitt" },
            { value: "10+", label: "Jahre" },
            { value: "100%", label: "Weiterempfehlung" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl italic text-foreground tabular-nums">{stat.value}</p>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  { quote: "Emilian hat unsere Firmenfeier zu einem unvergesslichen Abend gemacht. Die Gäste reden heute noch davon!", author: "Thomas K.", role: "Geschäftsführer, Automobilbranche" },
  { quote: "So eine intime, verblüffende Magie habe ich noch nie erlebt. Perfekt für unseren Empfang.", author: "Sarah M.", role: "Eventmanagerin" },
  { quote: "Cool, modern, witzig — genau unser Ding.", author: "Marc L.", role: "Marketing Director" },
  { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang.", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
  { quote: "Die perfekte Balance zwischen Eleganz und Unterhaltung.", author: "Julia & Thomas", role: "Hochzeit am Bodensee" },
  { quote: "Professionell, zuverlässig, unglaublich unterhaltsam.", author: "Katrin W.", role: "Head of Events, Automotive" },
  { quote: "Die Mitarbeiter fragen Monate vorher, ob er wieder kommt.", author: "Michael B.", role: "HR Director, Finance" },
  { quote: "Mein 30. war dank Emilian ein Abend, den keiner vergisst.", author: "Lisa R.", role: "Geburtstagsfeier" },
  { quote: "Wir können es jedem Brautpaar empfehlen!", author: "Anna & Felix", role: "Hochzeit in Stuttgart" },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Echte Stimmen.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={`p-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-primary/60 text-primary/60" />)}
              </div>
              <p className="font-sans text-base text-foreground leading-relaxed mb-5">„{t.quote}"</p>
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

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    { src: heroImg, alt: "Live Performance", className: "col-span-2 row-span-2" },
    { src: audienceImg, alt: "Publikum" },
    { src: corporateImg, alt: "Corporate Event" },
    { src: weddingImg, alt: "Hochzeit" },
    { src: stageImg, alt: "Bühne" },
  ];
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Eindrücke.</h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {images.map((img, i) => (
            <div key={i} className={`${img.className || ""} rounded-2xl overflow-hidden`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Referenzen = () => (
  <PageLayout>
    <HeroRef />
    <StatsSection />
    <TestimonialsSection />
    <GalerieSection />
    <BookingCTA headline={"Überzeugt?"} subline="Werde Teil der Liste — lass uns über dein Event sprechen." />
  </PageLayout>
);

export default Referenzen;
