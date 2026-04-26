import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { TrustStrip, ClientLogos } from "@/components/landing/TrustElements";
import { Star } from "lucide-react";
import heroImg from "@/assets/hero-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/schneider-weisse-closeup.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import emotionenImg from "@/assets/emotionen.jpg";
import buehneDpsgImg from "@/assets/buehne-dpsg.jpg";

const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-gradient glow-number tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-white/60 mt-3">{label}</p>
    </div>
  );
};

const HeroRef = () => (
  <section className="section-dark relative min-h-[70vh] flex flex-col justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(225 80% 20% / 0.5) 0%, #08080d 70%)" }}>
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Referenzen</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-white" style={{ animationDelay: "0.3s" }}>
          Das sagen <span className="text-gradient">Kunden</span>.
        </h1>
        <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up text-white/70" style={{ animationDelay: "0.5s" }}>
          Über 200 Events, 5,0 Sterne Durchschnitt und 100% Weiterempfehlung.
          Echte Stimmen von echten Kunden — ungefiltert und authentisch.
        </p>
      </div>
      <div className="mt-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.7s" }}>
        <TrustStrip dark />
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="section-dark py-24" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(225 80% 20% / 0.3) 0%, #08080d 70%)" }}>
    <div className="container px-6">
      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        <StatItem end={200} suffix="+" label="Events" />
        <StatItem end={100} suffix="%" label="Weiterempfehlung" />
        <StatItem end={10} suffix="+" label="Jahre" />
      </div>
    </div>
  </section>
);

const testimonials = [
  { quote: "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier. Alle sprechen noch Wochen danach davon!", author: "Martina Senftl", role: "Hochzeit", source: "ProvenExpert" },
  { quote: "Es war genial, perfekt und mega gut!!! Die Gäste waren begeistert, die Kinder fanden es toll und wir auch!", author: "Petra Zeitler", role: "Firmenfeier", source: "ProvenExpert" },
  { quote: "Emilian hat unseren 50. Geburtstag unvergesslich gemacht. Die Mischung aus Close-Up und Bühnenshow war perfekt.", author: "Christina", role: "Geburtstagsfeier", source: "ProvenExpert" },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Echte Stimmen.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={`p-8 rounded-3xl bg-muted/40 border border-border/30 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
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

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Eindrücke.</h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[
            { src: heroImg, alt: "Live Performance", className: "col-span-2 row-span-2" },
            { src: buehneZuschauerImg, alt: "Publikum" },
            { src: emotionenImg, alt: "Corporate Event" },
            { src: buehneDpsgImg, alt: "Live Show" },
            { src: stageImg, alt: "Bühne" },
          ].map((img, i) => (
            <div key={i} className={`${img.className || ""} rounded-2xl overflow-hidden group`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Referenzen = () => (
  <PageLayout>
    <Helmet>
      <title>Referenzen & Bewertungen – Emilian Leber Zauberer</title>
      <meta name="description" content="Über 200 Events, 5,0 Sterne Durchschnitt. Echte Bewertungen von Hochzeiten, Firmenfeiern und Events." />
      <link rel="canonical" href="https://www.magicel.de/referenzen" />
      <meta property="og:title" content="Referenzen & Bewertungen – Emilian Leber Zauberer" />
      <meta property="og:description" content="Über 200 Events, 5,0 Sterne Durchschnitt. Echte Bewertungen von Hochzeiten, Firmenfeiern und Events." />
      <meta property="og:url" content="https://www.magicel.de/referenzen" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Referenzen & Bewertungen – Emilian Leber Zauberer" />
      <meta name="twitter:description" content="Über 200 Events, 5,0 Sterne Durchschnitt. Echte Bewertungen von Hochzeiten, Firmenfeiern und Events." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Emilian Leber – Zauberer & Showkünstler",
        "url": "https://www.magicel.de",
        "telephone": "+4915563744696",
        "email": "el@magicel.de",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "34"
        },
        "review": [
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Martina Senftl" }, "reviewBody": "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier. Alle sprechen noch Wochen danach davon!" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Petra Zeitler" }, "reviewBody": "Es war genial, perfekt und mega gut!!! Die Gäste waren begeistert, die Kinder fanden es toll und wir auch!" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Christina" }, "reviewBody": "Emilian hat unseren 50. Geburtstag unvergesslich gemacht. Die Mischung aus Close-Up und Bühnenshow war perfekt." }
        ]
      })}</script>
    </Helmet>
    <HeroRef />
    <TestimonialsSection />
    <StatsSection />
    <ClientLogos />
    <GalerieSection />
    <BookingCTA headline={"Überzeugt?"} subline="Werde Teil der Liste — erzähl mir von deinem Event und lass uns gemeinsam etwas Unvergessliches schaffen." />
  </PageLayout>
);

export default Referenzen;
