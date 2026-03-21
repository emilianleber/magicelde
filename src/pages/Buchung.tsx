import PageLayout from "@/components/landing/PageLayout";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroBuchung = () => (
  <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-8 md:pt-32 md:pb-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <span className="badge-muted mb-8 inline-flex">Anfrage</span>
        </div>
        <h1 className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground" style={{ animationDelay: "0.35s" }}>
          Jetzt anfragen.
        </h1>
        <p className="text-body max-w-lg mx-auto opacity-0 animate-fade-up" style={{ animationDelay: "0.55s" }}>
          Unverbindlich und kostenlos — ich melde mich innerhalb von 24 Stunden.
        </p>
      </div>
    </div>
  </section>
);

const FormSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      navigate("/danke");
    }, 800);
  };

  const inputCls = "w-full rounded-2xl bg-muted/50 border-0 px-5 py-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all";

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className={`max-w-2xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" name="name" placeholder="Name *" required className={inputCls} />
              <input type="email" name="email" placeholder="E-Mail *" required className={inputCls} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="tel" name="phone" placeholder="Telefon (optional)" className={inputCls} />
              <select name="anlass" required className={inputCls} defaultValue="">
                <option value="" disabled>Anlass wählen *</option>
                <option value="hochzeit">Hochzeit</option>
                <option value="firmenfeier">Firmenfeier</option>
                <option value="geburtstag">Geburtstag</option>
                <option value="gala">Gala / Event</option>
                <option value="messe">Messe / Promotion</option>
                <option value="magic-dinner">Magic Dinner</option>
                <option value="sonstiges">Sonstiges</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="date" name="datum" className={inputCls} />
              <input type="text" name="ort" placeholder="Ort / Location" className={inputCls} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="number" name="gaeste" placeholder="Anzahl Gäste" min="1" className={inputCls} />
              <select name="format" className={inputCls} defaultValue="">
                <option value="" disabled>Gewünschtes Format</option>
                <option value="closeup">Close-Up Magie</option>
                <option value="buehne">Bühnenshow</option>
                <option value="walking">Walking Act</option>
                <option value="dinner">Magic Dinner</option>
                <option value="kombi">Kombination</option>
                <option value="unsicher">Noch unsicher</option>
              </select>
            </div>
            <textarea
              name="nachricht"
              placeholder="Erzähl mir von deinem Event — was wünscht du dir?"
              rows={5}
              className={inputCls + " resize-none"}
            />
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-foreground font-sans text-base font-medium text-background transition-all duration-300 hover:bg-foreground/85 hover:shadow-[0_12px_40px_hsla(0,0%,0%,0.12)] active:scale-[0.97] disabled:opacity-50"
              >
                {sending ? "Wird gesendet…" : "Anfrage absenden"}
              </button>
              <p className="font-sans text-xs text-muted-foreground/50 mt-4">
                Kostenlos · Unverbindlich · Antwort innerhalb 24h
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Buchung = () => (
  <PageLayout>
    <HeroBuchung />
    <FormSection />
    <ProcessSteps />
  </PageLayout>
);

export default Buchung;
