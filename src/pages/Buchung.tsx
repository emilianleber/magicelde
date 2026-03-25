import { useState } from "react";
import PageLayout from "@/components/landing/PageLayout";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";
import { Shield, Clock, Star } from "lucide-react";

const HeroBuchung = () => (
  <section className="relative min-h-[50vh] flex flex-col justify-center">
    <div className="container px-6 pt-28 pb-8 text-center">
      <span className="badge-accent mb-6 inline-flex">Anfrage</span>
      <h1 className="headline-hero mb-6">Jetzt anfragen.</h1>
      <p className="max-w-xl mx-auto">
        Erzähl mir von deinem Event — unverbindlich und kostenlos.
      </p>

      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <Shield size={16} /> 100% unverbindlich
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} /> Antwort in 24h
        </div>
        <div className="flex items-center gap-2">
          <Star size={16} /> Kostenlose Beratung
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

  const inputCls = "w-full p-4 rounded-xl border";

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
      console.log("SEND REQUEST", payload);

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
      setSuccess("Anfrage erfolgreich gesendet!");

      setTimeout(() => navigate("/danke"), 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={ref} className="py-16">
      <div className="container max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Name" required className={inputCls} />
          <input name="email" placeholder="E-Mail" required className={inputCls} />
          <input name="phone" placeholder="Telefon" className={inputCls} />
          <input name="anlass" placeholder="Anlass" className={inputCls} />
          <input name="datum" type="date" className={inputCls} />
          <input name="ort" placeholder="Ort" className={inputCls} />
          <input name="gaeste" type="number" placeholder="Gäste" className={inputCls} />
          <input name="format" placeholder="Format" className={inputCls} />
          <textarea name="nachricht" placeholder="Nachricht" className={inputCls} />

          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}

          <button type="submit" disabled={sending}>
            {sending ? "Senden..." : "Anfrage senden"}
          </button>
        </form>
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
