import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { staedte } from "@/data/staedte";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import { Star, ArrowRight, Users, Sparkles, Building2 } from "lucide-react";

const StadtSeite = () => {
  const { stadt } = useParams<{ stadt: string }>();
  const data = staedte.find((s) => s.slug === stadt);
  if (!data) return <Navigate to="/404" replace />;

  return (
    <PageLayout>
      <Helmet>
        <title>Zauberer {data.name} – Emilian Leber | Zaubershow &amp; Magie</title>
        <meta
          name="description"
          content={`Zauberer in ${data.name}: Emilian Leber begeistert mit interaktiver Magie & Comedy auf Hochzeiten, Firmenfeiern und Events. Jetzt unverbindlich anfragen!`}
        />
        <link rel="canonical" href={`https://www.magicel.de/zauberer/${data.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Emilian Leber – Zauberer & Showkünstler",
          "url": `https://www.magicel.de/zauberer/${data.slug}`,
          "description": `Zauberer in ${data.name}: Interaktive Magie & Comedy auf Hochzeiten, Firmenfeiern und Events.`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": data.name,
            "addressCountry": "DE"
          }
        })}</script>
      </Helmet>
      <HeroStadt name={data.name} intro={data.intro} />
      <HighlightSection name={data.name} highlight={data.highlight} />
      <LeistungenSection name={data.name} />
      <WarumSection name={data.name} />
      <TestimonialStadt name={data.name} />
      <ProcessSteps />
      <BookingCTA headline={`Zauberer für\n${data.name}.`} subline={`Sichere dir deinen Termin in ${data.name} — ich berate dich persönlich und unverbindlich.`} />
      <WeitereStaedte current={data.slug} />
    </PageLayout>
  );
};

const HeroStadt = ({ name, intro }: { name: string; intro: string }) => (
  <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Zauberer {name}</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Zauberer in {name}.
        </h1>
        <p className="text-body max-w-2xl mx-auto mb-12 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          {intro}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up" style={{ animationDelay: "0.65s" }}>
          <Link to="/buchung" className="btn-primary group">
            Jetzt anfragen <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto mt-20 opacity-0 animate-scale-up" style={{ animationDelay: "0.85s" }}>
        <img src={heroImg} alt={`Zauberer in ${name}`} className="w-full h-[400px] md:h-[500px] object-cover" />
      </div>
    </div>
  </section>
);

const HighlightSection = ({ name, highlight }: { name: string; highlight: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-8">Warum {name}?</h2>
          <p className="text-body max-w-xl mx-auto">{highlight}</p>
        </div>
      </div>
    </section>
  );
};

const LeistungenSection = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground">Showkonzepte für {name}.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { img: closeupImg, title: "Close-Up Magie", desc: `Interaktive Magie direkt bei deinen Gästen in ${name} — der perfekte Eisbrecher.`, link: "/close-up" },
            { img: stageImg, title: "Bühnenshow", desc: `Eine durchkomponierte Show für dein Event in ${name} — mit Comedy und Wow-Momenten.`, link: "/buehnenshow" },
            { img: heroImg, title: "Magic Dinner", desc: `Dinner und Magie vereint — ein exklusives Erlebnis für besondere Anlässe in ${name}.`, link: "/magic-dinner" },
          ].map((k, i) => (
            <Link to={k.link} key={k.title} className={`group relative rounded-3xl overflow-hidden aspect-[3/4] ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <img src={k.img} alt={k.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-3">{k.title}</h3>
                <p className="font-sans text-sm text-background/70 leading-relaxed max-w-xs">{k.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const WarumSection = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Warum Emilian Leber in {name}?</h2>
        </div>
        <div className={`grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Sparkles, title: "Modernes Entertainment", desc: "Keine Klischees — moderner Comedy-Zauberer mit Premium-Qualität." },
            { icon: Users, title: "Für jeden Anlass", desc: `Firmenfeiern, Hochzeiten, Geburtstage und mehr in ${name}.` },
            { icon: Building2, title: "Zuverlässig", desc: "Professionelle Planung, pünktliches Erscheinen, brillante Performance." },
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

const TestimonialStadt = ({ name }: { name: string }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <blockquote>
            <div className="flex gap-0.5 justify-center mb-6">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-accent/70 text-accent/70" />)}
            </div>
            <p className="font-sans text-xl text-foreground leading-relaxed mb-8">
              „Emilian hat unser Event in {name} unvergesslich gemacht. Professionell, charmant,
              witzig und absolut verblüffend. Wir buchen ihn wieder!"
            </p>
            <footer>
              <p className="font-sans text-base font-semibold text-foreground">Begeisterter Kunde</p>
              <p className="font-sans text-sm text-muted-foreground">Event in {name}</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

const WeitereStaedte = ({ current }: { current: string }) => {
  const { ref, isVisible } = useScrollReveal();
  const others = staedte.filter((s) => s.slug !== current).slice(0, 8);
  return (
    <section className="section-medium section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-sub text-foreground">Auch in deiner Stadt.</h2>
        </div>
        <div className={`flex flex-wrap justify-center gap-3 max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {others.map((s) => (
            <Link key={s.slug} to={`/zauberer/${s.slug}`} className="font-sans text-sm text-muted-foreground hover:text-accent transition-colors px-4 py-2 rounded-full bg-background hover:bg-accent/5">
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StadtSeite;
