import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCounter } from "@/hooks/useCounter";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Heart,
  Users,
  Sparkles,
  Smile,
  Camera,
  MessageCircle,
  Music,
  Clock,
  Check,
  X as XIcon,
  PhoneCall,
  ClipboardList,
  CheckCircle2,
  Award,
} from "lucide-react";

import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import weddingHeroImg from "@/assets/hero-hochzeit-stock.jpg";
import weddingMagicImg from "@/assets/wedding-magic.jpg";
import staunenImg from "@/assets/staunen.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import haendeInteraktionImg from "@/assets/haende-interaktion.jpg";
import closeupImg from "@/assets/closeup.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";

const GRADIENT =
  "linear-gradient(100deg, hsl(220 95% 62%) 0%, hsl(255 85% 58%) 50%, hsl(285 80% 55%) 100%)";
const GRADIENT_LIGHT =
  "linear-gradient(100deg, hsl(220 95% 78%) 0%, hsl(255 85% 78%) 50%, hsl(285 90% 78%) 100%)";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — full-bleed Hochzeitsfoto + Trust-Row + CTAs
   ═══════════════════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen overflow-hidden text-white flex flex-col">
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

    <div className="relative z-10 container px-6 pt-28 md:pt-32">
      <div className="flex items-center justify-between text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/70">
        <span>Zauberer · Hochzeit</span>
        <span aria-hidden className="hidden sm:block flex-1 mx-6 h-px bg-white/20" />
        <span>Bayern · Deutschlandweit</span>
      </div>
    </div>

    <div className="relative z-10 container px-6 flex-1 flex items-center py-20 md:py-24">
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
          className="font-display font-black tracking-[-0.02em] leading-[1] text-[clamp(2.5rem,5.8vw,5.5rem)] opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <span className="block">Magie für</span>
          <span
            className="block mt-1"
            style={{
              background: GRADIENT_LIGHT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            eure Hochzeit.
          </span>
        </h1>

        <p
          className="mt-10 max-w-xl text-lg md:text-xl leading-[1.55] text-white/85 font-light opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Der Moment, der eure Hochzeit zum Tagesgespräch macht. Während des
          Sektempfangs, beim Dinner oder als Show-Highlight — Zauberkunst, die
          eure Gäste verbindet, lachen lässt und niemals vergessen.
        </p>

        <div
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <Link
            to="/buchung"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-semibold text-[#0f0a19] bg-white hover:bg-white/95 transition-transform hover:scale-[1.01] shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
          >
            <span>Termin sichern</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#was-ihr-bekommt"
            className="group inline-flex items-center gap-3 text-white/85 hover:text-white transition-colors"
          >
            <span className="font-sans text-[15px] font-medium border-b-2 border-white/30 group-hover:border-white pb-0.5 transition-colors">
              Was ihr bekommt ↓
            </span>
          </a>
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
   2 · DER MOMENT — full-bleed cinematic statement
   ═══════════════════════════════════════════════════════════ */
const MomentSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-white py-32 md:py-40"
    >
      <div className="absolute inset-0">
        <img src={staunenImg} alt="" className="w-full h-full object-cover scale-105" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(15,10,25,0.85) 0%, rgba(30,15,45,0.7) 50%, rgba(15,10,25,0.4) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 container px-6">
        <div className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] tracking-[0.22em] uppercase text-white/60 mb-8">
            Der Moment
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.25rem,5.5vw,5rem)]">
            Wenn fremde Gäste{" "}
            <span
              style={{
                background: GRADIENT_LIGHT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              plötzlich zusammen lachen
            </span>
            .
          </h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Die Cousine der Braut trifft auf den Kollegen des Bräutigams. Drei
            Sekunden später teilen sie einen Moment, den keiner vergisst —
            und reden den ganzen Abend miteinander.
          </p>
          <p className="mt-5 text-base md:text-lg text-white/65 max-w-xl">
            Genau das ist die Magie auf einer Hochzeit: Gäste, die sich vorher
            nicht kannten, werden plötzlich zur Familie.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · ZEITSTRAHL — interaktiv: wann passt was
   ═══════════════════════════════════════════════════════════ */
const ZeitstrahlSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [active, setActive] = useState(0);
  const phasen = [
    {
      time: "Sektempfang",
      title: "Close-Up zum Eisbrechen",
      desc: "Während eurer Fotosession unterhalte ich die Gäste. Karten, Münzen, Magie zum Anfassen — der perfekte Eisbrecher zwischen Familien, die sich noch nicht kennen.",
      img: weddingMagicImg,
      duration: "60–90 Min",
    },
    {
      time: "Dinner",
      title: "Magie zwischen den Gängen",
      desc: "Statt langer Wartepausen zwischen den Gängen besuche ich jeden Tisch. Persönlich, charmant — und mit Tricks, von denen am Ende des Abends alle erzählen werden.",
      img: emotionenImg,
      duration: "ca. 90 Min",
    },
    {
      time: "Show-Slot",
      title: "Bühnenshow als Highlight",
      desc: "Eine durchkomponierte 20–30-min Show, abgestimmt auf eure Hochzeit. Comedy, Staunen, Interaktion — euer Tanz-Vorprogramm wird zum Gesprächsthema.",
      img: staunenImg,
      duration: "20–30 Min",
    },
    {
      time: "Tanzfläche",
      title: "Walking-Magic später",
      desc: "Wenn die Tanzfläche brennt, mische ich mich nochmal unter müde gewordene Gäste mit einem letzten Wow-Moment vor dem Aufbruch.",
      img: audienceImg,
      duration: "30–45 Min",
    },
  ];
  const a = phasen[active];
  return (
    <section ref={ref} id="was-ihr-bekommt" className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Der Tagesablauf
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Wann auf eurer Hochzeit{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              gezaubert wird
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-[1.55] text-foreground/65 font-light">
            Hochzeitsstress kennt jeder. Die Show passt sich an euren Ablauf
            an — nicht umgekehrt. Hier die typischen Slots:
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Tabs */}
          <div className="lg:col-span-5">
            <div className="space-y-2">
              {phasen.map((p, i) => (
                <button
                  key={p.time}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-5 md:p-6 transition-all ${
                    active === i
                      ? "bg-foreground text-white"
                      : "bg-foreground/[0.03] hover:bg-foreground/[0.06] text-foreground"
                  }`}
                  style={{ borderRadius: "0.6rem" }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-xs tabular-nums"
                        style={{
                          color: active === i ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.4)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg md:text-xl font-bold">
                        {p.time}
                      </h3>
                    </div>
                    <span
                      className="text-[11px] tracking-wider uppercase"
                      style={{
                        color: active === i ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.45)",
                      }}
                    >
                      {p.duration}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active panel */}
          <div className="lg:col-span-7">
            <div
              className="overflow-hidden"
              style={{
                borderRadius: "0.75rem",
                boxShadow:
                  "0 30px 60px -20px rgba(40, 20, 60, 0.25), 0 0 0 1px rgba(0,0,0,0.04)",
              }}
            >
              <div className="relative aspect-[16/10]">
                <img
                  key={a.img}
                  src={a.img}
                  alt={a.title}
                  className="absolute inset-0 w-full h-full object-cover animate-fade-in"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,10,25,0.7) 0%, rgba(15,10,25,0.1) 60%, transparent 90%)",
                  }}
                />
              </div>
              <div className="bg-white p-7 md:p-8">
                <p
                  className="text-[11px] tracking-[0.2em] uppercase mb-3 font-semibold"
                  style={{
                    background: GRADIENT,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {a.time} · {a.duration}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-black text-foreground mb-3 leading-[1.1]">
                  {a.title}
                </h3>
                <p className="text-base md:text-[17px] leading-[1.6] text-foreground/70">
                  {a.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · GAESTE-ERLEBNIS — 4 emotional moments
   ═══════════════════════════════════════════════════════════ */
const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const moments = [
    {
      icon: Heart,
      title: "Familien verbinden sich",
      desc: "Die Familien beider Seiten haben sich vorher kaum getroffen. Nach dem ersten Wow-Moment lachen sie zusammen — ohne Smalltalk-Zwang.",
    },
    {
      icon: Smile,
      title: "Niemand wird vorgeführt",
      desc: "Comedy entsteht aus der Situation, nicht auf Kosten einzelner Gäste. Auch eure schüchtersten Gäste fühlen sich wohl.",
    },
    {
      icon: Camera,
      title: "Beste Reaktionen für eure Fotos",
      desc: "Eure Fotografen lieben mich — weil sie endlich echte, ungestellte Reaktionen einfangen können.",
    },
    {
      icon: MessageCircle,
      title: "Gespräche für den ganzen Abend",
      desc: `„Hast du das gesehen?!" wird zum meistgesagten Satz eurer Hochzeit. Auch noch wochenlang danach.`,
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Was eure Gäste erleben
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Mehr als nur ein{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trick zwischendurch
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
              <h3 className="font-display text-xl md:text-2xl font-black mb-3 text-foreground leading-[1.15]">
                {m.title}
              </h3>
              <p className="text-base leading-[1.6] text-foreground/65">
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
   5 · STIMMEN von Brautpaaren
   ═══════════════════════════════════════════════════════════ */
const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    {
      quote:
        "Absolutes Highlight unserer Hochzeit! Alle Gäste haben gestaunt und gelacht. Wochen später wurde noch davon erzählt.",
      author: "Katrin & Markus",
      anlass: "Hochzeit · München · 2024",
      initial: "K",
      tint: "hsl(340 75% 55%)",
    },
    {
      quote:
        "Emilian war die beste Entscheidung, die wir für unsere Hochzeit getroffen haben. Charmant, witzig und mit allen Gästen perfekt umgegangen.",
      author: "Lisa & Tobias",
      anlass: "Hochzeit · Regensburg · 2023",
      initial: "L",
      tint: "hsl(255 70% 55%)",
    },
    {
      quote:
        "Wir hatten Sorge, dass es zu viel sein könnte — war es absolut nicht. Subtil, persönlich, jeder einzelne Gast hat es geliebt.",
      author: "Anna & Felix",
      anlass: "Hochzeit · Augsburg · 2024",
      initial: "A",
      tint: "hsl(220 70% 55%)",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Stimmen von Brautpaaren
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              andere Brautpaare
            </span>{" "}
            sagen.
          </h2>
        </div>
        <div
          className={`grid md:grid-cols-3 gap-5 md:gap-6 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {reviews.map((r) => (
            <article
              key={r.author}
              className="relative bg-white p-7 md:p-8 flex flex-col h-full"
              style={{
                borderRadius: "0.75rem",
                boxShadow:
                  "0 20px 50px -25px rgba(40, 20, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <div
                aria-hidden
                className="absolute top-0 left-7 right-7 h-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(220 85% 65%), hsl(255 75% 65%), hsl(285 80% 65%))",
                }}
              />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[15px] md:text-base leading-[1.6] text-foreground/85 flex-1">
                „{r.quote}"
              </p>
              <footer className="mt-6 pt-6 border-t border-foreground/8 flex items-center gap-3">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display font-black text-white text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${r.tint}, hsl(255 70% 55%))`,
                  }}
                >
                  {r.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-foreground text-sm">
                    {r.author}
                  </p>
                  <p className="text-[12px] text-foreground/55 truncate">
                    {r.anlass}
                  </p>
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
   6 · WAS DABEI IST — inkludiert
   ═══════════════════════════════════════════════════════════ */
const InklusiveSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    "Persönliches Vorgespräch und Konzeptabstimmung",
    "Anpassung an euren Tagesablauf und Location",
    "Eigene Technik & Requisiten — ihr müsst nichts vorbereiten",
    "Anreise innerhalb Bayerns inklusive",
    "Nach-Show-Smalltalk mit den Gästen",
    "Kostenlose Beratung zum perfekten Slot",
  ];
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div
            className={`lg:col-span-5 lg:sticky lg:top-24 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Was dabei ist
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
              Alles{" "}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                inklusive
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg leading-[1.55] text-foreground/65 font-light">
              Keine versteckten Kosten, keine Last-Minute-Überraschungen. Was
              du bei mir buchst, ist alles drin.
            </p>
          </div>
          <div
            className={`lg:col-span-7 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it}
                  className="flex items-start gap-4 p-5 md:p-6"
                  style={{
                    background: "rgba(0,0,0,0.02)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "0.75rem",
                  }}
                >
                  <div
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: GRADIENT }}
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="text-base md:text-[17px] text-foreground font-medium leading-[1.5]">
                    {it}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · TIPPS — How-to integrate magic into wedding
   ═══════════════════════════════════════════════════════════ */
const TippsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const tipps = [
    {
      icon: Clock,
      title: "Plant 60–90 Min Sektempfang",
      desc: "Genug Zeit für mich, um mit allen Gästen Kontakt zu haben — bevor das Dinner startet.",
    },
    {
      icon: Users,
      title: "Sprecht den Trauzeugen mit ein",
      desc: "Ein Insider-Witz oder eine persönliche Anekdote machen die Show noch persönlicher. Das stimmt ihr vorab mit mir ab.",
    },
    {
      icon: Music,
      title: "Show-Slot vor dem Hochzeitstanz",
      desc: "Genau dann sind alle Gäste an einem Ort, satt vom Dinner — und bereit für ein Highlight.",
    },
    {
      icon: Sparkles,
      title: "Foto-Brief an euren Fotografen",
      desc: "Sagt eurem Fotografen Bescheid, dass ich da bin. Echte Reaktionen sind die besten Hochzeitsfotos.",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-14 md:mb-16 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Aus 100+ Hochzeiten
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Tipps für{" "}
            <span
              style={{
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              den perfekten Slot
            </span>
            .
          </h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.1s" }}
        >
          {tipps.map((t) => (
            <div key={t.title} className="p-6 md:p-7"
              style={{
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: "0.75rem",
              }}
            >
              <t.icon className="w-7 h-7 mb-4" style={{ color: "hsl(255 60% 50%)" }} />
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 leading-tight">
                {t.title}
              </h3>
              <p className="text-sm text-foreground/65 leading-[1.6]">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · VERGLEICH klassischer vs moderner Hochzeitszauberer
   ═══════════════════════════════════════════════════════════ */
const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const klassisch = [
    "Frack, Zylinder, distanziert",
    "Kindergeburtstags-Tricks für Erwachsene",
    "Im Mittelpunkt steht der Trick",
    "Gäste sind Zuschauer",
    "Einstudierte Routinen",
  ];
  const modern = [
    "Anzug, persönlich, auf Augenhöhe",
    "Moderne Effekte, die auch Skeptiker überzeugen",
    "Im Mittelpunkt steht die Reaktion",
    "Gäste sind Teil der Show",
    "Improvisiert, situationsbezogen",
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Der Unterschied
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.8vw,4.5rem)] text-foreground">
            Was Hochzeitszauberei{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              modern macht
            </span>
            .
          </h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <div className="p-8 md:p-10" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "0.75rem" }}>
            <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/55 mb-5 font-semibold">Klassischer Zauberer</p>
            <ul className="space-y-3">
              {klassisch.map((it) => (
                <li key={it} className="flex items-start gap-3 text-foreground/65 text-[15px] leading-[1.5]">
                  <XIcon className="w-4 h-4 shrink-0 mt-1 text-foreground/35" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-10 text-white" style={{
            background: "linear-gradient(135deg, hsl(220 50% 18%) 0%, hsl(255 45% 22%) 50%, hsl(285 50% 22%) 100%)",
            borderRadius: "0.75rem",
            boxShadow: "0 30px 70px -20px rgba(40, 30, 80, 0.4)",
          }}>
            <p className="text-[11px] tracking-[0.2em] uppercase mb-5 font-semibold" style={{ background: GRADIENT_LIGHT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Moderner Hochzeitszauberer</p>
            <ul className="space-y-3">
              {modern.map((it) => (
                <li key={it} className="flex items-start gap-3 text-white/85 text-[15px] leading-[1.5]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-1 text-white" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · ZAHLEN für Hochzeiten — soft proof
   ═══════════════════════════════════════════════════════════ */
const StatBlock = ({ end, suffix, label, desc }: { end: number; suffix: string; label: string; desc: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div ref={ref}>
      <p className="font-display font-black leading-none tabular-nums tracking-[-0.02em] text-[clamp(3rem,5.5vw,5rem)]" style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        {count}{suffix}
      </p>
      <p className="text-[11px] tracking-[0.18em] uppercase text-foreground/50 mt-4">{label}</p>
      <p className="mt-3 text-sm text-foreground/60 max-w-[220px] leading-relaxed">{desc}</p>
    </div>
  );
};

const ZahlenHochzeitSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white section-large border-y border-foreground/8">
      <div className="container px-6">
        <div className={`max-w-2xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Hochzeiten in Zahlen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Was die Erfahrung{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ausmacht
            </span>
            .
          </h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <StatBlock end={100} suffix="+" label="Hochzeiten" desc="Vom intimen Standesamt bis zur 300-Gäste-Trauung." />
          <StatBlock end={10} suffix="+" label="Jahre Routine" desc="Auch wenn der Zeitplan kippt — ich liefere." />
          <StatBlock end={5} suffix=",0★" label="Bewertung" desc="Durchgehend Top-Bewertungen auf Google & ProvenExpert." />
          <StatBlock end={24} suffix="h" label="Antwortzeit" desc="Du bekommst eine persönliche Rückmeldung innerhalb 24h." />
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · GALERIE — visual mood
   ═══════════════════════════════════════════════════════════ */
const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const photos = [
    { img: weddingMagicImg, span: "lg:col-span-2 lg:row-span-2", pos: "object-center" },
    { img: emotionenImg, span: "", pos: "object-center" },
    { img: staunenImg, span: "", pos: "object-top" },
    { img: audienceImg, span: "", pos: "object-center" },
    { img: haendeInteraktionImg, span: "", pos: "object-center" },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className={`max-w-3xl mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
            Impressionen
          </p>
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
            Echte{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Hochzeitsmomente
            </span>
            .
          </h2>
        </div>
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {photos.map((p, i) => (
            <div key={i} className={`${p.span} overflow-hidden group`} style={{ borderRadius: "0.5rem" }}>
              <img
                src={p.img}
                alt=""
                className={`w-full h-full object-cover ${p.pos} group-hover:scale-[1.04] transition-transform duration-700`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   NEU · PERSÖNLICHES BRIEFING — Pre-Wedding-Setup
   ═══════════════════════════════════════════════════════════ */
const BriefingSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    {
      icon: PhoneCall,
      title: "Kennenlern-Call",
      desc: "Vor jeder Hochzeit ein 30-min Telefonat. Ihr erzählt mir von eurem Tag — ich lerne euch kennen.",
    },
    {
      icon: ClipboardList,
      title: "Konzept abstimmen",
      desc: "Ihr bekommt einen schriftlichen Vorschlag mit Slot, Format und Anekdoten-Ideen. Ihr habt das letzte Wort.",
    },
    {
      icon: Sparkles,
      title: "Persönliche Note",
      desc: "Ich baue persönliche Details ein — wie ihr euch kennengelernt habt, ein Insider-Witz mit den Trauzeugen, ein Detail aus der Beziehung.",
    },
    {
      icon: Award,
      title: "Pünktlich vor Ort",
      desc: "Ich komme rechtzeitig, baue alles in Ruhe auf, kümmere mich um nichts, was euch stresst.",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className={`lg:col-span-5 lg:sticky lg:top-24 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              Persönlich
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.08] text-[clamp(2rem,4.5vw,4rem)] text-foreground">
              Eure Hochzeit ist{" "}
              <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                kein Standardauftrag
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg leading-[1.55] text-foreground/65 font-light">
              Jede Hochzeit ist einzigartig — und genau so soll auch die Show
              sein. Hier wie wir uns gemeinsam vorbereiten.
            </p>
          </div>
          <div className={`lg:col-span-7 space-y-4 ${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-start gap-5 p-6 md:p-7" style={{ background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "0.75rem" }}>
                <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full" style={{ background: "linear-gradient(135deg, hsl(220 78% 92%), hsl(255 70% 92%), hsl(285 80% 92%))" }}>
                  <s.icon className="w-5 h-5" style={{ color: "hsl(255 60% 40%)" }} />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-wider text-foreground/40 mb-1">SCHRITT {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">{s.title}</h3>
                  <p className="text-sm md:text-[15px] text-foreground/65 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · FAQ Hochzeit-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQ = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    {
      q: "Wann auf der Hochzeit zaubern? Sektempfang oder Dinner?",
      a: "Beides funktioniert wunderbar — und kann kombiniert werden. Sektempfang ist ideal für Eisbrechen, Dinner für Tisch-zu-Tisch-Magie. Im Vorgespräch finden wir den perfekten Slot für eure Hochzeit.",
    },
    {
      q: "Wie viele Gäste passen?",
      a: "Von 20 bis 300+ Gästen alles möglich. Bei Close-Up auf der Hochzeit erreiche ich auch große Gruppen — durch Tisch-zu-Tisch-Magie sieht jeder eine persönliche Show.",
    },
    {
      q: "Was kostet ein Hochzeits-Auftritt?",
      a: "Hochzeitspakete starten ab 395€. Endgültiger Preis hängt von Dauer, Format, Anreise und Gästezahl ab. Ihr bekommt nach der Anfrage ein verbindliches Angebot ohne versteckte Kosten.",
    },
    {
      q: "Wie weit im Voraus sollten wir buchen?",
      a: "Hochzeits-Termine sind beliebt. Ideal sind 6–12 Monate Vorlauf. Bei kurzfristigen Anfragen einfach trotzdem fragen — manchmal geht's noch.",
    },
    {
      q: "Tritt ihr auch außerhalb Bayerns auf?",
      a: "Mein Schwerpunkt liegt in Bayern und Süddeutschland, aber deutschlandweit und auf Wunsch auch international buchbar. Anreise rechnen wir transparent ab.",
    },
  ];
  return (
    <section ref={ref} className="bg-white section-large">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div
            className={`lg:col-span-4 ${
              isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.18em] uppercase text-foreground/45 mb-6">
              FAQ
            </p>
            <h2 className="font-display font-black tracking-[-0.01em] leading-[1.1] text-[clamp(2rem,4vw,3.5rem)] text-foreground">
              Häufige{" "}
              <span
                style={{
                  background: GRADIENT,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fragen
              </span>
              .
            </h2>
          </div>
          <div
            className={`lg:col-span-8 ${
              isVisible ? "animate-slide-right" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
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
   9 · FINAL CTA — full-bleed
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative overflow-hidden text-white py-28 md:py-36">
      <div className="absolute inset-0">
        <img src={emotionenImg} alt="" className="w-full h-full object-cover" />
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
          <h2 className="font-display font-black tracking-[-0.01em] leading-[1.02] text-[clamp(2.5rem,6vw,5.5rem)] text-white">
            Macht eure Hochzeit{" "}
            <span
              style={{
                background: GRADIENT_LIGHT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              unvergesslich
            </span>
            .
          </h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-[1.55] text-white/80 font-light">
            Erzählt mir kurz von eurer Hochzeit — Datum, Ort, ungefähre
            Gästezahl. Ich melde mich innerhalb 24h mit einem konkreten
            Vorschlag.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
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
      <title>Zauberer für Hochzeit — Magie für euren großen Tag | Emilian Leber</title>
      <meta
        name="description"
        content="Zauberer für Hochzeiten in Bayern und deutschlandweit. Close-Up beim Sektempfang, Magie zwischen den Gängen, Bühnenshow als Highlight — Momente, von denen eure Gäste noch lange sprechen."
      />
      <link rel="canonical" href="https://www.magicel.de/hochzeit" />
    </Helmet>
    <Navigation />
    <main>
      <Hero />
      <MomentSection />
      <ZeitstrahlSection />
      <ErlebnisSection />
      <VergleichSection />
      <ZahlenHochzeitSection />
      <StimmenSection />
      <InklusiveSection />
      <TippsSection />
      <GalerieSection />
      <BriefingSection />
      <FAQ />
      <FinalCTA />
    </main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default Hochzeit;
