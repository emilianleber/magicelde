import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import ProcessSteps from "@/components/landing/ProcessSteps";
import BackgroundHero from "@/components/landing/BackgroundHero";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import closeupImg from "@/assets/closeup-magic.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import stageImg from "@/assets/stage-show.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import dinnerImg from "@/assets/hero-dinner.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import { ArrowRight, UtensilsCrossed, Sparkles, Wine, Users, Star, Heart, Eye, Clock, Check, Utensils, MessageCircle } from "lucide-react";

/* ─── 2. Was ist ein Magic Dinner ─── */
const WasIstSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-gradient mb-8 inline-flex">Das Konzept</span>
            <h2 className="headline-section text-foreground mb-8">Was ist ein Magic Dinner?</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ein Magic Dinner ist kein gewöhnliches Abendessen mit Zaubershow — 
                es ist ein komplett inszeniertes Erlebnis, bei dem jeder Gang zum Event wird.
              </p>
              <p>
                Zwischen den Gängen komme ich zu jedem Tisch. Die Magie passiert direkt in den Händen
                deiner Gäste — persönlich, witzig, absolut verblüffend. Keine Bühne, kein Abstand — 
                sondern hautnah und interaktiv.
              </p>
              <p>
                Das Besondere: Die Wartezeit zwischen den Gängen wird zum Highlight.
                Statt auf das Essen zu warten, erleben deine Gäste Momente, über die sie
                den Rest des Abends — und noch Wochen danach — reden werden.
              </p>
              <p>
                Kulinarik und Zauberkunst verschmelzen zu einem ganzheitlichen Erlebnis,
                das alle Sinne anspricht. Genuss für den Gaumen, Staunen für den Kopf,
                Lachen für die Seele.
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

/* ─── 3. Das Erlebnis ─── */
const ErlebnisSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient-subtle mb-8 inline-flex">Das Erlebnis</span>
          <h2 className="headline-section text-foreground mb-6">Mehr als nur ein Abendessen.</h2>
          <p className="text-body max-w-xl mx-auto">
            Ein Magic Dinner transformiert ein normales Dinner in ein multisensorisches Erlebnis — 
            Genuss, Staunen, Lachen und Verbindung in einem Abend.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Eye, title: "Staunen", desc: "Verblüffende Magie direkt am Tisch — unmöglich nah und persönlich. Jeder Tisch bekommt sein eigenes Erlebnis." },
            { icon: UtensilsCrossed, title: "Genuss", desc: "Kulinarik und Magie verschmelzen. Zwischen jedem Gang passiert etwas Magisches, das den Abend strukturiert." },
            { icon: Heart, title: "Verbindung", desc: "Gäste kommen ins Gespräch, Tischgruppen werden zu einer Gemeinschaft. Magie ist der ultimative Eisbrecher." },
            { icon: Sparkles, title: "Erinnerung", desc: "Ein Abend, über den noch Monate später gesprochen wird. Das ist der Unterschied zu einem normalen Dinner." },
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

/* ─── 4. Zahlen ─── */
const StatItem = ({ end, suffix, label }: { end: number; suffix: string; label: string }) => {
  const { count, ref } = useCounter(end);
  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">{count}{suffix}</p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">{label}</p>
    </div>
  );
};

const ZahlenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-medium" ref={ref}>
      <div className="container px-6">
        <div className={`flex flex-wrap justify-center gap-16 md:gap-24 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <StatItem end={200} suffix="+" label="Magic Dinners" />
          <StatItem end={100} suffix="%" label="Weiterempfehlung" />
          <StatItem end={5000} suffix="+" label="Begeisterte Gäste" />
        </div>
      </div>
    </section>
  );
};

/* ─── 5. Warum dieses Format besonders ist ─── */
const WarumBesondersSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`order-2 md:order-1 ${isVisible ? "animate-slide-left" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeisterte Gäste beim Magic Dinner" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`order-1 md:order-2 ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <span className="badge-accent mb-8 inline-flex">Der Unterschied</span>
            <h2 className="headline-section text-foreground mb-8">Warum ein Magic Dinner anders ist.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ein normales Dinner ist Genuss. Eine Zaubershow ist Unterhaltung.
                Ein Magic Dinner verbindet beides — und schafft damit etwas komplett Neues.
              </p>
              <div className="space-y-4 mt-6">
                {[
                  "Die Wartezeit zwischen den Gängen wird zum besten Teil des Abends",
                  "Jeder Tisch bekommt ein individuelles, einzigartiges Programm",
                  "Kein Zuschauer, nur Beteiligte — jeder Gast ist Teil der Magie",
                  "Humor und Staunen statt steifer Abendatmosphäre",
                  "Die Magie passt sich dem Rhythmus des Abends an",
                ].map((point) => (
                  <div key={point} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{point}</p>
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

/* ─── 6. Ablauf ─── */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-gradient mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So läuft ein Magic Dinner ab.</h2>
          <p className="text-body max-w-xl mx-auto">
            Ein nahtloses Zusammenspiel aus Kulinarik und Zauberkunst — 
            perfekt getimed, ohne Hektik, ohne Unterbrechungen.
          </p>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {[
            { icon: Wine, num: "01", title: "Empfang", desc: "Walk-Around Magie beim Ankommen. Die Gäste treffen ein, und die Magie beginnt sofort — als perfekter Eisbrecher und Stimmungsmacher." },
            { icon: UtensilsCrossed, num: "02", title: "Erster Gang", desc: "Close-Up Magie direkt am Tisch — persönlich und intim. Die Gäste erleben Magie in ihren eigenen Händen, während der erste Gang serviert wird." },
            { icon: Sparkles, num: "03", title: "Hauptgang", desc: "Die große Tischmagie — interaktiv, verblüffend, witzig. Jetzt hat sich die Dynamik aufgebaut und die Atmosphäre ist elektrisch." },
            { icon: Star, num: "04", title: "Finale", desc: "Ein magisches Finale, das den Abend krönt. Optional als Bühnenmoment für alle Gäste gleichzeitig — ein gemeinsamer Wow-Moment." },
          ].map((item) => (
            <div key={item.title} className="p-8 rounded-3xl bg-background">
              <span className="font-display text-5xl font-bold text-accent/10">{item.num}</span>
              <item.icon className="w-6 h-6 text-accent mt-2 mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-detail text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── 7. Kombination ─── */
const KombinationSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
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
            <p>
              Ob Firmenrestaurant, exklusive Event-Location, Sterneküche oder rustikaler Gewölbekeller —
              das Magic Dinner passt sich jeder Umgebung an und macht sie noch besonderer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 8. Was Gäste erleben ─── */
const GaesteErlebnis = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img src={audienceImg} alt="Begeisterte Gäste beim Magic Dinner" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <span className="badge-gradient-subtle mb-8 inline-flex">Gäste-Perspektive</span>
            <h2 className="headline-section text-foreground mb-6">Was deine Gäste erleben.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed italic">
                „Der Zauberer kam an unseren Tisch und hat direkt in meinen Händen gezaubert.
                Ich konnte es nicht erklären — und mein Mann konnte nicht aufhören zu lachen."
              </p>
              <p>
                So oder so ähnlich beschreiben Gäste ihr Magic-Dinner-Erlebnis. Das Besondere:
                Jeder Tisch bekommt sein eigenes, einzigartiges Programm. Keine Wiederholungen,
                keine Routine — nur persönliche, magische Momente.
              </p>
              <p>
                Die Atmosphäre am Tisch verändert sich innerhalb von Sekunden. Fremde werden zu Verbündeten,
                Kollegen lachen gemeinsam wie alte Freunde, und das ganze Dinner bekommt eine Energie,
                die mit keiner anderen Unterhaltung zu erreichen ist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 9. Für welche Anlässe ─── */
const AnlaesseSlider = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Anlässe</span>
          <h2 className="headline-section text-foreground mb-6">Perfekt für besondere Abende.</h2>
          <p className="text-body max-w-xl mx-auto">
            Ein Magic Dinner passt zu vielen Anlässen — immer dann, wenn aus einem Abendessen ein unvergessliches Erlebnis werden soll.
          </p>
        </div>
        <HorizontalSlider
          items={[
            { title: "Firmendinner & Incentives", desc: "Beeindrucken Sie Kunden und Partner mit einem Abend, der in Erinnerung bleibt. Das Magic Dinner stärkt Beziehungen und schafft Gesprächsanlässe auf höchstem Niveau." },
            { title: "Private Feiern & Jubiläen", desc: "Geburtstage, Jubiläen, besondere Anlässe — ein Magic Dinner macht jeden Abend einzigartig und gibt den Gästen etwas, worüber sie noch lange sprechen." },
            { title: "Teamevents & Weihnachtsfeiern", desc: "Gemeinsam staunen und lachen verbindet Teams stärker als jedes Teambuilding-Seminar. Ein Magic Dinner schafft echte Verbindungen." },
            { title: "Hochzeitsdinners", desc: "Das Hochzeitsdinner als magisches Erlebnis — für Brautpaar und Gäste. Die perfekte Überbrückung zwischen den Gängen und ein Erlebnis für alle Generationen." },
            { title: "Exclusive Dinners & Galas", desc: "Für exklusive Abende im kleinen Kreis, VIP-Dinner oder Gala-Veranstaltungen. Magie, die zur Exklusivität des Abends passt." },
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

/* ─── 10. Galerie ─── */
const GalerieSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Eindrücke.</h2>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          {[dinnerImg, closeupImg, audienceImg, heroImg, portraitImg, stageImg].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square group">
              <img src={src} alt="Magic Dinner Impressionen" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── 11. Referenzen ─── */
const ReferenzenSection = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Stimmen</span>
          <h2 className="headline-section text-foreground mb-6">Was Gäste sagen.</h2>
        </div>
        <HorizontalSlider
          items={[
            { quote: "Das Magic Dinner war das Highlight unseres Firmenjubiläums. Jeder Tisch hatte seinen eigenen magischen Moment — und am Ende haben alle darüber geredet.", author: "Dr. Stefan R.", role: "Geschäftsführer, Technologie" },
            { quote: "Wir hatten Emilian für unser Weihnachtsdinner gebucht und es war unfassbar. Die Stimmung war sofort auf einem anderen Level.", author: "Julia K.", role: "Teamleiterin, Beratung" },
            { quote: "Mein Mann und ich haben das Magic Dinner zu unserem 10. Hochzeitstag erlebt. Es war der schönste Abend seit langem.", author: "Marina L.", role: "Private Feier" },
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

/* ─── 12. Über mich (kurz) ─── */
const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-gradient mb-8 inline-flex">Dein Gastgeber</span>
            <h2 className="headline-section text-foreground mb-6">Warum ich die richtige Wahl bin.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ich bin Emilian Leber — moderner Comedy-Zauberer mit über 200 Magic Dinners Erfahrung.
              </p>
              <p>
                Mein Stil: witzig, elegant, interaktiv. Keine verstaubten Tricks, sondern
                modernes Entertainment, das sich nahtlos in den Rhythmus eines Dinners einfügt.
              </p>
              <p>
                Ich stimme mich vorab mit dem Serviceteam und der Küche ab, sodass die Magie
                perfekt zwischen die Gänge passt. Für euch bedeutet das: null Aufwand, maximales Erlebnis.
              </p>
              <Link to="/ueber-mich" className="btn-secondary inline-flex mt-4">
                Mehr über mich →
              </Link>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src={portraitImg} alt="Emilian Leber — MagicEL" className="w-full h-[500px] object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 13. Details ─── */
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
              { title: "Gruppengröße", desc: "Ideal für 20–80 Gäste. Größere Gruppen auf Anfrage — dann gerne in Kombination mit einer Bühnenshow als Finale." },
              { title: "Dauer", desc: "Typischerweise 2–3 Stunden, begleitend zum Dinner. Die Magie findet zwischen den Gängen statt — perfekt getaktet, ohne den Ablauf zu stören." },
              { title: "Location", desc: "Funktioniert in jedem Restaurant, jeder Event-Location, jedem privaten Rahmen. Ob Sterneküche oder Gewölbekeller — ich passe mich an." },
              { title: "Vorbereitung", desc: "Ich stimme mich mit dem Küchen-/Serviceteam ab. Für euch: null Aufwand. Alles wird vorab besprochen und perfekt koordiniert." },
              { title: "Kombination", desc: "Ein Magic Dinner lässt sich ideal mit einer Bühnenshow kombinieren — als krönender Abschluss für das ganze Publikum." },
            ].map((d) => (
              <div key={d.title} className="py-5 border-b border-border last:border-0">
                <h3 className="font-display text-lg font-bold text-foreground">{d.title}</h3>
                <p className="text-detail mt-2">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 14. FAQ ─── */
const FAQDinner = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="badge-muted mb-8 inline-flex">FAQ</span>
            <h2 className="headline-section text-foreground">Häufige Fragen.</h2>
          </div>
          <div className="divide-y divide-border">
            {[
              { q: "Was ist ein Magic Dinner genau?", a: "Ein mehrgängiges Dinner, bei dem zwischen den Gängen interaktive Tischmagie stattfindet. Jeder Tisch bekommt sein eigenes Erlebnis — keine Wiederholungen, keine Standard-Show." },
              { q: "Brauche ich ein spezielles Restaurant?", a: "Nein! Das Magic Dinner funktioniert in jeder Location mit Tischbestuhlung. Ob Restaurant, Hotel, Event-Location oder privater Rahmen." },
              { q: "Wie viele Gäste sind ideal?", a: "20 bis 80 Gäste sind perfekt. Bei größeren Gruppen kombiniere ich das Magic Dinner gerne mit einer Bühnenshow als Finale." },
              { q: "Kann ich das als Überraschung planen?", a: "Absolut! Ich komme unauffällig und starte, wenn der Zeitpunkt perfekt ist. Viele Gastgeber überraschen ihre Gäste damit — die Reaktionen sind unbezahlbar." },
              { q: "Wie lange dauert ein Magic Dinner?", a: "Typischerweise 2–3 Stunden, begleitend zum gesamten Dinner. Die Magie passiert zwischen den Gängen und fühlt sich natürlich und unaufdringlich an." },
              { q: "Was kostet ein Magic Dinner?", a: "Das hängt von Gruppengröße, Dauer und Location ab. Ich erstelle dir gerne ein individuelles Angebot — komplett kostenlos und unverbindlich." },
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
  <>
    <Helmet>
      <title>Magic Dinner – Zauberhafte Dinner-Show mit Emilian Leber</title>
      <meta
        name="description"
        content="Das Magic Dinner von Emilian Leber verbindet Hochküche mit interaktiver Magie. Ein unvergessliches Erlebnis für besondere Abende und exklusive Firmenevents."
      />
      <link rel="canonical" href="https://www.magicel.de/magic-dinner" />
      <meta property="og:title" content="Magic Dinner – Zauberhafte Dinner-Show mit Emilian Leber" />
      <meta property="og:description" content="Das Magic Dinner von Emilian Leber verbindet Hochküche mit interaktiver Magie. Ein unvergessliches Erlebnis für besondere Abende und exklusive Firmenevents." />
      <meta property="og:url" content="https://www.magicel.de/magic-dinner" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Magic Dinner – Zauberhafte Dinner-Show mit Emilian Leber" />
      <meta name="twitter:description" content="Das Magic Dinner von Emilian Leber verbindet Hochküche mit interaktiver Magie. Ein unvergessliches Erlebnis für besondere Abende und exklusive Firmenevents." />
    </Helmet>
    <PageLayout>
    <BackgroundHero
      imageSrc={dinnerImg}
      badge="Spezialgebiet"
      headline="Das"
      animatedWords={["Magic Dinner.", "Erlebnis.", "Highlight.", "Gourmet-Event."]}
      subline="Ein Abend, an dem kulinarischer Genuss und verblüffende Zauberkunst verschmelzen. Zwischen den Gängen wird gezaubert — direkt am Tisch, persönlich und exklusiv."
      ctaPrimary={{ text: "Magic Dinner planen", to: "/buchung" }}
    />
    <WasIstSection />
    <ErlebnisSection />
    <ZahlenSection />
    <WarumBesondersSection />
    <AblaufSection />
    <KombinationSection />
    <GaesteErlebnis />
    <AnlaesseSlider />
    <GalerieSection />
    <ReferenzenSection />
    <UeberMichKurz />
    <DetailsSection />
    <FAQDinner />
    <ProcessSteps />
    <BookingCTA headline={"Ein Abend zum Staunen."} subline="Plane dein Magic Dinner — ich berate dich persönlich und entwickle ein Konzept, das perfekt zu eurem Anlass passt." />
  </PageLayout>
  </>
);

export default MagicDinner;
