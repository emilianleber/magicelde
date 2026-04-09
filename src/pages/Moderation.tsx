import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import BackgroundHero from "@/components/landing/BackgroundHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import stageImg from "@/assets/stage-show.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import heroImg from "@/assets/moderator-hero.jpg";
import buehneZuschauerImg from "@/assets/buehne-zuschauer.jpg";
import { Mic, Users, Sparkles, Star, ArrowRight, Zap, Heart, Check, Clock, Award, MessageCircle } from "lucide-react";

const WasIstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-gradient mb-8 inline-flex">Moderation</span>
            <h2 className="headline-section text-foreground mb-8">Moderation mit Persönlichkeit.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Eine gute Moderation hält ein Event zusammen. Eine großartige Moderation
                macht es zu einem Erlebnis. Ich bringe Bühnenpräsenz, Timing und Charme mit —
                und die Fähigkeit, jedes Publikum abzuholen.
              </p>
              <p>
                Als Zauberkünstler und Showkünstler bin ich es gewohnt, vor hunderten Menschen zu stehen,
                Aufmerksamkeit zu halten und Stimmung zu schaffen. Diese Fähigkeiten machen mich
                zu einem Moderator, der sich von klassischen Ansagern fundamental unterscheidet.
              </p>
              <p>
                Ich moderiere nicht nur — ich gestalte den Abend. Mit Humor, Interaktion
                und einem feinen Gespür für den richtigen Moment.
              </p>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={heroImg} alt="Moderation auf der Bühne" className="w-full h-[500px] object-cover object-top" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VorteileSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient-subtle mb-8 inline-flex">Vorteile</span>
          <h2 className="headline-section text-foreground mb-6">Warum Veranstalter profitieren.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Mic, title: "Bühnenpräsenz", desc: "Souveränes Auftreten und natürliche Autorität auf der Bühne — geschult durch hunderte Live-Auftritte." },
            { icon: Zap, title: "Spontanität", desc: "Flexibel reagieren, wenn der Plan sich ändert. Improvisieren, ohne dass es jemand merkt." },
            { icon: Heart, title: "Empathie", desc: "Das Publikum lesen und abholen. Ob Gala-Stimmung oder lockeres Teamevent — der richtige Ton trifft." },
            { icon: Clock, title: "Timing", desc: "Perfektes Zeitmanagement auf der Bühne. Der Abend läuft flüssig, ohne Leerlauf oder Hektik." },
            { icon: Sparkles, title: "Entertainment", desc: "Optional: Magische Einlagen zwischen den Programmpunkten. Der Mehrwert, den nur ein Showkünstler bieten kann." },
            { icon: Award, title: "Erfahrung", desc: "Über 500 Events, Galas und Firmenfeiern. Professionelle Vorbereitung und zuverlässige Durchführung." },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl bg-background group hover:shadow-lg transition-all duration-300">
              <item.icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EventFormate = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Formate</span>
          <h2 className="headline-section text-foreground mb-6">Für welche Events ich moderiere.</h2>
        </div>
        <HorizontalSlider
          items={[
            { title: "Firmenevents & Galas", desc: "Jahresabschlüsse, Jubiläen, Kundenevents — professionelle Moderation mit Charme und Souveränität." },
            { title: "Award-Verleihungen", desc: "Spannung aufbauen, Gewinner feiern, den Saal zum Applaudieren bringen — perfekt inszeniert." },
            { title: "Messen & Produktpräsentationen", desc: "Auf der Bühne oder am Stand — ich halte die Aufmerksamkeit und vermittle eure Botschaft." },
            { title: "Talkformate & Panels", desc: "Gesprächsrunden leiten, Fragen stellen, die Diskussion am Laufen halten — locker und professionell." },
            { title: "Teamevents & Incentives", desc: "Den Rahmen geben, Programmpunkte verbinden, die Stimmung hoch halten." },
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

const KombiSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={buehneZuschauerImg} alt="Begeistertes Publikum" className="w-full h-[500px] object-cover object-top" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <span className="badge-gradient mb-8 inline-flex">Kombi-Paket</span>
            <h2 className="headline-section text-foreground mb-6">Moderation + Entertainment.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Das Besondere: Ich moderiere euer Event und sorge gleichzeitig für magische Highlights
                zwischen den Programmpunkten. Zwei Dienstleistungen, ein Künstler — für ein nahtloses Erlebnis.
              </p>
              <p>
                Statt einem Moderator UND einem Entertainer bucht ihr beides in einer Person.
                Das spart Kosten, vereinfacht die Planung und sorgt für ein stimmiges Gesamtkonzept.
              </p>
              <div className="space-y-3 mt-6">
                {["Nahtlose Übergänge zwischen Programm und Entertainment", "Ein Ansprechpartner für alles", "Magische Einlagen als Überraschungsmomente", "Kostenersparnis durch Kombi-Buchung"].map((p) => (
                  <div key={p} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{p}</p>
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

const FAQModeration = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="badge-muted mb-8 inline-flex">FAQ</span>
            <h2 className="headline-section text-foreground">Häufige Fragen.</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { q: "Moderierst du auch ohne Zaubershow?", a: "Ja, natürlich! Ich moderiere auch rein als Moderator — ohne magische Einlagen. Die Kombination ist optional, aber sehr beliebt." },
              { q: "Für wie viele Gäste moderierst du?", a: "Von intimen Runden mit 30 Gästen bis hin zu Galas mit 1.000+ Teilnehmern — ich passe mich dem Format an." },
              { q: "Wie bereitest du dich vor?", a: "Ich bespreche den Ablauf, die Programmpunkte und die Zielsetzung vorab mit dir. Ich bekomme alle Infos, die ich brauche, und bereite mich professionell vor." },
              { q: "Brauchst du ein Script?", a: "Gerne — oder ich entwickle die Moderation frei nach Briefing. Beides funktioniert. Ich bin flexibel und erfahren genug für spontane Anpassungen." },
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

const Moderation = () => (
  <>
    <Helmet>
      <title>Event-Moderator – Emilian Leber | Moderation mit Magie</title>
      <meta name="description" content="Event-Moderator Emilian Leber: Moderation mit Charme, Humor und optionaler Magie. Für Firmenfeiern, Galas, Award-Verleihungen und Messen." />
      <link rel="canonical" href="https://www.magicel.de/moderation" />
      <meta property="og:title" content="Event-Moderator – Emilian Leber | Moderation mit Magie" />
      <meta property="og:description" content="Event-Moderator Emilian Leber: Moderation mit Charme, Humor und optionaler Magie. Für Firmenfeiern, Galas, Award-Verleihungen und Messen." />
      <meta property="og:url" content="https://www.magicel.de/moderation" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Event-Moderator – Emilian Leber | Moderation mit Magie" />
      <meta name="twitter:description" content="Event-Moderator Emilian Leber: Moderation mit Charme, Humor und optionaler Magie. Für Firmenfeiern, Galas, Award-Verleihungen und Messen." />
    </Helmet>
    <PageLayout>
    <BackgroundHero
      imageSrc={heroImg}
      badge="Moderation"
      headline="Moderation mit"
      animatedWords={["Charme.", "Präsenz.", "Timing.", "Persönlichkeit."]}
      subline="Ich moderiere eure Events mit Souveränität, Humor und Bühnenpräsenz — und bringe auf Wunsch magische Highlights mit, die kein anderer Moderator bieten kann."
      ctaPrimary={{ text: "Moderation anfragen", to: "/buchung" }}
    />
    <WasIstSection />
    <VorteileSection />
    <EventFormate />
    <KombiSection />
    <FAQModeration />
    <ProcessSteps />
    <BookingCTA headline={"Euer Event verdient einen besonderen Moderator."} subline="Ich moderiere mit Persönlichkeit, Charme und optionaler Magie — für Events, die in Erinnerung bleiben." />
  </PageLayout>
  </>
);

export default Moderation;
