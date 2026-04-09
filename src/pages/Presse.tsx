import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import portraitImg from "@/assets/magician-portrait.jpg";
import stageImg from "@/assets/stage-show.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import staunenImg from "@/assets/staunen.jpg";
import closeupImg from "@/assets/closeup.jpg";
import greatestTalentImg from "@/assets/greatest-talent-presse.jpg";
import talentsTeamImg from "@/assets/talents-of-magic-team.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";
import schneiderWeisseImg from "@/assets/schneider-weisse-closeup.jpg";
import { Award, Tv, Calendar, Globe, Download, FileText, Image, Mail, Star, Users, Mic, Trophy, Newspaper, Quote } from "lucide-react";

/* ── Hero ── */
const HeroPresse = () => (
  <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Presse & Medien</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Emilian Leber in den Medien.
        </h1>
        <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Auftritte, Auszeichnungen, Pressematerial und Portfolio.
          Alles, was Journalisten, Veranstalter und Redaktionen brauchen.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <a href="/Emilian_Leber_Portfolio.pdf" download className="btn-primary inline-flex items-center gap-2">
            <Download className="w-4 h-4" />
            Portfolio herunterladen (PDF)
          </a>
          <a href="mailto:el@magicel.de" className="btn-secondary inline-flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Presseanfrage senden
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ── Kurzprofil ── */
const KurzprofilSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="grid md:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-start">
            <div className="rounded-3xl overflow-hidden aspect-[3/4]">
              <img src={portraitImg} alt="Emilian Leber – Portraitfoto" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <span className="badge-accent mb-6 inline-flex">Kurzprofil</span>
              <h2 className="headline-sub text-foreground mb-6">Emilian Leber</h2>
              <p className="text-body mb-6">
                Emilian Leber ist ein mehrfach ausgezeichneter Zauberkünstler und Entertainer aus Regensburg.
                Mit einer einzigartigen Mischung aus moderner Zauberkunst, Comedy und Charme begeistert er seit
                über 10 Jahren Publikum auf Hochzeiten, Firmenfeiern, Galas und eigenen Showproduktionen wie dem Magic Dinner.
              </p>
              <p className="text-body mb-8">
                Sein Repertoire reicht von interaktiver Close-Up Magie direkt bei den Gästen bis hin zu
                durchkomponierten Bühnenshows für bis zu 500+ Zuschauer. Dabei verbindet er technische Perfektion
                mit echtem Entertainment – professionell, witzig und unvergesslich.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { value: "200+", label: "Events" },
                  { value: "10+", label: "Jahre Erfahrung" },
                  { value: "5.0", label: "Google Sterne" },
                  { value: "4.97", label: "ProvenExpert" },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-2xl bg-background border border-border/20">
                    <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Auftritte & Auszeichnungen ── */
const AufritteSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Highlights</span>
          <h2 className="headline-section text-foreground mb-12">Auftritte & Auszeichnungen.</h2>
          <div className="divide-y divide-border">
            {[
              { icon: Trophy, title: "Kreativpreisträger", desc: "Ausgezeichnet für kreative und innovative Showkonzepte in der Zauberkunst.", year: "2024" },
              { icon: Award, title: "Finalist — Talents of Magic & Greatest Talent", desc: "Zwei der renommiertesten Nachwuchswettbewerbe für Zauberkunst in Deutschland.", year: "2024" },
              { icon: Tv, title: "TV-Auftritte & Showformate", desc: "Talents of Magic, Greatest Talent und TVA Fernsehen", year: "2023–2025" },
              { icon: Mic, title: "Magic Dinner – eigene Showproduktion", desc: "Regelmäßige eigene Dinner-Show-Produktion mit Menü und abendfüllendem Programm.", year: "Laufend" },
              { icon: Calendar, title: "200+ Live-Events", desc: "Auftritte bei DAX-Konzernen, auf Hochzeiten, Galas und exklusiven Privatevents.", year: "Laufend" },
              { icon: Users, title: "Firmenkunden", desc: "Regelmäßig gebucht von Sixt, STRABAG, Sparkasse, Versicherungskammer Bayern, Stadt Regensburg u.v.m.", year: "Laufend" },
              { icon: Globe, title: "Deutschlandweite Buchungen", desc: "Schwerpunkt Bayern — von Regensburg über München bis Nürnberg, sowie deutschlandweit buchbar.", year: "Laufend" },
              { icon: Star, title: "Top-Bewertungen", desc: "Google 5.0 Sterne, ProvenExpert 4.97 Sterne – durchgehend exzellente Bewertungen von Kunden.", year: "Laufend" },
            ].map((item) => (
              <div key={item.title} className="py-8 flex items-start gap-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground">{item.title}</h3>
                    <span className="font-sans text-xs text-muted-foreground shrink-0 mt-1 bg-muted/40 px-2 py-0.5 rounded-full">{item.year}</span>
                  </div>
                  <p className="text-detail mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Presse-Artikel ── */
const PresseArtikelSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">In der Presse</span>
          <h2 className="headline-section text-foreground mb-12">Berichterstattung.</h2>
          <a
            href="https://www.idowa.de/regionen/woerth-und-regensburg/regensburg/aus-kindertraum-wird-buehnenzauber-der-17-jaehrige-magier-emilian-leber-art-349796"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-border/20 bg-background p-6 md:p-8 hover:border-accent/30 transition-all"
          >
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <Newspaper className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">idowa.de · Larissa Axinja Lutz · 5. August 2025</p>
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      Aus Kindertraum wird Bühnenzauber: Der 17-jährige Magier Emilian Leber
                    </h3>
                  </div>
                </div>
                <p className="text-detail mt-3 max-w-2xl">
                  Ausführliches Portrait über Emilians Werdegang — vom Zauberkasten an Weihnachten über YouTube-Tricks
                  bis zu ausgebuchten Shows und TV-Auftritten. Mit Video und Fotos.
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-accent">
                  Artikel lesen →
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

/* ── Pressezitate ── */
const ZitateSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Stimmen</span>
          <h2 className="headline-section text-foreground mb-12">Was andere sagen.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { quote: "Emilian hat unser Firmenevent bereichert — professionell, charmant und auf den Punkt.", author: "Jan von Lehmann", context: "Agenturgruppe Wächter" },
              { quote: "Unsere Hochzeitsgäste sprechen heute noch von der Magie. Absolut empfehlenswert!", author: "Katrin Raß", context: "Hochzeit" },
              { quote: "Das Magic Dinner war ein unvergesslicher Abend — perfekte Mischung aus Show und Genuss.", author: "Sophia Leber", context: "Wald & Wiese, Magic Dinner" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-border/20 bg-background p-6 relative">
                <Quote className="w-8 h-8 text-accent/20 absolute top-4 right-4" />
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">"{item.quote}"</p>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">{item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.context}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Downloads & Pressekit ── */
const DownloadsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Downloads</span>
          <h2 className="headline-section text-foreground mb-4">Pressekit & Material.</h2>
          <p className="text-detail mb-12 max-w-2xl">
            Alle Materialien zur freien Verwendung bei redaktioneller Berichterstattung.
            Bildnachweis: MagicEL / Emilian Leber.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { icon: FileText, title: "Portfolio (PDF)", desc: "Komplettes Portfolio mit Showkonzepten, Referenzen und Preisübersicht.", href: "/Emilian_Leber_Portfolio.pdf", download: true },
              { icon: Image, title: "Pressefotos (HD)", desc: "Hochauflösende Portraitfotos und Eventbilder für Print und Online.", href: "#pressefotos" },
              { icon: Newspaper, title: "Kurzbiografie", desc: "Fertige Biografietexte in verschiedenen Längen für Ihre Publikation.", href: "mailto:el@magicel.de?subject=Anfrage%20Kurzbiografie" },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                {...(item.download ? { download: true } : {})}
                className="group rounded-2xl border border-border/20 bg-muted/10 p-6 hover:bg-muted/30 transition-all hover:border-border/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-accent">
                  <Download className="w-3.5 h-3.5" />
                  {item.download ? "Herunterladen" : "Anfordern"}
                </div>
              </a>
            ))}
          </div>

          {/* Steckbrief */}
          <div className="rounded-2xl border border-border/20 bg-background p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-foreground mb-6">Steckbrief</h3>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-3">
              {[
                ["Name", "Emilian Leber"],
                ["Genre", "Moderner Comedy-Zauberer"],
                ["Formate", "Close-Up, Bühnenshow, Magic Dinner, Moderation"],
                ["Erfahrung", "10+ Jahre, 200+ Events"],
                ["Auszeichnungen", "Kreativpreisträger, Greatest Talent Finalist"],
                ["Region", "Deutschlandweit & international buchbar"],
                ["Basis", "Regensburg, Bayern"],
                ["Bewertungen", "Google 5.0 ★ | ProvenExpert 4.97 ★"],
                ["Web", "www.magicel.de"],
                ["Kontakt", "el@magicel.de"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3 py-2 border-b border-border/10 last:border-0">
                  <span className="text-sm text-muted-foreground font-medium w-28 shrink-0">{label}</span>
                  <span className="text-sm text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Pressefotos ── */
const FotosSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" id="pressefotos" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-4">Pressefotos.</h2>
          <p className="text-detail">
            Zur freien Verwendung bei redaktioneller Berichterstattung.
            Bildnachweis: MagicEL / Emilian Leber. Für hochauflösende Versionen kontaktieren Sie mich direkt.
          </p>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[
            { src: portraitImg, label: "Portrait", pos: "object-top" },
            { src: stageImg, label: "Bühnenshow", pos: "object-center" },
            { src: heroImg, label: "Performance", pos: "object-center" },
            { src: staunenImg, label: "Publikum", pos: "object-top" },
            { src: closeupImg, label: "Close-Up Magie", pos: "object-center" },
            { src: greatestTalentImg, label: "Greatest Talent", pos: "object-center" },
            { src: talentsTeamImg, label: "Talents of Magic Team", pos: "object-center" },
            { src: buehneDpsgImg, label: "Bühne DPSG", pos: "object-top" },
            { src: schneiderWeisseImg, label: "Schneider Weisse Close-Up", pos: "object-top" },
          ].map((img, i) => (
            <div key={i} className="group rounded-2xl overflow-hidden aspect-[4/3] relative">
              <img src={img.src} alt={`Pressefoto – ${img.label}`} className={`w-full h-full object-cover ${img.pos} group-hover:scale-105 transition-transform duration-500`} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Page ── */
const Presse = () => (
  <>
    <Helmet>
      <title>Presse – Emilian Leber | Pressekit &amp; Medien</title>
      <meta
        name="description"
        content="Presseinfos, Medienauftritte und Pressekit von Zauberer Emilian Leber. Portfolio-Download, Pressefotos und Infomaterial für Journalisten und Redaktionen."
      />
      <link rel="canonical" href="https://www.magicel.de/presse" />
      <meta property="og:title" content="Presse – Emilian Leber | Pressekit & Medien" />
      <meta property="og:description" content="Presseinfos, Medienauftritte und Pressekit von Zauberer Emilian Leber. Portfolio-Download, Pressefotos und Infomaterial für Journalisten und Redaktionen." />
      <meta property="og:url" content="https://www.magicel.de/presse" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Presse – Emilian Leber | Pressekit & Medien" />
      <meta name="twitter:description" content="Presseinfos, Medienauftritte und Pressekit von Zauberer Emilian Leber. Portfolio-Download, Pressefotos und Infomaterial für Journalisten und Redaktionen." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"Presse & Medien – Emilian Leber","description":"Presseinfos, Medienauftritte und Pressekit von Zauberer Emilian Leber.","url":"https://www.magicel.de/presse"})}</script>
    </Helmet>
    <PageLayout>
      <HeroPresse />
      <KurzprofilSection />
      <AufritteSection />
      <PresseArtikelSection />
      <ZitateSection />
      <DownloadsSection />
      <FotosSection />
      <BookingCTA headline={"Presseanfrage?"} subline="Ob Interview, Feature, Kooperation oder Berichterstattung – ich freue mich auf Ihre Anfrage." buttonText="Kontakt aufnehmen" />
    </PageLayout>
  </>
);

export default Presse;
