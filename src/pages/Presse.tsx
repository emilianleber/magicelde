import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import portraitImg from "@/assets/magician-portrait.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { Award, Tv, Calendar, Globe } from "lucide-react";

const HeroPresse = () => (
  <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Presse</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Emilian Leber in den Medien.
        </h1>
        <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Auftritte, Auszeichnungen, Erwähnungen und Pressematerial.
          Alles, was Journalisten und Redaktionen wissen müssen.
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
          <span className="badge-accent mb-8 inline-flex">Highlights</span>
          <h2 className="headline-section text-foreground mb-12">Auftritte & Auszeichnungen.</h2>
          <div className="divide-y divide-border">
            {[
              { icon: Award, title: "Finalist — Talents of Magic", desc: "Einer der renommiertesten Nachwuchswettbewerbe für Zauberkunst in Deutschland.", year: "2024" },
              { icon: Tv, title: "TV-Auftritte & Showformate", desc: "Verschiedene Fernsehformate, Showproduktionen und Medienauftritte.", year: "2023–2025" },
              { icon: Calendar, title: "500+ Live-Events", desc: "Auftritte bei führenden Unternehmen, auf Hochzeiten, Galas und exklusiven Privatevents.", year: "Laufend" },
              { icon: Globe, title: "Deutschlandweite Buchungen", desc: "Von Regensburg bis Berlin — regelmäßig gebucht in ganz Deutschland und darüber hinaus.", year: "Laufend" },
            ].map((item) => (
              <div key={item.title} className="py-8 flex items-start gap-5">
                <item.icon className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground">{item.title}</h3>
                    <span className="font-sans text-xs text-muted-foreground shrink-0 mt-1">{item.year}</span>
                  </div>
                  <p className="text-detail mt-1">{item.desc}</p>
                </div>
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
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-5xl mx-auto">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — Pressefoto" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <h2 className="headline-sub text-foreground mb-8">Pressekit.</h2>
            <div className="space-y-4 text-detail max-w-lg">
              <p><strong className="text-foreground font-medium">Name:</strong> Emilian Leber</p>
              <p><strong className="text-foreground font-medium">Künstlername:</strong> Emilian Leber</p>
              <p><strong className="text-foreground font-medium">Genre:</strong> Moderner Comedy-Zauberer, Close-Up & Bühnenmagie</p>
              <p><strong className="text-foreground font-medium">Erfahrung:</strong> 10+ Jahre, 500+ Events, Finalist Talents of Magic</p>
              <p><strong className="text-foreground font-medium">Buchbar:</strong> Deutschlandweit und international</p>
              <p className="pt-4">
                Für hochauflösende Pressefotos, Interviews oder Presseanfragen kontaktieren Sie mich bitte direkt.
              </p>
            </div>
            <a href="mailto:presse@magicel.de" className="btn-primary mt-8">
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
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-4">Pressefotos.</h2>
          <p className="text-detail">Zur freien Verwendung bei redaktioneller Berichterstattung. Bildnachweis: MagicEL / Emilian Leber.</p>
        </div>
        <div className={`grid md:grid-cols-3 gap-4 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[portraitImg, stageImg, heroImg].map((src, i) => (
            <div key={i} className="rounded-3xl overflow-hidden aspect-[4/3]">
              <img src={src} alt="Pressefoto" className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Presse = () => (
  <>
    <Helmet>
      <title>Presse – Zauberer Emilian Leber in den Medien</title>
      <meta
        name="description"
        content="Presseinfos, Medienauftritte und Pressekit von Zauberer Emilian Leber. Für Journalisten und Medienanfragen – Fotos und Infomaterial zum Download."
      />
      <link rel="canonical" href="https://www.magicel.de/presse" />
    </Helmet>
    <PageLayout>
    <HeroPresse />
    <AufritteSection />
    <PressekitSection />
    <FotosSection />
    <BookingCTA headline={"Presseanfrage?"} subline="Ich freue mich auf Ihre Anfrage — ob Interview, Feature oder Kooperation." buttonText="Kontakt aufnehmen" />
  </PageLayout>
  </>
);

export default Presse;
