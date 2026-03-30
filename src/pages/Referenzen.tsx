import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { TrustStrip, ClientLogos, TrustSection } from "@/components/landing/TrustElements";
import { Star } from "lucide-react";
import heroImg from "@/assets/hero-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/stage-show.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import corporateImg from "@/assets/corporate-event.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";

const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const HeroRef = () => (
  <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Referenzen</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Das sagen Kunden.
        </h1>
        <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Über 500 Events, 4.9 Sterne Durchschnitt und 100% Weiterempfehlung.
          Echte Stimmen von echten Kunden — ungefiltert und authentisch.
        </p>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="pb-24">
    <div className="container px-6">
      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        <StatItem end={500} suffix="+" label="Events" />
        <StatItem end={100} suffix="%" label="Weiterempfehlung" />
        <StatItem end={10} suffix="+" label="Jahre" />
      </div>
    </div>
  </section>
);

const testimonials = [
  { quote: "Emilian hat unsere Firmenfeier zu einem unvergesslichen Abend gemacht. Die Gäste reden heute noch davon — und wir buchen ihn jedes Jahr wieder!", author: "Thomas K.", role: "Geschäftsführer, Automobilbranche" },
  { quote: "So eine intime, verblüffende Magie habe ich noch nie erlebt. Perfekt für unseren Empfang.", author: "Sarah M.", role: "Eventmanagerin" },
  { quote: "Cool, modern, witzig — genau unser Ding. Kein verstaubter Zauberer, sondern echtes Premium-Entertainment.", author: "Marc L.", role: "Marketing Director" },
  { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang. Es war der perfekte Eisbrecher!", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
  { quote: "Die perfekte Balance zwischen Eleganz, Humor und absolutem Staunen.", author: "Julia & Thomas", role: "Hochzeit am Bodensee" },
  { quote: "Professionell, zuverlässig, unglaublich unterhaltsam. Die Mitarbeiter fragen Monate vorher, ob er wieder kommt.", author: "Michael B.", role: "HR Director, Finance" },
  { quote: "Mein 30. war dank Emilian ein Abend, den keiner vergisst!", author: "Lisa R.", role: "Geburtstagsfeier München" },
  { quote: "Wir können es jedem Brautpaar empfehlen! Modern, stilvoll und absolut verblüffend.", author: "Anna & Felix", role: "Hochzeit in Stuttgart" },
  { quote: "Emilian hat unser Firmenevent auf ein neues Level gehoben. Standing Ovation von 300 Gästen!", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologie" },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Echte Stimmen.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <blockquote key={i} className={`p-8 rounded-3xl bg-background ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-accent/70 text-accent/70" />)}
              </div>
              <p className="font-sans text-sm text-foreground leading-relaxed mb-5">„{t.quote}"</p>
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
            { src: audienceImg, alt: "Publikum" },
            { src: corporateImg, alt: "Corporate Event" },
            { src: weddingImg, alt: "Hochzeit" },
            { src: stageImg, alt: "Bühne" },
          ].map((img, i) => (
            <div key={i} className={`${img.className || ""} rounded-2xl overflow-hidden group`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
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
      <meta name="description" content="Über 500 Events, 4.9 Sterne Durchschnitt. Echte Bewertungen von Hochzeiten, Firmenfeiern und Events." />
      <link rel="canonical" href="https://www.magicel.de/referenzen" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Emilian Leber – Zauberer & Showkünstler",
        "url": "https://www.magicel.de",
        "telephone": "+4915563744696",
        "email": "el@magicel.de",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "reviewCount": "34"
        },
        "review": [
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Thomas K." }, "reviewBody": "Emilian hat unsere Firmenfeier zu einem unvergesslichen Abend gemacht. Die Gäste reden heute noch davon — und wir buchen ihn jedes Jahr wieder!" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Sarah M." }, "reviewBody": "So eine intime, verblüffende Magie habe ich noch nie erlebt. Perfekt für unseren Empfang." },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Marc L." }, "reviewBody": "Cool, modern, witzig — genau unser Ding. Kein verstaubter Zauberer, sondern echtes Premium-Entertainment." },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Lena & Markus" }, "reviewBody": "Unsere Gäste reden heute noch über die Magie beim Empfang. Es war der perfekte Eisbrecher!" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Julia & Thomas" }, "reviewBody": "Die perfekte Balance zwischen Eleganz, Humor und absolutem Staunen." },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Michael B." }, "reviewBody": "Professionell, zuverlässig, unglaublich unterhaltsam. Die Mitarbeiter fragen Monate vorher, ob er wieder kommt." },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Lisa R." }, "reviewBody": "Mein 30. war dank Emilian ein Abend, den keiner vergisst!" },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Anna & Felix" }, "reviewBody": "Wir können es jedem Brautpaar empfehlen! Modern, stilvoll und absolut verblüffend." },
          { "@type": "Review", "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }, "author": { "@type": "Person", "name": "Dr. Stefan R." }, "reviewBody": "Emilian hat unser Firmenevent auf ein neues Level gehoben. Standing Ovation von 300 Gästen!" }
        ]
      })}</script>
    </Helmet>
    <HeroRef />
    <TrustStrip />
    <StatsSection />
    <TrustSection />
    <TestimonialsSection />
    <ClientLogos />
    <GalerieSection />
    <BookingCTA headline={"Überzeugt?"} subline="Werde Teil der Liste — erzähl mir von deinem Event und lass uns gemeinsam etwas Unvergessliches schaffen." />
  </PageLayout>
);

export default Referenzen;
