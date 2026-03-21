import PageLayout from "@/components/landing/PageLayout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Danke = () => (
  <PageLayout>
    <section className="min-h-screen flex flex-col justify-center">
      <div className="container px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
          </div>
          <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.3s" }}>
            Vielen Dank!
          </h1>
          <p className="text-body max-w-lg mx-auto mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            Deine Anfrage ist eingegangen. Ich melde mich innerhalb von 24 Stunden
            persönlich bei dir — versprochen.
          </p>
          <div className="opacity-0 animate-fade-up space-y-6" style={{ animationDelay: "0.65s" }}>
            <div className="max-w-md mx-auto text-left mt-16 p-8 rounded-3xl bg-muted/40">
              <h2 className="font-display text-xl font-bold text-foreground text-center mb-6">Nächste Schritte</h2>
              <div className="space-y-5">
                {[
                  { num: "01", text: "Ich prüfe deine Anfrage und melde mich innerhalb von 24 Stunden bei dir." },
                  { num: "02", text: "Wir besprechen alles persönlich — telefonisch oder per Video." },
                  { num: "03", text: "Du erhältst ein individuelles, transparentes und unverbindliches Angebot." },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <span className="font-display text-2xl font-bold text-accent/20">{step.num}</span>
                    <p className="text-detail pt-1">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-8">
              <Link to="/" className="btn-secondary text-accent hover:text-accent/70">
                ← Zurück zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Danke;
