import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
} from "lucide-react";

const HeroKontakt = () => (
  <section
    className="section-dark relative min-h-[60vh] flex flex-col justify-center overflow-hidden"
    style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(225 80% 20% / 0.5) 0%, #08080d 70%)" }}
  >
    <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-5xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Kontakt</span>
        </div>
        <h1
          className="headline-hero mb-8 opacity-0 animate-fade-up text-white"
          style={{ animationDelay: "0.3s" }}
        >
          Lass uns <span className="text-gradient">sprechen.</span>
        </h1>
        <p
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
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
        <div
          className={`grid md:grid-cols-2 gap-16 max-w-4xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div>
            <h2 className="headline-sub text-foreground mb-8">Direkt erreichen.</h2>

            <div className="space-y-8">
              <a href="mailto:el@magicel.de" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    el@magicel.de
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Antwort innerhalb 24h
                  </p>
                </div>
              </a>

              <a href="tel:+4915563744696" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    +49 155 63744696
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Persönlich erreichbar
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">
                    Reichsstiftstraße 18, 93055 Regensburg
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    Regensburg · Deutschlandweit buchbar
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-display text-sm font-bold text-foreground mb-4">
                Social Media
              </p>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    href: "https://www.instagram.com/_magicel/",
                    icon: Instagram,
                    label: "Instagram",
                  },
                  {
                    href: "https://www.youtube.com/channel/UCDm5lC0Dq3b8vhJpwRJcXCA",
                    icon: Youtube,
                    label: "YouTube",
                  },
                  {
                    href: "https://de.linkedin.com/in/emilian-leber-3b3414369",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://www.facebook.com/people/Emilian-Leber-Zauberer-Mentalist/61582946450467/",
                    icon: Facebook,
                    label: "Facebook",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent/10 transition-colors group"
                    aria-label={s.label}
                  >
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
  <>
    <Helmet>
      <title>Kontakt &amp; Anfrage – Zauberer Emilian Leber</title>
      <meta
        name="description"
        content="Jetzt Kontakt aufnehmen mit Zauberer Emilian Leber. Unverbindliche Anfrage für Hochzeit, Firmenfeier oder Event – Antwort innerhalb von 24 Stunden."
      />
      <link rel="canonical" href="https://www.magicel.de/kontakt" />
      <meta property="og:title" content="Kontakt & Anfrage – Zauberer Emilian Leber" />
      <meta property="og:description" content="Jetzt Kontakt aufnehmen mit Zauberer Emilian Leber. Unverbindliche Anfrage für Hochzeit, Firmenfeier oder Event – Antwort innerhalb von 24 Stunden." />
      <meta property="og:url" content="https://www.magicel.de/kontakt" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Kontakt & Anfrage – Zauberer Emilian Leber" />
      <meta name="twitter:description" content="Jetzt Kontakt aufnehmen mit Zauberer Emilian Leber. Unverbindliche Anfrage für Hochzeit, Firmenfeier oder Event – Antwort innerhalb von 24 Stunden." />
      <meta name="twitter:image" content="https://www.magicel.de/og-image.jpg" />
    </Helmet>
    <PageLayout>
      <HeroKontakt />
      <KontaktInfo />
    </PageLayout>
  </>
);

export default Kontakt;
