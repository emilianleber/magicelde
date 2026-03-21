import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import portraitImg from "@/assets/magician-portrait.jpg";
import stageImg from "@/assets/stage-show.jpg";

const HeroPresse = () => (
  <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Presse</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          MagicEL in den Medien.
        </h1>
        <p className="text-body max-w-lg mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Auftritte, Erwähnungen und Pressematerial.
        </p>
      </div>
    </div>
  </section>
);

const AufritteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-12">Auftritte & Erwähnungen.</h2>
          <div className="divide-y divide-border">
            {[
              { title: "Talents of Magic", desc: "Finalist im renommierten Nachwuchswettbewerb für Zauberkunst.", year: "2024" },
              { title: "TV-Auftritte", desc: "Verschiedene Fernsehformate und Showauftritte.", year: "2023" },
              { title: "Corporate Events", desc: "Auftritte bei führenden DAX-Unternehmen und internationalen Konzernen.", year: "Laufend" },
              { title: "Hochzeitsmessen", desc: "Live-Performances auf den größten Hochzeitsmessen Süddeutschlands.", year: "Laufend" },
            ].map((item) => (
              <div key={item.title} className="py-7 flex items-start justify-between gap-8">
                <div>
                  <h3 className="font-display text-xl md:text-2xl italic text-foreground">{item.title}</h3>
                  <p className="text-detail mt-1">{item.desc}</p>
                </div>
                <span className="font-sans text-xs text-muted-foreground shrink-0 mt-2">{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PressekitSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-28 items-center max-w-5xl mx-auto">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-[2rem] overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — Pressefoto" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <h2 className="headline-sub text-foreground mb-8">Pressekit.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p>
                <strong className="text-foreground">Name:</strong> Emilian Leber
              </p>
              <p>
                <strong className="text-foreground">Künstlername:</strong> MagicEL
              </p>
              <p>
                <strong className="text-foreground">Genre:</strong> Moderner Zauberkünstler, Close-Up & Bühnenmagie
              </p>
              <p>
                <strong className="text-foreground">Erfahrung:</strong> 10+ Jahre, 500+ Events, Finalist Talents of Magic
              </p>
              <p className="pt-4">
                Für hochauflösende Pressefotos, Interviews oder Presseanfragen kontaktieren Sie mich bitte direkt.
              </p>
            </div>
            <a
              href="mailto:presse@magicel.de"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97] mt-8"
            >
              Presseanfrage senden
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FotosSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Pressefotos.</h2>
          <p className="text-detail mt-4">Zur freien Verwendung bei redaktioneller Berichterstattung.</p>
        </div>
        <div className={`grid md:grid-cols-2 gap-4 max-w-4xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="rounded-[2rem] overflow-hidden aspect-[4/3]">
            <img src={portraitImg} alt="Portrait" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="rounded-[2rem] overflow-hidden aspect-[4/3]">
            <img src={stageImg} alt="Bühne" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Presse = () => (
  <PageLayout>
    <HeroPresse />
    <AufritteSection />
    <PressekitSection />
    <FotosSection />
  </PageLayout>
);

export default Presse;
