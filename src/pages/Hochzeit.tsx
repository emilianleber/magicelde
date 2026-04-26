import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Heart,
  Users,
  Sparkles,
  Wine,
  Mic2,
  Phone,
  ClipboardList,
  PartyPopper,
  Cake,
  Music2,
  Camera,
  Flame,
  Gem,
  TreePine,
  Sun,
  Smile,
} from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { QuizWizardInline, QuizConfig } from "@/components/landing/QuizWizard";

import weddingHeroImg from "@/assets/hero-hochzeit-stock.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import weddingMagicImg from "@/assets/wedding-magic.jpg";
import staunenImg from "@/assets/staunen.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import haendeInteraktionImg from "@/assets/haende-interaktion.jpg";
import closeupImg from "@/assets/closeup.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import heroMagicImg from "@/assets/hero-magic.jpg";
import dinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import { useCounter } from "@/hooks/useCounter";

const GRADIENT =
  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)";
const GRADIENT_LIGHT =
  "linear-gradient(100deg, hsl(220 95% 78%) 0%, hsl(255 85% 78%) 50%, hsl(285 90% 78%) 100%)";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — direkter Brautpaar-Hook
   ═══════════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen overflow-hidden text-white flex flex-col bg-[#0f0a19]">
    <div className="absolute inset-0">
      <img src={weddingHeroImg} alt="" className="h-full w-full object-cover" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(15,10,25,0.82) 0%, rgba(15,10,25,0.6) 40%, rgba(15,10,25,0.2) 80%, rgba(15,10,25,0.05) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(15,10,25,0.55))",
        }}
      />
    </div>

    <div className="relative z-10 container px-6 flex-1 flex items-center pt-32 md:pt-36 pb-20 md:pb-24">
      <div className="w-full max-w-3xl">
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span className="text-sm text-white/90">
              <strong className="font-semibold text-white">5,0</strong>
              <span className="text-white/60"> · 30+ Bewertungen</span>
            </span>
          </div>
          <span aria-hidden className="hidden md:block h-4 w-px bg-white/20" />
          <span className="text-sm text-white/85">
            <strong className="font-semibold text-white">100+ Hochzeiten</strong>
          </span>
        </div>

        <h1
          className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5.6vw,5.25rem)] opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Macht eure Hochzeit zum{" "}
          <span
            style={{
              background: GRADIENT_LIGHT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tagesgespräch
          </span>
          .
        </h1>

        <p
          className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/85 font-light opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Ihr plant eure Hochzeit und sucht das eine Highlight, das eure Gäste
          vereint und sprachlos macht? Sag mir kurz, wie eure Hochzeit
          aussieht — ich finde mit dir das passende Format.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#empfehlung"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
          >
            <span>30 Sekunden: Was passt zu uns?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/buchung"
            className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors"
          >
            Direkt anfragen
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <p
          className="mt-4 text-xs md:text-sm text-white/55 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.7s" }}
        >
          Kostenlos · Unverbindlich · Antwort innerhalb 24h
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   2 · QUIZ — Hochzeits-spezifischer Format-Finder, inline
   ═══════════════════════════════════════════════════════════ */
const hochzeitQuizConfig: QuizConfig = {
  anlass: "Hochzeit",
  sectionEyebrow: "Format-Finder",
  sectionTitle: (
    <>
      Findet euren{" "}
      <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Magie-Moment
      </span>
      .
    </>
  ),
  sectionDesc:
    "Fünf Fragen, eine Empfehlung — abgestimmt auf den Tagesablauf, eure Gäste-Mischung und die Stimmung, die ihr euch wünscht. Wenn ihr wollt, könnt ihr direkt absenden, ohne Daten doppelt einzutippen.",
  questions: [
    {
      id: "groesse",
      shortLabel: "Hochzeitsgröße",
      title: (
        <>
          Wie{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            groß
          </span>{" "}
          wird eure Hochzeit?
        </>
      ),
      hint: "Bei kleinen Runden funktioniert intime Tisch-Magie, bei größeren Hochzeiten lohnt sich auch eine Show vor allen Gästen.",
      cols: { md: 3 },
      options: [
        { value: "intim", label: "bis 40 Gäste", sub: "Engster Kreis · Familie + Trauzeugen" },
        { value: "mittel", label: "40 – 120 Gäste", sub: "Klassische Hochzeitsfeier" },
        { value: "groß", label: "120+ Gäste", sub: "Große Feier mit beiden Seiten" },
      ],
    },
    {
      id: "schwerpunkt",
      shortLabel: "Magie-Moment",
      title: (
        <>
          Wann soll die{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Magie
          </span>{" "}
          passieren?
        </>
      ),
      hint: "Jeder Moment der Hochzeit hat eine andere Energie — wo wollt ihr den Magic-Moment platzieren?",
      cols: { md: 2, lg: 4 },
      options: [
        { value: "trauung", label: "Vor / nach der Trauung", sub: "Stille Magie als emotionaler Anker", icon: Flame },
        { value: "empfang", label: "Sektempfang & Fotosession", sub: "Während ihr Fotos macht — Eisbrecher für die Gäste", icon: Camera },
        { value: "dinner", label: "Beim Hochzeitsdinner", sub: "Tisch-zu-Tisch zwischen den Gängen", icon: Cake },
        { value: "abend", label: "Abendprogramm vor dem Tanz", sub: "Show-Highlight nach dem Dinner", icon: Music2 },
      ],
    },
    {
      id: "stil",
      shortLabel: "Hochzeitsstil",
      title: (
        <>
          Wie ist der{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Stil
          </span>{" "}
          eurer Hochzeit?
        </>
      ),
      hint: "Damit der Auftritt zur Atmosphäre passt — von Scheunenfest bis Schloss.",
      cols: { md: 3 },
      options: [
        { value: "rustikal", label: "Rustikal-locker", sub: "Scheune, Garten, Festzelt — entspannt", icon: TreePine },
        { value: "klassisch", label: "Klassisch-elegant", sub: "Saal, weiße Tischdecken, festlich", icon: Gem },
        { value: "boho", label: "Boho / Sommer", sub: "Outdoor, Sonnenuntergang, locker-warm", icon: Sun },
      ],
    },
    {
      id: "gaeste",
      shortLabel: "Gästemix",
      title: (
        <>
          Wer sind eure{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Gäste
          </span>
          ?
        </>
      ),
      hint: "Damit ich Magie wähle, die alle einbindet — egal ob Oma oder Trauzeuge.",
      cols: { md: 3 },
      options: [
        { value: "familien", label: "Familien-Fokus", sub: "Verwandte beider Seiten, alle Altersgruppen", icon: Heart },
        { value: "freunde", label: "Freunde-Fokus", sub: "Eure Crew, viele unter 40", icon: Users },
        { value: "mix", label: "Bunt gemischt", sub: "Familie, Freunde, Kollegen — alles dabei", icon: Smile },
      ],
    },
    {
      id: "wunsch",
      shortLabel: "Wunsch",
      title: (
        <>
          Was ist euch{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            wichtig
          </span>
          ?
        </>
      ),
      hint: "Was zählt für euch als gelungener Hochzeitstag?",
      cols: { md: 2 },
      options: [
        { value: "verbinden", label: "Familienseiten verbinden", sub: "Zwei Familien lernen sich kennen", icon: Users },
        { value: "ruhe", label: "Ruhige, emotionale Momente", sub: "Nichts Lautes — kleine, stille Wunder", icon: Flame },
        { value: "wow", label: "Ein Wow-Moment für alle", sub: "Eine zentrale Show, die alle gemeinsam erleben", icon: Sparkles },
        { value: "rotfaden", label: "Magie über den ganzen Tag", sub: "Vom Sektempfang bis zum Tanz", icon: Music2 },
      ],
    },
  ],
  buildEmpfehlung: (a) => {
    const { schwerpunkt, gaeste, wunsch } = a;
    if (schwerpunkt === "trauung" || wunsch === "ruhe") {
      return {
        format: "Stille Magie zur Trauung",
        sub: "Kleine Wunder ohne Lärm · während Sektempfang oder Anstoßen",
        why: "Ruhige, emotionale Magie passend zum Moment — kein Showrummel, sondern intime Effekte, die zur Stimmung der Trauung passen. Karten, Münzen, ein verschwindender Trauring — kleine Wunder, die in Erinnerung bleiben.",
        link: "/close-up",
      };
    }
    if (schwerpunkt === "empfang" || wunsch === "verbinden" || gaeste === "familien") {
      return {
        format: "Close-Up beim Sektempfang",
        sub: "20–70 Min · während ihr Fotos macht",
        why: "Während Brautpaar und Fotograf unterwegs sind, unterhalte ich eure Gäste. Familie deiner Seite und seine — sofort haben alle ein Gesprächsthema. Magie ist der natürlichste Eisbrecher zwischen Menschen, die sich erst kennenlernen.",
        link: "/close-up",
      };
    }
    if (schwerpunkt === "dinner") {
      return {
        format: "Tisch-zu-Tisch beim Dinner",
        sub: "5–7 Min pro Tisch · zwischen den Gängen",
        why: "Während des Hauptgangs gehe ich von Tisch zu Tisch — jeder Tisch bekommt seine eigene Mini-Show. Trauzeugen, Eltern, alte Schulfreunde — alle haben gleich viel von der Magie, niemand wird übergangen.",
        link: "/close-up",
      };
    }
    if (schwerpunkt === "abend" || wunsch === "wow") {
      return {
        format: "Bühnenshow vor dem Hochzeitstanz",
        sub: "15–60 Min · nach dem Dinner, vor dem Eröffnungstanz",
        why: "Eine durchkomponierte Show, abgestimmt auf eure Story — mit eingebauten Anekdoten, vielleicht einem Trauring-Moment, der alle zum Staunen bringt. Genau dann zünden, wenn alle satt sind und auf den Tanz warten.",
        link: "/buehnenshow",
      };
    }
    return {
      format: "Magie über den ganzen Hochzeitstag",
      sub: "Sektempfang + Dinner + Show vor dem Tanz",
      why: "Ein roter Faden über euren Tag: Close-Up beim Empfang, Tisch-zu-Tisch im Dinner, eine kompakte Bühnenshow vor dem Tanz. Eure Gäste reden noch Wochen später davon.",
      link: "/buchung",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "intim" ? 30 : a.groesse === "mittel" ? 80 : a.groesse === "groß" ? 150 : null,
};

const QuizSection = () => <QuizWizardInline config={hochzeitQuizConfig} />;

/* ═══════════════════════════════════════════════════════════
   3 · DREI AKTE EINER HOCHZEIT — alternierendes Storytelling
   ═══════════════════════════════════════════════════════════ */
const OptionenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const akte = [
    {
      nr: "I",
      label: "Erster Akt",
      time: "Trauung & Sektempfang",
      title: "Während ihr Fotos macht.",
      desc: "Die Trauung ist vorbei, ihr seid mit dem Fotografen unterwegs — und die 80 Gäste stehen ratlos im Foyer. Genau hier mische ich mich unter eure Gäste mit Karten, Münzen, kleinen Wundern. Familie deiner Seite und seine — sofort haben alle ein Gesprächsthema.",
      img: weddingMagicImg,
    },
    {
      nr: "II",
      label: "Zweiter Akt",
      time: "Hochzeitsdinner",
      title: "Zwischen den Gängen.",
      desc: "Während der Hauptgang serviert wird: Tisch-zu-Tisch-Magie, 5–7 Min pro Tisch. Trauzeugen, Eltern, alte Schulfreunde — jeder Tisch bekommt seine eigene Mini-Show. Niemand wird übergangen, alle haben gleich viel davon.",
      img: closeupImg,
    },
    {
      nr: "III",
      label: "Dritter Akt",
      time: "Vor dem Hochzeitstanz",
      title: "Der große Moment.",
      desc: "Alle sind satt, der Eröffnungstanz steht bevor — der perfekte Slot für eine kompakte Bühnenshow. 15–30 Min, abgestimmt auf eure Story, vielleicht mit einem Trauring-Moment, der alle zum Staunen bringt. Standing Ovations vor dem Tanzparkett.",
      img: dinnerBuehneImg,
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-16 md:mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            In drei Akten
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Eure Hochzeit als{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              dreigeteilte Bühne
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.55] text-foreground/65 font-light">
            Eine Hochzeit hat drei sehr unterschiedliche Energien — Empfang, Dinner und Abend. Magie passt in jede Phase, aber jeweils anders.
          </p>
        </div>
        <div className="space-y-20 md:space-y-28">
          {akte.map((a, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={a.nr}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: "0.75rem",
                      aspectRatio: "16 / 11",
                      boxShadow: "0 40px 80px -25px rgba(40, 20, 60, 0.3), 0 0 0 1px rgba(0,0,0,0.05)",
                    }}
                  >
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
                    <span
                      aria-hidden
                      className="absolute top-5 left-5 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-md font-display font-black text-2xl md:text-3xl text-white"
                      style={{ background: "rgba(15,10,25,0.4)", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {a.nr}
                    </span>
                  </div>
                </div>
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:pr-6" : "lg:pl-6"}`}>
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-3"
                    style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {a.label} · {a.time}
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-black text-foreground leading-[1.1] mb-5">
                    {a.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/70 leading-[1.65]">
                    {a.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · ECHTES BEISPIEL — Headline oben, Photo+Timeline split
   ═══════════════════════════════════════════════════════════ */
const BeispielSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const phasen = [
    {
      label: "Phase 1",
      title: "Bevor das Brautpaar eintrifft.",
      text: "Aufbau im Empfangsbereich, kurzes Briefing mit der Hochzeitsplanerin über Sitzordnung und Insider-Anekdoten.",
    },
    {
      label: "Phase 2",
      title: "Sektempfang — 80 Gäste, viele fremd.",
      text: "Ich mische mich unter die Gäste während Brautpaar und Fotograf unterwegs sind. Karten, Münzen, kleine Wow-Momente. Familien beider Seiten lachen das erste Mal zusammen.",
    },
    {
      label: "Phase 3",
      title: "Beim Dinner — Tisch für Tisch.",
      text: "Während der Hauptgang serviert wird, gehe ich von Tisch zu Tisch. 5–7 Min, jeder Tisch bekommt seine eigene Mini-Show. Trauzeugen, Eltern, Schulfreunde — niemand wird übergangen.",
    },
    {
      label: "Phase 4",
      title: "Show-Slot vor dem Hochzeitstanz.",
      text: "22 Min Bühnenshow mit eingebauter Anekdote über das Brautpaar. Standing Ovations und ein Trauring-Moment, der alle zum Staunen bringt.",
    },
    {
      label: "Phase 5",
      title: "Bis Mitternacht.",
      text: "Tanzfläche füllt sich, ich verabschiede mich. Viele Gäste fragen nach Visitenkarten — nicht für sich selbst, sondern für anstehende Hochzeiten.",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Eine reale Hochzeit
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Fünf Phasen,{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ein perfekter Tag
            </span>
            .
          </h2>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-[1.55] text-foreground/65 font-light">
            Wie es bei einer echten Hochzeit verläuft — keine Stunden-Tabelle, sondern fünf Momente, in denen Magie ihre Wirkung entfaltet.
          </p>
        </div>

        {/* Editorial Hero-Photo, full bleed */}
        <div className={`relative overflow-hidden mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ borderRadius: "0.75rem", boxShadow: "0 40px 80px -25px rgba(40, 20, 60, 0.3)", animationDelay: "0.1s" }}>
          <img src={emotionenImg} alt="Reale Hochzeit" className="w-full object-cover" style={{ aspectRatio: "21 / 9" }} loading="lazy" />
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(15,10,25,0.5) 100%)" }} />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
            <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/75 mb-1 font-semibold">Reportage</p>
            <p className="font-display text-xl md:text-2xl font-bold">Eine bayerische Hochzeit · 80 Gäste · zweite Saisonhälfte</p>
          </div>
        </div>

        {/* Phasen als Magazine-Spread (kein Timeline-Stamp, kein Photo-Sticky) */}
        <div className={`grid md:grid-cols-2 gap-y-12 gap-x-14 max-w-5xl ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {phasen.map((p, i) => (
            <div key={p.label} className="relative">
              <span
                className="font-display text-[clamp(3rem,5vw,4rem)] font-black leading-none block mb-3"
                style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                0{i + 1}
              </span>
              <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/45 mb-3 font-semibold">{p.label}</p>
              <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-[1.2] mb-3">
                {p.title}
              </h3>
              <p className="text-base text-foreground/70 leading-[1.65] max-w-md">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · BRAUTPAAR-STIMMEN — kompakt
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Ich durfte eine Hochzeit planen, bei der Emilian als Zauberer aufgetreten ist — und es war wirklich großartig! Er hat sich auf unsere Idee eingelassen, den Bräutigam zu überraschen, und mit viel Charme und Witz mitgespielt. Eine tolle Ergänzung für jeden besonderen Anlass!",
      author: "Katrin Raß",
      anlass: "Hochzeitsplanerin",
      initial: "K",
      tint: "hsl(340 75% 55%)",
    },
    {
      quote:
        "Es war genial, perfekt und mega gut!!! Die Gäste waren begeistert, die Kinder fanden es toll und wir auch!",
      author: "Petra Zeitler",
      anlass: "Brautpaar",
      initial: "P",
      tint: "hsl(255 70% 55%)",
    },
    {
      quote:
        "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung sehr professionell. Gerne wieder!",
      author: "Martina Senftl",
      anlass: "Hochzeitskundin",
      initial: "M",
      tint: "hsl(220 70% 55%)",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Brautpaar-Stimmen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Was{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              andere Brautpaare
            </span>{" "}
            sagen.
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {reviews.map((r) => (
            <article
              key={r.author}
              className="relative bg-white p-7 md:p-8 flex flex-col h-full"
              style={{
                borderRadius: "0.75rem",
                boxShadow: "0 20px 50px -25px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <div
                aria-hidden
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(220 85% 65%), hsl(255 75% 65%), hsl(285 80% 65%))" }}
              />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[15px] leading-[1.6] text-foreground/85 flex-1">„{r.quote}"</p>
              <footer className="mt-6 pt-6 border-t border-foreground/8 flex items-center gap-3">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-white text-lg"
                  style={{ background: `linear-gradient(135deg, ${r.tint}, hsl(255 70% 55%))` }}
                >
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-foreground text-sm">{r.author}</p>
                  <p className="text-[12px] text-foreground/55 truncate">{r.anlass}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · BUCHUNGS-FLOW — 3 Schritte visualisiert
   ═══════════════════════════════════════════════════════════ */
const BuchungsFlowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    {
      icon: Phone,
      num: "01",
      title: "Anfragen",
      desc: "Schickt mir Datum, Ort und ungefähre Gästezahl. Ich melde mich innerhalb 24h persönlich bei euch.",
      time: "2 Min",
    },
    {
      icon: ClipboardList,
      num: "02",
      title: "Konzept",
      desc: "Wir besprechen euren Tag in 30 Min am Telefon. Ihr bekommt einen schriftlichen Vorschlag mit Slot, Format und Preis.",
      time: "30 Min Call",
    },
    {
      icon: PartyPopper,
      num: "03",
      title: "Hochzeit",
      desc: "Am Tag bin ich pünktlich da, baue alles in Ruhe auf. Ihr genießt euren Tag — ich kümmere mich um den Rest.",
      time: "Euer großer Tag",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            So einfach
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Drei Schritte zur{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              perfekten Hochzeit
            </span>
            .
          </h2>
        </div>
        <div className={`relative ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {/* Single continuous connector line behind the circles */}
          <div
            aria-hidden
            className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px z-0"
            style={{
              background:
                "linear-gradient(90deg, hsl(220 85% 65% / 0.5), hsl(255 75% 65% / 0.7), hsl(285 80% 65% / 0.5))",
            }}
          />
          <div className="relative z-10 grid md:grid-cols-3 gap-y-10 md:gap-x-8">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-start md:items-center text-left md:text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-white"
                  style={{
                    background: "white",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 10px 30px hsl(255 75% 55% / 0.15)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: GRADIENT }}
                  >
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/45 mb-2 font-semibold">
                  Schritt {s.num} · {s.time}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-black text-foreground mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm md:text-[15px] text-foreground/65 leading-[1.55]">
                  {s.desc}
                </p>
              </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · DREI-SEKUNDEN-SECTION — Photo-Split, emotional pull
   ═══════════════════════════════════════════════════════════ */
const DreiSekundenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`lg:col-span-6 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "0.75rem",
                aspectRatio: "4 / 5",
                boxShadow: "0 40px 80px -25px rgba(40, 20, 60, 0.3), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <img src={staunenImg} alt="Staunende Hochzeitsgäste" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`lg:col-span-6 lg:pl-6 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Der Moment
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
              Drei Sekunden — und es ist{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                still
              </span>
              .
            </h2>
            <p className="mt-7 text-lg md:text-xl leading-[1.55] text-foreground/75 font-light">
              Eine Karte, die vor Sekunden noch in der Hand der Trauzeugin lag,
              taucht plötzlich in der Geldbörse des Brautvaters auf.
            </p>
            <p className="mt-5 text-base md:text-[17px] leading-[1.65] text-foreground/65">
              Der ganze Tisch hält den Atem an. Eine halbe Sekunde später lacht
              die ganze Tafel. Das ist der Moment, an den sich eure Gäste in
              zehn Jahren noch erinnern.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground/60">
                <strong className="text-foreground">100+ Brautpaare</strong> haben
                diesen Moment schon erlebt — durchgehend 5,0 Sterne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · MEGA-QUOTE — gradient washed bg + huge quote marks
   ═══════════════════════════════════════════════════════════ */
const MegaQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      {/* Soft gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(285 80% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(220 95% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div className="container px-6 relative z-10">
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {/* XXL gradient quote mark decoration */}
          <span
            aria-hidden
            className="block font-display font-black leading-none mb-[-2.5rem] md:mb-[-4rem] select-none"
            style={{
              fontSize: "clamp(8rem, 16vw, 16rem)",
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              opacity: 0.7,
            }}
          >
            "
          </span>
          <blockquote>
            <p className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground">
              Ich durfte eine Hochzeit planen, bei der Emilian als Zauberer
              aufgetreten ist — und es war{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                wirklich großartig
              </span>
              ! Mit viel Charme und Witz hat er alle Gäste begeistert.
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display font-black text-white text-xl"
                style={{ background: "linear-gradient(135deg, hsl(340 75% 55%), hsl(255 70% 55%))" }}
              >
                K
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-base">Katrin Raß</p>
                <p className="text-sm text-foreground/55">Hochzeitsplanerin · Google-Bewertung</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · GALERIE — masonry photo wall
   ═══════════════════════════════════════════════════════════ */
const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const photos = [
    { img: weddingMagicImg, span: "lg:col-span-2 lg:row-span-2", pos: "object-center" },
    { img: closeupImg, span: "", pos: "object-center" },
    { img: haendeInteraktionImg, span: "", pos: "object-center" },
    { img: heroMagicImg, span: "", pos: "object-center" },
    { img: portraitImg, span: "", pos: "object-top" },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Impressionen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Echte{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Hochzeitsmomente
            </span>
            .
          </h2>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {photos.map((p, i) => (
            <div key={i} className={`${p.span} overflow-hidden group relative`} style={{ borderRadius: "0.5rem" }}>
              <img
                src={p.img}
                alt=""
                className={`w-full h-full object-cover ${p.pos} group-hover:scale-[1.04] transition-transform duration-700`}
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(220 85% 50% / 0.2), hsl(285 80% 50% / 0.2))",
                  mixBlendMode: "overlay",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · ZAHLEN-SECTION dunkel mit Bild
   ═══════════════════════════════════════════════════════════ */
const StatBlock = ({ end, suffix, label, desc }: { end: number; suffix: string; label: string; desc: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref}>
      <p
        className="font-display font-black leading-none tabular-nums tracking-[-0.02em] text-[clamp(3rem,6vw,5.5rem)]"
        style={{
          background: GRADIENT_LIGHT,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}{suffix}
      </p>
      <p className="text-[11px] tracking-[0.18em] uppercase text-white/55 mt-4">{label}</p>
      <p className="mt-3 text-sm text-white/65 max-w-[220px] leading-relaxed">{desc}</p>
    </div>
  );
};

const ZahlenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white py-24 md:py-32 lg:py-40">
      <div className="absolute inset-0">
        <img src={buehneZuschauerImg} alt="" className="w-full h-full object-cover" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(15,10,25,0.92) 0%, rgba(30,15,45,0.85) 50%, rgba(15,10,25,0.7) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/55 mb-6">
            Erfahrung in Zahlen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,5vw,4.75rem)]">
            Was{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              100+ Hochzeiten
            </span>{" "}
            ausmachen.
          </h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <StatBlock end={100} suffix="+" label="Hochzeiten" desc="Vom Standesamt bis zur 300-Gäste-Trauung." />
          <StatBlock end={10} suffix="+" label="Jahre Routine" desc="Auch wenn der Zeitplan kippt — ich liefere." />
          <StatBlock end={5} suffix=",0" label="Sterne Bewertung" desc="Top-Bewertungen auf Google & ProvenExpert." />
          <StatBlock end={24} suffix="h" label="Antwortzeit" desc="Persönliche Rückmeldung garantiert." />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · MÖGLICHKEITEN — was Magie auf einer Hochzeit besonders macht
   ═══════════════════════════════════════════════════════════ */
const MoeglichkeitenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const moments = [
    {
      icon: Heart,
      title: "Personalisierte Trauring-Routine",
      desc: "Ein scheinbar verlorener Trauring taucht plötzlich an einer unmöglichen Stelle wieder auf — als Highlight in der Show.",
    },
    {
      icon: Users,
      title: "Trauzeugen-Überraschung",
      desc: "Im Vorfeld stimme ich mit den Trauzeugen ein Insider-Detail ab. Die Show bekommt einen Moment, der nur euch gilt.",
    },
    {
      icon: Sparkles,
      title: "Stille Phasen aufladen",
      desc: "Während der Foto-Session der Brautleute warten Gäste oft 30–60 Min. Die nutze ich — keiner langweilt sich, alle verbinden sich.",
    },
    {
      icon: Wine,
      title: "Tisch-zu-Tisch beim Dinner",
      desc: "Zwischen den Gängen besuche ich jeden Tisch. 5–10 Min pro Tisch. Jeder bekommt seine eigene kleine Show.",
    },
    {
      icon: Mic2,
      title: "Show als Tanz-Vorprogramm",
      desc: "20–45 Min Bühnenshow direkt vor dem Hochzeitstanz. Alle sind versammelt — Standing Ovations garantiert.",
    },
    {
      icon: PartyPopper,
      title: "Walking-Magic später am Abend",
      desc: "Wenn die Tanzfläche pulsiert, mische ich mich nochmal unter müde gewordene Gäste — letzter Wow-Moment vor dem Aufbruch.",
    },
  ];

  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Eure Möglichkeiten
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was Magie auf{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              eurer Hochzeit
            </span>{" "}
            besonders macht.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Eine Hochzeit ist kein normales Event. Hier ein paar konkrete
            Möglichkeiten, wie ihr Zauberkunst in eure Hochzeit einbauen könnt
            — kombinierbar oder einzeln.
          </p>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {moments.map((m, i) => (
            <div
              key={m.title}
              className="p-7 md:p-8"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.75rem",
                animationDelay: `${0.1 + i * 0.06}s`,
              }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-5"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))",
                }}
              >
                <m.icon className="w-5 h-5" style={{ color: "hsl(255 60% 40%)" }} />
              </div>
              <h3 className="font-display text-lg md:text-xl font-black mb-3 text-foreground leading-[1.2]">
                {m.title}
              </h3>
              <p className="text-sm md:text-[15px] leading-[1.6] text-foreground/65">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · FAQ — Hochzeit-spezifisch, kompakt
   ═══════════════════════════════════════════════════════════ */
const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: "Was kostet ein Auftritt?", a: "Hochzeitspakete starten ab 395€. Endgültiger Preis hängt von Format, Dauer und Anreise ab. Ihr bekommt nach der Anfrage ein verbindliches Angebot ohne versteckte Kosten." },
    { q: "Wie weit im Voraus sollten wir buchen?", a: "Ideal sind 6–12 Monate Vorlauf. Bei kurzfristigen Anfragen einfach trotzdem fragen — manchmal geht's noch." },
    { q: "Bei welcher Gästezahl funktioniert es?", a: "Von 20 bis 300+ Gästen alles möglich. Bei Close-Up erreiche ich auch große Gruppen durch Tisch-zu-Tisch-Magie." },
    { q: "Was, wenn unsere Gäste sehr seriös sind?", a: "Genau die haben oft am meisten Spaß. Vorstandsvorsitzende, Anwälte, Großeltern — alle staunen, sobald die erste Karte verschwindet." },
    { q: "Wie ist es mit Kindern?", a: "Funktioniert wunderbar. Magie ist altersübergreifend — vom 6-Jährigen bis zur 90-jährigen Oma." },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className={`lg:col-span-4 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              FAQ
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4vw,3.5rem)] text-foreground">
              Häufige{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Fragen
              </span>
              .
            </h2>
          </div>
          <div className={`lg:col-span-8 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-6">
                  <summary className="flex items-center justify-between cursor-pointer font-display text-lg md:text-xl font-bold text-foreground pr-8 list-none hover:text-foreground/70 transition-colors">
                    {faq.q}
                    <span className="text-foreground/30 group-open:rotate-45 transition-transform duration-300 text-2xl shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-base leading-[1.65] text-foreground/65 max-w-2xl">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white py-28 md:py-36">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" />
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
        <div className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/60 mb-8">
            Euer großer Tag
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.25rem,5vw,4.75rem)] text-white">
            Macht eure Hochzeit{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              unvergesslich
            </span>
            .
          </h2>
          <p className="mt-6 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Schickt mir Datum, Ort und Gästezahl — Antwort innerhalb 24h.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              to="/buchung"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <span>Termin sichern</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors"
            >
              Direkt anrufen
            </a>
          </div>
          <p className="mt-4 text-sm text-white/55">
            Kostenlos · Unverbindlich · Antwort innerhalb 24h
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const Hochzeit = () => (
  <>
    <Helmet>
      <title>Zauberer für Hochzeit — Macht euren Tag zum Tagesgespräch | Emilian Leber</title>
      <meta
        name="description"
        content="Zauberer für Hochzeiten in Bayern und deutschlandweit. 30-Sekunden-Empfehlung, klare Optionen, echtes Beispiel — damit ihr genau wisst was ihr bucht."
      />
      <link rel="canonical" href="https://www.magicel.de/hochzeit" />
    </Helmet>
    <Navigation />
    <main>
      <Hero />
      <QuizSection />
      <OptionenSection />
      <DreiSekundenSection />
      <BeispielSection />
      <MegaQuoteSection />
      <StimmenSection />
      <GalerieSection />
      <ZahlenSection />
      <MoeglichkeitenSection />
      <BuchungsFlowSection />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default Hochzeit;
