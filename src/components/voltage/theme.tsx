/**
 * VOLTAGE Design-System — geteilte Tokens, Links & Atome.
 * „Plain Voltage": warm, menschlich, Dienstleistung (nicht Software).
 * Cobalt-Akzent, Outfit als einzige Schrift, kein Gold/Geld-Look.
 * Genutzt von /demo (StartDemo) + allen /demo/* Unterseiten.
 */
import type { ReactNode } from "react";
import { Star, Wand2, Hand, UtensilsCrossed, Mic2, Smile } from "lucide-react";

/* ── Farben ── */
export const INK = "#0A0B0F", PAPER = "#F4F6F9", WHITE = "#FFFFFF";
export const COBALT = "#1D3FFF", MAGENTA = "#FF2D7A", GSTAR = "#FBBC04";
export const L_LINE = "rgba(10,11,15,0.10)", D_LINE = "rgba(255,255,255,0.14)";
export const L_DIM = "#5f5a54", D_DIM = "#a7a2b0";
export const SANS = "'Outfit', system-ui, -apple-system, sans-serif";
export const PANEL_BG = "#EEF1F6";
export const CARD_LIGHT = "#FFFFFF";

/* ── Echte Kontakt-Daten & Links (Single Source of Truth) ── */
export const PHONE_HREF = "tel:+4915563744696";
export const PHONE_DISPLAY = "+49 155 63744696";
export const EMAIL = "el@magicel.de";
export const EMAIL_HREF = "mailto:el@magicel.de";
export const WHATSAPP = "https://wa.me/4915563744696";
export const INSTAGRAM = "https://www.instagram.com/_magicel/";
export const YOUTUBE = "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA";
export const FACEBOOK = "https://www.facebook.com/people/Emilian-Leber-Zauberer-Mentalist/61582946450467/";
export const LINKEDIN = "https://de.linkedin.com/in/emilian-leber-3b3414369";
/** Anfrage-Ziel (live) — strukturiertes Buchungsformular (CRM). */
export const ANFRAGE_HREF = "/buchung";
export const SITE_URL = "https://www.magicel.de";

/* ── Navigation (Live-Routen) ── */
export const KONZEPTE = [
  { t: "Bühnenshow", h: "/buehnenshow", d: "Comedy + Mentalmagie für den ganzen Saal", Icon: Wand2 },
  { t: "Close-Up", h: "/close-up", d: "Magie direkt in den Händen der Gäste", Icon: Hand },
  { t: "Magic Dinner", h: "/magic-dinner", d: "Durchkomponiert über den ganzen Abend", Icon: UtensilsCrossed },
  { t: "Moderation", h: "/moderation", d: "Roter Faden für Gala & Event", Icon: Mic2 },
  { t: "Comedy-Zauberei", h: "/comedy-zauberei", d: "Pointen, die hängenbleiben", Icon: Smile },
];
export const ANLAESSE_NAV = [
  { t: "Hochzeit", h: "/hochzeit", d: "Magie zwischen Ja-Wort und Mitternacht" },
  { t: "Firmenfeier", h: "/firmenfeiern", d: "Eisbrecher für gemischte Teams" },
  { t: "Weihnachtsfeier", h: "/zauberer-weihnachtsfeier", d: "Der Jahresabschluss, über den man redet" },
  { t: "Geburtstag · Jubiläum", h: "/geburtstage", d: "Die Show, über die man noch redet" },
  { t: "Event-Agenturen", h: "/event-agenturen", d: "Verlässlicher Act für eure Kunden" },
  { t: "Messe · Roadshow", h: "/messe-magier", d: "Magie, die Menschen an den Stand zieht" },
];

/* ── Echte Bewertungen ──
 * Stand 22.09.2026, im Browser geprüft:
 *   Google-Unternehmensprofil: 4,8 Sterne bei 16 Rezensionen.
 *   ProvenExpert: 4,97 von 5 bei 7 (anonymen) Bewertungen.
 * Alle Zitate unten sind wörtlich aus diesen Profilen übernommen (Kürzungen
 * mit „…" markiert). KEINE Texte erfinden, umformulieren oder Rollen ergänzen,
 * die nicht in der Bewertung selbst stehen (UWG). */
export const RATING = "4,8";
export const RATING_COUNT = "16";
export const PROVENEXPERT_RATING = "4,97";

export type RealReview = {
  name: string;
  role: string;
  /** vollständiger (bzw. wörtlich gekürzter) Bewertungstext */
  text: string;
  /** wörtlicher Auszug für Karussell & Pull-Quote */
  short: string;
  source: "google" | "provenexpert";
};

export const REAL_REVIEWS = {
  rass: {
    name: "Katrin Raß", role: "Hochzeitsplanerin", source: "google",
    text: "Ich durfte eine Hochzeit planen, bei der Emilian als Zauberer aufgetreten ist – und es war wirklich großartig! Er hat sich auf unsere Idee eingelassen, den Bräutigam zu überraschen, und mit viel Charme und Witz mitgespielt. Es war unterhaltsam, sympathisch und Emilian hat alle Gäste begeistert. Eine tolle Ergänzung für jeden besonderen Anlass!",
    short: "Er hat sich auf unsere Idee eingelassen, den Bräutigam zu überraschen, und mit viel Charme und Witz mitgespielt. Es war unterhaltsam, sympathisch und Emilian hat alle Gäste begeistert.",
  },
  lehmann: {
    name: "Jan von Lehmann", role: "Agenturgruppe Wächter, München", source: "google",
    text: "Die Agenturgruppe Wächter aus München bedankt sich vielmals bei Emilian, der rund 200 geladene Gäste eines Bayerischen Versicherungsunternehmens mit einer eigens entwickelten Zaubertrickshow in einem inszenierten Magic Camp begeistert hat - es war einfach Mega!",
    short: "… rund 200 geladene Gäste eines Bayerischen Versicherungsunternehmens mit einer eigens entwickelten Zaubertrickshow in einem inszenierten Magic Camp begeistert hat - es war einfach Mega!",
  },
  senftl: {
    name: "Martina Senftl", role: "Google-Rezension", source: "google",
    text: "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung des Auftrages sehr professionell. Gerne wieder!",
    short: "Sympathischer junger Mann, der sich nicht selbst, sondern seine Zauberkunst in den Mittelpunkt stellt. Abwicklung des Auftrages sehr professionell. Gerne wieder!",
  },
  poellinger: {
    name: "Daniela Pöllinger", role: "Hochzeitsplanerin", source: "google",
    text: "Als Hochzeitsplanerin habe ich Emilian Leber auf einer meiner Hochzeiten erleben dürfen. Die Zusammenarbeit im Vorfeld und am Tag selbst war sehr angenehm und entspannt. Emilian hat das Publikum mit Witz und Charme gut unterhalten und konnte dabei die Gäste für sich gewinnen. Ein wirklich schöner Programmpunkt für eine Hochzeitsfeier.",
    short: "Emilian hat das Publikum mit Witz und Charme gut unterhalten und konnte dabei die Gäste für sich gewinnen. Ein wirklich schöner Programmpunkt für eine Hochzeitsfeier.",
  },
  schuermann: {
    name: "Christian Schürmann", role: "20er-Jahre-Party auf der Donau", source: "google",
    text: "Wir hatten Emilian - den jungen Magier - für unsere 20er-Jahre-Party auf der Donau gebucht, und er war einfach großartig! Mit seinen beeindruckenden Kartentricks und anderen kleinen Zaubereien hat er die Gäste an den Tischen immer wieder überrascht und begeistert. Besonders schön war, wie er alle aktiv in seine Tricks eingebunden hat – das hat für eine tolle Atmosphäre gesorgt.",
    short: "Mit seinen beeindruckenden Kartentricks und anderen kleinen Zaubereien hat er die Gäste an den Tischen immer wieder überrascht und begeistert.",
  },
  roehrl: {
    name: "Claudi Roehrl", role: "Magic Dinner", source: "google",
    text: "Wir hatten Vergnügen, Emilian bei einem Magic Dinner live zu erleben, und waren sehr beeindruckt. … Besonders der Wikipedia-Trick war einfach unglaublich – so etwas haben wir noch nie gesehen! … Mit seinem sympathischen Auftreten und seiner humorvollen Art hat Emilian für eine lockere und unterhaltsame Atmosphäre gesorgt.",
    short: "Besonders der Wikipedia-Trick war einfach unglaublich – so etwas haben wir noch nie gesehen!",
  },
  pruitti: {
    name: "Pruitti", role: "Bühnenshow · großer Geburtstag", source: "google",
    text: "Ich habe bei Emilian die Bühnenmagie Show für einen großen Geburtstag gebucht. Sein Auftreten war der Wahnsinn. Er hat mit seiner Lustigen art die Gäste direkt in der ersten Minute begeistert. Die leute waren fasziniert von der Show und kann ich ihn nur empfehlen.",
    short: "Sein Auftreten war der Wahnsinn. Er hat mit seiner Lustigen art die Gäste direkt in der ersten Minute begeistert.",
  },
  christina: {
    name: "Christina", role: "Familienfeier", source: "google",
    text: "Emilian ist auf unsere Wünsche eingegangen und hat diese toll umgesetzt. Sein Auftreten war sehr professionell und er konnte alle Gäste sofort in seinen Bann ziehen. … Wir können Emilian auf jeden Fall auch für kleinere Familienfeiern empfehlen.",
    short: "Sein Auftreten war sehr professionell und er konnte alle Gäste sofort in seinen Bann ziehen.",
  },
  waldwiese: {
    name: "Restaurant-Partner", role: "Magic Dinner (ProvenExpert)", source: "provenexpert",
    text: "vielen Dank für den gelungenen Abend bei unserem Magic Dinner im Wald & Wiese. Die Show war professionell, unterhaltsam und bei unseren Gästen durchweg sehr gut angekommen.",
    short: "Die Show war professionell, unterhaltsam und bei unseren Gästen durchweg sehr gut angekommen.",
  },
} satisfies Record<string, RealReview>;

/** Auswahl für den ReviewsBlock (Google-Rezensionen, wörtlich). */
export const REVIEWS: RealReview[] = [REAL_REVIEWS.rass, REAL_REVIEWS.lehmann, REAL_REVIEWS.senftl];

/* ── Kunden-Logos (public/logos) ── */
export const CLIENT_LOGOS = [
  "vkb.png", "strabag.png", "xxxlutz.png", "sixt.png", "sparkasse.png", "heim-haus.png",
  "schneider-weisse.png", "wald-wiese.png", "stadt-regensburg.png", "oktoberfest.png",
  "turmtheater.png", "steinhofer.png",
];

/* ── Geteilte Klassen / Styles ── */
export const cta = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold transition-transform hover:scale-[1.02]";
export const ghost = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold";
export const panel = { background: WHITE, border: `1px solid ${L_LINE}`, boxShadow: "0 24px 60px -24px rgba(10,11,15,0.25)" } as const;
export const glass = { background: "rgba(255,255,255,0.55)", backdropFilter: "blur(18px) saturate(1.5)", WebkitBackdropFilter: "blur(18px) saturate(1.5)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 20px 50px -22px rgba(10,11,15,0.35)" } as const;
export const glassDark = { background: "rgba(10,11,15,0.42)", backdropFilter: "blur(14px) saturate(1.3)", WebkitBackdropFilter: "blur(14px) saturate(1.3)", border: "1px solid rgba(255,255,255,0.18)" } as const;

/* ── Framer-Motion Varianten ── */
export const up = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
export const vp = { once: true, margin: "-60px" };

/* ── Atome ── */
export const GoogleG = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);
export const Stars = ({ s = 14 }: { s?: number }) => (
  <span className="inline-flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} style={{ width: s, height: s, color: GSTAR, fill: GSTAR }} />)}</span>
);
export const Eyebrow = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <p className="flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase font-semibold mb-5" style={{ color: dark ? D_DIM : L_DIM }}>
    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: COBALT }} />{children}
  </p>
);

/* ── Globale Styles (Outfit-Heads erzwingen + pv-Utilities) ── */
export const VoltageGlobalStyle = () => (
  <style>{`
    .voltage-root h1, .voltage-root h2, .voltage-root h3, .voltage-root h4, .voltage-root h5, .voltage-root h6 { font-family: ${SANS}; }
    html.lenis, html.lenis body { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }
    .pv-link { position: relative; }
    .pv-link::after { content:""; position:absolute; left:0; bottom:-3px; width:0; height:2px; background:${COBALT}; transition:width .25s; }
    .pv-link:hover::after { width:100%; }
    @keyframes pvLogo { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .pv-track { animation: pvLogo 42s linear infinite; }
    .pv-marquee:hover .pv-track { animation-play-state: paused; }
    .pv-logo { transition: transform .25s ease, opacity .25s ease; }
    .pv-logo:hover { transform: scale(1.14); opacity: 1 !important; }
    .pv-has-dd > .pv-dd { opacity:0; visibility:hidden; transform: translateY(8px); transition: all .18s ease; }
    .pv-has-dd:hover > .pv-dd { opacity:1; visibility:visible; transform: translateY(0); }
    @keyframes pvFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
    .pv-float { animation: pvFloat 5s ease-in-out infinite; }
    .no-bar::-webkit-scrollbar { display: none; }
    .no-bar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);
