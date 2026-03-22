import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import AnimatedWords from "@/components/landing/AnimatedWords";
import BackgroundHero from "@/components/landing/BackgroundHero";
import VideoHero from "@/components/landing/VideoHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-magic.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/stage-show.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import dinnerImg from "@/assets/hero-dinner.jpg";
import { ArrowRight, UtensilsCrossed, Sparkles, Wine, Users, Star, Clock, Heart, Eye } from "lucide-react";

const KonzeptSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-accent mb-8 inline-flex">Das Konzept</span>
            <h2 className="headline-section text-foreground mb-8">Dinner trifft Magie.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ein Magic Dinner ist mehr als ein Abendessen mit Zaubershow —
                es ist ein komplett inszeniertes Erlebnis, bei dem jeder Gang zum Event wird.
              </p>
              <p>
                Zwischen den Gängen komme ich zu jedem Tisch. Die Magie passiert direkt in den Händen
                deiner Gäste — persönlich, witzig, absolut verblüffend.
              </p>
              <p>
                Das Besondere: Die Wartezeit zwischen den Gängen wird zum Highlight.
                Statt auf das Essen zu warten, erleben deine Gäste Momente, über die sie
                den Rest des Abends reden werden.
              </p>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={closeupImg} alt="Tischmagie beim Magic Dinner" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Erlebnis</span>
          <h2 className="headline-section text-foreground mb-6">Mehr als nur Essen.</h2>
          <p className="text-body max-w-xl mx-auto">
            Ein Magic Dinner transformiert ein normales Abendessen in ein Erlebnis, das alle Sinne anspricht.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Eye, title: "Staunen", desc: "Verblüffende Magie direkt am Tisch — unmöglich nah und persönlich." },
            { icon: UtensilsCrossed, title: "Genuss", desc: "Kulinarik und Magie verschmelzen zu einem ganzheitlichen Erlebnis." },
            { icon: Heart, title: "Verbindung", desc: "Gäste kommen ins Gespräch, Tischgruppen werden zu einer Gemeinschaft." },
            { icon: Sparkles, title: "Erinnerung", desc: "Ein Abend, über den noch Monate später gesprochen wird." },
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

const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So läuft ein Magic Dinner ab.</h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Wine, num: "01", title: "Empfang", desc: "Walk-Around Magie beim Ankommen — der perfekte Einstieg." },
            { icon: UtensilsCrossed, num: "02", title: "Erster Gang", desc: "Close-Up Magie direkt am Tisch — persönlich und intim." },
            { icon: Sparkles, num: "03", title: "Hauptgang", desc: "Die große Tischmagie — interaktiv, verblüffend, witzig." },
            { icon: Star, num: "04", title: "Finale", desc: "Ein magisches Finale, das den Abend krönt." },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-3xl bg-muted/40">
              <span className="font-display text-5xl font-bold text-accent/10">{item.num}</span>
              <item.icon className="w-6 h-6 text-accent mt-2 mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KombinationSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Kombination</span>
          <h2 className="headline-section text-foreground mb-8">Magie + Kulinarik = perfekter Abend.</h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Das Magic Dinner funktioniert perfekt mit jedem Restaurant und jedem Caterer.
              Ich stimme mich mit der Küche ab, damit die Magie genau in den Pausen zwischen den Gängen stattfindet.
            </p>
            <p>
              Die Gäste erleben einen nahtlosen Abend, bei dem Genuss und Staunen perfekt aufeinander abgestimmt sind.
              Kein Hetzen, kein Warten — nur ein Erlebnis, das alle Sinne anspricht.
            </p>
            <p>
              Ideal für 20–80 Gäste. Bei größeren Gruppen kann das Magic Dinner mit einer Bühnenshow
              als Finale kombiniert werden — für das ultimative Rundum-Erlebnis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const GaesteErlebnis = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeisterte Gäste beim Magic Dinner" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <h2 className="headline-section text-foreground mb-6">Was Gäste erleben.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                "Der Zauberer kam an unseren Tisch und hat direkt in meinen Händen gezaubert.
                Ich konnte es nicht erklären — und mein Mann konnte nicht aufhören zu lachen."
              </p>
              <p>
                So oder so ähnlich beschreiben Gäste ihr Magic-Dinner-Erlebnis. Das Besondere:
                Jeder Tisch bekommt sein eigenes, einzigartiges Programm. Keine Wiederholungen,
                keine Routine — nur persönliche, magische Momente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ForWenSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Perfekt für besondere Anlässe.</h2>
        </div>
        <HorizontalSlider
          items={[
            { title: "Firmendinner", desc: "Beeindrucken Sie Kunden und Partner mit einem Abend, der in Erinnerung bleibt." },
            { title: "Private Feiern", desc: "Geburtstage, Jubiläen, besondere Anlässe — ein Magic Dinner macht jeden Abend einzigartig." },
            { title: "Teamevents", desc: "Gemeinsam staunen und lachen — die perfekte Alternative zum klassischen Teamevent." },
            { title: "Hochzeiten", desc: "Das Hochzeitsdinner als magisches Erlebnis — für Brautpaar und Gäste." },
          ].map((item) => ({
            content: (
              <div className="p-8 rounded-3xl bg-background h-full">
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

const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[dinnerImg, closeupImg, audienceImg, heroImg, portraitImg, stageImg].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square group">
              <img src={src} alt="Magic Dinner" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReferenzenSection = () => {
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
              „Das Magic Dinner war das Highlight unseres Firmenjubiläums. Jeder Tisch hatte seinen eigenen
              magischen Moment — und am Ende haben alle darüber geredet."
            </p>
            <footer>
              <p className="font-sans text-base font-semibold text-foreground">Dr. Stefan R.</p>
              <p className="font-sans text-sm text-muted-foreground">Geschäftsführer, Technologie</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

const DetailsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Details</span>
          <h2 className="headline-section text-foreground mb-8">Gut zu wissen.</h2>
          <div className="space-y-6">
            {[
              { title: "Gruppengröße", desc: "Ideal für 20–80 Gäste. Größere Gruppen auf Anfrage — dann gerne in Kombination mit einer Bühnenshow." },
              { title: "Dauer", desc: "Typischerweise 2–3 Stunden, begleitend zum Dinner. Die Magie findet zwischen den Gängen statt." },
              { title: "Location", desc: "Funktioniert in jedem Restaurant, jeder Event-Location, jedem privaten Rahmen." },
              { title: "Vorbereitung", desc: "Ich stimme mich mit dem Küchen-/Serviceteam ab. Für euch: null Aufwand." },
            ].map((d) => (
              <div key={d.title} className="py-4 border-b border-border last:border-0">
                <h3 className="font-display text-lg font-bold text-foreground">{d.title}</h3>
                <p className="text-detail mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQDinner = () => {
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
              { q: "Was ist ein Magic Dinner genau?", a: "Ein mehrgängiges Dinner, bei dem zwischen den Gängen interaktive Tischmagie stattfindet. Jeder Tisch bekommt sein eigenes Erlebnis." },
              { q: "Brauche ich ein spezielles Restaurant?", a: "Nein! Das Magic Dinner funktioniert in jeder Location mit Tischbestuhlung." },
              { q: "Kann ich das als Überraschung planen?", a: "Absolut! Ich komme unauffällig und starte, wenn der Zeitpunkt perfekt ist." },
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

const MagicDinner = () => (
  <PageLayout>
    <BackgroundHero
      imageSrc={dinnerImg}
      badge="Spezialgebiet"
      headline="Das"
      animatedWords={["Magic Dinner.", "Erlebnis.", "Highlight.", "Gourmet-Event."]}
      subline="Ein Abend, an dem kulinarischer Genuss und verblüffende Zauberkunst verschmelzen. Zwischen den Gängen wird gezaubert — direkt am Tisch."
      ctaPrimary={{ text: "Magic Dinner planen", to: "/buchung" }}
    />
    <KonzeptSection />
    <ErlebnisSection />
    <AblaufSection />
    <KombinationSection />
    <GaesteErlebnis />
    <ForWenSlider />
    <GalerieSection />
    <ReferenzenSection />
    <DetailsSection />
    <FAQDinner />
    <ProcessSteps />
    <BookingCTA headline={"Ein Abend zum Staunen."} subline="Plane dein Magic Dinner — ich berate dich persönlich und entwickle ein Konzept, das perfekt zu eurem Anlass passt." />
  </PageLayout>
);

export default MagicDinner;
