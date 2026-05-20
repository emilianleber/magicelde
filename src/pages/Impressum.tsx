import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Scale,
  Star,
} from "lucide-react";

/* ════════════════════════════════════════════════════════
   DESIGN-TOKENS
   ════════════════════════════════════════════════════════ */
const SERIF_ITALIC =
  "font-['Instrument_Serif',ui-serif,Georgia,serif] italic font-normal";
const ACCENT = "#9a2640";
const ACCENT_DEEP = "#5c1622";
const ACCENT_SOFT = "#e4b8c0";
const CREAM = "#f5ecdc";

/* ════════════════════════════════════════════════════════
   KEYFRAMES
   ════════════════════════════════════════════════════════ */
const PageKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(199,144,66,0)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(199,144,66,0.12)); } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .legal-h2 { scroll-margin-top: 120px; }
  `}</style>
);

/* ════════════════════════════════════════════════════════
   TOC-Daten
   ════════════════════════════════════════════════════════ */
const TOC = [
  { id: "tmg-5", label: "Angaben gemäß § 5 TMG" },
  { id: "kontakt", label: "Kontakt" },
  { id: "umsatzsteuer", label: "Umsatzsteuer" },
  { id: "verantwortlich", label: "Verantwortlich für Inhalte" },
  { id: "haftung-inhalte", label: "Haftung für Inhalte" },
  { id: "haftung-links", label: "Haftung für Links" },
  { id: "urheberrecht", label: "Urheberrecht" },
];

/* ════════════════════════════════════════════════════════
   1 · HERO — kleiner cream
   ════════════════════════════════════════════════════════ */
const Hero = () => (
  <section
    className="relative overflow-hidden"
    style={{
      background: `linear-gradient(180deg, ${CREAM} 0%, #f9f1e2 55%, #fbf4e6 100%)`,
    }}
  >
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        right: "-10%",
        top: "-20%",
        width: "55%",
        height: "65%",
        background:
          "radial-gradient(closest-side, rgba(199,144,66,0.24) 0%, rgba(199,144,66,0) 70%)",
        filter: "blur(20px)",
      }}
    />
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: "-10%",
        bottom: "-20%",
        width: "50%",
        height: "55%",
        background:
          "radial-gradient(closest-side, rgba(154,38,64,0.14) 0%, rgba(154,38,64,0) 70%)",
        filter: "blur(20px)",
      }}
    />

    <div className="container relative z-10 px-6 pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-5xl mx-auto">
        <div
          className="hero-fade flex items-center gap-3 mb-7"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="hero-star w-4 h-4"
                style={{
                  color: "#c79042",
                  fill: "#c79042",
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
          <span
            className="text-[11px] tracking-[0.18em] uppercase font-semibold"
            style={{ color: ACCENT_DEEP }}
          >
            5,0 · 30+ Bewertungen · Geschäftlich seit 2015
          </span>
        </div>

        <p
          className={`hero-fade ${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
          style={{ animationDelay: "0.15s" }}
        >
          Rechtliches.
        </p>

        <h1
          className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3rem,9vw,8rem)] text-foreground mb-8"
          aria-label="Impressum."
        >
          <span
            className="hero-word"
            style={{ animationDelay: "0.25s", marginRight: "0.22em" }}
          >
            Impressum
          </span>
          <span
            className={`hero-word ${SERIF_ITALIC}`}
            style={{
              animationDelay: "0.35s",
              color: ACCENT,
              paddingRight: "0.18em",
            }}
          >
            .
          </span>
        </h1>

        <p
          className="hero-fade text-base md:text-lg text-foreground/65 leading-[1.65] max-w-2xl"
          style={{ animationDelay: "0.5s" }}
        >
          Pflichtangaben gemäß § 5 TMG · § 55 RStV für die Website magicel.de
          und meine künstlerische Tätigkeit als Zauberer. Alle Kontaktdaten,
          vollständig und transparent.
        </p>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   2 · LEGAL-CONTENT mit Sticky-TOC
   ════════════════════════════════════════════════════════ */
const useActiveSection = () => {
  const [active, setActive] = useState<string>(TOC[0]?.id ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    TOC.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};

const LegalContent = () => {
  const { ref, isVisible } = useScrollReveal();
  const active = useActiveSection();
  return (
    <section ref={ref} className="bg-white py-24 md:py-32 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Sticky-TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p
                className="text-xs uppercase tracking-[0.18em] font-semibold text-foreground/55 mb-5"
              >
                Inhalt.
              </p>
              <nav>
                <ul className="space-y-1">
                  {TOC.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`group block py-2 pl-4 -ml-px border-l-2 transition-all ${
                          active === s.id
                            ? "border-[#9a2640] text-foreground font-semibold"
                            : "border-foreground/10 text-foreground/55 hover:text-foreground/85 hover:border-foreground/30"
                        }`}
                      >
                        <span className="text-[11px] tabular-nums tracking-[0.1em] mr-2 text-foreground/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div
                className="mt-10 p-5 rounded-2xl border border-foreground/10"
                style={{ background: `${CREAM}80` }}
              >
                <ShieldCheck
                  className="w-5 h-5 mb-3"
                  style={{ color: ACCENT }}
                />
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mb-2`}>
                  Hinweis.
                </p>
                <p className="text-[13px] text-foreground/70 leading-[1.55]">
                  Pflichtangaben werden mindestens alle 12 Monate auf
                  Aktualität geprüft. Stand: 2026.
                </p>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article
            className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            <h2
              id="tmg-5"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Angaben gemäß{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                § 5 TMG.
              </span>
            </h2>
            <address className="not-italic rounded-2xl p-6 mb-12 border border-foreground/10" style={{ background: `${CREAM}55` }}>
              <p className="text-base md:text-lg text-foreground leading-[1.7]">
                Emilian Leber<br />
                Zauberer Emilian Leber<br />
                Reichsstiftstraße 18<br />
                93055 Regensburg<br />
                Deutschland
              </p>
            </address>

            <h2
              id="kontakt"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Kontakt.
              </span>
            </h2>
            <div className="rounded-2xl p-6 mb-12 border border-foreground/10" style={{ background: `${CREAM}55` }}>
              <ul className="space-y-3 text-base md:text-lg text-foreground/80 leading-[1.7]">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4" style={{ color: ACCENT }} />
                  <span>Telefon: +49 155 63744696</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4" style={{ color: ACCENT }} />
                  <span>E-Mail: el@magicel.de</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" style={{ color: ACCENT }} />
                  <span>Website: www.magicel.de</span>
                </li>
              </ul>
            </div>

            <h2
              id="umsatzsteuer"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Umsatzsteuer.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-12">
              Gemäß § 19 UStG wird keine Umsatzsteuer berechnet
              (Kleinunternehmerregelung).
            </p>

            <h2
              id="verantwortlich"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Verantwortlich für{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                den Inhalt
              </span>
              <br />
              <span className="text-foreground/55 text-base md:text-lg font-normal tracking-normal">
                nach § 55 Abs. 2 RStV
              </span>
            </h2>
            <address className="not-italic rounded-2xl p-6 mb-12 border border-foreground/10" style={{ background: `${CREAM}55` }}>
              <p className="text-base md:text-lg text-foreground leading-[1.7]">
                Emilian Leber<br />
                Reichsstiftstraße 18<br />
                93055 Regensburg
              </p>
            </address>

            <h2
              id="haftung-inhalte"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Haftung für{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Inhalte.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-5">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-12">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
              möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen
              werden wir diese Inhalte umgehend entfernen.
            </p>

            <h2
              id="haftung-links"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Haftung für{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Links.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-12">
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir
              für diese fremden Inhalte auch keine Gewähr übernehmen. Für
              die Inhalte der verlinkten Seiten ist stets der jeweilige
              Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2
              id="urheberrecht"
              className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6"
            >
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Urheberrecht.
              </span>
            </h2>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-5">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
              der schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers.
            </p>
            <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-10">
              Downloads und Kopien dieser Seite sind nur für den privaten,
              nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte
              auf dieser Seite nicht vom Betreiber erstellt wurden, werden
              die Urheberrechte Dritter beachtet.
            </p>

            <p className={`${SERIF_ITALIC} text-foreground/50 text-base mt-12`}>
              Stand: 2026 · alle Pflichtangaben aktualisiert.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   3 · KONTAKT-DIREKT CARD
   ════════════════════════════════════════════════════════ */
const KontaktDirektCard = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      style={{ background: `linear-gradient(180deg, ${CREAM} 0%, #faf2e3 100%)` }}
    >
      <div className="container px-6">
        <div
          className={`max-w-4xl mx-auto rounded-3xl bg-white p-8 md:p-12 border border-foreground/10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.15)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-12 items-start">
            <div>
              <p className={`${SERIF_ITALIC} text-lg text-foreground/55 mb-4`}>
                Direkter Draht.
              </p>
              <h3 className="font-display font-black text-2xl md:text-3xl leading-[1.1] text-foreground mb-4">
                Lieber{" "}
                <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                  reden
                </span>{" "}
                statt lesen?
              </h3>
              <p className="text-sm md:text-base text-foreground/65 leading-[1.6]">
                Schreib oder ruf an — persönliche Antwort innerhalb 24 Stunden.
              </p>
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:el@magicel.de"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-foreground/10 hover:border-[#9a2640] transition-all"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                      }}
                    >
                      <Mail className="w-4 h-4 text-white" />
                    </span>
                    <span>
                      <span className="block text-[11px] tracking-[0.1em] uppercase text-foreground/55">
                        Email
                      </span>
                      <span className="block text-base text-foreground font-medium">
                        el@magicel.de
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-[#9a2640] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+4915563744696"
                  className="group flex items-center justify-between p-4 rounded-2xl border border-foreground/10 hover:border-[#9a2640] transition-all"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                      }}
                    >
                      <Phone className="w-4 h-4 text-white" />
                    </span>
                    <span>
                      <span className="block text-[11px] tracking-[0.1em] uppercase text-foreground/55">
                        Telefon
                      </span>
                      <span className="block text-base text-foreground font-medium">
                        +49 155 63744696
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-[#9a2640] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-2xl border border-foreground/10">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                  }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </span>
                <span>
                  <span className="block text-[11px] tracking-[0.1em] uppercase text-foreground/55">
                    Adresse
                  </span>
                  <span className="block text-base text-foreground font-medium">
                    Reichsstiftstraße 18, 93055 Regensburg
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   4 · VERWANDTE RESSOURCEN
   ════════════════════════════════════════════════════════ */
const VerwandteRessourcen = () => {
  const { ref, isVisible } = useScrollReveal();
  const links = [
    {
      title: "Datenschutz",
      desc: "Wie deine Daten verarbeitet werden — DSGVO-konform und transparent.",
      to: "/datenschutz",
      icon: ShieldCheck,
    },
    {
      title: "AGB",
      desc: "Allgemeine Geschäftsbedingungen — Buchung, Honorar, Stornierung.",
      to: "/agb",
      icon: Scale,
    },
    {
      title: "Kontakt",
      desc: "Direktwege — Email, Telefon, Show-Planer.",
      to: "/kontakt",
      icon: FileText,
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-lg text-foreground/55 mb-4`}>
            Weiter im Rechtlichen.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3rem)] text-foreground">
            Auch{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              wichtig.
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <Link
                key={l.title}
                to={l.to}
                className="group block rounded-3xl p-7 transition-all duration-500 hover:-translate-y-1 border border-foreground/10 bg-[#f5ecdc]/40 hover:bg-[#f5ecdc]/70"
                style={{ boxShadow: "0 4px 16px -4px rgba(0,0,0,0.04)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {l.title}
                </h3>
                <p className="text-sm text-foreground/65 leading-[1.6] mb-5">
                  {l.desc}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] uppercase font-semibold"
                  style={{ color: ACCENT }}
                >
                  Öffnen
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   5 · FINAL CTA — black mini
   ════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="relative text-white py-20 md:py-28 overflow-hidden"
      style={{ background: "#08060c" }}
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/3 w-[420px] h-[420px] rounded-full blur-3xl opacity-6"
        style={{
          background: "radial-gradient(circle, rgba(154,38,64,0.13), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className={`${SERIF_ITALIC} text-base md:text-lg text-white/60 mb-5`}>
            Fragen zur Vertretungsberechtigung?
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,4.5vw,3.5rem)]">
            Schreib mir{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              direkt.
            </span>
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/kontakt"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/90 transition-all"
            >
              Zum Kontakt
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:el@magicel.de"
              className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white/70 hover:text-white"
            >
              el@magicel.de
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/impressum";

const Impressum = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Impressum — Emilian Leber | Zauberer aus Regensburg</title>
      <meta
        name="description"
        content="Impressum und Kontaktdaten von Emilian Leber, Zauberer und Showkünstler aus Regensburg. Angaben gemäß § 5 TMG für die Website magicel.de."
      />
      <link rel="canonical" href={SITE_URL} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content="Impressum — Emilian Leber" />
      <meta
        property="og:description"
        content="Impressum von Emilian Leber, Zauberer und Showkünstler aus Regensburg. Angaben gemäß § 5 TMG."
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Impressum — Emilian Leber" />
      <meta
        name="twitter:description"
        content="Impressum von Emilian Leber, Zauberer und Showkünstler aus Regensburg. Angaben gemäß § 5 TMG."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
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
    </Helmet>
    <PageLayout>
      <PageKeyframes />
      <main>
        <Hero />
        <LegalContent />
        <KontaktDirektCard />
        <VerwandteRessourcen />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Impressum;
