import { useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/integrations/supabase/client";
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
              <span className="text-sm text-muted-foreground">
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
  const { ref } = useScrollReveal();
  const navigate = useNavigate();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputCls =
    "w-full rounded-2xl bg-muted/50 px-5 py-4 text-sm text-foreground";

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
      console.log("FUNCTION START");

      const { data, error: fnError } =
        await supabase.functions.invoke("create-portal-request", {
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });

      console.log("FUNCTION DONE", data, fnError);

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      form.reset();

      setSuccess("Deine Anfrage wurde erfolgreich gesendet!");

      setTimeout(() => {
        navigate("/danke");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Fehler beim Absenden");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                required
                className={inputCls}
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail *"
                required
                className={inputCls}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                className={inputCls}
              />

              <select name="anlass" required className={inputCls}>
                <option value="">Anlass *</option>
                <option value="hochzeit">Hochzeit</option>
                <option value="firmenfeier">Firmenfeier</option>
                <option value="geburtstag">Geburtstag</option>
              </select>
            </div>

            <textarea
              name="nachricht"
              placeholder="Nachricht"
              className={inputCls}
            />

            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}

            <button type="submit" disabled={sending}>
              {sending ? "Senden..." : "Anfrage absenden"}
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
