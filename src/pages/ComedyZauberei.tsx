import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Laugh, Wand2, Users, Sparkles } from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import LandingHero from "@/components/landing/LandingHero";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import magicDinnerBookImg from "@/assets/magicdinner-book.jpg";
import staunenImg from "@/assets/staunen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";

const GRADIENT =
  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)";

const HeroIntro = () => (
  <section className="relative min-h-[60vh] flex items-center bg-white pt-32 md:pt-36 pb-16 md:pb-20 overflow-hidden">
    <div
      aria-hidden
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, hsl(285 80% 88%) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
    <div
      aria-hidden
      className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, hsl(220 95% 88%) 0%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
    <div className="container px-6 relative z-10">
      <div className="max-w-3xl">
        <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
          Comedy-Zauberei
        </p>
        <h1 className="font-display font-black tracking-[-0.01em] leading-[1] text-[clamp(2.75rem,7vw,6.25rem)] text-foreground">
          Wenn Lachen und Staunen{" "}
          <span
            style={{
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            zusammenkommen
          </span>
          .
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-[1.55] text-foreground/70 font-light">
          Comedy-Zauberei ist mehr als Trick + Witz. Es ist ein eigenes
          Format — modern, persönlich und auf Augenhöhe mit dem Publikum.
        </p>
      </div>
    </div>
  </section>
);

const WasIstDasSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className={`lg:col-span-5 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "0.5rem",
                aspectRatio: "4 / 5",
                boxShadow:
                  "0 40px 80px -30px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <img
                src={magicDinnerBookImg}
                alt="Comedy-Zauberei live"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div
            className={`lg:col-span-7 lg:pl-6 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Was ist das?
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4.2vw,3.75rem)] text-foreground">
              Zauberkunst trifft{" "}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Stand-Up
              </span>
              .
            </h2>
            <p className="mt-7 text-lg md:text-xl leading-[1.55] text-foreground/80 font-light">
              Klassischer Zauberer plus Show-Comedian — beides in einer Person.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65">
              Bei einer reinen Zaubershow geht's um Tricks. Bei Stand-Up geht's
              um Pointen. Bei Comedy-Zauberei geht's um den Moment, in dem
              beides ineinanderfließt — Gäste lachen über die Situation und
              staunen über das, was gerade passiert ist. In derselben Sekunde.
            </p>
            <p className="mt-5 text-base leading-[1.7] text-foreground/65">
              Das ist keine Aneinanderreihung von „Trick — Witz — Trick — Witz".
              Comedy ist Teil der Performance. Sie entsteht aus der Reaktion
              der Gäste, aus der Spontanität, aus dem Spiel mit Erwartungen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PrinzipienSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const pillars = [
    {
      icon: Users,
      title: "Auf Augenhöhe",
      desc: "Gäste werden Teil der Show — sie mischen Karten, halten Objekte, wählen frei. Niemand wird vorgeführt, alle werden eingebunden.",
    },
    {
      icon: Laugh,
      title: "Gelacht wird über die Situation",
      desc: "Nie über einzelne Gäste. Der Humor kommt aus dem Moment selbst — überraschend, charmant und nie auf Kosten des Publikums.",
    },
    {
      icon: Wand2,
      title: "Zauberei ohne Klischee",
      desc: "Keine Zylinder, keine Frack-Show, keine Kindergeburtstags-Tricks. Stattdessen moderne Effekte, die auch Skeptiker überzeugen.",
    },
    {
      icon: Sparkles,
      title: "Improvisation als Standard",
      desc: "Jede Show ist anders, weil das Publikum anders reagiert. Statt einstudierter Routine: echte Spontanität, die nur live entstehen kann.",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-t border-foreground/8">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Die Prinzipien
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Was{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Comedy-Zauberei
            </span>{" "}
            ausmacht.
          </h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              className="p-7 md:p-8"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.75rem",
              }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))",
                }}
              >
                <p.icon className="w-5 h-5" style={{ color: "hsl(255 60% 40%)" }} />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-black mb-3 text-foreground leading-[1.15]">
                {p.title}
              </h3>
              <p className="text-base leading-[1.6] text-foreground/65">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-t border-foreground/8">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Der Unterschied
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Klassischer Zauberer{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              vs. Comedy-Zauberer
            </span>
            .
          </h2>
        </div>
        <div
          className={`grid md:grid-cols-2 gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {/* Klassisch */}
          <div
            className="p-8 md:p-10"
            style={{
              background: "rgba(0,0,0,0.02)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: "0.75rem",
            }}
          >
            <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/55 mb-4 font-semibold">
              Klassisch
            </p>
            <ul className="space-y-3 text-foreground/65 text-[15px] leading-[1.6]">
              <li>Anzug oder Frack, oft formal-distanziert</li>
              <li>Trick steht im Mittelpunkt</li>
              <li>Publikum staunt, lacht selten</li>
              <li>Einstudierte Routinen</li>
              <li>Show passiert FÜR das Publikum</li>
            </ul>
          </div>
          {/* Comedy */}
          <div
            className="p-8 md:p-10 text-white"
            style={{
              background:
                "linear-gradient(135deg, hsl(220 50% 18%) 0%, hsl(255 45% 22%) 50%, hsl(285 50% 22%) 100%)",
              borderRadius: "0.75rem",
              boxShadow: "0 30px 70px -20px rgba(40, 30, 80, 0.4)",
            }}
          >
            <p
              className="text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold"
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 78%), hsl(255 85% 78%), hsl(285 90% 78%))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Comedy-Zauberei
            </p>
            <ul className="space-y-3 text-white/85 text-[15px] leading-[1.6]">
              <li>Modern, persönlich, auf Augenhöhe</li>
              <li>Erlebnis & Reaktion stehen im Mittelpunkt</li>
              <li>Publikum lacht UND staunt</li>
              <li>Improvisiert, situationsbezogen</li>
              <li>Show passiert MIT dem Publikum</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FuerWenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    {
      title: "Hochzeiten",
      desc: "Wenn Gäste sich noch nicht kennen — Magie und Humor verbinden Tische, die sich vorher fremd waren.",
    },
    {
      title: "Firmenfeiern",
      desc: "Wenn Networking organisch passieren soll. Ein gemeinsames Staunen bricht jede Hierarchie auf.",
    },
    {
      title: "Galas & Events",
      desc: "Wenn elegantes Entertainment gefragt ist — ohne dass es steif oder altmodisch wird.",
    },
    {
      title: "Geburtstage & Jubiläen",
      desc: "Wenn der Abend zum Gespräch werden soll — über das alle noch Wochen später reden.",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-t border-foreground/8">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Für welche Anlässe?
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Wo Comedy-Zauberei{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              wirklich passt
            </span>
            .
          </h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {items.map((it) => (
            <div
              key={it.title}
              className="p-6 md:p-7"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.75rem",
              }}
            >
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                {it.title}
              </h3>
              <p className="text-sm md:text-[15px] text-foreground/65 leading-relaxed">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-white py-24 md:py-32"
    >
      <div className="absolute inset-0">
        <img
          src={audienceImg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(15,10,25,0.86) 0%, rgba(15,10,25,0.7) 50%, rgba(15,10,25,0.55) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 container px-6">
        <div
          className={`max-w-3xl ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/60 mb-8">
            Lust drauf?
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)]">
            Erlebe Comedy-Zauberei{" "}
            <span
              style={{
                background:
                  "linear-gradient(100deg, hsl(220 95% 78%), hsl(255 85% 78%), hsl(285 90% 78%))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              auf deinem Event
            </span>
            .
          </h2>
          <p className="mt-7 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Erzähl mir kurz von deinem Event — ich melde mich innerhalb 24h
            mit einem konkreten Vorschlag.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <span>Jetzt anfragen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/buehnenshow"
              className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors"
            >
              Bühnenshow ansehen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComedyZauberei = () => (
  <>
    <Helmet>
      <title>Comedy-Zauberei – Zauberkunst mit Humor | Emilian Leber</title>
      <meta
        name="description"
        content="Was ist Comedy-Zauberei? Moderne Zauberkunst mit Stand-Up-Humor, persönlich und auf Augenhöhe. Lachen UND Staunen — bei Hochzeiten, Firmenfeiern und Galas."
      />
      <link rel="canonical" href="https://www.magicel.de/comedy-zauberei" />
    </Helmet>
    <Navigation />
    <main>
      <HeroIntro />
      <WasIstDasSection />
      <PrinzipienSection />
      <VergleichSection />
      <FuerWenSection />
      <FinalCTA />
    </main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default ComedyZauberei;
