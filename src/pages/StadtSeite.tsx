import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staedte } from "@/data/staedte";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import { Star } from "lucide-react";

const StadtSeite = () => {
  const { stadt } = useParams<{ stadt: string }>();
  const data = staedte.find((s) => s.slug === stadt);

  if (!data) return <Navigate to="/404" replace />;

  return (
    <PageLayout>
      <HeroStadt name={data.name} intro={data.intro} />
      <HighlightSection name={data.name} highlight={data.highlight} />
      <LeistungenSection name={data.name} />
      <TestimonialStadt name={data.name} />
      <ProcessSteps />
      <BookingCTA
        headline={`Zauberer für ${data.name}.`}
        subline={`Sichere dir deinen Termin in ${data.name} — ich berate dich persönlich.`}
      />
      <WeitereStaedte current={data.slug} />
    </PageLayout>
  );
};

const HeroStadt = ({ name, intro }: { name: string; intro: string }) => (
  <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Zauberer {name}</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Zauberer in {name}.
        </h1>
        <p className="text-body max-w-xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          {intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <Link to="/buchung" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97]">
            Jetzt anfragen
          </Link>
        </div>
      </div>
      <div className="relative rounded-[2rem] overflow-hidden max-w-5xl mx-auto mt-16 opacity-0 animate-fade-up" style={{ animationDelay: "0.9s" }}>
        <img src={heroImg} alt={`Zauberer in ${name}`} className="w-full h-[420px] md:h-[560px] object-cover" />
      </div>
    </div>
  </section>
);

const HighlightSection = ({ name, highlight }: { name: string; highlight: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-8">Warum {name}?</h2>
          <p className="text-body max-w-xl mx-auto mb-8">{highlight}</p>
        </div>
      </div>
    </section>
  );
};

const LeistungenSection = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const konzepte = [
    { img: closeupImg, title: "Close-Up", desc: `Interaktive Magie direkt bei deinen Gästen in ${name}.` },
    { img: stageImg, title: "Bühnenshow", desc: `Eine durchkomponierte Show für dein Event in ${name}.` },
    { img: heroImg, title: "Magic Dinner", desc: `Dinner und Magie vereint — ein exklusives Erlebnis in ${name}.` },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-blue mb-8 inline-flex">Leistungen</span>
          <h2 className="headline-section text-foreground">Showkonzepte für {name}.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {konzepte.map((k, i) => (
            <div key={k.title} className={`group relative rounded-[2rem] overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <img src={k.img} alt={k.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-3xl md:text-4xl italic text-white mb-3">{k.title}</h3>
                <p className="font-sans text-sm text-white/70 leading-relaxed max-w-xs">{k.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialStadt = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-12">Kundenstimmen.</h2>
          <blockquote className="mt-8">
            <div className="flex gap-0.5 justify-center mb-5">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary/60 text-primary/60" />)}
            </div>
            <p className="font-sans text-lg text-foreground leading-relaxed mb-6">
              „Emilian hat unser Event in {name} unvergesslich gemacht. Professionell, charmant und unglaublich verblüffend."
            </p>
            <footer>
              <p className="font-sans text-sm font-semibold text-foreground">Begeisterter Kunde</p>
              <p className="font-sans text-xs text-muted-foreground">Event in {name}</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

const WeitereStaedte = ({ current }: { current: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const others = staedte.filter((s) => s.slug !== current).slice(0, 6);

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-sub text-foreground">Auch in deiner Stadt.</h2>
        </div>
        <div className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {others.map((s) => (
            <Link key={s.slug} to={`/zauberer/${s.slug}`} className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-full bg-muted/50 hover:bg-muted">
              {s.name}
            </Link>
          ))}
          <Link to="/kontakt" className="font-sans text-sm text-primary hover:text-primary/70 transition-colors px-4 py-2">
            Alle Städte →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StadtSeite;
