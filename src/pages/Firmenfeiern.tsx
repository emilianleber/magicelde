import PageLayout from "@/components/landing/PageLayout";
import BookingCTA from "@/components/landing/BookingCTA";
import HorizontalSlider from "@/components/landing/HorizontalSlider";
import BackgroundHero from "@/components/landing/BackgroundHero";
import { TrustStrip, ClientLogos } from "@/components/landing/TrustElements";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCounter } from "@/hooks/useCounter";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import corporateImg from "@/assets/corporate-event.jpg";
import portraitImg from "@/assets/magician-portrait.jpg";
import closeupImg from "@/assets/closeup-magic.jpg";
import stageImg from "@/assets/stage-show.jpg";
import audienceImg from "@/assets/audience-reactions.jpg";
import heroImg from "@/assets/hero-magic.jpg";
import {
  Check,
  X,
  Star,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  ArrowRight,
  Building2,
  Shield,
  Lightbulb,
  MessageCircle,
  Award,
  Zap,
  Sparkles,
} from "lucide-react";

/* 1. Hero */
const HeroCorporate = () => (
  <BackgroundHero
    imageSrc={corporateImg}
    badge="Zauberer für Firmenfeiern & Events"
    headline="Events, die"
    animatedWords={["wirken.", "verbinden.", "beeindrucken.", "bleiben."]}
    subline="Professionelles Entertainment für Firmenfeiern, Kundenevents und Galas — modern, interaktiv und mit echtem Mehrwert für Gäste, Teams und Unternehmen."
    ctaPrimary={{ text: "Event anfragen", to: "/buchung" }}
    ctaSecondary={{ text: "Konzepte ansehen ↓", href: "#showkonzepte" }}
  />
);

/* 2. Warum Magie für Firmen */
const WarumSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Das Problem</span>
          <h2 className="headline-section text-foreground mb-8">
            Warum viele Firmenevents austauschbar bleiben.
          </h2>
          <div className="space-y-5 text-detail max-w-xl">
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Hand aufs Herz: Viele Firmenfeiern sind nett organisiert, aber am nächsten Tag
              schon wieder vergessen.
            </p>
            <p>
              Oft fehlt ein gemeinsames Erlebnis — etwas, das Mitarbeiter, Kunden und Partner
              gleichzeitig abholt, zum Lachen bringt und ins Gespräch bringt.
            </p>
            <p>
              Genau hier entsteht der Unterschied: Ein Zauberer auf der Firmenfeier ist nicht
              nur Unterhaltung, sondern ein echter Katalysator für Atmosphäre, Gespräche und
              bleibende Erinnerungen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 3. Typische Probleme */
const ProblemeSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">Kennen Sie das?</h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {[
            "Gäste bleiben in ihren Gruppen — kein echtes Networking",
            "Das Programm ist nett, aber kein echtes Highlight",
            "Mitarbeiter aus verschiedenen Abteilungen kommen nicht ins Gespräch",
            "Die Weihnachtsfeier fühlt sich jedes Jahr ähnlich an",
            "Kundenevents hinterlassen keinen bleibenden Eindruck",
            "Es fehlt der Moment, über den alle reden",
          ].map((problem) => (
            <div key={problem} className="p-6 rounded-3xl bg-background flex items-start gap-3">
              <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-foreground">{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 4. Lösung */
const LoesungSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <span className="badge-accent mb-8 inline-flex">Die Lösung</span>
            <h2 className="headline-section text-foreground mb-6">
              Entertainment mit echtem Mehrwert.
            </h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Ein Zauberer ist der unterschätzte Gamechanger für Business-Events.
              </p>
              <p>
                Stellen Sie sich vor: Ihre Gäste stehen beim Empfang, und innerhalb von Sekunden
                lachen alle zusammen, staunen und kommen ganz natürlich ins Gespräch.
              </p>
              <p>
                Genau das ist professionelle Eventmagie: nicht zufällig, sondern gezielt eingesetzt,
                um Hierarchien aufzulösen, Kommunikation zu fördern und Ihr Event spürbar aufzuwerten.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { icon: Users, label: "Networking-Booster" },
                { icon: TrendingUp, label: "Event-Aufwertung" },
                { icon: Target, label: "Hohe Erinnerung" },
                { icon: Briefcase, label: "Professionell" },
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
              <img
                src={audienceImg}
                alt="Begeisterte Gäste bei einem Firmenevent"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* 5. Einsatzbereiche Slider */
const EinsatzSlider = () => {
  const { ref, isVisible } = useScrollReveal();

  const bereiche = [
    {
      title: "Firmenfeiern & Jahresabschlüsse",
      desc: "Das Highlight, auf das sich alle freuen — und über das noch Monate gesprochen wird.",
      icon: Building2,
    },
    {
      title: "Galas & Awards",
      desc: "Elegantes Entertainment auf höchstem Niveau — passend für anspruchsvolle Events.",
      icon: Award,
    },
    {
      title: "Messen & Promotions",
      desc: "Magie, die Aufmerksamkeit erzeugt und Menschen an Ihren Stand zieht.",
      icon: Target,
    },
    {
      title: "Produktpräsentationen",
      desc: "Ihre Botschaft, inszeniert mit Staunen und bleibender Wirkung.",
      icon: Lightbulb,
    },
    {
      title: "Teamevents & Incentives",
      desc: "Gemeinsames Staunen verbindet und schafft echte Gespräche zwischen Kollegen.",
      icon: Users,
    },
    {
      title: "Weihnachtsfeiern",
      desc: "Die Firmenfeier, die endlich anders ist als alle anderen.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Einsatzbereiche</span>
          <h2 className="headline-section text-foreground mb-6">Vielseitig einsetzbar.</h2>
        </div>
        <HorizontalSlider
          items={bereiche.map((b) => ({
            content: (
              <div className="p-8 rounded-3xl bg-background h-full">
                <b.icon className="w-8 h-8 text-accent mb-5" />
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{b.title}</h3>
                <p className="text-detail">{b.desc}</p>
              </div>
            ),
          }))}
        />
      </div>
    </section>
  );
};

/* 6. Showformate */
const ShowkonzepteCorporate = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="showkonzepte" className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Showkonzepte</span>
          <h2 className="headline-section text-foreground mb-6">Drei Formate für Ihr Event.</h2>
          <p className="text-body max-w-xl mx-auto">
            Jedes Format wird individuell auf Anlass, Publikum und Ziel Ihres Events abgestimmt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              img: closeupImg,
              title: "Close-Up Magie",
              sub: "Empfang & Networking",
              desc: "Direkt bei Ihren Gästen — interaktive Magie, die Gespräche entfacht und Menschen verbindet.",
              link: "/close-up",
            },
            {
              img: stageImg,
              title: "Bühnenshow",
              sub: "Zentrales Highlight",
              desc: "Strukturiert, mitreißend und unterhaltsam — die Show für den großen Moment.",
              link: "/buehnenshow",
            },
            {
              img: heroImg,
              title: "Individuelles Konzept",
              sub: "Maßgeschneidert",
              desc: "Angepasst auf Ihre Marke, Ihre Botschaft und Ihren Anlass — inklusive Einbindung von Firmeninhalten.",
              link: "/buchung",
            },
          ].map((k, i) => (
            <Link
              to={k.link}
              key={k.title}
              className={`group relative rounded-3xl overflow-hidden aspect-[3/4] ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <img
                src={k.img}
                alt={k.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-background/50 mb-3">
                  {k.sub}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-background mb-3">
                  {k.title}
                </h3>
                <p className="font-sans text-sm text-background/70 leading-relaxed max-w-xs">
                  {k.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 7. Ablauf */
const AblaufSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-muted mb-8 inline-flex">Ablauf</span>
          <h2 className="headline-section text-foreground mb-6">So läuft Ihr Event ab.</h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {[
            {
              num: "01",
              title: "Briefing",
              desc: "Wir besprechen Anlass, Ziele, Gästestruktur und Ablauf. Ich berate Sie individuell.",
            },
            {
              num: "02",
              title: "Konzept",
              desc: "Sie erhalten ein maßgeschneidertes Angebot mit klarem Konzept und transparenter Planung.",
            },
            {
              num: "03",
              title: "Vorbereitung",
              desc: "Ich stimme mich mit Ihrem Team ab und passe die Show an Ihr Event an.",
            },
            {
              num: "04",
              title: "Performance",
              desc: "Am Event-Tag bin ich pünktlich vor Ort und sorge für das Entertainment-Highlight.",
            },
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

/* 8. Mehrwert für Unternehmen */
const MehrwertSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Mehrwert</span>
          <h2 className="headline-section text-foreground mb-6">Mehr als nur Unterhaltung.</h2>
        </div>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {[
            {
              icon: Users,
              title: "Stärkt Kommunikation",
              desc: "Magie bringt Menschen aus verschiedenen Teams und Abteilungen ganz natürlich ins Gespräch.",
            },
            {
              icon: TrendingUp,
              title: "Wertet Events auf",
              desc: "Ihre Veranstaltung wird vom netten Abend zum echten Highlight.",
            },
            {
              icon: Target,
              title: "Hohe Erinnerungswirkung",
              desc: "Emotionale Erlebnisse bleiben länger im Gedächtnis — auch für Kunden und Partner.",
            },
            {
              icon: MessageCircle,
              title: "Networking-Effekt",
              desc: "Zauberkunst ist der perfekte Gesprächsstarter für Empfänge und Business-Events.",
            },
            {
              icon: Shield,
              title: "Zuverlässige Planung",
              desc: "Professionelle Abwicklung, pünktlich und souverän — ohne Mehraufwand für Ihr Team.",
            },
            {
              icon: Zap,
              title: "Emotionale Markenbindung",
              desc: "Positive Emotionen verbinden sich direkt mit Ihrem Unternehmen und Ihrem Event.",
            },
          ].map((item) => (
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

/* 9. Bewertungen */
const ReferenzenSlider = () => {
  const { ref, isVisible } = useScrollReveal();

  const testimonials = [
    {
      quote:
        "Wir hatten Emilian - den jungen Magier - für unsere 20er-Jahre-Party auf der Donau gebucht, und er war einfach großartig! Mit seinen beeindruckenden Kartentricks und anderen kleinen Zaubereien hat er die Gäste an den Tischen immer wieder überrascht und begeistert. Besonders schön war, wie er alle aktiv in seine Tricks eingebunden hat – das hat für eine tolle Atmosphäre gesorgt. Hut ab, wenn man bedenkt, dass er noch so jung ist. Absolute Empfehlung für jede Veranstaltung, die etwas Magisches braucht!",
      author: "Christian Schürmann",
      role: "Local Guide · 8 Rezensionen · 13 Fotos · vor einem Jahr",
    },
    {
      quote:
        "Die Agenturgruppe Wächter aus München bedankt sich vielmals bei Emilian, der rund 200 geladene Gäste eines Bayerischen Versicherungsunternehmens mit einer eigens entwickelten Zaubertrickshow in einem inszenierten Magic Camp begeistert hat - es war einfach Mega!",
      author: "Jan von Lehmann",
      role: "1 Rezension · vor 8 Monaten",
    },
    {
      quote:
        "Lieber Emilian, vielen Dank für den gelungenen Abend bei unserem Magic Dinner im Wald & Wiese. Die Show war professionell, unterhaltsam und bei unseren Gästen durchweg sehr gut angekommen. Die Stimmung im Restaurant war hervorragend und das Feedback zum gesamten Event äußerst positiv. Auch die Zusammenarbeit und Abstimmung im Vorfeld sowie während des Abends war zuverlässig und angenehm. Wir freuen uns auf weitere gemeinsame Veranstaltungen.",
      author: "Sophia Leber",
      role: "3 Rezensionen · vor einem Monat",
    },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground">Was Kunden sagen.</h2>
        </div>
        <HorizontalSlider
          items={testimonials.map((t) => ({
            content: (
              <blockquote className="p-8 rounded-3xl bg-background h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent/70 text-accent/70" />
                  ))}
                </div>
                <p className="font-sans text-base text-foreground leading-relaxed mb-6 flex-1">
                  „{t.quote}"
                </p>
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

/* 10. Case Studies */
const CaseStudies = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="badge-accent mb-8 inline-flex">Beispiele</span>
          <h2 className="headline-section text-foreground mb-6">So setze ich Events um.</h2>
        </div>
        <div
          className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          {[
            {
              title: "Weihnachtsfeier · 100 Gäste",
              company: "STRABAG",
              format: "Close-Up zur Begrüßung + Bühnenshow",
              result: "Begeisterte Zuschauer und eine unvergessliche Firmenfeier mit starker gemeinsamer Atmosphäre.",
            },
            {
              title: "Jahresabschlussfeier · 150 Gäste",
              company: "HEIM & HAUS",
              format: "Close-Up",
              result: "Magische Connections und ein entspannter, besonderer Ausklang für die Mitarbeiter.",
            },
            {
              title: "Einweihung einer Jugendeinrichtung · 100 Gäste",
              company: "Stadt Regensburg",
              format: "Bühnenshow",
              result: "Standing Ovations und starke Rückmeldungen von Gästen und Verantwortlichen.",
            },
            {
              title: "Charity Event auf dem Oktoberfest · 600 Gäste",
              company: "Sixt",
              format: "Close-Up",
              result: "Begeisterte Gäste, prominente Besucher und eine außergewöhnliche Eventatmosphäre.",
            },
          ].map((c) => (
            <div key={c.title} className="p-8 rounded-3xl bg-muted/40">
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{c.title}</h3>
              <p className="font-sans text-xs text-muted-foreground mb-4">{c.company}</p>
              <div className="space-y-2 text-detail text-sm">
                <p>
                  <strong className="text-foreground">Format:</strong> {c.format}
                </p>
                <p>
                  <strong className="text-foreground">Ergebnis:</strong> {c.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 11. Vergleich */
const VergleichCorporate = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto text-center mb-20 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="headline-section text-foreground mb-6">
            Nicht irgendein Programmpunkt.
          </h2>
        </div>
        <div
          className={`grid md:grid-cols-2 gap-12 max-w-4xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.15s" }}
        >
          <div className="p-8 rounded-3xl bg-background border border-border/50">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground/40 mb-8">
              Standard-Entertainment
            </p>
            <ul className="space-y-5">
              {[
                "Klassisch, vorhersehbar, austauschbar",
                "Wenig Bezug zum Unternehmen",
                "Reine Unterhaltung ohne Mehrwert",
                "Kein echter Networking-Effekt",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-muted-foreground/30 shrink-0 mt-1" />
                  <span className="text-detail">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-8">
              Emilian Leber
            </p>
            <ul className="space-y-5">
              {[
                "Modern, souverän und passend für Business-Events",
                "Individuell auf Unternehmen und Anlass abgestimmt",
                "Entertainment mit echtem Gesprächs- und Networking-Effekt",
                "Professionell geplant und zuverlässig umgesetzt",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span className="font-sans text-sm md:text-base text-foreground">{item}</span>
                </li>
              ))}
            </ul>
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
      <p className="font-display text-5xl md:text-6xl font-bold text-foreground tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mt-3">
        {label}
      </p>
    </div>
  );
};

const StatsCorporate = () => (
  <section className="section-medium">
    <div className="container px-6">
      <div className="flex flex-wrap justify-center gap-16 md:gap-24">
        <StatItem end={200} suffix="+" label="Events" />
        <StatItem end={100} suffix="%" label="Weiterempfehlung" />
        <StatItem end={10} suffix="+" label="Jahre Erfahrung" />
      </div>
    </div>
  </section>
);

/* 13. FAQ */
const FAQEntscheider = () => {
  const { ref, isVisible } = useScrollReveal();

  const faqs = [
    {
      q: "Wie viel Budget sollten wir einplanen?",
      a: "Die Investition hängt von Format, Dauer und Umfang ab. Ich erstelle Ihnen nach einem kurzen Briefing ein transparentes, individuelles Angebot — komplett unverbindlich.",
    },
    {
      q: "Können Sie sich an unsere Corporate Identity anpassen?",
      a: "Absolut. Ich stimme mich auf Ihre Marke, Ihre Botschaft und den Ton Ihres Events ab. Auch die Integration von Firmeninhalten in die Show ist möglich.",
    },
    {
      q: "Wie planen wir das am besten in unseren Ablauf ein?",
      a: "Ich berate Sie persönlich zum optimalen Timing und Format. Close-Up eignet sich perfekt für Empfang und Networking, die Bühnenshow als zentrales Highlight.",
    },
    {
      q: "Können wir Sie vorab kennenlernen?",
      a: "Selbstverständlich — ein persönliches Kennenlerngespräch per Video oder Telefon ist Teil meines Services.",
    },
  ];

  return (
    <section className="section-large section-alt" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-3xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="badge-muted mb-8 inline-flex">FAQ</span>
            <h2 className="headline-section text-foreground mb-6">Fragen von Entscheidern.</h2>
          </div>
          <div className="divide-y divide-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer font-sans text-base md:text-lg font-medium text-foreground pr-8 hover:text-accent transition-colors list-none">
                  {faq.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform duration-300 text-xl">
                    +
                  </span>
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

/* 14. Über mich kurz */
const UeberMichKurz = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={`${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="rounded-3xl overflow-hidden">
              <img
                src={portraitImg}
                alt="Emilian Leber als Zauberer"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div
            className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <span className="badge-accent mb-8 inline-flex">Ihr Entertainer</span>
            <h2 className="headline-sub text-foreground mb-6">Emilian Leber.</h2>
            <div className="space-y-5 text-detail max-w-lg">
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Moderner Zauberer mit über 200 Events — von intimen Dinnerformaten bis zu großen Galas.
              </p>
              <p>
                Mein Stil: souverän, humorvoll und professionell. Ich passe mich an jedes Publikum an
                und sorge dafür, dass Ihr Event das Entertainment-Highlight bekommt, das es verdient.
              </p>
            </div>
            <Link to="/ueber-mich" className="btn-secondary mt-8 group">
              Mehr erfahren{" "}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Firmenfeiern = () => (
  <>
    <Helmet>
      <title>Firmenfeier Zauberer – Emilian Leber | Zauberer für Firmenfeiern &amp; Events</title>
      <meta
        name="description"
        content="Firmenfeier Zauberer Emilian Leber: interaktive Magie für Firmenfeier, Weihnachtsfeier, Gala & Kundenevent. Close-Up, Bühnenshow oder individuelles Konzept – deutschlandweit buchbar."
      />
      <link rel="canonical" href="https://www.magicel.de/firmenfeiern" />
      <meta property="og:title" content="Firmenfeier Zauberer – Emilian Leber | Zauberer für Firmenfeiern & Events" />
      <meta property="og:description" content="Firmenfeier Zauberer Emilian Leber: interaktive Magie für Firmenfeier, Weihnachtsfeier, Gala & Kundenevent. Close-Up, Bühnenshow oder individuelles Konzept." />
      <meta property="og:url" content="https://www.magicel.de/firmenfeiern" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Firmenfeier Zauberer – Emilian Leber | Zauberer für Firmenfeiern & Events" />
      <meta name="twitter:description" content="Firmenfeier Zauberer Emilian Leber: interaktive Magie für Firmenfeier, Weihnachtsfeier, Gala & Kundenevent. Close-Up, Bühnenshow oder individuelles Konzept." />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Zauberer für Firmenfeiern – Emilian Leber",
        "url": "https://www.magicel.de/firmenfeiern",
        "description": "Firmenfeier Zauberer Emilian Leber: Close-Up Magie und Bühnenshow für Firmenfeiern, Galas, Weihnachtsfeiern und Kundenevents – deutschlandweit.",
        "serviceType": "Firmenfeier Zauberer",
        "areaServed": ["München", "Berlin", "Hamburg", "Frankfurt", "Köln", "Deutschland"],
        "provider": {
          "@type": "Person",
          "name": "Emilian Leber",
          "jobTitle": "Zauberer & Showkünstler",
          "url": "https://www.magicel.de"
        }
      })}</script>
    </Helmet>

    <PageLayout>
      <HeroCorporate />
      <TrustStrip />
      <ClientLogos title="Bekannt von Events für Unternehmen, Veranstalter und Institutionen." />
      <ReferenzenSlider />
      <WarumSection />
      <ProblemeSection />
      <LoesungSection />
      <EinsatzSlider />
      <ShowkonzepteCorporate />
      <AblaufSection />
      <MehrwertSection />
      <CaseStudies />
      <VergleichCorporate />
      <StatsCorporate />
      <FAQEntscheider />
      <UeberMichKurz />
      <BookingCTA
        headline={"Machen Sie Ihr Event\nunvergesslich."}
        subline="Individuelle Konzepte, professionelle Umsetzung. Lassen Sie uns über Ihr nächstes Event sprechen."
      />
    </PageLayout>
  </>
);

export default Firmenfeiern;