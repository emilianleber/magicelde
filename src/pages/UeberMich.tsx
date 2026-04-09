import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import AnimatedWords from "@/components/landing/AnimatedWords";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { AwardBadges } from "@/components/landing/TrustElements";
import portraitImg from "@/assets/magician-portrait.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import { Laugh, Heart, Target, Award, Sparkles, Music } from "lucide-react";

const HeroUeber = () => (
  <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Über mich</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Hi, ich bin{" "}
          <AnimatedWords words={["Emilian.", "Zauberer.", "dein Entertainer."]} />
        </h1>
        <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Moderner Comedy-Zauberer. Performer. Showkünstler.
          Ich bringe Menschen zum Staunen UND zum Lachen — seit über zehn Jahren.
        </p>
      </div>
    </div>
  </section>
);

const StorySection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <h2 className="headline-section text-foreground mb-8">Meine Geschichte.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Mit 12 Jahren habe ich meinen ersten Zaubertrick gelernt. Was als Hobby begann,
                wurde schnell zur Leidenschaft — und dann zum Beruf.
              </p>
              <p>
                Heute stehe ich auf den größten Bühnen, performe bei Firmenfeiern, Hochzeiten
                und exklusiven Events in ganz Deutschland. Nicht mit Zylinder und Kaninchen,
                sondern mit einer einzigartigen Mischung aus moderner Zauberkunst, Psychologie
                und cleverem Humor.
              </p>
              <p>
                Mein Antrieb? Der Moment, in dem ein ganzer Raum gleichzeitig lacht und staunt.
                Wenn fremde Gäste plötzlich wie alte Freunde miteinander reden — weil sie gerade
                zusammen etwas Unmögliches erlebt haben.
              </p>
              <p>
                Für mich ist Magie kein Trick — es ist die Kunst, Menschen zu verbinden
                und Momente zu schaffen, die bleiben.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhilosophieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Philosophie</span>
          <h2 className="headline-section text-foreground mb-6">Was mich antreibt.</h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Sparkles, title: "Keine Klischees", desc: "Kein Zylinder, kein Kaninchen, keine verstaubten Standardtricks. Meine Magie ist modern, frisch und zeitgemäß — wie ein guter Film, der dich überrascht." },
            { icon: Heart, title: "Erlebnis vor Trick", desc: "Mir geht es nicht um den Effekt — sondern um das, was er bei Menschen auslöst. Um das Lachen, das Staunen, die Verbindung. Die Magie passiert in den Köpfen." },
            { icon: Target, title: "Immer individuell", desc: "Jedes Event ist anders. Jede Show wird auf den Anlass, das Publikum und die Stimmung abgestimmt. Kein Auftritt gleicht dem anderen." },
          ].map((item, i) => (
            <div key={item.title} className="p-8 rounded-3xl bg-background">
              <item.icon className="w-8 h-8 text-accent mb-5" />
              <h3 className="font-display text-xl font-bold text-foreground mb-4">{item.title}</h3>
              <p className="text-detail">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WasAndersSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`order-2 md:order-1 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-3xl overflow-hidden">
                <img src={buehneZuschauerImg} alt="Begeistertes Publikum" className="w-full h-[300px] object-cover object-top" loading="lazy" />
              </div>
              <div className="rounded-3xl overflow-hidden">
                <img src={portraitKartenImg} alt="Emilian Leber mit Karten" className="w-full h-[300px] object-cover" loading="lazy" />
              </div>
            </div>
          </div>
          <div className={`order-1 md:order-2 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-primary mb-8 inline-flex">Comedy + Magie</span>
            <h2 className="headline-section text-foreground mb-6">Was mich anders macht.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ich bin kein klassischer Zauberer. Ich bin Comedy-Zauberer.
              </p>
              <p>
                Das bedeutet: Meine Shows verbinden verblüffende Zauberkunst mit cleverem Humor.
                Kein trockener Vorführeffekt, sondern eine Performance, bei der dein Publikum
                gleichzeitig lacht UND staunt.
              </p>
              <p>
                Ich nehme meine Gäste mit, interagiere mit ihnen, mache sie zum Teil der Show.
                Mein Stil ist locker, charmant und professionell — nie peinlich, nie aufgesetzt.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: Laugh, label: "Humorvoll" },
                { icon: Music, label: "Unterhaltsam" },
                { icon: Award, label: "Preisgekrönt" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span className="font-display text-sm font-bold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const AuszeichnungenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Erfahrung</span>
          <h2 className="headline-section text-foreground mb-6">Highlights & Meilensteine.</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 mb-20">
          <StatItem end={500} suffix="+" label="Auftritte" />
          <StatItem end={10} suffix="+" label="Jahre Erfahrung" />
          <StatItem end={100} suffix="%" label="Weiterempfehlung" />
        </div>
        <div className={`max-w-3xl mx-auto divide-y divide-border ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {[
            { title: "Finalist — Talents of Magic", desc: "Einer der renommiertesten Nachwuchswettbewerbe für Zauberkunst in Deutschland." },
            { title: "TV-Auftritte & Medien", desc: "Auftritte in verschiedenen Fernsehformaten und Showproduktionen." },
            { title: "500+ erfolgreiche Events", desc: "Von der intimen Hochzeit bis zur Firmengala mit 500+ Gästen." },
            { title: "Deutschlandweit gebucht", desc: "Von Regensburg bis Berlin — zuverlässig, professionell, immer persönlich." },
          ].map((item) => (
            <div key={item.title} className="py-6">
              <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-detail mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`grid md:grid-cols-2 gap-4 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[stageImg, heroImg, emotionenImg, portraitImg].map((src, i) => (
            <div key={i} className="rounded-3xl overflow-hidden aspect-[4/3] group">
              <img src={src} alt="Performance" className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UeberMich = () => (
  <>
    <Helmet>
      <title>Über Emilian Leber – Zauberer &amp; Showkünstler</title>
      <meta
        name="description"
        content="Emilian Leber ist moderner Comedy-Zauberer mit über 10 Jahren Erfahrung und 500+ Events. Erfahre mehr über seinen Weg, seine Philosophie und seine Shows."
      />
      <link rel="canonical" href="https://www.magicel.de/ueber-mich" />
      <meta property="og:title" content="Über Emilian Leber – Zauberer & Showkünstler" />
      <meta property="og:description" content="Emilian Leber ist moderner Comedy-Zauberer mit über 10 Jahren Erfahrung und 500+ Events. Erfahre mehr über seinen Weg, seine Philosophie und seine Shows." />
      <meta property="og:url" content="https://www.magicel.de/ueber-mich" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Über Emilian Leber – Zauberer & Showkünstler" />
      <meta name="twitter:description" content="Emilian Leber ist moderner Comedy-Zauberer mit über 10 Jahren Erfahrung und 500+ Events. Erfahre mehr über seinen Weg, seine Philosophie und seine Shows." />
    </Helmet>
    <PageLayout>
    <HeroUeber />
    <div className="py-10">
      <AwardBadges className="justify-center" />
    </div>
    <StorySection />
    <PhilosophieSection />
    <WasAndersSection />
    <AuszeichnungenSection />
    <GalerieSection />
    <BookingCTA headline={"Lass uns sprechen."} subline="Ich freue mich, von deinem Event zu hören — und dir zu zeigen, wie Comedy-Magie deinen Abend unvergesslich macht." />
  </PageLayout>
  </>
);

export default UeberMich;
