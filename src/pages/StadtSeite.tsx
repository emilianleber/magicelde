import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staedte, type KollegenEmpfehlung } from "@/data/staedte";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/staunen.jpg";
import dinnerImg from "@/assets/emilian-magic-dinner.jpg";
import { Star, ArrowRight, Users, Sparkles, Building2, MapPin, Calendar, PartyPopper, Heart, Briefcase, Cake, GraduationCap, HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const StadtSeite = () => {
  const { stadt } = useParams<{ stadt: string }>();
  const data = staedte.find((s) => s.slug === stadt);
  if (!data) return <Navigate to="/404" replace />;

  const faqSchema = data.faq?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faq.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  } : null;

  return (
    <PageLayout>
      <Helmet>
        <title>Zauberer {data.name} – Emilian Leber | Zaubershow, Close-Up &amp; Magic Dinner</title>
        <meta
          name="description"
          content={`Zauberer in ${data.name}: Emilian Leber begeistert mit interaktiver Close-Up Magie, Comedy-Zaubershow & Magic Dinner auf Hochzeiten, Firmenfeiern und Events in ${data.name}. Jetzt unverbindlich anfragen!`}
        />
        <link rel="canonical" href={`https://www.magicel.de/zauberer/${data.slug}`} />
        <meta property="og:title" content={`Zauberer ${data.name} – Emilian Leber | Zaubershow & Magie`} />
        <meta property="og:description" content={`Zauberer in ${data.name}: Emilian Leber begeistert mit interaktiver Magie & Comedy auf Hochzeiten, Firmenfeiern und Events.`} />
        <meta property="og:url" content={`https://www.magicel.de/zauberer/${data.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Zauberer ${data.name} – Emilian Leber`} />
        <meta name="twitter:description" content={`Zauberer in ${data.name}: Emilian Leber begeistert mit interaktiver Magie & Comedy auf Hochzeiten, Firmenfeiern und Events.`} />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Emilian Leber – Zauberer & Showkünstler",
          "url": `https://www.magicel.de/zauberer/${data.slug}`,
          "description": `Zauberer in ${data.name}: Interaktive Close-Up Magie, Bühnenshow & Magic Dinner auf Hochzeiten, Firmenfeiern und Events.`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": data.name,
            "addressRegion": data.region,
            "addressCountry": data.region === "Österreich" ? "AT" : "DE"
          },
          "priceRange": "€€€",
          "telephone": "+4915563744696",
          "email": "el@magicel.de",
          "image": "https://www.magicel.de/og-image.jpg",
          "sameAs": [
            "https://www.instagram.com/emilian.leber",
          ],
          "areaServed": {
            "@type": "City",
            "name": data.name
          },
          "serviceType": ["Zauberer", "Close-Up Magie", "Bühnenshow", "Magic Dinner", "Entertainer", "Zauberkünstler"]
        })}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>
      <HeroStadt name={data.name} intro={data.intro} region={data.region} />
      <HighlightSection name={data.name} highlight={data.highlight} seoText={data.seoText} />
      <LeistungenSection name={data.name} />
      <AnlaesseSection name={data.name} />
      {data.bekannteLocations && data.bekannteLocations.length > 0 && (
        <LocationsSection name={data.name} locations={data.bekannteLocations} />
      )}
      <WarumSection name={data.name} />
      <TestimonialStadt name={data.name} />
      {data.faq && data.faq.length > 0 && (
        <FAQSection name={data.name} faq={data.faq} />
      )}
      {data.kollegenEmpfehlung && (
        <KollegenEmpfehlungSection empfehlung={data.kollegenEmpfehlung} />
      )}
      <BookingCTA headline={`Zauberer für\n${data.name}.`} subline={`Sichere dir deinen Termin in ${data.name} — ich berate dich persönlich und unverbindlich.`} />
      <WeitereStaedte current={data.slug} />
    </PageLayout>
  );
};

/* ─── Hero ─── */
const HeroStadt = ({ name, intro, region }: { name: string; intro: string; region: string }) => (
  <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Zauberer {name}
          </span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Zauberer in {name}.
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          {intro}
        </p>
        <p className="text-sm text-muted-foreground mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          {region} {region !== "Österreich" ? "·" : ""} {region !== "Österreich" && "Deutschland"} · Close-Up Magie · Bühnenshow · Magic Dinner
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary group">
            Jetzt unverbindlich anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#showkonzepte" className="btn-secondary">
            Showkonzepte entdecken
          </a>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={heroImg} alt={`Zauberer Emilian Leber auf einem Event in ${name}`} className="w-full h-[400px] md:h-[500px] object-cover object-top" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-8">
          <p className="font-sans text-sm text-background/80">Emilian Leber — Zauberkünstler & Entertainer für {name}</p>
        </div>
      </div>
    </div>
  </section>
);

/* ─── Highlight / SEO Text ─── */
const HighlightSection = ({ name, highlight, seoText }: { name: string; highlight: string; seoText?: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-8">Warum einen Zauberer in {name} buchen?</h2>
          <p className="text-body max-w-xl mx-auto mb-8">{highlight}</p>
          {seoText && (
            <p className="text-detail max-w-xl mx-auto leading-relaxed">{seoText}</p>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── Showkonzepte ─── */
const LeistungenSection = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref} id="showkonzepte">
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground">Showkonzepte für Events in {name}.</h2>
          <p className="text-detail max-w-xl mx-auto mt-4">Drei bewährte Formate, die dein Event in {name} unvergesslich machen — individuell anpassbar an deinen Anlass.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: closeupImg, title: "Close-Up Magie", desc: `Interaktive Tischzauberei direkt bei deinen Gästen in ${name} — der perfekte Eisbrecher für Empfänge, Dinner und Networking-Events.`, link: "/close-up", features: ["Direkt an den Tischen", "1-2 Stunden", "Ideal für 20-200 Gäste"] },
            { img: stageImg, title: "Bühnenshow", desc: `Eine durchkomponierte Comedy-Zaubershow für dein Event in ${name} — mit Publikumsinteraktion und Wow-Momenten.`, link: "/buehnenshow", features: ["30-60 Minuten", "Mit Ton & Licht", "Ideal ab 50 Gästen"] },
            { img: dinnerImg, title: "Magic Dinner", desc: `Dinner und Magie vereint — ein exklusives Erlebnis für besondere Anlässe in ${name}. Mehrere Gänge, mehrere Shows.`, link: "/magic-dinner", features: ["Kompletter Abend", "Dinner + Show", "Exklusiv & intim"] },
          ].map((k, i) => (
            <Link to={k.link} key={k.title} className={`group relative rounded-3xl overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <img src={k.img} alt={`${k.title} — Zauberer ${name}`} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-3">{k.title}</h3>
                <p className="font-sans text-sm text-background/70 leading-relaxed max-w-xs mb-4">{k.desc}</p>
                <ul className="space-y-1">
                  {k.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-background/60">
                      <CheckCircle2 className="w-3 h-3 text-accent/70 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Anlässe ─── */
const AnlaesseSection = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const anlaesse = [
    { icon: Briefcase, title: "Firmenfeiern", keyword: `Zauberer Firmenfeier ${name}`, desc: `Weihnachtsfeiern, Sommerfeste, Jubiläen, Kick-offs — ich bringe Entertainment zu eurer Firmenfeier in ${name}. Professionell, modern und perfekt abgestimmt auf eure Unternehmenskultur.` },
    { icon: Heart, title: "Hochzeiten", keyword: `Zauberer Hochzeit ${name}`, desc: `Sektempfang, Dinner, Party — ich sorge auf eurer Hochzeit in ${name} für magische Momente, die eure Gäste nie vergessen werden. Charmant, interaktiv und voller Überraschungen.` },
    { icon: Cake, title: "Geburtstage", keyword: `Zauberer Geburtstag ${name}`, desc: `Ob runder Geburtstag, Überraschungsparty oder Familienfeier in ${name} — ich mache deinen besonderen Tag noch besonderer. Für Erwachsene und ältere Jugendliche.` },
    { icon: Building2, title: "Galas & Bälle", keyword: `Entertainer Gala ${name}`, desc: `Exklusive Galas, Charity-Events und Bälle in ${name} verdienen Entertainment auf höchstem Niveau. Elegante Magie, die zum Anlass passt.` },
    { icon: GraduationCap, title: "Messen & Kongresse", keyword: `Zauberer Messe ${name}`, desc: `Messeauftritte, Standprogramme und Kongress-Entertainment in ${name} — ich ziehe Besucher an euren Stand und mache eure Marke unvergesslich.` },
    { icon: PartyPopper, title: "Private Feiern", keyword: `Zauberer buchen ${name}`, desc: `Jeder besondere Anlass verdient besondere Unterhaltung. Ob Jubiläum, Einweihung oder einfach weil — ich komme zu dir nach ${name}.` },
  ];

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Anlässe</span>
          <h2 className="headline-section text-foreground">Für jeden Anlass in {name} der richtige Zauberer.</h2>
          <p className="text-detail max-w-xl mx-auto mt-4">Egal ob Firmenfeier, Hochzeit oder Geburtstagsparty — ich passe mein Programm individuell an deinen Anlass und deine Gäste in {name} an.</p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {anlaesse.map((item, i) => (
            <div key={item.title} className="p-8 rounded-3xl bg-muted/40 hover:bg-muted/60 transition-colors" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <item.icon className="w-8 h-8 text-accent mb-5" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Bekannte Locations ─── */
const LocationsSection = ({ name, locations }: { name: string; locations: string[] }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Locations
          </span>
          <h2 className="headline-section text-foreground">Beliebte Event-Locations in {name}.</h2>
          <p className="text-detail max-w-xl mx-auto mt-4">Ich trete in den bekanntesten Locations und Venues in {name} auf — und komme natürlich auch zu deiner Wunsch-Location.</p>
        </div>
        <div className={`flex flex-wrap justify-center gap-3 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {locations.map((loc) => (
            <span key={loc} className="font-sans text-sm text-foreground/80 px-5 py-3 rounded-full bg-background border border-border/40 hover:border-accent/30 transition-colors">
              {loc}
            </span>
          ))}
        </div>
        <div className={`max-w-xl mx-auto text-center mt-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.25s" }}>
          <p className="text-detail text-sm">
            Deine Location ist nicht dabei? Kein Problem — ich komme zu jedem Veranstaltungsort in {name} und Umgebung. <Link to="/buchung" className="text-accent hover:underline">Jetzt anfragen →</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Warum Emilian ─── */
const WarumSection = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Warum Emilian Leber als Zauberer in {name}?</h2>
          <p className="text-detail max-w-xl mx-auto">Nicht irgendein Zauberer — sondern ein Entertainer, der dein Event in {name} auf das nächste Level hebt.</p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Sparkles, title: "Modernes Entertainment", desc: "Keine Klischees, keine Hasen aus dem Hut — moderner Comedy-Zauberer mit Premium-Qualität und Stil." },
            { icon: Users, title: "Für 10 bis 1.000 Gäste", desc: `Ob kleine Feier oder große Gala in ${name} — das Programm wird perfekt auf deine Gästezahl abgestimmt.` },
            { icon: Building2, title: "100% Zuverlässig", desc: "Professionelle Planung, pünktliches Erscheinen, brillante Performance — garantiert." },
            { icon: Calendar, title: "Persönliche Beratung", desc: "Jedes Event ist individuell. Ich berate dich persönlich und kostenlos — von der Idee bis zum Showkonzept." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-3xl bg-muted/40 text-center">
              <item.icon className="w-7 h-7 text-accent mx-auto mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Testimonials ─── */
const realTestimonials = [
  { quote: "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier. Alle sprechen noch Wochen danach davon!", author: "Martina Senftl", role: "Hochzeit", source: "ProvenExpert" },
  { quote: "Es war genial, perfekt und mega gut!!! Die Gäste waren begeistert, die Kinder fanden es toll und wir auch!", author: "Petra Zeitler", role: "Firmenfeier", source: "ProvenExpert" },
  { quote: "Emilian hat unseren 50. Geburtstag unvergesslich gemacht. Die Mischung aus Close-Up und Bühnenshow war perfekt.", author: "Christina", role: "Geburtstagsfeier", source: "ProvenExpert" },
];

const TestimonialStadt = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const picked = realTestimonials;
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Das sagen Kunden.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {picked.map((t, i) => (
            <blockquote key={i} className={`p-8 rounded-3xl bg-background border border-border/30 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/60">{t.source}</span>
              </div>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-5">„{t.quote}"</p>
              <footer>
                <p className="font-sans text-sm font-semibold text-foreground">{t.author}</p>
                <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
const FAQSection = ({ name, faq }: { name: string; faq: { q: string; a: string }[] }) => {
  const { ref, isVisible } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5" /> FAQ
          </span>
          <h2 className="headline-section text-foreground">Häufige Fragen: Zauberer in {name}.</h2>
        </div>
        <div className={`max-w-2xl mx-auto space-y-3 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {faq.map((item, i) => (
            <div key={i} className="rounded-2xl border border-border/40 bg-background overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
              >
                <h3 className="font-display text-base font-semibold text-foreground pr-4">{item.q}</h3>
                {openIndex === i ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-detail text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Kollegen-Empfehlung (subtil, SEO-Link-Austausch) ─── */
const KollegenEmpfehlungSection = ({ empfehlung }: { empfehlung: KollegenEmpfehlung }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-medium" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-detail text-sm leading-relaxed text-muted-foreground text-center">
            {empfehlung.prefix}
            <a
              href={empfehlung.linkHref}
              target="_blank"
              rel="noopener"
              className="text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-accent transition-colors"
            >
              {empfehlung.linkText}
            </a>
            {empfehlung.suffix}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Weitere Städte ─── */
const WeitereStaedte = ({ current }: { current: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const currentData = staedte.find((s) => s.slug === current);
  const sameRegion = staedte.filter((s) => s.slug !== current && s.region === currentData?.region).slice(0, 6);
  const otherRegions = staedte.filter((s) => s.slug !== current && s.region !== currentData?.region).slice(0, 6);
  const others = [...sameRegion, ...otherRegions].slice(0, 12);

  return (
    <section className="section-medium section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-sub text-foreground">Zauberer auch in deiner Stadt.</h2>
          <p className="text-detail max-w-xl mx-auto mt-3">Neben {currentData?.name} trete ich in ganz {currentData?.region === "Österreich" ? "Österreich" : "Deutschland"} auf — hier eine Auswahl.</p>
        </div>
        <div className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {others.map((s) => (
            <Link key={s.slug} to={`/zauberer/${s.slug}`} className="font-sans text-sm text-muted-foreground hover:text-accent transition-colors px-4 py-2 rounded-full bg-background hover:bg-accent/5 border border-border/30">
              Zauberer {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StadtSeite;
