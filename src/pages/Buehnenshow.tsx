import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import BackgroundHero from "@/components/landing/BackgroundHero";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import stageImg from "@/assets/hero-stage.jpg";
import audienceImg from "@/assets/zuschauer-blau.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import { ArrowRight, Users, Clock, Mic, Palette, Star, Zap, Theater, Sparkles, Eye } from "lucide-react";

const WasIstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Das Konzept</span>
          <h2 className="headline-section text-foreground mb-8">Mehr als Tricks auf der Bühne.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Meine Bühnenshow ist kein Aneinanderreihen von Zaubertricks — sie ist eine durchkomponierte
              Performance mit Spannungsbogen, Comedy und emotionalen Höhepunkten.
            </p>
            <p>
              Jede Show wird individuell auf euer Event abgestimmt: Firmeninhalte, persönliche Botschaften
              oder thematische Elemente können nahtlos integriert werden.
            </p>
            <p>
              Von 15 Minuten Highlight bis zur 60-Minuten-Galashow — flexibel skalierbar
              für jede Veranstaltungsgröße, von 30 bis 500+ Gästen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const HighlightsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Highlights</span>
          <h2 className="headline-section text-foreground mb-6">Was die Bühnenshow besonders macht.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Theater, title: "Dramaturgie", desc: "Jede Show hat einen Spannungsbogen — Aufbau, Höhepunkt, Finale." },
            { icon: Eye, title: "Publikumseinbindung", desc: "Gäste werden Teil der Show — auf Augenhöhe, nie bloßgestellt." },
            { icon: Sparkles, title: "Comedy-Elemente", desc: "Humor ist der rote Faden — witzig, charmant, nie platt." },
            { icon: Zap, title: "Wow-Momente", desc: "Effekte, die das ganze Publikum gleichzeitig zum Staunen bringen." },
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

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Clock, title: "15–60 Minuten", desc: "Flexibel anpassbar an euren Ablauf." },
            { icon: Users, title: "Bis 500+ Gäste", desc: "Skalierbar für jede Eventgröße." },
            { icon: Mic, title: "Eigene Technik", desc: "Professionelle Ton- und Lichttechnik." },
            { icon: Palette, title: "Individuell", desc: "Inhalte auf eure Botschaft abgestimmt." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-3xl bg-muted/40 group">
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

const DramaturgieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Dramaturgie</span>
          <h2 className="headline-section text-foreground mb-6">Der Aufbau einer Show.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { num: "01", title: "Opening", desc: "Ein starker Einstieg, der sofort die Aufmerksamkeit hat." },
            { num: "02", title: "Interaktion", desc: "Gäste werden eingebunden — locker, witzig, auf Augenhöhe." },
            { num: "03", title: "Steigerung", desc: "Die Effekte werden größer, die Reaktionen stärker." },
            { num: "04", title: "Grand Finale", desc: "Ein Schlusspunkt, der alle von den Sitzen reißt." },
          ].map((s) => (
            <div key={s.num} className="p-6 rounded-3xl bg-background">
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

const EinsatzSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-muted mb-8 inline-flex">Einsatz</span>
            <h2 className="headline-section text-foreground mb-6">Wann eine Bühnenshow passt.</h2>
            <div className="space-y-4 mt-8">
              {[
                { title: "Firmenfeiern & Galas", desc: "Als zentrales Highlight des Abendprogramms." },
                { title: "Hochzeiten", desc: "Wenn alle zusammenkommen — der perfekte Showmoment." },
                { title: "Jubiläen & Geburtstage", desc: "Die Überraschung, die alle begeistert." },
                { title: "Messen & Produktpräsentationen", desc: "Aufmerksamkeit und bleibender Eindruck." },
              ].map((item) => (
                <div key={item.title} className="py-4 border-b border-border last:border-0">
                  <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-detail mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeistertes Publikum" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechnikSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Technik</span>
          <h2 className="headline-section text-foreground mb-8">Professionell ausgestattet.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p>Für die Bühnenshow bringe ich alles mit, was nötig ist — oder passe mich an eure vorhandene Technik an.</p>
            <p>Professionelle Headset-Mikrofone, eigene Beschallung für bis zu 300 Gäste, Bühnenbeleuchtung auf Wunsch.
               Alles wird im Vorfeld abgesprochen — kein Stress für euer Organisationsteam.</p>
            <p>Platzbedarf: ca. 3×2 Meter Bühnenfläche. Flexibel anpassbar an jede Location.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Bühnenshow vs. Close-Up.</h2>
          <p className="text-body max-w-xl mx-auto">Zwei Formate, ein Ziel: unvergessliche Momente. Die Bühnenshow erreicht alle gleichzeitig, Close-Up schafft persönliche Nähe.</p>
        </div>
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Bühnenshow</h3>
            <ul className="space-y-3 text-detail text-sm">
              <li>✓ Alle Gäste gleichzeitig begeistern</li>
              <li>✓ Strukturierter Programmpunkt</li>
              <li>✓ Starker Wow-Effekt für große Gruppen</li>
              <li>✓ Ideal als Highlight des Abends</li>
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-muted/40">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Close-Up</h3>
            <ul className="space-y-3 text-detail text-sm">
              <li>✓ Persönliche, intime Erlebnisse</li>
              <li>✓ Flexibel einsetzbar</li>
              <li>✓ Perfekt für Networking</li>
              <li>✓ Ideal für Empfang & Dinner</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-10">
          <p className="text-detail mb-4">Die beste Wirkung? Beides kombinieren.</p>
          <Link to="/buchung" className="btn-primary">Jetzt beraten lassen</Link>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Das sagen Veranstalter.</h2>
        </div>
        <HorizontalSlider
          items={[
            { quote: "Die Bühnenshow war das absolute Highlight unserer Firmenfeier. Standing Ovation von 300 Gästen!", author: "Thomas K.", role: "Geschäftsführer" },
            { quote: "Professionell, witzig, verblüffend — und perfekt auf unseren Anlass abgestimmt.", author: "Katrin W.", role: "Head of Events" },
            { quote: "Eine Show, die wirklich alle begeistert hat — vom Azubi bis zum Vorstand.", author: "Marc L.", role: "HR Director" },
          ].map((t) => ({
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

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[stageImg, audienceImg, heroImg, closeupImg, portraitImg, stageImg].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3] group">
              <img src={src} alt="Bühnenshow" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQBuehne = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="headline-section text-foreground">Häufige Fragen.</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { q: "Wie lang ist die Bühnenshow?", a: "Flexibel von 15 bis 60 Minuten — je nach Event und Ablauf." },
              { q: "Brauche ich eine Bühne?", a: "Nicht zwingend. Eine erhöhte Fläche ist ideal, aber auch ohne Bühne funktioniert die Show." },
              { q: "Kann die Show individuell angepasst werden?", a: "Absolut! Firmeninhalte, persönliche Botschaften oder thematische Elemente werden nahtlos integriert." },
            ].map((faq) => (
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

const Buehnenshow = () => (
  <>
    <Helmet>
      <title>Bühnenshow Zauberer – Emilian Leber | Comedy-Zaubershow</title>
      <meta name="description" content="Die Bühnenshow von Zauberer Emilian Leber: Comedy-Magie mit Dramaturgie, Publikumseinbindung und Wow-Momenten. Für Firmenfeiern, Galas und Events." />
      <link rel="canonical" href="https://www.magicel.de/buehnenshow" />
      <meta property="og:title" content="Bühnenshow Zauberer – Emilian Leber | Comedy-Zaubershow" />
      <meta property="og:description" content="Die Bühnenshow von Zauberer Emilian Leber: Comedy-Magie mit Dramaturgie, Publikumseinbindung und Wow-Momenten. Für Firmenfeiern, Galas und Events." />
      <meta property="og:url" content="https://www.magicel.de/buehnenshow" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Bühnenshow Zauberer – Emilian Leber | Comedy-Zaubershow" />
      <meta name="twitter:description" content="Die Bühnenshow von Zauberer Emilian Leber: Comedy-Magie mit Dramaturgie, Publikumseinbindung und Wow-Momenten. Für Firmenfeiern, Galas und Events." />
    </Helmet>
    <PageLayout>
    <BackgroundHero
      imageSrc={stageImg}
      badge="Showkonzept"
      headline="Die"
      animatedWords={["Bühnenshow.", "Performance.", "Inszenierung.", "Experience."]}
      subline="Eine durchkomponierte Show mit Dramaturgie, Comedy und Momenten, die ein ganzes Publikum gleichzeitig zum Staunen und Lachen bringen."
      ctaPrimary={{ text: "Bühnenshow anfragen", to: "/buchung" }}
    />
    <WasIstSection />
    <HighlightsSection />
    <FeaturesSection />
    <DramaturgieSection />
    <EinsatzSection />
    <TechnikSection />
    <VergleichSection />
    <TestimonialsSlider />
    <GalerieSection />
    <FAQBuehne />
    <ProcessSteps />
    <BookingCTA headline={"Die Bühne gehört dir."} subline="Lass uns über dein Event sprechen — ich entwickle eine Show, die perfekt zu eurem Anlass passt." />
  </PageLayout>
  </>
);

export default Buehnenshow;
