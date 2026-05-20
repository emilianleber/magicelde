import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Scale,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Star,
  FileText,
  ShieldCheck,
  Mail,
  AlertCircle,
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

const TOC = [
  { id: "p1", num: "§ 1", label: "Geltungsbereich" },
  { id: "p2", num: "§ 2", label: "Vertragsschluss" },
  { id: "p3", num: "§ 3", label: "Leistungsumfang" },
  { id: "p4", num: "§ 4", label: "Vergütung & Zahlung" },
  { id: "p5", num: "§ 5", label: "Stornierung & Rücktritt" },
  { id: "p6", num: "§ 6", label: "Höhere Gewalt" },
  { id: "p7", num: "§ 7", label: "Mitwirkungspflichten" },
  { id: "p8", num: "§ 8", label: "Haftungsbeschränkung" },
  { id: "p9", num: "§ 9", label: "Bild- und Tonaufnahmen" },
  { id: "p10", num: "§ 10", label: "Urheberrecht" },
  { id: "p11", num: "§ 11", label: "GEMA-Hinweis" },
  { id: "p12", num: "§ 12", label: "Gerichtsstand" },
  { id: "p13", num: "§ 13", label: "Salvatorische Klausel" },
];

/* ════════════════════════════════════════════════════════
   HERO
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
            AGB · 13 Paragraphen · Stand 2026
          </span>
        </div>

        <p
          className={`hero-fade ${SERIF_ITALIC} text-lg md:text-xl text-foreground/55 mb-6`}
          style={{ animationDelay: "0.15s" }}
        >
          Rechtliches.
        </p>

        <h1
          className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(2.5rem,7vw,6.5rem)] text-foreground mb-8"
          aria-label="AGB · Allgemeine Geschäftsbedingungen."
        >
          <span
            className="hero-word"
            style={{ animationDelay: "0.25s", marginRight: "0.22em" }}
          >
            AGB
          </span>
          <span
            className="hero-word"
            style={{ animationDelay: "0.33s", marginRight: "0.22em" }}
          >
            ·
          </span>
          <br />
          <span
            className={`hero-word ${SERIF_ITALIC}`}
            style={{
              animationDelay: "0.42s",
              color: ACCENT,
              paddingRight: "0.18em",
            }}
          >
            Geschäftsbedingungen.
          </span>
        </h1>

        <p
          className="hero-fade text-base md:text-lg text-foreground/65 leading-[1.65] max-w-2xl"
          style={{ animationDelay: "0.55s" }}
        >
          Die rechtliche Grundlage für jede Buchung — Vertragsschluss,
          Zahlungsbedingungen, Stornierung, Haftung. Konservativ formuliert,
          marktüblich, ohne juristischen Schnickschnack.
        </p>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   LEGAL CONTENT
   ════════════════════════════════════════════════════════ */
const useActiveSection = () => {
  const [active, setActive] = useState<string>(TOC[0]?.id ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
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

const ParagraphH2 = ({
  id,
  num,
  title,
}: {
  id: string;
  num: string;
  title: string;
}) => (
  <h2
    id={id}
    className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6 mt-14 first:mt-0"
  >
    <span className="block text-[12px] tracking-[0.18em] uppercase font-bold mb-2" style={{ color: ACCENT }}>
      {num}
    </span>
    <span className={SERIF_ITALIC} style={{ color: ACCENT_DEEP }}>
      {title}.
    </span>
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-base md:text-lg text-foreground/75 leading-[1.75] mb-5">
    {children}
  </p>
);

const LegalContent = () => {
  const { ref, isVisible } = useScrollReveal();
  const active = useActiveSection();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-32 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Sticky-TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-foreground/55 mb-5">
                Paragraphen.
              </p>
              <nav>
                <ul className="space-y-1">
                  {TOC.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`group flex items-center gap-3 py-2 pl-4 -ml-px border-l-2 transition-all ${
                          active === s.id
                            ? "border-[#9a2640] text-foreground font-semibold"
                            : "border-foreground/10 text-foreground/55 hover:text-foreground/85 hover:border-foreground/30"
                        }`}
                      >
                        <span
                          className="text-[11px] tabular-nums font-bold w-9"
                          style={{
                            color:
                              active === s.id ? ACCENT : "rgba(0,0,0,0.4)",
                          }}
                        >
                          {s.num}
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
                <Scale className="w-5 h-5 mb-3" style={{ color: ACCENT }} />
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mb-2`}>
                  Anwendbar bei.
                </p>
                <p className="text-[13px] text-foreground/70 leading-[1.55]">
                  Jeder Buchung — Privat, B2B, Hochzeit, Firmen-Event. Bei
                  abweichenden individuellen Vereinbarungen gehen diese den
                  AGB vor.
                </p>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article
            className={`max-w-3xl`}
          >
            <ParagraphH2 id="p1" num="§ 1" title="Geltungsbereich" />
            <P>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
              Verträge zwischen Emilian Leber (im Folgenden [Künstler]) und
              dem Auftraggeber (im Folgenden [Kunde]) über die Erbringung von
              künstlerischen Dienstleistungen (Auftritte, Shows,
              Performances). Mit Erteilung des Auftrags erkennt der Kunde
              diese AGB an.
            </P>

            <ParagraphH2 id="p2" num="§ 2" title="Vertragsschluss" />
            <P>
              Ein Vertrag kommt zustande durch die schriftliche Bestätigung
              (auch per E-Mail) einer Buchung durch den Künstler nach
              vorheriger Anfrage des Kunden. Die Anfrage des Kunden stellt
              ein unverbindliches Angebot dar. Erst die Buchungsbestätigung
              des Künstlers begründet einen verbindlichen Vertrag. Der
              Auftrag gilt als bestätigt, sobald eine schriftliche
              Bestätigungsmail durch den Künstler gesendet wurde.
            </P>

            <ParagraphH2 id="p3" num="§ 3" title="Leistungsumfang" />
            <P>
              Der genaue Leistungsumfang (Art der Show, Dauer, Format) wird
              individuell vereinbart und in der Buchungsbestätigung
              festgehalten. Änderungen des vereinbarten Leistungsumfangs
              bedürfen der schriftlichen Zustimmung beider Parteien.
            </P>

            <ParagraphH2 id="p4" num="§ 4" title="Vergütung und Zahlungsbedingungen" />
            <P>
              Die Vergütung wird individuell vereinbart und in der
              Buchungsbestätigung festgehalten. Zur Sicherung des Termins
              wird eine Anzahlung fällig. Die Restzahlung ist spätestens am
              Tag der Veranstaltung zu leisten, sofern nicht anders
              vereinbart. Alle Preise verstehen sich als Bruttopreise
              inklusive gesetzlicher Mehrwertsteuer.
            </P>

            <ParagraphH2 id="p5" num="§ 5" title="Stornierung und Rücktritt" />
            <P>
              Eine Stornierung durch den Kunden ist jederzeit schriftlich
              möglich. Bei Stornierung fallen folgende Kosten an:
            </P>
            <ul className="list-disc pl-6 space-y-3 mb-6 text-base md:text-lg text-foreground/75 leading-[1.7]">
              <li>
                Bis 30 Tage vor der Veranstaltung:{" "}
                <strong className="text-foreground">
                  55 % der vereinbarten Gage
                </strong>
              </li>
              <li>
                Bis 20 Tage vor der Veranstaltung:{" "}
                <strong className="text-foreground">
                  75 % der vereinbarten Gage
                </strong>
              </li>
              <li>
                Bis 14 Tage vor der Veranstaltung:{" "}
                <strong className="text-foreground">
                  100 % der vereinbarten Gage
                </strong>
              </li>
            </ul>
            <P>
              Der Auftrag gilt als bestätigt, sobald eine schriftliche
              Bestätigungsmail durch den Künstler gesendet wurde. Maßgeblich
              für die Berechnung der Stornierungskosten ist das Datum des
              Eingangs der schriftlichen Stornierung.
            </P>

            <ParagraphH2 id="p6" num="§ 6" title="Höhere Gewalt (Force Majeure)" />
            <P>
              Wird die Durchführung des Auftritts durch höhere Gewalt (z. B.
              Naturkatastrophen, Pandemie, behördliche Anordnungen, Krieg,
              Streik) unmöglich, sind beide Parteien von ihren
              Leistungspflichten befreit. In diesem Fall wird die geleistete
              Anzahlung vollständig erstattet. Ein weitergehender
              Schadensersatzanspruch besteht nicht. Gleiches gilt bei
              Erkrankung oder Verletzung des Künstlers, die eine
              Durchführung des Auftritts unmöglich macht. Der Künstler wird
              den Kunden unverzüglich über den Eintritt eines solchen
              Ereignisses informieren.
            </P>

            <ParagraphH2 id="p7" num="§ 7" title="Mitwirkungspflichten des Kunden" />
            <P>
              Der Kunde stellt sicher, dass am Veranstaltungsort geeignete
              Bedingungen für den Auftritt vorhanden sind (ausreichend Platz,
              Stromversorgung bei Bedarf, angemessene Beleuchtung). Der
              Kunde informiert den Künstler rechtzeitig über Änderungen im
              Ablauf oder besondere Umstände.
            </P>

            <ParagraphH2 id="p8" num="§ 8" title="Haftungsbeschränkung" />
            <P>
              Der Künstler haftet nur für Schäden, die auf vorsätzlichem
              oder grob fahrlässigem Verhalten beruhen. Die Haftung für
              leichte Fahrlässigkeit ist ausgeschlossen, soweit keine
              wesentlichen Vertragspflichten (Kardinalpflichten) verletzt
              werden. Im Falle einer Verletzung wesentlicher
              Vertragspflichten ist die Haftung auf den vertragstypischen,
              vorhersehbaren Schaden begrenzt. Die Haftung für Schäden an
              Gegenständen des Kunden oder Dritter am Veranstaltungsort ist
              ausgeschlossen, es sei denn, der Schaden wurde vorsätzlich
              oder grob fahrlässig verursacht.
            </P>

            <ParagraphH2 id="p9" num="§ 9" title="Bild- und Tonaufnahmen" />
            <P>
              Der Künstler behält sich vor, während der Veranstaltung Foto-
              und Videoaufnahmen für eigene Werbezwecke anzufertigen oder
              anfertigen zu lassen. Sollte der Kunde dies nicht wünschen,
              ist dies vorab schriftlich mitzuteilen.
            </P>

            <ParagraphH2
              id="p10"
              num="§ 10"
              title="Urheberrecht an Programm und Konzepten"
            />
            <P>
              Sämtliche vom Künstler entwickelten Programme, Konzepte,
              Showabläufe und kreativen Inhalte unterliegen dem Urheberrecht
              und verbleiben im geistigen Eigentum des Künstlers. Eine
              Weitergabe, Vervielfältigung oder anderweitige Nutzung durch
              den Kunden oder Dritte bedarf der ausdrücklichen schriftlichen
              Zustimmung des Künstlers.
            </P>

            <ParagraphH2 id="p11" num="§ 11" title="GEMA-Hinweis" />
            <P>
              Sofern im Rahmen des Auftritts GEMA-pflichtige Musik verwendet
              wird, ist die Anmeldung und Abführung der GEMA-Gebühren Sache
              des Veranstalters bzw. des Kunden, es sei denn, es wird
              ausdrücklich etwas anderes vereinbart. Der Künstler weist den
              Kunden auf diese Pflicht hin.
            </P>

            <ParagraphH2 id="p12" num="§ 12" title="Gerichtsstand" />
            <P>
              Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang
              mit diesem Vertrag ist Regensburg, soweit gesetzlich zulässig.
              Es gilt das Recht der Bundesrepublik Deutschland.
            </P>

            <ParagraphH2 id="p13" num="§ 13" title="Salvatorische Klausel" />
            <P>
              Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise
              unwirksam sein oder werden, so wird die Wirksamkeit der
              übrigen Bestimmungen hiervon nicht berührt. Anstelle der
              unwirksamen Bestimmung tritt eine Regelung, die dem
              wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten
              kommt.
            </P>

            <p className={`${SERIF_ITALIC} text-foreground/50 text-base mt-12`}>
              Stand: April 2026 · marktüblich, konservativ formuliert.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   STORNIERUNGS-STAFFEL HIGHLIGHT
   ════════════════════════════════════════════════════════ */
const StornierungsStaffel = () => {
  const { ref, isVisible } = useScrollReveal();
  const rows = [
    {
      window: "Bis 30 Tage vorher",
      cost: "55 %",
      tone: "moderat",
      hint: "Eintrag standardmäßig — Reisekosten + Vorbereitung sind dann bereits gelaufen.",
    },
    {
      window: "Bis 20 Tage vorher",
      cost: "75 %",
      tone: "deutlich",
      hint: "Programm steht fest, andere Anfragen wurden abgewiesen.",
    },
    {
      window: "Bis 14 Tage vorher",
      cost: "100 %",
      tone: "voll",
      hint: "Termin praktisch nicht mehr neu besetzbar.",
    },
  ];
  return (
    <section
      ref={ref}
      className="py-20 md:py-28"
      style={{ background: `linear-gradient(180deg, ${CREAM} 0%, #faf2e3 100%)` }}
    >
      <div className="container px-6">
        <div className={`max-w-4xl mx-auto`}>
          <p className={`${SERIF_ITALIC} text-lg text-foreground/55 mb-4`}>
            § 5 · auf einen Blick.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3rem)] text-foreground mb-10">
            Stornierungs-{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              staffel.
            </span>
          </h2>

          <div
            className="rounded-3xl bg-white border border-foreground/10 overflow-hidden"
            style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.12)" }}
          >
            <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1.5fr_auto_2fr] gap-x-6 px-6 md:px-8 py-4 border-b border-foreground/10 bg-[#f5ecdc]/40">
              <p className="text-[11px] tracking-[0.12em] uppercase font-semibold text-foreground/55">
                Zeitfenster
              </p>
              <p className="text-[11px] tracking-[0.12em] uppercase font-semibold text-foreground/55 text-right">
                Anteil
              </p>
              <p className="hidden md:block text-[11px] tracking-[0.12em] uppercase font-semibold text-foreground/55">
                Hinweis
              </p>
            </div>
            {rows.map((r) => (
              <div
                key={r.window}
                className="grid grid-cols-[1fr_auto] md:grid-cols-[1.5fr_auto_2fr] gap-x-6 px-6 md:px-8 py-6 md:py-7 border-b border-foreground/10 last:border-b-0 items-center"
              >
                <div className="flex items-center gap-3">
                  <Calendar
                    className="w-4 h-4 shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <span className="font-display text-base md:text-lg font-bold text-foreground">
                    {r.window}
                  </span>
                </div>
                <span
                  className="font-display text-2xl md:text-3xl font-black tabular-nums"
                  style={{ color: ACCENT_DEEP }}
                >
                  {r.cost}
                </span>
                <p className="hidden md:block text-sm text-foreground/65 leading-[1.55] col-start-3 md:col-auto">
                  {r.hint}
                </p>
                <p className="md:hidden text-sm text-foreground/65 leading-[1.55] col-span-2 mt-2">
                  {r.hint}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl border border-foreground/10 bg-white/60">
            <AlertCircle
              className="w-4 h-4 shrink-0 mt-0.5"
              style={{ color: ACCENT }}
            />
            <p className="text-sm text-foreground/65 leading-[1.6]">
              <strong className="text-foreground">Höhere Gewalt</strong> (§ 6):
              Pandemie, behördliche Anordnung, Krankheit beim Künstler — in
              allen Fällen wird die geleistete Anzahlung vollständig
              erstattet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   VERWANDTE RESSOURCEN
   ════════════════════════════════════════════════════════ */
const VerwandteRessourcen = () => {
  const { ref, isVisible } = useScrollReveal();
  const links = [
    {
      title: "Impressum",
      desc: "Pflichtangaben nach § 5 TMG — Anschrift, Verantwortlich, USt.",
      to: "/impressum",
      icon: FileText,
    },
    {
      title: "Datenschutz",
      desc: "Wie deine Daten verarbeitet werden — DSGVO-konform.",
      to: "/datenschutz",
      icon: ShieldCheck,
    },
    {
      title: "Kontakt",
      desc: "Direkter Weg zu mir — Email, Telefon, Show-Planer.",
      to: "/kontakt",
      icon: Mail,
    },
  ];
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-28 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div
          className={`max-w-3xl mb-12`}
        >
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
   FINAL CTA klein
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
          background:
            "radial-gradient(circle, rgba(154,38,64,0.13), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div
          className={`max-w-3xl mx-auto text-center`}
        >
          <p className={`${SERIF_ITALIC} text-base md:text-lg text-white/60 mb-5`}>
            Frage zu einem Paragraphen?
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
const SITE_URL = "https://www.magicel.de/agb";

const AGB = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>
        AGB · Allgemeine Geschäftsbedingungen — Emilian Leber Zauberer
      </title>
      <meta
        name="description"
        content="Allgemeine Geschäftsbedingungen von Zauberer Emilian Leber. Buchung, Stornierung, Zahlung, Leistungsumfang — 13 Paragraphen, marktüblich formuliert."
      />
      <link rel="canonical" href={SITE_URL} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content="AGB — Emilian Leber" />
      <meta
        property="og:description"
        content="Allgemeine Geschäftsbedingungen von Zauberer Emilian Leber. Buchung, Stornierung, Leistungsumfang."
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="AGB — Emilian Leber" />
      <meta
        name="twitter:description"
        content="Allgemeine Geschäftsbedingungen von Zauberer Emilian Leber."
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
        <StornierungsStaffel />
        <VerwandteRessourcen />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default AGB;
