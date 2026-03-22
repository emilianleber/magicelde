import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import BackgroundHero from "@/components/landing/BackgroundHero";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import weddingImg from "@/assets/wedding-magic.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { Check, X, Star, Heart, Users, Music, Sparkles, ArrowRight, Clock, MessageCircle, Gift } from "lucide-react";

/* 1. Hero */
const HeroWedding = () => (
  <BackgroundHero
    imageSrc={weddingImg}
    badge="Zauberer für eure Hochzeit"
    headline="Magie für eure"
    animatedWords={["Hochzeit.", "Gäste.", "Liebe.", "Feier."]}
    subline="Stellt euch vor, eure Gäste lachen, staunen und reden noch Wochen nach eurer Hochzeit über den einen Moment, der alle sprachlos gemacht hat. Genau das ist mein Job."
    ctaPrimary={{ text: "Termin sichern", to: "/buchung" }}
    ctaSecondary={{ text: "Pakete ansehen ↓", href: "#pakete" }}
  />
);

/* 2. Warum Zauberei */
const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Der Moment</span>
          <h2 className="headline-section text-foreground mb-8">Warum Zauberei auf Hochzeiten so gut funktioniert.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Auf jeder Hochzeit gibt es diese Situation: Gäste, die sich nicht kennen, stehen beim Sektempfang
              nebeneinander und suchen nach Gesprächsthemen. Der Cousin der Braut trifft auf die Kollegin des Bräutigams.
            </p>
            <p>
              Magie löst genau dieses Problem — elegant, witzig und verbindend. Innerhalb von 30 Sekunden
              staunen alle zusammen, lachen und haben sofort ein gemeinsames Thema. "Hast du das gesehen?!"
              wird zum meistgesagten Satz eurer Hochzeit.
            </p>
            <p>
              Das Besondere: Magie funktioniert bei JEDEM Alter, jeder Kultur, jedem Hintergrund.
              Eure 80-jährige Oma staunt genauso wie euer 25-jähriger Studienfreund.
              Es gibt kein Entertainment, das so universal verbindet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 3. Emotionen & Erinnerungen */
const EmotionenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Emotionen</span>
          <h2 className="headline-section text-foreground mb-6">Die Momente, die bleiben.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Users, title: "Verbindet Gäste", desc: "Fremde werden Freunde — durch gemeinsames Staunen und Lachen entsteht sofort eine Verbindung." },
            { icon: Heart, title: "Schafft Erinnerungen", desc: "Momente, über die eure Gäste noch Wochen und Monate nach der Hochzeit sprechen." },
            { icon: Music, title: "Füllt jede Lücke", desc: "Kein Leerlauf beim Empfang, beim Dinner oder zwischen den Programmpunkten." },
            { icon: Sparkles, title: "Individuell für euch", desc: "Jede Show wird auf euch, eure Gäste, eure Location und euren Ablauf abgestimmt." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-3xl bg-background group">
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

/* 4. Vergleich */
const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Nicht irgendein Zauberer.</h2>
          <p className="text-body max-w-xl mx-auto">
            Es gibt viele Zauberer. Aber nur wenige, die wirklich zu einer modernen Hochzeit passen.
          </p>
        </div>
        <div className={`grid md:grid-cols-2 gap-12 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="p-8 rounded-3xl bg-background border border-border/50">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/40 mb-8">Andere Zauberer</p>
            <ul className="space-y-5">
              {["Klischeehaft & altmodisch", "Wenig Interaktion mit Gästen", "Gleiches Programm bei jeder Hochzeit", "Fokus auf Tricks statt Emotionen"].map((item) => (
                <li key={item} className="flex items-start gap-3"><X className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-1" /><span className="text-detail">{item}</span></li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-8">MagicEL</p>
            <ul className="space-y-5">
              {["Modern, stilvoll, passend zu eurer Hochzeit", "Interaktiv — jeder Gast wird Teil des Erlebnisses", "Individuell auf euch abgestimmt", "Fokus auf Emotionen und Verbindung"].map((item) => (
                <li key={item} className="flex items-start gap-3"><Check className="w-4 h-4 text-accent shrink-0 mt-1" /><span className="font-sans text-sm md:text-base text-foreground">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 5. Einsatzzeitpunkte */
const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">Wann passt Magie in euren Hochzeitstag?</h2>
        </div>
        <HorizontalSlider
          items={[
            { title: "Sektempfang", time: "15–45 Min.", desc: "Close-Up Magie als Icebreaker — eure Gäste kommen an, staunen und sind sofort im besten Gesprächsmodus. Der perfekte Start in euren besonderen Tag." },
            { title: "Dinner-Begleitung", time: "30–60 Min.", desc: "Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und interaktiv. Jeder Tisch bekommt sein eigenes Erlebnis, die Wartezeit wird zum Highlight." },
            { title: "Abendprogramm", time: "15–30 Min.", desc: "Eine Bühnenshow als Highlight des Abends — unterhaltsam, witzig und für alle 100+ Gäste gleichzeitig. Der krönende Moment eurer Feier." },
            { title: "Foto-Session", time: "30 Min.", desc: "Während das Brautpaar Fotos macht, werden die Gäste bestens unterhalten. Keine Langeweile, keine Leerlaufzeit." },
          ].map((item) => ({
            content: (
              <div className="p-8 rounded-3xl bg-muted/40 h-full">
                <span className="badge-accent mb-4 inline-flex">{item.time}</span>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-detail">{item.desc}</p>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
};

/* 6. Erlebnis für Gäste */
const GaesteErlebnis = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-primary mb-8 inline-flex">Gäste-Erlebnis</span>
            <h2 className="headline-section text-foreground mb-6">Was eure Gäste erleben.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Stell dir vor: Deine beste Freundin hält eine Karte in der Hand — und plötzlich ist sie
                in der Tasche deines Onkels. Der ganze Tisch lacht.
              </p>
              <p>
                Fremde Gäste, die sich gerade erst vorgestellt haben, erleben zusammen etwas Unmögliches.
                Sie staunen, lachen und haben sofort ein Gesprächsthema für den Rest des Abends.
              </p>
              <p>
                Das ist Comedy-Magie: nicht mysteriös und dunkel, sondern witzig, warm und verbindend.
                Genau das, was eine perfekte Hochzeit braucht — authentische Momente und echte Emotionen.
              </p>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Staunende Hochzeitsgäste" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 7. Pakete */
const PaketeSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const pakete = [
    { name: "Einstieg", price: "395", duration: "15–20 Min.", type: "Bühnenshow", desc: "Ein kompaktes Highlight — perfekt als Überraschung oder Zwischenprogramm.", features: ["15–20 Min. Bühnenshow", "Professionelle Performance", "Individuelle Absprache", "Auf eure Hochzeit abgestimmt"] },
    { name: "Klassiker", price: "495", duration: "30–45 Min.", type: "Bühne oder Close-Up", desc: "Der ideale Begleiter für Empfang oder Abendprogramm.", features: ["30–45 Min. Entertainment", "Bühnenshow oder Close-Up", "Persönliche Vorbesprechung", "Flexibler Einsatz im Ablauf"], popular: true },
    { name: "Premium", price: "749", duration: "bis 60 Min.", type: "Bühne + Close-Up", desc: "Das Rundum-Erlebnis — Magie vom Empfang bis zum Abendprogramm.", features: ["Bis zu 60 Minuten", "Bühne und Close-Up kombiniert", "Individuelle Konzeption", "Flexibler Einsatz", "Premium-Betreuung"] },
  ];

  return (
    <section id="pakete" className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Pakete</span>
          <h2 className="headline-section text-foreground mb-6">Drei Erlebnis-Level.</h2>
          <p className="text-body max-w-xl mx-auto">
            Jedes Paket wird individuell auf eure Hochzeit abgestimmt. Ihr wählt das Level — ich sorge für den Wow-Effekt.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pakete.map((p, i) => (
            <div key={p.name} className={`relative rounded-3xl bg-background p-8 flex flex-col transition-all duration-500 hover:shadow-lg ${p.popular ? "ring-2 ring-accent/20" : ""} ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-gradient text-[10px]">Beliebteste Wahl</span>}
              <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">{p.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-sans text-xs text-muted-foreground">ab</span>
                <span className="font-display text-4xl font-bold text-foreground tabular-nums">{p.price}€</span>
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-6">{p.duration} · {p.type}</p>
              <p className="text-detail mb-8">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="font-sans text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/buchung" className={p.popular ? "btn-primary justify-center" : "btn-secondary justify-center border border-border hover:border-foreground/20"}>
                Jetzt anfragen
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 8. Über mich */
const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            <span className="badge-accent mb-8 inline-flex">Euer Zauberer</span>
            <h2 className="headline-sub text-foreground mb-6">Hi, ich bin Emilian.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Moderner Comedy-Zauberer mit über 500 Events und mehr als 150 Hochzeiten Erfahrung.
              </p>
              <p>
                Für eure Hochzeit entwickle ich ein Konzept, das zu euch und euren Gästen passt —
                keine Standardshow, sondern ein persönliches Erlebnis, das eure Feier einzigartig macht.
              </p>
              <p>
                Mein Stil: modern, humorvoll, interaktiv. Keine Klischees, keine verstaubten Tricks —
                sondern echtes Entertainment, das Herzen öffnet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 9. Testimonials Slider */
const TestimonialsSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  const testimonials = [
    { quote: "Unsere Gäste reden heute noch über die Magie beim Empfang. Es war der perfekte Eisbrecher!", author: "Lena & Markus", role: "Hochzeit in Heidelberg" },
    { quote: "Die perfekte Balance zwischen Eleganz, Humor und absolutem Staunen. Nahtlos in unseren Abend eingefügt.", author: "Julia & Thomas", role: "Hochzeit am Bodensee" },
    { quote: "Wir können es jedem Brautpaar empfehlen! Modern, stilvoll und unglaublich unterhaltsam.", author: "Anna & Felix", role: "Hochzeit in Stuttgart" },
    { quote: "Die beste Entscheidung unserer Hochzeitsplanung! Alle Gäste waren begeistert.", author: "Sarah & David", role: "Hochzeit in München" },
    { quote: "Emilian hat unsere Hochzeit um ein unvergessliches Highlight bereichert. Professionell und charmant.", author: "Nina & Jan", role: "Hochzeit in Regensburg" },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Brautpaare</span>
          <h2 className="headline-section text-foreground mb-6">Was Brautpaare sagen.</h2>
        </div>
        <HorizontalSlider
          items={testimonials.map((t) => ({
            content: (
              <blockquote className="p-8 rounded-3xl bg-background h-full flex flex-col">
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

/* 10. Galerie */
const GalerieWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Momente von echten Hochzeiten.</h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[240px] ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[
            { src: weddingImg, alt: "Hochzeitsmagie", className: "col-span-2 row-span-2" },
            { src: audienceImg, alt: "Staunende Gäste" },
            { src: closeupImg, alt: "Close-Up Magie" },
            { src: stageImg, alt: "Bühnenshow" },
            { src: heroImg, alt: "Performance" },
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

/* 11. Tipps */
const TippsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Tipps</span>
          <h2 className="headline-section text-foreground mb-8">5 Tipps für die perfekte Hochzeitsmagie.</h2>
          <div className="space-y-6">
            {[
              { num: "01", title: "Früh buchen", desc: "Beliebte Termine in der Hochzeitssaison (Mai–September) sind schnell vergeben. Ideal: 6–12 Monate Vorlauf." },
              { num: "02", title: "Den richtigen Zeitpunkt wählen", desc: "Sektempfang und Dinner-Begleitung sind die beliebtesten Einsatzzeitpunkte — und die wirkungsvollsten." },
              { num: "03", title: "Überraschung planen", desc: "Die besten Reaktionen bekommt ihr, wenn eure Gäste NICHT wissen, dass ein Zauberer kommt." },
              { num: "04", title: "Nicht am Programm übertreiben", desc: "Ein Highlight ist besser als fünf halbherzige Programmpunkte. Qualität vor Quantität." },
              { num: "05", title: "Persönlich abstimmen", desc: "Erzählt mir von eurer Hochzeit — ich entwickle ein Konzept, das perfekt zu euch passt." },
            ].map((tip) => (
              <div key={tip.num} className="flex items-start gap-5 py-4 border-b border-border last:border-0">
                <span className="font-display text-3xl font-bold text-accent/20">{tip.num}</span>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{tip.title}</h3>
                  <p className="text-detail mt-1">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 12. Stats */
const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const StatsWedding = () => (
  <section className="section-medium">
    <div className="container px-6">
      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        <StatItem end={150} suffix="+" label="Hochzeiten" />
        <StatItem end={100} suffix="%" label="Weiterempfehlung" />
        <StatItem end={10} suffix="+" label="Jahre" />
      </div>
    </div>
  </section>
);

/* 13. FAQ */
const FAQWedding = () => {
  const { ref, isVisible } = useScrollReveal();
  const faqs = [
    { q: "Was kostet ein Zauberer auf der Hochzeit?", a: "Meine Hochzeitspakete beginnen ab 395€. Nach einem persönlichen Gespräch erstelle ich euch ein individuelles Angebot — transparent und ohne versteckte Kosten." },
    { q: "Wann sollten wir buchen?", a: "So früh wie möglich! Beliebte Samstage in der Hochzeitssaison sind schnell vergeben. Ideal sind 6–12 Monate Vorlauf." },
    { q: "Passt das zu unserer Hochzeit?", a: "Mein Stil ist modern, stilvoll und nie peinlich. Ob elegante Gala oder lockere Gartenparty — ich passe mich eurem Stil perfekt an." },
    { q: "Können wir dich vorab kennenlernen?", a: "Natürlich! Ein kostenloses Vorgespräch per Video oder Telefon ist selbstverständlich." },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="badge-muted mb-8 inline-flex">FAQ</span>
            <h2 className="headline-section text-foreground mb-6">Häufige Fragen von Brautpaaren.</h2>
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
        </div>
      </div>
    </section>
  );
};

/* 14. Process Steps */
/* 15. CTA */

const Hochzeit = () => (
  <PageLayout>
    <HeroWedding />
    <WarumSection />
    <EmotionenSection />
    <VergleichSection />
    <EinsatzSection />
    <GaesteErlebnis />
    <PaketeSection />
    <UeberMichKurz />
    <TestimonialsSlider />
    <GalerieWedding />
    <TippsSection />
    <StatsWedding />
    <FAQWedding />
    <ProcessSteps />
    <BookingCTA headline={"Sichert euch euren\nHochzeitstermin."} subline="Termine sind begrenzt — frühzeitig anfragen lohnt sich. Ich berate euch persönlich und unverbindlich." />
  </PageLayout>
);

export default Hochzeit;
