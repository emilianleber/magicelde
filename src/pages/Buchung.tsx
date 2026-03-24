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
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="badge-accent mb-8 inline-flex">Anfrage</span>
        </div>
        <h1
          className="headline-hero mb-8 opacity-0 animate-fade-up text-foreground"
          style={{ animationDelay: "0.3s" }}
        >
          Jetzt anfragen.
        </h1>
        <p
          className="text-body max-w-2xl mx-auto opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          Erzähl mir von deinem Event — unverbindlich und kostenlos.
          Ich melde mich innerhalb von 24 Stunden persönlich bei dir.
        </p>
        <div
          className="flex flex-wrap justify-center gap-8 mt-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.65s" }}
        >
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

  const inputCls =
    "w-full rounded-2xl bg-muted/50 border-0 px-5 py-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");
    const anlass = String(formData.get("anlass") || "");
    const datum = String(formData.get("datum") || "");
    const ort = String(formData.get("ort") || "");
    const gaesteRaw = String(formData.get("gaeste") || "");
    const format = String(formData.get("format") || "");
    const nachricht = String(formData.get("nachricht") || "");

    const gaeste = gaesteRaw ? Number(gaesteRaw) : null;

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let customerId: string | null = null;

      if (user) {
        const { data: customer, error: customerError } = await supabase
          .from("portal_customers")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

        if (customerError) throw customerError;
        customerId = customer?.id ?? null;
      }

      const { error: requestError } = await supabase.from("portal_requests").insert({
        user_id: user?.id ?? null,
        customer_id: customerId,
        name,
        email,
        phone: phone || null,
        anlass: anlass || null,
        datum: datum || null,
        ort: ort || null,
        gaeste,
        format: format || null,
        nachricht: nachricht || null,
        status: "neu",
      });

      if (requestError) throw requestError;

      const formspreeData = new FormData();
      formspreeData.append("_subject", "Neue Buchungsanfrage über Website");
      formspreeData.append("name", name);
      formspreeData.append("email", email);
      formspreeData.append("phone", phone);
      formspreeData.append("anlass", anlass);
      formspreeData.append("datum", datum);
      formspreeData.append("ort", ort);
      formspreeData.append("gaeste", gaesteRaw);
      formspreeData.append("format", format);
      formspreeData.append("nachricht", nachricht);

      const formspreeResponse = await fetch("https://formspree.io/f/xwvrdbaw", {
        method: "POST",
        body: formspreeData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!formspreeResponse.ok) {
        throw new Error("Die Anfrage konnte nicht per E-Mail versendet werden.");
      }

      form.reset();
      navigate("/danke");
    } catch (err: any) {
      setError(err.message || "Beim Absenden ist ein Fehler aufgetreten.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section-large" ref={ref}>
      <div className="container px-6">
        <div
          className={`max-w-2xl mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
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
                placeholder="Telefon (optional)"
                className={inputCls}
              />
              <select
                name="anlass"
                required
                className={inputCls}
                defaultValue=""
              >
                <option value="" disabled>
                  Anlass wählen *
                </option>
                <option value="hochzeit">Hochzeit</option>
                <option value="firmenfeier">Firmenfeier / Corporate Event</option>
                <option value="geburtstag">Geburtstag / Private Feier</option>
                <option value="gala">Gala / Awards</option>
                <option value="messe">Messe / Promotion</option>
                <option value="magic-dinner">Magic Dinner</option>
                <option value="teamevent">Teamevent / Incentive</option>
                <option value="sonstiges">Sonstiges</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <input type="date" name="datum" className={inputCls} />
              <input
                type="text"
                name="ort"
                placeholder="Ort / Location"
                className={inputCls}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="number"
                name="gaeste"
                placeholder="Anzahl Gäste (ca.)"
                min="1"
                className={inputCls}
              />
              <select name="format" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Gewünschtes Format
                </option>
                <option value="closeup">Close-Up Magie</option>
                <option value="buehne">Bühnenshow</option>
                <option value="walking">Walking Act</option>
                <option value="dinner">Magic Dinner</option>
                <option value="kombi">Kombination</option>
                <option value="unsicher">Noch unsicher — berate mich</option>
              </select>
            </div>

            <textarea
              name="nachricht"
              placeholder="Erzähl mir von deinem Event — was wünscht du dir? Was ist der Anlass? Gibt es besondere Vorstellungen?"
              rows={5}
              className={inputCls + " resize-none"}
            />

            {error && (
              <div className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={sending}
                className="btn-primary btn-large w-full sm:w-auto disabled:opacity-60"
              >
                {sending ? "Wird gesendet…" : "Anfrage absenden"}
              </button>
              <p className="font-sans text-xs text-muted-foreground/40 mt-4 tracking-widest uppercase">
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