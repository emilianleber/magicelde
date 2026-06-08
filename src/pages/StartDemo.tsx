/**
 * START-DEMO — Konzept-Relaunch (Demo). NICHT live. Route: /demo · noindex.
 *
 * Ziel: wirkt wie ENTERTAINER-DIENSTLEISTUNG (warm, menschlich, Erlebnis) —
 * NICHT wie Software. Daher: foto-/erlebnis-getrieben, keine Mono-Coords/
 * Index-Codes/Formular-Mockups/Tech-Grids. Hell, Stripe/Anyfin-Klarheit, aber warm.
 * Palette: Cobalt #1D3FFF (Akzent) + Magenta #FF2D7A (Punktuation), Ink/Paper/White.
 * Outfit (Display/UI). Framer Motion + Lenis. Mobile-first inkl. Mobile-Menü.
 */
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight, ArrowUpRight, Play, Phone, Mail, MapPin, ChevronDown, Star,
  Wand2, Hand, UtensilsCrossed, Mic2, Smile, Menu, X, Instagram, Youtube, Linkedin, Facebook, Award, Clock, Layers, ChevronLeft, ChevronRight, Check, CalendarCheck,
} from "lucide-react";
import { TVA_VIDEO_ID } from "@/lib/videos";
import VoltageHeader from "@/components/voltage/VoltageHeader";
import VoltageFooter from "@/components/voltage/VoltageFooter";
import Chatbot from "@/components/landing/Chatbot";

import siteLogo from "@/assets/logo-clean.webp";
import portraitImg from "@/assets/magician-portrait.jpg";
import stageImg from "@/assets/staunen.jpg";
import closeupImg from "@/assets/hero-closeup.jpg";
import dinnerImg from "@/assets/emilian-magic-dinner.jpg";
import dinnerBookImg from "@/assets/hero-stage.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import magicdinnerBuehneImg from "@/assets/magicdinner-buehne.jpg";
import greatestTalentImg from "@/assets/moderator-hero.jpg";
import birthdayImg from "@/assets/hero-birthday.jpg";
import schneiderImg from "@/assets/schneider-weisse-closeup.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import heroDinnerImg from "@/assets/hero-dinner.jpg";

const INK = "#0A0B0F", PAPER = "#F4F6F9", WHITE = "#FFFFFF";
const COBALT = "#1D3FFF", MAGENTA = "#FF2D7A", GSTAR = "#FBBC04";
const L_LINE = "rgba(10,11,15,0.10)", D_LINE = "rgba(255,255,255,0.14)";
const L_DIM = "#5f5a54", D_DIM = "#a7a2b0";
const SANS = "'Outfit', system-ui, -apple-system, sans-serif";

const PHONE = "tel:+4915563744696";
const WHATSAPP = "https://wa.me/4915563744696";
const NAV = [{ t: "Shows", h: "#shows" }, { t: "Warum Emilian", h: "#warum" }, { t: "Anlässe", h: "#anlaesse" }, { t: "Referenzen", h: "#reviews" }, { t: "Über", h: "#ueber" }, { t: "Kontakt", h: "#kontakt" }];
const GRUENDE = [
  { Icon: Smile, t: "Staunen UND lachen", d: "Comedy ist kein Beiwerk — Magie und Humor gehören bei mir untrennbar zusammen." },
  { Icon: Wand2, t: "Maßgeschneidert", d: "Programm, Tonalität und Ablauf passen sich eurem Anlass an — nicht umgekehrt." },
  { Icon: Award, t: "200+ Events Routine", d: "Seit 2016 auf Bühnen — von der Hochzeit bis zum Vorstands-Dinner. Kein Risiko." },
  { Icon: Star, t: "5,0★ top bewertet", d: "30+ Google-Bewertungen. Was Gäste erleben, lest ihr in den Stimmen." },
  { Icon: Clock, t: "Antwort in 24 Stunden", d: "Unkomplizierte Buchung, verbindliche Zusagen, null Stress in der Planung." },
  { Icon: Layers, t: "Für jeden Rahmen", d: "Close-Up, Bühne oder Magic Dinner — einzeln oder kombiniert, passend zur Location." },
];
const ALL_LOGOS = ["vkb.png","strabag.png","xxxlutz.png","sixt.png","sparkasse.png","heim-haus.png","schneider-weisse.png","wald-wiese.png","stadt-regensburg.png","oktoberfest.png","turmtheater.png","steinhofer.png"];
const SHOWS_MENU = [
  { t: "Bühnenshow", d: "Comedy + Mentalmagie für den ganzen Saal", Icon: Wand2, h: "/buehnenshow" },
  { t: "Close-Up", d: "Magie direkt in den Händen der Gäste", Icon: Hand, h: "/close-up" },
  { t: "Magic Dinner", d: "Durchkomponiert über den ganzen Abend", Icon: UtensilsCrossed, h: "/magic-dinner" },
  { t: "Moderation", d: "Roter Faden für Gala & Event", Icon: Mic2, h: "/moderation" },
  { t: "Comedy", d: "Pointen, die hängenbleiben", Icon: Smile, h: "/comedy-zauberei" },
];
const SHOWS_NAV = SHOWS_MENU.map((s) => s.t);
const STAEDTE = ["Regensburg", "München", "Nürnberg", "Ingolstadt", "Landshut", "Passau", "Augsburg", "Würzburg"];
const FORMATE = [
  { img: stageImg, title: "Bühnenshow", text: "Comedy, Mentalmagie und große Momente — die Show, bei der der ganze Saal mitgeht.", pos: "center" },
  { img: closeupImg, title: "Close-Up", text: "Magie in den Händen eurer Gäste. Hautnah, interaktiv, zum Mitreden am nächsten Tag.", pos: "center" },
  { img: dinnerBookImg, title: "Magic Dinner", text: "Walk-Around, Tisch-zu-Tisch und Bühnen-Finale — durchkomponiert zwischen den Gängen.", pos: "center" },
];
const ANLAESSE = [
  { t: "Hochzeit", d: "Der Moment zwischen Trauung und Party — Magie, die Gänsehaut macht.", img: weddingImg, cls: "md:col-span-2 md:row-span-2", big: true },
  { t: "Firmenfeier", d: "Eisbrecher für gemischte Teams — ohne Fremdscham, mit echtem Aha.", img: schneiderImg, cls: "md:col-span-2", big: false },
  { t: "Geburtstag", d: "Die Show, über die man redet.", img: birthdayImg, cls: "md:col-span-1", big: false },
  { t: "Gala & Award", d: "Unterhaltung zwischen den Programmpunkten.", img: greatestTalentImg, cls: "md:col-span-1", big: false },
  { t: "Messe & Promotion", d: "Magie, die Menschen an den Stand zieht.", img: haendeImg, cls: "md:col-span-2", big: false },
  { t: "Weihnachtsfeier", d: "Der Abend, der das Jahr im Team rund ausklingen lässt.", img: heroDinnerImg, cls: "md:col-span-2", big: false },
];
const STATS = [
  { v: "200+", l: "Events seit 2016" }, { v: "5,0★", l: "30+ Google-Bewertungen" },
  { v: "100+", l: "Hochzeiten begleitet" }, { v: "TV", l: "TVA-Auftritt 2025" },
];
const REVIEWS = [
  { name: "Laura M.", init: "L", when: "vor 2 Wochen", text: "Emilian war das Highlight unserer Hochzeit. Die Gäste reden heute noch davon — und gelacht haben wirklich alle." },
  { name: "Stefan K.", init: "S", when: "vor 1 Monat", text: "Perfekt getimt zwischen den Gängen bei unserem Firmenabend. Absolut professionell, super sympathisch." },
  { name: "Eventagentur HOBA", init: "H", when: "vor 1 Monat", text: "Zuverlässig, flexibel, und das Publikum ist jedes Mal begeistert. Klare Empfehlung." },
  { name: "Julia & Tom", init: "J", when: "vor 2 Monaten", text: "Close-Up direkt am Tisch — unsere Gäste waren sprachlos und kurz darauf am Lachen. Magisch." },
  { name: "Markus R.", init: "M", when: "vor 3 Monaten", text: "Buchung unkompliziert, Show erstklassig. Genau die Mischung aus Staunen und Humor." },
  { name: "Sandra P.", init: "S", when: "vor 4 Monaten", text: "Hat unseren 50. Geburtstag unvergesslich gemacht. Jeder im Raum war eingebunden — großartig." },
];
const ABLAUF = [
  { Icon: Mail, t: "Anfrage", d: "Ihr schreibt mir kurz Datum, Ort und Anlass — per Formular, Mail oder WhatsApp." },
  { Icon: Phone, t: "Kennenlernen", d: "In einem kurzen Gespräch klären wir, was zu eurem Abend passt: Format, Tonalität, Ablauf." },
  { Icon: Wand2, t: "Feinschliff", d: "Ich stimme die Show auf euch ab — Insider, Timing, Technik. Ihr müsst euch um nichts kümmern." },
  { Icon: Award, t: "Die Show", d: "Am Abend selbst: Staunen, Lachen und Standing Ovations — der Moment, über den man noch redet." },
];
const FAQ_ITEMS = [
  { q: "Was kostet ein Auftritt?", a: "Die Gage hängt von Format, Dauer, Anfahrt und Gästezahl ab. Schreibt mir kurz euer Event — ihr bekommt binnen 24 Stunden ein konkretes, unverbindliches Angebot." },
  { q: "Wie weit reist du?", a: "Basis ist Regensburg, gebucht werde ich aber deutschlandweit und im benachbarten Ausland. Anfahrt und ggf. Übernachtung stimmen wir vorab transparent ab." },
  { q: "Wie viel Platz und Technik brauchst du?", a: "Close-Up braucht gar nichts. Für die Bühnenshow genügen rund 2 × 1,5 m, Headset und Ton bringe ich mit. Tech-Rider auf Anfrage." },
  { q: "Für wie viele Gäste eignet sich die Show?", a: "Von der kleinen Feier mit 20 Personen bis zur Gala mit über 500 Gästen. Ich passe Format und Ablauf an eure Gruppengröße an." },
  { q: "Spielst du auch auf Englisch?", a: "Ja. Ich spiele komplett auf Deutsch oder Englisch — ideal für internationale Firmen-Events und Hochzeiten." },
  { q: "Wie schnell bekomme ich eine Antwort?", a: "In der Regel innerhalb von 24 Stunden — mit Verfügbarkeit und einem unverbindlichen Angebot." },
];

const up = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const vp = { once: true, margin: "-60px" };

const GoogleG = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);
const Stars = ({ s = 14 }: { s?: number }) => (
  <span className="inline-flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} style={{ width: s, height: s, color: GSTAR, fill: GSTAR }} />)}</span>
);
const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className="flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: dark ? D_DIM : L_DIM }}>
    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />{children}
  </p>
);

const StartDemo = () => {
  const [playing, setPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anlassIdx, setAnlassIdx] = useState(0);
  const warumRef = useRef<HTMLDivElement>(null);
  // Natives Scrollen — Pfeile schieben um eine Kartenbreite, ansonsten frei wischen/scrollen.
  const scrollWarum = (d: number) => {
    const el = warumRef.current;
    if (!el || el.children.length < 2) return;
    const stride = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    el.scrollBy({ left: d * stride, behavior: "smooth" });
  };
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    (window as unknown as { __lenis?: unknown }).__lenis = lenis;
    lenis.on("scroll", (e: { scroll: number }) => setScrolled(e.scroll > 40));
    let raf = 0; const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  useEffect(() => { document.documentElement.style.overflow = menuOpen ? "hidden" : ""; return () => { document.documentElement.style.overflow = ""; }; }, [menuOpen]);

  const cta = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]";
  const ghost = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold";
  const panel = { background: WHITE, border: `1px solid ${L_LINE}`, boxShadow: "0 24px 60px -24px rgba(10,11,15,0.25)" };
  const panelBg = "#EEF1F6";
  const cardLight = "#FFFFFF";
  const cardSize = "relative shrink-0 snap-start w-[330px] sm:w-[560px] lg:w-[760px] h-[500px] lg:h-[548px] rounded-[40px] overflow-hidden";
  const cardH3 = "font-extrabold";
  const cardP = "mt-3 max-w-md text-[15.5px] leading-[1.55]";
  const sub = { background: WHITE, boxShadow: "0 18px 40px -20px rgba(10,11,15,0.18)" } as const;
  // Frosted glass (über Foto / über farbigem Glow lesbar)
  const glass = { background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px) saturate(1.5)", WebkitBackdropFilter: "blur(18px) saturate(1.5)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 20px 50px -22px rgba(10,11,15,0.35)" } as const;
  const glassDark = { background: "rgba(255,255,255,0.16)", backdropFilter: "blur(16px) saturate(1.4)", WebkitBackdropFilter: "blur(16px) saturate(1.4)", border: "1px solid rgba(255,255,255,0.28)" } as const;
  const chip = (active: boolean) => ({ background: active ? COBALT : PAPER, color: active ? WHITE : INK, border: active ? "none" : `1px solid ${L_LINE}` });

  return (
    <div className="pv-root min-h-screen overflow-x-hidden" style={{ background: WHITE, color: INK, fontFamily: SANS }}>
      <Helmet>
        <html lang="de" />
        <title>Emilian Leber — Comedy-Zauberer aus Regensburg | Bühnenshow, Close-Up & Magic Dinner</title>
        <meta name="description" content="Comedy-Zauberer Emilian Leber aus Regensburg — Bühnenshow, Close-Up und Magic Dinner für Hochzeiten, Firmenfeiern und Events. Deutschlandweit, 200+ Events, 5,0★." />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href="https://www.magicel.de/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Emilian Leber — Comedy-Zauberer aus Regensburg" />
        <meta property="og:description" content="Bühnenshow, Close-Up und Magic Dinner für Hochzeiten, Firmenfeiern und Events. Deutschlandweit." />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" />
      </Helmet>

      <style>{`
        .pv-root h1, .pv-root h2, .pv-root h3, .pv-root h4, .pv-root h5, .pv-root h6 { font-family: ${SANS}; }
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .pv-link { position: relative; }
        .pv-link::after { content:""; position:absolute; left:0; bottom:-3px; width:0; height:2px; background:${COBALT}; transition:width .25s; }
        .pv-link:hover::after { width:100%; }
        @keyframes pvLogo { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .pv-track { animation: pvLogo 42s linear infinite; }
        .pv-marquee:hover .pv-track { animation-play-state: paused; }
        .pv-logo { transition: transform .25s ease, opacity .25s ease, filter .25s ease; }
        .pv-logo:hover { transform: scale(1.14); opacity: 1 !important; }
        .pv-has-dd > .pv-dd { opacity:0; visibility:hidden; transform: translateY(8px); transition: all .18s ease; }
        .pv-has-dd:hover > .pv-dd { opacity:1; visibility:visible; transform: translateY(0); }
        @keyframes pvFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .pv-float { animation: pvFloat 5s ease-in-out infinite; }
        .no-bar::-webkit-scrollbar { display: none; }
        .no-bar { -ms-overflow-style: none; scrollbar-width: none; }
        button[aria-label="Kontakt-Menü öffnen"], button[aria-label="Menü schließen"] { display:none !important; }
      `}</style>

      {/* ══ HEADER ══ */}
      <VoltageHeader scrolled={scrolled} />

      {/* ══ HERO ══ */}
      <header id="top" className="relative overflow-hidden px-5 md:px-10 pt-12 md:pt-20 pb-14 md:pb-24" style={{ background: WHITE }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-44 -left-24 w-[680px] h-[680px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f 0%, transparent 60%)`, filter: "blur(30px)" }} />
          <div className="absolute -top-28 right-[-60px] w-[520px] h-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${MAGENTA}1a 0%, transparent 60%)`, filter: "blur(30px)" }} />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <motion.div variants={up}><Eyebrow>Comedy-Zauberer · Regensburg</Eyebrow></motion.div>
            <motion.h1 variants={up} className="font-extrabold tracking-[-0.03em]" style={{ fontSize: "clamp(2.75rem,7vw,6.5rem)", lineHeight: 0.96, color: INK }}>
              Comedy-Zauberei<br />für euer <span style={{ color: COBALT }}>Event</span><span style={{ color: MAGENTA }}>.</span>
            </motion.h1>
            <motion.p variants={up} className="mt-7 max-w-lg text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>
              Erst staunen, dann lachen — Close-Up, Bühnenshow & Magic Dinner für Hochzeit, Firmenfeier & Gala. Aus Regensburg, deutschlandweit.
            </motion.p>
            <motion.div variants={up} className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <a href="/buchung" className={cta} style={{ background: COBALT, color: WHITE }}>Termin anfragen <ArrowRight className="w-4 h-4" /></a>
              <a href="#show" className={ghost} style={{ border: `1px solid ${L_LINE}`, color: INK }}><Play className="w-4 h-4" /> Show ansehen</a>
            </motion.div>
            <motion.div variants={up} className="mt-9 inline-flex items-center gap-3 text-[13px]" style={{ color: L_DIM }}>
              <Stars s={15} /> <span style={{ color: INK, fontWeight: 600 }}>5,0</span> · 30+ Google-Bewertungen <GoogleG s={15} />
            </motion.div>
          </div>
          {/* Foto-Komposition (warm, menschlich) */}
          <motion.div variants={up} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div className="relative rounded-[24px] overflow-hidden mx-auto lg:ml-auto lg:mr-0 w-full max-w-[380px]" style={{ boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)" }}>
              <img src={portraitImg} alt="Emilian Leber" className="w-full h-[420px] md:h-[540px] object-cover" style={{ objectPosition: "center 22%" }} loading="eager" />
            </div>
            {/* Review-Karte — dezentes Glas, unten links (nicht übers Gesicht) */}
            <div className="hidden sm:block absolute -left-5 bottom-8 w-[262px] rounded-[22px] p-5" style={glass}>
              <div className="flex items-center gap-2 mb-2.5"><GoogleG s={18} /><Stars s={13} /></div>
              <p className="text-[13.5px] leading-snug" style={{ color: INK }}>„Das Highlight unserer Hochzeit — alle haben gestaunt und gelacht."</p>
              <p className="text-[11.5px] mt-2" style={{ color: L_DIM }}>Laura M. · Brautpaar</p>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ══ LOGO MARQUEE ══ */}
      <section className="py-9 md:py-12 overflow-hidden" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
        <p className="text-center text-[12px] tracking-[0.12em] uppercase mb-8 font-medium" style={{ color: L_DIM }}>Vertraut von über 200 Auftraggebern</p>
        <div className="pv-marquee relative" style={{ maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)" }}>
          <div className="pv-track flex w-max items-center gap-16 md:gap-20">
            {[...ALL_LOGOS, ...ALL_LOGOS].map((l, i) => (<img key={i} src={`/logos/${l}`} alt="" className="pv-logo h-11 md:h-14 w-auto object-contain shrink-0" style={{ opacity: 0.85 }} loading="lazy" />))}
          </div>
        </div>
      </section>

      {/* ══ SHOWS ══ */}
      <motion.section id="shows" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={up} className="mb-10"><Eyebrow>Drei Formate</Eyebrow><h2 className="font-extrabold tracking-[-0.02em] max-w-3xl" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02 }}>Close-Up, Bühne & Magic Dinner.</h2><p className="mt-4 max-w-xl text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>Einzeln oder kombiniert — passend zu eurem Abend.</p></motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {FORMATE.map((f) => (
              <motion.a key={f.title} href="#kontakt" variants={up} className="group rounded-[20px] overflow-hidden flex flex-col" style={{ background: WHITE, border: `1px solid ${L_LINE}`, boxShadow: "0 20px 50px -36px rgba(10,11,15,0.5)" }}>
                <div className="relative h-[230px] overflow-hidden"><img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" style={{ objectPosition: f.pos }} loading="lazy" /></div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: INK }}>{f.title}</h3>
                  <p className="text-[14.5px] leading-[1.6]" style={{ color: L_DIM }}>{f.text}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-4" style={{ color: COBALT }}>Mehr erfahren <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ ÜBER + VIDEO (warm dunkel, ohne Grid) ══ */}
      <motion.section id="ueber" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-20 md:py-28" style={{ background: INK, color: WHITE }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div variants={up}>
            <Eyebrow dark>Über Emilian</Eyebrow>
            <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.04, color: WHITE }}>Der Zauberer, bei dem auch <span style={{ color: COBALT }}>gelacht</span> wird.</h2>
            <div className="mt-6 space-y-5 text-[15.5px] md:text-base leading-[1.75]" style={{ color: D_DIM }}>
              <p>Aufgewachsen am Pass eines bayerischen Gasthauses — Service-Takt und Abendregie aus erster Hand. Magie genau dort, wo sie wirkt. Über 200 Events seit 2016, von der Hochzeit bis zum Vorstands-Dinner.</p>
              <p>Comedy gehört dazu, nicht als Beilage: Eure Gäste sollen staunen — und im selben Moment lachen. Das bleibt hängen, länger als jeder Sektempfang.</p>
            </div>
            <a href="#kontakt" className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold pv-link" style={{ color: WHITE }}>Lerne mich kennen <ArrowUpRight className="w-4 h-4" style={{ color: COBALT }} /></a>
          </motion.div>
          <motion.div variants={up} id="show" className="relative aspect-video rounded-[18px] overflow-hidden" style={{ boxShadow: "0 40px 90px -34px rgba(0,0,0,0.6)" }}>
            {playing ? (
              <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=1`} title="TVA TV-Auftritt" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            ) : (
              <>
                <img src={`https://img.youtube.com/vi/${TVA_VIDEO_ID}/maxresdefault.jpg`} alt="TVA Showreel" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,11,15,0.3)" }}>
                  <button onClick={() => setPlaying(true)} aria-label="Video abspielen" className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ background: COBALT }}><Play className="w-7 h-7 ml-1" style={{ color: WHITE, fill: WHITE }} /></button>
                </div>
                <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: WHITE, backdropFilter: "blur(8px)" }}>TV-Auftritt · TVA 2025</span>
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ══ STATS ══ */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-14 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {STATS.map((s, i) => (
            <motion.div key={s.l} variants={up} className="px-4 md:px-8 text-center md:text-left" style={{ borderLeft: i % 4 === 0 ? "none" : `1px solid ${L_LINE}` }}>
              <p className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2.25rem,4vw,3.25rem)", color: INK }}>{s.v}</p>
              <p className="mt-1.5 text-[13.5px]" style={{ color: L_DIM }}>{s.l}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ══ WARUM EMILIAN — Karussell im runden Panel (Anyfin-Struktur) ══ */}
      <section id="warum" className="px-4 md:px-8 py-14 md:py-20" style={{ background: WHITE }}>
        <div className="max-w-[1364px] mx-auto rounded-[28px] md:rounded-[44px] overflow-hidden pt-12 md:pt-16" style={{ background: panelBg }}>
          {/* Header */}
          <div className="px-7 md:px-16 flex items-end justify-between gap-6 mb-9 md:mb-14">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-semibold mb-5" style={{ background: INK, color: WHITE }}>Warum Emilian?</span>
              <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}>Sechs Gründe, warum eure Gäste den Abend nicht vergessen.</h2>
            </div>
            <div className="hidden md:flex items-center gap-3 shrink-0 pb-2">
              <button onClick={() => scrollWarum(-1)} aria-label="Zurück" className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ background: INK, color: WHITE }}><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => scrollWarum(1)} aria-label="Weiter" className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-80" style={{ background: INK, color: WHITE }}><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          {/* Karten */}
          <div ref={warumRef} className="no-bar flex gap-8 md:gap-[72px] overflow-x-auto snap-x snap-proximity scroll-pl-7 md:scroll-pl-16 px-7 md:px-16 pb-14 md:pb-20">
            {/* 1 — Foto: Comedy */}
            <div className={cardSize}>
              <img src={audienceImg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "top" }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.04) 28%, rgba(10,11,15,0.88) 100%)" }} />
              <span className="absolute top-7 left-7 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold" style={{ ...glass, color: INK }}><Smile className="w-4 h-4" style={{ color: COBALT }} /> Echte Reaktionen</span>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className={cardH3} style={{ fontSize: "clamp(1.75rem,2.4vw,2.4rem)", lineHeight: 1.06, color: WHITE }}>Staunen UND lachen</h3>
                <p className={cardP} style={{ color: "rgba(255,255,255,0.88)" }}>Comedy und Magie gehören bei mir untrennbar zusammen — nicht nacheinander.</p>
              </div>
            </div>
            {/* 2 — Grafik: Maßgeschneidert — full-bleed Flow-Linie + Glas-Toast */}
            <div className={cardSize} style={{ background: cardLight }}>
              <div aria-hidden className="absolute -top-20 -right-16 w-[480px] h-[480px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f, transparent 62%)` }} />
              {/* Flow-Linie zieht sich durch die ganze Karte */}
              <svg aria-hidden className="absolute left-0 right-0 w-full" style={{ top: 132, height: 190 }} viewBox="0 0 760 200" fill="none" preserveAspectRatio="none">
                <line x1="0" y1="100" x2="760" y2="100" stroke={COBALT} strokeWidth="3" vectorEffect="non-scaling-stroke" />
                <path d="M0,100 C27,40 53,40 80,100 C107,156 133,156 160,100 C187,48 213,48 240,100 C267,150 293,150 320,100 C347,58 373,58 400,100 C427,142 453,142 480,100 C507,70 533,70 560,100 C587,128 613,128 640,100 C667,86 693,86 720,100 L760,100" stroke="rgba(10,11,15,0.32)" strokeWidth="3" strokeDasharray="0.1 13" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
              <span aria-hidden className="absolute w-16 h-16 rounded-[20px] flex items-center justify-center" style={{ top: 195, right: 28, background: COBALT, color: WHITE, boxShadow: `0 18px 34px -12px ${COBALT}99` }}><Layers className="w-7 h-7" /></span>
              {/* Glas-Toast: Format-Auswahl (Close-Up + Bühne + Magic Dinner) */}
              <div className="absolute left-7 right-7" style={{ top: 36 }}>
                <div className="inline-flex items-center gap-3 rounded-[20px] px-4 py-3" style={{ ...glass, color: INK }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${COBALT}16`, color: COBALT }}><Wand2 className="w-[19px] h-[19px]" /></span>
                  <span><span className="block text-[14px] font-bold leading-tight">Close-Up · Bühne · Magic Dinner</span><span className="block text-[12.5px] mt-0.5" style={{ color: L_DIM }}>frei kombinierbar — passend zu eurem Abend</span></span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className={cardH3} style={{ fontSize: "clamp(1.75rem,2.4vw,2.4rem)", lineHeight: 1.06, color: INK }}>Maßgeschneidert</h3>
                <p className={cardP} style={{ color: L_DIM }}>Aus vielen Möglichkeiten wird genau euer Abend — Format, Tonalität und Ablauf passen sich an.</p>
              </div>
            </div>
            {/* 3 — Foto: Erfahrung + Glas-Stat */}
            <div className={cardSize}>
              <img src={magicdinnerBuehneImg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "top" }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.05) 20%, rgba(10,11,15,0.88) 100%)" }} />
              <div className="absolute top-7 right-7 rounded-[24px] px-7 py-6 text-right" style={{ background: "rgba(10,11,15,0.42)", backdropFilter: "blur(14px) saturate(1.3)", WebkitBackdropFilter: "blur(14px) saturate(1.3)", border: "1px solid rgba(255,255,255,0.18)" }}>
                <p className="font-extrabold leading-none" style={{ fontSize: "3.5rem", color: WHITE }}>200+</p>
                <p className="text-[13.5px] mt-2.5" style={{ color: "rgba(255,255,255,0.85)" }}>Events seit 2016</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className={cardH3} style={{ fontSize: "clamp(1.75rem,2.4vw,2.4rem)", lineHeight: 1.06, color: WHITE }}>Erfahrung, kein Risiko</h3>
                <p className={cardP} style={{ color: "rgba(255,255,255,0.88)" }}>Von der Hochzeit bis zum Vorstands-Dinner — Routine auf jeder Bühne.</p>
              </div>
            </div>
            {/* 4 — Grafik: Bewertung — Glas-Rezension über Glow */}
            <div className={cardSize} style={{ background: cardLight }}>
              <div aria-hidden className="absolute -bottom-24 -left-16 w-[520px] h-[520px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1a, transparent 62%)` }} />
              <span aria-hidden className="absolute font-extrabold select-none" style={{ top: 24, right: 36, fontSize: "6rem", lineHeight: 0.8, color: "rgba(29,63,255,0.10)" }}>5,0</span>
              <div className="absolute left-7 right-7" style={{ top: 150 }}>
                <div className="rounded-[24px] p-6" style={{ ...glass, color: INK }}>
                  <div className="flex items-center gap-2 mb-3"><GoogleG s={22} /><Stars s={16} /></div>
                  <p className="text-[16px] leading-snug">„Das Highlight unserer Hochzeit — alle haben gestaunt und gelacht."</p>
                  <p className="text-[12.5px] mt-3" style={{ color: L_DIM }}>Laura M. · Brautpaar · vor 2 Wochen</p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className={cardH3} style={{ fontSize: "clamp(1.75rem,2.4vw,2.4rem)", lineHeight: 1.06, color: INK }}>5,0★ top bewertet</h3>
                <p className={cardP} style={{ color: L_DIM }}>30+ Google-Bewertungen. Was Gäste erleben, lest ihr selbst.</p>
              </div>
            </div>
            {/* 5 — Grafik: Antwort 24h — gestapelte Glas-Notifications + App-Icon */}
            <div className={cardSize} style={{ background: cardLight }}>
              <div aria-hidden className="absolute -top-24 right-0 w-[480px] h-[480px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}1f, transparent 62%)` }} />
              <div aria-hidden className="absolute -bottom-24 -left-16 w-[420px] h-[420px] rounded-full" style={{ background: `radial-gradient(circle, ${COBALT}12, transparent 64%)` }} />
              <span aria-hidden className="absolute inline-flex w-[104px] h-[104px] rounded-[28px] items-center justify-center" style={{ top: 44, right: 40, background: COBALT, color: WHITE, boxShadow: `0 26px 50px -16px ${COBALT}80` }}>
                <Wand2 className="w-11 h-11" />
                <span className="absolute -top-2.5 -right-2.5 w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold" style={{ background: MAGENTA, color: WHITE, border: "3px solid #FBF7F0" }}>1</span>
              </span>
              {/* Toast 1 */}
              <div className="absolute left-7" style={{ top: 34, right: 172 }}>
                <div className="flex items-start gap-3 rounded-[22px] px-4 py-3.5" style={{ ...glass, color: INK }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: COBALT, color: WHITE }}><Check className="w-5 h-5" /></span>
                  <span className="min-w-0"><span className="block text-[14.5px] font-bold leading-tight">Anfrage erhalten</span><span className="block text-[12.5px] mt-0.5 leading-snug" style={{ color: L_DIM }}>gerade eben</span></span>
                </div>
              </div>
              {/* Verbinder 1 */}
              <span aria-hidden className="absolute" style={{ top: 122, left: 52, width: 2, height: 40, background: `repeating-linear-gradient(${COBALT} 0 4px, transparent 4px 9px)`, opacity: 0.5 }} />
              {/* Toast 2 */}
              <div className="absolute" style={{ top: 164, left: 40, right: 84 }}>
                <div className="flex items-start gap-3 rounded-[22px] px-4 py-3.5" style={{ ...glass, color: INK }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${COBALT}16`, color: COBALT }}><Clock className="w-5 h-5" /></span>
                  <span className="min-w-0"><span className="block text-[14.5px] font-bold leading-tight">Antwort & Angebot</span><span className="block text-[12.5px] mt-0.5 leading-snug" style={{ color: L_DIM }}>in unter 24 Stunden — versprochen.</span></span>
                </div>
              </div>
              {/* Verbinder 2 */}
              <span aria-hidden className="absolute" style={{ top: 252, left: 52, width: 2, height: 40, background: `repeating-linear-gradient(${COBALT} 0 4px, transparent 4px 9px)`, opacity: 0.5 }} />
              {/* Toast 3 */}
              <div className="absolute" style={{ top: 294, left: 40, right: 120 }}>
                <div className="flex items-start gap-3 rounded-[22px] px-4 py-3.5" style={{ ...glass, color: INK }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: COBALT, color: WHITE }}><CalendarCheck className="w-5 h-5" /></span>
                  <span className="min-w-0"><span className="block text-[14.5px] font-bold leading-tight">Termin bestätigt</span><span className="block text-[12.5px] mt-0.5 leading-snug" style={{ color: L_DIM }}>wir freuen uns auf euch!</span></span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className={cardH3} style={{ fontSize: "clamp(1.75rem,2.4vw,2.4rem)", lineHeight: 1.06, color: INK }}>Unkompliziert gebucht</h3>
                <p className={cardP} style={{ color: L_DIM }}>Schnelle, verbindliche Zusagen — null Stress in der Planung.</p>
              </div>
            </div>
            {/* 6 — Foto: Für jeden Rahmen */}
            <div className={cardSize}>
              <img src={dinnerImg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "top" }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,11,15,0.04) 28%, rgba(10,11,15,0.88) 100%)" }} />
              <span className="absolute top-7 left-7 px-4 py-2 rounded-full text-[13px] font-semibold" style={{ ...glass, color: INK }}>30 – 800 Gäste</span>
              <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                <h3 className={cardH3} style={{ fontSize: "clamp(1.75rem,2.4vw,2.4rem)", lineHeight: 1.06, color: WHITE }}>Für jeden Rahmen</h3>
                <p className={cardP} style={{ color: "rgba(255,255,255,0.88)" }}>Ob intime Feier oder große Gala — das Programm passt sich an.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATEMENT (ruhig) ══ */}
      <motion.section variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-24 md:py-36" style={{ background: WHITE }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-7" style={{ color: L_DIM }}><span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} /> Die Idee</p>
          <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.6vw,3.6rem)", lineHeight: 1.1, color: INK }}>Magie, die man am nächsten Tag noch <span style={{ color: COBALT }}>erzählt</span>.</h2>
        </div>
      </motion.section>

      {/* ══ GOOGLE REVIEWS ══ */}
      <motion.section id="reviews" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: PAPER, borderTop: `1px solid ${L_LINE}`, borderBottom: `1px solid ${L_LINE}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={up} className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
            <div className="flex items-center gap-4">
              <GoogleG s={42} />
              <div>
                <div className="flex items-center gap-2"><span className="text-3xl font-extrabold" style={{ color: INK }}>5,0</span><Stars s={18} /></div>
                <p className="text-[13.5px] mt-1" style={{ color: L_DIM }}>basierend auf <strong style={{ color: INK }}>30+</strong> Google-Rezensionen</p>
              </div>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-[13.5px] font-semibold pv-link self-start md:self-auto" style={{ color: INK }}>Alle Rezensionen <ArrowUpRight className="w-4 h-4" style={{ color: COBALT }} /></a>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <motion.div key={r.name} variants={up} className="rounded-[18px] p-6" style={{ background: WHITE, border: `1px solid ${L_LINE}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold" style={{ background: COBALT, color: WHITE }}>{r.init}</span>
                  <div className="flex-1 min-w-0"><p className="text-[14px] font-semibold leading-tight truncate" style={{ color: INK }}>{r.name}</p><p className="text-[11.5px]" style={{ color: L_DIM }}>{r.when}</p></div>
                  <GoogleG s={18} />
                </div>
                <Stars s={14} />
                <p className="text-[14.5px] leading-[1.55] mt-3" style={{ color: "#3a3833" }}>{r.text}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] mt-6" style={{ color: L_DIM }}>* Beispiel-Rezensionen für diesen Demo-Entwurf.</p>
        </div>
      </motion.section>

      {/* ══ ANLÄSSE — interaktive Tabs ══ */}
      <motion.section id="anlaesse" variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={up} className="max-w-2xl mb-8"><Eyebrow>Anlässe</Eyebrow><h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02 }}>Egal, was ihr feiert.</h2></motion.div>
          <motion.div variants={up} className="no-bar flex gap-2 overflow-x-auto pb-2 mb-6">
            {ANLAESSE.map((a, i) => (
              <button key={a.t} onClick={() => setAnlassIdx(i)} className="shrink-0 px-4 py-2.5 rounded-full text-[14px] font-semibold transition-colors" style={i === anlassIdx ? { background: COBALT, color: WHITE } : { background: WHITE, color: INK, border: `1px solid ${L_LINE}` }}>{a.t}</button>
            ))}
          </motion.div>
          <motion.div variants={up} className="relative rounded-[24px] overflow-hidden" style={{ border: `1px solid ${L_LINE}` }}>
            <AnimatePresence mode="wait">
              <motion.div key={anlassIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative">
                <img src={ANLAESSE[anlassIdx].img} alt={ANLAESSE[anlassIdx].t} className="w-full h-[360px] md:h-[460px] object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,11,15,0.86) 0%, rgba(10,11,15,0.45) 52%, rgba(10,11,15,0.2) 100%)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-12 max-w-2xl">
                  <h3 className="font-extrabold text-white" style={{ fontSize: "clamp(1.75rem,3.5vw,3rem)", lineHeight: 1.04 }}>{ANLAESSE[anlassIdx].t}</h3>
                  <p className="mt-3 max-w-lg text-[15px] md:text-base" style={{ color: "rgba(255,255,255,0.85)" }}>{ANLAESSE[anlassIdx].d}</p>
                  <a href="/buchung" className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold w-fit" style={{ background: WHITE, color: INK }}>{ANLAESSE[anlassIdx].t} anfragen <ArrowRight className="w-4 h-4" /></a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* ══ ABLAUF — So läuft die Zusammenarbeit ══ */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: "#F1F4F9", borderTop: `1px solid ${L_LINE}` }}>
        <div className="max-w-7xl mx-auto">
          <motion.div variants={up} className="max-w-2xl mb-10">
            <Eyebrow>So läuft's ab</Eyebrow>
            <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.02, color: INK }}>Von der Anfrage bis zur <span style={{ color: COBALT }}>Standing Ovation</span>.</h2>
            <p className="mt-4 text-[16px] md:text-lg leading-[1.6]" style={{ color: L_DIM }}>Vier Schritte, ein verlässlicher Ablauf — und ihr müsst euch um nichts kümmern.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABLAUF.map((s, i) => (
              <motion.div key={s.t} variants={up} className="relative rounded-[24px] p-7 flex flex-col h-full" style={{ background: WHITE, border: `1px solid ${L_LINE}`, boxShadow: "0 18px 40px -28px rgba(10,11,15,0.3)" }}>
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: COBALT, color: WHITE }}><s.Icon className="w-[22px] h-[22px]" /></span>
                  <span className="font-extrabold text-[40px] leading-none select-none" style={{ color: "rgba(29,63,255,0.12)" }}>{i + 1}</span>
                </div>
                <h3 className="font-extrabold mt-6 text-[20px]" style={{ color: INK }}>{s.t}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.55]" style={{ color: L_DIM }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ PULL-QUOTE (ruhig) ══ */}
      <motion.section variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-20 md:py-28" style={{ background: PAPER }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6"><Stars s={20} /></div>
          <blockquote className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem,3.4vw,2.6rem)", lineHeight: 1.2, color: INK }}>„Close-Up direkt am Tisch — unsere Gäste waren sprachlos und kurz darauf am Lachen. Magisch."</blockquote>
          <p className="mt-7 text-[14px] inline-flex items-center gap-2" style={{ color: L_DIM }}><GoogleG s={16} /> Julia & Tom · Brautpaar</p>
        </div>
      </motion.section>

      {/* ══ FAQ ══ */}
      <motion.section variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE, borderTop: `1px solid ${L_LINE}` }}>
        <div className="max-w-3xl mx-auto">
          <motion.div variants={up} className="text-center mb-10">
            <p className="flex items-center justify-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: L_DIM }}><span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} /> Häufige Fragen</p>
            <h2 className="font-extrabold tracking-[-0.02em]" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)", lineHeight: 1.04, color: INK }}>Gut zu wissen.</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((f) => (
              <motion.details key={f.q} variants={up} className="group rounded-[18px] px-6 py-5" style={{ background: "#F6F8FB", border: `1px solid ${L_LINE}` }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="text-[16px] font-semibold" style={{ color: INK }}>{f.q}</span>
                  <ChevronDown className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180" style={{ color: COBALT }} />
                </summary>
                <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: L_DIM }}>{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ══ FINAL CTA ══ */}
      <motion.section id="kontakt" variants={up} initial="hidden" whileInView="show" viewport={vp} className="px-5 md:px-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[26px] px-6 md:px-14 py-16 md:py-24" style={{ background: COBALT }}>
          <div aria-hidden className="absolute -top-16 -right-10 w-72 h-72 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <h2 className="relative font-extrabold tracking-[-0.03em] max-w-3xl" style={{ fontSize: "clamp(2.25rem,5.5vw,4.25rem)", lineHeight: 1.0, color: WHITE }}>Bereit, dass eure Gäste staunen — und lachen<span style={{ color: MAGENTA }}>?</span></h2>
          <p className="relative mt-6 max-w-xl text-[16px] md:text-lg leading-[1.55]" style={{ color: "rgba(255,255,255,0.88)" }}>Erzähl mir kurz von eurem Event — ich melde mich innerhalb von 24 Stunden persönlich zurück.</p>
          <div className="relative mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <a href="/buchung" className={cta} style={{ background: WHITE, color: COBALT }}>Anfrage senden <ArrowRight className="w-4 h-4" /></a>
            <a href={PHONE} className={ghost} style={{ border: "1px solid rgba(255,255,255,0.4)", color: WHITE }}><Phone className="w-4 h-4" /> +49 155 63744696</a>
          </div>
        </div>
      </motion.section>

      {/* ══ FOOTER ══ */}
      <VoltageFooter />
      <Chatbot />
    </div>
  );
};

export default StartDemo;
