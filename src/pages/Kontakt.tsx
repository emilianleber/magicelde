import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Instagram, Youtube } from "lucide-react";

const HeroKontakt = () => (
  <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Kontakt</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
          Lass uns sprechen.
        </h1>
        <p className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Ich freue mich auf deine Nachricht. Ob erste Idee oder konkretes Event —
          ich antworte persönlich und innerhalb von 24 Stunden.
        </p>
      </div>
    </div>
  </section>
);

const KontaktInfo = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`grid md:grid-cols-2 gap-16 max-w-4xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <div>
            <h2 className="headline-sub text-foreground mb-8">Direkt erreichen.</h2>
            <div className="space-y-8">
              <a href="mailto:kontakt@magicel.de" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors">kontakt@magicel.de</p>
                  <p className="font-sans text-xs text-muted-foreground">Antwort innerhalb 24h</p>
                </div>
              </a>
              <a href="tel:+4915123456789" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors">+49 151 234 567 89</p>
                  <p className="font-sans text-xs text-muted-foreground">Mo–Fr, 9–18 Uhr</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">Regensburg, Bayern</p>
                  <p className="font-sans text-xs text-muted-foreground">Deutschlandweit & international buchbar</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-display text-sm font-bold text-foreground mb-4">Social Media</p>
              <div className="flex gap-3">
                {[
                  { href: "https://instagram.com/magicel", icon: Instagram, label: "Instagram" },
                  { href: "https://youtube.com/@magicel", icon: Youtube, label: "YouTube" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent/10 transition-colors group">
                    <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="headline-sub text-foreground mb-6">Schnell anfragen.</h2>
            <p className="text-detail mb-8">
              Für eine detaillierte Anfrage mit Datum, Anlass und Gästeanzahl nutze am besten
              mein Buchungsformular — so kann ich dir direkt das passende Angebot erstellen.
            </p>
            <Link to="/buchung" className="btn-primary group">
              Zum Buchungsformular
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="font-sans text-xs text-muted-foreground/40 mt-4">
              Kostenlos · Unverbindlich · Antwort innerhalb 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Kontakt = () => (
  <PageLayout>
    <HeroKontakt />
    <KontaktInfo />
  </PageLayout>
);

export default Kontakt;
