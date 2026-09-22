/**
 * /presse — Pressebereich (Voltage-Layout, live).
 *
 * Zielgruppe: Redaktionen und Veranstalter, die schnell Material brauchen.
 * Aufbau (22.09.2026 entschlackt, vorher ~15 Sektionen): Hero → Bekannt aus →
 * Material (Portfolio-PDF + Pressefotos) → Meldungen → Bio kurz/mittel/lang →
 * Press-FAQ → Pressekontakt. Bewertungen, Verkaufs-Zitate und die
 * abendfüllende Show (keine öffentlichen Termine) gehören nicht hierher.
 */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, SectionHeader, FAQ } from "@/components/voltage/sections";
import {
  INK, WHITE, PAPER, COBALT, MAGENTA, L_LINE, L_DIM, CARD_LIGHT,
  EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_DISPLAY, WHATSAPP,
  up, stagger, vp,
} from "@/components/voltage/theme";
import { TVA_VIDEO_ID } from "@/lib/videos";
import { ArrowUpRight, Trophy, Award, Medal, Tv, FileText, Download, Mail, Phone, MessageCircle, Copy, Check } from "lucide-react";

import portraitImg from "@/assets/magician-portrait.jpg";
import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import portraitCardsImg from "@/assets/emilian-portrait-cards.jpg";
import portraitKartenImg from "@/assets/portrait-karten.jpg";
import magicDinnerImg from "@/assets/emilian-magic-dinner.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import staunenImg from "@/assets/staunen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import greatestTalentImg from "@/assets/greatest-talent-presse.jpg";
import talentsTeamImg from "@/assets/talents-of-magic-team.jpg";

const PAGE_URL = "https://www.magicel.de/presse";
const PORTFOLIO_PDF = "/portfolio/Emilian_Leber_Portfolio.pdf";
const EPK_MAIL =
  "mailto:el@magicel.de?subject=EPK%20Anfrage%20Emilian%20Leber&body=Hallo%20Emilian%2C%20bitte%20schicken%20Sie%20mir%20das%20vollst%C3%A4ndige%20EPK%20%28Bio%2C%20Fotos%2C%20Logo%29.%20Danke%21";
const CREDIT = "Bildnachweis: MagicEL / Emilian Leber";

/* ── Bekannt aus: TV & Wettbewerbe ── */
const STATIONS = [
  { year: "2025", Icon: Tv, name: "TVA Fernsehen", sub: "TV-Interview · Bayerisches Regional-TV", body: "TV-Interview mit 16 Jahren: Studio-Aufzeichnung mit Live-Routine und Karten-Test mit dem Moderator.", link: { label: "Mitschnitt auf YouTube", href: `https://www.youtube.com/watch?v=${TVA_VIDEO_ID}` } },
  { year: "2024", Icon: Award, name: "Talents of Magic", sub: "Finalist + Kreativpreis", body: "Finalist beim Wettbewerb für junge Magier in Deutschland, dazu der Kreativpreis der Fach-Jury für eine eigene Routine aus Mentalmagie und Comedy." },
  { year: "2024", Icon: Medal, name: "Deutsche Jugendmeisterschaft", sub: "Top 30 · Magischer Zirkel Deutschland", body: "Top-30-Platzierung bei der Deutschen Jugendmeisterschaft der Zauberkunst, Disziplin Mentalmagie." },
  { year: "2023", Icon: Trophy, name: "Greatest Talent", sub: "Finalist · TV-Wettbewerb", body: "Aus über 400 Bewerbungen ins TV-Finale — Live-Auftritt vor Studio-Publikum." },
];

/* ── Pressefotos (Web-Auflösung direkt, 300 dpi auf Anfrage) ── */
const PHOTOS = [
  { src: portraitBuchImg, label: "Studio-Portrait mit Buch" },
  { src: portraitKartenImg, label: "Portrait mit Karten" },
  { src: portraitImg, label: "Studio-Portrait klassisch" },
  { src: portraitCardsImg, label: "Karten-Routine Close-Up" },
  { src: magicDinnerImg, label: "Magic Dinner" },
  { src: buehneZuschauerImg, label: "Bühne mit Publikum" },
  { src: staunenImg, label: "Staunen im Publikum" },
  { src: audienceImg, label: "Publikumsreaktionen" },
  { src: greatestTalentImg, label: "Greatest Talent · TV-Studio" },
  { src: talentsTeamImg, label: "Talents of Magic 2024" },
];

/* ── Meldungen & Berichte ── */
const MELDUNGEN: { date: string; kicker: string; title: string; excerpt: string; url?: string }[] = [
  { date: "2025", kicker: "Fernsehen · TVA Bayern", title: "TV-Interview mit 16 Jahren auf TVA.", excerpt: "Studioaufzeichnung mit Live-Routine vor der Kamera, Karten-Test mit dem Moderator und Mentaleffekt mit dem Studio-Publikum. Mitschnitt auf YouTube." },
  { date: "September 2024", kicker: "Wettbewerb · Kreativpreis", title: "Talents of Magic 2024 — Finalist und Kreativpreis.", excerpt: "Finalist beim Wettbewerb für junge Magier in Deutschland, zusätzlich ausgezeichnet mit dem Kreativpreis für eine Routine aus Mentalmagie und Comedy-Storytelling." },
  { date: "Juni 2024", kicker: "Wettbewerb · Deutsche Jugendmeisterschaft", title: "Top 30 bei der Deutschen Jugendmeisterschaft der Zauberkunst.", excerpt: "Top-30-Platzierung beim Nachwuchs-Wettbewerb des Magischen Zirkels Deutschland, Disziplin Mentalmagie — gewertet von einer Fach-Jury." },
  { date: "September 2023", kicker: "Fernsehen · Greatest Talent", title: "Finalist bei Greatest Talent — aus 400+ Bewerbungen.", excerpt: "Auswahl-Vorrunde mit über 400 Bewerbungen, Aufnahme ins TV-Finale und Live-Auftritt vor Studio-Publikum." },
  { date: "idowa", kicker: "Print + Online · idowa Regensburg", title: "Aus Kindertraum wird Bühnenzauber.", excerpt: "Porträt-Artikel: vom Kinderzimmer-Trick bis zur Bühnenshow — Werdegang mit Interview-Auszügen und Bühnenfotos.", url: "https://www.idowa.de/regionen/woerth-und-regensburg/regensburg/aus-kindertraum-wird-buehnenzauber-der-17-jaehrige-magier-emilian-leber-art-349796" },
];

/* ── Bio in drei Längen ── */
const BIOS = [
  { laenge: "Kurz", desc: "Programmheft, Anmoderation, Social Media", text: "Emilian Leber ist Zauberkünstler und Comedy-Magier aus Regensburg. Mit über 200 Live-Auftritten seit 2016, einem TV-Interview bei TVA, dem Finale bei Greatest Talent und dem Kreativpreis bei Talents of Magic 2024 zählt er zu den profiliertesten jungen Magiern Deutschlands. 5,0 Sterne bei ProvenExpert." },
  { laenge: "Mittel", desc: "Vorbericht, Event-Ankündigung", text: "Emilian Leber (geb. 2008) ist Zauberkünstler, Mentalmagier und Comedy-Entertainer aus Regensburg. Über 200 Live-Auftritte seit 2016 — vom privaten Magic Dinner über Galaabende bis zu Konzern-Events mit 200 Gästen. 2023 Finalist bei Greatest Talent, 2024 Finalist und Kreativpreisträger bei Talents of Magic, 2024 Top 30 bei der Deutschen Jugendmeisterschaft, 2025 TV-Interview im Bayerischen Regional-TV (TVA). Hauspartner-Restaurant für die Magic-Dinner-Reihe: Wald & Wiese in Sinzing bei Regensburg." },
  { laenge: "Lang", desc: "Feature, Magazin-Porträt", text: "Emilian Leber (geb. 2008) ist Zauberkünstler, Mentalmagier und Comedy-Entertainer aus Regensburg. Erste Tricks mit acht Jahren am heimischen Wohnzimmertisch, erster bezahlter Auftritt mit zwölf, erste abendfüllende Show 2023 — kurz darauf das Finale bei Greatest Talent (TV-Wettbewerb mit über 400 Bewerbungen). 2024 folgte das Finale bei Talents of Magic mit zusätzlichem Kreativpreis für eine eigens konzipierte Routine aus Mentalmagie und Comedy-Storytelling. Im selben Jahr Top 30 bei der Deutschen Jugendmeisterschaft der Zauberkunst des Magischen Zirkels Deutschland. 2025 TV-Interview im Bayerischen Regional-TV (TVA) als 16-Jähriger, mit Karten-Test mit dem Moderator und Mentaleffekt mit dem Studio-Publikum. Seit 2016 über 200 Live-Auftritte — von privaten Hochzeiten und Magic-Dinner-Abenden im Hauspartner-Restaurant Wald & Wiese (Sinzing bei Regensburg) bis zu Konzern-Galas für Versicherungskammer Bayern, STRABAG, Sixt und Sparkasse. 5,0 Sterne auf ProvenExpert und Google über mehr als dreißig verifizierte Bewertungen. Zuhause in Regensburg, unterwegs in ganz Bayern." },
];

const FAQS = [
  { q: "Wie komme ich an die Pressefotos in Druckqualität?", a: "Die Fotos oben sind direkt als Web-Version herunterladbar. Versionen in 300 dpi, Logo und Tech-Rider schicke ich per Mail — kurze Anfrage genügt. Alle Motive sind für redaktionelle Nutzung (Print und Online) freigegeben, Bildnachweis: MagicEL / Emilian Leber." },
  { q: "Wie sind die Honorar-Bedingungen für TV- und Medienauftritte?", a: "Honorare für TV-Auftritte werden individuell verhandelt — abhängig von Format-Länge, Sendezeit, Verwertungsrechten und Vor-Ort-Anforderungen. Für redaktionelle Berichterstattung in Print und Online fallen keine Honorare an." },
  { q: "Was braucht es für eine TV-Aufzeichnung vor Ort?", a: "Mindestbühnenfläche zwei mal eineinhalb Meter, Headset-Mikrofon (XLR oder Funk), Frontspot oder ausgeleuchtete Bühne. Eigenes Headset-Mikrofon und Mini-PA bis 80 Gäste bringe ich mit. Tech-Rider auf Anfrage. Soundcheck 30 bis 60 Minuten vor Aufzeichnung." },
  { q: "Gibt es eine englische Bio?", a: "Die Bio liegt auf Deutsch in drei Längen vor. Eine englische Version gibt es auf Anfrage." },
];

const h3 = "text-xl md:text-2xl font-bold leading-tight";

function BioTabs() {
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const bio = BIOS[idx];
  const copy = async () => {
    try { await navigator.clipboard.writeText(bio.text); } catch { /* Clipboard nicht verfügbar — Text bleibt markierbar */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div variants={up} className="mt-10 rounded-[24px] p-6 md:p-8" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div role="tablist" aria-label="Bio-Länge" className="inline-flex rounded-full p-1" style={{ background: PAPER, border: `1px solid ${L_LINE}` }}>
          {BIOS.map((b, i) => (
            <button key={b.laenge} role="tab" aria-selected={i === idx} type="button" onClick={() => { setIdx(i); setCopied(false); }}
              className="rounded-full px-5 py-2 text-[14px] font-semibold transition-colors"
              style={i === idx ? { background: COBALT, color: WHITE } : { color: INK }}>
              {b.laenge}
            </button>
          ))}
        </div>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold"
          style={{ background: copied ? "#1f8f5f" : INK, color: WHITE }}>
          {copied ? <><Check className="w-4 h-4" /> Kopiert</> : <><Copy className="w-4 h-4" /> Text kopieren</>}
        </button>
      </div>
      <p className="text-[13px] mb-3" style={{ color: L_DIM }}>Für: {bio.desc}</p>
      <p role="tabpanel" className="text-[15.5px] leading-[1.75]" style={{ color: INK }}>{bio.text}</p>
    </motion.div>
  );
}

const Presse = () => (
  <VoltageShell
    title="Pressebereich — Pressekit, Fotos, Bio | Emilian Leber Zauberer"
    description="Pressebereich Emilian Leber: Portfolio-PDF, Pressefotos, Bio in drei Längen und aktuelle Meldungen. Bekannt aus TVA, Greatest Talent und Talents of Magic. Pressekontakt mit 24h-Antwort."
    path="/presse"
    noindex={false}
  >
    <Helmet>
      <meta name="keywords" content="Emilian Leber Presse, Zauberer Pressekit, EPK Magier, Pressefotos Zauberkünstler, Pressekontakt Magier Bayern, Pressemitteilung Magier" />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Emilian Leber",
        alternateName: "Magic EL",
        jobTitle: "Zauberkünstler · Mentalmagier · Comedy-Entertainer",
        url: PAGE_URL,
        sameAs: ["https://www.magicel.de", "https://www.instagram.com/magicel.de"],
        image: "https://www.magicel.de/og-image.jpg",
        email: "mailto:el@magicel.de",
        telephone: "+49 1556 3744696",
        address: { "@type": "PostalAddress", addressLocality: "Regensburg", addressRegion: "Bayern", addressCountry: "DE" },
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
          { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.magicel.de/" },
          { "@type": "ListItem", position: 2, name: "Pressebereich", item: PAGE_URL },
        ],
      })}</script>
    </Helmet>

    <SubHero
      eyebrow="Pressebereich"
      title={<>Presse<span style={{ color: MAGENTA }}>.</span> <span style={{ color: COBALT }}>Alles an einem Ort</span>.</>}
      sub="Emilian Leber — Zauberer und Comedy-Magier aus Regensburg, TV-Finalist, über 200 Live-Auftritte seit 2016. Hier liegen Portfolio, Pressefotos, Bio und Kontakt für Redaktionen und Veranstalter."
      image={portraitBuchImg}
      imageAlt="Pressefoto Emilian Leber — Zauberer und Comedy-Magier aus Regensburg"
      imgPos="top"
      primary={{ label: "Zum Pressematerial", href: "/presse#material" }}
    />

    {/* ── Bekannt aus ── */}
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Bekannt aus" title={<>Fernsehen und <span style={{ color: COBALT }}>Wettbewerbe</span>.</>} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {STATIONS.map((s) => (
            <motion.article key={s.name} variants={up} className="rounded-[22px] p-7 flex flex-col" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-[14px] flex items-center justify-center" style={{ background: `${COBALT}14`, color: COBALT }}><s.Icon className="w-5 h-5" /></span>
                <span className="text-lg font-extrabold" style={{ color: COBALT }}>{s.year}</span>
              </div>
              <h3 className={h3} style={{ color: INK }}>{s.name}</h3>
              <p className="text-[13px] mt-1 mb-3" style={{ color: L_DIM }}>{s.sub}</p>
              <p className="text-[14.5px] leading-[1.6] flex-1" style={{ color: L_DIM }}>{s.body}</p>
              {s.link && (
                <a href={s.link.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: COBALT }}>
                  {s.link.label} <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>

    {/* ── Material: Portfolio + Fotos ── */}
    <motion.section id="material" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <SectionHeader eyebrow="Pressematerial" title={<>Portfolio und Fotos — <span style={{ color: COBALT }}>ohne Anmeldung</span>.</>} sub={`Alle Motive sind für redaktionelle Nutzung freigegeben. ${CREDIT}.`} />

        <motion.div variants={up} className="mt-10 rounded-[24px] p-7 md:p-9 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center" style={{ background: INK, color: WHITE }}>
          <span className="w-14 h-14 rounded-[16px] flex items-center justify-center" style={{ background: COBALT }}><FileText className="w-6 h-6" /></span>
          <div>
            <h3 className={h3}>Künstler-Portfolio (PDF)</h3>
            <p className="mt-2 text-[14.5px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.75)" }}>
              Bühnenfotos, Show-Beschreibungen, Werdegang, Auszeichnungen, Referenzen und Tech-Rider in einem Dokument. Rund 800 KB, druckfähig.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            <a href={PORTFOLIO_PDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold" style={{ background: WHITE, color: INK }}>
              <ArrowUpRight className="w-4 h-4" /> Öffnen
            </a>
            <a href={PORTFOLIO_PDF} download="Emilian_Leber_Portfolio.pdf" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold" style={{ border: "1px solid rgba(255,255,255,0.3)", color: WHITE }}>
              <Download className="w-4 h-4" /> Herunterladen
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mt-6">
          {PHOTOS.map((p) => (
            <motion.a key={p.label} variants={up} href={p.src} download target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-[18px] aspect-[4/5]" style={{ background: CARD_LIGHT, border: `1px solid ${L_LINE}` }}>
              <img src={p.src} alt={`Pressefoto Emilian Leber — ${p.label}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" style={{ objectPosition: "top" }} loading="lazy" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(10,11,15,0.8) 100%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-end justify-between gap-2">
                <p className="text-white text-[13px] font-semibold leading-tight">{p.label}</p>
                <Download className="w-4 h-4 shrink-0 text-white/80" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p variants={up} className="mt-6 text-[14.5px]" style={{ color: L_DIM }}>
          Druckversionen in 300 dpi, Logo und Tech-Rider:{" "}
          <a href={EPK_MAIL} className="font-semibold underline" style={{ color: COBALT }}>per Mail anfordern</a>.
        </motion.p>
      </div>
    </motion.section>

    {/* ── Meldungen ── */}
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Meldungen & Berichte" title={<>Was zuletzt <span style={{ color: COBALT }}>lief</span>.</>} sub="TV-Auftritte, Wettbewerbsergebnisse und Berichterstattung. Volltexte gerne auf Anfrage." />
        <div className="mt-10" style={{ borderTop: `1px solid ${L_LINE}` }}>
          {MELDUNGEN.map((m) => (
            <motion.article key={m.title} variants={up} className="grid md:grid-cols-[180px_1fr] gap-x-8 gap-y-2 py-7" style={{ borderBottom: `1px solid ${L_LINE}` }}>
              <div>
                <p className="text-lg font-bold" style={{ color: COBALT }}>{m.date}</p>
                <p className="text-[11px] tracking-[0.14em] uppercase font-bold mt-1" style={{ color: L_DIM }}>{m.kicker}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold leading-snug" style={{ color: INK }}>{m.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.65]" style={{ color: L_DIM }}>{m.excerpt}</p>
                <a href={m.url ?? EPK_MAIL} {...(m.url ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: COBALT }}>
                  {m.url ? "Artikel lesen (extern)" : "Volltext anfordern"} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>

    {/* ── Bio ── */}
    <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Bio · zum Übernehmen" title={<>Kurz, mittel, <span style={{ color: COBALT }}>lang</span>.</>} sub="Drei Fassungen, frei verwendbar. Stand 2026." />
        <BioTabs />
      </div>
    </motion.section>

    <FAQ eyebrow="Häufige Presse-Fragen" title="Was Redaktionen vorab fragen." items={FAQS} />

    {/* ── Pressekontakt ── */}
    <motion.section id="pressekontakt" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto rounded-[26px] px-6 md:px-14 py-14 md:py-20" style={{ background: COBALT, color: WHITE }}>
        <motion.div variants={up} className="max-w-2xl">
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02 }}>Pressekontakt<span style={{ color: MAGENTA }}>.</span></h2>
          <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: "rgba(255,255,255,0.88)" }}>
            Kein Agent, kein Booker dazwischen. Werktags Antwort binnen 24 Stunden — bei Eilfällen bitte im Betreff markieren oder direkt anrufen.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[
            { Icon: Mail, label: "E-Mail", value: EMAIL, href: EMAIL_HREF },
            { Icon: Phone, label: "Telefon", value: PHONE_DISPLAY, href: PHONE_HREF },
            { Icon: MessageCircle, label: "WhatsApp", value: PHONE_DISPLAY, href: WHATSAPP },
          ].map((c) => (
            <motion.a key={c.label} variants={up} href={c.href} className="flex items-center gap-4 rounded-[18px] p-5" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)" }}>
              <c.Icon className="w-5 h-5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] tracking-[0.16em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.7)" }}>{c.label}</p>
                <p className="text-[16px] font-bold truncate">{c.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  </VoltageShell>
);

export default Presse;
