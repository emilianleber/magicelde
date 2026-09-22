/**
 * /ueber-mich — Über mich (Voltage-Layout): Person, Stil, Werdegang, Auszeichnungen.
 * 22.09.2026 entschlackt: Logos/Reviews/Zahlen stehen auf /referenzen, die
 * abendfüllende Show (keine öffentlichen Termine) und Verkaufs-Sektionen raus.
 */
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import VoltageShell from "@/components/voltage/VoltageShell";
import { SubHero, Stats, FactsGrid, Steps, FinalCTA, SectionHeader } from "@/components/voltage/sections";
import { SplitFeature, DarkShowcase } from "@/components/voltage/creative";
import { COBALT, MAGENTA, WHITE } from "@/components/voltage/theme";
import { Tv, Trophy, Medal } from "lucide-react";
import { TVA_VIDEO_ID } from "@/lib/videos";

import portraitBuchImg from "@/assets/emilian-portrait-buch.jpg";
import magicianPortraitImg from "@/assets/magician-portrait.jpg";
import staunenImg from "@/assets/staunen.jpg";

/* ═══════════════════════════════════════════════════════════
   VIDEO — TVA TV-Auftritt (Logik 1:1 erhalten: playing-State + iframe)
   ═══════════════════════════════════════════════════════════ */
const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="px-5 md:px-10 py-16 md:py-24" style={{ background: WHITE }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="TVA · Februar 2025"
          title={<>Drei Minuten <span style={{ color: COBALT }}>im Fernsehen.</span></>}
          sub="Live-Studio-Auftritt beim TVA (TV Aktuell). Drei Minuten Mentalmagie vor laufender Kamera, mit dem Moderator als Versuchsperson. Ein direkter Eindruck, wie sich eine Show vor Studio-Licht spielt."
        />
        <div className="max-w-5xl mx-auto mt-10">
          <div
            className="relative aspect-video overflow-hidden"
            style={{
              borderRadius: "24px",
              background: "rgba(10,11,15,0.05)",
              boxShadow: "0 40px 80px -34px rgba(10,11,15,0.4)",
            }}
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
                    style={{ background: COBALT }}
                    aria-label="TVA TV-Auftritt abspielen"
                  >
                    <svg className="w-9 h-9 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <span
                  className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold text-white"
                  style={{
                    background: "rgba(10,11,15,0.6)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  TVA · 2025
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
   PAGE-EXPORT — UeberMich (Voltage)
   ═══════════════════════════════════════════════════════════ */
const UeberMich = () => (
  <VoltageShell
    title="Über mich — Zauberer Emilian Leber aus Bayern | Werdegang & Stil"
    description="Junger Zauberer aus Bayern: Emilian Leber, seit 2016 auf der Bühne, Finalist bei Greatest Talent und Talents of Magic, TVA TV-Auftritt 2025. Comedy + Mentalmagie + Premium-Stil."
    path="/ueber-mich"
    noindex={false}
  >
    {/* SEO-Tags + JSON-LD 1:1 erhalten (nested in Shell-Helmet) */}
    <Helmet>
      <meta
        name="keywords"
        content="Emilian Leber, Zauberer Bayern, junger Magier, Mentalist, Greatest Talent Finalist, Talents of Magic, Comedy Zauberer Bayern, Zauberkünstler Werdegang, Magier Regensburg"
      />
      <meta property="og:url" content="https://www.magicel.de/ueber-mich" />
      <meta property="og:type" content="profile" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />

      {/* JSON-LD: Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Emilian Leber",
          alternateName: "Magicel",
          jobTitle: "Zauberkünstler & Comedy-Magier",
          description:
            "Junger Zauberer aus Bayern, seit 2016 auf der Bühne. Finalist bei Greatest Talent (2023) und Talents of Magic (2024, Kreativpreis). TVA TV-Auftritt 2025.",
          url: "https://www.magicel.de/ueber-mich",
          image: "https://www.magicel.de/og-image.jpg",
          sameAs: [
            "https://www.instagram.com/magicel.de",
            "https://www.magicel.de",
          ],
          knowsAbout: [
            "Zauberkunst",
            "Mentalmagie",
            "Comedy-Zauberei",
            "Close-Up Magic",
            "Bühnenshow",
            "Magic Dinner",
            "Moderation",
          ],
          award: [
            "Greatest Talent · Finalist · 2023",
            "Talents of Magic · Finalist + Kreativpreis · 2024",
            "Deutsche Jugendmeisterschaft · Top 30 · 2024",
            "TVA TV-Auftritt · 2025",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Regensburg",
            addressRegion: "Bayern",
            addressCountry: "DE",
          },
        })}
      </script>

      {/* JSON-LD: EntertainmentBusiness mit AggregateRating */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EntertainmentBusiness",
          name: "Magicel · Emilian Leber",
          description:
            "Zauberer und Comedy-Magier aus Bayern. Mentalmagie, Close-Up, Bühnenshow, Magic Dinner.",
          url: "https://www.magicel.de/ueber-mich",
          telephone: "+4915563744696",
          areaServed: { "@type": "State", name: "Bayern" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Regensburg",
            addressRegion: "Bayern",
            addressCountry: "DE",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "30",
            bestRating: "5",
            worstRating: "1",
          },
          founder: {
            "@type": "Person",
            name: "Emilian Leber",
          },
        })}
      </script>

      {/* JSON-LD: BreadcrumbList */}
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
              name: "Über mich",
              item: "https://www.magicel.de/ueber-mich",
            },
          ],
        })}
      </script>
    </Helmet>

    <SubHero
      eyebrow="Über mich"
      title={<>Emilian <span style={{ color: COBALT }}>Leber</span><span style={{ color: MAGENTA }}>.</span></>}
      sub="Zauberer aus Regensburg, mit Acht angefangen, mit Zwölf den ersten bezahlten Gig. Seit 2016 auf der Bühne. Heute: TV-Finalist, Comedy-Zauberer und Mentalist — in ganz Bayern unterwegs. Hier erzähle ich, wie das passiert ist."
      image={portraitBuchImg}
      imageAlt="Emilian Leber — Zauberer aus Bayern, Studio-Portrait mit Buch"
      imgPos="center 28%"
      badge="Magie seit 2016 · zehn Jahre Bühne · 5,0★ aus 30+ Bewertungen"
      primary={{ label: "Termin anfragen", href: "/buchung" }}
      secondary={{ label: "Aktuelle Show ansehen", href: "/buehnenshow" }}
    />

    <Stats
      items={[
        { v: "200+", l: "Events seit 2016" },
        { v: "10", l: "Jahre Bühne" },
        { v: "3x", l: "TV-Finalist (2023–2025)" },
        { v: "5,0★", l: "30+ Bewertungen" },
      ]}
    />

    {/* Mein Stil — Split mit Portrait */}
    <SplitFeature
      eyebrow="Mein Stil"
      title={<>Kein Zylinder. <span style={{ color: COBALT }}>Kein Kaninchen.</span></>}
      sub="Ich bin Comedy-Zauberer: Mentalmagie trifft auf trockenen Humor. Karten-Effekte landen in einer Anekdote aus dem Briefing-Call mit dem Gastgeber. Drei Sekunden Stille nach dem Effekt — dann eine Pointe, die niemand kommen sieht."
      points={[
        "Mentalmagie als Schwerpunkt — Vorhersagen und scheinbare Telepathie, nur mit Psychologie und Sprache",
        "Trockener Humor zwischen den Effekten, oft gegen mich selbst — keine Witze über das Publikum",
        "Premium-Tonalität, auf Anlass und Publikum gebrieft — vom Vorstands-Empfang bis zur Geburtstagstafel",
      ]}
      image={magicianPortraitImg}
      imageAlt="Emilian Leber Studio-Portrait — Comedy-Zauberer aus Bayern"
      imgPos="center"
      reverse
      stat={{ v: "6 h", l: "Tägliches Training" }}
    />

    {/* Werdegang — echte Stationen als Steps */}
    <Steps
      eyebrow="Werdegang · Echte Stationen"
      title={<>Von Acht <span style={{ color: COBALT }}>bis Heute.</span></>}
      sub="Vom ersten Zauberkasten zum TV-Studio — die Momente, die mich geprägt haben."
      items={[
        { t: "Mit acht · Der erste Trick", d: "Zauberkasten zum Geburtstag, die seidene Karte verschwindet. Eine Stunde später sitzt die ganze Familie im Wohnzimmer, ich stehe auf dem Couchtisch." },
        { t: "Mit zwölf · Erster bezahlter Gig", d: "Drei Karten-Tricks, fünfzehn Minuten, dreißig Euro im Umschlag auf einem Kindergeburtstag. Aus dem Hobby wird ein Handwerk." },
        { t: "Vom Hobby zum Beruf", d: "Erste Firmenfeiern, erste Hochzeiten, erste eigene Website. Vom Wohnzimmer in die echten Säle Bayerns — mein offizieller Bühnenstart." },
        { t: "Sep 2023 · Greatest Talent", d: "Casting in München, drei Vorrunden, Live-Finale im Fernsehen. Wer einmal vor TV-Kameras stand, hat keine Bühnenangst mehr." },
        { t: "2024 · Talents of Magic", d: "Einer der härtesten Magie-Wettbewerbe Deutschlands. Finalist plus Kreativpreis für eine selbst entwickelte Mentalmagic-Routine." },
        { t: "2025 · TVA", d: "Live-Studio-Auftritt beim TVA (TV Aktuell): drei Minuten Mentalmagie vor laufender Kamera, mit dem Moderator als Versuchsperson." },
      ]}
    />

    {/* Auszeichnungen */}
    <FactsGrid
      items={[
        { Icon: Tv, k: "Greatest Talent · 2023", v: "Finalist · Live im Fernsehen" },
        { Icon: Trophy, k: "Talents of Magic · 2024", v: "Finalist + Kreativpreis" },
        { Icon: Medal, k: "Dt. Jugendmeisterschaft · 2024", v: "Top 30 von 150+" },
        { Icon: Tv, k: "TVA TV-Auftritt · 2025", v: "Live-Studio-Auftritt" },
      ]}
    />

    {/* Hinter den Kulissen — dunkle Showcase-Section */}
    <DarkShowcase
      eyebrow="Hinter den Kulissen"
      title={<>Üben. Vorbereiten. <span style={{ color: "#9db0ff" }}>Auftreten.</span></>}
      paras={[
        "Mein Probenraum: ein Klapptisch, ein Spiegel, eine Studio-Lampe. Jede Routine wird hundertfach durchgespielt, bis die Hände sie blind beherrschen. Was im Saal lässig aussieht, ist tausend Mal geübt.",
        "Vor jedem Event ein halbstündiger Briefing-Call mit der Gastgeberin: Wer feiert, was ist die Vorgeschichte, welche Anekdote darf rein. Daraus baue ich eine personalisierte Routine, die nur an diesem Abend funktioniert.",
        "Dann der Auftritt. Der Effekt ist zu Ende, drei Sekunden Stille, in denen niemand atmet — dann der Lacher, dann die Standing Ovation. Diese drei Sekunden sind das, weswegen ich seit zehn Jahren morgens um halb sieben aufstehe.",
      ]}
      image={staunenImg}
      imageAlt="Staunen im Publikum — hinter den Kulissen einer Magie-Show"
      imgPos="top"
      badge="Probenraum · 06:30"
    />

    <VideoSection />

    {/* Persönlicher Brief / Final-CTA */}
    <FinalCTA
      title={<>Schreibe mir direkt<span style={{ color: MAGENTA }}>.</span></>}
      sub="Keine Booking-Agentur, keine Manager-Schleife, keine Hotline. Wenn du mich anschreibst, schreibe ich dir zurück — persönlich, meistens innerhalb von 24 Stunden."
    />
  </VoltageShell>
);

export default UeberMich;
