import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import AnimatedWords from "@/components/landing/AnimatedWords";
import BackgroundHero from "@/components/landing/BackgroundHero";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import birthdayHeroImg from "@/assets/hero-geburtstag-stock.jpg";
import heroImg from "@/assets/emotionen.jpg";
import closeupImg from "@/assets/closeup.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/emilian-magic-dinner.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import haendeImg from "@/assets/haende-interaktion.jpg";
import { Star, PartyPopper, Gift, Users, Music, ArrowRight, Heart, Sparkles, Check, MessageCircle } from "lucide-react";

const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Warum Magie?</span>
          <h2 className="headline-section text-foreground mb-8">Mehr als ein <span className="text-gradient">Geschenk</span>.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Ein Zauberer auf dem Geburtstag ist nicht einfach nur Unterhaltung — es ist DAS Erlebnis,
              das die Feier von einem netten Abend zu einem unvergesslichen Event macht.
            </p>
            <p>
              Egal ob 30., 40., 50. oder 60. Geburtstag — das Geburtstagskind steht im Mittelpunkt,
              alle Gäste werden Teil des Erlebnisses, und am Ende reden alle über denselben magischen Moment.
            </p>
            <p>
              Das Beste: Du musst nichts vorbereiten. Kein Aufwand, kein Stress — einfach anfragen,
              zurücklehnen und den perfekten Geburtstag genießen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const VorteileSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-dark" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(225 80% 20% / 0.5) 0%, #08080d 70%)" }} ref={ref}>
      <div className="container px-6">
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Gift, title: "Die beste Überraschung", desc: "Der Wow-Moment, den niemand erwartet hat — aber alle für immer in Erinnerung behalten." },
            { icon: Users, title: "Bringt alle zusammen", desc: "Jung und Alt, beste Freunde und Bekannte — Magie verbindet jeden am Tisch." },
            { icon: PartyPopper, title: "Star des Abends", desc: "Das Geburtstagskind steht im Mittelpunkt — als Teil einer persönlichen Show." },
            { icon: Music, title: "Kein Leerlauf", desc: "Perfekt für die Momente zwischen Essen, Reden und Tanzen." },
          ].map((item) => (
            <div key={item.title} className="glass p-6 rounded-3xl group">
              <item.icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-primary mb-8 inline-flex">Das Erlebnis</span>
            <h2 className="headline-section text-foreground mb-6">Was deine Gäste erleben.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Es geht nicht um Tricks. Es geht um den Moment, in dem alle gleichzeitig lachen und staunen.
              </p>
              <p>
                Stell dir vor: Deine beste Freundin hält eine Karte in der Hand — und plötzlich ist sie in der Tasche
                deines Onkels. Der ganze Tisch lacht. Fremde Gäste kommen ins Gespräch.
              </p>
              <p>
                Das ist Comedy-Magie: nicht mysteriös und dunkel, sondern witzig, warm und verbindend.
              </p>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeisterte Gäste" className="w-full h-[500px] object-cover object-top" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KonzepteSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-dark" style={{ background: "linear-gradient(135deg, #08080d 0%, #0f0a1e 50%, #08080d 100%)" }} ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Formate</span>
          <h2 className="headline-section mb-6">Drei Erlebnisse für deine Feier.</h2>
        </div>
        <HorizontalSlider
          items={[
            { img: closeupImg, title: "Close-Up Magie", desc: "Interaktive Magie für kleine und große Runden — perfekt als Eisbrecher und Unterhaltung." },
            { img: stageImg, title: "Bühnenshow", desc: "Eine durchkomponierte Show mit Comedy und Staunen — das Highlight des Abends." },
            { img: heroImg, title: "Walking Act", desc: "Magie zwischen den Gästen — locker, witzig und spontan." },
          ].map((k) => ({
            content: (
              <div className="rounded-3xl overflow-hidden aspect-[3/4] relative group">
                <img src={k.img} alt={k.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display text-2xl font-bold text-background mb-3">{k.title}</h3>
                  <p className="font-sans text-sm text-background/70">{k.desc}</p>
                </div>
              </div>
            ),
          }))}
        />
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
          <h2 className="headline-section text-foreground mb-6">Wann passt Magie in deine Feier?</h2>
        </div>
        <div className={`grid md:grid-cols-3 gap-8 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { title: "Begrüßung", desc: "Close-Up Magie zum Ankommen — alle sind sofort in bester Stimmung." },
            { title: "Zwischen den Programmpunkten", desc: "Kein Leerlauf — Magie füllt jede Lücke mit Staunen und Lachen." },
            { title: "Als Highlight", desc: "Eine Bühnenshow für alle gleichzeitig — der krönende Moment." },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl bg-muted/40">
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail">{item.desc}</p>
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
          <span className="badge-accent mb-8 inline-flex">Beispiele</span>
          <h2 className="headline-section text-foreground mb-6">So haben andere gefeiert.</h2>
        </div>
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { title: "50. Geburtstag — Nähe Regensburg", gaeste: "35 Gäste", format: "Close-Up + Bühnenshow", highlight: "Überraschung für alle — das Geburtstagskind war sprachlos!" },
            { title: "Silberhochzeit — Mintraching", gaeste: "30 Gäste", format: "Close-Up Magie", highlight: "Intime Runde, jeder Gast wurde Teil der Magie" },
            { title: "Silberhochzeit — Nähe Regensburg", gaeste: "40 Gäste", format: "Close-Up + Mini-Bühnenshow", highlight: "Überraschung perfekt geklappt — Standing Ovation!" },
            { title: "Hochzeit — Steinberg am See", gaeste: "50 Gäste", format: "Close-Up Magie", highlight: "Perfekter Eisbrecher beim Sektempfang" },
          ].map((b) => (
            <div key={b.title} className="p-8 rounded-3xl bg-background">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h3>
              <p className="font-sans text-xs text-muted-foreground mb-4">{b.gaeste} · {b.format}</p>
              <p className="text-detail text-sm"><strong className="text-foreground">Highlight:</strong> {b.highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-dark" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(225 80% 20% / 0.5) 0%, #08080d 70%)" }} ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section">Was Gäste sagen.</h2>
        </div>
        <HorizontalSlider
          items={[
            { quote: "Emilian hat unseren 50. Geburtstag unvergesslich gemacht. Die Mischung aus Close-Up und Bühnenshow war perfekt.", author: "Christina", role: "Geburtstagsfeier · ProvenExpert" },
            { quote: "Es war genial, perfekt und mega gut!!! Die Gäste waren begeistert, die Kinder fanden es toll und wir auch!", author: "Petra Zeitler", role: "Firmenfeier · ProvenExpert" },
            { quote: "Emilian, du warst der absolute Höhepunkt unserer Hochzeitsfeier. Alle sprechen noch Wochen danach davon!", author: "Martina Senftl", role: "Hochzeit · ProvenExpert" },
          ].map((t) => ({
            content: (
              <blockquote className="glass p-8 rounded-3xl h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="font-sans text-base leading-relaxed mb-6 flex-1">„{t.quote}"</p>
                <footer>
                  <p className="font-sans text-sm font-semibold">{t.author}</p>
                  <p className="font-sans text-xs opacity-50">{t.role}</p>
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
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Momente.</h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[heroImg, audienceImg, closeupImg, stageImg, portraitImg, haendeImg].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square group">
              <img src={src} alt="Geburtstag" className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQBirthday = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="headline-section text-foreground mb-6">Häufige Fragen.</h2>
          </div>
          <div className="divide-y divide-border/40">
            {[
              { q: "Ab wie vielen Gästen lohnt sich ein Zauberer?", a: "Schon ab 10 Gästen funktioniert Close-Up Magie perfekt. Für eine Bühnenshow empfehle ich mindestens 20–30 Gäste." },
              { q: "Kann ich das als Überraschung planen?", a: "Absolut! Die meisten Buchungen sind Überraschungen. Ich bin diskret, komme unauffällig und starte, wenn der Moment perfekt ist." },
              { q: "Was kostet ein Auftritt auf einem Geburtstag?", a: "Die Kosten hängen vom Format und der Dauer ab. Schreib mir einfach — ich erstelle dir ein transparentes Angebot." },
              { q: "Für welche Altersgruppe ist das geeignet?", a: "Für alle! Von 8 bis 80 — Comedy-Magie funktioniert generationsübergreifend." },
            ].map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer font-sans text-base md:text-lg font-medium text-foreground pr-8 hover:text-accent transition-colors list-none">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-300 text-xl">+</span>
                </summary>
                <p className="text-muted-foreground max-w-2xl mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-5xl mx-auto">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber" className="w-full h-auto object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <span className="badge-accent mb-8 inline-flex">Dein Zauberer</span>
            <h2 className="headline-sub text-foreground mb-6">Hi, ich bin Emilian.</h2>
            <p className="text-detail max-w-lg">
              Moderner Comedy-Zauberer mit über 500 Auftritten. Mein Ziel: deine Feier zum unvergesslichen Erlebnis machen — mit Humor, Staunen und echten Momenten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Geburtstage = () => (
  <>
    <Helmet>
      <title>Geburtstag Zauberer – Emilian Leber | Zaubershow für Geburtstage</title>
      <meta name="description" content="Zauberer für Geburtstage: Emilian Leber macht deinen Geburtstag unvergesslich. Comedy-Magie als Überraschung für 30., 40., 50. oder 60. Geburtstag." />
      <link rel="canonical" href="https://www.magicel.de/geburtstage" />
      <meta property="og:title" content="Geburtstag Zauberer – Emilian Leber | Zaubershow für Geburtstage" />
      <meta property="og:description" content="Zauberer für Geburtstage: Emilian Leber macht deinen Geburtstag unvergesslich. Comedy-Magie als Überraschung für 30., 40., 50. oder 60. Geburtstag." />
      <meta property="og:url" content="https://www.magicel.de/geburtstage" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Geburtstag Zauberer – Emilian Leber | Zaubershow für Geburtstage" />
      <meta name="twitter:description" content="Zauberer für Geburtstage: Emilian Leber macht deinen Geburtstag unvergesslich. Comedy-Magie als Überraschung für 30., 40., 50. oder 60. Geburtstag." />
        <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":"Zauberer für Geburtstage","provider":{"@type":"Person","name":"Emilian Leber","url":"https://www.magicel.de"},"description":"Zaubershow für Geburtstage: Interaktive Magie, die das Geburtstagskind und alle Gäste begeistert.","areaServed":{"@type":"Country","name":"Deutschland"},"url":"https://www.magicel.de/geburtstage"})}</script>
    </Helmet>
    <PageLayout>
    <BackgroundHero
      imageSrc={birthdayHeroImg}
      badge="Zauberer für deinen Geburtstag"
      headline="Ein Geburtstag, der"
      animatedWords={["bleibt.", "überrascht.", "begeistert.", "verbindet."]}
      subline="Stell dir vor, das Geburtstagskind steht im Mittelpunkt einer verblüffenden Show — und alle Gäste reden noch Wochen später darüber."
      ctaPrimary={{ text: "Jetzt anfragen", to: "/buchung" }}
    />
    <WarumSection />
    <VorteileSection />
    <ErlebnisSection />
    <KonzepteSlider />
    <AblaufSection />
    <BeispieleSection />
    <TestimonialsSlider />
    <GalerieSection />
    <FAQBirthday />
    <UeberMichKurz />
    <BookingCTA headline={"Mach deinen Geburtstag\nunvergesslich."} subline="Erzähl mir von deiner Feier — ich entwickle das passende Konzept aus Comedy, Magie und Interaktion." />
  </PageLayout>
  </>
);

export default Geburtstage;
