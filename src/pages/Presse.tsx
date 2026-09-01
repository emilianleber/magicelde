/** /presse — Pressebereich (Voltage-Layout): Pressestimmen, EPK, Fotos, TV-Auftritte. */
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Stats, FAQ, ReviewsBlock, FinalCTA } from "@/components/voltage/sections";
import {
  INK, WHITE, PAPER, COBALT, MAGENTA, L_LINE, L_DIM, CARD_LIGHT,
  up, stagger, vp, Eyebrow,
} from "@/components/voltage/theme";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  ArrowUpRight,
  Trophy,
  Award,
  Medal,
  Star,
  Tv,
  FileText,
  Download,
  Mail,
  Phone,
  MessageCircle,
  Image as ImageIcon,
  Copy,
  Check,
  Quote,
  X,
  Paperclip,
  MapPin,
  Clock,
} from "lucide-react";

import portraitImg from "@/assets/magician-portrait.jpg";
import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import portraitCardsImg from "@/assets/emilian-portrait-cards.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import magicDinnerImg from "@/assets/emilian-magic-dinner.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import staunenImg from "@/assets/staunen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageShowImg from "@/assets/stage-show.jpg";
import greatestTalentImg from "@/assets/greatest-talent-presse.jpg";
import talentsTeamImg from "@/assets/talents-of-magic-team.jpg";

const EPK_MAIL =
  "mailto:el@magicel.de?subject=EPK%20Anfrage%20Emilian%20Leber&body=Hallo%20Emilian%2C%20bitte%20schicken%20Sie%20mir%20das%20vollst%C3%A4ndige%20EPK%20%28Bio%2C%20Fotos%2C%20Logo%29.%20Danke%21";

/* ═══════════════════════════════════════════════════════════
   BEKANNT-AUS — TV / Awards / Bühnen-Wettbewerbe (5 Stationen)
   ═══════════════════════════════════════════════════════════ */
const STATIONS = [
  {
    year: "2025",
    Icon: Tv,
    name: "TVA Fernsehen",
    sub: "TV-Auftritt · Bayerisches Regional-TV",
    body: "TV-Interview mit 16 Jahren — zehn Jahre nach dem ersten Trick. Studio-Aufzeichnung, Live-Routine vor laufender Kamera, eingebauter Karten-Test mit dem Moderator. Vollständiger Mitschnitt auf YouTube und in der TVA-Mediathek.",
    accent: "spotlight",
  },
  {
    year: "2024",
    Icon: Award,
    name: "Talents of Magic",
    sub: "Finalist + Kreativpreis · Bundesweiter Wettbewerb",
    body: "Finalist beim renommierten Wettbewerb für junge Magier in Deutschland. Zusätzlich Kreativpreis für eine eigens konzipierte Routine mit Mentaleffekt und Comedy-Pointe — ausgezeichnet von einer Fach-Jury aus etablierten Bühnen-Magiern.",
  },
  {
    year: "2023",
    Icon: Trophy,
    name: "Greatest Talent",
    sub: "Finalist · TV-Wettbewerb",
    body: "Finalist beim TV-Wettbewerb Greatest Talent — Vor-Jury-Auswahl aus über 400 Bewerbungen, Live-Auftritt vor TV-Publikum. Anschluss-Buchungen bei Award-Shows und Galaabenden in den Folgemonaten.",
  },
  {
    year: "2024",
    Icon: Medal,
    name: "Deutsche Jugendmeisterschaft",
    sub: "Top 30 · Magischer Zirkel Deutschland",
    body: "Top-30-Platzierung bei der Deutschen Jugendmeisterschaft der Zauberkunst. Disziplin Mentalmagie — vorbereitete Routine vor Fach-Jury und Publikum aus etablierten Zauberkünstlern.",
  },
  {
    year: "Laufend",
    Icon: Star,
    name: "ProvenExpert · Google",
    sub: "5,0 ★ · 30+ Bewertungen",
    body: "Durchgehend 5,0 Sterne auf ProvenExpert und Google — über 30 verifizierte Bewertungen aus den letzten Jahren. Kunden-Spannbreite von privaten Hochzeiten bis zu DAX-Konzernen wie Versicherungskammer Bayern, STRABAG und Sixt.",
  },
];

const BekanntAusSection = () => {
  const spotlight = STATIONS[0];
  const rest = STATIONS.slice(1);
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-14">
          <Eyebrow>Bekannt aus</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            Fernsehen, Wettbewerbe{" "}
            <span style={{ color: COBALT }}>und 200+ Live-Bühnen</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Fünf Stationen, die euer Press-Briefing tragen: TV-Interview 2025,
            Talents of Magic Finalist plus Kreativpreis, Greatest-Talent-Finale,
            Deutsche Jugendmeisterschaft Top 30 — und 5,0 Sterne auf ProvenExpert
            über mehrere Jahre.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
          {/* SPOTLIGHT — TVA 2025 */}
          <motion.article
            variants={up}
            className="lg:col-span-7 relative overflow-hidden p-7 md:p-10 flex flex-col justify-between min-h-[420px] md:min-h-[460px]"
            style={{ borderRadius: "24px", background: COBALT, color: WHITE }}
          >
            <div
              aria-hidden
              className="absolute -top-20 -right-16 w-[360px] h-[360px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 62%)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-7">
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                  style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.24)" }}
                >
                  <spotlight.Icon className="w-5 h-5 text-white" />
                </span>
                <span className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80">
                  Aktuelle Station · {spotlight.year}
                </span>
              </div>
              <h3 className="font-extrabold tracking-[-0.02em] leading-[1.0] mb-4" style={{ fontSize: "clamp(1.9rem,3.4vw,3rem)" }}>
                {spotlight.name}.
              </h3>
              <p className="text-base md:text-lg mb-7" style={{ color: "rgba(255,255,255,0.78)" }}>
                {spotlight.sub}
              </p>
              <p className="text-sm md:text-base leading-[1.7] max-w-xl" style={{ color: "rgba(255,255,255,0.85)" }}>
                {spotlight.body}
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap gap-2">
              {["YouTube-Embed", "TVA-Mediathek", "Studio-Mitschnitt"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] tracking-[0.06em] uppercase font-semibold text-white/85"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>

          {/* RIGHT-COLUMN-Stack: 2 Stationen */}
          <div className="lg:col-span-5 grid gap-4 md:gap-5">
            {rest.slice(0, 2).map((s) => (
              <motion.article
                key={s.name}
                variants={up}
                className="relative p-7 md:p-8 transition-transform duration-500 hover:-translate-y-1"
                style={{ borderRadius: "24px", background: WHITE, border: `1px solid ${L_LINE}` }}
              >
                <div className="flex items-start justify-between gap-5 mb-5">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-[14px] shrink-0"
                    style={{ background: `${COBALT}14`, color: COBALT }}
                  >
                    <s.Icon className="w-5 h-5" />
                  </span>
                  <span className="text-xl leading-none mt-1 font-extrabold" style={{ color: COBALT }}>
                    {s.year}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight" style={{ color: INK }}>
                  {s.name}.
                </h3>
                <p className="text-[13px] mb-4" style={{ color: L_DIM }}>
                  {s.sub}
                </p>
                <p className="text-sm leading-[1.6]" style={{ color: L_DIM }}>
                  {s.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* BOTTOM-Row: 2 weitere Stationen */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
          {rest.slice(2).map((s) => (
            <motion.article
              key={s.name}
              variants={up}
              className="relative p-7 md:p-9 transition-transform duration-500 hover:-translate-y-1 grid grid-cols-[auto_1fr] gap-6 items-start"
              style={{ borderRadius: "24px", background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
            >
              <span
                className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] shrink-0"
                style={{ background: `${COBALT}14`, color: COBALT }}
              >
                <s.Icon className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-1.5">
                  <h3 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: INK }}>
                    {s.name}.
                  </h3>
                  <span className="text-lg leading-none font-extrabold" style={{ color: COBALT }}>
                    {s.year}
                  </span>
                </div>
                <p className="text-[13px] mb-4" style={{ color: L_DIM }}>
                  {s.sub}
                </p>
                <p className="text-sm leading-[1.6]" style={{ color: L_DIM }}>
                  {s.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PORTFOLIO-DOWNLOAD — direkter PDF-Download, Cobalt-Panel
   ═══════════════════════════════════════════════════════════ */
const PortfolioDownloadSection = () => {
  return (
    <section className="px-4 md:px-8 py-14 md:py-20" style={{ background: WHITE }}>
      <div
        className="max-w-[1364px] mx-auto rounded-[28px] md:rounded-[44px] overflow-hidden px-6 md:px-14 py-14 md:py-20 relative"
        style={{ background: INK, color: WHITE }}
      >
        <div
          aria-hidden
          className="absolute -top-32 right-0 w-[560px] h-[560px] rounded-full"
          style={{ background: `radial-gradient(circle, ${COBALT}40, transparent 62%)`, filter: "blur(20px)" }}
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="relative grid lg:grid-cols-12 gap-x-14 gap-y-10 items-center"
        >
          <motion.div variants={up} className="lg:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/55 mb-6">
              Portfolio · PDF
            </p>
            <h2
              className="font-extrabold tracking-[-0.02em] leading-[1.05] mb-7"
              style={{ fontSize: "clamp(1.9rem,3.6vw,2.9rem)", color: WHITE }}
            >
              Komplettes Künstler-Portfolio.{" "}
              <span style={{ color: "#9db0ff" }}>Direkt-Download.</span>
            </h2>
            <p className="text-base md:text-lg leading-[1.7] mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.78)" }}>
              Das vollständige Portfolio als PDF — Bühnenfotos, Show-Beschreibungen,
              Werdegang, Auszeichnungen, Referenzen und Tech-Rider in einem
              Dokument. 800 KB, druckfähig, freigegeben für Press- und
              Briefing-Nutzung. Kein Email-Versand nötig.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/portfolio/Emilian_Leber_Portfolio.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase transition-transform hover:scale-[1.02]"
                style={{ background: WHITE, color: INK }}
              >
                <Download className="w-4 h-4" />
                Portfolio öffnen (PDF)
              </a>
              <a
                href="/portfolio/Emilian_Leber_Portfolio.pdf"
                download="Emilian_Leber_Portfolio.pdf"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white border-b border-white/30 hover:border-white pb-1 transition-colors"
              >
                Direkt herunterladen
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-white/55 mt-7 max-w-md">
              Stand März 2026 · 802 KB · keine Anmeldung, keine Email-Schranke.
              Englische Version auf Anfrage.
            </p>
          </motion.div>

          {/* Mockup PDF-Cover */}
          <motion.div variants={up} className="lg:col-span-5">
            <a
              href="/portfolio/Emilian_Leber_Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[3/4] max-w-sm mx-auto overflow-hidden transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]"
              style={{
                borderRadius: "20px",
                background: "linear-gradient(155deg, #15171f 0%, #0A0B0F 100%)",
                boxShadow: "0 60px 120px -30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              {/* Brand-Header */}
              <div className="absolute inset-x-0 top-0 p-6 flex items-center justify-between text-white/80">
                <span className="text-[10px] tracking-[0.22em] uppercase font-bold">MagicEL</span>
                <span className="text-sm" style={{ color: "#9db0ff" }}>Portfolio 2026</span>
              </div>

              {/* Center title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <p className="text-[10px] tracking-[0.22em] uppercase font-bold mb-4" style={{ color: "#9db0ff" }}>
                  Zauberer · Mentalmagier · Comedy
                </p>
                <h3 className="font-extrabold text-3xl md:text-4xl text-white leading-[1.05] mb-3">
                  Emilian
                  <br />
                  <span style={{ color: "#9db0ff" }}>Leber.</span>
                </h3>
                <p className="text-sm text-white/65 max-w-[16ch] leading-snug">
                  Künstler-Portfolio · Bayern und deutschlandweit
                </p>
              </div>

              {/* Footer */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between text-white/55">
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold">PDF · 802 KB</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-bold text-white/80 group-hover:text-[#9db0ff] transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  Open
                </span>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRESSEMITTEILUNGEN — Magazin-Liste, vertikal mit Trennlinien
   ═══════════════════════════════════════════════════════════ */
type PressItem = {
  date: string;
  kicker: string;
  title: string;
  excerpt: string;
  tag: string;
  url?: string;
  pdf?: string;
};

const PMS: PressItem[] = [
  {
    date: "28. November 2024",
    kicker: "Fernsehen · TVA Bayern",
    title: "TV-Interview mit 16 Jahren auf TVA.",
    excerpt:
      "Studioaufzeichnung mit Live-Routine vor TV-Kamera, eingebauter Karten-Test mit dem Moderator, Mentaleffekt mit Studio-Publikum. Komplett-Mitschnitt in der TVA-Mediathek und auf YouTube. Zehn Jahre nach dem ersten Trick.",
    tag: "TV-Auftritt",
  },
  {
    date: "14. September 2024",
    kicker: "Wettbewerb · Kreativpreis",
    title: "Talents of Magic 2024 — Finalist und Kreativpreis.",
    excerpt:
      "Finalist beim renommierten Wettbewerb für junge Magier in Deutschland. Zusätzlich ausgezeichnet mit dem Kreativpreis für eine eigens konzipierte Routine — eine Verschmelzung aus Mentalmagie und Comedy-Storytelling, ausgezeichnet von einer Fach-Jury.",
    tag: "Auszeichnung",
  },
  {
    date: "03. Juni 2024",
    kicker: "Wettbewerb · Deutsche Jugendmeisterschaft",
    title: "Top 30 bei der Deutschen Jugendmeisterschaft der Zauberkunst.",
    excerpt:
      "Top-30-Platzierung beim wichtigsten Nachwuchs-Wettbewerb des Magischen Zirkels Deutschland. Disziplin Mentalmagie. Wertung vor Fach-Jury aus etablierten Bühnen-Magiern und Live-Publikum.",
    tag: "Wettbewerb",
  },
  {
    date: "21. September 2023",
    kicker: "Fernsehen · Greatest Talent",
    title: "Finalist bei Greatest Talent — aus 400+ Bewerbungen.",
    excerpt:
      "Auswahl-Vorrunde mit über 400 Bewerbungen, Aufnahme ins TV-Finale. Live-Auftritt vor TV-Studio-Publikum mit anschließenden Buchungen bei Award-Galas und Firmenfeiern in den Folgemonaten.",
    tag: "TV-Finalist",
  },
  {
    date: "Idowa Magazin",
    kicker: "Print + Online · Idowa Regensburg",
    title: "Aus Kindertraum wird Bühnenzauber.",
    excerpt:
      "Portrait-Artikel im Idowa-Magazin (Mittelbayerische / Regensburg): vom Kinderzimmer-Trick bis zur abendfüllenden Bühnenshow — ein Werdegang-Porträt mit Interview-Auszügen, Bühnenfotos und persönlicher Geschichte. Online weiterhin abrufbar.",
    tag: "Print-Portrait",
    url: "https://www.idowa.de/regionen/woerth-und-regensburg/regensburg/aus-kindertraum-wird-buehnenzauber-der-17-jaehrige-magier-emilian-leber-art-349796",
  },
];

const PressemitteilungenSection = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-14">
          <Eyebrow>Aktuelle Pressemitteilungen</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            Was zuletzt <span style={{ color: COBALT }}>lief</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Vier Pressemitteilungen aus den letzten drei Jahren — TV-Auftritte
            und Wettbewerbsergebnisse. Volltexte und Hi-Res-Begleitmaterial
            jeweils auf Anfrage als PDF.
          </p>
        </motion.div>

        <div className="max-w-5xl" style={{ borderTop: `1px solid ${L_LINE}` }}>
          {PMS.map((pm) => (
            <motion.article
              key={pm.title}
              variants={up}
              className="group grid md:grid-cols-[180px_1fr_auto] gap-x-8 gap-y-3 py-8 md:py-10 items-baseline"
              style={{ borderBottom: `1px solid ${L_LINE}` }}
            >
              <div>
                <span className="text-lg md:text-xl block leading-tight font-bold" style={{ color: COBALT }}>
                  {pm.date}
                </span>
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold mt-1.5 inline-block" style={{ color: L_DIM }}>
                  {pm.kicker}
                </span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold leading-snug mb-3" style={{ color: INK }}>
                  {pm.title}
                </h3>
                <p className="text-base leading-[1.65] max-w-2xl mb-4" style={{ color: L_DIM }}>
                  {pm.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {pm.url ? (
                    <a
                      href={pm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase border-b pb-0.5 transition-colors"
                      style={{ color: COBALT, borderColor: `${COBALT}55` }}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Artikel lesen (extern)
                    </a>
                  ) : (
                    <>
                      <a
                        href={EPK_MAIL}
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase border-b pb-0.5 transition-colors"
                        style={{ color: COBALT, borderColor: `${COBALT}55` }}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        PDF anfordern
                      </a>
                      <span aria-hidden style={{ color: L_DIM }}>·</span>
                      <a
                        href={EPK_MAIL}
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.08em] font-semibold uppercase border-b pb-0.5 transition-colors"
                        style={{ color: L_DIM, borderColor: L_LINE }}
                      >
                        Volltext lesen
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
              <div className="md:pl-4 md:text-right">
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold text-white whitespace-nowrap"
                  style={{ background: COBALT }}
                >
                  {pm.tag}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   EPK-DOWNLOAD — Mockup-Card mit Anhang-Liste
   ═══════════════════════════════════════════════════════════ */
const EPK_ATTACHMENTS = [
  { name: "Bio_kurz_50_woerter.txt", size: "0,4 KB" },
  { name: "Bio_mittel_100_woerter.txt", size: "0,9 KB" },
  { name: "Bio_lang_250_woerter.pdf", size: "62 KB" },
  { name: "Pressefotos_HighRes_300dpi.zip", size: "48 MB" },
  { name: "Logo_SVG_und_PNG.zip", size: "1,2 MB" },
  { name: "QA_Sheet_Interview_Standardfragen.pdf", size: "112 KB" },
  { name: "Tech-Rider_Bühne_und_TV.pdf", size: "94 KB" },
];

const EPKDownloadSection = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: PAPER, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-14">
          <Eyebrow>Pressekit · Electronic Press Kit</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            Ein EPK. <span style={{ color: COBALT }}>Alles drin</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Sieben Assets in einem ZIP — Bio in drei Längen, Hi-Res-Fotos
            freigegeben für Print und Online, Logo als SVG plus PNG, Q&A-Sheet
            mit Standardfragen und Tech-Rider.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — Mockup-Card */}
          <motion.div variants={up} className="lg:col-span-7 lg:sticky lg:top-24 self-start">
            <div
              className="relative p-7 md:p-9 overflow-hidden"
              style={{
                borderRadius: "24px",
                background: WHITE,
                border: `1px solid ${L_LINE}`,
                boxShadow: "0 40px 90px -34px rgba(10,11,15,0.25)",
              }}
            >
              {/* Header — Datei-Vorschau-Style */}
              <div className="flex items-center justify-between gap-4 pb-5 mb-6" style={{ borderBottom: `1px solid ${L_LINE}` }}>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
                    style={{ background: COBALT, color: WHITE }}
                  >
                    <Paperclip className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-base font-bold leading-tight" style={{ color: INK }}>
                      Emilian_Leber_EPK_2026.zip
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: L_DIM }}>
                      8 Dateien · 52 MB · Stand März 2026
                    </p>
                  </div>
                </div>
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.14em] uppercase font-bold whitespace-nowrap text-white"
                  style={{ background: COBALT }}
                >
                  v3 · aktuell
                </span>
              </div>

              {/* Anhang-Liste */}
              <ul className="space-y-2 mb-7">
                {EPK_ATTACHMENTS.map((a) => (
                  <li
                    key={a.name}
                    className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg transition-colors min-w-0 hover:bg-[#0A0B0F]/[0.03]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText className="w-4 h-4 shrink-0" style={{ color: COBALT }} />
                      <span className="text-xs md:text-sm truncate font-mono min-w-0" style={{ color: INK }}>
                        {a.name}
                      </span>
                    </div>
                    <span className="text-[10px] md:text-[11px] tabular-nums shrink-0" style={{ color: L_DIM }}>
                      {a.size}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer — Download-Status */}
              <div className="pt-5 flex items-center justify-between gap-4" style={{ borderTop: `1px solid ${L_LINE}` }}>
                <div className="flex items-center gap-2">
                  <span
                    className="relative w-2 h-2 rounded-full"
                    style={{ background: "#1f8f5f", boxShadow: "0 0 0 4px rgba(31,143,95,0.15)" }}
                  />
                  <span className="text-[11px] tracking-[0.14em] uppercase font-bold" style={{ color: L_DIM }}>
                    Freigegeben für redaktionelle Nutzung
                  </span>
                </div>
                <a
                  href={EPK_MAIL}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-transform hover:scale-[1.02]"
                  style={{ background: COBALT }}
                >
                  <Download className="w-3.5 h-3.5" />
                  ZIP anfordern
                </a>
              </div>

              <p className="text-xs mt-5 text-center" style={{ color: L_DIM }}>
                Bildnachweis: MagicEL / Emilian Leber. Keine Bearbeitung der
                Logo-Datei ohne Rücksprache.
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Was im EPK ist */}
          <motion.div variants={up} className="lg:col-span-5">
            <ol className="space-y-7">
              {[
                {
                  num: "01",
                  Icon: FileText,
                  label: "Boilerplate-Bio in 3 Längen",
                  body: "Copy-paste-fertige Kurz- (50 W.), Mittel- (100 W.) und Lang-Version (250 W.) — angepasst auf typische Press-Briefing-Anforderungen.",
                },
                {
                  num: "02",
                  Icon: ImageIcon,
                  label: "Hi-Res-Pressefotos 300 dpi",
                  body: "Acht freigegebene Fotos — Studio-Portraits, Bühne, Magic-Dinner, Karten-Routine, Publikum. Print-tauglich, mit Bildnachweis-Pflicht.",
                },
                {
                  num: "03",
                  Icon: Trophy,
                  label: "Logo als SVG und PNG",
                  body: "Vektor-Logo plus PNG in 3 Größen. Schwarz und Weiß-Version. Keine Modifikation ohne Rücksprache.",
                },
                {
                  num: "04",
                  Icon: Quote,
                  label: "Q&A-Sheet mit Standardfragen",
                  body: "12 vorbereitete Antworten auf typische Interview-Fragen — von Werdegang bis Lieblings-Routine. Spart Recherche-Zeit.",
                },
                {
                  num: "05",
                  Icon: Tv,
                  label: "Tech-Rider Bühne und TV",
                  body: "Was es vor Ort braucht — Mikrofon, Sound, Licht, Bühnenmaße. Plus TV-spezifischer Rider mit Kamera-Setup.",
                },
              ].map((v) => (
                <li
                  key={v.num}
                  className="grid grid-cols-[44px_1fr] md:grid-cols-[56px_1fr] gap-5 md:gap-6 items-start pb-6 last:border-b-0"
                  style={{ borderBottom: `1px solid ${L_LINE}` }}
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-3xl leading-none font-extrabold" style={{ color: COBALT }}>
                      {v.num}
                    </span>
                    <v.Icon className="w-4 h-4" style={{ color: COBALT, opacity: 0.5 }} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold leading-tight mb-2" style={{ color: INK }}>
                      {v.label}.
                    </h3>
                    <p className="text-sm leading-[1.65]" style={{ color: L_DIM }}>
                      {v.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRESSEFOTOS — asymmetrisches Bento mit Modal
   ═══════════════════════════════════════════════════════════ */
const PHOTOS = [
  {
    src: portraitBuchImg,
    label: "Studio-Portrait mit Buch",
    caption: "Studio · 2025 · vertikal",
    span: "md:col-span-4 md:row-span-2",
    h: "h-[420px] md:h-[640px]",
  },
  {
    src: magicDinnerImg,
    label: "Magic Dinner",
    caption: "Live · Magic Dinner",
    span: "md:col-span-4",
    h: "h-[300px] md:h-[310px]",
  },
  {
    src: portraitCardsImg,
    label: "Karten-Routine Close-Up",
    caption: "Studio · 2024",
    span: "md:col-span-4",
    h: "h-[300px] md:h-[310px]",
  },
  {
    src: buehneZuschauerImg,
    label: "Bühne mit Publikum",
    caption: "Alte Mälzerei · DPSG · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: staunenImg,
    label: "Staunen im Publikum",
    caption: "Live · Firmenfeier · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: greatestTalentImg,
    label: "Greatest Talent · TV-Studio",
    caption: "TV · 2023",
    span: "md:col-span-6",
    h: "h-[280px] md:h-[360px]",
  },
  {
    src: talentsTeamImg,
    label: "Talents of Magic 2024",
    caption: "Wettbewerb · Backstage",
    span: "md:col-span-6",
    h: "h-[280px] md:h-[360px]",
  },
  {
    src: portraitKartenImg,
    label: "Portrait mit Karten",
    caption: "Studio · 2025 · quer",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: audienceImg,
    label: "Audience Reactions",
    caption: "Live · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
  {
    src: portraitImg,
    label: "Studio-Portrait klassisch",
    caption: "Studio · 2024",
    span: "md:col-span-4",
    h: "h-[260px] md:h-[300px]",
  },
];

const PressefotosSection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  const active = activeIdx !== null ? PHOTOS[activeIdx] : null;

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      id="pressefotos"
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-14">
          <Eyebrow>Pressefotos · Hi-Res 300 dpi</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            Zehn Fotos. <span style={{ color: COBALT }}>Print-ready</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Studio, Bühne, Magic Dinner, TV-Studio — alle Motive freigegeben
            für redaktionelle Nutzung. Bildnachweis-Pflicht: MagicEL / Emilian
            Leber. Klick auf ein Foto öffnet die Hi-Res-Vorschau.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-3 md:gap-4">
          {PHOTOS.map((p, i) => (
            <motion.button
              key={i}
              variants={up}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`group relative overflow-hidden text-left ${p.span} ${p.h}`}
              style={{ borderRadius: "20px", boxShadow: "0 24px 50px -28px rgba(10,11,15,0.3)" }}
            >
              <img
                src={p.src}
                alt={`Pressefoto Emilian Leber — ${p.label}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ objectPosition: "top" }}
                loading="lazy"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.05) 30%, rgba(10,11,15,0.82) 100%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-white font-bold text-base md:text-lg leading-tight mb-1">{p.label}</p>
                <p className="text-white/70 text-[12px]">{p.caption}</p>
              </div>
              <span
                className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] tracking-[0.12em] uppercase font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(10,11,15,0.55)" }}
              >
                <Download className="w-3 h-3" />
                Hi-Res
              </span>
            </motion.button>
          ))}
        </div>

        <p className="text-sm mt-10 text-center max-w-2xl mx-auto" style={{ color: L_DIM }}>
          Für Print-Auflösung 300 dpi bitte direkt anfragen — Hi-Res-Versionen
          liegen separat als ZIP bereit (siehe EPK oben).
        </p>
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(8,6,12,0.92)" }}
          onClick={() => setActiveIdx(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIdx(null)}
            aria-label="Schließen"
            className="absolute top-4 right-4 md:top-6 md:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full text-white hover:bg-white/10 transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.22)" }}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={`Pressefoto Emilian Leber — ${active.label}`}
              className="w-full max-h-[78vh] object-contain rounded-2xl"
            />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-white">
              <div>
                <p className="text-lg md:text-xl font-bold">{active.label}</p>
                <p className="text-sm text-white/65 mt-1">
                  {active.caption} · Bildnachweis: MagicEL / Emilian Leber
                </p>
              </div>
              <a
                href={EPK_MAIL}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white transition-transform hover:scale-[1.02]"
                style={{ background: COBALT }}
              >
                <Download className="w-4 h-4" />
                Hi-Res anfragen
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   BOILERPLATE — 3 Längen mit Copy-Button
   ═══════════════════════════════════════════════════════════ */
const BIO_KURZ =
  "Emilian Leber ist Zauberkünstler und Comedy-Magier aus Bayern. Mit über 200 Live-Auftritten seit 2016, TV-Interview bei TVA und Greatest Talent sowie dem Kreativpreis bei Talents of Magic 2024 zählt er zu den profiliertesten jungen Magiern Deutschlands. 5,0 Sterne bei ProvenExpert.";

const BIO_MITTEL =
  "Emilian Leber (geb. 2008) ist Zauberkünstler, Mentalmagier und Comedy-Entertainer aus Bayern. Über 200 Live-Auftritte seit 2016 — vom privaten Magic Dinner über Galaabende bis zu Versicherungs-Konzern-Events mit 200 Gästen. 2023 Finalist bei Greatest Talent, 2024 Finalist und Kreativpreisträger bei Talents of Magic, 2024 Top 30 bei der Deutschen Jugendmeisterschaft, 2024 TV-Interview im Bayerischen Regional-TV (TVA). Hauspartner-Restaurant für die Magic-Dinner-Reihe: Wald & Wiese in Sinzing bei Regensburg. Abendfüllende Bühnenshow Plötzlich Magie — Magic Meets Comedy.";

const BIO_LANG =
  "Emilian Leber (geb. 2008) ist Zauberkünstler, Mentalmagier und Comedy-Entertainer aus Bayern. Erste Tricks mit acht Jahren am heimischen Wohnzimmertisch, erster bezahlter Auftritt mit zwölf, erste abendfüllende Show 2023 — kurz darauf das Finale bei Greatest Talent (TV-Wettbewerb mit über 400 Bewerbungen). 2024 folgte das Finale bei Talents of Magic mit zusätzlichem Kreativpreis für eine eigens konzipierte Routine aus Mentalmagie und Comedy-Storytelling. Im selben Jahr Top 30 bei der Deutschen Jugendmeisterschaft der Zauberkunst des Magischen Zirkels Deutschland. 2024 TV-Interview im Bayerischen Regional-TV (TVA) als 16-Jähriger, Karten-Test mit dem Moderator und Mentaleffekt mit dem Studio-Publikum. Seit 2016 über 200 Live-Auftritte — Spannbreite von privaten Hochzeiten und Magic-Dinner-Abenden im Hauspartner-Restaurant Wald & Wiese (Sinzing bei Regensburg) bis zu DAX-Konzern-Galas für Versicherungskammer Bayern, STRABAG, Sixt und Sparkasse. 5,0 Sterne auf ProvenExpert und Google über mehr als dreißig verifizierte Bewertungen. Mit Plötzlich Magie — Magic Meets Comedy steht eine abendfüllende Bühnenshow für Theater- und Saalbühnen im Programm. Bayern primär, deutschlandweit buchbar.";

const BIOS = [
  {
    laenge: "Kurz",
    woerter: "50 Wörter",
    desc: "Für Programmhefte, Anmoderationen, Social-Media-Captions.",
    text: BIO_KURZ,
  },
  {
    laenge: "Mittel",
    woerter: "100 Wörter",
    desc: "Für Tageszeitungs-Vorberichte, Event-Ankündigungen, Branchen-Newsletter.",
    text: BIO_MITTEL,
  },
  {
    laenge: "Lang",
    woerter: "250 Wörter",
    desc: "Für Feature-Artikel, Magazin-Portraits, ausführliche Press-Kits.",
    text: BIO_LANG,
  },
];

const BoilerplateSection = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = async (text: string, idx: number) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx(null), 2200);
    } catch {
      setCopiedIdx(idx);
      window.setTimeout(() => setCopiedIdx(null), 2200);
    }
  };

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-14">
          <Eyebrow>Boilerplate · drei Längen</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            50, 100, <span style={{ color: COBALT }}>250 Wörter</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Drei Bio-Versionen für drei Use-Cases — Programmheft, Vorbericht,
            Feature-Artikel. Copy-paste-fertig, keine Anpassungen nötig.
            Bildnachweis bitte: MagicEL / Emilian Leber.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5 md:gap-6">
          {BIOS.map((b, i) => (
            <motion.article
              key={b.laenge}
              variants={up}
              className="relative flex flex-col p-7 md:p-8 transition-transform duration-500 hover:-translate-y-1"
              style={{ borderRadius: "24px", background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <span className="text-2xl md:text-3xl leading-none font-extrabold" style={{ color: COBALT }}>
                  {b.laenge}
                </span>
                <span className="text-[10px] tracking-[0.16em] uppercase font-bold" style={{ color: L_DIM }}>
                  {b.woerter}
                </span>
              </div>
              <p className="text-[13px] mb-5" style={{ color: L_DIM }}>
                {b.desc}
              </p>

              <div
                className="relative p-5 mb-5 flex-1 overflow-hidden"
                style={{ borderRadius: "16px", background: PAPER, border: `1px solid ${L_LINE}` }}
              >
                <p className="text-[13px] md:text-sm leading-[1.7] font-mono" style={{ color: INK }}>
                  {b.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => copy(b.text, i)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-white w-full transition-transform hover:scale-[1.02]"
                style={{ background: copiedIdx === i ? "#1f8f5f" : COBALT }}
                aria-label={
                  copiedIdx === i
                    ? "In Zwischenablage kopiert"
                    : `${b.laenge}-Boilerplate kopieren`
                }
              >
                {copiedIdx === i ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Kopiert
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    In Zwischenablage
                  </>
                )}
              </button>
            </motion.article>
          ))}
        </div>

        <p className="text-sm mt-12 text-center max-w-2xl mx-auto" style={{ color: L_DIM }}>
          Alle Boilerplates auf Stand März 2026. Anpassungen oder Sonderversionen
          (englisch, fachspezifisch) gerne auf Anfrage.
        </p>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   ABENDFÜLLENDE SHOW — Plötzlich Magie Editorial-Split
   ═══════════════════════════════════════════════════════════ */
const PloetzlichMagieSection = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div variants={up} className="lg:col-span-6">
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white mb-6"
            style={{ background: COBALT }}
          >
            Abendfüllende Show
          </span>
          <Eyebrow>Bühnenprogramm im Portfolio</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em] mb-7"
            style={{ fontSize: "clamp(1.9rem,3.6vw,3rem)", lineHeight: 1.02, color: INK }}
          >
            Plötzlich <span style={{ color: COBALT }}>Magie</span>.
            <br />
            Magic Meets Comedy.
          </h2>
          <p className="text-base md:text-lg leading-[1.7] mb-5 max-w-xl" style={{ color: L_DIM }}>
            Neunzig Minuten Bühne — Mentalmagie, Karten-Routinen, Comedy-Storytelling.
            Geschrieben für Theater- und Saalbühnen, als Solo-Programm buchbar.
          </p>
          <p className="text-base md:text-lg leading-[1.7] mb-8 max-w-xl" style={{ color: L_DIM }}>
            Öffentliche Termine stehen derzeit keine an. Für Akkreditierung,
            Foto-Termine oder Interview-Slots zu einem geplanten Auftritt gerne
            direkt melden — ich sage vorab Bescheid, sobald etwas ansteht.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["90 Minuten", "Mentalmagie · Comedy", "Solo-Programm", "Theater- und Saalbühnen"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs"
                style={{ color: L_DIM, background: WHITE, border: `1px solid ${L_LINE}` }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:el@magicel.de?subject=Presseanfrage%20Plötzlich%20Magie"
              className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white transition-transform hover:scale-[1.02]"
              style={{ background: COBALT }}
            >
              Presseanfrage senden
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/tickets"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase pb-1 transition-colors border-b"
              style={{ color: INK, borderColor: L_LINE }}
            >
              Termine ansehen
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <motion.div variants={up} className="lg:col-span-6">
          <div className="relative overflow-hidden" style={{ borderRadius: "24px", boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
            <img
              src={magicDinnerImg}
              alt="Plötzlich Magie — abendfüllende Bühnenshow von Emilian Leber"
              className="w-full h-[480px] md:h-[600px] object-cover"
              style={{ objectPosition: "top" }}
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(10,11,15,0) 50%, rgba(10,11,15,0.7) 100%)" }}
            />
            <div
              className="absolute bottom-5 left-5 right-5 p-5 text-white"
              style={{
                background: "rgba(10,11,15,0.42)",
                backdropFilter: "blur(14px) saturate(1.3)",
                WebkitBackdropFilter: "blur(14px) saturate(1.3)",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5" style={{ color: "#9db0ff" }} />
                <span className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/85">
                  Spielstätten
                </span>
              </div>
              <p className="text-base md:text-lg font-bold leading-tight mb-1">
                Theater- und Saalbühnen
              </p>
              <p className="text-sm text-white/70">90 Minuten · Solo-Programm</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   INTERVIEW-ZITATE — Magazin-Liste mit großen Quotes
   ═══════════════════════════════════════════════════════════ */
const QUOTES = [
  {
    quote:
      "Die schönste Reaktion ist nicht der Applaus. Es sind die drei Sekunden Stille davor, in denen alle gleichzeitig die Luft anhalten.",
    context: "Über den Moment vor dem Applaus",
    source: "Interview · TVA · 2025",
  },
  {
    quote:
      "Comedy ist die Tür, durch die Magie ins Herz kommt. Wer lacht, lässt los — und wer loslässt, ist plötzlich offen für das Unmögliche.",
    context: "Über das Verhältnis von Comedy und Magie",
    source: "idowa-Portrait · August 2025",
  },
  {
    quote:
      "Ein guter Trick hat ein Geheimnis. Eine gute Routine hat eine Geschichte. Das eine kann man lernen — das andere muss man auf der Bühne entdecken.",
    context: "Über den Unterschied zwischen Trick und Routine",
    source: "Talents-of-Magic Pressetext 2024",
  },
  {
    quote:
      "Ich frage immer nach einer Anekdote vom Auftraggeber, bevor ich auf die Bühne gehe. Diese eine Geschichte ist der Unterschied zwischen Show und Erinnerung.",
    context: "Über die Vorbereitung auf einen Auftritt",
    source: "Greatest-Talent Backstage 2023",
  },
  {
    quote:
      "Magie funktioniert dann, wenn das Publikum spürt: hier steht jemand, der seine Arbeit ernst nimmt — aber sich selbst nicht zu ernst.",
    context: "Über professionelle Bühnenhaltung",
    source: "Eigenes Press-Statement 2026",
  },
];

const InterviewZitateSection = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-14">
          <Eyebrow>Interview-Zitate · zum Weiterverwenden</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            In <span style={{ color: COBALT }}>eigenen Worten</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Fünf O-Töne aus Interviews und Press-Statements — frei verwendbar
            mit Quellenangabe. Für Headline-Pull-Quotes, Bildunterzeilen,
            Vorbericht-Einleitungen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-14 max-w-6xl mx-auto">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={i}
              variants={up}
              className={`relative ${i === 4 ? "md:col-span-2 max-w-3xl mx-auto" : ""}`}
            >
              <Quote className="w-9 h-9 md:w-10 md:h-10 mb-5" style={{ color: COBALT, opacity: 0.4 }} />
              <blockquote
                className="font-extrabold tracking-[-0.01em] text-2xl md:text-3xl lg:text-[2.25rem] leading-[1.25] mb-6"
                style={{ color: INK }}
              >
                {q.quote}
              </blockquote>
              <figcaption>
                <p className="text-[11px] tracking-[0.16em] uppercase font-bold mb-1.5" style={{ color: COBALT }}>
                  {q.context}
                </p>
                <p className="text-sm" style={{ color: L_DIM }}>{q.source}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PULL-QUOTE — Ink Full-Bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden" style={{ background: INK, color: WHITE }}>
      <div className="absolute inset-0" style={{ opacity: 0.18 }}>
        <img src={stageShowImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,11,15,0.6) 0%, rgba(10,11,15,0.95) 70%)" }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full"
        style={{ background: `radial-gradient(circle, ${COBALT}33, transparent 65%)`, filter: "blur(20px)" }}
      />
      <motion.div
        variants={up}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="relative px-5 md:px-10"
      >
        <Quote className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto" style={{ color: "#9db0ff", opacity: 0.6 }} />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p
            className="font-extrabold tracking-[-0.02em] leading-[1.08]"
            style={{ fontSize: "clamp(1.9rem,3.5vw,3rem)" }}
          >
            Erstes TV-Interview <span style={{ color: "#9db0ff" }}>mit 16</span>.
            <br />
            Acht Jahre nach dem <span style={{ color: "#9db0ff" }}>ersten Trick</span>.
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span className="text-sm md:text-base text-white/65">TVA Bayern · 2025</span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   VIDEO-SECTION — TVA-Auftritt
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={vp}
      className="px-5 md:px-10 py-16 md:py-24"
      style={{ background: WHITE }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={up} className="max-w-3xl mb-10 md:mb-12">
          <Eyebrow>Video-Mitschnitt · TVA 2025</Eyebrow>
          <h2
            className="font-extrabold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}
          >
            TV-Auftritt <span style={{ color: COBALT }}>im Mitschnitt</span>.
          </h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
            Studio-Aufzeichnung bei TVA Bayern — Live-Routine vor der Kamera,
            eingebauter Karten-Test mit dem Moderator, Mentaleffekt mit
            Studio-Publikum. Voller Mitschnitt zum Einbetten freigegeben.
          </p>
        </motion.div>

        <motion.div
          variants={up}
          className="relative max-w-6xl mx-auto"
          style={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}
        >
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <iframe
              src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1`}
              title="TVA TV-Interview 2023 — Emilian Leber"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-sm" style={{ color: L_DIM }}>
          <span className="inline-flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5" style={{ color: COBALT }} />
            TVA Bayern
          </span>
          <span aria-hidden style={{ color: L_LINE }}>·</span>
          <span>November 2025</span>
          <span aria-hidden style={{ color: L_LINE }}>·</span>
          <span>Embed-Code auf Anfrage</span>
        </div>
      </div>
    </motion.section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PRESS-FAQ — presse-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Wie komme ich an die Hi-Res-Pressefotos?",
    a: "Pressefotos in 300 dpi liegen als ZIP bereit — direkt per Mail anfordern oder das vollständige EPK abrufen. Acht Motive freigegeben für redaktionelle Nutzung (Print und Online). Bildnachweis-Pflicht: MagicEL / Emilian Leber. Eilfälle bitte mit Hinweis im Betreff, Antwort innerhalb von vier Stunden werktags.",
  },
  {
    q: "Darf ich die Interview-Zitate frei zitieren?",
    a: "Alle Zitate aus dem Bereich Interview-Zitate sind frei zur Verwendung — bitte mit Quellenangabe (Medium/Anlass aus der jeweiligen Caption). Für individuelle O-Töne, abweichende Zuspitzungen oder Themen-spezifische Statements bin ich kurzfristig per Telefon oder Mail ansprechbar. Originalton-Audios auf Anfrage.",
  },
  {
    q: "Wie sind die Honorar-Bedingungen für TV- und Medienauftritte?",
    a: "Honorare für TV-Auftritte werden individuell verhandelt — abhängig von Format-Länge, Sendezeit-Slot, Verwertungsrechten und Vor-Ort-Anforderungen. Für redaktionelle Presse-Berichterstattung in Print/Online fallen keine Honorare an. Verbindliches Angebot binnen 24 Stunden nach Erstanfrage.",
  },
  {
    q: "Was sind die Bühnen-Anforderungen für TV-Aufzeichnungen?",
    a: "Mindestbühnenfläche zwei mal eineinhalb Meter, Headset-Mikrofon (XLR oder Funk), Frontspot oder ausgeleuchtete Bühne. Eigenes Headset-Mic Sennheiser EW-Serie und Mini-PA bis 80 Gäste bringe ich mit. TV-spezifischer Tech-Rider mit Kamera-Setup separat im EPK. Soundcheck und Vor-Probe 30 bis 60 Minuten vor Aufzeichnung.",
  },
  {
    q: "Gibt es eine englische Bio für internationale Press?",
    a: "Die deutschen Boilerplate-Versionen liegen in 50/100/250-Wörter-Längen vor. Englische und französische Übersetzungen auf Anfrage — Lieferzeit zwei Werktage, kostenfrei für redaktionelle Presse-Anwendungen.",
  },
  {
    q: "Wie schnell kommt eine Antwort?",
    a: "Werktags binnen 24 Stunden, Eilfälle (Redaktionsschluss heute, Live-Schalte morgen) deutlich schneller — bitte im Betreff markieren oder direkt anrufen. Wochenende und Feiertage ebenfalls per WhatsApp erreichbar bei dringenden Themen.",
  },
];

/* ═══════════════════════════════════════════════════════════
   PRESS-KONTAKT-DIREKT — dunkle Sektion mit Foto + Kontaktkanäle
   ═══════════════════════════════════════════════════════════ */
const PressKontaktDirektSection = () => {
  return (
    <section className="relative text-white py-24 md:py-36 overflow-hidden" style={{ background: INK }}>
      <div className="absolute inset-0">
        <img
          src={portraitBuchImg}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 25%" }}
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(110deg, rgba(10,11,15,0.96) 0%, rgba(10,11,15,0.85) 45%, rgba(10,11,15,0.6) 100%)" }}
        />
      </div>
      <div
        aria-hidden
        className="absolute -top-32 right-1/4 w-[520px] h-[520px] rounded-full"
        style={{ background: `radial-gradient(circle, ${COBALT}30, transparent 60%)`, filter: "blur(20px)" }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="relative px-5 md:px-10"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-x-14 gap-y-12 items-center">
          <motion.div variants={up} className="lg:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/55 mb-6">
              Direkter Press-Kontakt
            </p>
            <h2
              className="font-extrabold tracking-[-0.02em] mb-8"
              style={{ fontSize: "clamp(1.75rem,3.25vw,2.625rem)", lineHeight: 1.02, color: WHITE }}
            >
              Schreib mir <span style={{ color: "#9db0ff" }}>direkt</span>.
            </h2>
            <p className="text-base md:text-lg leading-[1.7] mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.78)" }}>
              Kein Agent, kein Booker, keine Press-Office-Hürde dazwischen.
              Werktags binnen 24 Stunden zurück — bei Eilfällen schneller.
              Standort Bayern, deutschlandweit buchbar, TV-erfahren.
            </p>

            <div className="space-y-4 max-w-xl">
              {[
                {
                  Icon: Mail,
                  label: "Email",
                  value: "el@magicel.de",
                  href: "mailto:el@magicel.de",
                  hint: "Standardweg · Antwort werktags binnen 24 h",
                },
                {
                  Icon: Phone,
                  label: "Telefon",
                  value: "+49 1556 3744696",
                  href: "tel:+4915563744696",
                  hint: "Mo–Fr 9–18 Uhr · Eilfälle direkt durchklingeln",
                },
                {
                  Icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+49 1556 3744696",
                  href: "https://wa.me/4915563744696",
                  hint: "Auch Wochenende für dringende Press-Themen",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-5 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(14px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(14px) saturate(1.3)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)" }}
                  >
                    <c.Icon className="w-5 h-5 text-white" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.18em] uppercase font-bold text-white/55 mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-lg md:text-xl font-bold text-white leading-tight">
                      {c.value}
                    </p>
                    <p className="text-sm text-white/55 mt-0.5">{c.hint}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-white/55 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: "#9db0ff" }} />
                24h Antwort werktags
              </span>
              <span aria-hidden className="text-white/25">·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: "#9db0ff" }} />
                Standort Bayern
              </span>
              <span aria-hidden className="text-white/25">·</span>
              <span>Deutschlandweit buchbar</span>
            </div>
          </motion.div>

          <motion.div variants={up} className="lg:col-span-5">
            <div
              className="p-7 md:p-9"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(18px) saturate(1.5)",
                WebkitBackdropFilter: "blur(18px) saturate(1.5)",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "24px",
              }}
            >
              <p className="text-base md:text-lg text-white/55 mb-3">
                Eine kurze Selbst-Vorstellung —
              </p>
              <p className="text-xl md:text-2xl font-bold text-white leading-snug mb-5">
                Mit acht Jahren der erste Trick. Mit zwölf der erste bezahlte
                Gig. Mit einundzwanzig der erste TV-Auftritt.
              </p>
              <p className="text-sm md:text-base text-white/70 leading-[1.7] mb-6">
                Über zweihundert Live-Auftritte, fünf TV-Stationen und
                Wettbewerbe, Hauspartner-Restaurant für die Magic-Dinner-Reihe
                in Sinzing. Dazu eine eigene abendfüllende Bühnenshow.
              </p>
              <div className="pt-5 grid grid-cols-3 gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                {[
                  { v: "200+", l: "Events" },
                  { v: "5,0", l: "Sterne" },
                  { v: "24h", l: "Antwort" },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-2xl font-extrabold text-white tabular-nums leading-none">{s.v}</p>
                    <p className="text-xs text-white/55 mt-1.5">{s.l}</p>
                  </div>
                ))}
              </div>

              <a
                href={EPK_MAIL}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[12px] tracking-[0.08em] font-semibold uppercase text-white w-full transition-transform hover:scale-[1.02]"
                style={{ background: COBALT }}
              >
                <Download className="w-3.5 h-3.5" />
                Komplettes EPK anfordern
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const PAGE_URL = "https://www.magicel.de/presse";

const Presse = () => (
  <VoltageShell
    title="Pressebereich — Pressekit, Fotos, Boilerplate | Emilian Leber Zauberer"
    description="Pressebereich Emilian Leber Zauberer: Pressekit-Download, Hi-Res-Pressefotos, Boilerplate in 3 Längen, aktuelle Pressemitteilungen. Bekannt aus TVA, Greatest Talent, Talents of Magic."
    path="/presse"
    noindex={false}
  >
    <Helmet>
      <meta
        name="keywords"
        content="Emilian Leber Presse, Zauberer Pressekit, EPK Magier, Pressefotos Zauberkünstler, Pressekontakt Magier Bayern, Pressemitteilung Magier, Boilerplate Zauberkünstler"
      />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Pressebereich — Pressekit, Fotos, Boilerplate | Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="EPK, Hi-Res-Fotos, Boilerplate in 3 Längen. Direkt-Kontakt mit 24h-Antwort."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Emilian Leber",
        alternateName: "Magic EL",
        jobTitle: "Zauberkünstler · Mentalmagier · Comedy-Entertainer",
        url: PAGE_URL,
        sameAs: [
          "https://www.magicel.de",
          "https://www.instagram.com/magicel.de",
        ],
        image: "https://www.magicel.de/og-image.jpg",
        email: "mailto:el@magicel.de",
        telephone: "+49 1556 3744696",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Bayern",
          addressCountry: "DE",
        },
        award: [
          "Kreativpreis Talents of Magic 2024",
          "Finalist Talents of Magic 2024",
          "Finalist Greatest Talent 2023",
          "Top 30 Deutsche Jugendmeisterschaft 2024",
        ],
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MagicEL · Emilian Leber",
        url: "https://www.magicel.de",
        logo: "https://www.magicel.de/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "press",
          email: "el@magicel.de",
          telephone: "+49 1556 3744696",
          areaServed: "DE",
          availableLanguage: ["de", "en"],
        },
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
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
            name: "Pressebereich",
            item: PAGE_URL,
          },
        ],
      })}</script>
    </Helmet>

    <SubHero
      eyebrow="Pressebereich"
      title={<>Pressebereich<span style={{ color: MAGENTA }}>.</span> Material <span style={{ color: COBALT }}>fertig geliefert</span>.</>}
      sub="Pressekit als ein PDF. Hi-Res-Pressefotos zum direkten Download. Boilerplate in drei Längen — 50, 100, 250 Wörter, copy-paste-fertig. Plus aktuelle Pressemitteilungen, Show-Infos und persönlicher Direkt-Kontakt mit 24-Stunden-Antwort."
      image={portraitBuchImg}
      imageAlt="Pressefoto Emilian Leber — Zauberer und Comedy-Magier aus Bayern"
      imgPos="top"
      badge="5 TV- und Award-Stationen · 8+ Hi-Res-Fotos · 24h Antwort"
      primary={{ label: "Pressekit anfordern", href: "/buchung" }}
      secondary={{ label: "Direkt zu den Fotos", href: "/presse#pressefotos" }}
    />

    <Stats
      items={[
        { v: "5", l: "TV- und Award-Stationen" },
        { v: "3", l: "Boilerplate-Längen" },
        { v: "8+", l: "Hi-Res-Pressefotos" },
        { v: "24h", l: "Antwort werktags" },
      ]}
    />

    <BekanntAusSection />
    <PortfolioDownloadSection />
    <PressemitteilungenSection />
    <EPKDownloadSection />
    <PressefotosSection />
    <BoilerplateSection />
    <PloetzlichMagieSection />
    <InterviewZitateSection />
    <PullQuoteSection />
    <VideoSection />

    <ReviewsBlock />

    <FAQ
      eyebrow="Häufige Press-Fragen"
      title="Was Redaktionen vorab fragen."
      items={FAQS}
    />

    <PressKontaktDirektSection />

    <FinalCTA
      title={<>Pressekit anfordern — in 24 Stunden zurück<span style={{ color: MAGENTA }}>.</span></>}
      sub="Bio, Fotos, Logo und Show-Infos als ein Paket. Kurze Mail genügt, ich melde mich werktags binnen 24 Stunden — bei Eilfällen schneller."
    />
  </VoltageShell>
);

export default Presse;
