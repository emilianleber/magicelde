import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Gift,
  Cake,
  Users,
  Home,
  Trees,
  UtensilsCrossed,
  Building2,
  Heart,
  Sparkles,
  PartyPopper,
  Check,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Crown,
} from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { QuizWizardInline, QuizConfig } from "@/components/landing/QuizWizard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import birthdayHeroImg from "@/assets/hero-geburtstag-stock.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import staunenImg from "@/assets/staunen.jpg";
import closeupImg from "@/assets/closeup.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import stageImg from "@/assets/stage-show.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import dinnerImg from "@/assets/emilian-magic-dinner.jpg";
import buehneImg from "@/assets/buehne-zuschauer.jpg";
import galBuehneDpsg from "@/assets/buehne-dpsg.jpg";
import galHeroBirthday from "@/assets/hero-birthday.jpg";
import galHeroCloseup from "@/assets/hero-closeup.jpg";
import galMagicdinnerBook from "@/assets/magicdinner-book.jpg";
import galMagicdinnerBuehne from "@/assets/magicdinner-buehne.jpg";
import galPortraitKarten from "@/assets/portrait-karten.jpg";
import galSchneiderCloseup from "@/assets/schneider-weisse-closeup.jpg";
import galZuschauerBlau from "@/assets/zuschauer-blau.jpg";

const GRADIENT =
  "linear-gradient(100deg, hsl(225 80% 60%) 0%, hsl(265 70% 62%) 100%)";
const GRADIENT_LIGHT =
  "linear-gradient(100deg, hsl(225 95% 75%) 0%, hsl(285 85% 75%) 50%, hsl(340 95% 75%) 100%)";

/* 1 · HERO — privat, warm, intim */
const Hero = () => (
  <section className="relative min-h-screen overflow-hidden text-white flex flex-col bg-[#0f0a19]">
    <div className="absolute inset-0">
      <img src={birthdayHeroImg} alt="" className="h-full w-full object-cover" />
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
          background: "linear-gradient(to bottom, transparent, rgba(15,10,25,0.55))",
        }}
      />
    </div>

    <div className="relative z-10 container px-6 flex-1 flex items-center pt-32 md:pt-36 pb-20 md:pb-24">
      <div className="w-full max-w-3xl">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
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
            Für <strong className="font-semibold text-white">runde Geburtstage & private Feiern</strong>
          </span>
        </div>

        <h1 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5.6vw,5.25rem)] opacity-0 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          Der Abend, an den sich deine Familie noch{" "}
          <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            erinnert
          </span>
          .
        </h1>

        <p className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/85 font-light opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          Dein Onkel, der noch nie etwas hat staunen lassen, sitzt mit offenem Mund da.
          Deine Cousine lacht so laut, dass alle hingucken. Und das Geburtstagskind?
          Steht im Mittelpunkt — ohne sich peinlich zu fühlen.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <a href="#empfehlung" className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
            <span>30 Sek: Was passt zu deiner Feier?</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link to="/buchung" className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors">
            Direkt anfragen
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-4 text-xs md:text-sm text-white/55 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          Kostenlos · Unverbindlich · Antwort innerhalb 24h · Diskret organisiert
        </p>
      </div>
    </div>
  </section>
);

/* 2 · TRUST STRIP */
const TrustStrip = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="border-y border-foreground/8 bg-foreground/[0.015] py-8">
      <div className="container px-6">
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { num: "500+", label: "Private Feiern" },
            { num: "5,0", label: "ProvenExpert · 30+" },
            { num: "10 J.", label: "Erfahrung" },
            { num: "24h", label: "Antwortzeit" },
            { num: "8–80", label: "Generationen" },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <span className="font-display font-bold text-foreground text-base md:text-lg">{item.num}</span>
              <span className="text-xs md:text-sm text-foreground/55">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 3 · QUIZ */
const geburtstagQuizConfig: QuizConfig = {
  anlass: "Geburtstag",
  sectionEyebrow: "Format-Finder",
  sectionTitle: (
    <>
      Was passt zu deiner{" "}
      <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        Feier
      </span>
      ?
    </>
  ),
  sectionDesc:
    "Fünf kurze Fragen — danach weißt du, ob Close-Up, Bühnenshow oder eine Mischung am besten zu deiner Geburtstagsfeier passt. Du kannst direkt absenden, wenn du willst.",
  questions: [
    {
      id: "geburtstag",
      shortLabel: "Geburtstag",
      title: (
        <>
          Welcher{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Geburtstag</span> ist es?
        </>
      ),
      hint: "Je nach Generation der Hauptperson stimme ich Tonalität und Programm ab — bei einem 30er ticken die Erwartungen anders als bei einem 70er.",
      cols: { md: 2, lg: 3 },
      options: [
        { value: "30er", label: "30. Geburtstag", sub: "Junge Erwachsene, lockerer Rahmen", icon: Sparkles },
        { value: "40er", label: "40. Geburtstag", sub: "Familie & beste Freunde", icon: Cake },
        { value: "50er", label: "50. Geburtstag", sub: "Großer Kreis, oft Highlight-Anspruch", icon: PartyPopper },
        { value: "60er", label: "60. Geburtstag", sub: "Mehrere Generationen mischen sich", icon: Users },
        { value: "70plus", label: "70. / 80. / 90.", sub: "Würdiger Rahmen, Familienkreis", icon: Crown },
        { value: "anders", label: "Etwas anderes", sub: "Jubiläum, Polterabend, runder Tag", icon: Gift },
      ],
    },
    {
      id: "wer",
      shortLabel: "Gäste",
      title: (
        <>
          Wer{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>feiert</span> mit?
        </>
      ),
      hint: "Wenn alle sich kennen, läuft Magie ganz anders, als wenn drei Welten — Familie, Job, alte Freunde — an einem Tisch sitzen.",
      cols: { md: 3 },
      options: [
        { value: "familie", label: "Vor allem Familie", sub: "Generationen-Mix, alle bekannt" },
        { value: "freunde", label: "Vor allem Freunde", sub: "Gleichaltrige, lockerer Ton" },
        { value: "mix", label: "Bunt gemischt", sub: "Familie + Freunde + Kollegen" },
      ],
    },
    {
      id: "ort",
      shortLabel: "Ort",
      title: (
        <>
          Wo wird{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>gefeiert</span>?
        </>
      ),
      hint: "Der Ort entscheidet über das Format. Im Wohnzimmer brauche ich keine Bühne; in einer 200-Leute-Eventlocation schon.",
      cols: { md: 2, lg: 4 },
      options: [
        { value: "zuhause", label: "Zuhause", sub: "Wohnzimmer, Garten, Terrasse", icon: Home },
        { value: "garten", label: "Im Garten", sub: "Outdoor, Pavillon, Gartenhaus", icon: Trees },
        { value: "restaurant", label: "Restaurant", sub: "Reservierter Raum, Saal", icon: UtensilsCrossed },
        { value: "location", label: "Eventlocation", sub: "Gemietete Halle, Hotel-Saal", icon: Building2 },
      ],
    },
    {
      id: "groesse",
      shortLabel: "Größe",
      title: (
        <>
          Wie{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>groß</span> ist die Runde?
        </>
      ),
      hint: "Close-Up funktioniert ab 8 Personen. Eine Bühnenshow lohnt sich erst ab ca. 25 — sonst wirkt sie überdimensioniert.",
      cols: { md: 3 },
      options: [
        { value: "klein", label: "bis 25 Gäste", sub: "Engster Kreis" },
        { value: "mittel", label: "25 – 60 Gäste", sub: "Klassische Geburtstagsrunde" },
        { value: "groß", label: "60+ Gäste", sub: "Großer Empfang, Highlight-Show" },
      ],
    },
    {
      id: "wirkung",
      shortLabel: "Wirkung",
      title: (
        <>
          Was soll{" "}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>hängenbleiben</span>?
        </>
      ),
      hint: "Was ist dir am wichtigsten? Die Empfehlung wird darauf zugeschnitten — eine Überraschung läuft anders ab als ein durchgeplantes Highlight.",
      cols: { md: 2 },
      options: [
        { value: "ueberraschung", label: "Eine echte Überraschung", sub: "Niemand außer dir weiß, dass ich komme", icon: Gift },
        { value: "highlight", label: "Das Highlight des Abends", sub: "Eine durchkomponierte Show als zentraler Moment", icon: Sparkles },
        { value: "stimmung", label: "Lockere Stimmung", sub: "Magie als roter Faden zwischen Essen, Reden, Tanz", icon: PartyPopper },
        { value: "verbinden", label: "Generationen verbinden", sub: "Etwas, das von 8 bis 80 funktioniert", icon: Heart },
      ],
    },
  ],
  buildEmpfehlung: (a) => {
    const { wirkung, groesse, ort } = a;
    if (wirkung === "ueberraschung") {
      return {
        format: "Überraschungs-Auftritt mit Close-Up",
        sub: "30–60 Min · diskret eingefädelt",
        why: "Ich komme unauffällig (nicht im Bühnen-Outfit), starte beim richtigen Moment — z. B. nach dem Hauptgang — und das Geburtstagskind merkt erst dann, was los ist, wenn die erste Karte verschwindet. Vorher wird alles diskret per Telefon abgestimmt.",
        link: "/close-up",
      };
    }
    if (wirkung === "highlight" || groesse === "groß") {
      return {
        format: "Bühnenshow als Mittelpunkt",
        sub: "20–45 Min · klar als Programmpunkt angekündigt",
        why: "Eine durchkomponierte Show mit Comedy, Magie und persönlichem Bezug zum Geburtstagskind. Funktioniert ab ca. 25 Gästen aufwärts und braucht eine kleine Bühne oder einen freien Bereich.",
        link: "/buehnenshow",
      };
    }
    if (wirkung === "verbinden" || ort === "zuhause") {
      return {
        format: "Close-Up Magie",
        sub: "45–90 Min · von Tisch zu Tisch",
        why: "Ich gehe von Gruppe zu Gruppe — bei jedem Tisch passiert etwas Eigenes. Generationen-tauglich, kein Bühnen-Setup nötig, funktioniert auch in kleinen Räumen. Der natürlichste Eisbrecher zwischen Familie und Freunden.",
        link: "/close-up",
      };
    }
    return {
      format: "Close-Up + Mini-Bühnenshow",
      sub: "Gesamt 60–90 Min · 2 Phasen",
      why: "Erst gehe ich beim Empfang oder zwischen den Gängen herum (Close-Up). Später dann ca. 20 Min Bühnen-Show als Highlight — mit persönlichem Bezug zum Geburtstagskind. Die Kombi, die bei runden Geburtstagen am häufigsten gebucht wird.",
      link: "/buchung",
    };
  },
  gaesteFromAnswers: (a) =>
    a.groesse === "klein" ? 18 : a.groesse === "mittel" ? 40 : a.groesse === "groß" ? 80 : null,
};

const QuizSection = () => <QuizWizardInline config={geburtstagQuizConfig} />;

/* 4 · DER EINE MOMENT */
const DerMomentSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 lg:py-40 border-y border-foreground/8">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`md:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
              Worum es eigentlich geht
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
              Es geht nicht um Tricks. Es geht um den einen{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Moment
              </span>
              .
            </h2>
            <div className="mt-8 space-y-5 text-foreground/70 leading-[1.6] max-w-xl text-base md:text-lg font-light">
              <p>
                Der eine Moment, in dem dein 14-jähriger Cousin und deine Tante
                gleichzeitig „Was zur Hölle?“ sagen — und sich danach
                anlachen, weil sie sich gerade in dieser Sekunde verstanden haben.
              </p>
              <p>
                Das ist der Moment, der hängenbleibt. Nicht die Karte, nicht der
                Trick — sondern dass dein Cousin und deine Tante danach drei Minuten
                lang miteinander reden, obwohl sie das Jahre nicht gemacht haben.
              </p>
            </div>
          </div>
          <div className={`md:col-span-5 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src={staunenImg} alt="Gemeinsames Staunen" className="w-full h-full object-cover" loading="lazy" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 5 · GENERATIONEN — visuell, big numbers */
const GenerationenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const data = [
    {
      num: "30",
      label: "Junge Erwachsene",
      empfehlung: "Close-Up, schnell und ironisch",
      tone: "Locker, Insta-tauglich, schnelle Pointen",
      img: closeupImg,
    },
    {
      num: "40",
      label: "Familie & Freunde",
      empfehlung: "Close-Up + 15 Min Mini-Show",
      tone: "Erstes wirklich gemischtes Publikum",
      img: emotionenImg,
    },
    {
      num: "50",
      label: "Bewusst inszeniert",
      empfehlung: "Bühnenshow als Highlight",
      tone: "Häufigster runder Geburtstag",
      img: stageImg,
      featured: true,
    },
    {
      num: "60",
      label: "Mehrere Welten",
      empfehlung: "Komplett-Begleitung",
      tone: "Familie, Freunde, manchmal Kollegen",
      img: dinnerImg,
    },
    {
      num: "70+",
      label: "Würdig, persönlich",
      empfehlung: "Close-Up im engen Kreis",
      tone: "Kleinere Runden, viel Eye-Contact",
      img: haendeImg,
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 md:mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Generationen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Jeder runde Geburtstag — ein eigener Ton.
          </h2>
          <p className="mt-5 text-base md:text-lg text-foreground/65 leading-[1.55] font-light max-w-2xl">
            Nach 500+ privaten Feiern: bei jedem runden Geburtstag tickt das Publikum
            anders. Hier eine ehrliche Einschätzung — kein Standard-Programm.
          </p>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {data.map((row, i) => (
            <div
              key={row.num}
              className={`group relative rounded-3xl overflow-hidden ${row.featured ? "col-span-2 md:col-span-1 md:row-span-1" : ""}`}
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={row.img} alt={row.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,10,25,0.15) 0%, rgba(15,10,25,0.55) 60%, rgba(15,10,25,0.92) 100%)",
                  }}
                />
                {row.featured && (
                  <div
                    aria-hidden
                    className="absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase text-white"
                    style={{ background: GRADIENT }}
                  >
                    Häufigster
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
                  <span
                    className="block font-display font-black leading-none tracking-[-0.04em] mb-3"
                    style={{
                      fontSize: "clamp(3rem, 5vw, 4.5rem)",
                      background: GRADIENT_LIGHT,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {row.num}
                  </span>
                  <p className="text-[11px] tracking-[0.16em] uppercase text-white/55 mb-2">
                    {row.tone}
                  </p>
                  <p className="font-display font-bold text-base leading-tight mb-1">
                    {row.label}
                  </p>
                  <p className="text-[13px] text-white/75 leading-snug font-light">
                    {row.empfehlung}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 6 · SETTING — bold image cards */
const SettingSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const settings = [
    {
      icon: Home,
      label: "Zuhause",
      what: "Wohnzimmer · Esszimmer · enger Kreis",
      best: "Close-Up · ab 8 Personen",
      note: "Kein Strom, kein Mikrofon, kein Aufbau. Mein Standard für Familien-Feiern bis 25 Leute — ich passe mich an euren Raum an.",
      img: emotionenImg,
    },
    {
      icon: Trees,
      label: "Garten / Terrasse",
      what: "Outdoor · Pavillon · Sommer-Feier",
      best: "Close-Up an Stehtischen",
      note: "Tageslicht macht Bühnenshow schwierig — Close-Up an der Bar oder zwischen den Stehtischen funktioniert dafür perfekt.",
      img: audienceImg,
    },
    {
      icon: UtensilsCrossed,
      label: "Restaurant",
      what: "Reservierter Raum · Saal · Separée",
      best: "Close-Up zwischen den Gängen",
      note: "Häufigster Spielort für Geburtstage. Ich gehe von Tisch zu Tisch, die Gäste essen weiter — kein Programm-Bruch nötig.",
      img: dinnerImg,
    },
    {
      icon: Building2,
      label: "Eventlocation",
      what: "Hotel-Saal · gemietete Halle · 60+ Gäste",
      best: "Bühnenshow + Empfangs-Magie",
      note: "Volle Bandbreite: Mikrofon, kleine Bühne, durchkomponiertes Highlight. Technik klären wir vorab mit der Location.",
      img: buehneImg,
    },
  ];
  return (
    <section ref={ref} className="bg-foreground/[0.02] py-24 md:py-32 border-y border-foreground/8 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(285 80% 88%) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(225 95% 88%) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="container px-6 relative z-10">
        <div className={`max-w-3xl mb-14 md:mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Wo es passiert
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Vier Settings — vier{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Spielarten
            </span>{" "}
            der Magie.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {settings.map((s, i) => (
            <div
              key={s.label}
              className={`group relative rounded-3xl overflow-hidden aspect-[5/4] md:aspect-[3/2] ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              <img src={s.img} alt={s.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(15,10,25,0.25) 0%, rgba(15,10,25,0.55) 50%, rgba(15,10,25,0.92) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: GRADIENT, opacity: 0.85 }}
              />
              <div className="absolute top-5 right-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9 text-white">
                <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/55 mb-2 font-semibold">
                  {s.what}
                </p>
                <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl tracking-[-0.01em] mb-3">
                  {s.label}
                </h3>
                <p
                  className="inline-block text-[13px] md:text-sm font-semibold tracking-wide mb-4 px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {s.best}
                </p>
                <p className="text-sm md:text-[15px] text-white/80 leading-[1.5] font-light max-w-md">
                  {s.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 7 · STORY — light editorial */
const StorySection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(340 95% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(225 95% 88%) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10 lg:gap-16">
          <div className={`md:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
              Echter Fall · Christina, 50
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
              „Mein Mann hat das hinter meinem Rücken gebucht — ich saß da und wusste nicht, wie mir{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                geschah
              </span>
              ."
            </h2>
            <div className="mt-8 space-y-5 text-foreground/70 leading-[1.6] text-base md:text-lg font-light max-w-xl">
              <p>
                35 Gäste, ein Restaurant in der Nähe von Regensburg. Christina dachte, es sei
                ein normales Geburtstagsessen. Ihr Mann hatte mich Wochen vorher angerufen — wir
                hatten genau einen Punkt definiert: nach dem Hauptgang, ohne Ankündigung.
              </p>
              <p>
                Ich kam unauffällig in Jeans rein, setzte mich kurz an den Nebentisch.
                Dann stand ich auf, nahm eine Karte vom Tisch der Schwester, und alles
                drehte sich. 90 Minuten später hatte Christina zwei Mal feuchte Augen — und
                ihre Mutter sagte am Ende, das sei der beste Geburtstag gewesen, den sie je
                erlebt habe.
              </p>
            </div>
          </div>
          <div className={`md:col-span-5 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <div className="rounded-3xl border border-foreground/10 bg-white shadow-[0_20px_60px_-20px_rgba(40,20,60,0.15)] p-7 md:p-8">
              <p className="text-[10px] md:text-xs tracking-[0.18em] uppercase text-foreground/40 mb-5">
                Specs
              </p>
              <dl className="space-y-4">
                {[
                  { k: "Anlass", v: "50. Geburtstag · Überraschung" },
                  { k: "Gäste", v: "35 · Familie & engste Freunde" },
                  { k: "Ort", v: "Restaurant nahe Regensburg" },
                  { k: "Format", v: "Close-Up + Mini-Bühnenshow" },
                  { k: "Dauer", v: "ca. 90 Min" },
                  { k: "Vorbereitung", v: "2× Telefonat mit Ehemann" },
                ].map((row) => (
                  <div key={row.k} className="grid grid-cols-3 gap-3 text-sm border-b border-foreground/8 pb-3 last:border-0">
                    <dt className="text-foreground/45 col-span-1">{row.k}</dt>
                    <dd className="text-foreground/85 col-span-2 font-medium">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-5 border-t border-foreground/8">
                <p className="text-xs text-foreground/40 mb-2">Kunden-Bewertung</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 8 · STIMMEN */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const stimmen = [
    {
      quote:
        "Emilian hat unseren 50. Geburtstag unvergesslich gemacht. Die Mischung aus Close-Up und Bühnenshow war perfekt — und alle reden noch heute davon.",
      name: "Christina",
      ctx: "50. Geburtstag · 35 Gäste · ProvenExpert",
    },
    {
      quote:
        "Wir haben Emilian zum 60. meines Vaters überrascht. Er hatte etwas Wichtiges in das Programm eingebaut, das nur unsere Familie verstanden hat. Mein Vater hatte Tränen in den Augen.",
      name: "Stefanie M.",
      ctx: "60. Geburtstag · 45 Gäste · ProvenExpert",
    },
    {
      quote:
        "Erst war ich skeptisch, ob ein Zauberer auf einem 70er passt. Aber er war ruhig, persönlich, hat sich Zeit für jeden genommen — und meine Oma hat sich gefreut wie ein Kind.",
      name: "Markus L.",
      ctx: "70. Geburtstag · Familienkreis · ProvenExpert",
    },
  ];
  return (
    <section ref={ref} className="bg-foreground/[0.02] py-24 md:py-32 border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Stimmen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Was{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Gastgeber
            </span>{" "}
            sagen.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {stimmen.map((s, i) => (
            <blockquote
              key={s.name}
              className={`p-7 md:p-8 rounded-3xl bg-white border border-foreground/8 flex flex-col ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.05 + i * 0.08}s` }}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-base md:text-[17px] leading-[1.55] text-foreground/85 font-light flex-1">
                „{s.quote}“
              </p>
              <footer className="mt-6 pt-5 border-t border-foreground/8">
                <p className="font-display font-semibold text-foreground text-sm">{s.name}</p>
                <p className="text-xs text-foreground/50 mt-0.5">{s.ctx}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 9 · ABLAUF — vertical timeline */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const phases = [
    {
      time: "Empfang",
      title: "Close-Up als Eisbrecher",
      desc: "Ich gehe unauffällig durch die Gäste. Wer noch fremd ist, kommt ins Gespräch — Magie als sozialer Türöffner.",
    },
    {
      time: "Zwischen den Gängen",
      title: "Tisch zu Tisch",
      desc: "Während serviert wird oder zwischen Hauptgang und Dessert — kurze, intensive Momente mit kleinen Gruppen.",
    },
    {
      time: "Höhepunkt",
      title: "Mini-Bühnenshow (optional)",
      desc: "Wenn ihr wollt: 15–25 Min ungeteilte Aufmerksamkeit, alle gemeinsam staunen, persönlicher Bezug zum Geburtstagskind.",
    },
    {
      time: "Danach",
      title: "Ich gehe leise",
      desc: "Kein Aufdrängen, keine lange Verabschiedung. Nach der Show packe ich ein, zahle danach und ihr feiert weiter.",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Wie der Abend abläuft
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Vier Phasen — kein{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Programm-Bruch
            </span>
            .
          </h2>
        </div>
        <div className={`max-w-4xl ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <div className="relative pl-8 md:pl-10 border-l-2 border-foreground/15">
            {phases.map((p, i) => (
              <div key={p.time} className={`relative ${i !== phases.length - 1 ? "pb-10 md:pb-12" : ""}`}>
                <div className="absolute -left-[37px] md:-left-[45px] top-1 w-5 h-5 rounded-full border-4 border-background" style={{ background: GRADIENT }} />
                <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-2">
                  {p.time}
                </p>
                <h3 className="font-display font-bold text-foreground text-xl md:text-2xl mb-2">
                  {p.title}
                </h3>
                <p className="text-foreground/65 leading-[1.55] text-base font-light max-w-xl">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 10 · GALERIE — clean grid, keine Lücken */
const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    { src: galHeroBirthday, alt: "Geburtstagsfeier" },
    { src: galPortraitKarten, alt: "Karten-Moment" },
    { src: galSchneiderCloseup, alt: "Close-Up im Restaurant" },
    { src: galMagicdinnerBook, alt: "Magic Dinner Buch-Effekt" },
    { src: galZuschauerBlau, alt: "Begeistertes Publikum" },
    { src: galHeroCloseup, alt: "Close-Up nah" },
    { src: galMagicdinnerBuehne, alt: "Magic Dinner Bühne" },
    { src: galBuehneDpsg, alt: "Bühnenshow groß" },
  ];
  return (
    <section ref={ref} className="bg-foreground/[0.02] py-24 md:py-32 border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Momente
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Aus echten{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Geburtstagsfeiern
            </span>
            .
          </h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {images.map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden aspect-square group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 11 · BUCHUNGS-FLOW PRIVAT */
const BuchungsFlowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { icon: MessageCircle, title: "Kurze Nachricht", desc: "WhatsApp, E-Mail oder Formular — schreib mir Datum, ungefähre Gästezahl und was du dir vorstellst. Reicht für den Start." },
    { icon: Phone, title: "Telefonat (15 Min)", desc: "Ich rufe dich zurück. Wir besprechen Anlass, Setting, Geburtstagskind, Wirkung. Oft ist die Empfehlung danach klar." },
    { icon: Mail, title: "Konkretes Angebot", desc: "Per E-Mail mit transparentem Preis, Format, Dauer, Optionen. Keine Vorlagen-Texte — alles auf deine Feier zugeschnitten." },
    { icon: Check, title: "Buchung & Briefing", desc: "Du bestätigst. Etwa 1 Woche vorher kurzer Call: persönlicher Bezug zum Geburtstagskind, Logistik, Überraschungs-Plan." },
    { icon: Calendar, title: "Der Abend", desc: "Ich bin 30 Min früher da, kenne deinen Namen, weiß was los ist. Du kümmerst dich um deine Gäste — den Rest mache ich." },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Wie es funktioniert
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Fünf Schritte — kein{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Stress
            </span>
            .
          </h2>
          <p className="mt-5 text-base md:text-lg text-foreground/65 leading-[1.55] font-light max-w-2xl">
            Zwischen erster Nachricht und fertiger Buchung liegen meist 2–3 Tage. Vorbereitungs-Aufwand
            für dich: praktisch null.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-4 md:gap-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative p-6 rounded-2xl bg-white border border-foreground/10 hover:border-foreground/25 transition-colors overflow-hidden ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: GRADIENT }}
              />
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-[0_6px_18px_-6px_rgba(80,60,180,0.45)]"
                  style={{ background: GRADIENT }}
                >
                  <s.icon className="w-4 h-4" />
                </div>
                <span
                  className="font-display font-black text-2xl md:text-3xl tracking-[-0.02em]"
                  style={{
                    background: GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground text-base md:text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-[1.5] font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 12 · FAQ */
const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    {
      q: "Kann ich den Auftritt als Überraschung organisieren?",
      a: "Ja — das ist mein häufigster Fall. Ich komme unauffällig (nicht im Bühnen-Outfit), wir vereinbaren ein klares Stichwort oder einen Zeitpunkt, und das Geburtstagskind merkt erst etwas, wenn die erste Karte verschwindet. Vorab klären wir alles per Telefon, damit du keine verdächtigen E-Mails bekommst.",
    },
    {
      q: "Ab wie vielen Gästen lohnt sich das?",
      a: "Close-Up funktioniert ab 8 Personen. Eine Bühnenshow lohnt sich erst ab ca. 25 — sonst wirkt sie überdimensioniert. Wenn du unsicher bist, frag — meist ist die Antwort nach 5 Min Telefonat klar.",
    },
    {
      q: "Was, wenn meine Gäste sehr unterschiedlichen Alters sind?",
      a: "Genau dafür ist Comedy-Magie gemacht. Mein Programm funktioniert von 8 bis 80 — keine Insider-Witze, keine peinlichen Aufgaben, kein „kommen Sie mal nach vorne“. Generationen verbinden ist das Kerngeschäft.",
    },
    {
      q: "Brauche ich technisches Equipment, Mikrofon, Bühne?",
      a: "Für Close-Up nichts. Für eine Bühnenshow bringe ich Mikrofon und Lautsprecher mit, brauche nur eine Steckdose. Bei großen Eventlocations stimmen wir Technik vorab mit der Location ab.",
    },
    {
      q: "Wie weit fährst du?",
      a: "Standardgebiet ist Bayern — Anreise innerhalb 100 km um Regensburg ist oft im Preis. Darüber hinaus deutschlandweit, mit transparenten Anreise-Kosten. Internationale Termine auf Anfrage.",
    },
    {
      q: "Wann muss ich spätestens buchen?",
      a: "Idealerweise 4–8 Wochen vorher — dann sind beliebte Termine noch frei. Spontane Anfragen klappen je nach Saison auch in 1–2 Wochen. Frag einfach, ich sag dir ehrlich, ob es geht.",
    },
    {
      q: "Was passiert, wenn etwas dazwischenkommt?",
      a: "Bis 4 Wochen vor dem Termin kannst du kostenfrei verschieben. Bei Krankheit oder echten Notfällen finden wir auch kurzfristig eine Lösung — alles im Vertrag schwarz auf weiß.",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
            Häufige Fragen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.4vw,3.75rem)] text-foreground">
            Alles, was{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Gastgeber
            </span>{" "}
            fragen.
          </h2>
        </div>
        <div className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer font-display text-base md:text-lg font-semibold text-foreground pr-8 hover:text-foreground/70 transition-colors list-none">
                  <span>{faq.q}</span>
                  <span className="text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl flex-shrink-0">+</span>
                </summary>
                <p className="text-foreground/65 leading-[1.6] mt-4 max-w-2xl text-base font-light">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 13 · ÜBER MICH KOMPAKT */
const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-foreground/[0.02] py-24 md:py-32">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`md:col-span-5 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img src={portraitImg} alt="Emilian Leber" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`md:col-span-7 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-5">
              Hi
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(1.8rem,3.8vw,3rem)] text-foreground">
              Ich bin{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Emilian
              </span>
              .
            </h2>
            <div className="mt-6 space-y-4 text-foreground/70 leading-[1.6] text-base md:text-lg font-light max-w-xl">
              <p>
                500+ private Feiern, 10 Jahre Comedy-Magie, ProvenExpert-Bewertung 5,0.
                Aber das sind nur Zahlen.
              </p>
              <p>
                Wichtiger ist: Ich behandle deine Familienfeier nicht wie einen Nebenjob.
                Vor jedem Termin ein Telefonat, persönlicher Bezug zum Geburtstagskind,
                und ich gehe leise wenn ich fertig bin.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/ueber-mich" className="inline-flex items-center gap-2 font-display font-semibold text-foreground hover:text-foreground/70 transition-colors border-b border-foreground/30 hover:border-foreground/60 pb-1">
                Mehr über mich
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 14 · FINAL CTA — image overlay (kein solid dark) */
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
            Deine Feier
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.25rem,5vw,4.75rem)] text-white">
            Erzähl mir von deiner{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Feier
            </span>
            .
          </h2>
          <p className="mt-6 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Datum, ungefähre Gästezahl, ein paar Sätze über das Geburtstagskind. Mehr brauche ich
            fürs erste nicht — alles weitere klären wir per Telefon.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link to="/buchung" className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
              <span>Anfrage starten</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#empfehlung" className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors">
              Erst zum Format-Finder
              <ChevronRight className="w-4 h-4" />
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

const Geburtstage = () => (
  <>
    <Helmet>
      <title>Zauberer für Geburtstage — Comedy-Magie für 30er, 50er, 60er & private Feiern | Emilian Leber</title>
      <meta name="description" content="Zauberer für Geburtstage — runde Geburtstage, private Feiern, Familienfeste. 500+ Feiern, ProvenExpert 5,0. Comedy-Magie als Überraschung oder Highlight, deutschlandweit buchbar." />
      <link rel="canonical" href="https://www.magicel.de/geburtstage" />
      <meta property="og:title" content="Zauberer für Geburtstage — Comedy-Magie für private Feiern | Emilian Leber" />
      <meta property="og:description" content="Comedy-Magie für 30er, 40er, 50er, 60er & runde Geburtstage. Als Überraschung, Highlight oder roter Faden — passend zu Familie, Freunden, jeder Generation." />
      <meta property="og:url" content="https://www.magicel.de/geburtstage" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Zauberer für Geburtstage — Comedy-Magie für private Feiern | Emilian Leber" />
      <meta name="twitter:description" content="Comedy-Magie für 30er, 40er, 50er, 60er & runde Geburtstage. Als Überraschung, Highlight oder roter Faden." />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Zauberer für Geburtstage","provider":{"@type":"Person","name":"Emilian Leber","url":"https://www.magicel.de"},"description":"Comedy-Magie für runde Geburtstage und private Feiern. Close-Up Magie und Bühnenshow als Überraschung, Highlight oder roter Faden.","areaServed":{"@type":"Country","name":"Deutschland"},"url":"https://www.magicel.de/geburtstage","aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"30"}})}</script>
    </Helmet>
    <Navigation />
    <main>
      <Hero />
      <TrustStrip />
      <QuizSection />
      <DerMomentSection />
      <UeberMichKurz />
      <GenerationenSection />
      <SettingSection />
      <StorySection />
      <StimmenSection />
      <AblaufSection />
      <GalerieSection />
      <BuchungsFlowSection />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default Geburtstage;
