import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import LogoMarquee from "@/components/landing/LogoMarquee";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TVA_VIDEO_ID } from "@/lib/videos";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
  Quote,
  Calendar,
  MapPin,
  Building2,
  Trophy,
  Tv,
  Heart,
  Sparkles,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";

import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroMagicImg from "@/assets/hero-magic.jpg";
import stageShowImg from "@/assets/stage-show.jpg";

/* ─────────────────────────────────────────────────────────────
   Tokens
   ───────────────────────────────────────────────────────────── */
const ACCENT = "#1D3FFF";
const ACCENT_DEEP = "#1233CC";
const ACCENT_SOFT = "#C7D2FF";
const SERIF_ITALIC =
  "not-italic";
const AMBER_SOFT = "#C7D2FF";

/* ═══════════════════════════════════════════════════════════
   1 · HERO — minimaler text-only Hero, cream BG (kein Photo-Backdrop)
   Page-eigener Twist für Referenzen: gewaltige Zahl 200+ statt Foto.
   ═══════════════════════════════════════════════════════════ */
const HeroKeyframes = () => (
  <style>{`
    @keyframes heroWordIn { from { opacity: 0; transform: translateY(56px) scale(0.96) rotate(-1.5deg); filter: blur(8px); } to { opacity: 1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); } }
    @keyframes heroFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes heroNumberIn { 0% { opacity: 0; transform: translateY(80px) scale(0.86); filter: blur(10px); } 60% { opacity: 1; transform: translateY(-6px) scale(1.02); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes heroStarPulse { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.000)); } 50% { transform: scale(1.12); filter: drop-shadow(0 0 8px rgba(0,0,0,0.024)); } }
    @keyframes heroBokehDrift { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.15; } 30% { opacity: 1; } 70% { opacity: 1; } 100% { transform: translateY(-120px) translateX(18px) scale(1.15); opacity: 0; } }
    .hero-word { display: inline-block; opacity: 0; animation: heroWordIn 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards; will-change: transform, opacity, filter; }
    .hero-fade { opacity: 0; animation: heroFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .hero-num  { opacity: 0; animation: heroNumberIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .hero-star { animation: heroStarPulse 2.4s ease-in-out infinite; }
    .hero-bokeh { opacity: 0; animation-name: heroBokehDrift; animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1); animation-iteration-count: infinite; will-change: transform, opacity; }
    .hero-cta { transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background-color .3s, color .3s; }
    .hero-cta:hover { transform: translateY(-2px) scale(1.035); }
    .hero-cta:active { transform: translateY(0) scale(0.97); }
  `}</style>
);

const HERO_BOKEH: { size: number; left: string; top: string; dur: number; delay: number; o: number }[] = [];

const Hero = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #fafafa 0%, #ffffff 50%, #fafafa 100%)",
      }}
    >
      <HeroKeyframes />
      {/* Amber-Glow oben rechts */}
      <div
        aria-hidden
        className="absolute -top-40 -right-32 w-[720px] h-[720px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      {/* Burgunder-Glow unten links */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-32 w-[640px] h-[640px] rounded-full blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,0,0,0.040) 0%, rgba(0,0,0,0.000) 70%)",
        }}
      />
      {/* Bokeh */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {HERO_BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full hero-bokeh"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              background: `radial-gradient(circle, rgba(199,144,66,${b.o}) 0%, rgba(199,144,66,${b.o * 0.4}) 40%, rgba(0,0,0,0.000) 75%)`,
              filter: "blur(2px)",
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container px-6 pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 items-end">
          <div className="lg:col-span-7">
            {/* Trust-Strip */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-5 gap-y-2 mb-8 hero-fade" style={{ animationDelay: "0.05s" }}>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500 hero-star" style={{ animationDelay: `${i * 0.12}s` }} />
                  ))}
                </div>
                <span className="text-sm text-foreground/85">
                  <strong className="font-semibold text-foreground">5,0</strong>
                  <span className="text-foreground/55">{" · "}30+ Bewertungen</span>
                </span>
              </div>
              <span aria-hidden className="hidden md:block h-4 w-px bg-foreground/25" />
              <span className="text-sm text-foreground/70">
                <strong className="font-semibold text-foreground">200+ Events</strong>
                {" "}seit 2016
              </span>
              <span aria-hidden className="hidden md:block h-4 w-px bg-foreground/25" />
              <span className="text-sm text-foreground/70">
                Bayern + deutschlandweit
              </span>
            </div>

            {/* Italic Eyebrow */}
            {/* GROSSE Zahl statt vollbild Hero */}
            <div className="hero-num" style={{ animationDelay: "0.3s" }}>
              <h1
                className="font-display font-black tabular-nums leading-[0.82] tracking-[-0.05em] text-foreground"
                style={{ fontSize: "clamp(6rem, 18vw, 18rem)" }}
              >
                200<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </h1>
            </div>

            {/* Sub-Headline */}
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-foreground mt-4 md:mt-6 text-[clamp(1.6rem,3.2vw,2.75rem)] max-w-3xl">
              {"Events. "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                {"Seit 2016."}
              </span>{" "}Quer durch{" "}Bayern.
            </h2>

            {/* Body */}
            <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-[1.65] text-foreground/65 hero-fade" style={{ animationDelay: "1.1s" }}>
              Versicherer, Bauunternehmen, Möbelhäuser, Brauereien, Banken,
              Hochzeitspaare, Geburtstagskinder und ein paar Theater. Die Liste
              wächst jedes Jahr — und ich nenne dir gerne Ansprechpartner aus
              deiner Branche, wenn du fragst.
            </p>

            {/* CTAs */}
            <div className="mt-10 inline-flex flex-col sm:flex-row items-start gap-4 hero-fade" style={{ animationDelay: "1.3s" }}>
              <Link
                to="/buchung"
                className="hero-cta group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-white"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_DEEP}, ${ACCENT})`,
                  boxShadow: "0 14px 30px -10px rgba(0,0,0,0.040)",
                }}
              >
                Referenzen anfragen
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#filter"
                className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-foreground/75 hover:text-foreground border-b border-foreground/25 hover:border-foreground pb-1 transition-colors"
              >
                Kunden filtern
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Rechte Spalte — Stats-Stack */}
          <div className="lg:col-span-5 lg:pl-6">
            <div className="hero-fade space-y-6" style={{ animationDelay: "0.9s" }}>
              <div className="border-t border-foreground/15 pt-6">
                <p className="text-[11px] tracking-[0.18em] uppercase font-bold mb-2" style={{ color: ACCENT }}>
                  Auf einen Blick
                </p>
                <p className={`text-base text-foreground/55 leading-[1.5]`}>
                  Zehn Jahre, vier Formate, ein Tonfall. Hier eine Übersicht.
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-7 pt-2">
                {[
                  { n: "100+", l: "Hochzeiten" },
                  { n: "100+", l: "Firmen-Events" },
                  { n: "80+",  l: "Geburtstage" },
                  { n: "100+", l: "Close-Up" },
                  { n: "10+",  l: "Magic Dinners" },
                  { n: "17",   l: "echte Logos" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt
                      className="font-display font-black tabular-nums leading-[0.95] tracking-[-0.03em] text-foreground"
                      style={{ fontSize: "clamp(1.75rem,3vw,2.5rem)" }}
                    >
                      {s.n}
                    </dt>
                    <dd className={`text-sm md:text-base text-foreground/55 mt-1`}>
                      {s.l}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-foreground/15 pt-5">
                <p className="text-xs text-foreground/50 leading-[1.6]">
                  Vollständige Kundenliste mit Ansprechpartnern auf{" "}
                  <Link to="/kontakt" className="underline underline-offset-2 hover:text-foreground transition-colors">
                    direkte Anfrage
                  </Link>
                  . Viele Auftraggeber bevorzugen Diskretion und werden nicht
                  öffentlich genannt.
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
   2 · BIG-LOGO-CLOUD — HAUPTELEMENT
   Alle 18 echten Logos, klickbar mit Case-Study-Modal.
   Single Source of Truth für Kunden-Daten (auch von Modal genutzt).
   ═══════════════════════════════════════════════════════════ */
type CaseStudy = {
  name: string;
  logo: string;
  eyebrow: string;        // 1-Zeilen-Tag unter Logo
  branche: string;
  ort: string;
  jahr: number;
  anlass: string;
  format: string;
  intro: string;          // 1-2 Sätze: was war der Auftrag
  body?: string[];        // optionale Tiefen-Erzählung (Konzept, Umsetzung, Ergebnis)
  tags?: string[];
  pull?: string;
  pullAuthor?: string;
  photo?: string;
  photoPosition?: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Versicherungskammer Bayern",
    logo: "/logos/vkb.png",
    eyebrow: "Magic Camp · 200 Gäste",
    branche: "Versicherung",
    ort: "Nähe Ingolstadt",
    jahr: 2024,
    anlass: "Mitarbeiter-Event mit Workshop-Wunsch",
    format: "Magic Camp + Bühne",
    intro:
      "200 Gäste, expliziter Wunsch nach einem Zauber-Workshop für Kleingruppen. Standard-Bühnenshow hätte sich falsch angefühlt — zu wenig persönlich.",
    body: [
      "Ich habe das Konzept komplett neu gebaut: ein Magic Camp mit rotierenden Workshop-Stationen, in denen jeder Gast selbst ein, zwei Effekte erlernt. Als roter Faden eine zentrale Bühnenshow am Ende, die alle Stationen zusammenführt.",
      "Konzept-Pitch im Haus der Firma. Schriftlicher Vertrag. Gemeinsames Briefing aller Mitarbeiter und externen Trainer. Beim Event selbst: jeder Gast geht mit einem Trick nach Hause, das Finale auf der Bühne wird zum Wow-Moment, der noch wochenlang im Pausenraum erzählt wird.",
    ],
    tags: ["Magic Camp", "Workshop-Stationen", "Konzept + Pitch", "Bühne als Finale"],
    pull: "Es war einfach Mega. Alle Gäste begeistert.",
    pullAuthor: "Jan von Lehmann · Eventleitung VKB",
    photo: buehneZuschauerImg,
    photoPosition: "center 25%",
  },
  {
    name: "STRABAG",
    logo: "/logos/strabag.png",
    eyebrow: "Weihnachtsfeier · 80 Gäste",
    branche: "Bau",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Weihnachtsfeier im Restaurant",
    format: "Close-Up + Tisch-zu-Tisch + Bühne",
    intro:
      "STRABAG-Mitarbeiterin fragt für 80 Gäste in einem Restaurant an, ursprünglicher Wunsch eine reine Bühnenshow. Klang nach Standardauftrag.",
    body: [
      "Nach Raum-Analyse vor Ort meine Empfehlung: bei dieser Raumgröße und Tisch-Anordnung trägt eine reine Bühne den Abend nicht. Stattdessen Close-Up beim Glühweinempfang, Tisch-zu-Tisch beim Essen, Bühnenshow nach dem Hauptgang.",
      "Detailabsprache per E-Mail (Ablauf, Service-Takt), Telefonate (Parken, Technik), vor Ort Bühne mit dem Restaurant-Chef final geplant. Beim Event: vom Empfang bis zur Tanzfläche durchgehend Magie, kein Bruch. Aus 25 Minuten Bühne wurde ein 3-Stunden-Programm.",
    ],
    tags: ["Combo-Programm", "Empfang + Tisch + Bühne", "Format-Anpassung", "Restaurant-Setting"],
    pull: "Alles wurde angepasst — von der Bühnenshow zum vollen Abend-Programm.",
    pullAuthor: "STRABAG · Weihnachtsfeier 2024",
    photo: emotionenImg,
    photoPosition: "center 30%",
  },
  {
    name: "XXXLutz",
    logo: "/logos/xxxlutz.png",
    eyebrow: "Konzern-Event · ~250 Gäste",
    branche: "Möbel",
    ort: "Würzburg",
    jahr: 2025,
    anlass: "Konzern-Event mit Premium-Anspruch",
    format: "Tisch-zu-Tisch + Bühne",
    intro:
      "Konzern-Event eines großen Möbelhauses, rund 250 geladene Gäste — Mischung aus Führungskreis, Vertriebspartnern und langjährigen Mitarbeitern. Anspruch hoch: Premium-Tonalität, kein Klamauk.",
    body: [
      "Im Briefing vorab Insider gesammelt: laufende Kampagnen, interne Running-Gags, der eine Vertriebsmann der nie ohne Krawatte erscheint. Das alles fließt in Mentaleffekte und Pointen ein, ohne dass die Show zur Insider-Veranstaltung wird.",
      "Ablauf: Tisch-zu-Tisch beim Empfang, danach 25-Minuten-Bühne als Highlight-Slot zwischen Vorstandsrede und Buffet. Premium-Look, kein Glitzer, Pointen die nur im Saal funktionieren — und genau deshalb hängen bleiben.",
    ],
    tags: ["Konzern-Event", "Insider-Briefing", "Tisch + Bühne", "Premium-Tonalität"],
    pull: "Eine Show, die sich nicht wie eine Show angefühlt hat.",
    pullAuthor: "Möbelhandels-Konzern · Konzern-Event",
    photo: stageShowImg,
    photoPosition: "center 30%",
  },
  {
    name: "Sixt",
    logo: "/logos/sixt.png",
    eyebrow: "Mobility · Kundenabend",
    branche: "Mobilität",
    ort: "München",
    jahr: 2025,
    anlass: "Kundenabend für VIP-Klientel",
    format: "Close-Up · Walk-Around",
    intro:
      "Exklusiver Kundenabend mit Stehtischen, freier Bewegung der Gäste, dezenter Atmosphäre. Klassisches Setting für Walk-Around-Magie als Gesprächs-Eröffner zwischen Vertriebsleuten und Bestandskunden.",
  },
  {
    name: "Sparkasse",
    logo: "/logos/sparkasse.png",
    eyebrow: "Banking · Mitarbeiterfeier",
    branche: "Bank",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Mitarbeiterfeier",
    format: "Bühne",
    intro:
      "Klassische Mitarbeiterfeier nach Geschäftsschluss. 30-Minuten-Bühnenshow als Highlight zwischen Vorstandsrede und Buffet — bewusst keine Insider-Pointen, breite Zugänglichkeit für alle Hierarchie-Ebenen.",
  },
  {
    name: "HEIM & HAUS",
    logo: "/logos/heim-haus.png",
    eyebrow: "Vertriebs-Tagung",
    branche: "Bau",
    ort: "Nürnberg",
    jahr: 2025,
    anlass: "Jahres-Vertriebstagung",
    format: "Bühne",
    intro:
      "Vertriebs-Mannschaft trifft sich zum Jahres-Recap. Show als Energizer am Ende eines langen Vortrags-Tages — Mentalmagie als perfekter Ausstieg, weil sie den Kopf zwingt umzuschalten.",
  },
  {
    name: "Schneider Weisse",
    logo: "/logos/schneider-weisse.png",
    eyebrow: "Brauerei · Tisch-zu-Tisch",
    branche: "Brauerei",
    ort: "Kelheim",
    jahr: 2024,
    anlass: "Kundenabend mit Bier-Verkostung",
    format: "Tisch-zu-Tisch",
    intro:
      "Bier-Verkostung in der historischen Brauerei. Tisch-zu-Tisch-Magie zwischen den Verkostungs-Gängen — funktioniert weil Bier und Karten-Effekte denselben Pace haben: langsam, präzise, geteilt.",
  },
  {
    name: "Wald & Wiese",
    logo: "/logos/wald-wiese.png",
    eyebrow: "Restaurant-Hauspartner",
    branche: "Restaurant",
    ort: "Sinzing bei Regensburg",
    jahr: 2026,
    anlass: "Wiederkehrendes Magic Dinner Format",
    format: "Magic Dinner (4-Gang)",
    intro:
      "Hauspartner-Restaurant für das Magic Dinner Summer Edition Format. Vier Gänge à la carte aus der Restaurantkarte, Close-Up-Magie an jedem Tisch zwischen den Gängen — der Restaurant-Rhythmus trägt die Show.",
    tags: ["Hauspartner", "Wiederkehrendes Format", "Vier-Gänge", "Close-Up am Tisch"],
  },
  {
    name: "Stadt Regensburg",
    logo: "/logos/stadt-regensburg.png",
    eyebrow: "Öffentliche Hand · Empfang",
    branche: "Öffentliche Hand",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Offizieller Empfang",
    format: "Close-Up",
    intro:
      "Offizieller Empfang der Stadt mit geladenen Gästen aus Wirtschaft und Politik. Walk-Around-Magie als Eis-Brecher in den ersten 90 Minuten — bevor die Reden anfangen ist niemand mehr fremd.",
  },
  {
    name: "Stadt Deggendorf",
    logo: "/logos/stadt-deggendorf.svg",
    eyebrow: "Tourist-Info · 50 Jahre Jubiläum",
    branche: "Öffentliche Hand",
    ort: "Deggendorf",
    jahr: 2026,
    anlass: "50-jähriges Jubiläum der Tourist-Information",
    format: "Stand-Magie · Walk-Around · Lead-Funnel",
    intro:
      "Die Tourist-Information feiert 50 Jahre — und steht vor dem klassischen Messe-Problem: Wie macht man die eigenen Stände im eigenen Haus sichtbar, wenn Besucher das Gebäude eh nur als Durchgang wahrnehmen?",
    body: [
      "Die Lösung war keine Bühne. Sondern Close-Up-Magie an zwei Punkten im Haus — Eingang Nord und Eingang Süd. Jeder, der reinkam, lief in einen kurzen, irritierend guten Effekt. Karten in der Hand, Sekundenmoment Staunen — und direkt danach der weiche Verweis: [Übrigens, ein paar Meter weiter findest du den Stand für…].",
      "Der Trick (im wörtlichen Sinn) ist die Aufmerksamkeits-Ökonomie: Magie kauft drei bis fünf Sekunden ungeteilte Konzentration. In diesen Sekunden landet die Info, die sonst am Plakat vorbeigerauscht wäre. Aus dem Durchläufer wird ein Standbesucher.",
    ],
    tags: ["Stand-Magie", "Lead-Funnel", "Zwei-Punkte-Setup", "Aufmerksamkeits-Hook"],
  },
  {
    name: "Oktoberfest",
    logo: "/logos/oktoberfest.png",
    eyebrow: "Festzelt-Auftritt",
    branche: "Event",
    ort: "München",
    jahr: 2024,
    anlass: "Privater Festzelt-Auftritt",
    format: "Walk-Around",
    intro:
      "Privater Buchung in einem Festzelt — lauter Hintergrund, dichte Tischbelegung, alle leicht angeheitert. Walk-Around-Magie funktioniert genau da: kleine Effekte, große Reaktionen, kein Mikrofon nötig.",
  },
  {
    name: "Turmtheater",
    logo: "/logos/turmtheater.png",
    eyebrow: "Theater · Variety-Slot",
    branche: "Theater",
    ort: "Regensburg",
    jahr: 2025,
    anlass: "Variety-Abend mit Gast-Slot",
    format: "Abendprogramm (Bühne)",
    intro:
      "Variety-Abend im Turmtheater mit wechselnden Künstler-Slots. Mein 20-Minuten-Slot als Headliner-Akt vor dem Finale — ausverkaufter Saal, theatrales Setting, scharfes Licht.",
  },
  {
    name: "Greatest Talent",
    logo: "/logos/greatest-talent.png",
    eyebrow: "TV-Finalist 2023",
    branche: "TV",
    ort: "München",
    jahr: 2024,
    anlass: "TV-Show-Teilnahme",
    format: "Bühne (Live + TV)",
    intro:
      "Teilnahme an der TV-Talent-Show [Greatest Talent]. Bühne fürs Studiopublikum, parallel Live-Aufzeichnung. Einzug ins Finale.",
  },
  {
    name: "Business Entertainment",
    logo: "/logos/business-entertainment.png",
    eyebrow: "Agentur-Partner",
    branche: "Agentur",
    ort: "Bayern",
    jahr: 2025,
    anlass: "Wiederkehrende Agency-Buchungen",
    format: "Diverse Slots (Close-Up, Bühne, Moderation)",
    intro:
      "Stamm-Buchungs-Agentur für Firmen-Events in Bayern. Mehrere Engagements pro Jahr in verschiedenen Formaten — von Tisch-zu-Tisch bis Bühnen-Headliner, je nach Endkunden-Wunsch.",
  },
  {
    name: "Alte Mälzerei",
    logo: "/logos/dpsg.png",
    eyebrow: "Event-Location · Regensburg",
    branche: "Event-Location",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Gala-Abend",
    format: "Bühne",
    intro:
      "Bühnen-Show in der Alten Mälzerei — Regensburgs renommierte Event-Location für Galas und Kulturveranstaltungen. Steile Tribüne, scharfes Licht, anspruchsvolles Publikum.",
  },
  {
    name: "Drying Little Tears",
    logo: "/logos/drying-little-tears.png",
    eyebrow: "Charity · Kinder",
    branche: "Charity",
    ort: "München",
    jahr: 2025,
    anlass: "Charity-Gala",
    format: "Close-Up",
    intro:
      "Charity-Gala zugunsten der Stiftung [Drying Little Tears] (Hilfe für krebskranke Kinder). Close-Up als Walk-Around zwischen Tischen — bewusst kein bezahltes Engagement, sondern Sponsoring durch Auftritt.",
  },
  {
    name: "Steinhofer Ingenieure",
    logo: "/logos/steinhofer.png",
    eyebrow: "Mittelstand · Jubiläum",
    branche: "Mittelstand",
    ort: "Regensburg",
    jahr: 2024,
    anlass: "Firmenjubiläum",
    format: "Bühne",
    intro:
      "Firmenjubiläum eines mittelständischen Ingenieurbüros — Mitarbeiter, Familien, langjährige Geschäftspartner. Bühnen-Show mit eingebauter Firmen-Geschichte (Insider-Briefing vorab).",
  },
  {
    name: "Wächter",
    logo: "/logos/waechter.png",
    eyebrow: "Event-Agentur",
    branche: "Event-Agentur",
    ort: "Bayern",
    jahr: 2025,
    anlass: "Wiederkehrende Agency-Partnerschaft",
    format: "Diverse Slots",
    intro:
      "Event-Agentur Wächter ist Stamm-Vermittlung für Firmenevents in Ostbayern. Mehrere Engagements pro Jahr — Close-Up, Bühne, Moderation, je nach Endkunden-Brief.",
  },
];

const GrosseLogoCloud = () => {
  const { ref, isVisible } = useScrollReveal();
  const [openCase, setOpenCase] = useState<CaseStudy | null>(null);
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
      id="logos"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Achtzehn von zweihundert. Jedes Logo klickbar.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground pr-4 break-words">
              {"Wer mich "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                gebucht hat
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Versicherung, Bau, Möbel, Brauerei, Banking, öffentliche Hand,
              TV, Theater, Charity. Auf jedes Logo klicken — Anlass, Setting
              und Konzept im Detail. Alle hier gezeigten Logos sind freigegeben.
            </p>
          </div>
        </div>

        {/* Logo-Grid — klickbar, jedes Logo öffnet Case-Study-Dialog */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 md:gap-x-10 gap-y-12 md:gap-y-14 items-stretch ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          {CASE_STUDIES.map((k, i) => (
            <button
              key={k.name}
              type="button"
              onClick={() => setOpenCase(k)}
              className="group relative flex flex-col items-center justify-between text-center rounded-xl p-2 -m-2 transition-colors hover:bg-foreground/[0.025] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ring-c,#1D3FFF)]"
              aria-label={`${k.name} — Case Study öffnen`}
            >
              <div className="relative flex items-center justify-center w-full min-h-[110px] md:min-h-[130px]">
                <img
                  src={k.logo}
                  alt={`${k.name} — Referenz-Kunde Zauberer Emilian Leber`}
                  loading="lazy"
                  className="max-h-[88px] md:max-h-[110px] lg:max-h-[124px] max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                  style={{ filter: "saturate(1.05)" }}
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-display text-sm md:text-base font-bold text-foreground leading-tight">
                  {k.name}
                </p>
                <p className="text-xs md:text-sm text-foreground/55 mt-1">
                  {k.eyebrow}
                </p>
                <p
                  className="mt-2 text-[10px] tracking-[0.16em] uppercase font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: ACCENT }}
                >
                  Case ansehen →
                </p>
              </figcaption>
              <span
                aria-hidden
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-16 transition-all duration-500"
                style={{ background: ACCENT }}
              />
              <span className="sr-only">{i + 1} von {CASE_STUDIES.length}</span>
            </button>
          ))}
        </div>

        <div className="mt-16 md:mt-20 max-w-3xl">
          <p className="text-base md:text-lg text-foreground/60 leading-[1.6]">
            Plus rund 180 weitere Auftraggeber — Hochzeitspaare, Familien,
            Mittelständler, Restaurants. Wer Diskretion möchte, bekommt sie.
          </p>
        </div>
      </div>

      <CaseStudyDialog caseStudy={openCase} onClose={() => setOpenCase(null)} />
    </section>
  );
};

const Fact = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-[10px] tracking-[0.2em] uppercase font-semibold text-foreground/45 mb-1.5">
      {label}
    </dt>
    <dd className="text-sm font-medium text-foreground/90">{value}</dd>
  </div>
);

const CaseStudyDialog = ({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}) => (
  <Dialog open={!!caseStudy} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-2xl md:max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-foreground/10">
      {caseStudy && (
        <>
          {caseStudy.photo && (
            <div className="aspect-[16/9] w-full overflow-hidden bg-foreground/5">
              <img
                src={caseStudy.photo}
                alt={`${caseStudy.name} — Eindruck vom Event`}
                className="w-full h-full object-cover"
                style={{ objectPosition: caseStudy.photoPosition ?? "center" }}
                loading="eager"
              />
            </div>
          )}
          <div className="p-6 md:p-10">
            <div className="flex items-start gap-5 mb-6">
              <img
                src={caseStudy.logo}
                alt=""
                aria-hidden
                className="h-10 md:h-12 w-auto max-w-[140px] object-contain shrink-0"
                style={{ filter: "saturate(1.05)" }}
              />
              <div className="min-w-0">
                <DialogTitle asChild>
                  <h3 className="font-display text-xl md:text-2xl font-black text-foreground leading-tight">
                    {caseStudy.name}
                  </h3>
                </DialogTitle>
                <p className="mt-1 text-[11px] md:text-xs tracking-[0.16em] uppercase font-semibold text-foreground/55">
                  {caseStudy.eyebrow}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 mb-7 pb-6 border-b border-foreground/10">
              <Fact label="Branche" value={caseStudy.branche} />
              <Fact label="Ort" value={caseStudy.ort} />
              <Fact label="Jahr" value={String(caseStudy.jahr)} />
              <Fact label="Format" value={caseStudy.format} />
            </dl>

            <DialogDescription asChild>
              <div className="space-y-4 text-[15px] md:text-base leading-[1.65] text-foreground/75">
                <p className="text-foreground/85">
                  <strong className="font-semibold text-foreground">Anlass: </strong>
                  {caseStudy.anlass}
                </p>
                <p>{caseStudy.intro}</p>
                {caseStudy.body?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </DialogDescription>

            {caseStudy.pull && (
              <blockquote
                className="mt-8 pl-5 border-l-2"
                style={{ borderColor: ACCENT }}
              >
                <p
                  className={`${SERIF_ITALIC} text-lg md:text-xl text-foreground/85 leading-[1.45]`}
                >
                  „{caseStudy.pull}"
                </p>
                {caseStudy.pullAuthor && (
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-foreground/55">
                    {caseStudy.pullAuthor}
                  </p>
                )}
              </blockquote>
            )}

            {caseStudy.tags && caseStudy.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {caseStudy.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] tracking-[0.08em] uppercase font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${ACCENT}15`, color: ACCENT_DEEP }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-foreground/10 flex flex-wrap items-center gap-4">
              <Link
                to="/buchung"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[12px] tracking-[0.08em] font-semibold uppercase text-background hover:bg-foreground/85 transition-colors"
              >
                Ähnliches anfragen
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="mailto:el@magicel.de"
                className="text-[12px] tracking-[0.08em] font-semibold uppercase text-foreground/65 hover:text-foreground border-b border-foreground/25 hover:border-foreground pb-1 transition-colors"
              >
                Direkt schreiben
              </a>
            </div>
          </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

/* ═══════════════════════════════════════════════════════════
   4 · STATS-EDITORIAL — asymmetrischer Bento, gewaltige Zahlen
   ═══════════════════════════════════════════════════════════ */
const STATS = [
  { n: "200+", l: "Events seit 2016", note: "Hauptzahl", size: "xl" },
  { n: "100+", l: "Hochzeiten", note: "Trauungen, Sektempfänge, Hochzeitsdinner", size: "md" },
  { n: "100+", l: "Firmen-Engagements", note: "Vorstand bis Mitarbeiterfeier", size: "md" },
  { n: "80+",  l: "Geburtstage", note: "30er bis Goldene", size: "sm" },
  { n: "100+", l: "Close-Up-Auftritte", note: "Walk-Around + Tisch-zu-Tisch", size: "sm" },
  { n: "10+",  l: "Magic Dinners", note: "Vier-Gänge-Format mit Wald & Wiese", size: "sm" },
];

const StatsEditorialSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Was zehn Jahre auf der Bühne zusammenrechnen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground">
              Was ich seit 2016
              <br />
              <span className={SERIF_ITALIC} style={{ color: ACCENT }}>
                gebaut habe.
              </span>
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Keine Marketing-Zahlen — gepflegte interne Liste. Stand
              Mai 2026. Mehrfach-Buchungen zählen als ein Event pro Termin.
            </p>
          </div>
        </div>

        {/* Bento — XL, MD, MD, SM, SM, SM */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6`} style={{ animationDelay: "0.2s" }}>
          {/* XL — 200+ */}
          <article
            className="relative md:col-span-8 overflow-hidden flex flex-col justify-between p-8 md:p-12 text-white"
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(155deg, ${ACCENT_DEEP} 0%, ${ACCENT} 55%, ${ACCENT_DEEP} 100%)`,
              minHeight: "360px",
              boxShadow: "0 40px 80px -30px rgba(0,0,0,0.040)",
            }}
          >
            <div aria-hidden className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full blur-2xl opacity-8" style={{ background: "radial-gradient(circle, rgba(255,210,140,0.6), transparent 60%)" }} />
            <div className="relative z-10">
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/65 mb-4">
                Seit 2016 · Hauptzahl
              </p>
              <p
                className="font-display font-black tabular-nums leading-[0.85] tracking-[-0.045em]"
                style={{ fontSize: "clamp(6rem, 13vw, 13rem)" }}
              >
                200<span style={{ color: AMBER_SOFT }}>+</span>
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <p className="font-display text-xl md:text-2xl font-bold leading-tight">
                Events insgesamt
              </p>
              <p className={`text-base md:text-lg text-white/75 mt-1`}>
                vom Sektempfang bis zur Gala, von 8 bis 500 Gästen.
              </p>
            </div>
          </article>

          {/* MD — 100+ Hochzeiten */}
          <article
            className="relative md:col-span-4 overflow-hidden flex flex-col justify-between p-7 md:p-9 bg-[hsl(0,0%,98%)]"
            style={{ borderRadius: "1.5rem", minHeight: "360px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div>
              <Heart className="w-5 h-5 mb-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}>
                100<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">Hochzeiten</p>
              <p className={`text-sm text-foreground/55 mt-1`}>
                Empfang, Hochzeitsdinner, vor dem Tanz.
              </p>
            </div>
          </article>

          {/* MD — 100+ Firmen */}
          <article
            className="relative md:col-span-6 overflow-hidden flex flex-col justify-between p-7 md:p-9 bg-[hsl(0,0%,98%)]"
            style={{ borderRadius: "1.5rem", minHeight: "300px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div>
              <Building2 className="w-5 h-5 mb-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)" }}>
                100<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">Firmen-Engagements</p>
              <p className={`text-sm text-foreground/55 mt-1`}>
                Vorstandsdinner, Mitarbeiterfeier, Kundenabend, Messe.
              </p>
            </div>
          </article>

          {/* MD — 100+ Close-Up */}
          <article
            className="relative md:col-span-3 overflow-hidden flex flex-col justify-between p-6 md:p-7 text-white"
            style={{
              borderRadius: "1.5rem",
              background: `linear-gradient(155deg, #0e3d2a 0%, #1f5e3f 100%)`,
              minHeight: "300px",
              boxShadow: "0 30px 60px -28px rgba(14,61,42,0.5)",
            }}
          >
            <div>
              <Sparkles className="w-5 h-5 mb-4" style={{ color: AMBER_SOFT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em]" style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}>
                100<span style={{ color: AMBER_SOFT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-base font-bold">Close-Up</p>
              <p className={`text-xs text-white/65 mt-1`}>
                Tisch-zu-Tisch, Walk-Around.
              </p>
            </div>
          </article>

          {/* SM — 80+ Geburtstage */}
          <article
            className="relative md:col-span-3 overflow-hidden flex flex-col justify-between p-6 md:p-7 bg-white"
            style={{ borderRadius: "1.5rem", minHeight: "300px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)" }}
          >
            <div>
              <Trophy className="w-5 h-5 mb-4" style={{ color: ACCENT }} strokeWidth={1.75} />
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)" }}>
                80<span className={SERIF_ITALIC} style={{ color: ACCENT }}>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-base font-bold text-foreground">Geburtstage</p>
              <p className={`text-xs text-foreground/55 mt-1`}>
                30er bis Goldene Hochzeit.
              </p>
            </div>
          </article>

          {/* MD — 10+ Magic Dinner */}
          <article
            className="relative md:col-span-6 overflow-hidden flex flex-col justify-between p-7 md:p-9 text-white"
            style={{
              borderRadius: "1.5rem",
              background: "linear-gradient(135deg, #1233CC 0%, #1D3FFF 60%, #C7D2FF 100%)",
              minHeight: "260px",
              boxShadow: "0 40px 80px -30px rgba(138,90,20,0.5)",
            }}
          >
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-bold text-white/80 mb-3">
                Eigenes Format
              </p>
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em]" style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)", color: "#08060c" }}>
                10<span>+</span>
              </p>
            </div>
            <div>
              <p className="font-display text-lg font-bold" style={{ color: "#08060c" }}>Magic Dinners</p>
              <p className={`text-sm mt-1`} style={{ color: "rgba(8,6,12,0.65)" }}>
                Vier-Gänge-Format mit Wald & Wiese, Sinzing.
              </p>
            </div>
          </article>

          {/* SM — 5,0 Sterne */}
          <article
            className="relative md:col-span-6 overflow-hidden flex flex-col justify-between p-7 md:p-9 bg-[hsl(0,0%,98%)]"
            style={{ borderRadius: "1.5rem", minHeight: "260px", boxShadow: "0 18px 35px -22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="mt-4">
              <p className="font-display font-black tabular-nums leading-[0.9] tracking-[-0.035em] text-foreground" style={{ fontSize: "clamp(3.25rem, 6vw, 5.5rem)" }}>
                5,0<span className={SERIF_ITALIC} style={{ color: ACCENT }}>★</span>
              </p>
              <p className="font-display text-lg font-bold text-foreground mt-2">
                30+ Bewertungen
              </p>
              <p className={`text-sm text-foreground/55 mt-1`}>
                ProvenExpert, Google, persönliche Empfehlungen.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   6 · BRANCHENLISTE — Editorial-Liste, jede Branche mit Kunden-Beispiel
   ═══════════════════════════════════════════════════════════ */
const BRANCHEN = [
  { name: "Versicherung", beispiel: "VKB · 200-Personen-Magic-Camp" },
  { name: "Bau", beispiel: "STRABAG · Weihnachtsfeier" },
  { name: "Möbel", beispiel: "XXXLutz · Konzern-Event" },
  { name: "Mobilität", beispiel: "Sixt · Kundenabend München" },
  { name: "Banking", beispiel: "Sparkasse · Mitarbeiterfeier" },
  { name: "Brauerei", beispiel: "Schneider Weisse · Tisch-zu-Tisch" },
  { name: "Restaurant", beispiel: "Wald & Wiese · Magic Dinner Reihe" },
  { name: "Hospitality", beispiel: "Hotel-Galas · diverse" },
  { name: "Öffentliche Hand", beispiel: "Stadt Regensburg · Empfang" },
  { name: "TV", beispiel: "TVA · Greatest Talent · ARD-Vorabend" },
  { name: "Theater", beispiel: "Turmtheater · Variety-Abend" },
  { name: "Charity", beispiel: "Drying Little Tears · Spendengala" },
  { name: "Event-Location", beispiel: "Alte Mälzerei · Gala-Abend" },
  { name: "Mittelstand", beispiel: "Steinhofer Ingenieure · Jubiläum" },
  { name: "Hochzeit", beispiel: "Tegernsee, München, Regensburg — 100+ Paare" },
  { name: "Familie", beispiel: "Geburtstage 30 – 80 · diverse" },
];

const BranchenListeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Sechzehn Branchen, ein Ansprechpartner.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground pr-4 break-words">
              {"Quer durch "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                die Branchen
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Pro Branche habe ich mindestens drei Buchungen. Heißt: ich kenne
              die Tonalität, die typischen Risiken, die Fettnäpfchen. Für jede
              Branche gibt es Ansprechpartner auf Anfrage.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {BRANCHEN.map((b, i) => (
            <li
              key={b.name}
              className={`grid grid-cols-[46px_1fr_auto] md:grid-cols-[80px_2fr_3fr] items-baseline gap-4 md:gap-10 py-6 md:py-8 group`}
              style={{ animationDelay: `${0.1 + i * 0.04}s` }}
            >
              <span
                className={`text-foreground/30 tabular-nums`}
                style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)", lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                {b.name}
              </h3>
              <p className={`text-base md:text-lg text-foreground/55 text-right`}>
                {b.beispiel}
              </p>
            </li>
          ))}
        </ul>

        <p className={`text-base md:text-lg text-foreground/55 mt-10 max-w-2xl`}>
          Deine Branche fehlt? Wahrscheinlich nicht — frag direkt an. Auch
          Pharma, Recht, IT, Beratung, Gesundheit war schon dabei (NDA-bedingt
          nicht öffentlich).
        </p>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   7 · STIMMEN — 3 echte Reviews mit voller Story
   ═══════════════════════════════════════════════════════════ */
const STIMMEN = [
  {
    initial: "J",
    name: "Jan von Lehmann",
    role: "Eventleitung · 200 Gäste · Firmenfeier",
    quote:
      "Wir haben ein Magic Camp komplett neu aufgestellt — mit 200 Gästen nahe Ingolstadt, mit Workshop-Stationen, mit Bühnenshow als Finale. Emilian hat Konzept, Pitch, Vertrag und Briefing in einem Stück geliefert. Es war einfach Mega. Alle Gäste begeistert.",
    detail: "Versicherungs-Konzern · Bayern · 2024",
    rating: 5,
  },
  {
    initial: "K",
    name: "Katrin Raß",
    role: "Hochzeitsplanerin",
    quote:
      "Als Hochzeitsplanerin buche ich Künstler für ein Dutzend Hochzeiten pro Jahr. Emilian ist der einzige, dem ich seit Jahren blind vertraue: er checkt das Brautpaar vorab, baut Insider ein, hält Zeitplan und bringt Ruhe in den Ablauf. Brautmutter weint regelmäßig — vor Lachen oder vor Rührung. Beides Erfolg.",
    detail: "Hochzeitsplanung · Bayern + DE · seit 2022",
    rating: 5,
  },
  {
    initial: "M",
    name: "Martina Senftl",
    role: "Eventkundin · Geburtstag + Hochzeit",
    quote:
      "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier. Alle sprechen noch Wochen danach davon. Was ich nicht erwartet hätte: dass die Gäste, die ich am wenigsten für Magie offen hielt, am Ende am stärksten geflasht waren. Sogar meine Mutter — und das soll was heißen.",
    detail: "Private Kundin · zwei Buchungen",
    rating: 5,
  },
];

const StimmenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Drei Stimmen, ungekürzt.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground pr-4 break-words">
              {"Was Kunden "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                sagen
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Reviews aus drei verschiedenen Welten — Firmen-Event,
              Hochzeitsplanung, Privatkundin. Originalzitat, voller Kontext.
              Weitere 30+ auf ProvenExpert und Google.
            </p>
          </div>
        </div>

        <div className={`space-y-12 md:space-y-16`} style={{ animationDelay: "0.2s" }}>
          {STIMMEN.map((s, i) => (
            <article
              key={s.name}
              className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              {/* Initial + Meta */}
              <div className="lg:col-span-3 flex lg:flex-col items-start gap-4 lg:gap-6">
                <span
                  className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full font-display text-2xl md:text-3xl font-black shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})`,
                    color: "#fff",
                    boxShadow: "0 12px 26px -10px rgba(0,0,0,0.040)",
                  }}
                  aria-hidden
                >
                  {s.initial}
                </span>
                <div>
                  <p className="font-display text-base md:text-lg font-bold text-foreground">
                    <span>{s.name}</span>
                  </p>
                  <p className={`text-sm md:text-base text-foreground/55 mt-1`}>
                    {s.role}
                  </p>
                  <div className="flex items-center gap-0.5 mt-3">
                    {[...Array(s.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                    <meta content={String(s.rating)} />
                    <meta content="5" />
                  </div>
                  <p className="text-xs text-foreground/45 mt-3 tracking-[0.05em]">
                    {s.detail}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-9">
                <Quote className="w-10 h-10 mb-4 opacity-8" style={{ color: ACCENT }} strokeWidth={1.25} />
                <blockquote
                  className={`text-[clamp(1.35rem,2.5vw,2.1rem)] leading-[1.35] text-foreground/85`}
                >
                  „{s.quote}"
                </blockquote>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-wrap items-baseline justify-between gap-4">
          <p className="text-sm text-foreground/55">
            <strong className="font-display text-foreground tabular-nums">30+</strong>{" "}
            weitere Bewertungen auf{" "}
            <span className="font-semibold text-foreground">ProvenExpert</span>
            {" und "}
            <span className="font-semibold text-foreground">Google</span>.
          </p>
          <Link
            to="/buchung"
            className="text-[12px] uppercase tracking-[0.1em] font-semibold text-foreground/70 hover:text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors inline-flex items-center gap-1.5"
          >
            Eigene Bewertung schreiben <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   8 · VIDEO — TVA-Auftritt
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [playing, setPlaying] = useState(false);
  return (
    <section
      ref={ref}
      className="bg-white py-24 md:py-36 border-y border-foreground/10"
    >
      <div className="container px-6">
        <div className={`grid md:grid-cols-12 gap-x-12 gap-y-6 mb-12 md:mb-16`}>
          <div className="md:col-span-7">
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              TVA · TV-Auftritt 2025.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground pr-4 break-words">
              {"Live im "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                Fernsehen
              </span>
              .
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-8">
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Drei Minuten Live-Magie aus dem TVA-Studio, mit Moderator-Reaktion.
              Ein direkter Eindruck, wie Routinen vor laufender Kamera laufen.
            </p>
          </div>
        </div>
        <div
          className={`max-w-5xl mx-auto`}
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="relative aspect-video overflow-hidden bg-foreground/5"
            style={{ borderRadius: "1.5rem", boxShadow: "0 50px 100px -30px rgba(0,0,0,0.35)" }}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${TVA_VIDEO_ID}?rel=0&modestbranding=1&controls=1&playsinline=1&autoplay=1`}
                title="TVA TV-Auftritt — Emilian Leber"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={`https://img.youtube.com/vi/${TVA_VIDEO_ID}/maxresdefault.jpg`}
                  alt="TVA TV-Auftritt — Emilian Leber Showreel"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full hover:scale-110 transition-transform flex items-center justify-center shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DEEP})` }}
                    aria-label="TVA TV-Auftritt abspielen"
                  >
                    <svg className="w-9 h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <span className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white" style={{ background: "rgba(8,6,12,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <Tv className="w-3 h-3" /> TVA · 2025
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   9 · ZEITLEISTE 2016 → HEUTE — narrative Magazin-Liste
   ═══════════════════════════════════════════════════════════ */
const ZEITLEISTE = [
  {
    zeit: "2016",
    titel: "Erste bezahlte Gigs.",
    body: "Mit zwölf der erste Auftritt gegen Honorar. Familie + Freunde, Kindergeburtstage, Schulfeste. Das Karten-Repertoire wird zur Sucht.",
    aside: "12 Jahre alt.",
  },
  {
    zeit: "2019 – 2022",
    titel: "Die ersten Hochzeiten.",
    body: "Empfehlung führt zur Empfehlung. Plötzlich stehen drei Wochenenden pro Sommer auf Hochzeiten — Tisch-zu-Tisch, Walk-Around, später erste Bühnen-Slots vor dem Tanz.",
    aside: "~40 Hochzeiten in 3 Jahren.",
  },
  {
    zeit: "2023",
    titel: "Erste abendfüllende Bühnenshow.",
    body: "Ein eigenes 60-Minuten-Programm im Theater, vollkommen durchkomponiert. Standing Ovation am Ende — und das Gefühl, dass aus dem Hobby ein Beruf wird.",
    aside: "Frühjahr 2023.",
  },
  {
    zeit: "Sep 2023",
    titel: "Greatest Talent · TV-Finalist.",
    body: "Castingshow, mehrere Auftritte vor Jury und Publikum, schließlich ins Finale. Plötzlich ruft die Branche zurück — Agenturen, Veranstalter, Brautpaare.",
    aside: "TV-Premiere.",
  },
  {
    zeit: "2024",
    titel: "Talents of Magic · Finalist + Kreativpreis.",
    body: "Internationaler Magie-Wettbewerb, Finale, Kreativpreis für ein eigenes Mentalstück. Parallel: erstes Magic Camp für 200 Gäste, erste reine B2B-Saison.",
    aside: "Plus Top-30 Deutsche Jugendmeisterschaft.",
  },
  {
    zeit: "2025",
    titel: "Vollberuflich + TVA-TV-Auftritt.",
    body: "Aus dem Nebenberuf wird der Hauptberuf. Drei Auftritte pro Woche, Tournee-Slots, der TVA-TV-Auftritt mit drei Minuten Live-Magie aus dem Studio.",
    aside: "Voll im Geschäft.",
  },
  {
    zeit: "2026",
    titel: "Plötzlich Magie · Magic Meets Comedy.",
    body: "Eigene Bühnenshow, die Comedy und Magie verbindet — als Headliner, abendfüllend, getourt durch Bayern. Magic Dinner als zweites eigenes Format etabliert.",
    aside: "Aktueller Stand.",
  },
];

const ZeitleisteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-6 mb-14 md:mb-20">
          <div className={`md:col-span-7`}>
            <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
              Zehn Jahre, in sieben Stationen.
            </p>
            <h2 className="font-display font-black tracking-[-0.025em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground pr-4 break-words">
              {"2016 — "}
              <span style={{ color: ACCENT, paddingRight: "0.18em" }}>
                Heute
              </span>
              .
            </h2>
          </div>
          <div className={`md:col-span-5 md:pt-8`} style={{ animationDelay: "0.1s" }}>
            <p className="text-base md:text-lg text-foreground/60 leading-[1.6] max-w-md">
              Vom ersten bezahlten Auftritt mit zwölf bis zur eigenen
              Bühnenshow und zum TV-Studio — wie aus einem Hobby ein Beruf
              wurde, in sieben Stationen erzählt.
            </p>
          </div>
        </div>

        <ul className="space-y-12 md:space-y-16">
          {ZEITLEISTE.map((z, i) => (
            <li
              key={z.zeit}
              className={`grid md:grid-cols-12 gap-x-10 gap-y-3`}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <div className="md:col-span-3">
                <p
                  className="font-display font-black tabular-nums tracking-[-0.015em] text-foreground"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", lineHeight: 1 }}
                >
                  {z.zeit}
                </p>
                <p className={`text-sm text-foreground/45 mt-2`}>{z.aside}</p>
              </div>
              <div className="md:col-span-9 md:pl-6 md:border-l md:border-foreground/15">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-3">
                  {z.titel}
                </h3>
                <p className="text-base md:text-lg text-foreground/65 leading-[1.7] max-w-2xl">
                  {z.body}
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
  10 · PULL-QUOTE — black full-bleed
   ═══════════════════════════════════════════════════════════ */
const PullQuoteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative bg-black text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-6">
        <img src={audienceImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(8,6,12,0.55) 0%, rgba(8,6,12,0.96) 70%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full blur-2xl opacity-6" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.024), transparent 65%)" }} />
      <div aria-hidden className="absolute -bottom-32 right-0 w-[420px] h-[420px] rounded-full blur-2xl opacity-20" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.040), transparent 65%)" }} />
      <div className={`relative container px-6`}>
        <Quote className="w-14 h-14 md:w-16 md:h-16 mb-10 mx-auto opacity-40" style={{ color: "#AFC0FF" }} strokeWidth={1.25} />
        <blockquote className="max-w-5xl mx-auto text-center">
          <p className="font-display font-black tracking-[-0.02em] leading-[1.08] text-[clamp(1.875rem,3.5vw,3rem)]">
            {"Zweihundert Abende."}{" "}
            <span style={{ color: "#AFC0FF" }}>
              Eine Stille immer.
            </span>
          </p>
          <footer className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-white/25" aria-hidden />
            <span className="text-sm md:text-base text-white/65">
              Drei Sekunden, nach jeder großen Pointe. Jedes Mal.
            </span>
            <span className="h-px w-12 bg-white/25" aria-hidden />
          </footer>
        </blockquote>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
  11 · FAQ — Referenzen-spezifisch
   ═══════════════════════════════════════════════════════════ */
const FAQS = [
  {
    q: "Kann ich Referenzen kontaktieren, um sie zu befragen?",
    a: "Ja — bei Anfrage nenne ich zwei bis drei Ansprechpartner aus deiner Branche, mit Telefon oder Mail. Die Freigabe holen wir vorher ein, das gehört zu seriöser Diskretion. Erfahrungsgemäß sagen Referenz-Kunden gerne 'ja' zu einem kurzen Anruf — sie waren ja selbst mal in der Situation, jemand Neues zu buchen.",
  },
  {
    q: "Warum sind nicht alle eure Kunden öffentlich gelistet?",
    a: "Viele Auftraggeber — vor allem aus Recht, Pharma, Beratung und manche Konzern-Vorstände — bevorzugen Diskretion. Ich respektiere das strikt. Auch private Hochzeiten und Geburtstage sind in der öffentlichen Liste anonymisiert oder gar nicht aufgeführt. Bei direkter Anfrage und mit Freigabe kann ich aber jederzeit konkret werden.",
  },
  {
    q: "Darf ich Fotos und Videos aus euren Events sehen?",
    a: "Ja, ich habe ein internes Portfolio mit Foto- und Video-Material, das ich auf Anfrage zeige — sortiert nach Branche und Anlass. Veröffentlicht ist nur das Material, für das ich schriftliche Freigaben habe. Das schützt auch dich, falls du selbst mal in der Sammlung landest.",
  },
  {
    q: "Wie geht ihr mit DSGVO bei Bewertungen um?",
    a: "Alle hier zitierten Reviews sind mit voller Einwilligung der Person veröffentlicht. Die drei Vollnamen (Jan von Lehmann, Katrin Raß, Martina Senftl) haben das schriftlich bestätigt. Weitere 30+ Bewertungen liegen verifiziert auf ProvenExpert und Google. Wer eine Bewertung zurückziehen möchte, kann das jederzeit per Mail an el@magicel.de.",
  },
  {
    q: "Habt ihr Referenzen in meiner Region und meiner Branche?",
    a: "Wahrscheinlich ja. Der Schwerpunkt ist Bayern (Regensburg, München, Ingolstadt, Würzburg, Passau), aber auch in NRW, Hessen und Baden-Württemberg habe ich gearbeitet. Branchen-Erfahrung: 16 verschiedene Branchen, von Versicherung bis Charity. Frag konkret an, ich nenne zwei bis drei passende Beispiele.",
  },
  {
    q: "Kann ich euren Kunden-Newsletter abonnieren?",
    a: "Nein, es gibt keinen Marketing-Newsletter. Wer auf der Page bleiben möchte, schaut alle paar Monate vorbei — die Referenzliste hier wird zwei- bis dreimal pro Jahr aktualisiert. Direkter Kanal ist immer Mail oder Telefon.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="bg-white py-24 md:py-36 border-y border-foreground/10">
      <div className="container px-6">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-foreground/55 mb-6">
            Häufige Fragen zu Referenzen.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)] text-foreground pr-4 break-words">
            Was vorher{" "}
            <span>gefragt wird</span>.
          </h2>
        </div>
        <div className={`max-w-3xl border-t border-foreground/15`}>
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-6 md:py-7 border-b border-foreground/15">
              <summary className="flex items-start justify-between cursor-pointer gap-6 list-none">
                <span className="font-display text-base md:text-lg font-bold text-foreground leading-snug pr-4">
                  {faq.q}
                </span>
                <span aria-hidden className="shrink-0 mt-1 text-foreground/40 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-4 text-base text-foreground/70 leading-[1.7] max-w-2xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
  12 · FINAL CTA — black full-bleed mit Foto + Diskretion-Versprechen
   ═══════════════════════════════════════════════════════════ */
const FinalCTA = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="relative text-white py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroMagicImg} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(8,6,12,0.94) 0%, rgba(8,6,12,0.82) 50%, rgba(8,6,12,0.6) 100%)" }} />
      </div>
      <div aria-hidden className="absolute -top-32 left-1/3 w-[520px] h-[520px] rounded-full blur-2xl opacity-8" style={{ background: "radial-gradient(circle, rgba(0,0,0,0.040), transparent 60%)" }} />
      <div aria-hidden className="absolute -bottom-40 -right-20 w-[480px] h-[480px] rounded-full blur-2xl opacity-6" style={{ background: "radial-gradient(circle, rgba(255,180,40,0.1), transparent 60%)" }} />

      <div className="relative container px-6">
        <div className={`max-w-3xl mx-auto text-center`}>
          <p className="text-[11px] md:text-xs tracking-[0.22em] uppercase font-semibold text-white/60 mb-6">
            Diskret. Persönlich. Mit Branchen-Match.
          </p>
          <h2 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-[clamp(1.75rem,3.25vw,2.75rem)]">
            Schreib mir.
            <br />
            <span className={SERIF_ITALIC} style={{ color: ACCENT_SOFT }}>
              Referenzen
            </span>{" "}aus deiner Branche.
          </h2>
          <p className="mt-8 mx-auto max-w-xl text-base md:text-lg text-white/70 leading-[1.6]">
            Sag mir Datum, Anlass, Branche und Stadt — du bekommst zwei bis drei
            Kontakte mit Telefon oder Mail, die mich gebucht haben und die
            Erfahrung weitergeben. Antwort innerhalb 24 Stunden.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/buchung"
              className="hero-cta group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-[13px] tracking-[0.08em] font-semibold uppercase text-black hover:bg-white/95"
            >
              Referenz anfragen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:el@magicel.de"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white"
            >
              <Mail className="w-4 h-4" /> el@magicel.de
            </a>
            <a
              href="tel:+4915563744696"
              className="inline-flex items-center gap-1.5 text-[13px] tracking-[0.08em] font-semibold uppercase text-white/75 hover:text-white"
            >
              <Phone className="w-4 h-4" /> direkt anrufen
            </a>
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-xs text-white/55 tracking-[0.05em]">
            <ShieldCheck className="w-4 h-4" style={{ color: ACCENT_SOFT }} />
            Anfragen werden vertraulich behandelt — keine Newsletter, kein
            Weiterverkauf von Daten, keine Cold-Calls.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.magicel.de/referenzen";

const Referenzen = () => (
  <>
    <Helmet>
      <html lang="de" />
      <title>Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber</title>
      <meta
        name="description"
        content="Zauberer-Referenzen: VKB, STRABAG, XXXLutz, Sixt, Sparkasse, Schneider Weisse u.v.m. 200+ Events, 5,0★ und 30+ Bewertungen. Premium-Entertainment in Bayern und deutschlandweit."
      />
      <meta
        name="keywords"
        content="Zauberer Referenzen, Magier Kunden, Zauberkünstler VKB STRABAG XXXLutz, Emilian Leber Case Studies, Zauberer Firmenkunden, Magier Hochzeiten Referenzen, Zauberer Bayern Kundenliste, Mentalist Referenzen"
      />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <link rel="canonical" href={SITE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="de_DE" />
      <meta
        property="og:title"
        content="Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber"
      />
      <meta
        property="og:description"
        content="VKB, STRABAG, XXXLutz, Sixt, Sparkasse — 200+ Events, 5,0★. Case-Studies und echte Reviews."
      />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Referenzen — 200+ Events seit 2016 | Zauberer Emilian Leber"
      />
      <meta
        name="twitter:description"
        content="VKB, STRABAG, XXXLutz — Case-Studies + 30+ Reviews + 200+ Events."
      />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        rel="stylesheet"
      />

      {/* JSON-LD: LocalBusiness + AggregateRating + valide Reviews mit itemReviewed */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://www.magicel.de/#business",
        "name": "Emilian Leber — Zauberer & Mentalist",
        "url": "https://www.magicel.de",
        "image": "https://www.magicel.de/og-image.jpg",
        "logo": "https://www.magicel.de/og-image.jpg",
        "email": "el@magicel.de",
        "telephone": "+4915563744696",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Regensburg",
          "addressRegion": "Bayern",
          "addressCountry": "DE",
        },
        "areaServed": ["DE", "Bayern", "Regensburg", "München", "Ingolstadt", "Würzburg"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "30",
        },
        "review": [
          {
            "@type": "Review",
            "itemReviewed": { "@id": "https://www.magicel.de/#business" },
            "author": { "@type": "Person", "name": "Jan von Lehmann" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
            "reviewBody": "Es war einfach Mega. Alle Gäste begeistert.",
          },
          {
            "@type": "Review",
            "itemReviewed": { "@id": "https://www.magicel.de/#business" },
            "author": { "@type": "Person", "name": "Katrin Raß" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
            "reviewBody": "Emilian ist der einzige Künstler, dem ich seit Jahren blind vertraue.",
          },
          {
            "@type": "Review",
            "itemReviewed": { "@id": "https://www.magicel.de/#business" },
            "author": { "@type": "Person", "name": "Martina Senftl" },
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
            "reviewBody": "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier.",
          },
        ],
      })}</script>

      {/* JSON-LD: BreadcrumbList */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Start", "item": "https://www.magicel.de/" },
          { "@type": "ListItem", "position": 2, "name": "Referenzen", "item": SITE_URL },
        ],
      })}</script>

      {/* JSON-LD: ItemList (3 Case-Studies) */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Top-Case-Studies Zauberer Emilian Leber",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "VKB · Magic Camp · 200 Gäste · Nähe Ingolstadt",
            "description": "Workshop-Stationen + Bühnenshow für eine Versicherungs-Gruppe.",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "STRABAG · Weihnachtsfeier · 80 Gäste · Regensburg",
            "description": "Format-Anpassung von reiner Bühne zu Combo-Programm.",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "XXXLutz · Konzern-Event · ~250 Gäste · Würzburg",
            "description": "Tisch-zu-Tisch + Bühne mit eingebauten Insider-Pointen.",
          },
        ],
      })}</script>

      {/* JSON-LD: FAQPage */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      })}</script>
    </Helmet>

    <PageLayout>
      <main>
        <Hero />
        <LogoMarquee eyebrow="200+ Auftritte. Für." variant="cream" compact />
        <GrosseLogoCloud />
        <StatsEditorialSection />
        <BranchenListeSection />
        <StimmenSection />
        <VideoSection />
        <ZeitleisteSection />
        <PullQuoteSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </PageLayout>
  </>
);

export default Referenzen;
