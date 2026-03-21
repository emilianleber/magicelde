import PageLayout from "@/components/landing/PageLayout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Danke = () => (
  <PageLayout>
    <section className="min-h-screen flex flex-col justify-center">
      <div className="container px-6 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <CheckCircle className="w-16 h-16 text-primary/60 mx-auto mb-8" />
          </div>
          <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
            Vielen Dank!
          </h1>
          <p className="text-body max-w-md mx-auto mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
            Deine Anfrage ist eingegangen. Ich melde mich innerhalb von 24 Stunden persönlich bei dir.
          </p>
          <div className="opacity-0 animate-fade-up space-y-6" style={{ animationDelay: "0.7s" }}>
            <div className="max-w-sm mx-auto text-left space-y-4 mt-12">
              <h2 className="font-display text-xl italic text-foreground text-center">Nächste Schritte.</h2>
              <div className="space-y-3">
                {[
                  { num: "01", text: "Ich prüfe deine Anfrage und melde mich bei dir." },
                  { num: "02", text: "Wir besprechen alles persönlich — telefonisch oder per Video." },
                  { num: "03", text: "Du erhältst ein individuelles, unverbindliches Angebot." },
                ].map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <span className="font-display text-lg italic text-muted-foreground/40">{step.num}</span>
                    <p className="text-detail">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-8">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-sans text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground active:scale-[0.97]"
              >
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
