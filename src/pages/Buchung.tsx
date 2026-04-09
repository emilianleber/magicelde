import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/landing/PageLayout";
import ProcessSteps from "@/components/landing/ProcessSteps";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Clock, Star, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroBuchung = () => (
  <section className="relative min-h-[50vh] flex flex-col justify-center overflow-hidden">
    <div className="container px-6 pt-28 pb-8 md:pt-36 md:pb-12">
      <div className="max-w-5xl mx-auto text-center">
        <div
          className="opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
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
          Erzähl mir von deinem Event — unverbindlich und kostenlos. Ich melde
          mich innerhalb von 24 Stunden persönlich bei dir.
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
      anrede: String(formData.get("anrede") || "").trim() || null,
      vorname: String(formData.get("vorname") || "").trim(),
      nachname: String(formData.get("nachname") || "").trim(),
      name: `${String(formData.get("vorname") || "").trim()} ${String(formData.get("nachname") || "").trim()}`.trim(),
      firma: String(formData.get("firma") || "").trim() || null,
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      anlass: String(formData.get("anlass") || "").trim(),
      datum: String(formData.get("datum") || "").trim(),
      ort: String(formData.get("ort") || "").trim(),
      gaeste: formData.get("gaeste") ? Number(formData.get("gaeste")) : null,
      format: String(formData.get("format") || "").trim(),
      nachricht: String(formData.get("nachricht") || "").trim(),
    };

    try {
      const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      console.log("SUPABASE KEY VORHANDEN:", !!publishableKey);
      console.log("REQUEST PAYLOAD:", payload);

      const res = await fetch(
        "https://rjhvqctjtgfpxzhnrozt.supabase.co/functions/v1/create-portal-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`,
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("RESPONSE STATUS:", res.status);
      console.log("RESPONSE OK:", res.ok);

      const rawText = await res.text();
      console.log("RAW RESPONSE:", rawText);

      let data: any = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (parseError) {
        console.error("JSON PARSE ERROR IM FRONTEND:", parseError);
      }

      if (!res.ok) {
        throw new Error(data?.error || `Fehler bei Anfrage (${res.status})`);
      }

      form.reset();
      setSuccess(
        "Deine Anfrage wurde erfolgreich gesendet. Du hast außerdem eine Bestätigungs-E-Mail erhalten."
      );

      setTimeout(() => {
        navigate("/danke");
      }, 1500);
    } catch (err: any) {
      console.error("ABSENDE-FEHLER:", err);
      setError(err?.message || "Beim Absenden ist ein Fehler aufgetreten.");
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
            <div className="grid grid-cols-[100px_1fr_1fr] sm:grid-cols-[120px_1fr_1fr_1fr] gap-3 sm:gap-5">
              <select
                name="anrede"
                className={inputCls}
                defaultValue=""
              >
                <option value="">Anrede</option>
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
                <option value="Divers">Divers</option>
              </select>
              <input
                type="text"
                name="vorname"
                placeholder="Vorname *"
                required
                className={inputCls}
              />
              <input
                type="text"
                name="nachname"
                placeholder="Nachname *"
                required
                className={inputCls}
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail *"
                required
                className={`${inputCls} col-span-2 sm:col-span-1`}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="relative">
                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <input
                  type="text"
                  name="firma"
                  placeholder="Firma (optional)"
                  className="w-full rounded-2xl bg-muted/50 border-0 pl-12 pr-5 py-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Telefon (optional)"
                className={inputCls}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
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
                <option value="firmenfeier">
                  Firmenfeier / Corporate Event
                </option>
                <option value="geburtstag">
                  Geburtstag / Private Feier
                </option>
                <option value="gala">Gala / Awards</option>
                <option value="messe">Messe / Promotion</option>
                <option value="magic-dinner">Magic Dinner</option>
                <option value="teamevent">Teamevent / Incentive</option>
                <option value="sonstiges">Sonstiges</option>
              </select>

              <label className="relative block">
                <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/40 transition-opacity peer-[:not(:placeholder-shown)]:opacity-0" id="datumLabel">Wunschdatum</span>
                <input
                  type="date"
                  name="datum"
                  className={`${inputCls} min-h-[52px] peer`}
                  onChange={(e) => {
                    const label = document.getElementById("datumLabel");
                    if (label) label.style.opacity = e.target.value ? "0" : "1";
                  }}
                  onFocus={(e) => { try { (e.target as any).showPicker?.(); } catch {} }}
                />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="ort"
                placeholder="Ort / Location"
                className={inputCls}
              />
              <input
                type="number"
                name="gaeste"
                placeholder="Anzahl Gäste (ca.)"
                min="1"
                className={inputCls}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <select name="format" className={inputCls} defaultValue="">
                <option value="" disabled>
                  Gewünschtes Format
                </option>
                <option value="closeup">Close-Up Magie</option>
                <option value="buehnenshow">Bühnenshow</option>
                <option value="walking_act">Walking Act</option>
                <option value="magic_dinner">Magic Dinner</option>
                <option value="kombination">Kombination</option>
                <option value="moderation">Moderation</option>
                <option value="unsicher">Noch unsicher — berate mich</option>
              </select>

              <div className="hidden sm:block" />
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

            {success && (
              <div className="rounded-2xl bg-green-100 px-4 py-3 text-sm text-green-700">
                {success}
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
  <>
    <Helmet>
      <title>Jetzt anfragen – Emilian Leber | Zauberer buchen</title>
      <meta name="description" content="Jetzt Zauberer Emilian Leber buchen: unverbindliche Anfrage für Hochzeit, Firmenfeier oder Event. Kostenlose Beratung, Antwort innerhalb 24 Stunden." />
      <link rel="canonical" href="https://www.magicel.de/buchung" />
      <meta property="og:title" content="Jetzt anfragen – Emilian Leber | Zauberer buchen" />
      <meta property="og:description" content="Jetzt Zauberer Emilian Leber buchen: unverbindliche Anfrage für Hochzeit, Firmenfeier oder Event. Kostenlose Beratung, Antwort innerhalb 24 Stunden." />
      <meta property="og:url" content="https://www.magicel.de/buchung" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.magicel.de/og-image.jpg" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Jetzt anfragen – Emilian Leber | Zauberer buchen" />
      <meta name="twitter:description" content="Jetzt Zauberer Emilian Leber buchen: unverbindliche Anfrage für Hochzeit, Firmenfeier oder Event. Kostenlose Beratung, Antwort innerhalb 24 Stunden." />
    </Helmet>
    <PageLayout>
    <HeroBuchung />
    <FormSection />
    <ProcessSteps />
  </PageLayout>
  </>
);

export default Buchung;