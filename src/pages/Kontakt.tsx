import PageLayout from "@/components/landing/PageLayout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const HeroKontakt = () => (
  <section className="relative min-h-[60vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Kontakt</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Lass uns sprechen.
        </h1>
        <p className="text-body max-w-lg mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Ich freue mich auf deine Nachricht — Antwort innerhalb von 24 Stunden.
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
                <Mail className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <p className="font-sans text-sm font-medium text-foreground group-hover:text-foreground/70 transition-colors">kontakt@magicel.de</p>
                  <p className="font-sans text-xs text-muted-foreground">Antwort innerhalb 24h</p>
                </div>
              </a>
              <a href="tel:+4915123456789" className="flex items-start gap-4 group">
                <Phone className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <p className="font-sans text-sm font-medium text-foreground group-hover:text-foreground/70 transition-colors">+49 151 234 567 89</p>
                  <p className="font-sans text-xs text-muted-foreground">Mo–Fr, 9–18 Uhr</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">Regensburg, Bayern</p>
                  <p className="font-sans text-xs text-muted-foreground">Deutschlandweit buchbar</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Social Media</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/magicel" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
                <a href="https://youtube.com/@magicel" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
                <a href="https://tiktok.com/@magicel" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">TikTok</a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="headline-sub text-foreground mb-8">Anfrage stellen.</h2>
            <p className="text-detail mb-8">
              Für eine detaillierte Anfrage mit Datum, Anlass und Gästeanzahl nutze am besten mein Buchungsformular.
            </p>
            <Link
              to="/buchung"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground font-sans text-sm font-medium text-background transition-all duration-300 hover:bg-foreground/85 active:scale-[0.97]"
            >
              Zum Buchungsformular
            </Link>
            <p className="font-sans text-xs text-muted-foreground/50 mt-4">
              Kostenlos · Unverbindlich
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
