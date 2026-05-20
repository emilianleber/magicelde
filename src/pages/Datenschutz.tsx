import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  ShieldCheck,
  Cookie,
  Database,
  Lock,
  ArrowRight,
  ArrowUpRight,
  Star,
  FileText,
  Scale,
  Mail,
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
    .legal-h3 { scroll-margin-top: 120px; }
  `}</style>
);

const TOC = [
  { id: "ueberblick", label: "Datenschutz auf einen Blick" },
  { id: "verantwortlich", label: "Verantwortliche Stelle" },
  { id: "hosting", label: "Hosting und Infrastruktur" },
  { id: "cookies", label: "Cookies" },
  { id: "datenerfassung", label: "Datenerfassung" },
  { id: "analyse", label: "Analyse-Tools" },
  { id: "fristen", label: "Aufbewahrungsfristen" },
  { id: "rechte", label: "Deine Rechte" },
  { id: "widerruf", label: "Widerruf" },
  { id: "aktualitaet", label: "Aktualität" },
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
            DSGVO-konform · Server in der EU
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
          aria-label="Datenschutzerklärung."
        >
          <span
            className="hero-word"
            style={{ animationDelay: "0.25s", marginRight: "0.22em" }}
          >
            Datenschutz
          </span>
          <br />
          <span
            className={`hero-word ${SERIF_ITALIC}`}
            style={{
              animationDelay: "0.4s",
              color: ACCENT,
              paddingRight: "0.18em",
            }}
          >
            erklärung.
          </span>
        </h1>

        <p
          className="hero-fade text-base md:text-lg text-foreground/65 leading-[1.65] max-w-2xl"
          style={{ animationDelay: "0.55s" }}
        >
          Wie ich personenbezogene Daten verarbeite — klar erklärt, ohne
          juristischen Wortsalat. Alle Pflichtangaben nach DSGVO, plus
          konkrete Auskunft, welche Cookies und Tools tatsächlich auf
          dieser Seite laufen.
        </p>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════
   LEGAL CONTENT mit Sticky-TOC
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

const H2 = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <h2
    id={id}
    className="legal-h2 font-display font-black text-foreground text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.1] tracking-[-0.02em] mb-6 mt-14 first:mt-0"
  >
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="legal-h3 font-display text-xl md:text-2xl font-bold text-foreground leading-snug mb-4 mt-10">
    {children}
  </h3>
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
    <section ref={ref} className="bg-white py-24 md:py-32 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Sticky-TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-foreground/55 mb-5">
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
                <ShieldCheck className="w-5 h-5 mb-3" style={{ color: ACCENT }} />
                <p className={`${SERIF_ITALIC} text-sm text-foreground/55 mb-2`}>
                  Datenschutzbeauftragter
                </p>
                <p className="text-[13px] text-foreground/70 leading-[1.55]">
                  Bei Datenschutz-Fragen wende dich an{" "}
                  <a
                    href="mailto:el@magicel.de"
                    className="font-semibold underline"
                    style={{ color: ACCENT_DEEP }}
                  >
                    el@magicel.de
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          {/* Body */}
          <article className="max-w-3xl">
            <H2 id="ueberblick">
              1. Datenschutz{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                auf einen Blick.
              </span>
            </H2>
            <H3>Allgemeine Hinweise</H3>
            <P>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können. Ausführliche
              Informationen zum Thema Datenschutz entnehmen Sie unserer
              nachfolgend aufgeführten Datenschutzerklärung.
            </P>
            <H3>Datenerfassung auf dieser Website</H3>
            <P>
              <strong className="text-foreground">
                Wer ist verantwortlich für die Datenerfassung auf dieser
                Website?
              </strong>
            </P>
            <P>
              Die Datenverarbeitung auf dieser Website erfolgt durch den
              Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
              [Verantwortliche Stelle] in dieser Datenschutzerklärung
              entnehmen.
            </P>
            <P>
              <strong className="text-foreground">
                Wie erfassen wir Ihre Daten?
              </strong>
            </P>
            <P>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
              mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie
              in ein Kontaktformular eingeben. Andere Daten werden automatisch
              oder nach Ihrer Einwilligung beim Besuch der Website durch
              unsere IT-Systeme erfasst. Das sind vor allem technische Daten
              (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs).
            </P>
            <P>
              <strong className="text-foreground">
                Wofür nutzen wir Ihre Daten?
              </strong>
            </P>
            <P>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie
              Bereitstellung der Website zu gewährleisten. Andere Daten können
              zur Bearbeitung Ihrer Anfragen verwendet werden. Eine Analyse
              des Nutzerverhaltens findet derzeit nicht statt (siehe Abschnitt
              [Analyse-Tools und Tracking]).
            </P>
            <P>
              <strong className="text-foreground">
                Welche Rechte haben Sie bezüglich Ihrer Daten?
              </strong>
            </P>
            <P>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über
              Herkunft, Empfänger und Zweck Ihrer gespeicherten
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
              können Sie diese Einwilligung jederzeit für die Zukunft
              widerrufen. Außerdem haben Sie das Recht, unter bestimmten
              Umständen die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
              ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </P>

            <H2 id="verantwortlich">
              2. Verantwortliche{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Stelle.
              </span>
            </H2>
            <P>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser
              Website ist:
            </P>
            <address
              className="not-italic rounded-2xl p-6 mb-6 border border-foreground/10"
              style={{ background: `${CREAM}55` }}
            >
              <p className="text-base md:text-lg text-foreground leading-[1.7]">
                Emilian Leber<br />
                MagicEL Entertainment<br />
                93047 Regensburg, Bayern<br />
                E-Mail: el@magicel.de<br />
                Telefon: Auf Anfrage
              </p>
            </address>
            <P>
              Verantwortliche Stelle ist die natürliche oder juristische
              Person, die allein oder gemeinsam mit anderen über die Zwecke
              und Mittel der Verarbeitung von personenbezogenen Daten (z. B.
              Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </P>

            <H2 id="hosting">
              3. Hosting und{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                technische Infrastruktur.
              </span>
            </H2>
            <H3>Hosting-Anbieter</H3>
            <P>
              Diese Website wird über einen externen Hosting-Dienst
              bereitgestellt. Die personenbezogenen Daten, die auf dieser
              Website erfasst werden, werden auf den Servern des Hosters
              gespeichert. Hierbei kann es sich v. a. um IP-Adressen,
              Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
              Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die
              über eine Website generiert werden, handeln.
            </P>
            <P>
              Der Einsatz des Hosters erfolgt zum Zweck der Vertragserfüllung
              gegenüber unseren potenziellen und bestehenden Kunden (Art. 6
              Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen
              und effizienten Bereitstellung unseres Online-Angebots durch
              einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </P>
            <H3>Supabase (Backend-Dienst)</H3>
            <P>
              Wir nutzen Supabase als Backend-Dienst für die Verwaltung von
              Anfragen und das Kundenportal. Supabase verarbeitet Daten auf
              Servern innerhalb der Europäischen Union (Frankfurt,
              Deutschland). Die Verarbeitung erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an einer zuverlässigen
              Datenverwaltung). Weitere Informationen finden Sie in der
              Datenschutzerklärung von Supabase unter{" "}
              <a
                href="https://supabase.com/privacy"
                className="underline font-semibold"
                style={{ color: ACCENT_DEEP }}
                target="_blank"
                rel="noopener noreferrer"
              >
                supabase.com/privacy
              </a>
              .
            </P>

            <H2 id="cookies">
              4.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Cookies.
              </span>
            </H2>
            <P>
              Diese Website verwendet Cookies. Cookies sind kleine
              Textdateien, die auf Ihrem Endgerät gespeichert werden und die
              Ihr Browser speichert. Wir verwenden folgende Arten von Cookies:
            </P>
            <ul className="list-disc pl-6 space-y-3 mb-6 text-base md:text-lg text-foreground/75 leading-[1.7]">
              <li>
                <strong className="text-foreground">
                  Technisch notwendige Cookies:
                </strong>{" "}
                Diese sind für den Betrieb der Website erforderlich (z. B.
                Session-Cookies für das Kundenportal). Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
              </li>
              <li>
                <strong className="text-foreground">
                  Funktionale Cookies:
                </strong>{" "}
                Diese speichern Ihre Cookie-Einstellungen
                (Cookie-Banner-Präferenz). Rechtsgrundlage ist Art. 6 Abs. 1
                lit. a DSGVO (Einwilligung).
              </li>
            </ul>
            <P>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen
              von Cookies informiert werden und Cookies nur im Einzelfall
              erlauben. Bei der Deaktivierung von Cookies kann die
              Funktionalität dieser Website eingeschränkt sein. Über unser
              Cookie-Banner können Sie Ihre Einwilligung jederzeit verwalten
              und widerrufen.
            </P>

            <H2 id="datenerfassung">
              5. Datenerfassung auf{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                dieser Website.
              </span>
            </H2>
            <H3>Kontaktformular</H3>
            <P>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
              werden Ihre Angaben aus dem Anfrageformular inklusive der von
              Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
              Anfrage und für den Fall von Anschlussfragen bei uns
              gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
              weiter.
            </P>
            <P>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der
              effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6
              Abs. 1 lit. f DSGVO).
            </P>
            <H3>Kundenportal</H3>
            <P>
              Für die Abwicklung von Buchungen stellen wir ein Kundenportal
              bereit, in dem Kunden ihre Buchungsdetails einsehen und
              verwalten können. Im Kundenportal werden folgende Daten
              verarbeitet: Name, E-Mail-Adresse, Telefonnummer,
              Veranstaltungsdetails, Buchungsstatus und Kommunikationsverlauf.
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO (Vertragserfüllung).
            </P>
            <H3>E-Mail-Kommunikation</H3>
            <P>
              Wenn Sie uns per E-Mail kontaktieren oder wir Ihnen im Rahmen
              der Buchungsabwicklung E-Mails senden, werden die übermittelten
              Daten (Ihre E-Mail-Adresse, ggf. Ihr Name und Ihre Nachricht)
              zum Zweck der Bearbeitung Ihrer Anfrage gespeichert. Die
              Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO. Wir nutzen E-Mail ausschließlich zur direkten
              Kommunikation mit Kunden und Interessenten. Ein
              Newsletter-Versand findet derzeit nicht statt.
            </P>
            <H3>WhatsApp-Kommunikation</H3>
            <P>
              Wir bieten die Möglichkeit, uns über WhatsApp (Meta Platforms
              Ireland Ltd.) zu kontaktieren. Wenn Sie uns über WhatsApp eine
              Nachricht senden, werden Ihre Telefonnummer und die
              Nachrichteninhalte an WhatsApp bzw. Meta übermittelt. WhatsApp
              nutzt eine Ende-zu-Ende-Verschlüsselung. Die Nutzung von
              WhatsApp erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6
              Abs. 1 lit. a DSGVO. Sie können diese Einwilligung jederzeit mit
              Wirkung für die Zukunft widerrufen. Bitte beachten Sie, dass
              Meta (WhatsApp) Daten in die USA übermitteln kann. Weitere
              Informationen entnehmen Sie der Datenschutzerklärung von
              WhatsApp unter{" "}
              <a
                href="https://www.whatsapp.com/legal/privacy-policy"
                className="underline font-semibold"
                style={{ color: ACCENT_DEEP }}
                target="_blank"
                rel="noopener noreferrer"
              >
                whatsapp.com/legal/privacy-policy
              </a>
              .
            </P>
            <H3>Server-Log-Dateien</H3>
            <P>
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr
              Browser automatisch an uns übermittelt. Dies sind: Browsertyp
              und Browserversion, verwendetes Betriebssystem, Referrer URL,
              Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage
              und IP-Adresse. Eine Zusammenführung dieser Daten mit anderen
              Datenquellen wird nicht vorgenommen.
            </P>

            <H2 id="analyse">
              6. Analyse-Tools und{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Tracking.
              </span>
            </H2>
            <P>
              Diese Website verwendet derzeit{" "}
              <strong className="text-foreground">
                keine Analyse-Tools
              </strong>{" "}
              wie Google Analytics oder vergleichbare Tracking-Dienste. Es
              findet keine Auswertung Ihres Nutzungsverhaltens statt. Sollte
              sich dies zukünftig ändern, werden wir diese
              Datenschutzerklärung entsprechend aktualisieren und Ihre
              Einwilligung einholen, sofern erforderlich.
            </P>

            <H2 id="fristen">
              7.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Aufbewahrungsfristen.
              </span>
            </H2>
            <P>
              Wir speichern Ihre personenbezogenen Daten nur so lange, wie es
              für die jeweiligen Verarbeitungszwecke erforderlich ist oder
              gesetzliche Aufbewahrungsfristen bestehen:
            </P>
            <ul className="list-disc pl-6 space-y-3 mb-6 text-base md:text-lg text-foreground/75 leading-[1.7]">
              <li>
                <strong className="text-foreground">Kontaktanfragen:</strong>{" "}
                Daten aus Kontaktanfragen werden nach abschließender
                Bearbeitung gelöscht, es sei denn, ein Vertragsverhältnis
                kommt zustande.
              </li>
              <li>
                <strong className="text-foreground">Vertragsdaten:</strong>{" "}
                Daten zu Buchungen und Verträgen werden für die Dauer der
                Vertragsabwicklung und darüber hinaus gemäß den gesetzlichen
                Aufbewahrungsfristen (in der Regel 6 Jahre gemäß § 257 HGB
                bzw. 10 Jahre gemäß § 147 AO) gespeichert.
              </li>
              <li>
                <strong className="text-foreground">Server-Logs:</strong>{" "}
                Server-Log-Dateien werden nach spätestens 30 Tagen
                automatisch gelöscht.
              </li>
              <li>
                <strong className="text-foreground">
                  Cookie-Einstellungen:
                </strong>{" "}
                Ihre Cookie-Präferenz wird für 12 Monate gespeichert.
              </li>
            </ul>

            <H2 id="rechte">
              8. Ihre{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Rechte.
              </span>
            </H2>
            <P>
              Sie haben nach der DSGVO folgende Rechte hinsichtlich Ihrer
              personenbezogenen Daten:
            </P>
            <ul className="list-disc pl-6 space-y-3 mb-6 text-base md:text-lg text-foreground/75 leading-[1.7]">
              <li>
                <strong className="text-foreground">Recht auf Auskunft</strong>{" "}
                (Art. 15 DSGVO) — Sie können Auskunft über Ihre von uns
                verarbeiteten personenbezogenen Daten verlangen.
              </li>
              <li>
                <strong className="text-foreground">
                  Recht auf Berichtigung
                </strong>{" "}
                (Art. 16 DSGVO) — Sie können die Berichtigung unrichtiger
                oder unvollständiger Daten verlangen.
              </li>
              <li>
                <strong className="text-foreground">
                  Recht auf Löschung
                </strong>{" "}
                (Art. 17 DSGVO) — Sie können die Löschung Ihrer Daten
                verlangen, sofern keine gesetzlichen Aufbewahrungspflichten
                entgegenstehen.
              </li>
              <li>
                <strong className="text-foreground">
                  Recht auf Einschränkung der Verarbeitung
                </strong>{" "}
                (Art. 18 DSGVO) — Sie können unter bestimmten Voraussetzungen
                die Einschränkung der Verarbeitung verlangen.
              </li>
              <li>
                <strong className="text-foreground">
                  Recht auf Datenübertragbarkeit
                </strong>{" "}
                (Art. 20 DSGVO) — Sie haben das Recht, die Sie betreffenden
                Daten in einem strukturierten, gängigen und maschinenlesbaren
                Format zu erhalten oder die Übermittlung an einen anderen
                Verantwortlichen zu verlangen.
              </li>
              <li>
                <strong className="text-foreground">
                  Widerspruchsrecht
                </strong>{" "}
                (Art. 21 DSGVO) — Sie können der Verarbeitung Ihrer Daten
                widersprechen, sofern die Verarbeitung auf Art. 6 Abs. 1 lit.
                f DSGVO beruht.
              </li>
              <li>
                <strong className="text-foreground">Recht auf Widerruf</strong>{" "}
                — Erteilte Einwilligungen können Sie jederzeit mit Wirkung
                für die Zukunft widerrufen.
              </li>
              <li>
                <strong className="text-foreground">Beschwerderecht</strong>{" "}
                — Sie haben das Recht, sich bei einer
                Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig ist das
                Bayerische Landesamt für Datenschutzaufsicht (BayLDA).
              </li>
            </ul>
            <P>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a
                href="mailto:el@magicel.de"
                className="underline font-semibold"
                style={{ color: ACCENT_DEEP }}
              >
                el@magicel.de
              </a>
            </P>

            <H2 id="widerruf">
              9. Widerruf Ihrer{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Einwilligung.
              </span>
            </H2>
            <P>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer
              ausdrücklichen Einwilligung möglich. Sie können eine bereits
              erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit
              der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
              Widerruf unberührt. Den Widerruf können Sie formlos per E-Mail
              an el@magicel.de richten.
            </P>

            <H2 id="aktualitaet">
              10.{" "}
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                Aktualität.
              </span>
            </H2>
            <P>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
              April 2026. Durch die Weiterentwicklung unserer Website oder
              aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben
              kann es notwendig werden, diese Datenschutzerklärung
              anzupassen.
            </P>

            <p className={`${SERIF_ITALIC} text-foreground/50 text-base mt-12`}>
              Stand: April 2026
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════
   COOKIE STATUS — Live-Card
   ════════════════════════════════════════════════════════ */
const CookieStatus = () => {
  const { ref, isVisible } = useScrollReveal();
  const tech = [
    {
      icon: Database,
      label: "localStorage",
      detail:
        "Show-Planer-Draft, Email-Capture, FAQ-Frage-Buffer — alles nur in deinem Browser, kein Server-Tracking.",
    },
    {
      icon: Lock,
      label: "Session-Cookies",
      detail:
        "Auth-Token für Kundenportal-Login. Verfallen beim Browser-Schließen.",
    },
    {
      icon: Cookie,
      label: "Cookie-Präferenz",
      detail:
        "Speichert deine Banner-Auswahl 12 Monate, damit du nicht jedes Mal neu klicken musst.",
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
            Konkret hier auf dieser Seite.
          </p>
          <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,4vw,3rem)] text-foreground mb-8">
            Was diese Website{" "}
            <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
              tatsächlich verwendet.
            </span>
          </h2>
          <div
            className="rounded-3xl bg-white p-8 md:p-10 border border-foreground/10"
            style={{ boxShadow: "0 30px 60px -25px rgba(0,0,0,0.12)" }}
          >
            <div className="mb-6 flex items-center gap-2.5 text-[12px] tracking-[0.1em] uppercase font-semibold">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#16a34a",
                  boxShadow: "0 0 0 4px rgba(22,163,74,0.18)",
                }}
              />
              <span style={{ color: ACCENT_DEEP }}>
                Keine Tracking-Cookies · Keine Analyse · Keine Drittanbieter
              </span>
            </div>
            <ul className="space-y-5">
              {tech.map((t) => {
                const Icon = t.icon;
                return (
                  <li
                    key={t.label}
                    className="flex items-start gap-4 pb-5 border-b border-foreground/10 last:border-b-0 last:pb-0"
                  >
                    <span
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%)`,
                      }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold text-foreground mb-1">
                        {t.label}
                      </p>
                      <p className="text-sm text-foreground/65 leading-[1.6]">
                        {t.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
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
      title: "AGB",
      desc: "Buchungsbedingungen, Stornierung und Leistungsumfang.",
      to: "/agb",
      icon: Scale,
    },
    {
      title: "Kontakt",
      desc: "Direkter Weg zu mir — Email, Telefon, Show-Planer.",
      to: "/kontakt",
      icon: Mail,
    },
  ];
  return (
    <section ref={ref} className="bg-white py-24 md:py-28 border-y border-foreground/10">
      <div className="container px-6">
        <div className={`max-w-3xl mb-12`}>
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
          background: "radial-gradient(circle, rgba(154,38,64,0.13), transparent 60%)",
        }}
      />
      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center`}>
          <p className={`${SERIF_ITALIC} text-base md:text-lg text-white/60 mb-5`}>
            Frage zur Datenverarbeitung?
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
const SITE_URL = "https://www.magicel.de/datenschutz";

const Datenschutz = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Datenschutzerklärung — Emilian Leber | Zauberer</title>
      <meta
        name="description"
        content="Datenschutzerklärung von Emilian Leber. Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten auf magicel.de gemäß DSGVO."
      />
      <link rel="canonical" href={SITE_URL} />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content="Datenschutz — Emilian Leber" />
      <meta
        property="og:description"
        content="Datenschutzerklärung von Emilian Leber. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
      />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Datenschutz — Emilian Leber" />
      <meta
        name="twitter:description"
        content="Datenschutzerklärung von Emilian Leber. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
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
        <CookieStatus />
        <VerwandteRessourcen />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Datenschutz;
