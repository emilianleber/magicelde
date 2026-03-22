import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import USPSection from "@/components/landing/USPSection";
import ShowkonzepteSection from "@/components/landing/ShowkonzepteSection";
import AnlassSection from "@/components/landing/AnlassSection";
import UeberMichSection from "@/components/landing/UeberMichSection";
import ErfolgeSection from "@/components/landing/ErfolgeSection";
import GalerieSection from "@/components/landing/GalerieSection";
import CTASection from "@/components/landing/CTASection";
import ProcessSteps from "@/components/landing/ProcessSteps";
import Footer from "@/components/landing/Footer";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import BackgroundHero from "@/components/landing/BackgroundHero";
import Chatbot from "@/components/landing/Chatbot";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import AnlassSection from "@/components/landing/AnlassSection";
import UeberMichSection from "@/components/landing/UeberMichSection";
import ErfolgeSection from "@/components/landing/ErfolgeSection";
import GalerieSection from "@/components/landing/GalerieSection";
import CTASection from "@/components/landing/CTASection";
import ProcessSteps from "@/components/landing/ProcessSteps";
import Footer from "@/components/landing/Footer";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import weddingImg from "@/assets/wedding-magic.jpg";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import { Laugh, Wand2, Zap, Star, ArrowRight, Users, Heart, Sparkles, MessageCircle, Shield, Clock, Check } from "lucide-react";

/* ─── 1. Video Hero ─── */
const VideoHeroSection = () => (
  <div className="opacity-0 animate-scale-up max-w-5xl mx-auto mt-20" style={{ animationDelay: "0.85s" }}>
    <VideoHero
      posterSrc={heroImg}
      videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
      alt="MagicEL — Comedy-Zauberer Emilian Leber Live-Performance"
    />
  </div>
);

/* ─── 3. Social Proof / Zahlen ─── */
const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const SocialProofSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-medium" ref={ref}>
      <div className="container px-6">
        <div className={`flex flex-wrap justify-center gap-16 md:gap-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <StatItem end={500} suffix="+" label="Events" />
          <StatItem end={10} suffix="+" label="Jahre Erfahrung" />
          <StatItem end={100} suffix="%" label="Weiterempfehlung" />
          <StatItem end={50} suffix="+" label="5-Sterne Bewertungen" />
        </div>
      </div>
    </section>
  );
};

/* ─── 5. Showformate Slider ─── */
const ShowformateSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  const formate = [
    { img: closeupImg, title: "Close-Up Magie", sub: "Direkt bei deinen Gästen", desc: "Interaktive Magie zum Anfassen — perfekt als Eisbreaker bei Empfängen, Networking-Events und Dinner-Begleitung.", link: "/close-up" },
    { img: stageImg, title: "Bühnenshow", sub: "Das zentrale Highlight", desc: "Eine durchkomponierte Performance mit Dramaturgie, Comedy und Momenten, die ein ganzes Publikum gleichzeitig zum Staunen bringen.", link: "/buehnenshow" },
    { img: heroImg, title: "Magic Dinner", sub: "Kulinarik trifft Magie", desc: "Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und exklusiv. Jeder Gang wird zum Event.", link: "/magic-dinner" },
    { img: audienceImg, title: "Walking Act", sub: "Frei & spontan", desc: "Magie zwischen den Gästen — locker, witzig und der perfekte Gesprächsstarter für jede Veranstaltung.", link: "/buchung" },
    { img: corporateImg, title: "Individuelles Konzept", sub: "Maßgeschneidert", desc: "Angepasst auf eure Marke, eure Botschaft, euer Event — inklusive Einbindung von Firmeninhalten und persönlichen Elementen.", link: "/buchung" },
  ];

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground mb-6">Fünf Formate. Ein Versprechen.</h2>
          <p className="text-body max-w-xl mx-auto">
            Jedes Showformat ist einzigartig — und wird individuell auf dein Event abgestimmt.
            Vom intimen Tischmoment bis zur großen Bühnenperformance.
          </p>
        </div>
        <HorizontalSlider
          items={formate.map((f) => ({
            content: (
              <Link to={f.link} className="group block">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] relative">
                  <img src={f.img} alt={f.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-background/50 mb-3">{f.sub}</p>
                    <h3 className="font-display text-2xl font-bold text-background mb-3">{f.title}</h3>
                    <p className="font-sans text-sm text-background/70 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Link>
            ),
          }))}
        />
      </div>
    </section>
  );
};

/* ─── 7. Comedy + Magie ─── */
const ComedySection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-primary mb-8 inline-flex">Comedy + Magie</span>
            <h2 className="headline-section text-foreground mb-6">
              Warum Comedy-Magie so gut funktioniert.
            </h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Die Kombination aus moderner Zauberkunst und cleverem Humor erzeugt
                eine einzigartige Dynamik: Deine Gäste staunen UND lachen.
              </p>
              <p>
                Das ist der Unterschied zu klassischen Zauberern — bei mir geht es nicht
                um den Trick, sondern um das Erlebnis. Um die Reaktion. Um den Moment,
                in dem ein ganzer Raum gleichzeitig lacht und staunt.
              </p>
              <p>
                Comedy-Magie funktioniert bei jedem Publikum, in jeder Situation —
                weil Humor und Staunen universelle Sprachen sind. Vom CEO bis zum
                Hochzeitsgast: Alle werden Teil der Show.
              </p>
              <p>
                Studien zeigen: Erlebnisse, die Emotionen kombinieren — wie Lachen und Staunen —
                bleiben bis zu 3x länger im Gedächtnis. Genau das ist mein Ansatz.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              {[
                { icon: Laugh, label: "Humor" },
                { icon: Wand2, label: "Magie" },
                { icon: Zap, label: "Wow-Effekt" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-accent" />
                  <span className="font-display text-sm font-bold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeistertes Publikum bei Comedy-Zaubershow" className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 8. Live-Erlebnis ─── */
const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const moments = [
    { title: "Der erste Staunen-Moment", desc: "Wenn eine Karte, die gerade noch in deiner Hand war, plötzlich in der Tasche deines Nachbarn auftaucht — und alle gleichzeitig lachen." },
    { title: "Das gemeinsame Erleben", desc: "Fremde Gäste, die sich gerade erst vorgestellt haben, erleben zusammen etwas Unmögliches — und reden den Rest des Abends darüber." },
    { title: "Der Gesprächsstarter", desc: "‚Hast du das gesehen?!' — Magie bricht das Eis schneller als jeder Small Talk und schafft sofort eine Verbindung." },
    { title: "Die Erinnerung", desc: "Wochen später erzählen deine Gäste noch davon. Nicht vom Essen, nicht von der Deko — sondern vom Moment, der sie sprachlos gemacht hat." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Das Erlebnis</span>
          <h2 className="headline-section text-foreground mb-6">Was deine Gäste erleben.</h2>
          <p className="text-body max-w-xl mx-auto">
            Es geht nicht um Tricks. Es geht um die Momente dazwischen —
            um Staunen, Lachen und das Gefühl, etwas Besonderes erlebt zu haben.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {moments.map((m, i) => (
            <div key={m.title} className="p-8 rounded-3xl bg-background" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{m.title}</h3>
              <p className="text-detail">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── 9. Referenzen Slider ─── */
const ReferenzenSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Emilian hat unsere Firmenfeier zu einem unvergesslichen Abend gemacht. Die Gäste reden heute noch davon!", author: "Thomas K.", role: "Geschäftsführer, Automobilbranche" },
    { quote: "So eine intime, verblüffende Magie habe ich noch nie erlebt. Perfekt für unseren Empfang.", author: "Sarah M.", role: "Eventmanagerin" },
    { quote: "Cool, modern, witzig — genau unser Ding. Kein verstaubter Zauberer, sondern echtes Premium-Entertainment.", author: "Marc L.", role: "Marketing Director" },
    { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang. Es war der perfekte Eisbrecher!", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
    { quote: "Standing Ovation von 300 Gästen! Professionell, souverän und absolut unterhaltsam.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologie" },
  ];

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Stimmen</span>
          <h2 className="headline-section text-foreground mb-6">Was Kunden sagen.</h2>
        </div>
        <HorizontalSlider
          items={testimonials.map((t) => ({
            content: (
              <blockquote className="p-8 rounded-3xl bg-muted/40 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-accent/70 text-accent/70" />)}
                </div>
                <p className="font-sans text-base text-foreground leading-relaxed mb-6 flex-1">„{t.quote}"</p>
                <footer>
                  <p className="font-sans text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="font-sans text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            ),
          }))}
        />
      </div>
    </section>
  );
};

/* ─── 11. Ablauf eines Events ─── */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { num: "01", title: "Anfrage", desc: "Du schickst mir eine unverbindliche Anfrage — per Formular, E-Mail oder Telefon. Ich melde mich innerhalb von 24 Stunden." },
    { num: "02", title: "Beratung", desc: "Wir besprechen dein Event persönlich: Anlass, Ablauf, Wünsche. Ich berate dich, welches Format am besten passt." },
    { num: "03", title: "Konzept", desc: "Du erhältst ein maßgeschneidertes Angebot mit klarem Konzept — transparent, ohne versteckte Kosten." },
    { num: "04", title: "Show", desc: "Am Tag deines Events bin ich pünktlich vor Ort, kümmere mich um alles und sorge für unvergessliche Momente." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So einfach geht's.</h2>
          <p className="text-body max-w-xl mx-auto">Von der ersten Anfrage bis zum großen Auftritt — in vier einfachen Schritten zu deinem unvergesslichen Event.</p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {steps.map((s, i) => (
            <div key={s.num} className="p-6 rounded-3xl bg-background" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <span className="font-display text-5xl font-bold text-accent/10">{s.num}</span>
              <h3 className="font-display text-lg font-bold text-foreground mt-2 mb-3">{s.title}</h3>
              <p className="text-detail text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── 12. Für wen geeignet ─── */
const FuerWenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Zielgruppen</span>
          <h2 className="headline-section text-foreground mb-6">Für wen ist MagicEL perfekt?</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          {[
            { icon: Users, title: "Eventplaner & Agenturen", desc: "Du suchst ein Entertainment-Highlight, das zuverlässig funktioniert und deine Kunden begeistert." },
            { icon: Heart, title: "Brautpaare", desc: "Ihr wollt eure Hochzeit mit einem Erlebnis krönen, das eure Gäste nie vergessen werden." },
            { icon: Sparkles, title: "Unternehmen", desc: "Sie möchten Ihre Firmenfeier, Messe oder Kundenevent auf ein Premium-Level heben." },
            { icon: MessageCircle, title: "Privatfeiern", desc: "Du planst einen runden Geburtstag oder eine besondere Feier, die anders sein soll als alle anderen." },
            { icon: Shield, title: "Gastronomen", desc: "Du bietest Magic Dinner an und suchst einen professionellen Partner für exklusive Erlebnisse." },
            { icon: Clock, title: "Messeorganisatoren", desc: "Sie brauchen einen Eyecatcher, der Besucher anzieht und an Ihrem Stand hält." },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-3xl bg-muted/40 hover:bg-muted/60 transition-all duration-300 group">
              <item.icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── 13. FAQ integriert ─── */
const FAQIntegrated = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: "Was kostet ein Auftritt?", a: "Die Kosten hängen vom Format, der Dauer und dem Anlass ab. Für Hochzeiten beginnen meine Pakete ab 395€. Nach deiner Anfrage erstelle ich dir ein transparentes Angebot." },
    { q: "Wie weit im Voraus sollte ich buchen?", a: "So früh wie möglich — beliebte Termine sind schnell vergeben. Ideal sind 3–6 Monate Vorlauf, aber auch kurzfristige Anfragen sind möglich." },
    { q: "Wie lange dauert ein Auftritt?", a: "Das hängt vom Format ab: Close-Up typischerweise 30–90 Min., Bühnenshows 15–60 Min. Wir finden die perfekte Länge für deinen Ablauf." },
    { q: "Wo trittst du auf?", a: "Überall! Mein Schwerpunkt liegt in Bayern und Süddeutschland, aber ich bin deutschlandweit und auf Wunsch auch international buchbar." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="badge-muted mb-8 inline-flex">FAQ</span>
            <h2 className="headline-section text-foreground mb-6">Häufige Fragen.</h2>
          </div>
          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer font-sans text-base md:text-lg font-medium text-foreground pr-8 hover:text-accent transition-colors list-none">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-300 text-xl">+</span>
                </summary>
                <p className="text-detail max-w-2xl mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/faq" className="btn-secondary">Alle Fragen ansehen →</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <>
      <Navigation />
      <main>
        {/* 1. Hero */}
        <HeroSection />
        {/* 2. Video Hero */}
        {/* Video is embedded in HeroSection already; adding standalone video section */}
        {/* 3. Social Proof / Zahlen */}
        <SocialProofSection />
        {/* 4. USP / Kurzpositionierung */}
        <USPSection />
        {/* 5. Showformate Slider */}
        <ShowformateSlider />
        {/* 6. Anlässe */}
        <AnlassSection />
        {/* 7. Comedy + Magie */}
        <ComedySection />
        {/* 8. Live-Erlebnis */}
        <ErlebnisSection />
        {/* 9. Referenzen Slider */}
        <ReferenzenSlider />
        {/* 10. Galerie */}
        <GalerieSection />
        {/* 11. Ablauf */}
        <AblaufSection />
        {/* 12. Für wen geeignet */}
        <FuerWenSection />
        {/* 13. FAQ integriert */}
        <FAQIntegrated />
        {/* 14. Über mich */}
        <UeberMichSection />
        {/* 15. CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
