import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import BackgroundHero from "@/components/landing/BackgroundHero";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import closeupImg from "@/assets/hero-closeup.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import staunenImg from "@/assets/staunen.jpg";
import schneiderWeisseImg from "@/assets/schneider-weisse-closeup.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import { ArrowRight, Hand, Eye, MessageCircle, Zap, Star, Users, Heart, Sparkles, Clock } from "lucide-react";

const WasIstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Das Konzept</span>
          <h2 className="headline-section text-foreground mb-8">Magie zum Anfassen.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Close-Up Magie ist die älteste und zugleich modernste Form der Zauberkunst:
              direkt, persönlich und unmöglich nah.
            </p>
            <p>
              Ich komme zu deinen Gästen — an den Tisch, an die Bar, in die Runde.
              Was dann passiert, können sie nicht erklären: Karten wandern, Münzen verschwinden,
              Gedanken werden gelesen. Alles direkt vor ihren Augen.
            </p>
            <p>
              Kein Abstand, keine Technik, keine Ablenkung — nur pure Magie und die echte Reaktion,
              wenn das Unmögliche direkt in deinen Händen passiert.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Eye, title: "Direkt vor deinen Augen", desc: "Keine Entfernung, keine Tricks mit Spiegel — pure, echte Magie." },
            { icon: Hand, title: "Interaktiv", desc: "Jeder Gast wird Teil des Erlebnisses und hält die Magie in seinen Händen." },
            { icon: MessageCircle, title: "Gesprächsstarter", desc: "Der ultimative Icebreaker — perfekt für Empfänge und Networking." },
            { icon: Zap, title: "Überall einsetzbar", desc: "Am Tisch, an der Bar, im Stehen — Close-Up funktioniert überall." },
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

const EinsatzSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground mb-6">Perfekt für jede Situation.</h2>
        </div>
        <HorizontalSlider
          items={[
            { title: "Sektempfang", desc: "Der perfekte Icebreaker — Gäste kommen an und sind sofort in bester Stimmung." },
            { title: "Dinner-Begleitung", desc: "Zwischen den Gängen wird gezaubert. Jeder Tisch bekommt sein persönliches Erlebnis." },
            { title: "Networking-Events", desc: "Magie bringt Menschen ins Gespräch — besser als jeder Small Talk." },
            { title: "Messen & Promotions", desc: "Aufmerksamkeit erzeugen und Besucher an Ihrem Stand halten." },
            { title: "VIP-Events", desc: "Exklusive, persönliche Magie für kleine, erlesene Runden." },
          ].map((item) => ({
            content: (
              <div className="p-8 rounded-3xl bg-muted/40 h-full">
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

const NaeheSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`order-2 md:order-1 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={staunenImg} alt="Staunende Gäste" className="w-full h-[500px] object-cover object-top" loading="lazy" />
            </div>
          </div>
          <div className={`order-1 md:order-2 ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <span className="badge-primary mb-8 inline-flex">Nähe & Interaktion</span>
            <h2 className="headline-section text-foreground mb-6">Das macht Close-Up so besonders.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Du hältst eine Karte in der Hand. Du bist dir sicher, welche es ist.
                Und dann — ist es eine andere. Unmöglich. Aber es passiert gerade. In deiner Hand.
              </p>
              <p>
                Das ist der Moment, der Close-Up Magie so besonders macht: Du erlebst es nicht auf einer Bühne,
                sondern direkt, persönlich, hautnah. Und genau deshalb ist die Wirkung so stark.
              </p>
              <p>
                Deine Gäste werden den Rest des Abends darüber reden. „Hast du das gesehen?!"
                wird zum meistgesagten Satz deiner Veranstaltung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So funktioniert Close-Up auf deinem Event.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { num: "01", title: "Ankommen", desc: "Ich mische mich unauffällig unter die Gäste und starte mit der ersten Gruppe." },
            { num: "02", title: "Staunen", desc: "Kleine Gruppen erleben verblüffende Magie — direkt in ihren Händen." },
            { num: "03", title: "Verbinden", desc: "Gäste kommen ins Gespräch, Grüppchen vermischen sich, die Stimmung steigt." },
            { num: "04", title: "Erinnern", desc: "Der Abend geht weiter, aber die magischen Momente bleiben Gesprächsthema." },
          ].map((s) => (
            <div key={s.num} className="p-6 rounded-3xl bg-muted/40">
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

const BeispieleSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Was passiert bei Close-Up Magie?</h2>
        </div>
        <div className={`grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { title: "Kartenmagie", desc: "Karten wandern, verschwinden und tauchen an unmöglichen Orten auf — alles in den Händen der Zuschauer." },
            { title: "Mentalismus", desc: "Gedanken werden gelesen, Vorhersagen treffen ein, das Unmögliche wird Realität." },
            { title: "Münzmagie", desc: "Münzen durchdringen Tische, verschwinden und materialisieren sich in geschlossenen Händen." },
            { title: "Alltagsmagie", desc: "Handys, Uhren, Ringe — alltägliche Gegenstände werden zum Medium für verblüffende Effekte." },
          ].map((b) => (
            <div key={b.title} className="p-8 rounded-3xl bg-background">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{b.title}</h3>
              <p className="text-detail">{b.desc}</p>
            </div>
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
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[closeupImg, schneiderWeisseImg, heroImg, stageImg, portraitImg, haendeImg].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square group">
              <img src={src} alt="Close-Up" className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VergleichSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Close-Up vs. Bühnenshow.</h2>
          <p className="text-body max-w-xl mx-auto mt-6">Beide Formate haben ihre Stärken. Die beste Wirkung? Beides kombinieren.</p>
        </div>
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Close-Up</h3>
            <ul className="space-y-3 text-detail text-sm">
              <li>✓ Persönlich und intim</li>
              <li>✓ Flexibel einsetzbar</li>
              <li>✓ Perfekt für Networking</li>
              <li>✓ Keine Bühne nötig</li>
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-muted/40">
            <h3 className="font-display text-xl font-bold text-foreground mb-4">Bühnenshow</h3>
            <ul className="space-y-3 text-detail text-sm">
              <li>✓ Alle Gäste gleichzeitig</li>
              <li>✓ Strukturierter Programmpunkt</li>
              <li>✓ Starker Wow-Effekt</li>
              <li>✓ Ideal als Highlight</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Stimmen von Gästen.</h2>
        </div>
        <HorizontalSlider
          items={[
            { quote: "So eine intime, verblüffende Magie habe ich noch nie erlebt. Emilian war der Gesprächsstarter des Abends!", author: "Sarah M.", role: "Eventmanagerin" },
            { quote: "Die Close-Up Magie war perfekt für unseren Empfang. Jeder Gast war sofort in bester Stimmung.", author: "Lena & Markus", role: "Hochzeit" },
            { quote: "Absolut verblüffend — und dabei so locker und witzig. Genau richtig.", author: "Thomas K.", role: "Firmenfeier" },
          ].map((t) => ({
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

const FAQCloseUp = () => {
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
              { q: "Wie lange dauert Close-Up Magie?", a: "Typischerweise 30–90 Minuten. Jede Gruppe erlebt ca. 5–10 Minuten Magie." },
              { q: "Brauche ich eine spezielle Vorbereitung?", a: "Nein! Ich brauche nur eure Gäste. Kein Tisch, keine Bühne, keine Technik." },
              { q: "Ab wie vielen Gästen funktioniert das?", a: "Schon ab 10 Gästen. Bei sehr großen Events (200+) kombiniere ich gerne mit einer Bühnenshow." },
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

const CloseUp = () => (
  <>
    <Helmet>
      <title>Close-Up Magie – Emilian Leber | Interaktive Zauberkunst</title>
      <meta name="description" content="Close-Up Magie von Emilian Leber: interaktive Zauberkunst direkt in den Händen Ihrer Gäste. Perfekt für Empfänge, Dinner und Networking-Events." />
      <link rel="canonical" href="https://www.magicel.de/close-up" />
      <meta property="og:title" content="Close-Up Magie – Emilian Leber | Interaktive Zauberkunst" />
      <meta property="og:description" content="Close-Up Magie von Emilian Leber: interaktive Zauberkunst direkt in den Händen Ihrer Gäste. Perfekt für Empfänge, Dinner und Networking-Events." />
      <meta property="og:url" content="https://www.magicel.de/close-up" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Close-Up Magie – Emilian Leber | Interaktive Zauberkunst" />
      <meta name="twitter:description" content="Close-Up Magie von Emilian Leber: interaktive Zauberkunst direkt in den Händen Ihrer Gäste. Perfekt für Empfänge, Dinner und Networking-Events." />
    </Helmet>
    <PageLayout>
    <BackgroundHero
      imageSrc={closeupImg}
      badge="Showkonzept"
      headline="Magie in deinen"
      animatedWords={["Händen.", "Augen.", "Momenten.", "Erlebnissen."]}
      subline="Keine Bühne, keine Distanz — Close-Up Magie passiert direkt vor deinen Augen, in deinen Händen und mitten unter deinen Gästen."
      ctaPrimary={{ text: "Close-Up anfragen", to: "/buchung" }}
    />
    <WasIstSection />
    <FeaturesSection />
    <EinsatzSlider />
    <NaeheSection />
    <AblaufSection />
    <BeispieleSection />
    <GalerieSection />
    <VergleichSection />
    <TestimonialsSlider />
    <FAQCloseUp />
    <ProcessSteps />
    <BookingCTA headline={"Hautnah erleben."} subline="Close-Up Magie für dein Event — lass uns sprechen und das perfekte Konzept entwickeln." />
  </PageLayout>
  </>
);

export default CloseUp;
