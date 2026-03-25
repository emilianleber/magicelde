import { useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroBuchung = () => (
  <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-8 md:pt-36 md:pb-12">
      <div className="max-w-5xl mx-auto text-center">
        <span className="badge-accent mb-8 inline-flex">Anfrage</span>

        <h1 className="headline-hero mb-8 text-foreground">
          Jetzt anfragen.
        </h1>

        <p className="text-body max-w-2xl mx-auto">
          Erzähl mir von deinem Event — unverbindlich und kostenlos.
          Ich melde mich innerhalb von 24 Stunden persönlich bei dir.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { icon: Shield, label: "100% unverbindlich" },
            { icon: Clock, label: "Antwort in 24h" },
            { icon: Star, label: "Kostenlose Beratung" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-accent" />
              <span className="font-sans text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FormSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputCls =
    "w-full rounded-2xl bg-muted/50 border-0 px-5 py-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      anlass: String(formData.get("anlass") || ""),
      datum: String(formData.get("datum") || ""),
      ort: String(formData.get("ort") || ""),
      gaeste: formData.get("gaeste")
        ? Number(formData.get("gaeste"))
        : null,
      format: String(formData.get("format") || ""),
      nachricht: String(formData.get("nachricht") || ""),
    };

    try {
      console.log("SEND:", payload);

      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/create-portal-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.error || "Fehler bei Anfrage");
      }

      form.reset();
      setSuccess(
        "Deine Anfrage wurde erfolgreich gesendet. Wir melden uns bei dir."
      );

      setTimeout(() => {
        navigate("/danke");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Beim Absenden ist ein Fehler aufgetreten.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div
          className={`max-w-2xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input name="name" placeholder="Name *" required className={inputCls} />
              <input name="email" placeholder="E-Mail *" required className={inputCls} />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <input name="phone" placeholder="Telefon" className={inputCls} />
              <input name="anlass" placeholder="Anlass" className={inputCls} />
            </div>

            <textarea
              name="nachricht"
              placeholder="Nachricht"
              rows={5}
              className={inputCls + " resize-none"}
            />

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {success && (
              <div className="text-green-600 text-sm">{success}</div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full"
            >
              {sending ? "Wird gesendet…" : "Anfrage absenden"}
            </button>
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
