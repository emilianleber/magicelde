import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Users,
  Sparkles,
  Wine,
  Mic2,
  Check,
  Phone,
  ClipboardList,
  PartyPopper,
  RotateCcw,
  Building2,
  Briefcase,
  Award,
  TrendingUp,
  FileText,
  ShieldCheck,
  Receipt,
  Lock,
  Handshake,
  Palette,
} from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";

import firmenHeroImg from "@/assets/hero-firmenfeier-stock.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import staunenImg from "@/assets/staunen.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import moderatorImg from "@/assets/moderator-hero.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import haendeInteraktionImg from "@/assets/haende-interaktion.jpg";
import closeupImg from "@/assets/closeup.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";

const GRADIENT =
  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)";
const GRADIENT_LIGHT =
  "linear-gradient(100deg, hsl(220 95% 78%) 0%, hsl(255 85% 78%) 50%, hsl(285 90% 78%) 100%)";

/* 1 · HERO */
const Hero = () => (
  <section className="relative min-h-screen overflow-hidden text-white flex flex-col bg-[#0f0a19]">
    <div className="absolute inset-0">
      <img src={firmenHeroImg} alt="" className="h-full w-full object-cover" />
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
            Kunden: <strong className="font-semibold text-white">STRABAG, Sixt, VKB</strong>
          </span>
        </div>

        <h1
          className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,5.6vw,5.25rem)] opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Macht eure Firmenfeier zum{" "}
          <span
            style={{
              background: GRADIENT_LIGHT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gesprächsstoff
          </span>
          .
        </h1>

        <p
          className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/85 font-light opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Ihr plant ein Sommerfest, eine Weihnachtsfeier oder ein Kunden-Event?
          Magie verbindet Abteilungen, bricht Hierarchien auf und liefert den
          Moment, über den am Montag noch geredet wird.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#empfehlung"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
          >
            <span>30 Sek: Was passt zum Event?</span>
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
          Kostenlos · Unverbindlich · Antwort innerhalb 24h · Rechnungsstellung
        </p>
      </div>
    </div>
  </section>
);

/* 2 · LOGO WALL — Trust-Stripe direkt unter Hero */
const LogoWallSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const kunden = [
    "STRABAG",
    "Sixt",
    "VKB",
    "Sparkasse",
    "Allianz",
    "Stadtwerke",
    "DPSG",
    "Wächter Agentur",
  ];
  return (
    <section ref={ref} className="bg-white py-16 md:py-20 border-b border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-10 md:mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.2em] uppercase text-foreground/45 font-semibold">
            Vertrauen von 200+ Firmenkunden
          </p>
          <p className="mt-4 font-display text-base md:text-lg text-foreground/65 font-light">
            Auswahl an Auftraggebern aus den letzten Jahren — Konzerne, Mittelstand, Agenturen.
          </p>
        </div>
        <div className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {kunden.map((k) => (
            <span
              key={k}
              className="font-display font-bold tracking-[-0.01em] text-foreground/35 hover:text-foreground/70 transition-colors text-xl md:text-2xl"
            >
              {k}
            </span>
          ))}
        </div>
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 text-sm text-foreground/65">
            <Check className="w-4 h-4" style={{ color: "hsl(255 60% 50%)" }} />
            Rechnung mit USt-Ausweis
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/65">
            <Check className="w-4 h-4" style={{ color: "hsl(255 60% 50%)" }} />
            Berufshaftpflicht versichert
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/65">
            <Check className="w-4 h-4" style={{ color: "hsl(255 60% 50%)" }} />
            DSGVO-konform
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/65">
            <Check className="w-4 h-4" style={{ color: "hsl(255 60% 50%)" }} />
            10+ Jahre Routine
          </div>
        </div>
      </div>
    </section>
  );
};

/* 3 · QUIZ */
type Antwort = "klein" | "mittel" | "groß" | "casual" | "formal" | "highend" | "team" | "kunden" | "extern";

const QuizSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [step, setStep] = useState(0);
  const [groesse, setGroesse] = useState<Antwort | null>(null);
  const [stil, setStil] = useState<Antwort | null>(null);
  const [zielgruppe, setZielgruppe] = useState<Antwort | null>(null);

  const reset = () => { setStep(0); setGroesse(null); setStil(null); setZielgruppe(null); };

  const empfehlung = (() => {
    if (!groesse || !stil || !zielgruppe) return null;
    if (zielgruppe === "kunden") {
      return {
        format: "Bühnenshow als Show-Highlight",
        sub: "15–60 Min · vor oder nach dem Dinner",
        why: "Bei Kunden-Events zählt der Wow-Effekt. Eine durchkomponierte Show — abgestimmt auf eure Branche, mit eingebauter Markenbotschaft — bleibt lange in Erinnerung.",
        link: "/buehnenshow",
      };
    }
    if (zielgruppe === "team") {
      return {
        format: "Close-Up beim Networking",
        sub: "20–70 Min · während Empfang & Häppchen",
        why: "Mitarbeiter aus verschiedenen Abteilungen kommen ins Gespräch. Magie ist der natürlichste Eisbrecher — danach reden alle miteinander, nicht nur in der eigenen Bubble.",
        link: "/close-up",
      };
    }
    if (zielgruppe === "extern") {
      return {
        format: "Komplett-Begleitung",
        sub: "Close-Up im Empfang + Bühnenshow",
        why: "Wenn externe Gäste, Partner und Mitarbeiter zusammenkommen, braucht ihr durchgehende Highlights. Magie als roter Faden über den ganzen Abend.",
        link: "/buchung",
      };
    }
    return null;
  })();

  const Step = ({ title, options, onChoice, selected }: { title: string; options: { value: Antwort; label: string; sub?: string }[]; onChoice: (v: Antwort) => void; selected: Antwort | null }) => (
    <div>
      <p className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 leading-tight">{title}</p>
      <div className="grid sm:grid-cols-3 gap-3">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChoice(o.value)}
            className={`text-left p-5 transition-all ${selected === o.value ? "bg-foreground text-white" : "bg-foreground/[0.04] hover:bg-foreground/[0.08] text-foreground"}`}
            style={{ borderRadius: "0.6rem" }}
          >
            <p className="font-display text-base md:text-lg font-bold leading-tight mb-1">{o.label}</p>
            {o.sub && (
              <p className="text-[12px] leading-snug" style={{ color: selected === o.value ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}>
                {o.sub}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="empfehlung" ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            In 30 Sekunden zur Empfehlung
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was passt zu{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              eurer Firmenfeier
            </span>
            ?
          </h2>
        </div>
        <div className={`max-w-4xl ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s", background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "1rem" }}>
          <div className="px-7 md:px-9 pt-7 pb-3 flex items-center gap-3 border-b border-foreground/8">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1.5 rounded-full transition-all" style={{ width: step >= i ? "32px" : "8px", background: step >= i ? "linear-gradient(90deg, hsl(220 85% 55%), hsl(255 75% 55%), hsl(285 85% 55%))" : "rgba(0,0,0,0.12)" }} />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-wider text-foreground/45 ml-2">{step < 3 ? `Frage ${step + 1} von 3` : "Eure Empfehlung"}</span>
            {step > 0 && (
              <button onClick={reset} className="ml-auto inline-flex items-center gap-1 text-xs text-foreground/55 hover:text-foreground transition-colors">
                <RotateCcw className="w-3 h-3" />Neu starten
              </button>
            )}
          </div>
          <div className="p-7 md:p-9">
            {step === 0 && <Step title="Wie groß ist euer Event?" selected={groesse} onChoice={(v) => { setGroesse(v); setStep(1); }} options={[
              { value: "klein", label: "Bis 50", sub: "Kleines Team-Event" },
              { value: "mittel", label: "50 – 200", sub: "Abteilungs-/Firmenfest" },
              { value: "groß", label: "200+", sub: "Großes Corporate-Event" },
            ]} />}
            {step === 1 && <Step title="Wie ist der Stil?" selected={stil} onChoice={(v) => { setStil(v); setStep(2); }} options={[
              { value: "casual", label: "Locker", sub: "Sommerfest, Team-Building" },
              { value: "formal", label: "Business", sub: "Weihnachtsfeier, Galaabend" },
              { value: "highend", label: "Premium", sub: "Kunden-Event, Award-Show" },
            ]} />}
            {step === 2 && <Step title="Wer ist eingeladen?" selected={zielgruppe} onChoice={(v) => { setZielgruppe(v); setStep(3); }} options={[
              { value: "team", label: "Eigene Mitarbeiter", sub: "Team-Verbindung im Fokus" },
              { value: "kunden", label: "Kunden / Partner", sub: "Wow-Effekt für externe Gäste" },
              { value: "extern", label: "Mix aus beiden", sub: "Networking-Event" },
            ]} />}
            {step === 3 && empfehlung && (
              <div className="animate-fade-up">
                <p className="text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold" style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Eure Empfehlung
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-black text-foreground mb-3 leading-[1.1]">{empfehlung.format}</h3>
                <p className="text-sm text-foreground/55 mb-6">{empfehlung.sub}</p>
                <p className="text-base md:text-[17px] text-foreground/75 leading-[1.6] mb-8 max-w-2xl">{empfehlung.why}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/buchung" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.01]" style={{ background: GRADIENT, boxShadow: "0 10px 30px hsl(255 75% 55% / 0.3)" }}>
                    Jetzt anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to={empfehlung.link} className="inline-flex items-center gap-2 font-display font-bold text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-1 transition-colors self-start py-3.5">
                    Mehr zum Format<ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 3 · 3 OPTIONEN */
const OptionenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const optionen = [
    { icon: Wine, time: "Empfang", title: "Close-Up Magie", desc: "Während Begrüßung, Sektempfang oder Steh-Empfang. Mitarbeiter verschiedener Abteilungen kommen ins Gespräch.", duration: "20–70 Min", passt: "Wenn Networking im Fokus steht" },
    { icon: Sparkles, time: "Show-Slot", title: "Bühnenshow", desc: "Zentrales Highlight nach Reden oder vor dem freien Teil. Mit eingebauter Markenbotschaft auf Wunsch.", duration: "15–60 Min", passt: "Wenn ihr einen klaren Wow-Moment für alle wollt", featured: true },
    { icon: Mic2, time: "Komplett", title: "Voll-Begleitung", desc: "Close-Up im Empfang + Bühnenshow als Highlight. Ein roter Faden über das ganze Event hinweg.", duration: "ganzer Abend", passt: "Wenn Magie das Leitthema sein soll" },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">Eure 3 Optionen</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            So <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>entscheidet ihr</span>.
          </h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {optionen.map((o) => (
            <div key={o.title} className={`relative p-7 md:p-8 flex flex-col ${o.featured ? "text-white" : "text-foreground"}`} style={{
              background: o.featured ? "linear-gradient(135deg, hsl(220 50% 18%) 0%, hsl(255 45% 22%) 50%, hsl(285 50% 22%) 100%)" : "rgba(0,0,0,0.02)",
              border: o.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.06)",
              borderRadius: "0.75rem",
              boxShadow: o.featured ? "0 30px 70px -20px rgba(60, 30, 80, 0.4)" : "none",
            }}>
              {o.featured && <span className="absolute -top-3 left-7 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ background: GRADIENT_LIGHT, color: "#0f0a19" }}>Beliebt</span>}
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-5" style={{ background: o.featured ? "rgba(255,255,255,0.12)" : "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))" }}>
                <o.icon className="w-5 h-5" style={{ color: o.featured ? "white" : "hsl(255 60% 40%)" }} />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={o.featured ? { background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" } : { background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {o.time} · {o.duration}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-black mb-3 leading-[1.1]">{o.title}</h3>
              <p className={`text-sm md:text-[15px] leading-[1.55] mb-5 ${o.featured ? "text-white/85" : "text-foreground/70"}`}>{o.desc}</p>
              <p className={`text-xs leading-[1.5] mt-auto pt-4 border-t ${o.featured ? "text-white/70 border-white/15" : "text-foreground/55 border-foreground/10"}`}>
                <strong className={o.featured ? "text-white" : "text-foreground"}>Passt</strong>, wenn: {o.passt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 4 · DREI SEKUNDEN */
const DreiSekundenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className={`lg:col-span-6 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="relative overflow-hidden" style={{ borderRadius: "0.75rem", aspectRatio: "4 / 5", boxShadow: "0 40px 80px -25px rgba(40, 20, 60, 0.3), 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <img src={staunenImg} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`lg:col-span-6 lg:pl-6 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">Der Moment</p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
              Der CEO trifft die Praktikantin —{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>und beide staunen</span>.
            </h2>
            <p className="mt-7 text-lg md:text-xl leading-[1.55] text-foreground/75 font-light">
              Eine Karte, die vor Sekunden noch in der Hand des Vorstandsvorsitzenden lag, taucht plötzlich in der Brieftasche der neuen Kollegin auf.
            </p>
            <p className="mt-5 text-base md:text-[17px] leading-[1.65] text-foreground/65">
              In dem Moment, in dem alle gemeinsam staunen, verschwinden Hierarchien. Genau das ist der Effekt, den ihr für eure Firmenfeier wollt — Verbindung über Abteilungen hinweg.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />))}
              </div>
              <p className="text-sm text-foreground/60">
                <strong className="text-foreground">200+ Firmenfeiern</strong> haben diesen Moment erlebt — durchgehend 5,0 Sterne.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 5 · BEISPIEL */
const BeispielSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className={`lg:col-span-5 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">Echtes Beispiel</p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
              Wie eine echte Firmenfeier{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>ablaufen kann</span>.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-[1.55] text-foreground/65 font-light">
              Damit ihr ein konkretes Bild habt, hier der Ablauf eines Magic Camps für 200 Kunden eines bayerischen Versicherers.
            </p>
            <div className="relative overflow-hidden mt-8" style={{ borderRadius: "0.5rem", aspectRatio: "4 / 5", boxShadow: "0 30px 60px -20px rgba(40, 20, 60, 0.25)" }}>
              <img src={moderatorImg} alt="Firmenfeier-Szene" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`lg:col-span-7 lg:pl-6 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="space-y-5">
              {[
                { time: "17:30", text: "Ankunft & Setup. Kurze Abstimmung mit Eventmanagern. Briefing zur Branche und einigen Insider-Themen." },
                { time: "18:00", text: "Empfang. 200 Kunden trudeln ein. Close-Up zwischen den Stehtischen — Eisbrecher zwischen Kollegen unterschiedlicher Filialen." },
                { time: "19:30", text: "Dinner. Während des Hauptgangs Tisch-zu-Tisch, 5–7 Min pro Tisch. Persönliche Magie für jede Runde." },
                { time: "21:00", text: "Bühnenshow. 30 Min mit eingebauter Branchenanekdote und einem versteckten Markenbezug. Standing Ovations." },
                { time: "22:00", text: "Nachklang. Kunden bleiben länger als geplant. Viele fragen nach Visitenkarten und buchen für ihre Privatevents." },
              ].map((e) => (
                <div key={e.time} className="flex items-start gap-5">
                  <span className="font-display text-base md:text-lg font-black tabular-nums shrink-0 leading-none mt-1 px-3 py-1.5 rounded-md" style={{ background: "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))", color: "hsl(255 60% 40%)" }}>
                    {e.time}
                  </span>
                  <p className="text-base md:text-[17px] text-foreground/75 leading-[1.6] flex-1 pt-1">{e.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-foreground/10">
              <p className="text-sm text-foreground/55 italic">Magic Camp · Bayerischer Versicherer · 200 Kunden · 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 6 · MEGA QUOTE — Jan von Lehmann (Wächter Agentur, echte Bewertung) */
const MegaQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <div aria-hidden className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-50 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(285 80% 88%) 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-50 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(220 95% 88%) 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div className="container px-6 relative z-10">
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span aria-hidden className="block font-display font-black leading-none mb-[-2.5rem] md:mb-[-4rem] select-none" style={{ fontSize: "clamp(8rem, 16vw, 16rem)", background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.7 }}>"</span>
          <blockquote>
            <p className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(1.75rem,4vw,3.25rem)] text-foreground">
              200 geladene Gäste eines bayerischen Versicherungsunternehmens hat Emilian mit einer eigens entwickelten Zaubertrickshow begeistert —{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>es war einfach Mega!</span>
            </p>
            <footer className="mt-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-display font-black text-white text-xl" style={{ background: "linear-gradient(135deg, hsl(220 70% 55%), hsl(255 70% 55%))" }}>J</div>
              <div>
                <p className="font-display font-bold text-foreground text-base">Jan von Lehmann</p>
                <p className="text-sm text-foreground/55">Eventmanagement Wächter Agentur · Google-Bewertung</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />))}
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

/* 8 · BRANCHEN-CASES — was funktioniert in welcher Branche */
const BranchenCasesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const cases = [
    {
      branche: "Versicherung",
      gaeste: "200 Kunden",
      anlass: "Magic Camp · Galaabend",
      what: "Bühnenshow mit eingebauter Branchenanekdote, Close-Up beim Empfang. Hierarchien gelöst, Kunden blieben länger als geplant.",
    },
    {
      branche: "IT-Konzern",
      gaeste: "500 Mitarbeiter",
      anlass: "Sommerfest · Firmengelände",
      what: "Tisch-zu-Tisch-Magie während des Caterings. Mitarbeiter aus verschiedenen Standorten kamen ins Gespräch — der CEO mehrfach genannt im Feedback-Bogen.",
    },
    {
      branche: "Sparkasse",
      gaeste: "80 Führungskräfte",
      anlass: "Strategie-Meeting · Tagungshotel",
      what: "Magie als Energizer zwischen Strategieblöcken. Aufmerksamkeitskurve gerettet, Stimmung gedreht — und ein Zaubertrick mit Filialnummern eingebaut.",
    },
    {
      branche: "Bauunternehmen",
      gaeste: "120 Gäste",
      anlass: "Weihnachtsfeier · Eventlocation",
      what: "Kombi aus Close-Up im Empfang und 30-Min-Bühnenshow nach dem Hauptgang. Mitarbeiter und Familie gemeinsam — alle Altersgruppen mitgenommen.",
    },
    {
      branche: "Mittelständler",
      gaeste: "60 Stammkunden",
      anlass: "Kunden-Event · Ausstellungshalle",
      what: "Close-Up während Werksführung, Show als Abschluss. Kunden buchten direkt vor Ort weitere Termine.",
    },
    {
      branche: "Agentur",
      gaeste: "40 Mitarbeiter",
      anlass: "Team-Event · Restaurant",
      what: "Magic Dinner zwischen den Gängen. Kreatives Team, wollte Inspiration — hat funktioniert: anschließend Brainstorming bis 1 Uhr nachts.",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">Branchen-Cases</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was in welcher{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Branche</span>{" "}
            funktioniert.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Sechs echte Beispiele aus den letzten Saisons — verschiedene Größen, verschiedene Anlässe, verschiedene Erkenntnisse.
          </p>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {cases.map((c) => (
            <article key={c.branche} className="relative p-7 md:p-8 flex flex-col bg-white" style={{ borderRadius: "0.75rem", boxShadow: "0 20px 50px -25px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.06)" }}>
              <div aria-hidden className="absolute top-0 left-7 right-7 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, hsl(220 85% 65%), hsl(255 75% 65%), hsl(285 80% 65%))" }} />
              <div className="flex items-center gap-2 mb-5">
                <Building2 className="w-4 h-4" style={{ color: "hsl(255 60% 50%)" }} />
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {c.branche}
                </p>
              </div>
              <h3 className="font-display text-2xl md:text-[1.6rem] font-black mb-1 text-foreground leading-[1.1]">{c.gaeste}</h3>
              <p className="text-sm text-foreground/55 mb-5">{c.anlass}</p>
              <p className="text-sm md:text-[15px] leading-[1.6] text-foreground/75">{c.what}</p>
            </article>
          ))}
        </div>
        <div className={`mt-12 max-w-2xl ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <p className="text-sm text-foreground/55 italic">
            Anonymisiert auf Wunsch der Kunden — Referenzen mit Namen und Kontakt auf Anfrage.
          </p>
        </div>
      </div>
    </section>
  );
};

/* 8 · GALERIE */
const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const photos = [
    { img: stageShowImg, span: "lg:col-span-2 lg:row-span-2", pos: "object-center" },
    { img: closeupImg, span: "", pos: "object-center" },
    { img: haendeInteraktionImg, span: "", pos: "object-center" },
    { img: emotionenImg, span: "", pos: "object-center" },
    { img: portraitImg, span: "", pos: "object-top" },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">Impressionen</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Echte{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Firmenevents</span>.
          </h2>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {photos.map((p, i) => (
            <div key={i} className={`${p.span} overflow-hidden group relative`} style={{ borderRadius: "0.5rem" }}>
              <img src={p.img} alt="" className={`w-full h-full object-cover ${p.pos} group-hover:scale-[1.04] transition-transform duration-700`} loading="lazy" />
              <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, hsl(220 85% 50% / 0.2), hsl(285 80% 50% / 0.2))", mixBlendMode: "overlay" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 9 · ZAHLEN */
const StatBlock = ({ end, suffix, label, desc }: { end: number; suffix: string; label: string; desc: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref}>
      <p className="font-display font-black leading-none tabular-nums tracking-[-0.02em] text-[clamp(3rem,6vw,5.5rem)]" style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
    <section ref={ref} className="relative overflow-hidden text-white py-24 md:py-32 lg:py-40 bg-[#0f0a19]">
      <div className="absolute inset-0">
        <img src={buehneZuschauerImg} alt="" className="w-full h-full object-cover" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(15,10,25,0.92) 0%, rgba(30,15,45,0.85) 50%, rgba(15,10,25,0.7) 100%)" }} />
      </div>
      <div className="relative z-10 container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/55 mb-6">Erfahrung in Zahlen</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,5vw,4.75rem)]">
            Was{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>200+ Firmenfeiern</span>{" "}
            ausmachen.
          </h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <StatBlock end={200} suffix="+" label="Firmenfeiern" desc="Vom Sommerfest bis zur Galaveranstaltung." />
          <StatBlock end={10} suffix="+" label="Jahre Routine" desc="Auch wenn der Zeitplan kippt — ich liefere." />
          <StatBlock end={5} suffix=",0" label="Sterne Bewertung" desc="Top-Bewertungen von Eventmanagern und HR." />
          <StatBlock end={24} suffix="h" label="Antwortzeit" desc="Persönliche Rückmeldung garantiert — auch im B2B-Tempo." />
        </div>
      </div>
    </section>
  );
};

/* 10 · MÖGLICHKEITEN */
const MoeglichkeitenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const moments = [
    { icon: Briefcase, title: "Markenbezug in der Show", desc: "Ein Firmensymbol erscheint plötzlich da, wo niemand es vermutet hätte. Markenbotschaft eingebaut — subtil, nicht plakativ." },
    { icon: Users, title: "Sales-Kick-Off Highlight", desc: "Vor oder nach dem CEO-Talk: Magie als Energizer, der die Stimmung im Raum dreht und die Botschaft bleibt." },
    { icon: Award, title: "Award-Show / Gala", desc: "Zwischen Preisverleihungen ein Magie-Slot als Atempause. Comedy hält die Spannung, Wow hält die Aufmerksamkeit." },
    { icon: Wine, title: "Close-Up im Empfang", desc: "Während Networking-Smalltalk besuche ich Gruppen — perfekter Eisbrecher für Mitarbeiter aus verschiedenen Standorten." },
    { icon: Mic2, title: "Moderation & Magie", desc: "Auf Wunsch übernehme ich auch die Moderation — eine Person, ein roter Faden, weniger Setup-Stress." },
    { icon: TrendingUp, title: "Kunden-Event-Aktivierung", desc: "Bei Roadshows, Messeständen oder Kundentagen: Magie als Magnet, der die Aufmerksamkeit ans Team holt." },
  ];
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">Eure Möglichkeiten</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was Magie auf eurer{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Firmenfeier</span>{" "}
            bewirkt.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Eine Firmenfeier ist mehr als Catering und Reden. Hier konkrete Möglichkeiten, wie ihr Zauberkunst einsetzen könnt — kombinierbar oder einzeln.
          </p>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {moments.map((m, i) => (
            <div key={m.title} className="p-7 md:p-8" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "0.75rem", animationDelay: `${0.1 + i * 0.06}s` }}>
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-5" style={{ background: "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))" }}>
                <m.icon className="w-5 h-5" style={{ color: "hsl(255 60% 40%)" }} />
              </div>
              <h3 className="font-display text-lg md:text-xl font-black mb-3 text-foreground leading-[1.2]">{m.title}</h3>
              <p className="text-sm md:text-[15px] leading-[1.6] text-foreground/65">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 13 · WAS FIRMEN BEKOMMEN — formale Procurement-Anforderungen */
const WasFirmenBekommenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    {
      icon: Receipt,
      title: "Rechnung mit USt-Ausweis",
      desc: "Vollständige Rechnung mit USt, Lieferanschrift und Anlass — vorbereitet für eure Buchhaltung.",
    },
    {
      icon: ShieldCheck,
      title: "Berufshaftpflicht",
      desc: "Vorhanden und auf Anfrage nachweisbar. Keine Hürde im Einkauf, keine Diskussion mit der Rechtsabteilung.",
    },
    {
      icon: Lock,
      title: "DSGVO-konform",
      desc: "Keine Datenweitergabe, signierte Auftragsverarbeitung auf Wunsch. Bilder und Daten nur nach Freigabe.",
    },
    {
      icon: Handshake,
      title: "Rahmenvertrag möglich",
      desc: "Für Konzerne und Agenturen: Rahmenvertrag mit festen Konditionen — schneller Auftrag pro Event ohne neuen Vertragsweg.",
    },
    {
      icon: Palette,
      title: "Branding einbaubar",
      desc: "Firmensymbol, Slogan oder Insider-Anekdote werden subtil in die Show integriert — nicht plakativ, sondern als Highlight.",
    },
    {
      icon: FileText,
      title: "Schriftliches Angebot",
      desc: "Festes Angebot innerhalb 24h — Leistungen klar definiert, keine versteckten Kosten, keine Ausreden hinterher.",
    },
  ];
  return (
    <section ref={ref} className="bg-foreground/[0.02] section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Procurement-Ready
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was Firmen bei mir{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              bekommen
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Außer der Show: alles, was eure Buchhaltung, Rechtsabteilung und der Einkauf brauchen — damit die Buchung nicht im Workflow stecken bleibt.
          </p>
        </div>
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {items.map((it) => (
            <div key={it.title} className="flex gap-5">
              <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))" }}>
                <it.icon className="w-5 h-5" style={{ color: "hsl(255 60% 40%)" }} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg md:text-xl font-black mb-2 text-foreground leading-[1.2]">{it.title}</h3>
                <p className="text-sm md:text-[15px] leading-[1.6] text-foreground/65">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 14 · BUCHUNGS-FLOW */
const BuchungsFlowSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { icon: Phone, num: "01", title: "Anfragen", desc: "Schickt mir Datum, Ort, Anlass und ungefähre Gästezahl. Antwort innerhalb 24h.", time: "2 Min" },
    { icon: ClipboardList, num: "02", title: "Konzept", desc: "30-Min-Call: Wir besprechen Ablauf, Branche, Wünsche. Ihr bekommt einen schriftlichen Vorschlag.", time: "30 Min" },
    { icon: PartyPopper, num: "03", title: "Event", desc: "Pünktliche Anreise, eigene Technik & Requisiten — ihr müsst nichts vorbereiten. Inkl. Rechnung mit USt-Ausweis.", time: "Euer großes Event" },
  ];
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">So einfach</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Drei Schritte zur{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>perfekten Firmenfeier</span>.
          </h2>
        </div>
        <div className={`relative ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <div aria-hidden className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px z-0" style={{ background: "linear-gradient(90deg, hsl(220 85% 65% / 0.5), hsl(255 75% 65% / 0.7), hsl(285 80% 65% / 0.5))" }} />
          <div className="relative z-10 grid md:grid-cols-3 gap-y-10 md:gap-x-8">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-start md:items-center text-left md:text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-white" style={{ background: "white", boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 10px 30px hsl(255 75% 55% / 0.15)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: GRADIENT }}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/45 mb-2 font-semibold">Schritt {s.num} · {s.time}</p>
                <h3 className="font-display text-xl md:text-2xl font-black text-foreground mb-3 leading-tight">{s.title}</h3>
                <p className="text-sm md:text-[15px] text-foreground/65 leading-[1.55]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 12 · FAQ */
const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: "Was kostet eine Show für Firmenfeiern?", a: "Pakete starten ab 395€. Endgültiger Preis hängt von Format, Dauer, Anreise und Gästezahl ab. Nach der Anfrage bekommt ihr ein verbindliches Angebot ohne versteckte Kosten — inkl. USt-Ausweis." },
    { q: "Wie weit im Voraus sollten wir buchen?", a: "Sommerfeste & Weihnachtsfeiern: 3–6 Monate Vorlauf ist ideal. Spontane Slots gehen auch — einfach trotzdem fragen." },
    { q: "Bei welcher Mitarbeiter-/Gästezahl funktioniert es?", a: "Von 20 bis 500+ Gästen alles möglich. Bei Close-Up erreiche ich auch große Gruppen durch Tisch-zu-Tisch-Magie." },
    { q: "Können wir die Markenbotschaft einbauen?", a: "Ja, sehr gern. Ein Firmensymbol, ein Slogan oder eine Insider-Anekdote kann subtil in die Show eingewebt werden — nicht plakativ, sondern als Highlight." },
    { q: "Tritt ihr auch außerhalb Bayerns auf?", a: "Schwerpunkt Bayern und Süddeutschland. Deutschlandweit und auch international buchbar — Anreise wird transparent abgerechnet." },
    { q: "Erhalten wir eine Rechnung mit USt-Ausweis?", a: "Selbstverständlich. Vollständige Rechnung mit USt-Ausweis, Lieferanschrift und Anlass — vorbereitet für eure Buchhaltung." },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className={`lg:col-span-4 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">FAQ</p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.05] text-[clamp(2rem,4vw,3.5rem)] text-foreground">
              Häufige <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Fragen</span>.
            </h2>
          </div>
          <div className={`lg:col-span-8 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-6">
                  <summary className="flex items-center justify-between cursor-pointer font-display text-lg md:text-xl font-bold text-foreground pr-8 list-none hover:text-foreground/70 transition-colors">
                    {faq.q}
                    <span className="text-foreground/30 group-open:rotate-45 transition-transform duration-300 text-2xl shrink-0">+</span>
                  </summary>
                  <p className="mt-4 text-base leading-[1.65] text-foreground/65 max-w-2xl">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 13 · FINAL CTA */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white py-28 md:py-36 bg-[#0f0a19]">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(15,10,25,0.86) 0%, rgba(15,10,25,0.7) 50%, rgba(15,10,25,0.55) 100%)" }} />
      </div>
      <div className="relative z-10 container px-6">
        <div className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/60 mb-8">Euer großes Event</p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.25rem,5vw,4.75rem)] text-white">
            Macht euer Event zum{" "}
            <span style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gesprächsstoff</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Schickt mir Datum, Ort und ungefähre Gästezahl — Antwort innerhalb 24h.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link to="/buchung" className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
              <span>Termin sichern</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+4915563744696" className="inline-flex items-center gap-2 font-display font-semibold text-white/85 hover:text-white border-b-2 border-white/25 hover:border-white pb-1 transition-colors">
              Direkt anrufen
            </a>
          </div>
          <p className="mt-4 text-sm text-white/55">Kostenlos · Unverbindlich · Antwort innerhalb 24h · Rechnung mit USt-Ausweis</p>
        </div>
      </div>
    </section>
  );
};

const Firmenfeiern = () => (
  <>
    <Helmet>
      <title>Zauberer für Firmenfeiern — Networking, Wow-Effekt, Markenbezug | Emilian Leber</title>
      <meta name="description" content="Zauberer für Firmenfeiern, Sommerfeste & Weihnachtsfeiern. STRABAG, Sixt, VKB & 200+ Firmenkunden. Magie als Eisbrecher und Show-Highlight — deutschlandweit buchbar." />
      <link rel="canonical" href="https://www.magicel.de/firmenfeiern" />
    </Helmet>
    <Navigation />
    <main>
      <Hero />
      <LogoWallSection />
      <QuizSection />
      <OptionenSection />
      <DreiSekundenSection />
      <BeispielSection />
      <MegaQuoteSection />
      <BranchenCasesSection />
      <GalerieSection />
      <ZahlenSection />
      <MoeglichkeitenSection />
      <WasFirmenBekommenSection />
      <BuchungsFlowSection />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default Firmenfeiern;
