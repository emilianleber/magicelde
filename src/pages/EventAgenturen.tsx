import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  ShieldCheck,
  Mail,
  FileText,
  Handshake,
  Clock,
  EyeOff,
  Repeat,
  Award,
  Building2,
} from "lucide-react";

import heroFirmenfeierImg from "@/assets/hero-firmenfeier-stock.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import emotionenImg from "@/assets/emotionen.jpg";

const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const AMBER_SOFT = "#f0d8a8";

/* ═══════════════════════════════════════════════════════════
   HERO — MagicDinner-Pattern
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn {
      from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); }
      to   { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); }
    }
    @keyframes heroFadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes heroZoomIn {
      from { transform: scale(1.18); opacity: 0.35; filter: blur(8px); }
      to   { transform: scale(1.02); opacity: 1; filter: blur(0); }
    }
    @keyframes heroBokehDrift {
      0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.2; }
      30%  { opacity: 1; } 70%  { opacity: 1; }
      100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; }
    }
    @keyframes heroOvershoot {
      0% { opacity: 0; transform: translateY(60px) scale(0.88); }
      55% { opacity: 1; transform: translateY(-10px) scale(1.04); }
      80% { transform: translateY(2px) scale(0.99); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes heroStarPulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); }
      50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.55)); }
    }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-zoom { animation: heroZoomIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; transform-origin: center center; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .hero-overshoot { opacity: 0; animation: heroOvershoot 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-cta { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background-color .3s, color .3s; }
    .hero-cta:hover { transform: translateY(-2px) scale(1.035); }
    .hero-cta:active { transform: translateY(0) scale(0.97); }
    .hero-photo-wrap { transform: translateY(var(--hero-parallax, 0px)); transition: transform 0.05s linear; }
  `}</style>
);

const HEADLINE_SANS = ["Eine", "Adresse."];
const HEADLINE_ITALIC = ["Ein", "Auftritt."];

const BOKEH = [
  { size: 22, left: "12%", top: "28%", dur: 14, delay: 0, o: 0.45 },
  { size: 14, left: "8%", top: "62%", dur: 18, delay: 2.5, o: 0.55 },
  { size: 28, left: "78%", top: "18%", dur: 16, delay: 1, o: 0.40 },
  { size: 18, left: "88%", top: "48%", dur: 20, delay: 3.5, o: 0.55 },
  { size: 12, left: "62%", top: "72%", dur: 13, delay: 4.5, o: 0.60 },
  { size: 24, left: "92%", top: "78%", dur: 17, delay: 1.8, o: 0.35 },
  { size: 10, left: "32%", top: "82%", dur: 19, delay: 6, o: 0.50 },
  { size: 16, left: "48%", top: "12%", dur: 22, delay: 5, o: 0.30 },
  { size: 20, left: "70%", top: "38%", dur: 15, delay: 7.5, o: 0.45 },
  { size: 14, left: "20%", top: "44%", dur: 21, delay: 8.5, o: 0.40 },
];

const Hero = () => {
  const photoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 1) return;
      lastY = y;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = photoRef.current;
        if (el && y < window.innerHeight * 1.4) {
          el.style.setProperty("--hero-parallax", `${Math.min(y * 0.18, 80)}px`);
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="relative bg-[#08060c] text-white min-h-screen overflow-hidden">
      <HeroKeyframes />
      <div ref={photoRef} className="absolute inset-0 hero-photo-wrap hero-zoom" style={{ willChange: "transform" }}>
        <img src={heroFirmenfeierImg} alt="Zauberkünstler für Event-Agenturen — Emilian Leber" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%", filter: "saturate(0.92) contrast(1.08) brightness(0.7)" }} loading="eager" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 30%, rgba(8,6,12,0.5) 60%, rgba(8,6,12,0.25) 100%)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 65%)" }} />
        <div aria-hidden className="absolute -top-32 right-0 w-[680px] h-[680px] rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(199,144,66,0.28) 0%, rgba(199,144,66,0) 70%)" }} />
      </div>
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {BOKEH.map((b, i) => (
          <div key={i} className="absolute rounded-full hero-bokeh" style={{ width: b.size, height: b.size, left: b.left, top: b.top, background: `radial-gradient(circle, rgba(255,210,140,${b.o}) 0%, rgba(255,210,140,${b.o * 0.4}) 40%, rgba(255,210,140,0) 75%)`, filter: "blur(2px)", animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }} />
        ))}
      </div>
      <div className="relative z-10 min-h-screen container px-6 flex flex-col justify-between pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300 hero-star" style={{ animationDelay: `${i * 0.12}s` }} />))}</div>
              <span className="text-sm text-white/85"><strong className="font-semibold text-white">5,0</strong><span className="text-white/60"> · Agentur-getestet</span></span>
            </div>
            <span aria-hidden className="hidden md:block h-4 w-px bg-white/25" />
            <span className="text-sm text-white/80"><strong className="font-semibold text-white">B2B-Partner für Eventagenturen</strong></span>
          </div>
          <p className={`${SERIF_ITALIC} text-xl md:text-2xl text-white/75 mb-6 md:mb-8 hero-fade`} style={{ animationDelay: "0.18s" }}>
            Für Eventagenturen & Veranstaltungsplaner.
          </p>
          <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,9rem)] text-white max-w-5xl">
            {HEADLINE_SANS.map((w, i) => (<span key={`s-${i}`} className="hero-word" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>{w}{i < HEADLINE_SANS.length - 1 ? " " : ""}</span>))}
            <br className="hidden sm:block" />
            {HEADLINE_ITALIC.map((w, i) => (<span key={`i-${i}`} className={`hero-word ${SERIF_ITALIC}`} style={{ animationDelay: `${0.3 + (HEADLINE_SANS.length + i) * 0.08}s`, paddingRight: "0.15em", color: "#f3d9a8" }}>{w}{i < HEADLINE_ITALIC.length - 1 ? " " : ""}</span>))}
          </h1>
          <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.6] text-white/75 font-light hero-fade" style={{ animationDelay: "1.05s" }}>
            Schnellangebot innerhalb von 8 Stunden, schriftlicher Vertrag, AVV
            bereit, Versicherungsschutz. Auf Wunsch white-label im Auftritt.
            Eine Adresse für Bühne, Close-Up und Magic Dinner.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-fade" style={{ animationDelay: "1.2s" }}>
            <a href="#schnellangebot" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-[#08060c] hover:bg-white/95">
              Schnellangebot anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:hello@magicel.de?subject=Event-Agentur%20Anfrage" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/80 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors">
              Per Mail anfragen<ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative mt-20 md:mt-28">
          <div className="hero-overshoot inline-flex flex-wrap items-baseline gap-x-5 md:gap-x-7 gap-y-2 text-white/85 text-xs md:text-sm tracking-[0.04em]" style={{ animationDelay: "2.0s" }}>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">8 h</strong><span className="text-white/65">Schnellangebot</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg tabular-nums">100+</strong><span className="text-white/65">B2B-Engagements</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="inline-flex items-baseline gap-1.5"><strong className="font-display font-bold text-white text-base md:text-lg">AVV</strong><span className="text-white/65">+ DSGVO + Versicherung</span></span>
            <span aria-hidden className="text-white/30">·</span>
            <span className="text-white/65">White-Label optional</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   2 · WIE WIR ZUSAMMENARBEITEN — Schnittstellen-Definition
   ═══════════════════════════════════════════════════════════ */
const SCHNITTSTELLEN = [
  {
    role: "Wir bei euch.",
    icon: Mail,
    items: [
      "Anfrage per Mail, Telefon oder Web-Formular",
      "Schnellangebot innerhalb 8 Stunden",
      "Schriftlicher Vertrag, AVV, Versicherungs-Nachweis",
      "Schriftliches Briefing-Dokument an alle Beteiligten",
      "Optional: Pitch-Präsentation vor Ort beim Endkunden",
      "Geschäftsrechnung mit ausgewiesener USt, Zahlungsziel 14 d",
    ],
  },
  {
    role: "Ihr bei uns.",
    icon: FileText,
    items: [
      "Eckdaten (Datum, Ort, Gästezahl, Anlass, Budget-Range)",
      "Endkunden-Profil + Tonalität (Premium / locker / mixed)",
      "Location-Details + Service-Plan",
      "No-Gos (Personen, Themen, Marken)",
      "Ansprechpartner für Tag X (Stage Manager / Service)",
      "Branding-Vorgabe falls White-Label gewünscht",
    ],
  },
];

const SchnittstellenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Wie wir mit Agenturen arbeiten.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Klare{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>Schnittstellen</span>. Keine Überraschungen.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Eventagenturen haben es zur Genüge mit unprofessionellen Künstlern.
              Hier seht ihr genau, was ihr von uns bekommt — und was wir von
              euch brauchen, um den Auftritt sauber durchzuziehen.
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {SCHNITTSTELLEN.map((s, i) => (
            <article key={s.role} className="relative bg-[hsl(36,30%,97%)] p-8 md:p-10" style={{ borderRadius: "1.25rem", boxShadow: "0 25px 50px -25px rgba(40,20,40,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                <s.icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
              </div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-3" style={{ color: ACCENT }}>Schnittstelle {String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-7">{s.role}</h3>
              <ul className="space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-base text-foreground/75 leading-[1.6]">
                    <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   3 · AGENCY-VORTEILE — Was Agenturen konkret bekommen
   ═══════════════════════════════════════════════════════════ */
const VORTEILE = [
  {
    icon: Clock,
    title: "Schnellangebot in 8 Stunden.",
    body: "Kein Hin-und-Her bei Erstanfragen. Innerhalb des Werktages liegt eine Angebots-Skizze mit Format-Vorschlag, Preis-Range und freier Tagen-Liste auf dem Tisch.",
  },
  {
    icon: EyeOff,
    title: "White-Label im Auftritt.",
    body: "Auf Wunsch trete ich ohne Eigen-Branding auf. Kein Logo auf der Bühne, keine Kommunikation an euren Endkunden vor oder nach dem Event ohne eure Freigabe.",
  },
  {
    icon: ShieldCheck,
    title: "AVV + DSGVO + Versicherung.",
    body: "Auftragsverarbeitungs-Vertrag (AVV) sofort verfügbar, Berufshaftpflicht in Höhe von 5 Mio EUR, GoBD-konforme Geschäftsrechnung mit ausgewiesener USt.",
  },
  {
    icon: Repeat,
    title: "Frame-Agreement-fähig.",
    body: "Bei mehreren geplanten Events pro Jahr: Rahmenvertrag mit Vorzugskonditionen, Kontingent-Reservierung und vereinfachter Abruf-Prozess.",
  },
  {
    icon: Handshake,
    title: "Direkter Single-Point-of-Contact.",
    body: "Ihr habt keinen Agenten oder Booker dazwischen — direkt mit mir am Telefon, schnelle Antworten, klare Kommunikation. Wochenends per WhatsApp erreichbar.",
  },
  {
    icon: FileText,
    title: "Press-Kit auf Knopfdruck.",
    body: "EPK, Tech-Rider, Headshots, Pressestimmen, Videos — als PDF und einzelne Assets verfügbar. Zum Weiterreichen an Endkunden oder für eure Pitch-Unterlagen.",
  },
];

const VorteileSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Sechs Gründe für Agenturen.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
              Was Eventagenturen bei uns{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>konkret bekommen</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Sechs Punkte, die wir mit jedem Agentur-Partner einhalten —
              schriftlich im Vertrag, jedes Mal, ohne Ausnahme.
            </p>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {VORTEILE.map((v) => (
            <article key={v.title} className="relative bg-white p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.18)]" style={{ borderRadius: "1.25rem", boxShadow: "0 20px 40px -25px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, rgba(154,38,64,0.14), rgba(154,38,64,0.04))", border: "1px solid rgba(154,38,64,0.22)" }}>
                <v.icon className="w-5 h-5" style={{ color: ACCENT }} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight mb-3">{v.title}</h3>
              <p className="text-base text-foreground/65 leading-[1.65]">{v.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   4 · SCHNELLANGEBOT — Inline Form
   ═══════════════════════════════════════════════════════════ */
const SchnellangebotSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} id="schnellangebot" className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className={`lg:col-span-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Schnellangebot.</p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.0] text-[clamp(2.25rem,5vw,4.5rem)] text-foreground mb-8">
              In{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>8 Stunden</span>{" "}
              auf eurem Schreibtisch.
            </h2>
            <p className="text-base md:text-lg text-foreground/65 leading-[1.7] mb-7">
              Schickt uns die Eckdaten — innerhalb des Werktages bekommt ihr
              eine Angebots-Skizze mit Format-Empfehlung, Preis-Range und
              freier Tagen-Liste. Verbindliches Detail-Angebot folgt nach
              kurzem Call.
            </p>
            <ul className="space-y-3">
              {[
                "Antwort innerhalb 8 h (Werktags)",
                "Schriftlich, mit Preis-Range",
                "Inklusive zwei alternativer Format-Vorschläge",
                "Vertraulich behandelt, kein Outbound an Endkunden",
              ].map((it) => (
                <li key={it} className="flex items-start gap-3 text-base text-foreground/75">
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <div className={`lg:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <form
              action="mailto:hello@magicel.de"
              method="POST"
              encType="text/plain"
              className="bg-[hsl(36,30%,97%)] p-7 md:p-9 space-y-4"
              style={{ borderRadius: "1.25rem", boxShadow: "0 30px 60px -25px rgba(40,20,40,0.2), inset 0 0 0 1px rgba(0,0,0,0.04)" }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <input name="agentur" required placeholder="Agentur-Name" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors" />
                <input name="ansprechpartner" required placeholder="Ansprechpartner:in" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="email" name="email" required placeholder="Email" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors" />
                <input name="telefon" placeholder="Telefon (optional)" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <input type="date" name="datum" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm text-foreground/70 focus:outline-none focus:border-foreground/40 transition-colors" />
                <input name="ort" placeholder="Ort / PLZ" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors" />
                <input name="gaeste" type="number" placeholder="Gästezahl" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors" />
              </div>
              <select name="format" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm text-foreground/70 focus:outline-none focus:border-foreground/40 transition-colors">
                <option value="">Format gewünscht?</option>
                <option>Close-Up · Tisch-zu-Tisch / Walk-Around</option>
                <option>Bühnenshow · 15–60 Min</option>
                <option>Magic Dinner · Tisch + Bühne</option>
                <option>Comedy-Zauberei</option>
                <option>Moderation</option>
                <option>Empfehl uns was — passend zum Anlass</option>
              </select>
              <textarea name="endkunde" rows={3} placeholder="Endkunde / Anlass / Tonalität / Besonderheiten" className="w-full rounded-xl bg-white border border-foreground/12 px-4 py-3 text-sm placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors resize-none" />
              <div className="flex items-center gap-3">
                <input type="checkbox" id="whitelabel" name="whitelabel" className="rounded" />
                <label htmlFor="whitelabel" className="text-sm text-foreground/70">White-Label gewünscht (kein Eigen-Branding im Auftritt)</label>
              </div>

              <button type="submit" className="w-full inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white transition-all hover:scale-[1.01]" style={{ background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`, boxShadow: "0 14px 30px -10px rgba(154,38,64,0.45)" }}>
                Schnellangebot anfragen<ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-foreground/45 text-center">
                Per Email an hello@magicel.de · Vertraulich behandelt · AVV auf Anfrage
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   5 · CASE-STUDY mit Agentur-Beteiligung
   ═══════════════════════════════════════════════════════════ */
const AgenturCaseSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-[hsl(36,30%,97%)] py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className={`lg:col-span-5 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <div className="relative overflow-hidden h-[420px] md:h-[520px]" style={{ borderRadius: "1.25rem", boxShadow: "0 50px 100px -30px rgba(40,20,40,0.4), 0 15px 35px -15px rgba(40,20,40,0.2)" }}>
              <img src={buehneZuschauerImg} alt="Agentur-Case-Study: Magic Camp mit 200 Gästen" className="w-full h-full object-cover object-center" loading="lazy" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,6,12,0.45) 0%, rgba(154,38,64,0.35) 70%, rgba(92,22,34,0.7) 100%)" }} />
              <span className={`${SERIF_ITALIC} absolute top-6 left-6 md:top-8 md:left-8 leading-none text-white`} style={{ fontSize: "clamp(4rem, 8vw, 7rem)", textShadow: "0 8px 30px rgba(0,0,0,0.45)" }}>01</span>
              <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-7 md:right-7">
                <div className="relative rounded-2xl px-5 py-4 overflow-hidden" style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.04) 100%)", backdropFilter: "blur(34px) saturate(170%)", WebkitBackdropFilter: "blur(34px) saturate(170%)", border: "1px solid rgba(255,255,255,0.22)", boxShadow: "0 20px 50px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.45)" }}>
                  <p className={`${SERIF_ITALIC} text-white/80 text-sm mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]`}>Agentur-Konstellation</p>
                  <p className="font-display text-base font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">200 Gäste · Versicherungs-Konzern · Nähe Ingolstadt</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-7 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-4" style={{ color: ACCENT }}>Case-Study mit Agentur-Beteiligung</p>
            <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2rem,4vw,3.25rem)] text-foreground mb-8">
              Magic Camp für{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>200 Gäste</span>.
            </h2>
            <div className="space-y-5 text-base md:text-lg leading-[1.7] text-foreground/70 mb-8">
              <p>
                Eine Eventagentur kam mit einem Auftrag eines bayerischen
                Versicherungs-Konzerns: ein Magic Camp für die Mitarbeiter
                nahe Ingolstadt, Erwartung 200 Gäste, Wunsch des Endkunden
                ein Zauber-Workshop für Kleingruppen.
              </p>
              <p>
                Wir haben zusammen mit der Agentur das Konzept entwickelt,
                in mehreren Telefon-Meetings die Kleingruppen-Stationen
                geplant, einen Pitch im Hause der Versicherung gehalten und
                schriftlichen Vertrag inklusive AVV abgeschlossen. Briefing
                an alle Beteiligten — die Agentur hatte ein fertig
                weiterreichbares Paket.
              </p>
              <p>
                Am Tag selbst rotierten Workshop-Stationen für die
                Kleingruppen, abgeschlossen mit einer zentralen Bühnenshow
                für alle 200 Gäste. Die Agentur hatte am Eventabend nur
                noch einen Punkt auf der Liste: Empfang &amp; Übergabe.
              </p>
            </div>
            <div className="relative pl-5 md:pl-6" style={{ borderLeft: `2px solid ${ACCENT}` }}>
              <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/85 leading-[1.45] mb-1.5`}>
                „Es war einfach Mega! Alle Gäste begeistert."
              </p>
              <p className="text-xs text-foreground/55 tracking-[0.06em]">— Jan von Lehmann · Eventleitung Endkunde</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · FAQ
   ═══════════════════════════════════════════════════════════ */
const agenturFaqs = [
  { q: "Provisions-Modell oder Festpreis?", a: "Wir arbeiten ausschließlich mit transparenten Festpreisen, an die ihr eure Margen anlegen könnt. Kein verdecktes Provisions-Modell, keine Doppel-Rechnungen. Das macht die Kalkulation für euch sauber." },
  { q: "Wie schnell bekommen wir ein Erstangebot?", a: "Innerhalb von 8 Stunden Werktag eine Angebots-Skizze mit Preis-Range, Format-Empfehlung und freier Tagen-Liste. Verbindliches Detail-Angebot folgt nach kurzem Briefing-Call." },
  { q: "Tretet ihr unter unserer Marke auf (White-Label)?", a: "Auf Wunsch ja. Kein Eigen-Logo auf der Bühne, keine Kommunikation an euren Endkunden vor oder nach dem Event ohne eure Freigabe. Im Vertrag schriftlich fixiert." },
  { q: "AVV und DSGVO?", a: "Auftragsverarbeitungs-Vertrag (AVV) auf Anfrage sofort verfügbar, DSGVO-konforme Datenverarbeitung. Auf Wunsch unterschrieben zurück innerhalb desselben Werktages." },
  { q: "Wie ist es mit Versicherung?", a: "Berufshaftpflicht in Höhe von 5 Mio EUR, Versicherungs-Nachweis auf Anfrage. Für besondere Locations (Pyrotechnik / besondere Effekte) sprechen wir gesondert." },
  { q: "Frame-Agreements bei mehreren Buchungen?", a: "Ab drei geplanten Events pro Jahr bieten wir Rahmenvertrag mit Vorzugskonditionen, Kontingent-Reservierung und vereinfachtem Abruf-Prozess. Sprecht uns direkt darauf an." },
  { q: "Cancellation-Konditionen?", a: "Stornofreie Buchung bis 14 Tage vor dem Event, danach gestaffelt (50 % bis 7 Tage, 75 % bis 48 h, 100 % am Eventtag). Bei Verschiebung im selben Quartal nur Bearbeitungsgebühr." },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}>Häufige Fragen aus dem Agentur-Kontext.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(2.25rem,5.5vw,5.5rem)] text-foreground">
            Was Eventagenturen<br /><span className={SERIF_ITALIC}>vorher fragen.</span>
          </h2>
        </div>
        <div className={`max-w-3xl border-t border-foreground/15 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {agenturFaqs.map((faq) => (
            <details key={faq.q} className="group py-6 md:py-7 border-b border-foreground/15">
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">{faq.q}</span>
                <span aria-hidden className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · FINAL CTA
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,6,12,0.92) 0%, rgba(8,6,12,0.75) 50%, rgba(8,6,12,0.55) 100%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(circle, rgba(154,38,64,0.55), transparent 60%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(circle, rgba(255,180,40,0.5), transparent 60%)" }} />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-lg md:text-xl text-white/60 mb-6`}>Für Eventagenturen & Veranstaltungsplaner.</p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,5.5vw,5rem)]">
            Schnellangebot in{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>8 Stunden</span>.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Eckdaten an hello@magicel.de — wir melden uns innerhalb des
            Werktages mit Angebots-Skizze, Format-Vorschlag und freier
            Tagen-Liste.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#schnellangebot" className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90">
              Schnellangebot anfragen<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="mailto:hello@magicel.de?subject=Agentur-Anfrage" className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white">
              Per Mail<ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          <p className="mt-6 text-xs md:text-sm text-white/45">AVV · DSGVO · Versicherung · White-Label optional</p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/event-agenturen";

const EventAgenturen = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Zauberer für Eventagenturen — Schnellangebot, White-Label, AVV | Emilian Leber</title>
      <meta name="description" content="Zauberkünstler-Partner für Eventagenturen und Veranstaltungsplaner. Schnellangebot in 8 Stunden, schriftlicher Vertrag, AVV, DSGVO, Versicherung. White-Label optional. Bühne, Close-Up, Magic Dinner aus einer Hand." />
      <meta name="keywords" content="Zauberer für Eventagentur, Künstler für Veranstaltungsagentur, Magier Agency, White-Label Künstler, AVV Künstler, Zauberer Frame-Agreement, Emilian Leber Agency-Partner" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content="Zauberer für Eventagenturen — Schnellangebot, White-Label, AVV | Emilian Leber" />
      <meta property="og:description" content="Schnellangebot 8 h, White-Label, AVV, DSGVO. Bühne + Close-Up + Magic Dinner aus einer Hand." />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    </Helmet>
    <PageLayout>
      <main>
        <Hero />
        <SchnittstellenSection />
        <VorteileSection />
        <SchnellangebotSection />
        <AgenturCaseSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default EventAgenturen;
