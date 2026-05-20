import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Wine,
  Utensils,
  Sparkles,
  Phone,
  Mail,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Sun,
  CheckCircle2,
  Music2,
  Quote,
  Lightbulb,
  Globe,
} from "lucide-react";

import heroDinnerImg from "@/assets/hero-dinner.jpg";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";
import emilianDinnerImg from "@/assets/emilian-magic-dinner.jpg";
import staunenImg from "@/assets/staunen.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import { captureEmail, markEmailSubmitted } from "@/lib/emailCapture";

const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const AMBER = "#f3d9a8";

const EVENT_DATE = "11. Juli 2026";
const EVENT_TIME = "19:00";
const EVENT_LOCATION = "Restaurant Wald & Wiese";
const EVENT_ADDRESS = "Sinzing bei Regensburg";
const RESERVIERUNG_TEL = "+49 941 9469770";
const RESERVIERUNG_MAIL = "info@restaurant-waldwiese.de";
const RESERVIERUNG_URL = "https://restaurant-waldwiese.de";

/* ═══════════════════════════════════════════════════════════
   HERO — Foto-Backdrop dark, Datum + Kicker + H1 + KPIs
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(48px); filter: blur(6px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroZoomIn { from { transform: scale(1.12); opacity: 0.4; filter: blur(6px); } to { transform: scale(1.01); opacity: 1; filter: blur(0); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0); opacity: 0.2; } 50% { opacity: 1; } 100% { transform: translateY(-100px); opacity: 0; } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.85s cubic-bezier(0.16,1,0.3,1) forwards; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards; }
    .hero-zoom { animation: heroZoomIn 1.6s cubic-bezier(0.16,1,0.3,1) forwards; }
    .hero-bokeh { opacity: 0; animation: heroBokehDrift 15s linear infinite; }
  `}</style>
);

const Hero = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = photoRef.current;
        if (el && window.scrollY < window.innerHeight * 1.4) {
          el.style.setProperty("--p", `${Math.min(window.scrollY * 0.18, 80)}px`);
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="relative bg-[#08060c] text-white min-h-screen overflow-hidden">
      <HeroKeyframes />
      <div
        ref={photoRef}
        className="absolute inset-0 hero-zoom"
        style={{ transform: "translateY(var(--p, 0))", willChange: "transform" }}
      >
        <img
          src={heroDinnerImg}
          alt="Magic Dinner Summer Edition — Sommerabend im Restaurant Wald & Wiese Sinzing mit Emilian Leber"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center 35%",
            filter: "saturate(0.95) contrast(1.06) brightness(0.65)",
          }}
          loading="eager"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(95deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.78) 35%, rgba(8,6,12,0.5) 60%, rgba(8,6,12,0.25) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 min-h-[78vh] md:min-h-screen container px-6 flex flex-col md:justify-between pt-28 md:pt-32 pb-10 md:pb-20">
        <div className="max-w-4xl">
          <div
            className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-7 hero-fade"
            style={{ animationDelay: "0.05s" }}
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-300 text-amber-300"
                  />
                ))}
              </div>
              <span className="text-sm text-white/85">
                <strong className="font-semibold text-white">5,0</strong>
                <span className="text-white/55"> · 30+ Bewertungen</span>
              </span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold"
              style={{
                background: "rgba(243,217,168,0.15)",
                border: "1px solid rgba(243,217,168,0.3)",
                color: AMBER,
              }}
            >
              <Sun className="w-3 h-3" />
              Summer Edition · {EVENT_DATE}
            </span>
          </div>

          <p
            className="text-base md:text-lg text-white/65 mb-5 md:mb-7 hero-fade tracking-wide"
            style={{ animationDelay: "0.18s" }}
          >
            Magic Dinner ·{" "}
            <span style={{ color: AMBER }}>{EVENT_LOCATION}</span> · {EVENT_ADDRESS}
          </p>

          <h1 className="font-display font-black tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,7.5vw,6.5rem)] text-white max-w-4xl">
            <span
              className="hero-word"
              style={{ animationDelay: "0.3s", marginRight: "0.22em" }}
            >
              Magic
            </span>
            <span
              className="hero-word"
              style={{ animationDelay: "0.38s", marginRight: "0.22em" }}
            >
              Dinner
            </span>
            <br className="hidden sm:block" />
            <span
              className="hero-word"
              style={{
                animationDelay: "0.46s",
                color: AMBER,
              }}
            >
              Summer Edition.
            </span>
          </h1>

          <p
            className="mt-7 md:mt-9 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 hero-fade"
            style={{ animationDelay: "1s" }}
          >
            Ein Sommerabend im Restaurant Wald & Wiese in Sinzing. Du
            reservierst deinen Tisch, isst à la carte was du willst — und
            während des Abends besuche ich euch persönlich am Tisch mit
            Close-Up-Magie. Drei Sekunden Stille, dann lacht eure Tafel.
          </p>

          <div
            className="mt-9 flex flex-col sm:flex-row items-center sm:items-start gap-4 hero-fade"
            style={{ animationDelay: "1.15s" }}
          >
            <a
              href="#reservieren"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:scale-[1.03] transition-transform"
            >
              Tisch reservieren
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#ablauf"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
            >
              So funktioniert's
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-24 hero-fade" style={{ animationDelay: "1.8s" }}>
          <div className="inline-flex flex-wrap items-baseline gap-x-6 md:gap-x-9 gap-y-3 text-white/80 text-xs md:text-sm tracking-[0.04em]">
            <span className="inline-flex items-baseline gap-1.5">
              <CalendarDays className="w-3.5 h-3.5 self-center" />
              <strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">
                {EVENT_DATE}
              </strong>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <Clock className="w-3.5 h-3.5 self-center" />
              <strong className="font-display font-bold text-white text-base md:text-lg">
                ab {EVENT_TIME} Uhr
              </strong>
            </span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5">
              <Users className="w-3.5 h-3.5 self-center" />
              <strong className="font-display font-bold text-white text-base md:text-lg">
                Max. 50 Plätze
              </strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABLAUF — User-Erklärung: Platz reservieren → essen → Tisch-Magie
   ═══════════════════════════════════════════════════════════ */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const STEPS = [
    {
      num: "01",
      Icon: Phone,
      title: "Tisch reservieren.",
      body: "Reservierung läuft direkt über das Restaurant Wald & Wiese — Telefon, Mail oder Online-Formular. Sag dazu: [für den Magic-Dinner-Abend am 11. Juli]. Max. 50 Plätze, am besten früh reservieren.",
      tip: "Dein Platz, deine Party — die Tafel kann auch eine Geburtstagsrunde, eine Geschäftsfeier oder ein Doppel-Date sein.",
    },
    {
      num: "02",
      Icon: Utensils,
      title: "Bestelle wie immer.",
      body: "Am Abend selbst läuft das Wald & Wiese ganz normal: à la carte aus der Sommerkarte, Drei-Gänger optional, Weinbegleitung dazu — du entscheidest. Kein Pflicht-Menü, keine festen Gänge.",
      tip: "Service-Tipp: gib der Küche eine Idee wie viele Gänge ihr machen wollt — dann wird der Magie-Rhythmus passend dazu getaktet.",
    },
    {
      num: "03",
      Icon: Sparkles,
      title: "Ich besuche euren Tisch.",
      body: "Während ihr esst, gehe ich von Tisch zu Tisch. 5–7 Minuten pro Tafel, abgestimmt auf eure Runde: Karten in eure Hände, eine Münze die durch den Tisch fällt, eine Wahl die niemand erklären kann. Kein Mikrofon, keine Bühne — nur ihr und die Magie direkt vor euch.",
      tip: "Pro Tafel sehe ich euch 2–3× im Lauf des Abends, mit unterschiedlichen Routinen pro Besuch. Lieblings-Effekt nochmal? Sag's einfach.",
    },
    {
      num: "04",
      Icon: Quote,
      title: "Tafel-Moment zum Dessert.",
      body: "Zur Dessert-Zeit gibt es einen zentralen Moment für den ganzen Saal — eine Mentalmagie-Routine mit allen Tafeln gleichzeitig. Vorhersage, drei Sekunden Stille, dann Applaus. Übergabe ans Restaurant, Bar offen.",
      tip: "Danach könnt ihr noch sitzen bleiben, Karten signieren lassen oder fragen wie der Trick wirklich geht — ich verrate ihn natürlich nicht.",
    },
  ];
  return (
    <section
      id="ablauf"
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
              So einfach läuft das.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,3.75rem)] text-foreground">
              Vier Schritte vom{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Tisch zur Pointe
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-7">
            <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-md">
              Kein Pflicht-Menü, keine Bühne, kein Eintrittsticket. Nur dein
              Tisch, dein Essen und Magie die direkt zu dir kommt — wie bei
              Freunden, die zufällig zaubern können.
            </p>
          </div>
        </div>

        <ol className="space-y-12 md:space-y-16 max-w-5xl">
          {STEPS.map((s, i) => (
            <li
              key={s.num}
              className={`grid md:grid-cols-[120px_1fr] lg:grid-cols-[160px_1fr_280px] gap-6 md:gap-10`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <header>
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className="font-display text-5xl md:text-6xl font-black tabular-nums leading-none"
                    style={{ color: ACCENT }}
                  >
                    {s.num}
                  </span>
                </div>
                <s.Icon
                  className="w-5 h-5"
                  style={{ color: ACCENT }}
                  strokeWidth={1.75}
                />
              </header>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
                  {s.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/75 leading-[1.7] max-w-xl">
                  {s.body}
                </p>
              </div>
              <aside
                className="lg:pl-6 lg:border-l text-sm text-foreground/65 leading-[1.65] flex items-start gap-2"
                style={{ borderColor: `${ACCENT}25` }}
              >
                <Lightbulb
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: ACCENT }}
                  strokeWidth={1.75}
                />
                <span>{s.tip}</span>
              </aside>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WANN & WO — Location-Card mit Map-Hinweis
   ═══════════════════════════════════════════════════════════ */
const WannWoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(30,8%,99%)] py-20 md:py-28">
      <div className="container px-6">
        <div
          className={`grid lg:grid-cols-12 gap-x-14 gap-y-10 items-start`}
        >
          <div className="lg:col-span-5">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-4">
              Wann & wo.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,3.5rem)] text-foreground mb-6">
              Sommerabend in{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Sinzing
              </span>
              .
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.65] mb-6 max-w-md">
              Das Restaurant Wald & Wiese ist mein Hauspartner für die
              Magic-Dinner-Reihe. Sommer-Terrasse mit Blick ins Grüne, klassisch
              gemütlicher Innenbereich, Karte mit regionalen Klassikern und
              saisonalen Specials.
            </p>
            <a
              href={RESERVIERUNG_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase font-semibold pb-0.5 border-b transition-colors"
              style={{ color: ACCENT, borderColor: `${ACCENT}55` }}
            >
              <Globe className="w-3.5 h-3.5" />
              Restaurant-Website
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "1.25rem",
                boxShadow: "0 30px 60px -30px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src={schneiderImg}
                alt="Restaurant Wald & Wiese Sinzing — Magic-Dinner-Setting"
                className="w-full h-[360px] md:h-[460px] object-cover"
                loading="lazy"
                style={{ objectPosition: "center 40%" }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-32"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(0,0,0,0.6))",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7 grid md:grid-cols-3 gap-4 md:gap-6 text-white">
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/65 mb-1">
                    Datum
                  </p>
                  <p className="font-display text-base md:text-lg font-bold tabular-nums leading-tight">
                    {EVENT_DATE}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/65 mb-1">
                    Zeit
                  </p>
                  <p className="font-display text-base md:text-lg font-bold tabular-nums leading-tight">
                    ab {EVENT_TIME} Uhr
                  </p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/65 mb-1">
                    Ort
                  </p>
                  <p className="font-display text-base md:text-lg font-bold leading-tight">
                    Wald & Wiese · Sinzing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   RESERVIERUNGS-FORM
   ═══════════════════════════════════════════════════════════ */
const ReservierungsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    personen: "2",
    anlass: "",
    wuensche: "",
  });

  useEffect(() => {
    if (form.email && form.email.includes("@")) {
      captureEmail(form.email, "magic-dinner-summer", form);
    }
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.email.includes("@")) return;
    markEmailSubmitted();
    setSubmitted(true);
    // Build mailto with all data
    const subject = encodeURIComponent(
      `Magic Dinner Summer Edition · ${form.personen} Personen · ${form.name}`,
    );
    const body = encodeURIComponent(
      `Reservierungsanfrage für Magic Dinner Summer Edition am ${EVENT_DATE}\n\n` +
        `Name: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n` +
        `Personen: ${form.personen}\nAnlass: ${form.anlass || "—"}\n` +
        `Wünsche: ${form.wuensche || "—"}`,
    );
    window.setTimeout(() => {
      window.location.href = `mailto:${RESERVIERUNG_MAIL}?subject=${subject}&body=${body}&cc=el@magicel.de`;
    }, 800);
  };

  return (
    <section
      id="reservieren"
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-x-14 gap-y-12">
          <div
            className={`lg:col-span-5`}
          >
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
              Tisch reservieren.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,3.75rem)] text-foreground mb-6">
              Platz sichern.<br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Sommerabend buchen.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/70 leading-[1.7] mb-7 max-w-md">
              Reserviere am schnellsten direkt im Restaurant Wald & Wiese.
              Telefon, Mail oder über das Formular hier — wir leiten es weiter.
              50 Plätze, am besten frühzeitig.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href={`tel:${RESERVIERUNG_TEL.replace(/\s/g, "")}`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-[hsl(0,0%,98%)] hover:bg-white hover:shadow-md transition-all border border-foreground/8"
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={{ background: `${ACCENT}14` }}
                >
                  <Phone className="w-4 h-4" style={{ color: ACCENT }} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/55">
                    Telefon-Reservierung
                  </p>
                  <p className="font-display text-sm md:text-base font-bold text-foreground">
                    {RESERVIERUNG_TEL}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${RESERVIERUNG_MAIL}?subject=Reservierung%20Magic%20Dinner%20Summer%20Edition`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-[hsl(0,0%,98%)] hover:bg-white hover:shadow-md transition-all border border-foreground/8"
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={{ background: `${ACCENT}14` }}
                >
                  <Mail className="w-4 h-4" style={{ color: ACCENT }} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/55">
                    Email-Reservierung
                  </p>
                  <p className="font-display text-sm md:text-base font-bold text-foreground">
                    {RESERVIERUNG_MAIL}
                  </p>
                </div>
              </a>
              <a
                href={RESERVIERUNG_URL}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 p-4 rounded-2xl bg-[hsl(0,0%,98%)] hover:bg-white hover:shadow-md transition-all border border-foreground/8"
              >
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                  style={{ background: `${ACCENT}14` }}
                >
                  <Globe className="w-4 h-4" style={{ color: ACCENT }} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-foreground/55">
                    Online-Reservierung
                  </p>
                  <p className="font-display text-sm md:text-base font-bold text-foreground">
                    restaurant-waldwiese.de
                  </p>
                </div>
              </a>
            </div>

            <p className="text-sm text-foreground/55 leading-[1.6]">
              Reservierung läuft beim Restaurant. Ich werde automatisch
              informiert und sehe euch am Abend.
            </p>
          </div>

          <div className={`lg:col-span-7`} style={{ animationDelay: "0.15s" }}>
            <div
              className="rounded-3xl p-7 md:p-10 bg-[hsl(0,0%,98%)]"
              style={{ border: "1px solid rgba(0,0,0,0.06)" }}
            >
              {submitted ? (
                <div className="text-center py-8 md:py-12">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-foreground mb-3">
                    Anfrage unterwegs.
                  </h3>
                  <p className="text-base text-foreground/70 leading-[1.6] max-w-md mx-auto">
                    Email-Programm öffnet sich gleich mit der Reservierungs-
                    Anfrage an Wald & Wiese (mit mir in Kopie).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-2" style={{ color: ACCENT }}>
                    Reservierungs-Formular
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">
                    Bequemer Weg —{" "}
                    <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                      schick uns die Anfrage.
                    </span>
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Dein Name *"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
                      style={{ ["--ac" as any]: ACCENT }}
                    />
                    <input
                      type="number"
                      min="1"
                      max="20"
                      required
                      placeholder="Anzahl Personen *"
                      value={form.personen}
                      onChange={(e) => setForm((f) => ({ ...f, personen: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
                      style={{ ["--ac" as any]: ACCENT }}
                    />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
                    style={{ ["--ac" as any]: ACCENT }}
                  />
                  <input
                    type="tel"
                    placeholder="Telefon (optional)"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
                    style={{ ["--ac" as any]: ACCENT }}
                  />
                  <input
                    type="text"
                    placeholder="Anlass (Geburtstag, Geschäftsabend, …)"
                    value={form.anlass}
                    onChange={(e) => setForm((f) => ({ ...f, anlass: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white"
                    style={{ ["--ac" as any]: ACCENT }}
                  />
                  <textarea
                    placeholder="Wünsche / Allergien / besondere Anlässe (optional)"
                    value={form.wuensche}
                    rows={3}
                    onChange={(e) => setForm((f) => ({ ...f, wuensche: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground/10 focus:border-[color:var(--ac)] outline-none text-base transition-colors bg-white resize-none"
                    style={{ ["--ac" as any]: ACCENT }}
                  />
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-transform hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                    }}
                  >
                    Reservierungs-Anfrage senden
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-foreground/55 leading-[1.55] text-center pt-2">
                    Wir geben deine Anfrage ans Restaurant weiter. Email mit
                    Bestätigung kommt innerhalb 24 h.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WAS DICH ERWARTET — Editorial Liste
   ═══════════════════════════════════════════════════════════ */
const WasErwartetSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const ITEMS = [
    {
      Icon: Utensils,
      title: "Sommer-Karte à la carte",
      body: "Klassiker und saisonale Specials vom Restaurant. Drei-Gänger optional, du entscheidest pro Gang. Vegetarisch, vegan und glutenfrei auf Wunsch.",
    },
    {
      Icon: Sparkles,
      title: "Close-Up direkt am Tisch",
      body: "Karten in deinen Händen, Münzen aus dem Nichts, Mentaleffekte mit deiner Wahl. 2–3 Besuche pro Tafel über den Abend verteilt — verschiedene Routinen pro Besuch.",
    },
    {
      Icon: Wine,
      title: "Sommerterrasse + Bar",
      body: "Bei Sonnenwetter auf der Terrasse mit Blick ins Grüne, sonst klassischer Innenbereich. Hauseigene Weine, Drinks, Bar bis spät.",
    },
    {
      Icon: Quote,
      title: "Tafel-Moment zum Dessert",
      body: "Ein zentraler Mentalmagie-Moment für den ganzen Saal. Vorhersage, drei Sekunden Stille, dann Applaus. Niemand sieht es kommen.",
    },
    {
      Icon: Music2,
      title: "Hintergrund-Musik",
      body: "Lounge-Soundtrack passend zur Magie. Kein Live-Programm, aber genug Atmosphäre dass die Tafel-Gespräche nicht abreißen.",
    },
    {
      Icon: Users,
      title: "Familie + Freunde + Fremde",
      body: "Kleine private Runden bis 8, große Tafeln bis 12 — alle kriegen die volle Magie. Auch ideal für Geburtstage und Geschäftsessen.",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className="md:col-span-6">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
              Was dich erwartet.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,3.75rem)] text-foreground">
              Sechs Dinge die diesen{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Abend ausmachen
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-6 md:pt-7">
            <p className="text-base md:text-lg text-foreground/65 leading-[1.65] max-w-lg">
              Magic Dinner ist nicht „Show plus Essen" — sondern Essen mit
              Magie die direkt zu dir kommt. Hier was du an dem Abend
              erlebst.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-foreground/10 border-y border-foreground/10 max-w-5xl">
          {ITEMS.map((it) => (
            <li
              key={it.title}
              className={`grid grid-cols-[52px_1fr] md:grid-cols-[72px_1fr] gap-5 md:gap-8 py-7 md:py-9`}
            >
              <span
                className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full self-start"
                style={{
                  background: `${ACCENT}10`,
                  border: `1px solid ${ACCENT}22`,
                }}
              >
                <it.Icon
                  className="w-5 h-5"
                  style={{ color: ACCENT }}
                  strokeWidth={1.75}
                />
              </span>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                  {it.title}
                </h3>
                <p className="text-base text-foreground/65 leading-[1.7] max-w-2xl">
                  {it.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════ */
const FAQ_ITEMS = [
  {
    q: "Wie reserviere ich einen Tisch?",
    a: "Direkt über das Restaurant Wald & Wiese — Telefon, Mail oder Online. Sag dazu, dass es für den Magic-Dinner-Abend am 11. Juli ist. Oder nutze das Formular hier auf der Seite, wir leiten es weiter.",
  },
  {
    q: "Was kostet der Abend?",
    a: "Du zahlst nur dein Essen + Getränke à la carte. Die Magie ist für Tafel-Gäste an dem Abend inklusive — kein separates Eintrittsticket nötig.",
  },
  {
    q: "Muss ich ein bestimmtes Menü essen?",
    a: "Nein. Du bestellst aus der Sommerkarte was du willst — Vorspeise und Hauptgang, nur Hauptgang, Drei-Gänger, vegetarisch, vegan — ganz wie sonst auch im Wald & Wiese.",
  },
  {
    q: "Wie viele Personen passen an einen Tisch?",
    a: "Von 2 bis 12 Personen pro Tafel. Bei größeren Gruppen (über 12) bitte vorher anfragen, dann teilen wir ggf. auf zwei Tafeln auf.",
  },
  {
    q: "Wann komme ich am Tisch dran?",
    a: "Ich gehe von Tafel zu Tafel über den Abend verteilt — meistens während Vorspeise, zwischen den Gängen und vor dem Dessert. Insgesamt 2–3 Besuche pro Tafel mit jeweils 5–7 Minuten Magie.",
  },
  {
    q: "Was passiert beim Dessert?",
    a: "Zur Dessert-Zeit gibt es einen zentralen Tafel-Moment für den ganzen Saal — eine Mentalmagie-Routine mit allen Gästen gleichzeitig. Drei Sekunden Stille, dann Applaus, dann zurück zum Abend.",
  },
  {
    q: "Kann ich auch jemanden überraschen?",
    a: "Klar. Schreib mir vorher (el@magicel.de), was du an Anekdoten/Insider-Story hast — Geburtstag, Verlobung, Geschäftsabschluss — ich baue das in eine Routine ein, ohne dass jemand merkt woher ich das weiß.",
  },
  {
    q: "Kommt der nächste Magic-Dinner-Abend wann?",
    a: "Nach der Summer Edition: Herbst Edition am 19. September, Winter Edition am 14. November, Neujahrs-Edition am 16. Januar 2027. Newsletter abonnieren für Vorverkauf-Hinweise.",
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(30,8%,99%)] py-24 md:py-36">
      <div className="container px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-5">
            Häufige Fragen.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(2rem,4.5vw,3.75rem)] text-foreground">
            Was vorher{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              gefragt wird.
            </span>
          </h2>
        </div>
        <div
          className={`max-w-3xl`}
        >
          {FAQ_ITEMS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div
                key={f.q}
                className="border-b border-foreground/15"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex items-center justify-between w-full py-5 md:py-6 text-left gap-6 group"
                >
                  <h3
                    className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4"
                    itemProp="name"
                  >
                    {f.q}
                  </h3>
                  <span
                    aria-hidden
                    className={`${SERIF_ITALIC} shrink-0 text-2xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    style={{ color: ACCENT }}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div
                    className="pb-6"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      className="text-base text-foreground/70 leading-[1.7] max-w-2xl"
                      itemProp="text"
                    >
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   WEITERE EDITIONEN — Verwandte Termine
   ═══════════════════════════════════════════════════════════ */
const WeitereEditionenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const ITEMS = [
    {
      date: "19. September 2026",
      label: "Herbst Edition",
      sub: "Wild-Menü auf Wunsch · Innenraum",
      status: "Vorverkauf",
    },
    {
      date: "14. November 2026",
      label: "Winter Edition",
      sub: "Glühwein-Aperitif · Kerzenschein",
      status: "Demnächst",
    },
    {
      date: "16. Januar 2027",
      label: "Neujahrs Edition",
      sub: "Drei-Gänge inklusive · After-Show-Bar",
      status: "Demnächst",
    },
  ];
  return (
    <section ref={ref} className="bg-white py-20 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-foreground/55 mb-3">
            Weitere Magic-Dinner-Termine.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.1] text-[clamp(1.75rem,3.8vw,3rem)] text-foreground">
            Nach Sommer kommt{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              mehr
            </span>
            .
          </h2>
        </div>
        <ul className={`divide-y divide-foreground/10 border-y border-foreground/10`}>
          {ITEMS.map((it) => (
            <li
              key={it.date}
              className="grid grid-cols-[1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-8 py-6 md:py-7 items-baseline"
            >
              <div>
                <span
                  className="font-display text-base md:text-lg font-bold tabular-nums block md:inline"
                  style={{ color: ACCENT }}
                >
                  {it.date}
                </span>
              </div>
              <div>
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
                  {it.label}
                </h3>
                <p className="text-sm text-foreground/65 mt-1">{it.sub}</p>
              </div>
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold text-white whitespace-nowrap"
                style={{
                  background:
                    it.status === "Vorverkauf"
                      ? `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`
                      : "rgba(0,0,0,0.5)",
                }}
              >
                {it.status}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/tickets"
            className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase font-semibold pb-0.5 border-b transition-colors"
            style={{ color: ACCENT, borderColor: `${ACCENT}55` }}
          >
            Alle Termine ansehen
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => (
  <section className="relative text-white py-24 md:py-32 overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={emilianDinnerImg}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        style={{ filter: "saturate(0.9) brightness(0.4)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(8,6,12,0.88) 0%, rgba(8,6,12,0.66) 60%, rgba(8,6,12,0.4) 100%)",
        }}
      />
    </div>
    <div className="relative container px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className={`text-base md:text-lg text-white/55 mb-5`}>
          Magic Dinner Summer Edition · 11. Juli 2026.
        </p>
        <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4.8vw,4rem)]">
          Tisch sichern.<br />
          <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
            Magie bekommen.
          </span>
        </h2>
        <p className="mt-7 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
          Reservierung läuft direkt beim Restaurant. Max. 50 Plätze — wenn der
          Saal voll ist, ist er voll.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#reservieren"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-black hover:scale-[1.03] transition-transform"
          >
            Jetzt reservieren
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={`tel:${RESERVIERUNG_TEL.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white"
          >
            Direkt anrufen
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
const SITE_URL =
  "https://www.magicel.de/tickets/magic-dinner-summer-edition";

const MagicDinnerSummerEdition = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        Magic Dinner Summer Edition — 11. Juli 2026 · Wald & Wiese Sinzing |
        Emilian Leber
      </title>
      <meta
        name="description"
        content="Magic Dinner Summer Edition am 11.07.2026 im Restaurant Wald & Wiese Sinzing bei Regensburg. Tisch reservieren, à la carte essen, ich besuche euch mit Close-Up-Magie am Tisch. 5,0★."
      />
      <meta
        name="keywords"
        content="Magic Dinner, Magic Dinner Sinzing, Magic Dinner Regensburg, Magic Dinner Summer Edition, Restaurant Wald Wiese, Magic Dinner Reservierung, Zauberer Dinner Bayern, Magic Dinner buchen, Magic Dinner 2026"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="event" />
      <meta property="og:url" content={SITE_URL} />
      <meta
        property="og:title"
        content="Magic Dinner Summer Edition — 11. Juli 2026"
      />
      <meta
        property="og:description"
        content="Tisch reservieren, à la carte essen, Close-Up-Magie am Tisch. Wald & Wiese Sinzing."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Magic Dinner Summer Edition",
          startDate: "2026-07-11T19:00:00+02:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode:
            "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Restaurant Wald & Wiese",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Sinzing",
              addressRegion: "Bayern",
              addressCountry: "DE",
            },
            url: "https://restaurant-waldwiese.de",
          },
          image: ["https://www.magicel.de/og-image.jpg"],
          description:
            "Magic Dinner am 11. Juli 2026 im Restaurant Wald & Wiese Sinzing — Tisch reservieren, à la carte essen, Close-Up-Magie am Tisch von Emilian Leber.",
          performer: {
            "@type": "Person",
            name: "Emilian Leber",
            url: "https://www.magicel.de",
          },
          organizer: [
            {
              "@type": "Organization",
              name: "Restaurant Wald & Wiese",
              url: "https://restaurant-waldwiese.de",
            },
            {
              "@type": "Person",
              name: "Emilian Leber",
              url: "https://www.magicel.de",
            },
          ],
          offers: {
            "@type": "Offer",
            url: SITE_URL,
            availability: "https://schema.org/InStock",
            priceCurrency: "EUR",
            price: "0",
            description:
              "Reservierung kostenlos. Verzehr à la carte aus der Restaurantkarte.",
            validFrom: "2026-04-01T00:00:00+02:00",
          },
          maximumAttendeeCapacity: 50,
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Startseite",
              item: "https://www.magicel.de/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Tickets",
              item: "https://www.magicel.de/tickets",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Magic Dinner Summer Edition",
              item: SITE_URL,
            },
          ],
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}
      </script>
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <AblaufSection />
        <WannWoSection />
        <ReservierungsSection />
        <WasErwartetSection />
        <FAQSection />
        <WeitereEditionenSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default MagicDinnerSummerEdition;
